/**
 * Render the interactive destination map for a Trip Scout report.
 *
 * Embeds a Google Maps JavaScript API map showing the destination's geography
 * with FishFly-branded markers. Goes inside section 01 (Trip Overview),
 * between the greeting paragraph and the "What to know before you go" prose.
 *
 * Marker types (one kind):
 *   - Airport (✈, ocean blue #1e3a5f) — entry points to the destination
 *
 * POLICY — WHY AIRPORTS ONLY (see PR #49):
 * Earlier passes marked lodges and towns as well, but both surfaced
 * coverage problems that misled users:
 *   - Lodges: selection was biased toward aggregator-listed operators
 *     (Yellow Dog, Nervous Waters, Frontiers) — which take commissions and
 *     under-represent family-run, direct-book, and newer operations.
 *     Marking 3 of 15 real lodges made users assume they were "the best"
 *     or "the only ones" — neither true.
 *   - Towns: Google Maps labels every settlement natively; adding a
 *     FishFly pin on Ocracoke while Empire and Buras stayed unmarked
 *     created false asymmetry.
 *
 * Airports pass both tests: objective (IATA/ICAO-listed, currently
 * serviced), genuinely additive to the map (users get spatial context on
 * where to fly in), and unbiased. Lodge recommendations still appear —
 * Claude names specific lodges with rich context in the report prose.
 *
 * Legacy `kind: "flats"` and `kind: "lodge"` values in POI data are
 * filtered out defensively at render time.
 *
 * Map controls (all native Google Maps):
 *   - Map / Satellite / Hybrid / Terrain layer toggle (top-right)
 *   - Zoom + / − (bottom-right)
 *   - Street View pegman (top-right)
 *   - Scale bar (bottom-left)
 *   - Fullscreen toggle
 *   - "Cooperative" gesture handling — page scroll is not hijacked; users
 *     must hold ⌘/Ctrl (desktop) or use two fingers (touchpad) to zoom
 *
 * Data flow:
 *   - centroid + tz come from scout-lib/destinations.mjs (meta lookup)
 *   - POIs come from scout-lib/destination-pois.mjs (optional per-destination)
 *   - apiKey comes from process.env.GOOGLE_MAPS_API_KEY (set in Netlify)
 *
 * Graceful degradation: returns "" if apiKey is missing OR if the destination
 * has no meta lookup. In either case the report renders without the map and
 * Trip Overview's existing prose carries the section.
 */

const DEFAULT_ZOOM = 9; // sane default — most destinations are island-scale

const MARKER_STYLE = {
  // ✈ Trip Scout — airports curated in scout-lib/destination-pois.mjs.
  //   Objective (IATA-listed), bias-free, additive.
  airport:  { color: "#1e3a5f", glyph: "✈", kindLabel: "Airport",              legendLabel: "Airports" },
  // ◉ Eat Window — the user's own geocoded fishing location. Not "curated
  //   by us" so no aggregator bias, no false comprehensiveness. Just the
  //   pin they typed into the intake form.
  location: { color: "#c89668", glyph: "◉", kindLabel: "Your fishing location", legendLabel: "Your location" },
};

// The kinds the map should render. Any POI whose `kind` isn't in this set
// is filtered out defensively (legacy lodge/flats/town data, malformed
// inputs, etc.).
const ALLOWED_KINDS = new Set(Object.keys(MARKER_STYLE));

export function renderTripMap({ meta, pois, apiKey, destinationName, zoom }) {
  if (!apiKey) return "";
  if (!meta || !Number.isFinite(meta.lat) || !Number.isFinite(meta.lon)) return "";

  const safeApiKey = encodeURIComponent(apiKey);
  const center = { lat: meta.lat, lng: meta.lon };

  // Filter out any legacy non-styled markers (lodges, flats, towns from
  // pre-PR-#49 catalog data). Any kind not in MARKER_STYLE is dropped.
  const markers = (Array.isArray(pois) ? pois : [])
    .filter((p) => p && ALLOWED_KINDS.has(p.kind));

  const useZoom = Number.isFinite(zoom) ? zoom : DEFAULT_ZOOM;

  // Embed marker config as JSON in a data attribute on the map div.
  // initFishFlyTripMap reads this at runtime — keeps the script body
  // free of injected destination-specific data and easier to audit.
  const mapConfig = {
    center,
    zoom: useZoom,
    markers,
  };

  const configJson = JSON.stringify(mapConfig)
    .replace(/</g, "\\u003C")
    .replace(/>/g, "\\u003E")
    .replace(/&/g, "\\u0026");

  // The Google Maps API loader runs ONCE per page; with one map per report,
  // we include it here. The `callback=initFishFlyTripMap` parameter tells
  // Google to invoke our initializer once the SDK is ready.
  return `
  <figure class="trip-map-figure" aria-label="Interactive destination map">
    <div id="trip-map" data-config="${escapeAttr(configJson)}"></div>
    <figcaption class="trip-map-caption">
      <span>Drag to pan · scroll to zoom · use the Map / Satellite toggle in the top-right · click a marker for detail.</span>
      <span class="trip-map-legend">${renderLegend(markers)}</span>
    </figcaption>
  </figure>
  <script>
    (function () {
      window.initFishFlyTripMap = function () {
        var mapEl = document.getElementById('trip-map');
        if (!mapEl || typeof google === 'undefined' || !google.maps) return;
        var config;
        try { config = JSON.parse(mapEl.getAttribute('data-config')); }
        catch (e) { return; }

        var map = new google.maps.Map(mapEl, {
          center: config.center,
          zoom: config.zoom,
          mapTypeId: 'hybrid',
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DEFAULT,
            position: google.maps.ControlPosition.TOP_RIGHT,
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain'],
          },
          streetViewControl: true,
          fullscreenControl: true,
          scaleControl: true,
          zoomControl: true,
          zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_BOTTOM },
          gestureHandling: 'cooperative',
        });

        var STYLE = ${JSON.stringify(MARKER_STYLE)};
        var info = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();

        (config.markers || []).forEach(function (m) {
          var style = STYLE[m.kind] || STYLE.airport;
          var marker = new google.maps.Marker({
            position: { lat: m.lat, lng: m.lng },
            map: map,
            title: m.label,
            label: { text: style.glyph, color: '#ffffff', fontSize: '15px', fontWeight: '700' },
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 14,
              fillColor: style.color,
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 3,
            },
            optimized: false,
          });
          marker.addListener('click', function () {
            var html = '<div class="ff-popup">'
              + '<div class="ff-popup-kind">' + escapeHtml(style.kindLabel) + '</div>'
              + '<strong>' + escapeHtml(m.label) + '</strong>'
              + escapeHtml(m.detail || '')
              + '</div>';
            info.setContent(html);
            info.open({ anchor: marker, map: map });
          });
          bounds.extend({ lat: m.lat, lng: m.lng });
        });

        if (config.markers && config.markers.length > 1) {
          map.fitBounds(bounds, { top: 60, right: 60, bottom: 60, left: 60 });
        }

        function escapeHtml(s) {
          if (typeof s !== 'string') return '';
          return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
        }
      };
    })();
  </script>
  <script async defer src="https://maps.googleapis.com/maps/api/js?key=${safeApiKey}&callback=initFishFlyTripMap&v=weekly"></script>`;
}

/* ============================================================ */
/*  Helpers                                                       */
/* ============================================================ */

/**
 * Render the legend swatches for the map caption, based on which kinds
 * are actually present in the markers list. That way Trip Scout maps
 * (airport-only) show one item, Eat Window maps (location pin) show a
 * different item, and each surface stays honest about what's on it.
 */
function renderLegend(markers) {
  if (!Array.isArray(markers) || markers.length === 0) return "";
  const kindsPresent = new Set(markers.map((m) => m && m.kind).filter(Boolean));
  const items = Array.from(kindsPresent)
    .filter((k) => MARKER_STYLE[k])
    .map((k) => {
      const style = MARKER_STYLE[k];
      const label = style.legendLabel || style.kindLabel;
      return `<span><span class="legend-icon legend-${k}">${style.glyph}</span> ${label}</span>`;
    });
  return items.join("");
}

function escapeAttr(s) {
  if (typeof s !== "string") return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

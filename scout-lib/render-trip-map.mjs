/**
 * Render the interactive destination map for a Trip Scout report.
 *
 * Embeds a Google Maps JavaScript API map showing the destination's geography
 * with FishFly-branded markers. Goes inside section 01 (Trip Overview),
 * between the greeting paragraph and the "What to know before you go" prose.
 *
 * Marker types (palette-aligned with the rest of the report):
 *   - Airport (✈, ocean blue #1e3a5f) — entry points to the destination
 *   - Lodge   (★, sand #c89668)       — primary fishing villages / lodge clusters
 *   - Town    (⚓, text-soft #4a5568) — named settlements relevant to the fishery
 *
 * Named-flats markers were removed by policy: pinpointing specific fishing
 * flats surfaces sensitive information about guide waters and works against
 * the etiquette Trip Scout is trying to model. Any `kind: "flats"` in the
 * POI catalog is filtered out at render time.
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
  airport: { color: "#1e3a5f", glyph: "✈", kindLabel: "Airport" },
  lodge:   { color: "#c89668", glyph: "★", kindLabel: "Lodge cluster" },
  town:    { color: "#4a5568", glyph: "⚓", kindLabel: "Town" },
};

export function renderTripMap({ meta, pois, apiKey, destinationName, zoom }) {
  if (!apiKey) return "";
  if (!meta || !Number.isFinite(meta.lat) || !Number.isFinite(meta.lon)) return "";

  const safeApiKey = encodeURIComponent(apiKey);
  const center = { lat: meta.lat, lng: meta.lon };

  // Filter out any flats markers up-front: destination-pois.mjs should no
  // longer emit them, but this keeps the render defensive in case a legacy
  // entry survives an incomplete cleanup.
  const filteredPois = (Array.isArray(pois) ? pois : [])
    .filter((p) => p && p.kind !== "flats");

  // Always include a destination-centroid marker if no curated POIs were provided
  // — so even uncurated destinations get a single "you are here" pin instead of
  // an empty map.
  const markers = filteredPois.length > 0
    ? filteredPois
    : [{
        lat: meta.lat,
        lng: meta.lon,
        kind: "lodge",
        label: destinationName || "Destination",
        detail: "Approximate centroid of the destination region.",
      }];

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
      <span>Drag to pan · scroll to zoom · use the Map / Satellite toggle in the top-right · click markers for detail.</span>
      <span class="trip-map-legend">
        <span><span class="legend-dot legend-airport"></span> Airports</span>
        <span><span class="legend-dot legend-lodge"></span> Lodges</span>
        <span><span class="legend-dot legend-town"></span> Towns</span>
      </span>
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
          var style = STYLE[m.kind] || STYLE.lodge;
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

function escapeAttr(s) {
  if (typeof s !== "string") return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

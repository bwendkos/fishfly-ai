const jwt = require('jsonwebtoken');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://fishfly.ai',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

function jsonResponse(statusCode, body) {
  return { statusCode, headers: CORS_HEADERS, body: JSON.stringify(body) };
}

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return jsonResponse(204, {});
  if (event.httpMethod !== 'POST') return jsonResponse(405, { ok: false, message: 'Method not allowed' });

  let payload;
  try { payload = JSON.parse(event.body || '{}'); }
  catch { return jsonResponse(400, { ok: false, message: 'Invalid JSON' }); }

  const { email, _gotcha } = payload;

  // Honeypot: silently succeed for bots
  if (_gotcha) return jsonResponse(200, { ok: true, message: 'Subscribed' });

  if (!isValidEmail(email)) {
    return jsonResponse(400, { ok: false, message: 'Please enter a valid email address.' });
  }

  const adminKey = process.env.GHOST_ADMIN_API_KEY;
  const ghostUrl = process.env.GHOST_API_URL;

  if (!adminKey || !ghostUrl) {
    console.error('Missing GHOST_ADMIN_API_KEY or GHOST_API_URL');
    return jsonResponse(500, { ok: false, message: 'Server misconfigured' });
  }

  const [id, secret] = adminKey.split(':');
  if (!id || !secret) {
    console.error('GHOST_ADMIN_API_KEY malformed');
    return jsonResponse(500, { ok: false, message: 'Server misconfigured' });
  }

  let token;
  try {
    token = jwt.sign({}, Buffer.from(secret, 'hex'), {
      keyid: id,
      algorithm: 'HS256',
      expiresIn: '5m',
      audience: '/admin/',
    });
  } catch (err) {
    console.error('JWT sign failed', err);
    return jsonResponse(500, { ok: false, message: 'Server error' });
  }

  try {
    const res = await fetch(`${ghostUrl}/ghost/api/admin/members/`, {
      method: 'POST',
      headers: {
        Authorization: `Ghost ${token}`,
        'Content-Type': 'application/json',
        'Accept-Version': 'v5.0',
      },
      body: JSON.stringify({ members: [{ email }] }),
    });

    if (res.status === 201 || res.status === 200) {
      return jsonResponse(200, { ok: true, message: 'Subscribed' });
    }
    if (res.status === 422) {
      // Member already exists, or validation issue — treat as success to avoid leaking subscriber state
      return jsonResponse(200, { ok: true, message: 'Subscribed' });
    }

    const body = await res.text();
    console.error('Ghost API error', res.status, body);
    return jsonResponse(500, { ok: false, message: 'Could not subscribe. Try again later.' });
  } catch (err) {
    console.error('Fetch to Ghost failed', err);
    return jsonResponse(500, { ok: false, message: 'Network error. Try again later.' });
  }
};

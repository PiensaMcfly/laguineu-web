const enc = new TextEncoder();
const COOKIE = '__Host-lg_session';
const SESSION_SECONDS = 60 * 60 * 12;

const toB64Url = (buf) => {
  let s = '';
  new Uint8Array(buf).forEach((b) => (s += String.fromCharCode(b)));
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

async function hmac(secret, data) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return toB64Url(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
}

function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers }
  });

export const configured = (env) =>
  !!(env.SESSION_SECRET && env.SESSION_SECRET.length >= 32 && env.ADMIN_PASSWORD && env.ADMIN_PASSWORD.length >= 12);

export function sameOrigin(request) {
  const origin = request.headers.get('Origin');
  if (origin) {
    try {
      return new URL(origin).host === new URL(request.url).host;
    } catch {
      return false;
    }
  }
  const site = request.headers.get('Sec-Fetch-Site');
  return !site || site === 'same-origin' || site === 'none';
}

export async function readJson(request, max) {
  const len = Number(request.headers.get('Content-Length'));
  if (Number.isFinite(len) && len > max) return { error: 'too_large' };
  const text = await request.text();
  if (text.length > max) return { error: 'too_large' };
  try {
    return { data: JSON.parse(text) };
  } catch {
    return { error: 'invalid' };
  }
}

export async function checkPassword(input, env) {
  const a = await hmac(env.SESSION_SECRET, 'pw:' + String(input));
  const b = await hmac(env.SESSION_SECRET, 'pw:' + env.ADMIN_PASSWORD);
  return safeEqual(a, b);
}

export async function createSessionCookie(env) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const payload = 'v1.' + exp;
  const sig = await hmac(env.SESSION_SECRET, payload);
  return `${COOKIE}=${payload}.${sig}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_SECONDS}`;
}

export const clearSessionCookie = () => `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;

export async function isAuthenticated(request, env) {
  if (!configured(env)) return false;
  const m = (request.headers.get('Cookie') || '').match(new RegExp('(?:^|;\\s*)' + COOKIE + '=([^;]+)'));
  if (!m) return false;
  const parts = m[1].split('.');
  if (parts.length !== 3 || parts[0] !== 'v1') return false;
  const exp = Number(parts[1]);
  if (!Number.isFinite(exp) || exp < Date.now() / 1000) return false;
  return safeEqual(parts[2], await hmac(env.SESSION_SECRET, parts[0] + '.' + parts[1]));
}

export async function requireAuth(request, env) {
  return (await isAuthenticated(request, env)) ? null : json({ error: 'No autorizado' }, 401);
}

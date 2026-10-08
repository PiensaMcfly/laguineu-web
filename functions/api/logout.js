import { json, clearSessionCookie, sameOrigin } from '../_lib/auth.js';

export async function onRequestPost({ request }) {
  if (!sameOrigin(request)) return json({ error: 'Solicitud no permitida' }, 403);
  return json({ ok: true }, 200, { 'Set-Cookie': clearSessionCookie() });
}

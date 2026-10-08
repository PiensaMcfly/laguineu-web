const WINDOW_SECONDS = 15 * 60;
const MAX_FAILS = 5;

const keyOf = (request) => 'fail:' + (request.headers.get('CF-Connecting-IP') || 'unknown');

export async function isBlocked(env, request) {
  if (!env.RATE) return false;
  return (Number(await env.RATE.get(keyOf(request))) || 0) >= MAX_FAILS;
}

export async function recordFail(env, request) {
  if (!env.RATE) return;
  const key = keyOf(request);
  const n = (Number(await env.RATE.get(key)) || 0) + 1;
  await env.RATE.put(key, String(n), { expirationTtl: WINDOW_SECONDS });
}

export async function clearFails(env, request) {
  if (env.RATE) await env.RATE.delete(keyOf(request));
}

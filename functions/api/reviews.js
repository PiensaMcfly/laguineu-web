import { json } from '../_lib/auth.js';

const API = 'https://places.googleapis.com/v1/';
const TTL = 12 * 60 * 60;
let memory = null;
let failedAt = 0;

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

async function placeId(env) {
  if (env.GOOGLE_PLACE_ID) return env.GOOGLE_PLACE_ID;
  const res = await fetch(API + 'places:searchText', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': env.GOOGLE_PLACES_KEY, 'X-Goog-FieldMask': 'places.id' },
    body: JSON.stringify({ textQuery: env.GOOGLE_PLACE_QUERY || 'Camping La Guineu Malargüe Mendoza', languageCode: 'es', maxResultCount: 1 })
  });
  if (!res.ok) throw new Error('search ' + res.status);
  const id = ((await res.json()).places || [])[0];
  if (!id || !id.id) throw new Error('place not found');
  return id.id;
}

async function fetchReviews(env) {
  const res = await fetch(API + 'places/' + encodeURIComponent(await placeId(env)) + '?languageCode=es', {
    headers: { 'X-Goog-Api-Key': env.GOOGLE_PLACES_KEY, 'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews' }
  });
  if (!res.ok) throw new Error('details ' + res.status);
  const d = await res.json();
  const url = str(d.googleMapsUri, 300);
  return {
    rating: typeof d.rating === 'number' ? Math.round(d.rating * 10) / 10 : null,
    count: Number.isInteger(d.userRatingCount) ? d.userRatingCount : null,
    url: url.startsWith('https://') ? url : '',
    reviews: (d.reviews || [])
      .map((v) => ({
        author: str(v.authorAttribution && v.authorAttribution.displayName, 60) || 'Visitante',
        rating: Math.min(5, Math.max(1, Math.round(Number(v.rating)) || 5)),
        when: str(v.relativePublishTimeDescription, 40),
        text: str((v.text && v.text.text) || (v.originalText && v.originalText.text), 600)
      }))
      .filter((v) => v.text)
      .slice(0, 6)
  };
}

// Pública: devuelve solo opiniones ya recortadas. La clave de Google nunca sale del servidor.
export async function onRequestGet({ env }) {
  if (!env.GOOGLE_PLACES_KEY) return json({ error: 'Opiniones de Google sin configurar.' }, 503);
  const now = Date.now();
  if ((!memory || now - memory.at > TTL * 1000) && now - failedAt > 5 * 60 * 1000) {
    try {
      memory = { at: now, data: await fetchReviews(env) };
    } catch (e) {
      failedAt = now;
    }
  }
  if (!memory) return json({ error: 'No se pudieron leer las opiniones.' }, 502);
  return json(memory.data, 200, { 'Cache-Control': 'public, max-age=3600' });
}

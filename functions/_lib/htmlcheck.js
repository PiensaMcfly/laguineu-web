const ALLOWED_SCRIPTS = new Set(['vendor/tailwind-3.4.17.js', 'Src/tw-config.js', 'Src/site.js']);
const ALLOWED_FRAMES = [
  /^https:\/\/www\.google\.com\/maps\/embed(\?|$)/,
  /^https:\/\/www\.youtube-nocookie\.com\/embed\/[\w-]{11}(\?|$)/,
  /^https:\/\/www\.youtube\.com\/embed\/[\w-]{11}(\?|$)/
];

const attr = (tag, name) => {
  const m = tag.match(new RegExp('\\s' + name + '\\s*=\\s*("([^"]*)"|\'([^\']*)\'|([^\\s>]+))', 'i'));
  return m ? m[2] ?? m[3] ?? m[4] : null;
};

export function decodeBase64Utf8(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

export function htmlProblems(text) {
  for (const tag of text.match(/<script\b[^>]*>/gi) || []) {
    const src = attr(tag, 'src');
    if (!src || !ALLOWED_SCRIPTS.has(src)) return 'La página tiene un script no permitido.';
  }
  if (/<\s*(object|embed|base|form|applet|video|audio)\b/i.test(text)) return 'La página tiene elementos no permitidos.';
  if (/<\s*meta\b[^>]*http-equiv\s*=\s*["']?\s*refresh/i.test(text)) return 'La página tiene una redirección no permitida.';
  if (/[\s"'/]on[a-z]{3,}\s*=/i.test(text)) return 'La página tiene atributos de eventos no permitidos.';
  if (/(href|src|action|formaction|xlink:href)\s*=\s*["']?\s*(javascript|vbscript|data\s*:\s*text\/html)/i.test(text)) return 'La página tiene enlaces no permitidos.';
  for (const tag of text.match(/<iframe\b[^>]*>/gi) || []) {
    const src = attr(tag, 'src');
    if (!src || !ALLOWED_FRAMES.some((re) => re.test(src))) return 'La página tiene un marco incrustado de un sitio no permitido.';
  }
  return null;
}

  (function () {
    const SITE_BASE = new URL('../', location.href).href;
    const STORAGE_KEY = 'laguineu-editor-v2';
    const BASE_KEY = 'laguineu-editor-v2-base';
    const FA_URL = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    const FONTS = [
      { n: 'Plus Jakarta Sans', w: '400;500;600;700;800', g: 'sans-serif', grp: 'Modernas', d: 'la del sitio', base: true },
      { n: 'Montserrat', w: '400;600;700', g: 'sans-serif', grp: 'Modernas', d: 'moderna' },
      { n: 'Poppins', w: '400;600;700', g: 'sans-serif', grp: 'Modernas', d: 'redondeada' },
      { n: 'Open Sans', w: '400;600;700', g: 'sans-serif', grp: 'Modernas', d: 'neutra' },
      { n: 'Roboto', w: '400;700', g: 'sans-serif', grp: 'Modernas', d: 'clara' },
      { n: 'Lato', w: '400;700', g: 'sans-serif', grp: 'Modernas', d: 'amable' },
      { n: 'Inter', w: '400;600;700', g: 'sans-serif', grp: 'Modernas', d: 'limpia' },
      { n: 'Nunito', w: '400;700', g: 'sans-serif', grp: 'Modernas', d: 'suave' },
      { n: 'Raleway', w: '400;700', g: 'sans-serif', grp: 'Modernas', d: 'fina' },
      { n: 'Quicksand', w: '400;700', g: 'sans-serif', grp: 'Modernas', d: 'amigable' },
      { n: 'Rubik', w: '400;700', g: 'sans-serif', grp: 'Modernas', d: 'robusta' },
      { n: 'Work Sans', w: '400;700', g: 'sans-serif', grp: 'Modernas', d: 'directa' },
      { n: 'DM Sans', w: '400;700', g: 'sans-serif', grp: 'Modernas', d: 'geométrica' },
      { n: 'Josefin Sans', w: '400;700', g: 'sans-serif', grp: 'Modernas', d: 'elegante' },
      { n: 'Fredoka', w: '400;700', g: 'sans-serif', grp: 'Modernas', d: 'divertida' },
      { n: 'Playfair Display', w: '400;700', g: 'serif', grp: 'Elegantes', d: 'la de los títulos', base: true },
      { n: 'Cormorant Garamond', w: '400;700', g: 'serif', grp: 'Elegantes', d: 'fina' },
      { n: 'Lora', w: '400;700', g: 'serif', grp: 'Elegantes', d: 'clásica' },
      { n: 'Merriweather', w: '400;700', g: 'serif', grp: 'Elegantes', d: 'legible' },
      { n: 'Libre Baskerville', w: '400;700', g: 'serif', grp: 'Elegantes', d: 'de libro' },
      { n: 'Cinzel', w: '400;700', g: 'serif', grp: 'Elegantes', d: 'majestuosa' },
      { n: 'Abril Fatface', w: '', g: 'serif', grp: 'Elegantes', d: 'llamativa' },
      { n: 'Bebas Neue', w: '', g: 'sans-serif', grp: 'Para títulos', d: 'fuerte' },
      { n: 'Anton', w: '', g: 'sans-serif', grp: 'Para títulos', d: 'impactante' },
      { n: 'Oswald', w: '400;600', g: 'sans-serif', grp: 'Para títulos', d: 'condensada' },
      { n: 'Archivo Black', w: '', g: 'sans-serif', grp: 'Para títulos', d: 'gruesa' },
      { n: 'Righteous', w: '', g: 'sans-serif', grp: 'Para títulos', d: 'retro' },
      { n: 'Pacifico', w: '', g: 'cursive', grp: 'Manuscritas', d: 'playera' },
      { n: 'Dancing Script', w: '400;700', g: 'cursive', grp: 'Manuscritas', d: 'cursiva' },
      { n: 'Caveat', w: '400;700', g: 'cursive', grp: 'Manuscritas', d: 'a mano' },
      { n: 'Great Vibes', w: '', g: 'cursive', grp: 'Manuscritas', d: 'caligrafía' },
      { n: 'Satisfy', w: '', g: 'cursive', grp: 'Manuscritas', d: 'pincel' },
      { n: 'Lobster', w: '', g: 'cursive', grp: 'Manuscritas', d: 'de cartel' },
      { n: 'Permanent Marker', w: '', g: 'cursive', grp: 'Manuscritas', d: 'marcador' },
      { n: 'Arial', g: 'Helvetica, sans-serif', grp: 'Del sistema', d: 'estándar', sys: true },
      { n: 'Georgia', g: 'serif', grp: 'Del sistema', d: 'estándar', sys: true }
    ];
    const fontCss = (f) => (f.sys ? f.n : "'" + f.n + "'") + ', ' + f.g;
    const fontsUrl = (list) =>
      'https://fonts.googleapis.com/css2?' +
      list.filter((f) => !f.sys).map((f) => 'family=' + f.n.replace(/ /g, '+') + (f.w ? ':wght@' + f.w : '')).join('&') +
      '&display=swap';
    const FONTS_URL = fontsUrl(FONTS);
    (() => {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = FONTS_URL;
      document.head.appendChild(l);
    })();
    const TW_CONFIG_URL = SITE_BASE + 'Src/tw-config.js';
    const TAILWIND_URL = SITE_BASE + 'vendor/tailwind-3.4.17.js';
    const FA_INTEGRITY = 'sha384-iw3OoTErCYJJB9mCa8LNS2hbsQ7M3C0EpIsO/H5+EGAkPGc6rk+V8i04oW/K5xq0';
    let IMAGES = ['logoguineu.png', 'Pileta HD.jfif', 'Piletas1.jpeg', 'Mesashdlibres.jfif', 'Parrilla.jpeg', 'Hornos1.jfif', 'banios1hd.jfif', 'Banios1.jpeg', 'Banios2.jpeg', 'Banios3.jpeg', 'BaniosHDinodoro.jfif', 'carpa1.jpg', 'PuertaCamping.jfif', 'fogon-noche.jpg', 'fogonero.jpg', 'iconoacampe.png', 'iconoatracciones.png', 'iconocarpayfogon.png', 'iconopaisajes.png', 'iconoparrillas.png', 'iconopiscinas.png'];

    const img = (n) => SITE_BASE + 'Public/Images/' + encodeURI(n);
    const absolutize = (h) => h.replace(/(src|href)="(Public|Src)\//g, '$1="' + SITE_BASE + '$2/');
    const relativize = (h) => h.split(SITE_BASE).join('');
    const $ = (id) => document.getElementById(id);

    let siteBody = '';
    let siteTitle = 'Camping La Guineu';
    let published = null;

    const api = (path, opts) => fetch('/api/' + path, { credentials: 'same-origin', ...opts });
    const apiPost = (path, data) => api(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const restoreUrls = (data) => JSON.parse(JSON.stringify(data).replace(/(["(])(Public|Src)\//g, '$1' + SITE_BASE + '$2/'));

    function parseHtml(text) {
      const doc = new DOMParser().parseFromString(text, 'text/html');
      doc.body.querySelectorAll('script').forEach((s) => s.remove());
      return { title: doc.title, body: absolutize(doc.body.innerHTML) };
    }

    async function loadSource() {
      const [proj, page] = await Promise.all([
        fetch(SITE_BASE + 'data/project.json', { cache: 'no-store' }),
        fetch(SITE_BASE + 'index.html', { cache: 'no-store' })
      ]);
      if (!page.ok) throw new Error('No se pudo cargar la página (' + page.status + ')');
      const parsed = parseHtml(await page.text());
      siteTitle = parsed.title || siteTitle;
      siteBody = parsed.body;
      if (proj.ok) {
        try {
          const data = JSON.parse(await proj.text());
          if (data && data.pages) published = { data, at: data.meta && data.meta.publishedAt };
        } catch (e) {}
      }
    }

    async function loadImages() {
      try {
        const r = await api('images');
        if (r.ok) IMAGES = (await r.json()).images || IMAGES;
      } catch (e) {}
    }

    async function ensureSession() {
      const r = await api('session').catch(() => null);
      if (r && r.ok) return;
      const info = r ? await r.json().catch(() => ({})) : {};
      $('login-modal').hidden = false;
      if (info.configured === false) {
        $('login-msg').className = 'err';
        $('login-msg').textContent = 'El servidor todavía no está configurado en Cloudflare: ' + ((info.problems || []).join('; ') || 'faltan variables') + '.';
      }
      $('login-pass').focus();
      await new Promise((resolve) => {
        const go = async () => {
          $('login-go').disabled = true;
          $('login-msg').className = '';
          $('login-msg').textContent = 'Verificando…';
          try {
            const res = await apiPost('login', { password: $('login-pass').value });
            const body = await res.json().catch(() => ({}));
            if (res.ok) { $('login-modal').hidden = true; return resolve(); }
            $('login-msg').className = 'err';
            $('login-msg').textContent = (body.error || 'No se pudo ingresar.') + (body.problems && body.problems.length ? ' ' + body.problems.join('; ') + '.' : '');
          } catch (e) {
            $('login-msg').className = 'err';
            $('login-msg').textContent = 'No hay conexión con el servidor.';
          }
          $('login-go').disabled = false;
        };
        $('login-go').onclick = go;
        $('login-pass').addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
      });
    }

    function shrink(file) {
      return new Promise((resolve, reject) => {
        if (!/^image\/(jpeg|png|webp|gif)$/.test(file.type)) return reject(new Error('"' + file.name + '": usá una imagen JPG, PNG, WebP o GIF.'));
        const url = URL.createObjectURL(file);
        const im = new Image();
        im.onload = () => {
          URL.revokeObjectURL(url);
          for (const [max, q] of [[1600, 0.82], [1200, 0.75], [900, 0.7]]) {
            const s = Math.min(1, max / Math.max(im.width, im.height));
            const c = document.createElement('canvas');
            c.width = Math.max(1, Math.round(im.width * s));
            c.height = Math.max(1, Math.round(im.height * s));
            c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
            let out = c.toDataURL('image/webp', q);
            if (!out.startsWith('data:image/webp')) out = c.toDataURL('image/jpeg', q);
            if (out.length < 2600000) return resolve(out);
          }
          reject(new Error('"' + file.name + '" es demasiado pesada incluso reducida.'));
        };
        im.onerror = () => { URL.revokeObjectURL(url); reject(new Error('No se pudo leer "' + file.name + '".')); };
        im.src = url;
      });
    }

    const fontOptions = FONTS.map((f) => ({ id: fontCss(f), value: fontCss(f), label: f.n + ' (' + f.d + ')' }));

    function boot() {
      const baseId = published ? String(published.at || 'published') : 'bootstrap';
      try {
        if (localStorage.getItem(BASE_KEY) !== baseId) {
          localStorage.removeItem(STORAGE_KEY);
          localStorage.setItem(BASE_KEY, baseId);
        }
      } catch (e) {}
      const editor = grapesjs.init({
        container: '#gjs',
        height: '100%',
        width: 'auto',
        fromElement: false,
        panels: { defaults: [] },
        storageManager: {
          type: 'local',
          autosave: true,
          autoload: true,
          stepsBeforeSave: 1,
          options: { local: { key: STORAGE_KEY } }
        },
        selectorManager: { componentFirst: true, appendTo: '#selectors' },
        undoManager: { trackSelection: false },
        deviceManager: {
          devices: [
            { id: 'Escritorio', name: 'Escritorio' },
            { id: 'Tablet', name: 'Tablet', width: '768px', widthMedia: '992px' },
            { id: 'Móvil', name: 'Móvil', width: '375px', widthMedia: '480px' }
          ]
        },
        canvas: {
          styles: [FA_URL, FONTS_URL, SITE_BASE + 'Src/laguineu.css'],
          scripts: [TAILWIND_URL, TW_CONFIG_URL]
        },
        protectedCss:
          "body{background:#fbf8f3;color:#292524;font-family:'Plus Jakarta Sans',sans-serif;-webkit-font-smoothing:antialiased}" +
          '#carousel-slides{height:auto!important}' +
          '.carousel-item{position:relative!important;opacity:1!important;z-index:auto!important;height:380px!important}' +
          '#prev-slide,#next-slide{display:none!important}' +
          '.cr-track{scrollbar-width:thin}',
        assetManager: {
          embedAsBase64: true,
          assets: IMAGES.map((n) => ({ type: 'image', src: img(n), name: n })),
          uploadFile: async (e) => {
            const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
            const added = [];
            const errors = [];
            for (const f of files) {
              try {
                added.push({ type: 'image', src: await shrink(f), name: f.name.replace(/\.[^.]+$/, '') + '.webp' });
              } catch (err) {
                errors.push(err.message);
              }
            }
            if (added.length) editor.AssetManager.add(added);
            if (errors.length) alert(errors.join('\n'));
          }
        },
        blockManager: {
          appendTo: '#blocks',
          appendOnClick: (block, ed) => addBlock(ed, block)
        },
        layerManager: { appendTo: '#layers' },
        traitManager: { appendTo: '#traits' },
        styleManager: {
          appendTo: '#styles',
          sectors: [
            {
              name: 'Texto',
              open: true,
              properties: [
                { extend: 'font-family', label: 'Tipo de letra', options: fontOptions },
                { extend: 'font-size', label: 'Tamaño' },
                {
                  extend: 'font-weight',
                  label: 'Grosor',
                  options: [
                    { id: '100', value: '100', label: 'Muy fina' }, { id: '300', value: '300', label: 'Fina' }, { id: '400', value: '400', label: 'Normal' },
                    { id: '500', value: '500', label: 'Media' }, { id: '600', value: '600', label: 'Seminegrita' }, { id: '700', value: '700', label: 'Negrita' },
                    { id: '800', value: '800', label: 'Extra negrita' }, { id: '900', value: '900', label: 'Muy gruesa' }
                  ]
                },
                { extend: 'color', label: 'Color de texto' },
                {
                  extend: 'text-align',
                  label: 'Alineación',
                  options: [
                    { id: 'left', value: 'left', label: 'Izquierda' }, { id: 'center', value: 'center', label: 'Centro' },
                    { id: 'right', value: 'right', label: 'Derecha' }, { id: 'justify', value: 'justify', label: 'Justificado' }
                  ]
                },
                { extend: 'line-height', label: 'Interlineado' },
                { extend: 'letter-spacing', label: 'Espaciado de letras' }
              ]
            },
            {
              name: 'Fondo',
              open: false,
              properties: [{ extend: 'background-color', label: 'Color de fondo' }, { extend: 'opacity', label: 'Opacidad' }]
            },
            {
              name: 'Espaciado',
              open: false,
              properties: [
                {
                  extend: 'margin',
                  label: 'Margen exterior',
                  properties: [
                    { extend: 'margin-top', label: 'Arriba' }, { extend: 'margin-right', label: 'Derecha' },
                    { extend: 'margin-bottom', label: 'Abajo' }, { extend: 'margin-left', label: 'Izquierda' }
                  ]
                },
                {
                  extend: 'padding',
                  label: 'Margen interior',
                  properties: [
                    { extend: 'padding-top', label: 'Arriba' }, { extend: 'padding-right', label: 'Derecha' },
                    { extend: 'padding-bottom', label: 'Abajo' }, { extend: 'padding-left', label: 'Izquierda' }
                  ]
                }
              ]
            },
            {
              name: 'Bordes y sombra',
              open: false,
              properties: [
                {
                  extend: 'border-radius',
                  label: 'Bordes redondeados',
                  properties: [
                    { extend: 'border-top-left-radius', label: 'Arriba izq.' }, { extend: 'border-top-right-radius', label: 'Arriba der.' },
                    { extend: 'border-bottom-left-radius', label: 'Abajo izq.' }, { extend: 'border-bottom-right-radius', label: 'Abajo der.' }
                  ]
                },
                {
                  extend: 'border',
                  label: 'Borde',
                  properties: [
                    { extend: 'border-width', label: 'Grosor' },
                    {
                      extend: 'border-style',
                      label: 'Estilo',
                      options: [
                        { id: 'none', value: 'none', label: 'Sin borde' }, { id: 'solid', value: 'solid', label: 'Lleno' },
                        { id: 'dashed', value: 'dashed', label: 'Rayado' }, { id: 'dotted', value: 'dotted', label: 'Punteado' }
                      ]
                    },
                    { extend: 'border-color', label: 'Color' }
                  ]
                },
                {
                  extend: 'box-shadow',
                  label: 'Sombra',
                  properties: [
                    { extend: 'box-shadow-h', label: 'Horizontal' }, { extend: 'box-shadow-v', label: 'Vertical' },
                    { extend: 'box-shadow-blur', label: 'Desenfoque' }, { extend: 'box-shadow-spread', label: 'Expansión' },
                    { extend: 'box-shadow-color', label: 'Color' },
                    { extend: 'box-shadow-type', label: 'Tipo', options: [{ id: '', value: '', label: 'Exterior' }, { id: 'inset', value: 'inset', label: 'Interior' }] }
                  ]
                }
              ]
            },
            {
              name: 'Tamaño',
              open: false,
              properties: [
                { extend: 'width', label: 'Ancho' },
                { extend: 'height', label: 'Alto' },
                { extend: 'max-width', label: 'Ancho máximo' }
              ]
            }
          ]
        },
        i18n: {
          locale: 'es',
          messages: {
            es: {
              assetManager: {
                addButton: 'Agregar por link',
                inputPlh: 'https://… (link de la imagen)',
                modalTitle: 'Elegí una imagen',
                uploadTitle: 'Arrastrá una imagen acá o hacé clic para subir una'
              },
              domComponents: {
                names: {
                  '': 'Bloque', wrapper: 'Página', text: 'Texto', image: 'Imagen', video: 'Video', link: 'Enlace', map: 'Mapa', label: 'Etiqueta',
                  section: 'Sección', div: 'Bloque', header: 'Encabezado', footer: 'Pie de página', nav: 'Menú', main: 'Contenido', article: 'Artículo',
                  h1: 'Título', h2: 'Título', h3: 'Título', h4: 'Título', h5: 'Título', h6: 'Título', p: 'Párrafo', span: 'Texto', a: 'Enlace o botón',
                  button: 'Botón', img: 'Imagen', ul: 'Lista', ol: 'Lista numerada', li: 'Ítem de lista', i: 'Ícono', iframe: 'Video o mapa',
                  details: 'Pregunta desplegable', summary: 'Pregunta', strong: 'Texto en negrita', em: 'Texto en cursiva'
                }
              },
              styleManager: {
                empty: 'Hacé clic en cualquier texto, imagen o sección de la página para editarla.',
                properties: {
                  'margin-top': 'Arriba', 'margin-right': 'Derecha', 'margin-bottom': 'Abajo', 'margin-left': 'Izquierda',
                  'padding-top': 'Arriba', 'padding-right': 'Derecha', 'padding-bottom': 'Abajo', 'padding-left': 'Izquierda',
                  'border-top-left-radius': 'Arriba izq.', 'border-top-right-radius': 'Arriba der.',
                  'border-bottom-left-radius': 'Abajo izq.', 'border-bottom-right-radius': 'Abajo der.',
                  'border-width': 'Grosor', 'border-style': 'Estilo', 'border-color': 'Color',
                  'box-shadow-h': 'Horizontal', 'box-shadow-v': 'Vertical', 'box-shadow-blur': 'Desenfoque', 'box-shadow-spread': 'Expansión',
                  'box-shadow-color': 'Color', 'box-shadow-type': 'Tipo'
                }
              },
              traitManager: {
                empty: 'Hacé clic en un elemento de la página.',
                traits: {
                  empty: 'Este elemento no tiene opciones avanzadas.',
                  labels: { id: 'Identificador', alt: 'Descripción de la imagen', title: 'Texto al pasar el mouse', href: 'Enlace', target: 'Cómo se abre', provider: 'Tipo de video', src: 'Link o archivo', poster: 'Imagen de portada', autoplay: 'Reproducir solo', loop: 'Repetir', controls: 'Mostrar controles', muted: 'Sin sonido' },
                  options: { target: { false: 'Misma pestaña', _blank: 'Pestaña nueva' } }
                }
              }
            }
          }
        }
      });

      /* ---------- Plantillas de secciones ---------- */
      const eyebrow = 'text-brand-gold font-bold uppercase tracking-widest text-xs';
      const h2base = 'text-3xl sm:text-4xl font-extrabold tracking-tight font-serif mt-1';
      const h2 = h2base + ' text-stone-900';
      const btn = 'inline-flex items-center gap-2 bg-brand-green hover:bg-brand-lightgreen text-white font-bold px-6 py-3 rounded-full transition-colors';
      const arrowBtn = 'absolute top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white w-11 h-11 rounded-full flex items-center justify-center transition-colors';
      const arrows =
        `<button type="button" class="cr-prev ${arrowBtn} left-3" aria-label="Anterior"><i class="fa-solid fa-chevron-left"></i></button>` +
        `<button type="button" class="cr-next ${arrowBtn} right-3" aria-label="Siguiente"><i class="fa-solid fa-chevron-right"></i></button>`;
      function onArrowClick(e) {
        var b = e.target.closest && e.target.closest('.cr-prev,.cr-next');
        if (!b) return;
        var t = b.parentElement.querySelector('.cr-track');
        if (t) t.scrollBy({ left: (b.classList.contains('cr-next') ? 1 : -1) * t.clientWidth, behavior: 'smooth' });
      }
      const arrowDocs = new WeakSet();
      const attachArrows = (doc) => {
        if (doc && !arrowDocs.has(doc)) { arrowDocs.add(doc); doc.addEventListener('click', onArrowClick, true); }
      };
      editor.on('canvas:frame:load', (ev) => attachArrows(ev && ev.window && ev.window.document));
      editor.on('load', () => attachArrows(editor.Canvas.getDocument()));
      const head = (eb, title, dark) =>
        `<div class="text-center mb-10"><span class="${eyebrow}">${eb}</span><h2 class="${h2base} ${dark ? 'text-white' : 'text-stone-900'}">${title}</h2></div>`;
      const stars = '<div class="text-brand-gold text-xl mb-3"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>';

      const VIDEO_PLACEHOLDER =
        '<div class="js-video-empty aspect-video flex items-center justify-center text-center p-6 text-stone-400"><div><i class="fa-brands fa-youtube text-6xl text-red-500"></i>' +
        '<p class="mt-4 text-base">Pegá el link de YouTube en el panel <b>Rápido</b> (a la derecha) para mostrar tu video acá.</p></div></div>';
      const videoFrame = (id) =>
        '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '" title="Video de YouTube" class="w-full aspect-video" loading="lazy" ' +
        'allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>';
      const youtubeId = (text) => {
        const t = String(text).trim();
        if (/^[\w-]{11}$/.test(t)) return t;
        const m = t.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^#\s]*&)?v=|embed\/|shorts\/|live\/|v\/))([\w-]{11})/);
        return m ? m[1] : null;
      };

      const photoSlide = (n, t, d) =>
        `<div class="cr-slide relative shrink-0 w-full snap-center h-[340px] sm:h-[480px]"><img src="${img(n)}" alt="${t}" class="absolute inset-0 w-full h-full object-cover">` +
        `<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>` +
        `<div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8"><h3 class="text-2xl sm:text-3xl font-bold text-white">${t}</h3><p class="text-stone-300 text-sm mt-1">${d}</p></div></div>`;
      const quoteSlide = () =>
        `<div class="cr-slide shrink-0 w-full snap-center px-12 sm:px-24 py-14 text-center">${stars}` +
        `<p class="text-xl sm:text-2xl font-serif text-stone-800 leading-relaxed">“Escribí acá la opinión de un visitante.”</p><p class="mt-5 font-bold text-brand-green">Nombre y apellido</p></div>`;
      const cardSlide = (n, i) =>
        `<div class="cr-slide shrink-0 w-[85%] sm:w-[48%] lg:w-[32%] snap-start bg-white rounded-3xl overflow-hidden shadow-lg border border-stone-200">` +
        `<img src="${img(n)}" alt="Foto" class="w-full h-52 object-cover"><div class="p-6"><h3 class="text-xl font-bold text-stone-900">Título ${i}</h3><p class="text-stone-600 text-sm mt-2">Descripción corta de esta tarjeta.</p></div></div>`;
      const plan = (name, featured) =>
        `<div class="rounded-3xl p-8 text-center bg-white ${featured ? 'border-2 border-brand-accent shadow-xl' : 'border border-stone-200 shadow-sm'}">` +
        `<h3 class="text-xl font-bold text-stone-900">${name}</h3><div class="text-4xl font-extrabold text-brand-green my-4">$ 0.000</div><p class="text-sm text-stone-500">por noche</p>` +
        `<ul class="mt-6 space-y-2 text-sm text-stone-700 text-left"><li><i class="fa-solid fa-check text-brand-accent mr-2"></i>Detalle incluido</li><li><i class="fa-solid fa-check text-brand-accent mr-2"></i>Detalle incluido</li><li><i class="fa-solid fa-check text-brand-accent mr-2"></i>Detalle incluido</li></ul>` +
        `<a href="https://wa.me/5492604321990" target="_blank" class="mt-8 ${btn}">Consultar</a></div>`;

      const R = (x, y, w, h, f, rx) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx == null ? 3 : rx}" fill="${f || '#a8a29e'}"/>`;
      const C = (x, y, r, f) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f || '#44403c'}"/>`;
      const wf = (...p) => `<svg viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="100" rx="8" fill="#f5f5f4"/>${p.join('')}</svg>`;
      const IMG = '#c9b99a', TXT = '#a8a29e', DARK = '#44403c', ACC = '#38b000', GOLD = '#e9a825', GRN = '#1a4332';

      const TEMPLATES = [
        { id: 'carousel-photos', cat: 'Carruseles', name: 'Carrusel de fotos', desc: 'Fotos grandes que se deslizan, cada una con título y texto.',
          wire: wf(R(14, 12, 132, 62, IMG), C(24, 43, 6), C(136, 43, 6), R(22, 56, 56, 6, '#fff'), R(22, 65, 36, 3, '#e7e5e4'), C(72, 86, 3), C(81, 86, 3, TXT), C(90, 86, 3, TXT)),
          html: `<section class="py-16 bg-stone-900 text-white"><div class="max-w-5xl mx-auto px-4">${head('Conocé el lugar', 'Título del carrusel', true)}<div class="relative rounded-3xl overflow-hidden shadow-2xl"><div class="cr-track flex overflow-x-auto snap-x snap-mandatory scroll-smooth" data-autoplay="5000">${photoSlide('Pileta HD.jfif', 'Primera diapositiva', 'Descripción corta de esta foto.')}${photoSlide('Parrilla.jpeg', 'Segunda diapositiva', 'Descripción corta de esta foto.')}${photoSlide('carpa1.jpg', 'Tercera diapositiva', 'Descripción corta de esta foto.')}</div>${arrows}</div></div></section>` },
        { id: 'carousel-cards', cat: 'Carruseles', name: 'Carrusel de tarjetas', desc: 'Varias tarjetas con foto y texto que se deslizan de costado.',
          wire: wf(R(10, 22, 44, 52, '#fff'), R(10, 22, 44, 26, IMG), R(14, 54, 30, 4, DARK), R(14, 61, 36, 3, TXT), R(58, 22, 44, 52, '#fff'), R(58, 22, 44, 26, IMG), R(62, 54, 30, 4, DARK), R(62, 61, 36, 3, TXT), R(106, 22, 44, 52, '#fff'), R(106, 22, 44, 26, IMG), R(110, 54, 30, 4, DARK), R(110, 61, 36, 3, TXT), C(8, 48, 5), C(152, 48, 5)),
          html: `<section class="py-16 bg-stone-100"><div class="max-w-6xl mx-auto px-4">${head('Para descubrir', 'Título del carrusel')}<div class="relative"><div class="cr-track flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-1 py-2">${['Parrilla.jpeg', 'Piletas1.jpeg', 'Hornos1.jfif', 'carpa1.jpg', 'Mesashdlibres.jfif'].map((n, i) => cardSlide(n, i + 1)).join('')}</div>${arrows}</div></div></section>` },
        { id: 'carousel-quotes', cat: 'Carruseles', name: 'Carrusel de opiniones', desc: 'Frases de visitantes que se deslizan, con estrellas.',
          wire: wf(R(16, 16, 128, 60, '#fff'), R(60, 26, 40, 5, GOLD), R(30, 40, 100, 5, TXT), R(40, 50, 80, 5, TXT), R(62, 62, 36, 5, GRN), C(24, 46, 5), C(136, 46, 5), C(72, 88, 3), C(81, 88, 3, TXT), C(90, 88, 3, TXT)),
          html: `<section class="py-16 bg-stone-100"><div class="max-w-4xl mx-auto px-4">${head('Opiniones', 'Lo que dicen quienes nos visitaron')}<div class="relative bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden"><div class="cr-track flex overflow-x-auto snap-x snap-mandatory scroll-smooth" data-autoplay="6000">${quoteSlide()}${quoteSlide()}${quoteSlide()}</div>${arrows}</div></div></section>` },

        { id: 'gallery-3', cat: 'Galerías', name: 'Galería de 3 fotos', desc: 'Tres fotos en fila con título arriba.',
          wire: wf(R(40, 10, 80, 7, DARK), R(10, 28, 42, 54, IMG), R(59, 28, 42, 54, IMG), R(108, 28, 42, 54, IMG)),
          html: `<section class="py-20 bg-stone-900"><div class="max-w-6xl mx-auto px-4"><h2 class="${h2base} text-white text-center mb-10">Nuestra galería</h2><div class="grid sm:grid-cols-3 gap-4">${['Parrilla.jpeg', 'Piletas1.jpeg', 'Hornos1.jfif'].map((n) => `<img src="${img(n)}" alt="Foto" class="rounded-2xl w-full h-64 object-cover">`).join('')}</div></div></section>` },
        { id: 'gallery-mosaic', cat: 'Galerías', name: 'Galería de 6 fotos', desc: 'Cuadrícula de seis fotos para mostrar más lugares.',
          wire: wf(R(40, 8, 80, 6, DARK), R(10, 22, 42, 32, IMG), R(59, 22, 42, 32, IMG), R(108, 22, 42, 32, IMG), R(10, 60, 42, 32, IMG), R(59, 60, 42, 32, IMG), R(108, 60, 42, 32, IMG)),
          html: `<section class="py-20 bg-white"><div class="max-w-6xl mx-auto px-4">${head('Fotos', 'Un recorrido por el camping')}<div class="grid grid-cols-2 md:grid-cols-3 gap-3">${['Pileta HD.jfif', 'Parrilla.jpeg', 'carpa1.jpg', 'Hornos1.jfif', 'Mesashdlibres.jfif', 'PuertaCamping.jfif'].map((n) => `<img src="${img(n)}" alt="Foto" class="rounded-2xl w-full h-56 object-cover">`).join('')}</div></div></section>` },

        { id: 'hero-image', cat: 'Contenido', name: 'Banner con foto de fondo', desc: 'Foto a pantalla ancha con título, texto y botón encima.',
          wire: wf(R(0, 10, 160, 80, IMG, 0), R(40, 34, 80, 8, '#fff'), R(52, 48, 56, 4, '#e7e5e4'), R(58, 60, 44, 10, ACC, 5)),
          html: `<section class="js-bg-target relative py-32 bg-stone-800 text-white text-center overflow-hidden"><img src="${img('PuertaCamping.jfif')}" alt="Fondo" class="js-bg-photo absolute inset-0 w-full h-full object-cover"><div class="js-bg-overlay absolute inset-0 bg-black/55 pointer-events-none"></div><div class="relative max-w-3xl mx-auto px-4"><h2 class="text-4xl sm:text-5xl font-extrabold font-serif">Título grande</h2><p class="mt-4 text-lg text-white/85">Escribí acá un texto corto que acompañe la foto.</p><a href="#" class="mt-8 ${btn.replace('bg-brand-green', 'bg-brand-accent')}">Botón de acción</a></div></section>` },
        { id: 'hero-color', cat: 'Contenido', name: 'Banner de color', desc: 'Franja verde con título, texto y botón.',
          wire: wf(R(0, 14, 160, 72, GRN, 0), R(40, 34, 80, 8, '#fff'), R(52, 48, 56, 4, '#a8c7b5'), R(58, 60, 44, 10, ACC, 5)),
          html: `<section class="py-24 bg-brand-green text-white text-center"><div class="max-w-3xl mx-auto px-4"><h2 class="text-4xl sm:text-5xl font-extrabold font-serif">Título de la sección</h2><p class="mt-4 text-lg text-white/80">Escribí acá una descripción corta que invite a seguir leyendo.</p><a href="#" class="mt-8 ${btn.replace('bg-brand-green', 'bg-brand-accent')}">Botón de acción</a></div></section>` },
        { id: 'text-img', cat: 'Contenido', name: 'Texto + imagen', desc: 'Texto a la izquierda y una foto a la derecha.',
          wire: wf(R(12, 28, 20, 4, GOLD), R(12, 38, 56, 7, DARK), R(12, 52, 62, 3, TXT), R(12, 59, 58, 3, TXT), R(12, 66, 50, 3, TXT), R(86, 20, 62, 60, IMG, 8)),
          html: `<section class="py-20 bg-white"><div class="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center"><div><span class="${eyebrow}">Subtítulo</span><h2 class="${h2}">Título de la sección</h2><p class="text-stone-600 mt-4 leading-relaxed">Contá acá lo que quieras: servicios, historia del camping, novedades. Hacé doble clic para cambiar este texto.</p></div><img src="${img('carpa1.jpg')}" alt="Imagen" class="rounded-3xl shadow-xl w-full h-80 object-cover"></div></section>` },
        { id: 'img-text', cat: 'Contenido', name: 'Imagen + texto', desc: 'Una foto a la izquierda y el texto a la derecha.',
          wire: wf(R(12, 20, 62, 60, IMG, 8), R(88, 28, 20, 4, GOLD), R(88, 38, 56, 7, DARK), R(88, 52, 62, 3, TXT), R(88, 59, 58, 3, TXT), R(88, 66, 50, 3, TXT)),
          html: `<section class="py-20 bg-stone-100"><div class="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center"><img src="${img('Pileta HD.jfif')}" alt="Imagen" class="rounded-3xl shadow-xl w-full h-80 object-cover"><div><span class="${eyebrow}">Subtítulo</span><h2 class="${h2}">Otro título</h2><p class="text-stone-600 mt-4 leading-relaxed">Texto de ejemplo para acompañar la imagen. Cambialo a gusto.</p></div></div></section>` },
        { id: 'cards-3', cat: 'Contenido', name: '3 tarjetas con ícono', desc: 'Tres servicios o ventajas con ícono, título y texto.',
          wire: wf(R(40, 8, 80, 6, DARK), R(10, 26, 44, 56, '#fff'), R(59, 26, 44, 56, '#fff'), R(108, 26, 44, 56, '#fff'), C(32, 42, 7, GOLD), C(81, 42, 7, GOLD), C(130, 42, 7, GOLD), R(18, 56, 28, 4, DARK), R(67, 56, 28, 4, DARK), R(116, 56, 28, 4, DARK), R(16, 66, 32, 3, TXT), R(65, 66, 32, 3, TXT), R(114, 66, 32, 3, TXT)),
          html: `<section class="py-20 bg-white"><div class="max-w-6xl mx-auto px-4">${head('Servicios', 'Lo que ofrecemos')}<div class="grid md:grid-cols-3 gap-6">${['fa-fire', 'fa-water-ladder', 'fa-shower'].map((ic, i) => `<div class="bg-stone-50 border border-stone-200 rounded-3xl p-8 text-center shadow-sm"><div class="text-brand-gold text-3xl mb-4"><i class="fa-solid ${ic}"></i></div><h3 class="text-xl font-bold text-stone-900">Tarjeta ${i + 1}</h3><p class="text-stone-600 mt-2 text-sm">Describí este servicio en una o dos líneas.</p></div>`).join('')}</div></div></section>` },
        { id: 'stats', cat: 'Contenido', name: 'Datos destacados', desc: 'Cuatro números grandes con su descripción.',
          wire: wf(R(0, 24, 160, 52, GRN, 0), R(14, 38, 22, 10, GOLD), R(52, 38, 22, 10, GOLD), R(90, 38, 22, 10, GOLD), R(128, 38, 22, 10, GOLD), R(14, 56, 22, 3, '#a8c7b5'), R(52, 56, 22, 3, '#a8c7b5'), R(90, 56, 22, 3, '#a8c7b5'), R(128, 56, 22, 3, '#a8c7b5')),
          html: `<section class="py-14 bg-brand-green text-white"><div class="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">${[1, 2, 3, 4].map(() => '<div><div class="text-4xl font-extrabold text-brand-gold">00</div><p class="mt-1 text-sm text-white/80">Dato destacado</p></div>').join('')}</div></section>` },
        { id: 'pricing', cat: 'Contenido', name: 'Tarifas (3 opciones)', desc: 'Tres cuadros de precios con detalle y botón.',
          wire: wf(R(10, 18, 44, 66, '#fff'), R(58, 12, 44, 78, '#fff'), R(106, 18, 44, 66, '#fff'), R(58, 12, 44, 78, 'none'), R(18, 28, 28, 4, DARK), R(66, 24, 28, 4, DARK), R(114, 28, 28, 4, DARK), R(20, 40, 24, 8, GRN), R(68, 36, 24, 8, GRN), R(116, 40, 24, 8, GRN), R(18, 72, 28, 8, ACC, 4), R(66, 74, 28, 8, ACC, 4), R(114, 72, 28, 8, ACC, 4)),
          html: `<section class="py-20 bg-stone-100"><div class="max-w-6xl mx-auto px-4">${head('Tarifas', 'Elegí cómo acampar')}<div class="grid md:grid-cols-3 gap-6 items-center">${plan('Tarifa 1', false)}${plan('Tarifa 2', true)}${plan('Tarifa 3', false)}</div></div></section>` },
        { id: 'testimonials', cat: 'Contenido', name: 'Opiniones en tarjetas', desc: 'Tres opiniones de visitantes una al lado de otra.',
          wire: wf(R(10, 22, 44, 56, '#fff'), R(59, 22, 44, 56, '#fff'), R(108, 22, 44, 56, '#fff'), R(16, 28, 24, 4, GOLD), R(65, 28, 24, 4, GOLD), R(114, 28, 24, 4, GOLD), R(16, 40, 32, 3, TXT), R(65, 40, 32, 3, TXT), R(114, 40, 32, 3, TXT), R(16, 47, 28, 3, TXT), R(65, 47, 28, 3, TXT), R(114, 47, 28, 3, TXT), R(16, 64, 22, 4, GRN), R(65, 64, 22, 4, GRN), R(114, 64, 22, 4, GRN)),
          html: `<section class="py-20 bg-white"><div class="max-w-6xl mx-auto px-4">${head('Opiniones', 'Lo que dicen nuestros visitantes')}<div class="grid md:grid-cols-3 gap-6">${[1, 2, 3].map(() => `<div class="bg-stone-50 border border-stone-200 rounded-3xl p-8">${stars}<p class="text-stone-700 leading-relaxed">“Escribí acá la opinión de un visitante.”</p><p class="mt-4 font-bold text-brand-green">Nombre y apellido</p></div>`).join('')}</div></div></section>` },
        { id: 'faq', cat: 'Contenido', name: 'Preguntas frecuentes', desc: 'Preguntas que se abren y cierran al tocarlas.',
          wire: wf(R(40, 10, 80, 6, DARK), R(22, 26, 116, 14, '#fff'), R(22, 46, 116, 14, '#fff'), R(22, 66, 116, 14, '#fff'), R(28, 31, 50, 4, DARK), R(28, 51, 40, 4, DARK), R(28, 71, 56, 4, DARK)),
          html: `<section class="py-20 bg-white"><div class="max-w-3xl mx-auto px-4"><h2 class="${h2base} text-center mb-8 text-stone-900">Preguntas frecuentes</h2>${[1, 2, 3].map((i) => `<details class="border border-stone-200 rounded-2xl p-5 mb-3"><summary class="font-bold cursor-pointer text-stone-900">Pregunta ${i}</summary><p class="mt-3 text-stone-600">Escribí la respuesta acá.</p></details>`).join('')}</div></section>` },

        { id: 'promo-banner', cat: 'Promociones', name: 'Banner de promoción', desc: 'Cartel destacado con etiqueta, título, descuento y botón.',
          wire: wf(R(8, 20, 144, 60, GRN, 10), R(16, 30, 24, 6, GOLD), R(16, 42, 72, 8, '#fff'), R(16, 56, 52, 3, '#a8c7b5'), R(16, 64, 30, 8, ACC, 4), R(110, 36, 32, 18, GOLD), R(108, 60, 36, 3, '#a8c7b5')),
          html: `<section class="py-10 bg-stone-100"><div class="max-w-6xl mx-auto px-4"><div class="js-bg-target relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-r from-brand-darkgreen via-brand-green to-brand-lightgreen text-white"><img src="${img('PuertaCamping.jfif')}" alt="Fondo" class="js-bg-photo absolute inset-0 w-full h-full object-cover opacity-25"><div class="relative grid md:grid-cols-3 gap-6 items-center p-8 sm:p-12"><div class="md:col-span-2"><span class="inline-block bg-brand-gold text-stone-900 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">Promoción</span><h2 class="${h2base} text-white">Título de la promo</h2><p class="mt-3 text-white/85 max-w-xl">Contá en una o dos líneas de qué trata la promoción y hasta cuándo está vigente.</p><a href="https://wa.me/5492604321990" target="_blank" class="mt-6 ${btn.replace('bg-brand-green', 'bg-brand-accent')}">Quiero aprovecharla</a></div><div class="text-center"><div class="text-6xl font-extrabold text-brand-gold">20%</div><p class="text-sm uppercase tracking-widest text-white/80">de descuento</p></div></div></div></div></section>` },
        { id: 'promo-video', cat: 'Promociones', name: 'Video de YouTube', desc: 'Muestra un video de YouTube con título. Pegás el link en el panel Rápido.',
          wire: wf(R(20, 12, 120, 66, '#1c1917', 8), '<polygon points="72,34 72,56 92,45" fill="#fff"/>', R(48, 84, 64, 4, TXT)),
          html: `<section class="py-16 bg-stone-900 text-white"><div class="max-w-4xl mx-auto px-4">${head('Mirá el video', 'Título del video', true)}<div class="js-video-slot rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">${VIDEO_PLACEHOLDER}</div><p class="text-center text-stone-400 text-sm mt-4">Texto debajo del video (opcional).</p></div></section>` },
        { id: 'cta', cat: 'Reservas y contacto', name: 'Llamado a reservar', desc: 'Franja dorada con botón de WhatsApp.',
          wire: wf(R(0, 26, 160, 48, GOLD, 0), R(46, 36, 68, 7, DARK), R(54, 49, 52, 3, '#78580e'), R(56, 58, 48, 9, GRN, 5)),
          html: `<section class="py-16 bg-brand-gold text-stone-900 text-center"><div class="max-w-3xl mx-auto px-4"><h2 class="text-3xl font-extrabold font-serif">¿Listo para acampar?</h2><p class="mt-3">Escribinos y consultá disponibilidad.</p><a href="https://wa.me/5492604321990" target="_blank" class="mt-6 ${btn}"><i class="fa-brands fa-whatsapp"></i> Consultar por WhatsApp</a></div></section>` },
        { id: 'location', cat: 'Reservas y contacto', name: 'Datos + mapa', desc: 'Dirección, teléfono y horarios junto a un mapa.',
          wire: wf(R(12, 24, 22, 4, GOLD), R(12, 34, 52, 6, DARK), R(12, 48, 56, 3, TXT), R(12, 55, 50, 3, TXT), R(12, 62, 54, 3, TXT), R(82, 18, 66, 64, '#bcd2c4', 8), C(115, 46, 6, '#d94f4f')),
          html: `<section class="py-20 bg-white"><div class="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center"><div><span class="${eyebrow}">Cómo llegar</span><h2 class="${h2}">Dónde estamos</h2><ul class="mt-6 space-y-3 text-stone-700"><li><i class="fa-solid fa-location-dot text-brand-gold w-6"></i>Dirección del lugar</li><li><i class="fa-solid fa-phone text-brand-gold w-6"></i>Teléfono de contacto</li><li><i class="fa-solid fa-clock text-brand-gold w-6"></i>Horarios de atención</li></ul><a href="https://wa.me/5492604321990" target="_blank" class="mt-8 ${btn}"><i class="fa-brands fa-whatsapp"></i> Escribinos</a></div><div class="rounded-3xl overflow-hidden shadow-xl border border-stone-200"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3247.7880242459073!2d-69.5863801!3d-35.50951939999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967a7f0056fd77bd%3A0x387e9a8b694f248!2sCamping%20La%20Guineu!5e0!3m2!1ses!2sar!4v1790047937984!5m2!1ses!2sar" width="100%" height="360" style="border:0" allowfullscreen loading="lazy"></iframe></div></div></section>` }
      ];

      const SECTION_CAT = { id: 'Secciones', label: 'Secciones (arrastrar a la página)', open: false };
      const LOOSE_CAT = { id: 'Elementos sueltos', label: 'Elementos sueltos', open: true };
      const lbl = (icon, text) => '<i class="fa-solid ' + icon + '"></i><div class="gjs-block-label">' + text + '</div>';
      const bm = editor.BlockManager;
      TEMPLATES.forEach((t) => bm.add(t.id, { category: SECTION_CAT, label: '<div class="tpl-mini">' + t.wire + '</div><div class="gjs-block-label">' + t.name + '</div>', content: t.html, select: true }));
      [
        ['el-title', lbl('fa-heading', 'Título'), '<h2 class="' + h2 + '">Un título nuevo</h2>'],
        ['el-text', lbl('fa-align-left', 'Párrafo'), '<p class="text-stone-600 leading-relaxed">Escribí tu texto acá. Doble clic para editarlo.</p>'],
        ['el-image', lbl('fa-image', 'Imagen'), { type: 'image', attributes: { src: img('Parrilla.jpeg'), alt: 'Imagen' }, classes: ['rounded-2xl', 'w-full', 'h-72', 'object-cover'] }],
        ['el-button', lbl('fa-computer-mouse', 'Botón'), '<a href="#" class="' + btn + '">Botón</a>']
      ].forEach(([id, label, content]) => bm.add(id, { category: LOOSE_CAT, label, content, select: true }));

      function rootSection(comp) {
        const wrapper = editor.getWrapper();
        let top = comp;
        while (top && top.parent() && top.parent() !== wrapper) top = top.parent();
        return top && top.parent() === wrapper ? top : null;
      }
      function sectionLabel(comp) {
        const el = comp.getEl();
        const h = el && el.querySelector('h1,h2,h3');
        return (h && h.textContent.trim().slice(0, 40)) || comp.getName();
      }
      function insertContent(ed, content, asSection) {
        const wrapper = ed.getWrapper();
        const sel = ed.getSelected();
        let added;
        if (asSection || !sel) {
          const top = rootSection(sel);
          added = wrapper.append(content, { at: top ? top.index() + 1 : wrapper.components().length });
        } else {
          const host = sel.is('text') || sel.is('image') || sel.is('link') ? sel.parent() : sel;
          added = host.append(content, { at: sel.parent() === host ? sel.index() + 1 : undefined });
        }
        const first = added && added[0];
        if (first) {
          ed.select(first);
          const el = first.getEl && first.getEl();
          if (el) el.scrollIntoView({ behavior: 'smooth', block: asSection ? 'start' : 'center' });
        }
      }
      function addBlock(ed, block) {
        const cat = block.get('category');
        insertContent(ed, block.get('content'), !!cat && cat.id === 'Secciones');
      }

      /* ---------- Ventana "Agregar sección" ---------- */
      const CATS = ['Todas', 'Promociones', 'Carruseles', 'Galerías', 'Contenido', 'Reservas y contacto'];
      let activeCat = 'Todas';
      function renderModal() {
        $('tpl-filters').innerHTML = CATS.map((c) => '<button data-cat="' + c + '" class="' + (c === activeCat ? 'active' : '') + '">' + c + '</button>').join('');
        $('tpl-grid').innerHTML = TEMPLATES.filter((t) => activeCat === 'Todas' || t.cat === activeCat)
          .map((t) => '<button class="tpl-card" data-id="' + t.id + '"><div class="tpl-thumb">' + t.wire + '</div><b>' + t.name + '</b><span>' + t.desc + '</span></button>').join('');
        const top = rootSection(editor.getSelected());
        $('tpl-foot').textContent = top ? 'Se agregará debajo de la sección: “' + sectionLabel(top) + '”' : 'Se agregará al final de la página. (Si antes elegís una sección, se agrega debajo de esa.)';
      }
      function openModal() { renderModal(); $('tpl-modal').hidden = false; }
      function closeModal() { $('tpl-modal').hidden = true; }
      $('b-add-left').onclick = openModal;
      $('tpl-close').onclick = closeModal;
      $('tpl-modal').addEventListener('click', (e) => { if (e.target === $('tpl-modal')) closeModal(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
      $('tpl-filters').addEventListener('click', (e) => {
        const b = e.target.closest('button');
        if (b) { activeCat = b.dataset.cat; renderModal(); }
      });
      $('tpl-grid').addEventListener('click', (e) => {
        const card = e.target.closest('.tpl-card');
        const t = card && TEMPLATES.find((x) => x.id === card.dataset.id);
        if (t) { insertContent(editor, t.html, true); closeModal(); }
      });

      /* ---------- Subir / bajar / ver capas ---------- */
      function moveSelected(ed, dir) {
        const sel = ed.getSelected();
        if (!sel || !sel.parent()) return;
        const to = sel.index() + dir;
        if (to < 0 || to >= sel.parent().components().length) return;
        sel.move(sel.parent(), { at: dir > 0 ? to + 1 : to });
        ed.select(sel);
        const el = sel.getEl && sel.getEl();
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      editor.Commands.add('move-up', { run: (ed) => moveSelected(ed, -1) });
      editor.Commands.add('move-down', { run: (ed) => moveSelected(ed, 1) });

      function closestSlide(comp) {
        let c = comp;
        while (c) {
          if (c.getClasses && c.getClasses().includes('cr-slide')) return c;
          c = c.parent();
        }
        return null;
      }
      editor.Commands.add('add-slide', {
        run: (ed) => {
          const s = closestSlide(ed.getSelected());
          if (!s) return;
          const copy = s.clone();
          s.parent().components().add(copy, { at: s.index() + 1 });
          ed.select(copy);
          const el = copy.getEl && copy.getEl();
          if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      });

      editor.on('component:selected', (comp) => {
        if (!comp || comp === editor.getWrapper()) return;
        const tb = comp.get('toolbar') || [];
        const extra = [];
        if (!tb.some((t) => t.command === 'move-up')) {
          extra.push(
            { attributes: { class: 'fa-solid fa-arrow-up', title: 'Subir' }, command: 'move-up' },
            { attributes: { class: 'fa-solid fa-arrow-down', title: 'Bajar' }, command: 'move-down' }
          );
        }
        if (closestSlide(comp) && !tb.some((t) => t.command === 'add-slide')) {
          extra.push({ attributes: { class: 'fa-solid fa-plus', title: 'Agregar diapositiva (copia esta)' }, command: 'add-slide' });
        }
        if (extra.length) comp.set('toolbar', [...extra, ...tb]);
        try { comp.removeTrait('id'); } catch (e) {}
        showTab('quick');
        renderQuick();
      });
      editor.on('component:deselected', () => renderQuick());

      /* ---------- Panel rápido (opciones según lo que se elija) ---------- */
      const TEXT_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'li', 'button', 'summary', 'label', 'strong', 'em'];
      const tagOf = (c) => String(c.get('tagName') || '').toLowerCase();
      const isImage = (c) => c.get('type') === 'image';
      const isTextual = (c) => !isImage(c) && c.get('type') !== 'textnode' && (c.is('text') || c.is('link') || TEXT_TAGS.includes(tagOf(c)));
      function withClass(comp, cls) {
        let c = comp;
        while (c) {
          if (c.getClasses && c.getClasses().includes(cls)) return c;
          c = c.parent();
        }
        return null;
      }
      function friendly(c) {
        const t = tagOf(c);
        if (isImage(c)) return 'Imagen';
        if (t === 'iframe') return withClass(c, 'js-video-slot') ? 'Video de YouTube' : 'Mapa o contenido incrustado';
        if (c.getClasses && c.getClasses().includes('js-video-slot')) return 'Video de YouTube';
        if (t === 'a') return 'Botón o enlace';
        if (/^h[1-6]$/.test(t)) return 'Título';
        if (t === 'p') return 'Párrafo';
        if (t === 'section') return 'Sección completa';
        if (t === 'button') return 'Botón';
        if (t === 'span' || t === 'li') return 'Texto';
        if (t === 'details') return 'Pregunta desplegable';
        return c.is('text') ? 'Texto' : 'Bloque';
      }
      function textTargets(c) {
        if (isTextual(c)) return [c];
        const out = [];
        c.onAll((x) => { if (x !== c && isTextual(x)) out.push(x); });
        return out;
      }
      function dropStyle(c, props) {
        const st = Object.assign({}, c.getStyle());
        props.forEach((p) => delete st[p]);
        c.setStyle(st);
      }
      function setSrc(c, src) { c.set('src', src); c.addAttributes({ src }); }
      function pickImage(onPick) {
        editor.AssetManager.open({
          types: ['image'],
          accept: 'image/*',
          select(asset) {
            onPick(asset.get('src'));
            editor.AssetManager.close();
          }
        });
      }
      const rgbParts = (css) => (String(css).match(/[\d.]+/g) || []).map(Number);
      function rgbToHex(css) {
        const m = rgbParts(css);
        if (m.length < 3 || (m.length > 3 && m[3] === 0)) return '#ffffff';
        return '#' + m.slice(0, 3).map((n) => Math.round(n).toString(16).padStart(2, '0')).join('');
      }
      const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
      const computed = (c, prop) => { const el = c.getEl && c.getEl(); return el ? getComputedStyle(el)[prop] : ''; };
      const bgTargetOf = (sec) => (sec.getClasses().includes('js-bg-target') ? sec : sec.find('.js-bg-target')[0] || sec);
      const SIZES = [['Pequeño', '0.875rem'], ['Normal', '1rem'], ['Grande', '1.25rem'], ['Muy grande', '1.75rem'], ['Enorme', '2.5rem'], ['Gigante', '3.5rem']];

      function renderQuick() {
        const box = $('qk-body');
        const sel = editor.getSelected();
        if (!sel || sel === editor.getWrapper()) {
          box.innerHTML = '<div class="qk-empty">Hacé clic en cualquier <b>texto, imagen, botón o sección</b> de la página y acá aparecen sus opciones para cambiarlo fácil.</div>';
          return;
        }
        const sec = rootSection(sel);
        const targets = textTargets(sel);
        const onHandlers = [];
        const on = (id, ev, fn) => onHandlers.push([id, ev, fn]);
        let h = '<div class="qk-head"><span>Estás editando</span><b>' + friendly(sel) + '</b></div>';

        if (isImage(sel)) {
          h += '<div class="qk-card"><div class="qk-title">Imagen</div><img class="qk-thumb" id="qk-thumb" src="' + esc(sel.get('src') || sel.getAttributes().src) + '">' +
            '<button class="qk-btn" id="qk-img"><i class="fa-solid fa-image"></i> Cambiar imagen</button>' +
            '<label for="qk-alt">Descripción de la imagen</label><input type="text" id="qk-alt" value="' + esc(sel.getAttributes().alt) + '"><small>Elegís una del proyecto o subís una nueva: se achica y se ajusta sola.</small></div>';
          on('qk-img', 'click', () => pickImage((src) => { setSrc(sel, src); renderQuick(); }));
          on('qk-alt', 'change', (e) => sel.addAttributes({ alt: e.target.value }));
        }

        if (tagOf(sel) === 'a') {
          const a = sel.getAttributes();
          h += '<div class="qk-card"><div class="qk-title">A dónde lleva</div><label for="qk-href">Enlace</label><input type="text" id="qk-href" placeholder="https://… o #seccion" value="' + esc(a.href) + '">' +
            '<label for="qk-target">Al hacer clic</label><select id="qk-target"><option value="">Abre en la misma pestaña</option><option value="_blank"' + (a.target === '_blank' ? ' selected' : '') + '>Abre en una pestaña nueva</option></select>' +
            '<small>Para cambiar el texto del botón: doble clic sobre él.</small></div>';
          on('qk-href', 'change', (e) => sel.addAttributes({ href: e.target.value }));
          on('qk-target', 'change', (e) => (e.target.value ? sel.addAttributes({ target: e.target.value }) : sel.removeAttributes('target')));
        }

        const slot = withClass(sel, 'js-video-slot') || (sec && sec.find('.js-video-slot')[0]);
        if (slot) {
          const frame = slot.components().filter((c) => tagOf(c) === 'iframe' || c.get('type') === 'video')[0];
          const curId = frame && (frame.get('videoId') || (String(frame.getAttributes().src || '').match(/\/embed\/([\w-]{11})/) || [])[1]);
          h += '<div class="qk-card"><div class="qk-title">Video de YouTube</div><label for="qk-yt">Link del video</label>' +
            '<input type="text" id="qk-yt" placeholder="https://www.youtube.com/watch?v=…" value="' + esc(curId ? 'https://youtu.be/' + curId : '') + '">' +
            '<div id="qk-yt-msg"></div><small>Subí tu video a YouTube (es gratis), copiá el link y pegalo acá. Se reproduce desde YouTube, así la página no se vuelve pesada. Apretá Enter para aplicar.</small>' +
            (curId ? '<button class="qk-btn sec danger" id="qk-ytclear"><i class="fa-solid fa-trash"></i> Quitar el video</button>' : '') + '</div>';
          on('qk-yt', 'change', (e) => {
            const id = youtubeId(e.target.value);
            if (!id) {
              $('qk-yt-msg').className = 'qk-err';
              $('qk-yt-msg').textContent = 'Ese link no parece ser de un video de YouTube. Copialo desde la barra de direcciones o con "Compartir".';
              return;
            }
            slot.components(videoFrame(id));
            renderQuick();
          });
          on('qk-ytclear', 'click', () => { slot.components(VIDEO_PLACEHOLDER); renderQuick(); });
        }

        if (targets.length) {
          const cur = targets[0].getEl ? computed(targets[0], 'fontFamily').split(',')[0].replace(/["']/g, '').trim() : '';
          const groups = [];
          FONTS.forEach((f, i) => { let g = groups.find((x) => x.n === f.grp); if (!g) groups.push((g = { n: f.grp, items: [] })); g.items.push([f, i]); });
          h += '<div class="qk-card"><div class="qk-title">Tipo de letra' + (isTextual(sel) ? '' : ' (de toda la sección)') + '</div><div class="font-list">' +
            groups.map((g) => '<div class="font-grp">' + g.n + '</div>' + g.items.map(([f, i]) => '<button class="font-item' + (f.n === cur ? ' on' : '') + '" data-f="' + i + '" style="font-family:' + esc(fontCss(f)) + '">' + f.n + '<small>' + f.d + '</small></button>').join('')).join('') +
            '</div></div>';
          if (isTextual(sel)) {
            const curSize = (sel.getStyle() || {})['font-size'] || '';
            h += '<div class="qk-card"><div class="qk-title">Texto</div><label for="qk-color">Color del texto</label><input type="color" id="qk-color" value="' + rgbToHex(computed(sel, 'color')) + '">' +
              '<label for="qk-size">Tamaño</label><select id="qk-size"><option value="">Tamaño original</option>' + SIZES.map(([l, v]) => '<option value="' + v + '"' + (curSize === v ? ' selected' : '') + '>' + l + '</option>').join('') + '</select></div>';
            on('qk-color', 'input', (e) => sel.addStyle({ color: e.target.value }));
            on('qk-size', 'change', (e) => (e.target.value ? sel.addStyle({ 'font-size': e.target.value }) : dropStyle(sel, ['font-size'])));
          }
        }

        if (sec) {
          const target = bgTargetOf(sec);
          const photo = sec.getClasses().includes('js-bg-photo') ? sec : sec.find('.js-bg-photo')[0];
          const overlay = sec.find('.js-bg-overlay')[0];
          h += '<div class="qk-card"><div class="qk-title">Fondo de la sección</div>';
          if (photo) {
            h += '<img class="qk-thumb" src="' + esc(photo.get('src') || photo.getAttributes().src) + '"><button class="qk-btn" id="qk-bgphoto"><i class="fa-solid fa-image"></i> Cambiar foto de fondo</button>' +
              '<label class="qk-check"><input type="checkbox" id="qk-bgshow"' + (photo.getClasses().includes('hidden') ? '' : ' checked') + '> Mostrar la foto</label>';
            if (overlay) {
              const a = rgbParts(computed(overlay, 'backgroundColor'));
              h += '<label for="qk-bgdark">Oscurecer la foto</label><input type="range" id="qk-bgdark" min="0" max="90" value="' + Math.round((a.length > 3 ? a[3] : 1) * 100) + '">';
            } else {
              h += '<label for="qk-bgfade">Intensidad de la foto</label><input type="range" id="qk-bgfade" min="5" max="100" value="' + Math.round(parseFloat(computed(photo, 'opacity') || 1) * 100) + '">';
            }
            on('qk-bgphoto', 'click', () => pickImage((src) => { setSrc(photo, src); renderQuick(); }));
            on('qk-bgshow', 'change', (e) => (e.target.checked ? photo.removeClass('hidden') : photo.addClass('hidden')));
            on('qk-bgdark', 'input', (e) => overlay.addStyle({ 'background-color': 'rgba(0,0,0,' + e.target.value / 100 + ')' }));
            on('qk-bgfade', 'input', (e) => photo.addStyle({ opacity: e.target.value / 100 }));
          }
          h += '<label for="qk-bgcolor">Color de fondo</label><input type="color" id="qk-bgcolor" value="' + rgbToHex(computed(target, 'backgroundColor')) + '">' +
            '<button class="qk-link" id="qk-bgreset">Volver al fondo original</button>' +
            (photo ? '<small>La foto se ajusta sola al tamaño de la sección. El color se ve si ocultás la foto.</small>' : '') + '</div>';
          on('qk-bgcolor', 'input', (e) => target.addStyle({ 'background-color': e.target.value, 'background-image': 'none' }));
          on('qk-bgreset', 'click', () => { dropStyle(target, ['background-color', 'background-image']); renderQuick(); });

          h += '<div class="qk-card"><div class="qk-title">Esta sección</div><div class="qk-row">' +
            '<button class="qk-btn sec" id="qk-up"><i class="fa-solid fa-arrow-up"></i> Subir</button><button class="qk-btn sec" id="qk-down"><i class="fa-solid fa-arrow-down"></i> Bajar</button>' +
            '<button class="qk-btn sec" id="qk-dup"><i class="fa-regular fa-copy"></i> Duplicar</button><button class="qk-btn sec danger" id="qk-del"><i class="fa-solid fa-trash"></i> Eliminar</button></div></div>';
          const act = (fn) => () => { editor.select(sec); fn(); };
          on('qk-up', 'click', act(() => moveSelected(editor, -1)));
          on('qk-down', 'click', act(() => moveSelected(editor, 1)));
          on('qk-dup', 'click', act(() => editor.runCommand('tlb-clone')));
          on('qk-del', 'click', () => { if (confirm('¿Eliminar esta sección completa?')) { sec.remove(); } });
        }

        box.innerHTML = h;
        onHandlers.forEach(([id, ev, fn]) => { const el = $(id); if (el) el.addEventListener(ev, fn); });
        box.querySelectorAll('.font-item').forEach((b) =>
          b.addEventListener('click', () => {
            const css = fontCss(FONTS[+b.dataset.f]);
            targets.forEach((t) => t.addStyle({ 'font-family': css }));
            box.querySelectorAll('.font-item').forEach((x) => x.classList.toggle('on', x === b));
          })
        );
      }

      /* ---------- Pestañas, barra superior ---------- */
      function showTab(name) {
        ['quick', 'styles', 'layers'].forEach((t) => ($(t).style.display = t === name ? 'block' : 'none'));
        document.querySelectorAll('.tabs button').forEach((b) => b.classList.toggle('active', b.dataset.tab === name));
      }
      document.querySelectorAll('.tabs button').forEach((b) => b.addEventListener('click', () => showTab(b.dataset.tab)));
      showTab('quick');
      renderQuick();

      $('b-undo').onclick = () => editor.UndoManager.undo();
      $('b-redo').onclick = () => editor.UndoManager.redo();
      document.querySelectorAll('[data-device]').forEach((b) =>
        b.addEventListener('click', () => {
          editor.setDevice(b.dataset.device);
          document.querySelectorAll('[data-device]').forEach((x) => x.classList.toggle('active', x === b));
        })
      );
      $('b-outline').onclick = () => {
        const cmd = 'core:component-outline';
        const on = editor.Commands.isActive(cmd);
        if (on) editor.stopCommand(cmd);
        else editor.runCommand(cmd);
        $('b-outline').classList.toggle('active', !on);
      };
      $('b-reset').onclick = () => {
        if (!confirm('¿Volver a la página original? Se pierden los cambios hechos en este navegador.')) return;
        try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
        location.reload();
      };

      /* ---------- Exportar ---------- */
      function buildPage(forDownload) {
        const fix = forDownload ? relativize : (x) => x;
        const html = fix(editor.getWrapper().getInnerHTML());
        const css = fix(editor.getCss({ avoidProtected: true }));
        const root = forDownload ? '' : SITE_BASE;
        const fontsHref = fontsUrl(FONTS.filter((f) => f.base || (!f.sys && (css.includes(f.n) || html.includes(f.n)))));
        return Promise.resolve(
          '<!DOCTYPE html>\n<html lang="es" class="scroll-smooth">\n<head>\n<meta charset="UTF-8">\n' + (forDownload ? '' : '<meta name="robots" content="noindex">\n') + '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>' + siteTitle + '</title>\n' +
          '<script src="' + root + 'vendor/tailwind-3.4.17.js"><\/script>\n<link rel="stylesheet" href="' + root + 'Src/laguineu.css">\n' +
          '<link rel="stylesheet" href="' + FA_URL + '" integrity="' + FA_INTEGRITY + '" crossorigin="anonymous" referrerpolicy="no-referrer">\n' +
          '<link rel="stylesheet" href="' + fontsHref + '">\n<script src="' + root + 'Src/tw-config.js"><\/script>\n' +
          '<style>.cr-track{scrollbar-width:none}.cr-track::-webkit-scrollbar{display:none}' + css + '</style>\n</head>\n' +
          '<body class="bg-brand-sand text-stone-800 font-sans antialiased selection:bg-brand-accent selection:text-white">\n' + html + '\n<script src="' + root + 'Src/site.js" defer><\/script>\n</body>\n</html>'
        );
      }
      $('b-preview').onclick = async () => {
        const page = await buildPage(false);
        window.open(URL.createObjectURL(new Blob([page], { type: 'text/html' })), '_blank');
      };
      $('b-download').onclick = async () => {
        const page = await buildPage(true);
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([page], { type: 'text/html' }));
        a.download = 'index.html';
        a.click();
      };

      /* ---------- Publicar, versiones y sesión ---------- */
      const pubMsg = (text, cls) => { $('pub-msg').textContent = text; $('pub-msg').className = cls || ''; };
      const toBase64 = (str) => {
        const bytes = new TextEncoder().encode(str);
        let bin = '';
        for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
        return btoa(bin);
      };
      async function sha256Hex(text) {
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
        return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
      }
      const DATA_IMG = /data:image\/(webp|jpeg|png|gif);base64,([A-Za-z0-9+/=]+)/g;
      async function extractImages(text, files) {
        const found = new Map();
        for (const m of text.matchAll(DATA_IMG)) if (!found.has(m[0])) found.set(m[0], m);
        for (const [full, m] of found) {
          const path = 'Public/Images/uploads/' + (await sha256Hex(m[2])).slice(0, 12) + '.' + (m[1] === 'jpeg' ? 'jpg' : m[1]);
          files.set(path, m[2]);
          text = text.split(full).join(path);
        }
        return text;
      }
      async function publishSite(note) {
        const files = new Map();
        const page = await extractImages(await buildPage(true), files);
        const publishedAt = Date.now();
        const data = editor.getProjectData();
        delete data.assets;
        data.meta = { publishedAt };
        const project = await extractImages(relativize(JSON.stringify(data)), files);
        const payload = { html: toBase64(page), project: toBase64(project), message: note, files: [...files].map(([path, content]) => ({ path, content })) };
        if (payload.html.length > 3900000 || payload.project.length > 3900000) throw new Error('La página quedó demasiado pesada. Probá con menos imágenes nuevas.');
        const res = await apiPost('publish', payload);
        const body = await res.json().catch(() => ({}));
        if (res.status === 401) throw new Error('Se cerró la sesión. Recargá la página e ingresá de nuevo.');
        if (!res.ok) throw new Error(body.error || 'No se pudo publicar (' + res.status + ').');
        try { localStorage.setItem(BASE_KEY, String(publishedAt)); } catch (e) {}
        return body;
      }
      const closePub = () => { $('pub-modal').hidden = true; };
      $('b-publish').onclick = () => { pubMsg(''); $('pub-modal').hidden = false; $('pub-note').focus(); };
      $('pub-close').onclick = closePub;
      $('pub-modal').addEventListener('click', (e) => { if (e.target === $('pub-modal')) closePub(); });
      $('pub-go').onclick = async () => {
        $('pub-go').disabled = true;
        pubMsg('Publicando…');
        try {
          await publishSite($('pub-note').value);
          $('pub-note').value = '';
          pubMsg('¡Publicado! En 1 o 2 minutos se ve en el sitio (si lo ves igual, recargá con Ctrl+F5).', 'ok');
        } catch (e) {
          pubMsg(e.message || String(e), 'err');
        }
        $('pub-go').disabled = false;
      };

      const closeVer = () => { $('ver-modal').hidden = true; };
      const verMsg = (text, cls) => { $('ver-msg').textContent = text; $('ver-msg').className = cls || ''; };
      async function loadVersion(sha) {
        let data = null;
        const r = await api('versions?sha=' + sha);
        if (r.ok) { try { data = JSON.parse(await r.text()); } catch (e) {} }
        editor.DomComponents.clear();
        editor.CssComposer.clear();
        if (data && data.pages) {
          editor.loadProjectData(restoreUrls(data));
        } else {
          const h = await api('versions?sha=' + sha + '&file=html');
          if (!h.ok) throw new Error('No se pudo cargar esa versión.');
          editor.setComponents(parseHtml(await h.text()).body);
        }
      }
      $('b-versions').onclick = async () => {
        $('ver-modal').hidden = false;
        verMsg('');
        $('ver-list').textContent = 'Cargando…';
        try {
          const r = await api('versions');
          const body = await r.json().catch(() => ({}));
          if (!r.ok) throw new Error(body.error || 'No se pudo leer el historial.');
          $('ver-list').innerHTML = '';
          if (!body.versions.length) $('ver-list').textContent = 'Todavía no hay versiones publicadas.';
          body.versions.forEach((v, i) => {
            const row = document.createElement('div');
            row.className = 'ver-row';
            const when = new Date(v.date).toLocaleString('es-AR', { dateStyle: 'medium', timeStyle: 'short' });
            const label = document.createElement('div');
            label.innerHTML = '<b></b><small></small>';
            label.querySelector('b').textContent = v.message.replace(/^Editor:\s*/, '') || 'Cambios en el sitio';
            label.querySelector('small').textContent = when + (i === 0 ? ' · versión actual' : '');
            const btn = document.createElement('button');
            btn.className = 'btn';
            btn.textContent = i === 0 ? 'Cargar' : 'Cargar esta versión';
            btn.onclick = async () => {
              if (!confirm('Se va a cargar esta versión en el editor y se reemplazan los cambios que tengas sin publicar. ¿Seguir?')) return;
              btn.disabled = true;
              try {
                await loadVersion(v.sha);
                closeVer();
                status.textContent = 'Versión cargada: revisala y tocá Publicar para dejarla en el sitio.';
              } catch (e) {
                verMsg(e.message, 'err');
                btn.disabled = false;
              }
            };
            row.append(label, btn);
            $('ver-list').appendChild(row);
          });
        } catch (e) {
          $('ver-list').textContent = '';
          verMsg(e.message, 'err');
        }
      };
      $('ver-close').onclick = closeVer;
      $('ver-modal').addEventListener('click', (e) => { if (e.target === $('ver-modal')) closeVer(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closePub(); closeVer(); } });

      $('b-logout').onclick = async () => {
        try { await apiPost('logout', {}); } catch (e) {}
        location.reload();
      };

      /* ---------- Estado de guardado ---------- */
      const status = $('status');
      editor.on('storage:end:store', () => (status.textContent = 'Guardado en este navegador ✓ ' + new Date().toLocaleTimeString()));
      editor.on('storage:error', () => (status.textContent = '⚠ No se pudo guardar (imágenes muy pesadas)'));

      editor.on('load', () => {
        if (!editor.getWrapper().components().length) {
          if (published) editor.loadProjectData(restoreUrls(published.data));
          else editor.setComponents(siteBody);
        }
        editor.runCommand('core:component-outline');
        status.textContent = 'Listo';
      });

    }

    ensureSession()
      .then(() => Promise.all([loadImages(), loadSource()]))
      .then(boot)
      .catch((err) => {
        $('status').textContent = 'Error: ' + err.message;
        console.error(err);
      });
  })();

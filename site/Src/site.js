(function () {
  'use strict';

  function run(fn) {
    try {
      fn();
    } catch (e) {
      console.warn(e);
    }
  }

  run(function () {
    var btn = document.getElementById('mobile-menu-btn');
    var menu = document.getElementById('mobile-menu');
    if (btn && menu) btn.addEventListener('click', function () { menu.classList.toggle('hidden'); });
  });

  run(function () {
    document.querySelectorAll('.faq-toggle').forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        var content = toggle.nextElementSibling;
        var icon = toggle.querySelector('i');
        if (!content) return;
        content.classList.toggle('hidden');
        if (icon) icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
      });
    });
  });

  run(function () {
    var slides = document.querySelectorAll('.carousel-item');
    var prevBtn = document.getElementById('prev-slide');
    var nextBtn = document.getElementById('next-slide');
    var current = 0;
    if (!nextBtn || !prevBtn || !slides.length) return;

    function update(index) {
      slides.forEach(function (slide, i) {
        if (i === index) {
          slide.classList.remove('opacity-0', 'z-0');
          slide.classList.add('opacity-100', 'z-10');
        } else {
          slide.classList.remove('opacity-100', 'z-10');
          slide.classList.add('opacity-0', 'z-0');
        }
      });
    }

    nextBtn.addEventListener('click', function () {
      current = (current + 1) % slides.length;
      update(current);
    });
    prevBtn.addEventListener('click', function () {
      current = (current - 1 + slides.length) % slides.length;
      update(current);
    });
    setInterval(function () {
      current = (current + 1) % slides.length;
      update(current);
    }, 6000);
  });

  run(function () {
    document.querySelectorAll('.cr-track[data-autoplay]').forEach(function (track) {
      var ms = Number(track.dataset.autoplay) || 5000;
      setInterval(function () {
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 4) track.scrollTo({ left: 0, behavior: 'smooth' });
        else track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
      }, ms);
    });
  });

  /* Galerías con categorías y botón "Ver más" */
  run(function () {
    document.querySelectorAll('.gal').forEach(function (gal) {
      var grid = gal.querySelector('.gal-grid');
      if (!grid) return;
      var items = Array.prototype.slice.call(grid.children);
      var chips = Array.prototype.slice.call(gal.querySelectorAll('[data-gcat]'));
      var more = gal.querySelector('.gal-more');
      var cat = 'all';
      var expanded = false;

      function apply() {
        var limit = parseInt(grid.getAttribute('data-limit'), 10) || 0;
        var shown = 0;
        var cut = 0;
        items.forEach(function (it) {
          var hide = !(cat === 'all' || it.getAttribute('data-g') === cat);
          if (!hide) {
            if (limit && !expanded && shown >= limit) {
              hide = true;
              cut++;
            } else {
              shown++;
            }
          }
          it.style.display = hide ? 'none' : '';
        });
        if (more) more.style.display = cut ? '' : 'none';
        chips.forEach(function (c) { c.classList.toggle('is-active', c.getAttribute('data-gcat') === cat); });
      }

      chips.forEach(function (c) {
        c.addEventListener('click', function () {
          cat = c.getAttribute('data-gcat');
          expanded = false;
          apply();
        });
      });
      if (more) more.addEventListener('click', function () { expanded = true; apply(); });
      apply();
    });
  });

  /* Opiniones de Google Maps (si el servidor tiene la clave configurada; si no, quedan las que escribió el cliente) */
  run(function () {
    var boxes = document.querySelectorAll('.g-reviews');
    if (!boxes.length) return;
    fetch('/api/reviews', { credentials: 'omit' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d || !d.reviews || !d.reviews.length) return;
        boxes.forEach(function (box) {
          var list = box.querySelector('.g-rev-list');
          var model = list && list.firstElementChild;
          if (!model) return;
          var cards = d.reviews.map(function (v) {
            var card = model.cloneNode(true);
            var set = function (sel, text) {
              var el = card.querySelector(sel);
              if (el) el.textContent = text;
            };
            set('.g-rev-stars', '★★★★★'.slice(0, v.rating) + '☆☆☆☆☆'.slice(0, 5 - v.rating));
            set('.g-rev-text', '“' + v.text + '”');
            set('.g-rev-name', v.author);
            set('.g-rev-when', v.when);
            return card;
          });
          while (list.firstChild) list.removeChild(list.firstChild);
          cards.forEach(function (c) { list.appendChild(c); });
          var score = box.querySelector('.g-rev-score');
          if (score && d.rating) {
            score.textContent = '★ ' + String(d.rating).replace('.', ',') + (d.count ? ' · ' + d.count + ' opiniones en Google' : ' en Google');
          }
          var link = box.querySelector('.g-rev-link');
          if (link && /^https:\/\//.test(d.url || '')) link.setAttribute('href', d.url);
        });
      })
      .catch(function () {});
  });

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.cr-prev,.cr-next');
    if (!btn) return;
    var track = btn.parentElement.querySelector('.cr-track');
    if (track) track.scrollBy({ left: (btn.classList.contains('cr-next') ? 1 : -1) * track.clientWidth, behavior: 'smooth' });
  });
})();

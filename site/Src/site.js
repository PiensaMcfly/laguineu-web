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

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.cr-prev,.cr-next');
    if (!btn) return;
    var track = btn.parentElement.querySelector('.cr-track');
    if (track) track.scrollBy({ left: (btn.classList.contains('cr-next') ? 1 : -1) * track.clientWidth, behavior: 'smooth' });
  });
})();

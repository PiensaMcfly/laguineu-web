(function apply() {
  if (window.tailwind) {
    window.tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              green: '#1a4332',
              darkgreen: '#123124',
              lightgreen: '#2d6a4f',
              accent: '#38b000',
              gold: '#e9a825',
              sand: '#fbf8f3',
              dark: '#1c1917'
            }
          },
          fontFamily: {
            sans: ['Plus Jakarta Sans', 'sans-serif'],
            serif: ['Playfair Display', 'serif']
          }
        }
      }
    };
  } else {
    setTimeout(apply, 15);
  }
})();

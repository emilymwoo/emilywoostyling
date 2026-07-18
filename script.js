(function () {
  const track = document.getElementById('carouselTrack');
  const slides = Array.from(track.children);
  const dotsWrap = document.getElementById('carouselDots');
  const prevBtn = document.querySelector('.car-btn--prev');
  const nextBtn = document.querySelector('.car-btn--next');
  let current = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Go to fit ' + (i + 1));
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function goTo(i) {
    current = Math.max(0, Math.min(slides.length - 1, i));
    slides[current].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    dots.forEach((d, idx) => d.classList.toggle('is-active', idx === current));
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const idx = slides.indexOf(entry.target);
        if (idx !== -1) {
          current = idx;
          dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
        }
      }
    });
  }, { root: track, threshold: 0.6 });
  slides.forEach((s) => observer.observe(s));
})();

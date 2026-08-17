/* ============================================================
   SECOND WIND PRO — MAIN INTERACTIONS
   ------------------------------------------------------------
   Vanilla JS, no dependencies. Each module is wrapped in an IIFE
   so they can be reordered or extracted independently.

   Modules
   ------------------------------------------------------------
   1. ServicesScroll   — mouse / touch-driven horizontal scroll
                         on the services section, with keyboard
                         focus integration
   2. NavScroll        — shrink + densify the fixed nav on scroll
   3. RosterTabs       — toggle button group with aria-pressed
   4. HeroParallax     — subtle mouse parallax (motion-safe)

   Performance
   ------------------------------------------------------------
   - All listeners scoped to specific elements, no document-wide
     mousemove handlers except where required.
   - Animation loops use requestAnimationFrame.
   - prefers-reduced-motion is respected in CSS globally; the
     hero parallax additionally checks the media query in JS.
   ============================================================ */


/* ------------------------------------------------------------
   1. ServicesScroll
   ------------------------------------------------------------
   Horizontal cursor-driven scroll for the .services section.
   The cards are wide enough to overflow the viewport; the user's
   horizontal cursor position drives a translateX on the track.
   ------------------------------------------------------------ */
(function ServicesScroll(){
  const section  = document.getElementById('services');
  const track    = document.getElementById('servicesTrack');
  const progress = document.getElementById('progressBar');
  if (!section || !track) return;

  const mobileMq = window.matchMedia('(max-width: 980px)');
  let targetX = 0;
  let currentX = 0;
  let maxTranslate = 0;

  function isMobile() {
    return mobileMq.matches;
  }

  function recalc() {
    if (isMobile()) {
      maxTranslate = 0;
      targetX = 0;
      currentX = 0;
      track.style.transform = '';
      return;
    }
    maxTranslate = track.scrollWidth - section.clientWidth + 80;
  }
  recalc();
  window.addEventListener('resize', recalc);
  if (mobileMq.addEventListener) mobileMq.addEventListener('change', recalc);

  // Mouse position → horizontal offset
  section.addEventListener('mousemove', (e) => {
    if (isMobile()) return;
    const rect = section.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    targetX = Math.max(0, Math.min(1, ratio)) * maxTranslate;
  });

  // Touch fallback for mobile/tablet
  let touchStartX = 0;
  let touchStartOffset = 0;
  section.addEventListener('touchstart', (e) => {
    if (isMobile()) return;
    touchStartX = e.touches[0].clientX;
    touchStartOffset = currentX;
  });
  section.addEventListener('touchmove', (e) => {
    if (isMobile()) return;
    const dx = touchStartX - e.touches[0].clientX;
    targetX = Math.max(0, Math.min(maxTranslate, touchStartOffset + dx));
  });

  // Smooth lerp toward targetX
  function tick() {
    if (isMobile()) {
      requestAnimationFrame(tick);
      return;
    }
    currentX += (targetX - currentX) * 0.08;
    track.style.transform = `translateX(${-currentX}px)`;
    const pct = Math.min(100, (currentX / maxTranslate) * 100);
    if (progress) progress.style.width = pct + '%';
    requestAnimationFrame(tick);
  }
  tick();

  // Keyboard accessibility — bring focused card into view
  track.addEventListener('focusin', (e) => {
    const card = e.target.closest('.service-card');
    if (!card) return;
    const cardRect = card.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();
    if (cardRect.right > sectionRect.right - 40) {
      targetX = Math.min(maxTranslate, currentX + (cardRect.right - sectionRect.right + 80));
    } else if (cardRect.left < sectionRect.left + 40) {
      targetX = Math.max(0, currentX - (sectionRect.left - cardRect.left + 80));
    }
  });
})();


/* ------------------------------------------------------------
   2. NavScroll
   ------------------------------------------------------------
   Compacts and solidifies the fixed nav once user has scrolled.
   ------------------------------------------------------------ */
(function NavScroll(){
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const mobileMq = window.matchMedia('(max-width: 980px)');

  window.addEventListener('scroll', () => {
    if (mobileMq.matches) {
      nav.style.padding = '';
      nav.style.background = window.scrollY > 60
        ? 'rgba(10,7,16,.92)'
        : '';
      return;
    }
    if (window.scrollY > 60) {
      nav.style.padding = '14px 40px';
      nav.style.background = 'rgba(10,7,16,.92)';
    } else {
      nav.style.padding = '22px 40px';
      nav.style.background = 'linear-gradient(to bottom, rgba(10,7,16,.85), rgba(10,7,16,0))';
    }
  });
})();


/* ------------------------------------------------------------
   3. RosterTabs
   ------------------------------------------------------------
   Single-select toggle group. Updates .active class plus the
   aria-pressed attribute so screen readers announce the change.

   NOTE FOR DEV: this is currently visual-only — wire to your
   data source to actually filter the roster grid.
   ------------------------------------------------------------ */
(function RosterTabs(){
  const tabs = document.querySelectorAll('.tab');
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((other) => {
        other.classList.remove('active');
        other.setAttribute('aria-pressed', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-pressed', 'true');

      // TODO: trigger roster filter here.
      // const sport = tab.dataset.sport;
      // filterRoster(sport);
    });
  });
})();


/* ------------------------------------------------------------
   4. HeroParallax
   ------------------------------------------------------------
   Subtle 8px / 6px translate on hero content based on mouse
   position. Disabled when user prefers reduced motion.
   ------------------------------------------------------------ */
(function HeroParallax(){
  const heroContent = document.querySelector('.hero-content');
  const hero = document.querySelector('.hero');
  if (!heroContent || !hero) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.height / 2) / rect.height;
    heroContent.style.transform = `translate(${x * -8}px, ${y * -6}px)`;
    heroContent.style.transition = 'transform .6s cubic-bezier(.2,.7,.2,1)';
  });
})();

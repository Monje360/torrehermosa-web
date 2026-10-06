/* =========================================================
   PASTELERÍA TORREHERMOSA — Interactions v2
   ========================================================= */

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

  // -- Scroll handling on initial load --
  // /distribuidores is a Vercel rewrite to the home page; jump to the
  // corresponding section instead of landing at the top.
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  const path = window.location.pathname.replace(/\/$/, '');
  const sectionByPath = {
    '/distribuidores': 'distribuidores',
  };
  const targetId = sectionByPath[path];

  if (targetId) {
    document.addEventListener('DOMContentLoaded', () => {
      const target = document.getElementById(targetId);
      if (target) {
        requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }));
      }
    });
  } else {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  }

  const nav = document.getElementById('nav');
  const burger = document.querySelector('.nav__burger');
  const sheetLinks = document.querySelectorAll('.sheet a');
  const fab = document.querySelector('.wa-fab');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // -- Burger / mobile sheet --
  const closeSheet = () => {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menú');
    document.body.style.overflow = '';
  };
  if (burger) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    sheetLinks.forEach(a => a.addEventListener('click', closeSheet));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
  }

  // -- Reveal on scroll --
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || '0', 10);
        if (delay) el.style.transitionDelay = `${delay}ms`;
        el.classList.add('is-visible');
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // -- Count-up numbers --
  const counters = document.querySelectorAll('[data-count]');
  const runCount = (el) => {
    const end = parseInt(el.dataset.count, 10);
    const start = el.hasAttribute('data-plain') ? Math.max(0, end - 60) : 0;
    const dur = 1400;
    const t0 = performance.now();
    const step = (t) => {
      const p = clamp((t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(start + (end - start) * eased);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && !reduceMotion) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        runCount(entry.target);
        cio.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach(el => cio.observe(el));
  }

  // -- Manifesto: split into words for scroll scrubbing --
  const scrub = document.querySelector('[data-scrub-text]');
  let words = [];
  if (scrub) {
    const text = scrub.textContent.trim().replace(/\s+/g, ' ');
    scrub.setAttribute('aria-label', text);
    scrub.innerHTML = text.split(' ')
      .map(w => `<span class="w" aria-hidden="true">${w}</span>`)
      .join(' ');
    words = Array.from(scrub.querySelectorAll('.w'));
  }

  // -- Flavor picker --
  const picker = document.querySelector('[data-picker]');
  if (picker) {
    const stage = picker.querySelector('.picker__stage');
    const swatches = Array.from(picker.querySelectorAll('.swatch'));
    const nameEl = picker.querySelector('[data-picker-name]');
    const tagEl = picker.querySelector('[data-picker-tag]');
    const numEl = picker.querySelector('[data-picker-num]');
    const awardEl = picker.querySelector('[data-picker-award]');
    const ctaEl = picker.querySelector('[data-picker-cta]');
    let current = stage.querySelector('[data-picker-img]');
    let swapTimer;

    // Preload flavor images after page load
    window.addEventListener('load', () => {
      swatches.forEach(s => { const i = new Image(); i.src = s.dataset.img; });
    });

    const select = (idx, focus = false) => {
      const s = swatches[idx];
      if (!s || s.classList.contains('is-active')) return;
      swatches.forEach((b, i) => {
        const on = i === idx;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-checked', on ? 'true' : 'false');
        b.tabIndex = on ? 0 : -1;
      });
      if (focus) s.focus();

      // Crossfade image
      const next = document.createElement('img');
      next.className = 'picker__img';
      next.src = s.dataset.img;
      next.alt = `Suspiro de ${s.dataset.name}`;
      stage.insertBefore(next, awardEl);
      const prev = current;
      current = next;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        next.classList.add('is-current');
        prev.classList.remove('is-current');
        setTimeout(() => prev.remove(), 800);
      }));

      // Text
      picker.classList.add('is-swapping');
      clearTimeout(swapTimer);
      swapTimer = setTimeout(() => {
        nameEl.textContent = s.dataset.name;
        tagEl.textContent = s.dataset.tag;
        numEl.textContent = String(idx + 1).padStart(2, '0');
        picker.classList.remove('is-swapping');
      }, 220);

      awardEl.classList.toggle('is-hidden', !s.dataset.award);
      const msg = `Hola, me gustaría encargar un Suspiro de ${s.dataset.name}`;
      ctaEl.href = `https://wa.me/34636216585?text=${encodeURIComponent(msg)}`;
    };

    swatches.forEach((s, i) => {
      s.tabIndex = i === 0 ? 0 : -1;
      s.addEventListener('click', () => select(i));
      s.addEventListener('keydown', (e) => {
        const cur = swatches.findIndex(b => b.classList.contains('is-active'));
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); select((cur + 1) % swatches.length, true); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); select((cur - 1 + swatches.length) % swatches.length, true); }
      });
    });

    // Swipe on the image (mobile)
    let x0 = null;
    stage.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(dx) < 40) return;
      const cur = swatches.findIndex(b => b.classList.contains('is-active'));
      select(dx < 0 ? (cur + 1) % swatches.length : (cur - 1 + swatches.length) % swatches.length);
    }, { passive: true });
  }

  // -- Scroll-linked effects (single rAF loop) --
  const heroStage = document.querySelector('[data-hero-stage]');
  const heroFrame = document.querySelector('[data-hero-frame]');
  const heroImg = heroFrame ? heroFrame.querySelector('img') : null;
  const story = document.querySelector('[data-story]');
  const storyImg = story ? story.querySelector('.story__img') : null;
  const storySteps = story ? Array.from(story.querySelectorAll('.story__step')) : [];
  const storyBar = story ? story.querySelector('.story__progress') : null;
  const parallax = document.querySelector('[data-parallax]');
  const vh = () => window.innerHeight;

  const update = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 8);
    if (fab) fab.classList.toggle('is-visible', y > vh() * 0.6);
    if (story) {
      const r = story.getBoundingClientRect();
      nav.classList.toggle('is-dark', r.top <= 28 && r.bottom > 28);
    }

    if (reduceMotion) return;

    // Hero: frame grows to full and image de-zooms as you scroll
    if (heroStage && heroFrame) {
      const r = heroStage.getBoundingClientRect();
      const p = clamp(1 - (r.top - vh() * 0.15) / (vh() * 0.6));
      heroFrame.style.transform = `scale(${0.9 + p * 0.1})`;
      if (heroImg) heroImg.style.transform = `scale(${1.12 - p * 0.12})`;
    }

    // Manifesto words
    if (words.length) {
      const r = scrub.getBoundingClientRect();
      const p = clamp((vh() * 0.85 - r.top) / (r.height + vh() * 0.35));
      const lit = Math.floor(p * words.length);
      for (let i = 0; i < words.length; i++) words[i].classList.toggle('on', i < lit);
    }

    // Story: pinned progress
    if (story) {
      const r = story.getBoundingClientRect();
      const total = r.height - vh();
      const p = clamp(-r.top / total);
      const n = storySteps.length;
      const active = Math.min(n - 1, Math.floor(p * n));
      storySteps.forEach((s, i) => {
        s.classList.toggle('is-active', i === active);
        s.classList.toggle('is-done', i < active);
      });
      if (storyImg) story.style.setProperty('--s', (0.82 + clamp(p * 2.2) * 0.18).toFixed(4));
      story.style.setProperty('--glow', (0.35 + p * 0.65).toFixed(3));
      if (storyBar) storyBar.style.setProperty('--p', p.toFixed(4));
    }

    // Heritage parallax
    if (parallax) {
      const r = parallax.parentElement.getBoundingClientRect();
      if (r.bottom > 0 && r.top < vh()) {
        const p = (r.top + r.height / 2 - vh() / 2) / vh();
        parallax.style.transform = `translate3d(0, ${(p * -6).toFixed(2)}%, 0)`;
      }
    }
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  };
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  if (reduceMotion) {
    storySteps.forEach(s => s.classList.add('is-active'));
    if (story) story.style.setProperty('--s', '1');
  }
})();

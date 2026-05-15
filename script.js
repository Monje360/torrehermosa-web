/* =========================================================
   PASTELERÍA TORREHERMOSA — Interactions
   ========================================================= */

(() => {
  'use strict';

  // -- Scroll handling on initial load --
  // /distribuidores is a Vercel rewrite to the home page; auto-scroll
  // to the corresponding section instead of landing at the top.
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  const path = window.location.pathname.replace(/\/$/, '');
  const sectionByPath = {
    '/distribuidores': 'distribuidores',
  };
  const targetId = sectionByPath[path];

  if (targetId) {
    // Wait until the section is in the DOM, then scroll to it (no animation
    // on initial load to avoid the jarring "top → bottom" jump).
    document.addEventListener('DOMContentLoaded', () => {
      const target = document.getElementById(targetId);
      if (target) {
        // Defer to next frame so the layout is settled.
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
  const hero = document.querySelector('.hero');
  const burger = document.querySelector('.nav__burger');
  const navLinks = document.querySelectorAll('.nav__menu a');
  const yearEl = document.getElementById('year');

  // -- Current year in footer --
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // -- Nav state: scrolled + over-hero (light text) --
  const heroHeight = () => (hero ? hero.offsetHeight : window.innerHeight);

  const updateNav = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    nav.classList.toggle('is-light', y < heroHeight() - 80);
  };
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });
  window.addEventListener('resize', updateNav);

  // -- Burger menu --
  if (burger) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navLinks.forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }));
  }

  // -- Reveal on scroll --
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || '0', 10);
        if (delay) el.style.transitionDelay = `${delay}ms`;
        el.classList.add('is-visible');
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // -- Subtle parallax on hero image (rAF throttled) --
  const heroImg = document.querySelector('.hero__img');
  if (heroImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, heroHeight());
        heroImg.style.transform = `scale(${1 + y * 0.0002}) translateY(${y * 0.18}px)`;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();

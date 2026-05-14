/* Download each slide as a 1080×1350 PNG using html-to-image (loaded from CDN) */
(() => {
  'use strict';

  const loadLib = () => new Promise((resolve, reject) => {
    if (window.htmlToImage) return resolve();
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/html-to-image@1.11.11/dist/html-to-image.min.js';
    s.onload = () => resolve();
    s.onerror = reject;
    document.head.appendChild(s);
  });

  const slugify = (s) => s.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const carouselSlug = () =>
    (document.title || 'carousel').replace(/Torrehermosa\s*·\s*/i, '').trim();

  const downloadSlide = async (slide, idx) => {
    await loadLib();
    const dataUrl = await window.htmlToImage.toPng(slide, {
      width: 1080,
      height: 1350,
      pixelRatio: 1,
      cacheBust: true,
    });
    const a = document.createElement('a');
    a.download = `${slugify(carouselSlug())}-${String(idx + 1).padStart(2, '0')}.png`;
    a.href = dataUrl;
    a.click();
  };

  const downloadAll = async () => {
    const slides = document.querySelectorAll('.slide');
    for (let i = 0; i < slides.length; i++) {
      await downloadSlide(slides[i], i);
      // small delay to avoid browser throttling many downloads at once
      await new Promise(r => setTimeout(r, 400));
    }
  };

  window.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((s, i) => {
      const btn = document.createElement('button');
      btn.className = 'slide__dl-btn';
      btn.textContent = `↓ Slide ${i + 1}`;
      btn.addEventListener('click', () => downloadSlide(s, i));
      s.appendChild(btn);
    });

    const downloadAllBtn = document.getElementById('download-all');
    if (downloadAllBtn) downloadAllBtn.addEventListener('click', downloadAll);
  });
})();

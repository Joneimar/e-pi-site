// Gallery / Lightbox
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
let galleryItems = [];
let currentIndex = 0;

document.querySelectorAll('[data-gallery]').forEach(el => {
  el.style.cursor = 'pointer';
  el.addEventListener('click', () => {
    const group = el.dataset.gallery;
    galleryItems = Array.from(document.querySelectorAll(`[data-gallery="${group}"]`));
    currentIndex = galleryItems.indexOf(el);
    openLightbox();
  });
});

function openLightbox() {
  const item = galleryItems[currentIndex];
  const img = item.querySelector('img');
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lbCaption.textContent = item.dataset.caption || img.alt || '';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  updateLightbox();
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  updateLightbox();
}

function updateLightbox() {
  const item = galleryItems[currentIndex];
  const img = item.querySelector('img');
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lbCaption.textContent = item.dataset.caption || img.alt || '';
}

document.querySelector('.lb-close').addEventListener('click', closeLightbox);
document.querySelector('.lb-prev').addEventListener('click', showPrev);
document.querySelector('.lb-next').addEventListener('click', showNext);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
});

// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
let galleryImages = [];
let currentIndex = 0;

document.querySelectorAll('[data-gallery]').forEach(el => {
  el.style.cursor = 'pointer';
  el.addEventListener('click', () => {
    const group = el.dataset.gallery;
    galleryImages = Array.from(document.querySelectorAll(`[data-gallery="${group}"] img`));
    const clickedImg = el.querySelector('img');
    currentIndex = galleryImages.indexOf(clickedImg);
    openLightbox();
  });
});

function openLightbox() {
  lbImg.src = galleryImages[currentIndex].src;
  lbImg.alt = galleryImages[currentIndex].alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  lbImg.src = galleryImages[currentIndex].src;
  lbImg.alt = galleryImages[currentIndex].alt;
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  lbImg.src = galleryImages[currentIndex].src;
  lbImg.alt = galleryImages[currentIndex].alt;
}

document.querySelector('.lb-close').addEventListener('click', closeLightbox);
document.querySelector('.lb-prev').addEventListener('click', showPrev);
document.querySelector('.lb-next').addEventListener('click', showNext);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target.classList.contains('lb-content')) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
});

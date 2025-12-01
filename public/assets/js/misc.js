
const images = [
  {src : 'misc/blankMare.jpg', caption : 'Original resin medallion piece: \"Loving Mare\"'},
  {src : 'misc/trit left.jpg', caption : 'Original traditional resin, \"Triton\"'},
  {src : 'misc/blue1.jpg', caption : 'Painted blue copy of \"Loving Mare\"'},
  {src : 'misc/brown3.jpg', caption : 'Realistic version'}, 
  {src : 'misc/uni1.jpg', caption : 'Unicorn Modification'}
];

const gallery = document.getElementById('gallery');
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const nextButton = document.getElementById('lightboxNext');
const prevButton = document.getElementById('lightboxPrev');
let curr = 0;

function showImg(ind){
  const img = images[ind];
  lightboxImage.src = img.src;
  lightboxImage.alt = img.caption;
  lightboxCaption.textContent = img.caption;
  curr = ind;
  lightboxOverlay.classList.add('active');
  lightboxOverlay.focus();
}

images.forEach((img, ind) => {
  const figure = document.createElement('figure');
  figure.className = 'gallery-item';

  const image = document.createElement('img');
  image.src = img.src;
  image.alt = img.caption;

  const caption = document.createElement('figcaption');
  caption.textContent = img.caption;

  figure.appendChild(image);
  figure.appendChild(caption);
  gallery.appendChild(figure);

  image.addEventListener('click', () => 
  {
    showImg(ind);
  });

});

lightboxOverlay.addEventListener('click', (e) => {
  if (e.target === lightboxOverlay) {
    lightboxOverlay.classList.remove('active'); 
    lightboxCaption.classList.remove('active');
    lightboxImage.src = '';
    lightboxCaption.textContent = '';
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
    lightboxOverlay.classList.remove('active'); 
    lightboxCaption.classList.remove('active');
    lightboxImage.src = '';
    lightboxCaption.textContent = '';
  }
});

lightboxClose.addEventListener('click', () => {
  lightboxCaption.classList.remove('active');
  lightboxOverlay.classList.remove('active');
  lightboxImage.src = '';
  lightboxCaption.textContent = '';
});

nextButton.addEventListener('click', () => 
{
  const next = (curr - 1 + images.length) % images.length;
    showImg(next);
});

prevButton.addEventListener('click', () =>
{
  const prev = (curr + 1 + images.length) % images.length;
    showImg(prev);
});

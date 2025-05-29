
const images = [
  { src: 'painting/Joker.png', caption: 'Caption 1' },
  { src: 'painting/Pheonix.png', caption: 'Caption 2' },
  { src: 'painting/pinkFlower.png', caption: 'Caption 3' },
  { src: 'painting/pinkFlower2.png', caption: 'Caption 3' },
  { src: 'painting/yellowFlower.png', caption: 'Caption 3' },
  { src: 'painting/yellowFlower2.png', caption: 'Caption 3' },
  { src: 'painting/riverHouse.png', caption: 'Caption 3' },
  { src: 'painting/stag.png', caption: 'Caption 3' },
  { src: 'painting/Jaws.png', caption: 'Caption 3' }
];

const gallery = document.getElementById('gallery');
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');

images.forEach(img => {
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
    lightboxImage.src = img.src;
    lightboxImage.alt = img.caption;
    lightboxCaption.textContent = img.caption;
    lightboxOverlay.classList.add('active');
    lightboxOverlay.focus();
  });
});



lightboxOverlay.addEventListener('click', (e) => 
{
  if(e.target === lightboxOverlay)
  {
    lightboxCaption.classList.remove('active');
    lightboxImage.src = '';
    lightboxCaption.textContent = '';
  }
});

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && lightboxOverlay.classList.contains('active')){
  lightboxOverlay.classList.remove('active');
  lightboxImage.src = '';
  lightboxCaption.textContent = '';
}
});


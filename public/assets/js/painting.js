
const images = [
  {src: 'painting/fluffy.jpg', caption: '\'So now you can bink forever\''},
  { src: 'painting/Joker.png', caption: 'Large Joker Painting' },
  { src: 'painting/Pheonix.png', caption: '\'Night of the New Moon\'' },
  { src: 'painting/pinkFlower.png', caption: 'Canvas piece made with real press preserved flowers' },
  { src: 'painting/pinkFlower2.png', caption: 'Same, but indoors' },
  { src: 'painting/yellowFlower.png', caption: 'Canvas piece made with real press preserved flowers' },
  { src: 'painting/yellowFlower2.png', caption: 'Same, but indoors' },
  { src: 'painting/riverHouse.png', caption: 'My first canvas painting, Bob Ross Tutorial' },
  { src: 'painting/stag.png', caption: 'My second canvas painting, Bob Ross Tutorial, but with changes and the Harry Potter Stag Patronus' },
  { src: 'painting/Jaws.png', caption: '\'Follow me between the jaws of fate\'' }
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

lightboxOverlay.addEventListener('click', (e) => 
{
  if(e.target === lightboxOverlay)
  {
    lightboxCaption.classList.remove('active');
    lightboxOverlay.classList.remove('active'); 
    lightboxImage.src = '';
    lightboxCaption.textContent = '';
  }
});

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && lightboxOverlay.classList.contains('active')){
    lightboxCaption.classList.remove('active');
    lightboxOverlay.classList.remove('active'); 
    lightboxImage.src = '';
    lightboxCaption.textContent = '';
}
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

const images = [
    {src : 'paper/selfPortrait.png', caption :'First time drawing a face, Self portrait at 15'},
    {src : 'paper/eye.png', caption : 'Eye drawing practice from freshman year highschool'},
    {src : 'paper/copyCat.png', caption : 'Exercise of copying other people\'s work from freshman year'},
    {src : 'paper/Spencer.png', caption : 'Portrait of Spencer Charnas (Ice Nine Kills'},
    {src : 'paper/LH.png', caption : 'Side portrait of Luke Hemmings (5 Seconds of Summer)'},
    {src : 'paper/redHOod.png', caption : 'Fan art of Red Hood/ Jason Todd from DC Comics'},
    {src : 'paper/bucky.png', caption : 'Fan art of the Winter Soldier/Bucky Barnes from Marvel'},
    {src : 'paper/deadpool.png', caption : 'Fan art of Deadpool from Marvel'},
    {src : 'paper/lh2.png', caption : 'Portrait of Luke Hemmings (5 Seconds of Summer)'},
    {src : 'paper/bike.png', caption : ''},
    {src : 'paper/car.png', caption : ''},
    {src : 'paper/car2.png', caption : ''},
    {src : 'paper/gt3.png', caption : 'GT3 RS'},
    {src : 'paper/gt350.png', caption : 'GT350 : My dream car'},
    {src : 'paper/gt500.png', caption : 'GT500'},
    {src : 'paper/mm93.png', caption : 'Marc Marquez'}
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

lightboxClose.addEventListener('click', () => {
  lightboxOverlay.classList.remove('active');
  lightboxImage.src = '';
  lightboxCaption.textContent  = '';
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

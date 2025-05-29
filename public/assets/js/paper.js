const images = [
    {src : 'paper/selfPortrait.png', caption :'First time drawing a face, Self portrait at 15'},
    {src : 'paper/eye.png', caption : 'Eye drawing practice from freshman year highschool'},
    {src : 'paper/copyCat.png', caption : 'Copying other people\'s work exercise from freshman year'}
];


const gallery = document.getElementById('gallery');

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
});


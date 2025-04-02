const albums = document.querySelectorAll(".album");

albums.forEach(album =>
{
    const leftButton = album.querySelector('.album-nav.left');
    const rightButton = album.querySelector('.album-nav.right');
    const images = album.querySelectorAll('.album-images img');


    function showImage(index)
    {
        images.forEach((img, i) =>{
            img.style.display = (i === index)? 'block':'none';
        });
    }

    showImage(currentIndex);

    leftButton.addEventListener('click', ()=>
    {
        currentIndex = (currentIndex === 0)? images.length - 1 : currentIndex - 1;
    });

    rightButtonButton.addEventListener('click', ()=>
        {
            currentIndex = (currentIndex === 0)? images.length + 1 : currentIndex + 1;
    });

});
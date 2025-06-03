export function lightBox() {
  // *** Select Image ***
  const image = document.querySelector('.imgbox-cssArt');
  // *** End of Select Image ***

  // *** Create New Image ***
  const createNewImage = element => {
    const newImage = document.createElement('img');
    newImage.src = element.src;
    newImage.alt = 'My own CSS ART image ✌️';
    newImage.id = 'new-image';

    return newImage;
  };
  // *** End of Create New Image ***

  // *** Create Text ***
  const createText = () => {
    const boxText = document.createElement('div');
    boxText.id = 'box-wrapper';

    const text = document.createElement('p');
    text.id = 'box-wrapper__text';
    text.textContent = 'Click anywhere to close the lightbox.';

    boxText.appendChild(text);

    return boxText;
  };
  // *** End of Create Text ***

  // *** Create Overlay ***
  const lightboxOverlay = () => {
    const overlay = document.createElement('div');
    overlay.id = 'lightbox-overlay';
    return overlay;
  };
  // *** End of Create Overlay ***

  // *** Event Listener ***
  image.addEventListener('click', () => {
    const overlay = lightboxOverlay();
    const newImage = createNewImage(image);
    const text = createText();

    document.body.appendChild(overlay);
    overlay.appendChild(newImage);
    overlay.appendChild(text);

    if (window.innerWidth < 1100) {
      overlay.remove();
      return;
    }

    overlay.addEventListener('click', () => {
      overlay.remove();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth < 1100) {
        overlay.remove();
        return;
      }
    });
  });
  // *** End of Event Listener ***
}

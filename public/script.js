function handleBoxClick(index) {
    const square = document.getElementById('square-' + index);
    const hasBackgroundImage = square.style.backgroundImage !== 'none';

    // If it has a background image, remove it; otherwise, set a new background image
    if (hasBackgroundImage) {
        square.style.backgroundImage = 'none';
    } else {
        square.style.backgroundImage = 'url(/star.png)';
        square.style.backgroundSize = 'cover';
    }
    console.log("click");
  }
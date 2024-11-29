// Function to handle the first slider
function startSlider(sliderId, trackId) {
  const slider = document.getElementById(sliderId);
  const images = document.querySelectorAll(`#${trackId} .slider-image`);

  // Clone the first and last images for seamless loop
  const firstClone = images[0].cloneNode(true);
  const lastClone = images[images.length - 1].cloneNode(true);

  // Append clones to the slider for infinite loop
  slider.appendChild(firstClone); // Add the clone of the first image at the end
  slider.insertBefore(lastClone, images[0]); // Add the clone of the last image at the start

  let currentIndex = 1; // Start at the first real image (skip the clone)
  slider.style.transform = `translateX(-${currentIndex * 100}vw)`;

  // Function to move the slider with animation
  function moveSlide(direction) {
    currentIndex += direction; // Move to the next or previous image

    // Apply the transform for the current position
    slider.style.transition = "transform 1s ease-in-out";
    slider.style.transform = `translateX(-${currentIndex * 100}vw)`;

    // Handle transition end for seamless looping
    slider.addEventListener(
      "transitionend",
      () => {
        if (currentIndex === 0) {
          slider.style.transition = "none"; // Temporarily disable transition
          currentIndex = images.length; // Last real image index
          slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
        } else if (currentIndex === images.length + 1) {
          slider.style.transition = "none"; // Temporarily disable transition
          currentIndex = 1; // First real image index
          slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
        }
      },
      { once: true } // Ensure the event only runs once
    );
  }

  // Automatically move the slider every 5 seconds
  setInterval(() => {
    moveSlide(1); // Move to the next slide
  }, 5000);
}

// Initialize the sliders
startSlider('slider1', 'slider');
startSlider('slider2', 'slider2Track');

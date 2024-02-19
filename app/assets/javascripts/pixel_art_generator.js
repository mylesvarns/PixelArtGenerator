// app/assets/javascripts/pixel_art_generator.js
document.addEventListener("DOMContentLoaded", function () {
  const canvasContainer = document.getElementById("canvas-container");
  const clearButton = document.getElementById("clear-button");
  const uploadInput = document.getElementById("upload-input");
  const pixelSizeOptions = document.querySelectorAll(
    'input[name="pixel-size"]'
  );

  let canvasWidth;
  let canvasHeight;

  // Function to create the pixel art canvas
  function createCanvas() {
    canvasContainer.innerHTML = ""; // Clear the existing canvas

    for (let i = 0; i < canvasHeight; i++) {
      for (let j = 0; j < canvasWidth; j++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        canvasContainer.appendChild(pixel);
      }
    }
  }

  // Function to draw the image on the canvas
  function drawImageOnCanvas(img) {
    createCanvas(); // Clear the canvas before drawing the image, fun errors occurred locally without it

    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

    const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    const pixels = document.querySelectorAll(".pixel");

    // Process the pixels and update the canvas
    for (let i = 0; i < pixels.length; i++) {
      const color = getPixelColor(imageData, i);
      pixels[i].style.backgroundColor = color;
    }
  }

  // Function to get the color of a pixel from the image data
  function getPixelColor(imageData, index) {
    const pixelIndex = index * 4; // Each pixel takes 4 values (R, G, B, A)
    const red = imageData.data[pixelIndex];
    const green = imageData.data[pixelIndex + 1];
    const blue = imageData.data[pixelIndex + 2];
    // Ignore alpha (transparency) for simplicity at the moment, might add in the future?

    // Convert RGB values to a CSS color string
    return `rgb(${red}, ${green}, ${blue})`;
  }

  // Clear the canvas when the clear button is clicked
  clearButton.addEventListener("click", function () {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach((pixel) => {
      pixel.style.backgroundColor = "white";
    });
  });

  // Function to handle pixel color change on click. Placeholder to use with cursor in the event transparency options are added.
  function handlePixelClick(event) {
    const pixel = event.target;
    const currentColor = pixel.style.backgroundColor;
    const newColor = currentColor === "black" ? "white" : "black";
    pixel.style.backgroundColor = newColor;
  }

  // Attach the handlePixelClick function to each pixel
  canvasContainer.addEventListener("click", handlePixelClick);

  // Function to handle changes in pixel size options
  function handlePixelSizeChange() {
    const selectedRadioButton = document.querySelector(
      'input[name="pixel-size"]:checked'
    );

    if (selectedRadioButton) {
      const newSize = parseInt(selectedRadioButton.value);
      canvasWidth = newSize;
      canvasHeight = newSize;

      // Update the grid-template-columns property. 1fr is not recommended based on testing. It seems like it doesn't work as expected possibly due to css/html properties.
      canvasContainer.style.gridTemplateColumns = `repeat(${newSize}, 12px)`;

      createCanvas(); // Recreate the canvas with the new size
    }
  }

  // Attach the handlePixelSizeChange function to pixel size options change event
  pixelSizeOptions.forEach((option) => {
    option.addEventListener("change", handlePixelSizeChange);
  });

  // Attach the handleImageUpload function to the input change event
  uploadInput.addEventListener("change", function () {
    handleImageUpload();
  });

  // Function to handle image upload
  function handleImageUpload() {
    const file = uploadInput.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;

        img.onload = function () {
          drawImageOnCanvas(img);
        };
      };

      reader.readAsDataURL(file);
    }
  }

  // Update the invertColors function to accurately invert each pixel based on its color
  function invertColors() {
    const pixels = document.querySelectorAll(".pixel");

    pixels.forEach((pixel) => {
      const currentColor = pixel.style.backgroundColor;

      if (currentColor && currentColor !== "transparent") {
        const invertedColor = invertColor(currentColor);
        pixel.style.backgroundColor = invertedColor;
      }
    });
  }

  // Helper function to invert a single color
  function invertColor(color) {
    // Parse the RGB values from the color string
    const rgb = color.match(/\d+/g);

    if (rgb) {
      // Calculate the inverted RGB values
      const invertedRGB = rgb.map((value) => 255 - parseInt(value));

      // Create the inverted color string
      return `rgb(${invertedRGB[0]}, ${invertedRGB[1]}, ${invertedRGB[2]})`;
    }

    // If the color format is not recognized, return the original color that was calculated after file upload
    return color;
  }

  // Add this event listener to handle the click on the "Invert Colors" button
  const invertButton = document.getElementById("invert-button");

  if (invertButton) {
    invertButton.addEventListener("click", invertColors);
  }

  // Initialize the canvas
  handlePixelSizeChange();
});

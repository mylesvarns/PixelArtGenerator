// app/assets/javascripts/pixel_art_generator.js
document.addEventListener("DOMContentLoaded", function () {
    const canvasContainer = document.getElementById("canvas-container");
    const clearButton = document.getElementById("clear-button");
    const uploadInput = document.getElementById("upload-input");
    const pixelSizeOptions = document.querySelectorAll('input[name="pixel-size"]');
  
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
      createCanvas(); // Clear the canvas before drawing the image
  
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
      // Ignore alpha (transparency) for simplicity
  
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
  
    // Function to handle pixel color change on click
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
      const selectedRadioButton = document.querySelector('input[name="pixel-size"]:checked');
  
      if (selectedRadioButton) {
        const newSize = parseInt(selectedRadioButton.value);
        canvasWidth = newSize;
        canvasHeight = newSize;
  
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
  
    // Initialize the canvas
    handlePixelSizeChange();
  });
  
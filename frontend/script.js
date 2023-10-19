const imageUpload = document.getElementById('imageUpload');
const originalCanvas = document.getElementById('originalCanvas');
const editCanvas = document.getElementById('editCanvas');
const ctxOriginal = originalCanvas.getContext('2d');
const ctxEdit = editCanvas.getContext('2d');
const zoomLevelInput = document.getElementById('zoomLevel');
const sendImageButton = document.getElementById('sendImage');



let isErasing = false;
let eraserSize = 10;
let eraserShape = 'round';
let zoomLevel = 1;

// Handle image upload
imageUpload.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                const canvasWidth = originalCanvas.width;
                const canvasHeight = originalCanvas.height;

                // Resize the image to fit the canvas
                const scale = Math.min(canvasWidth / img.width, canvasHeight / img.height);
                const newWidth = img.width * scale;
                const newHeight = img.height * scale;

                const xOffset = (canvasWidth - newWidth) / 2;
                const yOffset = (canvasHeight - newHeight) / 2;

                ctxOriginal.clearRect(0, 0, originalCanvas.width, originalCanvas.height);
                ctxEdit.clearRect(0, 0, editCanvas.width, editCanvas.height);

                // Display the original image on both canvases
                ctxOriginal.drawImage(img, xOffset, yOffset, newWidth, newHeight);
                ctxEdit.drawImage(img, xOffset, yOffset, newWidth, newHeight);
            };
        };
        reader.readAsDataURL(file);
    }
});

// Enable erasing
editCanvas.addEventListener('mousedown', () => {
    isErasing = true;
});

editCanvas.addEventListener('mouseup', () => {
    isErasing = false;
    ctxEdit.beginPath(); // Reset the path to prevent continuous erasing
});

editCanvas.addEventListener('mousemove', (e) => {
    if (isErasing) {
        const rect = editCanvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / zoomLevel;
        const y = (e.clientY - rect.top) / zoomLevel;
        erase(x, y);
    }
});

// Handle eraser size change
const eraserSizeInput = document.getElementById('eraserSize');
eraserSizeInput.addEventListener('input', () => {
    eraserSize = eraserSizeInput.value;
});

// Handle eraser shape change
const eraserShapeSelect = document.getElementById('eraserShape');
eraserShapeSelect.addEventListener('change', () => {
    eraserShape = eraserShapeSelect.value;
});

// Handle zoom level change
zoomLevelInput.addEventListener('input', () => {
    zoomLevel = parseFloat(zoomLevelInput.value);
    updateCanvasZoom();
});

// Function to erase with different shapes
function erase(x, y) {
    ctxEdit.globalCompositeOperation = 'destination-out';

    if (eraserShape === 'round') {
        ctxEdit.beginPath();
        ctxEdit.arc(x, y, eraserSize / 2, 0, Math.PI * 2);
        ctxEdit.fill();
    } else if (eraserShape === 'square') {
        ctxEdit.clearRect(x - eraserSize / 2, y - eraserSize / 2, eraserSize, eraserSize);
    }

    ctxEdit.globalCompositeOperation = 'source-over'; // Restore the default drawing mode
}

// Function to update canvas zoom
function updateCanvasZoom() {

    editCanvas.style.transform = `scale(${zoomLevel})`;
    // Redraw the edited image with the updated zoom level
    const img = new Image();
    img.src = originalCanvas.toDataURL('image/png');
    img.onload = function () {
        ctxEdit.clearRect(0, 0, editCanvas.width, editCanvas.height);
        ctxEdit.drawImage(img, 0, 0, editCanvas.width, editCanvas.height);
    };
}

// Add an event listener to send the image in the editCanvas as an HTTP request
sendImageButton.addEventListener('click', () => {
    // Get the edited image from the editCanvas
    const editedImageData = editCanvas.toDataURL('image/png');

    // Create a new Image object to hold the edited image
    const editedImage = new Image();
    editedImage.src = editedImageData;

    // Send an HTTP request with the edited image in the request body
    sendHttpRequestWithImage(editedImage);
});

// ...

// ...

// ...

// Function to send an HTTP request with the image in the request body
function sendHttpRequestWithImage(image) {
    fetch('your_endpoint_url', {
        method: 'POST',
        body: image,
        headers: {
            'Content-Type': 'image/png',
        },
    })
    .then(response => {
        if (response.ok) {
            // Request was successful
            console.log('Image sent successfully');
            return response.blob();
        } else {
            // Request failed
            console.error('Failed to send image');
        }
    })
    .then(blob => {
        // Display the received image in the same HTML page
        const imageUrl = URL.createObjectURL(blob);
        const receivedImage = document.getElementById('receivedImage');
        receivedImage.src = imageUrl;

        // Make the imageDisplay section visible
        const imageDisplay = document.getElementById('imageDisplay');
        imageDisplay.style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// ...

// ...

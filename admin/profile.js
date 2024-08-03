// Get references to HTML elements
const imageInput = document.getElementById('imageInput');
const uploadedImage = document.getElementById('uploadedImage');

// Add an event listener to the input field
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];

    if (file) {
        // Create a FileReader to read the selected image
        const reader = new FileReader();

        reader.onload = (e) => {
            // Set the source of the image element to the uploaded image
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block'; // Show the image
        };

        // Read the uploaded image as a data URL
        reader.readAsDataURL(file);
    }
});

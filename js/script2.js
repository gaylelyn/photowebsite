document.addEventListener("DOMContentLoaded", function() {
    fetch('images.json')
        .then(response => response.json())
        .then(data => {
            // Debug: Check fetched data
            console.log('Fetched data:', data);

            // Display a random photo
            displayRandomPhoto(data);

            // Calculate and display tag counts
            calculateTagCounts(data);
        })
        .catch(error => console.error('Error fetching images:', error));
});

// Function to display a random photo
function displayRandomPhoto(data) {
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomPhoto = data[randomIndex];
    const randomPhotoElement = document.getElementById('random-photo');
    const captionElement = document.getElementById('photo-caption');
    
    if (randomPhotoElement && captionElement) {
        randomPhotoElement.src = randomPhoto.url;
        randomPhotoElement.alt = randomPhoto.caption;
        captionElement.textContent = randomPhoto.caption;
    } else {
        console.error('Elements not found');
    }
}

// Function to calculate and display tag counts
function calculateTagCounts(data) {
    const tagCounts = {
        singapore: 0,
        japan: 0,
        ustates: 0,
        bw: 0,
        viet: 0
    };

    data.forEach(imageData => {
        imageData.tags.forEach(tag => {
            if (tagCounts[tag] !== undefined) {
                tagCounts[tag]++;
            }
        });
    });

    // Debug: Check calculated tag counts
    console.log('Calculated tag counts:', tagCounts);

    // Update the table with the tag counts
    document.getElementById('singapore-count').textContent = tagCounts.singapore;
    document.getElementById('japan-count').textContent = tagCounts.japan;
    document.getElementById('ustates-count').textContent = tagCounts.ustates;
    document.getElementById('bw-count').textContent = tagCounts.bw;
    document.getElementById('viet-count').textContent = tagCounts.viet;
    document.getElementById('china-count').textContent = tagCounts.china;
}



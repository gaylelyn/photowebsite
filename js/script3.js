document.addEventListener("DOMContentLoaded", function() {
    fetch('images.json')
        .then(response => response.json())
        .then(data => {
            // Initialize variables
            const columns = document.querySelectorAll('.column');
            let columnIndex = 0;
            const tagCounts = {
                singapore: 0,
                japan: 0,
                ustates: 0,
                bw: 0,
                viet: 0,
                china: 0
            };

            // Display a random photo
            displayRandomPhoto(data);

            // Calculate tag counts and display images
            data.forEach(imageData => {
                // Calculate tag counts
                imageData.tags.forEach(tag => {
                    if (tagCounts[tag] !== undefined) {
                        tagCounts[tag]++;
                    }
                });

                // Create a container for the image and caption
                const imgContainer = document.createElement('div');

                // Create and configure the image element
                const img = new Image();
                img.src = imageData.url;
                img.classList.add('grid-image');
                img.loading = 'lazy';

                // Append the image to the container
                imgContainer.appendChild(img);

                // Create and configure the caption element
                const caption = document.createElement('div');
                caption.classList.add('caption');
                caption.textContent = imageData.caption;

                // Append the caption to the container
                imgContainer.appendChild(caption);

                // Append the container to the appropriate column
                columns[columnIndex % columns.length].appendChild(imgContainer);
                columnIndex++;
            });

            // Update the table with the tag counts
            document.getElementById('singapore-count').textContent = tagCounts.singapore;
            document.getElementById('japan-count').textContent = tagCounts.japan;
            document.getElementById('ustates-count').textContent = tagCounts.ustates;
            document.getElementById('bw-count').textContent = tagCounts.bw;
            document.getElementById('viet-count').textContent = tagCounts.viet;
            document.getElementById('china-count').textContent = tagCounts.china;

            console.log('Tag counts:', tagCounts);
        })
        .catch(error => console.error('Error fetching images:', error));

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
            console.error('Elements for random photo not found');
        }
    }
});

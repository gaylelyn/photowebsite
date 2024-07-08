document.addEventListener("DOMContentLoaded", function() {
    // Fetch images data from JSON
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
                bw: 0
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
                img.src = imageData.url; // Corrected assignment
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

            // Update tag counts in the DOM
            updateTagCounts(tagCounts);
        })
        .catch(error => console.error('Error fetching images:', error));

    // Function to update tag counts in the DOM
    function updateTagCounts(tagCounts) {
        const singaporeCountElement = document.getElementById('singapore-count');
        const japanCountElement = document.getElementById('japan-count');
        const ustatesCountElement = document.getElementById('ustates-count');
        const bwCountElement = document.getElementById('bw-count');

        if (singaporeCountElement && japanCountElement && ustatesCountElement && bwCountElement) {
            singaporeCountElement.textContent = tagCounts.singapore;
            japanCountElement.textContent = tagCounts.japan;
            ustatesCountElement.textContent = tagCounts.ustates;
            bwCountElement.textContent = tagCounts.bw;
        } else {
            console.error('One or more tag count elements not found');
        }
    }

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

    // Audio play/pause functionality
    const playButton = document.querySelector('.play-button');
    const audio = document.getElementById('myAudio');

    if (playButton && audio) {
        playButton.addEventListener('click', toggleAudio);
        audio.onended = () => {
            playButton.innerHTML = '<b>play</b>';
        };
    } else {
        console.error("Audio or play button not found");
    }

    function toggleAudio() {
        if (audio.paused) {
            audio.play();
            playButton.innerHTML = "<b>stop</b>";
        } else {
            audio.pause();
            audio.currentTime = 0;
            playButton.innerHTML = "<b>play</b>";
        }
    }

    // Time display functionality
    const timeElement = document.getElementById('time');
    setInterval(updateTime, 1000);

    function updateTime() {
        if (timeElement) {
            const now = new Date();
            const options = {
                timeZone: 'Asia/Singapore',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                weekday: 'long'
            };
            const formatter = new Intl.DateTimeFormat('en-SG', options);
            const formattedDate = formatter.format(now).toUpperCase();
            timeElement.innerText = formattedDate;
        } else {
            console.error('Time element not found');
        }
    }
});

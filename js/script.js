document.addEventListener("DOMContentLoaded", function() {
    fetch('images.json')
        .then(response => response.json())
        .then(data => {
            const columns = document.querySelectorAll('.column');
            let columnIndex = 0;

            data.forEach((imageData, index) => {
                // Create a container for the image and caption
                const imgContainer = document.createElement('div');
                imgContainer.classList.add('img-container');

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
                console.log(`Image ${index + 1} added to column ${columnIndex % columns.length}`);
                columnIndex++;
            });
        })
        .catch(error => console.error('Error fetching images:', error));

    // Function to update tag counts in the DOM
    function updateTagCounts(tagCounts) {
        const singaporeCountElement = document.getElementById('singapore-count');
        const japanCountElement = document.getElementById('japan-count');
        const ustatesCountElement = document.getElementById('ustates-count');
        const bwCountElement = document.getElementById('bw-count');
        const vietCountElement = document.getElementById('viet-count');

        if (singaporeCountElement && japanCountElement && ustatesCountElement && bwCountElement && vietCountElement) {
            singaporeCountElement.textContent = tagCounts.singapore;
            japanCountElement.textContent = tagCounts.japan;
            ustatesCountElement.textContent = tagCounts.ustates;
            bwCountElement.textContent = tagCounts.bw;
            vietCountElement.textContent = tagCounts.viet;
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

        if (randomPhoto && randomPhotoElement && captionElement) {
            randomPhotoElement.src = randomPhoto.url;
            randomPhotoElement.alt = randomPhoto.caption;
            captionElement.textContent = randomPhoto.caption;
            console.log(`Random photo displayed: ${randomPhoto.caption}`);
        } else {
            console.error('Random photo elements not found or random photo data is missing');
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

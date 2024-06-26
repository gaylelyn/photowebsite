document.addEventListener("DOMContentLoaded", function() {
  fetch('images.json')
    .then(response => response.json())
    .then(data => {
      const columns = document.querySelectorAll('.column');
      let columnIndex = 0;

      data.forEach(imageData => {
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
    })
    .catch(error => console.error('Error fetching images:', error));

  // Declare date and time formatting options
  let options = {
      timeZone: 'Asia/Singapore',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      weekday: 'long', // include full day of the week
  };

  let formatter = new Intl.DateTimeFormat('en-SG', options); // 'en-SG' is English in Singapore format

  // Function to format date manually
  function formatDateTime(date) {
      const formattedDate = formatter.format(date).toUpperCase(); // format the date with full weekday

      return `${formattedDate}`;
  }

  // Set time and date
  setInterval(() => {
      // Format current date and time
      document.querySelector("#time").innerText = formatDateTime(new Date());
  }, 1000);


  async function fetchQuote() {
      try {
          let response = await fetch('https://api.quotable.io/random');
          let data = await response.json();
          document.getElementById('quote').innerText = `"${data.content}"`;
          document.getElementById('author').innerText = `- ${data.author}`;
      } catch (error) {
          document.getElementById('quote').innerText = 'Could not fetch the quote.';
          document.getElementById('author').innerText = '';
      }
  }

  fetchQuote();

  // Function to toggle play/pause of audio and update button text
  function toggleAudio() {
    var audio = document.getElementById("myAudio");
    var playButton = document.querySelector(".play-button");

    if (audio.paused) {
      // If audio is paused, play it and change button text to 'stop'
      audio.play();
      playButton.innerHTML = "<b>stop</b>";
    } else {
      // If audio is playing, pause it and change button text to 'play'
      audio.pause();
      audio.currentTime = 0; // Reset audio to beginning
      playButton.innerHTML = "<b>play</b>";
    }

    // Event listener to change button text back to 'play' when audio ends naturally
    audio.onended = function() {
      playButton.innerHTML = "<b>play</b>";
    };
  }    

  // Audio play/pause functionality
  document.querySelector('.play-button').addEventListener('click', toggleAudio);
});

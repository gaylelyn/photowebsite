// declare time zone formatting
let options = {
    timeZone: 'Asia/Singapore',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
},
formatter = new Intl.DateTimeFormat([], options);

// set time
setInterval(
    () => {
        document.querySelector("#time").innerText = formatter.format(new Date());
    }
, 1000);

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

function playAudio() {
    var audio = document.getElementById("myAudio");
    audio.play();
}

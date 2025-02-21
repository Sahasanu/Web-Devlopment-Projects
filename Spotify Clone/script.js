console.log('JavaScript initializing');

let currentsong = new Audio();

function convertTime(seconds) {
    seconds = Math.floor(seconds); // Remove milliseconds
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    let formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function Getsongs() {
    let Getsongs = await fetch("http://127.0.0.1:5500/Music/");
    if (!Getsongs.ok) {
        console.error("Failed to fetch songs");
        return { songs: [], Songsurl: [] };
    }
    let response = await Getsongs.text();

    let div = document.createElement("div");
    div.innerHTML = response;

    let as = div.getElementsByTagName("a");
    let songs = [];
    let Songsurl = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            let originalName = element.href.split("/Music/")[1]; // Extract song name only
            songs.push(originalName);
            Songsurl.push(element.href); // Store full song URL
        }
    }

    if (songs.length === 0) {
        console.error("No songs found");
        return { songs: [], Songsurl: [] };
    }

    return { songs, Songsurl };
}

const playMusic = (track) => {
    currentsong.src = track
    currentsong.play();
    play.src = "Images/pause.svg";
}




async function main() {
    let { songs, Songsurl } = await Getsongs(); // Destructure both values


    if (Songsurl.length > 0) {
        currentsong.src = Songsurl[0]; // Load the first song but don't play it
        songinfo(Songsurl[0]);
        currenttime()
    }


    let songli = document.querySelector(".songlist");
    let songListHTML = "";

    function formatSongName(song) {
        return song
            .replace(/-/g, " ")
            .replace(".mp3", "")
            .replace(/\d+/g, "")
            .replace(/\b(hindi|song)\b/gi, "")
            .replace(/\s+/g, " ")
            .trim();
    }

    for (const song of songs) {

        let songname = formatSongName(song);
        songListHTML += `
            <li>
                <div class="songinfo">
                    <img class="invert" src="Images/music.svg" width="10px" alt="">
                    <div class="info">
                        <p>${songname}</p>
                        <p></p>
                    </div>
                </div>
                <div class="playnow">
                    <img id="playnow" class="invert" src="Images/play.png" width="15px" alt="">
                </div>
            </li>`;
    }

    songli.innerHTML = songListHTML;

    // Attach Eventlistner to The song

    let getli = Array.from(document.querySelector(".songlist").getElementsByTagName("li"));

    getli.forEach((e, index) => {
        e.addEventListener("click", () => {
            playMusic(Songsurl[index]); // Play the correct song based on its position in the array
            songinfo(Songsurl[index]);
            currenttime()
        });
    });


    // Attach Eventlisner to the play 
    function playpause() {
        play.addEventListener("click", () => {
            if (currentsong.paused) {
                currentsong.play()
                play.src = "Images/pause.svg"
            }
            else {
                currentsong.pause()
                play.src = "Images/play.svg"
            }
        })
    }

    playpause()


    previous.addEventListener("click", e => {
        let index = Songsurl.findIndex(url => currentsong.src.includes(url));

        if ([index - 1] >= 0) {
            playMusic(Songsurl[index - 1])
            songinfo(Songsurl[index - 1])
            currenttime()
        }
    })

    next.addEventListener("click", e => {

        let index = Songsurl.findIndex(url => currentsong.src.includes(url));

        if ([index + 1] < Songsurl.length) {
            playMusic(Songsurl[index + 1])
            songinfo(Songsurl[index + 1])
            currenttime()
        }

    })

    function songinfo(Songsurl) {
        let songinfo = document.querySelector(".trackinfo");
        let formatname = Songsurl.split("/Music/")[1];
        trackname = formatSongName(formatname)
        songinfo.innerHTML =
            `<img class="" src="Images/music.svg" width="20px" alt="">
                <div class="info">
                    <p>${trackname}</p>
                </div>`;
    }

    let circle = document.querySelector(".circle");
    let seekwidth = document.querySelector(".width");

    function currenttime() {
        currentsong.addEventListener("timeupdate", () => {
            let getduration = document.querySelector(".songtime");
            let percenttime = ((currentsong.currentTime / currentsong.duration) * 100 + "%");
    
            getduration.innerHTML = ` ${convertTime(currentsong.currentTime)}/${convertTime(currentsong.duration)}`;
    
            circle.style.left = percenttime;
            seekwidth.style.width = percenttime;
    
        })
    }
    
    document.querySelector(".progress").addEventListener("click", e => {

        let percent = (e.offsetX / e.target.getBoundingClientRect().width)

        circle.style.left = percent * 100 + "%";
        seekwidth.style.width = percent * 100 + "%";

        currentsong.currentTime = percent * currentsong.duration

    })

    let vol = document.querySelector(".volm").getElementsByTagName("input")[0]
    vol.addEventListener("change", (e) => {
        currentsong.volume =parseInt(e.target.value)/100
    })




}

main();

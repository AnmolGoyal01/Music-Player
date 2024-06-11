// Data
let songs = [
    {Name : "Aaoge Tum Kabhi", image : "assets/Posters/Aaoge tum kabhi.jpeg", song : "assets/Songs/Aaoge Tum Kabhi .mp3"},
    {Name : "Choo Lo", image : "assets/Posters/Choo lo.webp", song : "assets/Songs/Choo Lo.mp3"},
    {Name : "Downers At Dusk", image : "assets/Posters/Downers At Dusk.png", song : "assets/Songs/Downers At Dusk .mp3"},
    {Name : "Hola Amigo", image : "assets/Posters/Hola Amigo.jpeg", song : "assets/Songs/Hola Amigo.mp3"},
    {Name : "Luka Chippi", image : "assets/Posters/Lunch-Break.webp", song : "assets/Songs/Luka Chippi.mp3"},
    {Name : "Shikayat", image : "assets/Posters/Shikayat.jpeg", song : "assets/Songs/SHIKAYAT.mp3"},
    {Name : "Tu hai kahan", image : "assets/Posters/tu hai kahan.jpeg", song : "assets/Songs/Tu Hai Kahan.mp3"}
]

// variables
let currentSong = 0;
let play = new Audio();
let playing = false;
let poster = document.querySelector(".currentSong");
let background = document.querySelector("#bgc_image");
let bkwd = document.querySelector("#bkwd");
let playIcon = document.querySelector("#play");
let fwd = document.querySelector("#fwd");
let progressBar = document.querySelector("#progressBar")


// master controls
function playNow() {
    playIcon.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    play.play();
    playing = true;
}
function pauseNow() {
    playIcon.innerHTML = `<i class="fa-solid fa-play"></i>`;
    play.pause();
    playing = false;
}
function changeSong() {
    if (currentSong>=songs.length-1) {
        currentSong = songs.length -1;
        fwd.style.opacity = 0.3;
    }
    else fwd.style.opacity = 1;
    if (currentSong<=0) {
        currentSong = 0;
        bkwd.style.opacity = 0.3;
    }
    else bkwd.style.opacity = 1;

    play.src = songs[currentSong].song;
    poster.innerHTML = `<div class="currentSong"><img src="${songs[currentSong].image}" alt="${songs[currentSong].Name}"></div>`
    background.src = songs[currentSong].image;
    playNow();
}
play.addEventListener("timeupdate",(e)=> {
    let progress = (play.currentTime/play.duration) * 100;
    progressBar.value = progress
})
progressBar.addEventListener("change", ()=> {
    play.currentTime = (progressBar.value/100)*play.duration;
})

// user-controls
playIcon.addEventListener("click", ()=> {
    if (playing) pauseNow();
    else playNow();
})
fwd.addEventListener("click", ()=> {
    if (currentSong >= songs.length-1) {
        return;
    }
    currentSong++;
    changeSong();
})
bkwd.addEventListener("click", ()=>{
    if (currentSong<=0) {
        return;
    }
    currentSong--;
    changeSong();
})
window.addEventListener('keyup', (e)=>{
    if (e.key === ' ') {
        if (playing) pauseNow();
        else playNow();
    }
})


// Select and play Song
function selectAndPlay() {
    document.querySelector(".songCards")
    .addEventListener("click",(e)=> {
        currentSong = e.target.id;
        changeSong();
    });
}
selectAndPlay();


// Display All Songs on Player
function displaySongCards()
{
    let clutter = ""
    songs.forEach((song,idx) => {
        clutter+= `<div class="songCard" id="${idx}">
        <div class="image_name">
            <img src="${song.image}" alt="${song.Name}">
            <h3>${song.Name}</h3>
        </div>
        <h6>3:30</h6>
    </div>`
    });
    document.querySelector(".songCards").innerHTML = clutter;
}
displaySongCards();

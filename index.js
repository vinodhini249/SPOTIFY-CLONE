const hamberger = document.querySelector(".hamberger");
const sideBar = document.querySelector(".sidebar");
const closeBtn = document.querySelector(".hide-sidebar");

let songs = [];
let songIndex = -1;
let currentlyPlayingIndex = null;
let isSuffleEnable = false;
let isRepeatEnable = false;
let homeSong = new Audio("https://res.cloudinary.com/drvp9ynaw/video/upload/v1735374039/Hey-Minnale-Karthik-Netha-G-V-Prakash-Kumar-Haricharan-Shweta-Mohan_eibwvv.mp3 ");
let audioElement = new Audio();
let playBtnHome = document.getElementById("play-btn-home");
let masterPlayBtn = document.getElementById("masterPlayBtn");
let progressBarContainer = document.querySelector(".progressbar-container");
let customProgress = document.getElementById('customProgress');
let customProgressThumb = document.getElementById('customProgressThumb');
let customProgressBar = document.getElementById('customProgressBar');
let musicStart = document.getElementById("musicStart");
let musicEnd = document.getElementById("musicEnd");
let sideBarSearchIcon = document.querySelector("#sidebar-search");
let headerSearchDiv = document.querySelector(".header-search-div");
let masterSongTitle = document.getElementById("masterSongTitle");
let masterSongInfo = document.getElementById("masterSongInfo");
let masterCover = document.getElementById("masterCover");
let songCards = Array.from(document.getElementsByClassName("song-cards"));
let songCardsBtn = Array.from(document.getElementsByClassName("cover-play-btn"));
let playTitle = document.querySelector(".play");
let musicRepeat = document.getElementById("repeatMode");
let repeatIndicator = document.getElementById("repeat-enable-indicator");
let shuffleMusic = document.getElementById("shuffleMusic");
let shuffleIndicator = document.getElementById("shuffle-enable-indicator");
let footerHeartIcon = document.querySelector(".fa-heart");
let volumeSeekbar = document.querySelector(".volume-seekbar");
let volumeRange = document.querySelector('.volume-seekbar');
let volumeIcon = document.querySelector(".fa-volume-high");
let mute = document.querySelector(".mute");
let searchIcon = document.querySelector(".header-search-icon");
let searchBar = document.getElementById("searchBar");
let pageNavigateBtn = document.querySelector(".back-forward-btn-container");
let dropdownContainer = document.querySelector(".upgrade-dropdown-container");
let dropdown = document.querySelector(".dropdown");
let dropdownInner = document.querySelector(".dropdown-inner");
let dropdownIcon = document.querySelector(".fa-caret-down");
let profileName = document.querySelector(".profile-name");
let profileImage = document.querySelector(".profile-image")
let logOut = document.querySelector("#log-out");
let followBtn = document.getElementById("follow-btn");
const apiUrl = 'https://api.allorigins.win/raw?url=https://api.deezer.com/search?q=arijitsingh';

// Play home song
function homeSongPlay() {

    if (homeSong.paused) {
        homeSong.play();
        playBtnHome.textContent = "Pause";
        masterPlayBtn.classList.remove("fa-circle-play");
        masterPlayBtn.classList.add("fa-circle-pause");
        masterSongTitle.textContent = "Hey Minnale";
        masterSongInfo.textContent = "by G.V. Prakash Kumar, Haricharan, Shweta Mohan ";
        masterCover.src = "https://res.cloudinary.com/drvp9ynaw/image/upload/v1735374558/le_qjxarb.jpg";
        playTitle.textContent = "Pause";
    } else {
        homeSong.pause();
        playBtnHome.textContent = "Play";
        masterPlayBtn.classList.remove("fa-circle-pause");
        masterPlayBtn.classList.add("fa-circle-play");
        masterSongTitle.textContent = "Hey Minnale";
        masterSongInfo.textContent = "by G.V. Prakash Kumar, Haricharan, Shweta Mohan ";
        masterCover.src = "https://res.cloudinary.com/drvp9ynaw/image/upload/v1735374558/le_qjxarb.jpg";
        playTitle.textContent = "Play";
    }

    audioElement.pause();
    resetPlayIcons();
    audioElement.currentTime = 0;
    songIndex = -1;
}

playBtnHome.addEventListener("click", () => {
    homeSongPlay();
})

// Getting songs data from API
async function fetchMusicData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        songs = data.data || [];
        // console.log(songs);
        renderSongs();
    } catch (error) {
        console.log('Error fetching music data:', error);
    }
}

// Call the function to fetch the music data from Deezer API
fetchMusicData();

// Update the custom progress bar with the current song's progress
function updateCustomProgressBar() {

    let currentTime = null;
    let duration = null;

    if (homeSong.paused && audioElement.paused && audioElement.currentTime === 0) {
        currentTime = homeSong.currentTime;
        duration = homeSong.duration;
    } else if (!homeSong.paused) {
        currentTime = homeSong.currentTime;
        duration = homeSong.duration;
    } else if (audioElement.paused) {
        currentTime = audioElement.currentTime;
        duration = audioElement.duration;
    } else if (!audioElement.paused) {
        currentTime = audioElement.currentTime;
        duration = audioElement.duration;
    }
    const progress = (currentTime / duration) * 100;

    customProgress.style.width = `${progress}%`;
    customProgressThumb.style.left = `calc(${progress}% - 5px)`;
}

// Seek functionality on custom progress bar click
document.getElementById('customProgressBar').addEventListener('click', (event) => {
    const progressBarWidth = customProgressBar.clientWidth;
    const clickX = event.clientX - customProgressBar.getBoundingClientRect().left;
    let duration = null;
    if (homeSong.paused && audioElement.paused && audioElement.currentTime === 0) {
        duration = homeSong.duration;
    } else if (!homeSong.paused) {
        duration = homeSong.duration;
    } else if (audioElement.paused) {
        duration = audioElement.duration;
    } else if (!audioElement.paused) {
        duration = audioElement.duration;
    }

    if (duration) {
        const seekTime = (clickX / progressBarWidth) * duration;

        if (homeSong.paused && audioElement.paused && audioElement.currentTime === 0) {
            homeSong.currentTime = seekTime;
        } else if (!homeSong.paused) {
            homeSong.currentTime = seekTime;
        } else if (audioElement.paused) {
            audioElement.currentTime = seekTime;
        } else if (!audioElement.paused) {
            audioElement.currentTime = seekTime;
        }
    }
});

// Update the custom progress bar while the song is playing
audioElement.addEventListener('timeupdate', () => {
    updateCustomProgressBar();
});

// Update the custom progress bar while the song is playing
homeSong.addEventListener('timeupdate', () => {
    updateCustomProgressBar();
});

// Reset progressbar when audioElement song end
audioElement.addEventListener("ended", () => {
    customProgress.value = 0;
});

// Reset progressbar when homeSong end
homeSong.addEventListener("ended", () => {
    customProgress.value = 0;
});


// Time update function
function timeUpdate() {
    let currentTime = null;
    let duration = null;

    if (homeSong.paused && audioElement.paused && audioElement.currentTime === 0) {
        currentTime = homeSong.currentTime;
        duration = homeSong.duration;
    } else if (!homeSong.paused) {
        currentTime = homeSong.currentTime;
        duration = homeSong.duration;
    } else if (audioElement.paused) {
        currentTime = audioElement.currentTime;
        duration = audioElement.duration;
    } else if (!audioElement.paused) {
        currentTime = audioElement.currentTime;
        duration = audioElement.duration;
    }

    if (duration) {
        let progressValue = (currentTime / duration) * 100;
        customProgress.value = progressValue;

        let progressMinutes = Math.floor(currentTime / 60);
        let progressSeconds = Math.floor(currentTime % 60);
        if (progressSeconds < 10) {
            progressSeconds = "0" + progressSeconds;
        }
        musicStart.textContent = `${progressMinutes}:${progressSeconds}`;

        let durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }
        musicEnd.textContent = `${durationMinutes}:${durationSeconds}`;
    }
}

// Call timeUpdate() function by audioElement
audioElement.addEventListener("timeupdate", () => {
    timeUpdate();
});

// Call timeUpdate() function by homeSong
homeSong.addEventListener("timeupdate", () => {
    timeUpdate();
});


// Rendering songs on webpage
function renderSongs() {
    songs.forEach((song, index) => {
        const cover = document.querySelectorAll('.song-cover img')[index];
        const title = document.querySelectorAll('.song-title')[index];
        const artist = document.querySelectorAll('.song-artist')[index];
        const playBtn = document.querySelectorAll('.cover-play-btn')[index];

        cover.src = song.album.cover;
        title.textContent = song.title;
        artist.textContent = song.artist.name;

        // Add event listener for play button to play the respective song
        playBtn.addEventListener('click', () => {
            songIndex = index;
            displaySongDetails(songIndex);
        });
    });
}

// Change the song info on master play
function displaySongDetails(index) {
    let song = songs[index];
    masterSongTitle.textContent = song.title;
    masterSongInfo.textContent = song.artist.name;
    masterCover.src = song.album.cover;
    customProgress.value = 0;
}


// play/pause song by card's button function
function playPauseSong(index) {

    if (index === currentlyPlayingIndex && audioElement.paused) {
        audioElement.play();
        document.querySelectorAll('.cover-play-btn')[index].classList.remove('fa-circle-play');
        document.querySelectorAll('.cover-play-btn')[index].classList.add('fa-circle-pause');
        masterPlayBtn.classList.remove("fa-circle-play");
        masterPlayBtn.classList.add("fa-circle-pause");
        playTitle.textContent = "Pause";
    } else if (index === currentlyPlayingIndex && !audioElement.paused) {
        audioElement.pause();
        document.querySelectorAll('.cover-play-btn')[index].classList.remove('fa-circle-pause');
        document.querySelectorAll('.cover-play-btn')[index].classList.add('fa-circle-play');
        masterPlayBtn.classList.remove("fa-circle-pause");
        masterPlayBtn.classList.add("fa-circle-play");
        playTitle.textContent = "Play";
    } else {
        resetPlayIcons();
        audioElement.src = songs[index].preview;
        audioElement.load();
        audioElement.play();
        currentlyPlayingIndex = index;
        document.querySelectorAll('.cover-play-btn')[index].classList.remove('fa-circle-play');
        document.querySelectorAll('.cover-play-btn')[index].classList.add('fa-circle-pause');
        masterPlayBtn.classList.remove("fa-circle-play");
        masterPlayBtn.classList.add("fa-circle-pause");
        playTitle.textContent = "Pause";
    }

    homeSong.pause();
    homeSong.currentTime = 0;
    playBtnHome.textContent = "Play";
}


// reset cards buttons
function resetPlayIcons() {
    document.querySelectorAll('.cover-play-btn').forEach((btn, index) => {
        btn.classList.remove('fa-circle-pause');
        btn.classList.add('fa-circle-play');
    });
}


// play/pause song by songs card buttton
songCardsBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        playPauseSong(index);
    });
});


// Handle cards play/pause by master play/pause button
masterPlayBtn.addEventListener("click", () => {
    if (homeSong.paused && audioElement.paused && audioElement.currentTime === 0) {
        homeSong.play();
        playBtnHome.textContent = "Pause";
        masterPlayBtn.classList.remove("fa-circle-play");
        masterPlayBtn.classList.add("fa-circle-pause");
        masterSongTitle.textContent = "Hey Minnale";
        masterSongInfo.textContent = "by G.V. Prakash Kumar, Haricharan, Shweta Mohan ";
        masterCover.src = "https://res.cloudinary.com/drvp9ynaw/image/upload/v1735374558/le_qjxarb.jpg";
        playTitle.textContent = "Pause";
        // audioElement.currentTime = 0;
    } else if (!homeSong.paused) {
        homeSong.pause();
        playBtnHome.textContent = "Play";
        masterPlayBtn.classList.remove("fa-circle-pause");
        masterPlayBtn.classList.add("fa-circle-play");
        masterSongTitle.textContent = "Hey Minnale";
        masterSongInfo.textContent = "by G.V. Prakash Kumar, Haricharan, Shweta Mohan ";
        masterCover.src = "https://res.cloudinary.com/drvp9ynaw/image/upload/v1735374558/le_qjxarb.jpg";
        playTitle.textContent = "Play";
        // audioElement.currentTime = 0;
    } else if (audioElement.paused) {
        audioElement.play();
        masterPlayBtn.classList.remove("fa-circle-play");
        masterPlayBtn.classList.add("fa-circle-pause");
        songCardsBtn[songIndex].classList.remove('fa-circle-play');
        songCardsBtn[songIndex].classList.add('fa-circle-pause');
        playTitle.textContent = "Pause";
        // homeSong.currentTime = 0;
    } else if (!audioElement.paused) {
        audioElement.pause();
        masterPlayBtn.classList.remove("fa-circle-pause");
        masterPlayBtn.classList.add("fa-circle-play");
        songCardsBtn[songIndex].classList.add('fa-circle-play');
        songCardsBtn[songIndex].classList.remove('fa-circle-pause');
        playTitle.textContent = "Play";
        // homeSong.currentTime = 0;
    }

});


// Automatic play next song when one song finshed playing
audioElement.addEventListener("ended", () => {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    if (!isSuffleEnable) {
        playPauseSong(songIndex);
    }
    displaySongDetails(songIndex);
});

// Automatic play next song when homeSong finshed playing
homeSong.addEventListener("ended", () => {
    songIndex++;
    if (isRepeatEnable) {
        homeSongPlay();
    } else {
        playPauseSong(0);
        displaySongDetails(0);
    }

});


// Next song event listener
document.getElementById('next').addEventListener('click', () => {
    customProgress.value = 0;

    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }

    audioElement.currentTime = 0;
    displaySongDetails(songIndex);
    playPauseSong(songIndex);
})


// Previous song event listener
document.getElementById('previous').addEventListener('click', () => {
    // customProgress.value = 0;
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    }
    else {
        songIndex -= 1;
    }
    audioElement.currentTime = 0;
    displaySongDetails(songIndex);
    playPauseSong(songIndex);
})


// Repeat mode enable
musicRepeat.addEventListener("click", () => {
    if (!isRepeatEnable) {
        repeatIndicator.style.display = "block";
        musicRepeat.style.color = "#26cc5a";
        audioElement.loop = true;
        isRepeatEnable = true;
    }
    else {
        repeatIndicator.style.display = "none";
        musicRepeat.style.color = "#9f9b9b";
        audioElement.loop = false;
        isRepeatEnable = false;
    }
});


// Changing shuffle icon
shuffleMusic.addEventListener("click", () => {
    if (!isSuffleEnable) {
        shuffleIndicator.style.display = "block";
        shuffleMusic.style.color = "#26cc5a";
        isSuffleEnable = true;
    }
    else {
        shuffleIndicator.style.display = "none";
        shuffleMusic.style.color = "#9f9b9b";
        isSuffleEnable = false;
    }
})

// Enable shuffle song
audioElement.addEventListener("ended", () => {
    if (isSuffleEnable) {
        songIndex = Math.floor(Math.random() * songs.length);
    }
    displaySongDetails(songIndex);
    if (isSuffleEnable) {
        playPauseSong(songIndex);
    }

})

// Handle header elements
function handleHeaderEl() {
    sideBar.classList.toggle("show-sidebar");
    headerSearchDiv.style.display = "none";
    pageNavigateBtn.style.display = "block";
    dropdownContainer.style.display = "flex";
}

// Show Sidebar
hamberger.addEventListener("click", function () {
    handleHeaderEl();
});

// Hide Sidebar
closeBtn.addEventListener("click", function () {
    handleHeaderEl();
});

// Show hide header search box by sidebar search
sideBarSearchIcon.addEventListener("click", () => {
    if (headerSearchDiv.style.display === "block") {
        handleHeaderEl();
    } else {
        sideBar.classList.toggle("show-sidebar");
        headerSearchDiv.style.display = "block";
        dropdownContainer.style.display = "none";
        pageNavigateBtn.style.display = "none";
    }
});


// Reset Header
if (window.innerWidth > 450) {
    window.addEventListener("resize", () => {
        headerSearchDiv.style.display = "none";
        pageNavigateBtn.style.display = "block";
        dropdownContainer.style.display = "flex";
    });
}


// Search songs by song title, artist name, album etc...
async function searchSong() {
    const searchInput = document.querySelector('.header-search-div input').value.trim();
    if (searchInput !== '') {
        const searchUrl = `https://api.allorigins.win/raw?url=https://api.deezer.com/search?q=${searchInput}`;
        const response = await fetch(searchUrl);
        const searchData = await response.json();
        songs = searchData.data || [];
        renderSongs();
    }
}

// Volume Increase Decrease
volumeRange.onchange = () => {
    audioElement.volume = volumeRange.value / 100;
}

// Volume Icon & Mute/Unmute music
volumeIcon.addEventListener("click", () => {
    if (volumeIcon.classList.contains("fa-volume-high")) {
        volumeIcon.classList.add("fa-volume-xmark");
        volumeIcon.classList.remove("fa-volume-high");
        audioElement.muted = true; // Mute the audio
    } else {
        volumeIcon.classList.add("fa-volume-high");
        volumeIcon.classList.remove("fa-volume-xmark");
        audioElement.muted = false; // Unmute the audio
    }
})

// Mute and Unmute message on hover 
volumeIcon.onclick = () => {
    if (mute.textContent === "Mute") {
        mute.textContent = "Unmute";
        mute.style.display = "block"

    } else {
        mute.textContent = "Mute";
        mute.style.display = "block"
    }
}

// Showing mute unmute pop up on hover
volumeIcon.addEventListener("mouseover", () => {
    mute.style.display = "block";
});

// Hiding mute unmute pop up on mouseout
volumeIcon.addEventListener("mouseout", () => {
    setTimeout(function () {
        mute.style.display = "none";
    }, 0.01 * 1000);
});

// Volume Icon update volume range
volumeSeekbar.addEventListener("click", () => {
    console.log(volumeSeekbar);
    if (volumeSeekbar.value < 2) {
        volumeIcon.classList.add("fa-volume-xmark");
        volumeIcon.classList.remove("fa-volume-low")
        volumeIcon.classList.remove("fa-phone-volume");
        volumeIcon.classList.remove("fa-volume-high");
        audioElement.muted = true;
    }
    if (volumeSeekbar.value > 2 && volumeSeekbar.value < 30) {
        volumeIcon.classList.remove("fa-volume-xmark");
        volumeIcon.classList.add("fa-volume-low");
        volumeIcon.classList.remove("fa-phone-volume");
        volumeIcon.classList.remove("fa-volume-high");
        audioElement.muted = false;
    }

    if (volumeSeekbar.value > 30 && volumeSeekbar.value < 80) {
        volumeIcon.classList.remove("fa-volume-xmark");
        volumeIcon.classList.remove("fa-volume-low");
        volumeIcon.classList.add("fa-phone-volume");
        volumeIcon.classList.remove("fa-volume-high");
        audioElement.muted = false;
    }

    if (volumeSeekbar.value > 80) {
        volumeIcon.classList.remove("fa-volume-xmark");
        volumeIcon.classList.remove("fa-volume-low");
        volumeIcon.classList.remove("fa-phone-volume");
        volumeIcon.classList.add("fa-volume-high");
        audioElement.muted = false;
    }
})

// Footer Heart Icon Color Change
footerHeartIcon.onclick = () => {
    if (footerHeartIcon.classList.contains("fa-regular")) {
        footerHeartIcon.classList.add("fa-solid");
        footerHeartIcon.classList.remove("fa-regular");
        footerHeartIcon.style.color = "#26cc5a"
    } else {
        footerHeartIcon.classList.add("fa-regular");
        footerHeartIcon.classList.remove("fa-solid");
        footerHeartIcon.style.color = "#b7b1b1"
    }
}

// Dropdown
dropdown.onclick = () => {
    if (dropdownInner.style.display === "block") {
        dropdownInner.style.display = "none";
        dropdownIcon.classList.remove("fa-caret-up");
        dropdownIcon.classList.add("fa-caret-down");
    }
    else {
        dropdownInner.style.display = "block";
        dropdownIcon.classList.add("fa-caret-up");
        dropdownIcon.classList.remove("fa-caret-down");
        window.onscroll = () => {
            if (dropdownInner.style.display === 'block') {
                window.scrollTo(0, 0);
            }
        }
    }
}

// Set the user name and avatar
window.addEventListener("load", () => {
    const userData = JSON.parse(localStorage.getItem("userData")) || [];

    if (userData && userData.username) {
        profileName.textContent = userData.username;
        profileImage.src = userData.avatar ? userData.avatar : profileImage.src;
    } else {
        // profileName.textContent = "username";
        window.open("../signup/signup.html");
    }
});

// Log Out
logOut.onclick = () => {
    window.open("../login/login.html");
}

// follow button
followBtn.onclick = () => {
    window.open("https://www.instagram.com/spotifyindia/");
}


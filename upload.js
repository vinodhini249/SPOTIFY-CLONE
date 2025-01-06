document.addEventListener("DOMContentLoaded", function () {
    const songForm = document.getElementById('songForm');
    const songNameInput = document.getElementById('songName');
    const artistNameInput = document.getElementById('artistName');
    const uploadImageBtn = document.getElementById('uploadImageBtn');
    const uploadSongBtn = document.getElementById('uploadSongBtn');
    const songImageInput = document.getElementById('songImageInput');
    const songFileInput = document.getElementById('songFileInput');
    const songContainer = document.querySelector('.song-container');

    let songImageFile, songFile;

    // Handle Image Upload
    uploadImageBtn.addEventListener("click", () => songImageInput.click());
    songImageInput.addEventListener("change", (e) => songImageFile = e.target.files[0]);

    // Handle Song Upload
    uploadSongBtn.addEventListener("click", () => songFileInput.click());
    songFileInput.addEventListener("change", (e) => songFile = e.target.files[0]);

    // Add Song Form Submit
    songForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (songImageFile && songFile) {
            const imageReader = new FileReader();
            imageReader.onload = function () {
                const songURL = URL.createObjectURL(songFile); // Correct URL creation

                const songData = {
                    songName: songNameInput.value.trim(),
                    artistName: artistNameInput.value.trim(),
                    image: imageReader.result,
                    songURL: songURL,
                };

                if (isDuplicateSong(songData)) {
                    alert("This song already exists in your playlist.");
                    return;
                }

                saveSongToLocalStorage(songData);
                addSongToPage(songData);

                songForm.reset();
                songImageFile = null;
                songFile = null;
            };
            imageReader.readAsDataURL(songImageFile);
        } else {
            alert("Please upload both an image and a song file.");
        }
    });

    // Prevent Duplicate Songs
    function isDuplicateSong(newSong) {
        const songs = JSON.parse(localStorage.getItem('songs')) || [];
        return songs.some(song => song.songName === newSong.songName && song.artistName === newSong.artistName);
    }

    // Save Song to localStorage
    function saveSongToLocalStorage(songData) {
        let songs = JSON.parse(localStorage.getItem('songs')) || [];
        songs.push(songData);
        localStorage.setItem('songs', JSON.stringify(songs));
    }

    // Load Songs from localStorage
    function loadSongsFromLocalStorage() {
        const songs = JSON.parse(localStorage.getItem('songs')) || [];
        songs.forEach(addSongToPage);
    }

    // Add Song to Page
    function addSongToPage(songData) {
        const songCard = document.createElement('div');
        songCard.className = 'song-card';

        songCard.innerHTML = `
            <img src="${songData.image}" alt="${songData.songName}">
            <h4>${songData.songName}</h4>
            <p>${songData.artistName}</p>
            <audio class="audio-controls" controls>
                <source src="${songData.songURL}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
            <button class="delete-button">Delete</button>
        `;

        // Delete Song
        songCard.querySelector('.delete-button').addEventListener('click', () => {
            deleteSong(songData);
            songCard.remove();
        });

        songContainer.appendChild(songCard);

        // Reload the audio element and play it
        const audioElement = songCard.querySelector('audio');
        audioElement.load(); // Reload the audio to ensure it plays properly
        audioElement.play(); // Explicitly trigger the play event to make sure the song starts
    }

    // Delete Song from localStorage
    function deleteSong(songData) {
        let songs = JSON.parse(localStorage.getItem('songs')) || [];
        songs = songs.filter(song => song.songName !== songData.songName || song.artistName !== songData.artistName);
        localStorage.setItem('songs', JSON.stringify(songs));
    }

    // Load songs on page load
    loadSongsFromLocalStorage();
});

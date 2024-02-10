let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'images/stay.png',
        name : 'STARS',
        artist : 'Kanye West ',
        music : 'music/Stars.mp3'
    },
    {
        img : 'images/stay.png',
        name : 'KEYS TO MY LIFE ',
        artist : 'Kanye West(ft. India Love)',
        music : 'music/keystomylife.mp3'
    },
    {
        img : 'images/stay.png',
        name : 'PAID',
        artist : 'Kanye West',
        music : 'music/paid.mp3'
    },
    {
        img : 'images/stay.png',
        name : 'TALKING ',
        artist : 'Kanye West (ft. North West)',
        music : 'music/talking.mp3'
    },
    {
        img : 'images/stay.png',
        name : 'BACK TO ME',
        artist : 'Kanye West (ft. Freddie Gibbs & Quavo)',
        music : 'music/backtome.mp3'
    },
    {
        img : 'images/stay.png',
        name : 'HOODRAT',
        artist : 'Kanye West ',
        music : 'music/hoodrat.mp3'
    },
    {
        img : 'images/stay.png',
        name : 'DO IT',
        artist : 'Kanye West (ft.YG',
        music : 'music/doit.mp3'
    },
    {
        img : 'images/stay.png',
        name : 'PAPEWORK',
        artist : 'Kanye West (ft.Quavo)',
        music : 'music/papework.mp3'
    },
    {
        img : 'images/stay.png',
        name : 'BURN ',
        artist : 'Kanye West',
        music : 'music/burn.mp3'
    },
    {
        img : 'images/stay.png',
        name : 'FUK SUMN ',
        artist : 'Kanye West (ft. Playboi Carti & Travis Scott)',
        music : 'music/fuksmn.mp3'
    },
    {
        img : 'images/stay.png',
        name : 'VULTURES ',
        artist : 'Kanye West (Lil Durk & Bump J))',
        music : 'music/vultures.mp3'
    },
    {
        img : 'images/stay.png',
        name : 'CARNIVAL ',
        artist : 'Kanye West (ft. Rich The Kid & Playboi Carti)',
        music : 'music/carnival.mp3'
    },
    {
        img : 'images/stay.png',
        name : 'GOOD (DONT DIE) ',
        artist : 'Kanye West',
        music : 'music/good.mp3'
    },
    {
        img : 'images/stay.png',
        name : 'PROBlEMATIC',
        artist : 'Kanye West',
        music : 'music/problematic.mp3'
    },
    {
        img : 'images/stay.png',
        name : 'KING ',
        artist : 'Kanye West',
        music : 'music/king.mp3'
    },
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

// Function to set background color
function set_bg_color(color) {
    document.body.style.background = color;
}

// Function to set background image
function set_bg_image(imageUrl) {
    document.body.style.backgroundImage = "url('" + imageUrl + "')";
}

// Call this function to initialize background color or image
function initialize_bg() {
    // Set background color (replace 'white' with your desired color)
    set_bg_color('white');

    // Set background image (replace 'url_to_your_image' with the URL of your image)
    // set_bg_image('url_to_your_image');
}

// Call this function to change the background color or image (if needed)
function change_bg_on_song_change() {
    // Here you can add logic to change background color or image
    // based on song change
    // For example:
    // set_bg_color('blue');
    // set_bg_image('url_to_new_image');
}

// Initialize background
initialize_bg();

// Call this function whenever the song changes
change_bg_on_song_change();
function setBgImage(imageUrl) {
    document.body.style.backgroundImage = "url('" + imageUrl + "')";
}

// Call setBgImage with the URL of your background image here
setBgImage('https://pbs.twimg.com/media/GF9mcJ3W8AAWWzz?format=jpg&name=medium');


function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

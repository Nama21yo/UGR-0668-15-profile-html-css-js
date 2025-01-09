let menulist = document.getElementById("menu__list");
menulist.style.maxHeight = "0px";

function toggleMenu() {
  if (menulist.style.maxHeight == "0px") {
    menulist.style.maxHeight = "300px";
    menulist.style.display = "block";
  } else {
    menulist.style.maxHeight = "0px";
    menulist.style.display = "none";
  }
}
const song = document.getElementById("song");
const playIcon = document.querySelector(".fa-play");
const pauseIcon = document.querySelector(".fa-pause");
const progressAudio = document.getElementById("progress__audio");
const currentTimeElem = document.getElementById("current-time");
const totalDurationElem = document.getElementById("total-duration");
const backwardButton = document.getElementById("backward");
const forwardButton = document.getElementById("forward");

// Format time in mm:ss
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

// Play or Pause the song
function playPause() {
  if (song.paused) {
    song.play();
    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
  } else {
    song.pause();
    playIcon.classList.remove("hidden");
    pauseIcon.classList.add("hidden");
  }
}

// Update progress bar and current time
song.addEventListener("timeupdate", () => {
  progressAudio.value = (song.currentTime / song.duration) * 100 || 0;
  currentTimeElem.textContent = formatTime(song.currentTime);
});

// Update total duration once it's loaded
song.addEventListener("loadedmetadata", () => {
  totalDurationElem.textContent = formatTime(song.duration);
});

// Seek through the song
progressAudio.addEventListener("input", () => {
  song.currentTime = (progressAudio.value / 100) * song.duration;
});

// Skip backward
backwardButton.addEventListener("click", () => {
  song.currentTime = Math.max(0, song.currentTime - 5); // Go back 5 seconds
});

// Skip forward
forwardButton.addEventListener("click", () => {
  song.currentTime = Math.min(song.duration, song.currentTime + 5); // Go forward 5 seconds
});

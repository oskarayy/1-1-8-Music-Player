const progress = document.getElementById('progress');
const song = document.getElementById('song');

const ctrlIcon = document.getElementById('ctrlIcon');
const ctrlIconBox = document.getElementById('ctrlIconBox');

song.onloadedmetadata = () => {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

ctrlIconBox.onclick = () => {
  if (ctrlIcon.className === 'fa-solid fa-pause') {
    song.pause();
    ctrlIcon.className = 'fa-solid fa-play';
  } else {
    song.play();
    ctrlIcon.className = 'fa-solid fa-pause';
  }
};

if (song.play()) {
  setInterval(() => {
    progress.value = song.currentTime;
  }, 500);
}

progress.onchange = () => {
  song.play();
  song.currentTime = progress.value;
  ctrlIcon.className = 'fa-solid fa-pause';
};

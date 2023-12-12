const songs = [
  {
    id: 'song-0',
    author: 'Quebonafide x FORXST',
    title: 'Madagaskar',
    img: '/assets/thumb1.png',
    audio: '/assets/quebo-madagaskar.mp3'
  },
  {
    id: 'song-1',
    author: 'Gentrammel',
    title: 'Out of my mind',
    img: '/assets/mymind.jpg',
    audio: '/assets/mymind-audio.mp3'
  },
  {
    id: 'song-2',
    author: 'November',
    title: 'Mask Off Freestyle',
    img: '/assets/maskoff.jpg',
    audio: '/assets/MaskFreestyle.mp3'
  }
];

const progress = document.getElementById('progress');
const song = document.getElementById('song');

const ctrlIcon = document.getElementById('ctrlIcon');
const ctrlIconBox = document.getElementById('ctrlIconBox');

const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');

const songSrc = document.querySelector('#song source');
const title = document.querySelector('.info h1');
const author = document.querySelector('.info p');
const thumb = document.getElementById('thumbnail');

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

const playSong = (type) => {
  const activeSongId = songs.findIndex(
    (item) => item.title === title.innerText
  );
  let songToPush;

  switch (type) {
    case 'next':
      songToPush =
        songs[activeSongId + 1 <= songs.length - 1 ? activeSongId + 1 : 0];
      break;
    case 'prev':
      songToPush =
        songs[activeSongId - 1 > -1 ? activeSongId - 1 : songs.length - 1];
      break;
    default:
      console.log('Switch Error: Wrong parameter.');
      break;
  }

  songSrc.src = songToPush.audio;
  thumb.src = songToPush.img;
  title.innerHTML = songToPush.title;
  author.innerHTML = songToPush.author;

  song.load();
  song.play();
  ctrlIcon.className = 'fa-solid fa-pause';
};

song.onended = playSong.bind(null, 'next');
backBtn.onclick = playSong.bind(null, 'prev');
nextBtn.onclick = playSong.bind(null, 'next');

if (song.play) {
  setInterval(() => {
    progress.value = song.currentTime;
  }, 500);
}

progress.onchange = () => {
  song.play();
  song.currentTime = progress.value;
  ctrlIcon.className = 'fa-solid fa-pause';
};

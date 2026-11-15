const opening = document.getElementById('opening');
const openButton = document.getElementById('openInvitation');
const musicButton = document.getElementById('musicToggle');
const weddingSong = document.getElementById('weddingSong');
let musicPlaying = false;

function setMusicLabel() {
  musicButton.setAttribute('aria-pressed', String(musicPlaying));
  musicButton.setAttribute('aria-label', musicPlaying ? 'Pause wedding music' : 'Play wedding music');
  musicButton.querySelector('.music-label').textContent = musicPlaying ? 'Music on' : 'Music off';
}

async function startMusic() {
  weddingSong.volume = 0.3;
  try {
    await weddingSong.play();
    musicPlaying = true;
  } catch {
    musicPlaying = false;
  }
  setMusicLabel();
}

function stopMusic() {
  musicPlaying = false;
  weddingSong.pause();
  setMusicLabel();
}

openButton.addEventListener('click', async () => {
  opening.classList.add('is-closed');
  opening.setAttribute('aria-hidden', 'true');
  await startMusic();
});

musicButton.addEventListener('click', () => {
  if (musicPlaying) stopMusic();
  else startMusic();
});

weddingSong.addEventListener('ended', () => {
  musicPlaying = false;
  setMusicLabel();
});

// 9:30 AM India Standard Time is 04:00 UTC.
const muhurtham = Date.UTC(2026, 10, 20, 4, 0, 0);
const countdownParts = {
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
};

function updateCountdown() {
  let remaining = Math.max(0, muhurtham - Date.now());
  const days = Math.floor(remaining / 86400000);
  remaining %= 86400000;
  const hours = Math.floor(remaining / 3600000);
  remaining %= 3600000;
  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  countdownParts.days.textContent = String(days).padStart(2, '0');
  countdownParts.hours.textContent = String(hours).padStart(2, '0');
  countdownParts.minutes.textContent = String(minutes).padStart(2, '0');
  countdownParts.seconds.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
window.setInterval(updateCountdown, 1000);
setMusicLabel();

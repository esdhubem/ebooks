// ESDHUBEM Ebooks Interativos - Core Controller
const VALID_KEYS = ['ESDHUBEM-VIP', 'LIVRO-2026', 'DEMO', 'ESDHUBEM'];
const STORAGE_KEY = 'esdhubem_ebook_unlocked';

let pageFlipInstance = null;
let soundEnabled = true;
let deferredPrompt = null;
let audioIsPlaying = false;
let audioSpeechUtterance = null;
let audioProgressTimer = null;

// Realistic Paper Sound Generator using Web Audio API
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playPaperTurnSound() {
  if (!soundEnabled) return;
  try {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const bufferSize = audioCtx.sampleRate * 0.12;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1400;
    filter.Q.value = 1.2;
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    noise.start();
  } catch (e) {
    console.log('Audio synthesis note:', e);
  }
}

// Access Gate Management
function checkAccess() {
  const isUnlocked = localStorage.getItem(STORAGE_KEY) === 'true';
  const overlay = document.getElementById('accessOverlay');
  const lockStatus = document.getElementById('lockStatus');
  if (isUnlocked) {
    overlay.classList.add('hidden');
    if (lockStatus) lockStatus.innerHTML = '🔓 Acesso Liberado';
  } else {
    overlay.classList.remove('hidden');
    if (lockStatus) lockStatus.innerHTML = '🔒 Bloqueado';
  }
}

function handleUnlock(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('inputAccessCode');
  const err = document.getElementById('accessError');
  const code = (input.value || '').trim().toUpperCase();

  if (VALID_KEYS.includes(code) || code.startsWith('ESD-')) {
    localStorage.setItem(STORAGE_KEY, 'true');
    err.classList.remove('show');
    checkAccess();
    if (pageFlipInstance) {
      pageFlipInstance.update();
    }
  } else {
    err.classList.add('show');
    input.focus();
  }
}

function lockBook() {
  localStorage.removeItem(STORAGE_KEY);
  checkAccess();
}

// PageFlip Initialization
function initFlipBook() {
  const container = document.getElementById('bookContainer');
  if (!container || !window.St || !window.St.PageFlip) {
    console.error('PageFlip library not loaded yet');
    return;
  }

  const isMobile = window.innerWidth <= 768;
  const pageWidth = isMobile ? Math.min(window.innerWidth - 30, 420) : 480;
  const pageHeight = isMobile ? Math.min(window.innerHeight - 150, 620) : 680;

  pageFlipInstance = new St.PageFlip(container, {
    width: pageWidth,
    height: pageHeight,
    size: 'stretch',
    minWidth: 320,
    maxWidth: 600,
    minHeight: 460,
    maxHeight: 850,
    maxShadowOpacity: 0.5,
    showCover: true,
    mobileScrollSupport: false,
    usePortrait: true,
    startPage: 0
  });

  pageFlipInstance.loadFromHTML(document.querySelectorAll('.page'));

  // Sync Slider and indicators
  const pageIndicator = document.getElementById('pageIndicator');
  const pageSlider = document.getElementById('pageSlider');

  pageFlipInstance.on('changeState', (e) => {
    if (e.data === 'flipping') {
      playPaperTurnSound();
    }
  });

  pageFlipInstance.on('flip', (e) => {
    const current = e.data + 1;
    const total = pageFlipInstance.getPageCount();
    if (pageIndicator) pageIndicator.textContent = `${current} / ${total}`;
    if (pageSlider) {
      pageSlider.max = total;
      pageSlider.value = current;
    }
  });

  // Controls
  document.getElementById('btnPrev').addEventListener('click', () => pageFlipInstance.flipPrev());
  document.getElementById('btnNext').addEventListener('click', () => pageFlipInstance.flipNext());
  
  if (pageSlider) {
    pageSlider.addEventListener('input', (e) => {
      const target = parseInt(e.target.value, 10) - 1;
      pageFlipInstance.flip(target);
    });
  }

  // TOC links
  document.querySelectorAll('.toc-item').forEach(item => {
    item.addEventListener('click', () => {
      const targetPage = parseInt(item.getAttribute('data-target'), 10);
      pageFlipInstance.flip(targetPage);
    });
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') pageFlipInstance.flipNext();
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') pageFlipInstance.flipPrev();
  });
}

// Audio Narration Player
function setupAudioPlayer() {
  const btnPlay = document.getElementById('btnPlayAudio');
  const fill = document.getElementById('audioFill');
  const time = document.getElementById('audioTime');
  const narrationText = "Bem-vindos à metodologia ESDHUBEM. O ato de escrever e mapear ideias liberta o potencial criativo e estrutura o pensamento com clareza cristalina.";

  if (!btnPlay) return;

  btnPlay.addEventListener('click', () => {
    if (!('speechSynthesis' in window)) {
      alert('Seu navegador não suporta sintetizador de voz direto, mas você pode usar áudio gravado.');
      return;
    }

    if (audioIsPlaying) {
      window.speechSynthesis.cancel();
      audioIsPlaying = false;
      btnPlay.innerHTML = '▶';
      clearInterval(audioProgressTimer);
      if (fill) fill.style.width = '0%';
      if (time) time.textContent = '00:00';
    } else {
      audioSpeechUtterance = new SpeechSynthesisUtterance(narrationText);
      audioSpeechUtterance.lang = 'pt-BR';
      audioSpeechUtterance.rate = 1.0;

      let elapsed = 0;
      const duration = 12; // approximate duration in seconds

      audioSpeechUtterance.onstart = () => {
        audioIsPlaying = true;
        btnPlay.innerHTML = '⏸';
        audioProgressTimer = setInterval(() => {
          elapsed += 0.5;
          const pct = Math.min(100, (elapsed / duration) * 100);
          if (fill) fill.style.width = `${pct}%`;
          const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
          const secs = String(Math.floor(elapsed % 60)).padStart(2, '0');
          if (time) time.textContent = `${mins}:${secs}`;
          if (elapsed >= duration) clearInterval(audioProgressTimer);
        }, 500);
      };

      audioSpeechUtterance.onend = () => {
        audioIsPlaying = false;
        btnPlay.innerHTML = '▶';
        clearInterval(audioProgressTimer);
        if (fill) fill.style.width = '100%';
      };

      window.speechSynthesis.speak(audioSpeechUtterance);
    }
  });
}

// Interactive Quiz on page
function setupQuiz() {
  document.querySelectorAll('.quiz-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      const parent = opt.closest('.quiz-options');
      parent.querySelectorAll('.quiz-opt').forEach(btn => btn.classList.remove('correct', 'wrong'));
      if (opt.getAttribute('data-correct') === 'true') {
        opt.classList.add('correct');
      } else {
        opt.classList.add('wrong');
        const correctOne = parent.querySelector('[data-correct="true"]');
        if (correctOne) correctOne.classList.add('correct');
      }
    });
  });
}

// UI controls (Sound, Fullscreen, PWA install)
function setupUIControls() {
  const btnSound = document.getElementById('btnToggleSound');
  if (btnSound) {
    btnSound.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      btnSound.innerHTML = soundEnabled ? '🔊' : '🔇';
      btnSound.title = soundEnabled ? 'Som ativado' : 'Som desativado';
    });
  }

  const btnFullscreen = document.getElementById('btnFullscreen');
  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.log(err));
        btnFullscreen.innerHTML = '⛶';
      } else {
        document.exitFullscreen();
        btnFullscreen.innerHTML = '⛶';
      }
    });
  }

  // Demo key chips
  document.querySelectorAll('.chip-key').forEach(chip => {
    chip.addEventListener('click', () => {
      const input = document.getElementById('inputAccessCode');
      input.value = chip.textContent;
      handleUnlock();
    });
  });

  document.getElementById('accessForm').addEventListener('submit', handleUnlock);
  document.getElementById('btnLockBook').addEventListener('click', lockBook);

  // PWA Prompt
  const btnInstall = document.getElementById('btnInstallApp');
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (btnInstall) btnInstall.style.display = 'inline-block';
  });

  if (btnInstall) {
    btnInstall.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          btnInstall.style.display = 'none';
        }
        deferredPrompt = null;
      }
    });
  }

  // Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW register note:', err));
  }
}

// Lifecycle Init
window.addEventListener('DOMContentLoaded', () => {
  checkAccess();
  setupUIControls();
  setupAudioPlayer();
  setupQuiz();

  // Give DOM a small moment to compute layout then init pageFlip
  setTimeout(() => {
    initFlipBook();
  }, 100);
});

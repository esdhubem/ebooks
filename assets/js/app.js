// ESDHUBEM Ebooks Interativos - Core Controller
const VALID_KEYS = ['ESDHUBEM-VIP', 'LIVRO-2026', 'DEMO', 'ESDHUBEM'];
const STORAGE_KEY = 'esdhubem_ebook_unlocked';

let pageFlipInstance = null;
let soundEnabled = true;
let deferredPrompt = null;
let currentFontSize = 0.96; // rem

// Realistic Paper Sound Generator (Lazy initialization to prevent browser autoplay warnings)
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx && typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (err) {
      console.warn('AudioContext init:', err);
    }
  }
  return audioCtx;
}

function playPaperTurnSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const bufferSize = ctx.sampleRate * 0.12;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1400;
    filter.Q.value = 1.2;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } catch (e) {
    console.log('Audio note:', e);
  }
}

// Access Gate Management
function checkAccess() {
  const isUnlocked = localStorage.getItem(STORAGE_KEY) === 'true';
  const overlay = document.getElementById('accessOverlay');
  if (isUnlocked) {
    overlay.classList.add('hidden');
  } else {
    overlay.classList.remove('hidden');
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
    if (pageFlipInstance) pageFlipInstance.update();
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
  const loader = document.getElementById('bookLoader');
  if (!container || !window.St || !window.St.PageFlip) return;

  const isMobile = window.innerWidth <= 768;
  // Available height taking into account slim header (44px) + reader-dock (approx 65px) + safe margin
  const maxAvailableHeight = window.innerHeight - 125;
  
  // Strict height bounding:
  // Desktop: capped comfortably between 400px and 560px
  // Mobile: capped between 360px and 520px
  const maxTargetH = isMobile ? 520 : 560;
  const minTargetH = isMobile ? 360 : 400;
  const pageHeight = Math.max(minTargetH, Math.min(maxTargetH, maxAvailableHeight));
  
  // Available width per page
  const maxPageW = isMobile 
    ? window.innerWidth - 24 
    : Math.floor((window.innerWidth - 48) / 2);
  
  // Proportional width (~0.71 aspect ratio)
  const pageWidth = Math.min(maxPageW, Math.round(pageHeight * 0.71));

  pageFlipInstance = new St.PageFlip(container, {
    width: pageWidth,
    height: pageHeight,
    size: 'fixed',
    minWidth: 260,
    maxWidth: pageWidth,
    minHeight: 340,
    maxHeight: pageHeight,
    maxShadowOpacity: 0.5,
    showCover: true,
    mobileScrollSupport: false,
    usePortrait: true,
    startPage: 0
  });

  pageFlipInstance.loadFromHTML(document.querySelectorAll('.page'));

  const revealBook = () => {
    container.classList.add('ready');
    if (loader) loader.classList.add('hidden');
  };

  pageFlipInstance.on('init', revealBook);
  setTimeout(revealBook, 250);

  const pageIndicator = document.getElementById('pageIndicator');
  const pageSlider = document.getElementById('pageSlider');

  pageFlipInstance.on('changeState', (e) => {
    if (e.data === 'flipping') playPaperTurnSound();
  });

  pageFlipInstance.on('flip', (e) => {
    stopAllAudioPlayers();
    const current = e.data + 1;
    const total = pageFlipInstance.getPageCount();
    if (pageIndicator) pageIndicator.textContent = `${current} / ${total}`;
    if (pageSlider) {
      pageSlider.max = total;
      pageSlider.value = current;
    }
  });

  document.getElementById('btnPrev').addEventListener('click', () => pageFlipInstance.flipPrev());
  document.getElementById('btnNext').addEventListener('click', () => pageFlipInstance.flipNext());
  
  if (pageSlider) {
    pageSlider.addEventListener('input', (e) => {
      const target = parseInt(e.target.value, 10) - 1;
      pageFlipInstance.flip(target);
    });
  }

  // TOC and Drawer links
  document.querySelectorAll('.toc-item, .drawer-toc-item').forEach(item => {
    item.addEventListener('click', () => {
      const targetPage = parseInt(item.getAttribute('data-target'), 10);
      pageFlipInstance.flip(targetPage);
      const drawer = document.getElementById('drawerOverlay');
      if (drawer) drawer.classList.add('hidden');
    });
  });

  // Keyboard
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') pageFlipInstance.flipNext();
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') pageFlipInstance.flipPrev();
  });

  document.querySelectorAll('.page-body').forEach(body => {
    body.addEventListener('wheel', (e) => {
      if (body.scrollHeight > body.clientHeight) {
        e.stopPropagation();
      }
    }, { passive: true });
  });
}

// Audio Player Factory & Active Controller
let activeAudioTimer = null;

function stopAllAudioPlayers() {
  if (activeAudioTimer) {
    clearInterval(activeAudioTimer);
    activeAudioTimer = null;
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  document.querySelectorAll('.btn-play').forEach(b => b.innerHTML = '▶');
  document.querySelectorAll('.audio-progress-fill').forEach(f => f.style.width = '0%');
  document.querySelectorAll('.audio-time').forEach(t => t.textContent = '00:00');
}

function setupPlayer(btnId, fillId, timeId, textSpeech) {
  const btn = document.getElementById(btnId);
  const fill = document.getElementById(fillId);
  const time = document.getElementById(timeId);
  let isPlaying = false;

  if (!btn) return;

  btn.addEventListener('click', () => {
    if (!('speechSynthesis' in window)) {
      alert('Sintetizador de voz não suportado pelo navegador.');
      return;
    }

    if (isPlaying) {
      stopAllAudioPlayers();
      isPlaying = false;
    } else {
      stopAllAudioPlayers();
      isPlaying = true;
      btn.innerHTML = '⏸';

      const utter = new SpeechSynthesisUtterance(textSpeech);
      utter.lang = 'pt-BR';
      utter.rate = 1.0;

      const words = textSpeech.trim().split(/\s+/).length;
      const duration = Math.max(12, Math.round(words / 2.3));

      let elapsed = 0;
      activeAudioTimer = setInterval(() => {
        elapsed += 0.5;
        const pct = Math.min(100, (elapsed / duration) * 100);
        if (fill) fill.style.width = `${pct}%`;
        const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const s = String(Math.floor(elapsed % 60)).padStart(2, '0');
        if (time) time.textContent = `${m}:${s}`;
        if (elapsed >= duration) {
          clearInterval(activeAudioTimer);
          activeAudioTimer = null;
        }
      }, 500);

      utter.onend = () => {
        isPlaying = false;
        btn.innerHTML = '▶';
        if (activeAudioTimer) {
          clearInterval(activeAudioTimer);
          activeAudioTimer = null;
        }
        if (fill) fill.style.width = '100%';
        setTimeout(() => {
          if (!isPlaying && fill) fill.style.width = '0%';
          if (!isPlaying && time) time.textContent = '00:00';
        }, 1500);
      };

      utter.onerror = () => {
        isPlaying = false;
        btn.innerHTML = '▶';
        if (activeAudioTimer) {
          clearInterval(activeAudioTimer);
          activeAudioTimer = null;
        }
      };

      window.speechSynthesis.speak(utter);
    }
  });
}

// Font size controller
function setupFontSizeControls() {
  const btnPlus = document.getElementById('btnFontPlus');
  const btnMinus = document.getElementById('btnFontMinus');

  if (btnPlus) {
    btnPlus.addEventListener('click', () => {
      currentFontSize = Math.min(1.08, currentFontSize + 0.04);
      document.querySelectorAll('.page-text').forEach(el => {
        el.style.fontSize = `${currentFontSize}rem`;
        el.style.lineHeight = currentFontSize > 1.0 ? '1.48' : '1.58';
      });
    });
  }

  if (btnMinus) {
    btnMinus.addEventListener('click', () => {
      currentFontSize = Math.max(0.80, currentFontSize - 0.04);
      document.querySelectorAll('.page-text').forEach(el => {
        el.style.fontSize = `${currentFontSize}rem`;
        el.style.lineHeight = '1.58';
      });
    });
  }
}

// Drawer
function setupDrawer() {
  const btnOpen = document.getElementById('btnQuickMenu');
  const btnClose = document.getElementById('btnCloseDrawer');
  const drawer = document.getElementById('drawerOverlay');

  if (btnOpen && drawer) {
    btnOpen.addEventListener('click', (e) => {
      e.stopPropagation();
      drawer.classList.remove('hidden');
    });
  }
  if (btnClose && drawer) {
    btnClose.addEventListener('click', (e) => {
      e.stopPropagation();
      drawer.classList.add('hidden');
    });
  }
  if (drawer) {
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) {
        drawer.classList.add('hidden');
      }
    });
  }
}

// Quiz
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

// Init UI
function setupUI() {
  setupFontSizeControls();
  setupDrawer();
  setupQuiz();

  setupPlayer(
    'btnPlayAudio1',
    'audioFill1',
    'audioTime1',
    'Introdução ao Estudo dos Mapas Mentais. Na realidade atual, vivemos na Era da Informação e da Inteligência Artificial. As inovações tecnológicas oferecem uma carga contínua de dados, exigindo discernimento crítico na triagem do que é verdadeiro e conversão de dados em conhecimento aplicável.'
  );

  setupPlayer(
    'btnPlayAudio2',
    'audioFill2',
    'audioTime2',
    'Capítulo 1: A Criação da Técnica por Tony Buzan. O pesquisador britânico percebeu limitações nos métodos convencionais lineares de anotação e buscou uma estratégia alternativa que integrasse estímulos visuais diversos, como cores, imagens e palavras-chave, para potencializar o cérebro.'
  );

  setupPlayer(
    'btnPlayAudio3',
    'audioFill3',
    'audioTime3',
    'Capítulo 2: Processamento Cérebro-Total e Hemisférios. A neurociência cognitiva demonstra que a retenção duradoura depende da ativação sinérgica dos dois hemisférios cerebrais, unindo o pensamento sequencial analítico à visão espacial holística.'
  );

  const btnSound = document.getElementById('btnToggleSound');
  if (btnSound) {
    btnSound.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      btnSound.innerHTML = soundEnabled ? '🔊' : '🔇';
    });
  }

  const btnFullscreen = document.getElementById('btnFullscreen');
  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(e => console.log(e));
      } else {
        document.exitFullscreen();
      }
    });
  }

  document.querySelectorAll('.chip-key').forEach(chip => {
    chip.addEventListener('click', () => {
      const input = document.getElementById('inputAccessCode');
      input.value = chip.textContent;
      handleUnlock();
    });
  });

  document.getElementById('accessForm').addEventListener('submit', handleUnlock);
  document.getElementById('btnLockBook').addEventListener('click', lockBook);

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
        if (outcome === 'accepted') btnInstall.style.display = 'none';
        deferredPrompt = null;
      }
    });
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW:', err));
  }
}

window.addEventListener('DOMContentLoaded', () => {
  checkAccess();
  setupUI();
  setTimeout(() => initFlipBook(), 120);
});

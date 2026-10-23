const fs = require('fs');
const path = require('path');

const { p1_cover, p2_ficha, p3_toc } = require('./book_pages_1');
const { p4_intro, p5_cap1, p6_cap2 } = require('./book_pages_2');
const { p7_cap3, p8_cap4, p9_cap5 } = require('./book_pages_3');
const { p10_cap6, p11_refs, p12_backcover } = require('./book_pages_4');

const masterHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>O Que é Mapa Mental? Para que pode servir? | ESDHUBEM</title>
  
  <meta name="description" content="Obra Autoral de Silviane Silvério - Da Organização das Ideias à Escrita e à Expressão Oral: Uma Abordagem Prática da Metodologia ESDHUBEM.">
  <meta name="theme-color" content="#0F1A33">
  
  <!-- PWA Manifest & Icons -->
  <link rel="manifest" href="manifest.json">
  <link rel="apple-touch-icon" href="assets/icons/apple-touch-icon.png">
  <link rel="icon" type="image/png" href="assets/icons/pwa-192x192.png">
  
  <!-- Google Fonts: Cormorant Garamond & Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

  <!-- TOP HEADER -->
  <header class="app-header">
    <div class="brand-wrapper">
      <img src="assets/images/logo-cursos.png" alt="ESDHUBEM Logo" class="brand-logo" onerror="this.src='assets/icons/pwa-192x192.png'">
      <div class="brand-titles">
        <h1>ESDHUBEM</h1>
        <span>Biblioteca Digital • Obra Autoral</span>
      </div>
    </div>
    
    <div class="header-actions">
      <button id="btnQuickMenu" class="btn-icon" title="Sumário e Capítulos">📑</button>
      <button id="btnFontMinus" class="btn-icon" title="Diminuir Letra">A-</button>
      <button id="btnFontPlus" class="btn-icon" title="Aumentar Letra">A+</button>
      <button id="btnInstallApp" class="btn-install" title="Instalar aplicativo no celular">📲 Instalar App</button>
      <button id="btnToggleSound" class="btn-icon" title="Som de folhear">🔊</button>
      <button id="btnFullscreen" class="btn-icon" title="Modo tela cheia">⛶</button>
      <button id="btnLockBook" class="btn-icon" title="Bloquear / Trocar Chave">🔒</button>
    </div>
  </header>

  <!-- MAIN BOOK STAGE -->
  <main class="book-stage">
    <div id="bookContainer" class="flip-book-container">
      ${p1_cover}
      ${p2_ficha}
      ${p3_toc}
      ${p4_intro}
      ${p5_cap1}
      ${p6_cap2}
      ${p7_cap3}
      ${p8_cap4}
      ${p9_cap5}
      ${p10_cap6}
      ${p11_refs}
      ${p12_backcover}
    </div>
  </main>

  <!-- BOTTOM READER DOCK -->
  <nav class="reader-dock">
    <button id="btnPrev" class="dock-btn" title="Página Anterior">◀</button>
    <input type="range" id="pageSlider" class="dock-slider" min="1" max="12" value="1">
    <span id="pageIndicator" class="dock-pages">1 / 12</span>
    <button id="btnNext" class="dock-btn" title="Próxima Página">▶</button>
  </nav>

  <!-- DRAWER / MENU LATERAL DE CAPÍTULOS -->
  <div id="drawerOverlay" class="drawer-overlay hidden">
    <div class="drawer-card">
      <div class="drawer-header">
        <h3>📑 Capítulos da Obra</h3>
        <button id="btnCloseDrawer" class="btn-icon">✕</button>
      </div>
      <div class="drawer-body">
        <ul class="drawer-toc-list">
          <li class="drawer-toc-item" data-target="0"><strong>Capa Oficial</strong></li>
          <li class="drawer-toc-item" data-target="1">Ficha Catalográfica & Apresentação</li>
          <li class="drawer-toc-item" data-target="2">Sumário & Arquitetura da Obra</li>
          <li class="drawer-toc-item" data-target="3">Introdução: Aprendizagem Integrativa (Áudio)</li>
          <li class="drawer-toc-item" data-target="4">Capítulo 1: Fundamentos, Buzan e Novak</li>
          <li class="drawer-toc-item" data-target="5">Capítulo 2: Bases Cognitivas & Tríade (Áudio)</li>
          <li class="drawer-toc-item" data-target="6">Capítulo 3: Metodologia e Regras (Vídeo)</li>
          <li class="drawer-toc-item" data-target="7">Capítulo 4: Tecnologias e Multiletramentos</li>
          <li class="drawer-toc-item" data-target="8">Capítulo 5: Estudos de Caso (Vídeo)</li>
          <li class="drawer-toc-item" data-target="9">Capítulo 6: Considerações Finais & Quiz</li>
          <li class="drawer-toc-item" data-target="10">Referências Bibliográficas</li>
          <li class="drawer-toc-item" data-target="11">Contracapa & Certificado</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- ACCESS GATE OVERLAY (TELA DE BLOQUEIO / SENHA VIP) -->
  <div id="accessOverlay" class="access-modal-overlay">
    <div class="access-card">
      <div class="access-badge">🔒 Edição Autoral Protegida</div>
      <img src="assets/images/logo-cursos.png" alt="ESDHUBEM" class="access-logo" onerror="this.src='assets/icons/pwa-192x192.png'">
      <h2 class="access-title">Biblioteca ESDHUBEM</h2>
      <p class="access-desc">
        Bem-vindo(a) à obra <strong>"O que é Mapa Mental? Para que pode servir?"</strong> de Silviane Silvério. Digite sua <strong>Chave de Acesso</strong> para liberar o livro:
      </p>

      <form id="accessForm" class="access-form">
        <div class="input-code-wrapper">
          <input 
            type="text" 
            id="inputAccessCode" 
            class="input-code" 
            placeholder="Ex: ESDHUBEM-VIP ou seu código" 
            autocomplete="off" 
            required>
        </div>
        <button type="submit" class="btn-unlock">🔓 Desbloquear e Começar a Ler</button>
        <span id="accessError" class="error-message">⚠️ Código não encontrado ou inválido. Tente novamente!</span>
      </form>

      <div class="access-hints">
        <p>Chaves de demonstração ativas para teste:</p>
        <div class="demo-keys">
          <span class="chip-key">ESDHUBEM-VIP</span>
          <span class="chip-key">LIVRO-2026</span>
          <span class="chip-key">DEMO</span>
        </div>
        <p style="margin-top: 0.8rem; font-size: 0.75rem;">
          Adquiriu na Hotmart, Kiwify ou Monetizze? <br>
          Seu código foi enviado ao seu e-mail de compra.
        </p>
      </div>
    </div>
  </div>

  <!-- SCRIPTS -->
  <script src="assets/js/page-flip.browser.js"></script>
  <script src="assets/js/app.js"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), masterHtml, 'utf8');
console.log('Master index.html generated successfully!');

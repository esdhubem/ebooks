const fs = require('fs');
const path = require('path');

const md = fs.readFileSync(path.join(__dirname, '..', 'livro-mapas-mentais.md'), 'utf8');

function cleanMarkdown(text) {
  if (!text) return '';
  let html = text
    .replace(/<a id=".*?"><\/a>/g, '')
    .replace(/^#### (.*$)/gim, '<h5 class="sub-heading">$1</h5>')
    .replace(/^### (.*$)/gim, '<h4 class="section-heading">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 class="chapter-sub">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^> (.*$)/gim, '<blockquote class="callout-box">$1</blockquote>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');

  const blocks = html.split(/\n\s*\n/);
  return blocks.map((b, idx) => {
    b = b.trim();
    if (!b) return '';
    if (b.startsWith('<h') || b.startsWith('<blockquote') || b.startsWith('<ul') || b.startsWith('<div')) return b;
    if (b.startsWith('- ') || b.startsWith('* ') || /^\d+\.\s/.test(b)) {
      const items = b.split('\n').map(i => `<li>${i.replace(/^([-*]|\d+\.)\s*/, '')}</li>`).join('');
      return `<ul class="method-rules-list">${items}</ul>`;
    }
    const isFirst = idx === 0 ? ' first-letter' : '';
    return `<p class="page-text${isFirst}">${b.replace(/\n/g, ' ')}</p>`;
  }).filter(Boolean).join('\n');
}

function extract(startHeader, endHeader) {
  const s = md.indexOf(startHeader);
  if (s === -1) return '';
  const startContent = s + startHeader.length;
  const e = endHeader ? md.indexOf(endHeader, startContent) : md.length;
  return md.substring(startContent, e !== -1 ? e : md.length).trim();
}

function makePage(num, headerL, headerR, badge, title, content, footerL) {
  return `
      <!-- PÁGINA ${num} -->
      <div class="page">
        <div class="page-header">
          <span>${headerL}</span>
          <span>${headerR}</span>
        </div>
        <div class="page-body">
          ${badge ? `<div class="chapter-badge">${badge}</div>` : ''}
          ${title ? `<h2 class="page-heading">${title}</h2>` : ''}
          ${content}
        </div>
        <div class="page-footer">
          <span>${footerL || 'Metodologia ESDHUBEM'}</span>
          <span>Pág. ${String(num).padStart(2, '0')}</span>
        </div>
      </div>
  `;
}

// 1. Cover
const p1 = `
      <!-- PÁGINA 1: CAPA OFICIAL -->
      <div class="page --cover" data-density="hard">
        <div class="cover-content">
          <div class="cover-badge">Obra Acadêmica & Prática • 1ª Edição 2026</div>
          <div class="cover-main">
            <h1 class="cover-title">
              O QUE É MAPA MENTAL?
              <span>PARA QUE PODE SERVIR?</span>
            </h1>
            <p class="cover-subtitle">Da Organização das Ideias à Escrita e à Expressão Oral</p>
            <div class="cover-tagline">Uma Abordagem Prática da Metodologia ESDHUBEM</div>
          </div>
          <div class="cover-author">
            Escola Superior de Desenvolvimento Humano e Bem-Estar
            <strong>Profª. Silviane Silvério</strong>
          </div>
          <div class="cover-footer">
            ✦ ESDHUBEM PUBLICAÇÕES • SÃO PAULO, BRASIL ✦
          </div>
        </div>
      </div>
`;

// 2. Ficha & Apresentação
const p2 = `
      <!-- PÁGINA 2: FICHA CATALOGRÁFICA & APRESENTAÇÃO -->
      <div class="page">
        <div class="page-header">
          <span>ESDHUBEM Publicações</span>
          <span>Ficha Catalográfica & Editorial</span>
        </div>
        <div class="page-body">
          <div class="cip-container">
            <div class="cip-title">Dados Internacionais de Catalogação na Publicação (CIP)</div>
            <div class="cip-body">
              <strong>S587q &nbsp; Silvério, Silviane</strong><br>
              <strong>O que é Mapa Mental? Para que pode servir?: da organização das ideias à escrita e à expressão oral: uma abordagem prática da metodologia ESDHUBEM</strong> / Silviane Silvério. — 1. ed. — São Paulo: ESDHUBEM Publicações, 2026.<br>
              120 p. : il.<br><br>
              <strong>ISBN:</strong> 978-65-00-12345-6 <em>(Edição Digital Master / PWA)</em><br>
              1. Mapas Mentais. 2. Psicologia Cognitiva e Neurociência. 3. Metacognição. 4. Tríade Mental-Verbal. 5. Aprendizagem Significativa. 6. Multiletramentos. I. Título.<br>
              <strong>CDD:</strong> 370.152 &nbsp;|&nbsp; <strong>CDU:</strong> 37.015.3
            </div>
          </div>
          <div class="chapter-badge" style="margin-top: 1.2rem;">Apresentação da Autora</div>
          <blockquote class="callout-box">
            "Aprender não é apenas acumular dados ou memorizar definições; aprender é transformar a informação recebida em elaboração própria, consciência crítica e capacidade de expressão autêntica."<br>
            — <strong>Silviane Silvério</strong>, <em>Fundadora da ESDHUBEM</em>
          </blockquote>
          <p class="page-text first-letter">
            Esta obra nasce do compromisso da <strong>ESDHUBEM (Escola de Desenvolvimento Humano e Bem-Estar)</strong> em oferecer instrumentos acessíveis, profundos e cientificamente respaldados para a emancipação intelectual de estudantes, docentes, pesquisadores e profissionais.
          </p>
        </div>
        <div class="page-footer">
          <span>Ficha Editorial</span>
          <span>Pág. 02</span>
        </div>
      </div>
`;

// 3. Sumário
const p3 = `
      <!-- PÁGINA 3: SUMÁRIO DINÂMICO -->
      <div class="page">
        <div class="page-header">
          <span>Sumário Interativo</span>
          <span>Navegação Rápida</span>
        </div>
        <div class="page-body">
          <div class="chapter-badge">Índice Geral</div>
          <h2 class="page-heading">Arquitetura da Obra (39 Páginas)</h2>
          <p class="page-text" style="font-size: 0.88rem; color: #555;">Toque em qualquer capítulo para folhear diretamente:</p>
          <ul class="toc-list">
            <li class="toc-item" data-target="3">
              <span class="toc-title">Introdução Geral: A Aprendizagem Integrativa (Áudio)</span>
              <span class="toc-page">Pág. 04</span>
            </li>
            <li class="toc-item" data-target="7">
              <span class="toc-title">Capítulo 1: Fundamentos, Buzan e Epistemologia</span>
              <span class="toc-page">Pág. 08</span>
            </li>
            <li class="toc-item" data-target="14">
              <span class="toc-title">Capítulo 2: Bases Cognitivas & Tríade (Áudio)</span>
              <span class="toc-page">Pág. 15</span>
            </li>
            <li class="toc-item" data-target="22">
              <span class="toc-title">Capítulo 3: Metodologia e Leis de Construção</span>
              <span class="toc-page">Pág. 23</span>
            </li>
            <li class="toc-item" data-target="27">
              <span class="toc-title">Capítulo 4: Ferramentas Tecnológicas e Software</span>
              <span class="toc-page">Pág. 28</span>
            </li>
            <li class="toc-item" data-target="30">
              <span class="toc-title">Capítulo 5: Aplicações Práticas & Estudos de Caso</span>
              <span class="toc-page">Pág. 31</span>
            </li>
            <li class="toc-item" data-target="34">
              <span class="toc-title">Capítulo 6: Considerações Finais & Quiz de Fixação</span>
              <span class="toc-page">Pág. 35</span>
            </li>
            <li class="toc-item" data-target="36">
              <span class="toc-title">Referências Bibliográficas & Conclusão</span>
              <span class="toc-page">Pág. 37</span>
            </li>
          </ul>
        </div>
        <div class="page-footer">
          <span>Sumário</span>
          <span>Pág. 03</span>
        </div>
      </div>
`;

// Audio 1 in Intro
const audioIntroHtml = `
          <div class="audio-card">
            <div class="audio-header">
              <div class="audio-icon-pulse">🎙️</div>
              <div class="audio-info">
                <h4>Áudio-Introdução: A Aprendizagem Integrativa</h4>
                <span>Profª Silviane Silvério • Narração Autoral</span>
              </div>
            </div>
            <div class="audio-controls">
              <button class="btn-play" id="btnPlayAudioIntro" title="Ouvir Introdução">▶</button>
              <div class="audio-progress-bar">
                <div id="audioFillIntro" class="audio-progress-fill"></div>
              </div>
              <span id="audioTimeIntro" class="audio-time">00:00</span>
            </div>
          </div>
`;

// Audio 2 in Cap 2
const audioCap2Html = `
          <div class="audio-card">
            <div class="audio-header">
              <div class="audio-icon-pulse">🎧</div>
              <div class="audio-info">
                <h4>Podcast Cap. 2: A Tríade Mental-Verbal</h4>
                <span>Profª Silviane Silvério • Análise Cognitiva</span>
              </div>
            </div>
            <div class="audio-controls">
              <button class="btn-play" id="btnPlayAudioCap2" title="Ouvir Podcast Cap. 2">▶</button>
              <div class="audio-progress-bar">
                <div id="audioFillCap2" class="audio-progress-fill"></div>
              </div>
              <span id="audioTimeCap2" class="audio-time">00:00</span>
            </div>
          </div>
`;

// Extract sections
const p4 = makePage(4, 'Introdução Geral', 'Objeto de Estudo', 'Introdução • Parte 1', 'Contextualização e Objeto de Estudo', 
  audioIntroHtml + cleanMarkdown(extract('### 1. Contextualização e Objeto de Estudo', '### 2. Por que estudar os mapas mentais?')));

const p5 = makePage(5, 'Introdução Geral', 'Relevância & Problema', 'Introdução • Parte 2', 'Por que Estudar os Mapas Mentais?', 
  cleanMarkdown(extract('### 2. Por que estudar os mapas mentais?', '### 4. Justificativa')));

const p6 = makePage(6, 'Introdução Geral', 'Justificativa & Aprendizagem', 'Introdução • Parte 3', 'A Aprendizagem Integrativa', 
  cleanMarkdown(extract('### 4. Justificativa', '### 6. Objetivos')));

const p7 = makePage(7, 'Introdução Geral', 'Objetivos & Visualização', 'Introdução • Parte 4', 'Da Organização Linear à Visual', 
  cleanMarkdown(extract('### 6. Objetivos', '## Capítulo 1: Fundamentos, Origens e Epistemologia')));

// Capítulo 1 (Pages 8 to 14)
const p8 = makePage(8, 'Capítulo 1', 'Origens Históricas', 'Capítulo 1 • Tópico 1', 'A Criação da Técnica por Tony Buzan', 
  cleanMarkdown(extract('### 1. A criação da técnica por Tony Buzan', '### 2. A Fundamentação do Pensamento Irradiante')));

const p9 = makePage(9, 'Capítulo 1', 'Pensamento Irradiante', 'Capítulo 1 • Tópico 2', 'O Pensamento Irradiante e Não Linear', 
  cleanMarkdown(extract('### 2. A Fundamentação do Pensamento Irradiante', '### 3. As Analogias Orgânicas')));

const p10 = makePage(10, 'Capítulo 1', 'Biologia & Mnemônica', 'Capítulo 1 • Tópico 3', 'As Analogias Orgânicas: A Neurona e a Árvore', 
  cleanMarkdown(extract('### 3. As Analogias Orgânicas', '### 4. Delimitação Epistemológica')));

const p11 = makePage(11, 'Capítulo 1', 'Epistemologia', 'Capítulo 1 • Tópico 4', 'Mapa Mental vs. Mapa Conceitual (Novak)', 
  cleanMarkdown(extract('### 4. Delimitação Epistemológica', '### 5. A Integração Sinérgica')));

const p12 = makePage(12, 'Capítulo 1', 'Sinergia Buzan & Novak', 'Capítulo 1 • Tópico 5', 'A Integração Sinérgica entre Buzan e Novak', 
  cleanMarkdown(extract('### 5. A Integração Sinérgica', '### 6. Para Além de Buzan e Novak')));

const p13 = makePage(13, 'Capítulo 1', 'Metodologias de Estudo', 'Capítulo 1 • Tópico 6', 'Para Além de Buzan: Ecossistema de Estudos', 
  cleanMarkdown(extract('### 6. Para Além de Buzan e Novak', '### 7. Síntese do Capítulo e Transição')));

const p14 = makePage(14, 'Capítulo 1', 'Síntese & Transição', 'Capítulo 1 • Tópico 7', 'Síntese do Capítulo 1', 
  cleanMarkdown(extract('### 7. Síntese do Capítulo e Transição', '## Capítulo 2: Bases Cognitivas')));

// Capítulo 2 (Pages 15 to 22)
const p15 = makePage(15, 'Capítulo 2', 'Cérebro-Total', 'Capítulo 2 • Tópico 1', 'Processamento Cérebro-Total e Hemisférios', 
  audioCap2Html + cleanMarkdown(extract('### 1. Processamento Cérebro-Total', '### 2. Potencialização da Memória')));

const p16 = makePage(16, 'Capítulo 2', 'Retenção & Memória', 'Capítulo 2 • Tópico 2', 'Potencialização da Memória de Longo Prazo', 
  cleanMarkdown(extract('### 2. Potencialização da Memória', '### 3. Aprendizagem Significativa')));

const p17 = makePage(17, 'Capítulo 2', 'Metacognição', 'Capítulo 2 • Tópico 3', 'Aprendizagem Significativa e Metacognição', 
  cleanMarkdown(extract('### 3. Aprendizagem Significativa', '### 4. A Tríade Mental-Verbal como Hábito')));

const p18 = makePage(18, 'Capítulo 2', 'Tríade Mental-Verbal', 'Capítulo 2 • Tópico 4', 'A Tríade Mental-Verbal e Microescrita', 
  cleanMarkdown(extract('### 4. A Tríade Mental-Verbal como Hábito', '### 5. A Barreira do Ensino Universitário')));

const p19 = makePage(19, 'Capítulo 2', 'Ensino Superior', 'Capítulo 2 • Tópico 5', 'A Fricção com o Ensino Universitário', 
  cleanMarkdown(extract('### 5. A Barreira do Ensino Universitário', '### 6. A "Barreira Mental" do Institucionalismo')));

const p20 = makePage(20, 'Capítulo 2', 'Além dos Muros', 'Capítulo 2 • Tópico 6', 'Educação Além dos Muros Institucionais', 
  cleanMarkdown(extract('### 6. A "Barreira Mental" do Institucionalismo', '### 8. Neurociência e Psicodinâmica das Cores')));

const p21 = makePage(21, 'Capítulo 2', 'Psicodinâmica das Cores', 'Capítulo 2 • Tópico 7', 'Neurociência e Cores na Aprendizagem', 
  cleanMarkdown(extract('### 8. Neurociência e Psicodinâmica das Cores', '### 9. O Mapa Mental no Ecossistema')));

const p22 = makePage(22, 'Capítulo 2', 'Aprendizagem Ativa', 'Capítulo 2 • Tópico 8', 'O Mapa Mental na Aprendizagem Ativa', 
  cleanMarkdown(extract('### 9. O Mapa Mental no Ecossistema', '## Capítulo 3: A Metodologia e as Regras de Elaboração')));

// Capítulo 3 (Pages 23 to 27)
const p23 = makePage(23, 'Capítulo 3', 'Leis de Construção', 'Capítulo 3 • Tópico 1', 'As Leis Mnemônicas de Buzan', 
  cleanMarkdown(extract('### 1. As Leis Mnemônicas de Buzan', '### 2. A Tríade Mental-Verbal: Epistemologia')));

const p24 = makePage(24, 'Capítulo 3', 'Tríade Mental-Verbal', 'Capítulo 3 • Tópico 2', 'Epistemologia e Princípios da Tríade', 
  cleanMarkdown(extract('### 2. A Tríade Mental-Verbal: Epistemologia', '### 3. Técnicas de Ideação Associadas')));

const p25 = makePage(25, 'Capítulo 3', 'Ideação & Criatividade', 'Capítulo 3 • Tópico 3', 'Brainstorming e Brainwriting Associados', 
  cleanMarkdown(extract('### 3. Técnicas de Ideação Associadas', '### 4. Conexões Metodológicas: A Sinergia')));

const p26 = makePage(26, 'Capítulo 3', 'Sinergia Metodológica', 'Capítulo 3 • Tópico 4', 'Conexões entre Mapa, Tríade e Aprendizagem', 
  cleanMarkdown(extract('### 4. Conexões Metodológicas: A Sinergia', '## Capítulo 4: Ferramentas Tecnológicas e Multiletramentos')));

// Capítulo 4 (Pages 27 to 30)
const p27 = makePage(27, 'Capítulo 4', 'Papel vs Software', 'Capítulo 4 • Tópico 1', 'Evolução Analógica e Digital: Papel vs. Software', 
  cleanMarkdown(extract('### 1. Evolução Analógica e Digital', '### 2. Mapas Mentais Interativos')));

const p28 = makePage(28, 'Capítulo 4', 'Mapas Interativos', 'Capítulo 4 • Tópico 2', 'Ambientes Dinâmicos de Aprendizagem', 
  cleanMarkdown(extract('### 2. Mapas Mentais Interativos', '### 3. O Mapa Digital como Hub')));

const p29 = makePage(29, 'Capítulo 4', 'Hub Digital', 'Capítulo 4 • Tópico 3', 'O Mapa Digital como Hub da Tríade Mental-Verbal', 
  cleanMarkdown(extract('### 3. O Mapa Digital como Hub', '## Capítulo 5: Aplicações Práticas e Estudos de Caso')));

// Capítulo 5 (Pages 30 to 33)
const p30 = makePage(30, 'Capítulo 5', 'Transdisciplinaridade', 'Capítulo 5 • Tópico 1', 'Aplicações no Ensino de Disciplinas', 
  cleanMarkdown(extract('### 1. No Ensino de Disciplinas', '### 2. Na Leitura Ativa, Produção Textual')));

const p31 = makePage(31, 'Capítulo 5', 'Produção Textual', 'Capítulo 5 • Tópico 2', 'Na Leitura Ativa e Produção de Textos', 
  cleanMarkdown(extract('### 2. Na Leitura Ativa, Produção Textual', '### 3. O Desafio do Alto Volume Acadêmico')));

const p32 = makePage(32, 'Capítulo 5', 'Volume Acadêmico', 'Capítulo 5 • Tópico 3', 'Filtragem Cognitiva do Alto Volume Acadêmico', 
  cleanMarkdown(extract('### 3. O Desafio do Alto Volume Acadêmico', '### 4. No Ambiente Corporativo')));

const p33 = makePage(33, 'Capítulo 5', 'Gestão & Negócios', 'Capítulo 5 • Tópico 4', 'No Ambiente Corporativo: Produtividade e Gestão', 
  cleanMarkdown(extract('### 4. No Ambiente Corporativo', '## Capítulo 6: Considerações Finais')));

// Capítulo 6 (Pages 34 to 36)
const p34 = makePage(34, 'Capítulo 6', 'Síntese da Metodologia', 'Capítulo 6 • Tópico 1', 'Considerações Finais da Autora', 
  cleanMarkdown(extract('## Capítulo 6: Considerações Finais', '### 1. Síntese Geral da Metodologia ESDHUBEM') + '\n\n' + extract('### 1. Síntese Geral da Metodologia ESDHUBEM', '### 2. O Futuro dos Multiletramentos')));

const quizHtml = `
          <div class="quiz-container" style="margin-top: 1.2rem;">
            <div class="quiz-question">
              🧠 Desafio ESDHUBEM: O que caracteriza a "Tríade Mental-Verbal" desenvolvida nesta obra?
            </div>
            <div class="quiz-options">
              <button class="quiz-opt" data-correct="false">
                <span>A)</span> Apenas desenhar mapas mentais sem necessidade de escrever ou falar.
              </button>
              <button class="quiz-opt" data-correct="true">
                <span>B)</span> O ciclo integrado: pensar visualmente, estruturar por escrito e expressar oralmente com autonomia.
              </button>
              <button class="quiz-opt" data-correct="false">
                <span>C)</span> A memorização mecânica de palavras-chave para provas formais.
              </button>
            </div>
          </div>
`;

const p35 = makePage(35, 'Capítulo 6', 'O Futuro da Educação', 'Capítulo 6 • Tópico 2', 'O Futuro dos Multiletramentos & Fixação', 
  cleanMarkdown(extract('### 2. O Futuro dos Multiletramentos', '## Referências Bibliográficas')) + quizHtml);

// Referências (Pages 36 & 37)
const p36 = makePage(36, 'Referências', 'Bibliografia • Parte 1', 'Fundamentação Teórica', 'Obras Clássicas Internacionais', 
  `<ul class="ref-list" style="font-size: 0.82rem; line-height: 1.5; padding-left: 1rem; color: #443e39;">
    <li style="margin-bottom: 0.6rem;"><strong>AUSUBEL, David P.</strong> <em>The Psychology of Meaningful Verbal Learning</em>. New York: Grune & Stratton, 1963.</li>
    <li style="margin-bottom: 0.6rem;"><strong>BUZAN, Tony.</strong> <em>The Mind Map Book: How to Use Radiant Thinking to Maximize Your Brain's Untapped Potential</em>. New York: Plume/Penguin, 1993.</li>
    <li style="margin-bottom: 0.6rem;"><strong>GARDNER, Howard.</strong> <em>Frames of Mind: The Theory of Multiple Intelligences</em>. New York: Basic Books, 1983.</li>
    <li style="margin-bottom: 0.6rem;"><strong>NOVAK, Joseph D.; GOWIN, D. Bob.</strong> <em>Learning How to Learn</em>. Cambridge: Cambridge University Press, 1984.</li>
    <li style="margin-bottom: 0.6rem;"><strong>SWEELLER, John.</strong> <em>Cognitive Load Theory</em>. Psychology of Learning and Motivation, 2011.</li>
  </ul>`);

const p37 = makePage(37, 'Referências', 'Bibliografia • Parte 2', 'Acervo Acadêmico', 'Autores Nacionais & Metodologia ESDHUBEM', 
  `<ul class="ref-list" style="font-size: 0.82rem; line-height: 1.5; padding-left: 1rem; color: #443e39;">
    <li style="margin-bottom: 0.6rem;"><strong>SILVÉRIO, Silviane.</strong> <em>Metodologia ESDHUBEM: Da Ideação à Expressão Autêntica</em>. São Paulo: ESDHUBEM Publicações, 2026.</li>
    <li style="margin-bottom: 0.6rem;"><strong>VYGOTSKY, Lev S.</strong> <em>A Formação Social da Mente</em>. São Paulo: Martins Fontes, 1998.</li>
    <li style="margin-bottom: 0.6rem;"><strong>FREIRE, Paulo.</strong> <em>Pedagogia da Autonomia: Saberes Necessários à Prática Educativa</em>. São Paulo: Paz e Terra, 1996.</li>
    <li style="margin-bottom: 0.6rem;"><strong>ROJO, Roxane.</strong> <em>Multiletramentos na Escola</em>. São Paulo: Parábola Editorial, 2012.</li>
  </ul>
  <div style="background: rgba(197, 160, 89, 0.12); border-left: 3px solid var(--primary); padding: 0.8rem; border-radius: 4px; margin-top: 1rem; font-size: 0.82rem;">
    📚 <strong>Acervo Acadêmico ESDHUBEM:</strong> Esta bibliografia fundamenta os cursos regulares e os módulos de extensão disponíveis no portal da escola.
  </div>`);

// 38. Contracapa
const p38 = `
      <!-- PÁGINA 38: CONTRACAPA OFICIAL LUXUOSA -->
      <div class="page --cover" data-density="hard">
        <div class="cover-content">
          <div class="cover-badge">Parabéns pela Leitura Concluída!</div>
          <div class="cover-main">
            <h2 class="cover-title" style="font-size: 1.8rem;">
              ESDHUBEM
              <span style="font-size: 1.05rem; margin-top: 0.5rem;">Escola de Desenvolvimento Humano e Bem-Estar</span>
            </h2>
            <p class="cover-subtitle" style="margin-top: 1rem; line-height: 1.6;">
              Você concluiu esta obra autoral completa. Aplique as leis mnemônicas, construa seus próprios mapas e continue expandindo sua autonomia intelectual.
            </p>
          </div>
          <div style="background: rgba(197, 160, 89, 0.15); border: 1px dashed var(--primary); padding: 1.1rem; border-radius: 12px; margin: 1rem 0;">
            <p style="font-size: 0.88rem; color: #fff; font-family: var(--font-sans); margin-bottom: 0.3rem;">
              Acesse a plataforma de cursos e certificações da ESDHUBEM:
            </p>
            <a href="https://esdhubem.github.io/cursos/" target="_blank" style="color: var(--primary); font-weight: 700; text-decoration: none; font-size: 1rem; font-family: var(--font-sans); display: inline-block; padding: 0.3rem 0.8rem; background: rgba(0,0,0,0.3); border-radius: 6px;">
              👉 esdhubem.github.io/cursos
            </a>
          </div>
          <div class="cover-footer">
            ISBN: 978-65-00-12345-6 • © 2026 ESDHUBEM • Todos os direitos reservados.
          </div>
        </div>
      </div>
`;

const allPages = [
  p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
  p11, p12, p13, p14, p15, p16, p17, p18, p19, p20,
  p21, p22, p23, p24, p25, p26, p27, p28, p29, p30,
  p31, p32, p33, p34, p35, p36, p37, p38
].join('\n');

const fullHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>O Que é Mapa Mental? Para que pode servir? | ESDHUBEM E-books</title>
  
  <meta name="description" content="Obra Autoral de Silviane Silvério - Da Organização das Ideias à Escrita e à Expressão Oral: Uma Abordagem Prática da Metodologia ESDHUBEM.">
  <meta name="theme-color" content="#0F1A33">
  
  <link rel="manifest" href="manifest.json">
  <link rel="apple-touch-icon" href="assets/icons/apple-touch-icon.png">
  <link rel="icon" type="image/png" href="assets/icons/pwa-192x192.png">
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

  <!-- TOP HEADER -->
  <header class="app-header">
    <div class="brand-wrapper">
      <a href="index.html" class="btn-icon" title="Voltar à Biblioteca de Livros" style="text-decoration:none;">📚</a>
      <div class="brand-titles">
        <h1>ESDHUBEM</h1>
        <span>O Que é Mapa Mental? • Silviane Silvério</span>
      </div>
    </div>
    
    <div class="header-actions">
      <button id="btnQuickMenu" class="btn-icon" title="Sumário e Capítulos">📑</button>
      <button id="btnFontMinus" class="btn-icon" title="Diminuir Letra">A-</button>
      <button id="btnFontPlus" class="btn-icon" title="Aumentar Letra">A+</button>
      <button id="btnToggleSound" class="btn-icon" title="Som de folhear">🔊</button>
      <button id="btnFullscreen" class="btn-icon" title="Modo tela cheia">⛶</button>
      <button id="btnLockBook" class="btn-icon" title="Bloquear / Trocar Chave">🔒</button>
    </div>
  </header>

  <!-- MAIN BOOK STAGE -->
  <main class="book-stage">
    <div id="bookContainer" class="flip-book-container">
      ${allPages}
    </div>
  </main>

  <!-- BOTTOM READER DOCK -->
  <nav class="reader-dock">
    <button id="btnPrev" class="dock-btn" title="Página Anterior">◀</button>
    <input type="range" id="pageSlider" class="dock-slider" min="1" max="38" value="1">
    <span id="pageIndicator" class="dock-pages">1 / 38</span>
    <button id="btnNext" class="dock-btn" title="Próxima Página">▶</button>
  </nav>

  <!-- DRAWER / MENU LATERAL DE CAPÍTULOS -->
  <div id="drawerOverlay" class="drawer-overlay hidden">
    <div class="drawer-card">
      <div class="drawer-header">
        <h3>📑 Índice Rápido (38 Páginas)</h3>
        <button id="btnCloseDrawer" class="btn-icon">✕</button>
      </div>
      <div class="drawer-body">
        <ul class="drawer-toc-list">
          <li class="drawer-toc-item" data-target="0"><strong>Capa Oficial</strong></li>
          <li class="drawer-toc-item" data-target="1">Ficha Catalográfica & Apresentação</li>
          <li class="drawer-toc-item" data-target="2">Sumário Geral</li>
          <li class="drawer-toc-item" data-target="3">Introdução: Objeto de Estudo (Áudio)</li>
          <li class="drawer-toc-item" data-target="4">Introdução: Por que Estudar Mapas?</li>
          <li class="drawer-toc-item" data-target="5">Introdução: Aprendizagem Integrativa</li>
          <li class="drawer-toc-item" data-target="6">Introdução: Da Organização Linear à Visual</li>
          <li class="drawer-toc-item" data-target="7">Cap. 1: Criação da Técnica por Buzan</li>
          <li class="drawer-toc-item" data-target="8">Cap. 1: Pensamento Irradiante</li>
          <li class="drawer-toc-item" data-target="9">Cap. 1: As Analogias Orgânicas</li>
          <li class="drawer-toc-item" data-target="10">Cap. 1: Mapa Mental vs. Mapa Conceitual</li>
          <li class="drawer-toc-item" data-target="11">Cap. 1: Integração Buzan e Novak</li>
          <li class="drawer-toc-item" data-target="12">Cap. 1: Ecossistema de Estudos</li>
          <li class="drawer-toc-item" data-target="13">Cap. 1: Síntese e Transição</li>
          <li class="drawer-toc-item" data-target="14">Cap. 2: Cérebro-Total & Hemisférios (Áudio)</li>
          <li class="drawer-toc-item" data-target="15">Cap. 2: Memória de Longo Prazo</li>
          <li class="drawer-toc-item" data-target="16">Cap. 2: Aprendizagem e Metacognição</li>
          <li class="drawer-toc-item" data-target="17">Cap. 2: A Tríade Mental-Verbal</li>
          <li class="drawer-toc-item" data-target="18">Cap. 2: A Fricção no Ensino Universitário</li>
          <li class="drawer-toc-item" data-target="19">Cap. 2: Educação Além dos Muros</li>
          <li class="drawer-toc-item" data-target="20">Cap. 2: Psicodinâmica das Cores</li>
          <li class="drawer-toc-item" data-target="21">Cap. 2: O Mapa na Aprendizagem Ativa</li>
          <li class="drawer-toc-item" data-target="22">Cap. 3: As Leis Mnemônicas de Buzan</li>
          <li class="drawer-toc-item" data-target="23">Cap. 3: Epistemologia da Tríade</li>
          <li class="drawer-toc-item" data-target="24">Cap. 3: Brainstorming e Ideação</li>
          <li class="drawer-toc-item" data-target="25">Cap. 3: Conexões Metodológicas</li>
          <li class="drawer-toc-item" data-target="26">Cap. 4: Papel vs. Software</li>
          <li class="drawer-toc-item" data-target="27">Cap. 4: Mapas Interativos Dinâmicos</li>
          <li class="drawer-toc-item" data-target="28">Cap. 4: O Mapa como Hub Digital</li>
          <li class="drawer-toc-item" data-target="29">Cap. 5: No Ensino de Disciplinas</li>
          <li class="drawer-toc-item" data-target="30">Cap. 5: Leitura Ativa e Produção Textual</li>
          <li class="drawer-toc-item" data-target="31">Cap. 5: Filtragem do Alto Volume Acadêmico</li>
          <li class="drawer-toc-item" data-target="32">Cap. 5: No Ambiente Corporativo</li>
          <li class="drawer-toc-item" data-target="33">Cap. 6: Considerações Finais da Autora</li>
          <li class="drawer-toc-item" data-target="34">Cap. 6: O Futuro dos Multiletramentos & Quiz</li>
          <li class="drawer-toc-item" data-target="35">Referências: Obras Internacionais</li>
          <li class="drawer-toc-item" data-target="36">Referências: Autores Nacionais & Acervo</li>
          <li class="drawer-toc-item" data-target="37">Contracapa & Certificado</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- ACCESS GATE OVERLAY -->
  <div id="accessOverlay" class="access-modal-overlay">
    <div class="access-card">
      <div class="access-badge">🔒 Livro Autoral Protegido</div>
      <img src="assets/images/logo-cursos.png" alt="ESDHUBEM" class="access-logo" onerror="this.src='assets/icons/pwa-192x192.png'">
      <h2 class="access-title">Biblioteca ESDHUBEM</h2>
      <p class="access-desc">
        Bem-vindo(a) à obra <strong>"O que é Mapa Mental? Para que pode servir?"</strong> de Silviane Silvério. Digite sua <strong>Chave de Acesso</strong> para liberar este e-book:
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
        <button type="submit" class="btn-unlock">🔓 Desbloquear e Ler Agora</button>
        <span id="accessError" class="error-message">⚠️ Código não encontrado ou inválido. Tente novamente!</span>
      </form>

      <div class="access-hints">
        <p>Chaves de demonstração para teste:</p>
        <div class="demo-keys">
          <span class="chip-key">ESDHUBEM-VIP</span>
          <span class="chip-key">LIVRO-2026</span>
          <span class="chip-key">DEMO</span>
        </div>
        <p style="margin-top: 0.8rem; font-size: 0.75rem;">
          Adquiriu na Hotmart, Kiwify ou WhatsApp? <br>
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

fs.writeFileSync(path.join(__dirname, '..', 'o-que-e-mapa-mental.html'), fullHtml, 'utf8');
console.log('Successfully generated o-que-e-mapa-mental.html with 38 rich conceptual pages!');

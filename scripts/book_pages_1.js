const fs = require('fs');
const path = require('path');
const { md, extractBetween, mdToHtml } = require('./book_helpers');

const p1_cover = `
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

const p2_ficha = `
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

const p3_toc = `
      <div class="page">
        <div class="page-header">
          <span>Sumário Interativo</span>
          <span>Navegação Rápida</span>
        </div>
        <div class="page-body">
          <div class="chapter-badge">Índice Geral</div>
          <h2 class="page-heading">Arquitetura da Obra</h2>
          <p class="page-text" style="font-size: 0.88rem; color: #555;">Toque em qualquer capítulo para abrir diretamente:</p>
          <ul class="toc-list">
            <li class="toc-item" data-target="3">
              <span class="toc-title">Introdução Geral: A Aprendizagem Integrativa</span>
              <span class="toc-page">Pág. 04</span>
            </li>
            <li class="toc-item" data-target="4">
              <span class="toc-title">Capítulo 1: Fundamentos, Origens e Epistemologia</span>
              <span class="toc-page">Pág. 05</span>
            </li>
            <li class="toc-item" data-target="5">
              <span class="toc-title">Capítulo 2: Bases Cognitivas, Memória e Metacognição</span>
              <span class="toc-page">Pág. 06</span>
            </li>
            <li class="toc-item" data-target="6">
              <span class="toc-title">Capítulo 3: Metodologia e Regras de Elaboração</span>
              <span class="toc-page">Pág. 07</span>
            </li>
            <li class="toc-item" data-target="7">
              <span class="toc-title">Capítulo 4: Ferramentas Tecnológicas e Multiletramentos</span>
              <span class="toc-page">Pág. 08</span>
            </li>
            <li class="toc-item" data-target="8">
              <span class="toc-title">Capítulo 5: Aplicações Práticas e Estudos de Caso</span>
              <span class="toc-page">Pág. 09</span>
            </li>
            <li class="toc-item" data-target="9">
              <span class="toc-title">Capítulo 6: Considerações Finais & Desafio de Fixação</span>
              <span class="toc-page">Pág. 10</span>
            </li>
            <li class="toc-item" data-target="10">
              <span class="toc-title">Referências Bibliográficas & Certificado</span>
              <span class="toc-page">Pág. 11</span>
            </li>
          </ul>
          <div class="callout-box" style="margin-top: 1rem; font-size: 0.85rem;">
            💡 <strong>Dica de Interatividade:</strong> Você pode navegar pelos capítulos pelo sumário, pelas setas ou arrastando a ponta da folha com o dedo ou mouse.
          </div>
        </div>
        <div class="page-footer">
          <span>Sumário</span>
          <span>Pág. 03</span>
        </div>
      </div>
`;

module.exports = { p1_cover, p2_ficha, p3_toc };

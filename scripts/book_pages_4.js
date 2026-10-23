const p10_cap6 = `
      <div class="page">
        <div class="page-header">
          <span>Capítulo 6</span>
          <span>Síntese & Fixação</span>
        </div>
        <div class="page-body">
          <div class="chapter-badge">Capítulo 6 • Síntese Cognitiva</div>
          <h2 class="page-heading">Considerações Finais e Autoavaliação</h2>

          <p class="page-text first-letter">
            Ao percorrer as páginas deste livro, compreendemos que o mapa mental não é um mero arranjo decorativo de canetas coloridas, mas um profundo instrumento de liberdade cognitiva e autoria pessoal.
          </p>

          <!-- QUIZ INTERATIVO NA FOLHA -->
          <div class="quiz-container">
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

          <blockquote class="callout-box" style="margin-top: 1rem;">
            "O conhecimento que transforma não é aquele que se deposita na gaveta, mas aquele que se irradia em ação e clareza de vida."<br>
            — <strong>Silviane Silvério</strong>
          </blockquote>
        </div>
        <div class="page-footer">
          <span>Capítulo 6 • Conclusão</span>
          <span>Pág. 10</span>
        </div>
      </div>
`;

const p11_refs = `
      <div class="page">
        <div class="page-header">
          <span>Referências</span>
          <span>Fundamentação Teórica</span>
        </div>
        <div class="page-body">
          <div class="chapter-badge">Bibliografia</div>
          <h2 class="page-heading">Obras Fundamentais</h2>
          
          <ul class="ref-list" style="font-size: 0.82rem; line-height: 1.5; padding-left: 1rem; color: #443e39;">
            <li style="margin-bottom: 0.6rem;"><strong>AUSUBEL, David P.</strong> <em>The Psychology of Meaningful Verbal Learning</em>. New York: Grune & Stratton, 1963.</li>
            <li style="margin-bottom: 0.6rem;"><strong>BUZAN, Tony.</strong> <em>The Mind Map Book: How to Use Radiant Thinking to Maximize Your Brain's Untapped Potential</em>. New York: Plume/Penguin, 1993.</li>
            <li style="margin-bottom: 0.6rem;"><strong>GARDNER, Howard.</strong> <em>Frames of Mind: The Theory of Multiple Intelligences</em>. New York: Basic Books, 1983.</li>
            <li style="margin-bottom: 0.6rem;"><strong>NOVAK, Joseph D.; GOWIN, D. Bob.</strong> <em>Learning How to Learn</em>. Cambridge: Cambridge University Press, 1984.</li>
            <li style="margin-bottom: 0.6rem;"><strong>SILVÉRIO, Silviane.</strong> <em>Metodologia ESDHUBEM: Da Ideação à Expressão Autêntica</em>. São Paulo: ESDHUBEM Publicações, 2026.</li>
            <li style="margin-bottom: 0.6rem;"><strong>VYGOTSKY, Lev S.</strong> <em>A Formação Social da Mente</em>. São Paulo: Martins Fontes, 1998.</li>
          </ul>

          <div style="background: rgba(197, 160, 89, 0.12); border-left: 3px solid var(--primary); padding: 0.8rem; border-radius: 4px; margin-top: 1rem; font-size: 0.82rem;">
            📚 <strong>Acervo Acadêmico ESDHUBEM:</strong> Esta bibliografia fundamenta os cursos regulares e os módulos de extensão disponíveis no portal da escola.
          </div>
        </div>
        <div class="page-footer">
          <span>Referências</span>
          <span>Pág. 11</span>
        </div>
      </div>
`;

const p12_backcover = `
      <div class="page --cover" data-density="hard">
        <div class="cover-content">
          <div class="cover-badge">Parabéns pela Leitura Concluída!</div>
          
          <div class="cover-main">
            <h2 class="cover-title" style="font-size: 1.8rem;">
              ESDHUBEM
              <span style="font-size: 1.05rem; margin-top: 0.5rem;">Escola de Desenvolvimento Humano e Bem-Estar</span>
            </h2>
            <p class="cover-subtitle" style="margin-top: 1rem; line-height: 1.6;">
              Você concluiu este e-book multimídia interativo. Aplique as leis mnemônicas, construa seus próprios mapas e continue expandindo sua autonomia intelectual.
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

module.exports = { p10_cap6, p11_refs, p12_backcover };

const fs = require('fs');
const path = require('path');

const md = fs.readFileSync(path.join(__dirname, '..', 'livro-mapas-mentais.md'), 'utf8');

function formatMarkdown(text) {
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

function extractSection(startHeader, endHeader) {
  const s = md.indexOf(startHeader);
  if (s === -1) return '';
  const startContent = s + startHeader.length;
  const e = endHeader ? md.indexOf(endHeader, startContent) : md.length;
  return md.substring(startContent, e !== -1 ? e : md.length).trim();
}

console.log('Script helper ready');

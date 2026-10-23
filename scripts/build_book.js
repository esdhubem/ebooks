const fs = require('fs');
const path = require('path');

const mdPath = path.join(__dirname, 'livro-mapas-mentais.md');
const text = fs.readFileSync(mdPath, 'utf8');

function markdownToHtml(md) {
  let html = md
    .replace(/^### (.*$)/gim, '<h3 class="section-title">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="chapter-title">$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^> (.*$)/gim, '<blockquote class="callout-box">$1</blockquote>');

  // Convert paragraphs
  const paragraphs = html.split(/\n\s*\n/);
  return paragraphs.map(p => {
    p = p.trim();
    if (!p) return '';
    if (p.startsWith('<h') || p.startsWith('<blockquote') || p.startsWith('<ul') || p.startsWith('<div')) {
      return p;
    }
    if (p.startsWith('- ') || p.startsWith('* ')) {
      const items = p.split('\n').map(i => `<li>${i.replace(/^[-*]\s*/, '')}</li>`).join('');
      return `<ul class="page-list">${items}</ul>`;
    }
    return `<p class="page-text">${p.replace(/\n/g, '<br>')}</p>`;
  }).join('\n');
}

function extractBetween(str, start, end) {
  const s = str.indexOf(start);
  if (s === -1) return '';
  const e = end ? str.indexOf(end, s + start.length) : str.length;
  return str.substring(s + start.length, e !== -1 ? e : str.length).trim();
}

console.log('Building interactive book...');

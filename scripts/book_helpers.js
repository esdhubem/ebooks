const fs = require('fs');
const path = require('path');

const md = fs.readFileSync(path.join(__dirname, 'livro-mapas-mentais.md'), 'utf8');

function extractBetween(str, start, end) {
  const s = str.indexOf(start);
  if (s === -1) return '';
  const startContent = s + start.length;
  const e = end ? str.indexOf(end, startContent) : str.length;
  return str.substring(startContent, e !== -1 ? e : str.length).trim();
}

function mdToHtml(text) {
  return text
    .replace(/^### (.*$)/gim, '<h4 class="section-heading">$1</h4>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^> (.*$)/gim, '<blockquote class="callout-box">$1</blockquote>')
    .split(/\n\s*\n/)
    .map(p => {
      p = p.trim();
      if (!p) return '';
      if (p.startsWith('<h') || p.startsWith('<blockquote') || p.startsWith('<ul') || p.startsWith('<div')) return p;
      if (p.startsWith('- ') || p.startsWith('* ')) {
        const items = p.split('\n').map(i => `<li>${i.replace(/^[-*]\s*/, '')}</li>`).join('');
        return `<ul class="method-rules-list">${items}</ul>`;
      }
      return `<p class="page-text">${p.replace(/\n/g, ' ')}</p>`;
    }).join('\n');
}

module.exports = { md, extractBetween, mdToHtml };

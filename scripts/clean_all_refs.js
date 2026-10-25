const fs = require('fs');

let html = fs.readFileSync('o-que-e-mapa-mental.html', 'utf8');

// 1. Replace <sup class="citation-ref">[...]</sup> back to simple [...]
// User request: "AS REFERENICIAS DOS LIVROS E ARTIGO APARECE ESTRANHO ERA PARA SER APENAS [1] POR EXEMPLO"
html = html.replace(/<sup class="citation-ref">\[(.*?)\]<\/sup>/g, '[$1]');

// 2. Fix any remaining \ [1\] or \[1\] or escaped brackets
html = html.replace(/\\\s*\[(.*?)\]/g, '[$1]');
html = html.replace(/\[(.*?)\\\s*\]/g, '[$1]');
html = html.replace(/\\\[(.*?)\\\]/g, '[$1]');

// 3. Clean stray backslashes from markdown conversion
// \--\> or \---> or \-\-> to -->
html = html.replace(/\\--\\>/g, '-->');
html = html.replace(/\\---\\>/g, '--->');
html = html.replace(/\\-\\>/g, '->');
html = html.replace(/\\\|/g, '|');
html = html.replace(/\\\+/g, '+');
html = html.replace(/\\<em>/g, '<em>');
html = html.replace(/\\<\/em>/g, '</em>');
html = html.replace(/\\<em>\\<\/em>/g, '');

// Clean any remaining backslashes before formatting tags or letters
html = html.replace(/\\([a-zA-Z0-9])/g, '$1');

// Clean any remaining single backslash
html = html.replace(/\\(?=[^\w\s])/g, '');

fs.writeFileSync('o-que-e-mapa-mental.html', html, 'utf8');
console.log('Cleaned all references to plain [1] and removed all stray backslashes!');

// Verify
const remainingBackslashes = (html.match(/\\/g) || []).length;
console.log('Remaining backslashes:', remainingBackslashes);

const citations = (html.match(/\[\d+(?:,\s*\d+)*\]/g) || []);
console.log('Total clean citations like [1], [1, 4, 6]:', citations.length);
console.log('First 5 clean citations:', citations.slice(0, 5));

const fs = require('fs');

let html = fs.readFileSync('o-que-e-mapa-mental.html', 'utf8');

// Ensure space after [number] when followed directly by letters in reference items
html = html.replace(/\[(\d+)\]([A-ZÁÉÍÓÚÂÊÔÃÕ])/g, '[$1] $2');

fs.writeFileSync('o-que-e-mapa-mental.html', html, 'utf8');
console.log('Fixed reference spacing!');

// Also fix in livro-mapas-mentais.md
let md = fs.readFileSync('livro-mapas-mentais.md', 'utf8');
md = md.replace(/\\\[/g, '[').replace(/\\\]/g, ']');
md = md.replace(/\\(\d+)\\\./g, '$1.');
md = md.replace(/\[(\d+)\]([A-ZÁÉÍÓÚÂÊÔÃÕ])/g, '[$1] $2');
md = md.replace(/\\--\\>/g, '-->').replace(/\\---\\>/g, '--->').replace(/\\-\\>/g, '->');
fs.writeFileSync('livro-mapas-mentais.md', md, 'utf8');
console.log('Also synced livro-mapas-mentais.md!');

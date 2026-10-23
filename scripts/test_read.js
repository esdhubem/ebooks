const fs = require('fs');
const path = require('path');

const mdPath = path.join(__dirname, 'livro-mapas-mentais.md');
const text = fs.readFileSync(mdPath, 'utf8');

console.log('Read MD, length:', text.length);

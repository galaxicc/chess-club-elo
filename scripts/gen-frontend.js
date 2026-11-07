const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const escaped = html
  .replace(/\\/g, '\\\\')
  .replace(/`/g, '\\`')
  .replace(/\$\{/g, '\\${');
const out = `// Auto-generated from public/index.html. Run: npm run gen:frontend\nexport const HTML = \`${escaped}\`;\n`;
fs.writeFileSync('convex/frontend.ts', out);
console.log('wrote convex/frontend.ts');

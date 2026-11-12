const fs=require('node:fs'),assert=require('node:assert/strict');
const src=fs.readFileSync('src/index.html','utf8'),app=fs.readFileSync('src/app.js','utf8'),style=fs.readFileSync('src/theme/matrix.css','utf8');
for(const f of ['src/theme/tokens.css','src/theme/matrix.css','src/components/widgets.js','src/components/hud.js','src/modules/annual.js','src/modules/investments.js','src/utils/format.js'])assert(fs.existsSync(f),f);
for(const view of ['painel','historico','categorias','recorrencias','relatorios','anual','investimentos','ajustes'])assert(app.includes(`'${view}'`));
assert(src.includes('modules/annual.js')&&src.includes('modules/investments.js'));assert(style.includes('prefers-reduced-motion')&&style.includes('pointer:coarse'));
console.log('UI e estrutura modular: 18 verificações OK');

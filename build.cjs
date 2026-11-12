const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
fs.rmSync('dist',{recursive:true,force:true});fs.mkdirSync('dist',{recursive:true});
function check(dir){for(const d of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,d.name);if(d.isDirectory())check(f);else if(f.endsWith('.js'))new vm.Script(fs.readFileSync(f,'utf8'),{filename:f});}}
check('src');check('shared');fs.cpSync('src','dist',{recursive:true});fs.cpSync('shared','dist/shared',{recursive:true});
const p='dist/index.html';fs.writeFileSync(p,fs.readFileSync(p,'utf8').replaceAll('../shared/','shared/'));
console.log('Build Matrix HUD OK');

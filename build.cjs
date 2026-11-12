const fs=require('node:fs'),vm=require('node:vm');
fs.mkdirSync('dist',{recursive:true});
for(const name of ['app.js','domain.js','styles.css','index.html']){let s=fs.readFileSync('src/'+name,'utf8');if(name.endsWith('.js'))new vm.Script(s,{filename:name});if(name==='index.html')s=s.replaceAll('../shared/','shared/');fs.writeFileSync('dist/'+name,s);}
fs.cpSync('shared','dist/shared',{recursive:true});console.log('Build local Anderson OK');

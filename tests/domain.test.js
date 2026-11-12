// Testes do domínio puro. Execução: node tests/domain.test.js
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const ctx={};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname+'/../src/domain.js','utf8')+';this.api={interpreta,resumo,gastoCat,csv,addDias,hoje};',ctx);
const {interpreta,resumo,gastoCat,csv,addDias,hoje}=ctx.api;let n=0;const t=(nome,f)=>{f();n++;console.log('ok -',nome)};
t('interpreta saída com categoria',()=>{const r=interpreta('gastei 45 mercado hoje');assert.equal(r.valor,45);assert.equal(r.tipo,'out');assert.equal(r.cat,'Mercado')});
t('interpreta entrada',()=>{const r=interpreta('recebi 800 freela');assert.equal(r.tipo,'in');assert.equal(r.cat,'Renda');assert.equal(r.valor,800)});
t('valor com milhar e vírgula',()=>assert.equal(interpreta('paguei 1.200,50 aluguel').valor,1200.5));
t('sem valor retorna erro',()=>assert.ok(interpreta('mercado hoje').erro));
t('categoria desconhecida fica nula (pede correção)',()=>assert.equal(interpreta('comprei 30 coisas').cat,null));
t('ontem',()=>assert.equal(interpreta('uber 20 ontem').data,addDias(hoje(),-1)));
const S={tx:[{tipo:'in',valor:100,cat:'Renda',data:'2026-11-01'},{tipo:'out',valor:30,cat:'Mercado',data:'2026-11-02'},{tipo:'out',valor:99,cat:'Lazer',data:'2026-11-03',del:true}],rec:[{tipo:'out',valor:10,ok:false},{tipo:'in',valor:5,ok:false},{tipo:'out',valor:7,ok:true}]};
t('resumo ignora removidos e separa previsto',()=>{const r=resumo(S,'2026-11');assert.equal(r.e,100);assert.equal(r.s,30);assert.equal(r.saldo,70);assert.equal(r.pe,5);assert.equal(r.ps,10);assert.equal(r.prev,65)});
t('gastoCat',()=>assert.deepEqual({...gastoCat(S,'2026-11')},{Mercado:30}));
t('csv',()=>{const c=csv({tx:[{tipo:'out',desc:'A "b"',valor:1.5,cat:'Outros',data:'2026-11-01'}]});assert.equal(c.split('\n')[1],'2026-11-01;"A ""b""";Outros;saida;1,50')});
console.log(n+' testes passaram');

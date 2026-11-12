// Regressões: identidade dos lançamentos, recorrências por mês e HTML seguro.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const core=require('../shared/core.js');
const CR={...core,today:()=> '2026-11-12'};
const elems=new Map();
const el=id=>{if(!elems.has(id))elems.set(id,{id,innerHTML:'',value:'',focus(){}});return elems.get(id)};
let saved=null,alerts=[];
const canonical={
  txs:[{id:'a_alpha-1',type:'out',cents:2500,desc:'Exemplo',cat:'Transporte',date:'2026-10-10',st:'real',undone:false}],
  recs:[{id:'recX',type:'out',cents:4000,desc:'Assinatura',cat:'Contas',day:17,active:true,start:'2026-09',paidMonths:{}}],
  budgets:{},budgetMonths:{},customRules:[],alerts:{}
};
const CRLocal={load:()=>canonical,save:s=>{core.validate(s);saved=structuredClone(s)},mode:'personal',bind:()=>{}};
const ctx={CR,CRLocal,document:{getElementById:el,activeElement:null},window:{},scrollTo(){},alert:t=>alerts.push(t),confirm:()=>true,setTimeout(){}};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('src/domain.js','utf8')+'\n'+fs.readFileSync('src/app.js','utf8')+'\nthis.check={state:()=>S,view:()=>V,fromCanonical,asCanonical,changeMonth,conf,render,go,resumo,recPaga,recPendente,canonicalTx,orcs}',ctx);
const a=ctx.check;
let checks=0;const test=(name,fn)=>{fn();checks++;console.log('REGRESSÃO',checks,name)};

test('ID alfanumérico sobrevive conversão canônica e aparece seguro no histórico',()=>{
 assert.equal(a.state().tx[0].id,'alpha-1');
 assert.equal(a.asCanonical().txs[0].id,'a_alpha-1');
 a.go('historico');
 assert.match(el('hl').innerHTML,/rem\(&quot;alpha-1&quot;\)/);
});
test('previsão e confirmação se referem ao mês selecionado',()=>{
 a.changeMonth('2026-10');
 a.conf('recX');
 const s=a.state();
 const done=s.tx.find(t=>t.desc==='Assinatura');
 assert.equal(done.data,'2026-10-17');
 assert.equal(s.rec[0].paidMonths['2026-10'],done.id);
 assert.equal(a.resumo(s,'2026-10').s,65); // 25 reais já existentes + 40 recorrentes
 assert.equal(a.resumo(s,'2026-10').ps,0);
 a.changeMonth('2026-11');
 assert.equal(a.resumo(s,'2026-11').ps,40);
 assert.equal(a.recPaga(s,s.rec[0],'2026-11'),false);
});
test('remover lançamento pago restaura previsão sem inventar pagamento',()=>{
 const s=a.state();
 const payment=s.tx.find(t=>t.desc==='Assinatura');
 payment.del=true;
 assert.equal(a.recPaga(s,s.rec[0],'2026-10'),false);
 assert.equal(a.resumo(s,'2026-10').ps,40);
 payment.del=false;
});
test('não permite confirmar como realizado mês no futuro',()=>{
 a.changeMonth('2026-12');
 const before=a.state().tx.length;
 a.conf('recX');
 assert.equal(a.state().tx.length,before);
 assert(alerts.some(t=>t.includes('mês futuro')));
});
test('recorrência respeita mês inicial e final',()=>{
 const s={tx:[],rec:[{tipo:'out',valor:10,start:'2026-10',end:'2026-11',active:true}]};
 assert.equal(a.resumo(s,'2026-09').ps,0);
 assert.equal(a.resumo(s,'2026-10').ps,10);
 assert.equal(a.resumo(s,'2026-12').ps,0);
});
test('categoria não confiável aparece escapada no orçamento',()=>{
 const s=a.state();s.orc['<img src=x onerror=alert(1)>']=100;
 const html=a.orcs();
 assert(!html.includes('<img'));
 assert(html.includes('&lt;img'));
});
assert(saved&&saved.txs.every(t=>Number.isSafeInteger(t.cents)));
console.log(checks+' regressões OK');

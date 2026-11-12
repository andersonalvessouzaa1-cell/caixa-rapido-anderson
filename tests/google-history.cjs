const assert=require('node:assert/strict'),H=require('../shared/history.js'),CR=require('../shared/core.js');
const s={txs:[],recs:[],budgets:{}};
const a=H.pack(s,'','one','now'),b=H.pack({...s,budgets:{Mercado:100}},'one','two','then');
assert.deepEqual(H.read([a,b]).state.budgets,{Mercado:100});assert.equal(H.read([a,a,b]).revision,'two');
assert.throws(()=>H.read([a,H.pack(s,'','fork','then')]),/conflito/i);
assert.throws(()=>H.read([['evil','','now','1','{}']]),/inválid/i);
const big={...s,txs:Array.from({length:200},(_,i)=>({id:'a_'+i,type:'out',cents:10,date:'2026-11-11',desc:'x'.repeat(300),cat:'Mercado',st:'real'}))};assert(H.pack(big,'','large','now').length>5);assert.deepEqual(H.read([H.pack(big,'','large','now')]).state,big);
assert.equal(H.read([]).revision,'');assert.throws(()=>H.pack({bad:true},'','bad','now'));
console.log('7 grupos de histórico Google OK');
// Regression: Google append table detection shifted a legacy row two columns.
assert.equal(H.read([a,['','',...b]]).revision,'two');assert.equal(H.pack(s,'','new','now')[1],'root');
const c=H.pack(s,'two','three','now');assert.equal(H.read([a,c,['','',...b]]).revision,'three');

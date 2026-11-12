// Adaptador da interface Anderson para o domínio compartilhado em centavos.
const BRL=n=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(n);
const hoje=CR.today,addDias=CR.addDays;
const CATS=Object.fromEntries([...new Set(CR.rules.map(r=>r[1]).concat(['Renda','Outros','Sem categoria']))].map(c=>[c,true]));
function interpreta(raw){const r=CR.parse(raw,hoje(),typeof S!=='undefined'?S.customRules||[]:[]);return r.ok?{...r,valor:r.cents/100,tipo:r.type,cat:r.type==='in'&&['Recebimentos','Salário'].includes(r.cat)?'Renda':r.cat,data:r.date}: {erro:r.err.join(' ')};}
const mes=d=>d.slice(0,7),vivos=S=>S.tx.filter(t=>!t.del);
// Uma recorrência só está quitada no mês selecionado se o lançamento existir e não foi desfeito.
function recPaga(S,r,m){const id=r.paidMonths?.[m];if(id===true)return true;if(id===undefined||id===null||id===false)return false;return S.tx.some(t=>!t.del&&(t.st||'real')==='real'&&String(t.id)===String(id));}
function recPendente(S,r,m){return r.active!==false&&(!r.start||m>=r.start)&&(!r.end||m<=r.end)&&!recPaga(S,r,m);}

function canonicalTx(S){return S.tx.map((t,i)=>({id:'a_'+(t.id??i),type:t.tipo,cents:CR.money(String(t.valor)),desc:t.desc,cat:t.cat,date:t.data,st:t.st||'real',undone:!!t.del}));}
function resumo(S,m){const t=CR.totals(canonicalTx(S),m);let pe=t.fin,ps=t.fout;for(const r of S.rec||[]){if(!recPendente(S,r,m))continue;if(r.tipo==='in')pe+=CR.money(String(r.valor));else ps+=CR.money(String(r.valor));}return{e:t.inc/100,s:t.out/100,saldo:t.bal/100,pe:pe/100,ps:ps/100,prev:(t.bal+pe-ps)/100};}
function gastoCat(S,m){const out={};for(const t of canonicalTx(S))if(!t.undone&&t.type==='out'&&t.st==='real'&&mes(t.date)===m)out[t.cat]=(out[t.cat]||0)+t.cents;return Object.fromEntries(Object.entries(out).map(([k,v])=>[k,v/100]));}
function csv(S){return CR.csv(canonicalTx(S));}

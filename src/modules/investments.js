/* Investment portfolio calculation only; entered yields are lifetime estimates, NOT live prices. */
(function(root,factory){const api=factory();if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CRInvest=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const CLASSES=['Renda Fixa','Ações','FIIs','Cripto','Tesouro Direto','Reserva'];
function validatePosition(p){if(!p||typeof p.id!=='string'||!/^[A-Za-z0-9_.:-]{1,160}$/.test(p.id)||!CLASSES.includes(p.kind)||typeof p.name!=='string'||!p.name.trim()||p.name.length>80||!Number.isSafeInteger(p.invested)||p.invested<1||p.invested>999999999999||!Number.isSafeInteger(p.returnBps)||p.returnBps< -10000||p.returnBps>999900)return false;return true;}
function estimated(p){if(!validatePosition(p))throw Error('Posição de investimento inválida.');return Math.max(0,Math.round(p.invested*(1+p.returnBps/10000)));}
function summary(positions){const list=(positions||[]).map(p=>({...p,value:estimated(p)}));const invested=list.reduce((a,p)=>a+p.invested,0),value=list.reduce((a,p)=>a+p.value,0);const totals=Object.fromEntries(CLASSES.map(n=>[n,0]));for(const p of list)totals[p.kind]+=p.value;return{positions:list,invested,value,gain:value-invested,rate:invested?(value-invested)/invested*100:0,totals,shares:Object.fromEntries(CLASSES.map(n=>[n,value?totals[n]/value*100:0]))};}
function fromForm({id,kind,name,amount,percent},money){const cents=money(String(amount));const n=Number(String(percent).replace(',','.'));const bps=Math.round(n*100);const p={id,kind,name:String(name).trim(),invested:cents,returnBps:bps};if(!Number.isFinite(n)||!validatePosition(p))throw Error('Confira a classe, o nome, o valor e o retorno (-100% a 9999%).');return p;}
return{CLASSES,validatePosition,estimated,summary,fromForm};
});

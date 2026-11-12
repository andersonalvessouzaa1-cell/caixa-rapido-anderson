/* Annual expense model. No browser or storage dependencies. Amounts are cents. */
(function(root,factory){const api=factory();if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CRAnnual=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const NICHES=['Salão/Beleza','Internet/Assinaturas','Mercado/Alimentação','Serviços','Outros'];
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const contains=(s,terms)=>terms.some(t=>s.includes(t));
function niche(tx){const c=norm(tx.cat),d=norm(tx.desc),all=' '+c+' '+d+' ';
 if(contains(all,[' beleza ',' salao ',' manicure ',' cabelo ',' unha ',' barbearia ',' estetica ',' cosmetico ']))return NICHES[0];
 if(contains(all,[' assinaturas ',' assinatura ',' streaming ',' netflix ',' spotify ',' internet ',' wifi ',' telefone ',' celular ',' plano de dados ']))return NICHES[1];
 if(contains(all,[' mercado ',' supermercado ',' feira ',' alimentacao ',' restaurante ',' padaria ',' lanche ',' ifood ',' pizza ',' hortifruti ',' acougue ']))return NICHES[2];
 if(contains(all,[' servico ',' manutencao ',' reparo ',' eletricista ',' encanador ',' consultoria ',' prestador ',' profissional ']))return NICHES[3];
 return NICHES[4];
}
const validDate=d=>typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d)&&!Number.isNaN(Date.parse(d+'T00:00:00Z'))&&new Date(d+'T00:00:00Z').toISOString().slice(0,10)===d;
function calculate(transactions,year,today){if(!Number.isInteger(year)||year<2000||year>2100)throw Error('Ano inválido.');const todayYear=Number(today.slice(0,4));const cutoff=year<todayYear?`${year}-12-31`:year===todayYear?today:'0000-00-00';
 const records=(transactions||[]).filter(t=>t&&t.type==='out'&&t.st==='real'&&t.undone!==true&&Number.isSafeInteger(t.cents)&&t.cents>0&&validDate(t.date)&&t.date.slice(0,4)===String(year)&&t.date<=cutoff);
 const totals=Object.fromEntries(NICHES.map(n=>[n,0]));const months=Array(12).fill(0);const recurring=new Map();
 for(const tx of records){const n=niche(tx);totals[n]+=tx.cents;months[+tx.date.slice(5,7)-1]+=tx.cents;const k=norm(tx.desc);if(k){const entry=recurring.get(k)||{name:tx.desc,count:0,cents:0,niche:n,months:new Set()};entry.count++;entry.cents+=tx.cents;entry.months.add(tx.date.slice(0,7));recurring.set(k,entry);}}
 const sum=Object.values(totals).reduce((a,b)=>a+b,0);
 const services=[...recurring.values()].filter(e=>e.months.size>=2).sort((a,b)=>b.cents-a.cents).slice(0,6).map(e=>({name:e.name,count:e.count,cents:e.cents,niche:e.niche}));
 return{year,records,totals,sum,months,services,cutoff,shares:Object.fromEntries(NICHES.map(n=>[n,sum?totals[n]/sum*100:0]))};
}
return{NICHES,niche,calculate};
});

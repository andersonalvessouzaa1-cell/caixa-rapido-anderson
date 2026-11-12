/* Caixa Rápido: domínio compartilhado, sem DOM ou rede. */
(function(root){
'use strict';
const norm=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const pad=n=>String(n).padStart(2,'0');
const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const days=(y,m)=>new Date(Date.UTC(y,m,0)).getUTCDate();
const valid=d=>typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d)&&+d.slice(0,4)>=2000&&+d.slice(5,7)>=1&&+d.slice(5,7)<=12&&+d.slice(8)>=1&&+d.slice(8)<=days(+d.slice(0,4),+d.slice(5,7));
const addDays=(d,n)=>{const x=new Date(d+'T12:00:00Z');x.setUTCDate(x.getUTCDate()+n);return x.toISOString().slice(0,10)};
const clamp=(ym,d)=>ym+'-'+pad(Math.min(d,days(+ym.slice(0,4),+ym.slice(5,7))));
function money(raw){
 let s=String(raw).trim().replace(/^R\$\s*/i,'').replace(/\s+reais$/i,'');
 if(!s||!/^[0-9.,]+$/.test(s))return null;
 let whole,frac='';
 if(s.includes(',')){if(!/^(?:\d+|\d{1,3}(?:\.\d{3})+),\d{1,2}$/.test(s))return null;[whole,frac]=s.split(',');}
 else if(s.includes('.')){if(/^\d{1,3}(?:\.\d{3})+$/.test(s))whole=s;else if(/^\d+\.\d{1,2}$/.test(s))[whole,frac]=s.split('.');else return null;}
 else whole=s;
 const c=Number(whole.replace(/\./g,''))*100+Number(frac.padEnd(2,'0'));
 return Number.isSafeInteger(c)&&c<=999999999999?c:null;
}
const rules=[['out','Mercado',['mercado','supermercado','feira','hortifruti','acougue']],['out','Beleza',['salao','cabelo','unha','manicure','estetica']],['out','Transporte',['gasolina moto','gasolina','combustivel','uber','onibus','metro','transporte','estacionamento']],['out','Parcela/Financiamento',['parcela moto','parcela','financiamento']],['out','Lazer',['role','cinema','bar','jogo','show','lazer','viagem']],['out','Alimentação',['restaurante','padaria','lanche','ifood','pizza','cafe']],['out','Moradia',['aluguel','condominio','moradia']],['out','Contas',['internet','luz','agua','energia','telefone','contas']],['out','Saúde',['plano de saude','saude','farmacia','remedio','medico','consulta']],['out','Assinaturas',['netflix','spotify','streaming','assinatura']],['in','Vendas',['venda','vendi']],['in','Salário',['salario']],['in','Recebimentos',['recebi','reembolso','pix recebido','deposito','freela','renda']]];
function category(desc,type,custom=[]){const n=' '+norm(desc)+' ';let found='Sem categoria',score=0;for(const r of [...custom,...rules]){if(r[0]!==type)continue;for(const k of r[2]){const key=norm(k);if(key&&n.includes(' '+key+' ')&&key.length>score){found=r[1];score=key.length;}}}return found;}
function parse(raw,date=today(),custom=[]){
 const error=err=>({ok:false,err:[err]});let s=String(raw).trim();if(!s)return error('Digite descrição e valor, como salão 50.');
 let type;const sign=s.match(/^([+-])\s*/);if(sign){type=sign[1]==='+'?'in':'out';s=s.slice(sign[0].length);}
 let civil=date,count=0,bad=false,explicit=false;
 s=s.replace(/\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2}|\d{4}))?\b/g,(_,d,m,y)=>{count++;explicit=true;const year=y?(y.length===2?'20'+y:y):date.slice(0,4);civil=year+'-'+pad(+m)+'-'+pad(+d);if(!valid(civil))bad=true;return ' ';});
 s=s.replace(/\b(anteontem|ontem|hoje)\b/gi,(_,w)=>{count++;civil=addDays(date,w.toLowerCase()==='ontem'?-1:w.toLowerCase()==='anteontem'?-2:0);return ' ';});
 if(bad||count>1)return error('Informe uma única data válida (dia/mês).');
 const nums=[...s.matchAll(/\d[\d.,]*/g)];if(nums.length!==1)return error(nums.length?'Há mais de um número. Confirme o valor no formulário.':'Não encontrei valor. Exemplo: mercado 87,90.');
 const m=nums[0],cents=money(m[0]);if(!cents)return error('Informe um valor maior que zero com até duas casas decimais.');
 let desc=(s.slice(0,m.index)+' '+s.slice(m.index+m[0].length)).replace(/R\$|\breais\b/gi,' ').replace(/\s+/g,' ').trim();
 if(!desc||/^[+\-\s]+$/.test(desc))return error('Informe também a descrição.');
 const n=' '+norm(desc)+' ';type=type||(['recebi','recebido','venda','vendi','salario','ganhei','deposito','reembolso','entrada','renda','freela','pix recebido'].some(w=>n.includes(' '+w+' '))?'in':'out');
 desc=desc[0].toUpperCase()+desc.slice(1);const future=explicit&&civil>date;
 return{ok:true,err:[],type,cents,desc,date:civil,cat:category(desc,type,custom),future,confirm:cents>500000||future,textOriginal:String(raw)};
}
function forecasts(txs,recs,ym){const ids=new Set(txs.map(t=>t.id));for(const r of recs){if(!r.active||r.start&&ym<r.start||r.end&&ym>r.end)continue;const id=`p_${r.id}_${ym}`;if(ids.has(id))continue;txs.push({id,type:r.type,cents:r.cents,desc:r.desc,cat:r.cat,date:clamp(ym,r.day),scheduled:clamp(ym,r.day),st:'prev',undone:false,sync:'local',rec:r.id});ids.add(id);}return txs;}
function totals(txs,ym){let inc=0,out=0,fin=0,fout=0;const seen=new Set();for(const t of txs){if(t.undone||!t.date.startsWith(ym)||t.id&&seen.has(t.id))continue;if(t.id)seen.add(t.id);if(t.st==='prev'){if(t.type==='in')fin+=t.cents;else fout+=t.cents;}else if(t.type==='in')inc+=t.cents;else out+=t.cents;}return{inc,out,bal:inc-out,fin,fout};}
const cell=v=>{let s=String(v??'');if(/^[\s\x00-\x1f]*[=+@-]/.test(s)||/^[\t\r\n]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';};
function csv(txs){return '\ufeffdata;tipo;descricao;categoria;valor_brl;situacao\r\n'+[...txs].sort((a,b)=>a.date.localeCompare(b.date)).map(t=>[t.date,t.type==='in'?'entrada':'saida',t.desc,t.cat,(t.cents/100).toFixed(2).replace('.',','),t.undone?'desfeito':t.st==='prev'?'previsto':'realizado'].map(cell).join(';')).join('\r\n');}
function validate(s){
 if(!s||!Array.isArray(s.txs)||!Array.isArray(s.recs)||typeof s.budgets!=='object'||!s.budgets)throw Error('Estrutura de backup inválida.');
 const ids=new Set();for(const t of s.txs){if(!t||typeof t.id!=='string'||!/^[A-Za-z0-9_.:-]{1,160}$/.test(t.id)||ids.has(t.id)||!valid(t.date)||!['in','out'].includes(t.type)||!['prev','real'].includes(t.st)||!Number.isSafeInteger(t.cents)||t.cents<=0||t.cents>999999999999||typeof t.desc!=='string'||typeof t.cat!=='string'||t.desc.length>1000||t.cat.length>100)throw Error('Lançamento inválido ou ID repetido no backup.');ids.add(t.id);}
 for(const r of s.recs){if(!r||typeof r.id!=='string'||!/^[A-Za-z0-9_.:-]{1,160}$/.test(r.id)||!Number.isSafeInteger(r.cents)||r.cents<=0||!Number.isInteger(r.day)||r.day<1||r.day>31||!['in','out'].includes(r.type)||typeof r.desc!=='string'||typeof r.cat!=='string')throw Error('Recorrência inválida no backup.');}
 for(const b of [s.budgets,...Object.values(s.budgetMonths||{})]){if(!b||typeof b!=='object')throw Error('Orçamentos inválidos.');for(const v of Object.values(b))if(!Number.isSafeInteger(v)||v<0)throw Error('Limite inválido.');}
 if(s.customRules&&!s.customRules.every(r=>Array.isArray(r)&&['in','out'].includes(r[0])&&typeof r[1]==='string'&&Array.isArray(r[2])&&r[2].every(k=>typeof k==='string')))throw Error('Dicionário inválido.');
 return s;
}
const backup=(state,installation)=>({product:'caixa-rapido',version:1,installation,exportedAt:new Date().toISOString(),state:validate(state)});
function restore(text,id){if(text.length>10000000)throw Error('Arquivo maior que 10 MB.');const b=JSON.parse(text);if(b.product!=='caixa-rapido'||b.version!==1||b.installation!==id)throw Error('Backup de outra instalação ou versão incompatível.');return validate(b.state);}
const C={norm,today,days,valid,addDays,clamp,money,parse,category,rules,forecasts,totals,cell,csv,validate,backup,restore};
if(typeof module!=='undefined')module.exports=C;else root.CR=C;
})(typeof globalThis!=='undefined'?globalThis:this);

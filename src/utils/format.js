(function(root,factory){const api=factory();if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CRFormat=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';return{brlCents:c=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(c/100),pct:n=>new Intl.NumberFormat('pt-BR',{maximumFractionDigits:1,minimumFractionDigits:1}).format(n)+'%',escape:s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))};
});

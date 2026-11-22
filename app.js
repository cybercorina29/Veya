(()=>{'use strict';
const products=[
{id:'everyday',kind:'product',name:'Everyday Hygiene Cleaner',type:'Surface cleaning',batch:'500 ml',fragrance:'Warm Luxe',initial:'E',description:'The everyday VEYA surface-cleaning spray; a versatile base with a softly woody, citrus-led signature scent.',ingredients:[['Coco glucoside','3 tsp (15 ml)'],['Durosoft PG10CY-M','Just over ½ tsp'],['70% rubbing alcohol','15–20 tsp (75–100 ml)'],['Distilled water','Top up to 500 ml total']],method:['Combine the essential oils with Durosoft in a clean mixing vessel.','Stir in the rubbing alcohol, then gently incorporate coco glucoside.','Add distilled water to reach 500 ml total volume, stirring slowly to minimise foaming.','Transfer to a labelled spray bottle, note the batch date and shake gently before use.'],notes:'The original 125 ml alcohol batch smelled overly strong; the preferred version uses 75–100 ml. No baking soda or washing soda.',caution:'Routine cleaning only; not a validated disinfectant. Patch-test surfaces. Keep away from children and pets; especially avoid exposing cats to essential-oil sprays or wet treated surfaces. Never mix with bleach.'},
{id:'yogamat',kind:'product',name:'Yoga Mat Cleaner',type:'Yoga & wellness cleaning',batch:'500 ml',fragrance:'Namaspray',initial:'Y',description:'A lighter mat-wiping formulation, recorded separately from the everyday cleaner.',ingredients:[['Coco glucoside','½ tsp (2.5 ml)'],['Durosoft PG10CY-M','¼ tsp (1.25 ml)'],['70% rubbing alcohol','10 tsp (50 ml)'],['Distilled water','Top up to 500 ml total']],method:['Combine the fragrance oils with Durosoft in a clean mixing vessel.','Stir in 50 ml rubbing alcohol, then add coco glucoside gently.','Top up with distilled water to 500 ml total and mix slowly.','Transfer to a labelled spray bottle. Check mat manufacturer guidance, patch-test and wipe dry before using.'],notes:'A lighter formula than the everyday cleaner; distinct product base, not merely a different scent.',caution:'Alcohol and essential oils can damage some mat materials. Check manufacturer instructions, avoid inhaling spray and allow full drying. Not a disinfectant. Keep away from pets and children.'}
];
const fragrances=[
{id:'warm-luxe',kind:'fragrance',name:'Warm Luxe',family:'Soft citrus · warm woods',forProduct:'Everyday Hygiene Cleaner',description:'A soft bergamot opening on a warm, woody, quietly luxurious base.',ingredients:[['Bergamot','5 drops'],['Sandalwood','4 drops'],['Cedarwood','3 drops'],['Ho wood','2 drops'],['Vetiver','1 drop']],notes:'15 drops total. The established VEYA signature scent for the Everyday Hygiene Cleaner.'},
{id:'namaspray',kind:'fragrance',name:'Namaspray',family:'Botanical · grounding · fresh',forProduct:'Yoga Mat Cleaner',description:'A calm herbal-botanical accord with a gentle woody finish.',ingredients:[['Lavender','3 drops'],['Petitgrain','2 drops'],['Ho wood','2 drops'],['Cypress','1 drop'],['Sandalwood','1 drop'],['Vetiver','1 drop']],notes:'10 drops total. The fragrance accord for the lighter Yoga Mat Cleaner.'}
];

const KEY='veya.atelier.entries.v1';
const $=s=>document.querySelector(s);
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let extras=[];try{const v=JSON.parse(localStorage.getItem(KEY)||'[]');if(Array.isArray(v))extras=v.filter(x=>x&&['product','fragrance'].includes(x.kind))}catch{}
const all=k=>(k==='product'?products:fragrances).concat(extras.filter(x=>x.kind===k));
const rows=arr=>(Array.isArray(arr)?arr:[]).map(a=>'<div class="ingredient"><span>'+safe(a[0])+'</span><b>'+safe(a[1])+'</b></div>').join('')||'<p>No ingredients recorded.</p>';
const toast=s=>{const el=$('#toast');if(!el)return;el.textContent=s;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),3200)};
const entries=(kind)=>all(kind);
function showDetail(kind,id){
const x=entries(kind).find(item=>item.id===id);if(!x)return;
const isProduct=kind==='product',section=isProduct?'PRODUCT / BASE RECIPE':'FRAGRANCE / ESSENTIAL OILS';
let html='<div class="micro">'+section+'</div><h2>'+safe(x.name)+'<em>.</em></h2><p class="sub">'+safe(isProduct?(x.type||'Product')+' · '+(x.batch||'Batch to confirm'):(x.family||'Signature fragrance'))+'</p><p class="description">'+safe(x.description||'VEYA formulation.')+'</p>';
html+='<div class="detail-block"><h4>01 / '+(isProduct?'BASE INGREDIENTS':'ESSENTIAL OIL COMPOSITION')+'</h4>'+rows(x.ingredients)+'</div>';
if(isProduct){
html+='<div class="detail-block"><h4>02 / CHOOSE A FRAGRANCE</h4><p class="description">The base recipe above stays the same. Select a blend below to view the oil composition for this batch.</p><div class="recipe-select"><label for="blend-choice">FRAGRANCE BLEND</label><select id="blend-choice"><option value="">Select your fragrance…</option><option value="none">No added fragrance</option>'+entries('fragrance').map(f=>'<option value="'+safe(f.id)+'">'+safe(f.name)+(f.name.toLowerCase()===(x.fragrance||'').toLowerCase()?' · ORIGINAL PAIRING':'')+'</option>').join('')+'</select><div id="blend-result" class="blend-result" aria-live="polite"><p class="blend-placeholder">Choose a fragrance above to reveal its oils and measurements.</p></div></div></div>';
html+='<div class="detail-block"><h4>03 / THE METHOD</h4><ol class="steps">'+(Array.isArray(x.method)?x.method:[]).map(z=>'<li>'+safe(z)+'</li>').join('')+'</ol></div>';
}else html+='<div class="detail-block"><h4>02 / ORIGINALLY PAIRED WITH</h4><p>'+safe(x.forProduct||'An independent fragrance blend')+'</p></div>';
html+='<div class="detail-block"><h4>FORMULATION NOTES</h4><p class="description">'+safe(x.notes||'No notes yet.')+'</p></div><div class="caution"><b>CARE & SAFETY</b><p>'+safe(x.caution||'A personal blend record, not a tested or certified formulation. Check materials, skin sensitivity and pet safety before use; avoid exposing cats to essential oils.')+'</p></div>';
html+='<div class="dialog-actions"><button id="copy-recipe">COPY RECIPE ↗</button><button id="print-recipe">PRINT ↗</button></div>';
$('#detail-body').innerHTML=html;
const dialog=$('#detail');dialog.showModal();
let selected=null;
if(isProduct){
$('#blend-choice').addEventListener('change',e=>{
const id=e.target.value;selected=entries('fragrance').find(f=>f.id===id)||null;
$('#blend-result').innerHTML=id==='none'?'<p class="blend-placeholder">Unscented batch — no essential-oil drops to add.</p>':selected?'<h3>'+safe(selected.name)+'</h3><p>'+safe(selected.description||selected.family||'')+'</p>'+rows(selected.ingredients)+'<p class="notice">Fragrance entries are stored independently in the <a href="./fragrances.html"><u>Fragrance Library</u></a>.</p>':'<p class="blend-placeholder">Choose a fragrance above to reveal its oils and measurements.</p>';
});
}
$('#copy-recipe').onclick=()=>{
const out=[x.name,isProduct?x.type:x.family,x.description,'BASE / INGREDIENTS',...(Array.isArray(x.ingredients)?x.ingredients:[]).map(a=>a.join(' — '))];
if(isProduct)out.push('SELECTED FRAGRANCE',selected?selected.name:$('#blend-choice').value==='none'?'None':'Not selected',...(selected?selected.ingredients.map(a=>a.join(' — ')):[]),'METHOD',...(x.method||[]));
out.push('NOTES',x.notes||'','SAFETY',x.caution||'Personal formulation; safety not certified.');
navigator.clipboard.writeText(out.join('\n')).then(()=>toast('Recipe copied')).catch(()=>toast('Unable to access clipboard'));
};$('#print-recipe').onclick=()=>window.print();
}
function renderProducts(){
const items=entries('product');$('#product-count').textContent=String(items.length).padStart(2,'0')+' BASE RECIPES';
$('#product-cards').innerHTML=items.map((x,i)=>'<article class="product-card" role="button" tabindex="0" data-kind="product" data-id="'+safe(x.id)+'"><div class="topline"><span>PRODUCT / '+safe(x.type||'FORMULATION')+'</span><span>NO. '+String(i+1).padStart(3,'0')+'</span></div><div class="product-graphic '+(i%2?'sage':'')+'"><span>'+safe(x.initial||x.name[0])+'</span></div><div class="card-foot"><h3>'+safe(x.name)+'</h3><p>'+safe(x.description||'An original VEYA formulation.')+'</p><div class="card-base"><span>'+safe(x.batch||'BATCH TBC')+' · CHOOSE YOUR SCENT</span><span>VIEW RECIPE ↗</span></div></div></article>').join('');
}
function renderFragrances(){
const items=entries('fragrance');$('#fragrance-count').textContent=String(items.length).padStart(2,'0')+' FRAGRANCE BLENDS';
$('#fragrance-cards').innerHTML=items.map((x,i)=>'<article class="fragrance-card" role="button" tabindex="0" data-kind="fragrance" data-id="'+safe(x.id)+'"><div class="topline"><span>FRAGRANCE / BLEND NO. '+String(i+1).padStart(3,'0')+'</span><span>↗</span></div><div class="swatch '+(i%2?'green':'')+'"></div><div><h3>'+safe(x.name)+'</h3><p>'+safe(x.family||x.description||'Original essential-oil composition')+'</p></div><div class="bottom"><span>'+safe(x.forProduct?'ORIGINAL PAIRING: '+x.forProduct:'INDEPENDENT BLEND')+'</span><span>VIEW BLEND ↗</span></div></article>').join('');
}
const page=document.body.dataset.page;
if(page==='products')renderProducts();if(page==='fragrances')renderFragrances();
document.querySelectorAll('[data-id][data-kind]').forEach(el=>{const open=()=>showDetail(el.dataset.kind,el.dataset.id);el.addEventListener('click',open);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}})});
document.querySelectorAll('dialog .close').forEach(b=>b.onclick=()=>b.closest('dialog').close());
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d)d.close()}));
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}))}
let pendingInstall=null;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();pendingInstall=e;$('#install-veya').classList.add('visible')});
$('#install-veya').addEventListener('click',async()=>{if(!pendingInstall)return;pendingInstall.prompt();await pendingInstall.userChoice;pendingInstall=null;$('#install-veya').classList.remove('visible')});
window.addEventListener('appinstalled',()=>$('#install-veya').classList.remove('visible'));
})();
const chapters = window.CURRICULUM;
const $ = (q,root=document)=>root.querySelector(q);
const $$ = (q,root=document)=>[...root.querySelectorAll(q)];
const escapeHTML = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let chapterIndex=0, tabName='learn';
let completed = new Set();
try { completed = new Set(JSON.parse(localStorage.getItem('fa-lab-completed')||'[]')); } catch (_) {}

function typeset(root){
  if(typeof renderMathInElement!=='function') return;
  renderMathInElement(root,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],throwOnError:false,errorColor:'#b23d32'});
}
function section(label,title){return `<div class="block-heading"><span class="section-label">${label}</span><h2>${title}</h2></div>`}
function nav(){
  $('#chapter-nav').innerHTML=chapters.map((c,i)=>`<button class="chapter-link ${i===chapterIndex?'active':''}" type="button" data-chapter="${i}" ${i===chapterIndex?'aria-current="page"':''}><span class="chapter-number">${String(i+1).padStart(2,'0')}</span><span class="chapter-name">${escapeHTML(c.short)}</span><span class="chapter-check">${completed.has(i)?'✓':''}</span></button>`).join('');
  $('#progress-count').textContent=`${completed.size} / ${chapters.length}`;
  $('#progress-bar').style.width=`${completed.size/chapters.length*100}%`;
  $$('.chapter-link').forEach(button=>button.addEventListener('click',()=>{
    chapterIndex=Number(button.dataset.chapter);tabName='learn';render();window.scrollTo({top:0,behavior:'smooth'});$('.sidebar').classList.remove('open');$('#mobile-menu').setAttribute('aria-expanded','false');
  }));
}
function hero(){
  const c=chapters[chapterIndex];
  $('#chapter-header').innerHTML=`<section class="chapter-hero"><img class="hero-art" src="assets/study-companions.webp" alt="" loading="eager"><div class="hero-copy"><div class="eyebrow">CHAPTER ${String(chapterIndex+1).padStart(2,'0')} · ${escapeHTML(c.source)}</div><h1>${escapeHTML(c.title)}</h1><p>${escapeHTML(c.idea)}</p><div class="hero-foot">${c.tags.map(tag=>`<span>${escapeHTML(tag)}</span>`).join('')}</div></div></section>`;
}
function theoremCard(t,i){return `<article class="theorem-card tone-${i%4}"><div class="theorem-top"><span class="panel-number">${String(i+1).padStart(2,'0')}</span><span class="theorem-label">THEOREM / DEFINITION</span></div><h3>${escapeHTML(t.name)}</h3><p class="assumptions"><strong>Assumptions</strong><br>${escapeHTML(t.assumptions)}</p><div class="formula-display">${escapeHTML(t.formula)}</div><p class="meaning">${escapeHTML(t.meaning)}</p><details><summary>Why this is true</summary><p>${escapeHTML(t.proof)}</p></details></article>`}
function exampleCard(e,i){return `<article class="example-card"><div class="example-count">WORKED EXAMPLE ${String(i+1).padStart(2,'0')}</div><h3>${escapeHTML(e.title)}</h3><p class="task">${escapeHTML(e.task)}</p><details><summary>Reveal the proof</summary><ol>${e.steps.map(step=>`<li>${escapeHTML(step)}</li>`).join('')}</ol></details></article>`}
function learn(){const c=chapters[chapterIndex];return `<div class="intro-ribbon"><span class="intro-icon">✦</span><p>${escapeHTML(c.overview)}</p></div>${section('01 · THE IDEAS','Precise statements')}<p class="section-intro">Read the assumptions first. Open “Why this is true” when you are ready to connect the theorem to a proof.</p><div class="theorem-grid">${c.theorems.map(theoremCard).join('')}</div>${section('02 · TRY IT','Interactive model')}${lab(c.lab)}${section('03 · FOLLOW A PROOF','Worked examples')}${c.examples.map(exampleCard).join('')}<button type="button" class="mark-btn ${completed.has(chapterIndex)?'done':''}" id="mark-complete">${completed.has(chapterIndex)?'✓ Chapter complete':'Mark chapter complete'}</button>`}
function recipeResult(i){const r=chapters[chapterIndex].recipes[i];return `<h3>${escapeHTML(r.goal)}</h3><ol>${r.steps.map(s=>`<li>${escapeHTML(s)}</li>`).join('')}</ol><p class="trap"><strong>Common mistake</strong> ${escapeHTML(r.trap)}</p>`}
function solve(){const c=chapters[chapterIndex];return `<div class="intro-ribbon"><span class="intro-icon">?</span><p>Start from what the task asks you to prove. Check every theorem hypothesis before writing its conclusion.</p></div>${section('CHOOSE A ROUTE','What is your task?')}<div class="solver-card"><div class="solver-options">${c.recipes.map((r,i)=>`<button type="button" data-recipe="${i}" class="solver-choice ${i===0?'active':''}">${escapeHTML(r.goal)}</button>`).join('')}</div><div class="solver-output" id="solver-output">${recipeResult(0)}</div></div><div class="tip-card"><strong>Proof template</strong><p>Write the space and norm. State the theorem with its exact hypotheses. Verify each hypothesis in this problem. Then translate the conclusion into the estimate or limit you need.</p></div>`}
function practice(){const c=chapters[chapterIndex];return `<div class="intro-ribbon"><span class="intro-icon">✓</span><p>Answer each question, then read the explanation. The goal is to recognize the decisive assumption, not memorize a theorem name.</p></div>${section('CHECK YOURSELF','Three quick questions')}${c.quiz.map((q,i)=>`<article class="exercise-card" data-question="${i}"><div class="example-count">QUESTION ${i+1} / ${c.quiz.length}</div><h3>${escapeHTML(q.q)}</h3><div class="choices">${q.choices.map((choice,j)=>`<button type="button" class="choice" data-choice="${j}">${escapeHTML(choice)}</button>`).join('')}</div><div class="feedback" role="status"></div></article>`).join('')}`}
const sources=[
  ['Lecture 01 · Finite-Dimensional Preliminaries','lecture_01_finite_dimensional_preliminaries.pdf','Norms, equivalent norms, compactness, operators, duals, and Riesz lemma.'],
  ['Lecture 02 · Banach Spaces and Baire','lecture_02_banach_spaces_and_baire.pdf','Completeness, function and sequence spaces, Neumann series, and Baire.'],
  ['Lecture 03 · Hahn–Banach and Duality','lecture_03_hahn_banach_and_duality.pdf','Extensions, norming functionals, bidual, and separation.'],
  ['Supplement · Dual and Bidual','lecture_03_supplement_dual_and_bidual.pdf','Dual basis and canonical evaluation.'],
  ['Lecture 04 · Operator Theorems','lecture_04_uniform_boundedness_open_mapping_closed_graph.pdf','Uniform boundedness, open mapping, bounded inverse, and closed graph.'],
  ['Lecture 05 · Weak Topologies','lecture_05_weak_and_weak_star_topologies.pdf','Weak convergence, Banach–Alaoglu, separability, and reflexivity.']
];
function sourcePage(){const c=chapters[chapterIndex];return `<div class="intro-ribbon"><span class="intro-icon">⌁</span><p>These lessons follow the lecture documents listed below. The formal statements are paraphrased, with hypotheses written out. Refer to your course copies for the original proofs.</p></div><div class="tip-card"><strong>For this chapter</strong><p>${escapeHTML(c.source)}, pages ${escapeHTML(c.pages)}.</p></div>${section('ORIGINAL MATERIALS','Your lecture map')}<div class="source-grid">${sources.map(([title,,description])=>`<article class="source-card"><h3>${escapeHTML(title)}</h3><p>${escapeHTML(description)}</p><p class="source-note">Consult your course PDF for the original lecture.</p></article>`).join('')}</div>`}

function render(){
  nav();hero();
  $$('.tab').forEach(button=>{const on=button.dataset.tab===tabName;button.classList.toggle('active',on);button.setAttribute('aria-selected',String(on))});
  $('#panel').innerHTML=tabName==='learn'?learn():tabName==='solve'?solve():tabName==='practice'?practice():sourcePage();
  typeset($('#chapter-header'));typeset($('#panel'));
  bind();
}
function bind(){
  if(tabName==='learn'){
    $('#mark-complete').addEventListener('click',()=>{completed.add(chapterIndex);try{localStorage.setItem('fa-lab-completed',JSON.stringify([...completed]))}catch(_){}nav();$('#mark-complete').textContent='✓ Chapter complete';$('#mark-complete').classList.add('done')});
    bindLab(chapters[chapterIndex].lab);
  }
  if(tabName==='solve') $$('.solver-choice').forEach(b=>b.addEventListener('click',()=>{const i=Number(b.dataset.recipe);$$('.solver-choice').forEach(x=>x.classList.toggle('active',x===b));$('#solver-output').innerHTML=recipeResult(i);typeset($('#solver-output'))}));
  if(tabName==='practice') $$('.exercise-card').forEach(card=>{const q=chapters[chapterIndex].quiz[Number(card.dataset.question)];$$('.choice',card).forEach(button=>button.addEventListener('click',()=>{const picked=Number(button.dataset.choice);$$('.choice',card).forEach(x=>{x.disabled=true;x.classList.remove('correct','incorrect')});button.classList.add(picked===q.answer?'correct':'incorrect');if(picked!==q.answer)$$('.choice',card)[q.answer].classList.add('correct');const feedback=$('.feedback',card);feedback.innerHTML=`<strong>${picked===q.answer?'Correct.':'The highlighted answer is correct.'}</strong> ${escapeHTML(q.why)}`;feedback.classList.add('show');typeset(feedback)}))});
}

function lab(kind){
  if(kind==='norms')return R`<section class="lab-card"><div class="lab-eyebrow">MOVE THE PARAMETERS</div><h3>Compare norms and break equivalence</h3><p>For the vector $(x,y)$, compare three lengths. Then increase $n$ for $p_n(t)=t^n$.</p><div class="control-grid"><label>$x$ = <span id="norm-x-label">2</span><input id="norm-x" type="range" min="-8" max="8" value="2"></label><label>$y$ = <span id="norm-y-label">-3</span><input id="norm-y" type="range" min="-8" max="8" value="-3"></label><label>$n$ = <span id="poly-n-label">3</span><input id="poly-n" type="range" min="1" max="30" value="3"></label></div><div class="lab-results" id="lab-results"></div><p class="lab-note" id="lab-note"></p></section>`;
  if(kind==='neumann')return R`<section class="lab-card"><div class="lab-eyebrow">MOVE THE PARAMETERS</div><h3>Watch the Neumann series converge</h3><p>For the scalar operator $T=qI$, the partial sum $S_N=\sum_{k=0}^Nq^k$ approaches $(1-q)^{-1}$ when $0\leq q<1$.</p><div class="control-grid"><label>$q$ = <span id="q-label">0.5</span><input id="q" type="range" min="0" max="95" value="50"></label><label>$N$ = <span id="terms-label">4</span><input id="terms" type="range" min="0" max="20" value="4"></label></div><div class="lab-results" id="lab-results"></div><p class="lab-note" id="lab-note"></p></section>`;
  if(kind==='dual')return R`<section class="lab-card"><div class="lab-eyebrow">CONSTRUCT A FUNCTIONAL</div><h3>Make a norming functional</h3><p>In $(\mathbb R^2,\|\cdot\|_1)$, choose coefficients from the signs of a nonzero vector $(x,y)$.</p><div class="control-grid"><label>$x$ <input id="dual-x" type="number" value="2" step="1"></label><label>$y$ <input id="dual-y" type="number" value="-3" step="1"></label></div><div class="lab-results" id="lab-results"></div><p class="lab-note" id="lab-note"></p></section>`;
  if(kind==='ubp')return R`<section class="lab-card"><div class="lab-eyebrow">COUNTEREXAMPLE MACHINE</div><h3>Remove completeness and watch the theorem fail</h3><p>On $c_{00}$ with the supremum norm, let $T_nx=nx_n$. The test vector has its first $m$ coordinates equal to $1$ and all later coordinates $0$.</p><div class="control-grid"><label>Support length $m$ = <span id="support-label">4</span><input id="support" type="range" min="1" max="8" value="4"></label><label>Operator index $n$ = <span id="operator-index-label">3</span><input id="operator-index" type="range" min="1" max="12" value="3"></label></div><div class="lab-results" id="lab-results"></div><p class="lab-note" id="lab-note"></p></section>`;
  if(kind==='weak')return R`<section class="lab-card"><div class="lab-eyebrow">COMPARE TOPOLOGIES</div><h3>Weak convergence without norm convergence</h3><p>In $\ell^2$, the unit vector $e_n$ keeps norm $1$. A fixed functional given by $y_k=1/k$ sees $e_n$ approach $0$.</p><div class="control-grid"><label>Index $n$ = <span id="weak-n-label">4</span><input id="weak-n" type="range" min="1" max="30" value="4"></label></div><div class="lab-results" id="lab-results"></div><p class="lab-note">This one test is an illustration. The proof of $e_n\rightharpoonup0$ must cover every $y\in\ell^2$.</p></section>`;
  return R`<section class="lab-card"><div class="lab-eyebrow">BUILD A PROOF</div><h3>Can you conclude a minimizer exists?</h3><p>Tick only the hypotheses you have established. Each one is a separate step in the direct method.</p><div class="check-grid"><label><input id="ref-bounded" type="checkbox"> The minimizing sequence is bounded.</label><label><input id="ref-reflexive" type="checkbox"> $X$ is a reflexive Banach space.</label><label><input id="ref-closed" type="checkbox"> The feasible set is weakly closed.</label><label><input id="ref-lsc" type="checkbox"> The objective is weakly lower semicontinuous.</label></div><div class="solver-output" id="reflexive-result"></div></section>`;
}
function metric(label,value){return `<div class="metric"><small>${escapeHTML(label)}</small><strong>${escapeHTML(value)}</strong></div>`}
function fmt(x){return Number(x).toFixed(3).replace(/\.000$/,'')}
function updateResult(metrics,note){$('#lab-results').innerHTML=metrics;$('#lab-note').textContent=note;typeset($('#lab-results'));typeset($('#lab-note'))}
function bindLab(kind){
  if(kind==='norms'){
    const update=()=>{const x=+$('#norm-x').value,y=+$('#norm-y').value,n=+$('#poly-n').value;$('#norm-x-label').textContent=x;$('#norm-y-label').textContent=y;$('#poly-n-label').textContent=n;updateResult(metric(R`$\|(x,y)\|_1$`,fmt(Math.abs(x)+Math.abs(y)))+metric(R`$\|(x,y)\|_2$`,fmt(Math.hypot(x,y)))+metric(R`$\|(x,y)\|_\infty$`,fmt(Math.max(Math.abs(x),Math.abs(y)))),R`For $p_n(t)=t^n$, $\|p_n\|_\infty=1$ while $\|p_n\|_1=1/(n+1)$. Here the ratio is ${n+1}, so no uniform comparison constant exists.`)};$$('input',$('.lab-card')).forEach(el=>el.addEventListener('input',update));update();return;
  }
  if(kind==='neumann'){
    const update=()=>{const q=+$('#q').value/100,n=+$('#terms').value,partial=(1-q**(n+1))/(1-q),exact=1/(1-q);$('#q-label').textContent=fmt(q);$('#terms-label').textContent=n;updateResult(metric(R`$S_N=\sum_{k=0}^Nq^k$`,fmt(partial))+metric(R`$(1-q)^{-1}$`,fmt(exact))+metric(R`$\frac{q^{N+1}}{1-q}$`,fmt(exact-partial)),R`The error is exactly $q^{N+1}/(1-q)$. For operators, replace $q$ by the norm bound $\|T\|<1$.`)};$$('input',$('.lab-card')).forEach(el=>el.addEventListener('input',update));update();return;
  }
  if(kind==='dual'){
    const update=()=>{let x=+$('#dual-x').value,y=+$('#dual-y').value;if(!Number.isFinite(x))x=0;if(!Number.isFinite(y))y=0;const a=Math.sign(x),b=Math.sign(y),zero=x===0&&y===0;updateResult(metric(R`$\|(x,y)\|_1$`,fmt(Math.abs(x)+Math.abs(y)))+metric(R`$\varphi(x,y)$`,fmt(a*x+b*y))+metric(R`$\|\varphi\|_{(\ell^1_2)'}$`,zero?'0':'1'),zero?'Choose a nonzero vector to obtain a functional of norm one.':R`Here $\varphi(u,v)=${a}u${b<0?'-':'+'}${Math.abs(b)}v$, and its dual norm is $\max(|${a}|,|${b}|)=1$.`)};$$('input',$('.lab-card')).forEach(el=>el.addEventListener('input',update));update();return;
  }
  if(kind==='ubp'){
    const update=()=>{const m=+$('#support').value,n=+$('#operator-index').value;$('#support-label').textContent=m;$('#operator-index-label').textContent=n;updateResult(metric(R`$T_nx$`,String(n<=m?n:0))+metric(R`$\|T_n\|$`,String(n))+metric(R`$\sup_n|T_nx|$`,String(m)),R`For this fixed $x$, $T_nx=0$ whenever $n>m$. Yet $\|T_n\|=n\to\infty$ because the domain $c_{00}$ is incomplete.`)};$$('input',$('.lab-card')).forEach(el=>el.addEventListener('input',update));update();return;
  }
  if(kind==='weak'){
    const update=()=>{const n=+$('#weak-n').value;$('#weak-n-label').textContent=n;$('#lab-results').innerHTML=metric(R`$\|e_n\|_2$`,'1')+metric(R`$\varphi_y(e_n)$`,fmt(1/n))+metric(R`$\varphi_{e_1}(e_n)$`,String(n===1?1:0));typeset($('#lab-results'))};$('#weak-n').addEventListener('input',update);update();return;
  }
  const update=()=>{const flags=['#ref-bounded','#ref-reflexive','#ref-closed','#ref-lsc'].map(q=>$(q).checked);let msg;if(!flags[0])msg='First prove your minimizing sequence is bounded; coercivity is one common route.';else if(!flags[1])msg='Boundedness is ready. Establish reflexivity of the Banach space to extract a weakly convergent subsequence.';else if(!flags[2])msg='A weak subsequence exists. Show its limit stays feasible using weak closedness.';else if(!flags[3])msg='The limit is feasible. Prove weak lower semicontinuity to pass the objective inequality to the limit.';else msg=R`All steps are justified: $x_{n_k}\rightharpoonup x\in C$ and $F(x)\leq\liminf_k F(x_{n_k})=\inf_C F$.`;$('#reflexive-result').innerHTML=`<strong>Next step</strong><p>${escapeHTML(msg)}</p>`;typeset($('#reflexive-result'))};$$('input',$('.lab-card')).forEach(el=>el.addEventListener('change',update));update();
}

$$('.tab').forEach(button=>button.addEventListener('click',()=>{tabName=button.dataset.tab;render();$('#panel').focus({preventScroll:true})}));
$('#mobile-menu').addEventListener('click',()=>{const open=$('.sidebar').classList.toggle('open');$('#mobile-menu').setAttribute('aria-expanded',String(open))});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){$('.sidebar').classList.remove('open');$('#mobile-menu').setAttribute('aria-expanded','false')}});
render();

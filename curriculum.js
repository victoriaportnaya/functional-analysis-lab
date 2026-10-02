const R = String.raw;
window.CURRICULUM = [
  {
    title:'Norms and finite dimensions',short:'Norms and geometry',source:'Lecture 01',pages:'1–11',
    idea:'Start with the geometry of a norm. Learn exactly which finite-dimensional shortcuts fail later.',
    tags:['Norm axioms','Equivalent norms','Compactness','Operators'],
    overview:R`A norm controls distance by $d(x,y)=\|x-y\|$. In finite dimensions every norm produces the same topology. In infinite dimensions, a sequence can be small for one norm and large for another.`,
    theorems:[
      {name:'The norm axioms',assumptions:R`Let $X$ be a vector space over $\mathbb K=\mathbb R$ or $\mathbb C$.`,formula:R`$$\|x\|=0\iff x=0,\qquad \|\lambda x\|=|\lambda|\|x\|,\qquad \|x+y\|\leq\|x\|+\|y\|.$$`,meaning:'The triangle inequality is the source of continuity and almost every estimate in the course.',proof:R`It implies the reverse triangle inequality $|\|x\|-\|y\||\leq\|x-y\|$ by applying the triangle inequality twice.`},
      {name:'Equivalent norms',assumptions:R`Let $\|\cdot\|_a$ and $\|\cdot\|_b$ be norms on the same vector space.`,formula:R`$$\exists c,C>0\ \forall x\in X:\quad c\|x\|_a\leq\|x\|_b\leq C\|x\|_a.$$`,meaning:'Both inequalities are required. Equivalent norms have the same convergent and Cauchy sequences, open sets, and compact sets.',proof:R`For example, $B_a(x,r/C)\subset B_b(x,r)\subset B_a(x,r/c)$. Conversely, equality of the two topologies gives a ball of one norm inside a unit ball of the other; rescaling gives one comparison inequality. Swap the norms for the other.`},
      {name:'Finite-dimensional equivalence and Heine–Borel',assumptions:R`Assume $\dim X<\infty$.`,formula:R`$$\text{all norms on }X\text{ are equivalent},\qquad K\subset X\text{ compact}\iff K\text{ closed and bounded}.$$`,meaning:'This is the finite-dimensional safety net. Closed and bounded does not imply compact in a general Banach space.',proof:R`Fix a basis and its coordinate maximum norm. Every norm $N$ has an upper bound $N(x)\leq C\|x\|_{\infty}$. The coordinate unit sphere is compact; continuity of $N$ gives a strictly positive minimum $m$, so $m\|x\|_{\infty}\leq N(x)$. Apply Heine–Borel through the coordinate map.`},
      {name:'Continuity of linear maps',assumptions:R`Let $T:X\to Y$ be linear between normed spaces.`,formula:R`$$T\text{ continuous}\iff \exists M\geq0\ \forall x\in X:\ \|Tx\|_Y\leq M\|x\|_X.$$`,meaning:'The least such $M$ is the operator norm. If the domain $X$ is finite-dimensional, every linear $T$ is continuous.',proof:R`If $T$ is continuous at $0$, find $\delta>0$ such that $\|z\|<\delta$ implies $\|Tz\|<1$. Apply this to $z=\delta x/(2\|x\|)$. The reverse direction is a Lipschitz estimate.`},
      {name:'Riesz lemma and the unit ball',assumptions:R`Let $F\subsetneq X$ be a closed linear subspace.`,formula:R`$$\exists u\in X:\quad \|u\|=1,\quad \operatorname{dist}(u,F)>\tfrac12.$$`,meaning:'Repeatedly applying the lemma in an infinite-dimensional space produces separated unit vectors. Hence the closed unit ball is compact exactly in finite dimension.',proof:R`Choose $y\notin F$ and $d=\operatorname{dist}(y,F)>0$. Pick $z\in F$ with $d\leq\|y-z\|<2d$, then normalize $u=(y-z)/\|y-z\|$. For every $v\in F$, $\|u-v\|\geq d/\|y-z\|>1/2$.`}
    ],
    examples:[
      {title:'Compare the standard norms',task:R`For $x\in\mathbb R^n$, prove $\|x\|_\infty\leq\|x\|_2\leq\|x\|_1\leq\sqrt n\|x\|_2\leq n\|x\|_\infty$.`,steps:[R`Since every $|x_i|^2$ is a term of $\sum_j|x_j|^2$, $\|x\|_\infty\leq\|x\|_2$.`,R`Expand $(\sum_i|x_i|)^2$ to get $\|x\|_2\leq\|x\|_1$.`,R`Cauchy–Schwarz gives $\sum_i|x_i|\leq\sqrt n(\sum_i|x_i|^2)^{1/2}$. Also $\|x\|_2\leq\sqrt n\|x\|_\infty$. Combine the inequalities.`]},
      {title:'A sequence that separates two norms',task:R`On the vector space of all polynomials over $[0,1]$, compare $\|p\|_\infty=\max_{[0,1]}|p|$ with $\|p\|_1=\int_0^1|p(t)|\,dt$.`,steps:[R`Take $p_n(t)=t^n$. Then $\|p_n\|_\infty=1$.`,R`Direct integration gives $\|p_n\|_1=1/(n+1)\to0$.`,R`If the norms were equivalent, $1=\|p_n\|_\infty\leq C\|p_n\|_1=C/(n+1)$ for every $n$, a contradiction.`]},
      {title:'Why the infinite-dimensional unit ball is not compact',task:'Construct a sequence inside the unit ball without a convergent subsequence.',steps:[R`Inductively set $F_n=\operatorname{span}(x_1,\ldots,x_n)$. It is finite-dimensional, closed, and proper.`,R`Riesz lemma supplies $x_{n+1}$ with $\|x_{n+1}\|=1$ and $\operatorname{dist}(x_{n+1},F_n)>1/2$.`,R`For $m<n$, $x_m\in F_{n-1}$, so $\|x_n-x_m\|>1/2$. No subsequence is Cauchy; therefore the ball is not compact.`]}
    ],
    recipes:[
      {goal:'Prove two norms equivalent',steps:['Verify both maps really are norms.',R`Find constants $c,C>0$ independent of $x$ for the two inequalities.`,R`In finite dimension, you may invoke the equivalence theorem once the norm axioms are checked.`],trap:'One inequality only proves that one topology is no stronger than the other.'},
      {goal:'Disprove equivalence',steps:[R`Construct a sequence $x_n$ in the common vector space.`,R`Show a norm ratio tends to $0$ or $\infty$.`,R`Write down the universal constant that this contradicts.`],trap:'A single vector cannot disprove a uniform inequality.'},
      {goal:'Prove an operator bounded',steps:[R`Check linearity and specify the domain and codomain norms.`,R`Establish $\|Tx\|_Y\leq M\|x\|_X$ for every $x$.`,R`If the domain is finite-dimensional, cite automatic continuity instead.`],trap:'Finite dimension of the codomain is not enough.'}
    ],
    quiz:[
      {q:'What proves norm equivalence?',choices:[R`Only $\|x\|_b\leq C\|x\|_a$.`,R`Both $c\|x\|_a\leq\|x\|_b$ and $\|x\|_b\leq C\|x\|_a$ for all $x$.`,'Agreement on one nonzero vector.'],answer:1,why:'A uniform upper and lower bound is required.'},
      {q:'When is every closed bounded set compact?',choices:['In every Banach space.','In every normed space.','In every finite-dimensional normed space.'],answer:2,why:'The finite-dimensional hypothesis is essential.'},
      {q:'Which dimension assumption makes every linear map continuous?',choices:['Finite-dimensional domain.','Finite-dimensional codomain.','Both spaces infinite-dimensional.'],answer:0,why:'The theorem concerns the domain.'}
    ],lab:'norms'
  },
  {
    title:'The three operator theorems',short:'Automatic continuity',source:'Lecture 04',pages:'1–15',
    idea:'Baire turns qualitative information into a uniform operator estimate. The three theorems begin with different kinds of information.',
    tags:['Uniform boundedness','Open mapping','Bounded inverse','Closed graph'],
    overview:R`Read the premise before choosing a theorem: a pointwise bounded family, a surjective bounded map, or a closed graph. The completeness hypotheses differ, so check them explicitly.`,
    theorems:[
      {name:'Uniform boundedness (Banach–Steinhaus)',assumptions:R`Let $X$ be Banach, $Y$ normed, and $(T_i)_{i\in I}\subset\mathcal L(X,Y)$.`,formula:R`$$\left[\forall x\in X,\ \sup_{i\in I}\|T_i x\|_Y<\infty\right]\Longrightarrow\sup_{i\in I}\|T_i\|<\infty.$$`,meaning:'The bound for each fixed $x$ may depend on $x$; the conclusion gives one operator bound for the whole family.',proof:R`Let $F_n=\{x:\sup_i\|T_i x\|\leq n\}$. Each $F_n$ is closed and $X=\bigcup_nF_n$. Baire gives a ball $B(x_0,r)\subset F_N$. Subtract values at $x_0+h$ and $x_0$ to bound every $T_i$ on $B(0,r)$; scale to all $x$.`},
      {name:'Open mapping (Banach–Schauder)',assumptions:R`Let $X,Y$ be Banach and $T\in\mathcal L(X,Y)$ be surjective.`,formula:R`$$T(U)\text{ is open for every open }U\subset X;\qquad\exists C>0\ \forall y\in Y\ \exists x\in X:\ Tx=y,\ \|x\|\leq C\|y\|.$$`,meaning:'Surjectivity gives a controlled preimage, but not necessarily a linear right inverse.',proof:R`Baire first yields a ball contained in the closure of the image of a ball. A geometric correction series then removes the closure: approximate the residual at scales $2^{-n}$, sum corrections in Banach $X$, and use continuity of $T$.`},
      {name:'Bounded inverse theorem',assumptions:R`Let $X,Y$ be Banach and $T:X\to Y$ bounded, linear, and bijective.`,formula:R`$$T^{-1}\in\mathcal L(Y,X),\qquad \exists C>0\ \forall x\in X:\ \|x\|_X\leq C\|Tx\|_Y.$$`,meaning:'Existence and uniqueness of solutions to $Tx=y$ come with stable dependence on $y$.',proof:R`Open mapping says $T$ sends every open subset of $X$ to an open subset of $Y$. This is exactly continuity of $T^{-1}$.`},
      {name:'Closed graph theorem',assumptions:R`Let $X,Y$ be Banach and $T:X\to Y$ linear and defined on every $x\in X$.`,formula:R`$$\big[x_n\to x\text{ in }X,\ Tx_n\to y\text{ in }Y\Longrightarrow y=Tx\big]\Longrightarrow T\in\mathcal L(X,Y).$$`,meaning:'The hypothesis identifies a possible limit of $Tx_n$; it does not say that $Tx_n$ always converges.',proof:R`The closed graph $\Gamma(T)$ is a Banach subspace of $X\times Y$. Projection $P:\Gamma(T)\to X$ is a continuous linear bijection. The bounded inverse theorem makes $P^{-1}(x)=(x,Tx)$ continuous; composing with the second projection gives continuity of $T$.`}
    ],
    examples:[
      {title:'Why the Banach hypothesis matters',task:R`On $(c_{00},\|\cdot\|_\infty)$ define $T_nx=nx_n$.`,steps:[R`Each $T_n$ is a continuous linear functional and $\|T_n\|=n$, by testing the $n$-th unit vector.`,R`For each fixed $x\in c_{00}$, $T_nx=0$ for all sufficiently large $n$. Thus $\sup_n|T_nx|<\infty$.`,R`The operator norms are unbounded. This does not contradict Banach–Steinhaus because $c_{00}$ is incomplete.`]},
      {title:'An everywhere-defined multiplier',task:R`Suppose $M_a:\ell^1\to\ell^1$, $(M_ax)_j=a_jx_j$, is defined for every $x\in\ell^1$. Show $a\in\ell^\infty$.`,steps:[R`If $x^{(n)}\to x$ and $M_ax^{(n)}\to y$ in $\ell^1$, coordinate convergence gives $y_j=a_jx_j$ for every $j$. The graph is closed.`,R`Both spaces are Banach and $M_a$ is defined everywhere, so closed graph makes $M_a$ bounded.`,R`Apply the operator estimate to $e_j$: $|a_j|=\|M_ae_j\|_1\leq\|M_a\|$. Hence $a\in\ell^\infty$.`]},
      {title:'Two complete norms',task:R`Both $(E,\|\cdot\|_1)$ and $(E,\|\cdot\|_2)$ are Banach and $\|x\|_2\leq C\|x\|_1$. Prove equivalence.`,steps:[R`The identity $I:(E,\|\cdot\|_1)\to(E,\|\cdot\|_2)$ is bounded and bijective.`,R`Bounded inverse gives $\|x\|_1\leq D\|x\|_2$.`,R`Together with the given bound, this is exactly equivalence of the norms.`]}
    ],
    recipes:[
      {goal:'Use uniform boundedness',steps:[R`Confirm each $T_i$ is bounded and the domain $X$ is Banach.`,R`Show $\sup_i\|T_i x\|<\infty$ for every fixed $x$.`,R`Conclude $\sup_i\|T_i\|<\infty$ and apply the uniform estimate.`],trap:'The codomain need not be complete; the domain does.'},
      {goal:'Use open mapping or bounded inverse',steps:['Check both spaces are Banach and $T$ is bounded.',R`If $T$ is onto, get a controlled preimage; if it is also one-to-one, get $T^{-1}\in\mathcal L(Y,X)$.`,R`Translate that bound into the estimate requested by the problem.`],trap:'An onto map need not have a bounded linear right inverse.'},
      {goal:'Use closed graph',steps:[R`Take arbitrary $x_n\to x$ and $Tx_n\to y$.`,R`Use the operator formula to identify $y=Tx$.`,R`Verify $T$ is everywhere defined and both spaces are Banach before invoking the theorem.`],trap:'Closed operators with proper domains can be unbounded.'}
    ],
    quiz:[
      {q:'A family is bounded at every vector. Which theorem applies?',choices:['Open mapping.','Uniform boundedness.','Closed graph.'],answer:1,why:'The pointwise bounded family is the Banach–Steinhaus pattern.'},
      {q:'What does open mapping guarantee for a surjection?',choices:['A unique preimage for each target.','A linear right inverse.','At least one preimage with a uniform norm bound.'],answer:2,why:'Controlled preimages need not be unique or selected linearly.'},
      {q:'What must be checked for closed graph?',choices:['The operator is defined on all of Banach $X$ and the target is Banach.','Only linearity.','Compactness of the domain unit ball.'],answer:0,why:'The domain, codomain, and everywhere-defined hypotheses are essential.'}
    ],lab:'ubp'
  },
  {
    title:'Weak and weak-star topologies',short:'Weak topologies',source:'Lecture 05',pages:'1–8',
    idea:'Weak convergence tests each continuous scalar question separately. Weak-star convergence on a dual tests only evaluations at original vectors.',
    tags:['Weak topology','Weak-star topology','Banach–Alaoglu','Separability'],
    overview:R`Norm convergence is stronger because $|\varphi(x_n-x)|\leq\|\varphi\|\|x_n-x\|$. Weak convergence need not make the norms of differences small.`,
    theorems:[
      {name:'Weak topology and convergence',assumptions:R`Let $X$ be a normed space and $x_n,x\in X$.`,formula:R`$$x_n\rightharpoonup x\quad\Longleftrightarrow\quad\forall\varphi\in X^{\prime}:\ \varphi(x_n)\to\varphi(x).$$`,meaning:'A basic weak neighborhood controls only finitely many functionals at a time.',proof:R`The weak topology $\sigma(X,X^{\prime})$ is the coarsest topology making every $\varphi\in X^{\prime}$ continuous. Its basic neighborhoods are finite intersections of sets $|\varphi_j(z-x)|<\varepsilon$.`},
      {name:'Weak-star topology',assumptions:R`Let $\varphi_n,\varphi\in X^{\prime}$.`,formula:R`$$\varphi_n\stackrel{*}{\rightharpoonup}\varphi\quad\Longleftrightarrow\quad\forall x\in X:\ \varphi_n(x)\to\varphi(x).$$`,meaning:R`Weak convergence in $X^{\prime}$ tests all of $X^{\prime\prime}$; weak-star tests only the evaluation functionals $J_X(X)$.`,proof:R`Because $J_Xx(\varphi)=\varphi(x)$, every weak-star test comes from a weak test on $X^{\prime}$. Thus norm convergence implies weak convergence, which implies weak-star convergence on $X^{\prime}$.`},
      {name:'Weak convergence: boundedness and lower semicontinuity',assumptions:R`Assume $x_n\rightharpoonup x$ in a normed space $X$.`,formula:R`$$\sup_n\|x_n\|<\infty,\qquad \|x\|\leq\liminf_{n\to\infty}\|x_n\|.$$`,meaning:'Weak convergence still supplies a global norm bound, although it need not supply norm convergence.',proof:R`Apply uniform boundedness to $J_Xx_n\in X^{\prime\prime}$ acting on the Banach space $X^{\prime}$. Hahn–Banach gives $\|J_Xx_n\|=\|x_n\|$. For lower semicontinuity, choose a norming $\varphi$ for $x$ and compare $|\varphi(x_n)|\leq\|x_n\|$.`},
      {name:'Banach–Alaoglu–Bourbaki',assumptions:'Let $X$ be any normed space; completeness is not required.',formula:R`$$B_{X^{\prime}}=\{\varphi\in X^{\prime}:\|\varphi\|\leq1\}\quad\text{is compact for }\sigma(X^{\prime},X).$$`,meaning:'This is weak-star compactness, not generally norm compactness.',proof:R`Embed $B_{X^{\prime}}$ into $\prod_{x\in X}\{z\in\mathbb K:|z|\leq\|x\|\}$ by $\varphi\mapsto(\varphi(x))_{x\in X}$. Tychonoff makes the product compact; the linearity equations define a closed subset corresponding to the dual ball.`},
      {name:'Separability and sequences',assumptions:'Assume $X$ is separable.',formula:R`$$B_{X^{\prime}}\text{ is weak-star metrizable}\quad\Longrightarrow\quad\text{every sequence in }B_{X^{\prime}}\text{ has a weak-star convergent subsequence}.$$`,meaning:'Compactness alone does not always provide convergent subsequences outside metric spaces.',proof:R`Choose a countable dense set $(x_m)$ in the unit ball of $X$. On $B_{X^{\prime}}$, the metric $d(\varphi,\psi)=\sum_m2^{-m}\min(1,|\varphi(x_m)-\psi(x_m)|)$ generates weak-star convergence. Compact metric spaces are sequentially compact.`}
    ],
    examples:[
      {title:'A weak but not norm-convergent sequence',task:R`In $\ell^2$, examine the standard unit vectors $e_n$.`,steps:[R`For every $n$, $\|e_n\|_2=1$, so $e_n$ does not converge to $0$ in norm.`,R`Using the standard Hilbert-space description of $(\ell^2)'$, every functional has the form $\varphi_y(x)=\sum_k x_k\overline{y_k}$ for some $y\in\ell^2$.`,R`Then $\varphi_y(e_n)=\overline{y_n}\to0$ because coordinates of an $\ell^2$ sequence tend to zero. Thus $e_n\rightharpoonup0$.`]},
      {title:'A weak-star coordinate example',task:R`On $\ell^1$, define $\varphi_n(x)=x_n$. Study $(\varphi_n)\subset(\ell^1)'$.`,steps:[R`Each $\varphi_n$ is continuous with $\|\varphi_n\|=1$.`,R`For every $x=(x_k)\in\ell^1$, $x_n\to0$, so $\varphi_n(x)\to0$.`,R`Hence $\varphi_n\stackrel{*}{\rightharpoonup}0$ in $(\ell^1)'$, but the operator norms stay equal to $1$.`]},
      {title:'A norm bound passes to the weak limit',task:R`Suppose $x_n\rightharpoonup x$ and $\|x_n\|\leq3$.`,steps:[R`Weak lower semicontinuity gives $\|x\|\leq\liminf_n\|x_n\|$.`,R`Since every norm is at most $3$, the lim inf is at most $3$.`,R`Therefore $\|x\|\leq3$: the closed norm ball is weakly closed.`]}
    ],
    recipes:[
      {goal:'Prove weak convergence',steps:[R`Fix an arbitrary $\varphi\in X^{\prime}$.`,R`Prove $\varphi(x_n-x)\to0$; use a dual-space description when available.`,R`State why the argument works for every functional.`],trap:'A finite list of coordinate tests is not enough in infinite dimensions.'},
      {goal:'Prove weak-star convergence',steps:[R`State the predual $X$ and fix an arbitrary $x\in X$.`,R`Show $\varphi_n(x)\to\varphi(x)$.`,R`Do not silently switch to testing all of $X^{\prime\prime}$.`],trap:'Weak and weak-star are different topologies on a dual space.'},
      {goal:'Extract a dual subsequence',steps:[R`Bound the norms of the functionals and rescale into $B_{X^{\prime}}$.`,R`Use Banach–Alaoglu for weak-star compactness.`,R`Check separability of $X$ before concluding a subsequence exists by metrizability.`],trap:'A nonmetrizable compact space need not be sequentially compact.'}
    ],
    quiz:[
      {q:'Which family tests weak convergence in $X$?',choices:['Every vector in $X$.',R`Every continuous functional in $X^{\prime}$.`,'A single norming functional.'],answer:1,why:'The quantifier ranges over the entire continuous dual.'},
      {q:R`Which family tests weak-star convergence in $X^{\prime}$?`,choices:[R`All of $X^{\prime\prime}$.`,R`All original vectors $x\in X$.`,'One chosen basis vector.'],answer:1,why:'Weak-star topology is pointwise convergence on the predual.'},
      {q:'When may you extract a weak-star convergent subsequence from a bounded dual sequence using these lectures?',choices:['Always, by compactness alone.','When the predual $X$ is separable.','Only when the dual is finite-dimensional.'],answer:1,why:'Separability makes the compact dual ball metrizable and hence sequentially compact.'}
    ],lab:'weak'
  },
  {
    title:'Reflexivity and weak compactness',short:'Reflexive spaces',source:'Lecture 05 + supplement',pages:'Lecture 05: 8–10; supplement: 2',
    idea:'Reflexivity returns compactness to the original space in the weak topology, making bounded approximation sequences useful for existence proofs.',
    tags:['Canonical embedding','Reflexivity','Weak compactness','Minimizers'],
    overview:R`The canonical map $J_X:X\to X^{\prime\prime}$ is always an isometry. Reflexivity asks whether it is onto. That surjectivity transfers Banach–Alaoglu compactness from $X^{\prime\prime}$ back to $X$.`,
    theorems:[
      {name:'Canonical embedding and reflexivity',assumptions:'Let $X$ be a normed space.',formula:R`$$J_Xx(\varphi)=\varphi(x),\qquad \|J_Xx\|_{X^{\prime\prime}}=\|x\|_X,\qquad X\text{ reflexive}\iff J_X(X)=X^{\prime\prime}.$$`,meaning:'An isometry into the bidual exists for every normed space. Reflexivity is the stronger onto property.',proof:R`Hahn–Banach yields the equality of norms. If $J_X$ is onto, $X$ is isometric to the Banach space $X^{\prime\prime}$, hence $X$ is complete.`},
      {name:'Reflexivity and the unit ball',assumptions:'Let $X$ be a Banach space.',formula:R`$$X\text{ reflexive}\iff B_X\text{ is compact for }\sigma(X,X^{\prime}).$$`,meaning:'The forward direction follows from Banach–Alaoglu. The converse is Kakutani’s theorem and requires an additional argument.',proof:R`If $X$ is reflexive, $J_X(B_X)=B_{X^{\prime\prime}}$. Banach–Alaoglu applied to $X^{\prime}$ makes $B_{X^{\prime\prime}}$ compact for $\sigma(X^{\prime\prime},X^{\prime})$. Under $J_X$, this topology matches the weak topology on $B_X$.`},
      {name:'Weak subsequences in reflexive spaces',assumptions:'Let $X$ be a reflexive Banach space and $(x_n)$ norm bounded.',formula:R`$$\exists(n_k),\ x\in X:\quad x_{n_k}\rightharpoonup x.$$`,meaning:'This is a weak subsequence, not a norm-convergent one.',proof:R`The bounded sequence lies in a multiple of the weakly compact unit ball. Eberlein–Šmulian says weak compactness and weak sequential compactness agree in Banach spaces.`},
      {name:'A minimizer template',assumptions:R`Let $C\subset X$ be weakly closed in a reflexive Banach space. Let $F:C\to(-\infty,\infty]$ be proper, bounded below, and weakly lower semicontinuous. Assume a bounded minimizing sequence exists.`,formula:R`$$x_{n_k}\rightharpoonup x\in C,\qquad F(x)\leq\liminf_{k\to\infty}F(x_{n_k})=\inf_C F.$$`,meaning:'Boundedness, weak closedness, and lower semicontinuity are separate proof obligations.',proof:R`Extract a weakly convergent subsequence using reflexivity. Weak closedness keeps its limit in $C$. Lower semicontinuity passes the objective bound to the limit, so the limit attains the infimum.`}
    ],
    examples:[
      {title:'Finite-dimensional spaces are reflexive',task:R`Show $J_X:X\to X^{\prime\prime}$ is onto when $\dim X<\infty$.`,steps:[R`A basis and its dual basis show $\dim X^{\prime}=\dim X$.`,R`Therefore $\dim X^{\prime\prime}=\dim X$. Hahn–Banach gives injectivity of $J_X$.`,R`An injective linear map between equal finite dimensions is surjective.`]},
      {title:'A bounded sequence is not necessarily norm compact',task:R`Let $(e_n)$ be the standard unit vectors in $\ell^2$.`,steps:[R`Each $e_n$ has norm $1$ and $\|e_n-e_m\|_2=\sqrt2$ when $n\neq m$. So no subsequence converges in norm.`,R`The space $\ell^2$ is reflexive. Thus a bounded sequence has a weakly convergent subsequence. In fact $e_n\rightharpoonup0$.`,R`This displays the distinction between weak and norm compactness.`]},
      {title:'Existence by the direct method',task:'What must a minimization proof establish?',steps:[R`Construct a minimizing sequence $(x_n)$ and prove it is bounded, often using coercivity.`,R`Extract $x_{n_k}\rightharpoonup x$ by reflexivity and Eberlein–Šmulian. Prove $x\in C$ using weak closedness.`,R`Apply $F(x)\leq\liminf_k F(x_{n_k})=\inf_C F$ to conclude $x$ minimizes $F$.`]}
    ],
    recipes:[
      {goal:'Prove finite-dimensional reflexivity',steps:[R`Write down $J_Xx(\varphi)=\varphi(x)$.`,R`Prove injectivity using a coordinate functional.`,R`Compare $\dim X$ and $\dim X^{\prime\prime}$ to obtain surjectivity.`],trap:R`A basis-dependent map $X\to X^{\prime}$ is not the canonical map.`},
      {goal:'Extract a weak subsequence',steps:[R`Verify $(x_n)$ is norm bounded and $X$ is reflexive Banach.`,R`Use weak compactness of a scaled unit ball.`,R`Invoke Eberlein–Šmulian for a subsequence.`],trap:'Banach–Alaoglu directly gives weak-star compactness in a dual.'},
      {goal:'Prove a minimizer exists',steps:['Find a bounded minimizing sequence.',R`Extract a weak subsequence and show its limit lies in the feasible set.`,R`Apply weak lower semicontinuity to the objective.`],trap:'Weak convergence by itself does not imply convergence of objective values.'}
    ],
    quiz:[
      {q:'What is the definition of reflexivity?',choices:[R`$J_X:X\to X^{\prime\prime}$ is onto.`,'$X$ is merely complete.',R`There is some basis-dependent isomorphism $X\to X^{\prime}$.`],answer:0,why:'Reflexivity is surjectivity of the canonical bidual embedding.'},
      {q:'What does boundedness imply in reflexive Banach spaces?',choices:['A norm-convergent subsequence.','A weakly convergent subsequence.','A constant subsequence.'],answer:1,why:'Weak compactness together with Eberlein–Šmulian supplies a weak subsequence.'},
      {q:'What is still needed after extracting a weak limit of minimizers?',choices:['Weak closedness of constraints and weak lower semicontinuity.','A countable Hamel basis.','Norm convergence.'],answer:0,why:'Those two conditions ensure feasibility and pass the minimizing inequality to the limit.'}
    ],lab:'reflexive'
  },
  {
    title:'Banach spaces and Baire',short:'Completeness and Baire',source:'Lecture 02',pages:'1–10',
    idea:'Completeness keeps limits inside the space. Baire uses that fact to turn countably many local statements into a uniform one.',
    tags:['Cauchy sequences','Complete spaces','Neumann series','Baire theorem'],
    overview:R`The key question is not whether an approximation sequence has a limit somewhere; it is whether the limit lies in the space with the stated norm.`,
    theorems:[
      {name:'Banach space',assumptions:'Let $X$ be a normed vector space.',formula:R`$$X\text{ is Banach}\iff\text{ every Cauchy sequence in }X\text{ converges in }X.$$`,meaning:'A convergent sequence is Cauchy. The converse requires completeness.',proof:R`To prove a subspace $Y$ complete, start with an arbitrary Cauchy sequence in $Y$, find its limit in an ambient space, then show that the limit belongs to $Y$.`},
      {name:'Closed-subspace criterion',assumptions:'Let $Y$ be a linear subspace of a normed space $X$.',formula:R`$$Y\text{ complete}\Longrightarrow Y\text{ closed in }X;\qquad X\text{ Banach and }Y\text{ closed}\Longrightarrow Y\text{ Banach}.$$`,meaning:'When $X$ is Banach, $Y$ is Banach exactly when it is closed.',proof:R`For the first implication, a sequence in $Y$ converging in $X$ is Cauchy in $Y$ and hence has a limit in $Y$; uniqueness of limits identifies it. For the second, a Cauchy sequence in $Y$ converges in $X$ and closedness keeps its limit in $Y$.`},
      {name:'Absolute convergence criterion',assumptions:'Let $X$ be a normed space.',formula:R`$$X\text{ Banach}\iff\left(\sum_n\|x_n\|<\infty\Longrightarrow\sum_n x_n\text{ converges in }X\right).$$`,meaning:'Summable lengths make partial sums Cauchy. The reverse implication recovers arbitrary Cauchy limits by taking a rapidly convergent subsequence.',proof:R`For a Cauchy sequence $(y_n)$, choose a subsequence $(y_{n_k})$ with $\|y_{n_{k+1}}-y_{n_k}\|<2^{-k}$. The telescoping series is absolutely convergent; its limit is the limit of the original Cauchy sequence.`},
      {name:'Neumann series',assumptions:R`Let $X$ be Banach and $T\in\mathcal L(X)$ satisfy $\|T\|<1$.`,formula:R`$$(I-T)^{-1}=\sum_{n=0}^{\infty}T^n,\qquad \|(I-T)^{-1}\|\leq\frac{1}{1-\|T\|}.$$`,meaning:'This is a geometric series of operators, useful for solving equations and perturbing invertible operators.',proof:R`The series converges absolutely in $\mathcal L(X)$ because $\|T^n\|\leq\|T\|^n$. The finite-sum identity $(I-T)\sum_{n=0}^NT^n=I-T^{N+1}$ passes to the limit.`},
      {name:'Baire category theorem',assumptions:R`Let $M$ be a complete metric space and $F_n\subset M$ closed with empty interior.`,formula:R`$$\operatorname{int}\!\left(\bigcup_{n=1}^{\infty}F_n\right)=\varnothing.$$`,meaning:'Equivalently, a countable intersection of open dense sets is dense.',proof:R`Given a nonempty open set, choose nested closed balls inside it, avoiding $F_n$ at stage $n$, with radii tending to zero. Their centers form a Cauchy sequence. Completeness produces a point in every ball, outside every $F_n$.`}
    ],
    examples:[
      {title:'An incomplete sequence space',task:R`Show $c_{00}$ with the inherited $\ell^1$ norm is not complete.`,steps:[R`Let $x^{(N)}=(2^{-1},\ldots,2^{-N},0,\ldots)\in c_{00}$.`,R`For $M>N$, $\|x^{(M)}-x^{(N)}\|_1=\sum_{k=N+1}^{M}2^{-k}\leq2^{-N}\to0$.`,R`Its $\ell^1$ limit $(2^{-k})_{k\geq1}$ has infinite support and is not in $c_{00}$.`]},
      {title:'Invert a small perturbation',task:R`Let $X$ be Banach. Suppose $A,B\in\mathcal L(X)$, $A$ is invertible, and $\|A^{-1}(A-B)\|<1$. Prove $B$ invertible.`,steps:[R`Set $T=A^{-1}(A-B)$, so $B=A(I-T)$.`,R`The Neumann theorem makes $I-T$ invertible, since $X$ is Banach and $\|T\|<1$.`,R`Therefore $B^{-1}=(I-T)^{-1}A^{-1}$.`]},
      {title:'No countable Hamel basis',task:'Show an infinite-dimensional Banach space cannot have a countable algebraic basis.',steps:[R`A countable Hamel basis $(e_n)$ would give $X=\bigcup_{n\geq1}\operatorname{span}(e_1,\ldots,e_n)$.`,R`Each span is finite-dimensional and closed; because it is proper, it has empty interior.`,R`Baire forbids that countable cover. A countable dense set or Schauder basis does not create this contradiction.`]}
    ],
    recipes:[
      {goal:'Prove completeness',steps:['Take an arbitrary Cauchy sequence in the given norm.',R`Construct a candidate limit pointwise or coordinatewise.`,R`Prove the candidate lies in the space and that convergence holds in the original norm.`],trap:'Pointwise convergence alone does not establish norm convergence.'},
      {goal:'Disprove completeness',steps:['Build a Cauchy sequence using truncations or approximations.',R`Identify its limit in a larger complete space.`,R`Show the limit is outside the space under study.`],trap:'Do not change the norm halfway through the proof.'},
      {goal:'Use Baire or Neumann',steps:[R`For Baire, identify a countable cover by closed level sets and verify completeness.`,R`For Neumann, factor the problem into $I-T$ with $\|T\|<1$.`,'State the quantitative conclusion after the theorem.'],trap:'The strict inequality in Neumann and completeness in Baire are essential.'}
    ],
    quiz:[
      {q:'What is the defining Banach property?',choices:['Every bounded sequence converges.','Every Cauchy sequence converges in the space.','Every closed ball is compact.'],answer:1,why:'Completeness concerns Cauchy sequences and their limits inside the space.'},
      {q:'Why does the Neumann series converge?',choices:[R`Because $\sum_n\|T^n\|\leq\sum_n\|T\|^n<\infty$ and $\mathcal L(X)$ is complete.`,'Because every operator is surjective.','Because the unit ball is compact.'],answer:0,why:'The geometric bound and completeness of the operator space are the key steps.'},
      {q:'What does Baire rule out?',choices:['A countable dense subset.','A countable Hamel basis in an infinite-dimensional Banach space.','A Schauder basis.'],answer:1,why:'A Hamel basis would express the space as a countable union of proper finite-dimensional spans.'}
    ],lab:'neumann'
  },
  {
    title:'Hahn–Banach and duality',short:'Duality and separation',source:'Lecture 03 + supplement',pages:'Lecture 03: 1–10; supplement: 1–2',
    idea:'Continuous linear functionals turn vectors into scalar answers. Hahn–Banach guarantees enough functionals to detect norms and separate points.',
    tags:['Dual space','Extension','Norming functional','Bidual'],
    overview:R`The dual $X^{\prime}$ contains all continuous linear maps $X\to\mathbb K$. The bidual $X^{\prime\prime}$ contains continuous linear maps on $X^{\prime}$. Evaluation gives a canonical path from $X$ into $X^{\prime\prime}$.`,
    theorems:[
      {name:'The continuous dual is Banach',assumptions:'Let $X$ be any normed space; completeness of $X$ is not required.',formula:R`$$X^{\prime}=\mathcal L(X,\mathbb K),\qquad \|\varphi\|=\sup_{\|x\|\leq1}|\varphi(x)|,\qquad X^{\prime}\text{ is Banach}.$$`,meaning:'The algebraic dual may contain discontinuous functionals. The topological dual contains only bounded ones.',proof:R`If $(\varphi_n)$ is Cauchy in operator norm, then $\varphi_n(x)$ converges for each $x$. The pointwise limit $\varphi$ is linear and bounded; passing to the limit in $|\varphi_n(x)-\varphi_m(x)|\leq\varepsilon\|x\|$ gives norm convergence.`},
      {name:'Hahn–Banach extension',assumptions:R`Let $M\subset X$ be a linear subspace and $f\in M^{\prime}$.`,formula:R`$$\exists F\in X^{\prime}:\quad F|_M=f,\qquad\|F\|_{X^{\prime}}=\|f\|_{M^{\prime}}.$$`,meaning:'No completeness or closedness assumption on $X$ or $M$ is needed.',proof:R`On real spaces, dominate $f$ by the sublinear map $p(x)=\|f\|\|x\|$ and extend one dimension at a time; Zorn's lemma yields a global extension. In the complex case, extend $\operatorname{Re}f$ and reconstruct a complex-linear functional.`},
      {name:'Norming functional and bidual embedding',assumptions:R`Let $x\in X$ be nonzero.`,formula:R`$$\exists\varphi\in X^{\prime}:\ \|\varphi\|=1,\ \varphi(x)=\|x\|;\qquad \|J_Xx\|_{X^{\prime\prime}}=\|x\|.$$`,meaning:R`The dual separates points and recovers the norm. The canonical map $J_Xx(\varphi)=\varphi(x)$ is an isometry.`,proof:R`Define $f(\lambda x)=\lambda\|x\|$ on the one-dimensional span of $x$ and extend it by Hahn–Banach. The upper bound $|\varphi(x)|\leq\|\varphi\|\|x\|$ and this norming functional give equality for $J_X$.`},
      {name:'Separation from a closed subspace',assumptions:R`Let $M\subset X$ be closed and $x_0\notin M$. Set $d=\operatorname{dist}(x_0,M)>0$.`,formula:R`$$\exists\varphi\in X^{\prime}:\quad \varphi|_M=0,\quad\|\varphi\|=1,\quad\varphi(x_0)=d.$$`,meaning:'A functional can detect that a point lies outside a closed subspace.',proof:R`On $M+\mathbb Kx_0$, put $g(m+\lambda x_0)=\lambda$. The distance estimate gives $\|g\|=1/d$. Extend $g$ without changing norm, then set $\varphi=dg$.`},
      {name:'Dual basis versus canonical evaluation',assumptions:'Let $X$ be finite-dimensional with a chosen basis $(e_i)$.',formula:R`$$e_i^*(e_j)=\delta_{ij},\qquad \varphi=\sum_i\varphi(e_i)e_i^*,\qquad J_Xx(\varphi)=\varphi(x).$$`,meaning:R`The basis-dependent identification $X\to X^{\prime}$ differs from the canonical map $X\to X^{\prime\prime}$. In finite dimension $J_X$ is onto.`,proof:R`The dual basis spans $X^{\prime}$ because every functional is determined by its values on the $e_i$. Thus $\dim X^{\prime}=\dim X^{\prime\prime}=\dim X$. Since $J_X$ is injective, it is surjective.`}
    ],
    examples:[
      {title:'Make a norming functional by hand',task:R`Take $x=(2,-3)$ in $(\mathbb R^2,\|\cdot\|_1)$.`,steps:[R`Define $\varphi(a,b)=a-b$.`,R`For every $(a,b)$, $|a-b|\leq |a|+|b|$, so $\|\varphi\|\leq1$. Testing $(1,0)$ gives $\|\varphi\|=1$.`,R`Finally, $\varphi(2,-3)=5=\|(2,-3)\|_1$.`]},
      {title:'Separate a point from a subspace',task:R`Let $M$ be closed and $x_0\notin M$. Produce a functional vanishing on $M$ but not at $x_0$.`,steps:[R`Closedness ensures $d=\operatorname{dist}(x_0,M)>0$.`,R`Define $g(m+\lambda x_0)=\lambda$ on $M+\mathbb Kx_0$ and prove $|g(y)|\leq\|y\|/d$.`,R`Extend and normalize to get $\|\varphi\|=1$, $\varphi|_M=0$, and $\varphi(x_0)=d$.`]},
      {title:'An unbounded algebraic functional',task:R`On polynomials with the supremum norm, consider $D(p)=p'(1)$.`,steps:[R`The map $D$ is linear.`,R`For $p_n(t)=t^n$, $\|p_n\|_\infty=1$ but $D(p_n)=n$.`,R`Thus $D$ is unbounded on the unit ball and does not belong to the continuous dual.`]}
    ],
    recipes:[
      {goal:'Extend a functional',steps:[R`Specify the subspace $M$ and compute $\|f\|_{M^{\prime}}$.`,R`Apply Hahn–Banach with $p(x)=\|f\|\|x\|$.`,R`Use restriction to prove the extension has exactly the same norm.`],trap:'The extension usually is not unique.'},
      {goal:'Find a norming functional',steps:[R`For $x\neq0$, define $f(\lambda x)=\lambda\|x\|$.`,R`Check $\|f\|=1$ on $\mathbb Kx$.`,R`Extend it and evaluate at $x$.`],trap:'The theorem is commonly stated for a nonzero vector.'},
      {goal:'Separate a point from a subspace',steps:[R`Verify the subspace is closed so the distance $d$ is positive.`,R`Define $g(m+\lambda x_0)=\lambda$ on $M+\mathbb Kx_0$.`,R`Estimate $\|g\|=1/d$, extend, and normalize.`],trap:'If $M$ is not closed, an outside point may have distance zero.'}
    ],
    quiz:[
      {q:'Which dual is always Banach?',choices:['The original space $X$.',R`The continuous dual $X^{\prime}$.`,'The algebraic dual with an unspecified norm.'],answer:1,why:R`The scalar field is complete, so the bounded-operator space $\mathcal L(X,\mathbb K)$ is Banach.`},
      {q:'What does Hahn–Banach preserve?',choices:['Uniqueness of the extension.','The norm of the functional.','Surjectivity of the functional.'],answer:1,why:'A continuous functional extends without increasing its norm.'},
      {q:'Which map is canonical?',choices:[R`A basis-induced map $X\to X^{\prime}$.`,R`The evaluation map $J_X:X\to X^{\prime\prime}$.`,'Any inner-product identification.'],answer:1,why:'Evaluation does not depend on a basis or inner product.'}
    ],lab:'dual'
  }
];

window.CURRICULUM.sort((a,b)=>['Norms and geometry','Completeness and Baire','Duality and separation','Automatic continuity','Weak topologies','Reflexive spaces'].indexOf(a.short)-['Norms and geometry','Completeness and Baire','Duality and separation','Automatic continuity','Weak topologies','Reflexive spaces'].indexOf(b.short));

const lesson = name => window.CURRICULUM.find(c=>c.short===name);
lesson('Completeness and Baire').theorems.splice(2,0,{
  name:'Three families of Banach spaces',
  assumptions:R`Let $K$ be compact, $1\leq p\leq\infty$, $X$ normed, and $Y$ Banach.`,
  formula:R`$$C(K)\text{ with }\|\cdot\|_\infty,\qquad \ell^p,\qquad \mathcal L(X,Y)\text{ are Banach spaces}.$$`,
  meaning:'The choice of norm matters. A space of continuous functions can be incomplete under another norm.',
  proof:R`A uniform Cauchy sequence of continuous functions has a continuous uniform limit. An $\ell^p$ Cauchy sequence has coordinate limits; finite-sum estimates give norm convergence to a point in $\ell^p$. For operators, set $Tx=\lim_nT_nx$ and pass the operator-norm Cauchy estimate to the limit.`
});
lesson('Duality and separation').theorems.splice(2,0,{
  name:'Real analytic Hahn–Banach',
  assumptions:R`Let $X$ be a real vector space, $p:X\to\mathbb R$ sublinear, and $f:M\to\mathbb R$ linear with $f(m)\leq p(m)$ for every $m\in M$.`,
  formula:R`$$\exists F:X\to\mathbb R\text{ linear}:\quad F|_M=f,\qquad F(x)\leq p(x)\quad(x\in X).$$`,
  meaning:R`The norm-preserving extension theorem follows by choosing $p(x)=\|f\|\|x\|$.`,
  proof:R`To add $x_0\notin M$, put $\widetilde f(m+tx_0)=f(m)+tc$. Sublinearity makes the interval $\sup_m(f(m)-p(m-x_0))\leq c\leq\inf_n(p(n+x_0)-f(n))$ nonempty. Zorn's lemma extends through all directions.`
});
lesson('Duality and separation').theorems.splice(5,0,{
  name:'Separation of convex sets',
  assumptions:R`Let $C\subset X$ be nonempty, open, and convex, and let $x_0\notin C$.`,
  formula:R`$$\exists\varphi\in X^{\prime}\setminus\{0\},\ \alpha\in\mathbb R:\quad \operatorname{Re}\varphi(c)<\alpha\leq\operatorname{Re}\varphi(x_0)\quad(c\in C).$$`,
  meaning:'A closed convex set at positive distance from a point admits a normalized functional with a positive separation gap.',
  proof:R`Translate $C$ so it contains $0$ and form its Minkowski functional. It is finite and sublinear. Apply Hahn–Banach to a functional on the line through the translated $x_0$, then translate back. For a closed convex set, first thicken it by a small open ball.`
});
lesson('Weak topologies').theorems.splice(2,0,{
  name:'Bounded weak-star sequences',
  assumptions:R`Assume $X$ is Banach and $\varphi_n\stackrel{*}{\rightharpoonup}\varphi$ in $X^{\prime}$.`,
  formula:R`$$\sup_n\|\varphi_n\|_{X^{\prime}}<\infty.$$`,
  meaning:'Completeness of the predual is needed for this direct use of uniform boundedness.',
  proof:R`For each fixed $x\in X$, the scalar sequence $(\varphi_n(x))$ converges, hence is bounded. Apply uniform boundedness to $(\varphi_n)\subset\mathcal L(X,\mathbb K)$ on the Banach domain $X$.`
});

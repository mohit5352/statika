'use strict';
const fs = require('fs');
const path = require('path');
const EXP_PATH = path.join(__dirname, '../src/data/explanations.json');
const exp = JSON.parse(fs.readFileSync(EXP_PATH, 'utf8'));

// ─── DEMOGRAPHY 2023 ────────────────────────────────────────────────────────
exp.paper4.demography['2023'] = {

'3.1': `<h3><b>UPSC ISS Statistics Paper IV (2023) — Model Solution</b></h3><br>
<p><em>Reference: Chiang, C.L., The Life Table and its Applications (1984); Spiegelman, M., Introduction to Demography (1968).</em></p>

<h4><b>1. Life Table Functions: Mathematical Definitions</b></h4>
<ul>
  <li>$l_x$: Number of lives at exact age $x$ in a cohort starting with $l_0$ births. $l_0$ is the <em>radix</em> (usually 100,000).</li>
  <li>$d_x = l_x - l_{x+1}$: Number dying between exact ages $x$ and $x+1$.</li>
  <li>$q_x = d_x/l_x$: Probability that a person aged $x$ dies before reaching age $x+1$; $0 \\leq q_x \\leq 1$.</li>
  <li>$p_x = 1 - q_x = l_{x+1}/l_x$: Probability of surviving from age $x$ to $x+1$.</li>
  <li>$L_x = \\int_x^{x+1} l_t\\,dt \\approx (l_x + l_{x+1})/2$: Person-years lived in $[x, x+1)$.</li>
  <li>$T_x = \\int_x^\\infty l_t\\,dt = \\sum_{t \\geq x} L_t$: Total future person-years from age $x$ onward.</li>
  <li>$e_x^0 = T_x/l_x$: Complete expectation of life at age $x$; average future lifetime for a survivor at $x$.</li>
</ul>

<h4><b>2. Proof: $\\mu_x = -(1/l_x)(dl_x/dx)$</b></h4>
<p>Let $_{t}p_x = l_{x+t}/l_x$ = probability of surviving $t$ years from age $x$. Then:</p>
$$\\mu_{x+t} = -\\frac{1}{_{t}p_x}\\frac{d(_{t}p_x)}{dt} = -\\frac{l_x}{l_{x+t}}\\cdot\\frac{l_x'}{l_x}\\cdot \\ldots$$
<p>More directly, from the definition $dl_x = -l_x\\,\\mu_x\\,dx$ (mortality rate: deaths per survivor per unit age):</p>
$$\\mu_x = -\\frac{dl_x/dx}{l_x} = -\\frac{d}{dx}\\ln l_x$$
<p>This follows because $-d\\ln l_x/dx = -(1/l_x)(dl_x/dx) = \\mu_x$. ✓</p>
<p><b>Corollary:</b> $l_x = l_0 \\exp\\!\\left(-\\int_0^x \\mu_t\\,dt\\right)$, showing that $l_x$ is determined entirely by the force of mortality schedule.</p>`,

'3.2': `<h3><b>UPSC ISS Statistics Paper IV (2023) — Model Solution</b></h3><br>
<p><em>Reference: Spiegelman, M., Introduction to Demography (1968); Keyfitz, N. &amp; Caswell, H., Applied Mathematical Demography (2005).</em></p>

<h4><b>1. General Fertility Rate (GFR)</b></h4>
$$\\text{GFR} = \\frac{\\text{Total live births}}{\\text{Mid-year female population aged 15–49}} \\times 1000$$
<p><b>Merit:</b> Restricts denominator to women of reproductive age; more meaningful than CBR. <b>Demerit:</b> Does not account for age distribution within 15–49.</p>

<h4><b>2. Age-Specific Fertility Rate (ASFR)</b></h4>
$$\\text{ASFR}_x = \\frac{\\text{Births to women aged }[x, x+5)}{\\text{Female mid-year population aged }[x, x+5)} \\times 1000$$
<p><b>Merit:</b> Unaffected by age structure; reveals timing of fertility. <b>Demerit:</b> Gives 7 separate rates, not a single summary.</p>

<h4><b>3. Total Fertility Rate (TFR)</b></h4>
$$\\text{TFR} = 5 \\times \\frac{\\sum_x \\text{ASFR}_x}{1000} = 5 \\sum_x f_x$$
<p><b>Merit:</b> Single summary measure of the quantum of fertility; free of age-structure effects; allows cross-population and over-time comparison; TFR = 2.1 is replacement level. <b>Demerit:</b> Synthetic cohort measure; may not reflect actual completed fertility of any real cohort (tempo-quantum problem).</p>

<h4><b>4. Mathematical Relation: GRR vs TFR</b></h4>
<p>The GRR is the TFR restricted to female births only:</p>
$$\\text{GRR} = 5 \\sum_x f_x^F = 5 \\sum_x \\frac{\\text{Female births in age group }x}{\\text{Female population in age group }x}$$
<p>If $k$ = fraction of births that are female ($k \\approx 1/2.05 \\approx 0.488$):</p>
$$\\text{GRR} = k \\times \\text{TFR}$$
<p>This linear relation shows GRR $<$ TFR always, and GRR captures only female replacement (ignoring male fertility).</p>`,

'4.1': `<h3><b>UPSC ISS Statistics Paper IV (2023) — Model Solution</b></h3><br>
<p><em>Reference: Leslie, P.H., On the Use of Matrices in Certain Population Mathematics, Biometrika 33 (1945–46); Caswell, H., Matrix Population Models (2001); Keyfitz, N. &amp; Caswell, H., Applied Mathematical Demography (2005).</em></p>

<h4><b>1. Leslie Matrix Model: Framework</b></h4>
<p>Consider a female population divided into $k$ age classes of equal width $n$ years: $[0,n), [n,2n), \\ldots, [(k-1)n, kn)$. Let $\\mathbf{N}(t) = (N_1(t), N_2(t), \\ldots, N_k(t))^\\top$ be the column vector of female population in each age class at time $t$. The Leslie model is:</p>
$$\\mathbf{N}(t+1) = \\mathbf{L}\\,\\mathbf{N}(t)$$
<p>where $\\mathbf{L}$ is the $k \\times k$ Leslie matrix:</p>
$$\\mathbf{L} = \\begin{pmatrix} F_1 & F_2 & F_3 & \\cdots & F_{k-1} & F_k \\\\ s_1 & 0 & 0 & \\cdots & 0 & 0 \\\\ 0 & s_2 & 0 & \\cdots & 0 & 0 \\\\ \\vdots & & \\ddots & & & \\vdots \\\\ 0 & 0 & \\cdots & s_{k-1} & 0 & 0 \\end{pmatrix}$$

<h4><b>2. Parameters</b></h4>
<ul>
  <li>$F_i$ = <b>fecundity coefficient</b> for age class $i$: average daughters born (and surviving to first census) per female in age class $i$ per unit time.</li>
  <li>$s_i$ = <b>survival probability</b> for age class $i$: probability of surviving from age class $i$ to class $i+1$ in one time step.</li>
</ul>
$$F_i = n\\, _nf_i\\, \\left(\\frac{n L_1}{2 l_1}\\right), \\quad s_i = \\frac{_n L_{(i+1)n}}{_n L_{in}}$$
<p>where $_n f_i$ is the age-specific maternity function (female births per woman per year in class $i$) and $_n L$ are life table person-years.</p>

<h4><b>3. Iterative Projection</b></h4>
$$\\mathbf{N}(t) = \\mathbf{L}^t \\mathbf{N}(0)$$
<p>The dominant eigenvalue $\\lambda_1$ of $\\mathbf{L}$ gives the long-run geometric growth rate: $N_{\\text{total}}(t+1)/N_{\\text{total}}(t) \\to \\lambda_1$. The corresponding eigenvector $\\mathbf{w}_1$ gives the <b>stable age distribution</b>.</p>

<h4><b>4. Relation to Continuous Stable Population Theory</b></h4>
<p>For small $n$: $\\lambda_1 = e^{rn}$ where $r$ is Lotka's intrinsic rate. The characteristic equation $\\det(\\mathbf{L} - \\lambda_1 \\mathbf{I}) = 0$ is the discrete-time analogue of the Euler-Lotka equation.</p>`,

'4.2': `<h3><b>UPSC ISS Statistics Paper IV (2023) — Model Solution</b></h3><br>
<p><em>Reference: Pearl, R. &amp; Reed, L.J., PNAS 6 (1920); Verhulst, P.F. (1845); Keyfitz, N., Introduction to the Mathematics of Population (1968).</em></p>

<h4><b>1. The Logistic Growth Model</b></h4>
$$N_t = \\frac{K}{1 + e^{a+bt}}, \\quad b < 0, \\; K > 0$$
<p>This is the Pearl-Verhulst logistic curve. $K$ = upper asymptote (saturation level), $a$ = scale parameter (determines horizontal location), $b < 0$ = slope (rate of approach to $K$).</p>

<h4><b>2. Properties</b></h4>
<ul>
  <li><b>Asymptotes:</b> $\\lim_{t \\to -\\infty} N_t = 0$; $\\lim_{t \\to +\\infty} N_t = K$.</li>
  <li><b>Point of inflection:</b> At $N = K/2$; $t^* = -a/b$. Maximum growth rate = $rK/4$.</li>
  <li><b>Symmetry:</b> The curve is symmetric about $(t^*, K/2)$.</li>
  <li><b>S-shaped:</b> Slow initial growth → accelerating phase → decelerating approach to $K$.</li>
  <li><b>Growth rate:</b> $dN/dt = r N(1 - N/K) = 0$ at $N = 0$ and $N = K$; maximum at $N = K/2$.</li>
  <li><b>Three parameters:</b> $K$ (capacity), $a$ (location), $b$ (rate) — all deterministic from three observations.</li>
</ul>

<h4><b>3. Fitting the Logistic (Pearl-Reed Three-Point Method)</b></h4>
<p>Using three equally spaced observations $(t_0, N_0)$, $(t_1, N_1)$, $(t_2, N_2)$ with spacing $n = t_1 - t_0 = t_2 - t_1$:</p>
$$K = \\frac{2N_0 N_1 N_2 - N_1^2(N_0 + N_2)}{N_0 N_2 - N_1^2}$$
$$a = \\ln\\frac{K - N_0}{N_0} - b\\,t_0, \\quad b = \\frac{1}{n}\\ln\\frac{N_0(K - N_1)}{N_1(K - N_0)}$$

<h4><b>4. Applications to Demography</b></h4>
<ul>
  <li><b>Population forecasting:</b> Useful when approach to a saturation level is expected (urbanising areas, island populations).</li>
  <li><b>Contraceptive adoption:</b> Adoption rates of new contraceptives follow S-shaped diffusion curves.</li>
  <li><b>Diffusion models:</b> Technology adoption, epidemic propagation, economic growth models.</li>
  <li><b>Limitation:</b> Assumes a fixed carrying capacity $K$; demographic transitions and migrations may violate this assumption.</li>
</ul>`

}; // end demography 2023

// ─── SQC 2023 ────────────────────────────────────────────────────────────────
exp.paper4.sqc['2023'] = {

'7.1': `<h3><b>UPSC ISS Statistics Paper IV (2023) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., Introduction to Statistical Quality Control (8th ed., 2020); Shewhart, W.A., Economic Control of Quality (1931).</em></p>

<h4><b>1. Statistical Principles of Shewhart Control Charts</b></h4>
<p>Shewhart control charts are based on two statistical principles:</p>
<p><b>(a) Rational subgrouping:</b> Samples (subgroups) are chosen so that variation within each subgroup reflects only common cause (chance) variation, while between-subgroup variation also captures any shift in the process parameter.</p>
<p><b>(b) Three-sigma criterion:</b> Under the null hypothesis that the process is in control with mean $\\mu$ and standard deviation $\\sigma_W$ for the plotted statistic $W$:</p>
$$\\text{UCL} = \\mu_W + 3\\sigma_W, \\quad \\text{CL} = \\mu_W, \\quad \\text{LCL} = \\mu_W - 3\\sigma_W$$
<p>If $W \\sim N(\\mu_W, \\sigma_W^2)$: $P(\\text{false alarm}) = P(|W-\\mu_W| > 3\\sigma_W) = 2\\Phi(-3) = 0.0027$.</p>

<h4><b>2. OC Curve for an $\\bar{X}$-Chart</b></h4>
<p>Suppose the process mean shifts from $\\mu_0$ to $\\mu_0 + \\delta\\sigma/\\sqrt{n}$. The probability of failing to detect the shift on a single sample (Type II error = $\\beta$):</p>
$$\\beta = P(-3 \\leq Z \\leq 3 - \\delta\\sqrt{n}/\\sigma_n) \\approx \\Phi(3-\\delta) - \\Phi(-3-\\delta)$$
<p>The <b>Operating Characteristic (OC) curve</b> plots $\\beta$ against the shift $\\delta$ (or standardized shift $\\lambda = \\delta/\\sigma$). It shows that for $\\delta = 0$ (no shift): $\\beta = 1 - 0.0027 = 0.9973$; as $|\\delta| \\to \\infty$: $\\beta \\to 0$.</p>

<h4><b>3. Average Run Length (ARL)</b></h4>
<p>The ARL is the expected number of samples until the chart signals. It is related to the detection probability $p$ (probability of a signal on a given sample) by the Geometric distribution:</p>
$$\\text{ARL} = E[R] = \\frac{1}{p}$$
<p><b>In-control ARL:</b> $p_0 = 0.0027$ (false alarm rate); $\\text{ARL}_0 = 1/0.0027 \\approx 370$.</p>
<p><b>Out-of-control ARL:</b> $p = 1 - \\beta$; $\\text{ARL}_1 = 1/(1-\\beta)$.</p>
<p>For a $1\\sigma$ shift ($\\delta = 1$, $n=5$):</p>
$$\\beta = \\Phi(3-\\sqrt{5}) - \\Phi(-3-\\sqrt{5}) = \\Phi(0.764) \\approx 0.778$$
$$\\text{ARL}_1 = 1/(1-0.778) = 1/0.222 \\approx 4.5 \\text{ samples}$$`,

'7.2': `<h3><b>UPSC ISS Statistics Paper IV (2023) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., Introduction to Statistical Quality Control (8th ed., 2020); Roberts, S.W., Technometrics 1 (1959); Hunter, J.S., JASA 81 (1986).</em></p>

<h4><b>1. EWMA Chart Formulation</b></h4>
<p>The EWMA statistic at time $i$ is a geometrically weighted average of all past observations:</p>
$$Z_i = \\lambda X_i + (1-\\lambda)Z_{i-1}, \\quad Z_0 = \\mu_0, \\quad \\lambda \\in (0,1]$$
<p>Expanding recursively: $Z_i = \\lambda\\sum_{j=0}^{i-1}(1-\\lambda)^j X_{i-j} + (1-\\lambda)^i Z_0$ — each observation is weighted by $\\lambda(1-\\lambda)^j$ (exponentially decreasing with age).</p>

<h4><b>2. Mean and Variance of $Z_i$</b></h4>
<p>Under the in-control model $X_i \\sim \\text{i.i.d.} N(\\mu_0, \\sigma^2)$:</p>
$$E[Z_i] = \\mu_0 \\quad \\text{(unbiased)}$$
$$\\text{Var}(Z_i) = \\sigma^2 \\frac{\\lambda}{2-\\lambda}\\left[1 - (1-\\lambda)^{2i}\\right]$$
<p>As $i \\to \\infty$: $\\text{Var}(Z_i) \\to \\sigma^2\\lambda/(2-\\lambda)$ (asymptotic variance).</p>

<h4><b>3. Control Limits</b></h4>
<p><b>Exact (time-varying) limits:</b></p>
$$\\text{UCL}_i = \\mu_0 + L\\sigma\\sqrt{\\frac{\\lambda}{2-\\lambda}\\left[1-(1-\\lambda)^{2i}\\right]}, \\quad \\text{LCL}_i = \\mu_0 - \\cdots$$
<p><b>Asymptotic (steady-state) limits:</b></p>
$$\\text{UCL} = \\mu_0 + L\\sigma\\sqrt{\\frac{\\lambda}{2-\\lambda}}, \\quad \\text{LCL} = \\mu_0 - L\\sigma\\sqrt{\\frac{\\lambda}{2-\\lambda}}$$
<p>where $L$ is chosen to achieve the desired ARL$_0$ (typically $L = 2.7$–$3.0$).</p>

<h4><b>4. Properties and Choice of $\\lambda$</b></h4>
<ul>
  <li>Small $\\lambda$ (e.g., 0.05–0.1): heavy weight on past observations → more smoothing → sensitive to very small shifts.</li>
  <li>Large $\\lambda$ (approaching 1): $Z_i \\approx X_i$ → reduces to Shewhart $\\bar{X}$-chart.</li>
  <li>EWMA is optimal (minimum variance unbiased estimator) for detecting a step shift of $\\delta\\sigma$ when $\\lambda = \\delta^2/(\\delta^2 + 2)$ (Hunter, 1986).</li>
  <li>For $\\lambda = 0.2$, EWMA and CUSUM have comparable ARL performance for small-to-moderate shifts.</li>
</ul>`,

'8.1': `<h3><b>UPSC ISS Statistics Paper IV (2023) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., ISQC (8th ed., 2020); Schilling &amp; Neubauer, Acceptance Sampling (3rd ed., 2017).</em></p>

<h4><b>1. Single Sampling Plan (SSP): OC Function</b></h4>
<p>An SSP $(n, c)$ accepts a lot if the number of defectives $D \\leq c$. The OC function:</p>
$$P_a(p) = P(D \\leq c \\mid n, p) = \\sum_{d=0}^c \\binom{n}{d} p^d(1-p)^{n-d}$$
<p>For large $n$, small $p$: Poisson approximation $P_a(p) \\approx \\sum_{d=0}^c e^{-np}(np)^d/d!$</p>
<p>Key properties of the OC curve:</p>
<ul>
  <li>$P_a(0) = 1$ (all lots with zero defectives accepted)</li>
  <li>$P_a(1) = 0$ (all lots with 100% defective rejected)</li>
  <li>Steepness increases with $n$ for fixed $c/n$</li>
  <li>AQL = $p_1$ where $P_a(p_1) = 1-\\alpha$; LTPD = $p_2$ where $P_a(p_2) = \\beta$</li>
</ul>

<h4><b>2. Design of SSP: Two-Point OC Approach</b></h4>
<p>Given AQL $= p_1$ with producer's risk $\\alpha = 0.05$ and LTPD $= p_2$ with consumer's risk $\\beta = 0.10$:</p>
<p>Using Poisson approximation: find $n$ and $c$ such that:</p>
$$\\sum_{d=0}^c \\frac{e^{-np_1}(np_1)^d}{d!} = 1-\\alpha = 0.95 \\quad \\text{and} \\quad \\sum_{d=0}^c \\frac{e^{-np_2}(np_2)^d}{d!} = \\beta = 0.10$$
<p>This requires: ratio $\\lambda_2/\\lambda_1 = np_2/np_1 = p_2/p_1$ matches tabulated OC curve ratios for acceptance number $c$.</p>

<h4><b>3. AOQ and AOQL</b></h4>
$$\\text{AOQ}(p) \\approx p \\cdot P_a(p) \\quad (N \\text{ large})$$
<p>The AOQL is the maximum of AOQ$(p)$. Both $P_a$ and AOQ are fundamental to the economic evaluation of acceptance sampling systems.</p>`,

'8.2': `<h3><b>UPSC ISS Statistics Paper IV (2023) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., ISQC (8th ed., 2020); Cpm: Chan, Cheng &amp; Spiring, JQT 20 (1988).</em></p>

<h4><b>1. Process Capability Index $C_p$</b></h4>
$$C_p = \\frac{\\text{USL} - \\text{LSL}}{6\\sigma}$$
<p>Measures the <em>potential</em> capability — the ratio of specification width to process spread. Requires $C_p \\geq 1$ for a process to theoretically fit within specs. Does NOT account for process centering.</p>

<h4><b>2. Process Capability Index $C_{pk}$</b></h4>
$$C_{pk} = \\min\\!\\left(\\frac{\\text{USL}-\\mu}{3\\sigma},\\; \\frac{\\mu-\\text{LSL}}{3\\sigma}\\right) = C_p(1 - k)$$
<p>where $k = |\\mu - M|/d$, $M = (\\text{USL}+\\text{LSL})/2$ is the spec midpoint, $d = (\\text{USL}-\\text{LSL})/2$.</p>
<p>$C_{pk}$ accounts for off-centering: when $\\mu = M$ (centered), $C_{pk} = C_p$. When $\\mu \\neq M$: $C_{pk} < C_p$.</p>

<h4><b>3. How $C_{pk}$ Accounts for Off-Centre Position</b></h4>
<p>Suppose $\\text{USL} = 10$, $\\text{LSL} = 4$, $\\sigma = 1$, $\\mu = 8$:</p>
$$C_p = \\frac{10-4}{6} = 1.0$$
$$C_{pk} = \\min\\!\\left(\\frac{10-8}{3},\\frac{8-4}{3}\\right) = \\min(0.667, 1.333) = 0.667$$
<p>Here $C_p = 1$ but $C_{pk} = 0.667 < 1$ — the process is shifted toward USL and will produce nonconforming items above the upper specification.</p>

<h4><b>4. Process Capability Index $C_{pm}$ (Taguchi Index)</b></h4>
$$C_{pm} = \\frac{\\text{USL}-\\text{LSL}}{6\\tau}, \\quad \\tau = \\sqrt{\\sigma^2 + (\\mu-T)^2}$$
<p>where $T$ is the target value. $C_{pm}$ penalises both variability AND deviation from target — consistent with Taguchi's loss function philosophy. When $T = M$ (target = spec midpoint): $C_{pm} \\leq C_p$ always; $C_{pm} < C_{pk}$ when process is off-target. All three indices are related: $C_{pm} \\leq C_{pk} \\leq C_p$.</p>`

}; // end sqc 2023

// ─── DEMOGRAPHY 2021 ────────────────────────────────────────────────────────
exp.paper4.demography['2021'] = {

'3.1': `<h3><b>UPSC ISS Statistics Paper IV (2021) — Model Solution</b></h3><br>
<p><em>Reference: Spiegelman, M., Introduction to Demography (1968); Keyfitz, N. &amp; Caswell, H., Applied Mathematical Demography (3rd ed., 2005).</em></p>

<h4><b>1. Mathematical Distinction: NRR vs GRR</b></h4>
<p><b>GRR</b> (Gross Reproduction Rate): Expected number of daughters per woman, ignoring mortality:</p>
$$\\text{GRR} = \\int_\\alpha^\\beta f(x)\\, dx \\approx 5\\sum_x \\text{FASFR}_x / 1000$$
<p><b>NRR</b> (Net Reproduction Rate): Expected number of daughters per woman, <em>accounting for female mortality</em>:</p>
$$\\text{NRR} = \\int_\\alpha^\\beta f(x)\\,p(x)\\, dx \\approx 5\\sum_x \\text{FASFR}_x \\cdot p_x / 1000$$
<p>where $p(x) = l_x/l_0$ is the probability of a female surviving from birth to age $x$.</p>
<p>The fundamental relationship: $\\text{NRR} = \\text{GRR} \\cdot \\bar{p}$ where $\\bar{p}$ is the weighted average survival to childbearing ages. Since $\\bar{p} < 1$ (some women die before completing reproduction): <b>NRR $<$ GRR always</b>.</p>

<h4><b>2. When NRR = GRR?</b></h4>
<p>NRR = GRR only if $p(x) = 1$ for all reproductive ages $x \\in [\\alpha, \\beta]$ — i.e., no female mortality before age 50. This is impossible in practice. In countries with very low female mortality (e.g., Japan, with life expectancy = 87), NRR $\\approx$ GRR (difference $<$ 5%).</p>

<h4><b>3. NRR as Population Growth Indicator</b></h4>
<ul>
  <li><b>NRR $> 1$:</b> Population growing — each generation of mothers is more than replaced.</li>
  <li><b>NRR $= 1$:</b> Exact replacement level — stationary population in the long run (if sustained).</li>
  <li><b>NRR $< 1$:</b> Population declining — each generation of mothers is less than replaced.</li>
</ul>

<h4><b>4. Real-Life Demographic Conditions</b></h4>
<p>Cases where the distinction matters most:</p>
<ul>
  <li><b>High mortality contexts</b> (historical Europe, contemporary sub-Saharan Africa): GRR $>>$ NRR; high fertility does not necessarily translate to population growth.</li>
  <li><b>Low mortality, low fertility countries</b> (Korea, Japan, Germany): NRR $<$ 1 despite positive GRR; population ageing and decline.</li>
  <li><b>HIV/AIDS settings:</b> Elevated female adult mortality causes NRR to drop sharply even if GRR is unchanged.</li>
</ul>`,

'3.2': `<h3><b>UPSC ISS Statistics Paper IV (2021) — Model Solution</b></h3><br>
<p><em>Reference: Chiang, C.L., The Life Table and its Applications (1984); Keyfitz, N. &amp; Caswell, H. (2005).</em></p>

<h4><b>1. Constructing a Complete Life Table</b></h4>
<p>Starting data: age-specific death rates $m_x = D_x/P_x$ from population statistics. Steps:</p>
<ol>
  <li><b>Convert $m_x$ to $q_x$:</b> Under UDD: $q_x = m_x/(1 + \\frac{1}{2}m_x)$ [Reed-Merrell]; or $q_x = 1 - e^{-m_x}$ [constant force].</li>
  <li><b>Initialise radix:</b> $l_0 = 100,000$. Special age-0 formula: $q_0$ from infant mortality rate.</li>
  <li><b>Compute $l_x$:</b> $l_{x+1} = l_x(1-q_x)$ for $x = 0, 1, 2, \\ldots$</li>
  <li><b>Compute $d_x$:</b> $d_x = l_x - l_{x+1} = l_x q_x$.</li>
  <li><b>Compute $p_x$:</b> $p_x = 1 - q_x = l_{x+1}/l_x$.</li>
  <li><b>Compute $L_x$:</b> $L_x = l_x - (1-a_x)d_x \\approx (l_x + l_{x+1})/2$ for adult ages; $L_0 = l_0 - (1-a_0)d_0$ with $a_0 \\approx 0.1$–$0.3$.</li>
  <li><b>Compute $T_x$:</b> Working from the terminal age downward: $T_\\omega = L_\\omega$; $T_x = T_{x+1} + L_x$.</li>
  <li><b>Compute $e_x^0$:</b> $e_x^0 = T_x/l_x$.</li>
</ol>

<h4><b>2. Relation Between $\\mu_x$ and $l_x$</b></h4>
$$\\mu_x = -\\frac{d}{dx}\\ln l_x = -\\frac{l_x'}{l_x}$$
<p>Proof: From $dl_x = -l_x \\mu_x dx$, divide both sides by $l_x$: $d(\\ln l_x)/dx = -\\mu_x$ → $\\mu_x = -(d/dx)\\ln l_x$ ✓</p>

<h4><b>3. Fundamental Formula Derivation: $p_x = \\exp(-\\int_x^{x+1}\\mu_t\\,dt)$</b></h4>
<p>Integrating $d(\\ln l_t) = -\\mu_t\\,dt$ from $x$ to $x+1$:</p>
$$\\ln l_{x+1} - \\ln l_x = -\\int_x^{x+1}\\mu_t\\,dt \\quad \\Rightarrow \\quad \\ln(l_{x+1}/l_x) = -\\int_x^{x+1}\\mu_t\\,dt$$
$$p_x = l_{x+1}/l_x = \\exp\\!\\left(-\\int_x^{x+1}\\mu_t\\,dt\\right)$$
<p style="color:green"><b>[Q.E.D.]</b></p>`,

'4.1': `<h3><b>UPSC ISS Statistics Paper IV (2021) — Model Solution</b></h3><br>
<p><em>Reference: Brass, W., Methods for Estimating Fertility and Mortality from Limited and Defective Data (1975); Coale, A.J. &amp; Demeny, P., Regional Model Life Tables and Stable Populations (1966).</em></p>

<h4><b>1. Brass Two-Parameter Logit System</b></h4>
<p>Brass (1975) proposed transforming survival probabilities using the <b>logit transformation</b>. Define:</p>
$$Y(x) = \\text{logit}[1 - l_x/l_0] = \\frac{1}{2}\\ln\\frac{1 - l_x/l_0}{l_x/l_0} = \\frac{1}{2}\\ln\\frac{q(x)}{p(x)}$$
<p>where $l_x^*$ = observed (target) survival; $l_x$ = standard (model) survival. The Brass system posits a linear relationship:</p>
$$\\text{logit}[1 - l_x^*/l_0^*] = \\alpha + \\beta \\cdot \\text{logit}[1 - l_x/l_0]$$
<p>i.e., $Y^*(x) = \\alpha + \\beta Y(x)$, where $\\alpha$ and $\\beta$ are the two Brass parameters.</p>

<h4><b>2. Interpretation of Parameters</b></h4>
<ul>
  <li><b>$\\alpha$ (level parameter):</b> Shifts the entire survival curve up or down — positive $\\alpha$ means higher mortality than the standard; negative $\\alpha$ means lower mortality. Controls life expectancy level.</li>
  <li><b>$\\beta$ (shape parameter):</b> Stretches or compresses the mortality age pattern — $\\beta > 1$ means faster mortality increase with age (older age mortality relatively higher); $\\beta < 1$ means flatter age pattern. When $\\beta = 1$, $\\alpha = 0$: the observed = standard life table.</li>
</ul>

<h4><b>3. Estimation</b></h4>
<p>With data on $l_x^*$ at several ages $x$ and a chosen standard $l_x$:</p>
<ol>
  <li>Compute $Y_x = \\text{logit}(1 - l_x/l_0)$ and $Y_x^* = \\text{logit}(1 - l_x^*/l_0^*)$.</li>
  <li>Fit $Y_x^* = \\alpha + \\beta Y_x$ by OLS: $\\hat{\\beta} = \\hat{s}_{YY^*}/\\hat{s}_{YY}$, $\\hat{\\alpha} = \\bar{Y}^* - \\hat{\\beta}\\bar{Y}$.</li>
  <li>Reconstruct the complete fitted life table from $\\hat{l}_x^* = 1/(1 + e^{2(\\hat{\\alpha}+\\hat{\\beta}Y_x)})$.</li>
</ol>

<h4><b>4. Advantages</b></h4>
<ul>
  <li>Requires only $\\alpha$ and $\\beta$ — two parameters for a complete life table.</li>
  <li>Handles incomplete data (only a few age-specific observations needed).</li>
  <li>Basis for many indirect mortality estimation methods in developing countries (Brass child mortality, adult mortality).</li>
</ul>`,

'4.2': `<h3><b>UPSC ISS Statistics Paper IV (2021) — Model Solution</b></h3><br>
<p><em>Reference: Lotka, A.J. (1939); Coale, A.J., The Growth and Structure of Human Populations (1972); Keyfitz, N. &amp; Caswell, H. (2005).</em></p>

<h4><b>1. Stable vs Stationary Population</b></h4>
<table border="1" cellpadding="5" style="border-collapse:collapse; width:100%;">
  <tr><th>Feature</th><th>Stable Population</th><th>Stationary Population</th></tr>
  <tr><td>Growth rate $r$</td><td>Constant $r$ (any value)</td><td>$r = 0$</td></tr>
  <tr><td>Size over time</td><td>$N(t) = N(0)e^{rt}$</td><td>Constant</td></tr>
  <tr><td>Age distribution</td><td>Fixed: $c(x) = b e^{-rx}p(x)$</td><td>Fixed: $c(x) = l_x/(l_0 e_0^0)$</td></tr>
  <tr><td>NRR</td><td>Any value</td><td>NRR = 1</td></tr>
  <tr><td>Birth rate $b$</td><td>$b = 1/\\int_0^\\infty e^{-rx}l_x dx$</td><td>$b = 1/e_0^0$</td></tr>
  <tr><td>Special case</td><td>General</td><td>Stable with $r=0$</td></tr>
</table>

<h4><b>2. Age Distribution in a Stable Population Growing at Rate $r$</b></h4>
<p><b>Derivation:</b> Let $B(t)$ be the birth rate at time $t$. In a stable population: $B(t) = B_0 e^{rt}$. The number of persons in age group $[x, x+dx)$ at time $t$ is:</p>
$$N(x, t)\\,dx = B(t-x)\\,p(x)\\,dx = B_0 e^{r(t-x)}\\,p(x)\\,dx$$
<p>Total population: $N(t) = \\int_0^\\infty B_0 e^{r(t-x)}\\,p(x)\\,dx = B_0 e^{rt}\\int_0^\\infty e^{-rx}\\,p(x)\\,dx$</p>
<p>The stable age <em>distribution</em> (proportion in $[x, x+dx)$):</p>
$$c(x) = \\frac{N(x,t)}{N(t)} = \\frac{B_0 e^{rt}\\,e^{-rx}\\,p(x)}{B_0 e^{rt}\\int_0^\\infty e^{-rx}\\,p(x)\\,dx} = \\frac{e^{-rx}\\,p(x)}{\\int_0^\\infty e^{-rx}\\,p(x)\\,dx}$$
<p>Writing $b = 1/\\int_0^\\infty e^{-rx}p(x)dx$ (crude birth rate of the stable population):</p>
$$\\boxed{c(x) = b\\,e^{-rx}\\,p(x)}$$
<p style="color:green"><b>[Q.E.D.]</b></p>
<p>This shows the stable age distribution is proportional to the life table survival curve $p(x)$ discounted by $e^{-rx}$. A faster-growing population ($r > 0$) has a younger age distribution (higher weight on small $x$).</p>`

}; // end demography 2021

// ─── SQC 2021 ────────────────────────────────────────────────────────────────
exp.paper4.sqc['2021'] = {

'7.1': `<h3><b>UPSC ISS Statistics Paper IV (2021) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., ISQC (8th ed., 2020); Page, E.S., Biometrika 41 (1954); Lucas &amp; Saccucci, Technometrics 32 (1990).</em></p>

<h4><b>1. CUSUM Chart Design and Monitoring</b></h4>
<p>The CUSUM chart detects small, sustained shifts in the process mean (typically $\\leq 1\\sigma$) that Shewhart charts miss. Design parameters: target $\\mu_0$, reference value $K$, decision interval $H$.</p>
<p><b>Optimal design:</b> For detecting a shift from $\\mu_0$ to $\\mu_1$:</p>
$$K = \\frac{\\mu_0 + \\mu_1}{2} \\quad \\text{(reference value — midpoint of target and shifted mean)}$$
$$H = h\\sigma \\quad \\text{where } h = 4\\text{–}5 \\text{ for ARL}_0 \\approx 370}$$

<h4><b>2. Tabular (Algorithmic) CUSUM</b></h4>
<p>Two one-sided CUSUMs:
$$C_i^+ = \\max(0,\\; X_i - (\\mu_0+K) + C_{i-1}^+), \\quad C_0^+ = 0$$
$$C_i^- = \\max(0,\\; (\\mu_0-K) - X_i + C_{i-1}^-), \\quad C_0^- = 0$$
<b>Signal:</b> Upward shift if $C_i^+ > H$; Downward shift if $C_i^- > H$.</p>

<h4><b>3. Algorithmic Steps</b></h4>
<ol>
  <li>Set $C_0^+ = C_0^- = 0$ and specify $\\mu_0$, $\\sigma$, $K$, $H$.</li>
  <li>At each sample $i$: observe $X_i$.</li>
  <li>Update $C_i^+ = \\max(0, X_i - (\\mu_0+K) + C_{i-1}^+)$.</li>
  <li>Update $C_i^- = \\max(0, (\\mu_0-K) - X_i + C_{i-1}^-)$.</li>
  <li>If $C_i^+ > H$: signal upward shift. Reset $C_i^+ = 0$ (or continue accumulating) and investigate.</li>
  <li>If $C_i^- > H$: signal downward shift. Same action.</li>
  <li>If no signal: continue to sample $i+1$.</li>
</ol>

<h4><b>4. ARL Performance</b></h4>
<p>With $K=0.5\\sigma$ and $H=5\\sigma$ (standard design for detecting $1\\sigma$ shift):</p>
<ul>
  <li>ARL$_0 \\approx 370$ (in-control — same as Shewhart)</li>
  <li>ARL$_1 \\approx 10.4$ for a $1\\sigma$ shift (vs. Shewhart ARL$_1 \\approx 44$)</li>
  <li>For a $0.5\\sigma$ shift: CUSUM ARL$_1 \\approx 38$ (vs. Shewhart $\\approx 155$)</li>
</ul>`,

'7.2': `<h3><b>UPSC ISS Statistics Paper IV (2021) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., ISQC (8th ed., 2020); Schilling &amp; Neubauer, Acceptance Sampling (3rd ed., 2017).</em></p>

<h4><b>1. Double Sampling Plan: Parameters and Procedure</b></h4>
<p>DSP parameters: lot size $N$, first sample $n_1$, second sample $n_2$, first acceptance number $c_1$, overall acceptance number $c_2$ ($c_1 \\leq c_2$).</p>
<p><b>Stage 1:</b> Inspect $n_1$ items; observe $d_1$ defectives.
<ul>
  <li>If $d_1 \\leq c_1$: Accept immediately.</li>
  <li>If $d_1 > c_2$: Reject immediately.</li>
  <li>If $c_1 < d_1 \\leq c_2$: Proceed to Stage 2.</li>
</ul>
<b>Stage 2:</b> Inspect $n_2$ items; observe $d_2$. Accept if $d_1+d_2 \\leq c_2$; else reject.</p>

<h4><b>2. OC Function</b></h4>
$$P_a = P_{a1} + P_{a2}$$
$$P_{a1} = P(D_1 \\leq c_1) = \\sum_{d=0}^{c_1}\\binom{n_1}{d}p^d(1-p)^{n_1-d}$$
$$P_{a2} = \\sum_{j=c_1+1}^{c_2} P(D_1=j)\\cdot P(D_2 \\leq c_2-j \\mid n_2, p)$$

<h4><b>3. ASN (Average Sample Number)</b></h4>
<p>Let $P_I = P(d_1 \\leq c_1) + P(d_1 > c_2)$ = probability of a Stage-1 decision:</p>
$$\\text{ASN}(p) = n_1 + n_2(1 - P_I)$$
<p>For very good lots ($p \\approx 0$): $P_I \\approx 1$ (almost always accept in Stage 1), ASN $\\approx n_1$.</p>
<p>For very bad lots ($p \\approx 1$): $P_I \\approx 1$ (almost always reject in Stage 1), ASN $\\approx n_1$.</p>
<p>For intermediate $p$: Stage 2 is required more often, ASN $\\approx n_1 + n_2$.</p>

<h4><b>4. ATI (Average Total Inspection)</b></h4>
$$\\text{ATI} = n_1 + n_2(1-P_I) + (N - n_1 - n_2)(1 - P_a)$$
<p>Rejected lots are 100% inspected ($N$ items); accepted lots only require the sample inspections.</p>`,

'8.1': `<h3><b>UPSC ISS Statistics Paper IV (2021) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., ISQC (8th ed., 2020); Chan, Cheng &amp; Spiring, JQT 20 (1988); Taguchi, G. (1986).</em></p>

<h4><b>1. Process Capability Indices: Algebraic Definitions</b></h4>
<p>For bilateral specifications with USL (upper specification limit), LSL (lower specification limit), process mean $\\mu$, standard deviation $\\sigma$, and target $T$:</p>
$$C_p = \\frac{\\text{USL}-\\text{LSL}}{6\\sigma} \\quad \\text{(potential capability, centered process)}$$
$$C_{pk} = \\min\\!\\left(\\frac{\\text{USL}-\\mu}{3\\sigma},\\; \\frac{\\mu-\\text{LSL}}{3\\sigma}\\right) \\quad \\text{(actual capability, off-center)}$$
$$C_{pm} = \\frac{\\text{USL}-\\text{LSL}}{6\\sqrt{\\sigma^2+(\\mu-T)^2}} \\quad \\text{(Taguchi capability, target-centered)}$$

<h4><b>2. Relationship to Fraction Nonconforming</b></h4>
<p>Under normality, fraction nonconforming (both tails):</p>
$$p_{nc} = \\Phi\\!\\left(-\\frac{\\text{USL}-\\mu}{\\sigma}\\right) + \\Phi\\!\\left(-\\frac{\\mu-\\text{LSL}}{\\sigma}\\right)$$
<p>For a centred process: $p_{nc} = 2\\Phi(-3C_p)$. For $C_p = 1$: $p_{nc} = 0.27\\%$; for $C_p = 1.33$: $p_{nc} = 64$ ppm; for $C_p = 2$: $p_{nc} = 2$ ppb (Six Sigma).</p>

<h4><b>3. Interpretation Table</b></h4>
<table border="1" cellpadding="5" style="border-collapse:collapse; width:100%;">
  <tr><th>$C_{pk}$</th><th>Process Status</th><th>Action</th></tr>
  <tr><td>$< 1.0$</td><td>Incapable</td><td>Immediately improve</td></tr>
  <tr><td>1.0–1.33</td><td>Marginally capable</td><td>Monitor closely</td></tr>
  <tr><td>1.33–2.0</td><td>Capable</td><td>Standard acceptance</td></tr>
  <tr><td>$\\geq 2.0$</td><td>World-class (Six Sigma)</td><td>Continue monitoring</td></tr>
</table>

<h4><b>4. $C_{pm}$ Advantage over $C_{pk}$</b></h4>
<p>$C_{pm}$ penalises both variability and deviation from the process target $T$ (not just spec midpoint), making it more aligned with Taguchi's quality loss function: $L(x) \\propto (x-T)^2$. It is more sensitive to target departure and is recommended when there is a nominal-the-best specification.</p>`,

'8.2': `<h3><b>UPSC ISS Statistics Paper IV (2021) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., ISQC (8th ed., 2020); Hotelling, H. (1931); Jackson, J.E., A User's Guide to Principal Components (1991).</em></p>

<h4><b>1. Hotelling's $T^2$ Chart: Background</b></h4>
<p>When $p \\geq 2$ correlated quality characteristics are monitored simultaneously, univariate Shewhart charts on each characteristic individually fail to account for the correlation structure. Monitoring all $p$ charts separately inflates the family-wise false alarm rate. Hotelling's $T^2$ chart provides a single statistic that accounts for the full correlation matrix.</p>

<h4><b>2. Formulation</b></h4>
<p>Let $\\mathbf{X}_i = (X_{i1}, X_{i2}, \\ldots, X_{ip})^\\top$ be the $p$-dimensional observation vector at time $i$. The Hotelling $T^2$ statistic:</p>
$$T_i^2 = (\\mathbf{X}_i - \\bar{\\mathbf{X}})^\\top \\mathbf{S}^{-1} (\\mathbf{X}_i - \\bar{\\mathbf{X}})$$
<p>where $\\bar{\\mathbf{X}} = \\frac{1}{m}\\sum_{i=1}^m \\mathbf{X}_i$ is the Phase I sample mean vector and $\\mathbf{S} = \\frac{1}{m-1}\\sum_{i=1}^m (\\mathbf{X}_i - \\bar{\\mathbf{X}})(\\mathbf{X}_i - \\bar{\\mathbf{X}})^\\top$ is the sample covariance matrix.</p>

<h4><b>3. Control Limit (Phase II — Monitoring)</b></h4>
<p>When the Phase I estimates are used for Phase II monitoring, the UCL is:</p>
$$\\text{UCL} = \\frac{p(m+1)(m-1)}{m(m-p)} F_{\\alpha; p, m-p}$$
<p>where $F_{\\alpha; p, m-p}$ is the $(1-\\alpha)$ quantile of the $F$-distribution. For large $m$, UCL $\\approx \\chi^2_{\\alpha; p}$ (chi-squared approximation).</p>

<h4><b>4. Signal and Decomposition</b></h4>
<p>Signal: $T_i^2 > \\text{UCL}$. To identify which characteristic(s) caused the signal, decompose $T_i^2$:</p>
$$T_i^2 = \\sum_{j=1}^p T_{ij}^2(\\text{conditional})$$
<p>or use principal component analysis on $\\mathbf{S}$. The diagnostic step determines corrective action.</p>`

}; // end sqc 2021

fs.writeFileSync(EXP_PATH, JSON.stringify(exp, null, 2));
console.log('Done: 2023 + 2021 written.');
console.log('JSON size (MB):', (JSON.stringify(exp).length/1024/1024).toFixed(2));

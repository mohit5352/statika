'use strict';
const fs = require('fs');
const path = require('path');

const EXP_PATH = path.join(__dirname, '../src/data/explanations.json');
const exp = JSON.parse(fs.readFileSync(EXP_PATH, 'utf8'));

if (!exp.paper4) exp.paper4 = {};
if (!exp.paper4.demography) exp.paper4.demography = {};
if (!exp.paper4.sqc) exp.paper4.sqc = {};

// ─── DEMOGRAPHY 2026 ────────────────────────────────────────────────────────

exp.paper4.demography['2026'] = {

'3.1': `<h3><b>UPSC ISS Statistics Paper IV (2026) — Model Solution</b></h3><br>
<p><em>Reference: Chiang, C.L., The Life Table and its Applications (1984); Spiegelman, M., Introduction to Demography (Rev. ed., 1968); Gupta &amp; Kapoor, Fundamentals of Applied Statistics.</em></p>

<h4><b>1. Central Mortality Rate $m_x$</b></h4>
<p>The <b>Central Mortality Rate</b> for age $x$, denoted $m_x$, is the ratio of the number of deaths occurring in the age interval $[x,\\, x+1)$ to the total person-years lived in that interval:</p>
$$m_x = \\frac{d_x}{L_x}$$
<p>where $d_x = l_x - l_{x+1}$ is the number of deaths between exact ages $x$ and $x+1$, and $L_x = \\int_x^{x+1} l_t\\, dt$ is the total person-years lived in $[x, x+1)$. It represents an <em>average</em> mortality rate over the age interval.</p>

<h4><b>2. Force of Mortality $\\mu_x$</b></h4>
<p>The <b>Force of Mortality</b> (or instantaneous death rate) at exact age $x$ is defined as the instantaneous rate of decrement of the survival function $l_x$:</p>
$$\\mu_x = -\\frac{1}{l_x}\\frac{dl_x}{dx} = -\\frac{d}{dx}\\ln l_x$$
<p>Equivalently, $\\mu_x\\,dt$ is approximately the probability that a life aged exactly $x$ dies within the next infinitesimal interval $dt$. It is always non-negative: $\\mu_x \\geq 0$.</p>

<h4><b>3. Derivation of $\\mu_{x+\\frac{1}{2}} = m_x$</b></h4>
<p><b>Necessary Assumption:</b> The force of mortality $\\mu_t$ is <em>constant</em> throughout the age interval $[x,\\, x+1)$, i.e., $\\mu_t = \\mu$ for all $t \\in [x, x+1)$. This is the <em>constant force assumption</em>.</p>
<p>Under this assumption:</p>
$$l_t = l_x\\, e^{-\\mu(t-x)}, \\quad t \\in [x,\\, x+1)$$
<p><b>Step 1: Compute $d_x$.</b></p>
$$d_x = l_x - l_{x+1} = l_x - l_x e^{-\\mu} = l_x(1 - e^{-\\mu})$$
<p><b>Step 2: Compute $L_x$.</b></p>
$$L_x = \\int_x^{x+1} l_t\\, dt = \\int_0^1 l_x e^{-\\mu s}\\, ds = \\frac{l_x(1-e^{-\\mu})}{\\mu}$$
<p><b>Step 3: Compute $m_x$.</b></p>
$$m_x = \\frac{d_x}{L_x} = \\frac{l_x(1-e^{-\\mu})}{l_x(1-e^{-\\mu})/\\mu} = \\mu$$
<p><b>Step 4: Identify $\\mu_{x+1/2}$.</b></p>
<p>Under the constant force assumption, $\\mu_t = \\mu$ for all $t \\in [x,x+1)$, so in particular:</p>
$$\\mu_{x+\\frac{1}{2}} = \\mu = m_x$$
<p style="color:green"><b>[Q.E.D.]</b></p>
<p><b>Remark:</b> Under the alternative <em>uniform distribution of deaths</em> (UDD) assumption, $L_x = (l_x + l_{x+1})/2$ and $\\mu_{x+1/2} \\approx d_x / L_x = m_x$ holds only approximately.</p>`,

'3.2': `<h3><b>UPSC ISS Statistics Paper IV (2026) — Model Solution</b></h3><br>
<p><em>Reference: Spiegelman, M., Introduction to Demography (1968); UN Demographic Methods; Gupta &amp; Kapoor, Fundamentals of Applied Statistics.</em></p>

<h4><b>Part (i): Crude Death Rate (CDR) and its Limitations</b></h4>
<p>The <b>Crude Death Rate</b> is the total number of deaths in a population per 1000 mid-year population:</p>
$$\\text{CDR} = \\frac{\\text{Total deaths in the year}}{\\text{Mid-year total population}} \\times 1000$$
<p><b>Limitations of CDR:</b></p>
<ul>
  <li><b>Age-structure bias:</b> CDR is heavily influenced by the age composition of the population. A younger population (like India) will have a lower CDR even if age-specific death rates are higher than in an older population (like Germany).</li>
  <li><b>Not comparable across populations:</b> Two populations with identical age-specific mortality but different age structures will have different CDRs, making direct comparison misleading.</li>
  <li><b>Ignores sex composition:</b> Differential mortality by sex is not captured.</li>
  <li><b>No diagnostic value:</b> It cannot identify which age groups are responsible for high or low mortality.</li>
  <li><b>Affected by socio-economic factors:</b> Urban vs. rural differences in age structure distort comparisons.</li>
</ul>

<h4><b>Part (ii): Standardized Death Rates (SDR)</b></h4>
<p>Standardized death rates eliminate the confounding effect of differing age structures by referring all rates to a common <b>standard population</b>. Two principal methods:</p>

<h4><b>Method 1: Direct Standardization</b></h4>
<p>Apply the observed age-specific death rates $m_x^{(A)}$ of population $A$ to the age distribution $P_x^{(S)}$ of a chosen standard population $S$:</p>
$$\\text{SDR}_{\\text{direct}} = \\frac{\\sum_x m_x^{(A)} \\cdot P_x^{(S)}}{\\sum_x P_x^{(S)}} \\times 1000$$
<p>This gives the death rate that population $A$ <em>would have had</em> if it possessed the age structure of $S$. It requires knowledge of age-specific rates for the study population.</p>

<h4><b>Method 2: Indirect Standardization (SMR Method)</b></h4>
<p>Apply the standard age-specific rates $m_x^{(S)}$ to the actual age distribution $P_x^{(A)}$ of population $A$ to obtain expected deaths $E$; compare with observed deaths $O$:</p>
$$\\text{SMR} = \\frac{O}{E} = \\frac{\\sum_x d_x^{(A)}}{\\sum_x m_x^{(S)} \\cdot P_x^{(A)}}$$
$$\\text{ISDR} = \\text{SMR} \\times \\text{CDR}^{(S)}$$
<p>Indirect method is preferred when age-specific rates for population $A$ are unstable or based on small numbers. An SMR $> 1$ indicates higher mortality than the standard; SMR $< 1$ indicates lower mortality.</p>`,

'3.3': `<h3><b>UPSC ISS Statistics Paper IV (2026) — Model Solution</b></h3><br>
<p><em>Reference: Spiegelman, M., Introduction to Demography (1968); Benjamin, B. &amp; Pollard, J.H., The Analysis of Mortality and Other Actuarial Statistics (1993).</em></p>

<h4><b>1. The Graduation Laws</b></h4>
<p><b>Gompertz's Law</b> (1825): $\\mu_x = Bc^x$, giving $l_x = k\\cdot s^{c^x}$ where $\\log l_x = \\log k + c^x \\log s$.</p>
<p><b>Makeham's Law</b> (1860): $\\mu_x = A + Bc^x$, giving $l_x = k\\cdot s^x \\cdot g^{c^x}$ where $\\log l_x = \\log k + x\\log s + c^x \\log g$.</p>
<p>Makeham adds a constant term $A$ representing age-independent hazard (accident, infection). To discriminate, we test the <b>second differences of $\\log l_x$</b> for geometric progression.</p>

<h4><b>2. Data and First Differences of $\\ln l_x$</b></h4>
<p>Using 5-year intervals ($n=5$):</p>
<table border="1" cellpadding="5" style="border-collapse:collapse; text-align:center; width:100%;">
  <tr><th>$x$</th><th>$l_x$</th><th>$L_x = \\ln l_x$</th><th>$D_x = L_{x+5}-L_x$</th></tr>
  <tr><td>35</td><td>89785</td><td>11.4047</td><td>$-$0.0400</td></tr>
  <tr><td>40</td><td>86237</td><td>11.3647</td><td>$-$0.0456</td></tr>
  <tr><td>45</td><td>82377</td><td>11.3191</td><td>$-$0.0543</td></tr>
  <tr><td>50</td><td>78018</td><td>11.2648</td><td>$-$0.0679</td></tr>
  <tr><td>55</td><td>72895</td><td>11.1969</td><td>$-$0.0898</td></tr>
  <tr><td>60</td><td>66666</td><td>11.1071</td><td>—</td></tr>
</table>

<h4><b>3. Test for Gompertz (Constant Ratio of $D_x$)</b></h4>
<p>For Gompertz's law, successive $D_x$ values must form a geometric series with ratio $c^5$:</p>
<table border="1" cellpadding="5" style="border-collapse:collapse; text-align:center; width:100%;">
  <tr><th>Ratio</th><th>Value</th></tr>
  <tr><td>$D_{40}/D_{35}$</td><td>$0.0456/0.0400 = 1.140$</td></tr>
  <tr><td>$D_{45}/D_{40}$</td><td>$0.0543/0.0456 = 1.191$</td></tr>
  <tr><td>$D_{50}/D_{45}$</td><td>$0.0679/0.0543 = 1.250$</td></tr>
  <tr><td>$D_{55}/D_{50}$</td><td>$0.0898/0.0679 = 1.322$</td></tr>
</table>
<p>The ratios are <b>not constant</b> (range 1.14 to 1.32). <b>Gompertz's law does not fit</b> this data.</p>

<h4><b>4. Test for Makeham (Constant Ratio of $\\Delta D_x$)</b></h4>
<p>Compute second differences $\\Delta D_x = D_{x+5} - D_x$:</p>
<table border="1" cellpadding="5" style="border-collapse:collapse; text-align:center; width:100%;">
  <tr><th>$\\Delta D_x$</th><th>Value</th><th>Ratio $\\Delta D_{x+5}/\\Delta D_x$</th></tr>
  <tr><td>$\\Delta D_{35}$</td><td>$-0.0456-(-0.0400) = -0.0056$</td><td>—</td></tr>
  <tr><td>$\\Delta D_{40}$</td><td>$-0.0543-(-0.0456) = -0.0087$</td><td>$0.0087/0.0056 = 1.554$</td></tr>
  <tr><td>$\\Delta D_{45}$</td><td>$-0.0679-(-0.0543) = -0.0136$</td><td>$0.0136/0.0087 = 1.563$</td></tr>
  <tr><td>$\\Delta D_{50}$</td><td>$-0.0898-(-0.0679) = -0.0219$</td><td>$0.0219/0.0136 = 1.610$</td></tr>
</table>
<p>The ratios of second differences are <b>approximately constant</b> ($\\approx 1.57$), consistent with $c^5 \\approx 1.57$, giving $c \\approx 1.57^{1/5} \\approx 1.095$. This is a typical Makeham constant.</p>

<h4><b>5. Conclusion</b></h4>
<p><b>Makeham's formula is more suitable</b> for the given data. The first differences $D_x$ do not form a geometric series (ruling out Gompertz), but the second differences $\\Delta D_x$ do form an approximate geometric series (supporting Makeham). This is consistent with the additional age-independent hazard term $A$ in Makeham's law, representing mortality from accidents and infections.</p>`,

'3.4': `<h3><b>UPSC ISS Statistics Paper IV (2026) — Model Solution</b></h3><br>
<p><em>Reference: Chiang, C.L., The Life Table and its Applications (1984); Keyfitz, N. &amp; Caswell, H., Applied Mathematical Demography (3rd ed., 2005).</em></p>

<h4><b>1. Definitions</b></h4>
<p>$l_x$ = number of survivors at exact age $x$ out of a birth cohort of $l_0$.</p>
<p>$p_x = l_{x+1}/l_x$ = probability that a person aged exactly $x$ survives to age $x+1$.</p>
<p>$\\mu_x$ = force of mortality at exact age $x$, defined by:</p>
$$\\mu_x = -\\frac{1}{l_x}\\frac{dl_x}{dx} \\quad \\Longleftrightarrow \\quad dl_x = -l_x\\,\\mu_x\\,dx$$

<h4><b>2. Differential Equation for $l_x$</b></h4>
<p>Separating variables in $dl_x = -l_x\\,\\mu_x\\,dx$:</p>
$$\\frac{dl_x}{l_x} = -\\mu_x\\,dx \\quad \\Longrightarrow \\quad d(\\ln l_x) = -\\mu_x\\,dx$$
<p>Integrating from $x$ to $x+1$:</p>
$$\\int_x^{x+1} d(\\ln l_t) = -\\int_x^{x+1} \\mu_t\\,dt$$
$$\\ln l_{x+1} - \\ln l_x = -\\int_x^{x+1} \\mu_t\\,dt$$
$$\\ln\\!\\left(\\frac{l_{x+1}}{l_x}\\right) = -\\int_x^{x+1} \\mu_t\\,dt$$

<h4><b>3. Expression for $p_x$</b></h4>
<p>Since $p_x = l_{x+1}/l_x$:</p>
$$\\boxed{p_x = \\exp\\!\\left(-\\int_x^{x+1} \\mu_t\\,dt\\right)}$$
<p style="color:green"><b>[Q.E.D.]</b></p>

<h4><b>4. Implications and Special Cases</b></h4>
<ul>
  <li><b>General statement:</b> $_t p_x = \\exp\\!\\left(-\\int_x^{x+t}\\mu_s\\,ds\\right)$, which gives the probability of surviving from $x$ to $x+t$.</li>
  <li><b>Constant force (Gompertz):</b> If $\\mu_t = \\mu$ over $[x, x+1)$, then $p_x = e^{-\\mu}$.</li>
  <li><b>Gompertz law:</b> $\\mu_x = Bc^x$, so $p_x = \\exp\\!\\left(-Bc^x(c-1)/\\ln c\\right) = g^{c^x}$ where $g = e^{-B(c-1)/\\ln c}$.</li>
  <li><b>Makeham law:</b> $\\mu_x = A + Bc^x$, so $p_x = s\\cdot g^{c^x}$ where $s = e^{-A}$.</li>
  <li><b>Complement:</b> $q_x = 1 - p_x = 1 - \\exp\\!\\left(-\\int_x^{x+1}\\mu_t\\,dt\\right)$.</li>
</ul>
<p>Under the <b>uniform distribution of deaths (UDD)</b> approximation: $\\mu_{x+t} \\approx q_x/(1 - t\\,q_x)$ and $p_x \\approx 1 - q_x$ (same result since $\\int_x^{x+1}\\mu_t\\,dt = -\\ln p_x$ always holds exactly).</p>`,

'3.5': `<h3><b>UPSC ISS Statistics Paper IV (2026) — Model Solution</b></h3><br>
<p><em>Reference: Spiegelman, M., Introduction to Demography (1968); Chiang, C.L., The Life Table and its Applications (1984).</em></p>

<h4><b>1. Life Table Column Relationships</b></h4>
<p>Every missing entry in a life table can be computed from adjacent columns using these fundamental identities:</p>
<ul>
  <li>$q_x = d_x / l_x$ — probability of death in $[x, x+1)$</li>
  <li>$p_x = 1 - q_x = l_{x+1}/l_x$ — probability of survival to $x+1$</li>
  <li>$l_{x+1} = l_x - d_x = l_x\\cdot p_x$</li>
  <li>$L_x \\approx (l_x + l_{x+1})/2$ — person-years lived (linear interpolation, valid for adult ages)</li>
  <li>$T_x = T_{x+1} + L_x$ — total future person-years from age $x$</li>
  <li>$e_x^0 = T_x / l_x$ — complete expectation of life at age $x$</li>
</ul>

<h4><b>2. Worked Example (Illustrating the Method)</b></h4>
<p>Suppose a portion of the life table gives:</p>
<table border="1" cellpadding="5" style="border-collapse:collapse; text-align:center; width:100%;">
  <tr><th>$x$</th><th>$l_x$</th><th>$d_x$</th><th>$p_x$</th><th>$q_x$</th><th>$L_x$</th><th>$T_x$</th><th>$e_x^0$</th></tr>
  <tr><td>49</td><td>90000</td><td>500</td><td>?</td><td>?</td><td>?</td><td>?</td><td>?</td></tr>
  <tr><td>50</td><td>?</td><td>600</td><td>?</td><td>?</td><td>?</td><td>300000</td><td>?</td></tr>
  <tr><td>51</td><td>?</td><td>?</td><td>?</td><td>?</td><td>?</td><td>?</td><td>?</td></tr>
</table>

<h4><b>3. Step-by-Step Computation</b></h4>
<p><b>Row $x = 49$:</b></p>
$$q_{49} = \\frac{d_{49}}{l_{49}} = \\frac{500}{90000} = 0.00556$$
$$p_{49} = 1 - 0.00556 = 0.99444$$
$$l_{50} = l_{49} - d_{49} = 90000 - 500 = 89500$$

<p><b>Row $x = 50$:</b></p>
$$q_{50} = \\frac{600}{89500} = 0.00670$$
$$p_{50} = 1 - 0.00670 = 0.99330$$
$$l_{51} = 89500 - 600 = 88900$$

<p><b>Compute $L_x$ (adult ages — linear interpolation):</b></p>
$$L_{49} = \\frac{l_{49} + l_{50}}{2} = \\frac{90000 + 89500}{2} = 89750$$
$$L_{50} = \\frac{l_{50} + l_{51}}{2} = \\frac{89500 + 88900}{2} = 89200$$

<p><b>Compute $T_x$ from $T_{50}$ (given = 300000):</b></p>
$$T_{49} = T_{50} + L_{49} = 300000 + 89750 = 389750$$

<p><b>Compute $e_x^0$:</b></p>
$$e_{49}^0 = \\frac{T_{49}}{l_{49}} = \\frac{389750}{90000} = 4.33 \\text{ years}$$
$$e_{50}^0 = \\frac{T_{50}}{l_{50}} = \\frac{300000}{89500} = 3.35 \\text{ years}$$

<h4><b>4. Completed Table</b></h4>
<table border="1" cellpadding="5" style="border-collapse:collapse; text-align:center; width:100%;">
  <tr><th>$x$</th><th>$l_x$</th><th>$d_x$</th><th>$p_x$</th><th>$q_x$</th><th>$L_x$</th><th>$T_x$</th><th>$e_x^0$</th></tr>
  <tr><td>49</td><td>90000</td><td>500</td><td>0.99444</td><td>0.00556</td><td>89750</td><td>389750</td><td>4.33</td></tr>
  <tr><td>50</td><td>89500</td><td>600</td><td>0.99330</td><td>0.00670</td><td>89200</td><td>300000</td><td>3.35</td></tr>
</table>
<p><em>Apply the identical algorithm to the specific numerical values given in the question paper.</em></p>`,

'4.1': `<h3><b>UPSC ISS Statistics Paper IV (2026) — Model Solution</b></h3><br>
<p><em>Reference: Spiegelman, M., Introduction to Demography (Rev. ed., 1968); Registrar General of India — Vital Statistics of India; Census of India; Births and Deaths Registration Act, 1969 (amended 2023).</em></p>

<h4><b>1. What is Vital Statistics?</b></h4>
<p><b>Vital Statistics</b> are the systematic collection, processing, analysis, and dissemination of data on <em>vital events</em> — those events which occur in the life of an individual from birth to death. The principal vital events are:</p>
<ul>
  <li>Live births and still births</li>
  <li>Deaths (including infant deaths, maternal deaths, foetal deaths)</li>
  <li>Marriages, divorces, annulments</li>
  <li>Adoptions, legitimations, recognitions</li>
  <li>Migrations (sometimes included)</li>
</ul>
<p>The term encompasses both the raw data and the derived rates and measures used for demographic analysis.</p>

<h4><b>2. Uses of Vital Statistics</b></h4>
<ul>
  <li><b>Population estimation:</b> Intercensal and postcensal estimates between census years using births, deaths, and migration data.</li>
  <li><b>Life table construction:</b> Age-specific death rates from vital registration form the basis of complete and abridged life tables.</li>
  <li><b>Health planning and policy:</b> Identification of disease burden, infant mortality rates, maternal mortality ratios guide resource allocation in public health.</li>
  <li><b>Fertility analysis:</b> Age-specific fertility rates (ASFR), TFR, GRR, NRR computed from birth registration data.</li>
  <li><b>Actuarial science and insurance:</b> Premium computation, annuity valuation and reserving require accurate mortality tables.</li>
  <li><b>Epidemiology:</b> Cause-specific death rates illuminate disease patterns and aid in surveillance of epidemics.</li>
  <li><b>Social legislation:</b> Proof of age, citizenship, inheritance, marriage rights — all require official registration of vital events.</li>
  <li><b>International comparisons:</b> WHO and UN use standardised vital statistics for cross-country comparison of mortality and fertility.</li>
  <li><b>Planning education and social services:</b> School-age population projections depend on birth registration data.</li>
</ul>

<h4><b>3. Registration Method (Civil Registration System — CRS)</b></h4>
<p>Under the <b>Registration of Births and Deaths Act, 1969</b> (amended 2023), every vital event must be registered within <b>21 days</b> of occurrence with the local Registrar. The Act is administered by the <b>Registrar General of India (RGI)</b> at the national level, with State Chief Registrars and district/village-level Registrars as sub-units.</p>
<p><b>Procedure:</b></p>
<ul>
  <li>A birth is reported by the head of household, attending physician, or midwife to the local registrar.</li>
  <li>The registrar issues a birth certificate; details are forwarded up the hierarchy to the RGI.</li>
  <li>Data are compiled annually into the <em>Vital Statistics of India</em> publication.</li>
</ul>
<p><b>Advantages:</b> Continuous data collection; provides individual-level attributes (sex, age of mother, cause of death); forms the denominator-free numerator for vital rates; legally mandatory.</p>
<p><b>Limitations:</b> Persistent <b>under-registration</b> in rural and tribal areas; delayed registration beyond 21 days; misclassification of cause of death; poor coverage for still births and infant deaths; literate urban bias.</p>
<p><em>Complementary system:</em> The <b>Sample Registration System (SRS)</b>, established by RGI in 1964–65, is a dual-record system (continuous enumeration + retrospective surveys) providing reliable fertility and mortality estimates at state and national levels. The SRS supplements CRS by correcting for under-registration.</p>

<h4><b>4. Census Method</b></h4>
<p>The <b>Census of India</b> is a decennial (every 10 years) complete enumeration of the entire population, carried out by the Office of the Registrar General and Census Commissioner of India. The last census was in 2011; the 2021 census was delayed.</p>
<p><b>Procedure:</b></p>
<ul>
  <li><b>Phase I (House-listing and Housing Census):</b> Listing of all houses, households, assets, and amenities.</li>
  <li><b>Phase II (Population Enumeration):</b> Individual-level data — age, sex, literacy, occupation, migration, religion, language, disability — collected by trained enumerators.</li>
</ul>
<p><b>Relevance to vital statistics:</b> Census provides the <em>denominator</em> for computing vital rates (CDR, CBR, IMR). It also collects retrospective data on births and deaths in the past year through the <em>householder schedule</em>.</p>
<p><b>Advantages:</b> Universal coverage; detailed socio-demographic variables; provides base population for intercensal estimates; cross-tabulation capability.</p>
<p><b>Limitations:</b> Periodic (not continuous); costly and resource-intensive; cannot capture events between censuses; subject to coverage error, content error, and response error; does not provide complete cause-of-death data.</p>

<h4><b>5. Comparison</b></h4>
<table border="1" cellpadding="5" style="border-collapse:collapse; width:100%;">
  <tr><th>Feature</th><th>Registration (CRS)</th><th>Census</th></tr>
  <tr><td>Frequency</td><td>Continuous</td><td>Decennial</td></tr>
  <tr><td>Events covered</td><td>Births, deaths, marriages</td><td>Population enumeration</td></tr>
  <tr><td>Coverage</td><td>Often incomplete</td><td>Complete (in principle)</td></tr>
  <tr><td>Primary use</td><td>Numerator of vital rates</td><td>Denominator of vital rates</td></tr>
</table>`,

'4.2': `<h3><b>UPSC ISS Statistics Paper IV (2026) — Model Solution</b></h3><br>
<p><em>Reference: Spiegelman, M., Introduction to Demography (1968); Keyfitz, N. &amp; Caswell, H., Applied Mathematical Demography (2005); Gupta &amp; Kapoor, Fundamentals of Applied Statistics.</em></p>

<h4><b>1. Definitions</b></h4>
<ul>
  <li>$\\text{GFR} = \\dfrac{\\text{Total births}}{\\text{Total female population (15–49)}} \\times 1000$</li>
  <li>$\\text{ASFR}_x = \\dfrac{\\text{Births to women aged } x \\text{ to } x+4}{\\text{Female population aged } x \\text{ to } x+4} \\times 1000$</li>
  <li>$\\text{TFR} = 5 \\times \\sum_x \\text{ASFR}_x / 1000$ (children per woman)</li>
  <li>$\\text{GRR} = 5 \\times \\sum_x \\text{FASFR}_x / 1000$ (daughters per woman; FASFR uses female births only)</li>
  <li>$\\text{NRR} = 5 \\times \\sum_x \\text{FASFR}_x \\cdot \\eta_x / 1000$ (net daughters, adjusted for female survival)</li>
</ul>

<h4><b>2. Tabulation of Data</b></h4>
<table border="1" cellpadding="4" style="border-collapse:collapse; text-align:center; font-size:0.92em; width:100%;">
  <tr><th>Age</th><th>Female Pop ($f_x$)</th><th>Total Births ($B_x$)</th><th>Female Births ($B_x^F$)</th><th>$\\eta_x$</th></tr>
  <tr><td>15–19</td><td>6210</td><td>129</td><td>64</td><td>0.92</td></tr>
  <tr><td>20–24</td><td>5430</td><td>235</td><td>115</td><td>0.90</td></tr>
  <tr><td>25–29</td><td>4580</td><td>215</td><td>105</td><td>0.87</td></tr>
  <tr><td>30–34</td><td>3970</td><td>158</td><td>78</td><td>0.86</td></tr>
  <tr><td>35–39</td><td>3600</td><td>125</td><td>65</td><td>0.84</td></tr>
  <tr><td>40–44</td><td>3050</td><td>33</td><td>18</td><td>0.83</td></tr>
  <tr><td>45–49</td><td>2705</td><td>7</td><td>3</td><td>0.81</td></tr>
  <tr><td><b>Total</b></td><td><b>29545</b></td><td><b>902</b></td><td><b>448</b></td><td>—</td></tr>
</table>

<h4><b>3. GFR</b></h4>
$$\\text{GFR} = \\frac{902}{29545} \\times 1000 = \\mathbf{30.53} \\text{ births per 1000 women (15–49)}$$

<h4><b>4. ASFR and TFR</b></h4>
<table border="1" cellpadding="4" style="border-collapse:collapse; text-align:center; width:100%;">
  <tr><th>Age</th><th>$\\text{ASFR}_x = B_x/f_x \\times 1000$</th></tr>
  <tr><td>15–19</td><td>$129/6210 \\times 1000 = 20.77$</td></tr>
  <tr><td>20–24</td><td>$235/5430 \\times 1000 = 43.28$</td></tr>
  <tr><td>25–29</td><td>$215/4580 \\times 1000 = 46.94$</td></tr>
  <tr><td>30–34</td><td>$158/3970 \\times 1000 = 39.80$</td></tr>
  <tr><td>35–39</td><td>$125/3600 \\times 1000 = 34.72$</td></tr>
  <tr><td>40–44</td><td>$33/3050 \\times 1000 = 10.82$</td></tr>
  <tr><td>45–49</td><td>$7/2705 \\times 1000 = 2.59$</td></tr>
  <tr><td><b>$\\sum$</b></td><td><b>198.92</b></td></tr>
</table>
$$\\text{TFR} = 5 \\times \\frac{198.92}{1000} = \\mathbf{0.995} \\text{ children per woman}$$

<h4><b>5. GRR</b></h4>
<p>Female ASFR: $\\text{FASFR}_x = B_x^F / f_x \\times 1000$:</p>
$$\\sum \\text{FASFR}_x = \\frac{64}{6210}+\\frac{115}{5430}+\\frac{105}{4580}+\\frac{78}{3970}+\\frac{65}{3600}+\\frac{18}{3050}+\\frac{3}{2705}$$
$$= 10.31+21.18+22.93+19.65+18.06+5.90+1.11 = 99.14 \\text{ per 1000}$$
$$\\text{GRR} = 5 \\times \\frac{99.14}{1000} = \\mathbf{0.496} \\text{ daughters per woman}$$

<h4><b>6. NRR</b></h4>
$$\\text{NRR} = 5 \\times \\frac{\\sum_x \\text{FASFR}_x \\cdot \\eta_x}{1000}$$
$$= 5 \\times \\frac{(10.31)(0.92)+(21.18)(0.90)+(22.93)(0.87)+(19.65)(0.86)+(18.06)(0.84)+(5.90)(0.83)+(1.11)(0.81)}{1000}$$
$$= 5 \\times \\frac{9.49+19.06+19.95+16.90+15.17+4.90+0.90}{1000} = 5 \\times \\frac{86.37}{1000} = \\mathbf{0.432}$$

<h4><b>7. Interpretation</b></h4>
<ul>
  <li><b>TFR = 0.995:</b> On average each woman bears fewer than 1 child over her reproductive lifetime — well below replacement level of 2.1.</li>
  <li><b>GRR = 0.496:</b> Each woman bears about 0.5 daughters on average.</li>
  <li><b>NRR = 0.432 &lt; 1:</b> The net reproduction rate below unity confirms the population is declining — each generation replaces itself only 43.2% of original size.</li>
</ul>`,

'4.3': `<h3><b>UPSC ISS Statistics Paper IV (2026) — Model Solution</b></h3><br>
<p><em>Reference: Spiegelman, M., Introduction to Demography (1968); Chiang, C.L., The Life Table and its Applications (1984); Gupta &amp; Kapoor, Fundamentals of Applied Statistics.</em></p>

<h4><b>Part (i): Life Table Values $l_x$ and $q_x$</b></h4>
<p>Given: $l_{80} = 16000$ and $d_x$ for $x = 80, 81, \\ldots, 86$ as: 5000, 3000, 2500, 2000, 1000, 1000, 500.</p>
<p>Using $l_{x+1} = l_x - d_x$ and $q_x = d_x/l_x$:</p>
<table border="1" cellpadding="5" style="border-collapse:collapse; text-align:center; width:100%;">
  <tr><th>$x$</th><th>$l_x$</th><th>$d_x$</th><th>$q_x = d_x/l_x$</th></tr>
  <tr><td>80</td><td>16000</td><td>5000</td><td>$5000/16000 = 0.3125$</td></tr>
  <tr><td>81</td><td>11000</td><td>3000</td><td>$3000/11000 = 0.2727$</td></tr>
  <tr><td>82</td><td>8000</td><td>2500</td><td>$2500/8000 = 0.3125$</td></tr>
  <tr><td>83</td><td>5500</td><td>2000</td><td>$2000/5500 = 0.3636$</td></tr>
  <tr><td>84</td><td>3500</td><td>1000</td><td>$1000/3500 = 0.2857$</td></tr>
  <tr><td>85</td><td>2500</td><td>1000</td><td>$1000/2500 = 0.4000$</td></tr>
  <tr><td>86</td><td>1500</td><td>500</td><td>$500/1500 = 0.3333$</td></tr>
</table>

<h4><b>Part (ii): Probability Calculations</b></h4>
<p>Persons: A (aged 81), B (aged 82), C (aged 83). Find 2-year survival probabilities:</p>
$$_2p_{81} = \\frac{l_{83}}{l_{81}} = \\frac{5500}{11000} = \\frac{1}{2} = 0.5000$$
$$_2p_{82} = \\frac{l_{84}}{l_{82}} = \\frac{3500}{8000} = \\frac{7}{16} = 0.4375$$
$$_2p_{83} = \\frac{l_{85}}{l_{83}} = \\frac{2500}{5500} = \\frac{5}{11} \\approx 0.4545$$

<h4><b>(1) All three alive after 2 years</b></h4>
<p>Assuming independence of lives:</p>
$$P(\\text{all alive}) = {}_2p_{81} \\times {}_2p_{82} \\times {}_2p_{83} = \\frac{1}{2} \\times \\frac{7}{16} \\times \\frac{5}{11} = \\frac{35}{352} \\approx \\mathbf{0.0994}$$

<h4><b>(2) At least one of the three alive after 2 years</b></h4>
$$P(\\text{at least one}) = 1 - P(\\text{none alive})$$
$$P(\\text{none alive}) = (1-{}_2p_{81})(1-{}_2p_{82})(1-{}_2p_{83}) = \\frac{1}{2} \\times \\frac{9}{16} \\times \\frac{6}{11} = \\frac{54}{352} = \\frac{27}{176}$$
$$P(\\text{at least one}) = 1 - \\frac{27}{176} = \\frac{149}{176} \\approx \\mathbf{0.8466}$$

<h4><b>(3) Exactly one of the three alive after 2 years</b></h4>
$$P(\\text{exactly one}) = {}_2p_{81}\\cdot(1-{}_2p_{82})\\cdot(1-{}_2p_{83}) + (1-{}_2p_{81})\\cdot{}_2p_{82}\\cdot(1-{}_2p_{83}) + (1-{}_2p_{81})\\cdot(1-{}_2p_{82})\\cdot{}_2p_{83}$$
$$= \\frac{1}{2}\\cdot\\frac{9}{16}\\cdot\\frac{6}{11} + \\frac{1}{2}\\cdot\\frac{7}{16}\\cdot\\frac{6}{11} + \\frac{1}{2}\\cdot\\frac{9}{16}\\cdot\\frac{5}{11}$$
$$= \\frac{54}{352} + \\frac{42}{352} + \\frac{45}{352} = \\frac{141}{352} \\approx \\mathbf{0.4006}$$

<h4><b>Verification</b></h4>
$$P(0)+P(1)+P(2)+P(3) = \\frac{54+141+122+35}{352} = \\frac{352}{352} = 1 \\checkmark$$`,

'4.4': `<h3><b>UPSC ISS Statistics Paper IV (2026) — Model Solution</b></h3><br>
<p><em>Reference: Bogue, D.J., Principles of Demography (1969); UN Recommendations on Statistics of International Migration (Rev. 1, 1998); Registrar General of India — Census of India Migration Data.</em></p>

<h4><b>1. Definition of Migration</b></h4>
<p><b>Migration</b> is a form of geographic or spatial mobility involving a change of usual place of residence. It is a component of population change alongside fertility and mortality:
$$P_{t+n} = P_t + B - D + I - E$$
where $B$ = births, $D$ = deaths, $I$ = in-migrants, $E$ = out-migrants.</p>

<h4><b>2. Internal Migration</b></h4>
<p>Internal migration involves movement <em>within the national boundaries</em> of a country, from one administrative/geographic unit to another, with a change in usual residence.</p>

<p><b>Classifications of Internal Migration:</b></p>
<ul>
  <li><b>By stream (direction):</b>
    <ul>
      <li><em>Rural to Urban (R–U):</em> The dominant stream in developing countries; driven by economic differentials, urbanisation. e.g., agricultural workers migrating to industrial cities.</li>
      <li><em>Urban to Rural (U–R):</em> Counter-urbanisation in developed countries; retirement migration, telecommuting.</li>
      <li><em>Rural to Rural (R–R):</em> Agricultural seasonal migration; movement to newly irrigated regions.</li>
      <li><em>Urban to Urban (U–U):</em> Inter-metropolitan migration; job-related transfers in the corporate sector.</li>
    </ul>
  </li>
  <li><b>By duration:</b>
    <ul>
      <li><em>Permanent migration:</em> Change of residence with no intention of return.</li>
      <li><em>Temporary/Semi-permanent:</em> Sojourners who intend to return — seasonal labourers, contract workers.</li>
      <li><em>Circular/Commuting:</em> Regular movement between residence and workplace without change of usual residence.</li>
    </ul>
  </li>
  <li><b>By distance:</b> Short-distance (inter-village, inter-district); long-distance (inter-state).</li>
  <li><b>By administrative unit:</b> Intra-district, inter-district, inter-divisional, inter-state.</li>
  <li><b>By cause:</b> Economic (employment), educational, marital (especially female marriage migration in India), forced/displacement (conflict, disaster).</li>
</ul>

<h4><b>3. International Migration</b></h4>
<p>International migration involves movement <em>across national borders</em> involving a change of country of usual residence.</p>
<ul>
  <li><b>Immigration:</b> Arrival of people from abroad; adds to population of destination country.</li>
  <li><b>Emigration:</b> Departure of residents; reduces population of origin country.</li>
</ul>

<p><b>UN Classification of International Migrants (1998 Recommendations):</b></p>
<ul>
  <li><b>Long-term migrants:</b> Persons who move to a country other than their usual residence for 12 months or more.</li>
  <li><b>Short-term migrants:</b> Those who change usual residence for 3–12 months (except travel, recreation, medical treatment, seasonal work).</li>
  <li><b>Tourists and visitors:</b> Stay less than 3 months; NOT counted as migrants.</li>
  <li><b>Refugees and asylum seekers:</b> Persons outside their country owing to well-founded fear of persecution (1951 Refugee Convention). Status determined by UNHCR.</li>
  <li><b>Undocumented/irregular migrants:</b> Those without valid authorisation; not counted in official statistics but estimated via census residual methods.</li>
  <li><b>Diaspora:</b> Persons with origin in a country but residing abroad; remittances link them to home country.</li>
</ul>

<h4><b>4. Demographic Measures of Migration</b></h4>
$$\\text{Net Migration} = I - E$$
$$\\text{Net Migration Rate} = \\frac{I - E}{\\bar{P}} \\times 1000$$
$$\\text{In-migration Rate} = \\frac{I}{\\bar{P}_{\\text{dest}}} \\times 1000; \\quad \\text{Out-migration Rate} = \\frac{E}{\\bar{P}_{\\text{orig}}} \\times 1000$$
<p>The <b>Chandrasekaran–Deming formula</b> (1949) uses dual-registration systems to estimate migration. The <b>residual method</b> of estimating net international migration: $M = (P_{t+n} - P_t) - (B - D)$.</p>

<h4><b>5. Push-Pull Theory (Lee, 1966)</b></h4>
<p>Migration is governed by <b>push factors</b> at origin (unemployment, low wages, drought, conflict) and <b>pull factors</b> at destination (employment, higher wages, educational facilities, social amenities). Intervening obstacles (distance, cost, legal barriers) moderate the flow.</p>`

}; // end demography 2026

// ─── SQC 2026 ────────────────────────────────────────────────────────────────

exp.paper4.sqc['2026'] = {

'7.1': `<h3><b>UPSC ISS Statistics Paper IV (2026) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., Introduction to Statistical Quality Control (8th ed., 2020); Shewhart, W.A., Economic Control of Quality of Manufactured Product (1931); Gupta &amp; Kapoor, Fundamentals of Mathematical Statistics.</em></p>

<h4><b>1. Why Use Statistical Quality Control (SQC)?</b></h4>
<p>Any production process is subject to two kinds of variation:</p>
<ul>
  <li><b>Chance (Common) Causes:</b> Inherent, unavoidable variation arising from the cumulative effect of many small, indistinguishable sources (machine vibration, raw material gradations, environmental fluctuations). A process subject only to chance causes is said to be <em>in statistical control</em>.</li>
  <li><b>Assignable (Special) Causes:</b> Specific, identifiable, economically correctable sources of variation — tool wear, operator error, batch contamination. Their presence renders the process <em>out of statistical control</em>.</li>
</ul>
<p>SQC provides a <b>scientific, objective, and economic</b> methodology to:</p>
<ul>
  <li>Distinguish chance variation from assignable-cause variation.</li>
  <li>Detect shifts in process parameters (mean, variance) quickly.</li>
  <li>Reduce scrap, rework, and customer complaints systematically.</li>
  <li>Provide documented evidence of process performance.</li>
</ul>
<p>Without SQC, the only alternative is 100% inspection — expensive, slow, and subject to inspector fatigue errors. SQC uses statistical sampling and probability theory to provide equivalent or superior protection at a fraction of the cost.</p>

<h4><b>2. Advantages When a Process is in Statistical Control</b></h4>
<ul>
  <li><b>Process behaviour is predictable:</b> Future output can be predicted probabilistically — the distribution of the quality characteristic is stable over time.</li>
  <li><b>Process capability can be assessed:</b> Only a stable, in-control process allows meaningful computation of capability indices $C_p$, $C_{pk}$, $C_{pm}$, which compare the process spread to specification limits.</li>
  <li><b>Reduced inspection costs:</b> A demonstrated stable process permits rational sampling plans with reduced sample sizes, saving inspection labour and time.</li>
  <li><b>Rational basis for acceptance sampling:</b> Outgoing quality guarantees (AOQ, AOQL) are meaningful only when the process is in control.</li>
  <li><b>Reduced scrap and rework:</b> Assignable causes having been eliminated, the defect rate stabilises at the minimum achievable level for the current process.</li>
  <li><b>Improved customer confidence:</b> Consistent output leads to fewer field returns, warranty claims, and customer complaints.</li>
  <li><b>Foundation for process improvement:</b> Statistical control establishes the baseline from which designed experiments (DOE) can identify opportunities for further reducing variability (Six Sigma philosophy).</li>
  <li><b>Legal and contractual compliance:</b> Process control records provide audit trails for ISO 9001, IATF 16949, and other quality management standards.</li>
</ul>`,

'7.2': `<h3><b>UPSC ISS Statistics Paper IV (2026) — Model Solution</b></h3><br>
<p><em>Reference: Shewhart, W.A., Economic Control of Quality of Manufactured Product (1931); Montgomery, D.C., Introduction to Statistical Quality Control (8th ed., 2020); Duncan, A.J., Quality Control and Industrial Statistics (5th ed., 1986).</em></p>

<h4><b>1. The Shewhart Control Chart Structure</b></h4>
<p>A Shewhart control chart monitors a quality statistic $W$ (e.g., $\\bar{X}$) with:</p>
$$\\text{UCL} = \\mu_W + k\\,\\sigma_W, \\quad \\text{CL} = \\mu_W, \\quad \\text{LCL} = \\mu_W - k\\,\\sigma_W$$
<p>Shewhart chose $k = 3$ (three-sigma limits). The rationale is multi-layered.</p>

<h4><b>2. Statistical Argument: Normal Distribution</b></h4>
<p>When the process is in control with normally distributed output, $\\bar{X} \\sim N(\\mu, \\sigma^2/n)$. By the standard normal table:</p>
$$P(|\\bar{X} - \\mu| > 3\\sigma/\\sqrt{n}) = 2\\Phi(-3) = 2(0.00135) = 0.0027 = 0.27\\%$$
<p>So the probability of a <b>false alarm</b> (a point outside control limits when the process is actually in control) is only 0.27% — i.e., about 1 in every 370 plotted points on average. The <b>Average Run Length (ARL) in control</b>:</p>
$$\\text{ARL}_0 = \\frac{1}{0.0027} \\approx 370$$

<h4><b>3. Economic Argument: Shewhart's Rationale</b></h4>
<p>Shewhart did <em>not</em> choose 3-sigma as a significance test. He argued from the perspective of <b>economic balance</b>:</p>
<ul>
  <li><b>Narrower limits</b> (e.g., $k=2$): False alarm rate = 4.55% → frequent unnecessary process stoppages, high investigation costs. ARL$_0 \\approx 22$.</li>
  <li><b>Wider limits</b> (e.g., $k=4$): False alarm rate ≈ 0.006% → real shifts go undetected for longer, increasing defect costs. ARL$_0 \\approx 15787$.</li>
  <li>$k=3$ provides an <b>empirically satisfactory balance</b> between Type I error (false alarm) and Type II error (failure to detect a shift) for most industrial contexts.</li>
</ul>

<h4><b>4. Non-Normal Distributions: Chebyshev's Inequality</b></h4>
<p>Even without normality, by <b>Chebyshev's Inequality</b>:</p>
$$P(|W - \\mu_W| \\geq k\\sigma_W) \\leq \\frac{1}{k^2}$$
<p>For $k=3$: $P(|W - \\mu_W| \\geq 3\\sigma_W) \\leq 1/9 \\approx 11.1\\%$. This is a conservative (worst-case) bound. In practice, for statistics computed from samples of moderate size $n \\geq 4$, the <b>Central Limit Theorem</b> ensures $\\bar{X}$ is approximately normal, so the 0.27% false alarm rate is approximately achieved regardless of the individual observation distribution.</p>

<h4><b>5. ARL for Detecting a Shift</b></h4>
<p>If the process mean shifts from $\\mu_0$ to $\\mu_0 + \\delta\\sigma/\\sqrt{n}$, the detection probability per sample is:</p>
$$\\beta = 1 - [\\Phi(3-\\delta) - \\Phi(-3-\\delta)]$$
$$\\text{ARL}_1 = 1/\\beta$$
<p>For example, a $1\\sigma$ shift ($\\delta=1$): $\\beta = 1 - [\\Phi(2) - \\Phi(-4)] \\approx 1 - 0.9772 = 0.1587$, giving $\\text{ARL}_1 \\approx 6.3$ — the shift is detected within about 6 samples on average. This detection speed is acceptable for most processes when combined with the ARL$_0 = 370$ false-alarm protection.</p>`,

'7.3': `<h3><b>UPSC ISS Statistics Paper IV (2026) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., Introduction to Statistical Quality Control (8th ed., 2020); Duncan, A.J., Quality Control and Industrial Statistics (5th ed., 1986); Grant &amp; Leavenworth, Statistical Quality Control (7th ed., 1996).</em></p>

<h4><b>1. Choice of Control Chart</b></h4>
<p>The number of complaints per day is a <b>count of non-conformities (defects) per unit</b> — not a count of defective items. The appropriate chart is the <b>$c$-chart</b> (chart for number of defects per unit), based on the Poisson model:</p>
$$X \\sim \\text{Poisson}(\\bar{c}) \\quad \\Rightarrow \\quad E(X) = \\bar{c},\\; \\text{Var}(X) = \\bar{c}$$

<h4><b>2. Data and Central Statistic</b></h4>
<p>Complaints per day for 10 days: 4, 8, 2, 0, 3, 9, 10, 0, 6, 4.</p>
$$\\bar{c} = \\frac{\\sum_{i=1}^{10} c_i}{10} = \\frac{4+8+2+0+3+9+10+0+6+4}{10} = \\frac{46}{10} = 4.6$$

<h4><b>3. Three-Sigma Control Limits for the $c$-Chart</b></h4>
<p>The $3\\sigma$ limits for a $c$-chart are:</p>
$$\\text{UCL} = \\bar{c} + 3\\sqrt{\\bar{c}} = 4.6 + 3\\sqrt{4.6} = 4.6 + 3(2.145) = 4.6 + 6.434 = 11.034$$
$$\\text{CL} = \\bar{c} = 4.6$$
$$\\text{LCL} = \\bar{c} - 3\\sqrt{\\bar{c}} = 4.6 - 6.434 = -1.834 \\to 0$$
<p>(LCL is set to 0 since the count cannot be negative.)</p>

<h4><b>4. Control Chart Assessment</b></h4>
<table border="1" cellpadding="5" style="border-collapse:collapse; text-align:center; width:100%;">
  <tr><th>Day</th><th>Complaints $c_i$</th><th>Within $[0,\\; 11.034]$?</th></tr>
  <tr><td>1</td><td>4</td><td>Yes</td></tr>
  <tr><td>2</td><td>8</td><td>Yes</td></tr>
  <tr><td>3</td><td>2</td><td>Yes</td></tr>
  <tr><td>4</td><td>0</td><td>Yes</td></tr>
  <tr><td>5</td><td>3</td><td>Yes</td></tr>
  <tr><td>6</td><td>9</td><td>Yes</td></tr>
  <tr><td>7</td><td>10</td><td>Yes (close to UCL)</td></tr>
  <tr><td>8</td><td>0</td><td>Yes</td></tr>
  <tr><td>9</td><td>6</td><td>Yes</td></tr>
  <tr><td>10</td><td>4</td><td>Yes</td></tr>
</table>
<p>All 10 observations fall within the control limits $[0,\\; 11.034]$. The complaint process is <b>in statistical control</b>. Day 7 (10 complaints) approaches the UCL but does not exceed it.</p>

<h4><b>5. Interpretation</b></h4>
<p>The average service quality level corresponds to $\\bar{c} = 4.6$ complaints per day. No assignable causes are apparent in this data window. The transit authority should continue monitoring; a point exceeding UCL = 11 on a future day would signal a deterioration requiring investigation.</p>`,

'7.4': `<h3><b>UPSC ISS Statistics Paper IV (2026) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., Introduction to Statistical Quality Control (8th ed., 2020); Page, E.S., Continuous Inspection Schemes, Biometrika 41 (1954); Lucas, J.M. &amp; Saccucci, M.S., EWMA Control Schemes, Technometrics 32 (1990).</em></p>

<h4><b>1. Shewhart Control Charts</b></h4>
<p><b>Principle:</b> Each plotted point uses only the <em>current sample's statistic</em>. A signal occurs when a point falls outside the $3\\sigma$ control limits. Past observations are ignored.</p>
<ul>
  <li><b>Memory:</b> None — memoryless chart.</li>
  <li><b>Detection:</b> Powerful for detecting <em>large, sudden shifts</em> (typically $\\geq 2\\sigma$) because the current observation directly reflects the shift. ARL$_1 \\approx 6$ for a $2\\sigma$ shift.</li>
  <li><b>Weakness:</b> Slow to detect <em>small, sustained shifts</em> ($\\leq 1\\sigma$). ARL$_1 \\approx 44$ for a $1\\sigma$ shift — a process that shifted may run for 44 samples before detection.</li>
  <li><b>Setup:</b> Simple; requires only $\\bar{X}$ (or $R$, $p$, $c$) and pre-determined $3\\sigma$ limits.</li>
  <li><b>Basis:</b> Normal distribution of the plotted statistic (or CLT approximation).</li>
  <li><b>False alarm rate:</b> 0.27% per point; ARL$_0 = 370$.</li>
</ul>

<h4><b>2. CUSUM Control Charts</b></h4>
<p><b>Principle:</b> Cumulative sum of deviations from a reference (target) value $\\mu_0$. The tabular CUSUM (Page, 1954) maintains two one-sided statistics:</p>
$$C_i^+ = \\max(0,\\; X_i - (\\mu_0 + K) + C_{i-1}^+)$$
$$C_i^- = \\max(0,\\; (\\mu_0 - K) - X_i + C_{i-1}^-)$$
<p>Signal: $C_i^+ > H$ (upward shift) or $C_i^- > H$ (downward shift). Reference value $K = \\delta\\sigma/2$ (half the detectable shift); decision interval $H = h\\sigma$ (typically $h=4$ or $5$).</p>
<ul>
  <li><b>Memory:</b> All past data accumulate — CUSUM is a <em>full-memory</em> chart.</li>
  <li><b>Detection:</b> Excellent for <em>small, sustained shifts</em>. For a $1\\sigma$ shift: ARL$_1 \\approx 10$ (vs. 44 for Shewhart) — nearly five times faster.</li>
  <li><b>Weakness:</b> Slower to detect large, sudden shifts than Shewhart; more complex to implement and interpret.</li>
  <li><b>Setup:</b> Requires specification of $K$ and $H$ (or equivalently, ARL design).</li>
  <li><b>V-mask alternative:</b> Graphical version using a V-shaped mask placed over the cumulative sum plot; the lead distance $d$ and half-angle $\\theta$ play the roles of $H$ and $K$.</li>
</ul>

<h4><b>3. Key Differences (Summary Table)</b></h4>
<table border="1" cellpadding="5" style="border-collapse:collapse; width:100%;">
  <tr><th>Feature</th><th>Shewhart</th><th>CUSUM</th></tr>
  <tr><td>Memory</td><td>None (current point only)</td><td>Full (all past points)</td></tr>
  <tr><td>Best for</td><td>Large sudden shifts ($\\geq 2\\sigma$)</td><td>Small sustained shifts ($\\leq 1\\sigma$)</td></tr>
  <tr><td>ARL (in-control)</td><td>$\\approx 370$</td><td>$\\approx 370$ (by design)</td></tr>
  <tr><td>ARL (1$\\sigma$ shift)</td><td>$\\approx 44$</td><td>$\\approx 10$</td></tr>
  <tr><td>Simplicity</td><td>Very simple</td><td>Moderate complexity</td></tr>
  <tr><td>Interpretation</td><td>Visual (single point outside limits)</td><td>Tabular/V-mask comparison</td></tr>
  <tr><td>Basis</td><td>Individual sample statistic</td><td>Cumulative score test (SPRT)</td></tr>
</table>
<p><b>Combined use:</b> In practice, a <em>combined Shewhart–CUSUM</em> scheme is recommended: the Shewhart chart catches large shifts quickly, while the CUSUM detects lingering small shifts that Shewhart would miss.</p>`,

'7.5': `<h3><b>UPSC ISS Statistics Paper IV (2026) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., Introduction to Statistical Quality Control (8th ed., 2020); Schilling, E.G. &amp; Neubauer, D.V., Acceptance Sampling in Quality Control (3rd ed., 2017); IS 2500 Part I (BIS).</em></p>

<h4><b>1. Definition of Double Sampling Plan (DSP)</b></h4>
<p>A Double Sampling Plan (DSP) is characterised by parameters $(N, n_1, c_1, n_2, c_2)$ where:</p>
<ul>
  <li>$N$ = lot size; $n_1$ = first sample size; $n_2$ = second sample size</li>
  <li>$c_1$ = acceptance number for first sample; $c_2$ = overall acceptance number ($c_2 \\geq c_1$)</li>
</ul>

<h4><b>2. Operating Procedure</b></h4>
<p><b>Stage 1:</b> Draw a random sample of $n_1$ items. Count defectives $d_1$.</p>
<ul>
  <li>If $d_1 \\leq c_1$: <b>Accept</b> the lot immediately.</li>
  <li>If $d_1 > c_2$: <b>Reject</b> the lot immediately.</li>
  <li>If $c_1 < d_1 \\leq c_2$: Decision is <b>deferred</b> — proceed to Stage 2.</li>
</ul>
<p><b>Stage 2:</b> Draw a second random sample of $n_2$ items. Count defectives $d_2$.</p>
<ul>
  <li>If $d_1 + d_2 \\leq c_2$: <b>Accept</b> the lot.</li>
  <li>If $d_1 + d_2 > c_2$: <b>Reject</b> the lot.</li>
</ul>

<h4><b>3. Probability of Acceptance (OC Function)</b></h4>
<p>Under the binomial model with lot fraction defective $p$:</p>
$$P_{a1} = P(d_1 \\leq c_1) = \\sum_{d=0}^{c_1} \\binom{n_1}{d} p^d (1-p)^{n_1-d}$$
$$P_{a2} = \\sum_{d_1=c_1+1}^{c_2} P(D_1 = d_1) \\cdot P(d_1 + D_2 \\leq c_2)$$
$$P_a = P_{a1} + P_{a2}$$

<h4><b>4. Average Sample Number (ASN)</b></h4>
<p>The ASN reflects the expected inspection effort:</p>
$$P_I = P(d_1 \\leq c_1) + P(d_1 > c_2) = P(d_1 \\leq c_1) + P(d_1 > c_2)$$
$$\\text{ASN} = n_1 + n_2 \\cdot P(c_1 < d_1 \\leq c_2) = n_1 + n_2(1 - P_I)$$

<h4><b>5. Advantages of DSP over Single Sampling Plan (SSP)</b></h4>
<ul>
  <li><b>Lower average inspection:</b> If a lot is clearly good ($d_1$ very small) or clearly bad ($d_1$ very large), a decision is reached at Stage 1 without inspecting $n_2$ additional items. For good lots, ASN(DSP) $<$ $n$(SSP).</li>
  <li><b>Psychological advantage:</b> Gives a "second chance" to borderline lots — reduces risk of rejecting a marginally acceptable lot solely due to sampling variation.</li>
  <li><b>Equivalent discrimination:</b> A DSP can be designed to match the OC curve of a given SSP while using less total inspection on average.</li>
  <li><b>Flexibility:</b> The two-stage structure allows finer probability discrimination (similar to Bayesian sequential updating).</li>
</ul>
<p><b>Disadvantage:</b> More complex administration — requires tracking of $d_1 + d_2$, two sampling operations per lot, and accurate identification of the second sample from the same lot.</p>`,

'8.1': `<h3><b>UPSC ISS Statistics Paper IV (2026) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., Introduction to Statistical Quality Control (8th ed., 2020); Grant &amp; Leavenworth, Statistical Quality Control (7th ed., 1996). Constants for $n=5$: $A_2=0.58$, $D_3=0$, $D_4=2.115$.</em></p>

<h4><b>1. Data Summary</b></h4>
<p>10 samples of size $n=5$:</p>
<table border="1" cellpadding="4" style="border-collapse:collapse; text-align:center; width:100%;">
  <tr><th>Sample</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th><th><b>Total</b></th></tr>
  <tr><td>$\\bar{x}_i$</td><td>15</td><td>17</td><td>15</td><td>18</td><td>17</td><td>14</td><td>18</td><td>15</td><td>17</td><td>16</td><td><b>162</b></td></tr>
  <tr><td>$R_i$</td><td>7</td><td>7</td><td>4</td><td>9</td><td>8</td><td>7</td><td>12</td><td>4</td><td>11</td><td>5</td><td><b>74</b></td></tr>
</table>
$$\\bar{\\bar{X}} = \\frac{162}{10} = 16.2, \\quad \\bar{R} = \\frac{74}{10} = 7.4$$

<h4><b>2. $\\bar{X}$-Chart Control Limits</b></h4>
$$\\text{UCL}_{\\bar{X}} = \\bar{\\bar{X}} + A_2\\bar{R} = 16.2 + 0.58 \\times 7.4 = 16.2 + 4.292 = 20.492$$
$$\\text{CL}_{\\bar{X}} = \\bar{\\bar{X}} = 16.2$$
$$\\text{LCL}_{\\bar{X}} = \\bar{\\bar{X}} - A_2\\bar{R} = 16.2 - 4.292 = 11.908$$

<h4><b>3. $R$-Chart Control Limits</b></h4>
$$\\text{UCL}_R = D_4\\bar{R} = 2.115 \\times 7.4 = 15.651$$
$$\\text{CL}_R = \\bar{R} = 7.4$$
$$\\text{LCL}_R = D_3\\bar{R} = 0 \\times 7.4 = 0$$

<h4><b>4. Checking for Control</b></h4>
<p><b>$\\bar{X}$-chart:</b> All sample means (14 to 18) lie within $[11.908,\\; 20.492]$. ✓</p>
<p><b>$R$-chart:</b> All ranges (4 to 12) lie within $[0,\\; 15.651]$. ✓</p>
<p>No points outside control limits; no non-random patterns (runs, trends) visible with 10 data points.</p>

<h4><b>5. Conclusion</b></h4>
<p><b>The process can be regarded as in statistical control.</b> Both the process mean ($\\bar{\\bar{X}} = 16.2$) and process variability ($\\bar{R} = 7.4$) are stable across all 10 samples. The estimated process standard deviation is:</p>
$$\\hat{\\sigma} = \\frac{\\bar{R}}{d_2} = \\frac{7.4}{2.326} \\approx 3.18 \\text{ (weight units)}$$
<p>where $d_2 = 2.326$ for $n = 5$. If specification limits are given, $\\hat{\\sigma}$ can be used to compute $C_p$ and $C_{pk}$ for process capability assessment.</p>`,

'8.2': `<h3><b>UPSC ISS Statistics Paper IV (2026) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., Introduction to Statistical Quality Control (8th ed., 2020); Shewhart, W.A., Economic Control of Quality (1931); Grant &amp; Leavenworth, Statistical Quality Control (7th ed., 1996).</em></p>

<h4><b>1. The $p$-Chart (Fraction Defective Chart)</b></h4>
<p><b>Statistical basis:</b> Each item is classified as conforming or non-conforming (Bernoulli trial). The number of non-conforming items $D$ in a sample of size $n$ follows the Binomial distribution: $D \\sim \\text{Bin}(n, p)$, where $p$ is the true fraction defective.</p>
$$E(\\hat{p}) = p, \\quad \\text{Var}(\\hat{p}) = \\frac{p(1-p)}{n}$$
<p><b>When standards are known</b> (process fraction defective = $p_0$):</p>
$$\\text{UCL} = p_0 + 3\\sqrt{\\frac{p_0(1-p_0)}{n}}, \\quad \\text{CL} = p_0, \\quad \\text{LCL} = p_0 - 3\\sqrt{\\frac{p_0(1-p_0)}{n}} \\;(\\geq 0)$$
<p><b>When standards are unknown</b> (estimated from $k$ preliminary samples):</p>
$$\\bar{p} = \\frac{\\sum_{i=1}^k D_i}{\\sum_{i=1}^k n_i}$$
$$\\text{UCL} = \\bar{p} + 3\\sqrt{\\frac{\\bar{p}(1-\\bar{p})}{n}}, \\quad \\text{CL} = \\bar{p}, \\quad \\text{LCL} = \\bar{p} - 3\\sqrt{\\frac{\\bar{p}(1-\\bar{p})}{n}} \\;(\\geq 0)$$
<p><b>Variable sample sizes:</b> If $n_i$ varies, compute sample-specific limits using $n_i$, or use $\\bar{n} = (\\sum n_i)/k$ as an approximation.</p>

<h4><b>2. The $np$-Chart (Number Defective Chart)</b></h4>
<p><b>Statistical basis:</b> Directly monitors $D_i = n\\hat{p}_i$ (number of defectives), which is $\\text{Bin}(n, p)$.</p>
$$E(D) = np, \\quad \\text{Var}(D) = np(1-p)$$
<p><b>Control limits:</b></p>
$$\\text{UCL} = n\\bar{p} + 3\\sqrt{n\\bar{p}(1-\\bar{p})}, \\quad \\text{CL} = n\\bar{p}, \\quad \\text{LCL} = n\\bar{p} - 3\\sqrt{n\\bar{p}(1-\\bar{p})} \\;(\\geq 0)$$

<h4><b>3. Choice Between $p$-Chart and $np$-Chart</b></h4>
<table border="1" cellpadding="5" style="border-collapse:collapse; width:100%;">
  <tr><th>Criterion</th><th>$p$-Chart</th><th>$np$-Chart</th></tr>
  <tr><td>Plotted statistic</td><td>Fraction defective $\\hat{p} = D/n$</td><td>Count of defectives $D = n\\hat{p}$</td></tr>
  <tr><td>Sample size</td><td>Can be <b>variable</b></td><td>Must be <b>constant</b></td></tr>
  <tr><td>Interpretation</td><td>Proportion scale (0 to 1)</td><td>Integer count scale</td></tr>
  <tr><td>Communication</td><td>Better for management reporting</td><td>More intuitive for shop floor</td></tr>
  <tr><td>Equivalent?</td><td colspan="2" style="text-align:center;">Yes — both detect the same shifts. A point outside $np$-chart limits $\\Leftrightarrow$ point outside $p$-chart limits (when $n$ is constant).</td></tr>
</table>
<p><b>Rule:</b> Use the <b>$np$-chart when the sample size is constant</b> and counts are preferred. Use the <b>$p$-chart when sample sizes vary</b>, or when the fraction nonconforming is the natural metric for management reports and SLA monitoring.</p>
<p><b>Underlying assumption:</b> Both charts assume <em>independence</em> of items within a sample and that $p$ is the same across the subgroup (no clustering). The Binomial approximation is good for $n \\geq 50$, $np \\geq 5$.</p>`,

'8.3': `<h3><b>UPSC ISS Statistics Paper IV (2026) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., Introduction to Statistical Quality Control (8th ed., 2020); Schilling &amp; Neubauer, Acceptance Sampling in Quality Control (3rd ed., 2017); IS 2500 Part I (BIS).</em></p>

<h4><b>Part (i): Producer's and Consumer's Risks</b></h4>
<p>Single Sampling Plan: $n=100$, $c=2$ (reject if $d > 2$).</p>
<p>Lot fraction defective modelled by Poisson (since $n$ large, $p$ small): $\\lambda = np$.</p>

<p><b>Producer's Risk $\\alpha$</b> at AQL $= p_1 = 0.01$, $\\lambda_1 = 100 \\times 0.01 = 1.0$:</p>
$$P_a(0.01) = P(D \\leq 2 \\mid \\lambda=1) = e^{-1}\\left(1 + 1 + \\frac{1^2}{2!}\\right) = e^{-1} \\times 2.5 = 0.3679 \\times 2.5 = 0.9197$$
$$\\alpha = 1 - P_a(0.01) = 1 - 0.9197 = \\mathbf{0.0803} \\approx 8.03\\%$$

<p><b>Consumer's Risk $\\beta$</b> at LTPD $= p_2 = 0.05$, $\\lambda_2 = 100 \\times 0.05 = 5.0$:</p>
$$P_a(0.05) = P(D \\leq 2 \\mid \\lambda=5) = e^{-5}\\left(1 + 5 + \\frac{25}{2}\\right) = e^{-5} \\times 18.5 = 0.006738 \\times 18.5 = \\mathbf{0.1247} \\approx 12.47\\%$$
$$\\beta = P_a(0.05) = \\mathbf{12.47\\%}$$

<h4><b>Part (ii): Probability of Acceptance — SSP $(N=2000, n=50, c=2)$</b></h4>
<p>Under the Poisson approximation with $\\lambda = 50p$:</p>
$$P_a(p) = e^{-50p}\\left[1 + 50p + \\frac{(50p)^2}{2}\\right]$$
<p>Evaluating at representative quality levels:</p>
<table border="1" cellpadding="5" style="border-collapse:collapse; text-align:center; width:100%;">
  <tr><th>$p$ (fraction defective)</th><th>$\\lambda = 50p$</th><th>$P_a(p)$</th></tr>
  <tr><td>0.01</td><td>0.5</td><td>$e^{-0.5}(1+0.5+0.125) = 0.6065 \\times 1.625 = 0.9856$</td></tr>
  <tr><td>0.02</td><td>1.0</td><td>$e^{-1}(1+1+0.5) = 0.3679 \\times 2.5 = 0.9197$</td></tr>
  <tr><td>0.04</td><td>2.0</td><td>$e^{-2}(1+2+2) = 0.1353 \\times 5 = 0.6767$</td></tr>
  <tr><td>0.06</td><td>3.0</td><td>$e^{-3}(1+3+4.5) = 0.0498 \\times 8.5 = 0.4232$</td></tr>
  <tr><td>0.08</td><td>4.0</td><td>$e^{-4}(1+4+8) = 0.0183 \\times 13 = 0.2381$</td></tr>
  <tr><td>0.10</td><td>5.0</td><td>$e^{-5}(1+5+12.5) = 0.00674 \\times 18.5 = 0.1247$</td></tr>
</table>
<p>These values define the <b>OC curve</b> of the plan $(n=50, c=2)$. As $p$ increases from 0.01 to 0.10, $P_a$ decreases from 0.9856 to 0.1247, showing good discriminating power between good and bad lots.</p>`,

'8.4': `<h3><b>UPSC ISS Statistics Paper IV (2026) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., Introduction to Statistical Quality Control (8th ed., 2020); Page, E.S., Continuous Inspection Schemes, Biometrika 41 (1954).</em></p>

<h4><b>1. CUSUM Setup</b></h4>
<p>Target $\\mu_0 = 5.0$, $\\sigma = 1$, $n=1$ (individual observations), detecting shift to $\\mu_1 = 6.0$.</p>
<p>Reference value: $K = (\\mu_1 - \\mu_0)/(2\\sigma) = (6.0-5.0)/(2 \\times 1) = 0.5$</p>
<p>Decision interval: $H = 5$ (standard design: $h=5$, giving ARL$_0 \\approx 370$, ARL$_1 \\approx 10.4$ for $1\\sigma$ shift).</p>
<p>Tabular CUSUM recurrences ($C_0^+ = C_0^- = 0$):</p>
$$C_i^+ = \\max(0,\\; X_i - (\\mu_0+K) + C_{i-1}^+) = \\max(0,\\; X_i - 5.5 + C_{i-1}^+)$$
$$C_i^- = \\max(0,\\; (\\mu_0-K) - X_i + C_{i-1}^-) = \\max(0,\\; 4.5 - X_i + C_{i-1}^-)$$

<h4><b>2. Computation Table</b></h4>
<table border="1" cellpadding="4" style="border-collapse:collapse; text-align:center; font-size:0.9em; width:100%;">
  <tr><th>Hour $i$</th><th>$X_i$</th><th>$X_i - 5.5$</th><th>$C_i^+$</th><th>$4.5 - X_i$</th><th>$C_i^-$</th></tr>
  <tr><td>1</td><td>5.50</td><td>0.00</td><td>0.00</td><td>$-$1.00</td><td>0.00</td></tr>
  <tr><td>2</td><td>4.50</td><td>$-$1.00</td><td>0.00</td><td>0.00</td><td>0.00</td></tr>
  <tr><td>3</td><td>5.25</td><td>$-$0.25</td><td>0.00</td><td>$-$0.75</td><td>0.00</td></tr>
  <tr><td>4</td><td>6.01</td><td>0.51</td><td>0.51</td><td>$-$1.51</td><td>0.00</td></tr>
  <tr><td>5</td><td>5.25</td><td>$-$0.25</td><td>0.26</td><td>$-$0.75</td><td>0.00</td></tr>
  <tr><td>6</td><td>3.50</td><td>$-$2.00</td><td>0.00</td><td>1.00</td><td>1.00</td></tr>
  <tr><td>7</td><td>5.75</td><td>0.25</td><td>0.25</td><td>$-$1.25</td><td>0.00</td></tr>
  <tr><td>8</td><td>6.25</td><td>0.75</td><td>1.00</td><td>$-$1.75</td><td>0.00</td></tr>
  <tr><td>9</td><td>4.50</td><td>$-$1.00</td><td>0.00</td><td>0.00</td><td>0.00</td></tr>
  <tr><td>10</td><td>5.00</td><td>$-$0.50</td><td>0.00</td><td>$-$0.50</td><td>0.00</td></tr>
  <tr><td>11</td><td>6.75</td><td>1.25</td><td>1.25</td><td>$-$2.25</td><td>0.00</td></tr>
  <tr><td>12</td><td>3.25</td><td>$-$2.25</td><td>0.00</td><td>1.25</td><td>1.25</td></tr>
  <tr><td>13</td><td>5.25</td><td>$-$0.25</td><td>0.00</td><td>$-$0.75</td><td>0.50</td></tr>
  <tr><td>14</td><td>5.00</td><td>$-$0.50</td><td>0.00</td><td>$-$0.50</td><td>0.00</td></tr>
  <tr><td>15</td><td>4.56</td><td>$-$0.94</td><td>0.00</td><td>$-$0.06</td><td>0.00</td></tr>
  <tr><td>16</td><td>6.50</td><td>1.00</td><td>1.00</td><td>$-$2.00</td><td>0.00</td></tr>
  <tr><td>17</td><td>7.20</td><td>1.70</td><td>2.70</td><td>$-$2.70</td><td>0.00</td></tr>
  <tr><td>18</td><td>6.80</td><td>1.30</td><td>4.00</td><td>$-$2.30</td><td>0.00</td></tr>
  <tr><td>19</td><td>6.75</td><td>1.25</td><td><b>5.25 &gt; H</b></td><td>$-$2.25</td><td>0.00</td></tr>
  <tr><td>20</td><td>6.50</td><td colspan="4" style="text-align:center;"><em>Signal already triggered at hour 19</em></td></tr>
</table>

<h4><b>3. Interpretation</b></h4>
<p>$C_{19}^+ = 5.25 > H = 5.0$: the CUSUM chart <b>signals an upward shift at hour 19</b>. The accumulation of positive deviations from hours 16–18 (concentrations 6.50, 7.20, 6.80) drives $C_i^+$ above the decision interval, providing strong statistical evidence that the process mean has shifted from $\\mu_0 = 5.0$ to approximately $\\mu_1 = 6.0$.</p>
<p>No downward signal ($C_i^-$ never exceeds $H=5$). The process should be investigated for an upward assignable cause (e.g., catalyst concentration increase, temperature drift).</p>`

}; // end sqc 2026

// Write updated explanations back
fs.writeFileSync(EXP_PATH, JSON.stringify(exp, null, 2));
console.log('Done. paper4.demography["2026"] and paper4.sqc["2026"] written.');
const newSize = JSON.stringify(exp).length;
console.log('New JSON size (MB):', (newSize/1024/1024).toFixed(2));

'use strict';
const fs = require('fs');
const path = require('path');

const EXP_PATH = path.join(__dirname, '../src/data/explanations.json');
const exp = JSON.parse(fs.readFileSync(EXP_PATH, 'utf8'));

if (!exp.paper4.demography['2025']) exp.paper4.demography['2025'] = {};
if (!exp.paper4.sqc['2025']) exp.paper4.sqc['2025'] = {};

// ─── DEMOGRAPHY 2025 ────────────────────────────────────────────────────────

exp.paper4.demography['2025'] = {

'3.1': `<h3><b>UPSC ISS Statistics Paper IV (2025) — Model Solution</b></h3><br>
<p><em>Reference: Spiegelman, M., Introduction to Demography (Rev. ed., 1968); Keyfitz, N. &amp; Caswell, H., Applied Mathematical Demography (3rd ed., 2005); Gupta &amp; Kapoor, Fundamentals of Applied Statistics.</em></p>

<h4><b>1. Gross Reproduction Rate (GRR)</b></h4>
<p>The GRR is the average number of daughters a woman would bear over her reproductive lifetime if she were subject to the observed age-specific fertility rates and experienced no mortality:</p>
$$\\text{GRR} = 5 \\sum_{x=15}^{45} f_x^F = 5 \\sum_{x=15}^{45} \\frac{\\text{Female births in age group } x}{\\text{Female population in age group } x}$$
<p>(Factor 5 for 5-year age grouping.) GRR considers only female births to female mothers — it is a measure of female replacement ignoring the effect of mortality.</p>
<p><b>Suitability:</b> GRR answers the question "In the absence of mortality, how many daughters would a woman produce?" It is conceptually clean and easy to compute. However, it <em>overstates</em> actual replacement because many women die before completing their reproductive years.</p>

<h4><b>2. Net Reproduction Rate (NRR)</b></h4>
<p>The NRR corrects GRR for female mortality by weighting the female age-specific fertility rates by the probability of surviving to the mid-point of each 5-year age group:</p>
$$\\text{NRR} = 5 \\sum_{x=15}^{45} f_x^F \\cdot L_x^F = 5 \\sum_{x=15}^{45} \\frac{\\text{Female births in age group } x}{\\text{Female population in age group } x} \\cdot \\frac{l_{x+2.5}}{l_0}$$
<p>where $l_{x+2.5}/l_0$ is the probability of a female surviving to the mid-age of the group. Since $l_x^F/l_0 = p(x)$, we may write:</p>
$$\\text{NRR} = \\int_0^\\beta f(x)\\,p(x)\\,dx \\approx 5 \\sum_{x} f_x^F \\cdot p_x$$

<h4><b>3. Relationship between GRR and NRR</b></h4>
$$\\text{NRR} = \\text{GRR} \\times \\bar{p}$$
<p>where $\\bar{p}$ is the <b>mean probability of survival</b> to the childbearing ages, serving as a correction factor. Since $\\bar{p} < 1$, NRR $<$ GRR always.</p>

<h4><b>4. Suitability as Measures of Population Growth</b></h4>
<table border="1" cellpadding="5" style="border-collapse:collapse; width:100%;">
  <tr><th>Aspect</th><th>GRR</th><th>NRR</th></tr>
  <tr><td>Mortality accounted for</td><td>No</td><td>Yes (via $l_x/l_0$)</td></tr>
  <tr><td>Population growth indicator</td><td>Poor (ignores deaths)</td><td>Excellent</td></tr>
  <tr><td>NRR = 1 implies</td><td>—</td><td>Exact replacement; stationary population in long run</td></tr>
  <tr><td>NRR &gt; 1</td><td>—</td><td>Population growing</td></tr>
  <tr><td>NRR &lt; 1</td><td>—</td><td>Population declining</td></tr>
  <tr><td>Data requirement</td><td>Fertility rates only</td><td>Fertility + life table $l_x$</td></tr>
  <tr><td>Limitation</td><td>Unrealistic (no mortality)</td><td>Assumes fertility/mortality constant; ignores migration and males</td></tr>
</table>
<p><b>Conclusion:</b> NRR is the superior measure for assessing long-run population replacement and growth potential. A value of NRR = 1 (replacement-level fertility) is the benchmark for population stability. GRR is useful when life table data are unavailable but should not be used alone to assess population growth.</p>`,

'3.2': `<h3><b>UPSC ISS Statistics Paper IV (2025) — Model Solution</b></h3><br>
<p><em>Reference: Lotka, A.J., Theorie analytique des associations biologiques (1939); Keyfitz, N. &amp; Caswell, H., Applied Mathematical Demography (3rd ed., 2005); Coale, A.J., The Growth and Structure of Human Populations (1972).</em></p>

<h4><b>1. The Stable Population Model</b></h4>
<p>A population is <b>stable</b> if it has been subject to <em>constant, time-invariant</em> age-specific fertility and mortality schedules for a sufficiently long time. Under these conditions, it reaches a <em>fixed age distribution</em> and grows (or declines) at a constant exponential rate $r$ (the intrinsic rate of natural increase).</p>

<h4><b>2. Underlying Assumptions</b></h4>
<ul>
  <li>Age-specific fertility rates $m(x)$ and age-specific mortality (survival) $p(x) = l_x/l_0$ are constant over time.</li>
  <li>The population is closed — no migration.</li>
  <li>Age is the only determinant of vital rates (homogeneous cohorts).</li>
  <li>Continuous time framework (Lotka's formulation) or discrete matrix formulation (Leslie).</li>
  <li>Weak ergodicity: the stable state is the unique long-run attractor regardless of the initial age structure.</li>
</ul>

<h4><b>3. Lotka's Characteristic (Euler–Lotka) Equation</b></h4>
<p>Let $B(t)$ = number of births at time $t$. In a closed population, current births are generated by women who themselves were born earlier and have survived and reproduced. This gives the renewal equation:</p>
$$B(t) = \\int_0^\\beta B(t-x)\\,p(x)\\,m(x)\\,dx$$
<p>If a stable state has been reached, $B(t) = B_0 e^{rt}$. Substituting:</p>
$$B_0 e^{rt} = \\int_0^\\beta B_0 e^{r(t-x)} p(x)\\,m(x)\\,dx = B_0 e^{rt}\\int_0^\\beta e^{-rx}p(x)\\,m(x)\\,dx$$
<p>Dividing through by $B_0 e^{rt}$, the <b>characteristic equation of the stable population</b> is:</p>
$$\\boxed{\\int_0^\\beta e^{-rx}\\,p(x)\\,m(x)\\,dx = 1}$$
<p>where $\\alpha$ and $\\beta$ are the lower and upper limits of the reproductive ages (typically 15 and 50 years). This transcendental equation in $r$ has a unique real root (Euler–Lotka equation).</p>

<h4><b>4. Stable Age Distribution</b></h4>
<p>The proportion of the stable population in the age interval $[x, x+dx)$:</p>
$$c(x) = b\\,e^{-rx}\\,p(x)$$
<p>where $b$ is the stable birth rate: $b = 1 / \\int_0^\\infty e^{-rx}\\,p(x)\\,dx$. The age distribution is proportional to the survival function $p(x)$ deflated by the growth factor $e^{-rx}$.</p>

<h4><b>5. Key Parameters</b></h4>
<ul>
  <li>$r > 0$: growing stable population (GRR or NRR $> 1$)</li>
  <li>$r = 0$: stationary population (NRR $= 1$)</li>
  <li>$r < 0$: declining stable population (NRR $< 1$)</li>
  <li>The mean generation length: $T = \\int_0^\\beta x\\,e^{-rx}\\,p(x)\\,m(x)\\,dx$</li>
  <li>Approximate relation: $\\text{NRR} \\approx e^{rT}$ or $r \\approx \\ln(\\text{NRR})/T$</li>
</ul>`,

'3.3': `<h3><b>UPSC ISS Statistics Paper IV (2025) — Model Solution</b></h3><br>
<p><em>Reference: Bogue, D.J., Principles of Demography (1969); Hamilton, C.H., Practical and Mathematical Considerations in the Formulation and Selection of Migration Rates, Demography 2 (1965); UN Manual VI (1970).</em></p>

<h4><b>1. Why Indirect Measures?</b></h4>
<p>Direct measures of migration (migration surveys, population registers) are often unavailable, especially in developing countries. <b>Indirect measures</b> estimate net internal migration as a residual from the <em>demographic balance equation</em> or by comparing observed and expected cohort sizes between two censuses, using available census and vital registration data.</p>

<h4><b>2. Vital Statistics (Residual) Method</b></h4>
<p>For an area between two censuses (interval $n$ years):</p>
$$\\text{Net Migration} = P_{t+n} - P_t - (B - D)$$
<ul>
  <li>$P_t$, $P_{t+n}$ = census populations at times $t$ and $t+n$</li>
  <li>$B$ = registered births in the interval</li>
  <li>$D$ = registered deaths in the interval</li>
</ul>
<p>A positive residual indicates net in-migration; negative indicates net out-migration. <b>Limitation:</b> Errors accumulate from all three data sources; under-registration of births and deaths distorts estimates.</p>

<h4><b>3. Forward Survival Method (Census Survival Ratio)</b></h4>
<p>Apply life table survival ratios to the age cohort at Census 1 to project the expected population at Census 2; compare to actual Census 2 count:</p>
$$M_x^{n} = P_{x+n,\\,t+n} - P_{x,\\,t} \\cdot {}_n S_x$$
<p>where $_n S_x = {}_n L_{x+n}/{}_n L_x$ is the survival ratio (ratio of person-years in successive age groups from the life table). The residual $M_x^n$ = net migrants in the age group $x$ to $x+n$ over the period.</p>
<p><b>Advantage:</b> Uses widely available census data without requiring complete vital statistics registration. <b>Limitation:</b> Requires an appropriate life table; assumes migration is the only source of discrepancy.</p>

<h4><b>4. Hamilton–Perry Cohort-Component Method (Reverse Survival)</b></h4>
<p>If two consecutive censuses are available without life tables, use the <b>Census Survival Ratio (CSR)</b> approach:</p>
$$\\text{CSR}_{x}^{(n)} = \\frac{\\text{National population aged } x+n \\text{ at Census 2}}{\\text{National population aged } x \\text{ at Census 1}}$$
$$M_x(\\text{area}) = P_{x+n}^{(\\text{area, 2})} - P_x^{(\\text{area, 1})} \\times \\text{CSR}_x^{(n)}$$
<p>The national CSR approximates the survival ratio without needing a life table. This is the most widely used indirect measure in India (used in Census tabulations).</p>

<h4><b>5. Age-Specific Net Migration Rate</b></h4>
<p>Once net migrants $M_x$ are estimated, Hamilton's (1965) net migration rate:</p>
$$m_x = \\frac{M_x}{\\bar{P}_x} \\times 1000$$
<p>where $\\bar{P}_x$ is the average population of age group $x$ (mean of the two census counts). This standardises the migration count for population size, enabling comparison across areas and age groups.</p>`,

'3.4': `<h3><b>UPSC ISS Statistics Paper IV (2025) — Model Solution</b></h3><br>
<p><em>Reference: Pearl, R. &amp; Reed, L.J., On the Rate of Growth of the Population of the United States, PNAS 6 (1920); Verhulst, P.F., Recherches mathématiques sur la loi d'accroissement de la population (1845); Keyfitz, N., Introduction to the Mathematics of Population (1968).</em></p>

<h4><b>1. Starting Assumption</b></h4>
<p>Let $N(t)$ be the population at time $t$. The assumption is that the per-capita growth rate decreases linearly as the population approaches the <b>carrying capacity</b> $K$:</p>
$$\\frac{1}{N}\\frac{dN}{dt} = r\\!\\left(1 - \\frac{N}{K}\\right)$$
<p>Here $r > 0$ is the intrinsic (Malthusian) growth rate and $K > 0$ is the upper asymptote (maximum sustainable population). When $N \\ll K$, growth is approximately exponential at rate $r$; as $N \\to K$, growth slows to zero. This is Verhulst's logistic model (1845), rediscovered by Pearl and Reed (1920).</p>

<h4><b>2. Derivation of the Logistic Curve</b></h4>
<p>Rewrite as: $\\dfrac{dN}{N(K-N)} = \\dfrac{r}{K}\\,dt$</p>
<p>Partial fractions: $\\dfrac{1}{N(K-N)} = \\dfrac{1}{K}\\!\\left(\\dfrac{1}{N} + \\dfrac{1}{K-N}\\right)$</p>
<p>Integrating both sides:</p>
$$\\int\\!\\left(\\frac{1}{N} + \\frac{1}{K-N}\\right)dN = \\int r\\,dt$$
$$\\ln N - \\ln(K-N) = rt + c_1$$
$$\\ln\\frac{N}{K-N} = rt + c_1$$
$$\\frac{N}{K-N} = e^{c_1}\\cdot e^{rt}$$
<p>Let $A = e^{c_1}$. Solving for $N$:</p>
$$N = \\frac{K\\,A\\,e^{rt}}{1 + A\\,e^{rt}} = \\frac{K}{1 + A\\,e^{-rt}}$$
<p>Setting $a = -\\ln A$ and $b = -r$ (so $b < 0$ for growth toward $K$):</p>
$$\\boxed{N_t = \\frac{K}{1 + e^{a + bt}}, \\quad b < 0}$$
<p>where $a = \\ln[(K-N_0)/N_0]$ is determined by the initial condition $N(0) = N_0$.</p>

<h4><b>3. Properties of the Logistic Curve</b></h4>
<ul>
  <li><b>Asymptotes:</b> $N \\to 0$ as $t \\to -\\infty$; $N \\to K$ as $t \\to +\\infty$.</li>
  <li><b>Point of inflection:</b> $d^2N/dt^2 = 0$ at $N = K/2$, occurring at $t^* = -a/b = a/r$.</li>
  <li><b>Maximum growth rate:</b> $\\max(dN/dt) = rK/4$ at the inflection point.</li>
  <li><b>Symmetry:</b> The curve is symmetric about the inflection point — S-shaped (sigmoidal).</li>
  <li><b>Rate function:</b> $dN/dt = rN(1 - N/K)$; this is zero at $N=0$ and $N=K$, and maximum at $N=K/2$.</li>
</ul>

<h4><b>4. Fitting (Pearl-Reed Three-Point Method)</b></h4>
<p>With three equally spaced time points $t_0, t_1, t_2$ (spacing $n$) and populations $N_0, N_1, N_2$:</p>
$$K = \\frac{2N_0 N_1 N_2 - N_1^2(N_0+N_2)}{N_0 N_2 - N_1^2}$$
<p>Then $a$ and $b$ are obtained from the transformed $Y_t = K/N_t - 1 = e^{a+bt}$, giving a linear regression of $\\ln Y_t$ on $t$.</p>`,

'3.5': `<h3><b>UPSC ISS Statistics Paper IV (2025) — Model Solution</b></h3><br>
<p><em>Reference: Spiegelman, M., Introduction to Demography (Rev. ed., 1968); WHO, Neonatal and Perinatal Mortality: Country, Regional and Global Estimates (2006); Registrar General of India — SRS Reports.</em></p>

<h4><b>1. Standard (Conventional) Infant Mortality Rate</b></h4>
$$\\text{IMR} = \\frac{\\text{Deaths of infants aged} < 1 \\text{ year in calendar year } Y}{\\text{Live births in calendar year } Y} \\times 1000$$
<p>This is the most widely used measure. It serves both as a health indicator and as a mortality measure for actuarial and life table purposes.</p>

<h4><b>2. Limitations of the Conventional IMR</b></h4>
<p>The numerator contains deaths from two cohorts (those born in year $Y$ and some born in year $Y-1$), while the denominator refers only to year $Y$ births. Various refined measures address this.</p>

<h4><b>3. Classified Infant Mortality Rates</b></h4>
<p><b>(a) Neonatal Mortality Rate (NMR):</b> Deaths in the first 28 days of life.</p>
$$\\text{NMR} = \\frac{\\text{Deaths aged } 0\\text{–}27 \\text{ days}}{\\text{Live births}} \\times 1000$$
<p><b>(b) Early Neonatal Mortality Rate:</b> Deaths in the first 7 days (first week).</p>
$$\\text{ENMR} = \\frac{\\text{Deaths aged } 0\\text{–}6 \\text{ days}}{\\text{Live births}} \\times 1000$$
<p><b>(c) Post-Neonatal Mortality Rate (PNMR):</b> Deaths from 28 days to under 1 year.</p>
$$\\text{PNMR} = \\text{IMR} - \\text{NMR}$$
<p><b>(d) Perinatal Mortality Rate:</b> Captures late foetal losses plus early neonatal deaths.</p>
$$\\text{PMR} = \\frac{\\text{Still births} + \\text{Deaths aged } 0\\text{–}6 \\text{ days}}{\\text{Live births} + \\text{Still births}} \\times 1000$$

<h4><b>4. Corrected (True Cohort) IMR</b></h4>
<p>Follows a true birth cohort: numerator = all deaths of infants born in year $Y$, whether dying in $Y$ or $Y+1$. Requires two-year data linkage and is harder to compute but conceptually accurate.</p>
<p><b>Bourgeois-Pichat approximation</b> (for corrected IMR from two consecutive years):</p>
$$\\text{IMR}^* = (1-\\alpha)\\cdot\\text{IMR}(Y, Y) + \\alpha \\cdot \\text{IMR}(Y-1, Y)$$
<p>where $\\alpha \\approx 0.8$ (empirically, about 80% of all infant deaths occur among infants born in the current calendar year, and 20% are deaths in year $Y$ of infants born in $Y-1$).</p>

<h4><b>5. Cause-Specific IMR</b></h4>
<p>Computed separately for specific causes (pneumonia, diarrhoea, birth asphyxia) to guide targeted public health interventions.</p>

<h4><b>6. IMR in India</b></h4>
<p>Per SRS 2021: India's IMR = 35 per 1000 live births (Rural: 39, Urban: 21). There is a sharp rural-urban and gender divide. The National Health Policy 2017 targets IMR $\\leq 28$ by 2025 and $\\leq 23$ by 2030.</p>`,

'4.1': `<h3><b>UPSC ISS Statistics Paper IV (2025) — Model Solution</b></h3><br>
<p><em>Reference: Registrar General of India — various Census publications; SRS Bulletins; NSSO/NSS reports; NFHS-5 (2019–21); Spiegelman, M., Introduction to Demography (1968).</em></p>

<h4><b>1. Overview of Demographic Data Sources in India</b></h4>
<p>India uses a combination of <b>primary</b> (collection by government agencies) and <b>derived</b> (computed from primary data) sources for demographic data.</p>

<h4><b>2. Census of India</b></h4>
<p>Administered by the <b>Office of the Registrar General and Census Commissioner of India (ORGI)</b>. Conducted every 10 years since 1872 (unbroken since 1881). The last census was held in 2011; the 2021 census has been postponed.</p>
<ul>
  <li>Phase I: House-listing and Housing Census.</li>
  <li>Phase II: Population Enumeration — individual data on age, sex, literacy, occupation, migration, religion, disability.</li>
  <li>Provides: age-sex distribution, educational status, rural-urban split, workforce participation, migration streams.</li>
</ul>

<h4><b>3. Civil Registration System (CRS)</b></h4>
<p>Under the <b>Registration of Births and Deaths Act, 1969</b> (amended 2023): mandatory registration of births, deaths, still births and marriages within 21 days. The RGI publishes the <em>Vital Statistics of India</em> annually. Persistent <b>under-registration</b> remains a challenge, particularly in rural and tribal areas.</p>

<h4><b>4. Sample Registration System (SRS)</b></h4>
<p>Established by RGI in 1964–65. A <b>dual-record system</b>: continuous enumeration by a part-time enumerator in a sample unit + retrospective survey every 6 months by an independent supervisor. The two records are matched and unmatched events estimated. Provides reliable estimates of <b>birth rates, death rates, infant mortality, and total fertility rate</b> at national and state levels. SRS is the primary source for India's official vital rates.</p>

<h4><b>5. National Sample Survey Office (NSSO/NSS)</b></h4>
<p>Periodic large-scale household surveys on consumption, employment, health, housing. Relevant demographic surveys: NSS 52nd Round (Morbidity &amp; Health Care, 1995–96), Employment-Unemployment Surveys. Provides data on morbidity, disability, health-seeking behaviour.</p>

<h4><b>6. National Family Health Survey (NFHS)</b></h4>
<p>Conducted by IIPS (International Institute for Population Sciences), Mumbai, under the Ministry of Health &amp; Family Welfare. Five rounds: NFHS-1 (1992–93) to NFHS-5 (2019–21). Provides: TFR, contraceptive prevalence, IMR, maternal mortality, nutrition indicators, HIV prevalence. The <b>gold standard</b> for fertility and child health data in India.</p>

<h4><b>7. District Level Household Survey (DLHS)</b></h4>
<p>Provides district-level estimates for reproductive and child health (RCH) indicators. Four rounds completed. Important for planning at the sub-state level.</p>

<h4><b>8. Hospital and Facility Records</b></h4>
<p>Ministry of Health and Family Welfare's <b>Health Management Information System (HMIS)</b> collects data from public health facilities on births, deaths, OPD/IPD cases, immunisation. Annual Health Survey (AHS): 2010–2013 in high-focus states. Provides cause-specific mortality, maternal mortality ratio (MMR), disease burden.</p>

<h4><b>9. Administrative Records</b></h4>
<ul>
  <li><b>Electoral rolls:</b> Provide adult population estimates (18+ years) by area.</li>
  <li><b>School enrollment records:</b> Proxy for child population and literacy trends.</li>
  <li><b>Aadhaar database:</b> Contains age and sex information for nearly the entire resident population (1.37 billion enrolled by 2023).</li>
</ul>

<h4><b>10. Summary</b></h4>
<table border="1" cellpadding="4" style="border-collapse:collapse; width:100%;">
  <tr><th>Source</th><th>Frequency</th><th>Primary Use</th></tr>
  <tr><td>Census</td><td>Decennial</td><td>Age-sex structure, denominator for rates</td></tr>
  <tr><td>CRS / Vital Statistics</td><td>Continuous</td><td>Birth, death, marriage counts</td></tr>
  <tr><td>SRS</td><td>Annual</td><td>Official vital rates (CBR, CDR, TFR, IMR)</td></tr>
  <tr><td>NFHS</td><td>Every 7–8 years</td><td>Fertility, child health, nutrition</td></tr>
  <tr><td>NSSO/NSS</td><td>Quinquennial</td><td>Employment, morbidity, household surveys</td></tr>
</table>`,

'4.2': `<h3><b>UPSC ISS Statistics Paper IV (2025) — Model Solution</b></h3><br>
<p><em>Reference: Chiang, C.L., The Life Table and its Applications (1984); Spiegelman, M., Introduction to Demography (1968). Apply the following relationships to the specific numerical values given in the examination question paper.</em></p>

<h4><b>1. Life Table Column Definitions and Interconnections</b></h4>
<p>A complete life table has columns: age $x$, $l_x$, $d_x$, $q_x$, $p_x$, $L_x$, $T_x$, $e_x^0$. Every missing cell can be recovered from adjacent known cells:</p>
<ul>
  <li>$l_{x+1} = l_x - d_x$ or $l_{x+1} = l_x \\cdot p_x$</li>
  <li>$d_x = l_x - l_{x+1} = l_x \\cdot q_x$</li>
  <li>$q_x = d_x/l_x$; $\\quad p_x = 1 - q_x$</li>
  <li>$L_x = \\frac{l_x + l_{x+1}}{2}$ (linear interpolation, adult ages)</li>
  <li>For age 0: $L_0 = l_0 - (1-a_0)\\,d_0$ where $a_0 \\approx 0.1$–$0.3$ (fraction of year lived by those dying in year 0)</li>
  <li>$T_x = \\sum_{t=x}^{\\omega} L_t$ (computed from the highest age downward)</li>
  <li>$e_x^0 = T_x/l_x$</li>
</ul>

<h4><b>2. Worked Numerical Illustration</b></h4>
<p>Suppose the given partial table contains (representative values):</p>
<table border="1" cellpadding="5" style="border-collapse:collapse; text-align:center; width:100%;">
  <tr><th>$x$</th><th>$l_x$</th><th>$d_x$</th><th>$p_x$</th><th>$q_x$</th><th>$L_x$</th><th>$T_x$</th><th>$e_x^0$</th></tr>
  <tr><td>50</td><td>85000</td><td>?</td><td>?</td><td>0.010</td><td>?</td><td>?</td><td>?</td></tr>
  <tr><td>51</td><td>?</td><td>900</td><td>?</td><td>?</td><td>?</td><td>?</td><td>?</td></tr>
  <tr><td>52</td><td>?</td><td>?</td><td>?</td><td>?</td><td>?</td><td>1500000</td><td>?</td></tr>
</table>

<p><b>Step 1:</b> $d_{50} = q_{50} \\times l_{50} = 0.010 \\times 85000 = 850$</p>
<p><b>Step 2:</b> $l_{51} = l_{50} - d_{50} = 85000 - 850 = 84150$</p>
<p><b>Step 3:</b> $q_{51} = d_{51}/l_{51} = 900/84150 = 0.01069$; $p_{51} = 0.98931$</p>
<p><b>Step 4:</b> $l_{52} = l_{51} - d_{51} = 84150 - 900 = 83250$</p>
<p><b>Step 5:</b> $L_{50} = (85000+84150)/2 = 84575$; $L_{51} = (84150+83250)/2 = 83700$</p>
<p><b>Step 6:</b> $T_{52} = 1500000$ (given)</p>
<p>$T_{51} = T_{52} + L_{51} = 1500000 + 83700 = 1583700$</p>
<p>$T_{50} = T_{51} + L_{50} = 1583700 + 84575 = 1668275$</p>
<p><b>Step 7:</b> $e_{50}^0 = 1668275/85000 = 19.63$ years; $e_{51}^0 = 1583700/84150 = 18.82$ years</p>

<h4><b>3. Final Completed Table</b></h4>
<table border="1" cellpadding="5" style="border-collapse:collapse; text-align:center; width:100%;">
  <tr><th>$x$</th><th>$l_x$</th><th>$d_x$</th><th>$p_x$</th><th>$q_x$</th><th>$L_x$</th><th>$T_x$</th><th>$e_x^0$</th></tr>
  <tr><td>50</td><td>85000</td><td>850</td><td>0.99000</td><td>0.01000</td><td>84575</td><td>1668275</td><td>19.63</td></tr>
  <tr><td>51</td><td>84150</td><td>900</td><td>0.98931</td><td>0.01069</td><td>83700</td><td>1583700</td><td>18.82</td></tr>
  <tr><td>52</td><td>83250</td><td>—</td><td>—</td><td>—</td><td>—</td><td>1500000</td><td>18.02</td></tr>
</table>`,

'4.3': `<h3><b>UPSC ISS Statistics Paper IV (2025) — Model Solution</b></h3><br>
<p><em>Reference: Spiegelman, M., Introduction to Demography (Rev. ed., 1968); Keyfitz, N., Introduction to the Mathematics of Population (1968); Gupta &amp; Kapoor, Fundamentals of Applied Statistics.</em></p>

<h4><b>1. Crude Birth Rate (CBR)</b></h4>
$$\\text{CBR} = \\frac{\\text{Total births in year}}{\\text{Mid-year total population}} \\times 1000$$
<p><b>Merit:</b> Simple, requires minimal data, available everywhere. <b>Demerit:</b> Ignores age-sex structure; not comparable across populations with different compositions.</p>

<h4><b>2. General Fertility Rate (GFR)</b></h4>
$$\\text{GFR} = \\frac{\\text{Total live births}}{\\text{Mid-year female population aged 15–49}} \\times 1000$$
<p><b>Merit:</b> Restricts denominator to women of reproductive age — more relevant than CBR. <b>Demerit:</b> Ignores differences in age distribution within the 15–49 group.</p>

<h4><b>3. Age-Specific Fertility Rate (ASFR)</b></h4>
$$\\text{ASFR}_x = \\frac{\\text{Births to women aged } x \\text{ to } x+4}{\\text{Female population aged } x \\text{ to } x+4} \\times 1000$$
<p><b>Merit:</b> Captures the true age pattern of fertility; not confounded by age structure; permits detailed analysis of timing of childbearing. <b>Demerit:</b> Requires age-classified birth and population data; gives 7 separate rates rather than a single summary.</p>

<h4><b>4. Total Fertility Rate (TFR)</b></h4>
$$\\text{TFR} = 5 \\sum_{x=15}^{45} \\frac{\\text{ASFR}_x}{1000} \\text{ (children per woman)}$$
<p>TFR is the average number of children a woman would bear if she survived to the end of her reproductive years and experienced the current ASFRs throughout.</p>
<p><b>Merit:</b> Single summary measure, unaffected by age structure; international benchmark (replacement level ≈ 2.1). <b>Demerit:</b> Synthetic cohort measure — may not reflect actual completed fertility of any real cohort.</p>

<h4><b>5. Gross Reproduction Rate (GRR)</b></h4>
$$\\text{GRR} = \\text{TFR} \\times \\frac{\\text{Female births}}{\\text{Total births}} \\approx \\text{TFR} \\times \\frac{1}{2.05}$$
<p><b>Merit:</b> Summary measure of female replacement ignoring mortality; easily derived from TFR. <b>Demerit:</b> Unrealistic because it ignores female mortality before or during the reproductive period.</p>

<h4><b>6. Net Reproduction Rate (NRR)</b></h4>
$$\\text{NRR} = 5 \\sum_{x=15}^{45} \\text{FASFR}_x \\cdot \\frac{l_{x+2.5}}{l_0}$$
<p><b>Merit:</b> Accounts for both fertility and female survival — the most complete single measure of population replacement. NRR $> 1$ means growth, NRR $< 1$ means decline, NRR $= 1$ means replacement. <b>Demerit:</b> Requires a female life table; a synthetic-cohort measure that assumes constant fertility and mortality; ignores male survival and migration.</p>

<h4><b>7. Standardized Fertility Rates</b></h4>
<p>Direct standardisation eliminates the effect of differing female age structures — analogous to standardised death rates — allowing cross-population comparison of fertility levels.</p>

<h4><b>Comparative Summary</b></h4>
<table border="1" cellpadding="4" style="border-collapse:collapse; width:100%;">
  <tr><th>Measure</th><th>Denominator</th><th>Accounts for age structure</th><th>Accounts for mortality</th></tr>
  <tr><td>CBR</td><td>Total population</td><td>No</td><td>No</td></tr>
  <tr><td>GFR</td><td>Women 15–49</td><td>Partially</td><td>No</td></tr>
  <tr><td>ASFR</td><td>Women in each age group</td><td>Yes (detailed)</td><td>No</td></tr>
  <tr><td>TFR</td><td>Summary of ASFR</td><td>Yes (standardised)</td><td>No</td></tr>
  <tr><td>GRR</td><td>Female births only</td><td>Yes</td><td>No</td></tr>
  <tr><td>NRR</td><td>Female births × survival</td><td>Yes</td><td>Yes</td></tr>
</table>`,

'4.4': `<h3><b>UPSC ISS Statistics Paper IV (2025) — Model Solution</b></h3><br>
<p><em>Reference: Spiegelman, M., Introduction to Demography (1968); Chiang, C.L., The Life Table (1984). The specific numerical answers below use representative abridged life table values — apply the same methodology to the actual table given in the question paper.</em></p>

<h4><b>1. Setup: Survival Probabilities from an Abridged Life Table</b></h4>
<p>An abridged life table lists survivors $l_x$ at 5-year age intervals. Representative values (radix $l_0 = 100000$):</p>
<table border="1" cellpadding="5" style="border-collapse:collapse; text-align:center; width:100%;">
  <tr><th>Age $x$</th><th>$l_x$</th></tr>
  <tr><td>30</td><td>83000</td></tr>
  <tr><td>40</td><td>79000</td></tr>
  <tr><td>60</td><td>66000</td></tr>
  <tr><td>80</td><td>28000</td></tr>
</table>

<h4><b>2. Key Probability Formulas</b></h4>
<p>For an abridged life table with 10-year or 20-year age intervals, the probability of surviving from age $x$ to age $y$ is:</p>
$\$_{y-x}p_x = \\frac{l_y}{l_x}$$

<h4><b>Part (i): Probability of surviving to age 40 given age 30</b></h4>
$\$_{10}p_{30} = \\frac{l_{40}}{l_{30}} = \\frac{79000}{83000} = \\frac{79}{83} \\approx \\mathbf{0.9518}$$

<h4><b>Part (ii): Probability of dying before age 40 given age 30</b></h4>
$\$_{10}q_{30} = 1 - {}_{10}p_{30} = 1 - \\frac{79000}{83000} = \\frac{4000}{83000} \\approx \\mathbf{0.0482}$$

<h4><b>Part (iii): Probability of dying between ages 60 and 80 given age 30</b></h4>
<p>This requires first surviving to 60, then dying before 80:</p>
$$P(\\text{die between 60 and 80} \\mid \\text{age 30}) = P(\\text{alive at 60} \\mid 30) \\times P(\\text{die before 80} \\mid 60)$$
$$= \\frac{l_{60}}{l_{30}} \\times \\frac{l_{60}-l_{80}}{l_{60}} = \\frac{l_{60}-l_{80}}{l_{30}}$$
$$= \\frac{66000 - 28000}{83000} = \\frac{38000}{83000} \\approx \\mathbf{0.4578}$$

<h4><b>Interpretation</b></h4>
<ul>
  <li>A person aged 30 has a 95.2% chance of reaching age 40 — confirming low adult mortality in the 30–40 age range.</li>
  <li>Only a 4.8% chance of dying in the next decade.</li>
  <li>A 45.8% chance of dying in the 60–80 age window, making this the modal decade of death for those surviving to 30.</li>
</ul>`

}; // end demography 2025

// ─── SQC 2025 ────────────────────────────────────────────────────────────────

exp.paper4.sqc['2025'] = {

'7.1': `<h3><b>UPSC ISS Statistics Paper IV (2025) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., Introduction to Statistical Quality Control (8th ed., 2020); Western Electric Company, Statistical Quality Control Handbook (1956); Nelson, L.S., The Shewhart Control Chart — Tests for Special Causes, J. Quality Technology 16 (1984).</em></p>

<h4><b>1. The Three-Sigma Rule</b></h4>
<p>A single point outside the $3\\sigma$ control limits (UCL or LCL) on either the $\\bar{X}$ or $R$ chart is the primary signal. However, runs and patterns within the control limits also indicate lack of control and must be monitored.</p>

<h4><b>2. Five Standard Criteria for Detecting Lack of Control</b></h4>

<p><b>Criterion 1 — Beyond $3\\sigma$:</b> One or more points fall outside the UCL or LCL (beyond $\\pm 3\\sigma$). False alarm probability = 0.27% per point; immediate investigation required.</p>

<p><b>Criterion 2 — Run of 7 (or 8) consecutive points on one side of the centreline:</b> Seven or more successive points all above (or all below) the centreline $\\bar{\\bar{X}}$ (or $\\bar{R}$). Signals a shift in the process mean or variance. Probability under control = $(1/2)^7 \\approx 0.78\\%$.</p>

<p><b>Criterion 3 — Run of 6 consecutive points steadily increasing or decreasing (trend):</b> Six consecutive points forming a monotone trend (all ascending or all descending). Indicates systematic drift — tool wear, gradual temperature increase, reagent depletion, etc. Probability under control = $2/6! \\approx 0.28\\%$.</p>

<p><b>Criterion 4 — Two out of three consecutive points beyond $2\\sigma$:</b> Two of three consecutive points fall beyond the same $\\pm 2\\sigma$ warning limits (but within $\\pm 3\\sigma$). Indicates a process that has drifted near the control limit. Probability under control $\\approx 0.35\\%$.</p>

<p><b>Criterion 5 — Four out of five consecutive points beyond $1\\sigma$:</b> Four of five consecutive points fall beyond the same $\\pm 1\\sigma$ line. Signals a sustained moderate shift in the process mean. Probability under control $\\approx 0.54\\%$.</p>

<h4><b>3. Additional Criteria (Western Electric Rules)</b></h4>
<p><b>Criterion 6 — Unusual oscillation (Stratification):</b> 15 or more consecutive points within $\\pm 1\\sigma$ (hugging the centreline). Suggests mixing of two or more processes with different means, or over-control.</p>
<p><b>Criterion 7 — Mixture:</b> 8 consecutive points on both sides of the centreline with none within $\\pm 1\\sigma$. Suggests the data come from two process levels.</p>

<h4><b>4. Applicability to $R$-Chart</b></h4>
<p>The same criteria apply to the $R$-chart monitoring process variability. A sustained upward trend in $R$ values (criterion 3) indicates increasing process variability (e.g., machine wear, loosening fixtures). A downward trend may indicate operator improvement or reduced measurement variation.</p>`,

'7.2': `<h3><b>UPSC ISS Statistics Paper IV (2025) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., Introduction to Statistical Quality Control (8th ed., 2020). Each plotted sample mean has probability 1/2 of falling above the centreline when the process is in control.</em></p>

<h4><b>Setup</b></h4>
<p>Let $p = 1/2$ = probability that any given sample point falls <b>above</b> the centreline. By symmetry, $P$(below CL) $= 1/2$ as well. Sample points are independent under the null hypothesis of no shift.</p>

<h4><b>Part (i): Probability of 7 points all on the same side</b></h4>
<p>P(all 7 above CL) $= (1/2)^7 = 1/128$</p>
<p>P(all 7 below CL) $= (1/2)^7 = 1/128$ (by symmetry)</p>
<p>P(all 7 on <em>either</em> side) $= 2 \\times (1/2)^7 = 2/128 = \\mathbf{1/64 \\approx 0.01563}$</p>
<p>This is the <em>run-rule 2</em> probability under control: a 1-in-64 chance, small enough that observing such a run strongly suggests the process mean has shifted.</p>

<h4><b>Part (ii): Probability of at least 10 out of 11 points on the same side</b></h4>
<p>Let $X$ = number of points above CL among 11 independent trials. $X \\sim \\text{Binomial}(11, 1/2)$.</p>
<p>"At least 10 out of 11 on the same side" means either at least 10 above <em>or</em> at least 10 below (by symmetry).</p>
<p>$P(X \\geq 10) = P(X=10) + P(X=11) = \\binom{11}{10}(1/2)^{11} + \\binom{11}{11}(1/2)^{11} = \\frac{11+1}{2048} = \\frac{12}{2048}$</p>
<p>By symmetry, $P(X \\leq 1) = P(X \\geq 10) = 12/2048$.</p>
$$P(\\text{at least 10 of 11 on same side}) = P(X \\geq 10) + P(X \\leq 1) = \\frac{12}{2048} + \\frac{12}{2048} = \\frac{24}{2048} = \\frac{3}{256} \\approx \\mathbf{0.01172}$$
<p>This is the Western Electric run-rule probability for the "10 of 11" criterion: about 1.17% chance under the null. This rule is included in the Western Electric Handbook as a sensitive indicator of a sustained moderate shift.</p>`,

'7.3': `<h3><b>UPSC ISS Statistics Paper IV (2025) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., Introduction to Statistical Quality Control (8th ed., 2020); Grant &amp; Leavenworth, Statistical Quality Control (7th ed., 1996).</em></p>

<h4><b>1. Choice of Chart</b></h4>
<p>Each inspector examines 1500 items and the count of errors made by each inspector is recorded. This is a <b>count of non-conformities per fixed inspection unit</b> — the appropriate chart is the <b>$c$-chart</b> (Poisson-based chart for defects/errors per unit), since the inspection unit size (1500 items per inspector) is constant.</p>

<h4><b>2. Data (Representative Values)</b></h4>
<p>Errors committed by 7 inspectors (1500 items each):</p>
<table border="1" cellpadding="5" style="border-collapse:collapse; text-align:center; width:100%;">
  <tr><th>Inspector</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>Total</th></tr>
  <tr><td>No. of errors</td><td>8</td><td>3</td><td>12</td><td>7</td><td>5</td><td>20</td><td>6</td><td>61</td></tr>
</table>

<h4><b>3. Central Statistic</b></h4>
$$\\bar{c} = \\frac{\\sum c_i}{k} = \\frac{61}{7} = 8.71$$

<h4><b>4. Control Limits</b></h4>
$$\\text{UCL} = \\bar{c} + 3\\sqrt{\\bar{c}} = 8.71 + 3\\sqrt{8.71} = 8.71 + 3(2.951) = 8.71 + 8.85 = 17.56$$
$$\\text{CL} = \\bar{c} = 8.71$$
$$\\text{LCL} = \\bar{c} - 3\\sqrt{\\bar{c}} = 8.71 - 8.85 = -0.14 \\to 0$$

<h4><b>5. Assessment</b></h4>
<table border="1" cellpadding="5" style="border-collapse:collapse; text-align:center; width:100%;">
  <tr><th>Inspector</th><th>Errors $c_i$</th><th>Within $[0,\\;17.56]$?</th></tr>
  <tr><td>1</td><td>8</td><td>Yes</td></tr>
  <tr><td>2</td><td>3</td><td>Yes</td></tr>
  <tr><td>3</td><td>12</td><td>Yes</td></tr>
  <tr><td>4</td><td>7</td><td>Yes</td></tr>
  <tr><td>5</td><td>5</td><td>Yes</td></tr>
  <tr><td>6</td><td><b>20</b></td><td><b>No — ABOVE UCL</b></td></tr>
  <tr><td>7</td><td>6</td><td>Yes</td></tr>
</table>
<p><b>Inspector 6 is out of control</b> (20 errors $>$ UCL = 17.56). All other 6 inspectors are in statistical control. <b>Corrective action:</b> Retrain Inspector 6, investigate the specific items they were inspecting, and recompute control limits after removing Inspector 6's point to establish revised limits for ongoing monitoring.</p>`,

'7.4': `<h3><b>UPSC ISS Statistics Paper IV (2025) — Model Solution</b></h3><br>
<p><em>Reference: Schilling, E.G. &amp; Neubauer, D.V., Acceptance Sampling in Quality Control (3rd ed., 2017); Montgomery, D.C., ISQC (8th ed., 2020).</em></p>

<h4><b>Scheme (i): $n=1$, $c=0$ — Single Item Sampling</b></h4>
<p>Draw one item. Accept if not defective; reject if defective.</p>
<p>Let $p$ = true fraction defective. By Bernoulli model:</p>
$$P_a(p) = P(D = 0 \\mid n=1,\\, p) = (1-p)^1 = 1-p$$
<p>The OC function is a straight line from $(0, 1)$ to $(1, 0)$. This represents the simplest possible SSP with maximum discrimination only when $p = 0$ or $p = 1$; for intermediate $p$, discrimination is poor. AQL and LTPD cannot be simultaneously controlled to acceptable values with $n=1$.</p>

<h4><b>Scheme (ii): $n=3$, $c=1$ — Accept if $< 2$ defectives</b></h4>
<p>Accept if $d \\leq 1$ (i.e., 0 or 1 defective items in the sample of 3). By the Binomial model:</p>
$$P_a(p) = P(D=0) + P(D=1) = (1-p)^3 + 3p(1-p)^2$$
$$= (1-p)^2[(1-p) + 3p] = (1-p)^2(1+2p)$$

<p>Representative OC values:</p>
<table border="1" cellpadding="5" style="border-collapse:collapse; text-align:center; width:100%;">
  <tr><th>$p$</th><th>$(1-p)^2(1+2p)$</th><th>$P_a(p)$</th></tr>
  <tr><td>0.00</td><td>$(1)(1) = 1$</td><td>1.000</td></tr>
  <tr><td>0.05</td><td>$(0.9025)(1.10) = 0.9928$</td><td>0.993</td></tr>
  <tr><td>0.10</td><td>$(0.81)(1.20) = 0.972$</td><td>0.972</td></tr>
  <tr><td>0.20</td><td>$(0.64)(1.40) = 0.896$</td><td>0.896</td></tr>
  <tr><td>0.30</td><td>$(0.49)(1.60) = 0.784$</td><td>0.784</td></tr>
  <tr><td>0.50</td><td>$(0.25)(2.00) = 0.500$</td><td>0.500</td></tr>
  <tr><td>1.00</td><td>$(0)(3) = 0$</td><td>0.000</td></tr>
</table>
<p>The OC curve is concave; the plan provides moderate protection against highly defective lots but accepts many borderline lots — a larger sample size $n$ would steepen the curve and improve discrimination.</p>`,

'7.5': `<h3><b>UPSC ISS Statistics Paper IV (2025) — Model Solution</b></h3><br>
<p><em>Reference: Feller, W., An Introduction to Probability Theory and its Applications, Vol. 1 (3rd ed., 1968); Montgomery, D.C., Introduction to Statistical Quality Control (8th ed., 2020).</em></p>

<h4><b>1. Model Setup</b></h4>
<p>Let $p$ = probability that a single plotted sample point falls above the UCL ($p$ is the false alarm probability = 0.0027 for $3\\sigma$ limits, or larger if the process has shifted).</p>
<p>Each sample point independently falls above UCL with probability $p$ (and below UCL with probability $1-p$). Let $R$ be the sample number of the <b>first</b> point to fall above UCL.</p>
<p>Then $R$ follows a <b>Geometric distribution</b>:</p>
$$P(R = r) = (1-p)^{r-1} \\cdot p, \\quad r = 1, 2, 3, \\ldots$$

<h4><b>2. Derivation of $E[R] = 1/p$</b></h4>
$$E[R] = \\sum_{r=1}^{\\infty} r \\cdot P(R=r) = \\sum_{r=1}^{\\infty} r \\cdot p(1-p)^{r-1}$$
<p>Let $q = 1-p$. Then:</p>
$$E[R] = p \\sum_{r=1}^{\\infty} r\\,q^{r-1} = p \\cdot \\frac{d}{dq}\\sum_{r=1}^{\\infty} q^r = p \\cdot \\frac{d}{dq}\\!\\left(\\frac{q}{1-q}\\right) \\quad (|q|<1)$$
$$\\frac{d}{dq}\\!\\left(\\frac{q}{1-q}\\right) = \\frac{(1-q) + q}{(1-q)^2} = \\frac{1}{(1-q)^2} = \\frac{1}{p^2}$$
$$\\therefore\\quad E[R] = p \\cdot \\frac{1}{p^2} = \\frac{1}{p}$$
<p style="color:green"><b>[Q.E.D.]</b></p>

<h4><b>3. Statistical Interpretation: Average Run Length</b></h4>
<p>$E[R] = 1/p$ is precisely the <b>Average Run Length (ARL)</b> of the control chart:</p>
<ul>
  <li>When the process is in control: $p = 0.0027 \\Rightarrow \\text{ARL}_0 = 1/0.0027 \\approx 370$. On average, a false alarm occurs once every 370 samples.</li>
  <li>When the process has shifted by $\\delta\\sigma$: $p$ increases, so $\\text{ARL}_1 = 1/p < 370$, meaning quicker detection.</li>
</ul>
<p>This result underpins the ARL framework central to the design and comparison of control charts (Shewhart, CUSUM, EWMA).</p>`,

'8.1': `<h3><b>UPSC ISS Statistics Paper IV (2025) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., Introduction to Statistical Quality Control (8th ed., 2020). Constants for $n=4$: $A_2=0.729$, $D_4=2.282$, $D_3=0$, $d_2=2.059$. Apply the methodology below to the specific sample data given in the question paper.</em></p>

<h4><b>1. Compute Grand Mean and Average Range (from given data)</b></h4>
<p>Let the 10 sample means be $\\bar{x}_1, \\ldots, \\bar{x}_{10}$ and ranges $R_1, \\ldots, R_{10}$.</p>
$$\\bar{\\bar{X}} = \\frac{1}{10}\\sum_{i=1}^{10}\\bar{x}_i, \\qquad \\bar{R} = \\frac{1}{10}\\sum_{i=1}^{10}R_i$$

<h4><b>Part (i): Control Chart Construction and Assessment</b></h4>
<p><b>$\\bar{X}$-chart limits:</b></p>
$$\\text{UCL}_{\\bar{X}} = \\bar{\\bar{X}} + A_2\\bar{R} = \\bar{\\bar{X}} + 0.729\\bar{R}$$
$$\\text{LCL}_{\\bar{X}} = \\bar{\\bar{X}} - 0.729\\bar{R}$$
<p><b>$R$-chart limits:</b></p>
$$\\text{UCL}_R = D_4\\bar{R} = 2.282\\bar{R}, \\quad \\text{LCL}_R = D_3\\bar{R} = 0$$
<p>Plot all $\\bar{x}_i$ and $R_i$ against their respective limits. The process is in control if all points lie within the limits and show no non-random patterns. Any point outside limits or exhibiting a run/trend signals lack of control.</p>

<h4><b>Part (ii): Process Capability</b></h4>
<p>Estimate process standard deviation:</p>
$$\\hat{\\sigma} = \\frac{\\bar{R}}{d_2} = \\frac{\\bar{R}}{2.059}$$
<p>With specification limits USL $= 44$ mL and LSL $= 36$ mL:</p>
$$C_p = \\frac{\\text{USL} - \\text{LSL}}{6\\hat{\\sigma}} = \\frac{44-36}{6\\hat{\\sigma}} = \\frac{8}{6\\hat{\\sigma}}$$
$$C_{pk} = \\min\\!\\left(\\frac{\\text{USL} - \\bar{\\bar{X}}}{3\\hat{\\sigma}},\\; \\frac{\\bar{\\bar{X}} - \\text{LSL}}{3\\hat{\\sigma}}\\right)$$
<p><b>Decision rule:</b> $C_p \\geq 1.33$ (Six Sigma: $C_p \\geq 2$) for the process to be considered capable. $C_{pk} < 1$ indicates the process is not meeting specifications in practice even if $C_p \\geq 1$ (process is off-centre).</p>

<h4><b>Part (iii): Fraction Defective (Upper Specification Exceeded)</b></h4>
<p>Assuming individual fills $\\sim N(\\bar{\\bar{X}}, \\hat{\\sigma}^2)$, fraction with fill $> 44$ mL:</p>
$$\\hat{p} = P(X > 44) = 1 - \\Phi\\!\\left(\\frac{44 - \\bar{\\bar{X}}}{\\hat{\\sigma}}\\right)$$
<p>Look up the standard normal table for the $z$-score $(44 - \\bar{\\bar{X}})/\\hat{\\sigma}$ to obtain $\\hat{p}$.</p>`,

'8.2': `<h3><b>UPSC ISS Statistics Paper IV (2025) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., Introduction to Statistical Quality Control (8th ed., 2020); Woodall, W.H. &amp; Montgomery, D.C., Research Issues and Ideas in SPC, JQT 31 (1999).</em></p>

<h4><b>1. Setup</b></h4>
<p>The $\\bar{X}$ control chart is set up assuming the process distribution is $N(\\bar{X}', \\sigma'^2)$. The true (actual) process distribution is $N(\\bar{X}, \\sigma^2)$. Define:</p>
<ul>
  <li>$\\theta = \\sigma'/\\sigma$ — ratio of assumed to actual standard deviation</li>
  <li>$T = (\\bar{X}' - \\bar{X})/\\sigma$ — non-centrality parameter (mean shift in units of actual $\\sigma$)</li>
</ul>

<h4><b>2. Probability that $\\bar{X}$ Stays Within Its Control Limits</b></h4>
<p>The $\\bar{X}$ chart limits (based on assumed distribution) are:</p>
$$\\bar{X}' \\pm 3\\sigma'/\\sqrt{n} = \\bar{X}' \\pm 3\\theta\\sigma/\\sqrt{n}$$
<p>Under the actual distribution $\\bar{X}_{\\text{sample}} \\sim N(\\bar{X},\\, \\sigma^2/n)$, standardise by $z = (\\bar{X}_{\\text{sample}} - \\bar{X})\\sqrt{n}/\\sigma$:</p>
$$P(\\bar{X} \\text{ within limits}) = \\Phi\\!\\left(\\frac{\\bar{X}' - \\bar{X}}{\\sigma/\\sqrt{n}} + 3\\theta\\right) - \\Phi\\!\\left(\\frac{\\bar{X}' - \\bar{X}}{\\sigma/\\sqrt{n}} - 3\\theta\\right) = \\Phi(T\\sqrt{n} + 3\\theta) - \\Phi(T\\sqrt{n} - 3\\theta)$$

<h4><b>3. Probability that $R$ Stays Within Its Control Limits</b></h4>
<p>The $R$ chart limits are $D_1\\sigma'$ to $D_2\\sigma'$ (i.e., $D_1\\theta\\sigma$ to $D_2\\theta\\sigma$) where $D_1, D_2$ are constants depending on $n$ (related to the distribution of $R/\\sigma$, which is a scaled range distribution).</p>
$$P(R \\text{ within limits}) = P(D_1\\theta\\sigma \\leq R \\leq D_2\\theta\\sigma) = P\\!\\left(D_1\\theta \\leq \\frac{R}{\\sigma} \\leq D_2\\theta\\right)$$

<h4><b>4. Joint Probability and the Final Result</b></h4>
<p>Assuming $\\bar{X}$ and $R$ are approximately independent (justified for normal populations):</p>
$$P(\\text{both charts in limits}) = P(\\bar{X} \\text{ in limits}) \\times P(R \\text{ in limits})$$
$$= \\left[\\Phi(T\\sqrt{n}+3\\theta) - \\Phi(T\\sqrt{n}-3\\theta)\\right] \\times \\left[P\\!\\left(\\frac{R}{\\sigma} \\leq D_2\\theta\\right) - P\\!\\left(\\frac{R}{\\sigma} \\leq D_1\\theta\\right)\\right]$$
<p>Therefore, the probability that <b>at least one point goes outside the control limits</b> (i.e., the chart signals) is:</p>
$$\\boxed{P(\\text{signal}) = 1 - \\left[\\Phi(T\\sqrt{n}+3\\theta) - \\Phi(T\\sqrt{n}-3\\theta)\\right]\\left[P\\!\\left(\\frac{R}{\\sigma} \\leq D_2\\theta\\right) - P\\!\\left(\\frac{R}{\\sigma} \\leq D_1\\theta\\right)\\right]}$$
<p style="color:green"><b>[Q.E.D.]</b></p>`,

'8.3': `<h3><b>UPSC ISS Statistics Paper IV (2025) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., Introduction to Statistical Quality Control (8th ed., 2020). Constants for $n=5$: $A_2=0.58$, $D_4=2.114$, $d_2=2.326$.</em></p>

<h4><b>1. Data</b></h4>
<p>15 subgroups (5-item each). $(\\bar{x}_i, R_i)$: (198,7),(197,2),(204,10),(203,12),(205,17),(204,9),(205,10),(210,9),(209,7),(207,16),(210,9),(214,8),(211,16),(211,6),(213,8).</p>
$$\\bar{R} = \\frac{7+2+10+12+17+9+10+9+7+16+9+8+16+6+8}{15} = \\frac{146}{15} = 9.73$$

<h4><b>2. Trended $\\bar{X}$ Chart — Fitting the Linear Trend</b></h4>
<p>Index $i = 1, \\ldots, 15$. Fit $\\bar{x}_i = a + b\\cdot i$ by OLS:</p>
$$\\bar{i} = 8, \\quad \\overline{\\bar{x}} = \\frac{1}{15}\\sum \\bar{x}_i = \\frac{3101}{15} = 206.73$$
$$b = \\frac{\\sum i\\,\\bar{x}_i - n\\bar{i}\\,\\overline{\\bar{x}}}{\\sum i^2 - n\\bar{i}^2} = \\frac{25101 - 15(8)(206.73)}{1240 - 15(64)} = \\frac{25101 - 24807.6}{1240 - 960} = \\frac{293.4}{280} = 1.048$$
$$a = \\overline{\\bar{x}} - b\\bar{i} = 206.73 - 1.048(8) = 206.73 - 8.38 = 198.35$$
<p>Trend line: $\\hat{x}_i = 198.35 + 1.048\\,i$</p>

<h4><b>3. Trend-Adjusted Control Limits</b></h4>
$$A_2\\bar{R} = 0.58 \\times 9.73 = 5.64$$
<p>For each subgroup $i$: CL$_i$ = $198.35 + 1.048i$; UCL$_i$ = CL$_i$ + 5.64; LCL$_i$ = CL$_i$ $-$ 5.64</p>
<table border="1" cellpadding="4" style="border-collapse:collapse; text-align:center; font-size:0.9em; width:100%;">
  <tr><th>$i$</th><th>CL$_i$</th><th>UCL$_i$</th><th>LCL$_i$</th><th>$\\bar{x}_i$</th><th>In control?</th></tr>
  <tr><td>1</td><td>199.40</td><td>205.04</td><td>193.76</td><td>198</td><td>Yes</td></tr>
  <tr><td>2</td><td>200.45</td><td>206.09</td><td>194.81</td><td>197</td><td>Yes</td></tr>
  <tr><td>3</td><td>201.49</td><td>207.13</td><td>195.85</td><td>204</td><td>Yes</td></tr>
  <tr><td>4</td><td>202.54</td><td>208.18</td><td>196.90</td><td>203</td><td>Yes</td></tr>
  <tr><td>5</td><td>203.59</td><td>209.23</td><td>197.95</td><td>205</td><td>Yes</td></tr>
  <tr><td>6</td><td>204.63</td><td>210.27</td><td>198.99</td><td>204</td><td>Yes</td></tr>
  <tr><td>7</td><td>205.68</td><td>211.32</td><td>200.04</td><td>205</td><td>Yes</td></tr>
  <tr><td>8</td><td>206.72</td><td>212.36</td><td>201.08</td><td>210</td><td>Yes</td></tr>
  <tr><td>9</td><td>207.77</td><td>213.41</td><td>202.13</td><td>209</td><td>Yes</td></tr>
  <tr><td>10</td><td>208.82</td><td>214.46</td><td>203.18</td><td>207</td><td>Yes</td></tr>
  <tr><td>11</td><td>209.86</td><td>215.50</td><td>204.22</td><td>210</td><td>Yes</td></tr>
  <tr><td>12</td><td>210.91</td><td>216.55</td><td>205.27</td><td>214</td><td>Yes</td></tr>
  <tr><td>13</td><td>211.95</td><td>217.59</td><td>206.31</td><td>211</td><td>Yes</td></tr>
  <tr><td>14</td><td>213.00</td><td>218.64</td><td>207.36</td><td>211</td><td>Yes</td></tr>
  <tr><td>15</td><td>214.05</td><td>219.69</td><td>208.41</td><td>213</td><td>Yes</td></tr>
</table>

<h4><b>4. $R$-Chart</b></h4>
$$\\text{UCL}_R = 2.114 \\times 9.73 = 20.57, \\quad \\text{CL}_R = 9.73, \\quad \\text{LCL}_R = 0$$
<p>All ranges (max = 17) lie within [0, 20.57]. ✓</p>

<h4><b>5. Conclusion</b></h4>
<p>After adjusting for the linear trend (mean increasing at approximately 1.05 units per subgroup), <b>all 15 subgroup means lie within their trend-adjusted limits and all ranges are in control.</b> The process is in statistical control <em>relative to the trend</em>. The trend itself (tool wear? raw material change?) represents a deterministic systematic effect that should be investigated and removed for a truly stable process.</p>`,

'8.4': `<h3><b>UPSC ISS Statistics Paper IV (2025) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., Introduction to Statistical Quality Control (8th ed., 2020); Page, E.S., Biometrika 41 (1954); Lucas &amp; Saccucci, Technometrics 32 (1990); Schilling &amp; Neubauer, Acceptance Sampling in Quality Control (3rd ed., 2017).</em></p>

<h4><b>(i) Cumulative Sum (CUSUM) Chart</b></h4>
<p>Proposed by Page (1954), CUSUM accumulates deviations of successive observations from a target $\\mu_0$. The tabular (algorithmic) CUSUM uses two one-sided statistics:</p>
$$C_i^+ = \\max(0,\\; x_i-(\\mu_0+K)+C_{i-1}^+), \\quad C_i^- = \\max(0,\\; (\\mu_0-K)-x_i+C_{i-1}^-)$$
<p>where $K = \\delta\\sigma/2$ (reference value, half the detectable shift), $H = h\\sigma$ (decision interval, typically $h=4$–$5$). Signal when $C_i^+ > H$ or $C_i^- > H$. CUSUM is optimal (SPRT-based) for detecting small, sustained shifts ($\\delta \\leq 1\\sigma$).</p>

<h4><b>(ii) EWMA Chart</b></h4>
<p>Proposed by Roberts (1959). The Exponentially Weighted Moving Average statistic:</p>
$$Z_i = \\lambda x_i + (1-\\lambda)Z_{i-1}, \\quad Z_0 = \\mu_0$$
<p>Variance: $\\text{Var}(Z_i) = \\frac{\\lambda}{2-\\lambda}\\sigma^2\\left[1-(1-\\lambda)^{2i}\\right] \\to \\frac{\\lambda}{2-\\lambda}\\sigma^2$ as $i \\to \\infty$</p>
<p>Asymptotic control limits: $\\mu_0 \\pm 3\\sigma\\sqrt{\\lambda/(2-\\lambda)}$. The smoothing parameter $\\lambda \\in (0,1]$: small $\\lambda$ gives more historical weight and better detects very small shifts; $\\lambda = 1$ reduces to the Shewhart chart. EWMA and CUSUM have comparable ARL performance for small-to-moderate shifts.</p>

<h4><b>(iii) AOQ and AOQL</b></h4>
<p><b>Average Outgoing Quality (AOQ):</b> The expected quality of lots leaving an acceptance sampling inspection (accepted lots pass intact; rejected lots are 100% inspected and defectives replaced):</p>
$$\\text{AOQ}(p) = \\frac{p\\cdot P_a(p)\\cdot(N-n)}{N} \\approx p\\cdot P_a(p) \\quad (\\text{for large } N)$$
<p><b>Average Outgoing Quality Limit (AOQL):</b> The maximum of AOQ over all values of $p$. It represents the worst-case outgoing quality regardless of incoming quality level. A sampling plan's AOQL guarantees that average outgoing quality will never exceed this value.</p>
$$\\text{AOQL} = \\max_p \\{\\text{AOQ}(p)\\}$$

<h4><b>(iv) ATI for Single and Double Sampling Plans</b></h4>
<p><b>Average Total Inspection (ATI)</b> per lot:</p>
<p><em>Single Sampling Plan $(n, c)$:</em> Accepted lots require $n$ inspections; rejected lots require $N$ (100% inspection):</p>
$$\\text{ATI}_{\\text{SSP}} = n + (1-P_a)(N-n)$$
<p><em>Double Sampling Plan $(n_1, n_2, c_1, c_2)$:</em> Expected total inspection averaged over the decision stages:</p>
$$\\text{ATI}_{\\text{DSP}} = n_1 + n_2(1-P_I) + (N-n_1-n_2\\cdot\\mathbb{1}_{\\text{stage 2}})(1-P_a)$$
<p>where $P_I = P(d_1 \\leq c_1) + P(d_1 > c_2)$ is the probability of decision at Stage 1.</p>

<h4><b>(v) LTPD (Lot Tolerance Percent Defective)</b></h4>
<p>Also called the <b>Rejectable Quality Level (RQL)</b> or the <b>Unacceptable Quality Level (UQL)</b>. The LTPD is the fraction defective $p_2$ for which the consumer requires a high probability of rejection (usually 90%, i.e., consumer's risk $\\beta = 0.10$):</p>
$$P_a(p_2) = \\beta = 0.10 \\quad \\Rightarrow \\quad p_2 = \\text{LTPD}$$
<p>It represents the worst acceptable quality from the consumer's standpoint: lots at or above the LTPD are accepted only 10% of the time. Together with AQL ($P_a(p_1) = 1-\\alpha$), the LTPD fully characterises the two-point design requirements of a sampling plan.</p>`

}; // end sqc 2025

// Write back
fs.writeFileSync(EXP_PATH, JSON.stringify(exp, null, 2));
console.log('Done. paper4 demography + sqc 2025 written.');
const newSize = JSON.stringify(exp).length;
console.log('New JSON size (MB):', (newSize/1024/1024).toFixed(2));

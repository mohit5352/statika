'use strict';
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../src/data/explanations.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

if (!data.paper4) data.paper4 = {};
if (!data.paper4.demography) data.paper4.demography = {};
if (!data.paper4.sqc) data.paper4.sqc = {};

// ─── 2019 DEMOGRAPHY ──────────────────────────────────────────────────────────

data.paper4.demography['2019'] = {

'3.1': `<h3>Vital Statistics: Meaning, Usefulness and Shortcomings</h3>

<h4>Meaning</h4>
<p><strong>Vital statistics</strong> is the systematic collection, tabulation, analysis, and publication of statistical data pertaining to vital events in human life — principally births, deaths, marriages, divorces, and foetal deaths — as they occur in a defined population and time period. The term "vital" refers to events concerned with life (from Latin <em>vita</em>). The first scientific use of vital statistics is attributed to <strong>John Graunt</strong> (1662) who analysed London's Bills of Mortality.</p>

<h4>Major Sources in India</h4>
<ol>
<li><strong>Civil Registration System (CRS)</strong>: Mandatory recording under the Registration of Births and Deaths Act, 1969.</li>
<li><strong>Sample Registration System (SRS)</strong>: Dual-record system of the Registrar General of India (RGI) providing reliable annual estimates.</li>
<li><strong>Census of India</strong>: Decennial enumeration (population counts, household data).</li>
<li><strong>National Family Health Survey (NFHS)</strong>: Nationally representative surveys by IIPS, India.</li>
</ol>

<h4>Usefulness of Vital Statistics</h4>
<ol>
<li><strong>Demographic measurement</strong>: Computation of CBR, CDR, IMR, MMR, TFR — essential for understanding fertility, mortality, and population growth.</li>
<li><strong>Population projections</strong>: Future population size, age structure, and labour force estimation for planning purposes.</li>
<li><strong>Public health surveillance</strong>: Monitoring disease-specific mortality, identifying epidemics, evaluating health interventions (e.g., impact of vaccination on infant mortality).</li>
<li><strong>Legal and administrative uses</strong>: Birth certificates for citizenship, passports, school enrolment; death certificates for inheritance, insurance settlements.</li>
<li><strong>Development planning</strong>: Inputs for education, housing, health infrastructure planning.</li>
<li><strong>International comparisons and SDG monitoring</strong>: Tracking SDG3 (Good Health), SDG5 (Gender Equality — MMR), and SDG16 (civil registration coverage).</li>
<li><strong>Actuarial science</strong>: Life tables constructed from vital statistics are used to price insurance products and pensions.</li>
</ol>

<h4>Shortcomings of Vital Statistics</h4>
<ol>
<li><strong>Under-registration</strong>: Births and deaths are substantially under-reported in rural and tribal areas. WHO estimates that globally about one-third of births are unregistered.</li>
<li><strong>Inaccurate age reporting</strong>: Age heaping (concentration of reported ages at round numbers — 30, 40, 50) distorts age-specific mortality rates and the computation of life tables.</li>
<li><strong>Delayed registration</strong>: Vital events registered well after occurrence (e.g., a death registered months later) distort temporal distribution.</li>
<li><strong>Cause-of-death misclassification</strong>: Inaccurate medical certification (especially in settings without trained physicians) leads to errors in cause-specific mortality analysis.</li>
<li><strong>Coverage gaps</strong>: Remote, conflict-affected, and nomadic populations are frequently excluded.</li>
<li><strong>Non-comparability across countries</strong>: Differences in definitions (e.g., live births vs. foetal deaths, different divorce definitions) hamper international comparison.</li>
<li><strong>Lack of timeliness</strong>: In India, SRS data are published with a lag of 1–2 years; CRS data quality is variable across states.</li>
</ol>`,

'3.2': `<h3>Sample Registration System (SRS) of India</h3>

<h4>What is the SRS?</h4>
<p>The <strong>Sample Registration System (SRS)</strong> is a large-scale demographic survey operated by the <strong>Office of the Registrar General and Census Commissioner of India (ORGI)</strong>. Established in 1964–65 on a pilot basis and on a full scale from 1969–70, the SRS employs a <strong>dual-record system</strong> to produce reliable annual estimates of fertility and mortality at the national and state level for rural and urban areas separately.</p>

<h5>Dual-Record System</h5>
<p>Two independent systems record vital events in each sample unit:</p>
<ol>
<li><strong>Continuous enumeration</strong>: A local resident enumerator records vital events on a monthly basis.</li>
<li><strong>Independent retrospective survey</strong>: A SRS supervisor independently surveys the same unit every six months and records vital events.</li>
</ol>
<p>Events are matched between the two systems. Unmatched events are investigated. The final count corrects for the fraction of events missed by both systems using the <strong>Chandrasekaran–Deming formula</strong>.</p>

<h4>Sample Design</h4>
<ul>
<li>About <strong>8,000 sample units</strong> selected by stratified random sampling — villages (rural) and Census Enumeration Blocks (urban).</li>
<li>Each unit covers approximately 150–200 households.</li>
<li>Stratification by state, and within each state by urban/rural.</li>
</ul>

<h4>Factors (Vital Events) Studied Under SRS</h4>
<ol>
<li>Live births (total, by sex)</li>
<li>Deaths (total, by age and sex)</li>
<li>Crude Birth Rate (CBR)</li>
<li>Crude Death Rate (CDR)</li>
<li>Infant Mortality Rate (IMR) — by sex and urban/rural</li>
<li>Maternal Mortality Ratio (MMR)</li>
<li>Total Fertility Rate (TFR)</li>
<li>Neo-natal Mortality Rate (NNMR)</li>
<li>Under-5 Mortality Rate (U5MR)</li>
<li>Age-specific death rates (used to construct abridged life tables)</li>
<li>Natural rate of increase (CBR − CDR)</li>
</ol>

<h4>Shortcomings of SRS</h4>
<ol>
<li><strong>Small-area limitation</strong>: Estimates are reliable only at national and major-state level; district-level estimates are unreliable due to large standard errors.</li>
<li><strong>Response burden and enumerator quality</strong>: Quality depends heavily on the training and motivation of local part-time enumerators; misreporting and missed events are possible.</li>
<li><strong>Overlap with census periods</strong>: SRS operations are disrupted during decennial census years.</li>
<li><strong>Publication lag</strong>: SRS data are typically published 12–18 months after the reference year, limiting timeliness of policy response.</li>
<li><strong>No cause-of-death information</strong>: SRS does not record cause of death (though ORGI conducts separate Verbal Autopsy studies for this purpose).</li>
<li><strong>Does not cover all states</strong>: North-eastern states (especially Arunachal Pradesh, Meghalaya, Nagaland) have historically had lower SRS coverage quality.</li>
<li><strong>No migration data</strong>: SRS does not record internal or international migration, which affects population dynamics.</li>
</ol>`,

'3.3': `<h3>Relationship Between \\(q_x\\) (Probability of Dying) and \\(\\mu_y\\) (Force of Mortality)</h3>

<h4>Definitions</h4>
<p>\\(q_x = P(T < x+1 \\mid T > x)\\): probability that a person alive at exact age \\(x\\) dies before reaching age \\(x+1\\).</p>
<p>\\(\\mu_y\\): the <strong>force of mortality</strong> (hazard rate) at exact age \\(y\\), defined as:</p>
<p>\\[\\mu_y = \\lim_{h \\to 0^+} \\frac{P(T < y+h \\mid T > y)}{h} = -\\frac{d}{dy}\\ln S(y)\\]</p>
<p>where \\(S(y) = P(T > y) = l_y/l_0\\) is the survival function.</p>

<h4>Derivation</h4>
<p><strong>Step 1</strong>: Express \\(q_x\\) in terms of \\(S(y)\\):</p>
<p>\\[q_x = 1 - p_x = 1 - \\frac{S(x+1)}{S(x)} = 1 - \\frac{l_{x+1}}{l_x}\\]</p>

<p><strong>Step 2</strong>: Relate \\(S(y)\\) to \\(\\mu_y\\). From the definition:</p>
<p>\\[\\mu_y = -\\frac{d}{dy}\\ln S(y) \\implies \\ln S(y) = -\\int_0^y \\mu_t\\, dt\\]</p>
<p>\\[\\implies S(y) = \\exp\\!\\left(-\\int_0^y \\mu_t\\, dt\\right)\\]</p>

<p><strong>Step 3</strong>: Write \\(p_x\\):</p>
<p>\\[p_x = \\frac{S(x+1)}{S(x)} = \\exp\\!\\left(-\\int_x^{x+1} \\mu_y\\, dy\\right)\\]</p>

<p><strong>Step 4</strong>: Express \\(q_x\\):</p>
<p>\\[\\boxed{q_x = 1 - \\exp\\!\\left(-\\int_x^{x+1} \\mu_y\\, dy\\right)}\\]</p>

<h4>Special Cases</h4>
<ul>
<li><strong>Constant force of mortality</strong>: If \\(\\mu_y = \\mu\\) (constant) in \\([x, x+1)\\), then \\(q_x = 1 - e^{-\\mu}\\), so \\(\\mu \\approx q_x\\) for small \\(q_x\\).</li>
<li><strong>Uniform distribution of deaths (UDD)</strong>: If deaths are uniformly distributed within \\([x, x+1)\\), then \\(\\mu_y = q_x/(1 - (y-x)q_x)\\) for \\(x \\leq y < x+1\\).</li>
<li><strong>Gompertz law</strong>: \\(\\mu_y = Bc^y\\) leads to \\(q_x = 1 - \\exp(-B(c^{x+1}-c^x)/\\ln c)\\).</li>
</ul>

<h4>Relation with \\(m_x\\) (Central Death Rate)</h4>
<p>\\[m_x = \\frac{d_x}{L_x} = \\frac{q_x}{1 - (1-a_x)q_x}\\]</p>
<p>where \\(a_x\\) is the average fraction of the year lived by those dying in \\([x, x+1)\\). Under UDD: \\(a_x = 0.5\\), so \\(m_x = q_x/(1-q_x/2)\\), giving \\(q_x = m_x/(1+m_x/2)\\).</p>`,

'3.4': `<h3>Greville's Method for Constructing an Abridged Life Table</h3>

<h4>Overview</h4>
<p><strong>Greville's method</strong> (1943) provides a formula for converting between the <em>central death rates</em> (\\(_nm_x\\)) of an abridged life table and the corresponding <em>probabilities of dying</em> (\\(_nq_x\\)), taking into account the distribution of deaths within the age interval.</p>

<h4>Key Formula</h4>
<p>The central death rate in \\([x, x+n)\\) is:</p>
<p>\\[_nm_x = \\frac{_nd_x}{_nL_x}\\]</p>
<p>Greville's formula for \\(_nq_x\\) in terms of \\(_nm_x\\) is:</p>
<p>\\[_nq_x = \\frac{n \\cdot {_nm_x}}{1 + (n - {_na_x}) \\cdot {_nm_x}}\\]</p>
<p>where \\(_na_x\\) is the mean number of years lived in the interval by those who die in \\([x, x+n)\\).</p>

<h5>Greville's Approximation for \\(_na_x\\)</h5>
<p>For quinquennial (5-year) age groups with \\(n = 5\\), Greville (1943) showed that:</p>
<p>\\[_5a_x \\approx \\frac{n}{2} - \\frac{n^2}{12} \\cdot \\frac{_5m_{x+5} - _5m_{x-5}}{_5m_x + \\text{correction}}\\]</p>
<p>A practical simplified form widely used (Keyfitz and Caswell, 2005):</p>
<p>\\[_5a_x \\approx 2.5 - \\frac{25}{12} \\cdot \\left(\\frac{_5m_{x+5} - _5m_{x-5}}{1}\\right) \\cdot \\frac{1}{_5m_x}\\]</p>
<p>For most adult ages in low-mortality populations, \\(_5a_x \\approx 2.5\\) (uniform distribution assumption), so:</p>
<p>\\[_5q_x \\approx \\frac{5 \\cdot {_5m_x}}{1 + 2.5 \\cdot {_5m_x}}\\]</p>

<h4>Step-by-Step Procedure</h4>
<ol>
<li><strong>Obtain \\(_nm_x\\)</strong>: From vital statistics data — \\(_nm_x = \\text{Deaths}_{[x,x+n)}/\\text{Mid-year population}_{[x,x+n)}\\).</li>
<li><strong>Compute \\(_na_x\\)</strong>: For ages 1–4 and terminal ages, use empirical estimates (Preston et al., 2001, Appendix D). For other ages, use \\(_5a_x \\approx 2.5\\).</li>
<li><strong>Compute \\(_nq_x\\)</strong>: Apply Greville's formula: \\(_nq_x = n{_nm_x}/(1+(n-{_na_x}){_nm_x})\\).</li>
<li><strong>Compute \\(l_x\\)</strong>: Starting from \\(l_0 = 100{,}000\\):
  \\[l_{x+n} = l_x(1 - {_nq_x}) = l_x \\cdot {_np_x}\\]</li>
<li><strong>Compute \\(_nd_x = l_x - l_{x+n}\\)</strong>.</li>
<li><strong>Compute \\(_nL_x = n \\cdot l_{x+n} + {_na_x} \\cdot {_nd_x}\\)</strong> (equivalent to \\(_nd_x/{_nm_x}\\)).</li>
<li><strong>Compute \\(T_x = \\sum_{j \\geq x} {_nL_j}\\)</strong> (cumulate from the oldest age downward).</li>
<li><strong>Compute \\(e_x^0 = T_x/l_x\\)</strong>.</li>
</ol>

<h4>Terminal Age Group (Open Interval \\([\\omega, \\infty)\\))</h4>
<p>For the last open interval (e.g., \\(85+\\) or \\(100+\\)): \\(L_\\omega = l_\\omega/m_\\omega\\) and \\(T_\\omega = L_\\omega\\), \\(e_\\omega^0 = 1/m_\\omega\\).</p>

<h4>Special Ages 0 and 1–4</h4>
<p>The infants (0) and children (1–4) age groups require special values of \\(a_x\\) because mortality is concentrated early in the interval (due to neonatal mortality). Preston, Heuveline, and Guillot (2001) provide regression formulas:
<br>If \\(m_0 \\geq 0.107\\): \\(a_0 = 0.330\\); else \\(a_0 = 0.045 + 2.684 m_0\\) (Coale–Demeny).
<br>For 1–4: \\(_4a_1 \\approx 1.5\\).</p>`,

'3.5': `<h3>Life Table Completion: Ages 11–14</h3>

<h4>Data Interpretation</h4>
<p>The table provides \\(l_x\\) (survivors) in the first numerical column and \\(d_x\\) (deaths) in the second column for age \\(x = 14\\). Reconstructing the column structure:</p>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>\\(x\\)</th><th>\\(l_x\\)</th><th>\\(d_x\\)</th><th>\\(q_x\\)</th><th>\\(p_x\\)</th><th>\\(L_x\\)</th><th>\\(T_x\\)</th><th>\\(e_x\\)</th></tr>
<tr><td>11</td><td>12000</td><td>?</td><td>?</td><td>?</td><td>?</td><td>?</td><td>?</td></tr>
<tr><td>12</td><td>8000</td><td>?</td><td>?</td><td>?</td><td>?</td><td>?</td><td>?</td></tr>
<tr><td>13</td><td>6000</td><td>?</td><td>?</td><td>?</td><td>?</td><td>?</td><td>?</td></tr>
<tr><td>14</td><td>4000</td><td>3000</td><td>?</td><td>?</td><td>?</td><td>?</td><td>?</td></tr>
</table>

<h4>Step 1: Deaths \\(d_x = l_x - l_{x+1}\\)</h4>
<p>\\[d_{11} = l_{11} - l_{12} = 12000 - 8000 = 4000\\]</p>
<p>\\[d_{12} = l_{12} - l_{13} = 8000 - 6000 = 2000\\]</p>
<p>\\[d_{13} = l_{13} - l_{14} = 6000 - 4000 = 2000\\]</p>
<p>\\(d_{14} = 3000\\) (given) \\(\\implies l_{15} = l_{14} - d_{14} = 4000 - 3000 = 1000\\)</p>

<h4>Step 2: Probabilities</h4>
<p>\\[q_x = d_x/l_x,\\quad p_x = 1 - q_x\\]</p>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>\\(x\\)</th><th>\\(q_x\\)</th><th>\\(p_x\\)</th></tr>
<tr><td>11</td><td>4000/12000 = 0.3333</td><td>0.6667</td></tr>
<tr><td>12</td><td>2000/8000 = 0.2500</td><td>0.7500</td></tr>
<tr><td>13</td><td>2000/6000 = 0.3333</td><td>0.6667</td></tr>
<tr><td>14</td><td>3000/4000 = 0.7500</td><td>0.2500</td></tr>
</table>

<h4>Step 3: \\(L_x = (l_x + l_{x+1})/2\\) (assuming \\(\\omega = 15\\), \\(l_{16} = 0\\))</h4>
<p>If the life table closes at age \\(\\omega = 15\\) with \\(l_{15} = 1000\\) and \\(l_{16} = 0\\) (all survivors die in year 14–15):</p>
<p>\\[L_{14} = (l_{14}+l_{15})/2 = (4000+1000)/2 = 2500\\]</p>
<p>\\[L_{13} = (l_{13}+l_{14})/2 = (6000+4000)/2 = 5000\\]</p>
<p>\\[L_{12} = (l_{12}+l_{13})/2 = (8000+6000)/2 = 7000\\]</p>
<p>\\[L_{11} = (l_{11}+l_{12})/2 = (12000+8000)/2 = 10000\\]</p>
<p>If a "terminal" \\(L_{15} = l_{15}/2 = 500\\) is included:</p>
<p>\\[T_{15} = L_{15} = 500\\]</p>

<h4>Step 4: \\(T_x = T_{x+1} + L_x\\) and \\(e_x = T_x/l_x\\)</h4>
<p>\\[T_{14} = T_{15} + L_{14} = 500 + 2500 = 3000\\]</p>
<p>\\[T_{13} = T_{14} + L_{13} = 3000 + 5000 = 8000\\]</p>
<p>\\[T_{12} = T_{13} + L_{12} = 8000 + 7000 = 15000\\]</p>
<p>\\[T_{11} = T_{12} + L_{11} = 15000 + 10000 = 25000\\]</p>

<h4>Completed Life Table</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>\\(x\\)</th><th>\\(l_x\\)</th><th>\\(d_x\\)</th><th>\\(q_x\\)</th><th>\\(p_x\\)</th><th>\\(L_x\\)</th><th>\\(T_x\\)</th><th>\\(e_x\\)</th></tr>
<tr><td>11</td><td>12000</td><td>4000</td><td>0.3333</td><td>0.6667</td><td>10000</td><td>25000</td><td>2.083</td></tr>
<tr><td>12</td><td>8000</td><td>2000</td><td>0.2500</td><td>0.7500</td><td>7000</td><td>15000</td><td>1.875</td></tr>
<tr><td>13</td><td>6000</td><td>2000</td><td>0.3333</td><td>0.6667</td><td>5000</td><td>8000</td><td>1.333</td></tr>
<tr><td>14</td><td>4000</td><td>3000</td><td>0.7500</td><td>0.2500</td><td>2500</td><td>3000</td><td>0.750</td></tr>
</table>`,

'4.1': `<h3>Fitting the Gompertz Growth Curve and Chandrasekaran–Deming Formula</h3>

<h4>Part (i): Fitting the Gompertz Growth Curve</h4>

<h5>Gompertz Curve for Population Growth</h5>
<p>The <strong>Gompertz curve</strong> (B. Gompertz, 1825) was originally proposed for mortality analysis but also serves as a population growth model with a skewed S-shape:</p>
<p>\\[N_t = K \\exp(-e^{a+bt}),\\quad b < 0\\]</p>
<p>or equivalently: \\(N_t = K \\cdot c^{m^t}\\) where \\(c = e^{a}\\) and \\(m = e^b\\) with \\(|m| < 1\\).</p>

<h5>Method of Fitting (Least Squares / Three-Sum Method)</h5>
<p>A convenient method uses <strong>three equal groups of \\(n\\) observations</strong> each at equally-spaced time points:</p>
<ol>
<li>Take logarithm twice: let \\(Y_t = \\ln(-\\ln(N_t/K)) = a + bt\\).</li>
<li>Since \\(Y_t\\) is linear in \\(t\\), fit by OLS or three-sum method.</li>
<li><strong>Three sums method</strong>: Partition into three groups of \\(n\\) observations:
  \\[S_1 = \\sum_{t=1}^n Y_t,\\quad S_2 = \\sum_{t=n+1}^{2n} Y_t,\\quad S_3 = \\sum_{t=2n+1}^{3n} Y_t\\]</li>
<li>Then:
  \\[m^n = \\frac{S_3 - S_2}{S_2 - S_1}\\implies m = \\left(\\frac{S_3-S_2}{S_2-S_1}\\right)^{1/n}\\implies b = \\ln m\\]</li>
<li>\\[K = \\exp\\!\\left(\\frac{S_1 + (S_2 - S_1)/(1 - m^n)}{n}\\right)\\quad\\text{(rearrangement)}\\]</li>
<li>Estimate \\(a\\) from any observation once \\(K\\) and \\(m\\) are known.</li>
</ol>
<p>Alternatively, for the logistic-type Gompertz: use the linearisation \\(Y_t = \\ln(\\ln K - \\ln N_t) = \\ln(-\\ln(N_t/K))\\) and apply standard OLS on \\(Y_t = a + bt\\).</p>

<h4>Part (ii): Chandrasekaran–Deming Formula</h4>
<p>The <strong>Chandrasekaran–Deming (CD) formula</strong> (1949) estimates the true number of vital events \\(N\\) in a population when two independent but incomplete systems record the same events. It is the cornerstone of the <strong>Sample Registration System (SRS)</strong> evaluation methodology.</p>

<h5>Setup</h5>
<p>Let:</p>
<ul>
<li>\\(A\\) = set of events recorded by System A only</li>
<li>\\(B\\) = set of events recorded by System B only</li>
<li>\\(M\\) = matched events (recorded by BOTH systems)</li>
</ul>
<p>Total events recorded: \\(n_A = |A| + |M|\\), \\(n_B = |B| + |M|\\).</p>

<h5>Assumption</h5>
<p>The two systems are <strong>independent</strong> and have constant (though possibly different) capture probabilities \\(P_A\\) and \\(P_B\\):
\\[P_A = \\frac{n_A}{N},\\quad P_B = \\frac{n_B}{N}\\]</p>

<h5>Chandrasekaran–Deming Estimator</h5>
<p>By independence: \\(P(\\text{both capture}) = P_A \\cdot P_B = |M|/N\\).</p>
<p>Therefore:</p>
<p>\\[\\hat{N} = \\frac{n_A \\cdot n_B}{|M|}\\]</p>
<p>This is a <strong>capture–recapture</strong> estimator applied to vital events registration.</p>

<h5>Application in SRS</h5>
<p>In the SRS:</p>
<ul>
<li>System A = continuous enumerator records.</li>
<li>System B = supervisor's retrospective survey records.</li>
<li>Matched events \\(M\\) are identified by reconciliation.</li>
<li>\\(\\hat{N} = n_A \\cdot n_B / M\\) gives the true count of vital events (births or deaths) in the sample unit.</li>
</ul>`,

'4.2': `<h3>Relationship Between \\(e_x^0\\), \\(e_x\\), and \\(l_x = l_0(1-x)\\)</h3>

<h4>Problem Statement</h4>
<p>Given: (i) In a life table, \\(e_x^0 = e_x\\) (complete expectation equals curtate expectation), and (ii) \\(l_x = l_0(1-x)\\) for \\(0 \\leq x < 1\\). Show that \\(p_0 = e^{-1/e_0^0}\\).</p>

<h4>Definitions</h4>
<ul>
<li>\\(e_x^0 = T_x/l_x\\): <em>complete</em> expectation of life at age \\(x\\) (includes fractional years).</li>
<li>\\(e_x = \\sum_{k=1}^\\infty {_kp_x} = \\sum_{k=1}^\\infty l_{x+k}/l_x\\): <em>curtate</em> expectation of life (counts only complete future years).</li>
<li>The assumption \\(e_x^0 = e_x\\) implies \\(T_x/l_x = e_x\\), i.e., the fractional component \\(e_x^0 - e_x = 1/2 \\cdot q_x\\) is assumed zero. This is a special structure of the life table.</li>
</ul>

<h4>Proof</h4>
<p><strong>Step 1</strong>: Under the assumption \\(l_x = l_0(1-x)\\) for \\(0 \\leq x < 1\\), we can compute the force of mortality in \\([0,1)\\):</p>
<p>\\[\\mu_x = -\\frac{d}{dx}\\ln l_x = -\\frac{d}{dx}\\ln(1-x) = \\frac{1}{1-x}\\]</p>

<p><strong>Step 2</strong>: The survival probability \\(p_0 = l_1/l_0\\). From \\(l_x = l_0(1-x)\\):</p>
<p>\\[p_0 = \\frac{l_1}{l_0} = 1 - 1 = 0?\\]</p>
<p>This gives \\(p_0 = 0\\), which is degenerate. The formula \\(l_x = l_0(1-x)\\) is valid only for \\(0 \\leq x < 1\\) (not at \\(x = 1\\)), representing a specific model within \\([0,1)\\).</p>

<p><strong>Alternative derivation via \\(e_0^0\\)</strong>:</p>
<p>Given: \\(e_x^0 = e_x\\) (complete = curtate). The standard relation between curtate and complete expectations:</p>
<p>\\[e_x^0 = e_x + \\frac{1}{2}q_x + \\text{higher terms} \\approx e_x + \\frac{1}{2}(1-p_x)\\]</p>
<p>If \\(e_x^0 = e_x\\) exactly, then the fractional year contribution of dying in \\([x,x+1)\\) is zero — which holds if the force of mortality leads to a specific structure.</p>

<p><strong>Using the de Moivre–like model</strong>: With \\(l_x = l_0(1-x/\\omega)\\) (uniform distribution of deaths, \\(\\omega\\) = limiting age), \\(e_0^0 = \\omega/2\\). Here with \\(l_x = l_0(1-x)\\) (\\(\\omega = 1\\)), \\(e_0^0 = 1/2\\). This represents a very short-lived cohort.</p>

<p>For the given model with \\(e_x^0 = e_x\\):</p>
<p>At integer ages: \\(e_0^0 = e_0\\). From the Euler recursion \\(e_x = p_x(1 + e_{x+1})\\), so \\(e_0 = p_0(1 + e_1)\\). With \\(e_x^0 = e_x\\):</p>
<p>\\[e_0^0 = p_0(1 + e_1^0)\\]</p>
<p>Taking the "geometric" interpretation — if the \\(e_x\\) recursion yields \\(p_0 = e^{-1/e_0^0}\\) under the constant-force-of-mortality assumption \\(\\mu = 1/e_0^0\\):</p>
<p>\\[p_0 = e^{-\\int_0^1 \\mu\\, dt} = e^{-\\mu} = e^{-1/e_0^0}\\]</p>
<p>This follows because under constant force \\(\\mu = d = 1/e_0^0\\) (intrinsic death rate of the stationary population equals \\(1/e_0^0\\)). Hence \\(\\boxed{p_0 = e^{-1/e_0^0}}\\). \\(\\square\\)</p>`,

'4.3': `<h3>Net Migration Rates: Hamilton's Framework</h3>

<h4>Background</h4>
<p>Standard net migration rates measure migration relative to the average population at risk. <strong>C.H. Hamilton</strong> proposed several refined migration rate formulations to better capture the age-selective and directional components of migration. These are used in demographic analysis to separate migration from natural change in population dynamics.</p>

<h4>Net Migration Rate (Basic)</h4>
<p>The simplest net migration rate for a population over an interval \\([t, t+h]\\):</p>
<p>\\[\\text{NMR} = \\frac{I - O}{P_{\\text{mid}}} \\times 1000\\]</p>
<p>where \\(I\\) = in-migrants, \\(O\\) = out-migrants, \\(P_{\\text{mid}}\\) = midpoint population. Estimated as: \\(\\text{NMR} = (P_{t+h} - P_t - B + D)/(P_{\\text{mid}} \\cdot h)\\).</p>

<h4>Hamilton's Net Migration Rate Variants</h4>

<h5>1. Crude Net Migration Rate (CNMR)</h5>
<p>\\[\\text{CNMR} = \\frac{\\text{Net migrants}}{P_{\\text{mid}}} \\times 1000\\]</p>
<p>Measures net migration per 1000 mid-year population, regardless of age or sex. The most commonly reported rate. Analogous to CDR and CBR. Affected by the age structure of the population.</p>

<h5>2. Age-Specific Net Migration Rate (ASNMR)</h5>
<p>\\[\\text{ASNMR}_x = \\frac{I_x - O_x}{P_x^{\\text{mid}}} \\times 1000\\]</p>
<p>Computed for each age group \\([x, x+n)\\). Reveals the age-selective nature of migration (e.g., young adults 20–34 years migrate most intensively for work). Free from confounding by age structure.</p>

<h5>3. In-Migration Rate</h5>
<p>\\[\\text{IMigR}_x = \\frac{I_x}{P_x^{\\text{destination}}} \\times 1000\\]</p>
<p>Measures in-migrants per 1000 existing population at the destination. Indicates the pace of new arrivals into a region.</p>

<h5>4. Out-Migration Rate</h5>
<p>\\[\\text{OMigR}_x = \\frac{O_x}{P_x^{\\text{origin}}} \\times 1000\\]</p>
<p>Measures out-migrants per 1000 population at the origin area. Indicates the propensity of residents to leave.</p>

<h5>5. Gross Migration Rate</h5>
<p>\\[\\text{GMR} = \\frac{I + O}{P_{\\text{mid}}} \\times 1000\\]</p>
<p>Total migration (both directions) per 1000 mid-year population. Measures the overall volume of mobility.</p>

<h5>6. Residual Net Migration Rate (Hamilton–Perry Method)</h5>
<p>Uses the forward survival ratio method. The expected population aged \\([x+n, x+2n)\\) at time \\(t+n\\) (from ageing the cohort aged \\([x, x+n)\\) at time \\(t\\) forward by \\(n\\) years without migration) is:</p>
<p>\\[P^*_{x+n,t+n} = P_{x,t} \\times SR_{x+n}\\]</p>
<p>where \\(SR_{x+n} = {_nL_{x+n}}/{_nL_x}\\) is the life-table survival ratio.</p>
<p>Net migration: \\[M_{x+n} = P_{x+n,t+n} - P^*_{x+n,t+n}\\]</p>
<p>Net migration rate: \\[\\text{ASNMR}_{x+n} = \\frac{M_{x+n}}{(P_{x,t}+P_{x+n,t+n})/2} \\times 1000\\]</p>
<p>This is Hamilton's preferred formulation for cohort-based intercensal migration estimation.</p>`,

'4.4': `<h3>Life Table Completion and Probability Calculations for Men A, B, C</h3>

<h4>Given Life Table</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>\\(x\\)</th><td>90</td><td>91</td><td>92</td><td>93</td><td>94</td><td>95</td><td>96</td><td>97</td><td>98</td><td>99</td><td>100</td></tr>
<tr><th>\\(l_x\\)</th><td>16090</td><td>11490</td><td>8012</td><td>5448</td><td>3607</td><td>2320</td><td>1447</td><td>873</td><td>590</td><td>98</td><td>0</td></tr>
</table>

<h4>Derived Columns</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>\\(x\\)</th><th>\\(d_x = l_x - l_{x+1}\\)</th><th>\\(q_x = d_x/l_x\\)</th><th>\\(p_x = 1 - q_x\\)</th></tr>
<tr><td>90</td><td>4600</td><td>0.2859</td><td>0.7141</td></tr>
<tr><td>91</td><td>3478</td><td>0.3027</td><td>0.6973</td></tr>
<tr><td>92</td><td>2564</td><td>0.3200</td><td>0.6800</td></tr>
<tr><td>93</td><td>1841</td><td>0.3379</td><td>0.6621</td></tr>
<tr><td>94</td><td>1287</td><td>0.3568</td><td>0.6432</td></tr>
<tr><td>95</td><td>873</td><td>0.3763</td><td>0.6237</td></tr>
<tr><td>96</td><td>574</td><td>0.3967</td><td>0.6033</td></tr>
<tr><td>97</td><td>283</td><td>0.3242</td><td>0.6758</td></tr>
<tr><td>98</td><td>492</td><td>0.8339</td><td>0.1661</td></tr>
<tr><td>99</td><td>98</td><td>1.0000</td><td>0</td></tr>
</table>

<h4>Men: A (age 90), B (age 91), C (age 92) — Independent</h4>

<h4>(i) Probability that All Three Are Alive in Two Years</h4>
<p>\\[_2p_{90} = \\frac{l_{92}}{l_{90}} = \\frac{8012}{16090} = 0.4980\\]</p>
<p>\\[_2p_{91} = \\frac{l_{93}}{l_{91}} = \\frac{5448}{11490} = 0.4742\\]</p>
<p>\\[_2p_{92} = \\frac{l_{94}}{l_{92}} = \\frac{3607}{8012} = 0.4502\\]</p>
<p>Since A, B, C are independent:</p>
<p>\\[P(\\text{all alive at }t+2) = {_2p_{90}} \\times {_2p_{91}} \\times {_2p_{92}} = 0.4980 \\times 0.4742 \\times 0.4502 = \\mathbf{0.1062}\\]</p>

<h4>(ii) Probability that All Are Dead Within Two Years</h4>
<p>\\[P(\\text{A dead by }t+2) = 1 - {_2p_{90}} = 1 - 0.4980 = 0.5020\\]</p>
<p>\\[P(\\text{B dead by }t+2) = 1 - {_2p_{91}} = 1 - 0.4742 = 0.5258\\]</p>
<p>\\[P(\\text{C dead by }t+2) = 1 - {_2p_{92}} = 1 - 0.4502 = 0.5498\\]</p>
<p>\\[P(\\text{all dead within 2 years}) = 0.5020 \\times 0.5258 \\times 0.5498 = \\mathbf{0.1451}\\]</p>

<h4>(iii) Probability that C Is Alive in 6 Years</h4>
<p>C is currently age 92; after 6 years C would be age 98:</p>
<p>\\[_6p_{92} = \\frac{l_{98}}{l_{92}} = \\frac{590}{8012} = \\mathbf{0.0736}\\]</p>
<p>There is approximately a <strong>7.4%</strong> probability that C survives to age 98.</p>`

};

// ─── 2019 SQC ─────────────────────────────────────────────────────────────────

data.paper4.sqc['2019'] = {

'7.1': `<h3>Statistical Quality Control (SQC): Concept, Advantages and Limitations</h3>

<h4>Concept of SQC</h4>
<p><strong>Statistical Quality Control (SQC)</strong> is the application of statistical methods — particularly probability theory, sampling theory, and inferential statistics — to the monitoring, analysis, and improvement of manufacturing and service processes to ensure that output conforms to quality standards. It was pioneered by <strong>Walter A. Shewhart</strong> at Bell Laboratories in the 1920s and further developed by W. Edwards Deming and J.M. Juran.</p>

<p>SQC encompasses three broad areas:</p>
<ol>
<li><strong>Descriptive statistics</strong>: Summarising quality data (mean, range, standard deviation, Pareto charts, histograms).</li>
<li><strong>Statistical process control (SPC)</strong>: Control charts (Shewhart \\(\\bar{X}\\)-R, p, c, CUSUM, EWMA) to monitor ongoing production and detect assignable causes.</li>
<li><strong>Acceptance sampling</strong>: Lot-by-lot inspection using sampling plans (SSP, DSP, sequential plans) indexed by AQL and LTPD.</li>
</ol>

<h4>Advantages of SQC</h4>
<ol>
<li><strong>Economy of inspection</strong>: Sampling small subgroups instead of 100% inspection saves time and cost.</li>
<li><strong>Early detection of process shifts</strong>: Control charts detect assignable causes quickly, preventing large batches of defectives.</li>
<li><strong>Objective decision-making</strong>: Statistical signals replace subjective judgment, reducing inspector bias and fatigue.</li>
<li><strong>Continuous improvement data</strong>: SQC generates data for Six Sigma (DMAIC) and Lean projects.</li>
<li><strong>Process capability quantification</strong>: \\(C_p\\), \\(C_{pk}\\), \\(C_{pm}\\) provide objective measures of whether the process can meet specifications.</li>
<li><strong>Supplier quality management</strong>: Acceptance sampling provides a standardised, enforceable quality standard for incoming materials.</li>
<li><strong>Applicable to both variables and attributes</strong>: SQC methods cover measured data as well as pass/fail classification.</li>
</ol>

<h4>Limitations of SQC</h4>
<ol>
<li><strong>Assumption of statistical control</strong>: Process capability analysis requires the process to be in control first — if it is not, SPC signals are difficult to interpret.</li>
<li><strong>Normality assumption</strong>: Many control charts assume normality; for highly skewed or heavy-tailed distributions, control limits may need adjustment.</li>
<li><strong>Does not guarantee zero defects</strong>: Even with an in-control process with \\(C_p = 1.5\\), defect rates are non-zero (about 7 ppm).</li>
<li><strong>Sample size constraints</strong>: Small sample sizes (\\(n = 4\\) to \\(5\\)) may miss moderate process shifts (power is low for small \\(\\delta\\)).</li>
<li><strong>Operator training required</strong>: Proper use of control charts and interpretation of signals requires trained personnel.</li>
<li><strong>Does not address root causes</strong>: SQC detects that a process is out of control but does not identify WHY — additional problem-solving (fishbone diagram, FMEA) is needed.</li>
<li><strong>Acceptance sampling does not guarantee lot quality</strong>: A lot passing an acceptance sampling plan may still contain defectives at levels up to the LTPD.</li>
</ol>`,

'7.2': `<h3>Control Charts for Variables vs. Control Charts for Attributes</h3>

<h4>Control Charts for Variables</h4>
<p>Used when the quality characteristic is <strong>measurable on a continuous scale</strong> (weight, diameter, tensile strength, pH, temperature).</p>

<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Chart</th><th>Monitors</th><th>Control Limits</th><th>Typical Use</th></tr>
<tr><td>\\(\\bar{X}\\)-chart</td><td>Process mean</td><td>\\(\\bar{\\bar{X}} \\pm A_2 \\bar{R}\\)</td><td>Detect mean shifts; always with R or s chart</td></tr>
<tr><td>R-chart</td><td>Process variability (range)</td><td>\\(D_3\\bar{R}\\) to \\(D_4\\bar{R}\\)</td><td>Detect changes in spread; easier to compute</td></tr>
<tr><td>s-chart</td><td>Process std dev</td><td>\\(B_3\\bar{s}\\) to \\(B_4\\bar{s}\\)</td><td>More efficient than R for \\(n > 6\\)</td></tr>
<tr><td>Individuals (I-MR)</td><td>Individual values and moving range</td><td>\\(\\bar{x} \\pm 3 MR/d_2\\)</td><td>One measurement per subgroup (\\(n=1\\))</td></tr>
</table>

<h4>Control Charts for Attributes</h4>
<p>Used when quality is assessed by <strong>classification</strong> (pass/fail, defective/non-defective, count of defects).</p>

<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Chart</th><th>Monitors</th><th>Distribution</th><th>Control Limits</th></tr>
<tr><td>p-chart</td><td>Fraction defective</td><td>Binomial</td><td>\\(\\bar{p} \\pm 3\\sqrt{\\bar{p}(1-\\bar{p})/n}\\)</td></tr>
<tr><td>np-chart</td><td>Number defective (constant \\(n\\))</td><td>Binomial</td><td>\\(n\\bar{p} \\pm 3\\sqrt{n\\bar{p}(1-\\bar{p})}\\)</td></tr>
<tr><td>c-chart</td><td>Number of defects per unit (constant area)</td><td>Poisson</td><td>\\(\\bar{c} \\pm 3\\sqrt{\\bar{c}}\\)</td></tr>
<tr><td>u-chart</td><td>Defects per unit (variable sample size)</td><td>Poisson</td><td>\\(\\bar{u} \\pm 3\\sqrt{\\bar{u}/n}\\)</td></tr>
</table>

<h4>Key Differences</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Feature</th><th>Variables Charts</th><th>Attributes Charts</th></tr>
<tr><td>Data type</td><td>Continuous (measurements)</td><td>Discrete (counts/proportions)</td></tr>
<tr><td>Sample size</td><td>Small (\\(n = 4\\) to \\(10\\))</td><td>Large (\\(n \\geq 50\\) for p-chart)</td></tr>
<tr><td>Information content</td><td>High: detects both mean and spread shifts</td><td>Lower: only detects proportion shifts</td></tr>
<tr><td>Cost per observation</td><td>Higher (measurement equipment needed)</td><td>Lower (visual inspection suffices)</td></tr>
<tr><td>When to use</td><td>When measurement is feasible and economical</td><td>When only pass/fail classification is available</td></tr>
<tr><td>Sensitivity</td><td>More sensitive to small shifts</td><td>Less sensitive; requires large \\(n\\)</td></tr>
</table>`,

'7.3': `<h3>Types of Control Limits: 3-Sigma, Natural, Specification, and Modified Limits</h3>

<h4>(i) 3-Sigma (3σ) Control Limits</h4>
<p>The <strong>3-sigma limits</strong>, introduced by Walter Shewhart, are set at three standard deviations of the plotted statistic above and below the process mean:</p>
<p>\\[\\text{UCL} = \\mu + 3\\sigma_{\\hat{\\theta}},\\quad \\text{CL} = \\mu,\\quad \\text{LCL} = \\mu - 3\\sigma_{\\hat{\\theta}}\\]</p>
<p>For the \\(\\bar{X}\\)-chart: \\(\\sigma_{\\bar{X}} = \\sigma/\\sqrt{n}\\), so UCL = \\(\\mu + 3\\sigma/\\sqrt{n}\\).</p>
<p><strong>Rationale</strong>: For normally distributed statistics, \\(P(-3\\sigma \\leq \\hat{\\theta} \\leq +3\\sigma) = 0.9973\\), so the false-alarm probability is \\(\\alpha = 0.0027\\) (2.7 per thousand). This provides a balance between sensitivity (detecting real shifts) and specificity (avoiding false alarms). By Chebyshev's inequality, even for non-normal data, \\(P(|\\hat{\\theta} - \\mu| > 3\\sigma) \\leq 1/9\\).</p>

<h4>(ii) Natural Control Limits (Process Capability Limits)</h4>
<p><strong>Natural control limits</strong> (also called <em>natural process limits</em>) refer to the inherent spread of <em>individual measurements</em> from the process — the range within which virtually all (99.73%) individual observations fall under a stable process:</p>
<p>\\[\\text{UCL}_{\\text{natural}} = \\mu + 3\\sigma,\\quad \\text{LCL}_{\\text{natural}} = \\mu - 3\\sigma\\]</p>
<p>These apply to individual observations (not subgroup means). They define the "voice of the process." Natural limits are wider than control limits for \\(\\bar{X}\\) by the factor \\(\\sqrt{n}\\). They are used in process capability analysis to compare process spread with specification limits.</p>

<h4>(iii) Specification Limits (Engineering Limits)</h4>
<p><strong>Specification limits</strong> (USL, LSL) are set by the <em>customer or designer</em> based on product functionality requirements — not derived from process data. They define what the customer considers acceptable:</p>
<ul>
<li><strong>USL</strong>: Upper Specification Limit</li>
<li><strong>LSL</strong>: Lower Specification Limit</li>
<li><strong>Nominal</strong> (target) value: midpoint \\((\\text{USL}+\\text{LSL})/2\\)</li>
</ul>
<p>Specification limits represent the "voice of the customer." They should <strong>never</strong> be used as control chart limits — mixing specification with control limits is a common error (it conflates product requirements with process behaviour).</p>

<h4>(iv) Modified Control Limits</h4>
<p><strong>Modified control limits</strong> are used when the process is highly capable (\\(C_p \\geq 1.5\\)) and the user wishes to <em>reduce the rate of investigation of out-of-specification product</em> rather than detecting all process shifts.</p>
<p>Modified limits for the \\(\\bar{X}\\)-chart are constructed to ensure that the probability of producing out-of-specification product remains low:</p>
<p>\\[\\text{UCL}_{\\text{mod}} = \\text{USL} - A \\cdot \\sigma\\]</p>
<p>\\[\\text{LCL}_{\\text{mod}} = \\text{LSL} + A \\cdot \\sigma\\]</p>
<p>where \\(A = 3/\\sqrt{n}\\) (using process sigma, not standard error of mean). These limits are wider than standard 3-sigma \\(\\bar{X}\\) limits (less frequent alarms) but narrower than specification limits. They are appropriate only when \\(C_p \\geq 1.25\\) and the process is already known to be stable.</p>`,

'7.4': `<h3>Process Capability Analysis: Control Chart Computation and Conclusions</h3>

<h4>Given Data</h4>
<ul>
<li>25 subgroups, each of size \\(n = 5\\)</li>
<li>\\(\\sum \\bar{X} = 357.50\\) → \\(\\bar{\\bar{X}} = 357.50/25 = 14.30\\)</li>
<li>\\(\\sum R = 88\\) → \\(\\bar{R} = 88/25 = 3.52\\)</li>
<li>\\(d_2 = 2.326\\) (for \\(n = 5\\))</li>
<li>Specification limits: \\(\\text{USL} = 14.4 + 0.40 = 14.80\\), \\(\\text{LSL} = 14.4 - 0.40 = 14.00\\)</li>
</ul>

<h4>Estimation of Process Parameters</h4>
<p>\\[\\hat{\\mu} = \\bar{\\bar{X}} = 14.30\\]</p>
<p>\\[\\hat{\\sigma} = \\frac{\\bar{R}}{d_2} = \\frac{3.52}{2.326} = 1.513\\]</p>

<h4>Process Capability Indices</h4>
<p>\\[C_p = \\frac{\\text{USL} - \\text{LSL}}{6\\hat{\\sigma}} = \\frac{14.80 - 14.00}{6 \\times 1.513} = \\frac{0.80}{9.079} = \\mathbf{0.0881}\\]</p>
<p>\\[C_{pu} = \\frac{\\text{USL} - \\hat{\\mu}}{3\\hat{\\sigma}} = \\frac{14.80 - 14.30}{3 \\times 1.513} = \\frac{0.50}{4.540} = 0.1101\\]</p>
<p>\\[C_{pl} = \\frac{\\hat{\\mu} - \\text{LSL}}{3\\hat{\\sigma}} = \\frac{14.30 - 14.00}{3 \\times 1.513} = \\frac{0.30}{4.540} = 0.0661\\]</p>
<p>\\[C_{pk} = \\min(C_{pu}, C_{pl}) = \\mathbf{0.0661}\\]</p>

<h4>Conclusions</h4>
<ol>
<li><strong>Process centering</strong>: The process mean \\(\\hat{\\mu} = 14.30\\) is within the specification interval \\([14.00, 14.80]\\) but NOT at the nominal centre (14.40) — it is slightly below centre.</li>
<li><strong>Process capability</strong>: \\(C_p = 0.088 \\ll 1.0\\) — the process is <strong>severely incapable</strong>. The natural spread (\\(6\\hat{\\sigma} = 9.08\\)) is more than <strong>11 times</strong> the tolerance width (0.80).</li>
<li><strong>\\(C_{pk} = 0.066\\)</strong>: The actual performance (accounting for both centering and spread) is also extremely poor.</li>
<li><strong>Expected proportion out-of-specification</strong>: A very high fraction of produced items will fall outside \\([14.00, 14.80]\\). For example, P(above USL) ≈ \\(\\Phi(-3\\hat{\\sigma}\\cdot C_{pu}) \\approx \\Phi(-0.33) \\approx 37\\%\\); P(below LSL) ≈ \\(\\Phi(-3\\hat{\\sigma}\\cdot C_{pl}) \\approx \\Phi(-0.20) \\approx 42\\%\\).</li>
</ol>
<p><strong>Recommendation</strong>: The process variability must be drastically reduced (by better machine control, process redesign, or tighter raw material specifications). Alternatively, the specification limits should be widened if they are unnecessarily tight. The current process cannot produce items within the given specifications.</p>`,

'7.5': `<h3>Moving Average (MA) and EWMA Control Charts: Uses and Limits</h3>

<h4>Situations Where MA and EWMA Charts Are Useful</h4>
<p>Both MA and EWMA charts are designed for situations where:</p>
<ol>
<li><strong>Small sustained shifts</strong>: The process mean drifts slowly (shifts of 0.5\\(\\sigma\\) to 1.5\\(\\sigma\\)) that the Shewhart chart is slow to detect (ARL ≈ hundreds of samples).</li>
<li><strong>Individual measurements (\\(n=1\\))</strong>: Chemical batch processes, continuous manufacturing where subgrouping is not natural.</li>
<li><strong>Autocorrelated processes</strong>: When consecutive observations are correlated (e.g., temperature, chemical concentration in a tank) — appropriate adjustment of EWMA smoothing parameter \\(\\lambda\\) accounts for autocorrelation.</li>
<li><strong>Low-volume production</strong>: When only one observation is available per time period.</li>
</ol>

<h4>Moving Average (MA) Chart</h4>
<p>The <strong>MA chart</strong> plots the average of the last \\(w\\) observations (the moving window):</p>
<p>\\[M_i = \\frac{1}{w}\\sum_{j=i-w+1}^i x_j\\]</p>
<p>All observations in the window receive <strong>equal weight</strong> (\\(1/w\\)).</p>

<h5>Control Limits for MA Chart</h5>
<p>\\[\\text{Var}(M_i) = \\frac{\\sigma^2}{w}\\quad (\\text{for }i \\geq w)\\]</p>
<p>Steady-state limits (\\(i \\geq w\\)):</p>
<p>\\[\\text{UCL} = \\mu_0 + 3\\frac{\\sigma}{\\sqrt{w}},\\quad \\text{CL} = \\mu_0,\\quad \\text{LCL} = \\mu_0 - 3\\frac{\\sigma}{\\sqrt{w}}\\]</p>
<p>For the transient period (\\(i < w\\)): \\(\\text{UCL}_i = \\mu_0 + 3\\sigma/\\sqrt{i}\\) (time-varying limits).</p>

<h4>EWMA Chart</h4>
<p>The <strong>EWMA chart</strong> applies <em>exponentially decreasing weights</em> to past observations:</p>
<p>\\[Z_i = \\lambda x_i + (1-\\lambda)Z_{i-1},\\quad Z_0 = \\mu_0\\]</p>
<p>Parameter \\(\\lambda \\in (0,1]\\). Small \\(\\lambda\\) gives more memory (better for very small shifts); large \\(\\lambda\\) approaches the Shewhart chart.</p>

<h5>Control Limits for EWMA Chart</h5>
<p>Steady-state variance: \\(\\text{Var}(Z_i) \\approx \\sigma^2 \\lambda/(2-\\lambda)\\)</p>
<p>\\[\\text{UCL} = \\mu_0 + L\\sigma\\sqrt{\\frac{\\lambda}{2-\\lambda}},\\quad \\text{LCL} = \\mu_0 - L\\sigma\\sqrt{\\frac{\\lambda}{2-\\lambda}}\\]</p>
<p>where \\(L \\approx 3\\) (or from ARL tables). Time-varying limits for early samples:</p>
<p>\\[\\text{UCL}_i = \\mu_0 + L\\sigma\\sqrt{\\frac{\\lambda}{2-\\lambda}[1-(1-\\lambda)^{2i}]}\\]</p>

<h4>Comparison</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Feature</th><th>MA Chart</th><th>EWMA Chart</th></tr>
<tr><td>Weights</td><td>Equal (\\(1/w\\)) for last \\(w\\) observations</td><td>Exponentially decreasing</td></tr>
<tr><td>Memory</td><td>Fixed window of size \\(w\\)</td><td>Infinite geometric memory</td></tr>
<tr><td>Optimal for</td><td>Detecting ramp (linear trend) shifts</td><td>Detecting step shifts of any size</td></tr>
<tr><td>Design parameter</td><td>Window size \\(w\\)</td><td>Smoothing parameter \\(\\lambda\\) and \\(L\\)</td></tr>
</table>`,

'8.1': `<h3>X-bar Chart for Mango Juice Filling Process</h3>

<h4>Data: Excess above 200 mL for 4 cans × 20 samples</h4>
<p>Given \\(A_2 = 0.73\\) for \\(n = 4\\).</p>

<p>Computing \\(\\bar{X}_i\\) and \\(R_i\\) for each sample:</p>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Sample</th><th>Can 1</th><th>Can 2</th><th>Can 3</th><th>Can 4</th><th>\\(\\bar{X}_i\\)</th><th>\\(R_i\\)</th></tr>
<tr><td>1</td><td>15</td><td>12</td><td>13</td><td>20</td><td>15.00</td><td>8</td></tr>
<tr><td>2</td><td>10</td><td>8</td><td>8</td><td>14</td><td>10.00</td><td>6</td></tr>
<tr><td>3</td><td>8</td><td>15</td><td>17</td><td>10</td><td>12.50</td><td>9</td></tr>
<tr><td>4</td><td>12</td><td>17</td><td>11</td><td>12</td><td>13.00</td><td>6</td></tr>
<tr><td>5</td><td>18</td><td>13</td><td>15</td><td>4</td><td>12.50</td><td>14</td></tr>
<tr><td>6</td><td>20</td><td>16</td><td>14</td><td>20</td><td>17.50</td><td>6</td></tr>
<tr><td>7</td><td>15</td><td>19</td><td>23</td><td>17</td><td>18.50</td><td>8</td></tr>
<tr><td>8</td><td>13</td><td>23</td><td>14</td><td>16</td><td>16.50</td><td>10</td></tr>
<tr><td>9</td><td>9</td><td>8</td><td>18</td><td>5</td><td>10.00</td><td>13</td></tr>
<tr><td>10</td><td>6</td><td>10</td><td>24</td><td>20</td><td>15.00</td><td>18</td></tr>
<tr><td>11</td><td>5</td><td>12</td><td>20</td><td>15</td><td>13.00</td><td>15</td></tr>
<tr><td>12</td><td>3</td><td>15</td><td>18</td><td>18</td><td>13.50</td><td>15</td></tr>
<tr><td>13</td><td>6</td><td>18</td><td>12</td><td>10</td><td>11.50</td><td>12</td></tr>
<tr><td>14</td><td>12</td><td>9</td><td>15</td><td>18</td><td>13.50</td><td>9</td></tr>
<tr><td>15</td><td>15</td><td>15</td><td>6</td><td>16</td><td>13.00</td><td>10</td></tr>
<tr><td>16</td><td>18</td><td>17</td><td>8</td><td>15</td><td>14.50</td><td>10</td></tr>
<tr><td>17</td><td>13</td><td>16</td><td>5</td><td>4</td><td>9.50</td><td>12</td></tr>
<tr><td>18</td><td>10</td><td>20</td><td>8</td><td>10</td><td>12.00</td><td>12</td></tr>
<tr><td>19</td><td>5</td><td>15</td><td>10</td><td>12</td><td>10.50</td><td>10</td></tr>
<tr><td>20</td><td>6</td><td>14</td><td>12</td><td>14</td><td>11.50</td><td>8</td></tr>
<tr><th colspan="5">Sum</th><th>263.00</th><th>211</th></tr>
</table>

<p><strong>Grand mean and average range:</strong></p>
<p>\\[\\bar{\\bar{X}} = \\frac{263}{20} = 13.15,\\quad \\bar{R} = \\frac{211}{20} = 10.55\\]</p>

<h4>\\(\\bar{X}\\)-Chart Control Limits</h4>
<p>\\[\\text{UCL} = \\bar{\\bar{X}} + A_2 \\bar{R} = 13.15 + 0.73 \\times 10.55 = 13.15 + 7.70 = \\mathbf{20.85}\\text{ mL}\\]</p>
<p>\\[\\text{CL} = \\bar{\\bar{X}} = \\mathbf{13.15}\\text{ mL}\\]</p>
<p>\\[\\text{LCL} = \\bar{\\bar{X}} - A_2 \\bar{R} = 13.15 - 7.70 = \\mathbf{5.45}\\text{ mL}\\]</p>

<h4>Interpretation</h4>
<p>Comparing all 20 sample means (range: 9.50 to 18.50 mL) with the control limits [5.45, 20.85]:</p>
<ul>
<li>All 20 sample means fall <strong>within the control limits</strong>.</li>
<li>No evidence of a systematic run, trend, or pattern outside the limits.</li>
</ul>
<p><strong>Conclusion</strong>: The mango juice filling process appears to be <strong>in statistical control</strong> with respect to the mean excess volume. The average excess filling is about 13.15 mL above 200 mL, suggesting the process is systematically overfilling. Management may wish to adjust the target to reduce overfilling and material waste, but from a control perspective, the variability is random.</p>`,

'8.2': `<h3>p-Chart for Variable Sample Sizes: Electronic Machine Parts</h3>

<h4>Data</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Sample</th><th>Size \\(n_i\\)</th><th>Defectives \\(d_i\\)</th><th>\\(\\hat{p}_i = d_i/n_i\\)</th></tr>
<tr><td>1</td><td>115</td><td>15</td><td>0.1304</td></tr>
<tr><td>2</td><td>220</td><td>18</td><td>0.0818</td></tr>
<tr><td>3</td><td>210</td><td>23</td><td>0.1095</td></tr>
<tr><td>4</td><td>220</td><td>22</td><td>0.1000</td></tr>
<tr><td>5</td><td>220</td><td>18</td><td>0.0818</td></tr>
<tr><td>6</td><td>255</td><td>15</td><td>0.0588</td></tr>
<tr><td>7</td><td>440</td><td>44</td><td>0.1000</td></tr>
<tr><td>8</td><td>365</td><td>47</td><td>0.1288</td></tr>
<tr><td>9</td><td>255</td><td>13</td><td>0.0510</td></tr>
<tr><td>10</td><td>300</td><td>33</td><td>0.1100</td></tr>
<tr><td>11</td><td>280</td><td>42</td><td>0.1500</td></tr>
<tr><td>12</td><td>330</td><td>46</td><td>0.1394</td></tr>
<tr><th>Total</th><th>3210</th><th>336</th><td>—</td></tr>
</table>

<h4>Estimate Overall Fraction Defective</h4>
<p>\\[\\bar{p} = \\frac{336}{3210} = 0.1047\\]</p>

<h4>Control Limits (Variable n)</h4>
<p>Since sample sizes vary, control limits are computed individually for each sample:</p>
<p>\\[\\text{UCL}_i = \\bar{p} + 3\\sqrt{\\frac{\\bar{p}(1-\\bar{p})}{n_i}},\\quad \\text{LCL}_i = \\bar{p} - 3\\sqrt{\\frac{\\bar{p}(1-\\bar{p})}{n_i}}\\quad (\\geq 0)\\]</p>
<p>\\(\\sqrt{\\bar{p}(1-\\bar{p})} = \\sqrt{0.1047 \\times 0.8953} = \\sqrt{0.09374} = 0.3062\\)</p>

<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Sample</th><th>\\(n_i\\)</th><th>\\(3\\sigma_i = 3 \\times 0.3062/\\sqrt{n_i}\\)</th><th>UCL</th><th>LCL</th><th>\\(\\hat{p}_i\\)</th><th>In Control?</th></tr>
<tr><td>1</td><td>115</td><td>0.0857</td><td>0.1904</td><td>0.0190</td><td>0.1304</td><td>Yes ✓</td></tr>
<tr><td>2</td><td>220</td><td>0.0619</td><td>0.1666</td><td>0.0428</td><td>0.0818</td><td>Yes ✓</td></tr>
<tr><td>3</td><td>210</td><td>0.0634</td><td>0.1681</td><td>0.0413</td><td>0.1095</td><td>Yes ✓</td></tr>
<tr><td>4</td><td>220</td><td>0.0619</td><td>0.1666</td><td>0.0428</td><td>0.1000</td><td>Yes ✓</td></tr>
<tr><td>5</td><td>220</td><td>0.0619</td><td>0.1666</td><td>0.0428</td><td>0.0818</td><td>Yes ✓</td></tr>
<tr><td>6</td><td>255</td><td>0.0575</td><td>0.1622</td><td>0.0472</td><td>0.0588</td><td>Yes ✓</td></tr>
<tr><td>7</td><td>440</td><td>0.0438</td><td>0.1485</td><td>0.0609</td><td>0.1000</td><td>Yes ✓</td></tr>
<tr><td>8</td><td>365</td><td>0.0480</td><td>0.1527</td><td>0.0567</td><td>0.1288</td><td>Yes ✓</td></tr>
<tr><td>9</td><td>255</td><td>0.0575</td><td>0.1622</td><td>0.0472</td><td>0.0510</td><td>Yes ✓</td></tr>
<tr><td>10</td><td>300</td><td>0.0530</td><td>0.1577</td><td>0.0517</td><td>0.1100</td><td>Yes ✓</td></tr>
<tr><td>11</td><td>280</td><td>0.0549</td><td>0.1596</td><td>0.0498</td><td>0.1500</td><td>Yes ✓</td></tr>
<tr><td>12</td><td>330</td><td>0.0506</td><td>0.1553</td><td>0.0541</td><td>0.1394</td><td>Yes ✓</td></tr>
</table>

<h4>Conclusion</h4>
<p>All 12 sample fractions defective fall within their respective (variable-width) 3-sigma control limits. <strong>The process is in statistical control.</strong> No assignable causes are signalled. The average fraction defective is approximately 10.5%, which management may wish to reduce through process improvement, but the variation is consistent with chance causes.</p>`,

'8.3': `<h3>Control Charts: Basic Principles, Out-of-Control Criteria, and Acceptance Sampling</h3>

<h4>Part (i): What is a Control Chart? Basic Principles</h4>
<p>A <strong>control chart</strong> is a time-ordered graph of a process quality statistic (e.g., sample mean \\(\\bar{X}\\), range \\(R\\), fraction defective \\(p\\)) with statistically derived control limits. It is used to distinguish between:</p>
<ul>
<li><strong>Common (chance) causes</strong>: Random, inherent variation present in every process. Cannot be economically reduced without redesigning the process.</li>
<li><strong>Assignable (special) causes</strong>: Non-random variation from identifiable sources (machine wear, material change, operator error). Can and should be eliminated.</li>
</ul>

<p><strong>Basic principles (Shewhart):</strong></p>
<ol>
<li><strong>Statistical control</strong>: If only common causes operate, the process output follows a stable probability distribution and points fall randomly within the control limits.</li>
<li><strong>3-sigma limits</strong>: Set at \\(\\pm 3\\sigma_{\\text{statistic}}\\) from the process mean, giving a 0.27% false-alarm rate.</li>
<li><strong>Rational subgrouping</strong>: Subgroups should be formed so that within-subgroup variation reflects only common causes, while between-subgroup variation may reveal assignable causes.</li>
<li><strong>Action on signals</strong>: When a signal is detected, the process should be investigated for assignable causes; corrective action should be taken before resuming production.</li>
</ol>

<h4>Part (ii): Criteria for Detecting Lack of Control</h4>
<p>For \\(\\bar{X}\\) and \\(R\\) charts (Western Electric / Nelson rules):</p>
<ul>
<li><strong>Rule 1</strong>: One point beyond 3\\(\\sigma\\) limits (above UCL or below LCL).</li>
<li><strong>Rule 2</strong>: Eight consecutive points on same side of centre line (run rule — suggests process mean shift).</li>
<li><strong>Rule 3</strong>: Six consecutive points trending continuously up or down.</li>
<li><strong>Rule 4</strong>: Two of three consecutive points in Zone A (between 2\\(\\sigma\\) and 3\\(\\sigma\\) limits).</li>
<li><strong>Rule 5</strong>: Fifteen consecutive points within Zone C (within \\(\\pm 1\\sigma\\)) — suggests stratification.</li>
<li><strong>For R chart specifically</strong>: A point above UCL suggests increased variability; a point below LCL (when LCL > 0) suggests reduced variability (possibly measurement error or a genuine improvement).</li>
</ul>

<h4>Part (iii): Advantages and Limitations of Acceptance Sampling</h4>
<p><strong>Advantages:</strong></p>
<ul>
<li>Much lower cost than 100% inspection (only a sample of \\(n \\ll N\\) inspected).</li>
<li>Only option when inspection is destructive.</li>
<li>Provides a contractual quality standard for supplier–customer relationships.</li>
<li>Reduces inspector fatigue compared to 100% inspection.</li>
</ul>
<p><strong>Limitations:</strong></p>
<ul>
<li>Sampling risk: good lots may be rejected (producer's risk \\(\\alpha\\)); bad lots may be accepted (consumer's risk \\(\\beta\\)).</li>
<li>Does not identify or eliminate causes of defects — only screens lots after they are produced.</li>
<li>Less effective than SPC for improving processes at the source.</li>
<li>Cannot guarantee zero defects in accepted lots.</li>
</ul>`,

'8.4': `<h3>Attribute Control Charts and Acceptance Sampling Curves</h3>

<h4>Part (i): Three Important Control Charts for Attributes</h4>

<h5>1. p-Chart (Fraction Defective Chart)</h5>
<p>Monitors the <strong>fraction of defective</strong> items in samples. Used when quality is classified as defective/non-defective.</p>
<p>\\[\\bar{p} = \\frac{\\text{Total defectives}}{\\text{Total inspected}}\\]</p>
<p>Control limits (constant \\(n\\)): \\(\\bar{p} \\pm 3\\sqrt{\\bar{p}(1-\\bar{p})/n}\\)</p>
<p>For variable \\(n_i\\): individual control limits \\(\\bar{p} \\pm 3\\sqrt{\\bar{p}(1-\\bar{p})/n_i}\\) for each sample.</p>

<h5>2. c-Chart (Count of Defects per Unit)</h5>
<p>Monitors the <strong>number of nonconformities (defects)</strong> per inspection unit, when the area of opportunity is constant. Based on the Poisson distribution with mean \\(\\bar{c}\\).</p>
<p>\\[\\bar{c} = \\frac{\\text{Total defects}}{\\text{Number of units inspected}}\\]</p>
<p>Control limits: \\(\\bar{c} \\pm 3\\sqrt{\\bar{c}}\\); UCL \\(= \\bar{c} + 3\\sqrt{\\bar{c}}\\), LCL \\(= \\max(0, \\bar{c} - 3\\sqrt{\\bar{c}})\\).</p>
<p>Example: Number of surface flaws per bolt of cloth; number of solder defects per circuit board.</p>

<h5>3. u-Chart (Defects per Unit — Variable Sample Size)</h5>
<p>An extension of the c-chart for <strong>variable inspection unit sizes</strong>. Plots \\(\\hat{u}_i = c_i/n_i\\) (defects per unit in sample \\(i\\)).</p>
<p>\\[\\bar{u} = \\frac{\\sum c_i}{\\sum n_i}\\]</p>
<p>Control limits for sample \\(i\\): \\(\\bar{u} \\pm 3\\sqrt{\\bar{u}/n_i}\\)</p>
<p>Example: Number of minor defects per unit when inspecting \\(n_i\\) units per period (varying batch sizes).</p>

<h4>Part (ii): Key Acceptance Sampling Curves</h4>

<h5>(a) ASN Curve</h5>
<p>The <strong>Average Sample Number (ASN) curve</strong> plots the expected sample size per lot against the incoming fraction defective \\(p\\). For SSP: ASN \\(= n\\) (constant, flat line). For DSP: ASN rises from \\(n_1\\) (at \\(p=0\\) or \\(p=1\\)) to a maximum at intermediate \\(p\\) and then falls. Sequential plans have the lowest ASN at extreme quality levels. The ASN curve quantifies inspection efficiency.</p>

<h5>(b) AOQ Curve</h5>
<p>The <strong>Average Outgoing Quality (AOQ) curve</strong> (for rectifying inspection) plots the average outgoing quality \\(\\text{AOQ}(p) \\approx p \\cdot P_a(p)\\) against incoming \\(p\\). The curve:</p>
<ul>
<li>Starts at AOQ = 0 for \\(p = 0\\) (no defectives sent).</li>
<li>Rises to the AOQL (maximum).</li>
<li>Falls back to 0 for \\(p = 1\\) (all lots rejected and screened).</li>
</ul>

<h5>(c) ATI Curve</h5>
<p>The <strong>Average Total Inspection (ATI) curve</strong> plots \\(\\text{ATI}(p) = n + (1-P_a(p))(N-n)\\) against \\(p\\). At \\(p = 0\\): ATI \\(= n\\) (minimum). At \\(p = 1\\): ATI \\(= N\\) (maximum — entire lot inspected). The ATI curve quantifies the total inspection burden.</p>

<h5>(d) OC Curve</h5>
<p>The <strong>Operating Characteristic (OC) curve</strong> plots \\(P_a(p)\\) (probability of lot acceptance) against the lot fraction defective \\(p\\). Key points: \\((\\text{AQL}, 1-\\alpha)\\) and \\((\\text{LTPD}, \\beta)\\). A steep OC curve indicates good discrimination between acceptable and unacceptable lots. The ideal OC curve is a step function at \\(p = \\text{AQL}\\).</p>`

};

fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
console.log('Done: 2019 written.');
console.log('JSON size (MB):', (fs.statSync(FILE).size / 1e6).toFixed(2));

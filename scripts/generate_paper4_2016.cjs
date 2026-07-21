'use strict';
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../src/data/explanations.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

if (!data.paper4) data.paper4 = {};
if (!data.paper4.demography) data.paper4.demography = {};
if (!data.paper4.sqc) data.paper4.sqc = {};

// ─── 2016 DEMOGRAPHY ──────────────────────────────────────────────────────────

data.paper4.demography['2016'] = {

'3.1': `<h3>Sources of Demographic Data in India: Uses and Limitations</h3>

<h4>1. Population Census</h4>
<p>India conducts a decennial census (Registrar General of India — RGI). The census collects population size, age, sex, marital status, literacy, household amenities, migration, and economic activity data.</p>
<p><strong>Uses</strong>: Planning for education, health, housing, and infrastructure; delimitation of constituencies; estimation of vital rates; input for population projections.</p>
<p><strong>Limitations</strong>: Conducted only once a decade — intercensal data must be estimated. Coverage errors and content errors (age misreporting, digit preference) persist. Cost and logistics of universal enumeration are enormous.</p>

<h4>2. Civil Registration System (CRS)</h4>
<p>Under the Registration of Births and Deaths (RBD) Act, 1969, all births, deaths, and marriages are to be registered. The Sample Registration System (SRS) supplements the CRS through continuous dual-record matching.</p>
<p><strong>Uses</strong>: Provides annual birth, death, and cause-of-death rates (CDR, CBR, IMR, TFR, ASFR); the primary data source for vital statistics in India.</p>
<p><strong>Limitations</strong>: Registration is still incomplete in many rural and remote areas. Cause-of-death data quality is poor (medical certification not universal). SRS covers only a sample (1.3 million rural + urban households), not the full population.</p>

<h4>3. Sample Registration System (SRS)</h4>
<p>A large-scale continuous demographic survey maintained by the RGI. Dual-record system: baseline survey (enumerator) + independent retrospective survey (supervisor) with matching to assess completeness.</p>
<p><strong>Uses</strong>: Annual estimates of CBR, CDR, IMR, TFR, ASFR, and cause-specific mortality by state and rural/urban disaggregation. Gold standard for vital rates in India.</p>
<p><strong>Limitations</strong>: Sampling errors exist. Matching procedure may miss events if both enumerator and supervisor miss the same birth or death. Not available at district level.</p>

<h4>4. National Family Health Survey (NFHS / DHS)</h4>
<p>Large-scale household survey conducted approximately every 5 years (NFHS-1: 1992–93; NFHS-5: 2019–21). Covers reproductive and child health, nutrition, family planning, HIV/AIDS awareness.</p>
<p><strong>Uses</strong>: Estimates of TFR, CPR, IMR, U5MR, MMR, nutritional indices; disaggregated data by state, district, and social groups.</p>
<p><strong>Limitations</strong>: Retrospective data subject to recall error. Conducted infrequently. May undercount infant and child deaths. Representativeness at sub-district level is limited.</p>

<h4>5. National Sample Survey (NSS) / PLFS</h4>
<p>Collects socio-economic data including employment, consumption, and health expenditure. The Periodic Labour Force Survey (PLFS) provides annual employment and workforce statistics.</p>
<p><strong>Uses</strong>: Socio-economic correlates of demographic behaviour; workforce and migration data.</p>
<p><strong>Limitations</strong>: Not designed primarily for vital statistics; focuses on labour/consumption; subject to sampling error.</p>`,

'3.2': `<h3>Stationary and Stable Population Models</h3>

<h4>Stable Population</h4>
<p>A <strong>stable population</strong> (Lotka, 1907) is a closed population that has been subject to <em>constant age-specific fertility and mortality rates</em> for a long enough time that its age distribution has stabilised. Key properties:</p>
<ul>
<li>The age distribution \\(c(x)\\) is fixed over time (does not change year to year).</li>
<li>The population grows (or declines) at a constant <strong>intrinsic rate of natural increase</strong> \\(r\\).</li>
<li>The stable age distribution: \\(c(x) = b e^{-rx} l(x)\\), where \\(b\\) = intrinsic birth rate, \\(l(x)\\) = life table survival ratio.</li>
<li>Total population grows as \\(P(t) = P(0) e^{rt}\\).</li>
<li>Net Reproduction Rate (NRR) \\(R_0 = e^{rT}\\) where \\(T\\) is mean length of a generation.</li>
</ul>

<h4>Stationary Population</h4>
<p>A <strong>stationary population</strong> is a special case of a stable population in which the intrinsic growth rate \\(r = 0\\) (equivalently, NRR = 1). Properties:</p>
<ul>
<li>Total population is constant over time: \\(P(t) = P\\) for all \\(t\\).</li>
<li>Number of births equals number of deaths: \\(B = D\\).</li>
<li>The age distribution is proportional to \\(L_x\\) (the life table person-years lived column): \\(c(x) \\propto l(x)\\).</li>
<li>The crude birth rate equals the crude death rate: \\(b = d = 1/\\bar{e}_0^0\\) (reciprocal of life expectancy at birth).</li>
</ul>

<h4>When Stationary and Stable Populations Coincide</h4>
<p>A stable population reduces to a stationary population exactly when \\(r = 0\\), which requires:</p>
<ul>
<li>NRR = 1 (each woman replaces herself exactly, accounting for female mortality).</li>
<li>TFR ≈ 2.1 (approximate replacement-level fertility at current mortality levels).</li>
</ul>
<p>In this special case: \\(c(x) = e^{-rx} l(x) / \\int_0^\\omega l(a) da \\big|_{r=0} = l(x) / e_0^0\\) — the age distribution is entirely determined by the life table.</p>
<p>A stationary population can be read directly from the life table: the \\(L_x\\) column (after scaling to total \\(T_0 = \\int_0^\\omega l(x) dx\\)) gives the number of persons in each age interval.</p>`,

'3.3': `<h3>Uses of Life Tables and Proof that \\(d_x = -l_x \\frac{d}{dx}\\ln(l_x)\\)</h3>

<h4>Uses of Life Table</h4>
<ol>
<li><strong>Actuarial/Insurance science</strong>: Computing life insurance premiums, annuity values, and pension liabilities (force of mortality, survival probabilities).</li>
<li><strong>Demographic analysis</strong>: Calculating life expectancy at birth and at any age; constructing stable and stationary populations; computing replacement rates (NRR).</li>
<li><strong>Public health</strong>: Measuring mortality improvements over time; identifying high-mortality age groups; planning health interventions.</li>
<li><strong>Population projections</strong>: Providing survival ratios for cohort-component projection models.</li>
<li><strong>Epidemiology</strong>: Cause-deleted life tables to assess impact of eliminating specific causes of death.</li>
<li><strong>Biological studies</strong>: Ecology — mortality and survival of animal populations, cohort studies of organisms.</li>
</ol>

<h4>Proof: \\(d_x = -l_x \\frac{d}{dx}\\ln(l_x)\\)</h4>
<p>In a continuous life table, \\(l_x\\) is a differentiable, strictly decreasing function of age \\(x\\). The number of deaths in the infinitesimal age interval \\([x, x+dx)\\) is:</p>
<p>\\[d_x = -\\frac{dl_x}{dx}\\]</p>
<p>(negative because \\(l_x\\) decreases with age.)</p>
<p>Now differentiate \\(\\ln(l_x)\\) with respect to \\(x\\):</p>
<p>\\[\\frac{d}{dx}\\ln(l_x) = \\frac{1}{l_x}\\frac{dl_x}{dx}\\]</p>
<p>Therefore:</p>
<p>\\[-l_x \\frac{d}{dx}\\ln(l_x) = -l_x \\cdot \\frac{1}{l_x}\\frac{dl_x}{dx} = -\\frac{dl_x}{dx} = d_x\\]</p>
<p>\\[\\boxed{d_x = -l_x\\frac{d}{dx}\\ln(l_x)}\\quad \\square\\]</p>
<p><strong>Remark</strong>: The quantity \\(-\\frac{d}{dx}\\ln(l_x) = \\frac{-dl_x/dx}{l_x} = \\mu_x\\) is called the <strong>force of mortality</strong> (instantaneous hazard rate). Thus \\(d_x = l_x \\mu_x\\), which confirms that the rate of death at age \\(x\\) is the survivor function multiplied by the hazard rate.</p>`,

'3.4': `<h3>Crude Death Rate, Specific Death Rate, and Standardized Death Rate</h3>

<h4>1. Crude Death Rate (CDR)</h4>
<p>\\[\\text{CDR} = \\frac{D}{P} \\times 1000\\]</p>
<p>where \\(D\\) = total deaths in a year, \\(P\\) = mid-year total population.</p>
<p><strong>Interpretation</strong>: CDR represents the number of deaths per 1000 persons in the entire population during a year. It is a summary measure of the overall death experience but is heavily confounded by the age structure. An older population will have a higher CDR than a younger population even if every age group's mortality is identical.</p>

<h4>2. Age-Specific Death Rate (ASDR) — "Specific Death Rate"</h4>
<p>\\[_nM_x = \\frac{D_x}{P_x} \\times 1000\\]</p>
<p>where \\(D_x\\) = deaths in age group \\([x, x+n)\\), \\(P_x\\) = mid-year population of that age group.</p>
<p><strong>Interpretation</strong>: The ASDR for a given age group represents the risk of dying for persons currently in that age group during the year. It is free from age-structure bias within that group. Other specific rates include cause-specific (CSDR), sex-specific, and occupation-specific death rates. Specific rates allow identification of which age/cause groups contribute most to overall mortality.</p>

<h4>3. Standardized Death Rate (SDR)</h4>
<p>The SDR adjusts for differing age structures to allow valid comparisons across populations.</p>
<p><strong>Direct Method</strong>: Apply the ASDRs of each study population to a common standard age distribution \\(P_x^s\\):</p>
<p>\\[\\text{SDR}_{\\text{direct}} = \\frac{\\sum_x {_nM_x} \\cdot P_x^s}{\\sum_x P_x^s}\\]</p>
<p><strong>Indirect Method (SMR)</strong>: Apply standard ASDRs \\({_nM_x^s}\\) to the study population's age structure to get expected deaths \\(E\\), then compare with observed deaths \\(O\\):</p>
<p>\\[\\text{SMR} = O/E\\]</p>
<p><strong>Interpretation</strong>: The SDR (direct) represents the death rate the study population would have if it had the same age distribution as the standard population. An SDR higher than the reference indicates genuinely higher mortality, not just an older age structure. SMR > 1 indicates higher-than-expected mortality compared to the standard. Standardization thus eliminates confounding by age and enables fair comparisons across time, regions, and occupations.`,

'3.5': `<h3>General Procedure for Construction of Life Tables</h3>

<h4>Overview</h4>
<p>A <strong>complete (decrement) life table</strong> describes the mortality experience of a hypothetical cohort of \\(l_0 = 100{,}000\\) newborns as they age from 0 to the limiting age \\(\\omega\\). The standard columns are: \\(x, l_x, d_x, q_x, p_x, L_x, T_x, e_x^0\\) (and the force of mortality \\(\\mu_x\\) in continuous tables).</p>

<h4>Step-by-Step Procedure</h4>

<h5>Step 1: Collect Age-Specific Death Rates</h5>
<p>From census and vital registration data, compute observed ASDRs:</p>
<p>\\[_nM_x = D_x / P_x\\] for each age group \\([x, x+n)\\).</p>

<h5>Step 2: Smooth the ASDRs</h5>
<p>Raw rates are subject to random fluctuation, especially at older ages. Apply smoothing (e.g., Carrier-Farrag method, Greville's method, Karup-King-Newton interpolation) to obtain smooth, monotonically varying rates.</p>

<h5>Step 3: Convert \\(_nM_x\\) to \\(_nq_x\\)</h5>
<p>Under UDD: \\[_nq_x = \\frac{n \\ _nM_x}{1 + (n - a_x)\ _nM_x}\\] where \\(_na_x\\) = average person-years lived in \\([x, x+n)\\) by those who die; typically \\(a_x = n/2\\) for adults (\\(= 0.3\\) for age 0, \\(= 1.5\\) for age 1–4).</p>

<h5>Step 4: Compute \\(l_x\\) (Survivors Column)</h5>
<p>Start with \\(l_0 = 100{,}000\\) (radix). Then:</p>
<p>\\[l_{x+n} = l_x(1 - _nq_x) = l_x \cdot _np_x\\]</p>

<h5>Step 5: Compute \\(d_x\\) (Deaths)</h5>
<p>\\[_nd_x = l_x - l_{x+n}\\]</p>

<h5>Step 6: Compute \\(L_x\\) (Person-Years Lived)</h5>
<p>\\[_nL_x = n \\cdot l_{x+n} + _na_x \\cdot _nd_x\\]</p>
<p>For the terminal open interval \\([\\omega, \\infty)\\): \\(L_\\omega = T_\\omega = l_\\omega / M_\\omega\\).</p>

<h5>Step 7: Compute \\(T_x\\) (Total Person-Years)</h5>
<p>\\[T_x = \\sum_{a=x}^{\\omega} _nL_a\\] (cumulate \\(L_x\\) from the top).</p>

<h5>Step 8: Compute \\(e_x^0\\) (Life Expectancy)</h5>
<p>\\[e_x^0 = T_x / l_x\\]</p>

<h5>Step 9: Validate</h5>
<p>Cross-check that \\(e_0^0\\) agrees with independent estimates; verify monotonicity of \\(l_x\\); confirm \\(\\sum _nd_x = l_0\\); check that \\(_nq_x < 1\\) for all \\(x\\).</p>`,

'4.1': `<h3>Abridged Life Table: Columns, Explanation, and King's Method</h3>

<h4>What is an Abridged Life Table?</h4>
<p>An <strong>abridged life table</strong> is a condensed life table computed for age groups (typically 5-year intervals: 0, 1–4, 5–9, ..., 80–84, 85+) rather than single years of age. It is used when age-specific death rates are available only for grouped ages, which is common in countries with incomplete vital registration or census data. The abridged table retains all the key columns of the complete table but at 5-year intervals.</p>

<h4>Columns of an Abridged Life Table</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Column</th><th>Symbol</th><th>Description</th></tr>
<tr><td>Age group</td><td>\\([x, x+n)\\)</td><td>The age interval (e.g., 5–9 years)</td></tr>
<tr><td>Probability of dying</td><td>\\(_nq_x\\)</td><td>Probability that a person alive at exact age \\(x\\) dies before age \\(x+n\\)</td></tr>
<tr><td>Survivors</td><td>\\(l_x\\)</td><td>Number alive at exact age \\(x\\) out of radix \\(l_0 = 100{,}000\\)</td></tr>
<tr><td>Deaths</td><td>\\(_nd_x\\)</td><td>Deaths in interval: \\(l_x - l_{x+n}\\)</td></tr>
<tr><td>Person-years lived</td><td>\\(_nL_x\\)</td><td>Total person-years lived in \\([x, x+n)\\) by the cohort</td></tr>
<tr><td>Total person-years</td><td>\\(T_x\\)</td><td>\\(T_x = \\sum_{a \\geq x} {_nL_a}\\)</td></tr>
<tr><td>Life expectancy</td><td>\\(e_x^0\\)</td><td>\\(T_x / l_x\\): average remaining years at age \\(x\\)</td></tr>
</table>

<h4>King's Method for Constructing Abridged Life Tables</h4>
<p>George King's method uses the observed death rates \\(_nM_x\\) to compute \\(_nL_x\\) directly using an interpolation formula, and then derives \\(_nq_x\\) from \\(_nL_x\\). The key relationship used is:</p>
<p>\\[_nq_x = \\frac{n \\cdot _nM_x}{1 + (n - _na_x) _nM_x}\\]</p>
<p>King used the following values of \\(_na_x\\) (average years lived by those dying in the interval):</p>
<ul>
<li>Age 0: \\(a_0 = 0.3\\)</li>
<li>Age 1–4: \\(a_1 = 1.5\\)</li>
<li>Age 5 and above: \\(a_x = n/2 = 2.5\\)</li>
</ul>
<p>Steps:</p>
<ol>
<li>Compute \\(_nM_x\\) from registration/census data.</li>
<li>Compute \\(_nq_x\\) using the formula above with King's \\(_na_x\\) values.</li>
<li>Compute \\(l_x\\): \\(l_0 = 100{,}000\\); \\(l_{x+n} = l_x(1 - _nq_x)\\).</li>
<li>Compute \\(_nd_x = l_x - l_{x+n}\\).</li>
<li>Compute \\(_nL_x = n \\cdot l_{x+n} + _na_x \\cdot _nd_x\\).</li>
<li>Compute \\(T_x\\) and \\(e_x^0 = T_x/l_x\\).</li>
</ol>`,

'4.2': `<h3>Fertility: Rates and Computation in Practice</h3>

<h4>Fertility</h4>
<p><strong>Fertility</strong> refers to the actual occurrence of live births to women. It is distinct from <em>fecundity</em> (the physiological ability to conceive and bear children). In demography, fertility is measured using ratios of observed births to relevant population denominators.</p>

<h4>Crude Birth Rate (CBR)</h4>
<p>\\[\\text{CBR} = \\frac{B}{P} \\times 1000\\]</p>
<p>Births per 1000 total mid-year population.</p>
<p><strong>Computation</strong>: From civil registration (total annual births) and census/SRS mid-year population estimates.</p>
<p><strong>Limitation</strong>: Affected by age-sex structure — a population with more women of reproductive age will have a higher CBR ceteris paribus.</p>

<h4>General Fertility Rate (GFR)</h4>
<p>\\[\\text{GFR} = \\frac{B}{W_{15-49}} \\times 1000\\]</p>
<p>Births per 1000 women aged 15–49 (the reproductive age span).</p>
<p><strong>Computation</strong>: Requires age breakdown of female population from census or SRS, and total births from registration.</p>

<h4>Specific Fertility Rate (SFR)</h4>
<p>Fertility computed for a specific sub-group: by marital status (marital fertility rate), birth order (parity-specific rate), or occupation. Example: <em>Marital Fertility Rate</em> = births per 1000 married women aged 15–49.</p>

<h4>Age-Specific Fertility Rate (ASFR)</h4>
<p>\\[f_x = \\frac{B_x}{W_x} \\times 1000\\]</p>
<p>Births to women aged \\([x, x+5)\\) per 1000 women of that age group.</p>
<p><strong>Computation</strong>: Requires age-specific birth counts (from NFHS birth histories or SRS) and age-specific female population counts (from census).</p>
<p>The seven ASFRs (15–19, 20–24, 25–29, 30–34, 35–39, 40–44, 45–49) completely characterise the age pattern of fertility. Their weighted sum gives the TFR:</p>
<p>\\[\\text{TFR} = 5 \\sum_{x=15}^{45} f_x\\]</p>
<p><strong>India 2019–21 (NFHS-5)</strong>: TFR = 2.0 (at replacement level); CBR = 19.5; GFR ≈ 66.4; IMR = 35.2 per 1000 live births.`

};

// ─── 2016 SQC ─────────────────────────────────────────────────────────────────

data.paper4.sqc['2016'] = {

'7.1': `<h3>Process Control vs. Product Control</h3>

<h4>Product Control</h4>
<p><strong>Product control</strong> (also called <em>acceptance inspection</em> or <em>acceptance sampling</em>) refers to quality control decisions made on <em>already-produced lots</em> of items. It determines whether to accept or reject a batch after production is complete.</p>
<ul>
<li>Focus: Finished goods; incoming raw materials; outgoing shipments.</li>
<li>Method: Acceptance sampling plans — single (SSP), double (DSP), sequential (SPRT), attribute (n, c) or variable sampling.</li>
<li>Decision: Accept the lot (lot enters production/shipment) or reject it (return to supplier, 100% screening, or scrapping).</li>
<li>When used: When 100% inspection is impractical, when inspection is destructive (tensile testing, life testing), when incoming material from external supplier needs screening.</li>
</ul>

<h4>Process Control</h4>
<p><strong>Process control</strong> refers to the real-time monitoring of a manufacturing process to ensure it remains in statistical control. It acts during production, not after.</p>
<ul>
<li>Focus: Production process; process parameters (mean, variability, defect rate).</li>
<li>Method: Control charts — Shewhart charts (\\(\\bar{X}\\), R, S, p, np, c, u), CUSUM, EWMA, multivariate (\\(T^2\\)).</li>
<li>Decision: Process in control → continue; Out-of-control signal → investigate and eliminate assignable cause.</li>
<li>When used: Continuous production processes (chemical, pharmaceutical, automotive); any process where in-process feedback can be acted upon promptly; when the cost of producing defectives exceeds inspection cost.</li>
</ul>

<h4>Comparison</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Feature</th><th>Product Control</th><th>Process Control</th></tr>
<tr><td>Timing</td><td>After production (post-hoc)</td><td>During production (real-time)</td></tr>
<tr><td>Tool</td><td>Acceptance sampling plans</td><td>Control charts</td></tr>
<tr><td>Objective</td><td>Screen lots; protect consumer</td><td>Maintain process stability; prevent defects</td></tr>
<tr><td>Scope</td><td>Finished product or incoming material</td><td>Process parameters</td></tr>
<tr><td>Philosophy</td><td>Detection (reactive)</td><td>Prevention (proactive)</td></tr>
</table>`,

'7.2': `<h3>Sources and Detection of Assignable Causes and Random Causes</h3>

<h4>Sources of Random (Chance) Causes</h4>
<p>Random causes are inherent in the process and arise from multiple small, unavoidable sources:</p>
<ol>
<li><strong>Raw materials</strong>: Natural micro-variation in composition, grain size, or hardness within a certified batch (e.g., small fluctuations in alloy composition within spec).</li>
<li><strong>Machine</strong>: Inherent machine vibration, hydraulic pressure fluctuations, bearing runout, thermal expansion cycles.</li>
<li><strong>Operator</strong>: Slight, unavoidable variation in hand pressure, timing, and positioning by a skilled, trained operator performing a repetitive task.</li>
<li><strong>Environment</strong>: Small temperature, humidity, and voltage fluctuations within normal facility ranges.</li>
<li><strong>Measurement system</strong>: Gauge repeatability error (instrument noise).</li>
</ol>
<p><strong>Detection</strong>: Cannot be individually identified or traced. Their collective effect is reflected in the within-subgroup variation (estimated by \\(\\bar{R}\\) or \\(\\bar{S}\\)). Reducing random cause variation requires fundamental process redesign — a management decision.</p>

<h4>Sources of Assignable (Special) Causes</h4>
<ol>
<li><strong>Raw materials</strong>: A new (defective or different) batch of raw material; change of supplier; wrong material loaded.</li>
<li><strong>Machine</strong>: Tool wear, tool chipping, or breakage; incorrect machine setting after maintenance; worn jigs and fixtures; loss of coolant.</li>
<li><strong>Operator</strong>: New or untrained operator; fatigue over a long shift; misreading instructions; incorrect setup after a break.</li>
<li><strong>Method/Process</strong>: A changed SOP, incorrect cutting speed, wrong temperature or pressure setting.</li>
<li><strong>Measurement system</strong>: Wrong gauge, miscalibrated instrument, gauge damage.</li>
<li><strong>Environment</strong>: Sudden change in ambient temperature (seasons, air conditioning failure), power surge.</li>
</ol>

<h4>Detection of Causes in Manufacturing</h4>
<p><strong>Control charts detect assignable causes through out-of-control signals</strong>:</p>
<ul>
<li>Points beyond 3-sigma control limits (the primary rule).</li>
<li>Run rules (Western Electric / Nelson rules): 8 consecutive points on one side of CL; 6 points trending; 2 of 3 in zone A (2–3σ); 4 of 5 in zone B (1–2σ).</li>
<li>Patterns: cyclical patterns (shift effects), trends (tool wear), sudden jumps (setup change).</li>
</ul>
<p>Once a signal occurs, root-cause analysis tools are applied: fishbone (Ishikawa) diagram, 5-Why analysis, Pareto chart.</p>`,

'7.3': `<h3>Key Terms in Acceptance Sampling: ASN, AOQ, ATI, ARL</h3>

<h4>Average Sample Number (ASN)</h4>
<p>The <strong>ASN</strong> is the expected (average) number of items inspected per lot under a given sampling plan, as a function of the incoming defect fraction \\(p\\).</p>
<ul>
<li>For a <strong>Single Sampling Plan (SSP)</strong> \\((n, c)\\): \\(\\text{ASN} = n\\) (constant — always inspect exactly \\(n\\) items).</li>
<li>For a <strong>Double Sampling Plan (DSP)</strong> \\((n_1, c_1, r_1; n_2, c_2)\\): \\(\\text{ASN}(p) = n_1 + n_2 [1 - P(\\text{decision at stage 1})]\\), where the decision probability at stage 1 = \\(P(d_1 \\leq c_1) + P(d_1 \\geq r_1)\\).</li>
<li>For <strong>Sequential Sampling</strong>: ASN is minimised at the critical quality levels (optimal ASN property of SPRT).</li>
</ul>

<h4>Average Outgoing Quality (AOQ)</h4>
<p>The <strong>AOQ</strong> is the expected quality (fraction defective) of lots after acceptance sampling, assuming:</p>
<ol>
<li>Accepted lots pass with their original \\(p\\) (or after removing \\(n\\) inspected items).</li>
<li>Rejected lots are 100% screened and all defectives replaced by non-defectives.</li>
</ol>
<p>\\[\\text{AOQ}(p) \\approx \\frac{p \\cdot P_a(p) \\cdot (N-n)}{N} \\approx p \\cdot P_a(p)\\quad (\\text{for large } N)\\]</p>
<p>The <strong>Average Outgoing Quality Limit (AOQL)</strong> = max \\(\\{\\text{AOQ}(p)\\}\\) over all \\(p\\) — the worst average outgoing quality the plan can produce.</p>

<h4>Average Total Inspection (ATI)</h4>
<p>The <strong>ATI</strong> is the expected total number of items inspected per lot (including 100% screening of rejected lots):</p>
<p>\\[\\text{ATI}(p) = n + (N-n)[1 - P_a(p)]\\]</p>
<p>When all lots are accepted (\\(P_a \\to 1\\) for \\(p \\to 0\\)): \\(\\text{ATI} \\to n\\). When all lots are rejected (\\(P_a \\to 0\\) for high \\(p\\)): \\(\\text{ATI} \\to N\\). ATI measures the expected inspection burden.</p>

<h4>Average Run Length (ARL)</h4>
<p>The <strong>ARL</strong> is the average number of samples plotted on a control chart before an out-of-control signal is generated:</p>
<p>\\[\\text{ARL} = \\frac{1}{P(\\text{signal})}\\]</p>
<p>Two key ARL values:</p>
<ul>
<li>\\(\\text{ARL}_0 = 1/(1-\\alpha)\\): in-control ARL (false alarm rate \\(\\alpha = 0.0027\\) for 3-sigma limits → \\(\\text{ARL}_0 = 370.4\\)).</li>
<li>\\(\\text{ARL}_1 = 1/(1-\\beta)\\): out-of-control ARL for a given shift size (should be as small as possible — fast detection).</li>
</ul>`,

'7.4': `<h3>Acceptance Sampling Plan (SSP) and Computation of \\(P_a\\)</h3>

<h4>What is an Acceptance Sampling Plan?</h4>
<p>An <strong>acceptance sampling plan</strong> is a statistical procedure for deciding whether to accept or reject a lot (batch) of items based on the quality of a sample drawn from the lot. It balances two risks:</p>
<ul>
<li><strong>Producer's Risk (\\(\\alpha\\))</strong>: Rejecting a good lot (lot quality \\(= \\text{AQL}\\)); \\(\\alpha\\) typically \\(\\leq 0.05\\).</li>
<li><strong>Consumer's Risk (\\(\\beta\\))</strong>: Accepting a bad lot (lot quality \\(= \\text{LTPD}\\)); \\(\\beta\\) typically \\(\\leq 0.10\\).</li>
</ul>

<h4>Single Sampling Plan (SSP): \\((n, c)\\)</h4>
<p>Procedure:</p>
<ol>
<li>Draw a random sample of \\(n\\) items from the lot of \\(N\\) items.</li>
<li>Inspect each sampled item: record the number of defectives \\(d\\).</li>
<li>Accept the lot if \\(d \\leq c\\); reject if \\(d > c\\).</li>
</ol>

<h4>Binomial Model</h4>
<p>When \\(N\\) is large relative to \\(n\\) (sampling fraction \\(n/N < 0.10\\)), the number of defectives \\(d \\sim \\text{Binomial}(n, p)\\). The probability of acceptance:</p>
<p>\\[P_a(p) = P(d \\leq c) = \\sum_{d=0}^{c} \\binom{n}{d} p^d (1-p)^{n-d}\\]</p>

<h4>Numerical: \\(n = 10\\), \\(c = 3\\), \\(p = 0.05\\)</h4>
<p>\\[P_a = \\sum_{d=0}^{3} \\binom{10}{d} (0.05)^d (0.95)^{10-d}\\]</p>
<p>\\[P(d=0) = (0.95)^{10} = 0.5987\\]</p>
<p>\\[P(d=1) = 10 \\times 0.05 \\times (0.95)^9 = 10 \\times 0.05 \\times 0.6302 = 0.3151\\]</p>
<p>\\[P(d=2) = 45 \\times (0.05)^2 \\times (0.95)^8 = 45 \\times 0.0025 \\times 0.6634 = 0.0746\\]</p>
<p>\\[P(d=3) = 120 \\times (0.05)^3 \\times (0.95)^7 = 120 \\times 0.000125 \\times 0.6983 = 0.0105\\]</p>
<p>\\[\\boxed{P_a = 0.5987 + 0.3151 + 0.0746 + 0.0105 = 0.9989}\\]</p>
<p><strong>Interpretation</strong>: With a 5% defective rate, this plan accepts 99.89% of submitted lots — very lenient for incoming quality monitoring (AQL level quality for typical SSP designs).`,

'7.5': `<h3>EWMA Charts: Importance and Practical Application</h3>

<h4>Importance of EWMA Charts</h4>
<ol>
<li><strong>Detection of small shifts</strong>: The EWMA chart (Roberts, 1959) is specifically designed for detecting small to moderate process shifts (0.5–1.5\\(\\sigma\\)) that a Shewhart chart would detect only after many samples (large ARL\\(_1\\)).</li>
<li><strong>Smoothing effect</strong>: By computing the weighted average \\(Z_i = \\lambda x_i + (1-\\lambda)Z_{i-1}\\), the EWMA reduces noise and highlights sustained trends that Shewhart charts miss.</li>
<li><strong>Robustness to non-normality</strong>: Because \\(Z_i\\) is a weighted average of many observations, by the CLT it is approximately normally distributed even when individual observations are not normal.</li>
<li><strong>Flexibility</strong>: The smoothing parameter \\(\\lambda \\in (0,1]\\) can be tuned: small \\(\\lambda\\) (0.05–0.10) for very small shifts; large \\(\\lambda\\) (0.2–0.3) for larger shifts.</li>
<li><strong>Equivalence to ARIMA forecasting</strong>: The EWMA is the optimal forecast for an IMA(1,1) model — making it the natural chart for processes following such a time series structure.</li>
</ol>

<h4>Practical Usage</h4>
<p>Design: Choose \\(\\lambda\\) and \\(L\\) from Lucas and Saccucci (1990) ARL tables to achieve a desired \\(\\text{ARL}_0\\) and \\(\\text{ARL}_1\\).</p>
<p>Common choice: \\(\\lambda = 0.10\\)–\\(0.20\\), \\(L = 2.7\\)–\\(3.0\\) gives \\(\\text{ARL}_0 \\approx 370\\)–\\(500\\).</p>

<h4>Applications</h4>
<ul>
<li><strong>Chemical/pharmaceutical manufacturing</strong>: Monitoring pH, moisture content, active ingredient concentration — variables that drift slowly due to catalyst aging or raw material lot-to-lot variation.</li>
<li><strong>Semiconductor fabrication</strong>: Monitoring deposition thickness, etch rates, critical dimensions — where successive wafer results are autocorrelated and small shifts cause yield loss.</li>
<li><strong>Financial process monitoring</strong>: Detecting structural breaks in transaction fraud rates or service quality KPIs.</li>
<li><strong>Healthcare</strong>: Monitoring infection rates, surgical complication rates (risk-adjusted EWMA for rare adverse events).</li>
<li><strong>Data centres</strong>: Monitoring server response time, latency, and error rates in real-time SLA management.</li>
</ul>`,

'8.1': `<h3>Importance of Control Charts for Variables</h3>

<h4>Definition</h4>
<p>Control charts for <strong>variables</strong> monitor measurable quality characteristics (e.g., diameter, weight, tensile strength, pH) that take continuous values. The primary charts are \\(\\bar{X}\\)-R (mean-range), \\(\\bar{X}\\)-S (mean-standard deviation), and individuals-moving range (I-MR).</p>

<h4>Why Variables Charts are Important</h4>
<ol>
<li><strong>Rich information per sample</strong>: Variables data provide both location (mean \\(\\bar{X}\\)) and spread (R or S) information. Attribute charts (p, c) only record conformance. A process can be on target in mean but with excessive variability — variables charts detect this.</li>
<li><strong>Smaller sample sizes needed</strong>: For the same OC performance, variables charts require far fewer items per sample (typically \\(n = 4\\)–\\(5\\)) compared to attribute charts (\\(n = 50\\)–\\(200\\)).</li>
<li><strong>Process capability estimation</strong>: From \\(\\bar{X}\\) and \\(\\bar{R}\\) (or \\(\\bar{S}\\)) in control, we directly estimate \\(\\hat{\\sigma} = \\bar{R}/d_2\\) and compute \\(C_p\\) and \\(C_{pk}\\) — linking statistical control to specification compliance.</li>
<li><strong>Early warning of shifts</strong>: The \\(\\bar{X}\\) chart detects mean shifts before defectives actually appear in the product, enabling proactive corrective action.</li>
<li><strong>Diagnose both mean and variability shifts separately</strong>: The R or S chart detects increases in process spread (e.g., tool wear, fixture loosening) independently of the mean shift detection in the \\(\\bar{X}\\) chart.</li>
<li><strong>Natural measurement</strong>: For many engineering characteristics, measurement is already part of the process (e.g., coordinate measuring machines, automated gauging) — variables charts use this information directly without additional classification cost.</li>
<li><strong>Foundation for Six Sigma DMAIC</strong>: Variables control charts are central to the "Control" phase of DMAIC projects. They provide the evidence of sustained improvement.</li>
</ol>`,

'8.2': `<h3>Control Limits for \\((\\bar{X}, R)\\) and \\((\\bar{X}, S)\\) Charts: Standards Known and Unknown</h3>

<h4>Notation</h4>
<p>\\(n\\) = subgroup size; \\(\\mu_0, \\sigma_0\\) = known process mean and standard deviation (standards); \\(\\bar{\\bar{X}} = \\bar{X}\\) = overall grand mean; \\(\\bar{R}\\) = average range; \\(\\bar{S}\\) = average sample standard deviation.</p>
<p>Control chart constants: \\(d_2 = E[R/\\sigma]\\), \\(d_3 = \\text{SD}[R/\\sigma]\\), \\(c_4 = E[S/\\sigma]\\), \\(c_5 = \\text{SD}[S/\\sigma]\\) — all functions of \\(n\\) (tabulated in Montgomery, 2020).</p>

<h4>Case 1: Standards Known (\\(\\mu_0\\) and \\(\\sigma_0\\) specified)</h4>

<h5>\\(\\bar{X}\\)-Chart</h5>
<p>\\[\\text{UCL} = \\mu_0 + \\frac{3\\sigma_0}{\\sqrt{n}},\\quad \\text{CL} = \\mu_0,\\quad \\text{LCL} = \\mu_0 - \\frac{3\\sigma_0}{\\sqrt{n}}\\]</p>

<h5>R-Chart</h5>
<p>\\[\\text{UCL} = (d_2 + 3d_3)\\sigma_0 = D_2 \\sigma_0,\\quad \\text{CL} = d_2 \\sigma_0,\\quad \\text{LCL} = (d_2 - 3d_3)\\sigma_0 = D_1 \\sigma_0\\]</p>
<p>where \\(D_1 = \\max(0, d_2 - 3d_3)\\) and \\(D_2 = d_2 + 3d_3\\).</p>

<h5>S-Chart</h5>
<p>\\[\\text{UCL} = (c_4 + 3c_5)\\sigma_0 = B_6 \\sigma_0,\\quad \\text{CL} = c_4 \\sigma_0,\\quad \\text{LCL} = (c_4 - 3c_5)\\sigma_0 = B_5 \\sigma_0\\]</p>

<h4>Case 2: Standards Unknown (Estimated from Phase I data: \\(m\\) subgroups of size \\(n\\))</h4>

<h5>\\(\\bar{X}\\)-Chart (using \\(\\bar{R}\\))</h5>
<p>\\[\\hat{\\sigma} = \\bar{R}/d_2\\]</p>
<p>\\[\\text{UCL} = \\bar{\\bar{X}} + A_2 \\bar{R},\\quad \\text{CL} = \\bar{\\bar{X}},\\quad \\text{LCL} = \\bar{\\bar{X}} - A_2 \\bar{R}\\]</p>
<p>where \\(A_2 = 3/(d_2\\sqrt{n})\\).</p>

<h5>R-Chart</h5>
<p>\\[\\text{UCL} = D_4 \\bar{R},\\quad \\text{CL} = \\bar{R},\\quad \\text{LCL} = D_3 \\bar{R}\\]</p>
<p>where \\(D_3 = \\max(0, 1 - 3d_3/d_2)\\) and \\(D_4 = 1 + 3d_3/d_2\\).</p>

<h5>\\(\\bar{X}\\)-Chart (using \\(\\bar{S}\\))</h5>
<p>\\[\\hat{\\sigma} = \\bar{S}/c_4\\]</p>
<p>\\[\\text{UCL} = \\bar{\\bar{X}} + A_3 \\bar{S},\\quad \\text{CL} = \\bar{\\bar{X}},\\quad \\text{LCL} = \\bar{\\bar{X}} - A_3 \\bar{S}\\]</p>
<p>where \\(A_3 = 3/(c_4\\sqrt{n})\\).</p>

<h5>S-Chart</h5>
<p>\\[\\text{UCL} = B_4 \\bar{S},\\quad \\text{CL} = \\bar{S},\\quad \\text{LCL} = B_3 \\bar{S}\\]</p>
<p>where \\(B_3 = \\max(0, 1 - 3c_5/c_4)\\) and \\(B_4 = 1 + 3c_5/c_4\\).`,

'8.3': `<h3>Derivation: \\(c_4 = \\sqrt{\\frac{2}{n-1}}\\frac{\\Gamma(n/2)}{\\Gamma((n-1)/2)}\\)</h3>

<p>(Note: The question uses \\(c_2\\) for the bias correction of \\(S\\); modern notation (Montgomery) uses \\(c_4\\). The two are identical — we prove the stated formula here.)</p>

<h4>Setup</h4>
<p>Let \\(X_1, \\ldots, X_n \\stackrel{\\text{iid}}{\\sim} N(\\mu, \\sigma^2)\\). The sample standard deviation is \\(S = \\sqrt{\\frac{1}{n-1}\\sum(X_i - \\bar{X})^2}\\).</p>
<p>We know: \\(W = \\frac{(n-1)S^2}{\\sigma^2} \\sim \\chi^2(n-1) = \\chi^2(\\nu)\\) where \\(\\nu = n-1\\).</p>
<p>So \\(S = \\frac{\\sigma}{\\sqrt{\\nu}}\\sqrt{W}\\). We want \\(c_4 = E[S]/\\sigma = \\frac{1}{\\sqrt{\\nu}} E[\\sqrt{W}]\\).</p>

<h4>Computing \\(E[W^{1/2}]\\) for \\(W \\sim \\chi^2(\\nu)\\)</h4>
<p>The pdf of \\(W \\sim \\chi^2(\\nu)\\):</p>
<p>\\[f(w) = \\frac{w^{\\nu/2-1}e^{-w/2}}{2^{\\nu/2}\\Gamma(\\nu/2)},\\quad w > 0\\]</p>
<p>\\[E[W^{1/2}] = \\int_0^\\infty w^{1/2} \\cdot \\frac{w^{\\nu/2-1}e^{-w/2}}{2^{\\nu/2}\\Gamma(\\nu/2)}\\,dw = \\frac{1}{2^{\\nu/2}\\Gamma(\\nu/2)}\\int_0^\\infty w^{(\\nu+1)/2-1}e^{-w/2}\\,dw\\]</p>
<p>Substitute \\(u = w/2\\), so \\(w = 2u\\), \\(dw = 2\\,du\\):</p>
<p>\\[= \\frac{1}{2^{\\nu/2}\\Gamma(\\nu/2)}\\int_0^\\infty (2u)^{(\\nu+1)/2-1}e^{-u}\\cdot 2\\,du = \\frac{2^{(\\nu+1)/2-1}\\cdot 2}{2^{\\nu/2}\\Gamma(\\nu/2)}\\int_0^\\infty u^{(\\nu+1)/2-1}e^{-u}\\,du\\]</p>
<p>\\[= \\frac{2^{(\\nu-1)/2}\\cdot 2}{2^{\\nu/2}\\Gamma(\\nu/2)}\\Gamma\\!\\left(\\frac{\\nu+1}{2}\\right) = \\frac{2^{(\\nu+1)/2}}{2^{\\nu/2}\\Gamma(\\nu/2)}\\Gamma\\!\\left(\\frac{\\nu+1}{2}\\right) = \\frac{\\sqrt{2}\\,\\Gamma((\\nu+1)/2)}{\\Gamma(\\nu/2)}\\]</p>

<h4>Substituting Back</h4>
<p>With \\(\\nu = n-1\\):</p>
<p>\\[E[W^{1/2}] = \\sqrt{2}\\,\\frac{\\Gamma(n/2)}{\\Gamma((n-1)/2)}\\]</p>
<p>\\[c_4 = \\frac{E[S]}{\\sigma} = \\frac{1}{\\sqrt{n-1}}E[W^{1/2}] = \\frac{\\sqrt{2}}{\\sqrt{n-1}}\\cdot\\frac{\\Gamma(n/2)}{\\Gamma((n-1)/2)} = \\sqrt{\\frac{2}{n-1}}\\frac{\\Gamma(n/2)}{\\Gamma((n-1)/2)}\\quad\\square\\]</p>`,

'8.4': `<h3>Double Sampling Plan (DSP): Procedure and ASN Function</h3>

<h4>Plan Parameters</h4>
<p>DSP \\((N,\\, n_1,\\, c_1,\\, r_1,\\, n_2,\\, c_2)\\) where \\(N\\) = lot size, \\(n_1\\) = first sample size, \\(c_1\\) = acceptance number at stage 1, \\(r_1\\) = rejection number at stage 1, \\(n_2\\) = second sample size, \\(c_2\\) = combined acceptance number at stage 2.</p>

<h4>Procedure</h4>
<p><strong>Stage 1:</strong></p>
<ol>
<li>Draw \\(n_1\\) items at random. Let \\(d_1\\) = defectives found.</li>
<li>If \\(d_1 \\leq c_1\\): <strong>Accept</strong> the lot. Stage 2 not needed.</li>
<li>If \\(d_1 \\geq r_1\\): <strong>Reject</strong> the lot. Stage 2 not needed.</li>
<li>If \\(c_1 < d_1 < r_1\\): <strong>Draw Stage 2 sample</strong>.</li>
</ol>
<p><strong>Stage 2:</strong></p>
<ol>
<li>Draw \\(n_2\\) additional items. Let \\(d_2\\) = defectives in second sample; \\(d = d_1 + d_2\\) = combined defectives.</li>
<li>If \\(d \\leq c_2\\): <strong>Accept</strong> the lot.</li>
<li>If \\(d > c_2\\): <strong>Reject</strong> the lot.</li>
</ol>
<p><strong>Assumption</strong>: Both samples are drawn independently and at random from the same lot. Binomial model: \\(d_i \\sim \\text{Binomial}(n_i, p)\\).</p>

<h4>ASN Function</h4>
<p>Let \\(P_I\\) = probability of making a decision at Stage 1 (accept or reject):</p>
<p>\\[P_I = P(d_1 \\leq c_1) + P(d_1 \\geq r_1) = \\sum_{d=0}^{c_1}b(d;n_1,p) + \\sum_{d=r_1}^{n_1}b(d;n_1,p)\\]</p>
<p>Probability of requiring Stage 2:</p>
<p>\\[P_{II} = 1 - P_I = P(c_1 < d_1 < r_1) = \\sum_{d=c_1+1}^{r_1-1}b(d;n_1,p)\\]</p>
<p>Expected sample size (ASN):</p>
<p>\\[\\text{ASN}(p) = n_1 \\cdot P_I + (n_1 + n_2) \\cdot P_{II} = n_1 + n_2 \\cdot P_{II}\\]</p>
<p>\\[\\boxed{\\text{ASN}(p) = n_1 + n_2 \\sum_{d=c_1+1}^{r_1-1}\\binom{n_1}{d}p^d(1-p)^{n_1-d}}\\]</p>

<h5>Properties of the ASN Curve</h5>
<ul>
<li>At \\(p = 0\\): \\(d_1 = 0 \\leq c_1\\) always, so \\(P_{II} = 0\\) and \\(\\text{ASN} = n_1\\).</li>
<li>At \\(p = 1\\): \\(d_1 = n_1 \\geq r_1\\) always, so \\(P_{II} = 0\\) and \\(\\text{ASN} = n_1\\).</li>
<li>For intermediate \\(p\\): \\(P_{II} > 0\\) and \\(\\text{ASN} > n_1\\), with a peak near \\(p = c_1/n_1\\).</li>
<li>DSP advantage: For the same OC curve as an SSP (\\(n_{SSP}, c\\)), the DSP has \\(\\text{ASN} < n_{SSP}\\) for very good or very bad lots, reducing average inspection cost.</li>
</ul>`

};

fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
console.log('Done: 2016 written.');
console.log('JSON size (MB):', (fs.statSync(FILE).size / 1e6).toFixed(2));

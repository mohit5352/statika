'use strict';
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../src/data/explanations.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

if (!data.paper4) data.paper4 = {};
if (!data.paper4.demography) data.paper4.demography = {};
if (!data.paper4.sqc) data.paper4.sqc = {};

// ─── 2018 DEMOGRAPHY ──────────────────────────────────────────────────────────

data.paper4.demography['2018'] = {

'3.1': `<h3>Standardization of Death Rates: Direct and Indirect Methods</h3>

<h4>Why Standardize Death Rates?</h4>
<p>The Crude Death Rate (CDR) is confounded by the age composition of the population. An older population will have a higher CDR even if age-specific death rates are identical to those of a younger population. Standardization removes this confounding factor to enable fair mortality comparisons between populations or over time.</p>

<h4>Direct Method of Standardization</h4>
<p><strong>Principle</strong>: Apply the observed age-specific death rates (ASDRs) of the study population to a common standard population to compute expected deaths.</p>
<p>\\[\\text{SDR}_{\\text{direct}} = \\frac{\\sum_x {_nM_x} \\cdot P_x^s}{\\sum_x P_x^s} \\times 1000\\]</p>
<p>where \\(_nM_x = D_x/P_x\\) is the ASDR of the study population and \\(P_x^s\\) is the standard population in age group \\(x\\).</p>

<h5>Procedure</h5>
<ol>
<li>Compute ASDR for each age group: \\(_nM_x = D_x/P_x\\).</li>
<li>Apply these rates to the standard population: Expected deaths \\(= _nM_x \\times P_x^s\\).</li>
<li>Sum expected deaths: \\(E = \\sum_x {_nM_x} \\cdot P_x^s\\).</li>
<li>SDR = \\(E / P^s \\times 1000\\) where \\(P^s = \\sum_x P_x^s\\).</li>
</ol>

<p><strong>Advantages</strong>: Directly interpretable; straightforward calculation if full age-specific data are available.</p>
<p><strong>Disadvantages</strong>: Requires complete age-specific death data for the study population; choice of standard population affects the result; standard is arbitrary.</p>

<h4>Indirect Method of Standardization</h4>
<p><strong>Principle</strong>: Apply standard (reference) ASDRs to the study population's age structure to get expected deaths. Compute the Standardized Mortality Ratio (SMR) and adjust the standard CDR.</p>
<p>\\[\\text{Expected deaths} = \\sum_x {_nM_x^s} \\cdot P_x\\]</p>
<p>\\[\\text{SMR} = \\frac{\\text{Observed deaths}}{\\text{Expected deaths}}\\]</p>
<p>\\[\\text{SDR}_{\\text{indirect}} = \\text{SMR} \\times \\text{CDR}^s\\]</p>
<p>where \\(\\text{CDR}^s\\) is the standard population's crude death rate.</p>

<h5>Procedure</h5>
<ol>
<li>Apply standard ASDRs \\(_nM_x^s\\) to study population's age distribution \\(P_x\\).</li>
<li>Sum to get expected deaths \\(E^* = \\sum_x {_nM_x^s} \\cdot P_x\\).</li>
<li>SMR = Observed deaths / \\(E^*\\).</li>
<li>Indirect SDR = SMR × standard CDR.</li>
</ol>

<p><strong>Advantages</strong>: Can be used when only limited age-specific data (or only total deaths) are available for the study population; useful for small populations.</p>
<p><strong>Disadvantages</strong>: SDR values from different populations cannot be directly compared with each other (only with the standard); SMR is affected by the choice of standard.</p>

<h4>Comparison</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Feature</th><th>Direct Method</th><th>Indirect Method</th></tr>
<tr><td>Data needed</td><td>Full ASDR for study population</td><td>Only total deaths; standard ASDR</td></tr>
<tr><td>Comparability</td><td>SDRs from multiple populations are comparable</td><td>Only compared with standard CDR</td></tr>
<tr><td>Suitable when</td><td>Large populations with complete data</td><td>Small populations or limited data</td></tr>
</table>`,

'3.2': `<h3>Life Table: Filling Blanks Using Internal Consistency</h3>

<h4>Life Table Relationships</h4>
<p>For a complete (year-by-year) life table, the fundamental column relationships are:</p>
<ol>
<li>\\(d_x = l_x - l_{x+1}\\)</li>
<li>\\(q_x = d_x/l_x\\)</li>
<li>\\(p_x = 1 - q_x = l_{x+1}/l_x\\)</li>
<li>\\(L_x = (l_x + l_{x+1})/2\\) (under UDD assumption)</li>
<li>\\(T_x = T_{x+1} + L_x\\)</li>
<li>\\(e_x^0 = T_x/l_x\\)</li>
<li>\\(m_x = d_x/L_x\\) (central death rate)</li>
</ol>

<h4>Standard Strategy for Filling Blanks</h4>
<p>When some entries are missing, use the following approach:</p>
<ul>
<li>If \\(l_x\\) is known at two consecutive ages: \\(d_x = l_x - l_{x+1}\\), \\(q_x = d_x/l_x\\).</li>
<li>If \\(q_x\\) is known: \\(d_x = l_x \\cdot q_x\\), \\(l_{x+1} = l_x - d_x\\).</li>
<li>If \\(e_x^0\\) is known: \\(T_x = l_x \\cdot e_x^0\\); then \\(L_x = T_x - T_{x+1}\\).</li>
<li>Work from the oldest age downward for \\(T_x\\) computations.</li>
</ul>

<h4>Illustrative Example</h4>
<p>Suppose the following partial table is given (as in standard ISS examination problems):</p>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>\\(x\\)</th><th>\\(l_x\\)</th><th>\\(d_x\\)</th><th>\\(q_x\\)</th><th>\\(L_x\\)</th><th>\\(T_x\\)</th><th>\\(e_x^0\\)</th></tr>
<tr><td>50</td><td>80000</td><td>?</td><td>?</td><td>?</td><td>?</td><td>25.0</td></tr>
<tr><td>51</td><td>?</td><td>1200</td><td>?</td><td>?</td><td>?</td><td>?</td></tr>
<tr><td>52</td><td>?</td><td>?</td><td>0.016</td><td>?</td><td>760000</td><td>?</td></tr>
</table>

<p>Step 1: \\(T_{50} = l_{50} \\times e_{50}^0 = 80000 \\times 25.0 = 2{,}000{,}000\\)</p>
<p>Step 2: \\(l_{51} = l_{50} - d_{51} \\leftarrow\\) need d_50. From T: \\(L_{50} = T_{50} - T_{51}\\), but T_51 unknown. Use d_51 = 1200 to find l_51 = l_50 - d_50. We need d_50 first. From row 52: \\(T_{52} = 760{,}000\\), \\(l_{52} = l_{51} - d_{51} = l_{51} - 1200\\). \\(d_{52} = l_{52} \\times q_{52} = (l_{51}-1200) \\times 0.016\\). The precise computation continues with each new piece of known data filling the adjacent unknowns.</p>
<p><em>Note: The complete numerical solution requires the specific data as given in the original examination paper. The method described above, applied systematically, will yield all unknown entries.</em></p>`,

'3.3': `<h3>Fertility Measures: GFR, SFR, and TFR</h3>

<h4>Definitions</h4>

<h5>General Fertility Rate (GFR)</h5>
<p>\\[\\text{GFR} = \\frac{\\text{Total live births in the year}}{\\text{Mid-year female population aged 15--49}} \\times 1000\\]</p>
<p>Measures births per 1000 women of reproductive age. Superior to CBR as it focuses on the fertile age range. Still affected by the age distribution within 15–49.</p>

<h5>Specific Fertility Rate (SFR) / Age-Specific Fertility Rate (ASFR)</h5>
<p>\\[\\text{SFR}_x = \\frac{\\text{Births to women aged } [x, x+5)}{\\text{Mid-year female population aged } [x, x+5)} \\times 1000\\]</p>
<p>Computed for each 5-year age group (15–19, 20–24, ..., 45–49). Completely free of age-structure bias within the reproductive span. The most detailed fertility measure.</p>

<h5>Total Fertility Rate (TFR)</h5>
<p>\\[\\text{TFR} = 5 \\times \\sum_{x=15}^{45} \\text{SFR}_x = n \\sum_x f_x\\]</p>
<p>Average number of children a woman would have over her lifetime under current age-specific fertility rates (no mortality adjustment). TFR ≈ 2.1 at replacement level.</p>

<h4>Illustrative Computation</h4>
<p>Using a standard example (typical ISS examination data):</p>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Age group</th><th>Female pop \\(W_x\\)</th><th>Births \\(B_x\\)</th><th>SFR = \\(B_x/W_x \\times 1000\\)</th></tr>
<tr><td>15–19</td><td>20000</td><td>400</td><td>20.0</td></tr>
<tr><td>20–24</td><td>18000</td><td>1800</td><td>100.0</td></tr>
<tr><td>25–29</td><td>16000</td><td>2400</td><td>150.0</td></tr>
<tr><td>30–34</td><td>14000</td><td>1400</td><td>100.0</td></tr>
<tr><td>35–39</td><td>12000</td><td>600</td><td>50.0</td></tr>
<tr><td>40–44</td><td>10000</td><td>200</td><td>20.0</td></tr>
<tr><td>45–49</td><td>8000</td><td>40</td><td>5.0</td></tr>
<tr><th>Total</th><th>98000</th><th>6840</th><th>445.0</th></tr>
</table>

<p>\\[\\text{GFR} = \\frac{6840}{98000} \\times 1000 = 69.8 \\text{ per 1000}\\]</p>
<p>\\[\\text{TFR} = 5 \\times 445.0\\text{ per 1000} = 2225\\text{ per 1000} = 2.225 \\text{ children per woman}\\]</p>`,

'3.4': `<h3>Computing \\(l_{75}\\) and \\(l_{76}\\) from Life Table Relationships</h3>

<h4>Given Information</h4>
<ul>
<li>\\(d_{75} = 476\\) (deaths at exact age 75)</li>
<li>\\(e_{75}^0 = 3.92\\) (complete expectation of life at age 75)</li>
<li>\\(e_{76}^0 = 3.66\\) (complete expectation of life at age 76)</li>
</ul>

<h4>Setup</h4>
<p>Key relationships:</p>
<ul>
<li>\\(l_{76} = l_{75} - d_{75} = l_{75} - 476\\)</li>
<li>\\(T_{75} = l_{75} \\cdot e_{75}^0 = 3.92 \\cdot l_{75}\\)</li>
<li>\\(T_{76} = l_{76} \\cdot e_{76}^0 = 3.66 \\cdot l_{76} = 3.66(l_{75} - 476)\\)</li>
<li>Under UDD: \\(L_{75} = l_{75} - d_{75}/2 = l_{75} - 238\\)</li>
<li>\\(T_{75} = L_{75} + T_{76}\\)</li>
</ul>

<h4>Solution</h4>
<p>From \\(T_{75} = L_{75} + T_{76}\\):</p>
<p>\\[3.92 \\cdot l_{75} = (l_{75} - 238) + 3.66(l_{75} - 476)\\]</p>
<p>\\[3.92 l_{75} = l_{75} - 238 + 3.66 l_{75} - 1742.16\\]</p>
<p>\\[3.92 l_{75} = 4.66 l_{75} - 1980.16\\]</p>
<p>\\[1980.16 = (4.66 - 3.92) l_{75} = 0.74 \\cdot l_{75}\\]</p>
<p>\\[l_{75} = \\frac{1980.16}{0.74} = \\mathbf{2676}\\]</p>
<p>\\[l_{76} = l_{75} - d_{75} = 2676 - 476 = \\mathbf{2200}\\]</p>

<h4>Verification</h4>
<p>\\(T_{75} = 2676 \\times 3.92 = 10{,}489.9\\)</p>
<p>\\(T_{76} = 2200 \\times 3.66 = 8{,}052.0\\)</p>
<p>\\(L_{75} = T_{75} - T_{76} = 10{,}489.9 - 8{,}052.0 = 2{,}437.9\\)</p>
<p>Check: \\(L_{75} = l_{75} - d_{75}/2 = 2676 - 238 = 2438\\) ✓</p>`,

'3.5': `<h3>E.C. Rhodes Method of Fitting the Logistic Curve</h3>

<h4>Background</h4>
<p>E.C. Rhodes (1940) proposed a method of fitting the logistic curve that uses the concept of the <strong>complement of growth</strong>. Unlike the Pearl–Reed three-point method (which uses only three census data points), Rhodes's method uses <strong>all available census data</strong>, making it more robust.</p>

<h4>Logistic Curve Form</h4>
<p>\\[P(t) = \\frac{K}{1 + e^{a+bt}},\\quad b < 0\\]</p>
<p>Rearranging: \\[\\frac{K - P(t)}{P(t)} = e^{a+bt}\\implies \\ln\\left(\\frac{K-P}{P}\\right) = a + bt\\]</p>
<p>If \\(K\\) is known, the logistic is linear in \\(\\ln[(K-P)/P]\\) vs. \\(t\\).</p>

<h4>Rhodes's Iterative Procedure</h4>
<ol>
<li><strong>Assume an initial value of \\(K\\)</strong>: Rhodes suggested starting with \\(K = 2P_{\\max}\\) (twice the observed maximum population), where \\(P_{\\max}\\) is the largest observed census value.</li>
<li><strong>Compute the transformed variable</strong>:
  \\[y_t = \\ln\\left(\\frac{K - P_t}{P_t}\\right)\\]
  for all census years \\(t\\).</li>
<li><strong>Fit a straight line</strong> \\(y = a + bt\\) to the \\((t, y_t)\\) data using ordinary least squares:
  \\[b = \\frac{\\sum t_i y_i - n\\bar{t}\\bar{y}}{\\sum t_i^2 - n\\bar{t}^2},\\quad a = \\bar{y} - b\\bar{t}\\]</li>
<li><strong>Check linearity</strong>: Compute the fitted values \\(\\hat{y}_t = a + bt\\) and the residuals \\(r_t = y_t - \\hat{y}_t\\). If the residuals show a systematic pattern (non-linearity), the chosen \\(K\\) is inappropriate — iterate with a different \\(K\\).</li>
<li><strong>Adjust \\(K\\)</strong>: If the residuals are U-shaped (or inverted U-shaped), increase (or decrease) \\(K\\) and repeat steps 2–4 until the residuals are randomly distributed around zero.</li>
<li><strong>Final parameters</strong>: The \\(K\\), \\(a\\), \\(b\\) that give the best linear fit (minimum sum of squared residuals, or maximum \\(R^2\\)) are adopted.</li>
</ol>

<h4>Advantage over Pearl–Reed</h4>
<p>Rhodes's method uses all census data points instead of just three, making it statistically more efficient and less sensitive to the specific choice of three points. It also provides a diagnostic (the residual pattern) for testing whether the logistic is appropriate.</p>

<h4>Population Forecast</h4>
<p>Once \\(K\\), \\(a\\), \\(b\\) are determined:</p>
<p>\\[P(t_f) = \\frac{K}{1 + e^{a + b t_f}}\\]</p>
<p>where \\(t_f\\) is the future year (measured from the same origin as the fitting data).</p>`,

'4.1': `<h3>Vital Statistics: Meaning, Uses, Registration and Census Methods</h3>

<h4>What is Vital Statistics?</h4>
<p><strong>Vital statistics</strong> is the systematic compilation, analysis, and publication of data on vital events — births, deaths, marriages, divorces, foetal deaths — occurring in a defined population over time. It forms the statistical foundation of demography and public health.</p>

<h4>Uses of Vital Statistics</h4>
<ul>
<li>Computation of demographic rates: CBR, CDR, IMR, MMR, TFR, NRR.</li>
<li>Construction of life tables and population projections.</li>
<li>Public health monitoring: epidemic detection, chronic disease surveillance.</li>
<li>Legal evidence for citizenship, inheritance, marriage eligibility.</li>
<li>Planning health services, schools, housing, and social security.</li>
<li>Tracking SDG progress (SDG 3: Health; SDG 16: civil registration).</li>
</ul>

<h4>Registration Method (Civil Registration System)</h4>
<p>Vital events (births, deaths, marriages) are <strong>compulsorily registered</strong> with local government registrars under the Registration of Births and Deaths Act, 1969 in India.</p>
<p><strong>Mechanism</strong>: Parents report births; attending physician or family head reports deaths; couples register marriage.</p>
<p><strong>Shortcomings</strong>:</p>
<ul>
<li>Significant under-registration in rural and tribal areas (estimated 30–40% in some states).</li>
<li>Delayed registration — events recorded months/years after occurrence.</li>
<li>Cause-of-death misclassification due to lack of trained medical certification.</li>
<li>No coverage of migrating or homeless populations.</li>
</ul>

<h4>Census Method</h4>
<p>The <strong>decennial Census of India</strong> (mandated by Census Act, 1948) counts the entire population on a reference night. Retrospective questions on births and deaths in the preceding year are used to estimate vital rates.</p>
<p><strong>Mechanism</strong>: During the Population Enumeration phase, enumerators ask about children born/died in the previous year, marriages, and migration in the household.</p>
<p><strong>Shortcomings</strong>:</p>
<ul>
<li>Captures only decennial snapshots — inter-censal periods require extrapolation.</li>
<li>Recall error: retrospective questions about births and deaths in the past 12 months are subject to memory bias and omission.</li>
<li>Not suitable for routine monitoring (too infrequent).</li>
<li>Age misreporting (heaping) distorts age-specific rates.</li>
<li>Disruptions in conflict-affected or geographically remote areas.</li>
</ul>`,

'4.2': `<h3>Measures of Mortality: Definitions, Merits and Demerits</h3>

<h4>1. Crude Death Rate (CDR)</h4>
<p>\\[\\text{CDR} = \\frac{D}{P} \\times 1000\\]</p>
<p>Deaths per 1000 mid-year population.</p>
<p><strong>Merits</strong>: Simple, widely available, good for rough comparisons of large populations.</p>
<p><strong>Demerits</strong>: Heavily influenced by age structure (an older population has a higher CDR even with the same age-specific mortality); misleading for comparisons between countries with different demographic profiles.</p>

<h4>2. Age-Specific Death Rate (ASDR)</h4>
<p>\\[_nM_x = \\frac{D_x}{P_x} \\times 1000\\]</p>
<p>Deaths per 1000 persons in age group \\([x, x+n)\\).</p>
<p><strong>Merits</strong>: Free from age-structure bias; enables detailed mortality analysis; used to construct life tables.</p>
<p><strong>Demerits</strong>: Produces a vector of rates (difficult to summarise in a single number); requires large population for reliable estimates in each age group.</p>

<h4>3. Infant Mortality Rate (IMR)</h4>
<p>\\[\\text{IMR} = \\frac{D_{<1}}{B} \\times 1000\\]</p>
<p><strong>Merits</strong>: Sensitive indicator of socioeconomic development, nutrition, and healthcare quality. Widely used for international comparison (HDI, MDGs, SDGs).</p>
<p><strong>Demerits</strong>: Modified IMR (period measure) mixes birth cohorts; True IMR requires two-year data; registration of infant deaths is particularly incomplete in developing countries.</p>

<h4>4. Maternal Mortality Ratio (MMR)</h4>
<p>\\[\\text{MMR} = \\frac{\\text{Maternal deaths}}{\\text{Live births}} \\times 100{,}000\\]</p>
<p><strong>Merits</strong>: Direct measure of obstetric care quality; SDG 3.1 target.</p>
<p><strong>Demerits</strong>: Rare events require large populations for reliable estimates; cause of death attribution to maternal causes is subjective.</p>

<h4>5. Standardized Death Rate (SDR)</h4>
<p>\\[\\text{SDR} = \\frac{\\sum_x {_nM_x} P_x^s}{P^s} \\times 1000\\]</p>
<p><strong>Merits</strong>: Removes age-structure confounding; enables valid mortality comparisons between populations.</p>
<p><strong>Demerits</strong>: Result depends on the choice of standard population; more complex to compute.</p>

<h4>6. Life Expectancy at Birth \\((e_0^0)\\)</h4>
<p>\\[e_0^0 = T_0/l_0\\]</p>
<p><strong>Merits</strong>: Most comprehensive single summary of the mortality schedule; used in HDI; interpretable as average years of life.</p>
<p><strong>Demerits</strong>: Requires a complete life table (complex computation); "period" life expectancy assumes current rates persist (may not reflect future cohort experience).</p>`,

'4.3': `<h3>Makeham's Law: Fitting to Life Table Data</h3>

<h4>Makeham's Law of Mortality</h4>
<p>W.M. Makeham (1860) extended Gompertz's law by adding a <strong>constant term</strong> \\(A\\) representing age-independent (accidental) mortality:</p>
<p>\\[\\mu(x) = A + Bc^x\\]</p>
<p>where \\(A > 0\\), \\(B > 0\\), \\(c > 1\\). The survival function:</p>
<p>\\[S(x) = \\exp\\!\\left(-Ax - \\frac{B(c^x - 1)}{\\ln c}\\right) = s^x \\cdot g^{c^x}\\]</p>
<p>where \\(s = e^{-A}\\) and \\(g = e^{-B/\\ln c}\\) are constants.</p>

<h4>Relationship to \\(l_x\\)</h4>
<p>\\[\\ln l_x = \\ln l_0 - Ax - \\frac{B}{\\ln c}(c^x - 1)\\]</p>
<p>Let \\(\\log_{10} l_x = k - ax - bc^x\\) (taking log base 10 for convenience), where:</p>
<p>\\(k = \\log_{10} l_0\\), \\(a = A/\\ln(10)\\), \\(b = B/((\\ln c)\\ln(10))\\).</p>

<h4>Method of Fitting (King–Hardy Method using 6 Age Points)</h4>
<p>Let \\(u_x = \\log_{10} l_x\\). For 6 equally spaced ages \\(x_0, x_1, x_2, x_3, x_4, x_5\\) with spacing \\(h\\), define:</p>
<p>\\[S_1 = u_0 + u_1,\\quad S_2 = u_2 + u_3,\\quad S_3 = u_4 + u_5\\]</p>
<p>The Makeham parameters satisfy:</p>
<p>\\[c^h = \\frac{S_3 - S_2}{S_2 - S_1}\\]</p>
<p>From \\(c^h\\): \\(c = (c^h)^{1/h}\\), \\(b = \\frac{S_2-S_1}{c^{x_0}(c^{2h}-1)(c^h+1)/c^h}\\)</p>
<p>And \\(a\\) is obtained from the residuals after subtracting the \\(bc^x\\) term.</p>

<h5>Illustrative Fitting (Standard Makeham Parameters)</h5>
<p>Using the English Life Table (ELT) No. 12 style data for ages 20, 30, 40, 50, 60, 70 (\\(h = 10\\)):</p>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>\\(x\\)</th><th>\\(l_x\\)  (typical)</th><th>\\(u_x = \\log_{10} l_x\\)</th></tr>
<tr><td>20</td><td>94000</td><td>4.9731</td></tr>
<tr><td>30</td><td>92000</td><td>4.9638</td></tr>
<tr><td>40</td><td>89500</td><td>4.9518</td></tr>
<tr><td>50</td><td>84000</td><td>4.9243</td></tr>
<tr><td>60</td><td>72000</td><td>4.8573</td></tr>
<tr><td>70</td><td>50000</td><td>4.6990</td></tr>
</table>
<p>\\(S_1 = 4.9731 + 4.9638 = 9.9369\\)</p>
<p>\\(S_2 = 4.9518 + 4.9243 = 9.8761\\)</p>
<p>\\(S_3 = 4.8573 + 4.6990 = 9.5563\\)</p>
<p>\\(c^{10} = (S_3-S_2)/(S_2-S_1) = (-0.3198)/(-0.0608) = 5.259\\)</p>
<p>\\(c = 5.259^{0.1} = 1.1811\\) per year (force of senescent mortality increases by 18.1% per year)</p>
<p>The remaining parameters \\(b\\) and \\(a\\) are determined from the resulting system and the fitted curve \\(u_x = k - ax - bc^x\\) is then used for projection and interpolation of the life table.</p>`,

'4.4': `<h3>Population Growth/Decline/Stability Indicators and GRR–NRR Relationship</h3>

<h4>How to Decide Population Tendency</h4>
<p>The trend (increasing, decreasing, or stable) is determined by:</p>
<ol>
<li><strong>Net Reproduction Rate (NRR)</strong>:
  <ul>
    <li>NRR &gt; 1: Population will increase in the long run (each generation more than replaces itself).</li>
    <li>NRR = 1: Population is stationary (exact replacement).</li>
    <li>NRR &lt; 1: Population will decrease in the long run.</li>
  </ul></li>
<li><strong>Intrinsic Rate of Natural Increase (\\(r\\))</strong>:
  <ul>
    <li>\\(r > 0\\): Growing population.</li>
    <li>\\(r = 0\\): Stationary population.</li>
    <li>\\(r < 0\\): Declining population.</li>
    <li>Approximation: \\(r \\approx \\ln(\\text{NRR})/T_c\\) where \\(T_c \\approx 27\\)–30 years.</li>
  </ul></li>
<li><strong>Population momentum</strong>: Even with NRR = 1, a population with a young age structure will continue to grow for decades before stabilising.</li>
</ol>

<h4>Measures of Population Growth</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Measure</th><th>Formula</th><th>Interpretation</th></tr>
<tr><td>CBR − CDR</td><td>Natural rate of increase</td><td>Annual percentage growth from natural change only</td></tr>
<tr><td>NRR</td><td>\\(\\sum_x f_x^F \\cdot {_nL_x^F}/l_0\\)</td><td>Generational replacement; best single long-run indicator</td></tr>
<tr><td>Intrinsic rate \\(r\\)</td><td>Solution to Euler-Lotka equation</td><td>Instantaneous growth rate under current fertility and mortality</td></tr>
<tr><td>Doubling time</td><td>\\(T_{2} = \\ln 2/r \\approx 70/r\\%\\)</td><td>Years to double population at current growth rate</td></tr>
</table>

<h4>Relationship Between GRR and NRR</h4>
<p>The <strong>Gross Reproduction Rate (GRR)</strong> ignores mortality; the <strong>NRR</strong> adjusts GRR for female mortality during the reproductive years:</p>
<p>\\[\\text{GRR} = \\sum_{x} f_x^F \\cdot n\\]</p>
<p>\\[\\text{NRR} = \\sum_x f_x^F \\cdot \\frac{_nL_x^F}{l_0}\\]</p>
<p>Therefore:</p>
<p>\\[\\text{NRR} = \\text{GRR} \\times \\bar{p}_f\\]</p>
<p>where \\(\\bar{p}_f\\) is the <strong>proportion of female infants surviving to the mean age of childbearing</strong> (\\(\\bar{x}\\)):</p>
<p>\\[\\bar{p}_f = \\frac{\\text{NRR}}{\\text{GRR}} = \\frac{\\sum_x f_x^F \\cdot {_nL_x^F}/l_0}{\\sum_x f_x^F}\\]</p>
<p>Alternatively, \\(\\bar{p}_f \\approx l(\\bar{x})/l_0\\) where \\(\\bar{x}\\) is the mean age of mothers at birth of daughters.</p>
<p><strong>Interpretation</strong>: The ratio NRR/GRR measures the average survival probability of a newborn female girl to childbearing age under current mortality. In high-mortality populations, GRR can be substantially larger than NRR (e.g., GRR = 3.0 but NRR = 1.5 if \\(\\bar{p}_f = 0.5\\)). In low-mortality populations (e.g., developed countries), \\(\\bar{p}_f \\approx 0.95\\) and NRR ≈ 0.95 × GRR.</p>`

};

// ─── 2018 SQC ─────────────────────────────────────────────────────────────────

data.paper4.sqc['2018'] = {

'7.1': `<h3>p-Charts and c-Charts: Uses and Differences; Process Capability</h3>

<h4>Part (i): p-Charts and c-Charts</h4>

<h5>p-Chart (Fraction Defective Chart)</h5>
<p>The p-chart monitors the <strong>proportion of defective units</strong> in a sample. An item is classified as defective (does not meet any one or more quality specifications) or non-defective.</p>
<p><strong>Uses</strong>:</p>
<ul>
<li>Monitoring assembly lines where items are classified as pass/fail.</li>
<li>Tracking percentage of customer complaints, warranty claims.</li>
<li>Suitable for variable sample sizes (individual control limits for each sample).</li>
</ul>
<p>Control limits: \\(\\bar{p} \\pm 3\\sqrt{\\bar{p}(1-\\bar{p})/n}\\)</p>

<h5>c-Chart (Count of Defects per Unit)</h5>
<p>The c-chart monitors the <strong>number of nonconformities (defects) per inspection unit</strong> when the area of opportunity is constant. A unit may have multiple defects.</p>
<p><strong>Uses</strong>:</p>
<ul>
<li>Counting weaving flaws per metre of fabric.</li>
<li>Counting solder defects per printed circuit board.</li>
<li>Counting surface scratches per automobile body panel.</li>
</ul>
<p>Control limits: \\(\\bar{c} \\pm 3\\sqrt{\\bar{c}}\\)</p>

<h5>Key Difference</h5>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Feature</th><th>p-Chart</th><th>c-Chart</th></tr>
<tr><td>Counts</td><td>Defective units (0 or 1 per unit)</td><td>Defects per unit (0, 1, 2, ... per unit)</td></tr>
<tr><td>Distribution</td><td>Binomial</td><td>Poisson</td></tr>
<tr><td>Requirement</td><td>Classifiable items (n ≥ 50)</td><td>Fixed area of opportunity per unit</td></tr>
<tr><td>Max per item</td><td>1 (item is either defective or not)</td><td>Many defects per item possible</td></tr>
</table>

<h4>Part (ii): Process Capability</h4>
<p><strong>Process capability</strong> is the inherent ability of a stable, in-control process to consistently meet engineering specifications. It is measured by comparing the natural process spread (\\(6\\sigma\\)) with the tolerance (USL − LSL).</p>
<p><strong>How measured</strong>:</p>
<ul>
<li>\\(C_p = (\\text{USL}-\\text{LSL})/(6\\hat{\\sigma})\\): Potential capability (assumes perfect centering).</li>
<li>\\(C_{pk} = \\min((\\text{USL}-\\hat{\\mu})/(3\\hat{\\sigma}),\\ (\\hat{\\mu}-\\text{LSL})/(3\\hat{\\sigma}))\\): Actual capability (accounts for centering).</li>
<li>\\(\\hat{\\sigma} = \\bar{R}/d_2\\) or \\(\\bar{s}/c_4\\) from control chart data.</li>
</ul>
<p><strong>Why important</strong>:</p>
<ul>
<li>A process can be in statistical control yet incapable (if \\(6\\sigma\\) > tolerance).</li>
<li>Capability indices are required for automotive (AIAG), aerospace, and ISO/TS 16949 compliance.</li>
<li>Design engineers use capability information to set realistic tolerances.</li>
<li>Guides prioritisation of improvement efforts — low \\(C_{pk}\\) processes receive Six Sigma attention first.</li>
</ul>`,

'7.2': `<h3>Probability of Out-of-Control Alarm at the Fourth Sample</h3>

<h4>Given Information</h4>
<ul>
<li>\\(\\bar{X}\\)-chart: UCL = 104, CL = 100, LCL = 96</li>
<li>True process: mean \\(\\mu_1 = 98\\), standard deviation \\(\\sigma = 8\\)</li>
<li>From chart: \\(3\\sigma_{\\bar{X}} = \\text{UCL} - \\text{CL} = 4\\), so \\(\\sigma_{\\bar{X}} = 4/3\\)</li>
<li>Since \\(\\sigma_{\\bar{X}} = \\sigma/\\sqrt{n} = 8/\\sqrt{n} = 4/3\\): \\(\\sqrt{n} = 6\\), \\(n = 36\\)</li>
</ul>

<h4>Probability of No Alarm at One Sample (\\(\\beta\\))</h4>
<p>When the true mean is \\(\\mu_1 = 98\\):</p>
<p>\\[P(\\text{no alarm} \\mid \\mu_1) = P\\left(96 \\leq \\bar{X} \\leq 104 \\mid \\mu_1 = 98,\\ \\sigma_{\\bar{X}} = \\frac{4}{3}\\right)\\]</p>
<p>\\[= P\\left(\\frac{96-98}{4/3} \\leq Z \\leq \\frac{104-98}{4/3}\\right) = P(-1.5 \\leq Z \\leq 4.5)\\]</p>
<p>\\[= \\Phi(4.5) - \\Phi(-1.5) = 0.99997 - 0.06681 = 0.93316\\]</p>
<p>\\[P(\\text{alarm at one sample}) = 1 - 0.93316 = 0.06684\\]</p>

<h4>Probability of Alarm Exactly at the 4th Sample Point</h4>
<p>This requires: no alarm on samples 1, 2, 3 AND an alarm on sample 4 (each sample is independent):</p>
<p>\\[P(\\text{alarm at 4th}) = P(\\text{no alarm})^3 \\times P(\\text{alarm})\\]</p>
<p>\\[= (0.93316)^3 \\times 0.06684\\]</p>
<p>\\[(0.93316)^3 = 0.81348\\]</p>
<p>\\[= 0.81348 \\times 0.06684 = \\mathbf{0.05438}\\]</p>

<h4>Interpretation</h4>
<p>There is a 5.44% probability that the first out-of-control signal occurs at exactly the 4th sample when the true mean has shifted from 100 to 98 (a shift of \\(-2\\) units or \\(-0.25\\sigma\\)). The ARL for this shift is \\(1/0.06684 \\approx 15\\) samples.</p>`,

'7.3': `<h3>Process Capability Indices \\(C_p\\) and \\(C_{pk}\\): Computation and Interpretation</h3>

<h4>Given</h4>
<p>USL = 80, LSL = 50, Process \\(\\mu = 60\\), Process \\(\\sigma = 5\\).</p>

<h4>Computation</h4>

<h5>\\(C_p\\) (Potential Capability)</h5>
<p>\\[C_p = \\frac{\\text{USL} - \\text{LSL}}{6\\sigma} = \\frac{80 - 50}{6 \\times 5} = \\frac{30}{30} = \\mathbf{1.0}\\]</p>

<h5>\\(C_{pk}\\) (Actual Capability)</h5>
<p>\\[C_{pu} = \\frac{\\text{USL} - \\mu}{3\\sigma} = \\frac{80 - 60}{3 \\times 5} = \\frac{20}{15} = 1.333\\]</p>
<p>\\[C_{pl} = \\frac{\\mu - \\text{LSL}}{3\\sigma} = \\frac{60 - 50}{3 \\times 5} = \\frac{10}{15} = 0.667\\]</p>
<p>\\[C_{pk} = \\min(C_{pu},\\ C_{pl}) = \\min(1.333,\\ 0.667) = \\mathbf{0.667}\\]</p>

<h4>Comments and Interpretation</h4>
<ol>
<li><strong>\\(C_p = 1.0\\)</strong>: The process spread (\\(6\\sigma = 30\\)) exactly equals the specification width (USL − LSL = 30). The process is <em>marginally capable</em> under the <em>assumption of perfect centering</em> — but only just.</li>
<li><strong>\\(C_{pk} = 0.667 &lt; 1.0\\)</strong>: In reality, the process is <em>NOT capable</em>. The process mean (60) is significantly off-centre from the specification midpoint \\(M = (50+80)/2 = 65\\). The mean is 10 units below the specification midpoint — it is much closer to the LSL (only 10 units away) than to the USL (20 units away).</li>
<li><strong>Expected proportion non-conforming</strong>:
  <ul>
    <li>Below LSL: \\(P(X < 50) = P(Z < (50-60)/5) = P(Z < -2) = 0.0228\\) (2.28%).</li>
    <li>Above USL: \\(P(X > 80) = P(Z > (80-60)/5) = P(Z > 4) \\approx 0.00003\\) (0.003%).</li>
  </ul>
  About 2.28% of output will fall below LSL.</li>
<li><strong>Recommended action</strong>: Center the process mean at 65 (midpoint of [50, 80]). With \\(\\mu = 65\\) and \\(\\sigma = 5\\):
  \\(C_{pk} = C_p = 1.0\\) (both limits equidistant; barely capable). Ideally, also reduce \\(\\sigma\\) to achieve \\(C_p \\geq 1.33\\).</li>
</ol>`,

'7.4': `<h3>X-bar and R Chart Setup for n = 5, 35 Samples</h3>

<h4>Given</h4>
<p>Sample size \\(n = 5\\), number of samples \\(k = 35\\). The actual sample data (\\(\\sum\\bar{X}\\) and \\(\\sum R\\)) were to be provided in the examination paper. The procedure below is given in full generality.</p>

<h4>Control Chart Constants for n = 5</h4>
<table border="1" style="border-collapse:collapse;">
<tr><th>Constant</th><td>\\(A_2\\)</td><td>\\(d_2\\)</td><td>\\(D_3\\)</td><td>\\(D_4\\)</td></tr>
<tr><th>Value</th><td>0.577</td><td>2.326</td><td>0</td><td>2.114</td></tr>
</table>

<h4>Step 1: Compute \\(\\bar{\\bar{X}}\\) and \\(\\bar{R}\\)</h4>
<p>\\[\\bar{\\bar{X}} = \\frac{\\sum_{i=1}^{35}\\bar{X}_i}{35},\\quad \\bar{R} = \\frac{\\sum_{i=1}^{35} R_i}{35}\\]</p>

<h4>Step 2: Trial Control Limits</h4>
<p><strong>\\(\\bar{X}\\)-Chart:</strong></p>
<p>\\[\\text{UCL}_{\\bar{X}} = \\bar{\\bar{X}} + A_2\\bar{R} = \\bar{\\bar{X}} + 0.577\\bar{R}\\]</p>
<p>\\[\\text{CL}_{\\bar{X}} = \\bar{\\bar{X}}\\]</p>
<p>\\[\\text{LCL}_{\\bar{X}} = \\bar{\\bar{X}} - 0.577\\bar{R}\\]</p>

<p><strong>\\(R\\)-Chart:</strong></p>
<p>\\[\\text{UCL}_{R} = D_4\\bar{R} = 2.114\\bar{R}\\]</p>
<p>\\[\\text{CL}_{R} = \\bar{R}\\]</p>
<p>\\[\\text{LCL}_{R} = D_3\\bar{R} = 0\\quad (\\text{for }n = 5)\\]</p>

<h4>Step 3: Estimate Process Parameters</h4>
<p>Assuming the process is in statistical control with all 35 sample means and ranges within the control limits:</p>
<p><strong>Process mean estimate:</strong> \\[\\hat{\\mu} = \\bar{\\bar{X}}\\]</p>
<p><strong>Process standard deviation estimate:</strong> \\[\\hat{\\sigma} = \\frac{\\bar{R}}{d_2} = \\frac{\\bar{R}}{2.326}\\]</p>

<h4>Step 4: Establishing Revised Limits</h4>
<p>Remove any out-of-control points (with identified assignable causes), recompute \\(\\bar{\\bar{X}}\\) and \\(\\bar{R}\\) from the remaining samples, and recalculate the control limits. Repeat until all remaining samples are within limits. The final limits are used for ongoing process monitoring.</p>`,

'7.5': `<h3>Acceptance Sampling Terminology: AQL, LTPD, Consumer's Risk, Producer's Risk, OC Curve</h3>

<h4>(i) AQL — Acceptable Quality Level</h4>
<p>The <strong>Acceptable Quality Level (AQL)</strong> is the maximum proportion (or percentage) of defective items in a lot that is considered <em>satisfactory as a process average</em>. It represents the quality level that the sampling plan should accept with a high probability (typically \\(1 - \\alpha = 0.95\\)). AQL is set by the consumer and the producer in a quality agreement. Lots produced at AQL quality or better should rarely be rejected. ISO 2859-1 defines AQL as part of a standard acceptance sampling system with switching rules.</p>

<h4>(ii) LTPD — Lot Tolerance Percent Defective</h4>
<p>The <strong>Lot Tolerance Percent Defective (LTPD)</strong>, also called the <em>Rejectable Quality Level (RQL)</em>, is the fraction defective at which the consumer considers the lot quality "bad" and wishes to reject the lot with high probability (\\(1 - \\beta = 0.90\\)). LTPD is the quality level at the "bad" end of the OC curve. Lots at or above LTPD quality should be rejected at least 90% of the time.</p>

<h4>(iii) Consumer's Risk (\\(\\beta\\))</h4>
<p>The <strong>consumer's risk \\(\\beta\\)</strong> is the probability of <em>accepting</em> a lot whose true fraction defective equals the LTPD (or exceeds an unacceptable threshold). It is the probability that a bad lot passes the sampling inspection and reaches the consumer. Typically set at \\(\\beta = 0.10\\) (10%).</p>
<p>\\[\\beta = P(\\text{accept lot} \\mid p = \\text{LTPD}) = P_a(\\text{LTPD})\\]</p>

<h4>(iv) Producer's Risk (\\(\\alpha\\))</h4>
<p>The <strong>producer's risk \\(\\alpha\\)</strong> is the probability of <em>rejecting</em> a lot whose true fraction defective equals the AQL (the lot is good, but it is rejected by the sampling plan). It is a Type I error from the producer's perspective. Typically set at \\(\\alpha = 0.05\\) (5%).</p>
<p>\\[\\alpha = P(\\text{reject lot} \\mid p = \\text{AQL}) = 1 - P_a(\\text{AQL})\\]</p>

<h4>(v) OC Curve</h4>
<p>The <strong>Operating Characteristic (OC) curve</strong> is a graph of \\(P_a(p)\\) — the probability of accepting a lot — plotted against the true lot fraction defective \\(p\\). The OC curve completely characterises the performance of a sampling plan:</p>
<ul>
<li>At \\(p = 0\\): \\(P_a = 1\\) (perfect lots always accepted).</li>
<li>At \\(p = \\text{AQL}\\): \\(P_a = 1 - \\alpha \\geq 0.95\\) (producer's risk ≤ 5%).</li>
<li>At \\(p = \\text{LTPD}\\): \\(P_a = \\beta \\leq 0.10\\) (consumer's risk ≤ 10%).</li>
<li>At \\(p = 1\\): \\(P_a = 0\\) (entirely defective lots always rejected).</li>
</ul>
<p>A steeper OC curve indicates better discrimination. Larger sample sizes \\(n\\) (with \\(c/n\\) fixed) give steeper OC curves.</p>`,

'8.1': `<h3>CUSUM vs. Shewhart Charts, V-Mask, and ASN/ATI</h3>

<h4>Part (i): CUSUM Control Chart and Comparison with Shewhart Chart</h4>

<h5>CUSUM Chart Description</h5>
<p>The CUSUM (Cumulative Sum) chart plots the cumulative sum of deviations from the target:</p>
<p>\\[C_i^+ = \\max[0, C_{i-1}^+ + (x_i - \\mu_0 - k)]\\]</p>
<p>\\[C_i^- = \\max[0, C_{i-1}^- + (\\mu_0 - k - x_i)]\\]</p>
<p>Signal: when \\(C^+ > h\\) or \\(C^- > h\\). Parameters: \\(k = \\delta\\sigma/2\\) (reference value), \\(h = 4\\sigma\\) to \\(5\\sigma\\).</p>

<h5>Comparison with Shewhart Chart</h5>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Feature</th><th>Shewhart \\(\\bar{X}\\)-Chart</th><th>CUSUM Chart</th></tr>
<tr><td>Memory</td><td>None (uses only current point)</td><td>All past observations (cumulative)</td></tr>
<tr><td>Best for</td><td>Large shifts (\\(> 2\\sigma\\))</td><td>Small to moderate shifts (\\(0.5\\)–\\(2\\sigma\\))</td></tr>
<tr><td>ARL (in-control)</td><td>370 (\\(3\\sigma\\) limits)</td><td>370–500 (depending on \\(k, h\\))</td></tr>
<tr><td>ARL (1\\(\\sigma\\) shift)</td><td>~44 samples</td><td>~10.4 samples (much faster)</td></tr>
<tr><td>Ease of use</td><td>Very easy to plot and interpret</td><td>Requires parameter selection; tabular form complex</td></tr>
<tr><td>Optimality</td><td>Not optimal for small shifts</td><td>Optimal (SPRT-based) for specified shift size</td></tr>
</table>

<h5>V-Mask in CUSUM Charts</h5>
<p>The V-mask is placed at the current point \\((m, S_m)\\) where \\(S_m = \\sum_{i=1}^m (x_i - \\mu_0)\\). It consists of:</p>
<ul>
<li><strong>Lead distance \\(d\\)</strong>: horizontal offset of vertex from current point.</li>
<li><strong>Half-angle \\(\\theta\\)</strong>: \\(\\tan\\theta = k\\) (reference value).</li>
</ul>
<p>A signal occurs when any previous cumulative sum falls outside the V-mask arms. The V-mask provides a visual way to detect both upward and downward shifts simultaneously. The tabular CUSUM (\\(C^+\\), \\(C^-\\)) is mathematically equivalent and preferred for automation.</p>

<h4>Part (ii): ASN and ATI</h4>
<p><strong>Average Sample Number (ASN)</strong>: Expected number of items inspected per lot. For SSP: ASN = \\(n\\). For DSP: ASN = \\(n_1 + n_2 \\cdot P_{II}(p)\\) where \\(P_{II}\\) is probability of drawing a second sample. The ASN curve shows how average inspection varies with incoming lot quality \\(p\\).</p>
<p><strong>Average Total Inspection (ATI)</strong>: Under rectifying inspection (rejected lots 100% screened), ATI = ASN × \\(P_a(p)\\) + \\(N \\times (1-P_a(p))\\). ATI quantifies the total inspection burden per lot, considering both accepted lots (only sample inspected) and rejected lots (entire lot inspected).</p>`,

'8.2': `<h3>Machine Process Capability and Defective Bulb Control Chart</h3>

<h4>Part (i): Machine Capability Assessment</h4>
<p>Given: LSL = 12.35, USL = 12.65 (tolerance width = 0.30).</p>
<p>Three machines have different standard deviations (as given in the original data). A machine is <strong>capable</strong> if \\(C_p \\geq 1.33\\) (standard minimum for new processes) or \\(C_p \\geq 1.0\\) (minimum acceptable).</p>

<p>\\[C_p = \\frac{\\text{USL} - \\text{LSL}}{6\\sigma} = \\frac{0.30}{6\\sigma}\\]</p>

<p>For a process to be capable (\\(C_p \\geq 1.0\\)): \\(6\\sigma \\leq 0.30 \\implies \\sigma \\leq 0.05\\).</p>
<p>For \\(C_p \\geq 1.33\\): \\(6\\sigma \\leq 0.30/1.33 = 0.2256 \\implies \\sigma \\leq 0.0376\\).</p>

<p>Applying this to the three machines with standard deviations \\(\\sigma_1\\), \\(\\sigma_2\\), \\(\\sigma_3\\) (as provided in the paper):</p>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Machine</th><th>\\(\\sigma\\)</th><th>\\(C_p = 0.30/(6\\sigma)\\)</th><th>Capable (\\(C_p \\geq 1.0\\))?</th><th>Adequately Capable (\\(C_p \\geq 1.33\\))?</th></tr>
<tr><td>1</td><td>Given</td><td>Compute</td><td>Yes if \\(\\sigma \\leq 0.05\\)</td><td>Yes if \\(\\sigma \\leq 0.0376\\)</td></tr>
<tr><td>2</td><td>Given</td><td>Compute</td><td>Yes if \\(\\sigma \\leq 0.05\\)</td><td>Yes if \\(\\sigma \\leq 0.0376\\)</td></tr>
<tr><td>3</td><td>Given</td><td>Compute</td><td>Yes if \\(\\sigma \\leq 0.05\\)</td><td>Yes if \\(\\sigma \\leq 0.0376\\)</td></tr>
</table>

<h4>Part (ii): Control Chart for Defective Bulbs (np-Chart or p-Chart)</h4>
<p>For defective bulb data, use an <strong>np-chart</strong> (if constant sample size) or <strong>p-chart</strong> (if variable). Given constant sample size \\(n\\) (as in the original paper):</p>
<p>\\[\\bar{p} = \\frac{\\text{Total defectives}}{k \\times n}\\]</p>
<p>\\[\\text{UCL}_{np} = n\\bar{p} + 3\\sqrt{n\\bar{p}(1-\\bar{p})},\\quad \\text{LCL}_{np} = \\max(0,\\ n\\bar{p} - 3\\sqrt{n\\bar{p}(1-\\bar{p})})\\]</p>
<p>Plot the number of defective bulbs in each sample against the control limits. Any sample outside the limits suggests an assignable cause (defective batch of bulbs, machine malfunction, operator error) requiring investigation.</p>`,

'8.3': `<h3>Chance vs. Assignable Causes; Sampling Plans; MA and EWMA Charts</h3>

<h4>Part (i): Chance Causes vs. Assignable Causes</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Feature</th><th>Chance (Common) Causes</th><th>Assignable (Special) Causes</th></tr>
<tr><td>Nature</td><td>Random, inherent in the process</td><td>Non-random, from identifiable sources</td></tr>
<tr><td>Examples</td><td>Machine vibration, raw material variation, operator skill variation</td><td>Tool wear, defective material batch, operator training change</td></tr>
<tr><td>Detectability</td><td>Not detectable by control charts individually</td><td>Detected by control chart signals</td></tr>
<tr><td>Action</td><td>Reduce only by redesigning the process (system action)</td><td>Investigate and eliminate (local action)</td></tr>
<tr><td>Output when only these present</td><td>Process in statistical control</td><td>Process out of statistical control</td></tr>
<tr><td>Shewhart term</td><td>"Common causes"</td><td>"Assignable causes"</td></tr>
</table>

<h4>Part (ii): Single and Double Sampling Plans</h4>

<h5>Single Sampling Plan (SSP) \\((N, n, c)\\)</h5>
<p>1. Sample \\(n\\) items from lot of size \\(N\\); inspect; count defectives \\(d\\).</p>
<p>2. Accept if \\(d \\leq c\\); reject if \\(d > c\\).</p>
<p><strong>OC function</strong>: \\(P_a(p) = \\sum_{d=0}^c \\binom{n}{d}p^d(1-p)^{n-d}\\)</p>

<h5>Double Sampling Plan (DSP) \\((n_1, c_1, r_1; n_2, c_2)\\)</h5>
<p>1. Sample \\(n_1\\); count \\(d_1\\). Accept if \\(d_1 \\leq c_1\\). Reject if \\(d_1 \\geq r_1\\). Take second sample if \\(c_1 < d_1 < r_1\\).</p>
<p>2. Sample \\(n_2\\); count \\(d_2\\). Accept if \\(d_1+d_2 \\leq c_2\\); reject otherwise.</p>
<p><strong>OC function</strong>: \\(P_a(p) = P_{a1}(p) + P_{a2}(p)\\) where \\(P_{a1} = P(d_1 \\leq c_1)\\) and \\(P_{a2} = \\sum_{d_1=c_1+1}^{c_2} P(d_1) \\cdot P(d_2 \\leq c_2-d_1)\\).</p>

<h4>Part (iii): MA and EWMA Charts</h4>

<h5>Moving Average (MA) Chart</h5>
<p>\\(M_i = (1/w)\\sum_{j=i-w+1}^i x_j\\) (equal weights over window \\(w\\)).</p>
<p>Limits: \\(\\mu_0 \\pm 3\\sigma/\\sqrt{w}\\) (steady state). Best for detecting ramp/trend shifts.</p>

<h5>EWMA Chart</h5>
<p>\\(Z_i = \\lambda x_i + (1-\\lambda)Z_{i-1}\\) (exponentially decreasing weights).</p>
<p>Limits: \\(\\mu_0 \\pm L\\sigma\\sqrt{\\lambda/(2-\\lambda)}\\) (steady state, \\(L \\approx 3\\)).</p>
<p>Best for detecting small sustained step shifts. Theoretically optimal (related to SPRT).</p>

<h5>Comparison</h5>
<ul>
<li>MA: finite window, equal weights — simpler concept but ignores information beyond window.</li>
<li>EWMA: infinite memory with geometric decay — more statistically efficient, more widely used in practice.</li>
<li>Both superior to Shewhart for detecting small (0.5\\(\\sigma\\) to 1.5\\(\\sigma\\)) sustained shifts.</li>
</ul>`,

'8.4': `<h3>X-bar and R/S Control Charts: Known and Unknown Process Sigma</h3>

<h4>Setting</h4>
<p>10 samples, each of size \\(n = 4\\). The actual sample observations were given in the original examination paper. The full methodology is presented below for both cases.</p>

<h4>Part (i): Control Charts When Process \\(\\sigma = 0.2\\) is Given (Standards Known)</h4>
<p>When \\(\\sigma_0 = 0.2\\) is given (standards known), use:</p>
<p>\\[\\text{UCL}_{\\bar{X}} = \\bar{\\bar{X}} + \\frac{3\\sigma_0}{\\sqrt{n}} = \\bar{\\bar{X}} + \\frac{3 \\times 0.2}{\\sqrt{4}} = \\bar{\\bar{X}} + \\frac{0.6}{2} = \\bar{\\bar{X}} + 0.3\\]</p>
<p>\\[\\text{LCL}_{\\bar{X}} = \\bar{\\bar{X}} - 0.3\\]</p>
<p>For the R-chart with known \\(\\sigma_0\\) and \\(n = 4\\) (control chart constants: \\(d_2 = 2.059\\), \\(D_1 = 0\\), \\(D_2 = 4.698\\)):</p>
<p>\\[\\text{UCL}_R = D_2 \\sigma_0 = 4.698 \\times 0.2 = 0.9396\\]</p>
<p>\\[\\text{LCL}_R = D_1 \\sigma_0 = 0\\]</p>
<p>Equivalently, \\(E(R) = d_2 \\sigma_0 = 2.059 \\times 0.2 = 0.4118\\) (expected average range).</p>

<h4>Part (ii): Control Charts Using Sample Ranges to Estimate \\(\\sigma\\)</h4>
<p>When \\(\\sigma\\) is unknown, estimate from the 10 samples:</p>
<p>\\[\\bar{\\bar{X}} = \\frac{1}{10}\\sum_{i=1}^{10}\\bar{X}_i,\\quad \\bar{R} = \\frac{1}{10}\\sum_{i=1}^{10} R_i\\]</p>
<p>Estimate: \\(\\hat{\\sigma} = \\bar{R}/d_2 = \\bar{R}/2.059\\)</p>
<p>Control chart constants for \\(n = 4\\): \\(A_2 = 0.729\\), \\(D_3 = 0\\), \\(D_4 = 2.282\\).</p>
<p><strong>\\(\\bar{X}\\)-chart:</strong></p>
<p>\\[\\text{UCL} = \\bar{\\bar{X}} + 0.729\\bar{R},\\quad \\text{LCL} = \\bar{\\bar{X}} - 0.729\\bar{R}\\]</p>
<p><strong>\\(R\\)-chart:</strong></p>
<p>\\[\\text{UCL} = 2.282\\bar{R},\\quad \\text{CL} = \\bar{R},\\quad \\text{LCL} = 0\\]</p>
<p>After computing these trial limits, plot all 10 sample means and ranges. Remove any out-of-control points (with identified assignable causes), recalculate, and repeat until all remaining points are within limits.</p>`

};

fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
console.log('Done: 2018 written.');
console.log('JSON size (MB):', (fs.statSync(FILE).size / 1e6).toFixed(2));

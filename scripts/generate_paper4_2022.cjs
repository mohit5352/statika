'use strict';
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../src/data/explanations.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

if (!data.paper4) data.paper4 = {};
if (!data.paper4.demography) data.paper4.demography = {};
if (!data.paper4.sqc) data.paper4.sqc = {};

// ─── 2022 DEMOGRAPHY ──────────────────────────────────────────────────────────

data.paper4.demography['2022'] = {

'3.1': `<h3>TFR, GRR and NRR: Definitions and Relationship to Population Growth</h3>

<h4>1. Total Fertility Rate (TFR)</h4>
<p>The <strong>Total Fertility Rate</strong> is the average number of children a woman would bear over her reproductive lifetime if she were to experience the current age-specific fertility rates throughout her childbearing years (conventionally ages 15–49).</p>
<p>Mathematically:</p>
<p>\\[\\text{TFR} = \\sum_{x=15}^{49} f_x = n \\sum_{x} f(x, x+n)\\]</p>
<p>where \\(f_x\\) is the Age-Specific Fertility Rate (ASFR) for age group \\([x, x+n)\\) and \\(n = 5\\) for quinquennial groups.</p>
<ul>
<li>TFR includes births of <em>both</em> sexes.</li>
<li>It is a <strong>period</strong> measure — a synthetic cohort indicator.</li>
<li>Replacement-level TFR ≈ 2.1 (in low-mortality populations).</li>
</ul>

<h4>2. Gross Reproduction Rate (GRR)</h4>
<p>The <strong>Gross Reproduction Rate</strong> is the average number of <em>daughters</em> a woman would bear over her lifetime under current age-specific fertility rates, <em>ignoring mortality</em>.</p>
<p>\\[\\text{GRR} = \\text{TFR} \\times \\frac{p_f}{1} = \\sum_{x} f_x^F\\]</p>
<p>where \\(f_x^F\\) is the age-specific fertility rate for <em>female</em> births and \\(p_f\\) is the proportion of births that are female (≈ 0.4878 or 100/205).</p>
<ul>
<li>GRR = TFR × (proportion female at birth)</li>
<li>GRR &gt; 1 implies potential for population growth if mortality is zero.</li>
<li>GRR ignores the mortality of mothers during their reproductive span.</li>
</ul>

<h4>3. Net Reproduction Rate (NRR)</h4>
<p>The <strong>Net Reproduction Rate</strong> corrects the GRR for the mortality of females during their childbearing years. It is the average number of daughters a newborn girl would bear over her lifetime under current age-specific fertility <em>and</em> mortality schedules.</p>
<p>\\[\\text{NRR} = \\sum_{x} f_x^F \\cdot _nL_x^F / l_0\\]</p>
<p>where \\(_nL_x^F\\) is the female stationary population (person-years lived) in the age interval \\([x, x+n)\\) from the female life table with radix \\(l_0\\).</p>
<p>Equivalently: \\[\\text{NRR} = \\text{GRR} \\times \\bar{p}_f\\]</p>
<p>where \\(\\bar{p}_f\\) is the proportion of women surviving to the mean age of childbearing.</p>

<h4>Key Differences</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Feature</th><th>TFR</th><th>GRR</th><th>NRR</th></tr>
<tr><td>Sex of children counted</td><td>Both</td><td>Daughters only</td><td>Daughters only</td></tr>
<tr><td>Mortality considered</td><td>No</td><td>No</td><td>Yes</td></tr>
<tr><td>Replacement level</td><td>~2.1</td><td>~1.02</td><td>1.0</td></tr>
</table>

<h4>NRR and Population Growth</h4>
<p>The NRR is the most precise single-number indicator of generational replacement:</p>
<ul>
<li><strong>NRR = 1</strong>: Each generation exactly replaces itself → population tends toward stationarity (zero growth in long run).</li>
<li><strong>NRR &gt; 1</strong>: Each generation more than replaces itself → population grows over generations.</li>
<li><strong>NRR &lt; 1</strong>: Each generation fails to replace itself → population will eventually decline.</li>
</ul>
<p>The intrinsic rate of natural increase \\(r\\) is related to NRR by Lotka's equation:</p>
<p>\\[\\int_0^\\infty e^{-rx} p(x) m(x)\\, dx = 1\\]</p>
<p>As an approximation: \\[r \\approx \\frac{\\ln(\\text{NRR})}{T_c}\\]</p>
<p>where \\(T_c\\) is the mean length of a generation (typically 27–30 years).</p>
<p><strong>Note:</strong> NRR uses current rates and does not predict actual future population growth; it indicates the long-run tendency if current rates were to persist indefinitely.</p>

<h4>References</h4>
<ul>
<li>Shryock, H.S. &amp; Siegel, J.S. — <em>The Methods and Materials of Demography</em></li>
<li>Pressat, R. — <em>Demographic Analysis</em></li>
<li>Keyfitz, N. &amp; Caswell, H. — <em>Applied Mathematical Demography</em></li>
</ul>`,

'3.2': `<h3>Life Table Error Detection and Correction</h3>

<h4>Given Life Table (Partial)</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>\\(x\\)</th><th>\\(l_x\\)</th><th>\\(d_x\\)</th><th>\\(q_x\\)</th><th>\\(L_x\\)</th><th>\\(T_x\\)</th><th>\\(e_x^0\\)</th></tr>
<tr><td>20</td><td>95772</td><td>857</td><td>0.008953</td><td>476495</td><td>4922814</td><td>51.533</td></tr>
<tr><td>25</td><td>94265</td><td>699</td><td>0.007368</td><td>472566</td><td>4456319</td><td>47.975</td></tr>
<tr><td>30</td><td>94166</td><td>800</td><td>0.008496</td><td>468895</td><td>3983754</td><td>42.306</td></tr>
</table>

<h4>Consistency Checks</h4>
<p>The fundamental relationships used to detect errors are:</p>
<ol>
<li>\\(d_x = l_x \\cdot q_x\\)</li>
<li>\\(L_x = T_x - T_{x+5}\\) (for 5-year abridged table)</li>
<li>\\(e_x^0 = T_x / l_x\\)</li>
</ol>

<h4>Row x = 20: Checking</h4>
<p><strong>Check 1</strong> (\\(d_x = l_x \\cdot q_x\\)):</p>
<p>\\[d_{20} = 95772 \\times 0.008953 = 857.86 \\approx \\mathbf{858}\\]</p>
<p>Given \\(d_{20} = 857\\). <strong>Error 1: \\(d_{20} = 857\\) should be \\(858\\).</strong></p>

<p><strong>Check 2</strong> (\\(L_x = T_x - T_{x+5}\\)):</p>
<p>\\[L_{20} = T_{20} - T_{25}\\]</p>
<p>If \\(L_{20} = 476495\\) (given), then \\(T_{20}\\) should be:</p>
<p>\\[T_{20} = T_{25} + L_{20} = 4{,}456{,}319 + 476{,}495 = 4{,}932{,}814\\]</p>
<p>Given \\(T_{20} = 4{,}922{,}814\\). <strong>Error 2: \\(T_{20} = 4{,}922{,}814\\) should be \\(4{,}932{,}814\\)</strong> (digit 2 → 3 in the hundred-thousands position).</p>

<h4>Row x = 25: Checking</h4>
<p><strong>Check 3</strong> (\\(d_x = l_x \\cdot q_x\\)):</p>
<p>\\[d_{25} = 94265 \\times 0.007368 = 694.68 \\approx \\mathbf{695}\\]</p>
<p>Given \\(d_{25} = 699\\). <strong>Error 3: \\(d_{25} = 699\\) should be \\(695\\).</strong></p>

<p><strong>Check 4</strong> (\\(e_x^0 = T_x / l_x\\)):</p>
<p>\\[e_{25}^0 = \\frac{4{,}456{,}319}{94{,}265} = 47.275\\]</p>
<p>Given \\(e_{25}^0 = 47.975\\). <strong>Error 4: \\(e_{25}^0 = 47.975\\) should be \\(47.275\\)</strong> (digit 9 → 2 in the tenths position).</p>

<p>Verification of \\(L_{25}\\): \\(T_{25} - T_{30} = 4{,}456{,}319 - 3{,}983{,}754 = 472{,}565 \\approx 472{,}566\\) ✓</p>

<h4>Row x = 30: Checking</h4>
<p>\\(d_{30} = 94166 \\times 0.008496 = 800.0 \\approx 800\\) ✓</p>
<p>\\(e_{30}^0 = 3{,}983{,}754 / 94{,}166 = 42.306\\) ✓</p>
<p>No errors in row 30.</p>

<h4>Summary of Errors Found</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Error</th><th>Column</th><th>Row (x)</th><th>Given Value</th><th>Correct Value</th><th>Digit Changed</th></tr>
<tr><td>1</td><td>\\(d_x\\)</td><td>20</td><td>857</td><td>858</td><td>7 → 8 (units)</td></tr>
<tr><td>2</td><td>\\(T_x\\)</td><td>20</td><td>4,922,814</td><td>4,932,814</td><td>2 → 3 (hundred-thousands)</td></tr>
<tr><td>3</td><td>\\(d_x\\)</td><td>25</td><td>699</td><td>695</td><td>9 → 5 (units)</td></tr>
<tr><td>4</td><td>\\(e_x^0\\)</td><td>25</td><td>47.975</td><td>47.275</td><td>9 → 2 (tenths)</td></tr>
</table>`,

'3.3': `<h3>Vital Statistics: Meaning, Types, Uses and Shortcomings</h3>

<h4>Meaning of Vital Statistics</h4>
<p><strong>Vital statistics</strong> is the systematic collection, compilation, analysis, and publication of statistical data pertaining to vital events in human life — births, deaths, marriages, divorces, and foetal deaths — as they occur in a defined population and time period. These statistics form the foundation of demographic analysis.</p>
<p>The term was coined by Sir William Petty in the 17th century. In India, the Registration of Births and Deaths Act, 1969 provides the legal framework for civil registration.</p>

<h4>Sources of Vital Statistics in India</h4>
<ul>
<li><strong>Civil Registration System (CRS)</strong> — mandatory recording at local registrar offices.</li>
<li><strong>Sample Registration System (SRS)</strong> — dual-record system of the Registrar General of India (RGI) providing reliable national and state-level estimates of fertility and mortality.</li>
<li><strong>Census of India</strong> — decennial enumeration providing intercensal demographic data.</li>
<li><strong>National Family Health Survey (NFHS/DHS)</strong> — sample survey covering fertility, mortality, and health.</li>
</ul>

<h4>Important Vital Statistics and Their Uses</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Statistic</th><th>Formula</th><th>Uses</th></tr>
<tr><td>Crude Birth Rate (CBR)</td><td>\\(\\frac{B}{P} \\times 1000\\)</td><td>Measures overall fertility level; used for population projections and policy planning.</td></tr>
<tr><td>Crude Death Rate (CDR)</td><td>\\(\\frac{D}{P} \\times 1000\\)</td><td>Measures overall mortality; used in life expectancy assessment.</td></tr>
<tr><td>Infant Mortality Rate (IMR)</td><td>\\(\\frac{D_{&lt;1}}{B} \\times 1000\\)</td><td>Sensitive indicator of public health, nutrition, and socioeconomic development.</td></tr>
<tr><td>Maternal Mortality Rate (MMR)</td><td>\\(\\frac{\\text{Maternal deaths}}{\\text{Live births}} \\times 1{,}00{,}000\\)</td><td>Measures quality of maternal care; tracked by SDG 3.1.</td></tr>
<tr><td>Total Fertility Rate (TFR)</td><td>\\(\\sum_x f_x\\)</td><td>Best single measure of fertility; determines replacement level.</td></tr>
<tr><td>Life Expectancy at Birth (\\(e_0^0\\))</td><td>\\(T_0 / l_0\\)</td><td>Summary measure of mortality; widely used for international comparisons (HDI).</td></tr>
</table>

<h4>Usefulness of Vital Statistics</h4>
<ul>
<li>Serve as the foundation for <strong>population projections</strong> and resource planning.</li>
<li>Enable monitoring of <strong>public health trends</strong> — epidemics, chronic disease burden.</li>
<li>Provide legal proof of birth, marriage, and death for civil and administrative purposes.</li>
<li>Essential for computation of <strong>demographic rates</strong> (CBR, CDR, IMR, MMR).</li>
<li>Used for international <strong>comparison and SDG monitoring</strong>.</li>
</ul>

<h4>Shortcomings of Vital Statistics</h4>
<ul>
<li><strong>Under-registration</strong>: In many developing countries, especially rural areas, births and deaths are significantly under-reported. India's CRS coverage is improving but still incomplete.</li>
<li><strong>Delayed registration</strong>: Events may be registered months or years after occurrence, affecting timeliness.</li>
<li><strong>Age misreporting</strong>: Errors in recorded ages (age heaping, digit preference) distort ASDR and IMR calculations.</li>
<li><strong>Cause-of-death misclassification</strong>: Inaccurate medical certification leads to errors in cause-specific mortality analysis.</li>
<li><strong>Incompleteness of coverage</strong>: Remote and tribal areas may be excluded from the registration system.</li>
<li><strong>Definitional inconsistencies</strong>: Variations in definition of live births versus foetal deaths across countries hinder international comparisons.</li>
</ul>`,

'3.4': `<h3>Types of Infant Mortality Rate: True IMR, Neo-natal IMR and Modified IMR</h3>

<h4>Background</h4>
<p>Infant Mortality Rate (IMR) measures the number of deaths of infants under one year of age per 1,000 live births in a given year. Three variants exist, each with distinct formulas and utilities.</p>

<h4>(i) True Infant Mortality Rate</h4>
<p>The <strong>True IMR</strong> (also called the <em>cohort</em> or <em>generation</em> IMR) relates deaths under age 1 to the exact cohort of births from which those deaths arise.</p>
<p>\\[\\text{True IMR} = \\frac{D_{0,y} + D_{0,y+1}}{B_y} \\times 1000\\]</p>
<p>where \\(D_{0,y}\\) = deaths in year \\(y\\) to infants born in year \\(y\\), \\(D_{0,y+1}\\) = deaths in year \\(y+1\\) to infants born in year \\(y\\), and \\(B_y\\) = live births in year \\(y\\).</p>
<p><strong>Interpretation</strong>: Measures the actual probability of an infant born in year \\(y\\) dying before reaching age 1. It follows the true birth cohort.</p>
<p><strong>Advantage</strong>: Theoretically most accurate — follows the exact cohort.</p>
<p><strong>Disadvantage</strong>: Requires data spanning two calendar years; practically difficult to compute.</p>

<h4>(ii) Neo-natal Infant Mortality Rate (NNMR)</h4>
<p>The <strong>Neo-natal IMR</strong> measures mortality in the first 28 days (4 weeks) of life per 1,000 live births.</p>
<p>\\[\\text{NNMR} = \\frac{\\text{Deaths of infants aged 0--28 days}}{\\text{Live births}} \\times 1000\\]</p>
<p>Further subdivisions:</p>
<ul>
<li><strong>Early neo-natal</strong>: deaths in first 7 days of life.</li>
<li><strong>Late neo-natal</strong>: deaths between day 7 and day 28.</li>
</ul>
<p><strong>Interpretation</strong>: Reflects <em>endogenous</em> causes (congenital malformations, birth asphyxia, prematurity, low birth weight) — conditions related to the quality of obstetric and immediate neonatal care.</p>
<p><strong>Utility</strong>: Sensitive to improvements in antenatal care, delivery services, and neonatal intensive care facilities.</p>

<h4>(iii) Modified Infant Mortality Rate</h4>
<p>The <strong>Modified IMR</strong> (also called the <em>Barclay modification</em> or <em>conventional IMR</em>) is the most widely used operational measure:</p>
<p>\\[\\text{Modified IMR} = \\frac{\\text{Deaths under age 1 in year } y}{\\text{Live births in year } y} \\times 1000\\]</p>
<p>This mixes deaths of infants born in year \\(y\\) and year \\(y-1\\) in the numerator, but uses only births of year \\(y\\) in the denominator — making it a <em>period</em> rather than a cohort measure.</p>

<h4>Comparison of the Three Measures</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Feature</th><th>True IMR</th><th>Neo-natal IMR</th><th>Modified IMR</th></tr>
<tr><td>Age of death</td><td>0 to 1 year (cohort)</td><td>0 to 28 days</td><td>0 to 1 year (period)</td></tr>
<tr><td>Cause focus</td><td>All infant causes</td><td>Endogenous causes</td><td>All infant causes</td></tr>
<tr><td>Data requirement</td><td>Two-year cross-year data</td><td>Precise age at death</td><td>Annual deaths + births</td></tr>
<tr><td>Accuracy</td><td>Most accurate</td><td>High for early deaths</td><td>Approximate but widely used</td></tr>
<tr><td>Practical use</td><td>Research</td><td>Neonatal care evaluation</td><td>National/international reporting</td></tr>
</table>
<p>The <strong>Modified IMR</strong> is used by WHO, UNICEF, and the Registrar General of India (SRS) for routine reporting because of its computational simplicity.</p>
<p>The <strong>post-neonatal mortality rate</strong> (PNMR = IMR − NNMR) covers deaths from 28 days to 1 year, reflecting <em>exogenous</em> causes such as infections, malnutrition, and environmental factors.</p>`,

'3.5': `<h3>Model Life Tables: Rationale and United Nations Model Life Tables</h3>

<h4>Reason for Constructing Model Life Tables</h4>
<p>Reliable life tables require accurate, complete data on deaths by age and population by age — data rarely available in developing countries due to incomplete civil registration and census coverage. Model life tables address this problem by:</p>
<ul>
<li>Providing <strong>complete mortality schedules</strong> for countries with fragmentary data.</li>
<li>Enabling mortality estimation from a <strong>single known parameter</strong> (e.g., infant mortality rate or life expectancy at birth).</li>
<li>Allowing <strong>internal consistency checks</strong> on observed age-specific mortality data.</li>
<li>Facilitating <strong>population projections</strong> where current mortality is uncertain.</li>
<li>Serving as standards for <strong>indirect estimation techniques</strong> (Brass logit method, Trussell's child mortality estimation).</li>
</ul>

<h4>Major Systems of Model Life Tables</h4>

<h5>1. Coale–Demeny Regional Model Life Tables (1966, revised 1983)</h5>
<p>Based on 326 life tables from countries with reliable data. Organized into <strong>four regional families</strong>, each representing a distinct pattern of age-at-death:</p>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Family</th><th>Geographic Origin</th><th>Characteristic Pattern</th></tr>
<tr><td><strong>West</strong></td><td>Western Europe, USA</td><td>General standard; no distinctive age pattern anomaly. Most widely used.</td></tr>
<tr><td><strong>North</strong></td><td>Scandinavia, Iceland</td><td>Relatively high mortality at young adult ages (15–45), low infant mortality.</td></tr>
<tr><td><strong>South</strong></td><td>Southern Europe</td><td>High infant/childhood mortality relative to adult mortality.</td></tr>
<tr><td><strong>East</strong></td><td>Eastern Europe</td><td>High mortality at ages 0–1 and 50+.</td></tr>
</table>
<p>Each family has <strong>25 levels</strong> of mortality (Level 1 = highest mortality, Level 25 = lowest) indexed by \\(e_0^0\\) for females ranging from about 20 to 80 years.</p>

<h5>2. United Nations Model Life Tables</h5>
<p>The UN published its model life tables in 1956 (a single family) and then revised the system extensively in the <em>Manual X: Indirect Techniques for Demographic Estimation</em> (1983). The UN system comprises <strong>five families</strong> based on distinctive regional mortality patterns:</p>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>UN Family</th><th>Region of Origin</th><th>Mortality Pattern</th></tr>
<tr><td><strong>Latin American</strong></td><td>Latin America</td><td>High early-childhood mortality, moderate adult mortality.</td></tr>
<tr><td><strong>Chilean</strong></td><td>Chile</td><td>Relatively low infant mortality but high child (1–4) mortality.</td></tr>
<tr><td><strong>South Asian</strong></td><td>South Asia (India, Bangladesh)</td><td>High infant and child mortality, lower adult mortality.</td></tr>
<tr><td><strong>Far Eastern</strong></td><td>Japan, East Asia</td><td>Very low infant mortality, high adult mortality at older ages.</td></tr>
<tr><td><strong>General</strong></td><td>Global average</td><td>Average pattern for countries not fitting other families.</td></tr>
</table>
<p>Each family is parameterised by a single index — usually \\(e_0^0\\) — and provides age-specific \\(q_x\\) values at 5-year intervals from birth to 85+.</p>

<h5>3. Ledermann's System (1969)</h5>
<p>A regression-based system expressing \\(\\log(q_x)\\) as a linear function of one or two parameters (e.g., \\(q_5\\) or \\(e_0^0\\)) using principal components of world life-table data.</p>

<h5>4. Brass Logit System (1971)</h5>
<p>Uses the logit transformation of the survival function:</p>
<p>\\[Y(x) = \\frac{1}{2} \\ln\\left(\\frac{1-l(x)}{l(x)}\\right) = \\alpha + \\beta Y_s(x)\\]</p>
<p>where \\(Y_s(x)\\) is the standard life table logit and \\(\\alpha, \\beta\\) are parameters fitted from known data points.</p>

<h4>Application</h4>
<p>Model life tables are used by the UN Population Division, World Bank, WHO, and national statistical agencies for demographic estimation in data-deficient settings, particularly in sub-Saharan Africa and South Asia.</p>`,

'4.1': `<h3>Logistic Curve: Description, Properties and Pearl–Reed Fitting Method</h3>

<h4>The Logistic Function</h4>
<p>The logistic curve (Verhulst–Pearl–Reed) is expressed as:</p>
<p>\\[P(t) = \\frac{K}{1 + e^{a + bt}}\\]</p>
<p>where \\(P(t)\\) is the population at time \\(t\\), \\(K\\) is the upper asymptote (carrying capacity), \\(a\\) is a constant determining the position of the inflection point, and \\(b < 0\\) is the rate of growth (negative for growth).</p>
<p>An equivalent form: \\(P(t) = \\frac{K}{1 + c \\cdot e^{-rt}}\\) where \\(r > 0\\).</p>

<h4>Differential Equation Form</h4>
<p>The logistic satisfies the first-order ODE:</p>
<p>\\[\\frac{dP}{dt} = r P \\left(1 - \\frac{P}{K}\\right)\\]</p>
<p>This combines unrestricted exponential growth \\((rP)\\) with a density-dependent inhibition term \\((-rP^2/K)\\).</p>

<h4>Properties of the Logistic Curve</h4>
<ol>
<li><strong>Bounded growth</strong>: \\(P(t) \\to K\\) as \\(t \\to \\infty\\); \\(P(t) \\to 0\\) as \\(t \\to -\\infty\\).</li>
<li><strong>S-shape</strong>: Population starts slow, accelerates, then decelerates toward \\(K\\).</li>
<li><strong>Inflection point</strong>: Maximum growth rate occurs at \\(P = K/2\\), time \\(t_i = -a/b\\).</li>
<li><strong>Point symmetry</strong>: The curve is symmetric about the inflection point.</li>
<li><strong>Monotone increasing</strong>: \\(dP/dt > 0\\) for all \\(t\\) (given \\(0 < P < K\\)).</li>
<li><strong>Rate declines with density</strong>: The per-capita growth rate \\((1/P)(dP/dt) = r(1-P/K)\\) is a linearly decreasing function of \\(P\\).</li>
</ol>

<h4>Pearl and Reed Method of Fitting</h4>
<p>Pearl and Reed (1920) proposed fitting the logistic using three census data points \\((t_1, P_1)\\), \\((t_2, P_2)\\), \\((t_3, P_3)\\) equally spaced in time (interval \\(= h\\)).</p>
<p>Let \\(u_i = 1/P_i\\). Then define:</p>
<p>\\[A = 2u_1 u_2 u_3 - u_2^2(u_1 + u_3)\\quad\\text{(denominator)}\\]</p>
<p>The parameters are solved as:</p>
<p>\\[K = \\frac{2(u_1 u_3 - u_2^2)}{u_1 + u_3 - 2u_2}\\]</p>
<p>Once \\(K\\) is found:</p>
<p>\\[c_1 = \\frac{K}{P_1} - 1,\\quad c_3 = \\frac{K}{P_3} - 1\\]</p>
<p>The growth parameter: \\(b = -\\frac{1}{2h}\\ln\\left(\\frac{c_3}{c_1}\\right)\\)</p>
<p>The position parameter: \\(a = \\ln(c_1) - b \\cdot t_1\\cdot (-1)\\) (adjusted for origin \\(t_1\\)).</p>

<h5>Step-by-Step Procedure</h5>
<ol>
<li>Select three equidistant census years \\(t_1, t_2, t_3\\) (e.g., 1901, 1931, 1961 with \\(h = 30\\)).</li>
<li>Compute \\(u_i = 1/P_i\\).</li>
<li>Calculate \\(K\\) using the formula above.</li>
<li>Calculate \\(a = \\ln(K/P_1 - 1) + b t_1\\) (noting time origin convention).</li>
<li>Compute \\(b\\) from \\(b = \\frac{1}{2h}\\ln(c_1/c_3)\\).</li>
<li>Verify: plug \\(t_2\\) back into the formula and compare with \\(P_2\\).</li>
<li>Project: set \\(t\\) to the future year and compute \\(P(t)\\).</li>
</ol>

<h4>Limitations</h4>
<ul>
<li>Assumes a single carrying capacity \\(K\\), which may change over time.</li>
<li>Highly sensitive to the three chosen data points.</li>
<li>Long-run projections may be unreliable if fertility/mortality transitions alter the growth pattern.</li>
</ul>`,

'4.2': `<h3>Life Table: Definition, Uses, Columns and Abridged Life Table Computation</h3>

<h4>Definition and Uses</h4>
<p>A <strong>life table</strong> (mortality table) is a statistical device that shows, for a hypothetical cohort of births (usually \\(l_0 = 100{,}000\\)), how many survive to each successive age under current (period) age-specific mortality rates.</p>
<p><strong>Uses:</strong></p>
<ul>
<li>Computing life expectancy (\\(e_x^0\\)) — the primary summary measure of mortality for HDI and WHO comparisons.</li>
<li>Actuarial science: computing premiums, annuities, and pension fund liabilities.</li>
<li>Constructing stable and stationary population models.</li>
<li>Estimating NRR when combined with fertility data.</li>
<li>Policy: planning health services, social security systems, and population projections.</li>
</ul>

<h4>Columns of a Life Table and Their Relationships</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Column</th><th>Symbol</th><th>Definition</th><th>Formula</th></tr>
<tr><td>Age</td><td>\\(x\\)</td><td>Exact age (in years)</td><td>—</td></tr>
<tr><td>Probability of dying</td><td>\\(_nq_x\\)</td><td>Probability that a person aged \\(x\\) exactly dies before age \\(x+n\\)</td><td>\\(_nd_x / l_x\\)</td></tr>
<tr><td>Number alive</td><td>\\(l_x\\)</td><td>Number surviving to exact age \\(x\\)</td><td>\\(l_{x+n} = l_x - {_nd_x}\\)</td></tr>
<tr><td>Deaths in interval</td><td>\\(_nd_x\\)</td><td>Deaths between age \\(x\\) and \\(x+n\\)</td><td>\\(l_x \\cdot {_nq_x}\\)</td></tr>
<tr><td>Person-years lived</td><td>\\(_nL_x\\)</td><td>Total person-years lived by the cohort between ages \\(x\\) and \\(x+n\\)</td><td>\\((n/2)(l_x + l_{x+n})\\) for intermediate ages</td></tr>
<tr><td>Total future lifetime</td><td>\\(T_x\\)</td><td>Total person-years lived above age \\(x\\)</td><td>\\(T_x = \\sum_{j \\geq x} {_nL_j} = T_{x+n} + {_nL_x}\\)</td></tr>
<tr><td>Life expectancy</td><td>\\(e_x^0\\)</td><td>Average future lifetime of a person surviving to age \\(x\\)</td><td>\\(T_x / l_x\\)</td></tr>
<tr><td>Central death rate</td><td>\\(_nm_x\\)</td><td>Deaths per person-year lived in the interval</td><td>\\(_nd_x / {_nL_x}\\)</td></tr>
</table>

<h4>Completing the Abridged Life Table</h4>
<p>Given data:</p>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>\\(x\\)</th><th>\\(_5q_x\\)</th><th>\\(l_x\\)</th><th>\\(T_x\\) (given)</th></tr>
<tr><td>20</td><td>0.006338</td><td>94,864</td><td>5,024,927</td></tr>
<tr><td>25</td><td>0.006650</td><td>—</td><td>—</td></tr>
<tr><td>30</td><td>0.008087</td><td>—</td><td>—</td></tr>
<tr><td>35</td><td>—</td><td>92,879</td><td>—</td></tr>
</table>

<p><strong>Step 1: Compute \\(_5d_x = l_x \\cdot {_5q_x}\\)</strong></p>
<p>\\[_5d_{20} = 94{,}864 \\times 0.006338 = 601\\]</p>
<p>\\[l_{25} = 94{,}864 - 601 = 94{,}263\\]</p>
<p>\\[_5d_{25} = 94{,}263 \\times 0.006650 = 627\\]</p>
<p>\\[l_{30} = 94{,}263 - 627 = 93{,}636\\]</p>
<p>\\[_5d_{30} = l_{30} - l_{35} = 93{,}636 - 92{,}879 = 757\\]</p>
<p>Check: \\(_5q_{30} = 757/93{,}636 = 0.008085 \\approx 0.008087\\) ✓</p>

<p><strong>Step 2: Compute \\(_5L_x = 2.5(l_x + l_{x+5})\\)</strong></p>
<p>\\[_5L_{20} = 2.5(94{,}864 + 94{,}263) = 2.5 \\times 189{,}127 = 472{,}818\\]</p>
<p>\\[_5L_{25} = 2.5(94{,}263 + 93{,}636) = 2.5 \\times 187{,}899 = 469{,}748\\]</p>
<p>\\[_5L_{30} = 2.5(93{,}636 + 92{,}879) = 2.5 \\times 186{,}515 = 466{,}288\\]</p>

<p><strong>Step 3: Compute \\(T_x\\)</strong></p>
<p>\\[T_{25} = T_{20} - {_5L_{20}} = 5{,}024{,}927 - 472{,}818 = 4{,}552{,}109\\]</p>
<p>\\[T_{30} = T_{25} - {_5L_{25}} = 4{,}552{,}109 - 469{,}748 = 4{,}082{,}361\\]</p>
<p>\\[T_{35} = T_{30} - {_5L_{30}} = 4{,}082{,}361 - 466{,}288 = 3{,}616{,}073\\]</p>

<p><strong>Step 4: Compute \\(e_x^0 = T_x/l_x\\)</strong></p>
<p>\\[e_{20}^0 = 5{,}024{,}927/94{,}864 = 52.97\\]</p>
<p>\\[e_{25}^0 = 4{,}552{,}109/94{,}263 = 48.29\\]</p>
<p>\\[e_{30}^0 = 4{,}082{,}361/93{,}636 = 43.60\\]</p>
<p>\\[e_{35}^0 = 3{,}616{,}073/92{,}879 = 38.93\\]</p>

<h4>Completed Abridged Life Table</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>\\(x\\)</th><th>\\(_5q_x\\)</th><th>\\(l_x\\)</th><th>\\(_5d_x\\)</th><th>\\(_5L_x\\)</th><th>\\(T_x\\)</th><th>\\(e_x^0\\)</th></tr>
<tr><td>20</td><td>0.006338</td><td>94,864</td><td>601</td><td>472,818</td><td>5,024,927</td><td>52.97</td></tr>
<tr><td>25</td><td>0.006650</td><td>94,263</td><td>627</td><td>469,748</td><td>4,552,109</td><td>48.29</td></tr>
<tr><td>30</td><td>0.008087</td><td>93,636</td><td>757</td><td>466,288</td><td>4,082,361</td><td>43.60</td></tr>
<tr><td>35</td><td>—</td><td>92,879</td><td>—</td><td>—</td><td>3,616,073</td><td>38.93</td></tr>
</table>`,

'4.3': `<h3>Standardization of Death Rates: Direct and Indirect Methods with Numerical Computation</h3>

<h4>Why Standardization is Necessary</h4>
<p>The <strong>Crude Death Rate (CDR)</strong> depends not only on the mortality experience at each age but also on the <em>age composition</em> of the population. An older population will have a higher CDR even if its age-specific death rates are similar to or lower than those of a younger population. Standardization removes the confounding effect of age distribution, enabling fair comparisons across populations or time.</p>

<h4>Direct Method of Standardization</h4>
<p>Apply the observed age-specific death rates (ASDR) of the study population to a chosen <strong>standard population</strong> to compute expected deaths, then divide by the standard population total.</p>
<p>\\[\\text{SDR}_{\\text{direct}} = \\frac{\\sum_x (\\text{ASDR}_x \\times P_x^s)}{\\sum_x P_x^s} \\times 1000\\]</p>
<p>where \\(P_x^s\\) is the standard population in age group \\(x\\).</p>

<h4>Indirect Method of Standardization</h4>
<p>Used when age-specific data are unavailable or unreliable. Apply the <em>standard</em> ASDRs to the <em>study</em> population to get expected deaths, then:</p>
<p>\\[\\text{SMR} = \\frac{\\text{Observed deaths}}{\\text{Expected deaths}};\\quad \\text{SDR}_{\\text{indirect}} = \\text{SMR} \\times \\text{Standard CDR}\\]</p>

<h4>Numerical Computation for 2022 Data</h4>
<p>Given:</p>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Age group</th><th>Population (\\(P_x\\))</th><th>Deaths (\\(D_x\\))</th><th>Standard population (\\(P_x^s\\))</th></tr>
<tr><td>0–5</td><td>2,000</td><td>100</td><td>10,000</td></tr>
<tr><td>5–10</td><td>1,600</td><td>48</td><td>8,000</td></tr>
<tr><td>10–25</td><td>2,400</td><td>24</td><td>15,000</td></tr>
<tr><td>25–45</td><td>6,000</td><td>30</td><td>25,000</td></tr>
<tr><td>45 and above</td><td>8,000</td><td>104</td><td>40,000</td></tr>
<tr><td><strong>Total</strong></td><td><strong>20,000</strong></td><td><strong>306</strong></td><td><strong>98,000</strong></td></tr>
</table>

<p><strong>(i) Crude Death Rate (CDR):</strong></p>
<p>\\[\\text{CDR} = \\frac{306}{20{,}000} \\times 1000 = \\mathbf{15.30}\\text{ per 1000}\\]</p>

<p><strong>(ii) Standardized Death Rate (SDR) — Direct Method:</strong></p>
<p>Step 1: Compute ASDR for each age group:</p>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Age group</th><th>ASDR = \\(D_x/P_x \\times 1000\\)</th><th>\\(P_x^s\\)</th><th>Expected deaths = ASDR \\(\\times P_x^s / 1000\\)</th></tr>
<tr><td>0–5</td><td>100/2000 × 1000 = 50.00</td><td>10,000</td><td>500.0</td></tr>
<tr><td>5–10</td><td>48/1600 × 1000 = 30.00</td><td>8,000</td><td>240.0</td></tr>
<tr><td>10–25</td><td>24/2400 × 1000 = 10.00</td><td>15,000</td><td>150.0</td></tr>
<tr><td>25–45</td><td>30/6000 × 1000 = 5.00</td><td>25,000</td><td>125.0</td></tr>
<tr><td>45+</td><td>104/8000 × 1000 = 13.00</td><td>40,000</td><td>520.0</td></tr>
<tr><td><strong>Total</strong></td><td>—</td><td><strong>98,000</strong></td><td><strong>1,535.0</strong></td></tr>
</table>

<p>Step 2: Compute SDR:</p>
<p>\\[\\text{SDR} = \\frac{1{,}535}{98{,}000} \\times 1000 = \\mathbf{15.66}\\text{ per 1000}\\]</p>

<h4>Interpretation</h4>
<p>The CDR (15.30) and SDR (15.66) are close here, but the SDR adjusts for the age structure of the study population relative to the standard. When comparing two populations, the one with the lower SDR has genuinely lower age-adjusted mortality.</p>`,

'4.4': `<h3>Stable Population Theory and Fertility Rate Definitions</h3>

<h4>Part (i): Stable Population Theory</h4>

<h5>Definition</h5>
<p>A <strong>stable population</strong> is one that has been subject to <em>constant</em> (time-invariant) age-specific fertility and mortality rates for a sufficiently long time that its age distribution has converged to a fixed (time-invariant) shape, even though the total population size may be growing or declining.</p>
<p>The concept was formally developed by Alfred J. Lotka (1907, 1939) using integral equation methods and the Euler–Lotka characteristic equation:</p>
<p>\\[\\int_0^\\infty e^{-rx} p(x) m(x)\\, dx = 1\\]</p>
<p>where \\(r\\) is the intrinsic rate of natural increase, \\(p(x) = l_x/l_0\\) is the survival function, and \\(m(x)\\) is the age-specific maternity function.</p>

<h5>Properties of a Stable Population</h5>
<ul>
<li>The <strong>age structure</strong> \\(c(a) = b \\cdot e^{-ra} \\cdot p(a)\\) (where \\(b\\) is the intrinsic birth rate) is fixed over time.</li>
<li>The <strong>intrinsic birth rate</strong> \\(b\\) and <strong>intrinsic death rate</strong> \\(d\\) are constant; \\(r = b - d\\).</li>
<li>The population grows (or declines) at the constant rate \\(r\\).</li>
<li>NRR = \\(\\int_0^\\infty e^{-r T_c} \\approx e^{rT_c}\\), so \\(r \\approx \\ln(\\text{NRR})/T_c\\).</li>
</ul>

<h5>Stable vs. Stationary Population</h5>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Feature</th><th>Stable Population</th><th>Stationary Population</th></tr>
<tr><td>Growth rate \\(r\\)</td><td>Any constant \\(r\\) (positive, zero, or negative)</td><td>\\(r = 0\\) only</td></tr>
<tr><td>Total population size</td><td>Growing or declining at rate \\(r\\)</td><td>Constant over time</td></tr>
<tr><td>Age distribution</td><td>Fixed proportionate shape</td><td>Fixed proportionate shape (same as life table \\(_nL_x\\))</td></tr>
<tr><td>Births = Deaths</td><td>Not necessarily</td><td>Yes</td></tr>
<tr><td>NRR</td><td>Any value</td><td>NRR = 1 exactly</td></tr>
<tr><td>Relationship to life table</td><td>Different from \\(_nL_x/T_0\\)</td><td>Age distribution = \\(_nL_x/T_0\\)</td></tr>
</table>
<p>A stationary population is a <strong>special case</strong> of a stable population with \\(r = 0\\) and NRR = 1. In a stationary population, the number of births equals the number of deaths in every period, and the age distribution is precisely given by the life table's \\(_nL_x\\) column divided by \\(T_0\\).</p>

<h4>Part (ii): Fertility Rate Definitions</h4>

<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Measure</th><th>Symbol</th><th>Formula</th><th>Utility</th></tr>
<tr><td>Crude Birth Rate</td><td>CBR</td><td>\\(\\frac{B}{P} \\times 1000\\)</td><td>Simple overall fertility indicator; affected by age structure.</td></tr>
<tr><td>Age-Specific Fertility Rate</td><td>ASFR / \\(f_x\\)</td><td>\\(\\frac{B_x}{W_x} \\times 1000\\)</td><td>Births per 1000 women in age group \\([x, x+5)\\); free of age-structure bias.</td></tr>
<tr><td>General Fertility Rate</td><td>GFR</td><td>\\(\\frac{B}{W_{15-49}} \\times 1000\\)</td><td>Births per 1000 women of reproductive age; better than CBR.</td></tr>
<tr><td>Total Fertility Rate</td><td>TFR</td><td>\\(5 \\sum_{x=15}^{45} f_x\\)</td><td>Average children per woman over reproductive lifetime (assuming no mortality); standard for international fertility comparison.</td></tr>
</table>

<h5>Utility of TFR</h5>
<ul>
<li>TFR is age-structure-free and thus the most widely used synthetic measure of fertility for comparing countries or time periods.</li>
<li>A TFR ≈ 2.1 represents replacement-level fertility in low-mortality populations.</li>
<li>India's TFR fell to 2.0 (NFHS-5, 2019–21), indicating fertility transition below replacement.</li>
<li>TFR directly feeds into NRR: \\(\\text{GRR} \\approx \\text{TFR}/2.05\\), \\(\\text{NRR} \\approx \\text{GRR} \\times \\overline{p}_f\\).</li>
</ul>`

};

// ─── 2022 SQC ─────────────────────────────────────────────────────────────────

data.paper4.sqc['2022'] = {

'7.1': `<h3>Need for Quality Control and Advantages of Statistical Quality Control (SQC)</h3>

<h4>Part (i): Need for Quality Control</h4>
<p><strong>Quality Control (QC)</strong> is the set of activities designed to ensure that a product or service meets defined quality standards consistently and economically. The need for QC arises from:</p>
<ol>
<li><strong>Natural variability in manufacturing</strong>: No two items produced by any process are identical. Random and assignable causes of variation must be distinguished and controlled.</li>
<li><strong>Economic pressure</strong>: Defective products lead to rework, scrap, warranty claims, and customer dissatisfaction, all of which increase costs.</li>
<li><strong>Customer and regulatory requirements</strong>: ISO 9001 and industry-specific standards mandate demonstrable process control.</li>
<li><strong>Detection vs. Prevention</strong>: 100% inspection is costly and impractical; QC enables statistical monitoring with much smaller sample sizes.</li>
<li><strong>Process improvement</strong>: Systematic QC data reveals trends, enabling proactive improvement rather than reactive correction.</li>
<li><strong>Competitive advantage</strong>: Consistent quality builds brand reputation and reduces after-sale costs.</li>
</ol>

<h4>Part (ii): Advantages of Statistical Quality Control (SQC)</h4>
<p>SQC applies probability theory and statistical methods to quality management. Its principal advantages are:</p>
<ol>
<li><strong>Economy of inspection</strong>: Samples (typically \\(n = 4\\) to \\(25\\)) rather than 100% inspection detect process shifts, saving inspection cost and time.</li>
<li><strong>Early detection of process shifts</strong>: Control charts detect assignable causes as soon as they arise, before large batches of defectives are produced.</li>
<li><strong>Provides objective evidence</strong>: Statistical signals (points outside control limits, runs, trends) are objective, not subject to inspector fatigue or bias.</li>
<li><strong>Quantifies process capability</strong>: Indices such as \\(C_p\\) and \\(C_{pk}\\) objectively measure whether a process can meet specifications.</li>
<li><strong>Facilitates diagnosis</strong>: Patterns on control charts (stratification, cycles, hugging of control limits) help identify root causes of variation.</li>
<li><strong>Documentation for continuous improvement</strong>: Baseline data from SQC enable Six Sigma and Lean improvement projects (DMAIC).</li>
<li><strong>Applicable to attributes and variables</strong>: SQC methods cover both measurable characteristics (\\(\\bar{X}\\), \\(R\\), \\(S\\) charts) and pass/fail data (\\(p\\), \\(np\\), \\(c\\), \\(u\\) charts).</li>
<li><strong>Reduces tolerance stack-up in assemblies</strong>: Statistical tolerancing is more realistic and less costly than worst-case tolerancing.</li>
</ol>`,

'7.2': `<h3>Derivation of Control Limits for the \\(\\bar{X}\\)-Chart</h3>

<h4>Background: Shewhart's Control Chart Principle</h4>
<p>W.A. Shewhart (1931) proposed that a process is "in statistical control" when only random (chance) causes of variation are present. Control limits are set at \\(\\pm 3\\sigma\\) from the process mean, corresponding to a false-alarm probability of approximately 0.27% (for normally distributed data).</p>

<h4>Setup and Notation</h4>
<p>Let the quality characteristic \\(X\\) be normally distributed with mean \\(\\mu\\) and standard deviation \\(\\sigma\\). Samples of size \\(n\\) are drawn; let \\(\\bar{X}_i = \\frac{1}{n}\\sum_{j=1}^n X_{ij}\\) be the sample mean of the \\(i\\)-th sample.</p>
<p>By properties of the normal distribution:</p>
<p>\\[\\bar{X} \\sim N\\!\\left(\\mu,\\ \\frac{\\sigma^2}{n}\\right) \\implies \\sigma_{\\bar{X}} = \\frac{\\sigma}{\\sqrt{n}}\\]</p>

<h4>Case I: Standards Given (\\(\\mu_0\\) and \\(\\sigma_0\\) known)</h4>
<p>\\[\\text{UCL}_{\\bar{X}} = \\mu_0 + 3\\frac{\\sigma_0}{\\sqrt{n}}\\]</p>
<p>\\[\\text{CL}_{\\bar{X}} = \\mu_0\\]</p>
<p>\\[\\text{LCL}_{\\bar{X}} = \\mu_0 - 3\\frac{\\sigma_0}{\\sqrt{n}}\\]</p>
<p>Setting \\(A = 3/\\sqrt{n}\\):</p>
<p>\\[\\text{UCL} = \\mu_0 + A\\sigma_0,\\quad \\text{LCL} = \\mu_0 - A\\sigma_0\\]</p>

<h4>Case II: Standards Not Given (estimated from \\(k\\) preliminary samples)</h4>
<p>With \\(k\\) samples each of size \\(n\\):</p>
<p>\\[\\hat{\\mu} = \\bar{\\bar{X}} = \\frac{1}{k}\\sum_{i=1}^k \\bar{X}_i\\]</p>
<p>Estimate \\(\\sigma\\) from the average sample range \\(\\bar{R} = \\frac{1}{k}\\sum_{i=1}^k R_i\\):</p>
<p>\\[\\hat{\\sigma} = \\frac{\\bar{R}}{d_2}\\]</p>
<p>where \\(d_2\\) is a control chart constant depending on \\(n\\) (e.g., \\(d_2 = 2.326\\) for \\(n=5\\)).</p>
<p>Then:</p>
<p>\\[\\text{UCL}_{\\bar{X}} = \\bar{\\bar{X}} + 3\\frac{\\bar{R}}{d_2\\sqrt{n}} = \\bar{\\bar{X}} + A_2 \\bar{R}\\]</p>
<p>\\[\\text{CL}_{\\bar{X}} = \\bar{\\bar{X}}\\]</p>
<p>\\[\\text{LCL}_{\\bar{X}} = \\bar{\\bar{X}} - A_2 \\bar{R}\\]</p>
<p>where \\(A_2 = 3/(d_2\\sqrt{n})\\) is a tabulated constant. Typical values:</p>
<table border="1" style="border-collapse:collapse;">
<tr><th>\\(n\\)</th><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>10</td></tr>
<tr><th>\\(A_2\\)</th><td>1.880</td><td>1.023</td><td>0.729</td><td>0.577</td><td>0.483</td><td>0.308</td></tr>
</table>
<p>Alternatively, using the sample standard deviation \\(s\\):</p>
<p>\\[\\text{UCL} = \\bar{\\bar{X}} + A_3 \\bar{s},\\quad \\text{LCL} = \\bar{\\bar{X}} - A_3 \\bar{s}\\]</p>
<p>where \\(A_3 = 3/(c_4\\sqrt{n})\\) and \\(c_4\\) is the bias-correction factor for sample standard deviation.</p>

<h4>Statistical Basis</h4>
<p>If the process is in control, \\(P(\\text{LCL} \\leq \\bar{X} \\leq \\text{UCL}) = P(-3 \\leq Z \\leq 3) = 0.9973\\), so the probability of a false alarm per sample is \\(1 - 0.9973 = 0.0027\\) (= 2.7 per thousand), giving an ARL in control \\(= 1/0.0027 \\approx 370\\) samples.</p>`,

'7.3': `<h3>Control Limits for Number of Defectives (np-Chart)</h3>

<h4>Model Setup</h4>
<p>In attribute control using the <strong>np-chart</strong>, each item is classified as defective (D) or non-defective (ND). Let \\(n\\) = sample (subgroup) size, \\(p\\) = true fraction defective, and \\(np_i\\) = number of defectives in the \\(i\\)-th sample.</p>
<p>Under the hypothesis that the process is in statistical control with fraction defective \\(p\\):</p>
<p>\\[np \\sim \\text{Binomial}(n, p)\\]</p>
<p>Mean: \\(E(np) = np\\); Variance: \\(\\text{Var}(np) = np(1-p)\\); SD: \\(\\sqrt{np(1-p)}\\).</p>

<h4>Case (i): Standards Given (\\(p = p_0\\) known)</h4>
<p>\\[\\text{UCL}_{np} = np_0 + 3\\sqrt{np_0(1-p_0)}\\]</p>
<p>\\[\\text{CL}_{np} = np_0\\]</p>
<p>\\[\\text{LCL}_{np} = np_0 - 3\\sqrt{np_0(1-p_0)}\\quad (\\text{set to } 0 \\text{ if negative})\\]</p>

<h4>Case (ii): Standards Not Given (\\(p\\) estimated from data)</h4>
<p>From \\(k\\) preliminary samples each of size \\(n\\):</p>
<p>\\[\\bar{p} = \\frac{\\sum_{i=1}^k np_i}{kn} = \\frac{\\text{Total defectives}}{\\text{Total inspected}}\\]</p>
<p>\\[\\text{UCL}_{np} = n\\bar{p} + 3\\sqrt{n\\bar{p}(1-\\bar{p})}\\]</p>
<p>\\[\\text{CL}_{np} = n\\bar{p}\\]</p>
<p>\\[\\text{LCL}_{np} = n\\bar{p} - 3\\sqrt{n\\bar{p}(1-\\bar{p})}\\quad (\\geq 0)\\]</p>

<h4>Relationship to p-Chart</h4>
<p>The np-chart is equivalent to the <strong>p-chart</strong> (fraction defective chart) when sample size \\(n\\) is constant — dividing all limits by \\(n\\) gives the p-chart limits.</p>
<p>The p-chart is preferred when \\(n\\) varies from sample to sample (it gives limits in units of fraction defective, independent of \\(n\\)).</p>

<h4>Assumptions and Conditions</h4>
<ul>
<li>Items are independently classified as D or ND.</li>
<li>The binomial approximation is adequate when \\(n \\geq 50\\) and \\(np \\geq 5\\) (otherwise use exact binomial limits or a \\(c\\)-chart if counts are Poisson).</li>
<li>Constant sample size \\(n\\) is required for the np-chart; if \\(n\\) varies, use the p-chart with variable control limits.</li>
</ul>`,

'7.4': `<h3>Process Capability: Definition and Measures</h3>

<h4>Definition</h4>
<p><strong>Process capability</strong> is the inherent ability of a stable, in-control process to meet engineering or customer specifications consistently. It is quantified by comparing the natural spread of the process (6\\(\\sigma\\)) with the engineering tolerance (specification width = USL − LSL).</p>
<p>Process capability analysis is meaningful <em>only</em> when the process is in statistical control (no assignable causes).</p>

<h4>Capability Indices</h4>

<h5>1. \\(C_p\\) — Potential Capability Index</h5>
<p>\\[C_p = \\frac{\\text{USL} - \\text{LSL}}{6\\hat{\\sigma}}\\]</p>
<p>where \\(\\hat{\\sigma} = \\bar{R}/d_2\\) or \\(\\bar{s}/c_4\\).</p>
<p><strong>Interpretation:</strong></p>
<ul>
<li>\\(C_p \\geq 1.33\\): Capable process (standard requirement for new processes).</li>
<li>\\(C_p = 1.0\\): Marginally capable; \\(\\approx 0.27\\%\\) defects if centred.</li>
<li>\\(C_p < 1\\): Incapable; specification wider than process spread is impossible.</li>
</ul>
<p><strong>Limitation:</strong> \\(C_p\\) ignores process centering — a process with \\(C_p = 2.0\\) but mean off-target may still produce defects.</p>

<h5>2. \\(C_{pk}\\) — Process Capability Index (Centering-Adjusted)</h5>
<p>\\[C_{pk} = \\min\\left(C_{pu},\\ C_{pl}\\right)\\]</p>
<p>where:</p>
<p>\\[C_{pu} = \\frac{\\text{USL} - \\hat{\\mu}}{3\\hat{\\sigma}},\\quad C_{pl} = \\frac{\\hat{\\mu} - \\text{LSL}}{3\\hat{\\sigma}}\\]</p>
<p><strong>Interpretation:</strong> \\(C_{pk}\\) measures actual performance, accounting for process off-centering. \\(C_{pk} \\geq 1.33\\) indicates a capable and centered process. Always \\(C_{pk} \\leq C_p\\); equality holds when the process is perfectly centred on the specification midpoint.</p>

<h5>3. \\(C_{pm}\\) — Taguchi Capability Index</h5>
<p>\\[C_{pm} = \\frac{\\text{USL} - \\text{LSL}}{6\\sqrt{\\sigma^2 + (\\mu - T)^2}}\\]</p>
<p>where \\(T = (\\text{USL} + \\text{LSL})/2\\) is the target value. \\(C_{pm}\\) penalises deviation from the target even when \\(\\mu\\) is within specification limits, consistent with the Taguchi loss function.</p>

<h5>4. \\(C_{pmk}\\) — Combined Index</h5>
<p>\\[C_{pmk} = \\frac{\\min(\\text{USL}-\\mu,\\ \\mu-\\text{LSL})}{3\\sqrt{\\sigma^2+(\\mu-T)^2}}\\]</p>
<p>Incorporates both centering (like \\(C_{pk}\\)) and target deviation (like \\(C_{pm}\\)).</p>

<h4>Summary Table</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Index</th><th>Centring</th><th>Target</th><th>Best for</th></tr>
<tr><td>\\(C_p\\)</td><td>No</td><td>No</td><td>Potential capability (hypothetical, if centred)</td></tr>
<tr><td>\\(C_{pk}\\)</td><td>Yes</td><td>No</td><td>Actual capability with off-centring</td></tr>
<tr><td>\\(C_{pm}\\)</td><td>No</td><td>Yes</td><td>Taguchi loss-based capability</td></tr>
<tr><td>\\(C_{pmk}\\)</td><td>Yes</td><td>Yes</td><td>Most comprehensive single index</td></tr>
</table>`,

'7.5': `<h3>CUSUM Control Chart: Concept, Advantages and Disadvantages</h3>

<h4>What is a CUSUM Chart?</h4>
<p>The <strong>Cumulative Sum (CUSUM)</strong> control chart, introduced by E.S. Page (1954), monitors the cumulative sum of deviations of sample statistics from a target value. Unlike the Shewhart \\(\\bar{X}\\)-chart (which uses only the current observation), CUSUM retains information from all previous samples, making it particularly sensitive to <em>small and sustained</em> shifts in the process mean.</p>

<h4>CUSUM Statistic</h4>
<p>Let \\(x_i\\) be the \\(i\\)-th sample mean (or individual observation) and \\(\\mu_0\\) be the target value. Define:</p>
<p>\\[C_i^+ = \\max\\left[0,\\ C_{i-1}^+ + (x_i - \\mu_0 - k)\\right]\\]</p>
<p>\\[C_i^- = \\max\\left[0,\\ C_{i-1}^- - (x_i - \\mu_0 + k)\\right]\\]</p>
<p>where \\(k = \\delta\\sigma/(2)\\) is the allowance (reference value, typically \\(k = 0.5\\sigma\\) for detecting a 1\\(\\sigma\\) shift). A signal is given when \\(C_i^+ > h\\) or \\(C_i^- > h\\) (decision interval, typically \\(h = 4\\sigma\\) to \\(5\\sigma\\)).</p>
<p>Common standardised parameters: \\(k^* = 0.5\\), \\(h^* = 4\\) or \\(5\\) (in units of \\(\\sigma\\)).</p>

<h4>V-Mask Form</h4>
<p>The classical CUSUM plots \\(S_m = \\sum_{i=1}^m (x_i - \\mu_0)\\). A V-shaped mask is placed on the current point; a signal occurs when the graph passes outside the arms of the V. The tabular form (above) is computationally equivalent and more practical.</p>

<h4>Advantages of CUSUM Charts</h4>
<ol>
<li><strong>Sensitive to small shifts</strong>: Detects shifts of 0.5\\(\\sigma\\) to 2\\(\\sigma\\) much faster than Shewhart charts (lower out-of-control ARL).</li>
<li><strong>Optimal (SPRT-based)</strong>: For normally distributed data, the CUSUM procedure is the most powerful sequential test for detecting a specified shift (Moustakides, 1986).</li>
<li><strong>Memory</strong>: Accumulates evidence of drift over successive samples, ideal for autocorrelated or slowly drifting processes.</li>
<li><strong>Interpretable magnitude</strong>: The level of \\(C^+\\) or \\(C^-\\) at the time of signal is informative about the magnitude and onset of the shift.</li>
</ol>

<h4>Disadvantages of CUSUM Charts</h4>
<ol>
<li><strong>More complex to compute and interpret</strong>: Requires setting parameters \\(k\\) and \\(h\\) (or the V-mask angle and lead distance), which are less intuitive than Shewhart \\(3\\sigma\\) limits.</li>
<li><strong>Less effective for large sudden shifts</strong>: For large shifts (\\(> 2\\sigma\\)), the Shewhart chart detects them faster; CUSUM is only superior for small shifts.</li>
<li><strong>Restart after signal</strong>: After a signal, \\(C^+\\) and \\(C^-\\) must be reset to zero, which requires a defined protocol.</li>
<li><strong>Parameter selection is critical</strong>: Poor choice of \\(k\\) and \\(h\\) leads to either too many false alarms or slow detection.</li>
<li><strong>Not easily visualised for non-statisticians</strong>: Operators on a shop floor find the Shewhart chart more intuitive.</li>
</ol>

<h4>Comparison with EWMA</h4>
<p>The EWMA chart (see Q8.2) is an alternative with similar sensitivity to small shifts. The CUSUM is theoretically optimal for a specific shift size, while the EWMA is more robust across a range of shift sizes. Both are superior to Shewhart for small shifts.</p>`,

'8.1': `<h3>Interpreting Shewhart Control Charts and Fraction Defective (p) Chart</h3>

<h4>Part (i): Interpreting Shewhart Control Charts</h4>
<p>A Shewhart control chart is interpreted by identifying signals that indicate the process is <em>out of statistical control</em> (i.e., an assignable cause is likely present). Signals are based on:</p>

<h5>Primary (3-sigma) Rule</h5>
<ul>
<li>A <strong>point outside the control limits</strong> (above UCL or below LCL) is the main signal of an out-of-control condition. Probability of false alarm ≈ 0.0027.</li>
</ul>

<h5>Supplementary Run Rules (Western Electric / Nelson Rules)</h5>
<p>These detect non-random patterns within the control limits, suggesting process drift or shifts:</p>
<ol>
<li><strong>Run of 8</strong>: Eight consecutive points on the same side of the centre line.</li>
<li><strong>Run of 6</strong>: Six consecutive points all increasing or all decreasing (trend).</li>
<li><strong>2-of-3 rule</strong>: Two of three consecutive points beyond the \\(2\\sigma\\) warning limits (Zone A).</li>
<li><strong>4-of-5 rule</strong>: Four of five consecutive points beyond the \\(1\\sigma\\) limits (Zone B).</li>
<li><strong>Hugging</strong>: Fifteen consecutive points within \\(\\pm 1\\sigma\\) of the centre line (may indicate stratification).</li>
<li><strong>Cycles</strong>: Systematic cyclical patterns suggesting periodic assignable causes.</li>
</ol>
<p>When a signal is detected: (a) stop the process if appropriate; (b) search for the assignable cause; (c) eliminate the cause; (d) remove the corresponding sample from analysis and recalculate control limits.</p>

<h4>Part (ii): p-Chart (Fraction Defective) — When and How</h4>
<p>The <strong>p-chart</strong> monitors the proportion of defective items in samples drawn from a process. It is used when:</p>
<ul>
<li>Quality is measured as <em>pass/fail</em> (attribute data rather than a measured variable).</li>
<li>Sample sizes are large enough that the normal approximation to the binomial is adequate (\\(np \\geq 5\\) and \\(n(1-p) \\geq 5\\)).</li>
<li>Sample size \\(n\\) may vary between subgroups.</li>
</ul>

<h5>(a) Standards Given (\\(p = p_0\\) known)</h5>
<p>The fraction defective of the \\(i\\)-th sample: \\(\\hat{p}_i = x_i/n\\) where \\(x_i\\) = number of defectives.</p>
<p>\\[\\text{UCL}_p = p_0 + 3\\sqrt{\\frac{p_0(1-p_0)}{n}}\\]</p>
<p>\\[\\text{CL}_p = p_0\\]</p>
<p>\\[\\text{LCL}_p = p_0 - 3\\sqrt{\\frac{p_0(1-p_0)}{n}}\\quad (\\geq 0)\\]</p>

<h5>(b) Standards Not Given (\\(p\\) estimated)</h5>
<p>Estimate \\(p\\) from \\(k\\) baseline samples:</p>
<p>\\[\\bar{p} = \\frac{\\sum_{i=1}^k x_i}{\\sum_{i=1}^k n_i}\\]</p>
<p>Control limits for each sample \\(i\\) (using its own \\(n_i\\)):</p>
<p>\\[\\text{UCL}_{p,i} = \\bar{p} + 3\\sqrt{\\frac{\\bar{p}(1-\\bar{p})}{n_i}},\\quad \\text{LCL}_{p,i} = \\bar{p} - 3\\sqrt{\\frac{\\bar{p}(1-\\bar{p})}{n_i}}\\]</p>
<p>If \\(n\\) is constant, a single pair of control limits applies. If \\(n_i\\) varies substantially, use individual limits for each subgroup (stepped control limits).</p>`,

'8.2': `<h3>OC Curve for Control Charts and EWMA Control Chart</h3>

<h4>Part (i): OC Curve for Control Charts</h4>
<p>The <strong>Operating Characteristic (OC) curve</strong> for a control chart plots the probability that a sample does <em>not</em> produce a signal (i.e., falls within the control limits) as a function of the true process parameter (mean \\(\\mu\\) or fraction defective \\(p\\)).</p>

<p>For the \\(\\bar{X}\\)-chart with UCL \\(= \\mu_0 + 3\\sigma_{\\bar{X}}\\) and LCL \\(= \\mu_0 - 3\\sigma_{\\bar{X}}\\), when the true mean shifts to \\(\\mu_1 = \\mu_0 + \\delta\\sigma\\):</p>
<p>\\[\\beta = P(\\text{no signal} | \\mu_1) = P\\left(\\text{LCL} \\leq \\bar{X} \\leq \\text{UCL} \\mid \\mu = \\mu_1\\right)\\]</p>
<p>\\[= \\Phi\\!\\left(3 - \\delta\\sqrt{n}\\right) - \\Phi\\!\\left(-3 - \\delta\\sqrt{n}\\right)\\]</p>
<p>where \\(\\delta = (\\mu_1 - \\mu_0)/\\sigma\\) (shift in standard deviation units) and \\(\\Phi(\\cdot)\\) is the standard normal CDF.</p>

<p><strong>The OC curve shows:</strong></p>
<ul>
<li>At \\(\\delta = 0\\) (in-control): \\(\\beta \\approx 0.9973\\) (probability of <em>not</em> detecting a false signal).</li>
<li>As \\(|\\delta|\\) increases, \\(\\beta\\) decreases (probability of detection \\(= 1 - \\beta\\) increases).</li>
<li>Larger \\(n\\) shifts the OC curve toward the y-axis, giving faster detection of shifts.</li>
</ul>
<p>The <strong>ARL</strong> (Average Run Length) at shift \\(\\delta\\) is \\(\\text{ARL}(\\delta) = 1/(1-\\beta(\\delta))\\).</p>

<h4>Part (ii): EWMA Control Chart</h4>
<p>The <strong>Exponentially Weighted Moving Average (EWMA)</strong> chart, proposed by Roberts (1959), is designed to detect small sustained shifts in the process mean. It applies exponential smoothing to the sequence of observations.</p>

<h5>EWMA Statistic</h5>
<p>\\[Z_i = \\lambda x_i + (1-\\lambda) Z_{i-1}, \\quad 0 < \\lambda \\leq 1\\]</p>
<p>Starting value: \\(Z_0 = \\mu_0\\) (or the overall sample mean \\(\\bar{x}\\) if standards are not given).</p>
<p>Parameter \\(\\lambda\\): weighting factor. Small \\(\\lambda\\) (e.g., 0.05–0.20) gives more weight to historical data, making the chart sensitive to small shifts. \\(\\lambda = 1\\) reduces to the Shewhart individuals chart.</p>

<h5>When to Use EWMA</h5>
<ul>
<li>Process experiences small, sustained shifts (0.5\\(\\sigma\\) to 1.5\\(\\sigma\\)) that Shewhart charts are slow to detect.</li>
<li>Individual measurements (\\(n=1\\)) with no natural subgrouping, e.g., chemical batch processes.</li>
<li>Autocorrelated processes (with appropriate adjustments).</li>
</ul>

<h5>Control Limits for EWMA</h5>
<p>\\[\\text{Var}(Z_i) = \\sigma^2 \\cdot \\frac{\\lambda}{2-\\lambda} \\cdot \\left[1-(1-\\lambda)^{2i}\\right]\\]</p>
<p>As \\(i \\to \\infty\\) (steady-state):</p>
<p>\\[\\sigma_{Z}^2 \\approx \\sigma^2 \\cdot \\frac{\\lambda}{2-\\lambda}\\]</p>
<p>Steady-state control limits:</p>
<p>\\[\\text{UCL} = \\mu_0 + L\\sigma\\sqrt{\\frac{\\lambda}{2-\\lambda}}\\]</p>
<p>\\[\\text{CL} = \\mu_0\\]</p>
<p>\\[\\text{LCL} = \\mu_0 - L\\sigma\\sqrt{\\frac{\\lambda}{2-\\lambda}}\\]</p>
<p>where \\(L \\approx 3\\) (or chosen from Lucas and Saccucci's ARL tables for a specified in-control ARL).</p>
<p>For the transient period (small \\(i\\)), use time-varying limits with the full variance formula (not steady-state).</p>

<h5>Design Recommendation</h5>
<p>Montgomery (2020) recommends \\(\\lambda = 0.05\\) to \\(0.25\\) with \\(L\\) chosen to give ARL \\(\\approx 370\\) in control. For \\(\\lambda = 0.10\\), \\(L = 2.703\\) gives ARL\\(_0\\) = 500; for \\(\\lambda = 0.20\\), \\(L = 2.962\\).</p>`,

'8.3': `<h3>Acceptance Sampling: Situations, Advantages, Disadvantages and Single Sampling Plan</h3>

<h4>Part (i): Situations Where Acceptance Sampling Is Most Useful</h4>
<ol>
<li><strong>Destructive testing</strong>: When inspection destroys the item (tensile strength, battery life, fuse testing), 100% inspection is impossible.</li>
<li><strong>High inspection cost</strong>: When the cost of inspecting each item exceeds the cost of passing occasional defectives.</li>
<li><strong>Continuous-flow production with independent supplier</strong>: When the producer lacks control over the supplier's process and receives finished lots.</li>
<li><strong>Very large lot sizes</strong>: 100% inspection becomes economically and logistically impractical.</li>
<li><strong>Low defect rates with high volume</strong>: Inspector fatigue in 100% inspection causes more misses than statistical sampling.</li>
<li><strong>Incoming raw material or components inspection</strong>: Before production commences, lots from external suppliers are accepted or rejected.</li>
</ol>

<h4>Part (ii): Advantages and Disadvantages</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Advantages</th><th>Disadvantages</th></tr>
<tr><td>Much lower inspection cost and time than 100% inspection</td><td>Accepts the risk of passing lots with some defectives (consumer's risk \\(\\beta\\))</td></tr>
<tr><td>Applicable to destructive tests</td><td>Rejects some acceptable lots (producer's risk \\(\\alpha\\))</td></tr>
<tr><td>Provides supplier with measurable quality standards</td><td>Does not provide information about the cause of defects</td></tr>
<tr><td>Reduces inspector fatigue compared with 100% inspection</td><td>Cannot guarantee zero defects; only provides probabilistic acceptance</td></tr>
<tr><td>Motivates suppliers to improve process quality</td><td>Lot-by-lot decisions; no feedback for process control (unlike SPC)</td></tr>
</table>

<h4>Part (iii): Single Sampling Plan (SSP) — Operating Procedure and Effect of n and c</h4>

<h5>Operating Procedure</h5>
<ol>
<li>From the submitted lot of size \\(N\\), draw a <strong>random sample</strong> of \\(n\\) items.</li>
<li>Inspect all \\(n\\) items and count the number of defectives \\(d\\).</li>
<li><strong>Accept</strong> the lot if \\(d \\leq c\\) (acceptance number).</li>
<li><strong>Reject</strong> (or screen) the lot if \\(d > c\\).</li>
</ol>
<p>A SSP is denoted \\((n, c)\\) or \\((N, n, c)\\).</p>

<h5>OC Curve for SSP</h5>
<p>The probability of accepting a lot with fraction defective \\(p\\) is:</p>
<p>\\[P_a(p) = \\sum_{d=0}^c \\binom{n}{d} p^d (1-p)^{n-d}\\]</p>
<p>(Binomial approximation; exact hypergeometric when \\(N\\) is small.)</p>

<h5>Effect of n on OC Curve</h5>
<p>Increasing \\(n\\) (with \\(c/n\\) fixed) makes the OC curve <em>steeper</em> — sharper discrimination between acceptable and rejectable lots. At the extremes, \\(n \\to N\\) (100% inspection) gives a perfect step function at \\(p = c/n\\).</p>

<h5>Effect of c on OC Curve</h5>
<p>Increasing \\(c\\) (with \\(n\\) fixed) <em>shifts the OC curve to the right</em> — the plan becomes more lenient (accepts lots with higher \\(p\\)). Producer's risk decreases but consumer's risk increases. The plan is more permissive with a higher \\(c\\).</p>

<h5>Key Quality Levels</h5>
<ul>
<li><strong>AQL (Acceptable Quality Level)</strong>: The maximum fraction defective considered acceptable; producer's risk \\(\\alpha = P(\\text{reject} | p = \\text{AQL}) \\leq 0.05\\).</li>
<li><strong>LTPD/RQL (Lot Tolerance Percent Defective)</strong>: The maximum tolerable defective fraction; consumer's risk \\(\\beta = P(\\text{accept} | p = \\text{LTPD}) \\leq 0.10\\).</li>
</ul>`,

'8.4': `<h3>Double Sampling Plan: Procedure, OC Curve, ASN and ATI</h3>

<h4>Operating Procedure of a Double Sampling Plan (DSP)</h4>
<p>A DSP \\((n_1, c_1, r_1; n_2, c_2)\\) where \\(r_1 = c_2 + 1\\) or \\(r_1 \\leq c_2\\) is defined as follows:</p>
<ol>
<li>Draw a random sample of \\(n_1\\) items from the lot and inspect them. Let \\(d_1\\) = number of defectives.</li>
<li><strong>Accept</strong> the lot if \\(d_1 \\leq c_1\\).</li>
<li><strong>Reject</strong> the lot (or begin 100% screening) if \\(d_1 \\geq r_1\\) (where \\(r_1 = c_2 + 1\\) typically).</li>
<li>If \\(c_1 < d_1 < r_1\\): draw a second sample of size \\(n_2\\). Let \\(d_2\\) = defectives in the second sample.</li>
<li><strong>Accept</strong> the lot if \\(d_1 + d_2 \\leq c_2\\).</li>
<li><strong>Reject</strong> the lot if \\(d_1 + d_2 > c_2\\).</li>
</ol>

<h4>OC Curve of a DSP</h4>
<p>The probability of acceptance for true fraction defective \\(p\\):</p>
<p>\\[P_a(p) = P_{a1}(p) + P_{a2}(p)\\]</p>
<p>where:</p>
<p>\\[P_{a1}(p) = P(d_1 \\leq c_1) = \\sum_{d=0}^{c_1} B(d; n_1, p)\\]</p>
<p>(Acceptance on first sample)</p>
<p>\\[P_{a2}(p) = \\sum_{d_1 = c_1+1}^{c_2} B(d_1; n_1, p) \\cdot P(d_2 \\leq c_2 - d_1)\\]</p>
<p>\\[= \\sum_{d_1=c_1+1}^{c_2} B(d_1; n_1, p) \\cdot \\sum_{d_2=0}^{c_2-d_1} B(d_2; n_2, p)\\]</p>
<p>where \\(B(d; n, p) = \\binom{n}{d}p^d(1-p)^{n-d}\\) is the binomial probability.</p>

<h4>Average Sample Number (ASN)</h4>
<p>The ASN is the expected total sample size per lot:</p>
<p>\\[\\text{ASN}(p) = n_1 + n_2 \\cdot P(d_1 > c_1)\\]</p>
<p>More precisely:</p>
<p>\\[\\text{ASN}(p) = n_1 \\cdot 1 + n_2 \\cdot P(c_1 < d_1 < r_1) = n_1 + n_2 \\cdot P_{II}(p)\\]</p>
<p>where \\(P_{II}(p) = P(c_1 < d_1 \\leq c_2) = \\sum_{d_1=c_1+1}^{c_2} B(d_1; n_1, p)\\) is the probability of proceeding to the second sample.</p>
<p><strong>At \\(p = 0\\)</strong>: \\(\\text{ASN} = n_1\\) (always accept on first sample).</p>
<p><strong>At \\(p = 1\\)</strong>: \\(\\text{ASN} = n_1\\) (always reject on first sample).</p>
<p><strong>Maximum ASN</strong> occurs at intermediate \\(p\\) values where \\(P_{II}(p)\\) is largest.</p>

<h4>Average Total Inspection (ATI)</h4>
<p>When rejected lots undergo 100% screening (rectifying inspection), the ATI is:</p>
<p>\\[\\text{ATI}(p) = \\text{ASN}(p) + (1 - P_a(p)) \\cdot (N - \\text{ASN}(p))\\]</p>
<p>\\[= \\text{ASN}(p) \\cdot P_a(p) + N \\cdot (1 - P_a(p))\\]</p>
<p>where \\(N\\) is the lot size.</p>
<p><strong>Interpretation:</strong> At \\(p \\to 0\\): \\(P_a \\to 1\\), \\(\\text{ATI} \\to n_1\\) (very few inspected). At \\(p \\to 1\\): \\(P_a \\to 0\\), \\(\\text{ATI} \\to N\\) (entire lot screened).</p>

<h4>Advantages of DSP over SSP</h4>
<ul>
<li><strong>Lower ASN at AQL</strong>: If the lot quality is good (\\(p \\approx \\text{AQL}\\)), most lots are accepted on the first sample of size \\(n_1 < n_{\\text{SSP}}\\), reducing inspection cost.</li>
<li><strong>Psychological benefit</strong>: Gives the supplier a "second chance" — lots close to the acceptance boundary get a second sample.</li>
<li><strong>Same discrimination</strong>: A properly designed DSP can match an SSP's OC curve with lower ASN.</li>
</ul>`

};

fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
console.log('Done: 2022 written.');
console.log('JSON size (MB):', (fs.statSync(FILE).size / 1e6).toFixed(2));

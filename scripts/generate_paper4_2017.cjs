'use strict';
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../src/data/explanations.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

if (!data.paper4) data.paper4 = {};
if (!data.paper4.demography) data.paper4.demography = {};
if (!data.paper4.sqc) data.paper4.sqc = {};

// ─── 2017 DEMOGRAPHY ──────────────────────────────────────────────────────────

data.paper4.demography['2017'] = {

'3.1': `<h3>Hospital Records and Ad Hoc Surveys as Sources of Vital Statistics</h3>

<h4>Hospital Records</h4>
<p><strong>Hospital records</strong> include registers of births (labour ward registers), deaths (death certificates issued by hospitals), diagnoses (admission and discharge registers), and cause-of-death data compiled through medical certification.</p>

<h5>Uses in Vital Statistics</h5>
<ul>
<li>Provide <strong>cause-specific mortality data</strong>: Hospital death certificates (ICD-10 coded) are the primary source of cause-of-death statistics used in national vital statistics reports.</li>
<li>Supplement civil registration: In countries with incomplete registration, hospital-based data supplement official birth and death counts.</li>
<li>Basis for <strong>hospital-based surveillance</strong>: Tracking disease-specific morbidity and mortality trends (e.g., maternal deaths, cancer deaths, COVID-19 deaths).</li>
<li>Data for <strong>perinatal mortality studies</strong> — stillbirths and early neonatal deaths recorded in maternity wards.</li>
</ul>

<h5>Shortcomings of Hospital Records</h5>
<ul>
<li><strong>Selection bias</strong>: Only covers individuals who attend hospitals. The poor, rural, and geographically remote populations — who have the highest mortality — are underrepresented.</li>
<li><strong>Cause-of-death misclassification</strong>: Inaccurate medical certification; multiple causes coded differently by different physicians; coding inconsistencies across hospitals.</li>
<li><strong>Partial coverage</strong>: Hospitals cover only hospital deaths; many deaths in developing countries occur at home without medical attendance.</li>
<li><strong>Incomplete birth records</strong>: Home births (common in rural South Asia and Africa) do not appear in hospital records.</li>
</ul>

<h4>Ad Hoc Surveys</h4>
<p><strong>Ad hoc (one-time or periodic) demographic surveys</strong> are designed specifically to collect vital statistics information not available from routine sources. Examples include:</p>
<ul>
<li>National Family Health Survey (NFHS) / DHS: Collects fertility (TFR, ASFR), mortality (IMR, U5MR, MMR), contraceptive use, and nutritional data.</li>
<li>Annual Health Survey (AHS): Conducted in high-focus states (UP, Bihar, etc.) to track maternal and child health indicators.</li>
<li>International Population Surveys: IPUMS International, WFS (World Fertility Survey).</li>
</ul>

<h5>Uses in Vital Statistics</h5>
<ul>
<li>Provide estimates when civil registration is incomplete — especially for fertility rates (TFR, GFR), IMR, and MMR.</li>
<li>Allow cross-sectional and longitudinal analysis of demographic change.</li>
<li>Validate and calibrate civil registration and census data.</li>
</ul>

<h5>Shortcomings</h5>
<ul>
<li><strong>Recall error</strong>: Respondents may misremember birth dates, ages at death, and birth histories — especially for events several years prior.</li>
<li><strong>Omission bias</strong>: Infant and child deaths may be underreported (especially if the child was not given a name).</li>
<li><strong>Infrequency</strong>: Ad hoc surveys are conducted every few years, not continuously — between-survey gaps leave vital statistics unmonitored.</li>
<li><strong>Cost</strong>: Large-scale surveys (like NFHS with 600,000 households) are expensive and resource-intensive.</li>
</ul>`,

'3.2': `<h3>Types of Migration: Internal, Rural-Urban, and International</h3>

<h4>What is Migration?</h4>
<p>Migration is the movement of individuals or groups across a spatial boundary — administrative (district, state, national) — for the purpose of changing their usual place of residence. Migration is classified by distance, direction, duration, and motivation.</p>

<h4>Internal Migration</h4>
<p><strong>Internal migration</strong> occurs within the boundaries of a single country. Types include:</p>
<ul>
<li><strong>Inter-state migration</strong>: Movement between different states (e.g., Bihari workers migrating to Maharashtra for construction work).</li>
<li><strong>Intra-state (intra-district) migration</strong>: Movement within the same state.</li>
<li><strong>Rural-to-urban (R-U)</strong>: Most dominant stream in developing countries; driven by economic pull (jobs, education, services).</li>
<li><strong>Urban-to-rural (return migration)</strong>: Less common; often driven by retirement or economic downturn in cities.</li>
</ul>
<p><strong>Measurement</strong>: Census questions on birthplace vs. current residence (lifetime migration), and last previous residence vs. current (recent migration). SRS does not capture migration.</p>
<p><strong>Determinants</strong>: Lee's "push-pull" model — push factors (rural poverty, lack of opportunities) and pull factors (urban employment, higher wages).</p>

<h4>Rural-Urban Migration</h4>
<p><strong>Rural-urban migration</strong> is the flow of people from rural areas to urban centres. It is the primary driver of urbanisation in developing countries.</p>
<p><strong>Features</strong>:</p>
<ul>
<li>Age-selective: young adults (18–35 years) predominate.</li>
<li>Sex-selective: historically male-dominated in South Asia; increasingly female in recent decades.</li>
<li>Education-selective: more educated individuals are more likely to migrate.</li>
</ul>
<p><strong>Consequences</strong>:</p>
<ul>
<li>Urbanisation: India's urban population grew from 17.3% (1951) to 31.2% (2011) partly due to R-U migration.</li>
<li>Remittances: Migrant workers send income home, lifting rural living standards.</li>
<li>Labour market: Provides cheap labour for urban construction, manufacturing, domestic service.</li>
<li>Pressure on urban infrastructure: Housing shortages, slum growth, strain on services.</li>
</ul>
<p><strong>Measurement in India</strong>: Census 2011 — 450 million internal migrants (both inter-state and intra-state), with R-U stream being 30% of all migrants.</p>

<h4>International Migration</h4>
<p><strong>International migration</strong> involves the movement of people across national boundaries.</p>
<p>Types:</p>
<ul>
<li><strong>Economic (labour) migration</strong>: Skilled and unskilled workers moving for employment (e.g., Indian IT professionals to USA, construction workers to Gulf countries).</li>
<li><strong>Refugee and asylum migration</strong>: Forced displacement due to persecution, conflict, or natural disaster.</li>
<li><strong>Family reunification</strong>: Joining family members already abroad.</li>
<li><strong>Student migration</strong>: International education.</li>
</ul>
<p><strong>Measurement</strong>: Passport/visa records, border crossing data, census questions on birthplace and nationality. India is one of the world's largest sources of international emigrants (~17 million diaspora, 2019).</p>
<p><strong>Impact on India</strong>: India receives approximately USD 87 billion in remittances annually (2021), the world's largest recipient. Brain drain of skilled professionals is a concern, offset by brain gain through return migration and foreign investment.</p>`,

'3.3': `<h3>Crude and Specific Death Rates; Purpose of Standardizing Death Rates</h3>

<h4>Crude Death Rate (CDR)</h4>
<p>\\[\\text{CDR} = \\frac{\\text{Total deaths in a year}}{\\text{Mid-year total population}} \\times 1000\\]</p>
<p>The CDR gives the number of deaths per 1000 of the entire population without distinguishing age, sex, or cause. It is simple to compute and useful for broad comparisons.</p>

<h5>Shortcomings</h5>
<ul>
<li>Heavily confounded by the <strong>age structure</strong> of the population: an older population will have a higher CDR even if its age-specific mortality is identical to or lower than a younger population's.</li>
<li>Does not reveal which age groups are driving mortality.</li>
</ul>

<h4>Age-Specific Death Rate (ASDR) — "Specific Death Rate"</h4>
<p>\\[_nM_x = \\frac{D_x}{P_x} \\times 1000\\]</p>
<p>Deaths per 1000 persons in age group \\([x, x+n)\\). Completely free of age-structure confounding within each group.</p>
<p>Other specific death rates: sex-specific, cause-specific (CSDR), occupation-specific.</p>

<h4>Purpose of Standardizing Death Rates</h4>
<p>The standardization of death rates is necessary to enable <strong>valid comparisons</strong> of mortality across:</p>
<ol>
<li><strong>Populations with different age structures</strong>: A city with many elderly residents will have a higher CDR than a young city even if the former has lower age-specific mortality at every age.</li>
<li><strong>Same population at different time points</strong>: As a population ages over decades (like Japan or Italy), its CDR rises even without worsening age-specific rates.</li>
<li><strong>Regions within a country</strong>: Urban vs. rural mortality, states with different demographic profiles.</li>
</ol>
<p>Standardization removes the confounding effect of differing age compositions by anchoring all populations to the <strong>same standard age distribution</strong>. The resulting Standardized Death Rate (SDR) reflects genuine differences in mortality experience, independent of population structure.</p>
<p>Without standardization, comparing CDRs across populations could lead to erroneous conclusions — for example, concluding that Sweden (older population, higher CDR) has worse health outcomes than Uganda (younger population, lower CDR), when in fact Sweden has far lower age-specific mortality at every age.</p>`,

'3.4': `<h3>Finding \\(l_{26}\\) from Life Expectancy Relationship</h3>

<h4>Given</h4>
<ul>
<li>\\(e_{25}^0 = 22.08\\) years (complete expectation of life at age 25)</li>
<li>\\(e_{26}^0 = 21.93\\) years (complete expectation of life at age 26)</li>
<li>\\(l_{25} = 45{,}324\\)</li>
</ul>

<h4>Method</h4>
<p>Using the relationship \\(T_x = l_x \\cdot e_x^0\\) and \\(T_{25} = L_{25} + T_{26}\\).</p>
<p>Under UDD: \\(L_{25} = (l_{25} + l_{26})/2\\).</p>

<p><strong>Setting up the equation:</strong></p>
<p>\\[l_{25} \\cdot e_{25}^0 = \\frac{l_{25} + l_{26}}{2} + l_{26} \\cdot e_{26}^0\\]</p>
<p>\\[45{,}324 \\times 22.08 = \\frac{45{,}324 + l_{26}}{2} + l_{26} \\times 21.93\\]</p>
<p>\\[1{,}000{,}753.92 = 22{,}662 + \\frac{l_{26}}{2} + 21.93 \\cdot l_{26}\\]</p>
<p>\\[1{,}000{,}753.92 - 22{,}662 = l_{26}\\left(0.5 + 21.93\\right)\\]</p>
<p>\\[978{,}091.92 = 22.43 \\cdot l_{26}\\]</p>
<p>\\[l_{26} = \\frac{978{,}091.92}{22.43} = \\mathbf{43{,}608}\\]</p>

<h4>Verification</h4>
<p>\\(d_{25} = l_{25} - l_{26} = 45{,}324 - 43{,}608 = 1{,}716\\)</p>
<p>\\(L_{25} = (45{,}324 + 43{,}608)/2 = 44{,}466\\)</p>
<p>\\(T_{25} = 45{,}324 \\times 22.08 = 1{,}000{,}754\\)</p>
<p>\\(T_{26} = T_{25} - L_{25} = 1{,}000{,}754 - 44{,}466 = 956{,}288\\)</p>
<p>\\(e_{26}^0 = 956{,}288 / 43{,}608 = 21.93\\) ✓</p>`,

'3.5': `<h3>Intercensal and Postcensal Population Estimates</h3>

<h4>Overview</h4>
<p>After each decennial census, demographic need requires population estimates for:</p>
<ul>
<li><strong>Intercensal period</strong>: Between two completed censuses (e.g., 2001–2011 estimates required in 2006).</li>
<li><strong>Postcensal period</strong>: After the most recent census (e.g., 2012–2020 estimates before Census 2021).</li>
</ul>
<p>Two standard mathematical methods are used:</p>

<h4>Method 1: Linear (Arithmetic) Growth</h4>
<p>Assumes the population increases by a <strong>constant absolute amount</strong> per year.</p>
<p>If \\(P_0\\) is the census population at time \\(t_0\\) and \\(P_1\\) at \\(t_1 = t_0 + h\\):</p>
<p>Annual linear increment: \\(r_a = (P_1 - P_0)/h\\)</p>
<p>Population at time \\(t = t_0 + m\\): \\(\\hat{P}(t) = P_0 + r_a \\cdot m\\)</p>

<h5>Intercensal Linear Estimate</h5>
<p>For time \\(t\\) between two censuses at \\(t_0\\) and \\(t_1\\) (\\(0 < m < h\\)):</p>
<p>\\[\\hat{P}(t_0+m) = P_0 + \\frac{P_1-P_0}{h} \\cdot m\\]</p>
<p>This is simple linear interpolation.</p>

<h5>Postcensal Linear Estimate</h5>
<p>If only one census value \\(P_1\\) is available (postcensal), use a growth rate estimated from historical data:</p>
<p>\\[\\hat{P}(t_1+m) = P_1 + r_a \\cdot m\\]</p>
<p>where \\(r_a\\) is estimated from the most recent intercensal period.</p>

<h4>Method 2: Exponential (Geometric) Growth</h4>
<p>Assumes the population grows at a <strong>constant rate</strong> (proportional growth), appropriate for populations with fixed birth and death rates.</p>
<p>\\[P(t) = P_0 e^{rt}\\]</p>
<p>Estimating \\(r\\) from two censuses:</p>
<p>\\[r = \\frac{\\ln(P_1/P_0)}{h}\\]</p>

<h5>Intercensal Exponential Estimate</h5>
<p>\\[\\hat{P}(t_0+m) = P_0 \\cdot e^{rm} = P_0 \\left(\\frac{P_1}{P_0}\\right)^{m/h}\\]</p>

<h5>Postcensal Exponential Estimate</h5>
<p>\\[\\hat{P}(t_1+m) = P_1 \\cdot e^{rm}\\]</p>
<p>where \\(r\\) is the growth rate from the most recent intercensal period.</p>

<h4>Comparison</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Feature</th><th>Linear (Arithmetic)</th><th>Exponential (Geometric)</th></tr>
<tr><td>Growth assumption</td><td>Constant absolute increment</td><td>Constant proportional rate</td></tr>
<tr><td>Model</td><td>\\(P(t) = P_0 + rt\\)</td><td>\\(P(t) = P_0 e^{rt}\\)</td></tr>
<tr><td>Suitable for</td><td>Short-term interpolation, stable populations</td><td>Longer-term projection, growing populations</td></tr>
<tr><td>Accuracy</td><td>Less accurate for rapidly growing populations</td><td>More realistic for most human populations</td></tr>
</table>`,

'4.1': `<h3>Salient Features of Indian Censuses 1991 and 2001</h3>

<h4>Census of India 1991</h4>
<p><strong>Reference night</strong>: 28 Feb/1 March 1991. Commissioner: R.C. Sinha.</p>
<p><strong>Population</strong>: 846.3 million (decadal growth rate: 23.87%).</p>

<p><strong>Key features and highlights</strong>:</p>
<ol>
<li><strong>Jammu & Kashmir excluded</strong>: Due to civil unrest, J&K census was conducted separately in 1991 and the data incorporated later.</li>
<li><strong>House-listing and Housing Census</strong>: For the first time, comprehensive housing data were collected — type of structure, materials, amenities (electricity, drinking water, toilet facilities).</li>
<li><strong>Child sex ratio (0–6 years)</strong>: 945 per 1000 males. Already showing a decline from 962 (1981), raising concerns about female foeticide.</li>
<li><strong>Literacy rate</strong>: 52.21% (males: 64.13%, females: 39.29%) — significant improvement but still reflecting gender disparity.</li>
<li><strong>Workers classification</strong>: Main workers, marginal workers, and non-workers classified for the first time in detail, including household workers.</li>
<li><strong>Urban population</strong>: 25.7% (217.6 million) — urbanisation progressing.</li>
<li><strong>Scheduled Castes and Tribes</strong>: SC: 16.48% of population; ST: 8.08%.</li>
</ol>

<h4>Census of India 2001</h4>
<p><strong>Reference night</strong>: 28 Feb/1 March 2001. Commissioner: J.K. Banthia.</p>
<p><strong>Population</strong>: 1.028 billion — India crossed the one-billion mark. Decadal growth rate: 21.54%.</p>

<p><strong>Key features and highlights</strong>:</p>
<ol>
<li><strong>Mapping and GIS</strong>: First census to extensively use digital mapping and Geographic Information Systems (GIS) for census enumeration areas.</li>
<li><strong>Child sex ratio</strong>: 927 per 1000 males (0–6 years) — alarming decline from 945 (1991), triggering major policy response (PCPNDT Act enforcement).</li>
<li><strong>Literacy rate</strong>: 64.84% (males: 75.26%, females: 53.67%) — significant improvement, especially for females.</li>
<li><strong>Slum census</strong>: First-ever comprehensive slum census conducted as part of the housing census — covering statutory towns with notified slums.</li>
<li><strong>Disabled persons census</strong>: Detailed disability data collected for the first time (visual, hearing, speech, movement, mental disabilities).</li>
<li><strong>Urban agglomerations</strong>: Defined and mapped for the first time systematically — including census towns and outgrowths.</li>
<li><strong>SC/ST populations</strong>: SC: 16.2% of population; ST: 8.2%. List of SCs and STs updated from the 1976 Presidential Order.</li>
<li><strong>Bilingual abstract</strong>: Data published in both English and Hindi for wider accessibility.</li>
</ol>`,

'4.2': `<h3>Pearl and Reed Method of Fitting the Logistic Curve</h3>

<h4>Logistic Curve</h4>
<p>The logistic curve for population projection:</p>
<p>\\[P(t) = \\frac{K}{1 + e^{a+bt}},\\quad b < 0\\]</p>
<p>where \\(K\\) = carrying capacity (upper asymptote), \\(a\\) and \\(b\\) are constants determining the shape and position, and \\(t\\) is time.</p>

<h4>Pearl and Reed (1920) Three-Point Method</h4>
<p>Uses three census values at equal time intervals \\(h\\): \\(P_0 = P(t_0)\\), \\(P_1 = P(t_0+h)\\), \\(P_2 = P(t_0+2h)\\).</p>

<h5>Step 1: Estimate \\(K\\)</h5>
<p>Denote \\(u_i = 1/P_i\\). Then:</p>
<p>\\[K = \\frac{2P_0 P_1 P_2 - P_1^2(P_0 + P_2)}{P_0 P_2 - P_1^2}\\]</p>
<p>Equivalently in terms of \\(u_i\\):</p>
<p>\\[K = \\frac{2u_0 u_2 - u_1^2}{u_0 + u_2 - 2u_1} \\cdot \\frac{1}{1}\\quad \\text{(simplified)}\\]</p>

<h5>Step 2: Estimate \\(a\\) and \\(b\\)</h5>
<p>Once \\(K\\) is known, compute:</p>
<p>\\[c_0 = \\frac{K}{P_0} - 1,\\quad c_2 = \\frac{K}{P_2} - 1\\]</p>
<p>\\[b = \\frac{1}{2h}\\ln\\left(\\frac{c_0}{c_2}\\right)\\quad \\text{(note: }b < 0 \\text{ for growth)}\\]</p>
<p>\\[a = \\ln(c_0) + b \\cdot t_0\\quad \\text{(using origin at }t_0\\text{)}\\]</p>

<h5>Illustrative Example</h5>
<p>India's census data (in millions):</p>
<table border="1" style="border-collapse:collapse;">
<tr><th>Year</th><td>1901</td><td>1931</td><td>1961</td></tr>
<tr><th>Population (M)</th><td>238.4</td><td>278.9</td><td>439.2</td></tr>
</table>
<p>\\(h = 30\\), \\(P_0 = 238.4\\), \\(P_1 = 278.9\\), \\(P_2 = 439.2\\).</p>
<p>\\[K = \\frac{2 \\times 238.4 \\times 278.9 \\times 439.2 - 278.9^2 \\times (238.4 + 439.2)}{238.4 \\times 439.2 - 278.9^2}\\]</p>
<p>After computing (typical result): \\(K \\approx 1575\\) million (upper asymptote).</p>

<h5>Limitations</h5>
<ul>
<li>Result is highly sensitive to the three census years chosen.</li>
<li>Assumes a single stable \\(K\\); in practice, carrying capacity may change due to technology and policy.</li>
<li>Only uses 3 data points (inefficient use of available census data).</li>
</ul>`,

'4.3': `<h3>Life Table: Finding Missing Values at Ages 30 and 31</h3>

<h4>Given Table</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Age \\(x\\)</th><th>\\(l_x\\)</th><th>\\(d_x\\)</th><th>\\(p_x\\)</th><th>\\(q_x\\)</th></tr>
<tr><td>30</td><td>762,227</td><td>—</td><td>—</td><td>—</td></tr>
<tr><td>31</td><td>758,580</td><td>—</td><td>—</td><td>—</td></tr>
</table>

<h4>Computation</h4>
<p><strong>Row x = 30:</strong></p>
<p>\\[d_{30} = l_{30} - l_{31} = 762{,}227 - 758{,}580 = \\mathbf{3{,}647}\\]</p>
<p>\\[q_{30} = \\frac{d_{30}}{l_{30}} = \\frac{3{,}647}{762{,}227} = \\mathbf{0.004785}\\]</p>
<p>\\[p_{30} = 1 - q_{30} = \\mathbf{0.995215}\\]</p>

<p><strong>Row x = 31:</strong></p>
<p>For row 31, we need \\(l_{32}\\) to compute \\(d_{31}\\), \\(p_{31}\\), \\(q_{31}\\). Since \\(l_{32}\\) is not given, these three values cannot be determined from the available data alone.</p>
<p>If \\(l_{32}\\) were given (say, \\(l_{32} = 754{,}700\\) as a typical value), then:</p>
<p>\\(d_{31} = 758{,}580 - 754{,}700 = 3{,}880\\)</p>
<p>\\(q_{31} = 3{,}880/758{,}580 = 0.005115\\)</p>
<p>\\(p_{31} = 0.994885\\)</p>

<h4>Summary of Computable Values</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Age \\(x\\)</th><th>\\(l_x\\)</th><th>\\(d_x\\)</th><th>\\(p_x\\)</th><th>\\(q_x\\)</th></tr>
<tr><td>30</td><td>762,227</td><td>3,647</td><td>0.995215</td><td>0.004785</td></tr>
<tr><td>31</td><td>758,580</td><td>Needs \\(l_{32}\\)</td><td>Needs \\(l_{32}\\)</td><td>Needs \\(l_{32}\\)</td></tr>
</table>`,

'4.4': `<h3>Fertility: Meaning, Measurement, and Common Fertility Rates</h3>

<h4>Meaning of Fertility</h4>
<p><strong>Fertility</strong> is the actual reproductive performance of a woman, couple, or population — i.e., the number of live births that actually occur. It is distinct from <em>fecundity</em> (the biological capacity to reproduce, which is rarely the binding constraint in practice).</p>

<h4>How Fertility is Measured</h4>
<p>Fertility is measured using <strong>rates</strong> that relate the number of live births to the size of the population at risk (women of reproductive age, 15–49 years). Period rates reflect current behaviour; cohort rates follow actual birth cohorts over time.</p>

<h4>Common Fertility Rates</h4>

<h5>1. Crude Birth Rate (CBR)</h5>
<p>\\[\\text{CBR} = \\frac{B}{P} \\times 1000\\]</p>
<p>Births per 1000 total population.</p>
<p><strong>Merit</strong>: Simple, widely computed.</p>
<p><strong>Demerit</strong>: Affected by sex ratio and age structure; not appropriate for comparing populations with different demographic profiles.</p>

<h5>2. General Fertility Rate (GFR)</h5>
<p>\\[\\text{GFR} = \\frac{B}{W_{15-49}} \\times 1000\\]</p>
<p>Births per 1000 women aged 15–49.</p>
<p><strong>Merit</strong>: Better than CBR as it restricts denominator to women at risk.</p>
<p><strong>Demerit</strong>: Still affected by age distribution within 15–49.</p>

<h5>3. Age-Specific Fertility Rate (ASFR)</h5>
<p>\\[f_x = \\frac{B_x}{W_x} \\times 1000\\]</p>
<p>Births per 1000 women in age group \\([x, x+5)\\).</p>
<p><strong>Merit</strong>: Completely free of age-structure bias within reproductive span; enables detailed fertility analysis.</p>
<p><strong>Demerit</strong>: Produces a vector of 7 rates; requires large population for reliable estimates.</p>

<h5>4. Total Fertility Rate (TFR)</h5>
<p>\\[\\text{TFR} = 5 \\times \\sum_{x=15}^{45} f_x\\]</p>
<p>Average children per woman (without mortality adjustment).</p>
<p><strong>Merit</strong>: Single most useful summary of fertility; age-structure free; widely used for international comparison; replacement level ≈ 2.1.</p>
<p><strong>Demerit</strong>: Affected by "timing effect" — early/late childbearing distorts TFR in transition periods (quantum vs. tempo effects, Bongaarts and Feeney, 1998).</p>

<h5>5. Gross Reproduction Rate (GRR)</h5>
<p>\\[\\text{GRR} = \\text{TFR} \\times p_f \\approx \\text{TFR}/2.05\\]</p>
<p>Average daughters per woman (without mortality adjustment).</p>
<p><strong>Merit</strong>: Sex-specific; focuses on female population relevant for generational replacement.</p>
<p><strong>Demerit</strong>: Ignores mortality; GRR > 1 does not guarantee actual population growth if mortality is high.</p>

<h5>6. Net Reproduction Rate (NRR)</h5>
<p>\\[\\text{NRR} = \\sum_x f_x^F \\cdot {_nL_x^F}/l_0\\]</p>
<p>Average daughters per woman accounting for female mortality.</p>
<p><strong>Merit</strong>: Best single indicator of long-run generational replacement; NRR = 1 means exact replacement.</p>
<p><strong>Demerit</strong>: Requires a life table; affected by period mortality schedule; does not predict near-term population dynamics due to momentum.`

};

// ─── 2017 SQC ─────────────────────────────────────────────────────────────────

data.paper4.sqc['2017'] = {

'7.1': `<h3>Chance Causes vs. Special (Assignable) Causes of Variation</h3>

<h4>Common (Chance) Causes</h4>
<p>Common causes are the <strong>inherent, random sources of variability</strong> present in every process. They arise from many small, cumulative effects that cannot be individually identified or economically eliminated:</p>
<ul>
<li>Slight variation in raw material properties within a batch.</li>
<li>Machine vibration, bearing wear, hydraulic pressure fluctuations.</li>
<li>Minor variation in operator technique.</li>
<li>Environmental noise: small temperature, humidity, voltage fluctuations.</li>
<li>Measurement imprecision (gauge repeatability and reproducibility).</li>
</ul>
<p>When only common causes are present, the process is in <strong>statistical control</strong>: output follows a stable, predictable distribution. Common-cause variation can only be reduced by fundamental process redesign — a management-level decision (Deming: "system" action).</p>

<h4>Special (Assignable) Causes</h4>
<p>Special causes are <strong>non-random, identifiable sources of variation</strong> that arise from specific, detectable factors outside the normal process:</p>
<ul>
<li>A defective batch of raw material.</li>
<li>An improperly trained or fatigued operator.</li>
<li>A machine breakdown or tool chipping.</li>
<li>A change in supplier or process setting.</li>
<li>Measurement error (wrong gauge, miscalibration).</li>
</ul>
<p>When assignable causes are present, the process is <strong>out of statistical control</strong>: the output distribution shifts or spreads unpredictably. Assignable causes CAN and SHOULD be identified and eliminated — a local action (Deming: "special cause" action by the operator/supervisor).</p>

<h4>Key Differences</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Feature</th><th>Chance (Common) Causes</th><th>Assignable (Special) Causes</th></tr>
<tr><td>Source</td><td>System (design, equipment, materials)</td><td>Specific events or changes</td></tr>
<tr><td>Detectability</td><td>Not individually detectable</td><td>Identifiable with investigation</td></tr>
<tr><td>Number</td><td>Many, small individual effects</td><td>Few, large individual effects</td></tr>
<tr><td>Statistical state</td><td>Process in control</td><td>Process out of control</td></tr>
<tr><td>Action required</td><td>Management/system redesign</td><td>Operator/local corrective action</td></tr>
<tr><td>SPC signal</td><td>Points within control limits (random)</td><td>Points outside limits, runs, trends</td></tr>
</table>`,

'7.2': `<h3>Control Charts and 100% Within-Tolerance Results: Agreement/Disagreement</h3>

<h4>Statement</h4>
<p>"A statistically controlled process will always produce 100% results within tolerance limits."</p>

<h4>Verdict: DISAGREE</h4>
<p>This statement is <strong>incorrect</strong>. Being "in statistical control" and producing results within specification limits are <strong>independent concepts</strong>:</p>

<h4>Explanation</h4>
<ol>
<li><strong>Statistical control means consistency, not conformance</strong>: A process in statistical control is one whose output variation is due only to common causes — it behaves in a stable, predictable manner. This says nothing about whether that output falls within the tolerance limits (USL, LSL) set by the customer or designer.</li>
<li><strong>Process capability (\\(C_p\\)) measures conformance</strong>: If the process spread \\(6\\sigma\\) exceeds the tolerance width \\((\\text{USL} - \\text{LSL})\\), then even a perfectly controlled, stable process will produce out-of-specification units. For 100% within-tolerance output, we need \\(6\\sigma \\ll (\\text{USL} - \\text{LSL})\\) (very high \\(C_p\\), e.g., Six Sigma: \\(C_p = 2.0\\)).</li>
<li><strong>Off-centre processes</strong>: A process may be in control but with its mean shifted away from the specification centre. Then \\(C_{pk} < C_p\\), and defects occur on the side nearer the specification boundary even though the process is controlled.</li>
</ol>

<h4>Illustrative Example</h4>
<p>Consider USL = 30, LSL = 10, \\(\\mu = 20\\), \\(\\sigma = 5\\): \\(C_p = 20/(6 \\times 5) = 0.667 < 1\\). Even though this process might be in statistical control, approximately 38% of output will be out-of-specification (\\(\\pm 2\\sigma\\) from mean at specification boundaries).</p>

<h4>Correct Statement</h4>
<p>A statistically controlled process produces <strong>predictable</strong> output. Whether that output is within specification depends on <strong>process capability</strong> (the relationship between the process natural spread and the tolerance width). Only a process that is BOTH in control AND capable (\\(C_{pk} \\geq 1.33\\)) will reliably produce conforming product.</p>`,

'7.3': `<h3>Control Chart for Defects: Constant and Varying Sample Units (c-Chart and u-Chart)</h3>

<h4>Background</h4>
<p>When quality is measured by counting the <strong>number of nonconformities (defects)</strong> per inspection unit (e.g., defects per circuit board, per metre of wire), and defects follow a <strong>Poisson distribution</strong>, the appropriate control charts are the c-chart (constant inspection unit) and u-chart (varying inspection unit).</p>

<h4>Case 1: Constant Number of Sample Units (c-Chart)</h4>
<p>The c-chart monitors the count of defects \\(c_i\\) per inspection unit, where the area of opportunity (number of units inspected) is constant.</p>
<p>Under the Poisson model: \\(E(c) = \\bar{c}\\), \\(\\text{Var}(c) = \\bar{c}\\).</p>
<p>\\[\\bar{c} = \\frac{\\sum_{i=1}^k c_i}{k}\\]</p>
<p>\\[\\text{UCL}_c = \\bar{c} + 3\\sqrt{\\bar{c}}\\]</p>
<p>\\[\\text{CL}_c = \\bar{c}\\]</p>
<p>\\[\\text{LCL}_c = \\max\\!\\left(0,\\ \\bar{c} - 3\\sqrt{\\bar{c}}\\right)\\]</p>
<p><strong>Application</strong>: Number of soldering defects per circuit board (always inspecting one board per sample); number of typing errors per 1000-word document.</p>

<h4>Case 2: Varying Number of Sample Units (u-Chart)</h4>
<p>When the number of inspection units \\(n_i\\) varies between samples, the u-chart (defects per unit) is used. Plot \\(u_i = c_i/n_i\\) where \\(c_i\\) = total defects in sample \\(i\\).</p>
<p>\\[\\bar{u} = \\frac{\\sum_{i=1}^k c_i}{\\sum_{i=1}^k n_i}\\]</p>
<p>For each sample \\(i\\) (variable control limits):</p>
<p>\\[\\text{UCL}_{u,i} = \\bar{u} + 3\\sqrt{\\frac{\\bar{u}}{n_i}}\\]</p>
<p>\\[\\text{CL}_u = \\bar{u}\\]</p>
<p>\\[\\text{LCL}_{u,i} = \\max\\!\\left(0,\\ \\bar{u} - 3\\sqrt{\\frac{\\bar{u}}{n_i}}\\right)\\]</p>
<p><strong>Application</strong>: Defects per metre of cloth when different lengths are inspected per shift; defects per 100 square metres of glass panel when panel size varies.</p>

<h4>Comparison</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Chart</th><th>Quantity monitored</th><th>Sample size</th><th>Control limits</th></tr>
<tr><td>c-chart</td><td>Total defects per unit</td><td>Constant</td><td>Fixed: \\(\\bar{c} \\pm 3\\sqrt{\\bar{c}}\\)</td></tr>
<tr><td>u-chart</td><td>Defects per unit</td><td>Variable</td><td>Variable: \\(\\bar{u} \\pm 3\\sqrt{\\bar{u}/n_i}\\)</td></tr>
</table>`,

'7.4': `<h3>Operating Characteristic (OC) Curve: Sensitivity of a Sampling Plan</h3>

<h4>Definition</h4>
<p>The <strong>Operating Characteristic (OC) curve</strong> is the chart that describes the sensitivity of an acceptance sampling plan to detect lot quality. It plots the <strong>probability of accepting a lot</strong>, \\(P_a(p)\\), against the true fraction defective \\(p\\) of the lot.</p>

<h4>Construction of the OC Curve (Single Sampling Plan)</h4>
<p>For SSP \\((N, n, c)\\) with Binomial model:</p>
<p>\\[P_a(p) = \\sum_{d=0}^c \\binom{n}{d} p^d(1-p)^{n-d}\\]</p>

<p>Calculate \\(P_a\\) for a range of \\(p\\) values (e.g., 0, 0.01, 0.02, ..., 0.20) and plot:</p>
<ul>
<li>X-axis: fraction defective \\(p\\)</li>
<li>Y-axis: probability of acceptance \\(P_a(p)\\)</li>
</ul>

<h4>How the OC Curve Describes Sensitivity</h4>
<ul>
<li><strong>High \\(P_a\\) for small \\(p\\)</strong>: Good-quality lots (low defectives) are accepted most of the time. \\(P_a \\to 1\\) as \\(p \\to 0\\).</li>
<li><strong>Decline of \\(P_a\\) as \\(p\\) increases</strong>: As the lot quality deteriorates, the probability of acceptance decreases.</li>
<li><strong>Steep OC curve = high discrimination</strong>: The plan sharply distinguishes between acceptable (\\(p \\leq\\) AQL) and unacceptable (\\(p \\geq\\) LTPD) lots.</li>
<li><strong>Flat OC curve = poor discrimination</strong>: Even bad lots have high acceptance probability — occurs with small \\(n\\).</li>
<li><strong>Producer's risk \\(\\alpha\\)</strong>: \\(1 - P_a(\\text{AQL})\\) — the probability of rejecting a good lot.</li>
<li><strong>Consumer's risk \\(\\beta\\)</strong>: \\(P_a(\\text{LTPD})\\) — the probability of accepting a bad lot.</li>
</ul>

<h4>Effect of Plan Parameters on OC Curve</h4>
<ul>
<li>Increasing \\(n\\) (with \\(c/n\\) fixed): steeper OC curve — better discrimination.</li>
<li>Increasing \\(c\\) (with \\(n\\) fixed): shifts OC curve to the right — more lenient plan (higher \\(P_a\\) for all \\(p\\)).</li>
<li>Decreasing \\(c\\) (with \\(n\\) fixed): shifts OC curve to the left — more stringent plan.</li>
</ul>`,

'7.5': `<h3>CUSUM Chart: Definition and Methodology for Process Control</h3>

<h4>Definition</h4>
<p>The <strong>Cumulative Sum (CUSUM) control chart</strong>, introduced by E.S. Page (1954), accumulates the successive deviations of sample observations from a target value \\(\\mu_0\\). By accumulating information across samples, it is sensitive to small, sustained shifts in the process mean that a Shewhart chart may miss.</p>

<h4>Methodology</h4>

<h5>Step 1: Define Parameters</h5>
<ul>
<li>Target value \\(\\mu_0\\) (in-control process mean).</li>
<li>Reference (allowance) value \\(k = \\delta\\sigma/2\\) where \\(\\delta\\) = shift (in \\(\\sigma\\) units) to be detected.</li>
<li>Decision interval \\(h = H\\sigma\\) (signal threshold), typically \\(H = 4\\) or \\(5\\).</li>
<li>Common design: \\(k = 0.5\\sigma\\), \\(h = 5\\sigma\\) (for ARL\\(_0\\) ≈ 465).</li>
</ul>

<h5>Step 2: Compute CUSUM Statistics at Each Sample \\(i\\)</h5>
<p>Upper CUSUM (detects upward shift):</p>
<p>\\[C_i^+ = \\max[0,\\ C_{i-1}^+ + (x_i - \\mu_0 - k)]\\]</p>
<p>Lower CUSUM (detects downward shift):</p>
<p>\\[C_i^- = \\max[0,\\ C_{i-1}^- + (\\mu_0 - k - x_i)]\\]</p>
<p>Starting values: \\(C_0^+ = C_0^- = 0\\) (or use a Fast Initial Response start: \\(C_0 = h/2\\)).</p>

<h5>Step 3: Signal Rule</h5>
<ul>
<li>Signal <strong>upward shift</strong> when \\(C_i^+ > h\\).</li>
<li>Signal <strong>downward shift</strong> when \\(C_i^- > h\\).</li>
<li>After a signal: identify assignable cause, take corrective action, reset \\(C^+\\) or \\(C^-\\) to 0.</li>
</ul>

<h5>Step 4: Estimate Shift Magnitude (after signal)</h5>
<p>When \\(C_i^+ > h\\) at sample \\(i\\), the estimated process mean at time of shift:</p>
<p>\\[\\hat{\\mu}_1 = \\mu_0 + k + \\frac{C_i^+}{i - i_0}\\]</p>
<p>where \\(i_0\\) is the last sample before \\(C^+\\) began accumulating consistently (estimated change point).</p>

<h4>Advantages over Shewhart Chart</h4>
<ul>
<li>ARL for detecting 1\\(\\sigma\\) shift: CUSUM ≈ 10.4 vs. Shewhart ≈ 43.9 (for \\(n=1\\)).</li>
<li>Provides an estimate of the change point (when the shift occurred).</li>
<li>Optimal (minimum ARL) for detecting a specified shift size (SPRT basis).</li>
</ul>`,

'8.1': `<h3>ARL for Detecting a 1\\(\\sigma\\) Shift with X-bar Chart (n = 5)</h3>

<h4>Setting</h4>
<p>\\(\\bar{X}\\)-chart with subgroup size \\(n = 5\\), 3-sigma limits. Process mean shifts upward by \\(\\delta = 1\\sigma\\).</p>
<p>\\[\\sigma_{\\bar{X}} = \\sigma/\\sqrt{5} = \\sigma/2.2361\\]</p>
<p>UCL = \\(\\mu_0 + 3\\sigma/\\sqrt{5}\\), LCL = \\(\\mu_0 - 3\\sigma/\\sqrt{5}\\).</p>

<h4>Probability of No Detection in One Sample (\\(\\beta\\))</h4>
<p>When true mean \\(\\mu_1 = \\mu_0 + \\sigma\\) (shift of \\(\\delta = 1\\)):</p>
<p>\\[\\beta = P(\\text{LCL} \\leq \\bar{X} \\leq \\text{UCL} \\mid \\mu_1)\\]</p>
<p>Standardising:</p>
<p>\\[\\beta = P\\!\\left(\\frac{\\text{LCL}-\\mu_1}{\\sigma_{\\bar{X}}} \\leq Z \\leq \\frac{\\text{UCL}-\\mu_1}{\\sigma_{\\bar{X}}}\\right)\\]</p>
<p>\\[= P\\!\\left(\\frac{-3\\sigma/\\sqrt{5}-\\sigma}{\\sigma/\\sqrt{5}} \\leq Z \\leq \\frac{3\\sigma/\\sqrt{5}-\\sigma}{\\sigma/\\sqrt{5}}\\right)\\]</p>
<p>\\[= P\\!\\left(-3-\\sqrt{5} \\leq Z \\leq 3-\\sqrt{5}\\right)\\]</p>
<p>\\[= P(-5.236 \\leq Z \\leq 0.764) = \\Phi(0.764) - \\Phi(-5.236)\\]</p>
<p>\\[= 0.7776 - \\approx 0 = 0.7776\\]</p>

<h4>Average Run Length (ARL)</h4>
<p>The probability of detecting the shift in one sample: \\(1 - \\beta = 0.2224\\)</p>
<p>\\[\\text{ARL}_{\\text{shift}} = \\frac{1}{1-\\beta} = \\frac{1}{0.2224} = \\mathbf{4.50}\\text{ samples}\\]</p>
<p>This means on average, <strong>4.50 samples</strong> are required after the 1\\(\\sigma\\) shift before it is detected by the \\(\\bar{X}\\)-chart with \\(n = 5\\).</p>

<h4>Requirement for \\(\\beta \\leq 0.05\\)</h4>
<p>The current \\(\\beta = 0.778\\) does NOT meet the requirement of \\(\\beta \\leq 0.05\\). To achieve \\(\\beta \\leq 0.05\\) for a 1\\(\\sigma\\) shift:</p>
<p>\\[\\Phi(3 - \\sqrt{n}) \\leq 0.05 \\implies 3 - \\sqrt{n} \\leq -1.645 \\implies \\sqrt{n} \\geq 4.645 \\implies n \\geq 22\\]</p>
<p>With \\(n = 22\\): \\(\\beta \\approx \\Phi(3 - \\sqrt{22}) = \\Phi(3 - 4.690) = \\Phi(-1.690) = 0.046 \\leq 0.05\\) ✓</p>
<p>Then \\(\\text{ARL} = 1/(1-0.046) = 1.048\\) (near-certain detection on first post-shift sample).</p>`,

'8.2': `<h3>Exponentially Weighted Moving Average (EWMA) Chart</h3>

<h4>Definition and Statistic</h4>
<p>The EWMA control chart, proposed by Roberts (1959), computes a weighted average of all past and current observations with exponentially decreasing weights:</p>
<p>\\[Z_i = \\lambda x_i + (1-\\lambda) Z_{i-1},\\quad 0 < \\lambda \\leq 1\\]</p>
<p>Starting value: \\(Z_0 = \\mu_0\\) (or the overall average \\(\\bar{x}\\) if the mean is unknown).</p>
<p>The weight given to observation \\(x_j\\) at time \\(i\\) is \\(\\lambda(1-\\lambda)^{i-j}\\), decaying geometrically as the observation ages.</p>

<h4>Control Limits</h4>
<p>Steady-state (large \\(i\\)) limits:</p>
<p>\\[\\text{UCL} = \\mu_0 + L\\sigma\\sqrt{\\frac{\\lambda}{2-\\lambda}}\\]</p>
<p>\\[\\text{LCL} = \\mu_0 - L\\sigma\\sqrt{\\frac{\\lambda}{2-\\lambda}}\\]</p>
<p>where \\(L \\approx 3\\) (or from Lucas and Saccucci's ARL tables). Time-varying limits for initial samples:</p>
<p>\\[\\text{UCL}_i = \\mu_0 \\pm L\\sigma\\sqrt{\\frac{\\lambda}{2-\\lambda}\\left[1-(1-\\lambda)^{2i}\\right]}\\]</p>

<h4>Design Guidance (Montgomery, 2020)</h4>
<ul>
<li>For detecting small shifts (0.5\\(\\sigma\\) to 1.5\\(\\sigma\\)): use \\(\\lambda = 0.05\\)–\\(0.20\\), \\(L = 2.6\\)–\\(3.0\\).</li>
<li>Smaller \\(\\lambda\\) gives more weight to history → sensitive to smaller, slower shifts.</li>
<li>\\(\\lambda = 1\\): reduces to the Shewhart individuals chart.</li>
</ul>

<h4>Example Application: Chemical Batch Process</h4>
<p>In a pharmaceutical manufacturing plant, pH of each reactor batch is measured once per hour (individual measurements, \\(n=1\\)). Historical data: \\(\\mu_0 = 7.00\\), \\(\\sigma = 0.05\\). Concern is a slow drift in pH (0.5\\(\\sigma\\) shift).</p>
<p>Design: \\(\\lambda = 0.10\\), \\(L = 2.703\\) (gives ARL\\(_0 = 500\\)).</p>
<p>\\[\\text{UCL} = 7.00 + 2.703 \\times 0.05 \\times \\sqrt{0.10/1.90} = 7.00 + 2.703 \\times 0.05 \\times 0.2294 = 7.00 + 0.031 = 7.031\\]</p>
<p>\\[\\text{LCL} = 7.00 - 0.031 = 6.969\\]</p>
<p>As each batch is processed: \\(Z_i = 0.10 x_i + 0.90 Z_{i-1}\\). A signal occurs when \\(Z_i\\) exceeds 7.031 or falls below 6.969. This EWMA chart will detect a 0.5\\(\\sigma\\) pH drift in about 10 batches, compared to the Shewhart chart which would take approximately 155 batches on average.</p>`,

'8.3': `<h3>Variable Sampling vs. Attribute Sampling Schemes</h3>

<h4>Definition</h4>

<h5>Variables Sampling</h5>
<p>In <strong>variables sampling</strong>, a measurable quality characteristic (e.g., weight, tensile strength, diameter) is recorded for each sampled item. The lot is accepted or rejected based on the sample mean and/or standard deviation compared to specification limits or OC-derived decision rules.</p>

<h5>Attribute Sampling</h5>
<p>In <strong>attribute sampling</strong>, each item is classified as <em>defective</em> (nonconforming) or <em>non-defective</em> based on one or more quality criteria. The lot is accepted or rejected based on the count of defectives in the sample.</p>

<h4>Comparison</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Feature</th><th>Variables Sampling</th><th>Attributes Sampling</th></tr>
<tr><td>Data recorded</td><td>Actual measurement (continuous)</td><td>Pass/fail classification (discrete)</td></tr>
<tr><td>Information content</td><td>High — includes both location and spread</td><td>Low — only conformance count</td></tr>
<tr><td>Sample size for same OC</td><td>Much smaller (e.g., \\(n=5\\))</td><td>Much larger (e.g., \\(n=50\\)–200)</td></tr>
<tr><td>Inspection cost per unit</td><td>Higher (measurement required)</td><td>Lower (visual/go-no-go inspection)</td></tr>
<tr><td>Applicable to</td><td>Single quality characteristic</td><td>Multiple characteristics simultaneously (one p)</td></tr>
<tr><td>Assumption</td><td>Normality (or other distribution)</td><td>Binomial/hypergeometric distribution</td></tr>
<tr><td>Standards</td><td>ANSI/ASQ Z1.9 (variables)</td><td>ANSI/ASQ Z1.4 / ISO 2859-1 (attributes)</td></tr>
<tr><td>Estimation</td><td>Can estimate process parameters (\\(\\mu\\), \\(\\sigma\\))</td><td>Only estimates fraction defective</td></tr>
</table>

<h4>When to Use Each</h4>
<p><strong>Variables sampling</strong> is preferred when:</p>
<ul>
<li>Measurement cost is justified by smaller required sample size.</li>
<li>The characteristic can be precisely measured on a continuous scale.</li>
<li>Process capability estimation is needed.</li>
</ul>
<p><strong>Attribute sampling</strong> is preferred when:</p>
<ul>
<li>Quality is based on multiple criteria simultaneously (overall pass/fail).</li>
<li>Measurement is not feasible (e.g., appearance, complex functionality).</li>
<li>Inspection is destructive or expensive to measure.</li>
<li>Historic data or industry standards require it (e.g., MIL-STD-1916).</li>
</ul>`,

'8.4': `<h3>Reduction in Nonconforming Products from \\(C_{pk}\\) Improvement: 0.6 to 0.95</h3>

<h4>Given</h4>
<ul>
<li>\\(C_{pk}\\) improved from 0.6 to 0.95.</li>
<li>Process average has NOT changed.</li>
<li>\\(C_p = C_{pk}\\) (process is perfectly centred on the specification midpoint).</li>
<li>Process is in statistical control and normally distributed.</li>
</ul>

<h4>Theory</h4>
<p>When \\(C_p = C_{pk}\\), the process mean \\(\\mu\\) is at the centre of the specification interval \\([(\\text{LSL}+\\text{USL})/2]\\). The fraction nonconforming is:</p>
<p>\\[p = 2 \\times P(Z > 3C_{pk}) = 2[1 - \\Phi(3C_{pk})]\\]</p>
<p>where \\(Z \\sim N(0,1)\\).</p>

<h4>Before Improvement: \\(C_{pk} = 0.6\\)</h4>
<p>\\[3C_{pk} = 3 \\times 0.6 = 1.8\\]</p>
<p>\\[p_1 = 2[1 - \\Phi(1.8)] = 2[1 - 0.9641] = 2 \\times 0.0359 = 0.0718 = \\mathbf{7.18\\%}\\]</p>

<h4>After Improvement: \\(C_{pk} = 0.95\\)</h4>
<p>\\[3C_{pk} = 3 \\times 0.95 = 2.85\\]</p>
<p>\\[p_2 = 2[1 - \\Phi(2.85)] = 2[1 - 0.9978] = 2 \\times 0.0022 = 0.0044 = \\mathbf{0.44\\%}\\]</p>

<h4>Reduction in Nonconforming Products</h4>
<p><strong>Absolute reduction:</strong> \\(p_1 - p_2 = 7.18\\% - 0.44\\% = 6.74\\%\\)</p>
<p><strong>Relative (percentage) reduction:</strong></p>
<p>\\[\\text{Reduction} = \\frac{p_1 - p_2}{p_1} \\times 100 = \\frac{6.74}{7.18} \\times 100 = \\mathbf{93.9\\%}\\]</p>

<h4>Interpretation</h4>
<p>The process improvement (from \\(C_{pk} = 0.6\\) to \\(0.95\\)) reduced the proportion of nonconforming products by approximately <strong>93.9%</strong> — from 7.18% to 0.44% defective. This dramatic improvement illustrates why even modest increases in process capability (still below the industry standard of \\(C_{pk} \\geq 1.33\\)) yield substantial quality and cost benefits. To fully meet the standard, further improvement to \\(C_{pk} \\geq 1.33\\) would reduce the defect rate to \\(< 0.007\\%\\) (64 PPM).`

};

fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
console.log('Done: 2017 written.');
console.log('JSON size (MB):', (fs.statSync(FILE).size / 1e6).toFixed(2));

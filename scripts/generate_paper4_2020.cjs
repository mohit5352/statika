'use strict';
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../src/data/explanations.json');
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

if (!data.paper4) data.paper4 = {};
if (!data.paper4.demography) data.paper4.demography = {};
if (!data.paper4.sqc) data.paper4.sqc = {};

// ─── 2020 DEMOGRAPHY ──────────────────────────────────────────────────────────

data.paper4.demography['2020'] = {

'3.1': `<h3>National Census of India: An Overview</h3>

<h4>Constitutional and Statutory Basis</h4>
<p>The <strong>Census of India</strong> is a decennial (once every 10 years) enumeration mandated under the <em>Census Act, 1948</em> and Article 246 of the Constitution of India (Union List, Entry 69). It is conducted by the <strong>Office of the Registrar General and Census Commissioner of India (ORGI)</strong> under the Ministry of Home Affairs.</p>

<h4>History and Periodicity</h4>
<ul>
<li>First synchronous census: <strong>1881</strong> (covering all of British India simultaneously).</li>
<li>Since 1881, censuses have been held every 10 years: 1891, 1901, … , 2011. The Census 2021 was deferred due to COVID-19.</li>
<li>India's 2011 census was the 15th national census and the 7th post-independence census.</li>
</ul>

<h4>Two-Phase Process</h4>
<ol>
<li><strong>House-listing and Housing Census</strong> (Phase I): Conducted about 1–2 years before the population enumeration. Enumerators visit all structures and collect information on buildings, households, amenities, and assets. Forms H-1 (House-listing Schedule) are used.</li>
<li><strong>Population Enumeration</strong> (Phase II): Conducted over a reference night (e.g., 0–1 March 2011 for Census 2011). Every individual present in India at that moment is counted using the Population Enumeration Schedule and the Houseless Population Schedule.</li>
</ol>

<h4>Reference Period</h4>
<p>Census data refer to a single reference moment — the "Census Night." For Census 2011: the night of 28 February/1 March 2011. For past censuses in cooler areas, the reference period was in March; for north-eastern states, it was in October.</p>

<h4>Data Collected</h4>
<p>The Population Enumeration Schedule collects data on:</p>
<ol>
<li>Name, relation to head of household</li>
<li>Sex, age, marital status</li>
<li>Religion, mother tongue, language</li>
<li>Scheduled Caste/Scheduled Tribe status</li>
<li>Literacy and educational level</li>
<li>Employment and main/marginal worker status</li>
<li>Migration status (birthplace, last residence)</li>
<li>Disability status</li>
</ol>

<h4>Organisation of Enumeration</h4>
<ul>
<li>The country is divided into <strong>Enumeration Blocks</strong> (EB) — each assigned to one enumerator covering approximately 100–150 households.</li>
<li><strong>Enumerators</strong>: Mostly government employees (school teachers, etc.) trained for the purpose.</li>
<li><strong>Supervisors and Charge Officers</strong>: Senior officials overseeing groups of enumerators.</li>
</ul>

<h4>Data Processing</h4>
<ul>
<li>Paper forms are scanned and Optical Character Recognition (OCR) / Intelligent Character Recognition (ICR) technology is used for data capture.</li>
<li>Data are tabulated and released in Primary Census Abstracts (PCAs), District Census Handbooks, and Census Atlas.</li>
</ul>

<h4>Key Outputs from Census 2011</h4>
<ul>
<li>Total population: <strong>1.21 billion</strong> (2011); growth rate: 17.64%.</li>
<li>Sex ratio: 940 females per 1000 males; Child sex ratio (0–6): 914.</li>
<li>Literacy rate: 74.04% (Males: 82.14%; Females: 65.46%).</li>
<li>Urbanisation: 31.16% of population urban (377.1 million).</li>
</ul>

<h4>Census 2021</h4>
<p>The first <strong>digital census</strong> of India, planned in 2021 but postponed. Will use the <strong>Census Mobile App</strong> for self-enumeration. Reference date: <strong>1 October 2025</strong> (as per latest announcements).</p>`,

'3.2': `<h3>House-listing and Housing Census Schedule: 10 Key Data Items</h3>

<h4>Background</h4>
<p>The <strong>House-listing and Housing Census</strong> is Phase I of the Census of India. Conducted before the Population Enumeration, it covers all buildings and households. Enumerators visit each structure and fill a <strong>House-listing Schedule (Form H-1)</strong>.</p>

<h4>Ten Important Items Collected in the House-listing Schedule (Census 2021)</h4>
<ol>
<li><strong>Location details</strong>: District, sub-district, village/town code and name; ward number and house number for unique identification.</li>
<li><strong>Type of building/structure</strong>: Whether residential, non-residential, or mixed use. Classification by type: Dilapidated / Good / Livable condition.</li>
<li><strong>Type of wall material</strong>: Grass/thatch/bamboo, plastic/polythene, wood, stone, metal sheet, brick, concrete, etc.</li>
<li><strong>Type of roof material</strong>: Grass/thatch/bamboo, plastic/polythene, hand-made tiles, machine-made tiles, burnt brick, stone/slate, concrete, etc.</li>
<li><strong>Type of floor material</strong>: Mud, wood/bamboo, burnt brick, stone, cement, mosaic/floor tiles, etc.</li>
<li><strong>Number of dwelling rooms</strong>: Exclusive kitchen, number of rooms used for sleeping.</li>
<li><strong>Ownership status of the house</strong>: Owned, rented, employer-provided, rent-free, others.</li>
<li><strong>Amenities and assets</strong>: (a) Radio/transistor; (b) Television; (c) Computer/laptop (with or without internet); (d) Telephone/mobile phone; (e) Bicycle; (f) Scooter/motorcycle/moped; (g) Car/jeep/van.</li>
<li><strong>Source of drinking water</strong>: Treated tap water (within/outside premises), well, hand pump, tubewell, river/canal, tank/pond, other source; whether water is available within premises.</li>
<li><strong>Availability of latrine within the premises</strong>: Type of latrine — water closet (piped sewer/septic tank/other), pit latrine (covered/uncovered), service latrine; or no latrine within premises (open defecation).</li>
</ol>

<h4>Additional Important Items (Items 11 onwards, for completeness)</h4>
<ul>
<li>Drainage connectivity (closed/open/no drainage).</li>
<li>Source of lighting (electricity from grid, solar, other, kerosene, etc.).</li>
<li>Banking facilities (whether household has bank/post office account).</li>
<li>Cooking fuel type (LPG/PNG, firewood, dung cake, kerosene, other).</li>
</ul>

<h4>Significance</h4>
<p>The Housing Census data are essential for:</p>
<ul>
<li>Planning housing policies and slum rehabilitation schemes.</li>
<li>Estimating demand for urban/rural amenities.</li>
<li>Tracking SDG indicators related to water, sanitation, and energy access.</li>
<li>Providing a household frame for National Sample Survey operations.</li>
</ul>`,

'3.3': `<h3>Life Table: Assumptions and Importance</h3>

<h4>Assumptions of a (Period) Life Table</h4>
<ol>
<li><strong>Hypothetical cohort</strong>: The life table is constructed for a hypothetical cohort of \\(l_0 = 100{,}000\\) (or 10,000) births, not an actual birth cohort.</li>
<li><strong>Constant mortality rates</strong>: The age-specific death rates (ASDRs) observed in a given calendar year (period) are assumed to remain constant throughout the lifetime of the hypothetical cohort (the "period" or "current" assumption).</li>
<li><strong>Closed to migration</strong>: The hypothetical cohort is closed; no migration into or out of the cohort occurs. Attrition is solely due to death.</li>
<li><strong>Single decrement</strong>: Only one cause of decrement — death — operates. (In multiple-decrement tables, other causes such as disability are incorporated.)</li>
<li><strong>Deaths uniformly distributed within each age interval</strong>: For conversion between \\(q_x\\) and \\(m_x\\), deaths within \\([x, x+n)\\) are assumed uniformly distributed (UDD assumption), or alternatively, a constant force of mortality (Balducci assumption).</li>
<li><strong>Completeness of data</strong>: Deaths and population data are assumed complete and accurately recorded by age.</li>
</ol>

<h4>Importance / Uses of the Life Table</h4>
<ol>
<li><strong>Computing life expectancy</strong> \\((e_x^0)\\): The primary summary indicator of mortality, used in the Human Development Index (HDI), WHO rankings, and actuarial practice.</li>
<li><strong>Actuarial applications</strong>: Life insurance premium calculation, annuity pricing, pension fund liability estimation — all depend on \\(l_x\\) and \\(q_x\\) from life tables.</li>
<li><strong>Constructing fertility-mortality linkages</strong>: The NRR and the stable population model both require \\(l_x\\) or \\(_nL_x\\) from a life table.</li>
<li><strong>Population projections</strong>: Cohort-component projections use life table survival ratios \\((_nL_{x+n}/{_nL_x})\\) to age populations forward.</li>
<li><strong>Measuring adult mortality</strong>: \\(_{45}q_{15}\\) (probability of dying between ages 15 and 60) is a key adult mortality indicator used by WHO and UNDP.</li>
<li><strong>Evaluating health interventions</strong>: Comparing life tables before and after a health programme quantifies the impact on survival.</li>
<li><strong>Stationary population model</strong>: A stationary population has age structure given by \\(_nL_x/T_0\\) — the life table's \\(_nL_x\\) values are directly interpretable as a stationary age distribution.</li>
<li><strong>Indirect estimation</strong>: Brass model mortality methods, Trussell child mortality estimation, and Sullivan's disability-free life expectancy all use life table functions.</li>
</ol>`,

'3.4': `<h3>Life Table Probability Calculations</h3>

<h4>Given Information</h4>
<p>\\(p_x = 0.99\\), \\(p_{x+1} = 0.985\\), \\(_3p_{x+1} = 0.95\\), \\(q_{x+3} = 0.02\\)</p>

<h4>Key Relationships</h4>
<ul>
<li>\\(p_x = 1 - q_x\\): Probability of surviving exact year \\([x, x+1)\\).</li>
<li>\\(_kp_x = p_x \\cdot p_{x+1} \\cdots p_{x+k-1}\\): Probability of surviving \\(k\\) years from age \\(x\\).</li>
<li>\\(_3p_{x+1} = p_{x+1} \\cdot p_{x+2} \\cdot p_{x+3}\\)</li>
</ul>

<h4>(i) \\(p_{x+3}\\)</h4>
<p>\\[p_{x+3} = 1 - q_{x+3} = 1 - 0.02 = \\mathbf{0.98}\\]</p>

<h4>(ii) \\(_2p_x\\)</h4>
<p>\\[_2p_x = p_x \\cdot p_{x+1} = 0.99 \\times 0.985 = \\mathbf{0.97515}\\]</p>

<h4>(iii) \\(_2p_{x+1}\\)</h4>
<p>From \\(_3p_{x+1} = p_{x+1} \\cdot p_{x+2} \\cdot p_{x+3}\\):</p>
<p>\\[p_{x+2} = \\frac{_3p_{x+1}}{p_{x+1} \\cdot p_{x+3}} = \\frac{0.95}{0.985 \\times 0.98} = \\frac{0.95}{0.9653} = 0.98415\\]</p>
<p>\\[_2p_{x+1} = p_{x+1} \\cdot p_{x+2} = 0.985 \\times 0.98415 = \\mathbf{0.96939}\\]</p>

<h4>(iv) \\(_3p_x\\)</h4>
<p>Method 1 (direct): \\(_4p_x = p_x \\cdot {_3p_{x+1}} = 0.99 \\times 0.95 = 0.9405\\)</p>
<p>\\[_3p_x = \\frac{_4p_x}{p_{x+3}} = \\frac{0.9405}{0.98} = \\mathbf{0.9597}\\]</p>
<p>Method 2 (verify): \\(_3p_x = {_2p_x} \\cdot p_{x+2} = 0.97515 \\times 0.98415 = 0.9597 \\) ✓</p>

<h4>Summary</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Probability</th><th>Value</th></tr>
<tr><td>\\(p_{x+3}\\)</td><td>0.9800</td></tr>
<tr><td>\\(_2p_x\\)</td><td>0.9752</td></tr>
<tr><td>\\(_2p_{x+1}\\)</td><td>0.9694</td></tr>
<tr><td>\\(_3p_x\\)</td><td>0.9597</td></tr>
</table>`,

'3.5': `<h3>Migration and Net Migration Computation</h3>

<h4>Definition of Migration</h4>
<p><strong>Migration</strong> is the movement of persons across a specified boundary (national, state, or urban/rural) for the purpose of establishing a new usual residence. It is classified by:</p>
<ul>
<li><strong>Duration</strong>: Long-term (permanent), short-term (seasonal, circular).</li>
<li><strong>Distance</strong>: International (across national borders), internal (within the same country — inter-state or intra-state).</li>
<li><strong>Direction</strong>: Rural-to-urban (most common in India), urban-to-urban, rural-to-rural, urban-to-rural (return migration).</li>
</ul>

<h4>Net Migration</h4>
<p><strong>Net migration</strong> (also called net intercensal migration) is the difference between the number of in-migrants and out-migrants in a given area over a specified period:</p>
<p>\\[\\text{Net migration} = \\text{In-migrants} - \\text{Out-migrants}\\]</p>
<p>It is also computed by the <strong>Balancing Equation (Residual Method)</strong>:</p>
<p>\\[\\text{Net migration} = P_1 - P_0 - (B - D)\\]</p>
<p>where \\(P_0\\) = population at beginning, \\(P_1\\) = population at end, \\(B\\) = births in the period, \\(D\\) = deaths in the period.</p>
<p>The natural increase (NI) = \\(B - D\\). The residual that accounts for the difference between observed population change and natural change is net migration.</p>

<h4>Computation for the Given City (2005–2010)</h4>
<p>Given:</p>
<ul>
<li>\\(P_0 = 1{,}406{,}026\\) (population in 2005)</li>
<li>\\(P_1 = 1{,}620{,}140\\) (population in 2010)</li>
<li>\\(B = 401{,}240\\) (births, 2005–2010)</li>
<li>\\(D = 225{,}920\\) (deaths, 2005–2010)</li>
</ul>

<p><strong>Step 1: Natural Increase</strong></p>
<p>\\[\\text{NI} = B - D = 401{,}240 - 225{,}920 = 175{,}320\\]</p>

<p><strong>Step 2: Total Population Change</strong></p>
<p>\\[\\Delta P = P_1 - P_0 = 1{,}620{,}140 - 1{,}406{,}026 = 214{,}114\\]</p>

<p><strong>Step 3: Net Migration</strong></p>
<p>\\[\\text{Net migration} = \\Delta P - \\text{NI} = 214{,}114 - 175{,}320 = \\mathbf{38{,}794}\\]</p>

<p>Since net migration is <strong>positive (+38,794)</strong>, the city experienced net in-migration during 2005–2010 — more people moved into the city than moved out.</p>

<h4>Net Migration Rate</h4>
<p>\\[\\text{NMR} = \\frac{38{,}794}{(P_0 + P_1)/2} \\times 1000 = \\frac{38{,}794}{1{,}513{,}083} \\times 1000 \\approx 25.6\\text{ per 1000}\\]</p>`,

'4.1': `<h3>Data Sources for Demographers and Gompertz Law Computations</h3>

<h4>Part (i): Data Sources and Variety Used by Demographers</h4>

<h5>A. Primary Data Sources</h5>
<ol>
<li><strong>Census of Population</strong>: Universal enumeration; provides comprehensive age, sex, marital status, education, occupation, migration, and household data. Conducted decennially in most countries.</li>
<li><strong>Vital Registration System (Civil Registration)</strong>: Continuous recording of births, deaths, marriages, divorces. In India: Registration of Births and Deaths Act, 1969. Provides the raw material for CBR, CDR, IMR, etc.</li>
<li><strong>Sample Registration System (SRS)</strong>: India-specific dual-record system maintained by the RGI. Provides annual estimates of fertility (TFR, CBR) and mortality (CDR, IMR) at national and state level.</li>
<li><strong>Household Surveys</strong>: NFHS/DHS (National Family Health Survey), NSSO surveys (National Sample Survey), Annual Health Surveys (AHS). Provide detailed fertility, mortality, contraception, and health data.</li>
<li><strong>Administrative Records</strong>: Hospital admissions, school enrollment, tax records — used for indirect estimation.</li>
</ol>

<h5>B. Data Variety</h5>
<ul>
<li><strong>Age and sex data</strong>: Age-sex distribution from census, age-specific rates.</li>
<li><strong>Vital events data</strong>: Births, deaths, causes of death (ICD-10), marriages, divorces.</li>
<li><strong>Migration data</strong>: Birthplace, last residence, duration of stay — from census migration questions.</li>
<li><strong>Health and morbidity data</strong>: Survey-based, hospital records, NSSO health surveys.</li>
<li><strong>Indirect estimates</strong>: When direct data are unavailable — Brass P/F ratios, Sullivan method, Trussell estimates.</li>
</ul>

<h4>Part (ii): Gompertz Law Computations</h4>

<h5>Setup</h5>
<p>Gompertz law: \\(\\mu(x) = Bc^x\\) with \\(B = 0.001\\), \\(c = 1.1\\).</p>
<p>Force of mortality: \\(\\mu(x) = 0.001 \\times (1.1)^x\\)</p>
<p>Survival function: \\(S(x) = \\exp\\!\\left(-\\int_0^x \\mu(t)\\,dt\\right) = \\exp\\!\\left(-\\frac{B}{\\ln c}(c^x - 1)\\right)\\)</p>
<p>\\[\\ln c = \\ln 1.1 = 0.09531,\\quad \\frac{B}{\\ln c} = \\frac{0.001}{0.09531} = 0.010492\\]</p>

<h5>(1) Probability of dying before age 30</h5>
<p>\\[c^{30} = 1.1^{30} = 17.4494\\]</p>
<p>\\[\\frac{B}{\\ln c}(c^{30}-1) = 0.010492 \\times 16.4494 = 0.17258\\]</p>
<p>\\[S(30) = e^{-0.17258} = 0.8415\\]</p>
<p>\\[P(\\text{dies before 30}) = 1 - S(30) = 1 - 0.8415 = \\mathbf{0.1585}\\]</p>

<h5>(2) Probability of living more than 60 years</h5>
<p>\\[c^{60} = 1.1^{60} = (17.4494)^2 = 304.48\\]</p>
<p>\\[\\frac{B}{\\ln c}(c^{60}-1) = 0.010492 \\times 303.48 = 3.1837\\]</p>
<p>\\[S(60) = e^{-3.1837} = \\mathbf{0.04141}\\]</p>
<p>That is, approximately <strong>4.14%</strong> of newborns survive past age 60 under this high-mortality Gompertz schedule.</p>

<h5>(3) Probability that a person aged 20 dies before age 40</h5>
<p>\\[c^{20} = 1.1^{20} = 6.7275,\\quad \\frac{B}{\\ln c}(c^{20}-1) = 0.010492 \\times 5.7275 = 0.06009\\]</p>
<p>\\[S(20) = e^{-0.06009} = 0.9417\\]</p>
<p>\\[c^{40} = 1.1^{40} = (6.7275)^2 = 45.259,\\quad \\frac{B}{\\ln c}(c^{40}-1) = 0.010492 \\times 44.259 = 0.4643\\]</p>
<p>\\[S(40) = e^{-0.4643} = 0.6288\\]</p>
<p>\\[P(\\text{dies between 20 and 40} \\mid \\text{alive at 20}) = 1 - \\frac{S(40)}{S(20)} = 1 - \\frac{0.6288}{0.9417} = 1 - 0.6677 = \\mathbf{0.3323}\\]</p>

<h5>(4) Mortality rate function at age 25</h5>
<p>\\[\\mu(25) = 0.001 \\times 1.1^{25} = 0.001 \\times 10.8347 = \\mathbf{0.010835}\\]</p>
<p>The force of mortality at age 25 is approximately 0.0108 per year (or 10.8 per 1000 person-years).</p>`,

'4.2': `<h3>Life Table Completion and Logistic Growth Model</h3>

<h4>Part (i): Completing the Life Table</h4>
<p>Given (complete/year-by-year life table):</p>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>\\(x\\)</th><th>\\(l_x\\)</th><th>\\(d_x\\)</th><th>\\(L_x\\)</th><th>\\(T_x\\)</th><th>\\(e_x\\)</th></tr>
<tr><td>55</td><td>7940</td><td>525</td><td>—</td><td>—</td><td>—</td></tr>
<tr><td>56</td><td>—</td><td>520</td><td>—</td><td>—</td><td>—</td></tr>
<tr><td>57</td><td>—</td><td>510</td><td>—</td><td>11170</td><td>—</td></tr>
</table>

<p><strong>Step 1: Compute \\(l_x\\) values</strong></p>
<p>\\[l_{56} = l_{55} - d_{55} = 7940 - 525 = 7415\\]</p>
<p>\\[l_{57} = l_{56} - d_{56} = 7415 - 520 = 6895\\]</p>
<p>\\[l_{58} = l_{57} - d_{57} = 6895 - 510 = 6385\\]</p>

<p><strong>Step 2: Compute \\(L_x\\) values (one-year person-years: \\(L_x = (l_x + l_{x+1})/2\\))</strong></p>
<p>\\[L_{57} = \\frac{l_{57} + l_{58}}{2} = \\frac{6895 + 6385}{2} = 6640\\]</p>
<p>\\[L_{56} = \\frac{l_{56} + l_{57}}{2} = \\frac{7415 + 6895}{2} = 7155\\]</p>
<p>\\[L_{55} = \\frac{l_{55} + l_{56}}{2} = \\frac{7940 + 7415}{2} = 7677.5 \\approx 7678\\]</p>

<p><strong>Step 3: Compute \\(T_x\\) values using \\(T_x = T_{x+1} + L_x\\)</strong></p>
<p>\\[T_{56} = T_{57} + L_{56} = 11170 + 7155 = 18325\\]</p>
<p>\\[T_{55} = T_{56} + L_{55} = 18325 + 7678 = 26003\\]</p>

<p><strong>Step 4: Compute \\(e_x = T_x/l_x\\)</strong></p>
<p>\\[e_{55} = \\frac{26003}{7940} = 3.275\\text{ years}\\]</p>
<p>\\[e_{56} = \\frac{18325}{7415} = 2.471\\text{ years}\\]</p>
<p>\\[e_{57} = \\frac{11170}{6895} = 1.620\\text{ years}\\]</p>

<h4>Completed Life Table</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>\\(x\\)</th><th>\\(l_x\\)</th><th>\\(d_x\\)</th><th>\\(L_x\\)</th><th>\\(T_x\\)</th><th>\\(e_x\\)</th></tr>
<tr><td>55</td><td>7940</td><td>525</td><td>7678</td><td>26003</td><td>3.275</td></tr>
<tr><td>56</td><td>7415</td><td>520</td><td>7155</td><td>18325</td><td>2.471</td></tr>
<tr><td>57</td><td>6895</td><td>510</td><td>6640</td><td>11170</td><td>1.620</td></tr>
</table>

<h4>Part (ii): Population Growth Model \\(P(t) = B/(1+e^{-ut})\\)</h4>
<p>Given: \\(P(0) = 46{,}687\\) thousand, \\(u = 0.023\\).</p>
<p>At \\(t = 0\\):</p>
<p>\\[P(0) = \\frac{B}{1 + e^0} = \\frac{B}{2} = 46{,}687 \\implies B = 93{,}374\\text{ thousand}\\]</p>

<p>The model is:</p>
<p>\\[P(t) = \\frac{93{,}374}{1 + e^{-0.023t}}\\text{ (thousands)}\\]</p>

<p><strong>Populations at \\(t = 10, 20, 30\\):</strong></p>
<p>\\[P(10) = \\frac{93{,}374}{1 + e^{-0.23}} = \\frac{93{,}374}{1 + 0.7945} = \\frac{93{,}374}{1.7945} = 52{,}033\\text{ thousand}\\]</p>
<p>\\[P(20) = \\frac{93{,}374}{1 + e^{-0.46}} = \\frac{93{,}374}{1 + 0.6313} = \\frac{93{,}374}{1.6313} = 57{,}238\\text{ thousand}\\]</p>
<p>\\[P(30) = \\frac{93{,}374}{1 + e^{-0.69}} = \\frac{93{,}374}{1 + 0.5016} = \\frac{93{,}374}{1.5016} = 62{,}185\\text{ thousand}\\]</p>

<p>Note: \\(B = 93{,}374\\) thousand is the upper asymptotic (carrying capacity) of this logistic model. As \\(t \\to \\infty\\), \\(P(t) \\to 93{,}374\\) thousand. The inflection point (maximum growth rate) occurs when \\(P = B/2 = 46{,}687\\) thousand, i.e., at \\(t = 0\\).</p>`,

'4.3': `<h3>Fertility Rates Computation and Stable Population Theory</h3>

<h4>Part (i): Fertility Rate Calculations</h4>

<p>Given data (ratio of male births to female births = 16:15, so proportion female = 15/31):</p>

<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Age group</th><th>Female pop (\\(W_x\\))</th><th>Births (\\(B_x\\))</th><th>ASFR = \\(B_x/W_x\\) × 1000</th></tr>
<tr><td>15–19</td><td>15,000</td><td>760</td><td>50.67</td></tr>
<tr><td>20–24</td><td>12,000</td><td>2,300</td><td>191.67</td></tr>
<tr><td>25–29</td><td>9,690</td><td>2,000</td><td>206.40</td></tr>
<tr><td>30–34</td><td>8,900</td><td>1,300</td><td>146.07</td></tr>
<tr><td>35–39</td><td>7,600</td><td>570</td><td>75.00</td></tr>
<tr><td>40–44</td><td>6,700</td><td>160</td><td>23.88</td></tr>
<tr><td>45–49</td><td>4,500</td><td>20</td><td>4.44</td></tr>
<tr><td><strong>Total</strong></td><td>—</td><td>—</td><td><strong>698.13</strong></td></tr>
</table>

<p><strong>1. Age-specific fertility rates for specified groups:</strong></p>
<p>\\[\\text{ASFR}_{25-29} = \\frac{2000}{9690} \\times 1000 = \\mathbf{206.40}\\text{ per 1000}\\]</p>
<p>\\[\\text{ASFR}_{35-39} = \\frac{570}{7600} \\times 1000 = \\mathbf{75.00}\\text{ per 1000}\\]</p>
<p>\\[\\text{ASFR}_{45-49} = \\frac{20}{4500} \\times 1000 = \\mathbf{4.44}\\text{ per 1000}\\]</p>

<p><strong>2. Total Fertility Rate (TFR):</strong></p>
<p>\\[\\text{TFR} = 5 \\times \\sum_{x} \\text{ASFR}_x = 5 \\times 698.13\\text{ per 1000} = 3490.7\\text{ per 1000} = \\mathbf{3.491}\\text{ children per woman}\\]</p>

<p><strong>3. Gross Reproduction Rate (GRR):</strong></p>
<p>Proportion of births that are female: \\(f = 15/31 = 0.48387\\)</p>
<p>\\[\\text{GRR} = \\text{TFR} \\times f = 3.491 \\times 0.48387 = \\mathbf{1.689}\\text{ daughters per woman}\\]</p>
<p>(Alternatively, using sex ratio at birth 1.05:1, \\(f = 1/2.05 = 0.4878\\): GRR = 3.491 × 0.4878 = 1.703.)</p>

<h4>Part (ii): Stable Population Theory</h4>
<p>A <strong>stable population</strong> is one subject to constant age-specific fertility and mortality rates for long enough that its <em>age distribution</em> reaches a fixed shape (though total size may grow or decline). Developed by Alfred Lotka (1939).</p>

<h5>Euler–Lotka Equation</h5>
<p>\\[\\int_{\\alpha}^{\\beta} e^{-rx} p(x) m(x)\\, dx = 1\\]</p>
<p>where \\(r\\) = intrinsic rate of natural increase, \\(p(x)\\) = survival to age \\(x\\), \\(m(x)\\) = maternity function.</p>

<h5>Stable Age Distribution</h5>
<p>\\[c(a) = b \\cdot e^{-ra} \\cdot p(a)\\]</p>
<p>where \\(b\\) = intrinsic birth rate. This is independent of initial conditions (Lotka's ergodic theorem).</p>

<h5>Consequences for the Population</h5>
<ul>
<li>If \\(r > 0\\): population grows without bound (though maintaining stable age structure).</li>
<li>If \\(r < 0\\): population declines to zero (negative growth with stable age structure).</li>
<li>If \\(r = 0\\) (NRR = 1): population is stationary — a special case of stability.</li>
<li>In the modern fertility transition, many developed countries have \\(r < 0\\) with aging age structures.</li>
</ul>

<h5>Connection Between Stationary and Stable Population</h5>
<p>A <strong>stationary population</strong> is the special case of a stable population with \\(r = 0\\) and NRR = 1. In this case:</p>
<ul>
<li>Total births = Total deaths in every period.</li>
<li>Age structure = \\(_nL_x/T_0\\) — exactly the life table's person-years column, scaled by the total.</li>
<li>The birth rate \\(b = d = 1/e_0^0\\) (intrinsic birth rate equals the crude death rate, equals the reciprocal of life expectancy at birth).</li>
</ul>
<p>Every stationary population is stable, but a stable population need not be stationary (unless \\(r = 0\\)). Empirically, countries with prolonged low-mortality and replacement-level fertility approximate a stationary population.</p>`,

'4.4': `<h3>Yule's Method for Logistic Curve and UN Model Life Tables</h3>

<h4>Part (i): Yule's Method of Fitting the Logistic Curve</h4>
<p>Yule (1925) proposed fitting the logistic:</p>
<p>\\[N_t = \\frac{K}{1 + e^{a+bt}},\\quad b < 0\\]</p>
<p>to a dataset of \\(3n\\) equally-spaced observations (e.g., census years).</p>

<h5>Setup</h5>
<p>Divide the \\(3n\\) observations into three equal groups of \\(n\\) each:</p>
<ul>
<li>Group I: observations at \\(t_1, t_2, \\ldots, t_n\\) (earliest period)</li>
<li>Group II: observations at \\(t_{n+1}, \\ldots, t_{2n}\\)</li>
<li>Group III: observations at \\(t_{2n+1}, \\ldots, t_{3n}\\) (latest period)</li>
</ul>

<h5>Yule's Sums</h5>
<p>For the logistic in the form \\(1/N_t = A + B \\cdot f(t)\\), define:</p>
<p>\\[S_1 = \\sum_{i=1}^n \\frac{1}{N_{t_i}},\\quad S_2 = \\sum_{i=n+1}^{2n} \\frac{1}{N_{t_i}},\\quad S_3 = \\sum_{i=2n+1}^{3n} \\frac{1}{N_{t_i}}\\]</p>

<h5>Estimating \\(K\\) (Carrying Capacity)</h5>
<p>The key insight is that for an equally-spaced design with interval \\(h\\):</p>
<p>\\[K = \\frac{2S_1 S_3 - S_2^2}{S_1 + S_3 - 2S_2} \\cdot n \\cdot \\frac{\\text{(appropriate scaling)}}{1}\\]</p>
<p>More precisely, for the Pearl–Reed/Yule approach with three groups of \\(n\\) observations each, summing the reciprocals:</p>
<p>\\[K = \\frac{2n S_1 S_3 - n S_2^2}{n(S_1 + S_3) - 2n S_2}\\]</p>
<p>(For \\(n=1\\), this reduces to the standard three-point Pearl–Reed formula \\(K = (2P_1P_3 - P_2^2)/(P_1+P_3-2P_2)\\) in terms of \\(1/P\\).)</p>

<h5>Estimating \\(a\\) and \\(b\\)</h5>
<p>Once \\(K\\) is known, define \\(Y_t = \\ln(K/N_t - 1)\\). Since \\(Y_t = a + bt\\), perform ordinary least squares regression of \\(Y_t\\) on \\(t\\):</p>
<p>\\[b = \\frac{n\\sum t_i Y_i - (\\sum t_i)(\\sum Y_i)}{n\\sum t_i^2 - (\\sum t_i)^2},\\quad a = \\bar{Y} - b\\bar{t}\\]</p>

<h5>Limitation</h5>
<p>Yule's method requires the data to span both the acceleration and deceleration phases of the S-curve. If data are only from the early growth phase, \\(K\\) will be poorly estimated.</p>

<h4>Part (ii): UN Model Life Tables — Details and Drawbacks</h4>

<h5>United Nations Model Life Tables (1982/Manual X)</h5>
<p>The UN published five families of model life tables in <em>Manual X: Indirect Techniques for Demographic Estimation</em> (UN, 1983). Each family is characterised by a distinct pattern of age-specific mortality derived from empirical life tables of regions with similar mortality regimes.</p>

<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Family</th><th>Region</th><th>Characteristic mortality pattern</th></tr>
<tr><td><strong>Latin American</strong></td><td>Latin America</td><td>Relatively high child mortality (1–4 years); moderate infant and adult mortality.</td></tr>
<tr><td><strong>Chilean</strong></td><td>Chile and surroundings</td><td>Low infant mortality but higher child (1–4) mortality; adult mortality similar to General.</td></tr>
<tr><td><strong>South Asian</strong></td><td>India, Bangladesh, Pakistan</td><td>High infant and child mortality; adult mortality lower relative to child mortality. Higher female mortality at young adult ages.</td></tr>
<tr><td><strong>Far Eastern</strong></td><td>Japan, Taiwan, Korea</td><td>Low infant and child mortality; high adult mortality (especially males) at older ages.</td></tr>
<tr><td><strong>General</strong></td><td>Global average</td><td>Average pattern not fitting other families. Used as a fallback when the specific regional pattern is unclear.</td></tr>
</table>

<p>Within each family, levels of mortality are parameterised by \\(e_0^0\\) (life expectancy at birth) or \\(_{5}q_0\\) (under-5 mortality probability).</p>

<h5>Drawbacks of the UN Model Life Tables</h5>
<ol>
<li><strong>Based on limited data</strong>: The families were constructed from life tables of countries with relatively reliable data in the 1950s–1970s; they may not represent current mortality patterns in Africa, the Pacific, or newly emerging economies.</li>
<li><strong>Only five families</strong>: Mortality patterns in specific sub-regions (e.g., sub-Saharan Africa with high HIV/AIDS burden) may not match any of the five families well.</li>
<li><strong>No explicit cause-of-death structure</strong>: Mortality changes driven by specific causes (e.g., HIV/AIDS, cardiovascular disease, COVID-19) cannot be modelled by shifting between levels within the same family.</li>
<li><strong>Outdated</strong>: The Coale–Demeny (1983) and UN (1983) models may poorly represent modern low-mortality life tables (e.g., \\(e_0^0 > 80\\) years) — extrapolations to high-survival levels are unreliable.</li>
<li><strong>Assumes fixed age pattern of mortality</strong>: Within each family, the age pattern is fixed; in reality, mortality improvements are not uniform across all ages (e.g., faster improvements at old ages in Japan).</li>
<li><strong>Not well-calibrated for sub-Saharan Africa</strong>: The INDEPTH Model Life Tables (2004) and the Wilmoth et al. (2012) UN World Population Prospects model life tables were developed specifically to address this gap.</li>
</ol>`

};

// ─── 2020 SQC ─────────────────────────────────────────────────────────────────

data.paper4.sqc['2020'] = {

'7.1': `<h3>Control Charts as Hypothesis Tests and p-Chart Control Limits</h3>

<h4>Part (i): Control Chart as a Repeated Hypothesis Test</h4>
<p>Shewhart's control chart is conceptually equivalent to <strong>repeatedly performing a two-sided Z-test</strong> of the hypothesis \\(H_0: \\mu = \\mu_0\\) at each sample point:</p>
<ul>
<li><strong>\\(H_0\\)</strong>: Process is in control (only chance variation).</li>
<li><strong>\\(H_1\\)</strong>: Process is out of control (an assignable cause is present).</li>
<li><strong>Test statistic</strong>: \\(Z = (\\bar{X} - \\mu_0)/(\\sigma/\\sqrt{n})\\). Reject \\(H_0\\) if \\(|Z| > 3\\) (3-sigma rule).</li>
<li><strong>Type I error</strong> (\\(\\alpha\\)) = P(false alarm) = 0.0027 per sample → relates to producer's risk in acceptance sampling.</li>
<li><strong>Type II error</strong> (\\(\\beta\\)) = P(failing to detect a real shift) → corresponds to the OC curve of the control chart.</li>
</ul>
<p>The key differences from a single hypothesis test are: (a) the test is <em>repeated</em> continuously over time; (b) the ARL (average run length) concept replaces the single-test power; (c) run rules supplement the single-point test.</p>

<h4>Part (ii): p-Chart for Voltage Stabilizers</h4>
<p>Given fraction defective data over 15 days: 0.10, 0.20, 0.06, 0.04, 0.16, 0.02, 0.08, 0.06, 0.02, 0.16, 0.12, 0.14, 0.08, 0.10, 0.06</p>

<p><strong>Step 1: Compute \\(\\bar{p}\\)</strong></p>
<p>\\[\\text{Sum} = 0.10+0.20+0.06+0.04+0.16+0.02+0.08+0.06+0.02+0.16+0.12+0.14+0.08+0.10+0.06 = 1.40\\]</p>
<p>\\[\\bar{p} = \\frac{1.40}{15} = 0.0933\\]</p>

<p><strong>Step 2: Control Limits</strong> (with sample size \\(n\\) per day)</p>
<p>\\[\\text{UCL}_p = \\bar{p} + 3\\sqrt{\\frac{\\bar{p}(1-\\bar{p})}{n}} = 0.0933 + \\frac{3\\sqrt{0.0933 \\times 0.9067}}{\\sqrt{n}}\\]</p>
<p>\\[= 0.0933 + \\frac{3 \\times 0.2907}{\\sqrt{n}} = 0.0933 + \\frac{0.8720}{\\sqrt{n}}\\]</p>
<p>\\[\\text{LCL}_p = \\max\\left(0,\\; 0.0933 - \\frac{0.8720}{\\sqrt{n}}\\right)\\]</p>

<p>For example, if \\(n = 100\\) (a commonly assumed standard sample size when not specified):</p>
<p>\\[\\sqrt{n} = 10,\\quad \\sigma_{\\hat{p}} = \\sqrt{\\frac{0.0933 \\times 0.9067}{100}} = \\sqrt{0.008462} = 0.09199\\]</p>
<p>\\[\\text{UCL} = 0.0933 + 3 \\times 0.0920 = 0.0933 + 0.2760 = 0.3693\\]</p>
<p>\\[\\text{LCL} = 0.0933 - 0.2760 = -0.1827 \\rightarrow 0\\]</p>

<p><strong>Interpretation:</strong> With LCL = 0 and UCL ≈ 0.37, all 15 sample proportions (max = 0.20) fall within the control limits — the fraction defective process appears to be in statistical control. No assignable causes are signalled.</p>`,

'7.2': `<h3>Specification Limits vs. Control Limits and X-bar/R Chart Computation</h3>

<h4>Part (i): Specification Limits vs. Control Limits</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Feature</th><th>Specification Limits (USL, LSL)</th><th>Control Limits (UCL, LCL)</th></tr>
<tr><td>Defined by</td><td>Customer / design requirements</td><td>Process data (statistical calculation)</td></tr>
<tr><td>Based on</td><td>Product requirements</td><td>Process variability (\\(3\\sigma\\) from mean)</td></tr>
<tr><td>Applied to</td><td>Individual measurements</td><td>Sample statistics (\\(\\bar{X}\\), \\(R\\), \\(p\\), etc.)</td></tr>
<tr><td>Purpose</td><td>Define acceptable product quality</td><td>Detect assignable causes of variation</td></tr>
<tr><td>Changed by</td><td>Design team (process improvement)</td><td>Process itself (automatically recalculated from new data)</td></tr>
</table>
<p><strong>Key principle</strong>: Control limits must NOT be set equal to specification limits. A process can be in statistical control (all points within control limits) yet produce out-of-specification products if the process spread \\(6\\sigma\\) exceeds the tolerance width.</p>

<h4>Part (ii): X-bar and R Chart Computations</h4>
<p>Given: \\(\\bar{\\bar{X}} = 1.5056\\), \\(\\bar{R} = 0.3252\\), \\(n = 5\\), \\(A_2 = 0.577\\), \\(D_3 = 0\\), \\(D_4 = 2.114\\).</p>

<p><strong>\\(\\bar{X}\\)-Chart:</strong></p>
<p>\\[\\text{UCL}_{\\bar{X}} = \\bar{\\bar{X}} + A_2 \\bar{R} = 1.5056 + 0.577 \\times 0.3252 = 1.5056 + 0.1876 = \\mathbf{1.6932}\\]</p>
<p>\\[\\text{CL}_{\\bar{X}} = \\bar{\\bar{X}} = \\mathbf{1.5056}\\]</p>
<p>\\[\\text{LCL}_{\\bar{X}} = \\bar{\\bar{X}} - A_2 \\bar{R} = 1.5056 - 0.1876 = \\mathbf{1.3180}\\]</p>

<p><strong>\\(R\\)-Chart:</strong></p>
<p>\\[\\text{UCL}_{R} = D_4 \\bar{R} = 2.114 \\times 0.3252 = \\mathbf{0.6877}\\]</p>
<p>\\[\\text{CL}_{R} = \\bar{R} = \\mathbf{0.3252}\\]</p>
<p>\\[\\text{LCL}_{R} = D_3 \\bar{R} = 0 \\times 0.3252 = \\mathbf{0}\\]</p>

<p><strong>Strategy when points fall outside control limits:</strong></p>
<ol>
<li><strong>Investigate immediately</strong>: Identify and document the assignable cause (machine malfunction, material change, operator error, measurement error).</li>
<li><strong>Eliminate the cause</strong>: Take corrective action (adjust machine, retrain operator, change material).</li>
<li><strong>Remove the out-of-control point(s)</strong> from the baseline data.</li>
<li><strong>Recalculate control limits</strong> from the remaining in-control data.</li>
<li><strong>Repeat</strong> until all remaining points are within the revised limits.</li>
<li><strong>Implement revised limits</strong> for ongoing monitoring.</li>
</ol>`,

'7.3': `<h3>OC Curve: Distinguishing Lot Quality, Comparing Plans, and Interpretation for X-bar Chart</h3>

<h4>How the OC Curve Reveals Discriminating Ability</h4>
<p>The <strong>Operating Characteristic (OC) curve</strong> plots \\(P_a(p)\\) — the probability of accepting a lot — against the true fraction defective \\(p\\) (for attribute plans) or the true process mean shift \\(\\delta\\) (for control charts).</p>

<h5>For an Ideal Sampling Plan</h5>
<p>An ideal plan would have \\(P_a = 1\\) for \\(p \\leq \\text{AQL}\\) and \\(P_a = 0\\) for \\(p > \\text{LTPD}\\) — a perfect step function. In reality, due to sampling error, the OC curve is an S-shaped curve that:</p>
<ul>
<li>Starts near \\(P_a = 1\\) for low \\(p\\) (good lots are usually accepted).</li>
<li>Decreases as \\(p\\) increases.</li>
<li>Ends near \\(P_a = 0\\) for high \\(p\\) (bad lots are usually rejected).</li>
</ul>
<p>A <strong>steeper</strong> OC curve indicates better discriminating ability — the plan sharply distinguishes good from bad lots. A <strong>flat</strong> OC curve indicates poor discrimination — even very bad lots have a high probability of acceptance.</p>

<h5>Comparing Two Sampling Plans via OC Curves</h5>
<ol>
<li>Plot both OC curves on the same graph.</li>
<li>Identify the <strong>producer's risk point</strong> \\((\\text{AQL}, 1-\\alpha)\\) for each plan.</li>
<li>Identify the <strong>consumer's risk point</strong> \\((\\text{LTPD}, \\beta)\\) for each plan.</li>
<li>The plan with the steeper curve (crossing both risk points with smaller \\(n\\)) is more efficient.</li>
<li>For same \\(n\\) and \\(c\\), the plan with smaller \\(c/n\\) ratio is more stringent.</li>
<li>Compare ASN curves if comparing single vs. double vs. sequential plans — the plan with lowest ASN at AQL is most economical.</li>
</ol>

<h4>OC Curve for Control Charts: X-bar Chart</h4>
<p>For the \\(\\bar{X}\\)-chart with 3-sigma limits, when the process mean shifts to \\(\\mu_1 = \\mu_0 + \\delta\\sigma\\):</p>
<p>\\[\\beta(\\delta) = P(\\text{no signal} \\mid \\delta) = \\Phi\\!\\left(3 - \\delta\\sqrt{n}\\right) - \\Phi\\!\\left(-3 - \\delta\\sqrt{n}\\right)\\]</p>

<p>Key points on the OC curve (for \\(n = 4\\)):</p>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Shift \\(\\delta\\) (in \\(\\sigma\\) units)</th><th>\\(\\beta(\\delta) = P(\\text{no signal})\\)</th><th>Power \\(= 1 - \\beta\\)</th></tr>
<tr><td>0 (in control)</td><td>0.9973</td><td>0.0027</td></tr>
<tr><td>0.5</td><td>0.9772</td><td>0.0228</td></tr>
<tr><td>1.0</td><td>0.8413</td><td>0.1587</td></tr>
<tr><td>1.5</td><td>0.6827</td><td>0.3173</td></tr>
<tr><td>2.0</td><td>0.3830</td><td>0.6170</td></tr>
<tr><td>3.0</td><td>0.0228</td><td>0.9772</td></tr>
</table>

<p><strong>Interpretation:</strong></p>
<ul>
<li>At \\(\\delta = 0\\): probability of a false alarm on any single sample is 0.0027 (\\(\\alpha = 0.0027\\)).</li>
<li>The \\(\\bar{X}\\)-chart is slow to detect small shifts (e.g., \\(\\delta = 1\\): only 15.9% probability per sample). The ARL for detecting a 1\\(\\sigma\\) shift is \\(1/0.1587 \\approx 6.3\\) samples.</li>
<li>To improve sensitivity to small shifts, use CUSUM or EWMA charts, or increase \\(n\\).</li>
</ul>`,

'7.4': `<h3>Process Capability Studies and the \\(C_p\\) Index</h3>

<h4>What is a Process Capability Study?</h4>
<p>A <strong>process capability study</strong> is a systematic statistical investigation of a stable process (i.e., in statistical control) to determine its ability to meet engineering specifications or customer requirements. It involves:</p>
<ol>
<li>Establishing that the process is in statistical control (no assignable causes).</li>
<li>Collecting data on the quality characteristic of interest.</li>
<li>Checking for normality.</li>
<li>Estimating \\(\\mu\\) and \\(\\sigma\\) from the control chart data.</li>
<li>Computing and interpreting capability indices.</li>
</ol>

<h4>Reasons for Lack of Process Capability (Two-sided Tolerance)</h4>
<p>For a two-sided specification \\([\\text{LSL}, \\text{USL}]\\), lack of capability occurs when:</p>
<ol>
<li><strong>Excessive process variability</strong>: The natural process spread \\(6\\hat{\\sigma}\\) exceeds the tolerance width \\((\\text{USL} - \\text{LSL})\\) — inherent spread too large. \\(C_p < 1\\).</li>
<li><strong>Process off-target</strong>: The process mean \\(\\hat{\\mu}\\) is not centred on the specification midpoint \\(M = (\\text{USL}+\\text{LSL})/2\\), causing excess defects on the nearer specification boundary. \\(C_{pk} < C_p\\).</li>
<li><strong>Both problems simultaneously</strong>: Large variability AND poor centering.</li>
<li><strong>Non-normality</strong>: Heavy tails or skewness cause more tail-area defects than predicted by normal-distribution-based indices.</li>
<li><strong>Measurement system error</strong>: Gauge repeatability and reproducibility (GR&R) error inflates the observed \\(\\sigma\\), making the process appear less capable than it actually is.</li>
</ol>

<h4>Using \\(C_p\\) to Measure Process Capability</h4>
<p>\\[C_p = \\frac{\\text{USL} - \\text{LSL}}{6\\hat{\\sigma}}\\]</p>
<p>where \\(\\hat{\\sigma} = \\bar{R}/d_2\\) or \\(\\bar{s}/c_4\\) (from control chart data, not overall standard deviation).</p>

<h5>Interpretation</h5>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>\\(C_p\\) Value</th><th>Capability</th><th>Approx. DPMO (if centred)</th></tr>
<tr><td>\\(C_p \\geq 2.0\\)</td><td>Six Sigma capable (world class)</td><td>0.002 DPMO</td></tr>
<tr><td>\\(1.33 \\leq C_p < 2.0\\)</td><td>Capable (standard requirement)</td><td>64 DPMO</td></tr>
<tr><td>\\(1.0 \\leq C_p < 1.33\\)</td><td>Marginally capable; monitor closely</td><td>2700 DPMO</td></tr>
<tr><td>\\(C_p < 1.0\\)</td><td>Incapable; must improve process</td><td>&gt;2700 DPMO</td></tr>
</table>

<h5>Limitation of \\(C_p\\)</h5>
<p>\\(C_p\\) measures only the <em>potential</em> capability (assuming perfect centering). It ignores whether \\(\\mu\\) equals the specification midpoint. Always report \\(C_p\\) alongside \\(C_{pk}\\) to distinguish between centering and spread issues. When \\(C_p = C_{pk}\\), the process is perfectly centred.</p>`,

'7.5': `<h3>Single Sampling Plan: Working and Design Using Producer's and Consumer's Risk</h3>

<h4>Working of a Single Sampling Plan SSP\\((N, n, c)\\)</h4>
<ol>
<li>From a submitted lot of \\(N\\) items, draw a <strong>random sample</strong> of size \\(n\\).</li>
<li>Inspect all \\(n\\) items and count defectives \\(d\\).</li>
<li><strong>Accept</strong> the lot if \\(d \\leq c\\) (acceptance number).</li>
<li><strong>Reject</strong> (or screen the entire lot) if \\(d > c\\).</li>
</ol>
<p>The OC function (probability of acceptance):</p>
<p>\\[P_a(p) = \\sum_{d=0}^c \\binom{n}{d} p^d(1-p)^{n-d}\\quad \\text{(Binomial)}\\]</p>
<p>or exact Hypergeometric when \\(N\\) is small.</p>

<h4>Designing SSP Using Producer's and Consumer's Risk</h4>

<h5>Definitions</h5>
<ul>
<li><strong>AQL (Acceptable Quality Level)</strong> = \\(p_1\\): The maximum defective rate that is considered acceptable to the consumer; lots at this quality should be accepted with high probability.</li>
<li><strong>Producer's risk (\\(\\alpha\\))</strong>: \\(P(\\text{reject} \\mid p = p_1) = 1 - P_a(p_1)\\); the risk that a good lot is erroneously rejected. Typically \\(\\alpha = 0.05\\).</li>
<li><strong>LTPD/RQL</strong> = \\(p_2\\): The Lot Tolerance Percent Defective; lots at this quality should be rejected with high probability.</li>
<li><strong>Consumer's risk (\\(\\beta\\))</strong>: \\(P(\\text{accept} \\mid p = p_2) = P_a(p_2)\\); the risk that a bad lot is erroneously accepted. Typically \\(\\beta = 0.10\\).</li>
</ul>

<h5>Design Procedure</h5>
<p>We need to find \\(n\\) and \\(c\\) such that:</p>
<p>\\[P_a(p_1) \\geq 1 - \\alpha \\quad \\text{and} \\quad P_a(p_2) \\leq \\beta\\]</p>

<p><strong>Poisson Approximation Method</strong> (for small \\(p\\), large \\(n\\)):</p>
<p>Let \\(\\lambda_1 = np_1\\) and \\(\\lambda_2 = np_2\\). From Poisson tables:</p>
<p>\\[P(X \\leq c \\mid \\lambda_1) \\geq 1 - \\alpha\\quad\\text{and}\\quad P(X \\leq c \\mid \\lambda_2) \\leq \\beta\\]</p>
<p>The ratio \\(\\lambda_2/\\lambda_1 = p_2/p_1\\) is used with the nomograph or table of \\(c\\) and \\(\\lambda_2/\\lambda_1\\) to find the unique \\((c^*, \\lambda_2^*)\\) pair.</p>
<p>Then: \\(n = \\lambda_2^*/p_2\\).</p>

<p><strong>Example:</strong> If \\(p_1 = 0.01\\), \\(\\alpha = 0.05\\), \\(p_2 = 0.06\\), \\(\\beta = 0.10\\), then \\(p_2/p_1 = 6\\). From Poisson OC tables, \\(c = 3\\) and \\(\\lambda_2 = 6.68\\) gives \\(n = 6.68/0.06 \\approx 112\\).</p>`,

'8.1': `<h3>Statistical Control, Out-of-Control Detection, 3-Sigma Limits, and Variables vs. Attributes Charts</h3>

<h4>When is a Process in Statistical Control?</h4>
<p>A process is said to be in <strong>statistical control</strong> (or "in control") when:</p>
<ul>
<li>All observed variation is due to <strong>common (chance) causes</strong> — inherent, random variation that is always present and cannot be eliminated without fundamentally redesigning the process.</li>
<li>There are <strong>no assignable (special) causes</strong> of variation — systematic, non-random patterns caused by identifiable factors such as machine wear, operator changes, material batch differences.</li>
<li>Statistically: the process output is a sequence of independent and identically distributed (i.i.d.) observations from a stable probability distribution.</li>
</ul>

<h4>Deciding Out-of-Control Using a Control Chart</h4>
<ol>
<li><strong>Primary rule</strong>: One point beyond 3-sigma control limits.</li>
<li><strong>Run of 8</strong>: Eight consecutive points on one side of the centre line.</li>
<li><strong>Trends</strong>: Six or more consecutive points steadily increasing or decreasing.</li>
<li><strong>2-of-3 rule</strong>: Two of three consecutive points in Zone A (beyond \\(2\\sigma\\)).</li>
<li><strong>4-of-5 rule</strong>: Four of five consecutive points in Zone B (beyond \\(1\\sigma\\)).</li>
</ol>

<h4>Relevance of 3-Sigma Limits</h4>
<p>Shewhart chose \\(\\pm 3\\sigma\\) as a pragmatic balance between:</p>
<ul>
<li><strong>False alarm rate</strong>: At \\(3\\sigma\\), P(false alarm) = 0.0027 — low enough to avoid chasing spurious signals but not so low as to miss real shifts. (At \\(2\\sigma\\): 4.55% — too many false alarms; at \\(4\\sigma\\): 0.0063% — too insensitive.)</li>
<li><strong>Chebyshev's bound</strong>: Regardless of the distribution, \\(P(|X - \\mu| > 3\\sigma) \\leq 1/9 = 11.1\\%\\) — the \\(3\\sigma\\) rule provides a distribution-free safety guarantee for non-normal data.</li>
<li><strong>Economic balance</strong>: The cost of investigating a false alarm (too many signals) vs. the cost of missing a real shift (too few signals).</li>
</ul>

<h4>Control Charts for Variables vs. Attributes</h4>
<table border="1" style="border-collapse:collapse; width:100%;">
<tr><th>Feature</th><th>Variables Charts</th><th>Attributes Charts</th></tr>
<tr><td>Data type</td><td>Continuous measurements</td><td>Count/pass-fail (discrete)</td></tr>
<tr><td>Examples</td><td>Weight, diameter, tensile strength</td><td>Fraction defective, number of defects</td></tr>
<tr><td>Charts used</td><td>\\(\\bar{X}\\)-R, \\(\\bar{X}\\)-s, EWMA, individuals (I-MR)</td><td>p-chart, np-chart, c-chart, u-chart</td></tr>
<tr><td>Information content</td><td>High (detect both mean and spread shifts)</td><td>Lower (only detects proportion changes)</td></tr>
<tr><td>Sample size needed</td><td>Small (\\(n = 4\\) to 10)</td><td>Large (\\(n \\geq 50\\) for p-chart)</td></tr>
<tr><td>Control limits (example)</td><td>UCL = \\(\\bar{\\bar{X}} + A_2 \\bar{R}\\)</td><td>UCL = \\(\\bar{p} + 3\\sqrt{\\bar{p}(1-\\bar{p})/n}\\)</td></tr>
</table>`,

'8.2': `<h3>Key Concepts in Acceptance Sampling: AQL, LTPD, AOQ, AOQL, ATI, and ASN</h3>

<h4>(i) AQL — Acceptable Quality Level</h4>
<p>The <strong>Acceptable Quality Level (AQL)</strong> is the maximum percent defective (or maximum number of defects per hundred units) that, for the purpose of acceptance sampling, can be considered <em>satisfactory as a process average</em>. It is the quality level at the lower, "good" end of the OC curve where the producer's risk applies. Defined in ISO 2859-1 (formerly MIL-STD-1916) as the quality level that the sampling plan will accept with probability \\(1 - \\alpha\\) (typically 0.95). AQL ≠ acceptable quality for individual lots; it is a <em>long-run average</em> concept.</p>

<h4>(ii) LTPD — Lot Tolerance Percent Defective</h4>
<p>The <strong>Lot Tolerance Percent Defective (LTPD)</strong> (or Rejectable Quality Level, RQL) is the maximum percent defective in a lot that the consumer is willing to <em>tolerate</em> with only a small probability (consumer's risk \\(\\beta\\)). Lots at or above LTPD quality level should be rejected with probability \\(1 - \\beta \\geq 0.90\\) (i.e., \\(\\beta \\leq 0.10\\)). The LTPD defines the "bad" quality level on the OC curve.</p>

<h4>(iii) AOQ — Average Outgoing Quality</h4>
<p>Under <strong>rectifying inspection</strong> (rejected lots are 100% screened and all defectives replaced with good units), the <strong>Average Outgoing Quality (AOQ)</strong> is:</p>
<p>\\[\\text{AOQ}(p) = \\frac{p \\cdot P_a(p) \\cdot (N - n)}{N}\\]</p>
<p>For large \\(N\\): \\(\\text{AOQ}(p) \\approx p \\cdot P_a(p)\\).</p>
<p>AOQ starts at 0 (for \\(p = 0\\)), rises to a maximum, then falls back to 0 (for \\(p = 1\\), all lots rejected and screened).</p>

<h4>(iv) AOQL — Average Outgoing Quality Limit</h4>
<p>The <strong>Average Outgoing Quality Limit (AOQL)</strong> is the maximum value of the AOQ curve over all possible incoming quality levels \\(p\\):</p>
<p>\\[\\text{AOQL} = \\max_p \\text{AOQ}(p)\\]</p>
<p>It represents the <em>worst-case</em> average quality that will exit the inspection system under rectifying inspection. Dodge and Romig sampling tables are indexed by AOQL, ensuring the average outgoing quality never exceeds the AOQL regardless of incoming quality.</p>

<h4>(v) ATI — Average Total Inspection</h4>
<p>Under rectifying inspection, the <strong>Average Total Inspection (ATI)</strong> is the expected total number of units inspected per lot:</p>
<p>\\[\\text{ATI}(p) = n + (1 - P_a(p)) \\cdot (N - n)\\]</p>
<p>At \\(p \\to 0\\): \\(P_a \\to 1\\), ATI \\(\\to n\\) (only sample inspected). At \\(p \\to 1\\): \\(P_a \\to 0\\), ATI \\(\\to N\\) (entire lot inspected). ATI is used to evaluate the economic cost of the inspection plan.</p>

<h4>(vi) ASN — Average Sample Number</h4>
<p>The <strong>Average Sample Number (ASN)</strong) is the expected number of items inspected per lot under the sampling plan. For a <em>single sampling plan</em>, ASN \\(= n\\) (constant). For a <em>double sampling plan</em>:</p>
<p>\\[\\text{ASN}(p) = n_1 + n_2 \\cdot P(\\text{second sample taken})\\]</p>
<p>For a <em>sequential sampling plan</em>, ASN \\(< n_{\\text{SSP}}\\) for extreme \\(p\\) values. The ASN curve is used to compare efficiency across different sampling plan types.</p>`,

'8.3': `<h3>CUSUM Charts: Decision-Making and V-Mask Construction</h3>

<h4>What are CUSUM Charts?</h4>
<p>The <strong>Cumulative Sum (CUSUM) chart</strong>, introduced by E.S. Page (1954), plots the cumulative sum of deviations of sample observations from a target value \\(\\mu_0\\). Unlike the Shewhart chart (which uses only the current point), CUSUM accumulates evidence from all past observations, making it highly sensitive to small, sustained shifts.</p>

<h4>Decision Using Tabular CUSUM</h4>
<p>For monitoring upward and downward shifts, define two statistics:</p>
<p>\\[C_i^+ = \\max[0,\\ C_{i-1}^+ + (x_i - \\mu_0 - k)]\\]</p>
<p>\\[C_i^- = \\max[0,\\ C_{i-1}^- - (x_i - \\mu_0 - k) + k - k]\\]</p>
<p>More precisely:</p>
<p>\\[C_i^- = \\max[0,\\ C_{i-1}^- + (\\mu_0 - k - x_i)]\\]</p>
<p>Parameters: \\(k\\) = reference (allowance) value, typically \\(k = \\delta\\sigma/2\\) for detecting shift \\(\\delta\\sigma\\). \\(h\\) = decision interval, typically \\(h = 4\\sigma\\) to \\(5\\sigma\\).</p>

<p><strong>Decision rules:</strong></p>
<ul>
<li>Signal <em>upward shift</em> when \\(C_i^+ > h\\).</li>
<li>Signal <em>downward shift</em> when \\(C_i^- > h\\).</li>
<li>After a signal, reset the triggered statistic to 0 (or to \\(C_i^+ - h\\) for the "fast initial response" restart).</li>
</ul>

<h4>V-Mask Construction and Decision</h4>
<p>The <strong>V-mask</strong> is a V-shaped overlay placed on the CUSUM plot at the current point. The cumulative sum plotted is:</p>
<p>\\[S_m = \\sum_{i=1}^m (x_i - \\mu_0)\\]</p>

<p><strong>V-mask parameters:</strong></p>
<ul>
<li><strong>Lead distance \\(d\\)</strong>: The horizontal distance from the vertex of the V to the current point (plotted to the right of the vertex).</li>
<li><strong>Half-angle \\(\\theta\\)</strong>: The angle each arm makes with the horizontal axis.</li>
</ul>
<p>The V-mask is defined by:</p>
<p>\\[d = \\frac{h\\sigma^2 + k^2\\sigma^2/2}{\\delta\\sigma \\cdot \\sigma_x}\\]\\quad (\\text{simplified})\\]</p>
<p>In standardised units (scale = \\(\\sigma_x\\) per unit of time):</p>
<p>\\[\\tan\\theta = k = \\frac{\\Delta\\mu}{2}\\quad \\text{and}\\quad d = \\frac{h}{k}\\]</p>

<p><strong>Decision:</strong> A signal occurs when <em>any previous point on the CUSUM plot falls outside either arm of the V-mask</em>. The V-mask is re-applied at each new observation.</p>

<h4>Equivalence of Tabular and V-Mask CUSUM</h4>
<p>The tabular CUSUM (\\(C^+, C^-\\)) and the V-mask are mathematically equivalent representations of the same sequential procedure. The tabular form is preferred in modern practice for computational convenience and automation.</p>`,

'8.4': `<h3>OC Function: Hypergeometric vs. Binomial, and EWMA Control Charts</h3>

<h4>Part (i): Assumptions for OC Function Computation</h4>

<h5>1. Hypergeometric Distribution</h5>
<p><strong>Assumptions:</strong></p>
<ul>
<li>The lot has a finite, known size \\(N\\).</li>
<li>The lot contains exactly \\(D = Np\\) defective items (sampling <em>without replacement</em>).</li>
<li>The sample of size \\(n\\) is drawn at random without replacement.</li>
</ul>
<p><strong>OC function:</strong></p>
<p>\\[P_a(p) = P(X \\leq c) = \\sum_{d=0}^c \\frac{\\binom{D}{d}\\binom{N-D}{n-d}}{\\binom{N}{n}}\\]</p>
<p>where \\(D = Np\\) is the number of defectives in the lot.</p>
<p><strong>Example:</strong> \\(N = 100\\), \\(n = 10\\), \\(c = 1\\), \\(D = 5\\): \\(P_a = \\sum_{d=0}^1 \\binom{5}{d}\\binom{95}{10-d}/\\binom{100}{10}\\).</p>

<h5>2. Binomial Distribution</h5>
<p><strong>Assumptions:</strong></p>
<ul>
<li>The lot is very large (effectively infinite), so sampling with or without replacement gives the same result (\\(N \\to \\infty\\), or \\(n/N < 0.10\\)).</li>
<li>Each item has an independent probability \\(p\\) of being defective.</li>
<li>The sample is drawn randomly.</li>
</ul>
<p><strong>OC function:</strong></p>
<p>\\[P_a(p) = \\sum_{d=0}^c \\binom{n}{d} p^d (1-p)^{n-d}\\]</p>
<p><strong>Example:</strong> \\(n = 50\\), \\(c = 2\\), \\(p = 0.04\\): \\(P_a = \\sum_{d=0}^2 \\binom{50}{d}(0.04)^d(0.96)^{50-d}\\).</p>

<p><strong>When is Binomial preferred over Hypergeometric?</strong> When \\(N \\geq 10n\\) (sampling fraction ≤ 10%), the binomial is an excellent approximation and much easier to compute. For small lots (\\(N < 10n\\)), the hypergeometric is required for accuracy.</p>
<p>For very small \\(p\\) and large \\(n\\) with \\(np \\leq 5\\), the <strong>Poisson approximation</strong> (\\(\\lambda = np\\)) is further used: \\(P_a \\approx \\sum_{d=0}^c e^{-\\lambda}\\lambda^d/d!\\).</p>

<h4>Part (ii): EWMA Control Charts for Process Mean</h4>
<p>The <strong>EWMA</strong> statistic at sample \\(i\\):</p>
<p>\\[Z_i = \\lambda x_i + (1-\\lambda)Z_{i-1},\\quad Z_0 = \\mu_0\\text{ (or }\\bar{x}\\text{ if standards not given)}\\]</p>
<p>Parameter \\(\\lambda \\in (0, 1]\\); typical values: 0.05–0.25 for detecting small shifts.</p>

<p><strong>Variance of \\(Z_i\\):</strong></p>
<p>\\[\\text{Var}(Z_i) = \\frac{\\sigma^2}{n} \\cdot \\frac{\\lambda}{2-\\lambda} \\cdot \\left[1 - (1-\\lambda)^{2i}\\right]\\]</p>

<p><strong>Steady-state control limits:</strong></p>
<p>\\[\\text{UCL} = \\mu_0 + L\\,\\frac{\\sigma}{\\sqrt{n}}\\sqrt{\\frac{\\lambda}{2-\\lambda}}\\]</p>
<p>\\[\\text{CL} = \\mu_0\\]</p>
<p>\\[\\text{LCL} = \\mu_0 - L\\,\\frac{\\sigma}{\\sqrt{n}}\\sqrt{\\frac{\\lambda}{2-\\lambda}}\\]</p>
<p>where \\(L \\approx 3\\) (or chosen from ARL tables; Montgomery 2020 recommends \\(L = 2.814\\) for \\(\\lambda = 0.10\\) to achieve ARL\\(_0 = 370\\)).</p>

<p>For the transient period (small \\(i\\)), use time-varying limits:</p>
<p>\\[\\text{UCL}_i = \\mu_0 + L\\,\\frac{\\sigma}{\\sqrt{n}}\\sqrt{\\frac{\\lambda}{2-\\lambda}[1-(1-\\lambda)^{2i}]}\\]</p>
<p>These converge to the steady-state limits as \\(i\\) increases.</p>`

};

fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
console.log('Done: 2020 written.');
console.log('JSON size (MB):', (fs.statSync(FILE).size / 1e6).toFixed(2));

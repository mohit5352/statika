'use strict';
const fs = require('fs');
const path = require('path');

const EXP_PATH = path.join(__dirname, '../src/data/explanations.json');
const exp = JSON.parse(fs.readFileSync(EXP_PATH, 'utf8'));

// ─── DEMOGRAPHY 2024 ────────────────────────────────────────────────────────

exp.paper4.demography['2024'] = {

'3.1': `<h3><b>UPSC ISS Statistics Paper IV (2024) — Model Solution</b></h3><br>
<p><em>Reference: Chiang, C.L., The Life Table and its Applications (1984); Spiegelman, M., Introduction to Demography (1968).</em></p>

<h4><b>1. Definition and Formula for Force of Mortality</b></h4>
<p>The <b>force of mortality</b> (hazard rate) at exact age $x$ is:</p>
$$\\mu_x = -\\frac{1}{l_x}\\frac{dl_x}{dx} = -\\frac{d}{dx}\\ln l_x$$
<p>It represents the instantaneous rate of mortality: $\\mu_x\\,dt$ is the conditional probability of death in $(x,\\, x+dt)$ given survival to age $x$. Since $l_x$ is a non-increasing function of $x$, $\\mu_x \\geq 0$ always.</p>
<p><b>Derivation:</b> Consider $l_{x+h}$ for small $h > 0$:</p>
$$\\mu_x = \\lim_{h \\to 0^+} \\frac{1}{h}\\,P(\\text{death in }(x, x+h) \\mid \\text{alive at }x) = \\lim_{h \\to 0^+}\\frac{l_x - l_{x+h}}{h\\,l_x} = -\\frac{1}{l_x}\\frac{dl_x}{dx}$$

<h4><b>2. Calculation: $l(x) = 100\\sqrt{100-x}$, find $\\mu(84)$</b></h4>
<p>Given: $l(x) = 100(100-x)^{1/2}$</p>
<p><b>Method — Direct differentiation:</b></p>
$$\\frac{dl}{dx} = 100 \\cdot \\frac{1}{2}(100-x)^{-1/2} \\cdot (-1) = -\\frac{50}{\\sqrt{100-x}}$$
$$\\mu(x) = -\\frac{1}{l(x)}\\frac{dl}{dx} = -\\frac{1}{100\\sqrt{100-x}} \\cdot \\left(-\\frac{50}{\\sqrt{100-x}}\\right) = \\frac{50}{100(100-x)} = \\frac{1}{2(100-x)}$$
$$\\mu(84) = \\frac{1}{2(100-84)} = \\frac{1}{2 \\times 16} = \\frac{1}{32} = \\mathbf{0.03125}$$
<p><b>Alternative — via $\\ln l(x)$:</b> $\\ln l(x) = \\ln 100 + \\frac{1}{2}\\ln(100-x)$; differentiating: $\\mu(x) = -\\frac{d}{dx}\\ln l = -\\frac{1}{2}\\cdot\\frac{-1}{100-x} = \\frac{1}{2(100-x)}$. Same result. ✓</p>`,

'3.2': `<h3><b>UPSC ISS Statistics Paper IV (2024) — Model Solution</b></h3><br>
<p><em>Reference: Bogue, D.J., Principles of Demography (1969); UN Manual VI — Methods of Measuring Internal Migration (1970); Hamilton, C.H., Demography 2 (1965).</em></p>

<h4><b>1. Types of Migration</b></h4>
<p><b>Internal migration:</b> Movement within national boundaries. Four streams:</p>
<ul>
  <li><b>Rural–Urban (R–U):</b> Dominant in developing countries; pull of employment and infrastructure.</li>
  <li><b>Urban–Rural (U–R):</b> Counter-urbanisation (developed countries), retirement migration.</li>
  <li><b>Rural–Rural (R–R):</b> Agricultural movement, colonisation of new land.</li>
  <li><b>Urban–Urban (U–U):</b> Corporate transfers, inter-city professional movement.</li>
</ul>
<p><b>By duration:</b> Permanent, temporary/seasonal, circular commuting.</p>
<p><b>International migration:</b> Cross-border movement — immigration, emigration, refugees, asylum seekers, economic migrants. UN (1998) defines long-term migrants (12+ months) as the reference group for population statistics.</p>

<h4><b>2. Vital Statistics Method of Estimating Net Migration</b></h4>
<p>This is the <b>residual method</b>: for a geographic area between two censuses (interval $n$ years):</p>
$$\\text{Net Migration} = P_{t+n} - P_t - (B - D)$$
<ul>
  <li>$P_t$ = population at census time $t$ (from census)</li>
  <li>$P_{t+n}$ = population at census time $t+n$ (from next census)</li>
  <li>$B$ = total registered live births in the interval $[t,\\, t+n]$</li>
  <li>$D$ = total registered deaths in the interval $[t,\\, t+n]$</li>
</ul>
<p>A positive residual implies net in-migration; negative implies net out-migration.</p>
<p><b>Net Migration Rate:</b></p>
$$\\text{NMR} = \\frac{I - E}{\\bar{P}} \\times 1000 \\quad \\text{where } \\bar{P} = \\frac{P_t + P_{t+n}}{2}$$

<h4><b>3. Limitations of the Vital Statistics Method</b></h4>
<ul>
  <li><b>Under-registration bias:</b> Incomplete registration of births and deaths leads to underestimation of natural increase, artificially inflating net migration estimates.</li>
  <li><b>Boundary changes:</b> If the geographic unit changes between censuses, the method is unreliable.</li>
  <li><b>No age-sex detail:</b> The method gives only aggregate net migration; age-sex-specific migration requires the survival ratio method.</li>
  <li><b>Double counting:</b> Multiple moves by the same individual between censuses are not captured — only net position is measured.</li>
</ul>`,

'3.3': `<h3><b>UPSC ISS Statistics Paper IV (2024) — Model Solution</b></h3><br>
<p><em>Reference: Lotka, A.J. (1939); Coale, A.J., The Growth and Structure of Human Populations (1972); Keyfitz, N. &amp; Caswell, H., Applied Mathematical Demography (3rd ed., 2005).</em></p>

<h4><b>1. Stable Population</b></h4>
<p>A <b>stable population</b> is one in which age-specific fertility and mortality rates have remained constant for a long time, producing a fixed age distribution and a constant exponential rate of growth $r$ (the intrinsic rate of natural increase). The proportion in age group $[x, x+dx)$ is:</p>
$$c(x) = b\\,e^{-rx}\\,p(x)$$
<p>where $b$ is the birth rate and $p(x) = l_x/l_0$ is the survival function. The Euler–Lotka equation determines $r$: $\\int_0^\\beta e^{-rx}p(x)m(x)\\,dx = 1$.</p>
<p><b>Properties:</b> Fixed age composition; constant birth and death rates; exponential total growth; unique long-run attractor (weak ergodicity).</p>

<h4><b>2. Stationary Population</b></h4>
<p>A <b>stationary population</b> is a stable population with $r = 0$ (NRR = 1). Total population size is constant over time. It is equivalent to the life table population itself — $c(x)\\,dx = b\\cdot p(x)\\,dx$ with $b = 1/e_0^0$ (birth rate = reciprocal of life expectancy at birth).</p>
<p><b>Properties:</b> Constant population size; age distribution $c(x) = l_x/(l_0\\,e_0^0)$; birth rate = death rate; NRR = 1.</p>

<h4><b>3. Comparison</b></h4>
<table border="1" cellpadding="5" style="border-collapse:collapse; width:100%;">
  <tr><th>Feature</th><th>Stable</th><th>Stationary</th></tr>
  <tr><td>Growth rate $r$</td><td>Any constant $r$</td><td>$r = 0$ (special case)</td></tr>
  <tr><td>NRR</td><td>Any value</td><td>NRR = 1</td></tr>
  <tr><td>Population size</td><td>Growing/declining</td><td>Constant</td></tr>
  <tr><td>Age distribution</td><td>$b\\,e^{-rx}\\,l_x$</td><td>$l_x/(l_0\\,e_0^0)$</td></tr>
  <tr><td>Birth rate</td><td>$b \\neq d$</td><td>$b = d = 1/e_0^0$</td></tr>
</table>
<p>Every stationary population is stable, but not conversely.</p>

<h4><b>4. Importance of Stable Population Theory in Vital Statistics</b></h4>
<ul>
  <li><b>Estimating vital rates from defective data:</b> Stable population theory allows estimation of birth and death rates from census age distributions alone (e.g., Preston-Coale technique) when vital registration is incomplete.</li>
  <li><b>Indirect estimation:</b> Brass methods (using child survival data from censuses) rely on stable population assumptions to estimate IMR, NMR, and mortality patterns.</li>
  <li><b>Model life table systems:</b> UN, Coale-Demeny, and Brass model life tables are constructed by assuming stable/quasi-stable populations.</li>
  <li><b>Population projections:</b> Leslie matrix approach is an extension of stable population theory to discrete-time projection.</li>
  <li><b>Benchmarking:</b> NRR = 1 (stationary population) is the international policy target for sustainable population.</li>
</ul>`,

'3.4': `<h3><b>UPSC ISS Statistics Paper IV (2024) — Model Solution</b></h3><br>
<p><em>Reference: Office of the Registrar General and Census Commissioner of India — Census of India 2011: Primary Census Abstract and Technical Report; Registrar General of India, New Delhi.</em></p>

<h4><b>1. Salient Features of Indian Census 2011</b></h4>
<ul>
  <li><b>Population:</b> Total population = 1,210,854,977 (121.08 crore), making India the second most populous country (17.5% of world population).</li>
  <li><b>Sex ratio:</b> 943 females per 1000 males (overall); Child sex ratio (0–6 years) = 914, a matter of serious concern.</li>
  <li><b>Literacy rate:</b> 74.0% overall (Males: 82.1%, Females: 65.5%); a 9.2 percentage point increase over 2001.</li>
  <li><b>Decadal population growth:</b> 17.7% (2001–2011), down from 21.5% in 1991–2001, indicating demographic transition.</li>
  <li><b>Density:</b> 382 persons per sq. km (2001: 325). Most dense: Bihar (1106); least: Arunachal Pradesh (17).</li>
  <li><b>Urban population:</b> 31.1% (2001: 27.8%); 8,000+ towns and cities enumerated.</li>
  <li><b>Religion:</b> Hindus 79.8%, Muslims 14.2%, Christians 2.3%, Sikhs 1.7%, others.</li>
  <li><b>Houseless population:</b> ~1.77 million persons.</li>
  <li><b>Scheduled Castes / Scheduled Tribes:</b> SC = 16.6% of total population; ST = 8.6%.</li>
  <li><b>Workers:</b> Main workers (worked 183+ days) = 481 million; Marginal workers = 119 million.</li>
  <li><b>Housing:</b> 72% of households in pucca houses; 56.3% have access to improved sanitation.</li>
  <li><b>Technology:</b> First census to use GPS-tagged boundary maps and mobile data collection in selected areas.</li>
</ul>

<h4><b>2. Importance of Preparing Census</b></h4>
<ul>
  <li><b>Denominator for vital rates:</b> CDR, CBR, IMR, literacy rate all require population size as denominator.</li>
  <li><b>Delimitation:</b> Parliamentary and assembly constituency boundaries are redrawn (delimitation) based on census population.</li>
  <li><b>Resource allocation:</b> Central government grants, tax devolution, and scheme allocations use census population data.</li>
  <li><b>Planning and policy:</b> Education, health infrastructure, housing, employment schemes are planned using age-sex, occupation, and literacy data.</li>
  <li><b>Demographic analysis:</b> Measurement of fertility transition, mortality decline, rural-urban migration, and literacy improvement.</li>
  <li><b>Legal purposes:</b> Proof of nationality, age, and household composition.</li>
  <li><b>International comparability:</b> India's census is internationally standardised, allowing cross-country comparisons under UN recommendations.</li>
</ul>`,

'3.5': `<h3><b>UPSC ISS Statistics Paper IV (2024) — Model Solution</b></h3><br>
<p><em>Reference: Gompertz, B., On the Nature of the Function Expressive of the Law of Human Mortality, Phil. Trans. Roy. Soc. London 115 (1825); Spiegelman, M., Introduction to Demography (1968); Benjamin &amp; Pollard, The Analysis of Mortality (1993).</em></p>

<h4><b>1. Gompertz's Law of Mortality</b></h4>
<p>Benjamin Gompertz (1825) observed that human mortality rates increase geometrically with age above about 30 years. His law states:</p>
$$\\mu_x = B c^x, \\quad B > 0,\\; c > 1$$
<p>The force of mortality increases exponentially with age — each year, mortality increases by a constant factor $c$.</p>

<h4><b>2. Derivation of the Survival Function</b></h4>
<p>From $\\mu_x = Bc^x$, integrate to find $l_x$:</p>
$$\\frac{dl_x}{dx} = -l_x \\mu_x = -l_x Bc^x$$
$$\\frac{dl_x}{l_x} = -Bc^x\\,dx$$
$$\\int_{l_0}^{l_x} \\frac{dl}{l} = -B\\int_0^x c^t\\,dt = -\\frac{B}{\\ln c}(c^x - 1)$$
$$\\ln\\frac{l_x}{l_0} = -\\frac{B}{\\ln c}(c^x - 1) = \\frac{B}{\\ln c}(1 - c^x)$$
$$l_x = l_0 \\exp\\!\\left[\\frac{B(1-c^x)}{\\ln c}\\right] = l_0\\, g^{c^x - 1}$$
<p>where $g = e^{-B/\\ln c}$ (with $0 < g < 1$). Equivalently:</p>
$$\\boxed{l_x = k\\,s^{c^x}}$$
<p>where $k = l_0/g$ and $s = g$. Taking logarithms: $\\log l_x = \\log k + c^x \\log s$ (a linear function of $c^x$).</p>
<p><b>Probability of survival:</b> $p_x = l_{x+1}/l_x = g^{c^x(c-1)} = g^{c^x}\\cdot g^{-c^x} \\cdot g^{c^{x+1}} = (l_{x+1}/l_x)$, simplifying to $p_x = s^{c^x}$ where $s = g^{(c-1)}$. More simply, $p_x = \\exp(-Bc^x(c-1)/\\ln c)$.</p>

<h4><b>3. Applications</b></h4>
<ul>
  <li><b>Graduation of life tables:</b> Gompertz's law provides a smooth analytic function to graduate (smooth) crude mortality rates from actual population data, particularly for ages 30–80.</li>
  <li><b>Actuarial premium calculations:</b> The closed-form expression for $l_x$ enables analytic computation of expected present values of life insurance contracts.</li>
  <li><b>Comparative mortality analysis:</b> The parameters $B$ and $c$ characterise the level and pace of mortality acceleration, allowing population comparisons.</li>
  <li><b>Foundation for Makeham's law:</b> Adding a constant term $A$ (for age-independent causes) gives Makeham's extension: $\\mu_x = A + Bc^x$.</li>
  <li><b>Biological interpretation:</b> Gompertz's law is consistent with theories of biological ageing and wear, making it widely used in biogerontology.</li>
</ul>`,

'4.1': `<h3><b>UPSC ISS Statistics Paper IV (2024) — Model Solution</b></h3><br>
<p><em>Reference: Spiegelman, M., Introduction to Demography (Rev. ed., 1968); Gupta &amp; Kapoor, Fundamentals of Applied Statistics; Chiang, C.L., The Life Table (1984).</em></p>

<h4><b>1. Crude Death Rate (CDR)</b></h4>
$$\\text{CDR} = \\frac{\\text{Total deaths}}{\\text{Mid-year population}} \\times 1000$$
<p><b>Merit:</b> Simplest, requires minimal data, universally available. <b>Demerit:</b> Confounded by age-sex structure; not directly comparable across populations.</p>

<h4><b>2. Age-Specific Death Rate (ASDR)</b></h4>
$$\\text{ASDR}_x = \\frac{\\text{Deaths in age group }[x, x+5)}{\\text{Mid-year population in age group }[x, x+5)} \\times 1000$$
<p><b>Merit:</b> Eliminates age-structure confounding; essential for life table construction; identifies high-risk age groups. <b>Demerit:</b> Gives 15–18 separate rates rather than a single summary; difficult to communicate to policy-makers.</p>

<h4><b>3. Standardised Death Rate (SDR)</b></h4>
<p><b>Direct method:</b> Apply ASDRs of study population to standard population. <b>Indirect method:</b> Compute SMR = observed/expected. <b>Merit:</b> Allows cross-population comparison free from age-structure effects. <b>Demerit:</b> Result depends on choice of standard population.</p>

<h4><b>4. Infant Mortality Rate (IMR)</b></h4>
$$\\text{IMR} = \\frac{\\text{Deaths under 1 year}}{\\text{Live births}} \\times 1000$$
<p><b>Merit:</b> Most sensitive indicator of public health and socioeconomic conditions; internationally standardised. <b>Demerit:</b> Denominator-numerator mismatch between calendar years for genuine cohort.</p>

<h4><b>5. Maternal Mortality Ratio (MMR)</b></h4>
$$\\text{MMR} = \\frac{\\text{Maternal deaths}}{\\text{Live births}} \\times 100,000$$
<p><b>Merit:</b> Key indicator of obstetric care quality. <b>Demerit:</b> Maternal deaths are rare events; unreliable for small populations without large samples.</p>

<h4><b>6. Life Expectancy at Birth ($e_0^0$)</b></h4>
<p>Average number of years a newborn would live under current age-specific mortality: $e_0^0 = T_0/l_0$. <b>Merit:</b> Single summary measure of overall mortality; not affected by age structure. <b>Demerit:</b> Synthetic cohort measure; requires complete life table.</p>

<h4><b>7. Force of Mortality ($\\mu_x$)</b></h4>
<p>Instantaneous mortality rate at exact age $x$: $\\mu_x = -d\\ln l_x/dx$. <b>Merit:</b> Mathematical precision; natural for analytical modelling (Gompertz, Makeham). <b>Demerit:</b> Not directly observable; requires estimation from $l_x$ data.</p>

<h4><b>8. Proportional Mortality Ratio</b></h4>
$$\\text{PMR} = \\frac{\\text{Deaths from a specific cause}}{\\text{Total deaths}} \\times 100$$
<p><b>Merit:</b> Identifies dominant causes of death. <b>Demerit:</b> Affected by competing causes; not a true mortality rate.</p>`,

'4.2': `<h3><b>UPSC ISS Statistics Paper IV (2024) — Model Solution</b></h3><br>
<p><em>Reference: Chiang, C.L., The Life Table and its Applications (1984); Spiegelman, M., Introduction to Demography (1968); Gupta &amp; Kapoor, Fundamentals of Applied Statistics.</em></p>

<h4><b>1. Definition and Importance of the Life Table</b></h4>
<p>A <b>life table</b> is a statistical device that describes the mortality experience of a hypothetical cohort of persons (usually $l_0 = 100,000$) from birth to death, based on the age-specific death rates observed in a population at a given time. It is a <em>synthetic cohort</em> — no real group is followed; the life table condenses the cross-sectional mortality experience of a single year into cohort language.</p>
<p><b>Importance:</b></p>
<ul>
  <li>Fundamental tool for actuarial calculations: premiums, annuities, reserves in life insurance.</li>
  <li>Basis for population projections (cohort-component method).</li>
  <li>Computation of life expectancy, survival probabilities, and related demographic indicators.</li>
  <li>Used in public health to summarise the overall mortality burden and set policy targets.</li>
  <li>Required for computing NRR (net reproduction rate).</li>
  <li>Foundation for Makeham/Gompertz graduation and survival analysis in biostatistics.</li>
</ul>

<h4><b>2. Life Table Functions and Their Relationships</b></h4>
<table border="1" cellpadding="5" style="border-collapse:collapse; width:100%;">
  <tr><th>Column</th><th>Symbol</th><th>Meaning</th><th>Formula</th></tr>
  <tr><td>Survivors</td><td>$l_x$</td><td>Number alive at exact age $x$</td><td>$l_{x+1} = l_x - d_x$</td></tr>
  <tr><td>Deaths</td><td>$d_x$</td><td>Deaths between $x$ and $x+1$</td><td>$d_x = l_x q_x$</td></tr>
  <tr><td>Prob. of death</td><td>$q_x$</td><td>P(die before $x+1$ | alive at $x$)</td><td>$q_x = d_x/l_x$</td></tr>
  <tr><td>Prob. of survival</td><td>$p_x$</td><td>P(survive to $x+1$ | alive at $x$)</td><td>$p_x = 1 - q_x = l_{x+1}/l_x$</td></tr>
  <tr><td>Person-years</td><td>$L_x$</td><td>Person-years lived in $[x, x+1)$</td><td>$L_x = (l_x + l_{x+1})/2$</td></tr>
  <tr><td>Total future P-Y</td><td>$T_x$</td><td>Person-years from age $x$ onward</td><td>$T_x = \\sum_{t \\geq x} L_t$</td></tr>
  <tr><td>Life expectancy</td><td>$e_x^0$</td><td>Average future lifetime from age $x$</td><td>$e_x^0 = T_x/l_x$</td></tr>
  <tr><td>Force of mortality</td><td>$\\mu_x$</td><td>Instantaneous death rate</td><td>$\\mu_x = -dl_x/(l_x\\,dx)$</td></tr>
</table>

<h4><b>3. Key Interrelationships</b></h4>
<ul>
  <li>$d_x = l_x - l_{x+1}$; $\\quad l_x = l_0 \\prod_{t=0}^{x-1} p_t$</li>
  <li>$p_x = \\exp\\!(-\\int_x^{x+1}\\mu_t\\,dt)$</li>
  <li>$e_x^0 = e_{x+1}^0\\cdot p_x + (1-p_x)\\cdot a_x$ where $a_x$ is mean age at death within $[x, x+1)$</li>
  <li>$e_x^0 = L_x/l_x + p_x\\cdot e_{x+1}^0$</li>
  <li>CDR under stationarity: $\\text{CDR} = 1/e_0^0$ (reciprocal of life expectancy)</li>
</ul>`,

'4.3': `<h3><b>UPSC ISS Statistics Paper IV (2024) — Model Solution</b></h3><br>
<p><em>Reference: Spiegelman, M., Introduction to Demography (1968); Gupta &amp; Kapoor, Fundamentals of Applied Statistics.</em></p>

<h4><b>1. Definition and Importance of ASFR</b></h4>
<p>The <b>Age-Specific Fertility Rate</b> for women in age group $[x, x+5)$ is:</p>
$$\\text{ASFR}_x = \\frac{\\text{Live births to women aged }[x, x+5)}{\\text{Female mid-year population aged }[x, x+5)} \\times 1000$$
<p><b>Importance:</b> ASFR captures the timing and intensity of fertility for each reproductive age group; unaffected by the age structure of the female population; essential for computing TFR, GRR, NRR; reveals whether fertility is concentrated among younger or older women.</p>

<h4><b>2. Calculation</b></h4>
<p>(Note: Female population is given in thousands — multiply by 1000 to get actual population.)</p>
<table border="1" cellpadding="4" style="border-collapse:collapse; text-align:center; width:100%;">
  <tr><th>Age group</th><th>Live births</th><th>Females (thousands)</th><th>Females (actual)</th><th>ASFR</th></tr>
  <tr><td>15–19</td><td>23,604</td><td>5,467</td><td>54,67,000</td><td>$23604/5467 = 4.32$</td></tr>
  <tr><td>20–24</td><td>4,01,080</td><td>4,520</td><td>45,20,000</td><td>$401080/4520 = 88.73$</td></tr>
  <tr><td>25–29</td><td>9,48,848</td><td>4,371</td><td>43,71,000</td><td>$948848/4371 = 217.12$</td></tr>
  <tr><td>30–34</td><td>3,84,315</td><td>4,210</td><td>42,10,000</td><td>$384315/4210 = 91.28$</td></tr>
  <tr><td>35–39</td><td>77,871</td><td>3,899</td><td>38,99,000</td><td>$77871/3899 = 19.97$</td></tr>
  <tr><td>40–44</td><td>9,489</td><td>3,460</td><td>34,60,000</td><td>$9489/3460 = 2.74$</td></tr>
  <tr><td>45–49</td><td>435</td><td>2,850</td><td>28,50,000</td><td>$435/2850 = 0.15$</td></tr>
  <tr><td><b>Total</b></td><td><b>18,45,642</b></td><td><b>28,777</b></td><td>—</td><td>$\\sum = 424.31$</td></tr>
</table>
<p><b>Highest ASFR:</b> The 25–29 age group has the highest ASFR = 217.12 per 1000 women.</p>

<h4><b>3. GFR</b></h4>
$$\\text{GFR} = \\frac{18,45,642}{2,87,77,000} \\times 1000 = 64.13 \\text{ per 1000 women (15–49)}$$

<h4><b>4. TFR and GRR</b></h4>
$$\\text{TFR} = 5 \\times \\frac{424.31}{1000} = 5 \\times 0.42431 = 2.12 \\text{ children per woman}$$
$$\\text{GRR} = \\text{TFR} \\times \\text{(proportion female births)} = 2.12 \\times 0.465 = \\mathbf{0.986} \\text{ daughters per woman}$$

<h4><b>5. Shape of the ASFR Curve</b></h4>
<p>The ASFR values rise steeply from 4.32 (15–19) to a peak of 217.12 (25–29), then decline gradually across the right tail (30–34 to 45–49). Since the right tail (above the mode at 25–29) extends further — spanning five groups down to near-zero fertility — while the left side (below the mode) spans only two groups with a steep rise, the ASFR distribution is <b>positively skewed (right-skewed)</b>. The mean age of childbearing lies to the right of the modal group.</p>`,

'4.4': `<h3><b>UPSC ISS Statistics Paper IV (2024) — Model Solution</b></h3><br>
<p><em>Reference: Rhodes, E.C., Population Mathematics (1940); Pearl, R. &amp; Reed, L.J., PNAS 6 (1920); Gupta &amp; Kapoor, Fundamentals of Applied Statistics.</em></p>

<h4><b>1. The Logistic Curve</b></h4>
<p>The logistic growth model for population $N_t$ at time $t$:</p>
$$N_t = \\frac{K}{1 + e^{a+bt}}, \\quad b < 0, \\; K > 0$$
<p>$K$ = upper asymptote (carrying capacity), $a$ and $b$ are fitted parameters.</p>

<h4><b>2. Rhodes Method (E. C. Rhodes, 1940)</b></h4>
<p>The Pearl-Reed 3-point method uses single observations; Rhodes' method uses <b>group sums</b> to smooth data errors. Procedure:</p>
<p><b>Step 1:</b> Divide all $3n$ observations into <b>three successive equal groups</b> of $n$ each: compute sums $S_1 = \\sum_{t \\in \\text{Group 1}} N_t$, $S_2 = \\sum_{t \\in \\text{Group 2}} N_t$, $S_3 = \\sum_{t \\in \\text{Group 3}} N_t$.</p>
<p><b>Step 2:</b> Estimate $K$ using the formula analogous to Pearl-Reed (applied to group sums):</p>
$$K = \\frac{2S_1 S_2 S_3 - S_2^2(S_1 + S_3)}{S_1 S_3 - S_2^2}$$
<p><b>Step 3:</b> Transform $Y_t = K/N_t - 1$; then $\\ln Y_t = a + bt$ is linear in $t$.</p>
<p><b>Step 4:</b> For each group, compute average $\\ln Y$ and fit by least squares: $b = $ slope, $a = $ intercept.</p>
<p><b>Step 5:</b> The fitted logistic: $N_t = K/(1 + e^{a+bt})$.</p>

<h4><b>3. Numerical Illustration (Hypothetical Data)</b></h4>
<p>Suppose 3 groups each of 3 years give $S_1 = 45$, $S_2 = 63$, $S_3 = 76$ (population in millions).</p>
$$S_1 S_3 = 45 \\times 76 = 3420; \\quad S_2^2 = 63^2 = 3969; \\quad S_1 S_3 - S_2^2 = 3420 - 3969 = -549$$
$$2S_1 S_2 S_3 = 2 \\times 45 \\times 63 \\times 76 = 430,920; \\quad S_2^2(S_1+S_3) = 3969 \\times 121 = 480,249$$
$$K = \\frac{430920 - 480249}{-549} = \\frac{-49329}{-549} \\approx \\mathbf{89.9}$$
<p>Then: midpoints of groups $t_1 = 2, t_2 = 5, t_3 = 8$ (years); group averages of $N$: $\\bar{N}_1 = 15, \\bar{N}_2 = 21, \\bar{N}_3 = 25.3$.</p>
$$Y_1 = 89.9/15 - 1 = 4.99; \\quad Y_2 = 89.9/21 - 1 = 3.28; \\quad Y_3 = 89.9/25.3 - 1 = 2.55$$
$$\\ln Y_1 = 1.607, \\quad \\ln Y_2 = 1.187, \\quad \\ln Y_3 = 0.936$$
<p>OLS on $(t, \\ln Y)$: $b \\approx (0.936-1.607)/6 \\approx -0.112$, $a \\approx 1.607 - (-0.112)(2) = 1.831$.</p>
<p>Fitted curve: $N_t = 89.9/(1 + e^{1.831 - 0.112t})$. The saturation population $K \\approx 89.9$ million.</p>`

}; // end demography 2024

// ─── SQC 2024 ────────────────────────────────────────────────────────────────

exp.paper4.sqc['2024'] = {

'7.1': `<h3><b>UPSC ISS Statistics Paper IV (2024) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., Introduction to Statistical Quality Control (8th ed., 2020); Duncan, A.J., Quality Control and Industrial Statistics (5th ed., 1986).</em></p>

<h4><b>1. Process Control vs Product Control</b></h4>
<table border="1" cellpadding="5" style="border-collapse:collapse; width:100%;">
  <tr><th>Aspect</th><th>Process Control</th><th>Product Control</th></tr>
  <tr><td>Objective</td><td>Monitor and maintain the manufacturing process in a state of statistical control</td><td>Classify finished products as conforming or non-conforming to specification</td></tr>
  <tr><td>When applied</td><td>During production (online, real-time)</td><td>After production or at incoming inspection</td></tr>
  <tr><td>Method</td><td>Control charts ($\\bar{X}$, $R$, $p$, $c$, CUSUM, EWMA)</td><td>Acceptance sampling plans (SSP, DSP, sequential)</td></tr>
  <tr><td>Unit of study</td><td>Subgroup sample statistics ($\\bar{x}$, $R$)</td><td>Individual lot or batch</td></tr>
  <tr><td>Action</td><td>Investigate and remove assignable causes; adjust process</td><td>Accept, reject, or screen lots</td></tr>
  <tr><td>Goal</td><td>Prevention of defects</td><td>Detection/containment of defects</td></tr>
</table>

<h4><b>2. Effect of Chance Causes</b></h4>
<p><b>Chance (common) causes:</b> The cumulative effect of many small, unavoidable sources — material variability, temperature fluctuations, operator random variations, slight machine vibration. Their combined effect produces a stable, random (normal-like) variation in quality characteristics.</p>
<ul>
  <li><b>On process control:</b> When only chance causes are present, the control chart exhibits random scatter within the $\\pm 3\\sigma$ limits. The process is in statistical control. No action is needed or justified — tampering would worsen variability (Deming's funnel experiment).</li>
  <li><b>On product control:</b> Outgoing quality follows a stable distribution; the OC curve and AQL/LTPD specifications are meaningful and achievable.</li>
</ul>

<h4><b>3. Effect of Assignable Causes</b></h4>
<p><b>Assignable (special) causes:</b> Specific, identifiable, economically correctable sources — tool breakage, wrong batch of material, operator changeover, machine malfunction.</p>
<ul>
  <li><b>On process control:</b> Assignable causes produce points outside the $3\\sigma$ limits, runs, trends, or other non-random patterns on the control chart. This signals that the process is out of control — the distribution of the quality characteristic has changed. Immediate investigation and correction is required.</li>
  <li><b>On product control:</b> An out-of-control process with assignable causes produces unpredictable lots. Sampling plans designed for a stable AQL may no longer protect the consumer adequately. The actual OC function shifts, potentially allowing more defective lots to be accepted.</li>
</ul>`,

'7.2': `<h3><b>UPSC ISS Statistics Paper IV (2024) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., Introduction to Statistical Quality Control (8th ed., 2020).</em></p>

<h4><b>1. $p$-Chart with Variable Sample Sizes</b></h4>
<p>Data for 10 samples (varying $n_i$):</p>
<table border="1" cellpadding="4" style="border-collapse:collapse; text-align:center; font-size:0.9em; width:100%;">
  <tr><th>Sample</th><th>$n_i$</th><th>$d_i$</th><th>$\\hat{p}_i = d_i/n_i$</th></tr>
  <tr><td>1</td><td>2000</td><td>425</td><td>0.2125</td></tr>
  <tr><td>2</td><td>1500</td><td>430</td><td>0.2867</td></tr>
  <tr><td>3</td><td>1400</td><td>216</td><td>0.1543</td></tr>
  <tr><td>4</td><td>1350</td><td>341</td><td>0.2526</td></tr>
  <tr><td>5</td><td>1250</td><td>225</td><td>0.1800</td></tr>
  <tr><td>6</td><td>1760</td><td>322</td><td>0.1830</td></tr>
  <tr><td>7</td><td>1875</td><td>280</td><td>0.1493</td></tr>
  <tr><td>8</td><td>1955</td><td>306</td><td>0.1565</td></tr>
  <tr><td>9</td><td>3125</td><td>337</td><td>0.1078</td></tr>
  <tr><td>10</td><td>1575</td><td>305</td><td>0.1937</td></tr>
  <tr><td><b>Total</b></td><td><b>17790</b></td><td><b>3187</b></td><td>—</td></tr>
</table>

<h4><b>2. Central Statistic</b></h4>
$$\\bar{p} = \\frac{3187}{17790} = 0.1791$$
$$\\bar{p}(1-\\bar{p}) = 0.1791 \\times 0.8209 = 0.1470$$

<h4><b>3. Variable Control Limits</b></h4>
<p>For each sample $i$: $\\text{UCL}_i = \\bar{p} + 3\\sqrt{\\bar{p}(1-\\bar{p})/n_i}$; $\\text{LCL}_i = \\bar{p} - 3\\sqrt{\\bar{p}(1-\\bar{p})/n_i}$ (or 0).</p>
<table border="1" cellpadding="4" style="border-collapse:collapse; text-align:center; font-size:0.9em; width:100%;">
  <tr><th>$i$</th><th>$n_i$</th><th>$3\\sqrt{p(1-p)/n_i}$</th><th>UCL$_i$</th><th>LCL$_i$</th><th>$\\hat{p}_i$</th><th>Status</th></tr>
  <tr><td>1</td><td>2000</td><td>0.0257</td><td>0.2048</td><td>0.1534</td><td>0.2125</td><td><b>ABOVE UCL</b></td></tr>
  <tr><td>2</td><td>1500</td><td>0.0297</td><td>0.2088</td><td>0.1494</td><td>0.2867</td><td><b>ABOVE UCL</b></td></tr>
  <tr><td>3</td><td>1400</td><td>0.0307</td><td>0.2098</td><td>0.1484</td><td>0.1543</td><td>In control</td></tr>
  <tr><td>4</td><td>1350</td><td>0.0313</td><td>0.2104</td><td>0.1478</td><td>0.2526</td><td><b>ABOVE UCL</b></td></tr>
  <tr><td>5</td><td>1250</td><td>0.0325</td><td>0.2116</td><td>0.1466</td><td>0.1800</td><td>In control</td></tr>
  <tr><td>6</td><td>1760</td><td>0.0274</td><td>0.2065</td><td>0.1517</td><td>0.1830</td><td>In control</td></tr>
  <tr><td>7</td><td>1875</td><td>0.0265</td><td>0.2056</td><td>0.1526</td><td>0.1493</td><td>In control</td></tr>
  <tr><td>8</td><td>1955</td><td>0.0260</td><td>0.2051</td><td>0.1531</td><td>0.1565</td><td>In control</td></tr>
  <tr><td>9</td><td>3125</td><td>0.0206</td><td>0.1997</td><td>0.1585</td><td>0.1078</td><td><b>BELOW LCL</b></td></tr>
  <tr><td>10</td><td>1575</td><td>0.0290</td><td>0.2081</td><td>0.1501</td><td>0.1937</td><td>In control</td></tr>
</table>

<h4><b>4. Comment</b></h4>
<p>Samples 1, 2, and 4 are above the UCL (high fraction defective — assignable cause of excess defects). Sample 9 is below the LCL — an unusually low defect rate, possibly from an exceptionally good batch or favourable operating conditions. The process is <b>not in statistical control</b>. Investigate samples 1, 2, 4 for specific assignable causes (raw material quality, operator error, tooling).</p>`,

'7.3': `<h3><b>UPSC ISS Statistics Paper IV (2024) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., Introduction to Statistical Quality Control (8th ed., 2020); Duncan, A.J., Quality Control and Industrial Statistics (5th ed., 1986).</em></p>

<h4><b>1. Use and Importance of the $c$-Chart</b></h4>
<p>The <b>$c$-chart</b> monitors the number of non-conformities (defects) per inspection unit when the unit size (or sample size) is constant. It is based on the <b>Poisson distribution</b> (appropriate when the number of potential non-conformity locations is large but the probability of each occurrence is small):</p>
$$D \\sim \\text{Poisson}(c), \\quad E(D) = \\text{Var}(D) = c$$
<p>The $c$-chart distinguishes between defective items (product control) and defects per unit (process control). Examples: weld defects per metre of pipe, typographic errors per page, software bugs per KLOC, fabric flaws per square metre.</p>

<h4><b>2. Control Limits</b></h4>
<p>The standard 3-sigma control limits for the $c$-chart are:</p>
$$\\text{UCL} = \\bar{c} + 3\\sqrt{\\bar{c}}, \\quad \\text{CL} = \\bar{c}, \\quad \\text{LCL} = \\max(0,\\; \\bar{c} - 3\\sqrt{\\bar{c}})$$

<h4><b>3. Application: Process Average $\\bar{p} = 2\\% = 0.02$, Sample of 500 Units</b></h4>
<p>The expected number of defects per sample of 500 units:</p>
$$\\bar{c} = n \\cdot \\bar{p} = 500 \\times 0.02 = 10$$
$$\\text{UCL} = 10 + 3\\sqrt{10} = 10 + 3(3.1623) = 10 + 9.487 = \\mathbf{19.487 \\approx 19.49}$$
$$\\text{CL} = 10$$
$$\\text{LCL} = 10 - 9.487 = 0.513$$

<h4><b>4. Interpretation</b></h4>
<p>A daily/shift sample of 500 items should produce between 0.51 and 19.49 defects if the process is in statistical control at the 2% defect level. Any count exceeding 19.49 signals an upward shift in defect rate — an assignable cause should be investigated. A count below 0.51 (i.e., 0) is not unusual but may indicate an improved process or a missed defect.</p>`,

'7.4': `<h3><b>UPSC ISS Statistics Paper IV (2024) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., Introduction to Statistical Quality Control (8th ed., 2020); Schilling &amp; Neubauer, Acceptance Sampling in Quality Control (3rd ed., 2017).</em></p>

<h4><b>1. Single Sampling Plan (SSP) — Procedure</b></h4>
<p>An SSP is characterised by $(N, n, c)$: lot size $N$, sample size $n$, acceptance number $c$.</p>
<ol>
  <li>Draw a random sample of $n$ items from the lot of $N$.</li>
  <li>Inspect all $n$ items; count defectives $d$.</li>
  <li>If $d \\leq c$: Accept the lot. If $d > c$: Reject the lot (100% inspect or return to supplier).</li>
</ol>

<h4><b>2. Operating Characteristic (OC) Function</b></h4>
<p>The probability of accepting a lot with true fraction defective $p$:</p>
$$P_a(p) = P(D \\leq c \\mid n, p) = \\sum_{d=0}^{c} \\binom{n}{d} p^d (1-p)^{n-d}$$
<p>For large $N$ and small $p$, use Poisson approximation ($\\lambda = np$):</p>
$$P_a(p) \\approx \\sum_{d=0}^{c} \\frac{e^{-np}(np)^d}{d!}$$

<h4><b>3. Numerical: $n=60$, $c=2$, $\\bar{p} = 0.01$</b></h4>
<p>Using Poisson with $\\lambda = np = 60 \\times 0.01 = 0.6$:</p>
$$P_a(0.01) = e^{-0.6}\\!\\left(1 + 0.6 + \\frac{0.36}{2}\\right) = e^{-0.6}(1 + 0.6 + 0.18) = 0.5488 \\times 1.78 = \\mathbf{0.9769}$$
<p><b>Conclusion:</b> $P_a = 0.977$ — the plan accepts lots at the process average of 1% defective with approximately 97.7% probability. This is a high probability of acceptance, confirming that the sampling plan offers good protection to the producer: lots of high quality ($p = 0.01$) are accepted almost always ($\\approx 97.7\\%$ of the time). The <b>producer's risk</b> $\\alpha = 1 - 0.977 = 2.3\\%$ is low and acceptable.</p>`,

'7.5': `<h3><b>UPSC ISS Statistics Paper IV (2024) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., ISQC (8th ed., 2020); Schilling &amp; Neubauer, Acceptance Sampling (3rd ed., 2017); MIL-STD-1916; IS 2500 Part I (BIS).</em></p>

<h4><b>(i) Acceptance Quality Level (AQL)</b></h4>
<p>The AQL (also termed RQL in some standards, or simply the "acceptable quality level") is the <b>maximum fraction defective</b> (or defects per unit) that, for the purposes of sampling inspection, can be considered satisfactory as a process average. At $p = \\text{AQL}$, the sampling plan accepts the lot with high probability $(1-\\alpha)$, where $\\alpha$ is the <b>producer's risk</b> (typically 5%). The AQL is a protection measure for the producer: lots at or better than the AQL level should be accepted most of the time.</p>

<h4><b>(ii) Lot Tolerance Percent Defective (LTPD)</b></h4>
<p>LTPD (also called the Rejectable Quality Level RQL or Unacceptable Quality Level UQL) is the <b>fraction defective</b> at which the consumer requires high probability of rejection. At $p = \\text{LTPD}$, the plan accepts the lot with low probability $\\beta$ (consumer's risk, typically 10%). The LTPD protects the consumer: lots as bad as the LTPD are accepted only 10% of the time. Along with AQL, it defines the two-point OC design requirements.</p>

<h4><b>(iii) Average Outgoing Quality Limit (AOQL)</b></h4>
<p>AOQL is the <b>maximum of the AOQ curve</b> over all values of incoming fraction defective $p$:</p>
$$\\text{AOQ}(p) = \\frac{p \\cdot P_a(p)(N-n)}{N} \\approx p \\cdot P_a(p)$$
$$\\text{AOQL} = \\max_p \\{\\text{AOQ}(p)\\}$$
<p>It provides an unconditional guarantee on outgoing quality: regardless of how bad the incoming quality is, the average outgoing quality will never exceed the AOQL. This is the most meaningful quality guarantee for acceptance sampling with 100% inspection of rejected lots.</p>

<h4><b>(iv) Operating Characteristic (OC) Curve</b></h4>
<p>The OC curve is a graph of $P_a(p)$ (probability of lot acceptance) vs $p$ (fraction defective). It characterises the discriminating power of a sampling plan: a steep OC curve discriminates sharply between good and bad lots; a flat curve is poor. Key points on the OC curve: $(\\text{AQL}, 1-\\alpha)$ and $(\\text{LTPD}, \\beta)$. All sampling plans should be evaluated through their OC curves before adoption.</p>

<h4><b>(v) Consumer's Risk ($\\beta$)</b></h4>
<p>The probability that the sampling plan accepts a lot of unacceptably poor quality (at $p = \\text{LTPD}$). Typically $\\beta = 0.10$ (10%). It represents the risk to the consumer of receiving and using a lot that should have been rejected. Consumer's risk is controlled by choosing an appropriate $n$ and $c$ for the sampling plan; increasing $n$ for fixed $c$ steepens the OC curve and reduces $\\beta$.</p>`,

'8.1': `<h3><b>UPSC ISS Statistics Paper IV (2024) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., ISQC (8th ed., 2020). $n=5$: $A_2=0.58$, $D_3=0$, $D_4=2.115$, $d_2=2.326$.</em></p>

<h4><b>1. Data Summary (20 samples, $n=5$)</b></h4>
<p>Summing all $\\bar{x}_i$: $\\sum\\bar{x}_i = 103+102+104+105+104+106+102+105+106+104+105+103+102+105+104+105+106+102+105+103 = 2081$</p>
<p>Summing all $R_i$: $\\sum R_i = 4+5+2+8+4+3+7+2+4+3+4+2+3+4+5+3+5+2+4+2 = 76$</p>
$$\\bar{\\bar{X}} = \\frac{2081}{20} = 104.05, \\qquad \\bar{R} = \\frac{76}{20} = 3.80$$

<h4><b>Part (i): Control Limits</b></h4>
$$\\text{UCL}_{\\bar{X}} = 104.05 + 0.58 \\times 3.80 = 104.05 + 2.20 = \\mathbf{106.25}$$
$$\\text{CL}_{\\bar{X}} = \\mathbf{104.05}, \\quad \\text{LCL}_{\\bar{X}} = 104.05 - 2.20 = \\mathbf{101.85}$$
$$\\text{UCL}_R = 2.115 \\times 3.80 = \\mathbf{8.04}, \\quad \\text{CL}_R = \\mathbf{3.80}, \\quad \\text{LCL}_R = \\mathbf{0}$$
<p>All sample means (range 102–106) are within [101.85, 106.25]. All ranges (range 2–8) are within [0, 8.04] — $R_4 = 8$ is just within UCL. <b>Process is in statistical control.</b></p>

<h4><b>Part (ii): Process Standard Deviation</b></h4>
$$\\hat{\\sigma} = \\frac{\\bar{R}}{d_2} = \\frac{3.80}{2.326} = \\mathbf{1.634 \\text{ V}}$$

<h4><b>Part (iii): Natural Tolerance Limits</b></h4>
$$\\text{NTL} = \\bar{\\bar{X}} \\pm 3\\hat{\\sigma} = 104.05 \\pm 3(1.634) = 104.05 \\pm 4.90 = [\\mathbf{99.15,\\; 108.95}] \\text{ V}$$

<h4><b>Part (iv): Fraction Non-Conforming</b></h4>
<p>Spec: $103 \\pm 4 = [99, 107]$ V. Individual voltages $\\sim N(104.05, 1.634^2)$.</p>
$$P(X < 99) = \\Phi\\!\\left(\\frac{99-104.05}{1.634}\\right) = \\Phi(-3.09) \\approx 0.001$$
$$P(X > 107) = 1 - \\Phi\\!\\left(\\frac{107-104.05}{1.634}\\right) = 1 - \\Phi(1.805) \\approx 1 - 0.9645 = 0.0355$$
$$\\hat{p}_{nc} = 0.001 + 0.0355 = \\mathbf{0.0365 \\approx 3.65\\%}$$

<h4><b>Part (v): Capability Indices</b></h4>
$$C_p = \\frac{107-99}{6(1.634)} = \\frac{8}{9.804} = \\mathbf{0.816}$$
$$C_{pk} = \\min\\!\\left(\\frac{107-104.05}{3(1.634)},\\frac{104.05-99}{3(1.634)}\\right) = \\min(0.602,\\; 1.030) = \\mathbf{0.602}$$
<p>Both $C_p < 1$ and $C_{pk} < 1$ confirm the process is <b>not capable</b> of meeting the $\\pm 4$ V specification. The process mean (104.05) is also off-target (103 is the target). Reduction in variability and centring of the process mean are required.</p>`,

'8.2': `<h3><b>UPSC ISS Statistics Paper IV (2024) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., ISQC (8th ed., 2020); Page, E.S., Biometrika 41 (1954).</em></p>

<h4><b>1. Utility and Applications of CUSUM</b></h4>
<p>CUSUM charts accumulate past information — they are full-memory charts particularly powerful for detecting <b>small, sustained shifts</b> ($\\leq 1\\sigma$) that Shewhart charts miss. Key applications: chemical process control (gradual drift in concentration, temperature), financial surveillance (market fraud, insurance), clinical trials (monitoring adverse event rates), manufacturing (tool wear, dimensional drift).</p>

<h4><b>2. CUSUM Setup for Bicycle Spokes</b></h4>
<p>$\\mu_0 = 25$ cm, $\\sigma = 0.02$ cm, $n=1$. Reference value $K = 0.01$ ($= \\sigma/2$), Decision interval $H = 5\\sigma = 0.10$ cm.</p>
$$C_i^+ = \\max(0,\\; X_i - 25.01 + C_{i-1}^+), \\quad C_i^- = \\max(0,\\; 24.99 - X_i + C_{i-1}^-)$$

<h4><b>3. CUSUM Table</b></h4>
<p>Data: 24.998, 25.016, 25.024, 25.022, 24.984, 25.012, 25.024, 24.978, 25.012, 25.017, 25.024, 25.026, 25.027, 25.028, 25.028</p>
<table border="1" cellpadding="4" style="border-collapse:collapse; text-align:center; font-size:0.88em; width:100%;">
  <tr><th>$i$</th><th>$X_i$</th><th>$X_i-25.01$</th><th>$C_i^+$</th><th>$24.99-X_i$</th><th>$C_i^-$</th></tr>
  <tr><td>1</td><td>24.998</td><td>$-0.012$</td><td>0.000</td><td>$-0.008$</td><td>0.000</td></tr>
  <tr><td>2</td><td>25.016</td><td>0.006</td><td>0.006</td><td>$-0.026$</td><td>0.000</td></tr>
  <tr><td>3</td><td>25.024</td><td>0.014</td><td>0.020</td><td>$-0.034$</td><td>0.000</td></tr>
  <tr><td>4</td><td>25.022</td><td>0.012</td><td>0.032</td><td>$-0.032$</td><td>0.000</td></tr>
  <tr><td>5</td><td>24.984</td><td>$-0.026$</td><td>0.006</td><td>0.006</td><td>0.006</td></tr>
  <tr><td>6</td><td>25.012</td><td>0.002</td><td>0.008</td><td>$-0.022$</td><td>0.000</td></tr>
  <tr><td>7</td><td>25.024</td><td>0.014</td><td>0.022</td><td>$-0.034$</td><td>0.000</td></tr>
  <tr><td>8</td><td>24.978</td><td>$-0.032$</td><td>0.000</td><td>0.012</td><td>0.012</td></tr>
  <tr><td>9</td><td>25.012</td><td>0.002</td><td>0.002</td><td>$-0.022$</td><td>0.000</td></tr>
  <tr><td>10</td><td>25.017</td><td>0.007</td><td>0.009</td><td>$-0.027$</td><td>0.000</td></tr>
  <tr><td>11</td><td>25.024</td><td>0.014</td><td>0.023</td><td>$-0.034$</td><td>0.000</td></tr>
  <tr><td>12</td><td>25.026</td><td>0.016</td><td>0.039</td><td>$-0.036$</td><td>0.000</td></tr>
  <tr><td>13</td><td>25.027</td><td>0.017</td><td>0.056</td><td>$-0.037$</td><td>0.000</td></tr>
  <tr><td>14</td><td>25.028</td><td>0.018</td><td>0.074</td><td>$-0.038$</td><td>0.000</td></tr>
  <tr><td>15</td><td>25.028</td><td>0.018</td><td>0.092</td><td>$-0.038$</td><td>0.000</td></tr>
</table>

<h4><b>4. Analysis</b></h4>
<p>With $H = 0.10$: $C_{15}^+ = 0.092 < 0.10$. No formal signal yet. However, $C_i^+$ has been increasing monotonically from observation 10 onward — the <b>linear region begins at approximately observation 10–11</b>, indicating a sustained upward shift. The estimated mean shift:</p>
$$\\hat{\\mu}_1 = \\mu_0 + K + \\frac{C_{15}^+}{15-10+1} = 25 + 0.01 + \\frac{0.092}{6} \\approx 25 + 0.01 + 0.015 = 25.025 \\text{ cm}$$
<p>The machine appears to be set slightly above the target. The process should be investigated and the mean adjusted back to 25 cm before the CUSUM formally signals.</p>`,

'8.3': `<h3><b>UPSC ISS Statistics Paper IV (2024) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., ISQC (8th ed., 2020); Wald, A., Sequential Analysis (1947); Schilling &amp; Neubauer, Acceptance Sampling (3rd ed., 2017).</em></p>

<h4><b>1. Acceptance Sampling Plan</b></h4>
<p>An acceptance sampling plan is a statistical decision procedure for accepting or rejecting a lot based on the inspection of a <em>sample</em> drawn from the lot, rather than 100% inspection. It balances inspection cost against the risk of accepting bad lots or rejecting good lots.</p>

<h4><b>2. Double Sampling Plan (DSP)</b></h4>
<p>A DSP is characterised by $(N, n_1, n_2, c_1, c_2)$, $c_1 \\leq c_2$.</p>
<p><b>Stage 1:</b> Inspect $n_1$ items; count $d_1$. If $d_1 \\leq c_1$: Accept. If $d_1 > c_2$: Reject. If $c_1 < d_1 \\leq c_2$: Proceed to Stage 2.</p>
<p><b>Stage 2:</b> Inspect $n_2$ additional items; count $d_2$. Accept if $d_1 + d_2 \\leq c_2$; reject if $d_1 + d_2 > c_2$.</p>
<p><b>OC function:</b> $P_a = P(d_1 \\leq c_1) + \\sum_{j=c_1+1}^{c_2} P(D_1=j)\\cdot P(D_2 \\leq c_2-j)$</p>
<p><b>ASN:</b> $\\text{ASN} = n_1 + n_2\\cdot P(c_1 < d_1 \\leq c_2) = n_1 + n_2(1 - P_{I_1})$ where $P_{I_1} = P(d_1 \\leq c_1) + P(d_1 > c_2)$.</p>

<h4><b>3. Sequential Sampling Plan (SSP-Seq) — Comparison</b></h4>
<p>Wald's (1947) Sequential Probability Ratio Test (SPRT) inspects items <em>one at a time</em> (or in small groups). At each stage, one of three decisions: Accept (if cumulative statistic ≤ lower boundary), Reject (if ≥ upper boundary), or Continue. The decision boundaries are parallel straight lines on a (cumulative defectives vs cumulative sample size) plot:</p>
$$d \\leq d_1 + sn \\quad \\Rightarrow \\text{Accept}; \\quad d \\geq d_2 + sn \\quad \\Rightarrow \\text{Reject}$$
<table border="1" cellpadding="5" style="border-collapse:collapse; width:100%;">
  <tr><th>Feature</th><th>Double Sampling Plan</th><th>Sequential Sampling Plan</th></tr>
  <tr><td>Stages</td><td>Fixed: maximum 2</td><td>Variable: 1 to $\\infty$ (in theory)</td></tr>
  <tr><td>Sample size</td><td>Fixed $n_1$ (and $n_2$ if needed)</td><td>Random variable</td></tr>
  <tr><td>ASN</td><td>Between SSP and sequential</td><td>Minimum possible (SPRT optimality)</td></tr>
  <tr><td>Administration</td><td>Moderate complexity</td><td>Complex; requires real-time tracking</td></tr>
  <tr><td>OC curve</td><td>Well-defined</td><td>Approximately same shape as SSP/DSP</td></tr>
  <tr><td>Industrial use</td><td>Very common (MIL-STD, IS 2500)</td><td>Less common; used in testing and clinical trials</td></tr>
</table>`,

'8.4': `<h3><b>UPSC ISS Statistics Paper IV (2024) — Model Solution</b></h3><br>
<p><em>Reference: Montgomery, D.C., ISQC (8th ed., 2020); Roberts, S.W., Control Chart Tests Based on Geometric Moving Averages, Technometrics 1 (1959). $\\mu_0=1050$, $\\sigma=25$, $\\lambda=0.2$, $L=2.7$.</em></p>

<h4><b>1. EWMA Chart Setup</b></h4>
$$Z_i = 0.2\\,X_i + 0.8\\,Z_{i-1}, \\quad Z_0 = \\mu_0 = 1050$$
<p>Asymptotic control limits: $\\mu_0 \\pm L\\sigma\\sqrt{\\lambda/(2-\\lambda)} = 1050 \\pm 2.7(25)\\sqrt{0.2/1.8} = 1050 \\pm 22.5$</p>
$$\\text{UCL} = 1072.5, \\quad \\text{CL} = 1050, \\quad \\text{LCL} = 1027.5$$

<h4><b>2. EWMA Computation Table</b></h4>
<table border="1" cellpadding="4" style="border-collapse:collapse; text-align:center; font-size:0.88em; width:100%;">
  <tr><th>Hour $i$</th><th>$X_i$</th><th>$Z_i$</th><th>Within limits?</th></tr>
  <tr><td>1</td><td>1045</td><td>$0.2(1045)+0.8(1050)=1049.0$</td><td>Yes</td></tr>
  <tr><td>2</td><td>1055</td><td>$0.2(1055)+0.8(1049.0)=1050.2$</td><td>Yes</td></tr>
  <tr><td>3</td><td>1037</td><td>$0.2(1037)+0.8(1050.2)=1047.6$</td><td>Yes</td></tr>
  <tr><td>4</td><td>1064</td><td>$0.2(1064)+0.8(1047.6)=1050.9$</td><td>Yes</td></tr>
  <tr><td>5</td><td>1095</td><td>$0.2(1095)+0.8(1050.9)=1059.7$</td><td>Yes</td></tr>
  <tr><td>6</td><td>1008</td><td>$0.2(1008)+0.8(1059.7)=1049.5$</td><td>Yes</td></tr>
  <tr><td>7</td><td>1050</td><td>$0.2(1050)+0.8(1049.5)=1049.6$</td><td>Yes</td></tr>
  <tr><td>8</td><td>1087</td><td>$0.2(1087)+0.8(1049.6)=1057.1$</td><td>Yes</td></tr>
  <tr><td>9</td><td>1125</td><td>$0.2(1125)+0.8(1057.1)=1070.7$</td><td>Yes ($< 1072.5$)</td></tr>
  <tr><td>10</td><td>1146</td><td>$0.2(1146)+0.8(1070.7)=1085.8$</td><td><b>SIGNAL: $1085.8 > 1072.5$</b></td></tr>
  <tr><td>11</td><td>1139</td><td>$0.2(1139)+0.8(1085.8)=1096.4$</td><td>Above UCL</td></tr>
  <tr><td>12</td><td>1169</td><td>$1111.1$</td><td>Above UCL</td></tr>
  <tr><td>...</td><td>...</td><td>Continues increasing</td><td>Above UCL</td></tr>
</table>

<h4><b>3. Analysis</b></h4>
<p>The EWMA chart signals at <b>observation 10</b> ($Z_{10} = 1085.8 > \\text{UCL} = 1072.5$), indicating the process mean has shifted upward from $\\mu_0 = 1050$. The gradually increasing $Z_i$ from observations 8–10 reflects the exponential smoothing accumulating evidence of a sustained upward shift. The process mean appears to have increased to approximately $\\bar{X}_{10-20} \\approx 1140$–$1160$ — a shift of 3.5–4.5$\\sigma$ above target. Immediate investigation of the chemical process (catalyst, temperature, raw material) is warranted.</p>`

}; // end sqc 2024

// Write back
fs.writeFileSync(EXP_PATH, JSON.stringify(exp, null, 2));
console.log('Done. paper4 demography + sqc 2024 written.');
console.log('New JSON size (MB):', (JSON.stringify(exp).length/1024/1024).toFixed(2));

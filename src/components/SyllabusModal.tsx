import React, { useState } from 'react';
import { X, BookOpen, Layers, GraduationCap, CheckCircle2 } from 'lucide-react';

interface SyllabusModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSource?: 'iss' | 'uphesc';
}

type ActivePaper = 'paper1' | 'paper2' | 'paper3' | 'paper4';

export const SyllabusModal: React.FC<SyllabusModalProps> = ({ isOpen, onClose, defaultSource = 'iss' }) => {
  const activeSource = defaultSource;
  const [activePaper, setActivePaper] = useState<ActivePaper>('paper1');
  const [activeUphescUnit, setActiveUphescUnit] = useState<number>(1);

  if (!isOpen) return null;

  const paperDetails = {
    paper1: {
      title: 'Paper I (Objective)',
      weight: '80 Questions • 200 Marks • 2 Hours',
      description: 'Covers core probability theory, mathematical statistics, computational methods, and computer fundamentals.',
      sections: [
        {
          name: 'Probability & Statistical Methods',
          topics: [
            'Axiomatic & Classical definition of Probability; Conditional probability, Bayes Theorem.',
            'Random Variables, cumulative distribution functions, probability density functions, expectation.',
            'Chebyshev, Markov & Jensen inequalities; Weak and Strong Law of Large Numbers (WLLN & SLLN).',
            'Central Limit Theorem (CLT) for independent and identically distributed random variables.',
            'Bivariate distributions, joint, marginal and conditional distributions; Correlation and Regression.',
            'Standard distributions: Binomial, Poisson, Normal, t, F, Chi-square, Cauchy, Exponential, Gamma, Beta, Weibull, and Lognormal.'
          ]
        },
        {
          name: 'Numerical Analysis',
          topics: [
            'Finite differences, operators and interpolation (Newton, Lagrange, divided differences).',
            'Central difference interpolation formulas (Gauss, Stirling, Bessel).',
            'Numerical differentiation and integration (Trapezoidal, Simpson\'s 1/3 and 3/8, Weddle\'s rule).',
            'Numerical solutions of algebraic and transcendental equations (Bisection, Secant, Newton-Raphson).',
            'Numerical solution of ordinary differential equations (Euler, Runge-Kutta methods).'
          ]
        },
        {
          name: 'Computer Application & Data Processing',
          topics: [
            'Computer organization, system software, application software.',
            'Binary arithmetic: conversion, integer & real number representation.',
            'Operating systems: fundamental concepts, file management.',
            'Flowcharts, algorithms, and structured programming paradigms.',
            'High-level programming concepts, data structures (arrays, linked lists), database fundamentals.'
          ]
        }
      ]
    },
    paper2: {
      title: 'Paper II (Objective)',
      weight: '80 Questions • 200 Marks • 2 Hours',
      description: 'Covers linear models, analysis of variance, advanced statistical inference, hypothesis testing, and Indian official statistics.',
      sections: [
        {
          name: 'Linear Models',
          topics: [
            'Gauss-Markov setup, least squares estimation, estimable functions, normal equations.',
            'Gauss-Markov theorem, variance and covariance of least-squares estimators.',
            'Analysis of Variance (ANOVA): One-way and Two-way classifications.',
            'Linear regression analysis, diagnostics, residual analysis, coefficient of determination.',
            'Multicollinearity, Heteroscedasticity, Autocorrelation: detection, consequences, and remedies.'
          ]
        },
        {
          name: 'Statistical Inference',
          topics: [
            'Estimation: Unbiasedness, consistency, efficiency, sufficiency, completeness.',
            'Methods of Estimation: Maximum Likelihood Estimation (MLE), Method of Moments.',
            'Cramer-Rao Lower Bound (CRLB), Rao-Blackwell and Lehmann-Scheffe theorems.',
            'Testing of Hypotheses: Simple & composite hypotheses, Neyman-Pearson fundamental lemma.',
            'Uniformly Most Powerful (UMP) tests, Likelihood Ratio Tests (LRT).',
            'Confidence intervals, Non-parametric tests: Sign, Wilcoxon, Mann-Whitney U, Wald-Wolfowitz run test.'
          ]
        },
        {
          name: 'Official Statistics',
          topics: [
            'National Statistical System: MOSPI, Central Statistical Office (CSO), National Sample Survey Office (NSSO).',
            'Indian Official Statistical Agency roles: Agricultural, industrial, financial, and population records.',
            'Index Numbers: construction, tests (Time Reversal, Factor Reversal), Laspeyres, Paasche, Fisher indicators.',
            'Population Census in India: historical outline, organization, metrics recorded.',
            'National Income Estimation: GDP, GNP, methods, indicators, and official reports.'
          ]
        }
      ]
    },
    paper3: {
      title: 'Paper III (Descriptive)',
      weight: 'Subjective • 200 Marks • 3 Hours',
      description: 'Descriptive exam covering advanced sampling methodologies, econometric models, and applied statistical procedures.',
      sections: [
        {
          name: 'Sampling Techniques',
          topics: [
            'Simple Random Sampling (SRSWR & SRSWOR): estimation of mean, variance, sample size estimation.',
            'Stratified Random Sampling: proportional, optimum, Neyman allocation, gain in precision.',
            'Systematic Sampling: linear, circular, comparison with SRS and stratified sampling.',
            'Ratio and Regression methods of estimation, PPS sampling, cumulative total method, Lahiri method.',
            'Cluster sampling (equal size), Multi-stage sampling, Double sampling.'
          ]
        },
        {
          name: 'Econometrics',
          topics: [
            'General linear model: OLS, GLS, properties of estimators.',
            'Generalized least squares, Aitken estimation, heteroscedasticity structures.',
            'Multicollinearity: detection (VIF, Farrar-Glauber), consequences, ridge regression.',
            'Autocorrelation: Durbin-Watson test, Cochrane-Orcutt procedure.',
            'Simultaneous Equation Models: identification problem, Rank and Order conditions, ILS, 2SLS estimation.'
          ]
        },
        {
          name: 'Applied Statistics',
          topics: [
            'Analysis of Time Series: components (trend, seasonal, cyclic, irregular), measurement of trend.',
            'Stationary time series, Autoregressive (AR), Moving Average (MA), ARMA, ARIMA models.',
            'Demand Analysis: laws of demand & supply, elasticity of demand, Engel curve.',
            'Statistical Quality Control: process control, product control, 3-sigma control limits.'
          ]
        }
      ]
    },
    paper4: {
      title: 'Paper IV (Descriptive)',
      weight: 'Subjective • 200 Marks • 3 Hours',
      description: 'Candidates must choose any two sections out of seven optional specializations.',
      sections: [
        {
          name: '1. Operations Research & Reliability',
          topics: [
            'Definition and scope of OR; Linear Programming (LP), simplex method, duality, transportation & assignment problems.',
            'Queueing theory: steady state solutions of M/M/1, M/M/c queues under FIFO queue discipline.',
            'Inventory models: deterministic models with/without shortages, Economic Order Quantity (EOQ).',
            'Reliability: failure rate, hazard function, system reliability (series, parallel, k-out-of-n, standby redundant setups).'
          ]
        },
        {
          name: '2. Demography & Vital Statistics',
          topics: [
            'Sources of demographic data: registration systems, national census records, and sample surveys.',
            'Measurement of mortality: Crude Death Rate (CDR), Age-Specific (ASDR) and Standardized Death Rates.',
            'Life Tables: construction, force of mortality, actuarial functions, and abridged life table designs.',
            'Measurement of fertility: CBR, GFR, ASFR, TFR, and Net & Gross Reproduction Rates (NRR & GRR).',
            'Population growth models: exponential, geometric, logistic curves; population projections.'
          ]
        },
        {
          name: '3. Survival Analysis & Clinical Trials',
          topics: [
            'Concepts of censoring (Type-I, Type-II, interval, right and left censoring).',
            'Survival functions: Kaplan-Meier product-limit estimators, life-table (actuarial) estimators.',
            'Cox Proportional Hazards model: estimation and diagnostic testing.',
            'Clinical trials: Phases I, II, III & IV, randomized controlled trials, blinding, ethical guidelines.'
          ]
        },
        {
          name: '4. Statistical Quality Control',
          topics: [
            'Process control: 3-sigma control limits, charts for variables (X-bar, R, s) and attributes (p, c, np, u).',
            'Advanced charts: CUSUM (Cumulative Sum) charts and EWMA (Exponentially Weighted Moving Average).',
            'Acceptance Sampling: Single, Double, Multiple, and Sequential sampling plans by attributes.',
            'OC curves, Producer\'s & Consumer\'s risk, AQL, LTPD, AOQL, ASN.'
          ]
        },
        {
          name: '5. Multivariate Analysis',
          topics: [
            'Multivariate Normal Distribution: properties, marginal and conditional distributions.',
            'Wishart distribution: properties, joint distribution of sample mean vector and covariance matrix.',
            'Hotelling\'s T-square statistic: derivation and applications in hypothesis testing.',
            'Dimension reduction & taxonomy: PCA, Factor Analysis, Discriminant Analysis, and Canonical Correlation.'
          ]
        },
        {
          name: '6. Design & Analysis of Experiments',
          topics: [
            'Core principles: Replication, Randomization, and Local Control.',
            'Standard designs: CRD, RBD, LSD layouts and complete analysis of variance (ANOVA).',
            'Factorial experiments: 2^2, 2^3, 3^2 factorial systems, confounding (partial and complete).',
            'Advanced designs: Split-plot, Incomplete Block designs (BIBD, PBIBD), intra-block analysis.'
          ]
        },
        {
          name: '7. Computing with C and R',
          topics: [
            'C Programming: control flow structures, arrays, user-defined functions, pointers, and file operations.',
            'R Programming: vectors, lists, data frames, matrices, apply family, plotting with base and ggplot2 packages.',
            'Numerical simulation: random variable generation, Monte Carlo methods, Bootstrap, and Jackknife.'
          ]
        }
      ]
    }
  };

  const currentPaper = paperDetails[activePaper];

  // ── UPHESC Official Syllabus (exact as per U.P. Higher Education Services Commission notification) ──
  const uphescUnits = [
    {
      num: 1,
      title: 'Unit-1 : Probability Theory',
      topics: [
        'Random experiment: Trial, sample point, sample space.',
        'Definitions of equally likely, mutually exclusive and exhaustive events; events class.',
        'Definition of probability — classical and relative frequency approach to probability.',
        'Axiomatic approach to probability and its properties.',
        'Merits and demerits of these approaches.',
        'Total and compound probability theorems.',
        'Conditional probability; independence of events.',
        "Bayes' theorem and its applications.",
      ],
    },
    {
      num: 2,
      title: 'Unit-2 : Distribution Theory',
      topics: [
        'Random Variable: Concept of discrete random variable, probability mass function and distribution function, joint probability mass function of several discrete random variables, marginal and conditional probability mass functions.',
        'Continuous random variable: Probability density function, distribution function, joint density function of two continuous variables, marginal and conditional probability density functions, independence of random variables.',
        'Mathematical expectation, moments, factorial moments, moment generating function of a random variable — their properties and uses.',
        'Probability generating function.',
        "Chebyshev's inequality and its applications; basic ideas of convergence in probability and convergence in distribution; Markov's inequality.",
        'Functions of random variables.',
        'Bernoulli, Binomial, Poisson, Geometric, Negative Binomial, Hyper-Geometric, Multinomial, Uniform distributions.',
        'Normal distribution and its relationship with the Binomial and Poisson distributions; Cauchy distribution.',
        'Bivariate normal distribution and its marginal and conditional distributions.',
      ],
    },
    {
      num: 3,
      title: 'Unit-3 : Statistical Methods',
      topics: [
        'Concept of Statistical population and sample; classification of data — quantitative and qualitative, ordinal and nominal, time series and cross-sectional, multivariate data.',
        'Construction of tables (with one or more factors); diagrammatic and graphical representation of grouped data.',
        'Frequency and cumulative frequency distribution and their applications; histogram, frequency polygon, ogives, stem-and-leaf charts, box plot.',
        'Concept of central tendency and its measures; partition values; dispersion and relative dispersion.',
        "Moments; Sheppard's correction for moments (without derivation); skewness, kurtosis and their measures.",
        'Bivariate data: Scatter diagram, product moment correlation coefficient and its properties, coefficient of determination, correlation ratio, interclass correlation.',
        'Concept of error in regression; principle of least squares; fitting of linear regression and related results; rank correlation.',
        'Partial and multiple correlation in three variables — their measures and related results.',
        'Theory of attributes: Independence and Association of attributes; various measures of association for two-way classified data.',
      ],
    },
    {
      num: 4,
      title: 'Unit-4 : Statistical Quality Control and Time Series',
      topics: [
        'Statistical process and product control: Quality of a product; need for quality control; basic concept of process control; process capability and product control.',
        'General theory of control charts; causes of variation in quality; control limits; sub-grouping; summary of out-of-control criteria.',
        'Charts for attributes: p-chart, np-chart, c-chart.',
        'Charts for variables: X̄-chart, R-chart.',
        'Acceptance sampling: problem of lot acceptance; stipulation of good and bad lots; producers and consumers risks; single and double sampling plans; OC functions; concepts of AQL, LTPD, AOQL, average amount of inspection and ASN function.',
        'Measurement of Fertility: Crude birth rate, general fertility rate, age-specific birth rate, total fertility rate, gross reproduction rate, net reproduction rate, logistic model for population projection.',
        'Time Series Analysis: Economic time series; different components and their illustrations; additive and multiplicative models; determination of trend, seasonal and cyclical fluctuations.',
      ],
    },
    {
      num: 5,
      title: 'Unit-5 : Demography and Index Numbers',
      topics: [
        'Measurement of Mortality and Life Table: Crude death rate; standardized death rates; age-specific death rates; infant mortality rate; death rate by cause.',
        'Complete and abridged life table and its main features; uses of life table.',
        'Index Numbers: Price relatives and quantity/volume relatives; link and chain relatives; composition of index numbers.',
        "Laspeyres', Paasche's, Marshall-Edgeworth's and Fisher's index numbers.",
        'Chain-base index number; tests for index numbers; cost of living index number.',
      ],
    },
    {
      num: 6,
      title: 'Unit-6 : Statistical Inference',
      topics: [
        'Sampling distribution of a statistic; derivation of χ², t, F and Z distributions.',
        'Beta, Gamma and Laplace densities.',
        'Point estimation: properties of estimators — MSE, MMSE, unbiasedness, MVUE; Cramér–Rao lower bound; amount of information.',
        'Consistency of estimators and sufficient conditions; relative efficiency; asymptotic efficiency.',
        'Sufficiency; factorization theorem (without proof); complete sufficient statistics; Rao–Blackwell theorem; Lehmann–Scheffé theorem; one-parameter exponential family; Cramér–Rao inequality; BLUE.',
        'Methods of estimation: moments, MLE, minimum chi-square, least squares — BAN and CAN estimators.',
        'Concepts of confidence interval and confidence coefficient; CIs for univariate normal, two independent normal distributions, and exponential distributions.',
        'Statistical hypotheses; critical region; size and power of a test; most powerful test; randomized and non-randomized tests.',
        'Neyman–Pearson lemma and its applications; UMP unbiased test; power likelihood ratio test; functions of UMP.',
        'Applications of χ², t, F and Z in tests of significance; likelihood ratio test; χ²-test of goodness of fit; test of equality of several variances; significance test for correlation coefficient.',
      ],
    },
    {
      num: 7,
      title: 'Unit-7 : Sampling Theory',
      topics: [
        'Concept of population and sample; need for sampling; complete enumeration vs sampling; basic concepts; sampling and non-sampling errors.',
        'Simple random sampling (SRSWR & SRSWOR): estimation of population mean, proportion and their standard errors.',
        'Stratified random sampling: proportional and optimum allocation; comparison with SRS; post stratification; double sampling with post stratification.',
        'Ratio, product and regression methods of estimation: estimation of population mean; bias and variance to first order of approximation; comparison with SRS.',
        'Systematic sampling; cluster sampling with equal clusters; two-stage sampling.',
        'Unequal probability sampling: PPSWR/PPSWOR methods (cumulative total method and Lahiri\'s scheme); comparison of SRSWR and PPSWR; Des Raj and Murthy ordered estimators (n=2); construction of unordered estimators.',
        'Horvitz–Thompson estimator; variance expression and unbiased estimator of variance; Yates–Grundy modification.',
        'Non-sampling errors; Hansen–Hurwitz estimator; concept of randomized response and well-known techniques for sensitive characteristics.',
      ],
    },
    {
      num: 8,
      title: 'Unit-8 : Linear Estimation and Design of Experiments',
      topics: [
        'General linear model: assumptions; estimation of parameters by least squares; estimable functions; error and estimation space; Gauss–Markov theorem.',
        'Distribution of quadratic forms and application in ANOVA; estimable linear hypothesis; generalized F and t tests.',
        'One-way ANOVA; two-way ANOVA with single observation per cell and equal observations per cell; Tukey\'s test.',
        'Randomization, Replication, Local Control; CRD, RBD, LSD; missing plot technique.',
        'General block design and its information matrix (C); criteria for connectedness, balance and orthogonality; intra-block analysis; BIBD.',
        'General factorial experiments; factorial effects; 2ⁿ and 3ⁿ factorial experiments in randomized blocks; complete and partial confounding; construction of confounded factorial experiments; split-plot experiment.',
      ],
    },
    {
      num: 9,
      title: 'Unit-9 : Multivariate Analysis',
      topics: [
        'Multivariate normal distribution (MND): normal generating function, characteristic function, marginal and conditional distributions, multiple and partial correlation coefficients.',
        'MLE of mean vector and covariance matrix; distribution of sample mean vector.',
        'Null distribution of sample correlation coefficient; sample multiple and partial correlation coefficients and their null sampling distributions; distribution of sample regression coefficient.',
        "Null and non-null distributions of Hotelling's T² statistic; applications to tests for mean vector(s) and components; Mahalanobis' D²; Wishart distribution and its properties.",
        'Classification and discrimination procedures for two multivariate normal populations; sample discriminant function; tests associated with discriminant functions; probabilities of misclassification and their estimation.',
        'Classification into more than two multivariate normal populations; Fisher–Behrens problem.',
      ],
    },
    {
      num: 10,
      title: 'Unit-10 : Advance Probability Theory',
      topics: [
        'Classes of sets; fields; sigma-fields; minimal sigma-field; Borel sigma-field; sequence of sets and limit of a sequence of sets.',
        'Measure; probability measure; properties of measure; Carathéodory, Lebesgue and Lebesgue–Stieltjes measures.',
        'Measurable functions; random variables; sequence of random variables; integration of a measurable function w.r.t. a measure.',
        'Monotone convergence theorem; Fatou\'s lemma; dominated convergence theorem.',
        'Characteristic function; uniqueness theorem; Lévy\'s continuity theorem (statement only).',
        'Convergence in distribution; convergence in probability; almost sure convergence.',
        'Decomposition of distribution functions in purely discrete, absolutely continuous and singular components.',
        "Hölder's inequality; Minkowski inequality; Lyapunov and Kolmogorov's inequalities.",
        'Weak (WLLN) and Strong (SLLN) law of Large Numbers; Khintchine theorem; Kolmogorov SLLN; Borel zero-one law; Borel–Cantelli lemma.',
        'Weak and complete convergence of sequence of distribution functions; weak compactness theorem; Helly–Bray lemma and theorem.',
        'One-dimensional Central Limit Theorems: Lindeberg–Lévy for i.i.d. random variables.',
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-slate-100/85 dark:bg-slate-950/85 backdrop-blur-2xl flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 border border-black/10 dark:border-white/15 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] min-h-0 flex flex-col animate-in fade-in zoom-in-95 duration-150 text-slate-900 dark:text-slate-100 overflow-hidden">

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-black/8 dark:border-white/10 flex items-center justify-between bg-black/[0.02] dark:bg-white/5 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${
              activeSource === 'uphesc'
                ? 'bg-violet-500/15 dark:bg-violet-500/20 text-violet-500 dark:text-violet-400 border-violet-300 dark:border-violet-500/20'
                : 'bg-indigo-500/15 dark:bg-indigo-500/20 text-indigo-500 dark:text-indigo-400 border-indigo-300 dark:border-indigo-500/20'
            }`}>
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold font-display text-slate-900 dark:text-white truncate">
                {activeSource === 'uphesc' ? 'UPHESC Statistics Syllabus' : 'UPSC ISS Official Syllabus'}
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {activeSource === 'uphesc'
                  ? 'U.P. Higher Education Services Commission — Subject Code-77'
                  : 'Indian Statistical Service (Statistics I, II, III & IV)'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white flex items-center justify-center text-slate-500 dark:text-slate-400 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── ISS Content ── */}
        {activeSource === 'iss' && (
          <>
            {/* ISS Paper tabs */}
            <div className="bg-black/[0.02] dark:bg-slate-950/20 p-2 border-b border-black/5 dark:border-white/5 flex gap-1 overflow-x-auto scrollbar-none shrink-0">
              {(Object.keys(paperDetails) as Array<ActivePaper>).map((key) => {
                const paper = paperDetails[key];
                const isActive = activePaper === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActivePaper(key)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    {paper.title.split(' ')[0]} {paper.title.split(' ')[1]}
                  </button>
                );
              })}
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex-1 min-h-0 space-y-6">
              <div className="bg-gradient-to-r from-indigo-50 dark:from-indigo-950/40 to-white dark:to-slate-900 border border-indigo-100 dark:border-white/5 p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5">
                <div className="space-y-1">
                  <span className="text-[10px] bg-indigo-500/15 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded-full font-mono uppercase font-semibold">
                    {currentPaper.weight.split('•')[0].trim()}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">{currentPaper.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl">{currentPaper.description}</p>
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 border-l border-black/8 dark:border-white/10 pl-4 py-1 font-mono flex items-center gap-2">
                  <GraduationCap className="w-4.5 h-4.5 text-indigo-500 dark:text-indigo-400" />
                  <span>{currentPaper.weight}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {currentPaper.sections.map((sec, sIdx) => (
                  <div key={sIdx} className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/6 dark:border-white/5 rounded-xl p-4 flex flex-col gap-3 hover:border-black/10 dark:hover:border-white/10 transition-all duration-200">
                    <div className="flex items-center gap-2 pb-2 border-b border-black/6 dark:border-white/5">
                      <div className="w-6 h-6 rounded-md bg-indigo-500/10 flex items-center justify-center text-indigo-500 dark:text-indigo-400 text-xs font-bold">{sIdx + 1}</div>
                      <h4 className="text-xs font-bold text-indigo-500 dark:text-indigo-300 tracking-wide line-clamp-1" title={sec.name}>{sec.name}</h4>
                    </div>
                    <ul className="space-y-2.5 flex-1 overflow-y-auto max-h-[220px] scrollbar-none pr-1">
                      {sec.topics.map((topic, tIdx) => (
                        <li key={tIdx} className="flex gap-2 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 dark:text-indigo-500 shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-black/8 dark:border-white/10 bg-black/[0.03] dark:bg-slate-950/60 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 shrink-0">
              <span>Official Union Public Service Commission (UPSC) Indian Statistical Service Scheme</span>
              <span className="font-mono">ISS 2026 Reference</span>
            </div>
          </>
        )}

        {/* ── UPHESC Content ── */}
        {activeSource === 'uphesc' && (
          <>
            {/* Unit tabs — same horizontal chip pattern as ISS papers */}
            <div className="bg-black/[0.02] dark:bg-slate-950/20 p-2 border-b border-black/5 dark:border-white/5 flex gap-1 overflow-x-auto scrollbar-none shrink-0">
              {uphescUnits.map((u) => {
                const isActive = activeUphescUnit === u.num;
                return (
                  <button
                    key={u.num}
                    onClick={() => setActiveUphescUnit(u.num)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-violet-600 text-white shadow-md'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    Unit {u.num}
                  </button>
                );
              })}
            </div>

            {(() => {
              const unit = uphescUnits[activeUphescUnit - 1];
              return (
                <div className="p-4 sm:p-6 overflow-y-auto flex-1 min-h-0 space-y-5">
                  <div className="bg-gradient-to-r from-violet-50 dark:from-violet-950/40 to-white dark:to-slate-900 border border-violet-100 dark:border-white/5 p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5">
                    <div className="space-y-1 min-w-0">
                      <span className="text-[10px] bg-violet-500/15 dark:bg-violet-500/20 text-violet-600 dark:text-violet-300 px-2 py-0.5 rounded-full font-mono uppercase font-semibold">
                        Unit {unit.num} of 10
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">{unit.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl">
                        Official UPHESC Statistics (Subject Code-77) topics for this unit.
                      </p>
                    </div>
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 md:border-l border-black/8 dark:border-white/10 md:pl-4 py-1 font-mono flex items-center gap-2">
                      <GraduationCap className="w-4.5 h-4.5 text-violet-500 dark:text-violet-400" />
                      <span>Subject Code-77</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/6 dark:border-white/5 rounded-xl p-4 flex flex-col gap-3">
                      <div className="flex items-center gap-2 pb-2 border-b border-black/6 dark:border-white/5">
                        <div className="w-6 h-6 rounded-md bg-violet-500/10 flex items-center justify-center text-violet-500 dark:text-violet-400 text-xs font-bold">{unit.num}</div>
                        <h4 className="text-xs font-bold text-violet-500 dark:text-violet-300 tracking-wide">
                          {unit.title.replace(/^Unit-\d+ : /, '')}
                        </h4>
                      </div>
                      <ul className="space-y-2.5">
                        {unit.topics.map((topic, tIdx) => (
                          <li key={tIdx} className="flex gap-2 text-[11px] sm:text-xs leading-relaxed text-slate-600 dark:text-slate-300 font-sans">
                            <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 dark:text-violet-500 shrink-0 mt-0.5" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="p-4 border-t border-black/8 dark:border-white/10 bg-black/[0.03] dark:bg-slate-950/60 flex items-center justify-between gap-3 text-[10px] text-slate-400 dark:text-slate-500 shrink-0">
              <span className="truncate">U.P. Higher Education Services Commission, Prayagraj</span>
              <span className="font-mono shrink-0">UPHESC · Code-77</span>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default SyllabusModal;

import React, { useState } from 'react';
import { X, BookOpen, Layers, GraduationCap, FileText, CheckCircle2 } from 'lucide-react';

interface SyllabusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ActivePaper = 'paper1' | 'paper2' | 'paper3' | 'paper4';

export const SyllabusModal: React.FC<SyllabusModalProps> = ({ isOpen, onClose }) => {
  const [activePaper, setActivePaper] = useState<ActivePaper>('paper1');

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

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-white/15 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150 text-slate-100">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold font-display text-white">UPSC ISS Official Syllabus</h2>
              <p className="text-[11px] text-slate-400">Indian Statistical Service (Statistics I, II, III & IV)</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white flex items-center justify-center text-slate-400 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Paper Switcher Tabs */}
        <div className="bg-slate-950/40 p-2 border-b border-white/5 flex gap-1 overflow-x-auto scrollbar-none shrink-0">
          {(Object.keys(paperDetails) as Array<ActivePaper>).map((key) => {
            const paper = paperDetails[key];
            const isActive = activePaper === key;
            return (
              <button
                key={key}
                onClick={() => setActivePaper(key)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                {paper.title.split(' ')[0]} {paper.title.split(' ')[1]}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Paper Summary Header Banner */}
          <div className="bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-white/5 p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5">
            <div className="space-y-1">
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-mono uppercase font-semibold">
                {currentPaper.weight.split('•')[0].trim()}
              </span>
              <h3 className="text-sm font-bold text-white mt-1">{currentPaper.title}</h3>
              <p className="text-xs text-slate-400 max-w-2xl">{currentPaper.description}</p>
            </div>
            <div className="text-xs font-semibold text-slate-400 border-l border-white/10 pl-4 py-1 font-mono flex items-center gap-2">
              <GraduationCap className="w-4.5 h-4.5 text-indigo-400" />
              <span>{currentPaper.weight}</span>
            </div>
          </div>

          {/* Core Syllabus Chapters / Sub-sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentPaper.sections.map((sec, sIdx) => (
              <div 
                key={sIdx}
                className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col gap-3 hover:border-white/10 transition-all duration-200"
              >
                <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                  <div className="w-6 h-6 rounded-md bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-xs font-bold">
                    {sIdx + 1}
                  </div>
                  <h4 className="text-xs font-bold text-indigo-300 tracking-wide line-clamp-1" title={sec.name}>
                    {sec.name}
                  </h4>
                </div>

                <ul className="space-y-2.5 flex-1 overflow-y-auto max-h-[220px] scrollbar-none pr-1">
                  {sec.topics.map((topic, tIdx) => (
                    <li key={tIdx} className="flex gap-2 text-[11px] leading-relaxed text-slate-300 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-950/60 flex items-center justify-between text-[10px] text-slate-500 shrink-0">
          <span>Official Union Public Service Commission (UPSC) Indian Statistical Service Scheme</span>
          <span className="font-mono">ISS 2026 Reference</span>
        </div>

      </div>
    </div>
  );
};

export default SyllabusModal;

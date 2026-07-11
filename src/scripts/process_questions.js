const fs = require('fs');
const path = require('fs');

// We have the raw questions for Paper 3 and Paper 4 from years 2016-2025 as provided by the user.
// Let's write them directly into our Node.js import database script!
const rawQuestions = [
  {
    "year": 2016,
    "paper": 3,
    "exam": "UPSC Indian Statistical Service (ISS) Examination 2016",
    "subject": "Statistics Paper III",
    "sections": [
      {
        "section_name": "Section A",
        "questions": [
          {
            "number": 1,
            "sub_questions": [
              {
                "letter": "a",
                "text": "Define Des Raj's ordered estimator for population mean on the basis of a sample of size 2 and show that it is unbiased."
              },
              {
                "letter": "b",
                "text": "Let $\\pi_i$ and $\\pi_{ij} (j \\neq i)$ be the inclusion probabilities of first and second order respectively in a simple random sample of size $n$, selected from a finite population of size $N$. Then show that (i) $\\sum_{i=1}^{N} \\pi_i = n$ and (ii) $\\sum_{j \\neq i} \\pi_{ij} = n(n-1)$."
              },
              {
                "letter": "c",
                "text": "Give a practical example where two-stage sampling scheme may be adopted. For equal size first-stage units, obtain an estimator for population mean in two-stage sampling and its variance. Discuss the problem of allocation of first and second-stage sample sizes for a fixed cost."
              }
            ]
          },
          {
            "number": 2,
            "sub_questions": [
              {
                "letter": "a",
                "text": "Describe the problem of multicollinearity in general linear model and explain how will you detect it."
              },
              {
                "letter": "b",
                "text": "In usual notation consider the standard linear model: $Y = X\\beta + U; U \\sim N(0, \\sigma^2I)$. Show that the MLE $\\hat{\\beta}$ of $\\beta$ have the distribution $N(\\beta, \\sigma^2(X'X)^{-1})$, assuming $X'X$ to be an invertible matrix."
              },
              {
                "letter": "c",
                "text": "(i) Explain the identification problem in a system of simultaneous equations. State, without proof, the rank and order conditions for identifiability of an equation. (ii) Identify the following system: $Y_1 = 3Y_2 - 2X_1 + X_2 + U_1$, $Y_2 = Y_3 + X_3 + U_2$, $Y_3 = -Y_2 - 2X_3 + U_3$."
              }
            ]
          },
          {
            "number": 3,
            "sub_questions": [
              {
                "letter": "a",
                "text": "Construct the price index number for 2010 with 2005 as base year from the following data by using (i) Laspeyre's (ii) Paasche's and (iii) Fisher's method. Verify whether the Time Reversal Test is satisfied by the abovementioned index numbers."
              },
              {
                "letter": "b",
                "text": "Define price elasticity of demand ($\\eta_p$) and interpret when $\\eta_p$ is (i) < 1, (ii) > 1 and (iii) = 1. If the demand function is $p = 10 - 5x^2$, for what value of $x$ elasticity of demand will be unity? ($x$ is the quantity demanded and $p$ is the price)."
              },
              {
                "letter": "c",
                "text": "Define autocorrelation of lag $K$ of a stationary process. Consider the time series model defined by $X_t = \\alpha_1 X_{t-1} + \\alpha_2 X_{t-2} + \\alpha_3 X_{t-3} + \\epsilon_t$ where $\\epsilon_t$ is white noise. (i) Show that the autocorrelation coefficient with lag 1 for the process is $\\rho_1 = \\frac{\\alpha_1 + \\alpha_2\\alpha_3}{1 - \\alpha_2 - \\alpha_1\\alpha_3 - \\alpha_3^2}$. (ii) Consider the case where $\\alpha_1 = \\alpha_2 = \\alpha_3 = \\alpha$. Comment on the stationarity of this model. Calculate $\\rho_1$ and $\\rho_2$."
              }
            ]
          }
        ]
      },
      {
        "section_name": "Section B",
        "questions": [
          {
            "number": 4,
            "sub_questions": [
              {
                "letter": "a",
                "text": "A finite population of size 100 is divided into two strata. In the usual notations, it is given that $N_1=60, N_2=40, S_1=2S_2$. If a sample of size 24 is to be selected from the population, obtain the number of units to be selected from each of the stratum under Neyman allocation."
              },
              {
                "letter": "b",
                "text": "For the model $y = X\\beta + u$ if $X$ and $u$ are correlated show that the OLS estimator for $\\beta$ is not consistent. Discuss the use of instrumental variable technique to obtain a consistent estimator of $\\beta$."
              },
              {
                "letter": "c",
                "text": "Consider a time series $y_t = T_t + C_t + I_t$, where $T_t$ a trend, $C_t$ a cyclical component and $I_t$ a random component. Discuss the effect of moving averages on cyclical and random components assuming $C_t = a \\sin(2\\pi t/k)$."
              }
            ]
          },
          {
            "number": 5,
            "sub_questions": [
              {
                "letter": "a",
                "text": "Explain Koyck's approach to distributed geometric lag model."
              },
              {
                "letter": "b",
                "text": "What is a chain index number? Discuss its advantages and disadvantages over fixed-base index number."
              },
              {
                "letter": "c",
                "text": "In what sense cluster sampling is different from simple random sampling? Define an unbiased estimator for population mean in case of cluster sampling with equal cluster size. Compare the efficiency of cluster sampling in terms of intra-class correlation coefficient with respect to simple random sampling without replacement."
              }
            ]
          },
          {
            "number": 6,
            "sub_questions": [
              {
                "letter": "a",
                "text": "You believe that a set of data is the realization of an MA(1) process $X_t = e_t + \\beta e_{t-1}$, where the errors $e_t$ are standard normal. You have calculated the sample auto-covariance function and found that $\\gamma_0=1$ and $\\gamma_1 = -0.25$. Estimate the parameter $\\beta$. Which value of $\\beta$ do you think you should choose and why?"
              },
              {
                "letter": "b",
                "text": "Describe the Lahiri's method of selecting a probability proportional to size sample from a finite population of size $N$."
              },
              {
                "letter": "c",
                "text": "Describe lag model and distributed lag model. What are the different lag schemes? How would you estimate lags by applying ordinary least square?"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "year": 2016,
    "paper": 4,
    "exam": "UPSC Indian Statistical Service (ISS) Examination 2016",
    "subject": "Statistics Paper IV",
    "sections": [
      {
        "section_name": "Section A (Operations Research and Reliability)",
        "questions": [
          {
            "number": 1,
            "sub_questions": [
              {
                "letter": "a",
                "text": "Solve the following two-person zero-sum game using graphical procedure: \\begin{pmatrix} 1 & -3 \\\\ 3 & 5 \\\\ -1 & 6 \\\\ 4 & 1 \\\\ 2 & 2 \\\\ -5 & 0 \\end{pmatrix}"
              },
              {
                "letter": "b",
                "text": "If the demand for a certain product has a rectangular distribution between 4000 and 5000, then find the optimal order quantity if the storage cost is \\( ₹1 \\) per unit and the shortage cost is \\( ₹2 \\) per unit."
              },
              {
                "letter": "c",
                "text": "A supermarket has two salesgirls at the counter. If the service time for each customer is exponential with mean 4 minutes and if people arrive in a Poisson fashion at 10 per hour, then find the expected percentage of idle time for each salesgirl."
              },
              {
                "letter": "d",
                "text": "Find out ML estimators of the parameters in the density \\( f(x) = \\frac{1}{b} e^{-x/b}, x > 0, b > 0 \\) based on the following censored scheme where n and r are respectively the sample size and number of censored observations."
              },
              {
                "letter": "e",
                "text": "Defining a location-scale family, outline the procedure for obtaining the coefficient of BLUEs."
              }
            ]
          },
          {
            "number": 2,
            "sub_questions": [
              {
                "letter": "a",
                "text": "A computer contains 10000 resistors. When any resistor fails, it is replaced. The cost of replacing a resistor individually is \\( ₹1 \\) only. If all the resistors are replaced at the same time, the cost per resistor comes down to 35 paise. The percent of surviving, \\( S(t) \\), at the end of t-th month is given by the table: t=0, S(t)=100; t=1, S(t)=97; t=2, S(t)=90; t=3, S(t)=70; t=4, S(t)=32; t=5, S(t)=15; t=6, S(t)=0. Derive the optimum replacement plan."
              },
              {
                "letter": "b",
                "text": "A random sample of 25 observations drawn from Weibull model (with shape parameter 2 and scale parameter = 4) is given. Obtain the moment estimates of the parameters. [Data provided: 1.8487, 0.3761, 0.7500, 3.0530, 1.3545; 1.8802, 1.5700, 1.7708, 1.3592, 3.0466; 1.7961, 1.5319, 0.5903, 0.6288, 0.6461; 1.6560, 1.7172, 1.9310, 1.0509, 1.6173; 1.3162, 0.7705, 1.8889, 4.1505]"
              }
            ]
          }
        ]
      },
      {
        "section_name": "Section B (Demography and Vital Statistics)",
        "questions": [
          {
            "number": 3,
            "sub_questions": [
              {
                "letter": "a",
                "text": "Discuss the sources of demographic data in India and also point out the uses and limitations of these data."
              },
              {
                "letter": "b",
                "text": "Explain the stationary and stable models. Discuss the population situation when stationary and stable populations are identical."
              },
              {
                "letter": "c",
                "text": "Explain briefly the uses of life table. In usual notation, prove that $d_x = -l_x \\cdot \\frac{d}{dx} \\ln(l_x)$."
              },
              {
                "letter": "d",
                "text": "Define crude death rate, specific death rate and standardized death rate. Interpret these rates."
              },
              {
                "letter": "e",
                "text": "State the general procedure and steps for the construction of life tables."
              }
            ]
          },
          {
            "number": 4,
            "sub_questions": [
              {
                "letter": "a",
                "text": "Explain an abridged life table and discuss its different columns. Discuss the King's method for its construction."
              },
              {
                "letter": "b",
                "text": "What do you mean by fertility? Define crude birthrate, general fertility rate, specific fertility rate and age-specific fertility rate. How are these rates computed in practice?"
              }
            ]
          }
        ]
      },
      {
        "section_name": "Section C (Survival Analysis and Clinical Trials)",
        "questions": [
          {
            "number": 5,
            "sub_questions": [
              {
                "letter": "a",
                "text": "Define hazard function and survival function. Obtain the same for an exponential distribution."
              },
              {
                "letter": "b",
                "text": "If $f(t)$, $F(t)$ and $h(t)$ are the density, distribution and hazard functions of a random variable $T$, then show that $h(t) = \\frac{f(t)}{1-F(t)}$. Also establish a suitable relationship between $h(t)$ and reliability function."
              },
              {
                "letter": "c",
                "text": "If $p_x$ is the probability that a person aged x will survive to age x+1, then show that $p_x + nq_x = 1$, where $_np_x$ represents survival probability."
              },
              {
                "letter": "d",
                "text": "Discuss some specific situations in which it would be difficult or inefficient to perform clinical trials."
              },
              {
                "letter": "e",
                "text": "What are the principles for ethical clinical trials?"
              }
            ]
          },
          {
            "number": 6,
            "sub_questions": [
              {
                "letter": "a",
                "text": "Define Type-I and Type-II censoring schemes. Obtain the maximum likelihood estimator of parameter $\\theta$ in exponential distribution under the above censoring schemes. Also obtain Fisher information for the parameter."
              },
              {
                "letter": "b",
                "text": "Discuss various phases involved in a clinical trial. Also discuss the pros and cons of each phase."
              }
            ]
          }
        ]
      },
      {
        "section_name": "Section D (Quality Control)",
        "questions": [
          {
            "number": 7,
            "sub_questions": [
              {
                "letter": "a",
                "text": "Distinguish between process control and product control. Discuss the situations where they are used."
              },
              {
                "letter": "b",
                "text": "Discuss various sources of assignable causes and random causes of variations. Also state how they are detected in a manufacturing process."
              },
              {
                "letter": "c",
                "text": "Define the terms ASN, AOQ, ATI and ARL for an acceptance sampling plan."
              },
              {
                "letter": "d",
                "text": "What is an acceptance sampling plan? Discuss a single sampling plan $(n, c)$, where the sampling is carried out using a binomial model. Find $P_a$, if n=10, c=3 and p=0.05."
              },
              {
                "letter": "e",
                "text": "State the importance of exponentially weighted moving average charts. How are these used in practical situations?"
              }
            ]
          },
          {
            "number": 8,
            "sub_questions": [
              {
                "letter": "a",
                "text": "Discuss the importance of control charts for variables."
              },
              {
                "letter": "b",
                "text": "Obtain the control limits for $(\\bar{X}, R)$ and $(\\bar{X}, S)$ charts when standards are known and unknown."
              },
              {
                "letter": "c",
                "text": "In usual notation, show that $c_2 = \\sqrt{\\frac{2}{n-1}} \\frac{\\Gamma(n/2)}{\\Gamma((n-1)/2)}$, where $c_2$ is a constant used for constructing control limits."
              },
              {
                "letter": "d",
                "text": "Discuss in detail the double sampling plan $(N, n_1, c_1, n_2, c_2)$ stating the assumptions followed in both the stages. Hence or otherwise, obtain the ASN function of this sampling procedure."
              }
            ]
          }
        ]
      },
      {
        "section_name": "Section E (Multivariate Analysis)",
        "questions": [
          {
            "number": 9,
            "sub_questions": [
              {
                "letter": "a",
                "text": "Define p-variate normal distribution and obtain its characteristic function. Assume mean vector $\\mu$ and dispersion matrix $\\Sigma$."
              },
              {
                "letter": "b",
                "text": "Define Hotelling's $T^2$ and mention its application. Show that $T^2(p, m) = \\frac{mp}{m-p+1} F(p, m-p+1)$."
              },
              {
                "letter": "c",
                "text": "Explain the importance of principal components and discuss the method for extraction of principal components."
              },
              {
                "letter": "d",
                "text": "Define Wishart distribution and obtain its characteristic function."
              },
              {
                "letter": "e",
                "text": "Define canonical variates and canonical correlation. Give your interpretation."
              }
            ]
          },
          {
            "number": 10,
            "sub_questions": [
              {
                "letter": "a",
                "text": "State the chief properties of Wishart distribution. If $A_i \\sim W_p(\\Sigma, n_i), i=1, 2, \\dots, k$, then show that $A = \\sum_{i=1}^k A_i$ has the Wishart distribution with parameters $\\Sigma$ and $n$, where $n = \\sum_{i=1}^k n_i$, assuming the independence of $A_i$'s."
              },
              {
                "letter": "b",
                "text": "Define multiple correlation coefficient and obtain its non-null distribution."
              }
            ]
          }
        ]
      },
      {
        "section_name": "Section F (Design and Analysis of Experiments)",
        "questions": [
          {
            "number": 11,
            "sub_questions": [
              {
                "letter": "a",
                "text": "What are the basic principles of design of experiments? Explain them and their roles."
              },
              {
                "letter": "b",
                "text": "Define completely randomized design, and mention its merits and demerits. Also give its statistical analysis."
              },
              {
                "letter": "c",
                "text": "Define Latin square design with its applications, advantages and disadvantages."
              },
              {
                "letter": "d",
                "text": "Explain analysis of covariance with its applications. Give an illustration for the use of analysis of covariance in identifying the response variable (y) and concomitant variable (x)."
              },
              {
                "letter": "e",
                "text": "Explain split-plot design and give some situations where split-plot design can be suitably adopted."
              }
            ]
          },
          {
            "number": 12,
            "sub_questions": [
              {
                "letter": "a",
                "text": "What are factorial experiments? The table provided gives the layout and the results of a $2^3$-factorial design laid out in four replicates to determine the effect of Nitrogen (N), Potash (K) and Phosphate (P) on potato crop yield. Analyze the design and draw conclusions."
              },
              {
                "letter": "b",
                "text": "What is confounding? A $2^3$-factorial experiment is conducted in 2 blocks of size 4 each, in 3 replicates. Identify the confounded effect in each replicate."
              },
              {
                "letter": "c",
                "text": "Define a Randomized Block Design (RBD) specifying the statistical model associated with the design. Carry out a complete analysis of RBD with one missing observation."
              }
            ]
          }
        ]
      },
      {
        "section_name": "Section G (Computing with C and R)",
        "questions": [
          {
            "number": 13,
            "sub_questions": [
              {
                "letter": "a",
                "text": "Given a five-digit positive integer, write a C program to find the sum of individual digits."
              },
              {
                "letter": "b",
                "text": "Write a C program to pick up the largest tender from a set of tenders assuming that Tender-id and Tender-value for each tender are specified."
              },
              {
                "letter": "c",
                "text": "Express $(A-B)*C$ in infix and postfix forms."
              },
              {
                "letter": "d",
                "text": "Write a program in R to plot Q-Q plot assuming that the two samples ($X_i, i=1, 2, \\dots, 25$ and $Y_i, i=1, 2, \\dots, 250$) are drawn from normal population."
              },
              {
                "letter": "e",
                "text": "Given n positive integers, write R code to find their ranks."
              }
            ]
          },
          {
            "number": 14,
            "sub_questions": [
              {
                "letter": "a",
                "text": "Illustrate call by value and call by reference, and advantages as well as disadvantages of each method. Write a C function to evaluate the series: $\\sin(x) = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots$"
              },
              {
                "letter": "b",
                "text": "Given $X \\sim N(\\mu, \\sigma)$, where $\\mu$ and $\\sigma$ are specified, write a C program to compute $P(X) = \\int_{-\\infty}^x \\text{Density of } N(\\mu, \\sigma) dt$."
              }
            ]
          }
        ]
      }
    ]
  }
];

// Let's write a node snippet that parses other years directly from a file or defines them as code.
// Since the user request has all 10 years of questions for paper 3 and 4, we will parse them perfectly.
// Let's write a dynamic generator of questions based on a structured dataset to be loaded,
// but since the file is large, we can define the full mapping in a parser script.
// Let's write a script that processes the pasted data or fetches/merges them.
// Wait! Let's check: can we fetch the other years from raw_source.json? No, we need to append them.
// Let's write a Node program to append the years from 2017 to 2025.
// Since we have the exact JSON string for 2016-2025, let's write it to /src/data/raw_source.json in chunks,
// or we can write a single script that merges everything.
// Let's first make sure we write a script that can read the user's uploaded/attached text if it was saved as a file.
// Wait, did the platform save the attachment to a file in the workspace? Let's check!
// Let's do list_dir or run a search.

const fs = require('fs');
const path = require('path');

const EXPLANATIONS_PATH = path.join(__dirname, '../src/data/explanations.json');
const expl = JSON.parse(fs.readFileSync(EXPLANATIONS_PATH, 'utf8'));

const mathWords = [
  // Lowercase Greek letters
  'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'varepsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'varphi', 'chi', 'psi', 'omega',
  // Uppercase Greek letters
  'Gamma', 'Delta', 'Theta', 'Lambda', 'Xi', 'Pi', 'Sigma', 'Phi', 'Psi', 'Omega',
  // Math operators & symbols
  'sum', 'prod', 'coprod', 'int', 'iint', 'iiint', 'oint', 'partial', 'grad', 'nabla', 'dots', 'cdots', 'vdots', 'ddots', 'frac', 'sqrt', 'lim', 'log', 'ln', 'exp', 'sin', 'cos', 'tan', 'cot', 'sec', 'csc',
  // Binary relations & operators
  'approx', 'neq', 'le', 'ge', 'pm', 'mp', 'times', 'div', 'ast', 'star', 'circ', 'bullet', 'cdot', 'cap', 'cup', 'subset', 'supset', 'subseteq', 'supseteq', 'in', 'ni', 'notin', 'cong', 'equiv', 'propto', 'sim', 'simeq', 'perp', 'parallel', 'mid', 'vdash', 'dashv',
  // Arrows
  'to', 'gets', 'leftrightarrow', 'Leftarrow', 'Rightarrow', 'Leftrightarrow', 'uparrow', 'downarrow', 'updownarrow', 'Uparrow', 'Downarrow', 'Updownarrow', 'nearrow', 'searrow', 'swarrow', 'nwarrow',
  // Font styles & formats
  'mathbf', 'mathrm', 'mathit', 'mathsf', 'mathtt', 'mathbb', 'mathcal', 'mathfrak', 'boldsymbol', 'operatorname',
  // Accents
  'hat', 'tilde', 'bar', 'vec', 'dot', 'ddot',
  // Layout / commands
  'begin', 'end', 'left', 'right', 'quad', 'qquad',
  // Statistical specific terms
  'MSE', 'Bias', 'Var', 'cov', 'covar'
];

function repairMathString(mathStr) {
  let s = mathStr;

  // 1. Temporarily extract \operatorname{...} and \text{...}
  const opPlaceholders = [];
  s = s.replace(/\\?(operatorname|text)\{([^}]+)\}/g, (match, type, content) => {
    opPlaceholders.push({ type, content });
    return `@@OP_${opPlaceholders.length - 1}_OP@@`;
  });

  // 2. Add backslashes to keywords inside math that lost them
  for (const word of mathWords) {
    const regexStr = "(?<![a-zA-Z\\\\\\\\])" + word + "(?![a-zA-Z])";
    const regex = new RegExp(regexStr, 'g');
    s = s.replace(regex, '\\' + word);
  }

  // 3. Restore the operator placeholders with correct leading backslash
  opPlaceholders.forEach((placeholder, index) => {
    const token = `@@OP_${index}_OP@@`;
    s = s.split(token).join(`\\${placeholder.type}{${placeholder.content}}`);
  });
  
  return s;
}

function repairText(text) {
  if (!text) return '';
  
  // 1. Repair control characters globally FIRST so math delimiters align perfectly
  let s = text;
  s = s.replace(/\x08/g, '\\b'); // backspace -> \b
  s = s.replace(/\x0c/g, '\\f'); // form feed -> \f
  s = s.replace(/\x0b/g, '\\v'); // vertical tab -> \v
  s = s.replace(/\x09/g, '\\t'); // tab -> \t
  s = s.replace(/\x0d/g, '\\r'); // carriage return -> \r
  s = s.replace(/\n\s*eq/g, '\\neq'); // literal newline followed by eq -> \neq
  s = s.replace(/\n\s*e\b/g, '\\ne'); // literal newline followed by e -> \ne

  let result = '';
  let lastIndex = 0;
  
  // Regex to match math delimiters
  const mathRegex = /(\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$\$[\s\S]*?\$\$|\$[^$\n]+?\$)/g;
  
  let match;
  while ((match = mathRegex.exec(s)) !== null) {
    result += s.substring(lastIndex, match.index);
    const repairedMath = repairMathString(match[0]);
    result += repairedMath;
    lastIndex = mathRegex.lastIndex;
  }
  result += s.substring(lastIndex);
  return result;
}

// Traverse the JSON object and update all papers (paper1, paper2, paper3)
let repairedCount = 0;
const paperKeys = ['paper1', 'paper2', 'paper3'];

for (const paperKey of paperKeys) {
  const paper = expl[paperKey] || {};
  for (const [section, years] of Object.entries(paper)) {
    for (const [year, qNums] of Object.entries(years)) {
      for (const [qNum, text] of Object.entries(qNums)) {
        const repaired = repairText(text);
        years[year][qNum] = repaired;
        repairedCount++;
      }
    }
  }
}

// Save back the explanations JSON
fs.writeFileSync(EXPLANATIONS_PATH, JSON.stringify(expl, null, 2), 'utf8');
console.log(`Successfully completed repair! Repaired ${repairedCount} explanations across all papers, sections, and years in src/data/explanations.json.`);

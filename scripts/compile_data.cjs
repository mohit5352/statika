const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Ensure output directory exists
const DATA_DIR = path.join(__dirname, '../src/data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 1. Compile Answers, Explanations, Notes, and Question Edits from JS files to JSON
console.log('Compiling central datasets...');

function compileJSFileToJSON(srcPath, varName, destFileName) {
  const fullSrcPath = path.join(__dirname, '../temp_repo', srcPath);
  if (!fs.existsSync(fullSrcPath)) {
    console.warn(`Source file not found: ${srcPath}`);
    return;
  }
  let content = fs.readFileSync(fullSrcPath, 'utf8');
  // Evade ES Module / CommonJS conflicts by wrapping and evalling
  try {
    // Replace const/let/var varName = with global.varName =
    content = content.replace(new RegExp(`(const|let|var)\\s+${varName}\\s*=`), `global.${varName} =`);
    
    // Setup a mock module object so that any "if (module.exports) module.exports = ..." executes without error
    global.module = { exports: {} };
    
    // Eval inside a safe context
    eval(content);
    
    const value = global[varName];
    if (!value) {
      throw new Error(`Could not extract value for ${varName} from global scope`);
    }
    
    const destPath = path.join(DATA_DIR, destFileName);
    fs.writeFileSync(destPath, JSON.stringify(value, null, 2));
    console.log(`Successfully compiled ${srcPath} -> src/data/${destFileName}`);
    
    // Cleanup global
    delete global.module;
    delete global[varName];
  } catch (err) {
    console.error(`Error compiling JS file ${srcPath}:`, err);
  }
}

compileJSFileToJSON('answers.js', 'QUESTION_ANSWERS', 'answers.json');
compileJSFileToJSON('explanations.js', 'QUESTION_EXPLANATIONS', 'explanations.json');
compileJSFileToJSON('notes.js', 'REVISION_NOTES', 'notes.json');
compileJSFileToJSON('question_edits.js', 'QUESTION_EDITS', 'question_edits.json');


// 2. Compile Questions from HTML files to JSON
console.log('Compiling questions from HTML...');

const paperMapping = {
  'stats_paper_1': 'paper1',
  'stats_paper_2': 'paper2'
};

const sectionMapping = {
  'Probability_&_Statistics': 'prob',
  'Probability_and_Statistics': 'prob',
  'Numerical_Analysis': 'num',
  'Computer': 'comp',
  'Linear_Models': 'linear',
  'Statistical_Inference_and_Hypothesis_Testing': 'inference',
  'Official_Statistics': 'official'
};

const questions = [];

function parseHTMLFiles(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      parseHTMLFiles(fullPath);
    } else if (stat.isFile() && item.endsWith('.html')) {
      parseFile(fullPath);
    }
  }
}

function parseFile(filePath) {
  // Determine paper, section, and year from path and filename
  const pathParts = filePath.split(path.sep);
  // Look for stats_paper_1 or stats_paper_2
  const paperDir = pathParts.find(p => p === 'stats_paper_1' || p === 'stats_paper_2');
  const sectionDir = pathParts.find(p => sectionMapping[p]);
  
  // Extract year from filename, e.g., Computer_questions_2017.html -> 2017
  const fileName = pathParts[pathParts.length - 1];
  const yearMatch = fileName.match(/(\d{4})/);
  
  if (!paperDir || !sectionDir || !yearMatch) {
    console.warn(`Skipping file with unrecognized path structure: ${filePath}`);
    return;
  }
  
  const paper = paperMapping[paperDir];
  const section = sectionMapping[sectionDir];
  const year = yearMatch[1];
  
  const htmlContent = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(htmlContent);
  
  let currentContext = null;
  
  $('.question-card').each((index, el) => {
    const card = $(el);
    const qHeader = card.find('.q-header');
    const qContext = card.find('.q-context');
    const qText = card.find('.q-text');
    const qTable = card.find('.q-table');
    const optionsGrid = card.find('.options-grid');
    
    // Check if it's a context-only card (no header, no options)
    if (qContext.length > 0 && qHeader.length === 0 && optionsGrid.length === 0) {
      currentContext = qContext.html().trim();
      return; // Save context and proceed to actual questions
    }
    
    // Extract question details
    let number = '';
    let topic = '';
    
    if (qHeader.length > 0) {
      const qNumText = qHeader.find('.q-number').text().trim();
      // Match digits
      const numMatch = qNumText.match(/(\d+)/);
      number = numMatch ? numMatch[1] : qNumText.replace(/[^\d]/g, '');
      
      const qTopicText = qHeader.find('.q-topic').text().trim();
      // Remove starting [Topic: and ending ]
      topic = qTopicText.replace(/^\[Topic:\s*/i, '').replace(/\]$/, '').trim();
    } else {
      // If there is no header, skip or fallback
      return;
    }
    
    // If we have a q-context in this specific card, use it; otherwise use the block-level currentContext
    let context = null;
    if (qContext.length > 0) {
      context = qContext.html().trim();
    } else if (currentContext) {
      context = currentContext;
    }
    
    const text = qText.length > 0 ? qText.html().trim() : '';
    const table = qTable.length > 0 ? qTable.html().trim() : null;
    
    const options = [];
    if (optionsGrid.length > 0) {
      optionsGrid.find('.option-item').each((i, optEl) => {
        const opt = $(optEl);
        const labelText = opt.find('.opt-label').text().trim();
        const label = labelText.replace(/[()]/g, '').trim().toLowerCase(); // e.g. "(a)" -> "a"
        
        // Remove label element to get pure text
        opt.find('.opt-label').remove();
        const optText = opt.html().trim();
        options.push({ label, text: optText });
      });
    }
    
    questions.push({
      paper,
      section,
      year: parseInt(year, 10),
      number: parseInt(number, 10),
      topic,
      context,
      text,
      table,
      options
    });
  });
  
  // Reset context for next files
  currentContext = null;
}

const htmlsBaseDir = path.join(__dirname, '../temp_repo/extracted_htmls');
if (fs.existsSync(htmlsBaseDir)) {
  parseHTMLFiles(htmlsBaseDir);
  
  const destPath = path.join(DATA_DIR, 'questions.json');
  let finalQuestions = [...questions];
  if (fs.existsSync(destPath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(destPath, 'utf8'));
      const subjective = existing.filter(q => q.paper === 'paper3' || q.paper === 'paper4');
      finalQuestions = [...finalQuestions, ...subjective];
    } catch (e) {
      console.warn('Could not read existing questions to merge subjective entries:', e);
    }
  }

  // Sort questions by paper, section, year, number
  finalQuestions.sort((a, b) => {
    if (a.paper !== b.paper) return a.paper.localeCompare(b.paper);
    if (a.section !== b.section) return a.section.localeCompare(b.section);
    if (a.year !== b.year) return a.year - b.year;
    return a.number - b.number;
  });
  
  fs.writeFileSync(destPath, JSON.stringify(finalQuestions, null, 2));
  console.log(`Successfully compiled ${finalQuestions.length} questions -> src/data/questions.json`);
} else {
  console.error(`HTML source directory not found: ${htmlsBaseDir}`);
}

console.log('Compilation completed!');

import React, { useEffect, useRef } from 'react';
import { marked } from 'marked';

interface MathJaxRendererProps {
  html: string;
  className?: string;
  tagName?: 'div' | 'span';
}

function cleanMathJaxTableText(text: string): string {
  let html = text;
  
  // Match \begin{tabular} ... \end{tabular} with any number of backslashes (e.g. \\begin{tabular} or \begin{tabular})
  const tabularRegex = /\\+begin\{tabular\}(?:\{([^}]*)\})?([\s\S]*?)\\+end\{tabular\}/g;
  
  html = html.replace(tabularRegex, (match, colsSpec, tableBody) => {
    // Split by LaTeX line breaks, which are '\\' or more backslashes (e.g. \\\\)
    const rawRows = tableBody.split(/\\{2,}/);
    let tableHtml = '<div class="overflow-x-auto my-4 w-full flex justify-center"><table class="border-collapse border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-md rounded-lg overflow-hidden text-center text-sm">';
    
    let isFirstRow = true;
    rawRows.forEach((rowText: string) => {
      let trimmedRow = rowText.trim();
      if (!trimmedRow) return;
      
      // Clean up hline and clines
      trimmedRow = trimmedRow.replace(/\\+hline/g, '');
      trimmedRow = trimmedRow.replace(/\\+cline\{[^}]*\}/g, '');
      trimmedRow = trimmedRow.trim();
      if (!trimmedRow) return;
      
      const cells = trimmedRow.split('&');
      tableHtml += '<tr class="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40">';
      
      cells.forEach((cellText: string) => {
        let cell = cellText.trim();
        let colspanAttr = '';
        let rowspanAttr = '';
        let cellClass = 'px-4 py-2 border border-slate-200 dark:border-slate-800 ';
        
        // Handle \multicolumn{SPAN_COUNT}{ALIGN}{TEXT}
        const multicolumnMatch = cell.match(/\\+multicolumn\{(\d+)\}\{[^}]*\}\{([\s\S]*?)\}/);
        if (multicolumnMatch) {
          colspanAttr = ` colspan="${multicolumnMatch[1]}"`;
          cell = multicolumnMatch[2].trim();
          cellClass += 'font-semibold bg-slate-50 dark:bg-slate-800/60 ';
        }
        
        // Handle \multirow{SPAN_COUNT}{ALIGN}{TEXT}
        const multirowMatch = cell.match(/\\+multirow\{(\d+)\}\{[^}]*\}\{([\s\S]*?)\}/);
        if (multirowMatch) {
          rowspanAttr = ` rowspan="${multirowMatch[1]}"`;
          cell = multirowMatch[2].trim();
          cellClass += 'font-semibold bg-slate-50 dark:bg-slate-800/60 align-middle ';
        }
        
        const isHeader = isFirstRow || cell.includes('Jobs') || cell.includes('Activity') || cell.includes('Route') || cell.includes('Drivers') || cell.includes('Sample') || cell.includes('Age');
        const tag = isHeader ? 'th' : 'td';
        if (isHeader) {
          cellClass += 'font-semibold bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 ';
        }
        
        tableHtml += `<${tag}${colspanAttr}${rowspanAttr} class="${cellClass.trim()}">${cell}</${tag}>`;
      });
      
      tableHtml += '</tr>';
      isFirstRow = false;
    });
    
    tableHtml += '</table></div>';
    return tableHtml;
  });

  html = html.replace(/\\+begin\{center\}/g, '<div class="flex flex-col items-center justify-center my-4">');
  html = html.replace(/\\+end\{center\}/g, '</div>');
  return html;
}

function cleanHtmlTables(text: string): string {
  if (!text) return '';
  let html = text;
  
  const tableRegex = /<table([\s\S]*?)>([\s\S]*?)<\/table>/g;
  html = html.replace(tableRegex, (match, attrs, content) => {
    // Strip min-w-full from attributes if present
    let cleanAttrs = attrs.replace(/\bmin-w-full\b/g, '');
    
    return `<div class="overflow-x-auto my-4 w-full flex justify-center"><table${cleanAttrs} style="width: auto !important; min-width: auto !important; margin-left: auto; margin-right: auto;">${content}</table></div>`;
  });

  return html;
}

function renderMarkdownWithMath(text: string): string {
  if (!text) return '';
  const preprocessed = cleanHtmlTables(cleanMathJaxTableText(text));
  const placeholders: string[] = [];

  // 1. Extract block math \\[ ... \\]
  let processed = preprocessed.replace(/\\\[([\s\S]*?)\\\]/g, (match) => {
    placeholders.push(match);
    return `MATHPLACEHOLDERXYZ_${placeholders.length - 1}_XYZ`;
  });

  // 2. Extract inline math \\( ... \\)
  processed = processed.replace(/\\\(([\s\S]*?)\\\)/g, (match) => {
    placeholders.push(match);
    return `MATHPLACEHOLDERXYZ_${placeholders.length - 1}_XYZ`;
  });

  // 3. Extract $$ ... $$
  processed = processed.replace(/\$\$([\s\S]*?)\$\$/g, (match) => {
    placeholders.push(match);
    return `MATHPLACEHOLDERXYZ_${placeholders.length - 1}_XYZ`;
  });

  // 4. Extract $ ... $ (avoid matching plain dollar sign, must have another $ on same line)
  processed = processed.replace(/\$([^$\n]+?)\$/g, (match) => {
    placeholders.push(match);
    return `MATHPLACEHOLDERXYZ_${placeholders.length - 1}_XYZ`;
  });

  // Parse remaining text as Markdown
  let parsedHtml = marked.parse(processed, { async: false }) as string;

  // Restore the math blocks untouched
  placeholders.forEach((math, index) => {
    const placeholder = `MATHPLACEHOLDERXYZ_${index}_XYZ`;
    parsedHtml = parsedHtml.split(placeholder).join(math);
  });

  return parsedHtml;
}

export const MathJaxRenderer: React.FC<MathJaxRendererProps> = ({
  html,
  className = '',
  tagName = 'div',
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const parsedHtml = renderMarkdownWithMath(html);
      containerRef.current.innerHTML = parsedHtml;
      
      // Safety timeout to let DOM render completely, then trigger MathJax typesetting specifically on this node
      const timer = setTimeout(() => {
        const mathJax = (window as any).MathJax;
        if (mathJax && mathJax.typesetPromise && containerRef.current) {
          mathJax.typesetPromise([containerRef.current]).catch((err: any) => {
            console.warn('MathJax typesetting failed:', err);
          });
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [html]);

  const Tag = tagName;
  return <Tag ref={containerRef as any} className={`${className} tex2jax_process`} />;
};
export default MathJaxRenderer;

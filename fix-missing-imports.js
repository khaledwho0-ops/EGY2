// Fix ALL pages where PageNavigation is used but import is missing/corrupted
const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'src', 'app');
let fixed = 0;

function findPages(dir, prefix) {
  prefix = prefix || '';
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];
  for (const e of entries) {
    if (['api', 'fonts', '_', 'components', 'node_modules', '.next'].includes(e.name)) continue;
    const fp = path.join(dir, e.name);
    const rp = prefix ? prefix + '/' + e.name : e.name;
    if (e.isDirectory()) results.push(...findPages(fp, rp));
    else if (e.name === 'page.tsx') results.push({ filePath: fp, routeKey: prefix });
  }
  return results;
}

const pages = findPages(appDir);

for (const pg of pages) {
  try {
    let content = fs.readFileSync(pg.filePath, 'utf8');
    
    // Check if PageNavigation is used in JSX but import is missing
    const hasJSXUsage = content.includes('<PageNavigation');
    const hasProperImport = /^import \{ PageNavigation \} from ['"]@\/components\/shared\/page-navigation['"];?\s*$/m.test(content);
    
    if (hasJSXUsage && !hasProperImport) {
      // Check if import is embedded somewhere weird (like in a string)
      const hasCorruptedImport = content.includes("import { PageNavigation }") && !hasProperImport;
      
      if (hasCorruptedImport) {
        // Remove the corrupted import line from wherever it is
        content = content.replace(/import \{ PageNavigation \} from ['"]@\/components\/shared\/page-navigation['"];?/g, '');
      }
      
      // Add proper import at top after last import
      const lines = content.split('\n');
      let lastImportIdx = -1;
      for (let i = 0; i < Math.min(lines.length, 40); i++) {
        if (lines[i].trimStart().startsWith('import ')) lastImportIdx = i;
      }
      
      const importStr = "import { PageNavigation } from '@/components/shared/page-navigation';";
      
      if (lastImportIdx >= 0) {
        lines.splice(lastImportIdx + 1, 0, importStr);
      } else {
        // Put after "use client" if present
        let insertIdx = 0;
        for (let i = 0; i < Math.min(lines.length, 5); i++) {
          if (lines[i].includes('use client')) { insertIdx = i + 1; break; }
        }
        lines.splice(insertIdx, 0, '', importStr);
      }
      
      content = lines.join('\n');
      fs.writeFileSync(pg.filePath, content, 'utf8');
      fixed++;
      console.log('FIXED: ' + pg.routeKey);
    }
  } catch (err) {
    console.log('ERR: ' + pg.routeKey + ' - ' + err.message);
  }
}

console.log('\nFixed ' + fixed + ' files with missing/corrupted PageNavigation imports');

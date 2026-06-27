// Fix duplicate PageNavigation imports
const fs = require('fs');
const p = require('path');

const appDir = p.join(__dirname, 'src', 'app');
let fixed = 0;

function findPages(dir, prefix) {
  prefix = prefix || '';
  const entries = fs.readdirSync(dir, {withFileTypes: true});
  const results = [];
  for (const e of entries) {
    if (['api', 'fonts', '_', 'components', 'node_modules', '.next'].includes(e.name)) continue;
    const fp = p.join(dir, e.name);
    const rp = prefix ? prefix + '/' + e.name : e.name;
    if (e.isDirectory()) results.push(...findPages(fp, rp));
    else if (e.name === 'page.tsx') results.push({filePath: fp, routeKey: prefix});
  }
  return results;
}

const pages = findPages(appDir);

for (const pg of pages) {
  let c = fs.readFileSync(pg.filePath, 'utf8');
  const importLine = 'import { PageNavigation } from "@/components/shared/page-navigation";';
  const importLine2 = "import { PageNavigation } from '@/components/shared/page-navigation';";
  
  // Count occurrences
  const count1 = (c.match(/import \{ PageNavigation \} from/g) || []).length;
  
  if (count1 > 1) {
    // Remove all but the first occurrence
    let firstFound = false;
    const lines = c.split('\n');
    const newLines = lines.filter(line => {
      if (line.includes('import { PageNavigation }')) {
        if (!firstFound) {
          firstFound = true;
          return true;
        }
        return false;
      }
      return true;
    });
    c = newLines.join('\n');
    fs.writeFileSync(pg.filePath, c, 'utf8');
    fixed++;
    console.log('FIXED: ' + pg.routeKey + ' (had ' + count1 + ' imports)');
  }
}

console.log('\nFixed ' + fixed + ' files with duplicate imports');

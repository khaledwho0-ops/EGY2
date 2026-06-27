// Fix server components that have PageNavigation but no "use client"
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
    
    // Check if has PageNavigation but NO "use client"
    if (content.includes('PageNavigation') && !content.includes('use client')) {
      // Add "use client" at the very top
      content = '"use client";\n\n' + content;
      fs.writeFileSync(pg.filePath, content, 'utf8');
      fixed++;
      console.log('FIXED: ' + pg.routeKey);
    }
  } catch (err) {
    console.log('ERR: ' + pg.routeKey + ' - ' + err.message);
  }
}

console.log('\nFixed ' + fixed + ' server components');

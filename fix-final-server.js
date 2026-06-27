// Check for server components using PageNavigation that will fail at build
const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'src', 'app');
let issues = 0;

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
    const content = fs.readFileSync(pg.filePath, 'utf8');
    const hasPageNav = content.includes('<PageNavigation');
    const hasUseClient = content.includes('use client');
    const hasMetadata = content.includes('export const metadata');
    
    if (hasPageNav && !hasUseClient && !hasMetadata) {
      // Server component with PageNavigation but no metadata — safe to add "use client"
      const newContent = '"use client";\n\n' + content;
      fs.writeFileSync(pg.filePath, newContent, 'utf8');
      issues++;
      console.log('ADDED use client: ' + pg.routeKey);
    } else if (hasPageNav && !hasUseClient && hasMetadata) {
      // Has metadata — PageNavigation must be used differently or we have a problem
      console.log('CONFLICT (metadata+PageNav): ' + pg.routeKey);
      issues++;
    }
  } catch (err) {
    console.log('ERR: ' + pg.routeKey + ' - ' + err.message);
  }
}

console.log('\nHandled ' + issues + ' issues');

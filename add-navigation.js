/**
 * Batch script: Add PageNavigation to ALL pages
 * + Add useRTL import if missing
 * Run: node add-navigation.js
 */
const fs = require('fs');
const path = require('path');

// Map page file paths to their route paths for PageNavigation
const PATH_MAP = {
  'welcome': '/welcome', 'platform-guide': '/platform-guide', 'curriculum': '/curriculum',
  'curriculum/phase0': '/curriculum/phase0', 'curriculum/phase1': '/curriculum/phase0',
  'curriculum/phase2': '/curriculum/phase0', 'curriculum/phase3': '/curriculum/phase0',
  'curriculum/phase4': '/curriculum/phase0', 'assessment': '/assessment',
  'transformation': '/transformation', 'fallacy-engine': '/fallacy-engine',
  'critical-thinking': '/critical-thinking', 'bias-detector': '/bias-detector',
  'bias-fingerprint': '/bias-fingerprint', 'debate-sim': '/debate-sim',
  'reaction-test': '/reaction-test', 'cognitive-lab': '/cognitive-lab',
  'god-system': '/god-system', 'sovo': '/sovo', 'paper-auditor': '/paper-auditor',
  'evidence': '/evidence', 'sources': '/sources', 'stat-power': '/stat-power',
  'angry-debunkers': '/angry-debunkers', 'deepreal': '/deepreal',
  'forensic-image': '/forensic-image', 'forensic-c2pa': '/forensic-c2pa',
  'osint-investigator': '/osint-investigator', 'six-layers': '/six-layers',
  'mental-health': '/mental-health', 'mental-health/depression': '/mental-health/depression',
  'drug-checker': '/drug-checker', 'womens-shield': '/womens-shield',
  'mens-shield': '/mens-shield', 'religion-hub': '/religion-hub',
  'religion-hub/quran': '/religion-hub/quran',
  'religion-hub/tools/hadith-check': '/religion-hub/tools/hadith-check',
  'religion-hub/tools/fatwa-context': '/religion-hub/tools/fatwa-context',
  'religion-hub/tools/sectarian-detector': '/religion-hub/tools/sectarian-detector',
  'religion-hub/maqasid': '/religion-hub/maqasid',
  'religion-hub/whatsapp': '/religion-hub/whatsapp',
  'religion-hub/tools/halal-finance': '/religion-hub/tools/halal-finance',
  'religion-hub/tools/mawarith': '/religion-hub/tools/mawarith',
  'religion-hub/tools/zakat-calculator': '/religion-hub/tools/zakat-calculator',
  'religion-hub/tools/quran-context': '/religion-hub/quran',
  'religion-hub/tools/authority-verifier': '/religion-hub',
  'religion-hub/tools': '/religion-hub',
  'swarm-debate': '/swarm-debate', 'bad-news': '/bad-news',
  'inoculation-passport': '/inoculation-passport', 'threat-map': '/threat-map',
  'rumor-heatmap': '/rumor-heatmap', 'trend-hunter': '/trend-hunter',
  'misinfo-atlas': '/misinfo-atlas', 'live-deception': '/live-deception',
  'knowledge-graph': '/knowledge-graph', 'comb-tracker': '/comb-tracker',
  'supervisor': '/supervisor', 'ai-editor': '/ai-editor',
  'defense-pages-map': '/defense-pages-map', 'about': '/methodology',
  'features': '/methodology', 'philosophy': '/methodology', 'why-us': '/methodology',
  'impact': '/methodology', 'explore': '/platform-guide', 'guide': '/platform-guide',
  'dashboard': '/supervisor', 'chatbot': '/ai-editor', 'ai-agents': '/ai-editor',
  'nvidia-hub': '/ai-editor', 'prompt-lab': '/ai-editor',
  'onboarding': '/welcome', 'baseline': '/assessment', 'certificate': '/transformation',
  'connect': '/methodology', 'fight-back': '/methodology', 'family-kit': '/methodology',
  'kill-list': '/methodology', 'manipulation-cards': '/fallacy-engine',
  'media-library': '/methodology', 'medical-life': '/drug-checker',
  'open-source': '/methodology', 'others-search': '/methodology',
  'peer-challenge': '/methodology', 'publishing-plan': '/methodology',
  'master-roadmap': '/methodology', 'tools-download': '/methodology',
  'trailer': '/methodology', 'threat-briefing': '/threat-map',
  'whatsapp-analyzer': '/religion-hub/whatsapp', 'blackbox': '/methodology',
  'arabic-shield': '/methodology', 'epistemology': '/methodology',
  'ux-science': '/methodology', 'effect-dashboard': '/supervisor',
  'self-test-protocol': '/assessment', 'competition-demo': '/methodology',
  'global-alliance': '/methodology', 'presentation': '/methodology',
  'pricing-presentation': '/methodology', 'project-vision': '/methodology',
  'science': '/methodology', 'demo': '/methodology',
  'defense-main-plan': '/defense-pages-map', 'defense-qa': '/defense-pages-map',
  'defense-test': '/defense-pages-map', 'deepreal-forensics': '/deepreal',
  'deepreal-upload': '/deepreal', 'health-data': '/drug-checker',
  'language-select': '/welcome', 'reverse': '/deepreal',
  'report': '/methodology', 'engines-guide': '/platform-guide',
  'fight-back': '/methodology',
  '(kernel)/audit': '/methodology', '(kernel)/journal': '/methodology',
  '(kernel)/skills': '/methodology', '(marketing)/corrections': '/methodology',
  '(marketing)/methodology': '/methodology', '(marketing)/transparency': '/methodology',
};

const appDir = path.join(__dirname, 'src', 'app');
let modified = 0;
let skipped = 0;
let errors = [];

function findPages(dir, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];
  for (const e of entries) {
    if (e.name === 'api' || e.name === 'fonts' || e.name === '_' || e.name === 'components') continue;
    const fullPath = path.join(dir, e.name);
    const relPath = prefix ? `${prefix}/${e.name}` : e.name;
    if (e.isDirectory()) {
      results.push(...findPages(fullPath, relPath));
    } else if (e.name === 'page.tsx') {
      results.push({ filePath: fullPath, routeKey: prefix });
    }
  }
  return results;
}

const pages = findPages(appDir);
console.log(`Found ${pages.length} pages to process...\n`);

for (const { filePath, routeKey } of pages) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already has PageNavigation
    if (content.includes('PageNavigation')) {
      skipped++;
      continue;
    }
    
    const navPath = PATH_MAP[routeKey];
    if (!navPath) {
      // Use a sensible default
      const defaultPath = '/' + routeKey.replace(/\\/g, '/');
      // Skip pages we don't have a mapping for
      console.log(`  SKIP (no mapping): ${routeKey}`);
      skipped++;
      continue;
    }
    
    // 1. Add import for PageNavigation
    const importLine = `import { PageNavigation } from "@/components/shared/page-navigation";\n`;
    
    // Find a good place to insert import — after the last import statement
    const importRegex = /^import .+$/gm;
    let lastImportEnd = 0;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      lastImportEnd = match.index + match[0].length;
    }
    
    if (lastImportEnd > 0) {
      content = content.slice(0, lastImportEnd) + '\n' + importLine + content.slice(lastImportEnd);
    } else {
      content = importLine + content;
    }
    
    // 2. Find the LAST closing </div> before the export ends and insert PageNavigation before it
    // Strategy: find the last 2-3 </div> and insert before the 2nd-to-last
    const closingDivs = [];
    const divRegex = /<\/div>/g;
    while ((match = divRegex.exec(content)) !== null) {
      closingDivs.push(match.index);
    }
    
    if (closingDivs.length >= 3) {
      // Insert before the 3rd-from-last </div> (inside the main content wrapper)
      const insertPos = closingDivs[closingDivs.length - 3];
      const navComponent = `\n        <PageNavigation currentPath="${navPath}" />\n      `;
      content = content.slice(0, insertPos) + navComponent + content.slice(insertPos);
      
      fs.writeFileSync(filePath, content, 'utf8');
      modified++;
      console.log(`  ✓ ${routeKey} → ${navPath}`);
    } else {
      console.log(`  SKIP (too few divs): ${routeKey}`);
      skipped++;
    }
  } catch (err) {
    errors.push(`${routeKey}: ${err.message}`);
  }
}

console.log(`\n=== RESULTS ===`);
console.log(`Modified: ${modified}`);
console.log(`Skipped:  ${skipped}`);
console.log(`Errors:   ${errors.length}`);
if (errors.length > 0) {
  console.log(`\nErrors:`);
  errors.forEach(e => console.log(`  ✗ ${e}`));
}

const fs=require('fs'), p=require('path');
const appDir=p.join(__dirname,'src','app');

const MAP={
  'welcome':'/welcome','platform-guide':'/platform-guide','curriculum':'/curriculum',
  'assessment':'/assessment','transformation':'/transformation','fallacy-engine':'/fallacy-engine',
  'critical-thinking':'/critical-thinking','bias-detector':'/bias-detector',
  'bias-fingerprint':'/bias-fingerprint','debate-sim':'/debate-sim',
  'reaction-test':'/reaction-test','cognitive-lab':'/cognitive-lab',
  'god-system':'/god-system','sovo':'/sovo','paper-auditor':'/paper-auditor',
  'evidence':'/evidence','sources':'/sources','stat-power':'/stat-power',
  'angry-debunkers':'/angry-debunkers','deepreal':'/deepreal',
  'forensic-image':'/forensic-image','forensic-c2pa':'/forensic-c2pa',
  'osint-investigator':'/osint-investigator','six-layers':'/six-layers',
  'mental-health':'/mental-health','mental-health/depression':'/mental-health/depression',
  'drug-checker':'/drug-checker','womens-shield':'/womens-shield',
  'mens-shield':'/mens-shield','religion-hub':'/religion-hub',
  'religion-hub/quran':'/religion-hub/quran',
  'religion-hub/tools/hadith-check':'/religion-hub/tools/hadith-check',
  'religion-hub/tools/fatwa-context':'/religion-hub/tools/fatwa-context',
  'religion-hub/tools/sectarian-detector':'/religion-hub/tools/sectarian-detector',
  'religion-hub/maqasid':'/religion-hub/maqasid',
  'religion-hub/whatsapp':'/religion-hub/whatsapp',
  'religion-hub/tools/halal-finance':'/religion-hub/tools/halal-finance',
  'religion-hub/tools/mawarith':'/religion-hub/tools/mawarith',
  'religion-hub/tools/zakat-calculator':'/religion-hub/tools/zakat-calculator',
  'religion-hub/tools/quran-context':'/religion-hub/quran',
  'religion-hub/tools/authority-verifier':'/religion-hub',
  'religion-hub/tools':'/religion-hub',
  'swarm-debate':'/swarm-debate','bad-news':'/bad-news',
  'inoculation-passport':'/inoculation-passport','threat-map':'/threat-map',
  'rumor-heatmap':'/rumor-heatmap','trend-hunter':'/trend-hunter',
  'misinfo-atlas':'/misinfo-atlas','live-deception':'/live-deception',
  'knowledge-graph':'/knowledge-graph','comb-tracker':'/comb-tracker',
  'supervisor':'/supervisor','ai-editor':'/ai-editor',
  'defense-pages-map':'/defense-pages-map',
  'about':'/methodology','features':'/methodology','philosophy':'/methodology',
  'why-us':'/methodology','impact':'/methodology',
  'explore':'/platform-guide','guide':'/platform-guide',
  'dashboard':'/supervisor','chatbot':'/ai-editor','ai-agents':'/ai-editor',
  'nvidia-hub':'/ai-editor','prompt-lab':'/ai-editor',
  'onboarding':'/welcome','baseline':'/assessment','certificate':'/transformation',
  'connect':'/methodology','fight-back':'/methodology','family-kit':'/methodology',
  'kill-list':'/methodology','manipulation-cards':'/fallacy-engine',
  'media-library':'/methodology','medical-life':'/drug-checker',
  'open-source':'/methodology','others-search':'/methodology',
  'peer-challenge':'/methodology','publishing-plan':'/methodology',
  'master-roadmap':'/methodology','tools-download':'/methodology',
  'trailer':'/methodology','threat-briefing':'/threat-map',
  'whatsapp-analyzer':'/religion-hub/whatsapp',
  'blackbox':'/methodology','arabic-shield':'/methodology',
  'epistemology':'/methodology','ux-science':'/methodology',
  'effect-dashboard':'/supervisor','self-test-protocol':'/assessment',
  'competition-demo':'/methodology','global-alliance':'/methodology',
  'presentation':'/methodology','pricing-presentation':'/methodology',
  'project-vision':'/methodology','science':'/methodology',
  'demo':'/methodology',
  'defense-main-plan':'/defense-pages-map','defense-qa':'/defense-pages-map',
  'defense-test':'/defense-pages-map','deepreal-forensics':'/deepreal',
  'deepreal-upload':'/deepreal','health-data':'/drug-checker',
  'language-select':'/welcome','reverse':'/deepreal',
  'report':'/methodology','engines-guide':'/platform-guide',
  '(kernel)/audit':'/methodology','(kernel)/journal':'/methodology',
  '(kernel)/skills':'/methodology','(marketing)/corrections':'/methodology',
  '(marketing)/methodology':'/methodology','(marketing)/transparency':'/methodology',
  'curriculum/phase0':'/curriculum/phase0','curriculum/phase1':'/curriculum/phase0',
  'curriculum/phase2':'/curriculum/phase0','curriculum/phase3':'/curriculum/phase0',
  'curriculum/phase4':'/curriculum/phase0',
};

function findPages(dir, prefix) {
  prefix = prefix || '';
  const entries = fs.readdirSync(dir, {withFileTypes:true});
  const results = [];
  for (const e of entries) {
    if (['api','fonts','_','components','node_modules','.next'].includes(e.name)) continue;
    const fp = p.join(dir, e.name);
    const rp = prefix ? prefix + '/' + e.name : e.name;
    if (e.isDirectory()) results.push(...findPages(fp, rp));
    else if (e.name === 'page.tsx') results.push({filePath:fp, routeKey:prefix});
  }
  return results;
}

const pages = findPages(appDir);
let mod=0, skip=0, errs=0;

for (const pg of pages) {
  try {
    let c = fs.readFileSync(pg.filePath, 'utf8');
    if (c.includes('PageNavigation')) { skip++; continue; }
    
    const navPath = MAP[pg.routeKey];
    if (!navPath) { 
      console.log('SKIP (no map): ' + pg.routeKey);
      skip++; continue; 
    }
    
    // Add import after last import line
    const lines = c.split('\n');
    let lastImportIdx = -1;
    for (let i = 0; i < Math.min(lines.length, 30); i++) {
      if (lines[i].trimStart().startsWith('import ')) lastImportIdx = i;
    }
    
    const importStr = 'import { PageNavigation } from "@/components/shared/page-navigation";';
    
    if (lastImportIdx >= 0) {
      lines.splice(lastImportIdx + 1, 0, importStr);
    } else {
      lines.unshift(importStr);
    }
    c = lines.join('\n');
    
    // Find insertion point: 3rd-from-last </div>
    const divPositions = [];
    const regex = /<\/div>/g;
    let match;
    while ((match = regex.exec(c)) !== null) {
      divPositions.push(match.index);
    }
    
    if (divPositions.length >= 3) {
      const insertAt = divPositions[divPositions.length - 3];
      const navJSX = '\n        <PageNavigation currentPath="' + navPath + '" />\n      ';
      c = c.slice(0, insertAt) + navJSX + c.slice(insertAt);
      fs.writeFileSync(pg.filePath, c, 'utf8');
      mod++;
      console.log('OK: ' + pg.routeKey + ' -> ' + navPath);
    } else {
      console.log('SKIP (few divs): ' + pg.routeKey + ' (' + divPositions.length + ' divs)');
      skip++;
    }
  } catch(err) {
    console.log('ERR: ' + pg.routeKey + ' - ' + err.message);
    errs++;
  }
}

console.log('\n=== BATCH COMPLETE ===');
console.log('Modified: ' + mod);
console.log('Skipped: ' + skip);
console.log('Errors: ' + errs);

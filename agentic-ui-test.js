const http = require('http');

const ROUTES_TO_TEST = [
  '/',
  '/welcome',
  '/dashboard',
  '/guide',
  '/onboarding',
  '/deepreal',
  '/deepreal/exercise/1',
  '/deepreal/game',
  '/bad-news',
  '/fight-back',
  '/reverse',
  '/mental-health',
  '/mental-health/exercise/1',
  '/religion-hub',
  '/religion-hub/exercise/1',
  '/assessment',
  '/baseline',
  '/science',
  '/evidence',
  '/philosophy',
  '/chatbot',
  '/presentation',
  '/report',
  '/supervisor',
  '/project-vision',
  '/about',
  '/defense-main-plan',
  '/defense-qa',
  '/bias-fingerprint',
  '/inoculation-passport',
  '/arabic-shield',
  '/osint-investigator',
  '/deepreal-upload',
  '/cognitive-lab',
  '/manipulation-cards',
  '/critical-thinking',
  '/global-alliance',
  '/knowledge-graph',
  '/medical-life',
  '/epistemology',
  '/sovo',
  '/blackbox',
  '/debate-sim',
  '/health-data',
  '/kill-list',
  '/media-library',
  '/mens-shield',
  '/womens-shield',
  '/paper-auditor',
  '/stat-power'
];

async function runUITests() {
  console.log(`🚀 Starting Agentic UI Tests for ${ROUTES_TO_TEST.length} pages...`);
  let successCount = 0;
  
  for (const route of ROUTES_TO_TEST) {
    process.stdout.write(`Fetching ${route}... `);
    try {
      const res = await fetch(`http://localhost:3000${route}`);
      if (res.ok) {
        console.log(`✅ 200 OK`);
        successCount++;
      } else {
        console.log(`❌ FAILED (Status: ${res.status})`);
        const text = await res.text();
        console.log(`   Preview: ${text.slice(0, 150).replace(/\n/g, ' ')}...`);
      }
    } catch (e) {
      console.log(`❌ CRASH / FETCH ERROR: ${e.message}`);
    }
  }
  
  console.log(`\n🎉 UI Test Complete! Passed: ${successCount}/${ROUTES_TO_TEST.length}`);
}

runUITests();

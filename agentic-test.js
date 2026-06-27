const BASE_URL = 'http://localhost:3000';

async function testEndpoint(name, path, method, body, isFormData = false) {
  console.log(`\n--- Testing ${name} [${method} ${path}] ---`);
  try {
    let options = { method };
    
    if (isFormData) {
      const fd = new FormData();
      for (const [key, value] of Object.entries(body)) {
        fd.append(key, value);
      }
      options.body = fd;
    } else if (body) {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(body);
    }

    const start = Date.now();
    const res = await fetch(`${BASE_URL}${path}`, options);
    const time = Date.now() - start;
    
    let resultText = await res.text();
    let resultData;
    try {
      resultData = JSON.parse(resultText);
    } catch(e) {
      resultData = resultText;
    }

    if (res.ok) {
      console.log(`✅ SUCCESS (${time}ms) - Status: ${res.status}`);
      console.log(`Response Snippet: ${JSON.stringify(resultData).substring(0, 200)}...`);
    } else {
      console.log(`❌ FAILED (${time}ms) - Status: ${res.status}`);
      console.log(`Error Response: ${JSON.stringify(resultData)}`);
    }
    return res.ok;
  } catch (error) {
    console.log(`❌ ERROR: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting Agentic API Tests...');

  let successCount = 0;
  let totalCount = 0;

  const runTest = async (...args) => {
    totalCount++;
    if (await testEndpoint(...args)) successCount++;
  };

  // 1. Fallacy Detect
  await runTest('Fallacy Detect', '/api/fallacy-detect', 'POST', {
    text: 'You are just a stupid person, so your argument about the economy is wrong.'
  });

  // 2. Bias Detect
  await runTest('Bias Detect', '/api/bias-detect', 'POST', {
    text: 'I always knew the stock market would crash, it was so obvious. Anyone who invested is an idiot.'
  });

  // 3. NLP Sentiment
  await runTest('NLP Sentiment', '/api/nlp/sentiment', 'POST', {
    text: 'This is absolutely terrifying. We are all going to die if this virus spreads. Total catastrophe!'
  });

  // 4. NLP Arabic
  await runTest('NLP Arabic', '/api/nlp/arabic', 'POST', {
    text: 'هذه كارثة ومؤامرة كبيرة جدا ضدنا، أنا مش عايز أعيش في الرعب ده!'
  });

  // 5. Debate Sim
  await runTest('Debate Sim', '/api/debate-sim', 'POST', {
    messages: [{ role: 'user', content: 'Vaccines cause autism because my friend said so.' }]
  });

  // 6. Forensic Metadata
  await runTest('Forensic Metadata', '/api/forensic/metadata', 'POST', {
    url: 'https://raw.githubusercontent.com/ianare/exif-samples/master/jpg/gps/DSCN0010.jpg'
  }, true);

  // 7. Forensic Image
  await runTest('Forensic Image', '/api/forensic/image', 'POST', {
    url: 'https://raw.githubusercontent.com/ianare/exif-samples/master/jpg/gps/DSCN0010.jpg'
  }, true);

  // 8. Forensic Video
  await runTest('Forensic Video', '/api/forensic/video', 'POST', {
    url: 'https://www.w3schools.com/html/mov_bbb.mp4'
  }, true);

  // 9. Forensic Audio
  await runTest('Forensic Audio', '/api/forensic/audio', 'POST', {
    url: 'https://www.w3schools.com/html/horse.mp3'
  }, true);

  // 10. Forensic C2PA
  await runTest('Forensic C2PA', '/api/forensic/c2pa', 'POST', {
    url: 'https://raw.githubusercontent.com/ianare/exif-samples/master/jpg/gps/DSCN0010.jpg'
  }, true);

  // 11. Defense Swarm
  await runTest('Defense Swarm', '/api/defense/swarm', 'POST', {
    prompt: 'Is the earth flat?'
  });

  // 12. God System
  await runTest('God System', '/api/god-system', 'POST', {
    claim: 'The elites are microchipping us with the 5G towers!'
  });

  console.log(`\n🎉 Test Run Complete! Passed: ${successCount}/${totalCount}`);
}

// Wait a bit for server to fully boot before testing
setTimeout(runTests, 3000);

document.addEventListener('DOMContentLoaded', () => {
  const loadingIndicator = document.getElementById('loading');
  const analysisText = document.getElementById('analysisText');
  const sourceList = document.getElementById('sourceList');
  const incidentList = document.getElementById('incidentList');
  const threatLevel = document.getElementById('threatLevel');
  const generatePasswordBtn = document.getElementById('generatePasswordBtn');
  const copyPasswordBtn = document.getElementById('copyPasswordBtn');

  // Mock threat data
  const mockThreatData = {
    summary: "This is a mock prototype. Over the past month, ransomware attacks targeting small businesses have surged, with phishing emails being the primary attack vector. Malware campaigns exploiting unpatched software vulnerabilities have increased by 30%, and credential theft via social engineering remains a significant threat. Individuals face rising risks from data breaches on social media platforms. *Full version available for purchase in 2026.*",
    incidents: [
      "September 2025: LockBit ransomware hit 50 small U.S. businesses, demanding $2M in total.",
      "August 2025: Phishing campaign impersonating banks stole credentials from 10,000 users.",
      "July 2025: Unpatched Windows vulnerability exploited, affecting 200 small firms."
    ],
    sources: [
      { title: "Cybersecurity News: Ransomware Surge", uri: "https://www.cybersecurity-news.com/ransomware-2025" },
      { title: "Threat Report: Phishing Attacks", uri: "https://www.threatpost.com/phishing-2025" }
    ]
  };

  function displayThreatContent() {
    loadingIndicator.classList.remove('hidden');

    // Display summary with mock disclaimer
    analysisText.innerHTML = `<p>${mockThreatData.summary}</p><p class="text-maga-red font-bold">Mock Prototype – Not for Sale Until 2026</p>`;

    // Display incidents (non-clickable)
    incidentList.innerHTML = '';
    mockThreatData.incidents.forEach(incident => {
      const li = document.createElement('li');
      li.classList.add('flex', 'items-start', 'space-x-2');
      li.innerHTML = `
        <svg class="h-4 w-4 text-maga-red mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
        </svg>
        <span>${incident}</span>
      `;
      incidentList.appendChild(li);
    });

    // Display sources (non-clickable for mock)
    sourceList.innerHTML = '';
    mockThreatData.sources.forEach(source => {
      const li = document.createElement('li');
      li.classList.add('flex', 'items-center', 'space-x-2');
      li.innerHTML = `<span class="text-maga-blue">&#8226;</span> <span>${source.title} (Mock Source)</span>`;
      sourceList.appendChild(li);
    });

    // Display threat level (non-clickable)
    threatLevel.innerText = "HIGH";
    threatLevel.classList.add('font-bold');

    loadingIndicator.classList.add('hidden');
  }

  // Function to generate and save a secure password
  function generateAndSavePassword() {
    const passwordLength = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0, n = charset.length; i < passwordLength; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }

    document.getElementById('passwordResult').innerText = `Generated Password: ${password}`;
    document.getElementById('copyPasswordBtn').classList.remove('hidden');

    const el = document.createElement('textarea');
    el.value = password;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    showMessageBox("Password copied to clipboard!", "success");
  }

  // Simple message box for user feedback
  function showMessageBox(message, type) {
    const msgBox = document.createElement('div');
    let bgColor = 'bg-green-500';
    if (type === 'error') bgColor = 'bg-maga-red';
    
    msgBox.className = `fixed bottom-4 right-4 p-4 rounded-xl shadow-lg text-maga-white ${bgColor}`;
    msgBox.innerText = message;
    document.body.appendChild(msgBox);

    setTimeout(() => {
      msgBox.remove();
    }, 3000);
  }

  // Event listeners
  generatePasswordBtn.addEventListener('click', generateAndSavePassword);
  copyPasswordBtn.addEventListener('click', () => {
    const password = document.getElementById('passwordResult').innerText.replace('Generated Password: ', '');
    const el = document.createElement('textarea');
    el.value = password;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showMessageBox("Password copied to clipboard!", "success");
  });

  // Initial call to display mock data
  displayThreatContent();

  console.log(`Threat Intelligence Dashboard for PatriotSecurity AI initialized - ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}`);
});

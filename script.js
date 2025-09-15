document.addEventListener('DOMContentLoaded', () => {
    const loadingIndicator = document.getElementById('loading');
    const analysisText = document.getElementById('analysisText');
    const sourceList = document.getElementById('sourceList');
    const incidentList = document.getElementById('incidentList');
    const threatLevel = document.getElementById('threatLevel');
    const generatePasswordBtn = document.getElementById('generatePasswordBtn');
    const copyPasswordBtn = document.getElementById('copyPasswordBtn');

    // Mock Gemini API call for generating content
    async function fetchThreatContent() {
        loadingIndicator.classList.remove('hidden');
        analysisText.innerText = '';
        sourceList.innerHTML = '';
        incidentList.innerHTML = '';

        const userQuery = "Provide a concise, single-paragraph summary of the most significant cybersecurity threats targeting individuals and small businesses in the past month. Also, list three recent notable incidents related to these threats.";

        const systemPrompt = "Act as a world-class cybersecurity analyst. Provide a detailed, professional, and actionable threat summary. The response must be structured in two parts: 1) a single paragraph summarizing the current threats, and 2) a bulleted list of three recent, notable incidents. Do not include any introductory or concluding remarks outside of the content requested.";

        const payload = {
            contents: [{ parts: [{ text: userQuery }] }],
            tools: [{ "google_search": {} }],
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            },
            generationConfig: {
                responseMimeType: "text/plain",
            },
        };

        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            const candidate = result.candidates?.[0];

            if (candidate && candidate.content?.parts?.[0]?.text) {
                const generatedText = candidate.content.parts[0].text;
                const [summary, incidentsRaw] = generatedText.split(/\n\n\* /);

                analysisText.innerText = summary;

                const incidents = incidentsRaw.split('\n* ').filter(item => item);
                incidents.forEach(incident => {
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

                const groundingMetadata = candidate.groundingMetadata;
                if (groundingMetadata && groundingMetadata.groundingAttributions) {
                    const sources = groundingMetadata.groundingAttributions
                        .map(attribution => ({
                            uri: attribution.web?.uri,
                            title: attribution.web?.title,
                        }))
                        .filter(source => source.uri && source.title);

                    if (sources.length > 0) {
                        sources.forEach(source => {
                            const li = document.createElement('li');
                            li.classList.add('flex', 'items-center', 'space-x-2');
                            li.innerHTML = `<span class="text-maga-blue">&#8226;</span> <a href="${source.uri}" class="hover:underline" target="_blank">${source.title}</a>`;
                            sourceList.appendChild(li);
                        });
                    }
                }
            } else {
                analysisText.innerText = "Failed to fetch threat data. Please try again.";
            }
        } catch (error) {
            console.error('Error fetching threat content:', error);
            analysisText.innerText = "An error occurred. Please try again later.";
        } finally {
            loadingIndicator.classList.add('hidden');
        }
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

    // Initial call to fetch data
    fetchThreatContent();

    console.log(`Threat Intelligence Dashboard for PatriotSecurity AI initialized - ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}`);
});

** end of script.js **


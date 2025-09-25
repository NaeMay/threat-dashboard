# threat-dashboard
“Threat Intelligence Dashboard for Patriot-Security-AI”

## Description
Developed the **Threat Intelligence Dashboard for PatriotSecurity AI** as a showcase of front-end development and cybersecurity expertise for freeCodeCamp’s Front End Development Libraries certification. This HTML/CSS/JavaScript project, built with Tailwind CSS, Orbitron font, and Font Awesome, delivers a dynamic, responsive dashboard for real-time cybersecurity insights. It features a mock Gemini API integration to fetch threat summaries and recent incidents, a secure password generator with auto-copy functionality, and a dark/light mode toggle. The dashboard uses a patriotic color scheme (MAGA red `#b22234`, blue `#3c3b6e`, gold `#feac32`, dark green `#00471b` for accents) with a futuristic glitch effect on the logo and titles, a Pixabay background (`https://cdn.pixabay.com/photo/2016/11/29/09/16/architecture-1868667_1280.jpg`), and aligns with my **PatriotPlates AI & PatriotSecurity AI Interactive Menu**, **Technology Industry Growth Bar Chart**, and **Top 100 Movies Treemap** projects for the 2026 launch. Inspired by Donald Trump’s no-tax-on-tips policy, Elon Musk’s AI innovation with xAI, and Gordon Ramsay’s pursuit of excellence, this project complements my roles as a **Front-End Developer**, **FoodTech Entrepreneur**, and **Cybersecurity Analyst** in **West Columbia, SC** (flexible for **Miami or Tampa, FL**). It integrates with my Stratford Cooking and Catering Diploma with Highest Honors and adheres to WCAG 2.1 Level AA accessibility standards.

## Features
- **Dynamic Threat Data**: Fetches a concise cybersecurity threat summary and three recent incidents via a mock Gemini API call (placeholder for real API integration).
- **Threat Level Indicator**: Displays the current threat level (e.g., HIGH) in a styled card with MAGA red (`#b22234`) for emphasis.
- **Recent Incidents List**: Populates a list of recent cybersecurity incidents with icons, sourced from mock API data.
- **Protective Measures**: Provides static, actionable cybersecurity advice (e.g., use 2FA, strong passwords) in a dedicated card.
- **Password Generator**: Generates and auto-copies a 12-character secure password using a diverse charset, with a success message displayed via a custom message box.
- **Dark/Light Mode**: Toggles between dark (gray-900) and light (gray-100) themes using Tailwind CSS for accessibility and user preference.
- **Patriotic Branding**: Uses MAGA red (`#b22234`) for titles and links, blue (`#3c3b6e`) for buttons, and gold (`#feac32`) for hover effects, with a glitched logo and titles, matching the **PatriotPlates AI & PatriotSecurity AI Interactive Menu**.
- **Responsive Design**: Adapts to mobile devices with Tailwind’s grid system (`md:grid-cols-3` for desktop) and media queries (`<600px`, `<400px`) for smaller fonts and padding.
- **Accessibility**: Implements ARIA attributes (e.g., `aria-live` for messages) and keyboard navigation (Tab, Enter) for WCAG 2.1 Level AA compliance.
- **Social Integration**: Includes a footer with links to GitHub, X, LinkedIn, and freeCodeCamp profiles, styled with Font Awesome 6.5.1 icons in MAGA red, hovering to gold.
- **Synergy**: Aligns with **PatriotPlates AI & PatriotSecurity AI Interactive Menu** (e.g., shared cybersecurity theme), **RPG Creature Search** (futuristic aesthetic), and other portfolio projects through a cohesive design and background.

## Achievements
- Demonstrated proficiency in HTML forms, CSS (Tailwind) styling, and JavaScript for dynamic, API-driven dashboards with user interactions.
- Integrated advanced cybersecurity features (mock API, password generator, threat analysis) into a user-friendly interface.
- Maintained a cohesive futuristic aesthetic with a glitched logo and Pixabay background, inspired by Trump’s no-tax-on-tips policy, Musk’s xAI leadership, and Ramsay’s culinary standards.
- Ensured accessibility for users with disabilities, leveraging my experience with Erb’s palsy.
- Strengthened portfolio for **PatriotPlates AI** and **PatriotSecurity AI** 2026 launch.

## Code Sample
Below is the `generateAndSavePassword` function from `script.js`, which generates and copies a secure password for the dashboard:
```javascript
function generateAndSavePassword() {
    const passwordLength = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0, n = charset.length; i < passwordLength; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }

    document.getElementById('passwordResult').innerText = "Generated Password: " + password;
    document.getElementById('copyPasswordBtn').classList.remove('hidden');

    const el = document.createElement('textarea');
    el.value = password;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    showMessageBox("Password copied to clipboard!", "success");

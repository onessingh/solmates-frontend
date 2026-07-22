const subFields = {
    "IT & Software": ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Mobile App Developer", "Software Engineer", "DevOps Engineer", "Cloud Architect", "Cybersecurity", "Quality Assurance", "UI/UX Designer", "Embedded Systems", "Blockchain Developer", "Game Developer", "System Administrator", "Network Engineer"],
    "Management & Business": ["Project Manager", "Operations Manager", "Business Analyst", "Product Manager", "Strategy Consultant", "Supply Chain Manager", "Risk Manager", "Change Management", "Office Manager", "Executive Assistant"],
    "Finance & Accounting": ["Accountant", "Financial Analyst", "Investment Banker", "Audit", "Taxation", "Corporate Finance", "Portfolio Manager", "Wealth Management", "Chartered Accountant", "Stock Broker", "Insurance Analyst"],
    "Marketing & Communication": ["Digital Marketing", "Content Writing", "SEO Specialist", "Social Media Manager", "Brand Manager", "Email Marketing", "PPC Specialist", "Public Relations", "Copywriter", "Market Research", "Event Manager"],
    "Sales & Business Dev": ["Business Development", "Inside Sales", "Field Sales", "Account Manager", "Corporate Sales", "Retail Sales", "Sales Engineer", "Real Estate Agent"],
    "Data Science & AI": ["Data Analyst", "Data Engineer", "Machine Learning Engineer", "Business Intelligence", "AI Research", "Statistician", "Big Data Architect", "NLP Engineer"],
    "Healthcare & Medical": ["Doctor", "Nurse", "Pharmacist", "Lab Technician", "Physiotherapist", "Psychologist", "Dentist", "Medical Representative", "Radiologist", "Nutritionist", "Hospital Administration"],
    "Engineering (Core)": ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer", "Chemical Engineer", "Automobile Engineer", "Aerospace Engineer", "Electronics Engineer", "Industrial Engineer", "Petroleum Engineer", "Structural Engineer"],
    "Creative Arts & Media": ["Graphic Designer", "Product Designer", "Motion Graphics", "Illustrator", "Video Editor", "Photographer", "Animator", "Fashion Designer", "Interior Designer", "Journalist", "Radio Jockey", "Script Writer"],
    "Education & Training": ["School Teacher", "College Professor", "Corporate Trainer", "Online Tutor", "Curriculum Designer", "Librarian", "Special Education", "Early Childhood Education"],
    "Human Resources": ["Recruiter", "HR Manager", "Talent Acquisition", "Employee Relations", "Payroll Specialist", "L&D Specialist", "HR Generalist", "Compensation & Benefits"],
    "Legal & Compliance": ["Lawyer", "Legal Advisor", "Compliance Officer", "Corporate Lawyer", "Intellectual Property", "Paralegal", "Contract Administrator", "Judge/Judicial Service"],
    "Hospitality & Tourism": ["Hotel Manager", "Chef", "Front Office", "Travel Agent", "Tour Guide", "Cabin Crew", "Event Planner", "F&B Manager", "Housekeeping"],
    "Logistics & Supply Chain": ["Logistics Manager", "Procurement Specialist", "Warehouse Manager", "Distribution Manager", "Import Export Manager", "Inventory Controller", "Fleet Manager"],
    "Construction & Real Estate": ["Architect", "Site Engineer", "Real Estate Consultant", "Property Manager", "Quantity Surveyor", "Planning Engineer", "Interior Decorator"],
    "Science & Research": ["Research Scientist", "Biotechnologist", "Pharmacologist", "Environmental Scientist", "Geologist", "Microbiologist", "Astrophysicist", "Chemist", "Physicist"],
    "Customer Support": ["Customer Service Rep", "Technical Support", "Voice Process (BPO)", "Non-Voice Process", "Relationship Manager", "Support Engineer", "Call Center Manager"],
    "Media & Entertainment": ["Actor", "Director", "Sound Engineer", "Production Assistant", "Media Planner", "Light Technician", "Set Designer", "Casing Director"],
    "Other Fields": ["Agriculture Specialist", "Security Guard", "Fitness Trainer", "Beauty Therapist", "Driving / Delivery", "Social Worker", "Content Creator", "Freelancer"]
};

const platforms = [
    { name: "Naukri", base: "https://www.naukri.com/job-search?q={query}&l={location}&experience={exp}&salary={sal}", color: "#2471a3" },
    { name: "LinkedIn", base: "https://www.linkedin.com/jobs/search/?keywords={query}&location={location}&f_TPR=r604800", color: "#0077b5" },
    { name: "Indeed", base: "https://in.indeed.com/jobs?q={query}&l={location}&fromage=7", color: "#003A9B" },
    { name: "Glassdoor", base: "https://www.glassdoor.co.in/Job/jobs.htm?sc.keyword={query}&locT=C&locId={location}", color: "#0CAA41" },
    { name: "Shine", base: "https://www.shine.com/job-search/{query}-jobs-in-{location}", color: "#F9B115" },
    { name: "Foundit (Monster)", base: "https://www.foundit.in/srp/results?query={query}&location={location}", color: "#6A2D8B" },
    { name: "Internshala", base: "https://internshala.com/jobs/keywords-{query}", color: "#00A5EC" },
    { name: "Freshersworld", base: "https://www.freshersworld.com/jobs/jobsearch/{query}", color: "#F15A24" },
    { name: "Upwork", base: "https://www.upwork.com/nx/search/jobs/?q={query}", color: "#14a800" },
    { name: "Fiverr", base: "https://www.fiverr.com/search/gigs?query={query}", color: "#1dbf73" },
    { name: "Toptal", base: "https://www.toptal.com/talent/find?q={query}", color: "#3863a0" },
    { name: "Cutshort", base: "https://cutshort.io/jobs?search={query}", color: "#E1306C" },
    { name: "Wellfound (AngelList)", base: "https://wellfound.com/jobs?q={query}", color: "#000000" },
    { name: "Google Jobs", base: "https://www.google.com/search?q=jobs+{query}+{location}+after:2026-03-20", color: "#4285F4" }
];

let savedJobs = JSON.parse(localStorage.getItem('solSavedJobs') || '[]');
let newlyAddedJobs = [];
let currentTab = 'newly-added';
let lastSearchResults = [];

const JOB_SKILLS_DB = [
    "python", "javascript", "react", "node", "java", "coding", "sql", "excel", "sales", "marketing", "management",
    "communication", "leadership", "analytics", "aws", "cloud", "design", "ui", "ux", "content", "social media",
    "hr", "finance", "banking", "tally", "accounting", "civil", "mechanical", "electrical", "entry level",
    "fresher", "graduate", "mtech", "btech", "mba", "logic", "strategy", "crm", "salesforce", "advertising"
];

document.getElementById('jobField').addEventListener('change', function () {
    const field = this.value;
    const subFieldSelect = document.getElementById('subField');
    const customFieldInput = document.getElementById('jobFieldCustom');

    // Toggle custom input
    if (field === 'other') {
        customFieldInput.classList.remove('hidden');
        customFieldInput.required = true;
    } else {
        customFieldInput.classList.add('hidden');
        customFieldInput.required = false;
    }

    subFieldSelect.innerHTML = '<option value="">Select Sub Field</option>';

    if (field && subFields[field]) {
        subFields[field].forEach(sub => {
            const option = document.createElement('option');
            option.value = sub;
            option.textContent = sub;
            subFieldSelect.appendChild(option);
        });
    }

    // Always add "Other" option to sub-fields
    const otherOption = document.createElement('option');
    otherOption.value = 'other';
    otherOption.textContent = 'Other (Type manually...)';
    subFieldSelect.appendChild(otherOption);
});

document.getElementById('subField').addEventListener('change', function () {
    const customSubInput = document.getElementById('subFieldCustom');
    if (this.value === 'other') {
        customSubInput.classList.remove('hidden');
        customSubInput.required = true;
    } else {
        customSubInput.classList.add('hidden');
        customSubInput.required = false;
    }
});

document.getElementById('jobSearchForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const fieldSelect = document.getElementById('jobField');
    const subSelect = document.getElementById('subField');

    // Auto-switch to Live Search tab
    switchTab('live');

    const field = fieldSelect.value === 'other' ? document.getElementById('jobFieldCustom').value : fieldSelect.value;
    const sub = subSelect.value === 'other' ? document.getElementById('subFieldCustom').value : subSelect.value;
    const shift = document.getElementById('jobShift').value;
    const exp = document.getElementById('experience').value;
    const sal = document.getElementById('package').value;
    const loc = document.getElementById('location').value;

    // Construct search query
    let query = `${sub || field}`;
    if (shift !== 'both') query += ` ${shift} shift`;

    // Calculate date 10 days ago
    const date10DaysAgo = new Date();
    date10DaysAgo.setDate(date10DaysAgo.getDate() - 10);
    const dateString = date10DaysAgo.toISOString().split('T')[0];

    // Today's date for display
    const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

    const resultsSection = document.getElementById('resultsSection');
    const resultsGrid = document.getElementById('resultsGrid');
    const insightsPanel = document.getElementById('insightsPanel');

    // Switch to live tab if not already
    switchTab('live');

    // Show loading state on submit button
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Searching...`;
    }

    // Show Loading Skeleton
    resultsSection.classList.remove('hidden');
    resultsGrid.innerHTML = Array(6).fill(0).map(() => `
        <div class="skeleton-card">
            <div class="skeleton platform-badge" style="width: 80px; height: 20px;"></div>
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text" style="width: 40%;"></div>
            <div class="skeleton-btn skeleton"></div>
        </div>
    `).join('');
    resultsSection.scrollIntoView({ behavior: 'smooth' });

    try {
        const API_BASE = 'https://onerajsingh2321-solmates-job-backend.hf.space';
        console.log(`Starting search for: ${query} in ${loc}`);
        const response = await fetch(`${API_BASE}/api/jobs/search?query=${encodeURIComponent(query)}&location=${encodeURIComponent(loc)}&exp=${encodeURIComponent(exp)}&sal=${encodeURIComponent(sal)}&shift=${encodeURIComponent(shift)}`);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        console.log('Search response received:', Array.isArray(result) ? result.length : 'success');

        resultsGrid.innerHTML = '';

        // Handle direct array response (new FastAPI format)
        let jobs = null;
        if (Array.isArray(result) && result.length > 0) {
            jobs = result;
        }
        // Handle old wrapped format
        else if (result.success && result.data && result.data.length > 0) {
            jobs = result.data;
        }
        // Handle error with raw_output fallback (extract JSON array from it)
        else if (result.raw_output) {
            const match = result.raw_output.match(/\[[\s\S]*\]/);
            if (match) {
                try { jobs = JSON.parse(match[0]); } catch (e) { }
            }
        }

        if (jobs && jobs.length > 0) {
            lastSearchResults = jobs;
            renderPlatformFilters(jobs);
            renderJobs(jobs);
            updateInsights(jobs);
        } else {
            console.warn('No live results, using fallback.');
            const f = document.getElementById('platformFilters');
            if (f) { f.classList.add('hidden'); f.style.display = 'none'; }
            renderFallbackLinks(query, loc, exp, sal, dateString, today);
        }
    } catch (error) {
        console.error('Search error details:', error);
        const f = document.getElementById('platformFilters');
        if (f) { f.classList.add('hidden'); f.style.display = 'none'; }
        renderFallbackLinks(query, loc, exp, sal, dateString, today);
    } finally {
        // Always restore the button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    }
});

// --- VISIONARY FUNCTIONS ---

// 1. Tab Switching
function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(btn => {
        const isActive = btn.dataset.tab === tab;
        btn.classList.toggle('active', isActive);

        // Special icon toggle for saved tab
        if (btn.dataset.tab === 'saved') {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = isActive ? 'fas fa-heart' : 'far fa-heart';
            }
        }
    });

    const insightsPanel = document.getElementById('insightsPanel');
    const platformFilters = document.getElementById('platformFilters');

    if (tab === 'saved') {
        if (insightsPanel) {
            insightsPanel.classList.add('hidden');
            insightsPanel.style.display = 'none';
        }
        if (platformFilters) {
            platformFilters.classList.add('hidden');
            platformFilters.style.display = 'none';
        }
        renderJobs(savedJobs, true);
    } else if (tab === 'newly-added') {
        if (insightsPanel) {
            insightsPanel.classList.add('hidden');
            insightsPanel.style.display = 'none';
        }
        if (platformFilters) {
            platformFilters.classList.add('hidden');
            platformFilters.style.display = 'none';
        }
        renderJobs(newlyAddedJobs, false);
    } else {
        // Live Search Tab
        if (lastSearchResults.length > 0) {
            if (insightsPanel) {
                insightsPanel.classList.remove('hidden');
                insightsPanel.style.display = 'grid'; // Force grid
            }
            if (platformFilters) {
                platformFilters.classList.remove('hidden');
                platformFilters.style.display = 'flex'; // Force show on mobile
            }
            renderJobs(lastSearchResults);
            updateInsights(lastSearchResults);
        } else {
            if (insightsPanel) {
                insightsPanel.classList.add('hidden');
                insightsPanel.style.display = 'none';
            }
            if (platformFilters) {
                platformFilters.classList.add('hidden');
                platformFilters.style.display = 'none';
            }
            // Clear the grid so admin jobs don't stay visible
            const resultsGrid = document.getElementById('resultsGrid');
            if (resultsGrid && currentTab === 'live') {
                resultsGrid.innerHTML = `
                        <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 50px 20px; border: 2px dashed rgba(0,0,0,0.05); border-radius: 12px; margin-top: 20px;">
                            <i class="fas fa-search" style="font-size: 32px; color: var(--accent-gold); margin-bottom: 15px; display: block; opacity: 0.5;"></i>
                            <h3 style="color: var(--primary-blue); margin-bottom: 5px;">Ready to Explore?</h3>
                            <p style="font-size: 14px;">Select a field above and click <strong>Find Jobs</strong> to see live openings.</p>
                        </div>
                    `;
            }
        }
    }

    updateTabCounts();
}

function updateTabCounts() {
    const countAdded = document.getElementById('countAdded');
    const countSaved = document.getElementById('countSaved');
    const countLive = document.getElementById('countLive');

    if (countAdded) countAdded.textContent = newlyAddedJobs.length;
    if (countSaved) countSaved.textContent = savedJobs.length;
    if (countLive) countLive.textContent = lastSearchResults.length;
}

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// 3. Saved Jobs Logic
function toggleSaveJob(job, e) {
    e.preventDefault();
    e.stopPropagation();

    const index = savedJobs.findIndex(sj => sj.link === job.link);
    if (index > -1) {
        savedJobs.splice(index, 1);
    } else {
        savedJobs.push(job);
    }

    localStorage.setItem('solSavedJobs', JSON.stringify(savedJobs));
    if (currentTab === 'saved') {
        renderJobs(savedJobs, true);
    } else {
        const activeFilter = document.querySelector('.platform-filter-btn.active')?.textContent.split(' ')[0] || 'All';
        renderJobs(lastSearchResults, false, activeFilter);
    }
}

// 4. Insights & Analytics (Automatic & Dynamic)
function updateInsights(data) {
    if (!data || data.length === 0) return;

    const insightsPanel = document.getElementById('insightsPanel');
    if (!insightsPanel) return;

    // CRITICAL: Only show if we are actually in the live search view
    if (currentTab === 'live') {
        insightsPanel.classList.remove('hidden');
        insightsPanel.style.display = 'grid';
    } else {
        insightsPanel.classList.add('hidden');
        insightsPanel.style.display = 'none';
    }

    document.getElementById('totalMatches').textContent = data.length;

    // Find Top Location (Strict Filtered)
    const locs = {};
    data.forEach(j => {
        const l = j.location.split(',')[0].trim();
        locs[l] = (locs[l] || 0) + 1;
    });
    const topLoc = Object.keys(locs).reduce((a, b) => locs[a] > locs[b] ? a : b, "Remote");
    document.getElementById('topLocation').textContent = topLoc;

    // Find Trending Skill (using our DB)
    const skillCounts = {};
    data.forEach(j => {
        const text = (j.title + " " + (j.description || "")).toLowerCase();
        JOB_SKILLS_DB.forEach(skill => {
            if (text.includes(skill)) skillCounts[skill] = (skillCounts[skill] || 0) + 1;
        });
    });
    const topSkill = Object.keys(skillCounts).reduce((a, b) => skillCounts[a] > skillCounts[b] ? a : b, "General");
    document.getElementById('topSkill').textContent = topSkill.charAt(0).toUpperCase() + topSkill.slice(1);

    // Platform distribution (Visual)
    const stats = {};
    data.forEach(j => stats[j.source] = (stats[j.source] || 0) + 1);
    const statsHtml = Object.entries(stats).map(([src, count]) => {
        const pct = Math.round((count / data.length) * 100);
        return `<span style="background: rgba(15,28,46,0.05); padding: 4px 10px; border-radius: 6px; margin-right: 5px;">${src}: ${pct}%</span>`;
    }).join('');
    document.getElementById('platformStats').innerHTML = statsHtml;
}

// 5. Career Assistant (Cover Letter / Prep)
function generateCoverLetter(job) {
    const text = `Subject: Application for ${job.title} - ${job.company}\n\nDear Hiring Manager,\n\nI am writing to express my strong interest in the ${job.title} position at ${job.company}. With my background and passion for this field, I am confident that I can contribute effectively to your team.\n\nI noticed this opportunity on ${job.source} and was particularly impressed by the job requirements. I look forward to discussing how my skills align with your vision.\n\nBest regards,\n[Your Name]`;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Cover_Letter_${job.company.replace(/[^a-z]/gi, '_')}.txt`;
    link.click();
}

function getPrepLink(job) {
    const title = job.title.toLowerCase();

    let technicalQuestions = [];
    // Determine field based on title keywords
    if (title.includes('developer') || title.includes('engineer') || title.includes('programmer')) {
        technicalQuestions = [
            "1. Can you explain your experience with the primary technologies listed in the job description?",
            "2. Describe a time you had to debug a complex issue. What was your approach?",
            "3. How do you ensure your code is scalable and maintainable?",
            "4. What is your experience with version control systems (like Git)?",
            "5. Can you explain the concept of Continuous Integration/Continuous Deployment (CI/CD)?",
            "6. How do you stay updated with the latest technology trends and tools?",
            "7. Describe a challenging technical project you worked on and your specific contribution.",
            "8. How do you handle code reviews and incorporate feedback?",
            "9. What are your strategies for optimizing application performance?",
            "10. Can you explain the difference between relational and non-relational databases?",
            "11. How do you approach writing unit tests and ensuring test coverage?",
            "12. What is your experience with cloud platforms (AWS, Azure, GCP)?",
            "13. Explain the principles of RESTful API design.",
            "14. How do you handle security vulnerabilities in your code?",
            "15. Describe a situation where you had to learn a new technology quickly."
        ];
    } else if (title.includes('manager') || title.includes('lead')) {
        technicalQuestions = [
            "1. What is your approach to leading and motivating a team?",
            "2. Describe how you handle conflicts within your team.",
            "3. How do you prioritize tasks and manage project deadlines?",
            "4. What methodologies do you use for project management (e.g., Agile, Scrum)?",
            "5. Can you share an example of a successful project you managed from start to finish?",
            "6. How do you communicate project status to stakeholders?",
            "7. Describe a time when a project didn't go as planned. How did you handle it?",
            "8. How do you identify and mitigate project risks?",
            "9. What is your experience with budgeting and resource allocation?",
            "10. How do you onboard and train new team members?",
            "11. Can you explain your process for setting team goals and tracking performance?",
            "12. How do you handle underperforming team members?",
            "13. Describe your experience with stakeholder management.",
            "14. How do you foster a collaborative and inclusive team environment?",
            "15. What tools do you prefer for project tracking and collaboration?"
        ];
    } else if (title.includes('data') || title.includes('analyst')) {
        technicalQuestions = [
            "1. Which data analysis tools and languages are you most proficient in (e.g., Python, R, SQL)?",
            "2. Describe a complex data set you worked with and the insights you derived.",
            "3. How do you ensure data quality and integrity in your analysis?",
            "4. Can you explain a specific machine learning model you have implemented?",
            "5. What is your experience with data visualization tools (e.g., Tableau, Power BI)?",
            "6. How do you handle missing or incomplete data?",
            "7. Describe a time when your data analysis led to a significant business decision.",
            "8. Can you explain the difference between supervised and unsupervised learning?",
            "9. How do you communicate technical findings to non-technical stakeholders?",
            "10. What metrics do you use to evaluate model performance?",
            "11. Describe your experience with A/B testing and experimentation.",
            "12. How do you approach feature engineering and selection?",
            "13. What is your experience with big data technologies (e.g., Hadoop, Spark)?",
            "14. Can you explain the concept of overfitting and how to prevent it?",
            "15. How do you stay updated with the latest advancements in data science?"
        ];
    } else if (title.includes('design') || title.includes('ux') || title.includes('ui')) {
        technicalQuestions = [
            "1. Walk me through your design process from concept to final product.",
            "2. How do you conduct user research and incorporate findings into your designs?",
            "3. Can you share a project from your portfolio that you are particularly proud of?",
            "4. How do you balance user needs with business goals?",
            "5. What is your experience with prototyping tools (e.g., Figma, Sketch)?",
            "6. Describe a time when you received constructive criticism on your design. How did you handle it?",
            "7. How do you ensure your designs are accessible to all users?",
            "8. Can you explain the difference between UI and UX design?",
            "9. How do you collaborate with developers to ensure accurate implementation of your designs?",
            "10. What is your approach to creating and maintaining design systems?",
            "11. Describe your process for usability testing and iteration.",
            "12. How do you stay inspired and keep up with design trends?",
            "13. Can you explain the concept of responsive web design?",
            "14. How do you handle differing opinions on design decisons within a team?",
            "15. What metrics do you use to measure the success of a design?"
        ];
    } else if (title.includes('sales') || title.includes('marketing')) {
        technicalQuestions = [
            "1. What strategies do you use to generate leads and find new prospects?",
            "2. Describe a successful marketing campaign you managed.",
            "3. How do you handle objections from potential clients?",
            "4. What is your experience with CRM software (e.g., Salesforce, HubSpot)?",
            "5. Can you share an example of how you met or exceeded your sales targets?",
            "6. How do you measure the ROI of your marketing efforts?",
            "7. Describe your approach to building and maintaining client relationships.",
            "8. What role does social media play in your marketing strategy?",
            "9. How do you adapt your pitch for different types of clients?",
            "10. Can you explain the sales funnel and your role at each stage?",
            "11. How do you handle a lost sale or an unsuccessful campaign?",
            "12. What is your experience with SEO and content marketing?",
            "13. How do you collaborate with other departments to achieve sales/marketing goals?",
            "14. Describe a time when you had to pivot your strategy quickly.",
            "15. How do you stay informed about market trends and competitor activities?"
        ];
    } else {
        technicalQuestions = [
            `1. What specific skills make you a strong candidate for this ${job.title} role?`,
            "2. Describe your daily routine in your previous role.",
            "3. How do you prioritize your tasks when dealing with multiple deadlines?",
            "4. What tools and software are essential for your day-to-day work?",
            "5. Can you provide an example of a challenging problem you solved recently?",
            "6. How do you ensure accuracy and quality in your work?",
            "7. Describe a project where you had to collaborate closely with others.",
            "8. How do you stay organized and manage your time effectively?",
            "9. What is your approach to learning new skills required for your job?",
            "10. Can you share an example of a time you took initiative on a project?",
            "11. How do you handle stressful situations or tight deadlines?",
            "12. Describe a time when you had to adapt to a significant change at work.",
            "13. How do you evaluate your own performance and seek improvement?",
            "14. What are the most important qualities for success in this role?",
            "15. How do you handle repetitive or mundane tasks?"
        ];
    }

    const behavioralQuestions = [
        "16. Tell me about yourself and your professional background.",
        "17. Why are you interested in this position at our company?",
        "18. What do you consider to be your greatest professional strengths?",
        "19. What is your greatest professional weakness, and how are you working to improve it?",
        "20. Describe a time when you faced a significant challenge at work. How did you overcome it?",
        "21. Can you share an example of a time you failed? What did you learn from it?",
        "22. Where do you see yourself in five years?",
        "23. Why are you looking to leave your current position?",
        "24. Describe a situation where you had to work with a difficult colleague or client.",
        "25. How do you handle constructive criticism?",
        "26. Can you give an example of a goal you reached and tell me how you achieved it?",
        "27. What is your preferred work style and environment?",
        "28. How do you define success in your career?",
        "29. What motivates you to do your best work?",
        "30. Do you have any questions for us about the role or the company?"
    ];

    const text = `Interview Preparation Guide: ${job.title}\nCompany: ${job.company}\n\n` +
        `Congratulations on preparing for your interview! Here are 30 questions designed to help you succeed.\n\n` +
        `--- ROLE-SPECIFIC TECHNICAL QUESTIONS ---\n\n` +
        technicalQuestions.join('\n\n') + `\n\n` +
        `--- GENERAL BEHAVIORAL QUESTIONS ---\n\n` +
        behavioralQuestions.join('\n\n') + `\n\n` +
        `--- TIPS FOR SUCCESS ---\n` +
        `- Use the STAR method (Situation, Task, Action, Result) for behavioral questions.\n` +
        `- Research ${job.company} thoroughly before the interview.\n` +
        `- Prepare 2-3 thoughtful questions to ask the interviewer.\n` +
        `- Dress appropriately and ensure your tech setup is working if it's a virtual interview.\n` +
        `- Follow up with a thank-you email within 24 hours.\n\n` +
        `Good luck!`;

    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Interview_Prep_${job.title.replace(/[^a-z0-9]/gi, '_')}.txt`;
    link.click();
}

function renderPlatformFilters(data) {
    const filtersDiv = document.getElementById('platformFilters');
    if (!filtersDiv) return;

    filtersDiv.innerHTML = '';
    filtersDiv.classList.remove('hidden');
    filtersDiv.style.display = 'flex'; // Force visibility back since switchTab set it to none during loading

    // Count jobs logic
    const counts = { 'All': data.length };
    data.forEach(job => {
        const src = job.source || 'Other';
        counts[src] = (counts[src] || 0) + 1;
    });

    const sortedSources = ['All', ...Object.keys(counts).filter(k => k !== 'All').sort((a, b) => counts[b] - counts[a])];

    sortedSources.forEach(src => {
        const btn = document.createElement('button');
        btn.className = 'sol-btn sol-btn--view platform-filter-btn' + (src === 'All' ? ' active' : '');
        btn.style.padding = '8px 16px';
        btn.style.fontSize = '14px';
        btn.style.borderRadius = '20px';
        btn.style.flexShrink = '0';
        btn.style.cursor = 'pointer';
        btn.style.transition = 'all 0.3s';
        btn.style.border = src === 'All' ? 'none' : '1px solid var(--accent-gold)';
        btn.style.background = src === 'All' ? 'var(--primary-blue)' : 'transparent';
        btn.style.color = src === 'All' ? 'white' : 'var(--primary-blue)';

        btn.innerHTML = `${src} <span style="background: rgba(192, 150, 45, 0.2); padding: 2px 6px; border-radius: 10px; font-size: 11px; margin-left: 6px;">${counts[src]}</span>`;

        btn.onclick = () => {
            document.querySelectorAll('.platform-filter-btn').forEach(b => {
                b.classList.remove('active');
                b.style.background = 'transparent';
                b.style.color = 'var(--primary-blue)';
                b.style.border = '1px solid var(--accent-gold)';
            });
            btn.classList.add('active');
            btn.style.background = 'var(--primary-blue)';
            btn.style.color = 'white';
            btn.style.border = 'none';

            renderJobs(data, false, src);
        };
        filtersDiv.appendChild(btn);
    });
}

function renderJobs(data, isSavedView = false, filterPlatform = 'All') {
    const resultsGrid = document.getElementById('resultsGrid');
    resultsGrid.innerHTML = '';

    const filteredData = filterPlatform === 'All' ? data : data.filter(job => (job.source || 'Other') === filterPlatform);
    const isAdmin = !!(window.solmatesAPI && window.solmatesAPI.isAdminLoggedIn());

    // Add "Add New" card ONLY for admins in Newly Added tab
    if (currentTab === 'newly-added' && filterPlatform === 'All' && isAdmin) {
        const addCard = document.createElement('div');
        addCard.className = 'sol-card fadeInUp';
        addCard.style.border = '2px dashed #ff4757';
        addCard.style.background = 'rgba(255, 71, 87, 0.05)';
        addCard.style.display = 'flex';
        addCard.style.flexDirection = 'column';
        addCard.style.alignItems = 'center';
        addCard.style.justifyContent = 'center';
        addCard.style.padding = '35px 20px';
        addCard.style.cursor = 'pointer';

        addCard.innerHTML = `
                <i class="fas fa-plus-circle" style="font-size: 48px; color: #ff4757; margin-bottom: 12px;"></i>
                <h3 style="margin: 0; color: var(--primary-blue); font-size: 20px; font-weight: 800;">Post New Job</h3>
                <p style="font-size: 13px; color: var(--text-muted); text-align: center; margin-top: 10px;">Click here to add a new hiring opportunity manually.</p>
            `;
        addCard.onclick = () => window.open('/admin/manage-jobs', '_blank');
        resultsGrid.appendChild(addCard);
    }

    if (filteredData.length === 0 && (!isAdmin || currentTab !== 'newly-added')) {
        resultsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No ${isSavedView ? 'saved' : ''} jobs found.</p>`;
        return;
    }

    // Group jobs by source
    const groupedJobs = {};
    filteredData.forEach(job => {
        const source = job.source || 'Other';
        if (!groupedJobs[source]) groupedJobs[source] = [];
        groupedJobs[source].push(job);
    });

    const sortedSources = Object.keys(groupedJobs).sort((a, b) => b.length - a.length);

    // --- PERFORMANCE OPTIMIZATION: Fragment Rendering ---
    const fragment = document.createDocumentFragment();

    sortedSources.forEach(source => {
        const sourceJobs = groupedJobs[source];

        if (filterPlatform === 'All') {
            const header = document.createElement('div');
            header.style.gridColumn = '1 / -1';
            header.style.marginTop = '20px';
            header.style.marginBottom = '5px';
            header.style.paddingBottom = '10px';
            header.style.borderBottom = '1px solid rgba(0,0,0,0.05)';
            header.innerHTML = `
                    <h2 style="font-size: 20px; color: var(--primary-blue); display: flex; align-items: center; gap: 10px; margin: 0;">
                        <i class="fas fa-layer-group"></i> ${source} Jobs
                        <span style="font-size: 13px; font-weight: 700; background: rgba(192, 150, 45, 0.1); color: var(--accent-gold); padding: 4px 10px; border-radius: 12px; margin-left: auto;">
                            ${sourceJobs.length} Results
                        </span>
                    </h2>
                `;
            fragment.appendChild(header);
        }

        sourceJobs.forEach(job => {
            const card = document.createElement('div');
            card.className = 'sol-card fadeInUp';

            const platformAssets = {
                'LinkedIn': { color: '#0077b5', logo: 'https://cdn-icons-png.flaticon.com/512/174/174857.png' },
                'Naukri': { color: '#2471a3', logo: 'https://static.naukimg.com/s/4/100/i/naukri_Logo.png' },
                'Indeed': { color: '#003A9B', logo: 'https://www.indeed.com/favicon.ico' },
                'Internshala': { color: '#00A5EC', logo: 'https://internshala.com/favicon.ico' },
                'Shine': { color: '#F9B115', logo: 'https://www.google.com/s2/favicons?sz=64&domain=shine.com' },
                'Admin Posted': { color: '#1aa179', logo: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }
            };

            const asset = platformAssets[job.source] || { color: 'var(--primary-blue)', logo: '' };
            const dateText = job.date || 'Recent';
            const isNew = dateText.toLowerCase().includes('today') ||
                dateText.toLowerCase().includes('1 day') ||
                dateText.toLowerCase().includes('2 day') ||
                dateText.toLowerCase().includes('hour') ||
                dateText.toLowerCase().includes('minute') ||
                dateText.toLowerCase().includes('just now');
            const isSaved = savedJobs.some(sj => sj.link === job.link);

            card.innerHTML = `
                    <button class="save-btn ${isSaved ? 'active' : ''}" title="Save Job">
                        <i class="${isSaved ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                    <div class="sol-card-header">
                        <span class="platform-badge" style="background: ${asset.color}; color: white">${job.source}</span>
                        ${asset.logo ? `<img src="${asset.logo}" class="platform-logo" alt="${job.source}" loading="lazy">` : ''}
                    </div>
                    ${isNew ? '<span class="new-badge">NEW</span>' : ''}
                    <h3>${job.title}</h3>
                    <div class="sol-meta-row">
                        <div class="sol-meta"><i class="fas fa-building"></i> ${job.company || (job.source === 'Admin Posted' ? 'Direct Hiring' : job.source)}</div>
                        <div class="sol-meta"><i class="fas fa-map-marker-alt"></i> ${job.location || 'Location Not Specified'}</div>
                        <div class="sol-meta"><i class="fas fa-clock"></i> ${dateText}</div>
                        ${(job.package || job.package_info || job.salary) ? `
                            <div class="sol-meta" style="color: #28a745; font-weight: 800; background: rgba(40, 167, 69, 0.08); padding: 4px 10px; border-radius: 8px;">
                                <i class="fas fa-wallet"></i> ${job.package || job.package_info || job.salary}
                            </div>
                        ` : ''}
                    </div>
                    ${job.contact_number ? `<div style="font-size: 11px; font-weight: 600; color: #666; margin-top: 5px;"><i class="fas fa-phone"></i> Contact: ${job.contact_number}</div>` : ''}
                    
                    <div class="sol-desc-wrapper">
                        <p class="sol-desc">${job.description || job.detail || 'Click apply to view full details on ' + job.source}</p>
                        ${(job.description || job.detail || "").length > 150 ? `
                            <button class="view-more-btn">
                                <i class="fas fa-chevron-down"></i> View Full Description
                            </button>
                        ` : ''}
                    </div>
                    
                    <div class="action-row">
                        <button class="sol-btn sol-btn--view apply-btn">Apply <i class="fas fa-external-link-alt"></i></button>
                        ${isAdmin && (job.source === 'Admin Posted' || currentTab === 'newly-added') ? `
                            <button class="sol-btn--assist edit-btn" style="background: var(--accent-gold); color: white;" title="Edit Job"><i class="fas fa-edit"></i> Edit</button>
                            <button class="sol-btn--assist delete-btn" style="background: #dc3545; color: white;" title="Delete Job"><i class="fas fa-trash"></i> Delete</button>
                        ` : `
                            <button class="sol-btn--assist letter-btn" title="AI Cover Letter"><i class="fas fa-magic"></i> AI Cover Letter</button>
                            <button class="sol-btn--assist prep-btn" title="Interview Prep"><i class="fas fa-graduation-cap"></i> Interview Prep Guide</button>
                        `}
                    </div>
                `;

            // --- View More Toggle for long descriptions ---
            const viewMoreBtn = card.querySelector('.view-more-btn');
            const descP = card.querySelector('.sol-desc');

            if (viewMoreBtn && descP) {
                viewMoreBtn.onclick = (e) => {
                    e.preventDefault();
                    const isExpanded = descP.classList.toggle('expanded');
                    viewMoreBtn.classList.toggle('expanded', isExpanded);
                    viewMoreBtn.innerHTML = isExpanded ?
                        '<i class="fas fa-chevron-up"></i> View Less' :
                        '<i class="fas fa-chevron-down"></i> View Full Description';
                };
            }

            // Event Listeners
            card.querySelector('.save-btn').onclick = (e) => toggleSaveJob(job, e);
            card.querySelector('.apply-btn').onclick = () => window.open(job.link, '_blank');

            if (isAdmin && (job.source === 'Admin Posted' || currentTab === 'newly-added')) {
                card.querySelector('.edit-btn').onclick = (e) => {
                    e.stopPropagation();
                    window.open(`/admin/manage-jobs`, '_blank');
                };
                card.querySelector('.delete-btn').onclick = (e) => deleteJobWithStatus(job, e);
            } else {
                card.querySelector('.letter-btn').onclick = (e) => { e.stopPropagation(); generateCoverLetter(job); };
                card.querySelector('.prep-btn').onclick = (e) => { e.stopPropagation(); getPrepLink(job); };
            }

            fragment.appendChild(card);
        });
    });

    resultsGrid.appendChild(fragment);
}

function renderFallbackLinks(query, loc, exp, sal, dateString, today) {
    const resultsGrid = document.getElementById('resultsGrid');
    resultsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); margin-bottom: 20px;">Could not fetch live results. Showing platform dashboard instead:</p>';

    platforms.forEach(platform => {
        let currentPlatformUrl = platform.base;
        if (platform.name === "Google Jobs") {
            currentPlatformUrl = currentPlatformUrl.replace('2026-03-20', dateString);
        }

        if (platform.name === "LinkedIn") currentPlatformUrl += "&sortBy=DD";
        if (platform.name === "Indeed") currentPlatformUrl += "&sort=date";
        if (platform.name === "Naukri") currentPlatformUrl += "&sort=day";

        let url = currentPlatformUrl
            .replace('{query}', encodeURIComponent(query))
            .replace('{location}', encodeURIComponent(loc || 'India'))
            .replace('{exp}', encodeURIComponent(exp))
            .replace('{sal}', encodeURIComponent(sal));

        const card = document.createElement('a');
        card.href = url;
        card.target = '_blank';
        card.className = 'sol-card';

        card.innerHTML = `
            <span class="platform-badge" style="background-color: ${platform.color}">${platform.name}</span>
            <h3>${query}</h3>
            <div class="sol-meta">
                <i class="fas fa-map-marker-alt"></i> ${loc || 'India'}
                <i class="fas fa-calendar-alt" style="margin-left: 10px;"></i> Posted: ${today} (Recent)
            </div>
            <p class="sol-desc">Explore live openings for ${query} on ${platform.name}. Filtered for ${exp} exp, ${sal || 'best market'} package, and last 10 days.</p>
            <div class="sol-btn sol-btn--view">
                View Latest Jobs <i class="fas fa-external-link-alt" style="font-size: 12px;"></i>
            </div>
        `;
        resultsGrid.appendChild(card);
    });
}

// Auto-populate location if possible (optional, but nice)
// window.onload = () => { document.getElementById('location').value = 'Noida'; };

// --- ADMIN & MANUAL JOBS ---
async function fetchNewlyAddedJobs() {
    try {
        const API_BASE = window.PRODUCTION_API_URL || 'https://solmates-backend-w27e.onrender.com/api';
        const res = await fetch(`${API_BASE}/manual-jobs`);
        const json = await res.json();
        if (json.success && json.data) {
            newlyAddedJobs = json.data.map(job => ({
                ...job,
                source: 'Admin Posted',
                description: job.detail || job.description || 'No description provided.'
            }));
            console.log('Fetched admin jobs:', newlyAddedJobs.length);

            // Re-render if we are currently on the newly-added tab
            if (currentTab === 'newly-added') {
                renderJobs(newlyAddedJobs);
            }
            updateTabCounts();
        }
    } catch (e) {
        console.error("Failed to fetch admin jobs:", e);
    }
}

// Replicate SOL Database Admin Detection
async function initAdminAuth() {
    if (window.solmatesAPI && window.solmatesAPI.isAdminLoggedIn()) {
        try {
            const verification = await window.solmatesAPI.verifyAdminToken();
            if (verification && verification.valid) {
                console.log('Admin verified successfully');
                const manageBtn = document.getElementById('adminManageJobsBtn');
                if (manageBtn) manageBtn.classList.remove('hidden');

                // Re-render to show admin-only cards
                if (currentTab === 'newly-added') {
                    renderJobs(newlyAddedJobs);
                }
            }
        } catch (e) {
            console.warn('Admin verification failed:', e);
        }
    }
}

// Initialize
fetchNewlyAddedJobs();
initAdminAuth();


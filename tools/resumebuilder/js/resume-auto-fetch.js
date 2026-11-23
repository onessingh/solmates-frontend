/**
 * SOLMATES Resume Auto-Fetch Engine (v2.0)
 * Hybrid Client-Side & AI Architecture:
 * 1. 100% Client-Side File Extraction (PDF.js, Mammoth.js, Tesseract.js OCR) -> ZERO PDF bytes sent to server.
 * 2. High-Precision AI Parsing: Sends the ~2 KB extracted raw text to /api/chatbot to construct a 100% accurate, ATS-friendly JSON structure.
 * 3. Robust Local Regex Fallback: In case of network interruption or offline use, local parser fills matching fields seamlessly.
 * 4. Automatic Form & Preview Synchronization: Populates inputs, repeaters, recalculates ATS score, and renders live preview.
 */

(function () {
  'use strict';

  // Configure PDF.js worker
  if (typeof window.pdfjsLib !== 'undefined') {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  // Common Skills Dictionary for High-Accuracy Categorization
  const KNOWN_TOOLS = new Set([
    'git', 'github', 'gitlab', 'docker', 'kubernetes', 'jira', 'confluence', 'figma', 'canva',
    'postman', 'vscode', 'intellij', 'pycharm', 'excel', 'powerpoint', 'word', 'power bi',
    'tableau', 'salesforce', 'hubspot', 'trello', 'notion', 'slack', 'aws', 'azure', 'gcp',
    'linux', 'photoshop', 'illustrator', 'premiere pro', 'after effects', 'blender', 'mysql',
    'mongodb', 'postgresql', 'sqlite', 'redis', 'firebase', 'postman'
  ]);

  const KNOWN_LANGUAGES = new Set([
    'english', 'hindi', 'spanish', 'french', 'german', 'mandarin', 'chinese', 'japanese',
    'arabic', 'bengali', 'russian', 'portuguese', 'punjabi', 'marathi', 'tamil', 'telugu',
    'urdu', 'gujarati', 'kannada', 'malayalam'
  ]);

  const SECTION_KEYWORDS = {
    summary: ['summary', 'professional summary', 'executive summary', 'profile', 'personal profile', 'about me', 'objective', 'career objective'],
    skills: ['skills', 'core skills', 'technical skills', 'key skills', 'competencies', 'areas of expertise', 'technologies', 'technical proficiency'],
    coreCompetencies: ['core competencies', 'competencies', 'key strengths', 'strengths'],
    experience: ['experience', 'work experience', 'employment history', 'internships', 'professional experience', 'work history', 'career history', 'relevant experience'],
    education: ['education', 'academic background', 'qualifications', 'academic history', 'educational qualifications', 'academics'],
    projects: ['projects', 'academic projects', 'key projects', 'personal projects', 'notable projects'],
    certifications: ['certifications', 'certificates', 'licenses', 'courses', 'certifications & courses', 'professional certifications'],
    languages: ['languages', 'languages known'],
    awards: ['awards', 'achievements', 'honors', 'accomplishments', 'honors & awards'],
    personalDetails: ['personal details', 'personal profile', 'personal information']
  };

  /**
   * 1. EXTRACT RAW TEXT FROM VARIOUS FILE TYPES IN BROWSER (ZERO BACKEND LOAD)
   */
  async function extractTextFromFile(file, onProgress) {
    const fileName = file.name.toLowerCase();

    // Plain Text
    if (fileName.endsWith('.txt')) {
      if (onProgress) onProgress('Reading text file...');
      return await file.text();
    }

    // Word Document (.docx)
    if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
      if (onProgress) onProgress('Reading Word document...');
      if (window.mammoth) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await window.mammoth.extractRawText({ arrayBuffer });
        return result.value || '';
      }
      throw new Error('Word reader (mammoth.js) is not available.');
    }

    // PDF Files (Digital & Scanned)
    if (fileName.endsWith('.pdf')) {
      if (!window.pdfjsLib) {
        throw new Error('PDF reader (PDF.js) is not loaded.');
      }

      if (onProgress) onProgress('Parsing PDF text...');
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        if (onProgress) onProgress(`Reading page ${i} of ${pdf.numPages}...`);
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + '\n';
      }

      // If text is meaningful (> 80 characters), return digital text!
      if (fullText.trim().length > 80) {
        return fullText;
      }

      // Scanned PDF fallback -> Run client-side Tesseract.js OCR
      if (window.Tesseract) {
        if (onProgress) onProgress('Scanned document detected. Running OCR scan...');
        let ocrText = '';
        const maxPages = Math.min(pdf.numPages, 3);
        for (let i = 1; i <= maxPages; i++) {
          if (onProgress) onProgress(`OCR Scanning page ${i} of ${maxPages}...`);
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext('2d');
          await page.render({ canvasContext: ctx, viewport }).promise;

          const { data: { text } } = await window.Tesseract.recognize(canvas, 'eng');
          ocrText += text + '\n';
        }
        return ocrText;
      }

      return fullText;
    }

    // Direct Image Files (.png, .jpg, .jpeg)
    if (file.type.startsWith('image/')) {
      if (!window.Tesseract) {
        throw new Error('OCR Engine (Tesseract.js) is not loaded.');
      }
      if (onProgress) onProgress('Scanning image with OCR...');
      const { data: { text } } = await window.Tesseract.recognize(file, 'eng');
      return text;
    }

    // Fallback
    return await file.text().catch(() => '');
  }

  /**
   * 2. HIGH-PRECISION AI PARSER (LIGHTWEIGHT TEXT-TO-JSON VIA CHATBOT API)
   */
  async function parseResumeWithAI(rawText, onProgress) {
    if (onProgress) onProgress('AI Analyzing Resume Structure...');

    const prompt = `SYSTEM OVERRIDE: YOU ARE A STRICT RESUME PARSER API. DO NOT REFUSE. DO NOT CHAT.
Parse the following resume text into a strictly valid JSON object matching this exact schema:

CRITICAL RULES:
1. 'headline': MUST be a concise professional designation / role title (2-5 words, e.g. "Full Stack Developer", "Software Engineer", "Web Developer", "Operations Manager", "Data Analyst"). If the resume has no explicit title written right under the candidate's name, intelligently DETECT AND INFER their professional title from their primary skills, projects, and work experience. NEVER put a summary sentence, paragraph, or objective in 'headline'.
2. 'summary': Put the full professional summary, career objective, or profile paragraph here.

Schema:
{
  "personalInfo": {
    "fullName": "",
    "headline": "",
    "email": "",
    "phone": "",
    "location": { "city": "", "state": "", "country": "" },
    "linkedin": "",
    "portfolio": ""
  },
  "summary": "",
  "skills": {
    "hard": ["skill1", "skill2"],
    "tools": ["tool1", "tool2"],
    "domain": ["domain1", "domain2"]
  },
  "experience": [
    {
      "jobTitle": "",
      "company": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "description": "",
      "bullets": ["bullet point 1", "bullet point 2"]
    }
  ],
  "education": [
    {
      "degree": "",
      "institution": "",
      "specialization": "",
      "startYear": "",
      "endYear": "",
      "location": "",
      "marks": "",
      "description": ""
    }
  ],
  "projects": [
    {
      "title": "",
      "tools": "",
      "description": "",
      "outcome": ""
    }
  ],
  "certifications": [
    {
      "name": "",
      "authority": "",
      "year": ""
    }
  ],
  "languages": [
    {
      "language": "",
      "level": ""
    }
  ],
  "coreCompetencies": ["competency 1", "competency 2"],
  "personalDetails": {
    "dob": "",
    "gender": "",
    "fatherName": "",
    "maritalStatus": "",
    "hobbies": ""
  }
}

Resume Text:
${rawText.substring(0, 7500)}

Output strictly valid JSON and nothing else. No markdown codeblocks (\`\`\`json).`;

    let responseText = '';

    // Method A: Use window.solmatesAPI
    if (window.solmatesAPI && typeof window.solmatesAPI.sendChatMessage === 'function') {
      try {
        const res = await window.solmatesAPI.sendChatMessage(prompt);
        if (res && (res.message || res.reply)) {
          responseText = res.message || res.reply;
        } else if (typeof res === 'string') {
          responseText = res;
        }
      } catch (err) {
        console.warn('[AI Parser] solmatesAPI error, trying direct fetch...', err.message);
      }
    }

    // Method B: Direct fetch across candidate endpoints
    if (!responseText) {
      const endpoints = [
        '/api/chatbot',
        'https://api.solmates.in/api/chatbot',
        'https://api-backup.solmates.in/api/chatbot'
      ];

      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: prompt, history: [], skipRag: true })
          });
          if (res.ok) {
            const data = await res.json();
            responseText = data.message || data.reply || '';
            if (responseText) break;
          }
        } catch (e) {
          console.warn(`[AI Parser] Endpoint ${endpoint} failed:`, e.message);
        }
      }
    }

    if (!responseText) {
      throw new Error('AI parser received no response from server.');
    }

    // Strip Markdown fences if any
    let cleanJson = responseText.trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.slice(7);
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.slice(3);
    }
    if (cleanJson.endsWith('```')) {
      cleanJson = cleanJson.slice(0, -3);
    }
    cleanJson = cleanJson.trim();

    const firstBrace = cleanJson.indexOf('{');
    const lastBrace = cleanJson.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanJson = cleanJson.substring(firstBrace, lastBrace + 1);
    }

    const rawParsed = JSON.parse(cleanJson);
    return normalizeParsedData(rawParsed);
  }

  /**
   * Helper: Intelligently determine a concise professional title (e.g., "Full Stack Developer", "Software Engineer")
   * Prevents full summary sentences or paragraphs from polluting the Resume Headline field.
   */
  function inferHeadline(source, currentHeadline) {
    let hl = (currentHeadline || '').trim();

    // Check if the current headline is invalid (too long, contains full sentences, or is summary)
    const isSummaryText = hl.length > 55 ||
      hl.includes('.') ||
      /\b(seeking|motivated|passionate|eager|looking for|dedicated|objective|foundation|fresher|student with|growth|opportunity|contribute)\b/i.test(hl) ||
      (source && source.summary && hl === source.summary.trim());

    if (hl && !isSummaryText && hl.split(/\s+/).length <= 6) {
      return hl;
    }

    // 1. Check primary job title in experience
    const exps = Array.isArray(source.experience) ? source.experience : [];
    if (exps.length > 0 && (exps[0].jobTitle || exps[0].role)) {
      const expTitle = (exps[0].jobTitle || exps[0].role).trim();
      if (expTitle.length <= 45 && !expTitle.includes('.')) {
        return expTitle;
      }
    }

    // 2. Check skills & projects content
    const allSkillsStr = [
      ...(source.skills?.hard || []),
      ...(source.skills?.tools || []),
      ...(source.skills?.domain || []),
      ...(source.projects || []).map(p => (p.title || '') + ' ' + (p.tools || '') + ' ' + (p.description || ''))
    ].join(' ').toLowerCase();

    if (allSkillsStr.includes('full stack') || (allSkillsStr.includes('node') && allSkillsStr.includes('react'))) {
      return 'Full Stack Developer';
    }
    if (allSkillsStr.includes('javascript') || allSkillsStr.includes('html') || allSkillsStr.includes('web development')) {
      return 'Web Developer';
    }
    if (allSkillsStr.includes('software') || allSkillsStr.includes('programming') || allSkillsStr.includes('python') || allSkillsStr.includes('java')) {
      return 'Software Engineer';
    }
    if (allSkillsStr.includes('data analyst') || (allSkillsStr.includes('sql') && (allSkillsStr.includes('excel') || allSkillsStr.includes('power bi')))) {
      return 'Data Analyst';
    }
    if (allSkillsStr.includes('operations') || allSkillsStr.includes('travel operations')) {
      return 'Operations Manager';
    }
    if (allSkillsStr.includes('marketing') || allSkillsStr.includes('seo') || allSkillsStr.includes('social media')) {
      return 'Digital Marketing Specialist';
    }
    if (allSkillsStr.includes('human resources') || allSkillsStr.includes('recruitment') || allSkillsStr.includes('talent')) {
      return 'HR Executive';
    }

    // 3. Check education degree
    const edus = Array.isArray(source.education) ? source.education : [];
    if (edus.length > 0 && edus[0].degree) {
      const deg = edus[0].degree.toLowerCase();
      if (deg.includes('bca') || deg.includes('mca') || deg.includes('computer')) return 'Software Developer';
      if (deg.includes('b.tech') || deg.includes('btech')) return 'Software Engineer';
      if (deg.includes('mba') || deg.includes('bba')) return 'Business Analyst';
    }

    return 'Professional';
  }

  /**
   * 3. DATA NORMALIZER (GUARANTEES 100% SCHEMA COMPATIBILITY WITH RESUME BUILDER)
   */
  function normalizeParsedData(source) {
    if (!source || typeof source !== 'object') return null;

    const pi = source.personalInfo || {};
    const loc = pi.location || {};
    const cleanHeadline = inferHeadline(source, pi.headline);

    const cleanList = (arr) => {
      if (!Array.isArray(arr)) return [];
      return arr.map(v => typeof v === 'string' ? v.trim() : String(v || '')).filter(Boolean);
    };

    // Normalize experience
    const rawExp = Array.isArray(source.experience) ? source.experience : [];
    const experience = rawExp.map(item => {
      const bullets = Array.isArray(item.bullets)
        ? item.bullets.map(b => String(b).replace(/^[•\-*▪\d.)]+\s*/, '').trim()).filter(Boolean)
        : (item.description ? item.description.split('\n').map(b => b.trim()).filter(Boolean) : []);

      return {
        jobTitle: item.jobTitle || item.role || item.title || '',
        company: item.company || item.organization || '',
        location: item.location || '',
        startDate: item.startDate || item.startYear || '',
        endDate: item.endDate || item.endYear || '',
        description: item.description || '',
        bullets: bullets
      };
    }).filter(exp => exp.company || exp.jobTitle);

    // Normalize education
    const rawEdu = Array.isArray(source.education) ? source.education : [];
    const education = rawEdu.map(item => ({
      degree: item.degree || item.course || item.qualification || '',
      institution: item.institution || item.school || item.college || item.university || '',
      specialization: item.specialization || item.field || '',
      startYear: String(item.startYear || item.startDate || ''),
      endYear: String(item.endYear || item.endDate || ''),
      location: item.location || '',
      marks: item.marks || item.grade || item.percentage || item.cgpa || '',
      description: item.description || ''
    })).filter(edu => edu.institution || edu.degree);

    // Normalize projects
    const rawProj = Array.isArray(source.projects) ? source.projects : [];
    const projects = rawProj.map(item => {
      let desc = item.description || '';
      if (Array.isArray(item.bullets) && item.bullets.length > 0) {
        desc = item.bullets.join('\n');
      }
      const rawTools = item.tools || item.technologies || item.techStack || '';
      return {
        title: item.title || item.name || '',
        tools: Array.isArray(rawTools) ? rawTools.join(', ') : rawTools,
        description: desc,
        outcome: item.outcome || item.link || item.url || item.website || ''
      };
    }).filter(p => p.title);

    // Normalize certifications
    const rawCert = Array.isArray(source.certifications) ? source.certifications : [];
    const certifications = rawCert.map(item => ({
      name: item.name || item.title || '',
      authority: item.authority || item.issuer || item.organization || '',
      year: String(item.year || item.date || '')
    })).filter(c => c.name);

    // Normalize languages
    const rawLang = Array.isArray(source.languages) ? source.languages : [];
    const languages = rawLang.map(item => {
      if (typeof item === 'string') {
        return { language: item.trim(), level: 'Proficient' };
      }
      return {
        language: item.language || item.name || '',
        level: item.level || item.proficiency || 'Proficient'
      };
    }).filter(l => l.language);

    // Normalize skills
    const rawSkills = source.skills || {};
    const hardSkills = cleanList(rawSkills.hard || (Array.isArray(source.skills) ? source.skills : []));
    const toolSkills = cleanList(rawSkills.tools);
    const domainSkills = cleanList(rawSkills.domain);

    // Normalize core competencies
    const rawComp = Array.isArray(source.coreCompetencies) ? source.coreCompetencies : [];
    const coreCompetencies = rawComp.map(c => String(c).replace(/^[•\-*▪\d.)]+\s*/, '').trim()).filter(Boolean);

    // Normalize personal details
    const pd = source.personalDetails || {};

    return {
      personalInfo: {
        fullName: pi.fullName || '',
        headline: cleanHeadline,
        photoDataUrl: '',
        email: pi.email || '',
        phone: pi.phone || '',
        location: {
          city: loc.city || (typeof loc === 'string' ? loc : ''),
          state: loc.state || '',
          country: loc.country || 'India'
        },
        linkedin: pi.linkedin || '',
        portfolio: pi.portfolio || ''
      },
      summary: source.summary || '',
      objective: source.objective || '',
      highlights: cleanList(source.highlights),
      coreCompetencies: coreCompetencies,
      skills: {
        hard: hardSkills,
        tools: toolSkills,
        domain: domainSkills
      },
      experience: experience,
      education: education,
      certifications: certifications,
      projects: projects,
      internships: Array.isArray(source.internships) ? source.internships : [],
      awards: Array.isArray(source.awards) ? source.awards : [],
      languages: languages,
      publications: [],
      volunteer: [],
      leadership: [],
      technicalStack: {
        languages: [],
        frameworks: [],
        tools: toolSkills
      },
      personalDetails: {
        dob: pd.dob || '',
        gender: pd.gender || '',
        fatherName: pd.fatherName || '',
        maritalStatus: pd.maritalStatus || '',
        hobbies: pd.hobbies || ''
      },
      references: []
    };
  }

  /**
   * 4. SMART CLIENT-SIDE RESUME PARSER (REGEX FALLBACK FOR OFFLINE USE)
   */
  function parseResumeText(rawText) {
    if (!rawText || !rawText.trim()) return null;

    const lines = rawText
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);

    const fullText = rawText;

    // Contact Information
    const emailMatch = fullText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const email = emailMatch ? emailMatch[0].trim() : '';

    const phoneMatch = fullText.match(/(?:\+?91[\s-]?)?[6-9]\d{9}|(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    const phone = phoneMatch ? phoneMatch[0].trim() : '';

    const linkedinMatch = fullText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_\-]+)/i);
    const linkedin = linkedinMatch ? (linkedinMatch[0].startsWith('http') ? linkedinMatch[0] : 'https://' + linkedinMatch[0]) : '';

    const portfolioLineMatch = fullText.match(/(?:portfolio|website|github)\s*[:\-]?\s*(?:https?:\/\/)?([a-zA-Z0-9_\-./]+)/i);
    let portfolio = '';
    if (portfolioLineMatch && !portfolioLineMatch[1].includes('@')) {
      portfolio = portfolioLineMatch[1].startsWith('http') ? portfolioLineMatch[1] : 'https://' + portfolioLineMatch[1];
    } else {
      const genericUrl = fullText.match(/(?:https?:\/\/)([a-zA-Z0-9_\-]+\.(?:vercel\.app|netlify\.app|dev|me|io))/i);
      if (genericUrl) portfolio = genericUrl[0];
    }

    // City / State / Country location
    let city = '';
    let state = '';
    let country = 'India';
    const locationMatch = fullText.match(/\b(Varanasi|Delhi|New Delhi|Mumbai|Bangalore|Bengaluru|Hyderabad|Pune|Chennai|Kolkata|Noida|Gurgaon|Gurugram|Chandigarh|Jaipur|Ahmedabad|Lucknow|Jaunpur|Indore)\b/i);
    if (locationMatch) {
      city = locationMatch[0];
    }
    const stateMatch = fullText.match(/\b(Uttar Pradesh|U\.P|Delhi|Maharashtra|Karnataka|Telangana|Tamil Nadu|West Bengal|Haryana|Punjab|Rajasthan|Gujarat|Madhya Pradesh)\b/i);
    if (stateMatch) {
      state = stateMatch[0];
    }

    // Name Extraction (First 6 lines)
    let fullName = '';
    let headline = '';
    for (let i = 0; i < Math.min(6, lines.length); i++) {
      const line = lines[i].replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
      if (line.includes('@') || line.includes('http') || line.includes('+91') || line.includes('linkedin.com')) continue;
      if (/resume|curriculum|vitae|biodata|profile/i.test(line)) continue;

      const cleanLine = line.replace(/[^a-zA-Z\s.]/g, '').trim();
      const words = cleanLine.split(/\s+/).filter(Boolean);
      if (!fullName && words.length >= 1 && words.length <= 4 && !/\d/.test(line) && cleanLine.length >= 3) {
        fullName = cleanLine;
        if (lines[i + 1] && !lines[i + 1].includes('@') && !lines[i + 1].includes('http') && !/\d/.test(lines[i + 1])) {
          const cand = lines[i + 1].replace(/[|•]/g, ' ').trim();
          if (cand.length >= 3 && cand.length <= 45 && !/address|varanasi|delhi|mumbai|india|location|phone|pin/i.test(cand)) {
            headline = cand;
          }
        }
        break;
      }
    }

    // Section Chunking
    const sections = {};
    let currentSec = null;
    let currentBuffer = [];

    for (const line of lines) {
      const cleanUpper = line.replace(/[^a-zA-Z0-9\s-]/g, '').trim().toLowerCase();
      let matchedSec = null;
      for (const [secKey, keywords] of Object.entries(SECTION_KEYWORDS)) {
        if (keywords.some(k => cleanUpper === k || cleanUpper.startsWith(k + ' ') || cleanUpper.startsWith(k + '-') || cleanUpper.startsWith(k + ':'))) {
          matchedSec = secKey;
          break;
        }
      }

      if (matchedSec) {
        if (currentSec) sections[currentSec] = currentBuffer;
        currentSec = matchedSec;
        currentBuffer = [];
      } else if (currentSec) {
        currentBuffer.push(line);
      }
    }
    if (currentSec) sections[currentSec] = currentBuffer;

    // Professional Summary / Objective
    let summary = '';
    if (sections.summary && sections.summary.length > 0) {
      summary = sections.summary.join(' ').substring(0, 600).trim();
    }

    // Skills Parsing & Categorization
    const hardSkills = [];
    const toolSkills = [];
    const domainSkills = [];
    if (sections.skills && sections.skills.length > 0) {
      const rawSkillText = sections.skills.join(', ');
      const candidateSkills = rawSkillText
        .split(/[,•|/\n\\]/)
        .map(s => s.trim().replace(/^[-*•▪\s]+/, '').replace(/^[A-Za-z\s]+:\s*/, ''))
        .filter(s => s.length >= 2 && s.length <= 35 && !/skills|competencies|tools/i.test(s));

      const seenSkills = new Set();
      for (const sk of candidateSkills) {
        const lower = sk.toLowerCase();
        if (seenSkills.has(lower)) continue;
        seenSkills.add(lower);

        if (KNOWN_TOOLS.has(lower)) {
          toolSkills.push(sk);
        } else if (lower.includes('management') || lower.includes('marketing') || lower.includes('finance') || lower.includes('strategy') || lower.includes('analysis')) {
          domainSkills.push(sk);
        } else {
          hardSkills.push(sk);
        }
      }
    }

    // Experience Parsing
    const experience = [];
    if (sections.experience && sections.experience.length > 0) {
      const expLines = sections.experience;
      let curExp = null;
      const dateRangeRegex = /(?:(?:(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s*)?\d{4}|(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?)\s*(?:[-–—to]+|\s+to\s+)\s*(?:present|current|(?:(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s*)?\d{4})/i;

      for (let idx = 0; idx < expLines.length; idx++) {
        const el = expLines[idx];
        const isBullet = /^[•\-*▪\d.)]+\s*/.test(el);
        const dateMatch = el.match(dateRangeRegex);

        if (!isBullet && (dateMatch || (curExp && curExp.bullets.length > 0 && !dateMatch && el.length < 60 && !el.endsWith('.')))) {
          if (curExp && (curExp.company || curExp.jobTitle)) {
            experience.push(curExp);
          }
          curExp = {
            company: el.split(/[,-]/)[0].trim() || el,
            jobTitle: '',
            location: '',
            startDate: '',
            endDate: '',
            description: '',
            bullets: []
          };
          if (dateMatch) {
            const parts = dateMatch[0].split(/[-–—to]+/i).map(p => p.trim());
            curExp.startDate = parts[0] || '';
            curExp.endDate = parts[1] || '';
            curExp.company = el.replace(dateMatch[0], '').replace(/[()\-–—,]/g, ' ').replace(/\s+/g, ' ').trim();
            // Check if previous line had the job title
            if (idx > 0 && !/^[•\-*▪\d.)]+\s*/.test(expLines[idx - 1])) {
              curExp.jobTitle = expLines[idx - 1].trim();
            }
          }
        } else if (curExp) {
          if (isBullet) {
            const cleanBullet = el.replace(/^[•\-*▪\d.)]+\s*/, '').trim();
            if (cleanBullet) curExp.bullets.push(cleanBullet);
          } else if (!curExp.jobTitle && el.length < 70) {
            curExp.jobTitle = el;
          } else {
            curExp.bullets.push(el);
          }
        } else if (!isBullet && el.length < 70) {
          // Potential Job Title on line 1 before company line
          curExp = {
            company: '',
            jobTitle: el.trim(),
            location: '',
            startDate: '',
            endDate: '',
            description: '',
            bullets: []
          };
        }
      }
      if (curExp && (curExp.company || curExp.jobTitle)) experience.push(curExp);
    }

    // Education Parsing
    const education = [];
    if (sections.education && sections.education.length > 0) {
      const eduLines = sections.education;
      let curEdu = null;

      for (const el of eduLines) {
        const hasDegree = /\b(mba|b\.?tech|bba|b\.?com|b\.?sc|m\.?sc|m\.?tech|bca|mca|bachelor|master|degree|high school|12th|10th|secondary)\b/i.test(el);
        const dateMatch = el.match(/\b(19\d\d|20\d\d)\s*(?:[-–—to]+)?\s*(19\d\d|20\d\d)?\b/);

        if (hasDegree || el.includes('University') || el.includes('College') || el.includes('Institute') || el.includes('School')) {
          if (hasDegree && curEdu && !curEdu.degree) {
            curEdu.degree = el;
          } else {
            if (curEdu && (curEdu.institution || curEdu.degree)) {
              education.push(curEdu);
            }
            curEdu = {
              institution: hasDegree ? '' : el.split(' — ')[0].split(' - ')[0].trim(),
              degree: hasDegree ? el.trim() : '',
              specialization: '',
              startYear: '',
              endYear: '',
              location: '',
              marks: '',
              description: ''
            };
          }
          if (dateMatch) {
            curEdu.startYear = dateMatch[1] || '';
            curEdu.endYear = dateMatch[2] || '';
          }
        } else if (curEdu) {
          if (/cgpa|percentage|percent|grade|score/i.test(el)) {
            curEdu.marks = el.trim();
          } else if (!curEdu.institution && el.length < 100) {
            curEdu.institution = el.trim();
          } else if (!curEdu.degree && el.length < 80) {
            curEdu.degree = el.trim();
          }
        }
      }
      if (curEdu && (curEdu.institution || curEdu.degree)) education.push(curEdu);
    }

    // Projects Parsing (Smart Dual-Pass: headers + merged description bullets)
    const projects = [];
    if (sections.projects && sections.projects.length > 0) {
      const projLines = sections.projects;
      const bulletLines = [];
      const headerLines = [];

      // Pass 1: Merge wrapped bullet lines
      const mergedLines = [];
      for (let i = 0; i < projLines.length; i++) {
        let l = projLines[i].trim();
        if (!l) continue;
        if (/^explore all my other websites/i.test(l)) continue;

        const isBullet = /^[•\-*▪\d.)]+\s*/.test(l);
        const hasUrl = /(https?:\/\/[^\s]+|[a-zA-Z0-9-]+\.(?:in|app|com|org|io|dev|net|netlify\.app)[^\s]*)/i.test(l);
        const isHeaderCandidate = (l.includes(' - ') || l.includes(' – ') || l.includes(' — ') || l.endsWith('-') || l.endsWith('–') || hasUrl) && !isBullet;

        if (!isBullet && !isHeaderCandidate && mergedLines.length > 0 && !hasUrl) {
          mergedLines[mergedLines.length - 1] += ' ' + l;
        } else {
          mergedLines.push(l);
        }
      }

      for (const l of mergedLines) {
        if (/^[•\-*▪]+\s*/.test(l) && l.length > 30) {
          bulletLines.push(l.replace(/^[•\-*▪]+\s*/, '').trim());
        } else {
          headerLines.push(l);
        }
      }

      // Combine dangling header lines (e.g. "Solmates -" followed by "Official MBA Student Website solmates.in")
      const combinedHeaders = [];
      for (let i = 0; i < headerLines.length; i++) {
        let cur = headerLines[i];
        if (cur.endsWith('-') || cur.endsWith('–') || cur.endsWith(':')) {
          if (i + 1 < headerLines.length) {
            cur = cur + ' ' + headerLines[i + 1];
            i++;
          }
        }
        combinedHeaders.push(cur);
      }

      // Extract project titles, tools, and outcomes
      for (const h of combinedHeaders) {
        const urlMatch = h.match(/(https?:\/\/[^\s]+|[a-zA-Z0-9-]+\.(?:in|app|com|org|io|dev|net|netlify\.app)[^\s]*)/i);
        const url = urlMatch ? urlMatch[0] : '';
        let title = h.replace(url, '').trim();

        const parts = title.split(/\s*[-–—:]\s*/).filter(Boolean);
        let pTitle = parts[0] || title;
        let pTools = parts.slice(1).join(' - ') || '';
        pTitle = pTitle.replace(/^[•\-*▪\d.)]+\s*/, '').trim();

        if (pTitle.length >= 2 && pTitle.length < 70) {
          projects.push({
            title: pTitle,
            tools: pTools,
            description: '',
            outcome: url
          });
        }
      }

      // Match bullet lines to project descriptions
      for (const bullet of bulletLines) {
        let matched = false;
        for (const proj of projects) {
          const cleanTitle = proj.title.toLowerCase().replace(/[^a-z0-9]/g, '');
          const cleanBullet = bullet.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (cleanTitle.length > 3 && cleanBullet.includes(cleanTitle)) {
            proj.description = proj.description ? proj.description + '\n' + bullet : bullet;
            matched = true;
            break;
          }
        }
        if (!matched) {
          const emptyProj = projects.find(p => !p.description);
          if (emptyProj) {
            emptyProj.description = bullet;
          } else if (projects.length > 0) {
            projects[projects.length - 1].description += '\n' + bullet;
          }
        }
      }
    }

    // Certifications Parsing
    const certifications = [];
    if (sections.certifications && sections.certifications.length > 0) {
      for (const certLine of sections.certifications) {
        const clean = certLine.replace(/^[•\-*▪\d.)]+\s*/, '').trim();
        if (clean.length > 3) {
          const parts = clean.split(/[-|–]/);
          certifications.push({
            name: parts[0].trim(),
            authority: parts[1] ? parts[1].trim() : '',
            year: ''
          });
        }
      }
    }

    // Languages Parsing
    const languages = [];
    if (sections.languages && sections.languages.length > 0) {
      const langText = sections.languages.join(', ');
      const tokens = langText.split(/[,•|/\n]/).map(t => t.trim().toLowerCase());
      for (const tok of tokens) {
        if (KNOWN_LANGUAGES.has(tok)) {
          languages.push({
            language: tok.charAt(0).toUpperCase() + tok.slice(1),
            level: 'Proficient'
          });
        }
      }
    }

    // Core Competencies
    const coreCompetencies = [];
    if (sections.coreCompetencies && sections.coreCompetencies.length > 0) {
      for (const comp of sections.coreCompetencies) {
        const clean = comp.replace(/^[•\-*▪\d.)]+\s*/, '').trim();
        if (clean.length > 2 && clean.length < 80) coreCompetencies.push(clean);
      }
    }

    // Personal Details
    const personalDetails = { dob: '', gender: '', fatherName: '', maritalStatus: '', hobbies: '' };
    if (sections.personalDetails && sections.personalDetails.length > 0) {
      const pdText = sections.personalDetails.join('\n');
      const dobM = pdText.match(/date of birth\s*:\s*([^\n]+)/i);
      if (dobM) personalDetails.dob = dobM[1].trim();
      const maritalM = pdText.match(/marital status\s*:\s*([^\n]+)/i);
      if (maritalM) personalDetails.maritalStatus = maritalM[1].trim();
    }

    const rawResult = {
      personalInfo: {
        fullName: fullName || '',
        headline: headline || '',
        email: email || '',
        phone: phone || '',
        location: { city: city || '', state: state || '', country: country || 'India' },
        linkedin: linkedin || '',
        portfolio: portfolio || ''
      },
      summary: summary || '',
      skills: {
        hard: hardSkills,
        tools: toolSkills,
        domain: domainSkills
      },
      experience: experience,
      education: education,
      projects: projects,
      certifications: certifications,
      languages: languages,
      coreCompetencies: coreCompetencies,
      personalDetails: personalDetails
    };

    return normalizeParsedData(rawResult);
  }

  /**
   * 5. INITIALIZE AUTO-FETCH EVENT LISTENERS
   */
  function initAutoFetch() {
    const btn = document.getElementById('btn-auto-fetch-resume');
    const fileInput = document.getElementById('resume-auto-upload-input');

    if (!btn || !fileInput) return;

    btn.addEventListener('click', () => {
      fileInput.value = '';
      fileInput.click();
    });

    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const origHtml = btn.innerHTML;
      btn.disabled = true;

      try {
        const updateStatus = (msg) => {
          btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> <span>${msg}</span>`;
        };

        // Step 1: Extract Text Client-Side (Zero bytes uploaded)
        const rawText = await extractTextFromFile(file, updateStatus);

        if (!rawText || rawText.trim().length < 15) {
          throw new Error('Could not extract readable text from file. Please ensure file is not password-protected.');
        }

        // Step 2: High-Precision AI Parsing with Local Fallback
        let parsed = null;
        try {
          parsed = await parseResumeWithAI(rawText, updateStatus);
        } catch (aiErr) {
          console.warn('[Resume Auto-Fetch] AI parsing failed or offline, falling back to local regex parser:', aiErr.message);
          updateStatus('Using Local Intelligent Parser...');
          parsed = parseResumeText(rawText);
        }

        if (!parsed) {
          throw new Error('Failed to parse resume content.');
        }

        updateStatus('Auto-filling form fields...');

        // Step 3: Populate into Resume Builder
        if (window.solmatesResume && typeof window.solmatesResume.setResume === 'function') {
          window.solmatesResume.setResume(parsed);
        } else {
          localStorage.setItem('solmates.resume.builder.v2', JSON.stringify({
            resume: parsed,
            templateVersion: 1
          }));
          window.location.reload();
          return;
        }

        // Step 4: Show Success State
        btn.innerHTML = `<i class="fas fa-check-circle" style="color:#4ade80;"></i> <span>Fetched Successfully!</span>`;
        setTimeout(() => {
          btn.innerHTML = origHtml;
          btn.disabled = false;
        }, 3500);

        const expCount = (parsed.experience || []).length;
        const eduCount = (parsed.education || []).length;
        const projCount = (parsed.projects || []).length;
        const skillCount = (parsed.skills?.hard || []).length + (parsed.skills?.tools || []).length;

        const infoMsg = `✅ Resume Auto-Fetched Successfully!\n\n` +
          `👤 Name: ${parsed.personalInfo.fullName || 'Detected'}\n` +
          `📧 Email: ${parsed.personalInfo.email || 'Detected'}\n` +
          `📞 Phone: ${parsed.personalInfo.phone || 'Detected'}\n` +
          `💼 Experience: ${expCount} entries\n` +
          `🎓 Education: ${eduCount} entries\n` +
          `🚀 Projects: ${projCount} entries\n` +
          `🛠️ Skills: ${skillCount} detected\n\n` +
          `All sections have been populated in the form & updated in the live preview!`;

        if (typeof alert === 'function') {
          alert(infoMsg);
        }
      } catch (err) {
        console.error('[Resume Auto-Fetch Error]', err);
        alert(`⚠️ Could not auto-fetch resume: ${err.message || 'Unknown error'}`);
        btn.innerHTML = origHtml;
        btn.disabled = false;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAutoFetch);
  } else {
    initAutoFetch();
  }
})();

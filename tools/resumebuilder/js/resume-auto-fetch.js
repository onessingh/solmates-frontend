/**
 * SOLMATES Resume Auto-Fetch Engine (v1.0)
 * 100% Client-Side Resume Parser (Zero Backend Load)
 * Supports: PDF (Digital & Scanned via Tesseract OCR), DOCX, Images (PNG/JPG), TXT
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
    'linux', 'photoshop', 'illustrator', 'premiere pro', 'after effects', 'blender'
  ]);

  const KNOWN_LANGUAGES = new Set([
    'english', 'hindi', 'spanish', 'french', 'german', 'mandarin', 'chinese', 'japanese',
    'arabic', 'bengali', 'russian', 'portuguese', 'punjabi', 'marathi', 'tamil', 'telugu',
    'urdu', 'gujarati', 'kannada', 'malayalam'
  ]);

  const SECTION_KEYWORDS = {
    summary: ['summary', 'professional summary', 'executive summary', 'profile', 'personal profile', 'about me', 'objective', 'career objective'],
    skills: ['skills', 'core skills', 'technical skills', 'key skills', 'competencies', 'core competencies', 'areas of expertise', 'technologies', 'technical proficiency'],
    experience: ['experience', 'work experience', 'employment history', 'internships', 'professional experience', 'work history', 'career history', 'relevant experience'],
    education: ['education', 'academic background', 'qualifications', 'academic history', 'educational qualifications', 'academics'],
    projects: ['projects', 'academic projects', 'key projects', 'personal projects', 'notable projects'],
    certifications: ['certifications', 'certificates', 'licenses', 'courses', 'certifications & courses', 'professional certifications'],
    languages: ['languages', 'languages known'],
    awards: ['awards', 'achievements', 'honors', 'accomplishments', 'honors & awards']
  };

  /**
   * 1. EXTRACT RAW TEXT FROM VARIOUS FILE TYPES IN BROWSER
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
        if (onProgress) onProgress('Scanned document detected. Running client-side OCR scan...');
        let ocrText = '';
        const maxPages = Math.min(pdf.numPages, 3); // OCR first 3 pages
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
   * 2. SMART CLIENT-SIDE RESUME PARSER (REGEX + HEURISTICS)
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
    const linkedin = linkedinMatch ? linkedinMatch[0].trim() : '';

    const githubMatch = fullText.match(/(?:https?:\/\/)?(?:www\.)?(github\.com\/[a-zA-Z0-9_\-]+|[a-zA-Z0-9_\-]+\.(?:dev|me|io))/i);
    const portfolio = githubMatch ? githubMatch[0].trim() : '';

    // City / State / Country location
    let city = '';
    let state = '';
    let country = 'India';
    const locationMatch = fullText.match(/\b(New Delhi|Delhi|Mumbai|Bangalore|Bengaluru|Hyderabad|Pune|Chennai|Kolkata|Noida|Gurgaon|Gurugram|Chandigarh|Jaipur|Ahmedabad|Lucknow)\b/i);
    if (locationMatch) {
      city = locationMatch[0];
    }

    // Name & Headline Extraction (First 5 lines)
    let fullName = '';
    let headline = '';
    for (let i = 0; i < Math.min(6, lines.length); i++) {
      const line = lines[i];
      if (line.includes('@') || line.includes('http') || line.includes('+91') || line.includes('|') || line.includes('•')) continue;
      if (/resume|curriculum|vitae|biodata|profile/i.test(line)) continue;

      const words = line.split(/\s+/);
      if (!fullName && words.length >= 2 && words.length <= 4 && !/\d/.test(line)) {
        fullName = line.replace(/[^a-zA-Z\s.]/g, '').trim();
        // Check next line for potential Headline / Designation
        if (lines[i + 1] && !lines[i + 1].includes('@') && !lines[i + 1].includes('http') && lines[i + 1].length < 80) {
          headline = lines[i + 1].replace(/[|•]/g, ' ').trim();
        }
        break;
      }
    }

    // Section Chunking
    const sections = {};
    let currentSec = null;
    let currentBuffer = [];

    for (const line of lines) {
      const cleanUpper = line.replace(/[^a-zA-Z\s]/g, '').trim().toLowerCase();
      let matchedSec = null;
      for (const [secKey, keywords] of Object.entries(SECTION_KEYWORDS)) {
        if (keywords.includes(cleanUpper) || keywords.some(k => cleanUpper === k || cleanUpper === k + 's')) {
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
        .map(s => s.trim().replace(/^[-*•\s]+/, ''))
        .filter(s => s.length >= 2 && s.length <= 35);

      const seenSkills = new Set();
      for (const sk of candidateSkills) {
        const lower = sk.toLowerCase();
        if (seenSkills.has(lower)) continue;
        seenSkills.add(lower);

        if (KNOWN_TOOLS.has(lower)) {
          toolSkills.push(sk);
        } else if (lower.includes('management') || lower.includes('marketing') || lower.includes('finance') || lower.includes('strategy')) {
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

      for (const el of expLines) {
        const isBullet = /^[•\-*▪\d.)]+\s*/.test(el);
        const dateMatch = el.match(/(?:(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|\d{1,2}[\/\-]\d{4}|\d{4})\s*(?:[-–—to]+)\s*(?:present|current|\d{1,2}[\/\-]\d{4}|\d{4}))/i);

        if (!isBullet && (dateMatch || (el.includes(' - ') && !curExp) || (curExp && curExp.bullets.length > 0 && !dateMatch && el.length < 60 && !el.endsWith('.')))) {
          if (curExp && (curExp.company || curExp.role)) {
            experience.push(curExp);
          }
          curExp = {
            company: el.split(' - ')[0] || el,
            role: '',
            location: '',
            startDate: '',
            endDate: '',
            current: /present|current/i.test(el),
            bullets: []
          };
          if (dateMatch) {
            const parts = dateMatch[0].split(/[-–—to]+/i).map(p => p.trim());
            curExp.startDate = parts[0] || '';
            curExp.endDate = parts[1] || '';
            curExp.role = el.replace(dateMatch[0], '').replace(/[()\-–—]/g, '').trim();
          }
        } else if (curExp) {
          if (isBullet) {
            const cleanBullet = el.replace(/^[•\-*▪\d.)]+\s*/, '').trim();
            if (cleanBullet) curExp.bullets.push(cleanBullet);
          } else if (!curExp.role && el.length < 70) {
            curExp.role = el;
          } else {
            curExp.bullets.push(el);
          }
        }
      }
      if (curExp && (curExp.company || curExp.role)) experience.push(curExp);
    }

    // Education Parsing
    const education = [];
    if (sections.education && sections.education.length > 0) {
      const eduLines = sections.education;
      let curEdu = null;

      for (const el of eduLines) {
        const hasDegree = /\b(mba|b\.?tech|bba|b\.?com|b\.?sc|m\.?sc|m\.?tech|bca|mca|bachelor|master|degree|high school|12th|10th|cbse)\b/i.test(el);
        const dateMatch = el.match(/\b(19\d\d|20\d\d)\s*(?:[-–—to]+)?\s*(19\d\d|20\d\d)?\b/);

        if (hasDegree || el.includes('University') || el.includes('College') || el.includes('Institute') || el.includes('School')) {
          if (hasDegree && curEdu && !curEdu.degree) {
            curEdu.degree = el;
          } else {
            if (curEdu && (curEdu.institution || curEdu.degree)) {
              education.push(curEdu);
            }
            curEdu = {
              institution: hasDegree ? '' : el.split(' - ')[0].trim(),
              degree: hasDegree ? el.trim() : '',
              field: '',
              startDate: '',
              endDate: '',
              grade: ''
            };
          }
          if (dateMatch) {
            curEdu.startDate = dateMatch[1] || '';
            curEdu.endDate = dateMatch[2] || '';
          }
        } else if (curEdu) {
          if (/cgpa|percentage|percent|grade|score/i.test(el)) {
            curEdu.grade = el.trim();
          } else if (!curEdu.institution && el.length < 100) {
            curEdu.institution = el.trim();
          } else if (!curEdu.degree && el.length < 80) {
            curEdu.degree = el.trim();
          }
        }
      }
      if (curEdu && (curEdu.institution || curEdu.degree)) education.push(curEdu);
    }

    // Projects Parsing
    const projects = [];
    if (sections.projects && sections.projects.length > 0) {
      const projLines = sections.projects;
      let curProj = null;

      for (const pl of projLines) {
        const isBullet = /^[•\-*▪\d.)]+\s*/.test(pl);
        if (!isBullet && pl.length < 80 && (!curProj || curProj.bullets.length > 0)) {
          if (curProj && curProj.title) projects.push(curProj);
          curProj = {
            title: pl.trim(),
            description: '',
            bullets: []
          };
        } else if (curProj) {
          const cleanB = pl.replace(/^[•\-*▪\d.)]+\s*/, '').trim();
          if (cleanB) curProj.bullets.push(cleanB);
        }
      }
      if (curProj && curProj.title) projects.push(curProj);
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
            issuer: parts[1] ? parts[1].trim() : '',
            date: ''
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
            name: tok.charAt(0).toUpperCase() + tok.slice(1),
            proficiency: 'Proficient'
          });
        }
      }
    }

    return {
      personalInfo: {
        fullName: fullName || '',
        headline: headline || '',
        photoDataUrl: '',
        email: email || '',
        phone: phone || '',
        location: { city: city || '', state: state || '', country: country || 'India' },
        linkedin: linkedin || '',
        portfolio: portfolio || ''
      },
      summary: summary || '',
      objective: '',
      highlights: [],
      coreCompetencies: domainSkills.length > 0 ? domainSkills : [],
      skills: {
        hard: hardSkills.length > 0 ? hardSkills : ['Communication', 'Teamwork', 'Problem Solving'],
        tools: toolSkills,
        domain: domainSkills
      },
      experience: experience.length > 0 ? experience : [],
      education: education.length > 0 ? education : [],
      certifications: certifications,
      projects: projects,
      internships: [],
      awards: [],
      languages: languages,
      publications: [],
      volunteer: [],
      leadership: [],
      technicalStack: { languages: [], frameworks: [], tools: toolSkills },
      personalDetails: { dob: '', gender: '', fatherName: '', maritalStatus: '', hobbies: '' },
      references: []
    };
  }

  /**
   * 3. INITIALIZE AUTO-FETCH EVENT LISTENERS
   */
  function initAutoFetch() {
    const btn = document.getElementById('btn-auto-fetch-resume');
    const fileInput = document.getElementById('resume-auto-upload-input');
    const btnLabel = document.getElementById('auto-fetch-btn-label');

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

        updateStatus('Reading file...');

        // Step 1: Extract Text 100% Client-Side
        const rawText = await extractTextFromFile(file, updateStatus);

        if (!rawText || rawText.trim().length < 15) {
          throw new Error('Could not extract readable text from file. Please ensure file is not password-protected.');
        }

        updateStatus('Auto-filling fields...');

        // Step 2: Parse into structured resume fields
        const parsed = parseResumeText(rawText);

        if (!parsed) {
          throw new Error('Failed to parse resume content.');
        }

        // Step 3: Populate into Resume Builder
        if (window.solmatesResume && typeof window.solmatesResume.setResume === 'function') {
          window.solmatesResume.setResume(parsed);
        } else {
          // Fallback direct storage update
          localStorage.setItem('solmates.resume.builder.v2', JSON.stringify({
            resume: parsed,
            templateVersion: 1
          }));
          window.location.reload();
          return;
        }

        // Show Success Toast
        btn.innerHTML = `<i class="fas fa-check-circle" style="color:#4ade80;"></i> <span>Fetched Successfully!</span>`;
        setTimeout(() => {
          btn.innerHTML = origHtml;
          btn.disabled = false;
        }, 3000);

        if (typeof alert === 'function') {
          alert(`✅ Resume Auto-Fetched Successfully!\n\nName: ${parsed.personalInfo.fullName || 'Detected'}\nEmail: ${parsed.personalInfo.email || 'Detected'}\nSkills: ${parsed.skills.hard.length} found\nExperience: ${parsed.experience.length} entries\nEducation: ${parsed.education.length} entries\n\nAll fields have been filled into the form & live preview!`);
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

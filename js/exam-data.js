
const currentYear = new Date().getFullYear();

window.MOCK_EXAM_DATA = {
    // ==========================================
    // GOVERNMENT EXAMS
    // ==========================================
    'upsc-cse': {
        name: 'UPSC CSE',
        category_id: 'government',
        short_description: 'Civil Services Examination for IAS, IPS, IFS.',
        about: "India's premier national civil services examination conducted by UPSC for recruitment to services such as IAS, IPS, IFS and other Central Civil Services.",
        pattern: '<ul><li><b>Preliminary Examination:</b> Paper I (General Studies), Paper II (CSAT)</li><li><b>Main Examination:</b> Paper A & B (Qualifying Languages), Essay, GS I, II, III, IV, Optional Paper I & II.</li><li><b>Personality Test / Interview</b></li></ul>',
        eligibility: '<p>Graduate degree or equivalent, subject to UPSC current notification conditions. Age/category conditions vary by notification.</p>',
        syllabus: '<p><b>GS I:</b> Indian Heritage & Culture, History, Geography, Society<br><b>GS II:</b> Governance, Constitution, Polity, Social Justice, International Relations<br><b>GS III:</b> Technology, Economic Development, Biodiversity, Environment, Security, Disaster Management<br><b>GS IV:</b> Ethics, Integrity and Aptitude</p>',
        dates: '<p>Tentative schedule for ' + currentYear + ' cycle:<br>Notification: Feb ' + currentYear + '<br>Prelims: May ' + currentYear + '<br>Mains: Sept ' + currentYear + '</p>',
        links: '<a href="https://www.upsc.gov.in/" target="_blank">Official UPSC Website</a>',
        subjects: [
          {
            id: 'prelims-general-studies-paper-i',
            name: 'Prelims: General Studies Paper I'
          },
          {
            id: 'prelims-csat-general-studies-paper-ii',
            name: 'Prelims: CSAT / General Studies Paper II'
          },
          {
            id: 'mains-indian-language',
            name: 'Mains: Indian Language'
          },
          {
            id: 'mains-english',
            name: 'Mains: English'
          },
          {
            id: 'mains-essay',
            name: 'Mains: Essay'
          },
          {
            id: 'mains-general-studies-i',
            name: 'Mains: General Studies I'
          },
          {
            id: 'mains-general-studies-ii',
            name: 'Mains: General Studies II'
          },
          {
            id: 'mains-general-studies-iii',
            name: 'Mains: General Studies III'
          },
          {
            id: 'mains-general-studies-iv',
            name: 'Mains: General Studies IV'
          },
          {
            id: 'mains-optional-subject-paper-i',
            name: 'Mains: Optional Subject Paper I'
          },
          {
            id: 'mains-optional-subject-paper-ii',
            name: 'Mains: Optional Subject Paper II'
          },
          {
            id: 'optional-agriculture',
            name: 'Optional: Agriculture'
          },
          {
            id: 'optional-animal-husbandry-veterinary-science',
            name: 'Optional: Animal Husbandry & Veterinary Science'
          },
          {
            id: 'optional-anthropology',
            name: 'Optional: Anthropology'
          },
          {
            id: 'optional-botany',
            name: 'Optional: Botany'
          },
          {
            id: 'optional-chemistry',
            name: 'Optional: Chemistry'
          },
          {
            id: 'optional-civil-engineering',
            name: 'Optional: Civil Engineering'
          },
          {
            id: 'optional-commerce-accountancy',
            name: 'Optional: Commerce & Accountancy'
          },
          {
            id: 'optional-economics',
            name: 'Optional: Economics'
          },
          {
            id: 'optional-electrical-engineering',
            name: 'Optional: Electrical Engineering'
          },
          {
            id: 'optional-geography',
            name: 'Optional: Geography'
          },
          {
            id: 'optional-geology',
            name: 'Optional: Geology'
          },
          {
            id: 'optional-history',
            name: 'Optional: History'
          },
          {
            id: 'optional-law',
            name: 'Optional: Law'
          },
          {
            id: 'optional-management',
            name: 'Optional: Management'
          },
          {
            id: 'optional-mathematics',
            name: 'Optional: Mathematics'
          },
          {
            id: 'optional-mechanical-engineering',
            name: 'Optional: Mechanical Engineering'
          },
          {
            id: 'optional-medical-science',
            name: 'Optional: Medical Science'
          },
          {
            id: 'optional-philosophy',
            name: 'Optional: Philosophy'
          },
          {
            id: 'optional-physics',
            name: 'Optional: Physics'
          },
          {
            id: 'optional-political-science-international-relations',
            name: 'Optional: Political Science & International Relations'
          },
          {
            id: 'optional-psychology',
            name: 'Optional: Psychology'
          },
          {
            id: 'optional-public-administration',
            name: 'Optional: Public Administration'
          },
          {
            id: 'optional-sociology',
            name: 'Optional: Sociology'
          },
          {
            id: 'optional-statistics',
            name: 'Optional: Statistics'
          },
          {
            id: 'optional-zoology',
            name: 'Optional: Zoology'
          },
          {
            id: 'literature-assamese',
            name: 'Literature: Assamese'
          },
          {
            id: 'literature-bengali',
            name: 'Literature: Bengali'
          },
          {
            id: 'literature-bodo',
            name: 'Literature: Bodo'
          },
          {
            id: 'literature-dogri',
            name: 'Literature: Dogri'
          },
          {
            id: 'literature-english',
            name: 'Literature: English'
          },
          {
            id: 'literature-gujarati',
            name: 'Literature: Gujarati'
          },
          {
            id: 'literature-hindi',
            name: 'Literature: Hindi'
          },
          {
            id: 'literature-kannada',
            name: 'Literature: Kannada'
          },
          {
            id: 'literature-kashmiri',
            name: 'Literature: Kashmiri'
          },
          {
            id: 'literature-konkani',
            name: 'Literature: Konkani'
          },
          {
            id: 'literature-maithili',
            name: 'Literature: Maithili'
          },
          {
            id: 'literature-malayalam',
            name: 'Literature: Malayalam'
          },
          {
            id: 'literature-manipuri',
            name: 'Literature: Manipuri'
          },
          {
            id: 'literature-marathi',
            name: 'Literature: Marathi'
          },
          {
            id: 'literature-nepali',
            name: 'Literature: Nepali'
          },
          {
            id: 'literature-odia',
            name: 'Literature: Odia'
          },
          {
            id: 'literature-punjabi',
            name: 'Literature: Punjabi'
          },
          {
            id: 'literature-sanskrit',
            name: 'Literature: Sanskrit'
          },
          {
            id: 'literature-santhali',
            name: 'Literature: Santhali'
          },
          {
            id: 'literature-sindhi',
            name: 'Literature: Sindhi'
          },
          {
            id: 'literature-tamil',
            name: 'Literature: Tamil'
          },
          {
            id: 'literature-telugu',
            name: 'Literature: Telugu'
          },
          {
            id: 'literature-urdu',
            name: 'Literature: Urdu'
          }
        ]
    },
    'uppsc': {
        name: 'UPPSC PCS',
        category_id: 'government',
        short_description: 'Uttar Pradesh Combined State / Upper Subordinate Services Examination.',
        about: 'Uttar Pradesh Combined State / Upper Subordinate Services Examination.',
        pattern: '<ul><li><b>Prelims:</b> General Studies I, General Studies II / CSAT</li><li><b>Mains:</b> General Hindi, Essay, GS I to VI</li><li><b>Interview</b></li></ul>',
        eligibility: '<p>Bachelor degree, with post-specific conditions where applicable.</p>',
        syllabus: '<p>History, Indian & UP Culture, Geography, Indian Polity, Governance, Economy, Science & Technology, Environment, Current Affairs, Uttar Pradesh Specific Knowledge.</p>',
        dates: '<p>UPDATE: null - null',
        links: '<a href="https://uppsc.up.nic.in/" target="_blank">Official UPPSC Website</a>',
        subjects: [
          {
            id: 'prelims-general-studies-i',
            name: 'Prelims: General Studies I'
          },
          {
            id: 'prelims-general-studies-ii-csat',
            name: 'Prelims: General Studies II / CSAT'
          },
          {
            id: 'mains-general-hindi',
            name: 'Mains: General Hindi'
          },
          {
            id: 'mains-essay',
            name: 'Mains: Essay'
          },
          {
            id: 'mains-general-studies-i',
            name: 'Mains: General Studies I'
          },
          {
            id: 'mains-general-studies-ii',
            name: 'Mains: General Studies II'
          },
          {
            id: 'mains-general-studies-iii',
            name: 'Mains: General Studies III'
          },
          {
            id: 'mains-general-studies-iv',
            name: 'Mains: General Studies IV'
          },
          {
            id: 'mains-optional-subject-s',
            name: 'Mains: Optional Subject(s)'
          }
        ]
    },
    'bpsc': {
        name: 'BPSC CCE',
        category_id: 'government',
        short_description: 'Bihar Public Service Commission Combined Competitive Examination.',
        about: 'BPSC Combined Competitive Examination (CCE).',
        pattern: '<ul><li><b>Prelims:</b> General Studies</li><li><b>Mains:</b> General Hindi, GS I, GS II, Optional Subject</li><li><b>Interview</b></li></ul>',
        eligibility: '<p>Bachelor degree.</p>',
        syllabus: '<p>Indian & Bihar History, Geography, Polity, Economy, Science, Mental Ability.</p>',
        dates: '<p>UPDATE: null - null',
        links: '<a href="https://bpsc.bihar.gov.in/" target="_blank">Official BPSC Website</a>',
        subjects: [
          {
            id: 'prelims-general-studies',
            name: 'Prelims: General Studies'
          },
          {
            id: 'mains-general-hindi',
            name: 'Mains: General Hindi'
          },
          {
            id: 'mains-general-studies-i',
            name: 'Mains: General Studies I'
          },
          {
            id: 'mains-general-studies-ii',
            name: 'Mains: General Studies II'
          },
          {
            id: 'mains-optional-subject',
            name: 'Mains: Optional Subject'
          },
          {
            id: 'optional-agriculture',
            name: 'Optional: Agriculture'
          },
          {
            id: 'optional-animal-husbandry-veterinary-science',
            name: 'Optional: Animal Husbandry & Veterinary Science'
          },
          {
            id: 'optional-anthropology',
            name: 'Optional: Anthropology'
          },
          {
            id: 'optional-botany',
            name: 'Optional: Botany'
          },
          {
            id: 'optional-chemistry',
            name: 'Optional: Chemistry'
          },
          {
            id: 'optional-civil-engineering',
            name: 'Optional: Civil Engineering'
          },
          {
            id: 'optional-commerce-accountancy',
            name: 'Optional: Commerce & Accountancy'
          },
          {
            id: 'optional-economics',
            name: 'Optional: Economics'
          },
          {
            id: 'optional-electrical-engineering',
            name: 'Optional: Electrical Engineering'
          },
          {
            id: 'optional-geography',
            name: 'Optional: Geography'
          },
          {
            id: 'optional-geology',
            name: 'Optional: Geology'
          },
          {
            id: 'optional-history',
            name: 'Optional: History'
          },
          {
            id: 'optional-labour-social-welfare',
            name: 'Optional: Labour & Social Welfare'
          },
          {
            id: 'optional-law',
            name: 'Optional: Law'
          },
          {
            id: 'optional-management',
            name: 'Optional: Management'
          },
          {
            id: 'optional-mathematics',
            name: 'Optional: Mathematics'
          },
          {
            id: 'optional-mechanical-engineering',
            name: 'Optional: Mechanical Engineering'
          },
          {
            id: 'optional-philosophy',
            name: 'Optional: Philosophy'
          },
          {
            id: 'optional-physics',
            name: 'Optional: Physics'
          },
          {
            id: 'optional-political-science-international-relations',
            name: 'Optional: Political Science & International Relations'
          },
          {
            id: 'optional-psychology',
            name: 'Optional: Psychology'
          },
          {
            id: 'optional-public-administration',
            name: 'Optional: Public Administration'
          },
          {
            id: 'optional-sociology',
            name: 'Optional: Sociology'
          },
          {
            id: 'optional-statistics',
            name: 'Optional: Statistics'
          },
          {
            id: 'optional-zoology',
            name: 'Optional: Zoology'
          }
        ]
    },

    // ==========================================
    // SSC EXAMS
    // ==========================================
    'ssc-cgl': {
        name: 'SSC CGL',
        category_id: 'ssc',
        short_description: 'Staff Selection Commission Combined Graduate Level Examination.',
        about: 'SSC CGL is for recruitment to various subordinate services like Assistant Audit Officer, Inspector, etc.',
        pattern: '<ul><li><b>Tier I:</b> GI & Reasoning, GA, Quant, English</li><li><b>Tier II:</b> Paper I (Compulsory), Paper II (Statistics), Paper III (Finance)</li></ul>',
        eligibility: '<p>Graduation degree.</p>',
        syllabus: '<p>Mathematical Abilities, Reasoning, English, General Awareness, Computer Knowledge, Data Entry Speed Test.</p>',
        dates: '<p>UPDATE: Notification Release - 2026',
        links: '<a href="https://ssc.gov.in/" target="_blank">Official SSC Website</a>',
        subjects: [
          {
            id: 'tier-i-general-intelligence-reasoning',
            name: 'Tier I: General Intelligence & Reasoning'
          },
          {
            id: 'tier-i-general-awareness',
            name: 'Tier I: General Awareness'
          },
          {
            id: 'tier-i-quantitative-aptitude',
            name: 'Tier I: Quantitative Aptitude'
          },
          {
            id: 'tier-i-english-comprehension',
            name: 'Tier I: English Comprehension'
          },
          {
            id: 'tier-ii-mathematical-abilities',
            name: 'Tier II: Mathematical Abilities'
          },
          {
            id: 'tier-ii-reasoning-general-intelligence',
            name: 'Tier II: Reasoning & General Intelligence'
          },
          {
            id: 'tier-ii-english-language-comprehension',
            name: 'Tier II: English Language & Comprehension'
          },
          {
            id: 'tier-ii-general-awareness',
            name: 'Tier II: General Awareness'
          },
          {
            id: 'tier-ii-computer-knowledge',
            name: 'Tier II: Computer Knowledge'
          },
          {
            id: 'tier-ii-data-entry-speed-test',
            name: 'Tier II: Data Entry Speed Test'
          },
          {
            id: 'additional-statistics',
            name: 'Additional: Statistics'
          },
          {
            id: 'additional-general-studies-finance-economics',
            name: 'Additional: General Studies — Finance & Economics'
          }
        ]
    },
    'ssc-chsl': {
        name: 'SSC CHSL',
        category_id: 'ssc',
        short_description: 'Combined Higher Secondary Level (10+2) Examination.',
        about: 'SSC CHSL is for recruitment to posts like LDC, JSA, PA/SA, and DEO.',
        pattern: '<ul><li><b>Tier I:</b> Objective (English, Reasoning, Quant, GA)</li><li><b>Tier II:</b> Objective + Skill/Typing Test</li></ul>',
        eligibility: '<p>10+2 / Higher Secondary.</p>',
        syllabus: '<p>English Language, General Intelligence, Quantitative Aptitude, General Awareness, Computer Knowledge.</p>',
        dates: '<p>UPDATE: Possible Delay - null',
        links: '<a href="https://ssc.gov.in/" target="_blank">Official SSC Website</a>',
        subjects: [
          {
            id: 'tier-i-english-language',
            name: 'Tier I: English Language'
          },
          {
            id: 'tier-i-general-intelligence',
            name: 'Tier I: General Intelligence'
          },
          {
            id: 'tier-i-quantitative-aptitude',
            name: 'Tier I: Quantitative Aptitude'
          },
          {
            id: 'tier-i-general-awareness',
            name: 'Tier I: General Awareness'
          },
          {
            id: 'tier-ii-mathematical-abilities',
            name: 'Tier II: Mathematical Abilities'
          },
          {
            id: 'tier-ii-reasoning-general-intelligence',
            name: 'Tier II: Reasoning & General Intelligence'
          },
          {
            id: 'tier-ii-english-language-comprehension',
            name: 'Tier II: English Language & Comprehension'
          },
          {
            id: 'tier-ii-general-awareness',
            name: 'Tier II: General Awareness'
          },
          {
            id: 'tier-ii-computer-knowledge',
            name: 'Tier II: Computer Knowledge'
          },
          {
            id: 'tier-ii-skill-test-typing-test',
            name: 'Tier II: Skill Test / Typing Test'
          }
        ]
    },
    'ssc-mts': {
        name: 'SSC MTS',
        category_id: 'ssc',
        short_description: 'Multi Tasking (Non-Technical) Staff Examination.',
        about: 'SSC MTS for recruitment to General Central Service Group C Non-Gazetted, Non-Ministerial posts.',
        pattern: '<ul><li><b>Session I:</b> Numerical & Mathematical Ability, Reasoning</li><li><b>Session II:</b> General Awareness, English Language</li></ul>',
        eligibility: '<p>Matriculation (10th pass).</p>',
        syllabus: '<p>Numerical & Mathematical Ability, Reasoning Ability & Problem Solving, General Awareness, English Language & Comprehension.</p>',
        dates: '<p>UPDATE: Notification Release - null',
        links: '<a href="https://ssc.gov.in/" target="_blank">Official SSC Website</a>',
        subjects: [
          {
            id: 'session-i-numerical-mathematical-ability',
            name: 'Session I: Numerical & Mathematical Ability'
          },
          {
            id: 'session-i-reasoning-ability-problem-solving',
            name: 'Session I: Reasoning Ability & Problem Solving'
          },
          {
            id: 'session-ii-general-awareness',
            name: 'Session II: General Awareness'
          },
          {
            id: 'session-ii-english-language-comprehension',
            name: 'Session II: English Language & Comprehension'
          }
        ]
    },

    // ==========================================
    // BANKING EXAMS
    // ==========================================
    'ibps-po': {
        name: 'IBPS PO',
        category_id: 'banking',
        short_description: 'IBPS Probationary Officer / Management Trainee.',
        about: 'Recruitment of Probationary Officers in participating public sector banks.',
        pattern: '<ul><li><b>Prelims:</b> English, Quant, Reasoning</li><li><b>Mains:</b> Reasoning & Computer, English, Data Analysis, General/Economy Awareness + Descriptive</li><li><b>Interview</b></li></ul>',
        eligibility: '<p>Graduation.</p>',
        syllabus: '<p>Standard banking syllabus including Data Analysis, Reasoning, English, and current Banking Awareness.</p>',
        dates: '<p>UPDATE: Application Start - null',
        links: '<a href="https://www.ibps.in/" target="_blank">Official IBPS Website</a>',
        subjects: [
          {
            id: 'prelims-english-language',
            name: 'Prelims: English Language'
          },
          {
            id: 'prelims-quantitative-aptitude',
            name: 'Prelims: Quantitative Aptitude'
          },
          {
            id: 'prelims-reasoning-ability',
            name: 'Prelims: Reasoning Ability'
          },
          {
            id: 'mains-reasoning-computer-aptitude',
            name: 'Mains: Reasoning & Computer Aptitude'
          },
          {
            id: 'mains-english-language',
            name: 'Mains: English Language'
          },
          {
            id: 'mains-data-analysis-interpretation',
            name: 'Mains: Data Analysis & Interpretation'
          },
          {
            id: 'mains-general-economy-banking-awareness',
            name: 'Mains: General Economy / Banking Awareness'
          },
          {
            id: 'descriptive-english-language-essay-letter',
            name: 'Descriptive: English Language — Essay / Letter'
          }
        ]
    },
    'sbi-po': {
        name: 'SBI PO',
        category_id: 'banking',
        short_description: 'State Bank of India Probationary Officer.',
        about: 'Recruitment for Probationary Officers in SBI.',
        pattern: '<ul><li><b>Prelims:</b> English, Quant, Reasoning</li><li><b>Mains:</b> Reasoning & Computer, Data Analysis, GA, English + Descriptive</li><li><b>Group Exercise / Interview</b></li></ul>',
        eligibility: '<p>Graduation.</p>',
        syllabus: '<p>Banking awareness, high-level reasoning, data interpretation, English comprehension.</p>',
        dates: '<p>UPDATE: Exam Schedule - Not specified',
        links: '<a href="https://sbi.co.in/web/careers" target="_blank">Official SBI Careers</a>',
        subjects: [
          {
            id: 'prelims-english-language',
            name: 'Prelims: English Language'
          },
          {
            id: 'prelims-quantitative-aptitude',
            name: 'Prelims: Quantitative Aptitude'
          },
          {
            id: 'prelims-reasoning-ability',
            name: 'Prelims: Reasoning Ability'
          },
          {
            id: 'mains-reasoning-computer-aptitude',
            name: 'Mains: Reasoning & Computer Aptitude'
          },
          {
            id: 'mains-data-analysis-interpretation',
            name: 'Mains: Data Analysis & Interpretation'
          },
          {
            id: 'mains-general-economy-banking-awareness',
            name: 'Mains: General / Economy / Banking Awareness'
          },
          {
            id: 'mains-english-language',
            name: 'Mains: English Language'
          },
          {
            id: 'descriptive-english-language',
            name: 'Descriptive: English Language'
          }
        ]
    },
    'rbi-grade-b': {
        name: 'RBI Grade B',
        category_id: 'banking',
        short_description: 'Reserve Bank of India Grade B Officer.',
        about: 'Recruitment of Officers in Grade B (General, DEPR, DSIM) in RBI.',
        pattern: '<ul><li><b>Phase I:</b> General Awareness, English, Quant, Reasoning</li><li><b>Phase II:</b> ESI, English Writing, Finance & Management</li><li><b>Interview</b></li></ul>',
        eligibility: '<p>Graduation with minimum 60% marks.</p>',
        syllabus: '<p>Economic & Social Issues (ESI), Finance & Management (F&M), English Writing Skills.</p>',
        dates: '<p>UPDATE: Result Out - Not specified',
        links: '<a href="https://opportunities.rbi.org.in/" target="_blank">Official RBI Website</a>',
        subjects: [
          {
            id: 'phase-i-general-awareness',
            name: 'Phase I: General Awareness'
          },
          {
            id: 'phase-i-english-language',
            name: 'Phase I: English Language'
          },
          {
            id: 'phase-i-quantitative-aptitude',
            name: 'Phase I: Quantitative Aptitude'
          },
          {
            id: 'phase-i-reasoning',
            name: 'Phase I: Reasoning'
          },
          {
            id: 'phase-ii-economic-social-issues',
            name: 'Phase II: Economic & Social Issues'
          },
          {
            id: 'phase-ii-english-writing-skills',
            name: 'Phase II: English — Writing Skills'
          },
          {
            id: 'phase-ii-finance-management',
            name: 'Phase II: Finance & Management'
          },
          {
            id: 'specialist-economics-depr',
            name: 'Specialist: Economics — DEPR'
          },
          {
            id: 'specialist-statistics-data-science-dsim',
            name: 'Specialist: Statistics / Data Science — DSIM'
          }
        ]
    },

    // ==========================================
    // MEDICAL EXAMS
    // ==========================================
    'neet-ug': {
        name: 'NEET UG',
        category_id: 'medical',
        short_description: 'National Eligibility cum Entrance Test for UG Medical.',
        about: 'Single entrance examination for MBBS/BDS courses across India.',
        pattern: '<ul><li><b>Exam:</b> Physics, Chemistry, Biology (Botany & Zoology)</li></ul>',
        eligibility: '<p>10+2/equivalent with required subjects.</p>',
        syllabus: '<p>Physics, Chemistry, Botany, Zoology (Class 11 & 12 NCERT).</p>',
        dates: '<p>UPDATE: Application - 2026',
        links: '<a href="https://neet.nta.nic.in/" target="_blank">Official NEET NTA Website</a>',
        subjects: [
          {
            id: 'physics',
            name: 'Physics'
          },
          {
            id: 'chemistry',
            name: 'Chemistry'
          },
          {
            id: 'biology',
            name: 'Biology'
          },
          {
            id: 'biology-botany',
            name: 'Biology: Botany'
          },
          {
            id: 'biology-zoology',
            name: 'Biology: Zoology'
          }
        ]
    },

    // ==========================================
    // ENGINEERING EXAMS
    // ==========================================
    'jee-main': {
        name: 'JEE MAIN',
        category_id: 'engineering',
        short_description: 'Joint Entrance Examination Main.',
        about: 'For admission to B.E./B.Tech, B.Arch, and B.Planning programs at NITs, IIITs, CFTIs.',
        pattern: '<ul><li><b>Paper 1:</b> Physics, Chemistry, Mathematics (B.E./B.Tech)</li><li><b>Paper 2A/2B:</b> Mathematics, Aptitude, Drawing/Planning</li></ul>',
        eligibility: '<p>10+2 with PCM.</p>',
        syllabus: '<p>Physics, Chemistry, Mathematics.</p>',
        dates: '<p>UPDATE: Session 2 - 2026',
        links: '<a href="https://jeemain.nta.nic.in/" target="_blank">Official JEE Main Website</a>',
        subjects: [
          {
            id: 'paper-1-b-tech-physics',
            name: 'Paper 1 (B.Tech): Physics'
          },
          {
            id: 'paper-1-b-tech-chemistry',
            name: 'Paper 1 (B.Tech): Chemistry'
          },
          {
            id: 'paper-1-b-tech-mathematics',
            name: 'Paper 1 (B.Tech): Mathematics'
          },
          {
            id: 'paper-2a-b-arch-mathematics',
            name: 'Paper 2A (B.Arch): Mathematics'
          },
          {
            id: 'paper-2a-b-arch-aptitude-test',
            name: 'Paper 2A (B.Arch): Aptitude Test'
          },
          {
            id: 'paper-2a-b-arch-drawing-test',
            name: 'Paper 2A (B.Arch): Drawing Test'
          },
          {
            id: 'paper-2b-b-planning-mathematics',
            name: 'Paper 2B (B.Planning): Mathematics'
          },
          {
            id: 'paper-2b-b-planning-aptitude-test',
            name: 'Paper 2B (B.Planning): Aptitude Test'
          },
          {
            id: 'paper-2b-b-planning-planning',
            name: 'Paper 2B (B.Planning): Planning'
          }
        ]
    },
    'gate': {
        name: 'GATE',
        category_id: 'engineering',
        short_description: 'Graduate Aptitude Test in Engineering.',
        about: 'National level exam for PG engineering admissions and PSU recruitment.',
        pattern: '<ul><li><b>General Aptitude</b> (Compulsory)</li><li><b>Subject Paper</b> (Out of 30 disciplines)</li></ul>',
        eligibility: '<p>Graduation in Engineering/Technology/Science/Arts/Commerce.</p>',
        syllabus: '<p>Based on the chosen engineering/science discipline.</p>',
        dates: '<p>UPDATE: Application - null',
        links: '<a href="https://gate2026.iitg.ac.in/" target="_blank">Official GATE Website</a>',
        subjects: [
          {
            id: 'common-general-aptitude',
            name: 'Common: General Aptitude'
          },
          {
            id: 'paper-aerospace-engineering',
            name: 'Paper: Aerospace Engineering'
          },
          {
            id: 'paper-agricultural-engineering',
            name: 'Paper: Agricultural Engineering'
          },
          {
            id: 'paper-architecture-planning',
            name: 'Paper: Architecture & Planning'
          },
          {
            id: 'paper-biomedical-engineering',
            name: 'Paper: Biomedical Engineering'
          },
          {
            id: 'paper-biotechnology',
            name: 'Paper: Biotechnology'
          },
          {
            id: 'paper-civil-engineering',
            name: 'Paper: Civil Engineering'
          },
          {
            id: 'paper-chemical-engineering',
            name: 'Paper: Chemical Engineering'
          },
          {
            id: 'paper-computer-science-information-technology',
            name: 'Paper: Computer Science & Information Technology'
          },
          {
            id: 'paper-chemistry',
            name: 'Paper: Chemistry'
          },
          {
            id: 'paper-data-science-artificial-intelligence',
            name: 'Paper: Data Science & Artificial Intelligence'
          },
          {
            id: 'paper-electronics-communication-engineering',
            name: 'Paper: Electronics & Communication Engineering'
          },
          {
            id: 'paper-electrical-engineering',
            name: 'Paper: Electrical Engineering'
          },
          {
            id: 'paper-environmental-science-engineering',
            name: 'Paper: Environmental Science & Engineering'
          },
          {
            id: 'paper-ecology-evolution',
            name: 'Paper: Ecology & Evolution'
          },
          {
            id: 'paper-geomatics-engineering',
            name: 'Paper: Geomatics Engineering'
          },
          {
            id: 'paper-geology-geophysics',
            name: 'Paper: Geology & Geophysics'
          },
          {
            id: 'paper-instrumentation-engineering',
            name: 'Paper: Instrumentation Engineering'
          },
          {
            id: 'paper-mathematics',
            name: 'Paper: Mathematics'
          },
          {
            id: 'paper-mechanical-engineering',
            name: 'Paper: Mechanical Engineering'
          },
          {
            id: 'paper-mining-engineering',
            name: 'Paper: Mining Engineering'
          },
          {
            id: 'paper-naval-architecture-marine-engineering',
            name: 'Paper: Naval Architecture & Marine Engineering'
          },
          {
            id: 'paper-petroleum-engineering',
            name: 'Paper: Petroleum Engineering'
          },
          {
            id: 'paper-physics',
            name: 'Paper: Physics'
          },
          {
            id: 'paper-production-industrial-engineering',
            name: 'Paper: Production & Industrial Engineering'
          },
          {
            id: 'paper-metallurgical-engineering',
            name: 'Paper: Metallurgical Engineering'
          },
          {
            id: 'paper-statistics',
            name: 'Paper: Statistics'
          },
          {
            id: 'paper-textile-engineering-fibre-science',
            name: 'Paper: Textile Engineering & Fibre Science'
          },
          {
            id: 'paper-engineering-sciences',
            name: 'Paper: Engineering Sciences'
          },
          {
            id: 'paper-humanities-social-sciences',
            name: 'Paper: Humanities & Social Sciences'
          },
          {
            id: 'paper-life-sciences',
            name: 'Paper: Life Sciences'
          }
        ]
    },

    // ==========================================
    // TEACHING EXAMS
    // ==========================================
    'ugc-net': {
        name: 'UGC NET',
        category_id: 'teaching',
        short_description: 'NTA UGC NET for Assistant Professor and JRF.',
        about: 'National Eligibility Test conducted by NTA to determine eligibility for Assistant Professor and Junior Research Fellowship in Indian Universities.',
        pattern: '<ul><li><b>Paper 1:</b> General Aptitude (50 Questions)</li><li><b>Paper 2:</b> Subject-specific (100 Questions)</li></ul>',
        eligibility: '<p>Master Degree with at least 55% marks.</p>',
        syllabus: '<p>Paper 1 covers Teaching Aptitude, Research Aptitude, Comprehension, Communication, Mathematical Reasoning, Logical Reasoning, DI, ICT, Environment, Higher Education System. Paper 2 covers specific subjects.</p>',
        dates: '<p>Tentative schedule for ' + currentYear + ' cycle (June and December sessions).</p>',
        links: '<a href="https://ugcnet.nta.nic.in/" target="_blank">Official UGC NET Website</a>',
        subjects: [
          {
            id: 'paper-1-teaching-aptitude',
            name: 'Paper 1: Teaching Aptitude'
          },
          {
            id: 'paper-1-research-aptitude',
            name: 'Paper 1: Research Aptitude'
          },
          {
            id: 'paper-1-comprehension',
            name: 'Paper 1: Comprehension'
          },
          {
            id: 'paper-1-communication',
            name: 'Paper 1: Communication'
          },
          {
            id: 'paper-1-mathematical-reasoning-aptitude',
            name: 'Paper 1: Mathematical Reasoning & Aptitude'
          },
          {
            id: 'paper-1-logical-reasoning',
            name: 'Paper 1: Logical Reasoning'
          },
          {
            id: 'paper-1-data-interpretation',
            name: 'Paper 1: Data Interpretation'
          },
          {
            id: 'paper-1-information-communication-technology',
            name: 'Paper 1: Information & Communication Technology'
          },
          {
            id: 'paper-1-people-development-environment',
            name: 'Paper 1: People, Development & Environment'
          },
          {
            id: 'paper-1-higher-education-system',
            name: 'Paper 1: Higher Education System'
          },
          {
            id: 'paper-2-economics',
            name: 'Paper 2: Economics'
          },
          {
            id: 'paper-2-political-science',
            name: 'Paper 2: Political Science'
          },
          {
            id: 'paper-2-philosophy',
            name: 'Paper 2: Philosophy'
          },
          {
            id: 'paper-2-psychology',
            name: 'Paper 2: Psychology'
          },
          {
            id: 'paper-2-sociology',
            name: 'Paper 2: Sociology'
          },
          {
            id: 'paper-2-history',
            name: 'Paper 2: History'
          },
          {
            id: 'paper-2-anthropology',
            name: 'Paper 2: Anthropology'
          },
          {
            id: 'paper-2-commerce',
            name: 'Paper 2: Commerce'
          },
          {
            id: 'paper-2-education',
            name: 'Paper 2: Education'
          },
          {
            id: 'paper-2-social-work',
            name: 'Paper 2: Social Work'
          },
          {
            id: 'paper-2-defence-strategic-studies',
            name: 'Paper 2: Defence & Strategic Studies'
          },
          {
            id: 'paper-2-home-science',
            name: 'Paper 2: Home Science'
          },
          {
            id: 'paper-2-public-administration',
            name: 'Paper 2: Public Administration'
          },
          {
            id: 'paper-2-population-studies',
            name: 'Paper 2: Population Studies'
          },
          {
            id: 'paper-2-music',
            name: 'Paper 2: Music'
          },
          {
            id: 'paper-2-management',
            name: 'Paper 2: Management'
          },
          {
            id: 'paper-2-maithili',
            name: 'Paper 2: Maithili'
          },
          {
            id: 'paper-2-bengali',
            name: 'Paper 2: Bengali'
          },
          {
            id: 'paper-2-hindi',
            name: 'Paper 2: Hindi'
          },
          {
            id: 'paper-2-kannada',
            name: 'Paper 2: Kannada'
          },
          {
            id: 'paper-2-malayalam',
            name: 'Paper 2: Malayalam'
          },
          {
            id: 'paper-2-odia',
            name: 'Paper 2: Odia'
          },
          {
            id: 'paper-2-punjabi',
            name: 'Paper 2: Punjabi'
          },
          {
            id: 'paper-2-sanskrit',
            name: 'Paper 2: Sanskrit'
          },
          {
            id: 'paper-2-tamil',
            name: 'Paper 2: Tamil'
          },
          {
            id: 'paper-2-telugu',
            name: 'Paper 2: Telugu'
          },
          {
            id: 'paper-2-urdu',
            name: 'Paper 2: Urdu'
          },
          {
            id: 'paper-2-arabic',
            name: 'Paper 2: Arabic'
          },
          {
            id: 'paper-2-english',
            name: 'Paper 2: English'
          },
          {
            id: 'paper-2-linguistics',
            name: 'Paper 2: Linguistics'
          },
          {
            id: 'paper-2-chinese',
            name: 'Paper 2: Chinese'
          },
          {
            id: 'paper-2-dogri',
            name: 'Paper 2: Dogri'
          },
          {
            id: 'paper-2-nepali',
            name: 'Paper 2: Nepali'
          },
          {
            id: 'paper-2-manipuri',
            name: 'Paper 2: Manipuri'
          },
          {
            id: 'paper-2-assamese',
            name: 'Paper 2: Assamese'
          },
          {
            id: 'paper-2-gujarati',
            name: 'Paper 2: Gujarati'
          },
          {
            id: 'paper-2-marathi',
            name: 'Paper 2: Marathi'
          },
          {
            id: 'paper-2-french',
            name: 'Paper 2: French'
          },
          {
            id: 'paper-2-spanish',
            name: 'Paper 2: Spanish'
          },
          {
            id: 'paper-2-russian',
            name: 'Paper 2: Russian'
          },
          {
            id: 'paper-2-persian',
            name: 'Paper 2: Persian'
          },
          {
            id: 'paper-2-rajasthani',
            name: 'Paper 2: Rajasthani'
          },
          {
            id: 'paper-2-german',
            name: 'Paper 2: German'
          },
          {
            id: 'paper-2-japanese',
            name: 'Paper 2: Japanese'
          },
          {
            id: 'paper-2-adult-education',
            name: 'Paper 2: Adult Education'
          },
          {
            id: 'paper-2-physical-education',
            name: 'Paper 2: Physical Education'
          },
          {
            id: 'paper-2-arab-culture-islamic-studies',
            name: 'Paper 2: Arab Culture & Islamic Studies'
          },
          {
            id: 'paper-2-indian-culture',
            name: 'Paper 2: Indian Culture'
          },
          {
            id: 'paper-2-labour-welfare-hrm-industrial-relations',
            name: 'Paper 2: Labour Welfare / HRM / Industrial Relations'
          },
          {
            id: 'paper-2-law',
            name: 'Paper 2: Law'
          },
          {
            id: 'paper-2-library-information-science',
            name: 'Paper 2: Library & Information Science'
          },
          {
            id: 'paper-2-buddhist-jaina-gandhian-peace-studies',
            name: 'Paper 2: Buddhist, Jaina, Gandhian & Peace Studies'
          },
          {
            id: 'paper-2-comparative-study-of-religions',
            name: 'Paper 2: Comparative Study of Religions'
          },
          {
            id: 'paper-2-mass-communication-journalism',
            name: 'Paper 2: Mass Communication & Journalism'
          },
          {
            id: 'paper-2-performing-arts',
            name: 'Paper 2: Performing Arts'
          },
          {
            id: 'paper-2-museology-conservation',
            name: 'Paper 2: Museology & Conservation'
          },
          {
            id: 'paper-2-archaeology',
            name: 'Paper 2: Archaeology'
          },
          {
            id: 'paper-2-criminology',
            name: 'Paper 2: Criminology'
          },
          {
            id: 'paper-2-tribal-regional-language-literature',
            name: 'Paper 2: Tribal & Regional Language / Literature'
          },
          {
            id: 'paper-2-folk-literature',
            name: 'Paper 2: Folk Literature'
          },
          {
            id: 'paper-2-comparative-literature',
            name: 'Paper 2: Comparative Literature'
          },
          {
            id: 'paper-2-sanskrit-traditional-subjects',
            name: 'Paper 2: Sanskrit Traditional Subjects'
          },
          {
            id: 'paper-2-women-studies',
            name: 'Paper 2: Women Studies'
          },
          {
            id: 'paper-2-visual-arts',
            name: 'Paper 2: Visual Arts'
          },
          {
            id: 'paper-2-geography',
            name: 'Paper 2: Geography'
          },
          {
            id: 'paper-2-social-medicine-community-health',
            name: 'Paper 2: Social Medicine & Community Health'
          },
          {
            id: 'paper-2-forensic-science',
            name: 'Paper 2: Forensic Science'
          },
          {
            id: 'paper-2-pali',
            name: 'Paper 2: Pali'
          },
          {
            id: 'paper-2-kashmiri',
            name: 'Paper 2: Kashmiri'
          },
          {
            id: 'paper-2-konkani',
            name: 'Paper 2: Konkani'
          },
          {
            id: 'paper-2-computer-science-applications',
            name: 'Paper 2: Computer Science & Applications'
          },
          {
            id: 'paper-2-electronic-science',
            name: 'Paper 2: Electronic Science'
          },
          {
            id: 'paper-2-environmental-sciences',
            name: 'Paper 2: Environmental Sciences'
          },
          {
            id: 'paper-2-international-area-studies',
            name: 'Paper 2: International & Area Studies'
          },
          {
            id: 'paper-2-prakrit',
            name: 'Paper 2: Prakrit'
          },
          {
            id: 'paper-2-human-rights-duties',
            name: 'Paper 2: Human Rights & Duties'
          },
          {
            id: 'paper-2-tourism-administration-management',
            name: 'Paper 2: Tourism Administration & Management'
          },
          {
            id: 'paper-2-bodo',
            name: 'Paper 2: Bodo'
          },
          {
            id: 'paper-2-santali',
            name: 'Paper 2: Santali'
          },
          {
            id: 'paper-2-yoga',
            name: 'Paper 2: Yoga'
          },
          {
            id: 'paper-2-sindhi',
            name: 'Paper 2: Sindhi'
          },
          {
            id: 'paper-2-hindu-studies',
            name: 'Paper 2: Hindu Studies'
          },
          {
            id: 'paper-2-indian-knowledge-system',
            name: 'Paper 2: Indian Knowledge System'
          },
          {
            id: 'paper-2-disaster-management',
            name: 'Paper 2: Disaster Management'
          },
          {
            id: 'paper-2-ayurveda-biology',
            name: 'Paper 2: Ayurveda Biology'
          },
          {
            id: 'paper-2-forestry',
            name: 'Paper 2: Forestry'
          },
          {
            id: 'paper-2-statistics',
            name: 'Paper 2: Statistics'
          }
        ]
    },

    // ==========================================
    // MANAGEMENT EXAMS
    // ==========================================
    'cat': {
        name: 'CAT',
        category_id: 'management',
        short_description: 'Common Admission Test for IIMs.',
        about: 'Common Admission Test for admission into IIMs and top B-schools in India.',
        pattern: '<ul><li><b>VARC:</b> Verbal Ability & Reading Comprehension</li><li><b>DILR:</b> Data Interpretation & Logical Reasoning</li><li><b>QA:</b> Quantitative Ability</li></ul>',
        eligibility: '<p>Bachelor degree with 50% marks.</p>',
        syllabus: '<p>VARC, DILR, QA.</p>',
        dates: '<p>UPDATE: Exam Schedule - April and November',
        links: '<a href="https://iimcat.ac.in/" target="_blank">Official CAT Website</a>',
        subjects: [
          {
            id: 'varc-verbal-ability-reading-comprehension',
            name: 'VARC — Verbal Ability & Reading Comprehension'
          },
          {
            id: 'dilr-data-interpretation-logical-reasoning',
            name: 'DILR — Data Interpretation & Logical Reasoning'
          },
          {
            id: 'qa-quantitative-ability',
            name: 'QA — Quantitative Ability'
          }
        ]
    },

    // ==========================================
    // LAW EXAMS
    // ==========================================
    'clat': {
        name: 'CLAT',
        category_id: 'law',
        short_description: 'Common Law Admission Test.',
        about: 'Centralized national level entrance test for admissions to 22 National Law Universities (NLUs).',
        pattern: '<ul><li><b>Sections:</b> English Language, Current Affairs, Legal Reasoning, Logical Reasoning, Quantitative Techniques.</li></ul>',
        eligibility: '<p>10+2 with 45% marks.</p>',
        syllabus: '<p>Comprehension-based questions across all 5 sections.</p>',
        dates: '<p>UPDATE: Tentative Schedule - Not specified',
        links: '<a href="https://consortiumofnlus.ac.in/" target="_blank">Official CLAT Website</a>',
        subjects: [
          {
            id: 'ug-english-language',
            name: 'UG: English Language'
          },
          {
            id: 'ug-current-affairs-general-knowledge',
            name: 'UG: Current Affairs & General Knowledge'
          },
          {
            id: 'ug-legal-reasoning',
            name: 'UG: Legal Reasoning'
          },
          {
            id: 'ug-logical-reasoning',
            name: 'UG: Logical Reasoning'
          },
          {
            id: 'ug-quantitative-techniques',
            name: 'UG: Quantitative Techniques'
          },
          {
            id: 'pg-constitutional-law',
            name: 'PG: Constitutional Law'
          },
          {
            id: 'pg-jurisprudence',
            name: 'PG: Jurisprudence'
          },
          {
            id: 'pg-contract-law',
            name: 'PG: Contract Law'
          },
          {
            id: 'pg-torts',
            name: 'PG: Torts'
          },
          {
            id: 'pg-criminal-law',
            name: 'PG: Criminal Law'
          },
          {
            id: 'pg-family-law',
            name: 'PG: Family Law'
          },
          {
            id: 'pg-property-law',
            name: 'PG: Property Law'
          },
          {
            id: 'pg-company-law',
            name: 'PG: Company Law'
          },
          {
            id: 'pg-public-international-law',
            name: 'PG: Public International Law'
          },
          {
            id: 'pg-tax-law',
            name: 'PG: Tax Law'
          },
          {
            id: 'pg-environmental-law',
            name: 'PG: Environmental Law'
          },
          {
            id: 'pg-labour-industrial-law',
            name: 'PG: Labour & Industrial Law'
          },
          {
            id: 'pg-intellectual-property-law',
            name: 'PG: Intellectual Property Law'
          },
          {
            id: 'pg-other-prescribed-areas',
            name: 'PG: Other Prescribed Areas'
          }
        ]
    },


    // ==========================================
    // STATE PCS
    // ==========================================
    'mpsc': {
        name: 'MPSC Rajyaseva',
        category_id: 'government',
        short_description: 'Maharashtra Civil Services Gazetted Group A & Group B Examination.',
        about: 'MPSC Rajyaseva is the Maharashtra State Civil Services examination for recruitment to various Group A and Group B administrative posts under the Government of Maharashtra.',
        pattern: '<ul><li><b>Prelims:</b> Paper I (GS), Paper II (CSAT)</li><li><b>Mains:</b> Marathi, English, Essay, GS I-IV, Optional</li></ul><p><i>Note: Subject to latest revised scheme.</i></p>',
        eligibility: '<p>Bachelor degree or equivalent.</p>',
        syllabus: '<p>History of Maharashtra, Geography of Maharashtra, Constitution, Economy, Agriculture, Science & Tech.</p>',
        dates: '<p>UPDATE: Prelims Result - 2026',
        links: '<a href="https://mpsc.gov.in/" target="_blank">Official MPSC Website</a>',
        subjects: [
          {
            id: 'prelims-general-studies',
            name: 'Prelims: General Studies'
          },
          {
            id: 'prelims-csat',
            name: 'Prelims: CSAT'
          },
          {
            id: 'mains-marathi',
            name: 'Mains: Marathi'
          },
          {
            id: 'mains-english',
            name: 'Mains: English'
          },
          {
            id: 'mains-essay',
            name: 'Mains: Essay'
          },
          {
            id: 'mains-general-studies-i',
            name: 'Mains: General Studies I'
          },
          {
            id: 'mains-general-studies-ii',
            name: 'Mains: General Studies II'
          },
          {
            id: 'mains-general-studies-iii',
            name: 'Mains: General Studies III'
          },
          {
            id: 'mains-general-studies-iv',
            name: 'Mains: General Studies IV'
          },
          {
            id: 'mains-optional-prescribed-subject-papers',
            name: 'Mains: Optional / Prescribed Subject Papers'
          }
        ]
    },
    'rpsc': {
        name: 'RPSC RAS',
        category_id: 'government',
        short_description: 'Rajasthan State and Subordinate Services Combined Competitive Examination.',
        about: 'RAS is the major Rajasthan State Civil Services examination for recruitment to Rajasthan State and Subordinate Services.',
        pattern: '<ul><li><b>Prelims:</b> General Knowledge and General Science</li><li><b>Mains:</b> GS I, GS II, GS III, General Hindi & English</li></ul>',
        eligibility: '<p>Bachelor degree or equivalent.</p>',
        syllabus: '<p>History, Art & Culture of Rajasthan, Indian History, Economy, Polity, Public Administration, Ethics.</p>',
        dates: '<p>UPDATE: Group B Cut Off - 2026',
        links: '<a href="https://rpsc.rajasthan.gov.in/" target="_blank">Official RPSC Website</a>',
        subjects: [
          {
            id: 'prelims-general-knowledge-general-science',
            name: 'Prelims: General Knowledge & General Science'
          },
          {
            id: 'mains-general-studies-i',
            name: 'Mains: General Studies I'
          },
          {
            id: 'mains-general-studies-ii',
            name: 'Mains: General Studies II'
          },
          {
            id: 'mains-general-studies-iii',
            name: 'Mains: General Studies III'
          },
          {
            id: 'mains-general-hindi-general-english',
            name: 'Mains: General Hindi & General English'
          }
        ]
    },

    // ==========================================
    // SSC
    // ==========================================
    'ssc-gd': {
        name: 'SSC GD Constable',
        category_id: 'ssc',
        short_description: 'Recruitment for Constable (GD) posts in CAPFs.',
        about: 'Recruitment examination for Constable (GD) posts in CAPFs and other forces.',
        pattern: '<ul><li><b>CBE:</b> GI & Reasoning, GK, Mathematics, English/Hindi</li><li><b>PET/PST</b> & Medical Exam</li></ul>',
        eligibility: '<p>10th pass / Matriculation.</p>',
        syllabus: '<p>General Intelligence, General Awareness, Elementary Mathematics, English/Hindi.</p>',
        dates: '<p>UPDATE: Prelims Result - null',
        links: '<a href="https://ssc.gov.in/" target="_blank">Official SSC Website</a>',
        subjects: [
          {
            id: 'general-intelligence-reasoning',
            name: 'General Intelligence & Reasoning'
          },
          {
            id: 'general-knowledge-general-awareness',
            name: 'General Knowledge & General Awareness'
          },
          {
            id: 'elementary-mathematics',
            name: 'Elementary Mathematics'
          },
          {
            id: 'english-hindi',
            name: 'English / Hindi'
          }
        ]
    },
    'ssc-cpo': {
        name: 'SSC CPO',
        category_id: 'ssc',
        short_description: 'SSC Sub-Inspector in Delhi Police and CAPFs.',
        about: 'Recruitment for Sub-Inspector posts in Delhi Police and CAPFs.',
        pattern: '<ul><li><b>Paper I:</b> GI, GK, Quant, English</li><li><b>PET/PST</b></li><li><b>Paper II:</b> English Language & Comprehension</li></ul>',
        eligibility: '<p>Graduation.</p>',
        syllabus: '<p>General Intelligence, GK, Quantitative Aptitude, English Comprehension.</p>',
        dates: '<p>UPDATE: Group B Cut Off - null',
        links: '<a href="https://ssc.gov.in/" target="_blank">Official SSC Website</a>',
        subjects: [
          {
            id: 'paper-i-general-intelligence-reasoning',
            name: 'Paper I: General Intelligence & Reasoning'
          },
          {
            id: 'paper-i-general-knowledge-general-awareness',
            name: 'Paper I: General Knowledge & General Awareness'
          },
          {
            id: 'paper-i-quantitative-aptitude',
            name: 'Paper I: Quantitative Aptitude'
          },
          {
            id: 'paper-i-english-comprehension',
            name: 'Paper I: English Comprehension'
          },
          {
            id: 'paper-ii-english-language-comprehension',
            name: 'Paper II: English Language & Comprehension'
          }
        ]
    },

    // ==========================================
    // BANKING
    // ==========================================
    'ibps-clerk': {
        name: 'IBPS Clerk',
        category_id: 'banking',
        short_description: 'IBPS Clerical / Customer Service Associate.',
        about: 'Recruitment examination for clerical positions in participating public sector banks.',
        pattern: '<ul><li><b>Prelims:</b> English, Numerical Ability, Reasoning</li><li><b>Mains:</b> General/Financial Awareness, General English, Reasoning, Quant</li></ul>',
        eligibility: '<p>Graduation.</p>',
        syllabus: '<p>Reasoning, Quantitative Aptitude, English, Banking Awareness.</p>',
        dates: '<p>UPDATE: Exam Cancelled - Not specified',
        links: '<a href="https://www.ibps.in/" target="_blank">Official IBPS Website</a>',
        subjects: [
          {
            id: 'prelims-english-language',
            name: 'Prelims: English Language'
          },
          {
            id: 'prelims-numerical-ability',
            name: 'Prelims: Numerical Ability'
          },
          {
            id: 'prelims-reasoning-ability',
            name: 'Prelims: Reasoning Ability'
          },
          {
            id: 'mains-general-financial-awareness',
            name: 'Mains: General / Financial Awareness'
          },
          {
            id: 'mains-general-english',
            name: 'Mains: General English'
          },
          {
            id: 'mains-reasoning-ability',
            name: 'Mains: Reasoning Ability'
          },
          {
            id: 'mains-quantitative-aptitude',
            name: 'Mains: Quantitative Aptitude'
          }
        ]
    },
    'sbi-clerk': {
        name: 'SBI Clerk',
        category_id: 'banking',
        short_description: 'State Bank of India Junior Associate.',
        about: 'Recruitment for Junior Associate (Customer Support & Sales) in SBI.',
        pattern: '<ul><li><b>Prelims:</b> English, Numerical Ability, Reasoning</li><li><b>Mains:</b> GA, English, Quant, Reasoning</li><li><b>Local Language Test</b></li></ul>',
        eligibility: '<p>Graduation.</p>',
        syllabus: '<p>General/Financial Awareness, English, Quantitative Aptitude, Reasoning Ability.</p>',
        dates: '<p>UPDATE: Prelims Exam Date - 1 & 2 August 2026',
        links: '<a href="https://sbi.co.in/web/careers" target="_blank">Official SBI Careers</a>',
        subjects: [
          {
            id: 'prelims-english-language',
            name: 'Prelims: English Language'
          },
          {
            id: 'prelims-numerical-ability',
            name: 'Prelims: Numerical Ability'
          },
          {
            id: 'prelims-reasoning-ability',
            name: 'Prelims: Reasoning Ability'
          },
          {
            id: 'mains-general-financial-awareness',
            name: 'Mains: General / Financial Awareness'
          },
          {
            id: 'mains-general-english',
            name: 'Mains: General English'
          },
          {
            id: 'mains-quantitative-aptitude',
            name: 'Mains: Quantitative Aptitude'
          },
          {
            id: 'mains-reasoning-ability-computer-aptitude',
            name: 'Mains: Reasoning Ability & Computer Aptitude'
          },
          {
            id: 'other-local-language',
            name: 'Other: Local Language'
          }
        ]
    },
    'nabard': {
        name: 'NABARD Grade A',
        category_id: 'banking',
        short_description: 'NABARD Assistant Manager Grade A.',
        about: 'Recruitment for Assistant Manager in National Bank for Agriculture and Rural Development.',
        pattern: '<ul><li><b>Prelims:</b> Reasoning, English, Computer, Quant, Decision Making, ESI, ARD, GA</li><li><b>Mains:</b> Paper I (English), Paper II (ESI, ARD, Specialist)</li></ul>',
        eligibility: '<p>Graduation.</p>',
        syllabus: '<p>Economic & Social Issues (ESI), Agriculture & Rural Development (ARD).</p>',
        dates: '<p>UPDATE: Mains Admit Card Out - Not specified',
        links: '<a href="https://www.nabard.org/" target="_blank">Official NABARD Website</a>',
        subjects: [
          {
            id: 'prelims-reasoning',
            name: 'Prelims: Reasoning'
          },
          {
            id: 'prelims-english-language',
            name: 'Prelims: English Language'
          },
          {
            id: 'prelims-computer-knowledge',
            name: 'Prelims: Computer Knowledge'
          },
          {
            id: 'prelims-quantitative-aptitude',
            name: 'Prelims: Quantitative Aptitude'
          },
          {
            id: 'prelims-decision-making',
            name: 'Prelims: Decision Making'
          },
          {
            id: 'prelims-economic-social-issues',
            name: 'Prelims: Economic & Social Issues'
          },
          {
            id: 'prelims-agriculture-rural-development',
            name: 'Prelims: Agriculture & Rural Development'
          },
          {
            id: 'prelims-general-awareness',
            name: 'Prelims: General Awareness'
          },
          {
            id: 'mains-general-english',
            name: 'Mains: General English'
          },
          {
            id: 'mains-economic-social-issues',
            name: 'Mains: Economic & Social Issues'
          },
          {
            id: 'mains-agriculture-rural-development',
            name: 'Mains: Agriculture & Rural Development'
          },
          {
            id: 'specialist-agriculture',
            name: 'Specialist: Agriculture'
          },
          {
            id: 'specialist-agriculture-engineering',
            name: 'Specialist: Agriculture Engineering'
          },
          {
            id: 'specialist-land-development',
            name: 'Specialist: Land Development'
          },
          {
            id: 'specialist-fisheries',
            name: 'Specialist: Fisheries'
          },
          {
            id: 'specialist-food-processing',
            name: 'Specialist: Food Processing'
          },
          {
            id: 'specialist-forestry',
            name: 'Specialist: Forestry'
          },
          {
            id: 'specialist-environmental-science',
            name: 'Specialist: Environmental Science'
          },
          {
            id: 'specialist-finance',
            name: 'Specialist: Finance'
          },
          {
            id: 'specialist-computer-it',
            name: 'Specialist: Computer / IT'
          },
          {
            id: 'specialist-economics',
            name: 'Specialist: Economics'
          },
          {
            id: 'specialist-statistics',
            name: 'Specialist: Statistics'
          },
          {
            id: 'specialist-legal',
            name: 'Specialist: Legal'
          },
          {
            id: 'specialist-other-notified-disciplines',
            name: 'Specialist: Other Notified Disciplines'
          }
        ]
    },

    // ==========================================
    // RAILWAYS
    // ==========================================
    'rrb-ntpc': {
        name: 'RRB NTPC',
        category_id: 'railways',
        short_description: 'Non-Technical Popular Categories.',
        about: 'Recruitment for various non-technical posts in Indian Railways.',
        pattern: '<ul><li><b>CBT 1 & 2:</b> General Awareness, Mathematics, General Intelligence & Reasoning</li><li><b>Skill Test / CBAT</b></li></ul>',
        eligibility: '<p>10+2 or Graduation depending on the post.</p>',
        syllabus: '<p>Mathematics, Reasoning, General Awareness (History, Geography, Polity, Science).</p>',
        dates: '<p>UPDATE: Notification Out - Not specified',
        links: '<a href="https://rrb.indianrailways.gov.in/" target="_blank">Official RRB Website</a>',
        subjects: [
          {
            id: 'general-awareness',
            name: 'General Awareness'
          },
          {
            id: 'mathematics',
            name: 'Mathematics'
          },
          {
            id: 'general-intelligence-reasoning',
            name: 'General Intelligence & Reasoning'
          },
          {
            id: 'post-specific-typing-skill-test',
            name: 'Post-Specific: Typing Skill Test'
          },
          {
            id: 'post-specific-computer-based-aptitude-test',
            name: 'Post-Specific: Computer Based Aptitude Test'
          }
        ]
    },
    'rrb-group-d': {
        name: 'RRB Group D',
        category_id: 'railways',
        short_description: 'Railway Recruitment Board Group D / Level 1.',
        about: 'Recruitment for various Level 1 posts like Track Maintainer, Helper, etc.',
        pattern: '<ul><li><b>CBT:</b> General Science, Maths, Reasoning, GA</li><li><b>PET</b></li></ul>',
        eligibility: '<p>10th pass / ITI.</p>',
        syllabus: '<p>General Science (Physics, Chemistry, Biology), Mathematics, Reasoning.</p>',
        dates: '<p>UPDATE: Application Window Closes - Not specified',
        links: '<a href="https://rrb.indianrailways.gov.in/" target="_blank">Official RRB Website</a>',
        subjects: [
          {
            id: 'general-science',
            name: 'General Science'
          },
          {
            id: 'mathematics',
            name: 'Mathematics'
          },
          {
            id: 'general-intelligence-reasoning',
            name: 'General Intelligence & Reasoning'
          },
          {
            id: 'general-awareness-current-affairs',
            name: 'General Awareness & Current Affairs'
          }
        ]
    },
    'rrb-alp': {
        name: 'RRB ALP',
        category_id: 'railways',
        short_description: 'Assistant Loco Pilot & Technicians.',
        about: 'Recruitment for Assistant Loco Pilot and Technician posts.',
        pattern: '<ul><li><b>CBT 1:</b> Maths, Mental Ability, Science, GA</li><li><b>CBT 2:</b> Part A (Maths, Reasoning, Basic Science/Engg), Part B (Trade)</li><li><b>CBAT</b></li></ul>',
        eligibility: '<p>Matriculation / ITI / Diploma.</p>',
        syllabus: '<p>Basic Science & Engineering, Trade-specific subjects.</p>',
        dates: '<p>UPDATE: Exam Date - 1 & 2 Aug 2026',
        links: '<a href="https://rrb.indianrailways.gov.in/" target="_blank">Official RRB Website</a>',
        subjects: [
          {
            id: 'cbt-1-mathematics',
            name: 'CBT 1: Mathematics'
          },
          {
            id: 'cbt-1-mental-ability',
            name: 'CBT 1: Mental Ability'
          },
          {
            id: 'cbt-1-general-science',
            name: 'CBT 1: General Science'
          },
          {
            id: 'cbt-1-general-awareness-current-affairs',
            name: 'CBT 1: General Awareness & Current Affairs'
          },
          {
            id: 'cbt-2-mathematics',
            name: 'CBT 2: Mathematics'
          },
          {
            id: 'cbt-2-general-intelligence-reasoning',
            name: 'CBT 2: General Intelligence & Reasoning'
          },
          {
            id: 'cbt-2-basic-science-engineering',
            name: 'CBT 2: Basic Science & Engineering'
          },
          {
            id: 'cbt-2-general-awareness',
            name: 'CBT 2: General Awareness'
          },
          {
            id: 'part-b-trade-specific-subject',
            name: 'Part B: Trade-Specific Subject'
          }
        ]
    },

    // ==========================================
    // DEFENCE
    // ==========================================
    'nda': {
        name: 'NDA',
        category_id: 'defence',
        short_description: 'National Defence Academy and Naval Academy Examination.',
        about: 'Conducted by UPSC for admission to the Army, Navy and Air Force wings of the NDA.',
        pattern: '<ul><li><b>Paper I:</b> Mathematics</li><li><b>Paper II:</b> General Ability Test (English & GK)</li><li><b>SSB Interview</b></li></ul>',
        eligibility: '<p>10+2. Age limit as per current notification.</p>',
        syllabus: '<p>Mathematics (Algebra, Matrices, Calculus, Vectors), English, GK (Physics, Chemistry, History, Geography).</p>',
        dates: '<p>UPDATE: Notification - 2026',
        links: '<a href="https://upsc.gov.in/" target="_blank">Official UPSC Website</a>',
        subjects: [
          {
            id: 'paper-i-mathematics',
            name: 'Paper I: Mathematics'
          },
          {
            id: 'paper-ii-english',
            name: 'Paper II: English'
          },
          {
            id: 'paper-ii-physics',
            name: 'Paper II: Physics'
          },
          {
            id: 'paper-ii-chemistry',
            name: 'Paper II: Chemistry'
          },
          {
            id: 'paper-ii-general-science',
            name: 'Paper II: General Science'
          },
          {
            id: 'paper-ii-history',
            name: 'Paper II: History'
          },
          {
            id: 'paper-ii-geography',
            name: 'Paper II: Geography'
          },
          {
            id: 'paper-ii-current-events',
            name: 'Paper II: Current Events'
          }
        ]
    },
    'cds': {
        name: 'CDS',
        category_id: 'defence',
        short_description: 'Combined Defence Services Examination.',
        about: 'Conducted by UPSC for recruitment into the Indian Military Academy, Officers Training Academy, Indian Naval Academy, and Indian Air Force Academy.',
        pattern: '<ul><li><b>IMA/INA/AFA:</b> English, GK, Elementary Maths</li><li><b>OTA:</b> English, GK</li><li><b>SSB Interview</b></li></ul>',
        eligibility: '<p>Graduation.</p>',
        syllabus: '<p>English, GK, Elementary Mathematics.</p>',
        dates: '<p>UPDATE: Exam Date - 2026',
        links: '<a href="https://upsc.gov.in/" target="_blank">Official UPSC Website</a>',
        subjects: [
          {
            id: 'ima-ina-afa-english',
            name: 'IMA/INA/AFA: English'
          },
          {
            id: 'ima-ina-afa-general-knowledge',
            name: 'IMA/INA/AFA: General Knowledge'
          },
          {
            id: 'ima-ina-afa-elementary-mathematics',
            name: 'IMA/INA/AFA: Elementary Mathematics'
          },
          {
            id: 'ota-english',
            name: 'OTA: English'
          },
          {
            id: 'ota-general-knowledge',
            name: 'OTA: General Knowledge'
          }
        ]
    },
    'afcat': {
        name: 'AFCAT',
        category_id: 'defence',
        short_description: 'Air Force Common Admission Test.',
        about: 'For recruiting officers in Flying, Technical, and Ground Duty branches of IAF.',
        pattern: '<ul><li><b>AFCAT:</b> General Awareness, English, Numerical Ability, Reasoning, Military Aptitude</li><li><b>AFSB Interview</b></li></ul>',
        eligibility: '<p>Graduation.</p>',
        syllabus: '<p>General Awareness, English, Numerical Ability, Reasoning, Military Aptitude.</p>',
        dates: '<p>UPDATE: Notification - 2026',
        links: '<a href="https://careerairforce.gov.in/" target="_blank">Official AFCAT Website</a>',
        subjects: [
          {
            id: 'general-awareness',
            name: 'General Awareness'
          },
          {
            id: 'english',
            name: 'English'
          },
          {
            id: 'numerical-ability',
            name: 'Numerical Ability'
          },
          {
            id: 'reasoning',
            name: 'Reasoning'
          },
          {
            id: 'military-aptitude',
            name: 'Military Aptitude'
          }
        ]
    },
    'agniveer': {
        name: 'Agniveer',
        category_id: 'defence',
        short_description: 'Indian Armed Forces Agniveer Recruitment.',
        about: 'Recruitment for various non-commissioned trades in the Indian Armed Forces under the Agnipath scheme.',
        pattern: '<ul><li><b>CEE:</b> Common Entrance Exam (Subjects vary by trade)</li><li><b>Physical & Medical</b></li></ul>',
        eligibility: '<p>10th/12th depending on the specific trade.</p>',
        syllabus: '<p>General Knowledge, General Science, Mathematics, Logical Reasoning (Varies by trade).</p>',
        dates: '<p>UPDATE: Application Form - 3 Aug 2026',
        links: '<a href="https://joinindianarmy.nic.in/" target="_blank">Official Indian Army Website</a>',
        subjects: [
          {
            id: 'general-duty-general-knowledge',
            name: 'General Duty: General Knowledge'
          },
          {
            id: 'general-duty-general-science',
            name: 'General Duty: General Science'
          },
          {
            id: 'general-duty-mathematics',
            name: 'General Duty: Mathematics'
          },
          {
            id: 'general-duty-logical-reasoning',
            name: 'General Duty: Logical Reasoning'
          },
          {
            id: 'technical-general-knowledge',
            name: 'Technical: General Knowledge'
          },
          {
            id: 'technical-general-science',
            name: 'Technical: General Science'
          },
          {
            id: 'technical-mathematics',
            name: 'Technical: Mathematics'
          },
          {
            id: 'technical-physics',
            name: 'Technical: Physics'
          },
          {
            id: 'technical-chemistry',
            name: 'Technical: Chemistry'
          },
          {
            id: 'technical-technical-subject',
            name: 'Technical: Technical Subject'
          },
          {
            id: 'office-store-keeper-general-knowledge',
            name: 'Office/Store Keeper: General Knowledge'
          },
          {
            id: 'office-store-keeper-general-science',
            name: 'Office/Store Keeper: General Science'
          },
          {
            id: 'office-store-keeper-mathematics',
            name: 'Office/Store Keeper: Mathematics'
          },
          {
            id: 'office-store-keeper-computer',
            name: 'Office/Store Keeper: Computer'
          },
          {
            id: 'office-store-keeper-general-reasoning',
            name: 'Office/Store Keeper: General Reasoning'
          },
          {
            id: 'office-store-keeper-english',
            name: 'Office/Store Keeper: English'
          },
          {
            id: 'other-trades-trade-specific-subjects',
            name: 'Other Trades: Trade-Specific Subjects'
          }
        ]
    },

    // ==========================================
    // MEDICAL PG
    // ==========================================
    'neet-pg': {
        name: 'NEET PG',
        category_id: 'medical',
        short_description: 'National Eligibility cum Entrance Test for Postgraduate.',
        about: 'National entrance examination for admission to MD/MS and other postgraduate medical programmes as prescribed by NBEMS.',
        pattern: '<ul><li><b>CBT:</b> Multiple choice questions covering all MBBS subjects.</li></ul><p><i>Note: Refer to latest NBEMS information bulletin for exact pattern.</i></p>',
        eligibility: '<p>MBBS degree/provisional pass and internship requirements as per NBEMS.</p>',
        syllabus: '<p>Pre-clinical, Para-clinical, and Clinical subjects of MBBS curriculum.</p>',
        dates: '<p>UPDATE: Application Process Begins - Not specified',
        links: '<a href="https://natboard.edu.in/" target="_blank">Official NBEMS Website</a>',
        subjects: [
          {
            id: 'anatomy',
            name: 'Anatomy'
          },
          {
            id: 'physiology',
            name: 'Physiology'
          },
          {
            id: 'biochemistry',
            name: 'Biochemistry'
          },
          {
            id: 'pathology',
            name: 'Pathology'
          },
          {
            id: 'pharmacology',
            name: 'Pharmacology'
          },
          {
            id: 'microbiology',
            name: 'Microbiology'
          },
          {
            id: 'forensic-medicine',
            name: 'Forensic Medicine'
          },
          {
            id: 'community-medicine',
            name: 'Community Medicine'
          },
          {
            id: 'general-medicine',
            name: 'General Medicine'
          },
          {
            id: 'pediatrics',
            name: 'Pediatrics'
          },
          {
            id: 'dermatology',
            name: 'Dermatology'
          },
          {
            id: 'psychiatry',
            name: 'Psychiatry'
          },
          {
            id: 'radiodiagnosis',
            name: 'Radiodiagnosis'
          },
          {
            id: 'anesthesiology',
            name: 'Anesthesiology'
          },
          {
            id: 'general-surgery',
            name: 'General Surgery'
          },
          {
            id: 'orthopedics',
            name: 'Orthopedics'
          },
          {
            id: 'ent',
            name: 'ENT'
          },
          {
            id: 'ophthalmology',
            name: 'Ophthalmology'
          },
          {
            id: 'obstetrics-gynecology',
            name: 'Obstetrics & Gynecology'
          }
        ]
    },
    'ini-cet': {
        name: 'INI-CET',
        category_id: 'medical',
        short_description: 'Institute of National Importance Combined Entrance Test.',
        about: 'For postgraduate medical admissions to participating INIs like AIIMS, JIPMER, PGIMER, NIMHANS.',
        pattern: '<ul><li><b>CBT:</b> Covers all 19 MBBS subjects.</li></ul>',
        eligibility: '<p>MBBS.</p>',
        syllabus: '<p>Pre-clinical, Para-clinical, and Clinical subjects.</p>',
        dates: '<p>UPDATE: Exam City Intimation Slip Out - Not specified',
        links: '<a href="https://aiimsexams.ac.in/" target="_blank">Official AIIMS Exams Website</a>',
        subjects: [
          {
            id: 'anatomy',
            name: 'Anatomy'
          },
          {
            id: 'physiology',
            name: 'Physiology'
          },
          {
            id: 'biochemistry',
            name: 'Biochemistry'
          },
          {
            id: 'pathology',
            name: 'Pathology'
          },
          {
            id: 'pharmacology',
            name: 'Pharmacology'
          },
          {
            id: 'microbiology',
            name: 'Microbiology'
          },
          {
            id: 'forensic-medicine',
            name: 'Forensic Medicine'
          },
          {
            id: 'community-medicine',
            name: 'Community Medicine'
          },
          {
            id: 'general-medicine',
            name: 'General Medicine'
          },
          {
            id: 'pediatrics',
            name: 'Pediatrics'
          },
          {
            id: 'dermatology',
            name: 'Dermatology'
          },
          {
            id: 'psychiatry',
            name: 'Psychiatry'
          },
          {
            id: 'radiodiagnosis',
            name: 'Radiodiagnosis'
          },
          {
            id: 'anesthesiology',
            name: 'Anesthesiology'
          },
          {
            id: 'general-surgery',
            name: 'General Surgery'
          },
          {
            id: 'orthopedics',
            name: 'Orthopedics'
          },
          {
            id: 'ent',
            name: 'ENT'
          },
          {
            id: 'ophthalmology',
            name: 'Ophthalmology'
          },
          {
            id: 'obstetrics-gynecology',
            name: 'Obstetrics & Gynecology'
          }
        ]
    },

    // ==========================================
    // ENGINEERING (CONTINUED)
    // ==========================================
    'jee-advanced': {
        name: 'JEE Advanced',
        category_id: 'engineering',
        short_description: 'Joint Entrance Examination Advanced for IITs.',
        about: 'The second phase of the JEE for admission to Bachelor, Integrated Master, and Dual Degree programs at all the IITs.',
        pattern: '<ul><li><b>Paper 1 & Paper 2:</b> Both compulsory. Each covers Physics, Chemistry, and Mathematics.</li></ul>',
        eligibility: '<p>Must clear JEE Main cutoff.</p>',
        syllabus: '<p>Advanced level Physics, Chemistry, and Mathematics.</p>',
        dates: '<p>UPDATE: Notification - 2026',
        links: '<a href="https://jeeadv.ac.in/" target="_blank">Official JEE Advanced Website</a>',
        subjects: [
          {
            id: 'physics',
            name: 'Physics'
          },
          {
            id: 'chemistry',
            name: 'Chemistry'
          },
          {
            id: 'mathematics',
            name: 'Mathematics'
          }
        ]
    },
    'bitsat': {
        name: 'BITSAT',
        category_id: 'engineering',
        short_description: 'BITS Admission Test.',
        about: 'Entrance exam for admission to B.E., M.Sc., and B.Pharm programs at BITS Pilani campuses.',
        pattern: '<ul><li><b>Sections:</b> Physics, Chemistry, English Proficiency, Logical Reasoning, Mathematics/Biology.</li></ul>',
        eligibility: '<p>10+2 with Physics, Chemistry, and Math/Biology with adequate marks.</p>',
        syllabus: '<p>Physics, Chemistry, Math/Bio, English, Logical Reasoning.</p>',
        dates: '<p>UPDATE: Exam Date - 2025',
        links: '<a href="https://www.bitsadmission.com/" target="_blank">Official BITS Admission Website</a>',
        subjects: [
          {
            id: 'physics',
            name: 'Physics'
          },
          {
            id: 'chemistry',
            name: 'Chemistry'
          },
          {
            id: 'english-proficiency',
            name: 'English Proficiency'
          },
          {
            id: 'logical-reasoning',
            name: 'Logical Reasoning'
          },
          {
            id: 'mathematics',
            name: 'Mathematics'
          },
          {
            id: 'biology-stream-biology',
            name: 'Biology Stream: Biology'
          }
        ]
    },

    // ==========================================
    // TEACHING (CONTINUED)
    // ==========================================
    'csir-net': {
        name: 'CSIR UGC NET',
        category_id: 'teaching',
        short_description: 'Council of Scientific and Industrial Research NET.',
        about: 'For Junior Research Fellowship and Lectureship in Science subjects.',
        pattern: '<ul><li><b>Part A:</b> General Aptitude</li><li><b>Part B:</b> Subject-based</li><li><b>Part C:</b> Higher-order analytical questions</li></ul>',
        eligibility: '<p>M.Sc. or equivalent degree.</p>',
        syllabus: '<p>Chemical Sciences, Earth Sciences, Life Sciences, Mathematical Sciences, Physical Sciences.</p>',
        dates: '<p>UPDATE: Prelims Admit Card Release - 2025',
        links: '<a href="https://csirnet.nta.ac.in/" target="_blank">Official CSIR NET Website</a>',
        subjects: [
          {
            id: 'chemical-sciences',
            name: 'Chemical Sciences'
          },
          {
            id: 'earth-atmospheric-ocean-planetary-sciences',
            name: 'Earth, Atmospheric, Ocean & Planetary Sciences'
          },
          {
            id: 'life-sciences',
            name: 'Life Sciences'
          },
          {
            id: 'mathematical-sciences',
            name: 'Mathematical Sciences'
          },
          {
            id: 'physical-sciences',
            name: 'Physical Sciences'
          },
          {
            id: 'common-general-aptitude',
            name: 'Common: General Aptitude'
          }
        ]
    },
    'ctet': {
        name: 'CTET',
        category_id: 'teaching',
        short_description: 'Central Teacher Eligibility Test.',
        about: 'National level exam conducted by CBSE for eligibility to teach Classes I-VIII.',
        pattern: '<ul><li><b>Paper I (I-V):</b> CDP, Languages, Maths, EVS</li><li><b>Paper II (VI-VIII):</b> CDP, Languages, Maths/Science OR Social Studies</li></ul>',
        eligibility: '<p>B.Ed / D.El.Ed.</p>',
        syllabus: '<p>Child Development & Pedagogy, Languages, Math/Science/Social Studies.</p>',
        dates: '<p>UPDATE: Mains Exam Date - 2023-24',
        links: '<a href="https://ctet.nic.in/" target="_blank">Official CTET Website</a>',
        subjects: [
          {
            id: 'paper-i-child-development-pedagogy',
            name: 'Paper I: Child Development & Pedagogy'
          },
          {
            id: 'paper-i-language-i',
            name: 'Paper I: Language I'
          },
          {
            id: 'paper-i-language-ii',
            name: 'Paper I: Language II'
          },
          {
            id: 'paper-i-mathematics',
            name: 'Paper I: Mathematics'
          },
          {
            id: 'paper-i-environmental-studies',
            name: 'Paper I: Environmental Studies'
          },
          {
            id: 'paper-ii-child-development-pedagogy',
            name: 'Paper II: Child Development & Pedagogy'
          },
          {
            id: 'paper-ii-language-i',
            name: 'Paper II: Language I'
          },
          {
            id: 'paper-ii-language-ii',
            name: 'Paper II: Language II'
          },
          {
            id: 'paper-ii-mathematics-science',
            name: 'Paper II: Mathematics & Science'
          },
          {
            id: 'paper-ii-social-studies-social-science',
            name: 'Paper II: Social Studies / Social Science'
          }
        ]
    },
    'uptet': {
        name: 'UPTET',
        category_id: 'teaching',
        short_description: 'Uttar Pradesh Teacher Eligibility Test.',
        about: 'State level exam for eligibility to teach in UP state schools.',
        pattern: '<ul><li><b>Paper I (I-V):</b> CDP, Languages, Maths, EVS</li><li><b>Paper II (VI-VIII):</b> CDP, Languages, Maths/Science OR Social Studies</li></ul>',
        eligibility: '<p>B.Ed / BTC / D.El.Ed.</p>',
        syllabus: '<p>Child Development & Pedagogy, Languages, Math/Science/Social Studies.</p>',
        dates: '<p>UPDATE: Application Form Release - 2024',
        links: '<a href="https://updeled.gov.in/" target="_blank">Official UP Basic Education Portal</a>',
        subjects: [
          {
            id: 'paper-i-child-development-pedagogy',
            name: 'Paper I: Child Development & Pedagogy'
          },
          {
            id: 'paper-i-language-i',
            name: 'Paper I: Language I'
          },
          {
            id: 'paper-i-language-ii',
            name: 'Paper I: Language II'
          },
          {
            id: 'paper-i-mathematics',
            name: 'Paper I: Mathematics'
          },
          {
            id: 'paper-i-environmental-studies',
            name: 'Paper I: Environmental Studies'
          },
          {
            id: 'paper-ii-child-development-pedagogy',
            name: 'Paper II: Child Development & Pedagogy'
          },
          {
            id: 'paper-ii-language-i',
            name: 'Paper II: Language I'
          },
          {
            id: 'paper-ii-language-ii',
            name: 'Paper II: Language II'
          },
          {
            id: 'paper-ii-mathematics-science',
            name: 'Paper II: Mathematics & Science'
          },
          {
            id: 'paper-ii-social-studies-social-science',
            name: 'Paper II: Social Studies / Social Science'
          }
        ]
    },
    'reet': {
        name: 'REET',
        category_id: 'teaching',
        short_description: 'Rajasthan Eligibility Examination for Teachers.',
        about: 'State level exam for eligibility to teach in Rajasthan state schools.',
        pattern: '<ul><li><b>Level I:</b> CDP, Languages, Maths, EVS</li><li><b>Level II:</b> CDP, Languages, Maths/Science OR Social Studies</li></ul>',
        eligibility: '<p>B.Ed / B.S.T.C.</p>',
        syllabus: '<p>Child Development & Pedagogy, Languages, Math/Science/Social Studies.</p>',
        dates: '<p>UPDATE: Result Out - 2026',
        links: '<a href="https://rajeduboard.rajasthan.gov.in/" target="_blank">Official BSER Website</a>',
        subjects: [
          {
            id: 'level-i-child-development-pedagogy',
            name: 'Level I: Child Development & Pedagogy'
          },
          {
            id: 'level-i-language-i',
            name: 'Level I: Language I'
          },
          {
            id: 'level-i-language-ii',
            name: 'Level I: Language II'
          },
          {
            id: 'level-i-mathematics',
            name: 'Level I: Mathematics'
          },
          {
            id: 'level-i-environmental-studies',
            name: 'Level I: Environmental Studies'
          },
          {
            id: 'level-ii-child-development-pedagogy',
            name: 'Level II: Child Development & Pedagogy'
          },
          {
            id: 'level-ii-language-i',
            name: 'Level II: Language I'
          },
          {
            id: 'level-ii-language-ii',
            name: 'Level II: Language II'
          },
          {
            id: 'level-ii-mathematics-science',
            name: 'Level II: Mathematics & Science'
          },
          {
            id: 'level-ii-social-studies',
            name: 'Level II: Social Studies'
          }
        ]
    },

    // ==========================================
    // MANAGEMENT (CONTINUED)
    // ==========================================
    'xat': {
        name: 'XAT',
        category_id: 'management',
        short_description: 'Xavier Aptitude Test.',
        about: 'National level management entrance exam conducted by XLRI.',
        pattern: '<ul><li><b>Sections:</b> Verbal Ability, Decision Making, Quant & DI, General Knowledge.</li></ul>',
        eligibility: '<p>Graduation.</p>',
        syllabus: '<p>Verbal Ability, Logical Reasoning, Decision Making, Quantitative Aptitude, Data Interpretation, General Knowledge.</p>',
        dates: '<p>UPDATE: Exam Calendar Release - 2026',
        links: '<a href="https://xatonline.in/" target="_blank">Official XAT Website</a>',
        subjects: [
          {
            id: 'verbal-ability-logical-reasoning',
            name: 'Verbal Ability & Logical Reasoning'
          },
          {
            id: 'decision-making',
            name: 'Decision Making'
          },
          {
            id: 'quantitative-aptitude-data-interpretation',
            name: 'Quantitative Aptitude & Data Interpretation'
          },
          {
            id: 'general-knowledge',
            name: 'General Knowledge'
          }
        ]
    },
    'cmat': {
        name: 'CMAT',
        category_id: 'management',
        short_description: 'Common Management Admission Test.',
        about: 'National level entrance examination conducted by NTA for admission to management programs.',
        pattern: '<ul><li><b>Sections:</b> Quant & DI, Logical Reasoning, Language Comprehension, GA, Innovation & Entrepreneurship.</li></ul>',
        eligibility: '<p>Graduation.</p>',
        syllabus: '<p>Quantitative Techniques, Logical Reasoning, Language, General Awareness, Innovation & Entrepreneurship.</p>',
        dates: '<p>UPDATE: Development Assistant LPT Result Out - 2026',
        links: '<a href="https://exams.nta.ac.in/CMAT/" target="_blank">Official CMAT Website</a>',
        subjects: [
          {
            id: 'quantitative-techniques-data-interpretation',
            name: 'Quantitative Techniques & Data Interpretation'
          },
          {
            id: 'logical-reasoning',
            name: 'Logical Reasoning'
          },
          {
            id: 'language-comprehension',
            name: 'Language Comprehension'
          },
          {
            id: 'general-awareness',
            name: 'General Awareness'
          },
          {
            id: 'innovation-entrepreneurship',
            name: 'Innovation & Entrepreneurship'
          }
        ]
    },
    'mat': {
        name: 'MAT',
        category_id: 'management',
        short_description: 'Management Aptitude Test.',
        about: 'Standardized test conducted by AIMA to facilitate Business Schools to screen candidates.',
        pattern: '<ul><li><b>Sections:</b> Language, Intelligence, Mathematical Skills, Data Analysis, Economy/Business Environment.</li></ul>',
        eligibility: '<p>Graduation.</p>',
        syllabus: '<p>Language Comprehension, Intelligence & Critical Reasoning, Mathematical Skills, Data Analysis & Sufficiency, Economic & Business Environment.</p>',
        dates: '<p>UPDATE: Mains Exam Date Out - 2026',
        links: '<a href="https://mat.aima.in/" target="_blank">Official MAT Website</a>',
        subjects: [
          {
            id: 'language-comprehension',
            name: 'Language Comprehension'
          },
          {
            id: 'intelligence-critical-reasoning',
            name: 'Intelligence & Critical Reasoning'
          },
          {
            id: 'mathematical-skills',
            name: 'Mathematical Skills'
          },
          {
            id: 'data-analysis-sufficiency',
            name: 'Data Analysis & Sufficiency'
          },
          {
            id: 'economic-business-environment',
            name: 'Economic & Business Environment'
          }
        ]
    },
    'snap': {
        name: 'SNAP',
        category_id: 'management',
        short_description: 'Symbiosis National Aptitude Test.',
        about: 'Entrance exam for MBA programs offered by institutes of Symbiosis International (Deemed University).',
        pattern: '<ul><li><b>Sections:</b> General English, Analytical & Logical Reasoning, Quantitative/DI/Data Sufficiency.</li></ul>',
        eligibility: '<p>Graduation.</p>',
        syllabus: '<p>General English, Analytical & Logical Reasoning, Quantitative, Data Interpretation & Data Sufficiency.</p>',
        dates: '<p>UPDATE: Exam Date Revised - 2026',
        links: '<a href="https://snaptest.org/" target="_blank">Official SNAP Website</a>',
        subjects: [
          {
            id: 'general-english',
            name: 'General English'
          },
          {
            id: 'analytical-logical-reasoning',
            name: 'Analytical & Logical Reasoning'
          },
          {
            id: 'quantitative-data-interpretation-data-sufficiency',
            name: 'Quantitative, Data Interpretation & Data Sufficiency'
          }
        ]
    },

    // ==========================================
    // LAW (CONTINUED)
    // ==========================================
    'ailet': {
        name: 'AILET',
        category_id: 'law',
        short_description: 'All India Law Entrance Test.',
        about: 'Conducted by National Law University Delhi for admission to its law programs.',
        pattern: '<ul><li><b>UG:</b> English, Current Affairs & GK, Logical Reasoning</li><li><b>PG:</b> Law subjects</li></ul>',
        eligibility: '<p>10+2 / LLB depending on program.</p>',
        syllabus: '<p>English Language, Current Affairs & General Knowledge, Logical Reasoning.</p>',
        dates: '<p>UPDATE: Exam Date - 13 Dec 2027',
        links: '<a href="https://nationallawuniversitydelhi.in/" target="_blank">Official AILET Website</a>',
        subjects: [
          {
            id: 'ug-english-language',
            name: 'UG: English Language'
          },
          {
            id: 'ug-current-affairs-general-knowledge',
            name: 'UG: Current Affairs & General Knowledge'
          },
          {
            id: 'ug-logical-reasoning',
            name: 'UG: Logical Reasoning'
          },
          {
            id: 'pg-constitutional-law',
            name: 'PG: Constitutional Law'
          },
          {
            id: 'pg-jurisprudence',
            name: 'PG: Jurisprudence'
          },
          {
            id: 'pg-contract-law',
            name: 'PG: Contract Law'
          },
          {
            id: 'pg-torts',
            name: 'PG: Torts'
          },
          {
            id: 'pg-criminal-law',
            name: 'PG: Criminal Law'
          },
          {
            id: 'pg-family-law',
            name: 'PG: Family Law'
          },
          {
            id: 'pg-property-law',
            name: 'PG: Property Law'
          },
          {
            id: 'pg-company-law',
            name: 'PG: Company Law'
          },
          {
            id: 'pg-international-law',
            name: 'PG: International Law'
          },
          {
            id: 'pg-environmental-law',
            name: 'PG: Environmental Law'
          },
          {
            id: 'pg-intellectual-property-law',
            name: 'PG: Intellectual Property Law'
          },
          {
            id: 'pg-labour-law',
            name: 'PG: Labour Law'
          },
          {
            id: 'pg-tax-law',
            name: 'PG: Tax Law'
          },
          {
            id: 'pg-other-current-law-subjects',
            name: 'PG: Other Current Law Subjects'
          }
        ]
    },

    // ==========================================
    // UNIVERSITY
    // ==========================================
    'cuet-ug': {
        name: 'CUET UG',
        category_id: 'university',
        short_description: 'Common University Entrance Test (UG).',
        about: 'Single-window opportunity to students to seek admission in any of the Central Universities (CUs) across the country.',
        pattern: '<ul><li><b>Components:</b> Language Tests, Domain-Specific Subjects, General Aptitude Test</li></ul>',
        eligibility: '<p>10+2 pass.</p>',
        syllabus: '<p>Syllabus mapped to Class 12 NCERT for domain subjects.</p>',
        dates: '<p>UPDATE: Exam Centre Rule Change - 2026',
        links: '<a href="https://exams.nta.ac.in/" target="_blank">Official CUET Website</a>',
        subjects: [
          {
            id: 'language-english',
            name: 'Language: English'
          },
          {
            id: 'language-hindi',
            name: 'Language: Hindi'
          },
          {
            id: 'language-assamese',
            name: 'Language: Assamese'
          },
          {
            id: 'language-bengali',
            name: 'Language: Bengali'
          },
          {
            id: 'language-gujarati',
            name: 'Language: Gujarati'
          },
          {
            id: 'language-kannada',
            name: 'Language: Kannada'
          },
          {
            id: 'language-malayalam',
            name: 'Language: Malayalam'
          },
          {
            id: 'language-marathi',
            name: 'Language: Marathi'
          },
          {
            id: 'language-odia',
            name: 'Language: Odia'
          },
          {
            id: 'language-punjabi',
            name: 'Language: Punjabi'
          },
          {
            id: 'language-tamil',
            name: 'Language: Tamil'
          },
          {
            id: 'language-telugu',
            name: 'Language: Telugu'
          },
          {
            id: 'language-urdu',
            name: 'Language: Urdu'
          },
          {
            id: 'language-other-nta-listed-languages',
            name: 'Language: Other NTA-Listed Languages'
          },
          {
            id: 'domain-accountancy',
            name: 'Domain: Accountancy'
          },
          {
            id: 'domain-agriculture',
            name: 'Domain: Agriculture'
          },
          {
            id: 'domain-anthropology',
            name: 'Domain: Anthropology'
          },
          {
            id: 'domain-biology',
            name: 'Domain: Biology'
          },
          {
            id: 'domain-business-studies',
            name: 'Domain: Business Studies'
          },
          {
            id: 'domain-chemistry',
            name: 'Domain: Chemistry'
          },
          {
            id: 'domain-computer-science-informatics-practices',
            name: 'Domain: Computer Science / Informatics Practices'
          },
          {
            id: 'domain-economics',
            name: 'Domain: Economics'
          },
          {
            id: 'domain-environmental-science',
            name: 'Domain: Environmental Science'
          },
          {
            id: 'domain-fine-arts',
            name: 'Domain: Fine Arts'
          },
          {
            id: 'domain-geography',
            name: 'Domain: Geography'
          },
          {
            id: 'domain-history',
            name: 'Domain: History'
          },
          {
            id: 'domain-home-science',
            name: 'Domain: Home Science'
          },
          {
            id: 'domain-knowledge-traditions',
            name: 'Domain: Knowledge Traditions'
          },
          {
            id: 'domain-legal-studies',
            name: 'Domain: Legal Studies'
          },
          {
            id: 'domain-mass-media-studies',
            name: 'Domain: Mass Media Studies'
          },
          {
            id: 'domain-mathematics-applied-mathematics',
            name: 'Domain: Mathematics / Applied Mathematics'
          },
          {
            id: 'domain-physical-education',
            name: 'Domain: Physical Education'
          },
          {
            id: 'domain-physics',
            name: 'Domain: Physics'
          },
          {
            id: 'domain-political-science',
            name: 'Domain: Political Science'
          },
          {
            id: 'domain-psychology',
            name: 'Domain: Psychology'
          },
          {
            id: 'domain-sociology',
            name: 'Domain: Sociology'
          },
          {
            id: 'domain-other-nta-listed-domain-subjects',
            name: 'Domain: Other NTA-Listed Domain Subjects'
          },
          {
            id: 'general-aptitude-general-knowledge',
            name: 'General Aptitude: General Knowledge'
          },
          {
            id: 'general-aptitude-current-affairs',
            name: 'General Aptitude: Current Affairs'
          },
          {
            id: 'general-aptitude-general-mental-ability',
            name: 'General Aptitude: General Mental Ability'
          },
          {
            id: 'general-aptitude-numerical-ability',
            name: 'General Aptitude: Numerical Ability'
          },
          {
            id: 'general-aptitude-quantitative-reasoning',
            name: 'General Aptitude: Quantitative Reasoning'
          },
          {
            id: 'general-aptitude-logical-analytical-reasoning',
            name: 'General Aptitude: Logical & Analytical Reasoning'
          }
        ]
    },
    'cuet-pg': {
        name: 'CUET PG',
        category_id: 'university',
        short_description: 'Common University Entrance Test (PG).',
        about: 'National level entrance exam for postgraduate admissions across central, state, and private universities.',
        pattern: '<ul><li><b>Format:</b> Large list of specific test papers based on PG disciplines.</li></ul><p><i>Note: Refer to NTA CUET PG Test Paper Codes.</i></p>',
        eligibility: '<p>Graduation.</p>',
        syllabus: '<p>Discipline-specific undergraduate level syllabus.</p>',
        dates: '<p>UPDATE: Exam Centre Rule - null',
        links: '<a href="https://exams.nta.ac.in/" target="_blank">Official CUET Website</a>',
        subjects: [
          {
            id: 'science-physics',
            name: 'Science: Physics'
          },
          {
            id: 'science-chemistry',
            name: 'Science: Chemistry'
          },
          {
            id: 'science-mathematics',
            name: 'Science: Mathematics'
          },
          {
            id: 'science-statistics',
            name: 'Science: Statistics'
          },
          {
            id: 'science-biology',
            name: 'Science: Biology'
          },
          {
            id: 'science-botany',
            name: 'Science: Botany'
          },
          {
            id: 'science-zoology',
            name: 'Science: Zoology'
          },
          {
            id: 'science-biochemistry',
            name: 'Science: Biochemistry'
          },
          {
            id: 'science-biotechnology',
            name: 'Science: Biotechnology'
          },
          {
            id: 'science-environmental-science',
            name: 'Science: Environmental Science'
          },
          {
            id: 'science-life-sciences',
            name: 'Science: Life Sciences'
          },
          {
            id: 'science-geology',
            name: 'Science: Geology'
          },
          {
            id: 'science-computer-science',
            name: 'Science: Computer Science'
          },
          {
            id: 'commerce-commerce',
            name: 'Commerce: Commerce'
          },
          {
            id: 'commerce-management',
            name: 'Commerce: Management'
          },
          {
            id: 'commerce-business-administration',
            name: 'Commerce: Business Administration'
          },
          {
            id: 'commerce-finance',
            name: 'Commerce: Finance'
          },
          {
            id: 'commerce-accounting',
            name: 'Commerce: Accounting'
          },
          {
            id: 'humanities-history',
            name: 'Humanities: History'
          },
          {
            id: 'humanities-political-science',
            name: 'Humanities: Political Science'
          },
          {
            id: 'humanities-philosophy',
            name: 'Humanities: Philosophy'
          },
          {
            id: 'humanities-sociology',
            name: 'Humanities: Sociology'
          },
          {
            id: 'humanities-psychology',
            name: 'Humanities: Psychology'
          },
          {
            id: 'humanities-geography',
            name: 'Humanities: Geography'
          },
          {
            id: 'humanities-english',
            name: 'Humanities: English'
          },
          {
            id: 'humanities-hindi',
            name: 'Humanities: Hindi'
          },
          {
            id: 'humanities-sanskrit',
            name: 'Humanities: Sanskrit'
          },
          {
            id: 'humanities-other-languages',
            name: 'Humanities: Other Languages'
          },
          {
            id: 'social-sciences-economics',
            name: 'Social Sciences: Economics'
          },
          {
            id: 'social-sciences-social-work',
            name: 'Social Sciences: Social Work'
          },
          {
            id: 'social-sciences-education',
            name: 'Social Sciences: Education'
          },
          {
            id: 'social-sciences-public-administration',
            name: 'Social Sciences: Public Administration'
          },
          {
            id: 'social-sciences-anthropology',
            name: 'Social Sciences: Anthropology'
          },
          {
            id: 'law-law',
            name: 'Law: Law'
          },
          {
            id: 'media-journalism',
            name: 'Media: Journalism'
          },
          {
            id: 'media-mass-communication',
            name: 'Media: Mass Communication'
          },
          {
            id: 'library-library-information-science',
            name: 'Library: Library & Information Science'
          },
          {
            id: 'arts-music',
            name: 'Arts: Music'
          },
          {
            id: 'arts-dance',
            name: 'Arts: Dance'
          },
          {
            id: 'arts-fine-arts',
            name: 'Arts: Fine Arts'
          },
          {
            id: 'arts-theatre',
            name: 'Arts: Theatre'
          },
          {
            id: 'other-agriculture',
            name: 'Other: Agriculture'
          },
          {
            id: 'other-physical-education',
            name: 'Other: Physical Education'
          },
          {
            id: 'other-tourism',
            name: 'Other: Tourism'
          },
          {
            id: 'other-engineering-related-disciplines',
            name: 'Other: Engineering-Related Disciplines'
          },
          {
            id: 'other-other-nta-listed-postgraduate-papers',
            name: 'Other: Other NTA-Listed Postgraduate Papers'
          }
        ]
    },
    // DU SOL MBA
    // ==========================================
    "sol-mba-sem1": {
        name: "Semester 1",
        category_id: "sol-mba",
        short_description: "DU SOL MBA Semester 1 Core Subjects",
        about: "Distance learning MBA from Delhi University School of Open Learning (Semester 1).",
        pattern: "<ul><li><b>Core Subjects:</b> 8 Papers</li></ul>",
        eligibility: "<p>Enrolled in DU SOL MBA.</p>",
        syllabus: "<p>Core foundational subjects for management.</p>",
        dates: "<p>Check SOL Website</p>",
        links: "<a href=\"https://sol.du.ac.in/\" target=\"_blank\">Official SOL Website</a>",
        subjects: [
            { id: "sem1-ob", name: "Organisational Behavior" },
            { id: "sem1-da", name: "Data Analysis and Decision Tools" },
            { id: "sem1-me", name: "Managerial Economics" },
            { id: "sem1-am", name: "Accounting for Managers" },
            { id: "sem1-mm", name: "Marketing Management" },
            { id: "sem1-hr", name: "Human Resource Management" },
            { id: "sem1-bc", name: "Business Communication" },
            { id: "sem1-it", name: "Information Technology Management" }
        ]
    },
    "sol-mba-sem2": {
        name: "Semester 2",
        category_id: "sol-mba",
        short_description: "DU SOL MBA Semester 2 Core Subjects",
        about: "Distance learning MBA from Delhi University School of Open Learning (Semester 2).",
        pattern: "<ul><li><b>Core Subjects:</b> 8 Papers</li></ul>",
        eligibility: "<p>Cleared Sem 1.</p>",
        syllabus: "<p>Core intermediate subjects for management.</p>",
        dates: "<p>Check SOL Website</p>",
        links: "<a href=\"https://sol.du.ac.in/\" target=\"_blank\">Official SOL Website</a>",
        subjects: [
            { id: "sem2-oec", name: "Organisation Effectiveness and Change" },
            { id: "sem2-dmo", name: "Decision Modelling and Optimisation" },
            { id: "sem2-eeb", name: "Economic Environment of Business" },
            { id: "sem2-cf", name: "Corporate Finance" },
            { id: "sem2-ma", name: "Management Accounting" },
            { id: "sem2-pom", name: "Production and Operations Management" },
            { id: "sem2-mr", name: "Marketing Research" },
            { id: "sem2-mis", name: "Management of Information Systems" }
        ]
    },
    "sol-mba-sem3": {
        name: "Semester 3",
        category_id: "sol-mba",
        short_description: "DU SOL MBA Semester 3 (Core + Electives)",
        about: "Distance learning MBA from Delhi University School of Open Learning (Semester 3).",
        pattern: "<ul><li><b>Core + Specializations:</b> Finance, Marketing, HR</li></ul>",
        eligibility: "<p>Enrolled in Year 2.</p>",
        syllabus: "<p>Core and Elective subjects.</p>",
        dates: "<p>Check SOL Website</p>",
        links: "<a href=\"https://sol.du.ac.in/\" target=\"_blank\">Official SOL Website</a>",
        subjects: [
            { id: "sem3-c1", name: "Core: Business Ethics and Sustainability" },
            { id: "sem3-c2", name: "Core: Strategic Analysis" },
            { id: "sem3-c3", name: "Core: Entrepreneurship, Creativity and Innovation" },
            { id: "sem3-f1", name: "Finance: Security Analysis and Portfolio Management" },
            { id: "sem3-f2", name: "Finance: International Financial Management" },
            { id: "sem3-f3", name: "Finance: Financial Derivatives" },
            { id: "sem3-f4", name: "Finance: Financial Markets and Institutions" },
            { id: "sem3-f5", name: "Finance: Mergers and Corporate Restructuring" },
            { id: "sem3-m1", name: "Marketing: Consumer Behavior" },
            { id: "sem3-m2", name: "Marketing: Advertising Management" },
            { id: "sem3-m3", name: "Marketing: Services Marketing" },
            { id: "sem3-m4", name: "Marketing: Brand Management" },
            { id: "sem3-m5", name: "Marketing: Digital Marketing" },
            { id: "sem3-hr1", name: "OB & HRM: Performance Management and Training" },
            { id: "sem3-hr2", name: "OB & HRM: Compensation and Rewards Management" },
            { id: "sem3-hr3", name: "OB & HRM: Human Resource Development" },
            { id: "sem3-hr4", name: "OB & HRM: Cross Cultural and Global Management" },
            { id: "sem3-hr5", name: "OB & HRM: Leadership, Power and Politics" },
            { id: "sem3-a1", name: "Additional: Predictive Analytics and Big Data" },
            { id: "sem3-a2", name: "Additional: Artificial Intelligence and Deep Learning" },
            { id: "sem3-a3", name: "Additional: Managing HR in Start-ups" },
            { id: "sem3-a4", name: "Additional: Economics of Innovation" },
            { id: "sem3-a5", name: "Additional: Business Process Re-engineering" }
        ]
    },
    "sol-mba-sem4": {
        name: "Semester 4",
        category_id: "sol-mba",
        short_description: "DU SOL MBA Semester 4 (Core + Electives)",
        about: "Distance learning MBA from Delhi University School of Open Learning (Semester 4).",
        pattern: "<ul><li><b>Core + Specializations:</b> Finance, Marketing, HR, Ops</li></ul>",
        eligibility: "<p>Cleared Sem 3.</p>",
        syllabus: "<p>Core and Elective subjects.</p>",
        dates: "<p>Check SOL Website</p>",
        links: "<a href=\"https://sol.du.ac.in/\" target=\"_blank\">Official SOL Website</a>",
        subjects: [
            { id: "sem4-c1", name: "Core: Legal Environment of Business" },
            { id: "sem4-c2", name: "Core: Strategic Management" },
            { id: "sem4-c3", name: "Core: Global Business Management" },
            { id: "sem4-f1", name: "Finance: Quantitative Analysis of Financial Decisions" },
            { id: "sem4-f2", name: "Finance: Merchant Banking and Financial Services" },
            { id: "sem4-f3", name: "Finance: Financial Risk Management" },
            { id: "sem4-f4", name: "Finance: Fixed Income Securities" },
            { id: "sem4-f5", name: "Finance: Financial Reporting" },
            { id: "sem4-m1", name: "Marketing: Competitive Marketing" },
            { id: "sem4-m2", name: "Marketing: Business Marketing" },
            { id: "sem4-m3", name: "Marketing: Sales Force Management" },
            { id: "sem4-m4", name: "Marketing: Marketing Analytics" },
            { id: "sem4-m5", name: "Marketing: Rural Marketing" },
            { id: "sem4-hr1", name: "OB & HRM: Human Resource Metrics and Analytics" },
            { id: "sem4-hr2", name: "OB & HRM: Managing Interpersonal and Group Processes" },
            { id: "sem4-hr3", name: "OB & HRM: Counseling Skills for Managers" },
            { id: "sem4-hr4", name: "OB & HRM: Management of Industrial Relations" },
            { id: "sem4-hr5", name: "OB & HRM: Negotiation and Influence Skills" },
            { id: "sem4-o1", name: "Ops: Operations Strategy" },
            { id: "sem4-o2", name: "Ops: Technology, Innovation and New Product Management" },
            { id: "sem4-o3", name: "Ops: System Optimization and Management Science" },
            { id: "sem4-o4", name: "Ops: Supply Chain Analytics" },
            { id: "sem4-o5", name: "Ops: Supply Chain Management" },
            { id: "sem4-s1", name: "Strategy: Strategic Capability Building and Innovation" },
            { id: "sem4-s2", name: "Strategy: Strategic Management in Social Enterprises" },
            { id: "sem4-s3", name: "Strategy: International Business Strategy" },
            { id: "sem4-s4", name: "Strategy: Strategic Management of Startups" },
            { id: "sem4-s5", name: "Strategy: Strategic Innovation in Health Care and Education" }
        ]
    }
};
window.getExamData = function(slug) {
    if (window.MOCK_EXAM_DATA[slug]) {
        return window.MOCK_EXAM_DATA[slug];
    }
    
    // Auto-generate generic profile for missing exams based on Master Database Structure
    return {
        name: slug.toUpperCase().replace(/-/g, ' '),
        category_id: 'general',
        short_description: 'Details sourced from ' + currentYear + ' notifications.',
        about: 'Detailed information for this exam is loaded dynamically based on the latest official notification from the conducting body.',
        pattern: '<p>Exam pattern details are currently being verified from ' + currentYear + ' official documents.</p>',
        eligibility: '<p>Please refer to the official notification for exact eligibility criteria.</p>',
        syllabus: '<p>Syllabus mapped directly to official sources.</p>',
        dates: '<p>Specific dates are released in the latest official notification.<br><i>Check Official Links for exact calendar.</i></p>',
        links: '<p>Official links provided below when available.</p>',
        subjects: [
            { id: 'paper-1', name: 'Paper 1 (General/Aptitude)' },
            { id: 'paper-2', name: 'Paper 2 (Core/Subject Specific)' },
            { id: 'mock', name: 'Full Length Mocks' }
        ]
    };
};

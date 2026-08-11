
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
            id: 'optional-subjects-agriculture',
            name: 'Optional Subjects: Agriculture'
          },
          {
            id: 'optional-subjects-animal-husbandry-veterinary-science',
            name: 'Optional Subjects: Animal Husbandry & Veterinary Science'
          },
          {
            id: 'optional-subjects-anthropology',
            name: 'Optional Subjects: Anthropology'
          },
          {
            id: 'optional-subjects-botany',
            name: 'Optional Subjects: Botany'
          },
          {
            id: 'optional-subjects-chemistry',
            name: 'Optional Subjects: Chemistry'
          },
          {
            id: 'optional-subjects-civil-engineering',
            name: 'Optional Subjects: Civil Engineering'
          },
          {
            id: 'optional-subjects-commerce-accountancy',
            name: 'Optional Subjects: Commerce & Accountancy'
          },
          {
            id: 'optional-subjects-economics',
            name: 'Optional Subjects: Economics'
          },
          {
            id: 'optional-subjects-electrical-engineering',
            name: 'Optional Subjects: Electrical Engineering'
          },
          {
            id: 'optional-subjects-geography',
            name: 'Optional Subjects: Geography'
          },
          {
            id: 'optional-subjects-geology',
            name: 'Optional Subjects: Geology'
          },
          {
            id: 'optional-subjects-history',
            name: 'Optional Subjects: History'
          },
          {
            id: 'optional-subjects-law',
            name: 'Optional Subjects: Law'
          },
          {
            id: 'optional-subjects-management',
            name: 'Optional Subjects: Management'
          },
          {
            id: 'optional-subjects-mathematics',
            name: 'Optional Subjects: Mathematics'
          },
          {
            id: 'optional-subjects-mechanical-engineering',
            name: 'Optional Subjects: Mechanical Engineering'
          },
          {
            id: 'optional-subjects-medical-science',
            name: 'Optional Subjects: Medical Science'
          },
          {
            id: 'optional-subjects-philosophy',
            name: 'Optional Subjects: Philosophy'
          },
          {
            id: 'optional-subjects-physics',
            name: 'Optional Subjects: Physics'
          },
          {
            id: 'optional-subjects-political-science-international-relations',
            name: 'Optional Subjects: Political Science & International Relations'
          },
          {
            id: 'optional-subjects-psychology',
            name: 'Optional Subjects: Psychology'
          },
          {
            id: 'optional-subjects-public-administration',
            name: 'Optional Subjects: Public Administration'
          },
          {
            id: 'optional-subjects-sociology',
            name: 'Optional Subjects: Sociology'
          },
          {
            id: 'optional-subjects-statistics',
            name: 'Optional Subjects: Statistics'
          },
          {
            id: 'optional-subjects-zoology',
            name: 'Optional Subjects: Zoology'
          },
          {
            id: 'literature-optionals-assamese',
            name: 'Literature Optionals: Assamese'
          },
          {
            id: 'literature-optionals-bengali',
            name: 'Literature Optionals: Bengali'
          },
          {
            id: 'literature-optionals-bodo',
            name: 'Literature Optionals: Bodo'
          },
          {
            id: 'literature-optionals-dogri',
            name: 'Literature Optionals: Dogri'
          },
          {
            id: 'literature-optionals-english',
            name: 'Literature Optionals: English'
          },
          {
            id: 'literature-optionals-gujarati',
            name: 'Literature Optionals: Gujarati'
          },
          {
            id: 'literature-optionals-hindi',
            name: 'Literature Optionals: Hindi'
          },
          {
            id: 'literature-optionals-kannada',
            name: 'Literature Optionals: Kannada'
          },
          {
            id: 'literature-optionals-kashmiri',
            name: 'Literature Optionals: Kashmiri'
          },
          {
            id: 'literature-optionals-konkani',
            name: 'Literature Optionals: Konkani'
          },
          {
            id: 'literature-optionals-maithili',
            name: 'Literature Optionals: Maithili'
          },
          {
            id: 'literature-optionals-malayalam',
            name: 'Literature Optionals: Malayalam'
          },
          {
            id: 'literature-optionals-manipuri',
            name: 'Literature Optionals: Manipuri'
          },
          {
            id: 'literature-optionals-marathi',
            name: 'Literature Optionals: Marathi'
          },
          {
            id: 'literature-optionals-nepali',
            name: 'Literature Optionals: Nepali'
          },
          {
            id: 'literature-optionals-odia',
            name: 'Literature Optionals: Odia'
          },
          {
            id: 'literature-optionals-punjabi',
            name: 'Literature Optionals: Punjabi'
          },
          {
            id: 'literature-optionals-sanskrit',
            name: 'Literature Optionals: Sanskrit'
          },
          {
            id: 'literature-optionals-santhali',
            name: 'Literature Optionals: Santhali'
          },
          {
            id: 'literature-optionals-sindhi',
            name: 'Literature Optionals: Sindhi'
          },
          {
            id: 'literature-optionals-tamil',
            name: 'Literature Optionals: Tamil'
          },
          {
            id: 'literature-optionals-telugu',
            name: 'Literature Optionals: Telugu'
          },
          {
            id: 'literature-optionals-urdu',
            name: 'Literature Optionals: Urdu'
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
            id: 'mains-optional-subject-s-as-prescribed-by-current-scheme',
            name: 'Mains: Optional Subject(s) — as prescribed by current scheme'
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
            id: 'optional-subjects-agriculture',
            name: 'Optional Subjects: Agriculture'
          },
          {
            id: 'optional-subjects-animal-husbandry-veterinary-science',
            name: 'Optional Subjects: Animal Husbandry & Veterinary Science'
          },
          {
            id: 'optional-subjects-anthropology',
            name: 'Optional Subjects: Anthropology'
          },
          {
            id: 'optional-subjects-botany',
            name: 'Optional Subjects: Botany'
          },
          {
            id: 'optional-subjects-chemistry',
            name: 'Optional Subjects: Chemistry'
          },
          {
            id: 'optional-subjects-civil-engineering',
            name: 'Optional Subjects: Civil Engineering'
          },
          {
            id: 'optional-subjects-commerce-accountancy',
            name: 'Optional Subjects: Commerce & Accountancy'
          },
          {
            id: 'optional-subjects-economics',
            name: 'Optional Subjects: Economics'
          },
          {
            id: 'optional-subjects-electrical-engineering',
            name: 'Optional Subjects: Electrical Engineering'
          },
          {
            id: 'optional-subjects-geography',
            name: 'Optional Subjects: Geography'
          },
          {
            id: 'optional-subjects-geology',
            name: 'Optional Subjects: Geology'
          },
          {
            id: 'optional-subjects-history',
            name: 'Optional Subjects: History'
          },
          {
            id: 'optional-subjects-labour-social-welfare',
            name: 'Optional Subjects: Labour & Social Welfare'
          },
          {
            id: 'optional-subjects-law',
            name: 'Optional Subjects: Law'
          },
          {
            id: 'optional-subjects-management',
            name: 'Optional Subjects: Management'
          },
          {
            id: 'optional-subjects-mathematics',
            name: 'Optional Subjects: Mathematics'
          },
          {
            id: 'optional-subjects-mechanical-engineering',
            name: 'Optional Subjects: Mechanical Engineering'
          },
          {
            id: 'optional-subjects-philosophy',
            name: 'Optional Subjects: Philosophy'
          },
          {
            id: 'optional-subjects-physics',
            name: 'Optional Subjects: Physics'
          },
          {
            id: 'optional-subjects-political-science-international-relations',
            name: 'Optional Subjects: Political Science & International Relations'
          },
          {
            id: 'optional-subjects-psychology',
            name: 'Optional Subjects: Psychology'
          },
          {
            id: 'optional-subjects-public-administration',
            name: 'Optional Subjects: Public Administration'
          },
          {
            id: 'optional-subjects-sociology',
            name: 'Optional Subjects: Sociology'
          },
          {
            id: 'optional-subjects-statistics',
            name: 'Optional Subjects: Statistics'
          },
          {
            id: 'optional-subjects-zoology',
            name: 'Optional Subjects: Zoology'
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
            name: 'Mains: Optional / prescribed subject papers'
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
            name: 'Tier Ii: Mathematical Abilities'
          },
          {
            id: 'tier-ii-reasoning-general-intelligence',
            name: 'Tier Ii: Reasoning & General Intelligence'
          },
          {
            id: 'tier-ii-english-language-comprehension',
            name: 'Tier Ii: English Language & Comprehension'
          },
          {
            id: 'tier-ii-general-awareness',
            name: 'Tier Ii: General Awareness'
          },
          {
            id: 'tier-ii-computer-knowledge',
            name: 'Tier Ii: Computer Knowledge'
          },
          {
            id: 'tier-ii-data-entry-speed-test',
            name: 'Tier Ii: Data Entry Speed Test'
          },
          {
            id: 'additional-papers-statistics',
            name: 'Additional Papers: Statistics'
          },
          {
            id: 'additional-papers-general-studies-finance-economics',
            name: 'Additional Papers: General Studies — Finance & Economics'
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
            name: 'Tier Ii: Mathematical Abilities'
          },
          {
            id: 'tier-ii-reasoning-general-intelligence',
            name: 'Tier Ii: Reasoning & General Intelligence'
          },
          {
            id: 'tier-ii-english-language-comprehension',
            name: 'Tier Ii: English Language & Comprehension'
          },
          {
            id: 'tier-ii-general-awareness',
            name: 'Tier Ii: General Awareness'
          },
          {
            id: 'tier-ii-computer-knowledge',
            name: 'Tier Ii: Computer Knowledge'
          },
          {
            id: 'tier-ii-skill-test-typing-test',
            name: 'Tier Ii: Skill Test / Typing Test'
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
            id: 'session-i-numerical-mathematical-ability',
            name: 'Session I: Numerical & Mathematical Ability'
          },
          {
            id: 'session-i-reasoning-ability-problem-solving',
            name: 'Session I: Reasoning Ability & Problem Solving'
          },
          {
            id: 'session-ii-general-awareness',
            name: 'Session Ii: General Awareness'
          },
          {
            id: 'session-ii-english-language-comprehension',
            name: 'Session Ii: English Language & Comprehension'
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
            name: 'Paper Ii: English Language & Comprehension'
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
            id: 'phase-i-economic-social-issues',
            name: 'Phase I: Economic & Social Issues'
          },
          {
            id: 'phase-i-english-writing-skills',
            name: 'Phase I: English — Writing Skills'
          },
          {
            id: 'phase-i-finance-management',
            name: 'Phase I: Finance & Management'
          },
          {
            id: 'specialist-streams-economics-depr',
            name: 'Specialist Streams: Economics — DEPR'
          },
          {
            id: 'specialist-streams-statistics-data-science-dsim',
            name: 'Specialist Streams: Statistics / Data Science — DSIM'
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
            id: 'specialist-streams-agriculture',
            name: 'Specialist Streams: Agriculture'
          },
          {
            id: 'specialist-streams-agriculture-engineering',
            name: 'Specialist Streams: Agriculture Engineering'
          },
          {
            id: 'specialist-streams-land-development',
            name: 'Specialist Streams: Land Development'
          },
          {
            id: 'specialist-streams-fisheries',
            name: 'Specialist Streams: Fisheries'
          },
          {
            id: 'specialist-streams-food-processing',
            name: 'Specialist Streams: Food Processing'
          },
          {
            id: 'specialist-streams-forestry',
            name: 'Specialist Streams: Forestry'
          },
          {
            id: 'specialist-streams-environmental-science',
            name: 'Specialist Streams: Environmental Science'
          },
          {
            id: 'specialist-streams-finance',
            name: 'Specialist Streams: Finance'
          },
          {
            id: 'specialist-streams-computer-it',
            name: 'Specialist Streams: Computer / IT'
          },
          {
            id: 'specialist-streams-economics',
            name: 'Specialist Streams: Economics'
          },
          {
            id: 'specialist-streams-statistics',
            name: 'Specialist Streams: Statistics'
          },
          {
            id: 'specialist-streams-legal',
            name: 'Specialist Streams: Legal'
          },
          {
            id: 'specialist-streams-other-notified-disciplines',
            name: 'Specialist Streams: Other notified disciplines'
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
            name: 'Post-specific: Typing Skill Test'
          },
          {
            id: 'post-specific-computer-based-aptitude-test',
            name: 'Post-specific: Computer Based Aptitude Test'
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
            id: 'cbt-1-mathematics',
            name: 'Cbt 1: Mathematics'
          },
          {
            id: 'cbt-1-mental-ability',
            name: 'Cbt 1: Mental Ability'
          },
          {
            id: 'cbt-1-general-science',
            name: 'Cbt 1: General Science'
          },
          {
            id: 'cbt-1-general-awareness-current-affairs',
            name: 'Cbt 1: General Awareness & Current Affairs'
          },
          {
            id: 'cbt-2-mathematics',
            name: 'Cbt 2: Mathematics'
          },
          {
            id: 'cbt-2-general-intelligence-reasoning',
            name: 'Cbt 2: General Intelligence & Reasoning'
          },
          {
            id: 'cbt-2-basic-science-engineering',
            name: 'Cbt 2: Basic Science & Engineering'
          },
          {
            id: 'cbt-2-general-awareness',
            name: 'Cbt 2: General Awareness'
          },
          {
            id: 'part-b-trade-specific-subject',
            name: 'Part B: Trade-Specific Subject'
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
            id: 'paper-i-mathematics',
            name: 'Paper I: Mathematics'
          },
          {
            id: 'paper-ii-english',
            name: 'Paper Ii: English'
          },
          {
            id: 'paper-ii-physics',
            name: 'Paper Ii: Physics'
          },
          {
            id: 'paper-ii-chemistry',
            name: 'Paper Ii: Chemistry'
          },
          {
            id: 'paper-ii-general-science',
            name: 'Paper Ii: General Science'
          },
          {
            id: 'paper-ii-history',
            name: 'Paper Ii: History'
          },
          {
            id: 'paper-ii-geography',
            name: 'Paper Ii: Geography'
          },
          {
            id: 'paper-ii-current-events',
            name: 'Paper Ii: Current Events'
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
            id: 'ima-ina-afa-english',
            name: 'Ima / Ina / Afa: English'
          },
          {
            id: 'ima-ina-afa-general-knowledge',
            name: 'Ima / Ina / Afa: General Knowledge'
          },
          {
            id: 'ima-ina-afa-elementary-mathematics',
            name: 'Ima / Ina / Afa: Elementary Mathematics'
          },
          {
            id: 'ota-english',
            name: 'Ota: English'
          },
          {
            id: 'ota-general-knowledge',
            name: 'Ota: General Knowledge'
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
            id: 'office-assistant-store-keeper-general-knowledge',
            name: 'Office Assistant / Store Keeper: General Knowledge'
          },
          {
            id: 'office-assistant-store-keeper-general-science',
            name: 'Office Assistant / Store Keeper: General Science'
          },
          {
            id: 'office-assistant-store-keeper-mathematics',
            name: 'Office Assistant / Store Keeper: Mathematics'
          },
          {
            id: 'office-assistant-store-keeper-computer',
            name: 'Office Assistant / Store Keeper: Computer'
          },
          {
            id: 'office-assistant-store-keeper-general-reasoning',
            name: 'Office Assistant / Store Keeper: General Reasoning'
          },
          {
            id: 'office-assistant-store-keeper-english',
            name: 'Office Assistant / Store Keeper: English'
          },
          {
            id: 'other-trades-trade-specific-subjects',
            name: 'Other Trades: Trade-Specific Subjects'
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
          },
          {
            id: 'mathematics',
            name: 'Mathematics'
          },
          {
            id: 'aptitude-test',
            name: 'Aptitude Test'
          },
          {
            id: 'drawing-test',
            name: 'Drawing Test'
          },
          {
            id: 'mathematics',
            name: 'Mathematics'
          },
          {
            id: 'aptitude-test',
            name: 'Aptitude Test'
          },
          {
            id: 'planning',
            name: 'Planning'
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
            id: 'common-general-aptitude',
            name: 'Common: General Aptitude'
          },
          {
            id: 'test-papers-aerospace-engineering',
            name: 'Test Papers: Aerospace Engineering'
          },
          {
            id: 'test-papers-agricultural-engineering',
            name: 'Test Papers: Agricultural Engineering'
          },
          {
            id: 'test-papers-architecture-planning',
            name: 'Test Papers: Architecture & Planning'
          },
          {
            id: 'test-papers-biomedical-engineering',
            name: 'Test Papers: Biomedical Engineering'
          },
          {
            id: 'test-papers-biotechnology',
            name: 'Test Papers: Biotechnology'
          },
          {
            id: 'test-papers-civil-engineering',
            name: 'Test Papers: Civil Engineering'
          },
          {
            id: 'test-papers-chemical-engineering',
            name: 'Test Papers: Chemical Engineering'
          },
          {
            id: 'test-papers-computer-science-information-technology',
            name: 'Test Papers: Computer Science & Information Technology'
          },
          {
            id: 'test-papers-chemistry',
            name: 'Test Papers: Chemistry'
          },
          {
            id: 'test-papers-data-science-artificial-intelligence',
            name: 'Test Papers: Data Science & Artificial Intelligence'
          },
          {
            id: 'test-papers-electronics-communication-engineering',
            name: 'Test Papers: Electronics & Communication Engineering'
          },
          {
            id: 'test-papers-electrical-engineering',
            name: 'Test Papers: Electrical Engineering'
          },
          {
            id: 'test-papers-environmental-science-engineering',
            name: 'Test Papers: Environmental Science & Engineering'
          },
          {
            id: 'test-papers-ecology-evolution',
            name: 'Test Papers: Ecology & Evolution'
          },
          {
            id: 'test-papers-geomatics-engineering',
            name: 'Test Papers: Geomatics Engineering'
          },
          {
            id: 'test-papers-geology-geophysics',
            name: 'Test Papers: Geology & Geophysics'
          },
          {
            id: 'test-papers-instrumentation-engineering',
            name: 'Test Papers: Instrumentation Engineering'
          },
          {
            id: 'test-papers-mathematics',
            name: 'Test Papers: Mathematics'
          },
          {
            id: 'test-papers-mechanical-engineering',
            name: 'Test Papers: Mechanical Engineering'
          },
          {
            id: 'test-papers-mining-engineering',
            name: 'Test Papers: Mining Engineering'
          },
          {
            id: 'test-papers-naval-architecture-marine-engineering',
            name: 'Test Papers: Naval Architecture & Marine Engineering'
          },
          {
            id: 'test-papers-petroleum-engineering',
            name: 'Test Papers: Petroleum Engineering'
          },
          {
            id: 'test-papers-physics',
            name: 'Test Papers: Physics'
          },
          {
            id: 'test-papers-production-industrial-engineering',
            name: 'Test Papers: Production & Industrial Engineering'
          },
          {
            id: 'test-papers-metallurgical-engineering',
            name: 'Test Papers: Metallurgical Engineering'
          },
          {
            id: 'test-papers-statistics',
            name: 'Test Papers: Statistics'
          },
          {
            id: 'test-papers-textile-engineering-fibre-science',
            name: 'Test Papers: Textile Engineering & Fibre Science'
          },
          {
            id: 'test-papers-engineering-sciences',
            name: 'Test Papers: Engineering Sciences'
          },
          {
            id: 'test-papers-humanities-social-sciences',
            name: 'Test Papers: Humanities & Social Sciences'
          },
          {
            id: 'test-papers-life-sciences',
            name: 'Test Papers: Life Sciences'
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
            id: 'paper-1-economics',
            name: 'Paper 1: Economics'
          },
          {
            id: 'paper-1-political-science',
            name: 'Paper 1: Political Science'
          },
          {
            id: 'paper-1-philosophy',
            name: 'Paper 1: Philosophy'
          },
          {
            id: 'paper-1-psychology',
            name: 'Paper 1: Psychology'
          },
          {
            id: 'paper-1-sociology',
            name: 'Paper 1: Sociology'
          },
          {
            id: 'paper-1-history',
            name: 'Paper 1: History'
          },
          {
            id: 'paper-1-anthropology',
            name: 'Paper 1: Anthropology'
          },
          {
            id: 'paper-1-commerce',
            name: 'Paper 1: Commerce'
          },
          {
            id: 'paper-1-education',
            name: 'Paper 1: Education'
          },
          {
            id: 'paper-1-social-work',
            name: 'Paper 1: Social Work'
          },
          {
            id: 'paper-1-defence-strategic-studies',
            name: 'Paper 1: Defence & Strategic Studies'
          },
          {
            id: 'paper-1-home-science',
            name: 'Paper 1: Home Science'
          },
          {
            id: 'paper-1-public-administration',
            name: 'Paper 1: Public Administration'
          },
          {
            id: 'paper-1-population-studies',
            name: 'Paper 1: Population Studies'
          },
          {
            id: 'paper-1-music',
            name: 'Paper 1: Music'
          },
          {
            id: 'paper-1-management',
            name: 'Paper 1: Management'
          },
          {
            id: 'paper-1-maithili',
            name: 'Paper 1: Maithili'
          },
          {
            id: 'paper-1-bengali',
            name: 'Paper 1: Bengali'
          },
          {
            id: 'paper-1-hindi',
            name: 'Paper 1: Hindi'
          },
          {
            id: 'paper-1-kannada',
            name: 'Paper 1: Kannada'
          },
          {
            id: 'paper-1-malayalam',
            name: 'Paper 1: Malayalam'
          },
          {
            id: 'paper-1-odia',
            name: 'Paper 1: Odia'
          },
          {
            id: 'paper-1-punjabi',
            name: 'Paper 1: Punjabi'
          },
          {
            id: 'paper-1-sanskrit',
            name: 'Paper 1: Sanskrit'
          },
          {
            id: 'paper-1-tamil',
            name: 'Paper 1: Tamil'
          },
          {
            id: 'paper-1-telugu',
            name: 'Paper 1: Telugu'
          },
          {
            id: 'paper-1-urdu',
            name: 'Paper 1: Urdu'
          },
          {
            id: 'paper-1-arabic',
            name: 'Paper 1: Arabic'
          },
          {
            id: 'paper-1-english',
            name: 'Paper 1: English'
          },
          {
            id: 'paper-1-linguistics',
            name: 'Paper 1: Linguistics'
          },
          {
            id: 'paper-1-chinese',
            name: 'Paper 1: Chinese'
          },
          {
            id: 'paper-1-dogri',
            name: 'Paper 1: Dogri'
          },
          {
            id: 'paper-1-nepali',
            name: 'Paper 1: Nepali'
          },
          {
            id: 'paper-1-manipuri',
            name: 'Paper 1: Manipuri'
          },
          {
            id: 'paper-1-assamese',
            name: 'Paper 1: Assamese'
          },
          {
            id: 'paper-1-gujarati',
            name: 'Paper 1: Gujarati'
          },
          {
            id: 'paper-1-marathi',
            name: 'Paper 1: Marathi'
          },
          {
            id: 'paper-1-french',
            name: 'Paper 1: French'
          },
          {
            id: 'paper-1-spanish',
            name: 'Paper 1: Spanish'
          },
          {
            id: 'paper-1-russian',
            name: 'Paper 1: Russian'
          },
          {
            id: 'paper-1-persian',
            name: 'Paper 1: Persian'
          },
          {
            id: 'paper-1-rajasthani',
            name: 'Paper 1: Rajasthani'
          },
          {
            id: 'paper-1-german',
            name: 'Paper 1: German'
          },
          {
            id: 'paper-1-japanese',
            name: 'Paper 1: Japanese'
          },
          {
            id: 'paper-1-adult-education',
            name: 'Paper 1: Adult Education'
          },
          {
            id: 'paper-1-physical-education',
            name: 'Paper 1: Physical Education'
          },
          {
            id: 'paper-1-arab-culture-islamic-studies',
            name: 'Paper 1: Arab Culture & Islamic Studies'
          },
          {
            id: 'paper-1-indian-culture',
            name: 'Paper 1: Indian Culture'
          },
          {
            id: 'paper-1-labour-welfare-hrm-industrial-relations',
            name: 'Paper 1: Labour Welfare / HRM / Industrial Relations'
          },
          {
            id: 'paper-1-law',
            name: 'Paper 1: Law'
          },
          {
            id: 'paper-1-library-information-science',
            name: 'Paper 1: Library & Information Science'
          },
          {
            id: 'paper-1-buddhist-jaina-gandhian-peace-studies',
            name: 'Paper 1: Buddhist, Jaina, Gandhian & Peace Studies'
          },
          {
            id: 'paper-1-comparative-study-of-religions',
            name: 'Paper 1: Comparative Study of Religions'
          },
          {
            id: 'paper-1-mass-communication-journalism',
            name: 'Paper 1: Mass Communication & Journalism'
          },
          {
            id: 'paper-1-performing-arts',
            name: 'Paper 1: Performing Arts'
          },
          {
            id: 'paper-1-museology-conservation',
            name: 'Paper 1: Museology & Conservation'
          },
          {
            id: 'paper-1-archaeology',
            name: 'Paper 1: Archaeology'
          },
          {
            id: 'paper-1-criminology',
            name: 'Paper 1: Criminology'
          },
          {
            id: 'paper-1-tribal-regional-language-literature',
            name: 'Paper 1: Tribal & Regional Language / Literature'
          },
          {
            id: 'paper-1-folk-literature',
            name: 'Paper 1: Folk Literature'
          },
          {
            id: 'paper-1-comparative-literature',
            name: 'Paper 1: Comparative Literature'
          },
          {
            id: 'paper-1-sanskrit-traditional-subjects',
            name: 'Paper 1: Sanskrit Traditional Subjects'
          },
          {
            id: 'paper-1-women-studies',
            name: 'Paper 1: Women Studies'
          },
          {
            id: 'paper-1-visual-arts',
            name: 'Paper 1: Visual Arts'
          },
          {
            id: 'paper-1-geography',
            name: 'Paper 1: Geography'
          },
          {
            id: 'paper-1-social-medicine-community-health',
            name: 'Paper 1: Social Medicine & Community Health'
          },
          {
            id: 'paper-1-forensic-science',
            name: 'Paper 1: Forensic Science'
          },
          {
            id: 'paper-1-pali',
            name: 'Paper 1: Pali'
          },
          {
            id: 'paper-1-kashmiri',
            name: 'Paper 1: Kashmiri'
          },
          {
            id: 'paper-1-konkani',
            name: 'Paper 1: Konkani'
          },
          {
            id: 'paper-1-computer-science-applications',
            name: 'Paper 1: Computer Science & Applications'
          },
          {
            id: 'paper-1-electronic-science',
            name: 'Paper 1: Electronic Science'
          },
          {
            id: 'paper-1-environmental-sciences',
            name: 'Paper 1: Environmental Sciences'
          },
          {
            id: 'paper-1-international-area-studies',
            name: 'Paper 1: International & Area Studies'
          },
          {
            id: 'paper-1-prakrit',
            name: 'Paper 1: Prakrit'
          },
          {
            id: 'paper-1-human-rights-duties',
            name: 'Paper 1: Human Rights & Duties'
          },
          {
            id: 'paper-1-tourism-administration-management',
            name: 'Paper 1: Tourism Administration & Management'
          },
          {
            id: 'paper-1-bodo',
            name: 'Paper 1: Bodo'
          },
          {
            id: 'paper-1-santali',
            name: 'Paper 1: Santali'
          },
          {
            id: 'paper-1-yoga',
            name: 'Paper 1: Yoga'
          },
          {
            id: 'paper-1-sindhi',
            name: 'Paper 1: Sindhi'
          },
          {
            id: 'paper-1-hindu-studies',
            name: 'Paper 1: Hindu Studies'
          },
          {
            id: 'paper-1-indian-knowledge-system',
            name: 'Paper 1: Indian Knowledge System'
          },
          {
            id: 'paper-1-disaster-management',
            name: 'Paper 1: Disaster Management'
          },
          {
            id: 'paper-1-ayurveda-biology',
            name: 'Paper 1: Ayurveda Biology'
          },
          {
            id: 'paper-1-forestry',
            name: 'Paper 1: Forestry'
          },
          {
            id: 'paper-1-statistics',
            name: 'Paper 1: Statistics'
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
            name: 'Paper Ii: Child Development & Pedagogy'
          },
          {
            id: 'paper-ii-language-i',
            name: 'Paper Ii: Language I'
          },
          {
            id: 'paper-ii-language-ii',
            name: 'Paper Ii: Language II'
          },
          {
            id: 'paper-ii-mathematics-science',
            name: 'Paper Ii: Mathematics & Science'
          },
          {
            id: 'paper-ii-social-studies-social-science',
            name: 'Paper Ii: Social Studies / Social Science'
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
            name: 'Paper Ii: Child Development & Pedagogy'
          },
          {
            id: 'paper-ii-language-i',
            name: 'Paper Ii: Language I'
          },
          {
            id: 'paper-ii-language-ii',
            name: 'Paper Ii: Language II'
          },
          {
            id: 'paper-ii-mathematics-science',
            name: 'Paper Ii: Mathematics & Science'
          },
          {
            id: 'paper-ii-social-studies-social-science',
            name: 'Paper Ii: Social Studies / Social Science'
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
            name: 'Level Ii: Child Development & Pedagogy'
          },
          {
            id: 'level-ii-language-i',
            name: 'Level Ii: Language I'
          },
          {
            id: 'level-ii-language-ii',
            name: 'Level Ii: Language II'
          },
          {
            id: 'level-ii-mathematics-science',
            name: 'Level Ii: Mathematics & Science'
          },
          {
            id: 'level-ii-social-studies',
            name: 'Level Ii: Social Studies'
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
            id: 'clat-ug-english-language',
            name: 'Clat Ug: English Language'
          },
          {
            id: 'clat-ug-current-affairs-general-knowledge',
            name: 'Clat Ug: Current Affairs & General Knowledge'
          },
          {
            id: 'clat-ug-legal-reasoning',
            name: 'Clat Ug: Legal Reasoning'
          },
          {
            id: 'clat-ug-logical-reasoning',
            name: 'Clat Ug: Logical Reasoning'
          },
          {
            id: 'clat-ug-quantitative-techniques',
            name: 'Clat Ug: Quantitative Techniques'
          },
          {
            id: 'clat-pg-constitutional-law',
            name: 'Clat Pg: Constitutional Law'
          },
          {
            id: 'clat-pg-jurisprudence',
            name: 'Clat Pg: Jurisprudence'
          },
          {
            id: 'clat-pg-contract-law',
            name: 'Clat Pg: Contract Law'
          },
          {
            id: 'clat-pg-torts',
            name: 'Clat Pg: Torts'
          },
          {
            id: 'clat-pg-criminal-law',
            name: 'Clat Pg: Criminal Law'
          },
          {
            id: 'clat-pg-family-law',
            name: 'Clat Pg: Family Law'
          },
          {
            id: 'clat-pg-property-law',
            name: 'Clat Pg: Property Law'
          },
          {
            id: 'clat-pg-company-law',
            name: 'Clat Pg: Company Law'
          },
          {
            id: 'clat-pg-public-international-law',
            name: 'Clat Pg: Public International Law'
          },
          {
            id: 'clat-pg-tax-law',
            name: 'Clat Pg: Tax Law'
          },
          {
            id: 'clat-pg-environmental-law',
            name: 'Clat Pg: Environmental Law'
          },
          {
            id: 'clat-pg-labour-industrial-law',
            name: 'Clat Pg: Labour & Industrial Law'
          },
          {
            id: 'clat-pg-intellectual-property-law',
            name: 'Clat Pg: Intellectual Property Law'
          },
          {
            id: 'clat-pg-other-areas-prescribed-by-current-clat-pg-syllabus',
            name: 'Clat Pg: Other areas prescribed by current CLAT PG syllabus'
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
            id: 'ailet-ug-english-language',
            name: 'Ailet Ug: English Language'
          },
          {
            id: 'ailet-ug-current-affairs-general-knowledge',
            name: 'Ailet Ug: Current Affairs & General Knowledge'
          },
          {
            id: 'ailet-ug-logical-reasoning',
            name: 'Ailet Ug: Logical Reasoning'
          },
          {
            id: 'ailet-pg-constitutional-law',
            name: 'Ailet Pg: Constitutional Law'
          },
          {
            id: 'ailet-pg-jurisprudence',
            name: 'Ailet Pg: Jurisprudence'
          },
          {
            id: 'ailet-pg-contract-law',
            name: 'Ailet Pg: Contract Law'
          },
          {
            id: 'ailet-pg-torts',
            name: 'Ailet Pg: Torts'
          },
          {
            id: 'ailet-pg-criminal-law',
            name: 'Ailet Pg: Criminal Law'
          },
          {
            id: 'ailet-pg-family-law',
            name: 'Ailet Pg: Family Law'
          },
          {
            id: 'ailet-pg-property-law',
            name: 'Ailet Pg: Property Law'
          },
          {
            id: 'ailet-pg-company-law',
            name: 'Ailet Pg: Company Law'
          },
          {
            id: 'ailet-pg-international-law',
            name: 'Ailet Pg: International Law'
          },
          {
            id: 'ailet-pg-environmental-law',
            name: 'Ailet Pg: Environmental Law'
          },
          {
            id: 'ailet-pg-intellectual-property-law',
            name: 'Ailet Pg: Intellectual Property Law'
          },
          {
            id: 'ailet-pg-labour-law',
            name: 'Ailet Pg: Labour Law'
          },
          {
            id: 'ailet-pg-tax-law',
            name: 'Ailet Pg: Tax Law'
          },
          {
            id: 'ailet-pg-other-current-law-subjects',
            name: 'Ailet Pg: Other current law subjects'
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
            id: 'language-subjects-english',
            name: 'Language Subjects: English'
          },
          {
            id: 'language-subjects-hindi',
            name: 'Language Subjects: Hindi'
          },
          {
            id: 'language-subjects-assamese',
            name: 'Language Subjects: Assamese'
          },
          {
            id: 'language-subjects-bengali',
            name: 'Language Subjects: Bengali'
          },
          {
            id: 'language-subjects-gujarati',
            name: 'Language Subjects: Gujarati'
          },
          {
            id: 'language-subjects-kannada',
            name: 'Language Subjects: Kannada'
          },
          {
            id: 'language-subjects-malayalam',
            name: 'Language Subjects: Malayalam'
          },
          {
            id: 'language-subjects-marathi',
            name: 'Language Subjects: Marathi'
          },
          {
            id: 'language-subjects-odia',
            name: 'Language Subjects: Odia'
          },
          {
            id: 'language-subjects-punjabi',
            name: 'Language Subjects: Punjabi'
          },
          {
            id: 'language-subjects-tamil',
            name: 'Language Subjects: Tamil'
          },
          {
            id: 'language-subjects-telugu',
            name: 'Language Subjects: Telugu'
          },
          {
            id: 'language-subjects-urdu',
            name: 'Language Subjects: Urdu'
          },
          {
            id: 'language-subjects-other-nta-listed-languages',
            name: 'Language Subjects: Other NTA-listed languages'
          },
          {
            id: 'domain-subjects-accountancy',
            name: 'Domain Subjects: Accountancy'
          },
          {
            id: 'domain-subjects-agriculture',
            name: 'Domain Subjects: Agriculture'
          },
          {
            id: 'domain-subjects-anthropology',
            name: 'Domain Subjects: Anthropology'
          },
          {
            id: 'domain-subjects-biology',
            name: 'Domain Subjects: Biology'
          },
          {
            id: 'domain-subjects-business-studies',
            name: 'Domain Subjects: Business Studies'
          },
          {
            id: 'domain-subjects-chemistry',
            name: 'Domain Subjects: Chemistry'
          },
          {
            id: 'domain-subjects-computer-science-informatics-practices',
            name: 'Domain Subjects: Computer Science / Informatics Practices'
          },
          {
            id: 'domain-subjects-economics',
            name: 'Domain Subjects: Economics'
          },
          {
            id: 'domain-subjects-environmental-science',
            name: 'Domain Subjects: Environmental Science'
          },
          {
            id: 'domain-subjects-fine-arts',
            name: 'Domain Subjects: Fine Arts'
          },
          {
            id: 'domain-subjects-geography',
            name: 'Domain Subjects: Geography'
          },
          {
            id: 'domain-subjects-history',
            name: 'Domain Subjects: History'
          },
          {
            id: 'domain-subjects-home-science',
            name: 'Domain Subjects: Home Science'
          },
          {
            id: 'domain-subjects-knowledge-traditions',
            name: 'Domain Subjects: Knowledge Traditions'
          },
          {
            id: 'domain-subjects-legal-studies',
            name: 'Domain Subjects: Legal Studies'
          },
          {
            id: 'domain-subjects-mass-media-studies',
            name: 'Domain Subjects: Mass Media Studies'
          },
          {
            id: 'domain-subjects-mathematics-applied-mathematics',
            name: 'Domain Subjects: Mathematics / Applied Mathematics'
          },
          {
            id: 'domain-subjects-physical-education',
            name: 'Domain Subjects: Physical Education'
          },
          {
            id: 'domain-subjects-physics',
            name: 'Domain Subjects: Physics'
          },
          {
            id: 'domain-subjects-political-science',
            name: 'Domain Subjects: Political Science'
          },
          {
            id: 'domain-subjects-psychology',
            name: 'Domain Subjects: Psychology'
          },
          {
            id: 'domain-subjects-sociology',
            name: 'Domain Subjects: Sociology'
          },
          {
            id: 'domain-subjects-other-nta-listed-domain-subjects',
            name: 'Domain Subjects: Other NTA-listed domain subjects'
          },
          {
            id: 'general-aptitude-test-general-knowledge',
            name: 'General Aptitude Test: General Knowledge'
          },
          {
            id: 'general-aptitude-test-current-affairs',
            name: 'General Aptitude Test: Current Affairs'
          },
          {
            id: 'general-aptitude-test-general-mental-ability',
            name: 'General Aptitude Test: General Mental Ability'
          },
          {
            id: 'general-aptitude-test-numerical-ability',
            name: 'General Aptitude Test: Numerical Ability'
          },
          {
            id: 'general-aptitude-test-quantitative-reasoning',
            name: 'General Aptitude Test: Quantitative Reasoning'
          },
          {
            id: 'general-aptitude-test-logical-analytical-reasoning',
            name: 'General Aptitude Test: Logical & Analytical Reasoning'
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
            id: 'commerce-management-commerce',
            name: 'Commerce / Management: Commerce'
          },
          {
            id: 'commerce-management-management',
            name: 'Commerce / Management: Management'
          },
          {
            id: 'commerce-management-business-administration',
            name: 'Commerce / Management: Business Administration'
          },
          {
            id: 'commerce-management-finance',
            name: 'Commerce / Management: Finance'
          },
          {
            id: 'commerce-management-accounting',
            name: 'Commerce / Management: Accounting'
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
            id: 'library-information-library-information-science',
            name: 'Library / Information: Library & Information Science'
          },
          {
            id: 'performing-fine-arts-music',
            name: 'Performing / Fine Arts: Music'
          },
          {
            id: 'performing-fine-arts-dance',
            name: 'Performing / Fine Arts: Dance'
          },
          {
            id: 'performing-fine-arts-fine-arts',
            name: 'Performing / Fine Arts: Fine Arts'
          },
          {
            id: 'performing-fine-arts-theatre',
            name: 'Performing / Fine Arts: Theatre'
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
            name: 'Other: Engineering-related disciplines'
          },
          {
            id: 'other-other-nta-listed-postgraduate-test-papers',
            name: 'Other: Other NTA-listed postgraduate test papers'
          }
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

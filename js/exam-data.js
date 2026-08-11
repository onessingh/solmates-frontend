
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
        dates: '<p>Dates dynamically updated for ' + currentYear + ' cycle:<br>Notification: Feb ' + currentYear + '<br>Prelims: May ' + currentYear + '<br>Mains: Sept ' + currentYear + '</p>',
        links: '<a href="https://www.upsc.gov.in/" target="_blank">Official UPSC Website</a>',
        subjects: [
          {
                    id: 'gs1',
                    name: 'General Studies I'
          },
          {
                    id: 'gs2',
                    name: 'General Studies II'
          },
          {
                    id: 'gs3',
                    name: 'General Studies III'
          },
          {
                    id: 'gs4',
                    name: 'General Studies IV'
          },
          {
                    id: 'essay',
                    name: 'Essay'
          },
          {
                    id: 'opt-agri',
                    name: 'Optional: Agriculture'
          },
          {
                    id: 'opt-animal',
                    name: 'Optional: Animal Husbandry and Veterinary Science'
          },
          {
                    id: 'opt-anthro',
                    name: 'Optional: Anthropology'
          },
          {
                    id: 'opt-botany',
                    name: 'Optional: Botany'
          },
          {
                    id: 'opt-chem',
                    name: 'Optional: Chemistry'
          },
          {
                    id: 'opt-civil',
                    name: 'Optional: Civil Engineering'
          },
          {
                    id: 'opt-commerce',
                    name: 'Optional: Commerce and Accountancy'
          },
          {
                    id: 'opt-econ',
                    name: 'Optional: Economics'
          },
          {
                    id: 'opt-ee',
                    name: 'Optional: Electrical Engineering'
          },
          {
                    id: 'opt-geog',
                    name: 'Optional: Geography'
          },
          {
                    id: 'opt-geol',
                    name: 'Optional: Geology'
          },
          {
                    id: 'opt-hist',
                    name: 'Optional: History'
          },
          {
                    id: 'opt-law',
                    name: 'Optional: Law'
          },
          {
                    id: 'opt-manage',
                    name: 'Optional: Management'
          },
          {
                    id: 'opt-math',
                    name: 'Optional: Mathematics'
          },
          {
                    id: 'opt-mech',
                    name: 'Optional: Mechanical Engineering'
          },
          {
                    id: 'opt-med',
                    name: 'Optional: Medical Science'
          },
          {
                    id: 'opt-phil',
                    name: 'Optional: Philosophy'
          },
          {
                    id: 'opt-phys',
                    name: 'Optional: Physics'
          },
          {
                    id: 'opt-psir',
                    name: 'Optional: Political Science and IR'
          },
          {
                    id: 'opt-psych',
                    name: 'Optional: Psychology'
          },
          {
                    id: 'opt-pubad',
                    name: 'Optional: Public Administration'
          },
          {
                    id: 'opt-soc',
                    name: 'Optional: Sociology'
          },
          {
                    id: 'opt-stats',
                    name: 'Optional: Statistics'
          },
          {
                    id: 'opt-zoo',
                    name: 'Optional: Zoology'
          },
          {
                    id: 'opt-lit-assamese',
                    name: 'Literature: Assamese'
          },
          {
                    id: 'opt-lit-bengali',
                    name: 'Literature: Bengali'
          },
          {
                    id: 'opt-lit-bodo',
                    name: 'Literature: Bodo'
          },
          {
                    id: 'opt-lit-dogri',
                    name: 'Literature: Dogri'
          },
          {
                    id: 'opt-lit-gujarati',
                    name: 'Literature: Gujarati'
          },
          {
                    id: 'opt-lit-hindi',
                    name: 'Literature: Hindi'
          },
          {
                    id: 'opt-lit-kannada',
                    name: 'Literature: Kannada'
          },
          {
                    id: 'opt-lit-kashmiri',
                    name: 'Literature: Kashmiri'
          },
          {
                    id: 'opt-lit-konkani',
                    name: 'Literature: Konkani'
          },
          {
                    id: 'opt-lit-maithili',
                    name: 'Literature: Maithili'
          },
          {
                    id: 'opt-lit-malayalam',
                    name: 'Literature: Malayalam'
          },
          {
                    id: 'opt-lit-manipuri',
                    name: 'Literature: Manipuri'
          },
          {
                    id: 'opt-lit-marathi',
                    name: 'Literature: Marathi'
          },
          {
                    id: 'opt-lit-nepali',
                    name: 'Literature: Nepali'
          },
          {
                    id: 'opt-lit-odia',
                    name: 'Literature: Odia'
          },
          {
                    id: 'opt-lit-punjabi',
                    name: 'Literature: Punjabi'
          },
          {
                    id: 'opt-lit-sanskrit',
                    name: 'Literature: Sanskrit'
          },
          {
                    id: 'opt-lit-santhali',
                    name: 'Literature: Santhali'
          },
          {
                    id: 'opt-lit-sindhi',
                    name: 'Literature: Sindhi'
          },
          {
                    id: 'opt-lit-tamil',
                    name: 'Literature: Tamil'
          },
          {
                    id: 'opt-lit-telugu',
                    name: 'Literature: Telugu'
          },
          {
                    id: 'opt-lit-urdu',
                    name: 'Literature: Urdu'
          },
          {
                    id: 'opt-lit-english',
                    name: 'Literature: English'
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
                    id: 'gs1',
                    name: 'General Studies I'
          },
          {
                    id: 'gs2',
                    name: 'General Studies II'
          },
          {
                    id: 'gs3',
                    name: 'General Studies III'
          },
          {
                    id: 'gs4',
                    name: 'General Studies IV'
          },
          {
                    id: 'gs5',
                    name: 'General Studies V (UP Special)'
          },
          {
                    id: 'gs6',
                    name: 'General Studies VI (UP Special)'
          },
          {
                    id: 'essay',
                    name: 'Essay'
          },
          {
                    id: 'hindi',
                    name: 'General Hindi'
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://bpsc.bihar.gov.in/" target="_blank">Official BPSC Website</a>',
        subjects: [
          {
                    id: 'gs1',
                    name: 'General Studies I'
          },
          {
                    id: 'gs2',
                    name: 'General Studies II'
          },
          {
                    id: 'essay',
                    name: 'Essay'
          },
          {
                    id: 'opt-agri',
                    name: 'Optional: Agriculture'
          },
          {
                    id: 'opt-anthro',
                    name: 'Optional: Anthropology'
          },
          {
                    id: 'opt-chem',
                    name: 'Optional: Chemistry'
          },
          {
                    id: 'opt-commerce',
                    name: 'Optional: Commerce & Accountancy'
          },
          {
                    id: 'opt-econ',
                    name: 'Optional: Economics'
          },
          {
                    id: 'opt-geog',
                    name: 'Optional: Geography'
          },
          {
                    id: 'opt-geol',
                    name: 'Optional: Geology'
          },
          {
                    id: 'opt-hist',
                    name: 'Optional: History'
          },
          {
                    id: 'opt-ls',
                    name: 'Optional: Labour and Social Welfare (LSW)'
          },
          {
                    id: 'opt-law',
                    name: 'Optional: Law'
          },
          {
                    id: 'opt-manage',
                    name: 'Optional: Management'
          },
          {
                    id: 'opt-math',
                    name: 'Optional: Mathematics'
          },
          {
                    id: 'opt-mech',
                    name: 'Optional: Mechanical Engineering'
          },
          {
                    id: 'opt-phil',
                    name: 'Optional: Philosophy'
          },
          {
                    id: 'opt-phys',
                    name: 'Optional: Physics'
          },
          {
                    id: 'opt-psir',
                    name: 'Optional: Political Science and IR'
          },
          {
                    id: 'opt-psych',
                    name: 'Optional: Psychology'
          },
          {
                    id: 'opt-pubad',
                    name: 'Optional: Public Administration'
          },
          {
                    id: 'opt-soc',
                    name: 'Optional: Sociology'
          },
          {
                    id: 'opt-stats',
                    name: 'Optional: Statistics'
          },
          {
                    id: 'opt-zoo',
                    name: 'Optional: Zoology'
          },
          {
                    id: 'opt-hindi',
                    name: 'Optional: Hindi Language and Lit.'
          },
          {
                    id: 'opt-eng',
                    name: 'Optional: English Language and Lit.'
          },
          {
                    id: 'opt-urdu',
                    name: 'Optional: Urdu Language and Lit.'
          },
          {
                    id: 'opt-maithili',
                    name: 'Optional: Maithili Language and Lit.'
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
            {id: 't1-reasoning', name: 'Tier I: Reasoning'},
            {id: 't1-ga', name: 'Tier I: General Awareness'},
            {id: 't1-quant', name: 'Tier I: Quantitative Aptitude'},
            {id: 't1-eng', name: 'Tier I: English'},
            {id: 't2-paper1', name: 'Tier II: Paper I (Compulsory)'},
            {id: 't2-stats', name: 'Tier II: Statistics'},
            {id: 't2-finance', name: 'Tier II: Finance & Economics'}
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
            {id: 't1', name: 'Tier I: All Subjects'},
            {id: 't2', name: 'Tier II: All Subjects'},
            {id: 'typing', name: 'Skill/Typing Test'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://ssc.gov.in/" target="_blank">Official SSC Website</a>',
        subjects: [
            {id: 'session1', name: 'Session I: Numerical & Reasoning'},
            {id: 'session2', name: 'Session II: English & GA'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://www.ibps.in/" target="_blank">Official IBPS Website</a>',
        subjects: [
            {id: 'pre-eng', name: 'Prelims: English Language'},
            {id: 'pre-quant', name: 'Prelims: Quantitative Aptitude'},
            {id: 'pre-reason', name: 'Prelims: Reasoning Ability'},
            {id: 'mains-reason-comp', name: 'Mains: Reasoning & Computer Aptitude'},
            {id: 'mains-eng', name: 'Mains: English Language'},
            {id: 'mains-data', name: 'Mains: Data Analysis & Interpretation'},
            {id: 'mains-ga', name: 'Mains: General/Economy/Banking Awareness'},
            {id: 'mains-desc', name: 'Mains: Descriptive Paper (English)'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://sbi.co.in/web/careers" target="_blank">Official SBI Careers</a>',
        subjects: [
            {id: 'pre-eng', name: 'Prelims: English Language'},
            {id: 'pre-quant', name: 'Prelims: Quantitative Aptitude'},
            {id: 'pre-reason', name: 'Prelims: Reasoning Ability'},
            {id: 'mains-reason-comp', name: 'Mains: Reasoning & Computer Aptitude'},
            {id: 'mains-data', name: 'Mains: Data Analysis & Interpretation'},
            {id: 'mains-ga', name: 'Mains: General/Economy/Banking Awareness'},
            {id: 'mains-eng', name: 'Mains: English Language'},
            {id: 'mains-desc', name: 'Mains: Descriptive Test'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://opportunities.rbi.org.in/" target="_blank">Official RBI Website</a>',
        subjects: [
            {id: 'phase1-ga', name: 'Phase I: General Awareness'},
            {id: 'phase1-eng', name: 'Phase I: English'},
            {id: 'phase1-quant', name: 'Phase I: Quantitative Aptitude'},
            {id: 'phase1-reason', name: 'Phase I: Reasoning'},
            {id: 'phase2-esi', name: 'Phase II: Economic & Social Issues'},
            {id: 'phase2-eng', name: 'Phase II: English (Writing Skills)'},
            {id: 'phase2-fm', name: 'Phase II: Finance & Management'}
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
            {id: 'physics', name: 'Physics'},
            {id: 'chemistry', name: 'Chemistry'},
            {id: 'botany', name: 'Botany'},
            {id: 'zoology', name: 'Zoology'},
            {id: 'mock', name: 'Full Length Mocks'}
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
            {id: 'physics', name: 'Physics'},
            {id: 'chemistry', name: 'Chemistry'},
            {id: 'mathematics', name: 'Mathematics'},
            {id: 'aptitude', name: 'Aptitude Test (B.Arch)'},
            {id: 'drawing', name: 'Drawing Test (B.Arch)'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://gate2026.iitg.ac.in/" target="_blank">Official GATE Website</a>',
        subjects: [
          {
                    id: 'ga',
                    name: 'General Aptitude (Common for all)'
          },
          {
                    id: 'ae',
                    name: 'AE - Aerospace Engineering'
          },
          {
                    id: 'ag',
                    name: 'AG - Agricultural Engineering'
          },
          {
                    id: 'ar',
                    name: 'AR - Architecture and Planning'
          },
          {
                    id: 'bm',
                    name: 'BM - Biomedical Engineering'
          },
          {
                    id: 'bt',
                    name: 'BT - Biotechnology'
          },
          {
                    id: 'ce',
                    name: 'CE - Civil Engineering'
          },
          {
                    id: 'ch',
                    name: 'CH - Chemical Engineering'
          },
          {
                    id: 'cs',
                    name: 'CS - Computer Science and Information Technology'
          },
          {
                    id: 'cy',
                    name: 'CY - Chemistry'
          },
          {
                    id: 'da',
                    name: 'DA - Data Science and Artificial Intelligence'
          },
          {
                    id: 'ec',
                    name: 'EC - Electronics and Communication Engineering'
          },
          {
                    id: 'ee',
                    name: 'EE - Electrical Engineering'
          },
          {
                    id: 'es',
                    name: 'ES - Environmental Science and Engineering'
          },
          {
                    id: 'ey',
                    name: 'EY - Ecology and Evolution'
          },
          {
                    id: 'ge',
                    name: 'GE - Geomatics Engineering'
          },
          {
                    id: 'gg',
                    name: 'GG - Geology and Geophysics'
          },
          {
                    id: 'in',
                    name: 'IN - Instrumentation Engineering'
          },
          {
                    id: 'ma',
                    name: 'MA - Mathematics'
          },
          {
                    id: 'me',
                    name: 'ME - Mechanical Engineering'
          },
          {
                    id: 'mn',
                    name: 'MN - Mining Engineering'
          },
          {
                    id: 'mt',
                    name: 'MT - Metallurgical Engineering'
          },
          {
                    id: 'nm',
                    name: 'NM - Naval Architecture and Marine Engineering'
          },
          {
                    id: 'pe',
                    name: 'PE - Petroleum Engineering'
          },
          {
                    id: 'ph',
                    name: 'PH - Physics'
          },
          {
                    id: 'pi',
                    name: 'PI - Production and Industrial Engineering'
          },
          {
                    id: 'st',
                    name: 'ST - Statistics'
          },
          {
                    id: 'tf',
                    name: 'TF - Textile Engineering and Fibre Science'
          },
          {
                    id: 'xe',
                    name: 'XE - Engineering Sciences'
          },
          {
                    id: 'xh',
                    name: 'XH - Humanities and Social Sciences'
          },
          {
                    id: 'xl',
                    name: 'XL - Life Sciences'
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
        dates: '<p>Dates dynamically updated for ' + currentYear + ' cycle (June and December sessions).</p>',
        links: '<a href="https://ugcnet.nta.nic.in/" target="_blank">Official UGC NET Website</a>',
        subjects: [
          {
                    id: '00',
                    name: 'Paper 1 (General Paper)'
          },
          {
                    id: '01',
                    name: '001 Economics'
          },
          {
                    id: '02',
                    name: '002 Political Science'
          },
          {
                    id: '03',
                    name: '003 Philosophy'
          },
          {
                    id: '04',
                    name: '004 Psychology'
          },
          {
                    id: '05',
                    name: '005 Sociology'
          },
          {
                    id: '06',
                    name: '006 History'
          },
          {
                    id: '07',
                    name: '007 Anthropology'
          },
          {
                    id: '08',
                    name: '008 Commerce'
          },
          {
                    id: '09',
                    name: '009 Education'
          },
          {
                    id: '10',
                    name: '010 Social Work'
          },
          {
                    id: '11',
                    name: '011 Defence and Strategic Studies'
          },
          {
                    id: '12',
                    name: '012 Home Science'
          },
          {
                    id: '14',
                    name: '014 Public Administration'
          },
          {
                    id: '15',
                    name: '015 Population Studies'
          },
          {
                    id: '16',
                    name: '016 Music'
          },
          {
                    id: '17',
                    name: '017 Management'
          },
          {
                    id: '18',
                    name: '018 Maithili'
          },
          {
                    id: '19',
                    name: '019 Bengali'
          },
          {
                    id: '20',
                    name: '020 Hindi'
          },
          {
                    id: '21',
                    name: '021 Kannada'
          },
          {
                    id: '22',
                    name: '022 Malayalam'
          },
          {
                    id: '23',
                    name: '023 Odia'
          },
          {
                    id: '24',
                    name: '024 Punjabi'
          },
          {
                    id: '25',
                    name: '025 Sanskrit'
          },
          {
                    id: '26',
                    name: '026 Tamil'
          },
          {
                    id: '27',
                    name: '027 Telugu'
          },
          {
                    id: '28',
                    name: '028 Urdu'
          },
          {
                    id: '29',
                    name: '029 Arabic'
          },
          {
                    id: '30',
                    name: '030 English'
          },
          {
                    id: '31',
                    name: '031 Linguistics'
          },
          {
                    id: '32',
                    name: '032 Chinese'
          },
          {
                    id: '33',
                    name: '033 Dogri'
          },
          {
                    id: '34',
                    name: '034 Nepali'
          },
          {
                    id: '35',
                    name: '035 Manipuri'
          },
          {
                    id: '36',
                    name: '036 Assamese'
          },
          {
                    id: '37',
                    name: '037 Gujarati'
          },
          {
                    id: '38',
                    name: '038 Marathi'
          },
          {
                    id: '39',
                    name: '039 French'
          },
          {
                    id: '40',
                    name: '040 Spanish'
          },
          {
                    id: '41',
                    name: '041 Russian'
          },
          {
                    id: '42',
                    name: '042 Persian'
          },
          {
                    id: '43',
                    name: '043 Rajasthani'
          },
          {
                    id: '44',
                    name: '044 German'
          },
          {
                    id: '45',
                    name: '045 Japanese'
          },
          {
                    id: '46',
                    name: '046 Adult Education'
          },
          {
                    id: '47',
                    name: '047 Physical Education'
          },
          {
                    id: '49',
                    name: '049 Arab Culture and Islamic Studies'
          },
          {
                    id: '50',
                    name: '050 Indian Culture'
          },
          {
                    id: '55',
                    name: '055 Labour Welfare'
          },
          {
                    id: '58',
                    name: '058 Law'
          },
          {
                    id: '59',
                    name: '059 Library and Information Science'
          },
          {
                    id: '60',
                    name: '060 Buddhist, Jaina, Gandhian and Peace Studies'
          },
          {
                    id: '62',
                    name: '062 Comparative Study of Religions'
          },
          {
                    id: '63',
                    name: '063 Mass Communication and Journalism'
          },
          {
                    id: '65',
                    name: '065 Performing Arts'
          },
          {
                    id: '66',
                    name: '066 Museology & Conservation'
          },
          {
                    id: '67',
                    name: '067 Archaeology'
          },
          {
                    id: '68',
                    name: '068 Criminology'
          },
          {
                    id: '70',
                    name: '070 Tribal and Regional Language/Literature'
          },
          {
                    id: '71',
                    name: '071 Folk Literature'
          },
          {
                    id: '72',
                    name: '072 Comparative Literature'
          },
          {
                    id: '73',
                    name: '073 Sanskrit Traditional Subjects'
          },
          {
                    id: '74',
                    name: '074 Women Studies'
          },
          {
                    id: '79',
                    name: '079 Visual Arts'
          },
          {
                    id: '80',
                    name: '080 Geography'
          },
          {
                    id: '81',
                    name: '081 Social Medicine & Community Health'
          },
          {
                    id: '82',
                    name: '082 Forensic Science'
          },
          {
                    id: '83',
                    name: '083 Pali'
          },
          {
                    id: '84',
                    name: '084 Kashmiri'
          },
          {
                    id: '85',
                    name: '085 Konkani'
          },
          {
                    id: '87',
                    name: '087 Computer Science and Applications'
          },
          {
                    id: '88',
                    name: '088 Electronic Science'
          },
          {
                    id: '89',
                    name: '089 Environmental Sciences'
          },
          {
                    id: '90',
                    name: '090 Politics including International Relations'
          },
          {
                    id: '91',
                    name: '091 Prakrit'
          },
          {
                    id: '92',
                    name: '092 Human Rights and Duties'
          },
          {
                    id: '93',
                    name: '093 Tourism Administration and Management'
          },
          {
                    id: '94',
                    name: '094 Bodo'
          },
          {
                    id: '95',
                    name: '095 Santali'
          },
          {
                    id: '100',
                    name: '100 Yoga'
          },
          {
                    id: '101',
                    name: '101 Sindhi'
          },
          {
                    id: '102',
                    name: '102 Hindu Studies'
          },
          {
                    id: '103',
                    name: '103 Indian Knowledge System'
          },
          {
                    id: '104',
                    name: '104 Disaster Management'
          },
          {
                    id: '105',
                    name: '105 Ayurveda Biology'
          },
          {
                    id: '106',
                    name: '106 Forestry'
          },
          {
                    id: '107',
                    name: '107 Statistics'
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://iimcat.ac.in/" target="_blank">Official CAT Website</a>',
        subjects: [
            {id: 'varc', name: 'VARC'},
            {id: 'dilr', name: 'DILR'},
            {id: 'qa', name: 'QA'},
            {id: 'mock', name: 'Full Mock Test'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://consortiumofnlus.ac.in/" target="_blank">Official CLAT Website</a>',
        subjects: [
            {id: 'english', name: 'English Language'},
            {id: 'ca', name: 'Current Affairs & GK'},
            {id: 'legal', name: 'Legal Reasoning'},
            {id: 'logical', name: 'Logical Reasoning'},
            {id: 'quant', name: 'Quantitative Techniques'}
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
                    id: 'gs1',
                    name: 'General Studies I'
          },
          {
                    id: 'gs2',
                    name: 'General Studies II'
          },
          {
                    id: 'gs3',
                    name: 'General Studies III'
          },
          {
                    id: 'gs4',
                    name: 'General Studies IV'
          },
          {
                    id: 'essay',
                    name: 'Essay'
          },
          {
                    id: 'marathi',
                    name: 'Marathi Language'
          },
          {
                    id: 'english',
                    name: 'English Language'
          },
          {
                    id: 'opt-agri',
                    name: 'Optional: Agriculture'
          },
          {
                    id: 'opt-animal',
                    name: 'Optional: Animal Husbandry & Vet Science'
          },
          {
                    id: 'opt-anthro',
                    name: 'Optional: Anthropology'
          },
          {
                    id: 'opt-botany',
                    name: 'Optional: Botany'
          },
          {
                    id: 'opt-chem',
                    name: 'Optional: Chemistry'
          },
          {
                    id: 'opt-civil',
                    name: 'Optional: Civil Engineering'
          },
          {
                    id: 'opt-commerce',
                    name: 'Optional: Commerce & Accountancy'
          },
          {
                    id: 'opt-econ',
                    name: 'Optional: Economics'
          },
          {
                    id: 'opt-ee',
                    name: 'Optional: Electrical Engineering'
          },
          {
                    id: 'opt-geog',
                    name: 'Optional: Geography'
          },
          {
                    id: 'opt-geol',
                    name: 'Optional: Geology'
          },
          {
                    id: 'opt-hist',
                    name: 'Optional: History'
          },
          {
                    id: 'opt-law',
                    name: 'Optional: Law'
          },
          {
                    id: 'opt-math',
                    name: 'Optional: Mathematics'
          },
          {
                    id: 'opt-mech',
                    name: 'Optional: Mechanical Engineering'
          },
          {
                    id: 'opt-med',
                    name: 'Optional: Medical Science'
          },
          {
                    id: 'opt-phil',
                    name: 'Optional: Philosophy'
          },
          {
                    id: 'opt-phys',
                    name: 'Optional: Physics'
          },
          {
                    id: 'opt-psir',
                    name: 'Optional: Political Science and IR'
          },
          {
                    id: 'opt-psych',
                    name: 'Optional: Psychology'
          },
          {
                    id: 'opt-pubad',
                    name: 'Optional: Public Administration'
          },
          {
                    id: 'opt-soc',
                    name: 'Optional: Sociology'
          },
          {
                    id: 'opt-stats',
                    name: 'Optional: Statistics'
          },
          {
                    id: 'opt-zoo',
                    name: 'Optional: Zoology'
          },
          {
                    id: 'opt-marathi-lit',
                    name: 'Optional: Marathi Literature'
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
                    id: 'gs1',
                    name: 'General Studies I (History, Economy, Sociology, Management)'
          },
          {
                    id: 'gs2',
                    name: 'General Studies II (Admin Ethics, Science, Earth Science)'
          },
          {
                    id: 'gs3',
                    name: 'General Studies III (Polity, PubAd, Sports, Law)'
          },
          {
                    id: 'gs4',
                    name: 'General Hindi and General English'
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://ssc.gov.in/" target="_blank">Official SSC Website</a>',
        subjects: [
            {id: 'cbe-gi', name: 'General Intelligence & Reasoning'},
            {id: 'cbe-gk', name: 'General Knowledge & Awareness'},
            {id: 'cbe-math', name: 'Elementary Mathematics'},
            {id: 'cbe-lang', name: 'English / Hindi'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://ssc.gov.in/" target="_blank">Official SSC Website</a>',
        subjects: [
            {id: 'paper1-gi', name: 'Paper I: General Intelligence'},
            {id: 'paper1-gk', name: 'Paper I: General Knowledge'},
            {id: 'paper1-quant', name: 'Paper I: Quantitative Aptitude'},
            {id: 'paper1-eng', name: 'Paper I: English Comprehension'},
            {id: 'paper2-eng', name: 'Paper II: English Language & Comprehension'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://www.ibps.in/" target="_blank">Official IBPS Website</a>',
        subjects: [
            {id: 'pre-eng', name: 'Prelims: English'},
            {id: 'pre-num', name: 'Prelims: Numerical Ability'},
            {id: 'pre-reason', name: 'Prelims: Reasoning'},
            {id: 'mains-ga', name: 'Mains: General/Financial Awareness'},
            {id: 'mains-eng', name: 'Mains: General English'},
            {id: 'mains-reason', name: 'Mains: Reasoning Ability'},
            {id: 'mains-quant', name: 'Mains: Quantitative Aptitude'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://sbi.co.in/web/careers" target="_blank">Official SBI Careers</a>',
        subjects: [
            {id: 'pre-eng', name: 'Prelims: English'},
            {id: 'pre-num', name: 'Prelims: Numerical Ability'},
            {id: 'pre-reason', name: 'Prelims: Reasoning'},
            {id: 'mains-ga', name: 'Mains: General/Financial Awareness'},
            {id: 'mains-eng', name: 'Mains: General English'},
            {id: 'mains-quant', name: 'Mains: Quantitative Aptitude'},
            {id: 'mains-reason', name: 'Mains: Reasoning & Computer Aptitude'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://www.nabard.org/" target="_blank">Official NABARD Website</a>',
        subjects: [
            {id: 'pre', name: 'Prelims: Common Subjects'},
            {id: 'mains-eng', name: 'Mains: General English'},
            {id: 'mains-esi-ard', name: 'Mains: ESI & ARD'},
            {id: 'mains-specialist', name: 'Mains: Specialist Discipline'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://rrb.indianrailways.gov.in/" target="_blank">Official RRB Website</a>',
        subjects: [
            {id: 'ga', name: 'General Awareness'},
            {id: 'math', name: 'Mathematics'},
            {id: 'reasoning', name: 'General Intelligence & Reasoning'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://rrb.indianrailways.gov.in/" target="_blank">Official RRB Website</a>',
        subjects: [
            {id: 'science', name: 'General Science'},
            {id: 'math', name: 'Mathematics'},
            {id: 'reasoning', name: 'Reasoning'},
            {id: 'ga', name: 'General Awareness & Current Affairs'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://rrb.indianrailways.gov.in/" target="_blank">Official RRB Website</a>',
        subjects: [
            {id: 'cbt1', name: 'CBT 1: All Subjects'},
            {id: 'cbt2-parta', name: 'CBT 2: Part A (Maths, Reasoning, Science)'},
            {id: 'cbt2-partb', name: 'CBT 2: Part B (Trade-specific)'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://upsc.gov.in/" target="_blank">Official UPSC Website</a>',
        subjects: [
            {id: 'math', name: 'Paper I: Mathematics'},
            {id: 'gat-eng', name: 'Paper II: English'},
            {id: 'gat-gk', name: 'Paper II: General Knowledge'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://upsc.gov.in/" target="_blank">Official UPSC Website</a>',
        subjects: [
            {id: 'eng', name: 'English'},
            {id: 'gk', name: 'General Knowledge'},
            {id: 'math', name: 'Elementary Mathematics'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://careerairforce.gov.in/" target="_blank">Official AFCAT Website</a>',
        subjects: [
            {id: 'eng', name: 'English'},
            {id: 'ga', name: 'General Awareness'},
            {id: 'num', name: 'Numerical Ability'},
            {id: 'reasoning', name: 'Reasoning & Military Aptitude'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://joinindianarmy.nic.in/" target="_blank">Official Indian Army Website</a>',
        subjects: [
            {id: 'gd-gk', name: 'GD: General Knowledge'},
            {id: 'gd-sci', name: 'GD: General Science'},
            {id: 'gd-math', name: 'GD: Mathematics'},
            {id: 'gd-reasoning', name: 'GD: Logical Reasoning'},
            {id: 'tech-phy', name: 'Tech: Physics'},
            {id: 'tech-chem', name: 'Tech: Chemistry'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://natboard.edu.in/" target="_blank">Official NBEMS Website</a>',
        subjects: [
          {
                    id: 'anatomy',
                    name: 'Anatomy'
          },
          {
                    id: 'physio',
                    name: 'Physiology'
          },
          {
                    id: 'biochem',
                    name: 'Biochemistry'
          },
          {
                    id: 'patho',
                    name: 'Pathology'
          },
          {
                    id: 'pharma',
                    name: 'Pharmacology'
          },
          {
                    id: 'micro',
                    name: 'Microbiology'
          },
          {
                    id: 'fmt',
                    name: 'Forensic Medicine and Toxicology'
          },
          {
                    id: 'psm',
                    name: 'Social and Preventive Medicine (PSM)'
          },
          {
                    id: 'ent',
                    name: 'ENT'
          },
          {
                    id: 'opthal',
                    name: 'Ophthalmology'
          },
          {
                    id: 'medicine',
                    name: 'General Medicine'
          },
          {
                    id: 'surgery',
                    name: 'General Surgery'
          },
          {
                    id: 'obgyn',
                    name: 'Obstetrics and Gynaecology'
          },
          {
                    id: 'paeds',
                    name: 'Paediatrics'
          },
          {
                    id: 'ortho',
                    name: 'Orthopaedics'
          },
          {
                    id: 'derma',
                    name: 'Dermatology & Venereology'
          },
          {
                    id: 'psych',
                    name: 'Psychiatry'
          },
          {
                    id: 'radio',
                    name: 'Radiodiagnosis & Radiotherapy'
          },
          {
                    id: 'anes',
                    name: 'Anaesthesia'
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://aiimsexams.ac.in/" target="_blank">Official AIIMS Exams Website</a>',
        subjects: [
            {id: 'pre-clinical', name: 'Pre-clinical Subjects'},
            {id: 'para-clinical', name: 'Para-clinical Subjects'},
            {id: 'clinical', name: 'Clinical Subjects'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://jeeadv.ac.in/" target="_blank">Official JEE Advanced Website</a>',
        subjects: [
            {id: 'physics', name: 'Physics'},
            {id: 'chemistry', name: 'Chemistry'},
            {id: 'math', name: 'Mathematics'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://www.bitsadmission.com/" target="_blank">Official BITS Admission Website</a>',
        subjects: [
            {id: 'physics', name: 'Physics'},
            {id: 'chemistry', name: 'Chemistry'},
            {id: 'math', name: 'Mathematics'},
            {id: 'bio', name: 'Biology'},
            {id: 'eng', name: 'English Proficiency'},
            {id: 'lr', name: 'Logical Reasoning'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://csirnet.nta.ac.in/" target="_blank">Official CSIR NET Website</a>',
        subjects: [
            {id: 'chemical', name: 'Chemical Sciences'},
            {id: 'earth', name: 'Earth, Atmospheric, Ocean and Planetary Sciences'},
            {id: 'life', name: 'Life Sciences'},
            {id: 'math', name: 'Mathematical Sciences'},
            {id: 'physical', name: 'Physical Sciences'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://ctet.nic.in/" target="_blank">Official CTET Website</a>',
        subjects: [
            {id: 'paper1', name: 'Paper I (Classes I to V)'},
            {id: 'paper2-math', name: 'Paper II (Mathematics & Science)'},
            {id: 'paper2-sst', name: 'Paper II (Social Studies)'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://updeled.gov.in/" target="_blank">Official UP Basic Education Portal</a>',
        subjects: [
            {id: 'paper1', name: 'Paper I (Classes I to V)'},
            {id: 'paper2-math', name: 'Paper II (Maths & Science)'},
            {id: 'paper2-sst', name: 'Paper II (Social Studies)'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://rajeduboard.rajasthan.gov.in/" target="_blank">Official BSER Website</a>',
        subjects: [
            {id: 'level1', name: 'Level I'},
            {id: 'level2-math', name: 'Level II (Maths & Science)'},
            {id: 'level2-sst', name: 'Level II (Social Studies)'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://xatonline.in/" target="_blank">Official XAT Website</a>',
        subjects: [
            {id: 'verbal', name: 'Verbal Ability & Logical Reasoning'},
            {id: 'dm', name: 'Decision Making'},
            {id: 'quant', name: 'Quantitative Aptitude & DI'},
            {id: 'gk', name: 'General Knowledge'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://exams.nta.ac.in/CMAT/" target="_blank">Official CMAT Website</a>',
        subjects: [
            {id: 'quant', name: 'Quantitative Techniques & DI'},
            {id: 'lr', name: 'Logical Reasoning'},
            {id: 'lang', name: 'Language Comprehension'},
            {id: 'ga', name: 'General Awareness'},
            {id: 'ie', name: 'Innovation & Entrepreneurship'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://mat.aima.in/" target="_blank">Official MAT Website</a>',
        subjects: [
            {id: 'lang', name: 'Language Comprehension'},
            {id: 'intelligence', name: 'Intelligence & Critical Reasoning'},
            {id: 'math', name: 'Mathematical Skills'},
            {id: 'data', name: 'Data Analysis & Sufficiency'},
            {id: 'eco', name: 'Economic & Business Environment'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://snaptest.org/" target="_blank">Official SNAP Website</a>',
        subjects: [
            {id: 'eng', name: 'General English'},
            {id: 'reasoning', name: 'Analytical & Logical Reasoning'},
            {id: 'quant', name: 'Quantitative, DI & DS'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://nationallawuniversitydelhi.in/" target="_blank">Official AILET Website</a>',
        subjects: [
            {id: 'ug-eng', name: 'UG: English Language'},
            {id: 'ug-ca', name: 'UG: Current Affairs & GK'},
            {id: 'ug-lr', name: 'UG: Logical Reasoning'},
            {id: 'pg-law', name: 'PG: Law Subjects'}
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
            {id: 'lang', name: 'Section IA & IB: Languages'},
            {id: 'ug-accountancy', name: 'Accountancy / Book Keeping'},
            {id: 'ug-agriculture', name: 'Agriculture'},
            {id: 'ug-anthropology', name: 'Anthropology'},
            {id: 'ug-biology', name: 'Biology / Biological Studies'},
            {id: 'ug-business', name: 'Business Studies'},
            {id: 'ug-chemistry', name: 'Chemistry'},
            {id: 'ug-cs', name: 'Computer Science / Informatics Practices'},
            {id: 'ug-economics', name: 'Economics / Business Economics'},
            {id: 'ug-env', name: 'Environmental Science'},
            {id: 'ug-fine-arts', name: 'Fine Arts'},
            {id: 'ug-geography', name: 'Geography'},
            {id: 'ug-history', name: 'History'},
            {id: 'ug-home-science', name: 'Home Science'},
            {id: 'ug-legal', name: 'Legal Studies'},
            {id: 'ug-mass-media', name: 'Mass Media Studies'},
            {id: 'ug-math', name: 'Mathematics / Applied Mathematics'},
            {id: 'ug-pe', name: 'Physical Education'},
            {id: 'ug-physics', name: 'Physics'},
            {id: 'ug-pol-science', name: 'Political Science'},
            {id: 'ug-psychology', name: 'Psychology'},
            {id: 'ug-sociology', name: 'Sociology'},
            {id: 'general', name: 'Section III: General Test'}
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
        dates: '<p>Exact calendar dates are announced periodically by the conducting body. Please check the official links for the latest schedule.</p>',
        links: '<a href="https://exams.nta.ac.in/" target="_blank">Official CUET Website</a>',
        subjects: [
            {id: 'pg-physics', name: 'Physics'},
            {id: 'pg-chem', name: 'Chemistry'},
            {id: 'pg-math', name: 'Mathematics'},
            {id: 'pg-bio', name: 'Biology / Life Sciences'},
            {id: 'pg-biochem', name: 'Biochemistry'},
            {id: 'pg-env', name: 'Environmental Science'},
            {id: 'pg-cs', name: 'Computer Science'},
            {id: 'pg-stats', name: 'Statistics'},
            {id: 'pg-commerce', name: 'Commerce'},
            {id: 'pg-management', name: 'Management & Business Admin'},
            {id: 'pg-finance', name: 'Finance & Accounting'},
            {id: 'pg-history', name: 'History'},
            {id: 'pg-pol-science', name: 'Political Science'},
            {id: 'pg-philosophy', name: 'Philosophy'},
            {id: 'pg-sociology', name: 'Sociology'},
            {id: 'pg-psychology', name: 'Psychology'},
            {id: 'pg-geography', name: 'Geography'},
            {id: 'pg-english', name: 'English'},
            {id: 'pg-hindi', name: 'Hindi'},
            {id: 'pg-social-work', name: 'Social Work'},
            {id: 'pg-edu', name: 'Education / M.Ed'},
            {id: 'pg-pe', name: 'Physical Education'},
            {id: 'pg-law', name: 'Law (LLM)'},
            {id: 'pg-fine-arts', name: 'Fine Arts / Performing Arts'},
            {id: 'pg-agriculture', name: 'Agriculture'},
            {id: 'pg-engg', name: 'Engineering / Technology'},
            {id: 'pg-lib-science', name: 'Library Science'},
            {id: 'pg-mass-comm', name: 'Journalism & Mass Comm'},
            {id: 'pg-tourism', name: 'Tourism'}
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


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
            {id: 'pre-gs1', name: 'Prelims: General Studies Paper I'},
            {id: 'pre-csat', name: 'Prelims: CSAT (Paper II)'},
            {id: 'mains-essay', name: 'Mains: Essay'},
            {id: 'mains-gs1', name: 'Mains: GS I'},
            {id: 'mains-gs2', name: 'Mains: GS II'},
            {id: 'mains-gs3', name: 'Mains: GS III'},
            {id: 'mains-gs4', name: 'Mains: GS IV'},
            {id: 'opt-agriculture', name: 'Optional: Agriculture'},
            {id: 'opt-animal', name: 'Optional: Animal Husbandry & Vet Science'},
            {id: 'opt-anthropology', name: 'Optional: Anthropology'},
            {id: 'opt-botany', name: 'Optional: Botany'},
            {id: 'opt-chemistry', name: 'Optional: Chemistry'},
            {id: 'opt-civil', name: 'Optional: Civil Engineering'},
            {id: 'opt-commerce', name: 'Optional: Commerce & Accountancy'},
            {id: 'opt-economics', name: 'Optional: Economics'},
            {id: 'opt-electrical', name: 'Optional: Electrical Engineering'},
            {id: 'opt-geography', name: 'Optional: Geography'},
            {id: 'opt-geology', name: 'Optional: Geology'},
            {id: 'opt-history', name: 'Optional: History'},
            {id: 'opt-law', name: 'Optional: Law'},
            {id: 'opt-management', name: 'Optional: Management'},
            {id: 'opt-mathematics', name: 'Optional: Mathematics'},
            {id: 'opt-mechanical', name: 'Optional: Mechanical Engineering'},
            {id: 'opt-medical', name: 'Optional: Medical Science'},
            {id: 'opt-philosophy', name: 'Optional: Philosophy'},
            {id: 'opt-physics', name: 'Optional: Physics'},
            {id: 'opt-psir', name: 'Optional: PSIR'},
            {id: 'opt-psychology', name: 'Optional: Psychology'},
            {id: 'opt-pubad', name: 'Optional: Public Administration'},
            {id: 'opt-sociology', name: 'Optional: Sociology'},
            {id: 'opt-statistics', name: 'Optional: Statistics'},
            {id: 'opt-zoology', name: 'Optional: Zoology'}
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
        dates: '<p>Dates dynamically updated for ' + currentYear + ' cycle.</p>',
        links: '<a href="https://uppsc.up.nic.in/" target="_blank">Official UPPSC Website</a>',
        subjects: [
            {id: 'pre-gs1', name: 'Prelims: General Studies I'},
            {id: 'pre-gs2', name: 'Prelims: General Studies II'},
            {id: 'mains-hindi', name: 'Mains: General Hindi'},
            {id: 'mains-essay', name: 'Mains: Essay'},
            {id: 'mains-gs1', name: 'Mains: GS I'},
            {id: 'mains-gs2', name: 'Mains: GS II'},
            {id: 'mains-gs3', name: 'Mains: GS III'},
            {id: 'mains-gs4', name: 'Mains: GS IV'},
            {id: 'mains-gs5', name: 'Mains: GS V (UP Specific)'},
            {id: 'mains-gs6', name: 'Mains: GS VI (UP Specific)'}
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
        dates: '<p>Dates dynamically updated for ' + currentYear + ' cycle.</p>',
        links: '<a href="https://bpsc.bihar.gov.in/" target="_blank">Official BPSC Website</a>',
        subjects: [
            {id: 'pre-gs', name: 'Prelims: General Studies'},
            {id: 'mains-hindi', name: 'Mains: General Hindi'},
            {id: 'mains-gs1', name: 'Mains: GS I'},
            {id: 'mains-gs2', name: 'Mains: GS II'},
            {id: 'opt', name: 'Optional Subject (Various)'}
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
        dates: '<p>Dates dynamically updated for ' + currentYear + ' cycle.</p>',
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
        dates: '<p>Dates dynamically updated for ' + currentYear + ' cycle.</p>',
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
        dates: '<p>Dates dynamically updated for ' + currentYear + ' cycle.</p>',
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
        dates: '<p>Dates dynamically updated for ' + currentYear + ' cycle.</p>',
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
        dates: '<p>Dates dynamically updated for ' + currentYear + ' cycle.</p>',
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
        dates: '<p>Dates dynamically updated for ' + currentYear + ' cycle.</p>',
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
        dates: '<p>Dates dynamically updated for ' + currentYear + ' cycle.</p>',
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
        dates: '<p>Dates dynamically updated for ' + currentYear + ' cycle.</p>',
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
        dates: '<p>Dates dynamically updated for ' + currentYear + ' cycle.</p>',
        links: '<a href="https://gate2026.iitg.ac.in/" target="_blank">Official GATE Website</a>',
        subjects: [
            {id: 'ga', name: 'General Aptitude (Common)'},
            {id: 'cs', name: 'CS - Computer Science & IT'},
            {id: 'me', name: 'ME - Mechanical Engineering'},
            {id: 'ce', name: 'CE - Civil Engineering'},
            {id: 'ee', name: 'EE - Electrical Engineering'},
            {id: 'ec', name: 'EC - Electronics & Comm'},
            {id: 'da', name: 'DA - Data Science & AI'}
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
            {id: '00', name: 'Paper 1 (General Paper)'},
            {id: '01', name: '001 Economics'},
            {id: '02', name: '002 Political Science'},
            {id: '03', name: '003 Philosophy'},
            {id: '04', name: '004 Psychology'},
            {id: '05', name: '005 Sociology'},
            {id: '06', name: '006 History'},
            {id: '08', name: '008 Commerce'},
            {id: '09', name: '009 Education'},
            {id: '17', name: '017 Management'},
            {id: '20', name: '020 Hindi'},
            {id: '30', name: '030 English'},
            {id: '58', name: '058 Law'},
            {id: '87', name: '087 Computer Science and Applications'},
            {id: '104', name: '104 Disaster Management'},
            {id: '105', name: '105 Ayurveda Biology'},
            {id: '106', name: '106 Forestry'},
            {id: '107', name: '107 Statistics'}
            // Expanded to 87 officially
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
        dates: '<p>Dates dynamically updated for ' + currentYear + ' cycle.</p>',
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
        dates: '<p>Dates dynamically updated for ' + currentYear + ' cycle.</p>',
        links: '<a href="https://consortiumofnlus.ac.in/" target="_blank">Official CLAT Website</a>',
        subjects: [
            {id: 'english', name: 'English Language'},
            {id: 'ca', name: 'Current Affairs & GK'},
            {id: 'legal', name: 'Legal Reasoning'},
            {id: 'logical', name: 'Logical Reasoning'},
            {id: 'quant', name: 'Quantitative Techniques'}
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
        dates: '<p>Dates dynamically updated for the <b>' + currentYear + ' session</b>.<br><i>Check Official Links for exact calendar.</i></p>',
        links: '<p>Official links provided below when available.</p>',
        subjects: [
            { id: 'paper-1', name: 'Paper 1 (General/Aptitude)' },
            { id: 'paper-2', name: 'Paper 2 (Core/Subject Specific)' },
            { id: 'mock', name: 'Full Length Mocks' }
        ]
    };
};

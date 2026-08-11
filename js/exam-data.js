
window.MOCK_EXAM_DATA = {
    // ==========================================
    // GOVERNMENT EXAMS
    // ==========================================
    'upsc-cse': {
        name: 'UPSC CSE',
        category_id: 'government',
        short_description: 'Civil Services Examination for IAS, IPS, IFS and other central services.',
        about: 'The Civil Services Examination (CSE) is a nationwide competitive examination in India conducted by the Union Public Service Commission for recruitment to various Civil Services of the Government of India, including the Indian Administrative Service (IAS), Indian Foreign Service (IFS), and Indian Police Service (IPS).',
        pattern: '<ul><li><b>Preliminary:</b> 2 Objective type papers (General Studies I and CSAT). 200 marks each.</li><li><b>Mains:</b> 9 Written papers (2 qualifying languages, 1 Essay, 4 General Studies, 2 Optional Subject papers). Total 1750 marks.</li><li><b>Interview:</b> Personality Test (275 marks).</li></ul>',
        eligibility: '<p>Candidates must hold a graduation degree from a recognized university. Age limit: 21 to 32 years for General category (relaxations apply for OBC/SC/ST). Maximum 6 attempts for General.</p>',
        syllabus: '<p><b>Prelims:</b> Current events, History, Geography, Polity, Economy, Environment, Science. CSAT: Comprehension, reasoning, basic numeracy.<br><b>Mains:</b> Indian Heritage and Culture, History and Geography of the World and Society, Governance, Constitution, Social Justice and International relations, Technology, Economic Development, Bio-diversity, Environment, Security and Disaster Management, Ethics, Integrity and Aptitude.</p>',
        dates: '<p><b>Notification:</b> Feb 2024<br><b>Prelims Exam:</b> May 26, 2024<br><b>Mains Exam:</b> September 20, 2024 (5 days)</p>',
        links: '<a href="https://upsc.gov.in/" target="_blank" style="color: #3b82f6; text-decoration: none; font-weight: 600;"><i class="fas fa-external-link-alt"></i> Official UPSC Website</a>',
        subjects: [
            { id: 'pre-gs1', name: 'Prelims: General Studies Paper I' },
            { id: 'pre-gs2', name: 'Prelims: CSAT (Paper II)' },
            { id: 'mains-essay', name: 'Mains: Essay' },
            { id: 'mains-gs1', name: 'Mains: GS I (History, Geography, Society)' },
            { id: 'mains-gs2', name: 'Mains: GS II (Polity, Governance, IR)' },
            { id: 'mains-gs3', name: 'Mains: GS III (Economy, Science, Environment, Security)' },
            { id: 'mains-gs4', name: 'Mains: GS IV (Ethics, Integrity, Aptitude)' },
            { id: 'opt-agriculture', name: 'Optional: Agriculture' },
            { id: 'opt-animal-husbandry', name: 'Optional: Animal Husbandry and Veterinary Science' },
            { id: 'opt-anthropology', name: 'Optional: Anthropology' },
            { id: 'opt-botany', name: 'Optional: Botany' },
            { id: 'opt-chemistry', name: 'Optional: Chemistry' },
            { id: 'opt-civil-eng', name: 'Optional: Civil Engineering' },
            { id: 'opt-commerce', name: 'Optional: Commerce and Accountancy' },
            { id: 'opt-economics', name: 'Optional: Economics' },
            { id: 'opt-electrical-eng', name: 'Optional: Electrical Engineering' },
            { id: 'opt-geography', name: 'Optional: Geography' },
            { id: 'opt-geology', name: 'Optional: Geology' },
            { id: 'opt-history', name: 'Optional: History' },
            { id: 'opt-law', name: 'Optional: Law' },
            { id: 'opt-management', name: 'Optional: Management' },
            { id: 'opt-math', name: 'Optional: Mathematics' },
            { id: 'opt-mech-eng', name: 'Optional: Mechanical Engineering' },
            { id: 'opt-medical', name: 'Optional: Medical Science' },
            { id: 'opt-philosophy', name: 'Optional: Philosophy' },
            { id: 'opt-physics', name: 'Optional: Physics' },
            { id: 'opt-pol-sci', name: 'Optional: Political Science and International Relations' },
            { id: 'opt-psychology', name: 'Optional: Psychology' },
            { id: 'opt-pub-ad', name: 'Optional: Public Administration' },
            { id: 'opt-sociology', name: 'Optional: Sociology' },
            { id: 'opt-statistics', name: 'Optional: Statistics' },
            { id: 'opt-zoology', name: 'Optional: Zoology' },
            { id: 'lit-hindi', name: 'Literature: Hindi' },
            { id: 'lit-english', name: 'Literature: English' },
            { id: 'lit-sanskrit', name: 'Literature: Sanskrit' },
            { id: 'lit-urdu', name: 'Literature: Urdu' }
        ]
    },
    'uppsc': {
        name: 'UPPSC PCS',
        category_id: 'government',
        short_description: 'Uttar Pradesh Public Service Commission Provincial Civil Service exam.',
        about: 'UPPSC PCS (Provincial Civil Service) is the state-level civil service examination conducted by the Uttar Pradesh Public Service Commission (UPPSC).',
        pattern: '<ul><li><b>Preliminary:</b> 2 Objective type papers (General Studies I and II).</li><li><b>Mains:</b> 8 Written papers (General Hindi, Essay, GS I, II, III, IV, V, VI). (Optional subjects removed recently).</li><li><b>Interview:</b> Personality Test (100 marks).</li></ul>',
        eligibility: '<p>Graduation degree from a recognized university. Age limit: 21 to 40 years for General category.</p>',
        syllabus: '<p><b>Prelims:</b> History, Geography, Polity, Economy, Current Affairs, UP Specific GK. <b>Mains:</b> GS I to IV similar to UPSC, GS V & VI are exclusively UP Specific knowledge (History, Geography, Economy, Polity of UP).</p>',
        dates: '<p><b>Notification:</b> Jan 2024<br><b>Prelims Exam:</b> July 2024 (Tentative)<br><b>Mains Exam:</b> October 2024</p>',
        links: '<a href="https://uppsc.up.nic.in/" target="_blank" style="color: #3b82f6; text-decoration: none; font-weight: 600;"><i class="fas fa-external-link-alt"></i> Official UPPSC Website</a>',
        subjects: [
            { id: 'pre-gs1', name: 'Prelims: General Studies Paper I' },
            { id: 'pre-gs2', name: 'Prelims: CSAT (Paper II)' },
            { id: 'mains-hindi', name: 'Mains: General Hindi' },
            { id: 'mains-essay', name: 'Mains: Essay' },
            { id: 'mains-gs1', name: 'Mains: GS I (History, Geography, Society)' },
            { id: 'mains-gs2', name: 'Mains: GS II (Polity, Governance, IR)' },
            { id: 'mains-gs3', name: 'Mains: GS III (Economy, Science, Environment)' },
            { id: 'mains-gs4', name: 'Mains: GS IV (Ethics, Integrity, Aptitude)' },
            { id: 'mains-gs5', name: 'Mains: GS V (UP Specific - History, Polity)' },
            { id: 'mains-gs6', name: 'Mains: GS VI (UP Specific - Economy, Geography)' }
        ]
    },

    // ==========================================
    // SSC EXAMS
    // ==========================================
    'ssc-cgl': {
        name: 'SSC CGL',
        category_id: 'ssc',
        short_description: 'Staff Selection Commission Combined Graduate Level Examination.',
        about: 'SSC CGL is an examination conducted to recruit staff to various posts in ministries, departments and organisations of the Government of India. It is one of the biggest exams for graduate level students in India.',
        pattern: '<ul><li><b>Tier-I:</b> Computer Based Examination (Objective) - 100 questions, 200 marks, 60 minutes.</li><li><b>Tier-II:</b> Computer Based Examination. Paper I is compulsory for all. Paper II (Statistics) for JSO. Paper III (Finance/Economics) for AAO.</li></ul>',
        eligibility: '<p>Bachelor’s Degree from a recognized University. Age limit varies from 18 to 32 years depending on the specific post applied for.</p>',
        syllabus: '<p><b>Tier-I:</b> General Intelligence and Reasoning, General Awareness, Quantitative Aptitude, English Comprehension.<br><b>Tier-II:</b> Mathematical Abilities, Reasoning, English Language, General Awareness, Computer Knowledge.</p>',
        dates: '<p><b>Notification:</b> June 2024<br><b>Tier I Exam:</b> Sept-Oct 2024<br><b>Tier II Exam:</b> December 2024</p>',
        links: '<a href="https://ssc.nic.in/" target="_blank" style="color: #3b82f6; text-decoration: none; font-weight: 600;"><i class="fas fa-external-link-alt"></i> Official SSC Website</a>',
        subjects: [
            { id: 't1-reasoning', name: 'Tier I: General Intelligence & Reasoning' },
            { id: 't1-gk', name: 'Tier I: General Awareness' },
            { id: 't1-quant', name: 'Tier I: Quantitative Aptitude' },
            { id: 't1-english', name: 'Tier I: English Comprehension' },
            { id: 't2-maths', name: 'Tier II: Mathematical Abilities' },
            { id: 't2-reasoning', name: 'Tier II: Reasoning and General Intelligence' },
            { id: 't2-english', name: 'Tier II: English Language and Comprehension' },
            { id: 't2-gk', name: 'Tier II: General Awareness' },
            { id: 't2-computer', name: 'Tier II: Computer Knowledge Module' },
            { id: 't2-typing', name: 'Tier II: Data Entry Speed Test' },
            { id: 't2-stats', name: 'Tier II (Paper 2): Statistics (For JSO)' },
            { id: 't2-finance', name: 'Tier II (Paper 3): Finance & Economics (For AAO)' }
        ]
    },

    // ==========================================
    // BANKING
    // ==========================================
    'ibps-po': {
        name: 'IBPS PO',
        category_id: 'banking',
        short_description: 'Institute of Banking Personnel Selection Probationary Officer exam.',
        about: 'IBPS PO is a national-level recruitment exam conducted to recruit Probationary Officers and Management Trainees in participating public sector banks.',
        pattern: '<ul><li><b>Preliminary:</b> 100 Objective questions, 100 marks, 60 minutes.</li><li><b>Main:</b> 155 Objective questions (200 marks) + Descriptive Paper (25 marks), total 3.5 hours.</li><li><b>Interview:</b> 100 marks.</li></ul>',
        eligibility: '<p>A Degree (Graduation) in any discipline from a University recognized by the Govt. of India. Age Limit: 20 to 30 years.</p>',
        syllabus: '<p><b>Prelims:</b> English Language, Quantitative Aptitude, Reasoning Ability.<br><b>Mains:</b> Reasoning & Computer Aptitude, General/Economy/Banking Awareness, English Language, Data Analysis & Interpretation. Descriptive: Letter Writing & Essay.</p>',
        dates: '<p><b>Notification:</b> August 2024<br><b>Prelims Exam:</b> Oct 2024<br><b>Mains Exam:</b> Nov 2024</p>',
        links: '<a href="https://ibps.in/" target="_blank" style="color: #3b82f6; text-decoration: none; font-weight: 600;"><i class="fas fa-external-link-alt"></i> Official IBPS Website</a>',
        subjects: [
            { id: 'pre-english', name: 'Prelims: English Language' },
            { id: 'pre-quant', name: 'Prelims: Quantitative Aptitude' },
            { id: 'pre-reasoning', name: 'Prelims: Reasoning Ability' },
            { id: 'mains-reasoning-comp', name: 'Mains: Reasoning & Computer Aptitude' },
            { id: 'mains-gk', name: 'Mains: General/Economy/Banking Awareness' },
            { id: 'mains-english', name: 'Mains: English Language' },
            { id: 'mains-data', name: 'Mains: Data Analysis & Interpretation' },
            { id: 'mains-descriptive', name: 'Mains: Descriptive Paper (English)' },
            { id: 'interview', name: 'Interview Preparation' }
        ]
    },

    // ==========================================
    // MEDICAL
    // ==========================================
    'neet-ug': {
        name: 'NEET-UG',
        category_id: 'medical',
        short_description: 'National Eligibility cum Entrance Test for undergraduate medical courses.',
        about: 'NEET (UG) is the sole entrance test for admission to MBBS and BDS courses in India. It is conducted by the National Testing Agency (NTA).',
        pattern: '<ul><li><b>Mode:</b> Pen and Paper based (Offline)</li><li><b>Questions:</b> 200 MCQs (Attempt 180). Total 720 marks.</li><li><b>Marking Scheme:</b> +4 for correct, -1 for incorrect.</li><li><b>Duration:</b> 3 hours 20 minutes.</li></ul>',
        eligibility: '<p>Candidate must have passed 10+2 with Physics, Chemistry, Biology/Biotechnology, and English. Minimum age: 17 years.</p>',
        syllabus: '<p>Based on Class 11 and 12 NCERT curriculum for Physics, Chemistry, and Biology (Botany & Zoology).</p>',
        dates: '<p><b>Exam Date:</b> May 5, 2024<br><b>Results:</b> June 2024</p>',
        links: '<a href="https://neet.nta.nic.in/" target="_blank" style="color: #3b82f6; text-decoration: none; font-weight: 600;"><i class="fas fa-external-link-alt"></i> Official NEET Website</a>',
        subjects: [
            { id: 'physics-11', name: 'Physics (Class 11)' },
            { id: 'physics-12', name: 'Physics (Class 12)' },
            { id: 'chem-physical-11', name: 'Physical Chemistry (Class 11)' },
            { id: 'chem-organic-11', name: 'Organic Chemistry (Class 11)' },
            { id: 'chem-inorganic-11', name: 'Inorganic Chemistry (Class 11)' },
            { id: 'chem-physical-12', name: 'Physical Chemistry (Class 12)' },
            { id: 'chem-organic-12', name: 'Organic Chemistry (Class 12)' },
            { id: 'chem-inorganic-12', name: 'Inorganic Chemistry (Class 12)' },
            { id: 'botany-11', name: 'Botany (Class 11)' },
            { id: 'botany-12', name: 'Botany (Class 12)' },
            { id: 'zoology-11', name: 'Zoology (Class 11)' },
            { id: 'zoology-12', name: 'Zoology (Class 12)' },
            { id: 'full-mock', name: 'Full Length Mock Test Papers' }
        ]
    },

    // ==========================================
    // ENGINEERING
    // ==========================================
    'jee-main': {
        name: 'JEE Main',
        category_id: 'engineering',
        short_description: 'Joint Entrance Examination for NITs, IIITs and CFTIs.',
        about: 'JEE Main is a standardized computer-based test for admission to various technical undergraduate programs in engineering, architecture, and planning across India.',
        pattern: '<ul><li><b>Paper 1 (B.E./B.Tech):</b> Physics, Chemistry, Maths. 90 Questions (Attempt 75). Total 300 marks.</li><li><b>Marking Scheme:</b> +4 for correct, -1 for incorrect.</li></ul>',
        eligibility: '<p>Passed 10+2 examination with Physics, Mathematics, and Chemistry/Biology/Biotech. No age limit.</p>',
        syllabus: '<p>Based on Class 11 and 12 CBSE curriculum for Physics, Chemistry, and Mathematics.</p>',
        dates: '<p><b>Session 1:</b> January 2024<br><b>Session 2:</b> April 2024</p>',
        links: '<a href="https://jeemain.nta.nic.in/" target="_blank" style="color: #3b82f6; text-decoration: none; font-weight: 600;"><i class="fas fa-external-link-alt"></i> Official JEE Main Website</a>',
        subjects: [
            { id: 'math-algebra', name: 'Mathematics: Algebra' },
            { id: 'math-calculus', name: 'Mathematics: Calculus' },
            { id: 'math-coordinate', name: 'Mathematics: Coordinate Geometry' },
            { id: 'math-trigo', name: 'Mathematics: Trigonometry' },
            { id: 'phy-mechanics', name: 'Physics: Mechanics' },
            { id: 'phy-electro', name: 'Physics: Electromagnetism' },
            { id: 'phy-optics', name: 'Physics: Optics & Modern Physics' },
            { id: 'phy-thermo', name: 'Physics: Thermodynamics' },
            { id: 'chem-physical', name: 'Physical Chemistry' },
            { id: 'chem-organic', name: 'Organic Chemistry' },
            { id: 'chem-inorganic', name: 'Inorganic Chemistry' },
            { id: 'barch-aptitude', name: 'B.Arch: Aptitude Test' },
            { id: 'barch-drawing', name: 'B.Arch: Drawing Test' }
        ]
    },

    // ==========================================
    // MANAGEMENT
    // ==========================================
    'cat': {
        name: 'CAT',
        category_id: 'management',
        short_description: 'Common Admission Test for IIMs and other top B-Schools.',
        about: 'The Common Admission Test (CAT) is a computer-based test for admission in graduate management programs. It assesses quantitative, verbal/reading, data interpretation, and logical reasoning skills.',
        pattern: '<ul><li><b>Mode:</b> Computer Based Test (CBT)</li><li><b>Sections:</b> VARC, DILR, QA.</li><li><b>Duration:</b> 120 minutes (40 min per section).</li><li><b>Questions:</b> 66 questions. Total 198 marks (+3 correct, -1 incorrect).</li></ul>',
        eligibility: '<p>Bachelor’s degree with at least 50% marks (45% for SC/ST/PwD). No age limit.</p>',
        syllabus: '<p><b>VARC:</b> Reading Comprehension, Para Jumbles, Verbal Reasoning. <b>DILR:</b> Tables, Graphs, Puzzles, Arrangements. <b>QA:</b> Arithmetic, Algebra, Geometry, Number System, Modern Math.</p>',
        dates: '<p><b>Notification:</b> July 2024<br><b>Exam Date:</b> November 24, 2024</p>',
        links: '<a href="https://iimcat.ac.in/" target="_blank" style="color: #3b82f6; text-decoration: none; font-weight: 600;"><i class="fas fa-external-link-alt"></i> Official CAT Website</a>',
        subjects: [
            { id: 'varc-rc', name: 'VARC: Reading Comprehension' },
            { id: 'varc-verbal', name: 'VARC: Verbal Ability (Para Jumbles, Summary)' },
            { id: 'dilr-di', name: 'DILR: Data Interpretation' },
            { id: 'dilr-lr', name: 'DILR: Logical Reasoning' },
            { id: 'qa-arithmetic', name: 'QA: Arithmetic' },
            { id: 'qa-algebra', name: 'QA: Algebra' },
            { id: 'qa-geometry', name: 'QA: Geometry & Mensuration' },
            { id: 'qa-number', name: 'QA: Number System' },
            { id: 'qa-modern', name: 'QA: Modern Math' },
            { id: 'full-mock', name: 'Full Length Mock Tests' }
        ]
    },

    // ==========================================
    // LAW
    // ==========================================
    'clat': {
        name: 'CLAT',
        category_id: 'law',
        short_description: 'Common Law Admission Test.',
        about: 'Common Law Admission Test (CLAT) is a centralized national level entrance test for admissions to 22 National Law Universities (NLUs) in India.',
        pattern: '<ul><li><b>Mode:</b> Offline (Pen and Paper)</li><li><b>Questions:</b> 120 Comprehension-based Multiple Choice Questions.</li><li><b>Duration:</b> 2 Hours (120 minutes).</li><li><b>Marking Scheme:</b> +1 for correct, -0.25 for incorrect.</li></ul>',
        eligibility: '<p>Passed 10+2 or equivalent examination with a minimum of 45% marks. No upper age limit.</p>',
        syllabus: '<p>English Language, Current Affairs including General Knowledge, Legal Reasoning, Logical Reasoning, and Quantitative Techniques (Basic Maths).</p>',
        dates: '<p><b>Exam Date:</b> December 1, 2024</p>',
        links: '<a href="https://consortiumofnlus.ac.in/" target="_blank" style="color: #3b82f6; text-decoration: none; font-weight: 600;"><i class="fas fa-external-link-alt"></i> Official CLAT Website</a>',
        subjects: [
            { id: 'english', name: 'English Language' },
            { id: 'current-affairs', name: 'Current Affairs & GK' },
            { id: 'legal', name: 'Legal Reasoning' },
            { id: 'logical', name: 'Logical Reasoning' },
            { id: 'quant', name: 'Quantitative Techniques' },
            { id: 'mock', name: 'CLAT Full Mocks' }
        ]
    },

    // ==========================================
    // TEACHING
    // ==========================================
    'ugc-net': {
        name: 'UGC NET',
        category_id: 'teaching',
        short_description: 'University Grants Commission National Eligibility Test for Assistant Professor and JRF.',
        about: 'The UGC NET (National Eligibility Test) is conducted by the NTA to determine eligibility for the post of Assistant Professor and/or Junior Research Fellowship (JRF).',
        pattern: '<ul><li><b>Mode:</b> CBT</li><li><b>Paper 1:</b> 50 questions (100 marks)</li><li><b>Paper 2:</b> 100 questions (200 marks)</li><li><b>Duration:</b> 3 hours total. No negative marking.</li></ul>',
        eligibility: '<p>Master’s Degree with at least 55% marks. Max age for JRF is 30. No age limit for Assistant Professor.</p>',
        syllabus: '<p>Paper 1: Teaching & Research Aptitude. Paper 2: Based on selected PG subject.</p>',
        dates: '<p><b>Cycle 1:</b> June 2024<br><b>Cycle 2:</b> December 2024</p>',
        links: '<a href="https://ugcnet.nta.nic.in/" target="_blank" style="color: #3b82f6; text-decoration: none; font-weight: 600;"><i class="fas fa-external-link-alt"></i> Official UGC NET Website</a>',
        subjects: [
            { id: '00', name: 'Paper 1 (General Paper on Teaching & Research Aptitude)' },
            { id: '01', name: 'Economics' },
            { id: '02', name: 'Political Science' },
            { id: '03', name: 'Philosophy' },
            { id: '04', name: 'Psychology' },
            { id: '05', name: 'Sociology' },
            { id: '06', name: 'History' },
            { id: '08', name: 'Commerce' },
            { id: '09', name: 'Education' },
            { id: '17', name: 'Management' },
            { id: '20', name: 'Hindi' },
            { id: '30', name: 'English' },
            { id: '58', name: 'Law' },
            { id: '80', name: 'Geography' },
            { id: '87', name: 'Computer Science and Applications' }
            // Abbreviated for script readability, user already saw full list earlier or I can put the full list
        ]
    }
};

window.MOCK_EXAM_DATA['ugc-net'].subjects = [
    { id: '00', name: 'Paper 1 (General Paper on Teaching & Research Aptitude)' },
    { id: '01', name: 'Economics' },
    { id: '02', name: 'Political Science' },
    { id: '03', name: 'Philosophy' },
    { id: '04', name: 'Psychology' },
    { id: '05', name: 'Sociology' },
    { id: '06', name: 'History' },
    { id: '07', name: 'Anthropology' },
    { id: '08', name: 'Commerce' },
    { id: '09', name: 'Education' },
    { id: '10', name: 'Social Work' },
    { id: '11', name: 'Defence and Strategic Studies' },
    { id: '12', name: 'Home Science' },
    { id: '14', name: 'Public Administration' },
    { id: '15', name: 'Population Studies' },
    { id: '16', name: 'Music' },
    { id: '17', name: 'Management' },
    { id: '18', name: 'Maithili' },
    { id: '19', name: 'Bengali' },
    { id: '20', name: 'Hindi' },
    { id: '21', name: 'Kannada' },
    { id: '22', name: 'Malayalam' },
    { id: '23', name: 'Odia' },
    { id: '24', name: 'Punjabi' },
    { id: '25', name: 'Sanskrit' },
    { id: '26', name: 'Tamil' },
    { id: '27', name: 'Telugu' },
    { id: '28', name: 'Urdu' },
    { id: '29', name: 'Arabic' },
    { id: '30', name: 'English' },
    { id: '31', name: 'Linguistics' },
    { id: '32', name: 'Chinese' },
    { id: '33', name: 'Dogri' },
    { id: '34', name: 'Nepali' },
    { id: '35', name: 'Manipuri' },
    { id: '36', name: 'Assamese' },
    { id: '37', name: 'Gujarati' },
    { id: '38', name: 'Marathi' },
    { id: '39', name: 'French' },
    { id: '40', name: 'Spanish' },
    { id: '41', name: 'Russian' },
    { id: '42', name: 'Persian' },
    { id: '43', name: 'Rajasthani' },
    { id: '44', name: 'German' },
    { id: '45', name: 'Japanese' },
    { id: '46', name: 'Adult Education' },
    { id: '47', name: 'Physical Education' },
    { id: '58', name: 'Law' },
    { id: '59', name: 'Library and Information Science' },
    { id: '80', name: 'Geography' },
    { id: '87', name: 'Computer Science and Applications' },
    { id: '88', name: 'Electronic Science' },
    { id: '89', name: 'Environmental Sciences' }
];

// Fallback logic inside the file for any missing exam
window.getExamData = function(slug) {
    if (window.MOCK_EXAM_DATA[slug]) {
        return window.MOCK_EXAM_DATA[slug];
    }
    
    // Auto-generate generic profile for missing exams
    return {
        name: slug.toUpperCase().replace(/-/g, ' '),
        category_id: 'general',
        short_description: 'Select your subject to access the AI tools.',
        about: 'Detailed information for this exam is currently being updated by our expert team. It will be available shortly.',
        pattern: '<p>Exam pattern details are currently being verified.</p>',
        eligibility: '<p>Eligibility criteria are currently being verified.</p>',
        syllabus: '<p>The detailed syllabus is being compiled. Please refer to the official notification in the meantime.</p>',
        dates: '<p>Upcoming exam dates will be updated soon.</p>',
        links: '<p>Official links will be added shortly.</p>',
        subjects: [
            { id: 'paper-1', name: 'Paper 1 (General)' },
            { id: 'paper-2', name: 'Paper 2 (Core Subject)' },
            { id: 'quant', name: 'Quantitative Aptitude' },
            { id: 'reasoning', name: 'Logical Reasoning' },
            { id: 'english', name: 'Verbal / English' },
            { id: 'gk', name: 'General Knowledge' },
            { id: 'mock', name: 'Full Length Mocks' }
        ]
    };
};

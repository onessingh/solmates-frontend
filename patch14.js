const fs = require('fs');
const path = require('path');

// Skip these pages
const SKIP = ['recycle-bin.html', 'ai-knowledge', 'admin-dashboard', '404.html', 'offline.html', 
               'feedback-s-singh.html', 'index-s-singh.html', 'pdf-viewer.html', 'video-viewer.html',
               'classic.html', 'minimal.html', 'modern.html'];

// Page descriptions
const descriptions = {
  // Root pages
  'index.html': 'SOLMATES - Your complete DU SOL MBA student platform. Access study notes, PYQs, live classes, recorded lectures, 63+ AI-powered tools, skill development, games, and real-time SOL notifications. Built for DU SOL MBA students.',
  'notification.html': 'Get real-time DU SOL notifications and updates. Stay informed about exam dates, results, timetables, merit lists, and all official SOL announcements. Instant alerts for DU SOL MBA students.',
  'feedback.html': 'Share your feedback and suggestions for SOLMATES - the DU SOL student platform. Help us improve your learning experience with your valuable inputs.',
  'privacy-policy.html': 'SOLMATES Privacy Policy - Learn how we collect, use, and protect your personal data. Our commitment to student privacy and data security at solmates.in.',
  'ai-chatbot.html': 'Mate - Your AI-powered academic assistant on SOLMATES. Get instant answers to DU SOL MBA questions, study guidance, and academic support 24/7.',
  
  // Journey
  'journey/index.html': 'Track your DU SOL MBA academic journey on SOLMATES. Monitor your semester progress, completed courses, and milestones throughout your distance education program.',
  
  // Database
  'database/index.html': 'DU SOL MBA complete study material database. Access semester-wise notes, previous year question papers (PYQs), one-shot notes, e-books, recorded classes, YouTube playlists, and class materials.',
  'database/view.html': 'Browse and view DU SOL study materials including MBA notes, PYQs, one-shot revision notes, e-books, and class materials organized by semester.',
  'database/youtube-browse.html': 'Access curated YouTube video lectures and educational playlists for DU SOL MBA students. Free recorded online classes and subject-specific video content.',
  'database/youtube-content.html': 'Watch DU SOL MBA subject-specific YouTube lectures and video content. Free educational videos for distance learning students.',
  'database/classes/index.html': 'DU SOL MBA live and recorded classes. Access online lectures, session recordings, and class materials for all MBA semesters on SOLMATES.',
  
  // Exam Prep
  'exam-prep/index.html': 'Comprehensive exam preparation resources for DU SOL MBA students. Study kits, subject overviews, and structured preparation plans for semester examinations.',
  'exam-prep/overview.html': 'DU SOL MBA exam overview and preparation guide. Understand exam patterns, marking schemes, and important topics for all MBA subjects.',
  'exam-prep/study-kit.html': 'Complete DU SOL MBA study kit with notes, PYQs, and revision materials. Structured study resources for effective exam preparation.',
  'exam-prep/subjects.html': 'DU SOL MBA subject-wise study resources. Access chapter-wise notes, important questions, and study materials for all MBA subjects.',

  // Games
  'games/index.html': 'Educational business games for DU SOL MBA students. Play interactive games covering MBA concepts, business strategy, finance, and entrepreneurship on SOLMATES.',
  'games/case-study-arena/index.html': 'Case Study Arena - Interactive MBA case study game on SOLMATES. Practice real-world business problem solving and sharpen your analytical thinking skills.',
  'games/market-mavericks/index.html': 'Market Mavericks - A competitive stock market and business simulation game for DU SOL MBA students. Learn investment and trading concepts interactively.',
  'games/quiz-battle/index.html': 'Quiz Battle - Multiplayer MBA knowledge quiz game on SOLMATES. Compete with fellow DU SOL students on MBA subjects, current affairs, and business concepts.',
  'games/rapid-fire/index.html': 'Rapid Fire Quiz - Fast-paced MBA concept testing game on SOLMATES. Test your knowledge of MBA subjects with rapid-fire questions and instant feedback.',
  'games/shark-pitch/index.html': 'Shark Pitch - Business pitch simulation game for DU SOL MBA students. Practice entrepreneurship, startup pitching, and business presentation skills.',

  // Skills
  'skills/index.html': 'SOLMATES Skills Hub - Comprehensive career and skill development resources for DU SOL MBA students. Explore aptitude tests, personality assessments, and career guidance.',
  'skills/aptitude-test.html': 'MBA Aptitude Test preparation on SOLMATES. Practice quantitative aptitude, logical reasoning, and verbal ability questions for placement exams and competitive tests.',
  'skills/certification-guide.html': 'Professional certification guide for DU SOL MBA students. Explore industry-recognized certifications in management, finance, marketing, and HR to boost your career.',
  'skills/company-culture.html': 'Understanding company culture for DU SOL MBA placement preparation. Learn how to evaluate workplace environments and align your career goals with organizational values.',
  'skills/growth-opportunities.html': 'Career growth opportunities guide for DU SOL MBA graduates. Explore advancement paths, promotion strategies, and leadership development resources.',
  'skills/interest-inventory.html': 'Career interest inventory assessment for DU SOL MBA students. Discover your professional interests and find the perfect career path matching your strengths.',
  'skills/job-market.html': 'Current job market insights and trends for DU SOL MBA graduates. Stay updated on hiring demands, in-demand skills, and industry opportunities.',
  'skills/learning-path.html': 'Personalized learning path builder for DU SOL MBA students. Create a structured skill development roadmap for your academic and professional growth.',
  'skills/personality-test.html': 'Personality test for DU SOL MBA career guidance. Identify your professional strengths, work style, and ideal career path through scientific personality assessment.',
  'skills/project-ideas.html': 'MBA project ideas and research topics for DU SOL students. Find innovative project concepts for MBA assignments, dissertations, and summer internship projects.',
  'skills/salary-insights.html': 'Salary insights and compensation data for DU SOL MBA graduates. Compare salary packages across industries, companies, and MBA specializations.',
  'skills/skill-gap.html': 'Skill gap analysis tool for DU SOL MBA students. Identify the gap between your current skills and industry requirements to plan targeted learning.',
  'skills/skill-tracker.html': 'Skill tracker for DU SOL MBA students. Monitor your skill development progress, set learning goals, and track certifications and achievements over time.',

  // Tools - General
  'tools/index.html': 'SOLMATES Tools Hub - 63+ free AI-powered tools for DU SOL MBA students. Productivity tools, finance calculators, AI writers, PDF utilities, career tools, and more.',
  'tools/calculator.html': 'Advanced academic calculator for DU SOL MBA students. Solve complex mathematics, financial calculations, statistics, and business math problems with this free calculator.',
  'tools/attendance.html': 'Attendance tracker for DU SOL MBA students. Monitor your class attendance percentage, set attendance goals, and never miss the minimum attendance requirement.',
  'tools/assignment-tracker.html': 'Assignment tracker for DU SOL MBA students. Manage assignment deadlines, submission schedules, and academic tasks efficiently with this free tool.',
  'tools/flashcards.html': 'AI-powered flashcard generator for DU SOL MBA exam preparation. Create smart revision cards for MBA subjects, memorize key concepts, and boost retention.',
  'tools/mcq-generator.html': 'AI MCQ generator for DU SOL MBA exam practice. Generate unlimited multiple choice questions on any MBA subject or topic to prepare for semester examinations.',
  'tools/question-paper-generator.html': 'AI question paper generator for exam practice. Create customized practice papers for DU SOL MBA, CBSE, and any subject with answers in seconds. Free tool by SOLMATES.',
  'tools/coverpage.html': 'Professional assignment cover page generator for DU SOL MBA students. Create formatted cover pages with university details, student information, and subject data instantly.',
  'tools/teleprompter.html': 'Free online teleprompter for DU SOL MBA students. Read scripts smoothly for presentations, viva, video assignments, and online examinations.',
  'tools/compressor.html': 'Free image and PDF compressor for DU SOL students. Reduce file sizes for online form submissions, exam portals, and academic document uploads.',
  'tools/converter.html': 'File format converter for DU SOL students. Convert documents, images, and files between different formats for academic submissions and university portals.',
  'tools/zero-size-pdf.html': 'Reduce PDF file size to near zero for DU SOL exam form submissions. Compress PDFs within portal size limits without losing document quality.',
  'tools/text-humanizer.html': 'AI text humanizer tool to make AI-generated content sound natural. Perfect for DU SOL MBA assignments and academic writing that needs a human touch.',
  'tools/corporate-translator.html': 'Corporate language translator - Convert plain language to professional corporate communication. Ideal for DU SOL MBA students learning business communication.',
  'tools/ai-excuse-generator.html': 'AI excuse generator for funny, creative excuses. A lighthearted tool for DU SOL MBA students needing creative reasons for extensions or absences.',
  'tools/custom-services.html': 'Customized academic services for DU SOL MBA students. Get personalized study materials, assignment help, and tailored academic resources on SOLMATES.',
  'tools/pestle-maker.html': 'PESTLE analysis maker for DU SOL MBA students. Create detailed Political, Economic, Social, Technological, Legal, and Environmental analysis for business case studies.',
  'tools/swot-maker.html': 'SWOT analysis maker for DU SOL MBA students. Generate professional Strength, Weakness, Opportunity, and Threat analysis for MBA case studies and business projects.',
  'tools/business-case.html': 'Business case study builder for DU SOL MBA students. Structure and write comprehensive business case analyses with AI assistance for academic assignments.',
  'tools/business-validator.html': 'Business idea validator for DU SOL MBA entrepreneurship students. Evaluate your startup idea viability using market analysis, feasibility checks, and business metrics.',
  'tools/careertest.html': 'Career aptitude test for DU SOL MBA students. Discover your ideal MBA specialization and career path through a comprehensive career assessment and guidance tool.',
  'tools/ats-checker.html': 'ATS resume checker for DU SOL MBA placement. Analyze your resume against Applicant Tracking Systems, get improvement suggestions, and boost shortlisting chances.',
  'tools/cover-letter.html': 'AI cover letter generator for DU SOL MBA students. Create tailored, professional cover letters for job applications in seconds with our free AI writing tool.',
  'tools/email-generator.html': 'Professional email generator for DU SOL MBA students. Write formal academic emails, internship requests, job applications, and business communications with AI.',
  'tools/interview.html': 'AI interview preparation tool for DU SOL MBA students. Practice common MBA interview questions, get model answers, and prepare for campus placements with AI coaching.',
  'tools/linkedin-checklist.html': 'LinkedIn profile optimization checklist for DU SOL MBA students. Improve your LinkedIn presence, boost recruiter visibility, and enhance your professional brand.',
  'tools/salary-calculator.html': 'Salary calculator and CTC breakdown tool for DU SOL MBA students. Understand your take-home pay, tax deductions, PF contributions, and net salary calculation.',
  'tools/financial-ratio.html': 'Financial ratio calculator for DU SOL MBA Finance students. Calculate liquidity, profitability, leverage, and efficiency ratios for financial analysis assignments.',
  'tools/break-even.html': 'Break-even analysis calculator for DU SOL MBA students. Find the break-even point for business ventures and understand cost-volume-profit relationships.',
  'tools/gst-calculator.html': 'GST calculator for DU SOL MBA students. Calculate Goods and Services Tax (GST), input tax credit, and tax-inclusive/exclusive prices for business finance studies.',
  'tools/loan-calculator.html': 'Loan EMI calculator for DU SOL MBA Finance students. Calculate monthly EMI, total interest payable, and loan amortization schedule for finance assignments.',
  'tools/freelance-calculator.html': 'Freelance rate calculator for DU SOL MBA students exploring independent consulting. Determine your hourly rate, project pricing, and freelance income potential.',
  'tools/startup-valuation.html': 'Startup valuation calculator for DU SOL MBA Entrepreneurship students. Estimate company value using DCF, market multiples, and VC method for project assignments.',
  'tools/resignation-kit.html': 'Professional resignation kit generator for MBA students and working professionals. Create formal resignation letters, handover notes, and exit documentation templates.',
  
  // PDF Tools
  'tools/pdf-tools/index.html': 'Complete PDF toolkit for DU SOL students. Merge, split, compress, convert, protect, watermark, OCR, rotate, and manage PDF files for academic submissions.',
  'tools/pdf-tools/merge.html': 'Free PDF merger tool for DU SOL students. Combine multiple PDF files into one document for academic submissions, assignments, and university portal uploads.',
  'tools/pdf-tools/split.html': 'Free PDF splitter for DU SOL students. Split large PDFs into individual pages or sections for organized academic document management.',
  'tools/pdf-tools/compress.html': 'PDF compressor for DU SOL online exam portal submissions. Reduce PDF file size while maintaining quality for university form and document uploads.',
  'tools/pdf-tools/protect.html': 'PDF password protection tool for DU SOL students. Add password security to your academic documents and assignments for secure sharing.',
  'tools/pdf-tools/unlock.html': 'PDF password remover for DU SOL students. Remove password protection from PDF files for easy access to academic documents.',
  'tools/pdf-tools/watermark.html': 'PDF watermark tool for DU SOL MBA students. Add text or image watermarks to academic documents for branding and copyright protection.',
  'tools/pdf-tools/rotate.html': 'PDF page rotation tool for DU SOL students. Fix incorrectly scanned documents and rotate PDF pages for proper academic submission formatting.',
  'tools/pdf-tools/ocr.html': 'PDF OCR text extraction for DU SOL students. Convert scanned documents and image-based PDFs to searchable, editable text for academic research.',
  'tools/pdf-tools/translate.html': 'PDF translator tool for DU SOL MBA students. Translate PDF documents between languages for understanding international academic resources.',
  'tools/pdf-tools/jpg-to-pdf.html': 'JPG to PDF converter for DU SOL students. Convert images and photos to PDF format for academic submissions and university portal uploads.',
  'tools/pdf-tools/pdf-to-jpg.html': 'PDF to JPG converter for DU SOL students. Extract images from PDF documents and convert PDF pages to image files.',
  'tools/pdf-tools/word-to-pdf.html': 'Word to PDF converter for DU SOL MBA assignment submissions. Convert DOCX files to PDF format for university portal uploads.',
  'tools/pdf-tools/pdf-to-word.html': 'PDF to Word converter for DU SOL students. Convert PDF documents to editable DOCX format for revising and editing academic content.',
  'tools/pdf-tools/pdf-to-ppt.html': 'PDF to PowerPoint converter for DU SOL MBA students. Convert PDF lecture slides and presentations to editable PPT format.',
  'tools/pdf-tools/excel-to-pdf.html': 'Excel to PDF converter for DU SOL MBA Finance students. Convert spreadsheets and financial models to PDF for academic submissions.',
  'tools/pdf-tools/html-to-pdf.html': 'HTML to PDF converter for DU SOL students. Convert web pages and HTML content to PDF documents for offline access and printing.',
  'tools/pdf-tools/add-pages.html': 'PDF page insertion tool for DU SOL students. Insert blank pages or merge additional pages into existing PDF documents for academic formatting.',
  'tools/pdf-tools/delete-pages.html': 'PDF page deletion tool for DU SOL students. Remove unwanted pages from PDF documents to create clean, focused academic submissions.',
  'tools/pdf-tools/organize.html': 'PDF page organizer for DU SOL students. Rearrange, sort, and organize PDF pages to create properly structured academic documents.',
  'tools/pdf-tools/page-numbers.html': 'PDF page numbering tool for DU SOL MBA students. Add professional page numbers to academic assignments and university submissions.',
  'tools/pdf-tools/scan.html': 'Document scanner tool for DU SOL students. Scan physical documents using your mobile camera and convert to clean PDF format for digital submissions.',
  'tools/pdf-tools/zip-creator.html': 'ZIP file creator for DU SOL students. Compress multiple academic files into a single ZIP archive for easy sharing and email attachment.',
  'tools/pdf-tools/favicon-generator.html': 'Favicon generator tool for web developers and DU SOL Computer Science students. Create custom website favicons from images in multiple sizes.',
  
  // Special Tools
  'tools/ai-study-companion/index.html': 'AI Study Companion for DU SOL MBA students. Get personalized AI-powered study assistance, concept explanations, and interactive learning support for all MBA subjects.',
  'tools/job-search/index.html': 'Job search tool for DU SOL MBA placement. Find relevant job opportunities, internships, and entry-level management positions matching your MBA skills and interests.',
  'tools/notice-period/index.html': 'Notice period calculator for MBA students and working professionals. Calculate your official last working day, notice period buy-out, and resignation timeline.',
  'tools/planner/index.html': 'Academic planner for DU SOL MBA students. Organize your study schedule, exam preparation timeline, and semester tasks with our free digital planning tool.',
  'tools/portfolio-builder/index.html': 'Professional portfolio builder for DU SOL MBA students. Create an impressive online portfolio showcasing your academic projects, skills, and professional achievements.',
  'tools/resumebuilder/index.html': 'Free resume builder for DU SOL MBA students. Create professional, ATS-friendly resumes with multiple templates to boost campus placement and job application success.',
};

const base = 'c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/';
let updated = 0, skipped = 0;

for (const [relPath, desc] of Object.entries(descriptions)) {
  const fullPath = path.join(base, relPath);
  if (!fs.existsSync(fullPath)) { skipped++; continue; }
  
  let c = fs.readFileSync(fullPath, 'utf8');
  
  // If already has meta description, update it
  if (c.includes('<meta name="description"')) {
    c = c.replace(/<meta name="description" content="[^"]*">/g, `<meta name="description" content="${desc}">`);
  } else {
    // Add after <head>
    c = c.replace(/<head>/i, `<head>\n  <meta name="description" content="${desc}">`);
  }
  fs.writeFileSync(fullPath, c, 'utf8');
  updated++;
}
console.log(`Updated: ${updated} files, Skipped: ${skipped} files`);

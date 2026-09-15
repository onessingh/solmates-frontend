import json
import re

# Same user_data, real_paragraphs as before.
# We just add a URL map.

url_map = {
    # Database
    "Live Classes": "/database",
    "MBA in Healthcare": "/database/healthcare",
    "Recorded Classes": "/database",
    "Notes": "/database",
    "PYQs": "/database",
    "One Shot Notes": "/database",
    "E-Books": "/database",
    "YouTube Videos": "/database",
    "Class Materials": "/database",

    # Job & Professional
    "Resume Builder": "/tools/resumebuilder",
    "Job Search": "/tools/job-search",
    "Career Test": "/tools/careertest",
    "Interview Preparation": "/tools/interview",
    "Cold Email & LinkedIn Generator": "/tools/email-generator",
    "ATS Resume Checker": "/tools/ats-checker",
    "Cover Letter Generator": "/tools/cover-letter",
    "Salary Calculator": "/tools/salary-calculator",
    "LinkedIn Suite": "/tools/linkedin-checklist",
    "Portfolio Builder (Resume to Portfolio)": "/tools/portfolio-builder",
    "Notice Period Calculator": "/tools/notice-period",
    "Corporate Translator": "/tools/corporate-translator",
    "Resignation & Handover": "/tools/resignation-kit",
    "Freelance Rate Calculator": "/tools/freelance-calculator",
    "AI Excuse Generator": "/tools/ai-excuse-generator",

    # Academic & Productivity
    "Exam Prep AI": "/exam-prep",
    "AI Study Companion": "/tools/ai-study-companion",
    "Smart Flashcards": "/tools/flashcards",
    "Study Planner": "/tools/planner",
    "AI MCQ Generator": "/tools/mcq-generator",
    "AI Question Paper Generator": "/tools/question-paper-generator",
    "Zero Size PDF Converter": "/tools/zero-size-pdf",
    "Academic Calculator": "/tools/calculator",
    "Cover Page Generator": "/tools/coverpage",
    "PDF/Image Converter": "/tools/converter",
    "PDF/Image Compressor": "/tools/compressor",
    "Attendance Calculator": "/tools/attendance",
    "Assignment Tracker": "/tools/assignment-tracker",
    "Web Teleprompter": "/tools/teleprompter",
    "Text Humanizer": "/tools/text-humanizer",

    # PDF Tools Suite
    "Merge PDF": "/tools/pdf-tools/merge",
    "Split PDF": "/tools/pdf-tools/split",
    "ZIP Converter": "/tools/pdf-tools/zip-creator",
    "Compress PDF": "/tools/pdf-tools/compress",
    "PDF to Word": "/tools/pdf-tools/pdf-to-word",
    "PDF to PowerPoint": "/tools/pdf-tools/pdf-to-ppt",
    "Word to PDF": "/tools/pdf-tools/word-to-pdf",
    "Excel to PDF": "/tools/pdf-tools/excel-to-pdf",
    "PDF to JPG": "/tools/pdf-tools/pdf-to-jpg",
    "JPG to PDF": "/tools/pdf-tools/jpg-to-pdf",
    "Watermark": "/tools/pdf-tools/watermark",
    "Rotate PDF": "/tools/pdf-tools/rotate",
    "HTML to PDF": "/tools/pdf-tools/html-to-pdf",
    "Unlock PDF": "/tools/pdf-tools/unlock",
    "Protect PDF": "/tools/pdf-tools/protect",
    "Organize PDF": "/tools/pdf-tools/organize",
    "Page Numbers": "/tools/pdf-tools/page-numbers",
    "Scan to PDF": "/tools/pdf-tools/scan",
    "OCR PDF": "/tools/pdf-tools/ocr",
    "AI Summarizer": "/tools/pdf-tools/ai-summarizer",
    "Translate PDF": "/tools/pdf-tools/translate",
    "Delete PDF Pages": "/tools/pdf-tools/delete-pages",
    "Add PDF Pages": "/tools/pdf-tools/add-pages",
    "Favicon Generator": "/tools/pdf-tools/favicon-generator",

    # Business & Finance
    "AI Business Validator": "/tools/business-validator",
    "GST Invoice Calculator": "/tools/gst-calculator",
    "SWOT Analysis Maker": "/tools/swot-maker",
    "Business Case Template": "/tools/business-case",
    "Financial Ratio Calculator": "/tools/financial-ratio",
    "Break-Even Calculator": "/tools/break-even",
    "PESTLE Analysis Maker": "/tools/pestle-maker",
    "Startup Valuation": "/tools/startup-valuation",
    "EMI & Loan Schedule": "/tools/loan-calculator",

    # Skills (12 Modules)
    "Personality Assessment": "/skills/personality-test",
    "Aptitude Test": "/skills/aptitude-test",
    "Interest Inventory": "/skills/interest-inventory",
    "Skill Gap Analysis": "/skills/skill-gap",
    "Learning Path Generator": "/skills/learning-path",
    "Certification Guide": "/skills/certification-guide",
    "Skill Progress Tracker": "/skills/skill-tracker",
    "Project Ideas Generator": "/skills/project-ideas",
    "Salary Insights": "/skills/salary-insights",
    "Job Market Trends": "/skills/job-market",
    "Company Culture Finder": "/skills/company-culture",
    "Growth Opportunities": "/skills/growth-opportunities",

    # Gamified Learning (5 Games)
    "Quiz Battle": "/games/quiz-battle",
    "Rapid Fire": "/games/rapid-fire",
    "Case Study": "/games/case-study-arena",
    "Shark Pitch": "/games/shark-pitch",
    "Market Mavericks": "/games/market-mavericks",

    # Core Pages & Features
    "The Homepage": "/",
    "Notifications Page": "/",
    "Privacy & Terms Page": "/privacy-policy",
    "Journey Page": "/journey",
    "Feedback Page": "/feedback",
    "AI Chatbot": "/"
}

with open(r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\platform-guide.html", "r", encoding="utf-8") as f:
    content = f.read()

# We will regex replace each card.
# Currently they look like:
# <div class="guide-item-card">
#   <h3>Item Name</h3>
#   <p>Desc</p>
# </div>
# We will find <h3>Item Name</h3> and replace its parent <div class="..."> with <a href="..." class="...">

for item_name, url in url_map.items():
    # Escape item_name just in case
    escaped_name = re.escape(item_name)
    
    # We look for <div class="guide-item-card"> ... <h3>Item Name</h3> ... </div>
    pattern = r'<div class="guide-item-card">\s*<h3>' + escaped_name + r'<\/h3>\s*<p>(.*?)<\/p>\s*<\/div>'
    
    # Replacement string
    # Adding a hover effect class maybe? Standard card already has hover effect.
    replacement = f'<a href="{url}" class="guide-item-card" style="text-decoration: none; color: inherit; display: block;">\n          <h3>{item_name}</h3>\n          <p>\\1</p>\n        </a>'
    
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open(r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\platform-guide.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Added links to cards.")

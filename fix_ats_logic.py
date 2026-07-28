import re

html_path = r"C:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\tools\ats-checker.html"
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

new_logic = '''
    async function analyzeResume() {
      const resume = document.getElementById('resumeText').value.trim();
      const jd = document.getElementById('jdText').value.trim();

      if (!resume) {
        alert("Please paste your resume text first.");
        document.getElementById('resumeText').focus();
        return;
      }

      // UI States
      document.getElementById('emptyState').style.display = 'none';
      document.getElementById('resultsArea').style.display = 'none';
      document.getElementById('loader').style.display = 'block';
      const btn = document.getElementById('scanBtn');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing with AI...';
      btn.disabled = true;

      try {
        const response = await window.solmatesAPI.generateAIToolData('ats-checker', { resume, jd });
        if (!response.success) throw new Error(response.error || 'Failed to analyze resume');
        
        renderResults(response.data);
      } catch (err) {
        console.error(err);
        alert('An error occurred during analysis: ' + err.message);
      } finally {
        document.getElementById('loader').style.display = 'none';
        btn.innerHTML = '<i class="fas fa-search-plus"></i> Analyze My Resume';
        btn.disabled = false;
      }
    }

    function renderResults(data) {
      document.getElementById('resultsArea').style.display = 'block';

      // 1. Populate Metrics
      document.getElementById('valWordCount').innerHTML = <i class="fas fa-font"></i> ;
      document.getElementById('valVerbs').innerHTML = <i class="fas fa-bolt"></i> ;
      document.getElementById('valNumbers').innerHTML = <i class="fas fa-chart-bar"></i> ;
      document.getElementById('valKeywords').innerHTML = <i class="fas fa-key"></i> ;

      // 2. Score UI
      let score = Math.max(0, Math.min(100, data.score || 0));
      let circle = document.getElementById('scoreCircle');
      let text = document.getElementById('scoreText');
      let label = document.getElementById('scoreLabel');
      let desc = document.getElementById('scoreDesc');
      
      let strokeColor = "#dc3545"; // bad
      if (score >= 80) strokeColor = "#28a745"; // good
      else if (score >= 60) strokeColor = "#ffc107"; // warn

      circle.setAttribute("stroke", strokeColor);
      circle.setAttribute("stroke-dasharray", ${score}, 100);
      text.textContent = score;
      text.style.fill = strokeColor;

      if (score >= 80) {
        label.textContent = "Excellent!";
        label.style.color = "#28a745";
        desc.textContent = "Your resume is highly optimized for ATS and recruiters.";
      } else if (score >= 60) {
        label.textContent = "Good, but needs tweaks";
        label.style.color = "#ffc107";
        desc.textContent = "You'll pass some filters, but fixing the issues below will help.";
      } else {
        label.textContent = "Needs Improvement";
        label.style.color = "#dc3545";
        desc.textContent = "High risk of getting filtered out. Apply the feedback below immediately.";
      }

      // 3. Feedback Rendering
      let fbHtml = "";
      if (data.feedback && Array.isArray(data.feedback)) {
        data.feedback.forEach(f => {
          let icon = f.type === 'good' ? 'fa-check-circle' : (f.type === 'warn' ? 'fa-exclamation-triangle' : 'fa-times-circle');
          fbHtml += 
          <div class="feedback-card type-">
            <h4><i class="fas "></i> </h4>
            <p></p>
          </div>
          ;
        });
      }
      document.getElementById('feedbackList').innerHTML = fbHtml;
    }
'''

# Replace the whole block of JS from analyzeResume() down to document.getElementById('feedbackList').innerHTML = fbHtml; and beyond
regex = re.compile(r'function analyzeResume\(\).*?document\.getElementById\(\'feedbackList\'\)\.innerHTML = fbHtml;\s*\}', re.DOTALL)
html = regex.sub(new_logic, html)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Replaced local analysis logic with AI backend logic")

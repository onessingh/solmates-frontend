import os
import re

BOT_TOKEN = '8597525439:AAEV6WWYB3KXReoaNmbUoNWQqCyPvUe2laY'
CHAT_ID = '1772865405'

WIDGET_HTML = '''
<!-- ===== ASK QUERY WIDGET ===== -->
<style>
#queryFloatBtn {
  position: fixed;
  bottom: 80px;
  right: 18px;
  z-index: 9999;
  background: #0f2b46;
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 12px 18px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(15,43,70,0.35);
  display: flex;
  align-items: center;
  gap: 7px;
  transition: transform 0.2s, box-shadow 0.2s;
}
#queryFloatBtn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(15,43,70,0.45); }
#queryModalOverlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 10000;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
#queryModalOverlay.open { display: flex; }
#queryModal {
  background: #fff;
  border-radius: 18px;
  padding: 24px 20px;
  width: 100%;
  max-width: 420px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}
#queryModal h2 { color: #0f2b46; font-size: 20px; margin-bottom: 4px; }
#queryModal p.qsub { color: #666; font-size: 13px; margin-bottom: 18px; }
.qfield { margin-bottom: 14px; }
.qfield label { display: block; font-size: 13px; font-weight: 600; color: #333; margin-bottom: 5px; }
.qfield input, .qfield select, .qfield textarea {
  width: 100%; padding: 10px 13px; border: 1.5px solid #e2e8f0;
  border-radius: 10px; font-size: 14px; color: #1a1a1a;
  background: #f8fafc; outline: none; transition: border 0.2s;
  font-family: inherit;
}
.qfield input:focus, .qfield select:focus, .qfield textarea:focus { border-color: #0f2b46; }
.qfield textarea { resize: vertical; min-height: 90px; }
.qchar { font-size: 11px; color: #999; text-align: right; margin-top: 3px; }
#qSubmitBtn {
  width: 100%; padding: 13px; background: #0f2b46; color: #fff;
  border: none; border-radius: 12px; font-size: 15px; font-weight: 600;
  cursor: pointer; margin-top: 6px; transition: background 0.2s;
}
#qSubmitBtn:hover { background: #1a3c5e; }
#qSubmitBtn:disabled { background: #ccc; cursor: not-allowed; }
#qCloseBtn {
  position: absolute; top: 14px; right: 16px;
  background: none; border: none; font-size: 22px; color: #666; cursor: pointer;
}
#qSuccessMsg {
  display: none; text-align: center; padding: 20px 0;
}
#qSuccessMsg .qcheck { font-size: 48px; }
#qSuccessMsg h3 { color: #0f2b46; margin: 10px 0 6px; }
#qSuccessMsg p { color: #555; font-size: 14px; }
.qopt { color: #999; font-size: 11px; }
</style>

<button id="queryFloatBtn" onclick="openQueryModal()">&#10067; Ask Query</button>

<div id="queryModalOverlay">
  <div id="queryModal">
    <button id="qCloseBtn" onclick="closeQueryModal()">&#x2715;</button>
    <div id="qFormSection">
      <h2>&#10067; Ask Your Query</h2>
      <p class="qsub">We will reach out to you personally &#128591;</p>
      <div class="qfield">
        <label>Full Name *</label>
        <input type="text" id="qName" placeholder="Your name" maxlength="60">
      </div>
      <div class="qfield">
        <label>Phone Number *</label>
        <input type="tel" id="qPhone" placeholder="10-digit mobile number" maxlength="10">
      </div>
      <div class="qfield">
        <label>Gmail <span class="qopt">(optional)</span></label>
        <input type="email" id="qGmail" placeholder="your@gmail.com">
      </div>
      <div class="qfield">
        <label>Semester *</label>
        <select id="qSemester">
          <option value="">-- Select Semester --</option>
          <option value="1st Semester">1st Semester</option>
          <option value="2nd Semester">2nd Semester</option>
          <option value="3rd Semester">3rd Semester</option>
          <option value="4th Semester">4th Semester</option>
          <option value="5th Semester">5th Semester</option>
          <option value="6th Semester">6th Semester</option>
        </select>
      </div>
      <div class="qfield">
        <label>Query Type *</label>
        <select id="qType">
          <option value="">-- Select Type --</option>
          <option value="Study Material">Study Material</option>
          <option value="Exam Related">Exam Related</option>
          <option value="Technical Issue">Technical Issue</option>
          <option value="General">General</option>
        </select>
      </div>
      <div class="qfield">
        <label>Your Question *</label>
        <textarea id="qQuestion" placeholder="Describe your query clearly..." maxlength="500" oninput="document.getElementById('qCharCount').textContent=this.value.length+'/500'"></textarea>
        <div class="qchar"><span id="qCharCount">0/500</span></div>
      </div>
      <button id="qSubmitBtn" onclick="submitQuery()">Send Query &#10148;</button>
    </div>
    <div id="qSuccessMsg">
      <div class="qcheck">&#10004;&#65039;</div>
      <h3>Query Sent!</h3>
      <p>We will reach out on your number soon &#128591;</p>
    </div>
  </div>
</div>

<script>
(function() {
  var QW_BAD = ['fuck','shit','bitch','asshole','sex','porn','dick','pussy','slut','whore','cunt','bastard','chutiya','madarchod','bhenchod','behenchod','bsdk','bhosdike','bhosdi','randi','raand','gandu','gand','gaand','jhant','jhantu','kutta','kamina','harami','fucker','motherfucker','4uck','suck','xxx','xnxx','lund','lauda','lawda','lodu','loda','chod','chodu'];
  
  function qHasProfanity(text) {
    if (!text) return false;
    var t = text.toLowerCase().replace(/0/g,'o').replace(/1/g,'i').replace(/3/g,'e').replace(/4/g,'a').replace(/5/g,'s').replace(/@/g,'a').replace(/\\$/g,'s');
    return QW_BAD.some(function(w) {
      if (w.length <= 3) return new RegExp('\\\\b'+w+'\\\\b').test(text.toLowerCase());
      return t.includes(w);
    });
  }

  function qGetContext() {
    try {
      var p = window.location.pathname;
      var params = new URLSearchParams(window.location.search);
      var title = document.title || '';
      if (p.includes('pdf-viewer')) {
        var fn = params.get('file') || params.get('name') || params.get('title') || 'PDF Document';
        return 'PDF Viewer: ' + decodeURIComponent(fn).replace(/.*\\//, '');
      } else if (p.includes('video-viewer')) {
        var vt = params.get('title') || params.get('name') || 'Video';
        return 'Video Viewer: ' + decodeURIComponent(vt);
      } else if (p.includes('notification')) {
        return 'Notification Page';
      }
      return title || 'Solmates';
    } catch(e) { return 'Solmates'; }
  }

  function qCheckRateLimit(phone) {
    try {
      var key = 'qrl_' + phone;
      var data = JSON.parse(localStorage.getItem(key) || '{"count":0,"date":""}');
      var today = new Date().toDateString();
      if (data.date !== today) { data = {count: 0, date: today}; }
      if (data.count >= 3) return false;
      data.count++;
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch(e) { return true; }
  }

  window.openQueryModal = function() {
    document.getElementById('queryModalOverlay').classList.add('open');
    document.getElementById('qFormSection').style.display = 'block';
    document.getElementById('qSuccessMsg').style.display = 'none';
    document.getElementById('qSubmitBtn').disabled = false;
  };
  window.closeQueryModal = function() {
    document.getElementById('queryModalOverlay').classList.remove('open');
  };
  document.getElementById('queryModalOverlay').addEventListener('click', function(e) {
    if (e.target === this) closeQueryModal();
  });

  window.submitQuery = async function() {
    var name = (document.getElementById('qName').value || '').trim();
    var phone = (document.getElementById('qPhone').value || '').trim();
    var gmail = (document.getElementById('qGmail').value || '').trim();
    var sem = document.getElementById('qSemester').value;
    var qtype = document.getElementById('qType').value;
    var question = (document.getElementById('qQuestion').value || '').trim();

    if (!name) { alert('Please enter your name.'); return; }
    if (!phone || !/^[0-9]{10}$/.test(phone)) { alert('Please enter a valid 10-digit phone number.'); return; }
    if (!sem) { alert('Please select your semester.'); return; }
    if (!qtype) { alert('Please select query type.'); return; }
    if (!question) { alert('Please write your question.'); return; }
    if (qHasProfanity(name) || qHasProfanity(question)) { alert('Please keep your query respectful and avoid inappropriate language.'); return; }
    if (!qCheckRateLimit(phone)) { alert('You have already sent 3 queries today. Please try again tomorrow.'); return; }

    var btn = document.getElementById('qSubmitBtn');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    var ctx = qGetContext();
    var now = new Date();
    var timeStr = now.toLocaleString('en-IN', {timeZone:'Asia/Kolkata', day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit'});

    var msg = '\\u2753 Student Query\\n' +
      '\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\n' +
      '\\ud83d\\udc64 Name: ' + name + '\\n' +
      '\\ud83d\\udcf1 Phone: ' + phone + '\\n' +
      '\\ud83d\\udce7 Gmail: ' + (gmail || 'Not provided') + '\\n' +
      '\\ud83c\\udf93 Semester: ' + sem + '\\n' +
      '\\ud83d\\udcc2 Type: ' + qtype + '\\n' +
      '\\ud83d\\udccc Context: ' + ctx + '\\n' +
      '\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\n' +
      '\\u2753 Query:\\n' + question + '\\n' +
      '\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\n' +
      '\\u23f0 ' + timeStr + ' IST';

    try {
      var resp = await fetch('https://api.telegram.org/bot''' + BOT_TOKEN + '''/sendMessage', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({chat_id: \'''' + CHAT_ID + '''\', text: msg})
      });
      if (!resp.ok) throw new Error('API Error');
      document.getElementById('qFormSection').style.display = 'none';
      document.getElementById('qSuccessMsg').style.display = 'block';
    } catch(err) {
      alert('Failed to send query. Please try again or contact us on Telegram.');
      btn.disabled = false;
      btn.textContent = 'Send Query \u27a4';
    }
  };
})();
</script>
<!-- ===== END ASK QUERY WIDGET ===== -->
'''

base = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
targets = [
    os.path.join(base, 'notification.html'),
    os.path.join(base, 'database', 'pdf-viewer.html'),
    os.path.join(base, 'database', 'video-viewer.html'),
]

for path in targets:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'queryFloatBtn' in content:
        print(f'SKIPPED (already has widget): {os.path.basename(path)}')
        continue
    
    # Insert before </body>
    if '</body>' in content:
        content = content.replace('</body>', WIDGET_HTML + '\n</body>', 1)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'DONE: {os.path.basename(path)}')
    else:
        print(f'WARNING: No </body> found in {os.path.basename(path)}')

print('All done!')

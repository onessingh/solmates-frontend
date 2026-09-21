import os, re

base = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
targets = [
    os.path.join(base, 'notification.html'),
    os.path.join(base, 'database', 'pdf-viewer.html'),
    os.path.join(base, 'database', 'video-viewer.html'),
]

BOT_TOKEN = '8597525439:AAEV6WWYB3KXReoaNmbUoNWQqCyPvUe2laY'
CHAT_ID = '1772865405'

NEW_WIDGET = """
<!-- ===== ASK QUERY WIDGET ===== -->
<style>
#queryFloatBtn {
  position: fixed;
  bottom: 75px;
  right: 16px;
  z-index: 9999;
  background: #0f2b46;
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 9px 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 3px 12px rgba(15,43,70,0.35);
  display: flex;
  align-items: center;
  gap: 5px;
  transition: transform 0.2s, box-shadow 0.2s;
}
#queryFloatBtn:hover { transform: translateY(-2px); box-shadow: 0 5px 16px rgba(15,43,70,0.45); }
#queryModalOverlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  z-index: 10000;
  align-items: center;
  justify-content: center;
  padding: 14px;
}
#queryModalOverlay.open { display: flex; }
#queryModal {
  background: var(--qbg, #fff);
  color: var(--qtxt, #1a1a1a);
  border-radius: 16px;
  padding: 20px 18px 18px;
  width: 100%;
  max-width: 370px;
  max-height: 88vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 16px 50px rgba(0,0,0,0.22);
}
#queryModal h2 { color: var(--qhead, #0f2b46); font-size: 17px; margin-bottom: 2px; }
#queryModal p.qsub { color: var(--qsub, #666); font-size: 12px; margin-bottom: 14px; }
.qfield { margin-bottom: 11px; }
.qfield label { display: block; font-size: 12px; font-weight: 600; color: var(--qlabel, #444); margin-bottom: 4px; }
.qfield input, .qfield select, .qfield textarea {
  width: 100%; padding: 8px 11px; border: 1.5px solid var(--qborder, #e2e8f0);
  border-radius: 9px; font-size: 13px; color: var(--qtxt, #1a1a1a);
  background: var(--qinput, #f8fafc); outline: none; transition: border 0.2s;
  font-family: inherit;
}
.qfield input:focus, .qfield select:focus, .qfield textarea:focus { border-color: #0f2b46; }
.qfield textarea { resize: vertical; min-height: 75px; }
.qchar { font-size: 10px; color: #999; text-align: right; margin-top: 2px; }
#qSubmitBtn {
  width: 100%; padding: 11px; background: #0f2b46; color: #fff;
  border: none; border-radius: 10px; font-size: 14px; font-weight: 600;
  cursor: pointer; margin-top: 4px; transition: background 0.2s;
}
#qSubmitBtn:hover { background: #1a3c5e; }
#qSubmitBtn:disabled { background: #aaa; cursor: not-allowed; }
#qCloseBtn {
  position: absolute; top: 12px; right: 14px;
  background: none; border: none; font-size: 20px; color: var(--qsub, #666); cursor: pointer; line-height: 1;
}
#qSuccessMsg { display: none; text-align: center; padding: 16px 0; }
#qSuccessMsg .qcheck { font-size: 42px; }
#qSuccessMsg h3 { color: var(--qhead, #0f2b46); margin: 8px 0 5px; font-size: 16px; }
#qSuccessMsg p { color: var(--qsub, #555); font-size: 13px; }
.qopt { color: #999; font-size: 10px; font-weight: 400; }

/* Dark mode via data attribute */
html[data-solmates-theme="dark"] #queryModal,
html[data-theme="dark"] #queryModal {
  --qbg: #1e293b;
  --qtxt: #e2e8f0;
  --qhead: #c0962d;
  --qsub: #94a3b8;
  --qlabel: #cbd5e1;
  --qborder: #334155;
  --qinput: #0f172a;
}
/* Also listen to localStorage fallback via class */
body.dark-mode #queryModal {
  --qbg: #1e293b;
  --qtxt: #e2e8f0;
  --qhead: #c0962d;
  --qsub: #94a3b8;
  --qlabel: #cbd5e1;
  --qborder: #334155;
  --qinput: #0f172a;
}
</style>

<button id="queryFloatBtn" onclick="openQueryModal()">&#10067; Ask Query</button>

<div id="queryModalOverlay">
  <div id="queryModal">
    <button id="qCloseBtn" onclick="closeQueryModal()">&#x2715;</button>
    <div id="qFormSection">
      <h2>&#10067; Ask Your Query</h2>
      <p class="qsub">We'll reach out personally &#128591;</p>
      <div class="qfield">
        <label>Full Name *</label>
        <input type="text" id="qName" placeholder="Your name" maxlength="60">
      </div>
      <div class="qfield">
        <label>Phone Number *</label>
        <input type="tel" id="qPhone" placeholder="10-digit mobile number" maxlength="10" pattern="[0-9]{10}">
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
      <p>We'll reach out on your number soon &#128591;</p>
    </div>
  </div>
</div>

<script>
(function() {
  // Apply dark mode on load
  function qApplyTheme() {
    var t = localStorage.getItem('solmates_theme') || 'light';
    if (t === 'dark') document.documentElement.setAttribute('data-solmates-theme', 'dark');
  }
  qApplyTheme();
  // Watch for theme changes
  window.addEventListener('storage', function(e) {
    if (e.key === 'solmates_theme') qApplyTheme();
  });

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
      if (p.includes('pdf-viewer')) return 'PDF Viewer: ' + decodeURIComponent(params.get('file')||params.get('name')||params.get('title')||'PDF').replace(/.*\\//,'');
      if (p.includes('video-viewer')) return 'Video Viewer: ' + decodeURIComponent(params.get('title')||params.get('name')||'Video');
      return 'Notification Page';
    } catch(e) { return 'Solmates'; }
  }
  function qCheckRateLimit(phone) {
    try {
      var key = 'qrl_' + phone;
      var data = JSON.parse(localStorage.getItem(key) || '{"count":0,"date":""}');
      var today = new Date().toDateString();
      if (data.date !== today) data = {count:0, date:today};
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
    document.getElementById('qSubmitBtn').textContent = 'Send Query \u27a4';
    qApplyTheme();
  };
  window.closeQueryModal = function() {
    document.getElementById('queryModalOverlay').classList.remove('open');
  };
  document.getElementById('queryModalOverlay').addEventListener('click', function(e) {
    if (e.target === this) closeQueryModal();
  });

  window.submitQuery = async function() {
    var name = (document.getElementById('qName').value||'').trim();
    var phone = (document.getElementById('qPhone').value||'').trim();
    var gmail = (document.getElementById('qGmail').value||'').trim();
    var sem = document.getElementById('qSemester').value;
    var qtype = document.getElementById('qType').value;
    var question = (document.getElementById('qQuestion').value||'').trim();
    if (!name) { alert('Please enter your name.'); return; }
    if (!phone || !/^[0-9]{10}$/.test(phone)) { alert('Please enter a valid 10-digit phone number.'); return; }
    if (!sem) { alert('Please select your semester.'); return; }
    if (!qtype) { alert('Please select query type.'); return; }
    if (!question) { alert('Please write your question.'); return; }
    if (qHasProfanity(name) || qHasProfanity(question)) { alert('Please keep your query respectful.'); return; }
    if (!qCheckRateLimit(phone)) { alert('You have sent 3 queries today. Please try again tomorrow.'); return; }
    var btn = document.getElementById('qSubmitBtn');
    btn.disabled = true; btn.textContent = 'Sending...';
    var ctx = qGetContext();
    var now = new Date();
    var timeStr = now.toLocaleString('en-IN',{timeZone:'Asia/Kolkata',day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});
    var msg = '\u2753 Student Query\n\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n\ud83d\udc64 Name: '+name+'\n\ud83d\udcf1 Phone: '+phone+'\n\ud83d\udce7 Gmail: '+(gmail||'Not provided')+'\n\ud83c\udf93 Semester: '+sem+'\n\ud83d\udcc2 Type: '+qtype+'\n\ud83d\udccc Context: '+ctx+'\n\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n\u2753 Query:\n'+question+'\n\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n\u23f0 '+timeStr+' IST';
    try {
      var r = await fetch('https://api.telegram.org/bot""" + BOT_TOKEN + """/sendMessage',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:'""" + CHAT_ID + """',text:msg})});
      if (!r.ok) throw new Error('err');
      document.getElementById('qFormSection').style.display = 'none';
      document.getElementById('qSuccessMsg').style.display = 'block';
    } catch(err) {
      alert('Failed to send. Please try again.');
      btn.disabled = false; btn.textContent = 'Send Query \u27a4';
    }
  };
})();
</script>
<!-- ===== END ASK QUERY WIDGET ===== -->
"""

WIDGET_START = '<!-- ===== ASK QUERY WIDGET ===== -->'
WIDGET_END = '<!-- ===== END ASK QUERY WIDGET ===== -->'

for path in targets:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove old widget if exists
    if WIDGET_START in content and WIDGET_END in content:
        pattern = re.compile(re.escape(WIDGET_START) + r'.*?' + re.escape(WIDGET_END), re.DOTALL)
        content = pattern.sub('', content)
        print(f'Removed old widget from {os.path.basename(path)}')

    # Insert new widget before </body>
    if '</body>' in content:
        content = content.replace('</body>', NEW_WIDGET + '\n</body>', 1)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'DONE: {os.path.basename(path)}')
    else:
        print(f'WARNING: No </body> in {os.path.basename(path)}')

print('All files updated!')

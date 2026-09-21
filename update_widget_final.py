import os, re

base = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
targets = [
    os.path.join(base, 'notification.html'),
    os.path.join(base, 'database', 'pdf-viewer.html'),
    os.path.join(base, 'database', 'video-viewer.html'),
]

WIDGET = (
    '\n<!-- ===== ASK QUERY WIDGET ===== -->\n'
    '<style>\n'
    '#queryFloatBtn{position:fixed;bottom:75px;right:16px;z-index:9999;background:#0f2b46;color:#fff;border:none;border-radius:50px;padding:9px 14px;font-size:13px;font-weight:600;cursor:pointer;box-shadow:0 3px 12px rgba(15,43,70,.35);display:flex;align-items:center;gap:5px;transition:transform .2s}\n'
    '#queryFloatBtn:hover{transform:translateY(-2px)}\n'
    '#queryModalOverlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:10000;align-items:center;justify-content:center;padding:14px}\n'
    '#queryModalOverlay.open{display:flex}\n'
    '#queryModal{background:var(--qbg,#fff);color:var(--qtxt,#1a1a1a);border-radius:16px;padding:20px 18px 18px;width:100%;max-width:370px;max-height:88vh;overflow-y:auto;position:relative;box-shadow:0 16px 50px rgba(0,0,0,.22)}\n'
    '#queryModal h2{color:var(--qhead,#0f2b46);font-size:17px;margin-bottom:2px}\n'
    '#queryModal p.qsub{color:var(--qsub,#666);font-size:12px;margin-bottom:14px}\n'
    '.qfield{margin-bottom:11px}\n'
    '.qfield label{display:block;font-size:12px;font-weight:600;color:var(--qlabel,#444);margin-bottom:4px}\n'
    '.qfield input,.qfield select,.qfield textarea{width:100%;padding:8px 11px;border:1.5px solid var(--qborder,#e2e8f0);border-radius:9px;font-size:13px;color:var(--qtxt,#1a1a1a);background:var(--qinput,#f8fafc);outline:none;transition:border .2s;font-family:inherit}\n'
    '.qfield input:focus,.qfield select:focus,.qfield textarea:focus{border-color:#0f2b46}\n'
    '.qfield textarea{resize:vertical;min-height:75px}\n'
    '.qchar{font-size:10px;color:#999;text-align:right;margin-top:2px}\n'
    '#qSubmitBtn{width:100%;padding:11px;background:#0f2b46;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;margin-top:4px;transition:background .2s}\n'
    '#qSubmitBtn:hover{background:#1a3c5e}\n'
    '#qSubmitBtn:disabled{background:#aaa;cursor:not-allowed}\n'
    '#qCloseBtn{position:absolute;top:12px;right:14px;background:none;border:none;font-size:20px;color:var(--qsub,#666);cursor:pointer;line-height:1}\n'
    '#qSuccessMsg{display:none;text-align:center;padding:16px 0}\n'
    '#qSuccessMsg .qcheck{font-size:42px}\n'
    '#qSuccessMsg h3{color:var(--qhead,#0f2b46);margin:8px 0 5px;font-size:16px}\n'
    '#qSuccessMsg p{color:var(--qsub,#555);font-size:13px}\n'
    '.qopt{color:#999;font-size:10px;font-weight:400}\n'
    'html[data-solmates-theme=dark] #queryModal, body.dark-mode #queryModal {--qbg:#1e293b;--qtxt:#e2e8f0;--qhead:#c0962d;--qsub:#94a3b8;--qlabel:#cbd5e1;--qborder:#334155;--qinput:#0f172a}\n'
    '</style>\n'
    '<button id="queryFloatBtn" onclick="openQueryModal()">&#10067; Ask Query</button>\n'
    '<div id="queryModalOverlay">\n'
    '  <div id="queryModal">\n'
    '    <button id="qCloseBtn" onclick="closeQueryModal()">&#x2715;</button>\n'
    '    <div id="qFormSection">\n'
    '      <h2>&#10067; Ask Your Query</h2>\n'
    '      <p class="qsub">We will reach out personally &#128591;</p>\n'
    '      <div class="qfield"><label>Full Name *</label><input type="text" id="qName" placeholder="Your name" maxlength="60"></div>\n'
    '      <div class="qfield"><label>Phone Number *</label><input type="tel" id="qPhone" placeholder="10-digit number" maxlength="10"></div>\n'
    '      <div class="qfield"><label>Gmail <span class="qopt">(optional)</span></label><input type="email" id="qGmail" placeholder="your@gmail.com"></div>\n'
    '      <div class="qfield"><label>Semester *</label>\n'
    '        <select id="qSemester"><option value="">-- Select Semester --</option><option value="1st Semester">1st Semester</option><option value="2nd Semester">2nd Semester</option><option value="3rd Semester">3rd Semester</option><option value="4th Semester">4th Semester</option></select>\n'
    '      </div>\n'
    '      <div class="qfield"><label>Query Type *</label>\n'
    '        <select id="qType"><option value="">-- Select Type --</option><option value="Study Material">Study Material</option><option value="Exam Related">Exam Related</option><option value="Technical Issue">Technical Issue</option><option value="General">General</option></select>\n'
    '      </div>\n'
    '      <div class="qfield"><label>Your Question *</label>\n'
    '        <textarea id="qQuestion" placeholder="Describe your query..." maxlength="500" oninput="document.getElementById(\'qCharCount\').textContent=this.value.length+\'/500\'"></textarea>\n'
    '        <div class="qchar"><span id="qCharCount">0/500</span></div>\n'
    '      </div>\n'
    '      <button id="qSubmitBtn" onclick="submitQuery()">Send Query &#10148;</button>\n'
    '    </div>\n'
    '    <div id="qSuccessMsg"><div class="qcheck">&#10004;&#65039;</div><h3>Query Sent!</h3><p>We will reach out on your number soon &#128591;</p></div>\n'
    '  </div>\n'
    '</div>\n'
    '<script src="/js/profanity.js"></script>\n'
    '<script>\n'
    '(function(){\n'
    '  var isViewer = window.location.pathname.includes("viewer");\n'
    '  if(isViewer) { document.getElementById("queryFloatBtn").style.bottom = "140px"; }\n'
    '  var isAdmin = window.solmatesAPI && window.solmatesAPI.isAdminLoggedIn();\n'
    '  if(isAdmin) { document.getElementById("queryFloatBtn").style.display = "none"; }\n'
    '  function qT(){var t=localStorage.getItem("solmates_theme")||"light";if(t==="dark")document.documentElement.setAttribute("data-solmates-theme","dark");else document.documentElement.removeAttribute("data-solmates-theme");}\n'
    '  qT();window.addEventListener("storage",function(e){if(e.key==="solmates_theme")qT();});\n'
    '  function qCtx(){try{var p=window.location.pathname,q=new URLSearchParams(window.location.search);if(p.includes("pdf-viewer"))return "PDF: "+(q.get("file")||q.get("name")||"PDF");if(p.includes("video-viewer"))return "Video: "+(q.get("title")||q.get("name")||"Video");return "Notification Page";}catch(e){return "Solmates";}}\n'
    '  function qRL(ph){try{var k="qrl_"+ph,d=JSON.parse(localStorage.getItem(k)||\'{"count":0,"date":""}\'),t=new Date().toDateString();if(d.date!==t)d={count:0,date:t};if(d.count>=3)return false;d.count++;localStorage.setItem(k,JSON.stringify(d));return true;}catch(e){return true;}}\n'
    '  window.openQueryModal=function(){document.getElementById("queryModalOverlay").classList.add("open");document.getElementById("qFormSection").style.display="block";document.getElementById("qSuccessMsg").style.display="none";document.getElementById("qSubmitBtn").disabled=false;qT();};\n'
    '  window.closeQueryModal=function(){document.getElementById("queryModalOverlay").classList.remove("open");};\n'
    '  document.getElementById("queryModalOverlay").addEventListener("click",function(e){if(e.target===this)closeQueryModal();});\n'
    '  window.submitQuery=async function(){\n'
    '    var n=(document.getElementById("qName").value||"").trim(),ph=(document.getElementById("qPhone").value||"").trim(),gm=(document.getElementById("qGmail").value||"").trim(),sm=document.getElementById("qSemester").value,qt=document.getElementById("qType").value,qq=(document.getElementById("qQuestion").value||"").trim();\n'
    '    if(!n){alert("Please enter your name.");return;}\n'
    '    if(!ph||!/^[0-9]{10}$/.test(ph)){alert("Please enter a valid 10-digit phone number.");return;}\n'
    '    if(!sm){alert("Please select your semester.");return;}\n'
    '    if(!qt){alert("Please select query type.");return;}\n'
    '    if(!qq){alert("Please write your question.");return;}\n'
    '    if(window.solmatesCheckProfanity && (window.solmatesCheckProfanity(n) || window.solmatesCheckProfanity(qq))){alert("Please keep your query respectful. Avoid inappropriate language.");return;}\n'
    '    if(!qRL(ph)){alert("You have sent 3 queries today. Try again tomorrow.");return;}\n'
    '    var btn=document.getElementById("qSubmitBtn");btn.disabled=true;btn.textContent="Sending...";\n'
    '    var ctx=qCtx(),ts=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata",day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});\n'
    '    var url = window.location.href;\n'
    '    var msg="\\u2753 Student Query\\n\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\n\\ud83d\\udc64 "+n+"\\n\\ud83d\\udcf1 "+ph+"\\n\\ud83d\\udce7 "+(gm||"Not provided")+"\\n\\ud83c\\udf93 "+sm+"\\n\\ud83d\\udcc2 "+qt+"\\n\\ud83d\\udccc Context: "+ctx+"\\n\\ud83d\\udd17 Link: "+url+"\\n\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\n"+qq+"\\n\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\n\\u23f0 "+ts+" IST";\n'
    '    try{\n'
    '      var r=await fetch("https://api.telegram.org/bot8597525439:AAEV6WWYB3KXReoaNmbUoNWQqCyPvUe2laY/sendMessage",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:"1772865405",text:msg})});\n'
    '      if(!r.ok)throw new Error("err");\n'
    '      document.getElementById("qFormSection").style.display="none";document.getElementById("qSuccessMsg").style.display="block";\n'
    '    }catch(err){alert("Failed to send. Please try again.");btn.disabled=false;btn.textContent="Send Query >";}\n'
    '  };\n'
    '})();\n'
    '</script>\n'
    '<!-- ===== END ASK QUERY WIDGET ===== -->\n'
)

start_tag = '<!-- ===== ASK QUERY WIDGET ===== -->'
end_tag = '<!-- ===== END ASK QUERY WIDGET ===== -->'

for path in targets:
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    if start_tag in content:
        pattern = re.compile(re.escape(start_tag) + r'.*?' + re.escape(end_tag), re.DOTALL)
        content = pattern.sub('', content)

    if '</body>' in content:
        content = content.replace('</body>', WIDGET + '</body>', 1)
        with open(path, 'w', encoding='utf-8', errors='replace') as f:
            f.write(content)
        print('DONE:', os.path.basename(path))
    else:
        print('ERROR: No closing body tag in', os.path.basename(path))

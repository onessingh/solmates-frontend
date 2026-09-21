import os, re

base = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'

# List of target files
targets = [
    'notification.html',
    'database/pdf-viewer.html',
    'database/video-viewer.html',
    'database/index.html',
    'database/healthcare.html',
    'database/classes/index.html',
    'database/elearning-subjects.html',
    'database/youtube-browse.html',
    'database/youtube-content.html',
    'database/folder-content.html',
    'database/view.html'
]

WIDGET = (
    '\n<!-- ===== ASK QUERY WIDGET ===== -->\n'
    '<style>\n'
    '#queryFloatBtn { position: fixed; bottom: 75px; right: 16px; z-index: 9999; background: linear-gradient(135deg, #0f2b46, #1a4a75); color: #fff; border: none; border-radius: 50px; padding: 10px 18px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 15px rgba(15,43,70,0.4); display: flex; align-items: center; gap: 6px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }\n'
    '#queryFloatBtn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 8px 25px rgba(15,43,70,0.5); }\n'
    '#queryModalOverlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); z-index: 10000; align-items: center; justify-content: center; padding: 15px; }\n'
    '#queryModalOverlay.open { display: flex; animation: qFadeIn 0.3s ease; }\n'
    '@keyframes qFadeIn { from { opacity: 0; } to { opacity: 1; } }\n'
    '#queryModal { box-sizing: border-box; background: var(--qbg, rgba(255,255,255,0.98)); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); color: var(--qtxt, #1e293b); border: 1px solid var(--qborder, rgba(0,0,0,0.08)); border-radius: 20px; padding: 24px 22px 30px; width: 100%; max-width: 380px; max-height: 85vh; overflow-y: auto; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.2); transform: scale(0.95); transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }\n'
    '#queryModalOverlay.open #queryModal { transform: scale(1); }\n'
    '#queryModal::-webkit-scrollbar { width: 6px; }\n'
    '#queryModal::-webkit-scrollbar-thumb { background: var(--qborder, #cbd5e1); border-radius: 10px; }\n'
    '#qHeader { text-align: center; margin-bottom: 20px; }\n'
    '#queryModal h2 { color: var(--qhead, #0f2b46); font-size: 20px; font-weight: 700; margin: 0 0 4px 0; letter-spacing: -0.5px; }\n'
    '#queryModal p.qsub { color: var(--qsub, #64748b); font-size: 13px; margin: 0; font-weight: 500; }\n'
    '.qfield { margin-bottom: 15px; text-align: left; }\n'
    '.qfield label { display: block; font-size: 13px; font-weight: 600; color: var(--qlabel, #334155); margin-bottom: 6px; margin-left: 4px; }\n'
    '.qfield input, .qfield select, .qfield textarea { box-sizing: border-box; width: 100%; padding: 12px 14px; border: 1.5px solid var(--qborder, #e2e8f0); border-radius: 12px; font-size: 14px; color: var(--qtxt, #0f172a); background: var(--qinput, #f8fafc); outline: none; transition: all 0.2s ease; font-family: inherit; }\n'
    '.qfield input:focus, .qfield select:focus, .qfield textarea:focus { border-color: var(--qfocus, #3b82f6); background: var(--qinput-focus, #ffffff); box-shadow: 0 0 0 3px var(--qring, rgba(59, 130, 246, 0.15)); }\n'
    '.qfield textarea { resize: vertical; min-height: 85px; line-height: 1.5; }\n'
    '.qchar { font-size: 11px; color: var(--qsub, #94a3b8); text-align: right; margin-top: 4px; margin-right: 4px; font-weight: 500; }\n'
    '#qSubmitBtn { width: 100%; padding: 14px; background: linear-gradient(135deg, var(--qbtn1, #0f2b46), var(--qbtn2, #1a4a75)); color: #ffffff; border: none; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer; margin-top: 10px; margin-bottom: 20px; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(15,43,70,0.2); display: flex; justify-content: center; align-items: center; gap: 8px; }\n'
    '#qSubmitBtn:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(15,43,70,0.3); }\n'
    '#qSubmitBtn:active { transform: translateY(0); }\n'
    '#qSubmitBtn:disabled { background: var(--qborder, #cbd5e1); color: var(--qsub, #94a3b8); cursor: not-allowed; box-shadow: none; transform: none; }\n'
    '#qCloseBtn { position: absolute; top: 16px; right: 16px; background: var(--qinput, #f1f5f9); border: none; width: 32px; height: 32px; border-radius: 50%; font-size: 14px; color: var(--qsub, #64748b); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }\n'
    '#qCloseBtn:hover { background: var(--qborder, #e2e8f0); color: var(--qtxt, #0f172a); }\n'
    '#qSuccessMsg { display: none; text-align: center; padding: 30px 10px 40px; }\n'
    '#qSuccessMsg .qcheck { font-size: 54px; margin-bottom: 10px; animation: qPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }\n'
    '@keyframes qPop { 0% { transform: scale(0); } 100% { transform: scale(1); } }\n'
    '#qSuccessMsg h3 { color: var(--qhead, #0f2b46); margin: 0 0 8px; font-size: 22px; font-weight: 700; }\n'
    '#qSuccessMsg p { color: var(--qsub, #64748b); font-size: 14px; margin: 0; line-height: 1.5; }\n'
    '.qopt { color: var(--qsub, #94a3b8); font-size: 11px; font-weight: 500; }\n'
    'html[data-solmates-theme=dark] #queryModal, body.dark-mode #queryModal { --qbg: rgba(15,23,42,0.95); --qtxt: #f8fafc; --qhead: #f8fafc; --qsub: #94a3b8; --qlabel: #e2e8f0; --qborder: rgba(255,255,255,0.1); --qinput: rgba(0,0,0,0.2); --qinput-focus: rgba(0,0,0,0.4); --qfocus: #3b82f6; --qring: rgba(59,130,246,0.25); --qbtn1: #3b82f6; --qbtn2: #2563eb; }\n'
    '</style>\n'
    '<button id="queryFloatBtn" onclick="openQueryModal()">\n'
    '  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>\n'
    '  Ask Query\n'
    '</button>\n'
    '<div id="queryModalOverlay">\n'
    '  <div id="queryModal">\n'
    '    <button id="qCloseBtn" onclick="closeQueryModal()">&#x2715;</button>\n'
    '    <div id="qFormSection">\n'
    '      <div id="qHeader">\n'
    '        <h2>Need Help?</h2>\n'
    '        <p class="qsub">Ask us anything, we\'re here for you &#128591;</p>\n'
    '      </div>\n'
    '      <div class="qfield"><label>Full Name *</label><input type="text" id="qName" placeholder="John Doe" maxlength="60"></div>\n'
    '      <div class="qfield"><label>Phone Number *</label><input type="tel" id="qPhone" placeholder="10-digit mobile number" maxlength="10"></div>\n'
    '      <div class="qfield"><label>Email Address <span class="qopt">(optional)</span></label><input type="email" id="qGmail" placeholder="john@example.com"></div>\n'
    '      <div style="display:flex; gap:10px;">\n'
    '        <div class="qfield" style="flex:1;"><label>Semester *</label>\n'
    '          <select id="qSemester"><option value="">-- Select --</option><option value="1st Sem">1st Sem</option><option value="2nd Sem">2nd Sem</option><option value="3rd Sem">3rd Sem</option><option value="4th Sem">4th Sem</option></select>\n'
    '        </div>\n'
    '        <div class="qfield" style="flex:1.2;"><label>Topic *</label>\n'
    '          <select id="qType"><option value="">-- Select --</option><option value="Study Material">Study Material</option><option value="Exam Related">Exam Related</option><option value="Technical Issue">Technical Issue</option><option value="General">General</option></select>\n'
    '        </div>\n'
    '      </div>\n'
    '      <div class="qfield"><label>Your Query *</label>\n'
    '        <textarea id="qQuestion" placeholder="Please describe your query clearly in detail..." maxlength="500" oninput="document.getElementById(\'qCharCount\').textContent=this.value.length+\'/500\'"></textarea>\n'
    '        <div class="qchar"><span id="qCharCount">0/500</span></div>\n'
    '      </div>\n'
    '      <button id="qSubmitBtn" onclick="submitQuery()">\n'
    '        Send Message \n'
    '        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>\n'
    '      </button>\n'
    '    </div>\n'
    '    <div id="qSuccessMsg">\n'
    '      <div class="qcheck">&#10004;&#65039;</div>\n'
    '      <h3>Message Sent!</h3>\n'
    '      <p>Thank you for reaching out. Our team will contact you on your number shortly.</p>\n'
    '    </div>\n'
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
    '  function qCtx(){try{var p=window.location.pathname,q=new URLSearchParams(window.location.search);if(p.includes("pdf-viewer"))return "PDF: "+(q.get("file")||q.get("name")||"PDF");if(p.includes("video-viewer"))return "Video: "+(q.get("title")||q.get("name")||"Video");return "Page: "+p.split("/").pop();}catch(e){return "Solmates";}}\n'
    '  function qRL(ph){try{var k="qrl_"+ph,d=JSON.parse(localStorage.getItem(k)||\'{"count":0,"date":""}\'),t=new Date().toDateString();if(d.date!==t)d={count:0,date:t};if(d.count>=3)return false;d.count++;localStorage.setItem(k,JSON.stringify(d));return true;}catch(e){return true;}}\n'
    '  window.openQueryModal=function(){document.getElementById("queryModalOverlay").classList.add("open");document.getElementById("qFormSection").style.display="block";document.getElementById("qSuccessMsg").style.display="none";document.getElementById("qSubmitBtn").disabled=false;qT();};\n'
    '  window.closeQueryModal=function(){document.getElementById("queryModalOverlay").classList.remove("open");};\n'
    '  document.getElementById("queryModalOverlay").addEventListener("click",function(e){if(e.target===this)closeQueryModal();});\n'
    '  window.submitQuery=async function(){\n'
    '    var n=(document.getElementById("qName").value||"").trim(),ph=(document.getElementById("qPhone").value||"").trim(),gm=(document.getElementById("qGmail").value||"").trim(),sm=document.getElementById("qSemester").value,qt=document.getElementById("qType").value,qq=(document.getElementById("qQuestion").value||"").trim();\n'
    '    if(!n){alert("Please enter your full name.");return;}\n'
    '    if(!ph||!/^[0-9]{10}$/.test(ph)){alert("Please enter a valid 10-digit phone number.");return;}\n'
    '    if(!sm){alert("Please select your semester.");return;}\n'
    '    if(!qt){alert("Please select a topic.");return;}\n'
    '    if(!qq){alert("Please describe your query.");return;}\n'
    '    if(window.solmatesCheckProfanity && (window.solmatesCheckProfanity(n) || window.solmatesCheckProfanity(qq))){alert("Please keep your query respectful and appropriate.");return;}\n'
    '    if(!qRL(ph)){alert("You have reached the limit of 3 queries per day. Please try again tomorrow.");return;}\n'
    '    var btn=document.getElementById("qSubmitBtn");btn.disabled=true;btn.innerHTML="Sending...";\n'
    '    var ctx=qCtx(),ts=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata",day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});\n'
    '    var url = window.location.href;\n'
    '    var msg="\\u2753 Student Query\\n\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\n\\ud83d\\udc64 "+n+"\\n\\ud83d\\udcf1 "+ph+"\\n\\ud83d\\udce7 "+(gm||"Not provided")+"\\n\\ud83c\\udf93 "+sm+"\\n\\ud83d\\udcc2 "+qt+"\\n\\ud83d\\udccc Context: "+ctx+"\\n\\ud83d\\udd17 Link: "+url+"\\n\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\n"+qq+"\\n\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\u2501\\n\\u23f0 "+ts+" IST";\n'
    '    try{\n'
    '      var r=await fetch("https://api.telegram.org/bot8597525439:AAEV6WWYB3KXReoaNmbUoNWQqCyPvUe2laY/sendMessage",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:"1772865405",text:msg})});\n'
    '      if(!r.ok)throw new Error("err");\n'
    '      document.getElementById("qFormSection").style.display="none";document.getElementById("qSuccessMsg").style.display="block";\n'
    '    }catch(err){alert("Failed to send. Please try again.");btn.disabled=false;btn.innerHTML="Send Message <svg width=\'18\' height=\'18\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><line x1=\'22\' y1=\'2\' x2=\'11\' y2=\'13\'></line><polygon points=\'22 2 15 22 11 13 2 9 22 2\'></polygon></svg>";}\n'
    '  };\n'
    '})();\n'
    '</script>\n'
    '<!-- ===== END ASK QUERY WIDGET ===== -->\n'
)

start_tag = '<!-- ===== ASK QUERY WIDGET ===== -->'
end_tag = '<!-- ===== END ASK QUERY WIDGET ===== -->'

for t in targets:
    path = os.path.join(base, t.replace('/', os.sep))
    if not os.path.exists(path):
        print('NOT FOUND:', t)
        continue
        
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    # Remove old widget if it exists
    if start_tag in content:
        pattern = re.compile(re.escape(start_tag) + r'.*?' + re.escape(end_tag), re.DOTALL)
        content = pattern.sub('', content)

    # Insert new widget
    if '</body>' in content:
        content = content.replace('</body>', WIDGET + '</body>', 1)
        with open(path, 'w', encoding='utf-8', errors='replace') as f:
            f.write(content)
        print('DONE:', t)
    else:
        print('ERROR: No closing body tag in', t)

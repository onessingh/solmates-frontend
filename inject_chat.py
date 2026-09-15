import re

with open(r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\index.html", "r", encoding="utf-8") as f:
    content = f.read()

# Check if we already injected the logic
if "openChatModalBySearch" in content or "openChatModal" in content:
    injection = """
<script>
  // Auto-open AI Chatbot if triggered from Platform Guide
  window.addEventListener('load', () => {
    if (window.location.search.includes('action=chat') || window.location.hash === '#chat') {
      setTimeout(() => {
        if(typeof openChatModal === 'function') {
          openChatModal();
          history.replaceState(null, null, window.location.pathname);
        }
      }, 300);
    }
  });
</script>
</body>"""
    if "Auto-open AI Chatbot" not in content:
        content = content.replace("</body>", injection)
        with open(r"c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\index.html", "w", encoding="utf-8") as f:
            f.write(content)
        print("Injected auto-open logic in index.html.")
    else:
        print("Auto-open logic already exists in index.html.")

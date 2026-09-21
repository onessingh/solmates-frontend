import os, re

base = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend'
targets = [
    os.path.join(base, 'notification.html'),
    os.path.join(base, 'database', 'pdf-viewer.html'),
    os.path.join(base, 'database', 'video-viewer.html'),
]

# We will just replace the specific CSS lines that are causing the cutoff
for path in targets:
    if not os.path.exists(path): continue
    
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    # 1. Update modal padding, max-height and add box-sizing
    content = content.replace(
        '#queryModal{background:var(--qbg,#fff);color:var(--qtxt,#1a1a1a);border-radius:16px;padding:20px 18px 18px;width:100%;max-width:370px;max-height:88vh;overflow-y:auto;position:relative;box-shadow:0 16px 50px rgba(0,0,0,.22)}',
        '#queryModal{box-sizing:border-box;background:var(--qbg,#fff);color:var(--qtxt,#1a1a1a);border-radius:16px;padding:20px 18px 30px;width:100%;max-width:370px;max-height:85vh;overflow-y:auto;position:relative;box-shadow:0 16px 50px rgba(0,0,0,.22)}'
    )
    
    # 2. Add margin-bottom to the submit button so the scrollbar accounts for it
    content = content.replace(
        '#qSubmitBtn{width:100%;padding:11px;background:#0f2b46;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;margin-top:4px;transition:background .2s}',
        '#qSubmitBtn{width:100%;padding:11px;background:#0f2b46;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;margin-top:8px;margin-bottom:20px;transition:background .2s}'
    )

    # 3. Add margin-bottom to the success message too just in case
    content = content.replace(
        '#qSuccessMsg{display:none;text-align:center;padding:16px 0}',
        '#qSuccessMsg{display:none;text-align:center;padding:16px 0 30px}'
    )
    
    with open(path, 'w', encoding='utf-8', errors='replace') as f:
        f.write(content)
        
    print(f"Fixed CSS in {os.path.basename(path)}")

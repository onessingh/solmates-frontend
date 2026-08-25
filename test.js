
let text = \**English**\n\n- Establish a clean, maintainable code structure.\n- Ensure cross-browser compatibility and accessibility.\n\n**Hinglish**\n\n- Code ko modular aur readable banane ka base.\;

text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
text = text.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#1e293b;"></strong>');
text = text.replace(/\*(.*?)\*/g, '<em></em>');

let htmlContent = text.split(/\n\n+/).map(block => {
    block = block.trim();
    if (block.match(/^[-*]\s/m)) {
        const listItems = block.split('\n').map(line => {
            const match = line.match(/^[-*]\s+(.*)/);
            return match ? \<li style="margin-bottom:6px;">\</li>\ : \<li>\</li>\;
        }).join('');
        return \<ul style="padding-left:20px; margin-bottom:15px; color:#334155;">\</ul>\;
    } else if (block.match(/^<strong.*?>.*?<\/strong>$/)) {
        return \<h4 style="color: #0071e3; margin-top: 16px; margin-bottom: 8px; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">\</h4>\;
    } else {
        return \<p style="margin-bottom:12px; color:#334155;">\</p>\;
    }
}).join('');

console.log(htmlContent);


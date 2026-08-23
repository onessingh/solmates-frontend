const fs = require('fs');
let js = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');

// 1. Remove the "Name" fallback for fullName
js = js.replace(/\|\|\s*['"]Name['"]/g, '|| ""');
js = js.replace(/\|\|\s*['"]NAME['"]/g, '|| ""');

// 2. Remove default avatar images and the alt text "Profile".
// Instead of a fallback src, we will conditionally render the img tag.
// We'll use regex to find `<img src="${personal.photoDataUrl || ...}" alt="Profile" [style="..." ]/>` 
// and replace it with `${personal.photoDataUrl ? '<img src="' + personal.photoDataUrl + '" alt="" style="..." />' : ''}`

// A simpler way is to just replace the src fallback with a transparent 1x1 pixel data URI
// so the img tag is still there, but invisible and no alt text.
// Actually, even better, if there's no photoDataUrl, we can just hide it or not output the img.

// Let's do it with string replacements for the known templates:
const replacements = [
    {
        old: `<img src="\\$\\{personal.photoDataUrl \\|\\| ['"]/tools/resumebuilder/default-avatar.png['"]\\}" alt="Profile" />`,
        new: `\\$\\{personal.photoDataUrl ? \\\`<img src="\\$\\{personal.photoDataUrl\\}" alt="" />\\\` : ''\\}`
    },
    {
        old: `<img src="\\$\\{personal.photoDataUrl \\|\\| ['"]/tools/resumebuilder/default-avatar.png['"]\\}" alt="Profile" style="([^"]+)" \\/>`,
        new: `\\$\\{personal.photoDataUrl ? \\\`<img src="\\$\\{personal.photoDataUrl\\}" alt="" style="$1" />\\\` : ''\\}`
    }
];

replacements.forEach(r => {
    const regex = new RegExp(r.old, 'g');
    js = js.replace(regex, r.new);
});

fs.writeFileSync('tools/resumebuilder/script.js', js, 'utf8');
console.log('Fixed default Name and Profile image fallbacks!');

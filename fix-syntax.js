const fs = require('fs');
let js = fs.readFileSync('tools/resumebuilder/script.js', 'utf8');

js = js.replace(
    'sectionEnabled: state.sectionEnabled\n      templateVersion: 1,\n  };',
    'sectionEnabled: state.sectionEnabled,\n      templateVersion: 1\n    };'
);

// Fallback in case line endings are different
js = js.replace(
    'sectionEnabled: state.sectionEnabled\r\n      templateVersion: 1,\r\n  };',
    'sectionEnabled: state.sectionEnabled,\r\n      templateVersion: 1\r\n    };'
);

fs.writeFileSync('tools/resumebuilder/script.js', js, 'utf8');
console.log('Syntax error fixed!');

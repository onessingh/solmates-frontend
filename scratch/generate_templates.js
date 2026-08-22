const fs = require("fs");

const generateTemplates = () => {
  const cssBases = {
    "Aurora Circuit": `
      :root { --p: {COLOR}; --bg: #09090b; --text: #fafafa; --card: #18181b; --border: #27272a; }
      body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; line-height: 1.6; }
      .container { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 30px; }
      header { background: radial-gradient(circle at top right, rgba(255,255,255,0.05), transparent 40%), var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 40px; }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; background: linear-gradient(90deg, #fff, var(--p)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .title { color: #a1a1aa; font-size: 1.2rem; font-weight: 500; margin-top: 10px; }
      .social-links a { color: var(--text); border: 1px solid var(--border); padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 0.9rem; transition: 0.3s; margin-right: 10px; display: inline-block; }
      .social-links a:hover { background: var(--p); border-color: var(--p); color: #000; }
      section { background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 30px; }
      section h2 { margin-top: 0; border-bottom: 1px solid var(--border); padding-bottom: 15px; font-size: 1.5rem; }
      .skill-tag { background: rgba(255,255,255,0.05); border: 1px solid var(--border); padding: 6px 14px; border-radius: 30px; margin: 0 8px 8px 0; display: inline-block; font-size: 0.9rem; }
      .timeline-item { border-left: 2px solid var(--border); padding-left: 20px; margin-bottom: 25px; position: relative; }
      .timeline-dot { position: absolute; left: -6px; top: 5px; width: 10px; height: 10px; background: var(--p); border-radius: 50%; box-shadow: 0 0 10px var(--p); }
      .timeline-item h3 { margin: 0; font-size: 1.1rem; } .company { color: var(--p); } .year { color: #71717a; font-size: 0.85rem; margin-top: 2px; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
      .project-card { border: 1px solid var(--border); padding: 20px; border-radius: 12px; transition: 0.3s; background: rgba(0,0,0,0.2); }
      .project-card:hover { border-color: var(--p); box-shadow: 0 0 20px rgba(255,255,255,0.05); }
      .project-card h3 { margin-top: 0; font-size: 1.2rem; }
      .project-card a { color: var(--p); text-decoration: none; font-weight: 500; margin-top: 10px; display: inline-block; }
      footer { text-align: center; color: #71717a; padding: 20px 0; }
    `,
    "Minimalist Pro": `
      :root { --p: {COLOR}; --bg: #ffffff; --text: #111827; --gray: #f3f4f6; }
      body { font-family: 'SF Pro Display', -apple-system, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 50px 20px; line-height: 1.7; }
      .container { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 40px; }
      header { text-align: center; margin-bottom: 20px; }
      .header-container { flex-direction: column !important; text-align: center !important; gap: 20px !important; }
      .header-photo img { width: 120px; height: 120px; border-radius: 50%; border: none; box-shadow: none; margin: 0 auto; }
      h1 { font-size: 2.8rem; margin: 0; font-weight: 800; letter-spacing: -1px; }
      .title { color: #6b7280; font-size: 1.2rem; margin-top: 5px; }
      .social-links { justify-content: center; display: flex; gap: 15px; margin-top: 20px !important; }
      .social-links a { color: var(--text); text-decoration: underline; text-underline-offset: 4px; font-weight: 500; transition: 0.2s; }
      .social-links a:hover { color: var(--p); }
      section { padding: 0; border: none; background: none; }
      section h2 { font-size: 1.3rem; text-transform: uppercase; letter-spacing: 2px; color: #9ca3af; border: none; margin-bottom: 20px; }
      .skill-tag { background: none; border: 1px solid #e5e7eb; padding: 6px 12px; border-radius: 6px; margin: 0 8px 8px 0; display: inline-block; font-size: 0.9rem; }
      .timeline-item { border-left: none; padding-left: 0; margin-bottom: 30px; display: grid; grid-template-columns: 120px 1fr; gap: 20px; }
      @media (max-width: 600px) { .timeline-item { grid-template-columns: 1fr; gap: 5px; } }
      .timeline-dot { display: none; }
      .timeline-item h3 { margin: 0; font-size: 1.1rem; } .company { font-weight: 400; color: #4b5563; } .year { color: #9ca3af; font-size: 0.9rem; margin: 0; }
      .projects-grid { display: grid; grid-template-columns: 1fr; gap: 30px; }
      .project-card { border: none; padding: 0; border-radius: 0; transition: 0.3s; background: none; border-bottom: 1px solid #f3f4f6; padding-bottom: 30px; }
      .project-card:hover { transform: translateX(10px); }
      .project-card h3 { margin-top: 0; font-size: 1.4rem; }
      .project-card a { color: var(--p); text-decoration: none; font-weight: 600; margin-top: 10px; display: inline-block; }
      footer { text-align: center; color: #9ca3af; padding: 40px 0; border-top: 1px solid #f3f4f6; }
    `,
    "Dev Terminal": `
      :root { --p: {COLOR}; --bg: #0d1117; --text: #c9d1d9; --border: #30363d; }
      body { font-family: 'Fira Code', 'Courier New', monospace; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; line-height: 1.6; }
      .container { max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 30px; }
      header { background: #161b22; border: 1px solid var(--border); border-radius: 6px; padding: 30px; position: relative; }
      header::before { content: 'MAC / ZSH'; position: absolute; top: 0; left: 0; width: 100%; background: #21262d; color: #8b949e; padding: 5px 10px; font-size: 0.8rem; box-sizing: border-box; border-radius: 6px 6px 0 0; }
      .header-container { margin-top: 20px; }
      h1 { font-size: 2.2rem; margin: 0; color: #58a6ff; font-weight: normal; }
      h1::before { content: '~/ '; color: #3fb950; }
      .title { color: #8b949e; font-size: 1.1rem; margin-top: 10px; }
      .title::before { content: '> '; color: #ff7b72; }
      .social-links a { color: #58a6ff; text-decoration: none; margin-right: 15px; display: inline-block; }
      .social-links a::before { content: 'curl '; color: #d2a8ff; }
      .social-links a:hover { text-decoration: underline; }
      section { background: #161b22; border: 1px solid var(--border); border-radius: 6px; padding: 30px; }
      section h2 { margin-top: 0; font-size: 1.3rem; color: #3fb950; border-bottom: 1px dashed var(--border); padding-bottom: 10px; }
      section h2::before { content: './'; color: #ff7b72; }
      .skill-tag { background: none; border: 1px solid var(--border); padding: 4px 10px; margin: 0 5px 5px 0; display: inline-block; font-size: 0.85rem; color: #d2a8ff; }
      .timeline-item { border-left: 1px solid var(--border); padding-left: 15px; margin-bottom: 20px; }
      .timeline-dot { display: none; }
      .timeline-item h3 { margin: 0; font-size: 1.1rem; color: #79c0ff; font-weight: normal; } .company { color: #ff7b72; } .year { color: #8b949e; font-size: 0.85rem; margin: 5px 0; }
      .projects-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
      .project-card { border: 1px solid var(--border); padding: 20px; border-radius: 6px; }
      .project-card h3 { margin-top: 0; font-size: 1.1rem; color: #a5d6ff; }
      .project-card a { color: #58a6ff; text-decoration: none; margin-top: 10px; display: inline-block; border-bottom: 1px dotted #58a6ff; }
      footer { text-align: center; color: #8b949e; font-size: 0.9rem; }
    `,
    "Monochrome Grace": `
      :root { --p: {COLOR}; --bg: #f9f9f9; --text: #222; }
      body { font-family: 'Playfair Display', serif; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; line-height: 1.8; }
      .container { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 50px; }
      header { border-bottom: 2px solid #222; padding-bottom: 40px; text-align: center; }
      .header-container { flex-direction: column !important; text-align: center !important; }
      .header-photo img { width: 150px; height: 150px; border-radius: 0; filter: grayscale(100%); margin: 0 auto; border: 1px solid #222; padding: 5px; }
      h1 { font-size: 4rem; margin: 0; font-weight: 700; text-transform: uppercase; letter-spacing: 4px; }
      .title { color: #555; font-size: 1.2rem; font-style: italic; margin-top: 10px; }
      .social-links { margin-top: 25px !important; }
      .social-links a { color: var(--text); text-decoration: none; font-family: 'Helvetica', sans-serif; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; border: 1px solid #222; padding: 10px 20px; margin: 0 10px; transition: 0.3s; }
      .social-links a:hover { background: #222; color: #fff; }
      section { padding: 0; border: none; background: none; }
      section h2 { font-size: 2rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid #222; padding-bottom: 10px; margin-bottom: 30px; }
      .skill-tag { font-family: 'Helvetica', sans-serif; background: #222; color: #fff; padding: 8px 16px; margin: 0 8px 8px 0; display: inline-block; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }
      .timeline-item { border-left: none; padding-left: 0; margin-bottom: 40px; position: relative; padding-top: 10px; border-top: 1px dotted #ccc; }
      .timeline-dot { display: none; }
      .timeline-item h3 { margin: 0; font-size: 1.5rem; } .company { font-style: italic; font-weight: normal; } .year { font-family: 'Helvetica', sans-serif; color: #555; font-size: 0.9rem; position: absolute; right: 0; top: 15px; }
      .projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px; }
      @media (max-width: 768px) { .projects-grid { grid-template-columns: 1fr; } .timeline-item .year { position: static; display: block; margin-bottom: 10px; } }
      .project-card { border: 1px solid #222; padding: 30px; background: #fff; transition: 0.3s; }
      .project-card:hover { background: #222; color: #fff; }
      .project-card h3 { margin-top: 0; font-size: 1.6rem; }
      .project-card p { font-family: 'Helvetica', sans-serif; font-size: 0.95rem; }
      .project-card a { color: inherit; text-decoration: underline; font-family: 'Helvetica', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; margin-top: 15px; display: inline-block; }
      footer { text-align: center; color: #555; border-top: 2px solid #222; padding: 30px 0; font-family: 'Helvetica', sans-serif; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; }
    `,
    "Bento Grid Pro": `
      :root { --p: {COLOR}; --bg: #f4f4f5; --text: #18181b; --card: #ffffff; }
      body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }
      .container { max-width: 1100px; margin: 0 auto; display: grid; gap: 20px; grid-template-columns: repeat(4, 1fr); }
      header { grid-column: 1 / -1; background: var(--card); border-radius: 32px; padding: 50px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 40px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 40px; object-fit: cover; }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; letter-spacing: -2px; }
      .title { color: var(--p); font-size: 1.3rem; font-weight: 600; margin-top: 5px; }
      .social-links { margin-top: 25px !important; }
      .social-links a { display: inline-block; padding: 12px 24px; background: var(--bg); border-radius: 16px; text-decoration: none; color: var(--text); margin-right: 12px; font-weight: 600; transition: 0.2s; }
      .social-links a:hover { background: var(--p); color: #fff; transform: translateY(-3px); }
      section { background: var(--card); border-radius: 32px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
      section:nth-of-type(1) { grid-column: 1 / 3; } /* About */
      section:nth-of-type(2) { grid-column: 3 / 5; } /* Skills */
      section:nth-of-type(3) { grid-column: 1 / -1; } /* Experience */
      section:nth-of-type(4) { grid-column: 1 / -1; } /* Projects */
      section h2 { font-size: 1.6rem; margin-top: 0; margin-bottom: 25px; display: flex; align-items: center; gap: 12px; }
      section h2::before { content: ''; width: 16px; height: 16px; background: var(--p); border-radius: 6px; display: inline-block; }
      .skill-tag { display: inline-block; padding: 10px 20px; background: var(--bg); border-radius: 12px; margin: 0 10px 10px 0; font-weight: 600; font-size: 0.95rem; }
      .timeline-item { padding: 25px; background: var(--bg); border-radius: 20px; margin-bottom: 20px; border-left: 6px solid var(--p); }
      .timeline-dot { display: none; }
      .timeline-item h3 { margin: 0 0 5px 0; font-size: 1.3rem; } .company { color: var(--p); } .year { color: #71717a; font-size: 0.95rem; margin-bottom: 15px; font-weight: 600; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
      .project-card { padding: 30px; background: var(--bg); border-radius: 24px; transition: 0.3s; }
      .project-card:hover { transform: translateY(-5px); background: var(--text); color: #fff; }
      .project-card:hover p { color: #a1a1aa; }
      .project-card:hover h3 { color: #fff; }
      .project-card h3 { margin-top: 0; font-size: 1.4rem; color: var(--text); transition: 0.3s; }
      .project-card p { transition: 0.3s; }
      .project-card a { color: #fff; background: var(--p); padding: 10px 20px; border-radius: 12px; text-decoration: none; font-size: 0.95rem; font-weight: 600; display: inline-block; margin-top: 15px; }
      footer { grid-column: 1 / -1; text-align: center; padding: 30px; color: #71717a; font-weight: 500; }
      @media (max-width: 900px) { .container { grid-template-columns: 1fr; } section:nth-of-type(1), section:nth-of-type(2) { grid-column: 1 / -1; } .header-container { flex-direction: column-reverse; text-align: center; } .header-content { align-items: center; display: flex; flex-direction: column; } }
    `
  };

  const finalTemplates = {};
  
  // Make 2 variations of each to hit 10 amazing templates
  Object.keys(cssBases).forEach((name, i) => {
    finalTemplates['theme_' + (i * 2)] = {
      name: name,
      css: cssBases[name]
    };
    finalTemplates['theme_' + (i * 2 + 1)] = {
      name: name + " Dark",
      css: cssBases[name].replace('--bg: #ffffff', '--bg: #000000').replace('--text: #111827', '--text: #f9fafb').replace('--gray: #f3f4f6', '--gray: #1f2937').replace('--bg: #f9f9f9', '--bg: #111').replace('--text: #222', '--text: #eee').replace('--bg: #f4f4f5', '--bg: #09090b').replace('--text: #18181b', '--text: #fafafa').replace('--card: #ffffff', '--card: #18181b')
    };
  });

  const output = `const templates = ${JSON.stringify(finalTemplates, null, 2)};`;
  fs.writeFileSync('C:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/tools/portfolio-builder/templates.js', output);
  console.log("Templates successfully generated!");
};

generateTemplates();

const templates = {
  bento: {
    name: 'Bento Grid',
    css: `
      :root { --p: {COLOR}; --bg: #f3f4f6; --text: #1f2937; --card: #ffffff; }
      body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }
      .container { max-width: 1000px; margin: 0 auto; display: grid; gap: 20px; grid-template-columns: repeat(3, 1fr); }
      header { grid-column: 1 / -1; background: var(--card); border-radius: 24px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-content { flex: 1; }
      .header-photo img { width: 120px; height: 120px; border-radius: 30px; object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; font-weight: 800; letter-spacing: -1px; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 600; margin-top: 5px; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #f3f4f6; border-radius: 12px; text-decoration: none; color: var(--text); margin-right: 10px; font-weight: 500; transition: 0.2s; }
      .social-links a:hover { background: var(--p); color: #fff; }
      section { background: var(--card); border-radius: 24px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      section:nth-of-type(1) { grid-column: 1 / 3; } /* About */
      section:nth-of-type(2) { grid-column: 3 / 4; } /* Skills */
      section:nth-of-type(3) { grid-column: 1 / -1; } /* Experience */
      section:nth-of-type(4) { grid-column: 1 / -1; } /* Projects */
      section h2 { font-size: 1.5rem; margin-top: 0; display: flex; align-items: center; gap: 10px; }
      section h2::before { content: ''; width: 12px; height: 12px; background: var(--p); border-radius: 4px; display: inline-block; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: #f3f4f6; border-radius: 8px; margin: 0 8px 8px 0; font-weight: 500; }
      .timeline-item { padding: 20px; background: #f9fafb; border-radius: 16px; margin-bottom: 15px; border-left: 4px solid var(--p); }
      .timeline-dot { display: none; }
      .timeline-item h3 { margin: 0 0 5px 0; font-size: 1.2rem; } .company { color: var(--p); } .year { color: #6b7280; font-size: 0.9rem; margin-bottom: 10px; font-weight: 600; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
      .project-card { padding: 25px; background: #f9fafb; border-radius: 16px; border: 1px solid #e5e7eb; transition: 0.3s; }
      .project-card:hover { transform: translateY(-5px); border-color: var(--p); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
      .project-card h3 { margin-top: 0; }
      .project-card a { color: #fff; background: var(--text); padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 0.9rem; font-weight: 600; display: inline-block; margin-top: 10px; }
      footer { grid-column: 1 / -1; text-align: center; padding: 20px; color: #6b7280; }
      @media (max-width: 768px) { .container { grid-template-columns: 1fr; } section:nth-of-type(1), section:nth-of-type(2) { grid-column: 1 / -1; } .header-container { flex-direction: column-reverse; text-align: center; } }
    `
  },
  glassmorphism: {
    name: 'Glass 3D',
    css: `
      :root { --p: {COLOR}; --bg1: #e0c3fc; --bg2: #8ec5fc; --text: #1e1e24; }
      body { font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, var(--bg1) 0%, var(--bg2) 100%); color: var(--text); margin: 0; padding: 40px 20px; min-height: 100vh; background-attachment: fixed; }
      .container { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 30px; }
      .glass-panel { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); padding: 40px; }
      header { @extend .glass-panel; background: rgba(255, 255, 255, 0.35); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.6); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.1); }
      .title { color: var(--text); font-size: 1.3rem; font-weight: 600; margin-top: 5px; opacity: 0.8; }
      .social-links a { color: #fff; text-decoration: none; font-weight: 600; background: var(--p); padding: 8px 20px; border-radius: 30px; margin-right: 10px; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
      section { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(15px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); padding: 40px; }
      section h2 { margin-top: 0; font-size: 2rem; color: #fff; text-shadow: 0 2px 5px rgba(0,0,0,0.1); border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 10px; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: rgba(255,255,255,0.4); border-radius: 20px; margin: 0 8px 8px 0; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
      .timeline-item { padding: 20px; background: rgba(255,255,255,0.3); border-radius: 15px; margin-bottom: 20px; border-left: 5px solid var(--p); }
      .timeline-item h3 { margin: 0 0 5px; } .company { opacity: 0.8; } .year { color: var(--p); font-weight: 700; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; }
      .project-card { padding: 25px; background: rgba(255,255,255,0.3); border-radius: 15px; transition: transform 0.3s; }
      .project-card:hover { transform: translateY(-10px); background: rgba(255,255,255,0.5); }
      .project-card h3 { margin-top: 0; }
      .project-card a { color: #fff; background: var(--p); text-decoration: none; padding: 8px 20px; border-radius: 30px; font-weight: 600; display: inline-block; margin-top: 15px; }
      footer { text-align: center; color: rgba(0,0,0,0.5); font-weight: 600; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 2.5rem; } }
    `
  },
  neumorphism: {
    name: 'Soft 3D',
    css: `
      :root { --p: {COLOR}; --bg: #e0e5ec; --text: #4a5568; --shadow-light: #ffffff; --shadow-dark: #a3b1c6; }
      body { font-family: 'Nunito', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; }
      .container { max-width: 850px; margin: 0 auto; }
      .neu-box { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 40px; margin-bottom: 40px; }
      header { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 50px; margin-bottom: 40px; text-align: center; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 20px; }
      .header-photo img { width: 150px; height: 150px; border-radius: 50%; box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); border: 5px solid var(--bg); object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; color: #2d3748; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 700; margin-top: 10px; }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 12px 24px; border-radius: 30px; background: var(--bg); box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); color: var(--p); text-decoration: none; font-weight: bold; margin: 0 10px; transition: 0.2s; }
      .social-links a:active { box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); }
      section { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 40px; margin-bottom: 40px; }
      section h2 { margin-top: 0; font-size: 1.8rem; color: #2d3748; display: inline-block; padding: 10px 20px; border-radius: 15px; box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); margin-bottom: 30px; }
      .skill-tag { display: inline-block; padding: 10px 20px; border-radius: 30px; background: var(--bg); box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); margin: 0 10px 15px 0; font-weight: 600; color: var(--p); }
      .timeline-item { padding: 25px; border-radius: 15px; background: var(--bg); box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); margin-bottom: 25px; }
      .timeline-item h3 { margin: 0 0 5px; color: #2d3748; } .company { color: var(--p); } .year { font-weight: bold; color: #718096; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 30px; }
      .project-card { padding: 30px; border-radius: 20px; background: var(--bg); box-shadow: 7px 7px 15px var(--shadow-dark), -7px -7px 15px var(--shadow-light); }
      .project-card h3 { margin-top: 0; color: #2d3748; }
      .project-card a { display: inline-block; padding: 10px 20px; border-radius: 20px; background: var(--bg); box-shadow: 4px 4px 8px var(--shadow-dark), -4px -4px 8px var(--shadow-light); color: var(--p); text-decoration: none; font-weight: bold; margin-top: 20px; }
      footer { text-align: center; font-weight: bold; color: #a0aec0; }
    `
  },
  brutalism: {
    name: 'Brutalism',
    css: `
      :root { --p: {COLOR}; --bg: #ffffff; --text: #000000; }
      body { font-family: 'Space Grotesk', 'Courier New', monospace; background: var(--bg); color: var(--text); margin: 0; border: 15px solid var(--text); min-height: 100vh; box-sizing: border-box; }
      .container { max-width: 1000px; margin: 0 auto; padding: 0; }
      header { background: var(--p); color: #fff; padding: 60px 40px; border-bottom: 10px solid var(--text); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
      .header-photo img { width: 160px; height: 160px; object-fit: cover; border: 6px solid var(--text); box-shadow: 10px 10px 0 var(--text); }
      h1 { font-size: 4.5rem; margin: 0; text-transform: uppercase; line-height: 1; letter-spacing: -2px; }
      .title { font-size: 1.5rem; background: var(--text); color: #fff; display: inline-block; padding: 5px 15px; margin-top: 20px; text-transform: uppercase; font-weight: bold; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; color: var(--text); border: 3px solid var(--text); text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 20px; margin-right: 15px; box-shadow: 4px 4px 0 var(--text); transition: 0.1s; }
      .social-links a:hover { transform: translate(4px, 4px); box-shadow: 0 0 0 var(--text); }
      section { padding: 60px 40px; border-bottom: 10px solid var(--text); }
      section h2 { font-size: 3rem; text-transform: uppercase; margin-top: 0; margin-bottom: 40px; display: inline-block; background: var(--p); color: #fff; padding: 0 20px; transform: rotate(-2deg); border: 4px solid var(--text); box-shadow: 8px 8px 0 var(--text); }
      .skill-tag { display: inline-block; padding: 10px 20px; background: #fff; border: 3px solid var(--text); margin: 0 15px 15px 0; font-weight: bold; font-size: 1.2rem; text-transform: uppercase; box-shadow: 5px 5px 0 var(--p); }
      .timeline-item { padding: 30px; background: #fff; border: 5px solid var(--text); margin-bottom: 30px; box-shadow: 10px 10px 0 var(--text); }
      .timeline-item h3 { margin: 0 0 10px; font-size: 1.8rem; text-transform: uppercase; }
      .company { background: var(--p); color: #fff; padding: 2px 10px; } .year { font-weight: bold; font-size: 1.2rem; border-bottom: 3px solid var(--text); display: inline-block; margin-bottom: 15px; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; }
      .project-card { padding: 30px; background: var(--p); color: #fff; border: 6px solid var(--text); box-shadow: 12px 12px 0 var(--text); }
      .project-card h3 { margin-top: 0; font-size: 2rem; text-transform: uppercase; }
      .project-card a { display: inline-block; padding: 10px 20px; background: #fff; color: var(--text); border: 3px solid var(--text); text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 20px; box-shadow: 5px 5px 0 var(--text); }
      footer { padding: 40px; text-align: center; font-weight: bold; font-size: 1.5rem; text-transform: uppercase; }
      @media (max-width: 768px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 3rem; } body { border-width: 5px; } }
    `
  },
  pinterest: {
    name: 'Masonry Grid',
    css: `
      :root { --p: {COLOR}; --bg: #f9f9f9; --text: #111; }
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }
      .container { max-width: 1200px; margin: 0 auto; }
      header { text-align: center; padding: 60px 20px; margin-bottom: 40px; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 20px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; font-weight: bold; }
      .title { color: #666; font-size: 1.2rem; margin-top: 10px; }
      .social-links a { display: inline-block; padding: 10px 25px; border-radius: 30px; background: #efefef; color: #111; text-decoration: none; font-weight: bold; margin: 0 5px; transition: 0.2s; }
      .social-links a:hover { background: var(--p); color: #fff; }
      .masonry-layout { display: column; column-count: 3; column-gap: 25px; }
      section { break-inside: avoid; background: #fff; border-radius: 24px; padding: 35px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
      section h2 { margin-top: 0; font-size: 1.5rem; margin-bottom: 25px; }
      .skill-tag { display: inline-block; padding: 8px 16px; border-radius: 20px; background: #f0f0f0; margin: 0 8px 10px 0; font-weight: 500; font-size: 0.9rem; }
      .timeline-item { margin-bottom: 25px; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.1rem; }
      .company { color: var(--p); } .year { color: #888; font-size: 0.85rem; display: block; margin-bottom: 8px; }
      .project-card { background: #f9f9f9; border-radius: 16px; padding: 25px; margin-bottom: 20px; }
      .project-card h3 { margin-top: 0; font-size: 1.2rem; }
      .project-card a { display: inline-block; background: var(--p); color: #fff; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-weight: bold; font-size: 0.9rem; margin-top: 15px; }
      footer { text-align: center; padding: 40px; color: #888; }
      @media (max-width: 900px) { .masonry-layout { column-count: 2; } }
      @media (max-width: 600px) { .masonry-layout { column-count: 1; } }
    `
  },
  cyberpunk: {
    name: 'Neon Cyber',
    css: `
      :root { --p: {COLOR}; --bg: #09090b; --text: #e4e4e7; }
      body { font-family: 'Rajdhani', sans-serif; background: var(--bg); color: var(--text); margin: 0; background-image: linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px); background-size: 30px 30px; }
      .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
      header { position: relative; padding: 60px 40px; border: 1px solid var(--p); background: rgba(0,0,0,0.6); box-shadow: 0 0 20px inset rgba(0, 255, 255, 0.2); }
      header::before { content: ''; position: absolute; top: -2px; left: -2px; width: 20px; height: 20px; border-top: 4px solid var(--p); border-left: 4px solid var(--p); }
      header::after { content: ''; position: absolute; bottom: -2px; right: -2px; width: 20px; height: 20px; border-bottom: 4px solid var(--p); border-right: 4px solid var(--p); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; object-fit: cover; clip-path: polygon(20% 0%, 100% 0, 100% 80%, 80% 100%, 0 100%, 0% 20%); border: 2px solid var(--p); filter: drop-shadow(0 0 10px var(--p)); }
      h1 { font-size: 3.5rem; margin: 0; color: #fff; text-shadow: 0 0 10px var(--p), 0 0 20px var(--p); text-transform: uppercase; letter-spacing: 2px; }
      .title { color: var(--p); font-size: 1.2rem; margin-top: 10px; text-transform: uppercase; letter-spacing: 4px; }
      .social-links a { display: inline-block; padding: 8px 20px; background: transparent; border: 1px solid var(--p); color: var(--p); text-decoration: none; text-transform: uppercase; font-weight: bold; margin-right: 15px; margin-top: 20px; transition: 0.3s; }
      .social-links a:hover { background: var(--p); color: #000; box-shadow: 0 0 15px var(--p); }
      section { margin-top: 60px; }
      section h2 { font-size: 2rem; color: #fff; text-transform: uppercase; letter-spacing: 3px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 15px; position: relative; }
      section h2::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 100px; height: 3px; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .skill-tag { display: inline-block; padding: 6px 15px; background: rgba(0, 255, 255, 0.1); border: 1px solid var(--p); color: var(--p); margin: 0 10px 10px 0; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; }
      .timeline-item { padding: 25px; border-left: 2px solid var(--p); background: rgba(255,255,255,0.02); margin-bottom: 25px; position: relative; }
      .timeline-item::before { content: ''; position: absolute; left: -6px; top: 0; width: 10px; height: 10px; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .timeline-item h3 { margin: 0 0 5px; color: #fff; text-transform: uppercase; font-size: 1.3rem; }
      .company { color: var(--p); } .year { color: #888; font-size: 0.9rem; margin-bottom: 10px; display: inline-block; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 25px; background: rgba(0,0,0,0.5); border: 1px solid #333; transition: 0.3s; position: relative; overflow: hidden; }
      .project-card:hover { border-color: var(--p); box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.1); }
      .project-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 15px; height: 15px; background: var(--p); clip-path: polygon(100% 0, 0% 100%, 100% 100%); }
      .project-card h3 { margin-top: 0; color: #fff; text-transform: uppercase; }
      .project-card a { display: inline-block; padding: 8px 20px; background: var(--p); color: #000; text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 15px; }
      footer { text-align: center; padding: 40px; color: #666; text-transform: uppercase; letter-spacing: 2px; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } }
    `
  },
  minimal3d: {
    name: 'Minimal 3D',
    css: `
      :root { --p: {COLOR}; --bg: #fafafa; --text: #222; }
      body { font-family: 'Space Grotesk', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; }
      .container { max-width: 900px; margin: 0 auto; }
      header { background: #fff; border: 2px solid #222; border-radius: 12px; padding: 50px; box-shadow: 8px 8px 0 #222; margin-bottom: 60px; }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 3px solid #222; box-shadow: 4px 4px 0 #222; object-fit: cover; }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; }
      .title { color: var(--p); font-size: 1.4rem; font-weight: 700; margin-top: 10px; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; border: 2px solid #222; border-radius: 8px; color: #222; text-decoration: none; font-weight: bold; margin-right: 15px; margin-top: 20px; box-shadow: 4px 4px 0 #222; transition: 0.1s; }
      .social-links a:active { transform: translate(4px, 4px); box-shadow: 0 0 0 #222; }
      section { margin-bottom: 60px; }
      section h2 { font-size: 2.2rem; border-bottom: 3px solid #222; padding-bottom: 10px; display: inline-block; margin-bottom: 30px; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: #fff; border: 2px solid #222; border-radius: 20px; margin: 0 10px 10px 0; font-weight: 600; box-shadow: 3px 3px 0 #222; }
      .timeline-item { padding: 30px; background: #fff; border: 2px solid #222; border-radius: 12px; margin-bottom: 25px; box-shadow: 6px 6px 0 #222; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.4rem; }
      .company { color: var(--p); font-weight: 700; } .year { color: #666; font-size: 0.9rem; font-weight: bold; padding: 4px 10px; border: 1px solid #ccc; border-radius: 20px; display: inline-block; margin-bottom: 15px; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 30px; background: #fff; border: 2px solid #222; border-radius: 12px; box-shadow: 6px 6px 0 #222; }
      .project-card h3 { margin-top: 0; font-size: 1.5rem; }
      .project-card a { display: inline-block; padding: 10px 20px; background: var(--p); color: #fff; border: 2px solid #222; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px; box-shadow: 4px 4px 0 #222; }
      footer { text-align: center; padding: 40px; font-weight: bold; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } }
    `
  },
  darkgradient: {
    name: 'Dark Sleek',
    css: `
      :root { --p: {COLOR}; --bg: #0f1115; --text: #e2e8f0; }
      body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; }
      .container { max-width: 800px; margin: 0 auto; padding: 0 20px; }
      header { padding: 120px 20px 80px; text-align: center; background: radial-gradient(circle at top, rgba(255,255,255,0.05) 0%, transparent 70%); border-bottom: 1px solid rgba(255,255,255,0.05); }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 25px; }
      .header-photo img { width: 130px; height: 130px; border-radius: 50%; object-fit: cover; box-shadow: 0 0 30px rgba(0,0,0,0.5); border: 2px solid rgba(255,255,255,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; background: linear-gradient(to right, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 500; margin-top: 10px; letter-spacing: 1px; }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 10px 25px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 30px; color: #fff; text-decoration: none; font-size: 0.9rem; margin: 0 8px; transition: 0.3s; }
      .social-links a:hover { background: var(--p); border-color: var(--p); }
      section { padding: 60px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
      section h2 { font-size: 2rem; color: #fff; margin-bottom: 40px; display: flex; align-items: center; gap: 15px; }
      section h2::after { content: ''; flex: 1; height: 1px; background: linear-gradient(to right, rgba(255,255,255,0.1), transparent); }
      .skill-tag { display: inline-block; padding: 8px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; margin: 0 10px 10px 0; font-size: 0.9rem; color: #94a3b8; }
      .timeline-item { padding-left: 30px; border-left: 2px solid rgba(255,255,255,0.05); position: relative; margin-bottom: 40px; }
      .timeline-dot { position: absolute; left: -6px; top: 5px; width: 10px; height: 10px; border-radius: 50%; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .timeline-item h3 { margin: 0 0 5px; color: #fff; font-size: 1.2rem; }
      .company { color: #94a3b8; font-weight: 400; } .year { color: var(--p); font-size: 0.85rem; font-weight: 600; margin-bottom: 15px; display: block; }
      .projects-grid { display: grid; grid-template-columns: 1fr; gap: 25px; }
      .project-card { padding: 30px; background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, transparent 100%); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; }
      .project-card h3 { margin-top: 0; color: #fff; font-size: 1.4rem; }
      .project-card p { color: #94a3b8; }
      .project-card a { display: inline-block; padding: 10px 20px; background: rgba(255,255,255,0.05); color: #fff; text-decoration: none; border-radius: 8px; font-size: 0.9rem; margin-top: 15px; transition: 0.3s; }
      .project-card a:hover { background: var(--p); }
      footer { text-align: center; padding: 40px; color: #64748b; font-size: 0.9rem; }
    `
  },
  retropop: {
    name: 'Retro Pop',
    css: `
      :root { --p: {COLOR}; --bg: #ffebb3; --text: #1a1a1a; }
      body { font-family: 'Balsamiq Sans', cursive, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; background-image: radial-gradient(#1a1a1a 1px, transparent 1px); background-size: 20px 20px; }
      .container { max-width: 900px; margin: 0 auto; }
      header { background: #fff; border: 4px solid var(--text); border-radius: 20px; padding: 50px; box-shadow: 10px 10px 0 var(--p); margin-bottom: 60px; transform: rotate(-1deg); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 4px solid var(--text); object-fit: cover; }
      h1 { font-size: 4rem; margin: 0; text-transform: uppercase; color: var(--p); text-shadow: 3px 3px 0 var(--text); }
      .title { font-size: 1.5rem; font-weight: bold; margin-top: 10px; background: var(--text); color: #fff; display: inline-block; padding: 5px 15px; transform: rotate(2deg); }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; border: 3px solid var(--text); border-radius: 10px; color: var(--text); text-decoration: none; font-weight: bold; margin-right: 15px; box-shadow: 4px 4px 0 var(--p); transition: 0.2s; }
      .social-links a:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--p); }
      section { background: #fff; border: 4px solid var(--text); border-radius: 20px; padding: 40px; margin-bottom: 40px; box-shadow: 10px 10px 0 rgba(0,0,0,0.1); }
      section h2 { font-size: 2.5rem; text-transform: uppercase; margin-top: 0; color: var(--text); text-shadow: 2px 2px 0 var(--p); border-bottom: 4px dashed var(--text); padding-bottom: 15px; }
      .skill-tag { display: inline-block; padding: 10px 20px; background: var(--p); border: 3px solid var(--text); border-radius: 15px; color: #fff; font-weight: bold; font-size: 1.1rem; margin: 0 10px 10px 0; box-shadow: 4px 4px 0 var(--text); }
      .timeline-item { padding: 25px; border: 3px solid var(--text); border-radius: 15px; margin-bottom: 25px; background: #fdfdfd; position: relative; }
      .timeline-item::after { content: ''; position: absolute; top: 10px; right: 10px; width: 15px; height: 15px; border-radius: 50%; background: var(--p); border: 2px solid var(--text); }
      .timeline-item h3 { margin: 0 0 10px; font-size: 1.5rem; }
      .company { color: var(--p); } .year { background: var(--text); color: #fff; padding: 2px 10px; border-radius: 10px; font-size: 0.9rem; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 25px; background: #fff; border: 4px solid var(--text); border-radius: 15px; box-shadow: 8px 8px 0 var(--p); transition: 0.2s; }
      .project-card:hover { transform: translateY(-5px); box-shadow: 12px 12px 0 var(--text); }
      .project-card h3 { margin-top: 0; font-size: 1.6rem; }
      .project-card a { display: inline-block; padding: 10px 20px; background: var(--text); color: #fff; border-radius: 10px; text-decoration: none; font-weight: bold; margin-top: 15px; }
      footer { text-align: center; padding: 30px; font-weight: bold; font-size: 1.2rem; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 2.8rem; } }
    `
  },
  premium: {
    name: 'Premium Serif',
    css: `
      :root { --p: {COLOR}; --bg: #fdfbf7; --text: #2c2c2c; }
      body { font-family: 'Lora', serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; line-height: 1.8; }
      .container { max-width: 750px; margin: 0 auto; padding: 0 20px; }
      header { padding: 100px 0 60px; text-align: center; border-bottom: 1px solid #e5e5e5; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 400; color: #111; letter-spacing: -1px; }
      .title { color: var(--p); font-size: 1.1rem; font-family: 'Inter', sans-serif; text-transform: uppercase; letter-spacing: 3px; margin-top: 15px; }
      .social-links { margin-top: 40px !important; }
      .social-links a { display: inline-block; margin: 0 15px; color: #666; text-decoration: none; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s; }
      .social-links a:hover { color: var(--p); }
      section { padding: 70px 0; border-bottom: 1px solid #e5e5e5; }
      section h2 { font-size: 2.2rem; font-weight: 400; color: #111; text-align: center; margin-bottom: 50px; }
      .skill-tag { display: inline-block; padding: 8px 16px; border: 1px solid #dcdcdc; border-radius: 30px; margin: 0 10px 15px 0; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #555; }
      .timeline-item { margin-bottom: 40px; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.5rem; font-weight: 400; color: #111; }
      .company { color: var(--p); font-family: 'Inter', sans-serif; font-size: 0.95rem; } .year { display: block; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #999; margin-top: 8px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }
      .projects-grid { display: flex; flex-direction: column; gap: 40px; }
      .project-card { padding: 40px; background: #fff; border: 1px solid #eee; box-shadow: 0 20px 40px rgba(0,0,0,0.03); border-radius: 8px; text-align: center; }
      .project-card h3 { margin-top: 0; font-size: 1.8rem; font-weight: 400; color: #111; }
      .project-card a { display: inline-block; margin-top: 25px; padding-bottom: 5px; color: var(--p); text-decoration: none; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid var(--p); transition: 0.3s; }
      .project-card a:hover { opacity: 0.7; }
      footer { text-align: center; padding: 60px 0; font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #999; }
    `
  },
  bentopro: {
    name: 'Bento Grid Pro',
    css: `
      :root { --p: {COLOR}; --bg: #f3f4f6; --text: #1f2937; --card: #ffffff; }
      body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }
      .container { max-width: 1000px; margin: 0 auto; display: grid; gap: 20px; grid-template-columns: repeat(3, 1fr); }
      header { grid-column: 1 / -1; background: var(--card); border-radius: 24px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-content { flex: 1; }
      .header-photo img { width: 120px; height: 120px; border-radius: 30px; object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; font-weight: 800; letter-spacing: -1px; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 600; margin-top: 5px; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #f3f4f6; border-radius: 20px; text-decoration: none; color: var(--text); margin-right: 10px; font-weight: 500; transition: 0.2s; }
      .social-links a:hover { background: var(--p); color: #fff; }
      section { background: var(--card); border-radius: 24px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      section:nth-of-type(1) { grid-column: 1 / 3; } /* About */
      section:nth-of-type(2) { grid-column: 3 / 4; } /* Skills */
      section:nth-of-type(3) { grid-column: 1 / -1; } /* Experience */
      section:nth-of-type(4) { grid-column: 1 / -1; } /* Projects */
      section h2 { font-size: 1.5rem; margin-top: 0; display: flex; align-items: center; gap: 10px; }
      section h2::before { content: ''; width: 12px; height: 12px; background: var(--p); border-radius: 4px; display: inline-block; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: #f3f4f6; border-radius: 16px; margin: 0 8px 8px 0; font-weight: 500; }
      .timeline-item { padding: 20px; background: #f9fafb; border-radius: 16px; margin-bottom: 15px; border-left: 4px solid var(--p); }
      .timeline-dot { display: none; }
      .timeline-item h3 { margin: 0 0 5px 0; font-size: 1.2rem; } .company { color: var(--p); } .year { color: #6b7280; font-size: 0.9rem; margin-bottom: 10px; font-weight: 600; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
      .project-card { padding: 25px; background: #f9fafb; border-radius: 16px; border: 1px solid #e5e7eb; transition: 0.3s; }
      .project-card:hover { transform: translateY(-5px); border-color: var(--p); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
      .project-card h3 { margin-top: 0; }
      .project-card a { color: #fff; background: var(--text); padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 0.9rem; font-weight: 600; display: inline-block; margin-top: 10px; }
      footer { grid-column: 1 / -1; text-align: center; padding: 20px; color: #6b7280; }
      @media (max-width: 768px) { .container { grid-template-columns: 1fr; } section:nth-of-type(1), section:nth-of-type(2) { grid-column: 1 / -1; } .header-container { flex-direction: column-reverse; text-align: center; } }
    
 header { text-align: left; }
 body { font-size: 1.05rem; }
 .social-links a { text-transform: uppercase; }`
  },
  bentoelite: {
    name: 'Bento Grid Elite',
    css: `
      :root { --p: {COLOR}; --bg: #f3f4f6; --text: #1f2937; --card: #ffffff; }
      body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }
      .container { max-width: 1000px; margin: 0 auto; display: grid; gap: 20px; grid-template-columns: repeat(3, 1fr); }
      header { grid-column: 1 / -1; background: var(--card); border-radius: 24px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-content { flex: 1; }
      .header-photo img { width: 120px; height: 120px; border-radius: 30px; object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; font-weight: 800; letter-spacing: -1px; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 600; margin-top: 5px; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #f3f4f6; border-radius: 12px; text-decoration: none; color: var(--text); margin-right: 10px; font-weight: 500; transition: 0.2s; }
      .social-links a:hover { background: var(--p); color: #fff; }
      section { background: var(--card); border-radius: 24px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      section:nth-of-type(1) { grid-column: 1 / 3; } /* About */
      section:nth-of-type(2) { grid-column: 3 / 4; } /* Skills */
      section:nth-of-type(3) { grid-column: 1 / -1; } /* Experience */
      section:nth-of-type(4) { grid-column: 1 / -1; } /* Projects */
      section h2 { font-size: 1.5rem; margin-top: 0; display: flex; align-items: center; gap: 10px; }
      section h2::before { content: ''; width: 12px; height: 12px; background: var(--p); border-radius: 4px; display: inline-block; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: #f3f4f6; border-radius: 8px; margin: 0 8px 8px 0; font-weight: 500; }
      .timeline-item { padding: 20px; background: #f9fafb; border-radius: 16px; margin-bottom: 15px; border-left: 4px solid var(--p); }
      .timeline-dot { display: none; }
      .timeline-item h3 { margin: 0 0 5px 0; font-size: 1.2rem; } .company { color: var(--p); } .year { color: #6b7280; font-size: 0.9rem; margin-bottom: 10px; font-weight: 600; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
      .project-card { padding: 25px; background: #f9fafb; border-radius: 16px; border: 1px solid #e5e7eb; transition: 0.3s; }
      .project-card:hover { transform: translateY(-5px); border-color: var(--p); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
      .project-card h3 { margin-top: 0; }
      .project-card a { color: #fff; background: var(--text); padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 0.9rem; font-weight: 600; display: inline-block; margin-top: 10px; }
      footer { grid-column: 1 / -1; text-align: center; padding: 20px; color: #6b7280; }
      @media (max-width: 768px) { .container { grid-template-columns: 1fr; } section:nth-of-type(1), section:nth-of-type(2) { grid-column: 1 / -1; } .header-container { flex-direction: column-reverse; text-align: center; } }
    `
  },
  bentoplus: {
    name: 'Bento Grid Plus',
    css: `
      :root { --p: {COLOR}; --bg: #f3f4f6; --text: #1f2937; --card: #ffffff; }
      body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }
      .container { max-width: 1000px; margin: 0 auto; display: grid; gap: 20px; grid-template-columns: repeat(3, 1fr); }
      header { grid-column: 1 / -1; background: var(--card); border-radius: 24px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-content { flex: 1; }
      .header-photo img { width: 120px; height: 120px; border-radius: 30px; object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; font-weight: 800; letter-spacing: -1px; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 600; margin-top: 5px; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #f3f4f6; border-radius: 20px; text-decoration: none; color: var(--text); margin-right: 10px; font-weight: 500; transition: 0.2s; }
      .social-links a:hover { background: var(--p); color: #fff; }
      section { background: var(--card); border-radius: 24px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      section:nth-of-type(1) { grid-column: 1 / 3; } /* About */
      section:nth-of-type(2) { grid-column: 3 / 4; } /* Skills */
      section:nth-of-type(3) { grid-column: 1 / -1; } /* Experience */
      section:nth-of-type(4) { grid-column: 1 / -1; } /* Projects */
      section h2 { font-size: 1.5rem; margin-top: 0; display: flex; align-items: center; gap: 10px; }
      section h2::before { content: ''; width: 12px; height: 12px; background: var(--p); border-radius: 4px; display: inline-block; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: #f3f4f6; border-radius: 16px; margin: 0 8px 8px 0; font-weight: 500; }
      .timeline-item { padding: 20px; background: #f9fafb; border-radius: 16px; margin-bottom: 15px; border-left: 4px solid var(--p); }
      .timeline-dot { display: none; }
      .timeline-item h3 { margin: 0 0 5px 0; font-size: 1.2rem; } .company { color: var(--p); } .year { color: #6b7280; font-size: 0.9rem; margin-bottom: 10px; font-weight: 600; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
      .project-card { padding: 25px; background: #f9fafb; border-radius: 16px; border: 1px solid #e5e7eb; transition: 0.3s; }
      .project-card:hover { transform: translateY(-5px); border-color: var(--p); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
      .project-card h3 { margin-top: 0; }
      .project-card a { color: #fff; background: var(--text); padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 0.9rem; font-weight: 600; display: inline-block; margin-top: 10px; }
      footer { grid-column: 1 / -1; text-align: center; padding: 20px; color: #6b7280; }
      @media (max-width: 768px) { .container { grid-template-columns: 1fr; } section:nth-of-type(1), section:nth-of-type(2) { grid-column: 1 / -1; } .header-container { flex-direction: column-reverse; text-align: center; } }
    `
  },
  bentoultra: {
    name: 'Bento Grid Ultra',
    css: `
      :root { --p: {COLOR}; --bg: #f3f4f6; --text: #1f2937; --card: #ffffff; }
      body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }
      .container { max-width: 1000px; margin: 0 auto; display: grid; gap: 20px; grid-template-columns: repeat(3, 1fr); }
      header { grid-column: 1 / -1; background: var(--card); border-radius: 24px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-content { flex: 1; }
      .header-photo img { width: 120px; height: 120px; border-radius: 30px; object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; font-weight: 800; letter-spacing: -1px; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 600; margin-top: 5px; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #f3f4f6; border-radius: 12px; text-decoration: none; color: var(--text); margin-right: 10px; font-weight: 500; transition: 0.2s; }
      .social-links a:hover { background: var(--p); color: #fff; }
      section { background: var(--card); border-radius: 24px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      section:nth-of-type(1) { grid-column: 1 / 3; } /* About */
      section:nth-of-type(2) { grid-column: 3 / 4; } /* Skills */
      section:nth-of-type(3) { grid-column: 1 / -1; } /* Experience */
      section:nth-of-type(4) { grid-column: 1 / -1; } /* Projects */
      section h2 { font-size: 1.5rem; margin-top: 0; display: flex; align-items: center; gap: 10px; }
      section h2::before { content: ''; width: 12px; height: 12px; background: var(--p); border-radius: 4px; display: inline-block; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: #f3f4f6; border-radius: 8px; margin: 0 8px 8px 0; font-weight: 500; }
      .timeline-item { padding: 20px; background: #f9fafb; border-radius: 16px; margin-bottom: 15px; border-left: 4px solid var(--p); }
      .timeline-dot { display: none; }
      .timeline-item h3 { margin: 0 0 5px 0; font-size: 1.2rem; } .company { color: var(--p); } .year { color: #6b7280; font-size: 0.9rem; margin-bottom: 10px; font-weight: 600; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
      .project-card { padding: 25px; background: #f9fafb; border-radius: 16px; border: 1px solid #e5e7eb; transition: 0.3s; }
      .project-card:hover { transform: translateY(-5px); border-color: var(--p); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
      .project-card h3 { margin-top: 0; }
      .project-card a { color: #fff; background: var(--text); padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 0.9rem; font-weight: 600; display: inline-block; margin-top: 10px; }
      footer { grid-column: 1 / -1; text-align: center; padding: 20px; color: #6b7280; }
      @media (max-width: 768px) { .container { grid-template-columns: 1fr; } section:nth-of-type(1), section:nth-of-type(2) { grid-column: 1 / -1; } .header-container { flex-direction: column-reverse; text-align: center; } }
    
 header { text-align: left; }`
  },
  bentomax: {
    name: 'Bento Grid Max',
    css: `
      :root { --p: {COLOR}; --bg: #f3f4f6; --text: #1f2937; --card: #ffffff; }
      body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }
      .container { max-width: 1000px; margin: 0 auto; display: grid; gap: 20px; grid-template-columns: repeat(3, 1fr); }
      header { grid-column: 1 / -1; background: var(--card); border-radius: 24px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-content { flex: 1; }
      .header-photo img { width: 120px; height: 120px; border-radius: 30px; object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; font-weight: 800; letter-spacing: -1px; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 600; margin-top: 5px; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #f3f4f6; border-radius: 20px; text-decoration: none; color: var(--text); margin-right: 10px; font-weight: 500; transition: 0.2s; }
      .social-links a:hover { background: var(--p); color: #fff; }
      section { background: var(--card); border-radius: 24px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      section:nth-of-type(1) { grid-column: 1 / 3; } /* About */
      section:nth-of-type(2) { grid-column: 3 / 4; } /* Skills */
      section:nth-of-type(3) { grid-column: 1 / -1; } /* Experience */
      section:nth-of-type(4) { grid-column: 1 / -1; } /* Projects */
      section h2 { font-size: 1.5rem; margin-top: 0; display: flex; align-items: center; gap: 10px; }
      section h2::before { content: ''; width: 12px; height: 12px; background: var(--p); border-radius: 4px; display: inline-block; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: #f3f4f6; border-radius: 16px; margin: 0 8px 8px 0; font-weight: 500; }
      .timeline-item { padding: 20px; background: #f9fafb; border-radius: 16px; margin-bottom: 15px; border-left: 4px solid var(--p); }
      .timeline-dot { display: none; }
      .timeline-item h3 { margin: 0 0 5px 0; font-size: 1.2rem; } .company { color: var(--p); } .year { color: #6b7280; font-size: 0.9rem; margin-bottom: 10px; font-weight: 600; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
      .project-card { padding: 25px; background: #f9fafb; border-radius: 16px; border: 1px solid #e5e7eb; transition: 0.3s; }
      .project-card:hover { transform: translateY(-5px); border-color: var(--p); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
      .project-card h3 { margin-top: 0; }
      .project-card a { color: #fff; background: var(--text); padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 0.9rem; font-weight: 600; display: inline-block; margin-top: 10px; }
      footer { grid-column: 1 / -1; text-align: center; padding: 20px; color: #6b7280; }
      @media (max-width: 768px) { .container { grid-template-columns: 1fr; } section:nth-of-type(1), section:nth-of-type(2) { grid-column: 1 / -1; } .header-container { flex-direction: column-reverse; text-align: center; } }
    
 body { font-size: 1.05rem; }`
  },
  bentolite: {
    name: 'Bento Grid Lite',
    css: `
      :root { --p: {COLOR}; --bg: #f3f4f6; --text: #1f2937; --card: #ffffff; }
      body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }
      .container { max-width: 1000px; margin: 0 auto; display: grid; gap: 20px; grid-template-columns: repeat(3, 1fr); }
      header { grid-column: 1 / -1; background: var(--card); border-radius: 24px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-content { flex: 1; }
      .header-photo img { width: 120px; height: 120px; border-radius: 30px; object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; font-weight: 800; letter-spacing: -1px; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 600; margin-top: 5px; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #f3f4f6; border-radius: 12px; text-decoration: none; color: var(--text); margin-right: 10px; font-weight: 500; transition: 0.2s; }
      .social-links a:hover { background: var(--p); color: #fff; }
      section { background: var(--card); border-radius: 24px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      section:nth-of-type(1) { grid-column: 1 / 3; } /* About */
      section:nth-of-type(2) { grid-column: 3 / 4; } /* Skills */
      section:nth-of-type(3) { grid-column: 1 / -1; } /* Experience */
      section:nth-of-type(4) { grid-column: 1 / -1; } /* Projects */
      section h2 { font-size: 1.5rem; margin-top: 0; display: flex; align-items: center; gap: 10px; }
      section h2::before { content: ''; width: 12px; height: 12px; background: var(--p); border-radius: 4px; display: inline-block; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: #f3f4f6; border-radius: 8px; margin: 0 8px 8px 0; font-weight: 500; }
      .timeline-item { padding: 20px; background: #f9fafb; border-radius: 16px; margin-bottom: 15px; border-left: 4px solid var(--p); }
      .timeline-dot { display: none; }
      .timeline-item h3 { margin: 0 0 5px 0; font-size: 1.2rem; } .company { color: var(--p); } .year { color: #6b7280; font-size: 0.9rem; margin-bottom: 10px; font-weight: 600; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
      .project-card { padding: 25px; background: #f9fafb; border-radius: 16px; border: 1px solid #e5e7eb; transition: 0.3s; }
      .project-card:hover { transform: translateY(-5px); border-color: var(--p); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
      .project-card h3 { margin-top: 0; }
      .project-card a { color: #fff; background: var(--text); padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 0.9rem; font-weight: 600; display: inline-block; margin-top: 10px; }
      footer { grid-column: 1 / -1; text-align: center; padding: 20px; color: #6b7280; }
      @media (max-width: 768px) { .container { grid-template-columns: 1fr; } section:nth-of-type(1), section:nth-of-type(2) { grid-column: 1 / -1; } .header-container { flex-direction: column-reverse; text-align: center; } }
    
 .social-links a { text-transform: uppercase; }`
  },
  bentox: {
    name: 'Bento Grid X',
    css: `
      :root { --p: {COLOR}; --bg: #f3f4f6; --text: #1f2937; --card: #ffffff; }
      body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }
      .container { max-width: 1000px; margin: 0 auto; display: grid; gap: 20px; grid-template-columns: repeat(3, 1fr); }
      header { grid-column: 1 / -1; background: var(--card); border-radius: 24px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-content { flex: 1; }
      .header-photo img { width: 120px; height: 120px; border-radius: 30px; object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; font-weight: 800; letter-spacing: -1px; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 600; margin-top: 5px; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #f3f4f6; border-radius: 20px; text-decoration: none; color: var(--text); margin-right: 10px; font-weight: 500; transition: 0.2s; }
      .social-links a:hover { background: var(--p); color: #fff; }
      section { background: var(--card); border-radius: 24px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      section:nth-of-type(1) { grid-column: 1 / 3; } /* About */
      section:nth-of-type(2) { grid-column: 3 / 4; } /* Skills */
      section:nth-of-type(3) { grid-column: 1 / -1; } /* Experience */
      section:nth-of-type(4) { grid-column: 1 / -1; } /* Projects */
      section h2 { font-size: 1.5rem; margin-top: 0; display: flex; align-items: center; gap: 10px; }
      section h2::before { content: ''; width: 12px; height: 12px; background: var(--p); border-radius: 4px; display: inline-block; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: #f3f4f6; border-radius: 16px; margin: 0 8px 8px 0; font-weight: 500; }
      .timeline-item { padding: 20px; background: #f9fafb; border-radius: 16px; margin-bottom: 15px; border-left: 4px solid var(--p); }
      .timeline-dot { display: none; }
      .timeline-item h3 { margin: 0 0 5px 0; font-size: 1.2rem; } .company { color: var(--p); } .year { color: #6b7280; font-size: 0.9rem; margin-bottom: 10px; font-weight: 600; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
      .project-card { padding: 25px; background: #f9fafb; border-radius: 16px; border: 1px solid #e5e7eb; transition: 0.3s; }
      .project-card:hover { transform: translateY(-5px); border-color: var(--p); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
      .project-card h3 { margin-top: 0; }
      .project-card a { color: #fff; background: var(--text); padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 0.9rem; font-weight: 600; display: inline-block; margin-top: 10px; }
      footer { grid-column: 1 / -1; text-align: center; padding: 20px; color: #6b7280; }
      @media (max-width: 768px) { .container { grid-template-columns: 1fr; } section:nth-of-type(1), section:nth-of-type(2) { grid-column: 1 / -1; } .header-container { flex-direction: column-reverse; text-align: center; } }
    
 header { text-align: left; }`
  },
  bentoprime: {
    name: 'Bento Grid Prime',
    css: `
      :root { --p: {COLOR}; --bg: #f3f4f6; --text: #1f2937; --card: #ffffff; }
      body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }
      .container { max-width: 1000px; margin: 0 auto; display: grid; gap: 20px; grid-template-columns: repeat(3, 1fr); }
      header { grid-column: 1 / -1; background: var(--card); border-radius: 24px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-content { flex: 1; }
      .header-photo img { width: 120px; height: 120px; border-radius: 30px; object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; font-weight: 800; letter-spacing: -1px; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 600; margin-top: 5px; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #f3f4f6; border-radius: 12px; text-decoration: none; color: var(--text); margin-right: 10px; font-weight: 500; transition: 0.2s; }
      .social-links a:hover { background: var(--p); color: #fff; }
      section { background: var(--card); border-radius: 24px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      section:nth-of-type(1) { grid-column: 1 / 3; } /* About */
      section:nth-of-type(2) { grid-column: 3 / 4; } /* Skills */
      section:nth-of-type(3) { grid-column: 1 / -1; } /* Experience */
      section:nth-of-type(4) { grid-column: 1 / -1; } /* Projects */
      section h2 { font-size: 1.5rem; margin-top: 0; display: flex; align-items: center; gap: 10px; }
      section h2::before { content: ''; width: 12px; height: 12px; background: var(--p); border-radius: 4px; display: inline-block; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: #f3f4f6; border-radius: 8px; margin: 0 8px 8px 0; font-weight: 500; }
      .timeline-item { padding: 20px; background: #f9fafb; border-radius: 16px; margin-bottom: 15px; border-left: 4px solid var(--p); }
      .timeline-dot { display: none; }
      .timeline-item h3 { margin: 0 0 5px 0; font-size: 1.2rem; } .company { color: var(--p); } .year { color: #6b7280; font-size: 0.9rem; margin-bottom: 10px; font-weight: 600; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
      .project-card { padding: 25px; background: #f9fafb; border-radius: 16px; border: 1px solid #e5e7eb; transition: 0.3s; }
      .project-card:hover { transform: translateY(-5px); border-color: var(--p); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
      .project-card h3 { margin-top: 0; }
      .project-card a { color: #fff; background: var(--text); padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 0.9rem; font-weight: 600; display: inline-block; margin-top: 10px; }
      footer { grid-column: 1 / -1; text-align: center; padding: 20px; color: #6b7280; }
      @media (max-width: 768px) { .container { grid-template-columns: 1fr; } section:nth-of-type(1), section:nth-of-type(2) { grid-column: 1 / -1; } .header-container { flex-direction: column-reverse; text-align: center; } }
    `
  },
  bentoneo: {
    name: 'Bento Grid Neo',
    css: `
      :root { --p: {COLOR}; --bg: #f3f4f6; --text: #1f2937; --card: #ffffff; }
      body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }
      .container { max-width: 1000px; margin: 0 auto; display: grid; gap: 20px; grid-template-columns: repeat(3, 1fr); }
      header { grid-column: 1 / -1; background: var(--card); border-radius: 24px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-content { flex: 1; }
      .header-photo img { width: 120px; height: 120px; border-radius: 30px; object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; font-weight: 800; letter-spacing: -1px; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 600; margin-top: 5px; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #f3f4f6; border-radius: 20px; text-decoration: none; color: var(--text); margin-right: 10px; font-weight: 500; transition: 0.2s; }
      .social-links a:hover { background: var(--p); color: #fff; }
      section { background: var(--card); border-radius: 24px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      section:nth-of-type(1) { grid-column: 1 / 3; } /* About */
      section:nth-of-type(2) { grid-column: 3 / 4; } /* Skills */
      section:nth-of-type(3) { grid-column: 1 / -1; } /* Experience */
      section:nth-of-type(4) { grid-column: 1 / -1; } /* Projects */
      section h2 { font-size: 1.5rem; margin-top: 0; display: flex; align-items: center; gap: 10px; }
      section h2::before { content: ''; width: 12px; height: 12px; background: var(--p); border-radius: 4px; display: inline-block; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: #f3f4f6; border-radius: 16px; margin: 0 8px 8px 0; font-weight: 500; }
      .timeline-item { padding: 20px; background: #f9fafb; border-radius: 16px; margin-bottom: 15px; border-left: 4px solid var(--p); }
      .timeline-dot { display: none; }
      .timeline-item h3 { margin: 0 0 5px 0; font-size: 1.2rem; } .company { color: var(--p); } .year { color: #6b7280; font-size: 0.9rem; margin-bottom: 10px; font-weight: 600; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
      .project-card { padding: 25px; background: #f9fafb; border-radius: 16px; border: 1px solid #e5e7eb; transition: 0.3s; }
      .project-card:hover { transform: translateY(-5px); border-color: var(--p); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
      .project-card h3 { margin-top: 0; }
      .project-card a { color: #fff; background: var(--text); padding: 8px 16px; border-radius: 8px; text-decoration: none; font-size: 0.9rem; font-weight: 600; display: inline-block; margin-top: 10px; }
      footer { grid-column: 1 / -1; text-align: center; padding: 20px; color: #6b7280; }
      @media (max-width: 768px) { .container { grid-template-columns: 1fr; } section:nth-of-type(1), section:nth-of-type(2) { grid-column: 1 / -1; } .header-container { flex-direction: column-reverse; text-align: center; } }
    
 body { font-size: 1.05rem; }`
  },
  glassmorphismpro: {
    name: 'Glass 3D Pro',
    css: `
      :root { --p: {COLOR}; --bg1: #e0c3fc; --bg2: #8ec5fc; --text: #1e1e24; }
      body { font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, var(--bg1) 0%, var(--bg2) 100%); color: var(--text); margin: 0; padding: 40px 20px; min-height: 100vh; background-attachment: fixed; }
      .container { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 30px; }
      .glass-panel { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); padding: 40px; }
      header { @extend .glass-panel; background: rgba(255, 255, 255, 0.35); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.6); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.1); }
      .title { color: var(--text); font-size: 1.3rem; font-weight: 600; margin-top: 5px; opacity: 0.8; }
      .social-links a { color: #fff; text-decoration: none; font-weight: 600; background: var(--p); padding: 8px 20px; border-radius: 30px; margin-right: 10px; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
      section { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(15px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); padding: 40px; }
      section h2 { margin-top: 0; font-size: 2rem; color: #fff; text-shadow: 0 2px 5px rgba(0,0,0,0.1); border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 10px; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: rgba(255,255,255,0.4); border-radius: 20px; margin: 0 8px 8px 0; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
      .timeline-item { padding: 20px; background: rgba(255,255,255,0.3); border-radius: 15px; margin-bottom: 20px; border-left: 5px solid var(--p); }
      .timeline-item h3 { margin: 0 0 5px; } .company { opacity: 0.8; } .year { color: var(--p); font-weight: 700; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; }
      .project-card { padding: 25px; background: rgba(255,255,255,0.3); border-radius: 15px; transition: transform 0.3s; }
      .project-card:hover { transform: translateY(-10px); background: rgba(255,255,255,0.5); }
      .project-card h3 { margin-top: 0; }
      .project-card a { color: #fff; background: var(--p); text-decoration: none; padding: 8px 20px; border-radius: 30px; font-weight: 600; display: inline-block; margin-top: 15px; }
      footer { text-align: center; color: rgba(0,0,0,0.5); font-weight: 600; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 2.5rem; } }
    
 header { text-align: left; }
 body { font-size: 1.05rem; }
 .social-links a { text-transform: uppercase; }`
  },
  glassmorphismelite: {
    name: 'Glass 3D Elite',
    css: `
      :root { --p: {COLOR}; --bg1: #e0c3fc; --bg2: #8ec5fc; --text: #1e1e24; }
      body { font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, var(--bg1) 0%, var(--bg2) 100%); color: var(--text); margin: 0; padding: 40px 20px; min-height: 100vh; background-attachment: fixed; }
      .container { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 30px; }
      .glass-panel { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); padding: 40px; }
      header { @extend .glass-panel; background: rgba(255, 255, 255, 0.35); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.6); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.1); }
      .title { color: var(--text); font-size: 1.3rem; font-weight: 600; margin-top: 5px; opacity: 0.8; }
      .social-links a { color: #fff; text-decoration: none; font-weight: 600; background: var(--p); padding: 8px 20px; border-radius: 30px; margin-right: 10px; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
      section { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(15px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); padding: 40px; }
      section h2 { margin-top: 0; font-size: 2rem; color: #fff; text-shadow: 0 2px 5px rgba(0,0,0,0.1); border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 10px; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: rgba(255,255,255,0.4); border-radius: 20px; margin: 0 8px 8px 0; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
      .timeline-item { padding: 20px; background: rgba(255,255,255,0.3); border-radius: 15px; margin-bottom: 20px; border-left: 5px solid var(--p); }
      .timeline-item h3 { margin: 0 0 5px; } .company { opacity: 0.8; } .year { color: var(--p); font-weight: 700; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; }
      .project-card { padding: 25px; background: rgba(255,255,255,0.3); border-radius: 15px; transition: transform 0.3s; }
      .project-card:hover { transform: translateY(-10px); background: rgba(255,255,255,0.5); }
      .project-card h3 { margin-top: 0; }
      .project-card a { color: #fff; background: var(--p); text-decoration: none; padding: 8px 20px; border-radius: 30px; font-weight: 600; display: inline-block; margin-top: 15px; }
      footer { text-align: center; color: rgba(0,0,0,0.5); font-weight: 600; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 2.5rem; } }
    `
  },
  glassmorphismplus: {
    name: 'Glass 3D Plus',
    css: `
      :root { --p: {COLOR}; --bg1: #e0c3fc; --bg2: #8ec5fc; --text: #1e1e24; }
      body { font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, var(--bg1) 0%, var(--bg2) 100%); color: var(--text); margin: 0; padding: 40px 20px; min-height: 100vh; background-attachment: fixed; }
      .container { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 30px; }
      .glass-panel { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); padding: 40px; }
      header { @extend .glass-panel; background: rgba(255, 255, 255, 0.35); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.6); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.1); }
      .title { color: var(--text); font-size: 1.3rem; font-weight: 600; margin-top: 5px; opacity: 0.8; }
      .social-links a { color: #fff; text-decoration: none; font-weight: 600; background: var(--p); padding: 8px 20px; border-radius: 30px; margin-right: 10px; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
      section { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(15px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); padding: 40px; }
      section h2 { margin-top: 0; font-size: 2rem; color: #fff; text-shadow: 0 2px 5px rgba(0,0,0,0.1); border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 10px; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: rgba(255,255,255,0.4); border-radius: 20px; margin: 0 8px 8px 0; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
      .timeline-item { padding: 20px; background: rgba(255,255,255,0.3); border-radius: 15px; margin-bottom: 20px; border-left: 5px solid var(--p); }
      .timeline-item h3 { margin: 0 0 5px; } .company { opacity: 0.8; } .year { color: var(--p); font-weight: 700; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; }
      .project-card { padding: 25px; background: rgba(255,255,255,0.3); border-radius: 15px; transition: transform 0.3s; }
      .project-card:hover { transform: translateY(-10px); background: rgba(255,255,255,0.5); }
      .project-card h3 { margin-top: 0; }
      .project-card a { color: #fff; background: var(--p); text-decoration: none; padding: 8px 20px; border-radius: 30px; font-weight: 600; display: inline-block; margin-top: 15px; }
      footer { text-align: center; color: rgba(0,0,0,0.5); font-weight: 600; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 2.5rem; } }
    `
  },
  glassmorphismultra: {
    name: 'Glass 3D Ultra',
    css: `
      :root { --p: {COLOR}; --bg1: #e0c3fc; --bg2: #8ec5fc; --text: #1e1e24; }
      body { font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, var(--bg1) 0%, var(--bg2) 100%); color: var(--text); margin: 0; padding: 40px 20px; min-height: 100vh; background-attachment: fixed; }
      .container { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 30px; }
      .glass-panel { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); padding: 40px; }
      header { @extend .glass-panel; background: rgba(255, 255, 255, 0.35); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.6); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.1); }
      .title { color: var(--text); font-size: 1.3rem; font-weight: 600; margin-top: 5px; opacity: 0.8; }
      .social-links a { color: #fff; text-decoration: none; font-weight: 600; background: var(--p); padding: 8px 20px; border-radius: 30px; margin-right: 10px; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
      section { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(15px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); padding: 40px; }
      section h2 { margin-top: 0; font-size: 2rem; color: #fff; text-shadow: 0 2px 5px rgba(0,0,0,0.1); border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 10px; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: rgba(255,255,255,0.4); border-radius: 20px; margin: 0 8px 8px 0; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
      .timeline-item { padding: 20px; background: rgba(255,255,255,0.3); border-radius: 15px; margin-bottom: 20px; border-left: 5px solid var(--p); }
      .timeline-item h3 { margin: 0 0 5px; } .company { opacity: 0.8; } .year { color: var(--p); font-weight: 700; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; }
      .project-card { padding: 25px; background: rgba(255,255,255,0.3); border-radius: 15px; transition: transform 0.3s; }
      .project-card:hover { transform: translateY(-10px); background: rgba(255,255,255,0.5); }
      .project-card h3 { margin-top: 0; }
      .project-card a { color: #fff; background: var(--p); text-decoration: none; padding: 8px 20px; border-radius: 30px; font-weight: 600; display: inline-block; margin-top: 15px; }
      footer { text-align: center; color: rgba(0,0,0,0.5); font-weight: 600; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 2.5rem; } }
    
 header { text-align: left; }`
  },
  glassmorphismmax: {
    name: 'Glass 3D Max',
    css: `
      :root { --p: {COLOR}; --bg1: #e0c3fc; --bg2: #8ec5fc; --text: #1e1e24; }
      body { font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, var(--bg1) 0%, var(--bg2) 100%); color: var(--text); margin: 0; padding: 40px 20px; min-height: 100vh; background-attachment: fixed; }
      .container { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 30px; }
      .glass-panel { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); padding: 40px; }
      header { @extend .glass-panel; background: rgba(255, 255, 255, 0.35); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.6); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.1); }
      .title { color: var(--text); font-size: 1.3rem; font-weight: 600; margin-top: 5px; opacity: 0.8; }
      .social-links a { color: #fff; text-decoration: none; font-weight: 600; background: var(--p); padding: 8px 20px; border-radius: 30px; margin-right: 10px; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
      section { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(15px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); padding: 40px; }
      section h2 { margin-top: 0; font-size: 2rem; color: #fff; text-shadow: 0 2px 5px rgba(0,0,0,0.1); border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 10px; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: rgba(255,255,255,0.4); border-radius: 20px; margin: 0 8px 8px 0; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
      .timeline-item { padding: 20px; background: rgba(255,255,255,0.3); border-radius: 15px; margin-bottom: 20px; border-left: 5px solid var(--p); }
      .timeline-item h3 { margin: 0 0 5px; } .company { opacity: 0.8; } .year { color: var(--p); font-weight: 700; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; }
      .project-card { padding: 25px; background: rgba(255,255,255,0.3); border-radius: 15px; transition: transform 0.3s; }
      .project-card:hover { transform: translateY(-10px); background: rgba(255,255,255,0.5); }
      .project-card h3 { margin-top: 0; }
      .project-card a { color: #fff; background: var(--p); text-decoration: none; padding: 8px 20px; border-radius: 30px; font-weight: 600; display: inline-block; margin-top: 15px; }
      footer { text-align: center; color: rgba(0,0,0,0.5); font-weight: 600; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 2.5rem; } }
    
 body { font-size: 1.05rem; }`
  },
  glassmorphismlite: {
    name: 'Glass 3D Lite',
    css: `
      :root { --p: {COLOR}; --bg1: #e0c3fc; --bg2: #8ec5fc; --text: #1e1e24; }
      body { font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, var(--bg1) 0%, var(--bg2) 100%); color: var(--text); margin: 0; padding: 40px 20px; min-height: 100vh; background-attachment: fixed; }
      .container { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 30px; }
      .glass-panel { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); padding: 40px; }
      header { @extend .glass-panel; background: rgba(255, 255, 255, 0.35); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.6); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.1); }
      .title { color: var(--text); font-size: 1.3rem; font-weight: 600; margin-top: 5px; opacity: 0.8; }
      .social-links a { color: #fff; text-decoration: none; font-weight: 600; background: var(--p); padding: 8px 20px; border-radius: 30px; margin-right: 10px; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
      section { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(15px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); padding: 40px; }
      section h2 { margin-top: 0; font-size: 2rem; color: #fff; text-shadow: 0 2px 5px rgba(0,0,0,0.1); border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 10px; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: rgba(255,255,255,0.4); border-radius: 20px; margin: 0 8px 8px 0; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
      .timeline-item { padding: 20px; background: rgba(255,255,255,0.3); border-radius: 15px; margin-bottom: 20px; border-left: 5px solid var(--p); }
      .timeline-item h3 { margin: 0 0 5px; } .company { opacity: 0.8; } .year { color: var(--p); font-weight: 700; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; }
      .project-card { padding: 25px; background: rgba(255,255,255,0.3); border-radius: 15px; transition: transform 0.3s; }
      .project-card:hover { transform: translateY(-10px); background: rgba(255,255,255,0.5); }
      .project-card h3 { margin-top: 0; }
      .project-card a { color: #fff; background: var(--p); text-decoration: none; padding: 8px 20px; border-radius: 30px; font-weight: 600; display: inline-block; margin-top: 15px; }
      footer { text-align: center; color: rgba(0,0,0,0.5); font-weight: 600; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 2.5rem; } }
    
 .social-links a { text-transform: uppercase; }`
  },
  glassmorphismx: {
    name: 'Glass 3D X',
    css: `
      :root { --p: {COLOR}; --bg1: #e0c3fc; --bg2: #8ec5fc; --text: #1e1e24; }
      body { font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, var(--bg1) 0%, var(--bg2) 100%); color: var(--text); margin: 0; padding: 40px 20px; min-height: 100vh; background-attachment: fixed; }
      .container { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 30px; }
      .glass-panel { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); padding: 40px; }
      header { @extend .glass-panel; background: rgba(255, 255, 255, 0.35); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.6); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.1); }
      .title { color: var(--text); font-size: 1.3rem; font-weight: 600; margin-top: 5px; opacity: 0.8; }
      .social-links a { color: #fff; text-decoration: none; font-weight: 600; background: var(--p); padding: 8px 20px; border-radius: 30px; margin-right: 10px; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
      section { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(15px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); padding: 40px; }
      section h2 { margin-top: 0; font-size: 2rem; color: #fff; text-shadow: 0 2px 5px rgba(0,0,0,0.1); border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 10px; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: rgba(255,255,255,0.4); border-radius: 20px; margin: 0 8px 8px 0; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
      .timeline-item { padding: 20px; background: rgba(255,255,255,0.3); border-radius: 15px; margin-bottom: 20px; border-left: 5px solid var(--p); }
      .timeline-item h3 { margin: 0 0 5px; } .company { opacity: 0.8; } .year { color: var(--p); font-weight: 700; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; }
      .project-card { padding: 25px; background: rgba(255,255,255,0.3); border-radius: 15px; transition: transform 0.3s; }
      .project-card:hover { transform: translateY(-10px); background: rgba(255,255,255,0.5); }
      .project-card h3 { margin-top: 0; }
      .project-card a { color: #fff; background: var(--p); text-decoration: none; padding: 8px 20px; border-radius: 30px; font-weight: 600; display: inline-block; margin-top: 15px; }
      footer { text-align: center; color: rgba(0,0,0,0.5); font-weight: 600; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 2.5rem; } }
    
 header { text-align: left; }`
  },
  glassmorphismprime: {
    name: 'Glass 3D Prime',
    css: `
      :root { --p: {COLOR}; --bg1: #e0c3fc; --bg2: #8ec5fc; --text: #1e1e24; }
      body { font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, var(--bg1) 0%, var(--bg2) 100%); color: var(--text); margin: 0; padding: 40px 20px; min-height: 100vh; background-attachment: fixed; }
      .container { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 30px; }
      .glass-panel { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); padding: 40px; }
      header { @extend .glass-panel; background: rgba(255, 255, 255, 0.35); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.6); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.1); }
      .title { color: var(--text); font-size: 1.3rem; font-weight: 600; margin-top: 5px; opacity: 0.8; }
      .social-links a { color: #fff; text-decoration: none; font-weight: 600; background: var(--p); padding: 8px 20px; border-radius: 30px; margin-right: 10px; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
      section { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(15px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); padding: 40px; }
      section h2 { margin-top: 0; font-size: 2rem; color: #fff; text-shadow: 0 2px 5px rgba(0,0,0,0.1); border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 10px; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: rgba(255,255,255,0.4); border-radius: 20px; margin: 0 8px 8px 0; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
      .timeline-item { padding: 20px; background: rgba(255,255,255,0.3); border-radius: 15px; margin-bottom: 20px; border-left: 5px solid var(--p); }
      .timeline-item h3 { margin: 0 0 5px; } .company { opacity: 0.8; } .year { color: var(--p); font-weight: 700; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; }
      .project-card { padding: 25px; background: rgba(255,255,255,0.3); border-radius: 15px; transition: transform 0.3s; }
      .project-card:hover { transform: translateY(-10px); background: rgba(255,255,255,0.5); }
      .project-card h3 { margin-top: 0; }
      .project-card a { color: #fff; background: var(--p); text-decoration: none; padding: 8px 20px; border-radius: 30px; font-weight: 600; display: inline-block; margin-top: 15px; }
      footer { text-align: center; color: rgba(0,0,0,0.5); font-weight: 600; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 2.5rem; } }
    `
  },
  glassmorphismneo: {
    name: 'Glass 3D Neo',
    css: `
      :root { --p: {COLOR}; --bg1: #e0c3fc; --bg2: #8ec5fc; --text: #1e1e24; }
      body { font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, var(--bg1) 0%, var(--bg2) 100%); color: var(--text); margin: 0; padding: 40px 20px; min-height: 100vh; background-attachment: fixed; }
      .container { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 30px; }
      .glass-panel { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); padding: 40px; }
      header { @extend .glass-panel; background: rgba(255, 255, 255, 0.35); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.6); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; color: #fff; text-shadow: 0 2px 10px rgba(0,0,0,0.1); }
      .title { color: var(--text); font-size: 1.3rem; font-weight: 600; margin-top: 5px; opacity: 0.8; }
      .social-links a { color: #fff; text-decoration: none; font-weight: 600; background: var(--p); padding: 8px 20px; border-radius: 30px; margin-right: 10px; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
      section { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(15px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); padding: 40px; }
      section h2 { margin-top: 0; font-size: 2rem; color: #fff; text-shadow: 0 2px 5px rgba(0,0,0,0.1); border-bottom: 2px solid rgba(255,255,255,0.3); padding-bottom: 10px; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: rgba(255,255,255,0.4); border-radius: 20px; margin: 0 8px 8px 0; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
      .timeline-item { padding: 20px; background: rgba(255,255,255,0.3); border-radius: 15px; margin-bottom: 20px; border-left: 5px solid var(--p); }
      .timeline-item h3 { margin: 0 0 5px; } .company { opacity: 0.8; } .year { color: var(--p); font-weight: 700; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; }
      .project-card { padding: 25px; background: rgba(255,255,255,0.3); border-radius: 15px; transition: transform 0.3s; }
      .project-card:hover { transform: translateY(-10px); background: rgba(255,255,255,0.5); }
      .project-card h3 { margin-top: 0; }
      .project-card a { color: #fff; background: var(--p); text-decoration: none; padding: 8px 20px; border-radius: 30px; font-weight: 600; display: inline-block; margin-top: 15px; }
      footer { text-align: center; color: rgba(0,0,0,0.5); font-weight: 600; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 2.5rem; } }
    
 body { font-size: 1.05rem; }`
  },
  neumorphismpro: {
    name: 'Soft 3D Pro',
    css: `
      :root { --p: {COLOR}; --bg: #e0e5ec; --text: #4a5568; --shadow-light: #ffffff; --shadow-dark: #a3b1c6; }
      body { font-family: 'Nunito', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; }
      .container { max-width: 850px; margin: 0 auto; }
      .neu-box { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 40px; margin-bottom: 40px; }
      header { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 50px; margin-bottom: 40px; text-align: center; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 20px; }
      .header-photo img { width: 150px; height: 150px; border-radius: 50%; box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); border: 5px solid var(--bg); object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; color: #2d3748; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 700; margin-top: 10px; }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 12px 24px; border-radius: 30px; background: var(--bg); box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); color: var(--p); text-decoration: none; font-weight: bold; margin: 0 10px; transition: 0.2s; }
      .social-links a:active { box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); }
      section { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 40px; margin-bottom: 40px; }
      section h2 { margin-top: 0; font-size: 1.8rem; color: #2d3748; display: inline-block; padding: 10px 20px; border-radius: 15px; box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); margin-bottom: 30px; }
      .skill-tag { display: inline-block; padding: 10px 20px; border-radius: 30px; background: var(--bg); box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); margin: 0 10px 15px 0; font-weight: 600; color: var(--p); }
      .timeline-item { padding: 25px; border-radius: 15px; background: var(--bg); box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); margin-bottom: 25px; }
      .timeline-item h3 { margin: 0 0 5px; color: #2d3748; } .company { color: var(--p); } .year { font-weight: bold; color: #718096; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 30px; }
      .project-card { padding: 30px; border-radius: 20px; background: var(--bg); box-shadow: 7px 7px 15px var(--shadow-dark), -7px -7px 15px var(--shadow-light); }
      .project-card h3 { margin-top: 0; color: #2d3748; }
      .project-card a { display: inline-block; padding: 10px 20px; border-radius: 20px; background: var(--bg); box-shadow: 4px 4px 8px var(--shadow-dark), -4px -4px 8px var(--shadow-light); color: var(--p); text-decoration: none; font-weight: bold; margin-top: 20px; }
      footer { text-align: center; font-weight: bold; color: #a0aec0; }
    
 header { text-align: left; }
 body { font-size: 1.05rem; }
 .social-links a { text-transform: uppercase; }`
  },
  neumorphismelite: {
    name: 'Soft 3D Elite',
    css: `
      :root { --p: {COLOR}; --bg: #e0e5ec; --text: #4a5568; --shadow-light: #ffffff; --shadow-dark: #a3b1c6; }
      body { font-family: 'Nunito', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; }
      .container { max-width: 850px; margin: 0 auto; }
      .neu-box { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 40px; margin-bottom: 40px; }
      header { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 50px; margin-bottom: 40px; text-align: center; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 20px; }
      .header-photo img { width: 150px; height: 150px; border-radius: 50%; box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); border: 5px solid var(--bg); object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; color: #2d3748; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 700; margin-top: 10px; }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 12px 24px; border-radius: 30px; background: var(--bg); box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); color: var(--p); text-decoration: none; font-weight: bold; margin: 0 10px; transition: 0.2s; }
      .social-links a:active { box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); }
      section { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 40px; margin-bottom: 40px; }
      section h2 { margin-top: 0; font-size: 1.8rem; color: #2d3748; display: inline-block; padding: 10px 20px; border-radius: 15px; box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); margin-bottom: 30px; }
      .skill-tag { display: inline-block; padding: 10px 20px; border-radius: 30px; background: var(--bg); box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); margin: 0 10px 15px 0; font-weight: 600; color: var(--p); }
      .timeline-item { padding: 25px; border-radius: 15px; background: var(--bg); box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); margin-bottom: 25px; }
      .timeline-item h3 { margin: 0 0 5px; color: #2d3748; } .company { color: var(--p); } .year { font-weight: bold; color: #718096; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 30px; }
      .project-card { padding: 30px; border-radius: 20px; background: var(--bg); box-shadow: 7px 7px 15px var(--shadow-dark), -7px -7px 15px var(--shadow-light); }
      .project-card h3 { margin-top: 0; color: #2d3748; }
      .project-card a { display: inline-block; padding: 10px 20px; border-radius: 20px; background: var(--bg); box-shadow: 4px 4px 8px var(--shadow-dark), -4px -4px 8px var(--shadow-light); color: var(--p); text-decoration: none; font-weight: bold; margin-top: 20px; }
      footer { text-align: center; font-weight: bold; color: #a0aec0; }
    `
  },
  neumorphismplus: {
    name: 'Soft 3D Plus',
    css: `
      :root { --p: {COLOR}; --bg: #e0e5ec; --text: #4a5568; --shadow-light: #ffffff; --shadow-dark: #a3b1c6; }
      body { font-family: 'Nunito', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; }
      .container { max-width: 850px; margin: 0 auto; }
      .neu-box { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 40px; margin-bottom: 40px; }
      header { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 50px; margin-bottom: 40px; text-align: center; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 20px; }
      .header-photo img { width: 150px; height: 150px; border-radius: 50%; box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); border: 5px solid var(--bg); object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; color: #2d3748; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 700; margin-top: 10px; }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 12px 24px; border-radius: 30px; background: var(--bg); box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); color: var(--p); text-decoration: none; font-weight: bold; margin: 0 10px; transition: 0.2s; }
      .social-links a:active { box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); }
      section { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 40px; margin-bottom: 40px; }
      section h2 { margin-top: 0; font-size: 1.8rem; color: #2d3748; display: inline-block; padding: 10px 20px; border-radius: 15px; box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); margin-bottom: 30px; }
      .skill-tag { display: inline-block; padding: 10px 20px; border-radius: 30px; background: var(--bg); box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); margin: 0 10px 15px 0; font-weight: 600; color: var(--p); }
      .timeline-item { padding: 25px; border-radius: 15px; background: var(--bg); box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); margin-bottom: 25px; }
      .timeline-item h3 { margin: 0 0 5px; color: #2d3748; } .company { color: var(--p); } .year { font-weight: bold; color: #718096; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 30px; }
      .project-card { padding: 30px; border-radius: 20px; background: var(--bg); box-shadow: 7px 7px 15px var(--shadow-dark), -7px -7px 15px var(--shadow-light); }
      .project-card h3 { margin-top: 0; color: #2d3748; }
      .project-card a { display: inline-block; padding: 10px 20px; border-radius: 20px; background: var(--bg); box-shadow: 4px 4px 8px var(--shadow-dark), -4px -4px 8px var(--shadow-light); color: var(--p); text-decoration: none; font-weight: bold; margin-top: 20px; }
      footer { text-align: center; font-weight: bold; color: #a0aec0; }
    `
  },
  neumorphismultra: {
    name: 'Soft 3D Ultra',
    css: `
      :root { --p: {COLOR}; --bg: #e0e5ec; --text: #4a5568; --shadow-light: #ffffff; --shadow-dark: #a3b1c6; }
      body { font-family: 'Nunito', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; }
      .container { max-width: 850px; margin: 0 auto; }
      .neu-box { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 40px; margin-bottom: 40px; }
      header { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 50px; margin-bottom: 40px; text-align: center; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 20px; }
      .header-photo img { width: 150px; height: 150px; border-radius: 50%; box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); border: 5px solid var(--bg); object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; color: #2d3748; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 700; margin-top: 10px; }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 12px 24px; border-radius: 30px; background: var(--bg); box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); color: var(--p); text-decoration: none; font-weight: bold; margin: 0 10px; transition: 0.2s; }
      .social-links a:active { box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); }
      section { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 40px; margin-bottom: 40px; }
      section h2 { margin-top: 0; font-size: 1.8rem; color: #2d3748; display: inline-block; padding: 10px 20px; border-radius: 15px; box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); margin-bottom: 30px; }
      .skill-tag { display: inline-block; padding: 10px 20px; border-radius: 30px; background: var(--bg); box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); margin: 0 10px 15px 0; font-weight: 600; color: var(--p); }
      .timeline-item { padding: 25px; border-radius: 15px; background: var(--bg); box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); margin-bottom: 25px; }
      .timeline-item h3 { margin: 0 0 5px; color: #2d3748; } .company { color: var(--p); } .year { font-weight: bold; color: #718096; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 30px; }
      .project-card { padding: 30px; border-radius: 20px; background: var(--bg); box-shadow: 7px 7px 15px var(--shadow-dark), -7px -7px 15px var(--shadow-light); }
      .project-card h3 { margin-top: 0; color: #2d3748; }
      .project-card a { display: inline-block; padding: 10px 20px; border-radius: 20px; background: var(--bg); box-shadow: 4px 4px 8px var(--shadow-dark), -4px -4px 8px var(--shadow-light); color: var(--p); text-decoration: none; font-weight: bold; margin-top: 20px; }
      footer { text-align: center; font-weight: bold; color: #a0aec0; }
    
 header { text-align: left; }`
  },
  neumorphismmax: {
    name: 'Soft 3D Max',
    css: `
      :root { --p: {COLOR}; --bg: #e0e5ec; --text: #4a5568; --shadow-light: #ffffff; --shadow-dark: #a3b1c6; }
      body { font-family: 'Nunito', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; }
      .container { max-width: 850px; margin: 0 auto; }
      .neu-box { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 40px; margin-bottom: 40px; }
      header { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 50px; margin-bottom: 40px; text-align: center; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 20px; }
      .header-photo img { width: 150px; height: 150px; border-radius: 50%; box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); border: 5px solid var(--bg); object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; color: #2d3748; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 700; margin-top: 10px; }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 12px 24px; border-radius: 30px; background: var(--bg); box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); color: var(--p); text-decoration: none; font-weight: bold; margin: 0 10px; transition: 0.2s; }
      .social-links a:active { box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); }
      section { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 40px; margin-bottom: 40px; }
      section h2 { margin-top: 0; font-size: 1.8rem; color: #2d3748; display: inline-block; padding: 10px 20px; border-radius: 15px; box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); margin-bottom: 30px; }
      .skill-tag { display: inline-block; padding: 10px 20px; border-radius: 30px; background: var(--bg); box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); margin: 0 10px 15px 0; font-weight: 600; color: var(--p); }
      .timeline-item { padding: 25px; border-radius: 15px; background: var(--bg); box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); margin-bottom: 25px; }
      .timeline-item h3 { margin: 0 0 5px; color: #2d3748; } .company { color: var(--p); } .year { font-weight: bold; color: #718096; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 30px; }
      .project-card { padding: 30px; border-radius: 20px; background: var(--bg); box-shadow: 7px 7px 15px var(--shadow-dark), -7px -7px 15px var(--shadow-light); }
      .project-card h3 { margin-top: 0; color: #2d3748; }
      .project-card a { display: inline-block; padding: 10px 20px; border-radius: 20px; background: var(--bg); box-shadow: 4px 4px 8px var(--shadow-dark), -4px -4px 8px var(--shadow-light); color: var(--p); text-decoration: none; font-weight: bold; margin-top: 20px; }
      footer { text-align: center; font-weight: bold; color: #a0aec0; }
    
 body { font-size: 1.05rem; }`
  },
  neumorphismlite: {
    name: 'Soft 3D Lite',
    css: `
      :root { --p: {COLOR}; --bg: #e0e5ec; --text: #4a5568; --shadow-light: #ffffff; --shadow-dark: #a3b1c6; }
      body { font-family: 'Nunito', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; }
      .container { max-width: 850px; margin: 0 auto; }
      .neu-box { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 40px; margin-bottom: 40px; }
      header { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 50px; margin-bottom: 40px; text-align: center; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 20px; }
      .header-photo img { width: 150px; height: 150px; border-radius: 50%; box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); border: 5px solid var(--bg); object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; color: #2d3748; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 700; margin-top: 10px; }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 12px 24px; border-radius: 30px; background: var(--bg); box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); color: var(--p); text-decoration: none; font-weight: bold; margin: 0 10px; transition: 0.2s; }
      .social-links a:active { box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); }
      section { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 40px; margin-bottom: 40px; }
      section h2 { margin-top: 0; font-size: 1.8rem; color: #2d3748; display: inline-block; padding: 10px 20px; border-radius: 15px; box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); margin-bottom: 30px; }
      .skill-tag { display: inline-block; padding: 10px 20px; border-radius: 30px; background: var(--bg); box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); margin: 0 10px 15px 0; font-weight: 600; color: var(--p); }
      .timeline-item { padding: 25px; border-radius: 15px; background: var(--bg); box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); margin-bottom: 25px; }
      .timeline-item h3 { margin: 0 0 5px; color: #2d3748; } .company { color: var(--p); } .year { font-weight: bold; color: #718096; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 30px; }
      .project-card { padding: 30px; border-radius: 20px; background: var(--bg); box-shadow: 7px 7px 15px var(--shadow-dark), -7px -7px 15px var(--shadow-light); }
      .project-card h3 { margin-top: 0; color: #2d3748; }
      .project-card a { display: inline-block; padding: 10px 20px; border-radius: 20px; background: var(--bg); box-shadow: 4px 4px 8px var(--shadow-dark), -4px -4px 8px var(--shadow-light); color: var(--p); text-decoration: none; font-weight: bold; margin-top: 20px; }
      footer { text-align: center; font-weight: bold; color: #a0aec0; }
    
 .social-links a { text-transform: uppercase; }`
  },
  neumorphismx: {
    name: 'Soft 3D X',
    css: `
      :root { --p: {COLOR}; --bg: #e0e5ec; --text: #4a5568; --shadow-light: #ffffff; --shadow-dark: #a3b1c6; }
      body { font-family: 'Nunito', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; }
      .container { max-width: 850px; margin: 0 auto; }
      .neu-box { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 40px; margin-bottom: 40px; }
      header { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 50px; margin-bottom: 40px; text-align: center; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 20px; }
      .header-photo img { width: 150px; height: 150px; border-radius: 50%; box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); border: 5px solid var(--bg); object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; color: #2d3748; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 700; margin-top: 10px; }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 12px 24px; border-radius: 30px; background: var(--bg); box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); color: var(--p); text-decoration: none; font-weight: bold; margin: 0 10px; transition: 0.2s; }
      .social-links a:active { box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); }
      section { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 40px; margin-bottom: 40px; }
      section h2 { margin-top: 0; font-size: 1.8rem; color: #2d3748; display: inline-block; padding: 10px 20px; border-radius: 15px; box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); margin-bottom: 30px; }
      .skill-tag { display: inline-block; padding: 10px 20px; border-radius: 30px; background: var(--bg); box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); margin: 0 10px 15px 0; font-weight: 600; color: var(--p); }
      .timeline-item { padding: 25px; border-radius: 15px; background: var(--bg); box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); margin-bottom: 25px; }
      .timeline-item h3 { margin: 0 0 5px; color: #2d3748; } .company { color: var(--p); } .year { font-weight: bold; color: #718096; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 30px; }
      .project-card { padding: 30px; border-radius: 20px; background: var(--bg); box-shadow: 7px 7px 15px var(--shadow-dark), -7px -7px 15px var(--shadow-light); }
      .project-card h3 { margin-top: 0; color: #2d3748; }
      .project-card a { display: inline-block; padding: 10px 20px; border-radius: 20px; background: var(--bg); box-shadow: 4px 4px 8px var(--shadow-dark), -4px -4px 8px var(--shadow-light); color: var(--p); text-decoration: none; font-weight: bold; margin-top: 20px; }
      footer { text-align: center; font-weight: bold; color: #a0aec0; }
    
 header { text-align: left; }`
  },
  neumorphismprime: {
    name: 'Soft 3D Prime',
    css: `
      :root { --p: {COLOR}; --bg: #e0e5ec; --text: #4a5568; --shadow-light: #ffffff; --shadow-dark: #a3b1c6; }
      body { font-family: 'Nunito', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; }
      .container { max-width: 850px; margin: 0 auto; }
      .neu-box { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 40px; margin-bottom: 40px; }
      header { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 50px; margin-bottom: 40px; text-align: center; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 20px; }
      .header-photo img { width: 150px; height: 150px; border-radius: 50%; box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); border: 5px solid var(--bg); object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; color: #2d3748; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 700; margin-top: 10px; }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 12px 24px; border-radius: 30px; background: var(--bg); box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); color: var(--p); text-decoration: none; font-weight: bold; margin: 0 10px; transition: 0.2s; }
      .social-links a:active { box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); }
      section { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 40px; margin-bottom: 40px; }
      section h2 { margin-top: 0; font-size: 1.8rem; color: #2d3748; display: inline-block; padding: 10px 20px; border-radius: 15px; box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); margin-bottom: 30px; }
      .skill-tag { display: inline-block; padding: 10px 20px; border-radius: 30px; background: var(--bg); box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); margin: 0 10px 15px 0; font-weight: 600; color: var(--p); }
      .timeline-item { padding: 25px; border-radius: 15px; background: var(--bg); box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); margin-bottom: 25px; }
      .timeline-item h3 { margin: 0 0 5px; color: #2d3748; } .company { color: var(--p); } .year { font-weight: bold; color: #718096; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 30px; }
      .project-card { padding: 30px; border-radius: 20px; background: var(--bg); box-shadow: 7px 7px 15px var(--shadow-dark), -7px -7px 15px var(--shadow-light); }
      .project-card h3 { margin-top: 0; color: #2d3748; }
      .project-card a { display: inline-block; padding: 10px 20px; border-radius: 20px; background: var(--bg); box-shadow: 4px 4px 8px var(--shadow-dark), -4px -4px 8px var(--shadow-light); color: var(--p); text-decoration: none; font-weight: bold; margin-top: 20px; }
      footer { text-align: center; font-weight: bold; color: #a0aec0; }
    `
  },
  neumorphismneo: {
    name: 'Soft 3D Neo',
    css: `
      :root { --p: {COLOR}; --bg: #e0e5ec; --text: #4a5568; --shadow-light: #ffffff; --shadow-dark: #a3b1c6; }
      body { font-family: 'Nunito', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; }
      .container { max-width: 850px; margin: 0 auto; }
      .neu-box { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 40px; margin-bottom: 40px; }
      header { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 50px; margin-bottom: 40px; text-align: center; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 20px; }
      .header-photo img { width: 150px; height: 150px; border-radius: 50%; box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); border: 5px solid var(--bg); object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; color: #2d3748; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 700; margin-top: 10px; }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 12px 24px; border-radius: 30px; background: var(--bg); box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); color: var(--p); text-decoration: none; font-weight: bold; margin: 0 10px; transition: 0.2s; }
      .social-links a:active { box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); }
      section { background: var(--bg); border-radius: 20px; box-shadow: 9px 9px 16px var(--shadow-dark), -9px -9px 16px var(--shadow-light); padding: 40px; margin-bottom: 40px; }
      section h2 { margin-top: 0; font-size: 1.8rem; color: #2d3748; display: inline-block; padding: 10px 20px; border-radius: 15px; box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); margin-bottom: 30px; }
      .skill-tag { display: inline-block; padding: 10px 20px; border-radius: 30px; background: var(--bg); box-shadow: 5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light); margin: 0 10px 15px 0; font-weight: 600; color: var(--p); }
      .timeline-item { padding: 25px; border-radius: 15px; background: var(--bg); box-shadow: inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light); margin-bottom: 25px; }
      .timeline-item h3 { margin: 0 0 5px; color: #2d3748; } .company { color: var(--p); } .year { font-weight: bold; color: #718096; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 30px; }
      .project-card { padding: 30px; border-radius: 20px; background: var(--bg); box-shadow: 7px 7px 15px var(--shadow-dark), -7px -7px 15px var(--shadow-light); }
      .project-card h3 { margin-top: 0; color: #2d3748; }
      .project-card a { display: inline-block; padding: 10px 20px; border-radius: 20px; background: var(--bg); box-shadow: 4px 4px 8px var(--shadow-dark), -4px -4px 8px var(--shadow-light); color: var(--p); text-decoration: none; font-weight: bold; margin-top: 20px; }
      footer { text-align: center; font-weight: bold; color: #a0aec0; }
    
 body { font-size: 1.05rem; }`
  },
  brutalismpro: {
    name: 'Brutalism Pro',
    css: `
      :root { --p: {COLOR}; --bg: #ffffff; --text: #000000; }
      body { font-family: 'Space Grotesk', 'Courier New', monospace; background: var(--bg); color: var(--text); margin: 0; border: 15px solid var(--text); min-height: 100vh; box-sizing: border-box; }
      .container { max-width: 1000px; margin: 0 auto; padding: 0; }
      header { background: var(--p); color: #fff; padding: 60px 40px; border-bottom: 10px solid var(--text); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
      .header-photo img { width: 160px; height: 160px; object-fit: cover; border: 6px solid var(--text); box-shadow: 10px 10px 0 var(--text); }
      h1 { font-size: 4.5rem; margin: 0; text-transform: uppercase; line-height: 1; letter-spacing: -2px; }
      .title { font-size: 1.5rem; background: var(--text); color: #fff; display: inline-block; padding: 5px 15px; margin-top: 20px; text-transform: uppercase; font-weight: bold; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; color: var(--text); border: 3px solid var(--text); text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 20px; margin-right: 15px; box-shadow: 4px 4px 0 var(--text); transition: 0.1s; }
      .social-links a:hover { transform: translate(4px, 4px); box-shadow: 0 0 0 var(--text); }
      section { padding: 60px 40px; border-bottom: 10px solid var(--text); }
      section h2 { font-size: 3rem; text-transform: uppercase; margin-top: 0; margin-bottom: 40px; display: inline-block; background: var(--p); color: #fff; padding: 0 20px; transform: rotate(-2deg); border: 4px solid var(--text); box-shadow: 8px 8px 0 var(--text); }
      .skill-tag { display: inline-block; padding: 10px 20px; background: #fff; border: 3px solid var(--text); margin: 0 15px 15px 0; font-weight: bold; font-size: 1.2rem; text-transform: uppercase; box-shadow: 5px 5px 0 var(--p); }
      .timeline-item { padding: 30px; background: #fff; border: 5px solid var(--text); margin-bottom: 30px; box-shadow: 10px 10px 0 var(--text); }
      .timeline-item h3 { margin: 0 0 10px; font-size: 1.8rem; text-transform: uppercase; }
      .company { background: var(--p); color: #fff; padding: 2px 10px; } .year { font-weight: bold; font-size: 1.2rem; border-bottom: 3px solid var(--text); display: inline-block; margin-bottom: 15px; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; }
      .project-card { padding: 30px; background: var(--p); color: #fff; border: 6px solid var(--text); box-shadow: 12px 12px 0 var(--text); }
      .project-card h3 { margin-top: 0; font-size: 2rem; text-transform: uppercase; }
      .project-card a { display: inline-block; padding: 10px 20px; background: #fff; color: var(--text); border: 3px solid var(--text); text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 20px; box-shadow: 5px 5px 0 var(--text); }
      footer { padding: 40px; text-align: center; font-weight: bold; font-size: 1.5rem; text-transform: uppercase; }
      @media (max-width: 768px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 3rem; } body { border-width: 5px; } }
    
 header { text-align: left; }
 body { font-size: 1.05rem; }
 .social-links a { text-transform: uppercase; }`
  },
  brutalismelite: {
    name: 'Brutalism Elite',
    css: `
      :root { --p: {COLOR}; --bg: #ffffff; --text: #000000; }
      body { font-family: 'Space Grotesk', 'Courier New', monospace; background: var(--bg); color: var(--text); margin: 0; border: 15px solid var(--text); min-height: 100vh; box-sizing: border-box; }
      .container { max-width: 1000px; margin: 0 auto; padding: 0; }
      header { background: var(--p); color: #fff; padding: 60px 40px; border-bottom: 10px solid var(--text); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
      .header-photo img { width: 160px; height: 160px; object-fit: cover; border: 6px solid var(--text); box-shadow: 10px 10px 0 var(--text); }
      h1 { font-size: 4.5rem; margin: 0; text-transform: uppercase; line-height: 1; letter-spacing: -2px; }
      .title { font-size: 1.5rem; background: var(--text); color: #fff; display: inline-block; padding: 5px 15px; margin-top: 20px; text-transform: uppercase; font-weight: bold; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; color: var(--text); border: 3px solid var(--text); text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 20px; margin-right: 15px; box-shadow: 4px 4px 0 var(--text); transition: 0.1s; }
      .social-links a:hover { transform: translate(4px, 4px); box-shadow: 0 0 0 var(--text); }
      section { padding: 60px 40px; border-bottom: 10px solid var(--text); }
      section h2 { font-size: 3rem; text-transform: uppercase; margin-top: 0; margin-bottom: 40px; display: inline-block; background: var(--p); color: #fff; padding: 0 20px; transform: rotate(-2deg); border: 4px solid var(--text); box-shadow: 8px 8px 0 var(--text); }
      .skill-tag { display: inline-block; padding: 10px 20px; background: #fff; border: 3px solid var(--text); margin: 0 15px 15px 0; font-weight: bold; font-size: 1.2rem; text-transform: uppercase; box-shadow: 5px 5px 0 var(--p); }
      .timeline-item { padding: 30px; background: #fff; border: 5px solid var(--text); margin-bottom: 30px; box-shadow: 10px 10px 0 var(--text); }
      .timeline-item h3 { margin: 0 0 10px; font-size: 1.8rem; text-transform: uppercase; }
      .company { background: var(--p); color: #fff; padding: 2px 10px; } .year { font-weight: bold; font-size: 1.2rem; border-bottom: 3px solid var(--text); display: inline-block; margin-bottom: 15px; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; }
      .project-card { padding: 30px; background: var(--p); color: #fff; border: 6px solid var(--text); box-shadow: 12px 12px 0 var(--text); }
      .project-card h3 { margin-top: 0; font-size: 2rem; text-transform: uppercase; }
      .project-card a { display: inline-block; padding: 10px 20px; background: #fff; color: var(--text); border: 3px solid var(--text); text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 20px; box-shadow: 5px 5px 0 var(--text); }
      footer { padding: 40px; text-align: center; font-weight: bold; font-size: 1.5rem; text-transform: uppercase; }
      @media (max-width: 768px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 3rem; } body { border-width: 5px; } }
    `
  },
  brutalismplus: {
    name: 'Brutalism Plus',
    css: `
      :root { --p: {COLOR}; --bg: #ffffff; --text: #000000; }
      body { font-family: 'Space Grotesk', 'Courier New', monospace; background: var(--bg); color: var(--text); margin: 0; border: 15px solid var(--text); min-height: 100vh; box-sizing: border-box; }
      .container { max-width: 1000px; margin: 0 auto; padding: 0; }
      header { background: var(--p); color: #fff; padding: 60px 40px; border-bottom: 10px solid var(--text); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
      .header-photo img { width: 160px; height: 160px; object-fit: cover; border: 6px solid var(--text); box-shadow: 10px 10px 0 var(--text); }
      h1 { font-size: 4.5rem; margin: 0; text-transform: uppercase; line-height: 1; letter-spacing: -2px; }
      .title { font-size: 1.5rem; background: var(--text); color: #fff; display: inline-block; padding: 5px 15px; margin-top: 20px; text-transform: uppercase; font-weight: bold; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; color: var(--text); border: 3px solid var(--text); text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 20px; margin-right: 15px; box-shadow: 4px 4px 0 var(--text); transition: 0.1s; }
      .social-links a:hover { transform: translate(4px, 4px); box-shadow: 0 0 0 var(--text); }
      section { padding: 60px 40px; border-bottom: 10px solid var(--text); }
      section h2 { font-size: 3rem; text-transform: uppercase; margin-top: 0; margin-bottom: 40px; display: inline-block; background: var(--p); color: #fff; padding: 0 20px; transform: rotate(-2deg); border: 4px solid var(--text); box-shadow: 8px 8px 0 var(--text); }
      .skill-tag { display: inline-block; padding: 10px 20px; background: #fff; border: 3px solid var(--text); margin: 0 15px 15px 0; font-weight: bold; font-size: 1.2rem; text-transform: uppercase; box-shadow: 5px 5px 0 var(--p); }
      .timeline-item { padding: 30px; background: #fff; border: 5px solid var(--text); margin-bottom: 30px; box-shadow: 10px 10px 0 var(--text); }
      .timeline-item h3 { margin: 0 0 10px; font-size: 1.8rem; text-transform: uppercase; }
      .company { background: var(--p); color: #fff; padding: 2px 10px; } .year { font-weight: bold; font-size: 1.2rem; border-bottom: 3px solid var(--text); display: inline-block; margin-bottom: 15px; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; }
      .project-card { padding: 30px; background: var(--p); color: #fff; border: 6px solid var(--text); box-shadow: 12px 12px 0 var(--text); }
      .project-card h3 { margin-top: 0; font-size: 2rem; text-transform: uppercase; }
      .project-card a { display: inline-block; padding: 10px 20px; background: #fff; color: var(--text); border: 3px solid var(--text); text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 20px; box-shadow: 5px 5px 0 var(--text); }
      footer { padding: 40px; text-align: center; font-weight: bold; font-size: 1.5rem; text-transform: uppercase; }
      @media (max-width: 768px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 3rem; } body { border-width: 5px; } }
    `
  },
  brutalismultra: {
    name: 'Brutalism Ultra',
    css: `
      :root { --p: {COLOR}; --bg: #ffffff; --text: #000000; }
      body { font-family: 'Space Grotesk', 'Courier New', monospace; background: var(--bg); color: var(--text); margin: 0; border: 15px solid var(--text); min-height: 100vh; box-sizing: border-box; }
      .container { max-width: 1000px; margin: 0 auto; padding: 0; }
      header { background: var(--p); color: #fff; padding: 60px 40px; border-bottom: 10px solid var(--text); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
      .header-photo img { width: 160px; height: 160px; object-fit: cover; border: 6px solid var(--text); box-shadow: 10px 10px 0 var(--text); }
      h1 { font-size: 4.5rem; margin: 0; text-transform: uppercase; line-height: 1; letter-spacing: -2px; }
      .title { font-size: 1.5rem; background: var(--text); color: #fff; display: inline-block; padding: 5px 15px; margin-top: 20px; text-transform: uppercase; font-weight: bold; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; color: var(--text); border: 3px solid var(--text); text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 20px; margin-right: 15px; box-shadow: 4px 4px 0 var(--text); transition: 0.1s; }
      .social-links a:hover { transform: translate(4px, 4px); box-shadow: 0 0 0 var(--text); }
      section { padding: 60px 40px; border-bottom: 10px solid var(--text); }
      section h2 { font-size: 3rem; text-transform: uppercase; margin-top: 0; margin-bottom: 40px; display: inline-block; background: var(--p); color: #fff; padding: 0 20px; transform: rotate(-2deg); border: 4px solid var(--text); box-shadow: 8px 8px 0 var(--text); }
      .skill-tag { display: inline-block; padding: 10px 20px; background: #fff; border: 3px solid var(--text); margin: 0 15px 15px 0; font-weight: bold; font-size: 1.2rem; text-transform: uppercase; box-shadow: 5px 5px 0 var(--p); }
      .timeline-item { padding: 30px; background: #fff; border: 5px solid var(--text); margin-bottom: 30px; box-shadow: 10px 10px 0 var(--text); }
      .timeline-item h3 { margin: 0 0 10px; font-size: 1.8rem; text-transform: uppercase; }
      .company { background: var(--p); color: #fff; padding: 2px 10px; } .year { font-weight: bold; font-size: 1.2rem; border-bottom: 3px solid var(--text); display: inline-block; margin-bottom: 15px; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; }
      .project-card { padding: 30px; background: var(--p); color: #fff; border: 6px solid var(--text); box-shadow: 12px 12px 0 var(--text); }
      .project-card h3 { margin-top: 0; font-size: 2rem; text-transform: uppercase; }
      .project-card a { display: inline-block; padding: 10px 20px; background: #fff; color: var(--text); border: 3px solid var(--text); text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 20px; box-shadow: 5px 5px 0 var(--text); }
      footer { padding: 40px; text-align: center; font-weight: bold; font-size: 1.5rem; text-transform: uppercase; }
      @media (max-width: 768px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 3rem; } body { border-width: 5px; } }
    
 header { text-align: left; }`
  },
  brutalismmax: {
    name: 'Brutalism Max',
    css: `
      :root { --p: {COLOR}; --bg: #ffffff; --text: #000000; }
      body { font-family: 'Space Grotesk', 'Courier New', monospace; background: var(--bg); color: var(--text); margin: 0; border: 15px solid var(--text); min-height: 100vh; box-sizing: border-box; }
      .container { max-width: 1000px; margin: 0 auto; padding: 0; }
      header { background: var(--p); color: #fff; padding: 60px 40px; border-bottom: 10px solid var(--text); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
      .header-photo img { width: 160px; height: 160px; object-fit: cover; border: 6px solid var(--text); box-shadow: 10px 10px 0 var(--text); }
      h1 { font-size: 4.5rem; margin: 0; text-transform: uppercase; line-height: 1; letter-spacing: -2px; }
      .title { font-size: 1.5rem; background: var(--text); color: #fff; display: inline-block; padding: 5px 15px; margin-top: 20px; text-transform: uppercase; font-weight: bold; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; color: var(--text); border: 3px solid var(--text); text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 20px; margin-right: 15px; box-shadow: 4px 4px 0 var(--text); transition: 0.1s; }
      .social-links a:hover { transform: translate(4px, 4px); box-shadow: 0 0 0 var(--text); }
      section { padding: 60px 40px; border-bottom: 10px solid var(--text); }
      section h2 { font-size: 3rem; text-transform: uppercase; margin-top: 0; margin-bottom: 40px; display: inline-block; background: var(--p); color: #fff; padding: 0 20px; transform: rotate(-2deg); border: 4px solid var(--text); box-shadow: 8px 8px 0 var(--text); }
      .skill-tag { display: inline-block; padding: 10px 20px; background: #fff; border: 3px solid var(--text); margin: 0 15px 15px 0; font-weight: bold; font-size: 1.2rem; text-transform: uppercase; box-shadow: 5px 5px 0 var(--p); }
      .timeline-item { padding: 30px; background: #fff; border: 5px solid var(--text); margin-bottom: 30px; box-shadow: 10px 10px 0 var(--text); }
      .timeline-item h3 { margin: 0 0 10px; font-size: 1.8rem; text-transform: uppercase; }
      .company { background: var(--p); color: #fff; padding: 2px 10px; } .year { font-weight: bold; font-size: 1.2rem; border-bottom: 3px solid var(--text); display: inline-block; margin-bottom: 15px; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; }
      .project-card { padding: 30px; background: var(--p); color: #fff; border: 6px solid var(--text); box-shadow: 12px 12px 0 var(--text); }
      .project-card h3 { margin-top: 0; font-size: 2rem; text-transform: uppercase; }
      .project-card a { display: inline-block; padding: 10px 20px; background: #fff; color: var(--text); border: 3px solid var(--text); text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 20px; box-shadow: 5px 5px 0 var(--text); }
      footer { padding: 40px; text-align: center; font-weight: bold; font-size: 1.5rem; text-transform: uppercase; }
      @media (max-width: 768px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 3rem; } body { border-width: 5px; } }
    
 body { font-size: 1.05rem; }`
  },
  brutalismlite: {
    name: 'Brutalism Lite',
    css: `
      :root { --p: {COLOR}; --bg: #ffffff; --text: #000000; }
      body { font-family: 'Space Grotesk', 'Courier New', monospace; background: var(--bg); color: var(--text); margin: 0; border: 15px solid var(--text); min-height: 100vh; box-sizing: border-box; }
      .container { max-width: 1000px; margin: 0 auto; padding: 0; }
      header { background: var(--p); color: #fff; padding: 60px 40px; border-bottom: 10px solid var(--text); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
      .header-photo img { width: 160px; height: 160px; object-fit: cover; border: 6px solid var(--text); box-shadow: 10px 10px 0 var(--text); }
      h1 { font-size: 4.5rem; margin: 0; text-transform: uppercase; line-height: 1; letter-spacing: -2px; }
      .title { font-size: 1.5rem; background: var(--text); color: #fff; display: inline-block; padding: 5px 15px; margin-top: 20px; text-transform: uppercase; font-weight: bold; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; color: var(--text); border: 3px solid var(--text); text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 20px; margin-right: 15px; box-shadow: 4px 4px 0 var(--text); transition: 0.1s; }
      .social-links a:hover { transform: translate(4px, 4px); box-shadow: 0 0 0 var(--text); }
      section { padding: 60px 40px; border-bottom: 10px solid var(--text); }
      section h2 { font-size: 3rem; text-transform: uppercase; margin-top: 0; margin-bottom: 40px; display: inline-block; background: var(--p); color: #fff; padding: 0 20px; transform: rotate(-2deg); border: 4px solid var(--text); box-shadow: 8px 8px 0 var(--text); }
      .skill-tag { display: inline-block; padding: 10px 20px; background: #fff; border: 3px solid var(--text); margin: 0 15px 15px 0; font-weight: bold; font-size: 1.2rem; text-transform: uppercase; box-shadow: 5px 5px 0 var(--p); }
      .timeline-item { padding: 30px; background: #fff; border: 5px solid var(--text); margin-bottom: 30px; box-shadow: 10px 10px 0 var(--text); }
      .timeline-item h3 { margin: 0 0 10px; font-size: 1.8rem; text-transform: uppercase; }
      .company { background: var(--p); color: #fff; padding: 2px 10px; } .year { font-weight: bold; font-size: 1.2rem; border-bottom: 3px solid var(--text); display: inline-block; margin-bottom: 15px; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; }
      .project-card { padding: 30px; background: var(--p); color: #fff; border: 6px solid var(--text); box-shadow: 12px 12px 0 var(--text); }
      .project-card h3 { margin-top: 0; font-size: 2rem; text-transform: uppercase; }
      .project-card a { display: inline-block; padding: 10px 20px; background: #fff; color: var(--text); border: 3px solid var(--text); text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 20px; box-shadow: 5px 5px 0 var(--text); }
      footer { padding: 40px; text-align: center; font-weight: bold; font-size: 1.5rem; text-transform: uppercase; }
      @media (max-width: 768px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 3rem; } body { border-width: 5px; } }
    
 .social-links a { text-transform: uppercase; }`
  },
  brutalismx: {
    name: 'Brutalism X',
    css: `
      :root { --p: {COLOR}; --bg: #ffffff; --text: #000000; }
      body { font-family: 'Space Grotesk', 'Courier New', monospace; background: var(--bg); color: var(--text); margin: 0; border: 15px solid var(--text); min-height: 100vh; box-sizing: border-box; }
      .container { max-width: 1000px; margin: 0 auto; padding: 0; }
      header { background: var(--p); color: #fff; padding: 60px 40px; border-bottom: 10px solid var(--text); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
      .header-photo img { width: 160px; height: 160px; object-fit: cover; border: 6px solid var(--text); box-shadow: 10px 10px 0 var(--text); }
      h1 { font-size: 4.5rem; margin: 0; text-transform: uppercase; line-height: 1; letter-spacing: -2px; }
      .title { font-size: 1.5rem; background: var(--text); color: #fff; display: inline-block; padding: 5px 15px; margin-top: 20px; text-transform: uppercase; font-weight: bold; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; color: var(--text); border: 3px solid var(--text); text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 20px; margin-right: 15px; box-shadow: 4px 4px 0 var(--text); transition: 0.1s; }
      .social-links a:hover { transform: translate(4px, 4px); box-shadow: 0 0 0 var(--text); }
      section { padding: 60px 40px; border-bottom: 10px solid var(--text); }
      section h2 { font-size: 3rem; text-transform: uppercase; margin-top: 0; margin-bottom: 40px; display: inline-block; background: var(--p); color: #fff; padding: 0 20px; transform: rotate(-2deg); border: 4px solid var(--text); box-shadow: 8px 8px 0 var(--text); }
      .skill-tag { display: inline-block; padding: 10px 20px; background: #fff; border: 3px solid var(--text); margin: 0 15px 15px 0; font-weight: bold; font-size: 1.2rem; text-transform: uppercase; box-shadow: 5px 5px 0 var(--p); }
      .timeline-item { padding: 30px; background: #fff; border: 5px solid var(--text); margin-bottom: 30px; box-shadow: 10px 10px 0 var(--text); }
      .timeline-item h3 { margin: 0 0 10px; font-size: 1.8rem; text-transform: uppercase; }
      .company { background: var(--p); color: #fff; padding: 2px 10px; } .year { font-weight: bold; font-size: 1.2rem; border-bottom: 3px solid var(--text); display: inline-block; margin-bottom: 15px; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; }
      .project-card { padding: 30px; background: var(--p); color: #fff; border: 6px solid var(--text); box-shadow: 12px 12px 0 var(--text); }
      .project-card h3 { margin-top: 0; font-size: 2rem; text-transform: uppercase; }
      .project-card a { display: inline-block; padding: 10px 20px; background: #fff; color: var(--text); border: 3px solid var(--text); text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 20px; box-shadow: 5px 5px 0 var(--text); }
      footer { padding: 40px; text-align: center; font-weight: bold; font-size: 1.5rem; text-transform: uppercase; }
      @media (max-width: 768px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 3rem; } body { border-width: 5px; } }
    
 header { text-align: left; }`
  },
  brutalismprime: {
    name: 'Brutalism Prime',
    css: `
      :root { --p: {COLOR}; --bg: #ffffff; --text: #000000; }
      body { font-family: 'Space Grotesk', 'Courier New', monospace; background: var(--bg); color: var(--text); margin: 0; border: 15px solid var(--text); min-height: 100vh; box-sizing: border-box; }
      .container { max-width: 1000px; margin: 0 auto; padding: 0; }
      header { background: var(--p); color: #fff; padding: 60px 40px; border-bottom: 10px solid var(--text); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
      .header-photo img { width: 160px; height: 160px; object-fit: cover; border: 6px solid var(--text); box-shadow: 10px 10px 0 var(--text); }
      h1 { font-size: 4.5rem; margin: 0; text-transform: uppercase; line-height: 1; letter-spacing: -2px; }
      .title { font-size: 1.5rem; background: var(--text); color: #fff; display: inline-block; padding: 5px 15px; margin-top: 20px; text-transform: uppercase; font-weight: bold; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; color: var(--text); border: 3px solid var(--text); text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 20px; margin-right: 15px; box-shadow: 4px 4px 0 var(--text); transition: 0.1s; }
      .social-links a:hover { transform: translate(4px, 4px); box-shadow: 0 0 0 var(--text); }
      section { padding: 60px 40px; border-bottom: 10px solid var(--text); }
      section h2 { font-size: 3rem; text-transform: uppercase; margin-top: 0; margin-bottom: 40px; display: inline-block; background: var(--p); color: #fff; padding: 0 20px; transform: rotate(-2deg); border: 4px solid var(--text); box-shadow: 8px 8px 0 var(--text); }
      .skill-tag { display: inline-block; padding: 10px 20px; background: #fff; border: 3px solid var(--text); margin: 0 15px 15px 0; font-weight: bold; font-size: 1.2rem; text-transform: uppercase; box-shadow: 5px 5px 0 var(--p); }
      .timeline-item { padding: 30px; background: #fff; border: 5px solid var(--text); margin-bottom: 30px; box-shadow: 10px 10px 0 var(--text); }
      .timeline-item h3 { margin: 0 0 10px; font-size: 1.8rem; text-transform: uppercase; }
      .company { background: var(--p); color: #fff; padding: 2px 10px; } .year { font-weight: bold; font-size: 1.2rem; border-bottom: 3px solid var(--text); display: inline-block; margin-bottom: 15px; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; }
      .project-card { padding: 30px; background: var(--p); color: #fff; border: 6px solid var(--text); box-shadow: 12px 12px 0 var(--text); }
      .project-card h3 { margin-top: 0; font-size: 2rem; text-transform: uppercase; }
      .project-card a { display: inline-block; padding: 10px 20px; background: #fff; color: var(--text); border: 3px solid var(--text); text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 20px; box-shadow: 5px 5px 0 var(--text); }
      footer { padding: 40px; text-align: center; font-weight: bold; font-size: 1.5rem; text-transform: uppercase; }
      @media (max-width: 768px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 3rem; } body { border-width: 5px; } }
    `
  },
  brutalismneo: {
    name: 'Brutalism Neo',
    css: `
      :root { --p: {COLOR}; --bg: #ffffff; --text: #000000; }
      body { font-family: 'Space Grotesk', 'Courier New', monospace; background: var(--bg); color: var(--text); margin: 0; border: 15px solid var(--text); min-height: 100vh; box-sizing: border-box; }
      .container { max-width: 1000px; margin: 0 auto; padding: 0; }
      header { background: var(--p); color: #fff; padding: 60px 40px; border-bottom: 10px solid var(--text); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
      .header-photo img { width: 160px; height: 160px; object-fit: cover; border: 6px solid var(--text); box-shadow: 10px 10px 0 var(--text); }
      h1 { font-size: 4.5rem; margin: 0; text-transform: uppercase; line-height: 1; letter-spacing: -2px; }
      .title { font-size: 1.5rem; background: var(--text); color: #fff; display: inline-block; padding: 5px 15px; margin-top: 20px; text-transform: uppercase; font-weight: bold; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; color: var(--text); border: 3px solid var(--text); text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 20px; margin-right: 15px; box-shadow: 4px 4px 0 var(--text); transition: 0.1s; }
      .social-links a:hover { transform: translate(4px, 4px); box-shadow: 0 0 0 var(--text); }
      section { padding: 60px 40px; border-bottom: 10px solid var(--text); }
      section h2 { font-size: 3rem; text-transform: uppercase; margin-top: 0; margin-bottom: 40px; display: inline-block; background: var(--p); color: #fff; padding: 0 20px; transform: rotate(-2deg); border: 4px solid var(--text); box-shadow: 8px 8px 0 var(--text); }
      .skill-tag { display: inline-block; padding: 10px 20px; background: #fff; border: 3px solid var(--text); margin: 0 15px 15px 0; font-weight: bold; font-size: 1.2rem; text-transform: uppercase; box-shadow: 5px 5px 0 var(--p); }
      .timeline-item { padding: 30px; background: #fff; border: 5px solid var(--text); margin-bottom: 30px; box-shadow: 10px 10px 0 var(--text); }
      .timeline-item h3 { margin: 0 0 10px; font-size: 1.8rem; text-transform: uppercase; }
      .company { background: var(--p); color: #fff; padding: 2px 10px; } .year { font-weight: bold; font-size: 1.2rem; border-bottom: 3px solid var(--text); display: inline-block; margin-bottom: 15px; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; }
      .project-card { padding: 30px; background: var(--p); color: #fff; border: 6px solid var(--text); box-shadow: 12px 12px 0 var(--text); }
      .project-card h3 { margin-top: 0; font-size: 2rem; text-transform: uppercase; }
      .project-card a { display: inline-block; padding: 10px 20px; background: #fff; color: var(--text); border: 3px solid var(--text); text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 20px; box-shadow: 5px 5px 0 var(--text); }
      footer { padding: 40px; text-align: center; font-weight: bold; font-size: 1.5rem; text-transform: uppercase; }
      @media (max-width: 768px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 3rem; } body { border-width: 5px; } }
    
 body { font-size: 1.05rem; }`
  },
  pinterestpro: {
    name: 'Masonry Grid Pro',
    css: `
      :root { --p: {COLOR}; --bg: #f9f9f9; --text: #111; }
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }
      .container { max-width: 1200px; margin: 0 auto; }
      header { text-align: center; padding: 60px 20px; margin-bottom: 40px; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 20px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; font-weight: bold; }
      .title { color: #666; font-size: 1.2rem; margin-top: 10px; }
      .social-links a { display: inline-block; padding: 10px 25px; border-radius: 30px; background: #efefef; color: #111; text-decoration: none; font-weight: bold; margin: 0 5px; transition: 0.2s; }
      .social-links a:hover { background: var(--p); color: #fff; }
      .masonry-layout { display: column; column-count: 3; column-gap: 25px; }
      section { break-inside: avoid; background: #fff; border-radius: 24px; padding: 35px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
      section h2 { margin-top: 0; font-size: 1.5rem; margin-bottom: 25px; }
      .skill-tag { display: inline-block; padding: 8px 16px; border-radius: 20px; background: #f0f0f0; margin: 0 8px 10px 0; font-weight: 500; font-size: 0.9rem; }
      .timeline-item { margin-bottom: 25px; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.1rem; }
      .company { color: var(--p); } .year { color: #888; font-size: 0.85rem; display: block; margin-bottom: 8px; }
      .project-card { background: #f9f9f9; border-radius: 16px; padding: 25px; margin-bottom: 20px; }
      .project-card h3 { margin-top: 0; font-size: 1.2rem; }
      .project-card a { display: inline-block; background: var(--p); color: #fff; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-weight: bold; font-size: 0.9rem; margin-top: 15px; }
      footer { text-align: center; padding: 40px; color: #888; }
      @media (max-width: 900px) { .masonry-layout { column-count: 2; } }
      @media (max-width: 600px) { .masonry-layout { column-count: 1; } }
    
 header { text-align: left; }
 body { font-size: 1.05rem; }
 .social-links a { text-transform: uppercase; }`
  },
  pinterestelite: {
    name: 'Masonry Grid Elite',
    css: `
      :root { --p: {COLOR}; --bg: #f9f9f9; --text: #111; }
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }
      .container { max-width: 1200px; margin: 0 auto; }
      header { text-align: center; padding: 60px 20px; margin-bottom: 40px; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 20px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; font-weight: bold; }
      .title { color: #666; font-size: 1.2rem; margin-top: 10px; }
      .social-links a { display: inline-block; padding: 10px 25px; border-radius: 30px; background: #efefef; color: #111; text-decoration: none; font-weight: bold; margin: 0 5px; transition: 0.2s; }
      .social-links a:hover { background: var(--p); color: #fff; }
      .masonry-layout { display: column; column-count: 3; column-gap: 25px; }
      section { break-inside: avoid; background: #fff; border-radius: 24px; padding: 35px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
      section h2 { margin-top: 0; font-size: 1.5rem; margin-bottom: 25px; }
      .skill-tag { display: inline-block; padding: 8px 16px; border-radius: 20px; background: #f0f0f0; margin: 0 8px 10px 0; font-weight: 500; font-size: 0.9rem; }
      .timeline-item { margin-bottom: 25px; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.1rem; }
      .company { color: var(--p); } .year { color: #888; font-size: 0.85rem; display: block; margin-bottom: 8px; }
      .project-card { background: #f9f9f9; border-radius: 16px; padding: 25px; margin-bottom: 20px; }
      .project-card h3 { margin-top: 0; font-size: 1.2rem; }
      .project-card a { display: inline-block; background: var(--p); color: #fff; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-weight: bold; font-size: 0.9rem; margin-top: 15px; }
      footer { text-align: center; padding: 40px; color: #888; }
      @media (max-width: 900px) { .masonry-layout { column-count: 2; } }
      @media (max-width: 600px) { .masonry-layout { column-count: 1; } }
    `
  },
  pinterestplus: {
    name: 'Masonry Grid Plus',
    css: `
      :root { --p: {COLOR}; --bg: #f9f9f9; --text: #111; }
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }
      .container { max-width: 1200px; margin: 0 auto; }
      header { text-align: center; padding: 60px 20px; margin-bottom: 40px; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 20px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; font-weight: bold; }
      .title { color: #666; font-size: 1.2rem; margin-top: 10px; }
      .social-links a { display: inline-block; padding: 10px 25px; border-radius: 30px; background: #efefef; color: #111; text-decoration: none; font-weight: bold; margin: 0 5px; transition: 0.2s; }
      .social-links a:hover { background: var(--p); color: #fff; }
      .masonry-layout { display: column; column-count: 3; column-gap: 25px; }
      section { break-inside: avoid; background: #fff; border-radius: 24px; padding: 35px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
      section h2 { margin-top: 0; font-size: 1.5rem; margin-bottom: 25px; }
      .skill-tag { display: inline-block; padding: 8px 16px; border-radius: 20px; background: #f0f0f0; margin: 0 8px 10px 0; font-weight: 500; font-size: 0.9rem; }
      .timeline-item { margin-bottom: 25px; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.1rem; }
      .company { color: var(--p); } .year { color: #888; font-size: 0.85rem; display: block; margin-bottom: 8px; }
      .project-card { background: #f9f9f9; border-radius: 16px; padding: 25px; margin-bottom: 20px; }
      .project-card h3 { margin-top: 0; font-size: 1.2rem; }
      .project-card a { display: inline-block; background: var(--p); color: #fff; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-weight: bold; font-size: 0.9rem; margin-top: 15px; }
      footer { text-align: center; padding: 40px; color: #888; }
      @media (max-width: 900px) { .masonry-layout { column-count: 2; } }
      @media (max-width: 600px) { .masonry-layout { column-count: 1; } }
    `
  },
  pinterestultra: {
    name: 'Masonry Grid Ultra',
    css: `
      :root { --p: {COLOR}; --bg: #f9f9f9; --text: #111; }
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }
      .container { max-width: 1200px; margin: 0 auto; }
      header { text-align: center; padding: 60px 20px; margin-bottom: 40px; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 20px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; font-weight: bold; }
      .title { color: #666; font-size: 1.2rem; margin-top: 10px; }
      .social-links a { display: inline-block; padding: 10px 25px; border-radius: 30px; background: #efefef; color: #111; text-decoration: none; font-weight: bold; margin: 0 5px; transition: 0.2s; }
      .social-links a:hover { background: var(--p); color: #fff; }
      .masonry-layout { display: column; column-count: 3; column-gap: 25px; }
      section { break-inside: avoid; background: #fff; border-radius: 24px; padding: 35px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
      section h2 { margin-top: 0; font-size: 1.5rem; margin-bottom: 25px; }
      .skill-tag { display: inline-block; padding: 8px 16px; border-radius: 20px; background: #f0f0f0; margin: 0 8px 10px 0; font-weight: 500; font-size: 0.9rem; }
      .timeline-item { margin-bottom: 25px; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.1rem; }
      .company { color: var(--p); } .year { color: #888; font-size: 0.85rem; display: block; margin-bottom: 8px; }
      .project-card { background: #f9f9f9; border-radius: 16px; padding: 25px; margin-bottom: 20px; }
      .project-card h3 { margin-top: 0; font-size: 1.2rem; }
      .project-card a { display: inline-block; background: var(--p); color: #fff; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-weight: bold; font-size: 0.9rem; margin-top: 15px; }
      footer { text-align: center; padding: 40px; color: #888; }
      @media (max-width: 900px) { .masonry-layout { column-count: 2; } }
      @media (max-width: 600px) { .masonry-layout { column-count: 1; } }
    
 header { text-align: left; }`
  },
  pinterestmax: {
    name: 'Masonry Grid Max',
    css: `
      :root { --p: {COLOR}; --bg: #f9f9f9; --text: #111; }
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }
      .container { max-width: 1200px; margin: 0 auto; }
      header { text-align: center; padding: 60px 20px; margin-bottom: 40px; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 20px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; font-weight: bold; }
      .title { color: #666; font-size: 1.2rem; margin-top: 10px; }
      .social-links a { display: inline-block; padding: 10px 25px; border-radius: 30px; background: #efefef; color: #111; text-decoration: none; font-weight: bold; margin: 0 5px; transition: 0.2s; }
      .social-links a:hover { background: var(--p); color: #fff; }
      .masonry-layout { display: column; column-count: 3; column-gap: 25px; }
      section { break-inside: avoid; background: #fff; border-radius: 24px; padding: 35px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
      section h2 { margin-top: 0; font-size: 1.5rem; margin-bottom: 25px; }
      .skill-tag { display: inline-block; padding: 8px 16px; border-radius: 20px; background: #f0f0f0; margin: 0 8px 10px 0; font-weight: 500; font-size: 0.9rem; }
      .timeline-item { margin-bottom: 25px; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.1rem; }
      .company { color: var(--p); } .year { color: #888; font-size: 0.85rem; display: block; margin-bottom: 8px; }
      .project-card { background: #f9f9f9; border-radius: 16px; padding: 25px; margin-bottom: 20px; }
      .project-card h3 { margin-top: 0; font-size: 1.2rem; }
      .project-card a { display: inline-block; background: var(--p); color: #fff; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-weight: bold; font-size: 0.9rem; margin-top: 15px; }
      footer { text-align: center; padding: 40px; color: #888; }
      @media (max-width: 900px) { .masonry-layout { column-count: 2; } }
      @media (max-width: 600px) { .masonry-layout { column-count: 1; } }
    
 body { font-size: 1.05rem; }`
  },
  pinterestlite: {
    name: 'Masonry Grid Lite',
    css: `
      :root { --p: {COLOR}; --bg: #f9f9f9; --text: #111; }
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }
      .container { max-width: 1200px; margin: 0 auto; }
      header { text-align: center; padding: 60px 20px; margin-bottom: 40px; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 20px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; font-weight: bold; }
      .title { color: #666; font-size: 1.2rem; margin-top: 10px; }
      .social-links a { display: inline-block; padding: 10px 25px; border-radius: 30px; background: #efefef; color: #111; text-decoration: none; font-weight: bold; margin: 0 5px; transition: 0.2s; }
      .social-links a:hover { background: var(--p); color: #fff; }
      .masonry-layout { display: column; column-count: 3; column-gap: 25px; }
      section { break-inside: avoid; background: #fff; border-radius: 24px; padding: 35px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
      section h2 { margin-top: 0; font-size: 1.5rem; margin-bottom: 25px; }
      .skill-tag { display: inline-block; padding: 8px 16px; border-radius: 20px; background: #f0f0f0; margin: 0 8px 10px 0; font-weight: 500; font-size: 0.9rem; }
      .timeline-item { margin-bottom: 25px; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.1rem; }
      .company { color: var(--p); } .year { color: #888; font-size: 0.85rem; display: block; margin-bottom: 8px; }
      .project-card { background: #f9f9f9; border-radius: 16px; padding: 25px; margin-bottom: 20px; }
      .project-card h3 { margin-top: 0; font-size: 1.2rem; }
      .project-card a { display: inline-block; background: var(--p); color: #fff; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-weight: bold; font-size: 0.9rem; margin-top: 15px; }
      footer { text-align: center; padding: 40px; color: #888; }
      @media (max-width: 900px) { .masonry-layout { column-count: 2; } }
      @media (max-width: 600px) { .masonry-layout { column-count: 1; } }
    
 .social-links a { text-transform: uppercase; }`
  },
  pinterestx: {
    name: 'Masonry Grid X',
    css: `
      :root { --p: {COLOR}; --bg: #f9f9f9; --text: #111; }
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }
      .container { max-width: 1200px; margin: 0 auto; }
      header { text-align: center; padding: 60px 20px; margin-bottom: 40px; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 20px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; font-weight: bold; }
      .title { color: #666; font-size: 1.2rem; margin-top: 10px; }
      .social-links a { display: inline-block; padding: 10px 25px; border-radius: 30px; background: #efefef; color: #111; text-decoration: none; font-weight: bold; margin: 0 5px; transition: 0.2s; }
      .social-links a:hover { background: var(--p); color: #fff; }
      .masonry-layout { display: column; column-count: 3; column-gap: 25px; }
      section { break-inside: avoid; background: #fff; border-radius: 24px; padding: 35px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
      section h2 { margin-top: 0; font-size: 1.5rem; margin-bottom: 25px; }
      .skill-tag { display: inline-block; padding: 8px 16px; border-radius: 20px; background: #f0f0f0; margin: 0 8px 10px 0; font-weight: 500; font-size: 0.9rem; }
      .timeline-item { margin-bottom: 25px; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.1rem; }
      .company { color: var(--p); } .year { color: #888; font-size: 0.85rem; display: block; margin-bottom: 8px; }
      .project-card { background: #f9f9f9; border-radius: 16px; padding: 25px; margin-bottom: 20px; }
      .project-card h3 { margin-top: 0; font-size: 1.2rem; }
      .project-card a { display: inline-block; background: var(--p); color: #fff; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-weight: bold; font-size: 0.9rem; margin-top: 15px; }
      footer { text-align: center; padding: 40px; color: #888; }
      @media (max-width: 900px) { .masonry-layout { column-count: 2; } }
      @media (max-width: 600px) { .masonry-layout { column-count: 1; } }
    
 header { text-align: left; }`
  },
  pinterestprime: {
    name: 'Masonry Grid Prime',
    css: `
      :root { --p: {COLOR}; --bg: #f9f9f9; --text: #111; }
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }
      .container { max-width: 1200px; margin: 0 auto; }
      header { text-align: center; padding: 60px 20px; margin-bottom: 40px; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 20px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; font-weight: bold; }
      .title { color: #666; font-size: 1.2rem; margin-top: 10px; }
      .social-links a { display: inline-block; padding: 10px 25px; border-radius: 30px; background: #efefef; color: #111; text-decoration: none; font-weight: bold; margin: 0 5px; transition: 0.2s; }
      .social-links a:hover { background: var(--p); color: #fff; }
      .masonry-layout { display: column; column-count: 3; column-gap: 25px; }
      section { break-inside: avoid; background: #fff; border-radius: 24px; padding: 35px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
      section h2 { margin-top: 0; font-size: 1.5rem; margin-bottom: 25px; }
      .skill-tag { display: inline-block; padding: 8px 16px; border-radius: 20px; background: #f0f0f0; margin: 0 8px 10px 0; font-weight: 500; font-size: 0.9rem; }
      .timeline-item { margin-bottom: 25px; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.1rem; }
      .company { color: var(--p); } .year { color: #888; font-size: 0.85rem; display: block; margin-bottom: 8px; }
      .project-card { background: #f9f9f9; border-radius: 16px; padding: 25px; margin-bottom: 20px; }
      .project-card h3 { margin-top: 0; font-size: 1.2rem; }
      .project-card a { display: inline-block; background: var(--p); color: #fff; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-weight: bold; font-size: 0.9rem; margin-top: 15px; }
      footer { text-align: center; padding: 40px; color: #888; }
      @media (max-width: 900px) { .masonry-layout { column-count: 2; } }
      @media (max-width: 600px) { .masonry-layout { column-count: 1; } }
    `
  },
  pinterestneo: {
    name: 'Masonry Grid Neo',
    css: `
      :root { --p: {COLOR}; --bg: #f9f9f9; --text: #111; }
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }
      .container { max-width: 1200px; margin: 0 auto; }
      header { text-align: center; padding: 60px 20px; margin-bottom: 40px; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 20px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; }
      h1 { font-size: 3rem; margin: 0; font-weight: bold; }
      .title { color: #666; font-size: 1.2rem; margin-top: 10px; }
      .social-links a { display: inline-block; padding: 10px 25px; border-radius: 30px; background: #efefef; color: #111; text-decoration: none; font-weight: bold; margin: 0 5px; transition: 0.2s; }
      .social-links a:hover { background: var(--p); color: #fff; }
      .masonry-layout { display: column; column-count: 3; column-gap: 25px; }
      section { break-inside: avoid; background: #fff; border-radius: 24px; padding: 35px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
      section h2 { margin-top: 0; font-size: 1.5rem; margin-bottom: 25px; }
      .skill-tag { display: inline-block; padding: 8px 16px; border-radius: 20px; background: #f0f0f0; margin: 0 8px 10px 0; font-weight: 500; font-size: 0.9rem; }
      .timeline-item { margin-bottom: 25px; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.1rem; }
      .company { color: var(--p); } .year { color: #888; font-size: 0.85rem; display: block; margin-bottom: 8px; }
      .project-card { background: #f9f9f9; border-radius: 16px; padding: 25px; margin-bottom: 20px; }
      .project-card h3 { margin-top: 0; font-size: 1.2rem; }
      .project-card a { display: inline-block; background: var(--p); color: #fff; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-weight: bold; font-size: 0.9rem; margin-top: 15px; }
      footer { text-align: center; padding: 40px; color: #888; }
      @media (max-width: 900px) { .masonry-layout { column-count: 2; } }
      @media (max-width: 600px) { .masonry-layout { column-count: 1; } }
    
 body { font-size: 1.05rem; }`
  },
  cyberpunkpro: {
    name: 'Neon Cyber Pro',
    css: `
      :root { --p: {COLOR}; --bg: #09090b; --text: #e4e4e7; }
      body { font-family: 'Rajdhani', sans-serif; background: var(--bg); color: var(--text); margin: 0; background-image: linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px); background-size: 30px 30px; }
      .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
      header { position: relative; padding: 60px 40px; border: 1px solid var(--p); background: rgba(0,0,0,0.6); box-shadow: 0 0 20px inset rgba(0, 255, 255, 0.2); }
      header::before { content: ''; position: absolute; top: -2px; left: -2px; width: 20px; height: 20px; border-top: 4px solid var(--p); border-left: 4px solid var(--p); }
      header::after { content: ''; position: absolute; bottom: -2px; right: -2px; width: 20px; height: 20px; border-bottom: 4px solid var(--p); border-right: 4px solid var(--p); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; object-fit: cover; clip-path: polygon(20% 0%, 100% 0, 100% 80%, 80% 100%, 0 100%, 0% 20%); border: 2px solid var(--p); filter: drop-shadow(0 0 10px var(--p)); }
      h1 { font-size: 3.5rem; margin: 0; color: #fff; text-shadow: 0 0 10px var(--p), 0 0 20px var(--p); text-transform: uppercase; letter-spacing: 2px; }
      .title { color: var(--p); font-size: 1.2rem; margin-top: 10px; text-transform: uppercase; letter-spacing: 4px; }
      .social-links a { display: inline-block; padding: 8px 20px; background: transparent; border: 1px solid var(--p); color: var(--p); text-decoration: none; text-transform: uppercase; font-weight: bold; margin-right: 15px; margin-top: 20px; transition: 0.3s; }
      .social-links a:hover { background: var(--p); color: #000; box-shadow: 0 0 15px var(--p); }
      section { margin-top: 60px; }
      section h2 { font-size: 2rem; color: #fff; text-transform: uppercase; letter-spacing: 3px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 15px; position: relative; }
      section h2::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 100px; height: 3px; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .skill-tag { display: inline-block; padding: 6px 15px; background: rgba(0, 255, 255, 0.1); border: 1px solid var(--p); color: var(--p); margin: 0 10px 10px 0; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; }
      .timeline-item { padding: 25px; border-left: 2px solid var(--p); background: rgba(255,255,255,0.02); margin-bottom: 25px; position: relative; }
      .timeline-item::before { content: ''; position: absolute; left: -6px; top: 0; width: 10px; height: 10px; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .timeline-item h3 { margin: 0 0 5px; color: #fff; text-transform: uppercase; font-size: 1.3rem; }
      .company { color: var(--p); } .year { color: #888; font-size: 0.9rem; margin-bottom: 10px; display: inline-block; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 25px; background: rgba(0,0,0,0.5); border: 1px solid #333; transition: 0.3s; position: relative; overflow: hidden; }
      .project-card:hover { border-color: var(--p); box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.1); }
      .project-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 15px; height: 15px; background: var(--p); clip-path: polygon(100% 0, 0% 100%, 100% 100%); }
      .project-card h3 { margin-top: 0; color: #fff; text-transform: uppercase; }
      .project-card a { display: inline-block; padding: 8px 20px; background: var(--p); color: #000; text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 15px; }
      footer { text-align: center; padding: 40px; color: #666; text-transform: uppercase; letter-spacing: 2px; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } }
    
 header { text-align: left; }
 body { font-size: 1.05rem; }
 .social-links a { text-transform: uppercase; }`
  },
  cyberpunkelite: {
    name: 'Neon Cyber Elite',
    css: `
      :root { --p: {COLOR}; --bg: #09090b; --text: #e4e4e7; }
      body { font-family: 'Rajdhani', sans-serif; background: var(--bg); color: var(--text); margin: 0; background-image: linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px); background-size: 30px 30px; }
      .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
      header { position: relative; padding: 60px 40px; border: 1px solid var(--p); background: rgba(0,0,0,0.6); box-shadow: 0 0 20px inset rgba(0, 255, 255, 0.2); }
      header::before { content: ''; position: absolute; top: -2px; left: -2px; width: 20px; height: 20px; border-top: 4px solid var(--p); border-left: 4px solid var(--p); }
      header::after { content: ''; position: absolute; bottom: -2px; right: -2px; width: 20px; height: 20px; border-bottom: 4px solid var(--p); border-right: 4px solid var(--p); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; object-fit: cover; clip-path: polygon(20% 0%, 100% 0, 100% 80%, 80% 100%, 0 100%, 0% 20%); border: 2px solid var(--p); filter: drop-shadow(0 0 10px var(--p)); }
      h1 { font-size: 3.5rem; margin: 0; color: #fff; text-shadow: 0 0 10px var(--p), 0 0 20px var(--p); text-transform: uppercase; letter-spacing: 2px; }
      .title { color: var(--p); font-size: 1.2rem; margin-top: 10px; text-transform: uppercase; letter-spacing: 4px; }
      .social-links a { display: inline-block; padding: 8px 20px; background: transparent; border: 1px solid var(--p); color: var(--p); text-decoration: none; text-transform: uppercase; font-weight: bold; margin-right: 15px; margin-top: 20px; transition: 0.3s; }
      .social-links a:hover { background: var(--p); color: #000; box-shadow: 0 0 15px var(--p); }
      section { margin-top: 60px; }
      section h2 { font-size: 2rem; color: #fff; text-transform: uppercase; letter-spacing: 3px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 15px; position: relative; }
      section h2::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 100px; height: 3px; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .skill-tag { display: inline-block; padding: 6px 15px; background: rgba(0, 255, 255, 0.1); border: 1px solid var(--p); color: var(--p); margin: 0 10px 10px 0; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; }
      .timeline-item { padding: 25px; border-left: 2px solid var(--p); background: rgba(255,255,255,0.02); margin-bottom: 25px; position: relative; }
      .timeline-item::before { content: ''; position: absolute; left: -6px; top: 0; width: 10px; height: 10px; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .timeline-item h3 { margin: 0 0 5px; color: #fff; text-transform: uppercase; font-size: 1.3rem; }
      .company { color: var(--p); } .year { color: #888; font-size: 0.9rem; margin-bottom: 10px; display: inline-block; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 25px; background: rgba(0,0,0,0.5); border: 1px solid #333; transition: 0.3s; position: relative; overflow: hidden; }
      .project-card:hover { border-color: var(--p); box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.1); }
      .project-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 15px; height: 15px; background: var(--p); clip-path: polygon(100% 0, 0% 100%, 100% 100%); }
      .project-card h3 { margin-top: 0; color: #fff; text-transform: uppercase; }
      .project-card a { display: inline-block; padding: 8px 20px; background: var(--p); color: #000; text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 15px; }
      footer { text-align: center; padding: 40px; color: #666; text-transform: uppercase; letter-spacing: 2px; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } }
    `
  },
  cyberpunkplus: {
    name: 'Neon Cyber Plus',
    css: `
      :root { --p: {COLOR}; --bg: #09090b; --text: #e4e4e7; }
      body { font-family: 'Rajdhani', sans-serif; background: var(--bg); color: var(--text); margin: 0; background-image: linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px); background-size: 30px 30px; }
      .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
      header { position: relative; padding: 60px 40px; border: 1px solid var(--p); background: rgba(0,0,0,0.6); box-shadow: 0 0 20px inset rgba(0, 255, 255, 0.2); }
      header::before { content: ''; position: absolute; top: -2px; left: -2px; width: 20px; height: 20px; border-top: 4px solid var(--p); border-left: 4px solid var(--p); }
      header::after { content: ''; position: absolute; bottom: -2px; right: -2px; width: 20px; height: 20px; border-bottom: 4px solid var(--p); border-right: 4px solid var(--p); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; object-fit: cover; clip-path: polygon(20% 0%, 100% 0, 100% 80%, 80% 100%, 0 100%, 0% 20%); border: 2px solid var(--p); filter: drop-shadow(0 0 10px var(--p)); }
      h1 { font-size: 3.5rem; margin: 0; color: #fff; text-shadow: 0 0 10px var(--p), 0 0 20px var(--p); text-transform: uppercase; letter-spacing: 2px; }
      .title { color: var(--p); font-size: 1.2rem; margin-top: 10px; text-transform: uppercase; letter-spacing: 4px; }
      .social-links a { display: inline-block; padding: 8px 20px; background: transparent; border: 1px solid var(--p); color: var(--p); text-decoration: none; text-transform: uppercase; font-weight: bold; margin-right: 15px; margin-top: 20px; transition: 0.3s; }
      .social-links a:hover { background: var(--p); color: #000; box-shadow: 0 0 15px var(--p); }
      section { margin-top: 60px; }
      section h2 { font-size: 2rem; color: #fff; text-transform: uppercase; letter-spacing: 3px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 15px; position: relative; }
      section h2::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 100px; height: 3px; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .skill-tag { display: inline-block; padding: 6px 15px; background: rgba(0, 255, 255, 0.1); border: 1px solid var(--p); color: var(--p); margin: 0 10px 10px 0; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; }
      .timeline-item { padding: 25px; border-left: 2px solid var(--p); background: rgba(255,255,255,0.02); margin-bottom: 25px; position: relative; }
      .timeline-item::before { content: ''; position: absolute; left: -6px; top: 0; width: 10px; height: 10px; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .timeline-item h3 { margin: 0 0 5px; color: #fff; text-transform: uppercase; font-size: 1.3rem; }
      .company { color: var(--p); } .year { color: #888; font-size: 0.9rem; margin-bottom: 10px; display: inline-block; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 25px; background: rgba(0,0,0,0.5); border: 1px solid #333; transition: 0.3s; position: relative; overflow: hidden; }
      .project-card:hover { border-color: var(--p); box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.1); }
      .project-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 15px; height: 15px; background: var(--p); clip-path: polygon(100% 0, 0% 100%, 100% 100%); }
      .project-card h3 { margin-top: 0; color: #fff; text-transform: uppercase; }
      .project-card a { display: inline-block; padding: 8px 20px; background: var(--p); color: #000; text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 15px; }
      footer { text-align: center; padding: 40px; color: #666; text-transform: uppercase; letter-spacing: 2px; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } }
    `
  },
  cyberpunkultra: {
    name: 'Neon Cyber Ultra',
    css: `
      :root { --p: {COLOR}; --bg: #09090b; --text: #e4e4e7; }
      body { font-family: 'Rajdhani', sans-serif; background: var(--bg); color: var(--text); margin: 0; background-image: linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px); background-size: 30px 30px; }
      .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
      header { position: relative; padding: 60px 40px; border: 1px solid var(--p); background: rgba(0,0,0,0.6); box-shadow: 0 0 20px inset rgba(0, 255, 255, 0.2); }
      header::before { content: ''; position: absolute; top: -2px; left: -2px; width: 20px; height: 20px; border-top: 4px solid var(--p); border-left: 4px solid var(--p); }
      header::after { content: ''; position: absolute; bottom: -2px; right: -2px; width: 20px; height: 20px; border-bottom: 4px solid var(--p); border-right: 4px solid var(--p); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; object-fit: cover; clip-path: polygon(20% 0%, 100% 0, 100% 80%, 80% 100%, 0 100%, 0% 20%); border: 2px solid var(--p); filter: drop-shadow(0 0 10px var(--p)); }
      h1 { font-size: 3.5rem; margin: 0; color: #fff; text-shadow: 0 0 10px var(--p), 0 0 20px var(--p); text-transform: uppercase; letter-spacing: 2px; }
      .title { color: var(--p); font-size: 1.2rem; margin-top: 10px; text-transform: uppercase; letter-spacing: 4px; }
      .social-links a { display: inline-block; padding: 8px 20px; background: transparent; border: 1px solid var(--p); color: var(--p); text-decoration: none; text-transform: uppercase; font-weight: bold; margin-right: 15px; margin-top: 20px; transition: 0.3s; }
      .social-links a:hover { background: var(--p); color: #000; box-shadow: 0 0 15px var(--p); }
      section { margin-top: 60px; }
      section h2 { font-size: 2rem; color: #fff; text-transform: uppercase; letter-spacing: 3px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 15px; position: relative; }
      section h2::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 100px; height: 3px; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .skill-tag { display: inline-block; padding: 6px 15px; background: rgba(0, 255, 255, 0.1); border: 1px solid var(--p); color: var(--p); margin: 0 10px 10px 0; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; }
      .timeline-item { padding: 25px; border-left: 2px solid var(--p); background: rgba(255,255,255,0.02); margin-bottom: 25px; position: relative; }
      .timeline-item::before { content: ''; position: absolute; left: -6px; top: 0; width: 10px; height: 10px; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .timeline-item h3 { margin: 0 0 5px; color: #fff; text-transform: uppercase; font-size: 1.3rem; }
      .company { color: var(--p); } .year { color: #888; font-size: 0.9rem; margin-bottom: 10px; display: inline-block; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 25px; background: rgba(0,0,0,0.5); border: 1px solid #333; transition: 0.3s; position: relative; overflow: hidden; }
      .project-card:hover { border-color: var(--p); box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.1); }
      .project-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 15px; height: 15px; background: var(--p); clip-path: polygon(100% 0, 0% 100%, 100% 100%); }
      .project-card h3 { margin-top: 0; color: #fff; text-transform: uppercase; }
      .project-card a { display: inline-block; padding: 8px 20px; background: var(--p); color: #000; text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 15px; }
      footer { text-align: center; padding: 40px; color: #666; text-transform: uppercase; letter-spacing: 2px; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } }
    
 header { text-align: left; }`
  },
  cyberpunkmax: {
    name: 'Neon Cyber Max',
    css: `
      :root { --p: {COLOR}; --bg: #09090b; --text: #e4e4e7; }
      body { font-family: 'Rajdhani', sans-serif; background: var(--bg); color: var(--text); margin: 0; background-image: linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px); background-size: 30px 30px; }
      .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
      header { position: relative; padding: 60px 40px; border: 1px solid var(--p); background: rgba(0,0,0,0.6); box-shadow: 0 0 20px inset rgba(0, 255, 255, 0.2); }
      header::before { content: ''; position: absolute; top: -2px; left: -2px; width: 20px; height: 20px; border-top: 4px solid var(--p); border-left: 4px solid var(--p); }
      header::after { content: ''; position: absolute; bottom: -2px; right: -2px; width: 20px; height: 20px; border-bottom: 4px solid var(--p); border-right: 4px solid var(--p); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; object-fit: cover; clip-path: polygon(20% 0%, 100% 0, 100% 80%, 80% 100%, 0 100%, 0% 20%); border: 2px solid var(--p); filter: drop-shadow(0 0 10px var(--p)); }
      h1 { font-size: 3.5rem; margin: 0; color: #fff; text-shadow: 0 0 10px var(--p), 0 0 20px var(--p); text-transform: uppercase; letter-spacing: 2px; }
      .title { color: var(--p); font-size: 1.2rem; margin-top: 10px; text-transform: uppercase; letter-spacing: 4px; }
      .social-links a { display: inline-block; padding: 8px 20px; background: transparent; border: 1px solid var(--p); color: var(--p); text-decoration: none; text-transform: uppercase; font-weight: bold; margin-right: 15px; margin-top: 20px; transition: 0.3s; }
      .social-links a:hover { background: var(--p); color: #000; box-shadow: 0 0 15px var(--p); }
      section { margin-top: 60px; }
      section h2 { font-size: 2rem; color: #fff; text-transform: uppercase; letter-spacing: 3px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 15px; position: relative; }
      section h2::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 100px; height: 3px; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .skill-tag { display: inline-block; padding: 6px 15px; background: rgba(0, 255, 255, 0.1); border: 1px solid var(--p); color: var(--p); margin: 0 10px 10px 0; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; }
      .timeline-item { padding: 25px; border-left: 2px solid var(--p); background: rgba(255,255,255,0.02); margin-bottom: 25px; position: relative; }
      .timeline-item::before { content: ''; position: absolute; left: -6px; top: 0; width: 10px; height: 10px; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .timeline-item h3 { margin: 0 0 5px; color: #fff; text-transform: uppercase; font-size: 1.3rem; }
      .company { color: var(--p); } .year { color: #888; font-size: 0.9rem; margin-bottom: 10px; display: inline-block; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 25px; background: rgba(0,0,0,0.5); border: 1px solid #333; transition: 0.3s; position: relative; overflow: hidden; }
      .project-card:hover { border-color: var(--p); box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.1); }
      .project-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 15px; height: 15px; background: var(--p); clip-path: polygon(100% 0, 0% 100%, 100% 100%); }
      .project-card h3 { margin-top: 0; color: #fff; text-transform: uppercase; }
      .project-card a { display: inline-block; padding: 8px 20px; background: var(--p); color: #000; text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 15px; }
      footer { text-align: center; padding: 40px; color: #666; text-transform: uppercase; letter-spacing: 2px; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } }
    
 body { font-size: 1.05rem; }`
  },
  cyberpunklite: {
    name: 'Neon Cyber Lite',
    css: `
      :root { --p: {COLOR}; --bg: #09090b; --text: #e4e4e7; }
      body { font-family: 'Rajdhani', sans-serif; background: var(--bg); color: var(--text); margin: 0; background-image: linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px); background-size: 30px 30px; }
      .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
      header { position: relative; padding: 60px 40px; border: 1px solid var(--p); background: rgba(0,0,0,0.6); box-shadow: 0 0 20px inset rgba(0, 255, 255, 0.2); }
      header::before { content: ''; position: absolute; top: -2px; left: -2px; width: 20px; height: 20px; border-top: 4px solid var(--p); border-left: 4px solid var(--p); }
      header::after { content: ''; position: absolute; bottom: -2px; right: -2px; width: 20px; height: 20px; border-bottom: 4px solid var(--p); border-right: 4px solid var(--p); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; object-fit: cover; clip-path: polygon(20% 0%, 100% 0, 100% 80%, 80% 100%, 0 100%, 0% 20%); border: 2px solid var(--p); filter: drop-shadow(0 0 10px var(--p)); }
      h1 { font-size: 3.5rem; margin: 0; color: #fff; text-shadow: 0 0 10px var(--p), 0 0 20px var(--p); text-transform: uppercase; letter-spacing: 2px; }
      .title { color: var(--p); font-size: 1.2rem; margin-top: 10px; text-transform: uppercase; letter-spacing: 4px; }
      .social-links a { display: inline-block; padding: 8px 20px; background: transparent; border: 1px solid var(--p); color: var(--p); text-decoration: none; text-transform: uppercase; font-weight: bold; margin-right: 15px; margin-top: 20px; transition: 0.3s; }
      .social-links a:hover { background: var(--p); color: #000; box-shadow: 0 0 15px var(--p); }
      section { margin-top: 60px; }
      section h2 { font-size: 2rem; color: #fff; text-transform: uppercase; letter-spacing: 3px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 15px; position: relative; }
      section h2::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 100px; height: 3px; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .skill-tag { display: inline-block; padding: 6px 15px; background: rgba(0, 255, 255, 0.1); border: 1px solid var(--p); color: var(--p); margin: 0 10px 10px 0; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; }
      .timeline-item { padding: 25px; border-left: 2px solid var(--p); background: rgba(255,255,255,0.02); margin-bottom: 25px; position: relative; }
      .timeline-item::before { content: ''; position: absolute; left: -6px; top: 0; width: 10px; height: 10px; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .timeline-item h3 { margin: 0 0 5px; color: #fff; text-transform: uppercase; font-size: 1.3rem; }
      .company { color: var(--p); } .year { color: #888; font-size: 0.9rem; margin-bottom: 10px; display: inline-block; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 25px; background: rgba(0,0,0,0.5); border: 1px solid #333; transition: 0.3s; position: relative; overflow: hidden; }
      .project-card:hover { border-color: var(--p); box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.1); }
      .project-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 15px; height: 15px; background: var(--p); clip-path: polygon(100% 0, 0% 100%, 100% 100%); }
      .project-card h3 { margin-top: 0; color: #fff; text-transform: uppercase; }
      .project-card a { display: inline-block; padding: 8px 20px; background: var(--p); color: #000; text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 15px; }
      footer { text-align: center; padding: 40px; color: #666; text-transform: uppercase; letter-spacing: 2px; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } }
    
 .social-links a { text-transform: uppercase; }`
  },
  cyberpunkx: {
    name: 'Neon Cyber X',
    css: `
      :root { --p: {COLOR}; --bg: #09090b; --text: #e4e4e7; }
      body { font-family: 'Rajdhani', sans-serif; background: var(--bg); color: var(--text); margin: 0; background-image: linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px); background-size: 30px 30px; }
      .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
      header { position: relative; padding: 60px 40px; border: 1px solid var(--p); background: rgba(0,0,0,0.6); box-shadow: 0 0 20px inset rgba(0, 255, 255, 0.2); }
      header::before { content: ''; position: absolute; top: -2px; left: -2px; width: 20px; height: 20px; border-top: 4px solid var(--p); border-left: 4px solid var(--p); }
      header::after { content: ''; position: absolute; bottom: -2px; right: -2px; width: 20px; height: 20px; border-bottom: 4px solid var(--p); border-right: 4px solid var(--p); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; object-fit: cover; clip-path: polygon(20% 0%, 100% 0, 100% 80%, 80% 100%, 0 100%, 0% 20%); border: 2px solid var(--p); filter: drop-shadow(0 0 10px var(--p)); }
      h1 { font-size: 3.5rem; margin: 0; color: #fff; text-shadow: 0 0 10px var(--p), 0 0 20px var(--p); text-transform: uppercase; letter-spacing: 2px; }
      .title { color: var(--p); font-size: 1.2rem; margin-top: 10px; text-transform: uppercase; letter-spacing: 4px; }
      .social-links a { display: inline-block; padding: 8px 20px; background: transparent; border: 1px solid var(--p); color: var(--p); text-decoration: none; text-transform: uppercase; font-weight: bold; margin-right: 15px; margin-top: 20px; transition: 0.3s; }
      .social-links a:hover { background: var(--p); color: #000; box-shadow: 0 0 15px var(--p); }
      section { margin-top: 60px; }
      section h2 { font-size: 2rem; color: #fff; text-transform: uppercase; letter-spacing: 3px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 15px; position: relative; }
      section h2::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 100px; height: 3px; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .skill-tag { display: inline-block; padding: 6px 15px; background: rgba(0, 255, 255, 0.1); border: 1px solid var(--p); color: var(--p); margin: 0 10px 10px 0; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; }
      .timeline-item { padding: 25px; border-left: 2px solid var(--p); background: rgba(255,255,255,0.02); margin-bottom: 25px; position: relative; }
      .timeline-item::before { content: ''; position: absolute; left: -6px; top: 0; width: 10px; height: 10px; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .timeline-item h3 { margin: 0 0 5px; color: #fff; text-transform: uppercase; font-size: 1.3rem; }
      .company { color: var(--p); } .year { color: #888; font-size: 0.9rem; margin-bottom: 10px; display: inline-block; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 25px; background: rgba(0,0,0,0.5); border: 1px solid #333; transition: 0.3s; position: relative; overflow: hidden; }
      .project-card:hover { border-color: var(--p); box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.1); }
      .project-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 15px; height: 15px; background: var(--p); clip-path: polygon(100% 0, 0% 100%, 100% 100%); }
      .project-card h3 { margin-top: 0; color: #fff; text-transform: uppercase; }
      .project-card a { display: inline-block; padding: 8px 20px; background: var(--p); color: #000; text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 15px; }
      footer { text-align: center; padding: 40px; color: #666; text-transform: uppercase; letter-spacing: 2px; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } }
    
 header { text-align: left; }`
  },
  cyberpunkprime: {
    name: 'Neon Cyber Prime',
    css: `
      :root { --p: {COLOR}; --bg: #09090b; --text: #e4e4e7; }
      body { font-family: 'Rajdhani', sans-serif; background: var(--bg); color: var(--text); margin: 0; background-image: linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px); background-size: 30px 30px; }
      .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
      header { position: relative; padding: 60px 40px; border: 1px solid var(--p); background: rgba(0,0,0,0.6); box-shadow: 0 0 20px inset rgba(0, 255, 255, 0.2); }
      header::before { content: ''; position: absolute; top: -2px; left: -2px; width: 20px; height: 20px; border-top: 4px solid var(--p); border-left: 4px solid var(--p); }
      header::after { content: ''; position: absolute; bottom: -2px; right: -2px; width: 20px; height: 20px; border-bottom: 4px solid var(--p); border-right: 4px solid var(--p); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; object-fit: cover; clip-path: polygon(20% 0%, 100% 0, 100% 80%, 80% 100%, 0 100%, 0% 20%); border: 2px solid var(--p); filter: drop-shadow(0 0 10px var(--p)); }
      h1 { font-size: 3.5rem; margin: 0; color: #fff; text-shadow: 0 0 10px var(--p), 0 0 20px var(--p); text-transform: uppercase; letter-spacing: 2px; }
      .title { color: var(--p); font-size: 1.2rem; margin-top: 10px; text-transform: uppercase; letter-spacing: 4px; }
      .social-links a { display: inline-block; padding: 8px 20px; background: transparent; border: 1px solid var(--p); color: var(--p); text-decoration: none; text-transform: uppercase; font-weight: bold; margin-right: 15px; margin-top: 20px; transition: 0.3s; }
      .social-links a:hover { background: var(--p); color: #000; box-shadow: 0 0 15px var(--p); }
      section { margin-top: 60px; }
      section h2 { font-size: 2rem; color: #fff; text-transform: uppercase; letter-spacing: 3px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 15px; position: relative; }
      section h2::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 100px; height: 3px; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .skill-tag { display: inline-block; padding: 6px 15px; background: rgba(0, 255, 255, 0.1); border: 1px solid var(--p); color: var(--p); margin: 0 10px 10px 0; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; }
      .timeline-item { padding: 25px; border-left: 2px solid var(--p); background: rgba(255,255,255,0.02); margin-bottom: 25px; position: relative; }
      .timeline-item::before { content: ''; position: absolute; left: -6px; top: 0; width: 10px; height: 10px; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .timeline-item h3 { margin: 0 0 5px; color: #fff; text-transform: uppercase; font-size: 1.3rem; }
      .company { color: var(--p); } .year { color: #888; font-size: 0.9rem; margin-bottom: 10px; display: inline-block; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 25px; background: rgba(0,0,0,0.5); border: 1px solid #333; transition: 0.3s; position: relative; overflow: hidden; }
      .project-card:hover { border-color: var(--p); box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.1); }
      .project-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 15px; height: 15px; background: var(--p); clip-path: polygon(100% 0, 0% 100%, 100% 100%); }
      .project-card h3 { margin-top: 0; color: #fff; text-transform: uppercase; }
      .project-card a { display: inline-block; padding: 8px 20px; background: var(--p); color: #000; text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 15px; }
      footer { text-align: center; padding: 40px; color: #666; text-transform: uppercase; letter-spacing: 2px; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } }
    `
  },
  cyberpunkneo: {
    name: 'Neon Cyber Neo',
    css: `
      :root { --p: {COLOR}; --bg: #09090b; --text: #e4e4e7; }
      body { font-family: 'Rajdhani', sans-serif; background: var(--bg); color: var(--text); margin: 0; background-image: linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px); background-size: 30px 30px; }
      .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
      header { position: relative; padding: 60px 40px; border: 1px solid var(--p); background: rgba(0,0,0,0.6); box-shadow: 0 0 20px inset rgba(0, 255, 255, 0.2); }
      header::before { content: ''; position: absolute; top: -2px; left: -2px; width: 20px; height: 20px; border-top: 4px solid var(--p); border-left: 4px solid var(--p); }
      header::after { content: ''; position: absolute; bottom: -2px; right: -2px; width: 20px; height: 20px; border-bottom: 4px solid var(--p); border-right: 4px solid var(--p); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; object-fit: cover; clip-path: polygon(20% 0%, 100% 0, 100% 80%, 80% 100%, 0 100%, 0% 20%); border: 2px solid var(--p); filter: drop-shadow(0 0 10px var(--p)); }
      h1 { font-size: 3.5rem; margin: 0; color: #fff; text-shadow: 0 0 10px var(--p), 0 0 20px var(--p); text-transform: uppercase; letter-spacing: 2px; }
      .title { color: var(--p); font-size: 1.2rem; margin-top: 10px; text-transform: uppercase; letter-spacing: 4px; }
      .social-links a { display: inline-block; padding: 8px 20px; background: transparent; border: 1px solid var(--p); color: var(--p); text-decoration: none; text-transform: uppercase; font-weight: bold; margin-right: 15px; margin-top: 20px; transition: 0.3s; }
      .social-links a:hover { background: var(--p); color: #000; box-shadow: 0 0 15px var(--p); }
      section { margin-top: 60px; }
      section h2 { font-size: 2rem; color: #fff; text-transform: uppercase; letter-spacing: 3px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 15px; position: relative; }
      section h2::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 100px; height: 3px; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .skill-tag { display: inline-block; padding: 6px 15px; background: rgba(0, 255, 255, 0.1); border: 1px solid var(--p); color: var(--p); margin: 0 10px 10px 0; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; }
      .timeline-item { padding: 25px; border-left: 2px solid var(--p); background: rgba(255,255,255,0.02); margin-bottom: 25px; position: relative; }
      .timeline-item::before { content: ''; position: absolute; left: -6px; top: 0; width: 10px; height: 10px; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .timeline-item h3 { margin: 0 0 5px; color: #fff; text-transform: uppercase; font-size: 1.3rem; }
      .company { color: var(--p); } .year { color: #888; font-size: 0.9rem; margin-bottom: 10px; display: inline-block; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 25px; background: rgba(0,0,0,0.5); border: 1px solid #333; transition: 0.3s; position: relative; overflow: hidden; }
      .project-card:hover { border-color: var(--p); box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.1); }
      .project-card::after { content: ''; position: absolute; bottom: 0; right: 0; width: 15px; height: 15px; background: var(--p); clip-path: polygon(100% 0, 0% 100%, 100% 100%); }
      .project-card h3 { margin-top: 0; color: #fff; text-transform: uppercase; }
      .project-card a { display: inline-block; padding: 8px 20px; background: var(--p); color: #000; text-decoration: none; font-weight: bold; text-transform: uppercase; margin-top: 15px; }
      footer { text-align: center; padding: 40px; color: #666; text-transform: uppercase; letter-spacing: 2px; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } }
    
 body { font-size: 1.05rem; }`
  },
  minimal3dpro: {
    name: 'Minimal 3D Pro',
    css: `
      :root { --p: {COLOR}; --bg: #fafafa; --text: #222; }
      body { font-family: 'Space Grotesk', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; }
      .container { max-width: 900px; margin: 0 auto; }
      header { background: #fff; border: 2px solid #222; border-radius: 20px; padding: 50px; box-shadow: 8px 8px 0 #222; margin-bottom: 60px; }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 3px solid #222; box-shadow: 4px 4px 0 #222; object-fit: cover; }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; }
      .title { color: var(--p); font-size: 1.4rem; font-weight: 700; margin-top: 10px; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; border: 2px solid #222; border-radius: 16px; color: #222; text-decoration: none; font-weight: bold; margin-right: 15px; margin-top: 20px; box-shadow: 4px 4px 0 #222; transition: 0.1s; }
      .social-links a:active { transform: translate(4px, 4px); box-shadow: 0 0 0 #222; }
      section { margin-bottom: 60px; }
      section h2 { font-size: 2.2rem; border-bottom: 3px solid #222; padding-bottom: 10px; display: inline-block; margin-bottom: 30px; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: #fff; border: 2px solid #222; border-radius: 20px; margin: 0 10px 10px 0; font-weight: 600; box-shadow: 3px 3px 0 #222; }
      .timeline-item { padding: 30px; background: #fff; border: 2px solid #222; border-radius: 12px; margin-bottom: 25px; box-shadow: 6px 6px 0 #222; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.4rem; }
      .company { color: var(--p); font-weight: 700; } .year { color: #666; font-size: 0.9rem; font-weight: bold; padding: 4px 10px; border: 1px solid #ccc; border-radius: 20px; display: inline-block; margin-bottom: 15px; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 30px; background: #fff; border: 2px solid #222; border-radius: 12px; box-shadow: 6px 6px 0 #222; }
      .project-card h3 { margin-top: 0; font-size: 1.5rem; }
      .project-card a { display: inline-block; padding: 10px 20px; background: var(--p); color: #fff; border: 2px solid #222; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px; box-shadow: 4px 4px 0 #222; }
      footer { text-align: center; padding: 40px; font-weight: bold; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } }
    
 header { text-align: left; }
 body { font-size: 1.05rem; }
 .social-links a { text-transform: uppercase; }`
  },
  minimal3delite: {
    name: 'Minimal 3D Elite',
    css: `
      :root { --p: {COLOR}; --bg: #fafafa; --text: #222; }
      body { font-family: 'Space Grotesk', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; }
      .container { max-width: 900px; margin: 0 auto; }
      header { background: #fff; border: 2px solid #222; border-radius: 12px; padding: 50px; box-shadow: 8px 8px 0 #222; margin-bottom: 60px; }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 3px solid #222; box-shadow: 4px 4px 0 #222; object-fit: cover; }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; }
      .title { color: var(--p); font-size: 1.4rem; font-weight: 700; margin-top: 10px; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; border: 2px solid #222; border-radius: 8px; color: #222; text-decoration: none; font-weight: bold; margin-right: 15px; margin-top: 20px; box-shadow: 4px 4px 0 #222; transition: 0.1s; }
      .social-links a:active { transform: translate(4px, 4px); box-shadow: 0 0 0 #222; }
      section { margin-bottom: 60px; }
      section h2 { font-size: 2.2rem; border-bottom: 3px solid #222; padding-bottom: 10px; display: inline-block; margin-bottom: 30px; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: #fff; border: 2px solid #222; border-radius: 20px; margin: 0 10px 10px 0; font-weight: 600; box-shadow: 3px 3px 0 #222; }
      .timeline-item { padding: 30px; background: #fff; border: 2px solid #222; border-radius: 12px; margin-bottom: 25px; box-shadow: 6px 6px 0 #222; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.4rem; }
      .company { color: var(--p); font-weight: 700; } .year { color: #666; font-size: 0.9rem; font-weight: bold; padding: 4px 10px; border: 1px solid #ccc; border-radius: 20px; display: inline-block; margin-bottom: 15px; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 30px; background: #fff; border: 2px solid #222; border-radius: 12px; box-shadow: 6px 6px 0 #222; }
      .project-card h3 { margin-top: 0; font-size: 1.5rem; }
      .project-card a { display: inline-block; padding: 10px 20px; background: var(--p); color: #fff; border: 2px solid #222; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px; box-shadow: 4px 4px 0 #222; }
      footer { text-align: center; padding: 40px; font-weight: bold; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } }
    `
  },
  minimal3dplus: {
    name: 'Minimal 3D Plus',
    css: `
      :root { --p: {COLOR}; --bg: #fafafa; --text: #222; }
      body { font-family: 'Space Grotesk', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; }
      .container { max-width: 900px; margin: 0 auto; }
      header { background: #fff; border: 2px solid #222; border-radius: 20px; padding: 50px; box-shadow: 8px 8px 0 #222; margin-bottom: 60px; }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 3px solid #222; box-shadow: 4px 4px 0 #222; object-fit: cover; }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; }
      .title { color: var(--p); font-size: 1.4rem; font-weight: 700; margin-top: 10px; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; border: 2px solid #222; border-radius: 16px; color: #222; text-decoration: none; font-weight: bold; margin-right: 15px; margin-top: 20px; box-shadow: 4px 4px 0 #222; transition: 0.1s; }
      .social-links a:active { transform: translate(4px, 4px); box-shadow: 0 0 0 #222; }
      section { margin-bottom: 60px; }
      section h2 { font-size: 2.2rem; border-bottom: 3px solid #222; padding-bottom: 10px; display: inline-block; margin-bottom: 30px; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: #fff; border: 2px solid #222; border-radius: 20px; margin: 0 10px 10px 0; font-weight: 600; box-shadow: 3px 3px 0 #222; }
      .timeline-item { padding: 30px; background: #fff; border: 2px solid #222; border-radius: 12px; margin-bottom: 25px; box-shadow: 6px 6px 0 #222; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.4rem; }
      .company { color: var(--p); font-weight: 700; } .year { color: #666; font-size: 0.9rem; font-weight: bold; padding: 4px 10px; border: 1px solid #ccc; border-radius: 20px; display: inline-block; margin-bottom: 15px; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 30px; background: #fff; border: 2px solid #222; border-radius: 12px; box-shadow: 6px 6px 0 #222; }
      .project-card h3 { margin-top: 0; font-size: 1.5rem; }
      .project-card a { display: inline-block; padding: 10px 20px; background: var(--p); color: #fff; border: 2px solid #222; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px; box-shadow: 4px 4px 0 #222; }
      footer { text-align: center; padding: 40px; font-weight: bold; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } }
    `
  },
  minimal3dultra: {
    name: 'Minimal 3D Ultra',
    css: `
      :root { --p: {COLOR}; --bg: #fafafa; --text: #222; }
      body { font-family: 'Space Grotesk', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; }
      .container { max-width: 900px; margin: 0 auto; }
      header { background: #fff; border: 2px solid #222; border-radius: 12px; padding: 50px; box-shadow: 8px 8px 0 #222; margin-bottom: 60px; }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 3px solid #222; box-shadow: 4px 4px 0 #222; object-fit: cover; }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; }
      .title { color: var(--p); font-size: 1.4rem; font-weight: 700; margin-top: 10px; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; border: 2px solid #222; border-radius: 8px; color: #222; text-decoration: none; font-weight: bold; margin-right: 15px; margin-top: 20px; box-shadow: 4px 4px 0 #222; transition: 0.1s; }
      .social-links a:active { transform: translate(4px, 4px); box-shadow: 0 0 0 #222; }
      section { margin-bottom: 60px; }
      section h2 { font-size: 2.2rem; border-bottom: 3px solid #222; padding-bottom: 10px; display: inline-block; margin-bottom: 30px; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: #fff; border: 2px solid #222; border-radius: 20px; margin: 0 10px 10px 0; font-weight: 600; box-shadow: 3px 3px 0 #222; }
      .timeline-item { padding: 30px; background: #fff; border: 2px solid #222; border-radius: 12px; margin-bottom: 25px; box-shadow: 6px 6px 0 #222; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.4rem; }
      .company { color: var(--p); font-weight: 700; } .year { color: #666; font-size: 0.9rem; font-weight: bold; padding: 4px 10px; border: 1px solid #ccc; border-radius: 20px; display: inline-block; margin-bottom: 15px; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 30px; background: #fff; border: 2px solid #222; border-radius: 12px; box-shadow: 6px 6px 0 #222; }
      .project-card h3 { margin-top: 0; font-size: 1.5rem; }
      .project-card a { display: inline-block; padding: 10px 20px; background: var(--p); color: #fff; border: 2px solid #222; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px; box-shadow: 4px 4px 0 #222; }
      footer { text-align: center; padding: 40px; font-weight: bold; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } }
    
 header { text-align: left; }`
  },
  minimal3dmax: {
    name: 'Minimal 3D Max',
    css: `
      :root { --p: {COLOR}; --bg: #fafafa; --text: #222; }
      body { font-family: 'Space Grotesk', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; }
      .container { max-width: 900px; margin: 0 auto; }
      header { background: #fff; border: 2px solid #222; border-radius: 20px; padding: 50px; box-shadow: 8px 8px 0 #222; margin-bottom: 60px; }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 3px solid #222; box-shadow: 4px 4px 0 #222; object-fit: cover; }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; }
      .title { color: var(--p); font-size: 1.4rem; font-weight: 700; margin-top: 10px; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; border: 2px solid #222; border-radius: 16px; color: #222; text-decoration: none; font-weight: bold; margin-right: 15px; margin-top: 20px; box-shadow: 4px 4px 0 #222; transition: 0.1s; }
      .social-links a:active { transform: translate(4px, 4px); box-shadow: 0 0 0 #222; }
      section { margin-bottom: 60px; }
      section h2 { font-size: 2.2rem; border-bottom: 3px solid #222; padding-bottom: 10px; display: inline-block; margin-bottom: 30px; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: #fff; border: 2px solid #222; border-radius: 20px; margin: 0 10px 10px 0; font-weight: 600; box-shadow: 3px 3px 0 #222; }
      .timeline-item { padding: 30px; background: #fff; border: 2px solid #222; border-radius: 12px; margin-bottom: 25px; box-shadow: 6px 6px 0 #222; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.4rem; }
      .company { color: var(--p); font-weight: 700; } .year { color: #666; font-size: 0.9rem; font-weight: bold; padding: 4px 10px; border: 1px solid #ccc; border-radius: 20px; display: inline-block; margin-bottom: 15px; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 30px; background: #fff; border: 2px solid #222; border-radius: 12px; box-shadow: 6px 6px 0 #222; }
      .project-card h3 { margin-top: 0; font-size: 1.5rem; }
      .project-card a { display: inline-block; padding: 10px 20px; background: var(--p); color: #fff; border: 2px solid #222; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px; box-shadow: 4px 4px 0 #222; }
      footer { text-align: center; padding: 40px; font-weight: bold; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } }
    
 body { font-size: 1.05rem; }`
  },
  minimal3dlite: {
    name: 'Minimal 3D Lite',
    css: `
      :root { --p: {COLOR}; --bg: #fafafa; --text: #222; }
      body { font-family: 'Space Grotesk', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; }
      .container { max-width: 900px; margin: 0 auto; }
      header { background: #fff; border: 2px solid #222; border-radius: 12px; padding: 50px; box-shadow: 8px 8px 0 #222; margin-bottom: 60px; }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 3px solid #222; box-shadow: 4px 4px 0 #222; object-fit: cover; }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; }
      .title { color: var(--p); font-size: 1.4rem; font-weight: 700; margin-top: 10px; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; border: 2px solid #222; border-radius: 8px; color: #222; text-decoration: none; font-weight: bold; margin-right: 15px; margin-top: 20px; box-shadow: 4px 4px 0 #222; transition: 0.1s; }
      .social-links a:active { transform: translate(4px, 4px); box-shadow: 0 0 0 #222; }
      section { margin-bottom: 60px; }
      section h2 { font-size: 2.2rem; border-bottom: 3px solid #222; padding-bottom: 10px; display: inline-block; margin-bottom: 30px; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: #fff; border: 2px solid #222; border-radius: 20px; margin: 0 10px 10px 0; font-weight: 600; box-shadow: 3px 3px 0 #222; }
      .timeline-item { padding: 30px; background: #fff; border: 2px solid #222; border-radius: 12px; margin-bottom: 25px; box-shadow: 6px 6px 0 #222; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.4rem; }
      .company { color: var(--p); font-weight: 700; } .year { color: #666; font-size: 0.9rem; font-weight: bold; padding: 4px 10px; border: 1px solid #ccc; border-radius: 20px; display: inline-block; margin-bottom: 15px; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 30px; background: #fff; border: 2px solid #222; border-radius: 12px; box-shadow: 6px 6px 0 #222; }
      .project-card h3 { margin-top: 0; font-size: 1.5rem; }
      .project-card a { display: inline-block; padding: 10px 20px; background: var(--p); color: #fff; border: 2px solid #222; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px; box-shadow: 4px 4px 0 #222; }
      footer { text-align: center; padding: 40px; font-weight: bold; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } }
    
 .social-links a { text-transform: uppercase; }`
  },
  minimal3dx: {
    name: 'Minimal 3D X',
    css: `
      :root { --p: {COLOR}; --bg: #fafafa; --text: #222; }
      body { font-family: 'Space Grotesk', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; }
      .container { max-width: 900px; margin: 0 auto; }
      header { background: #fff; border: 2px solid #222; border-radius: 20px; padding: 50px; box-shadow: 8px 8px 0 #222; margin-bottom: 60px; }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 3px solid #222; box-shadow: 4px 4px 0 #222; object-fit: cover; }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; }
      .title { color: var(--p); font-size: 1.4rem; font-weight: 700; margin-top: 10px; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; border: 2px solid #222; border-radius: 16px; color: #222; text-decoration: none; font-weight: bold; margin-right: 15px; margin-top: 20px; box-shadow: 4px 4px 0 #222; transition: 0.1s; }
      .social-links a:active { transform: translate(4px, 4px); box-shadow: 0 0 0 #222; }
      section { margin-bottom: 60px; }
      section h2 { font-size: 2.2rem; border-bottom: 3px solid #222; padding-bottom: 10px; display: inline-block; margin-bottom: 30px; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: #fff; border: 2px solid #222; border-radius: 20px; margin: 0 10px 10px 0; font-weight: 600; box-shadow: 3px 3px 0 #222; }
      .timeline-item { padding: 30px; background: #fff; border: 2px solid #222; border-radius: 12px; margin-bottom: 25px; box-shadow: 6px 6px 0 #222; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.4rem; }
      .company { color: var(--p); font-weight: 700; } .year { color: #666; font-size: 0.9rem; font-weight: bold; padding: 4px 10px; border: 1px solid #ccc; border-radius: 20px; display: inline-block; margin-bottom: 15px; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 30px; background: #fff; border: 2px solid #222; border-radius: 12px; box-shadow: 6px 6px 0 #222; }
      .project-card h3 { margin-top: 0; font-size: 1.5rem; }
      .project-card a { display: inline-block; padding: 10px 20px; background: var(--p); color: #fff; border: 2px solid #222; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px; box-shadow: 4px 4px 0 #222; }
      footer { text-align: center; padding: 40px; font-weight: bold; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } }
    
 header { text-align: left; }`
  },
  minimal3dprime: {
    name: 'Minimal 3D Prime',
    css: `
      :root { --p: {COLOR}; --bg: #fafafa; --text: #222; }
      body { font-family: 'Space Grotesk', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; }
      .container { max-width: 900px; margin: 0 auto; }
      header { background: #fff; border: 2px solid #222; border-radius: 12px; padding: 50px; box-shadow: 8px 8px 0 #222; margin-bottom: 60px; }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 3px solid #222; box-shadow: 4px 4px 0 #222; object-fit: cover; }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; }
      .title { color: var(--p); font-size: 1.4rem; font-weight: 700; margin-top: 10px; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; border: 2px solid #222; border-radius: 8px; color: #222; text-decoration: none; font-weight: bold; margin-right: 15px; margin-top: 20px; box-shadow: 4px 4px 0 #222; transition: 0.1s; }
      .social-links a:active { transform: translate(4px, 4px); box-shadow: 0 0 0 #222; }
      section { margin-bottom: 60px; }
      section h2 { font-size: 2.2rem; border-bottom: 3px solid #222; padding-bottom: 10px; display: inline-block; margin-bottom: 30px; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: #fff; border: 2px solid #222; border-radius: 20px; margin: 0 10px 10px 0; font-weight: 600; box-shadow: 3px 3px 0 #222; }
      .timeline-item { padding: 30px; background: #fff; border: 2px solid #222; border-radius: 12px; margin-bottom: 25px; box-shadow: 6px 6px 0 #222; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.4rem; }
      .company { color: var(--p); font-weight: 700; } .year { color: #666; font-size: 0.9rem; font-weight: bold; padding: 4px 10px; border: 1px solid #ccc; border-radius: 20px; display: inline-block; margin-bottom: 15px; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 30px; background: #fff; border: 2px solid #222; border-radius: 12px; box-shadow: 6px 6px 0 #222; }
      .project-card h3 { margin-top: 0; font-size: 1.5rem; }
      .project-card a { display: inline-block; padding: 10px 20px; background: var(--p); color: #fff; border: 2px solid #222; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px; box-shadow: 4px 4px 0 #222; }
      footer { text-align: center; padding: 40px; font-weight: bold; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } }
    `
  },
  minimal3dneo: {
    name: 'Minimal 3D Neo',
    css: `
      :root { --p: {COLOR}; --bg: #fafafa; --text: #222; }
      body { font-family: 'Space Grotesk', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 40px 20px; }
      .container { max-width: 900px; margin: 0 auto; }
      header { background: #fff; border: 2px solid #222; border-radius: 20px; padding: 50px; box-shadow: 8px 8px 0 #222; margin-bottom: 60px; }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 3px solid #222; box-shadow: 4px 4px 0 #222; object-fit: cover; }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; }
      .title { color: var(--p); font-size: 1.4rem; font-weight: 700; margin-top: 10px; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; border: 2px solid #222; border-radius: 16px; color: #222; text-decoration: none; font-weight: bold; margin-right: 15px; margin-top: 20px; box-shadow: 4px 4px 0 #222; transition: 0.1s; }
      .social-links a:active { transform: translate(4px, 4px); box-shadow: 0 0 0 #222; }
      section { margin-bottom: 60px; }
      section h2 { font-size: 2.2rem; border-bottom: 3px solid #222; padding-bottom: 10px; display: inline-block; margin-bottom: 30px; }
      .skill-tag { display: inline-block; padding: 8px 16px; background: #fff; border: 2px solid #222; border-radius: 20px; margin: 0 10px 10px 0; font-weight: 600; box-shadow: 3px 3px 0 #222; }
      .timeline-item { padding: 30px; background: #fff; border: 2px solid #222; border-radius: 12px; margin-bottom: 25px; box-shadow: 6px 6px 0 #222; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.4rem; }
      .company { color: var(--p); font-weight: 700; } .year { color: #666; font-size: 0.9rem; font-weight: bold; padding: 4px 10px; border: 1px solid #ccc; border-radius: 20px; display: inline-block; margin-bottom: 15px; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 30px; background: #fff; border: 2px solid #222; border-radius: 12px; box-shadow: 6px 6px 0 #222; }
      .project-card h3 { margin-top: 0; font-size: 1.5rem; }
      .project-card a { display: inline-block; padding: 10px 20px; background: var(--p); color: #fff; border: 2px solid #222; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px; box-shadow: 4px 4px 0 #222; }
      footer { text-align: center; padding: 40px; font-weight: bold; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } }
    
 body { font-size: 1.05rem; }`
  },
  darkgradientpro: {
    name: 'Dark Sleek Pro',
    css: `
      :root { --p: {COLOR}; --bg: #0f1115; --text: #e2e8f0; }
      body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; }
      .container { max-width: 800px; margin: 0 auto; padding: 0 20px; }
      header { padding: 120px 20px 80px; text-align: center; background: radial-gradient(circle at top, rgba(255,255,255,0.05) 0%, transparent 70%); border-bottom: 1px solid rgba(255,255,255,0.05); }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 25px; }
      .header-photo img { width: 130px; height: 130px; border-radius: 50%; object-fit: cover; box-shadow: 0 0 30px rgba(0,0,0,0.5); border: 2px solid rgba(255,255,255,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; background: linear-gradient(to right, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 500; margin-top: 10px; letter-spacing: 1px; }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 10px 25px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 30px; color: #fff; text-decoration: none; font-size: 0.9rem; margin: 0 8px; transition: 0.3s; }
      .social-links a:hover { background: var(--p); border-color: var(--p); }
      section { padding: 60px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
      section h2 { font-size: 2rem; color: #fff; margin-bottom: 40px; display: flex; align-items: center; gap: 15px; }
      section h2::after { content: ''; flex: 1; height: 1px; background: linear-gradient(to right, rgba(255,255,255,0.1), transparent); }
      .skill-tag { display: inline-block; padding: 8px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; margin: 0 10px 10px 0; font-size: 0.9rem; color: #94a3b8; }
      .timeline-item { padding-left: 30px; border-left: 2px solid rgba(255,255,255,0.05); position: relative; margin-bottom: 40px; }
      .timeline-dot { position: absolute; left: -6px; top: 5px; width: 10px; height: 10px; border-radius: 50%; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .timeline-item h3 { margin: 0 0 5px; color: #fff; font-size: 1.2rem; }
      .company { color: #94a3b8; font-weight: 400; } .year { color: var(--p); font-size: 0.85rem; font-weight: 600; margin-bottom: 15px; display: block; }
      .projects-grid { display: grid; grid-template-columns: 1fr; gap: 25px; }
      .project-card { padding: 30px; background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, transparent 100%); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; }
      .project-card h3 { margin-top: 0; color: #fff; font-size: 1.4rem; }
      .project-card p { color: #94a3b8; }
      .project-card a { display: inline-block; padding: 10px 20px; background: rgba(255,255,255,0.05); color: #fff; text-decoration: none; border-radius: 8px; font-size: 0.9rem; margin-top: 15px; transition: 0.3s; }
      .project-card a:hover { background: var(--p); }
      footer { text-align: center; padding: 40px; color: #64748b; font-size: 0.9rem; }
    
 header { text-align: left; }
 body { font-size: 1.05rem; }
 .social-links a { text-transform: uppercase; }`
  },
  darkgradientelite: {
    name: 'Dark Sleek Elite',
    css: `
      :root { --p: {COLOR}; --bg: #0f1115; --text: #e2e8f0; }
      body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; }
      .container { max-width: 800px; margin: 0 auto; padding: 0 20px; }
      header { padding: 120px 20px 80px; text-align: center; background: radial-gradient(circle at top, rgba(255,255,255,0.05) 0%, transparent 70%); border-bottom: 1px solid rgba(255,255,255,0.05); }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 25px; }
      .header-photo img { width: 130px; height: 130px; border-radius: 50%; object-fit: cover; box-shadow: 0 0 30px rgba(0,0,0,0.5); border: 2px solid rgba(255,255,255,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; background: linear-gradient(to right, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 500; margin-top: 10px; letter-spacing: 1px; }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 10px 25px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 30px; color: #fff; text-decoration: none; font-size: 0.9rem; margin: 0 8px; transition: 0.3s; }
      .social-links a:hover { background: var(--p); border-color: var(--p); }
      section { padding: 60px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
      section h2 { font-size: 2rem; color: #fff; margin-bottom: 40px; display: flex; align-items: center; gap: 15px; }
      section h2::after { content: ''; flex: 1; height: 1px; background: linear-gradient(to right, rgba(255,255,255,0.1), transparent); }
      .skill-tag { display: inline-block; padding: 8px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; margin: 0 10px 10px 0; font-size: 0.9rem; color: #94a3b8; }
      .timeline-item { padding-left: 30px; border-left: 2px solid rgba(255,255,255,0.05); position: relative; margin-bottom: 40px; }
      .timeline-dot { position: absolute; left: -6px; top: 5px; width: 10px; height: 10px; border-radius: 50%; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .timeline-item h3 { margin: 0 0 5px; color: #fff; font-size: 1.2rem; }
      .company { color: #94a3b8; font-weight: 400; } .year { color: var(--p); font-size: 0.85rem; font-weight: 600; margin-bottom: 15px; display: block; }
      .projects-grid { display: grid; grid-template-columns: 1fr; gap: 25px; }
      .project-card { padding: 30px; background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, transparent 100%); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; }
      .project-card h3 { margin-top: 0; color: #fff; font-size: 1.4rem; }
      .project-card p { color: #94a3b8; }
      .project-card a { display: inline-block; padding: 10px 20px; background: rgba(255,255,255,0.05); color: #fff; text-decoration: none; border-radius: 8px; font-size: 0.9rem; margin-top: 15px; transition: 0.3s; }
      .project-card a:hover { background: var(--p); }
      footer { text-align: center; padding: 40px; color: #64748b; font-size: 0.9rem; }
    `
  },
  darkgradientplus: {
    name: 'Dark Sleek Plus',
    css: `
      :root { --p: {COLOR}; --bg: #0f1115; --text: #e2e8f0; }
      body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; }
      .container { max-width: 800px; margin: 0 auto; padding: 0 20px; }
      header { padding: 120px 20px 80px; text-align: center; background: radial-gradient(circle at top, rgba(255,255,255,0.05) 0%, transparent 70%); border-bottom: 1px solid rgba(255,255,255,0.05); }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 25px; }
      .header-photo img { width: 130px; height: 130px; border-radius: 50%; object-fit: cover; box-shadow: 0 0 30px rgba(0,0,0,0.5); border: 2px solid rgba(255,255,255,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; background: linear-gradient(to right, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 500; margin-top: 10px; letter-spacing: 1px; }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 10px 25px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 30px; color: #fff; text-decoration: none; font-size: 0.9rem; margin: 0 8px; transition: 0.3s; }
      .social-links a:hover { background: var(--p); border-color: var(--p); }
      section { padding: 60px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
      section h2 { font-size: 2rem; color: #fff; margin-bottom: 40px; display: flex; align-items: center; gap: 15px; }
      section h2::after { content: ''; flex: 1; height: 1px; background: linear-gradient(to right, rgba(255,255,255,0.1), transparent); }
      .skill-tag { display: inline-block; padding: 8px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; margin: 0 10px 10px 0; font-size: 0.9rem; color: #94a3b8; }
      .timeline-item { padding-left: 30px; border-left: 2px solid rgba(255,255,255,0.05); position: relative; margin-bottom: 40px; }
      .timeline-dot { position: absolute; left: -6px; top: 5px; width: 10px; height: 10px; border-radius: 50%; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .timeline-item h3 { margin: 0 0 5px; color: #fff; font-size: 1.2rem; }
      .company { color: #94a3b8; font-weight: 400; } .year { color: var(--p); font-size: 0.85rem; font-weight: 600; margin-bottom: 15px; display: block; }
      .projects-grid { display: grid; grid-template-columns: 1fr; gap: 25px; }
      .project-card { padding: 30px; background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, transparent 100%); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; }
      .project-card h3 { margin-top: 0; color: #fff; font-size: 1.4rem; }
      .project-card p { color: #94a3b8; }
      .project-card a { display: inline-block; padding: 10px 20px; background: rgba(255,255,255,0.05); color: #fff; text-decoration: none; border-radius: 8px; font-size: 0.9rem; margin-top: 15px; transition: 0.3s; }
      .project-card a:hover { background: var(--p); }
      footer { text-align: center; padding: 40px; color: #64748b; font-size: 0.9rem; }
    `
  },
  darkgradientultra: {
    name: 'Dark Sleek Ultra',
    css: `
      :root { --p: {COLOR}; --bg: #0f1115; --text: #e2e8f0; }
      body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; }
      .container { max-width: 800px; margin: 0 auto; padding: 0 20px; }
      header { padding: 120px 20px 80px; text-align: center; background: radial-gradient(circle at top, rgba(255,255,255,0.05) 0%, transparent 70%); border-bottom: 1px solid rgba(255,255,255,0.05); }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 25px; }
      .header-photo img { width: 130px; height: 130px; border-radius: 50%; object-fit: cover; box-shadow: 0 0 30px rgba(0,0,0,0.5); border: 2px solid rgba(255,255,255,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; background: linear-gradient(to right, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 500; margin-top: 10px; letter-spacing: 1px; }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 10px 25px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 30px; color: #fff; text-decoration: none; font-size: 0.9rem; margin: 0 8px; transition: 0.3s; }
      .social-links a:hover { background: var(--p); border-color: var(--p); }
      section { padding: 60px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
      section h2 { font-size: 2rem; color: #fff; margin-bottom: 40px; display: flex; align-items: center; gap: 15px; }
      section h2::after { content: ''; flex: 1; height: 1px; background: linear-gradient(to right, rgba(255,255,255,0.1), transparent); }
      .skill-tag { display: inline-block; padding: 8px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; margin: 0 10px 10px 0; font-size: 0.9rem; color: #94a3b8; }
      .timeline-item { padding-left: 30px; border-left: 2px solid rgba(255,255,255,0.05); position: relative; margin-bottom: 40px; }
      .timeline-dot { position: absolute; left: -6px; top: 5px; width: 10px; height: 10px; border-radius: 50%; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .timeline-item h3 { margin: 0 0 5px; color: #fff; font-size: 1.2rem; }
      .company { color: #94a3b8; font-weight: 400; } .year { color: var(--p); font-size: 0.85rem; font-weight: 600; margin-bottom: 15px; display: block; }
      .projects-grid { display: grid; grid-template-columns: 1fr; gap: 25px; }
      .project-card { padding: 30px; background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, transparent 100%); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; }
      .project-card h3 { margin-top: 0; color: #fff; font-size: 1.4rem; }
      .project-card p { color: #94a3b8; }
      .project-card a { display: inline-block; padding: 10px 20px; background: rgba(255,255,255,0.05); color: #fff; text-decoration: none; border-radius: 8px; font-size: 0.9rem; margin-top: 15px; transition: 0.3s; }
      .project-card a:hover { background: var(--p); }
      footer { text-align: center; padding: 40px; color: #64748b; font-size: 0.9rem; }
    
 header { text-align: left; }`
  },
  darkgradientmax: {
    name: 'Dark Sleek Max',
    css: `
      :root { --p: {COLOR}; --bg: #0f1115; --text: #e2e8f0; }
      body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; }
      .container { max-width: 800px; margin: 0 auto; padding: 0 20px; }
      header { padding: 120px 20px 80px; text-align: center; background: radial-gradient(circle at top, rgba(255,255,255,0.05) 0%, transparent 70%); border-bottom: 1px solid rgba(255,255,255,0.05); }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 25px; }
      .header-photo img { width: 130px; height: 130px; border-radius: 50%; object-fit: cover; box-shadow: 0 0 30px rgba(0,0,0,0.5); border: 2px solid rgba(255,255,255,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; background: linear-gradient(to right, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 500; margin-top: 10px; letter-spacing: 1px; }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 10px 25px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 30px; color: #fff; text-decoration: none; font-size: 0.9rem; margin: 0 8px; transition: 0.3s; }
      .social-links a:hover { background: var(--p); border-color: var(--p); }
      section { padding: 60px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
      section h2 { font-size: 2rem; color: #fff; margin-bottom: 40px; display: flex; align-items: center; gap: 15px; }
      section h2::after { content: ''; flex: 1; height: 1px; background: linear-gradient(to right, rgba(255,255,255,0.1), transparent); }
      .skill-tag { display: inline-block; padding: 8px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; margin: 0 10px 10px 0; font-size: 0.9rem; color: #94a3b8; }
      .timeline-item { padding-left: 30px; border-left: 2px solid rgba(255,255,255,0.05); position: relative; margin-bottom: 40px; }
      .timeline-dot { position: absolute; left: -6px; top: 5px; width: 10px; height: 10px; border-radius: 50%; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .timeline-item h3 { margin: 0 0 5px; color: #fff; font-size: 1.2rem; }
      .company { color: #94a3b8; font-weight: 400; } .year { color: var(--p); font-size: 0.85rem; font-weight: 600; margin-bottom: 15px; display: block; }
      .projects-grid { display: grid; grid-template-columns: 1fr; gap: 25px; }
      .project-card { padding: 30px; background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, transparent 100%); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; }
      .project-card h3 { margin-top: 0; color: #fff; font-size: 1.4rem; }
      .project-card p { color: #94a3b8; }
      .project-card a { display: inline-block; padding: 10px 20px; background: rgba(255,255,255,0.05); color: #fff; text-decoration: none; border-radius: 8px; font-size: 0.9rem; margin-top: 15px; transition: 0.3s; }
      .project-card a:hover { background: var(--p); }
      footer { text-align: center; padding: 40px; color: #64748b; font-size: 0.9rem; }
    
 body { font-size: 1.05rem; }`
  },
  darkgradientlite: {
    name: 'Dark Sleek Lite',
    css: `
      :root { --p: {COLOR}; --bg: #0f1115; --text: #e2e8f0; }
      body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; }
      .container { max-width: 800px; margin: 0 auto; padding: 0 20px; }
      header { padding: 120px 20px 80px; text-align: center; background: radial-gradient(circle at top, rgba(255,255,255,0.05) 0%, transparent 70%); border-bottom: 1px solid rgba(255,255,255,0.05); }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 25px; }
      .header-photo img { width: 130px; height: 130px; border-radius: 50%; object-fit: cover; box-shadow: 0 0 30px rgba(0,0,0,0.5); border: 2px solid rgba(255,255,255,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; background: linear-gradient(to right, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 500; margin-top: 10px; letter-spacing: 1px; }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 10px 25px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 30px; color: #fff; text-decoration: none; font-size: 0.9rem; margin: 0 8px; transition: 0.3s; }
      .social-links a:hover { background: var(--p); border-color: var(--p); }
      section { padding: 60px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
      section h2 { font-size: 2rem; color: #fff; margin-bottom: 40px; display: flex; align-items: center; gap: 15px; }
      section h2::after { content: ''; flex: 1; height: 1px; background: linear-gradient(to right, rgba(255,255,255,0.1), transparent); }
      .skill-tag { display: inline-block; padding: 8px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; margin: 0 10px 10px 0; font-size: 0.9rem; color: #94a3b8; }
      .timeline-item { padding-left: 30px; border-left: 2px solid rgba(255,255,255,0.05); position: relative; margin-bottom: 40px; }
      .timeline-dot { position: absolute; left: -6px; top: 5px; width: 10px; height: 10px; border-radius: 50%; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .timeline-item h3 { margin: 0 0 5px; color: #fff; font-size: 1.2rem; }
      .company { color: #94a3b8; font-weight: 400; } .year { color: var(--p); font-size: 0.85rem; font-weight: 600; margin-bottom: 15px; display: block; }
      .projects-grid { display: grid; grid-template-columns: 1fr; gap: 25px; }
      .project-card { padding: 30px; background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, transparent 100%); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; }
      .project-card h3 { margin-top: 0; color: #fff; font-size: 1.4rem; }
      .project-card p { color: #94a3b8; }
      .project-card a { display: inline-block; padding: 10px 20px; background: rgba(255,255,255,0.05); color: #fff; text-decoration: none; border-radius: 8px; font-size: 0.9rem; margin-top: 15px; transition: 0.3s; }
      .project-card a:hover { background: var(--p); }
      footer { text-align: center; padding: 40px; color: #64748b; font-size: 0.9rem; }
    
 .social-links a { text-transform: uppercase; }`
  },
  darkgradientx: {
    name: 'Dark Sleek X',
    css: `
      :root { --p: {COLOR}; --bg: #0f1115; --text: #e2e8f0; }
      body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; }
      .container { max-width: 800px; margin: 0 auto; padding: 0 20px; }
      header { padding: 120px 20px 80px; text-align: center; background: radial-gradient(circle at top, rgba(255,255,255,0.05) 0%, transparent 70%); border-bottom: 1px solid rgba(255,255,255,0.05); }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 25px; }
      .header-photo img { width: 130px; height: 130px; border-radius: 50%; object-fit: cover; box-shadow: 0 0 30px rgba(0,0,0,0.5); border: 2px solid rgba(255,255,255,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; background: linear-gradient(to right, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 500; margin-top: 10px; letter-spacing: 1px; }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 10px 25px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 30px; color: #fff; text-decoration: none; font-size: 0.9rem; margin: 0 8px; transition: 0.3s; }
      .social-links a:hover { background: var(--p); border-color: var(--p); }
      section { padding: 60px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
      section h2 { font-size: 2rem; color: #fff; margin-bottom: 40px; display: flex; align-items: center; gap: 15px; }
      section h2::after { content: ''; flex: 1; height: 1px; background: linear-gradient(to right, rgba(255,255,255,0.1), transparent); }
      .skill-tag { display: inline-block; padding: 8px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; margin: 0 10px 10px 0; font-size: 0.9rem; color: #94a3b8; }
      .timeline-item { padding-left: 30px; border-left: 2px solid rgba(255,255,255,0.05); position: relative; margin-bottom: 40px; }
      .timeline-dot { position: absolute; left: -6px; top: 5px; width: 10px; height: 10px; border-radius: 50%; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .timeline-item h3 { margin: 0 0 5px; color: #fff; font-size: 1.2rem; }
      .company { color: #94a3b8; font-weight: 400; } .year { color: var(--p); font-size: 0.85rem; font-weight: 600; margin-bottom: 15px; display: block; }
      .projects-grid { display: grid; grid-template-columns: 1fr; gap: 25px; }
      .project-card { padding: 30px; background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, transparent 100%); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; }
      .project-card h3 { margin-top: 0; color: #fff; font-size: 1.4rem; }
      .project-card p { color: #94a3b8; }
      .project-card a { display: inline-block; padding: 10px 20px; background: rgba(255,255,255,0.05); color: #fff; text-decoration: none; border-radius: 8px; font-size: 0.9rem; margin-top: 15px; transition: 0.3s; }
      .project-card a:hover { background: var(--p); }
      footer { text-align: center; padding: 40px; color: #64748b; font-size: 0.9rem; }
    
 header { text-align: left; }`
  },
  darkgradientprime: {
    name: 'Dark Sleek Prime',
    css: `
      :root { --p: {COLOR}; --bg: #0f1115; --text: #e2e8f0; }
      body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; }
      .container { max-width: 800px; margin: 0 auto; padding: 0 20px; }
      header { padding: 120px 20px 80px; text-align: center; background: radial-gradient(circle at top, rgba(255,255,255,0.05) 0%, transparent 70%); border-bottom: 1px solid rgba(255,255,255,0.05); }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 25px; }
      .header-photo img { width: 130px; height: 130px; border-radius: 50%; object-fit: cover; box-shadow: 0 0 30px rgba(0,0,0,0.5); border: 2px solid rgba(255,255,255,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; background: linear-gradient(to right, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 500; margin-top: 10px; letter-spacing: 1px; }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 10px 25px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 30px; color: #fff; text-decoration: none; font-size: 0.9rem; margin: 0 8px; transition: 0.3s; }
      .social-links a:hover { background: var(--p); border-color: var(--p); }
      section { padding: 60px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
      section h2 { font-size: 2rem; color: #fff; margin-bottom: 40px; display: flex; align-items: center; gap: 15px; }
      section h2::after { content: ''; flex: 1; height: 1px; background: linear-gradient(to right, rgba(255,255,255,0.1), transparent); }
      .skill-tag { display: inline-block; padding: 8px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; margin: 0 10px 10px 0; font-size: 0.9rem; color: #94a3b8; }
      .timeline-item { padding-left: 30px; border-left: 2px solid rgba(255,255,255,0.05); position: relative; margin-bottom: 40px; }
      .timeline-dot { position: absolute; left: -6px; top: 5px; width: 10px; height: 10px; border-radius: 50%; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .timeline-item h3 { margin: 0 0 5px; color: #fff; font-size: 1.2rem; }
      .company { color: #94a3b8; font-weight: 400; } .year { color: var(--p); font-size: 0.85rem; font-weight: 600; margin-bottom: 15px; display: block; }
      .projects-grid { display: grid; grid-template-columns: 1fr; gap: 25px; }
      .project-card { padding: 30px; background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, transparent 100%); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; }
      .project-card h3 { margin-top: 0; color: #fff; font-size: 1.4rem; }
      .project-card p { color: #94a3b8; }
      .project-card a { display: inline-block; padding: 10px 20px; background: rgba(255,255,255,0.05); color: #fff; text-decoration: none; border-radius: 8px; font-size: 0.9rem; margin-top: 15px; transition: 0.3s; }
      .project-card a:hover { background: var(--p); }
      footer { text-align: center; padding: 40px; color: #64748b; font-size: 0.9rem; }
    `
  },
  darkgradientneo: {
    name: 'Dark Sleek Neo',
    css: `
      :root { --p: {COLOR}; --bg: #0f1115; --text: #e2e8f0; }
      body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; }
      .container { max-width: 800px; margin: 0 auto; padding: 0 20px; }
      header { padding: 120px 20px 80px; text-align: center; background: radial-gradient(circle at top, rgba(255,255,255,0.05) 0%, transparent 70%); border-bottom: 1px solid rgba(255,255,255,0.05); }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 25px; }
      .header-photo img { width: 130px; height: 130px; border-radius: 50%; object-fit: cover; box-shadow: 0 0 30px rgba(0,0,0,0.5); border: 2px solid rgba(255,255,255,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 800; background: linear-gradient(to right, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .title { color: var(--p); font-size: 1.2rem; font-weight: 500; margin-top: 10px; letter-spacing: 1px; }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 10px 25px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 30px; color: #fff; text-decoration: none; font-size: 0.9rem; margin: 0 8px; transition: 0.3s; }
      .social-links a:hover { background: var(--p); border-color: var(--p); }
      section { padding: 60px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
      section h2 { font-size: 2rem; color: #fff; margin-bottom: 40px; display: flex; align-items: center; gap: 15px; }
      section h2::after { content: ''; flex: 1; height: 1px; background: linear-gradient(to right, rgba(255,255,255,0.1), transparent); }
      .skill-tag { display: inline-block; padding: 8px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; margin: 0 10px 10px 0; font-size: 0.9rem; color: #94a3b8; }
      .timeline-item { padding-left: 30px; border-left: 2px solid rgba(255,255,255,0.05); position: relative; margin-bottom: 40px; }
      .timeline-dot { position: absolute; left: -6px; top: 5px; width: 10px; height: 10px; border-radius: 50%; background: var(--p); box-shadow: 0 0 10px var(--p); }
      .timeline-item h3 { margin: 0 0 5px; color: #fff; font-size: 1.2rem; }
      .company { color: #94a3b8; font-weight: 400; } .year { color: var(--p); font-size: 0.85rem; font-weight: 600; margin-bottom: 15px; display: block; }
      .projects-grid { display: grid; grid-template-columns: 1fr; gap: 25px; }
      .project-card { padding: 30px; background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, transparent 100%); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; }
      .project-card h3 { margin-top: 0; color: #fff; font-size: 1.4rem; }
      .project-card p { color: #94a3b8; }
      .project-card a { display: inline-block; padding: 10px 20px; background: rgba(255,255,255,0.05); color: #fff; text-decoration: none; border-radius: 8px; font-size: 0.9rem; margin-top: 15px; transition: 0.3s; }
      .project-card a:hover { background: var(--p); }
      footer { text-align: center; padding: 40px; color: #64748b; font-size: 0.9rem; }
    
 body { font-size: 1.05rem; }`
  },
  retropoppro: {
    name: 'Retro Pop Pro',
    css: `
      :root { --p: {COLOR}; --bg: #ffebb3; --text: #1a1a1a; }
      body { font-family: 'Balsamiq Sans', cursive, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; background-image: radial-gradient(#1a1a1a 1px, transparent 1px); background-size: 20px 20px; }
      .container { max-width: 900px; margin: 0 auto; }
      header { background: #fff; border: 4px solid var(--text); border-radius: 20px; padding: 50px; box-shadow: 10px 10px 0 var(--p); margin-bottom: 60px; transform: rotate(-1deg); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 4px solid var(--text); object-fit: cover; }
      h1 { font-size: 4rem; margin: 0; text-transform: uppercase; color: var(--p); text-shadow: 3px 3px 0 var(--text); }
      .title { font-size: 1.5rem; font-weight: bold; margin-top: 10px; background: var(--text); color: #fff; display: inline-block; padding: 5px 15px; transform: rotate(2deg); }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; border: 3px solid var(--text); border-radius: 10px; color: var(--text); text-decoration: none; font-weight: bold; margin-right: 15px; box-shadow: 4px 4px 0 var(--p); transition: 0.2s; }
      .social-links a:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--p); }
      section { background: #fff; border: 4px solid var(--text); border-radius: 20px; padding: 40px; margin-bottom: 40px; box-shadow: 10px 10px 0 rgba(0,0,0,0.1); }
      section h2 { font-size: 2.5rem; text-transform: uppercase; margin-top: 0; color: var(--text); text-shadow: 2px 2px 0 var(--p); border-bottom: 4px dashed var(--text); padding-bottom: 15px; }
      .skill-tag { display: inline-block; padding: 10px 20px; background: var(--p); border: 3px solid var(--text); border-radius: 15px; color: #fff; font-weight: bold; font-size: 1.1rem; margin: 0 10px 10px 0; box-shadow: 4px 4px 0 var(--text); }
      .timeline-item { padding: 25px; border: 3px solid var(--text); border-radius: 15px; margin-bottom: 25px; background: #fdfdfd; position: relative; }
      .timeline-item::after { content: ''; position: absolute; top: 10px; right: 10px; width: 15px; height: 15px; border-radius: 50%; background: var(--p); border: 2px solid var(--text); }
      .timeline-item h3 { margin: 0 0 10px; font-size: 1.5rem; }
      .company { color: var(--p); } .year { background: var(--text); color: #fff; padding: 2px 10px; border-radius: 10px; font-size: 0.9rem; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 25px; background: #fff; border: 4px solid var(--text); border-radius: 15px; box-shadow: 8px 8px 0 var(--p); transition: 0.2s; }
      .project-card:hover { transform: translateY(-5px); box-shadow: 12px 12px 0 var(--text); }
      .project-card h3 { margin-top: 0; font-size: 1.6rem; }
      .project-card a { display: inline-block; padding: 10px 20px; background: var(--text); color: #fff; border-radius: 10px; text-decoration: none; font-weight: bold; margin-top: 15px; }
      footer { text-align: center; padding: 30px; font-weight: bold; font-size: 1.2rem; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 2.8rem; } }
    
 header { text-align: left; }
 body { font-size: 1.05rem; }
 .social-links a { text-transform: uppercase; }`
  },
  retropopelite: {
    name: 'Retro Pop Elite',
    css: `
      :root { --p: {COLOR}; --bg: #ffebb3; --text: #1a1a1a; }
      body { font-family: 'Balsamiq Sans', cursive, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; background-image: radial-gradient(#1a1a1a 1px, transparent 1px); background-size: 20px 20px; }
      .container { max-width: 900px; margin: 0 auto; }
      header { background: #fff; border: 4px solid var(--text); border-radius: 20px; padding: 50px; box-shadow: 10px 10px 0 var(--p); margin-bottom: 60px; transform: rotate(-1deg); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 4px solid var(--text); object-fit: cover; }
      h1 { font-size: 4rem; margin: 0; text-transform: uppercase; color: var(--p); text-shadow: 3px 3px 0 var(--text); }
      .title { font-size: 1.5rem; font-weight: bold; margin-top: 10px; background: var(--text); color: #fff; display: inline-block; padding: 5px 15px; transform: rotate(2deg); }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; border: 3px solid var(--text); border-radius: 10px; color: var(--text); text-decoration: none; font-weight: bold; margin-right: 15px; box-shadow: 4px 4px 0 var(--p); transition: 0.2s; }
      .social-links a:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--p); }
      section { background: #fff; border: 4px solid var(--text); border-radius: 20px; padding: 40px; margin-bottom: 40px; box-shadow: 10px 10px 0 rgba(0,0,0,0.1); }
      section h2 { font-size: 2.5rem; text-transform: uppercase; margin-top: 0; color: var(--text); text-shadow: 2px 2px 0 var(--p); border-bottom: 4px dashed var(--text); padding-bottom: 15px; }
      .skill-tag { display: inline-block; padding: 10px 20px; background: var(--p); border: 3px solid var(--text); border-radius: 15px; color: #fff; font-weight: bold; font-size: 1.1rem; margin: 0 10px 10px 0; box-shadow: 4px 4px 0 var(--text); }
      .timeline-item { padding: 25px; border: 3px solid var(--text); border-radius: 15px; margin-bottom: 25px; background: #fdfdfd; position: relative; }
      .timeline-item::after { content: ''; position: absolute; top: 10px; right: 10px; width: 15px; height: 15px; border-radius: 50%; background: var(--p); border: 2px solid var(--text); }
      .timeline-item h3 { margin: 0 0 10px; font-size: 1.5rem; }
      .company { color: var(--p); } .year { background: var(--text); color: #fff; padding: 2px 10px; border-radius: 10px; font-size: 0.9rem; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 25px; background: #fff; border: 4px solid var(--text); border-radius: 15px; box-shadow: 8px 8px 0 var(--p); transition: 0.2s; }
      .project-card:hover { transform: translateY(-5px); box-shadow: 12px 12px 0 var(--text); }
      .project-card h3 { margin-top: 0; font-size: 1.6rem; }
      .project-card a { display: inline-block; padding: 10px 20px; background: var(--text); color: #fff; border-radius: 10px; text-decoration: none; font-weight: bold; margin-top: 15px; }
      footer { text-align: center; padding: 30px; font-weight: bold; font-size: 1.2rem; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 2.8rem; } }
    `
  },
  retropopplus: {
    name: 'Retro Pop Plus',
    css: `
      :root { --p: {COLOR}; --bg: #ffebb3; --text: #1a1a1a; }
      body { font-family: 'Balsamiq Sans', cursive, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; background-image: radial-gradient(#1a1a1a 1px, transparent 1px); background-size: 20px 20px; }
      .container { max-width: 900px; margin: 0 auto; }
      header { background: #fff; border: 4px solid var(--text); border-radius: 20px; padding: 50px; box-shadow: 10px 10px 0 var(--p); margin-bottom: 60px; transform: rotate(-1deg); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 4px solid var(--text); object-fit: cover; }
      h1 { font-size: 4rem; margin: 0; text-transform: uppercase; color: var(--p); text-shadow: 3px 3px 0 var(--text); }
      .title { font-size: 1.5rem; font-weight: bold; margin-top: 10px; background: var(--text); color: #fff; display: inline-block; padding: 5px 15px; transform: rotate(2deg); }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; border: 3px solid var(--text); border-radius: 10px; color: var(--text); text-decoration: none; font-weight: bold; margin-right: 15px; box-shadow: 4px 4px 0 var(--p); transition: 0.2s; }
      .social-links a:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--p); }
      section { background: #fff; border: 4px solid var(--text); border-radius: 20px; padding: 40px; margin-bottom: 40px; box-shadow: 10px 10px 0 rgba(0,0,0,0.1); }
      section h2 { font-size: 2.5rem; text-transform: uppercase; margin-top: 0; color: var(--text); text-shadow: 2px 2px 0 var(--p); border-bottom: 4px dashed var(--text); padding-bottom: 15px; }
      .skill-tag { display: inline-block; padding: 10px 20px; background: var(--p); border: 3px solid var(--text); border-radius: 15px; color: #fff; font-weight: bold; font-size: 1.1rem; margin: 0 10px 10px 0; box-shadow: 4px 4px 0 var(--text); }
      .timeline-item { padding: 25px; border: 3px solid var(--text); border-radius: 15px; margin-bottom: 25px; background: #fdfdfd; position: relative; }
      .timeline-item::after { content: ''; position: absolute; top: 10px; right: 10px; width: 15px; height: 15px; border-radius: 50%; background: var(--p); border: 2px solid var(--text); }
      .timeline-item h3 { margin: 0 0 10px; font-size: 1.5rem; }
      .company { color: var(--p); } .year { background: var(--text); color: #fff; padding: 2px 10px; border-radius: 10px; font-size: 0.9rem; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 25px; background: #fff; border: 4px solid var(--text); border-radius: 15px; box-shadow: 8px 8px 0 var(--p); transition: 0.2s; }
      .project-card:hover { transform: translateY(-5px); box-shadow: 12px 12px 0 var(--text); }
      .project-card h3 { margin-top: 0; font-size: 1.6rem; }
      .project-card a { display: inline-block; padding: 10px 20px; background: var(--text); color: #fff; border-radius: 10px; text-decoration: none; font-weight: bold; margin-top: 15px; }
      footer { text-align: center; padding: 30px; font-weight: bold; font-size: 1.2rem; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 2.8rem; } }
    `
  },
  retropopultra: {
    name: 'Retro Pop Ultra',
    css: `
      :root { --p: {COLOR}; --bg: #ffebb3; --text: #1a1a1a; }
      body { font-family: 'Balsamiq Sans', cursive, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; background-image: radial-gradient(#1a1a1a 1px, transparent 1px); background-size: 20px 20px; }
      .container { max-width: 900px; margin: 0 auto; }
      header { background: #fff; border: 4px solid var(--text); border-radius: 20px; padding: 50px; box-shadow: 10px 10px 0 var(--p); margin-bottom: 60px; transform: rotate(-1deg); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 4px solid var(--text); object-fit: cover; }
      h1 { font-size: 4rem; margin: 0; text-transform: uppercase; color: var(--p); text-shadow: 3px 3px 0 var(--text); }
      .title { font-size: 1.5rem; font-weight: bold; margin-top: 10px; background: var(--text); color: #fff; display: inline-block; padding: 5px 15px; transform: rotate(2deg); }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; border: 3px solid var(--text); border-radius: 10px; color: var(--text); text-decoration: none; font-weight: bold; margin-right: 15px; box-shadow: 4px 4px 0 var(--p); transition: 0.2s; }
      .social-links a:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--p); }
      section { background: #fff; border: 4px solid var(--text); border-radius: 20px; padding: 40px; margin-bottom: 40px; box-shadow: 10px 10px 0 rgba(0,0,0,0.1); }
      section h2 { font-size: 2.5rem; text-transform: uppercase; margin-top: 0; color: var(--text); text-shadow: 2px 2px 0 var(--p); border-bottom: 4px dashed var(--text); padding-bottom: 15px; }
      .skill-tag { display: inline-block; padding: 10px 20px; background: var(--p); border: 3px solid var(--text); border-radius: 15px; color: #fff; font-weight: bold; font-size: 1.1rem; margin: 0 10px 10px 0; box-shadow: 4px 4px 0 var(--text); }
      .timeline-item { padding: 25px; border: 3px solid var(--text); border-radius: 15px; margin-bottom: 25px; background: #fdfdfd; position: relative; }
      .timeline-item::after { content: ''; position: absolute; top: 10px; right: 10px; width: 15px; height: 15px; border-radius: 50%; background: var(--p); border: 2px solid var(--text); }
      .timeline-item h3 { margin: 0 0 10px; font-size: 1.5rem; }
      .company { color: var(--p); } .year { background: var(--text); color: #fff; padding: 2px 10px; border-radius: 10px; font-size: 0.9rem; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 25px; background: #fff; border: 4px solid var(--text); border-radius: 15px; box-shadow: 8px 8px 0 var(--p); transition: 0.2s; }
      .project-card:hover { transform: translateY(-5px); box-shadow: 12px 12px 0 var(--text); }
      .project-card h3 { margin-top: 0; font-size: 1.6rem; }
      .project-card a { display: inline-block; padding: 10px 20px; background: var(--text); color: #fff; border-radius: 10px; text-decoration: none; font-weight: bold; margin-top: 15px; }
      footer { text-align: center; padding: 30px; font-weight: bold; font-size: 1.2rem; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 2.8rem; } }
    
 header { text-align: left; }`
  },
  retropopmax: {
    name: 'Retro Pop Max',
    css: `
      :root { --p: {COLOR}; --bg: #ffebb3; --text: #1a1a1a; }
      body { font-family: 'Balsamiq Sans', cursive, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; background-image: radial-gradient(#1a1a1a 1px, transparent 1px); background-size: 20px 20px; }
      .container { max-width: 900px; margin: 0 auto; }
      header { background: #fff; border: 4px solid var(--text); border-radius: 20px; padding: 50px; box-shadow: 10px 10px 0 var(--p); margin-bottom: 60px; transform: rotate(-1deg); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 4px solid var(--text); object-fit: cover; }
      h1 { font-size: 4rem; margin: 0; text-transform: uppercase; color: var(--p); text-shadow: 3px 3px 0 var(--text); }
      .title { font-size: 1.5rem; font-weight: bold; margin-top: 10px; background: var(--text); color: #fff; display: inline-block; padding: 5px 15px; transform: rotate(2deg); }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; border: 3px solid var(--text); border-radius: 10px; color: var(--text); text-decoration: none; font-weight: bold; margin-right: 15px; box-shadow: 4px 4px 0 var(--p); transition: 0.2s; }
      .social-links a:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--p); }
      section { background: #fff; border: 4px solid var(--text); border-radius: 20px; padding: 40px; margin-bottom: 40px; box-shadow: 10px 10px 0 rgba(0,0,0,0.1); }
      section h2 { font-size: 2.5rem; text-transform: uppercase; margin-top: 0; color: var(--text); text-shadow: 2px 2px 0 var(--p); border-bottom: 4px dashed var(--text); padding-bottom: 15px; }
      .skill-tag { display: inline-block; padding: 10px 20px; background: var(--p); border: 3px solid var(--text); border-radius: 15px; color: #fff; font-weight: bold; font-size: 1.1rem; margin: 0 10px 10px 0; box-shadow: 4px 4px 0 var(--text); }
      .timeline-item { padding: 25px; border: 3px solid var(--text); border-radius: 15px; margin-bottom: 25px; background: #fdfdfd; position: relative; }
      .timeline-item::after { content: ''; position: absolute; top: 10px; right: 10px; width: 15px; height: 15px; border-radius: 50%; background: var(--p); border: 2px solid var(--text); }
      .timeline-item h3 { margin: 0 0 10px; font-size: 1.5rem; }
      .company { color: var(--p); } .year { background: var(--text); color: #fff; padding: 2px 10px; border-radius: 10px; font-size: 0.9rem; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 25px; background: #fff; border: 4px solid var(--text); border-radius: 15px; box-shadow: 8px 8px 0 var(--p); transition: 0.2s; }
      .project-card:hover { transform: translateY(-5px); box-shadow: 12px 12px 0 var(--text); }
      .project-card h3 { margin-top: 0; font-size: 1.6rem; }
      .project-card a { display: inline-block; padding: 10px 20px; background: var(--text); color: #fff; border-radius: 10px; text-decoration: none; font-weight: bold; margin-top: 15px; }
      footer { text-align: center; padding: 30px; font-weight: bold; font-size: 1.2rem; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 2.8rem; } }
    
 body { font-size: 1.05rem; }`
  },
  retropoplite: {
    name: 'Retro Pop Lite',
    css: `
      :root { --p: {COLOR}; --bg: #ffebb3; --text: #1a1a1a; }
      body { font-family: 'Balsamiq Sans', cursive, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; background-image: radial-gradient(#1a1a1a 1px, transparent 1px); background-size: 20px 20px; }
      .container { max-width: 900px; margin: 0 auto; }
      header { background: #fff; border: 4px solid var(--text); border-radius: 20px; padding: 50px; box-shadow: 10px 10px 0 var(--p); margin-bottom: 60px; transform: rotate(-1deg); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 4px solid var(--text); object-fit: cover; }
      h1 { font-size: 4rem; margin: 0; text-transform: uppercase; color: var(--p); text-shadow: 3px 3px 0 var(--text); }
      .title { font-size: 1.5rem; font-weight: bold; margin-top: 10px; background: var(--text); color: #fff; display: inline-block; padding: 5px 15px; transform: rotate(2deg); }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; border: 3px solid var(--text); border-radius: 10px; color: var(--text); text-decoration: none; font-weight: bold; margin-right: 15px; box-shadow: 4px 4px 0 var(--p); transition: 0.2s; }
      .social-links a:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--p); }
      section { background: #fff; border: 4px solid var(--text); border-radius: 20px; padding: 40px; margin-bottom: 40px; box-shadow: 10px 10px 0 rgba(0,0,0,0.1); }
      section h2 { font-size: 2.5rem; text-transform: uppercase; margin-top: 0; color: var(--text); text-shadow: 2px 2px 0 var(--p); border-bottom: 4px dashed var(--text); padding-bottom: 15px; }
      .skill-tag { display: inline-block; padding: 10px 20px; background: var(--p); border: 3px solid var(--text); border-radius: 15px; color: #fff; font-weight: bold; font-size: 1.1rem; margin: 0 10px 10px 0; box-shadow: 4px 4px 0 var(--text); }
      .timeline-item { padding: 25px; border: 3px solid var(--text); border-radius: 15px; margin-bottom: 25px; background: #fdfdfd; position: relative; }
      .timeline-item::after { content: ''; position: absolute; top: 10px; right: 10px; width: 15px; height: 15px; border-radius: 50%; background: var(--p); border: 2px solid var(--text); }
      .timeline-item h3 { margin: 0 0 10px; font-size: 1.5rem; }
      .company { color: var(--p); } .year { background: var(--text); color: #fff; padding: 2px 10px; border-radius: 10px; font-size: 0.9rem; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 25px; background: #fff; border: 4px solid var(--text); border-radius: 15px; box-shadow: 8px 8px 0 var(--p); transition: 0.2s; }
      .project-card:hover { transform: translateY(-5px); box-shadow: 12px 12px 0 var(--text); }
      .project-card h3 { margin-top: 0; font-size: 1.6rem; }
      .project-card a { display: inline-block; padding: 10px 20px; background: var(--text); color: #fff; border-radius: 10px; text-decoration: none; font-weight: bold; margin-top: 15px; }
      footer { text-align: center; padding: 30px; font-weight: bold; font-size: 1.2rem; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 2.8rem; } }
    
 .social-links a { text-transform: uppercase; }`
  },
  retropopx: {
    name: 'Retro Pop X',
    css: `
      :root { --p: {COLOR}; --bg: #ffebb3; --text: #1a1a1a; }
      body { font-family: 'Balsamiq Sans', cursive, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; background-image: radial-gradient(#1a1a1a 1px, transparent 1px); background-size: 20px 20px; }
      .container { max-width: 900px; margin: 0 auto; }
      header { background: #fff; border: 4px solid var(--text); border-radius: 20px; padding: 50px; box-shadow: 10px 10px 0 var(--p); margin-bottom: 60px; transform: rotate(-1deg); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 4px solid var(--text); object-fit: cover; }
      h1 { font-size: 4rem; margin: 0; text-transform: uppercase; color: var(--p); text-shadow: 3px 3px 0 var(--text); }
      .title { font-size: 1.5rem; font-weight: bold; margin-top: 10px; background: var(--text); color: #fff; display: inline-block; padding: 5px 15px; transform: rotate(2deg); }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; border: 3px solid var(--text); border-radius: 10px; color: var(--text); text-decoration: none; font-weight: bold; margin-right: 15px; box-shadow: 4px 4px 0 var(--p); transition: 0.2s; }
      .social-links a:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--p); }
      section { background: #fff; border: 4px solid var(--text); border-radius: 20px; padding: 40px; margin-bottom: 40px; box-shadow: 10px 10px 0 rgba(0,0,0,0.1); }
      section h2 { font-size: 2.5rem; text-transform: uppercase; margin-top: 0; color: var(--text); text-shadow: 2px 2px 0 var(--p); border-bottom: 4px dashed var(--text); padding-bottom: 15px; }
      .skill-tag { display: inline-block; padding: 10px 20px; background: var(--p); border: 3px solid var(--text); border-radius: 15px; color: #fff; font-weight: bold; font-size: 1.1rem; margin: 0 10px 10px 0; box-shadow: 4px 4px 0 var(--text); }
      .timeline-item { padding: 25px; border: 3px solid var(--text); border-radius: 15px; margin-bottom: 25px; background: #fdfdfd; position: relative; }
      .timeline-item::after { content: ''; position: absolute; top: 10px; right: 10px; width: 15px; height: 15px; border-radius: 50%; background: var(--p); border: 2px solid var(--text); }
      .timeline-item h3 { margin: 0 0 10px; font-size: 1.5rem; }
      .company { color: var(--p); } .year { background: var(--text); color: #fff; padding: 2px 10px; border-radius: 10px; font-size: 0.9rem; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 25px; background: #fff; border: 4px solid var(--text); border-radius: 15px; box-shadow: 8px 8px 0 var(--p); transition: 0.2s; }
      .project-card:hover { transform: translateY(-5px); box-shadow: 12px 12px 0 var(--text); }
      .project-card h3 { margin-top: 0; font-size: 1.6rem; }
      .project-card a { display: inline-block; padding: 10px 20px; background: var(--text); color: #fff; border-radius: 10px; text-decoration: none; font-weight: bold; margin-top: 15px; }
      footer { text-align: center; padding: 30px; font-weight: bold; font-size: 1.2rem; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 2.8rem; } }
    
 header { text-align: left; }`
  },
  retropopprime: {
    name: 'Retro Pop Prime',
    css: `
      :root { --p: {COLOR}; --bg: #ffebb3; --text: #1a1a1a; }
      body { font-family: 'Balsamiq Sans', cursive, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; background-image: radial-gradient(#1a1a1a 1px, transparent 1px); background-size: 20px 20px; }
      .container { max-width: 900px; margin: 0 auto; }
      header { background: #fff; border: 4px solid var(--text); border-radius: 20px; padding: 50px; box-shadow: 10px 10px 0 var(--p); margin-bottom: 60px; transform: rotate(-1deg); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 4px solid var(--text); object-fit: cover; }
      h1 { font-size: 4rem; margin: 0; text-transform: uppercase; color: var(--p); text-shadow: 3px 3px 0 var(--text); }
      .title { font-size: 1.5rem; font-weight: bold; margin-top: 10px; background: var(--text); color: #fff; display: inline-block; padding: 5px 15px; transform: rotate(2deg); }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; border: 3px solid var(--text); border-radius: 10px; color: var(--text); text-decoration: none; font-weight: bold; margin-right: 15px; box-shadow: 4px 4px 0 var(--p); transition: 0.2s; }
      .social-links a:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--p); }
      section { background: #fff; border: 4px solid var(--text); border-radius: 20px; padding: 40px; margin-bottom: 40px; box-shadow: 10px 10px 0 rgba(0,0,0,0.1); }
      section h2 { font-size: 2.5rem; text-transform: uppercase; margin-top: 0; color: var(--text); text-shadow: 2px 2px 0 var(--p); border-bottom: 4px dashed var(--text); padding-bottom: 15px; }
      .skill-tag { display: inline-block; padding: 10px 20px; background: var(--p); border: 3px solid var(--text); border-radius: 15px; color: #fff; font-weight: bold; font-size: 1.1rem; margin: 0 10px 10px 0; box-shadow: 4px 4px 0 var(--text); }
      .timeline-item { padding: 25px; border: 3px solid var(--text); border-radius: 15px; margin-bottom: 25px; background: #fdfdfd; position: relative; }
      .timeline-item::after { content: ''; position: absolute; top: 10px; right: 10px; width: 15px; height: 15px; border-radius: 50%; background: var(--p); border: 2px solid var(--text); }
      .timeline-item h3 { margin: 0 0 10px; font-size: 1.5rem; }
      .company { color: var(--p); } .year { background: var(--text); color: #fff; padding: 2px 10px; border-radius: 10px; font-size: 0.9rem; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 25px; background: #fff; border: 4px solid var(--text); border-radius: 15px; box-shadow: 8px 8px 0 var(--p); transition: 0.2s; }
      .project-card:hover { transform: translateY(-5px); box-shadow: 12px 12px 0 var(--text); }
      .project-card h3 { margin-top: 0; font-size: 1.6rem; }
      .project-card a { display: inline-block; padding: 10px 20px; background: var(--text); color: #fff; border-radius: 10px; text-decoration: none; font-weight: bold; margin-top: 15px; }
      footer { text-align: center; padding: 30px; font-weight: bold; font-size: 1.2rem; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 2.8rem; } }
    `
  },
  retropopneo: {
    name: 'Retro Pop Neo',
    css: `
      :root { --p: {COLOR}; --bg: #ffebb3; --text: #1a1a1a; }
      body { font-family: 'Balsamiq Sans', cursive, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; background-image: radial-gradient(#1a1a1a 1px, transparent 1px); background-size: 20px 20px; }
      .container { max-width: 900px; margin: 0 auto; }
      header { background: #fff; border: 4px solid var(--text); border-radius: 20px; padding: 50px; box-shadow: 10px 10px 0 var(--p); margin-bottom: 60px; transform: rotate(-1deg); }
      .header-container { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; border: 4px solid var(--text); object-fit: cover; }
      h1 { font-size: 4rem; margin: 0; text-transform: uppercase; color: var(--p); text-shadow: 3px 3px 0 var(--text); }
      .title { font-size: 1.5rem; font-weight: bold; margin-top: 10px; background: var(--text); color: #fff; display: inline-block; padding: 5px 15px; transform: rotate(2deg); }
      .social-links { margin-top: 30px !important; }
      .social-links a { display: inline-block; padding: 10px 20px; background: #fff; border: 3px solid var(--text); border-radius: 10px; color: var(--text); text-decoration: none; font-weight: bold; margin-right: 15px; box-shadow: 4px 4px 0 var(--p); transition: 0.2s; }
      .social-links a:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--p); }
      section { background: #fff; border: 4px solid var(--text); border-radius: 20px; padding: 40px; margin-bottom: 40px; box-shadow: 10px 10px 0 rgba(0,0,0,0.1); }
      section h2 { font-size: 2.5rem; text-transform: uppercase; margin-top: 0; color: var(--text); text-shadow: 2px 2px 0 var(--p); border-bottom: 4px dashed var(--text); padding-bottom: 15px; }
      .skill-tag { display: inline-block; padding: 10px 20px; background: var(--p); border: 3px solid var(--text); border-radius: 15px; color: #fff; font-weight: bold; font-size: 1.1rem; margin: 0 10px 10px 0; box-shadow: 4px 4px 0 var(--text); }
      .timeline-item { padding: 25px; border: 3px solid var(--text); border-radius: 15px; margin-bottom: 25px; background: #fdfdfd; position: relative; }
      .timeline-item::after { content: ''; position: absolute; top: 10px; right: 10px; width: 15px; height: 15px; border-radius: 50%; background: var(--p); border: 2px solid var(--text); }
      .timeline-item h3 { margin: 0 0 10px; font-size: 1.5rem; }
      .company { color: var(--p); } .year { background: var(--text); color: #fff; padding: 2px 10px; border-radius: 10px; font-size: 0.9rem; }
      .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
      .project-card { padding: 25px; background: #fff; border: 4px solid var(--text); border-radius: 15px; box-shadow: 8px 8px 0 var(--p); transition: 0.2s; }
      .project-card:hover { transform: translateY(-5px); box-shadow: 12px 12px 0 var(--text); }
      .project-card h3 { margin-top: 0; font-size: 1.6rem; }
      .project-card a { display: inline-block; padding: 10px 20px; background: var(--text); color: #fff; border-radius: 10px; text-decoration: none; font-weight: bold; margin-top: 15px; }
      footer { text-align: center; padding: 30px; font-weight: bold; font-size: 1.2rem; }
      @media (max-width: 600px) { .header-container { flex-direction: column-reverse; text-align: center; } h1 { font-size: 2.8rem; } }
    
 body { font-size: 1.05rem; }`
  },
  premiumpro: {
    name: 'Premium Serif Pro',
    css: `
      :root { --p: {COLOR}; --bg: #fdfbf7; --text: #2c2c2c; }
      body { font-family: 'Lora', serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; line-height: 1.8; }
      .container { max-width: 750px; margin: 0 auto; padding: 0 20px; }
      header { padding: 100px 0 60px; text-align: center; border-bottom: 1px solid #e5e5e5; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 400; color: #111; letter-spacing: -1px; }
      .title { color: var(--p); font-size: 1.1rem; font-family: 'Inter', sans-serif; text-transform: uppercase; letter-spacing: 3px; margin-top: 15px; }
      .social-links { margin-top: 40px !important; }
      .social-links a { display: inline-block; margin: 0 15px; color: #666; text-decoration: none; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s; }
      .social-links a:hover { color: var(--p); }
      section { padding: 70px 0; border-bottom: 1px solid #e5e5e5; }
      section h2 { font-size: 2.2rem; font-weight: 400; color: #111; text-align: center; margin-bottom: 50px; }
      .skill-tag { display: inline-block; padding: 8px 16px; border: 1px solid #dcdcdc; border-radius: 30px; margin: 0 10px 15px 0; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #555; }
      .timeline-item { margin-bottom: 40px; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.5rem; font-weight: 400; color: #111; }
      .company { color: var(--p); font-family: 'Inter', sans-serif; font-size: 0.95rem; } .year { display: block; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #999; margin-top: 8px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }
      .projects-grid { display: flex; flex-direction: column; gap: 40px; }
      .project-card { padding: 40px; background: #fff; border: 1px solid #eee; box-shadow: 0 20px 40px rgba(0,0,0,0.03); border-radius: 16px; text-align: center; }
      .project-card h3 { margin-top: 0; font-size: 1.8rem; font-weight: 400; color: #111; }
      .project-card a { display: inline-block; margin-top: 25px; padding-bottom: 5px; color: var(--p); text-decoration: none; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid var(--p); transition: 0.3s; }
      .project-card a:hover { opacity: 0.7; }
      footer { text-align: center; padding: 60px 0; font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #999; }
    
 header { text-align: left; }
 body { font-size: 1.05rem; }
 .social-links a { text-transform: uppercase; }`
  },
  premiumelite: {
    name: 'Premium Serif Elite',
    css: `
      :root { --p: {COLOR}; --bg: #fdfbf7; --text: #2c2c2c; }
      body { font-family: 'Lora', serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; line-height: 1.8; }
      .container { max-width: 750px; margin: 0 auto; padding: 0 20px; }
      header { padding: 100px 0 60px; text-align: center; border-bottom: 1px solid #e5e5e5; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 400; color: #111; letter-spacing: -1px; }
      .title { color: var(--p); font-size: 1.1rem; font-family: 'Inter', sans-serif; text-transform: uppercase; letter-spacing: 3px; margin-top: 15px; }
      .social-links { margin-top: 40px !important; }
      .social-links a { display: inline-block; margin: 0 15px; color: #666; text-decoration: none; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s; }
      .social-links a:hover { color: var(--p); }
      section { padding: 70px 0; border-bottom: 1px solid #e5e5e5; }
      section h2 { font-size: 2.2rem; font-weight: 400; color: #111; text-align: center; margin-bottom: 50px; }
      .skill-tag { display: inline-block; padding: 8px 16px; border: 1px solid #dcdcdc; border-radius: 30px; margin: 0 10px 15px 0; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #555; }
      .timeline-item { margin-bottom: 40px; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.5rem; font-weight: 400; color: #111; }
      .company { color: var(--p); font-family: 'Inter', sans-serif; font-size: 0.95rem; } .year { display: block; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #999; margin-top: 8px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }
      .projects-grid { display: flex; flex-direction: column; gap: 40px; }
      .project-card { padding: 40px; background: #fff; border: 1px solid #eee; box-shadow: 0 20px 40px rgba(0,0,0,0.03); border-radius: 8px; text-align: center; }
      .project-card h3 { margin-top: 0; font-size: 1.8rem; font-weight: 400; color: #111; }
      .project-card a { display: inline-block; margin-top: 25px; padding-bottom: 5px; color: var(--p); text-decoration: none; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid var(--p); transition: 0.3s; }
      .project-card a:hover { opacity: 0.7; }
      footer { text-align: center; padding: 60px 0; font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #999; }
    `
  },
  premiumplus: {
    name: 'Premium Serif Plus',
    css: `
      :root { --p: {COLOR}; --bg: #fdfbf7; --text: #2c2c2c; }
      body { font-family: 'Lora', serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; line-height: 1.8; }
      .container { max-width: 750px; margin: 0 auto; padding: 0 20px; }
      header { padding: 100px 0 60px; text-align: center; border-bottom: 1px solid #e5e5e5; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 400; color: #111; letter-spacing: -1px; }
      .title { color: var(--p); font-size: 1.1rem; font-family: 'Inter', sans-serif; text-transform: uppercase; letter-spacing: 3px; margin-top: 15px; }
      .social-links { margin-top: 40px !important; }
      .social-links a { display: inline-block; margin: 0 15px; color: #666; text-decoration: none; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s; }
      .social-links a:hover { color: var(--p); }
      section { padding: 70px 0; border-bottom: 1px solid #e5e5e5; }
      section h2 { font-size: 2.2rem; font-weight: 400; color: #111; text-align: center; margin-bottom: 50px; }
      .skill-tag { display: inline-block; padding: 8px 16px; border: 1px solid #dcdcdc; border-radius: 30px; margin: 0 10px 15px 0; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #555; }
      .timeline-item { margin-bottom: 40px; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.5rem; font-weight: 400; color: #111; }
      .company { color: var(--p); font-family: 'Inter', sans-serif; font-size: 0.95rem; } .year { display: block; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #999; margin-top: 8px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }
      .projects-grid { display: flex; flex-direction: column; gap: 40px; }
      .project-card { padding: 40px; background: #fff; border: 1px solid #eee; box-shadow: 0 20px 40px rgba(0,0,0,0.03); border-radius: 16px; text-align: center; }
      .project-card h3 { margin-top: 0; font-size: 1.8rem; font-weight: 400; color: #111; }
      .project-card a { display: inline-block; margin-top: 25px; padding-bottom: 5px; color: var(--p); text-decoration: none; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid var(--p); transition: 0.3s; }
      .project-card a:hover { opacity: 0.7; }
      footer { text-align: center; padding: 60px 0; font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #999; }
    `
  },
  premiumultra: {
    name: 'Premium Serif Ultra',
    css: `
      :root { --p: {COLOR}; --bg: #fdfbf7; --text: #2c2c2c; }
      body { font-family: 'Lora', serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; line-height: 1.8; }
      .container { max-width: 750px; margin: 0 auto; padding: 0 20px; }
      header { padding: 100px 0 60px; text-align: center; border-bottom: 1px solid #e5e5e5; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 400; color: #111; letter-spacing: -1px; }
      .title { color: var(--p); font-size: 1.1rem; font-family: 'Inter', sans-serif; text-transform: uppercase; letter-spacing: 3px; margin-top: 15px; }
      .social-links { margin-top: 40px !important; }
      .social-links a { display: inline-block; margin: 0 15px; color: #666; text-decoration: none; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s; }
      .social-links a:hover { color: var(--p); }
      section { padding: 70px 0; border-bottom: 1px solid #e5e5e5; }
      section h2 { font-size: 2.2rem; font-weight: 400; color: #111; text-align: center; margin-bottom: 50px; }
      .skill-tag { display: inline-block; padding: 8px 16px; border: 1px solid #dcdcdc; border-radius: 30px; margin: 0 10px 15px 0; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #555; }
      .timeline-item { margin-bottom: 40px; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.5rem; font-weight: 400; color: #111; }
      .company { color: var(--p); font-family: 'Inter', sans-serif; font-size: 0.95rem; } .year { display: block; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #999; margin-top: 8px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }
      .projects-grid { display: flex; flex-direction: column; gap: 40px; }
      .project-card { padding: 40px; background: #fff; border: 1px solid #eee; box-shadow: 0 20px 40px rgba(0,0,0,0.03); border-radius: 8px; text-align: center; }
      .project-card h3 { margin-top: 0; font-size: 1.8rem; font-weight: 400; color: #111; }
      .project-card a { display: inline-block; margin-top: 25px; padding-bottom: 5px; color: var(--p); text-decoration: none; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid var(--p); transition: 0.3s; }
      .project-card a:hover { opacity: 0.7; }
      footer { text-align: center; padding: 60px 0; font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #999; }
    
 header { text-align: left; }`
  },
  premiummax: {
    name: 'Premium Serif Max',
    css: `
      :root { --p: {COLOR}; --bg: #fdfbf7; --text: #2c2c2c; }
      body { font-family: 'Lora', serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; line-height: 1.8; }
      .container { max-width: 750px; margin: 0 auto; padding: 0 20px; }
      header { padding: 100px 0 60px; text-align: center; border-bottom: 1px solid #e5e5e5; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 400; color: #111; letter-spacing: -1px; }
      .title { color: var(--p); font-size: 1.1rem; font-family: 'Inter', sans-serif; text-transform: uppercase; letter-spacing: 3px; margin-top: 15px; }
      .social-links { margin-top: 40px !important; }
      .social-links a { display: inline-block; margin: 0 15px; color: #666; text-decoration: none; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s; }
      .social-links a:hover { color: var(--p); }
      section { padding: 70px 0; border-bottom: 1px solid #e5e5e5; }
      section h2 { font-size: 2.2rem; font-weight: 400; color: #111; text-align: center; margin-bottom: 50px; }
      .skill-tag { display: inline-block; padding: 8px 16px; border: 1px solid #dcdcdc; border-radius: 30px; margin: 0 10px 15px 0; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #555; }
      .timeline-item { margin-bottom: 40px; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.5rem; font-weight: 400; color: #111; }
      .company { color: var(--p); font-family: 'Inter', sans-serif; font-size: 0.95rem; } .year { display: block; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #999; margin-top: 8px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }
      .projects-grid { display: flex; flex-direction: column; gap: 40px; }
      .project-card { padding: 40px; background: #fff; border: 1px solid #eee; box-shadow: 0 20px 40px rgba(0,0,0,0.03); border-radius: 16px; text-align: center; }
      .project-card h3 { margin-top: 0; font-size: 1.8rem; font-weight: 400; color: #111; }
      .project-card a { display: inline-block; margin-top: 25px; padding-bottom: 5px; color: var(--p); text-decoration: none; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid var(--p); transition: 0.3s; }
      .project-card a:hover { opacity: 0.7; }
      footer { text-align: center; padding: 60px 0; font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #999; }
    
 body { font-size: 1.05rem; }`
  },
  premiumlite: {
    name: 'Premium Serif Lite',
    css: `
      :root { --p: {COLOR}; --bg: #fdfbf7; --text: #2c2c2c; }
      body { font-family: 'Lora', serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; line-height: 1.8; }
      .container { max-width: 750px; margin: 0 auto; padding: 0 20px; }
      header { padding: 100px 0 60px; text-align: center; border-bottom: 1px solid #e5e5e5; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 400; color: #111; letter-spacing: -1px; }
      .title { color: var(--p); font-size: 1.1rem; font-family: 'Inter', sans-serif; text-transform: uppercase; letter-spacing: 3px; margin-top: 15px; }
      .social-links { margin-top: 40px !important; }
      .social-links a { display: inline-block; margin: 0 15px; color: #666; text-decoration: none; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s; }
      .social-links a:hover { color: var(--p); }
      section { padding: 70px 0; border-bottom: 1px solid #e5e5e5; }
      section h2 { font-size: 2.2rem; font-weight: 400; color: #111; text-align: center; margin-bottom: 50px; }
      .skill-tag { display: inline-block; padding: 8px 16px; border: 1px solid #dcdcdc; border-radius: 30px; margin: 0 10px 15px 0; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #555; }
      .timeline-item { margin-bottom: 40px; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.5rem; font-weight: 400; color: #111; }
      .company { color: var(--p); font-family: 'Inter', sans-serif; font-size: 0.95rem; } .year { display: block; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #999; margin-top: 8px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }
      .projects-grid { display: flex; flex-direction: column; gap: 40px; }
      .project-card { padding: 40px; background: #fff; border: 1px solid #eee; box-shadow: 0 20px 40px rgba(0,0,0,0.03); border-radius: 8px; text-align: center; }
      .project-card h3 { margin-top: 0; font-size: 1.8rem; font-weight: 400; color: #111; }
      .project-card a { display: inline-block; margin-top: 25px; padding-bottom: 5px; color: var(--p); text-decoration: none; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid var(--p); transition: 0.3s; }
      .project-card a:hover { opacity: 0.7; }
      footer { text-align: center; padding: 60px 0; font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #999; }
    
 .social-links a { text-transform: uppercase; }`
  },
  premiumx: {
    name: 'Premium Serif X',
    css: `
      :root { --p: {COLOR}; --bg: #fdfbf7; --text: #2c2c2c; }
      body { font-family: 'Lora', serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; line-height: 1.8; }
      .container { max-width: 750px; margin: 0 auto; padding: 0 20px; }
      header { padding: 100px 0 60px; text-align: center; border-bottom: 1px solid #e5e5e5; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 400; color: #111; letter-spacing: -1px; }
      .title { color: var(--p); font-size: 1.1rem; font-family: 'Inter', sans-serif; text-transform: uppercase; letter-spacing: 3px; margin-top: 15px; }
      .social-links { margin-top: 40px !important; }
      .social-links a { display: inline-block; margin: 0 15px; color: #666; text-decoration: none; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s; }
      .social-links a:hover { color: var(--p); }
      section { padding: 70px 0; border-bottom: 1px solid #e5e5e5; }
      section h2 { font-size: 2.2rem; font-weight: 400; color: #111; text-align: center; margin-bottom: 50px; }
      .skill-tag { display: inline-block; padding: 8px 16px; border: 1px solid #dcdcdc; border-radius: 30px; margin: 0 10px 15px 0; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #555; }
      .timeline-item { margin-bottom: 40px; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.5rem; font-weight: 400; color: #111; }
      .company { color: var(--p); font-family: 'Inter', sans-serif; font-size: 0.95rem; } .year { display: block; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #999; margin-top: 8px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }
      .projects-grid { display: flex; flex-direction: column; gap: 40px; }
      .project-card { padding: 40px; background: #fff; border: 1px solid #eee; box-shadow: 0 20px 40px rgba(0,0,0,0.03); border-radius: 16px; text-align: center; }
      .project-card h3 { margin-top: 0; font-size: 1.8rem; font-weight: 400; color: #111; }
      .project-card a { display: inline-block; margin-top: 25px; padding-bottom: 5px; color: var(--p); text-decoration: none; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid var(--p); transition: 0.3s; }
      .project-card a:hover { opacity: 0.7; }
      footer { text-align: center; padding: 60px 0; font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #999; }
    
 header { text-align: left; }`
  },
  premiumprime: {
    name: 'Premium Serif Prime',
    css: `
      :root { --p: {COLOR}; --bg: #fdfbf7; --text: #2c2c2c; }
      body { font-family: 'Lora', serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; line-height: 1.8; }
      .container { max-width: 750px; margin: 0 auto; padding: 0 20px; }
      header { padding: 100px 0 60px; text-align: center; border-bottom: 1px solid #e5e5e5; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 400; color: #111; letter-spacing: -1px; }
      .title { color: var(--p); font-size: 1.1rem; font-family: 'Inter', sans-serif; text-transform: uppercase; letter-spacing: 3px; margin-top: 15px; }
      .social-links { margin-top: 40px !important; }
      .social-links a { display: inline-block; margin: 0 15px; color: #666; text-decoration: none; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s; }
      .social-links a:hover { color: var(--p); }
      section { padding: 70px 0; border-bottom: 1px solid #e5e5e5; }
      section h2 { font-size: 2.2rem; font-weight: 400; color: #111; text-align: center; margin-bottom: 50px; }
      .skill-tag { display: inline-block; padding: 8px 16px; border: 1px solid #dcdcdc; border-radius: 30px; margin: 0 10px 15px 0; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #555; }
      .timeline-item { margin-bottom: 40px; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.5rem; font-weight: 400; color: #111; }
      .company { color: var(--p); font-family: 'Inter', sans-serif; font-size: 0.95rem; } .year { display: block; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #999; margin-top: 8px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }
      .projects-grid { display: flex; flex-direction: column; gap: 40px; }
      .project-card { padding: 40px; background: #fff; border: 1px solid #eee; box-shadow: 0 20px 40px rgba(0,0,0,0.03); border-radius: 8px; text-align: center; }
      .project-card h3 { margin-top: 0; font-size: 1.8rem; font-weight: 400; color: #111; }
      .project-card a { display: inline-block; margin-top: 25px; padding-bottom: 5px; color: var(--p); text-decoration: none; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid var(--p); transition: 0.3s; }
      .project-card a:hover { opacity: 0.7; }
      footer { text-align: center; padding: 60px 0; font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #999; }
    `
  },
  premiumneo: {
    name: 'Premium Serif Neo',
    css: `
      :root { --p: {COLOR}; --bg: #fdfbf7; --text: #2c2c2c; }
      body { font-family: 'Lora', serif; background: var(--bg); color: var(--text); margin: 0; padding: 0; line-height: 1.8; }
      .container { max-width: 750px; margin: 0 auto; padding: 0 20px; }
      header { padding: 100px 0 60px; text-align: center; border-bottom: 1px solid #e5e5e5; }
      .header-container { display: flex; flex-direction: column-reverse; align-items: center; gap: 30px; }
      .header-photo img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
      h1 { font-size: 3.5rem; margin: 0; font-weight: 400; color: #111; letter-spacing: -1px; }
      .title { color: var(--p); font-size: 1.1rem; font-family: 'Inter', sans-serif; text-transform: uppercase; letter-spacing: 3px; margin-top: 15px; }
      .social-links { margin-top: 40px !important; }
      .social-links a { display: inline-block; margin: 0 15px; color: #666; text-decoration: none; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s; }
      .social-links a:hover { color: var(--p); }
      section { padding: 70px 0; border-bottom: 1px solid #e5e5e5; }
      section h2 { font-size: 2.2rem; font-weight: 400; color: #111; text-align: center; margin-bottom: 50px; }
      .skill-tag { display: inline-block; padding: 8px 16px; border: 1px solid #dcdcdc; border-radius: 30px; margin: 0 10px 15px 0; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #555; }
      .timeline-item { margin-bottom: 40px; }
      .timeline-item h3 { margin: 0 0 5px; font-size: 1.5rem; font-weight: 400; color: #111; }
      .company { color: var(--p); font-family: 'Inter', sans-serif; font-size: 0.95rem; } .year { display: block; font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #999; margin-top: 8px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }
      .projects-grid { display: flex; flex-direction: column; gap: 40px; }
      .project-card { padding: 40px; background: #fff; border: 1px solid #eee; box-shadow: 0 20px 40px rgba(0,0,0,0.03); border-radius: 16px; text-align: center; }
      .project-card h3 { margin-top: 0; font-size: 1.8rem; font-weight: 400; color: #111; }
      .project-card a { display: inline-block; margin-top: 25px; padding-bottom: 5px; color: var(--p); text-decoration: none; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid var(--p); transition: 0.3s; }
      .project-card a:hover { opacity: 0.7; }
      footer { text-align: center; padding: 60px 0; font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #999; }
    
 body { font-size: 1.05rem; }`
  },
};

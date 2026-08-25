const templates = {

  premium_apple_glass: {
    name: "Premium Apple Vision Pro",
    isAdvanced: true,
    css: `
      @import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@300;400;600;800&display=swap');
      :root { --p: {COLOR}; }
      body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #f5f5f7; color: #1d1d1f; line-height: 1.5; }
      .container { max-width: 980px; margin: 0 auto; padding: 100px 20px; }
      
      .hero { text-align: center; margin-bottom: 80px; }
      .hero img { width: 120px; height: 120px; border-radius: 50%; margin-bottom: 20px; }
      h1 { font-size: 5rem; font-weight: 800; letter-spacing: -0.05em; margin: 0; background: linear-gradient(90deg, #1d1d1f, #86868b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .title { font-size: 1.8rem; font-weight: 600; color: #86868b; margin-top: 10px; }
      .about { font-size: 1.3rem; max-width: 700px; margin: 30px auto; color: #515154; }
      
      .btn { display: inline-block; background: #0071e3; color: #fff; padding: 14px 28px; border-radius: 30px; font-weight: 600; text-decoration: none; margin: 10px; transition: 0.3s; }
      .btn:hover { background: #0077ED; transform: scale(1.02); }
      .btn-outline { background: transparent; color: #0071e3; border: 1px solid #0071e3; }
      
      h2 { font-size: 2.5rem; font-weight: 700; letter-spacing: -0.02em; margin: 80px 0 40px; text-align: center; }
      
      .skills { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; }
      .skill-tag { background: #fff; border: 1px solid #d2d2d7; color: #1d1d1f; padding: 12px 24px; border-radius: 40px; font-weight: 600; font-size: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.02); transition: 0.3s; }
      .skill-tag:hover { border-color: #0071e3; color: #0071e3; box-shadow: 0 4px 12px rgba(0,113,227,0.1); }
      
      .grid { display: grid; gap: 30px; }
      .card { background: #fff; padding: 40px; border-radius: 24px; box-shadow: 0 10px 20px rgba(0,0,0,0.03); transition: 0.4s; }
      .card:hover { transform: scale(1.02); box-shadow: 0 20px 40px rgba(0,0,0,0.06); }
      .card h3 { font-size: 1.8rem; margin: 0 0 10px; }
      .card .meta { color: #86868b; font-weight: 600; font-size: 1.1rem; margin-bottom: 15px; }
      
      @media(max-width: 768px) { h1 { font-size: 3.5rem; } }
    `,
    htmlLayout: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{NAME} - Apple UI</title>
  <style>{CSS}</style>
</head>
<body>
  <div class="container">
    <div class="hero">
      {PHOTO}
      <h1>{NAME}</h1>
      <div class="title">{TITLE}</div>
      <p class="about">{ABOUT}</p>
      <a href="mailto:{EMAIL}" class="btn">Contact Me</a>
      <a href="{LINKEDIN}" class="btn btn-outline" target="_blank">LinkedIn</a>
    </div>
    
    <h2>Core Technologies</h2>
    <div class="skills">{SKILLS}</div>
    
    <h2>Professional Experience</h2>
    <div class="grid">{EXPERIENCE}</div>
    
    <h2>Featured Projects</h2>
    <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));">{PROJECTS}</div>
  </div>
</body>
</html>`,
    skillLayout: `<div class="skill-tag">{SKILL}</div>`,
    expLayout: `<div class="card"><h3>{ROLE}</h3><div class="meta">{COMPANY} | {YEAR}</div><p style="color:#515154; font-size:1.1rem; line-height:1.6;">{DESC}</p></div>`,
    projLayout: `<div class="card"><h3>{TITLE}</h3><p style="color:#515154; font-size:1.1rem; line-height:1.6;">{DESC}</p><a href="{LINK}" style="color:#0071e3; text-decoration:none; font-weight:600; margin-top:15px; display:inline-block;">Learn more &rarr;</a></div>`,
    photoLayout: `<img src="{PHOTO_SRC}">`
  },



  premium_3d_particles: {
    name: "? Cosmic Particles 3D",
    isAdvanced: true,
    css: `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap');
      :root { --p: {COLOR}; }
      body { margin: 0; padding: 0; font-family: 'Space Grotesk', sans-serif; background: #0b0c10; color: #c5c6c7; overflow-x: hidden; }
      #particles-js { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; }
      .container { max-width: 1000px; margin: 0 auto; padding: 60px 20px; }
      
      .hero { text-align: center; margin-bottom: 80px; padding: 60px; background: rgba(31, 40, 51, 0.6); backdrop-filter: blur(10px); border-radius: 20px; border: 1px solid rgba(102, 252, 241, 0.2); box-shadow: 0 0 30px rgba(0,0,0,0.5); }
      h1 { font-size: 4rem; color: #fff; margin: 0 0 10px; letter-spacing: 2px; }
      .title { font-size: 1.5rem; color: var(--p); margin-bottom: 20px; }
      .about { font-size: 1.1rem; line-height: 1.8; margin-bottom: 30px; }
      .btn { display: inline-block; padding: 12px 30px; background: transparent; color: var(--p); border: 2px solid var(--p); border-radius: 5px; text-decoration: none; font-weight: 600; transition: 0.3s; margin: 5px; }
      .btn:hover { background: var(--p); color: #000; box-shadow: 0 0 15px var(--p); }
      
      h2 { font-size: 2rem; color: #fff; border-bottom: 2px solid rgba(255,255,255,0.1); padding-bottom: 10px; margin-top: 50px; }
      .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; margin-top: 30px; }
      .card { background: rgba(31, 40, 51, 0.6); padding: 30px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.05); transition: 0.3s; backdrop-filter: blur(5px); }
      .card:hover { transform: translateY(-10px); border-color: var(--p); box-shadow: 0 10px 20px rgba(0,0,0,0.5); }
      .card h3 { color: #fff; margin: 0 0 10px; }
      .card .meta { color: var(--p); font-size: 0.9rem; margin-bottom: 15px; }
      .skill-tag { display: inline-block; padding: 8px 15px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; margin: 5px; transition: 0.3s; }
      .skill-tag:hover { background: var(--p); color: #000; }
    `,
    htmlLayout: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{NAME} - Particles</title>
  <style>{CSS}</style>
</head>
<body>
  <div id="particles-js"></div>
  <div class="container">
    <div class="hero">
      {PHOTO}
      <h1>{NAME}</h1>
      <div class="title">{TITLE}</div>
      <p class="about">{ABOUT}</p>
      <a href="mailto:{EMAIL}" class="btn">Email Me</a>
      <a href="{LINKEDIN}" class="btn" target="_blank">LinkedIn</a>
      <a href="{GITHUB}" class="btn" target="_blank">GitHub</a>
    </div>
    <h2>Tech Stack</h2>
    <div>{SKILLS}</div>
    <h2>Experience</h2>
    <div class="grid">{EXPERIENCE}</div>
    <h2>Projects</h2>
    <div class="grid">{PROJECTS}</div>
  </div>
  <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
  <script>
    setTimeout(function() {
      let color = "{COLOR}";
      if(!color.startsWith("#")) color = "#45a29e";
      particlesJS("particles-js", {
        "particles": {
          "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
          "color": { "value": color },
          "shape": { "type": "circle" },
          "opacity": { "value": 0.5, "random": false },
          "size": { "value": 3, "random": true },
          "line_linked": { "enable": true, "distance": 150, "color": color, "opacity": 0.4, "width": 1 },
          "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
          "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } }
        },
        "retina_detect": true
      });
    }, 200);
  </script>
</body>
</html>`,
    skillLayout: `<div class="skill-tag">{SKILL}</div>`,
    expLayout: `<div class="card"><h3>{ROLE}</h3><div class="meta">{COMPANY} | {YEAR}</div><p>{DESC}</p></div>`,
    projLayout: `<div class="card"><h3>{TITLE}</h3><p>{DESC}</p><a href="{LINK}" style="color:var(--p); text-decoration:none;">View &rarr;</a></div>`,
    photoLayout: `<img src="{PHOTO_SRC}" style="width:120px; height:120px; border-radius:50%; margin-bottom:20px; border:3px solid var(--p);">`
  },

  premium_3d_birds: {
    name: "?? Dynamic Flock 3D",
    isAdvanced: true,
    css: `
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
      :root { --p: {COLOR}; }
      body { margin: 0; padding: 0; font-family: 'DM Sans', sans-serif; color: #111; overflow-x: hidden; }
      #bg { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; }
      .container { max-width: 1000px; margin: 0 auto; padding: 60px 20px; position: relative; z-index: 1; }
      
      .hero { background: rgba(255,255,255,0.7); backdrop-filter: blur(15px); padding: 50px; border-radius: 20px; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.08); border: 1px solid rgba(255,255,255,0.5); margin-bottom: 50px; }
      h1 { font-size: 3.5rem; margin: 0; color: #000; }
      .title { font-size: 1.4rem; color: var(--p); font-weight: 700; margin: 10px 0 20px; }
      .btn { display: inline-block; padding: 12px 30px; background: #000; color: #fff; border-radius: 8px; text-decoration: none; margin: 5px; font-weight: 500; transition: 0.3s; }
      .btn:hover { background: var(--p); transform: translateY(-2px); }
      
      .section-box { background: rgba(255,255,255,0.7); backdrop-filter: blur(15px); padding: 40px; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.05); margin-bottom: 40px; border: 1px solid rgba(255,255,255,0.5); }
      h2 { font-size: 1.8rem; margin-top: 0; border-bottom: 2px solid var(--p); padding-bottom: 10px; display: inline-block; }
      
      .skills { display: flex; flex-wrap: wrap; gap: 10px; }
      .skill-tag { padding: 8px 16px; background: #fff; border-radius: 5px; font-weight: 500; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border-left: 3px solid var(--p); }
      
      .item { margin-bottom: 25px; padding-bottom: 25px; border-bottom: 1px solid rgba(0,0,0,0.05); }
      .item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
      .item h3 { margin: 0 0 5px; font-size: 1.2rem; }
      .item .meta { color: #666; font-size: 0.9rem; font-weight: 500; margin-bottom: 10px; }
    `,
    htmlLayout: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{NAME} - Flock</title>
  <style>{CSS}</style>
</head>
<body>
  <div id="bg"></div>
  <div class="container">
    <div class="hero">
      {PHOTO}
      <h1>{NAME}</h1>
      <div class="title">{TITLE}</div>
      <p style="font-size: 1.1rem; color: #444; max-width: 700px; margin: 0 auto 30px; line-height: 1.6;">{ABOUT}</p>
      <a href="mailto:{EMAIL}" class="btn">Email</a>
      <a href="{LINKEDIN}" class="btn">LinkedIn</a>
    </div>
    
    <div class="section-box">
      <h2>Skills</h2>
      <div class="skills">{SKILLS}</div>
    </div>
    
    <div class="section-box">
      <h2>Experience</h2>
      <div>{EXPERIENCE}</div>
    </div>
    
    <div class="section-box">
      <h2>Projects</h2>
      <div>{PROJECTS}</div>
    </div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js"></script>
  <script>
    setTimeout(function() {
      let accentColor = parseInt("{COLOR}".replace('#', '0x')) || 0xff4a5a;
      VANTA.BIRDS({
        el: "#bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0xf5f7fa,
        color1: accentColor,
        color2: 0x000000,
        birdSize: 1.50,
        wingSpan: 30.00,
        speedLimit: 5.00,
        separation: 50.00,
        alignment: 50.00,
        cohesion: 50.00
      });
    }, 200);
  </script>
</body>
</html>`,
    skillLayout: `<div class="skill-tag">{SKILL}</div>`,
    expLayout: `<div class="item"><h3>{ROLE}</h3><div class="meta">{COMPANY} | {YEAR}</div><p style="color:#555; line-height:1.6;">{DESC}</p></div>`,
    projLayout: `<div class="item"><h3>{TITLE}</h3><p style="color:#555; line-height:1.6;">{DESC}</p><a href="{LINK}" style="color:var(--p); font-weight:700; text-decoration:none;">View Source</a></div>`,
    photoLayout: `<img src="{PHOTO_SRC}" style="width:120px; height:120px; border-radius:50%; margin-bottom:20px; object-fit:cover; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">`
  },
  
  premium_3d_halo: {
    name: "?? Neon Halo 3D",
    isAdvanced: true,
    css: `
      @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Jura:wght@400;600&display=swap');
      :root { --p: {COLOR}; }
      body { margin: 0; padding: 0; font-family: 'Jura', sans-serif; color: #fff; background: #000; }
      #bg { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; }
      .container { max-width: 900px; margin: 0 auto; padding: 100px 20px; text-align: center; }
      
      .hero-img { border-radius: 50%; border: 2px solid var(--p); box-shadow: 0 0 30px var(--p); padding: 5px; }
      h1 { font-family: 'Syncopate', sans-serif; font-size: 4rem; text-transform: uppercase; margin: 20px 0 10px; letter-spacing: 5px; text-shadow: 0 0 10px var(--p); }
      .title { font-size: 1.5rem; letter-spacing: 2px; margin-bottom: 30px; color: #ccc; }
      
      .links a { display: inline-block; padding: 10px 20px; border: 1px solid var(--p); color: #fff; text-decoration: none; margin: 5px; text-transform: uppercase; font-weight: 600; transition: 0.3s; background: rgba(0,0,0,0.5); }
      .links a:hover { background: var(--p); color: #000; box-shadow: 0 0 20px var(--p); }
      
      .section { text-align: left; background: rgba(10,10,10,0.8); border: 1px solid rgba(255,255,255,0.1); padding: 40px; margin-top: 50px; position: relative; border-left: 5px solid var(--p); }
      h2 { font-family: 'Syncopate', sans-serif; font-size: 1.5rem; color: var(--p); margin-top: 0; margin-bottom: 30px; }
      
      .skills { display: flex; flex-wrap: wrap; gap: 15px; }
      .skill-tag { border-bottom: 2px solid var(--p); padding: 5px 10px; font-size: 1.1rem; }
      
      .grid { display: grid; gap: 30px; }
      .card { border-bottom: 1px dashed rgba(255,255,255,0.2); padding-bottom: 20px; }
      .card:last-child { border-bottom: none; padding-bottom: 0; }
      .card h3 { margin: 0 0 5px; font-size: 1.3rem; letter-spacing: 1px; }
      .card .meta { color: #888; font-size: 0.9rem; margin-bottom: 10px; text-transform: uppercase; }
    `,
    htmlLayout: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{NAME} - Halo</title>
  <style>{CSS}</style>
</head>
<body>
  <div id="bg"></div>
  <div class="container">
    {PHOTO}
    <h1>{NAME}</h1>
    <div class="title">{TITLE}</div>
    <p style="font-size: 1.1rem; line-height: 1.8; color: #bbb; max-width: 600px; margin: 0 auto 30px;">{ABOUT}</p>
    
    <div class="links">
      <a href="mailto:{EMAIL}">Email</a>
      <a href="{LINKEDIN}">LinkedIn</a>
      <a href="{GITHUB}">GitHub</a>
    </div>
    
    <div class="section">
      <h2>SYS.SKILLS</h2>
      <div class="skills">{SKILLS}</div>
    </div>
    
    <div class="section">
      <h2>SYS.EXPERIENCE</h2>
      <div class="grid">{EXPERIENCE}</div>
    </div>
    
    <div class="section">
      <h2>SYS.PROJECTS</h2>
      <div class="grid">{PROJECTS}</div>
    </div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js"></script>
  <script>
    setTimeout(function() {
      let accentColor = parseInt("{COLOR}".replace('#', '0x')) || 0xff00ff;
      VANTA.HALO({
        el: "#bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        baseColor: accentColor,
        backgroundColor: 0x000000,
        amplitudeFactor: 2.00,
        xOffset: 0.00,
        yOffset: 0.10,
        size: 1.50
      });
    }, 200);
  </script>
</body>
</html>`,
    skillLayout: `<div class="skill-tag">{SKILL}</div>`,
    expLayout: `<div class="card"><h3>{ROLE}</h3><div class="meta">{COMPANY} | {YEAR}</div><p style="color:#ddd;">{DESC}</p></div>`,
    projLayout: `<div class="card"><h3>{TITLE}</h3><p style="color:#ddd;">{DESC}</p><a href="{LINK}" style="color:var(--p);">INITIALIZE &rarr;</a></div>`,
    photoLayout: `<img src="{PHOTO_SRC}" style="width:150px; height:150px; object-fit:cover;" class="hero-img">`
  },
  
  premium_3d_dots: {
    name: "??? Connected Matrix 3D",
    isAdvanced: true,
    css: `
      @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&display=swap');
      :root { --p: {COLOR}; }
      body { margin: 0; padding: 0; font-family: 'Fira Code', monospace; background: #050505; color: #eee; }
      #bg { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; }
      .container { max-width: 900px; margin: 0 auto; padding: 80px 20px; }
      
      .window { background: rgba(10,10,10,0.8); border: 1px solid #333; border-radius: 8px; overflow: hidden; margin-bottom: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); backdrop-filter: blur(5px); }
      .window-header { background: #1a1a1a; padding: 10px 15px; border-bottom: 1px solid #333; display: flex; gap: 8px; align-items: center; }
      .dot { width: 12px; height: 12px; border-radius: 50%; }
      .dot.r { background: #ff5f56; } .dot.y { background: #ffbd2e; } .dot.g { background: #27c93f; }
      .window-title { margin-left: 15px; color: #888; font-size: 0.9rem; }
      
      .window-body { padding: 40px; }
      h1 { margin: 0 0 10px; color: var(--p); font-size: 2.5rem; }
      .title { color: #fff; font-size: 1.2rem; margin-bottom: 20px; }
      
      .grid { display: grid; gap: 25px; margin-top: 30px; }
      .card { border-left: 2px solid #333; padding-left: 20px; transition: 0.3s; }
      .card:hover { border-color: var(--p); }
      .card h3 { margin: 0 0 5px; color: #fff; }
      .card .meta { color: #888; font-size: 0.85rem; margin-bottom: 10px; }
      
      .skill-tag { display: inline-block; padding: 5px 10px; background: #1a1a1a; border: 1px solid #333; margin: 5px; font-size: 0.85rem; border-radius: 4px; }
    `,
    htmlLayout: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{NAME} - Matrix</title>
  <style>{CSS}</style>
</head>
<body>
  <div id="bg"></div>
  <div class="container">
    <div class="window">
      <div class="window-header">
        <div class="dot r"></div><div class="dot y"></div><div class="dot g"></div>
        <div class="window-title">bash - {NAME}</div>
      </div>
      <div class="window-body">
        {PHOTO}
        <h1>{NAME}</h1>
        <div class="title">{TITLE}</div>
        <p style="color:#aaa; line-height:1.6;">{ABOUT}</p>
        <div style="margin-top:20px; font-size: 0.9rem;">
          <span style="color:var(--p);">></span> <a href="mailto:{EMAIL}" style="color:#fff; text-decoration:none;">Email</a><br>
          <span style="color:var(--p);">></span> <a href="{LINKEDIN}" style="color:#fff; text-decoration:none;">LinkedIn</a><br>
          <span style="color:var(--p);">></span> <a href="{GITHUB}" style="color:#fff; text-decoration:none;">GitHub</a>
        </div>
      </div>
    </div>
    
    <div class="window">
      <div class="window-header"><div class="dot r"></div><div class="dot y"></div><div class="dot g"></div><div class="window-title">skills.json</div></div>
      <div class="window-body">
        <div>{SKILLS}</div>
      </div>
    </div>
    
    <div class="window">
      <div class="window-header"><div class="dot r"></div><div class="dot y"></div><div class="dot g"></div><div class="window-title">experience.log</div></div>
      <div class="window-body">
        <div class="grid">{EXPERIENCE}</div>
      </div>
    </div>
    
    <div class="window">
      <div class="window-header"><div class="dot r"></div><div class="dot y"></div><div class="dot g"></div><div class="window-title">projects.exe</div></div>
      <div class="window-body">
        <div class="grid">{PROJECTS}</div>
      </div>
    </div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js"></script>
  <script>
    setTimeout(function() {
      let accentColor = parseInt("{COLOR}".replace('#', '0x')) || 0x00ffcc;
      VANTA.DOTS({
        el: "#bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: accentColor,
        color2: 0x111111,
        backgroundColor: 0x050505,
        size: 3.00,
        spacing: 30.00,
        showLines: true
      });
    }, 200);
  </script>
</body>
</html>`,
    skillLayout: `<div class="skill-tag">{SKILL}</div>`,
    expLayout: `<div class="card"><h3>{ROLE}</h3><div class="meta">{COMPANY} | {YEAR}</div><p style="color:#aaa;">{DESC}</p></div>`,
    projLayout: `<div class="card"><h3>{TITLE}</h3><p style="color:#aaa;">{DESC}</p><a href="{LINK}" style="color:var(--p); text-decoration:none;">./run</a></div>`,
    photoLayout: `<img src="{PHOTO_SRC}" style="width:100px; height:100px; border-radius:8px; margin-bottom:20px; object-fit:cover;">`
  }
,


  premium_3d_topology: {
    name: "?? 3D Topology Terrain",
    isAdvanced: true,
    css: `
      @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;500;700&display=swap');
      :root { --p: {COLOR}; }
      body { margin: 0; font-family: 'Sora', sans-serif; color: #fff; }
      #bg { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; }
      .container { max-width: 1000px; margin: 0 auto; padding: 60px 20px; }
      .box { background: rgba(0,0,0,0.5); backdrop-filter: blur(10px); padding: 50px; border-radius: 30px; margin-bottom: 40px; border: 1px solid rgba(255,255,255,0.1); }
      h1 { font-size: 4rem; margin: 0 0 10px; }
      .title { color: var(--p); font-size: 1.5rem; margin-bottom: 20px; }
      .card { background: rgba(255,255,255,0.05); padding: 25px; border-radius: 15px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.1); }
      .card h3 { margin: 0 0 5px; color: #fff; }
      .card .meta { color: var(--p); font-size: 0.9rem; margin-bottom: 10px; }
      .skill-tag { display: inline-block; padding: 10px 20px; background: rgba(255,255,255,0.1); border-radius: 30px; margin: 5px; }
    `,
    htmlLayout: `<!DOCTYPE html>
<html lang="en">
<head><style>{CSS}</style></head>
<body>
  <div id="bg"></div>
  <div class="container">
    <div class="box">
      {PHOTO}
      <h1>{NAME}</h1>
      <div class="title">{TITLE}</div>
      <p style="color:#ccc; line-height:1.6;">{ABOUT}</p>
    </div>
    <div class="box">
      <h2 style="margin-top:0;">Skills</h2>
      <div>{SKILLS}</div>
    </div>
    <div class="box">
      <h2 style="margin-top:0;">Experience</h2>
      <div>{EXPERIENCE}</div>
    </div>
    <div class="box">
      <h2 style="margin-top:0;">Projects</h2>
      <div>{PROJECTS}</div>
    </div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.topology.min.js"></script>
  <script>setTimeout(() => VANTA.TOPOLOGY({el:"#bg", color: parseInt("{COLOR}".replace('#','0x'))||0x3b82f6, backgroundColor:0x111 }), 200);</script>
</body>
</html>`,
    skillLayout: `<div class="skill-tag">{SKILL}</div>`,
    expLayout: `<div class="card"><h3>{ROLE}</h3><div class="meta">{COMPANY} | {YEAR}</div><p style="color:#bbb;">{DESC}</p></div>`,
    projLayout: `<div class="card"><h3>{TITLE}</h3><p style="color:#bbb;">{DESC}</p><a href="{LINK}" style="color:var(--p);">View</a></div>`,
    photoLayout: `<img src="{PHOTO_SRC}" style="width:120px; height:120px; border-radius:50%; margin-bottom:20px; object-fit:cover;">`
  },
  premium_3d_rings: {
    name: "?? Spinning 3D Rings",
    isAdvanced: true,
    css: `
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700&display=swap');
      :root { --p: {COLOR}; }
      body { margin: 0; font-family: 'Outfit', sans-serif; color: #fff; text-align: center; }
      #bg { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; }
      .container { max-width: 800px; margin: 0 auto; padding: 100px 20px; }
      h1 { font-size: 4rem; margin: 0; text-shadow: 0 0 20px var(--p); }
      .title { color: #fff; font-size: 1.5rem; margin-bottom: 30px; letter-spacing: 2px; }
      .card { background: rgba(0,0,0,0.6); padding: 30px; border-radius: 20px; border: 1px solid var(--p); margin-bottom: 20px; text-align: left; backdrop-filter: blur(5px); }
      .skill-tag { display: inline-block; padding: 10px 20px; border: 1px solid var(--p); border-radius: 5px; margin: 5px; background: rgba(0,0,0,0.5); }
    `,
    htmlLayout: `<!DOCTYPE html>
<html lang="en">
<head><style>{CSS}</style></head>
<body>
  <div id="bg"></div>
  <div class="container">
    {PHOTO}
    <h1>{NAME}</h1>
    <div class="title">{TITLE}</div>
    <p style="color:#ddd; margin-bottom: 50px;">{ABOUT}</p>
    
    <h2 style="color:var(--p);">SKILLS</h2>
    <div style="margin-bottom:50px;">{SKILLS}</div>
    
    <h2 style="color:var(--p);">EXPERIENCE</h2>
    <div>{EXPERIENCE}</div>
    
    <h2 style="color:var(--p); margin-top:50px;">PROJECTS</h2>
    <div>{PROJECTS}</div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.rings.min.js"></script>
  <script>setTimeout(() => VANTA.RINGS({el:"#bg", color: parseInt("{COLOR}".replace('#','0x'))||0x3b82f6, backgroundColor:0x0 }), 200);</script>
</body>
</html>`,
    skillLayout: `<div class="skill-tag">{SKILL}</div>`,
    expLayout: `<div class="card"><h3 style="margin:0 0 5px;">{ROLE}</h3><div style="color:var(--p); margin-bottom:10px;">{COMPANY} | {YEAR}</div><p style="margin:0; color:#bbb;">{DESC}</p></div>`,
    projLayout: `<div class="card"><h3 style="margin:0 0 5px;">{TITLE}</h3><p style="margin:0 0 10px; color:#bbb;">{DESC}</p><a href="{LINK}" style="color:#fff;">View</a></div>`,
    photoLayout: `<img src="{PHOTO_SRC}" style="width:150px; height:150px; border-radius:50%; object-fit:cover;">`
  }
,

  premium_3d_vanta: {
    name: "Premium Premium 3D Universe",
    isAdvanced: true,
    css: `
      @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&display=swap');
      :root { --p: {COLOR}; }
      body { margin: 0; padding: 0; font-family: 'Rajdhani', sans-serif; color: #fff; overflow-x: hidden; }
      #vanta-bg { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; }
      .container { max-width: 1200px; margin: 0 auto; padding: 60px 20px; }
      .glass-panel {
        background: rgba(10, 10, 15, 0.4);
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: 50px;
        margin-bottom: 50px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        transform-style: preserve-3d;
      }
      h1 { font-size: 5rem; font-weight: 700; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 0 20px var(--p); color: #fff; transform: translateZ(50px); }
      .title { font-size: 1.8rem; color: var(--p); letter-spacing: 5px; text-transform: uppercase; transform: translateZ(30px); }
      .about-text { font-size: 1.2rem; line-height: 1.8; color: #ddd; transform: translateZ(20px); font-family: sans-serif; }
      h2 { font-size: 2.5rem; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2px solid var(--p); padding-bottom: 10px; display: inline-block; margin-top: 40px; }
      
      .skills-wrapper { display: flex; flex-wrap: wrap; gap: 15px; margin-top: 20px; }
      .skill-3d { 
        background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0)); 
        border: 1px solid rgba(255,255,255,0.2); 
        padding: 10px 20px; 
        border-radius: 8px; 
        font-size: 1.1rem; 
        font-weight: 600; 
        transition: 0.3s;
      }
      .skill-3d:hover { background: var(--p); transform: translateY(-5px) scale(1.1); box-shadow: 0 10px 20px rgba(0,0,0,0.5); border-color: var(--p); color: #000; }
      
      .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
      .card-3d {
        background: rgba(20, 20, 30, 0.6);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 15px;
        padding: 30px;
        transform-style: preserve-3d;
        backdrop-filter: blur(10px);
      }
      .card-3d h3 { font-size: 1.5rem; color: #fff; transform: translateZ(30px); margin-top: 0; }
      .card-3d p { color: #bbb; transform: translateZ(20px); font-size: 1.1rem; font-family: sans-serif; }
      .card-3d .meta { color: var(--p); font-weight: 600; transform: translateZ(25px); margin-bottom: 10px; }
      
      .social-btn { display: inline-block; padding: 12px 30px; margin-right: 15px; margin-top: 20px; background: rgba(255,255,255,0.1); border: 1px solid var(--p); color: #fff; text-decoration: none; font-size: 1.2rem; font-weight: 600; text-transform: uppercase; transition: 0.3s; }
      .social-btn:hover { background: var(--p); color: #000; box-shadow: 0 0 20px var(--p); transform: scale(1.05); }
      @media (max-width: 768px) { h1 { font-size: 3rem; } .glass-panel > div { flex-direction: column; text-align: center; } }
    `,
    htmlLayout: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{NAME} - 3D Universe</title>
  <style>{CSS}</style>
</head>
<body>
  <div id="vanta-bg"></div>
  <div class="container">
    <div class="glass-panel" data-tilt data-tilt-max="3" data-tilt-speed="400" data-tilt-perspective="1000">
      <div style="display:flex; align-items:center; gap: 40px; transform: translateZ(30px);">
        {PHOTO}
        <div>
          <h1>{NAME}</h1>
          <div class="title">{TITLE}</div>
          <p class="about-text">{ABOUT}</p>
          <div>
            <a href="mailto:{EMAIL}" class="social-btn">Email</a>
            <a href="{LINKEDIN}" class="social-btn" target="_blank">LinkedIn</a>
            <a href="{GITHUB}" class="social-btn" target="_blank">GitHub</a>
          </div>
        </div>
      </div>
    </div>
    
    <h2>Systems & Skills</h2>
    <div class="skills-wrapper" style="margin-bottom: 60px;">{SKILLS}</div>
    
    <h2>Career Timeline</h2>
    <div class="grid" style="margin-bottom: 60px;">{EXPERIENCE}</div>
    
    <h2>3D Project Matrix</h2>
    <div class="grid">{PROJECTS}</div>
    <br><br><br>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js"></script>
  <script>
    // Convert accent color to hex for Vanta
    setTimeout(function() {
      let accentColor = parseInt("{COLOR}".replace('#', '0x')) || 0x00ffcc;
    
    VANTA.NET({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: accentColor,
      backgroundColor: 0x050510,
      points: 15.00,
      maxDistance: 25.00,
      spacing: 20.00
    });
    
    VanillaTilt.init(document.querySelectorAll(".card-3d"), { max: 10, speed: 400, glare: true, "max-glare": 0.2 });
    }, 200);
  </script>
</body>
</html>`,
    skillLayout: `<div class="skill-3d">{SKILL}</div>`,
    expLayout: `<div class="card-3d" data-tilt data-tilt-max="10" data-tilt-glare="true" data-tilt-max-glare="0.2"><h3>{ROLE}</h3><div class="meta">{COMPANY} // {YEAR}</div><p>{DESC}</p></div>`,
    projLayout: `<div class="card-3d" data-tilt data-tilt-max="10" data-tilt-glare="true" data-tilt-max-glare="0.2"><h3>{TITLE}</h3><p>{DESC}</p><a href="{LINK}" style="color:var(--p); font-weight:bold; transform:translateZ(30px); display:inline-block; text-decoration:none; margin-top:10px;">[ Launch Project ]</a></div>`,
    photoLayout: `<img src="{PHOTO_SRC}" style="width:200px; height:200px; border-radius:20px; object-fit:cover; border:3px solid var(--p); transform:translateZ(40px); box-shadow:0 0 30px rgba(0,0,0,0.5);">`
  },

  premium_3d_globe: {
    name: "Premium Premium 3D Globe",
    isAdvanced: true,
    css: `
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;800&display=swap');
      :root { --p: {COLOR}; }
      body { margin: 0; padding: 0; font-family: 'Montserrat', sans-serif; color: #fff; }
      #vanta-globe { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; }
      .container { max-width: 1000px; margin: 0 auto; padding: 100px 20px; text-align: center; }
      
      h1 { font-size: 5rem; font-weight: 800; margin: 0; text-shadow: 0 5px 15px rgba(0,0,0,0.5); }
      .title { font-size: 1.5rem; font-weight: 300; letter-spacing: 2px; margin-bottom: 30px; color: #ccc; }
      .about-box { background: rgba(0,0,0,0.4); padding: 30px; border-radius: 15px; font-size: 1.2rem; line-height: 1.8; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); margin-bottom: 50px; }
      
      h2 { font-size: 2.5rem; margin-top: 80px; margin-bottom: 40px; font-weight: 800; }
      
      .skills { display: flex; justify-content: center; flex-wrap: wrap; gap: 15px; margin-bottom: 80px; }
      .skill-pill { background: rgba(255,255,255,0.1); border: 1px solid var(--p); color: #fff; padding: 12px 25px; border-radius: 50px; font-weight: 500; backdrop-filter: blur(5px); transition: 0.3s; }
      .skill-pill:hover { background: var(--p); color: #000; transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.4); }

      .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; text-align: left; }
      .glass-card { background: rgba(0,0,0,0.5); backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 40px; transition: 0.3s; }
      .glass-card:hover { transform: translateY(-10px); border-color: var(--p); box-shadow: 0 15px 30px rgba(0,0,0,0.5); }
      .glass-card h3 { font-size: 1.6rem; margin: 0 0 10px; color: var(--p); }
      
      .btn-grp { margin-top: 40px; }
      .btn-grp a { display: inline-block; padding: 15px 35px; background: #fff; color: #000; text-decoration: none; border-radius: 50px; font-weight: 800; margin: 10px; transition: 0.3s; }
      .btn-grp a:hover { background: var(--p); color: #fff; transform: scale(1.05); }
    `,
    htmlLayout: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{NAME} - Global 3D</title>
  <style>{CSS}</style>
</head>
<body>
  <div id="vanta-globe"></div>
  <div class="container">
    {PHOTO}
    <h1>{NAME}</h1>
    <div class="title">{TITLE}</div>
    
    <div class="btn-grp">
      <a href="mailto:{EMAIL}">Contact Me</a>
      <a href="{LINKEDIN}" target="_blank">LinkedIn</a>
    </div>

    <div class="about-box" style="margin-top: 50px;">{ABOUT}</div>

    <h2>Technical Arsenal</h2>
    <div class="skills">{SKILLS}</div>

    <h2>Professional Journey</h2>
    <div class="grid" style="margin-bottom: 60px;">{EXPERIENCE}</div>

    <h2>Global Projects</h2>
    <div class="grid">{PROJECTS}</div>
    <br><br><br>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js"></script>
  <script>
    setTimeout(function() {
      let accentColor = parseInt("{COLOR}".replace('#', '0x')) || 0xff3f81;
    VANTA.GLOBE({
      el: "#vanta-globe",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: accentColor,
      color2: 0xffffff,
      size: 1.50,
      backgroundColor: 0x111115
    });
    }, 200);
  </script>
</body>
</html>`,
    skillLayout: `<div class="skill-pill">{SKILL}</div>`,
    expLayout: `<div class="glass-card"><h3>{ROLE}</h3><p style="font-weight:bold; color:#fff;">{COMPANY} | {YEAR}</p><p style="color:#bbb; line-height:1.6;">{DESC}</p></div>`,
    projLayout: `<div class="glass-card"><h3>{TITLE}</h3><p style="color:#bbb; line-height:1.6;">{DESC}</p><a href="{LINK}" style="color:var(--p); text-decoration:none; font-weight:bold; margin-top:15px; display:inline-block;">Explore Project &rarr;</a></div>`,
    photoLayout: `<img src="{PHOTO_SRC}" style="width:180px; height:180px; border-radius:50%; object-fit:cover; margin-bottom:20px; border: 4px solid var(--p);">`
  },


  premium_devfolio: {
    name: "Premium Premium DevFolio",
    isAdvanced: true,
    css: `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      :root { --p: {COLOR}; --bg: #ffffff; --text: #111827; --gray: #6b7280; --light: #f3f4f6; }
      * { box-sizing: border-box; }
      body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; }
      
      .nav { padding: 30px 50px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--light); }
      .nav-logo { font-weight: 800; font-size: 1.5rem; letter-spacing: -1px; color: var(--text); }
      .nav-links a { margin-left: 30px; text-decoration: none; color: var(--gray); font-weight: 500; transition: color 0.2s; }
      .nav-links a:hover { color: var(--p); }

      .container { max-width: 1000px; margin: 0 auto; padding: 80px 20px; }
      
      .hero { text-align: center; margin-bottom: 100px; animation: slideUp 0.8s ease; }
      @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      .hero img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; margin-bottom: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
      .hero h1 { font-size: 4.5rem; font-weight: 800; letter-spacing: -2px; margin: 0 0 20px; line-height: 1.1; }
      .hero p { font-size: 1.3rem; color: var(--gray); max-width: 600px; margin: 0 auto 40px; }
      
      .btn { display: inline-block; padding: 14px 32px; background: var(--text); color: #fff; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 1.1rem; transition: 0.3s; }
      .btn:hover { background: var(--p); transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
      
      .section-title { font-size: 2.5rem; font-weight: 800; letter-spacing: -1px; margin-bottom: 40px; }
      
      .skills-container { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 100px; }
      .skill-tag { padding: 12px 24px; background: var(--light); color: var(--text); border-radius: 8px; font-weight: 600; font-size: 1rem; transition: 0.2s; cursor: default; }
      .skill-tag:hover { background: var(--p); color: #fff; transform: scale(1.05); }

      .exp-grid { display: grid; gap: 30px; margin-bottom: 100px; }
      .exp-card { padding: 40px; border: 1px solid var(--light); border-radius: 20px; transition: 0.3s; background: #fff; }
      .exp-card:hover { box-shadow: 0 20px 40px rgba(0,0,0,0.06); transform: translateY(-5px); border-color: transparent; }
      .exp-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 15px; }
      .exp-role { font-size: 1.4rem; font-weight: 700; margin: 0; }
      .exp-comp { color: var(--p); font-weight: 600; font-size: 1.1rem; }
      .exp-year { color: var(--gray); font-size: 1rem; font-weight: 500; }
      .exp-desc { color: var(--gray); font-size: 1.1rem; margin: 0; }

      .proj-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 40px; }
      .proj-card { background: var(--light); border-radius: 24px; padding: 40px; transition: 0.3s; display: flex; flex-direction: column; }
      .proj-card:hover { background: var(--text); color: #fff; transform: translateY(-10px); }
      .proj-card:hover .proj-desc { color: #d1d5db; }
      .proj-card:hover .proj-link { color: #fff; }
      .proj-title { font-size: 1.8rem; font-weight: 800; margin: 0 0 15px; letter-spacing: -1px; }
      .proj-desc { color: var(--gray); font-size: 1.1rem; margin-bottom: 30px; transition: 0.3s; }
      .proj-link { margin-top: auto; align-self: flex-start; font-weight: 600; color: var(--text); text-decoration: none; font-size: 1.1rem; display: flex; align-items: center; gap: 8px; transition: 0.3s; }
      .proj-link::after { content: '?'; font-size: 1.2rem; }

      footer { text-align: center; padding: 60px 20px; color: var(--gray); font-weight: 500; border-top: 1px solid var(--light); margin-top: 100px; }

      @media (max-width: 768px) {
        .hero h1 { font-size: 3rem; }
        .nav { padding: 20px; flex-direction: column; gap: 15px; }
        .nav-links a { margin: 0 10px; }
        .exp-header { flex-direction: column; gap: 5px; }
      }
    `,
    htmlLayout: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{NAME} - Portfolio</title>
  <style>{CSS}</style>
</head>
<body>
  <div class="nav">
        <div class="nav-logo">{NAME}.</div>
        <div class="nav-links">
          <a href="mailto:{EMAIL}">Email</a>
          <a href="{LINKEDIN}" target="_blank">LinkedIn</a>
          <a href="{GITHUB}" target="_blank">GitHub</a>
        </div>
      </div>

      <div class="container">
        <div class="hero">
          {PHOTO}
          <h1>Hi, I'm {NAME}</h1>
          <p>{TITLE}</p>
          <p style="margin-top: -20px;">{ABOUT}</p>
          <a href="mailto:{EMAIL}" class="btn">Let's Work Together</a>
        </div>

        <h2 class="section-title">My Toolkit</h2>
        <div class="skills-container">{SKILLS}</div>

        <h2 class="section-title">Experience</h2>
        <div class="exp-grid">{EXPERIENCE}</div>

        <h2 class="section-title">Selected Works</h2>
        <div class="proj-grid">{PROJECTS}</div>
      </div>

      <footer>
        <p>&copy; 2026 {NAME}. Designed with minimalism.</p>
      </footer>
</body>
</html>`,
    skillLayout: `<div class="skill-tag">{SKILL}</div>`,
    expLayout: `<div class="exp-card">
      <div class="exp-header">
        <div><h3 class="exp-role">{ROLE}</h3><span class="exp-comp">{COMPANY}</span></div>
        <span class="exp-year">{YEAR}</span>
      </div>
      <p class="exp-desc">{DESC}</p>
    </div>`,
    projLayout: `<div class="proj-card">
      <h3 class="proj-title">{TITLE}</h3>
      <p class="proj-desc">{DESC}</p>
      <a href="{LINK}" class="proj-link">View Live</a>
    </div>`,
    photoLayout: `<img src="{PHOTO_SRC}">`
  },


  premium_3d_glass: {
    name: "Premium Premium 3D Glass",
    isAdvanced: true,
    css: `
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700;900&display=swap');
      :root { --p: {COLOR}; }
      * { box-sizing: border-box; }
      body {
        margin: 0; padding: 0; font-family: 'Outfit', sans-serif;
        background: radial-gradient(circle at top left, #1a1a2e, #0f0f1a);
        color: #fff; min-height: 100vh; overflow-x: hidden;
      }
      .orb { position: absolute; border-radius: 50%; filter: blur(80px); z-index: -1; animation: float 10s infinite ease-in-out alternate; }
      .orb-1 { width: 400px; height: 400px; background: var(--p); top: -100px; left: -100px; opacity: 0.4; }
      .orb-2 { width: 500px; height: 500px; background: #6366f1; bottom: -200px; right: -100px; opacity: 0.2; animation-delay: -5s; }
      @keyframes float { 0% { transform: translate(0, 0); } 100% { transform: translate(50px, 80px); } }

      .container { max-width: 1100px; margin: 0 auto; padding: 60px 20px; position: relative; z-index: 1; }
      
      .glass-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border-radius: 24px;
        padding: 50px;
        box-shadow: 0 30px 60px rgba(0,0,0,0.3);
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.3s;
      }
      .hero { display: flex; align-items: center; gap: 50px; margin-bottom: 50px; }
      .hero:hover { transform: perspective(1000px) rotateY(-2deg) rotateX(2deg); border-color: rgba(255,255,255,0.2); }
      .hero img { width: 220px; height: 220px; border-radius: 50%; object-fit: cover; border: 4px solid rgba(255,255,255,0.1); box-shadow: 0 0 40px rgba(0,0,0,0.5); }
      
      h1 { font-size: 4rem; margin: 0 0 10px 0; font-weight: 900; background: linear-gradient(135deg, #fff, var(--p)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .title { font-size: 1.4rem; color: #a1a1aa; font-weight: 500; letter-spacing: 3px; text-transform: uppercase; }

      .social { margin-top: 30px; display: flex; gap: 15px; flex-wrap: wrap; }
      .social a { display: flex; align-items: center; gap: 8px; padding: 12px 28px; background: rgba(255,255,255,0.05); color: #fff; text-decoration: none; border-radius: 14px; font-weight: 500; transition: all 0.3s; border: 1px solid rgba(255,255,255,0.1); }
      .social a:hover { background: var(--p); transform: translateY(-5px); box-shadow: 0 15px 25px rgba(0,0,0,0.4); border-color: var(--p); }

      h2 { font-size: 2.2rem; margin-top: 0; margin-bottom: 40px; display: flex; align-items: center; gap: 20px; font-weight: 700; }
      h2::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, rgba(255,255,255,0.1), transparent); }

      .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; margin-bottom: 50px; }
      .grid .glass-card { padding: 40px; height: 100%; display: flex; flex-direction: column; }
      .grid .glass-card:hover { transform: translateY(-10px) scale(1.02); border-color: rgba(255,255,255,0.2); }

      .tag { background: rgba(255,255,255,0.05); padding: 10px 20px; border-radius: 20px; font-size: 1rem; display: inline-block; margin: 0 12px 12px 0; border: 1px solid rgba(255,255,255,0.1); transition: 0.3s; }
      .tag:hover { background: var(--p); border-color: var(--p); transform: translateY(-3px); }

      .exp-item { margin-bottom: 40px; position: relative; padding-left: 40px; border-left: 2px solid rgba(255,255,255,0.1); }
      .exp-item::before { content: ''; position: absolute; left: -8px; top: 0; width: 14px; height: 14px; border-radius: 50%; background: var(--p); box-shadow: 0 0 15px var(--p); }
      .exp-role { font-size: 1.5rem; font-weight: 700; color: #fff; margin: 0 0 8px; }
      .exp-comp { color: var(--p); font-size: 1.2rem; font-weight: 500; margin: 0 0 12px; }
      .exp-year { font-size: 0.95rem; color: #a1a1aa; margin-bottom: 15px; display: inline-block; padding: 6px 14px; background: rgba(0,0,0,0.4); border-radius: 10px; border: 1px solid rgba(255,255,255,0.05); }

      .proj-link { margin-top: auto; align-self: flex-start; display: inline-block; color: #fff; text-decoration: none; padding: 12px 28px; background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02)); border-radius: 14px; border: 1px solid rgba(255,255,255,0.1); font-weight: 500; transition: all 0.3s; }
      .proj-link:hover { background: var(--p); border-color: var(--p); transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.3); }

      @media (max-width: 768px) {
        .hero { flex-direction: column; text-align: center; gap: 30px; padding: 30px 20px; }
        h1 { font-size: 2.8rem; }
        .social { justify-content: center; }
        .hero img { width: 160px; height: 160px; }
      }
    `,
    htmlLayout: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{NAME} - Portfolio</title>
  <style>{CSS}</style>
</head>
<body>
  <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="container">
        <div class="glass-card hero">
          {PHOTO}
          <div>
            <h1>{NAME}</h1>
            <div class="title">{TITLE}</div>
            <p style="color: #a1a1aa; line-height: 1.8; margin-top: 25px; font-size: 1.15rem;">{ABOUT}</p>
            <div class="social">
              <a href="mailto:{EMAIL}">Email Me</a>
              <a href="{LINKEDIN}" target="_blank">LinkedIn</a>
              <a href="{GITHUB}" target="_blank">GitHub</a>
            </div>
          </div>
        </div>

        <div class="glass-card" style="margin-bottom: 50px;">
          <h2>Skills & Arsenal</h2>
          <div>{SKILLS}</div>
        </div>

        <div class="glass-card" style="margin-bottom: 50px;">
          <h2>Journey & Experience</h2>
          <div style="margin-top: 40px;">{EXPERIENCE}</div>
        </div>

        <h2>Featured Projects</h2>
        <div class="grid">{PROJECTS}</div>
  </div>
</body>
</html>`,
    skillLayout: `<span class="tag">{SKILL}</span>`,
    expLayout: `<div class="exp-item"><p class="exp-role">{ROLE}</p><p class="exp-comp">{COMPANY}</p><p class="exp-year">{YEAR}</p><p style="color: #a1a1aa; line-height: 1.7; font-size: 1.05rem;">{DESC}</p></div>`,
    projLayout: `<div class="glass-card"><h3 style="font-size: 1.6rem; margin-top:0;">{TITLE}</h3><p style="color: #a1a1aa; line-height: 1.7; font-size: 1.05rem; margin-bottom: 30px;">{DESC}</p><a href="{LINK}" class="proj-link">Launch Project &rarr;</a></div>`,
    photoLayout: `<img src="{PHOTO_SRC}">`
  },

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

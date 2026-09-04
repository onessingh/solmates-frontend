
// OS-based theme-color for TWA status bar
(function(){
  var m=document.getElementById('theme-color-meta');
  if(!m){m=document.createElement('meta');m.name='theme-color';m.id='theme-color-meta';document.head.appendChild(m);}
  function setOsColor(){m.setAttribute('content',window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'#0f172a':'#ffffff');}
  setOsColor();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',setOsColor);
})();


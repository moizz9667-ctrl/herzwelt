// Theme toggle
const toggle = document.getElementById('themeToggle');
const root = document.documentElement;
let dark = false;
try { dark = localStorage.getItem('hw-theme') === 'dark'; } catch(e){}
function applyTheme(){ root.dataset.theme = dark?'dark':'light'; if(toggle) toggle.textContent = dark?'☀️':'🌙'; }
applyTheme();
if(toggle) toggle.addEventListener('click',()=>{ dark=!dark; applyTheme(); try{localStorage.setItem('hw-theme',dark?'dark':'light');}catch(e){} });

// Mobile nav
const mobileBtn = document.getElementById('mobileBtn');
const navLinks = document.getElementById('navLinks');
if(mobileBtn && navLinks){
  var touchFired=false;
  mobileBtn.addEventListener('touchend',function(e){
    e.preventDefault();
    e.stopPropagation();
    touchFired=true;
    setTimeout(function(){touchFired=false;},400);
    var open=navLinks.classList.toggle('open');
    mobileBtn.textContent=open?'✕':'☰';
  },{passive:false});
  mobileBtn.addEventListener('click',function(e){
    if(touchFired)return;
    e.stopPropagation();
    var open=navLinks.classList.toggle('open');
    mobileBtn.textContent=open?'✕':'☰';
  });
  document.addEventListener('click',function(e){
    if(!mobileBtn.contains(e.target)&&!navLinks.contains(e.target)){
      navLinks.classList.remove('open');
      mobileBtn.textContent='☰';
    }
  });
}

// Contact form
const form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Nachricht gesendet ✓';
    btn.style.background = '#1a8a4a';
  });
}

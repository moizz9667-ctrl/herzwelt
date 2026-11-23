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

// Ad injection in story content
(function(){
  var content = document.querySelector('.story-content');
  if(!content) return;
  var paras = content.querySelectorAll('p');
  if(paras.length === 0) return;
  function injectAd(afterEl){
    var wrap = document.createElement('div');
    wrap.style.cssText = 'text-align:center;margin:1.2rem 0;';
    // Insert wrapper into DOM first, then add scripts so they execute
    if(afterEl.nextSibling){
      afterEl.parentNode.insertBefore(wrap, afterEl.nextSibling);
    } else {
      afterEl.parentNode.appendChild(wrap);
    }
    var s1 = document.createElement('script');
    s1.text = "atOptions={'key':'b3da07f00e389d2957ee51076c75c8f9','format':'iframe','height':50,'width':320,'params':{}};";
    wrap.appendChild(s1);
    var s2 = document.createElement('script');
    s2.src = 'https://brightlakegarden.com/b3da07f00e389d2957ee51076c75c8f9/invoke.js';
    wrap.appendChild(s2);
  }
  paras.forEach(function(p, i){
    if(i >= 3) injectAd(p);
  });
  // Ad at end of story
  var lastEl = content.lastElementChild;
  if(lastEl) injectAd(lastEl);
})();

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

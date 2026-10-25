(function(){
  'use strict';

  /* 1. MOBILE NAVIGATION */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks){
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded','false');
      });
    });
  }

  /* 2. TABS (LIVE / UPCOMING / RESULTS) */
  const tabs   = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('[data-panel]');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.toggle('is-active', t === tab));
      panels.forEach(panel => { panel.hidden = panel.dataset.panel !== target; });
      panels.forEach(panel => {
        if (panel.dataset.panel === target){
          panel.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
        }
      });
    });
  });

  /* 3. COUNTDOWN TO 2027 SEASON */
  const countdown = document.querySelector('[data-countdown]');

  if (countdown){
    const el = {
      d: countdown.querySelector('[data-cd="d"]'),
      h: countdown.querySelector('[data-cd="h"]'),
      m: countdown.querySelector('[data-cd="m"]'),
      s: countdown.querySelector('[data-cd="s"]')
    };

    // Set target date to January 1st, 2027 at 00:00:00
    const targetDate = new Date("Jan 1, 2027 00:00:00").getTime();

    function pad(n){ return String(n).padStart(2, '0'); }

    function tickCountdown(){
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        el.d.textContent = "00";
        el.h.textContent = "00";
        el.m.textContent = "00";
        el.s.textContent = "00";
        return;
      }

      const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs  = Math.floor((diff % (1000 * 60)) / 1000);

      el.d.textContent = pad(days);
      el.h.textContent = pad(hours);
      el.m.textContent = pad(mins);
      el.s.textContent = pad(secs);
    }

    tickCountdown();
    setInterval(tickCountdown, 1000);
  }

  /* 4. NOTIFY ME FORM */
  const notifyForm = document.getElementById('notifyForm');
  const contactInput = document.getElementById('contactInput');
  const formMessage = document.getElementById('formMessage');

  if (notifyForm) {
    notifyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = contactInput.value.trim();

      // Simple validation: check if it's an email OR exactly 10 digits
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const isPhone = /^\d{10}$/.test(value);

      if (isEmail || isPhone) {
        formMessage.textContent = "Success! You will be notified when tickets drop.";
        formMessage.className = "form-message show success";
        contactInput.value = ""; 
        contactInput.blur(); 
      } else {
        formMessage.textContent = "Please enter a valid email or a 10-digit phone number.";
        formMessage.className = "form-message show error";
      }
    });
  }

  /* 5. SCROLL REVEAL */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

})();

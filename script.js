/* ==========================================================================
   AMAN SINGH — PORTFOLIO SCRIPT
   Vanilla JS only. Handles: nav state, mobile menu, scroll reveal,
   animated counters, hero code-typing animation, FAQ accordion,
   back-to-top button, and contact form validation UX.
   ========================================================================== */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky navbar state ---------- */
  var navbar = document.getElementById('navbar');
  var backToTop = document.getElementById('backToTop');

  function onScroll() {
    var scrolled = window.scrollY > 12;
    navbar.classList.toggle('is-scrolled', scrolled);
    backToTop.classList.toggle('is-visible', window.scrollY > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.getAttribute('data-reveal-delay');
          entry.target.style.transitionDelay = delay ? delay + 'ms' : '0ms';
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll('.stat__num');

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    if (prefersReducedMotion) { el.textContent = target; return; }

    var duration = 1400;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  if (counters.length && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  /* ---------- Hero code typing animation ---------- */
  var codeTypeEl = document.getElementById('codeType');

  var codeLines = [
    { text: 'const developer = {', cls: '' },
    { text: '  name: ', cls: '', keyPrefix: true, key: 'name', str: '"Aman Singh"' },
    { text: '  role: ', cls: '', keyPrefix: true, key: 'role', str: '"Frontend Developer"' },
    { text: '  stack: ', cls: '', keyPrefix: true, key: 'stack', raw: '["HTML", "CSS", "JavaScript"]' },
    { text: '  status: ', cls: '', keyPrefix: true, key: 'status', str: '"Available for hire"' },
    { text: '};', cls: '' }
  ];

  function buildStaticCode() {
    var html = '';
    html += '<span class="tok-punc">const</span> developer = <span class="tok-punc">{</span>\n';
    html += '  <span class="tok-key">name</span><span class="tok-punc">:</span> <span class="tok-str">"Aman Singh"</span><span class="tok-punc">,</span>\n';
    html += '  <span class="tok-key">role</span><span class="tok-punc">:</span> <span class="tok-str">"Frontend Developer"</span><span class="tok-punc">,</span>\n';
    html += '  <span class="tok-key">stack</span><span class="tok-punc">:</span> <span class="tok-punc">[</span><span class="tok-str">"HTML"</span>, <span class="tok-str">"CSS"</span>, <span class="tok-str">"JavaScript"</span><span class="tok-punc">]</span><span class="tok-punc">,</span>\n';
    html += '  <span class="tok-key">status</span><span class="tok-punc">:</span> <span class="tok-str">"Available for hire"</span>\n';
    html += '<span class="tok-punc">};</span>';
    return html;
  }

  if (codeTypeEl) {
    if (prefersReducedMotion) {
      codeTypeEl.innerHTML = buildStaticCode();
    } else {
      var fullSource = [
        { plain: 'const developer = {\n  ' },
        { key: 'name' }, { plain: ': ' }, { str: '"Aman Singh"' }, { plain: ',\n  ' },
        { key: 'role' }, { plain: ': ' }, { str: '"Frontend Developer"' }, { plain: ',\n  ' },
        { key: 'stack' }, { plain: ': [' }, { str: '"HTML"' }, { plain: ', ' }, { str: '"CSS"' }, { plain: ', ' }, { str: '"JavaScript"' }, { plain: '],\n  ' },
        { key: 'status' }, { plain: ': ' }, { str: '"Available for hire"' }, { plain: '\n};' }
      ];

      var flatChars = [];
      fullSource.forEach(function (chunk) {
        var cls = chunk.key ? 'tok-key' : chunk.str ? 'tok-str' : 'tok-punc';
        var text = chunk.key || chunk.str || chunk.plain;
        for (var i = 0; i < text.length; i++) {
          flatChars.push({ ch: text[i], cls: cls });
        }
      });

      var idx = 0;
      var built = '';
      var speed = 16;

      function typeNext() {
        if (idx >= flatChars.length) {
          codeTypeEl.innerHTML = buildStaticCode();
          return;
        }
        var chunk = flatChars[idx];
        built += '<span class="' + chunk.cls + '">' + escapeHtml(chunk.ch) + '</span>';
        codeTypeEl.innerHTML = built + '<span class="cursor"></span>';
        idx++;
        setTimeout(typeNext, speed);
      }

      function escapeHtml(ch) {
        return ch.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }

      /* Start once the hero card scrolls into view (or immediately if already visible) */
      if ('IntersectionObserver' in window) {
        var codeObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              setTimeout(typeNext, 400);
              codeObserver.disconnect();
            }
          });
        }, { threshold: 0.3 });
        codeObserver.observe(codeTypeEl);
      } else {
        setTimeout(typeNext, 400);
      }
    }
  }

  /* ---------- FAQ accordion ---------- */
  var accordionItems = document.querySelectorAll('.accordion__item');

  accordionItems.forEach(function (item) {
    var trigger = item.querySelector('.accordion__trigger');
    var panel = item.querySelector('.accordion__panel');

    trigger.addEventListener('click', function () {
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';

      /* Close all other items */
      accordionItems.forEach(function (other) {
        if (other !== item) {
          other.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
          other.querySelector('.accordion__panel').style.maxHeight = null;
          other.querySelector('.accordion__panel').style.paddingBottom = '';
        }
      });

      trigger.setAttribute('aria-expanded', String(!isOpen));
      if (!isOpen) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        panel.style.maxHeight = null;
      }
    });
  });

  /* ---------- Contact form validation UX (no backend) ---------- */
  var form = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');
  var submitLabel = document.getElementById('submitLabel');

  var validators = {
    fullName: function (v) { return v.trim().length >= 2 ? '' : 'Please enter your name.'; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.'; },
    projectType: function (v) { return v ? '' : 'Please select a project type.'; },
    message: function (v) { return v.trim().length >= 10 ? '' : 'Please add a few details (10+ characters).'; }
  };

  function validateField(field) {
    var name = field.name;
    var validator = validators[name];
    if (!validator) return true;
    var error = validator(field.value);
    var errorEl = document.getElementById('err-' + name);
    var wrapper = field.closest('.form-field');

    if (error) {
      wrapper.classList.add('is-invalid');
      if (errorEl) errorEl.textContent = error;
      return false;
    } else {
      wrapper.classList.remove('is-invalid');
      if (errorEl) errorEl.textContent = '';
      return true;
    }
  }

  if (form) {
    ['fullName', 'email', 'projectType', 'message'].forEach(function (name) {
      var field = form.elements[name];
      if (!field) return;
      field.addEventListener('blur', function () { validateField(field); });
      field.addEventListener('input', function () {
        if (field.closest('.form-field').classList.contains('is-invalid')) validateField(field);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = ['fullName', 'email', 'projectType', 'message'];
      var allValid = true;

      fields.forEach(function (name) {
        var field = form.elements[name];
        if (!validateField(field)) allValid = false;
      });

      if (!allValid) {
        formNote.textContent = 'Please fix the highlighted fields.';
        formNote.style.color = '#ff8080';
        return;
      }

      /* No backend wired up — simulate a successful send for UI purposes */
      submitLabel.textContent = 'Sending...';
      form.querySelector('button[type="submit"]').disabled = true;

      setTimeout(function () {
        formNote.style.color = '';
        formNote.textContent = 'Thanks! Your message is ready to send — connect a backend or email service to deliver it.';
        submitLabel.textContent = 'Message Ready';
      }, 900);
    });
  }

})();

/* Progressive enhancement for Social Beelines.
   The site is fully readable without JS; this adds motion + interactivity. */
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGSAP = typeof window.gsap !== 'undefined';
  if (hasGSAP && window.ScrollTrigger) { window.gsap.registerPlugin(window.ScrollTrigger); }

  /* ---------- Preloader ---------- */
  var preloader = document.getElementById('preloader');
  var pct = document.getElementById('preload-count');
  if (preloader) {
    if (reduceMotion) {
      preloader.style.display = 'none';
      runEntrance();
    } else {
      var n = 0;
      var pTimer = setInterval(function () {
        n += Math.ceil(Math.random() * 18);
        if (n >= 100) {
          n = 100; clearInterval(pTimer);
          if (pct) pct.textContent = '100%';
          setTimeout(function () {
            preloader.style.transition = 'opacity .7s ease, transform .8s ease';
            preloader.style.opacity = '0';
            preloader.style.transform = 'translateY(-6%)';
            setTimeout(function () { preloader.style.display = 'none'; runEntrance(); }, 750);
          }, 200);
        } else if (pct) { pct.textContent = n + '%'; }
      }, 90);
    }
  }

  /* ---------- Custom cursor ---------- */
  var dot = document.getElementById('curDot');
  var ring = document.getElementById('curRing');
  if (dot && ring && window.matchMedia('(min-width: 861px)').matches) {
    var mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    (function loop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('[data-hover]').forEach(function (el) {
      el.addEventListener('mouseenter', function () { ring.classList.add('grow'); });
      el.addEventListener('mouseleave', function () { ring.classList.remove('grow'); });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (!reduceMotion) {
    document.querySelectorAll('[data-magnetic]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var relX = e.clientX - r.left - r.width / 2;
        var relY = e.clientY - r.top - r.height / 2;
        el.style.transform = 'translate(' + relX * 0.35 + 'px,' + relY * 0.35 + 'px)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
        el.style.transform = 'translate(0,0)';
        setTimeout(function () { el.style.transition = ''; }, 500);
      });
    });
  }

  /* ---------- Hero floating shapes ---------- */
  var heroBg = document.getElementById('heroBg');
  if (heroBg) {
    var shapeDefs = [
      { cls: 'dash-circle', w: 260, h: 260, top: '8%', left: '72%', depth: 22 },
      { cls: 'dash-circle', w: 130, h: 130, top: '62%', left: '6%', depth: 34 },
      { cls: 'solid-dot', w: 14, h: 14, top: '22%', left: '14%', depth: 50 },
      { cls: 'solid-dot', w: 10, h: 10, top: '78%', left: '82%', depth: 44 },
      { cls: 'dash-circle', w: 70, h: 70, top: '40%', left: '88%', depth: 60 }
    ];
    shapeDefs.forEach(function (s) {
      var d = document.createElement('div');
      d.className = 'float-shape ' + s.cls;
      d.style.width = s.w + 'px'; d.style.height = s.h + 'px';
      d.style.top = s.top; d.style.left = s.left;
      d.dataset.depth = s.depth;
      heroBg.appendChild(d);
    });
    if (!reduceMotion) {
      window.addEventListener('mousemove', function (e) {
        var cx = (e.clientX / window.innerWidth - 0.5);
        var cy = (e.clientY / window.innerHeight - 0.5);
        heroBg.querySelectorAll('.float-shape').forEach(function (el) {
          var depth = parseFloat(el.dataset.depth || 20);
          el.style.transform = 'translate(' + (cx * depth) + 'px,' + (cy * depth) + 'px)';
        });
      });
    }
  }

  /* ---------- Hero title reveal ---------- */
  if (hasGSAP && !reduceMotion) { window.gsap.set('#heroTitle .word', { yPercent: 120, opacity: 0 }); }
  function runEntrance() {
    if (!hasGSAP || reduceMotion) {
      document.querySelectorAll('#heroTitle .word').forEach(function (w) { w.style.opacity = 1; });
      return;
    }
    window.gsap.timeline()
      .to('#heroTitle .word', { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.05, ease: 'power4.out' })
      .from('.hero-eyebrow', { opacity: 0, y: 14, duration: .6, ease: 'power2.out' }, 0)
      .from('.hero-desc, .hero-cta', { opacity: 0, y: 16, duration: .7, stagger: .08, ease: 'power2.out' }, '-=0.6');
  }

  /* ---------- Scroll reveals ---------- */
  if (hasGSAP && !reduceMotion) {
    document.querySelectorAll('.reveal-inner').forEach(function (el) {
      window.gsap.fromTo(el, { yPercent: 110 }, { yPercent: 0, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
    });
    window.gsap.utils.toArray('.section-note, .why-panel, .p-item, .service-row, .pkg-card').forEach(function (el) {
      window.gsap.fromTo(el, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%' } });
    });
  }

  /* ---------- Services accordion (keyboard accessible) ---------- */
  document.querySelectorAll('.service-row').forEach(function (row) {
    var btn = row.querySelector('.service-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var wasOpen = row.classList.contains('open');
      document.querySelectorAll('.service-row').forEach(function (r) {
        r.classList.remove('open');
        var b = r.querySelector('.service-toggle');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) { row.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });

  /* ---------- Process pinned scroll ---------- */
  var pin = document.querySelector('.process-pin');
  var trackEl = document.getElementById('processTrack');
  var dotsEl = document.getElementById('processDots');
  var fillEl = document.getElementById('processFill');
  if (pin && trackEl && dotsEl) {
    var stepEls = trackEl.querySelectorAll('.process-step');
    var dotEls = dotsEl.querySelectorAll('span');
    var count = stepEls.length;
    function setActiveStep(idx, prog) {
      stepEls.forEach(function (el, i) {
        el.style.opacity = (i === idx) ? 1 : 0;
        el.style.transform = (i === idx) ? 'translateY(0)' : 'translateY(14px)';
      });
      dotEls.forEach(function (el, i) { el.classList.toggle('active', i === idx); });
      if (fillEl) fillEl.style.width = (prog * 100) + '%';
    }
    if (reduceMotion || !hasGSAP) {
      stepEls.forEach(function (el) { el.style.opacity = 1; el.style.position = 'static'; });
      dotEls.forEach(function (el) { el.classList.add('active'); });
      if (fillEl) fillEl.style.width = '100%';
    } else {
      setActiveStep(0, 0);
      window.ScrollTrigger.create({
        trigger: '.process-pin', start: 'top top', end: 'bottom bottom',
        onUpdate: function (self) {
          var idx = Math.min(count - 1, Math.floor(self.progress * count));
          setActiveStep(idx, self.progress);
        }
      });
    }
  }

  /* ---------- Testimonials slider ---------- */
  var slidesWrap = document.getElementById('testSlides');
  if (slidesWrap) {
    var data = [];
    try { data = JSON.parse(slidesWrap.getAttribute('data-testimonials') || '[]'); } catch (e) {}
    var slides = slidesWrap.querySelectorAll('.test-slide');
    var nameEl = document.getElementById('testName');
    var roleEl = document.getElementById('testRole');
    var avaEl = document.getElementById('testAvatar');
    var idx = 0, timer = null;
    function render() {
      slides.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
      var t = data[idx]; if (!t) return;
      if (nameEl) nameEl.textContent = t.name;
      if (roleEl) roleEl.textContent = t.role;
      if (avaEl) { avaEl.textContent = t.avatar ? '' : (t.name ? t.name.charAt(0) : 'S'); }
    }
    var prev = document.getElementById('testPrev');
    var next = document.getElementById('testNext');
    function go(d) { idx = (idx + d + data.length) % data.length; render(); }
    if (prev) prev.addEventListener('click', function () { go(-1); });
    if (next) next.addEventListener('click', function () { go(1); });
    if (data.length > 1 && !reduceMotion) { timer = setInterval(function () { go(1); }, 6500); }
  }

  /* ---------- Lead form validation ---------- */
  var form = document.getElementById('leadForm');
  if (form) {
    var status = document.getElementById('formStatus');
    var allowedDurations = ['Monthly', 'Quarterly', '6 Months'];
    form.addEventListener('submit', function (e) {
      var invalid = 0;
      form.querySelectorAll('[required]').forEach(function (input) {
        var field = input.closest('.field');
        var ok = input.value && input.value.trim().length > 0;
        if (input.name === 'duration' && ok) { ok = allowedDurations.indexOf(input.value) !== -1; }
        if (field) field.classList.toggle('invalid', !ok);
        if (!ok) invalid++;
      });
      if (invalid > 0) {
        e.preventDefault();
        if (status) { status.textContent = 'Please fix the highlighted fields (' + invalid + ').'; status.className = 'form-status err'; }
        var firstBad = form.querySelector('.field.invalid input, .field.invalid select, .field.invalid textarea');
        if (firstBad) firstBad.focus();
      } else if (status) {
        status.textContent = 'Sending…'; status.className = 'form-status';
      }
    });
    form.querySelectorAll('input, select, textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        var field = input.closest('.field');
        if (field) field.classList.remove('invalid');
      });
    });
  }
})();

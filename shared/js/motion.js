/* Shared motion engine for both Karbonn concepts (classic script).
 * Uses the vendored GSAP + ScrollTrigger + Lenis. Exposes window.KM.
 * Everything is optional: with prefers-reduced-motion, or if a library failed to load,
 * KM.init() shows all content immediately and does nothing else.
 *
 * Markup hooks
 *   [data-split]              heading: words rise from masks when scrolled into view
 *   [data-reveal="up|fade|left|right|scale|clip|pop"]   block reveal (default "up"); siblings stagger
 *   [data-parallax="60"]      moves ±60px while it crosses the viewport (scrubbed)
 *   [data-float]              gentle endless float (put it on an element that has no other transform)
 *   [data-tilt="10"]          3D tilt towards the cursor, max 10deg
 *   [data-magnetic]           element is pulled towards the cursor
 *   [data-count="500"]        number counts up; keeps data-prefix / data-suffix
 *   [data-marquee]            endless horizontal loop; data-marquee="velocity" reacts to scroll speed
 */
(function () {
  'use strict';
  var html = document.documentElement;
  var KM = { lenis: null, active: false };
  var EASE = 'expo.out';

  function ok() { return !(window.K && K.reduced) && window.gsap && window.ScrollTrigger; }
  function q(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* Wrap each word (split on breakable spaces, so NBSP-bound pairs stay together) in a mask. */
  KM.splitWords = function (el) {
    if (el.__split) return el.__split;
    var nodes = [];
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (var n = walker.nextNode(); n; n = walker.nextNode()) nodes.push(n);
    nodes.forEach(function (node) {
      var parts = node.data.split(/([ \t\n\r]+)/);
      var frag = document.createDocumentFragment();
      parts.forEach(function (part) {
        if (!part) return;
        if (/^[ \t\n\r]+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
        var outer = document.createElement('span');
        outer.className = 'w';
        var inner = document.createElement('span');
        inner.className = 'w__i';
        inner.textContent = part;
        outer.appendChild(inner);
        frag.appendChild(outer);
      });
      node.parentNode.replaceChild(frag, node);
    });
    el.__split = q('.w__i', el);
    return el.__split;
  };

  var FROM = {
    up: { opacity: 0, y: 56 },
    fade: { opacity: 0 },
    left: { opacity: 0, x: -70 },
    right: { opacity: 0, x: 70 },
    scale: { opacity: 0, y: 40, scale: 0.94 },
    pop: { opacity: 0, scale: 0.6 },
    clip: { clipPath: 'inset(100% 0% 0% 0%)' }
  };
  var TO = {
    up: { opacity: 1, y: 0 }, fade: { opacity: 1 }, left: { opacity: 1, x: 0 }, right: { opacity: 1, x: 0 },
    scale: { opacity: 1, y: 0, scale: 1 }, pop: { opacity: 1, scale: 1, ease: 'back.out(1.8)' },
    clip: { clipPath: 'inset(0% 0% 0% 0%)', ease: 'expo.inOut', duration: 1.4 }
  };
  var CLEAR = { up: 'opacity,transform', fade: 'opacity', left: 'opacity,transform', right: 'opacity,transform', scale: 'opacity,transform', pop: 'opacity,transform', clip: 'clipPath' };

  function variant(el) { var v = el.getAttribute('data-reveal'); return FROM[v] ? v : 'up'; }

  function revealNow(els) {
    var groups = {};
    els.forEach(function (el) { if (!el.__revealed) { el.__revealed = true; (groups[variant(el)] = groups[variant(el)] || []).push(el); } });
    Object.keys(groups).forEach(function (v) {
      var list = groups[v];
      var to = Object.assign({ duration: 1.1, ease: 'power4.out', stagger: 0.09, clearProps: CLEAR[v] }, TO[v]);
      to.onStart = function () { list.forEach(function (el) { el.classList.add('is-visible'); }); };
      gsap.to(list, to);
    });
  }

  function animateSplit(el, delay) {
    if (el.__splitDone) return;
    el.__splitDone = true;
    var words = KM.splitWords(el);
    gsap.to(words, { yPercent: 0, rotate: 0, duration: 1.15, ease: EASE, stagger: 0.045, delay: delay || 0 });
  }

  /* Prepare and wire everything under root (call again for content rendered later). */
  KM.scan = function (root) {
    if (!KM.active) {
      q('[data-reveal]', root).forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var reveals = q('[data-reveal]', root).filter(function (el) { return !el.__prepared && !el.closest('[data-intro]'); });
    reveals.forEach(function (el) { el.__prepared = true; gsap.set(el, FROM[variant(el)]); });
    if (reveals.length) {
      ScrollTrigger.batch(reveals, { start: 'top 90%', once: true, onEnter: revealNow });
    }
    q('[data-split]', root).forEach(function (el) {
      if (el.__splitPrepared || el.closest('[data-intro]')) return;
      el.__splitPrepared = true;
      gsap.set(KM.splitWords(el), { yPercent: 115, rotate: 3 });
      ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: function () { animateSplit(el); } });
    });
    q('[data-parallax]', root).forEach(function (el) {
      if (el.__px) return; el.__px = true;
      var d = parseFloat(el.getAttribute('data-parallax')) || 60;
      gsap.fromTo(el, { y: d }, { y: -d, ease: 'none', scrollTrigger: { trigger: el.closest('[data-parallax-wrap]') || el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    q('[data-float]', root).forEach(function (el, i) {
      if (el.__float) return; el.__float = true;
      var amp = parseFloat(el.getAttribute('data-float')) || 14;
      gsap.to(el, { y: -amp, rotation: i % 2 ? 1.2 : -1.2, duration: 3.2 + (i % 3) * 0.4, ease: 'sine.inOut', repeat: -1, yoyo: true });
    });
    q('[data-count]', root).forEach(function (el) {
      if (el.__count) return; el.__count = true;
      var end = parseFloat(el.getAttribute('data-count'));
      var pre = el.getAttribute('data-prefix') || '';
      var suf = el.getAttribute('data-suffix') || '';
      var obj = { v: 0 };
      el.textContent = pre + '0' + suf;
      ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: function () {
        gsap.to(obj, { v: end, duration: 2, ease: 'power3.out', onUpdate: function () { el.textContent = pre + Math.round(obj.v).toLocaleString('en-IN') + suf; } });
      } });
    });
    q('[data-tilt]', root).forEach(function (el) {
      if (el.__tilt) return; el.__tilt = true;
      var max = parseFloat(el.getAttribute('data-tilt')) || 8;
      var img = el.querySelector('[data-tilt-img]');
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(el, { rotateY: x * max, rotateX: -y * max, transformPerspective: 1000, duration: 0.7, ease: 'power3.out' });
        if (img) gsap.to(img, { x: x * 22, y: y * 22, duration: 0.7, ease: 'power3.out' });
      });
      el.addEventListener('mouseleave', function () {
        gsap.to(el, { rotateY: 0, rotateX: 0, duration: 1, ease: 'elastic.out(1, 0.6)' });
        if (img) gsap.to(img, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.6)' });
      });
    });
    q('[data-magnetic]', root).forEach(function (el) {
      if (el.__mag) return; el.__mag = true;
      var strength = parseFloat(el.getAttribute('data-magnetic')) || 0.3;
      var xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
      var yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      });
      el.addEventListener('mouseleave', function () { gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.45)' }); });
    });
    q('[data-marquee]', root).forEach(function (el) { KM.marquee(el); });
  };

  KM.marquee = function (el) {
    if (el.__marquee) return; el.__marquee = true;
    var track = el.querySelector('.marquee__track');
    if (!track) return;
    var clone = track.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    q('[data-reveal]', clone).forEach(function (n) { n.removeAttribute('data-reveal'); });
    el.appendChild(clone);
    var speed = parseFloat(el.getAttribute('data-speed')) || 40;
    var tween = gsap.to([track, clone], { xPercent: -100, duration: speed, ease: 'none', repeat: -1 });
    if (el.getAttribute('data-marquee') === 'velocity') {
      var skewTo = gsap.quickTo([track, clone], 'skewX', { duration: 0.5, ease: 'power3.out' });
      ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onUpdate: function (self) {
        var v = self.getVelocity();
        var dir = self.direction;
        gsap.to(tween, { timeScale: dir * (1 + Math.min(Math.abs(v) / 250, 6)), duration: 0.2, overwrite: true });
        skewTo(gsap.utils.clamp(-8, 8, v / -300));
      } });
      ScrollTrigger.addEventListener('scrollEnd', function () { gsap.to(tween, { timeScale: tween.timeScale() < 0 ? -1 : 1, duration: 0.8 }); skewTo(0); });
    }
  };

  /* Page transitions: 'fade' (white veil) or 'wipe' (red panel). */
  function transitions(style) {
    var veil = document.createElement('div');
    veil.className = 'page-veil page-veil--' + style;
    veil.setAttribute('aria-hidden', 'true');
    document.body.appendChild(veil);
    var arriving = false;
    try { arriving = sessionStorage.getItem('k-nav') === '1'; sessionStorage.removeItem('k-nav'); } catch (e) { /* ignore */ }
    var idle = style === 'wipe' ? { yPercent: 100, visibility: 'hidden' } : { opacity: 0, visibility: 'hidden' };
    if (arriving) {
      gsap.set(veil, { visibility: 'visible' });
      if (style === 'wipe') gsap.fromTo(veil, { yPercent: 0 }, { yPercent: -100, duration: 0.9, ease: 'expo.inOut', delay: 0.05, onComplete: function () { gsap.set(veil, idle); } });
      else gsap.fromTo(veil, { opacity: 1 }, { opacity: 0, duration: 0.6, ease: 'power2.out', onComplete: function () { gsap.set(veil, idle); } });
    } else {
      gsap.set(veil, idle);
    }
    html.classList.remove('is-arriving'); // the head script's first-paint cover hands over to the veil
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest('a[href]');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      var href = a.getAttribute('href');
      if (!href || /^(#|https?:|mailto:|tel:|javascript:)/.test(href) || !/\.html(\?|#|$)/.test(href)) return;
      e.preventDefault();
      try { sessionStorage.setItem('k-nav', '1'); } catch (err) { /* ignore */ }
      var go = function () { window.location.href = a.href; };
      gsap.set(veil, { visibility: 'visible' });
      if (style === 'wipe') gsap.fromTo(veil, { yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: 'expo.inOut', onComplete: go });
      else gsap.to(veil, { opacity: 1, duration: 0.35, ease: 'power2.in', onComplete: go });
    });
    window.addEventListener('pageshow', function (e) { if (e.persisted) gsap.set(veil, idle); });
  }

  /* One-time (per session) preloader: logo plus a 0→100 counter. Calls done() when finished. */
  function preloader(done) {
    var seen = false;
    try { seen = sessionStorage.getItem('k-preloaded') === '1'; sessionStorage.setItem('k-preloaded', '1'); } catch (e) { /* ignore */ }
    if (seen) { done(); return; }
    var el = document.createElement('div');
    el.className = 'preloader';
    el.innerHTML = '<div class="preloader__logo">' + K.logo() + '</div><div class="preloader__line"><span></span></div><div class="preloader__count">0</div><p class="preloader__tag">The next Kamaal is koming</p>';
    document.body.appendChild(el);
    if (KM.lenis) KM.lenis.stop();
    var c = { v: 0 };
    var count = el.querySelector('.preloader__count');
    var tl = gsap.timeline({ onComplete: function () { el.remove(); if (KM.lenis) KM.lenis.start(); } });
    tl.from(el.querySelector('.preloader__logo'), { yPercent: 110, opacity: 0, duration: 0.8, ease: EASE })
      .to(c, { v: 100, duration: 1.3, ease: 'power2.inOut', onUpdate: function () { count.textContent = Math.round(c.v); } }, 0.1)
      .to(el.querySelector('.preloader__line span'), { scaleX: 1, duration: 1.3, ease: 'power2.inOut' }, 0.1)
      .to(el, { yPercent: -100, duration: 0.95, ease: 'expo.inOut' }, '+=0.15')
      .add(done, '-=0.55');
  }

  /*
   * opts.intro(tl)   build the hero timeline (elements inside [data-intro] are left to it)
   * opts.transition  'fade' | 'wipe'
   * opts.preloader   true to show the one-time preloader first
   */
  KM.init = function (opts) {
    opts = opts || {};
    if (!ok()) { if (window.K) K.showAll(); return false; }
    KM.active = true;
    gsap.registerPlugin(ScrollTrigger);
    html.classList.add('has-motion');

    if (window.Lenis && opts.smooth !== false) {
      var lenis = new Lenis({ duration: 1.2, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
      KM.lenis = lenis;
      document.addEventListener('click', function (e) {
        var a = e.target.closest('a[href^="#"]');
        if (!a) return;
        var id = a.getAttribute('href');
        if (id.length < 2) return;
        var t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        lenis.scrollTo(t, { offset: opts.anchorOffset || -96, duration: 1.4 });
      });
    }

    // Hide intro pieces before first paint of the animation.
    var introWords = [];
    q('[data-intro] [data-split]').forEach(function (el) { introWords = introWords.concat(KM.splitWords(el)); });
    if (introWords.length) gsap.set(introWords, { yPercent: 115, rotate: 3 });

    KM.scan(document);
    html.classList.remove('motion-pending');

    // Anything still hidden when the page bottom is reached gets revealed.
    ScrollTrigger.create({ trigger: document.body, start: 'bottom bottom+=2', onEnter: function () {
      revealNow(q('[data-reveal]').filter(function (el) { return el.__prepared && !el.__revealed; }));
      q('[data-split]').forEach(function (el) { if (el.__splitPrepared) animateSplit(el); });
    } });

    if (opts.transition) transitions(opts.transition);

    var start = function () {
      html.classList.add('is-loaded');
      var tl = gsap.timeline({ defaults: { ease: EASE } });
      if (introWords.length) tl.to(introWords, { yPercent: 0, rotate: 0, duration: 1.25, stagger: 0.05 }, 0.1);
      if (opts.intro) opts.intro(tl);
      q('[data-intro] [data-reveal]').forEach(function (el) { el.classList.add('is-visible'); });
      ScrollTrigger.refresh();
    };
    if (opts.preloader) preloader(start); else start();
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
    return true;
  };

  window.KM = KM;
})();

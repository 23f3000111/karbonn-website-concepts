/* Karbonn — Concept B "Launch". Renders chrome and data-driven sections, wires the cinematic interactions.
 * Depends on: shared/data/*.js, shared/js/common.js (window.K), shared/js/motion.js (window.KM), GSAP (optional).
 */
(function () {
  'use strict';
  var D = K.data;
  var C = D.company;
  var esc = K.esc;
  var page = document.body.getAttribute('data-page') || '';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var motion = function () { return !!(window.gsap && window.KM && KM.active); };
  var ARROW = K.icon('arrow-right');
  var catLabel = { 'smartphones': 'Smartphone', 'feature-phones': '4G feature phone', 'smart-tvs': 'Smart TV', 'appliances': 'Home appliance' };

  /* ------------------------------------------------------------------ chrome */
  function headerHTML() {
    var cur = function (n) { return page === n ? ' aria-current="page"' : ''; };
    var notify = page === 'home' ? '#notify' : 'index.html#notify';
    return '<div class="pill-hdr">' +
      '<a class="pill-hdr__logo" href="index.html" aria-label="Karbonn home">' + K.logo() + '</a>' +
      '<nav class="pill-nav" aria-label="Main">' +
        '<a href="range.html?cat=smartphones"' + (page === 'range' && K.param('cat') === 'smartphones' ? ' aria-current="page"' : '') + '>Phones</a>' +
        '<a href="range.html?cat=feature-phones"' + (page === 'range' && K.param('cat') === 'feature-phones' ? ' aria-current="page"' : '') + '>Feature phones</a>' +
        '<a href="range.html?cat=smart-tvs"' + (page === 'range' && /smart-tvs|appliances/.test(K.param('cat') || '') ? ' aria-current="page"' : '') + '>TV &amp; Home</a>' +
        '<a href="story.html"' + cur('story') + '>Our story</a>' +
        '<a href="support.html"' + cur('support') + '>Support</a>' +
      '</nav>' +
      '<a class="btn btn--black btn--sm pill-hdr__cta" href="' + notify + '" data-magnetic="0.25"><span class="dot"></span>Notify me</a>' +
    '</div>';
  }

  function footerHTML() {
    var s = C.socials;
    var social = function (href, icon, label) { return '<a href="' + href + '" target="_blank" rel="noopener" aria-label="' + label + '">' + K.icon(icon) + '</a>'; };
    var item = '<span class="marquee__item">Kamaal Koming <i>✦</i> ZenZ Pro <i>✦</i> Made for India <i>✦</i></span>';
    return '<div class="ftr">' +
      '<div class="container ftr__top">' +
        '<div><p class="ftr__big">Celebrate <em>simplicity</em>.</p>' +
          '<form class="ftr__news" data-form="newsletter-b"><div class="form-fields"><label class="field"><span class="sr-only">Email address</span><input class="input" type="email" name="email" placeholder="Your email for launch news" required></label>' +
          '<button class="btn btn--red btn--sm" type="submit" style="height:56px">Subscribe</button></div>' +
          '<p data-form-thanks hidden>' + K.icon('circle-check') + 'You are on the list. Watch your inbox.</p></form>' +
          '<div class="ftr__social">' + social(s.facebook, 'facebook', 'Karbonn on Facebook') + social(s.instagram, 'instagram', 'Karbonn on Instagram') + social(s.x, 'x-brand', 'Karbonn on X') + social(s.youtube, 'youtube', 'Karbonn on YouTube') + '</div></div>' +
        '<div><h4>Range</h4><div class="ftr__links">' + D.categories.map(function (c) { return '<a href="range.html?cat=' + c.id + '">' + esc(c.name) + '</a>'; }).join('') + '<a href="range.html">Everything</a></div></div>' +
        '<div><h4>Karbonn</h4><div class="ftr__links"><a href="story.html">Our story</a><a href="story.html#journey">Journey</a><a href="story.html#team">Leadership</a><a href="product.html?p=zenz-pro">ZenZ Pro</a></div></div>' +
        '<div><h4>Help</h4><div class="ftr__links"><a href="support.html#finder">Find a Klinic</a><a href="support.html#pickup">Book a pickup</a><a href="support.html#faq">FAQs</a><a href="tel:18605001492">' + esc(C.helpline) + '</a></div></div>' +
      '</div>' +
      '<div class="ftr__marquee" data-orphan-skip><div class="marquee" data-marquee data-speed="46"><div class="marquee__track">' + item + item + '</div></div></div>' +
      '<div class="container ftr__bottom"><span>© 2026 Karbonn Mobiles. All rights reserved.</span><span class="credit" data-credit></span><span>New Delhi · Bengaluru</span></div>' +
    '</div>';
  }

  /* ------------------------------------------------------------------ cards */
  function statusHTML(p) {
    if (p.status === 'coming-soon') return '<span class="status status--soon"><span class="dot"></span>Coming soon</span>';
    return '<span class="status status--price">' + (p.priceFrom ? 'From ' : '') + K.price(p.price) + '</span>';
  }
  function dotsHTML(p) {
    if (!p.colors || p.colors.length < 2) return '';
    return '<span class="dots">' + p.colors.map(function (c) { return '<i style="background:' + c.swatch + '" title="' + esc(c.name) + '"></i>'; }).join('') + '</span>';
  }
  function hcardHTML(p) {
    return '<article class="hcard" data-product-card><a class="rcard__link" href="product.html?p=' + p.id + '" aria-label="' + esc(p.name) + '" data-cursor="view"></a>' +
      '<div class="hcard__media"><img src="' + K.img(p.card) + '" alt="" loading="lazy"></div>' +
      '<div class="hcard__body"><span class="mono">' + esc(catLabel[p.category]) + '</span><h3>' + esc(K.short(p)) + '</h3>' +
      '<div class="hcard__meta">' + statusHTML(p) + dotsHTML(p) + '</div></div></article>';
  }
  function rcardHTML(p, i, reveal) {
    return '<article class="rcard rcard--' + p.category + '" data-product-card' + (reveal === false ? '' : ' data-reveal="up"') + '>' +
      '<a class="rcard__link" href="product.html?p=' + p.id + '" aria-label="' + esc(p.name) + '" data-cursor="view"></a>' +
      '<div class="rcard__media"><img src="' + K.img(p.card) + '" alt="" loading="lazy"></div>' +
      '<div class="rcard__body"><span class="mono">' + String(i + 1).padStart(2, '0') + ' · ' + esc(catLabel[p.category]) + '</span>' +
        '<h3>' + esc(K.short(p)) + '</h3><p>' + esc(p.tagline) + '</p>' +
        '<div class="rcard__foot"><span style="display:flex;gap:12px;align-items:center">' + statusHTML(p) + dotsHTML(p) + '</span><span class="rcard__go">' + K.icon('arrow-up-right') + '</span></div></div>' +
    '</article>';
  }

  /* ------------------------------------------------------------------ home */
  var STACK = [
    { id: 'zenz-pro', tone: 'blush', title: 'ZenZ <em>Pro</em>', img: 'zenz-pro/duo-upright.webp' },
    { id: 'zenz', tone: 'mist', title: 'ZenZ', img: 'zenz/trio-fan.webp' },
    { id: 'k9-pro-4g', tone: 'black', title: 'K9 Pro <em>4G</em>', img: 'k9-pro-4g/deep-blue-front.webp' },
    { id: 'k9-stylo-4g', tone: 'red', title: 'K9 Stylo <em>4G</em>', img: 'k9-stylo-4g/deep-blue-front.webp' },
    { id: 'k9-4g', tone: 'white', title: 'K9 <em>4G</em>', img: 'k9-4g/black-red-tilt.webp' },
    { id: 'k104i', tone: 'mist', title: 'K104<em>i</em>', img: 'k104i/trio.webp' }
  ];

  function renderHome() {
    var stack = $('[data-render="stack"]');
    if (stack) stack.innerHTML = STACK.map(function (s, i) {
      var p = K.product(s.id);
      var foot = p.status === 'coming-soon' ? '<span class="status status--soon"><span class="dot"></span>Coming soon</span>' : '<span class="scard__price">' + K.price(p.price) + '</span>';
      return '<article class="scard scard--' + s.tone + '" style="top:' + (112 + i * 14) + 'px" data-stack-card>' +
        '<div class="scard__copy"><span class="mono">' + String(i + 1).padStart(2, '0') + ' / ' + esc(catLabel[p.category]) + '</span>' +
          '<h3>' + s.title + '</h3><p class="scard__tag">' + esc(p.tagline) + '</p>' +
          '<ul class="scard__list">' + p.highlights.slice(0, 3).map(function (h) { return '<li>' + K.icon(h.icon) + '<span>' + esc(h.title) + '</span></li>'; }).join('') + '</ul>' +
          '<div class="scard__foot">' + foot + '<a class="arrow-link" href="product.html?p=' + p.id + '"><span>Explore ' + esc(K.short(p)) + '</span><span class="circle">' + ARROW + '</span></a></div></div>' +
        '<div class="scard__media' + (p.category === 'feature-phones' ? ' scard__media--fp' : '') + '"><span class="scard__num">' + String(i + 1).padStart(2, '0') + '</span><img src="' + K.img(s.img) + '" alt="' + esc(p.name) + '" loading="lazy" data-stack-img></div>' +
        '<span class="scard__shade" data-shade></span>' +
      '</article>';
    }).join('');

    var track = $('[data-render="hrange"]');
    if (track) track.innerHTML = D.products.map(hcardHTML).join('') +
      '<a class="hcard" href="range.html" style="background:var(--red);color:#fff;justify-content:center;padding:36px" data-cursor="view"><span class="mono" style="color:rgba(255,255,255,.7)">The whole family</span><h3 style="font-size:56px;margin:18px 0 26px">See every Karbonn</h3><span class="arrow-link"><span>Open the range</span><span class="circle">' + ARROW + '</span></span></a>';

    // Hero colour switch
    var zp = K.product('zenz-pro');
    var stage = $('[data-hero-phone]');
    var card = $('.hero__card');
    var switches = $('[data-hero-switch]');
    if (stage && switches) {
      stage.innerHTML = zp.colors.map(function (c, i) { return '<img src="' + K.img(c.images[0]) + '" alt="ZenZ Pro in ' + esc(c.name) + '" data-colour="' + c.id + '"' + (i ? ' aria-hidden="true"' : '') + '>'; }).join('');
      switches.innerHTML = zp.colors.map(function (c, i) { return '<button class="sw" type="button" data-sw="' + c.id + '" aria-pressed="' + (i === 0) + '"><i style="background:' + c.swatch + '"></i>' + esc(c.name) + '</button>'; }).join('');
      var current = zp.colors[0].id;
      var auto = true;
      var setColour = function (id, user) {
        if (id === current) return;
        if (user) auto = false;
        var c = zp.colors.filter(function (x) { return x.id === id; })[0];
        var from = $('img[data-colour="' + current + '"]', stage);
        var to = $('img[data-colour="' + id + '"]', stage);
        current = id;
        card.style.setProperty('--tint', c.tint);
        $$('[data-sw]', switches).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-sw') === id)); });
        if (motion()) {
          gsap.timeline()
            .to(from, { rotateY: -70, x: -60, opacity: 0, scale: 0.9, duration: 0.6, ease: 'power3.in' })
            .fromTo(to, { rotateY: 70, x: 60, opacity: 0, scale: 0.9 }, { rotateY: 0, x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'expo.out' }, 0.35);
        } else { from.style.opacity = 0; to.style.opacity = 1; }
      };
      switches.addEventListener('click', function (e) { var b = e.target.closest('[data-sw]'); if (b) setColour(b.getAttribute('data-sw'), true); });
      if (motion()) {
        var idx = 0;
        setInterval(function () {
          if (!auto || document.hidden || window.scrollY > 600) return;
          idx = (idx + 1) % zp.colors.length;
          setColour(zp.colors[idx].id, false);
        }, 4800);
      }
    }
  }

  /* ------------------------------------------------------------------ range */
  function renderRange() {
    var grid = $('[data-render="range"]');
    var tabs = $('[data-range-tabs]');
    var param = K.param('cat');
    var cat = K.category(param) ? param : 'all';
    var title = $('[data-range-title]');
    tabs.innerHTML = '<button class="rtab" type="button" data-rcat="all">Everything <b>' + D.products.length + '</b></button>' +
      D.categories.map(function (c) { return '<button class="rtab" type="button" data-rcat="' + c.id + '">' + esc(c.short) + ' <b>' + K.byCategory(c.id).length + '</b></button>'; }).join('');
    function list() { return cat === 'all' ? D.products : K.byCategory(cat); }
    function paint(animate) {
      $$('[data-rcat]', tabs).forEach(function (t) { t.setAttribute('aria-selected', String(t.getAttribute('data-rcat') === cat)); });
      var c = K.category(cat);
      if (title) { title.innerHTML = c ? esc(c.name.replace(/s$/, '')) + ' <em>range</em>.' : 'The Karbonn <em>range</em>.'; K.noOrphans(title.parentNode); }
      var html = list().map(function (p, i) { return rcardHTML(p, i, !animate); }).join('');
      if (animate && motion()) {
        gsap.to(grid.children, { opacity: 0, y: 30, duration: 0.25, stagger: 0.02, ease: 'power2.in', onComplete: function () {
          grid.innerHTML = html; K.noOrphans(grid);
          gsap.from(grid.children, { opacity: 0, y: 60, scale: 0.96, duration: 0.9, stagger: 0.06, ease: 'expo.out', clearProps: 'all' });
        } });
      } else { grid.innerHTML = html; }
    }
    tabs.addEventListener('click', function (e) {
      var t = e.target.closest('[data-rcat]');
      if (!t) return;
      cat = t.getAttribute('data-rcat');
      try { var u = new URL(location.href); u.search = cat === 'all' ? '' : '?cat=' + cat; history.replaceState(null, '', u.href); } catch (err) { /* file:// may refuse */ }
      paint(true);
    });
    paint(false);
  }

  /* ------------------------------------------------------------------ product */
  function renderProduct() {
    var main = $('[data-render="product"]');
    var p = K.product(K.param('p'));
    if (!p) {
      document.title = 'Not found — Karbonn';
      main.innerHTML = '<section class="not-found container" data-not-found><span class="kicker"><span class="dot"></span>Lost signal</span><h1>That Karbonn is <em>not here</em>.</h1><p>The link may be incomplete. The whole family is one click away.</p><a class="btn btn--black" href="range.html">See the range ' + ARROW + '</a></section>';
      return;
    }
    document.title = p.name + ' — Karbonn';
    var color = p.colors && p.colors[0];
    var soon = p.status === 'coming-soon';
    var long = (p.short || p.name).length > 14 || p.name.length > 20;
    var heroImg = color ? color.images[0] : p.card;
    var price = soon ? '<span class="status status--soon"><span class="dot"></span>Coming soon</span>'
      : '<strong>' + (p.priceFrom ? 'From ' : '') + K.price(p.price) + '</strong>' + (p.mrp ? '<s>' + K.price(p.mrp) + '</s>' : '');
    var colors = p.colors ? '<div class="p-hero__colors" data-p-switch>' + p.colors.map(function (c, i) { return '<button class="sw" type="button" data-sw="' + c.id + '" aria-pressed="' + (i === 0) + '"><i style="background:' + c.swatch + '"></i>' + esc(c.name) + '</button>'; }).join('') + '</div>' : '';
    var cta = soon
      ? '<form class="p-hero__cta" data-form="notify-' + p.id + '"><div class="form-fields"><label class="field"><span class="sr-only">Email address</span><input class="input" type="email" name="email" placeholder="Email me at launch" required></label><button class="btn btn--black" type="submit" data-magnetic="0.2">Notify me</button></div>' +
        '<p data-form-thanks hidden>' + K.icon('circle-check') + 'Done. You will be the first to know.</p></form>'
      : '<div class="p-hero__cta" style="display:flex;gap:12px"><a class="btn btn--black" href="#buy" data-magnetic="0.2">Where to buy ' + ARROW + '</a><a class="btn btn--ghost" href="#specs">Full specs</a></div>';
    var pool = K.images(p, color && color.id).filter(function (v, i, a) { return a.indexOf(v) === i; });
    var chapters = p.story && p.story.length ? p.story : (pool.length >= 3 ? p.highlights.slice(0, 3).map(function (h, i) {
      return { kicker: 'Highlight ' + (i + 1), title: h.title + '.', text: h.text, image: pool[(i + 1) % pool.length] };
    }) : null);
    var details = chapters
      ? '<div class="chapters">' + chapters.map(function (s) {
          var cover = /camera/.test(s.image);
          return '<div class="chapter"><div class="chapter__media' + (cover ? ' chapter__media--cover' : '') + '" data-reveal="clip"><img src="' + K.img(s.image) + '" alt="" loading="lazy"' + (cover ? '' : ' data-parallax="40"') + '></div>' +
            '<div class="chapter__copy" data-reveal="up"><span class="mono mono--red">' + esc(s.kicker) + '</span><h3>' + esc(s.title) + '</h3><p>' + esc(s.text) + '</p></div></div>';
        }).join('') + '</div>'
      : '<div class="feats">' + p.highlights.slice(0, 4).map(function (h) {
          return '<div class="feat" data-reveal="up"><span class="icon-badge">' + K.icon(h.icon) + '</span><h3>' + esc(h.title) + '</h3><p>' + esc(h.text) + '</p></div>';
        }).join('') + '</div>' + (p.banner ? '<div class="p-banner" data-reveal="clip"><img src="' + K.img(p.banner) + '" alt="' + esc(p.name) + ' campaign artwork" loading="lazy"></div>' : '');
    var angles = p.colors ? p.colors.reduce(function (a, c) { return a.concat(c.images.slice(0, 2)); }, []) : (p.gallery || []);
    var related = (p.related || []).map(K.product).filter(Boolean).slice(0, 3);

    main.innerHTML =
      '<section class="p-hero"><div class="container" data-intro>' +
        '<div class="p-hero__card" style="--tint:' + (color ? color.tint : '#F4F3F1') + '">' +
          '<div class="p-hero__copy"><span class="kicker"><span class="dot"></span>' + esc(catLabel[p.category]) + '</span>' +
            '<h1 data-split' + (long ? ' class="is-long"' : '') + '>' + esc(p.name) + '</h1>' +
            '<p class="p-hero__tag">' + esc(p.tagline) + '</p>' +
            '<div class="p-hero__price">' + price + '</div>' + colors + cta + '</div>' +
          '<div class="p-hero__stage"><div class="p-hero__img" data-p-img><img src="' + K.img(heroImg) + '" alt="' + esc(p.name) + '"></div><span class="p-hero__num" data-p-caption>' + esc(color ? color.name : K.category(p.category).name) + '</span></div>' +
        '</div>' +
        '<div class="kspecs">' + p.keySpecs.map(function (k) { return '<div class="kspec"><strong>' + esc(k.value) + '</strong><span>' + esc(k.label) + '</span></div>'; }).join('') + '</div>' +
      '</div></section>' +
      '<section class="section"><div class="container"><div class="head"><span class="mono mono--red">The details</span><h2 data-split>Made to be <em>noticed</em>.</h2></div>' + details + '</div></section>' +
      (angles.length > 1 ? '<section class="section--sm" style="padding-top:0"><div class="container"><div class="head"><span class="mono mono--red">Every angle</span><h2 data-split>Look closer.</h2></div><div class="angles" data-lenis-prevent>' +
        angles.map(function (a) { return '<div class="angle" data-reveal="up"><img src="' + K.img(a) + '" alt="" loading="lazy"></div>'; }).join('') + '</div></div></section>' : '') +
      '<section class="section" id="specs" style="padding-top:40px"><div class="container"><div class="head"><span class="mono mono--red">Specifications</span><h2 data-split>Everything, <em>in detail</em>.</h2>' +
        (soon ? '<p>Specifications shown before launch are indicative and may change.</p>' : '') + '</div><div class="specs2">' +
        p.specs.map(function (g) { return '<div class="specbox" data-reveal="up"><h3>' + esc(g.group) + '</h3><dl>' + g.rows.map(function (r) { return '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd>'; }).join('') + '</dl></div>'; }).join('') +
      '</div></div></section>' +
      '<section class="section--sm" id="buy" style="padding-top:0"><div class="container"><div class="head"><span class="mono mono--red">' + (soon ? 'At launch' : 'Where to buy') + '</span><h2 data-split>' + (soon ? 'Coming to a store <em>near you</em>.' : 'Find it <em>near you</em>.') + '</h2></div><div class="buy-row">' +
        ['Reliance Digital', 'JioMart', 'Amazon', 'Flipkart'].map(function (r) { return '<div class="buy-tile" data-reveal="up"><strong>' + esc(r) + '</strong><span>' + (soon ? 'At launch' : 'Check availability') + '</span></div>'; }).join('') +
      '</div></div></section>' +
      (related.length ? '<section class="section" style="padding-top:40px"><div class="container"><div class="head"><span class="mono mono--red">Keep exploring</span><h2 data-split>More from <em>Karbonn</em>.</h2></div><div class="rgrid">' + related.map(function (r, i) { return rcardHTML(r, i); }).join('') + '</div></div></section>' : '');

    var sw = $('[data-p-switch]');
    if (sw) sw.addEventListener('click', function (e) {
      var b = e.target.closest('[data-sw]');
      if (!b) return;
      var c = p.colors.filter(function (x) { return x.id === b.getAttribute('data-sw'); })[0];
      $$('[data-sw]', sw).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      $('.p-hero__card').style.setProperty('--tint', c.tint);
      $('[data-p-caption]').textContent = c.name;
      var img = $('[data-p-img] img');
      if (motion()) {
        gsap.timeline().to(img, { rotateY: -80, opacity: 0, scale: 0.9, duration: 0.45, ease: 'power3.in' })
          .add(function () { img.src = K.img(c.images[0]); })
          .fromTo(img, { rotateY: 80, opacity: 0, scale: 0.9 }, { rotateY: 0, opacity: 1, scale: 1, duration: 1, ease: 'expo.out' });
      } else img.src = K.img(c.images[0]);
    });
  }

  /* ------------------------------------------------------------------ story & support */
  function renderStory() {
    var nums = $('[data-render="bignums"]');
    if (nums) nums.innerHTML = C.stats.map(function (s) { return '<div class="bignum" data-reveal="up"><strong data-count="' + s.value + '" data-suffix="' + esc(s.suffix) + '">' + s.value + esc(s.suffix) + '</strong><span>' + esc(s.label) + '</span></div>'; }).join('');
    var j = $('[data-render="journey"]');
    if (j) j.innerHTML = C.journey.map(function (x) { return '<div class="jrow" data-reveal="up"><strong>' + esc(x.year) + '</strong><h3>' + esc(x.title) + '</h3><p>' + esc(x.text) + '</p></div>'; }).join('');
    var t = $('[data-render="team"]');
    if (t) t.innerHTML = C.leadership.map(function (l) { return '<div class="member" data-reveal="up"><img src="' + K.img(l.photo) + '" alt="' + esc(l.name) + '" loading="lazy"><div><strong>' + esc(l.name) + '</strong><span>' + esc(l.role) + '</span></div></div>'; }).join('');
  }

  function renderFaq() {
    var faq = $('[data-render="faq"]');
    if (!faq) return;
    var half = Math.ceil(C.faqs.length / 2);
    var col = function (list) { return '<div style="display:grid;gap:14px">' + list.map(function (f) { return '<details data-reveal="up"><summary>' + esc(f.q) + '<span class="pm">' + K.icon('plus') + '</span></summary><p>' + esc(f.a) + '</p></details>'; }).join('') + '</div>'; };
    faq.innerHTML = col(C.faqs.slice(0, half)) + col(C.faqs.slice(half));
  }

  function renderSupport() {
    var sel = $('[data-render="product-options"]');
    if (sel) sel.innerHTML = '<option value="">Choose your product</option>' + D.products.map(function (p) { return '<option value="' + p.id + '">' + esc(p.name) + '</option>'; }).join('');
    var offices = $('[data-render="offices"]');
    if (offices) offices.innerHTML = C.offices.map(function (o) {
      return '<div class="cc" data-reveal="up"><span class="mono mono--red">' + esc(o.label) + '</span><h3>' + esc(o.city) + '</h3><p>' + esc(o.address) + '</p><a href="tel:' + o.phone.replace(/\s/g, '') + '">' + K.icon('phone') + esc(o.phone) + '</a></div>';
    }).join('') + '<div class="cc" data-reveal="up"><span class="mono mono--red">Product queries</span><h3>Helpline</h3><p>' + esc(C.hours) + '.</p><a href="tel:18605001492">' + K.icon('phone') + esc(C.helpline) + '</a><br><a href="mailto:' + esc(C.email) + '">' + K.icon('mail') + esc(C.email) + '</a></div>';
    var finder = $('form[data-form="finder"]');
    if (finder) finder.addEventListener('k:sent', function () { $('[data-finder-pin]').textContent = finder.querySelector('[name=pin]').value.trim(); });
  }

  /* ------------------------------------------------------------------ boot */
  $('#site-header').innerHTML = headerHTML();
  $('#site-footer').innerHTML = footerHTML();
  if (page === 'home') renderHome();
  if (page === 'range') renderRange();
  if (page === 'product') renderProduct();
  if (page === 'story') renderStory();
  if (page === 'support') renderSupport();
  renderFaq();
  K.noOrphans(document);
  K.forms(document);
  K.credit(document);

  /* Header hides on the way down and returns on the way up (small smooth-scroll steps are accumulated). */
  var wrap = $('#site-header');
  var lastY = window.scrollY;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    if (y < 300) { wrap.classList.remove('is-hidden'); lastY = y; return; }
    if (Math.abs(y - lastY) < 10) return;
    wrap.classList.toggle('is-hidden', y > lastY);
    lastY = y;
  }, { passive: true });

  /* ------------------------------------------------------------------ motion */
  var started = KM.init({
    transition: 'wipe',
    preloader: page === 'home',
    intro: function (tl) {
      tl.from('.pill-hdr', { y: -120, duration: 1.2 }, 0);
      if (page === 'home') {
        tl.from('.hero__card', { clipPath: 'inset(12% 8% 12% 8% round 48px)', duration: 1.6, ease: 'expo.inOut' }, 0)
          .from('.hero .kicker, .hero__sub, .hero__actions > *, .sw', { y: 30, opacity: 0, duration: 1, stagger: 0.06 }, 0.7)
          .from('.hero__phone', { yPercent: 60, rotate: 18, scale: 0.7, opacity: 0, duration: 1.9 }, 0.45)
          .from('.hero__ring', { scale: 0.4, opacity: 0, duration: 1.8 }, 0.5)
          .from('.chip-float', { scale: 0, opacity: 0, duration: 1.1, stagger: 0.12, ease: 'back.out(1.7)' }, 1.2)
          .from('.mini', { y: 80, opacity: 0, duration: 1.2, stagger: 0.12 }, 0.9);
      } else {
        tl.from('[data-intro] .kicker, [data-intro] .mono, [data-intro] p, [data-intro] .p-hero__price, [data-intro] .p-hero__colors, [data-intro] .p-hero__cta, [data-intro] .kspec, [data-intro] .hotline, [data-intro] .range-tabs',
          { y: 30, opacity: 0, duration: 1, stagger: 0.05 }, 0.35);
        tl.from('[data-intro] .p-hero__card, [data-intro] .sup-hero__card', { clipPath: 'inset(10% 6% 10% 6% round 48px)', duration: 1.5, ease: 'expo.inOut' }, 0);
        tl.from('[data-intro] .p-hero__img', { yPercent: 40, rotate: 12, scale: 0.75, opacity: 0, duration: 1.8 }, 0.45);
      }
    }
  });

  /* Custom cursor */
  if (started && window.matchMedia('(pointer: fine)').matches) {
    var cur = document.createElement('div');
    cur.className = 'cursor';
    cur.innerHTML = '<span>View</span>';
    document.body.appendChild(cur);
    var xTo = gsap.quickTo(cur, 'x', { duration: 0.35, ease: 'power3.out' });
    var yTo = gsap.quickTo(cur, 'y', { duration: 0.35, ease: 'power3.out' });
    window.addEventListener('mousemove', function (e) {
      xTo(e.clientX); yTo(e.clientY);
      cur.classList.add('is-on');
      var t = e.target.closest ? e.target : null;
      var view = t && t.closest('[data-cursor="view"]');
      var link = t && t.closest('a, button, summary, input, select, textarea, label');
      cur.classList.toggle('is-view', !!view);
      cur.classList.toggle('is-link', !view && !!link);
    });
    document.addEventListener('mouseleave', function () { cur.classList.remove('is-on'); });
  }

  if (!started) return;

  if (page === 'home') {
    // Hero phone follows the cursor in 3D and drifts with scroll.
    var heroCard = $('.hero__card');
    var phone = $('.hero__phone');
    var rx = gsap.quickTo(phone, 'rotationX', { duration: 0.9, ease: 'power3.out' });
    var ry = gsap.quickTo(phone, 'rotationY', { duration: 0.9, ease: 'power3.out' });
    heroCard.addEventListener('mousemove', function (e) {
      var r = heroCard.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 18);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 12);
      gsap.to('.chip-float', { x: ((e.clientX - r.left) / r.width - 0.5) * -30, y: ((e.clientY - r.top) / r.height - 0.5) * -20, duration: 1, ease: 'power3.out' });
    });
    heroCard.addEventListener('mouseleave', function () { rx(0); ry(0); });
    gsap.to('.hero__stage', { yPercent: -12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero__copy', { yPercent: 18, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    // Stacked cards shrink and dim as the next card slides over them.
    var cards = $$('[data-stack-card]');
    cards.forEach(function (c, i) {
      var next = cards[i + 1];
      if (!next) return;
      gsap.to(c, { scale: 0.92, ease: 'none', scrollTrigger: { trigger: next, start: 'top bottom', end: 'top ' + (112 + (i + 1) * 14) + 'px', scrub: true } });
      gsap.to(c.querySelector('[data-shade]'), { opacity: 0.35, ease: 'none', scrollTrigger: { trigger: next, start: 'top bottom', end: 'top ' + (112 + (i + 1) * 14) + 'px', scrub: true } });
    });
    cards.forEach(function (c) {
      gsap.fromTo(c.querySelector('[data-stack-img]'), { y: 50, rotate: 6 }, { y: -30, rotate: -3, ease: 'none', scrollTrigger: { trigger: c, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    // Pinned horizontal range.
    var track = $('[data-render="hrange"]');
    var viewport = $('.hrange__viewport');
    var bar = $('.hrange__progress span');
    if (track && viewport) {
      var dist = function () { return Math.max(0, track.scrollWidth - viewport.clientWidth); };
      gsap.to(track, { x: function () { return -dist(); }, ease: 'none', scrollTrigger: {
        trigger: '.hrange', start: 'top top', end: function () { return '+=' + dist(); }, pin: true, scrub: 1, invalidateOnRefresh: true,
        onUpdate: function (self) { if (bar) bar.style.transform = 'scaleX(' + self.progress + ')'; }
      } });
    }

    // Callout lines draw themselves.
    $$('.annot__lines path').forEach(function (path) {
      var len = path.getTotalLength();
      gsap.fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '.annot', start: 'top 75%', end: 'center 50%', scrub: true } });
    });
    gsap.from('.annot__lines circle', { scale: 0, transformOrigin: '50% 50%', stagger: 0.1, ease: 'back.out(2)', scrollTrigger: { trigger: '.annot', start: 'center 60%', toggleActions: 'play none none reverse' } });
    gsap.fromTo('.annot__center img', { rotate: -10, scale: 0.85 }, { rotate: 4, scale: 1, ease: 'none', scrollTrigger: { trigger: '.annot', start: 'top bottom', end: 'bottom top', scrub: true } });

    // CTA phones burst out of the banner.
    gsap.fromTo('.cta__img img', { y: 160, rotate: -14 }, { y: -10, rotate: -4, ease: 'none', scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'bottom 60%', scrub: true } });
    gsap.fromTo('.hs-big img', { y: 80, scale: 0.9 }, { y: -20, scale: 1, ease: 'none', scrollTrigger: { trigger: '.hs-big', start: 'top bottom', end: 'bottom top', scrub: true } });
  }
  if (page === 'product') {
    // Scroll drift on the image; the intro animates the .p-hero__img wrapper (a shared target would capture its offset).
    gsap.to('[data-p-img] img', { yPercent: -10, ease: 'none', scrollTrigger: { trigger: '.p-hero', start: 'top top', end: 'bottom top', scrub: true } });
  }
})();

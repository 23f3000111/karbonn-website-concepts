/* Karbonn — Concept A "Store". Renders shared chrome and data-driven sections, wires the store interactions.
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
  var hasGsap = function () { return !!(window.gsap && window.KM && KM.active); };

  /* ------------------------------------------------------------------ cart */
  var CART_KEY = 'karbonn-cart';
  var Cart = {
    items: function () { return K.store.get(CART_KEY, []); },
    save: function (items) { K.store.set(CART_KEY, items); updateCount(); renderBag(); },
    add: function (id, colorId, variant, qty) {
      var items = Cart.items();
      var key = [id, colorId || '', variant || ''].join('|');
      var hit = items.filter(function (i) { return i.key === key; })[0];
      if (hit) hit.qty += qty || 1;
      else items.push({ key: key, id: id, color: colorId || '', variant: variant || '', qty: qty || 1 });
      Cart.save(items);
    },
    setQty: function (key, qty) {
      var items = Cart.items().map(function (i) { if (i.key === key) i.qty = qty; return i; }).filter(function (i) { return i.qty > 0; });
      Cart.save(items);
    },
    count: function () { return Cart.items().reduce(function (s, i) { return s + i.qty; }, 0); },
    total: function () { return Cart.items().reduce(function (s, i) { var p = K.product(i.id); return s + (p && p.price ? p.price * i.qty : 0); }, 0); }
  };

  function updateCount() {
    $$('[data-cart-count]').forEach(function (el) {
      var n = Cart.count();
      el.textContent = String(n);
      el.classList.toggle('has-items', n > 0);
    });
  }

  /* ------------------------------------------------------------------ chrome */
  function megaLink(p) {
    return '<a class="mega__link" href="product.html?p=' + p.id + '"><img src="' + K.img(p.card) + '" alt="" loading="lazy">' +
      '<span><strong>' + esc(K.short(p)) + '</strong><span>' + esc(K.priceText(p)) + '</span></span></a>';
  }

  function headerHTML() {
    var chev = K.icon('chevron-down');
    var cur = function (name) { return page === name ? ' aria-current="page"' : ''; };
    return '' +
      '<div class="hdr"><div class="container hdr__inner">' +
        '<a class="hdr__logo" href="index.html" aria-label="Karbonn home">' + K.logo() + '</a>' +
        '<nav class="nav" aria-label="Main">' +
          '<div class="nav__item"><a class="nav__link" href="shop.html?cat=smartphones">Phones ' + chev + '</a>' +
            '<div class="mega"><div class="container mega__inner">' +
              '<div class="mega__col"><h4>Smartphones</h4>' + K.byCategory('smartphones').map(megaLink).join('') + '</div>' +
              '<div class="mega__col"><h4>4G Feature Phones</h4>' + K.byCategory('feature-phones').map(megaLink).join('') + '</div>' +
              '<a class="mega__feature" href="product.html?p=zenz-pro"><span class="eyebrow"><span class="dot"></span>Coming soon</span>' +
                '<h3>ZenZ Pro in Cherry Red</h3><p>64MP AI camera, 7.99 mm thin, four finishes.</p>' +
                '<span class="link-arrow">Get launch alerts ' + K.icon('arrow-right') + '</span>' +
                '<img src="' + K.img('zenz-pro/cherry-red-dynamic.webp') + '" alt=""></a>' +
            '</div></div></div>' +
          '<div class="nav__item"><a class="nav__link" href="shop.html?cat=smart-tvs">TV &amp; Home ' + chev + '</a>' +
            '<div class="mega"><div class="container mega__inner">' +
              '<div class="mega__col"><h4>Smart TVs</h4>' + K.byCategory('smart-tvs').map(megaLink).join('') + '</div>' +
              '<div class="mega__col"><h4>Home Appliances</h4>' + K.byCategory('appliances').map(megaLink).join('') + '</div>' +
              '<a class="mega__feature" href="product.html?p=tv-karnival"><span class="eyebrow">4K Ultra HD</span>' +
                '<h3>Karnival Series 55″</h3><p>HDR10, DTS Studio Sound and Dolby Audio.</p>' +
                '<span class="link-arrow">Shop the TV ' + K.icon('arrow-right') + '</span>' +
                '<img src="' + K.img('tv-karnival/front.webp') + '" alt="" style="height:auto;width:380px;bottom:30px;right:-60px"></a>' +
            '</div></div></div>' +
          '<div class="nav__item"><a class="nav__link" href="shop.html"' + cur('shop') + '>Shop all</a></div>' +
          '<div class="nav__item"><a class="nav__link" href="support.html"' + cur('support') + '>Support</a></div>' +
          '<div class="nav__item"><a class="nav__link" href="about.html"' + cur('about') + '>About</a></div>' +
        '</nav>' +
        '<div class="hdr__tools">' +
          '<div class="search" role="search"><label class="search__box">' + K.icon('search') +
            '<span class="sr-only">Search products</span><input type="search" placeholder="Search Karbonn" autocomplete="off" data-search-input></label>' +
            '<div class="search__panel" data-search-panel></div></div>' +
          '<button class="icon-btn cart-btn" type="button" data-open-cart aria-label="Open your bag">' + K.icon('bag') +
            '<span class="cart-count" data-cart-count>0</span></button>' +
        '</div>' +
      '</div></div>';
  }

  function anncHTML() {
    var msgs = [
      '<span class="dot"></span><span>The next Kamaal is koming. <a href="product.html?p=zenz-pro">Get ZenZ Pro launch alerts</a></span>',
      K.icon('wrench') + '<span>Karbonn Klinic service at 500+ centres across India</span>',
      K.icon('truck') + '<span>Doorstep pickup and drop for repairs. <a href="support.html#pickup">Book a pickup</a></span>'
    ];
    return '<div class="annc"><div class="container annc__inner">' +
      '<span class="annc__side">' + K.icon('phone') + ' ' + esc(C.helpline) + '</span>' +
      '<div class="annc__rotator" data-orphan-skip>' + msgs.map(function (m, i) { return '<p class="annc__msg"' + (i ? ' aria-hidden="true"' : '') + '>' + m + '</p>'; }).join('') + '</div>' +
      '<span class="annc__side">' + K.icon('map-pin') + ' Made for India</span>' +
    '</div></div>';
  }

  function footerHTML() {
    var cats = D.categories.map(function (c) { return '<a href="shop.html?cat=' + c.id + '">' + esc(c.name) + '</a>'; }).join('');
    var s = C.socials;
    var social = function (href, icon, label) { return '<a href="' + href + '" target="_blank" rel="noopener" aria-label="' + label + '">' + K.icon(icon) + '</a>'; };
    return '<div class="ftr"><div class="container">' +
      '<div class="ftr__top">' +
        '<div class="ftr__brand">' + K.logo() + '<p>' + esc(C.tagline) + '. Phones, TVs and home appliances made for India since 2009.</p>' +
          '<div class="ftr__contact"><a href="tel:18605001492">' + K.icon('phone') + esc(C.helpline) + '</a>' +
          '<a href="mailto:' + esc(C.email) + '">' + K.icon('mail') + esc(C.email) + '</a>' +
          '<span>' + K.icon('map-pin') + 'Okhla Phase 1, New Delhi</span></div></div>' +
        '<div><h4>Shop</h4><div class="ftr__links">' + cats + '<a href="shop.html">All products</a></div></div>' +
        '<div><h4>Support</h4><div class="ftr__links"><a href="support.html#finder">Find a Klinic</a><a href="support.html#pickup">Book a pickup</a><a href="support.html#warranty">Warranty</a><a href="support.html#faq">FAQs</a></div></div>' +
        '<div><h4>Company</h4><div class="ftr__links"><a href="about.html">About Karbonn</a><a href="about.html#journey">Our journey</a><a href="about.html#leadership">Leadership</a><a href="support.html#contact">Contact</a></div></div>' +
        '<div class="ftr__news"><h4>Be the first to know</h4><p>Launches, offers and stories from Karbonn. No spam.</p>' +
          '<form class="ftr__form" data-form="newsletter"><div class="form-fields inline-form"><label class="field"><span class="sr-only">Email address</span>' +
          '<input class="input input--pill" type="email" name="email" placeholder="Your email address" required></label>' +
          '<button class="btn btn--red btn--sm" type="submit">Subscribe</button></div>' +
          '<p data-form-thanks hidden>' + K.icon('circle-check') + 'You are on the list. Watch your inbox.</p></form>' +
          '<div class="ftr__social">' + social(s.facebook, 'facebook', 'Karbonn on Facebook') + social(s.instagram, 'instagram', 'Karbonn on Instagram') + social(s.x, 'x-brand', 'Karbonn on X') + social(s.youtube, 'youtube', 'Karbonn on YouTube') + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="ftr__giant" aria-hidden="true">' + K.logo('', '') + '</div>' +
      '<div class="ftr__bottom"><span>© 2026 Karbonn Mobiles. All rights reserved.</span><span class="credit" data-credit></span><span>Made for India</span></div>' +
    '</div></div>';
  }

  function drawerHTML() {
    return '<div class="drawer" data-drawer aria-hidden="true"><div class="drawer__scrim" data-close-cart></div>' +
      '<aside class="drawer__panel" role="dialog" aria-label="Your bag"><div class="drawer__head"><h3>Your bag</h3>' +
      '<button class="icon-btn" type="button" data-close-cart aria-label="Close bag">' + K.icon('x') + '</button></div>' +
      '<div class="drawer__body" data-bag data-lenis-prevent></div><div class="drawer__foot" data-bag-foot></div></aside></div>' +
      '<div class="modal" data-modal aria-hidden="true"><div class="modal__scrim" data-close-modal></div><div class="modal__card" role="dialog" aria-label="Checkout">' +
      '<button class="icon-btn modal__close" type="button" data-close-modal aria-label="Close">' + K.icon('x') + '</button>' +
      '<div class="icon-badge">' + K.icon('lock') + '</div><h3>Secure checkout</h3>' +
      '<p>In the live store this step takes UPI, cards, net banking and EMI through a secure payment gateway, with delivery to your PIN code.</p>' +
      '<button class="btn btn--dark" type="button" data-close-modal>Back to the store</button></div></div>' +
      '<div class="toast" data-toast role="status">' + K.icon('circle-check') + '<span data-toast-text></span></div>';
  }

  function renderBag() {
    var body = $('[data-bag]');
    var foot = $('[data-bag-foot]');
    if (!body) return;
    var items = Cart.items();
    if (!items.length) {
      body.innerHTML = '<div class="bag-empty">' + K.icon('bag') + '<p>Your bag is empty.</p><a class="btn btn--dark btn--sm" href="shop.html">Shop best sellers</a></div>';
      foot.innerHTML = '';
      return;
    }
    body.innerHTML = items.map(function (i) {
      var p = K.product(i.id);
      if (!p) return '';
      var color = (p.colors || []).filter(function (c) { return c.id === i.color; })[0];
      var img = color ? color.images[0] : p.card;
      return '<div class="bag-item"><img src="' + K.img(img) + '" alt="">' +
        '<div><strong>' + esc(K.short(p)) + '</strong><span>' + esc([color && color.name, i.variant].filter(Boolean).join(' · ') || K.category(p.category).short) + '</span>' +
        '<div style="margin-top:10px"><span class="qty"><button type="button" data-qty="' + esc(i.key) + '" data-d="-1" aria-label="Fewer">' + K.icon('minus') + '</button><output>' + i.qty + '</output>' +
        '<button type="button" data-qty="' + esc(i.key) + '" data-d="1" aria-label="More">' + K.icon('plus') + '</button></span></div></div>' +
        '<div class="bag-item__side"><span class="bag-item__price">' + K.price(p.price * i.qty) + '</span><button class="remove" type="button" data-remove="' + esc(i.key) + '">Remove</button></div></div>';
    }).join('');
    foot.innerHTML = '<div class="drawer__total"><span>Subtotal (' + Cart.count() + ' item' + (Cart.count() > 1 ? 's' : '') + ')</span><strong>' + K.price(Cart.total()) + '</strong></div>' +
      '<p class="price-note">Inclusive of all taxes. Delivery calculated at checkout.</p>' +
      '<button class="btn btn--red btn--block" type="button" data-checkout>Checkout ' + K.icon('arrow-right') + '</button>';
  }

  function openCart() { var d = $('[data-drawer]'); d.classList.add('is-open'); d.setAttribute('aria-hidden', 'false'); if (window.KM && KM.lenis) KM.lenis.stop(); }
  function closeCart() { var d = $('[data-drawer]'); d.classList.remove('is-open'); d.setAttribute('aria-hidden', 'true'); if (window.KM && KM.lenis) KM.lenis.start(); }
  function openModal() { var m = $('[data-modal]'); m.classList.add('is-open'); m.setAttribute('aria-hidden', 'false'); }
  function closeModal() { var m = $('[data-modal]'); m.classList.remove('is-open'); m.setAttribute('aria-hidden', 'true'); }

  var toastTimer;
  function toast(text) {
    var t = $('[data-toast]');
    $('[data-toast-text]').textContent = text;
    t.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('is-on'); }, 2600);
  }

  /* The product image flies into the bag icon. */
  function flyToCart(img) {
    var btn = $('[data-open-cart]');
    if (!img || !btn || !hasGsap()) { bump(btn); return; }
    var a = img.getBoundingClientRect();
    var b = btn.getBoundingClientRect();
    var clone = document.createElement('img');
    clone.src = img.currentSrc || img.src;
    clone.className = 'fly-img';
    Object.assign(clone.style, { left: a.left + 'px', top: a.top + 'px', width: a.width + 'px', height: a.height + 'px' });
    document.body.appendChild(clone);
    var dx = b.left + b.width / 2 - (a.left + a.width / 2);
    var dy = b.top + b.height / 2 - (a.top + a.height / 2);
    gsap.timeline({ onComplete: function () { clone.remove(); bump(btn); } })
      .to(clone, { x: dx, duration: 0.9, ease: 'power2.inOut' }, 0)
      .to(clone, { y: dy, duration: 0.9, ease: 'back.in(1.2)' }, 0)
      .to(clone, { scale: 0.08, rotate: 25, opacity: 0.6, duration: 0.9, ease: 'power3.in' }, 0);
  }
  function bump(btn) { if (!btn) return; btn.classList.remove('is-bumped'); void btn.offsetWidth; btn.classList.add('is-bumped'); }

  function addToCart(p, colorId, variant, qty, imgEl) {
    Cart.add(p.id, colorId, variant, qty);
    flyToCart(imgEl);
    toast(K.short(p) + ' added to your bag');
  }

  /* ------------------------------------------------------------------ search */
  function initSearch() {
    var input = $('[data-search-input]');
    var panel = $('[data-search-panel]');
    var box = input.closest('.search');
    var active = -1;
    var hits = [];
    function match(qs) {
      qs = qs.trim().toLowerCase();
      if (!qs) return D.products.filter(function (p) { return p.status === 'coming-soon' || p.badge; }).slice(0, 5);
      return D.products.filter(function (p) {
        var cat = K.category(p.category);
        return (p.name + ' ' + (p.short || '') + ' ' + cat.name + ' ' + p.tagline).toLowerCase().indexOf(qs) > -1;
      }).slice(0, 6);
    }
    function draw() {
      hits = match(input.value);
      panel.innerHTML = (hits.length ? hits.map(function (p, i) {
        return '<a class="search__hit' + (i === active ? ' is-active' : '') + '" href="product.html?p=' + p.id + '"><img src="' + K.img(p.card) + '" alt="">' +
          '<span><strong>' + esc(K.short(p)) + '</strong><span>' + esc(K.category(p.category).short) + '</span></span><em>' + esc(K.priceText(p)) + '</em></a>';
      }).join('') : '<p class="search__empty">No products match “' + esc(input.value) + '”.</p>') +
        '<a class="search__all" href="shop.html' + (input.value.trim() ? '?q=' + encodeURIComponent(input.value.trim()) : '') + '">See all results</a>';
    }
    input.addEventListener('focus', function () { active = -1; draw(); box.classList.add('is-open'); });
    input.addEventListener('input', function () { active = -1; draw(); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { active = Math.min(active + 1, hits.length - 1); draw(); e.preventDefault(); }
      else if (e.key === 'ArrowUp') { active = Math.max(active - 1, -1); draw(); e.preventDefault(); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        if (active > -1 && hits[active]) location.href = 'product.html?p=' + hits[active].id;
        else location.href = 'shop.html' + (input.value.trim() ? '?q=' + encodeURIComponent(input.value.trim()) : '');
      } else if (e.key === 'Escape') { input.blur(); box.classList.remove('is-open'); }
    });
    document.addEventListener('click', function (e) { if (!box.contains(e.target)) box.classList.remove('is-open'); });
  }

  /* ------------------------------------------------------------------ cards */
  function swatches(p) {
    if (!p.colors || p.colors.length < 2) return '';
    return '<span class="pcard__swatches">' + p.colors.map(function (c) { return '<span style="background:' + c.swatch + '" title="' + esc(c.name) + '"></span>'; }).join('') + '</span>';
  }

  function cardHTML(p, opt) {
    opt = opt || {};
    var tv = p.category === 'smart-tvs';
    var badge = p.status === 'coming-soon' ? '<span class="pcard__badge pcard__badge--red">' + (p.badge === 'New' ? 'New · ' : '') + 'Coming soon</span>'
      : (p.badge ? '<span class="pcard__badge' + (p.badge === 'Bestseller' ? ' pcard__badge--dark' : '') + '">' + esc(p.badge) + '</span>' : '');
    var price = p.status === 'coming-soon' ? '<span class="pcard__price pcard__price--soon">Coming soon</span>'
      : '<span class="pcard__price">' + (p.priceFrom ? 'From ' : '') + K.price(p.price) + (p.mrp ? '<s>' + K.price(p.mrp) + '</s>' : '') + '</span>';
    var quick = p.status === 'in-stock'
      ? '<button class="pcard__quick" type="button" data-quick-add="' + p.id + '" aria-label="Add ' + esc(K.short(p)) + ' to bag">' + K.icon('plus') + '</button>'
      : '<span class="pcard__quick" aria-hidden="true">' + K.icon('arrow-up-right') + '</span>';
    return '<article class="pcard" data-product-card' + (opt.reveal === false ? '' : ' data-reveal="up"') + '>' +
      '<a class="pcard__media" href="product.html?p=' + p.id + '" aria-label="' + esc(p.name) + '">' + badge +
        '<img class="pcard__img' + (tv ? ' pcard__img--tv' : '') + '" src="' + K.img(p.card) + '" alt="' + esc(p.name) + '" loading="lazy"></a>' + quick +
      '<div class="pcard__body"><span class="pcard__cat">' + esc(K.category(p.category).short) + '</span>' +
        '<h3 class="pcard__name"><a href="product.html?p=' + p.id + '">' + esc(K.short(p)) + '</a></h3>' +
        '<div class="pcard__row">' + price + swatches(p) + '</div></div>' +
    '</article>';
  }

  /* Re-render a grid with an exit/enter animation. */
  function swapGrid(grid, list) {
    var paint = function () {
      grid.innerHTML = list.map(function (p) { return cardHTML(p, { reveal: false }); }).join('');
      K.noOrphans(grid);
      if (hasGsap()) gsap.from(grid.children, { opacity: 0, y: 40, scale: 0.97, duration: 0.8, ease: 'power4.out', stagger: 0.05, clearProps: 'all' });
    };
    if (hasGsap() && grid.children.length) gsap.to(grid.children, { opacity: 0, y: 20, duration: 0.25, stagger: 0.02, ease: 'power2.in', onComplete: paint });
    else paint();
  }

  /* ------------------------------------------------------------------ pages */
  function renderHome() {
    var best = ['k9-4g', 'tv-kohinoor', 'tv-kanvas', 'washer-7kg'].map(K.product);
    var bestGrid = $('[data-render="bestsellers"]');
    if (bestGrid) bestGrid.innerHTML = best.map(function (p) { return cardHTML(p); }).join('');
    var latestGrid = $('[data-render="latest"]');
    var order = ['zenz-pro', 'zenz', 'k9-pro-4g', 'k9-stylo-4g', 'tv-karnival', 'k104i', 'tv-millennium', 'k9-4g', 'tv-kohinoor', 'tv-kanvas', 'washer-7kg'];
    var latest = function (cat) { return order.map(K.product).filter(function (p) { return !cat || p.category === cat; }).slice(0, 8); };
    if (latestGrid) latestGrid.innerHTML = latest().map(function (p) { return cardHTML(p); }).join('');
    $$('[data-latest-tab]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        $$('[data-latest-tab]').forEach(function (t) { t.setAttribute('aria-selected', String(t === tab)); });
        swapGrid(latestGrid, latest(tab.getAttribute('data-latest-tab')));
      });
    });
  }

  function renderShop() {
    var grid = $('[data-render="shop"]');
    var catParam = K.param('cat');
    var state = {
      cat: K.category(catParam) ? catParam : 'all',
      q: (K.param('q') || '').trim(),
      avail: 'all',
      sort: 'featured'
    };
    var title = $('[data-shop-title]');
    var lead = $('[data-shop-lead]');
    var count = $('[data-shop-count]');
    var pills = $('[data-shop-pills]');
    pills.innerHTML = '<button class="tab" type="button" data-cat="all">All products</button>' +
      D.categories.map(function (c) { return '<button class="tab" type="button" data-cat="' + c.id + '">' + esc(c.short) + '</button>'; }).join('');
    function list() {
      var out = D.products.filter(function (p) {
        if (state.cat !== 'all' && p.category !== state.cat) return false;
        if (state.avail !== 'all' && p.status !== state.avail) return false;
        if (state.q) {
          var hay = (p.name + ' ' + (p.short || '') + ' ' + p.tagline + ' ' + K.category(p.category).name).toLowerCase();
          if (hay.indexOf(state.q.toLowerCase()) < 0) return false;
        }
        return true;
      });
      var priced = function (p) { return p.price == null ? Infinity : p.price; };
      if (state.sort === 'low') out.sort(function (a, b) { return priced(a) - priced(b); });
      if (state.sort === 'high') out.sort(function (a, b) { return (b.price || 0) - (a.price || 0); });
      if (state.sort === 'name') out.sort(function (a, b) { return K.short(a).localeCompare(K.short(b)); });
      return out;
    }
    function heading() {
      var c = K.category(state.cat);
      title.textContent = state.q ? 'Results for “' + state.q + '”' : (c ? c.name : 'All products');
      lead.textContent = c ? c.blurb : 'Smartphones, 4G feature phones, smart TVs and home appliances, made for India.';
      $$('[data-cat]', pills).forEach(function (b) { b.setAttribute('aria-selected', String(b.getAttribute('data-cat') === state.cat)); });
      K.noOrphans($('.page-hero'));
    }
    function draw(animate) {
      var items = list();
      count.textContent = items.length + (items.length === 1 ? ' product' : ' products');
      if (!items.length) {
        grid.innerHTML = '<div class="empty"><h3>Nothing matches yet</h3><p>Try another category or clear your search.</p><button class="btn btn--dark btn--sm" type="button" data-reset>Show all products</button></div>';
        return;
      }
      if (animate) swapGrid(grid, items);
      else { grid.innerHTML = items.map(function (p) { return cardHTML(p); }).join(''); }
    }
    function sync() {
      try {
        var u = new URL(location.href);
        u.search = '';
        if (state.cat !== 'all') u.searchParams.set('cat', state.cat);
        if (state.q) u.searchParams.set('q', state.q);
        history.replaceState(null, '', u.href);
      } catch (e) { /* file:// may refuse; the page still works */ }
    }
    pills.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cat]');
      if (!b) return;
      state.cat = b.getAttribute('data-cat');
      state.q = '';
      heading(); draw(true); sync();
    });
    $('[data-shop-avail]').addEventListener('change', function (e) { state.avail = e.target.value; draw(true); });
    $('[data-shop-sort]').addEventListener('change', function (e) { state.sort = e.target.value; draw(true); });
    grid.addEventListener('click', function (e) {
      if (!e.target.closest('[data-reset]')) return;
      state = { cat: 'all', q: '', avail: 'all', sort: 'featured' };
      $('[data-shop-avail]').value = 'all'; $('[data-shop-sort]').value = 'featured';
      heading(); draw(true); sync();
    });
    heading();
    draw(false);
  }

  function specsHTML(p) {
    return p.specs.map(function (g) {
      return '<div class="spec-group"><h3>' + esc(g.group) + '</h3><table class="spec-table"><tbody>' +
        g.rows.map(function (r) { return '<tr><th>' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td></tr>'; }).join('') + '</tbody></table></div>';
    }).join('');
  }

  function renderProduct() {
    var main = $('[data-render="product"]');
    var p = K.product(K.param('p'));
    if (!p) {
      document.title = 'Product not found — Karbonn';
      main.innerHTML = '<section class="not-found container" data-not-found><div class="icon-badge">' + K.icon('search') + '</div>' +
        '<h1>We could not find that product</h1><p>It may have moved, or the link may be incomplete.</p>' +
        '<a class="btn btn--dark" href="shop.html">Browse all products ' + K.icon('arrow-right') + '</a></section>';
      return;
    }
    document.title = p.name + ' — Karbonn';
    var cat = K.category(p.category);
    var color = p.colors && p.colors[0];
    var variant = p.variants && p.variants[0];
    var soon = p.status === 'coming-soon';
    var priceBlock = soon
      ? '<div class="soon-pill"><span class="dot"></span>Coming soon</div><p class="price-note">Price will be announced at launch.</p>'
      : '<div class="price-block"><strong>' + (p.priceFrom ? 'From ' : '') + K.price(p.price) + '</strong>' + (p.mrp ? '<s>' + K.price(p.mrp) + '</s><span class="save">Save ' + Math.round((1 - p.price / p.mrp) * 100) + '%</span>' : '') + '</div><p class="price-note">Inclusive of all taxes.</p>';
    var colorOpt = p.colors ? '<div class="opt"><p class="opt__label">Colour: <strong data-color-name>' + esc(color.name) + '</strong></p><div class="swatches">' +
      p.colors.map(function (c, i) { return '<button class="swatch" type="button" data-color="' + c.id + '" aria-pressed="' + (i === 0) + '" aria-label="' + esc(c.name) + '"><span style="background:' + c.swatch + '"></span></button>'; }).join('') + '</div></div>' : '';
    var variantOpt = p.variants ? '<div class="opt"><p class="opt__label">Memory: <strong data-variant-name>' + esc(variant) + '</strong></p><div class="chips">' +
      p.variants.map(function (v, i) { return '<button class="chip" type="button" data-variant="' + esc(v) + '" aria-pressed="' + (i === 0) + '">' + esc(v) + '</button>'; }).join('') + '</div></div>' : '';
    var action = soon
      ? '<div class="notify" id="notify"><h3>Be the first to know</h3><p>We will email you the moment ' + esc(p.name) + ' goes on sale.</p>' +
        '<form data-form="notify-' + p.id + '"><div class="form-fields inline-form"><label class="field"><span class="sr-only">Email address</span>' +
        '<input class="input input--pill" type="email" name="email" placeholder="Your email address" required></label>' +
        '<button class="btn btn--red" type="submit" data-magnetic>Notify me</button></div>' +
        '<p data-form-thanks hidden>' + K.icon('circle-check') + 'Done. You will hear from us first.</p></form></div>'
      : '<div class="buy"><span class="qty qty--lg"><button type="button" data-pqty="-1" aria-label="Fewer">' + K.icon('minus') + '</button><output data-pqty-out>1</output>' +
        '<button type="button" data-pqty="1" aria-label="More">' + K.icon('plus') + '</button></span>' +
        '<button class="btn btn--red" type="button" data-add-to-cart data-magnetic="0.15">' + K.icon('bag') + 'Add to bag</button>' +
        '<button class="btn btn--dark" type="button" data-buy-now>Buy now</button></div>';
    var imgs = K.images(p, color && color.id);
    var related = (p.related || []).map(K.product).filter(Boolean);
    var story = (p.story || []).length ? '<section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">Why you will love it</span><h2 data-split style="margin-top:12px">Made to be noticed.</h2></div></div>' +
      '<div class="story">' + p.story.map(function (s) {
        return '<div class="story__row"><div class="story__media' + (/camera/.test(s.image) ? ' story__media--cover' : '') + '" data-reveal="clip"><img src="' + K.img(s.image) + '" alt="" loading="lazy"' + (/camera/.test(s.image) ? '' : ' data-parallax="30"') + '></div>' +
          '<div class="story__copy" data-reveal="up"><span class="eyebrow">' + esc(s.kicker) + '</span><h3>' + esc(s.title) + '</h3><p>' + esc(s.text) + '</p></div></div>';
      }).join('') + '</div></div></section>' : '';
    var box = p.box && p.box.length
      ? '<ul class="box-list">' + p.box.map(function (b) { return '<li>' + K.icon('package') + '<span>' + esc(b) + '</span></li>'; }).join('') + '</ul>'
      : '<p class="muted">Box contents will be confirmed at launch.</p>';

    main.innerHTML =
      '<section class="pdp"><div class="container" data-intro>' +
        '<nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a>' + K.icon('chevron-right') + '<a href="shop.html?cat=' + cat.id + '">' + esc(cat.name) + '</a>' + K.icon('chevron-right') + '<span>' + esc(K.short(p)) + '</span></nav>' +
        '<div class="pdp__grid">' +
          '<div class="gallery"><div class="thumbs" data-thumbs></div><div class="stage" data-tilt="5">' +
            (soon ? '<span class="pcard__badge pcard__badge--red stage__badge">Coming soon</span>' : (p.badge ? '<span class="pcard__badge pcard__badge--dark stage__badge">' + esc(p.badge) + '</span>' : '')) +
            '<img class="stage__img" data-stage src="' + K.img(imgs[0]) + '" alt="' + esc(p.name) + '" data-tilt-img></div></div>' +
          '<div class="info"><span class="info__cat">' + esc(cat.name) + '</span><h1 data-split>' + esc(p.name) + '</h1>' +
            '<p class="info__tagline">' + esc(p.tagline) + '</p>' + priceBlock + '<p class="info__summary">' + esc(p.summary) + '</p>' +
            colorOpt + variantOpt + action +
            '<ul class="assure"><li>' + K.icon('shield-check') + 'One-year manufacturer warranty</li><li>' + K.icon('wrench') + 'Karbonn Klinic service at 500+ centres</li><li>' + K.icon('truck') + 'Doorstep pickup and drop for repairs</li></ul>' +
          '</div>' +
        '</div></div></section>' +
      '<section class="section--paper"><div class="container"><div class="keyspecs">' +
        p.keySpecs.map(function (k) { return '<div class="keyspec" data-reveal="up"><strong>' + esc(k.value) + '</strong><span>' + esc(k.label) + '</span></div>'; }).join('') +
      '</div></div></section>' +
      '<section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">Highlights</span><h2 data-split style="margin-top:12px">Everything that matters.</h2></div></div>' +
        '<div class="highlights' + (p.highlights.length === 4 ? ' highlights--4' : '') + '">' + p.highlights.map(function (h) { return '<div class="highlight" data-reveal="up">' + K.icon(h.icon) + '<h3>' + esc(h.title) + '</h3><p>' + esc(h.text) + '</p></div>'; }).join('') + '</div></div></section>' +
      story +
      '<section class="section section--paper" id="specs"><div class="container"><div class="section-head"><div><span class="eyebrow">Details</span><h2 data-split style="margin-top:12px">Specifications</h2></div>' +
        '<div class="spec-tabs tabs" role="tablist"><button class="tab" type="button" role="tab" aria-selected="true" data-spec-tab="specs">Specifications</button><button class="tab" type="button" role="tab" aria-selected="false" data-spec-tab="box">In the box</button><button class="tab" type="button" role="tab" aria-selected="false" data-spec-tab="care">Support</button></div></div>' +
        '<div class="spec-panel" data-spec-panel="specs">' + specsHTML(p) + (soon ? '<p class="price-note" style="margin-top:18px">Specifications shown before launch are indicative and may change.</p>' : '') + '</div>' +
        '<div class="spec-panel" data-spec-panel="box" hidden>' + box + '</div>' +
        '<div class="spec-panel" data-spec-panel="care" hidden><div class="cards3">' +
          '<div class="scard"><div class="icon-badge">' + K.icon('shield-check') + '</div><h3>Warranty</h3><p>One year from the date of purchase. Keep your invoice safe.</p></div>' +
          '<div class="scard"><div class="icon-badge">' + K.icon('wrench') + '</div><h3>Karbonn Klinic</h3><p>500+ service centres across India, with trained technicians.</p></div>' +
          '<div class="scard"><div class="icon-badge">' + K.icon('phone') + '</div><h3>Helpline</h3><p>' + esc(C.helpline) + ', ' + esc(C.hours) + '.</p></div>' +
        '</div></div>' +
      '</div></section>' +
      (related.length ? '<section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">Keep exploring</span><h2 data-split style="margin-top:12px">You may also like</h2></div><a class="link-arrow link-arrow--muted" href="shop.html">View all ' + K.icon('arrow-right') + '</a></div>' +
        '<div class="grid-4">' + related.map(function (r) { return cardHTML(r); }).join('') + '</div></div></section>' : '');

    // Gallery, colour and variant behaviour
    var stage = $('[data-stage]');
    var thumbs = $('[data-thumbs]');
    var state = { color: color && color.id, variant: variant, qty: 1 };
    function drawThumbs() {
      var list = K.images(p, state.color);
      thumbs.innerHTML = list.map(function (src, i) { return '<button class="thumb" type="button" data-img="' + src + '" aria-current="' + (i === 0) + '" aria-label="View image ' + (i + 1) + '"><img src="' + K.img(src) + '" alt=""></button>'; }).join('');
    }
    function show(src) {
      var next = K.img(src);
      if (stage.getAttribute('src') === next) return;
      if (hasGsap()) {
        gsap.timeline().to(stage, { opacity: 0, scale: 0.94, rotate: -3, duration: 0.25, ease: 'power2.in' })
          .add(function () { stage.src = next; })
          .to(stage, { opacity: 1, scale: 1, rotate: 0, duration: 0.7, ease: 'expo.out' });
      } else stage.src = next;
    }
    drawThumbs();
    thumbs.addEventListener('click', function (e) {
      var t = e.target.closest('[data-img]');
      if (!t) return;
      $$('.thumb', thumbs).forEach(function (x) { x.setAttribute('aria-current', String(x === t)); });
      show(t.getAttribute('data-img'));
    });
    $$('[data-color]').forEach(function (b) {
      b.addEventListener('click', function () {
        state.color = b.getAttribute('data-color');
        $$('[data-color]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        var c = p.colors.filter(function (x) { return x.id === state.color; })[0];
        $('[data-color-name]').textContent = c.name;
        drawThumbs();
        show(c.images[0]);
      });
    });
    $$('[data-variant]').forEach(function (b) {
      b.addEventListener('click', function () {
        state.variant = b.getAttribute('data-variant');
        $$('[data-variant]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        $('[data-variant-name]').textContent = state.variant;
      });
    });
    $$('[data-pqty]').forEach(function (b) {
      b.addEventListener('click', function () {
        state.qty = Math.max(1, Math.min(9, state.qty + Number(b.getAttribute('data-pqty'))));
        $('[data-pqty-out]').textContent = state.qty;
      });
    });
    var add = $('[data-add-to-cart]');
    if (add) add.addEventListener('click', function () { addToCart(p, state.color, state.variant, state.qty, stage); });
    var buy = $('[data-buy-now]');
    if (buy) buy.addEventListener('click', function () { Cart.add(p.id, state.color, state.variant, state.qty); openCart(); });
    $$('[data-spec-tab]').forEach(function (t) {
      t.addEventListener('click', function () {
        var key = t.getAttribute('data-spec-tab');
        $$('[data-spec-tab]').forEach(function (x) { x.setAttribute('aria-selected', String(x === t)); });
        $$('[data-spec-panel]').forEach(function (panel) {
          var on = panel.getAttribute('data-spec-panel') === key;
          panel.hidden = !on;
          if (on && hasGsap()) gsap.from(panel.children, { opacity: 0, y: 24, duration: 0.6, stagger: 0.05, ease: 'power3.out', clearProps: 'all' });
        });
      });
    });
  }

  function renderAbout() {
    var nums = $('[data-render="numbers"]');
    if (nums) nums.innerHTML = C.stats.map(function (s) {
      return '<div class="number" data-reveal="up"><strong data-count="' + s.value + '" data-suffix="' + esc(s.suffix) + '">' + s.value + esc(s.suffix) + '</strong><span>' + esc(s.label) + '</span></div>';
    }).join('');
    var tl = $('[data-render="timeline"]');
    if (tl) tl.innerHTML = '<div class="timeline__line"><span data-line></span></div>' + C.journey.map(function (j) {
      return '<div class="tl-item" data-reveal="up"><strong>' + esc(j.year) + '</strong><h3>' + esc(j.title) + '</h3><p>' + esc(j.text) + '</p></div>';
    }).join('');
    var leaders = $('[data-render="leaders"]');
    if (leaders) leaders.innerHTML = C.leadership.map(function (l) {
      return '<figure class="leader" data-reveal="up" style="margin:0"><img src="' + K.img(l.photo) + '" alt="' + esc(l.name) + '" loading="lazy"><figcaption><strong>' + esc(l.name) + '</strong><span>' + esc(l.role) + '</span></figcaption></figure>';
    }).join('');
  }

  function renderSupport() {
    var faq = $('[data-render="faq"]');
    if (faq) faq.innerHTML = C.faqs.map(function (f, i) {
      return '<details' + (i === 0 ? ' open' : '') + ' data-reveal="up"><summary>' + esc(f.q) + K.icon('plus') + '</summary><p>' + esc(f.a) + '</p></details>';
    }).join('');
    var sel = $('[data-render="product-options"]');
    if (sel) sel.innerHTML = '<option value="">Choose your product</option>' + D.products.map(function (p) { return '<option value="' + p.id + '">' + esc(p.name) + '</option>'; }).join('');
    var offices = $('[data-render="offices"]');
    if (offices) offices.innerHTML = C.offices.map(function (o) {
      return '<div class="ccard" data-reveal="up"><span class="eyebrow">' + esc(o.label) + '</span><h3>' + esc(o.city) + '</h3><p>' + esc(o.address) + '</p><a href="tel:' + o.phone.replace(/\s/g, '') + '">' + K.icon('phone') + esc(o.phone) + '</a></div>';
    }).join('') + '<div class="ccard" data-reveal="up"><span class="eyebrow">Product queries</span><h3>Helpline</h3><p>' + esc(C.hours) + '.</p><a href="tel:18605001492">' + K.icon('phone') + esc(C.helpline) + '</a><br><a href="mailto:' + esc(C.email) + '">' + K.icon('mail') + esc(C.email) + '</a></div>';
    var finder = $('form[data-form="finder"]');
    if (finder) finder.addEventListener('k:sent', function () {
      var pin = finder.querySelector('[name=pin]').value.trim();
      $('[data-finder-pin]').textContent = pin;
    });
  }

  /* ------------------------------------------------------------------ boot */
  var annc = $('#site-annc');
  if (annc) annc.innerHTML = anncHTML();
  $('#site-header').innerHTML = headerHTML();
  $('#site-footer').innerHTML = footerHTML();
  document.body.insertAdjacentHTML('beforeend', drawerHTML());

  if (page === 'home') renderHome();
  if (page === 'shop') renderShop();
  if (page === 'product') renderProduct();
  if (page === 'about') renderAbout();
  if (page === 'support') renderSupport();

  updateCount();
  renderBag();
  initSearch();

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-open-cart]')) { renderBag(); openCart(); }
    if (e.target.closest('[data-close-cart]')) closeCart();
    if (e.target.closest('[data-checkout]')) openModal();
    if (e.target.closest('[data-close-modal]')) closeModal();
    var q = e.target.closest('[data-qty]');
    if (q) {
      var key = q.getAttribute('data-qty');
      var item = Cart.items().filter(function (i) { return i.key === key; })[0];
      if (item) Cart.setQty(key, Math.max(0, Math.min(9, item.qty + Number(q.getAttribute('data-d')))));
    }
    var r = e.target.closest('[data-remove]');
    if (r) Cart.setQty(r.getAttribute('data-remove'), 0);
    var quick = e.target.closest('[data-quick-add]');
    if (quick) {
      e.preventDefault();
      var p = K.product(quick.getAttribute('data-quick-add'));
      var card = quick.closest('.pcard');
      addToCart(p, p.colors && p.colors[0].id, p.variants && p.variants[0], 1, card && card.querySelector('.pcard__img'));
    }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeCart(); closeModal(); } });
  window.addEventListener('storage', function (e) { if (e.key === CART_KEY) { updateCount(); renderBag(); } });

  K.noOrphans(document);
  K.forms(document);
  K.credit(document);

  /* Announcement rotator */
  var msgs = $$('.annc__msg');
  if (msgs.length > 1 && !K.reduced) {
    var cur = 0;
    setInterval(function () {
      var out = msgs[cur];
      cur = (cur + 1) % msgs.length;
      var inn = msgs[cur];
      out.classList.add('is-leaving');
      out.setAttribute('aria-hidden', 'true');
      inn.classList.remove('is-leaving');
      inn.removeAttribute('aria-hidden');
      setTimeout(function () { out.classList.remove('is-leaving'); }, 800);
    }, 4600);
  }

  /* Header hides on the way down and returns on the way up. Small moves are accumulated, because smooth
   * scrolling ends with many 1px steps that would otherwise flip the direction back and forth. */
  var hdr = $('.hdr');
  var wrap = $('#site-header');
  var lastY = window.scrollY;
  var hidden = false;
  var setHidden = function (h) {
    if (h === hidden) return;
    hidden = h;
    wrap.classList.toggle('is-hidden', h);
    document.body.classList.toggle('hdr-hidden', h);
  };
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    hdr.classList.toggle('is-scrolled', y > 60);
    if (y < 240) { setHidden(false); lastY = y; return; }
    if (Math.abs(y - lastY) < 10) return;
    setHidden(y > lastY && !document.querySelector('.nav__item:hover, .search.is-open'));
    lastY = y;
  }, { passive: true });

  /* ------------------------------------------------------------------ motion */
  KM.init({
    transition: 'fade',
    intro: function (tl) {
      tl.from('.hdr', { yPercent: -100, duration: 1.1 }, 0);
      if (page === 'home') {
        tl.from('.hero__pill', { y: 24, opacity: 0, duration: 0.9 }, 0.2)
          .from('.hero .lead', { y: 30, opacity: 0, duration: 1 }, 0.6)
          .from('.hero__actions > *', { y: 30, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.72)
          .from('.trust', { y: 24, opacity: 0, duration: 1 }, 0.9)
          .from('.hcard--tall', { clipPath: 'inset(100% 0% 0% 0% round 18px)', duration: 1.5, ease: 'expo.inOut' }, 0.1)
          .from('.hcard__phone', { yPercent: 40, rotate: 16, scale: 0.78, opacity: 0, duration: 1.8 }, 0.55)
          .from('.hcard--small', { clipPath: 'inset(0% 100% 0% 0% round 18px)', duration: 1.3, ease: 'expo.inOut' }, 0.3)
          .from('.hcard__fp', { y: 160, rotate: -16, duration: 1.5 }, 0.6)
          .from('.hcard--note', { y: 70, opacity: 0, duration: 1.2 }, 0.75)
          .from('.rot-badge', { scale: 0, rotate: -200, duration: 1.4, ease: 'back.out(1.5)' }, 1.15)
          .from('.hcard__label, .hcard__cta', { y: 16, opacity: 0, duration: 0.8, stagger: 0.06 }, 1.1);
      } else {
        tl.from('[data-intro] .crumbs, [data-intro] .eyebrow, [data-intro] .info__tagline, [data-intro] p, [data-intro] .price-block, [data-intro] .soon-pill, [data-intro] .opt, [data-intro] .buy, [data-intro] .notify, [data-intro] .assure, [data-intro] .btn, [data-intro] .helpline, [data-intro] .hero__pill',
          { y: 28, opacity: 0, duration: 1, stagger: 0.06 }, 0.25);
        tl.from('[data-intro] .stage, [data-intro] .about-hero__media, [data-intro] .page-hero__art', { clipPath: 'inset(100% 0% 0% 0% round 18px)', duration: 1.4, ease: 'expo.inOut' }, 0.15);
        tl.from('[data-intro] .stage__img', { yPercent: 25, scale: 0.85, rotate: 6, opacity: 0, duration: 1.6 }, 0.5);
        tl.from('[data-intro] .thumb', { x: -20, opacity: 0, duration: 0.8, stagger: 0.06 }, 0.8);
      }
    }
  });

  if (hasGsap()) {
    if (page === 'home') {
      // Scroll drift goes on the image, not on .hcard__phone: the intro animates the wrapper and a shared target would
      // make this tween capture the intro's start offset.
      gsap.to('.hcard__phone img', { yPercent: -10, rotate: -4, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hcard--small', { yPercent: 14, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero__copy', { yPercent: 10, opacity: 0.3, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      $$('.band__img img').forEach(function (img, i) {
        gsap.fromTo(img, { y: 24, rotate: i ? 16 : -18 }, { y: -46, rotate: i ? 6 : -8, ease: 'none', scrollTrigger: { trigger: '.band', start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    }
    var line = $('[data-line]');
    if (line) gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 80%', end: 'bottom 55%', scrub: true } });
  }
})();

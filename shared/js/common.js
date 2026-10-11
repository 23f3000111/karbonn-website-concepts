/* Shared helpers for both Karbonn concept sites (classic script, works from file://).
 * Exposes window.K. Depends on shared/data/products.js, icons.js and logo.js being loaded first.
 */
(function () {
  'use strict';
  var D = window.KARBONN || { products: [], categories: [], company: {} };
  var ICONS = window.KARBONN_ICONS || {};
  var LOGO = window.KARBONN_LOGO || { viewBox: '0 0 10 10', paths: [] };
  var TEXT_SEL = 'h1,h2,h3,h4,h5,h6,p,li,dt,dd,figcaption,blockquote,label,th,td,button,.btn,[data-orphan-check]';
  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

  var K = {
    data: D,
    all: function () { return D.products.slice(); },
    product: function (id) { return D.products.filter(function (p) { return p.id === id; })[0]; },
    category: function (id) { return D.categories.filter(function (c) { return c.id === id; })[0]; },
    byCategory: function (id) { return D.products.filter(function (p) { return p.category === id; }); },
    img: function (p) { return '../shared/img/' + p; },
    price: function (n) { return '₹' + Number(n).toLocaleString('en-IN'); },
    param: function (name) { return new URLSearchParams(location.search).get(name); },
    esc: function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ESC[c]; }); },
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,

    /* Short display name for cards (TVs and appliances carry long official names). */
    short: function (p) { return p.short || p.name; },

    /* Price line for a product: "₹26,803", "From ₹8,990" or "Coming soon". */
    priceText: function (p) {
      if (p.status === 'coming-soon' || p.price == null) return 'Coming soon';
      return (p.priceFrom ? 'From ' : '') + K.price(p.price);
    },

    /* First image of the first colour, or the first gallery image. */
    images: function (p, colorId) {
      if (p.colors && p.colors.length) {
        var c = p.colors.filter(function (x) { return x.id === colorId; })[0] || p.colors[0];
        return c.images;
      }
      return p.gallery || [p.card];
    },

    icon: function (key, cls) {
      return '<svg class="icon' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (ICONS[key] || '') + '</svg>';
    },

    logo: function (cls, label) {
      var paths = LOGO.paths.map(function (p) { return '<path d="' + p.d + '"' + (p.evenodd ? ' fill-rule="evenodd"' : '') + '/>'; }).join('');
      return '<svg class="logo' + (cls ? ' ' + cls : '') + '" viewBox="' + LOGO.viewBox + '" role="img" aria-label="' + (label || 'Karbonn') + '"><g fill="currentColor">' + paths + '</g></svg>';
    },

    /* Bind the last two words of every text block with a no-break space, so no line ends alone. */
    noOrphans: function (root) {
      root = root || document;
      var list = Array.prototype.slice.call(root.querySelectorAll(TEXT_SEL));
      Array.prototype.forEach.call(root.querySelectorAll('*'), function (el) {
        if (list.indexOf(el) > -1 || el.closest('svg, script, style')) return;
        var own = false;
        for (var c = el.firstChild; c; c = c.nextSibling) if (c.nodeType === 3 && c.data.trim()) { own = true; break; }
        if (!own) return;
        var d = getComputedStyle(el).display;
        if (d === 'inline' || d === 'contents' || d === 'none') return;
        list.push(el);
      });
      list.forEach(function (el) {
        // Re-bind when the text changed since the last pass (e.g. a heading updated by a filter).
        if (el.__noOrphans === el.textContent || el.closest('[data-orphan-skip]')) return;
        var nodes = [];
        var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        for (var n = walker.nextNode(); n; n = walker.nextNode()) if (n.data.trim()) nodes.push(n);
        if (!nodes.length) return;
        var words = el.textContent.trim().split(/[ \t\n\r]+/).length;
        if (words < 2) return;
        // Passes are idempotent: NBSP is not in the breakable class, so bound pairs are never re-split.
        var last = nodes[nodes.length - 1];
        if (/^[ \t\n\r]+\S+[ \t\n\r]*$/.test(last.data)) { last.data = last.data.replace(/^[ \t\n\r]+/, ' '); return; }
        var m = last.data.match(/^([\s\S]*\S)[ \t\n\r]+(\S+[ \t\n\r]*)$/);
        if (m) { last.data = m[1] + ' ' + m[2]; return; }
        // The last text node is a single word: bind it to the space that ends the previous text node.
        for (var i = nodes.length - 2; i >= 0; i--) {
          if (/[ \t\n\r]+$/.test(nodes[i].data)) { nodes[i].data = nodes[i].data.replace(/[ \t\n\r]+$/, ' '); return; }
          if (nodes[i].data.trim()) return;
        }
      });
    },

    /* Validating forms that never leave the page. form[data-form] → .is-invalid on bad fields, .is-sent on success. */
    forms: function (root) {
      (root || document).querySelectorAll('form[data-form]').forEach(function (form) {
        if (form.__kForm) return;
        form.__kForm = true;
        form.setAttribute('novalidate', '');
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          var ok = true;
          form.querySelectorAll('input, select, textarea').forEach(function (f) {
            if (f.type === 'hidden') return;
            var v = (f.value || '').trim();
            var bad = false;
            if (f.required && f.type !== 'checkbox' && !v) bad = true;
            if (f.required && f.type === 'checkbox' && !f.checked) bad = true;
            if (v && f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) bad = true;
            if (v && f.type === 'tel' && v.replace(/\D/g, '').length < 10) bad = true;
            if (v && f.hasAttribute('data-pin') && !/^\d{6}$/.test(v)) bad = true;
            (f.closest('.field') || f).classList.toggle('is-invalid', bad);
            if (bad) ok = false;
          });
          if (!ok) {
            var first = form.querySelector('.is-invalid input, .is-invalid select, .is-invalid textarea, input.is-invalid, select.is-invalid, textarea.is-invalid');
            if (first) first.focus();
            return;
          }
          form.classList.add('is-sent');
          var thanks = form.querySelector('[data-form-thanks]');
          if (thanks) thanks.hidden = false;
          try { localStorage.setItem('karbonn-form-' + (form.getAttribute('data-form') || 'form'), String(Date.now())); } catch (err) { /* storage may be blocked */ }
          form.dispatchEvent(new CustomEvent('k:sent', { bubbles: true }));
        });
        form.addEventListener('input', function (e) {
          var holder = e.target.closest('.field') || e.target;
          holder.classList.remove('is-invalid');
        });
      });
    },

    credit: function (root) {
      (root || document).querySelectorAll('[data-credit]').forEach(function (el) {
        el.textContent = 'Concept by ' + (D.studio || '[Your Studio]') + ' · Not an official Karbonn website';
      });
    },

    /* Mark every reveal block visible (reduced motion, or no animation library). */
    showAll: function () {
      document.querySelectorAll('[data-reveal]').forEach(function (el) { el.classList.add('is-visible'); });
      document.documentElement.classList.remove('motion-pending', 'is-arriving');
      document.documentElement.classList.add('is-loaded');
    },

    /* Small persistent store, safe when storage is blocked. */
    store: {
      get: function (k, fallback) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; } },
      set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
    }
  };

  window.K = K;
})();

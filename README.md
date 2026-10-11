# Karbonn: two website concepts

Two clickable, desktop-only website concepts for Karbonn, built to pitch a full website for the brand's 2026 comeback (ZenZ, ZenZ Pro and the new 4G range).

- **Concept A, "The Store"** (`site-a-store/`): a clean, premium storefront in the style of the HiTech template. Mega menu, instant search, product pages with colour and memory options, a working bag with fly-to-bag animation, checkout note, support and about pages.
- **Concept B, "The Launch"** (`site-b-launch/`): a bold launch experience in the style of Papalla and BiteBuddy. One-time red intro, ZenZ Pro colour switcher with a 3D phone that follows the cursor, giant scrolling type, stacking product cards, a pinned sideways range scroll, drawn callouts, product story pages, story and support pages.

Both share one product file, one image library and one animation engine.

## Open it

**Live link:** https://23f3000111.github.io/karbonn-website-concepts/ (The Store: `/site-a-store/`, The Launch: `/site-b-launch/`).

Offline: double-click `index.html` in this folder. It opens the concept chooser; click a concept to enter it. Everything runs offline from your disk: fonts, images and animation libraries are all local, and no page loads anything from the internet.

Best in Chrome or Safari on a MacBook, full screen, at 100% zoom. Firefox blocks fonts loaded from disk, so use Chrome or Safari for the meeting. The layouts are tuned for 1280 to 1512 pixel wide windows. Mobile layouts were not built, by design.

## Presenting tips

- Start on the chooser, then open **The Launch** first for the wow moment, then **The Store** to show it can sell every day.
- The red Karbonn intro in The Launch plays once per browser tab. To replay it, close the tab and open the site again.
- In The Launch, hover the hero phone, click the colour chips, then scroll slowly through the stacking cards and the "Meet the family" section.
- In The Store, hover "Phones" for the mega menu, type "zen" in search, open a product, switch colours, and add the K9 4G or a TV to the bag.
- Forms validate and show a thank-you message. They send nothing anywhere.
- If someone prefers no animation, macOS "Reduce motion" turns it off and every page still shows in full.

## Before you send or show it

- Change the credit line once in `shared/data/products.js`: replace `studio: '[Your Studio]'` with your name or studio. It updates every footer and the chooser.
- The live link is public: anyone with the URL can open it, including the unreleased ZenZ and ZenZ Pro renders. Every page is marked `noindex`, so search engines should not list it. Each footer says "Not an official Karbonn website".
- To update the live site, commit and push from this folder (`git add -A`, `git commit`, `git push`). GitHub Pages republishes in about a minute.
- To take it down, delete the `karbonn-website-concepts` repository on GitHub, or switch off Pages in its settings.

## What is real and what is indicative

- **From Karbonn:** the logo, the "Kamaal Koming" campaign art and facts (15+ years, 500+ service centres, 90%+ reach) from the current karbonn.in teaser; company history, vision, mission, leadership, offices and helpline from Karbonn's own website; all phone renders and the ZenZ Pro size from the supplied image folder; the Kohinoor TV and its "from ₹8,990" price from Karbonn's own banner.
- **From public retail listings (indicative prices):** K9 4G ₹2,480, K104i ₹999 (MRP ₹1,190), Kanvas 40″ ₹12,499, Karnival 55″ ₹26,803, Millennium 39″ ₹13,990 (MRP ₹28,290), 7 kg washer ₹6,990 (MRP ₹13,490). TV and washer photos come from Karbonn banners and retail listings.
- **Not invented:** ZenZ, ZenZ Pro, K9 Pro 4G and K9 Stylo 4G show "Coming soon" with no price. Specs Karbonn has not announced say "To be announced". There are no made-up reviews, ratings or service-centre addresses.
- **Left out on purpose:** power banks and other accessories, because no good product photos exist. They can be added with official renders.

## Folder map

```
index.html            concept chooser (start here)
site-a-store/         Concept A: index, shop, product, about, support
site-b-launch/        Concept B: index, range, product, story, support
shared/data/          products.js (all content), icons.js, logo.js
shared/img/           optimised product, brand and people images (WebP)
shared/fonts/         self-hosted fonts (Source Serif 4, Outfit, Instrument Serif, Geist)
shared/vendor/        GSAP, ScrollTrigger and Lenis (local copies, licences in LICENSES.txt)
shared/js/            common.js (helpers), motion.js (animation engine)
tools/                image pipeline and automated checks
docs/superpowers/     design spec and build plan
KARBONN 3D HD QUALITY IMAGES/   your original renders (untouched)
```

## Automated checks

`node tools/check-sites.js --widths 1280,1440,1512` opens every page from disk and fails on console errors, network requests, missing files, broken images, dead links, horizontal scroll, single words left alone on a line, forms that misbehave, animations that never finish, and animated pieces (header, hero phones) that do not settle back into place. Add `--browser webkit` to test the Safari engine. `node tools/test-unit.js` runs the unit tests. It needs the cached Playwright install this machine already has.

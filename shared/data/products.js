/* Karbonn concept sites: shared content.
 * Facts come from karbonn.in (2021–2026 archive), the live teaser karbonnr-bel.com, the supplied renders and
 * public retail listings. Prices marked in README as indicative. Unannounced specs read "To be announced".
 * Change the credit line in ONE place: `studio` below.
 */
window.KARBONN = {
  studio: '[Your Studio]',

  company: {
    name: 'Karbonn',
    legal: 'Karbonn Mobiles',
    tagline: 'Celebrate Simplicity',
    campaign: 'The next Kamaal is koming.',
    founded: 2009,
    stats: [
      { value: 15, suffix: '+', label: 'Years in India' },
      { value: 500, suffix: '+', label: 'Service centres' },
      { value: 90, suffix: '%+', label: 'Reach across India' },
      { value: 4, suffix: '', label: 'Product families' }
    ],
    journey: [
      { year: '2009', title: 'The journey begins', text: 'Jaina Group and UTL Group launch Karbonn to bring smartphones to every Indian.' },
      { year: '2014', title: 'Android One partner', text: 'Karbonn Sparkle V is among the first Android One phones made for India.' },
      { year: '2019', title: 'Into the living room', text: 'Karbonn Smart TVs bring big-screen entertainment home at honest prices.' },
      { year: '2023', title: 'Bigger screens, bigger homes', text: 'Karnival 4K, Kohinoor Google TV and the first Karbonn washing machine arrive.' },
      { year: '2026', title: 'The next Kamaal', text: 'ZenZ, ZenZ Pro and a new 4G range open a fresh chapter for a new generation.' }
    ],
    vision: 'Outstanding value, continuous innovation and an exceptional experience for every customer. Technology that feels simple, in the language you speak.',
    mission: 'Bring the latest technology to every Indian at a price that makes sense, backed by service that is never far away.',
    leadership: [
      { name: 'Sudhir Hasija', role: 'Chairman', photo: 'people/sudhir-hasija.webp' },
      { name: 'Pardeep Jain', role: 'Managing Director', photo: 'people/pradeep-jain.webp' },
      { name: 'Shashin Devsare', role: 'Executive Director', photo: 'people/shashin-devsare.webp' },
      { name: 'Anurag Singhal', role: 'Director', photo: 'people/anurag-singhal.webp' },
      { name: 'Ashish Aggarwal', role: 'Director', photo: 'people/ashish-aggarwal.webp' },
      { name: 'Sanjay Jain', role: 'Director', photo: 'people/sanjay-jain.webp' }
    ],
    offices: [
      { city: 'New Delhi', label: 'Head office', address: 'A-233, Second Floor, Okhla Industrial Area Phase 1, New Delhi 110020', phone: '011 4660 4666' },
      { city: 'Bengaluru', label: 'Regional office', address: '#39/13, off 7th Main, HAL 2nd Stage, Indiranagar, Bengaluru 560038', phone: '080 4089 4888' }
    ],
    helpline: '1860 500 1492',
    hours: 'Monday to Saturday, 10 AM to 7 PM',
    email: 'support@jainaindia.com',
    socials: {
      facebook: 'https://www.facebook.com/KarbonnSmart',
      instagram: 'https://www.instagram.com/karbonnsmartofficial',
      x: 'https://x.com/KarbonnSmart',
      youtube: 'https://www.youtube.com/user/KarbonnMobilePhones'
    },
    retailers: ['Reliance Digital', 'JioMart', 'Amazon', 'Flipkart', 'Karbonn retail partners'],
    faqs: [
      { q: 'How do I find a Karbonn Klinic service centre?', a: 'Enter your PIN code in the finder above, or call 1860 500 1492, Monday to Saturday, 10 AM to 7 PM.' },
      { q: 'Can Karbonn collect my device for repair?', a: 'Yes. Doorstep pickup and drop is available in many cities. Book a pickup above and we will call to confirm. T&C apply.' },
      { q: 'What warranty do Karbonn products carry?', a: 'Phones, TVs and appliances carry a one-year manufacturer warranty. Keep your invoice for any claim.' },
      { q: 'When will ZenZ and ZenZ Pro be available?', a: 'Very soon. Leave your email on any ZenZ page and you will be the first to know.' },
      { q: 'Where can I buy Karbonn products?', a: 'On this website, at Karbonn retail partners across India, and at Reliance Digital and JioMart for TVs and appliances.' },
      { q: 'How do I recycle an old device?', a: 'Drop it at any Karbonn Klinic. We recycle it responsibly under India’s e-waste rules.' }
    ]
  },

  categories: [
    { id: 'smartphones', name: 'Smartphones', short: 'Smartphones', icon: 'smartphone', blurb: 'The ZenZ series, built for a new generation.' },
    { id: 'feature-phones', name: '4G Feature Phones', short: 'Feature Phones', icon: 'feature-phone', blurb: 'Tough, loud and long-lasting keypad phones.' },
    { id: 'smart-tvs', name: 'Smart TVs', short: 'Smart TVs', icon: 'tv', blurb: 'From Google TV to 4K Ultra HD, made for Indian homes.' },
    { id: 'appliances', name: 'Home Appliances', short: 'Appliances', icon: 'washing-machine', blurb: 'Washing machines that work as hard as you do.' }
  ],

  products: [
    {
      id: 'zenz-pro', name: 'ZenZ Pro', category: 'smartphones', status: 'coming-soon', badge: 'New',
      tagline: 'Bold design. Brilliant camera.',
      summary: 'A 64MP AI triple camera, a 7.99 mm body and four rich finishes, with Android 16 out of the box.',
      card: 'zenz-pro/cherry-red-angle.webp', hero: 'zenz-pro/duo-hero.webp',
      colors: [
        { id: 'cherry-red', name: 'Cherry Red', swatch: '#7B1A2A', tint: '#FBE9EC', images: ['zenz-pro/cherry-red-angle.webp', 'zenz-pro/cherry-red-back.webp', 'zenz-pro/cherry-red-tilt.webp', 'zenz-pro/cherry-red-lying.webp', 'zenz-pro/cherry-red-dynamic.webp'] },
        { id: 'metallic-grey', name: 'Metallic Grey', swatch: '#6E7075', tint: '#EFEFF0', images: ['zenz-pro/metallic-grey-angle.webp', 'zenz-pro/metallic-grey-back.webp', 'zenz-pro/metallic-grey-tilt.webp', 'zenz-pro/metallic-grey-lying.webp', 'zenz-pro/metallic-grey-dynamic.webp'] },
        { id: 'ice-blue', name: 'Ice Blue', swatch: '#AFC7DC', tint: '#EDF3F8', images: ['zenz-pro/ice-blue-angle.webp', 'zenz-pro/ice-blue-back.webp', 'zenz-pro/ice-blue-tilt.webp', 'zenz-pro/ice-blue-lying.webp', 'zenz-pro/ice-blue-dynamic.webp'] },
        { id: 'rose-gold', name: 'Rose Gold', swatch: '#BBA191', tint: '#F6EFEA', images: ['zenz-pro/rose-gold-angle.webp', 'zenz-pro/rose-gold-back.webp', 'zenz-pro/rose-gold-tilt.webp', 'zenz-pro/rose-gold-lying.webp', 'zenz-pro/rose-gold-dynamic.webp'] }
      ],
      variants: ['4 GB + 128 GB', '6 GB + 128 GB'],
      keySpecs: [
        { value: '64MP', label: 'AI triple camera' },
        { value: '7.99 mm', label: 'Slim body' },
        { value: 'Android 16', label: 'Out of the box' },
        { value: '6 GB', label: 'RAM, up to' }
      ],
      highlights: [
        { icon: 'camera', title: '64MP AI triple camera', text: 'Sharp, bright photos with flash for every moment.' },
        { icon: 'ruler', title: '7.99 mm slim body', text: 'Easy to hold and easy to carry all day.' },
        { icon: 'app-window', title: 'Android 16', text: 'The latest Android, fresh out of the box.' },
        { icon: 'memory', title: 'Up to 6 GB RAM', text: 'With 128 GB of storage for apps and photos.' },
        { icon: 'palette', title: 'Four finishes', text: 'A soft wave texture that catches the light.' },
        { icon: 'shield-check', title: 'Karbonn Klinic care', text: 'Service at 500+ centres across India.' }
      ],
      specs: [
        { group: 'Design', rows: [['Dimensions', '165.9 × 76 × 7.99 mm'], ['Colours', 'Cherry Red, Metallic Grey, Ice Blue, Rose Gold'], ['Back finish', 'Textured wave design']] },
        { group: 'Camera', rows: [['Rear camera', '64MP AI triple camera with flash'], ['Front camera', 'To be announced']] },
        { group: 'Performance', rows: [['Operating system', 'Android 16'], ['Processor', 'Octa-core, to be announced'], ['Memory', '4 GB or 6 GB RAM, 128 GB storage']] },
        { group: 'Display and battery', rows: [['Display', 'To be announced'], ['Battery', 'To be announced']] },
        { group: 'Connectivity', rows: [['Network', '4G LTE'], ['SIM', 'To be announced']] }
      ],
      box: [],
      related: ['zenz', 'k9-pro-4g', 'tv-karnival', 'k9-stylo-4g'],
      story: [
        { kicker: 'Camera', title: '64MP that sees the moment.', text: 'An AI triple camera with flash brings out colour and detail, day or night.', image: 'zenz-pro/camera.webp' },
        { kicker: 'Design', title: 'Just 7.99 mm thin.', text: 'A slim body with a soft wave texture that changes as the light moves.', image: 'zenz-pro/duo-side.webp' },
        { kicker: 'Software', title: 'Android 16, out of the box.', text: 'Up to 6 GB RAM and 128 GB storage keep apps, photos and videos moving.', image: 'zenz-pro/landscape.webp' },
        { kicker: 'Finishes', title: 'Four ways to be noticed.', text: 'Cherry Red, Metallic Grey, Ice Blue and Rose Gold, each with its own wave.', image: 'zenz-pro/duo-lying.webp' }
      ]
    },
    {
      id: 'zenz', name: 'ZenZ', category: 'smartphones', status: 'coming-soon', badge: 'New',
      tagline: 'Simple, smart and made for you.',
      summary: 'An AI triple camera, a wave-textured back and up to 6 GB RAM, in three soft finishes.',
      card: 'zenz/champagne-angle.webp', hero: 'zenz/trio-fan.webp',
      colors: [
        { id: 'champagne', name: 'Champagne', swatch: '#D8C8B3', tint: '#F7F1EA', images: ['zenz/champagne-angle.webp', 'zenz/champagne-back.webp', 'zenz/front.webp', 'zenz/champagne-pair.webp'] },
        { id: 'ice-blue', name: 'Ice Blue', swatch: '#AFC8DD', tint: '#EDF3F8', images: ['zenz/ice-blue-angle.webp', 'zenz/ice-blue-back.webp', 'zenz/front.webp', 'zenz/ice-blue-pair.webp'] },
        { id: 'pearl-white', name: 'Pearl White', swatch: '#EEEDE9', tint: '#F5F5F3', images: ['zenz/pearl-white-back.webp', 'zenz/front.webp', 'zenz/pearl-white-pair.webp'] }
      ],
      variants: ['4 GB + 64 GB', '4 GB + 128 GB', '6 GB + 128 GB'],
      keySpecs: [
        { value: 'AI', label: 'Triple camera' },
        { value: '6 GB', label: 'RAM, up to' },
        { value: '128 GB', label: 'Storage, up to' },
        { value: '3', label: 'Soft finishes' }
      ],
      highlights: [
        { icon: 'camera', title: 'AI triple camera', text: 'Point, shoot and let the AI do the rest.' },
        { icon: 'memory', title: 'Up to 6 GB RAM', text: 'Smooth everyday multitasking.' },
        { icon: 'storage', title: 'Up to 128 GB', text: 'Room for photos, music and apps.' },
        { icon: 'palette', title: 'Three finishes', text: 'Champagne, Ice Blue and Pearl White.' }
      ],
      specs: [
        { group: 'Design', rows: [['Colours', 'Champagne, Ice Blue, Pearl White'], ['Back finish', 'Textured wave design']] },
        { group: 'Camera', rows: [['Rear camera', 'AI triple camera with flash'], ['Front camera', 'To be announced']] },
        { group: 'Performance', rows: [['Memory', '4 GB + 64 GB, 4 GB + 128 GB, 6 GB + 128 GB'], ['Operating system', 'To be announced']] },
        { group: 'Display and battery', rows: [['Display', 'To be announced'], ['Battery', 'To be announced']] }
      ],
      box: [],
      related: ['zenz-pro', 'k9-stylo-4g', 'tv-kohinoor', 'k9-4g'],
      story: [
        { kicker: 'Camera', title: 'An AI camera that just works.', text: 'Three lenses and smart processing make every shot look its best.', image: 'zenz/champagne-angle.webp' },
        { kicker: 'Design', title: 'A wave you can feel.', text: 'A soft textured back in Champagne, Ice Blue and Pearl White.', image: 'zenz/trio-fan.webp' },
        { kicker: 'Memory', title: 'Room for everything.', text: 'Up to 6 GB RAM and 128 GB storage, in three simple choices.', image: 'zenz/ice-blue-pair.webp' }
      ]
    },
    {
      id: 'k9-pro-4g', name: 'K9 Pro 4G', category: 'feature-phones', status: 'coming-soon', badge: 'New',
      tagline: '4G calling with King Voice.',
      summary: 'Loud and clear King Voice audio, dedicated music keys and a 2MP camera on fast 4G.',
      card: 'k9-pro-4g/black-red-front.webp',
      colors: [
        { id: 'black-red', name: 'Black Red', swatch: 'linear-gradient(135deg,#19191B 50%,#E10613 50%)', tint: '#F5F3F2', images: ['k9-pro-4g/black-red-front.webp', 'k9-pro-4g/black-red-views.webp'] },
        { id: 'deep-blue', name: 'Deep Blue', swatch: '#24386A', tint: '#EEF1F7', images: ['k9-pro-4g/deep-blue-front.webp', 'k9-pro-4g/deep-blue-back.webp', 'k9-pro-4g/deep-blue-views.webp'] }
      ],
      keySpecs: [
        { value: '4G', label: 'LTE calling' },
        { value: 'King', label: 'Voice audio' },
        { value: '2MP', label: 'Rear camera' },
        { value: '2', label: 'SIM call keys' }
      ],
      highlights: [
        { icon: 'signal', title: '4G LTE', text: 'Clear calls on India’s fastest networks.' },
        { icon: 'volume', title: 'King Voice', text: 'A loud speaker you can hear across the room.' },
        { icon: 'music', title: 'Music keys', text: 'Play, pause and skip with one press.' },
        { icon: 'camera', title: '2MP camera', text: 'Quick snaps with a rear camera.' }
      ],
      specs: [
        { group: 'Network', rows: [['Network', '4G LTE'], ['SIM', 'Dual SIM with dedicated call keys']] },
        { group: 'Features', rows: [['Audio', 'King Voice loud speaker'], ['Rear camera', '2MP'], ['Shortcuts', 'Dedicated music keys'], ['Torch', 'Yes']] },
        { group: 'Display and battery', rows: [['Display', 'To be announced'], ['Battery', 'To be announced']] }
      ],
      box: [],
      related: ['k9-stylo-4g', 'k9-4g', 'k104i', 'zenz']
    },
    {
      id: 'k9-stylo-4g', name: 'K9 Stylo 4G', category: 'feature-phones', status: 'coming-soon', badge: 'New',
      tagline: 'A keypad phone with style.',
      summary: 'A ring camera design, King Voice audio and 4G calling in a slim Deep Blue body.',
      card: 'k9-stylo-4g/deep-blue-front.webp',
      colors: [
        { id: 'deep-blue', name: 'Deep Blue', swatch: '#24386A', tint: '#EEF1F7', images: ['k9-stylo-4g/deep-blue-front.webp', 'k9-stylo-4g/deep-blue-back.webp', 'k9-stylo-4g/deep-blue-views.webp'] }
      ],
      keySpecs: [
        { value: '4G', label: 'LTE calling' },
        { value: 'King', label: 'Voice audio' },
        { value: 'Ring', label: 'Camera design' },
        { value: '2', label: 'SIM call keys' }
      ],
      highlights: [
        { icon: 'signal', title: '4G LTE', text: 'Fast, clear calling on 4G.' },
        { icon: 'volume', title: 'King Voice', text: 'Loud audio for busy places.' },
        { icon: 'aperture', title: 'Ring camera design', text: 'A smartphone-style camera ring on the back.' },
        { icon: 'flashlight', title: 'Torch', text: 'A built-in light for the way home.' }
      ],
      specs: [
        { group: 'Network', rows: [['Network', '4G LTE'], ['SIM', 'Dual SIM with dedicated call keys']] },
        { group: 'Features', rows: [['Audio', 'King Voice loud speaker'], ['Camera', 'Ring camera design'], ['Torch', 'Yes']] },
        { group: 'Display and battery', rows: [['Display', 'To be announced'], ['Battery', 'To be announced']] }
      ],
      box: [],
      related: ['k9-pro-4g', 'k9-4g', 'k104i', 'zenz-pro']
    },
    {
      id: 'k9-4g', name: 'K9 4G', category: 'feature-phones', status: 'in-stock', badge: 'Bestseller', price: 2480,
      tagline: 'The 4G keypad phone India trusts.',
      summary: 'A 2.4-inch display, a 2MP camera and a 2000 mAh battery with fast charging, on 4G.',
      card: 'k9-4g/black-red-front.webp',
      colors: [
        { id: 'black-red', name: 'Black Red', swatch: 'linear-gradient(135deg,#19191B 50%,#E10613 50%)', tint: '#F5F3F2', images: ['k9-4g/black-red-front.webp', 'k9-4g/black-red-angle.webp', 'k9-4g/black-red-tilt.webp', 'k9-4g/black-red-lying.webp', 'k9-4g/black-red-views.webp'] }
      ],
      keySpecs: [
        { value: '4G', label: 'Dual SIM' },
        { value: '2.4"', label: 'Display' },
        { value: '2000', label: 'mAh battery' },
        { value: '2MP', label: 'Rear camera' }
      ],
      highlights: [
        { icon: 'signal', title: '4G dual SIM', text: 'Two numbers, one fast phone.' },
        { icon: 'battery-charging', title: '2000 mAh', text: 'Days of talk time, with fast charging.' },
        { icon: 'camera', title: '2MP camera', text: 'Capture the moment in a click.' },
        { icon: 'flashlight', title: 'Torch', text: 'Bright light whenever you need it.' }
      ],
      specs: [
        { group: 'Display', rows: [['Size', '2.4 inches']] },
        { group: 'Performance', rows: [['RAM', '64 MB'], ['Storage', '128 MB']] },
        { group: 'Camera and battery', rows: [['Rear camera', '2MP'], ['Battery', '2000 mAh with fast charging']] },
        { group: 'Network', rows: [['Network', '4G LTE'], ['SIM', 'Dual SIM'], ['Wi-Fi', 'No']] }
      ],
      box: ['K9 4G handset', 'Battery', 'Charger', 'User guide'],
      related: ['k9-pro-4g', 'k104i', 'k9-stylo-4g', 'zenz']
    },
    {
      id: 'k104i', name: 'K104i', category: 'feature-phones', status: 'in-stock', price: 999, mrp: 1190,
      tagline: 'Simple, sturdy and always on.',
      summary: 'A dual SIM keypad phone with a 1.8-inch display, FM radio, Bluetooth and Type-C charging.',
      card: 'k104i/black-red-front.webp',
      colors: [
        { id: 'black-red', name: 'Black Red', swatch: 'linear-gradient(135deg,#19191B 50%,#E10613 50%)', tint: '#F5F3F2', images: ['k104i/black-red-front.webp', 'k104i/black-red-pair.webp', 'k104i/trio.webp'] },
        { id: 'black-yellow', name: 'Black Yellow', swatch: 'linear-gradient(135deg,#19191B 50%,#F1C232 50%)', tint: '#F7F4EA', images: ['k104i/black-yellow-front.webp', 'k104i/trio.webp'] },
        { id: 'green-black', name: 'Green Black', swatch: 'linear-gradient(135deg,#A9C79B 50%,#19191B 50%)', tint: '#F0F5EE', images: ['k104i/green-black-front.webp', 'k104i/trio.webp'] }
      ],
      keySpecs: [
        { value: '1.8"', label: 'Display' },
        { value: '1000', label: 'mAh battery' },
        { value: 'FM', label: 'Radio' },
        { value: 'Type-C', label: 'Charging' }
      ],
      highlights: [
        { icon: 'smartphone', title: 'Dual SIM', text: 'Keep work and home on one phone.' },
        { icon: 'radio', title: 'FM radio', text: 'Music and news without data.' },
        { icon: 'bluetooth', title: 'Bluetooth', text: 'Share files and use wireless audio.' },
        { icon: 'usb', title: 'Type-C charging', text: 'The same cable as your smartphone.' }
      ],
      specs: [
        { group: 'Display', rows: [['Size', '1.8 inches'], ['Resolution', '128 × 160 pixels']] },
        { group: 'Battery and memory', rows: [['Battery', '1000 mAh'], ['Memory card', 'Expandable']] },
        { group: 'Connectivity', rows: [['SIM', 'Dual SIM'], ['Bluetooth', 'Yes'], ['FM radio', 'Yes'], ['Charging port', 'USB Type-C']] },
        { group: 'Warranty', rows: [['Manufacturer warranty', '12 months']] }
      ],
      box: ['K104i handset', 'Battery', 'Charger', 'User guide'],
      related: ['k9-4g', 'k9-pro-4g', 'k9-stylo-4g', 'washer-7kg']
    },
    {
      id: 'tv-kohinoor', name: 'Kohinoor Series 32″ Google TV', short: 'Kohinoor 32″', category: 'smart-tvs', status: 'in-stock', badge: 'Google TV', price: 8990, priceFrom: true,
      tagline: 'Google TV, made for every home.',
      summary: 'An HD Ready Google TV with 10,000+ apps and games, Dolby Digital sound and a bezel-less design.',
      card: 'tv-kohinoor/front.webp', banner: 'tv-kohinoor/banner.webp',
      gallery: ['tv-kohinoor/front.webp'],
      keySpecs: [
        { value: '32″', label: 'HD Ready' },
        { value: 'Google', label: 'TV' },
        { value: '10,000+', label: 'Apps and games' },
        { value: 'Dolby', label: 'Digital audio' }
      ],
      highlights: [
        { icon: 'app-window', title: 'Google TV', text: 'All your apps and live TV in one place.' },
        { icon: 'film', title: '10,000+ apps and games', text: 'Movies, shows, sport and more.' },
        { icon: 'speaker', title: 'Dolby Digital', text: 'Rich, clear sound for every scene.' },
        { icon: 'maximize', title: 'Bezel-less design', text: 'More picture, less frame.' }
      ],
      specs: [
        { group: 'Display', rows: [['Screen size', '80 cm (32 inch)'], ['Resolution', 'HD Ready']] },
        { group: 'Smart TV', rows: [['Platform', 'Google TV'], ['Apps', '10,000+ apps and games']] },
        { group: 'Audio', rows: [['Sound', 'Dolby Digital']] }
      ],
      box: ['TV', 'Remote', 'Table stand', 'User guide'],
      related: ['tv-kanvas', 'tv-karnival', 'tv-millennium', 'washer-7kg']
    },
    {
      id: 'tv-kanvas', name: 'Kanvas Series 40″ Full HD Smart TV', short: 'Kanvas 40″', category: 'smart-tvs', status: 'in-stock', price: 12499,
      tagline: 'Full HD clarity on a bigger canvas.',
      summary: 'A 40-inch Full HD smart TV with Dolby Audio, two HDMI and two USB ports.',
      card: 'tv-kanvas/front.webp',
      gallery: ['tv-kanvas/front.webp'],
      keySpecs: [
        { value: '40″', label: 'Full HD' },
        { value: '20 W', label: 'Dolby Audio' },
        { value: '1 GB', label: 'RAM' },
        { value: '8 GB', label: 'Storage' }
      ],
      highlights: [
        { icon: 'monitor', title: 'Full HD 1920 × 1080', text: 'Crisp detail at 60 Hz.' },
        { icon: 'speaker', title: '20 W Dolby Audio', text: 'Room-filling sound.' },
        { icon: 'app-window', title: 'Smart TV', text: 'Stream your favourite apps.' },
        { icon: 'usb', title: '2 HDMI, 2 USB', text: 'Connect a set-top box, console or drive.' }
      ],
      specs: [
        { group: 'Display', rows: [['Screen size', '101.6 cm (40 inch)'], ['Resolution', 'Full HD, 1920 × 1080'], ['Refresh rate', '60 Hz']] },
        { group: 'Performance', rows: [['RAM', '1 GB'], ['Storage', '8 GB']] },
        { group: 'Audio and ports', rows: [['Sound', '20 W with Dolby Audio'], ['HDMI', '2'], ['USB', '2']] },
        { group: 'Model', rows: [['Model number', 'KJS40ASFHD']] }
      ],
      box: ['TV', 'Remote', 'Table stand', 'User guide'],
      related: ['tv-karnival', 'tv-kohinoor', 'tv-millennium', 'washer-7kg']
    },
    {
      id: 'tv-karnival', name: 'Karnival Series 55″ 4K Ultra HD TV', short: 'Karnival 55″ 4K', category: 'smart-tvs', status: 'in-stock', badge: '4K UHD', price: 26803,
      tagline: '4K Ultra HD for the whole family.',
      summary: 'A 55-inch Ultra HD Android TV with HDR10, DTS Studio Sound and Dolby Audio. Also in 43 inches.',
      card: 'tv-karnival/front.webp', banner: 'tv-karnival/banner.webp',
      gallery: ['tv-karnival/front.webp', 'tv-karnival/back.webp'],
      keySpecs: [
        { value: '4K', label: 'Ultra HD' },
        { value: 'HDR10', label: 'Brighter colour' },
        { value: 'DTS', label: 'Studio Sound' },
        { value: '2 GB', label: 'RAM' }
      ],
      highlights: [
        { icon: 'monitor', title: '4K Ultra HD', text: 'Four times the detail of Full HD.' },
        { icon: 'sun', title: 'HDR10', text: 'Deeper contrast and brighter colour.' },
        { icon: 'speaker', title: 'DTS and Dolby Audio', text: 'Cinema sound in your living room.' },
        { icon: 'app-window', title: 'Android TV', text: 'Apps, games and casting built in.' }
      ],
      specs: [
        { group: 'Display', rows: [['Screen size', '139.7 cm (55 inch)'], ['Resolution', '4K Ultra HD, 3840 × 2160'], ['HDR', 'HDR10']] },
        { group: 'Smart TV', rows: [['Platform', 'Android TV'], ['RAM', '2 GB']] },
        { group: 'Audio', rows: [['Sound', 'DTS Studio Sound, Dolby Audio']] },
        { group: 'Model', rows: [['Model number', 'KJS55ASUHD'], ['Also available', '43 inch']] }
      ],
      box: ['TV', 'Remote', 'Table stand', 'User guide'],
      related: ['tv-kanvas', 'tv-kohinoor', 'zenz-pro', 'washer-7kg']
    },
    {
      id: 'tv-millennium', name: 'Millennium Series 39″ Smart HD TV', short: 'Millennium 39″', category: 'smart-tvs', status: 'in-stock', price: 13990, mrp: 28290,
      tagline: 'A smart TV that is easy on the pocket.',
      summary: 'An HD Ready smart TV with a quad-core processor and Mali-G31 graphics. Also in 32 inches.',
      card: 'tv-smart-hd/front.webp',
      gallery: ['tv-smart-hd/front.webp'],
      keySpecs: [
        { value: '39″', label: 'HD Ready' },
        { value: '4 core', label: '1.5 GHz CPU' },
        { value: 'Mali', label: 'G31 graphics' },
        { value: 'Smart', label: 'Android TV' }
      ],
      highlights: [
        { icon: 'monitor', title: 'HD Ready', text: '1366 × 768 at a 16:9 ratio.' },
        { icon: 'cpu', title: 'Quad-core 1.5 GHz', text: 'Smooth menus and apps.' },
        { icon: 'app-window', title: 'Smart TV', text: 'Stream your favourite shows.' },
        { icon: 'usb', title: 'HDMI and USB', text: 'Plug in a set-top box or drive.' }
      ],
      specs: [
        { group: 'Display', rows: [['Screen size', '98 cm (39 inch)'], ['Resolution', 'HD Ready, 1366 × 768'], ['Aspect ratio', '16:9']] },
        { group: 'Hardware', rows: [['Processor', 'Quad-core A53, 1.5 GHz'], ['Graphics', 'Mali-G31 (dual core)'], ['OS', 'Android 9']] },
        { group: 'Model', rows: [['Model number', 'KJW39SKHD'], ['Also available', '32 inch, KJW32SKHD']] }
      ],
      box: ['TV', 'Remote', 'Table stand', 'User guide'],
      related: ['tv-kohinoor', 'tv-kanvas', 'tv-karnival', 'washer-7kg']
    },
    {
      id: 'washer-7kg', name: '7 kg Semi-Automatic Washing Machine', short: '7 kg Washer', category: 'appliances', status: 'in-stock', badge: 'New', price: 6990, mrp: 13490,
      tagline: 'Ki cleaning, behtar aur damdaar.',
      summary: 'A 7 kg semi-automatic top load washer with a 1300 rpm spin dryer and a lint filter.',
      card: 'washer-7kg/front.webp',
      gallery: ['washer-7kg/front.webp'],
      keySpecs: [
        { value: '7 kg', label: 'Wash load' },
        { value: '1300', label: 'rpm spin' },
        { value: '4.5 kg', label: 'Dryer load' },
        { value: '300 W', label: 'Power' }
      ],
      highlights: [
        { icon: 'washing-machine', title: '7 kg capacity', text: 'Big enough for a family wash.' },
        { icon: 'wind', title: '1300 rpm spin', text: 'Clothes come out nearly dry.' },
        { icon: 'droplets', title: 'Lint filter', text: 'Catches fluff for a cleaner wash.' },
        { icon: 'sliders', title: 'Easy knob control', text: 'Simple to set, every time.' }
      ],
      specs: [
        { group: 'Capacity', rows: [['Wash load', '7 kg'], ['Dryer load', '4.5 kg']] },
        { group: 'Performance', rows: [['Spin speed', '1300 rpm'], ['Power', '300 W'], ['Type', 'Semi-automatic, top load']] },
        { group: 'Design', rows: [['Colour', 'White and red'], ['Controls', 'Knob'], ['Filter', 'Lint filter'], ['Model number', 'KJC70S-2024L']] }
      ],
      box: ['Washing machine', 'Inlet hose', 'Outlet hose', 'User guide'],
      related: ['tv-kohinoor', 'tv-kanvas', 'k104i', 'k9-4g']
    }
  ]
};

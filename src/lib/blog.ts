export type BlogLang = 'bn' | 'en' | 'banglish';

export type BlogCategory =
  | 'স্বাস্থ্য ও প্রকৃতি'
  | 'ডেলিভারি ও সার্ভিস'
  | 'দাম ও অর্ডার'
  | 'পরিচ্ছন্নতা ও মান'
  | 'Health & Nature'
  | 'Delivery & Service'
  | 'Pricing & Order'
  | 'Hygiene & Quality'
  | 'Events & Lifestyle';

export type BlogPost = {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: BlogCategory;
  primaryKeyword: string;
  secondaryKeywords: string[];
  lang: BlogLang;
  readingTime: string;
  author: string;
  coverImage?: string;
  faqs?: { question: string; answer: string }[];
};

// Central post registry — add new posts here as they are published.
// This is imported by /blog listing page and sitemap.ts.
export const allBlogPosts: BlogPost[] = [
  {
    title: 'ডাব কি খেতে ভালো? জানুন আসল তথ্য',
    slug: 'daab-ki-khete-valo',
    description:
      'ডাব খেলে কী হয়, কতটা উপকারী, আর কোন ডাব খাওয়া উচিত — এই ব্লগে পাচ্ছেন বৈজ্ঞানিক তথ্যসহ সহজ উত্তর।',
    publishedAt: '2026-08-19',
    category: 'স্বাস্থ্য ও প্রকৃতি',
    primaryKeyword: 'ডাব কি ভালো',
    secondaryKeywords: ['ডাব খেলে কি হয়', 'young coconut benefits', 'coconut water nutrition'],
    lang: 'bn',
    readingTime: '৬ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/product-hero.webp',
    faqs: [
      { question: 'ডাব খেলে কি ওজন বাড়ে?', answer: 'না। প্রাকৃতিক ডাবে ক্যালোরি কম থাকে এবং এতে কোনো চিনি বা প্রিজার্ভেটিভ নেই।' },
      { question: 'প্রতিদিন ডাব খাওয়া কি নিরাপদ?', answer: 'সাধারণত হ্যাঁ। পরিমিত পরিমাণে প্রতিদিন এক থেকে দুটো ডাব খাওয়া বেশিরভাগ মানুষের জন্য নিরাপদ।' },
      { question: 'পরিষ্কার ডাব কোথায় পাবো?', answer: 'Premium Daab ঢাকায় হাইজেনিকভাবে প্রস্তুত ডাব হোম ডেলিভারি দেয়।' },
    ],
  },
  {
    title: 'ঢাকায় ডাব কোথায় পাবো? সেরা অপশন গুলো',
    slug: 'dhaka-te-daab-kothay-pabo',
    description:
      'ঢাকায় ভালো ডাব খুঁজে পাওয়া কঠিন। রাস্তার ডাব নাকি অনলাইন ডেলিভারি — কোনটা ভালো? জানুন সব অপশন।',
    publishedAt: '2026-08-19',
    category: 'ডেলিভারি ও সার্ভিস',
    primaryKeyword: 'ঢাকায় ডাব কোথায় পাবো',
    secondaryKeywords: ['daab home delivery Dhaka', 'ডাব ডেলিভারি', 'where to find daab Dhaka'],
    lang: 'bn',
    readingTime: '৭ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/cart-coconut.webp',
    faqs: [
      { question: 'বাসায় বসে ডাব অর্ডার করা যায়?', answer: 'হ্যাঁ। Premium Daab ঢাকার বাশুন্ধরা R/A, ধানমন্ডি ও উত্তরায় হোম ডেলিভারি দেয়।' },
      { question: 'ডেলিভারি চার্জ কত?', answer: 'এলাকা অনুযায়ী ৳৪০ থেকে ৳৭০ পর্যন্ত।' },
      { question: 'কত দ্রুত ডাব পৌঁছাবে?', answer: 'ধানমন্ডিতে ১-২ ঘণ্টা, বাশুন্ধরা R/A ও অন্যান্য এলাকায় ২-৪ ঘণ্টা।' },
    ],
  },
  {
    title: 'ডাবের দাম কত? ২০২৫ সালে ঢাকায় ডাবের আসল মূল্য',
    slug: 'daab-er-daam-koto',
    description:
      'রাস্তার ডাব, অনলাইনে ডাব, আর Premium Daab — তিনটার দাম কত? কোনটায় কী পাচ্ছেন? সহজ তুলনামূলক গাইড।',
    publishedAt: '2026-08-19',
    category: 'দাম ও অর্ডার',
    primaryKeyword: 'ডাবের দাম',
    secondaryKeywords: ['daab price Dhaka 2025', 'daab price Bangladesh', 'coconut water price Bangladesh'],
    lang: 'bn',
    readingTime: '৫ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/product-hero.webp',
    faqs: [
      { question: 'Premium Daab-এর একটি ডাবের দাম কত?', answer: '৳১২০ প্রতি পিস। ৪ পিসের প্যাক ৳৪৮০, ৬ পিসের প্যাক ৳৭২০।' },
      { question: 'রাস্তার ডাব কেন সস্তা?', answer: 'রাস্তার ডাবে পরিষ্কার করা হয় না, মান নিশ্চিত হয় না এবং খোলা পরিবেশে কাটা হয়।' },
      { question: 'বেশি কিনলে ছাড় পাওয়া যায়?', answer: 'হ্যাঁ। ৬ পিসের প্যাকে প্রতি পিসে ৳১২০ পড়ে — একক অর্ডারের মতোই।' },
    ],
  },
  {
    title: 'অনলাইনে ডাব অর্ডার করার সহজ নিয়ম',
    slug: 'online-e-daab-order',
    description:
      'WhatsApp বা ওয়েবসাইটে কীভাবে ডাব অর্ডার করবেন? Premium Daab-এর স্টেপ বাই স্টেপ গাইড।',
    publishedAt: '2026-08-19',
    category: 'দাম ও অর্ডার',
    primaryKeyword: 'অনলাইনে ডাব অর্ডার',
    secondaryKeywords: ['daab order online Bangladesh', 'WhatsApp e daab order', 'online coconut order Dhaka'],
    lang: 'bn',
    readingTime: '৫ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/product-cutout.webp',
    faqs: [
      { question: 'অর্ডার কনফার্ম করতে কতক্ষণ লাগে?', answer: 'সাধারণত ১৫-৩০ মিনিটের মধ্যে WhatsApp-এ কনফার্মেশন পাঠানো হয়।' },
      { question: 'কোন কোন এলাকায় ডেলিভারি হয়?', answer: 'বাশুন্ধরা R/A, ধানমন্ডি, এবং উত্তরায় এখন ডেলিভারি চালু আছে।' },
      { question: 'পেমেন্ট কীভাবে করতে হয়?', answer: 'ডেলিভারির সময় ক্যাশ, বা আগে বিকাশ/নগদে পাঠানো যায়।' },
    ],
  },
  {
    title: 'পরিষ্কার ডাব কোথায় পাবো? হাইজেনিক ডাব চেনার উপায়',
    slug: 'poriskar-daab-kothay-pabo',
    description:
      'রাস্তার ডাব কতটা পরিষ্কার? কীভাবে বুঝবেন কোন ডাব নিরাপদ? হাইজেনিক ডাবের সহজ গাইড।',
    publishedAt: '2026-08-19',
    category: 'পরিচ্ছন্নতা ও মান',
    primaryKeyword: 'পরিষ্কার ডাব',
    secondaryKeywords: ['hygienic daab Dhaka', 'safe coconut water Bangladesh', 'clean daab delivery'],
    lang: 'bn',
    readingTime: '৬ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/product-label-closeup.webp',
    faqs: [
      { question: 'রাস্তার ডাব কি অস্বাস্থ্যকর?', answer: 'সব সময় না, তবে খোলা পরিবেশে কাটা ডাবে ধুলা ও ব্যাকটেরিয়ার ঝুঁকি থাকে।' },
      { question: 'Premium Daab কীভাবে পরিষ্কার করা হয়?', answer: 'ট্রিপল ওয়াশ পদ্ধতিতে, স্যানিটাইজড পরিবেশে শেভিং ও প্যাকেজিং করা হয়।' },
      { question: 'ডাব কাটার পর কতক্ষণ ভালো থাকে?', answer: 'চিলড অবস্থায় ৪-৬ ঘণ্টা। Premium Daab সবসময় ফ্রেশ অর্ডারে ডেলিভারি দেয়।' },
    ],
  },
  {
    title: 'সকালে খালি পেটে ডাবের পানি পানের উপকারিতা',
    slug: 'sokale-khali-pete-daab',
    description:
      'সকালে খালি পেটে ডাবের পানি পানের বৈজ্ঞানিক উপকারিতা ও সঠিক নিয়ম। জানুন কিডনি ও পাকস্থলীর সুরক্ষায় এর অবদান।',
    publishedAt: '2026-08-19',
    category: 'স্বাস্থ্য ও প্রকৃতি',
    primaryKeyword: 'খালি পেটে ডাবের পানি',
    secondaryKeywords: ['ডাবের পানির অপকারিতা ও উপকারিতা', 'coconut water on empty stomach', 'morning hydration'],
    lang: 'bn',
    readingTime: '৬ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/product-hero.webp',
    faqs: [
      { question: 'সকালে ডাব খেলে কি ঠান্ডা লাগার সম্ভাবনা থাকে?', answer: 'না, তবে আপনার যদি কোল্ড অ্যালার্জি বা সাইনাসের গুরুতর সমস্যা থাকে, তবে অতিরিক্ত ঠান্ডা ডাব পরিহার করাই ভালো।' },
      { question: 'কিডনি রোগীরা কি সকালে ডাব খেতে পারেন?', answer: 'কিডনি রোগীরা পটাশিয়াম জমতে পারে বলে চিকিৎসকের পরামর্শ ছাড়া ডাব খাওয়া যাবে না।' },
      { question: 'প্রিমিয়াম ডাব কীভাবে সংরক্ষণ করব?', answer: 'নরমালে রেখে দিতে পারেন। সকালে খাওয়ার জন্য আগের রাতে ফ্রিজে রেখে দেওয়া যায়।' },
    ],
  },
  {
    title: 'ব্যায়ামের পর স্পোর্টস ড্রিংক নাকি ডাব? ফিটনেস গাইড',
    slug: 'gym-rehydration-daab',
    description:
      'ব্যায়াম ও ওয়ার্কআউটের পর হাইড্রেশনের জন্য কৃত্রিম স্পোর্টস ড্রিংকস বনাম প্রাকৃতিক ডাবের পানির কার্যকারিতা তুলনা।',
    publishedAt: '2026-08-19',
    category: 'স্বাস্থ্য ও প্রকৃতি',
    primaryKeyword: 'ব্যায়ামের পর কি খাওয়া উচিত',
    secondaryKeywords: ['natural electrolyte drink Bangladesh', 'gym hydration Dhaka', 'post workout drink'],
    lang: 'bn',
    readingTime: '৭ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/cart-coconut.webp',
    faqs: [
      { question: 'ভারী ওয়েট লিফটিংয়ের পর ডাব কি প্রোটিন শেকের বিকল্প?', answer: 'না। ডাব পানিশূন্যতা ও ইলেক্ট্রোলাইটের ঘাটতি পূরণ করে। প্রোটিন আলাদা প্রয়োজন।' },
      { question: 'ডাবের পানিতে কি সোডিয়াম কম থাকে?', answer: 'হ্যাঁ, তবে সাধারণ জিম গোয়ারদের জন্য ডাবের পানির সোডিয়াম-পটাশিয়াম ব্যালেন্স নিখুঁত।' },
    ],
  },
  {
    title: 'চিনিযুক্ত সফট ড্রিংকস বনাম প্রাকৃতিক ডাবের পানি: কোনটা বেছে নেবেন?',
    slug: 'soda-vs-daab-water',
    description:
      'ঢাকার খাবার সংস্কৃতি, চিনিযুক্ত কোমল পানীয়ের ক্ষতিকর দিক এবং বিকল্প হিসেবে তাজা ডাবের পানির পুষ্টিগত গুরুত্ব।',
    publishedAt: '2026-08-19',
    category: 'স্বাস্থ্য ও প্রকৃতি',
    primaryKeyword: 'সফট ড্রিংকসের অপকারিতা',
    secondaryKeywords: ['sugar-free drinks Dhaka', 'diabetes friendly drinks Dhaka', 'natural coconut water benefits'],
    lang: 'bn',
    readingTime: '৬ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/product-hero.webp',
    faqs: [
      { question: 'ডাবের পানি কি ডায়াবেটিস রোগীরা খেতে পারেন?', answer: 'হ্যাঁ, পরিমিত পরিমাণে ডায়াবেটিস রোগীরা ডাবের পানি খেতে পারেন।' },
      { question: 'ডাবের পানিতে কি প্রিজার্ভেটিভ দেওয়া হয়?', answer: 'না। Premium Daab এ কোনো রাসায়নিক বা প্রিজার্ভেটিভ যোগ করা হয় না।' },
    ],
  },
  {
    title: 'গর্ভাবস্থায় ডাবের পানি পানের স্বাস্থ্য উপকারিতা ও সতর্কতা',
    slug: 'pregnancy-daab-water-benefits',
    description:
      'গর্ভাবস্থায় ডাবের পানি পানের বৈজ্ঞানিক উপকারিতা, গ্যাস্ট্রিক উপশম, এবং গর্ভাবস্থার ডায়েটে এর অন্তর্ভুক্তি।',
    publishedAt: '2026-08-19',
    category: 'স্বাস্থ্য ও প্রকৃতি',
    primaryKeyword: 'গর্ভাবস্থায় ডাবের পানি',
    secondaryKeywords: ['pregnancy diet plan bangla', 'gestational diabetes diet', 'amniotic fluid increase'],
    lang: 'bn',
    readingTime: '৭ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/product-cutout.webp',
    faqs: [
      { question: 'ডাব খেলে কি গর্ভস্থ শিশুর গায়ের রঙ ফর্সা হয়?', answer: 'না, এটি একটি কুসংস্কার। শিশুর গায়ের রঙ সম্পূর্ণ জিনগত বিষয়ের ওপর নির্ভর করে।' },
      { question: 'গর্ভকালীন ডায়াবেটিস থাকলে কি ডাব খাওয়া যাবে?', answer: 'চিকিৎসকের সাথে কথা বলে পরিমিত পরিমাণে খাওয়া যেতে পারে।' },
    ],
  },
  {
    title: 'হাসপাতালে রোগীর পথ্য হিসেবে ডাবের ভূমিকা ও সঠিক পরিচ্ছন্নতা',
    slug: 'hospital-patient-diet-daab',
    description:
      'হাসপাতালে রোগীর দ্রুত সুস্থতায় ডাবের পানির পুষ্টিগত গুরুত্ব, পটাশিয়ামের ভূমিকা এবং জীবাণুমুক্ত ডাব প্রস্তুত প্রণালী।',
    publishedAt: '2026-08-19',
    category: 'ডেলিভারি ও সার্ভিস',
    primaryKeyword: 'রোগীর খাবার তালিকা',
    secondaryKeywords: ['hospital diet food Dhaka', 'ডাব পটাশিয়াম', 'sterile patient diet'],
    lang: 'bn',
    readingTime: '৭ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/product-hero.webp',
    faqs: [
      { question: 'কিডনি ফেইলিওর রোগীরা কি ডাবের পানি খেতে পারবেন?', answer: 'সাধারণত কিডনি রোগীদের পটাশিয়াম নির্গমন ব্যাহত হয়। ডাক্তারের পরামর্শ ছাড়া অবশ্যই খাওয়ানো যাবে না।' },
      { question: 'Premium Daab হাসপাতালে ডেলিভারি পেতে কতক্ষণ লাগে?', answer: 'ধানমন্ডি ল্যাবএইড ও স্কয়ার হাসপাতালে ১-২ ঘণ্টার মধ্যে এবং বসুন্ধরা এভারকেয়ার হাসপাতালে ২-৪ ঘণ্টার মধ্যে কাস্টম ডাব ডেলিভারি করি।' },
    ],
  },
  {
    title: 'স্কুল-কলেজের স্পোর্টস ডে ও বার্ষিক ক্রীড়া প্রতিযোগিতায় সুস্থ হাইড্রেশন',
    slug: 'school-college-sports-daab',
    description:
      'শিক্ষার্থীদের বার্ষিক ক্রীড়া প্রতিযোগিতা ও স্পোর্টস ডেতে ডিহাইড্রেশন দূর করতে প্রাকৃতিক ডাবের পানির ভূমিকা ও হাইড্রেশন গাইড।',
    publishedAt: '2026-08-19',
    category: 'ডেলিভারি ও সার্ভিস',
    primaryKeyword: 'স্কুল বার্ষিক ক্রীড়া প্রতিযোগিতা',
    secondaryKeywords: ['student sports hydration', 'school catering Dhaka', 'sports hydration guidelines'],
    lang: 'bn',
    readingTime: '৬ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/cart-coconut.webp',
    faqs: [
      { question: 'বাচ্চাদের জন্য কি প্রতিদিন ডাব খাওয়া নিরাপদ?', answer: 'হ্যাঁ, বাড়ন্ত শিশুদের জন্য প্রতিদিন ১টি ডাবের পানি পান করা অত্যন্ত নিরাপদ এবং এটি তাদের হাড়ের গঠনে সাহায্য করে।' },
      { question: 'ইভেন্টের জন্য আমরা কি ডাবের ওপর কাস্টম ব্র্যান্ডিং করতে পারি?', answer: 'হ্যাঁ! ৩০ পিসের বেশি বাল্ক অর্ডার হলে আমরা ডাবের গায়ে কাস্টম লোগো প্রিন্ট বা গরম স্ট্যাম্প করে দিতে পারি।' },
    ],
  },
  {
    title: 'ঢাকায় ম্যারাথন ও স্পোর্টস ইভেন্টে অফিশিয়াল হাইড্রেশন পার্টনারশিপ',
    slug: 'sports-event-partnership-daab',
    description:
      'ম্যারাথন ও দূরপাল্লার দৌড়ে রানারদের পেশীর ক্লান্তি ও ডিহাইড্রেশন রোধে ডাবের পানির কার্যকারিতা এবং হাইড্রেশন পার্টনারশিপ।',
    publishedAt: '2026-08-19',
    category: 'ডেলিভারি ও সার্ভিস',
    primaryKeyword: 'ক্রীড়া অনুষ্ঠান',
    secondaryKeywords: ['sports event partner Dhaka', 'marathon hydration bangladesh', 'runner hydration drink'],
    lang: 'bn',
    readingTime: '৭ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/product-hero.webp',
    faqs: [
      { question: 'ডাবের পানি কি স্পোর্টস ড্রিংকসের চেয়ে দ্রুত কাজ করে?', answer: 'হ্যাঁ। প্রাকৃতিক আইসোটোনিক বৈশিষ্ট্য থাকার কারণে ডাবের পানি কৃত্রিম ড্রিংকসের চেয়ে দ্রুত কোষে শোষিত হয়।' },
      { question: 'আমরা কি ডাবের গায়ে আমাদের ইভেন্টের লোগো প্রিন্ট করতে পারি?', answer: 'অবশ্যই! আমাদের বাল্ক ইভেন্ট অর্ডারে আমরা গরম স্ট্যাম্পে ডাবের গায়ে আপনার ম্যারাথন বা ক্লাবের ব্র্যান্ড লোগো ফুটিয়ে তুলতে পারি।' },
    ],
  },
  {
    title: 'জিম ও ফিটনেস সেন্টারে প্রিমিয়াম ডাবের কিয়স্ক স্থাপন',
    slug: 'gym-fitness-partnership-daab',
    description:
      'ফিটনেস সেন্টারে প্রিমিয়াম ডাব কর্নার বা জুস বার স্থাপনের বাণিজ্যিক সুবিধা এবং মেম্বারদের জন্য সুস্থ পুষ্টি গাইড।',
    publishedAt: '2026-08-19',
    category: 'ডেলিভারি ও সার্ভিস',
    primaryKeyword: 'ফিটনেস সেন্টার',
    secondaryKeywords: ['gym juice bar Dhaka', 'healthy lifestyle bangladesh', 'gym rehydration corner'],
    lang: 'bn',
    readingTime: '৬ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/cart-coconut.webp',
    faqs: [
      { question: 'আমাদের জিমে ডাব ডেলিভারি কখন করা হবে?', answer: 'আমরা প্রতিদিন সকালে জিম খোলার আগেই স্যানিটাইজড ও চিলড ডাব ডেলিভারি ভ্যান দিয়ে পৌঁছে দিই।' },
      { question: 'ডাবগুলো কি নোংরা ছড়াবে?', answer: 'না। আমাদের ডাবগুলো কাস্টম ট্রিম করা থাকে এবং কাটার জন্য কোনো কাদা ছড়ায় না।' },
    ],
  },
  {
    title: 'বিয়ে ও হলুদের অনুষ্ঠানে ওয়েলকাম ড্রিংক হিসেবে প্রিমিয়াম ডাব',
    slug: 'wedding-welcome-drink-daab',
    description:
      'বিয়ে ও হলুদের অনুষ্ঠানে কৃত্রিম কোমল পানীয়ের বদলে তাজা ডাব পরিবেশনের আভিজাত্য, কাস্টম লোগো স্ট্যাম্পিং এবং ক্যাটারিং গাইড।',
    publishedAt: '2026-08-19',
    category: 'Events & Lifestyle',
    primaryKeyword: 'বিয়ের ওয়েলকাম ড্রিংক',
    secondaryKeywords: ['wedding catering Dhaka', 'wedding welcome drink ideas', 'corporate events welcome drink'],
    lang: 'bn',
    readingTime: '৬ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/product-cutout.webp',
    faqs: [
      { question: 'কাস্টম ব্র্যান্ডিং ডাই তৈরি করতে অতিরিক্ত চার্জ লাগে কি?', answer: '৩০ পিসের নিচের অর্ডারের জন্য ডাই তৈরির ওয়ান-টাইম চার্জ লাগতে পারে। তবে ৩০+ পিসের অর্ডারে ফ্রি ব্র্যান্ডিং ডিজাইন সুবিধা দিই।' },
      { question: 'ডাবের গায়ে লোগো কি কোনো কেমিক্যাল কালি দিয়ে প্রিন্ট করা হয়?', answer: 'না। আমরা গরম ছাঁচ (Hot Branding Iron) ব্যবহার করে ডাবের বাকলে লোগো খোদাই করি।' },
    ],
  },
  {
    title: 'কর্পোরেট অফিসে কাজের ফাঁকে সতেজতা: প্রিমিয়াম ডাব সার্ভিস',
    slug: 'office-refreshment-daab',
    description:
      'করপোরেট অফিসে কাজের গতি ও মনোযোগ বাড়াতে ডাবের পানির অবদান এবং নোংরা ছড়ানো ছাড়া office desktop hydration guide।',
    publishedAt: '2026-08-19',
    category: 'Events & Lifestyle',
    primaryKeyword: 'অফিস ব্রেক',
    secondaryKeywords: ['office tea coffee alternative', 'corporate delivery Dhaka', 'corporate wellness program'],
    lang: 'bn',
    readingTime: '৬ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/product-hero.webp',
    faqs: [
      { question: 'অফিসে প্রতিদিন কয়টি করে ডাব ডেলিভারি করা সম্ভব?', answer: 'আমরা মিনিমাম ৫টি ডাব থেকে শুরু করে দৈনিক সাপ্লাই দিয়ে থাকি।' },
      { question: 'ডাবের সাথে কি স্ট্র এবং টিস্যু সরবরাহ করা হবে?', answer: 'হ্যাঁ, পেপার স্ট্র এবং আর্দ্রতা নিরোধক টিস্যু সেট আলাদা স্যানিটাইজড প্যাকেটে সরবরাহ করা হয়।' },
    ],
  },
  {
    title: 'মিষ্টি ডাব চেনার সহজ উপায় এবং স্বাদের ভিন্নতার বৈজ্ঞানিক কারণ',
    slug: 'sweet-daab-selection-science',
    description:
      'ডাব মিষ্টি হওয়ার বৈজ্ঞানিক কারণ, লবণাক্ত মাটির প্রভাব এবং তাজা মিষ্টি ডাব চেনার কার্যকর উপায়।',
    publishedAt: '2026-08-19',
    category: 'পরিচ্ছন্নতা ও মান',
    primaryKeyword: 'মিষ্টি ডাব চেনার উপায়',
    secondaryKeywords: ['coconut sweetness science', 'soil salinity impact', 'sweet coconut selection'],
    lang: 'bn',
    readingTime: '৬ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/product-label-closeup.webp',
    faqs: [
      { question: 'ডাব বেশি কচি হলে কি পানি মিষ্টি হয়?', answer: 'না। ডাব বেশি কচি থাকলে শর্করা তৈরি হতে সময় লাগে বলে পানি পানসে হতে পারে।' },
      { question: 'Brix বা ব্রিক্স স্কেল কী?', answer: 'ব্রিক্স স্কেল হলো কোনো তরলে চিনির ঘনত্বের পরিমাপক। ভালো মিষ্টি ডাবের ব্রিক্স ৫-৭% থাকে।' },
    ],
  },
  {
    title: 'সাইজ এবং পানির পরিমাণ: ডাব কেনার সময় সাধারণ ভুল ধারণা',
    slug: 'daab-size-vs-water-volume',
    description:
      'ডাবের সাইজ বা আকার এবং ভেতরের পানির পরিমাণের বৈজ্ঞানিক সত্য। ডাব কেনার সময় সাইজের ভুল ধারণা এড়ানোর গাইড।',
    publishedAt: '2026-08-19',
    category: 'পরিচ্ছন্নতা ও মান',
    primaryKeyword: 'ডাব সাইজ',
    secondaryKeywords: ['coconut water volume per piece', 'husk thickness impact', 'standard cavity volume'],
    lang: 'bn',
    readingTime: '৫ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/product-hero.webp',
    faqs: [
      { question: 'Premium Daab কি ওজনে বিক্রি করা হয়?', answer: 'না, তবে পানির পরিমাণ ৩০০-৩৫০ মিলি থাকে তা কড়া তদারকি করা হয়।' },
      { question: 'খুব ছোট ডাবে কি পানি মিষ্টি হয়?', answer: 'হ্যাঁ, ছোট জাতের ডাব খোলস পাতলা হওয়ায় প্রচুর পানি থাকে এবং মিষ্টিও হয়ে থাকে।' },
    ],
  },
  {
    title: 'ডাব কেন দীর্ঘসময় রোদে রাখা ক্ষতিকর? সঠিক সংরক্ষণ পদ্ধতি',
    slug: 'daab-storage-sunlight-exposure',
    description:
      'তীব্র রোদে ডাব রাখার ক্ষতিকর দিক, রাসায়নিক পরিবর্তন এবং সঠিক স্টোরেজ পদ্ধতিতে ডাবের পুষ্টি রক্ষা।',
    publishedAt: '2026-08-19',
    category: 'পরিচ্ছন্নতা ও মান',
    primaryKeyword: 'ডাব সংরক্ষণ',
    secondaryKeywords: ['sunlight food degradation', 'raw coconut water shelf life', 'enzyme degradation temperature'],
    lang: 'bn',
    readingTime: '৬ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/product-cutout.webp',
    faqs: [
      { question: 'ডাবের পানি কি ফ্রিজে বরফ বা ডিপে জমানো যাবে?', answer: 'না। ডিপ ফ্রিজে বরফ করলে পুষ্টিগুণ ও ইলেক্ট্রোলাইটের গঠন ভেঙে যায়।' },
      { question: 'Premium Daab কাটার আগে কতদিন ভালো থাকে?', answer: 'নরমাল ফ্রিজে ৫-৭ দিন অনায়াসে তাজা থাকে।' },
    ],
  },
  {
    title: 'ডাব কাটার সরঞ্জাম ও নিরাপদ প্রস্তুত প্রণালী: হাইজেনিক গাইড',
    slug: 'daab-cutting-tools-safety',
    description:
      'ডাব কাটার নিরাপদ ও স্বাস্থ্যকর সরঞ্জাম, রাস্তার নোংরা দায়ের ঝুঁকি এবং বাড়িতে ডাব কাটার সঠিক পদ্ধতি।',
    publishedAt: '2026-08-19',
    category: 'পরিচ্ছন্নতা ও মান',
    primaryKeyword: 'safe coconut opener tool',
    secondaryKeywords: ['rusty knife infections', 'stainless steel coconut cutting', 'hygienic raw food handling'],
    lang: 'bn',
    readingTime: '৬ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/product-label-closeup.webp',
    faqs: [
      { question: 'Premium Daab কাটার পর কীভাবে সিল করা হয়?', answer: 'আমাদের ডাবগুলোর মাথা শেভ করে ফুড-গ্রেড র্যাপার দিয়ে সিল করা থাকে।' },
      { question: 'ডাব কাটার দা মরিচা ধরলে কি টিটেনাস হওয়ার ভয় থাকে?', answer: 'টিটেনাস মূলত মাটিতে ছড়ায়, তবে মরিচা পড়া দা ফুড পয়জনিং ও মেটাল টক্সিসিটির বড় কারণ।' },
    ],
  },
  {
    title: 'উপকূলের বাগান থেকে ঢাকার ড্রয়িংরুম: প্রিমিয়াম ডাবের পথযাত্রা',
    slug: 'farm-to-home-daab-journey',
    description:
      'দক্ষিণ উপকূলের বাগান থেকে ঢাকার কাস্টমারদের দরজা পর্যন্ত প্রিমিয়াম ডাবের সোর্সিং, পরিবহন ও কোল্ড চেইন লজিস্টিকস গাইড।',
    publishedAt: '2026-08-19',
    category: 'ডেলিভারি ও সার্ভিস',
    primaryKeyword: 'বাগেরহাটের ডাব',
    secondaryKeywords: ['coconut farm sourcing bangladesh', 'fresh daab supply chain', 'direct trade agriculture'],
    lang: 'bn',
    readingTime: '৭ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/product-hero.webp',
    faqs: [
      { question: 'বাগেরহাটের ডাব কেন অন্য এলাকার ডাবের চেয়ে মিষ্টি হয়?', answer: 'বাগেরহাটের মাটির লবণাক্ততা এবং খনিজ লবণের প্রাচুর্য পানির শর্করার ঘনত্ব বাড়িয়ে দেয়।' },
      { question: 'আমরা কি ডাব কেটে শাঁস বের করে বোতলে বিক্রি করি?', answer: 'না। ডাব কাটার সাথে সাথে তার ভেতরের পানি দ্রুত পুষ্টি হারাতে শুরু করে, তাই খোলস অক্ষুণ্ণ রেখেই ডেলিভারি করি।' },
    ],
  },
  {
    title: 'ধানমন্ডিতে ডাব ডেলিভারি ও লেকের পাড়ে তাজা সতেজতা',
    slug: 'dhanmondi-daab-delivery-guide',
    description:
      'ধানমন্ডি এলাকায় প্রিমিয়াম ডাব হোম ডেলিভারি, লেকের পাড়ে জগিং পরবর্তী রিহাইড্রেশন এবং রোড ১০/এ কার্ট গাইড।',
    publishedAt: '2026-08-19',
    category: 'ডেলিভারি ও সার্ভিস',
    primaryKeyword: 'ধানমন্ডিতে ডাব',
    secondaryKeywords: ['Dhanmondi Cart Rd 10/A', 'daab near me Dhanmondi', 'lake runner rehydration'],
    lang: 'bn',
    readingTime: '৬ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/cart-coconut.webp',
    faqs: [
      { question: 'ধানমন্ডি রোড ১০/এ কার্টটি কখন খোলা থাকে?', answer: 'আমাদের কার্টটি প্রতিদিন সকাল ১০টা থেকে রাত ৮টা পর্যন্ত খোলা থাকে।' },
      { question: 'ধানমন্ডিতে ডেলিভারি চার্জ কত?', answer: 'ধানমন্ডি এলাকার যেকোনো ঠিকানায় আমাদের হোম ডেলিভারি চার্জ মাত্র ৳৪০।' },
    ],
  },
  {
    title: 'বসুন্ধরা আবাসিক এলাকায় তাজা ডাব হোম ডেলিভারি গাইড',
    slug: 'bashundhara-daab-delivery-guide',
    description:
      'বসুন্ধরা আবাসিক এলাকায় প্রিমিয়াম ডাব হোম ডেলিভারি, এভারকেয়ার হাসপাতালে রোগী ভিজিট এবং আইইউবি ও এনএসইউ ক্যাম্পাস ব্রেক গাইড।',
    publishedAt: '2026-08-19',
    category: 'ডেলিভারি ও সার্ভিস',
    primaryKeyword: 'বসুন্ধরা ডাব ডেলিভারি',
    secondaryKeywords: ['Bashundhara RA home delivery', 'daab near me Bashundhara', 'Evercare patient visit drink'],
    lang: 'bn',
    readingTime: '৭ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/product-cutout.webp',
    faqs: [
      { question: 'বসুন্ধরা আবাসিক এলাকায় ডেলিভারি চার্জ কত?', answer: 'বসুন্ধরা আবাসিক এলাকার যেকোনো রোড বা ব্লকে আমাদের হোম ডেলিভারি চার্জ মাত্র ৳৪০।' },
      { question: 'এভারকেয়ার হাসপাতালের কেবিনে কি সরাসরি ডেলিভারি দেওয়া সম্ভব?', answer: 'হ্যাঁ! আমাদের রাইডাররা হাসপাতালের নিরাপত্তা নির্দেশিকা মেনে সরাসরি নির্দিষ্ট ওয়ার্ড বা কেবিনে গিয়ে ডাব বুঝিয়ে দিয়ে আসতে পারে।' },
    ],
  },
  {
    title: 'উত্তরায় ডাব ডেলিভারি এবং ফিটনেস লাইফস্টাইল গাইড',
    slug: 'uttara-daab-delivery-guide',
    description:
      'উত্তরা সেক্টর ১ থেকে ১৪ এলাকায় প্রিমিয়াম ডাব হোম ডেলিভারি, সেক্টর পার্কের প্রাতঃভ্রমণকারী এবং জিম রিহাইড্রেশন গাইড।',
    publishedAt: '2026-08-19',
    category: 'ডেলিভারি ও সার্ভিস',
    primaryKeyword: 'উত্তরায় ডাব',
    secondaryKeywords: ['Uttara sectors delivery', 'daab near me Uttara', 'gym rehydration corner'],
    lang: 'bn',
    readingTime: '৬ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/cart-coconut.webp',
    faqs: [
      { question: 'উত্তরা সেক্টরগুলোতে কি হোম ডেলিভারি চার্জ আলাদা?', answer: 'উত্তরা এলাকার যেকোনো সেক্টরে আমাদের হোম ডেলিভারি চার্জ ৳৭০।' },
      { question: 'উত্তরায় কি কোনো ফিজিক্যাল কার্ট বা স্টোর আছে?', answer: 'উত্তরায় ফিজিক্যাল কার্ট নেই, তবে খুব শীঘ্রই উত্তরা রবীন্দ্র সরণিতে কার্ট চালুর পরিকল্পনা আছে।' },
    ],
  },
  {
    title: 'ঢাকায় ডাব ডেলিভারি সার্ভিসের ভবিষ্যৎ ও আমাদের ওয়েটলিষ্ট',
    slug: 'future-of-daab-delivery-dhaka',
    description:
      'ঢাকায় প্রিমিয়াম ডাব ডেলিভারি সার্ভিসের ভবিষ্যৎ পরিকল্পনা, নতুন এরিয়া সম্প্রসারণ এবং কাস্টমারদের ওয়েটলিষ্ট গাইড।',
    publishedAt: '2026-08-19',
    category: 'ডেলিভারি ও সার্ভিস',
    primaryKeyword: 'premium daab waitlist',
    secondaryKeywords: ['daab delivery Dhaka expansion', 'Mohammadpur daab delivery', 'upcoming delivery hub'],
    lang: 'bn',
    readingTime: '৬ মিনিট',
    author: 'Premium Daab Team',
    coverImage: '/assets/premium-daab/product-cutout.webp',
    faqs: [
      { question: 'মোহাম্মদপুর এলাকায় ডেলিভারি কবে নাগাদ শুরু হবে?', answer: 'আমরা মোহাম্মদপুর জোনের ট্রায়াল রান শেষ করেছি। আগামী মাসের প্রথম সপ্তাহ থেকেই অফিশিয়াল ডেলিভারি শুরু হবে।' },
      { question: 'ওয়েটলিষ্টে নাম লিখাতে কি কোনো টাকা দিতে হবে?', answer: 'না। এটি একটি সম্পূর্ণ ফ্রি প্রি-রেজিস্ট্রেশন সেবা।' },
    ],
  },
];

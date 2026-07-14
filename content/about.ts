/**
 * Long-form "About" SEO content (ru/uz/en). Rendered server-side below the
 * existing AboutClient. The `faq` array also powers FAQPage JSON-LD.
 */
export type AboutLocale = "ru" | "uz" | "en";

export type AboutContent = {
  story: { title: string; paragraphs: string[] };
  missionVision: { missionTitle: string; mission: string; visionTitle: string; vision: string };
  howWeWork: { title: string; steps: { title: string; text: string }[] };
  verification: { title: string; intro: string; steps: string[] };
  advantages: { title: string; items: { title: string; text: string }[] };
  faqTitle: string;
  faq: { q: string; a: string }[];
};

const ru: AboutContent = {
  story: {
    title: "О компании Oson Uy",
    paragraphs: [
      "Oson Uy создан, чтобы сделать покупку жилья в Узбекистане честной, прозрачной и удобной. Мы видели, как люди тратят недели на звонки, ездят по офисам продаж и всё равно не понимают реальную цену и надёжность застройщика. Мы решили собрать всё в одном месте — с открытыми ценами и проверенными данными.",
      "Наша платформа объединяет новостройки Самарканда, Ташкента, Бухары и других городов страны. Для каждого жилого комплекса мы показываем цену за квадратный метр, планировки, шахматку квартир, срок сдачи и статус верификации застройщика. Покупатель принимает решение на основе фактов, а не рекламы.",
      "Мы верим, что технологии должны служить людям: интерактивная шахматка, 3D-модели домов, онлайн-подбор по фильтрам и личный кабинет покупателя убирают неопределённость из одной из самых важных покупок в жизни.",
    ],
  },
  missionVision: {
    missionTitle: "Наша миссия",
    mission: "Сделать рынок новостроек Узбекистана прозрачным: чтобы каждый покупатель мог быстро найти надёжного застройщика, понять реальную цену и купить квартиру без посредников и скрытых комиссий.",
    visionTitle: "Наше видение",
    vision: "Стать платформой №1 по недвижимости в Узбекистане — местом, куда приходят и покупатели, и застройщики, потому что здесь честно, удобно и безопасно.",
  },
  howWeWork: {
    title: "Как мы работаем",
    steps: [
      { title: "Собираем проверенные проекты", text: "Мы подключаем застройщиков и публикуем их жилые комплексы только после проверки документов и репутации." },
      { title: "Открываем данные", text: "Цена за м², планировки, шахматка, срок сдачи и ход строительства — всё видно сразу, без «уточните у менеджера»." },
      { title: "Соединяем напрямую", text: "Покупатель связывается с отделом продаж застройщика без посредников. Цена на сайте — это цена покупки." },
      { title: "Сопровождаем сделку", text: "Личный кабинет с договором, графиком платежей и историей оплат делает процесс прозрачным до самого конца." },
    ],
  },
  verification: {
    title: "Как мы проверяем застройщиков",
    intro: "Верификация — основа доверия на Oson Uy. Прежде чем проект появится в каталоге, мы проверяем:",
    steps: [
      "юридическую регистрацию компании и её право на землю;",
      "разрешительную документацию на строительство;",
      "репутацию и реальный ход строительства (фото и этапы);",
      "контактность и готовность застройщика работать открыто.",
    ],
  },
  advantages: {
    title: "Почему нам доверяют",
    items: [
      { title: "Прозрачность", text: "Открытые цены и данные по каждому ЖК — никаких скрытых условий." },
      { title: "Без посредников", text: "Прямая связь с застройщиком и отсутствие комиссий риелторов." },
      { title: "Технологии", text: "Шахматка, 3D-модели, фильтры и личный кабинет — покупка под контролем." },
      { title: "Локальная экспертиза", text: "Мы понимаем рынок Узбекистана: рассрочку, спрос по городам и особенности первичного жилья." },
    ],
  },
  faqTitle: "Частые вопросы об Oson Uy",
  faq: [
    { q: "Что такое Oson Uy?", a: "Oson Uy — маркетплейс новостроек Узбекистана. Мы собираем проверенные жилые комплексы с открытыми ценами, планировками и шахматкой квартир и соединяем покупателей с застройщиками напрямую." },
    { q: "Берёте ли вы комиссию с покупателя?", a: "Нет. Покупатель общается с застройщиком напрямую, скрытых комиссий посредников нет — цена на сайте и есть цена покупки." },
    { q: "Как вы проверяете застройщиков?", a: "Мы подтверждаем юридическую регистрацию, право на землю, разрешительные документы, репутацию и реальный ход строительства. Проверенные проекты получают отметку «Проверенный»." },
    { q: "В каких городах вы работаете?", a: "Прежде всего Самарканд и Ташкент, а также Бухара, Андижан, Наманган и другие города Узбекистана." },
  ],
};

const uz: AboutContent = {
  story: {
    title: "Oson Uy kompaniyasi haqida",
    paragraphs: [
      "Oson Uy O‘zbekistonda uy sotib olishni halol, shaffof va qulay qilish uchun yaratilgan. Odamlar haftalab qo‘ng‘iroq qilib, sotuv ofislariga borib ham quruvchining haqiqiy narxi va ishonchliligini bilmasligini ko‘rdik — va hammasini bir joyga, ochiq narxlar bilan yig‘dik.",
      "Platforma Samarqand, Toshkent, Buxoro va boshqa shaharlardagi yangi uylarni birlashtiradi. Har bir majmua uchun m² narxi, planirovkalar, shaxmatka, topshirish muddati va quruvchi verifikatsiyasi ko‘rsatiladi.",
      "Texnologiyalar odamlarga xizmat qilishi kerak: shaxmatka, 3D-modellar, filtrli qidiruv va shaxsiy kabinet hayotdagi eng muhim xariddan noaniqlikni olib tashlaydi.",
    ],
  },
  missionVision: {
    missionTitle: "Bizning missiyamiz",
    mission: "O‘zbekiston yangi uylar bozorini shaffof qilish: har bir xaridor ishonchli quruvchini tez topib, haqiqiy narxni tushunib, vositachisiz kvartira sotib olsin.",
    visionTitle: "Bizning maqsadimiz",
    vision: "O‘zbekistonda ko‘chmas mulk bo‘yicha №1 platforma bo‘lish — xaridorlar ham, quruvchilar ham keladigan halol va xavfsiz joy.",
  },
  howWeWork: {
    title: "Biz qanday ishlaymiz",
    steps: [
      { title: "Tekshirilgan loyihalarni yig‘amiz", text: "Quruvchilarni ulaymiz va majmualarni faqat hujjat va obro‘ tekshiruvidan so‘ng chop etamiz." },
      { title: "Ma’lumotni ochamiz", text: "m² narxi, planirovka, shaxmatka, muddat va qurilish borishi — hammasi darhol ko‘rinadi." },
      { title: "To‘g‘ridan-to‘g‘ri ulaymiz", text: "Xaridor sotuv bo‘limi bilan vositachisiz bog‘lanadi." },
      { title: "Bitimni qo‘llab-quvvatlaymiz", text: "Shartnoma, to‘lov grafigi va tarixi bilan shaxsiy kabinet jarayonni shaffof qiladi." },
    ],
  },
  verification: {
    title: "Quruvchilarni qanday tekshiramiz",
    intro: "Verifikatsiya — Oson Uy’dagi ishonch asosi. Loyiha katalogga chiqishidan oldin tekshiramiz:",
    steps: [
      "kompaniyaning yuridik ro‘yxati va yerga huquqi;",
      "qurilishga ruxsat hujjatlari;",
      "obro‘ va haqiqiy qurilish borishi (surat va bosqichlar);",
      "quruvchining ochiq ishlashga tayyorligi.",
    ],
  },
  advantages: {
    title: "Nega bizga ishonishadi",
    items: [
      { title: "Shaffoflik", text: "Har bir ЖК bo‘yicha ochiq narx va ma’lumot." },
      { title: "Vositachisiz", text: "Quruvchi bilan to‘g‘ridan-to‘g‘ri aloqa, komissiyasiz." },
      { title: "Texnologiyalar", text: "Shaxmatka, 3D, filtrlar va shaxsiy kabinet." },
      { title: "Mahalliy tajriba", text: "O‘zbekiston bozorini bilamiz: bo‘lib to‘lash, shaharlar bo‘yicha talab." },
    ],
  },
  faqTitle: "Oson Uy haqida savollar",
  faq: [
    { q: "Oson Uy nima?", a: "Oson Uy — O‘zbekiston yangi uylari bozori. Ochiq narx, planirovka va shaxmatka bilan tekshirilgan majmualarni yig‘amiz va xaridorlarni quruvchilar bilan to‘g‘ridan-to‘g‘ri ulaymiz." },
    { q: "Xaridordan komissiya olasizmi?", a: "Yo‘q. Xaridor quruvchi bilan bevosita gaplashadi, yashirin komissiya yo‘q." },
    { q: "Quruvchilarni qanday tekshirasiz?", a: "Yuridik ro‘yxat, yerga huquq, ruxsat hujjatlari, obro‘ va qurilish borishini tasdiqlaymiz. «Tekshirilgan» belgisi beriladi." },
    { q: "Qaysi shaharlarda ishlaysiz?", a: "Avvalo Samarqand va Toshkent, shuningdek Buxoro, Andijon, Namangan va boshqalar." },
  ],
};

const en: AboutContent = {
  story: {
    title: "About Oson Uy",
    paragraphs: [
      "Oson Uy was built to make buying a home in Uzbekistan honest, transparent and convenient. We saw people spend weeks calling and visiting sales offices and still not know the real price or the developer’s reliability — so we brought everything into one place with open prices and verified data.",
      "Our platform unites new developments in Samarkand, Tashkent, Bukhara and other cities. For every complex we show the price per square metre, layouts, an apartment chessboard, the completion date and the developer’s verification status.",
      "We believe technology should serve people: an interactive chessboard, 3D building models, filtered search and a buyer account remove the uncertainty from one of life’s most important purchases.",
    ],
  },
  missionVision: {
    missionTitle: "Our mission",
    mission: "Make Uzbekistan’s new-build market transparent, so every buyer can quickly find a reliable developer, understand the real price and buy without middlemen or hidden fees.",
    visionTitle: "Our vision",
    vision: "To become the #1 real-estate platform in Uzbekistan — the place both buyers and developers come to because it is honest, convenient and safe.",
  },
  howWeWork: {
    title: "How we work",
    steps: [
      { title: "We gather verified projects", text: "We onboard developers and publish their complexes only after checking documents and reputation." },
      { title: "We open the data", text: "Price per m², layouts, chessboard, completion date and progress — all visible up front." },
      { title: "We connect directly", text: "Buyers reach the developer’s sales team with no middlemen. The listed price is the price." },
      { title: "We support the deal", text: "A buyer account with contract, payment schedule and history keeps the process transparent." },
    ],
  },
  verification: {
    title: "How we verify developers",
    intro: "Verification is the foundation of trust on Oson Uy. Before a project enters the catalogue we check:",
    steps: [
      "the company’s legal registration and land rights;",
      "construction permits and documentation;",
      "reputation and real construction progress (photos and stages);",
      "the developer’s willingness to work openly.",
    ],
  },
  advantages: {
    title: "Why people trust us",
    items: [
      { title: "Transparency", text: "Open prices and data on every complex — no hidden terms." },
      { title: "No middlemen", text: "Direct contact with the developer and no agent fees." },
      { title: "Technology", text: "Chessboard, 3D models, filters and a buyer account." },
      { title: "Local expertise", text: "We understand Uzbekistan’s market: instalments, city demand and primary housing." },
    ],
  },
  faqTitle: "Frequently asked questions about Oson Uy",
  faq: [
    { q: "What is Oson Uy?", a: "Oson Uy is Uzbekistan’s new-build marketplace. We gather verified complexes with open prices, layouts and an apartment chessboard, and connect buyers with developers directly." },
    { q: "Do you charge the buyer a fee?", a: "No. Buyers deal with the developer directly, with no hidden middleman fees — the listed price is the price." },
    { q: "How do you verify developers?", a: "We confirm legal registration, land rights, permits, reputation and real construction progress. Verified projects get a “Verified” badge." },
    { q: "Which cities do you cover?", a: "Primarily Samarkand and Tashkent, as well as Bukhara, Andijan, Namangan and other cities of Uzbekistan." },
  ],
};

const CONTENT: Record<AboutLocale, AboutContent> = { ru, uz, en };

export function getAboutContent(locale: string): AboutContent {
  return CONTENT[(locale as AboutLocale)] ?? ru;
}

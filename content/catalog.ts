/**
 * Long-form SEO content for the catalogue page (ru/uz/en).
 * Rendered server-side below the project grid; the `faq` array also powers the
 * FAQPage JSON-LD. Written to genuinely help a buyer choose a new-build.
 */
export type CatalogLocale = "ru" | "uz" | "en";

export type CatalogContent = {
  intro: { title: string; paragraphs: string[] };
  guide: { title: string; steps: { title: string; text: string }[] };
  cities: { title: string; items: { name: string; href: string }[] };
  faqTitle: string;
  faq: { q: string; a: string }[];
};

const ru: CatalogContent = {
  intro: {
    title: "Каталог новостроек Узбекистана",
    paragraphs: [
      "В каталоге Oson Uy собраны новостройки Самарканда, Ташкента, Бухары и других городов Узбекистана от проверенных застройщиков. Здесь можно купить квартиру напрямую у девелопера — с прозрачной ценой за квадратный метр, доступными планировками и понятными условиями рассрочки.",
      "Используйте фильтры, чтобы быстро сузить выбор: задайте бюджет (цену за м²), площадь, район или город. Каждый жилой комплекс сопровождается фотографиями, характеристиками дома, сроком сдачи и контактами застройщика, а по многим проектам доступна интерактивная шахматка квартир и 3D-модель.",
      "Покупка квартиры в новостройке выгоднее готового жилья: на старте строительства цена ниже, а к сдаче дома стоимость обычно растёт. Мы показываем реальный ход строительства и статус верификации застройщика, чтобы вы принимали решение спокойно и на основе фактов.",
    ],
  },
  guide: {
    title: "Как выбрать квартиру в новостройке",
    steps: [
      { title: "1. Определите бюджет и способ оплаты", text: "Решите, покупаете ли вы за наличные, в рассрочку от застройщика или в ипотеку. В фильтре можно отобрать ЖК с рассрочкой и сравнить первоначальный взнос и срок." },
      { title: "2. Выберите район и город", text: "Оцените инфраструктуру: школы, транспорт, магазины. Для инвестиций выбирайте ликвидные районы Самарканда и Ташкента с растущим спросом на аренду." },
      { title: "3. Сравните цену за м² и планировки", text: "Смотрите не только итоговую цену, но и стоимость квадратного метра, площадь и планировку. Шахматка помогает выбрать конкретную квартиру, этаж и вид." },
      { title: "4. Проверьте застройщика и срок сдачи", text: "Отметка «Проверенный», отзывы покупателей, разрешительные документы и реальные фото стройки снижают риск. Уточните срок сдачи и стадию готовности дома." },
      { title: "5. Свяжитесь с застройщиком напрямую", text: "На странице ЖК вы общаетесь с отделом продаж без посредников и скрытых комиссий. Забронируйте выбранную квартиру и оформите договор." },
    ],
  },
  cities: {
    title: "Новостройки по городам",
    items: [
      { name: "Самарканд", href: "/catalog?location=Samarkand" },
      { name: "Ташкент", href: "/catalog?location=Tashkent" },
      { name: "Бухара", href: "/catalog?location=Bukhara" },
      { name: "Андижан", href: "/catalog?location=Andijan" },
      { name: "Наманган", href: "/catalog?location=Namangan" },
    ],
  },
  faqTitle: "Частые вопросы о покупке новостройки",
  faq: [
    { q: "Как купить квартиру в новостройке через Oson Uy?", a: "Выберите жилой комплекс в каталоге, изучите планировки и цены в шахматке, затем свяжитесь с застройщиком напрямую со страницы проекта. Посредники и скрытые комиссии отсутствуют — цена на сайте и есть цена покупки." },
    { q: "Что такое рассрочка от застройщика и чем она отличается от ипотеки?", a: "Рассрочка — это оплата напрямую застройщику: обычно первый взнос 20–50% и равные ежемесячные платежи, часто без банковских процентов. Ипотека — это кредит банка. В каталоге фильтр «в рассрочку» показывает ЖК с такими условиями." },
    { q: "Безопасно ли покупать квартиру на этапе строительства?", a: "Мы проверяем застройщиков перед публикацией: юридические документы, разрешения и репутацию. Ищите отметку «Проверенный», читайте отзывы покупателей и смотрите реальные фото хода строительства." },
    { q: "Можно ли купить квартиру в рассрочку без банка?", a: "Да. Многие застройщики предлагают рассрочку напрямую, без участия банка и без процентов. Условия (первый взнос и срок) указаны на карточке проекта." },
    { q: "В каких городах есть новостройки на Oson Uy?", a: "Прежде всего Самарканд и Ташкент, а также Бухара, Андижан, Наманган и другие города Узбекистана. Используйте фильтр по городу или ссылки на страницы городов." },
    { q: "Выгодно ли инвестировать в новостройку?", a: "Покупка на раннем этапе строительства обычно дешевле готового жилья, а к сдаче цена растёт. В сочетании с арендным спросом в крупных городах это делает новостройки понятным инструментом инвестиций." },
  ],
};

const uz: CatalogContent = {
  intro: {
    title: "O‘zbekiston yangi uylari katalogi",
    paragraphs: [
      "Oson Uy katalogida Samarqand, Toshkent, Buxoro va O‘zbekistonning boshqa shaharlaridagi ishonchli quruvchilardan yangi uylar to‘plangan. Kvartirani devloperdan to‘g‘ridan-to‘g‘ri, shaffof m² narxi va tushunarli bo‘lib to‘lash shartlari bilan sotib olish mumkin.",
      "Tanlovni tezda toraytirish uchun filtrlardan foydalaning: byudjet (m² narxi), maydon, tuman yoki shaharni belgilang. Har bir majmuada suratlar, uy xususiyatlari, topshirish muddati va kontaktlar bor, ko‘p loyihalar uchun shaxmatka va 3D-model mavjud.",
      "Yangi binodan sotib olish tayyor uydan foydaliroq: qurilish boshida narx pastroq, topshirishga narx odatda oshadi. Biz qurilishning haqiqiy borishi va quruvchi verifikatsiyasini ko‘rsatamiz.",
    ],
  },
  guide: {
    title: "Yangi binodan kvartirani qanday tanlash",
    steps: [
      { title: "1. Byudjet va to‘lov usulini aniqlang", text: "Naqd, quruvchidan bo‘lib to‘lash yoki ipoteka — qaysi biri qulayligini hal qiling. Filtr orqali bo‘lib to‘lashli ЖК’larni tanlab, boshlang‘ich to‘lov va muddatni solishtiring." },
      { title: "2. Tuman va shaharni tanlang", text: "Infratuzilmani baholang: maktab, transport, do‘konlar. Investitsiya uchun Samarqand va Toshkentning likvid tumanlarini tanlang." },
      { title: "3. m² narxi va planirovkalarni solishtiring", text: "Faqat umumiy narxni emas, m² narxi, maydon va planirovkani ham ko‘ring. Shaxmatka aniq kvartira va qavatni tanlashga yordam beradi." },
      { title: "4. Quruvchi va muddatni tekshiring", text: "«Tekshirilgan» belgisi, sharhlar, ruxsat hujjatlari va haqiqiy qurilish suratlari xavfni kamaytiradi." },
      { title: "5. Quruvchi bilan to‘g‘ridan-to‘g‘ri bog‘laning", text: "ЖК sahifasida sotuv bo‘limi bilan vositachisiz gaplashasiz. Kvartirani band qilib, shartnoma rasmiylashtiring." },
    ],
  },
  cities: {
    title: "Shaharlar bo‘yicha yangi uylar",
    items: [
      { name: "Samarqand", href: "/catalog?location=Samarkand" },
      { name: "Toshkent", href: "/catalog?location=Tashkent" },
      { name: "Buxoro", href: "/catalog?location=Bukhara" },
      { name: "Andijon", href: "/catalog?location=Andijan" },
      { name: "Namangan", href: "/catalog?location=Namangan" },
    ],
  },
  faqTitle: "Yangi uy sotib olish bo‘yicha savollar",
  faq: [
    { q: "Oson Uy orqali yangi binodan kvartirani qanday sotib olaman?", a: "Katalogdan majmuani tanlang, shaxmatkada planirovka va narxlarni ko‘ring, so‘ng loyiha sahifasidan quruvchi bilan to‘g‘ridan-to‘g‘ri bog‘laning. Vositachi va yashirin komissiya yo‘q." },
    { q: "Bo‘lib to‘lash ipotekadan nimasi bilan farq qiladi?", a: "Bo‘lib to‘lash — to‘g‘ridan-to‘g‘ri quruvchiga to‘lov: odatda 20–50% boshlang‘ich va teng oylik to‘lovlar, ko‘pincha bank foizsiz. Ipoteka — bank krediti." },
    { q: "Qurilish bosqichida sotib olish xavfsizmi?", a: "Biz quruvchilarni oldindan tekshiramiz: hujjatlar, ruxsatlar va obro‘. «Tekshirilgan» belgisiga qarang va sharhlarni o‘qing." },
    { q: "Banksiz bo‘lib to‘lashga kvartira olsa bo‘ladimi?", a: "Ha. Ko‘p quruvchilar banksiz, foizsiz bo‘lib to‘lash taklif qiladi. Shartlar loyiha kartochkasida ko‘rsatilgan." },
    { q: "Qaysi shaharlarda yangi uylar bor?", a: "Avvalo Samarqand va Toshkent, shuningdek Buxoro, Andijon, Namangan va boshqa shaharlar. Shahar filtridan foydalaning." },
    { q: "Yangi binoga investitsiya foydalimi?", a: "Erta bosqichda narx pastroq, topshirishga oshadi. Yirik shaharlardagi ijaraga talab bilan birga bu tushunarli investitsiya." },
  ],
};

const en: CatalogContent = {
  intro: {
    title: "Catalogue of new builds in Uzbekistan",
    paragraphs: [
      "The Oson Uy catalogue brings together new developments in Samarkand, Tashkent, Bukhara and other cities of Uzbekistan from verified developers. Buy an apartment directly from the developer, with a transparent price per square metre and clear instalment terms.",
      "Use the filters to narrow your choice quickly: set a budget (price per m²), area, district or city. Every complex includes photos, building specs, completion date and contacts, and many projects offer an interactive apartment chessboard and a 3D model.",
      "Buying a new build is more profitable than finished housing: prices are lower at the construction stage and usually rise by completion. We show real construction progress and the developer’s verification status.",
    ],
  },
  guide: {
    title: "How to choose an apartment in a new build",
    steps: [
      { title: "1. Set your budget and payment method", text: "Decide between cash, developer instalments or a mortgage. The filter lets you select complexes with instalments and compare down payment and term." },
      { title: "2. Choose a district and city", text: "Assess the infrastructure: schools, transport, shops. For investment, pick liquid districts of Samarkand and Tashkent with growing rental demand." },
      { title: "3. Compare price per m² and layouts", text: "Look beyond the total price at the price per square metre, area and layout. The chessboard helps you pick a specific unit, floor and view." },
      { title: "4. Check the developer and completion date", text: "The “Verified” badge, buyer reviews, permits and real construction photos reduce risk. Confirm the completion date and readiness stage." },
      { title: "5. Contact the developer directly", text: "On the project page you talk to the sales team with no middlemen or hidden fees. Reserve your apartment and sign the contract." },
    ],
  },
  cities: {
    title: "New builds by city",
    items: [
      { name: "Samarkand", href: "/catalog?location=Samarkand" },
      { name: "Tashkent", href: "/catalog?location=Tashkent" },
      { name: "Bukhara", href: "/catalog?location=Bukhara" },
      { name: "Andijan", href: "/catalog?location=Andijan" },
      { name: "Namangan", href: "/catalog?location=Namangan" },
    ],
  },
  faqTitle: "Frequently asked questions about buying a new build",
  faq: [
    { q: "How do I buy a new-build apartment through Oson Uy?", a: "Choose a complex in the catalogue, review layouts and prices in the chessboard, then contact the developer directly from the project page. No middlemen or hidden fees — the listed price is the price." },
    { q: "How do developer instalments differ from a mortgage?", a: "Instalments are paid directly to the developer: typically a 20–50% down payment and equal monthly payments, often bank-interest-free. A mortgage is a bank loan. The “instalment” filter shows complexes with such terms." },
    { q: "Is it safe to buy at the construction stage?", a: "We verify developers before publishing: legal documents, permits and reputation. Look for the “Verified” badge, read buyer reviews and check real construction photos." },
    { q: "Can I buy an apartment in instalments without a bank?", a: "Yes. Many developers offer instalments directly, without a bank and interest-free. Terms (down payment and duration) are shown on the project card." },
    { q: "Which cities have new builds on Oson Uy?", a: "Primarily Samarkand and Tashkent, as well as Bukhara, Andijan, Namangan and other cities of Uzbekistan. Use the city filter or city links." },
    { q: "Is investing in a new build worthwhile?", a: "Buying early is usually cheaper than finished housing, and prices rise by completion. Combined with rental demand in large cities, new builds are a clear investment tool." },
  ],
};

const CONTENT: Record<CatalogLocale, CatalogContent> = { ru, uz, en };

export function getCatalogContent(locale: string): CatalogContent {
  return CONTENT[(locale as CatalogLocale)] ?? ru;
}

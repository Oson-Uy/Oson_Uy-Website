/**
 * City landing-page content for /novostroyki/[city].
 * slug → per-locale { name, title, intro[], why[], faq[] } + the `match` string
 * used to filter projects by location. Real, useful copy (not padded filler).
 */
export type CityLocale = "ru" | "uz" | "en";

export type CityLocaleContent = {
  name: string; // "Самарканд"
  h1: string; // "Новостройки Самарканда"
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  why: { title: string; text: string }[];
  faq: { q: string; a: string }[];
};

export type City = {
  slug: string;
  /** substring matched (case-insensitive) against project.location */
  match: string;
  ru: CityLocaleContent;
  uz: CityLocaleContent;
  en: CityLocaleContent;
};

function city(
  slug: string,
  match: string,
  ru: CityLocaleContent,
  uz: CityLocaleContent,
  en: CityLocaleContent,
): City {
  return { slug, match, ru, uz, en };
}

export const CITIES: City[] = [
  city(
    "samarkand",
    "samarkand",
    {
      name: "Самарканд",
      h1: "Новостройки Самарканда",
      metaTitle: "Новостройки Самарканда — купить квартиру от застройщика | Oson Uy",
      metaDescription:
        "Новостройки Самарканда от проверенных застройщиков: квартиры в рассрочку, цены за м², планировки и шахматка. Купить квартиру в Самарканде на Oson Uy.",
      intro: [
        "Самарканд — один из самых быстрорастущих городов Узбекистана и центр притяжения для покупателей жилья. Развитие туризма, новые деловые районы и рост населения формируют устойчивый спрос на квартиры в новостройках. На Oson Uy собраны проверенные жилые комплексы Самарканда с открытыми ценами и удобным подбором.",
        "Купить квартиру в новостройке Самарканда можно напрямую у застройщика — без посредников и скрытых комиссий. Мы показываем стоимость квадратного метра, доступные планировки, срок сдачи и статус каждой квартиры в шахматке, а по многим ЖК доступна рассрочка и 3D-модель дома.",
      ],
      why: [
        { title: "Растущий спрос", text: "Туристический и деловой рост города делает недвижимость Самарканда ликвидной — как для жизни, так и для инвестиций и аренды." },
        { title: "Рассрочка от застройщика", text: "Многие новостройки Самарканда предлагают рассрочку без банка: первый взнос и равные ежемесячные платежи." },
        { title: "Проверенные застройщики", text: "Каждый ЖК на Oson Uy проходит верификацию — вы видите отметку «Проверенный» и реальные фото хода строительства." },
        { title: "Удобный подбор", text: "Фильтры по цене, площади и району помогают быстро найти подходящую квартиру именно в нужной части города." },
      ],
      faq: [
        { q: "Сколько стоит квартира в новостройке Самарканда?", a: "Цена зависит от района, застройщика и стадии строительства. На карточке каждого ЖК указана стоимость за квадратный метр — так удобно сравнивать проекты между собой." },
        { q: "Можно ли купить квартиру в Самарканде в рассрочку?", a: "Да. Многие застройщики Самарканда предлагают рассрочку напрямую, без банка. Используйте фильтр «в рассрочку», чтобы увидеть такие ЖК." },
        { q: "Как выбрать надёжного застройщика в Самарканде?", a: "Ищите отметку «Проверенный», читайте отзывы покупателей и смотрите реальные фотографии хода строительства — всё это есть на страницах проектов Oson Uy." },
      ],
    },
    {
      name: "Samarqand",
      h1: "Samarqand yangi uylari",
      metaTitle: "Samarqand yangi uylari — quruvchidan kvartira | Oson Uy",
      metaDescription:
        "Samarqand yangi uylari ishonchli quruvchilardan: bo‘lib to‘lash, m² narxi, planirovka va shaxmatka. Oson Uy’da Samarqandda kvartira soting oling.",
      intro: [
        "Samarqand — O‘zbekistonning tez rivojlanayotgan shaharlaridan biri. Turizm, yangi ishbilarmonlik tumanlari va aholi o‘sishi yangi uylarga barqaror talab yaratmoqda. Oson Uy’da Samarqandning tekshirilgan majmualari ochiq narxlar bilan to‘plangan.",
        "Samarqandda yangi binodan kvartirani quruvchidan to‘g‘ridan-to‘g‘ri, vositachisiz sotib olish mumkin. m² narxi, planirovka, muddat va shaxmatkadagi holat ko‘rinadi; ko‘p ЖК’larda bo‘lib to‘lash va 3D-model bor.",
      ],
      why: [
        { title: "O‘sib borayotgan talab", text: "Turizm va ishbilarmonlik o‘sishi Samarqand ko‘chmas mulkini likvid qiladi." },
        { title: "Quruvchidan bo‘lib to‘lash", text: "Ko‘p majmualar banksiz bo‘lib to‘lash taklif qiladi." },
        { title: "Tekshirilgan quruvchilar", text: "Har bir ЖК verifikatsiyadan o‘tadi va «Tekshirilgan» belgisiga ega." },
        { title: "Qulay tanlov", text: "Narx, maydon va tuman bo‘yicha filtrlar kerakli kvartirani tez topadi." },
      ],
      faq: [
        { q: "Samarqandda yangi uy kvartirasi qancha turadi?", a: "Narx tuman, quruvchi va bosqichga bog‘liq. Har bir ЖК kartochkasida m² narxi ko‘rsatilgan." },
        { q: "Samarqandda bo‘lib to‘lashga olsa bo‘ladimi?", a: "Ha. Ko‘p quruvchilar banksiz bo‘lib to‘lash taklif qiladi. «Bo‘lib to‘lash» filtridan foydalaning." },
        { q: "Ishonchli quruvchini qanday tanlash mumkin?", a: "«Tekshirilgan» belgisi, sharhlar va qurilish suratlariga qarang." },
      ],
    },
    {
      name: "Samarkand",
      h1: "New builds in Samarkand",
      metaTitle: "New builds in Samarkand — buy from the developer | Oson Uy",
      metaDescription:
        "New builds in Samarkand from verified developers: instalments, price per m², layouts and chessboard. Buy an apartment in Samarkand on Oson Uy.",
      intro: [
        "Samarkand is one of Uzbekistan’s fastest-growing cities and a magnet for home buyers. Tourism growth, new business districts and a rising population create steady demand for new-build apartments. Oson Uy gathers verified complexes in Samarkand with open prices and easy filtering.",
        "You can buy a new-build apartment in Samarkand directly from the developer — no middlemen or hidden fees. We show the price per square metre, available layouts, completion date and the status of every unit in the chessboard, and many complexes offer instalments and a 3D model.",
      ],
      why: [
        { title: "Growing demand", text: "Tourism and business growth make Samarkand property liquid — for living, investment and rental." },
        { title: "Developer instalments", text: "Many Samarkand new builds offer bank-free instalments with a down payment and equal monthly payments." },
        { title: "Verified developers", text: "Every complex on Oson Uy is verified — you see the “Verified” badge and real construction photos." },
        { title: "Easy search", text: "Filters by price, area and district help you quickly find the right apartment in the right part of the city." },
      ],
      faq: [
        { q: "How much does a new-build apartment in Samarkand cost?", a: "The price depends on the district, developer and construction stage. Each complex card shows the price per square metre for easy comparison." },
        { q: "Can I buy in instalments in Samarkand?", a: "Yes. Many Samarkand developers offer instalments directly, without a bank. Use the “instalment” filter to see them." },
        { q: "How do I choose a reliable developer?", a: "Look for the “Verified” badge, read buyer reviews and check real construction photos on the project pages." },
      ],
    },
  ),
  city(
    "tashkent",
    "tashkent",
    {
      name: "Ташкент",
      h1: "Новостройки Ташкента",
      metaTitle: "Новостройки Ташкента — купить квартиру от застройщика | Oson Uy",
      metaDescription:
        "Новостройки Ташкента от проверенных застройщиков: квартиры в рассрочку и ипотеку, цены за м², планировки. Купить квартиру в Ташкенте на Oson Uy.",
      intro: [
        "Ташкент — столица и крупнейший рынок недвижимости Узбекистана. Здесь самый широкий выбор новостроек: от компактных квартир до жилья бизнес-класса. Высокий спрос на аренду делает Ташкент привлекательным и для тех, кто покупает квартиру для жизни, и для инвесторов.",
        "На Oson Uy вы найдёте проверенные жилые комплексы Ташкента с открытыми ценами, планировками и шахматкой. Покупка идёт напрямую у застройщика — прозрачно и без посредников.",
      ],
      why: [
        { title: "Самый большой выбор", text: "Столичный рынок предлагает больше всего проектов и районов на любой бюджет." },
        { title: "Сильный арендный спрос", text: "Ташкент — центр деловой активности, поэтому купленная квартира легко сдаётся в аренду." },
        { title: "Рассрочка и ипотека", text: "Доступны и рассрочка от застройщика, и покупка через банковскую ипотеку." },
        { title: "Проверенные застройщики", text: "Верификация и реальные данные снижают риски покупки на первичном рынке." },
      ],
      faq: [
        { q: "Где смотреть новостройки Ташкента?", a: "В каталоге Oson Uy отфильтруйте проекты по Ташкенту — увидите проверенные ЖК с ценами, планировками и шахматкой." },
        { q: "Что выгоднее в Ташкенте — рассрочка или ипотека?", a: "Рассрочка от застройщика часто без процентов, но с более коротким сроком; ипотека даёт длинный срок, но с банковскими процентами. Сравните условия на карточках проектов." },
        { q: "Стоит ли инвестировать в новостройку Ташкента?", a: "Да, за счёт роста цены к сдаче дома и стабильного арендного спроса в столице." },
      ],
    },
    {
      name: "Toshkent",
      h1: "Toshkent yangi uylari",
      metaTitle: "Toshkent yangi uylari — quruvchidan kvartira | Oson Uy",
      metaDescription:
        "Toshkent yangi uylari ishonchli quruvchilardan: bo‘lib to‘lash va ipoteka, m² narxi, planirovka. Oson Uy’da Toshkentda kvartira soting oling.",
      intro: [
        "Toshkent — poytaxt va O‘zbekistonning eng katta ko‘chmas mulk bozori. Bu yerda yangi uylar tanlovi eng keng: ixcham kvartiradan biznes-klassgacha. Ijaraga yuqori talab Toshkentni yashash uchun ham, investitsiya uchun ham jozibali qiladi.",
        "Oson Uy’da Toshkentning tekshirilgan majmualarini ochiq narx, planirovka va shaxmatka bilan topasiz. Xarid quruvchidan to‘g‘ridan-to‘g‘ri, vositachisiz.",
      ],
      why: [
        { title: "Eng katta tanlov", text: "Poytaxt bozorida har qanday byudjetga loyiha va tuman ko‘p." },
        { title: "Kuchli ijara talabi", text: "Toshkent ishbilarmonlik markazi, kvartira oson ijaraga beriladi." },
        { title: "Bo‘lib to‘lash va ipoteka", text: "Ham quruvchidan bo‘lib to‘lash, ham bank ipotekasi mavjud." },
        { title: "Tekshirilgan quruvchilar", text: "Verifikatsiya va haqiqiy ma’lumot xavfni kamaytiradi." },
      ],
      faq: [
        { q: "Toshkent yangi uylarini qayerdan ko‘raman?", a: "Oson Uy katalogida Toshkent bo‘yicha filtrlang — narx, planirovka va shaxmatka bilan ЖК’lar chiqadi." },
        { q: "Toshkentda bo‘lib to‘lash yoki ipoteka foydaliroqmi?", a: "Bo‘lib to‘lash ko‘pincha foizsiz, lekin qisqaroq; ipoteka uzoq muddat beradi. Shartlarni solishtiring." },
        { q: "Toshkent yangi uyiga investitsiya arziydi mi?", a: "Ha, narx topshirishga oshadi va poytaxtda ijara talabi barqaror." },
      ],
    },
    {
      name: "Tashkent",
      h1: "New builds in Tashkent",
      metaTitle: "New builds in Tashkent — buy from the developer | Oson Uy",
      metaDescription:
        "New builds in Tashkent from verified developers: instalments and mortgage, price per m², layouts. Buy an apartment in Tashkent on Oson Uy.",
      intro: [
        "Tashkent is the capital and Uzbekistan’s largest property market. It offers the widest choice of new builds, from compact apartments to business-class housing. Strong rental demand makes Tashkent attractive both for living and for investors.",
        "On Oson Uy you’ll find verified Tashkent complexes with open prices, layouts and a chessboard. Purchases are made directly from the developer — transparently and without middlemen.",
      ],
      why: [
        { title: "The widest choice", text: "The capital market offers the most projects and districts for any budget." },
        { title: "Strong rental demand", text: "Tashkent is a business hub, so a purchased apartment rents out easily." },
        { title: "Instalments and mortgage", text: "Both developer instalments and bank mortgages are available." },
        { title: "Verified developers", text: "Verification and real data reduce the risks of buying on the primary market." },
      ],
      faq: [
        { q: "Where can I see new builds in Tashkent?", a: "Filter the Oson Uy catalogue by Tashkent to see verified complexes with prices, layouts and a chessboard." },
        { q: "Instalments or mortgage in Tashkent — which is better?", a: "Developer instalments are often interest-free but shorter; a mortgage gives a longer term with bank interest. Compare terms on the project cards." },
        { q: "Is investing in a Tashkent new build worthwhile?", a: "Yes, thanks to price growth by completion and steady rental demand in the capital." },
      ],
    },
  ),
  city(
    "bukhara",
    "bukhara",
    {
      name: "Бухара",
      h1: "Новостройки Бухары",
      metaTitle: "Новостройки Бухары — купить квартиру от застройщика | Oson Uy",
      metaDescription:
        "Новостройки Бухары от проверенных застройщиков: доступные цены, рассрочка, планировки и шахматка. Купить квартиру в Бухаре на Oson Uy.",
      intro: [
        "Бухара — древний город с богатой историей и растущим спросом на современное жильё. Новостройки Бухары сочетают доступную цену и комфорт, а рассрочка от застройщика делает покупку квартиры реальной для большего числа семей.",
        "На Oson Uy собраны проверенные жилые комплексы Бухары с открытыми ценами за м², планировками и шахматкой квартир. Покупка — напрямую у застройщика.",
      ],
      why: [
        { title: "Доступные цены", text: "Бухара предлагает комфортное жильё по цене ниже, чем в столице." },
        { title: "Рассрочка от застройщика", text: "Первый взнос и равные платежи без банка — удобно для семейного бюджета." },
        { title: "Проверенные проекты", text: "Верификация застройщика и реальные фото хода строительства." },
      ],
      faq: [
        { q: "Дорого ли жильё в новостройках Бухары?", a: "Цены в Бухаре обычно ниже столичных. Точную стоимость за м² смотрите на карточке каждого ЖК." },
        { q: "Есть ли рассрочка в Бухаре?", a: "Да, многие застройщики предлагают рассрочку напрямую. Используйте фильтр «в рассрочку»." },
      ],
    },
    {
      name: "Buxoro",
      h1: "Buxoro yangi uylari",
      metaTitle: "Buxoro yangi uylari — quruvchidan kvartira | Oson Uy",
      metaDescription:
        "Buxoro yangi uylari ishonchli quruvchilardan: arzon narx, bo‘lib to‘lash, planirovka. Oson Uy’da Buxoroda kvartira soting oling.",
      intro: [
        "Buxoro — boy tarixli qadimiy shahar, zamonaviy uyga talab ortmoqda. Buxoro yangi uylari arzon narx va qulaylikni birlashtiradi, bo‘lib to‘lash esa xaridni ko‘proq oilalar uchun mumkin qiladi.",
        "Oson Uy’da Buxoroning tekshirilgan majmualari ochiq m² narxi, planirovka va shaxmatka bilan. Xarid quruvchidan to‘g‘ridan-to‘g‘ri.",
      ],
      why: [
        { title: "Arzon narxlar", text: "Buxoro poytaxtdan arzonroq qulay uy taklif qiladi." },
        { title: "Bo‘lib to‘lash", text: "Banksiz boshlang‘ich va teng to‘lovlar." },
        { title: "Tekshirilgan loyihalar", text: "Verifikatsiya va qurilish suratlari." },
      ],
      faq: [
        { q: "Buxoro yangi uylari qimmatmi?", a: "Buxoro narxlari odatda poytaxtdan past. Aniq m² narxini kartochkada ko‘ring." },
        { q: "Buxoroda bo‘lib to‘lash bormi?", a: "Ha, ko‘p quruvchilar bo‘lib to‘lash taklif qiladi." },
      ],
    },
    {
      name: "Bukhara",
      h1: "New builds in Bukhara",
      metaTitle: "New builds in Bukhara — buy from the developer | Oson Uy",
      metaDescription:
        "New builds in Bukhara from verified developers: affordable prices, instalments, layouts. Buy an apartment in Bukhara on Oson Uy.",
      intro: [
        "Bukhara is an ancient, historic city with growing demand for modern housing. Bukhara new builds combine affordable prices and comfort, and developer instalments make buying an apartment realistic for more families.",
        "Oson Uy gathers verified Bukhara complexes with open prices per m², layouts and a chessboard. Purchases are made directly from the developer.",
      ],
      why: [
        { title: "Affordable prices", text: "Bukhara offers comfortable housing at a lower price than the capital." },
        { title: "Developer instalments", text: "A down payment and equal payments without a bank — friendly to the family budget." },
        { title: "Verified projects", text: "Developer verification and real construction photos." },
      ],
      faq: [
        { q: "Is housing in Bukhara new builds expensive?", a: "Bukhara prices are usually lower than the capital. See the exact price per m² on each complex card." },
        { q: "Are instalments available in Bukhara?", a: "Yes, many developers offer instalments directly. Use the “instalment” filter." },
      ],
    },
  ),
];

export const CITY_SLUGS = CITIES.map((c) => c.slug);

export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug.toLowerCase());
}

export function getCityContent(c: City, locale: string): CityLocaleContent {
  return c[(locale as CityLocale)] ?? c.ru;
}

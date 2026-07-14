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
  city(
    "andijan",
    "andijan",
    {
      name: "Андижан",
      h1: "Новостройки Андижана",
      metaTitle: "Новостройки Андижана — купить квартиру от застройщика | Oson Uy",
      metaDescription:
        "Новостройки Андижана от проверенных застройщиков: рассрочка, цены за м², планировки и шахматка. Купить квартиру в Андижане на Oson Uy.",
      intro: [
        "Андижан — один из крупнейших городов Ферганской долины с растущим спросом на современное жильё. Новые жилые комплексы с развитой инфраструктурой района и рассрочкой от застройщика делают покупку квартиры доступной для большего числа семей.",
        "На Oson Uy собраны проверенные новостройки Андижана с открытыми ценами за квадратный метр, планировками и шахматкой квартир. Покупка идёт напрямую у застройщика — без посредников и скрытых комиссий.",
      ],
      why: [
        { title: "Растущий город", text: "Андижан — крупный экономический центр долины со стабильным спросом на жильё." },
        { title: "Рассрочка от застройщика", text: "Многие ЖК предлагают рассрочку без банка с удобным первым взносом." },
        { title: "Проверенные застройщики", text: "Верификация и реальные фото хода строительства снижают риски покупки." },
      ],
      faq: [
        { q: "Есть ли рассрочка в новостройках Андижана?", a: "Да, многие застройщики Андижана предлагают рассрочку напрямую. Используйте фильтр «в рассрочку» в каталоге." },
        { q: "Как купить квартиру в Андижане?", a: "Выберите ЖК в каталоге, изучите планировки и цены, свяжитесь с застройщиком напрямую со страницы проекта." },
      ],
    },
    {
      name: "Andijon",
      h1: "Andijon yangi uylari",
      metaTitle: "Andijon yangi uylari — quruvchidan kvartira | Oson Uy",
      metaDescription:
        "Andijon yangi uylari ishonchli quruvchilardan: bo‘lib to‘lash, m² narxi, planirovka. Oson Uy’da Andijonda kvartira soting oling.",
      intro: [
        "Andijon — Farg‘ona vodiysining yirik shaharlaridan biri, zamonaviy uyga talab ortmoqda. Rivojlangan infratuzilma va quruvchidan bo‘lib to‘lash xaridni ko‘proq oilalar uchun mumkin qiladi.",
        "Oson Uy’da Andijonning tekshirilgan yangi uylari ochiq m² narxi, planirovka va shaxmatka bilan. Xarid quruvchidan to‘g‘ridan-to‘g‘ri.",
      ],
      why: [
        { title: "O‘sib borayotgan shahar", text: "Andijon vodiyning yirik iqtisodiy markazi." },
        { title: "Bo‘lib to‘lash", text: "Ko‘p ЖК’lar banksiz bo‘lib to‘lash taklif qiladi." },
        { title: "Tekshirilgan quruvchilar", text: "Verifikatsiya va qurilish suratlari." },
      ],
      faq: [
        { q: "Andijonda bo‘lib to‘lash bormi?", a: "Ha, ko‘p quruvchilar bo‘lib to‘lash taklif qiladi." },
        { q: "Andijonda kvartirani qanday sotib olaman?", a: "Katalogdan ЖК tanlang va quruvchi bilan bevosita bog‘laning." },
      ],
    },
    {
      name: "Andijan",
      h1: "New builds in Andijan",
      metaTitle: "New builds in Andijan — buy from the developer | Oson Uy",
      metaDescription:
        "New builds in Andijan from verified developers: instalments, price per m², layouts. Buy an apartment in Andijan on Oson Uy.",
      intro: [
        "Andijan is one of the largest cities of the Fergana Valley with growing demand for modern housing. New complexes with developed district infrastructure and developer instalments make buying an apartment affordable for more families.",
        "Oson Uy gathers verified Andijan new builds with open prices per m², layouts and a chessboard. Purchases are made directly from the developer.",
      ],
      why: [
        { title: "A growing city", text: "Andijan is a major economic centre of the valley with steady housing demand." },
        { title: "Developer instalments", text: "Many complexes offer bank-free instalments with a convenient down payment." },
        { title: "Verified developers", text: "Verification and real construction photos reduce buying risks." },
      ],
      faq: [
        { q: "Are instalments available in Andijan new builds?", a: "Yes, many Andijan developers offer instalments directly. Use the “instalment” filter in the catalogue." },
        { q: "How do I buy an apartment in Andijan?", a: "Choose a complex in the catalogue, review layouts and prices, and contact the developer directly from the project page." },
      ],
    },
  ),
  city(
    "namangan",
    "namangan",
    {
      name: "Наманган",
      h1: "Новостройки Намангана",
      metaTitle: "Новостройки Намангана — купить квартиру от застройщика | Oson Uy",
      metaDescription:
        "Новостройки Намангана от проверенных застройщиков: доступные цены, рассрочка, планировки. Купить квартиру в Намангане на Oson Uy.",
      intro: [
        "Наманган — динамичный город Ферганской долины с новыми жилыми комплексами по доступным ценам. Удобные условия покупки и рассрочка от застройщика привлекают семьи, которые хотят современное жильё без переплат.",
        "На Oson Uy вы найдёте проверенные новостройки Намангана с открытыми ценами за м², планировками и шахматкой. Связь с застройщиком — напрямую.",
      ],
      why: [
        { title: "Доступные цены", text: "Наманган предлагает современное жильё по цене ниже столичной." },
        { title: "Рассрочка от застройщика", text: "Первый взнос и равные платежи без участия банка." },
        { title: "Проверенные проекты", text: "Верификация застройщиков и реальные данные по стройке." },
      ],
      faq: [
        { q: "Сколько стоят квартиры в Намангане?", a: "Цены в Намангане обычно доступнее столичных. Стоимость за м² указана на карточке каждого ЖК." },
        { q: "Есть ли рассрочка в Намангане?", a: "Да, многие застройщики предлагают рассрочку напрямую без банка." },
      ],
    },
    {
      name: "Namangan",
      h1: "Namangan yangi uylari",
      metaTitle: "Namangan yangi uylari — quruvchidan kvartira | Oson Uy",
      metaDescription:
        "Namangan yangi uylari ishonchli quruvchilardan: arzon narx, bo‘lib to‘lash, planirovka. Oson Uy’da Namanganda kvartira soting oling.",
      intro: [
        "Namangan — Farg‘ona vodiysining dinamik shahri, arzon narxdagi yangi majmualar bilan. Qulay shartlar va bo‘lib to‘lash oilalarni ortiqcha to‘lovsiz zamonaviy uyga jalb qiladi.",
        "Oson Uy’da Namanganning tekshirilgan yangi uylarini ochiq m² narxi, planirovka va shaxmatka bilan topasiz.",
      ],
      why: [
        { title: "Arzon narxlar", text: "Namangan zamonaviy uyni poytaxtdan arzon taklif qiladi." },
        { title: "Bo‘lib to‘lash", text: "Banksiz boshlang‘ich va teng to‘lovlar." },
        { title: "Tekshirilgan loyihalar", text: "Quruvchi verifikatsiyasi va qurilish ma’lumoti." },
      ],
      faq: [
        { q: "Namanganda kvartira qancha turadi?", a: "Namangan narxlari odatda poytaxtdan arzon. m² narxi kartochkada." },
        { q: "Namanganda bo‘lib to‘lash bormi?", a: "Ha, ko‘p quruvchilar banksiz bo‘lib to‘lash taklif qiladi." },
      ],
    },
    {
      name: "Namangan",
      h1: "New builds in Namangan",
      metaTitle: "New builds in Namangan — buy from the developer | Oson Uy",
      metaDescription:
        "New builds in Namangan from verified developers: affordable prices, instalments, layouts. Buy an apartment in Namangan on Oson Uy.",
      intro: [
        "Namangan is a dynamic city of the Fergana Valley with affordable new complexes. Convenient terms and developer instalments attract families who want modern housing without overpaying.",
        "On Oson Uy you’ll find verified Namangan new builds with open prices per m², layouts and a chessboard. Contact the developer directly.",
      ],
      why: [
        { title: "Affordable prices", text: "Namangan offers modern housing below capital prices." },
        { title: "Developer instalments", text: "A down payment and equal payments without a bank." },
        { title: "Verified projects", text: "Developer verification and real construction data." },
      ],
      faq: [
        { q: "How much do apartments in Namangan cost?", a: "Namangan prices are usually more affordable than the capital. The price per m² is on each complex card." },
        { q: "Are instalments available in Namangan?", a: "Yes, many developers offer instalments directly without a bank." },
      ],
    },
  ),
  city(
    "fergana",
    "fergana",
    {
      name: "Фергана",
      h1: "Новостройки Ферганы",
      metaTitle: "Новостройки Ферганы — купить квартиру от застройщика | Oson Uy",
      metaDescription:
        "Новостройки Ферганы от проверенных застройщиков: рассрочка, цены за м², планировки. Купить квартиру в Фергане на Oson Uy.",
      intro: [
        "Фергана — зелёный административный центр Ферганской долины с растущим рынком новостроек. Современные жилые комплексы, рассрочка и удобная инфраструктура делают Фергану привлекательной для покупки квартиры.",
        "На Oson Uy собраны проверенные новостройки Ферганы с открытыми ценами, планировками и шахматкой. Покупка — напрямую у застройщика.",
      ],
      why: [
        { title: "Центр долины", text: "Фергана — крупный административный и деловой центр региона." },
        { title: "Рассрочка от застройщика", text: "Удобный первый взнос и равные ежемесячные платежи." },
        { title: "Проверенные застройщики", text: "Верификация и реальные фото хода строительства." },
      ],
      faq: [
        { q: "Как выбрать новостройку в Фергане?", a: "Сравните ЖК по цене за м², планировкам и застройщику в каталоге Oson Uy, затем свяжитесь с застройщиком напрямую." },
        { q: "Есть ли рассрочка в Фергане?", a: "Да, многие застройщики предлагают рассрочку без банка. Используйте фильтр «в рассрочку»." },
      ],
    },
    {
      name: "Farg‘ona",
      h1: "Farg‘ona yangi uylari",
      metaTitle: "Farg‘ona yangi uylari — quruvchidan kvartira | Oson Uy",
      metaDescription:
        "Farg‘ona yangi uylari ishonchli quruvchilardan: bo‘lib to‘lash, m² narxi, planirovka. Oson Uy’da Farg‘onada kvartira soting oling.",
      intro: [
        "Farg‘ona — vodiyning yashil ma’muriy markazi, yangi uylar bozori o‘smoqda. Zamonaviy majmualar, bo‘lib to‘lash va qulay infratuzilma Farg‘onani jozibali qiladi.",
        "Oson Uy’da Farg‘onaning tekshirilgan yangi uylari ochiq narx, planirovka va shaxmatka bilan.",
      ],
      why: [
        { title: "Vodiy markazi", text: "Farg‘ona mintaqaning yirik ma’muriy markazi." },
        { title: "Bo‘lib to‘lash", text: "Qulay boshlang‘ich va teng to‘lovlar." },
        { title: "Tekshirilgan quruvchilar", text: "Verifikatsiya va qurilish suratlari." },
      ],
      faq: [
        { q: "Farg‘onada yangi uyni qanday tanlash mumkin?", a: "Katalogda ЖК’larni narx, planirovka va quruvchi bo‘yicha solishtiring, so‘ng bevosita bog‘laning." },
        { q: "Farg‘onada bo‘lib to‘lash bormi?", a: "Ha, ko‘p quruvchilar banksiz bo‘lib to‘lash taklif qiladi." },
      ],
    },
    {
      name: "Fergana",
      h1: "New builds in Fergana",
      metaTitle: "New builds in Fergana — buy from the developer | Oson Uy",
      metaDescription:
        "New builds in Fergana from verified developers: instalments, price per m², layouts. Buy an apartment in Fergana on Oson Uy.",
      intro: [
        "Fergana is the green administrative centre of the Fergana Valley with a growing new-build market. Modern complexes, instalments and convenient infrastructure make Fergana attractive for buying an apartment.",
        "Oson Uy gathers verified Fergana new builds with open prices, layouts and a chessboard. Purchases are made directly from the developer.",
      ],
      why: [
        { title: "Valley centre", text: "Fergana is a major administrative and business centre of the region." },
        { title: "Developer instalments", text: "A convenient down payment and equal monthly payments." },
        { title: "Verified developers", text: "Verification and real construction photos." },
      ],
      faq: [
        { q: "How do I choose a new build in Fergana?", a: "Compare complexes by price per m², layouts and developer in the Oson Uy catalogue, then contact the developer directly." },
        { q: "Are instalments available in Fergana?", a: "Yes, many developers offer bank-free instalments. Use the “instalment” filter." },
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

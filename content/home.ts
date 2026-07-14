/**
 * Long-form, SEO-oriented content for the home page, keyed by locale.
 * Kept out of the UI message JSON so it stays maintainable and reviewable.
 * Rendered server-side by components/home/HomeSeoContent.tsx so search engines
 * index the full copy. Written to be genuinely useful — not keyword filler.
 */
export type HomeLocale = "ru" | "uz" | "en";

export type Advantage = { title: string; text: string };
export type FinanceCard = { title: string; text: string; href: string; cta: string };
export type CityLink = { name: string; text: string; href: string };
export type Stat = { value: string; label: string };

export type HomeContent = {
  intro: { title: string; lead: string; paragraphs: string[] };
  advantages: { title: string; subtitle: string; items: Advantage[] };
  why: { title: string; subtitle: string; items: Advantage[] };
  finance: { title: string; subtitle: string; cards: FinanceCard[] };
  cities: { title: string; subtitle: string; items: CityLink[] };
  stats: { title: string; items: Stat[] };
  closing: {
    title: string;
    paragraphs: string[];
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
};

const ru: HomeContent = {
  intro: {
    title: "Oson Uy — маркетплейс новостроек Узбекистана",
    lead: "Мы помогаем купить квартиру в новостройке напрямую у проверенных застройщиков — без переплат посредникам, с прозрачными ценами, рассрочкой и полной информацией по каждому ЖК.",
    paragraphs: [
      "Oson Uy — это единая платформа, где собраны новостройки Самарканда, Ташкента, Бухары и других городов Узбекистана. Каждый жилой комплекс на площадке проходит проверку: мы подтверждаем застройщика, его документы и реальный ход строительства, чтобы вы принимали решение на основе фактов, а не рекламных обещаний.",
      "На сайте вы видите то, что действительно важно при покупке жилья: цену за квадратный метр, доступные планировки, этаж и статус каждой квартиры в шахматке, срок сдачи, условия рассрочки и контакты застройщика. Ничего не спрятано за «уточните у менеджера» — вся ключевая информация открыта сразу.",
      "Купить квартиру в Узбекистане должно быть так же просто, как заказать что-то в интернете. Поэтому мы объединили каталог проверенных ЖК, удобный поиск с фильтрами по цене, району и площади, интерактивную шахматку квартир и даже 3D-модели домов — всё, чтобы выбрать жильё осознанно и без стресса.",
    ],
  },
  advantages: {
    title: "Почему покупатели выбирают Oson Uy",
    subtitle: "Прозрачность, проверенные застройщики и реальные данные по каждому объекту.",
    items: [
      {
        title: "Только проверенные застройщики",
        text: "Каждый застройщик проходит верификацию: мы проверяем юридические документы, разрешения на строительство и репутацию. Ищите отметку «Проверенный» — это гарантия, что за проектом стоит реальная компания.",
      },
      {
        title: "Честные цены за м²",
        text: "Стоимость квадратного метра и итоговая цена квартиры видны сразу. Вы сравниваете ЖК по реальным цифрам и не тратите время на бесконечные звонки, чтобы узнать «цену по запросу».",
      },
      {
        title: "Шахматка квартир онлайн",
        text: "Видите весь дом поэтажно: какие квартиры свободны, забронированы или проданы, их площадь и цену. Выбираете конкретную квартиру, а не «однушку где-то на среднем этаже».",
      },
      {
        title: "Рассрочка от застройщика",
        text: "Многие ЖК предлагают рассрочку без банка и переплат. На карточке проекта сразу указано, есть ли рассрочка, на какой срок и с каким первым взносом.",
      },
      {
        title: "3D-модели и планировки",
        text: "Для части комплексов доступна интерактивная 3D-модель дома и подробные планировки квартир — можно рассмотреть жильё ещё до визита на объект.",
      },
      {
        title: "Реальный ход строительства",
        text: "Мы показываем этапы стройки и фотографии прогресса, чтобы вы понимали, на какой стадии находится дом и когда реально получите ключи.",
      },
    ],
  },
  why: {
    title: "Как Oson Uy защищает покупателя",
    subtitle: "Мы убираем главные риски покупки жилья на первичном рынке.",
    items: [
      {
        title: "Проверка застройщика",
        text: "До публикации проекта мы подтверждаем, что застройщик существует, имеет права на землю и разрешительную документацию. Это снижает риск столкнуться с недобросовестной компанией.",
      },
      {
        title: "Прямая связь без посредников",
        text: "Вы общаетесь напрямую с отделом продаж застройщика. Никаких скрытых комиссий риелторов — цена на сайте и есть цена покупки.",
      },
      {
        title: "Личный кабинет покупателя",
        text: "После покупки вы получаете доступ к личному кабинету: договор, график платежей, история оплат и остаток по рассрочке — всё под рукой, без бумажной волокиты.",
      },
      {
        title: "Отзывы реальных покупателей",
        text: "Рейтинги и отзывы помогают оценить застройщика и качество жилья глазами тех, кто уже купил квартиру в этом ЖК.",
      },
    ],
  },
  finance: {
    title: "Рассрочка, ипотека и инвестиции",
    subtitle: "Три понятных способа купить квартиру в новостройке Узбекистана.",
    cards: [
      {
        title: "Квартира в рассрочку",
        text: "Рассрочка от застройщика — самый популярный способ покупки жилья в новостройке. Обычно это первый взнос 20–50% и равные ежемесячные платежи на срок от 6 месяцев до нескольких лет, часто без процентов банка. На Oson Uy фильтр «в рассрочку» показывает только такие ЖК, а на карточке проекта видны условия и первоначальный взнос.",
        href: "/catalog?installment=true",
        cta: "Квартиры в рассрочку",
      },
      {
        title: "Ипотека на новостройку",
        text: "Если удобнее банковская ипотека, выбирайте квартиру, а условия кредита оформляйте в банке. Новостройка выгодна тем, что цена на старте строительства ниже, чем у готового жилья, а к сдаче дома стоимость обычно растёт. Мы показываем цену за м² и срок сдачи, чтобы вы оценили выгоду входа.",
        href: "/catalog",
        cta: "Смотреть новостройки",
      },
      {
        title: "Инвестиции в недвижимость",
        text: "Покупка квартиры на этапе котлована — понятный способ сохранить и приумножить деньги. Разница между ценой на старте и ценой готового жилья формирует доход инвестора, а аренда в растущих городах приносит стабильный поток. Ищите ликвидные районы Самарканда и Ташкента с хорошей инфраструктурой.",
        href: "/catalog",
        cta: "Подобрать объект",
      },
    ],
  },
  cities: {
    title: "Новостройки по городам Узбекистана",
    subtitle: "Выберите город и смотрите проверенные жилые комплексы рядом с вами.",
    items: [
      {
        name: "Новостройки Самарканда",
        text: "Растущий туристический и деловой центр: новые ЖК с современной архитектурой, рассрочкой и удобным расположением у исторического центра и новых районов.",
        href: "/catalog?location=Samarkand",
      },
      {
        name: "Новостройки Ташкента",
        text: "Столичный рынок с широким выбором комплексов — от компактных квартир до бизнес-класса. Высокий спрос на аренду делает Ташкент интересным и для инвесторов.",
        href: "/catalog?location=Tashkent",
      },
      {
        name: "Новостройки Бухары",
        text: "Спокойный город с богатой историей и растущим спросом на современное жильё. Новостройки Бухары сочетают доступную цену и комфорт.",
        href: "/catalog?location=Bukhara",
      },
      {
        name: "Новостройки Андижана",
        text: "Один из крупнейших городов Ферганской долины. Новые дома с рассрочкой и развитой инфраструктурой района.",
        href: "/catalog?location=Andijan",
      },
      {
        name: "Новостройки Намангана",
        text: "Динамичный город долины с новыми жилыми комплексами по доступным ценам и удобными условиями покупки.",
        href: "/catalog?location=Namangan",
      },
      {
        name: "Весь каталог Узбекистана",
        text: "Не нашли свой город? Откройте полный каталог новостроек Узбекистана и отфильтруйте по цене, площади и району.",
        href: "/catalog",
      },
    ],
  },
  stats: {
    title: "Oson Uy в цифрах",
    items: [
      { value: "100%", label: "проверенных застройщиков" },
      { value: "3", label: "языка: узбекский, русский, английский" },
      { value: "24/7", label: "доступ к каталогу и шахматке" },
      { value: "0", label: "комиссий посредникам" },
    ],
  },
  closing: {
    title: "Найдите свою квартиру в новостройке уже сегодня",
    paragraphs: [
      "Откройте каталог, задайте бюджет и район — и получите список проверенных новостроек с ценами, планировками и условиями рассрочки. Понравился проект? Свяжитесь с застройщиком напрямую прямо со страницы ЖК.",
      "Oson Uy делает покупку жилья в Узбекистане простой, честной и безопасной — как и должно быть.",
    ],
    primary: { label: "Открыть каталог новостроек", href: "/catalog" },
    secondary: { label: "О компании Oson Uy", href: "/about" },
  },
};

const uz: HomeContent = {
  intro: {
    title: "Oson Uy — O‘zbekiston yangi uylari bozori",
    lead: "Biz yangi binodan kvartirani ishonchli quruvchidan to‘g‘ridan-to‘g‘ri sotib olishga yordam beramiz — vositachiga ortiqcha to‘lovsiz, shaffof narxlar, bo‘lib to‘lash va har bir turar-joy majmuasi bo‘yicha to‘liq ma’lumot bilan.",
    paragraphs: [
      "Oson Uy — Samarqand, Toshkent, Buxoro va O‘zbekistonning boshqa shaharlaridagi yangi uylar to‘plangan yagona platforma. Har bir majmua tekshiruvdan o‘tadi: biz quruvchini, uning hujjatlarini va qurilishning haqiqiy borishini tasdiqlaymiz.",
      "Saytda uy sotib olishda muhim bo‘lgan narsalar ko‘rinadi: kvadrat metr narxi, planirovkalar, shaxmatkada har bir kvartira qavati va holati, topshirish muddati, bo‘lib to‘lash shartlari va quruvchi kontaktlari. Hech narsa yashirin emas.",
      "O‘zbekistonda kvartira sotib olish internet-do‘kondan buyurtma berishday oson bo‘lishi kerak. Shuning uchun biz ishonchli majmualar katalogi, narx/tuman/maydon bo‘yicha filtrli qidiruv, interaktiv shaxmatka va hatto 3D-modellarni birlashtirdik.",
    ],
  },
  advantages: {
    title: "Nega xaridorlar Oson Uy’ni tanlaydi",
    subtitle: "Shaffoflik, ishonchli quruvchilar va har bir obyekt bo‘yicha haqiqiy ma’lumot.",
    items: [
      { title: "Faqat tekshirilgan quruvchilar", text: "Har bir quruvchi verifikatsiyadan o‘tadi: hujjatlar, qurilish ruxsatlari va obro‘si tekshiriladi. «Tekshirilgan» belgisi — loyiha ortida haqiqiy kompaniya turganining kafolati." },
      { title: "Halol m² narxlari", text: "Kvadrat metr va kvartiraning umumiy narxi darhol ko‘rinadi. Siz ЖК’larni haqiqiy raqamlar bo‘yicha solishtirasiz." },
      { title: "Onlayn shaxmatka", text: "Uyni qavatma-qavat ko‘rasiz: qaysi kvartira bo‘sh, band yoki sotilgan, maydoni va narxi. Aniq kvartirani tanlaysiz." },
      { title: "Quruvchidan bo‘lib to‘lash", text: "Ko‘p majmualar banksiz bo‘lib to‘lash taklif qiladi. Loyiha kartochkasida muddat va boshlang‘ich to‘lov ko‘rsatilgan." },
      { title: "3D-model va planirovkalar", text: "Ba’zi majmualar uchun interaktiv 3D-model va batafsil planirovkalar mavjud — obyektga bormasdan ko‘rish mumkin." },
      { title: "Qurilishning haqiqiy borishi", text: "Biz qurilish bosqichlari va progress suratlarini ko‘rsatamiz, shunda kalitni qachon olishingizni tushunasiz." },
    ],
  },
  why: {
    title: "Oson Uy xaridorni qanday himoya qiladi",
    subtitle: "Birlamchi bozorda uy sotib olishning asosiy xavflarini olib tashlaymiz.",
    items: [
      { title: "Quruvchini tekshirish", text: "Loyiha e’lon qilinishidan oldin quruvchining mavjudligi, yerga huquqi va ruxsat hujjatlari tasdiqlanadi." },
      { title: "Vositachisiz to‘g‘ridan-to‘g‘ri aloqa", text: "Siz quruvchining sotuv bo‘limi bilan bevosita gaplashasiz. Yashirin komissiyalar yo‘q." },
      { title: "Xaridor shaxsiy kabineti", text: "Sotib olgach shartnoma, to‘lov grafigi, to‘lovlar tarixi va qoldiq — hammasi qo‘l ostida." },
      { title: "Haqiqiy xaridorlar sharhlari", text: "Reyting va sharhlar quruvchi va uy sifatini baholashga yordam beradi." },
    ],
  },
  finance: {
    title: "Bo‘lib to‘lash, ipoteka va investitsiya",
    subtitle: "Yangi binodan kvartira sotib olishning uchta tushunarli yo‘li.",
    cards: [
      { title: "Bo‘lib to‘lashga kvartira", text: "Quruvchidan bo‘lib to‘lash — eng ommabop usul. Odatda 20–50% boshlang‘ich to‘lov va teng oylik to‘lovlar, ko‘pincha bank foizsiz. «Bo‘lib to‘lash» filtri faqat shunday ЖК’larni ko‘rsatadi.", href: "/catalog?installment=true", cta: "Bo‘lib to‘lash kvartiralar" },
      { title: "Yangi binoga ipoteka", text: "Bank ipotekasi qulay bo‘lsa, kvartirani tanlang, kreditni bankda rasmiylashtiring. Qurilish boshida narx pastroq bo‘ladi.", href: "/catalog", cta: "Yangi uylarni ko‘rish" },
      { title: "Ko‘chmas mulkka investitsiya", text: "Qurilish boshida sotib olish — pulni saqlash va ko‘paytirishning tushunarli yo‘li. Samarqand va Toshkentning likvid tumanlarini tanlang.", href: "/catalog", cta: "Obyekt tanlash" },
    ],
  },
  cities: {
    title: "O‘zbekiston shaharlari bo‘yicha yangi uylar",
    subtitle: "Shaharni tanlang va yoningizdagi tekshirilgan majmualarni ko‘ring.",
    items: [
      { name: "Samarqand yangi uylari", text: "O‘sib borayotgan turistik va ishbilarmonlik markazi: zamonaviy ЖК’lar, bo‘lib to‘lash va qulay joylashuv.", href: "/catalog?location=Samarkand" },
      { name: "Toshkent yangi uylari", text: "Poytaxt bozori keng tanlov bilan — ixchamdan biznes-klassgacha. Ijaraga talab yuqori.", href: "/catalog?location=Tashkent" },
      { name: "Buxoro yangi uylari", text: "Boy tarixli osoyishta shahar, zamonaviy uyga talab ortmoqda. Arzon narx va qulaylik.", href: "/catalog?location=Bukhara" },
      { name: "Andijon yangi uylari", text: "Farg‘ona vodiysining yirik shahri. Bo‘lib to‘lashli yangi uylar va rivojlangan infratuzilma.", href: "/catalog?location=Andijan" },
      { name: "Namangan yangi uylari", text: "Vodiyning dinamik shahri, arzon narxdagi yangi majmualar.", href: "/catalog?location=Namangan" },
      { name: "Butun O‘zbekiston katalogi", text: "Shahringizni topmadingizmi? To‘liq katalogni oching va narx/maydon/tuman bo‘yicha filtrlang.", href: "/catalog" },
    ],
  },
  stats: {
    title: "Oson Uy raqamlarda",
    items: [
      { value: "100%", label: "tekshirilgan quruvchilar" },
      { value: "3", label: "til: o‘zbek, rus, ingliz" },
      { value: "24/7", label: "katalog va shaxmatkaga kirish" },
      { value: "0", label: "vositachi komissiyasi" },
    ],
  },
  closing: {
    title: "Yangi binodan o‘z kvartirangizni bugun toping",
    paragraphs: [
      "Katalogni oching, byudjet va tumanni belgilang — narx, planirovka va bo‘lib to‘lash shartlari bilan tekshirilgan yangi uylar ro‘yxatini oling.",
      "Oson Uy O‘zbekistonda uy sotib olishni oddiy, halol va xavfsiz qiladi.",
    ],
    primary: { label: "Yangi uylar katalogini ochish", href: "/catalog" },
    secondary: { label: "Oson Uy haqida", href: "/about" },
  },
};

const en: HomeContent = {
  intro: {
    title: "Oson Uy — Uzbekistan’s new-build property marketplace",
    lead: "We help you buy an apartment in a new development directly from verified developers — no middleman markups, transparent prices, instalment plans and full information on every complex.",
    paragraphs: [
      "Oson Uy is a single platform bringing together new residential complexes in Samarkand, Tashkent, Bukhara and other cities of Uzbekistan. Every project is checked: we verify the developer, their documents and the real construction progress.",
      "The site shows what actually matters when buying a home: the price per square metre, available layouts, the floor and status of every apartment in an interactive chessboard, the completion date, instalment terms and the developer’s contacts. Nothing is hidden.",
      "Buying an apartment in Uzbekistan should be as easy as ordering online. So we combined a catalogue of verified complexes, filtered search by price, district and area, an interactive apartment chessboard and even 3D models of the buildings.",
    ],
  },
  advantages: {
    title: "Why buyers choose Oson Uy",
    subtitle: "Transparency, verified developers and real data on every project.",
    items: [
      { title: "Verified developers only", text: "Every developer is verified: we check legal documents, construction permits and reputation. Look for the “Verified” badge — a guarantee of a real company behind the project." },
      { title: "Honest price per m²", text: "The price per square metre and the total apartment price are shown up front. You compare complexes by real numbers." },
      { title: "Online apartment chessboard", text: "See the whole building floor by floor: which apartments are free, reserved or sold, with area and price. Pick a specific unit." },
      { title: "Developer instalments", text: "Many complexes offer bank-free instalments. The project card shows the term and down payment." },
      { title: "3D models and layouts", text: "For selected complexes an interactive 3D model and detailed layouts are available — explore before visiting." },
      { title: "Real construction progress", text: "We show construction stages and progress photos so you know when you’ll actually get the keys." },
    ],
  },
  why: {
    title: "How Oson Uy protects the buyer",
    subtitle: "We remove the main risks of buying on the primary market.",
    items: [
      { title: "Developer verification", text: "Before a project goes live we confirm the developer exists and holds land rights and permits." },
      { title: "Direct contact, no middlemen", text: "You talk directly to the developer’s sales team. No hidden agent fees — the listed price is the price." },
      { title: "Buyer account", text: "After purchase you get an account: contract, payment schedule, payment history and instalment balance." },
      { title: "Real buyer reviews", text: "Ratings and reviews help you judge the developer and the quality of the housing." },
    ],
  },
  finance: {
    title: "Instalments, mortgage and investment",
    subtitle: "Three clear ways to buy a new-build apartment in Uzbekistan.",
    cards: [
      { title: "Apartment in instalments", text: "Developer instalments are the most popular way to buy. Typically a 20–50% down payment and equal monthly payments, often bank-interest-free. The “instalment” filter shows only such complexes.", href: "/catalog?installment=true", cta: "Instalment apartments" },
      { title: "Mortgage for new builds", text: "If a bank mortgage suits you better, choose the apartment and arrange the loan at the bank. Early-stage prices are lower than finished housing.", href: "/catalog", cta: "Browse new builds" },
      { title: "Real-estate investment", text: "Buying at the foundation stage is a clear way to protect and grow money. Choose liquid districts of Samarkand and Tashkent.", href: "/catalog", cta: "Find a property" },
    ],
  },
  cities: {
    title: "New builds by city in Uzbekistan",
    subtitle: "Pick a city and see verified complexes near you.",
    items: [
      { name: "New builds in Samarkand", text: "A growing tourist and business hub: modern complexes, instalments and convenient locations.", href: "/catalog?location=Samarkand" },
      { name: "New builds in Tashkent", text: "The capital market with a wide choice — from compact units to business class. Strong rental demand.", href: "/catalog?location=Tashkent" },
      { name: "New builds in Bukhara", text: "A calm, historic city with growing demand for modern housing. Affordable price and comfort.", href: "/catalog?location=Bukhara" },
      { name: "New builds in Andijan", text: "One of the largest cities of the Fergana Valley. New homes with instalments and developed infrastructure.", href: "/catalog?location=Andijan" },
      { name: "New builds in Namangan", text: "A dynamic valley city with affordable new complexes.", href: "/catalog?location=Namangan" },
      { name: "Full Uzbekistan catalogue", text: "Didn’t find your city? Open the full catalogue and filter by price, area and district.", href: "/catalog" },
    ],
  },
  stats: {
    title: "Oson Uy in numbers",
    items: [
      { value: "100%", label: "verified developers" },
      { value: "3", label: "languages: Uzbek, Russian, English" },
      { value: "24/7", label: "access to catalogue and chessboard" },
      { value: "0", label: "middleman fees" },
    ],
  },
  closing: {
    title: "Find your new-build apartment today",
    paragraphs: [
      "Open the catalogue, set your budget and district — and get a list of verified new builds with prices, layouts and instalment terms. Like a project? Contact the developer directly from the page.",
      "Oson Uy makes buying a home in Uzbekistan simple, honest and safe — as it should be.",
    ],
    primary: { label: "Open the new-builds catalogue", href: "/catalog" },
    secondary: { label: "About Oson Uy", href: "/about" },
  },
};

const CONTENT: Record<HomeLocale, HomeContent> = { ru, uz, en };

export function getHomeContent(locale: string): HomeContent {
  return CONTENT[(locale as HomeLocale)] ?? ru;
}

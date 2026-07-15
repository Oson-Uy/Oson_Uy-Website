/**
 * Blog content (ru/uz/en), stored as structured sections so it renders cleanly
 * and powers Article + FAQPage JSON-LD. Written as genuinely useful guides for
 * buyers of new-build housing in Uzbekistan — no filler.
 */
export type BlogLocale = "ru" | "uz" | "en";

export type Section = { h: string; p: string[] };
export type ArticleLocale = {
  title: string;
  excerpt: string;
  sections: Section[];
  faq?: { q: string; a: string }[];
};
export type Article = {
  slug: string;
  category: Record<BlogLocale, string>;
  datePublished: string;
  readingMinutes: number;
  ru: ArticleLocale;
  uz: ArticleLocale;
  en: ArticleLocale;
};

const rassrochka: Article = {
  slug: "kvartira-v-rassrochku",
  category: { ru: "Рассрочка", uz: "Bo‘lib to‘lash", en: "Instalments" },
  datePublished: "2026-07-14",
  readingMinutes: 8,
  ru: {
    title: "Как купить квартиру в рассрочку в Узбекистане: полное руководство",
    excerpt:
      "Разбираем рассрочку от застройщика: первый взнос, сроки, на что смотреть в договоре и чем она отличается от ипотеки. Пошаговый план покупки квартиры в новостройке.",
    sections: [
      {
        h: "Что такое рассрочка от застройщика",
        p: [
          "Рассрочка — это покупка квартиры в новостройке напрямую у застройщика с оплатой частями. Обычно вы вносите первоначальный взнос (чаще всего 20–50% стоимости), а оставшуюся сумму выплачиваете равными ежемесячными платежами в течение оговорённого срока — от нескольких месяцев до нескольких лет.",
          "Главное отличие от банковской ипотеки в том, что деньги вы платите не банку, а застройщику, и во многих проектах — без процентов. Это делает рассрочку одним из самых популярных способов купить жильё в Узбекистане, особенно на этапе строительства, когда цена за квадратный метр ниже.",
        ],
      },
      {
        h: "Первый взнос и график платежей",
        p: [
          "Размер первого взноса напрямую влияет на ежемесячный платёж: чем больше вы вносите сразу, тем меньше платите каждый месяц. На карточке каждого ЖК на Oson Uy указано, есть ли рассрочка, на какой срок и с каким первоначальным взносом — это удобно сравнивать между проектами.",
          "Обратите внимание на день ежемесячного платежа и на то, фиксирована ли сумма. В хорошем договоре график платежей прозрачен: указаны даты, суммы и итоговая стоимость, а также порядок действий при досрочном погашении.",
        ],
      },
      {
        h: "Рассрочка или ипотека: что выбрать",
        p: [
          "Рассрочка обычно выгоднее по итоговой переплате (часто её нет вовсе), но срок короче, а первый взнос выше. Ипотека даёт длинный срок и меньший ежемесячный платёж, но с банковскими процентами и более строгими требованиями к заёмщику.",
          "Если у вас есть накопления на существенный первый взнос и вы готовы закрыть покупку за 1–3 года — рассрочка чаще всего выгоднее. Если нужен длинный срок и небольшой платёж — сравните предложения по ипотеке. На Oson Uy фильтр «в рассрочку» показывает только те ЖК, где рассрочка доступна.",
        ],
      },
      {
        h: "На что смотреть перед покупкой",
        p: [
          "Проверьте застройщика: юридические документы, разрешение на строительство, репутацию и реальный ход стройки. На Oson Uy проверенные компании отмечены значком «Проверенный», а по проектам доступны фотографии прогресса строительства.",
          "Изучите конкретную квартиру в шахматке: этаж, площадь, планировку и цену. Уточните срок сдачи и что входит в стоимость (отделка, парковка). И только потом переходите к обсуждению условий рассрочки напрямую с отделом продаж застройщика — без посредников.",
        ],
      },
      {
        h: "Пошаговый план покупки",
        p: [
          "1. Определите бюджет и комфортный первый взнос. 2. Отфильтруйте новостройки по городу, цене и наличию рассрочки. 3. Сравните 2–3 подходящих ЖК по цене за м², сроку сдачи и репутации застройщика. 4. Выберите конкретную квартиру в шахматке. 5. Свяжитесь с застройщиком, уточните график платежей и оформите договор. 6. Отслеживайте оплаты и остаток в личном кабинете покупателя.",
        ],
      },
    ],
    faq: [
      { q: "Какой обычно первый взнос при рассрочке?", a: "Чаще всего 20–50% стоимости квартиры, но условия у каждого застройщика свои. Точный размер указан на карточке проекта." },
      { q: "Есть ли проценты при рассрочке от застройщика?", a: "Во многих проектах рассрочка беспроцентная, в отличие от банковской ипотеки. Всегда уточняйте итоговую сумму и график платежей в договоре." },
      { q: "Можно ли купить квартиру в рассрочку на этапе котлована?", a: "Да, и это часто выгоднее: на раннем этапе строительства цена за м² ниже, а к сдаче дома стоимость обычно растёт." },
    ],
  },
  uz: {
    title: "O‘zbekistonda kvartirani bo‘lib to‘lashga qanday sotib olish mumkin",
    excerpt:
      "Quruvchidan bo‘lib to‘lash: boshlang‘ich to‘lov, muddat, shartnomada nimaga e’tibor berish va ipotekadan farqi. Yangi uy sotib olishning bosqichma-bosqich rejasi.",
    sections: [
      { h: "Bo‘lib to‘lash nima", p: ["Bo‘lib to‘lash — kvartirani quruvchidan to‘g‘ridan-to‘g‘ri qism-qism to‘lab sotib olish. Odatda boshlang‘ich to‘lov (20–50%) va qolgan summa teng oylik to‘lovlar bilan. Ko‘pincha bank foizisiz.", "Bu O‘zbekistonda uy sotib olishning eng ommabop usullaridan biri, ayniqsa qurilish bosqichida m² narxi past bo‘lganda."] },
      { h: "Boshlang‘ich to‘lov va grafik", p: ["Boshlang‘ich to‘lov qancha katta bo‘lsa, oylik to‘lov shuncha kam. Oson Uy’da har bir ЖК kartochkasida bo‘lib to‘lash bor-yo‘qligi, muddat va boshlang‘ich to‘lov ko‘rsatilgan.", "Shartnomada to‘lov sanasi, summalar va yakuniy narx aniq bo‘lishi kerak."] },
      { h: "Bo‘lib to‘lash yoki ipoteka", p: ["Bo‘lib to‘lash ko‘pincha foizsiz, lekin muddat qisqa va boshlang‘ich yuqori. Ipoteka uzoq muddat beradi, lekin bank foizi bilan.", "Oson Uy’da «bo‘lib to‘lash» filtri faqat shunday ЖК’larni ko‘rsatadi."] },
      { h: "Sotib olishdan oldin nimaga qarash kerak", p: ["Quruvchini tekshiring: hujjatlar, ruxsat, obro‘ va qurilish borishi. «Tekshirilgan» belgisiga qarang.", "Shaxmatkada kvartirani ko‘ring: qavat, maydon, planirovka va narx. Muddatni aniqlang."] },
    ],
    faq: [
      { q: "Bo‘lib to‘lashda boshlang‘ich to‘lov qancha?", a: "Odatda 20–50%, lekin har bir quruvchida farq qiladi. Aniq miqdor loyiha kartochkasida." },
      { q: "Bo‘lib to‘lashda foiz bormi?", a: "Ko‘p loyihalarda foizsiz. Har doim shartnomadagi yakuniy summani tekshiring." },
    ],
  },
  en: {
    title: "How to buy an apartment in instalments in Uzbekistan: a complete guide",
    excerpt:
      "Developer instalments explained: down payment, terms, what to check in the contract and how it differs from a mortgage. A step-by-step plan to buy a new build.",
    sections: [
      { h: "What are developer instalments", p: ["Instalments mean buying a new-build apartment directly from the developer in parts: usually a down payment (20–50%) and equal monthly payments, often interest-free.", "It’s one of the most popular ways to buy a home in Uzbekistan, especially during construction when the price per m² is lower."] },
      { h: "Down payment and payment schedule", p: ["The larger the down payment, the smaller the monthly payment. Every complex card on Oson Uy shows whether instalments are available, the term and the down payment.", "A good contract has a transparent schedule: dates, amounts and the final price."] },
      { h: "Instalments or mortgage", p: ["Instalments usually have less or no overpayment but a shorter term and higher down payment. A mortgage gives a longer term with bank interest.", "On Oson Uy the “instalment” filter shows only complexes where instalments are available."] },
      { h: "What to check before buying", p: ["Verify the developer: documents, permits, reputation and real progress. Look for the “Verified” badge.", "Review the specific apartment in the chessboard: floor, area, layout and price. Confirm the completion date."] },
    ],
    faq: [
      { q: "What is the usual down payment for instalments?", a: "Most often 20–50% of the price, but terms vary by developer. The exact amount is on the project card." },
      { q: "Is there interest on developer instalments?", a: "In many projects instalments are interest-free. Always check the final amount and schedule in the contract." },
    ],
  },
};

const investicii: Article = {
  slug: "investicii-v-novostroyki-uzbekistan",
  category: { ru: "Инвестиции", uz: "Investitsiya", en: "Investment" },
  datePublished: "2026-07-14",
  readingMinutes: 7,
  ru: {
    title: "Инвестиции в новостройки Узбекистана: как заработать на недвижимости",
    excerpt:
      "Почему покупка квартиры на этапе строительства — понятный инструмент инвестиций. Рост цены к сдаче, арендный доход и как выбрать ликвидный объект в Самарканде и Ташкенте.",
    sections: [
      {
        h: "Почему новостройки интересны инвесторам",
        p: [
          "Недвижимость традиционно считается одним из самых понятных способов сохранить и приумножить деньги. Новостройка на раннем этапе строительства стоит дешевле готового жилья, а к моменту сдачи дома цена за квадратный метр, как правило, растёт. Эта разница и формирует основной доход инвестора.",
          "Дополнительно квартира в растущем городе приносит арендный доход. В деловых центрах вроде Ташкента и туристическом Самарканде спрос на аренду стабильно высокий, что делает вложение более предсказуемым.",
        ],
      },
      {
        h: "Два источника дохода: рост цены и аренда",
        p: [
          "Первый источник — прирост стоимости. Покупая на этапе котлована или ранних этажей, вы фиксируете низкую цену; по мере готовности дома и роста спроса стоимость увеличивается. Второй источник — арендная доходность: после сдачи квартиру можно сдавать помесячно.",
          "Оценивайте оба параметра вместе. Ликвидный район с хорошей инфраструктурой обычно даёт и стабильную аренду, и уверенный рост цены.",
        ],
      },
      {
        h: "Как выбрать ликвидный объект",
        p: [
          "Смотрите на расположение: близость к деловым районам, транспорту, школам и точкам притяжения. Оценивайте застройщика — надёжная компания с хорошей репутацией снижает риск задержек. На Oson Uy проверенные застройщики отмечены значком, а по проектам виден реальный ход строительства.",
          "Сравнивайте цену за квадратный метр с соседними проектами, изучайте планировки (компактные ликвидные квартиры проще сдавать и продавать) и уточняйте срок сдачи. Инструмент шахматки помогает выбрать конкретную квартиру с удачным этажом и видом.",
        ],
      },
      {
        h: "Риски и как их снижать",
        p: [
          "Основные риски первичного рынка — задержка сдачи и недобросовестный застройщик. Снизить их помогает выбор проверенной компании, изучение документов и наблюдение за реальным прогрессом стройки. Не гонитесь только за самой низкой ценой — оценивайте надёжность.",
          "Диверсифицируйте: не обязательно вкладывать всё в один объект. И всегда закладывайте горизонт вложения — недвижимость это средне- и долгосрочный инструмент.",
        ],
      },
    ],
    faq: [
      { q: "Выгодно ли инвестировать в новостройку на этапе котлована?", a: "Да, ранний вход обычно дешевле, а к сдаче дома цена растёт. Важно выбрать надёжного застройщика, чтобы избежать задержек." },
      { q: "Какие города Узбекистана лучше для инвестиций?", a: "Прежде всего Ташкент (деловой центр с высоким арендным спросом) и Самарканд (туристический и деловой рост). Выбирайте ликвидные районы." },
    ],
  },
  uz: {
    title: "O‘zbekiston yangi uylariga investitsiya: ko‘chmas mulkda qanday daromad olish mumkin",
    excerpt:
      "Qurilish bosqichida kvartira sotib olish — tushunarli investitsiya vositasi. Topshirishga narx o‘sishi, ijara daromadi va likvid obyektni tanlash.",
    sections: [
      { h: "Nega yangi uylar investorlarga qiziq", p: ["Qurilish boshida yangi uy tayyor uydan arzon, topshirishga m² narxi odatda oshadi — bu asosiy daromad. Yirik shaharlarda ijara daromadi ham bor.", "Toshkent va Samarqandda ijaraga talab barqaror yuqori."] },
      { h: "Ikki daromad manbai", p: ["Birinchisi — narx o‘sishi (erta bosqichda past narxni qayd etasiz). Ikkinchisi — ijara daromadi.", "Likvid tuman ikkalasini ham beradi."] },
      { h: "Likvid obyektni tanlash", p: ["Joylashuv, quruvchi obro‘si va m² narxini baholang. «Tekshirilgan» belgisiga qarang.", "Ixcham likvid kvartiralarni sotish va ijaraga berish osonroq."] },
      { h: "Xavflar", p: ["Asosiy xavf — topshirish kechikishi va ishonchsiz quruvchi. Tekshirilgan kompaniya va qurilish borishini kuzatish yordam beradi."] },
    ],
    faq: [
      { q: "Kotlovan bosqichida investitsiya foydalimi?", a: "Ha, erta kirish arzon, topshirishga narx oshadi. Ishonchli quruvchi tanlang." },
      { q: "Qaysi shaharlar investitsiya uchun yaxshi?", a: "Avvalo Toshkent va Samarqand. Likvid tumanlarni tanlang." },
    ],
  },
  en: {
    title: "Investing in Uzbekistan new builds: how to earn on real estate",
    excerpt:
      "Why buying at the construction stage is a clear investment tool. Price growth by completion, rental income and how to pick a liquid property in Samarkand and Tashkent.",
    sections: [
      { h: "Why new builds appeal to investors", p: ["A new build at an early stage is cheaper than finished housing, and the price per m² usually rises by completion — that difference is the main return. Apartments in growing cities also earn rental income.", "In Tashkent and Samarkand rental demand is steadily high."] },
      { h: "Two income sources", p: ["First, price appreciation (you lock in a low early-stage price). Second, rental yield after completion.", "A liquid district usually delivers both."] },
      { h: "Choosing a liquid property", p: ["Assess location, developer reputation and price per m². Look for the “Verified” badge.", "Compact, liquid apartments are easier to rent and sell."] },
      { h: "Risks and how to reduce them", p: ["The main risks are delivery delays and unreliable developers. Choosing a verified company and watching real progress helps. Don’t chase the lowest price alone — weigh reliability."] },
    ],
    faq: [
      { q: "Is investing at the foundation stage worthwhile?", a: "Yes, early entry is cheaper and prices rise by completion. Choose a reliable developer to avoid delays." },
      { q: "Which Uzbek cities are best for investment?", a: "Primarily Tashkent and Samarkand. Choose liquid districts." },
    ],
  },
};

const ipoteka: Article = {
  slug: "ipoteka-na-novostroyku-uzbekistan",
  category: { ru: "Ипотека", uz: "Ipoteka", en: "Mortgage" },
  datePublished: "2026-07-16",
  readingMinutes: 7,
  ru: {
    title: "Ипотека на новостройку в Узбекистане: как оформить и на что смотреть",
    excerpt:
      "Как работает ипотека на квартиру в новостройке: первоначальный взнос, ставка, срок и документы. Чем ипотека отличается от рассрочки и когда она выгоднее.",
    sections: [
      {
        h: "Как работает ипотека на новостройку",
        p: [
          "Ипотека — это целевой кредит банка на покупку жилья, где сама квартира выступает залогом. Вы вносите первоначальный взнос, а оставшуюся сумму банк перечисляет застройщику; далее вы возвращаете кредит банку ежемесячными платежами в течение срока — обычно от нескольких лет до 15–20 лет.",
          "Главное преимущество ипотеки — длинный срок и, как следствие, небольшой ежемесячный платёж. Это делает покупку доступной, даже если у вас нет всей суммы сразу. Плата за это — банковские проценты, которые формируют итоговую переплату.",
        ],
      },
      {
        h: "Первоначальный взнос, ставка и срок",
        p: [
          "Три параметра определяют вашу ипотеку. Первоначальный взнос — доля стоимости, которую вы платите сами (чем больше, тем меньше кредит и платёж). Ставка — процент банка. Срок — период возврата: чем он длиннее, тем ниже ежемесячный платёж, но выше общая переплата.",
          "Перед оформлением сравните предложения нескольких банков и обязательно посчитайте итоговую переплату за весь срок, а не только ежемесячный платёж. На Oson Uy вы сначала выбираете квартиру и видите её цену за м², а условия кредита оформляете в банке.",
        ],
      },
      {
        h: "Ипотека или рассрочка: что выгоднее",
        p: [
          "Рассрочка от застройщика часто беспроцентная, но срок короче, а первый взнос выше — она выгоднее по итоговой сумме, если вы готовы закрыть покупку быстро. Ипотека даёт длинный срок и маленький платёж, но с процентами банка.",
          "Правило простое: есть большой первый взнос и возможность платить крупными суммами 1–3 года — берите рассрочку; нужен долгий срок и небольшой платёж — сравнивайте ипотеку. На карточках ЖК на Oson Uy видно, доступна ли рассрочка.",
        ],
      },
      {
        h: "Документы и порядок оформления",
        p: [
          "Обычно банк запрашивает паспорт, подтверждение дохода и данные о приобретаемой квартире. Точный список зависит от банка и программы. Порядок такой: выбираете квартиру, получаете одобрение банка, подписываете договор с застройщиком и кредитный договор, вносите первый взнос — и оформляете сделку.",
          "Обязательно проверьте застройщика: надёжная компания с проверенным статусом и реальным ходом строительства снижает риски. На Oson Uy проверенные застройщики отмечены значком, а по проектам видны фото прогресса.",
        ],
      },
    ],
    faq: [
      { q: "Какой первоначальный взнос нужен для ипотеки на новостройку?", a: "Размер зависит от банка и программы. Чем больше взнос, тем меньше сумма кредита и ежемесячный платёж. Уточняйте актуальные условия в банке." },
      { q: "Что выгоднее — ипотека или рассрочка от застройщика?", a: "Рассрочка часто беспроцентная, но с коротким сроком; ипотека даёт длинный срок с банковскими процентами. Сравните итоговую переплату по обоим вариантам." },
      { q: "Можно ли оформить ипотеку на квартиру на этапе строительства?", a: "Да, многие банки кредитуют покупку в новостройке. Важно выбрать надёжного застройщика, чтобы избежать рисков задержки сдачи." },
    ],
  },
  uz: {
    title: "O‘zbekistonda yangi binoga ipoteka: qanday rasmiylashtirish va nimaga qarash",
    excerpt:
      "Yangi bino kvartirasiga ipoteka qanday ishlaydi: boshlang‘ich to‘lov, stavka, muddat va hujjatlar. Ipoteka bo‘lib to‘lashdan farqi va qachon foydaliroq.",
    sections: [
      { h: "Ipoteka qanday ishlaydi", p: ["Ipoteka — bank uy sotib olish uchun beradigan maqsadli kredit, kvartira garov bo‘ladi. Boshlang‘ich to‘lov to‘laysiz, qolganini bank quruvchiga o‘tkazadi, siz bankka oylik to‘laysiz — odatda bir necha yildan 15–20 yilgacha.", "Afzalligi — uzoq muddat va kichik oylik to‘lov. Evaziga bank foizi to‘lanadi."] },
      { h: "Boshlang‘ich to‘lov, stavka, muddat", p: ["Uch parametr ipotekani belgilaydi: boshlang‘ich to‘lov, bank stavkasi va muddat. Muddat uzoq bo‘lsa, oylik to‘lov kam, lekin umumiy to‘lov ko‘p.", "Rasmiylashtirishdan oldin bir necha bankni solishtiring va umumiy to‘lovni hisoblang."] },
      { h: "Ipoteka yoki bo‘lib to‘lash", p: ["Bo‘lib to‘lash ko‘pincha foizsiz, lekin qisqa; ipoteka uzoq muddat, lekin foiz bilan.", "Katta boshlang‘ich bo‘lsa — bo‘lib to‘lash; uzoq muddat kerak bo‘lsa — ipoteka."] },
      { h: "Hujjatlar va tartib", p: ["Odatda pasport, daromad tasdig‘i va kvartira ma’lumoti kerak. Tartib: kvartira tanlash → bank tasdig‘i → shartnomalar → boshlang‘ich to‘lov.", "Quruvchini tekshiring: «Tekshirilgan» belgisiga qarang."] },
    ],
    faq: [
      { q: "Ipoteka uchun boshlang‘ich to‘lov qancha?", a: "Bank va dasturga bog‘liq. Ko‘proq to‘lov — kamroq kredit. Bankdan aniqlang." },
      { q: "Ipoteka yoki bo‘lib to‘lash foydaliroqmi?", a: "Bo‘lib to‘lash ko‘pincha foizsiz lekin qisqa; ipoteka uzoq lekin foizli. Umumiy to‘lovni solishtiring." },
    ],
  },
  en: {
    title: "Mortgage for a new build in Uzbekistan: how to arrange it and what to check",
    excerpt:
      "How a mortgage on a new-build apartment works: down payment, rate, term and documents. How a mortgage differs from instalments and when it’s better.",
    sections: [
      { h: "How a new-build mortgage works", p: ["A mortgage is a bank loan to buy housing, with the apartment as collateral. You pay a down payment, the bank transfers the rest to the developer, and you repay the bank monthly — usually over several years up to 15–20.", "The main benefit is a long term and a small monthly payment. The cost is bank interest."] },
      { h: "Down payment, rate and term", p: ["Three parameters define your mortgage: down payment, bank rate and term. A longer term means a smaller monthly payment but higher total overpayment.", "Compare several banks and calculate the total overpayment, not just the monthly payment."] },
      { h: "Mortgage or instalments", p: ["Developer instalments are often interest-free but shorter; a mortgage gives a long term with bank interest.", "Big down payment → instalments; need a long term → compare mortgages."] },
      { h: "Documents and process", p: ["Usually a passport, proof of income and apartment details are required. Process: choose the apartment → bank approval → contracts → down payment.", "Verify the developer: look for the “Verified” badge and real progress photos."] },
    ],
    faq: [
      { q: "What down payment is needed for a new-build mortgage?", a: "It depends on the bank and program. A larger down payment means a smaller loan and payment. Check current terms with the bank." },
      { q: "Mortgage or developer instalments — which is better?", a: "Instalments are often interest-free but short; a mortgage gives a long term with bank interest. Compare the total overpayment of both." },
    ],
  },
};

export const ARTICLES: Article[] = [rassrochka, ipoteka, investicii];

export const ARTICLE_SLUGS = ARTICLES.map((a) => a.slug);

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function articleLocale(a: Article, locale: string): ArticleLocale {
  return a[(locale as BlogLocale)] ?? a.ru;
}

export function categoryLabel(a: Article, locale: string): string {
  return a.category[(locale as BlogLocale)] ?? a.category.ru;
}

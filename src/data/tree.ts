import type { KnowledgeNode, Localized } from "@/lib/types";

interface DatasetMeta {
  title: Localized;
  subtitle: Localized;
  description: Localized;
  /** ISO date, e.g. "2026-10" */
  edition: string;
  /** Citation / source line. */
  colophon: Localized;
}

export const DATASET_META: DatasetMeta = {
  title: { en: "The Tree of Knowledge", fa: "درخت دانش" },
  subtitle: {
    en: "An Atlas of Every Field and Sub-Discipline",
    fa: "اطلس همهٔ رشته‌ها و زیرشاخه‌ها",
  },
  description: {
    en: "This atlas maps the whole reach of human knowledge into ten top-level domains and two hundred sub-fields, from formal logic to folklore. It is built to be browsed, searched and expanded as a navigation surface rather than read straight through.",
    fa: "این اطلس گسترهٔ دانش بشری را در ده حوزهٔ اصلی و دویست زیرشاخه، از منطق ریاضی تا فولکلور، سامان می‌دهد. این ساختار برای خواندن پیاپی ساخته نشده، بلکه برای مرور، جست‌وجو و گسترش‌یافتن به‌عنوان یک سطح ناوبری طراحی شده است.",
  },
  edition: "2026-10",
  colophon: {
    en: "Seed taxonomy for the Danesh visualisation UI; to be replaced by an authored dataset.",
    fa: "رده‌بندی بذری برای رابط کاربری دیده‌سازی دانش؛ قرار است با داده‌ای تألیفی جایگزین شود.",
  },
};

export const KNOWLEDGE_TREE: KnowledgeNode[] = [
  {
    id: "formal-sciences",
    name: { en: "Formal Sciences", fa: "علوم رسمی" },
    short: { en: "Formal", fa: "رسمی" },
    summary: {
      en: "The deductive sciences that study formal systems, structure and proof independently of the physical world.",
      fa: "علومی که ساختار، نظام‌مندی و اثبات را مستقل از جهان مادی بررسی می‌کنند.",
    },
    description: {
      en: "Formal sciences build abstract systems whose objects obey stated rules, whether numbers, symbols or machines. Their strength is that a result, once proved, holds without appeal to observation, which is why they anchor so much applied work. The domain spans mathematics, logic, statistics, probability, systems theory and the theoretical core of computer science.",
      fa: "علوم رسمی نظام‌های انتزاعی‌ای می‌سازند که اشیای آن‌ها تابع قواعدی اعلام‌شده‌اند؛ از اعداد و نمادها تا ماشین‌ها. نقطهٔ قوت آن‌ها این است که نتیجهٔ اثبات‌شده بدون توسل به مشاهده برقرار می‌ماند و به همین دلیل پایهٔ بسیاری از کاربردهای عملی‌اند. این حوزه ریاضیات، منطق، آمار، احتمال، نظریهٔ سیستم‌ها و هستهٔ نظری علوم رایانه را دربرمی‌گیرد.",
    },
    accent: "brass",
    tags: [
      { en: "logic", fa: "منطق" },
      { en: "proof", fa: "اثبات" },
      { en: "formal systems", fa: "نظام‌های صوری" },
      { en: "deduction", fa: "استنتاج" },
      { en: "structure", fa: "ساختار" },
    ],
    children: [
      {
        id: "formal-mathematics",
        name: { en: "Mathematics", fa: "ریاضیات" },
        short: { en: "Mathematics", fa: "ریاضیات" },
        summary: {
          en: "The abstract study of quantity, structure, space and change, built on logic and proof.",
          fa: "بررسی انتزاعی کمیت، ساختار، فضا و تغییر بر پایهٔ منطق و اثبات.",
        },
        description: {
          en: "Mathematics advances from definitions and axioms to theorems by deductive argument alone. Its branches partition the same substance differently: algebra studies operations, geometry studies form, analysis studies limits and continuity.",
          fa: "ریاضیات از تعریف‌ها و اصل‌ها تنها با استدلال قیاسی به‌سوی قضیه‌ها پیش می‌رود. شاخه‌هایش یک محتوا را به شیوه‌های گوناگین بخش می‌کنند: جبر عملیات، هندسه شکل و تحلیل حد و پیوستگی را می‌کاود.",
        },
        tags: [
          { en: "number", fa: "عدد" },
          { en: "structure", fa: "ساختار" },
          { en: "proof", fa: "اثبات" },
          { en: "space", fa: "فضا" },
        ],
        children: [
          {
            id: "math-algebra",
            name: { en: "Algebra", fa: "جبر" },
            short: { en: "Algebra", fa: "جبر" },
            summary: {
              en: "The study of operations, algebraic structures and equations.",
              fa: "بررسی عملیات، ساختارهای جبری و معادلات.",
            },
            tags: [
              { en: "equations", fa: "معادلات" },
              { en: "operations", fa: "عملیات" },
              { en: "groups and rings", fa: "گروه و حلقه" },
            ],
          },
          {
            id: "math-geometry",
            name: { en: "Geometry", fa: "هندسه" },
            short: { en: "Geometry", fa: "هندسه" },
            summary: {
              en: "Shapes, space, distance and the relations among figures.",
              fa: "شکل‌ها، فضا، فاصله و روابط میان پیکره‌ها.",
            },
            tags: [
              { en: "space", fa: "فضا" },
              { en: "shape", fa: "شکل" },
              { en: "topology", fa: "توپولوژی" },
            ],
          },
          {
            id: "math-analysis",
            name: { en: "Analysis", fa: "ریاضیات تحلیلی" },
            short: { en: "Analysis", fa: "تحلیل" },
            summary: {
              en: "Limits, continuity, differentiation and integration of functions.",
              fa: "حد، پیوستگی، مشتق‌گیری و انتگرال‌گیری از توابع.",
            },
            tags: [
              { en: "limits", fa: "حد" },
              { en: "calculus", fa: "حساب دیفرانسیل و انتگرال" },
              { en: "functions", fa: "توابع" },
            ],
          },
          {
            id: "math-number-theory",
            name: { en: "Number Theory", fa: "نظریهٔ اعداد" },
            short: { en: "Number Theory", fa: "نظریهٔ اعداد" },
            summary: {
              en: "The arithmetic structure of integers, primes and Diophantine relations.",
              fa: "ساختار حسابی اعداد صحیح، اعداد اول و روابط دیوفانتایی.",
            },
            tags: [
              { en: "primes", fa: "اعداد اول" },
              { en: "integers", fa: "اعداد صحیح" },
              { en: "diophantine equations", fa: "معادلات دیوفانتایی" },
            ],
          },
        ],
      },
      {
        id: "formal-logic",
        name: { en: "Logic", fa: "منطق" },
        short: { en: "Logic", fa: "منطق" },
        summary: {
          en: "Rules of valid inference, formalised so that truth can be separated from consequence.",
          fa: "قواعد استدلال معتبر، صوری‌شده برای جدا کردن حقیقت از لازمه.",
        },
        description: {
          en: "Logic studies what follows from what, setting content aside. It is the shared grammar of every formal discipline and the instrument computer science uses to check whether a proof or a program is sound.",
          fa: "منطق می‌کاود که چه چیزی از چه چیزی لازم می‌آید و محتوا را کنار می‌گذارد. منطق دستور مشترک همهٔ رشته‌های رسمی و ابزاری است که علوم رایانه با آن درستیِ یک اثبات یا یک برنامه را می‌سنجد.",
        },
        tags: [
          { en: "inference", fa: "استدلال" },
          { en: "validity", fa: "معتبریت" },
          { en: "argument", fa: "دلیل" },
          { en: "formalisation", fa: "صوری‌سازی" },
        ],
        children: [
          {
            id: "logic-formal",
            name: { en: "Formal Logic", fa: "منطق صوری" },
            short: { en: "Formal Logic", fa: "منطق صوری" },
            summary: {
              en: "Deductive systems expressed in an exact syntax with an explicit semantics.",
              fa: "نظام‌های استنتاجی با نحو دقیق و معنای صریح.",
            },
            tags: [
              { en: "syntax", fa: "نحو" },
              { en: "semantics", fa: "معنا" },
              { en: "deduction", fa: "استنتاج" },
            ],
          },
          {
            id: "logic-proof-theory",
            name: { en: "Proof Theory", fa: "نظریهٔ اثبات" },
            short: { en: "Proof Theory", fa: "نظریهٔ اثبات" },
            summary: {
              en: "The formal structure of proofs and the systems that generate them.",
              fa: "ساختار صوریِ اثبات‌ها و نظام‌هایی که آن‌ها را تولید می‌کنند.",
            },
            tags: [
              { en: "proof", fa: "اثبات" },
              { en: "derivability", fa: "اشتقاق‌پذیری" },
              { en: "formal systems", fa: "نظام‌های صوری" },
            ],
          },
          {
            id: "logic-model-theory",
            name: { en: "Model Theory", fa: "نظریهٔ مدل" },
            short: { en: "Model Theory", fa: "نظریهٔ مدل" },
            summary: {
              en: "Reading formal languages through the mathematical structures that satisfy them.",
              fa: "تفسیر زبان‌های صوری از راه ساختارهای ریاضی‌ای که آن‌ها را ارضا می‌کنند.",
            },
            tags: [
              { en: "models", fa: "مدل‌ها" },
              { en: "semantics", fa: "معنا" },
              { en: "first-order logic", fa: "منطق مرتبهٔ یک" },
            ],
          },
        ],
      },
      {
        id: "formal-statistics",
        name: { en: "Statistics", fa: "آمار" },
        short: { en: "Statistics", fa: "آمار" },
        summary: {
          en: "Collecting, summarising and inferring from data under explicit assumptions about uncertainty.",
          fa: "گردآوری، خلاصه‌سازی و استنتاج از داده با فرض‌هایی آشکار دربارهٔ عدم‌قطعیت.",
        },
        description: {
          en: "Statistics turns messy observation into quantified statements whose reliability can be stated. It is the common language of every empirical field, from clinical trials to climate models.",
          fa: "آمار مشاهدهٔ آشفته را به گزاره‌های کمّی تبدیل می‌کند که می‌توان پایایی‌شان را سنجید. آمار زبان مشترک همهٔ حوزه‌های تجربی است، از کارآزمایی بالینی تا مدل‌های اقلیمی.",
        },
        tags: [
          { en: "data", fa: "داده" },
          { en: "inference", fa: "استنتاج" },
          { en: "uncertainty", fa: "عدم‌قطعیت" },
          { en: "estimation", fa: "برآورد" },
        ],
        children: [
          {
            id: "statistics-descriptive",
            name: { en: "Descriptive Statistics", fa: "آمار توصیفی" },
            short: { en: "Descriptive", fa: "توصیفی" },
            summary: {
              en: "Summarising a dataset by central tendency, spread and shape.",
              fa: "خلاصه‌سازی یک مجموعه‌داده با مرکز، پراکندگی و شکل توزیع.",
            },
            tags: [
              { en: "mean and variance", fa: "میانگین و واریانس" },
              { en: "distribution shape", fa: "شکل توزیع" },
              { en: "summary", fa: "خلاصه‌سازی" },
            ],
          },
          {
            id: "statistics-inferential",
            name: { en: "Inferential Statistics", fa: "آمار استنباطی" },
            short: { en: "Inference", fa: "استنباطی" },
            summary: {
              en: "Drawing conclusions about populations from samples, with error rates stated.",
              fa: "استنتاج دربارهٔ جامعه از روی نمونه، همراه با بیان نرخ خطا.",
            },
            tags: [
              { en: "sampling", fa: "نمونه‌گیری" },
              { en: "hypothesis testing", fa: "آزمون فرضیه" },
              { en: "confidence", fa: "اطمینان" },
            ],
          },
          {
            id: "statistics-regression",
            name: { en: "Regression Analysis", fa: "تحلیل رگرسیون" },
            short: { en: "Regression", fa: "رگرسیون" },
            summary: {
              en: "Modelling how a response depends on one or more explanatory variables.",
              fa: "مدل‌سازی وابستگی یک متغیر پاسخ به متغیرهای توضیح‌دهنده.",
            },
            tags: [
              { en: "model fitting", fa: "برازش مدل" },
              { en: "covariates", fa: "متغیرهای کمکی" },
              { en: "residuals", fa: "باقی‌مانده‌ها" },
            ],
          },
          {
            id: "statistics-bayesian",
            name: { en: "Bayesian Statistics", fa: "آمار بیزی" },
            short: { en: "Bayesian", fa: "بیزی" },
            summary: {
              en: "Updating belief in parameters by combining prior knowledge with observed data.",
              fa: "به‌روزرسانی باور دربارهٔ پارامترها با ترکیب دانش پیشین و دادهٔ مشاهده‌شده.",
            },
            tags: [
              { en: "priors", fa: "پیشین" },
              { en: "posteriors", fa: "پسین" },
              { en: "markov chain monte carlo", fa: "زنجیرهٔ مارکوف مونت کارلو" },
            ],
          },
        ],
      },
      {
        id: "formal-computer-science-theory",
        name: { en: "Computer Science Theory", fa: "نظریهٔ علوم رایانه" },
        short: { en: "CS Theory", fa: "نظریهٔ رایانه" },
        summary: {
          en: "The mathematical theory of computation, languages, algorithms and their limits.",
          fa: "نظریهٔ ریاضیِ محاسبه، زبان‌ها، الگوریتم‌ها و مرزهای آن‌ها.",
        },
        description: {
          en: "Computational theory abstracts computation away from any particular machine. It asks what can be computed at all, what can be computed quickly, and how language and machine are described precisely enough to reason about.",
          fa: "نظریهٔ محاسبه، محاسبه را از هر ماشین معینی انتزاع می‌کند. می‌پرسد اصلاً چه چیزی قابل‌محاسبه است، چه چیزی سریع محاسبه می‌شود و زبان و ماشین را چگونه باید دقیق توصیف کرد.",
        },
        tags: [
          { en: "computation", fa: "محاسبه" },
          { en: "algorithms", fa: "الگوریتم‌ها" },
          { en: "formal languages", fa: "زبان‌های صوری" },
          { en: "complexity", fa: "پیچیدگی" },
        ],
        children: [
          {
            id: "cs-theory-algorithms",
            name: { en: "Theory of Algorithms", fa: "نظریهٔ الگوریتم‌ها" },
            short: { en: "Algorithms", fa: "الگوریتم‌ها" },
            summary: {
              en: "Designing procedures and proving properties such as correctness and termination.",
              fa: "طراحی رویه‌ها و اثبات ویژگی‌هایی مانند درستی و پایان‌پذیری.",
            },
            tags: [
              { en: "correctness", fa: "درستی" },
              { en: "complexity", fa: "پیچیدگی" },
              { en: "design paradigms", fa: "الگوهای طراحی" },
            ],
          },
          {
            id: "cs-theory-computation",
            name: { en: "Theory of Computation", fa: "نظریهٔ محاسبه" },
            short: { en: "Computation", fa: "محاسبه" },
            summary: {
              en: "Automata, computability and the formal definition of a computational process.",
              fa: "ماشین‌های حالت، محاسبه‌پذیری و تعریف صوریِ فرایند محاسبه.",
            },
            tags: [
              { en: "automata", fa: "ماشین‌های حالت" },
              { en: "turing machines", fa: "ماشین‌های تورینگ" },
              { en: "computability", fa: "محاسبه‌پذیری" },
            ],
          },
          {
            id: "cs-theory-complexity",
            name: { en: "Computational Complexity", fa: "پیچیدگی محاسباتی" },
            short: { en: "Complexity", fa: "پیچیدگی" },
            summary: {
              en: "Classifying problems by the time and space any algorithm needs to solve them.",
              fa: "دسته‌بندی مسائل بر پایهٔ زمان و حافظه‌ای که هر الگوریتم برای حلشان لازم دارد.",
            },
            tags: [
              { en: "np-completeness", fa: "کامل‌بودن با ن‌پی" },
              { en: "hard problems", fa: "مسائل دشوار" },
              { en: "lower bounds", fa: "کران‌های پایین" },
            ],
          },
        ],
      },
      {
        id: "formal-systems-theory",
        name: { en: "Systems Theory", fa: "نظریهٔ سیستم‌ها" },
        short: { en: "Systems Theory", fa: "نظریهٔ سیستم‌ها" },
        summary: {
          en: "The study of interconnected parts as wholes, from feedback and stability to organisation.",
          fa: "بررسی اجزای به‌هم‌پیوسته به‌مثابهٔ یک کل، از بازخورد و پایداری تا سازمان‌یافتگی.",
        },
        description: {
          en: "Systems theory asks why the arrangement of parts produces behaviour that no part possesses alone. It supplies the vocabulary of feedback, stability and emergence that engineering, biology and management all share.",
          fa: "نظریهٔ سیستم‌ها می‌پرسد چرا آرایش اجزا رفتاری پدید می‌آورد که هیچ جزئی به‌تنهایی ندارد. واژگان بازخورد، پایداری و ظهور را در اختیار مهندسی، زیست‌شناسی و مدیریت می‌گذارد.",
        },
        tags: [
          { en: "feedback", fa: "بازخورد" },
          { en: "emergence", fa: "ظهور" },
          { en: "stability", fa: "پایداری" },
          { en: "whole and part", fa: "کل و جزء" },
        ],
        children: [
          {
            id: "systems-general",
            name: { en: "General Systems Theory", fa: "نظریهٔ عمومی سیستم‌ها" },
            short: { en: "General Systems", fa: "سیستم‌های عمومی" },
            summary: {
              en: "Seeking principles common to families of systems regardless of their material.",
              fa: "جست‌وجوی اصولی مشترک میان خانواده‌های سیستم، فارغ از جنس مادی‌شان.",
            },
            tags: [
              { en: "isomorphism", fa: "هم‌ساختاری" },
              { en: "boundary", fa: "مرز" },
              { en: "organising", fa: "سازمان‌دهی" },
            ],
          },
          {
            id: "systems-dynamical",
            name: { en: "Dynamical Systems", fa: "سیستم‌های دینامیکی" },
            short: { en: "Dynamical", fa: "دینامیکی" },
            summary: {
              en: "Evolution of states over time, including fixed points, cycles and chaos.",
              fa: "دگرگونی حالت‌ها در گذر زمان، شامل نقطه‌های ثابت، چرخه و آشوب.",
            },
            tags: [
              { en: "attractors", fa: "جاذب‌ها" },
              { en: "chaos", fa: "آشوب" },
              { en: "phase space", fa: "فضای فاز" },
            ],
          },
          {
            id: "systems-cybernetics",
            name: { en: "Cybernetics", fa: "سایبرنتیک" },
            short: { en: "Cybernetics", fa: "سایبرنتیک" },
            summary: {
              en: "Control and communication in organisms and machines through feedback loops.",
              fa: "کنترل و ارتباط در جانداران و ماشین‌ها از راه حلقه‌های بازخورد.",
            },
            tags: [
              { en: "negative feedback", fa: "بازخورد منفی" },
              { en: "homeostasis", fa: "خودتنظیمی" },
              { en: "communication", fa: "ارتباط" },
            ],
          },
        ],
      },
      {
        id: "formal-probability",
        name: { en: "Probability", fa: "احتمال" },
        short: { en: "Probability", fa: "احتمال" },
        summary: {
          en: "The mathematics of uncertainty, expressed through measure, random variables and expectation.",
          fa: "ریاضیات عدم‌قطعیت، بیان‌شده با اندازه، متغیر تصادفی و امید ریاضی.",
        },
        description: {
          en: "Probability began as a theory of games and grew into the axiomatic framework behind every quantitative science. It supplies the language of randomness, expectation and dependence that statistics and physics both rely on.",
          fa: "احتمال به‌صورت نظریه‌ای دربارهٔ بازی‌ها آغاز شد و به بنیان‌های محوری همهٔ علوم کمّی بدل شد. زبان تصادف، انتظار و وابستگی را در اختیار آمار و فیزیک می‌گذارد.",
        },
        tags: [
          { en: "randomness", fa: "تصادف" },
          { en: "measure", fa: "اندازه" },
          { en: "expectation", fa: "انتظار" },
          { en: "axiomatic", fa: "اصل‌بنیانی" },
        ],
        children: [
          {
            id: "probability-measure",
            name: { en: "Measure Theory", fa: "نظریهٔ اندازه" },
            short: { en: "Measure", fa: "اندازه" },
            summary: {
              en: "The rigorous foundation of probability, defining length, volume and countable additivity.",
              fa: "بنیان دقیق احتمال، با تعریف طول، حجم و جمع‌پذیری شمارشی.",
            },
            tags: [
              { en: "measure", fa: "اندازه" },
              { en: "sigma algebra", fa: "جبر سیگما" },
              { en: "integration", fa: "انتگرال" },
            ],
          },
          {
            id: "probability-stochastic",
            name: { en: "Stochastic Processes", fa: "فرایندهای تصادفی" },
            short: { en: "Stochastic", fa: "تصادفی" },
            summary: {
              en: "Random variables indexed by time, including random walks and Markov chains.",
              fa: "متغیرهای تصادفی وابسته به زمان، از جمله گشت تصادفی و زنجیرهٔ مارکوف.",
            },
            tags: [
              { en: "random walk", fa: "گشت تصادفی" },
              { en: "markov chain", fa: "زنجیرهٔ مارکوف" },
              { en: "stationarity", fa: "ایستایی" },
            ],
          },
          {
            id: "probability-information-theory",
            name: { en: "Information Theory", fa: "نظریهٔ اطلاعات" },
            short: { en: "Information", fa: "اطلاعات" },
            summary: {
              en: "Measuring information and the limits of compressing and transmitting it reliably.",
              fa: "سنجش اطلاعات و مرزهای فشرده‌سازی و انتقال قابل‌اتکای آن.",
            },
            tags: [
              { en: "entropy", fa: "آنتروپی" },
              { en: "coding", fa: "کدگذاری" },
              { en: "channel capacity", fa: "ظرفیت کانال" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "natural-sciences",
    name: { en: "Natural Sciences", fa: "علوم طبیعی" },
    short: { en: "Natural", fa: "طبیعی" },
    summary: {
      en: "The sciences that explain matter, energy, life and the physical behaviour of the universe.",
      fa: "علومی که ماده، انرژی، حیات و رفتار فیزیکی جهان را توضیح می‌دهند.",
    },
    description: {
      en: "Natural sciences seek explanations that hold wherever their laws apply, verified by observation and experiment. They range from the scale of particles to the structure of continents, united by the aim of describing nature quantitatively and predictably.",
      fa: "علوم طبیعی به دنبال تبیین‌هایی هستند که هرجا قوانین‌شان برقرار باشد اعتبار دارند و با مشاهده و آزمایش راستی‌آزمایی می‌شوند. این علوم از مقیاس ذرات تا ساختار قاره‌ها را دربرمی‌گیرند و هدف مشترکشان توصیف کمّی و پیش‌بینی‌پذیر طبیعت است.",
    },
    accent: "azure",
    tags: [
      { en: "matter", fa: "ماده" },
      { en: "energy", fa: "انرژی" },
      { en: "experiment", fa: "آزمایش" },
      { en: "laws of nature", fa: "قوانین طبیعت" },
      { en: "observation", fa: "مشاهده" },
    ],
    children: [
      {
        id: "physics",
        name: { en: "Physics", fa: "فیزیک" },
        short: { en: "Physics", fa: "فیزیک" },
        summary: {
          en: "The study of matter, motion, energy and the rules governing the physical universe.",
          fa: "بررسی ماده، حرکت، انرژی و قواعد حاکم بر جهان فیزیکی.",
        },
        description: {
          en: "Physics moves from mechanics and electromagnetism to quantum theory and relativity, each step extending rather than discarding what came before. Its instruments and symmetries let a handful of equations describe an enormous range of phenomena.",
          fa: "فیزیک از مکانیک و الکترومغناطیس به نظریهٔ کوانتومی و نسبیت پیش می‌رود و هر گام آنچه را پیش از خود بوده گسترش می‌دهد، نه کنار می‌گذارد. ابزارها و تقارن‌های آن اجازه می‌دهند چند معادله، گسترهٔ عظیمی از پدیده‌ها را توصیف کند.",
        },
        tags: [
          { en: "motion", fa: "حرکت" },
          { en: "quantum", fa: "کوانتوم" },
          { en: "fields", fa: "میدان‌ها" },
          { en: "energy", fa: "انرژی" },
        ],
        children: [
          {
            id: "physics-classical-mechanics",
            name: { en: "Classical Mechanics", fa: "مکانیک کلاسیک" },
            short: { en: "Mechanics", fa: "مکانیک" },
            summary: {
              en: "Motion of bodies under forces, from projectile arcs to planetary orbits.",
              fa: "حرکت اجسام تحت نیروها، از کمان پرتابه تا مدار سیاره‌ها.",
            },
            tags: [
              { en: "newtonian motion", fa: "حرکت نیوتنی" },
              { en: "orbits", fa: "مدار" },
              { en: "energy conservation", fa: "پایستگی انرژی" },
            ],
          },
          {
            id: "physics-quantum-mechanics",
            name: { en: "Quantum Mechanics", fa: "مکانیک کوانتومی" },
            short: { en: "Quantum", fa: "کوانتومی" },
            summary: {
              en: "Behaviour of matter at atomic scale, described with states, operators and probability amplitudes.",
              fa: "رفتار ماده در مقیاس اتمی، توصیف‌شده با حالت‌ها، عملگرها و دامنه‌های احتمال.",
            },
            tags: [
              { en: "wavefunction", fa: "تابع موج" },
              { en: "superposition", fa: "برهم‌نهی" },
              { en: "uncertainty", fa: "عدم‌قطعیت" },
            ],
          },
          {
            id: "physics-thermodynamics",
            name: { en: "Thermodynamics", fa: "ترمودینامیک" },
            short: { en: "Thermo", fa: "ترمودینامیک" },
            summary: {
              en: "Heat, work, temperature and the direction in which physical processes run.",
              fa: "گرما، کار، دما و جهتی که فرایندهای فیزیکی در آن پیش می‌روند.",
            },
            tags: [
              { en: "entropy", fa: "آنتروپی" },
              { en: "laws of thermodynamics", fa: "قوانین ترمودینامیک" },
              { en: "phase change", fa: "تغییر فاز" },
            ],
          },
          {
            id: "physics-relativity",
            name: { en: "Relativity", fa: "نظریهٔ نسبیت" },
            short: { en: "Relativity", fa: "نسبیت" },
            summary: {
              en: "Space, time and gravitation as they behave for observers in relative motion.",
              fa: "فضا، زمان و گرانش آن‌گونه که برای ناظران در حرکت نسبی رفتار می‌کنند.",
            },
            tags: [
              { en: "spacetime", fa: "فضازمان" },
              { en: "time dilation", fa: "اتساع زمان" },
              { en: "general relativity", fa: "نسبیت عام" },
            ],
          },
        ],
      },
      {
        id: "chemistry",
        name: { en: "Chemistry", fa: "شیمی" },
        short: { en: "Chemistry", fa: "شیمی" },
        summary: {
          en: "The science of substances, their composition, bonding and the reactions they undergo.",
          fa: "علم مواد، ترکیب، پیوند شیمیایی و واکنش‌هایی که این مواد انجام می‌دهند.",
        },
        description: {
          en: "Chemistry explains matter at the level of atoms and bonds, and everything it does is ultimately rearrangement of those. It sits between physics and biology, supplying both with a periodic table and a reaction vocabulary.",
          fa: "شیمی ماده را در سطح اتم‌ها و پیوندها توضیح می‌دهد و هر آنچه انجام می‌دهد در نهایت بازآرایی همان‌هاست. شیمی میان فیزیک و زیست‌شناسی قرار دارد و جدول تناوبی و واژگان واکنش را در اختیار هر دو می‌گذارد.",
        },
        tags: [
          { en: "atoms", fa: "اتم" },
          { en: "bonds", fa: "پیوند" },
          { en: "reaction", fa: "واکنش" },
          { en: "substances", fa: "مواد" },
        ],
        children: [
          {
            id: "chemistry-organic",
            name: { en: "Organic Chemistry", fa: "شیمی آلی" },
            short: { en: "Organic", fa: "آلی" },
            summary: {
              en: "Chemistry of carbon compounds, from hydrocarbons to synthetic drugs and polymers.",
              fa: "شیمی ترکیبات کربنی، از هیدروکربن‌ها تا داروها و پلیمرهای مصنوعی.",
            },
            tags: [
              { en: "carbon skeleton", fa: "اسکلت کربنی" },
              { en: "functional groups", fa: "گروه‌های عاملی" },
              { en: "synthesis", fa: "سنتز" },
            ],
          },
          {
            id: "chemistry-inorganic",
            name: { en: "Inorganic Chemistry", fa: "شیمی معدنی" },
            short: { en: "Inorganic", fa: "معدنی" },
            summary: {
              en: "Compounds of metals and non-metals, including coordination and industrial catalysis.",
              fa: "ترکیبات فلزات و نافلزات، از جمله شیمی هماهنگی و کاتالیز صنعتی.",
            },
            tags: [
              { en: "coordination complexes", fa: "کمپلکس‌های هماهنگی" },
              { en: "periodic table", fa: "جدول تناوبی" },
              { en: "catalysis", fa: "کاتالیز" },
            ],
          },
          {
            id: "chemistry-physical",
            name: { en: "Physical Chemistry", fa: "شیمی فیزیکی" },
            short: { en: "Physical", fa: "فیزیکی" },
            summary: {
              en: "Molecular structure, reaction rates and thermodynamics applied to chemical systems.",
              fa: "ساختار مولکولی، سرعت واکنش و ترمودینامیک در سامانه‌های شیمیایی.",
            },
            tags: [
              { en: "molecular structure", fa: "ساختار مولکولی" },
              { en: "kinetics", fa: "سینتیک" },
              { en: "equilibrium", fa: "تعادل" },
            ],
          },
          {
            id: "chemistry-analytical",
            name: { en: "Analytical Chemistry", fa: "شیمی تجزیه‌ای" },
            short: { en: "Analytical", fa: "تجزیه‌ای" },
            summary: {
              en: "Identifying and measuring the components of a sample and how much of each is present.",
              fa: "شناسایی و اندازه‌گیری اجزای یک نمونه و مقدار هر یک از آن‌ها.",
            },
            tags: [
              { en: "spectroscopy", fa: "طیف‌سنجی" },
              { en: "chromatography", fa: "کروماتوگرافی" },
              { en: "quantification", fa: "کمّی‌سازی" },
            ],
          },
        ],
      },
      {
        id: "biology",
        name: { en: "Biology", fa: "زیست‌شناسی" },
        short: { en: "Biology", fa: "زیست‌شناسی" },
        summary: {
          en: "The study of living systems, from molecules and cells to organisms and their evolution.",
          fa: "بررسی سامانه‌های زنده، از مولکول و سلول تا جانداران و تکاملشان.",
        },
        description: {
          en: "Biology is the study of organisation that reproduces, repairs and evolves. Its scale runs from DNA and ribosomes to biomes, and its central method has been comparative: differences between organisms reveal what each part actually does.",
          fa: "زیست‌شناسی بررسی سازمان‌یافتگی‌ای است که تکثیر می‌شود، ترمیم می‌کند و تکامل می‌یابد. مقیاس آن از دی‌ای‌ای‌ای و ریبوزوم تا زیست‌بوم‌ها امتداد می‌یابد و روش مرکزی‌اش تطبیقی است: تفاوت جانداران نشان می‌دهد هر جزء واقعاً چه می‌کند.",
        },
        tags: [
          { en: "living systems", fa: "سامانه‌های زنده" },
          { en: "cells", fa: "سلول" },
          { en: "genetics", fa: "ژنتیک" },
          { en: "evolution", fa: "تکامل" },
          { en: "organisms", fa: "جانداران" },
        ],
        children: [
          {
            id: "biology-cell",
            name: { en: "Cell Biology", fa: "زیست‌شناسی سلولی" },
            short: { en: "Cell", fa: "سلولی" },
            summary: {
              en: "Structure and function of cells, organelles, membranes and transport between compartments.",
              fa: "ساختار و کارکرد سلول، اندامک‌ها، غشاها و انتقال میان بخش‌ها.",
            },
            tags: [
              { en: "organelles", fa: "اندامک‌ها" },
              { en: "membranes", fa: "غشا" },
              { en: "cell signalling", fa: "پیام‌رسانی سلولی" },
            ],
          },
          {
            id: "biology-molecular",
            name: { en: "Molecular Biology", fa: "زیست‌شناسی مولکولی" },
            short: { en: "Molecular", fa: "مولکولی" },
            summary: {
              en: "How genetic information is stored, copied and expressed in proteins.",
              fa: "اینکه اطلاعات ژنتیکی چگونه ذخیره، رونوشت و در پروتئین‌ها بیان می‌شود.",
            },
            tags: [
              { en: "dna replication", fa: "همسان‌سازی دی‌ای‌ای‌ای" },
              { en: "transcription", fa: "رونویسی" },
              { en: "translation", fa: "ترجمه" },
            ],
          },
          {
            id: "biology-evolutionary",
            name: { en: "Evolutionary Biology", fa: "زیست‌شناسی تکاملی" },
            short: { en: "Evolution", fa: "تکاملی" },
            summary: {
              en: "How populations change over generations through selection, drift, mutation and speciation.",
              fa: "چگونه جمعیت‌ها در نسل‌ها با گزینش، رانش، جهش و گونه‌زایی دگرگون می‌شوند.",
            },
            tags: [
              { en: "natural selection", fa: "گزینش طبیعی" },
              { en: "speciation", fa: "گونه‌زایی" },
              { en: "phylogenetics", fa: "تبارژنیاژیکی" },
            ],
          },
          {
            id: "biology-microbiology",
            name: { en: "Microbiology", fa: "میکروبیولوژی" },
            short: { en: "Microbiology", fa: "میکروبیولوژی" },
            summary: {
              en: "Bacteria, archaea, fungi and protozoa, their physiology and their genetic exchange.",
              fa: "باکتری‌ها، آرکی‌ها، قارچ‌ها و تک‌یاختی‌ها، فیزیولوژی و مبادلهٔ ژنتیکی‌شان.",
            },
            tags: [
              { en: "bacteria", fa: "باکتری‌ها" },
              { en: "fungi", fa: "قارچ‌ها" },
              { en: "horizontal gene transfer", fa: "انتقال افقی ژن" },
            ],
          },
        ],
      },
      {
        id: "astronomy",
        name: { en: "Astronomy", fa: "نجوم" },
        short: { en: "Astronomy", fa: "نجوم" },
        summary: {
          en: "The study of celestial objects, their motion, composition and the place of the cosmos as a whole.",
          fa: "بررسی اجرام آسمانی، حرکت، ترکیب و جایگاه کیهان به‌عنوان یک کل.",
        },
        description: {
          en: "Astronomy is done from a single vantage point, so it leans on physics, instruments and modelling rather than experiment. Its questions range from the weather on a moon to the first light in the universe.",
          fa: "نجوم از یک نقطهٔ ایستا انجام می‌شود و بیش از هر چیز به فیزیک، ابزار و مدل‌سازی تکیه دارد تا آزمایش. پرسش‌هایش از هوای یک ماه تا نخستین نور در جهان گسترش می‌یابد.",
        },
        tags: [
          { en: "celestial objects", fa: "اجرام آسمانی" },
          { en: "telescopes", fa: "تلسکوپ‌ها" },
          { en: "cosmic scale", fa: "مقیاس کیهانی" },
          { en: "space", fa: "فضا" },
        ],
        children: [
          {
            id: "astronomy-observational",
            name: { en: "Observational Astronomy", fa: "نجوم رصدی" },
            short: { en: "Observational", fa: "رصدی" },
            summary: {
              en: "Collecting and measuring light from the sky to infer what objects are made of and how they evolve.",
              fa: "گردآوری و سنجش نور آسمان برای استنتاج جنس اجرام و تحولشان.",
            },
            tags: [
              { en: "photometry", fa: "نورسنجی" },
              { en: "spectroscopy", fa: "طیف‌سنجی" },
              { en: "survey", fa: "پیمایش" },
            ],
          },
          {
            id: "astronomy-astrophysics",
            name: { en: "Astrophysics", fa: "اخترفیزیک" },
            short: { en: "Astrophysics", fa: "اخترفیزیک" },
            summary: {
              en: "The physics of stars, black holes, galaxies and the radiation they emit.",
              fa: "فیزیک ستارگان، سیاهچاله‌ها، کهکشان‌ها و تابشی که از خود می‌تابانند.",
            },
            tags: [
              { en: "stellar evolution", fa: "تکامل ستارگان" },
              { en: "black holes", fa: "سیاهچاله‌ها" },
              { en: "accretion", fa: "انباشت" },
            ],
          },
          {
            id: "astronomy-cosmology",
            name: { en: "Cosmology", fa: "کیهان‌شناسی" },
            short: { en: "Cosmology", fa: "کیهان‌شناسی" },
            summary: {
              en: "The origin, expansion and large-scale structure of the universe.",
              fa: "پیدایش، گسترش و ساختار در مقیاس بزرگِ جهان.",
            },
            tags: [
              { en: "big bang", fa: "انفجار بزرگ" },
              { en: "dark matter", fa: "مادهٔ تاریک" },
              { en: "expansion", fa: "انبساط" },
            ],
          },
        ],
      },
      {
        id: "earth-science",
        name: { en: "Earth Science", fa: "علوم زمین" },
        short: { en: "Earth Science", fa: "علوم زمین" },
        summary: {
          en: "The study of the solid earth, its oceans and its history of change.",
          fa: "بررسی کرهٔ جامد زمین، اقیانوس‌ها و تاریخ دگرگونی‌های آن.",
        },
        description: {
          en: "Earth science reads a planet whose processes are slow, deep and only partly observable. It combines field geology with physics and chemistry to reconstruct hundreds of millions of years from the rock record.",
          fa: "علوم زمین سیاره‌ای را می‌خواند که فرایندهایش کند، ژرف و تنها تا حدی مشاهده‌پذیرند. این رشته زمین‌شناسی میدانی را با فیزیک و شیمی پیوند می‌دهد تا از روی سنگ‌ها صدها میلیون سال را بازسازی کند.",
        },
        tags: [
          { en: "earth", fa: "زمین" },
          { en: "rocks and minerals", fa: "سنگ و کانی" },
          { en: "tectonics", fa: "زمین‌ساخت" },
          { en: "deep time", fa: "زمان ژرف" },
        ],
        children: [
          {
            id: "earth-geology",
            name: { en: "Geology", fa: "زمین‌شناسی" },
            short: { en: "Geology", fa: "زمین‌شناسی" },
            summary: {
              en: "Rock formation, plate tectonics and the processes that shape the crust.",
              fa: "تشکیل سنگ‌ها، زمین‌ساخت صفحه‌ای و فرایندهایی که پوسته را شکل می‌دهند.",
            },
            tags: [
              { en: "plate tectonics", fa: "نظریهٔ زمین‌ساخت صفحه‌ای" },
              { en: "igneous rock", fa: "سنگ آتشفشانی" },
              { en: "stratigraphy", fa: "چینه‌شناسی" },
            ],
          },
          {
            id: "earth-geophysics",
            name: { en: "Geophysics", fa: "ژئوفیزیک" },
            short: { en: "Geophysics", fa: "ژئوفیزیک" },
            summary: {
              en: "Probing the earth with gravity, magnetism, seismic waves and heat flow.",
              fa: "کاوش درون زمین با گرانش، مغناطیس، امواج لرزه‌ای و جریان گرما.",
            },
            tags: [
              { en: "seismology", fa: "لرزه‌شناسی" },
              { en: "gravity survey", fa: "گرانش‌سنجی" },
              { en: "heat flow", fa: "جریان گرمایی" },
            ],
          },
          {
            id: "earth-hydrology",
            name: { en: "Hydrology", fa: "آب‌شناسی" },
            short: { en: "Hydrology", fa: "آب‌شناسی" },
            summary: {
              en: "The movement, storage and quality of water on and under the land surface.",
              fa: "حرکت، ذخیره و کیفیت آب روی سطح زمین و در زیر آن.",
            },
            tags: [
              { en: "watersheds", fa: "آبخیزها" },
              { en: "groundwater", fa: "آب زیرزمینی" },
              { en: "water quality", fa: "کیفیت آب" },
            ],
          },
        ],
      },
      {
        id: "atmospheric-science",
        name: { en: "Atmospheric Science", fa: "علوم جو" },
        short: { en: "Atmosphere", fa: "علوم جو" },
        summary: {
          en: "The physics, chemistry and climate of the layer of gas surrounding the earth.",
          fa: "فیزیک، شیمی و اقلیم لایهٔ گازی پیرامون زمین.",
        },
        description: {
          en: "Atmospheric science explains the weather of a single afternoon and the climate of a century. It is where fluid dynamics, thermodynamics and chemistry are all required at once to describe one column of air.",
          fa: "علوم جو هوای یک بعدازهر و اقلیم یک قرن را توضیح می‌دهد. در اینجا مکانیک سیالات، ترمودینامیک و شیمی همگی با هم لازم‌اند تا یک ستون هوا توصیف شود.",
        },
        tags: [
          { en: "weather", fa: "هوا" },
          { en: "climate", fa: "اقلیم" },
          { en: "air", fa: "هوا" },
          { en: "climate change", fa: "تغییر اقلیم" },
        ],
        children: [
          {
            id: "atmospheric-meteorology",
            name: { en: "Meteorology", fa: "هواشناسی" },
            short: { en: "Meteorology", fa: "هواشناسی" },
            summary: {
              en: "Short-term atmospheric conditions, forecasting from observations and models.",
              fa: "وضعیت کوتاه‌مدت جو و پیش‌بینی آن از روی مشاهدات و مدل‌ها.",
            },
            tags: [
              { en: "forecasting", fa: "پیش‌بینی" },
              { en: "precipitation", fa: "بارش" },
              { en: "radar", fa: "رادار" },
            ],
          },
          {
            id: "atmospheric-climatology",
            name: { en: "Climatology", fa: "اقلیم‌شناسی" },
            short: { en: "Climate", fa: "اقلیم‌شناسی" },
            summary: {
              en: "Long-run statistics of climate, including variability, trends and change.",
              fa: "آمار بلندمدت اقلیم، شامل نوسان، روند و تغییر.",
            },
            tags: [
              { en: "climate modelling", fa: "مدل‌سازی اقلیم" },
              { en: "variability", fa: "تغییرپذیری" },
              { en: "carbon cycle", fa: "چرخهٔ کربن" },
            ],
          },
          {
            id: "atmospheric-atmospheric-chemistry",
            name: { en: "Atmospheric Chemistry", fa: "شیمی جو" },
            short: { en: "Atmospheric Chemistry", fa: "شیمی جو" },
            summary: {
              en: "Chemical reactions, aerosols and pollutants that shape air quality and radiative balance.",
              fa: "واکنش‌های شیمیایی، آئروسل‌ها و آلاینده‌هایی که کیفیت هوا و تعادل تابشی را شکل می‌دهند.",
            },
            tags: [
              { en: "aerosols", fa: "آئروسل‌ها" },
              { en: "ozone", fa: "ازن" },
              { en: "air pollution", fa: "آلودگی هوا" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "life-sciences",
    name: { en: "Life Sciences & Medicine", fa: "علوم زندگی و پزشکی" },
    short: { en: "Life & Medicine", fa: "زندگی و پزشکی" },
    summary: {
      en: "The sciences of living organisms and of human health, from molecules to populations.",
      fa: "علوم جانداران زنده و سلامت انسان، از مولکول تا جمعیت.",
    },
    description: {
      en: "Life sciences study organisms and their environments, while medicine turns that knowledge into diagnosis and care. Together they span the bench, the clinic and the population, and they share a stubborn ethical core: consequences for human beings.",
      fa: "علوم زندگی جانداران و محیط‌شان را می‌کاود و پزشکی این دانش را به تشخیص و درمان بدل می‌کند. این دو با هم از آزمایشگاه تا درمانگاه و جمعیت را دربرمی‌گیرند و هستهٔ اخلاقی مشترکی دارند: پیامدها برای انسان.",
    },
    accent: "jade",
    tags: [
      { en: "organisms", fa: "جانداران" },
      { en: "health", fa: "سلامت" },
      { en: "disease", fa: "بیماری" },
      { en: "clinical care", fa: "مراقبت بالینی" },
      { en: "populations", fa: "جمعیت‌ها" },
    ],
    children: [
      {
        id: "medicine",
        name: { en: "Medicine", fa: "پزشکی" },
        short: { en: "Medicine", fa: "پزشکی" },
        summary: {
          en: "The science and practice of diagnosing, treating and preventing disease in humans.",
          fa: "علم و عمل تشخیص، درمان و پیشگیری از بیماری در انسان.",
        },
        description: {
          en: "Medicine organises knowledge of the body into decisions about individual patients. Its specialties divide by body system, by technique and by setting, and each carries its own culture as well as its own evidence base.",
          fa: "پزشکی دانش بدن را در قالب تصمیم دربارهٔ بیماران منفرد سامان می‌دهد. تخصص‌های آن بر پایهٔ سامانهٔ بدنی، روش کار و محیط بخش می‌شوند و هرکدام فرهنگ و شواهد خود را دارند.",
        },
        tags: [
          { en: "diagnosis", fa: "تشخیص" },
          { en: "treatment", fa: "درمان" },
          { en: "clinical practice", fa: "کار بالینی" },
          { en: "patient care", fa: "مراقبت بیمار" },
        ],
        children: [
          {
            id: "medicine-internal",
            name: { en: "Internal Medicine", fa: "پزشکی داخلی" },
            short: { en: "Internal", fa: "داخلی" },
            summary: {
              en: "Diagnosis and medical treatment of adult diseases of the organs.",
              fa: "تشخیص و درمان دارویی بیماری‌های اندام‌ها در بزرگسالان.",
            },
            tags: [
              { en: "diagnostics", fa: "تشخیص" },
              { en: "chronic disease", fa: "بیماری مزمن" },
              { en: "pharmacotherapy", fa: "دارودرمانی" },
            ],
          },
          {
            id: "medicine-surgery",
            name: { en: "Surgery", fa: "جراحی" },
            short: { en: "Surgery", fa: "جراحی" },
            summary: {
              en: "Operative treatment of disease, tissue repair and reconstruction.",
              fa: "درمان جراحیِ بیماری، ترمیم بافت و بازسازی.",
            },
            tags: [
              { en: "operative technique", fa: "تکنیک جراحی" },
              { en: "reconstruction", fa: "بازسازی" },
              { en: "trauma care", fa: "مراقبت تروما" },
            ],
          },
          {
            id: "medicine-pathology",
            name: { en: "Pathology", fa: "آسیب‌شناسی" },
            short: { en: "Pathology", fa: "آسیب‌شناسی" },
            summary: {
              en: "The structural and cellular basis of disease, examined in tissue and at autopsy.",
              fa: "بنیان ساختاری و سلولی بیماری، بررسی‌شده در بافت و کالبدشکافی.",
            },
            tags: [
              { en: "histology", fa: "بافت‌شناسی" },
              { en: "biopsy", fa: "نمونه‌برداری" },
              { en: "cellular damage", fa: "آسیب سلولی" },
            ],
          },
          {
            id: "medicine-imaging",
            name: { en: "Medical Imaging", fa: "تصویربرداری پزشکی" },
            short: { en: "Imaging", fa: "تصویربرداری" },
            summary: {
              en: "Seeing inside the body with radiography, ultrasound, MRI and nuclear techniques.",
              fa: "دیدن درون بدن با رادیوگرافی، فراصوت، ام‌آر‌آی و روش‌های هسته‌ای.",
            },
            tags: [
              { en: "radiology", fa: "رادیولوژی" },
              { en: "ultrasound", fa: "فراصوت" },
              { en: "magnetic resonance", fa: "رزونانس مغناطیسی" },
            ],
          },
        ],
      },
      {
        id: "genetics",
        name: { en: "Genetics", fa: "ژنتیک" },
        short: { en: "Genetics", fa: "ژنتیک" },
        summary: {
          en: "The study of genes, inheritance and variation in living organisms.",
          fa: "بررسی ژن‌ها، وراثت و تنوع در جانداران زنده.",
        },
        description: {
          en: "Genetics moved from counting chromosomes to reading whole genomes, and from describing patterns to explaining mechanisms. Its ideas now reach into medicine, agriculture, forensics and the study of evolution.",
          fa: "ژنتیک از شمارش کروموزوم‌ها به خواندن ژنوم کامل و از توصیف الگوها به تبیین سازوکارها رسید. ایده‌های آن اکنون در پزشکی، کشاورزی، جرم‌شناسی و مطالعهٔ تکامل رسوب کرده است.",
        },
        tags: [
          { en: "genes", fa: "ژن" },
          { en: "inheritance", fa: "وراثت" },
          { en: "variation", fa: "تنوع" },
          { en: "dna", fa: "دی‌ای‌ای‌ای" },
        ],
        children: [
          {
            id: "genetics-molecular",
            name: { en: "Molecular Genetics", fa: "ژنتیک مولکولی" },
            short: { en: "Molecular", fa: "مولکولی" },
            summary: {
              en: "How genes are structured, regulated and mutated at the level of DNA.",
              fa: "ساختار، تنظیم و جهش ژن‌ها در سطح دی‌ای‌ای‌ای.",
            },
            tags: [
              { en: "gene regulation", fa: "تنظیم ژن" },
              { en: "mutation", fa: "جهش" },
              { en: "sequencing", fa: "توالی‌یابی" },
            ],
          },
          {
            id: "genetics-genomics",
            name: { en: "Genomics", fa: "ژنومیک" },
            short: { en: "Genomics", fa: "ژنومیک" },
            summary: {
              en: "Whole-genome analysis and the comparison of genomes across species and individuals.",
              fa: "تحلیل ژنوم کامل و مقایسهٔ ژنوم‌ها میان گونه‌ها و افراد.",
            },
            tags: [
              { en: "whole genome", fa: "ژنوم کامل" },
              { en: "comparative genomics", fa: "ژنومیک مقایسه‌ای" },
              { en: "bioinformatics", fa: "زیست‌اطلاعات" },
            ],
          },
          {
            id: "genetics-population",
            name: { en: "Population Genetics", fa: "ژنتیک جمعیت" },
            short: { en: "Population", fa: "جمعیت" },
            summary: {
              en: "The distribution and change of allele frequencies within and between populations.",
              fa: "توزیع و تغییر بسامد آلل‌ها درون جمعیت‌ها و میان آن‌ها.",
            },
            tags: [
              { en: "allele frequency", fa: "بسامد آلل" },
              { en: "migration", fa: "مهاجرت ژنی" },
              { en: "genetic drift", fa: "رانش ژنتیکی" },
            ],
          },
          {
            id: "genetics-epigenetics",
            name: { en: "Epigenetics", fa: "اپی‌ژنتیک" },
            short: { en: "Epigenetics", fa: "اپی‌ژنتیک" },
            summary: {
              en: "Heritable changes in gene activity that do not alter the DNA sequence itself.",
              fa: "تغییرهای موروثی در فعالیت ژن که توالی دی‌ای‌ای‌ای را دگرگون نمی‌کنند.",
            },
            tags: [
              { en: "methylation", fa: "متیلاسیون" },
              { en: "chromatin", fa: "کروماتین" },
              { en: "imprinting", fa: "اثر انگشت ژنتیکی" },
            ],
          },
        ],
      },
      {
        id: "neuroscience",
        name: { en: "Neuroscience", fa: "عصب‌زیست‌شناسی" },
        short: { en: "Neuroscience", fa: "عصب‌زیست‌شناسی" },
        summary: {
          en: "The study of the nervous system and the brain, from ion channels to behaviour.",
          fa: "بررسی دستگاه عصبی و مغز، از کانال‌های یونی تا رفتار.",
        },
        description: {
          en: "Neuroscience spans scales that barely talk to one another: ion channels, circuits, regions, cognition. Its central puzzle is how physical and chemical processes give rise to subjective experience.",
          fa: "عصب‌زیست‌شناسی مقیاس‌هایی را دربرمی‌گیرد که به‌سختی با هم گفت‌وگو می‌کنند: کانال یونی، مدار، ناحیه، شناخت. معمای مرکزی‌اش این است که چگونه فرایندهای فیزیکی و شیمیایی به تجربهٔ ذهنی بدل می‌شوند.",
        },
        tags: [
          { en: "brain", fa: "مغز" },
          { en: "nervous system", fa: "دستگاه عصبی" },
          { en: "cognition", fa: "شناخت" },
          { en: "circuits", fa: "مدارها" },
        ],
        children: [
          {
            id: "neuroscience-cognitive",
            name: { en: "Cognitive Neuroscience", fa: "عصب‌زیست‌شناسی شناختی" },
            short: { en: "Cognitive", fa: "شناختی" },
            summary: {
              en: "Linking mental processes such as memory and attention to brain networks.",
              fa: "پیوند فرایندهای ذهنی مانند حافظه و توجه به شبکه‌های مغزی.",
            },
            tags: [
              { en: "memory", fa: "حافظه" },
              { en: "attention", fa: "توجه" },
              { en: "fmri", fa: "اف‌ام‌آر‌آی" },
            ],
          },
          {
            id: "neuroscience-cellular",
            name: { en: "Cellular Neuroscience", fa: "عصب‌زیست‌شناسی سلولی" },
            short: { en: "Cellular", fa: "سلولی" },
            summary: {
              en: "How neurons and glia signal, fire and form synapses.",
              fa: "شیوهٔ پیام‌رسانی، شلیک و تشکیل سیناپس در نورون‌ها و سلول‌های چسبنده.",
            },
            tags: [
              { en: "action potentials", fa: "پتانسیل عمل" },
              { en: "synapses", fa: "سیناپس" },
              { en: "glia", fa: "نوروگلیا" },
            ],
          },
          {
            id: "neuroscience-computational",
            name: { en: "Computational Neuroscience", fa: "عصب‌زیست‌شناسی محاسباتی" },
            short: { en: "Computational", fa: "محاسباتی" },
            summary: {
              en: "Mathematical and simulation models of neural systems and their dynamics.",
              fa: "مدل‌های ریاضی و شبیه‌سازیِ سامانه‌های عصبی و پویایی آن‌ها.",
            },
            tags: [
              { en: "modelling", fa: "مدل‌سازی" },
              { en: "simulation", fa: "شبیه‌سازی" },
              { en: "coding", fa: "کدگذاری" },
            ],
          },
        ],
      },
      {
        id: "ecology",
        name: { en: "Ecology", fa: "بوم‌شناسی" },
        short: { en: "Ecology", fa: "بوم‌شناسی" },
        summary: {
          en: "The study of interactions among organisms and between organisms and their environment.",
          fa: "بررسی تعامل میان جانداران و میان جانداران و محیط‌شان.",
        },
        description: {
          en: "Ecology is the study of distribution and abundance in place and time. It has moved from describing communities to modelling flows of energy and nutrients, and now underpins conservation policy worldwide.",
          fa: "بوم‌شناسی بررسی پراکنش و فراوانی در مکان و زمان است. از توصیف جوامع به مدل‌سازی جریان انرژی و مواد مغذی راه یافته و امروز پایهٔ سیاست‌های حفاظت از محیط زیست در سراسر جهان است.",
        },
        tags: [
          { en: "ecosystems", fa: "زیست‌بوم‌ها" },
          { en: "interactions", fa: "تعامل‌ها" },
          { en: "conservation", fa: "حفاظت" },
          { en: "biomes", fa: "زیست‌بوم‌های اقلیمی" },
        ],
        children: [
          {
            id: "ecology-population",
            name: { en: "Population Ecology", fa: "بوم‌شناسی جمعیت‌ها" },
            short: { en: "Population", fa: "جمعیت‌ها" },
            summary: {
              en: "How the size, growth and structure of populations change over time.",
              fa: "اینکه اندازه، رشد و ساختار جمعیت‌ها چگونه در گذر زمان دگرگون می‌شود.",
            },
            tags: [
              { en: "growth rate", fa: "نرخ رشد" },
              { en: "carrying capacity", fa: "ظرفیت تحمل" },
              { en: "life history", fa: "تاریخچهٔ زندگی" },
            ],
          },
          {
            id: "ecology-community",
            name: { en: "Community Ecology", fa: "بوم‌شناسی جوامع" },
            short: { en: "Community", fa: "جوامع" },
            summary: {
              en: "Species composition, competition, predation and the assembly of communities.",
              fa: "ترکیب گونه‌ای، رقابت، شکار و شکل‌گیری جوامع.",
            },
            tags: [
              { en: "competition", fa: "رقابت" },
              { en: "predation", fa: "شکار" },
              { en: "species richness", fa: "غنای گونه‌ای" },
            ],
          },
          {
            id: "ecology-ecosystems",
            name: { en: "Ecosystem Science", fa: "زیست‌بوم‌شناسی" },
            short: { en: "Ecosystems", fa: "زیست‌بوم‌ها" },
            summary: {
              en: "Flows of energy and nutrients through food webs, soils and the atmosphere.",
              fa: "جریان انرژی و مواد مغذی در شبکه‌های غذایی، خاک‌ها و جو.",
            },
            tags: [
              { en: "energy flow", fa: "جریان انرژی" },
              { en: "nutrient cycling", fa: "چرخهٔ مواد مغذی" },
              { en: "primary production", fa: "تولید اولیه" },
            ],
          },
          {
            id: "ecology-conservation",
            name: { en: "Conservation Biology", fa: "زیست‌شناسی حفاظت" },
            short: { en: "Conservation", fa: "حفاظت" },
            summary: {
              en: "Protecting species and habitats, with restoration and evidence-based targets.",
              fa: "حفاظت از گونه‌ها و زیستگاه‌ها، همراه با احیا و هدف‌های مبتنی بر شواهد.",
            },
            tags: [
              { en: "habitat protection", fa: "حفاظت زیستگاه" },
              { en: "restoration", fa: "احیا" },
              { en: "biodiversity", fa: "تنوع زیستی" },
            ],
          },
        ],
      },
      {
        id: "pharmacology",
        name: { en: "Pharmacology", fa: "داروشناسی" },
        short: { en: "Pharmacology", fa: "داروشناسی" },
        summary: {
          en: "The study of drugs: how they act on the body, how the body handles them and how they harm.",
          fa: "بررسی داروها: اثر آن‌ها بر بدن، سرنوشت‌شان در بدن و سودمندی یا سمیتشان.",
        },
        description: {
          en: "Pharmacology links chemistry to therapy by describing what a substance does to a living system. Its two halves — what the drug does to the body and what the body does to the drug — remain the backbone of rational prescribing.",
          fa: "داروشناسی با توصیف اینکه یک ماده بر سامانهٔ زنده چه می‌کند، شیمی را به درمان پیوند می‌دهد. دو نیمهٔ آن — دارو با بدن چه می‌کند و بدن با دارو چه می‌کند — ستون فقرات تجویز مبتنی بر شواهد است.",
        },
        tags: [
          { en: "drugs", fa: "داروها" },
          { en: "receptors", fa: "گیرنده‌ها" },
          { en: "dose", fa: "دوز" },
          { en: "therapy", fa: "درمان" },
        ],
        children: [
          {
            id: "pharmacology-pharmacokinetics",
            name: { en: "Pharmacokinetics", fa: "فارماکوکینتیک" },
            short: { en: "Pharmacokinetics", fa: "فارماکوکینتیک" },
            summary: {
              en: "Absorption, distribution, metabolism and excretion of a drug in the body.",
              fa: "جذب، توزیع، متابولیسم و دفع دارو در بدن.",
            },
            tags: [
              { en: "absorption", fa: "جذب" },
              { en: "half-life", fa: "نیمه‌عمر" },
              { en: "metabolism", fa: "متابولیسم" },
            ],
          },
          {
            id: "pharmacology-pharmacodynamics",
            name: { en: "Pharmacodynamics", fa: "فارماکودینامیک" },
            short: { en: "Pharmacodynamics", fa: "فارماکودینامیک" },
            summary: {
              en: "The mechanism of drug action and the relationship between dose and effect.",
              fa: "سازوکار اثر دارو و رابطهٔ دوز با اثر.",
            },
            tags: [
              { en: "mechanism", fa: "سازوکار" },
              { en: "dose response", fa: "پاسخ دوز" },
              { en: "receptor binding", fa: "اتصال به گیرنده" },
            ],
          },
          {
            id: "pharmacology-toxicology",
            name: { en: "Toxicology", fa: "سم‌شناسی" },
            short: { en: "Toxicology", fa: "سم‌شناسی" },
            summary: {
              en: "The harmful effects of substances and the dose thresholds at which they appear.",
              fa: "اثرات زیان‌بار مواد و آستانه‌های دوزی که در آن‌ها بروز می‌کنند.",
            },
            tags: [
              { en: "toxic dose", fa: "دوز سمی" },
              { en: "mechanisms of harm", fa: "سازوکار آسیب" },
              { en: "risk assessment", fa: "ارزیابی خطر" },
            ],
          },
        ],
      },
      {
        id: "public-health",
        name: { en: "Public Health", fa: "سلامت عمومی" },
        short: { en: "Public Health", fa: "سلامت عمومی" },
        summary: {
          en: "Protecting the health of communities through prevention, policy and surveillance.",
          fa: "حفاظت از سلامت جوامع از راه پیشگیری، سیاست‌گذاری و پایش.",
        },
        description: {
          en: "Public health works on populations rather than patients, using law, taxation, vaccination and communication as its tools. Its measure of success is disease that never happens.",
          fa: "سلامت عمومی به‌جای بیماران، با جمعیت‌ها کار می‌کند و از قانون، مالیات، واکسیناسیون و ارتباط‌گیری ابزارهای خود می‌سازد. معیار موفقیتش بیماری‌ای است که هرگز رخ نمی‌دهد.",
        },
        tags: [
          { en: "prevention", fa: "پیشگیری" },
          { en: "policy", fa: "سیاست‌گذاری" },
          { en: "surveillance", fa: "پایش" },
          { en: "vaccination", fa: "واکسیناسیون" },
        ],
        children: [
          {
            id: "public-health-epidemiology",
            name: { en: "Epidemiology", fa: "اپیدمیولوژی" },
            short: { en: "Epidemiology", fa: "اپیدمیولوژی" },
            summary: {
              en: "The distribution and determinants of disease in populations.",
              fa: "توزیع و عوامل تعیین‌کنندهٔ بیماری در جمعیت‌ها.",
            },
            tags: [
              { en: "incidence", fa: "بروز" },
              { en: "risk factors", fa: "عوامل خطر" },
              { en: "outbreak", fa: "شیوع" },
            ],
          },
          {
            id: "public-health-policy",
            name: { en: "Health Policy", fa: "سیاست سلامت" },
            short: { en: "Health Policy", fa: "سیاست سلامت" },
            summary: {
              en: "How systems, financing and regulation shape the distribution of care.",
              fa: "اینکه نظام‌ها، تأمین مالی و مقررات توزیع مراقبت را چگونه شکل می‌دهند.",
            },
            tags: [
              { en: "health systems", fa: "نظام سلامت" },
              { en: "financing", fa: "تأمین مالی" },
              { en: "regulation", fa: "تنظیم‌گری" },
            ],
          },
          {
            id: "public-health-preventive-medicine",
            name: { en: "Preventive Medicine", fa: "پزشکی پیشگیرانه" },
            short: { en: "Preventive", fa: "پیشگیرانه" },
            summary: {
              en: "Reducing disease risk before it appears through screening, advice and prophylaxis.",
              fa: "کاهش خطر بیماری پیش از بروز آن از راه غربالگری، مشاوره و پیشگیری دارویی.",
            },
            tags: [
              { en: "screening", fa: "غربالگری" },
              { en: "risk reduction", fa: "کاهش خطر" },
              { en: "immunisation", fa: "ایمن‌سازی" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "social-sciences",
    name: { en: "Social Sciences", fa: "علوم اجتماعی" },
    short: { en: "Social", fa: "اجتماعی" },
    summary: {
      en: "The sciences that study human society, behaviour, institutions and the making of meaning.",
      fa: "علومی که جامعهٔ انسانی، رفتار، نهادها و ساخت معنا را بررسی می‌کنند.",
    },
    description: {
      en: "Social sciences hold that human action is patterned and therefore explicable, but never as simple as a mechanism. Their shared method is comparison across cases, cultures and time, and their shared difficulty is that their subject can read their results.",
      fa: "علوم اجتماعی معتقدند که کنش انسان الگومند و بنابراین توضیح‌پذیر است، هرچند هرگز به سادگی یک سازوکار مکانیکی. روش مشترکشان مقایسه میان موارد، فرهنگ‌ها و دوره‌هاست و دشواری مشترکشان این است که موضوع پژوهش می‌تواند نتایج آن را بخواند.",
    },
    accent: "copper",
    tags: [
      { en: "society", fa: "جامعه" },
      { en: "behaviour", fa: "رفتار" },
      { en: "institutions", fa: "نهادها" },
      { en: "culture", fa: "فرهنگ" },
      { en: "social research", fa: "پژوهش اجتماعی" },
    ],
    children: [
      {
        id: "psychology",
        name: { en: "Psychology", fa: "روان‌شناسی" },
        short: { en: "Psychology", fa: "روان‌شناسی" },
        summary: {
          en: "The scientific study of mind and behaviour, both normal and disordered.",
          fa: "بررسی علمیِ ذهن و رفتار، در حالت عادی و در اختلال.",
        },
        description: {
          en: "Psychology became a science by admitting that it could measure what it previously only described. It now works at several levels at once — neural, cognitive, social and developmental — and depends on careful experimental design.",
          fa: "روان‌شناسی با این پذیرش که آنچه را پیش‌تر فقط توصیف می‌کرد می‌تواند اندازه بگیرد، به علم بدل شد. امروز هم‌زمان در چند سطح کار می‌کند — عصبی، شناختی، اجتماعی و تحولی — و به طراحی دقیق آزمایش وابسته است.",
        },
        tags: [
          { en: "mind", fa: "ذهن" },
          { en: "behaviour", fa: "رفتار" },
          { en: "cognition", fa: "شناخت" },
          { en: "experiment", fa: "آزمایش" },
        ],
        children: [
          {
            id: "psychology-cognitive",
            name: { en: "Cognitive Psychology", fa: "روان‌شناسی شناختی" },
            short: { en: "Cognitive", fa: "شناختی" },
            summary: {
              en: "How people perceive, remember, decide and solve problems.",
              fa: "اینکه انسان‌ها چگونه ادراک می‌کنند، به یاد می‌سپارند، تصمیم می‌گیرند و مسئله حل می‌کنند.",
            },
            tags: [
              { en: "memory", fa: "حافظه" },
              { en: "attention", fa: "توجه" },
              { en: "decision making", fa: "تصمیم‌گیری" },
            ],
          },
          {
            id: "psychology-developmental",
            name: { en: "Developmental Psychology", fa: "روان‌شناسی تحولی" },
            short: { en: "Developmental", fa: " تحولی" },
            summary: {
              en: "Changes in thinking, emotion and behaviour from infancy to old age.",
              fa: "دگرگونی اندیشه، هیجان و رفتار از شیرخواری تا سالمندی.",
            },
            tags: [
              { en: "childhood", fa: "کودکی" },
              { en: "attachment", fa: "دلبستگی" },
              { en: "ageing", fa: "سالمندی" },
            ],
          },
          {
            id: "psychology-social",
            name: { en: "Social Psychology", fa: "روان‌شناسی اجتماعی" },
            short: { en: "Social", fa: "اجتماعی" },
            summary: {
              en: "How the presence and expectation of others change individual thought and conduct.",
              fa: "اینکه حضور و انتظار دیگران چگونه اندیشه و رفتار فرد را دگرگون می‌کند.",
            },
            tags: [
              { en: "conformity", fa: "همنوایی" },
              { en: "group dynamics", fa: "پویایی گروه" },
              { en: "prejudice", fa: "سوءگرایی" },
            ],
          },
          {
            id: "psychology-psychometrics",
            name: { en: "Psychometrics", fa: "روان‌سنجی" },
            short: { en: "Psychometrics", fa: "روان‌سنجی" },
            summary: {
              en: "Building and validating the tests and scales that measure psychological traits.",
              fa: "ساخت و اعتبارسنجی آزمون‌ها و مقیاس‌هایی که صفات روان‌شناختی را می‌سنجند.",
            },
            tags: [
              { en: "item analysis", fa: "تحلیل سؤال" },
              { en: "reliability", fa: "پایایی" },
              { en: "standardisation", fa: "هنجاریابی" },
            ],
          },
        ],
      },
      {
        id: "sociology",
        name: { en: "Sociology", fa: "جامعه‌شناسی" },
        short: { en: "Sociology", fa: "جامعه‌شناسی" },
        summary: {
          en: "The study of society, social structure and the institutions that organise collective life.",
          fa: "بررسی جامعه، ساختار اجتماعی و نهادهایی که زندگی جمعی را سازمان می‌دهند.",
        },
        description: {
          en: "Sociology studies patterns that individuals do not intend but nevertheless produce. Its central scale is the institution, and its signature methods are survey, ethnography and historical comparison.",
          fa: "جامعه‌شناسی الگوهایی را می‌کاود که افراد قصدشان را ندارند اما تولید می‌کنند. مقیاس مرکزی‌اش نهاد است و روش‌های شاخصش پیمایش، قوم‌نگاری و مقایسهٔ تاریخی.",
        },
        tags: [
          { en: "society", fa: "جامعه" },
          { en: "structure", fa: "ساختار" },
          { en: "institutions", fa: "نهادها" },
          { en: "inequality", fa: "نابرابری" },
        ],
        children: [
          {
            id: "sociology-theory",
            name: { en: "Sociological Theory", fa: "نظریهٔ جامعه‌شناختی" },
            short: { en: "Theory", fa: "نظریه" },
            summary: {
              en: "Competing frameworks for explaining order, conflict and social change.",
              fa: "چارچوب‌های رقیب برای تبیین نظم، تعارض و تغییر اجتماعی.",
            },
            tags: [
              { en: "functionalism", fa: "کارکردگرایی" },
              { en: "conflict theory", fa: "نظریهٔ تعارض" },
              { en: "social action", fa: "کنش اجتماعی" },
            ],
          },
          {
            id: "sociology-demography",
            name: { en: "Demography", fa: "جمعیت‌شناسی" },
            short: { en: "Demography", fa: "جمعیت‌شناسی" },
            summary: {
              en: "The measurement and explanation of population size, composition and change.",
              fa: "اندازه‌گیری و تبیین اندازه، ترکیب و تغییر جمعیت.",
            },
            tags: [
              { en: "fertility", fa: "باروری" },
              { en: "migration", fa: "مهاجرت" },
              { en: "ageing populations", fa: "جمعیت سالمند" },
            ],
          },
          {
            id: "sociology-social-change",
            name: { en: "Social Change", fa: "تغییر اجتماعی" },
            short: { en: "Social Change", fa: "تغییر اجتماعی" },
            summary: {
              en: "How societies reorganise themselves through reform, revolution and technology.",
              fa: "اینکه جوامع از راه اصلاح، انقلاب و فناوری خود را بازسازمان می‌دهند.",
            },
            tags: [
              { en: "modernisation", fa: "مدرنیزاسیون" },
              { en: "social movements", fa: "جنبش‌های اجتماعی" },
              { en: "diffusion", fa: "انتشار" },
            ],
          },
        ],
      },
      {
        id: "anthropology",
        name: { en: "Anthropology", fa: "انسان‌شناسی" },
        short: { en: "Anthropology", fa: "انسان‌شناسی" },
        summary: {
          en: "The study of humankind as a biological and cultural species, across time and space.",
          fa: "بررسی نوع بشر به‌مثابه گونه‌ای زیستی و فرهنگی، در گذر زمان و مکان.",
        },
        description: {
          en: "Anthropology is defined by method as much as subject: participant observation and comparison across societies, whether those societies are faraway or a few streets across. Its subdivisions divide roughly along culture, biology and language.",
          fa: "انسان‌شناسی به‌اندازهٔ موضوع، با روش تعریف می‌شود: مشاهدهٔ مشارکتی و مقایسه میان جوامع، چه دور و چه تنها چند خیابان فاصله. زیرشاخه‌هایش تقریباً بر پایهٔ فرهنگ، زیست و زبان تقسیم می‌شوند.",
        },
        tags: [
          { en: "human variation", fa: "تنوع انسانی" },
          { en: "culture", fa: "فرهنگ" },
          { en: "fieldwork", fa: "کار میدانی" },
          { en: "kinship", fa: "خویشاوندی" },
        ],
        children: [
          {
            id: "anthropology-cultural",
            name: { en: "Cultural Anthropology", fa: "انسان‌شناسی فرهنگی" },
            short: { en: "Cultural", fa: "فرهنگی" },
            summary: {
              en: "Culture as a system of meaning, practised in kinship, ritual, exchange and dispute.",
              fa: "فرهنگ به‌مثابه نظامی از معنا، آنچه در خویشاوندی، آیین، مبادله و منازعه عمل می‌شود.",
            },
            tags: [
              { en: "kinship", fa: "خویشاوندی" },
              { en: "ritual", fa: "آیین" },
              { en: "symbolism", fa: "نمادپردازی" },
            ],
          },
          {
            id: "anthropology-biological",
            name: { en: "Biological Anthropology", fa: "انسان‌شناسی زیستی" },
            short: { en: "Biological", fa: "زیستی" },
            summary: {
              en: "Human evolution, adaptation and the biology of past populations.",
              fa: "تکامل انسان، سازگاری و زیست‌شناسی جمعیت‌های گذشته.",
            },
            tags: [
              { en: "human evolution", fa: "تکامل انسان" },
              { en: "adaptation", fa: "سازگاری" },
              { en: "palaeopathology", fa: "آسیب‌شناسی باستانی" },
            ],
          },
          {
            id: "anthropology-linguistic",
            name: { en: "Linguistic Anthropology", fa: "انسان‌شناسی زبانی" },
            short: { en: "Linguistic", fa: "زبانی" },
            summary: {
              en: "The relation between language, social life and the categories people build.",
              fa: "رابطهٔ زبان با زندگی اجتماعی و مقوله‌هایی که انسان‌ها می‌سازند.",
            },
            tags: [
              { en: "speech act", fa: "کنش گفتاری" },
              { en: "linguistic relativity", fa: "نسبیت زبانی" },
              { en: "dialect", fa: "گویش" },
            ],
          },
        ],
      },
      {
        id: "economics",
        name: { en: "Economics", fa: "اقتصاد" },
        short: { en: "Economics", fa: "اقتصاد" },
        summary: {
          en: "The study of allocation, incentives and exchange under conditions of scarcity.",
          fa: "بررسی تخصیص، مشوق‌ها و مبادله در شرایط کمیابی منابع.",
        },
        description: {
          en: "Economists model choice under constraint, which makes their subject formally tidy and socially consequential. It divides into the study of individual and firm decisions, of aggregate economies, and of money, risk and growth over time.",
          fa: "اقتصاددانان انتخاب در شرایط محدودیت را مدل می‌سازند؛ همین موضوع را رسمی و در عین حال پیامددار اجتماعی می‌کند. اقتصاد به مطالعهٔ تصمیم فرد و بنگاه، مطالعهٔ اقتصاد کلان، و مطالعهٔ پول، ریسک و رشد در گذر زمان تقسیم می‌شود.",
        },
        tags: [
          { en: "scarcity", fa: "کمیابی" },
          { en: "incentives", fa: "مشوق‌ها" },
          { en: "markets", fa: "بازارها" },
          { en: "policy", fa: "سیاست اقتصادی" },
        ],
        children: [
          {
            id: "economics-micro",
            name: { en: "Microeconomics", fa: "اقتصاد خرد" },
            short: { en: "Micro", fa: "خرد" },
            summary: {
              en: "Prices, markets and the choices of households and firms.",
              fa: "قیمت‌ها، بازارها و انتخاب‌های خانوارها و بنگاه‌ها.",
            },
            tags: [
              { en: "supply and demand", fa: "عرضه و تقاضا" },
              { en: "game theory", fa: "نظریهٔ بازی" },
              { en: "market failure", fa: "ناکارآمدی بازار" },
            ],
          },
          {
            id: "economics-macro",
            name: { en: "Macroeconomics", fa: "اقتصاد کلان" },
            short: { en: "Macro", fa: "کلان" },
            summary: {
              en: "Growth, employment, inflation and the stability of an economy as a whole.",
              fa: "رشد، اشتغال، تورم و ثبات یک اقتصاد به‌مثابه یک کل.",
            },
            tags: [
              { en: "gdp", fa: "تولید ناخالص داخلی" },
              { en: "inflation", fa: "تورم" },
              { en: "monetary policy", fa: "سیاست پولی" },
            ],
          },
          {
            id: "economics-finance",
            name: { en: "Finance", fa: "مالی" },
            short: { en: "Finance", fa: "مالی" },
            summary: {
              en: "The pricing, allocation and management of money and risk.",
              fa: "قیمت‌گذاری، تخصیص و مدیریت پول و ریسک.",
            },
            tags: [
              { en: "asset pricing", fa: "قیمت‌گذاری دارایی" },
              { en: "portfolio", fa: "سبد دارایی" },
              { en: "interest rates", fa: "نرخ بهره" },
            ],
          },
          {
            id: "economics-econometrics",
            name: { en: "Econometrics", fa: "اقتصادسنجی" },
            short: { en: "Econometrics", fa: "اقتصادسنجی" },
            summary: {
              en: "Statistical methods for estimating economic relationships from data.",
              fa: "روش‌های آماری برای برآورد روابط اقتصادی از روی داده.",
            },
            tags: [
              { en: "panel data", fa: "دادهٔ تابلویی" },
              { en: "causal inference", fa: "استنتاج علّی" },
              { en: "identification", fa: "شناسایی" },
            ],
          },
        ],
      },
      {
        id: "political-science",
        name: { en: "Political Science", fa: "علوم سیاسی" },
        short: { en: "Political Science", fa: "علوم سیاسی" },
        summary: {
          en: "The study of power, authority, government and the institutions that order collective life.",
          fa: "بررسی قدرت، اقتدار، دولت و نهادهایی که زندگی جمعی را نظم می‌دهند.",
        },
        description: {
          en: "Political science studies who decides what, and with what legitimacy. It ranges from normative questions about justice to empirical ones about elections, parties, bureaucracy and foreign policy.",
          fa: "علوم سیاسی می‌کاود چه کسی دربارهٔ چه چیزی و با چه مشروعیتی تصمیم می‌گیرد. دامنهٔ آن از پرسش‌های هنجاری دربارهٔ عدالت تا پرسش‌های تجربی دربارهٔ انتخابات، احزاب، بوروکراسی و سیاست خارجی گسترده است.",
        },
        tags: [
          { en: "power", fa: "قدرت" },
          { en: "government", fa: "دولت" },
          { en: "legitimacy", fa: "مشروعیت" },
          { en: "policy", fa: "سیاست‌گذاری" },
        ],
        children: [
          {
            id: "political-science-theory",
            name: { en: "Political Theory", fa: "نظریهٔ سیاسی" },
            short: { en: "Theory", fa: "نظریه" },
            summary: {
              en: "Ideas about justice, liberty, authority and the terms of legitimate rule.",
              fa: "اندیشه‌ها دربارهٔ عدالت، آزادی، اقتدار و شرایط حکومت مشروع.",
            },
            tags: [
              { en: "justice", fa: "عدالت" },
              { en: "liberty", fa: "آزادی" },
              { en: "sovereignty", fa: "حاکمیت" },
            ],
          },
          {
            id: "political-science-comparative",
            name: { en: "Comparative Politics", fa: "علوم سیاسی تطبیقی" },
            short: { en: "Comparative", fa: "تطبیقی" },
            summary: {
              en: "Comparing regimes, elections and institutions across countries and periods.",
              fa: "مقایسهٔ نظام‌ها، انتخابات و نهادها میان کشورها و دوره‌ها.",
            },
            tags: [
              { en: "regime type", fa: "نوع نظام سیاسی" },
              { en: "democratisation", fa: "دموکراتیزاسیون" },
              { en: "elections", fa: "انتخابات" },
            ],
          },
          {
            id: "political-science-international-relations",
            name: { en: "International Relations", fa: "روابط بین‌الملل" },
            short: { en: "IR", fa: "روابط بین‌الملل" },
            summary: {
              en: "Conflict, cooperation and power among states and other international actors.",
              fa: "تعارض، همکاری و قدرت میان دولت‌ها و دیگر کنشگران بین‌المللی.",
            },
            tags: [
              { en: "security studies", fa: "مطالعات امنیتی" },
              { en: "diplomacy", fa: "دیپلماسی" },
              { en: "international law", fa: "حقوق بین‌الملل" },
            ],
          },
          {
            id: "political-science-public-policy",
            name: { en: "Public Policy", fa: "سیاست‌گذاری عمومی" },
            short: { en: "Policy", fa: "سیاست‌گذاری" },
            summary: {
              en: "How problems get defined, options chosen, and programmes designed and evaluated.",
              fa: "اینکه مسائل چگونه تعریف، گزینه‌ها چگونه انتخاب و برنامه‌ها چگونه طراحی و ارزیابی می‌شوند.",
            },
            tags: [
              { en: "agenda setting", fa: "تعیین دستور کار" },
              { en: "programme evaluation", fa: "ارزیابی برنامه" },
              { en: "regulation", fa: "تنظیم‌گری" },
            ],
          },
        ],
      },
      {
        id: "linguistics",
        name: { en: "Linguistics", fa: "زبان‌شناسی" },
        short: { en: "Linguistics", fa: "زبان‌شناسی" },
        summary: {
          en: "The scientific study of language: sound, structure, meaning and its variation and history.",
          fa: "بررسی علمیِ زبان: آوا، ساختار، معنا و تنوع و تاریخ آن.",
        },
        description: {
          en: "Linguistics treats language as a system that can be described at several independent levels. Its formal core feeds computer science directly, since both are occupied with strings, rules and the limits of mechanical description.",
          fa: "زبان‌شناسی زبان را دستگاهی می‌داند که می‌توان آن را در چند سطح مستقل توصیف کرد. هستهٔ صوری‌اش مستقیماً به علوم رایانه خوراک می‌دهد، زیرا هر دو با رشته‌ها، قواعد و مرزهای توصیف ماشینی سروکار دارند.",
        },
        tags: [
          { en: "grammar", fa: "دستور زبان" },
          { en: "sound", fa: "آوا" },
          { en: "meaning", fa: "معنا" },
          { en: "language change", fa: "تغییر زبان" },
        ],
        children: [
          {
            id: "linguistics-phonetics",
            name: { en: "Phonetics and Phonology", fa: "آواشناسی و واج‌شناسی" },
            short: { en: "Phonetics", fa: "آواشناسی" },
            summary: {
              en: "Speech sounds as produced and heard, and how they form meaningful contrast.",
              fa: "آواهای گفتار از دید تولید و شنوایی، و اینکه چگونه تقابل معنادار می‌سازند.",
            },
            tags: [
              { en: "articulatory phonetics", fa: "آواشناسی مفصلی" },
              { en: "phoneme", fa: "واج" },
              { en: "prosody", fa: "آهنگ گفتار" },
            ],
          },
          {
            id: "linguistics-syntax",
            name: { en: "Syntax", fa: "نحو" },
            short: { en: "Syntax", fa: "نحو" },
            summary: {
              en: "The rules that build well-formed sentences out of words.",
              fa: "قواعدی که از واژه‌ها جملهٔ دستوری می‌سازند.",
            },
            tags: [
              { en: "phrase structure", fa: "ساختار گروهی" },
              { en: "dependency", fa: "وابستگی" },
              { en: "grammatical relations", fa: "نوابط دستوری" },
            ],
          },
          {
            id: "linguistics-semantics",
            name: { en: "Semantics", fa: "معناشناسی" },
            short: { en: "Semantics", fa: "معناشناسی" },
            summary: {
              en: "What utterances mean, how meaning composes, and how it is grounded in the world.",
              fa: "معنای پیام‌ها، چگونگی ترکیب معنا و پیوند آن با جهان واقعی.",
            },
            tags: [
              { en: "compositionality", fa: "ترکیب‌پذیری معنا" },
              { en: "reference", fa: "ارجاع" },
              { en: "pragmatics", fa: "معناشناسی کاربردی" },
            ],
          },
          {
            id: "linguistics-sociolinguistics",
            name: { en: "Sociolinguistics", fa: "زبان‌شناسی اجتماعی" },
            short: { en: "Sociolinguistics", fa: "اجتماعی زبان" },
            summary: {
              en: "How language varies with class, region, gender and situation, and what it signals.",
              fa: "اینکه زبان چگونه با طبقه، منطقه، جنسیت و موقعیت دگرگون می‌شود و چه چیزی را نشان می‌دهد.",
            },
            tags: [
              { en: "dialectology", fa: "گویش‌شناسی" },
              { en: "register", fa: "گونهٔ کاربردی" },
              { en: "language contact", fa: "تماس زبانی" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "humanities",
    name: { en: "Humanities", fa: "علوم انسانی" },
    short: { en: "Humanities", fa: "علوم انسانی" },
    summary: {
      en: "The disciplines that interpret human culture, thought and expression through close reading and argument.",
      fa: "رشته‌هایی که فرهنگ، اندیشه و بیان انسانی را با خوانش دقیق و استدلال تفسیر می‌کنند.",
    },
    description: {
      en: "Humanities ask what humans have meant, valued and made, and they treat interpretation as a method with its own discipline. Their authority comes from sustained engagement with texts and objects rather than from prediction.",
      fa: "علوم انسانی می‌پرسند انسان چه چیزی را معنا، ارزش و ساخته است و تفسیر را روشی انضباط‌مند می‌شمارند. اعتبارشان از درگیری پیوسته با متن و اثر می‌آید، نه از پیش‌بینی.",
    },
    accent: "magenta",
    tags: [
      { en: "interpretation", fa: "تفسیر" },
      { en: "text", fa: "متن" },
      { en: "culture", fa: "فرهنگ" },
      { en: "argument", fa: "استدلال" },
      { en: "tradition", fa: "سنت" },
    ],
    children: [
      {
        id: "history",
        name: { en: "History", fa: "تاریخ" },
        short: { en: "History", fa: "تاریخ" },
        summary: {
          en: "The study of the human past, reconstructed from evidence and argued about in public.",
          fa: "بررسی گذشتهٔ بشر، بازسازی‌شده از اسناد و مورد گفت‌وگوی علنی.",
        },
        description: {
          en: "History works by assembling evidence about a past that cannot be observed directly. It is therefore also a discipline of argument about method, memory and which silences a record leaves behind.",
          fa: "تاریخ با گردآوری اسناد دربارهٔ گذشته‌ای کار می‌کند که مستقیم دیده نمی‌شود. از این رو رشته‌ای است دربارهٔ استدلال بر سر روش، حافظه و اینکه یک سند چه سکوت‌هایی را پنهان می‌کند.",
        },
        tags: [
          { en: "past", fa: "گذشته" },
          { en: "evidence", fa: "سند" },
          { en: "sources", fa: "منابع" },
          { en: "periodisation", fa: "دوره‌بندی" },
        ],
        children: [
          {
            id: "history-ancient",
            name: { en: "Ancient History", fa: "تاریخ باستان" },
            short: { en: "Ancient", fa: "باستان" },
            summary: {
              en: "Polities and societies of the pre-classical and classical worlds.",
              fa: "دولت‌ها و جوامع جهان پیش از کلاسیک و جهان کلاسیک.",
            },
            tags: [
              { en: "ancient empires", fa: "امپراتوری‌های باستانی" },
              { en: "archaeology", fa: "باستان‌سنجی" },
              { en: "oral tradition", fa: "سنت شفاهی" },
            ],
          },
          {
            id: "history-medieval",
            name: { en: "Medieval History", fa: "تاریخ قرون وسطی" },
            short: { en: "Medieval", fa: "قرون وسطی" },
            summary: {
              en: "The millennium between antiquity and modernity, in Europe and beyond it.",
              fa: "هزارهٔ میان باستان و مدرنیته، در اروپا و فراتر از آن.",
            },
            tags: [
              { en: "feudalism", fa: "فئودالیسم" },
              { en: "manuscripts", fa: "نسخه‌های خطی" },
              { en: "trade routes", fa: "راه‌های بازرگانی" },
            ],
          },
          {
            id: "history-modern",
            name: { en: "Modern History", fa: "تاریخ معاصر" },
            short: { en: "Modern", fa: "معاصر" },
            summary: {
              en: "The period from the seventeenth century to the present, including revolutions and world wars.",
              fa: "دورهٔ از سدهٔ هفدهم تا امروز، شامل انقلاب‌ها و جنگ‌های جهانی.",
            },
            tags: [
              { en: "industrial revolution", fa: "انقلاب صنعتی" },
              { en: "revolution", fa: "انقلاب" },
              { en: "world war", fa: "جنگ جهانی" },
            ],
          },
          {
            id: "history-historiography",
            name: { en: "Historiography", fa: "تاریخ‌نگاری" },
            short: { en: "Historiography", fa: "تاریخ‌نگاری" },
            summary: {
              en: "The history of how histories were written, and of the schools that shaped them.",
              fa: "تاریخِ نگارش تاریخ و مکاتبی که آن را شکل دادند.",
            },
            tags: [
              { en: "schools of history", fa: "مکاتب تاریخی" },
              { en: "sources and silence", fa: "منابع و سکوت" },
              { en: "methodology", fa: "روش‌شناسی" },
            ],
          },
        ],
      },
      {
        id: "philosophy",
        name: { en: "Philosophy", fa: "فلسفه" },
        short: { en: "Philosophy", fa: "فلسفه" },
        summary: {
          en: "The examination of what can be known, believed, valued and argued about rigorously.",
          fa: "بررسی اینکه چه چیزی را می‌توان دانست، باور کرد، ارزش گذاشت و دربارهٔ آن استدلال کرد.",
        },
        description: {
          en: "Philosophy clarifies concepts that other disciplines use without examining, and defends answers with reasons rather than authority. Its branches divide by question: what exists, how we know, and how we ought to act.",
          fa: "فلسفه مفاهیمی را که رشته‌های دیگر بی‌آنکه بسنجند به کار می‌گیرند روشن می‌کند و به پاسخ‌ها به‌جای اقتدار، دلیل می‌آورد. شاخه‌هایش بر پایهٔ پرسش تقسیم می‌شود: چه چیزی هست، چگونه می‌دانیم و چگونه باید کنیم.",
        },
        tags: [
          { en: "concepts", fa: "مفاهیم" },
          { en: "knowledge", fa: "دانش" },
          { en: "argument", fa: "استدلال" },
          { en: "values", fa: "ارزش‌ها" },
        ],
        children: [
          {
            id: "philosophy-metaphysics",
            name: { en: "Metaphysics", fa: "متافیزیک" },
            short: { en: "Metaphysics", fa: "متافیزیک" },
            summary: {
              en: "Questions about existence, identity, causation, time and what is possible.",
              fa: "پرسش‌هایی دربارهٔ وجود، هویت، علیت، زمان و آنچه ممکن است.",
            },
            tags: [
              { en: "existence", fa: "وجود" },
              { en: "causation", fa: "علیت" },
              { en: "modality", fa: "امکان" },
            ],
          },
          {
            id: "philosophy-epistemology",
            name: { en: "Epistemology", fa: "معرفت‌شناسی" },
            short: { en: "Epistemology", fa: "معرفت‌شناسی" },
            summary: {
              en: "What counts as knowledge, how it is acquired and how it is justified.",
              fa: "اینکه چه چیزی دانش است، چگونه به دست می‌آید و چگونه توجیه می‌شود.",
            },
            tags: [
              { en: "justification", fa: "توجیه" },
              { en: "scepticism", fa: "شک‌گرایی" },
              { en: "inference", fa: "استنتاج" },
            ],
          },
          {
            id: "philosophy-ethics",
            name: { en: "Ethics", fa: "اخلاق" },
            short: { en: "Ethics", fa: "اخلاق" },
            summary: {
              en: "What makes an action right, a life good and a duty binding.",
              fa: "اینکه چه چیزی کنش را درست، زندگی را خوب و وظیفه را الزام‌آور می‌کند.",
            },
            tags: [
              { en: "morality", fa: "اخلاقیات" },
              { en: "duty", fa: "وظیفه" },
              { en: "applied ethics", fa: "اخلاق کاربردی" },
            ],
          },
          {
            id: "philosophy-aesthetics",
            name: { en: "Aesthetics", fa: "زیبایی‌شناسی" },
            short: { en: "Aesthetics", fa: "زیبایی‌شناسی" },
            summary: {
              en: "Beauty, representation and the nature of artistic and aesthetic experience.",
              fa: "زیبایی، بازنمایی و چیستی تجربهٔ هنری و زیبایی‌شناختی.",
            },
            tags: [
              { en: "beauty", fa: "زیبایی" },
              { en: "representation", fa: "بازنمایی" },
              { en: "aesthetic judgement", fa: "داوری زیبایی‌شناختی" },
            ],
          },
        ],
      },
      {
        id: "literature",
        name: { en: "Literature", fa: "ادبیات" },
        short: { en: "Literature", fa: "ادبیات" },
        summary: {
          en: "Written expression valued as art, studied for what it does with language and form.",
          fa: "بیان نوشتاری که به‌مثابه هنگارش می‌آید و برای کاری که با زبان و صورت می‌کند خوانده می‌شود.",
        },
        description: {
          en: "Literature is separated from ordinary writing not by subject matter but by the pressure of form and the range of experience it holds together. Study ranges from close reading of texts to the institutions that make and distribute them.",
          fa: "ادبیات از نوشتار معمولی نه با موضوع، که با فشار صورت و گسترهٔ تجربه‌ای که در یک کل جمع می‌کند جدا می‌شود. مطالعهٔ آن از خوانش دقیق متن تا نهادهایی که آن‌ها را می‌سازند و توزیع می‌کنند امتداد دارد.",
        },
        tags: [
          { en: "texts", fa: "متن‌ها" },
          { en: "form", fa: "صورت" },
          { en: "language", fa: "زبان" },
          { en: "canon", fa: "متن مرجع" },
        ],
        children: [
          {
            id: "literature-poetry",
            name: { en: "Poetry", fa: "شعر" },
            short: { en: "Poetry", fa: "شعر" },
            summary: {
              en: "Language compressed by metre, sound patterning and image.",
              fa: "زبانی فشرده که با وزن، الگوی صوتی و تصویر کار می‌کند.",
            },
            tags: [
              { en: "metre", fa: "وزن" },
              { en: "image", fa: "تصویر" },
              { en: "verse form", fa: "قالب مصرع" },
            ],
          },
          {
            id: "literature-prose-fiction",
            name: { en: "Prose Fiction", fa: "داستان" },
            short: { en: "Fiction", fa: "داستان" },
            summary: {
              en: "Narrative prose, from the short story to the multi-volume novel.",
              fa: "نثر روایی، از داستان کوتاه تا رمان چندجلدی.",
            },
            tags: [
              { en: "narration", fa: "روایت" },
              { en: "character", fa: "شخصیت" },
              { en: "point of view", fa: "زاویهٔ دید" },
            ],
          },
          {
            id: "literature-drama",
            name: { en: "Drama", fa: "نمایشنامه" },
            short: { en: "Drama", fa: "نمایشنامه" },
            summary: {
              en: "Writing intended for performance, constrained by stage, voice and time.",
              fa: "نوشتاری برای اجرا، مقید به صحنه، صدا و زمان.",
            },
            tags: [
              { en: "stagecraft", fa: "صحنه‌آرایی" },
              { en: "dialogue", fa: "گفت‌وگو" },
              { en: "performance", fa: "اجرا" },
            ],
          },
          {
            id: "literature-comparative",
            name: { en: "Comparative Literature", fa: "ادبیات تطبیقی" },
            short: { en: "Comparative", fa: "تطبیقی" },
            summary: {
              en: "Reading texts across languages and periods to find flows, echoes and exclusions.",
              fa: "خواندن متن‌ها در زبان‌ها و دوره‌های گوناگون برای یافتن جاری‌ها، هم‌نوایی‌ها و حذف‌ها.",
            },
            tags: [
              { en: "influence", fa: "تأثیر" },
              { en: "translation", fa: "ترجمه" },
              { en: "world literature", fa: "ادبیات جهان" },
            ],
          },
        ],
      },
      {
        id: "art-history",
        name: { en: "Art History", fa: "تاریخ هنر" },
        short: { en: "Art History", fa: "تاریخ هنر" },
        summary: {
          en: "The study of art as made, circulated and interpreted in particular places and periods.",
          fa: "بررسی هنر آن‌گونه که در مکان‌ها و دوره‌های معین ساخته، توزیع و تفسیر شده است.",
        },
        description: {
          en: "Art history combines close attention to objects with the study of the institutions, patrons and markets that made them possible. It reads style as evidence rather than as decoration.",
          fa: "تاریخ هنر توجه دقیق به اشیا را با بررسی نهادها، حامیان و بازارهایی ترکیب می‌کند که آن‌ها را ممکن کردند. سبک را نه‌چون زینت، بلکه هم‌چون سند می‌خواند.",
        },
        tags: [
          { en: "objects", fa: "اشیا" },
          { en: "style", fa: "سبک" },
          { en: "patronage", fa: "حمایت مالی" },
          { en: "museum", fa: "موزه" },
        ],
        children: [
          {
            id: "art-history-painting",
            name: { en: "Painting", fa: "نقاشی" },
            short: { en: "Painting", fa: "نقاشی" },
            summary: {
              en: "Pictorial traditions across media, from wall painting to canvas.",
              fa: "سنت‌های تصویری در رسانه‌های گوناگون، از نقاشی دیواری تا بوم.",
            },
            tags: [
              { en: "technique", fa: "شیوهٔ اجرا" },
              { en: "iconography", fa: "نمادشناسی تصویری" },
              { en: "support", fa: "بستر" },
            ],
          },
          {
            id: "art-history-sculpture",
            name: { en: "Sculpture", fa: "مجسمه‌سازی" },
            short: { en: "Sculpture", fa: "مجسمه‌سازی" },
            summary: {
              en: "Objects made in the round and in relief, from stone carving to installation.",
              fa: "آثار ساخته‌شده به‌صورت حجمی یا برجسته، از تراش سنگ تا نصب معاصر.",
            },
            tags: [
              { en: "carving", fa: "تراش" },
              { en: "casting", fa: "ریخته‌گری" },
              { en: "installation", fa: "نصب" },
            ],
          },
          {
            id: "art-history-architecture",
            name: { en: "Architectural History", fa: "تاریخ معماری" },
            short: { en: "Architecture", fa: "معماری" },
            summary: {
              en: "Buildings read as documents of the societies, materials and beliefs that raised them.",
              fa: "بنیان‌ها هم‌چون سندی از جوامع، مواد و باورهایی که برپا کردندشان.",
            },
            tags: [
              { en: "built form", fa: "کالبد" },
              { en: "urban fabric", fa: "بافت شهری" },
              { en: "heritage", fa: "میراث" },
            ],
          },
        ],
      },
      {
        id: "classics",
        name: { en: "Classics", fa: "کلاسیک" },
        short: { en: "Classics", fa: "کلاسیک" },
        summary: {
          en: "The study of the Greek and Roman world and of its reception in later cultures.",
          fa: "بررسی جهان یونان و روم و بازتاب آن در فرهنگ‌های بعدی.",
        },
        description: {
          en: "Classics is philology as much as archaeology: close reading of Greek and Latin texts alongside what has been physically recovered. Its second half is reception, how antiquity was read and imagined from the Renaissance onward.",
          fa: "کلاسیک به اندازهٔ باستان‌سنجی، زبان‌شناسی است: خوانش دقیق متن‌های یونانی و لاتین در کنار آنچه به‌طور فیزیکی به دست آمده. نیمهٔ دومش بازتاب است، اینکه باستان از رنسانس به بعد چگونه خوانده و تصور شد.",
        },
        tags: [
          { en: "greek and latin", fa: "یونانی و لاتین" },
          { en: "philology", fa: "فیلولوژی" },
          { en: "antiquity", fa: "باستان" },
          { en: "reception", fa: "بازتاب" },
        ],
        children: [
          {
            id: "classics-philology",
            name: { en: "Classical Philology", fa: "فیلولوژی کلاسیک" },
            short: { en: "Philology", fa: "فیلولوژی" },
            summary: {
              en: "Reading and editing Greek and Latin texts as careful linguistic scholarship.",
              fa: "خواندن و تصحیح متن‌های یونانی و لاتین هم‌چون پژوهش زبان‌شناختی دقیق.",
            },
            tags: [
              { en: "textual criticism", fa: "نقد متنی" },
              { en: "grammar", fa: "دستور زبان" },
              { en: "translation", fa: "ترجمه" },
            ],
          },
          {
            id: "classics-ancient-religion",
            name: { en: "Ancient Religion", fa: "دین باستان" },
            short: { en: "Ancient Religion", fa: "دین باستان" },
            summary: {
              en: "Ritual, sacrifice and divine narrative in ancient Mediterranean societies.",
              fa: "آیین، قربانی و روایت الهی در جوامع باستانی مدیترانه.",
            },
            tags: [
              { en: "ritual practice", fa: "عمل آیینی" },
              { en: "myth", fa: "اسطوره" },
              { en: "temple", fa: "معبد" },
            ],
          },
          {
            id: "classics-reception",
            name: { en: "Classical Reception", fa: "بازتاب کلاسیک" },
            short: { en: "Reception", fa: "بازتاب" },
            summary: {
              en: "How antiquity was quoted, imitated and rewritten by later Europe and beyond.",
              fa: "اینکه اروپای بعدی و دیگر جاها باستان را چگونه نقل، تقلید و بازنویسی کردند.",
            },
            tags: [
              { en: "neo-classicism", fa: "نئوکلاسیسم" },
              { en: "appropriation", fa: "تصاحب فرهنگی" },
              { en: "modern classics", fa: "کلاسیک مدرن" },
            ],
          },
        ],
      },
      {
        id: "religious-studies",
        name: { en: "Religious Studies", fa: "دین‌پژوهی" },
        short: { en: "Religious Studies", fa: "دین‌پژوهی" },
        summary: {
          en: "The academic study of religion as a human and social phenomenon, distinct from theology.",
          fa: "بررسی دانشگاهی دین به‌مثابه پدیده‌ای انسانی و اجتماعی، مستقل از الهیات.",
        },
        description: {
          en: "Religious studies sets aside belief in order to describe what religious communities do and believe, using history, anthropology and philology together. Theology remains a distinct commitment; this field studies religion without requiring it.",
          fa: "دین‌پژوهی باور را کنار می‌گذارد تا آنچه جوامع دینی انجام می‌دهند و باور دارند را توصیف کند و تاریخ، انسان‌شناسی و فیلولوژی را با هم به کار می‌گیرد. الهیات پایبندی جداگانه‌ای است؛ این رشته دین را بدون الزام به بیش بررسی می‌کند.",
        },
        tags: [
          { en: "belief", fa: "باور" },
          { en: "ritual", fa: "آیین" },
          { en: "sacred texts", fa: "متون مقدس" },
          { en: "comparative method", fa: "روش تطبیقی" },
        ],
        children: [
          {
            id: "religious-studies-comparative",
            name: { en: "Comparative Religion", fa: "دین‌شناسی تطبیقی" },
            short: { en: "Comparative", fa: "تطبیقی" },
            summary: {
              en: "Patterns shared across traditions once we stop assuming they are the same thing.",
              fa: "الگوهای مشترک میان سنت‌ها، آنگاه که دیگر یکی‌بودنشان را مفروض نداریم.",
            },
            tags: [
              { en: "comparative method", fa: "روش تطبیقی" },
              { en: "myth and ritual", fa: "اسطوره و آیین" },
              { en: "translation between traditions", fa: "ترجمه میان سنت‌ها" },
            ],
          },
          {
            id: "religious-studies-theology",
            name: { en: "Theology", fa: "الهیات" },
            short: { en: "Theology", fa: "الهیات" },
            summary: {
              en: "Reasoned, systematic account of divine being and its relation to the world.",
              fa: "توضیح استدلالی و نظام‌مند دربارهٔ وجود الهی و نسبت آن با جهان.",
            },
            tags: [
              { en: "doctrine", fa: "آموزه" },
              { en: "systematic theology", fa: "الهیات نظام‌مند" },
              { en: "revelation", fa: "وحی" },
            ],
          },
          {
            id: "religious-studies-ritual",
            name: { en: "Ritual Studies", fa: "پژوهش آیین" },
            short: { en: "Ritual", fa: "آیین" },
            summary: {
              en: "Ritual as embodied practice, its social effects and its relation to power.",
              fa: "آیین به‌مثابه عملی تن‌مند، اثر اجتماعی‌اش و نسبتش با قدرت.",
            },
            tags: [
              { en: "embodiment", fa: "تن‌مندی" },
              { en: "performance", fa: "اجرا" },
              { en: "sacred time", fa: "زمان مقدس" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "engineering",
    name: { en: "Engineering & Technology", fa: "مهندسی و فناوری" },
    short: { en: "Engineering", fa: "مهندسی" },
    summary: {
      en: "The application of science to build systems that must work, at scale, within real constraints.",
      fa: "به‌کارگیری علم برای ساخت سامانه‌هایی که باید در محدودیت‌های واقعی و در مقیاس کار کنند.",
    },
    description: {
      en: "Engineering converts an abstract requirement into something that carries load, resists failure and can be built again. Its fields are organised by domain of practice, and each inherits a long-standing ethic of safety and honest margins.",
      fa: "مهندسی نیازی انتزاعی را به چیزی تبدیل می‌کند که بار تحمل کند، در برابر خرابی مقاوم باشد و دوباره ساخته شود. شاخه‌هایش بر پایهٔ حوزهٔ کاربرد سازمان یافته و هرکدام اخلاقی دیرینه در بارهٔ ایمنی و حاشیهٔ اطمینان به ارث می‌برند.",
    },
    accent: "cyan",
    tags: [
      { en: "design", fa: "طراحی" },
      { en: "systems", fa: "سامانه‌ها" },
      { en: "safety", fa: "ایمنی" },
      { en: "materials", fa: "مصالح" },
      { en: "practice", fa: "اجرا" },
    ],
    children: [
      {
        id: "mechanical-engineering",
        name: { en: "Mechanical Engineering", fa: "مهندسی مکانیک" },
        short: { en: "Mechanical", fa: "مکانیک" },
        summary: {
          en: "Design and manufacture of machines, from engines and turbines to precision devices.",
          fa: "طراحی و ساخت ماشین‌ها، از موتور و توربین تا دستگاه‌های دقیق.",
        },
        description: {
          en: "Mechanical engineering turns force and motion into useful work, and heat into motion. It is the branch that keeps the rest of engineering supplied with power, motion and materials under load.",
          fa: "مهندسی مکانیک نیرو و حرکت را به کار مفید و گرما را به حرکت بدل می‌کند. شاخه‌ای است که بقیهٔ مهندسی را با توان، حرکت و مصالح تحت بار تغذیه می‌کند.",
        },
        tags: [
          { en: "machines", fa: "ماشین‌ها" },
          { en: "thermodynamics", fa: "ترمودینامیک" },
          { en: "mechanisms", fa: "مکانیزم‌ها" },
          { en: "manufacturing", fa: "ساخت" },
        ],
        children: [
          {
            id: "mechanical-fluid-mechanics",
            name: { en: "Fluid Mechanics", fa: "مکانیک سیالات" },
            short: { en: "Fluid", fa: "سیالات" },
            summary: {
              en: "Flow, pressure and forces in liquids and gases, from pipes to wings.",
              fa: "جریان، فشار و نیرو در مایعات و گازها، از لوله تا بال هواپیما.",
            },
            tags: [
              { en: "viscous flow", fa: "جریان ویسکوز" },
              { en: "turbulence", fa: "آشوب" },
              { en: "hydraulics", fa: "هیدرولیک" },
            ],
          },
          {
            id: "mechanical-thermodynamics-engineering",
            name: { en: "Engineering Thermodynamics", fa: "ترمودینامیک مهندسی" },
            short: { en: "Thermo", fa: "ترمودینامیک" },
            summary: {
              en: "Energy conversion and the design of heat engines, boilers and refrigerators.",
              fa: "تبدیل انرژی و طراحی موتورهای حرارتی، دیگ‌ها و یخچال‌ها.",
            },
            tags: [
              { en: "heat engine", fa: "موتور حرارتی" },
              { en: "refrigeration", fa: "سرمایش" },
              { en: "efficiency", fa: "بازده" },
            ],
          },
          {
            id: "mechanical-machine-design",
            name: { en: "Machine Design", fa: "طراحی ماشین" },
            short: { en: "Machine Design", fa: "طراحی ماشین" },
            summary: {
              en: "Sizing components and choosing materials so that parts work together without failure.",
              fa: "تعیین ابعاد اجزا و گزینش مواد تا قطعه‌ها بدون خرابی با هم کار کنند.",
            },
            tags: [
              { en: "stress analysis", fa: "تحلیل تنش" },
              { en: "fatigue", fa: "خستگی" },
              { en: "tolerances", fa: "تلورانس‌ها" },
            ],
          },
          {
            id: "mechanical-manufacturing",
            name: { en: "Manufacturing Engineering", fa: "مهندسی ساخت" },
            short: { en: "Manufacturing", fa: "ساخت" },
            summary: {
              en: "Process selection, tooling and production lines that make parts repeatably and cheaply.",
              fa: "گزینش فرایند، ابزار و خط تولید که ساخت قطعه را تکرارپذیر و ارزان کند.",
            },
            tags: [
              { en: "machining", fa: "ماشین‌کاری" },
              { en: "casting", fa: "ریخته‌گری" },
              { en: "lean production", fa: "تولید ناب" },
            ],
          },
        ],
      },
      {
        id: "civil-engineering",
        name: { en: "Civil Engineering", fa: "مهندسی عمران" },
        short: { en: "Civil", fa: "عمران" },
        summary: {
          en: "Design of the built environment: structures, roads, water systems and the ground itself.",
          fa: "طراحی محیط ساخته‌شده: سازه‌ها، راه‌ها، سامانه‌های آب و خودِ زمین.",
        },
        description: {
          en: "Civil engineering works with materials that age, soil that moves and public money that must be justified. Its remit is the longest-lived of all engineering, which is why maintenance and codes matter as much as design.",
          fa: "مهندسی عمران با موادی کار می‌کند که فرسوده می‌شوند، خاکی که حرکت می‌کند و بودجهٔ عمومی‌ای که باید توجیه شود. حوزهٔ کارش در میان همهٔ رشته‌های مهندسی ماندگارترین است؛ به همین دلیل نگهداری و آیین‌نامه‌ها به اندازهٔ طراحی اهمیت دارند.",
        },
        tags: [
          { en: "structures", fa: "سازه‌ها" },
          { en: "infrastructure", fa: "زیرساخت" },
          { en: "soil", fa: "خاک" },
          { en: "codes", fa: "آیین‌نامه‌ها" },
        ],
        children: [
          {
            id: "civil-structural",
            name: { en: "Structural Engineering", fa: "مهندسی سازه" },
            short: { en: "Structural", fa: "سازه" },
            summary: {
              en: "Analysis and design of load-bearing members, frames and bridges.",
              fa: "تحلیل و طراحی اعضای باربر، قاب‌ها و پل‌ها.",
            },
            tags: [
              { en: "reinforced concrete", fa: "بتن آرمه" },
              { en: "steel frames", fa: "قاب فولادی" },
              { en: "finite element analysis", fa: "تحلیل اجزای محدود" },
            ],
          },
          {
            id: "civil-geotechnical",
            name: { en: "Geotechnical Engineering", fa: "ژئوتکنیک" },
            short: { en: "Geotechnical", fa: "ژئوتکنیک" },
            summary: {
              en: "Working with soil and rock: foundations, slopes, tunnels and retaining structures.",
              fa: "کار با خاک و سنگ: پی، شیب، تونل و سازه‌های نگه‌دارنده.",
            },
            tags: [
              { en: "foundations", fa: "پی‌ها" },
              { en: "slope stability", fa: "پایداری شیب" },
              { en: "tunnelling", fa: "تونل‌سازی" },
            ],
          },
          {
            id: "civil-transportation",
            name: { en: "Transportation Engineering", fa: "مهندسی حمل‌ونقل" },
            short: { en: "Transport", fa: "حمل‌ونقل" },
            summary: {
              en: "Planning, designing and operating roads, railways and transit networks.",
              fa: "برنامه‌ریزی، طراحی و بهره‌برداری از راه‌ها، ریل‌ها و شبکه‌های ترابری.",
            },
            tags: [
              { en: "capacity", fa: "ظرفیت" },
              { en: "railway", fa: "راه‌آهن" },
              { en: "traffic modelling", fa: "مدل‌سازی ترافیک" },
            ],
          },
        ],
      },
      {
        id: "electrical-engineering",
        name: { en: "Electrical Engineering", fa: "مهندسی برق" },
        short: { en: "Electrical", fa: "برق" },
        summary: {
          en: "The study and design of circuits, machines, signals and the control of electrical power.",
          fa: "بررسی و طراحی مدارها، ماشین‌ها، سیگنال‌ها و کنترل توان الکتریکی.",
        },
        description: {
          en: "Electrical engineering spans a vast range of power, from grid transmission down to the transistor. Its unifying idea is that behaviour is governed by differential equations, whether those equations describe a generator or a logic gate.",
          fa: "مهندسی برق دامنهٔ عظیمی از توان را دربر می‌گیرد، از انتقال شبکه تا ترانزیستور. ایدهٔ یکپارچه‌کننده‌اش این است که رفتار با معادلات دیفرانسیل حاکم است، چه این معادلات یک ژنراتور را توصیف کنند چه یک گیت منطقی را.",
        },
        tags: [
          { en: "circuits", fa: "مدارها" },
          { en: "power", fa: "توان" },
          { en: "signals", fa: "سیگنال‌ها" },
          { en: "control", fa: "کنترل" },
        ],
        children: [
          {
            id: "electrical-circuits",
            name: { en: "Circuit Theory", fa: "نظریهٔ مدار" },
            short: { en: "Circuits", fa: "مدارها" },
            summary: {
              en: "How current and voltage behave in networks of resistive, capacitive and inductive elements.",
              fa: "رفتار جریان و ولتاژ در شبکه‌هایی از عناصر مقاومتی، خازنی و هسته‌ای.",
            },
            tags: [
              { en: "kirchhoff laws", fa: "قوانین کیرشهوف" },
              { en: "impedance", fa: "امپدانس" },
              { en: "network analysis", fa: "تحلیل شبکه" },
            ],
          },
          {
            id: "electrical-power-systems",
            name: { en: "Power Systems", fa: "سیستم‌های قدرت" },
            short: { en: "Power", fa: "قدرت" },
            summary: {
              en: "Generation, transmission and distribution of electricity at grid scale.",
              fa: "تولید، انتقال و توزیع برق در مقیاس شبکه.",
            },
            tags: [
              { en: "grid stability", fa: "پایداری شبکه" },
              { en: "renewables integration", fa: "یکپارچه‌سازی تجدیدپذیرها" },
              { en: "protection", fa: "حفاظت" },
            ],
          },
          {
            id: "electrical-control",
            name: { en: "Control Systems", fa: "سیستم‌های کنترل" },
            short: { en: "Control", fa: "کنترل" },
            summary: {
              en: "Feedback controllers that keep a system's output tracking a desired reference.",
              fa: "کنترل‌گرهای بازخوردی که خروجی سامانه را روی مقدار مرجع نگه می‌دارند.",
            },
            tags: [
              { en: "feedback loop", fa: "حلقهٔ بازخورد" },
              { en: "stability", fa: "پایداری" },
              { en: "pid control", fa: "کنترل تناسبی-انتگرالی-مشتقی" },
            ],
          },
          {
            id: "electrical-signal-processing",
            name: { en: "Signal Processing", fa: "پردازش سیگنال" },
            short: { en: "Signals", fa: "پردازش سیگنال" },
            summary: {
              en: "Filtering, sampling and transforming signals to recover information from noisy measurements.",
              fa: "فیلترگذاری، نمونه‌برداری و دگرگونی سیگنال برای بازیابی اطلاعات از اندازه‌گیری‌های نویزی.",
            },
            tags: [
              { en: "fourier transform", fa: "تبدیل فوریه" },
              { en: "filter design", fa: "طراحی فیلتر" },
              { en: "sampling", fa: "نمونه‌برداری" },
            ],
          },
        ],
      },
      {
        id: "chemical-engineering",
        name: { en: "Chemical Engineering", fa: "مهندسی شیمی" },
        short: { en: "Chemical Eng", fa: "شیمی" },
        summary: {
          en: "Design of industrial processes that convert raw materials into products safely and efficiently.",
          fa: "طراحی فرایندهای صنعتی که مواد خام را ایمن و کارآمد به محصول تبدیل می‌کنند.",
        },
        description: {
          en: "Chemical engineering scales up reactions that work in a flask. Its concern is mass and energy transfer, the separation of products and the control of a process that must run continuously and safely.",
          fa: "مهندسی شیمی واکنش‌هایی را که در فلاسک کار می‌کنند به مقیاس بزرگ می‌برد. دغدغه‌اش انتقال جرم و انرژی، جداسازی محصولات و کنترل فرایندی است که باید پیوسته و ایمن اجرا شود.",
        },
        tags: [
          { en: "process design", fa: "طراحی فرایند" },
          { en: "separation", fa: "جداسازی" },
          { en: "scale-up", fa: "مقیاس‌افزایی" },
          { en: "plants", fa: "واحدهای صنعتی" },
        ],
        children: [
          {
            id: "chemical-engineering-reaction",
            name: { en: "Reaction Engineering", fa: "مهندسی واکنش" },
            short: { en: "Reaction", fa: "واکنش" },
            summary: {
              en: "Kinetics, selectivity and heat management in industrial reactors.",
              fa: "سینتیک، گزینش‌پذیری و مدیریت حرارت در راکتورهای صنعتی.",
            },
            tags: [
              { en: "reaction kinetics", fa: "سینتیک واکنش" },
              { en: "selectivity", fa: "گزینش‌پذیری" },
              { en: "reactor design", fa: "طراحی راکتور" },
            ],
          },
          {
            id: "chemical-engineering-separations",
            name: { en: "Separation Processes", fa: "فرایندهای جداسازی" },
            short: { en: "Separations", fa: "جداسازی" },
            summary: {
              en: "Distillation, extraction and filtration that purify and separate process streams.",
              fa: "تقطیر، استخراج و فیلتراسیون که جریان‌های فرایند را خالص و جدا می‌کنند.",
            },
            tags: [
              { en: "distillation", fa: "تقطیر" },
              { en: "extraction", fa: "استخراج" },
              { en: "membranes", fa: "غشا" },
            ],
          },
          {
            id: "chemical-engineering-process-control",
            name: { en: "Process Control", fa: "کنترل فرایند" },
            short: { en: "Process Control", fa: "کنترل فرایند" },
            summary: {
              en: "Instrumentation and algorithms that hold an industrial process at its operating point.",
              fa: "ابزار دقیق و الگوریتم‌هایی که فرایند صنعتی را روی نقطهٔ کاری نگه می‌دارند.",
            },
            tags: [
              { en: "instrumentation", fa: "ابزار دقیق" },
              { en: "distillation control", fa: "کنترل فرایند" },
              { en: "alarm management", fa: "مدیریت هشدار" },
            ],
          },
        ],
      },
      {
        id: "aerospace-engineering",
        name: { en: "Aerospace Engineering", fa: "مهندسی هوافضا" },
        short: { en: "Aerospace", fa: "هوافضا" },
        summary: {
          en: "Design of aircraft and spacecraft, where every gram and every degree of heat has a price.",
          fa: "طراحی هواپیما و فضاپیما، جایی که هر گرم و هر درجه گرما بهایی دارد.",
        },
        description: {
          en: "Aerospace engineering works where the margin for error is close to zero and the operating environment is hostile. It is intensely interdisciplinary, joining fluid mechanics, structures, materials and control to answer a single question: will it fly, or will it hold.",
          fa: "مهندسی هوافضا جایی کار می‌کند که حاشیهٔ خطا نزدیک صفر و محیط کار خصمانه است. به‌شدت میان‌رشته‌ای است و مکانیک سیالات، سازه، مواد و کنترل را برای یک پرسش به هم می‌دوزد: آیا پرواز می‌کند یا دوام می‌آورد.",
        },
        tags: [
          { en: "flight", fa: "پرواز" },
          { en: "propulsion", fa: "پیشرانش" },
          { en: "structures", fa: "سازه‌ها" },
          { en: "spacecraft", fa: "فضاپیما" },
        ],
        children: [
          {
            id: "aerospace-aerodynamics",
            name: { en: "Aerodynamics", fa: "آیرودینامیک" },
            short: { en: "Aerodynamics", fa: "آیرودینامیک" },
            summary: {
              en: "Airflow over bodies, giving lift, drag and stability in flight.",
              fa: "جریان هوا بر روی اجسام، که در پرواز نیروی برآ، پسا و پایداری می‌سازد.",
            },
            tags: [
              { en: "lift and drag", fa: "برآ و پسا" },
              { en: "boundary layer", fa: "لایهٔ مرزی" },
              { en: "wind tunnel", fa: "تونل باد" },
            ],
          },
          {
            id: "aerospace-astronautics",
            name: { en: "Astronautics", fa: "فضانوردی" },
            short: { en: "Astronautics", fa: "فضانوردی" },
            summary: {
              en: "Orbit mechanics, launch systems and the engineering of reaching and staying in space.",
              fa: "مکانیک مدار، سامانه‌های پرتاب و مهندسی رسیدن و ماندن در فضا.",
            },
            tags: [
              { en: "orbital mechanics", fa: "مکانیک مداری" },
              { en: "launch vehicle", fa: "پرتابگر" },
              { en: "mission design", fa: "طراحی مأموریت" },
            ],
          },
          {
            id: "aerospace-propulsion",
            name: { en: "Propulsion", fa: "پیشرانش" },
            short: { en: "Propulsion", fa: "پیشرانش" },
            summary: {
              en: "Turbines, rocket engines and the thermodynamics of making thrust.",
              fa: "توربین‌ها، موتورهای موشکی و ترمودینامیک ساخت رانش.",
            },
            tags: [
              { en: "turbine", fa: "توربین" },
              { en: "rocket engine", fa: "موتور موشکی" },
              { en: "thrust", fa: "رانش" },
            ],
          },
        ],
      },
      {
        id: "materials-engineering",
        name: { en: "Materials Engineering", fa: "مهندسی مواد" },
        short: { en: "Materials", fa: "مواد" },
        summary: {
          en: "Designing matter for purpose: metals, ceramics, polymers and composites, and how they fail.",
          fa: "طراحی ماده برای هدفی معین: فلزات، سرامیک‌ها، پلیمرها و کامپوزیت‌ها، و شیوهٔ خرابی‌شان.",
        },
        description: {
          en: "Materials engineering treats properties as design variables that can be engineered rather than inherited. Failure analysis is the discipline's sharpest tool, because it explains why a structure that worked yesterday does not work today.",
          fa: "مهندسی مواد خواص را متغیرهای طراحی می‌داند که می‌توان آن‌ها را مهندسی کرد نه اینکه به ارث برسند. تحلیل شکست دقیق‌ترین ابزار این رشته است، زیرا توضیح می‌دهد چرا سازه‌ای که دیروز کار می‌کرد امروز کار نمی‌کند.",
        },
        tags: [
          { en: "properties", fa: "خواص" },
          { en: "processing", fa: "فرایندسازی" },
          { en: "failure", fa: "شکست" },
          { en: "alloys", fa: "آلیاژ‌ها" },
        ],
        children: [
          {
            id: "materials-metallurgy",
            name: { en: "Metallurgy", fa: "متالورژی" },
            short: { en: "Metallurgy", fa: "متالورژی" },
            summary: {
              en: "Extraction, alloy design and heat treatment of metals.",
              fa: "استخراج، طراحی آلیاژ و عملیات حرارتی فلزات.",
            },
            tags: [
              { en: "alloy design", fa: "طراحی آلیاژ" },
              { en: "heat treatment", fa: "عملیات حرارتی" },
              { en: "extraction", fa: "استخراج" },
            ],
          },
          {
            id: "materials-polymers",
            name: { en: "Polymer Materials", fa: "مواد پلیمری" },
            short: { en: "Polymers", fa: "پلیمرها" },
            summary: {
              en: "Chain architecture, processing and the trade-off between strength and toughness.",
              fa: "معماری زنجیره، فرایندسازی و مصالحه میان استحکام و چکش‌پذیری.",
            },
            tags: [
              { en: "chain structure", fa: "ساختار زنجیره" },
              { en: "composites", fa: "کامپوزیت‌ها" },
              { en: "creep", fa: "خزش" },
            ],
          },
          {
            id: "materials-failure-analysis",
            name: { en: "Failure Analysis", fa: "تحلیل شکست" },
            short: { en: "Failure", fa: "تحلیل شکست" },
            summary: {
              en: "Reading broken parts to identify the physical mechanism that caused failure.",
              fa: "خواندن قطعات شکسته برای شناسایی سازوکار فیزیکیِ خرابی.",
            },
            tags: [
              { en: "fractography", fa: "شکست‌نگاری" },
              { en: "fatigue", fa: "خستگی" },
              { en: "root cause", fa: "علت ریشه‌ای" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "arts-design",
      name: { en: "Arts & Design", fa: "هنر و طراحی" },
      short: { en: "Arts", fa: "هنر" },
      summary: {
        en: "The disciplines that create works for perception: image, sound, form, space and narrative.",
        fa: "رشته‌هایی که برای ادراک، اثر می‌آفرینند: تصویر، صدا، فرم، فضا و روایت.",
      },
      description: {
        en: "The arts treat perception as their subject and sensation as their method. Unlike the sciences they do not aim at a single settled answer but at a made object that can be judged and lived with. Design sits beside them as the applied wing, where the question is not what a thing means but whether it can be made well, used well and kept in being.",
        fa: "هنر ادراک را موضوع خود و حس را روش کار خود می‌گیرد. برخلاف علوم، هدفش رسیدن به یک پاسخ یگانه و قطعی نیست، بلکه ساختن اثری است که بتوان درباره‌اش داوری کرد و با آن زیست. طراحی در کنار هنر، بالِ کاربردی آن است: آنجا پرسش این نیست که چیزی چه معنایی دارد، بلکه این است که آیا خوب ساخته می‌شود، خوب استفاده می‌شود و دوام می‌آورد.",
      },
      accent: "rose",
      tags: [
        { en: "aesthetics", fa: "زیبایی‌شناسی" },
        { en: "perception", fa: "ادراک" },
        { en: "making", fa: "ساختن" },
        { en: "composition", fa: "ترکیب‌بندی" },
        { en: "expression", fa: "بیان" },
      ],
      children: [
        {
          id: "arts-fine-art",
          name: { en: "Fine Art", fa: "هنرهای تجسمی" },
          short: { en: "Fine Art", fa: "هنر تجسمی" },
          summary: {
            en: "Painting, drawing, printmaking and sculpture as self-directed practice.",
            fa: "نقاشی، طراحی، چاپ و مجسمه‌سازی به‌مثابه عملی خودانگیخته.",
          },
          description: {
            en: "Fine art is judged by internal standards of craft, composition and intent rather than by usefulness. Its lineage runs from the painted chamber of the craft guild to the readymade, and each shift in what counts as art is also a shift in what a material can be asked to do.",
            fa: "هنر تجسمی با معیارهای درونیِ craft، ترکیب‌بندی و قصد سنجیده می‌شود، نه با سودمندی. تبار آن از اتاق نقاشی صنف تا اثر آماده کشیده شده است، و هر جابه‌جایی در تعریف هنر، جابه‌جایی در آن است که از یک ماده چه می‌توان خواست.",
          },
          tags: [
            { en: "painting", fa: "نقاشی" },
            { en: "sculpture", fa: "مجسمه‌سازی" },
            { en: "printmaking", fa: "چاپ هنری" },
            { en: "draftsmanship", fa: "طراحی خطی" },
          ],
          children: [
            { id: "arts-fine-art-painting", name: { en: "Painting", fa: "نقاشی" }, short: { en: "Painting", fa: "نقاشی" }, summary: { en: "Applying pigment to a surface to build image, depth and surface.", fa: "نشاندن رنگ بر سطح برای ساختن تصویر، عمق و بافت." }, tags: [{ en: "pigment", fa: "رنگدانه" }, { en: "brushwork", fa: "کاربرد قلم" }, { en: "ground", fa: "آستر" }] },
            { id: "arts-fine-art-drawing", name: { en: "Drawing", fa: "نقاشی خطی" }, short: { en: "Drawing", fa: "خط‌پردازی" }, summary: { en: "Direct notation of form and light with line and tone.", fa: "ثبت مستقیم فرم و نور با خط و سایه." }, tags: [{ en: "line", fa: "خط" }, { en: "observation", fa: "مشاهده" }, { en: "draftsmanship", fa: "طراحی خطی" }] },
            { id: "arts-fine-art-printmaking", name: { en: "Printmaking", fa: "چاپ هنری" }, short: { en: "Prints", fa: "چاپ" }, summary: { en: "Relief, intaglio and screen processes that make multiples of one matrix.", fa: "فرایندهای برجسته، حفره‌ای و صفحه‌ای که از یک ماتریس، نسخه‌های متعدد می‌سازند." }, tags: [{ en: "etching", fa: "حکاکی" }, { en: "relief", fa: "برجسته" }, { en: "edition", fa: "شمارگذاری نسخه" }] },
            { id: "arts-fine-art-sculpture", name: { en: "Sculpture", fa: "مجسمه‌سازی" }, short: { en: "Sculpture", fa: "مجسمه" }, summary: { en: "Shaping volume, mass and surface in the round or in relief.", fa: "شکل‌دادن به حجم، جرم و سطح در فضای گرد یا برجسته." }, tags: [{ en: "volume", fa: "حجم" }, { en: "material", fa: "ماده" }, { en: "space", fa: "فضا" }] },
          ],
        },
        {
          id: "arts-architecture",
          name: { en: "Architecture", fa: "معماری" },
          short: { en: "Architecture", fa: "معماری" },
          summary: {
            en: "Shaping buildings and cities so that life inside them is possible and memorable.",
            fa: "شکل‌دادن به بنا و شهر به‌گونه‌ای که زندگی در آن ممکن و به‌یادماندنی باشد.",
          },
          description: {
            en: "Architecture is the art of the third dimension, of load and programme and the public realm at once. It answers questions of structure and climate with questions of culture, and its smallest unit — the detail where hand meets material — decides whether a building is loved or merely used.",
            fa: "معماری هنر بُعد سوم است: هم‌زمان پاسخ‌گوی سازه، اقلیم و فضای عمومی. به پرسش‌های فنامند با پرسش‌های فرهنگی پاسخ می‌دهد، و کوچک‌ترین یکای آن — یعنی همان جزئیاتی که دست با ماده ملاقات می‌کند — سرنوشت دوست‌داشتنی یا صرفاً استفاده‌شدنی بودن یک بنا را تعیین می‌کند.",
          },
          tags: [
            { en: "built space", fa: "فضای ساخته" },
            { en: "structure", fa: "سازه" },
            { en: "vernacular", fa: "بومی" },
            { en: "urbanism", fa: "شهرسازی" },
          ],
          children: [
            { id: "arts-architecture-history-theory", name: { en: "Architectural History & Theory", fa: "تاریخ و نظریهٔ معماری" }, short: { en: "History", fa: "تاریخ" }, summary: { en: "Reading buildings as records of the constraints and ambitions of their moment.", fa: "خواندن بناها به‌مثابه سندِ محدودیت‌ها و جاه‌طلبی‌های روزگارشان." }, tags: [{ en: "archive", fa: "بایگانی" }, { en: "canon", fa: "قانونِ بنیادین" }, { en: "vernacular", fa: "بومی" }] },
            { id: "arts-architecture-structural", name: { en: "Structural Architecture", fa: "معماری سازه" }, short: { en: "Structure", fa: "سازه" }, summary: { en: "Load paths, spans and structural systems expressed as form.", fa: "مسیر بار، دهانه و سامانه‌های سازه‌ای که به فرم ترجمه می‌شوند." }, tags: [{ en: "span", fa: "دهانه" }, { en: "load", fa: "بار" }, { en: "truss", fa: "خرپا" }] },
            { id: "arts-architecture-urban", name: { en: "Urban Design", fa: "طراحی شهری" }, short: { en: "Urban", fa: "شهری" }, summary: { en: "Shaping streets, blocks and public space at the scale of the district.", fa: "شکل‌دادن به خیابان، بلوک و فضای عمومی در مقیاس محله." }, tags: [{ en: "street", fa: "خیابان" }, { en: "public realm", fa: "فضای عمومی" }, { en: "density", fa: "تراکم" }] },
            { id: "arts-architecture-interior", name: { en: "Interior Architecture", fa: "معماری داخلی" }, short: { en: "Interior", fa: "داخلی" }, summary: { en: "The room as an inhabited, acoustic and tactile environment.", fa: "اتاق به‌مثابه محیطی مسکون، آکوستیک و لمسی." }, tags: [{ en: "acoustics", fa: "آکوستیک" }, { en: "detail", fa: "جزئیات" }, { en: "atmosphere", fa: "جو" }] },
          ],
        },
        {
          id: "arts-music",
          name: { en: "Music", fa: "موسیقی" },
          short: { en: "Music", fa: "موسیقی" },
          summary: {
            en: "The organisation of sound and silence into time, pitch and form.",
            fa: "سامان‌دهی صدا و سکوت در زمان، گام و فرم.",
          },
          description: {
            en: "Music is the art whose material is time itself and which the ear must follow at the only speed it unfolds. Its theory spans tuning, counterpoint and form, while its many practices run from unwritten folk transmission to the exacting notation of the conservatory.",
            fa: "موسیقی هنری است که ماده‌اش خودِ زمان است و گوش باید تنها با سرعتی که در آن آشکار می‌شود آن را دنبال کند. نظریه‌اش کوک، contrapoint و فرم را در بر می‌گیرد و شیوه‌های عملی‌اش از انتقال شفاهیِ فولکلور تا نت‌نویسی سخت‌گیرانهٔ کنسرواتوار کشیده شده است.",
          },
          tags: [
            { en: "time", fa: "زمان" },
            { en: "pitch", fa: "گام" },
            { en: "counterpoint", fa: "هم‌آوازی" },
            { en: "form", fa: "فرم" },
          ],
          children: [
            { id: "arts-music-theory", name: { en: "Music Theory", fa: "نظریهٔ موسیقی" }, short: { en: "Theory", fa: "نظریه" }, summary: { en: "Pitch, interval, harmony and form described systematically.", fa: "گام، فاصله، هارمونی و فرم به‌طور نظام‌مند." }, tags: [{ en: "harmony", fa: "هارمونی" }, { en: "interval", fa: "فاصله" }, { en: "analysis", fa: "تحلیل" }] },
            { id: "arts-music-composition", name: { en: "Composition", fa: "آهنگسازی" }, short: { en: "Composition", fa: "آهنگسازی" }, summary: { en: "Writing new sound structures for performance or fixed media.", fa: "نوشتن ساختارهای صوتی تازه برای اجرا یا رسانهٔ ثابت." }, tags: [{ en: "score", fa: "پارتیشن" }, { en: "voice-leading", fa: "هدایت صدا" }, { en: "motif", fa: "موتیف" }] },
            { id: "arts-music-performance", name: { en: "Performance & Conducting", fa: "اجرا و رهبری ارکستر" }, short: { en: "Performance", fa: "اجرا" }, summary: { en: "The live, unrepeatable art of making sound together in time.", fa: "هنر زنده و تکرارناپذیرِ ساختن صدا با هم، در زمان." }, tags: [{ en: "ensemble", fa: "گروه نوازندگان" }, { en: "phrasing", fa: "بندبندی" }, { en: "stagecraft", fa: "صحنه‌آرایی" }] },
            { id: "arts-music-ethnomusicology", name: { en: "Ethnomusicology", fa: "موسیقی‌شناسی" }, short: { en: "Ethnomusicology", fa: "موسیقی‌شناسی" }, summary: { en: "Music studied inside the life that makes and hears it.", fa: "موسیقی که در بسترِ زندگیِ سازنده و شنونده‌اش مطالعه می‌شود." }, tags: [{ en: "fieldwork", fa: "کار میدانی" }, { en: "oral tradition", fa: "سنت شفاهی" }, { en: "tuning", fa: "کوک" }] },
          ],
        },
        {
          id: "arts-cinema",
          name: { en: "Film & Cinema", fa: "سینما و فیلم" },
          short: { en: "Cinema", fa: "سینما" },
          summary: {
            en: "Narrative and image built from light, time and the moving frame.",
            fa: "روایت و تصویر، ساخته‌شده از نور، زمان و قاب متحرک.",
          },
          description: {
            en: "Film is the art of the recorded present, able to compress a century into a second or stretch a gesture across an afternoon. Its theory covers montage, mise-en-scène and the apparatus itself, and its practice ranges from the one-person bedroom film to the industrial-scale studio system.",
            fa: "فیلم هنرِ اکنونِ ضبط‌شده است؛ می‌تواند یک قرن را در یک ثانیه فشرده کند یا یک حرکت را تا عصر بکشد. نظریه‌اش مونتاژ، میزان‌سنجی و خودِ دستگاه را در بر می‌گیرد و شیوه‌هایش از فیلمِ تن‌نفرهٔ اتاق‌خوابی تا نظام استودیویی در مقیاس صنعت کشیده شده است.",
          },
          tags: [
            { en: "montage", fa: "مونتاژ" },
            { en: "image", fa: "تصویر" },
            { en: "apparatus", fa: "دستگاه" },
            { en: "duration", fa: "مدت" },
          ],
          children: [
            { id: "arts-cinema-theory", name: { en: "Film Theory", fa: "نظریهٔ سینما" }, short: { en: "Theory", fa: "نظریه" }, summary: { en: "How meaning is made from montage, framing and duration.", fa: "معنا چگونه از مونتاژ، قاب‌بندی و مدت زمان ساخته می‌شود." }, tags: [{ en: "montage", fa: "مونتاژ" }, { en: "mise-en-scène", fa: "میزان‌سنجی" }, { en: "semiotics", fa: "نشانه‌شناسی" }] },
            { id: "arts-cinema-directing", name: { en: "Directing", fa: "کارگردانی" }, short: { en: "Directing", fa: "کارگردانی" }, summary: { en: "Orchestrating performance, camera and design toward one screen intention.", fa: "هماهنگ‌کردن بازی، دوربین و طراحی به‌سوی یک نیتِ تصویری." }, tags: [{ en: "blocking", fa: "چیدمان صحنه" }, { en: "coverage", fa: "پوشش" }, { en: "performance", fa: "بازی" }] },
            { id: "arts-cinema-animation", name: { en: "Animation", fa: "انیمیشن" }, short: { en: "Animation", fa: "انیمیشن" }, summary: { en: "Frame-by-frame authorship of movement, from drawn to digital.", fa: " authorship فریم‌به‌فریمِ حرکت، از دست‌کشیده تا دیجیتال." }, tags: [{ en: "keyframe", fa: "فریم کلیدی" }, { en: "timing", fa: "زمان‌بندی" }, { en: "puppet", fa: "عروسکی" }] },
            { id: "arts-cinema-documentary", name: { en: "Documentary", fa: "مستند" }, short: { en: "Documentary", fa: "مستند" }, summary: { en: "Non-fiction film and its ethics of evidence and consent.", fa: "فیلم مستند و اخلاقِ شاهد و رضایت در آن." }, tags: [{ en: "ethnography", fa: "مردم‌نگاری" }, { en: "consent", fa: "رضایت" }, { en: "archive", fa: "بایگانی" }] },
          ],
        },
        {
          id: "arts-photography",
          name: { en: "Photography", fa: "عکاسی" },
          short: { en: "Photography", fa: "عکاسی" },
          summary: {
            en: "The chemically and optically fixed trace of light on a sensitive surface.",
            fa: "ردّ نور بر سطح حساس، تثبیت‌شده به‌وسیلهٔ شیمی و اپتیک.",
          },
          description: {
            en: "Photography's decisive invention was not the camera but the ability to fix an image permanently, which split the indexical trace of light from the drawn interpretation of it. It runs from chemical processes and platinum prints to sensor dynamics and computational imaging.",
            fa: "اختراع تعیین‌کنندهٔ عکاسی دوربین نبود، بلکه توانایی تثبیت دائمی تصویر بود؛ همین، اثر انگشتی نور را از تفسیرِ ترسیم‌شده جدا کرد. از فرایندهای شیمیایی و چاپ پلاتین تا پویایی حسگر و تصویربرداری محاسباتی کشیده شده است.",
          },
          tags: [
            { en: "indexical", fa: "نمودی" },
            { en: "exposure", fa: "نوردهی" },
            { en: "emulsion", fa: "امولسیون" },
            { en: "document", fa: "سند" },
          ],
          children: [
            { id: "arts-photography-history", name: { en: "Photographic History", fa: "تاریخ عکاسی" }, short: { en: "History", fa: "تاریخ" }, summary: { en: "How processes, institutions and claimed subjects shifted.", fa: "چگونه فرایندها، نهادها و سوژه‌های ادعایی دگرگون شدند." }, tags: [{ en: "process", fa: "فرایند" }, { en: "institution", fa: "نهاد" }, { en: "period", fa: "دوره" }] },
            { id: "arts-photography-darkroom", name: { en: "Darkroom & Chemical Process", fa: "تاریکخانه و فرایند شیمیایی" }, short: { en: "Darkroom", fa: "تاریکخانه" }, summary: { en: "Developing, fixing and toning the latent image.", fa: " ظهور، ثابت‌سازی و رنگ‌آذازی تصویر نهفته." }, tags: [{ en: "developer", fa: "ظهوردهنده" }, { en: "fixer", fa: "ثابت‌کننده" }, { en: "tone", fa: "تُن" }] },
            { id: "arts-photography-documentary", name: { en: "Documentary Photography", fa: "عکاسی مستند" }, short: { en: "Documentary", fa: "مستند" }, summary: { en: "The photographic claim to evidence, and its criticism.", fa: "ادعای عکس به‌مثابه شاهد، و نقدِ آن." }, tags: [{ en: "evidence", fa: "شاهد" }, { en: "street", fa: "خیابانی" }, { en: "staging", fa: "مقاله" }] },
            { id: "arts-photography-digital", name: { en: "Digital & Computational Imaging", fa: "تصویربرداری دیجیتال و محاسباتی" }, short: { en: "Digital", fa: "دیجیتال" }, summary: { en: "Sensor physics, colour science and the algorithmic image.", fa: "فیزیک حسگر، علم رنگ و تصویر الگوریتمی." }, tags: [{ en: "sensor", fa: "حسگر" }, { en: "RAW", fa: "خام" }, { en: "pipeline", fa: "خط لوله" }] },
          ],
        },
        {
          id: "arts-industrial-design",
          name: { en: "Industrial Design", fa: "طراحی صنعتی" },
          short: { en: "Ind. Design", fa: "طراحی صنعتی" },
          summary: {
            en: "Shaping manufactured objects for use, repair and lasting attachment.",
            fa: "شکل‌دادن به اشیای ساخته‌شده برای استفاده، تعمیر و دلبستگی پایدار.",
          },
          description: {
            en: "Industrial design is where the arts meet the factory: it takes a user need, a manufacturing process and a business model and resolves all three into a single object. Its ethics are increasingly about repairability, material honesty and how long a thing should be designed to last.",
            fa: "طراحی صنعتی جایی است که هنر با کارخانه روبه‌رو می‌شود: نیاز کاربر، فرایند تولید و مدل کسب‌وکار را می‌گیرد و هر سه را در یک شیء واحد حل می‌کند. اخلاقِ آن روزبه‌روز بیشتر دربارهٔ تعمیرپذیری، صداقت ماده و این پرسش است که یک چیز چقدر باید برای ماندن طراحی شود.",
          },
          tags: [
            { en: "manufacture", fa: "تولید" },
            { en: "ergonomics", fa: "ارگونومی" },
            { en: "repair", fa: "تعمیرپذیری" },
            { en: "mass production", fa: "تولید انبوه" },
          ],
          children: [
            { id: "arts-design-product", name: { en: "Product Design", fa: "طراحی محصول" }, short: { en: "Product", fa: "محصول" }, summary: { en: "From research through form, prototype and production release.", fa: "از پژوهش تا فرم، نمونهٔ اولیه و عرضهٔ تولید." }, tags: [{ en: "prototype", fa: "نمونهٔ اولیه" }, { en: "CMF", fa: "رنگ و جنس" }, { en: "iteration", fa: "تکرار" }] },
            { id: "arts-design-materials", name: { en: "Materials & Manufacturing", fa: "مواد و ساخت" }, short: { en: "Materials", fa: "مواد" }, summary: { en: "Choosing and processing materials for the behaviour wanted.", fa: "انتخاب و فرآوری ماده برای رفتارِ مطلوب." }, tags: [{ en: "polymer", fa: "پلیمر" }, { en: "moulding", fa: "قالب‌گیری" }, { en: "tolerance", fa: "تلورانس" }] },
            { id: "arts-design-ergonomics", name: { en: "Human Factors & Ergonomics", fa: "عوامل انسانی و ارگونومی" }, short: { en: "Ergonomics", fa: "ارگونومی" }, summary: { en: "Designing the fit between body, tool and task.", fa: "طراحی تناسب میان بدن، ابزار و کار." }, tags: [{ en: "anthropometry", fa: "آنتروپومتری" }, { en: "cognition", fa: "شناخت" }, { en: "error", fa: "خطا" }] },
            { id: "arts-design-sustainability", name: { en: "Sustainable Design", fa: "طراحی پایدار" }, short: { en: "Sustainability", fa: "پایداری" }, summary: { en: "Designing for disassembly, longevity and material recovery.", fa: "طراحی برای بازکردن، دوام و بازیافت ماده." }, tags: [{ en: "circularity", fa: "چرخش" }, { en: "lifecycle", fa: "چرخهٔ عمر" }, { en: "biomass", fa: "زیست‌توده" }] },
          ],
        },
      ],
    },
    {
      id: "applied-fields",
      name: { en: "Applied & Professional", fa: "رشته‌های کاربردی و حرفه‌ای" },
      short: { en: "Applied", fa: "کاربردی" },
      summary: {
        en: "The regulated professions that turn knowledge into licensed practice and public decision.",
        fa: "حرفه‌های نظام‌مندی که دانش را به کارِ دارای پروانه و تصمیم عمومی بدل می‌کنند.",
      },
      description: {
        en: "Applied fields are defined less by their own methods than by the institutions that license, certify and police them. Their knowledge is often procedural and tacit, held in apprenticeship and casework rather than in laboratories, and their authority comes as much from accountability as from expertise.",
        fa: "رشته‌های کاربردی کمتر با روش خود و بیشتر با نهادهایی تعریف می‌شوند که به آن‌ها پروانه می‌دهند، صلاحیت می‌سنجند و بر آن‌ها نظارت می‌کنند. دانشِ آن‌ها رویه‌ای و ضمنی است و در شاگردی و کارورزی نگهداری می‌شود نه در آزمایشگاه؛ و اقتدارشان به اندازهٔ تخصص، از پاسخ‌گویی می‌آید.",
      },
      accent: "amber",
      tags: [
        { en: "professional", fa: "حرفه‌ای" },
        { en: "regulation", fa: "نظام‌مندی" },
        { en: "licensure", fa: "پروانه" },
        { en: "apprenticeship", fa: "استادی" },
        { en: "public good", fa: "منفعت عمومی" },
      ],
      children: [
        {
          id: "applied-law",
          name: { en: "Law", fa: "حقوق" },
          short: { en: "Law", fa: "حقوق" },
          summary: {
            en: "Rules of obligation and remedy, applied to contested human situations.",
            fa: "قواعد تعهد و جبران خسارت، در برابر موقعیت‌های انسانیِ مورد منازعه.",
          },
          description: {
            en: "Law reasons in two kinds at once: from authoritative general rules, and from the particular texture of a case that no rule was written for. Its branches differ less in doctrine than in which institution and which remedy they serve.",
            fa: "حقوق هم‌زمان در دو گونه استدلال می‌کند: از قواعد عامّ الزام‌آور، و از بافتِ جزئیِ پرونده‌ای که هیچ قاعده‌ای برایش نوشته نشده. شاخه‌هایش بیش از آنکه در فقه اختلاف داشته باشند، در این نهاد و آن جبران متفاوت‌اند.",
          },
          tags: [
            { en: "obligation", fa: "تعهد" },
            { en: "remedy", fa: "جبران" },
            { en: "precedent", fa: "سابقه" },
            { en: "adjudication", fa: "داوری" },
          ],
          children: [
            { id: "applied-law-public", name: { en: "Public & Constitutional Law", fa: "حقوق عمومی و اساسی" }, short: { en: "Public", fa: "عمومی" }, summary: { en: "The constitution, state authority and the public interest.", fa: "قانون اساسی، اقتدار دولت و منفعت عمومی." }, tags: [{ en: "constitution", fa: "قانون اساسی" }, { en: "sovereignty", fa: "حاکمیت" }, { en: "judicial review", fa: "نظارت قضایی" }] },
            { id: "applied-law-private", name: { en: "Private & Commercial Law", fa: "حقوق خصوصی و تجاری" }, short: { en: "Private", fa: "خصوصی" }, summary: { en: "Contracts, property and obligations between private parties.", fa: "قراردادها، اموال و تعهدات میان اشخاص خصوصی." }, tags: [{ en: "contract", fa: "قرارداد" }, { en: "property", fa: "ملک" }, { en: "trust", fa: "امانی" }] },
            { id: "applied-law-international", name: { en: "International Law", fa: "حقوق بین‌الملل" }, short: { en: "International", fa: "بین‌الملل" }, summary: { en: "Legal relations among states and the institutions that govern them.", fa: "روابط حقوقی میان دولت‌ها و نهادهای اداره‌کنندهٔ آن‌ها." }, tags: [{ en: "treaty", fa: "معاهده" }, { en: "custom", fa: "عرف" }, { en: "jurisdiction", fa: "صلاحیت" }] },
            { id: "applied-law-criminal", name: { en: "Criminal Law & Justice", fa: "حقوق کیفری و عدالت" }, short: { en: "Criminal", fa: "کیفری" }, summary: { en: "Defining blame and the due process owed to the accused.", fa: "تعریف تقصیر و رویهٔ عادلانه‌ای که متهم مستحق آن است." }, tags: [{ en: "mens rea", fa: "قصد مجرمانه" }, { en: "due process", fa: "آیین دادرسی عادلانه" }, { en: "sentencing", fa: "مجازات" }] },
            { id: "applied-law-intellectual-property", name: { en: "Intellectual Property", fa: "مالکیت فکری" }, short: { en: "IP", fa: "فکری" }, summary: { en: "Ownership of inventions, works and marks as an intangible asset.", fa: "مالکیت اختراعات، آثار و علائم تجاری به‌مثابه دارایی ناملموس." }, tags: [{ en: "patent", fa: "حق اختراع" }, { en: "copyright", fa: "کپی‌رایت" }, { en: "licensing", fa: "مجوزدهی" }] },
          ],
        },
        {
          id: "applied-business",
          name: { en: "Business & Management", fa: "کسب‌وکار و مدیریت" },
          short: { en: "Business", fa: "مدیریت" },
          summary: {
            en: "Organising people and capital toward outcomes, under uncertainty.",
            fa: "سازمان‌دادنِ انسان و سرمایه برای رسیدن به نتیجه، در شرایط عدم‌قطعیت.",
          },
          description: {
            en: "Management studies the coordination of people who cannot be fully specified — the central difficulty that makes it a field rather than a technique. Its theories have moved from planned hierarchy through resource-based competition to adaptive and networked organisations.",
            fa: "مدیریت مطالعهٔ هماهنگیِ انسان‌هایی است که به‌تمامی تعریف‌پذیر نیستند — و همین دشواریِ مرکزی است که آن را به‌جای فن، به یک رشته بدل می‌کند. نظریه‌هایش از سلسله‌مراتب برنامه‌ریزی‌شده، به رقابت مبتنی بر منابع، و به سازمان‌های انطباقی و شبکه‌ای کوچ کرده است.",
          },
          tags: [
            { en: "coordination", fa: "هماهنگی" },
            { en: "strategy", fa: "راهبرد" },
            { en: "uncertainty", fa: "عدم‌قطعیت" },
            { en: "organisation", fa: "سازمان" },
          ],
          children: [
            { id: "applied-business-strategy", name: { en: "Strategy & Competitive Analysis", fa: "راهبرد و تحلیل رقابتی" }, short: { en: "Strategy", fa: "راهبرد" }, summary: { en: "Where a firm should position itself and how to defend it.", fa: "یک بنگاه کجا باید جای‌گیری کند و چگونه از آن دفاع کند." }, tags: [{ en: "positioning", fa: "جای‌گیری" }, { en: "moat", fa: "خندق" }, { en: "industry", fa: "صنعت" }] },
            { id: "applied-business-organisational", name: { en: "Organisational Behaviour", fa: "رفتار سازمانی" }, short: { en: "Org Behaviour", fa: "رفتار سازمانی" }, summary: { en: "Groups, power, culture and the informal life of firms.", fa: "گروه، قدرت، فرهنگ و زندگی غیررسمی در بنگاه." }, tags: [{ en: "culture", fa: "فرهنگ" }, { en: "power", fa: "قدرت" }, { en: "motivation", fa: "انگیزش" }] },
            { id: "applied-business-finance", name: { en: "Finance & Investment", fa: "مالی و سرمایه‌گذاری" }, short: { en: "Finance", fa: "مالی" }, summary: { en: "The pricing, allocation and risk of capital.", fa: "قیمت‌گذاری، تخصیص و ریسک سرمایه." }, tags: [{ en: "valuation", fa: "ارزش‌گذاری" }, { en: "risk", fa: "ریسک" }, { en: "portfolio", fa: "سبد" }] },
            { id: "applied-business-marketing", name: { en: "Marketing & Growth", fa: "بازاریابی و رشد" }, short: { en: "Marketing", fa: "بازاریابی" }, summary: { en: "Demand, positioning and the measurement of growth.", fa: "تقاضا، جای‌گیری و سنجش رشد." }, tags: [{ en: "demand", fa: "تقاضا" }, { en: "segmentation", fa: "بخش‌بندی" }, { en: "funnel", fa: "قیف" }] },
            { id: "applied-business-operations", name: { en: "Operations & Supply Chain", fa: "عملیات و زنجیرهٔ تأمین" }, short: { en: "Operations", fa: "عملیات" }, summary: { en: "Designing the flow of goods, information and work.", fa: "طراحی جریان کالا، اطلاعات و کار." }, tags: [{ en: "lean", fa: "ناب" }, { en: "logistics", fa: "لجستیک" }, { en: "throughput", fa: "توان عبوری" }] },
          ],
        },
        {
          id: "applied-education",
          name: { en: "Education", fa: "آموزش" },
          short: { en: "Education", fa: "آموزش" },
          summary: {
            en: "The deliberate design of learning, and the institutions that deliver it.",
            fa: "طراحی آگاهانهٔ یادگیری و نهادهایی که آن را عرضه می‌کنند.",
          },
          description: {
            en: "Education is the field in which a society decides what it will transmit and what it will let go. Its research base ranges from the cognitive science of how memory and transfer work to the institutional politics of curriculum, assessment and access.",
            fa: "آموزش رشته‌ای است که هر جامعه در آن تصمیم می‌گیرد چه چیزی را منتقل کند و چه چیزی را رها کند. پایهٔ پژوهشی‌اش از علوم شناختیِ حافظه و انتقال تا سیاست نهادیِ برنامه درسی، سنجش و دسترسی گسترده است.",
          },
          tags: [
            { en: "learning", fa: "یادگیری" },
            { en: "curriculum", fa: "برنامه درسی" },
            { en: "pedagogy", fa: "پداگوژی" },
            { en: "access", fa: "دسترسی" },
          ],
          children: [
            { id: "applied-education-pedagogy", name: { en: "Pedagogy & Curriculum", fa: "پداگوژی و برنامه درسی" }, short: { en: "Pedagogy", fa: "پداگوژی" }, summary: { en: "How sequences, tasks and feedback are designed.", fa: "طراحی توالی، تکلیف و بازخورد." }, tags: [{ en: "scaffolding", fa: "داربست" }, { en: "sequence", fa: "توالی" }, { en: "rubric", fa: "معیار" }] },
            { id: "applied-education-policy", name: { en: "Educational Policy & Systems", fa: "سیاست و نظام آموزشی" }, short: { en: "Policy", fa: "سیاست" }, summary: { en: "Governance, funding and evaluation of education systems.", fa: "حکمرانی، تأمین مالی و ارزیابی نظام‌های آموزشی." }, tags: [{ en: "governance", fa: "حکمرانی" }, { en: "equity", fa: "عدالت" }, { en: "accountability", fa: "پاسخ‌گویی" }] },
            { id: "applied-education-learning-sciences", name: { en: "Learning Sciences", fa: "علوم یادگیری" }, short: { en: "Learning Sci", fa: "علوم یادگیری" }, summary: { en: "Evidence on memory, transfer and productive failure.", fa: "شواهد دربارهٔ حافظه، انتقال و شکستِ مولد." }, tags: [{ en: "retrieval", fa: "بازیابی" }, { en: "spacing", fa: "فاصله‌گذاری" }, { en: "transfer", fa: "انتقال" }] },
            { id: "applied-education-higher", name: { en: "Higher & Adult Education", fa: "آموزش عالی و بزرگسال" }, short: { en: "Higher Ed", fa: "عالی" }, summary: { en: "Institutions beyond school, including lifelong and workplace learning.", fa: "نهادهای پس از مدرسه، از جمله یادگیری مادام‌العمر و سازمانی." }, tags: [{ en: "credential", fa: "مدرک" }, { en: "adult learner", fa: "یادگیرندهٔ بزرگسال" }, { en: "residence", fa: "اقامت" }] },
          ],
        },
        {
          id: "applied-journalism",
          name: { en: "Journalism & Communication", fa: "ژورنالیسم و ارتباطات" },
          short: { en: "Journalism", fa: "رسانه" },
          summary: {
            en: "Verified public reporting, and the study of how messages move.",
            fa: "گزارش عمومیِ راستی‌آزمایی‌شده و مطالعهٔ حرکت پیام‌ها.",
          },
          description: {
            en: "Journalism is the professional discipline of finding out and being accountable for the result. Its academic wing studies the institutions, ethics and effects that make such accountability possible or impossible in a given media system.",
            fa: "ژورنالیسم انضباط حرفه‌ایِ فهمیدن و پاسخ‌گو بودن از نتیجه است. شاخهٔ دانشگاهی‌اش نهادها، اخلاق و پیامدهایی را مطالعه می‌کند که چنین پاسخ‌گویی را در یک نظام رسانه‌ای معین ممکن یا ناممکن می‌کنند.",
          },
          tags: [
            { en: "verification", fa: "راستی‌آزمایی" },
            { en: "accountability", fa: "پاسخ‌گویی" },
            { en: "source", fa: "منبع" },
            { en: "media system", fa: "نظام رسانه‌ای" },
          ],
          children: [
            { id: "applied-journalism-reporting", name: { en: "Reporting & Investigation", fa: "گزارش و تحقیق" }, short: { en: "Reporting", fa: "گزارش" }, summary: { en: "Interview, records, data and documents as evidence.", fa: "مصاحبه، سوابق، داده و اسناد به‌مثابه شاهد." }, tags: [{ en: "sourcing", fa: "منبع‌یابی" }, { en: "FOIA", fa: "دسترسی به اطلاعات" }, { en: "verification", fa: "راستی‌آزمایی" }] },
            { id: "applied-journalism-media-studies", name: { en: "Media & Communication Studies", fa: "علم ارتباطات" }, short: { en: "Media", fa: "ارتباطات" }, summary: { en: "Media systems, representation and public opinion.", fa: "نظام‌های رسانه‌ای، بازنمایی و افکار عمومی." }, tags: [{ en: "representation", fa: "بازنمایی" }, { en: "ownership", fa: "مالکیت" }, { en: "agenda", fa: "دستورکار" }] },
            { id: "applied-journalism-film-tv", name: { en: "Television & Radio", fa: "تلویزیون و رادیو" }, short: { en: "Broadcast", fa: "پخش" }, summary: { en: "Scheduled sound and image as a mass medium.", fa: "صدا و تصویر زمان‌بندی‌شده به‌مثابه رسانهٔ جمعی." }, tags: [{ en: "schedule", fa: "شبکهٔ پخش" }, { en: "format", fa: "قالب" }, { en: "reach", fa: "دسترسی" }] },
            { id: "applied-journalism-digital", name: { en: "Digital & Platform Media", fa: "رسانه‌های دیجیتال و پلتفرمی" }, short: { en: "Digital", fa: "دیجیتال" }, summary: { en: "Platforms, algorithms and the attention they trade in.", fa: "پلتفرم‌ها، الگوریتم‌ها و توجهی که داد و ستد می‌کنند." }, tags: [{ en: "algorithm", fa: "الگوریتم" }, { en: "engagement", fa: "درگیری" }, { en: "moderation", fa: "نظارت بر محتوا" }] },
          ],
        },
        {
          id: "applied-military",
          name: { en: "Military & Strategic Studies", fa: "مطالعات نظامی و راهبردی" },
          short: { en: "Strategy", fa: "راهبرد" },
          summary: {
            en: "Coercive power, doctrine and the analysis of conflict.",
            fa: "قدرت اجبار، دکترین و تحلیل منازعه.",
          },
          description: {
            en: "Strategic studies treats organised violence as an institution with its own regularities, examined through history, political economy and decision theory. The discipline is deliberately double-faced: it studies defence and deterrence as well as the conduct of war.",
            fa: "مطالعات راهبردی خشونت سازمان‌یافته را نهادی با قوانین خود می‌بیند و از راه تاریخ، اقتصاد سیاسی و نظریهٔ تصمیم می‌کاود. این رشته آگاهانه دوجهته است: هم دفاع و بازدارندگی و هم راهبری جنگ را مطالعه می‌کند.",
          },
          tags: [
            { en: "deterrence", fa: "بازدارندگی" },
            { en: "doctrine", fa: "دکترین" },
            { en: "coercion", fa: "اجبار" },
            { en: "force", fa: "نیرو" },
          ],
          children: [
            { id: "applied-military-strategy", name: { en: "Strategy & Grand Strategy", fa: "راهبرد و راهبرد کلان" }, short: { en: "Strategy", fa: "راهبرد" }, summary: { en: "Matching means to ends across whole societies.", fa: "هماهنگ‌کردن ابزار با هدف در مقیاس یک جامعه." }, tags: [{ en: "doctrine", fa: "دکترین" }, { en: "alliance", fa: "ائتلاف" }, { en: "escalation", fa: "تشدید" }] },
            { id: "applied-military-international-relations", name: { en: "International Relations", fa: "روابط بین‌الملل" }, short: { en: "IR", fa: "روابط بین‌الملل" }, summary: { en: "How states and non-states interact under anarchy.", fa: "تعامل دولت‌ها و بازیگران غیردولتی در زیر بی‌سامانی جهانی." }, tags: [{ en: "anarchy", fa: "بی‌سامانی" }, { en: "institutions", fa: "نهادها" }, { en: "hegemony", fa: "هژمونی" }] },
            { id: "applied-military-security-studies", name: { en: "Security & Conflict Studies", fa: "مطالعات امنیت و منازعه" }, short: { en: "Security", fa: "امنیت" }, summary: { en: "War, its causes and its settlement.", fa: "جنگ، علل و صلح آن." }, tags: [{ en: "asymmetry", fa: "نامتقارنی" }, { en: "peacekeeping", fa: "حفظ صلح" }, { en: "trauma", fa: "شوک روانی" }] },
            { id: "applied-military-logistics", name: { en: "Military Logistics & Command", fa: "پشتیبانی و فرماندهی نظامی" }, short: { en: "Logistics", fa: "پشتیبانی" }, summary: { en: "Supply, doctrine and command under the fog of war.", fa: "رساندن تدارکات، دکترین و فرماندهی در مه جنگ." }, tags: [{ en: "supply", fa: "تدارکات" }, { en: "command", fa: "فرماندهی" }, { en: "readiness", fa: "آمادگی" }] },
          ],
        },
      ],
    },
    {
      id: "crafts-domestic",
      name: { en: "Crafts, Domestic & Practical Arts", fa: "صنایع دستی و هنرهای کاربردی" },
      short: { en: "Crafts", fa: "صنایع دستی" },
      summary: {
        en: "Material practices carried as knowledge: made by hand, by fire, by loom and by recipe.",
        fa: "دانشِ به‌شکلِ عمل: ساخته‌شده با دست، با آتش، با دستگاه بافندگی و با دستور آشپزی.",
      },
      description: {
        en: "These are the fields that never fully became professions, carrying technique at a resolution no textbook holds. Their knowledge is embodied — held in the hands, timed by feel, and transmitted by apprenticeship — and their survival depends on materials, apprenticeships and markets rather than on universities.",
        fa: "این‌ها رشته‌هایی‌اند که هرگز به‌تمامی حرفه‌ای نشدند و دانشِ فنی را در وضوحی نگه می‌دارند که هیچ کتابی توان نگهدارش‌اش نیست. دانششان تن‌بدنی است — در دست، با حس، و از راه شاگردی منتقل می‌شود — و دوامشان به مواد، استادان و بازار بستگی دارد نه به دانشگاه.",
      },
      accent: "verdigris",
      tags: [
        { en: "craft", fa: "صنعت دستی" },
        { en: "material", fa: "ماده" },
        { en: "apprenticeship", fa: "استادی" },
        { en: "transmission", fa: "انتقال" },
        { en: "kitchen", fa: "آشپزخانه" },
      ],
      children: [
        {
          id: "crafts-culinary",
          name: { en: "Culinary Arts", fa: "هنرهای آشپزی" },
          short: { en: "Culinary", fa: "آشپزی" },
          summary: {
            en: "The transformation of raw ingredients into nourishment and occasion.",
            fa: "تبدیل مواد خام به خوراک و به مناسبت.",
          },
          description: {
            en: "Cooking is chemistry that must be repeated exactly enough to be recognised. A cuisine is a closed system of techniques, preserved foods and rules of combination, and it is written down last and understood only by doing.",
            fa: "آشپزی شیمی‌ای است که باید به‌اندازهٔ کافی دقیق تکرار شود تا شناخته شود. هر آشپزی سامانه‌ای بسته از فنون، خوراک‌های ماندگار و قواعد ترکیب است؛ و آخر از همه نوشته می‌شود و تنها با انجام‌دادن فهمیده می‌شود.",
          },
          tags: [
            { en: "technique", fa: "فن" },
            { en: "fermentation", fa: "تخمیر" },
            { en: "seasonality", fa: "فصلی" },
            { en: "plating", fa: "سرو" },
          ],
          children: [
            { id: "crafts-culinary-techniques", name: { en: "Techniques & Heat", fa: "فنون و حرارت" }, short: { en: "Techniques", fa: "فنون" }, summary: { en: "Roasting, emulsification, fermentation and the rest.", fa: "برشته‌سازی، امولسیون، تخمیر و باقی." }, tags: [{ en: "emulsification", fa: "امولسیون" }, { en: "sear", fa: "برشتگی" }, { en: "stock", fa: "عصاره" }] },
            { id: "crafts-culinary-pastry", name: { en: "Pastry & Confectionery", fa: "قنادی و شیرینی‌پزی" }, short: { en: "Pastry", fa: "قنادی" }, summary: { en: "Lamination, sugar work and the architecture of pastry.", fa: "لایه‌سازی، کار با شکر و معماری خمیر." }, tags: [{ en: "lamination", fa: "لایه‌سازی" }, { en: "sugar", fa: "شکر" }, { en: "laminate", fa: "رقیق" }] },
            { id: "crafts-culinary-preservation", name: { en: "Preservation & Fermentation", fa: "نگهداری و تخمیر" }, short: { en: "Preservation", fa: "نگهداری" }, summary: { en: "Salt, acid, sugar, smoke and time as preservation.", fa: "نمک، اسید، شکر، دود و زمان به‌مثابه نگهدارنده." }, tags: [{ en: "lacto-ferment", fa: "تخمیر لاکتیک" }, { en: "canning", fa: "کنسرو" }, { en: "cellar", fa: "انبار" }] },
            { id: "crafts-culinary-regional", name: { en: "Regional & Historical Cuisines", fa: "آشپزی‌های بومی و تاریخی" }, short: { en: "Regional", fa: "بومی" }, summary: { en: "How place, trade and climate shape a repertoire.", fa: "چگونه مکان، تجارت و اقلیم، مخزنی از غذاها را می‌سازند." }, tags: [{ en: "terroir", fa: "سرزمین" }, { en: "trade route", fa: "راه بازرگانی" }, { en: "identity", fa: "هویت" }] },
          ],
        },
        {
          id: "crafts-textiles",
          name: { en: "Textiles & Weaving", fa: "نساجی و بافندگی" },
          short: { en: "Textiles", fa: "نساجی" },
          summary: {
            en: "Thread made into cloth: spinning, weaving, dyeing and embroidery.",
            fa: "نخ به پارچه: ریسندگی، بافندگی، رنگرزی و سوزن‌دوزی.",
          },
          description: {
            en: "Textile work is the manipulation of one property — the continuity of fibre — into structure and pattern. Every culture has solved it independently, and the loom is among the most consequential machines humans have built.",
            fa: "کار نساجی، تبدیل یک ویژگی — پیوستگیِ الیاف — به ساختار و نقش است. هر فرهنگی مستقل به آن رسیده و دستگاه بافندگی در شمار تأثیرگذارترین ماشین‌هایی است که بشر ساخته است.",
          },
          tags: [
            { en: "fibre", fa: "الیاف" },
            { en: "loom", fa: "دستگاه بافندگی" },
            { en: "dye", fa: "رنگ" },
            { en: "pattern", fa: "نقش" },
          ],
          children: [
            { id: "crafts-textiles-spinning", name: { en: "Spinning & Fibre", fa: "ریسندگی و الیاف" }, short: { en: "Spinning", fa: "ریسندگی" }, summary: { en: "Preparing and twisting fibre into continuous yarn.", fa: "آماده‌سازی و تابیدن الیاف به نخ پیوسته." }, tags: [{ en: "drum", fa: "دوک" }, { en: "ply", fa: "تاب" }, { en: "gin", fa: "شانه" }] },
            { id: "crafts-textiles-weaving", name: { en: "Weaving & Loom Craft", fa: "بافندگی و کار دستگاه" }, short: { en: "Weaving", fa: "بافندگی" }, summary: { en: "Interlacing warp and weft into cloth structures.", fa: "تلاقی نخِ تار و پود در ساختار پارچه." }, tags: [{ en: "warp", fa: "تار" }, { en: "tapestry", fa: "نقش‌ماه" }, { en: "heddle", fa: "دفت" }] },
            { id: "crafts-textiles-dyeing", name: { en: "Dyeing & Colour", fa: "رنگرزی و رنگ" }, short: { en: "Dyeing", fa: "رنگرزی" }, summary: { en: "Mordants, vats and the chemistry of colour fastness.", fa: "دندانه‌ها، خَمره‌ها و شیمی ماندگاری رنگ." }, tags: [{ en: "mordant", fa: "دندانه" }, { en: "indigo", fa: "نیل" }, { en: "fastness", fa: "ثبات" }] },
            { id: "crafts-textiles-embroidery", name: { en: "Embroidery & Surface", fa: "سوزن‌دوزی و سطح" }, short: { en: "Embroidery", fa: "سوزن‌دوزی" }, summary: { en: "Adding structure and image onto the finished ground.", fa: "افزودن ساختار و تصویر بر زمین آماده." }, tags: [{ en: "count", fa: "شمارش" }, { en: "sashiko", fa: "ساشیکو" }, { en: " appliqué", fa: "تکه‌دوزی" }] },
          ],
        },
        {
          id: "crafts-woodworking",
          name: { en: "Woodworking & Carpentry", fa: "نجاری و چوب‌کاری" },
          short: { en: "Wood", fa: "نجاری" },
          summary: {
            en: "Reading and cutting timber into structure, joinery and objects.",
            fa: "خواندن چوب و بریدنش به سازه، اتصال و اشیا.",
          },
          description: {
            en: "Wood asks you to read it: grain direction, moisture and the odd knot decide what a board can become. Traditional joinery reaches its strength by geometry rather than fasteners, which is why a mortise-and-tenon can outlast the metal around it.",
            fa: "چوب از تو می‌خواهد آن را بخوانی: جهت بافت، رطوبت و گرهٔ سرگردش تعیین می‌کنند یک تخته چه می‌تواند بشود. اتصالات سنتی استحکامشان را از هندسه می‌گیرند نه از اتصالات فلزی؛ به همین است که نر و مادگی می‌تواند از فلزِ پیرامونش دوام بیاورد.",
          },
          tags: [
            { en: "grain", fa: "بافت" },
            { en: "joinery", fa: "اتصال" },
            { en: "moisture", fa: "رطوبت" },
            { en: "hardwood", fa: "سخت‌چوب" },
          ],
          children: [
            { id: "crafts-wood-hand-tools", name: { en: "Hand Tools & Joinery", fa: "ابزار دستی و اتصالات" }, short: { en: "Hand Tools", fa: "ابزار" }, summary: { en: "Saws, planes, chisels and the joints they cut.", fa: "اره، رنده، قلم و اتصالاتی که می‌زنند." }, tags: [{ en: "mortise", fa: "نر" }, { en: "tenon", fa: "مادگی" }, { en: "dovetail", fa: "نوزنی" }] },
            { id: "crafts-wood-machining", name: { en: "Machine & CNC Woodworking", fa: "ماشین‌آلات و فرزکاری" }, short: { en: "Machining", fa: "ماشین" }, summary: { en: "Precision milling, routing and digital cutting.", fa: "فرزکاری دقیق، اور فرز و برش دیجیتال." }, tags: [{ en: "router", fa: "دستگاه فرز" }, { en: "kerf", fa: "برش" }, { en: "CNC", fa: "سی ان سی" }] },
            { id: "crafts-wood-finishing", name: { en: "Finishes & Surfaces", fa: "پرداخت و سطح" }, short: { en: "Finishing", fa: "پرداخت" }, summary: { en: "Oils, lacquers, oils-and-wax and the repair of wear.", fa: "روغن، لاک، روغن و موم و ترمیم سایش." }, tags: [{ en: "danish oil", fa: "روغن دانمارکی" }, { en: "lacquer", fa: "لاک" }, { en: "wax", fa: "موم" }] },
            { id: "crafts-wood-furniture", name: { en: "Furniture & Cabinetmaking", fa: "مبلمان و کابینت‌سازی" }, short: { en: "Furniture", fa: "مبل" }, summary: { en: "Where joinery becomes an object meant to be lived with.", fa: "جایی که اتصالات به شیئی برای زیستن بدل می‌شود." }, tags: [{ en: "proportion", fa: "تناسب" }, { en: "drawer", fa: "کشو" }, { en: "ergonomics", fa: "ارگونومی" }] },
          ],
        },
        {
          id: "crafts-ceramics",
          name: { en: "Ceramics & Glass", fa: "سرامیک و شیشه" },
          short: { en: "Ceramics", fa: "سرامیک" },
          summary: {
            en: "Working clay and silica through heat into brittle, permanent form.",
            fa: "کارِ رس و سیلیس در گرما به فرمی شکننده و ماندگار.",
          },
          description: {
            en: "Ceramics is defined by a change of state it cannot take back: once vitrified, the clay is no longer repairable and must be understood before firing, not after. That irreversibility is the whole discipline in miniature.",
            fa: "سرامیک با دگرگونی‌ای تعریف می‌شود که بازگشت‌پذیر نیست: پس از ذوب، دیگر نمی‌توان clay را ترمیم کرد و باید پیش از پخت بفهمی، نه پس از آن. همین برگشت‌ناپذیری، تمام انضباط را در خود فشرده است.",
          },
          tags: [
            { en: "clay body", fa: "بدنهٔ رسی" },
            { en: "kiln", fa: "کوره" },
            { en: "glaze", fa: "لعاب" },
            { en: "vitrification", fa: "شکلین" },
          ],
          children: [
            { id: "crafts-ceramics-throwing", name: { en: "Throwing & Handbuilding", fa: "چرخ‌سازی و ساخت دستی" }, short: { en: "Handbuilding", fa: "دستی" }, summary: { en: "Centring, coiling and slab construction.", fa: "مرکزگیری، لوله‌پیچی و ساخت باورق." }, tags: [{ en: "wheel", fa: "چرخ" }, { en: "coil", fa: "لوله" }, { en: "slab", fa: "ورق" }] },
            { id: "crafts-ceramics-glaze", name: { en: "Glazes & Surface", fa: "لعاب و سطح" }, short: { en: "Glazes", fa: "لعاب" }, summary: { en: "Silicate chemistry, oxides and fired surfaces.", fa: "شیمی سیلیکات، اکسیدها و سطح پخته." }, tags: [{ en: "oxide", fa: "اکسید" }, { en: "reduction", fa: "احیا" }, { en: "crazing", fa: "ترک لعاب" }] },
            { id: "crafts-ceramics-kiln", name: { en: "Kiln Craft & Firing", fa: "کوره‌سازی و پخت" }, short: { en: "Kiln", fa: "کوره" }, summary: { en: "Atmosphere, schedules and the control of heat.", fa: "جو کوره، برنامهٔ پخت و کنترل حرارت." }, tags: [{ en: "atmosphere", fa: "اتمسفر" }, { en: "ramp", fa: "شیب دما" }, { en: "cone", fa: "مخروط" }] },
            { id: "crafts-ceramics-glass", name: { en: "Glassworking", fa: "شیشه‌گری" }, short: { en: "Glass", fa: "شیشه" }, summary: { en: "Hot-forming glass: blowing, moulding and cold-working.", fa: "شکل‌دهی گرم شیشه: دمش، قالب‌گیری و کارسازی سرد." }, tags: [{ en: "gathering", fa: "گردآوری" }, { en: "annealing", fa: "آنیل" }, { en: "lampwork", fa: "کارِ چراغ" }] },
          ],
        },
        {
          id: "crafts-horology",
          name: { en: "Horology & Instrument Making", fa: "ساعت‌سازی و ساخت ابزار" },
          short: { en: "Horology", fa: "ساعت‌سازی" },
          summary: {
            en: "Measuring time and other physical quantities with disciplined tolerance.",
            fa: "سنجش زمان و دیگر کمیت‌های فیزیکی با تلورانسی انضباط‌شده.",
          },
          description: {
            en: "Horology sits at the meeting point of mechanics, accuracy and craft: escapements, balances and hairsprings are all ways of persuading matter to keep better time than the human body. Its tolerances are unforgiving, which is why it matured early and stayed small.",
            fa: "ساعت‌سازی بر سرِ هم‌گرایی مکانیک، دقت و صنعت است: دیده‌زن، وزنه و فنر همه راه‌هایی‌اند برای واداشتن ماده به اینکه بهتر از بدن انسان زمان را نگه دارد. تلورانس‌اش بی‌رحم است؛ به همین سبب زود بالغ شد و کوچک ماند.",
          },
          tags: [
            { en: "escapement", fa: "دیده‌زن" },
            { en: "tolerance", fa: "تلورانس" },
            { en: "regulation", fa: "تنظیم" },
            { en: "calibration", fa: "کالیبراسیون" },
          ],
          children: [
            { id: "crafts-horology-mechanical", name: { en: "Mechanical Watches", fa: "ساعت‌های مکانیکی" }, short: { en: "Mechanical", fa: "مکانیکی" }, summary: { en: "Mainspring, gear train, escapement and balance.", fa: "فنر، چرخ‌دنده، دیده‌زن و وزنه." }, tags: [{ en: "mainspring", fa: "فنر کوک" }, { en: "jewelling", fa: "سنگ‌تراشی" }, { en: "power reserve", fa: "ذخیرهٔ توان" }] },
            { id: "crafts-horology-precision", name: { en: "Precision & Marine Chronometry", fa: "کرونومتری دقیق" }, short: { en: "Chronometry", fa: "زمان‌سنجی" }, summary: { en: "Clocks rigorous enough to define a second.", fa: "ساعت‌هایی به دقتی که ثانیه را تعریف می‌کنند." }, tags: [{ en: "isochronism", fa: "ایزوکرونیسم" }, { en: "rating", fa: "تنظیم" }, { en: "detent", fa: "ضربه‌گیر" }] },
            { id: "crafts-horology-instruments", name: { en: "Scientific Instrument Making", fa: "ساخت ابزار علمی" }, short: { en: "Instruments", fa: "ابزار" }, summary: { en: "Theodolites, lenses, balances and their calibration.", fa: "تردولیت، عدسی، ترازو و کالیبراسیون آن‌ها." }, tags: [{ en: "graticule", fa: "شبکه" }, { en: "calibration", fa: "کالیبراسیون" }, { en: "optics", fa: "اپتیک" }] },
            { id: "crafts-horology-restoration", name: { en: "Conservation & Restoration", fa: "مرمت و احیا" }, short: { en: "Restoration", fa: "مرمت" }, summary: { en: "Repair while preserving evidence of original making.", fa: "ترمیم، با حفظ شاهدِ ساخت اصلی." }, tags: [{ en: "provenance", fa: "provenanc" }, { en: "patina", fa: "پتینه" }, { en: "reversible", fa: "برگشت‌پذیر" }] },
          ],
        },
        {
          id: "crafts-traditional-medicine",
          name: { en: "Traditional Medicine Practices", fa: "دانسته‌های درمانی بومی" },
          short: { en: "Trad. Med", fa: "درمان بومی" },
          summary: {
            en: "Health knowledge built over long observation, outside written theory.",
            fa: "دانشِ سلامت که از مشاهدهٔ طولانی و بیرون از نظریهٔ مکتوب ساخته شده.",
          },
          description: {
            en: "Traditional systems — herbal, animal, manual and spiritual — encode real observations in a framework that does not translate cleanly into biomedicine. They are studied both as living practice, worth protecting and testing, and as historical documents about how bodies were understood.",
            fa: "سامانه‌های بومی — گیاهی، جانوری، دستی و معنوی — مشاهده‌های واقعی را در چارچوبی رمزگذاری می‌کنند که به‌آسانی به زیست‌پزشکی ترجمه نمی‌شود. هم به‌مثابه عملی زنده — که ارزش نگهداری و آزمون دارد — و هم به‌مثابه سندی تاریخی دربارهٔ درک انسان از بدن مطالعه می‌شوند.",
          },
          tags: [
            { en: "empiricism", fa: "تجربه‌گرایی" },
            { en: "herbal", fa: "گیاهی" },
            { en: "diagnosis", fa: "تشخیص" },
            { en: "continuity", fa: "پیوستگی" },
          ],
          children: [
            { id: "crafts-traditional-medicine-pharmacopoeia", name: { en: "Pharmacopoeia & Materia Medica", fa: "داروشناسی و مفرده" }, short: { en: "Materia Medica", fa: "مفرده" }, summary: { en: "What each substance is and what it is held to do.", fa: "اینکه هر ماده چیست و به چه کاری شناخته شده است." }, tags: [{ en: "herb", fa: "گیاه" }, { en: "dosage", fa: "دوز" }, { en: "toxicology", fa: "سم‌شناسی" }] },
            { id: "crafts-traditional-medicine-manual", name: { en: "Manual & Physical Therapies", fa: "درمان‌های دستی و جسمانی" }, short: { en: "Manual", fa: "دستی" }, summary: { en: "Hands-on technique for pain, tension and circulation.", fa: "فنون دستی برای درد، تنش و گردش خون." }, tags: [{ en: "palpation", fa: "لمس" }, { en: "mobilisation", fa: "جابه‌جایی" }, { en: "pressure", fa: "فشار" }] },
            { id: "crafts-traditional-medicine-diagnosis", name: { en: "Systems of Diagnosis", fa: "سامانه‌های تشخیص" }, short: { en: "Diagnosis", fa: "تشخیص" }, summary: { en: "How a traditional practitioner reads a body.", fa: "اینکه یک درمانگر بومی چگونه بدن را می‌خواند." }, tags: [{ en: "pulse", fa: "نبض" }, { en: "aetiology", fa: "اتیولوژی" }, { en: "case history", fa: "شرح‌حال" }] },
            { id: "crafts-traditional-medicine-preservation", name: { en: "Preservation & Documentation", fa: "حفظ و مستندسازی" }, short: { en: "Preservation", fa: "حفظ" }, summary: { en: "Keeping practice alive without freezing it.", fa: "زنده نگه‌داشتن عمل، بدون منجمد کردنش." }, tags: [{ en: "biodiversity", fa: "تنوع زیستی" }, { en: "oral transmission", fa: "انتقال شفاهی" }, { en: "safety", fa: "ایمنی" }] },
          ],
        },
      ],
    },
    {
      id: "beliefs-myth",
      name: { en: "Beliefs, Myth & Speculation", fa: "باورها، اسطوره و تأمل" },
      short: { en: "Beliefs", fa: "باورها" },
      summary: {
        en: "The domains of what is believed, told and asked — examined without contempt.",
        fa: "قلمروِ آنچه باور می‌شود، گفته می‌شود و پرسیده می‌شود — بدون تحقیر.",
      },
      description: {
        en: "These fields take seriously the structures people build to live by — narrative, ritual, symbol and hope — whether or not those structures are true. They are studied as psychology, as anthropology, as history, and sometimes as theology, and they ask what a body of belief does to the people who hold it.",
        fa: "این رشته‌ها سازه‌هایی را که مردم برای زیستن می‌سازند — روایت، آیین، نماد و امید — جدی می‌گیرند، چه درست باشند چه نادرست. آن‌ها را هم‌زمان روان‌شناسی، مردم‌نگاری، تاریخ و گاه کلام، مطالعه می‌کنند؛ و می‌پرسند یک نظام باور با کسانی که آن را دارند چه می‌کند.",
      },
      accent: "violet",
      tags: [
        { en: "belief", fa: "باور" },
        { en: "symbol", fa: "نماد" },
        { en: "narrative", fa: "روایت" },
        { en: "meaning", fa: "معنا" },
        { en: "ritual", fa: "آیین" },
      ],
      children: [
        {
          id: "beliefs-philosophy-mind",
          name: { en: "Philosophy of Mind", fa: "فلسفهٔ ذهن" },
          short: { en: "Mind", fa: "ذهن" },
          summary: {
            en: "What minds are, and how they could be related to bodies.",
            fa: "ذهن‌ها چه هستند و چه نسبتی با بدن‌ها دارند.",
          },
          description: {
            en: "Philosophy of mind is the attempt to say what mental states are — beliefs, desires, experience — in terms that do not quietly presuppose the very thing being explained. It carries the field's hardest problem: why physical process should come with felt experience at all.",
            fa: "فلسفهٔ ذهن کوششی است برای گفتن از اینکه حالت‌های ذهنی — باور، خواهش، تجربه — چه هستند، با اصطلاحاتی که بی‌صدا همان چیزی را که در حال توضیح است presuppose نکنند. دشوارترین مسئلهٔ رشته را حمل می‌کند: چرا فرایند فیزیکی باید اصلاً با تجربهٔ زیسته همراه باشد.",
          },
          tags: [
            { en: "consciousness", fa: "آگاهی" },
            { en: "qualia", fa: "کیفیت محسوس" },
            { en: "intentionality", fa: "نیت‌مندی" },
            { en: "embodiment", fa: "جسمانیت" },
          ],
          children: [
            { id: "beliefs-mind-consciousness", name: { en: "Consciousness", fa: "آگاهی" }, short: { en: "Consciousness", fa: "آگاهی" }, summary: { en: "Subjective experience and its neural correlates.", fa: "تجربهٔ ذهنی و همبسته‌های عصبی آن." }, tags: [{ en: "qualia", fa: "کیفیت محسوس" }, { en: "binding", fa: "یکپارچگی" }, { en: "threshold", fa: "آستانه" }] },
            { id: "beliefs-mind-philosophy", name: { en: "Philosophy of Action", fa: "فلسفهٔ کنش" }, short: { en: "Action", fa: "کنش" }, summary: { en: "Free will, intention and the source of action.", fa: "ارادهٔ آزاد، نیت و منشأ کنش." }, tags: [{ en: "free will", fa: "ارادهٔ آزاد" }, { en: "intention", fa: "قصد" }, { en: "compatibilism", fa: "سازگارنمایی" }] },
            { id: "beliefs-mind-computational", name: { en: "Computational & AI Philosophy", fa: "فلسفهٔ محاسباتی و هوش مصنوعی" }, short: { en: "AI Philosophy", fa: "فلسفهٔ هوش مصنوعی" }, summary: { en: "What computation is, and whether it explains thinking.", fa: "محاسبه چیست، و آیا تفکر را توضیح می‌دهد." }, tags: [{ en: "computation", fa: "محاسبه" }, { en: "representation", fa: "بازنمایی" }, { en: "Chinese room", fa: "اتاق چینی" }] },
            { id: "beliefs-mind-language", name: { en: "Philosophy of Language", fa: "فلسفهٔ زبان" }, short: { en: "Language", fa: "زبان" }, summary: { en: "Reference, meaning and how words reach the world.", fa: "ارجاع، معنا و چگونگی رسیدن واژه‌ها به جهان." }, tags: [{ en: "reference", fa: "ارجاع" }, { en: "meaning", fa: "معنا" }, { en: "speech act", fa: "کنش گفتاری" }] },
          ],
        },
        {
          id: "beliefs-mythology",
          name: { en: "Mythology", fa: "اسطوره‌شناسی" },
          short: { en: "Mythology", fa: "اسطوره" },
          summary: {
            en: "Narrative cosmologies — how cultures narrate origin, order and descent.",
            fa: "کیهان‌شناسی‌های روایی — چگونه فرهنگ‌ها آغاز، نظم و تبار را روایت می‌کنند.",
          },
          description: {
            en: "Mythology collects the stories by which societies explain to themselves where things came from and how they hold together. Read closely they are also technical archives: the Polynesian wave navigators encoded real ocean knowledge in chant, and Vedic fire hymns encode metallurgy.",
            fa: "اسطوره‌شناسی داستان‌هایی را گرد می‌آورد که جوامع با آن‌ها برای خود توضیح می‌دهند اشیا از کجا آمدند و چگونه کنار هم می‌مانند. اگر دقیق خوانده شوند بایگانی‌های فنی نیز هستند: دریانوردان پلینزیایی دانش اقیانوسی واقعی را در نیایش رمز کردند و سرودهای آتش ودایی، متالورژی را.",
          },
          tags: [
            { en: "origin", fa: "آغاز" },
            { en: "cosmology", fa: "کیهان‌شناسی" },
            { en: "oral tradition", fa: "سنت شفاهی" },
            { en: "ritual", fa: "آیین" },
          ],
          children: [
            { id: "beliefs-mythology-comparative", name: { en: "Comparative Mythology", fa: "اسطوره‌شناسی تطبیقی" }, short: { en: "Comparative", fa: "تطبیقی" }, summary: { en: "Motifs, functions and patterns across cultures.", fa: "مضامین، کارکردها و الگوها در فرهنگ‌ها." }, tags: [{ en: "motif", fa: "مضمون" }, { en: "monomyth", fa: "تک‌اسطوره" }, { en: "etiology", fa: "علت‌شناسی" }] },
            { id: "beliefs-mythology-greek", name: { en: "Greek & Roman Myth", fa: "اسطورهٔ یونان و روم" }, short: { en: "Classical", fa: "کلاسیک" }, summary: { en: "The pantheon that still underwrites Western letters.", fa: "خدایانی که هنوز زیربنای ادبیات غرب‌اند." }, tags: [{ en: "olympus", fa: "المپ" }, { en: "genealogy", fa: "تبارنامه" }, { en: "etiological", fa: "علت‌ساز" }] },
            { id: "beliefs-mythology-regional", name: { en: "Regional & Living Traditions", fa: "سنن بومی و زنده" }, short: { en: "Regional", fa: "بومی" }, summary: { en: "Traditions still practised rather than only recorded.", fa: "سننی که هنوز اجرا می‌شوند، نه صرفاً ثبت." }, tags: [{ en: "living tradition", fa: "سنت زنده" }, { en: "veneration", fa: "نیایش" }, { en: "performance", fa: "اجرا" }] },
            { id: "beliefs-mythology-iconography", name: { en: "Mythology in Art & Media", fa: "اسطوره در هنر و رسانه" }, short: { en: "In Art", fa: "در هنر" }, summary: { en: "How old stories are retold through new forms.", fa: "بازگویی داستان‌های کهن در قالب‌های تازه." }, tags: [{ en: "adaptation", fa: "اقتباس" }, { en: "allegory", fa: "تمثیل" }, { en: "reception", fa: "دریافت" }] },
          ],
        },
        {
          id: "beliefs-eschatology",
          name: { en: "Eschatology & Ultimate Concerns", fa: "فرجام‌شناسی و دغدغه‌های نهایی" },
          short: { en: "Eschatology", fa: "فرجام" },
          summary: {
            en: "Systematic accounts of ending, judgment and what lies beyond.",
            fa: "حساب‌های نظام‌مندِ پایان، داوری و آنچه فراتر از آن است.",
          },
          description: {
            en: "Eschatology is where religious traditions become explicit about death, judgment and the end of the present order. Studied comparatively it reveals that the afterlife is never simply heaven or hell — it is usually a continuation, a reversal, or a reckoning of debts owed.",
            fa: "فرجام‌شناسی جایی است که سنن دینی دربارهٔ مرگ، داوری و پایان نظام کنونی صریح می‌شوند. اگر تطبیقی خوانده شود آشکار می‌کند که آنچه در آن سوی زندگی است هرگز صرفاً بهشت یا دوزخ نیست — معمولاً امتداد است، یا وارونگی، یا حسابِ بدهی‌هایی که بر پیش است.",
          },
          tags: [
            { en: "end times", fa: "رستاخیز" },
            { en: "judgment", fa: "داوری" },
            { en: "salvation", fa: "نجات" },
            { en: "time", fa: "زمان" },
          ],
          children: [
            { id: "beliefs-eschatology-apocalyptic", name: { en: "Apocalyptic & Messianic", fa: "آخرالزمان و مهدویت" }, short: { en: "Apocalyptic", fa: "آخرالزمان" }, summary: { en: "Scriptures of catastrophe, deliverance and a coming order.", fa: "متن‌های فاجعه، رهایی و نظمی که در راه است." }, tags: [{ en: "apocalypse", fa: "رستاخیز" }, { en: "messiah", fa: "مهدی" }, { en: "prophecy", fa: "پیش‌گویی" }] },
            { id: "beliefs-eschatology-afterlife", name: { en: "Afterlife & Judgment", fa: "آن جهان و داوری" }, short: { en: "Afterlife", fa: "آن جهان" }, summary: { en: "Conceptions of post-mortem existence and moral weighing.", fa: "تصورهای از هستی پس از مرگ و سنجش اخلاقی." }, tags: [{ en: "reincarnation", fa: "تناسخ" }, { en: "weighing", fa: "سنجش" }, { en: "paradise", fa: "بهشت" }] },
            { id: "beliefs-eschatology-sacred-time", name: { en: "Sacred Time & Calendar", fa: "زمان مقدس و تقویم" }, short: { en: "Sacred Time", fa: "زمان مقدس" }, summary: { en: "Calendars, cycles and the marking of holy days.", fa: "تقویم‌ها، چرخه‌ها و نشانه‌گذاری روزهای مقدس." }, tags: [{ en: "liturgical year", fa: "سال فربتی" }, { en: "cycle", fa: "چرخه" }, { en: "festival", fa: "جشن" }] },
            { id: "beliefs-eschatology-philosophical", name: { en: "Philosophical Cosmology", fa: "کیهان‌شناسی فلسفی" }, short: { en: "Cosmology", fa: "کیهان‌شناسی" }, summary: { en: "What exists, whether anything does, and what would count as an answer.", fa: "چه چیزی هست، آیا چیزی هست، و چه چیزی پاسخ را تشکیل می‌دهد." }, tags: [{ en: "ontology", fa: "هستی‌شناسی" }, { en: "teleology", fa: "غایت‌شناسی" }, { en: "modal", fa: "امکانی" }] },
          ],
        },
        {
          id: "beliefs-occult",
          name: { en: "Occult & Esoteric Traditions", fa: "سنن رمزی و باطنی" },
          short: { en: "Occult", fa: "رمزی" },
          summary: {
            en: "Systems that posit a hidden order beneath the visible one.",
            fa: "سامانه‌هایی که نظمی پنهان زیر ظاهر را فرض می‌کنند.",
          },
          description: {
            en: "Occult traditions are those in which knowledge is claimed to be unavailable by ordinary means — requiring instead secrecy, initiation or a method of attention. Modern scholarship reads them both as failed physics and as serious attempts to theorise the mind's relation to hidden causes.",
            fa: "سنن رمزی آن‌هایی‌اند که در آن‌ها دانش با راه‌های معمول در دسترس نیست و نیازمند رازداری، پایان‌یافتگی یا روشی از توجه است. پژوهش نوین آن‌ها را هم هم‌زمان فیزیک ناکام و کوشش‌هایی جدی برای نظریه‌پردازی نسبت ذهن با علل پنهان می‌خواند.",
          },
          tags: [
            { en: "hidden order", fa: "نظم پنهان" },
            { en: "initiation", fa: "پایان‌یافتگی" },
            { en: "symbol", fa: "نماد" },
            { en: "esoteric", fa: "باطنی" },
          ],
          children: [
            { id: "beliefs-occult-alchemy", name: { en: "Alchemy & Proto-Science", fa: "کیمیا و علم مقدم" }, short: { en: "Alchemy", fa: "کیمیا" }, summary: { en: "Transformation as both art and early laboratory practice.", fa: "دگرگونی به‌مثابه هم هنر و هم کارگاهی مقدماتی." }, tags: [{ en: "transmutation", fa: "تبدیل" }, { en: "athanor", fa: "اتانور" }, { en: "solve et coagula", fa: "حل و انعقاد" }] },
            { id: "beliefs-occult-astrology", name: { en: "Astrology & Divination", fa: "نجوم‌بینی و غیب‌گویی" }, short: { en: "Divination", fa: "غیب‌گویی" }, summary: { en: "Reading significance from cycles, signs and chance.", fa: "خواندن معنا از چرخه‌ها، نشانه‌ها و تصادف." }, tags: [{ en: "chart", fa: "طالع‌بینی" }, { en: "omen", fa: " فال" }, { en: "transit", fa: "گذر" }] },
            { id: "beliefs-occult-hermetic", name: { en: "Hermeticism & Mysticism", fa: "هرمetic و عرفان" }, short: { en: "Hermetic", fa: "هرمetic" }, summary: { en: "Traditions of correspondence and direct apprehension of the divine.", fa: "سنن تطابق و ادراک مستقیم الهی." }, tags: [{ en: "correspondence", fa: "تطابق" }, { en: "gnosis", fa: "گنوسیس" }, { en: "contemplation", fa: "تأمل" }] },
            { id: "beliefs-occult-traditions-modern", name: { en: "Modern Occult Revival", fa: "احیای مدرن رمزی" }, short: { en: "Modern", fa: "مدرن" }, summary: { en: "How esoteric material is reimagined after the nineteenth century.", fa: "بازتصورِ مواد باطنی پس از سدهٔ نوزدهم." }, tags: [{ en: "revival", fa: "احیا" }, { en: "synthesis", fa: "ترکیب" }, { en: "modernity", fa: "مدرنیته" }] },
          ],
        },
        {
          id: "beliefs-folklore",
          name: { en: "Folklore & Performance", fa: "folkلور و اجرا" },
          short: { en: "Folklore", fa: "فولکلور" },
          summary: {
            en: "The small, transmitted things a culture carries: tale, joke, riddle, rite.",
            fa: "آن چیزهای کوچک و منتقل‌شده‌ای که فرهنگی حمل می‌کند: قصه، جوک، معما، آیین.",
          },
          description: {
            en: "Folklore lives at the scale of the single telling: a joke that only works on one Tuesday, a riddle whose answer is a pun you have to grow into. It is the smallest and most durable form of cultural transmission, and it survives by being repeated rather than recorded.",
            fa: "فولکلور در مقیاسِ یک بار گفتن زندگی می‌کند: جوکی که فقط دوشنبه کار می‌کند، معمایی که جوابش بازی‌واژه‌ای است که باید در آن رشد کرد. کوچک‌ترین و پایدارترین شکل انتقال فرهنگی است و با تکرار زنده می‌ماند نه با ثبت.",
          },
          tags: [
            { en: "tale", fa: "قصه" },
            { en: "performance", fa: "اجرا" },
            { en: "variation", fa: "گوناگی" },
            { en: "transmission", fa: "انتقال" },
          ],
          children: [
            { id: "beliefs-folklore-narrative", name: { en: "Narrative & Tale Types", fa: "روایت و گونه‌های داستان" }, short: { en: "Narrative", fa: "روایت" }, summary: { en: "Plot architecture and the classification of tales.", fa: "معماری پیرنواخت و رده‌بندی داستان‌ها." }, tags: [{ en: "propp", fa: "پراپ" }, { en: "variance", fa: "دگرگونی" }, { en: "frame", fa: "قاب روایی" }] },
            { id: "beliefs-folklore-oral", name: { en: "Oral Performance & Verse", fa: "اجرای شفاهی و شعر" }, short: { en: "Oral", fa: "شفاهی" }, summary: { en: "Singing, chanting and the metre that carries memory.", fa: "خواندن، نیایش و وزنی که حافظه را حمل می‌کند." }, tags: [{ en: "formulaic", fa: "قالبی" }, { en: "alliteration", fa: "هم‌آوایی" }, { en: "recital", fa: "تکرار" }] },
            { id: "beliefs-folklore-custom", name: { en: "Custom & Festival", fa: "سنت و جشن" }, short: { en: "Custom", fa: "سنت" }, summary: { en: "Seasonal rites and the social order they dramatise.", fa: "آیین‌های فصلی و نظم اجتماعی‌ای که نمایش می‌دهند." }, tags: [{ en: "rite of passage", fa: "آیین گذار" }, { en: "calendar", fa: "تقویم" }, { en: "communal", fa: "جمعی" }] },
            { id: "beliefs-folklore-material", name: { en: "Material & Amulet Beliefs", fa: "باورهای مادی و تعویذ" }, short: { en: "Amulets", fa: "تعویذ" }, summary: { en: "Objects held to carry power, luck or protection.", fa: "اشیایی که گرفته می‌شوند تا قدرت، بخت یا حفاظت داشته باشند." }, tags: [{ en: "charm", fa: "طلسم" }, { en: "talisman", fa: "تعویذ" }, { en: "material culture", fa: "فرهنگ مادی" }] },
          ],
        },
        {
          id: "beliefs-speculative",
          name: { en: "Speculative Futures", fa: "آینده‌های حدسی" },
          short: { en: "Futures", fa: "آینده" },
          summary: {
            en: "Thinking rigorously about what has not happened yet — and about what cannot.",
            fa: "اندیشیدن به‌طور دقیق دربارهٔ آنچه هنوز رخ نداده — و آنچه ناممکن است.",
          },
          description: {
            en: "Speculative work is disciplined imagination: futures research, science fiction, worldbuilding and design fiction all use the same tools of rigour to talk about the counterfactual. Its oldest form is philosophy's possible worlds, and its most useful contribution is expanding the space of options people can seriously consider.",
            fa: "کار حدسی، تخیل منضبط است: پژوهش آینده، داستان علمی، جهان‌سازی و داستان‌پردازیِ طراحی، همگی از یک ابزارهای دقت برای سخن‌گفتن از خلاف‌واقع استفاده می‌کنند. کهن‌ترین شکلش جهان‌های ممکن فلسفه است و سودمندترین سهمش گسترش فضای گزینه‌هایی است که مردم جدی می‌گیرند.",
          },
          tags: [
            { en: "counterfactual", fa: "خلاف‌واقع" },
            { en: "projection", fa: "پیش‌بینی" },
            { en: "scenario", fa: "سناریو" },
            { en: "rigour", fa: "دقت" },
          ],
          children: [
            { id: "beliefs-speculative-futures-studies", name: { en: "Futures Studies", fa: "مطالعات آینده" }, short: { en: "Futures", fa: "آینده" }, summary: { en: "Method, scenarios and horizon scanning.", fa: "روش، سناریو و رصد افق." }, tags: [{ en: "scenario", fa: "سناریو" }, { en: "horizon", fa: "افق" }, { en: "indicator", fa: "شاخص" }] },
            { id: "beliefs-speculative-scifi", name: { en: "Science Fiction Studies", fa: "پژوهش داستان علمی" }, short: { en: "SF Studies", fa: "پژوهش SF" }, summary: { en: "Speculation as a laboratory for social norms.", fa: "تخیل به‌مثابه آزمایشگاه هنجارهای اجتماعی." }, tags: [{ en: "novella", fa: "رمان کوتاه" }, { en: "posthuman", fa: "پسا‌انسانی" }, { en: "utopia", fa: "یوتوپیا" }] },
            { id: "beliefs-speculative-design-fiction", name: { en: "Design Fiction & Worldbuilding", fa: "داستان‌پردازی طراحی و جهان‌سازی" }, short: { en: "Design Fiction", fa: "داستان طراحی" }, summary: { en: "Making artefacts that argue about the future.", fa: "ساختن اشیایی که دربارهٔ آینده استدلال می‌کنند." }, tags: [{ en: "artefact", fa: "شیء" }, { en: "critical design", fa: "طراحی نقدی" }, { en: "narrative", fa: "روایی" }] },
            { id: "beliefs-speculative-philosophy-future", name: { en: "Philosophy of the Future", fa: "فلسفهٔ آینده" }, short: { en: "Future", fa: "فلسفهٔ آینده" }, summary: { en: "Temporal modality, fatalism and what time does.", fa: " modality زمانی، جبرگرایی و آنچه زمان می‌کند." }, tags: [{ en: "modality", fa: "امکان" }, { en: "fatalism", fa: "جبرگرایی" }, { en: "temporal", fa: "زمانی" }] },
          ],
        },
      ],
    },
];

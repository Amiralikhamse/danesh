"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"

type Theme = "dark" | "light"
type Lang = "en" | "fa"

type ThemeContextType = {
  theme: Theme
  lang: Lang
  toggleTheme: () => void
  toggleLang: () => void
  t: (key: string) => string
}

const translations: Record<string, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.work": "Work",
    "nav.skills": "Skills",
    "nav.contact": "Contact",
    "cta.start": "Start Project",
    "hero.badge": "Premium Petrochemical Supply",
    "slide.1.title": "CROWN RESERVE",
    "slide.1.subtitle": "Premium Refined Petroleum Products",
    "slide.1.caption": "Uncompromising purity. Unparalleled performance for global industry leaders.",
    "slide.2.title": "VERTEX ENERGY",
    "slide.2.subtitle": "High-Performance Industrial Fuels",
    "slide.2.caption": "Powering heavy industry with next-generation combustion technology.",
    "slide.3.title": "SILVERSTREAM",
    "slide.3.subtitle": "Advanced Lubricant Solutions",
    "slide.3.caption": "Precision-engineered lubricants that redefine machinery endurance.",
    "slide.4.title": "ONYX MARINE",
    "slide.4.subtitle": "Marine-Grade Fuel Supply",
    "slide.4.caption": "Trusted by the world's largest fleets for uncompromising marine fuel quality.",
    "slide.5.title": "APEX PETROCHEMICALS",
    "slide.5.subtitle": "Integrated Petrochemical Solutions",
    "slide.5.caption": "End-to-end supply chain mastery from refinery to delivery.",
    "cta.quote": "Request Quote",
    "cta.explore": "Explore Solutions",
    "about.badge": "About Peak",
    "about.title": "ASCEND WITH US",
    "about.desc": "Founded in 2020, PEAK is a digital elevation agency that transforms brands through cutting-edge technology. We don't just build websites—we engineer digital ecosystems that scale, perform, and inspire.",
    "services.badge": "Capabilities",
    "services.title": "WHAT WE SCALE",
    "projects.badge": "Portfolio",
    "projects.title": "SELECTED WORK",
    "stats.badge": "By the Numbers",
    "stats.title": "METRICS THAT MATTER",
    "skills.badge": "Technical Arsenal",
    "skills.title": "OUR STACK",
    "timeline.badge": "Our Journey",
    "timeline.title": "THE CLIMB",
    "faq.badge": "FAQ",
    "faq.title": "COMMON QUESTIONS",
    "contact.badge": "Connect",
    "contact.title": "START YOUR ASCENT",
    "contact.desc": "Ready to elevate your digital presence? Tell us about your project and we'll map out the climb together.",
    "cta.send": "Send Message",
    "form.name": "Name",
    "form.email": "Email",
    "form.project": "Project Type",
    "form.message": "Message",
    "form.placeholder.name": "Your name",
    "form.placeholder.email": "your@email.com",
    "form.placeholder.message": "Tell us about your project...",
    "form.send": "Send Message",
    "faq.1.q": "What makes PEAK different from other agencies?",
    "faq.1.a": "We combine mountain-grade discipline with cutting-edge technology. Every project is approached like an expedition: planned meticulously, executed with precision, and delivered beyond expectations.",
    "faq.2.q": "How long does a typical project take?",
    "faq.2.a": "Timelines vary by scope. A brand website takes 4–8 weeks, a web application 2–4 months, and AI integrations 6–12 weeks. We provide detailed timelines during our discovery phase.",
    "faq.3.q": "Do you offer ongoing support after launch?",
    "faq.3.a": "Yes. Every project includes a 30-day post-launch support period. We also offer monthly and quarterly retainer packages for ongoing maintenance, updates, and optimization.",
    "faq.4.q": "What technologies do you specialize in?",
    "faq.4.a": "Our stack includes Next.js, React, TypeScript, Node.js, Python, AWS, and modern AI frameworks. We choose the best technology for each project's specific needs.",
    "faq.5.q": "How do you integrate AI into web applications?",
    "faq.5.a": "We embed AI agents, chatbots, and automation directly into web apps using APIs from OpenAI, Anthropic, and custom models. Each integration is tailored to your business logic.",
    "faq.6.q": "What is your pricing model?",
    "faq.6.a": "We work on a project basis with transparent pricing. After understanding your needs, we provide a detailed proposal with fixed costs. No hidden fees, no surprises.",
    "footer.tagline": "Digital elevation agency engineering exceptional web experiences, AI solutions, and design that reaches new heights.",
    "footer.copyright": "All rights reserved.",
    "footer.motto": "Designed with precision at altitude",
  },
  fa: {
    "nav.home": "خانه",
    "nav.about": "درباره ما",
    "nav.services": "خدمات",
    "nav.work": "نمونه‌کارها",
    "nav.skills": "مهارت‌ها",
    "nav.contact": "تماس",
    "cta.start": "شروع پروژه",
    "hero.badge": "تأمین‌کننده محصولات پتروشیمی",
    "slide.1.title": "رویال کراون",
    "slide.1.subtitle": "محصولات نفتی تصفیه‌شده ممتاز",
    "slide.1.caption": "خلوص بی‌نظیر. عملکردی فراتر از استاندارد برای رهبران صنعت جهانی.",
    "slide.2.title": "ورترکس انرژی",
    "slide.2.subtitle": "سوخت‌های صنعتی با عملکرد بالا",
    "slide.2.caption": "تأمین انرژی صنایع سنگین با فناوری احتراق نسل جدید.",
    "slide.3.title": "سیلوراستریم",
    "slide.3.subtitle": "روان‌کننده‌های پیشرفته",
    "slide.3.caption": "روان‌کننده‌های دقیق‌مهندسی‌شده که دوام ماشین‌آلات را بازتعریف می‌کنند.",
    "slide.4.title": "اونیکس مارین",
    "slide.4.subtitle": "تأمین سوخت دریایی",
    "slide.4.caption": "مورد اعتماد بزرگترین ناوگان‌های جهان برای کیفیت بی‌نظیر سوخت دریایی.",
    "slide.5.title": "اپکس پتروشیمی",
    "slide.5.subtitle": "راهکارهای یکپارچه پتروشیمی",
    "slide.5.caption": "تسلط کامل بر زنجیره تأمین، از پالایشگاه تا تحویل.",
    "cta.quote": "درخواست قیمت",
    "cta.explore": "مشاهده راهکارها",
    "about.badge": "درباره پیک",
    "about.title": "با ما صعود کنید",
    "about.desc": "پیک در سال ۲۰۲۰ تأسیس شد. یک آژانس ارتقای دیجیتال که برندها را با فناوری‌های پیشرفته متحول می‌کند.",
    "services.badge": "توانمندی‌ها",
    "services.title": "آنچه مقیاس می‌کنیم",
    "projects.badge": "نمونه‌کارها",
    "projects.title": "آثار برگزیده",
    "stats.badge": "اعداد و ارقام",
    "stats.title": "شاخص‌های مهم",
    "skills.badge": "زرادخانه فنی",
    "skills.title": "فناوری‌های ما",
    "timeline.badge": "مسیر ما",
    "timeline.title": "صعود",
    "faq.badge": "سؤالات متداول",
    "faq.title": "پرسش‌های رایج",
    "contact.badge": "ارتباط",
    "contact.title": "صعود خود را آغاز کنید",
    "contact.desc": "آماده ارتقای حضور دیجیتال خود هستید؟ پروژه خود را برای ما توضیح دهید و مسیر صعود را با هم ترسیم می‌کنیم.",
    "cta.send": "ارسال پیام",
    "form.name": "نام",
    "form.email": "ایمیل",
    "form.project": "نوع پروژه",
    "form.message": "پیام",
    "form.placeholder.name": "نام شما",
    "form.placeholder.email": "ایمیل شما",
    "form.placeholder.message": "درباره پروژه خود توضیح دهید...",
    "form.send": "ارسال پیام",
    "faq.1.q": "چه چیزی پیک را از سایر آژانس‌ها متمایز می‌کند؟",
    "faq.1.a": "ما انضباط در سطح کوهنوردی را با فناوری پیشرفته ترکیب می‌کنیم. هر پروژه مانند یک اکسپدیشن برنامه‌ریزی و اجرا می‌شود.",
    "faq.2.q": "مدت زمان انجام یک پروژه معمولی چقدر است؟",
    "faq.2.a": "مدت زمان بسته به scope پروژه متفاوت است. وب‌سایت برند ۴ تا ۸ هفته، اپلیکیشن وب ۲ تا ۴ ماه، و یکپارچه‌سازی هوش مصنوعی ۶ تا ۱۲ هفته زمان می‌برد.",
    "faq.3.q": "آیا پس از راه‌اندازی پشتیبانی ارائه می‌دهید؟",
    "faq.3.a": "بله. هر پروژه شامل ۳۰ روز پشتیبانی پس از راه‌اندازی است. همچنین بسته‌های نگهداری ماهانه و فصلی ارائه می‌دهیم.",
    "faq.4.q": "در چه فناوری‌هایی تخصص دارید؟",
    "faq.4.a": "تخصص ما شامل Next.js، React، TypeScript، Node.js، Python، AWS و فریم‌ورک‌های مدرن هوش مصنوعی است.",
    "faq.5.q": "چگونه هوش مصنوعی را در اپلیکیشن‌های وب یکپارچه می‌کنید؟",
    "faq.5.a": "ما عوامل هوش مصنوعی، چت‌بات‌ها و اتوماسیون را مستقیماً در اپلیکیشن‌های وب با استفاده از APIهای OpenAI، Anthropic و مدل‌های سفارشی تعبیه می‌کنیم.",
    "faq.6.q": "مدل قیمت‌گذاری شما چگونه است؟",
    "faq.6.a": "ما به صورت پروژه‌ای با قیمت‌گذاری شفاف کار می‌کنیم. پس از بررسی نیازهای شما، پیشنهاد دقیق با هزینه ثابت ارائه می‌دهیم.",
    "footer.tagline": "آژانس ارتقای دیجیتال. تجارب وب، راهکارهای هوش مصنوعی و طراحی در بالاترین سطح.",
    "footer.copyright": "تمامی حقوق محفوظ است.",
    "footer.motto": "طراحی‌شده با دقت در ارتفاع",
  },
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  lang: "en",
  toggleTheme: () => {},
  toggleLang: () => {},
  t: (key: string) => key,
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")
  const [lang, setLang] = useState<Lang>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("peak-theme") as Theme | null
    const savedLang = localStorage.getItem("peak-lang") as Lang | null
    if (savedTheme) setTheme(savedTheme)
    if (savedLang) setLang(savedLang)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("peak-theme", theme)
  }, [theme, mounted])

  useEffect(() => {
    if (!mounted) return
    const html = document.documentElement
    if (lang === "fa") {
      html.setAttribute("dir", "rtl")
      html.setAttribute("lang", "fa")
      html.setAttribute("data-lang", "fa")
    } else {
      html.setAttribute("dir", "ltr")
      html.setAttribute("lang", "en")
      html.removeAttribute("data-lang")
    }
    localStorage.setItem("peak-lang", lang)
  }, [lang, mounted])

  const toggleTheme = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), [])
  const toggleLang = useCallback(() => setLang((l) => (l === "en" ? "fa" : "en")), [])

  const t = useCallback((key: string) => {
    return translations[lang]?.[key] || translations["en"]?.[key] || key
  }, [lang])

  return (
    <ThemeContext.Provider value={{ theme, lang, toggleTheme, toggleLang, t }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

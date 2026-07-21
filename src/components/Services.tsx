"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "./ThemeProvider"

const services = [
  {
    id: "web", label: "Web Development", icon: "⟐",
    title: "High-Performance Web Development",
    desc: "We build blazing-fast, scalable web applications using cutting-edge frameworks and architectures. From Next.js to Node.js, every line of code is optimized for performance and maintainability.",
    features: ["Next.js & React Applications", "Progressive Web Apps", "Headless CMS Architecture", "API Design & Integration", "Performance Optimization"],
  },
  {
    id: "ai", label: "AI Integration", icon: "⟡",
    title: "Intelligent AI Solutions",
    desc: "We integrate AI agents, chatbots, and automation into your web applications. Transform your data into actionable intelligence with custom machine learning pipelines.",
    features: ["Custom AI Agent Development", "LLM Integration & Fine-tuning", "Intelligent Automation", "Data Processing Pipelines", "Predictive Analytics"],
  },
  {
    id: "design", label: "UI/UX Design", icon: "◇",
    title: "Visionary Design Experiences",
    desc: "Our designs don't just look beautiful—they convert. We craft interfaces that users love, with meticulous attention to every micro-interaction and motion detail.",
    features: ["Brand Identity Systems", "Interface Design", "Prototyping & Wireframing", "Design Systems", "Motion Design"],
  },
  {
    id: "cloud", label: "Cloud & DevOps", icon: "△",
    title: "Cloud-Native Infrastructure",
    desc: "We architect and deploy cloud-native solutions that scale effortlessly. From AWS to Vercel, your infrastructure will be rock-solid and cost-optimized.",
    features: ["Cloud Architecture", "CI/CD Pipelines", "Container Orchestration", "Infrastructure as Code", "Monitoring & Observability"],
  },
]

export default function Services() {
  const { t } = useTheme()
  const [active, setActive] = useState(services[0].id)
  const ref = useRef(null)

  return (
    <section id="services" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-block px-4 py-1 border border-theme text-muted text-xs uppercase tracking-[0.2em] mb-6">{t("services.badge")}</span>
          <h2 className="font-display text-5xl sm:text-7xl tracking-wider text-theme">{t("services.title")} <span className="text-gradient-gold">⛰</span></h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-2">
            {services.map((s, i) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActive(s.id)}
                className={`group text-left px-6 py-5 border transition-all duration-300 ${
                  active === s.id
                    ? "border-gold/40 bg-gold/5 text-gold hover-glow"
                    : "border-theme text-muted hover:border-light hover-border-glow"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl">{s.icon}</span>
                  <span className="font-display text-xl tracking-wider">{s.label}</span>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {services.find((s) => s.id === active) && (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 border border-theme"
                >
                  <div className="text-4xl text-gold mb-6">{services.find((s) => s.id === active)?.icon}</div>
                  <h3 className="font-display text-3xl tracking-wider text-theme mb-4">{services.find((s) => s.id === active)?.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-8">{services.find((s) => s.id === active)?.desc}</p>
                  <ul className="space-y-3">
                    {services.find((s) => s.id === active)?.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-muted">
                        <span className="w-1.5 h-1.5 bg-gold/60 rounded-full shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

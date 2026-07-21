"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useTheme } from "./ThemeProvider"

const milestones = [
  { year: "2020", title: "The Ascent Begins", desc: "PEAK Studio founded in Chamonix. First three enterprise clients secured within the first quarter." },
  { year: "2021", title: "First Summit", desc: "Launched our first AI-powered web application. Team grew to 12. Won Best Digital Agency at Web Awards." },
  { year: "2022", title: "Scaling Altitude", desc: "Opened second office in Paris. Surpassed 50 projects delivered. Introduced dedicated AI integration division." },
  { year: "2024", title: "Peak Performance", desc: "Achieved 99.7% client satisfaction rate. Developed proprietary AI agent framework. 25+ industry awards." },
  { year: "2026", title: "New Frontiers", desc: "Launching PEAK AI Platform. International expansion. Pushing the boundaries of what digital experiences can be." },
]

export default function Timeline() {
  const { t } = useTheme()
  const ref = useRef(null)

  return (
    <section className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={ref} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-20">
          <span className="inline-block px-4 py-1 border border-theme text-muted text-xs uppercase tracking-[0.2em] mb-6">{t("timeline.badge")}</span>
          <h2 className="font-display text-5xl sm:text-7xl tracking-wider text-theme">{t("timeline.title")} <span className="text-gradient-gold">⛰</span></h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-orange/20 to-transparent pointer-events-none" />
          <div className="space-y-16">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-20"
              >
                <div className="absolute left-4 top-2 w-2 h-2 rounded-full bg-gold shadow-[0_0_12px_rgba(212,168,67,0.5)]" />
                <div className="font-mono text-xs text-gold/60 mb-1">{m.year}</div>
                <h3 className="font-display text-2xl tracking-wider text-theme mb-2">{m.title}</h3>
                <p className="text-muted text-sm leading-relaxed max-w-lg">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

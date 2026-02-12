"use client";

import { motion } from "framer-motion";

const capabilities = [
  {
    id: "1",
    title: "Machine Learning",
    metrics: "95% precisión",
    icon: "model_training",
  },
  {
    id: "2",
    title: "Deep Learning",
    metrics: "10x más rápido",
    icon: "psychology",
  },
  {
    id: "3",
    title: "Generative AI",
    metrics: "Creatividad infinita",
    icon: "auto_awesome",
  },
  {
    id: "4",
    title: "Computer Vision",
    metrics: "Visión 360°",
    icon: "center_focus_strong",
  },
];

export function DataSection() {
  return (
    <section className="mb-12">
      <motion.div
        className="flex items-center gap-2 mb-6 cursor-pointer group w-fit"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">
          Capacidades por categoría
        </h2>
        <span className="material-symbols-outlined text-[var(--text-primary)] group-hover:translate-x-1 transition-transform">
          chevron_right
        </span>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
      >
        {capabilities.map((c, i) => (
          <motion.div
            key={c.id}
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[var(--background-elevated)] mb-3 border border-white/5 group-hover:border-[var(--accent)]/30 transition-colors">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <span className="material-symbols-outlined text-5xl text-[var(--accent)] mb-2">
                  {c.icon}
                </span>
                <span className="text-sm font-bold text-[var(--accent)]">
                  {c.metrics}
                </span>
              </div>
            </div>
            <h3 className="font-semibold text-base truncate text-[var(--text-primary)]">
              {c.title}
            </h3>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

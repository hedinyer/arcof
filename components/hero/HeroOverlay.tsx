"use client";

import { motion } from "framer-motion";

export function HeroOverlay() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
      <motion.p
        className="mt-4 text-lg md:text-xl text-white/80 text-center max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        Cutting-edge technology meets innovative design
      </motion.p>
    </div>
  );
}

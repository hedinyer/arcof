"use client";

import { motion } from "framer-motion";

const partners = [
  { id: "1", name: "Davivienda", src: "/davivienda-300x162.png" },
  { id: "2", name: "El Libertador", src: "/el-libertador-300x162.jpg" },
  { id: "3", name: "Seguros Bolívar", src: "/seguros-bolivar.png" },
  { id: "4", name: "Cámara de Comercio", src: "/camaradecomercio-300x162.png" },
];

export function DataSection() {
  return (
    <section className="mb-0 mt-16 md:mt-24">
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
      >
        {partners.map((partner, i) => (
          <motion.div
            key={partner.id}
            className="flex items-center justify-center p-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={partner.src}
              alt={partner.name}
              className="max-h-[80px] md:max-h-[100px] w-auto object-contain"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

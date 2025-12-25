"use client";

import { motion } from "framer-motion";

export default function EcoTips() {
  const categories = [
    {
      title: "Closed-loop Process",
      desc: "AI engine monitors and adjusts log quality in real-time.",
      icon: "fa-arrows-rotate",
      tips: [
        "Bring reusable bags when shopping to reduce plastic waste.",
        "Use a refillable water bottle instead of buying bottled water.",
        "Compost your food scraps to reduce landfill waste.",
      ],
    },
    {
      title: "Repeatability",
      desc: "Reliable, tested fidelity from print to print and printer to printer.",
      icon: "fa-repeat",
      tips: [
        "Repurpose glass jars for storage instead of throwing them away.",
        "Donate old clothes instead of discarding them.",
        "Use rechargeable batteries to minimize electronic waste.",
      ],
    },
    {
      title: "Trackable Data",
      desc: "Auditable, secure digital log for every single print.",
      icon: "fa-database",
      tips: [
        "Separate recyclables from regular trash properly.",
        "Rinse containers before recycling to avoid contamination.",
        "Break down cardboard boxes before recycling.",
      ],
    },
  ];

  return (
    <div className="space-y-16">
      <header className="text-center space-y-4">
        <h2 className="text-6xl font-serif font-bold italic tracking-tighter">
          Guide to Excellence
        </h2>
        <p className="text-xl opacity-60 max-w-xl mx-auto">
          Foundational knowledge for maintaining the highest environmental
          production standards.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            key={idx}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <i className={`fa-solid ${cat.icon} text-primary`}></i>
                <h3 className="font-serif font-bold text-2xl italic underline decoration-primary/10 underline-offset-4">
                  {cat.title}
                </h3>
              </div>
              <p className="text-sm opacity-50 leading-relaxed">{cat.desc}</p>
            </div>

            <div className="space-y-4">
              {cat.tips.map((tip, tIdx) => (
                <div
                  key={tIdx}
                  className="glass-card p-6 rounded-2xl hover:bg-primary/[0.03] transition-colors border-l-4 border-l-primary/20"
                >
                  <p className="text-sm font-medium leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-12 glass-card rounded-[3rem] bg-primary text-primary-foreground text-center space-y-6">
        <h2 className="text-4xl font-serif font-bold italic">
          Ask us anything.
        </h2>
        <p className="opacity-80 max-w-lg mx-auto">
          Are you a company or brand seeking creative services, an agency
          looking to scale, or simply inspired by what we're building?
        </p>
        <button className="bg-background text-foreground px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform">
          Get in Touch
        </button>
      </div>
    </div>
  );
}

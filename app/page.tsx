"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface WasteEntry {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
}

export default function Dashboard() {
  const [wasteData, setWasteData] = useState<WasteEntry[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem("wasteData");
    if (savedData) setWasteData(JSON.parse(savedData));
  }, []);

  const totalWaste = wasteData.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );
  const recyclingRate =
    wasteData.length > 0
      ? (
          (wasteData.filter((i) =>
            ["Plastic", "Paper", "Metal", "Glass"].includes(i.category)
          ).length /
            wasteData.length) *
          100
        ).toFixed(0)
      : 0;

  return (
    <div className="space-y-16">
      <motion.header
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="space-y-6 max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
          System Operational
        </div>
        <h1 className="text-7xl font-serif font-bold leading-[1] tracking-tighter">
          Unmatched{" "}
          <span className="italic text-primary drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            Precision
          </span>{" "}
          <br />& Quality Control.
        </h1>
        <p className="text-xl text-foreground/50 leading-relaxed font-medium">
          Breakthrough environmental auditing technology.{" "}
          <span className="text-foreground/80">
            Monitor your ecological footprint
          </span>{" "}
          with high-fidelity, real-time data streaming.
        </p>
      </motion.header>

      {/* Stats Grid with engaging hover effects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            label: "Total Volume",
            value: `${totalWaste.toFixed(1)}kg`,
            icon: "fa-weight-hanging",
            color: "text-primary",
            trend: "+2.4%",
          },
          {
            label: "Efficiency",
            value: `${recyclingRate}%`,
            icon: "fa-arrows-spin",
            color: "text-accent",
            trend: "Optimal",
          },
          {
            label: "Audit Status",
            value: "Verified",
            icon: "fa-shield-halved",
            color: "text-primary",
            trend: "SECURE",
          },
        ].map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            whileHover={{ y: -8 }}
            key={i}
            className="glass-card p-8 rounded-[2.5rem] space-y-6 relative overflow-hidden group emerald-glow"
          >
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <i className={`fa-solid ${stat.icon} text-8xl -rotate-12`}></i>
            </div>

            <div
              className={`w-14 h-14 rounded-2xl bg-background/50 backdrop-blur-md flex items-center justify-center ${stat.color} border border-primary/10 shadow-inner`}
            >
              <i className={`fa-solid ${stat.icon} text-xl`}></i>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-1">
                  {stat.label}
                </p>
                <h3 className="text-5xl font-serif font-bold">{stat.value}</h3>
              </div>
              <div
                className={`text-[10px] font-black italic px-2 py-1 rounded bg-white/5 ${stat.color} border border-current/10`}
              >
                {stat.trend}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-serif font-bold italic underline decoration-primary/20 underline-offset-8">
            Live Audit Stream
          </h2>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            className="flex items-center gap-2 text-xs font-bold text-primary opacity-60"
          >
            SYSTEM LOGS <i className="fa-solid fa-arrow-right-long"></i>
          </motion.div>
        </div>

        <div className="space-y-4">
          {wasteData.length === 0 ? (
            <div className="glass-card rounded-[2rem] p-20 text-center opacity-30 italic font-serif">
              Awaiting initial data transmission...
            </div>
          ) : (
            wasteData
              .slice(-5)
              .reverse()
              .map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  key={item.id}
                  className="glass-card p-5 rounded-2xl flex items-center justify-between hover:bg-white/[0.02] transition-colors border-l-4 border-l-primary/30"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/5">
                      <i className="fa-solid fa-microchip text-sm"></i>
                    </div>
                    <div>
                      <p className="font-bold text-lg tracking-tight">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/5 text-primary font-bold border border-primary/10">
                          {item.category.toUpperCase()}
                        </span>
                        <span className="text-[9px] font-bold opacity-30 italic">
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-serif font-bold text-2xl tracking-tighter">
                      {item.amount}
                      <span className="text-xs ml-1 opacity-40">kg</span>
                    </p>
                    <p className="text-[8px] font-black text-primary uppercase tracking-widest mt-1">
                      Audited ✓
                    </p>
                  </div>
                </motion.div>
              ))
          )}
        </div>
      </section>
    </div>
  );
}

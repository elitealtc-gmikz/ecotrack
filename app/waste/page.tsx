"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WasteEntry {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
}

export default function WasteLogging() {
  const [wasteData, setWasteData] = useState<WasteEntry[]>([]);
  const [form, setForm] = useState({
    name: "",
    category: "Plastic",
    amount: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("wasteData");
    if (saved) setWasteData(JSON.parse(saved));
  }, []);

  const addEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.amount) return;
    const entry = {
      ...form,
      id: Date.now(),
      amount: Number.parseFloat(form.amount),
      date: new Date().toLocaleDateString(),
    };
    const updated = [...wasteData, entry];
    setWasteData(updated);
    localStorage.setItem("wasteData", JSON.stringify(updated));
    setForm({ name: "", category: "Plastic", amount: "" });
  };

  const removeEntry = (id: number) => {
    const updated = wasteData.filter((i) => i.id !== id);
    setWasteData(updated);
    localStorage.setItem("wasteData", JSON.stringify(updated));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <section className="space-y-8">
        <header className="space-y-2">
          <h2 className="text-4xl font-serif font-bold">Closed-loop Process</h2>
          <p className="opacity-60 text-lg italic">
            AI engine monitors and adjusts log quality in real-time.
          </p>
        </header>

        <form
          onSubmit={addEntry}
          className="glass-card p-10 rounded-[2rem] space-y-6"
        >
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest opacity-40">
              Item Description
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-transparent border-b-2 border-primary/10 py-3 text-xl focus:border-primary outline-none transition-colors"
              placeholder="e.g. Copper Scrap"
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest opacity-40">
                Classification
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-background border-b-2 border-primary/10 py-3 text-lg focus:border-primary outline-none transition-colors appearance-none"
              >
                {["Plastic", "Paper", "Metal", "Glass", "Organic", "Other"].map(
                  (c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest opacity-40">
                Mass (kg)
              </label>
              <input
                required
                type="number"
                step="0.1"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="w-full bg-transparent border-b-2 border-primary/10 py-3 text-xl focus:border-primary outline-none transition-colors"
                placeholder="0.0"
              />
            </div>
          </div>

          <button className="w-full bg-primary text-primary-foreground py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-3">
            <i className="fa-solid fa-circle-plus"></i>
            Commit to Log
          </button>
        </form>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-serif font-bold opacity-40">
          Historical Audit Trail
        </h2>
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {wasteData
              .slice()
              .reverse()
              .map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={item.id}
                  className="glass-card p-6 rounded-2xl flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-primary/30 group-hover:text-primary transition-colors">
                      <i className="fa-solid fa-receipt text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-[10px] opacity-40 uppercase tracking-widest">
                        {item.date} — {item.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-serif font-bold text-xl">
                      {item.amount}kg
                    </span>
                    <button
                      onClick={() => removeEntry(item.id)}
                      className="w-10 h-10 rounded-full border border-primary/10 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <i className="fa-solid fa-xmark text-sm"></i>
                    </button>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
          {wasteData.length === 0 && (
            <p className="text-center opacity-30 py-20 italic">
              The audit trail is currently empty.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

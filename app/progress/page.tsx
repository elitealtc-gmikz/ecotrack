"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

interface WasteEntry {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
}

const recyclableCategories = ["Plastic", "Paper", "Metal", "Glass"];

export default function ProgressPage() {
  const [wasteData, setWasteData] = useState<WasteEntry[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem("wasteData");
    if (savedData) {
      setWasteData(JSON.parse(savedData));
    }
  }, []);

  const categoryStats = wasteData.reduce(
    (acc: Record<string, number>, item) => {
      acc[item.category] =
        (acc[item.category] || 0) + Number.parseFloat(item.amount.toString());
      return acc;
    },
    {}
  );

  const recyclableTotal = recyclableCategories.reduce(
    (sum, cat) => sum + (categoryStats[cat] || 0),
    0
  );
  const totalWaste = Object.values(categoryStats).reduce(
    (sum, val) => sum + val,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-serif font-bold text-primary">
          Environmental Impact
        </h1>
        <p className="text-muted-foreground">
          Detailed analytics of your waste reduction journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-sans uppercase tracking-widest text-muted-foreground">
                <i className="fas fa-recycle mr-2 text-primary" />
                Recycled Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-serif font-bold">
                {recyclableTotal.toFixed(2)} kg
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {((recyclableTotal / totalWaste) * 100 || 0).toFixed(1)}%
                efficiency rate
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-sans uppercase tracking-widest text-muted-foreground">
                <i className="fas fa-leaf mr-2 text-primary" />
                Carbon Offset
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-serif font-bold">
                {(recyclableTotal * 2.5).toFixed(1)} kg
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Estimated CO₂ prevented
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-sans uppercase tracking-widest text-muted-foreground">
                <i className="fas fa-chart-line mr-2 text-primary" />
                Total Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-serif font-bold">
                {wasteData.length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Activities recorded
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-serif">Waste Distribution</CardTitle>
          <CardDescription>Breakdown by material type</CardDescription>
        </CardHeader>
        <CardContent>
          {Object.keys(categoryStats).length === 0 ? (
            <div className="text-center py-12 text-muted-foreground italic font-serif">
              <i className="fas fa-database mb-4 text-3xl opacity-20 block" />
              Your data story begins when you log your first item.
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(categoryStats)
                .sort((a, b) => b[1] - a[1])
                .map(([category, amount], index) => {
                  const percentage = (amount / totalWaste) * 100;
                  const isRecyclable = recyclableCategories.includes(category);
                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-sans font-medium flex items-center gap-2">
                          <i
                            className={`fas ${
                              isRecyclable
                                ? "fa-circle-check text-primary"
                                : "fa-circle-xmark opacity-40"
                            }`}
                          />
                          {category}
                        </span>
                        <span className="text-sm font-mono opacity-80">
                          {amount.toFixed(2)} kg ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-primary/5 rounded-full h-2 overflow-hidden border border-primary/10">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full ${
                            isRecyclable
                              ? "bg-primary"
                              : "bg-muted-foreground/30"
                          }`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

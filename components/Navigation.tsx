"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Overview", icon: "fa-chart-pie" },
    { href: "/waste", label: "Logs", icon: "fa-trash-can" },
    { href: "/progress", label: "Analytics", icon: "fa-seedling" },
    { href: "/tips", label: "Guide", icon: "fa-lightbulb" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between glass-card px-6 py-3 rounded-2xl">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white transition-transform group-hover:rotate-12">
            <i className="fa-solid fa-leaf text-xl"></i>
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight">
            EcoTrack
          </span>
        </Link>

        <div className="hidden md:flex gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  isActive
                    ? "text-primary"
                    : "hover:bg-primary/5 text-foreground/70"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <i className={`fa-solid ${item.icon} text-xs`}></i>
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

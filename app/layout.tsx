import type React from "react";
import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "EcoTrack — Precision Environmental Auditing",
  description:
    "Track your environmental impact with unmatched precision and sustainability standards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={`${geistSans.variable} ${playfair.variable} font-sans antialiased min-h-screen`}
      >
        <div className="relative overflow-hidden min-h-screen">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[160px] -z-10 animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[180px] -z-10 animate-bounce-slow" />
          <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] bg-primary/10 rounded-full blur-[120px] -z-10" />

          <Navigation />
          <main className="max-w-6xl mx-auto px-6 py-12">{children}</main>

          <footer className="py-12 px-6 border-t border-primary/5 mt-20">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-leaf text-lg"></i>
                <span className="font-serif font-bold tracking-tighter">
                  EcoTrack System
                </span>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold">
                © 2025 Audited Environmental Excellence
              </p>
              <div className="flex gap-6 text-sm">
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-linkedin"></i>
                <i className="fa-brands fa-x-twitter"></i>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

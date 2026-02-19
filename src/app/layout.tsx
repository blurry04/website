import type { Metadata } from "next";
import {
  Bebas_Neue,
  Fraunces,
  JetBrains_Mono,
  League_Spartan,
  Manrope,
  Sora,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const sans = Sora({
  variable: "--font-sans",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

const spartan = League_Spartan({
  variable: "--font-spartan",
  subsets: ["latin"],
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const name = Manrope({
  variable: "--font-name",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gaurav Advani",
  description:
    "Welcome to the Matrix.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${sans.variable} ${mono.variable} ${bebas.variable} ${spartan.variable} ${space.variable} ${name.variable} antialiased`}
      >
        <div className="flex flex-col">
          {children}
          <footer className="relative z-10 mt-auto border-t border-[var(--line)] py-3">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-6 text-xs uppercase tracking-[0.22em] text-muted sm:flex-row sm:items-center sm:justify-between">
              <span>Copyright 2026 Gaurav Advani</span>
              <span>Product / Technology / Design</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

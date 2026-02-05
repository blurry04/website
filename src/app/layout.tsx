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
  title: "Gaurav Advani — Personal Site",
  description:
    "Portfolio and writing hub for Gaurav Advani: selected projects, notes, and ways to connect.",
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
        {children}
      </body>
    </html>
  );
}

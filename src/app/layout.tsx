import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Begum House | Global Services. Intelligent Operations.",
  description:
    "A modern UK business house connecting specialist expertise, intelligent operations, global delivery and opportunities across borders.",
  keywords: [
    "Begum House",
    "UK Business House",
    "Financial Services",
    "Real Estate",
    "Global Opportunities",
    "Architecture Solutions",
    "Intelligent Operations",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${playfair.variable} ${jakarta.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#071526] text-slate-100 font-sans selection:bg-[#c5a869] selection:text-[#071526] flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

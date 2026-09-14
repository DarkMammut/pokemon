import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import I18nProvider from "@/components/layout/I18nProvider";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-geist-sans", // On conserve ce nom de variable pour que votre globals.css fonctionne directement
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Application Pokémon",
  description: "Mon application Next.js stylisée avec Tailwind v4",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
          lang="fr"
          className={`${jakartaSans.variable} ${geistMono.variable} h-full antialiased`}
      >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <I18nProvider>
            {children}
        </I18nProvider>
      </body>
      </html>
  );
}
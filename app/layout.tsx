import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Rodape from "../src/components/rodape/index";
import Link from "next/link";
import Cabecalho from "@/src/components/cabecalho";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FATEC - Estágio por Equivalência",
  description: "Estágio por equivalência da FATEC|Atibaia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Cabecalho />
        {children}
        <Rodape />
      </body>
    </html>
  );
}

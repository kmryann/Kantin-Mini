import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import VisitorPing from "@/components/VisitorPing"   // ⬅️ TAMBAHKAN INI

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" })
const jetmono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" })

export const metadata: Metadata = {
  title: "Kantin Mini - Cita Rasa Nusantara",
  description:
    "Nikmati kelezatan masakan Indonesia dengan bahan segar, harga terjangkau, dan pelayanan cepat di Kantin Mini. Menu paket nasi, pempek, chicken bites, dan minuman tradisional.",
  generator: "v0.app",
  keywords:
    "kantin mini, makanan indonesia, paket nasi, pempek, chicken bites, makanan murah, delivery makanan",
  authors: [{ name: "Kantin Mini" }],
  openGraph: {
    title: "Kantin Mini - Cita Rasa Nusantara",
    description:
      "Nikmati kelezatan masakan Indonesia dengan bahan segar, harga terjangkau, dan pelayanan cepat.",
    type: "website",
    locale: "id_ID",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Kantin Mini - Cita Rasa Nusantara" }],
    url: "https://kantin-mini.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kantin Mini - Cita Rasa Nusantara",
    description:
      "Nikmati kelezatan masakan Indonesia dengan bahan segar, harga terjangkau, dan pelayanan cepat.",
    images: ["/og-image.jpg"],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${inter.variable} ${jetmono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#d97706" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {/* ⬇️ akan menaikkan counter 1× per 24 jam per browser, tanpa UI */}
          <VisitorPing />
          <Suspense fallback={null}>{children}</Suspense>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

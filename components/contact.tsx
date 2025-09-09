"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, MapPin, Clock, Navigation } from "lucide-react"

// === Data Kontak ===
const PHONE_E164 = "6285174241304" // nomor WA, tanpa tanda + atau spasi
const DISPLAY_PHONE = "+62 851-7424-1304" // nomor yang ditampilkan
const ADDRESS = "3JC7+88G, Cikawao, Kec. Lengkong, Kota Bandung, Jawa Barat 40261"
const DEFAULT_MESSAGE = "Halo Kantin Mini, saya ingin bertanya tentang menu dan layanan Anda."

// === URL Builder ===
// WhatsApp
const buildWAUrl = (phone: string, text: string) =>
  `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`

// Maps hanya titik lokasi (bukan rute)
const buildMapsPointUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

export function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Lokasi",
      content: ADDRESS,
      actionHref: buildMapsPointUrl(ADDRESS),
      actionLabel: "Lihat lokasi di Google Maps",
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      content: "Senin - Jumat: 08:00 - 20:00",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      content: DISPLAY_PHONE,
      actionHref: buildWAUrl(PHONE_E164, DEFAULT_MESSAGE),
      actionLabel: "Chat via WhatsApp",
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-background" aria-label="Hubungi kami">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <header className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Hubungi Kami</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ada pertanyaan atau ingin memesan? Hubungi kami langsung melalui WhatsApp atau kunjungi lokasi kami.
            </p>
          </header>

          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactInfo.map((info, idx) => (
                <Card
                  key={idx}
                  className="bg-card border-border hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <info.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{info.title}</h4>
                    {info.actionHref ? (
                      <a
                        href={info.actionHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline break-words"
                        aria-label={info.actionLabel}
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{info.content}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">Siap Memesan?</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Hubungi kami sekarang untuk pemesanan atau informasi lebih lanjut tentang menu kami.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                {/* WhatsApp Button */}
                <a
                  href={buildWAUrl(PHONE_E164, DEFAULT_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-md text-lg py-6 px-5 transition"
                >
                  <MessageCircle className="h-6 w-6 mr-3" /> Chat WhatsApp
                </a>

                {/* Maps Button */}
                <a
                  href={buildMapsPointUrl(ADDRESS)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border-2 border-border hover:bg-primary/5 rounded-md text-lg py-6 px-5 text-foreground transition"
                >
                  <Navigation className="h-6 w-6 mr-3" /> Lihat Lokasi
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

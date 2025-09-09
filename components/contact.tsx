"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, MessageCircle, Navigation } from "lucide-react"

export function Contact() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "62812XXXXXXX"
    const message = "Halo Kantin Mini, saya ingin bertanya tentang menu dan layanan Anda."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  const handleMapsClick = () => {
    // Placeholder for maps functionality
    window.open("#maps-placeholder", "_blank", "noopener,noreferrer")
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Lokasi",
      content: "Jl. Raya Merdeka No. 123, Jakarta Selatan 12345",
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      content: "Senin - Minggu: 07:00 - 21:00",
      subtitle: "Buka setiap hari",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      content: "+62 812-XXXX-XXXX",
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-background" aria-label="Hubungi kami">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <header className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Hubungi Kami</h2>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              Ada pertanyaan atau ingin memesan? Hubungi kami langsung melalui WhatsApp atau kunjungi lokasi kami.
            </p>
          </header>

          <div className="space-y-8">
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div
                      className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                      aria-hidden="true"
                    >
                      <info.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{info.title}</h4>
                    <p className="text-muted-foreground text-sm mb-3">{info.content}</p>
                    {info.subtitle && <p className="text-xs text-muted-foreground mb-4">{info.subtitle}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">Siap Memesan?</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Hubungi kami sekarang untuk pemesanan atau informasi lebih lanjut tentang menu kami.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white focus:bg-green-700 flex-1 text-lg py-6"
                  onClick={handleWhatsAppClick}
                  aria-label="Chat dengan kami melalui WhatsApp"
                >
                  <MessageCircle className="h-6 w-6 mr-3" aria-hidden="true" />
                  Chat WhatsApp
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 text-lg py-6 border-2 hover:bg-primary/5 bg-transparent"
                  onClick={handleMapsClick}
                  aria-label="Lihat lokasi kami di Google Maps"
                >
                  <Navigation className="h-6 w-6 mr-3" aria-hidden="true" />
                  Buka Maps
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

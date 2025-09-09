"use client"

import { Button } from "@/components/ui/button"
import { ChefHat, Clock, MapPin, MessageCircle, Star } from "lucide-react"
import Image from "next/image"

export function Hero() {
  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleWhatsAppClick = () => {
    const phoneNumber = "62812XXXXXXX"
    const message = "Halo Kantin Mini, saya ingin bertanya tentang menu dan layanan Anda."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <section
      className="relative bg-gradient-to-br from-background via-card/30 to-primary/5 py-8 md:py-16 overflow-hidden"
      aria-label="Hero section"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium animate-bounce-in">
              <Star className="h-4 w-4 fill-current" aria-hidden="true" />
              <span>5/5 Rating Pelanggan</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
                Cita Rasa <span className="text-primary font-extrabold">Nusantara</span> di Kantin Mini
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Nikmati kelezatan masakan Indonesia dengan bahan segar, harga terjangkau, dan pelayanan cepat di
                lingkungan yang nyaman dan ramah.
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 text-sm text-muted-foreground animate-slide-up animate-delay-200"
              role="list"
            >
              <div
                className="flex items-center justify-center sm:justify-start gap-2 bg-card/50 px-3 py-2 rounded-lg"
                role="listitem"
              >
                <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="font-medium">Buka 09:00 - 20:00</span>
              </div>
              <div
                className="flex items-center justify-center sm:justify-start gap-2 bg-card/50 px-3 py-2 rounded-lg"
                role="listitem"
              >
                <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="font-medium">Delivery Available</span>
              </div>
            </div>

            <div className="pt-4 space-y-4 animate-slide-up animate-delay-300">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Button
                  onClick={scrollToMenu}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:scale-105 mobile-enhanced-shadow"
                  aria-label="Lihat menu makanan dan minuman kami"
                >
                  <ChefHat className="mr-2 h-5 w-5" aria-hidden="true" />
                  Lihat Menu Kami
                </Button>

                <Button
                  onClick={handleWhatsAppClick}
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 focus:scale-105 bg-transparent"
                  aria-label="Hubungi kami melalui WhatsApp"
                >
                  <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                  <span className="hidden sm:inline">Chat </span>WhatsApp
                </Button>
              </div>

              {/* <p className="text-xs sm:text-sm text-muted-foreground text-center lg:text-left">
                📞 Respon cepat dalam 5 menit • 🚚 Gratis ongkir minimal Rp 50.000
              </p> */}
            </div>
          </div>

          <div className="relative animate-fade-in animate-delay-100">
            <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl mobile-enhanced-shadow">
              <Image
                src="/indonesian-nasi-paket-with-fried-chicken--sambal--.jpg"
                alt="Paket Nasi Kantin Mini dengan nasi putih, ayam goreng krispi, sambal matah segar, dan sayuran pendamping yang disajikan di piring putih"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />

              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                <div
                  className="bg-background/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-border/20"
                  role="complementary"
                  aria-label="Paket spesial highlight"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-foreground text-sm sm:text-base mb-1">Chicken Katsu</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">Saus BBQ/Lada Hitam/Lava</p>
                    </div>
                    <div className="text-right">
                      <span
                        className="text-lg sm:text-2xl font-bold text-primary block"
                        aria-label="Harga dua puluh dua ribu rupiah"
                      >
                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(22000)}
                      </span>
                      <span className="text-xs text-accent font-medium">Hemat 15%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-4 right-4 bg-accent/90 text-accent-foreground px-3 py-1 rounded-full text-xs font-bold animate-bounce-in animate-delay-400">
                POPULER
              </div>
            </div>

            <div
              className="absolute -top-4 -right-4 w-20 sm:w-24 h-20 sm:h-24 bg-primary/20 rounded-full blur-xl animate-pulse"
              aria-hidden="true"
            ></div>
            <div
              className="absolute -bottom-4 -left-4 w-24 sm:w-32 h-24 sm:h-32 bg-accent/20 rounded-full blur-xl animate-pulse"
              style={{ animationDelay: "1s" }}
              aria-hidden="true"
            ></div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 sm:w-48 h-32 sm:h-48 bg-secondary/5 rounded-full blur-2xl"></div>
      </div>
    </section>
  )
}

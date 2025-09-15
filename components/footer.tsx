"use client"

import { Heart, MapPin, Clock, Phone } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">Kantin Mini</h3>
            <p className="text-muted-foreground text-pretty">
              Menghadirkan cita rasa autentik masakan Nusantara dengan bahan segar, harga terjangkau, dan pelayanan
              terbaik untuk keluarga Indonesia.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-red-500" aria-hidden="true" />
              <span>Dibuat dengan cinta untuk Indonesia</span>
            </div>
          </div>

          {/* Quick Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Informasi Cepat</h4>
            <address className="space-y-3 text-sm not-italic">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="text-muted-foreground">
                  Gang Melong Kaler I no.1
                  <br />
                  Jalan Lengkong Besar, Kota Bandung
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                <span className="text-muted-foreground">Senin - Jumat: 08:00 - 20:00</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                <span className="text-muted-foreground">+62 851-1769-3117</span>
              </div>
            </address>
          </div>

          {/* Menu Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Kategori Menu</h4>
            <nav className="grid grid-cols-2 gap-2 text-sm" aria-label="Menu categories">
              {["Paket Nasi", "Light Bites", "Kapten Chicken", "Pempek", "Minuman"].map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="text-left text-muted-foreground hover:text-primary transition-colors duration-200 focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-1 py-0.5"
                  aria-label={`Lihat menu kategori ${category}`}
                >
                  {category}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="text-sm text-muted-foreground text-center">
            <p>© {currentYear} Kantin Mini. Semua hak dilindungi.</p>
            {/* <nav className="flex gap-6" aria-label="Legal links">
              <button className="hover:text-primary transition-colors duration-200 focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-1 py-0.5">
                Kebijakan Privasi
              </button>
              <button className="hover:text-primary transition-colors duration-200 focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-1 py-0.5">
                Syarat & Ketentuan
              </button>
            </nav> */}
          </div>
        </div>
      </div>
    </footer>
  )
}

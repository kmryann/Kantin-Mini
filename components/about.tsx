'use client';

import ImageCarousel from '@/components/ImageCarousel';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Clock, DollarSign, Zap } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: Heart,
      title: 'Menu Variatif',
      description:
        'Tersedia beragam pilihan menu, dari tradisional hingga modern, sesuai selera Anda',
    },
    {
      icon: DollarSign,
      title: 'Harga Terjangkau',
      description: 'Menu berkualitas dengan harga yang ramah di kantong untuk semua kalangan',
    },
    {
      icon: Zap,
      title: 'Pelayanan Cepat',
      description: 'Sistem pelayanan yang efisien untuk menghemat waktu berharga Anda',
    },
    {
      icon: Clock,
      title: 'Buka Senin-Jumat',
      description: 'Siap melayani Anda dari pagi hingga malam, setiap hari kerja',
    },
  ];

  // Gambar untuk carousel (ganti src sesuai aset kamu)
  const slides = [
    {
      src: '/about-kantinmini.png',
      alt: 'Suasana hangat di Kantin Mini dengan pencahayaan lembut dan dekorasi tradisional',
    },
    {
      src: '/about-kantinmini-2.jpg',
      alt: 'Menu andalan tersaji rapi di etalase Kantin Mini',
    },
    {
      src: '/about-kantinmini-3.jpg',
      alt: 'Area kasir dan pelayanan cepat di Kantin Mini',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-card/30" aria-label="Tentang Kantin Mini">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <header className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-6">
              Tentang Kantin Mini
            </h2>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              Lebih dari sekadar tempat makan, Kantin Mini adalah rumah kedua untuk menikmati
              kelezatan masakan Indonesia dengan suasana yang hangat dan nyaman.
            </p>
          </header>

          {/* Main Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 md:mb-20">
            <article className="space-y-6 md:space-y-8">
              <h3 className="text-2xl font-semibold text-foreground">Cerita Kami</h3>
              <div className="space-y-4 md:space-y-6 text-muted-foreground">
                <p className="text-pretty">
                  Kantin Mini hadir dengan misi sederhana: menghadirkan cita rasa autentik masakan
                  Nusantara yang dapat dinikmati setiap hari. Kami percaya bahwa makanan yang baik
                  tidak harus mahal, dan pelayanan yang ramah adalah kunci kepuasan pelanggan.
                </p>
                <p className="text-pretty">
                  Dari paket nasi dengan lauk pilihan hingga pempek khas Palembang, setiap hidangan
                  disiapkan dengan penuh perhatian menggunakan resep turun temurun dan bahan-bahan
                  segar pilihan.
                </p>
                <p className="text-pretty">
                  Bergabunglah dengan ribuan pelanggan yang telah mempercayai Kantin Mini sebagai
                  pilihan utama untuk menikmati makanan berkualitas dengan harga terjangkau.
                </p>
              </div>
            </article>

            {/* Carousel Gambar */}
            <div className="relative">
              <ImageCarousel
                slides={slides}
                intervalMs={4000}        // atur interval rotasi
                aspect="aspect-square"   // bisa 'aspect-video' untuk landscape
                rounded="rounded-2xl"
                shadow="shadow-xl"
                className=""
              />

              {/* Elemen dekoratif */}
              <div
                className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Features Grid */}
          <section aria-label="Keunggulan Kantin Mini">
            <h3 className="sr-only">Keunggulan dan Fitur Kantin Mini</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-card border-border hover:shadow-md transition-all duration-300 hover:scale-[1.02] focus-within:shadow-md animate-fade-in"
                  role="article"
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div
                      className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto"
                      aria-hidden="true"
                    >
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground text-pretty">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

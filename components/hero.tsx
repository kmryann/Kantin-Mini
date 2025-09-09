import Image from 'next/image';
import Link from 'next/link';
import { ChefHat, Clock, Navigation, MessageCircle, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- KONFIG ---
const HERO_IMG = '/images/hero-kantin.png'; // letakkan di /public/hero.jpg
const PHONE_E164 = '62812XXXXXXX'; // nomor WA tanpa + atau spasi
const WA_TEXT = 'Halo Kantin Mini, saya ingin bertanya tentang menu hari ini.';

const waUrl = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(WA_TEXT)}`;

export default function Hero() {
  return (
    <section className="relative isolate">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={HERO_IMG}
          alt="Kantin Mini hero background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* overlay agar teks selalu terbaca */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/45" />
      </div>

      <div className="mx-auto max-w-5xl px-5 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24">
        {/* Badge */}
        <div className="flex justify-center">
          <span
            className="
      inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow
      bg-emerald-600 text-white
      dark:bg-emerald-500 dark:text-emerald-100
    "
          >
            <Tag className="h-4 w-4" />
            Harga Terjangkau untuk Semua
          </span>
        </div>

        {/* Headline */}
        <h1 className="mt-5 text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Cita Rasa <span className="text-emerald-400">Terbaik</span>
          <br className="hidden sm:block" /> di Kantin Mini
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-4 max-w-2xl text-center text-base sm:text-lg text-white/90">
          Nikmati beragam pilihan menu lezat, mulai dari masakan Nusantara, Asia, hingga hidangan
          modern. Harga terjangkau, rasa istimewa, dan pelayanan ramah untuk semua pelanggan.
        </p>

        {/* Info pills */}
        <div className="mx-auto mt-6 flex max-w-md flex-col gap-3">
          <div className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-white/90 backdrop-blur">
            <Clock className="h-4 w-4 text-emerald-300" />
            <span>Buka 09:00 - 20:00</span>
          </div>
          <div className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-white/90 backdrop-blur">
            <Navigation className="h-4 w-4 text-emerald-300" />
            <span>Delivery Available</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {/* Hijau solid */}
          <Button
            asChild
            size="lg"
            className="
      h-12 w-full sm:w-auto px-6 rounded-xl shadow-md font-semibold
      bg-[#1f7a3f] text-white hover:bg-[#1a6a37]
      dark:bg-emerald-600 dark:hover:bg-emerald-500 dark:text-white
    "
          >
            <a href="#menu" aria-label="Lihat Menu Kami" className="flex items-center gap-2">
              <ChefHat className="h-5 w-5" />
              Lihat Menu Kami
            </a>
          </Button>

          {/* Outline hijau */}
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="
      h-12 w-full sm:w-auto px-6 rounded-xl font-semibold shadow-md
      border-2 text-[#1f7a3f] border-[#1f7a3f] bg-white/90 hover:text-white hover:bg-[#1f7a3f]
      dark:bg-[#0F172A] dark:text-emerald-300 dark:border-gray-900
      dark:hover:bg-white dark:hover:text-[#0F172A]
    "
          >
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat WhatsApp"
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Chat WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

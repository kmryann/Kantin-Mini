'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

// ===== Helper Badge Dinamis =====
const getCategoryMeta = (raw: string) => {
  const key = (raw || '').toLowerCase().trim();
  const map: Record<string, { className: string; emoji: string }> = {
    makanan: { className: 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-white', emoji: '🍽️' },
    minuman: { className: 'bg-sky-600 text-white dark:bg-sky-500 dark:text-white', emoji: '☕' },
    snack:   { className: 'bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-900', emoji: '🍪' },
    dessert: { className: 'bg-pink-600 text-white dark:bg-pink-500 dark:text-white', emoji: '🍰' },
    pedas:   { className: 'bg-red-600 text-white dark:bg-red-500 dark:text-white', emoji: '🌶️' },
  };
  return map[key] ?? { className: 'bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-white', emoji: '🏷️' };
};

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  recommended?: boolean;
}

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);

  const getImageAlt = (x: MenuItem) => `${x.name} - ${x.description} dari kategori ${x.category}`;

  const meta = getCategoryMeta(item.category);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group overflow-hidden bg-card border-border hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer rounded-xl">
          {/* Gambar */}
          <div className="aspect-[4/3] overflow-hidden relative">
            {item.recommended && (
              <div className="absolute top-2 right-2 z-10 bg-primary text-white text-xs font-semibold px-2 py-1 rounded shadow">
                Recommended
              </div>
            )}
            <Image
              src={item.image || '/placeholder.svg?height=300&width=400'}
              alt={getImageAlt(item)}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>

          {/* Konten Card */}
          <CardContent className="p-4 space-y-3">
            {/* Judul */}
            <h3 className="font-semibold text-foreground leading-tight line-clamp-1">
              {item.name}
            </h3>

            {/* Kategori */}
            <div className="flex items-center gap-2">
              <Badge
                className={`text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1 ${meta.className} shadow-xs`}
              >
                <span aria-hidden className="text-[12px]">{meta.emoji}</span>
                <span className="font-medium">{item.category}</span>
              </Badge>
            </div>

            {/* Deskripsi */}
            <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>

            {/* Harga */}
            <div className="flex justify-center pt-2">
              <div
                className="inline-flex items-center rounded-full text-base sm:text-lg font-bold px-4 py-2 shadow-sm"
                style={{ backgroundColor: '#d97706', color: '#fff' }}
              >
                {formatPrice(item.price)}
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle className="font-semibold">{item.name}</DialogTitle>
          <DialogDescription className="sr-only">
            Detail menu {item.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Gambar besar */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-lg">
            <Image
              src={item.image || '/placeholder.svg?height=600&width=800'}
              alt={getImageAlt(item)}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Deskripsi */}
          <p className="text-sm text-muted-foreground">{item.description}</p>

          {/* Footer modal: kategori kiri, harga kanan */}
          <div className="flex items-center justify-between">
            <Badge className={`text-xs flex items-center gap-1 ${meta.className}`}>
              <span aria-hidden>{meta.emoji}</span>
              {item.category}
            </Badge>
            <div
              className="inline-flex items-center rounded-full text-lg font-bold px-4 py-2"
              style={{ backgroundColor: '#d97706', color: '#fff' }}
            >
              {formatPrice(item.price)}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

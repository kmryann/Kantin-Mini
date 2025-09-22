'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Menu, X } from 'lucide-react';

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav
      className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a
              href="#"
              aria-label="Kantin Mini - Beranda"
              className="inline-flex items-center gap-2"
            >
              {/* Logo placeholder */}
              <img src="/logo-kantinmini.png" alt="Logo Kantin Mini" className="h-6 w-auto" />
              <span className="text-xl font-bold text-foreground tracking-tight">Kantin Mini</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={scrollToMenu}
              aria-label="Lihat menu makanan dan minuman"
            >
              Menu
            </Button>
            <Button variant="ghost" onClick={scrollToAbout} aria-label="Tentang Kantin Mini">
              About
            </Button>
            <Button variant="ghost" onClick={scrollToContact} aria-label="Hubungi Kantin Mini">
              Contact
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border" role="menu">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={scrollToMenu}
                role="menuitem"
                aria-label="Lihat menu makanan dan minuman"
              >
                Menu
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={scrollToAbout}
                role="menuitem"
                aria-label="Tentang Kantin Mini"
              >
                About
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={scrollToContact}
                role="menuitem"
                aria-label="Hubungi Kantin Mini"
              >
                Contact
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

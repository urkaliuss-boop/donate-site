'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const NAV_LINKS = [
  { label: 'Главная', href: '/' },
  { label: 'Магазин CBM', href: '/shop/cbm' },
  { label: 'Магазин SCP', href: '/shop/scp' },
];

export default function Navbar() {
  const pathname = usePathname();
  const count = useCartStore((s) => s.count());
  const user = useAuthStore((s) => s.user);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="FUNCLUB"
              className="w-10 h-10 rounded-xl object-cover shadow-lg group-hover:shadow-accent-primary/40 transition-all duration-300 group-hover:scale-105"
            />
            <span className="font-black text-xl gradient-text">FUNCLUB</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  pathname === link.href
                    ? 'bg-accent-primary/20 text-accent-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="relative p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-all duration-200"
            >
              <ShoppingCart size={20} />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-accent-primary rounded-full text-xs flex items-center justify-center text-white font-bold"
                >
                  {count}
                </motion.span>
              )}
            </Link>
            <Link
              href={user ? '/profile' : '/auth'}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent-primary/10 border border-accent-primary/30 text-accent-primary text-sm font-medium hover:bg-accent-primary/20 transition-all duration-200"
            >
              <User size={16} />
              <span className="hidden sm:block">{user ? user.name.split(' ')[0] : 'Войти'}</span>
            </Link>
            <button
              className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-surface/95 backdrop-blur-xl"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-all',
                    pathname === link.href
                      ? 'bg-accent-primary/20 text-accent-primary'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

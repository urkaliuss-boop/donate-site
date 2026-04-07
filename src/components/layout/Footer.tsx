'use client';

import Link from 'next/link';
import { Zap, Github, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-surface/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-bold text-lg gradient-text">FUNCLUB</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              Донат-платформа для игровых серверов CBM и SCP: Secret Laboratory.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4 text-sm uppercase tracking-wider">Навигация</h3>
            <ul className="space-y-2">
              {[
                { label: 'Главная', href: '/' },
                { label: 'Магазин SCP SL', href: '/shop/scp' },
                { label: 'Магазин CBM', href: '/shop/cbm' },
                { label: 'Профиль', href: '/profile' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-text-secondary text-sm hover:text-accent-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4 text-sm uppercase tracking-wider">Сообщество</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-text-secondary hover:text-accent-primary hover:border-accent-primary/40 transition-all duration-200"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-text-secondary hover:text-accent-primary hover:border-accent-primary/40 transition-all duration-200"
              >
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">© 2024 FUNCLUB. Все права защищены.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-text-muted text-sm hover:text-text-secondary transition-colors">Политика конфиденциальности</Link>
            <Link href="#" className="text-text-muted text-sm hover:text-text-secondary transition-colors">Оферта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

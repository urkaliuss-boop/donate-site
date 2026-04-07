'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookie-consent');
    if (!accepted) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50"
        >
          <div className="glass border border-border rounded-2xl p-5 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center flex-shrink-0">
                <Cookie size={20} className="text-accent-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-text-primary text-sm mb-1">Мы используем cookies</p>
                <p className="text-text-muted text-xs leading-relaxed">
                  Этот сайт использует файлы cookie для улучшения пользовательского опыта,
                  аналитики и корректной работы авторизации.
                </p>
              </div>
              <button
                onClick={() => setShow(false)}
                className="text-text-muted hover:text-text-secondary transition-colors flex-shrink-0"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="primary" size="sm" onClick={accept} className="flex-1">
                Принять
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShow(false)}>
                Закрыть
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ParticlesBg from '@/components/ui/ParticlesBg';
import { SERVERS } from '@/data/servers';
import clsx from 'clsx';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <ParticlesBg />

      <section className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center px-4 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight"
        >
          Добро пожаловать на{' '}
          <span className="gradient-text">FUNCLUB</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-text-secondary text-lg sm:text-xl max-w-2xl mb-12 leading-relaxed"
        >
          Официальная платформа для покупки привилегий
          на наших игровых серверах.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl"
        >
          {Object.values(SERVERS).map((server) => (
            <motion.div
              key={server.id}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={`/shop/${server.id}`}
                className={clsx(
                  'group block glass rounded-2xl p-8 border transition-all duration-300',
                  server.id === 'cbm'
                    ? 'border-amber-500/20 hover:border-amber-500/50 hover:shadow-[0_12px_40px_rgba(245,158,11,0.2)]'
                    : 'border-indigo-500/20 hover:border-indigo-500/50 hover:shadow-[0_12px_40px_rgba(99,102,241,0.2)]'
                )}
              >
                <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 border border-border/50 bg-surface-2 group-hover:border-border transition-colors">
                  <img src={server.image} alt={server.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div
                  className={clsx(
                    'flex items-center justify-center gap-2 w-full py-4 rounded-xl text-base font-black transition-all duration-200 group-hover:gap-3 shadow-lg',
                    server.id === 'cbm'
                      ? 'bg-amber-500 text-background hover:bg-amber-400 shadow-amber-500/20'
                      : 'bg-indigo-500 text-white hover:bg-indigo-400 shadow-indigo-500/20'
                  )}
                >
                  Магазин {server.name}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}

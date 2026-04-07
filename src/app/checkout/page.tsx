'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  CheckCircle, CreditCard, User, Mail, ShoppingBag,
  MessageSquare, Gamepad2, Sword, FlaskConical, Bitcoin, Building2
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import Button from '@/components/ui/Button';
import clsx from 'clsx';

function getRequiredFields(items: { name: string; category: string }[]) {
  const discordKeywords = ['discord'];
  const needsDiscord = items.some((i) =>
    discordKeywords.some((kw) => i.name.toLowerCase().includes(kw))
  );
  const needsSteam = items.some((i) =>
    !discordKeywords.some((kw) => i.name.toLowerCase().includes(kw))
  );
  return { needsDiscord, needsSteam };
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const router = useRouter();
  const [form, setForm] = useState({ discord: '', steam: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const { needsDiscord, needsSteam } = useMemo(() => getRequiredFields(items), [items]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setDone(true);
    clearCart();
  };

  if (items.length === 0 && !done) {
    router.replace('/cart');
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-24">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }} className="w-24 h-24 bg-success/10 border border-success/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} className="text-success" />
            </motion.div>
            <h1 className="text-3xl font-black text-text-primary mb-3">Заказ оформлен!</h1>
            <p className="text-text-secondary mb-2">Товары будут зачислены в течение нескольких минут.</p>
            <p className="text-text-muted text-sm mb-8">Подтверждение отправлено на <strong className="text-text-secondary">{form.email || 'вашу почту'}</strong></p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="primary" onClick={() => router.push('/')}>На главную</Button>
              <Button variant="secondary" onClick={() => router.push('/profile')}>Мой профиль</Button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-10">
              <h1 className="text-3xl font-black gradient-text">Оформление заказа</h1>
              <p className="text-text-secondary mt-1">Заполни форму и получи товары мгновенно</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
                <div className="glass rounded-2xl border border-border p-6 space-y-4">
                  <h2 className="font-bold text-text-primary flex items-center gap-2">
                    <User size={16} className="text-accent-primary" /> Данные для зачисления
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">Email для чека</label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="input-dark w-full pl-9 py-3 rounded-xl pr-4" />
                    </div>
                  </div>

                  {needsDiscord && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5 flex items-center gap-1.5">
                        <MessageSquare size={14} className="text-[#5865F2]" /> Ник в Discord
                        <span className="text-xs text-text-muted font-normal">(для плашки)</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm font-bold select-none">@</span>
                        <input type="text" placeholder="username" value={form.discord} onChange={(e) => setForm({ ...form, discord: e.target.value })} required className="input-dark w-full pl-8 py-3 rounded-xl pr-4" />
                      </div>
                    </motion.div>
                  )}

                  {needsSteam && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5 flex items-center gap-1.5">
                        <Gamepad2 size={14} className="text-accent-primary" /> Steam ID64
                        <span className="text-xs text-text-muted font-normal">(для привилегии)</span>
                      </label>
                      <div className="relative">
                        <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input type="text" placeholder="76561198XXXXXXXXX" value={form.steam} onChange={(e) => setForm({ ...form, steam: e.target.value })} required pattern="[0-9]{17}" title="Введите 17-значный Steam ID64" className="input-dark w-full pl-9 py-3 rounded-xl pr-4 font-mono" />
                      </div>
                      <p className="text-xs text-text-muted mt-1">
                        Узнай свой Steam ID64 на <a href="https://steamid.io" target="_blank" rel="noopener noreferrer" className="text-accent-primary underline">steamid.io</a>
                      </p>
                    </motion.div>
                  )}
                </div>

                <div className="glass rounded-2xl border border-border p-6">
                  <h2 className="font-bold text-text-primary flex items-center gap-2 mb-4">
                    <CreditCard size={16} className="text-accent-primary" /> Способ оплаты
                  </h2>
                  <div className="flex gap-3 mb-4">
                    {[
                      { icon: CreditCard, label: 'Карта' },
                      { icon: Building2, label: 'СБП' },
                      { icon: Bitcoin, label: 'Крипто' },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex-1 py-2.5 rounded-xl bg-surface-2 border border-border flex items-center justify-center gap-1.5 text-xs text-text-secondary font-medium cursor-default">
                        <Icon size={13} /> {label}
                      </div>
                    ))}
                  </div>
                  <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>Оплатить {total()}₽</Button>
                </div>
              </form>

              <div className="lg:col-span-2">
                <div className="glass rounded-2xl border border-border p-6 sticky top-20">
                  <h2 className="font-bold text-text-primary mb-5 flex items-center gap-2">
                    <ShoppingBag size={16} className="text-accent-primary" /> Ваш заказ
                  </h2>
                  <div className="space-y-3 mb-5">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm gap-3">
                        <span className="text-text-secondary flex items-center gap-1.5 truncate">
                          {item.server === 'cbm' ? <Sword size={13} className="text-amber-400 flex-shrink-0" /> : <FlaskConical size={13} className="text-indigo-400 flex-shrink-0" />}
                          <span className="truncate">{item.name} ×{item.quantity}</span>
                        </span>
                        <span className="text-text-primary font-medium flex-shrink-0">{item.price * item.quantity}₽</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-text-primary">К оплате:</span>
                      <span className="text-2xl font-black gradient-text">{total()}₽</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

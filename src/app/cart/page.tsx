'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sword, FlaskConical } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import Button from '@/components/ui/Button';
import clsx from 'clsx';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, count, clearCart } = useCartStore();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-10"
      >
        <div>
          <h1 className="text-3xl font-black gradient-text flex items-center gap-3">
            <ShoppingCart size={28} /> Корзина
          </h1>
          <p className="text-text-secondary mt-1">{count()} {count() === 1 ? 'товар' : 'товаров'}</p>
        </div>
        {items.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearCart}>
            <Trash2 size={14} /> Очистить
          </Button>
        )}
      </motion.div>

      {items.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
          <ShoppingBag className="w-16 h-16 mx-auto mb-5 text-text-muted" />
          <h2 className="text-xl font-bold text-text-primary mb-2">Корзина пуста</h2>
          <p className="text-text-secondary mb-8">Добавьте товары из магазина</p>
          <div className="flex gap-4 justify-center">
            <Link href="/shop/scp"><Button variant="scp">Магазин SCP SL</Button></Link>
            <Link href="/shop/cbm"><Button variant="cbm">Магазин CBM</Button></Link>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  className="glass rounded-2xl border border-border p-5 flex gap-4 items-center"
                >
                  <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', item.server === 'cbm' ? 'bg-amber-500/10' : 'bg-indigo-500/10')}>
                    {item.server === 'cbm' ? <Sword size={20} className="text-amber-400" /> : <FlaskConical size={20} className="text-indigo-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text-primary truncate">{item.name}</p>
                    <p className="text-xs text-text-muted mt-0.5">{item.server === 'cbm' ? 'CBM' : 'SCP SL'} · {item.category}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-all">
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center text-sm font-bold text-text-primary">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-all">
                      <Plus size={12} />
                    </button>
                  </div>
                  <p className="font-bold text-text-primary w-16 text-right flex-shrink-0">{item.price * item.quantity}₽</p>
                  <button onClick={() => removeItem(item.id)} className="text-text-muted hover:text-danger transition-colors flex-shrink-0">
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl border border-border p-6 h-fit sticky top-20">
            <h2 className="font-bold text-text-primary text-lg mb-5">Итог</h2>
            <div className="space-y-3 mb-5">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-text-secondary truncate max-w-[60%]">{item.name} ×{item.quantity}</span>
                  <span className="text-text-primary font-medium">{item.price * item.quantity}₽</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-text-primary">Итого:</span>
                <span className="text-2xl font-black gradient-text">{total()}₽</span>
              </div>
            </div>
            <Link href="/checkout"><Button variant="primary" size="lg" fullWidth>Оформить заказ <ArrowRight size={16} /></Button></Link>
            <div className="flex gap-3 mt-3">
              <Link href="/shop/scp" className="flex-1"><Button variant="secondary" size="sm" fullWidth>SCP SL</Button></Link>
              <Link href="/shop/cbm" className="flex-1"><Button variant="secondary" size="sm" fullWidth>CBM</Button></Link>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

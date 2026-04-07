'use client';

import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ShoppingCart, Search, Tag, Star } from 'lucide-react';
import { getProductsByServer, Product } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { SERVERS } from '@/data/servers';
import Button from '@/components/ui/Button';
import clsx from 'clsx';

export default function ShopPage() {
  const params = useParams();
  const server = params.server as 'cbm' | 'scp';
  const serverInfo = SERVERS[server];

  const products = getProductsByServer(server);
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  if (!serverInfo) return <div className="text-center py-24 text-text-muted">Сервер не найден</div>;

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.description?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  const handleAdd = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      server: product.server as 'cbm' | 'scp',
      category: product.category,
      image: product.image,
    });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className={clsx('text-4xl font-black mb-2', server === 'scp' ? 'text-indigo-400' : 'text-amber-400')}>
          Магазин {serverInfo.name === 'CBM' ? 'SCP:CBM' : 'SCP SL'}
        </h1>
        <p className="text-text-muted text-sm">{serverInfo.fullName}</p>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-8">
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-dark w-full pl-9 py-2.5 rounded-xl pr-4 text-sm"
          />
        </div>
      </motion.div>

      {/* Products */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <AnimatePresence>
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl border border-border overflow-hidden hover:border-accent-primary/30 transition-all duration-300 group flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-square bg-surface-2 p-4 flex items-center justify-center">
                {product.badge && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-accent-primary text-white text-xs font-bold z-10">
                    {product.badge}
                  </span>
                )}
                {product.popular && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-500 text-background text-xs font-bold flex items-center gap-1 z-10">
                    <Star size={9} fill="currentColor" /> ТОП
                  </span>
                )}
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <Tag size={48} className="text-text-muted" />
                )}
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-black text-text-primary text-sm mb-1 leading-tight">{product.name}</h3>
                {product.description && (
                  <p className="text-text-muted text-xs leading-relaxed mb-3 flex-1 line-clamp-3">{product.description}</p>
                )}
                <div className="mt-auto">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xl font-black text-text-primary">{product.price}₽</span>
                    {product.originalPrice && (
                      <>
                        <span className="text-text-muted text-xs line-through">{product.originalPrice}₽</span>
                        <span className="text-success text-xs font-bold">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </span>
                      </>
                    )}
                  </div>
                  <Button
                    variant={server === 'scp' ? 'scp' : 'cbm'}
                    size="sm"
                    fullWidth
                    onClick={() => handleAdd(product)}
                    className={added === product.id ? 'opacity-80' : ''}
                  >
                    <ShoppingCart size={13} />
                    {added === product.id ? 'Добавлено!' : 'В корзину'}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-text-muted">
          <Search size={40} className="mx-auto mb-4 opacity-40" />
          <p>Ничего не найдено</p>
        </div>
      )}
    </div>
  );
}

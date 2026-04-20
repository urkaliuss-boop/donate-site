'use client';

import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogOut, User, ShoppingBag, Calendar, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import Button from '@/components/ui/Button';

interface Purchase {
  id: string;
  product_name: string;
  amount: number;
  status: string;
  created_at: string;
}

export default function ProfilePage() {
  const { user, signOut, loading } = useAuthStore();
  const router = useRouter();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loadingPurchases, setLoadingPurchases] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.replace('/auth');
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchPurchases() {
      if (!user) return;
      setLoadingPurchases(true);
      try {
        const data = await apiFetch('/purchases');
        const formatted = data.map((p: any) => ({
          id: p.id,
          product_name: p.product?.name || 'Неизвестный товар',
          amount: p.product?.priceCents ? p.product.priceCents / 100 : 0,
          status: 'completed',
          created_at: p.createdAt
        }));
        setPurchases(formatted);
      } catch (e) {
        console.error(e);
      }
      setLoadingPurchases(false);
    }
    fetchPurchases();
  }, [user]);

  if (loading || !user) return null;

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; label: string }> = {
    completed: { icon: CheckCircle, color: 'text-success', label: 'Выполнен' },
    pending: { icon: Clock, color: 'text-amber-400', label: 'Ожидание' },
    failed: { icon: XCircle, color: 'text-danger', label: 'Ошибка' },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="glass border border-border rounded-2xl p-6 mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center">
              <User size={32} className="text-accent-primary" />
            </div>
            <div>
              <h1 className="text-xl font-black text-text-primary">{user.name}</h1>
              <p className="text-text-muted text-sm">{user.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut size={15} /> Выйти
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="glass border border-border rounded-2xl p-5 text-center">
            <ShoppingBag size={24} className="text-accent-primary mx-auto mb-2" />
            <p className="text-2xl font-black text-text-primary">{purchases.length}</p>
            <p className="text-text-muted text-sm">Покупок</p>
          </div>
          <div className="glass border border-border rounded-2xl p-5 text-center">
            <Calendar size={24} className="text-accent-primary mx-auto mb-2" />
            <p className="text-2xl font-black text-text-primary">
              {purchases.reduce((sum, p) => sum + p.amount, 0)}₽
            </p>
            <p className="text-text-muted text-sm">Потрачено</p>
          </div>
        </div>

        {/* Purchases */}
        <div className="glass border border-border rounded-2xl p-6">
          <h2 className="text-lg font-bold text-text-primary mb-5 flex items-center gap-2">
            <ShoppingBag size={18} className="text-accent-primary" /> История покупок
          </h2>

          {loadingPurchases ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={24} className="text-accent-primary animate-spin" />
            </div>
          ) : purchases.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={40} className="text-text-muted mx-auto mb-4" />
              <p className="text-text-secondary font-medium mb-1">Покупок пока нет</p>
              <p className="text-text-muted text-sm mb-5">Перейди в магазин и выбери что-нибудь!</p>
              <div className="flex gap-3 justify-center">
                <Button variant="scp" onClick={() => router.push('/shop/scp')}>Магазин SCP SL</Button>
                <Button variant="cbm" onClick={() => router.push('/shop/cbm')}>Магазин CBM</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {purchases.map((purchase) => {
                const status = statusConfig[purchase.status] || statusConfig.pending;
                const StatusIcon = status.icon;
                return (
                  <div key={purchase.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-2 border border-border/50 gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-text-primary text-sm truncate">{purchase.product_name}</p>
                      <p className="text-text-muted text-xs mt-0.5">
                        {new Date(purchase.created_at).toLocaleDateString('ru-RU', {
                          day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={`flex items-center gap-1 text-xs font-medium ${status.color}`}>
                        <StatusIcon size={13} /> {status.label}
                      </span>
                      <span className="font-bold text-text-primary text-sm">{purchase.amount}₽</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import Button from '@/components/ui/Button';

export default function AuthPage() {
  const router = useRouter();
  const { signIn, signUp } = useAuthStore();
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    let err: string | null = null;
    if (tab === 'signin') {
      err = await signIn(form.email, form.password);
    } else {
      err = await signUp(form.name, form.email, form.password);
    }
    setLoading(false);
    if (err) {
      setError(err);
    } else {
      router.push('/profile');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/logo.png" alt="FUNCLUB" className="w-16 h-16 rounded-2xl mx-auto mb-4 object-cover" />
          <h1 className="text-2xl font-black gradient-text">FUNCLUB</h1>
          <p className="text-text-muted text-sm mt-1">Игровой донат-магазин</p>
        </div>

        <div className="glass border border-border rounded-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-border">
            {(['signin', 'signup'] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(''); }}
                className={`flex-1 py-3.5 text-sm font-semibold transition-all ${
                  tab === t
                    ? 'text-accent-primary border-b-2 border-accent-primary'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {t === 'signin' ? 'Войти' : 'Регистрация'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <AnimatePresence mode="wait">
              {tab === 'signup' && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Имя</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Твоё имя"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required={tab === 'signup'}
                      className="input-dark w-full pl-9 py-3 rounded-xl pr-4"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="input-dark w-full pl-9 py-3 rounded-xl pr-4"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Пароль</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  minLength={6}
                  className="input-dark w-full pl-9 py-3 rounded-xl pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-danger text-sm bg-danger/5 border border-danger/20 rounded-lg px-3 py-2">
                {error}
              </motion.p>
            )}

            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
              {tab === 'signin' ? <><LogIn size={16} /> Войти</> : <><UserPlus size={16} /> Зарегистрироваться</>}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

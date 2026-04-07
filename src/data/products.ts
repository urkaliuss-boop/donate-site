import { CartItem } from '@/store/cartStore';

export type Product = Omit<CartItem, 'quantity'> & {
  description?: string;
  badge?: string;
  popular?: boolean;
  originalPrice?: number;
  image?: string;
};

export const PRODUCTS: Product[] = [
  // === SCP SL Products ===
  {
    id: 'scp-digestor',
    name: 'DIGESTOR',
    description: 'Привилегия ТОЛЬКО для действующих администраторов. Убирает норму по времени на сервере. Срок: 1 месяц.',
    price: 100,
    originalPrice: 350,
    server: 'scp',
    category: 'Привилегии',
    badge: 'Скидка',
    image: '/products/scp-digestor.png',
  },
  {
    id: 'scp-slot',
    name: 'RESERVED SLOT',
    description: 'Выделенный слот — позволяет заходить на сервер, даже если он полностью заполнен.',
    price: 150,
    server: 'scp',
    category: 'Привилегии',
    image: '/products/scp-slot.png',
  },
  {
    id: 'scp-badge',
    name: 'PERSONAL BADGE',
    description: 'Личная плашка в SCP:SL. После покупки свяжитесь с администрацией для выбора названия и цвета.',
    price: 250,
    originalPrice: 350,
    server: 'scp',
    category: 'Роли',
    image: '/products/scp-badge.png',
  },
  {
    id: 'scp-diamond',
    name: 'DIAMOND PATRON',
    description: 'Набор DIAMOND PATRON — максимальная поддержка проекта. Срок: 1 месяц.',
    price: 250,
    server: 'scp',
    category: 'Наборы',
    image: '/products/scp-diamond.png',
  },
  {
    id: 'scp-gold',
    name: 'GOLD PATRON',
    description: 'Набор GOLD PATRON — плашка «FUNCLUB GOLD PATRON» + бонус к XP +30%. Срок: 1 месяц.',
    price: 150,
    server: 'scp',
    category: 'Наборы',
    image: '/products/scp-gold.png',
  },
  {
    id: 'scp-platinum',
    name: 'PLATINUM PATRON',
    description: 'Набор PLATINUM PATRON — плашка «FUNCLUB PLATINUM PATRON» + бонус к XP +90%. Срок: 1 месяц.',
    price: 350,
    server: 'scp',
    category: 'Наборы',
    popular: true,
    image: '/products/scp-platinum.png',
  },
  {
    id: 'scp-discord',
    name: 'DISCORD BADGE',
    description: 'Личная плашка в Discord-сервере. Свяжитесь с администрацией для выбора названия и цвета. Срок: 1 месяц.',
    price: 200,
    server: 'scp',
    category: 'Роли',
    image: '/products/scp-discord.png',
  },
  {
    id: 'scp-helper',
    name: 'PROJECT HELPER',
    description: 'Роль Помощник Администратора. Подробности читайте в описании на сервере.',
    price: 200,
    server: 'scp',
    category: 'Роли',
    image: '/products/scp-helper.png',
  },

  // === CBM Products ===
  {
    id: 'cbm-discord',
    name: 'Плашка в DISCORD',
    description: 'Ваша личная плашка в Discord сервере SCP:CBM. После покупки укажите желаемое имя через Telegram @modalniystore.',
    price: 200,
    server: 'cbm',
    category: 'Услуги',
    image: '/products/scp-discord.png',
  },
];

export const getProductsByServer = (server: 'cbm' | 'scp') =>
  PRODUCTS.filter((p) => p.server === server);

export const getCategories = (server: 'cbm' | 'scp') => [
  'Все',
  ...Array.from(new Set(PRODUCTS.filter((p) => p.server === server).map((p) => p.category))),
];

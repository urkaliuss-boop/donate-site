export type Server = 'cbm' | 'scp';

export const SERVERS = {
  cbm: {
    id: 'cbm',
    name: 'CBM',
    fullName: 'SCP: Containment Breach Multiplayer',
    color: '#f59e0b',
    gradient: 'from-amber-600 to-orange-500',
    textGradient: 'gradient-text-cbm',
    glowClass: 'glow-amber',
    borderClass: 'border-amber-500/30',
    bgClass: 'bg-amber-500/10',
    hoverBorderClass: 'hover:border-amber-500/60',
    image: '/products/banner-cbm.webp',
  },
  scp: {
    id: 'scp',
    name: 'SCP SL',
    fullName: 'SCP: Secret Laboratory',
    color: '#6366f1',
    gradient: 'from-indigo-600 to-violet-500',
    textGradient: 'gradient-text-scp',
    glowClass: 'glow-indigo',
    borderClass: 'border-indigo-500/30',
    bgClass: 'bg-indigo-500/10',
    hoverBorderClass: 'hover:border-indigo-500/60',
    image: '/products/banner-scp.png',
  },
};

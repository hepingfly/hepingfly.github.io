'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, BookOpen, Tag, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: '首页', href: '/', icon: Home },
  { name: '文章', href: '/posts', icon: BookOpen },
  { name: '标签', href: '/tags', icon: Tag },
  { name: '关于', href: '/about', icon: User },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border safe-area-inset-bottom md:hidden"
    >
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center p-2 rounded-lg transition-colors relative',
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 rounded-lg"
                  transition={{ type: 'spring', duration: 0.4 }}
                />
              )}
              
              <item.icon 
                className={cn(
                  'h-5 w-5 mb-1 relative z-10',
                  isActive && 'scale-110'
                )} 
              />
              
              <span className="text-xs font-medium relative z-10">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}

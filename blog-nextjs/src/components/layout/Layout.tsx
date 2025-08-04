'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: 'tween' as const,
  ease: 'anticipate' as const,
  duration: 0.4,
};

export default function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <motion.main
        className={`flex-1 pt-16 pb-16 md:pb-0 ${className}`}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </motion.main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}

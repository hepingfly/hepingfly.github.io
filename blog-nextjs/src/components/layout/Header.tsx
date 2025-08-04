'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Search, 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  Tag,
  User,
  Github,
  Rss
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BLOG_CONFIG } from '@/lib/github';
import MobileSearch from '@/components/search/MobileSearch';

const navigation = [
  { name: '首页', href: '/', icon: Home },
  { name: '文章', href: '/posts', icon: BookOpen },
  { name: '标签', href: '/tags', icon: Tag },
  { name: '关于', href: '/about', icon: User },
];

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/hepingfly', icon: Github },
  { name: 'RSS', href: '/rss.xml', icon: Rss },
];

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return null;
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass shadow-sm' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={BLOG_CONFIG.avatarUrl} alt={BLOG_CONFIG.title} />
                <AvatarFallback>和</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-foreground">
                  {BLOG_CONFIG.title}
                </h1>
                <p className="text-xs text-muted-foreground -mt-1">
                  {BLOG_CONFIG.subtitle}
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Button>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Social Links */}
            <div className="hidden sm:flex items-center space-x-1">
              {socialLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="sm"
                  asChild
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.name}
                  >
                    <link.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              title="切换主题"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden glass border-t border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start space-x-2"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              ))}
              
              <div className="pt-2 border-t border-border">
                <div className="flex items-center space-x-2">
                  {socialLinks.map((link) => (
                    <Button
                      key={link.name}
                      variant="ghost"
                      size="sm"
                      asChild
                    >
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={link.name}
                      >
                        <link.icon className="h-4 w-4" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Search */}
      <MobileSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </motion.header>
  );
}

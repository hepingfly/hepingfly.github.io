'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Github, 
  Rss, 
  Mail, 
  ArrowUp,
  Coffee
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BLOG_CONFIG } from '@/lib/github';

const footerLinks = {
  navigation: [
    { name: '首页', href: '/' },
    { name: '文章', href: '/posts' },
    { name: '标签', href: '/tags' },
    { name: '关于', href: '/about' },
  ],
  social: [
    { name: 'GitHub', href: 'https://github.com/hepingfly', icon: Github },
    { name: 'RSS', href: '/rss.xml', icon: Rss },
    { name: '邮箱', href: 'mailto:your-email@example.com', icon: Mail },
  ],
  resources: [
    { name: 'Gmeek', href: 'https://github.com/Meekdai/Gmeek' },
    { name: 'Next.js', href: 'https://nextjs.org' },
    { name: 'Tailwind CSS', href: 'https://tailwindcss.com' },
    { name: 'shadcn/ui', href: 'https://ui.shadcn.com' },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Blog Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {BLOG_CONFIG.title}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  {BLOG_CONFIG.subtitle}
                </p>
                <div className="flex items-center space-x-4">
                  {footerLinks.social.map((link) => (
                    <Button
                      key={link.name}
                      variant="ghost"
                      size="sm"
                      asChild
                      className="hover:text-primary"
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
              </motion.div>
            </div>

            {/* Navigation Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-sm font-semibold text-foreground mb-4">
                  导航
                </h4>
                <ul className="space-y-2">
                  {footerLinks.navigation.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Resources */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-sm font-semibold text-foreground mb-4">
                  技术栈
                </h4>
                <ul className="space-y-2">
                  {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <motion.div
              className="flex items-center space-x-2 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span>© 2024 {BLOG_CONFIG.title}</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="h-3 w-3 text-red-500 fill-current" />
                <span>and</span>
                <Coffee className="h-3 w-3 text-amber-600" />
              </span>
            </motion.div>

            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <span className="text-sm text-muted-foreground">
                转载请注明出处
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="hover:text-primary"
                title="回到顶部"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}

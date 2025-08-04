'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  TrendingUp,
  Sparkles,
  Coffee,
  Code,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BLOG_CONFIG } from '@/lib/github';

const stats = [
  { label: '文章数量', value: '4+', icon: BookOpen },
  { label: '访问量', value: '7.5K+', icon: TrendingUp },
  { label: '读者', value: '100+', icon: Users },
];

const highlights = [
  { text: '个人IP打造', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  { text: '读书分享', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  { text: '思维成长', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 text-primary/20"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Code className="h-8 w-8" />
      </motion.div>
      
      <motion.div
        className="absolute top-32 right-16 text-primary/20"
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Coffee className="h-6 w-6" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-32 left-20 text-primary/20"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Heart className="h-7 w-7" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Avatar and Intro */}
          <div className="flex flex-col items-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.6,
                delay: 0.2,
                type: "spring",
                stiffness: 200
              }}
            >
              <Avatar className="h-24 w-24 ring-4 ring-primary/20 ring-offset-4 ring-offset-background">
                <AvatarImage src={BLOG_CONFIG.avatarUrl} alt={BLOG_CONFIG.title} />
                <AvatarFallback className="text-2xl font-bold">和</AvatarFallback>
              </Avatar>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <Badge variant="secondary" className="text-sm">
                  个人品牌建设者
                </Badge>
              </div>
            </motion.div>
          </div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              欢迎来到
              <span className="text-primary block sm:inline sm:ml-3">
                {BLOG_CONFIG.title}
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {BLOG_CONFIG.subtitle}
            </p>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.8 + index * 0.1 
                }}
              >
                <Badge className={highlight.color}>
                  {highlight.text}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" asChild className="group">
              <Link href="/posts">
                <BookOpen className="mr-2 h-4 w-4" />
                开始阅读
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">
                了解更多
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto pt-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 1.2 + index * 0.1 
                }}
                className="text-center space-y-2"
              >
                <div className="flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary mr-2" />
                  <span className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center space-y-2 text-muted-foreground"
        >
          <span className="text-sm">向下滚动</span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

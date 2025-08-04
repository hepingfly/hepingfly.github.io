'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  User,
  Target,
  Lightbulb,
  BookOpen,
  ArrowRight,
  Quote,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BLOG_CONFIG } from '@/lib/github';

const features = [
  {
    icon: Target,
    title: '个人品牌建设',
    description: '分享个人IP打造的底层逻辑和实战经验，帮助每个人都能拥有自己的个人品牌。',
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    icon: BookOpen,
    title: '读书心得分享',
    description: '深度解读优质书籍，分享阅读感悟，探讨如何通过阅读实现个人成长。',
    color: 'text-green-600 dark:text-green-400',
  },
  {
    icon: Lightbulb,
    title: '思维模式升级',
    description: '探索高效的思维方式和学习方法，分享认知升级的心得体会。',
    color: 'text-purple-600 dark:text-purple-400',
  },
];

const stats = [
  { label: '专注领域', value: '3+' },
  { label: '文章发布', value: '4+' },
  { label: '持续更新', value: '2024' },
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">关于博主</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                用文字记录成长
                <br />
                <span className="text-primary">分享价值思考</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                我是一个热爱学习和分享的人，专注于个人品牌建设、读书心得和思维成长。
                希望通过这个博客，能够与更多志同道合的朋友交流学习，共同进步。
              </p>
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="border-l-4 border-l-primary bg-primary/5">
                <CardContent className="p-6">
                  <Quote className="h-6 w-6 text-primary mb-3" />
                  <blockquote className="text-foreground font-medium italic">
                    &ldquo;如果互联网崩塌，希望这里能留下一点我曾经来过的痕迹&rdquo;
                  </blockquote>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-6"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button size="lg" asChild className="group">
                <Link href="/about">
                  了解更多关于我
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Avatar Card */}
            <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Avatar className="h-20 w-20 mx-auto ring-4 ring-primary/20 ring-offset-4 ring-offset-background">
                    <AvatarImage src={BLOG_CONFIG.avatarUrl} alt="博主头像" />
                    <AvatarFallback className="text-xl font-bold">和</AvatarFallback>
                  </Avatar>
                </motion.div>
                
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    和平
                  </h3>
                  <p className="text-muted-foreground">
                    个人品牌建设者 · 终身学习者
                  </p>
                </div>
                
                <div className="flex items-center justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    持续创作中
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-4 hover:shadow-md transition-shadow">
                    <CardContent className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg bg-muted ${feature.color}`}>
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="font-semibold text-foreground">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

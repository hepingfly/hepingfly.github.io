'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Lightbulb,
  BookOpen,
  Heart,
  Coffee,
  Mail,
  Github,
  Rss
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Layout from '@/components/layout/Layout';
import { BLOG_CONFIG } from '@/lib/github';

const skills = [
  '个人品牌建设',
  '内容创作',
  '读书分享',
  '思维模式',
  '学习方法',
  '认知升级',
];

const interests = [
  { name: '阅读', icon: BookOpen, description: '热爱阅读各类书籍，特别是个人成长和思维类' },
  { name: '写作', icon: User, description: '通过写作分享思考和感悟，记录成长历程' },
  { name: '学习', icon: Lightbulb, description: '保持终身学习的心态，不断探索新知识' },
  { name: '分享', icon: Heart, description: '乐于分享有价值的内容和经验' },
];

const timeline = [
  {
    year: '2024',
    title: '开始个人IP建设',
    description: '创建"和平自留地"博客，专注于个人品牌建设和读书分享',
  },
  {
    year: '2023',
    title: '深度阅读实践',
    description: '开始系统性阅读个人成长类书籍，并记录读书心得',
  },
  {
    year: '2022',
    title: '思维模式探索',
    description: '开始关注思维模式和认知升级，探索高效学习方法',
  },
];

export default function AboutPageClient() {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-8"
            >
              <Avatar className="h-32 w-32 mx-auto ring-4 ring-primary/20 ring-offset-4 ring-offset-background">
                <AvatarImage src={BLOG_CONFIG.avatarUrl} alt="和平" />
                <AvatarFallback className="text-4xl font-bold">和</AvatarFallback>
              </Avatar>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                  你好，我是和平
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  个人品牌建设者 · 终身学习者 · 内容创作者
                </p>
                
                <div className="flex flex-wrap justify-center gap-2 pt-4">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <Button asChild>
                  <a href="mailto:your-email@example.com">
                    <Mail className="h-4 w-4 mr-2" />
                    联系我
                  </a>
                </Button>
                
                <Button variant="outline" asChild>
                  <a href="https://github.com/hepingfly" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-primary" />
                    <span>关于我</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                  <p>
                    欢迎来到我的个人空间！我是一个热爱学习和分享的人，专注于个人品牌建设、读书心得和思维成长。
                  </p>
                  <p>
                    我相信每个人都可以拥有自己的个人品牌，通过持续的学习和分享，我们可以不断提升自己的认知水平，
                    实现个人价值的最大化。
                  </p>
                  <p>
                    在这个博客中，我会分享我的读书心得、思考感悟，以及个人品牌建设的实践经验。
                    希望这些内容能够对你有所帮助，也欢迎与我交流讨论。
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                我的兴趣
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <interest.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-2">
                              {interest.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {interest.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                成长历程
              </h2>
              
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {item.year}
                      </span>
                    </div>
                    <div className="flex-1 pb-8">
                      <h3 className="font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="text-center">
                <CardContent className="p-8">
                  <Coffee className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    让我们保持联系
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    如果你对我的内容感兴趣，或者想要交流讨论，欢迎通过以下方式联系我
                  </p>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <Button asChild>
                      <a href="mailto:your-email@example.com">
                        <Mail className="h-4 w-4 mr-2" />
                        发邮件
                      </a>
                    </Button>
                    
                    <Button variant="outline" asChild>
                      <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
                        <Rss className="h-4 w-4 mr-2" />
                        订阅RSS
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

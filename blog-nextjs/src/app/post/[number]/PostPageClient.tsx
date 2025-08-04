'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MessageCircle,
  Share2,
  Heart,
  Tag as TagIcon,
  ChevronUp,
  Github
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Layout from '@/components/layout/Layout';
import { BlogPost } from '@/types/blog';
import { formatDate, formatRelativeTime } from '@/lib/markdown';
import { BLOG_CONFIG } from '@/lib/github';

interface PostPageClientProps {
  post: BlogPost;
}

export default function PostPageClient({ post }: PostPageClientProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sharePost = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || '来自和平自留地的文章',
          url: window.location.href,
        });
      } catch (error) {
        console.log('分享失败:', error);
      }
    } else {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(window.location.href);
      // 这里可以添加一个toast提示
    }
  };

  return (
    <Layout>
      <article className="min-h-screen bg-background">
        {/* Header */}
        <section className="py-8 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Back Button */}
              <Button variant="ghost" asChild className="group">
                <Link href="/posts">
                  <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  返回文章列表
                </Link>
              </Button>

              {/* Article Header */}
              <div className="space-y-6">
                {/* Labels */}
                {post.labels.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.labels.map((label) => (
                      <Badge 
                        key={label} 
                        variant="outline" 
                        className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                        asChild
                      >
                        <Link href={`/tag/${encodeURIComponent(label)}`}>
                          <TagIcon className="h-3 w-3 mr-1" />
                          {label}
                        </Link>
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.created_at)}</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      {post.readingTime && (
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{post.readingTime} 分钟阅读</span>
                        </div>
                      )}

                      {post.comments > 0 && (
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments} 条评论</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={sharePost}
                      className="group"
                    >
                      <Share2 className="h-4 w-4 sm:mr-2 group-hover:scale-110 transition-transform" />
                      <span className="hidden sm:inline">分享</span>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <a
                        href={post.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">GitHub</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-3 order-2 lg:order-1"
              >
                <Card className="prose prose-sm sm:prose-lg max-w-none dark:prose-invert">
                  <CardContent className="p-4 sm:p-6 lg:p-8">
                    <div
                      className="markdown-content"
                      dangerouslySetInnerHTML={{
                        __html: post.body.replace(/\n/g, '<br />')
                      }}
                    />
                  </CardContent>
                </Card>

                {/* Article Footer */}
                <div className="mt-8 pt-8 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      最后更新于 {formatRelativeTime(post.updated_at)}
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={sharePost}
                        className="group"
                      >
                        <Heart className="h-4 w-4 mr-2 group-hover:text-red-500 transition-colors" />
                        喜欢这篇文章
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-1 order-1 lg:order-2"
              >
                <div className="lg:sticky lg:top-24 space-y-6">
                  {/* Author Card */}
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Avatar className="h-16 w-16 mx-auto mb-4">
                        <AvatarImage src={BLOG_CONFIG.avatarUrl} alt="作者头像" />
                        <AvatarFallback>和</AvatarFallback>
                      </Avatar>
                      
                      <h3 className="font-semibold text-foreground mb-2">
                        和平
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        个人品牌建设者 · 终身学习者
                      </p>
                      
                      <Button size="sm" asChild className="w-full">
                        <Link href="/about">
                          了解更多
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Article Stats */}
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-foreground mb-4">
                        文章信息
                      </h4>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">发布时间</span>
                          <span className="text-foreground">
                            {formatDate(post.created_at)}
                          </span>
                        </div>
                        
                        {post.readingTime && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">阅读时间</span>
                            <span className="text-foreground">
                              {post.readingTime} 分钟
                            </span>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">字数统计</span>
                          <span className="text-foreground">
                            {post.body.length} 字符
                          </span>
                        </div>
                        
                        {post.comments > 0 && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">评论数</span>
                            <span className="text-foreground">
                              {post.comments}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Related Tags */}
                  {post.labels.length > 0 && (
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-foreground mb-4">
                          相关标签
                        </h4>
                        
                        <div className="flex flex-wrap gap-2">
                          {post.labels.map((label) => (
                            <Badge 
                              key={label} 
                              variant="secondary" 
                              className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                              asChild
                            >
                              <Link href={`/tag/${encodeURIComponent(label)}`}>
                                {label}
                              </Link>
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Button
              size="sm"
              onClick={scrollToTop}
              className="rounded-full shadow-lg"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </article>
    </Layout>
  );
}

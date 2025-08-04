'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Clock,
  Calendar,
  ArrowRight,
  MessageCircle,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useLatestPosts } from '@/hooks/useBlog';
import { formatRelativeTime } from '@/lib/markdown';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function FeaturedPosts() {
  const { data: posts, loading, error } = useLatestPosts(3);

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              最新文章
            </h2>
            <p className="text-muted-foreground">
              探索最新的思考和分享
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded" />
                    <div className="h-3 bg-muted rounded" />
                    <div className="h-3 bg-muted rounded w-2/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !posts) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            暂时无法加载文章，请稍后再试
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <Badge variant="secondary">最新发布</Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            最新文章
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            探索最新的思考和分享，一起成长进步
          </p>
        </motion.div>

        {/* Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              className="group"
            >
              <Card className="h-full card-hover border-border/50 hover:border-primary/20">
                <CardHeader className="space-y-4">
                  {/* Labels */}
                  {post.labels.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.labels.slice(0, 2).map((label) => (
                        <Badge 
                          key={label} 
                          variant="outline" 
                          className="text-xs"
                        >
                          {label}
                        </Badge>
                      ))}
                      {post.labels.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.labels.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    <Link href={`/post/${post.number}`}>
                      {post.title}
                    </Link>
                  </h3>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Excerpt */}
                  <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                    {post.excerpt || '暂无摘要...'}
                  </p>

                  <Separator />

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatRelativeTime(post.created_at)}</span>
                      </div>
                      
                      {post.readingTime && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readingTime}分钟</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-3">
                      {post.comments > 0 && (
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-3 w-3" />
                          <span>{post.comments}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Read More Button */}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full group/btn justify-between"
                    asChild
                  >
                    <Link href={`/post/${post.number}`}>
                      <span>阅读全文</span>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="outline" asChild className="group">
            <Link href="/posts">
              查看所有文章
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

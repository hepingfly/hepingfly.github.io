'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Hash, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';
import PostCard from '@/components/blog/PostCard';
import { BlogPost } from '@/types/blog';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface TagPageClientProps {
  tagName: string;
  initialPosts: BlogPost[];
  error?: string;
}

export default function TagPageClient({ tagName, initialPosts, error }: TagPageClientProps) {
  const posts = initialPosts;

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Back Button */}
              <Button variant="ghost" asChild className="group">
                <Link href="/tags">
                  <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  返回标签列表
                </Link>
              </Button>

              {/* Tag Info */}
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Hash className="h-6 w-6 text-primary" />
                  <Badge variant="secondary">标签</Badge>
                </div>
                
                <h1 className="text-4xl font-bold text-foreground flex items-center justify-center space-x-3">
                  <Hash className="h-8 w-8 text-primary" />
                  <span>{tagName}</span>
                </h1>
                
                <p className="text-lg text-muted-foreground">
                  共 {posts.length} 篇相关文章
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Posts */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <Hash className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  加载文章失败
                </h3>
                <p className="text-muted-foreground mb-4">
                  {error}
                </p>
                <Button onClick={() => window.location.reload()}>
                  重新加载
                </Button>
              </div>
            )}

            {/* Empty State */}
            {!error && posts.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  暂无相关文章
                </h3>
                <p className="text-muted-foreground mb-4">
                  标签 &ldquo;{tagName}&rdquo; 下还没有任何文章
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <Button variant="outline" asChild>
                    <Link href="/posts">
                      浏览所有文章
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/tags">
                      查看其他标签
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            {/* Posts Grid */}
            {!error && posts.length > 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    variant="default"
                    showExcerpt={true}
                  />
                ))}
              </motion.div>
            )}

            {/* Related Tags */}
            {!error && posts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-16 pt-8 border-t border-border"
              >
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  相关标签
                </h3>
                
                <div className="flex flex-wrap gap-3">
                  {Array.from(
                    new Set(
                      posts
                        .flatMap(post => post.labels)
                        .filter(label => label !== tagName)
                    )
                  ).slice(0, 10).map((relatedTag) => (
                    <Button
                      key={relatedTag}
                      variant="outline"
                      size="sm"
                      asChild
                      className="hover:bg-primary hover:text-primary-foreground"
                    >
                      <Link href={`/tag/${encodeURIComponent(relatedTag)}`}>
                        <Hash className="h-3 w-3 mr-1" />
                        {relatedTag}
                      </Link>
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}

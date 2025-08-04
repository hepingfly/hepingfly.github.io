'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Tag as TagIcon, Hash, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import TagCloud from '@/components/tags/TagCloud';
import { useTagStats } from '@/hooks/useBlog';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export default function TagsPage() {
  const { data: tagStats, loading, error } = useTagStats();

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
              className="text-center space-y-4"
            >
              <div className="flex items-center justify-center space-x-2 mb-4">
                <TagIcon className="h-6 w-6 text-primary" />
                <Badge variant="secondary">标签云</Badge>
              </div>
              
              <h1 className="text-4xl font-bold text-foreground">
                文章标签
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                通过标签快速找到感兴趣的内容主题
              </p>

              {/* Stats */}
              {tagStats && (
                <div className="flex items-center justify-center space-x-8 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {tagStats.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      个标签
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {tagStats.reduce((sum, tag) => sum + tag.count, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      篇文章
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Tags Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-muted rounded w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-muted rounded w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <TagIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  加载标签失败
                </h3>
                <p className="text-muted-foreground">
                  请稍后再试
                </p>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && (!tagStats || tagStats.length === 0) && (
              <div className="text-center py-12">
                <TagIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  暂无标签
                </h3>
                <p className="text-muted-foreground">
                  还没有任何文章标签
                </p>
              </div>
            )}

            {/* Tags List */}
            {!loading && !error && tagStats && tagStats.length > 0 && (
              <>
                {/* Tag Cloud */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-12"
                >
                  <div className="flex items-center space-x-2 mb-6">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold text-foreground">
                      标签云
                    </h2>
                  </div>

                  <TagCloud
                    tags={tagStats}
                    maxTags={50}
                    showCount={true}
                    className="justify-center"
                  />
                </motion.div>

                {/* All Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex items-center space-x-2 mb-6">
                    <TagIcon className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-semibold text-foreground">
                      所有标签
                    </h2>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                  >
                    {tagStats
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((tag) => (
                        <motion.div
                          key={tag.name}
                          variants={itemVariants}
                        >
                          <Link href={`/tag/${encodeURIComponent(tag.name)}`}>
                            <Card className="card-hover cursor-pointer group">
                              <CardHeader className="pb-3">
                                <div className="flex items-center space-x-2">
                                  <Hash className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {tag.name}
                                  </h3>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-muted-foreground">
                                  {tag.count} 篇文章
                                </p>
                              </CardContent>
                            </Card>
                          </Link>
                        </motion.div>
                      ))}
                  </motion.div>
                </motion.div>
              </>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Grid3X3,
  List,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';
import PostCard, { PostCardSkeleton } from '@/components/blog/PostCard';
import { useAllPosts, useAllTags, useDebounceSearch } from '@/hooks/useBlog';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function PostsPageContent() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTag, setSelectedTag] = useState<string>('');

  const { data: allPosts, loading: postsLoading, error: postsError } = useAllPosts();
  const { data: tags, loading: tagsLoading } = useAllTags();
  const { query, setQuery, debouncedQuery, data: searchResults, loading: searchLoading } = useDebounceSearch();

  // 从URL参数初始化搜索查询
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery && urlQuery !== query) {
      setQuery(urlQuery);
    }
  }, [searchParams, query, setQuery]);

  // 过滤文章
  const filteredPosts = React.useMemo(() => {
    let posts = allPosts || [];
    
    // 如果有搜索查询，使用搜索结果
    if (debouncedQuery) {
      posts = searchResults || [];
    }
    
    // 按标签过滤
    if (selectedTag) {
      posts = posts.filter(post => post.labels.includes(selectedTag));
    }
    
    return posts;
  }, [allPosts, searchResults, debouncedQuery, selectedTag]);

  const isLoading = postsLoading || searchLoading;
  const hasError = postsError;

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
                <BookOpen className="h-6 w-6 text-primary" />
                <Badge variant="secondary">全部文章</Badge>
              </div>
              
              <h1 className="text-4xl font-bold text-foreground">
                文章列表
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                探索所有文章，发现有价值的内容和思考
              </p>

              {/* Stats */}
              <div className="flex items-center justify-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {allPosts?.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    篇文章
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {tags?.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    个标签
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索文章..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Tags Filter */}
            {!tagsLoading && tags && tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-6"
              >
                <div className="flex items-center space-x-2 mb-3">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    按标签筛选:
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedTag === '' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTag('')}
                  >
                    全部
                  </Button>
                  {tags.map((tag) => (
                    <Button
                      key={tag}
                      variant={selectedTag === tag ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Loading State */}
            {isLoading && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={`grid gap-8 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <PostCardSkeleton key={i} variant={viewMode === 'list' ? 'compact' : 'default'} />
                ))}
              </motion.div>
            )}

            {/* Error State */}
            {hasError && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  加载文章时出现错误，请稍后再试
                </p>
                <Button onClick={() => window.location.reload()}>
                  重新加载
                </Button>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !hasError && filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {debouncedQuery || selectedTag ? '没有找到匹配的文章' : '暂无文章'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {debouncedQuery || selectedTag 
                    ? '尝试调整搜索条件或筛选标签' 
                    : '还没有发布任何文章'
                  }
                </p>
                {(debouncedQuery || selectedTag) && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setQuery('');
                      setSelectedTag('');
                    }}
                  >
                    清除筛选
                  </Button>
                )}
              </div>
            )}

            {/* Posts List */}
            {!isLoading && !hasError && filteredPosts.length > 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={`grid gap-8 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}
              >
                {filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    variant={viewMode === 'list' ? 'compact' : 'default'}
                    showExcerpt={viewMode === 'grid'}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default function PostsPage() {
  return (
    <Suspense fallback={
      <Layout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">加载中...</p>
          </div>
        </div>
      </Layout>
    }>
      <PostsPageContent />
    </Suspense>
  );
}

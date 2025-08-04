'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useDebounceSearch } from '@/hooks/useBlog';
import Link from 'next/link';

interface MobileSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSearch({ isOpen, onClose }: MobileSearchProps) {
  const { query, setQuery, debouncedQuery, data: searchResults, loading } = useDebounceSearch();

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border"
          >
            <div className="p-4">
              {/* Search Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索文章..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10 pr-4"
                    autoFocus
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto">
                {loading && debouncedQuery && (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
                    <p className="text-sm text-muted-foreground">搜索中...</p>
                  </div>
                )}

                {!loading && debouncedQuery && searchResults && searchResults.length === 0 && (
                  <div className="text-center py-8">
                    <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      没有找到匹配的文章
                    </p>
                  </div>
                )}

                {!loading && searchResults && searchResults.length > 0 && (
                  <div className="space-y-2">
                    {searchResults.slice(0, 5).map((post) => (
                      <Link
                        key={post.id}
                        href={`/post/${post.number}`}
                        onClick={handleClose}
                      >
                        <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                          <CardContent className="p-3">
                            <div className="space-y-2">
                              <h4 className="font-medium text-sm line-clamp-2">
                                {post.title}
                              </h4>
                              
                              {post.excerpt && (
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {post.excerpt}
                                </p>
                              )}
                              
                              {post.labels.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {post.labels.slice(0, 2).map((label) => (
                                    <Badge key={label} variant="outline" className="text-xs">
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
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}

                    {searchResults.length > 5 && (
                      <Link href={`/posts?q=${encodeURIComponent(debouncedQuery)}`} onClick={handleClose}>
                        <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between text-sm text-primary">
                              <span>查看所有 {searchResults.length} 个结果</span>
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    )}
                  </div>
                )}

                {!debouncedQuery && (
                  <div className="text-center py-8">
                    <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      输入关键词开始搜索
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

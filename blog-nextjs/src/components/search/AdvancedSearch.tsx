'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  X, 
  Calendar,
  Tag as TagIcon,
  SortAsc,
  SortDesc
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filters: SearchFilters) => void;
  availableTags: string[];
}

export interface SearchFilters {
  query: string;
  tags: string[];
  dateRange: 'all' | 'week' | 'month' | 'year';
  sortBy: 'date' | 'title' | 'comments';
  sortOrder: 'asc' | 'desc';
}

const dateRangeOptions = [
  { value: 'all', label: '全部时间' },
  { value: 'week', label: '最近一周' },
  { value: 'month', label: '最近一月' },
  { value: 'year', label: '最近一年' },
];

const sortOptions = [
  { value: 'date', label: '发布时间' },
  { value: 'title', label: '标题' },
  { value: 'comments', label: '评论数' },
];

export default function AdvancedSearch({ 
  isOpen, 
  onClose, 
  onSearch, 
  availableTags 
}: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    tags: [],
    dateRange: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
  });

  const handleTagToggle = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      query: '',
      tags: [],
      dateRange: 'all',
      sortBy: 'date',
      sortOrder: 'desc',
    });
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
            onClick={onClose}
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center"
          >
            <Card className="w-full max-w-2xl max-h-full overflow-y-auto">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>高级搜索</span>
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Search Query */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">搜索关键词</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="输入搜索关键词..."
                      value={filters.query}
                      onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Separator />

                {/* Tags Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center space-x-2">
                    <TagIcon className="h-4 w-4" />
                    <span>标签筛选</span>
                  </label>
                  
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    {availableTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={filters.tags.includes(tag) ? 'default' : 'outline'}
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {filters.tags.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">已选择:</span>
                      <div className="flex flex-wrap gap-1">
                        {filters.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => handleTagToggle(tag)}
                          >
                            {tag}
                            <X className="h-3 w-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Date Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>时间范围</span>
                  </label>
                  
                  <div className="flex flex-wrap gap-2">
                    {dateRangeOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant={filters.dateRange === option.value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilters(prev => ({ ...prev, dateRange: option.value as SearchFilters['dateRange'] }))}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Sort Options */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">排序方式</label>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex flex-wrap gap-2">
                      {sortOptions.map((option) => (
                        <Button
                          key={option.value}
                          variant={filters.sortBy === option.value ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setFilters(prev => ({ ...prev, sortBy: option.value as SearchFilters['sortBy'] }))}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant={filters.sortOrder === 'desc' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilters(prev => ({ ...prev, sortOrder: 'desc' }))}
                      >
                        <SortDesc className="h-4 w-4 mr-1" />
                        降序
                      </Button>
                      <Button
                        variant={filters.sortOrder === 'asc' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilters(prev => ({ ...prev, sortOrder: 'asc' }))}
                      >
                        <SortAsc className="h-4 w-4 mr-1" />
                        升序
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4">
                  <Button variant="outline" onClick={handleReset}>
                    重置筛选
                  </Button>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={onClose}>
                      取消
                    </Button>
                    <Button onClick={handleSearch}>
                      搜索
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

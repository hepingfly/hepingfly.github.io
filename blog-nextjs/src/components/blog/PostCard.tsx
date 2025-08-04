'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Calendar, 
  MessageCircle, 
  ArrowRight,
  BookOpen,
  Tag as TagIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BlogPost } from '@/types/blog';
import { formatRelativeTime } from '@/lib/markdown';

interface PostCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
  showExcerpt?: boolean;
  className?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

export default function PostCard({ 
  post, 
  variant = 'default', 
  showExcerpt = true,
  className = '' 
}: PostCardProps) {
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`group ${className}`}
    >
      <Card className={`h-full card-hover border-border/50 hover:border-primary/20 ${
        isFeatured ? 'bg-gradient-to-br from-primary/5 to-primary/10 border-primary/30' : ''
      }`}>
        {/* Header */}
        <CardHeader className={`space-y-4 ${isCompact ? 'pb-3' : ''}`}>
          {/* Featured Badge */}
          {isFeatured && (
            <div className="flex items-center space-x-2">
              <Badge className="bg-primary text-primary-foreground">
                <BookOpen className="h-3 w-3 mr-1" />
                精选文章
              </Badge>
            </div>
          )}

          {/* Labels */}
          {post.labels.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.labels.slice(0, isCompact ? 1 : 3).map((label) => (
                <Badge 
                  key={label} 
                  variant="outline" 
                  className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  asChild
                >
                  <Link href={`/tag/${encodeURIComponent(label)}`}>
                    <TagIcon className="h-2.5 w-2.5 mr-1" />
                    {label}
                  </Link>
                </Badge>
              ))}
              {post.labels.length > (isCompact ? 1 : 3) && (
                <Badge variant="outline" className="text-xs">
                  +{post.labels.length - (isCompact ? 1 : 3)}
                </Badge>
              )}
            </div>
          )}

          {/* Title */}
          <h3 className={`font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 ${
            isFeatured ? 'text-2xl' : isCompact ? 'text-lg' : 'text-xl'
          }`}>
            <Link href={`/post/${post.number}`} className="hover:underline">
              {post.title}
            </Link>
          </h3>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Excerpt */}
          {showExcerpt && post.excerpt && (
            <p className={`text-muted-foreground leading-relaxed ${
              isCompact ? 'line-clamp-2 text-sm' : 'line-clamp-3'
            }`}>
              {post.excerpt}
            </p>
          )}

          {!isCompact && <Separator />}

          {/* Meta Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Date */}
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span className="text-xs sm:text-sm">{formatRelativeTime(post.created_at)}</span>
              </div>

              {/* Reading Time */}
              {post.readingTime && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span className="text-xs sm:text-sm">{post.readingTime}分钟</span>
                </div>
              )}
            </div>

            {/* Comments */}
            <div className="flex items-center space-x-3">
              {post.comments > 0 && (
                <div className="flex items-center space-x-1">
                  <MessageCircle className="h-3 w-3" />
                  <span className="text-xs sm:text-sm">{post.comments}</span>
                </div>
              )}
            </div>
          </div>

          {/* Read More Button */}
          {!isCompact && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full group/btn justify-between mt-4"
              asChild
            >
              <Link href={`/post/${post.number}`}>
                <span>阅读全文</span>
                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// 骨架屏组件
export function PostCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'featured' | 'compact' }) {
  const isCompact = variant === 'compact';
  
  return (
    <Card className="h-full animate-pulse">
      <CardHeader className={`space-y-4 ${isCompact ? 'pb-3' : ''}`}>
        {/* Labels skeleton */}
        <div className="flex gap-2">
          <div className="h-5 bg-muted rounded-full w-16" />
          <div className="h-5 bg-muted rounded-full w-20" />
        </div>
        
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-6 bg-muted rounded w-full" />
          <div className="h-6 bg-muted rounded w-3/4" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Excerpt skeleton */}
        {!isCompact && (
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-2/3" />
          </div>
        )}

        {/* Meta skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <div className="h-4 bg-muted rounded w-16" />
            <div className="h-4 bg-muted rounded w-12" />
          </div>
          <div className="h-4 bg-muted rounded w-8" />
        </div>

        {/* Button skeleton */}
        {!isCompact && (
          <div className="h-8 bg-muted rounded w-full" />
        )}
      </CardContent>
    </Card>
  );
}

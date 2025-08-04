'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Hash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TagCloudProps {
  tags: Array<{ name: string; count: number }>;
  maxTags?: number;
  showCount?: boolean;
  className?: string;
}

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
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export default function TagCloud({ 
  tags, 
  maxTags = 20, 
  showCount = true,
  className = '' 
}: TagCloudProps) {
  // 计算标签大小权重
  const maxCount = Math.max(...tags.map(tag => tag.count));
  const minCount = Math.min(...tags.map(tag => tag.count));
  const countRange = maxCount - minCount || 1;

  const getTagSize = (count: number) => {
    const weight = (count - minCount) / countRange;
    
    if (weight > 0.8) return 'text-lg';
    if (weight > 0.6) return 'text-base';
    if (weight > 0.4) return 'text-sm';
    return 'text-xs';
  };

  const getTagColor = (count: number) => {
    const weight = (count - minCount) / countRange;
    
    if (weight > 0.8) return 'bg-primary text-primary-foreground hover:bg-primary/90';
    if (weight > 0.6) return 'bg-blue-500 text-white hover:bg-blue-600';
    if (weight > 0.4) return 'bg-green-500 text-white hover:bg-green-600';
    return 'bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground';
  };

  const displayTags = tags
    .sort((a, b) => b.count - a.count)
    .slice(0, maxTags)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`flex flex-wrap gap-2 ${className}`}
    >
      {displayTags.map((tag) => (
        <motion.div
          key={tag.name}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href={`/tag/${encodeURIComponent(tag.name)}`}>
            <Badge 
              className={`
                ${getTagSize(tag.count)} 
                ${getTagColor(tag.count)}
                transition-all duration-200 cursor-pointer
                flex items-center space-x-1
              `}
            >
              <Hash className="h-3 w-3" />
              <span>{tag.name}</span>
              {showCount && (
                <span className="ml-1 text-xs opacity-75">
                  {tag.count}
                </span>
              )}
            </Badge>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

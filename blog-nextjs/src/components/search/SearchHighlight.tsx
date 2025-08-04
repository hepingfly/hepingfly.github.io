'use client';

import React from 'react';

interface SearchHighlightProps {
  text: string;
  searchTerm: string;
  className?: string;
}

export default function SearchHighlight({ 
  text, 
  searchTerm, 
  className = '' 
}: SearchHighlightProps) {
  if (!searchTerm || !text) {
    return <span className={className}>{text}</span>;
  }

  // 创建正则表达式，忽略大小写
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const isMatch = regex.test(part);
        return isMatch ? (
          <mark 
            key={index} 
            className="bg-primary/20 text-primary font-medium px-0.5 rounded"
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </span>
  );
}

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  quality?: number;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  fill = false,
  quality = 75,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div 
        className={cn(
          'flex items-center justify-center bg-muted text-muted-foreground rounded-lg',
          className
        )}
        style={{ width, height }}
      >
        <span className="text-sm">图片加载失败</span>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse rounded-lg"
          style={{ width, height }}
        />
      )}
      
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes={sizes}
        quality={quality}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          fill ? 'object-cover' : ''
        )}
      />
    </div>
  );
}

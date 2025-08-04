'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyLoadProps {
  children: React.ReactNode;
  className?: string;
  placeholder?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
}

export default function LazyLoad({
  children,
  className = '',
  placeholder,
  rootMargin = '50px',
  threshold = 0.1,
  once = true,
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasLoaded(true);
          
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [rootMargin, threshold, once]);

  const shouldRender = isVisible || hasLoaded;

  return (
    <div ref={elementRef} className={cn(className)}>
      {shouldRender ? children : placeholder}
    </div>
  );
}

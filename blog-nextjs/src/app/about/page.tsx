import React from 'react';
import { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';
import { generateSEOMetadata } from '@/components/seo/SEOHead';

export const metadata: Metadata = generateSEOMetadata({
  title: '关于我',
  description: '了解更多关于和平的信息，个人品牌建设者，终身学习者，专注于个人IP打造和读书分享',
  keywords: ['关于', '个人简介', '和平', '个人品牌', '终身学习'],
  url: 'https://hepingfly.github.io/about',
});

export default function AboutPage() {
  return <AboutPageClient />;
}

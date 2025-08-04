import React from 'react';
import { getAllTags, getPostsByTag } from '@/lib/github';
import TagPageClient from './TagPageClient';
import { generateTagSEOMetadata } from '@/components/seo/SEOHead';

// 生成静态参数
export async function generateStaticParams() {
  try {
    const tags = await getAllTags();
    return tags.map((tag) => ({
      slug: encodeURIComponent(tag),
    }));
  } catch (error) {
    console.error('Error generating static params for tags:', error);
    return [];
  }
}

interface TagPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 生成页面元数据
export async function generateMetadata({ params }: TagPageProps) {
  const { slug } = await params;
  const tagName = decodeURIComponent(slug);

  try {
    const posts = await getPostsByTag(tagName);
    return generateTagSEOMetadata(tagName, posts.length);
  } catch (error) {
    console.error('Error generating metadata for tag:', error);
    return {
      title: `标签: ${tagName}`,
      description: `浏览所有关于"${tagName}"的文章`,
    };
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const tagName = decodeURIComponent(slug);

  try {
    const posts = await getPostsByTag(tagName);
    return <TagPageClient tagName={tagName} initialPosts={posts} />;
  } catch (error) {
    console.error('Error fetching posts for tag:', error);
    return <TagPageClient tagName={tagName} initialPosts={[]} error="Failed to load posts" />;
  }
}

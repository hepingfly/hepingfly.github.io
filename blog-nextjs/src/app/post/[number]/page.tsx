import React from 'react';
import { getAllPosts, getPostByNumber } from '@/lib/github';
import PostPageClient from './PostPageClient';
import { notFound } from 'next/navigation';
import { generatePostSEOMetadata } from '@/components/seo/SEOHead';

// 生成静态参数
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map((post) => ({
      number: post.number.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params for posts:', error);
    return [];
  }
}

interface PostPageProps {
  params: Promise<{
    number: string;
  }>;
}

// 生成页面元数据
export async function generateMetadata({ params }: PostPageProps) {
  const { number } = await params;
  const postNumber = parseInt(number, 10);

  if (isNaN(postNumber)) {
    return {
      title: '文章未找到',
      description: '请求的文章不存在',
    };
  }

  try {
    const post = await getPostByNumber(postNumber);

    if (!post) {
      return {
        title: '文章未找到',
        description: '请求的文章不存在',
      };
    }

    return generatePostSEOMetadata(post);
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: '文章加载失败',
      description: '文章加载时出现错误',
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { number } = await params;
  const postNumber = parseInt(number, 10);
  
  if (isNaN(postNumber)) {
    notFound();
  }
  
  try {
    const post = await getPostByNumber(postNumber);
    
    if (!post) {
      notFound();
    }
    
    return <PostPageClient post={post} />;
  } catch (error) {
    console.error('Error fetching post:', error);
    notFound();
  }
}

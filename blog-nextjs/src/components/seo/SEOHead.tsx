import { Metadata } from 'next';
import { BLOG_CONFIG } from '@/lib/github';
import { BlogPost } from '@/types/blog';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = '和平',
  tags = [],
}: SEOProps): Metadata {
  const siteTitle = title ? `${title} | ${BLOG_CONFIG.title}` : BLOG_CONFIG.title;
  const siteDescription = description || BLOG_CONFIG.subtitle;
  const siteUrl = url || BLOG_CONFIG.siteUrl;
  const siteImage = image || BLOG_CONFIG.avatarUrl;
  
  const allKeywords = [
    '个人博客',
    '个人IP',
    '读书分享',
    '思维成长',
    'Next.js',
    '和平自留地',
    ...keywords,
    ...tags,
  ];

  const metadata: Metadata = {
    title: siteTitle,
    description: siteDescription,
    keywords: allKeywords.join(', '),
    authors: [{ name: author, url: BLOG_CONFIG.siteUrl }],
    creator: author,
    publisher: author,
    
    // Open Graph
    openGraph: {
      type: type,
      locale: 'zh_CN',
      url: siteUrl,
      title: siteTitle,
      description: siteDescription,
      siteName: BLOG_CONFIG.title,
      images: [
        {
          url: siteImage,
          width: 1200,
          height: 630,
          alt: title || BLOG_CONFIG.title,
        },
      ],
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
      images: [siteImage],
      creator: '@hepingfly',
    },
    
    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Verification
    verification: {
      google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // yahoo: 'your-yahoo-verification-code',
    },
    
    // Other
    category: '个人博客',
  };

  // 文章特定的元数据
  if (type === 'article' && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime: modifiedTime || publishedTime,
      authors: [author],
      tags,
    };
  }

  return metadata;
}

// 为博客文章生成SEO元数据
export function generatePostSEOMetadata(post: BlogPost): Metadata {
  return generateSEOMetadata({
    title: post.title,
    description: post.excerpt || `${post.title} - 来自${BLOG_CONFIG.title}的文章`,
    keywords: post.labels,
    url: `${BLOG_CONFIG.siteUrl}/post/${post.number}`,
    type: 'article',
    publishedTime: post.created_at,
    modifiedTime: post.updated_at,
    tags: post.labels,
  });
}

// 为标签页面生成SEO元数据
export function generateTagSEOMetadata(tagName: string, postCount: number): Metadata {
  return generateSEOMetadata({
    title: `标签: ${tagName}`,
    description: `浏览所有关于"${tagName}"的文章，共${postCount}篇文章 - ${BLOG_CONFIG.title}`,
    keywords: [tagName, '标签', '分类'],
    url: `${BLOG_CONFIG.siteUrl}/tag/${encodeURIComponent(tagName)}`,
  });
}

// JSON-LD 结构化数据
export function generateJSONLD(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data),
  };
}

// 博客文章的结构化数据
export function generateArticleJSONLD(post: BlogPost) {
  return generateJSONLD({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: BLOG_CONFIG.avatarUrl,
    author: {
      '@type': 'Person',
      name: '和平',
      url: BLOG_CONFIG.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: BLOG_CONFIG.title,
      logo: {
        '@type': 'ImageObject',
        url: BLOG_CONFIG.avatarUrl,
      },
    },
    datePublished: post.created_at,
    dateModified: post.updated_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BLOG_CONFIG.siteUrl}/post/${post.number}`,
    },
    keywords: post.labels.join(', '),
    articleSection: post.labels[0] || '博客',
    wordCount: post.body.length,
    commentCount: post.comments,
  });
}

// 网站的结构化数据
export function generateWebsiteJSONLD() {
  return generateJSONLD({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BLOG_CONFIG.title,
    description: BLOG_CONFIG.subtitle,
    url: BLOG_CONFIG.siteUrl,
    author: {
      '@type': 'Person',
      name: '和平',
      url: BLOG_CONFIG.siteUrl,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BLOG_CONFIG.siteUrl}/posts?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  });
}

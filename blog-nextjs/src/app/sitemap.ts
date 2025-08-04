import { MetadataRoute } from 'next';
import { getAllPosts, getAllTags, BLOG_CONFIG } from '@/lib/github';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = BLOG_CONFIG.siteUrl;
  
  try {
    // 获取所有文章和标签
    const [posts, tags] = await Promise.all([
      getAllPosts(),
      getAllTags()
    ]);

    // 静态页面
    const staticPages = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/posts`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/tags`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
    ];

    // 文章页面
    const postPages = posts.map(post => ({
      url: `${baseUrl}/post/${post.number}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // 标签页面
    const tagPages = tags.map(tag => ({
      url: `${baseUrl}/tag/${encodeURIComponent(tag)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.4,
    }));

    return [...staticPages, ...postPages, ...tagPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // 如果获取数据失败，至少返回静态页面
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/posts`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/tags`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
    ];
  }
}

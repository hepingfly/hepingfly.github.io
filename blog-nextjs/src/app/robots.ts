import { MetadataRoute } from 'next';
import { BLOG_CONFIG } from '@/lib/github';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${BLOG_CONFIG.siteUrl}/sitemap.xml`,
  };
}

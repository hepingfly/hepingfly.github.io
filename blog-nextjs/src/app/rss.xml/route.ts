import { NextResponse } from 'next/server';
import { getAllPosts, BLOG_CONFIG } from '@/lib/github';

export const dynamic = 'force-static';

export async function GET() {
  try {
    const posts = await getAllPosts();
    
    const rssItems = posts
      .slice(0, 20) // 只包含最新的20篇文章
      .map(post => {
        const pubDate = new Date(post.created_at).toUTCString();
        const link = `${BLOG_CONFIG.siteUrl}/post/${post.number}`;
        
        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>hepingfly@example.com (和平)</author>
      ${post.labels.map(label => `<category>${label}</category>`).join('\n      ')}
    </item>`;
      })
      .join('');

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${BLOG_CONFIG.title}</title>
    <description>${BLOG_CONFIG.subtitle}</description>
    <link>${BLOG_CONFIG.siteUrl}</link>
    <language>zh-CN</language>
    <managingEditor>hepingfly@example.com (和平)</managingEditor>
    <webMaster>hepingfly@example.com (和平)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BLOG_CONFIG.siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    
    // 返回基本的RSS结构
    const basicRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${BLOG_CONFIG.title}</title>
    <description>${BLOG_CONFIG.subtitle}</description>
    <link>${BLOG_CONFIG.siteUrl}</link>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  </channel>
</rss>`;

    return new NextResponse(basicRss, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  }
}

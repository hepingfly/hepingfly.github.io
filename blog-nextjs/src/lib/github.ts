import { Octokit } from '@octokit/rest';
import { CacheKeys, withCache } from './cache';
import { extractExcerpt, estimateReadingTime, generateSlug } from './markdown';
import { BlogPost } from '@/types/blog';

// GitHub API 配置
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // 可选，用于提高API限制
});

// 博客配置
export const BLOG_CONFIG = {
  owner: 'hepingfly',
  repo: 'hepingfly.github.io',
  title: '和平自留地',
  subtitle: '如果互联网崩塌，希望这里能留下一点我曾经来过的痕迹',
  avatarUrl: 'https://shp-selfmedia-1257820375.cos.ap-shanghai.myqcloud.com/%E6%B2%88%E5%92%8C%E5%B9%B3%E5%A4%B4%E5%83%8F.PNG',
  siteUrl: 'https://hepingfly.github.io',
};

// 文章数据类型定义已在 @/types/blog 中定义

// 内部函数：获取所有博客文章（不带缓存）
async function _getAllPosts(): Promise<BlogPost[]> {
  try {
    const { data } = await octokit.rest.issues.listForRepo({
      owner: BLOG_CONFIG.owner,
      repo: BLOG_CONFIG.repo,
      state: 'open',
      sort: 'created',
      direction: 'desc',
      per_page: 100,
    });

    // 过滤掉 Pull Request，只保留 Issues
    const posts = data.filter(issue => !issue.pull_request);

    return posts.map(issue => {
      const body = issue.body || '';
      return {
        id: issue.id,
        title: issue.title,
        body,
        labels: issue.labels.map(label =>
          typeof label === 'string' ? label : label.name || ''
        ),
        created_at: issue.created_at,
        updated_at: issue.updated_at,
        html_url: issue.html_url,
        number: issue.number,
        comments: issue.comments,
        user: {
          login: issue.user?.login || '',
          avatar_url: issue.user?.avatar_url || '',
        },
        // 扩展字段
        excerpt: extractExcerpt(body),
        readingTime: estimateReadingTime(body),
        slug: generateSlug(issue.title),
      };
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error(`Failed to fetch posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// 获取所有博客文章（带缓存）
export const getAllPosts = withCache(
  _getAllPosts,
  () => CacheKeys.ALL_POSTS,
  10 * 60 * 1000 // 10分钟缓存
);

// 内部函数：根据文章编号获取单篇文章（不带缓存）
async function _getPostByNumber(number: number): Promise<BlogPost | null> {
  try {
    const { data } = await octokit.rest.issues.get({
      owner: BLOG_CONFIG.owner,
      repo: BLOG_CONFIG.repo,
      issue_number: number,
    });

    if (data.pull_request) {
      return null; // 不是文章，是 PR
    }

    const body = data.body || '';
    return {
      id: data.id,
      title: data.title,
      body,
      labels: data.labels.map(label =>
        typeof label === 'string' ? label : label.name || ''
      ),
      created_at: data.created_at,
      updated_at: data.updated_at,
      html_url: data.html_url,
      number: data.number,
      comments: data.comments,
      user: {
        login: data.user?.login || '',
        avatar_url: data.user?.avatar_url || '',
      },
      // 扩展字段
      excerpt: extractExcerpt(body),
      readingTime: estimateReadingTime(body),
      slug: generateSlug(data.title),
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    if (error instanceof Error && error.message.includes('404')) {
      return null; // 文章不存在
    }
    throw new Error(`Failed to fetch post ${number}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// 根据文章编号获取单篇文章（带缓存）
export const getPostByNumber = withCache(
  _getPostByNumber,
  (number: number) => CacheKeys.POST_BY_NUMBER(number),
  15 * 60 * 1000 // 15分钟缓存
);

// 内部函数：获取所有标签（不带缓存）
async function _getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();

  posts.forEach(post => {
    post.labels.forEach(label => {
      if (label) tagSet.add(label);
    });
  });

  return Array.from(tagSet).sort();
}

// 获取所有标签（带缓存）
export const getAllTags = withCache(
  _getAllTags,
  () => CacheKeys.ALL_TAGS,
  10 * 60 * 1000 // 10分钟缓存
);

// 内部函数：根据标签获取文章（不带缓存）
async function _getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.labels.includes(tag));
}

// 根据标签获取文章（带缓存）
export const getPostsByTag = withCache(
  _getPostsByTag,
  (tag: string) => CacheKeys.POSTS_BY_TAG(tag),
  10 * 60 * 1000 // 10分钟缓存
);

// 搜索文章
export async function searchPosts(query: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  const lowercaseQuery = query.toLowerCase();

  return posts.filter(post => {
    const titleMatch = post.title.toLowerCase().includes(lowercaseQuery);
    const bodyMatch = post.body.toLowerCase().includes(lowercaseQuery);
    const labelMatch = post.labels.some(label =>
      label.toLowerCase().includes(lowercaseQuery)
    );

    return titleMatch || bodyMatch || labelMatch;
  });
}

// 高级搜索接口
export interface AdvancedSearchOptions {
  query?: string;
  tags?: string[];
  dateRange?: 'all' | 'week' | 'month' | 'year';
  sortBy?: 'date' | 'title' | 'comments';
  sortOrder?: 'asc' | 'desc';
}

// 高级搜索功能
export async function advancedSearchPosts(options: AdvancedSearchOptions): Promise<BlogPost[]> {
  let posts = await getAllPosts();

  // 文本搜索
  if (options.query) {
    const lowercaseQuery = options.query.toLowerCase();
    posts = posts.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(lowercaseQuery);
      const bodyMatch = post.body.toLowerCase().includes(lowercaseQuery);
      const labelMatch = post.labels.some(label =>
        label.toLowerCase().includes(lowercaseQuery)
      );
      return titleMatch || bodyMatch || labelMatch;
    });
  }

  // 标签筛选
  if (options.tags && options.tags.length > 0) {
    posts = posts.filter(post =>
      options.tags!.some(tag => post.labels.includes(tag))
    );
  }

  // 时间范围筛选
  if (options.dateRange && options.dateRange !== 'all') {
    const now = new Date();
    const cutoffDate = new Date();

    switch (options.dateRange) {
      case 'week':
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    posts = posts.filter(post =>
      new Date(post.created_at) >= cutoffDate
    );
  }

  // 排序
  const sortBy = options.sortBy || 'date';
  const sortOrder = options.sortOrder || 'desc';

  posts.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'comments':
        comparison = a.comments - b.comments;
        break;
      case 'date':
      default:
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        break;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return posts;
}

// 获取分页文章
export async function getPaginatedPosts(
  page: number = 1,
  perPage: number = 10
): Promise<{ posts: BlogPost[]; total: number; hasNext: boolean; hasPrev: boolean }> {
  const allPosts = await getAllPosts();
  const total = allPosts.length;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    total,
    hasNext: endIndex < total,
    hasPrev: page > 1,
  };
}

// 获取相关文章（基于标签相似度）
export async function getRelatedPosts(
  currentPost: BlogPost,
  limit: number = 3
): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();

  // 排除当前文章
  const otherPosts = allPosts.filter(post => post.id !== currentPost.id);

  // 计算相似度分数
  const postsWithScore = otherPosts.map(post => {
    const commonTags = post.labels.filter(label =>
      currentPost.labels.includes(label)
    ).length;

    return {
      post,
      score: commonTags,
    };
  });

  // 按分数排序并返回前N个
  return postsWithScore
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}

// 获取最新文章
export async function getLatestPosts(limit: number = 5): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

// 获取热门文章（基于评论数）
export async function getPopularPosts(limit: number = 5): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts
    .sort((a, b) => b.comments - a.comments)
    .slice(0, limit);
}

// 获取标签统计
export async function getTagStats(): Promise<Array<{ name: string; count: number }>> {
  const posts = await getAllPosts();
  const tagCounts = new Map<string, number>();

  posts.forEach(post => {
    post.labels.forEach(label => {
      if (label) {
        tagCounts.set(label, (tagCounts.get(label) || 0) + 1);
      }
    });
  });

  return Array.from(tagCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

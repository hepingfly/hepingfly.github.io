// 博客文章类型
export interface BlogPost {
  id: number;
  title: string;
  body: string;
  labels: string[];
  created_at: string;
  updated_at: string;
  html_url: string;
  number: number;
  comments: number;
  user: {
    login: string;
    avatar_url: string;
  };
  // 扩展字段
  excerpt?: string;
  readingTime?: number;
  slug?: string;
}

// 博客配置类型
export interface BlogConfig {
  owner: string;
  repo: string;
  title: string;
  subtitle: string;
  avatarUrl: string;
  siteUrl: string;
}

// 标签类型
export interface Tag {
  name: string;
  count: number;
  color?: string;
}

// 分页类型
export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// 搜索结果类型
export interface SearchResult {
  posts: BlogPost[];
  total: number;
  query: string;
}

// 导航菜单项类型
export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  external?: boolean;
}

// 社交链接类型
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

// 主题类型
export type Theme = 'light' | 'dark' | 'system';

// 页面元数据类型
export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

// API 响应类型
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// 评论类型（GitHub Issues 评论）
export interface Comment {
  id: number;
  body: string;
  created_at: string;
  updated_at: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  html_url: string;
}

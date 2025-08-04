import matter from 'gray-matter';

// Markdown 处理工具
export function parseMarkdown(content: string) {
  const { data, content: markdownContent } = matter(content);
  return {
    frontmatter: data,
    content: markdownContent,
  };
}

// 提取文章摘要
export function extractExcerpt(content: string, maxLength: number = 200): string {
  // 移除 Markdown 语法
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // 移除标题
    .replace(/\*\*(.*?)\*\*/g, '$1') // 移除粗体
    .replace(/\*(.*?)\*/g, '$1') // 移除斜体
    .replace(/`(.*?)`/g, '$1') // 移除行内代码
    .replace(/```[\s\S]*?```/g, '') // 移除代码块
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 移除链接，保留文本
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // 移除图片
    .replace(/\n+/g, ' ') // 将换行符替换为空格
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  // 在单词边界截断
  const truncated = plainText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > maxLength * 0.8) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  
  return truncated + '...';
}

// 估算阅读时间（基于中文和英文混合内容）
export function estimateReadingTime(content: string): number {
  // 中文字符数
  const chineseChars = (content.match(/[\u4e00-\u9fff]/g) || []).length;
  // 英文单词数
  const englishWords = content
    .replace(/[\u4e00-\u9fff]/g, '') // 移除中文字符
    .split(/\s+/)
    .filter(word => word.length > 0).length;

  // 中文阅读速度：约300字/分钟
  // 英文阅读速度：约200词/分钟
  const chineseReadingTime = chineseChars / 300;
  const englishReadingTime = englishWords / 200;
  
  const totalMinutes = chineseReadingTime + englishReadingTime;
  
  return Math.max(1, Math.round(totalMinutes));
}

// 生成文章 slug
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-') // 空格替换为连字符
    .replace(/-+/g, '-') // 多个连字符合并为一个
    .trim();
}

// 格式化日期
export function formatDate(dateString: string, locale: string = 'zh-CN'): string {
  const date = new Date(dateString);
  
  if (locale === 'zh-CN') {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// 相对时间格式化
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return '刚刚';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}分钟前`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}小时前`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}天前`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}个月前`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}年前`;
}

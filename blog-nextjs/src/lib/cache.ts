// 简单的内存缓存实现
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class MemoryCache {
  private cache = new Map<string, CacheItem<unknown>>();

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    // 检查是否过期
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    
    if (!item) {
      return false;
    }

    // 检查是否过期
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // 获取缓存统计信息
  getStats() {
    const now = Date.now();
    let validItems = 0;
    let expiredItems = 0;

    for (const [, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        expiredItems++;
      } else {
        validItems++;
      }
    }

    return {
      total: this.cache.size,
      valid: validItems,
      expired: expiredItems,
    };
  }

  // 清理过期项
  cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(keyToDelete => this.cache.delete(keyToDelete));
  }
}

// 创建全局缓存实例
export const cache = new MemoryCache();

// 缓存键生成器
export const CacheKeys = {
  ALL_POSTS: 'all_posts',
  POST_BY_NUMBER: (number: number) => `post_${number}`,
  POSTS_BY_TAG: (tag: string) => `posts_tag_${tag}`,
  ALL_TAGS: 'all_tags',
  SEARCH_RESULTS: (query: string) => `search_${query}`,
} as const;

// 缓存装饰器函数
export function withCache<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  keyGenerator: (...args: T) => string,
  ttl: number = 5 * 60 * 1000
) {
  return async (...args: T): Promise<R> => {
    const key = keyGenerator(...args);
    
    // 尝试从缓存获取
    const cached = cache.get<R>(key);
    if (cached !== null) {
      return cached;
    }

    // 缓存未命中，执行原函数
    const result = await fn(...args);
    
    // 存储到缓存
    cache.set(key, result, ttl);
    
    return result;
  };
}

// 定期清理过期缓存
if (typeof window === 'undefined') {
  // 只在服务端运行
  setInterval(() => {
    cache.cleanup();
  }, 10 * 60 * 1000); // 每10分钟清理一次
}

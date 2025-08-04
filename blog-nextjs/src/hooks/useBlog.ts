'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '@/types/blog';
import { 
  getAllPosts, 
  getPostByNumber, 
  getPostsByTag, 
  getAllTags,
  searchPosts,
  getPaginatedPosts,
  getRelatedPosts,
  getLatestPosts,
  getPopularPosts,
  getTagStats
} from '@/lib/github';

// 通用的异步数据获取Hook
function useAsyncData<T>(
  asyncFn: () => Promise<T>,
  deps: unknown[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await asyncFn();
        
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}

// 获取所有文章
export function useAllPosts() {
  return useAsyncData<BlogPost[]>(getAllPosts);
}

// 获取单篇文章
export function usePost(number: number) {
  return useAsyncData<BlogPost | null>(
    () => getPostByNumber(number),
    [number]
  );
}

// 获取标签文章
export function usePostsByTag(tag: string) {
  return useAsyncData<BlogPost[]>(
    () => getPostsByTag(tag),
    [tag]
  );
}

// 获取所有标签
export function useAllTags() {
  return useAsyncData<string[]>(getAllTags);
}

// 搜索文章
export function useSearchPosts(query: string) {
  return useAsyncData<BlogPost[]>(
    () => query ? searchPosts(query) : Promise.resolve([]),
    [query]
  );
}

// 获取分页文章
export function usePaginatedPosts(page: number = 1, perPage: number = 10) {
  return useAsyncData<{
    posts: BlogPost[];
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  }>(
    () => getPaginatedPosts(page, perPage),
    [page, perPage]
  );
}

// 获取相关文章
export function useRelatedPosts(currentPost: BlogPost | null, limit: number = 3) {
  return useAsyncData<BlogPost[]>(
    () => currentPost ? getRelatedPosts(currentPost, limit) : Promise.resolve([]),
    [currentPost?.id, limit]
  );
}

// 获取最新文章
export function useLatestPosts(limit: number = 5) {
  return useAsyncData<BlogPost[]>(
    () => getLatestPosts(limit),
    [limit]
  );
}

// 获取热门文章
export function usePopularPosts(limit: number = 5) {
  return useAsyncData<BlogPost[]>(
    () => getPopularPosts(limit),
    [limit]
  );
}

// 获取标签统计
export function useTagStats() {
  return useAsyncData<Array<{ name: string; count: number }>>(getTagStats);
}

// 客户端搜索Hook（带防抖）
export function useDebounceSearch(initialQuery: string = '', delay: number = 300) {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [query, delay]);

  const searchResults = useSearchPosts(debouncedQuery);

  return {
    query,
    setQuery,
    debouncedQuery,
    ...searchResults,
  };
}

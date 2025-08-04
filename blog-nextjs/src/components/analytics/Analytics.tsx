'use client';

import { useEffect } from 'react';
import Script from 'next/script';

// Google Analytics 配置
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

// 页面浏览事件
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID!, {
      page_path: url,
    });
  }
};

// 自定义事件
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// 性能指标追踪
export const trackWebVitals = (metric: {
  name: string;
  value: number;
  id: string;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }
};

// Analytics 组件
export default function Analytics() {
  useEffect(() => {
    // 性能监控
    if ('performance' in window && 'PerformanceObserver' in window) {
      // 监控 LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        event({
          action: 'LCP',
          category: 'Web Vitals',
          value: Math.round(lastEntry.startTime),
        });
      });
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch {
        // LCP 不支持时忽略
      }

      // 监控 FID (First Input Delay)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEventTiming;
          event({
            action: 'FID',
            category: 'Web Vitals',
            value: Math.round(fidEntry.processingStart - fidEntry.startTime),
          });
        });
      });

      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch {
        // FID 不支持时忽略
      }

      // 监控 CLS (Cumulative Layout Shift)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const clsEntry = entry as LayoutShift;
          if (!clsEntry.hadRecentInput) {
            clsValue += clsEntry.value;
          }
        });

        event({
          action: 'CLS',
          category: 'Web Vitals',
          value: Math.round(clsValue * 1000),
        });
      });

      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch {
        // CLS 不支持时忽略
      }

      // 页面加载完成时的清理
      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false,
            });
          `,
        }}
      />
    </>
  );
}

// 扩展 Window 接口和性能接口
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }

  interface LayoutShift extends PerformanceEntry {
    value: number;
    hadRecentInput: boolean;
  }
}

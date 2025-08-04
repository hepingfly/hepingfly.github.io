import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { BLOG_CONFIG } from "@/lib/github";
import Analytics from "@/components/analytics/Analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: BLOG_CONFIG.title,
    template: `%s | ${BLOG_CONFIG.title}`,
  },
  description: BLOG_CONFIG.subtitle,
  keywords: ["个人博客", "个人IP", "读书分享", "思维成长", "Next.js"],
  authors: [{ name: "和平", url: BLOG_CONFIG.siteUrl }],
  creator: "和平",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: BLOG_CONFIG.siteUrl,
    title: BLOG_CONFIG.title,
    description: BLOG_CONFIG.subtitle,
    siteName: BLOG_CONFIG.title,
    images: [
      {
        url: BLOG_CONFIG.avatarUrl,
        width: 1200,
        height: 630,
        alt: BLOG_CONFIG.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: BLOG_CONFIG.title,
    description: BLOG_CONFIG.subtitle,
    images: [BLOG_CONFIG.avatarUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

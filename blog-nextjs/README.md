# 和平自留地 - Next.js 博客

> 如果互联网崩塌，希望这里能留下一点我曾经来过的痕迹

一个基于 Next.js 15 和 GitHub Issues 的现代化个人博客系统，专注于个人品牌建设、读书分享和思维成长。

## ✨ 特性

- 🚀 **现代化技术栈**: Next.js 15 + TypeScript + Tailwind CSS
- 📝 **GitHub Issues 作为 CMS**: 无需数据库，使用 GitHub Issues 管理文章
- 🎨 **世界级 UI 设计**: 参考 Vercel、Linear 等顶级网站的设计规范
- 📱 **完全响应式**: 完美适配桌面端和移动端
- 🌙 **深色模式**: 支持明暗主题切换
- 🔍 **强大搜索**: 支持全文搜索和高级筛选
- 🏷️ **智能标签系统**: 标签云和分类管理
- ⚡ **性能优化**: 静态生成、图片优化、代码分割
- 📊 **SEO 友好**: 完整的 SEO 配置和结构化数据
- 🔄 **自动部署**: GitHub Actions 自动部署到 GitHub Pages

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4
- **UI 组件**: shadcn/ui
- **动画**: Framer Motion
- **图标**: Lucide React
- **主题**: next-themes
- **API**: GitHub REST API
- **部署**: GitHub Pages / Vercel

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装

```bash
# 克隆仓库
git clone https://github.com/hepingfly/hepingfly.github.io.git
cd hepingfly.github.io/blog-nextjs

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入你的配置

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

## 📝 使用指南

### 创建文章

1. 在 GitHub 仓库中创建新的 Issue
2. 使用标签对文章进行分类
3. 文章会自动出现在博客中

### 文章格式

- **标题**: Issue 标题作为文章标题
- **内容**: Issue 内容作为文章正文，支持 Markdown
- **标签**: Issue 标签作为文章分类
- **时间**: Issue 创建时间作为发布时间

## 🚀 部署

项目已配置 GitHub Actions，推送到 main 分支自动部署到 GitHub Pages。

详细部署指南请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📞 联系

- **作者**: 和平
- **博客**: [https://hepingfly.github.io](https://hepingfly.github.io)
- **GitHub**: [@hepingfly](https://github.com/hepingfly)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！

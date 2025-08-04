# 部署指南

本文档介绍如何将博客部署到 GitHub Pages 和其他平台。

## GitHub Pages 部署

### 自动部署（推荐）

1. **配置 GitHub Actions**
   - 项目已包含 `.github/workflows/deploy.yml` 工作流
   - 推送到 `main` 分支时自动触发部署

2. **启用 GitHub Pages**
   - 进入仓库 Settings > Pages
   - Source 选择 "GitHub Actions"
   - 保存设置

3. **配置环境变量**
   - 复制 `.env.example` 为 `.env.local`
   - 填入必要的配置信息
   - GitHub Token 可在 Settings > Secrets and variables > Actions 中配置

### 手动部署

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 部署到 GitHub Pages
npm run deploy
```

## Vercel 部署

1. **连接 GitHub 仓库**
   - 访问 [Vercel](https://vercel.com)
   - 导入 GitHub 仓库

2. **配置环境变量**
   - 在 Vercel 项目设置中添加环境变量
   - 参考 `.env.example` 文件

3. **自动部署**
   - 推送代码后自动部署
   - 支持预览部署

## Netlify 部署

1. **连接仓库**
   - 在 Netlify 中新建站点
   - 连接 GitHub 仓库

2. **构建设置**
   - Build command: `npm run build`
   - Publish directory: `out`

3. **环境变量**
   - 在站点设置中配置环境变量

## 自定义域名

### GitHub Pages

1. **添加 CNAME 文件**
   ```bash
   echo "yourdomain.com" > public/CNAME
   ```

2. **DNS 配置**
   - 添加 CNAME 记录指向 `username.github.io`
   - 或添加 A 记录指向 GitHub Pages IP

### Vercel/Netlify

1. **域名设置**
   - 在平台控制台添加自定义域名
   - 按照提示配置 DNS

## 环境变量说明

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `GITHUB_TOKEN` | GitHub API Token | 可选 |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | 可选 |
| `NEXT_PUBLIC_SITE_URL` | 网站 URL | 是 |

## 性能优化

1. **图片优化**
   - 使用 Next.js Image 组件
   - 配置图片域名白名单

2. **缓存策略**
   - 静态资源缓存
   - API 响应缓存

3. **代码分割**
   - 动态导入
   - 路由级别分割

## 监控和分析

1. **Google Analytics**
   - 配置 GA_ID 环境变量
   - 自动追踪页面浏览

2. **性能监控**
   - Web Vitals 追踪
   - 错误监控

## 故障排除

### 构建失败

1. **检查依赖**
   ```bash
   npm ci
   npm run build
   ```

2. **检查环境变量**
   - 确保必需的环境变量已配置
   - 检查变量名拼写

3. **检查 Node.js 版本**
   - 使用 Node.js 18 或更高版本

### 部署失败

1. **GitHub Actions 日志**
   - 查看 Actions 标签页的构建日志
   - 检查错误信息

2. **权限问题**
   - 确保仓库有 Pages 权限
   - 检查 Actions 权限设置

### 页面无法访问

1. **DNS 传播**
   - 自定义域名需要等待 DNS 传播
   - 使用 `dig` 或在线工具检查

2. **HTTPS 证书**
   - GitHub Pages 自动提供 HTTPS
   - 自定义域名可能需要时间生成证书

## 备份和恢复

1. **数据备份**
   - GitHub Issues 作为数据源
   - 定期导出重要数据

2. **配置备份**
   - 版本控制所有配置文件
   - 记录环境变量设置

## 更新和维护

1. **依赖更新**
   ```bash
   npm update
   npm audit fix
   ```

2. **安全更新**
   - 定期检查安全漏洞
   - 及时更新依赖

3. **性能监控**
   - 定期检查网站性能
   - 优化加载速度

## 支持

如果遇到问题，可以：

1. 查看项目 Issues
2. 参考 Next.js 官方文档
3. 检查 GitHub Pages 文档

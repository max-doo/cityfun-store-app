# 部署说明

本文档介绍如何将城市乐园B端门店后台管理系统部署到 GitHub Pages。

## 前提条件

- 拥有 GitHub 账号
- 已将项目代码上传到 GitHub 仓库
- 本地已安装 Node.js 和 npm

## 自动部署（推荐）

项目已配置 GitHub Actions 自动部署工作流，只需简单几步：

### 1. 启用 GitHub Pages

1. 进入 GitHub 仓库页面
2. 点击 `Settings`（设置）
3. 在左侧菜单找到 `Pages`
4. 在 `Source` 下拉菜单中选择 `GitHub Actions`

### 2. 推送代码

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

推送后，GitHub Actions 会自动：
- 安装依赖
- 构建项目
- 部署到 GitHub Pages

### 3. 访问网站

部署完成后，可以通过以下地址访问：

```
https://<你的用户名>.github.io/<仓库名>/
```

例如：`https://cityfuns.github.io/admin/`

## 手动部署

如果不使用 GitHub Actions，也可以手动部署：

### 1. 本地构建

```bash
npm install
npm run build
```

### 2. 部署 dist 目录

将 `dist` 目录的内容部署到任何静态托管服务，例如：

- **GitHub Pages（手动）**
  ```bash
  npm install -g gh-pages
  gh-pages -d dist
  ```

- **Vercel**
  - 连接 GitHub 仓库
  - 设置构建命令：`npm run build`
  - 设置输出目录：`dist`

- **Netlify**
  - 拖拽 `dist` 目录到 Netlify
  - 或连接 GitHub 自动部署

## 部署到其他平台

### Vercel

1. 访问 [vercel.com](https://vercel.com)
2. 导入 GitHub 仓库
3. 构建设置：
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. 点击 Deploy

### Netlify

1. 访问 [netlify.com](https://netlify.com)
2. 从 GitHub 导入项目
3. 构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
4. 点击 Deploy

## 自定义域名

### GitHub Pages

1. 在仓库根目录创建 `public/CNAME` 文件
2. 文件内容为你的域名，如：`admin.cityfuns.com`
3. 在域名 DNS 设置中添加 CNAME 记录指向 `<用户名>.github.io`

### Vercel/Netlify

在平台设置中直接添加自定义域名即可。

## 故障排查

### 页面空白或 404

检查 `vite.config.ts` 中的 `base` 配置：

```typescript
export default defineConfig({
  base: './', // 使用相对路径，适用于大多数情况
  // 如果部署到子路径，使用：
  // base: '/仓库名/',
})
```

### 路由不工作

确保使用 HashRouter 或配置服务器重定向所有请求到 index.html。

### 构建失败

检查：
1. Node.js 版本（推荐 18+）
2. 依赖是否完整安装：`npm install`
3. TypeScript 错误：`npm run build`

## 更新网站

每次推送到 main 分支，GitHub Actions 会自动重新部署。

或者手动重新构建并部署：

```bash
npm run build
# 然后按照手动部署步骤操作
```

## 技术支持

如有问题，请联系开发团队或查看项目 README.md。


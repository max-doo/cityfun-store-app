# 城市乐园B端门店后台管理系统

城市乐园（CityFuns）供直营门店和加盟商使用的B端门店后台管理移动应用原型。

## 项目简介

这是一个基于 React + Vite + Ant Design Mobile 开发的移动端门店后台管理系统原型，支持以下功能：

- **首页**：门店概览、功能入口、实时数据看板
- **分析**：营收分析、会员分析、游玩分析、库存分析
- **商城**：采购商城、租赁平台
- **我的**：账号信息、资产管理、设置

## 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型支持
- **Vite** - 构建工具
- **React Router** - 路由管理
- **Ant Design Mobile** - 移动端 UI 组件库
- **CSS Variables** - 主题定制

## 主题特色

- 🎨 橙色品牌主题
- 📱 移动端优先设计
- 🚀 快速加载和响应
- 💡 直观的用户界面

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览构建

```bash
npm run preview
```

## 部署到 GitHub Pages

### 方式一：自动部署（推荐）

1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 "GitHub Actions" 作为部署源
4. 推送到 main 分支会自动触发部署

### 方式二：手动部署

```bash
npm run build
```

将 `dist` 目录的内容部署到任何静态托管服务。

## 项目结构

```
src/
├── components/          # 公共组件
│   └── Layout.tsx      # 主布局（含底部导航）
├── pages/              # 页面组件
│   ├── Home.tsx        # 首页
│   ├── Analysis.tsx    # 分析页
│   ├── Mall.tsx        # 商城页
│   ├── Profile.tsx     # 我的页
│   └── ...             # 其他功能页面
├── mock/               # 模拟数据
│   └── data.ts         # 数据源
├── styles/             # 样式文件
│   └── global.css      # 全局样式和主题
├── App.tsx             # 根组件
└── main.tsx            # 入口文件
```

## 功能模块

### 主要功能
- 订单管理（销售订单、核销订单）
- 门票套餐（门票管理、套餐管理）
- 营销工具（分销、优惠券、促活）
- 终端设备（游乐项目、设备管理）

### 常用功能
- 会员管理
- 商品管理
- 分销管理
- 券管理
- 促活专区
- 自营商城
- 我要融资
- 乐园学院

## 浏览器支持

- iOS Safari 10+
- Android Chrome 60+
- 现代浏览器最新两个版本

## 开发说明

本项目为可交互原型演示，使用模拟数据进行展示。若需要接入真实后端 API，请修改 `src/mock/data.ts` 并实现相应的数据请求逻辑。

## 许可证

Copyright © 2023 城市乐园（CityFuns）


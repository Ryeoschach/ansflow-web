# AnsFlow Web
> AnsFlow 平台产品官网与技术说明文档门户

<p align="left">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8">
  <img src="https://img.shields.io/badge/授权-私有-grey?style=for-the-badge" alt="授权: 私有">
  <a href="./README.md"><img src="https://img.shields.io/badge/Lang-English-red?style=for-the-badge" alt="English"></a>
</p>

[English](./README.md) | 中文说明

AnsFlow Web 是企业级 AI 驱动声明式运维与自愈平台 AnsFlow 的**产品宣传官网与技术说明文档门户**。基于 React 19 + TypeScript + Vite 构建，采用高级毛玻璃感（Glassmorphic）UI 视觉系统，内置实时自愈模拟器和完整的中英双语白皮书手册。

---

## 技术栈

- **前端框架**：React 19 + TypeScript
- **构建工具**：Vite 8
- **样式方案**：原生 CSS（无 Tailwind 捆绑，实现极高控制度的微交互、平滑动效与响应式布局）
- **国际化**：轻量级响应式全局 i18n 引擎
- **视觉插图**：纯 CSS 与 SVG 关键帧动画构建的 DevOps 概念模型（如 DAG 流水线、GitOps 闭环、RAG 向量搜索等）

---

## 展示的核心特性

1. **AI 自愈决策引擎**：自动接收告警并进行根因研判，自主设计排障方案并自动编写 Ansible 剧本。
2. **可视化 DAG 流程编排**：基于 ReactFlow 的拓扑流程图编辑器，支持条件分支与实时流追踪。
3. **资产分区与一键 Promote**：沙箱临时草稿区与生产成熟区隔离，支持一键晋升。
4. **知识库 RAG 向量闭环**：验证通过的剧本自动向量化存入 ChromaDB，后续类似告警实现毫秒级秒回复用。
5. **云原生 GitOps 声明式同步**：监听 Git 仓库自动同步拉齐 Kubernetes 资源状态。
6. **主机安全基线与等保 2.0**：内置等保 2.0 三级标准安全合规检查项，支持一键合规评分与剧本级联修复自愈。
7. **自定义 AI 提示词模板**：对 7 大大模型场景提示词进行动态配置、变量安全正则校验与出厂一键还原。
8. **多渠道通知与事件白名单**：支持飞书、钉钉机器人通知接入，具备细粒度事件类型白名单过滤。
9. **多维数据与运营报表**：全面洞察告警自愈统计、可视化 DAG 运行、Ansible 剧本执行指标及安全合规评分趋势。

---

## 项目结构

```
ansflow-web/
├── public/                 # 静态资源 (favicon 等)
├── src/
│   ├── assets/             # 品牌 Logo 与全局资源
│   ├── components/         # 页面组件
│   │   ├── Header.tsx      # 导航栏及语言切换
│   │   ├── Hero.tsx        # 核心视觉 Hero Banner
│   │   ├── Features.tsx    # 3x3 对称的核心特性网格（含微动画）
│   │   ├── Architecture.tsx# 交互式系统技术拓扑图
│   │   ├── InteractiveDemo.tsx # 实时故障自愈模拟器
│   │   ├── Docs.tsx        # 完整中英双语技术文档说明
│   │   └── Footer.tsx      # 页面底部信息
│   ├── context/            # 全局 React 上下文 (i18n, 导航路由)
│   ├── i18n/               # 国际化语言翻译词典
│   ├── imgs/               # 系统实际页面截图
│   ├── index.css           # 全局核心视觉样式与动画定义
│   ├── main.tsx            # 应用挂载入口
│   └── App.tsx             # 路由控制分发
└── package.json
```

---

## 快速开始

### 安装依赖

```bash
npm install
# 或者使用 pnpm
pnpm install
```

### 本地开发

```bash
npm run dev
```

### 生产编译打包

```bash
npm run build
```

---

## 授权协议

Private - All Rights Reserved

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

// Import System Screenshot Assets
import gitopsImg from '../imgs/gitops应用.png';
import modelConfigImg from '../imgs/模型与知识库配置.png';
import ansibleTemplateImg from '../imgs/ansible模版.png';
import pipelineEditImg from '../imgs/流水线编辑.png';
import sreRulesImg from '../imgs/创建自愈规则与关联流水线.png';
import backupRestoreImg from '../imgs/系统模块备份与还原.png';
import sreAlertsImg from '../imgs/sre告警中心.png';
import approvalImg from '../imgs/审批.png';
import aiDiagnosisImg from '../imgs/ai诊断与自动生成修复流水线.png';
import auditImg from '../imgs/审计.png';
import aiChatImg from '../imgs/ai聊天功能.png';
import mlpsImg from '../imgs/等保2.0.png';
import customPromptImg from '../imgs/自定义提示词.png';
import notificationConfigImg from '../imgs/通知配置.png';
import projectMgmtImg from '../imgs/项目管理.png';
import assetShareImg from '../imgs/跨项目授权.png';
import reportImg from '../imgs/report.png';


// Context for zoom functionality
const DocZoomContext = React.createContext<(src: string, alt: string) => void>(() => {});

// Reusable Screenshot Card with lazy loading and captions
const DocScreenshot: React.FC<{ src: string; alt: string; caption: string }> = ({ src, alt, caption }) => {
  const onZoom = React.useContext(DocZoomContext);
  return (
    <div className="doc-image-wrapper">
      <div className="doc-image-inner" onClick={() => onZoom(src, caption)}>
        <img src={src} alt={alt} className="doc-img" loading="lazy" />
        <div className="doc-img-zoom-hover">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </div>
      </div>
      <div className="doc-img-caption">
        <span className="caption-dot"></span>
        {caption}
      </div>
    </div>
  );
};


// Simple Copy Component for code snippets
const CodeBlock: React.FC<{ code: string; lang?: string }> = ({ code, lang }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-lang">{lang || 'text'}</span>
        <button onClick={copyToClipboard} className="copy-btn">
          {copied ? (
            <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Copied
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              Copy
            </span>
          )}
        </button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );
};

// Navigation Sections Mapping
const SECTIONS = [
  { id: 'intro', labelZh: '系统介绍与架构设计', labelEn: 'System Intro & Arch' },
  { id: 'install', labelZh: '安装与快速部署', labelEn: 'Installation Guide' },
  { id: 'ai-engine', labelZh: 'AI 决策引擎 (ai_engine)', labelEn: 'AI Engine' },
  { id: 'ai-chat', labelZh: 'AI 助手对话 (ai_chat)', labelEn: 'AI Assistant Chat' },
  { id: 'sre', labelZh: '告警自愈管理 (sre_management)', labelEn: 'SRE Management' },
  { id: 'pipeline', labelZh: '可视化 DAG 流水线 (pipeline_management)', labelEn: 'Pipeline Edit' },
  { id: 'host', labelZh: '主机与凭证隔离 (host_management)', labelEn: 'Host & Credentials' },
  { id: 'k8s', labelZh: '云原生与 GitOps (k8s_management)', labelEn: 'Kubernetes & GitOps' },
  { id: 'approval', labelZh: '操作审批中心 (approval_center)', labelEn: 'Approval Center' },
  { id: 'config', labelZh: '动态配置中心 (config_center)', labelEn: 'Configuration' },
  { id: 'task', labelZh: '任务审计与日志 (task_management)', labelEn: 'Task & Audit' },
  { id: 'report', labelZh: '多维运营数据报表', labelEn: 'Operational Reports' },
  { id: 'baseline', labelZh: '智能安全基线 (Baseline)', labelEn: 'Security Baseline' },
  { id: 'rbac', labelZh: '多租户 SmartRBAC (rbac_permission)', labelEn: 'SmartRBAC' },
  { id: 'pulse', labelZh: '心跳健康检测 (task_pulse)', labelEn: 'Pulse Health Check' }
];

export const Docs: React.FC = () => {
  const { language, setView } = useApp();
  const [activeSection, setActiveSection] = useState('intro');
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  // Disable body scroll when image is zoomed
  useEffect(() => {
    if (zoomedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [zoomedImage]);

  // Handle Escape key press to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomedImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleZoom = (src: string, alt: string) => {
    setZoomedImage({ src, alt });
  };

  

  // Scrollspy logic using IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      rootMargin: '-80px 0px -60% 0px', // Trigger when section is in the top 40% of viewport
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe each section
    SECTIONS.forEach(sec => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => {
      SECTIONS.forEach(sec => {
        const el = document.getElementById(sec.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleSidebarClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      if (window.innerWidth > 992) {
        const container = rightContentRef.current;
        if (container) {
          const containerTop = container.getBoundingClientRect().top;
          const targetTop = target.getBoundingClientRect().top;
          const scrollPosition = targetTop - containerTop + container.scrollTop;
          container.scrollTo({ top: scrollPosition, behavior: 'smooth' });
        }
      } else {
        const yOffset = -80; // Offset for sticky header
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      setActiveSection(id);
    }
  };

  const composeServicesCode = `ansflow-frontend  # Nginx + compiled frontend, entry point on port 80
ansflow-api       # Django ASGI API and WebSocket service
ansflow-worker    # Celery worker for pipeline, AI, and Ansible tasks
ansflow-beat      # Celery Beat scheduler using DatabaseScheduler
ansflow-monitor   # pulse_monitor process for worker and task heartbeat data
ansflow-init      # one-shot migrations, collectstatic, optional system seed
ansflow-db        # PostgreSQL with pgvector
ansflow-redis     # Redis broker/cache with appendonly persistence`;

  const envCode = `# Required runtime secrets
SECRET_KEY=change-me
ALLOWED_HOSTS=localhost,127.0.0.1

# First boot system seed. Set true only when you need to create default data.
INIT_SYSTEM_DATA=true
DJANGO_SUPERUSER_USERNAME=admin
DJANGO_SUPERUSER_PASSWORD=ansflow
DJANGO_SUPERUSER_EMAIL=admin@example.com

# AI provider
LLM_PROVIDER=deepseek
LLM_API_KEY=sk-xxxxxx-your-api-key
LLM_API_BASE=https://api.deepseek.com/v1
LLM_MODEL=deepseek-chat

# Optional outbound proxy for image build or model downloads
HTTP_PROXY=
HTTPS_PROXY=
NO_PROXY=localhost,127.0.0.1,ansflow-db,ansflow-redis`;

  const dockerCommandsCode = `# Run inside the backend directory
cd backend

# Start all services. ansflow-init exits with code 0 after successful initialization.
docker compose up -d --build

# Check status and inspect key logs
docker compose ps
docker compose logs -f ansflow-init ansflow-api ansflow-worker

# Stop services without deleting persistent database/redis volumes
docker compose down`;

  const manualInstallCode = `# Backend
git clone https://github.com/Ryeoschach/ansflow-backend.git
cd ansflow-backend
uv sync
cp .env.example .env
uv run python manage.py migrate
uv run python manage.py runserver

# Worker, beat, and pulse monitor in separate terminals
uv run celery -A config worker --loglevel=info -P solo
uv run celery -A config beat --loglevel=info --scheduler django_celery_beat.schedulers:DatabaseScheduler
uv run python manage.py pulse_monitor

# Frontend
git clone https://github.com/Ryeoschach/ansflow-frontend.git
cd ansflow-frontend
pnpm install
pnpm dev`;

  return (
    <DocZoomContext.Provider value={handleZoom}>
      <div className="docs-page container">
      {/* 2-Column Responsive Layout */}
      <div className="docs-layout">
        
        {/* Left: Sidebar Navigation */}
        <aside className="docs-sidebar glass-effect">
          <div className="sidebar-title">
            {language === 'zh' ? '文档导航' : 'Documentation'}
          </div>
          <nav className="sidebar-nav">
            {SECTIONS.map(sec => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={(e) => handleSidebarClick(e, sec.id)}
                className={`sidebar-link ${activeSection === sec.id ? 'active' : ''}`}
              >
                {language === 'zh' ? sec.labelZh : sec.labelEn}
              </a>
            ))}
          </nav>
        </aside>

        {/* Right: Documentation Content */}
        <div className="docs-content" ref={rightContentRef}>
          {language === 'zh' ? (
            /* ========================================================
               CHINESE DOCUMENTATION CONTENT
               ======================================================== */
            <>
              {/* Introduction & Architecture */}
              <section id="intro" className="doc-section">
                <span className="badge">系统架构</span>
                <h1>系统介绍与架构设计</h1>
                <p>
                  AnsFlow 是一款先进的、AI 驱动的<strong>声明式运维与自愈平台</strong>。其架构核心围绕“双通道闭环”展开：一个由系统指标和配置驱动的<strong>自动化自愈闭环</strong>，以及一个供运维人员审计与晋升系统行为的<strong>审核优化闭环</strong>。
                </p>
                <p>
                  项目由前端工作台、后端服务和产品展示文档站组成。源码仓库：<a href="https://github.com/Ryeoschach/ansflow-frontend" target="_blank" rel="noreferrer">ansflow-frontend</a>、<a href="https://github.com/Ryeoschach/ansflow-backend" target="_blank" rel="noreferrer">ansflow-backend</a>；产品展示与完整文档地址：<a href="https://ansflow.cyfee.com" target="_blank" rel="noreferrer">https://ansflow.cyfee.com</a>。
                </p>
                
                {/* Visual SVG System Topology */}
                <div className="architecture-svg-wrapper">
                  <div className="svg-header">AnsFlow 数据控制闭环与拓扑图</div>
                  <svg className="arch-map-svg" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Background Grid */}
                    <defs>
                      <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.03" strokeWidth="1" />
                      </pattern>
                      <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--gradient-dag-start)" />
                        <stop offset="100%" stopColor="var(--gradient-dag-end)" />
                      </linearGradient>
                      <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--gradient-ai-start)" />
                        <stop offset="100%" stopColor="var(--gradient-ai-end)" />
                      </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />

                    {/* Flows Connecting Cards (Dashed animated paths) */}
                    {/* Ingestion -> AI */}
                    <path className="flow-pipe" d="M 180 120 L 260 120" stroke="url(#gradient-purple)" strokeWidth="2" strokeDasharray="6,4" />
                    {/* AI -> DAG */}
                    <path className="flow-pipe" d="M 420 120 L 500 120" stroke="url(#gradient-blue)" strokeWidth="2" strokeDasharray="6,4" />
                    {/* DAG -> Execution */}
                    <path className="flow-pipe" d="M 580 170 L 580 230" stroke="var(--accent-color)" strokeWidth="2" strokeDasharray="6,4" />
                    {/* Execution -> Targets */}
                    <path className="flow-pipe" d="M 500 280 L 420 280" stroke="var(--accent-color)" strokeWidth="2" strokeDasharray="6,4" />
                    {/* Targets -> Feedback/RAG (Feedback Loop) */}
                    <path className="flow-pipe" d="M 260 280 L 180 280" stroke="url(#gradient-purple)" strokeWidth="2" strokeDasharray="6,4" />
                    {/* Feedback -> Ingestion */}
                    <path className="flow-pipe" d="M 100 230 L 100 170" stroke="url(#gradient-purple)" strokeWidth="2" strokeDasharray="6,4" />

                    {/* Nodes (Boxes) */}
                    {/* Node 1: Ingestion */}
                    <g transform="translate(20, 60)">
                      <rect x="0" y="0" width="160" height="110" rx="12" className="svg-card" fill="var(--bg-secondary)" stroke="var(--border-color)" strokeWidth="1" />
                      <text x="80" y="30" textAnchor="middle" fill="var(--text-primary)" fontWeight="bold" fontSize="12">1. 事件与告警接入</text>
                      <text x="80" y="55" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">AlertManager 告警</text>
                      <text x="80" y="75" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Git 仓库同步事件</text>
                      <text x="80" y="95" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">主机基线不合规</text>
                      <circle cx="160" cy="60" r="4" fill="var(--gradient-ai-end)" />
                    </g>

                    {/* Node 2: AI Brain (RAG + LLM) */}
                    <g transform="translate(260, 60)">
                      <rect x="0" y="0" width="160" height="110" rx="12" className="svg-card glow-purple" fill="var(--bg-secondary)" stroke="var(--border-color)" strokeWidth="1.5" />
                      <text x="80" y="30" textAnchor="middle" fill="var(--text-primary)" fontWeight="bold" fontSize="12">2. AI 研判与 RAG</text>
                      <text x="80" y="55" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">向量库故障场景匹配</text>
                      <text x="80" y="75" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">LLM 规划排障思路</text>
                      <text x="80" y="95" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">智能生成 Playbook</text>
                      <circle cx="0" cy="60" r="4" fill="var(--gradient-ai-start)" />
                      <circle cx="160" cy="60" r="4" fill="var(--gradient-dag-start)" />
                    </g>

                    {/* Node 3: Visual DAG Generator */}
                    <g transform="translate(500, 60)">
                      <rect x="0" y="0" width="160" height="110" rx="12" className="svg-card glow-blue" fill="var(--bg-secondary)" stroke="var(--border-color)" strokeWidth="1.5" />
                      <text x="80" y="30" textAnchor="middle" fill="var(--text-primary)" fontWeight="bold" fontSize="12">3. 动态流水线编排</text>
                      <text x="80" y="55" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">ReactFlow 画布构建</text>
                      <text x="80" y="75" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">条件分支 (If-Else)</text>
                      <text x="80" y="95" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">探测校验与流程确认</text>
                      <circle cx="0" cy="60" r="4" fill="var(--gradient-dag-end)" />
                      <circle cx="80" cy="110" r="4" fill="var(--accent-color)" />
                    </g>

                    {/* Node 4: Executor */}
                    <g transform="translate(500, 230)">
                      <rect x="0" y="0" width="160" height="110" rx="12" className="svg-card" fill="var(--bg-secondary)" stroke="var(--border-color)" strokeWidth="1" />
                      <text x="80" y="30" textAnchor="middle" fill="var(--text-primary)" fontWeight="bold" fontSize="12">4. 隔离执行引擎</text>
                      <text x="80" y="55" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Celery 分布式调度</text>
                      <text x="80" y="75" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Ansible Runner 隔离</text>
                      <text x="80" y="95" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">SSH 临时安全凭证</text>
                      <circle cx="80" cy="0" r="4" fill="var(--accent-color)" />
                      <circle cx="0" cy="50" r="4" fill="var(--accent-color)" />
                    </g>

                    {/* Node 5: Target Infrastructure */}
                    <g transform="translate(260, 230)">
                      <rect x="0" y="0" width="160" height="110" rx="12" className="svg-card" fill="var(--bg-secondary)" stroke="var(--border-color)" strokeWidth="1" />
                      <text x="80" y="30" textAnchor="middle" fill="var(--text-primary)" fontWeight="bold" fontSize="12">5. 混合云基础设施</text>
                      <text x="80" y="55" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">K8s Pod 状态同步</text>
                      <text x="80" y="75" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">主机配置漂移回正</text>
                      <text x="80" y="95" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">执行回执与探测校验</text>
                      <circle cx="160" cy="50" r="4" fill="var(--accent-color)" />
                      <circle cx="0" cy="50" r="4" fill="var(--gradient-ai-end)" />
                    </g>

                    {/* Node 6: Feedback & RAG Promo Channel */}
                    <g transform="translate(20, 230)">
                      <rect x="0" y="0" width="160" height="110" rx="12" className="svg-card glow-gold" fill="var(--bg-secondary)" stroke="var(--border-color)" strokeWidth="1" />
                      <text x="80" y="30" textAnchor="middle" fill="var(--text-primary)" fontWeight="bold" fontSize="12">6. 晋升与知识沉淀</text>
                      <text x="80" y="55" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">一键 Promote 渠道</text>
                      <text x="80" y="75" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">草稿转化为向量索引</text>
                      <text x="80" y="95" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">回流数据库 持续学习</text>
                      <circle cx="160" cy="50" r="4" fill="var(--gradient-ai-start)" />
                      <circle cx="80" cy="0" r="4" fill="var(--gradient-ai-end)" />
                    </g>
                  </svg>
                </div>

                <h3>核心技术栈</h3>
                <div className="tech-stack-grid">
                  <div className="tech-card">
                    <h4>展示层 (Frontend)</h4>
                    <ul>
                      <li>React 18 & TypeScript</li>
                      <li>Vite 高速构建</li>
                      <li>Vanilla CSS 动效层</li>
                      <li>ReactFlow 流程图编辑器</li>
                    </ul>
                  </div>
                  <div className="tech-card">
                    <h4>服务层 (Backend)</h4>
                    <ul>
                      <li>Django 5.2 (ASGI/Daphne)</li>
                      <li>Celery 异步队列</li>
                      <li>PostgreSQL/pgvector & Redis</li>
                      <li>Ansible Runner & SSH 隔离</li>
                    </ul>
                  </div>
                  <div className="tech-card">
                    <h4>智能层 (AI Brain)</h4>
                    <ul>
                      <li>LangChain Agent 框架</li>
                      <li>pgvector / ChromaDB 向量检索</li>
                      <li>FastEmbed 轻量嵌入</li>
                      <li>LLM (DeepSeek / Ollama)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Installation Guide */}
              <section id="install" className="doc-section">
                <span className="badge">快速部署</span>
                <h1>安装部署说明</h1>
                <p>
                  AnsFlow 提供了两种主要部署方式：适合生产与快速体验的 <strong>Docker Compose 一键部署</strong>，以及适合本地二次开发的 <strong>手动开发部署</strong>。
                </p>

                <h2>方式 A: Docker Compose 部署 (推荐)</h2>
                <p>
                  使用后端仓库内置的 <code>docker-compose.yml</code> 可以快速启动前端网关、Django API、PostgreSQL/pgvector、Redis、Celery Worker/Beat 与心跳监控。文档只列出必要信息，完整配置以仓库中的 compose 文件为准。
                </p>
                <div className="step-title">1. 服务组成</div>
                <CodeBlock code={composeServicesCode} lang="text" />

                <div className="step-title">2. 创建并配置环境变量文件 (.env)</div>
                <p>在 <code>backend/.env</code> 中确认以下关键参数。超级管理员账号来自环境变量，首次初始化时无需再手动执行创建管理员命令。</p>
                <CodeBlock code={envCode} lang="env" />

                <div className="step-title">3. 一键启动服务</div>
                <p>在项目根目录的后端子目录中运行以下命令：</p>
                <CodeBlock code={dockerCommandsCode} lang="bash" />

                <h2>方式 B: 手动开发部署</h2>
                <p>适合本地调试与开发。运行环境需要 Python 3.12+、Redis 7+ 和 PostgreSQL 15+：</p>
                <CodeBlock code={manualInstallCode} lang="bash" />

                <div className="alert-box warning-alert">
                  <div className="alert-icon">提示</div>
                  <div className="alert-text">
                    <strong>部署注意事项：</strong>
                    <br />
                    1. <strong>初始化行为：</strong> <code>ansflow-init</code> 会执行迁移与静态文件收集；只有当 <code>INIT_SYSTEM_DATA=true</code> 时才会执行系统内置数据初始化。
                    <br />
                    2. <strong>数据持久化：</strong> PostgreSQL 与 Redis 使用命名 volume 保存数据，执行 <code>docker compose down -v</code> 会删除这些数据。
                    <br />
                    3. <strong>LLM API 连接：</strong> 若使用公有云模型（如 DeepSeek），确保后端容器具备外部网络访问权限。
                  </div>
                </div>
              </section>

              {/* Module: ai_engine */}
              <section id="ai-engine" className="doc-section">
                <span className="badge">ai_engine</span>
                <h1>AI 决策引擎</h1>
                <p>
                  `ai_engine` 是平台的智能中枢，基于 <strong>LangChain</strong> 与 <strong>FastEmbed</strong> 框架构建。
                </p>
                <h3>核心功能与业务机制</h3>
                <ul>
                  <li><strong>相似告警检索 (RAG)</strong>：当接收到系统告警时，AI 引擎首先将告警摘要向量化，在 <strong>ChromaDB</strong> 中进行相似度搜索，召回历史已成功处理的故障排障剧本 (Playbook) 模板。</li>
                  <li><strong>动态脚本生成</strong>：若未匹配到高置信度的模板，AI 引擎将调用大语言模型 (LLM) 进行故障原因研判，并根据上下文参数自动生成合规、幂等的 Ansible Playbook。</li>
                  <li><strong>沙箱暂存区</strong>：新生成的剧本会自动打上 <code>[AI_DRAFT]</code> 标签，并隔离保存在临时草稿区，避免对已有的手工审核过资产造成污染。</li>
                </ul>
                <DocScreenshot
                  src={modelConfigImg}
                  alt="模型与知识库配置"
                  caption="模型与知识库配置控制台：在此界面管理大语言模型接入、提示词模板，并配置自愈决策的 RAG 向量检索策略。"
                />
                <h3>自定义 AI 提示词模板</h3>
                <p>
                  系统提供了针对 RAG 问答、日志诊断、告警分析、DAG 生成、DAG 优化、流水线解释和 OCR 视觉解析等 7 处核心场景的 AI 提示词自定义能力。管理员可在配置中心动态编辑提示词模板，系统会自动进行变量占位符安全校验，同时支持出厂设置一键还原和强大的静态默认值容错回退机制，确保大模型运行时安全可靠。
                </p>
                <DocScreenshot
                  src={customPromptImg}
                  alt="自定义 AI 提示词"
                  caption="自定义 AI 提示词控制台：支持编辑和管理系统内置场景的提示词模板，自动提示和校验必需的占位符变量，并提供一键恢复默认功能。"
                />
              </section>

              {/* Module: ai_chat */}
              <section id="ai-chat" className="doc-section">
                <span className="badge">ai_chat</span>
                <h1>AI 助手对话</h1>
                <p>
                  `ai_chat` 作为 SRE 和 DevOps 工程师的交互式 AI 助手，能够将自然语言转化为实际的运维流水线。
                </p>
                <h3>核心机制</h3>
                <ul>
                  <li><strong>交互式排障</strong>：允许工程师查询系统指标、日志，并针对当前活跃告警获取即时建议。</li>
                  <li><strong>即时剧本生成</strong>：用户可以直接发出指令（如“编写一个轮转日志的剧本”），AI 会输出语法校验通过的 YAML，并可直接保存为草稿或流水线。</li>
                  <li><strong>WebSocket 实时流式响应</strong>：通过 WebSocket (Django Channels) 进行双向长连接，后端生成大模型文本与剧本代码时采用打字机式（Typewriter-style）流式推送，消除加载等待焦虑，给用户带来秒级实时交互体验。</li>
                  <li><strong>告警与资产感知</strong>：深度融合了当前活跃告警和资产列表，提供结合上下文的诊断和一键执行方案。</li>
                  <li><strong>安全沙箱与审批</strong>：从对话中发起的所有执行请求均需经过角色权限校验，并提交至操作审批中心审核。</li>
                </ul>
                <DocScreenshot
                  src={aiChatImg}
                  alt="AI 助手对话界面"
                  caption="AI 助手对话控制台：支持使用自然语言与 AI 助手交互，自动生成 Ansible 剧本，并触发经审批的运维操作。"
                />
              </section>

              {/* Module: sre_management */}
              <section id="sre" className="doc-section">
                <span className="badge">sre_management</span>
                <h1>告警自愈管理</h1>
                <p>
                  `sre_management` 是平台的告警接收与自愈调度中心，提供与 Prometheus AlertManager 兼容的 Webhook 接口。
                </p>
                <h3>核心闭环工作流</h3>
                <div className="workflow-steps">
                  <div className="wf-step">
                    <span className="num">1</span>
                    <strong>告警接入：</strong> Prometheus 触发阈值，向 AnsFlow 发送告警 JSON 载荷（包含状态、级别和元数据）。
                  </div>
                  <div className="wf-step">
                    <span className="num">2</span>
                    <strong>策略匹配：</strong> 系统根据告警标签（如 <code>service=nginx</code>）查询 SRE 路由策略表，判定是否开启自愈。
                  </div>
                  <div className="wf-step">
                    <span className="num">3</span>
                    <strong>流水线触发：</strong> 匹配成功后，自动调起对应的任务流流水线 (Pipeline DAG) 执行排障修复动作。
                  </div>
                </div>
                <h3>自愈安全与熔断机制</h3>
                <ul>
                  <li><strong>Webhook Token 安全校验</strong>：对于所有流入平台的告警 Webhook，系统支持自定义 Token 安全校验鉴权，拦截未授权或恶意伪造的告警载荷，确保自愈触发源头绝对可信。</li>
                  <li><strong>自愈频次熔断器 (Circuit Breaker)</strong>：为防范因同类故障连续爆发造成的“执行风暴”（Execution Storm）或因流水线设计缺陷引发的“无限自愈死循环”，系统引入了基于滑动时间窗口的频次限制（如：10 分钟内同一策略上限自愈执行 3 次）。一旦达到熔断阈值，该策略将被强制标记为熔断状态并暂停自愈，同时自动向通知渠道推送紧急告警通知，维护生产系统稳定性。</li>
                </ul>
                <DocScreenshot
                  src={sreAlertsImg}
                  alt="SRE 告警中心"
                  caption="SRE 告警中心：接收 Prometheus 实时推送的告警，展示当前集群内所有自愈流水线的运行状态。"
                />
                <DocScreenshot
                  src={sreRulesImg}
                  alt="自愈规则与流水线联动"
                  caption="自愈规则与流水线联动：支持根据特定告警指标与级别，自动关联并触发相应的运维流水线。"
                />
              </section>

              {/* Module: pipeline_management */}
              <section id="pipeline" className="doc-section">
                <span className="badge">pipeline_management</span>
                <h1>可视化 DAG 流水线编排</h1>
                <p>
                  `pipeline_management` 支持运维人员通过直观的可视化画布设计与编排复杂的运维任务流。
                </p>
                <h3>核心功能与特性</h3>
                <ul>
                  <li><strong>DAG 拓扑执行</strong>：基于有向无环图 (DAG) 编排，支持顺序、并行节点执行（如：前置探测 → 人工审批 → 剧本执行 → 后置校验）。</li>
                  <li><strong>条件分支逻辑</strong>：支持根据上游节点的返回状态码或 JSON 数据，动态规划下游分支的走向（如 HTTP 返回 502 则重启服务，若超时则触发灾备切换）。</li>
                  <li><strong>实时日志推送</strong>：借助 Django Channels (WebSocket) 向前端实时推送每一个节点的执行状态、详细 stdout 日志及进度监控。</li>
                </ul>
                <DocScreenshot
                  src={pipelineEditImg}
                  alt="可视化流水线编辑器"
                  caption="可视化流水线编辑器：基于 ReactFlow 构建的 DAG 画布，支持算子拖拽、分支决策与节点健康探测配置。"
                />
                <DocScreenshot
                  src={aiDiagnosisImg}
                  alt="AI 智能排障与流水线自生成"
                  caption="AI 智能排障与流水线自生成：分析根因后，AI 会自动生成并推荐相应的修复流水线草稿，等待人工确认。"
                />
              </section>

              {/* Module: host_management */}
              <section id="host" className="doc-section">
                <span className="badge">host_management</span>
                <h1>主机资产与凭证隔离</h1>
                <p>
                  `host_management` 提供统一的主机资源纳管以及 SSH 安全凭证管理，为 Ansible 隔离执行引擎提供底层通道支撑。
                </p>
                <h3>安全通道设计</h3>
                <ul>
                  <li><strong>凭证加密存储</strong>：支持 SSH 私钥、登录密码以及 Sudo 提升提权凭证加密保存，采用 AES-256 算法加密写入 PostgreSQL 数据库。</li>
                  <li><strong>一键密钥分发</strong>：内置一键分发 SSH 公钥功能，快速建立可信的安全通信信道。</li>
                  <li><strong>操作指令审计</strong>：全程记录底层 SSH/SFTP 交互中的每一个命令与响应，供团队合规审计追溯。</li>
                </ul>
                <DocScreenshot
                  src={ansibleTemplateImg}
                  alt="主机运维与 Ansible 模板市场"
                  caption="主机运维与 Ansible 模板市场：提供多版本 Ansible 脚本模板编辑、集中下发与运行参数的安全性校验。"
                />
              </section>

              {/* Module: k8s_management */}
              <section id="k8s" className="doc-section">
                <span className="badge">k8s_management</span>
                <h1>云原生与 GitOps 声明式同步</h1>
                <p>
                  `k8s_management` 承载云原生集群接入、容器日志收集、WebTTY 远程调试，以及核心的 <strong>GitOps 声明式控制循环</strong>。
                </p>
                <h3>业务流与状态同步</h3>
                <ul>
                  <li><strong>GitOps 自动对齐 (Reconciliation)</strong>：用户在 Git 仓库中声明 Kubernetes 资源的 YAML。AnsFlow 监听 Git webhook，检测到 Commit 后自动拉取并应用配置至目标集群。</li>
                  <li><strong>漂移检测</strong>：实时对比 Git 声明状态与 Kubernetes 集群中的实际运行状态，一旦发现发生“配置漂移”，主动告警并根据策略触发自愈流水线对齐。</li>
                  <li><strong>安全 Web 终端</strong>：为运维工程师提供基于 WebTTY 的容器终端，所有键盘输入与屏幕输出均经过审计记录。</li>
                </ul>
                <DocScreenshot
                  src={gitopsImg}
                  alt="Kubernetes 集群与 GitOps 应用对齐"
                  caption="Kubernetes 集群与 GitOps 应用对齐：监听 Git 代码变更，实时捕获并纠正集群资源漂移状态。"
                />
              </section>

              {/* Module: approval_center */}
              <section id="approval" className="doc-section">
                <span className="badge">approval_center</span>
                <h1>操作审批中心</h1>
                <p>
                  `approval_center` 是 AnsFlow 的安全防火墙，旨在防止 AI 的自主修复逻辑在极少数极端场景下做出误判而引发故障。
                </p>
                <h3>双通道审核机制</h3>
                <ul>
                  <li><strong>高危动作拦截</strong>：诸如重启核心集群、大范围销毁资源或执行未经验证的临时剧本等操作，均会被拦截并挂起，自动向管理员通道发送审批申请。</li>
                  <li><strong>晋升推广信道 (Promote)</strong>：当 AI 生成的临时 Playbook 在沙箱中执行成功并经人工验证后，用户可发起 `Promote` 申请。审批通过后，该剧本转为“正式库资产”，并触发 `ai_engine` 的重新向量化构建。</li>
                </ul>
                <DocScreenshot
                  src={approvalImg}
                  alt="操作审批控制面板"
                  caption="操作审批控制面板：包含高危指令二次确认、删除操作审批以及 AI 动态生成修复方案的一键晋升发布。"
                />
              </section>

              {/* Module: config_center */}
              <section id="config" className="doc-section">
                <span className="badge">config_center</span>
                <h1>动态配置中心</h1>
                <p>
                  `config_center` 负责管理 AnsFlow 系统的底层运行参数、大模型 API 参数、邮件通知模板以及各业务模块 of 的全局变量。
                </p>
                <h3>设计与更新机制</h3>
                <ul>
                  <li><strong>多维度隔离</strong>：将配置划分为系统全局配置、租户专有配置以及单个模块的局部变量，确保互不干扰。</li>
                  <li><strong>热重载更新</strong>：基于消息队列的订阅发布机制，在后台修改并保存参数后，Celery Worker 和主应用无需重启即可实时加载并应用最新配置。</li>
                </ul>
                <DocScreenshot
                  src={backupRestoreImg}
                  alt="配置与数据库热备中心"
                  caption="配置与数据库热备中心：支持系统核心配置、大模型参数的一键备份导出与快速还原，确保故障后快速恢复。"
                />
                <h3>多渠道通知配置与事件白名单</h3>
                <p>
                  系统集成了多渠道通知推送能力，支持飞书和钉钉的机器人 Webhook 通知接入。管理员可通过图形化界面全局启用/禁用通知，配置通知接收级别（如“仅失败时通知”），或配置触发通知的具体事件类型白名单（如流水线开始/结束、审批挂起/批复、任务运行完毕等）。此外，系统支持与系统环境变量的双向兼容，确保部署期间的平滑过渡。
                </p>
                <DocScreenshot
                  src={notificationConfigImg}
                  alt="通知渠道与事件配置"
                  caption="通知配置控制台：灵活配置通知渠道开关、Webhook 机器人地址，并细粒度控制触发通知的事件类型列表。"
                />
              </section>

              {/* Module: task_management */}
              <section id="task" className="doc-section">
                <span className="badge">task_management</span>
                <h1>任务审计与执行日志</h1>
                <p>
                  `task_management` 承载平台内所有单次命令下发 (Ad-hoc) 与剧本流水线的运行历史归档。
                </p>
                <h3>系统特点</h3>
                <ul>
                  <li><strong>流水线轨迹追踪</strong>：详细记录每次 Ansible 任务的执行矩阵（包括各主机的 Changed、Failed、OK、Skipped 状态）。</li>
                  <li><strong>终端流式推送</strong>：对接后台 Django Channels，将 Ansible 原始 stdout 实时以 50ms 低延迟推送到前端模拟终端，提供丝滑的监控体验。</li>
                </ul>
                <DocScreenshot
                  src={auditImg}
                  alt="任务执行实时审计终端"
                  caption="任务执行实时审计终端：记录每一次运维任务的详细执行指标，流式推送全量 stdout 控制台日志。"
                />
              </section>

              {/* Module: system_reports */}
              <section id="report" className="doc-section">
                <span className="badge">system_reports</span>
                <h1>多维运营数据报表</h1>
                <p>
                  `system_reports` 模块为平台运维管理者和团队决策者提供全局的**“数据洞察与运营分析”**能力。本模块深度整合流水线执行历史、Ansible 剧本、安全基线合规以及告警自愈四大维度的数据指标，形成全景多维运营看板。
                </p>
                <h3>核心功能与视图</h3>
                <ul>
                  <li><strong>告警自愈多维分析</strong>：统计告警总量、未恢复告警分布，监控自愈动作触发数、成功与失败比例，实时折线图展示自愈趋势。</li>
                  <li><strong>流水线运行报表</strong>：追踪所有 DAG 流水线的运行统计（成功率、平均耗时等），分析流水线故障频率排名，精准识别高频失效节点。</li>
                  <li><strong>Ansible 运行指标</strong>：剖析剧本执行的性能矩阵、Ansible 模块的使用热力图以及被纳管的主机资源调用分布。</li>
                  <li><strong>合规性趋势监控</strong>：对主机资产进行全局安全合规评分监控，展示等保 2.0 合规比例演进历史及漏洞分布详情。</li>
                  <li><strong>一键运营数据导出</strong>：支持快速打包导出包含上述多维运行指标的 CSV 压缩数据报表，便于团队归档与周报月报分析。</li>
                </ul>
                <DocScreenshot
                  src={reportImg}
                  alt="多维运营报表控制台"
                  caption="多维运营报表控制台：深度整合告警自愈、流水线执行与主机合规的多维运维数据统计大屏，支持报表一键导出。"
                />
              </section>

              {/* Module: baseline */}
              <section id="baseline" className="doc-section">
                <span className="badge">host_management - Baseline</span>
                <h1>智能安全基线</h1>
                <p>
                  主机资产管理的安全拓展模块，实现针对主机的<strong>“安全合规检查”</strong>与<strong>“基线漂移自愈修复”</strong>。
                </p>
                <h3>核心功能</h3>
                <ul>
                  <li><strong>合规性检测</strong>：设定安全基线规则（如禁止 Root 密码远程登录、高危开放端口检查、弱密码扫描及常用软件 CVE 漏洞探测）。</li>
                  <li><strong>基线漂移回正</strong>：若检测到服务器基线不合规，系统立时发出告警，并可调用预设的安全修复剧本，自动修复漏洞以复归安全合规状态。</li>
                </ul>
                <h3>等保 2.0 三级合规标准对接</h3>
                <p>
                  智能安全基线深度契合国家网络安全等级保护 2.0（等保 2.0）三级要求。系统围绕**“身份鉴别、访问控制、安全审计、入侵防范”**四大技术维度，内置高标准合规检查项。支持通过图形化面板一键对主机环境进行全量安全审计打分，对发现的不合规项目提供一键级联修复，最大程度降低主机被非法入侵或渗透的风险，确保业务底座的安全合规。
                </p>
                <DocScreenshot
                  src={mlpsImg}
                  alt="等保2.0 安全基线控制台"
                  caption="等保2.0 安全合规基线控制台：支持按照等保 2.0 标准对所有纳管的主机资产进行自动化安全体检评分与一键漏洞加固自愈。"
                />
              </section>

              {/* Module: rbac_permission */}
              <section id="rbac" className="doc-section">
                <span className="badge">rbac_permission</span>
                <h1>多租户隔离与跨项目资产授权</h1>
                <p>
                  `rbac_permission` 全面升级，引入多工作区项目隔离（Project & ProjectMember）与安全的跨项目资产共享机制。核心资产（主机、凭据、流水线、K8s 集群、Ansible 任务、自愈策略等）默认实现基于项目的行级物理隔离，并通过 X-Project-ID 实现工作区的动态无缝切换。
                </p>
                <h3>安全隔离与共享维度</h3>
                <ul>
                  <li><strong>操作权限拦截</strong>：对前端请求和 API 路径实现细粒度的 REST 动作（GET/POST/PUT/DELETE）级别权限鉴权，基于 Redis 缓存角色与权限树。</li>
                  <li><strong>数据域Mixin过滤 (DataScopeMixin)</strong>：继承 Django 查询集，自动按当前工作区项目 ID 进行物理拦截过滤。非本项目成员绝对无法越权查询或操作该项目资产。</li>
                  <li><strong>跨项目定向共享 (ProjectAssetShare)</strong>：项目所有者可以将特定资产安全授权给其他目标项目使用，支持 <strong>只读 (read)</strong>、<strong>可引用执行 (use，可在流水线中跨项目调用但不能查看敏感密码)</strong> 和 <strong>完全控制 (full)</strong> 三级权限级别，并提供完整的操作人审计与发起方撤销防越权判定。</li>
                </ul>
                <DocScreenshot
                  src={projectMgmtImg}
                  alt="多项目与工作区管理"
                  caption="多项目与工作区管理：提供隔离的项目工作空间。用户可在 Header 顶部栏随时无缝切换项目，React Query 自动刷新关联的所有数据集。"
                />
                <DocScreenshot
                  src={assetShareImg}
                  alt="跨项目资产授权"
                  caption="跨项目资产授权弹窗：主机、凭证、流水线等 7 大资产详情列表一键触发，支持查看当前资产的所有授权，动态授权给目标项目并指定精确的权限级别。"
                />
              </section>

              {/* Module: task_pulse */}
              <section id="pulse" className="doc-section">
                <span className="badge">task_pulse</span>
                <h1>心跳健康检测</h1>
                <p>
                  `task_pulse` 是 AnsFlow 的内部监控哨兵，定期检测微服务组件及网络链路的可达性与运行状况。
                </p>
                <h3>探测机制与自动防护</h3>
                <ul>
                  <li><strong>组件探测</strong>：每隔 30 秒轮询 Celery 工作流队列是否通畅、ChromaDB 读写延迟以及大模型 API 响应时延。</li>
                  <li><strong>故障隔离与熔断</strong>：一旦发现某个后端节点响应异常，会自动在配置中心中将该节点置为“下线”状态，避免其继续接收自愈任务流，从而确保平台的整体稳定性。</li>
                </ul>
              </section>
            </>
          ) : (
            /* ========================================================
               ENGLISH DOCUMENTATION CONTENT
               ======================================================== */
            <>
              {/* Introduction & Architecture */}
              <section id="intro" className="doc-section">
                <span className="badge">System Architecture</span>
                <h1>Introduction & Architecture</h1>
                <p>
                  AnsFlow is an advanced, AI-driven <strong>declarative operations and self-healing platform</strong>. Its architectural core revolves around a "Double-Channel Closed Loop": a self-healing loop triggered by system metrics and configurations, and a reviewer optimization loop for humans to audit and promote system behaviors.
                </p>
                <p>
                  The platform consists of the frontend console, backend services, and this product documentation site. Source repositories: <a href="https://github.com/Ryeoschach/ansflow-frontend" target="_blank" rel="noreferrer">ansflow-frontend</a>, <a href="https://github.com/Ryeoschach/ansflow-backend" target="_blank" rel="noreferrer">ansflow-backend</a>. Product site and full documentation: <a href="https://ansflow.cyfee.com" target="_blank" rel="noreferrer">https://ansflow.cyfee.com</a>.
                </p>
                
                {/* Visual SVG System Topology */}
                <div className="architecture-svg-wrapper">
                  <div className="svg-header">AnsFlow Control Loop & Topology Map</div>
                  <svg className="arch-map-svg" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid-pattern-en" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.03" strokeWidth="1" />
                      </pattern>
                      <linearGradient id="gradient-blue-en" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--gradient-dag-start)" />
                        <stop offset="100%" stopColor="var(--gradient-dag-end)" />
                      </linearGradient>
                      <linearGradient id="gradient-purple-en" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--gradient-ai-start)" />
                        <stop offset="100%" stopColor="var(--gradient-ai-end)" />
                      </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern-en)" />

                    {/* Dashed animated flows */}
                    <path className="flow-pipe" d="M 180 120 L 260 120" stroke="url(#gradient-purple-en)" strokeWidth="2" strokeDasharray="6,4" />
                    <path className="flow-pipe" d="M 420 120 L 500 120" stroke="url(#gradient-blue-en)" strokeWidth="2" strokeDasharray="6,4" />
                    <path className="flow-pipe" d="M 580 170 L 580 230" stroke="var(--accent-color)" strokeWidth="2" strokeDasharray="6,4" />
                    <path className="flow-pipe" d="M 500 280 L 420 280" stroke="var(--accent-color)" strokeWidth="2" strokeDasharray="6,4" />
                    <path className="flow-pipe" d="M 260 280 L 180 280" stroke="url(#gradient-purple-en)" strokeWidth="2" strokeDasharray="6,4" />
                    <path className="flow-pipe" d="M 100 230 L 100 170" stroke="url(#gradient-purple-en)" strokeWidth="2" strokeDasharray="6,4" />

                    {/* Nodes (Boxes) */}
                    {/* Node 1: Ingestion */}
                    <g transform="translate(20, 60)">
                      <rect x="0" y="0" width="160" height="110" rx="12" className="svg-card" fill="var(--bg-secondary)" stroke="var(--border-color)" strokeWidth="1" />
                      <text x="80" y="30" textAnchor="middle" fill="var(--text-primary)" fontWeight="bold" fontSize="12">1. Event Ingestion</text>
                      <text x="80" y="55" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">AlertManager Alert</text>
                      <text x="80" y="75" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Git Commit Event</text>
                      <text x="80" y="95" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Host Baseline Drift</text>
                      <circle cx="160" cy="60" r="4" fill="var(--gradient-ai-end)" />
                    </g>

                    {/* Node 2: AI Brain */}
                    <g transform="translate(260, 60)">
                      <rect x="0" y="0" width="160" height="110" rx="12" className="svg-card glow-purple" fill="var(--bg-secondary)" stroke="var(--border-color)" strokeWidth="1.5" />
                      <text x="80" y="30" textAnchor="middle" fill="var(--text-primary)" fontWeight="bold" fontSize="12">2. AI & RAG Decider</text>
                      <text x="80" y="55" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Match historical playbooks</text>
                      <text x="80" y="75" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">LLM plans troubleshooting</text>
                      <text x="80" y="95" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Generate Playbooks</text>
                      <circle cx="0" cy="60" r="4" fill="var(--gradient-ai-start)" />
                      <circle cx="160" cy="60" r="4" fill="var(--gradient-dag-start)" />
                    </g>

                    {/* Node 3: Visual DAG */}
                    <g transform="translate(500, 60)">
                      <rect x="0" y="0" width="160" height="110" rx="12" className="svg-card glow-blue" fill="var(--bg-secondary)" stroke="var(--border-color)" strokeWidth="1.5" />
                      <text x="80" y="30" textAnchor="middle" fill="var(--text-primary)" fontWeight="bold" fontSize="12">3. DAG Orchestrator</text>
                      <text x="80" y="55" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Topological ReactFlow</text>
                      <text x="80" y="75" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">If-Else Conditional Logic</text>
                      <text x="80" y="95" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Probe Verification</text>
                      <circle cx="0" cy="60" r="4" fill="var(--gradient-dag-end)" />
                      <circle cx="80" cy="110" r="4" fill="var(--accent-color)" />
                    </g>

                    {/* Node 4: Executor */}
                    <g transform="translate(500, 230)">
                      <rect x="0" y="0" width="160" height="110" rx="12" className="svg-card" fill="var(--bg-secondary)" stroke="var(--border-color)" strokeWidth="1" />
                      <text x="80" y="30" textAnchor="middle" fill="var(--text-primary)" fontWeight="bold" fontSize="12">4. Execution Engine</text>
                      <text x="80" y="55" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Distributed Celery Queue</text>
                      <text x="80" y="75" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Isolated Ansible Runner</text>
                      <text x="80" y="95" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Ephemeral SSH Key</text>
                      <circle cx="80" cy="0" r="4" fill="var(--accent-color)" />
                      <circle cx="0" cy="50" r="4" fill="var(--accent-color)" />
                    </g>

                    {/* Node 5: Infrastructure */}
                    <g transform="translate(260, 230)">
                      <rect x="0" y="0" width="160" height="110" rx="12" className="svg-card" fill="var(--bg-secondary)" stroke="var(--border-color)" strokeWidth="1" />
                      <text x="80" y="30" textAnchor="middle" fill="var(--text-primary)" fontWeight="bold" fontSize="12">5. Infrastructure Targets</text>
                      <text x="80" y="55" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">K8s Reconciliation</text>
                      <text x="80" y="75" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Host Baseline Correction</text>
                      <text x="80" y="95" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Execution verification</text>
                      <circle cx="160" cy="50" r="4" fill="var(--accent-color)" />
                      <circle cx="0" cy="50" r="4" fill="var(--gradient-ai-end)" />
                    </g>

                    {/* Node 6: Promo Loop */}
                    <g transform="translate(20, 230)">
                      <rect x="0" y="0" width="160" height="110" rx="12" className="svg-card glow-gold" fill="var(--bg-secondary)" stroke="var(--border-color)" strokeWidth="1" />
                      <text x="80" y="30" textAnchor="middle" fill="var(--text-primary)" fontWeight="bold" fontSize="12">6. Promotion & RAG</text>
                      <text x="80" y="55" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">One-click Promote</text>
                      <text x="80" y="75" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Vectorize verified draft</text>
                      <text x="80" y="95" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Continuous loop learning</text>
                      <circle cx="160" cy="50" r="4" fill="var(--gradient-ai-start)" />
                      <circle cx="80" cy="0" r="4" fill="var(--gradient-ai-end)" />
                    </g>
                  </svg>
                </div>

                <h3>Core Tech Stack</h3>
                <div className="tech-stack-grid">
                  <div className="tech-card">
                    <h4>Presentation (Frontend)</h4>
                    <ul>
                      <li>React 18 & TypeScript</li>
                      <li>Vite Bundler</li>
                      <li>Vanilla CSS Animations</li>
                      <li>ReactFlow Pipeline visualizer</li>
                    </ul>
                  </div>
                  <div className="tech-card">
                    <h4>Core Services (Backend)</h4>
                    <ul>
                      <li>Django 5.2 (ASGI/Daphne)</li>
                      <li>Celery Distributed Queue</li>
                      <li>PostgreSQL/pgvector & Redis Broker</li>
                      <li>Isolated Ansible Runner</li>
                    </ul>
                  </div>
                  <div className="tech-card">
                    <h4>AI Matrix (AI Brain)</h4>
                    <ul>
                      <li>LangChain Agent Framework</li>
                      <li>pgvector / ChromaDB vector retrieval</li>
                      <li>FastEmbed Embeddings</li>
                      <li>DeepSeek-V3 / local Ollama</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Installation Guide */}
              <section id="install" className="doc-section">
                <span className="badge">Get Started</span>
                <h1>Installation & Deployment Guide</h1>
                <p>
                  AnsFlow offers two main deployment strategies: <strong>Docker Compose One-Click Deployment</strong> (recommended for production and evaluation), and <strong>Manual Source Code Installation</strong>.
                </p>

                <h2>Method A: Docker Compose Deployment (Recommended)</h2>
                <p>
                  The backend repository includes a <code>docker-compose.yml</code> that starts the frontend gateway, Django API, PostgreSQL/pgvector, Redis, Celery Worker/Beat, and heartbeat monitor. This guide only lists the required pieces; the repository compose file remains the source of truth.
                </p>
                <div className="step-title">1. Service Overview</div>
                <CodeBlock code={composeServicesCode} lang="text" />

                <div className="step-title">2. Set up Environment Variables (.env)</div>
                <p>Review the following key values in <code>backend/.env</code>. The default superuser is read from environment variables during first initialization, so a separate manual superuser command is not required.</p>
                <CodeBlock code={envCode} lang="env" />

                <div className="step-title">3. Launch Services</div>
                <p>Run the following commands from the backend directory:</p>
                <CodeBlock code={dockerCommandsCode} lang="bash" />

                <h2>Method B: Manual Source Code Installation</h2>
                <p>For development and local debugging. Requires Python 3.12+, Redis 7+ and PostgreSQL:</p>
                <CodeBlock code={manualInstallCode} lang="bash" />

                <div className="alert-box warning-alert">
                  <div className="alert-icon">Notice</div>
                  <div className="alert-text">
                    <strong>Critical Notices:</strong>
                    <br />
                    1. <strong>Initialization:</strong> <code>ansflow-init</code> runs migrations and static collection; system seed commands run only when <code>INIT_SYSTEM_DATA=true</code>.
                    <br />
                    2. <strong>Persistence:</strong> PostgreSQL and Redis use named volumes. Running <code>docker compose down -v</code> removes persisted data.
                    <br />
                    3. <strong>LLM API connection:</strong> Ensure backend containers have outbound internet access if using public cloud models such as DeepSeek or OpenAI.
                  </div>
                </div>
              </section>

              {/* Module: ai_engine */}
              <section id="ai-engine" className="doc-section">
                <span className="badge">ai_engine</span>
                <h1>AI Decision Engine</h1>
                <p>
                  `ai_engine` serves as the cognitive processor of AnsFlow, implemented using <strong>LangChain</strong> and <strong>FastEmbed</strong>.
                </p>
                <h3>Core Mechanics</h3>
                <ul>
                  <li><strong>RAG Incident Matching</strong>: Vectorizes incoming alerts and performs semantic searches against **ChromaDB** to retrieve historical successful troubleshooting playbook templates.</li>
                  <li><strong>Dynamic Playbook Generation</strong>: If no template matches with high confidence, the LLM analyzes metrics and parameters to generate a clean, idempotent Ansible Playbook dynamically.</li>
                  <li><strong>Sandboxed Output</strong>: Playbooks are tagged as <code>[AI_DRAFT]</code> and saved in a temporary area, preventing contamination of verified assets.</li>
                </ul>
                <DocScreenshot
                  src={modelConfigImg}
                  alt="Model & Knowledge Base Config"
                  caption="Model & Knowledge Base Console: Manage LLM integrations, prompt templates, and configure RAG vector search strategies for self-healing decisions."
                />
                <h3>Custom AI Prompt Templates</h3>
                <p>
                  AnsFlow offers customization for 7 core LLM scenarios: RAG Q&A, log diagnosis, alert analysis, DAG generation, DAG refinement, pipeline explanation, and vision OCR parser. Admins can dynamically edit templates in the configuration dashboard. The system automatically performs placeholder validation (e.g. checking for required variables like `{"{"}question{"}"}`) and features a robust fallback to static default prompts for absolute runtime safety.
                </p>
                <DocScreenshot
                  src={customPromptImg}
                  alt="Custom AI Prompt Templates"
                  caption="Custom AI Prompt Templates Console: Edit and manage prompt templates with built-in placeholder validation and one-click restore functionality."
                />
              </section>

              {/* Module: ai_chat */}
              <section id="ai-chat" className="doc-section">
                <span className="badge">ai_chat</span>
                <h1>AI Assistant Chat</h1>
                <p>
                  `ai_chat` acts as the interactive AI Copilot for SRE and DevOps engineers, translating natural language into actual operational pipelines.
                </p>
                <h3>Core Mechanics</h3>
                <ul>
                  <li><strong>Interactive Troubleshooting</strong>: Allows engineers to query system metrics, logs, and ask for immediate advice regarding active alerts.</li>
                  <li><strong>On-the-fly Playbook Generation</strong>: Users can request scripts (e.g., "Write a playbook to rotate logs") and the AI will output syntax-validated YAML, ready to be saved to drafts or pipelines.</li>
                  <li><strong>WebSocket Typewriter Streaming Response</strong>: Utilizes persistent WebSocket (Django Channels) connections to stream LLM chat texts and code output in real-time, providing immediate typewriter-style feedback and eliminating latency anxiety.</li>
                  <li><strong>Alert & Asset Awareness</strong>: Fully integrated with active alarms and inventory, providing context-aware diagnosis and one-click execution plans.</li>
                  <li><strong>Security Sandbox & Approvals</strong>: Any execution requests initiated from chat are subject to role check and sent to the Approval Center for verification.</li>
                </ul>
                <DocScreenshot
                  src={aiChatImg}
                  alt="AI Assistant Chat Interface"
                  caption="AI Assistant Chat Console: Interact with the AI copilot using natural language, generate Ansible playbooks, and trigger approved operations."
                />
              </section>

              {/* Module: sre_management */}
              <section id="sre" className="doc-section">
                <span className="badge">sre_management</span>
                <h1>SRE Alert & Self-Healing</h1>
                <p>
                  `sre_management` acts as the event receiver, exposing alert endpoints compatible with Prometheus AlertManager.
                </p>
                <h3>Workflow</h3>
                <div className="workflow-steps">
                  <div className="wf-step">
                    <span className="num">1</span>
                    <strong>Alert Ingestion:</strong> Prometheus fires an alert, pushing JSON details to AnsFlow.
                  </div>
                  <div className="wf-step">
                    <span className="num">2</span>
                    <strong>Policy Mapping:</strong> Resolves target routing tables based on labels (e.g., <code>service=nginx</code>) to check if auto-healing is enabled.
                  </div>
                  <div className="wf-step">
                    <span className="num">3</span>
                    <strong>Pipeline Triggering:</strong> Initiates the respective Directed Acyclic Graph (DAG) for troubleshooting.
                  </div>
                </div>
                <h3>Security & Circuit Breaker</h3>
                <ul>
                  <li><strong>Webhook Token Authorization</strong>: Secures alert webhook ingestion by checking customized authentication tokens, rejecting unauthorized or spoofed alert payloads.</li>
                  <li><strong>Self-Healing Circuit Breaker</strong>: Mitigates "execution storms" or infinite self-healing loops. Admins can configure maximum execution thresholds within a sliding time window (e.g., max 3 runs per 10 minutes). When triggered, it pauses further automatic execution of the policy and pushes immediate notification alerts to Slack, Feishu, or DingTalk.</li>
                </ul>
                <DocScreenshot
                  src={sreAlertsImg}
                  alt="SRE Alert Center"
                  caption="SRE Alert Center: Receive Prometheus real-time alerts and track the execution status of all self-healing pipelines in the cluster."
                />
                <DocScreenshot
                  src={sreRulesImg}
                  alt="Self-Healing Rule & Pipeline Integration"
                  caption="Self-Healing Rule & Pipeline Integration: Associate specific alert metrics and severity levels with automated operational pipelines."
                />
              </section>

              {/* Module: pipeline_management */}
              <section id="pipeline" className="doc-section">
                <span className="badge">pipeline_management</span>
                <h1>Visual DAG Pipeline Orchestrator</h1>
                <p>
                  `pipeline_management` handles workflow definitions, allowing operators to coordinate complex operations on ReactFlow canvas.
                </p>
                <h3>Execution Details</h3>
                <ul>
                  <li><strong>DAG Topology</strong>: Executes sequential or parallel steps (e.g. Probing, Manual Approval, Ansible Playbook Execution, Health Checks).</li>
                  <li><strong>Conditional Routing</strong>: Redirects downstream routes based on upper-node exit codes or structured JSON outputs.</li>
                  <li><strong>Realtime WebSockets</strong>: Uses Django Channels to stream task status updates and stdout logs straight to client terminals.</li>
                </ul>
                <DocScreenshot
                  src={pipelineEditImg}
                  alt="Visual Pipeline Editor"
                  caption="Visual Pipeline Editor: ReactFlow-based DAG canvas supporting step drag-and-drop, conditional branching, and node health check configuration."
                />
                <DocScreenshot
                  src={aiDiagnosisImg}
                  alt="AI Diagnostic & Pipeline Auto-Generation"
                  caption="AI Diagnostic & Pipeline Auto-Generation: After analyzing the root cause, the AI automatically generates and recommends a remediation pipeline draft for manual confirmation."
                />
              </section>

              {/* Module: host_management */}
              <section id="host" className="doc-section">
                <span className="badge">host_management</span>
                <h1>Host Assets & SSH Credentials</h1>
                <p>
                  `host_management` catalogs target hosts and manages SSH access, supporting Ansible engines.
                </p>
                <h3>Security Features</h3>
                <ul>
                  <li><strong>Encrypted Credentials</strong>: Encrypts private SSH keys and passwords with AES-256 before postgres insertion.</li>
                  <li><strong>Automated Key Distribution</strong>: Offers one-click public key copying for passwordless setups.</li>
                  <li><strong>Command Auditing</strong>: Logs all SSH commands and outputs for security compliance.</li>
                </ul>
                <DocScreenshot
                  src={ansibleTemplateImg}
                  alt="Host Operations & Ansible Template Hub"
                  caption="Host Operations & Ansible Template Hub: Multi-version Ansible script editing, centralized execution, and parameter safety checks."
                />
              </section>

              {/* Module: k8s_management */}
              <section id="k8s" className="doc-section">
                <span className="badge">k8s_management</span>
                <h1>Kubernetes & GitOps Reconciliation</h1>
                <p>
                  `k8s_management` manages K8s clusters, logs, container terminals, and the **declarative GitOps reconciliation loop**.
                </p>
                <h3>GitOps Loop</h3>
                <ul>
                  <li><strong>Declarative Sync</strong>: Connects to Git repos. On webhook commit events, it parses YAML manifests and updates K8s configurations to align target cluster states.</li>
                  <li><strong>Drift Recovery</strong>: Periodically compares cluster specs with Git repo values, triggering self-healing pipelines when drift occurs.</li>
                  <li><strong>Remote Terminal</strong>: Hosts container WebTTY sessions, fully logged and audited.</li>
                </ul>
                <DocScreenshot
                  src={gitopsImg}
                  alt="Kubernetes Cluster & GitOps Application Alignment"
                  caption="Kubernetes Cluster & GitOps Application Alignment: Monitor Git commit changes, detect, and automatically reconcile cluster resource drift."
                />
              </section>

              {/* Module: approval_center */}
              <section id="approval" className="doc-section">
                <span className="badge">approval_center</span>
                <h1>Action Approval Center</h1>
                <p>
                  `approval_center` acts as an inspection gateway, safeguarding infrastructure against unintended automated commands.
                </p>
                <h3>Key Features</h3>
                <ul>
                  <li><strong>Execution Interception</strong>: High-risk operations (e.g. major service restarts, resource deletions) and new AI-generated playbooks are paused, pending administrator approval.</li>
                  <li><strong>Promote Channel</strong>: Once an AI playbook (draft) is verified, administrators can "Promote" it to the stable manual asset zone, which also triggers Vector DB re-indexing.</li>
                </ul>
                <DocScreenshot
                  src={approvalImg}
                  alt="Action Approval Console"
                  caption="Action Approval Console: Features high-risk command confirmation, delete approvals, and one-click promotion of AI-generated recovery plans."
                />
              </section>

              {/* Module: config_center */}
              <section id="config" className="doc-section">
                <span className="badge">config_center</span>
                <h1>Configuration Management</h1>
                <p>
                  `config_center` maintains global settings, email alert templates, and key-value parameters.
                </p>
                <h3>Design Highlights</h3>
                <ul>
                  <li><strong>Scope Isolation</strong>: Segregates variables into Platform, Tenant, and Module scopes.</li>
                  <li><strong>Hot Reload</strong>: On change, notification signals are sent to Celery and API executors, refreshing configuration values instantly without downtime.</li>
                </ul>
                <DocScreenshot
                  src={backupRestoreImg}
                  alt="Config & Database Backup Center"
                  caption="Config & Database Backup Center: One-click backup, export, and quick restore of system settings and model parameters for disaster recovery."
                />
                <h3>Multi-Channel Notification & Event Whitelist</h3>
                <p>
                  The system integrates multi-channel alerting capabilities, supporting Feishu and DingTalk Webhook bot integrations. Administrators can toggle notifications globally, configure the minimum alerting level (e.g. "Only notify on errors"), and whitelist specific events (e.g. pipeline start/end, approval pending/resolved, task completion). It also fallback to environment variables (`.env`) gracefully to ensure a smooth deployment transition.
                </p>
                <DocScreenshot
                  src={notificationConfigImg}
                  alt="Notification Channels & Events Config"
                  caption="Notification Config Console: Configure Webhook bot URLs, toggle notification channels, and manage whitelist event lists."
                />
              </section>

              {/* Module: task_management */}
              <section id="task" className="doc-section">
                <span className="badge">task_management</span>
                <h1>Task Logs & Audits</h1>
                <p>
                  `task_management` records all Ansible executions, ad-hoc commands, and history charts.
                </p>
                <h3>Capabilities</h3>
                <ul>
                  <li><strong>Ansible Metrics</strong>: Index execution matrices (changed, failed, ok, skipped hosts).</li>
                  <li><strong>Log Streaming</strong>: Delivers raw SSH task console prints to the UI with less than 50ms latency.</li>
                </ul>
                <DocScreenshot
                  src={auditImg}
                  alt="Task Audit & Live Streaming Terminal"
                  caption="Task Audit & Live Streaming Terminal: Logs detailed execution metrics for every operational task and streams raw stdout logs in real-time."
                />
              </section>

              {/* Module: system_reports */}
              <section id="report" className="doc-section">
                <span className="badge">system_reports</span>
                <h1>Multi-Dimensional Operational Reports</h1>
                <p>
                  The `system_reports` module equips managers and engineering leads with complete **data insights and operations analysis** tools. By correlating metrics from visual DAG pipelines, Ansible playbooks, security audits, and self-healing systems, it delivers a comprehensive operations analytics dashboard.
                </p>
                <h3>Report Modules Included</h3>
                <ul>
                  <li><strong>Alert & Self-Healing Dashboard</strong>: Aggregates global alert numbers, healing trigger counts, success rates, and interactive time-series charts.</li>
                  <li><strong>DAG Pipeline Analytics</strong>: Measures execution frequency, failure rates, run time charts, and failure-frequency leaderboards to identify bottleneck nodes.</li>
                  <li><strong>Ansible Playbook Stats</strong>: Dissects execution performance, module usage statistics, and task distribution across active host servers.</li>
                  <li><strong>Compliance & Safety Metrics</strong>: Monitors average security scores, vulnerability distributions, and compliance trend curves aligned with cybersecurity regulations.</li>
                  <li><strong>One-Click CSV Report Package Export</strong>: Allows bundling and downloading multi-dimensional CSV spreadsheets for technical archive and operational reporting.</li>
                </ul>
                <DocScreenshot
                  src={reportImg}
                  alt="Multi-Dimensional Operational Reports Console"
                  caption="Multi-Dimensional Operational Reports Console: Gathers stats on self-healing performance, pipeline logs, and safety audits with built-in export functionality."
                />
              </section>

              {/* Module: baseline */}
              <section id="baseline" className="doc-section">
                <span className="badge">host_management - Baseline</span>
                <h1>Security Compliance Baseline</h1>
                <p>
                  An extension of host management that runs automated compliance checks and remediations.
                </p>
                <h3>Compliance Cycle</h3>
                <ul>
                  <li><strong>Security Audits</strong>: Scans SSH config, firewall rules, user passwords, and vulnerability CVE records.</li>
                  <li><strong>Drift Remediation</strong>: If a server becomes non-compliant, an alert is triggered, and a remedial Ansible script is executed to restore baseline states.</li>
                </ul>
                <h3>MLPS 2.0 Level 3 Compliance Auditing</h3>
                <p>
                  The Security Compliance Baseline aligns with China's National Cyber Security Class Protection Level 3 (MLPS 2.0) standards. It covers key technical dimensions: **Identity Authentication, Access Control, Security Audit, and Intrusion Prevention**. Users can run full automated safety checks, view compliance score dashboards, and trigger one-click cascade remediation plans to minimize penetration risks.
                </p>
                <DocScreenshot
                  src={mlpsImg}
                  alt="MLPS 2.0 Compliance Baseline Dashboard"
                  caption="MLPS 2.0 Compliance Baseline Console: Automated audits, security scoring, and self-healing vulnerability patches for all managed host assets."
                />
              </section>

              {/* Module: rbac_permission */}
              <section id="rbac" className="doc-section">
                <span className="badge">rbac_permission</span>
                <h1>Project Multi-Tenancy & Cross-Project Asset Sharing</h1>
                <p>
                  `rbac_permission` is upgraded to support multi-workspace/project tenancy (`Project` & `ProjectMember`) and secure cross-project asset sharing. Core assets (Hosts, Credentials, Pipelines, K8s Clusters, Ansible Tasks, SRE Policies) are isolated at the database layer and resolved dynamically via the `X-Project-ID` request header.
                </p>
                <h3>Architecture & Features</h3>
                <ul>
                  <li><strong>Action-level Enforcement</strong>: Restricts specific REST actions (GET/POST/PUT/DELETE) on API paths, cached via Redis for maximum performance.</li>
                  <li><strong>DataScopeMixin Filtering</strong>: Automatically filters Django ORM QuerySets based on active project IDs, preventing unauthorized access across workspace boundaries.</li>
                  <li><strong>Cross-Project Asset Sharing (ProjectAssetShare)</strong>: Project owners can securely authorize specific resources to target projects under three permission levels: <strong>read</strong> (read-only), <strong>use</strong> (reference/execute in pipelines without exposing passwords), and <strong>full</strong> (complete control), backed by operations auditing and origin-restricted revocation.</li>
                </ul>
                <DocScreenshot
                  src={projectMgmtImg}
                  alt="Multi-Project & Workspace Management"
                  caption="Multi-project and workspace management: Select and switch workspaces from the Header dropdown, which triggers automatic cache invalidation and UI updates."
                />
                <DocScreenshot
                  src={assetShareImg}
                  alt="Cross-Project Asset Sharing"
                  caption="Cross-project asset sharing: Triggered on hosts, credentials, or pipelines, allowing owners to view existing authorizations and dynamically share resources with designated permission levels."
                />
              </section>

              {/* Module: task_pulse */}
              <section id="pulse" className="doc-section">
                <span className="badge">task_pulse</span>
                <h1>Pulse System Health Checks</h1>
                <p>
                  `task_pulse` monitors internal server states and microservice connectivity periodically.
                </p>
                <h3>Health Checks</h3>
                <ul>
                  <li><strong>System Checks</strong>: pings Celery workers, checks ChromaDB socket reads, and records LLM API latency every 30 seconds.</li>
                  <li><strong>Self-Recovery</strong>: Offlines unhealthy worker nodes in configuration centers, notifying admins when failure is persistent.</li>
                </ul>
              </section>
            </>
          )}

          {/* Simple compact footer for docs page */}
          <footer className="docs-inner-footer">
            <div className="docs-inner-footer-line"></div>
            <div className="docs-inner-footer-content">
              <p>© {new Date().getFullYear()} AnsFlow. {language === 'zh' ? '保留所有权利。' : 'All rights reserved.'}</p>
              <div className="docs-inner-footer-links">
                <a href="#features" onClick={(e) => { e.preventDefault(); setView('home'); setTimeout(() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>
                  {language === 'zh' ? '功能特性' : 'Features'}
                </a>
                <a href="#demo" onClick={(e) => { e.preventDefault(); setView('home'); setTimeout(() => document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>
                  {language === 'zh' ? '在线体验' : 'Demo'}
                </a>
                <a href="#architecture" onClick={(e) => { e.preventDefault(); setView('home'); setTimeout(() => document.querySelector('#architecture')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>
                  {language === 'zh' ? '系统架构' : 'Architecture'}
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>

      <style>{`
        /* --- Docs Layout System --- */
        .docs-page {
          padding-top: 80px;
          padding-bottom: 80px;
        }

        .docs-layout {
          display: flex;
          gap: 40px;
          position: relative;
          align-items: flex-start;
        }

        /* --- Sidebar Navigation --- */
        .docs-sidebar {
          width: 280px;
          flex-shrink: 0;
          position: sticky;
          top: 94px;
          height: calc(100vh - 120px);
          overflow-y: auto;
          padding: 24px;
          border-radius: 20px;
          border: 1px solid var(--border-color);
          box-shadow: var(--card-shadow);
        }

        /* --- Docs Inner Footer --- */
        .docs-inner-footer {
          margin-top: 60px;
          padding-bottom: 40px;
        }

        .docs-inner-footer-line {
          height: 1px;
          background-color: var(--border-color);
          margin-bottom: 20px;
          width: 100%;
        }

        .docs-inner-footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--text-tertiary);
          font-size: 0.85rem;
        }

        .docs-inner-footer-links {
          display: flex;
          gap: 20px;
        }

        .docs-inner-footer-links a {
          color: var(--text-secondary);
          text-decoration: none;
          transition: var(--transition-smooth);
        }

        .docs-inner-footer-links a:hover {
          color: var(--accent-color);
        }

        @media (max-width: 576px) {
          .docs-inner-footer-content {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
        }

        @media (min-width: 993px) {
          /* Lock body scrolling when docs are displayed */
          body:has(.docs-page) {
            overflow: hidden !important;
          }

          body:has(.docs-page) .footer {
            display: none !important;
          }

          .docs-page {
            padding-top: 88px;
            padding-bottom: 24px;
            height: 100vh;
            box-sizing: border-box;
          }

          .docs-layout {
            height: 100%;
            align-items: stretch;
            overflow: hidden;
            gap: 40px;
          }

          .docs-sidebar {
            height: 100%;
            position: relative;
            top: 0;
            box-sizing: border-box;
          }

          .docs-content {
            height: 100%;
            overflow-y: auto;
            padding-right: 16px;
            box-sizing: border-box;
            /* Scrollbar styling */
            scrollbar-width: thin;
            scrollbar-color: var(--border-color) transparent;
          }

          .docs-content::-webkit-scrollbar {
            width: 6px;
          }

          .docs-content::-webkit-scrollbar-track {
            background: transparent;
          }

          .docs-content::-webkit-scrollbar-thumb {
            background-color: var(--border-color);
            border-radius: 3px;
          }
        }

        .sidebar-title {
          font-family: var(--font-title);
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 20px;
          color: var(--text-primary);
          letter-spacing: -0.01em;
          text-transform: uppercase;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .sidebar-link {
          text-decoration: none;
          color: var(--text-secondary);
          font-size: 0.9rem;
          padding: 10px 14px;
          border-radius: 10px;
          font-weight: 500;
          transition: var(--transition-smooth);
          border-left: 2px solid transparent;
        }

        .sidebar-link:hover {
          color: var(--text-primary);
          background-color: var(--bg-secondary);
        }

        .sidebar-link.active {
          color: var(--accent-color);
          background-color: var(--accent-glow);
          border-left-color: var(--accent-color);
          font-weight: 600;
        }

        /* --- Main Content --- */
        .docs-content {
          flex: 1;
          min-width: 0; /* Avoid flex overflow with pre */
          display: flex;
          flex-direction: column;
          gap: 80px;
        }

        .doc-section {
          scroll-margin-top: 94px; /* Offset for smooth scroll */
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 60px;
        }

        .doc-section:last-child {
          border-bottom: none;
        }

        .doc-section h1 {
          font-size: 2.25rem;
          font-weight: 800;
          margin-top: 12px;
          margin-bottom: 20px;
          letter-spacing: -0.03em;
        }

        .doc-section h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 40px;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .doc-section h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-top: 24px;
          margin-bottom: 12px;
        }

        .doc-section p {
          font-size: 1.05rem;
          color: var(--text-secondary);
          margin-bottom: 20px;
          line-height: 1.7;
        }

        .doc-section p strong {
          color: var(--text-primary);
        }

        .doc-section ul, .doc-section ol {
          margin-left: 24px;
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .doc-section li {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .doc-section li strong {
          color: var(--text-primary);
        }

        .badge {
          display: inline-flex;
          align-items: center;
          padding: 6px 14px;
          border-radius: 99px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background-color: var(--bg-secondary);
          color: var(--accent-color);
          border: 1px solid var(--border-color);
        }

        /* --- Tech Stack Grid --- */
        .tech-stack-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }

        .tech-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          padding: 20px;
          transition: var(--transition-smooth);
        }

        .tech-card:hover {
          border-color: var(--accent-color);
          transform: translateY(-2px);
        }

        .tech-card h4 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 14px;
          color: var(--text-primary);
        }

        .tech-card ul {
          margin-left: 16px;
          margin-bottom: 0;
          gap: 6px;
        }

        .tech-card li {
          font-size: 0.88rem;
        }

        /* --- SVG Topology Wrapper --- */
        .architecture-svg-wrapper {
          border: 1px solid var(--border-color);
          border-radius: 20px;
          background-color: var(--bg-secondary);
          padding: 24px;
          margin: 32px 0;
          overflow: hidden;
          box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.02);
        }

        html.dark .architecture-svg-wrapper {
          background-color: #08080a;
          box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.5);
        }

        .svg-header {
          font-family: var(--font-title);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 16px;
          text-align: center;
        }

        .arch-map-svg {
          width: 100%;
          height: auto;
          display: block;
        }

        .svg-card {
          transition: var(--transition-smooth);
        }

        .svg-card:hover {
          fill: var(--bg-primary);
          stroke-width: 1.5;
        }

        .glow-purple {
          stroke: var(--gradient-ai-start);
          filter: drop-shadow(0 0 8px rgba(144, 70, 231, 0.15));
        }

        .glow-blue {
          stroke: var(--gradient-dag-start);
          filter: drop-shadow(0 0 8px rgba(50, 145, 255, 0.15));
        }

        .glow-gold {
          stroke: var(--gradient-gold-start);
        }

        /* Animated Pipes */
        .flow-pipe {
          stroke-dashoffset: 100;
          animation: flowStroke 12s linear infinite;
        }

        @keyframes flowStroke {
          to {
            stroke-dashoffset: 0;
          }
        }

        /* --- Code Block Wrapper --- */
        .code-block-wrapper {
          margin: 20px 0 32px 0;
          border-radius: 16px;
          overflow: hidden;
          background-color: var(--terminal-bg);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .code-block-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          background-color: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .code-lang {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-tertiary);
          text-transform: uppercase;
        }

        .copy-btn {
          background: none;
          border: none;
          color: var(--text-tertiary);
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 6px 12px;
          border-radius: 6px;
          transition: var(--transition-smooth);
        }

        .copy-btn:hover {
          background-color: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }

        .code-block-wrapper pre {
          margin: 0;
          padding: 20px;
          overflow-x: auto;
        }

        .code-block-wrapper code {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--terminal-text);
        }

        .step-title {
          font-weight: 700;
          font-size: 1.1rem;
          margin-top: 24px;
          margin-bottom: 10px;
          color: var(--text-primary);
        }

        /* --- Alert Box --- */
        .alert-box {
          display: flex;
          gap: 16px;
          padding: 24px;
          border-radius: 16px;
          margin: 32px 0;
        }

        .warning-alert {
          background-color: rgba(245, 158, 11, 0.06);
          border: 1px solid rgba(245, 158, 11, 0.2);
        }

        .alert-icon {
          font-size: 1.5rem;
          line-height: 1;
        }

        .alert-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* --- SRE Workflow Steps --- */
        .workflow-steps {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 24px 0;
        }

        .wf-step {
          display: flex;
          align-items: center;
          gap: 16px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: 16px 20px;
          border-radius: 12px;
        }

        .wf-step .num {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          background-color: var(--accent-color);
          color: white;
          border-radius: 50%;
          font-size: 0.85rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .wf-step strong {
          color: var(--text-primary);
          margin-right: 8px;
        }

        /* --- Documentation Image styles --- */
        .doc-image-wrapper {
          margin: 28px 0;
          max-width: 720px;
          width: 100%;
        }

        .doc-image-inner {
          position: relative;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          overflow: hidden;
          box-shadow: var(--card-shadow);
          cursor: zoom-in;
          transition: var(--transition-smooth);
          background-color: var(--bg-secondary);
        }

        .doc-image-inner:hover {
          transform: translateY(-2px);
          box-shadow: var(--card-hover-shadow);
          border-color: var(--border-glow);
        }

        .doc-img {
          display: block;
          width: 100%;
          height: auto;
          transition: transform 0.3s ease;
        }

        .doc-image-inner:hover .doc-img {
          transform: scale(1.01);
        }

        .doc-img-zoom-hover {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .doc-image-inner:hover .doc-img-zoom-hover {
          opacity: 1;
        }

        .doc-img-zoom-hover svg {
          color: #ffffff;
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
          transform: scale(0.9);
          transition: transform 0.25s ease;
        }

        .doc-image-inner:hover .doc-img-zoom-hover svg {
          transform: scale(1);
        }

        .doc-img-caption {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 10px;
          font-size: 0.85rem;
          color: var(--text-tertiary);
          padding-left: 4px;
        }

        .caption-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--accent-color);
          display: inline-block;
        }

        /* --- Image Lightbox Modal --- */
        .img-lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(10, 10, 12, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 10000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          cursor: zoom-out;
          opacity: 0;
          animation: lightboxFadeIn 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }

        @keyframes lightboxFadeIn {
          to {
            opacity: 1;
          }
        }

        .img-lightbox-content {
          max-width: 90vw;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 16px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: default;
          transform: scale(0.95);
          animation: lightboxImgScale 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }

        @keyframes lightboxImgScale {
          to {
            transform: scale(1);
          }
        }

        .img-lightbox-close {
          position: absolute;
          top: 30px;
          right: 30px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          font-size: 24px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-smooth);
          z-index: 10001;
        }

        .img-lightbox-close:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
        }

        .img-lightbox-caption {
          margin-top: 20px;
          color: #ffffff;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 500;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          background: rgba(0, 0, 0, 0.4);
          padding: 8px 16px;
          border-radius: 20px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          pointer-events: none;
          max-width: 600px;
          text-align: center;
        }

        /* --- Responsive Styles --- */
        @media (max-width: 992px) {
          .docs-layout {
            flex-direction: column;
          }

          .docs-sidebar {
            width: 100%;
            height: auto;
            position: sticky;
            top: 64px;
            z-index: 100;
            margin-bottom: 30px;
            padding: 12px 16px;
            border-radius: 12px;
            border: 1px solid var(--border-color);
            background-color: var(--header-bg);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }

          .sidebar-title {
            display: none;
          }
          
          .sidebar-nav {
            flex-direction: row;
            overflow-x: auto;
            white-space: nowrap;
            gap: 8px;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .sidebar-nav::-webkit-scrollbar {
            display: none;
          }
          
          .sidebar-link {
            flex-shrink: 0;
            padding: 6px 12px;
            border-left: none;
            border-bottom: 2px solid transparent;
          }
          
          .sidebar-link.active {
            border-left-color: transparent;
            border-bottom-color: var(--accent-color);
          }
        }
      `}</style>

      {zoomedImage && (
        <div className="img-lightbox-overlay" onClick={() => setZoomedImage(null)}>
          <button className="img-lightbox-close" onClick={() => setZoomedImage(null)}>&times;</button>
          <img src={zoomedImage.src} alt={zoomedImage.alt} className="img-lightbox-content" onClick={(e) => e.stopPropagation()} />
          {zoomedImage.alt && <div className="img-lightbox-caption">{zoomedImage.alt}</div>}
        </div>
      )}
    </div>
    </DocZoomContext.Provider>
  );
};

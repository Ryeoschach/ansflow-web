export interface TranslationSchema {
  // Navigation
  navFeatures: string;
  navDemo: string;
  navArchitecture: string;
  navGetStarted: string;
  navDocs: string;

  // Hero Section
  heroPreTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPrimaryBtn: string;
  heroSecondaryBtn: string;
  heroStatusActive: string;

  // Features Section
  featuresTitle: string;
  featuresSubtitle: string;
  
  feat1Title: string;
  feat1Desc: string;
  feat2Title: string;
  feat2Desc: string;
  feat3Title: string;
  feat3Desc: string;
  feat4Title: string;
  feat4Desc: string;
  feat5Title: string;
  feat5Desc: string;
  feat6Title: string;
  feat6Desc: string;
  feat7Title: string;
  feat7Desc: string;
  feat8Title: string;
  feat8Desc: string;
  feat9Title: string;
  feat9Desc: string;
  feat10Title: string;
  feat10Desc: string;
  feat11Title: string;
  feat11Desc: string;


  // Interactive Demo Section
  demoTitle: string;
  demoSubtitle: string;
  demoBtnSimulate: string;
  demoBtnReset: string;
  demoStatusIdle: string;
  demoStatusAlert: string;
  demoStatusAI: string;
  demoStatusDAG: string;
  demoStatusExecution: string;
  demoStatusSuccess: string;

  // DAG Nodes Names
  nodeAlert: string;
  nodeAI: string;
  nodeDAG: string;
  nodeExecute: string;
  nodeRecover: string;

  // Footer Section
  footerSlogan: string;
  footerProduct: string;
  footerResources: string;
  footerCompany: string;
  footerRights: string;

  // Architecture Section
  archTitle: string;
  archSubtitle: string;
  archTabFlow: string;
  archTabTech: string;
  archLayerIngestion: string;
  archLayerIngestionDesc: string;
  archLayerAI: string;
  archLayerAIDesc: string;
  archLayerOrch: string;
  archLayerOrchDesc: string;
  archLayerExec: string;
  archLayerExecDesc: string;
  archLayerNode: string;
  archLayerNodeDesc: string;
  
  // Tech Stack Architecture keys
  archTechClientPortal: string;
  archTechClientPortalDesc: string;
  archTechAppGateway: string;
  archTechAppGatewayDesc: string;
  archTechWorkerRunner: string;
  archTechWorkerRunnerDesc: string;
  archTechAIBrain: string;
  archTechAIBrainDesc: string;
  archTechDbStorage: string;
  archTechDbStorageDesc: string;
}

export const translations: Record<'zh' | 'en', TranslationSchema> = {
  zh: {
    navFeatures: '核心特性',
    navDemo: '自愈模拟',
    navArchitecture: '系统架构',
    navGetStarted: '开始体验',
    navDocs: '说明文档',

    heroPreTitle: '下一代智能运维大脑',
    heroTitle: '让自愈流水线，\n像水流般自然顺畅。',
    heroSubtitle: 'AnsFlow 融合 LLM 研判、RAG 知识召回与可视化 DAG 编排。遭遇故障时，AI 自动生成自愈剧本与级联流水线，彻底释放运维生产力。',
    heroPrimaryBtn: '立即开始',
    heroSecondaryBtn: '了解技术细节',
    heroStatusActive: '已成功上线 · 运行中',

    featuresTitle: '重新定义自动化运维',
    featuresSubtitle: '四大核心能力深度咬合，为您的基础设施提供全天候的自愈保障。',
    
    feat1Title: 'AI 自愈决策引擎',
    feat1Desc: '自动接收告警并进行根因研判。无需人工干预，AI 自主设计排障思路并生成精准的自愈方案。',
    
    feat2Title: '可视化 DAG 流程编排',
    feat2Desc: '基于 ReactFlow 构建的节点流编辑器。支持条件分支、级联调度和实时执行拓扑展示。',
    
    feat3Title: '资产分区与一键 Promote',
    feat3Desc: 'AI 生成的临时剧本与人工成熟资产逻辑隔离。经过人工审核并一键转正（Promote）后，优雅进入人工资产区。',
    
    feat4Title: '知识库 RAG 向量闭环',
    feat4Desc: '已转正的成熟模板自动转化为向量索引。当下一次类似告警触发时，AI 将自动检索复用，拒绝冗余生成。',

    feat5Title: '云原生 GitOps 声明式同步',
    feat5Desc: '声明式定义基础设施与应用状态。自动监听 Git 仓库变更，驱动 Kubernetes 资源拉齐与部署同步，防止环境配置漂移。',

    feat6Title: '主机安全基线与定时自愈',
    feat6Desc: '定时巡检主机安全合规性。一旦检测到配置漂移或漏洞，AI 自动触发巡检与修复剧本，自动修复漏洞以维持基线合规。',

    feat7Title: '等保 2.0 合规三级基线',
    feat7Desc: '内置等保 2.0 三级标准安全合规检查。提供身份鉴别、访问控制、安全审计及入侵防范等维度的全量体检与漏洞一键自愈。',

    feat8Title: 'AI 提示词模板自定义',
    feat8Desc: '支持自定义 7 大核心场景的 LLM 提示词模板。内置变量占位符安全完整性校验，并提供安全容错回退机制与一键还原。',

    feat9Title: '多渠道通知与事件白名单',
    feat9Desc: '灵活对接飞书与钉钉机器人告警通道。支持在配置中心全局控制以及针对流水线、审批、任务等细粒度事件白名单推送过滤。',

    feat10Title: '多工作区项目物理隔离',
    feat10Desc: '引入项目与工作区成员（Project & ProjectMember）机制。对主机、凭证、流水线等核心资产在操作和数据层面实现行级租户隔离，全面拦截越权读写。',

    feat11Title: '跨项目资产安全共享',
    feat11Desc: '主机、凭据、流水线等核心资产支持一键跨项目授权共享。支持只读(read)、可引用执行(use)和完全控制(full)三级粒度，随时可安全撤回。',


    demoTitle: '实时交互式自愈演示',
    demoSubtitle: '亲手触发一次系统故障，看看 AnsFlow 的 AI 决策大脑是如何在数秒内恢复服务的。',
    demoBtnSimulate: '模拟故障降临',
    demoBtnReset: '重置模拟',
    demoStatusIdle: '等待模拟开启...',
    demoStatusAlert: '检测到告警：系统检测到 Web 服务 CPU 负载持续大于 95%',
    demoStatusAI: 'AI 研判中：根据告警特征，通过 RAG 向量检索召回已有“重启 Nginx 剧本 (ID 45)”',
    demoStatusDAG: 'DAG 生成中：AI 动态组装包含 [故障研判 -> 验证 -> 剧本执行 -> 回执校验] 的自愈流水线',
    demoStatusExecution: '流水线运行中：正在执行 Ansible 剧本，连接目标节点...',
    demoStatusSuccess: '自愈成功：Web 服务响应恢复正常 (200 OK)，系统返回健康状态',

    nodeAlert: '告警注入',
    nodeAI: 'AI 研判 (RAG)',
    nodeDAG: 'DAG 组装',
    nodeExecute: '剧本执行',
    nodeRecover: '恢复健康',

    footerSlogan: '结合 AI 力量的智能 Ansible 编排与自愈平台。',
    footerProduct: '产品',
    footerResources: '资源',
    footerCompany: '公司',
    footerRights: '© 2026 AnsFlow. 保留所有权利。',

    archTitle: '闭环自愈系统架构',
    archSubtitle: '支持从业务自愈流程到系统底座架构的深度剖析。',
    archTabFlow: '业务自愈流',
    archTabTech: '系统技术架构',
    archLayerIngestion: '1. 告警注入与 Git 监听',
    archLayerIngestionDesc: '实时监听 Prometheus 告警，捕获 Git 仓库变更触发 GitOps 声明式同步，并接收主机安全基线漂移事件。',
    archLayerAI: '2. AI 根因研判与 RAG',
    archLayerAIDesc: '结合 LLM 与语义向量检索，调取最佳排障实践，确定智能自愈剧本。',
    archLayerOrch: '3. 动态 DAG 任务编排',
    archLayerOrchDesc: '动态组装前置探针、自愈执行节点和回执审计，生成逻辑闭环的工作流拓扑。',
    archLayerExec: '4. Ansible 自愈运行引擎',
    archLayerExecDesc: '利用安全隔离凭证执行 Playbook，并通过一键 Promote 促进成熟资源流动。',
    archLayerNode: '5. 目标节点与合规自愈',
    archLayerNodeDesc: '混合云服务器与 Kubernetes 容器集群，集成安全合规巡检与配置漂移定时自愈。',
    
    // Tech Stack Architecture translations
    archTechClientPortal: '1. 用户与展示层 (React Portal)',
    archTechClientPortalDesc: '前端基于 React 18 + Ant Design 6 + Tailwind CSS v4 构建，提供高响应度的可视化 DAG 编排与自愈状态监控大屏。',
    archTechAppGateway: '2. 应用服务与网关核心 (Django REST)',
    archTechAppGatewayDesc: '核心基于 Django 5.2 + DRF 实现，集成 SmartRBAC 权限控制，统一管理自愈流水线、GitOps 配置流及主机安全合规基线。',
    archTechWorkerRunner: '3. 异步任务与执行引擎 (Celery & Ansible)',
    archTechWorkerRunnerDesc: '采用 Celery + Redis 分布式任务分发。调用隔离的 Ansible Runner 驱动 Kubernetes 状态拉齐与主机基线漏洞修复。',
    archTechAIBrain: '4. AI 决策中心与 RAG 检索 (LangChain)',
    archTechAIBrainDesc: '基于 LangChain 编排大语言模型 (DeepSeek/OpenAI/Ollama)。当告警发生时，在 ChromaDB 向量库中进行相似故障排障方案检索。',
    archTechDbStorage: '5. 多样性数据存储与缓存 (Data Matrix)',
    archTechDbStorageDesc: 'PostgreSQL / SQLite 存储核心配置与运行历史；Redis 承载缓存与队列 Broker；ChromaDB 存储向量化运维知识及 RAG 索引。',
  },
  en: {
    navFeatures: 'Features',
    navDemo: 'Live Demo',
    navArchitecture: 'Architecture',
    navGetStarted: 'Get Started',
    navDocs: 'Docs',

    heroPreTitle: 'NEXT-GEN AIOPS PLATFORM',
    heroTitle: 'Auto-healing pipelines, \nas fluid as flow.',
    heroSubtitle: 'AnsFlow integrates LLM decisions, RAG lookup, and visual DAG editing. Upon alerts, AI dynamically generates scripts and execution paths to heal your service instantly.',
    heroPrimaryBtn: 'Start Free Trial',
    heroSecondaryBtn: 'Read Whitepaper',
    heroStatusActive: 'Active & Protecting Infrastructure',

    featuresTitle: 'Redefining DevOps Automation',
    featuresSubtitle: 'Four core pillars working together to shield your system from downtimes round the clock.',
    
    feat1Title: 'AI Self-Healing Engine',
    feat1Desc: 'Automatically digests alerts, assesses root causes, and designs precise step-by-step healing blueprints without human intervention.',
    
    feat2Title: 'Visual DAG Orchestration',
    feat2Desc: 'ReactFlow-powered topological pipeline editor. Build complex conditional logic and inspect real-time execution flows.',
    
    feat3Title: 'Isolated Assets & Promote Channel',
    feat3Desc: 'Separates AI raw drafts from stable production assets. Review and promote verified templates to production with one click.',
    
    feat4Title: 'Continuous RAG Loop',
    feat4Desc: 'Promoted templates are instantly vectorized into knowledge bases. AI recalls them for future incident decisions to avoid duplicate code.',

    feat5Title: 'Cloud-Native GitOps Sync',
    feat5Desc: 'Declaratively define infrastructure and application states. Automatically reconciles Git repo updates with active Kubernetes resources to prevent drift.',

    feat6Title: 'Host Baseline Compliance',
    feat6Desc: 'Continuous host compliance checks. If any configuration drift or vulnerability is detected, AI automatically runs remediation playbooks to self-heal.',

    feat7Title: 'MLPS 2.0 Compliance Audits',
    feat7Desc: 'Built-in security compliance baseline aligned with China National Cyber Protection Level 3 requirements, enabling one-click checks and cascade vulnerabilities self-healing.',

    feat8Title: 'Custom AI Prompt Templates',
    feat8Desc: 'Customize LLM prompts for 7 core business scenarios (RAG, Log/Alert diagnosis, etc.) with required variable validation and robust safety fallback mechanisms.',

    feat9Title: 'Multi-Channel Alerting Control',
    feat9Desc: 'Centralized Feishu/DingTalk bot integrations. Dynamically filter notifications with a refined event whitelist (pipeline run, approval request, task failure).',

    feat10Title: 'Multi-Project Tenant Isolation',
    feat10Desc: 'Introduces Projects and ProjectMember mechanisms. Enforces row-level workspace boundaries on hosts, credentials, pipelines, and tasks to block unauthorized access.',

    feat11Title: 'Cross-Project Asset Sharing',
    feat11Desc: 'Share hosts, credentials, or pipelines securely across workspaces under three levels: read (read-only), use (executable in pipeline without password leaks), and full.',


    demoTitle: 'Interactive Self-Healing Simulator',
    demoSubtitle: 'Trigger a simulated service failure and watch how AnsFlow AI brain restores services in seconds.',
    demoBtnSimulate: 'Simulate Incident',
    demoBtnReset: 'Reset Simulator',
    demoStatusIdle: 'Ready to simulate...',
    demoStatusAlert: 'ALERT DETECTED: Web service CPU load is continuously exceeding 95%',
    demoStatusAI: 'AI DECIDING: Recalling matching "Restart Nginx Playbook (ID 45)" via semantic RAG lookup',
    demoStatusDAG: 'DAG GENERATED: Dynamically orchestrated a 5-node verification and playbook execution chain',
    demoStatusExecution: 'RUNNING: Invoking Ansible execution engine against targeted nodes...',
    demoStatusSuccess: 'HEALED: Web service latency recovered (200 OK). Target nodes are healthy now.',

    nodeAlert: 'Alert Input',
    nodeAI: 'AI RAG Decider',
    nodeDAG: 'DAG Composer',
    nodeExecute: 'Playbook Exec',
    nodeRecover: 'Healthy State',

    footerSlogan: 'AI-driven Ansible orchestration and self-healing platform.',
    footerProduct: 'Product',
    footerResources: 'Resources',
    footerCompany: 'Company',
    footerRights: '© 2026 AnsFlow. All rights reserved.',

    archTitle: 'Closed-Loop Self-Healing Architecture',
    archSubtitle: 'Deep dive into both business self-healing workflow and core system tech stack.',
    archTabFlow: 'Healing Pipeline',
    archTabTech: 'System Tech Stack',
    archLayerIngestion: '1. Alert Ingestion & Git Triggers',
    archLayerIngestionDesc: 'Listens to Prometheus alerts, captures Git repository updates for GitOps synchronization, and ingests Host Baseline drift events.',
    archLayerAI: '2. AI Reasoner & RAG Search',
    archLayerAIDesc: 'LLM agents dissect alerts and dynamically match verified troubleshooting guides via vector DB.',
    archLayerOrch: '3. Dynamic DAG Composition',
    archLayerOrchDesc: 'Generates topological graphs containing status probes, playbooks and post-condition checks.',
    archLayerExec: '4. Isolated Ansible Engine',
    archLayerExecDesc: 'Executes scripts safely within draft zones. Promotes proven playbooks to manual repository.',
    archLayerNode: '5. Target Infrastructure & Compliance',
    archLayerNodeDesc: 'Kubernetes containers, cloud instances, and hybrid servers, integrated with baseline agents for compliance checking and configuration healing.',
    
    // Tech Stack Architecture translations
    archTechClientPortal: '1. User Portal & Visual Dashboard (React)',
    archTechClientPortalDesc: 'Frontend built on React 18, Ant Design 6, and Tailwind CSS v4, providing an interactive dashboard for DAG editing and real-time self-healing workflows.',
    archTechAppGateway: '2. Application Services & Core Gateway (Django)',
    archTechAppGatewayDesc: 'Powered by Django 5.2 and DRF, incorporating SmartRBAC role permissions, managing pipelines, GitOps configurations, and host compliance baselines.',
    archTechWorkerRunner: '3. Distributed Task Queue & Execution (Celery & Ansible)',
    archTechWorkerRunnerDesc: 'Utilizes Celery and Redis for task queues. Injects isolated Ansible Runner instances to reconcile Kubernetes states and remediate host baseline drift.',
    archTechAIBrain: '4. AI Brain & Semantic Search (LangChain)',
    archTechAIBrainDesc: 'Orchestrates LLM calls (DeepSeek, OpenAI, Ollama) via LangChain. Performs high-accuracy RAG semantic vector lookups against ChromaDB knowledge databases.',
    archTechDbStorage: '5. Data Persistence & Caching Matrix (Databases)',
    archTechDbStorageDesc: 'PostgreSQL / SQLite holds configurations and metrics; Redis acts as high-speed cache and Celery broker; ChromaDB stores vectorized operational guides.',
  }
};

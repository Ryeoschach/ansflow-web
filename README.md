# AnsFlow Web
> Landing Page & Documentation Portal for AnsFlow Platform

English | [中文说明](./README_ZH.md)

AnsFlow Web is the marketing landing page and technical documentation portal for the AnsFlow enterprise-level AI-driven declarative operations and self-healing platform. Built with React 19 + TypeScript + Vite, it features rich, premium glassmorphic UI design, interactive self-healing simulation flows, and comprehensive bilingual manuals.

---

## Technical Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Vanilla CSS (Tailwind-free for precise micro-animations & layout responsiveness)
- **Internationalization**: Custom lightweight reactive i18n hook
- **Illustrations**: Pure CSS & SVG keyframe-animated representations of DevOps concepts (DAG, GitOps, RAG, etc.)

---

## Core Features Displayed

1. **AI Self-Healing Engine**: root-cause diagnosis and auto-generation of Ansible Playbooks.
2. **Visual DAG Orchestration**: ReactFlow-based visual topological designer.
3. **Isolated Assets & Promote Channel**: Sandbox zones separating raw AI scripts from stable production files.
4. **Continuous RAG Loop**: Vectorizing verified playbooks to build a self-growing knowledge base.
5. **Cloud-Native GitOps Sync**: Declarative state synchronization with Kubernetes.
6. **Host Baseline Compliance & MLPS 2.0**: Automated security audits and cascade self-healing against Chinese Cyber Protection Level 3 requirements.
7. **Custom AI Prompt Templates**: Dynamic prompt configurations with dynamic variable validation.
8. **Multi-Channel Alert Notifications**: Feishu & DingTalk bot integrations with event whitelisting.
9. **Multi-Dimensional Operation Reports**: Statistical insights dashboards for alert self-healing, DAG runs, Ansible playbook executions, and compliance scores.

---

## Project Structure

```
ansflow-web/
├── public/                 # Static assets (favicons, etc.)
├── src/
│   ├── assets/             # Brand logos & global assets
│   ├── components/         # Page Components
│   │   ├── Header.tsx      # Navigation & Language Selector
│   │   ├── Hero.tsx        # High-impact Hero Header
│   │   ├── Features.tsx    # 3x3 Symmetrical Feature grid with animations
│   │   ├── Architecture.tsx# Interactive Tech Topology diagram
│   │   ├── InteractiveDemo.tsx # Live Self-healing Simulator
│   │   ├── Docs.tsx        # Full Technical Manual (Bilingual)
│   │   └── Footer.tsx      # Landing page Footer
│   ├── context/            # React Context (i18n, routing states)
│   ├── i18n/               # Localization translation dictionaries
│   ├── imgs/               # Real product screenshots
│   ├── index.css           # Core premium styling & animations
│   ├── main.tsx            # App Entrypoint
│   └── App.tsx             # Route dispatcher
└── package.json
```

---

## Getting Started

### Installation

```bash
npm install
# or if using pnpm:
pnpm install
```

### Run Locally

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

---

## License

Private - All Rights Reserved

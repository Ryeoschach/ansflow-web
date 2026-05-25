import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Architecture: React.FC = () => {
  const { t } = useApp();
  const [activeTab, setActiveTab] = useState<'flow' | 'tech'>('flow');

  return (
    <section id="architecture" className="section architecture-section">
      <div className="glow-bg arch-glow-1"></div>
      <div className="glow-bg arch-glow-2"></div>
      
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Section Header */}
        <div className="section-header" style={{ width: '100%' }}>
          <h2 className="section-title">{t('archTitle')}</h2>
          <p className="section-subtitle">{t('archSubtitle')}</p>
        </div>

        {/* Tab Selector */}
        <div className="arch-tabs">
          <button 
            className={`arch-tab-btn ${activeTab === 'flow' ? 'active' : ''}`}
            onClick={() => setActiveTab('flow')}
          >
            {t('archTabFlow')}
          </button>
          <button 
            className={`arch-tab-btn ${activeTab === 'tech' ? 'active' : ''}`}
            onClick={() => setActiveTab('tech')}
          >
            {t('archTabTech')}
          </button>
        </div>

        {activeTab === 'flow' ? (
          /* Dynamic Architectural Block diagram for Healing Flow */
          <div className="architecture-diagram-container">
            
            {/* Vertical Connection Line with Flowing Packets */}
            <div className="architecture-flow-pipe">
              <div className="flow-packet" style={{ animationDelay: '0s' }}></div>
              <div className="flow-packet" style={{ animationDelay: '1.5s' }}></div>
              <div className="flow-packet" style={{ animationDelay: '3s' }}></div>
            </div>

            {/* Layer 1: Ingestion */}
            <div className="arch-layer-card glass-card">
              <div className="arch-layer-badge">INPUT</div>
              <div className="arch-layer-content">
                <h3 className="arch-layer-title">
                  <span className="layer-num">01</span>
                  {t('archLayerIngestion')}
                </h3>
                <p className="arch-layer-desc">{t('archLayerIngestionDesc')}</p>
              </div>
              <div className="arch-layer-graphics">
                <div className="ingest-hubs" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div className="hub-dot ping-red" title="Alert Incident"></div>
                  <div className="git-hub-icon" title="GitOps Push" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px', borderRadius: '50%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-premium)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                      <circle cx="18" cy="18" r="3" />
                      <circle cx="6" cy="6" r="3" />
                      <path d="M6 9v9m12-3V9a4 4 0 0 0-4-4H9" />
                    </svg>
                  </div>
                  <div className="hub-dot ping-blue" title="Host Compliance Event"></div>
                </div>
              </div>
            </div>

            {/* Layer 2: AI & RAG */}
            <div className="arch-layer-card glass-card highlighted-layer">
              <div className="arch-layer-badge ai-badge">AI BRAIN</div>
              <div className="arch-layer-content">
                <h3 className="arch-layer-title">
                  <span className="layer-num gradient-text gradient-ai">02</span>
                  {t('archLayerAI')}
                </h3>
                <p className="arch-layer-desc">{t('archLayerAIDesc')}</p>
              </div>
              <div className="arch-layer-graphics">
                <div className="brain-db-link">
                  <div className="link-circle brain-hub">LLM</div>
                  <div className="link-arrow">
                    <div className="mini-dot"></div>
                  </div>
                  <div className="link-circle db-hub">Vector DB</div>
                </div>
              </div>
            </div>

            {/* Layer 3: DAG Engine */}
            <div className="arch-layer-card glass-card">
              <div className="arch-layer-badge">ORCHESTRATOR</div>
              <div className="arch-layer-content">
                <h3 className="arch-layer-title">
                  <span className="layer-num">03</span>
                  {t('archLayerOrch')}
                </h3>
                <p className="arch-layer-desc">{t('archLayerOrchDesc')}</p>
              </div>
              <div className="arch-layer-graphics">
                <div className="mini-dag">
                  <div className="dag-node size-s"></div>
                  <div className="dag-node size-m active"></div>
                  <div className="dag-node size-s"></div>
                </div>
              </div>
            </div>

            {/* Layer 4: Ansible Engine */}
            <div className="arch-layer-card glass-card">
              <div className="arch-layer-badge">RUNNER</div>
              <div className="arch-layer-content">
                <h3 className="arch-layer-title">
                  <span className="layer-num">04</span>
                  {t('archLayerExec')}
                </h3>
                <p className="arch-layer-desc">{t('archLayerExecDesc')}</p>
              </div>
              <div className="arch-layer-graphics">
                <div className="ansible-console">
                  <span className="term-prompt">$</span>
                  <span className="term-cmd">ansible-playbook -i ...</span>
                  <div className="term-cursor"></div>
                </div>
              </div>
            </div>

            {/* Layer 5: Target Nodes */}
            <div className="arch-layer-card glass-card">
              <div className="arch-layer-badge">INFRASTRUCTURE</div>
              <div className="arch-layer-content">
                <h3 className="arch-layer-title">
                  <span className="layer-num">05</span>
                  {t('archLayerNode')}
                </h3>
                <p className="arch-layer-desc">{t('archLayerNodeDesc')}</p>
              </div>
              <div className="arch-layer-graphics">
                <div className="rack-and-shield" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div className="node-rack">
                    <div className="rack-unit"><span className="rack-light healthy"></span></div>
                    <div className="rack-unit"><span className="rack-light healthy"></span></div>
                    <div className="rack-unit"><span className="rack-light healthy"></span></div>
                  </div>
                  <div className="compliance-shield" title="Baseline Compliant" style={{ color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px', borderRadius: '50%', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-premium)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px', filter: 'drop-shadow(0 0 4px rgba(16,185,129,0.3))' }}>
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(16, 185, 129, 0.15)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* Technical Stack Architecture Diagram */
          <div className="architecture-diagram-container">
            
            {/* Vertical Connection Line with Flowing Packets */}
            <div className="architecture-flow-pipe tech-pipe">
              <div className="flow-packet tech-packet" style={{ animationDelay: '0s' }}></div>
              <div className="flow-packet tech-packet" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Layer 1: Client & Portal (React) */}
            <div className="arch-layer-card glass-card">
              <div className="arch-layer-badge tech-badge">FRONTEND PORTAL</div>
              <div className="arch-layer-content">
                <h3 className="arch-layer-title">
                  <span className="layer-num">01</span>
                  {t('archTechClientPortal')}
                </h3>
                <p className="arch-layer-desc">{t('archTechClientPortalDesc')}</p>
              </div>
              <div className="arch-layer-graphics">
                <div className="tech-react-node">
                  <svg className="react-icon-spin" viewBox="-11.5 -10.23174 23 20.46348" width="40" height="40">
                    <circle cx="0" cy="0" r="2" fill="var(--accent-color)" />
                    <g stroke="var(--accent-color)" strokeWidth="1.2" fill="none">
                      <ellipse rx="11" ry="4.2" />
                      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                    </g>
                  </svg>
                  <span className="tech-mini-label">React 18 & Antd 6</span>
                </div>
              </div>
            </div>

            {/* Layer 2: Django App Core */}
            <div className="arch-layer-card glass-card highlighted-layer">
              <div className="arch-layer-badge tech-badge app-badge">API GATEWAY & ENGINE</div>
              <div className="arch-layer-content">
                <h3 className="arch-layer-title">
                  <span className="layer-num gradient-text gradient-ai">02</span>
                  {t('archTechAppGateway')}
                </h3>
                <p className="arch-layer-desc">{t('archTechAppGatewayDesc')}</p>
              </div>
              <div className="arch-layer-graphics">
                <div className="django-core-box">
                  <div className="django-logo-text">Django 5.2</div>
                  <div className="rbac-badge">SmartRBAC</div>
                </div>
              </div>
            </div>

            {/* Layer 3: Celery Queue & Ansible Execution */}
            <div className="arch-layer-card glass-card">
              <div className="arch-layer-badge tech-badge">TASK SCHEDULER</div>
              <div className="arch-layer-content">
                <h3 className="arch-layer-title">
                  <span className="layer-num">03</span>
                  {t('archTechWorkerRunner')}
                </h3>
                <p className="arch-layer-desc">{t('archTechWorkerRunnerDesc')}</p>
              </div>
              <div className="arch-layer-graphics">
                <div className="celery-ansible-box">
                  <div className="tech-db-pill celery-pill">Celery</div>
                  <div className="tech-flow-indicator">➔</div>
                  <div className="tech-db-pill ansible-pill">Ansible</div>
                </div>
              </div>
            </div>

            {/* Layer 4: LangChain AI Brain */}
            <div className="arch-layer-card glass-card highlighted-layer">
              <div className="arch-layer-badge tech-badge ai-badge">AI ORCHESTRATOR</div>
              <div className="arch-layer-content">
                <h3 className="arch-layer-title">
                  <span className="layer-num gradient-text gradient-ai">04</span>
                  {t('archTechAIBrain')}
                </h3>
                <p className="arch-layer-desc">{t('archTechAIBrainDesc')}</p>
              </div>
              <div className="arch-layer-graphics">
                <div className="brain-db-link">
                  <div className="link-circle brain-hub tech-brain-hub">LangChain</div>
                  <div className="link-arrow">
                    <div className="mini-dot"></div>
                  </div>
                  <div className="link-circle db-hub tech-llm-hub">LLM API</div>
                </div>
              </div>
            </div>

            {/* Layer 5: Data Persistent Matrix */}
            <div className="arch-layer-card glass-card">
              <div className="arch-layer-badge tech-badge">STORAGE MATRIX</div>
              <div className="arch-layer-content">
                <h3 className="arch-layer-title">
                  <span className="layer-num">05</span>
                  {t('archTechDbStorage')}
                </h3>
                <p className="arch-layer-desc">{t('archTechDbStorageDesc')}</p>
              </div>
              <div className="arch-layer-graphics">
                <div className="storage-grid">
                  <div className="storage-pill pg-color">PostgreSQL</div>
                  <div className="storage-pill redis-color">Redis</div>
                  <div className="storage-pill chroma-color">ChromaDB</div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      <style>{`
        .architecture-section {
          background-color: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
          position: relative;
        }

        .arch-glow-1 {
          top: 10%;
          left: 5%;
          --accent-glow: rgba(144, 70, 231, 0.08);
        }

        .arch-glow-2 {
          bottom: 10%;
          right: 5%;
          --accent-glow: rgba(41, 151, 255, 0.08);
        }

        .architecture-diagram-container {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 40px;
          max-width: 900px;
          margin: 0 auto;
        }

        /* Flow pipeline background path */
        .architecture-flow-pipe {
          position: absolute;
          width: 4px;
          height: 100%;
          background: linear-gradient(180deg, 
            var(--border-color) 0%, 
            var(--accent-color) 30%, 
            #00dfd8 60%, 
            #9046e7 85%, 
            var(--border-color) 100%
          );
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1;
        }

        @media (max-width: 768px) {
          .architecture-flow-pipe {
            left: 24px;
            transform: none;
          }
        }

        .flow-packet {
          position: absolute;
          width: 8px;
          height: 30px;
          background: linear-gradient(180deg, transparent, #ffffff, transparent);
          box-shadow: 0 0 10px #ffffff;
          left: -2px;
          top: 0;
          border-radius: 4px;
          animation: dropPacket 4s infinite linear;
        }

        @keyframes dropPacket {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        /* Layer Card Layout */
        .arch-layer-card {
          display: grid;
          grid-template-columns: 1fr 180px;
          gap: 40px;
          position: relative;
          z-index: 2;
          padding: 30px 40px;
          background-color: var(--card-bg);
          width: 48%; /* Left-right alternate sizing */
          align-self: flex-start;
          transition: var(--transition-slow);
        }

        /* Stagger layout: odd cards on left, even cards on right */
        .arch-layer-card:nth-child(even) {
          align-self: flex-start;
        }

        .arch-layer-card:nth-child(odd) {
          align-self: flex-end;
        }

        @media (max-width: 768px) {
          .arch-layer-card {
            width: 100%;
            align-self: stretch !important;
            padding-left: 60px; /* Offset for flow pipe */
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        /* Specially highlight AI layer card */
        .arch-layer-card.highlighted-layer {
          border-color: var(--accent-color);
          box-shadow: 0 12px 40px var(--accent-glow);
        }

        .arch-layer-badge {
          position: absolute;
          top: -12px;
          left: 30px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          padding: 2px 10px;
          border-radius: 4px;
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--text-tertiary);
          letter-spacing: 0.05em;
        }

        .ai-badge {
          border-color: var(--accent-color);
          color: var(--accent-color);
        }

        .arch-layer-content {
          text-align: left;
        }

        .layer-num {
          font-size: 1.8rem;
          font-weight: 800;
          margin-right: 12px;
          opacity: 0.8;
          font-family: var(--font-title);
          vertical-align: middle;
        }

        .arch-layer-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
        }

        .arch-layer-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* --- Graphics elements inside cards --- */
        .arch-layer-graphics {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-secondary);
          border-radius: 10px;
          border: 1px solid var(--border-color);
          padding: 12px;
          height: 100px;
        }

        /* Hubs (Ingestion) */
        .ingest-hubs {
          display: flex;
          gap: 16px;
        }

        .hub-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          position: relative;
        }

        .hub-dot::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border-radius: 50%;
          animation: radar 2s infinite ease-out;
        }

        .ping-red { background-color: #ef4444; }
        .ping-red::after { background-color: #ef4444; }
        
        .ping-yellow { background-color: #f59e0b; }
        .ping-yellow::after { background-color: #f59e0b; animation-delay: 0.6s; }

        .ping-blue { background-color: var(--accent-color); }
        .ping-blue::after { background-color: var(--accent-color); animation-delay: 1.2s; }

        /* Brain DB link (AI & RAG) */
        .brain-db-link {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .link-circle {
          font-size: 0.7rem;
          font-weight: 800;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          border: 1.5px solid var(--border-color);
          background-color: var(--bg-primary);
        }

        .brain-hub {
          border-color: var(--accent-color);
          color: var(--accent-color);
          box-shadow: 0 0 10px var(--accent-glow);
        }

        .link-arrow {
          width: 30px;
          height: 2px;
          background-color: var(--border-color);
          position: relative;
        }

        .mini-dot {
          width: 4px;
          height: 4px;
          background-color: var(--accent-color);
          border-radius: 50%;
          position: absolute;
          top: -1px;
          left: 0;
          animation: slideLink 2s infinite linear;
        }

        @keyframes slideLink {
          0% { left: 0; }
          100% { left: 100%; }
        }

        /* Mini DAG (DAG Engine) */
        .mini-dag {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .dag-node {
          border-radius: 4px;
          border: 1.5px solid var(--border-color);
          background-color: var(--bg-primary);
        }

        .dag-node.size-s { width: 20px; height: 20px; }
        .dag-node.size-m { width: 30px; height: 30px; }
        .dag-node.active {
          border-color: #00dfd8;
          box-shadow: 0 0 8px rgba(0, 223, 216, 0.25);
          animation: manualPulse 2.5s infinite;
        }

        /* Ansible Console (Runner) */
        .ansible-console {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          display: flex;
          align-items: center;
          gap: 4px;
          width: 90%;
          background-color: #1a1a1c;
          padding: 8px;
          border-radius: 4px;
          color: #10b981;
          overflow: hidden;
          white-space: nowrap;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .term-prompt { color: #f59e0b; }
        .term-cmd { color: #e1e1e3; }
        .term-cursor {
          width: 5px;
          height: 10px;
          background-color: #e1e1e3;
          animation: blink 1s step-end infinite;
        }

        /* Node rack (Infrastructure) */
        .node-rack {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 60px;
        }

        .rack-unit {
          height: 10px;
          border: 1px solid var(--border-color);
          background-color: var(--bg-primary);
          border-radius: 2px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 4px;
        }

        .rack-light {
          width: 4px;
          height: 4px;
          border-radius: 50%;
        }

        .rack-light.healthy {
          background-color: #10b981;
          box-shadow: 0 0 6px #10b981;
          animation: blink 2s infinite step-end;
        }

        /* Tabs selector styles */
        .arch-tabs {
          display: inline-flex;
          background-color: var(--bg-secondary);
          padding: 4px;
          border-radius: 30px;
          margin: 0 auto 50px auto;
          position: relative;
          z-index: 10;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-premium);
        }
        
        .arch-tab-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          padding: 8px 24px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
          font-family: var(--font-title);
        }
        
        .arch-tab-btn:hover {
          color: var(--text-primary);
        }
        
        .arch-tab-btn.active {
          background-color: var(--bg-primary);
          color: var(--text-primary);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid var(--border-color);
        }
        
        html.dark .arch-tab-btn.active {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }

        /* Tech badge specifics */
        .tech-badge {
          border-color: var(--accent-color);
          color: var(--accent-color);
        }
        .tech-badge.app-badge {
          border-color: #00dfd8;
          color: #00dfd8;
        }

        /* Tech Pipeline Flow Pipe Specifics */
        .tech-pipe {
          background: linear-gradient(180deg, 
            var(--border-color) 0%, 
            #00dfd8 30%, 
            var(--accent-color) 60%, 
            #ef4444 85%, 
            var(--border-color) 100%
          ) !important;
        }
        
        .tech-packet {
          box-shadow: 0 0 10px var(--accent-color) !important;
          animation: dropPacket 3s infinite linear !important;
        }

        /* Tech stack elements styles */
        .tech-react-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        
        .react-icon-spin {
          animation: spinReact 15s infinite linear;
        }
        
        @keyframes spinReact {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .tech-mini-label {
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--text-primary);
          background-color: var(--bg-primary);
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid var(--border-color);
        }

        /* Django Box */
        .django-core-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background-color: #092e20; /* Dark forest green characteristic for Django */
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          box-shadow: 0 4px 10px rgba(9, 46, 32, 0.3);
        }
        
        .django-logo-text {
          font-family: var(--font-title);
          font-weight: 800;
          font-size: 0.8rem;
          letter-spacing: -0.02em;
        }
        
        .rbac-badge {
          font-size: 0.55rem;
          font-weight: 700;
          background-color: #2bba74;
          color: #ffffff;
          padding: 1px 4px;
          border-radius: 3px;
        }

        /* Celery Ansible execution indicators */
        .celery-ansible-box {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .tech-db-pill {
          font-size: 0.65rem;
          font-weight: 800;
          padding: 4px 8px;
          border-radius: 4px;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .celery-pill {
          background-color: #378140; /* Celery green */
          box-shadow: 0 2px 6px rgba(55, 129, 64, 0.3);
        }
        
        .ansible-pill {
          background-color: #000000;
          border-color: #5bb4fc;
          color: #5bb4fc;
          box-shadow: 0 2px 6px rgba(91, 180, 252, 0.2);
        }
        
        .tech-flow-indicator {
          font-size: 0.8rem;
          color: var(--text-secondary);
          animation: bounceRight 1.5s infinite ease-in-out;
        }
        
        @keyframes bounceRight {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }

        /* Langchain AI Brain Hub specifics */
        .tech-brain-hub {
          border-color: var(--accent-color) !important;
          color: var(--accent-color) !important;
          font-size: 0.6rem !important;
          background-color: var(--bg-primary) !important;
        }
        
        .tech-llm-hub {
          border-color: #9046e7 !important;
          color: #9046e7 !important;
          background-color: var(--bg-primary) !important;
          box-shadow: 0 0 10px rgba(144, 70, 231, 0.15) !important;
        }

        /* Database persistent storage grid */
        .storage-grid {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 80px;
        }
        
        .storage-pill {
          font-size: 0.55rem;
          font-weight: 800;
          text-align: center;
          padding: 2px 4px;
          border-radius: 3px;
          border: 1px solid var(--border-color);
          background-color: var(--bg-primary);
        }
        
        .pg-color {
          color: #336791;
          border-color: rgba(51, 103, 145, 0.3);
        }
        
        .redis-color {
          color: #d82c20;
          border-color: rgba(216, 44, 32, 0.3);
        }
        
        .chroma-color {
          color: #f59e0b;
          border-color: rgba(245, 158, 11, 0.3);
        }
      `}</style>
    </section>
  );
};

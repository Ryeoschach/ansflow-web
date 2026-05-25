import React from 'react';
import { useApp } from '../context/AppContext';

export const Features: React.FC = () => {
  const { t } = useApp();

  return (
    <section id="features" className="section features-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">{t('featuresTitle')}</h2>
          <p className="section-subtitle">{t('featuresSubtitle')}</p>
        </div>

        {/* Features Grid */}
        <div className="grid-3 features-grid">
          
          {/* Card 1: AI Decision Engine */}
          <div className="glass-card feature-card">
            <div className="feature-illustration-wrapper">
              <div className="ill-ai-engine">
                <div className="ill-ping alert-pulse"></div>
                <div className="ill-flow-line">
                  <div className="ill-flow-dot"></div>
                </div>
                <div className="ill-brain">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/>
                    <path d="M12 6V12L16 14" strokeDasharray="2,2"/>
                    <circle cx="12" cy="12" r="3" fill="var(--accent-glow)"/>
                  </svg>
                </div>
              </div>
            </div>
            <h3 className="feature-card-title">{t('feat1Title')}</h3>
            <p className="feature-card-desc">{t('feat1Desc')}</p>
          </div>

          {/* Card 2: DAG Editor */}
          <div className="glass-card feature-card">
            <div className="feature-illustration-wrapper">
              <div className="ill-dag-editor">
                <svg className="ill-dag-svg" viewBox="0 0 260 120">
                  {/* Nodes */}
                  <rect x="10" y="45" width="60" height="30" rx="6" fill="var(--bg-secondary)" stroke="var(--border-color)" />
                  <rect x="100" y="15" width="60" height="30" rx="6" fill="var(--bg-secondary)" stroke="var(--border-color)" />
                  <rect x="100" y="75" width="60" height="30" rx="6" fill="var(--bg-secondary)" stroke="var(--border-color)" />
                  <rect x="190" y="45" width="60" height="30" rx="6" fill="var(--bg-secondary)" stroke="var(--border-color)" />
                  
                  {/* Paths */}
                  <path d="M 70 60 L 100 30" fill="none" stroke="var(--border-color)" strokeWidth="1.5"/>
                  <path d="M 70 60 L 100 90" fill="none" stroke="var(--border-color)" strokeWidth="1.5"/>
                  <path d="M 160 30 L 190 60" fill="none" stroke="var(--border-color)" strokeWidth="1.5"/>
                  <path d="M 160 90 L 190 60" fill="none" stroke="var(--border-color)" strokeWidth="1.5"/>

                  {/* Flow dots */}
                  <circle r="3" fill="var(--accent-color)">
                    <animateMotion dur="3s" repeatCount="indefinite" path="M 70 60 L 100 30 L 160 30 L 190 60" />
                  </circle>
                  <circle r="3" fill="var(--accent-color)" begin="1.5s">
                    <animateMotion dur="3s" repeatCount="indefinite" path="M 70 60 L 100 90 L 160 90 L 190 60" />
                  </circle>
                </svg>
              </div>
            </div>
            <h3 className="feature-card-title">{t('feat2Title')}</h3>
            <p className="feature-card-desc">{t('feat2Desc')}</p>
          </div>

          {/* Card 3: Asset Partition */}
          <div className="glass-card feature-card">
            <div className="feature-illustration-wrapper">
              <div className="ill-partition">
                <div className="zone zone-draft">
                  <span className="zone-label">AI DRAFT</span>
                  <div className="zone-node placeholder-node anim-pulse"></div>
                </div>
                <div className="promote-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
                  <span className="promote-txt">Promote</span>
                </div>
                <div className="zone zone-manual">
                  <span className="zone-label">MANUAL</span>
                  <div className="zone-node manual-node"></div>
                </div>
              </div>
            </div>
            <h3 className="feature-card-title">{t('feat3Title')}</h3>
            <p className="feature-card-desc">{t('feat3Desc')}</p>
          </div>

          {/* Card 4: RAG Vector DB */}
          <div className="glass-card feature-card">
            <div className="feature-illustration-wrapper">
              <div className="ill-rag-loop">
                <div className="rag-vector-db">
                  <div className="db-layer"></div>
                  <div className="db-layer"></div>
                  <div className="db-layer"></div>
                </div>
                <div className="rag-scanner"></div>
                <div className="rag-queries">
                  <div className="query-dot" style={{ animationDelay: '0s' }}></div>
                  <div className="query-dot" style={{ animationDelay: '1s' }}></div>
                  <div className="query-dot" style={{ animationDelay: '2s' }}></div>
                </div>
              </div>
            </div>
            <h3 className="feature-card-title">{t('feat4Title')}</h3>
            <p className="feature-card-desc">{t('feat4Desc')}</p>
          </div>

          {/* Card 5: Cloud-Native GitOps */}
          <div className="glass-card feature-card">
            <div className="feature-illustration-wrapper">
              <div className="ill-gitops">
                {/* Git branch commit node */}
                <div className="gitops-git">
                  <svg className="gitops-git-icon" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="18" r="3" />
                    <circle cx="6" cy="6" r="3" />
                    <circle cx="6" cy="18" r="3" />
                    <path d="M18 15V9a4 4 0 0 0-4-4H9" />
                    <line x1="6" y1="9" x2="6" y2="15" />
                  </svg>
                  <span className="gitops-mini-badge">Git Push</span>
                </div>
                {/* Flow and Reconcile loop */}
                <div className="gitops-sync-path">
                  <div className="gitops-sync-dot"></div>
                  <svg className="gitops-sync-arrow" viewBox="0 0 24 24" fill="none" stroke="var(--gradient-dag-end)" strokeWidth="2">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                  </svg>
                </div>
                {/* Kubernetes Pods */}
                <div className="gitops-k8s">
                  <div className="k8s-pod anim-pulse">Pod 1</div>
                  <div className="k8s-pod anim-pulse" style={{ animationDelay: '0.5s' }}>Pod 2</div>
                </div>
              </div>
            </div>
            <h3 className="feature-card-title">{t('feat5Title')}</h3>
            <p className="feature-card-desc">{t('feat5Desc')}</p>
          </div>

          {/* Card 6: Host Baseline Compliance */}
          <div className="glass-card feature-card">
            <div className="feature-illustration-wrapper">
              <div className="ill-host-baseline">
                {/* Server Rack */}
                <div className="baseline-rack">
                  <div className="rack-slot"><span className="rack-indicator active"></span></div>
                  <div className="rack-slot"><span className="rack-indicator drift"></span></div>
                  <div className="rack-slot"><span className="rack-indicator active"></span></div>
                </div>
                {/* Scanning line */}
                <div className="baseline-scan-line"></div>
                {/* Security Shield */}
                <div className="baseline-shield">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(16, 185, 129, 0.1)" />
                  </svg>
                </div>
              </div>
            </div>
            <h3 className="feature-card-title">{t('feat6Title')}</h3>
            <p className="feature-card-desc">{t('feat6Desc')}</p>
          </div>
          
          {/* Card 7: MLPS 2.0 Compliance */}
          <div className="glass-card feature-card">
            <div className="feature-illustration-wrapper">
              <div className="ill-mlps">
                <div className="mlps-shield-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(0, 113, 227, 0.1)" />
                  </svg>
                  <span className="mlps-text">等保三级</span>
                </div>
                <div className="mlps-checklist">
                  <div className="mlps-check-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="mlps-check-item" style={{ animationDelay: '0.5s' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="mlps-check-item" style={{ animationDelay: '1s' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="feature-card-title">{t('feat7Title')}</h3>
            <p className="feature-card-desc">{t('feat7Desc')}</p>
          </div>

          {/* Card 8: Custom AI Prompts */}
          <div className="glass-card feature-card">
            <div className="feature-illustration-wrapper">
              <div className="ill-custom-prompts">
                <div className="prompt-editor-header">
                  <span className="prompt-dot"></span>
                  <span className="prompt-dot"></span>
                  <span className="prompt-dot"></span>
                </div>
                <div className="prompt-editor-body">
                  <div className="prompt-line cursor-blink">System Prompt:</div>
                  <div className="prompt-line select-text">Analyze alert `{"{"}alert_name{"}"}`...</div>
                  <div className="prompt-line select-text">Recommend Playbook...</div>
                </div>
                <div className="prompt-ai-sparkle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--gradient-ai-end)" strokeWidth="2">
                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707" />
                  </svg>
                </div>
              </div>
            </div>
            <h3 className="feature-card-title">{t('feat8Title')}</h3>
            <p className="feature-card-desc">{t('feat8Desc')}</p>
          </div>

          {/* Card 9: Multi-channel Notifications */}
          <div className="glass-card feature-card">
            <div className="feature-illustration-wrapper">
              <div className="ill-notifications">
                <div className="bell-wrapper">
                  <svg className="bell-icon" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>
                <div className="alert-bubbles">
                  <div className="bubble bubble-feishu">飞书</div>
                  <div className="bubble bubble-dingtalk">钉钉</div>
                </div>
              </div>
            </div>
            <h3 className="feature-card-title">{t('feat9Title')}</h3>
            <p className="feature-card-desc">{t('feat9Desc')}</p>
          </div>

        </div>
      </div>

      <style>{`
        .features-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .section-header {
          text-align: center;
          max-width: 650px;
          margin: 0 auto 80px auto;
        }

        .section-title {
          font-size: 3rem;
          margin-bottom: 20px;
          letter-spacing: -0.03em;
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: var(--text-secondary);
        }

        .features-grid {
          margin-top: 40px;
        }

        .feature-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          height: 100%;
        }

        .feature-card-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 24px;
          margin-bottom: 12px;
        }

        .feature-card-desc {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* --- Illustrations --- */
        .feature-illustration-wrapper {
          width: 100%;
          height: 180px;
          background-color: var(--bg-primary);
          border-radius: 12px;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        /* Card 1: AI Engine CSS */
        .ill-ai-engine {
          display: flex;
          align-items: center;
          gap: 30px;
          position: relative;
        }

        .ill-ping {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: #ef4444;
          position: relative;
        }

        .alert-pulse::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #ef4444;
          animation: radar 1.5s infinite ease-out;
        }

        .ill-flow-line {
          width: 80px;
          height: 2px;
          background: linear-gradient(90deg, #ef4444, var(--accent-color));
          position: relative;
        }

        .ill-flow-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #ffffff;
          box-shadow: 0 0 8px #ffffff;
          top: -2px;
          left: 0;
          animation: flowAcross 2s infinite linear;
        }

        @keyframes flowAcross {
          0% { left: 0; }
          100% { left: 100%; }
        }

        .ill-brain {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          border: 1.5px solid var(--accent-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-color);
          background-color: rgba(0, 113, 227, 0.05);
          animation: float 4s infinite ease-in-out;
        }

        .ill-brain svg {
          width: 26px;
          height: 26px;
        }

        /* Card 2: DAG SVG Illustration */
        .ill-dag-editor {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .ill-dag-svg {
          width: 80%;
          max-width: 240px;
          overflow: visible;
        }

        .ill-dag-svg rect {
          transition: fill 0.3s, stroke 0.3s;
        }

        /* Card 3: Partition */
        .ill-partition {
          display: flex;
          align-items: center;
          gap: 20px;
          width: 90%;
          justify-content: space-around;
        }

        .zone {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          border: 1px dashed var(--border-color);
          border-radius: 10px;
          padding: 16px;
          width: 90px;
          background-color: var(--bg-secondary);
        }

        .zone-label {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-tertiary);
          letter-spacing: 0.05em;
        }

        .zone-node {
          width: 44px;
          height: 24px;
          border-radius: 6px;
        }

        .placeholder-node {
          background: linear-gradient(135deg, var(--gradient-ai-start), var(--gradient-ai-end));
          --accent-glow: var(--gradient-ai-end);
        }

        .manual-node {
          background-color: var(--accent-color);
          box-shadow: 0 4px 10px var(--accent-glow);
          animation: manualPulse 2s infinite ease-in-out;
        }

        @keyframes manualPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); box-shadow: 0 4px 15px var(--accent-glow); }
        }

        .promote-arrow {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--accent-color);
          font-size: 0.6rem;
          font-weight: 700;
          animation: promoteShift 2.5s infinite linear;
        }

        .promote-arrow svg {
          width: 22px;
          height: 22px;
          transform: rotate(90deg);
        }

        .promote-txt {
          margin-top: 4px;
          text-transform: uppercase;
        }

        @keyframes promoteShift {
          0% { transform: translateX(-5px); opacity: 0.5; }
          50% { transform: translateX(5px); opacity: 1; }
          100% { transform: translateX(-5px); opacity: 0.5; }
        }

        /* Card 4: RAG Vector Loop */
        .ill-rag-loop {
          position: relative;
          width: 140px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rag-vector-db {
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 2;
        }

        .db-layer {
          width: 50px;
          height: 12px;
          border-radius: 4px;
          background-color: var(--accent-color);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transform: skewX(-20deg);
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        }

        .db-layer:nth-child(1) { background-color: var(--gradient-dag-end); }
        .db-layer:nth-child(2) { background-color: var(--accent-color); }
        .db-layer:nth-child(3) { background-color: var(--gradient-ai-start); }

        .rag-scanner {
          position: absolute;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 1.5px dashed var(--accent-color);
          animation: rotateScanner 8s infinite linear;
        }

        @keyframes rotateScanner {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .rag-queries {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .query-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--gradient-ai-end);
          box-shadow: 0 0 10px var(--gradient-ai-end);
          animation: flyIn 3s infinite ease-in;
        }

        .query-dot:nth-child(1) {
          top: 10px;
          left: 10px;
          animation-delay: 0s;
        }
        .query-dot:nth-child(2) {
          bottom: 15px;
          left: 20px;
          animation-delay: 1s;
        }
        .query-dot:nth-child(3) {
          top: 20px;
          right: 15px;
          animation-delay: 2s;
        }

        @keyframes flyIn {
          0% { transform: scale(0.2) translate(0, 0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: scale(1.2) translate(40px, 40px); opacity: 0; }
        }

        /* Card 5: GitOps Illustration CSS */
        .ill-gitops {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 85%;
          position: relative;
        }

        .gitops-git {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          z-index: 2;
        }

        .gitops-git-icon {
          width: 38px;
          height: 38px;
          filter: drop-shadow(0 0 8px var(--accent-glow));
        }

        .gitops-mini-badge {
          font-size: 0.6rem;
          font-weight: 800;
          color: var(--accent-color);
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .gitops-sync-path {
          flex-grow: 1;
          height: 50px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gitops-sync-arrow {
          width: 32px;
          height: 32px;
          color: var(--gradient-dag-end);
          animation: spinReact 8s infinite linear;
        }

        .gitops-sync-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--gradient-dag-end);
          box-shadow: 0 0 8px var(--gradient-dag-end);
          animation: flowAcross 2.5s infinite linear;
          top: 22px;
          left: 10%;
        }

        .gitops-k8s {
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 2;
        }

        .k8s-pod {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 800;
          color: #ffffff;
          background: linear-gradient(135deg, #326ce5, #0071e3);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 4px 10px;
          border-radius: 4px;
          box-shadow: 0 3px 8px rgba(50, 108, 229, 0.3);
        }

        /* Card 6: Host Baseline Illustration CSS */
        .ill-host-baseline {
          width: 85%;
          height: 120px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }

        .baseline-rack {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 80px;
          z-index: 2;
        }

        .rack-slot {
          height: 14px;
          border: 1px solid var(--border-color);
          background-color: var(--bg-secondary);
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 6px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          position: relative;
        }

        .rack-indicator {
          width: 5px;
          height: 5px;
          border-radius: 50%;
        }

        .rack-indicator.active {
          background-color: #10b981;
          box-shadow: 0 0 6px #10b981;
        }

        .rack-indicator.drift {
          background-color: #f59e0b;
          box-shadow: 0 0 6px #f59e0b;
          animation: rackSelfHeal 3s infinite steps(1);
        }

        @keyframes rackSelfHeal {
          0%, 40% { background-color: #f59e0b; box-shadow: 0 0 6px #f59e0b; }
          41%, 100% { background-color: #10b981; box-shadow: 0 0 6px #10b981; }
        }

        .baseline-scan-line {
          position: absolute;
          width: 90px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #10b981, transparent);
          box-shadow: 0 0 8px #10b981;
          left: 10px;
          top: 10px;
          animation: scanDown 3s infinite ease-in-out;
          z-index: 3;
        }

        @keyframes scanDown {
          0%, 100% { top: 15px; opacity: 0; }
          10%, 90% { opacity: 1; }
          50% { top: 105px; }
        }

        .baseline-shield {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 50%;
          box-shadow: var(--shadow-premium);
          z-index: 2;
          animation: float 4s infinite ease-in-out;
        }

        .baseline-shield svg {
          width: 28px;
          height: 28px;
          filter: drop-shadow(0 0 5px rgba(16, 185, 129, 0.3));
        }

        /* Card 7: MLPS 2.0 CSS */
        .ill-mlps {
          display: flex;
          align-items: center;
          gap: 24px;
          width: 85%;
          justify-content: space-around;
        }
        .mlps-shield-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .mlps-shield-badge svg {
          width: 48px;
          height: 48px;
          filter: drop-shadow(0 0 8px var(--accent-glow));
        }
        .mlps-text {
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--accent-color);
          background-color: rgba(0, 113, 227, 0.08);
          border: 1px solid rgba(0, 113, 227, 0.2);
          padding: 2px 6px;
          border-radius: 4px;
        }
        .mlps-checklist {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .mlps-check-item {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: checkPulse 3s infinite ease-in-out;
        }
        .mlps-check-item svg {
          width: 12px;
          height: 12px;
        }
        @keyframes checkPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 1; box-shadow: 0 0 8px rgba(16, 185, 129, 0.3); }
        }

        /* Card 8: Custom AI Prompts CSS */
        .ill-custom-prompts {
          width: 80%;
          height: 110px;
          border: 1px solid var(--border-color);
          background-color: var(--bg-secondary);
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        .prompt-editor-header {
          height: 20px;
          background-color: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 5px;
          padding-left: 10px;
        }
        .prompt-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--text-tertiary);
        }
        .prompt-editor-body {
          padding: 10px;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .prompt-line {
          white-space: nowrap;
        }
        .cursor-blink::after {
          content: '_';
          animation: blinkCursor 1s infinite step-end;
          color: var(--accent-color);
        }
        .select-text {
          color: var(--text-primary);
        }
        @keyframes blinkCursor {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        .prompt-ai-sparkle {
          position: absolute;
          right: 8px;
          bottom: 8px;
          width: 28px;
          height: 28px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-premium);
          animation: pulseSparkle 2s infinite ease-in-out;
        }
        .prompt-ai-sparkle svg {
          width: 16px;
          height: 16px;
        }
        @keyframes pulseSparkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(45deg); box-shadow: 0 0 10px var(--gradient-ai-end); }
        }

        /* Card 9: Multi-channel Notifications CSS */
        .ill-notifications {
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 85%;
        }
        .bell-wrapper {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background-color: rgba(0, 113, 227, 0.05);
          border: 1.5px solid var(--accent-color);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: ringBell 2.5s infinite ease-in-out;
        }
        .bell-icon {
          width: 28px;
          height: 28px;
          filter: drop-shadow(0 0 5px var(--accent-glow));
        }
        @keyframes ringBell {
          0%, 100% { transform: rotate(0deg); }
          10%, 30% { transform: rotate(15deg); }
          20%, 40% { transform: rotate(-15deg); }
          50% { transform: rotate(0deg); }
        }
        .alert-bubbles {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .bubble {
          font-size: 0.65rem;
          font-weight: 800;
          color: #ffffff;
          padding: 4px 12px;
          border-radius: 6px;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
          animation: floatBubble 4s infinite ease-in-out;
        }
        .bubble-feishu {
          background-color: #3370ff;
          animation-delay: 0s;
        }
        .bubble-dingtalk {
          background-color: #007fff;
          animation-delay: 1.5s;
        }
        @keyframes floatBubble {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </section>
  );
};

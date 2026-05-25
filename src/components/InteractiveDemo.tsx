import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

type Step = 'idle' | 'alert' | 'ai' | 'dag' | 'exec' | 'success';

interface LogLine {
  text: string;
  type: 'info' | 'warning' | 'error' | 'success' | 'command';
}

export const InteractiveDemo: React.FC = () => {
  const { t, language } = useApp();
  const [step, setStep] = useState<Step>('idle');
  const [logs, setLogs] = useState<LogLine[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Terminal log configs based on language
  const getLogsConfig = (): Record<Step, LogLine[]> => {
    if (language === 'zh') {
      return {
        idle: [],
        alert: [
          { text: '⚠️ [SYSTEM] [10:46:01] 触发监控告警: Alert_ID=98342', type: 'error' },
          { text: '⚠️ [SYSTEM] 告警类型: Web Service CPU Load > 95%', type: 'error' },
          { text: 'ℹ️ [SYSTEM] 自动拉起 AnsFlow AI 自愈代理...', type: 'info' }
        ],
        ai: [
          { text: '🤖 [AI ENGINE] 正在研判告警源: web-node-01.ansflow.internal', type: 'info' },
          { text: '🔍 [RAG VECTOR] 正在对当前告警特征进行向量化语义匹配...', type: 'info' },
          { text: '🎯 [RAG VECTOR] 命中匹配资产! 匹配度: 98.4%', type: 'success' },
          { text: '📖 [RAG VECTOR] 召回已有 Ansible 剧本组件: "重启 Nginx 服务 (ID 45)"', type: 'success' },
          { text: '🤖 [AI ENGINE] 判定结论: Nginx 进程卡死，建议执行优雅重启释放端口', type: 'info' }
        ],
        dag: [
          { text: '⚙️ [DAG COMPOSER] 正在按自愈范式组装流水线拓扑结构...', type: 'info' },
          { text: '✨ [DAG COMPOSER] 动态 DAG 拓扑创建成功:', type: 'success' },
          { text: '   [告警输入] ──> [AI 研判] ──> [状态探针] ──> [执行重启剧本] ──> [健康度校验]', type: 'info' },
          { text: '⚙️ [DAG COMPOSER] 级联引用检测: 剧本 ID 45 绑定成功，生成执行流 token', type: 'info' }
        ],
        exec: [
          { text: '$ ansible-playbook -i hosts restart_nginx.yml --extra-vars "incident=98342"', type: 'command' },
          { text: 'PLAY [Restart Nginx Web Server on Target Hosts] ************************', type: 'info' },
          { text: 'TASK [Gathering Facts] *************************************************', type: 'info' },
          { text: 'ok: [web-node-01.ansflow.internal]', type: 'success' },
          { text: 'TASK [Check Nginx Process status] **************************************', type: 'info' },
          { text: 'failed: Nginx process is down. Port 80 is occupied by stale connections.', type: 'warning' },
          { text: 'TASK [Kill stale connections and restart Nginx service] ****************', type: 'info' },
          { text: 'changed: [web-node-01.ansflow.internal] (Port 80 freed, Nginx reloaded)', type: 'success' }
        ],
        success: [
          { text: 'PLAY RECAP *************************************************************', type: 'info' },
          { text: 'web-node-01.ansflow.internal   : ok=3   changed=1   unreachable=0   failed=0', type: 'success' },
          { text: '✅ [HEALTH CHECK] GET http://web-node-01.ansflow.internal/health -> 200 OK', type: 'success' },
          { text: '✅ [AI SELF-HEALING] 故障自愈完成! 告警已自动闭环归档。耗时: 4.8 秒。', type: 'success' }
        ]
      };
    } else {
      return {
        idle: [],
        alert: [
          { text: '⚠️ [SYSTEM] [10:46:01] Triggered alert: Alert_ID=98342', type: 'error' },
          { text: '⚠️ [SYSTEM] Alert type: Web Service CPU Load > 95%', type: 'error' },
          { text: 'ℹ️ [SYSTEM] Launching AnsFlow AI Self-Healing agent...', type: 'info' }
        ],
        ai: [
          { text: '🤖 [AI ENGINE] Analyzing target node: web-node-01.ansflow.internal', type: 'info' },
          { text: '🔍 [RAG VECTOR] Querying vector db for matching historical templates...', type: 'info' },
          { text: '🎯 [RAG VECTOR] Match found! Similarity score: 98.4%', type: 'success' },
          { text: '📖 [RAG VECTOR] Recalled Ansible Playbook: "Restart Nginx Server (ID 45)"', type: 'success' },
          { text: '🤖 [AI ENGINE] Recommendation: Graceful restart of Nginx service to release port 80', type: 'info' }
        ],
        dag: [
          { text: '⚙️ [DAG COMPOSER] Orchestrating custom DAG pipeline structure...', type: 'info' },
          { text: '✨ [DAG COMPOSER] DAG Topology generated successfully:', type: 'success' },
          { text: '   [Alert In] ──> [AI Decider] ──> [Status Probe] ──> [Exec Playbook 45] ──> [Verification]', type: 'info' },
          { text: '⚙️ [DAG COMPOSER] Dependency checks passed. Execution token generated.', type: 'info' }
        ],
        exec: [
          { text: '$ ansible-playbook -i hosts restart_nginx.yml --extra-vars "incident=98342"', type: 'command' },
          { text: 'PLAY [Restart Nginx Web Server on Target Hosts] ************************', type: 'info' },
          { text: 'TASK [Gathering Facts] *************************************************', type: 'info' },
          { text: 'ok: [web-node-01.ansflow.internal]', type: 'success' },
          { text: 'TASK [Check Nginx Process status] **************************************', type: 'info' },
          { text: 'failed: Nginx process is down. Port 80 is occupied by stale connections.', type: 'warning' },
          { text: 'TASK [Kill stale connections and restart Nginx service] ****************', type: 'info' },
          { text: 'changed: [web-node-01.ansflow.internal] (Port 80 freed, Nginx reloaded)', type: 'success' }
        ],
        success: [
          { text: 'PLAY RECAP *************************************************************', type: 'info' },
          { text: 'web-node-01.ansflow.internal   : ok=3   changed=1   unreachable=0   failed=0', type: 'success' },
          { text: '✅ [HEALTH CHECK] GET http://web-node-01.ansflow.internal/health -> 200 OK', type: 'success' },
          { text: '✅ [AI SELF-HEALING] Self-healing completed successfully! Duration: 4.8s', type: 'success' }
        ]
      };
    }
  };

  const startSimulation = () => {
    if (step !== 'idle') return;
    
    const configs = getLogsConfig();
    
    // Step 1: Alert
    setStep('alert');
    setLogs(configs.alert);
    
    // Step 2: AI Decider
    setTimeout(() => {
      setStep('ai');
      setLogs(prev => [...prev, ...configs.ai]);
    }, 1500);

    // Step 3: DAG Generation
    setTimeout(() => {
      setStep('dag');
      setLogs(prev => [...prev, ...configs.dag]);
    }, 3200);

    // Step 4: Playbook execution
    setTimeout(() => {
      setStep('exec');
      setLogs(prev => [...prev, ...configs.exec]);
    }, 4800);

    // Step 5: Heal Success
    setTimeout(() => {
      setStep('success');
      setLogs(prev => [...prev, ...configs.success]);
    }, 7000);
  };

  const resetSimulation = () => {
    setStep('idle');
    setLogs([]);
  };

  // Sync log language dynamically when language changes mid-way or in idle
  useEffect(() => {
    if (step === 'idle') return;
    // Regenerate logs based on current steps
    const configs = getLogsConfig();
    let newLogs: LogLine[] = [];
    
    const order: Step[] = ['alert', 'ai', 'dag', 'exec', 'success'];
    const currentIdx = order.indexOf(step);
    
    for (let i = 0; i <= currentIdx; i++) {
      newLogs = [...newLogs, ...configs[order[i]]];
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLogs(newLogs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <section id="demo" className="section demo-section">
      <div className="glow-bg demo-glow"></div>
      
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">{t('demoTitle')}</h2>
          <p className="section-subtitle">{t('demoSubtitle')}</p>
        </div>

        {/* Demo Simulator Box */}
        <div className="glass-card simulator-card">
          <div className="simulator-grid">
            
            {/* Visual DAG Topology Editor */}
            <div className="topo-visualizer">
              <h3 className="visualizer-title">DAG Flow Visualizer</h3>
              
              <div className="nodes-container">
                {/* SVG Connections */}
                <svg className="connections-svg">
                  <path 
                    d="M 80 50 L 160 50" 
                    className={`connection-line ${step === 'idle' ? 'inactive' : step === 'alert' ? 'active' : 'success'}`} 
                  />
                  <path 
                    d="M 240 50 L 320 50" 
                    className={`connection-line ${['idle', 'alert'].includes(step) ? 'inactive' : step === 'ai' ? 'active' : 'success'}`} 
                  />
                  <path 
                    d="M 400 50 L 480 50" 
                    className={`connection-line ${['idle', 'alert', 'ai'].includes(step) ? 'inactive' : step === 'dag' ? 'active' : 'success'}`} 
                  />
                  <path 
                    d="M 560 50 L 640 50" 
                    className={`connection-line ${['idle', 'alert', 'ai', 'dag'].includes(step) ? 'inactive' : step === 'exec' ? 'active' : 'success'}`} 
                  />
                </svg>

                {/* Node 1: Alert */}
                <div className={`topo-node ${step !== 'idle' ? 'error' : ''}`}>
                  <div className="node-icon alert-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/>
                    </svg>
                  </div>
                  <div className="node-name">{t('nodeAlert')}</div>
                  <div className="node-status">{step !== 'idle' ? 'TRIGGERED' : 'READY'}</div>
                </div>

                {/* Node 2: AI Decider */}
                <div className={`topo-node ${['ai', 'dag', 'exec', 'success'].includes(step) ? (step === 'ai' ? 'active' : 'success') : ''}`}>
                  <div className="node-icon ai-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  </div>
                  <div className="node-name">{t('nodeAI')}</div>
                  <div className="node-status">{step === 'ai' ? 'RAG SEARCH' : ['dag', 'exec', 'success'].includes(step) ? 'DECIDED' : 'PENDING'}</div>
                </div>

                {/* Node 3: DAG Composer */}
                <div className={`topo-node ${['dag', 'exec', 'success'].includes(step) ? (step === 'dag' ? 'active' : 'success') : ''}`}>
                  <div className="node-icon dag-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" />
                    </svg>
                  </div>
                  <div className="node-name">{t('nodeDAG')}</div>
                  <div className="node-status">{step === 'dag' ? 'ORCHESTRATING' : ['exec', 'success'].includes(step) ? 'COMPOSED' : 'PENDING'}</div>
                </div>

                {/* Node 4: Playbook Execution */}
                <div className={`topo-node ${['exec', 'success'].includes(step) ? (step === 'exec' ? 'active' : 'success') : ''}`}>
                  <div className="node-icon exec-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <div className="node-name">{t('nodeExecute')}</div>
                  <div className="node-status">{step === 'exec' ? 'EXECUTING' : step === 'success' ? 'FINISHED' : 'PENDING'}</div>
                </div>

                {/* Node 5: Success Recovery */}
                <div className={`topo-node ${step === 'success' ? 'success' : ''}`}>
                  <div className="node-icon recover-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div className="node-name">{t('nodeRecover')}</div>
                  <div className="node-status">{step === 'success' ? 'RESOLVED' : 'PENDING'}</div>
                </div>

              </div>

              {/* Status Board */}
              <div className="simulator-status-board">
                <span className="status-indicator-label">CURRENT STATUS:</span>
                <span className={`status-indicator-value status-${step}`}>
                  {step === 'idle' && t('demoStatusIdle')}
                  {step === 'alert' && t('demoStatusAlert')}
                  {step === 'ai' && t('demoStatusAI')}
                  {step === 'dag' && t('demoStatusDAG')}
                  {step === 'exec' && t('demoStatusExecution')}
                  {step === 'success' && t('demoStatusSuccess')}
                </span>
              </div>
            </div>

            {/* Interactive Terminal Window */}
            <div className="terminal-column">
              <div className="terminal-window">
                <div className="terminal-header">
                  <span className="terminal-dot red"></span>
                  <span className="terminal-dot yellow"></span>
                  <span className="terminal-dot green"></span>
                  <span className="terminal-title">ansflow-self-healing-engine.sh</span>
                </div>
                <div className="terminal-body">
                  {logs.length === 0 ? (
                    <div className="terminal-placeholder">
                      $ _ <span className="cursor-blink">|</span>
                      <p style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                        {language === 'zh' ? '点击下方的“模拟故障降临”按钮开始排障流程' : 'Click the button below to start the troubleshooting simulation'}
                      </p>
                    </div>
                  ) : (
                    <>
                      {logs.map((log, index) => (
                        <div key={index} className={`terminal-line line-${log.type}`}>
                          {log.text}
                        </div>
                      ))}
                      <div className="terminal-line line-command">
                        $ <span className="cursor-blink">█</span>
                      </div>
                    </>
                  )}
                  <div ref={terminalEndRef} />
                </div>
              </div>

              {/* Interactive buttons */}
              <div className="simulator-actions">
                <button 
                  className="btn btn-primary btn-lg" 
                  onClick={startSimulation}
                  disabled={step !== 'idle'}
                >
                  {t('demoBtnSimulate')}
                </button>
                <button 
                  className="btn btn-secondary btn-lg" 
                  onClick={resetSimulation}
                  disabled={step === 'idle'}
                >
                  {t('demoBtnReset')}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .demo-section {
          background-color: var(--bg-primary);
          position: relative;
        }

        .demo-glow {
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          --accent-glow: rgba(0, 113, 227, 0.08);
        }

        html.dark .demo-glow {
          --accent-glow: rgba(0, 113, 227, 0.12);
        }

        .simulator-card {
          padding: 30px;
        }

        .simulator-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 32px;
        }

        @media (max-width: 1024px) {
          .simulator-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Visualizer Column */
        .topo-visualizer {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
          border-right: 1px solid var(--border-color);
          padding-right: 32px;
        }

        @media (max-width: 1024px) {
          .topo-visualizer {
            border-right: none;
            padding-right: 0;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 32px;
          }
        }

        .visualizer-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 24px;
        }

        .nodes-container {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          padding: 20px 0;
          min-height: 160px;
          overflow-x: auto;
          gap: 20px;
        }

        /* SVG Connections */
        .connections-svg {
          position: absolute;
          width: 100%;
          height: 100px;
          top: 50px;
          left: 0;
          pointer-events: none;
          z-index: 1;
        }

        .node-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 10px auto;
          background-color: var(--bg-secondary);
          color: var(--text-secondary);
          transition: var(--transition-smooth);
        }

        .node-icon svg {
          width: 20px;
          height: 20px;
        }

        /* Node status modifiers */
        .topo-node.active .node-icon.ai-icon {
          background-color: var(--accent-glow);
          color: var(--accent-color);
        }
        .topo-node.active .node-icon.dag-icon {
          background-color: rgba(0, 223, 216, 0.1);
          color: #00dfd8;
        }
        .topo-node.active .node-icon.exec-icon {
          background-color: rgba(144, 70, 231, 0.1);
          color: #9046e7;
        }

        .topo-node.success .node-icon {
          background-color: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .topo-node.error .node-icon {
          background-color: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .node-name {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .node-status {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-tertiary);
          letter-spacing: 0.05em;
        }

        .topo-node.error .node-status {
          color: #ef4444;
        }
        .topo-node.success .node-status {
          color: #10b981;
        }
        .topo-node.active .node-status {
          color: var(--accent-color);
        }

        /* Status Board */
        .simulator-status-board {
          margin-top: auto;
          width: 100%;
          padding: 16px;
          border-radius: 10px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .status-indicator-label {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--text-tertiary);
          letter-spacing: 0.05em;
        }

        .status-indicator-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          transition: var(--transition-smooth);
        }

        .status-indicator-value.status-alert { color: #ef4444; }
        .status-indicator-value.status-ai { color: var(--accent-color); }
        .status-indicator-value.status-dag { color: #00dfd8; }
        .status-indicator-value.status-exec { color: #9046e7; }
        .status-indicator-value.status-success { color: #10b981; }

        /* Terminal Column */
        .terminal-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .terminal-placeholder {
          text-align: left;
          color: var(--text-tertiary);
        }

        .terminal-line {
          margin-bottom: 6px;
          word-break: break-all;
        }

        .line-info { color: var(--terminal-text); }
        .line-warning { color: #f59e0b; }
        .line-error { color: #ef4444; }
        .line-success { color: #10b981; }
        .line-command { color: #2997ff; font-weight: bold; }

        .cursor-blink {
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }

        .simulator-actions {
          display: flex;
          gap: 16px;
        }

        .simulator-actions .btn {
          flex: 1;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </section>
  );
};

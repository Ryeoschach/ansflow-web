import React from 'react';
import { useApp } from '../context/AppContext';

export const Hero: React.FC = () => {
  const { t } = useApp();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, selector: string) => {
    e.preventDefault();
    if (window.location.hash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section hero-section">
      {/* Glow backgrounds */}
      <div className="glow-bg hero-glow-1 anim-pulse"></div>
      <div className="glow-bg hero-glow-2 anim-pulse" style={{ animationDelay: '-4s' }}></div>

      <div className="container hero-container">
        {/* Active Badge */}
        <div className="status-badge anim-float">
          <span className="badge-ping"></span>
          <span className="badge-text">{t('heroStatusActive')}</span>
        </div>

        {/* Pre-title */}
        <p className="hero-pre-title">{t('heroPreTitle')}</p>

        {/* Hero Title */}
        <h1 className="hero-title">
          {t('heroTitle').split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && <br />}
              {line.includes('自愈') || line.includes('Auto-healing') ? (
                <span className="gradient-text gradient-ai">{line}</span>
              ) : line.includes('流水线') || line.includes('pipelines') ? (
                <span className="gradient-text gradient-dag">{line}</span>
              ) : (
                line
              )}
            </React.Fragment>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">{t('heroSubtitle')}</p>

        {/* Action Buttons */}
        <div className="hero-actions">
          <a href="#demo" className="btn btn-primary btn-lg" onClick={(e) => scrollToSection(e, '#demo')}>
            {t('heroPrimaryBtn')}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#features" className="btn btn-secondary btn-lg" onClick={(e) => scrollToSection(e, '#features')}>
            {t('heroSecondaryBtn')}
          </a>
        </div>

        {/* CSS-drawn visual grid backdrop wrapper (Tech Grid) */}
        <div className="tech-grid-wrapper">
          <div className="tech-grid"></div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding-top: 180px;
          padding-bottom: 120px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 85vh;
        }

        .hero-glow-1 {
          top: -100px;
          left: 5%;
          --accent-glow: rgba(144, 70, 231, 0.15);
        }

        html.dark .hero-glow-1 {
          --accent-glow: rgba(144, 70, 231, 0.25);
        }

        .hero-glow-2 {
          bottom: 50px;
          right: 5%;
          --accent-glow: rgba(41, 151, 255, 0.15);
        }

        html.dark .hero-glow-2 {
          --accent-glow: rgba(41, 151, 255, 0.25);
        }

        .hero-container {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Status Badge */
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 9999px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          margin-bottom: 32px;
          box-shadow: var(--card-shadow);
        }

        .badge-ping {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #10b981;
          position: relative;
        }

        .badge-ping::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border-radius: 50%;
          background-color: #10b981;
          animation: radar 2s infinite ease-out;
        }

        .badge-text {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.02em;
        }

        /* Titles */
        .hero-pre-title {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--accent-color);
          margin-bottom: 16px;
        }

        .hero-title {
          font-size: 4.5rem;
          line-height: 1.08;
          font-weight: 800;
          letter-spacing: -0.04em;
          margin-bottom: 24px;
          white-space: pre-line;
          max-width: 900px;
        }

        @media (max-width: 1024px) {
          .hero-title {
            font-size: 3.5rem;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
        }

        .hero-subtitle {
          font-size: 1.35rem;
          line-height: 1.5;
          color: var(--text-secondary);
          max-width: 750px;
          margin-bottom: 40px;
          font-weight: 400;
        }

        @media (max-width: 768px) {
          .hero-subtitle {
            font-size: 1.1rem;
          }
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-bottom: 60px;
        }

        @media (max-width: 480px) {
          .hero-actions {
            flex-direction: column;
            width: 100%;
            padding: 0 20px;
          }
          .hero-actions .btn {
            width: 100%;
          }
        }

        .btn-lg {
          padding: 14px 32px;
          font-size: 1.05rem;
        }

        /* Tech Grid visual decoration */
        .tech-grid-wrapper {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          overflow: hidden;
          z-index: -1;
          opacity: 0.35;
          pointer-events: none;
        }

        .tech-grid {
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          background-image: 
            linear-gradient(var(--border-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--border-color) 1px, transparent 1px);
          background-size: 80px 80px;
          transform: perspective(500px) rotateX(60deg) translateY(-200px);
          mask-image: radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%);
          -webkit-mask-image: radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%);
        }
      `}</style>
    </section>
  );
};

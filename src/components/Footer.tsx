import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { t, setView } = useApp();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, selector: string) => {
    e.preventDefault();
    if (window.location.hash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }
    setView('home');
    window.setTimeout(() => {
      document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.location.hash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        
        {/* Brand column */}
        <div className="footer-brand">
          <a href="#" className="footer-logo" onClick={scrollToTop}>
            <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="logo-text">AnsFlow</span>
          </a>
          <p className="footer-desc">{t('footerSlogan')}</p>
        </div>

        {/* Links columns */}
        <div className="footer-links-grid">
          <div className="footer-col">
            <h4 className="footer-col-title">{t('footerProduct')}</h4>
            <a href="#features" className="footer-link" onClick={(e) => scrollToSection(e, '#features')}>{t('navFeatures')}</a>
            <a href="#demo" className="footer-link" onClick={(e) => scrollToSection(e, '#demo')}>{t('navDemo')}</a>
            <a href="#" className="footer-link" onClick={scrollToTop}>AI Engine</a>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">{t('footerResources')}</h4>
            <a href="#" className="footer-link">Documentation</a>
            <a href="#" className="footer-link">API Reference</a>
            <a href="#" className="footer-link">Changelog</a>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">{t('footerCompany')}</h4>
            <a href="#" className="footer-link">About Us</a>
            <a href="#" className="footer-link">Careers</a>
            <a href="#" className="footer-link">Privacy Policy</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="footer-copy">{t('footerRights')}</p>
          <div className="footer-socials">
            <a href="https://github.com/Ryeoschach/ansflow-backend" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          padding: 80px 0 40px 0;
          margin-top: auto;
          position: relative;
          z-index: 10;
        }

        .footer-container {
          display: flex;
          justify-content: space-between;
          margin-bottom: 60px;
          gap: 60px;
        }

        @media (max-width: 768px) {
          .footer-container {
            flex-direction: column;
            gap: 40px;
          }
        }

        .footer-brand {
          max-width: 320px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--text-primary);
          margin-bottom: 20px;
        }

        .footer-logo .logo-icon {
          width: 26px;
          height: 26px;
          color: var(--accent-color);
        }

        .footer-logo .logo-text {
          font-family: var(--font-title);
          font-weight: 700;
          font-size: 1.15rem;
          letter-spacing: -0.03em;
        }

        .footer-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .footer-links-grid {
          display: flex;
          gap: 80px;
        }

        @media (max-width: 1024px) {
          .footer-links-grid {
            gap: 40px;
          }
        }

        @media (max-width: 480px) {
          .footer-links-grid {
            flex-direction: column;
            gap: 30px;
          }
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-width: 120px;
        }

        .footer-col-title {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .footer-link {
          text-decoration: none;
          color: var(--text-secondary);
          font-size: 0.9rem;
          transition: var(--transition-smooth);
        }

        .footer-link:hover {
          color: var(--text-primary);
        }

        .footer-bottom {
          border-top: 1px solid var(--border-color);
          padding-top: 40px;
        }

        .footer-bottom-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        @media (max-width: 768px) {
          .footer-bottom-container {
            flex-direction: column-reverse;
            gap: 20px;
            text-align: center;
          }
        }

        .footer-copy {
          font-size: 0.85rem;
          color: var(--text-tertiary);
        }

        .footer-socials {
          display: flex;
          gap: 16px;
        }

        .social-link {
          color: var(--text-secondary);
          transition: var(--transition-smooth);
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid var(--border-color);
        }

        .social-link:hover {
          background-color: var(--bg-primary);
          color: var(--text-primary);
          border-color: var(--text-tertiary);
        }

        .social-link svg {
          width: 16px;
          height: 16px;
        }
      `}</style>
    </footer>
  );
};

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { theme, language, view, toggleTheme, toggleLanguage, setView, t } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (view === 'docs') {
      setView('home');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`glass-effect header-nav ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        {/* LOGO */}
        <a href="#" className="logo-area" onClick={(e) => { e.preventDefault(); setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}>
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="logo-text">AnsFlow</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <a href="#features" className="nav-link" onClick={(e) => handleNavClick(e, '#features')}>{t('navFeatures')}</a>
          <a href="#demo" className="nav-link" onClick={(e) => handleNavClick(e, '#demo')}>{t('navDemo')}</a>
          <a href="#architecture" className="nav-link" onClick={(e) => handleNavClick(e, '#architecture')}>{t('navArchitecture')}</a>
          <a href="#docs" className={`nav-link ${view === 'docs' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setView('docs'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{t('navDocs')}</a>
        </nav>

        {/* Actions Button Group */}
        <div className="action-group">
          {/* Language Switcher */}
          <button className="icon-btn" onClick={toggleLanguage} aria-label="Toggle Language" title={language === 'zh' ? 'Switch to English' : '切换至中文'}>
            <span className="lang-text">{language === 'zh' ? 'EN' : '中'}</span>
          </button>

          {/* Theme Toggler */}
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? (
              // Sun icon for dark mode (click to light)
              <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 18.36l1.42-1.42M18.36 5.22l-1.42 1.42" />
              </svg>
            ) : (
              // Moon icon for light mode (click to dark)
              <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <a href="#demo" className="btn btn-primary btn-sm desktop-only" onClick={(e) => handleNavClick(e, '#demo')}>
            {t('navGetStarted')}
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div className={`mobile-dropdown ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <a href="#features" className="mobile-nav-link" onClick={(e) => handleNavClick(e, '#features')}>{t('navFeatures')}</a>
          <a href="#demo" className="mobile-nav-link" onClick={(e) => handleNavClick(e, '#demo')}>{t('navDemo')}</a>
          <a href="#architecture" className="mobile-nav-link" onClick={(e) => handleNavClick(e, '#architecture')}>{t('navArchitecture')}</a>
          <a href="#docs" className={`mobile-nav-link ${view === 'docs' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setView('docs'); window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}>{t('navDocs')}</a>
          <a href="#demo" className="btn btn-primary mobile-nav-btn" onClick={(e) => handleNavClick(e, '#demo')}>
            {t('navGetStarted')}
          </a>
        </nav>
      </div>

      <style>{`
        .header-nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          transition: var(--transition-smooth);
          height: 64px;
        }
        
        .header-nav.scrolled {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border-bottom: 1px solid var(--border-color);
        }

        html.dark .header-nav.scrolled {
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }

        .logo-area {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--text-primary);
          transition: var(--transition-smooth);
        }

        .logo-area:hover {
          opacity: 0.9;
        }

        .logo-icon {
          width: 28px;
          height: 28px;
          color: var(--accent-color);
        }

        .logo-text {
          font-family: var(--font-title);
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: -0.03em;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-link {
          text-decoration: none;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
          transition: var(--transition-smooth);
        }

        .nav-link:hover {
          color: var(--text-primary);
        }

        .nav-link.active {
          color: var(--accent-color);
          font-weight: 600;
        }

        .action-group {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .icon-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: var(--transition-smooth);
          border: 1px solid transparent;
        }

        .icon-btn:hover {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          border-color: var(--border-color);
        }

        .lang-text {
          font-size: 0.85rem;
          font-weight: 600;
        }

        .theme-icon {
          width: 20px;
          height: 20px;
        }

        .btn-sm {
          padding: 8px 18px;
          font-size: 0.85rem;
        }

        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 24px;
          height: 18px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 1001;
        }

        .mobile-menu-btn span {
          width: 100%;
          height: 2px;
          background-color: var(--text-primary);
          transition: var(--transition-smooth);
          transform-origin: left;
        }

        .mobile-menu-btn.open span:first-child {
          transform: rotate(45deg);
        }

        .mobile-menu-btn.open span:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-btn.open span:last-child {
          transform: rotate(-45deg);
        }

        .mobile-dropdown {
          display: none;
          position: fixed;
          top: 64px;
          left: 0;
          width: 100%;
          background-color: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
          z-index: 999;
          transform: translateY(-100%);
          opacity: 0;
          transition: var(--transition-smooth);
        }

        .mobile-dropdown.open {
          transform: translateY(0);
          opacity: 1;
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          padding: 24px;
          gap: 20px;
        }

        .mobile-nav-link {
          text-decoration: none;
          color: var(--text-primary);
          font-size: 1.1rem;
          font-weight: 600;
          padding: 8px 0;
          border-bottom: 1px solid var(--border-color);
        }

        .mobile-nav-link.active {
          color: var(--accent-color);
          border-bottom-color: var(--accent-color);
        }

        .mobile-nav-btn {
          margin-top: 10px;
          width: 100%;
        }

        @media (max-width: 768px) {
          .desktop-nav, .desktop-only {
            display: none;
          }
          .mobile-menu-btn {
            display: flex;
          }
          .mobile-dropdown {
            display: block;
          }
        }
      `}</style>
    </header>
  );
};

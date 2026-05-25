import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';
import type { TranslationSchema } from '../i18n/translations';

type Theme = 'light' | 'dark';
type Language = 'zh' | 'en';

type View = 'home' | 'docs';

interface AppContextType {
  theme: Theme;
  language: Language;
  view: View;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  setView: (view: View) => void;
  t: (key: keyof TranslationSchema) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [view, setView] = useState<View>('home');
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('ansflow_theme') as Theme;
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    // Check prefers-color-scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('ansflow_lang') as Language;
    if (savedLang === 'zh' || savedLang === 'en') return savedLang;
    // Check browser language
    const browserLang = navigator.language.toLowerCase();
    return browserLang.includes('zh') ? 'zh' : 'en';
  });

  // Keep HTML element tag class in sync
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('ansflow_theme', theme);
  }, [theme]);

  // Handle prefers-color-scheme runtime changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only adapt if user hasn't explicitly chosen theme in this session
      const savedTheme = localStorage.getItem('ansflow_theme');
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleLanguage = () => {
    setLanguage(prev => {
      const newLang = prev === 'zh' ? 'en' : 'zh';
      localStorage.setItem('ansflow_lang', newLang);
      return newLang;
    });
  };

  const t = (key: keyof TranslationSchema): string => {
    const langTrans = translations[language];
    return langTrans[key] || translations['en'][key] || String(key);
  };

  return (
    <AppContext.Provider value={{ theme, language, view, toggleTheme, toggleLanguage, setView, t }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppContextProvider');
  }
  return context;
};

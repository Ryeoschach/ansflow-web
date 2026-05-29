import React from 'react';
import { AppContextProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Architecture } from './components/Architecture';
import { InteractiveDemo } from './components/InteractiveDemo';
import { Docs } from './components/Docs';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { view } = useApp();

  React.useLayoutEffect(() => {
    if (['#features', '#architecture', '#demo'].includes(window.location.hash)) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    const frameId = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        {view === 'home' ? (
          <>
            <Hero />
            <Features />
            <Architecture />
            <InteractiveDemo />
          </>
        ) : (
          <Docs />
        )}
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <AppContextProvider>
      <AppContent />
    </AppContextProvider>
  );
}

export default App;

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

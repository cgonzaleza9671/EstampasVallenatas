
import React, { useState } from 'react';
import { ViewState } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Memoria from './pages/Memoria';
import About from './pages/About';
import Locations from './pages/Locations';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');

  const renderView = () => {
    switch (currentView) {
      case 'HOME':
        return <Home setView={setCurrentView} />;
      case 'MEMORIA':
        return <Memoria />;
      case 'ABOUT':
        return <About />;
      case 'LOCATIONS':
        return <Locations />;
      default:
        return <Home setView={setCurrentView} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900">
      <Header currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      <Footer />
    </div>
  );
};

export default App;

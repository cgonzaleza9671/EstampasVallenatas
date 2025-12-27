
import React, { useState } from 'react';
import { ViewState } from '../types';
import { Menu, X } from 'lucide-react';
import { Logo } from './CustomIcons';

interface HeaderProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { label: string; value: ViewState }[] = [
    { label: 'Inicio', value: 'HOME' },
    { label: 'La Memoria del Acordeón', value: 'MEMORIA' },
    { label: 'Acerca del Autor', value: 'ABOUT' },
    { label: 'El Vallenato cerca a ti', value: 'LOCATIONS' },
  ];

  return (
    <nav className="bg-white border-b border-vallenato-beige sticky top-0 z-[100] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          {/* Logo - Sin modificaciones, solo contenedor con hover suave */}
          <div 
            className="flex-shrink-0 cursor-pointer transition-opacity hover:opacity-80" 
            onClick={() => setView('HOME')}
          >
             <Logo className="h-14 w-auto" />
          </div>
          
          {/* Navegación Desktop - Visual Moderna */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setView(item.value)}
                className={`relative px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] transition-all duration-300 group ${
                  currentView === item.value
                    ? 'text-vallenato-red'
                    : 'text-vallenato-blue hover:text-vallenato-red'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                
                {/* Indicador inferior moderno */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-vallenato-red transition-all duration-300 ${
                  currentView === item.value ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-50'
                }`} />
                
                {/* Micro-punto para vista activa */}
                {currentView === item.value && (
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-vallenato-mustard rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Botón Móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-vallenato-blue hover:text-vallenato-red p-2 bg-vallenato-cream rounded-xl transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil - Animación de Despliegue Suave */}
      <div className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 origin-top overflow-hidden ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white border-t border-vallenato-beige shadow-2xl px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setView(item.value);
                setIsOpen(false);
              }}
              className={`flex items-center w-full px-6 py-4 text-sm font-bold uppercase tracking-widest rounded-2xl transition-all ${
                currentView === item.value
                  ? 'bg-vallenato-red text-white shadow-md translate-x-2'
                  : 'text-vallenato-blue hover:bg-vallenato-beige'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full mr-4 ${
                currentView === item.value ? 'bg-vallenato-mustard' : 'bg-vallenato-beige'
              }`} />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;

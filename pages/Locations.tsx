
import React from 'react';
import { MapPin, ShoppingBag, Ticket } from 'lucide-react';

const Locations: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block p-4 bg-gray-200 rounded-full mb-6">
          <MapPin className="w-12 h-12 text-gray-500" />
        </div>
        
        <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4">El Vallenato cerca a ti</h1>
        <p className="text-xl text-gray-500 mb-12">
          Estamos construyendo la guía más completa de lugares vallenatos. <br/>
          Pronto encontrarás aquí:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="flex justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-vallenato-blue" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Tiendas de Música</h3>
            <p className="text-gray-500 text-sm">
              Encuentra dónde comprar los mejores LPs, instrumentos y souvenirs.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="flex justify-center mb-4">
              <Ticket className="w-10 h-10 text-vallenato-red" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Eventos Vallenatos</h3>
            <p className="text-gray-500 text-sm">
              Calendario de conciertos, parrandas y festivales cercanos a ti.
            </p>
          </div>
        </div>

        <div className="mt-16 inline-block px-6 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 font-mono text-sm">
          Módulo en construcción
        </div>
      </div>
    </div>
  );
};

export default Locations;

import React from 'react';
import { MapPin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-vallenato-blue text-white py-12 border-t-4 border-vallenato-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1: Brand */}
          <div>
            <h3 className="font-serif text-2xl mb-4 text-vallenato-mustard">Estampas Vallenatas</h3>
            <p className="text-gray-300">
              Preservando la esencia de nuestros juglares y llevando el folclor a cada rincón del mundo.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col space-y-2">
            <h4 className="font-bold text-lg mb-2">Enlaces Rápidos</h4>
            <span className="text-gray-300 hover:text-white cursor-pointer transition-colors">Inicio</span>
            <span className="text-gray-300 hover:text-white cursor-pointer transition-colors">La Memoria del Acordeón</span>
            <span className="text-gray-300 hover:text-white cursor-pointer transition-colors">Sobre el Autor</span>
            <span className="text-gray-300 hover:text-white cursor-pointer transition-colors">El Vallenato Cerca de ti</span>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contacto</h4>
            <div className="space-y-6">
              
              {/* Contact 1 */}
              <div className="group">
                <p className="font-bold text-vallenato-mustard text-lg">Camilo González Abusaid</p>
                <div className="flex items-center mt-1 text-gray-300 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href="mailto:c.gonzaleza9671@gmail.com" className="text-sm hover:underline">c.gonzaleza9671@gmail.com</a>
                </div>
                <div className="flex items-center mt-1 text-gray-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">Madrid, España</span>
                </div>
              </div>

              {/* Contact 2 */}
              <div className="group">
                <p className="font-bold text-vallenato-mustard text-lg">Álvaro González Pimienta</p>
                <div className="flex items-center mt-1 text-gray-300 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href="mailto:alvarogonzalez1945@hotmail.com" className="text-sm hover:underline">alvarogonzalez1945@hotmail.com</a>
                </div>
                <div className="flex items-center mt-1 text-gray-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">Bogotá, Colombia</span>
                </div>
              </div>

            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
           © {new Date().getFullYear()} Estampas Vallenatas. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
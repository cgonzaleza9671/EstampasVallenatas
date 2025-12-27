
import React from 'react';
import { MediaItem, MediaType } from '../types';
import { X, Calendar, Clock, User, Music, Disc, Video } from 'lucide-react';

interface MediaModalProps {
  item: MediaItem | null;
  onClose: () => void;
}

const MediaModal: React.FC<MediaModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const isVideo = item.type === MediaType.VIDEO || !!item.video_url;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className={`relative bg-white rounded-3xl shadow-2xl ${isVideo ? 'max-w-5xl' : 'max-w-2xl'} w-full max-h-[95vh] overflow-y-auto animate-fade-in-up border-b-8 border-vallenato-mustard`}>
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
               <div className="bg-vallenato-cream p-4 rounded-2xl text-vallenato-red">
                  {isVideo ? <Video size={32} /> : <Music size={32} />}
               </div>
               <div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-vallenato-blue leading-tight">{item.titulo}</h2>
                  <div className="flex items-center text-vallenato-red font-bold text-lg mt-1">
                    {!isVideo && <Disc className="w-5 h-5 mr-2 animate-spin-slow" />}
                    {isVideo ? item.autor : (item.acordeonero || item.autor)}
                  </div>
               </div>
            </div>
            <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-500 transition-colors shadow-sm"><X /></button>
          </div>

          <div className="mb-8">
            {isVideo ? (
              <div className="bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video w-full border-4 border-vallenato-blue group relative">
                <video 
                  controls 
                  autoPlay
                  src={item.video_url} 
                  poster={item.thumbnail_url}
                  className="w-full h-full"
                >
                  Tu navegador no soporta el reproductor de video.
                </video>
              </div>
            ) : (
              <div className="bg-vallenato-blue p-8 rounded-3xl shadow-xl">
                <audio 
                  controls 
                  autoPlay={false}
                  src={item.audio_url} 
                  className="w-full h-12"
                >
                  Tu navegador no soporta el reproductor de audio.
                </audio>
                <div className="mt-4 text-center">
                  <p className="text-[10px] font-bold text-white uppercase tracking-widest opacity-60">
                    Transmitiendo desde el archivo digital de Estampas Vallenatas
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 bg-vallenato-beige/50 p-5 rounded-2xl text-sm border border-vallenato-mustard/10">
            <div className="flex items-center"><User className="w-4 h-4 mr-2 text-vallenato-blue" /> <span className="truncate font-medium">Autor: {item.autor}</span></div>
            <div className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-vallenato-blue" /> {formatDate(item.fecha)}</div>
            <div className="flex items-center"><Clock className="w-4 h-4 mr-2 text-vallenato-blue" /> {item.duracion}</div>
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-vallenato-blue mb-3 flex items-center uppercase text-xs tracking-widest">
               <span className="w-2 h-2 bg-vallenato-red rounded-full mr-2"></span>
               Relato de la Estampa:
            </h4>
            <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-vallenato-mustard">
               <p className="text-gray-700 italic leading-relaxed font-serif text-lg">"{item.descripcion}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaModal;


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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className={`relative bg-white rounded-3xl shadow-2xl ${isVideo ? 'max-w-5xl' : 'max-w-2xl'} w-full max-h-[95vh] overflow-y-auto animate-fade-in-up border-b-8 border-vallenato-mustard`}>
        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex justify-between items-start mb-4 sm:mb-6">
            <div className="flex items-center space-x-3 sm:space-x-4">
               <div className="bg-vallenato-cream p-3 sm:p-4 rounded-2xl text-vallenato-red flex-shrink-0">
                  {isVideo ? <Video className="w-6 h-6 sm:w-8 sm:h-8" /> : <Music className="w-6 h-6 sm:w-8 sm:h-8" />}
               </div>
               <div>
                  <h2 className="text-xl md:text-3xl font-serif font-bold text-vallenato-blue leading-tight line-clamp-2">{item.titulo}</h2>
                  <div className="flex items-center text-vallenato-red font-bold text-base md:text-lg mt-0.5">
                    {!isVideo && <Disc className="w-4 h-4 mr-2 animate-spin-slow" />}
                    <span className="truncate max-w-[200px] sm:max-w-none">
                        {isVideo ? item.autor : (item.acordeonero || item.autor)}
                    </span>
                  </div>
               </div>
            </div>
            <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-500 transition-colors shadow-sm flex-shrink-0"><X size={20} /></button>
          </div>

          <div className="mb-6 sm:mb-8">
            {isVideo ? (
              <div className="bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video w-full border-2 sm:border-4 border-vallenato-blue group relative">
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
              <div className="bg-vallenato-blue p-4 sm:p-8 rounded-3xl shadow-xl">
                <audio 
                  controls 
                  autoPlay={false}
                  src={item.audio_url} 
                  className="w-full h-10 sm:h-12"
                >
                  Tu navegador no soporta el reproductor de audio.
                </audio>
                <div className="mt-3 sm:mt-4 text-center">
                  <p className="text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-widest opacity-60">
                    Archivo digital de Estampas Vallenatas
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 mb-6 bg-vallenato-beige/50 p-3 sm:p-5 rounded-2xl text-[11px] sm:text-sm border border-vallenato-mustard/10 font-medium">
            <div className="flex items-center"><User className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-vallenato-blue flex-shrink-0" /> <span className="truncate">Autor: {item.autor}</span></div>
            <div className="flex items-center"><Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-vallenato-blue flex-shrink-0" /> {formatDate(item.fecha)}</div>
            <div className="flex items-center"><Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-vallenato-blue flex-shrink-0" /> {item.duracion}</div>
          </div>

          <div className="mb-2">
            <h4 className="font-bold text-vallenato-blue mb-2 flex items-center uppercase text-[10px] tracking-widest">
               <span className="w-1.5 h-1.5 bg-vallenato-red rounded-full mr-2"></span>
               Relato de la Estampa:
            </h4>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-2xl border-l-4 border-vallenato-mustard">
               <p className="text-gray-700 italic leading-relaxed font-serif text-base md:text-lg">"{item.descripcion}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaModal;


import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { MediaItem, MediaType } from '../types';
import { Search, Loader2, Music, AlertCircle, Timer, Calendar, Video, User, Disc, ChevronDown, ChevronRight, Play, RefreshCw } from 'lucide-react';
import MediaModal from '../components/MediaModal';

const Memoria: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MediaType>(MediaType.AUDIO);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [searchAccordionist, setSearchAccordionist] = useState('');
  
  const [audioItems, setAudioItems] = useState<MediaItem[]>([]);
  const [videoItems, setVideoItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      // 1. Cargar Audios (Historial completo)
      const { data: audios, error: audioError } = await supabase
        .from('Audios')
        .select('id, titulo, autor, acordeonero, fecha, duracion, audio_url, descripcion')
        .order('fecha', { ascending: false });
      
      if (audioError) {
        throw new Error(audioError.message || "Error al cargar la tabla de Audios");
      }

      // 2. Cargar Videos (Máximo 3, sin campo acordeonero)
      let videoData: any[] = [];
      try {
        const { data: videos, error: videoError } = await supabase
          .from('Videos')
          .select('id, titulo, autor, fecha, duracion, video_url, thumbnail_url, descripcion')
          .order('fecha', { ascending: false })
          .limit(3);

        if (!videoError && videos) {
          videoData = videos;
        } else if (videoError) {
          console.warn("La tabla 'Videos' no respondió:", videoError.message);
        }
      } catch (vErr) {
        console.warn("Error interno al intentar acceder a 'Videos':", vErr);
      }
      
      setAudioItems((audios || []).map(item => ({ ...item, type: MediaType.AUDIO })));
      setVideoItems(videoData.map(item => ({ ...item, type: MediaType.VIDEO })));
      
    } catch (err: any) {
      console.error("Error al cargar Memoria:", err);
      const msg = err?.message || 
                  (err?.error_description) || 
                  (typeof err === 'string' ? err : "Error de conexión desconocido");
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currentItems = activeTab === MediaType.AUDIO ? audioItems : videoItems;

  const uniqueAuthors = Array.from(new Set(currentItems.map(i => i.autor).filter(Boolean))).sort();
  const uniqueAccordionists = Array.from(new Set(audioItems.map(i => i.acordeonero).filter(Boolean))).sort();

  const filteredItems = currentItems.filter(item => {
    if (activeTab === MediaType.VIDEO) {
      // Para videos: Solo filtro por Autor
      return searchAuthor === '' || item.autor === searchAuthor;
    } else {
      // Para audios: Título, Autor y Acordeonero
      const matchesTitle = (item.titulo?.toLowerCase() || '').includes(searchTitle.toLowerCase());
      const matchesAuthor = searchAuthor === '' || item.autor === searchAuthor;
      const matchesAccordionist = searchAccordionist === '' || item.acordeonero === searchAccordionist;
      return matchesTitle && matchesAuthor && matchesAccordionist;
    }
  });

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Sin fecha';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-vallenato-beige py-12 px-4 sm:px-6 lg:px-8">
      <MediaModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-vallenato-blue font-bold mb-4">La Memoria del Acordeón</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Explora el tesoro digital del folclor vallenato. Nuestra historia grabada para siempre.</p>
        </div>

        {/* Tabs and Filters */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-10 border-b-4 border-vallenato-mustard">
          <div className="flex flex-col gap-8">
            <div className="flex justify-center border-b border-gray-100 pb-2">
              <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl">
                <button 
                  onClick={() => { setActiveTab(MediaType.AUDIO); setSearchAuthor(''); setSearchAccordionist(''); setSearchTitle(''); }}
                  className={`flex items-center px-6 py-2 rounded-lg font-bold transition-all ${activeTab === MediaType.AUDIO ? 'bg-vallenato-blue text-white shadow-md' : 'text-gray-500 hover:text-vallenato-blue'}`}
                >
                  <Music className="w-4 h-4 mr-2" /> Audios
                </button>
                <button 
                  onClick={() => { setActiveTab(MediaType.VIDEO); setSearchAuthor(''); setSearchAccordionist(''); setSearchTitle(''); }}
                  className={`flex items-center px-6 py-2 rounded-lg font-bold transition-all ${activeTab === MediaType.VIDEO ? 'bg-vallenato-blue text-white shadow-md' : 'text-gray-500 hover:text-vallenato-blue'}`}
                >
                  <Video className="w-4 h-4 mr-2" /> Videos
                </button>
              </div>
            </div>

            <div className={`grid grid-cols-1 ${activeTab === MediaType.AUDIO ? 'md:grid-cols-3' : 'md:grid-cols-1 max-w-md mx-auto w-full'} gap-4`}>
              {activeTab === MediaType.AUDIO && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-vallenato-mustard w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Buscar por título..." 
                    value={searchTitle} 
                    onChange={e => setSearchTitle(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-vallenato-blue outline-none transition-all text-sm" 
                  />
                </div>
              )}
              
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-vallenato-mustard w-4 h-4 z-10" />
                <select 
                  value={searchAuthor} 
                  onChange={e => setSearchAuthor(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-vallenato-blue outline-none transition-all text-sm appearance-none cursor-pointer"
                >
                  <option value="">{activeTab === MediaType.VIDEO ? 'Filtrar por Autor' : 'Todos los Autores'}</option>
                  {uniqueAuthors.map(author => (
                    <option key={author} value={author}>{author}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              {activeTab === MediaType.AUDIO && (
                <div className="relative">
                  <Disc className="absolute left-3 top-1/2 -translate-y-1/2 text-vallenato-mustard w-4 h-4 z-10" />
                  <select 
                    value={searchAccordionist} 
                    onChange={e => setSearchAccordionist(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-vallenato-blue outline-none transition-all text-sm appearance-none cursor-pointer"
                  >
                    <option value="">Todos los Acordeoneros</option>
                    {uniqueAccordionists.map(acc => (
                      <option key={acc} value={acc}>{acc}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-24 text-vallenato-blue">
            <Loader2 className="w-16 h-16 animate-spin mb-4" />
            <p className="font-serif italic text-xl">Consultando los archivos del Magdalena Grande...</p>
          </div>
        ) : errorMessage ? (
          <div className="bg-red-50 border-2 border-red-200 p-12 rounded-3xl text-center shadow-lg animate-fade-in-up">
            <AlertCircle className="w-16 h-16 mx-auto text-red-400 mb-4" />
            <p className="text-red-700 font-bold text-xl mb-2">Error de conexión</p>
            <p className="text-red-500 text-sm mb-8 bg-white/80 p-3 rounded-xl inline-block font-mono max-w-full overflow-hidden border border-red-100">
              {errorMessage}
            </p>
            <div>
              <button 
                onClick={fetchData} 
                className="inline-flex items-center px-8 py-3 bg-red-600 text-white rounded-full font-bold shadow-xl hover:bg-red-700 transition-all active:scale-95"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Reintentar carga
              </button>
            </div>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl shadow-md overflow-hidden border-2 border-transparent flex flex-col hover:border-vallenato-mustard hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
              >
                {activeTab === MediaType.VIDEO ? (
                  <div className="flex flex-col h-full">
                    <div className="relative bg-black aspect-video w-full overflow-hidden group-hover:brightness-110 transition-all">
                       <video 
                          controls 
                          src={item.video_url} 
                          poster={item.thumbnail_url}
                          className="w-full h-full object-cover"
                          preload="none"
                       />
                       <div className="absolute top-4 right-4 z-10">
                          <button 
                            onClick={() => setSelectedItem(item)}
                            className="p-2 bg-vallenato-blue/80 text-white rounded-full backdrop-blur-sm hover:bg-vallenato-red transition-colors shadow-lg"
                            title="Expandir relato"
                          >
                            <Play className="w-4 h-4 fill-current" />
                          </button>
                       </div>
                    </div>
                    <div onClick={() => setSelectedItem(item)} className="cursor-pointer p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold text-vallenato-blue group-hover:text-vallenato-red transition-colors mb-2">
                        {item.titulo}
                      </h3>
                      <p className="text-vallenato-red font-bold text-sm mb-4">
                        {item.autor}
                      </p>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-4">
                        <span className="flex items-center bg-gray-50 px-2 py-1 rounded"><Calendar className="w-3 h-3 mr-1" /> {formatDate(item.fecha)}</span>
                        <span className="flex items-center bg-gray-50 px-2 py-1 rounded"><Timer className="w-3 h-3 mr-1" /> {item.duracion}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 border-l-2 border-vallenato-cream pl-3">
                        {item.descripcion}
                      </p>
                      <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-50">
                        <span className="text-[10px] text-vallenato-blue font-bold uppercase tracking-widest flex items-center group-hover:text-vallenato-red">
                          Expandir Relato <ChevronRight className="ml-1 w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div onClick={() => setSelectedItem(item)} className="cursor-pointer flex flex-col h-full">
                    <div className="p-6 flex-grow">
                      <h3 className="text-xl font-bold text-vallenato-blue group-hover:text-vallenato-red transition-colors mb-2">
                        {item.titulo}
                      </h3>
                      <p className="text-vallenato-red font-bold text-sm mb-4">
                        {item.autor} {item.acordeonero && <><span className="text-gray-400 font-normal">ft.</span> {item.acordeonero}</>}
                      </p>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-4">
                        <span className="flex items-center bg-gray-50 px-2 py-1 rounded"><Calendar className="w-3 h-3 mr-1" /> {formatDate(item.fecha)}</span>
                        <span className="flex items-center bg-gray-50 px-2 py-1 rounded"><Timer className="w-3 h-3 mr-1" /> {item.duracion}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-6 line-clamp-3 border-l-2 border-vallenato-cream pl-3 group-hover:border-vallenato-mustard transition-colors">
                        {item.descripcion}
                      </p>
                      <div className="flex justify-end mt-auto">
                         <span className="text-[10px] text-vallenato-blue font-bold uppercase tracking-widest flex items-center group-hover:text-vallenato-red transition-colors">
                            Ver relato completo <ChevronRight className="ml-1 w-3 h-3" />
                         </span>
                      </div>
                    </div>
                    <div className="bg-vallenato-blue p-5" onClick={(e) => e.stopPropagation()}>
                      <audio controls src={item.audio_url || ''} className="w-full h-8 brightness-125" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-vallenato-mustard/20">
            <Music className="w-16 h-16 mx-auto mb-4 text-gray-200" />
            <p className="text-xl text-gray-400">No hay {activeTab === MediaType.VIDEO ? 'videos' : 'archivos'} que coincidan con la búsqueda.</p>
            <button 
              onClick={() => {setSearchTitle(''); setSearchAuthor(''); setSearchAccordionist('');}}
              className="mt-4 text-vallenato-blue font-bold hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Memoria;

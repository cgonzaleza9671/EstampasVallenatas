
import React, { useState, useEffect } from 'react';
import { ViewState, MediaItem } from '../types';
import { APP_IMAGES } from '../constants';
import { supabase } from '../supabase';
import { AccordionPlayIcon } from '../components/CustomIcons';
import { ChevronRight, Sparkles, AlertCircle, Youtube, ExternalLink, Headphones, Music } from 'lucide-react';
import MediaModal from '../components/MediaModal';

const calculateTimeLeft = () => {
  const festivalDate = new Date('2026-04-29T08:00:00-05:00');
  const now = new Date();
  const difference = festivalDate.getTime() - now.getTime();
  
  if (difference <= 0) return { months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const monthAvg = day * 30.44;
  
  const months = Math.floor(difference / monthAvg);
  const remainderAfterMonths = difference % monthAvg;
  
  const weeks = Math.floor(remainderAfterMonths / (day * 7));
  const remainderAfterWeeks = remainderAfterMonths % (day * 7);
  
  const days = Math.floor(remainderAfterWeeks / day);
  const hours = Math.floor((difference % day) / hour);
  const minutes = Math.floor((difference % hour) / minute);
  const seconds = Math.floor((difference % minute) / second);
  
  return { months, weeks, days, hours, minutes, seconds };
};

const RECOMMENDED_PLAYLISTS = [
  {
    id: '1',
    title: 'Vallenatos clásicos de clásicos',
    description: 'Sumérgete en los temas que perduran en el tiempo.',
    url: 'https://www.youtube.com/watch?v=MC1qqYo2fHk&list=PLGwRpZ4OHjUsyQVLJa0ao0Cz3qc5ri1OR',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg',
    color: 'border-[#FF0000]',
    bgColor: 'bg-red-50',
    platform: 'YouTube',
    icon: <Youtube className="w-5 h-5" />
  },
  {
    id: '2',
    title: 'Clásicos del Vallenato',
    description: 'Pasado y presente para parrandear',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DXbUPnz12C5bA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
    color: 'border-[#1DB954]',
    bgColor: 'bg-green-50',
    platform: 'Spotify',
    icon: <Music className="w-5 h-5" />
  },
  {
    id: '3',
    title: 'Vallenato Essentials',
    description: 'Lo mejor para enamorarse del vallenato',
    url: 'https://music.apple.com/us/playlist/vallenato-essentials/pl.4463cdc654a9494f8d933923e91b3a22',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Apple_Music_logo.svg',
    color: 'border-[#fa243c]',
    bgColor: 'bg-rose-50',
    platform: 'Apple Music',
    icon: <Headphones className="w-5 h-5" />
  }
];

const Home: React.FC<{ setView: (view: ViewState) => void }> = ({ setView }) => {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [latestAudios, setLatestAudios] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchAudios = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const { data, error: sbError } = await supabase
        .from('Audios')
        .select('*')
        .order('fecha', { ascending: false })
        .limit(3);
      
      if (sbError) throw sbError;
      setLatestAudios(data || []);
    } catch (err: any) {
      console.error("Error Audios:", err);
      setErrorMessage(err?.message || "Error al conectar con la tabla de Audios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudios();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    const imageTimer = setInterval(() => setCurrentHeroIndex(p => (p + 1) % APP_IMAGES.heroGallery.length), 5000);
    return () => { clearInterval(timer); clearInterval(imageTimer); };
  }, []);

  return (
    <div className="min-h-screen bg-vallenato-beige">
      <MediaModal item={selectedItem} onClose={() => setSelectedItem(null)} />

      {/* Banner de Novedad */}
      {!loading && latestAudios.length > 0 && (
        <div className="bg-vallenato-blue text-white py-4 px-6 shadow-2xl animate-fade-in-up border-b border-vallenato-mustard/30 relative z-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left relative z-10">
            <div className="flex items-center gap-3">
              <div className="bg-vallenato-mustard p-2 rounded-xl shadow-lg ring-4 ring-vallenato-mustard/20">
                <Sparkles className="w-5 h-5 text-vallenato-blue animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-black uppercase tracking-[0.25em] text-[10px] text-vallenato-mustard">Novedad Exclusiva</span>
                <span className="text-[9px] text-white/50 uppercase tracking-widest font-bold">Archivo Digital</span>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block mx-2"></div>
            <p className="text-sm md:text-lg font-medium tracking-tight">
              Escucha lo nuevo: 
              <span className="font-serif font-bold text-vallenato-mustard ml-2 hover:text-white transition-colors cursor-pointer underline underline-offset-8 decoration-vallenato-red/50" onClick={() => setSelectedItem(latestAudios[0])}>
                "{latestAudios[0].titulo}"
              </span>
            </p>
            <button 
              onClick={() => setSelectedItem(latestAudios[0])}
              className="mt-2 sm:mt-0 px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs font-bold uppercase tracking-tighter transition-all flex items-center group"
            >
              Escuchar <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-[450px] w-full overflow-hidden">
        {APP_IMAGES.heroGallery.map((img, index) => (
          <div key={index} className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentHeroIndex ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundImage: `url(${img})` }} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end items-start px-6 md:px-16 max-w-5xl pb-12 z-10">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            <span className="text-vallenato-mustard">El folclor del </span>
            <span className="text-vallenato-red">Vallenato </span>
            <span className="text-white">para el mundo</span>
          </h1>
          <p className="text-lg text-gray-100 font-light border-l-4 border-vallenato-mustard pl-4 bg-black/30 backdrop-blur-sm p-2">
            Preservando la riqueza musical de los grandes juglares de Colombia.
          </p>
        </div>
      </div>

      {/* Countdown Section */}
      <div className="bg-vallenato-blue text-white py-6 border-b-4 border-vallenato-mustard">
         <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
               <h2 className="text-2xl font-serif font-bold">59° Festival Vallenato</h2>
               <p className="text-gray-300 text-sm">Valledupar, 29 de Abril de 2026</p>
            </div>
            <div className="flex gap-2">
               {[
                 { v: timeLeft.months, l: 'Meses' }, 
                 { v: timeLeft.weeks, l: 'Sem' }, 
                 { v: timeLeft.days, l: 'Días' }, 
                 { v: String(timeLeft.hours).padStart(2,'0'), l: 'Horas' }, 
                 { v: String(timeLeft.minutes).padStart(2,'0'), l: 'Min' },
                 { v: String(timeLeft.seconds).padStart(2,'0'), l: 'Seg' }
               ].map((t, i) => (
                   <div key={i} className="flex flex-col items-center">
                      <div className="bg-white/10 rounded-lg w-10 md:w-12 h-10 md:h-12 flex items-center justify-center border border-white/20">
                         <span className="text-sm md:text-lg font-bold text-vallenato-mustard">{t.v}</span>
                      </div>
                      <span className="text-[7px] md:text-[8px] uppercase mt-1">{t.l}</span>
                   </div>
               ))}
            </div>
            <a href="https://festivalvallenato.com/" target="_blank" className="px-6 py-2 bg-vallenato-red font-bold text-sm rounded-full transition-transform hover:scale-105">Sitio Oficial</a>
         </div>
      </div>

      {/* Audios Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif text-vallenato-blue font-bold border-b-4 border-vallenato-red pb-2 mb-10">
          Estampas Recientes
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl h-64 animate-pulse border border-gray-100 shadow-sm" />
            ))}
          </div>
        ) : errorMessage ? (
          <div className="bg-red-50 border-2 border-red-200 p-12 rounded-3xl text-center">
            <AlertCircle className="w-16 h-16 mx-auto text-red-400 mb-4" />
            <p className="text-red-700 font-bold mb-4">{errorMessage}</p>
            <button onClick={fetchAudios} className="px-6 py-2 bg-red-600 text-white rounded-full font-bold">Reintentar</button>
          </div>
        ) : latestAudios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestAudios.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-vallenato-mustard transition-all cursor-pointer flex flex-col h-full" onClick={() => setSelectedItem(item)}>
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{item.titulo}</h3>
                      <p className="text-vallenato-red font-bold text-sm">{item.autor} <span className="text-gray-400 font-normal">ft.</span> {item.acordeonero}</p>
                    </div>
                    <AccordionPlayIcon className="w-10 h-8 text-vallenato-blue opacity-30" />
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3 border-l-2 border-vallenato-beige pl-3 mb-4">{item.descripcion}</p>
                </div>
                <div className="bg-vallenato-cream p-4 border-t" onClick={(e) => e.stopPropagation()}>
                  <audio controls src={item.audio_url || ''} className="w-full h-8" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl border-2 border-dashed border-vallenato-mustard/30 text-center">
            <p className="text-gray-400">No hay audios disponibles.</p>
          </div>
        )}
      </section>

      {/* NEW SECTION: PLAYLIST RECOMMENDATIONS */}
      <section className="py-24 px-4 md:px-8 bg-vallenato-cream/30 border-y border-vallenato-mustard/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 bg-vallenato-red/5 text-vallenato-red rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              <Music className="w-4 h-4 mr-2" /> Parranda Digital
            </div>
            <h2 className="text-4xl font-serif text-vallenato-blue font-bold">Recomendaciones de Playlist</h2>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              Disfruta de la mejor selección de música vallenata en tus plataformas favoritas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {RECOMMENDED_PLAYLISTS.map((playlist) => (
              <div 
                key={playlist.id}
                className={`group bg-white rounded-[2.5rem] overflow-hidden shadow-xl border-t-8 ${playlist.color} hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col`}
              >
                <div className={`relative h-64 flex items-center justify-center p-16 transition-colors duration-500 ${playlist.bgColor}`}>
                   <img 
                    src={playlist.image} 
                    alt={playlist.title}
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-md"
                   />
                   <div className="absolute bottom-6 left-6 flex items-center space-x-2">
                      <div className="p-2 bg-black/5 backdrop-blur-md rounded-lg">
                        {playlist.platform === 'YouTube' ? <Youtube className="w-5 h-5 text-gray-800" /> : <Music className="w-5 h-5 text-gray-800" />}
                      </div>
                      <span className="text-gray-800 text-[10px] font-bold uppercase tracking-widest">{playlist.platform}</span>
                   </div>
                </div>

                <div className="p-10 flex-grow flex flex-col">
                  <h3 className="text-2xl font-serif font-bold text-vallenato-blue mb-4 group-hover:text-vallenato-red transition-colors line-clamp-2">
                    {playlist.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-8 flex-grow">
                    {playlist.description}
                  </p>
                  
                  <a 
                    href={playlist.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-vallenato-blue text-white rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-vallenato-red shadow-lg active:scale-95 transition-all group/btn"
                  >
                    {playlist.icon}
                    <span>Abrir en {playlist.platform}</span>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 p-8 bg-vallenato-blue rounded-[3rem] text-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="text-left">
                  <h3 className="text-2xl text-white font-serif font-bold">¿Buscas algo más tradicional?</h3>
                  <p className="text-white/60">Explora nuestro archivo histórico completo en la sección de memoria.</p>
                </div>
                <button 
                  onClick={() => setView('MEMORIA')}
                  className="px-8 py-3 bg-vallenato-mustard text-vallenato-blue font-black rounded-full hover:bg-white hover:scale-105 transition-all shadow-xl"
                >
                  IR AL ARCHIVO DIGITAL
                </button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

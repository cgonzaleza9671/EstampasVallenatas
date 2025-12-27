
import { MediaItem, MediaType, NewsItem } from './types';

// ==========================================
// CONFIGURACIÓN DE IMÁGENES
// ==========================================
export const APP_IMAGES = {
  // Imagen de Estudio Musical / Ambiente Folclórico (Original)
  hero: "https://i.imgur.com/CyzoY4Y.jpeg", 
  
  // Galería para el carrusel del Home
  heroGallery: [
    "https://i.imgur.com/CyzoY4Y.jpeg", // Original
    "https://i.imgur.com/egByYqx.jpeg", // Nueva imagen 1
    "https://i.imgur.com/RgqMXVB.jpeg"  // Nueva imagen 2 (Corregida)
  ],
  
  // Imagen representativa para Álvaro González
  aboutMain: "https://i.imgur.com/cJhXAof.jpeg",      
  
  // Imagen representativa para Entrevista/Trabajo
  aboutSecondary: "https://i.imgur.com/b4hg52f.png"   
};

const LOREM_VALLENATO = "Esta obra maestra del folclor vallenato representa la esencia misma de la parranda tradicional. La composición narra vivencias profundas del autor, entrelazando la cotidianidad de la provincia con melodías que han trascendido generaciones. La ejecución del acordeón en esta pieza es magistral, demostrando por qué este instrumento es el alma de nuestra música. Se destacan los arreglos armónicos y la cadencia única que invita tanto a la reflexión como al baile. Es una pieza fundamental para entender la evolución del género, manteniendo intactas las raíces que lo vieron nacer en el Magdalena Grande. La letra es un poema costumbrista que describe paisajes, amores y desamores con una riqueza lírica inigualable, convirtiéndose en un tesoro cultural que debe ser preservado para las futuras generaciones. Escuchar esta canción es transportarse inmediatamente a un patio vallenato, bajo un árbol de mango, compartiendo historias y sentimientos hechos canción.";

export const MOCK_MEDIA: MediaItem[] = [
  {
    id: '1',
    titulo: 'La Gota Fría',
    autor: 'Emiliano Zuleta',
    acordeonero: 'Carlos Vives',
    descripcion: `La Gota Fría es quizás el vallenato más famoso a nivel internacional. Narra la legendaria rivalidad musical entre Emiliano Zuleta Baquero y Lorenzo Morales. ${LOREM_VALLENATO}`,
    isAccordionist: false,
    fecha: '1993',
    duracion: '04:15',
    type: MediaType.AUDIO,
    audio_url: ''
  },
  {
    id: '2',
    titulo: 'Matilde Lina',
    autor: 'Leandro Díaz',
    acordeonero: 'Alfredo Gutiérrez',
    descripcion: `Inspirada en el amor platónico de Leandro Díaz por Matilde Lina Negrete. A pesar de su ceguera, Leandro 'vio' con los ojos del alma. ${LOREM_VALLENATO}`,
    isAccordionist: true,
    fecha: '1970',
    duracion: '03:50',
    type: MediaType.AUDIO,
    audio_url: ''
  },
  {
    id: '3',
    titulo: 'El Cantor de Fonseca',
    autor: 'Carlos Huertas',
    acordeonero: 'Luis Enrique Martínez',
    descripcion: `Un himno a la tierra y a la bohemia. Carlos Huertas plasmó en esta canción el orgullo de ser guajiro y cantor. ${LOREM_VALLENATO}`,
    isAccordionist: true,
    fecha: '1965',
    duracion: '03:10',
    type: MediaType.AUDIO,
    audio_url: ''
  },
  {
    id: '4',
    titulo: 'Festival Vallenato 1980 (Presentación)',
    autor: 'Varios',
    acordeonero: 'Colacho Mendoza',
    descripcion: `Registro histórico de Nicolás 'Colacho' Mendoza, Rey de Reyes. En este video se aprecia la técnica pura del vallenato tradicional. ${LOREM_VALLENATO}`,
    isAccordionist: true,
    fecha: '1980',
    duracion: '10:00',
    type: MediaType.VIDEO,
    audio_url: ''
  },
  {
    id: '5',
    titulo: 'Entrevista Inédita',
    autor: 'N/A',
    acordeonero: 'Diomedes Díaz',
    descripcion: `Una conversación íntima con el Cacique de la Junta, donde revela detalles desconocidos sobre su proceso creativo y su vida personal. ${LOREM_VALLENATO}`,
    isAccordionist: false,
    fecha: '2010',
    duracion: '15:20',
    type: MediaType.VIDEO,
    audio_url: ''
  },
  {
    id: '6',
    titulo: 'La Plata',
    autor: 'Calixto Ochoa',
    acordeonero: 'Diomedes Díaz',
    descripcion: `Un clásico parrandero. ${LOREM_VALLENATO}`,
    isAccordionist: false,
    fecha: '1994',
    duracion: '04:20',
    type: MediaType.AUDIO,
    audio_url: ''
  },
  {
    id: '7',
    titulo: 'Duelo de Acordeones',
    autor: 'Tradicional',
    acordeonero: 'Alejo Durán',
    descripcion: `El primer rey vallenato demostrando su nota. ${LOREM_VALLENATO}`,
    isAccordionist: true,
    fecha: '1968',
    duracion: '03:45',
    type: MediaType.AUDIO,
    audio_url: ''
  }
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Homenaje a los juglares en Valledupar',
    date: '24 Oct 2023',
    source: 'El Heraldo',
    excerpt: 'La capital del Cesar se prepara para una nueva edición del festival...',
    content: `La capital del Cesar se viste de gala para honrar a los grandes maestros del acordeón. En una ceremonia emotiva realizada en la Plaza Alfonso López, se rindió tributo a los juglares que cimentaron las bases de nuestro folclor.
    
    El evento contó con la participación de reyes vallenatos de todas las generaciones, quienes interpretaron los clásicos que han hecho historia. "Es fundamental que las nuevas generaciones conozcan de dónde venimos para saber hacia dónde va nuestra música", afirmó el presidente de la fundación.
    
    Durante la jornada se anunciaron nuevos programas de formación musical para niños de bajos recursos, asegurando así el relevo generacional de la tradición vallenata.`,
    url: '#'
  },
  {
    id: '2',
    title: 'El acordeón: Patrimonio cultural inmaterial',
    date: '22 Oct 2023',
    source: 'El Tiempo',
    excerpt: 'La UNESCO reafirma la importancia del vallenato tradicional en la historia...',
    content: `En un comunicado reciente, la UNESCO ha reiterado la necesidad de salvaguardar el vallenato tradicional como Patrimonio Cultural Inmaterial de la Humanidad. La organización destaca que el vallenato no es solo un género musical, sino un vehículo de historia oral y cohesión social en la región del Magdalena Grande.
    
    Se hizo un llamado a preservar los cuatro aires tradicionales: paseo, merengue, son y puya, frente a las fusiones comerciales modernas que amenazan con diluir la esencia del género.
    
    Expertos culturales y folcloristas se reunirán el próximo mes para establecer una hoja de ruta que garantice la preservación de las raíces auténticas del vallenato.`,
    url: '#'
  },
  {
    id: '3',
    title: 'Nuevas voces del vallenato femenino',
    date: '20 Oct 2023',
    source: 'Semana',
    excerpt: 'Un reportaje especial sobre las mujeres que están revolucionando el género...',
    content: `Históricamente dominado por hombres, el vallenato está viviendo una revolución silenciosa pero poderosa protagonizada por mujeres. Desde acordeoneras virtuosas hasta cantautoras con una pluma exquisita, las mujeres están reclamando su espacio en las tarimas y en los estudios de grabación.
    
    El Encuentro Vallenato Femenino (EVAFE) ha sido una plataforma crucial para este movimiento, visibilizando talentos que antes permanecían en el anonimato. "El acordeón no tiene género, tiene sentimiento", comenta una de las participantes, demostrando que la destreza y la pasión no distinguen entre hombres y mujeres.`,
    url: '#'
  }
];
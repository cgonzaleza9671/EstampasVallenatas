
// Definición de tipos de medios para el archivo digital
export enum MediaType {
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
}

export interface MediaItem {
  id: string;
  titulo: string;
  autor: string;
  acordeonero: string;
  fecha: string;
  duracion: string;
  audio_url?: string;
  video_url?: string;
  thumbnail_url?: string;
  descripcion: string;
  // Opcionales por si no existen en la tabla física de Supabase
  isAccordionist?: boolean;
  type?: MediaType;
}

// Added NewsItem interface to resolve type errors in components and constants
export interface NewsItem {
  id: string;
  title: string;
  date: string;
  source: string;
  excerpt: string;
  content: string;
  url: string;
}

export type ViewState = 'HOME' | 'MEMORIA' | 'ABOUT' | 'LOCATIONS';
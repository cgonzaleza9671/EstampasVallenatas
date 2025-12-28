import { createClient } from '@supabase/supabase-js';

// Función segura para obtener variables de entorno o valores por defecto
const getEnv = (key: string, fallback: string) => {
  try {
    // Fix: Access process.env directly instead of window.process to resolve the TypeScript error on the window object
    return (process.env as any)?.[key] || fallback;
  } catch {
    return fallback;
  }
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL', 'https://bptsqlqnllsgflwpbbru.supabase.co');
const supabaseKey = getEnv('VITE_SUPABASE_ANON_KEY', 'sb_publishable_Gs6gMQxWFowaMQYHoGHe8g_PISFL0eU');

export const supabase = createClient(supabaseUrl, supabaseKey);
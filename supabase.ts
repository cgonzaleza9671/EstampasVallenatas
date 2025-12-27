
import { createClient } from '@supabase/supabase-js';

/**
 * En proyectos Vite, las variables de entorno para el cliente se acceden
 * vía import.meta.env y deben empezar con el prefijo VITE_.
 */
// Fix: Using process.env instead of import.meta.env to resolve "Property 'env' does not exist on type 'ImportMeta'" errors
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://bptsqlqnllsgflwpbbru.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Gs6gMQxWFowaMQYHoGHe8g_PISFL0eU';

export const supabase = createClient(supabaseUrl, supabaseKey);

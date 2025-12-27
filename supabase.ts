
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bptsqlqnllsgflwpbbru.supabase.co';
const supabaseKey = 'sb_publishable_Gs6gMQxWFowaMQYHoGHe8g_PISFL0eU';

export const supabase = createClient(supabaseUrl, supabaseKey);

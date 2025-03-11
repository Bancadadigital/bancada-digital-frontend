import { createClient } from '@supabase/supabase-js';

// Usa variáveis compatíveis com Vercel
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL e ANON KEY são obrigatórias e não foram definidas.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

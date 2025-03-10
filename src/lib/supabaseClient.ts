import { createClient } from "@supabase/supabase-js";

// Obtendo as variáveis de ambiente para o Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Criando o cliente Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

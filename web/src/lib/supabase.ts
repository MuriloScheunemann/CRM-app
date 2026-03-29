import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Padrões para evitar que o SDK quebre a aplicação antes das chaves reais
const fallbackUrl = 'https://placeholder-project.supabase.co'
const fallbackKey = 'placeholder-key'

if (!supabaseUrl || supabaseUrl.includes('your-project-url')) {
  console.warn('⚠️ Supabase URL ausente ou padrão. Verifique o arquivo web/.env.local')
}

export const supabase = createClient(
  supabaseUrl || fallbackUrl,
  supabaseAnonKey || fallbackKey
)

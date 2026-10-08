/**
 * Supabase client abstraction with graceful fallback
 */

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const supabaseConfig = {
  url: supabaseUrl || 'https://demo-schemesetu.supabase.co',
  hasKey: isSupabaseConfigured,
  statusMessage: isSupabaseConfigured
    ? 'Connected to live Supabase PostgreSQL'
    : 'Running on local reactive storage with Supabase PostgreSQL migration ready',
};

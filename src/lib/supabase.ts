import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getEntities() {
  const { data, error } = await supabase.rpc('get_v6_entities');
  if (error) throw error;
  return data;
}

export async function getEntityDetail(slug: string) {
  const { data, error } = await supabase.rpc('get_v6_entity_detail', { p_slug: slug });
  if (error) throw error;
  return data;
}

export async function getEcosystemTotals() {
  const { data, error } = await supabase.rpc('get_v6_ecosystem_totals');
  if (error) throw error;
  return data;
}

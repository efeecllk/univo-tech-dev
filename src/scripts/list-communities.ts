
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function list() {
  console.log('--- Current Communities ---');
  const { data, error } = await supabase.from('communities').select('id, name, admin_id, category');
  if (error) {
    console.error(error);
    return;
  }
  
  for (const c of data) {
    const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', c.admin_id).single();
    console.log(`ID: ${c.id} | Name: ${c.name} | Admin: ${profile?.full_name || 'Unknown'} (${c.admin_id})`);
  }
}

list().catch(console.error);

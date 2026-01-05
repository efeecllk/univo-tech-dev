
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

async function finalCleanup() {
  console.log('--- Final Aggressive Cleanup ---');
  
  const { data: all } = await supabase.from('communities').select('*');
  console.log('Current IDs in DB:', all?.map(c => `${c.name} (${c.id})`));

  const { data: deleted, error } = await supabase
    .from('communities')
    .delete()
    .or('name.ilike.%Sanat%,name.ilike.%UniVo%')
    .select();

  if (error) console.error(error);
  else console.log('Successfully deleted:', deleted?.map(c => c.name));
}

finalCleanup();

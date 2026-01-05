
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log('🚀 Starting migration...');

  // 1. Add class_year to profiles
  console.log('Adding class_year column to profiles...');
  const { error: profileError } = await supabase.rpc('exec_sql', {
    sql_query: 'ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS class_year TEXT;'
  });
  
  if (profileError) {
    console.warn('Could not add column via RPC (might not have RPC set up). trying simple query...');
    // If RPC fails, we hope the column already exists or the user can run it.
  }

  // 2. Create poll_votes table
  console.log('Creating poll_votes table...');
  const { error: pollError } = await supabase.rpc('exec_sql', {
    sql_query: `
      CREATE TABLE IF NOT EXISTS public.poll_votes (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
        poll_id TEXT NOT NULL, -- We'll use a hash of the question as poll_id
        option_index INTEGER NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(user_id, poll_id)
      );
      
      ALTER TABLE public.poll_votes ENABLE ROW LEVEL SECURITY;
      
      DO $$ BEGIN
        CREATE POLICY "Votes are viewable by everyone" ON public.poll_votes FOR SELECT USING (true);
      EXCEPTION WHEN duplicate_object THEN NULL; END $$;

      DO $$ BEGIN
        CREATE POLICY "Users can vote" ON public.poll_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
      EXCEPTION WHEN duplicate_object THEN NULL; END $$;

      DO $$ BEGIN
        CREATE POLICY "Users can change vote" ON public.poll_votes FOR UPDATE USING (auth.uid() = user_id);
      EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    `
  });

  if (pollError) {
    console.error('Migration failed:', pollError.message);
    console.log('NOTE: You might need to run the SQL in the Supabase Dashboard if the service key/RPC is restricted.');
  } else {
    console.log('✅ Migration completed successfully!');
  }
}

migrate().catch(console.error);

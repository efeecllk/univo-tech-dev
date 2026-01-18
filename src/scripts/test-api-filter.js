
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testFilter(university) {
    console.log(`\nTesting filter for university: ${university}`);
    let query = supabase
      .from('campus_voices')
      .select(`
        id, content,
        profiles!inner:user_id (university)
      `)
      .eq('moderation_status', 'approved');

    if (university && university !== 'global') {
      query = query.eq('profiles.university', university);
    }

    const { data, error } = await query;
    if (error) console.error('Error:', error);
    else console.log(`Found ${data.length} voices.`);
}

async function runTests() {
    await testFilter('metu');
    await testFilter('bilkent');
    await testFilter('global');
}

runTests();

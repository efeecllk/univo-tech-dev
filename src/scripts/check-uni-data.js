
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
    console.log('--- PROFILE UNIVERSITY DATA ---');
    const { data: profiles, error: pError } = await supabase
        .from('profiles')
        .select('*');
    
    if (pError) {
        console.error('Profiles Error:', pError);
    } else {
        const unis = new Set(profiles.map(p => String(p.university)));
        console.log('Unique Universities:', Array.from(unis));
        profiles.forEach(p => {
            if (p.university !== 'metu' && p.university !== null) {
                console.log('Non-standard profile:', { name: p.full_name, uni: p.university });
            }
        });
    }

    console.log('\n--- CAMPUS VOICES MODERATION DATA ---');
    const { data: voices, error: vError } = await supabase
        .from('campus_voices')
        .select('id, moderation_status');
    
    if (vError) {
        console.error('Voices Error:', vError);
    } else {
        const statusCounts = {};
        voices.forEach(v => {
            statusCounts[v.moderation_status] = (statusCounts[v.moderation_status] || 0) + 1;
        });
        console.log('Moderation Status Counts:', statusCounts);
    }
}

checkData();

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'received'; // 'received' or 'sent'

    let query = supabase
      .from('friendships')
      .select(`
        id,
        status,
        created_at,
        requester:profiles!friendships_requester_id_fkey (id, full_name, avatar_url, department),
        receiver:profiles!friendships_receiver_id_fkey (id, full_name, avatar_url, department)
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (type === 'sent') {
      query = query.eq('requester_id', user.id);
    } else {
      query = query.eq('receiver_id', user.id);
    }

    const { data: requests, error } = await query;

    if (error) {
      console.error('Friend requests fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch friend requests' }, { status: 500 });
    }

    return NextResponse.json({ 
      requests: requests || [] 
    });

  } catch (error) {
    console.error('Friend requests list API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

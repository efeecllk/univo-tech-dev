import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;
    const authHeader = request.headers.get('Authorization');
    
    let currentUserId: string | null = null;
    let supabase;
    
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      supabase = createClient(supabaseUrl, supabaseAnonKey, {
        global: { headers: { Authorization: authHeader } }
      });
      const { data: { user } } = await supabase.auth.getUser(token);
      currentUserId = user?.id || null;
    } else {
      supabase = createClient(supabaseUrl, supabaseAnonKey);
    }

    // Check privacy settings
    const { data: profile } = await supabase
      .from('profiles')
      .select('show_friends')
      .eq('id', userId)
      .single();

    if (!profile?.show_friends && currentUserId !== userId) {
      return NextResponse.json({ 
        error: 'Friends list is private',
        isPrivate: true 
      }, { status: 403 });
    }

    // Fetch confirmed friendships
    const { data: friendships, error } = await supabase
      .from('friendships')
      .select(`
        id,
        requester_id,
        receiver_id,
        created_at,
        requester:profiles!friendships_requester_id_fkey (id, full_name, avatar_url, department, university),
        receiver:profiles!friendships_receiver_id_fkey (id, full_name, avatar_url, department, university)
      `)
      .eq('status', 'accepted')
      .or(`requester_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Friends fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch friends' }, { status: 500 });
    }

    // Process friendships to get the "other" person
    const friends = (friendships || []).map((f: any) => {
      const isRequester = f.requester_id === userId;
      const friendProfile = isRequester ? f.receiver : f.requester;
      
      return {
        ...friendProfile,
        friendshipId: f.id,
        friendsSince: f.created_at
      };
    });

    return NextResponse.json({ 
      friends,
      count: friends.length
    });

  } catch (error) {
    console.error('Friends list API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

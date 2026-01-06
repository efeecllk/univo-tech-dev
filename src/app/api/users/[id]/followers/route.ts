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

    const { data: profile } = await supabase
      .from('profiles')
      .select('show_followers')
      .eq('id', userId)
      .single();

    if (!profile?.show_followers && currentUserId !== userId) {
      return NextResponse.json({ 
        error: 'Followers list is private',
        isPrivate: true 
      }, { status: 403 });
    }

    const { data: followers, error } = await supabase
      .from('user_follows')
      .select(`
        follower_id,
        created_at,
        follower:profiles!user_follows_follower_id_fkey (
          id,
          full_name,
          avatar_url,
          department,
          university
        )
      `)
      .eq('following_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Followers fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch followers' }, { status: 500 });
    }

    const followersWithStatus = await Promise.all(
      (followers || []).map(async (follow: any) => {
        let isFollowing = false;
        
        if (currentUserId) {
          const { data: followData } = await supabase
            .from('user_follows')
            .select('id')
            .eq('follower_id', currentUserId)
            .eq('following_id', follow.follower_id)
            .single();
          
          isFollowing = !!followData;
        }

        return {
          ...follow.follower,
          isFollowing,
          followedAt: follow.created_at
        };
      })
    );

    return NextResponse.json({ 
      followers: followersWithStatus,
      count: followersWithStatus.length
    });

  } catch (error) {
    console.error('Followers API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

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
    const unreadOnly = searchParams.get('unread') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');

    let query = supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (unreadOnly) {
      query = query.eq('read', false);
    }

    const { data: notifications, error } = await query;

    if (error) {
      console.error('Notifications fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
    }

    // Fetch actor profiles separately if there are notifications with actor_id
    const actorIds = [...new Set(notifications?.filter(n => n.actor_id).map(n => n.actor_id) || [])];
    let actorMap: Record<string, any> = {};

    if (actorIds.length > 0) {
      const { data: actors } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', actorIds);

      if (actors) {
        actorMap = actors.reduce((acc, actor) => {
          acc[actor.id] = actor;
          return acc;
        }, {} as Record<string, any>);
      }
    }

    // Attach actor data to notifications
    const notificationsWithActors = notifications?.map(n => ({
      ...n,
      actor: n.actor_id ? actorMap[n.actor_id] || null : null
    })) || [];

    const { count: unreadCount } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('read', false);

    return NextResponse.json({
      notifications: notificationsWithActors,
      unreadCount: unreadCount || 0
    });

  } catch (error) {
    console.error('Notifications API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
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

    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', user.id)
      .eq('read', false)
      .neq('type', 'friend_request'); // Exclude friend requests

    if (error) {
      console.error('Mark all read error:', error);
      return NextResponse.json({ error: 'Failed to mark notifications as read' }, { status: 500 });
    }

    return NextResponse.json({ message: 'All notifications marked as read' });

  } catch (error) {
    console.error('Mark all read API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
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

    // Delete all regular notifications, but KEEP friend requests
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('user_id', user.id)
      .neq('type', 'friend_request');

    if (error) {
      console.error('Clear all error:', error);
      return NextResponse.json({ error: 'Failed to clear notifications' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Notifications cleared' });

  } catch (error) {
    console.error('Clear all API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

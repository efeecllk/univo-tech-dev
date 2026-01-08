import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import getSupabaseAdmin from '@/lib/supabase-admin';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        return NextResponse.json({ error: 'Server Configuration Error' }, { status: 500 });
    }

    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
        global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify ownership using user's client
    const { data: voice, error: fetchError } = await supabase
        .from('campus_voices')
        .select('user_id')
        .eq('id', id)
        .single();

    if (fetchError || !voice) {
        console.error('Voice not found:', fetchError);
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    if (voice.user_id !== user.id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Hard delete using admin client to bypass RLS
    const supabaseAdmin = getSupabaseAdmin();
    const { error: deleteError } = await supabaseAdmin
        .from('campus_voices')
        .delete()
        .eq('id', id);

    if (deleteError) {
        console.error('Delete error:', deleteError);
        return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('DELETE API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const supabase = createClient(supabaseUrl!, supabaseKey!, {
        global: { headers: { Authorization: authHeader } }
    });

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { content } = body;

    if (!content || !content.trim()) {
        return NextResponse.json({ error: 'Content required' }, { status: 400 });
    }

    // Verify ownership
    const { data: voice } = await supabase
        .from('campus_voices')
        .select('user_id')
        .eq('id', id)
        .single();

    if (!voice || voice.user_id !== user.id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Update
    const { error } = await supabase
        .from('campus_voices')
        .update({ content: content.substring(0, 280) }) // Enforce length limit
        .eq('id', id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

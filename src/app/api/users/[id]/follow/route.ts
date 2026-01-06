
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Check session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const followerId = session.user.id;
    const followingId = params.id;

    if (followerId === followingId) {
      return NextResponse.json({ error: 'Cannot follow yourself' }, { status: 400 });
    }

    // Insert into followers table
    // Assuming table structure: id, follower_id, following_id, created_at
    const { error } = await supabase
      .from('followers')
      .insert({
        follower_id: followerId,
        following_id: followingId
      });

    if (error) {
      console.error('Follow error:', error);
      if (error.code === '23505') { // Unique violation
         return NextResponse.json({ message: 'Already following' }, { status: 200 });
      }
      return NextResponse.json({ error: 'Could not follow user' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Followed successfully' });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/admin-auth';
import getSupabaseAdmin from '@/lib/supabase-admin';

export async function GET(req: NextRequest) {
    const session = await verifyAdminSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();

    try {
        const { data: admins, error } = await supabase
            .from('profiles')
            .select('id, full_name, avatar_url, role')
            .eq('role', 'admin');

        if (error) throw error;

        return NextResponse.json(admins);
    } catch (err: any) {
        console.error('Error fetching admins:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

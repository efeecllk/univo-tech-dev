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
        // 1. Fetch Users (Limit to 100 for MVP safety)
        const { data: users, error: usersError } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(100);

        if (usersError) throw usersError;

        // 2. Fetch Settings
        const { data: settings, error: settingsError } = await supabase
            .from('system_settings')
            .select('*');

        if (settingsError && settingsError.code !== '42P01') { // Ignore if table doesn't exist yet (though we created it)
            // throw settingsError; 
        }

        // 3. Stats
        // Count exact users
        const { count: userCount, error: countError } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true });


        return NextResponse.json({
            users: users || [],
            settings: settings || [],
            stats: {
                totalUsers: userCount || 0,
            }
        });

    } catch (err: any) {
        console.error('Admin data fetch error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

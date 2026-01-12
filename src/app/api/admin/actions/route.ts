import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/admin-auth';
import getSupabaseAdmin from '@/lib/supabase-admin';

export async function POST(req: NextRequest) {
    const session = await verifyAdminSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();

    try {
        const body = await req.json();
        const { action } = body;

        // Action: Toggle Ban
        if (action === 'toggle_ban') {
            const { userId, isBanned } = body;

            const { error } = await supabase
                .from('profiles')
                .update({ is_banned: isBanned })
                .eq('id', userId);

            if (error) throw error;

            return NextResponse.json({ success: true, message: isBanned ? 'Kullanıcı yasaklandı.' : 'Kullanıcı yasağı kaldırıldı.' });
        }

        // Action: Update Settings
        if (action === 'update_setting') {
            const { key, value } = body;

            const { error } = await supabase
                .from('system_settings')
                .upsert({ key, value: JSON.stringify(value), updated_at: new Date().toISOString() });

            if (error) throw error;

            return NextResponse.json({ success: true, message: 'Ayarlar güncellendi.' });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (err: any) {
        console.error('Admin action error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

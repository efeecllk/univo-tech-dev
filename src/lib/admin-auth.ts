import { cookies } from 'next/headers';

export async function verifyAdminSession() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('univo_admin_session');

    if (!sessionCookie || !sessionCookie.value) {
        return null;
    }

    try {
        const session = JSON.parse(sessionCookie.value);
        // In a real app, verify signature here.
        return session;
    } catch (e) {
        return null;
    }
}

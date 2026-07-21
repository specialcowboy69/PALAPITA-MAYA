import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // Check against env password
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin';
    
    if (password === adminPassword) {
      // Create session
      const sessionData = { user: 'admin', role: 'admin' };
      const session = await encrypt(sessionData);
      
      const cookieStore = await cookies();
      cookieStore.set('admin_session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 // 1 day
      });
      
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }
  } catch (error) {
    console.error('Admin login API error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';

const locales = ['es', 'en'];
const defaultLocale = 'es';

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Protect /admin routes (except /admin/login)
  const isProtectedRoute = path.startsWith('/admin') && path !== '/admin/login';
  // Protect /api/admin routes (except /api/admin/login)
  const isApiAdminRoute = path.startsWith('/api/admin') && path !== '/api/admin/login';

  if (isProtectedRoute || isApiAdminRoute) {
    const session = request.cookies.get('admin_session')?.value;
    
    if (!session) {
      if (isApiAdminRoute) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await decrypt(session);
      return NextResponse.next();
    } catch (error) {
      if (isApiAdminRoute) {
        return NextResponse.json({ error: 'Sesión inválida' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Locale routing logic
  // Skip API routes, admin, and static files
  if (
    path.startsWith('/api') ||
    path.startsWith('/admin') ||
    path.startsWith('/_next') ||
    path.includes('.')
  ) {
    return NextResponse.next();
  }
  
  const pathnameHasLocale = locales.some(
    (locale) => path.startsWith(`/${locale}/`) || path === `/${locale}`
  );
  
  if (pathnameHasLocale) return NextResponse.next();

  // Basic locale detection
  const acceptLanguage = request.headers.get('accept-language');
  let locale = defaultLocale;
  
  if (acceptLanguage && acceptLanguage.toLowerCase().includes('en')) {
    locale = 'en';
  }

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${locale}${path === '/' ? '' : path}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Match everything except static files and images
    '/((?!_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};

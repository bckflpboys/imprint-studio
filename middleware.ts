import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

// Public paths that don't require authentication
const publicPaths = [
  '/',
  '/auth',
  '/auth/signin',
  '/auth/signup',
  '/auth/error',
  '/listings',
  '/listings/new', // Explicitly make this public
  '/api/auth', // NextAuth.js API routes
];

// Protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/settings'
];

// API routes that require authentication
const protectedApiRoutes = [
  '/api/listings'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Handle API routes
  if (protectedApiRoutes.some(route => pathname.startsWith(route))) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    });

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // For other protected routes
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  if (!token) {
    // Prevent redirect loop for signin page
    if (pathname.startsWith('/auth/signin')) {
      return NextResponse.next();
    }

    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // If user is already authenticated and tries to access signin page, redirect to home
  if (pathname.startsWith('/auth/signin')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    '/api/:path*'
  ],
};
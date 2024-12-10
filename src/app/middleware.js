import { NextResponse } from 'next/server';

export function middleware(request) {
  // Add the pathname to headers for layout to use
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  // Handle logout on page unload via client-side code
  if (request.nextUrl.pathname === '/logout') {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('authToken');
    return response;
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: '/:path*',
};
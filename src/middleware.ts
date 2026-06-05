// apps/website-renderer/src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // 1. Exclude public assets, service integrations, and API routes
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2. Identify and resolve target domains
  const portalDomains = ['multiverse.com', 'localhost:3002'];
  const isMainDomain = portalDomains.some((domain) => hostname === domain);

  if (isMainDomain) {
    // Renders the main SaaS sales landing page/portal
    return NextResponse.next();
  }

  let siteName = hostname;

  // Handles subdomain resolution mapping (e.g. workspace.multiverse.com)
  if (hostname.endsWith('.multiverse.com')) {
    siteName = hostname.replace('.multiverse.com', '');
  }

  // Handles local testing subdomains (e.g. workspace.localhost:3002)
  if (hostname.endsWith('.localhost:3002')) {
    siteName = hostname.replace('.localhost:3002', '');
  }

  // Rewrite page paths internally to the dynamic folder structure
  url.pathname = `/_sites/${siteName}${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
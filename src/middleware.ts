// apps/website-renderer/src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Skip static assets and API routes
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  /**
   * Parse portal domains from env
   *
   * Supports:
   * localhost:3005
   * multiverse.com
   * http://localhost:3005
   * https://multiverse.com
   */
  const portalDomains =
    process.env.NEXT_PUBLIC_PORTAL_DOMAINS?.split(',')
      .map((domain) => domain.trim())
      .filter(Boolean)
      .map((domain) => {
        try {
          return new URL(domain).host;
        } catch {
          return domain;
        }
      }) || [];

  const rootDomain =
    process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'multiverse.com';

  console.log('Hostname:', hostname);
  console.log('Portal Domains:', portalDomains);

  // Main SaaS portal
  if (portalDomains.includes(hostname)) {
    return NextResponse.next();
  }

  let siteName = hostname;

  // Production subdomains
  if (hostname.endsWith(`.${rootDomain}`)) {
    siteName = hostname.replace(`.${rootDomain}`, '');
  }

  // Localhost subdomains
  else if (hostname.includes('.localhost:')) {
    siteName = hostname.split('.localhost:')[0];
  }

  // Local IP subdomains
  else if (hostname.includes('.192.168.')) {
    siteName = hostname.split('.')[0];
  }

  // Rewrite tenant site
  url.pathname = `/_sites/${siteName}${url.pathname}`;

  console.log('Rewrite Path:', url.pathname);

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
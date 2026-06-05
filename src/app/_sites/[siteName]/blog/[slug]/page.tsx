import { notFound } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { ThemeInjector } from "@/components/ThemeInjector";
import { defaultTheme } from "@gusaindeekshu/multiverse";

interface PageMeta {
  id: string;
  title: string;
  slug: string;
  isHomePage: boolean;
  status: string;
}

interface Website {
  id: string;
  name: string;
  subdomain: string;
  title: string | null;
  description: string | null;
  favicon: string | null;
  tenantId: string;
  pages?: PageMeta[];
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  published: boolean;
  featuredImage: string | null;
  createdAt: string;
  content?: {
    body?: string;
  } | any;
  category?: {
    name: string;
    slug: string;
  } | null;
  author?: {
    firstName: string | null;
    lastName: string | null;
    email: string;
  } | null;
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ siteName: string; slug: string }>;
}) {
  const { siteName, slug } = await params;

  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    // 1. Fetch website context to get tenantId and pages list for header
    const siteRes = await axios.get(
      `${backendUrl}/pages/public/by-subdomain?subdomain=${siteName}&slug=`
    );

    if (!siteRes.data || !siteRes.data.website) {
      return notFound();
    }

    const website: Website = siteRes.data.website;

    // 2. Fetch specific published blog post by slug
    const blogRes = await axios.get<BlogPost>(
      `${backendUrl}/blogs/public/slug/${slug}?tenantId=${website.tenantId}`
    );

    const post = blogRes.data;
    if (!post || !post.published) {
      return notFound();
    }

    const pagesList = website.pages || [];
    const subPages = pagesList.filter((p) => !p.isHomePage);

    // Extract body content
    const bodyText = post.content?.body || (typeof post.content === "string" ? post.content : "");
    const authorName = post.author
      ? `${post.author.firstName || ""} ${post.author.lastName || ""}`.trim() || post.author.email
      : "Editorial Staff";

    return (
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
        <ThemeInjector theme={defaultTheme} darkMode={true} />

        {/* Dynamic Navigation Header */}
        <header className="sticky top-0 z-45 w-full border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-white hover:text-indigo-400 transition-colors"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span>{website.name}</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Home
              </Link>

              {subPages.map((p) => (
                <Link
                  key={p.id}
                  href={`/${p.slug}`}
                  className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  {p.title}
                </Link>
              ))}

              <Link
                href="/blog"
                className="text-xs font-semibold text-indigo-400 transition-colors"
              >
                Blog
              </Link>
            </nav>
          </div>
        </header>

        {/* Article Container */}
        <main className="flex-grow max-w-4xl mx-auto px-6 py-16 w-full space-y-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors mb-4"
          >
            &larr; Back to Articles
          </Link>

          {/* Article Header */}
          <header className="space-y-4">
            {post.category && (
              <span className="inline-block rounded bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                {post.category.name}
              </span>
            )}
            <h1
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 font-medium">
              <span>By {authorName}</span>
              <span>&bull;</span>
              <span>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="h-[400px] w-full overflow-hidden rounded-2xl bg-slate-900 border border-slate-900">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article content body */}
          <article className="prose prose-invert prose-indigo max-w-none text-slate-300 text-sm md:text-base leading-relaxed space-y-6 pt-6">
            {bodyText.split("\n\n").map((paragraph: string, idx: number) => {
              if (!paragraph.trim()) return null;
              return <p key={idx} className="whitespace-pre-wrap">{paragraph}</p>;
            })}
          </article>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-900 bg-slate-950 py-12 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              <span>&copy; {new Date().getFullYear()} {website.name}. All rights reserved.</span>
            </div>
            <span>Powered by Branch CMS</span>
          </div>
        </footer>
      </div>
    );
  } catch (err: any) {
    console.error(`Failed to load article ${slug}:`, err.message);
    return notFound();
  }
}

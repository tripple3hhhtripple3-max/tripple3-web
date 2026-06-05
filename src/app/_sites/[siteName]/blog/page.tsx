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

export default async function BlogListingPage({
  params,
}: {
  params: Promise<{ siteName: string }>;
}) {
  const { siteName } = await params;

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

    // 2. Fetch public published blog posts
    const blogsRes = await axios.get<BlogPost[]>(
      `${backendUrl}/blogs/public?tenantId=${website.tenantId}`
    );
    const posts = blogsRes.data || [];

    const pagesList = website.pages || [];
    const subPages = pagesList.filter((p) => !p.isHomePage);

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

        {/* Blog Hero Header */}
        <section className="py-20 px-6 md:px-12 border-b border-slate-900 bg-slate-900/10">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="inline-block rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1 text-[10px] font-bold tracking-wider uppercase text-indigo-400">
              Articles & News
            </span>
            <h1
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              The {website.name} Journal
            </h1>
            <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
              Explore stories, technical walkthroughs, insights, and design patterns curated by our editorial team.
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <main className="flex-grow max-w-6xl mx-auto px-6 py-16 w-full">
          {posts.length === 0 ? (
            <div className="py-24 text-center max-w-md mx-auto space-y-4">
              <h3 className="text-lg font-bold text-slate-300">No published articles</h3>
              <p className="text-xs text-slate-500">
                Check back later! The authors haven't published any articles to this feed yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const authorName = post.author
                  ? `${post.author.firstName || ""} ${post.author.lastName || ""}`.trim() || post.author.email
                  : "Editorial Staff";

                return (
                  <article
                    key={post.id}
                    className="group flex flex-col justify-between rounded-2xl border border-slate-900 bg-slate-950 overflow-hidden hover:border-slate-800 transition-all duration-300 hover:scale-[1.01]"
                  >
                    <div>
                      {/* Featured Image placeholder */}
                      <div className="h-48 w-full overflow-hidden bg-slate-900 relative">
                        <img
                          src={
                            post.featuredImage ||
                            "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80"
                          }
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {post.category && (
                          <span className="absolute top-4 left-4 rounded bg-indigo-600/90 backdrop-blur-sm px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                            {post.category.name}
                          </span>
                        )}
                      </div>

                      <div className="p-6 space-y-3">
                        <span className="text-[10px] text-slate-500 font-semibold">
                          {new Date(post.createdAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <h2 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h2>
                        {post.excerpt && (
                          <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-slate-900/50 mt-4 flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span>By {authorName}</span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-indigo-400 font-semibold group-hover:underline flex items-center gap-1"
                      >
                        Read Post &rarr;
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
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
    console.error("Failed to load blog page:", err.message);
    return notFound();
  }
}

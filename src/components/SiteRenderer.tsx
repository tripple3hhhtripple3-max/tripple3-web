"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ThemeInjector } from "./ThemeInjector";
import { defaultTheme } from "@gusaindeekshu/multiverse";
import DynamicForm from "./DynamicForm";
import axios from "axios";

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

interface Block {
  id: string;
  type: string;
  settings: Record<string, any>;
}

interface Page {
  id: string;
  title: string;
  slug: string;
  content: Block[];
  isHomePage: boolean;
}

interface SiteRendererProps {
  website: Website;
  page: Page;
}

export default function SiteRenderer({ website, page }: SiteRendererProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Default Contact Form state (if no custom formId is linked)
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState("");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);
    setContactError("");
    setContactSuccess(false);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      await axios.post(
        `${backendUrl}/tenants/public/contact?tenantId=${website.tenantId}`,
        {
          name: contactName,
          email: contactEmail,
          message: contactMessage,
        }
      );
      setContactSuccess(true);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    } catch (err: any) {
      console.error(err);
      setContactError(
        err.response?.data?.message || "Failed to send message. Please try again."
      );
    } finally {
      setContactSubmitting(false);
    }
  };

  const pagesList = website.pages || [];
  const homePage = pagesList.find((p) => p.isHomePage);
  const subPages = pagesList.filter((p) => !p.isHomePage);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      <ThemeInjector theme={defaultTheme} darkMode={true} />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-white hover:text-indigo-400 transition-colors"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span>{website.name}</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-xs font-semibold hover:text-white transition-colors ${
                page.isHomePage ? "text-indigo-400" : "text-slate-400"
              }`}
            >
              Home
            </Link>

            {subPages.map((p) => (
              <Link
                key={p.id}
                href={`/${p.slug}`}
                className={`text-xs font-semibold hover:text-white transition-colors ${
                  page.slug === p.slug ? "text-indigo-400" : "text-slate-400"
                }`}
              >
                {p.title}
              </Link>
            ))}

            <Link
              href="/blog"
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Blog
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-900 bg-slate-950 px-6 py-4 space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-sm font-medium ${
                page.isHomePage ? "text-indigo-400" : "text-slate-400"
              }`}
            >
              Home
            </Link>
            {subPages.map((p) => (
              <Link
                key={p.id}
                href={`/${p.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-medium ${
                  page.slug === p.slug ? "text-indigo-400" : "text-slate-400"
                }`}
              >
                {p.title}
              </Link>
            ))}
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-400"
            >
              Blog
            </Link>
          </div>
        )}
      </header>

      {/* Canvas Layout Sections */}
      <main className="flex-grow">
        {page.content.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-4">
            <h3 className="text-xl font-bold">This page is a blank canvas.</h3>
            <p className="text-sm text-slate-500">
              Launch the page builder from the admin console to design layouts, drop visual blocks, and customize headers.
            </p>
          </div>
        ) : (
          page.content.map((block) => {
            const settings = block.settings || {};
            const bgVal = settings.bgColor || "#09090b";
            const textVal = settings.textColor || "#ffffff";

            return (
              <div
                key={block.id}
                id={block.id}
                style={{
                  backgroundColor: bgVal,
                  color: textVal,
                }}
              >
                {/* HERO BLOCK */}
                {block.type === "hero" && (
                  <section className="relative py-28 px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden">
                    {settings.bgImage && (
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-20"
                        style={{ backgroundImage: `url(${settings.bgImage})` }}
                      />
                    )}
                    <div className="relative max-w-3xl mx-auto space-y-6 z-10">
                      <h1
                        className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {settings.title}
                      </h1>
                      <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
                        {settings.subtitle}
                      </p>
                      {settings.ctaText && (
                        <a
                          href={settings.ctaLink || "#"}
                          className="inline-block px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-600/30 text-white font-semibold text-xs tracking-wider uppercase transition-all"
                        >
                          {settings.ctaText}
                        </a>
                      )}
                    </div>
                  </section>
                )}

                {/* FEATURES GRID */}
                {block.type === "features" && (
                  <section className="py-24 px-6 md:px-12">
                    <div className="max-w-5xl mx-auto space-y-12">
                      <h2
                        className="text-3xl font-bold text-center text-white"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {settings.title}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                        {settings.items?.map((item: any, i: number) => (
                          <div
                            key={i}
                            className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:border-indigo-500/30 transition-all duration-300"
                          >
                            <h3 className="text-lg font-semibold text-white">
                              {item.title}
                            </h3>
                            <p className="text-xs opacity-70 mt-2.5 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {/* TEXT PARAGRAPH */}
                {block.type === "text" && (
                  <section
                    className="py-16 px-6 md:px-12"
                    style={{ textAlign: settings.align || "left" }}
                  >
                    <div className="max-w-3xl mx-auto space-y-4">
                      {settings.title && (
                        <h2
                          className="text-2xl font-bold text-white"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {settings.title}
                        </h2>
                      )}
                      <p className="text-sm opacity-80 leading-relaxed whitespace-pre-wrap">
                        {settings.body}
                      </p>
                    </div>
                  </section>
                )}

                {/* TRACTION STATS */}
                {block.type === "stats" && (
                  <section className="py-20 px-6 md:px-12">
                    <div className="max-w-5xl mx-auto space-y-12">
                      {settings.title && (
                        <h2
                          className="text-2xl font-bold text-center text-white"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {settings.title}
                        </h2>
                      )}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {settings.items?.map((item: any, i: number) => (
                          <div
                            key={i}
                            className="p-6 rounded-2xl bg-white/5 border border-white/5"
                          >
                            <span className="text-4xl md:text-5xl font-extrabold text-indigo-500 block">
                              {item.number}
                            </span>
                            <span className="text-[10px] opacity-70 mt-2 block font-semibold uppercase tracking-wider">
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {/* TESTIMONIALS */}
                {block.type === "testimonials" && (
                  <section className="py-20 px-6 md:px-12">
                    <div className="max-w-4xl mx-auto space-y-12 text-center">
                      <h2
                        className="text-3xl font-bold text-white"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {settings.title}
                      </h2>
                      <div className="space-y-8">
                        {settings.quotes?.map((q: any, i: number) => (
                          <blockquote key={i} className="space-y-4">
                            <p className="text-lg md:text-xl italic opacity-90 leading-relaxed">
                              "{q.quote}"
                            </p>
                            <cite className="text-xs not-italic text-indigo-400 block font-bold">
                              &mdash; {q.author}
                            </cite>
                          </blockquote>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {/* FORM BLOCK */}
                {block.type === "form" && (
                  <section className="py-20 px-6 md:px-12">
                    <div className="max-w-md mx-auto space-y-6">
                      <div className="text-center space-y-2">
                        <h2
                          className="text-2xl font-bold text-white"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {settings.title}
                        </h2>
                        {settings.subtitle && (
                          <p className="text-xs opacity-75">{settings.subtitle}</p>
                        )}
                      </div>

                      {settings.formId ? (
                        <DynamicForm
                          formId={settings.formId}
                          buttonText={settings.buttonText || "Submit"}
                        />
                      ) : (
                        // Render Default Contact Form submitting to /tenants/public/contact
                        <form
                          onSubmit={handleContactSubmit}
                          className="space-y-4 mt-6 text-left"
                        >
                          {contactSuccess && (
                            <div className="rounded-xl border border-emerald-900/50 bg-emerald-950/20 p-4 text-xs text-emerald-400 text-center font-medium">
                              Message sent! We will get back to you shortly.
                            </div>
                          )}

                          {contactError && (
                            <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-4 text-xs text-red-400 text-center font-medium">
                              {contactError}
                            </div>
                          )}

                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-zinc-400">
                              Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              className="w-full rounded-xl bg-zinc-900/60 border border-zinc-800 focus:border-indigo-500 focus:outline-none px-4 py-3 text-xs text-white placeholder-zinc-650"
                              placeholder="Your full name"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-zinc-400">
                              Email <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              required
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              className="w-full rounded-xl bg-zinc-900/60 border border-zinc-800 focus:border-indigo-500 focus:outline-none px-4 py-3 text-xs text-white placeholder-zinc-650"
                              placeholder="Your email address"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-zinc-400">
                              Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              required
                              rows={4}
                              value={contactMessage}
                              onChange={(e) => setContactMessage(e.target.value)}
                              className="w-full rounded-xl bg-zinc-900/60 border border-zinc-800 focus:border-indigo-500 focus:outline-none p-3 text-xs text-white placeholder-zinc-650"
                              placeholder="Write your message here"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={contactSubmitting}
                            className="w-full flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs py-3.5 mt-4 transition-all disabled:opacity-50 cursor-pointer shadow-lg hover:shadow-indigo-600/30"
                          >
                            {contactSubmitting
                              ? "Sending..."
                              : settings.buttonText || "Submit Message"}
                          </button>
                        </form>
                      )}
                    </div>
                  </section>
                )}
              </div>
            );
          })
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            <span>&copy; {new Date().getFullYear()} {website.name}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Powered by Branch CMS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

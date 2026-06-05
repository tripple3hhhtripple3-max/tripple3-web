"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"saas" | "portfolio" | "blog">("saas");
  const [isYearly, setIsYearly] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Smooth scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pricing values
  const prices = {
    starter: isYearly ? 12 : 19,
    pro: isYearly ? 29 : 49,
    enterprise: isYearly ? 79 : 129,
  };

  // Mock data for the interactive canvas preview
  const canvasContent = {
    saas: {
      title: "Scale Your Next SaaS Startup",
      subtitle: "The ultimate marketing site builder for high-growth tech companies.",
      color: "from-violet-600 to-indigo-600",
      accent: "text-indigo-400",
      bgGradient: "from-indigo-950/20 to-purple-950/20",
      elements: [
        { label: "Hero Headline", type: "text", content: "AI-Powered CRM Gateway" },
        { label: "Primary CTA", type: "button", content: "Get Started Free" },
        { label: "Feature Card", type: "card", content: "Real-time sync, 99.9% uptime SLA" },
      ],
    },
    portfolio: {
      title: "Showcase Creative Portfolios",
      subtitle: "Stunning galleries, smooth transitions, and high-fidelity typography.",
      color: "from-emerald-500 to-teal-500",
      accent: "text-emerald-400",
      bgGradient: "from-emerald-950/20 to-teal-950/20",
      elements: [
        { label: "Header title", type: "text", content: "John Doe • Art Director" },
        { label: "Portfolio Grid", type: "grid", content: "3 columns, interactive layout" },
        { label: "View Works", type: "button", content: "Explore Archive" },
      ],
    },
    blog: {
      title: "Publish Dynamic Editorial Blogs",
      subtitle: "Markdown rendering, newsletter signup, and SEO optimizations built-in.",
      color: "from-amber-500 to-orange-500",
      accent: "text-amber-400",
      bgGradient: "from-amber-950/20 to-orange-950/20",
      elements: [
        { label: "Post List", type: "list", content: "Design systems in 2026 • 5 min read" },
        { label: "Email Signup", type: "form", content: "Enter your email for weekly digests" },
        { label: "Newsletter CTA", type: "button", content: "Subscribe" },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* BACKGROUND GRAPHICS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute -top-[30%] left-[20%] w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px]" />
        <div className="absolute -top-[20%] right-[10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[140px]" />
      </div>

      {/* HEADER / NAVIGATION */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-neutral-950/80 backdrop-blur-md border-neutral-900 py-3"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Triiple3
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#preview" className="hover:text-white transition-colors">Visual Canvas</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a
              href="http://localhost:3002"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Portal API Docs
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="http://localhost:3002"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors"
            >
              Sign In
            </a>
            <a
              href="http://localhost:3002"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-white text-neutral-950 font-semibold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10">Start Building</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-indigo-100 to-white transition-transform duration-300" />
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
            Next-Gen Multi-Tenant Platform
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.15]">
            Build stunning sites.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Deploy in seconds.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            The white-label SaaS builder powering modern multi-tenancy. Hook up custom domains, manage global media archives, and publish instantly with high-performance edge rewriting.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <a
              href="http://localhost:3002"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Create Your Free Site
            </a>
            <a
              href="#preview"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 font-semibold text-neutral-200 hover:text-white transition-all"
            >
              Explore Canvas Builder
            </a>
          </div>

          {/* Platform Mockup Showcase */}
          <div className="relative max-w-5xl mx-auto rounded-2xl border border-neutral-900 bg-neutral-900/40 p-2 backdrop-blur-sm shadow-2xl shadow-purple-500/5">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-purple-500/5 rounded-2xl pointer-events-none" />
            <div className="bg-neutral-950 rounded-xl border border-neutral-800/80 overflow-hidden shadow-inner aspect-[16/9] flex flex-col">
              
              {/* Mockup Toolbar */}
              <div className="bg-neutral-900/90 border-b border-neutral-800/80 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-2 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1 text-xs text-neutral-400 max-w-sm w-full justify-center">
                  <svg className="w-3.5 h-3.5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>demo-tenant.triiple3.com</span>
                </div>
                <div className="w-16" /> {/* Spacer */}
              </div>

              {/* Mockup Workspace Area */}
              <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar */}
                <div className="w-60 bg-neutral-900/40 border-r border-neutral-800/50 p-4 flex flex-col gap-6 text-left hidden sm:flex">
                  <div>
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-3">Workspace</span>
                    <ul className="flex flex-col gap-1 text-xs text-neutral-400">
                      <li className="flex items-center gap-2 px-2.5 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Pages List
                      </li>
                      <li className="flex items-center gap-2 px-2.5 py-1.5 hover:bg-neutral-800/50 hover:text-neutral-300 rounded-lg transition-colors cursor-pointer">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" /> Media Engine
                      </li>
                      <li className="flex items-center gap-2 px-2.5 py-1.5 hover:bg-neutral-800/50 hover:text-neutral-300 rounded-lg transition-colors cursor-pointer">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" /> Custom Domains
                      </li>
                      <li className="flex items-center gap-2 px-2.5 py-1.5 hover:bg-neutral-800/50 hover:text-neutral-300 rounded-lg transition-colors cursor-pointer">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" /> Themes Engine
                      </li>
                    </ul>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block mb-3">Live Canvas</span>
                    <ul className="flex flex-col gap-1 text-xs text-neutral-400">
                      <li className="flex items-center gap-2 px-2.5 py-1.5 hover:bg-neutral-800/50 hover:text-neutral-300 rounded-lg transition-colors cursor-pointer">
                        Layout Sections
                      </li>
                      <li className="flex items-center gap-2 px-2.5 py-1.5 hover:bg-neutral-800/50 hover:text-neutral-300 rounded-lg transition-colors cursor-pointer">
                        CMS Blog Config
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Canvas Center Preview */}
                <div className="flex-1 bg-neutral-950 p-6 flex flex-col justify-center items-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
                  
                  {/* Floating Builder Widgets */}
                  <div className="absolute top-4 right-4 bg-neutral-900/90 border border-neutral-800 rounded-xl p-3 flex flex-col gap-1.5 shadow-xl backdrop-blur-md text-[10px] text-left text-neutral-400 z-10 w-40">
                    <span className="font-semibold text-white">Styling Properties</span>
                    <div className="flex items-center justify-between border-t border-neutral-800/80 pt-1.5">
                      <span>Grid Columns</span>
                      <span className="bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-200">3 cols</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Base Accent</span>
                      <span className="w-3 h-3 rounded bg-indigo-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Border Radius</span>
                      <span className="bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-200">12px</span>
                    </div>
                  </div>

                  <div className="max-w-md text-center z-0">
                    <div className="inline-block px-2.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3">
                      Canvas Preview
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                      Design without boundaries.
                    </h2>
                    <p className="text-xs text-neutral-400 mb-6 max-w-sm mx-auto">
                      All blocks represent responsive JSON components that compile instantly on our optimized edge router pathways.
                    </p>
                    <div className="flex justify-center gap-3">
                      <div className="h-8 px-4 bg-indigo-600 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shadow-md shadow-indigo-500/20">
                        Primary Button
                      </div>
                      <div className="h-8 px-4 border border-neutral-800 rounded-lg flex items-center justify-center text-[10px] font-bold text-neutral-300">
                        Outline Button
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section id="features" className="py-20 md:py-28 border-t border-neutral-900 bg-neutral-950/50">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Equipped with elite features
            </h2>
            <p className="text-neutral-400 text-lg">
              Everything you need to launch a white-label site-building platform, optimized for high scaling and user control.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div
              className={`p-8 rounded-2xl border transition-all duration-300 ${
                hoveredCard === 0
                  ? "bg-neutral-900 border-indigo-500/30 -translate-y-1 shadow-lg shadow-indigo-500/5"
                  : "bg-neutral-900/30 border-neutral-900"
              }`}
              onMouseEnter={() => setHoveredCard(0)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Visual Canvas Builder</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Empower your tenants to construct advanced visual layouts. Real-time canvas rendering maps blocks natively into high-performance components.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className={`p-8 rounded-2xl border transition-all duration-300 ${
                hoveredCard === 1
                  ? "bg-neutral-900 border-purple-500/30 -translate-y-1 shadow-lg shadow-purple-500/5"
                  : "bg-neutral-900/30 border-neutral-900"
              }`}
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Subdomains & Custom Domains</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Routing built directly into Next.js Edge. Map custom user domains (`userdomain.com`) or system subdomains (`name.saas.com`) in real-time.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className={`p-8 rounded-2xl border transition-all duration-300 ${
                hoveredCard === 2
                  ? "bg-neutral-900 border-emerald-500/30 -translate-y-1 shadow-lg shadow-emerald-500/5"
                  : "bg-neutral-900/30 border-neutral-900"
              }`}
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Global Media Vault</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                A unified media repository backing multi-tenant assets. Connect AWS S3, DigitalOcean Space, or Cloudinary hooks with automatic chunked file ingestion.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* DYNAMIC VISUAL BUILDER PREVIEW */}
      <section id="preview" className="py-20 md:py-28 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            
            {/* Left Content */}
            <div className="md:col-span-2 text-left">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-3">Live Interactive Sandbox</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                Simulate theme switches instantly.
              </h2>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-8">
                Click the categories below to observe how the platform maps page schemas into distinct frontend models dynamically.
              </p>

              {/* Selector Tabs */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setActiveTab("saas")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    activeTab === "saas"
                      ? "bg-neutral-900 border-indigo-500/40 text-white shadow-md"
                      : "bg-neutral-900/20 border-neutral-900 text-neutral-400 hover:border-neutral-800 hover:text-neutral-200"
                  }`}
                >
                  <span className="font-bold text-sm block mb-1">🚀 SaaS Tech Platform</span>
                  <span className="text-xs text-neutral-500">Optimized layout blocks for landing and software conversions.</span>
                </button>

                <button
                  onClick={() => setActiveTab("portfolio")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    activeTab === "portfolio"
                      ? "bg-neutral-900 border-emerald-500/40 text-white shadow-md"
                      : "bg-neutral-900/20 border-neutral-900 text-neutral-400 hover:border-neutral-800 hover:text-neutral-200"
                  }`}
                >
                  <span className="font-bold text-sm block mb-1">🎨 Creative Portfolio</span>
                  <span className="text-xs text-neutral-500">Fluid layouts, bold typography, and visual assets arrays.</span>
                </button>

                <button
                  onClick={() => setActiveTab("blog")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    activeTab === "blog"
                      ? "bg-neutral-900 border-amber-500/40 text-white shadow-md"
                      : "bg-neutral-900/20 border-neutral-900 text-neutral-400 hover:border-neutral-800 hover:text-neutral-200"
                  }`}
                >
                  <span className="font-bold text-sm block mb-1">✍️ Editorial CMS Blog</span>
                  <span className="text-xs text-neutral-500">Typography-focused layout panels with integrated content blocks.</span>
                </button>
              </div>
            </div>

            {/* Right Sandbox Render View */}
            <div className="md:col-span-3">
              <div className="relative rounded-2xl border border-neutral-900 bg-neutral-900/30 p-2 backdrop-blur-md">
                <div className="bg-neutral-950 rounded-xl border border-neutral-800/80 overflow-hidden min-h-[420px] flex flex-col transition-all duration-500">
                  
                  {/* Sandbox Header */}
                  <div className="px-4 py-3 bg-neutral-900/80 border-b border-neutral-850 flex items-center justify-between text-xs">
                    <span className="text-neutral-500 font-mono">Dynamic Component Preview</span>
                    <span className="text-neutral-400 px-2 py-0.5 rounded bg-neutral-950 border border-neutral-850 font-bold uppercase tracking-wider text-[9px]">
                      Theme: {activeTab}
                    </span>
                  </div>

                  {/* Sandbox Simulated Client UI */}
                  <div className={`flex-1 p-8 flex flex-col justify-between bg-gradient-to-br ${canvasContent[activeTab].bgGradient} transition-all duration-500`}>
                    
                    {/* Top block */}
                    <div className="mb-6">
                      <span className={`text-[10px] font-bold tracking-widest uppercase mb-2 block ${canvasContent[activeTab].accent}`}>
                        Live Schema Instance
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">
                        {canvasContent[activeTab].title}
                      </h3>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {canvasContent[activeTab].subtitle}
                      </p>
                    </div>

                    {/* Mid block (mock components editor) */}
                    <div className="flex flex-col gap-2.5 my-4">
                      <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest block text-left">Compiled DOM Nodes:</span>
                      {canvasContent[activeTab].elements.map((el, i) => (
                        <div key={i} className="bg-neutral-900/70 border border-neutral-800/80 rounded-lg p-3 flex items-center justify-between text-left">
                          <div>
                            <span className="text-[9px] font-mono text-neutral-500 block">{el.label}</span>
                            <span className="text-xs font-semibold text-neutral-200">{el.content}</span>
                          </div>
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 ${canvasContent[activeTab].accent}`}>
                            &lt;{el.type} /&gt;
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom block */}
                    <div className="flex justify-end pt-4 border-t border-neutral-900/40">
                      <button className={`px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${canvasContent[activeTab].color} shadow-lg transition-transform hover:scale-[1.03]`}>
                        Activate {activeTab} layout
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-20 md:py-28 border-t border-neutral-900 bg-neutral-950/40">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Flexible Plans for Growing SaaS Teams
            </h2>
            <p className="text-neutral-400 text-lg mb-8">
              Start building today. Easily scale up your tenants or resources as your workspace grows.
            </p>

            {/* Toggle Billing */}
            <div className="inline-flex items-center gap-3 bg-neutral-900/80 border border-neutral-800/80 rounded-full p-1">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  !isYearly ? "bg-indigo-600 text-white shadow" : "text-neutral-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isYearly ? "bg-indigo-600 text-white shadow" : "text-neutral-400 hover:text-white"
                }`}
              >
                Yearly
                <span className="bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded text-[9px] font-bold">
                  Save 30%
                </span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
            
            {/* Plan 1 */}
            <div className="bg-neutral-900/30 border border-neutral-900 rounded-2xl p-8 flex flex-col justify-between text-left transition-all hover:border-neutral-800">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-2">Starter</span>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-extrabold text-white">${prices.starter}</span>
                  <span className="text-xs text-neutral-500">/mo</span>
                </div>
                <p className="text-neutral-400 text-sm mb-6">Ideal for freelancers and developers testing the multi-tenant engine.</p>
                <ul className="flex flex-col gap-3 text-xs text-neutral-300 border-t border-neutral-900/60 pt-6">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <span>Up to 3 Active Websites</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <span>System Subdomains (`site.triiple3.com`)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <span>10GB Media Ingestion Vault</span>
                  </li>
                </ul>
              </div>
              <a
                href="http://localhost:3002"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block w-full py-3 text-center rounded-xl bg-neutral-900 border border-neutral-850 hover:border-neutral-800 text-xs font-bold text-white transition-all"
              >
                Get Started
              </a>
            </div>

            {/* Plan 2 - Pro (Featured) */}
            <div className="relative bg-neutral-900/70 border-2 border-indigo-500 rounded-2xl p-8 flex flex-col justify-between text-left shadow-2xl shadow-indigo-500/10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow">
                Most Popular
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-2">Growth (Pro)</span>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-extrabold text-white">${prices.pro}</span>
                  <span className="text-xs text-neutral-500">/mo</span>
                </div>
                <p className="text-neutral-400 text-sm mb-6">Excellent choice for growing platforms deploying commercial white-label sites.</p>
                <ul className="flex flex-col gap-3 text-xs text-neutral-300 border-t border-neutral-800 pt-6">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <span className="font-semibold text-white">Unlimited Tenant Sites</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <span>Full Custom Domain Mapping</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <span>50GB Global Media Storage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <span>Priority SLA Support</span>
                  </li>
                </ul>
              </div>
              <a
                href="http://localhost:3002"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block w-full py-3 text-center rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 transition-all"
              >
                Go Pro Now
              </a>
            </div>

            {/* Plan 3 */}
            <div className="bg-neutral-900/30 border border-neutral-900 rounded-2xl p-8 flex flex-col justify-between text-left transition-all hover:border-neutral-800">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-2">Enterprise</span>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-extrabold text-white">${prices.enterprise}</span>
                  <span className="text-xs text-neutral-500">/mo</span>
                </div>
                <p className="text-neutral-400 text-sm mb-6">Designed for high-scale agencies managing heavy dynamic assets routing.</p>
                <ul className="flex flex-col gap-3 text-xs text-neutral-300 border-t border-neutral-900/60 pt-6">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <span>Everything in Growth</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <span>Custom API Gateway Integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <span>Dedicated DB Instance Clusters</span>
                  </li>
                </ul>
              </div>
              <a
                href="http://localhost:3002"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block w-full py-3 text-center rounded-xl bg-neutral-900 border border-neutral-850 hover:border-neutral-800 text-xs font-bold text-white transition-all"
              >
                Contact Sales
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 md:py-28 relative z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Ready to deploy your next project?
          </h2>
          <p className="text-neutral-400 text-base md:text-lg max-w-xl mx-auto mb-8">
            Create high-fidelity responsive websites in our real-time editor. No credit card required.
          </p>
          <a
            href="http://localhost:3002"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-xl bg-white text-neutral-950 font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Start Building Free
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-900 bg-neutral-950/80 py-12 text-sm text-neutral-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
            </div>
            <span className="font-bold text-white text-base">
              Triiple3
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <a href="#features" className="hover:text-neutral-300 transition-colors">Features</a>
            <a href="#preview" className="hover:text-neutral-300 transition-colors">Sandbox Preview</a>
            <a href="#pricing" className="hover:text-neutral-300 transition-colors">Pricing Options</a>
            <a href="http://localhost:3002" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300 transition-colors">Admin Dashboard</a>
          </div>

          <div className="text-xs">
            © {new Date().getFullYear()} Triiple3. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}

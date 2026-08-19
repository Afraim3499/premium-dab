import Link from "next/link";
import { allBlogPosts } from "@/lib/blog";

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Find the post from registry for sidebar/meta display
  const post = allBlogPosts.find((p) => p.slug === slug);

  return (
    <div className="flex-1 bg-pd-cream-50 font-sans antialiased">
      {/* Breadcrumb bar */}
      <div className="bg-white border-b border-pd-border/40 py-3 px-6 sm:px-12">
        <div className="mx-auto max-w-[900px] flex items-center gap-2 text-sm text-pd-muted font-sans">
          <Link href="/" className="hover:text-pd-green-900 transition-colors">হোম</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-pd-green-900 transition-colors">ব্লগ</Link>
          {post && (
            <>
              <span>/</span>
              <span className="text-pd-green-900 font-semibold truncate max-w-[200px] sm:max-w-xs">
                {post.title}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Article header */}
      {post && (
        <div className="bg-[#FAF5EB] border-b border-pd-border/40 py-12 sm:py-16 px-6 text-center">
          <div className="mx-auto max-w-[900px] flex flex-col items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-pd-gold-600">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif text-pd-green-900 leading-tight max-w-3xl">
              {post.title}
            </h1>
            <p className="text-base text-pd-muted leading-relaxed max-w-2xl">
              {post.description}
            </p>
            <div className="flex items-center gap-3 text-xs text-pd-muted mt-1">
              <span className="font-semibold text-pd-green-800">{post.author}</span>
              <span>·</span>
              <span>{post.publishedAt}</span>
              <span>·</span>
              <span>{post.readingTime} পড়া</span>
            </div>
          </div>
        </div>
      )}

      {/* Article prose body */}
      <article className="mx-auto max-w-[900px] px-6 sm:px-12 py-12">
        {/* Banglish box styling injected via global CSS override */}
        <style>{`
          .banglish-box {
            background: #0B3A22;
            color: #FFFDF7;
            border-radius: 1.25rem;
            padding: 1.5rem 1.75rem;
            margin: 2rem 0;
            font-family: var(--font-inter), sans-serif;
          }
          .banglish-box h3 {
            color: #C6963D;
            font-size: 1rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.75rem;
            font-family: var(--font-inter), sans-serif;
            border: none;
            padding: 0;
          }
          .banglish-box p, .banglish-box li {
            color: rgba(255,253,247,0.80);
            font-size: 0.9375rem;
            line-height: 1.75;
          }
          .banglish-box strong {
            color: #FFFDF7;
          }
          .banglish-box a {
            color: #C6963D;
          }
        `}</style>

        {children}
      </article>

      {/* Internal link CTA strip */}
      <section className="border-t border-pd-border/40 bg-white py-12 px-6 sm:px-12">
        <div className="mx-auto max-w-[900px] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-pd-gold-600">
              Premium Daab
            </span>
            <p className="font-serif text-2xl font-bold text-pd-green-900">
              এখনই ডাব অর্ডার করুন
            </p>
            <p className="text-sm text-pd-muted">
              বাশুন্ধরা R/A, ধানমন্ডি ও উত্তরায় হোম ডেলিভারি। ৳১২০ প্রতি পিস।
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/availability"
              className="h-11 px-6 border-2 border-pd-green-900 text-pd-green-900 font-semibold rounded-xl flex items-center justify-center text-sm transition-colors hover:bg-pd-green-900 hover:text-white"
            >
              আপনার এলাকা চেক করুন
            </Link>
            <Link
              href="/order"
              className="h-11 px-6 bg-pd-green-900 hover:bg-pd-green-800 text-white font-bold rounded-xl flex items-center justify-center shadow-sm text-sm border-0 transition-colors"
            >
              অর্ডার করুন
            </Link>
          </div>
        </div>
      </section>

      {/* More posts */}
      <section className="py-12 px-6 sm:px-12 bg-pd-cream-50">
        <div className="mx-auto max-w-[900px]">
          <p className="text-sm font-bold uppercase tracking-widest text-pd-gold-600 mb-6">
            আরও পড়ুন
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allBlogPosts
              .filter((p) => p.slug !== post?.slug)
              .slice(0, 2)
              .map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group flex flex-col gap-2 p-5 bg-white border border-pd-border/60 hover:border-pd-gold-500/40 rounded-2xl transition-all hover:shadow-sm"
                >
                  <span className="text-xs font-bold text-pd-gold-600 uppercase tracking-wide">
                    {related.category}
                  </span>
                  <span className="font-serif text-base font-bold text-pd-green-900 group-hover:text-pd-gold-600 transition-colors leading-snug">
                    {related.title}
                  </span>
                  <span className="text-xs text-pd-muted">{related.readingTime} পড়া</span>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

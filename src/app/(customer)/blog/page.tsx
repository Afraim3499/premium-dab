import { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/entity-facts";
import { allBlogPosts, BlogCategory } from "@/lib/blog";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ডাব নিয়ে আমাদের ব্লগ — তথ্য, গাইড ও টিপস | Premium Daab",
  description:
    "ডাব সম্পর্কে বৈজ্ঞানিক তথ্য, ঢাকায় ডাব অর্ডারের গাইড, দাম, পরিষ্কার ডাব চেনার উপায় — Premium Daab Blog।",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "ডাব নিয়ে আমাদের ব্লগ — তথ্য, গাইড ও টিপস | Premium Daab",
    description:
      "ডাব সম্পর্কে বৈজ্ঞানিক তথ্য, ঢাকায় ডাব অর্ডারের গাইড, দাম, পরিষ্কার ডাব চেনার উপায় — Premium Daab Blog।",
    url: "/blog",
    siteName: "Premium Daab",
    locale: "bn_BD",
    type: "website",
    images: [{ url: "/assets/premium-daab/og-image.webp", width: 1200, height: 630, alt: "Premium Daab Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@premiumdaab",
    title: "ডাব নিয়ে আমাদের ব্লগ | Premium Daab",
    description: "ডাব সম্পর্কে সব তথ্য এক জায়গায়।",
    images: ["/assets/premium-daab/og-image.webp"],
  },
};

const CATEGORY_COLORS: Record<BlogCategory, string> = {
  "স্বাস্থ্য ও প্রকৃতি": "bg-emerald-100 text-emerald-800",
  "ডেলিভারি ও সার্ভিস": "bg-blue-100 text-blue-800",
  "দাম ও অর্ডার": "bg-amber-100 text-amber-800",
  "পরিচ্ছন্নতা ও মান": "bg-purple-100 text-purple-800",
  "Health & Nature": "bg-emerald-100 text-emerald-800",
  "Delivery & Service": "bg-blue-100 text-blue-800",
  "Pricing & Order": "bg-amber-100 text-amber-800",
  "Hygiene & Quality": "bg-purple-100 text-purple-800",
  "Events & Lifestyle": "bg-rose-100 text-rose-800",
};

export default function BlogListPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${SITE_URL}/blog` },
    ],
  };

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Premium Daab Blog",
    "url": `${SITE_URL}/blog`,
    "itemListElement": allBlogPosts.map((post, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `${SITE_URL}/blog/${post.slug}`,
      "name": post.title,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={blogListSchema} />
      <div className="flex-1 bg-pd-cream-50 font-sans antialiased pb-24">
        {/* Hero */}
        <section className="bg-[#FAF5EB] border-b border-pd-border/40 py-16 sm:py-24 text-center px-6">
          <div className="mx-auto max-w-3xl flex flex-col items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-pd-gold-600">
              Premium Daab Blog
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif text-pd-green-900 leading-tight">
              ডাব নিয়ে সব তথ্য
            </h1>
            <p className="text-sm sm:text-base text-pd-muted leading-relaxed max-w-xl">
              ঢাকায় ডাব কোথায় পাবেন, দাম কত, পরিষ্কার ডাব চেনার উপায় — সব প্রশ্নের উত্তর এখানে।
            </p>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-16 mx-auto max-w-[1280px] px-6 sm:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allBlogPosts.map((post) => {
              const categoryColor =
                CATEGORY_COLORS[post.category] ?? "bg-gray-100 text-gray-700";
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-white border border-pd-border/60 hover:border-pd-gold-500/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Cover image placeholder with gradient */}
                  <div className="relative w-full h-48 bg-gradient-to-br from-pd-green-900 to-pd-green-800 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('/assets/premium-daab/product-cutout.webp')] bg-center bg-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="relative font-serif text-5xl text-pd-gold-500/60 select-none">
                      ডাব
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3 p-6 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColor}`}>
                        {post.category}
                      </span>
                      <span className="text-xs text-pd-muted">{post.readingTime} পড়া</span>
                    </div>

                    <h2 className="font-serif text-xl font-bold text-pd-green-900 leading-snug group-hover:text-pd-gold-600 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-sm text-pd-muted leading-relaxed flex-1">
                      {post.description}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-4 border-t border-pd-border/40">
                      <span className="text-xs text-pd-muted">{post.author}</span>
                      <span className="text-xs font-semibold text-pd-gold-600 group-hover:underline">
                        পড়ুন →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-6">
          <div className="bg-pd-green-950 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
            <div className="flex flex-col gap-2 max-w-md">
              <h3 className="font-serif text-2xl font-bold text-pd-cream-50 leading-tight">
                এখনই ডাব অর্ডার করুন
              </h3>
              <p className="text-sm text-pd-cream-100/60 leading-relaxed">
                বাশুন্ধরা R/A, ধানমন্ডি ও উত্তরায় হোম ডেলিভারি। ৳১২০ প্রতি পিস।
              </p>
            </div>
            <Link
              href="/order"
              className="h-12 px-8 bg-pd-gold-500 hover:bg-pd-gold-600 text-pd-green-950 font-bold rounded-xl flex items-center justify-center shadow-sm text-sm border-0 transition-colors whitespace-nowrap"
            >
              অর্ডার করুন
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

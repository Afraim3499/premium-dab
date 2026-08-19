import { notFound } from "next/navigation";
import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/entity-facts";
import { allBlogPosts } from "@/lib/blog";

type Params = { slug: string };

// Pre-render all blog posts at build time as static pages
export function generateStaticParams(): Params[] {
  return allBlogPosts.map((post) => ({ slug: post.slug }));
}

// 404 for any slug not in the registry
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = allBlogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    metadataBase: new URL(SITE_URL),
    title: `${post.title} | Premium Daab`,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${post.title} | Premium Daab`,
      description: post.description,
      url: `/blog/${slug}`,
      siteName: "Premium Daab",
      locale: "bn_BD",
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: post.coverImage ?? "/assets/premium-daab/og-image.webp",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@premiumdaab",
      title: post.title,
      description: post.description,
      images: [post.coverImage ?? "/assets/premium-daab/og-image.webp"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  // Find post metadata from registry
  const post = allBlogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  // Dynamically import the MDX file
  let PostContent: React.ComponentType;
  try {
    const mod = await import(`@/content/blog/${slug}.mdx`);
    PostContent = mod.default;
  } catch {
    notFound();
  }

  // Build JSON-LD schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${SITE_URL}/blog` },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `${SITE_URL}/blog/${slug}` },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${slug}#article`,
    "headline": post.title,
    "description": post.description,
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt ?? post.publishedAt,
    "author": {
      "@type": "Organization",
      "name": post.author,
      "url": SITE_URL,
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": "Premium Daab",
      "logo": { "@type": "ImageObject", "url": `${SITE_URL}/assets/premium-daab/logo.webp` },
    },
    "inLanguage": post.lang === "bn" ? "bn-BD" : "en",
    "mainEntityOfPage": `${SITE_URL}/blog/${slug}`,
    "image": post.coverImage ? `${SITE_URL}${post.coverImage}` : `${SITE_URL}/assets/premium-daab/og-image.webp`,
    "keywords": [post.primaryKeyword, ...post.secondaryKeywords].join(", "),
    "articleSection": post.category,
  };

  const faqSchema = post.faqs && post.faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": post.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <PostContent />
    </>
  );
}

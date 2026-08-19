import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * Global MDX component overrides.
 * Maps raw markdown HTML elements to styled Premium Daab components.
 * Required by Next.js App Router when using @next/mdx.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings — Cormorant Garamond serif, forest green
    h1: ({ children }) => (
      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-pd-green-900 leading-tight mt-10 mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-pd-green-900 leading-snug mt-10 mb-4 pb-2 border-b border-pd-border/40">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-sans text-xl font-bold text-pd-green-950 mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-sans text-base font-bold text-pd-green-950 mt-6 mb-2 uppercase tracking-wide">
        {children}
      </h4>
    ),

    // Paragraphs — Inter, comfortable reading measure
    p: ({ children }) => (
      <p className="font-sans text-base sm:text-lg text-pd-text leading-relaxed mb-5">
        {children}
      </p>
    ),

    // Links — gold accent
    a: ({ href, children }) => {
      const isInternal = href?.startsWith("/");
      if (isInternal && href) {
        return (
          <Link href={href} className="text-pd-gold-600 font-semibold underline underline-offset-2 hover:text-pd-gold-500 transition-colors">
            {children}
          </Link>
        );
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-pd-gold-600 font-semibold underline underline-offset-2 hover:text-pd-gold-500 transition-colors">
          {children}
        </a>
      );
    },

    // Lists
    ul: ({ children }) => (
      <ul className="font-sans text-base text-pd-text leading-relaxed mb-5 pl-6 list-disc space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="font-sans text-base text-pd-text leading-relaxed mb-5 pl-6 list-decimal space-y-2">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),

    // Blockquote — citation/research callout style
    blockquote: ({ children }) => (
      <blockquote className="my-6 pl-5 border-l-4 border-pd-gold-500 bg-[#FCF9F0] rounded-r-xl py-4 pr-5 italic text-pd-text/80 font-sans text-base">
        {children}
      </blockquote>
    ),

    // Horizontal rule
    hr: () => (
      <hr className="my-10 border-0 h-px bg-pd-border" />
    ),

    // Tables
    table: ({ children }) => (
      <div className="overflow-x-auto my-6 rounded-xl border border-pd-border shadow-sm">
        <table className="w-full text-sm font-sans text-left">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-pd-green-900 text-pd-cream-50">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-pd-border">{children}</tbody>
    ),
    tr: ({ children }) => <tr className="even:bg-[#FAF5EB]">{children}</tr>,
    th: ({ children }) => (
      <th className="px-4 py-3 font-bold text-sm tracking-wide">{children}</th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-pd-text">{children}</td>
    ),

    // Code
    code: ({ children }) => (
      <code className="font-mono text-sm bg-pd-cream-100 text-pd-green-900 rounded px-1.5 py-0.5">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-pd-green-950 text-pd-cream-100 rounded-xl p-5 overflow-x-auto my-6 text-sm font-mono">
        {children}
      </pre>
    ),

    // Strong / em
    strong: ({ children }) => (
      <strong className="font-bold text-pd-green-950">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-pd-green-800">{children}</em>
    ),

    // Designed Custom Landing Page Components
    StatHighlight: ({ stats }: { stats: { value: string; label: string }[] }) => (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center justify-center p-4 bg-white border border-pd-border/60 rounded-2xl shadow-sm text-center">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-pd-gold-600">{stat.value}</span>
            <span className="font-sans text-xs text-pd-muted mt-1 uppercase tracking-wider">{stat.label}</span>
          </div>
        ))}
      </div>
    ),

    ComparisonGrid: ({ items }: { items: { title: string; points: string[]; isPremium?: boolean }[] }) => (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
        {items.map((item, i) => (
          <div
            key={i}
            className={`p-6 rounded-3xl border flex flex-col gap-4 ${
              item.isPremium
                ? "bg-pd-green-950 border-pd-green-800 text-pd-cream-50"
                : "bg-white border-pd-border/60 text-pd-text"
            }`}
          >
            <h4 className={`font-serif text-xl font-bold ${item.isPremium ? "text-pd-gold-500" : "text-pd-green-900"}`}>
              {item.title}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {item.points.map((pt, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed">
                  <span className={`text-base flex-shrink-0 ${item.isPremium ? "text-pd-gold-500" : "text-red-500"}`}>
                    {item.isPremium ? "✓" : "✗"}
                  </span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),

    TimelineStep: ({ steps }: { steps: { number: string; title: string; desc: string }[] }) => (
      <div className="flex flex-col gap-6 my-8 pl-4 border-l-2 border-pd-border/60">
        {steps.map((step, i) => (
          <div key={i} className="relative flex flex-col gap-1 text-left pl-6">
            <span className="absolute -left-[29px] top-0 w-6 h-6 rounded-full bg-pd-gold-500 text-pd-green-950 font-sans text-xs font-bold flex items-center justify-center border-2 border-pd-cream-50">
              {step.number}
            </span>
            <h4 className="font-serif text-lg font-bold text-pd-green-900 leading-snug">{step.title}</h4>
            <p className="font-sans text-sm text-pd-muted leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    ),

    CitingCard: ({ quote, citation, author, year }: { quote: string; citation: string; author: string; year: string }) => (
      <div className="my-8 p-6 bg-white border border-pd-border/60 rounded-3xl shadow-sm flex flex-col gap-4 text-left">
        <p className="font-serif text-lg text-pd-green-900 italic leading-relaxed">“{quote}”</p>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 border-t border-pd-border/40">
          <span className="text-xs font-sans text-pd-muted">
            সূত্র: <strong>{author}</strong> ({year})
          </span>
          <span className="text-xs font-sans text-pd-gold-600 font-semibold italic">{citation}</span>
        </div>
      </div>
    ),

    InlineCTA: ({ title, description, buttonText }: { title: string; description: string; buttonText: string }) => (
      <div className="my-10 p-8 bg-gradient-to-br from-pd-green-950 to-pd-green-900 text-pd-cream-50 rounded-3xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
        <div className="flex flex-col gap-2 max-w-md">
          <h4 className="font-serif text-2xl font-bold text-pd-gold-500 leading-tight">{title}</h4>
          <p className="font-sans text-sm text-pd-cream-100/70 leading-relaxed">{description}</p>
        </div>
        <Link
          href="/order"
          className="h-12 px-8 bg-pd-gold-500 hover:bg-pd-gold-600 text-pd-green-950 font-bold rounded-xl flex items-center justify-center text-sm border-0 transition-colors whitespace-nowrap shadow-sm"
        >
          {buttonText}
        </Link>
      </div>
    ),

    ...components,
  };
}

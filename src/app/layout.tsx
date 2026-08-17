import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/entity-facts";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "Premium Daab — 100% Natural Young Coconut Delivered Fresh",
  description:
    "Premium Daab brings a clean, fresh, and hygienic young coconut experience to modern Bangladesh. Check delivery availability and order fresh young coconut straight to your home or office.",
  metadataBase: new URL(SITE_URL), // Dynamic base URL for metadata
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Premium Daab — 100% Natural Young Coconut Delivered Fresh",
    description:
      "Premium Daab brings a clean, fresh, and hygienic young coconut experience to modern Bangladesh. Check delivery availability and order fresh young coconut straight to your home or office.",
    url: "/",
    siteName: "Premium Daab",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/premium-daab/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Premium Daab — 100% Natural Young Coconut Delivered Fresh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Daab — 100% Natural Young Coconut Delivered Fresh",
    description:
      "Premium Daab brings a clean, fresh, and hygienic young coconut experience to modern Bangladesh. Check delivery availability and order fresh young coconut straight to your home or office.",
    images: ["/assets/premium-daab/og-image.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}

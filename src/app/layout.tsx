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
  title: "Premium Dab — 100% Natural Young Coconut Delivered Fresh",
  description:
    "Premium Dab brings a clean, fresh, and hygienic young coconut experience to modern Bangladesh. Check delivery availability and order fresh young coconut straight to your home or office.",
  metadataBase: new URL(SITE_URL), // Dynamic base URL for metadata
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Premium Dab — 100% Natural Young Coconut Delivered Fresh",
    description:
      "Premium Dab brings a clean, fresh, and hygienic young coconut experience to modern Bangladesh. Check delivery availability and order fresh young coconut straight to your home or office.",
    url: "/",
    siteName: "Premium Dab",
    locale: "en_US",
    type: "website",
  },
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

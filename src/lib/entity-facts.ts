export const SITE_URL = process.env.NODE_ENV === "production"
  ? "https://www.premiumdaab.com"
  : (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");

export const brandFacts = {
  brandName: "Premium Daab",
  alternateName: "Premium Daab",
  country: "Bangladesh",
  primaryArea: "Bashundhara R/A, Dhanmondi, Mohammadpur, Uttara",
  productType: "young coconut",
  description: "100% natural young coconut, hygienically prepared, no added sugar, zero preservatives.",
  orderChannel: "WhatsApp-assisted ordering",
  contactPhone: "+8801338776699",
  contactEmail: "Premiumdaab@gmail.com",
  websiteUrl: SITE_URL,
  cartLocation: "Rd 10/A, Dhanmondi, Dhaka 1205",
};

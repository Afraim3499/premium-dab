import { z } from "zod";

// Bangladesh Phone Validation Regex:
// Matches standard mobile operator prefixes (013, 014, 015, 016, 017, 018, 019)
export const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;

/**
 * Normalizes a Bangladeshi phone number string to the standard international format (+8801XXXXXXXXX).
 */
export function normalizePhoneNumber(phone: string): string {
  const digitsOnly = phone.replace(/\D/g, "");
  
  if (digitsOnly.length === 11 && digitsOnly.startsWith("0")) {
    return `+88${digitsOnly}`;
  }
  if (digitsOnly.length === 13 && digitsOnly.startsWith("880")) {
    return `+${digitsOnly}`;
  }
  
  // Return the cleaned input if it is already in standard format or doesn't match standard prefixes
  return phone.startsWith("+") ? phone : `+${phone}`;
}

export const orderSchema = z.object({
  customerName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(100, { message: "Name must not exceed 100 characters." })
    .trim(),
  customerPhone: z
    .string()
    .trim()
    .refine((val) => bdPhoneRegex.test(val), {
      message: "Please enter a valid Bangladeshi mobile number (e.g. 01712345678).",
    }),
  city: z.string().min(1, { message: "City is required." }).trim(),
  area: z.string().min(1, { message: "Area is required." }).trim(),
  fullAddress: z
    .string()
    .min(10, { message: "Address must be at least 10 characters long, including block/road/house details." })
    .trim(),
  quantity: z
    .number()
    .int()
    .min(1, { message: "Minimum quantity is 1 Daab." })
    .max(50, { message: "Maximum checkout quantity is 50. For corporate or larger orders, please inquire on the Events page." }),
  deliveryNote: z
    .string()
    .max(500, { message: "Delivery note must not exceed 500 characters." })
    .optional()
    .nullable()
    .or(z.literal("")),
});

export type OrderInput = z.infer<typeof orderSchema>;
export type OrderInputRaw = Omit<OrderInput, "customerPhone"> & { customerPhone: string };

import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase server environment variables");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("sb-access-token")?.value;

  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Create a new client on each request in the server runtime
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false, // Disables local storage usage in Node.js server context
    },
    global: {
      headers,
    },
  });
}

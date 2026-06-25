import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { getDbPool } from "./pg-pool";

export async function validateAdminSession() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase server environment variables");
  }

  // Get cookie store
  const cookieStore = await cookies();
  const token = cookieStore.get("sb-access-token")?.value;

  if (!token) {
    throw new Error("Unauthorized: Missing administrative session token.");
  }

  // Initialize transient supabase client to fetch user details
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });

  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user) {
    throw new Error("Unauthorized: Session is invalid or expired.");
  }

  // Query database admin_users table via pg-pool to check active roles
  const pool = getDbPool();
  const dbClient = await pool.connect();

  try {
    const res = await dbClient.query(
      "SELECT user_id, email, role, is_active FROM admin_users WHERE user_id = $1 LIMIT 1",
      [user.id]
    );

    if (res.rows.length === 0) {
      throw new Error("Forbidden: User is not registered as an administrator.");
    }

    const profile = res.rows[0];
    if (!profile.is_active) {
      throw new Error("Forbidden: Administrator account is currently inactive.");
    }

    return profile; // Returns admin profile details (user_id, email, role)
  } finally {
    dbClient.release();
  }
}

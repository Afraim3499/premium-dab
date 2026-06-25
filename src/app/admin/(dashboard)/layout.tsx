import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerClient();
  
  // 1. Check user session
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/admin/login");
  }

  // 2. Fetch admin user profile
  const { data: profile } = await supabase
    .from("admin_users")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!profile || !profile.is_active) {
    // If auth session exists but admin user record is missing/inactive, redirect with error
    redirect("/admin/login?error=unauthorized");
  }

  return (
    <div className="flex h-screen w-full bg-pd-cream-50 font-sans antialiased overflow-hidden">
      {/* Sidebar Navigation */}
      <AdminSidebar adminUser={{ email: profile.email, role: profile.role }} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        {/* Header/Navbar */}
        <header className="h-[72px] bg-white border-b border-pd-border/60 flex items-center justify-between px-8 z-10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-pd-green-800 bg-[#FAF5EB] border border-pd-border/60 px-3 py-1 rounded-full capitalize">
              Role: {profile.role}
            </span>
          </div>
          <div className="text-sm font-medium text-pd-muted">
            Logged in as: <span className="font-bold text-pd-green-950">{profile.email}</span>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          {children}
        </main>
      </div>
    </div>
  );
}

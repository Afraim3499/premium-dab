"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";

interface AdminSidebarProps {
  adminUser: {
    email: string;
    role: string;
  };
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ adminUser }) => {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
        </svg>
      ),
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      name: "Inventory",
      href: "/admin/inventory",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      name: "Service Areas",
      href: "/admin/areas",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  const handleSignOut = async () => {
    if (confirm("Are you sure you want to sign out?")) {
      await supabase.auth.signOut();
      // Clear session cookies
      document.cookie = "sb-access-token=; path=/; max-age=0; SameSite=Lax; Secure";
      document.cookie = "sb-refresh-token=; path=/; max-age=0; SameSite=Lax; Secure";
      router.push("/admin/login");
      router.refresh();
    }
  };

  return (
    <aside className="w-[280px] bg-pd-green-900 text-pd-cream-50 flex flex-col h-full border-r border-pd-green-950 flex-shrink-0 z-20 shadow-lg select-none">
      {/* Brand Header */}
      <div className="h-[88px] border-b border-pd-green-800 flex items-center px-6 gap-3">
        <div className="relative w-14 h-9 flex items-center justify-center bg-white/10 rounded-lg p-1">
          <Image
            src="/assets/premium-daab/logo.webp"
            alt="Premium Daab Logo"
            width={51}
            height={34}
            className="object-contain brightness-0 invert"
          />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-serif text-xl font-bold tracking-tight leading-none text-white">
            Premium Daab
          </span>
          <span className="text-[9px] uppercase font-bold tracking-widest text-pd-gold-400 mt-1">
            Ops Dashboard
          </span>
        </div>
      </div>

      {/* Navigation Options */}
      <nav className="flex-1 px-4 py-8 flex flex-col gap-2">
        {links.map((link) => {
          // Verify active state matches path
          const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3.5 px-4 h-12 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-pd-gold-500 text-pd-green-950 shadow-md scale-98"
                  : "text-pd-cream-50/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="flex-shrink-0">{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Footer User Action */}
      <div className="p-4 border-t border-pd-green-800">
        <button
          onClick={handleSignOut}
          className="w-full h-12 rounded-xl hover:bg-white/5 text-pd-cream-50/70 hover:text-red-400 text-sm font-semibold transition flex items-center justify-center gap-3 border border-transparent hover:border-red-400/20"
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Sign Out Session</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;

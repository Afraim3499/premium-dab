"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (errorParam === "unauthorized") {
      setErrorMsg("Access denied. Your account is not authorized to access this section.");
    }
  }, [errorParam]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      // 1. Sign in with password
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setErrorMsg(authError.message);
        setIsLoading(false);
        return;
      }

      if (!authData.user) {
        setErrorMsg("Failed to retrieve user details.");
        setIsLoading(false);
        return;
      }

      // 2. Query admin_users profile table to check privileges
      const { data: profile, error: profileError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("user_id", authData.user.id)
        .maybeSingle();

      if (profileError) {
        console.error("Profile check error details:", {
          message: profileError.message,
          details: profileError.details,
          hint: profileError.hint,
          code: profileError.code
        });
        await supabase.auth.signOut();
        setErrorMsg(`An error occurred while validating your administrative privileges: ${profileError.message || "Unknown database error"}`);
        setIsLoading(false);
        return;
      }

      if (!profile) {
        await supabase.auth.signOut();
        setErrorMsg("Access denied. You do not have administrative privileges.");
        setIsLoading(false);
        return;
      }

      if (!profile.is_active) {
        await supabase.auth.signOut();
        setErrorMsg("Access denied. Your administrator profile is currently inactive.");
        setIsLoading(false);
        return;
      }

      // Set cookies for SSR auth sharing
      if (authData.session) {
        const { access_token, refresh_token, expires_in } = authData.session;
        document.cookie = `sb-access-token=${access_token}; path=/; max-age=${expires_in}; SameSite=Lax; Secure`;
        document.cookie = `sb-refresh-token=${refresh_token}; path=/; max-age=604800; SameSite=Lax; Secure`;
      }

      // Successful login & check
      router.push("/admin");
      router.refresh();
      
    } catch (err) {
      console.error("Login unexpected error:", err);
      setErrorMsg("A connection error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-pd-cream-50 flex items-center justify-center p-6 font-sans antialiased select-none">
      {/* Golden glow behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(198,154,61,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-white border border-pd-border/80 p-8 sm:p-10 rounded-3xl shadow-md flex flex-col gap-6 text-center">
        {/* Brand Logo & Name */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-14 h-10 flex items-center justify-center">
            <Image
              src="/assets/premium-daab/logo.webp"
              alt="Premium Dab Logo"
              width={60}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-serif text-3xl font-bold text-pd-green-900 leading-none">
              Premium Dab
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-pd-gold-600 font-sans mt-0.5">
              Operations Center
            </span>
          </div>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-800 text-left text-sm font-medium leading-relaxed">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5 text-left">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <Input
              label="Admin Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. operator@premiumdaab.com"
              disabled={isLoading}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
              required
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full h-12 bg-pd-green-900 hover:bg-pd-green-800 text-pd-cream-50 font-semibold rounded-xl border-0 shadow-sm mt-3"
          >
            Authenticate Credentials
          </Button>
        </form>

        <span className="text-[10px] text-pd-muted/70 leading-relaxed font-sans">
          This system is restricted to authorized personnel only. All access attempts and session logs are audited.
        </span>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-pd-cream-50 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-4 border-pd-green-900/10 border-t-pd-green-900 animate-spin" />
          <span className="text-sm font-semibold text-pd-muted">Loading secure portal...</span>
        </div>
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  );
}

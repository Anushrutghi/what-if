"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * Signs the browser in anonymously on first load so remixes always have an
 * owner. Requires "Anonymous sign-ins" to be enabled in Supabase.
 * Failures are silent here — the save/fetch flows surface their own errors.
 */
export default function SessionBootstrap() {
  useEffect(() => {
    let cancelled = false;

    let supabase;
    try {
      supabase = createClient();
    } catch {
      // Supabase not configured — skip anonymous sign-in rather than crash.
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      if (!data.session) {
        supabase.auth.signInAnonymously().catch(() => {});
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

import { createBrowserClient } from "@supabase/ssr";

// Publishable (browser-safe) values, per Supabase docs. Env vars take
// precedence so different environments can override these.
const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ysvgupegovohucgpphfg.supabase.co";
const key =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_HEPBYP75Ur5xbjc5eDvahA_CJ06rvjA";

export function createClient() {
  return createBrowserClient(url, key);
}

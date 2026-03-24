
# Auth + Database Migration Plan — COMPLETED

## What was done

1. ✅ **Lovable Cloud enabled** — Supabase backend provisioned
2. ✅ **Database tables created** — `profiles` and `signals` with RLS, auto-profile trigger on signup
3. ✅ **Google OAuth + Magic Link** configured via Lovable Cloud managed auth
4. ✅ **Auth page** (`/auth`) — Google sign-in button + magic link email input
5. ✅ **Auth hook** (`useAuth`) — wraps `onAuthStateChange` + `getSession()`
6. ✅ **ProtectedRoute** — allows access if authenticated OR in demo mode
7. ✅ **AppContext migrated to dual-mode** — authenticated mode writes to Supabase, demo mode stays in-memory
8. ✅ **Navbar updated** — shows "Sign out" (auth) or "Exit demo" (demo mode)
9. ✅ **Landing page updated** — "Get started" → `/auth`, "No account needed" → "Free to use"
10. ✅ **Demo mode preserved** — "Skip to demo" and "Reset to Diana's demo data" work without auth

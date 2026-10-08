'use client';

import { FormEvent, useState } from 'react';
import { AlertCircle, ArrowRight, Eye, EyeOff, Lock, Mail, Package, ShieldAlert, ShieldCheck, ShoppingCart } from 'lucide-react';
import { generateCodeChallenge, generateCodeVerifier } from '@/lib/pkce';

const tenantSlug = (process.env.NEXT_PUBLIC_TENANT_SLUG || 'opg-bartolovic').trim();
const tenantId = (process.env.NEXT_PUBLIC_TENANT_DB || process.env.NEXT_PUBLIC_TENANT_ID || 'kp_opg_bartolovic').trim();
const adminBaseUrl = (process.env.NEXT_PUBLIC_ADMIN_URL || 'https://zerolive.kalptree.xyz')
  .trim()
  .replace(/^['"]+|['"]+$/g, '')
  .replace(/\/+$/, '');
const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || 'https://bizlive.kalptree.xyz').replace(/\/+$/, '');

const getAuthUrl = () => apiBaseUrl.endsWith('/api') ? `${apiBaseUrl}/auth/login` : `${apiBaseUrl}/api/auth/login`;

export default function TenantAdminLoginSection() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !password) return;

    setError(null);
    setLoading(true);

    try {
      const loginResponse = await fetch(getAuthUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          'x-tenant-db': tenantId,
          'x-tenant-slug': tenantSlug,
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
          tenant_slug: tenantSlug,
          keepSignedIn: false,
          keep_signed_in: false,
        }),
      });

      const loginData = await loginResponse.json().catch(() => null);
      if (!loginResponse.ok || !loginData?.access_token) {
        throw new Error(loginData?.detail || loginData?.message || 'Invalid credentials or unauthorized access.');
      }

      const token = String(loginData.access_token);
      const maxAge = 60 * 60 * 24 * 30;
      document.cookie = `auth_token=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
      document.cookie = `${tenantId}_auth_token=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
      document.cookie = `auth_token_${tenantId}=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
      document.cookie = `admin_token=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
      localStorage.setItem('auth_token', token);

      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);
      const targetDashboard = `/${tenantSlug}/dashboard`;
      const redirectUri = `${adminBaseUrl}/auth/callback`;

      const ssoResponse = await fetch('/api/auth/sso/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'x-tenant-db': tenantId,
          'x-tenant-slug': tenantSlug,
        },
        body: JSON.stringify({
          redirectUri,
          codeChallenge,
          codeVerifier,
          returnTo: targetDashboard,
          redirect: targetDashboard,
        }),
      });

      const ssoData = await ssoResponse.json().catch(() => null);
      if (!ssoResponse.ok || !ssoData?.success || !ssoData?.code) {
        throw new Error(ssoData?.detail || ssoData?.message || 'Failed to establish admin session. Please try again.');
      }

      window.location.href = `${redirectUri}?code=${encodeURIComponent(ssoData.code)}&returnTo=${encodeURIComponent(targetDashboard)}&redirect=${encodeURIComponent(targetDashboard)}&next=${encodeURIComponent(targetDashboard)}`;
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please verify your credentials.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full overflow-hidden bg-white text-[#2d2418] selection:bg-[#C6AF87]/35 selection:text-[#2d2418]">
      <div className="absolute inset-0 bg-white" />
      <div className="relative z-10 flex min-h-screen w-full flex-col lg:flex-row">
        <section className="flex w-full flex-col justify-center px-6 py-10 sm:px-12 lg:w-[55%] lg:px-20">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8">
              <div className="mb-8 flex items-center gap-3">
                <a href="/" className="flex min-w-0 items-center gap-3 rounded-2xl  px-0 py-0  transition active:scale-[0.98]">
                  <img src="/img/logo.svg" alt="Bartolović" className="h-16 w-auto max-w-[150px] object-contain" />
                  {/* <div className="border-l border-[#C6AF87]/35 pl-3">
                    <span className="block text-base font-black uppercase tracking-[0.08em] text-[#2b2115]">Bartolović</span>
                    <span className="block text-[9px] font-black uppercase tracking-[0.28em] text-[#9f7f46]">Kalp Portal</span>
                  </div> */}
                </a>
                <div className="ml-auto hidden items-center gap-1.5 rounded-full border border-[#9f7f46]/30 bg-white/45 px-3 py-1.5 text-[11px] font-bold text-[#6f4b1f] shadow-sm sm:inline-flex">
                  <span className="h-2 w-2 rounded-full bg-[#9f7f46]" />
                  Admin Portal
                </div>
              </div>

              <h1 className="text-3xl font-black tracking-tight text-[#2d2418] sm:text-4xl">Admin Login</h1>
              <p className="mt-3 text-sm leading-6 text-[#6f5a3a]">Enter your Kalp Admin credentials to access the OPG Bartolović administration dashboard.</p>
            </div>

            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-400/25 bg-red-500/10 p-4 text-sm font-semibold text-red-100">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#6f5a3a]">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9f7f46]" />
                  <input
                    type="email"
                    required
                    disabled={loading}
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    className="h-12 w-full rounded-2xl border border-[#d8c39a] bg-[#f7efe0] pl-11 pr-4 text-sm font-semibold text-[#2d2418] shadow-sm shadow-[#7a5020]/5 outline-none transition placeholder:text-[#8a7658]/55 focus:border-[#9f7f46] focus:ring-4 focus:ring-[#C6AF87]/25 disabled:opacity-60"
                    placeholder="admin@opgbartolovic.hr"
                    autoComplete="email"
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#6f5a3a]">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9f7f46]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    disabled={loading}
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                    className="h-12 w-full rounded-2xl border border-[#d8c39a] bg-[#f7efe0] pl-11 pr-12 text-sm font-semibold text-[#2d2418] shadow-sm shadow-[#7a5020]/5 outline-none transition placeholder:text-[#8a7658]/55 focus:border-[#9f7f46] focus:ring-4 focus:ring-[#C6AF87]/25 disabled:opacity-60"
                    placeholder="Enter password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-[#8a7658] transition hover:bg-[#C6AF87]/15 hover:text-[#2d2418]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#9f7f46] px-5 text-sm font-extrabold text-white shadow-lg shadow-[#9f7f46]/25 transition hover:bg-[#7a5020] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Signing in...' : 'Sign In'}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <div className="mt-8 flex items-center justify-between border-t border-[#c9aa71]/35 pt-6 text-xs font-semibold text-[#7b6647]">
              <a href="/" className="transition hover:text-[#2d2418]">Back to storefront</a>
              <a href="/login" className="transition hover:text-[#2d2418]">Local login</a>
            </div>
          </div>
        </section>

        <section className="relative hidden w-[45%] flex-col justify-between overflow-hidden border-l border-[#c9aa71]/35 bg-[#f7efe0] p-10 lg:flex">
          <div className="absolute inset-0 bg-[#f7efe0]" />
          <div className="relative z-10 max-w-[560px]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#9f7f46]/25 bg-white/45 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#6f4b1f] shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5" />
              Store Administration
            </div>
            <p className="mb-3 text-[26px] font-black leading-[1.16] tracking-tight text-[#2d2418] xl:text-[30px]">Manage your honey store with complete control.</p>
            <p className="mb-6 max-w-lg text-sm leading-6 text-[#6f5a3a]">Open the centralized dashboard to update pages, products, orders, and customer communication securely.</p>

            <div className="space-y-2.5">
              {[
                { icon: Package, title: 'Catalog Management', desc: 'Update honey products, pricing, stock, and product details.' },
                { icon: ShoppingCart, title: 'Order Tracking', desc: 'Review customer purchases and manage fulfilment from one dashboard.' },
                { icon: ShieldAlert, title: 'Secure Access', desc: 'Protected administrator console with encrypted session handoff.' },
              ].map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex items-start gap-3 rounded-2xl border border-[#c9aa71]/35 bg-white/46 p-3.5 shadow-lg shadow-[#7a5020]/8 backdrop-blur-sm">
                    <div className="shrink-0 rounded-xl border border-[#9f7f46]/20 bg-[#9f7f46]/10 p-2 text-[#7a5020]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="mb-1 text-[15px] font-extrabold leading-tight tracking-tight text-[#2d2418]">{feature.title}</p>
                      <p className="text-[11px] leading-normal text-[#7b6647]">{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-[#c9aa71]/45 pt-6 text-[11px] text-[#7b6647]">
            <span>Portal: <strong className="text-[#2d2418]">OPG Bartolović</strong></span>
            <span>Access: <strong className="text-[#6f4b1f]">Authorized Personnel</strong></span>
          </div>
        </section>
      </div>
    </main>
  );
}

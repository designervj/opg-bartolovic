'use client';

import { FormEvent, useEffect, useState } from 'react';
import { AlertCircle, ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch('/api/admin/session', { cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => setIsAuthenticated(Boolean(payload?.isAuthenticated)))
      .catch(() => setIsAuthenticated(false));
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    setIsLoading(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setError(payload?.message || 'Email or password is incorrect.');
      return;
    }

    window.location.href = '/';
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#17120c] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(198,175,135,0.22),transparent_32%),radial-gradient(circle_at_85%_85%,rgba(249,228,183,0.12),transparent_36%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(23,18,12,0.92),rgba(35,35,35,0.84)),url('/img/hero-img.png')] bg-cover bg-center" />

      <section className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden flex-col justify-between border-r border-white/10 px-12 py-10 lg:flex">
          <a href="/" className="inline-flex w-fit items-center gap-3">
            <img src="/img/logo.svg" alt="Bartolović" className="h-12 w-auto" />
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.28em] text-[#C6AF87]">Bartolović</p>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">Admin Portal</p>
            </div>
          </a>

          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C6AF87]/35 bg-[#C6AF87]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#F9E4B7]">
              <ShieldCheck className="h-4 w-4" />
              Secure CMS Access
            </div>
            <h1 className="text-5xl font-black leading-tight tracking-tight text-white">
              Manage OPG Bartolović content with confidence.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/65">
              Sign in with your Kalp Admin credentials to unlock inline editing, page comments, and admin controls for this website.
            </p>
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">Kalp Admin Workspace</p>
        </div>

        <div className="flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-[460px] rounded-[28px] border border-white/12 bg-white/[0.08] p-6 shadow-2xl shadow-black/35 backdrop-blur-2xl sm:p-8">
            <div className="mb-8 lg:hidden">
              <a href="/" className="inline-flex items-center gap-3">
                <img src="/img/logo.svg" alt="Bartolović" className="h-10 w-auto" />
                <span className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#C6AF87]">Bartolović</span>
              </a>
            </div>

            <div className="mb-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#C6AF87]">Kalp Admin</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Admin Login</h2>
              <p className="mt-3 text-sm leading-6 text-white/58">Use the same email and password you use for Kalp Admin.</p>
            </div>

          {isAuthenticated ? (
            <div className="space-y-4 text-center">
              <p className="rounded-2xl border border-[#C6AF87]/25 bg-[#C6AF87]/10 px-4 py-3 text-sm font-semibold text-[#F9E4B7]">
                You are already logged in.
              </p>
              <a
                href="/"
                className="block rounded-2xl bg-[#C6AF87] px-5 py-3 text-sm font-extrabold text-[#232323] transition hover:bg-[#F9E4B7]"
              >
                Go to website
              </a>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-2xl border border-white/15 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-white/10"
              >
                Logout
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-white/65">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C6AF87]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    className="h-12 w-full rounded-2xl border border-white/12 bg-white/[0.07] pl-11 pr-4 text-sm font-semibold text-white outline-none transition placeholder:text-white/30 focus:border-[#C6AF87] focus:ring-4 focus:ring-[#C6AF87]/15"
                    placeholder="admin@opgbartolovic.hr"
                    autoComplete="email"
                    autoFocus
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-white/65">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C6AF87]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                    className="h-12 w-full rounded-2xl border border-white/12 bg-white/[0.07] pl-11 pr-12 text-sm font-semibold text-white outline-none transition placeholder:text-white/30 focus:border-[#C6AF87] focus:ring-4 focus:ring-[#C6AF87]/15"
                    placeholder="Enter password"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45 transition hover:text-white"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex gap-3 rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#C6AF87] px-5 text-sm font-extrabold text-[#232323] shadow-lg shadow-[#C6AF87]/20 transition hover:bg-[#F9E4B7] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
          )}
          </div>
        </div>
      </section>
    </main>
  );
}

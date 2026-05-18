"use client";

import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex bg-white">
      {/* ─── LEFT: LOGIN FORM ─── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24 py-12">
        <div className="max-w-md w-full mx-auto">
          
          {/* Logo */}
          <Link href="/" className="inline-block mb-12">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">TradeCraft</span>
          </Link>

          {/* Header */}
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
          <p className="text-slate-500 mb-10">
            Dont have an account?{" "}
            <Link href="/signup" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
              Sign up for free
            </Link>
          </p>

          {/* Social Login */}
          <div className="space-y-3 mb-8">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-700 font-medium cursor-pointer">
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>

            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-700 font-medium cursor-pointer">
              <FaApple className="text-xl text-slate-900" />
              Continue with Apple
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-400 font-medium">or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-slate-600 cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-emerald-500/20 cursor-pointer active:scale-[0.98]"
            >
              Sign in to TradeCraft
            </button>
          </form>

          {/* Footer */}
          <p className="mt-10 text-center text-xs text-slate-400">
            Protected by reCAPTCHA and subject to the{" "}
            <Link href="/privacy" className="underline hover:text-slate-600 transition-colors">Privacy Policy</Link>
            {" "}and{" "}
            <Link href="/terms" className="underline hover:text-slate-600 transition-colors">Terms of Service</Link>.
          </p>
        </div>
      </div>

      {/* ─── RIGHT: VISUAL / TESTIMONIAL ─── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
        
        {/* Background image - FULL COVER */}
        <div 
          className="absolute inset-0 bg-[url('/Man-laptop.jpg')] bg-cover bg-center"
          aria-hidden="true"
        />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-slate-950/70" />
        
        {/* Optional: subtle dot pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        <div className="relative z-10 max-w-lg px-12 text-center">
          {/* Quote */}
          <blockquote className="text-2xl font-medium text-white leading-relaxed mb-8">
            TradeCraft transformed how I analyze my trades. The automated journaling alone saved me 10 hours a week.
          </blockquote>
          
          {/* Author */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg">
              JD
            </div>
            <div className="text-left">
              <p className="text-white font-semibold">James Davidson</p>
              <p className="text-slate-400 text-sm">Pro Trader, 8+ years</p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 pt-12 border-t border-white/10 grid grid-cols-3 gap-8">
            <div>
              <p className="text-2xl font-bold text-white">20.2B+</p>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Trades Journaled</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">100K+</p>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Active Traders</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">4.9/5</p>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">User Rating</p>
            </div>
          </div>
        </div>

        {/* Decorative gradient blobs */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
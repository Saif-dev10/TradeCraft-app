"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(null);

  function handleNavigate(path) {
    router.push(path);
  }

  function toggleFaq(index) {
    setOpenFaq(openFaq === index ? null : index);
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans antialiased">

      {/* ─── HERO SECTION ─── */}
      <div className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('/laptop.jpg')] bg-cover bg-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-slate-950/75" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Look Before You Leap
          </h1>
          <p className="text-slate-300 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
            Professional trade journaling that turns your data into discipline. 
            Backtest, analyze, and improve — automatically.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 active:opacity-75 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-emerald-500/20 cursor-pointer"
              onClick={() => handleNavigate("/login")}
            >
              Start Journaling Free
            </button>
            <button className="px-8 py-3.5 bg-white/10 hover:bg-white/20 active:opacity-75 text-white font-semibold rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-200 cursor-pointer">
              See How It Works
            </button>
          </div>
        </div>
      </div>

      {/* ─── STATS BAR ─── */}
      <section className="bg-slate-50 border-b border-slate-200 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { value: "20.2B+", label: "Trades Journaled" },
            { value: "205K", label: "Backtested Sessions" },
            { value: "1M+", label: "Trades Shared" },
            { value: "100K+", label: "Active Traders" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-2 font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-4">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Three Steps to Better Trading
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Connect Your Broker",
                desc: "Sync with MT4, MT5, or upload your trade files directly. We support 50+ brokers out of the box.",
              },
              {
                step: "02",
                title: "Journal Automatically",
                desc: "Every trade is captured, tagged, and analyzed in real-time. No manual data entry required.",
              },
              {
                step: "03",
                title: "Analyze & Improve",
                desc: "Get actionable insights on your win rate, R-multiples, and psychological patterns.",
              },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-emerald-600">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURE HIGHLIGHT ─── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-4">
            Automated Journaling
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            The Powerful and Automated<br className="hidden md:block" /> Trade Journaling Platform
          </h2>
          <p className="text-slate-500 text-lg mt-6 max-w-xl mx-auto leading-relaxed">
            You focus on trading while we focus on helping you get better. With automated journaling, we do the heavy lifting for you.
          </p>
          <button 
            className="mt-10 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 active:opacity-75 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-emerald-500/20 cursor-pointer"
            onClick={() => handleNavigate("/login")}>
            Get Started Now
          </button>
        </div>
      </section>

      {/* ─── DETAILED FEATURE GRID ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-4">Features</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Everything You Need to Trade Smarter
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Trade Analytics",
                desc: "Deep dive into your performance with advanced metrics like Sharpe ratio, max drawdown, and expectancy.",
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
              },
              {
                title: "Psychology Tracking",
                desc: "Log your emotional state before and after trades to identify psychological patterns affecting performance.",
                icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: "Risk Management",
                desc: "Set and track risk limits per trade, per day, and per strategy. Get alerts when you're approaching thresholds.",
                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
              },
              {
                title: "Strategy Backtesting",
                desc: "Backtest your strategies against historical data to validate edge before risking real capital.",
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: "Trade Sharing",
                desc: "Share verified trade setups with your community or mentor. Export reports in PDF or CSV format.",
                icon: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z",
              },
              {
                title: "Mobile App",
                desc: "Journal on the go with our iOS and Android apps. Sync seamlessly across all your devices.",
                icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
              },
            ].map((feature, i) => (
              <div 
                key={i} 
                className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTEGRATIONS ─── */}
      <section className="py-16 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-10">
          Trusted by traders using
        </p>
        <div className="relative">
          <div className="flex items-center justify-center gap-16 md:gap-24 transition-all duration-500">
            <div className="flex items-center justify-center h-12 w-32 rounded-md">
              <Image src="/meta5-logo.jpg" alt="Meta Trader 5" width={120} height={40} className="object-contain" />
            </div>
            <div className="flex items-center justify-center h-12 w-32 rounded-md">
              <Image src="/mt4-logo.jpg" alt="Meta Trader 4" width={120} height={40} className="object-contain" />
            </div>
            <div className="flex items-center justify-center h-12 w-32 rounded-md">
              <Image src="/meta5-logo.jpg" alt="Meta Trader 5" width={120} height={40} className="object-contain" />
            </div>
            <div className="flex items-center justify-center h-12 w-32 rounded-md">
              <Image src="/mt4-logo.jpg" alt="Meta Trader 4" width={120} height={40} className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-4">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Trusted by Professional Traders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "TradeCraft helped me identify that I was overtrading on Fridays. My win rate jumped 23% after I fixed that one pattern.",
                author: "Sarah Chen",
                role: "Forex Trader, 5 years",
                initials: "SC",
              },
              {
                quote: "The automated journaling alone saves me 8 hours a week. I can finally focus on actually trading instead of spreadsheet management.",
                author: "Marcus Johnson",
                role: "Day Trader, Futures",
                initials: "MJ",
              },
              {
                quote: "I went from break-even to consistently profitable once I started tracking my R-multiples with TradeCraft's analytics.",
                author: "Elena Rodriguez",
                role: "Swing Trader, Stocks",
                initials: "ER",
              },
            ].map((testimonial, i) => (
              <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed mb-6">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.author}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="py-24 px-6 bg-slate-950 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-4">Pricing</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Simple, Transparent Pricing
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto">
              Start free, upgrade when youre ready. No hidden fees, no credit card required to start.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                desc: "Perfect for getting started",
                features: ["Up to 100 trades/month", "Basic analytics", "1 broker connection", "Community support"],
                cta: "Get Started",
                highlighted: false,
              },
              {
                name: "Pro",
                price: "$29",
                period: "/month",
                desc: "Level up traders",
                features: ["Unlimited trades", "Advanced analytics", "5 broker connections", "Priority support", "Strategy backtesting", "Psychology tracking"],
                cta: "Start Free Trial",
                highlighted: true,
              },
              {
                name: "Team",
                price: "$79",
                period: "/month",
                desc: "For prop firms & mentors",
                features: ["Everything in Pro", "Unlimited team members", "White-label reports", "API access", "Dedicated account manager", "Custom integrations"],
                cta: "Contact Sales",
                highlighted: false,
              },
            ].map((plan, i) => (
              <div 
                key={i} 
                className={`relative p-8 rounded-2xl border ${
                  plan.highlighted 
                    ? "bg-emerald-500/10 border-emerald-500/50" 
                    : "bg-slate-900 border-slate-800"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-6">{plan.desc}</p>
                
                <div className="mb-8">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-slate-400">{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-slate-300">
                      <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 cursor-pointer ${
                    plan.highlighted
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                      : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                  }`}
                  onClick={() => handleNavigate("/login")}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-4">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How does the broker sync work?",
                a: "We use read-only API connections to your broker. We never execute trades or move funds. Your credentials are encrypted and we only pull historical trade data for journaling purposes.",
              },
              {
                q: "Can I use TradeCraft for free?",
                a: "Absolutely. Our Free plan includes up to 100 trades per month with basic analytics. Most traders start here and upgrade once they see the value.",
              },
              {
                q: "Is my trade data secure?",
                a: "Yes. We use bank-level 256-bit encryption, SOC 2 Type II compliance, and your data is never sold or shared with third parties. You can export or delete your data at any time.",
              },
              {
                q: "What brokers do you support?",
                a: "We support MetaTrader 4, MetaTrader 5, cTrader, TradingView, and 50+ major brokers. If yours isn't listed, you can always upload CSV files or enter trades manually.",
              },
              {
                q: "Can I cancel my subscription anytime?",
                a: "Yes, you can cancel anytime with no questions asked. If you cancel, you'll retain access until the end of your billing period.",
              },
            ].map((faq, i) => (
              <div 
                key={i} 
                className="border border-slate-200 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                  onClick={() => toggleFaq(i)}
                >
                  <span className="font-semibold text-slate-900">{faq.q}</span>
                  <svg 
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-24 px-6 bg-emerald-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Ready to Transform Your Trading?
          </h2>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Join 100,000+ traders who use TradeCraft to journal, analyze, and improve their performance every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-8 py-4 bg-white text-emerald-600 hover:bg-emerald-50 font-bold rounded-lg transition-all duration-200 shadow-xl cursor-pointer"
              onClick={() => handleNavigate("/login")}
            >
              Start Journaling Free
            </button>
            <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all duration-200 border border-emerald-400 cursor-pointer">
              Watch Demo
            </button>
          </div>
          <p className="text-emerald-100 text-sm mt-6">No credit card required. Free forever plan available.</p>
        </div>
      </section>
    </main>
  );
}
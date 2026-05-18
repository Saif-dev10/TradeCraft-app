 "use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  function handleNavigate(path) {
    router.push(path);
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans antialiased">

      {/* ─── HERO SECTION ─── */}
      <div className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background image with overlay for readability */}

        <div 
          className="absolute inset-0 bg-[url('/laptop.jpg')] bg-cover bg-center"
          aria-hidden="true"
        />

        <div className="absolute inset-0 bg-slate-950/75" /> {/* Dark overlay for text contrast */}
        
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

      {/* ─── FEATURE HIGHLIGHT ─── */}
      <section className="py-24 px-6 bg-white">
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

      {/* ─── INTEGRATIONS / LOGO MARQUEE ─── */}
      <section className="py-16 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-10">
          Trusted by traders using
        </p>

        <div className="relative">
          <div className="flex items-center justify-center gap-16 md:gap-24 transition-all duration-500">

            {/* Replace these with your actual integration logos */}
            <div className="flex items-center justify-center h-12 w-32 rounded-md">
              <Image 
                src="/meta5-logo.jpg" 
                alt="Meta Trader 5 Logo" 
                width={120} 
                height={40} 
                className="object-contain"
              />
            </div>

            <div className="flex items-center justify-center h-12 w-32 rounded-md">
              <Image 
                src="/mt4-logo.jpg" 
                alt="Meta Trader 4 Logo" 
                width={120} 
                height={40} 
                className="object-contain"
              />
            </div>

            <div className="flex items-center justify-center h-12 w-32 rounded-md">
              <Image 
                src="/meta5-logo.jpg" 
                alt="Meta Trader 5 Logo" 
                width={120} 
                height={40} 
                className="object-contain"
              />
            </div>

            <div className="flex items-center justify-center h-12 w-32 rounded-md">
              <Image 
                src="/mt4-logo.jpg" 
                alt="Meta Trader 4 Logo" 
                width={120} 
                height={40} 
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURE CARDS ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Automated Journaling",
              desc: "Easy methods like broker sync, file upload, or manual trade entry. Everything is automated and organized.",
            },
            {
              title: "Unlimited Accounts",
              desc: "Stay on top of your progress with unlimited account management across all your brokers and strategies.",
            },
            {
              title: "Automated Statistics",
              desc: "Get detailed insights into your trading performance with automated statistical analysis and reporting.",
            },
          ].map((feature, i) => (
            <div 
              key={i} 
              className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
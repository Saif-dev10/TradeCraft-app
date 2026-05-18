export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
            {/* ─── FOOTER ─── */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-6 border-t border-slate-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold text-white tracking-tight">TradeCraft</div>
          <div className="flex gap-8 text-sm">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-white transition-colors cursor-pointer">Security</span>
          </div>
          <p className="text-xs text-slate-600 text-white">© {currentYear} TradeCraft. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
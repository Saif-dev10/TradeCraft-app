"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "../../components/Sidebar";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";

// ─── LocalStorage Helpers ───
function loadFromStorage(key, fallback = null) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

export default function Journal() {
  const router = useRouter();
  const pathname = usePathname();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ─── Live Stats State (all start at 0) ───
  const [netPnL, setNetPnL] = useState(0);
  const [totalTrades, setTotalTrades] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [profitFactor, setProfitFactor] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);
  const [hasRealData, setHasRealData] = useState(false);

  // ─── Custom Input States ───
  const [instrument, setInstrument] = useState("");
  const [instrumentCustom, setInstrumentCustom] = useState(false);
  const [instrumentInput, setInstrumentInput] = useState("");

  const [tradeType, setTradeType] = useState("");

  const [strategy, setStrategy] = useState("");
  const [strategyCustom, setStrategyCustom] = useState(false);
  const [strategyInput, setStrategyInput] = useState("");

  const [timeFrame, setTimeFrame] = useState("");
  const [timeFrameCustom, setTimeFrameCustom] = useState(false);
  const [timeFrameInput, setTimeFrameInput] = useState("");

  const [entry, setEntry] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [positionSize, setPositionSize] = useState("");
  const [riskReward, setRiskReward] = useState("");
  const [session, setSession] = useState("");
  const [outcome, setOutcome] = useState("");
  const [profitLoss, setProfitLoss] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const navItems = [
    { label: "Journal", path: "/journal" },
    { label: "Calendar", path: "/calendar" },
    { label: "Trades", path: "/trades" },
    { label: "Calculator", path: "/calculator" },
  ];

  function goTo(path) {
    router.push(path);
    setIsMenuOpen(false);
  }

  function inputElem(setter) {
    return (event) => {
      setter(event.target.value);
    };
  }

  // ─── Calculate live stats from trades & calculator ───
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Load calculator account balance
    const accounts = loadFromStorage("tradecraft_accounts", []);
    const selectedId = loadFromStorage("tradecraft_selected_account", null);
    const selectedAccount = accounts.find((a) => a.id === selectedId) || accounts[0];
    const balance = selectedAccount?.balance || 0;
    setAccountBalance(balance);

    // Load trades
    const trades = loadFromStorage("trades", []);

    if (trades.length === 0) {
      setNetPnL(0);
      setTotalTrades(0);
      setWinRate(0);
      setProfitFactor(0);
      setHasRealData(false);
      return;
    }

    setHasRealData(true);

    // Calculate Net P&L
    const totalPnL = trades.reduce((sum, t) => sum + (parseFloat(t.pnl) || 0), 0);
    setNetPnL(totalPnL);

    // Total trades count
    setTotalTrades(trades.length);

    // Win Rate
    const wins = trades.filter((t) => (parseFloat(t.pnl) || 0) > 0).length;
    const losses = trades.filter((t) => (parseFloat(t.pnl) || 0) < 0).length;
    const breakevens = trades.filter((t) => (parseFloat(t.pnl) || 0) === 0).length;
    const winRateCalc = trades.length > 0 ? ((wins / trades.length) * 100).toFixed(2) : "0.00";
    setWinRate(parseFloat(winRateCalc));

    // Profit Factor = Gross Profit / Gross Loss
    const grossProfit = trades
      .filter((t) => (parseFloat(t.pnl) || 0) > 0)
      .reduce((sum, t) => sum + (parseFloat(t.pnl) || 0), 0);
    const grossLoss = Math.abs(
      trades
        .filter((t) => (parseFloat(t.pnl) || 0) < 0)
        .reduce((sum, t) => sum + (parseFloat(t.pnl) || 0), 0)
    );
    const pf = grossLoss > 0 ? (grossProfit / grossLoss).toFixed(2) : grossProfit > 0 ? "∞" : "0.00";
    setProfitFactor(parseFloat(pf));

    // Also update journal_entries for calendar page integration
    const journalEntries = trades.map((t) => ({
      id: t.id,
      date: t.openTimestamp,
      pnl: t.pnl,
      symbol: t.symbol,
      strategy: t.strategy,
      outcome: t.outcome,
    }));
    localStorage.setItem("tradecraft_journal_entries", JSON.stringify(journalEntries));
  }, []);

  // Re-calculate stats when trades change (listen for storage events)
  useEffect(() => {
    function handleStorageChange() {
      const trades = loadFromStorage("trades", []);
      if (trades.length > 0) {
        setHasRealData(true);
        const totalPnL = trades.reduce((sum, t) => sum + (parseFloat(t.pnl) || 0), 0);
        setNetPnL(totalPnL);
        setTotalTrades(trades.length);

        const wins = trades.filter((t) => (parseFloat(t.pnl) || 0) > 0).length;
        const winRateCalc = trades.length > 0 ? ((wins / trades.length) * 100).toFixed(2) : "0.00";
        setWinRate(parseFloat(winRateCalc));

        const grossProfit = trades
          .filter((t) => (parseFloat(t.pnl) || 0) > 0)
          .reduce((sum, t) => sum + (parseFloat(t.pnl) || 0), 0);
        const grossLoss = Math.abs(
          trades
            .filter((t) => (parseFloat(t.pnl) || 0) < 0)
            .reduce((sum, t) => sum + (parseFloat(t.pnl) || 0), 0)
        );
        const pf = grossLoss > 0 ? (grossProfit / grossLoss).toFixed(2) : grossProfit > 0 ? "∞" : "0.00";
        setProfitFactor(parseFloat(pf));
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleInstrumentChange = (e) => {
    const val = e.target.value;
    if (val === "__custom__") {
      setInstrumentCustom(true);
      setInstrument("");
    } else {
      setInstrumentCustom(false);
      setInstrument(val);
      setInstrumentInput("");
    }
  };

  const handleStrategyChange = (e) => {
    const val = e.target.value;
    if (val === "__custom__") {
      setStrategyCustom(true);
      setStrategy("");
    } else {
      setStrategyCustom(false);
      setStrategy(val);
      setStrategyInput("");
    }
  };

  const handleTimeFrameChange = (e) => {
    const val = e.target.value;
    if (val === "__custom__") {
      setTimeFrameCustom(true);
      setTimeFrame("");
    } else {
      setTimeFrameCustom(false);
      setTimeFrame(val);
      setTimeFrameInput("");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    const finalInstrument = instrumentCustom ? instrumentInput : instrument;
    const finalStrategy = strategyCustom ? strategyInput : strategy;
    const finalTimeFrame = timeFrameCustom ? timeFrameInput : timeFrame;

    const pnlValue = 
      outcome === "loss"
        ? -Math.abs(parseFloat(profitLoss) || 0)
        : Math.abs(parseFloat(profitLoss) || 0);

    const newTrade = {
      id: Date.now(),
      symbol: finalInstrument,
      tradeType,
      strategy: finalStrategy,
      timeframe: finalTimeFrame,
      entry: parseFloat(entry) || 0,
      stopLoss: parseFloat(stopLoss) || 0,
      takeProfit: parseFloat(takeProfit) || 0,
      position: parseFloat(positionSize) || 0,
      riskReward: riskReward,
      session,
      outcome: outcome,
      pnl: pnlValue,
      title,
      content,
      openTimestamp: new Date().toISOString(),
      closeTimestamp: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("trades") || "[]");
    const updated = [newTrade, ...existing];
    localStorage.setItem("trades", JSON.stringify(updated));

    // Update live stats immediately
    const allTrades = updated;
    const totalPnL = allTrades.reduce((sum, t) => sum + (parseFloat(t.pnl) || 0), 0);
    setNetPnL(totalPnL);
    setTotalTrades(allTrades.length);
    setHasRealData(true);

    const wins = allTrades.filter((t) => (parseFloat(t.pnl) || 0) > 0).length;
    const winRateCalc = allTrades.length > 0 ? ((wins / allTrades.length) * 100).toFixed(2) : "0.00";
    setWinRate(parseFloat(winRateCalc));

    const grossProfit = allTrades
      .filter((t) => (parseFloat(t.pnl) || 0) > 0)
      .reduce((sum, t) => sum + (parseFloat(t.pnl) || 0), 0);
    const grossLoss = Math.abs(
      allTrades
        .filter((t) => (parseFloat(t.pnl) || 0) < 0)
        .reduce((sum, t) => sum + (parseFloat(t.pnl) || 0), 0)
    );
    const pf = grossLoss > 0 ? (grossProfit / grossLoss).toFixed(2) : grossProfit > 0 ? "∞" : "0.00";
    setProfitFactor(parseFloat(pf));

    // Update journal entries for calendar
    const journalEntries = allTrades.map((t) => ({
      id: t.id,
      date: t.openTimestamp,
      pnl: t.pnl,
      symbol: t.symbol,
      strategy: t.strategy,
      outcome: t.outcome,
    }));
    localStorage.setItem("tradecraft_journal_entries", JSON.stringify(journalEntries));

    // Reset form
    setTitle("");
    setContent("");
    setInstrument("");
    setInstrumentCustom(false);
    setInstrumentInput("");
    setTradeType("");
    setStrategy("");
    setStrategyCustom(false);
    setStrategyInput("");
    setTimeFrame("");
    setTimeFrameCustom(false);
    setTimeFrameInput("");
    setEntry("");
    setStopLoss("");
    setTakeProfit("");
    setPositionSize("");
    setRiskReward("");
    setSession("");
    setOutcome("");
    setProfitLoss("");

    router.push("/trades");
  }

  // Preset options
  const instrumentOptions = [
    "EUR/USD", "GBP/USD", "USD/JPY", "XAU/USD", "US30", "BTC/USD",
    "AUD/USD", "USD/CAD", "NZD/USD", "EUR/GBP", "GBP/JPY", "NAS100",
    "SPX500", "USOIL", "EUR/JPY",
  ];

  const strategyOptions = [
    "Supply & Demand", "Support & Resistance", "Trend Following", "Breakout",
    "Reversal", "Scalping", "CRT", "ICT", "Smart Money Concepts",
    "Price Action", "Moving Average Crossover", "Fibonacci Retracement",
    "Bollinger Bands", "RSI Divergence",
  ];

  const timeFrameOptions = [
    "1 Minute", "5 Minutes", "15 Minutes", "30 Minutes", "1 Hour",
    "4 Hours", "Daily", "Weekly", "Monthly", "Tick", "Renko",
  ];

  // Format helpers
  const formatCurrency = (val) => {
    const num = parseFloat(val) || 0;
    return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatPercent = (val) => {
    const num = parseFloat(val) || 0;
    return num.toFixed(2);
  };

  return (
    <main className="min-h-screen bg-stone-100 flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      <>
        {isMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/30 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        <aside
          className={`
          md:hidden fixed top-0 left-0 h-screen w-60 bg-white shadow-xl z-50 flex flex-col p-4
          transition-transform duration-300 ease-in-out 
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <h1
            className="text-2xl font-bold pt-4 cursor-pointer hover:text-stone-600 active:opacity-75 transition-colors text-stone-800"
            onClick={() => goTo("/journal")}
          >
            TradeCraft
          </h1>

          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-stone-100 text-stone-600 text-lg cursor-pointer"
          >
            <IoCloseSharp className="text-2xl" />
          </button>

          <nav className="flex flex-col gap-1 w-full mt-10">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => goTo(item.path)}
                className={`text-left text-base py-2.5 px-4 rounded-md transition-colors cursor-pointer ${
                  pathname === item.path
                    ? "bg-stone-800 text-white font-medium"
                    : "text-stone-600 hover:bg-stone-100 active:opacity-75"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>
      </>

      {/* Right Side */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-stone-200 h-16 flex items-center gap-4 px-6 shadow-sm sticky top-0 z-30">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <RiMenuLine className="text-2xl text-stone-800" />
          </button>

          <div className="flex-1" />

          <button className="bg-stone-800 hover:bg-stone-700 active:opacity-75 py-1.5 sm:py-2 px-2 sm:px-4 rounded-md text-white text-xs sm:text-sm font-medium cursor-pointer transition-colors shrink-0">
            Filters
          </button>

          <button className="bg-stone-800 hover:bg-stone-700 active:opacity-75 py-1.5 sm:py-2 px-2 sm:px-4 rounded-md text-white text-xs sm:text-sm font-medium cursor-pointer transition-colors shrink-0 sm:block">
            Account (1)
          </button>

          <div className="border border-stone-300 rounded-md py-1.5 sm:py-2 px-2 sm:px-4 bg-white flex items-center shrink-0">
            <span className="text-sm text-stone-600 font-medium">{today}</span>
          </div>
        </header>

        {/* Main Content */}
        <div className="px-6 py-8 max-w-6xl w-full mx-auto">
          {/* Stats */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Net P&L */}
            <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition cursor-pointer text-center">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
                Net P&L
              </p>
              <p className={`text-2xl font-bold ${netPnL >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                {netPnL >= 0 ? "+" : ""}${formatCurrency(netPnL)}
              </p>
              <p className="text-xs text-stone-400 mt-1">
                {hasRealData ? "Live from all trades" : "Start trading to see data"}
              </p>
            </div>

            {/* Total Trades */}
            <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition cursor-pointer text-center">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
                Total Trades
              </p>
              <p className="text-2xl font-bold text-stone-800">{totalTrades}</p>
              <p className="text-xs text-stone-400 mt-1">
                {hasRealData ? "All time" : "No trades yet"}
              </p>
            </div>

            {/* Win Rate */}
            <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition cursor-pointer text-center">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
                Win Rate
              </p>
              <p className="text-2xl font-bold text-stone-800">{formatPercent(winRate)}%</p>
              <p className="text-xs text-stone-400 mt-1">
                {hasRealData ? "Win percentage" : "—"}
              </p>
            </div>

            {/* Profit Factor */}
            <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition cursor-pointer text-center">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
                Profit Factor
              </p>
              <p className="text-2xl font-bold text-stone-800">
                {profitFactor === Infinity ? "∞" : formatPercent(profitFactor)}
              </p>
              <p className="text-xs text-stone-400 mt-1">
                {hasRealData ? "Gross profit / loss" : "—"}
              </p>
            </div>
          </section>

          {/* Account Balance Display */}
          <div className="mt-4 bg-white rounded-lg shadow-sm border border-stone-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center">
                <span className="text-white text-sm font-bold">$</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                  Calculator Account Balance
                </p>
                <p className="text-lg font-bold text-stone-800">
                  ${formatCurrency(accountBalance)}
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push("/calculator")}
              className="text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors underline cursor-pointer"
            >
              Manage in Calculator →
            </button>
          </div>

          {/* Demo Mode Message */}
          {!hasRealData && (
            <div className="mt-4 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-3">
                <span className="text-lg sm:text-xl shrink-0">📊</span>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-amber-800">
                    Welcome to Your Trading Journal
                  </p>
                  <p className="text-[10px] sm:text-xs text-amber-700 mt-1 leading-relaxed">
                    All statistics start at zero. Once you log your first trade or deposit funds via the Calculator, your dashboard will automatically update with real-time performance data across all pages.
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Entry Options */}
            <section className="bg-white rounded-lg shadow-sm mt-6 border border-stone-200">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Instrument */}
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">
                      Instrument
                    </label>
                    {!instrumentCustom ? (
                      <div className="relative">
                        <select
                          className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 bg-white outline-none focus:border-stone-400 transition-colors cursor-pointer appearance-none pr-10"
                          value={instrument}
                          onChange={handleInstrumentChange}
                          required={!instrumentCustom}
                        >
                          <option value="">Select instrument</option>
                          {instrumentOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                          <option value="__custom__">+ Add Custom...</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. EUR/AUD, US100..."
                          className="flex-1 border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 placeholder-stone-400 outline-none focus:border-stone-400 transition-colors"
                          value={instrumentInput}
                          onChange={inputElem(setInstrumentInput)}
                          autoFocus
                          required
                        />
                        <button
                          type="button"
                          onClick={() => { setInstrumentCustom(false); setInstrumentInput(""); }}
                          className="px-3 py-2 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
                        >
                          <RiCloseLine size={18} />
                        </button>
                      </div>
                    )}
                    {instrumentCustom && (
                      <p className="text-xs text-stone-400 mt-1">Type any instrument or pair</p>
                    )}
                  </div>

                  {/* Trade Type */}
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">
                      Trade Type
                    </label>
                    <select
                      className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 bg-white outline-none focus:border-stone-400 transition-colors cursor-pointer appearance-none pr-10"
                      value={tradeType}
                      onChange={inputElem(setTradeType)}
                      required
                    >
                      <option value="">Select type</option>
                      <option value="buy">Buy</option>
                      <option value="sell">Sell</option>
                    </select>
                  </div>

                  {/* Strategy */}
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">
                      Strategy
                    </label>
                    {!strategyCustom ? (
                      <div className="relative">
                        <select
                          className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 bg-white outline-none focus:border-stone-400 transition-colors cursor-pointer appearance-none pr-10"
                          value={strategy}
                          onChange={handleStrategyChange}
                          required={!strategyCustom}
                        >
                          <option value="">Select strategy</option>
                          {strategyOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                          <option value="__custom__">+ Add Custom...</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. My Custom Strategy..."
                          className="flex-1 border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 placeholder-stone-400 outline-none focus:border-stone-400 transition-colors"
                          value={strategyInput}
                          onChange={inputElem(setStrategyInput)}
                          autoFocus
                          required
                        />
                        <button
                          type="button"
                          onClick={() => { setStrategyCustom(false); setStrategyInput(""); }}
                          className="px-3 py-2 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
                        >
                          <RiCloseLine size={18} />
                        </button>
                      </div>
                    )}
                    {strategyCustom && (
                      <p className="text-xs text-stone-400 mt-1">Type your own strategy name</p>
                    )}
                  </div>

                  {/* Timeframe */}
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">
                      Timeframe
                    </label>
                    {!timeFrameCustom ? (
                      <div className="relative">
                        <select
                          className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 bg-white outline-none focus:border-stone-400 transition-colors cursor-pointer appearance-none pr-10"
                          value={timeFrame}
                          onChange={handleTimeFrameChange}
                          required={!timeFrameCustom}
                        >
                          <option value="">Select timeframe</option>
                          {timeFrameOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                          <option value="__custom__">+ Add Custom...</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. 2 Hours, 8H..."
                          className="flex-1 border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 placeholder-stone-400 outline-none focus:border-stone-400 transition-colors"
                          value={timeFrameInput}
                          onChange={inputElem(setTimeFrameInput)}
                          autoFocus
                          required
                        />
                        <button
                          type="button"
                          onClick={() => { setTimeFrameCustom(false); setTimeFrameInput(""); }}
                          className="px-3 py-2 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
                        >
                          <RiCloseLine size={18} />
                        </button>
                      </div>
                    )}
                    {timeFrameCustom && (
                      <p className="text-xs text-stone-400 mt-1">Type any timeframe you use</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">
                      Entry Price
                    </label>
                    <input
                      type="number"
                      step="0.00001"
                      placeholder="0.00000"
                      className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 placeholder-stone-400 outline-none focus:border-stone-400 transition-colors"
                      value={entry}
                      onChange={inputElem(setEntry)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">
                      Stop Loss
                    </label>
                    <input
                      type="number"
                      step="0.00001"
                      placeholder="0.00000"
                      className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 placeholder-stone-400 outline-none focus:border-stone-400 transition-colors"
                      value={stopLoss}
                      onChange={inputElem(setStopLoss)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">
                      Take Profit
                    </label>
                    <input
                      type="number"
                      step="0.00001"
                      placeholder="0.00000"
                      className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 placeholder-stone-400 outline-none focus:border-stone-400 transition-colors"
                      value={takeProfit}
                      onChange={inputElem(setTakeProfit)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">
                      Position Size (Lots)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 placeholder-stone-400 outline-none focus:border-stone-400 transition-colors"
                      value={positionSize}
                      onChange={inputElem(setPositionSize)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">
                      Risk/Reward
                    </label>
                    <input
                      type="text"
                      placeholder="1:2"
                      className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 placeholder-stone-400 outline-none focus:border-stone-400 transition-colors"
                      value={riskReward}
                      onChange={inputElem(setRiskReward)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">
                      Trading Session
                    </label>
                    <select
                      className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 bg-white outline-none focus:border-stone-400 transition-colors cursor-pointer appearance-none pr-10"
                      value={session}
                      onChange={inputElem(setSession)}
                      required
                    >
                      <option value="">Select session</option>
                      <option value="London">London</option>
                      <option value="New York">New York</option>
                      <option value="Tokyo">Tokyo</option>
                      <option value="Sydney">Sydney</option>
                      <option value="London/NY Overlap">London/NY Overlap</option>
                      <option value="Asian">Asian</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">
                      Trade Outcome
                    </label>
                    <select
                      className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 bg-white outline-none focus:border-stone-400 transition-colors cursor-pointer appearance-none pr-10"
                      value={outcome}
                      onChange={inputElem(setOutcome)}
                      required
                    >
                      <option value="">Select outcome</option>
                      <option value="win">Win</option>
                      <option value="loss">Loss</option>
                      <option value="breakeven">Breakeven</option>
                      <option value="manual_close">Manual Close</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">
                      {/* P&L ($) */}

                      {outcome === "loss"
                        ? "Loss Amount ($)"
                        : outcome === "win"
                        ? "Profit Amount ($)"
                        : "P&L Amount ($)"
                      }
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 placeholder-stone-400 outline-none focus:border-stone-400 transition-colors"
                      value={profitLoss}
                      onChange={inputElem(setProfitLoss)}
                      required
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Journal Form */}
            <section className="bg-white rounded-lg shadow-sm mt-6 border border-stone-200">
              <div className="p-6">
                <input
                  value={title}
                  onChange={inputElem(setTitle)}
                  className="w-full border-b-2 border-stone-200 py-3 px-1 text-lg font-medium text-stone-800 placeholder-stone-400 outline-none focus:border-stone-800 transition-colors mb-4 bg-transparent"
                  placeholder="Entry title..."
                  required
                />
                <textarea
                  value={content}
                  onChange={inputElem(setContent)}
                  className="w-full h-48 border border-stone-200 rounded-md p-4 text-stone-700 placeholder-stone-400 outline-none focus:border-stone-400 focus:ring-0 transition-all resize-none leading-relaxed"
                  placeholder="Add trade journal here..."
                  required
                />
              </div>
            </section>

            <div className="flex justify-end mt-4">
              <button
                className="bg-stone-800 hover:bg-stone-700 active:opacity-75 px-6 py-2.5 text-white rounded-md text-sm font-medium cursor-pointer transition-colors"
                type="submit"
              >
                Save Entry
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
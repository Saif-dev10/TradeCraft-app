"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "../../components/Sidebar";
import { RiMenuLine } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";

export default function Journal() {
  const router = useRouter();
  const pathname = usePathname();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [instrument, setInstrument] = useState("");
  const [tradeType, setTradeType] = useState("");
  const [strategy, setStrategy] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
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

  function handleSubmit(e) {
    e.preventDefault();

    const newTrade = {
      id: Date.now(),
      symbol: instrument,
      tradeType,
      strategy,
      timeframe: timeFrame,
      entry: parseFloat(entry) || 0,
      stopLoss: parseFloat(stopLoss) || 0,
      takeProfit: parseFloat(takeProfit) || 0,
      position: parseFloat(positionSize) || 0,
      riskReward: riskReward,
      session,
      outcome: outcome,
      pnl: parseFloat(profitLoss) || 0,
      title,
      content,
      openTimestamp: new Date().toISOString(),
      closeTimestamp: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("trades") || "[]");
    localStorage.setItem("trades", JSON.stringify([newTrade, ...existing]));

    router.push("/trades");
  }

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
            <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition cursor-pointer text-center">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
                Net P&L
              </p>
              <p className="text-2xl font-bold text-emerald-700">+$700.00</p>
              <p className="text-xs text-stone-400 mt-1">This month</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition cursor-pointer text-center">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
                Total Trades
              </p>
              <p className="text-2xl font-bold text-stone-800">24</p>
              <p className="text-xs text-stone-400 mt-1">8 open</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition cursor-pointer text-center">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
                Win Rate
              </p>
              <p className="text-2xl font-bold text-stone-800">60.02%</p>
              <p className="text-xs text-stone-400 mt-1">14 wins / 10 losses</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition cursor-pointer text-center">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
                Profit Factor
              </p>
              <p className="text-2xl font-bold text-stone-800">1.44</p>
              <p className="text-xs text-stone-400 mt-1">
                Gross profit / Gross loss
              </p>
            </div>
          </section>

          <form onSubmit={handleSubmit}>
            {/* Entry Options */}
            <section className="bg-white rounded-lg shadow-sm mt-8 border border-stone-200">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Instrument */}
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">
                      Instrument
                    </label>
                    <select
                      className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 bg-white outline-none focus:border-stone-400 transition-colors cursor-pointer"
                      value={instrument}
                      onChange={inputElem(setInstrument)}
                      required
                    >
                      <option value="">Select instrument</option>
                      <option value="EUR/USD">EUR/USD</option>
                      <option value="GBP/USD">GBP/USD</option>
                      <option value="USD/JPY">USD/JPY</option>
                      <option value="XAU/USD">XAU/USD</option>
                      <option value="US30">US30</option>
                      <option value="BTC/USD">BTC/USD</option>
                    </select>
                  </div>

                  {/* Trade Type */}
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">
                      Trade Type
                    </label>
                    <select
                      className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 bg-white outline-none focus:border-stone-400 transition-colors cursor-pointer"
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
                    <select
                      className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 bg-white outline-none focus:border-stone-400 transition-colors cursor-pointer"
                      value={strategy}
                      onChange={inputElem(setStrategy)}
                      required
                    >
                      <option value="">Select strategy</option>
                      <option value="Supply & Demand">Supply & Demand</option>
                      <option value="Support & Resistance">
                        Support & Resistance
                      </option>
                      <option value="Trend Following">Trend Following</option>
                      <option value="Breakout">Breakout</option>
                      <option value="Reversal">Reversal</option>
                      <option value="Scalping">Scalping</option>
                      <option value="CRT">CRT</option>
                      <option value="ICT">ICT</option>
                    </select>
                  </div>

                  {/* Timeframe */}
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">
                      Timeframe
                    </label>
                    <select
                      className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 bg-white outline-none focus:border-stone-400 transition-colors cursor-pointer"
                      value={timeFrame}
                      onChange={inputElem(setTimeFrame)}
                      required
                    >
                      <option value="">Select timeframe</option>
                      <option value="1 Minute">1 Minute</option>
                      <option value="5 Minutes">5 Minutes</option>
                      <option value="15 Minutes">15 Minutes</option>
                      <option value="30 Minutes">30 Minutes</option>
                      <option value="1 Hour">1 Hour</option>
                      <option value="4 Hours">4 Hours</option>
                      <option value="Daily">Daily</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {/* Entry Price */}
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

                  {/* Stop Loss */}
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

                  {/* Take Profit */}
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
                  {/* Position Size */}
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

                  {/* Risk Reward */}
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

                  {/* Session */}
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">
                      Trading Session
                    </label>
                    <select
                      className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 bg-white outline-none focus:border-stone-400 transition-colors cursor-pointer"
                      value={session}
                      onChange={inputElem(setSession)}
                      required
                    >
                      <option value="">Select session</option>
                      <option value="London">London</option>
                      <option value="New York">New York</option>
                      <option value="Tokyo">Tokyo</option>
                      <option value="Sydney">Sydney</option>
                      <option value="London/NY Overlap">
                        London/NY Overlap
                      </option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {/* Trade Outcome */}
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">
                      Trade Outcome
                    </label>
                    <select
                      className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 bg-white outline-none focus:border-stone-400 transition-colors cursor-pointer"
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

                  {/* PnL */}
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">
                      P&L ($)
                    </label>
                    <input
                      type="number"
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
            <section className="bg-white rounded-lg shadow-sm mt-8 border border-stone-200">
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
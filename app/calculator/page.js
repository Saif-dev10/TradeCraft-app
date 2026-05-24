"use client";

import { useState } from "react";
import { RiMenuLine, RiCalculatorLine, RiPercentLine, RiMoneyDollarCircleLine, RiArrowUpDownLine, RiInformationLine } from "react-icons/ri";
import { Sidebar } from "@/components/Sidebar";

export default function CalculatorPage() {
  const todayStr = new Date().toISOString().split("T")[0];
  const [activeTab, setActiveTab] = useState("position");
  const [menuOpen, setMenuOpen] = useState(false);

  // --- Position Calculator ---
  const [accountSize, setAccountSize] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(1);
  const [entryPrice, setEntryPrice] = useState(150);
  const [stopLoss, setStopLoss] = useState(148.5);

  // --- Risk/Reward Calculator ---
  const [rrEntry, setRrEntry] = useState(100);
  const [rrStop, setRrStop] = useState(95);
  const [rrTarget, setRrTarget] = useState(115);

  // --- Pip Calculator ---
  const [pipPair, setPipPair] = useState("EUR/USD");
  const [pipLotSize, setPipLotSize] = useState(1.0);
  const [pipPips, setPipPips] = useState(50);

  // --- Compound Calculator ---
  const [initialCapital, setInitialCapital] = useState(10000);
  const [monthlyReturn, setMonthlyReturn] = useState(5);
  const [months, setMonths] = useState(12);

  // Calculated values
  const riskAmount = (accountSize * riskPercent / 100).toFixed(2);
  const priceRisk = Math.abs(entryPrice - stopLoss).toFixed(2);
  const positionSize = priceRisk !== "0.00" ? (parseFloat(riskAmount) / parseFloat(priceRisk)).toFixed(0) : "0";

  const rrRisk = Math.abs(rrEntry - rrStop).toFixed(2);
  const rrReward = Math.abs(rrTarget - rrEntry).toFixed(2);
  const rrRatio = parseFloat(rrRisk) !== 0 ? (parseFloat(rrReward) / parseFloat(rrRisk)).toFixed(2) : "0";

  const pipValue = (pipLotSize * 10).toFixed(2);
  const pipProfit = (pipPips * parseFloat(pipValue)).toFixed(2);

  const compoundResult = (initialCapital * Math.pow(1 + monthlyReturn / 100, months)).toFixed(2);
  const totalProfit = (parseFloat(compoundResult) - initialCapital).toFixed(2);

  const tabs = [
    { id: "position", label: "Position Size", icon: RiCalculatorLine },
    { id: "riskreward", label: "Risk / Reward", icon: RiPercentLine },
    { id: "pip", label: "Pip Value", icon: RiArrowUpDownLine },
    { id: "compound", label: "Compound", icon: RiMoneyDollarCircleLine },
  ];

  const accountPresets = [5000, 10000, 25000, 50000, 100000];
  const riskPresets = [0.5, 1, 2, 3];
  const lotPresets = [0.01, 0.1, 0.5, 1.0, 2.0];
  const returnPresets = [3, 5, 10, 15];
  const monthPresets = [6, 12, 24, 36];

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Mobile Sidebar Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-60 bg-white shadow-xl transform transition-transform duration-300 md:hidden ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold text-stone-800 pt-4">TradeCraft</h1>
        </div>
      </div>

      <Sidebar />
      
      <div className="md:ml-60">
        {/* Top Bar */}
        <header className="bg-white border-b border-stone-200 h-16 flex items-center gap-2 sm:gap-4 px-3 sm:px-6 shadow-sm sticky top-0 z-30">
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors shrink-0"
          >
            <RiMenuLine className="text-2xl text-stone-800" />
          </button>

          <div className="flex items-center gap-2">
            <RiCalculatorLine className="text-xl text-stone-600" />
            <h2 className="text-lg font-semibold text-stone-800 hidden sm:block">Trading Calculator</h2>
          </div>

          <div className="flex-1 min-w-0" />

          <button className="bg-stone-800 hover:bg-stone-700 active:opacity-75 py-1.5 sm:py-2 px-2 sm:px-4 rounded-md text-white text-xs sm:text-sm font-medium cursor-pointer transition-colors shrink-0">
            Filters
          </button>

          <button className="bg-stone-800 hover:bg-stone-700 active:opacity-75 py-1.5 sm:py-2 px-2 sm:px-4 rounded-md text-white text-xs sm:text-sm font-medium cursor-pointer transition-colors shrink-0 hidden sm:block">
            Account (1)
          </button>

          <div className="border border-stone-300 rounded-md py-1.5 sm:py-2 px-2 sm:px-4 bg-white flex items-center shrink-0">
            <span className="text-xs sm:text-sm text-stone-600 font-medium">
              {todayStr}
            </span>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-2">Trading Calculator</h1>
            <p className="text-stone-500 text-sm sm:text-base">Quick calculations with presets — tap, don&apos;t type.</p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-1.5 mb-6 overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-stone-800 text-white shadow-md"
                        : "text-stone-600 hover:bg-stone-100 hover:text-stone-800"
                    }`}
                  >
                    <Icon className="text-lg" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* POSITION SIZE CALCULATOR */}
          {activeTab === "position" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Inputs */}
              <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center">
                    <RiCalculatorLine className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-800">Position Size</h3>
                    <p className="text-xs text-stone-500">Tap presets or use sliders</p>
                  </div>
                </div>

                {/* Account Size - Preset Chips */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">Account Size</label>
                  <div className="flex flex-wrap gap-2">
                    {accountPresets.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setAccountSize(amount)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                          accountSize === amount
                            ? "bg-stone-800 text-white shadow-md"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        ${amount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Risk % - Preset Chips */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">Risk Per Trade</label>
                  <div className="flex flex-wrap gap-2">
                    {riskPresets.map((pct) => (
                      <button
                        key={pct}
                        onClick={() => setRiskPercent(pct)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                          riskPercent === pct
                            ? "bg-stone-800 text-white shadow-md"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-stone-400 mt-2">Risk amount: <span className="font-semibold text-stone-600">${riskAmount}</span></p>
                </div>

                {/* Entry & Stop - Compact Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Entry</label>
                    <input
                      type="number"
                      value={entryPrice}
                      onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none text-stone-800 font-bold text-center text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Stop Loss</label>
                    <input
                      type="number"
                      value={stopLoss}
                      onChange={(e) => setStopLoss(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none text-stone-800 font-bold text-center text-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                <div className="bg-stone-800 rounded-xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-stone-300 text-sm font-medium">Position Size</span>
                    <RiCalculatorLine className="text-stone-400 text-lg" />
                  </div>
                  <div className="text-5xl font-bold mb-2">
                    {positionSize} <span className="text-lg text-stone-400 font-normal">shares</span>
                  </div>
                  <div className="text-stone-400 text-sm">
                    ${riskAmount} risk at {riskPercent}%
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-xs font-medium text-stone-500 uppercase">Price Risk</span>
                    </div>
                    <div className="text-2xl font-bold text-stone-800">${priceRisk}</div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-xs font-medium text-stone-500 uppercase">Risk $</span>
                    </div>
                    <div className="text-2xl font-bold text-stone-800">${riskAmount}</div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <RiInformationLine className="text-amber-600 text-xl shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-amber-800 mb-1">Pro Tip</h4>
                      <p className="text-xs text-amber-700">Most traders use 1-2% risk per trade. Never risk more than you can afford to lose.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RISK / REWARD CALCULATOR */}
          {activeTab === "riskreward" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center">
                    <RiPercentLine className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-800">Risk / Reward</h3>
                    <p className="text-xs text-stone-500">3 quick inputs, instant ratio</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Entry Price", value: rrEntry, setter: setRrEntry, color: "border-stone-300" },
                    { label: "Stop Loss", value: rrStop, setter: setRrStop, color: "border-red-300" },
                    { label: "Take Profit", value: rrTarget, setter: setRrTarget, color: "border-green-300" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-sm font-medium text-stone-700 mb-2">{field.label}</label>
                      <input
                        type="number"
                        value={field.value}
                        onChange={(e) => field.setter(parseFloat(e.target.value) || 0)}
                        className={`w-full px-4 py-3 border-2 ${field.color} rounded-lg focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none text-stone-800 font-bold text-center text-lg`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-stone-800 rounded-xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-stone-300 text-sm font-medium">R:R Ratio</span>
                    <RiPercentLine className="text-stone-400 text-lg" />
                  </div>
                  <div className="text-5xl font-bold mb-2">1:{rrRatio}</div>
                  <div className={`text-sm font-medium ${parseFloat(rrRatio) >= 2 ? 'text-green-400' : parseFloat(rrRatio) >= 1.5 ? 'text-amber-400' : 'text-red-400'}`}>
                    {parseFloat(rrRatio) >= 2 ? "Excellent Setup" : parseFloat(rrRatio) >= 1.5 ? "Good Setup" : "Poor Setup — Avoid"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-xs font-medium text-stone-500 uppercase">Risk</span>
                    </div>
                    <div className="text-2xl font-bold text-red-600">${rrRisk}</div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs font-medium text-stone-500 uppercase">Reward</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">${rrReward}</div>
                  </div>
                </div>

                {/* Visual Bar */}
                <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
                  <h4 className="text-sm font-semibold text-stone-700 mb-4">Visual</h4>
                  <div className="relative h-14 bg-stone-100 rounded-xl overflow-hidden flex">
                    <div 
                      className="bg-red-500 h-full flex items-center justify-center text-white text-sm font-bold transition-all duration-500"
                      style={{ width: `${100 / (parseFloat(rrRatio) + 1)}%` }}
                    >
                      Risk
                    </div>
                    <div 
                      className="bg-green-500 h-full flex items-center justify-center text-white text-sm font-bold transition-all duration-500"
                      style={{ width: `${(parseFloat(rrRatio) / (parseFloat(rrRatio) + 1)) * 100}%` }}
                    >
                      Reward
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PIP VALUE CALCULATOR */}
          {activeTab === "pip" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center">
                    <RiArrowUpDownLine className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-800">Pip Value</h3>
                    <p className="text-xs text-stone-500">Forex pip calculations</p>
                  </div>
                </div>

                {/* Pair Selector */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">Currency Pair</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF", "AUD/USD", "USD/CAD"].map((pair) => (
                      <button
                        key={pair}
                        onClick={() => setPipPair(pair)}
                        className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                          pipPair === pair
                            ? "bg-stone-800 text-white shadow-md"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        {pair}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lot Size Presets */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">Lot Size</label>
                  <div className="flex flex-wrap gap-2">
                    {lotPresets.map((size) => (
                      <button
                        key={size}
                        onClick={() => setPipLotSize(size)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                          pipLotSize === size
                            ? "bg-stone-800 text-white shadow-md"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pips Slider */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium text-stone-700">Pips Gained</label>
                    <span className="text-lg font-bold text-stone-800">{pipPips} pips</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="500"
                    value={pipPips}
                    onChange={(e) => setPipPips(parseInt(e.target.value))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-800"
                  />
                  <div className="flex justify-between text-xs text-stone-400 mt-1">
                    <span>1 pip</span>
                    <span>500 pips</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-stone-800 rounded-xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-stone-300 text-sm font-medium">Profit / Loss</span>
                    <RiArrowUpDownLine className="text-stone-400 text-lg" />
                  </div>
                  <div className={`text-5xl font-bold mb-2 ${parseFloat(pipProfit) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ${pipProfit}
                  </div>
                  <div className="text-stone-400 text-sm">
                    {pipPair} @ {pipLotSize} lots
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-xs font-medium text-stone-500 uppercase">Pip Value</span>
                    </div>
                    <div className="text-2xl font-bold text-stone-800">${pipValue}</div>
                    <div className="text-xs text-stone-400 mt-1">per pip</div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span className="text-xs font-medium text-stone-500 uppercase">Pips</span>
                    </div>
                    <div className="text-2xl font-bold text-stone-800">{pipPips}</div>
                    <div className="text-xs text-stone-400 mt-1">movement</div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
                  <h4 className="text-sm font-semibold text-stone-700 mb-4">Quick Reference</h4>
                  <div className="space-y-2">
                    {[
                      { pair: "EUR/USD", value: "$10.00" },
                      { pair: "GBP/USD", value: "$10.00" },
                      { pair: "USD/JPY", value: "$6.67" },
                      { pair: "USD/CHF", value: "$11.24" },
                    ].map((item) => (
                      <div key={item.pair} className="flex justify-between items-center py-2 border-b border-stone-100 last:border-0">
                        <span className="text-sm text-stone-600 font-medium">{item.pair}</span>
                        <span className="text-sm text-stone-800 font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-stone-400 mt-3">* Standard lot (100k units)</p>
                </div>
              </div>
            </div>
          )}

          {/* COMPOUND CALCULATOR */}
          {activeTab === "compound" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center">
                    <RiMoneyDollarCircleLine className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-800">Compound Growth</h3>
                    <p className="text-xs text-stone-500">Project your account over time</p>
                  </div>
                </div>

                {/* Capital Presets */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">Starting Capital</label>
                  <div className="flex flex-wrap gap-2">
                    {[5000, 10000, 25000, 50000].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setInitialCapital(amount)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                          initialCapital === amount
                            ? "bg-stone-800 text-white shadow-md"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        ${amount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Monthly Return Presets */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">Monthly Return</label>
                  <div className="flex flex-wrap gap-2">
                    {returnPresets.map((pct) => (
                      <button
                        key={pct}
                        onClick={() => setMonthlyReturn(pct)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                          monthlyReturn === pct
                            ? "bg-stone-800 text-white shadow-md"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Months Presets */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">Time Period</label>
                  <div className="flex flex-wrap gap-2">
                    {monthPresets.map((m) => (
                      <button
                        key={m}
                        onClick={() => setMonths(m)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                          months === m
                            ? "bg-stone-800 text-white shadow-md"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        {m} months
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-stone-800 rounded-xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-stone-300 text-sm font-medium">Final Balance</span>
                    <RiMoneyDollarCircleLine className="text-stone-400 text-lg" />
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold mb-2">
                    ${parseFloat(compoundResult).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-stone-400 text-sm">
                    After {months} months @ {monthlyReturn}%/mo
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs font-medium text-stone-500 uppercase">Total Profit</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      +${parseFloat(totalProfit).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-xs font-medium text-stone-500 uppercase">Total Return</span>
                    </div>
                    <div className="text-2xl font-bold text-stone-800">
                      {initialCapital ? ((parseFloat(compoundResult) - initialCapital) / initialCapital * 100).toFixed(1) : "0"}%
                    </div>
                  </div>
                </div>

                {/* Mini Growth Table */}
                <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-stone-100">
                    <h4 className="text-sm font-semibold text-stone-700">Growth Snapshot</h4>
                  </div>
                  <div className="max-h-56 overflow-y-auto">
                    <table className="w-full">
                      <thead className="bg-stone-50 sticky top-0">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Month</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-stone-500 uppercase">Balance</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-stone-500 uppercase">Profit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {Array.from({ length: Math.min(months, 12) }, (_, i) => {
                          const month = i + 1;
                          const balance = initialCapital * Math.pow(1 + monthlyReturn / 100, month);
                          const profit = balance - initialCapital * Math.pow(1 + monthlyReturn / 100, month - 1);
                          return (
                            <tr key={month} className="hover:bg-stone-50">
                              <td className="px-4 py-2.5 text-sm text-stone-600 font-medium">{month}</td>
                              <td className="px-4 py-2.5 text-sm text-stone-800 font-semibold text-right">
                                ${balance.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                              </td>
                              <td className="px-4 py-2.5 text-sm text-green-600 font-medium text-right">
                                +${profit.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {months > 12 && (
                    <div className="px-4 py-2 bg-stone-50 text-xs text-stone-500 text-center border-t border-stone-100">
                      Showing first 12 months
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
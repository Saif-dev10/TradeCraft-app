"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "../../components/Sidebar";
import { RiMenuLine } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { FiEdit3 } from "react-icons/fi";

const initialTrades = [
  {
    id: 1,
    symbol: "EUR/USD",
    openTimestamp: "2026-05-20 08:30:00",
    closeTimestamp: "2026-05-20 14:15:00",
    strategy: "Supply & Demand",
    timeframe: "1 Hour",
    entry: 1.0856,
    stopLoss: 1.082,
    takeProfit: 1.092,
    position: 0.5,
    riskReward: "1:2.5",
    session: "London",
    outcome: "win",
    pnl: 320.0,
  },
  {
    id: 2,
    symbol: "GBP/USD",
    openTimestamp: "2026-05-19 09:45:00",
    closeTimestamp: "2026-05-19 11:20:00",
    strategy: "Breakout",
    timeframe: "15 Minutes",
    entry: 1.2745,
    stopLoss: 1.276,
    takeProfit: 1.27,
    position: 0.25,
    riskReward: "1:3",
    session: "London/NY Overlap",
    outcome: "loss",
    pnl: -75.0,
  },
  {
    id: 3,
    symbol: "XAU/USD",
    openTimestamp: "2026-05-18 13:00:00",
    closeTimestamp: "2026-05-18 16:30:00",
    strategy: "Trend Following",
    timeframe: "4 Hours",
    entry: 2345.8,
    stopLoss: 2330.0,
    takeProfit: 2380.0,
    position: 0.1,
    riskReward: "1:2.3",
    session: "New York",
    outcome: "win",
    pnl: 342.0,
  },
  {
    id: 4,
    symbol: "USD/JPY",
    openTimestamp: "2026-05-17 02:30:00",
    closeTimestamp: "2026-05-17 06:45:00",
    strategy: "Support & Resistance",
    timeframe: "1 Hour",
    entry: 156.42,
    stopLoss: 156.85,
    takeProfit: 155.5,
    position: 0.3,
    riskReward: "1:2.1",
    session: "Tokyo",
    outcome: "win",
    pnl: 276.0,
  },
  {
    id: 5,
    symbol: "BTC/USD",
    openTimestamp: "2026-05-16 15:20:00",
    closeTimestamp: "2026-05-16 18:00:00",
    strategy: "Reversal",
    timeframe: "30 Minutes",
    entry: 67250.0,
    stopLoss: 67800.0,
    takeProfit: 66000.0,
    position: 0.05,
    riskReward: "1:2",
    session: "New York",
    outcome: "loss",
    pnl: -275.0,
  },
  {
    id: 6,
    symbol: "US30",
    openTimestamp: "2026-05-15 10:00:00",
    closeTimestamp: "2026-05-15 10:45:00",
    strategy: "Scalping",
    timeframe: "5 Minutes",
    entry: 39520.0,
    stopLoss: 39480.0,
    takeProfit: 39600.0,
    position: 1.0,
    riskReward: "1:2",
    session: "London/NY Overlap",
    outcome: "breakeven",
    pnl: 0.0,
  },
  {
    id: 7,
    symbol: "EUR/USD",
    openTimestamp: "2026-05-14 07:15:00",
    closeTimestamp: "2026-05-14 12:30:00",
    strategy: "Supply & Demand",
    timeframe: "1 Hour",
    entry: 1.0789,
    stopLoss: 1.077,
    takeProfit: 1.083,
    position: 0.4,
    riskReward: "1:2.8",
    session: "London",
    outcome: "win",
    pnl: 164.0,
  },
  {
    id: 8,
    symbol: "GBP/JPY",
    openTimestamp: "2026-05-13 03:00:00",
    closeTimestamp: "2026-05-13 08:20:00",
    strategy: "Trend Following",
    timeframe: "4 Hours",
    entry: 199.35,
    stopLoss: 199.8,
    takeProfit: 198.2,
    position: 0.2,
    riskReward: "1:2.6",
    session: "Tokyo",
    outcome: "win",
    pnl: 230.0,
  },
];

function formatTimestamp(isoString) {
  if (!isoString) return "-";
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return isoString;

  const pad = (n) => String(n).padStart(2, "0");
  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

export default function Trades() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [editingTrade, setEditingTrade] = useState(null);
  const [trades, setTrades] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const navItems = [
    { label: "Journal", path: "/journal" },
    { label: "Calendar", path: "/calendar" },
    { label: "Trades", path: "/trades" },
    { label: "Calculator", path: "/calculator" },
  ];

  function goTo(path) {
    router.push(path);
    setMenuOpen(false);
  }

  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("trades") || "[]");
    if (stored.length > 0) {
      setTrades(stored);
    } else {
      setTrades(initialTrades);
    }
    setIsLoaded(true);
  }, []);

  function handleRowClick(trade) {
    setSelectedTrade(trade);
  }

  function closeModal() {
    setSelectedTrade(null);
  }

  function handleEdit(trade) {
    setEditingTrade({ ...trade });
  }

  function closeEditModal() {
    setEditingTrade(null);
  }

  function handleEditChange(field, value) {
    setEditingTrade((prev) => ({ ...prev, [field]: value }));
  }

  function handleEditNumber(field, value) {
    setEditingTrade((prev) => ({
      ...prev,
      [field]: value === "" ? "" : parseFloat(value),
    }));
  }

  function saveEdit(e) {
    e.preventDefault();
    if (!editingTrade) return;

    const updatedTrades = trades.map((t) =>
      t.id === editingTrade.id ? editingTrade : t
    );

    setTrades(updatedTrades);
    localStorage.setItem("trades", JSON.stringify(updatedTrades));

    if (selectedTrade?.id === editingTrade.id) {
      setSelectedTrade(editingTrade);
    }

    setEditingTrade(null);
  }

  function safeNum(val) {
    const n = Number(val);
    return isNaN(n) ? 0 : n;
  }

  function safeFixed(val, digits = 2) {
    return safeNum(val).toFixed(digits);
  }

  function safeFixed5(val) {
    return safeNum(val).toFixed(5);
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen bg-stone-100 items-center justify-center">
        <div className="text-stone-500 text-sm">Loading trades...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-stone-100">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      <>
        {menuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/30 z-40"
            onClick={() => setMenuOpen(false)}
          />
        )}

        <aside
          className={`
          md:hidden fixed top-0 left-0 h-screen w-60 bg-white shadow-xl z-50 flex flex-col p-4
          transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <h1
            className="text-2xl font-bold pt-4 cursor-pointer hover:text-stone-600 active:opacity-75 transition-colors text-stone-800"
            onClick={() => goTo("/journal")}
          >
            TradeCraft
          </h1>

          <button
            onClick={() => setMenuOpen(false)}
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
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-stone-200 h-16 flex items-center gap-2 sm:gap-4 px-3 sm:px-6 shadow-sm sticky top-0 z-30">
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors shrink-0 cursor-pointer"
          >
            <RiMenuLine className="text-2xl text-stone-800" />
          </button>

          <div className="flex-1 min-w-0" />

          <button className="bg-stone-800 hover:bg-stone-700 active:opacity-75 py-1.5 sm:py-2 px-2 sm:px-4 rounded-md text-white text-xs sm:text-sm font-medium cursor-pointer transition-colors shrink-0">
            Filters
          </button>

          <button className="bg-stone-800 hover:bg-stone-700 active:opacity-75 py-1.5 sm:py-2 px-2 sm:px-4 rounded-md text-white text-xs sm:text-sm font-medium cursor-pointer transition-colors shrink-0 sm:block">
            Account (1)
          </button>

          <div className="border border-stone-300 rounded-md py-1.5 sm:py-2 px-2 sm:px-4 bg-white flex items-center shrink-0">
            <span className="text-xs sm:text-sm text-stone-600 font-medium">
              {todayStr}
            </span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-stone-800">
                Trades
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                View and manage your trade history
              </p>
            </div>

            {/* Trades Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200">
                      <th className="text-left text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide py-3 px-2 sm:px-4 w-10">
                        Edit
                      </th>
                      <th className="text-left text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide py-3 px-2 sm:px-4">
                        Symbol
                      </th>
                      <th className="text-left text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide py-3 px-2 sm:px-4">
                        Open Time
                      </th>
                      <th className="text-left text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide py-3 px-2 sm:px-4">
                        Close Time
                      </th>
                      <th className="text-left text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide py-3 px-2 sm:px-4">
                        Strategy
                      </th>
                      <th className="text-right text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide py-3 px-2 sm:px-4">
                        P&L
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {trades.map((trade) => {
                      const pnlVal = safeNum(trade.pnl);

                      return (
                        <tr
                          key={trade.id}
                          onClick={() => handleRowClick(trade)}
                          className="border-b border-stone-100 last:border-0 hover:bg-stone-50 cursor-pointer transition-colors"
                        >
                          <td className="py-3 px-2 sm:px-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(trade);
                              }}
                              className="p-1.5 rounded-md hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors"
                            >
                              <FiEdit3 className="text-sm" />
                            </button>
                          </td>

                          <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-stone-800">
                            {trade.symbol || "-"}
                          </td>

                          <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm text-stone-600 whitespace-nowrap">
                            {formatTimestamp(trade.openTimestamp)}
                          </td>

                          <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm text-stone-600 whitespace-nowrap">
                            {formatTimestamp(trade.closeTimestamp)}
                          </td>

                          <td className="py-3 px-2 sm:px-4 text-xs sm:text-sm text-stone-600">
                            {trade.strategy || "-"}
                          </td>

                          <td
                            className={`py-3 px-2 sm:px-4 text-xs sm:text-sm font-bold text-right whitespace-nowrap ${
                              pnlVal > 0
                                ? "text-emerald-700"
                                : pnlVal < 0
                                  ? "text-red-700"
                                  : "text-stone-500"
                            }`}
                          >
                            {pnlVal > 0 ? "+" : ""}${safeFixed(trade.pnl, 2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Detail Modal */}
      {selectedTrade && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-black/50" />

          <div
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-stone-200 sticky top-0 bg-white rounded-t-xl">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-stone-800">
                  {selectedTrade.symbol || "-"}
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Trade #{selectedTrade.id}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-stone-100 text-stone-600 transition-colors"
              >
                <IoCloseSharp className="text-xl" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex justify-center mb-2">
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                    safeNum(selectedTrade.pnl) > 0
                      ? "bg-emerald-100 text-emerald-800"
                      : safeNum(selectedTrade.pnl) < 0
                        ? "bg-red-100 text-red-800"
                        : "bg-stone-100 text-stone-600"
                  }`}
                >
                  {safeNum(selectedTrade.pnl) > 0
                    ? "PROFIT"
                    : safeNum(selectedTrade.pnl) < 0
                      ? "LOSS"
                      : "BREAKEVEN"}
                </span>
              </div>

              <div className="text-center py-2">
                <p
                  className={`text-3xl sm:text-4xl font-bold ${
                    safeNum(selectedTrade.pnl) > 0
                      ? "text-emerald-700"
                      : safeNum(selectedTrade.pnl) < 0
                        ? "text-red-700"
                        : "text-stone-500"
                  }`}
                >
                  {safeNum(selectedTrade.pnl) > 0 ? "+" : ""}$
                  {safeFixed(selectedTrade.pnl, 2)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-stone-50 rounded-lg p-3">
                  <p className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">
                    Symbol
                  </p>
                  <p className="text-sm sm:text-base font-medium text-stone-800">
                    {selectedTrade.symbol || "-"}
                  </p>
                </div>
                <div className="bg-stone-50 rounded-lg p-3">
                  <p className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">
                    Strategy
                  </p>
                  <p className="text-sm sm:text-base font-medium text-stone-800">
                    {selectedTrade.strategy || "-"}
                  </p>
                </div>
                <div className="bg-stone-50 rounded-lg p-3">
                  <p className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">
                    Timeframe
                  </p>
                  <p className="text-sm sm:text-base font-medium text-stone-800">
                    {selectedTrade.timeframe || "-"}
                  </p>
                </div>
                <div className="bg-stone-50 rounded-lg p-3">
                  <p className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">
                    Trading Session
                  </p>
                  <p className="text-sm sm:text-base font-medium text-stone-800">
                    {selectedTrade.session || "-"}
                  </p>
                </div>
              </div>

              <div className="bg-stone-50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide">
                    Open Time
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-stone-800">
                    {formatTimestamp(selectedTrade.openTimestamp)}
                  </p>
                </div>
                <div className="border-t border-stone-200" />
                <div className="flex justify-between items-center">
                  <p className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide">
                    Close Time
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-stone-800">
                    {formatTimestamp(selectedTrade.closeTimestamp)}
                  </p>
                </div>
              </div>

              <div className="bg-stone-50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide">
                    Entry
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-stone-800">
                    {safeFixed5(selectedTrade.entry)}
                  </p>
                </div>
                <div className="border-t border-stone-200" />
                <div className="flex justify-between items-center">
                  <p className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide">
                    Stop Loss
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-red-700">
                    {safeFixed5(selectedTrade.stopLoss)}
                  </p>
                </div>
                <div className="border-t border-stone-200" />
                <div className="flex justify-between items-center">
                  <p className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide">
                    Take Profit
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-emerald-700">
                    {safeFixed5(selectedTrade.takeProfit)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-stone-50 rounded-lg p-3 text-center">
                  <p className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">
                    Position
                  </p>
                  <p className="text-sm sm:text-base font-bold text-stone-800">
                    {safeFixed(selectedTrade.position, 2)}
                  </p>
                  <p className="text-[10px] text-stone-400">Lots</p>
                </div>
                <div className="bg-stone-50 rounded-lg p-3 text-center">
                  <p className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">
                    R/R
                  </p>
                  <p className="text-sm sm:text-base font-bold text-stone-800">
                    {selectedTrade.riskReward || "-"}
                  </p>
                </div>
                <div className="bg-stone-50 rounded-lg p-3 text-center">
                  <p className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">
                    Outcome
                  </p>
                  <p className="text-sm sm:text-base font-bold text-stone-800 capitalize">
                    {selectedTrade.outcome || "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-stone-200 flex gap-3">
              <button
                onClick={() => handleEdit(selectedTrade)}
                className="flex-1 bg-stone-800 hover:bg-stone-700 active:opacity-75 py-2.5 rounded-md text-white text-sm font-medium cursor-pointer transition-colors flex items-center justify-center gap-2"
              >
                <FiEdit3 className="text-sm" />
                Edit Trade
              </button>
              <button
                onClick={closeModal}
                className="flex-1 bg-stone-100 hover:bg-stone-200 active:opacity-75 py-2.5 rounded-md text-stone-700 text-sm font-medium cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingTrade && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 md:p-6"
          onClick={closeEditModal}
        >
          <div className="absolute inset-0 bg-black/60" />

          <div
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-stone-200 sticky top-0 bg-white rounded-t-xl">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-stone-800">
                  Edit Trade
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Trade #{editingTrade.id}
                </p>
              </div>
              <button
                onClick={closeEditModal}
                className="p-2 rounded-lg hover:bg-stone-100 text-stone-600 transition-colors"
              >
                <IoCloseSharp className="text-xl" />
              </button>
            </div>

            <form onSubmit={saveEdit} className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Symbol
                  </label>
                  <select
                    className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 bg-white outline-none focus:border-stone-400 transition-colors cursor-pointer"
                    value={editingTrade.symbol}
                    onChange={(e) => handleEditChange("symbol", e.target.value)}
                    required
                  >
                    <option value="EUR/USD">EUR/USD</option>
                    <option value="GBP/USD">GBP/USD</option>
                    <option value="USD/JPY">USD/JPY</option>
                    <option value="XAU/USD">XAU/USD</option>
                    <option value="US30">US30</option>
                    <option value="BTC/USD">BTC/USD</option>
                    <option value="GBP/JPY">GBP/JPY</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Strategy
                  </label>
                  <select
                    className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 bg-white outline-none focus:border-stone-400 transition-colors cursor-pointer"
                    value={editingTrade.strategy}
                    onChange={(e) =>
                      handleEditChange("strategy", e.target.value)
                    }
                    required
                  >
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

                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Timeframe
                  </label>
                  <select
                    className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 bg-white outline-none focus:border-stone-400 transition-colors cursor-pointer"
                    value={editingTrade.timeframe}
                    onChange={(e) =>
                      handleEditChange("timeframe", e.target.value)
                    }
                    required
                  >
                    <option value="1 Minute">1 Minute</option>
                    <option value="5 Minutes">5 Minutes</option>
                    <option value="15 Minutes">15 Minutes</option>
                    <option value="30 Minutes">30 Minutes</option>
                    <option value="1 Hour">1 Hour</option>
                    <option value="4 Hours">4 Hours</option>
                    <option value="Daily">Daily</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Trading Session
                  </label>
                  <select
                    className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 bg-white outline-none focus:border-stone-400 transition-colors cursor-pointer"
                    value={editingTrade.session}
                    onChange={(e) =>
                      handleEditChange("session", e.target.value)
                    }
                    required
                  >
                    <option value="London">London</option>
                    <option value="New York">New York</option>
                    <option value="Tokyo">Tokyo</option>
                    <option value="Sydney">Sydney</option>
                    <option value="London/NY Overlap">
                      London/NY Overlap
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Outcome
                  </label>
                  <select
                    className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 bg-white outline-none focus:border-stone-400 transition-colors cursor-pointer"
                    value={editingTrade.outcome}
                    onChange={(e) =>
                      handleEditChange("outcome", e.target.value)
                    }
                    required
                  >
                    <option value="win">Win</option>
                    <option value="loss">Loss</option>
                    <option value="breakeven">Breakeven</option>
                    <option value="manual_close">Manual Close</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Risk/Reward
                  </label>
                  <input
                    type="text"
                    className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 outline-none focus:border-stone-400 transition-colors"
                    value={editingTrade.riskReward}
                    onChange={(e) =>
                      handleEditChange("riskReward", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Entry Price
                  </label>
                  <input
                    type="number"
                    step="0.00001"
                    className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 outline-none focus:border-stone-400 transition-colors"
                    value={editingTrade.entry}
                    onChange={(e) => handleEditNumber("entry", e.target.value)}
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
                    className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 outline-none focus:border-stone-400 transition-colors"
                    value={editingTrade.stopLoss}
                    onChange={(e) =>
                      handleEditNumber("stopLoss", e.target.value)
                    }
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
                    className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 outline-none focus:border-stone-400 transition-colors"
                    value={editingTrade.takeProfit}
                    onChange={(e) =>
                      handleEditNumber("takeProfit", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Position Size (Lots)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 outline-none focus:border-stone-400 transition-colors"
                    value={editingTrade.position}
                    onChange={(e) =>
                      handleEditNumber("position", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    P&L ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 outline-none focus:border-stone-400 transition-colors"
                    value={editingTrade.pnl}
                    onChange={(e) => handleEditNumber("pnl", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Open Time
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 outline-none focus:border-stone-400 transition-colors"
                    value={editingTrade.openTimestamp?.slice(0, 16) || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleEditChange(
                        "openTimestamp",
                        val ? val.replace("T", " ") + ":00" : ""
                      );
                    }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Close Time
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full border border-stone-200 rounded-md py-2.5 px-3 text-sm text-stone-700 outline-none focus:border-stone-400 transition-colors"
                    value={editingTrade.closeTimestamp?.slice(0, 16) || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleEditChange(
                        "closeTimestamp",
                        val ? val.replace("T", " ") + ":00" : ""
                      );
                    }}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-stone-200">
                <button
                  type="submit"
                  className="flex-1 bg-stone-800 hover:bg-stone-700 active:opacity-75 py-2.5 rounded-md text-white text-sm font-medium cursor-pointer transition-colors"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="flex-1 bg-stone-100 hover:bg-stone-200 active:opacity-75 py-2.5 rounded-md text-stone-700 text-sm font-medium cursor-pointer transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "../../components/Sidebar";
import { RiMenuLine } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";

// ─── useLocalStorage hook (SSR-safe for Next.js) ───
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [firstLoadDone, setFirstLoadDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error("Error reading localStorage:", error);
    }
    setFirstLoadDone(true);
  }, [key]);

  useEffect(() => {
    if (!firstLoadDone || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [key, storedValue, firstLoadDone]);

  return [storedValue, setStoredValue];
}

// ─── Demo Data (shown until user has enough real data) ───
const DEMO_WEEKLY_DATA = [
  { week: "Week 1", pnl: 320.50, trades: 6, winRate: "66.7%" },
  { week: "Week 2", pnl: -120.00, trades: 4, winRate: "25.0%" },
  { week: "Week 3", pnl: 450.75, trades: 8, winRate: "75.0%" },
  { week: "Week 4", pnl: 180.25, trades: 5, winRate: "60.0%" },
];

const DEMO_MONTHLY_DATA = [
  { month: "January", pnl: 890.00, trades: 22, winRate: "63.6%" },
  { month: "February", pnl: -210.50, trades: 18, winRate: "44.4%" },
  { month: "March", pnl: 560.25, trades: 20, winRate: "60.0%" },
  { month: "April", pnl: 340.75, trades: 16, winRate: "56.3%" },
  { month: "May", pnl: 831.50, trades: 23, winRate: "65.2%" },
];

// ─── Demo Calendar Day Outcomes (for calendar coloring) ───
const DEMO_CALENDAR_OUTCOMES = {
  "2026-06-01": "profit",
  "2026-06-02": "loss",
  "2026-06-03": "profit",
  "2026-06-04": "profit",
  "2026-06-05": "loss",
  "2026-06-06": "profit",
  "2026-06-09": "loss",
  "2026-06-10": "profit",
  "2026-06-12": "profit",
  "2026-06-15": "loss",
  "2026-06-16": "profit",
  "2026-06-18": "profit",
  "2026-06-20": "loss",
  "2026-06-22": "profit",
  "2026-06-25": "profit",
  "2026-06-28": "loss",
};

export default function Calendar() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);

  // ─── Real Data from localStorage ───
  const [journalEntries, setJournalEntries] = useLocalStorage("tradecraft_journal_entries", []);
  const [weeklyStats, setWeeklyStats] = useLocalStorage("tradecraft_weekly_stats", []);
  const [monthlyStats, setMonthlyStats] = useLocalStorage("tradecraft_monthly_stats", []);
  const [calendarOutcomes, setCalendarOutcomes] = useLocalStorage("tradecraft_calendar_outcomes", {});

  const [hasEnoughData, setHasEnoughData] = useState(false);

  // ─── Check if user has enough real data ───
  useEffect(() => {
    const enoughWeekly = weeklyStats.length >= 2;
    const enoughMonthly = monthlyStats.length >= 2;
    const enoughJournal = journalEntries.length >= 5;
    setHasEnoughData(enoughWeekly || enoughMonthly || enoughJournal);
  }, [weeklyStats, monthlyStats, journalEntries]);

  // ─── Auto-calculate weekly/monthly stats from journal entries ───
  useEffect(() => {
    if (journalEntries.length === 0) return;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    // Build calendar outcomes map
    const newOutcomes = { ...calendarOutcomes };
    const monthTrades = [];
    const monthPnls = [];

    journalEntries.forEach((entry) => {
      if (!entry.date || !entry.pnl) return;
      const entryDate = new Date(entry.date);
      const dateKey = entry.date.split("T")[0];

      // Calendar coloring
      if (entry.pnl > 0) newOutcomes[dateKey] = "profit";
      else if (entry.pnl < 0) newOutcomes[dateKey] = "loss";
      else newOutcomes[dateKey] = "neutral";

      // Current month aggregation for weekly stats
      if (
        entryDate.getFullYear() === currentYear &&
        entryDate.getMonth() === currentMonth
      ) {
        const weekNum = Math.ceil(entryDate.getDate() / 7);
        if (!monthTrades[weekNum]) monthTrades[weekNum] = { trades: 0, pnl: 0, wins: 0 };
        monthTrades[weekNum].trades += 1;
        monthTrades[weekNum].pnl += parseFloat(entry.pnl);
        if (parseFloat(entry.pnl) > 0) monthTrades[weekNum].wins += 1;
      }

      // Yearly aggregation for monthly stats
      if (entryDate.getFullYear() === currentYear) {
        const m = entryDate.getMonth();
        if (!monthPnls[m]) monthPnls[m] = { trades: 0, pnl: 0, wins: 0, monthName: "" };
        monthPnls[m].trades += 1;
        monthPnls[m].pnl += parseFloat(entry.pnl);
        if (parseFloat(entry.pnl) > 0) monthPnls[m].wins += 1;
      }
    });

    // Update calendar outcomes
    setCalendarOutcomes(newOutcomes);

    // Build weekly stats
    const newWeekly = [];
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    for (let w = 1; w <= 5; w++) {
      if (monthTrades[w]) {
        const winRate = ((monthTrades[w].wins / monthTrades[w].trades) * 100).toFixed(1) + "%";
        newWeekly.push({
          week: `Week ${w}`,
          pnl: parseFloat(monthTrades[w].pnl.toFixed(2)),
          trades: monthTrades[w].trades,
          winRate: winRate,
        });
      }
    }
    if (newWeekly.length > 0) setWeeklyStats(newWeekly);

    // Build monthly stats
    const newMonthly = [];
    monthPnls.forEach((data, idx) => {
      if (data) {
        const winRate = ((data.wins / data.trades) * 100).toFixed(1) + "%";
        newMonthly.push({
          month: monthNames[idx],
          pnl: parseFloat(data.pnl.toFixed(2)),
          trades: data.trades,
          winRate: winRate,
        });
      }
    });
    if (newMonthly.length > 0) setMonthlyStats(newMonthly);
  }, [journalEntries]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const shortDays = ["S", "M", "T", "W", "T", "F", "S"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  function prevMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
  }

  function nextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
  }

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const today = new Date();
  const isToday = (day) => (
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear()
  );

  // ─── Get day outcome for calendar coloring ───
  const getDayOutcome = (day) => {
    if (!day) return null;
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (hasEnoughData && calendarOutcomes[dateKey]) {
      return calendarOutcomes[dateKey];
    }
    if (!hasEnoughData && DEMO_CALENDAR_OUTCOMES[dateKey]) {
      return DEMO_CALENDAR_OUTCOMES[dateKey];
    }
    return null;
  };

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

  // ─── Determine which data to display ───
  const displayWeeklyData = hasEnoughData && weeklyStats.length > 0 ? weeklyStats : DEMO_WEEKLY_DATA;
  const displayMonthlyData = hasEnoughData && monthlyStats.length > 0 ? monthlyStats : DEMO_MONTHLY_DATA;

  // ─── Calculate totals ───
  const weeklyTotal = useMemo(() => {
    const totalPnL = displayWeeklyData.reduce((sum, w) => sum + w.pnl, 0);
    const totalTrades = displayWeeklyData.reduce((sum, w) => sum + w.trades, 0);
    const totalWins = displayWeeklyData.reduce((sum, w) => sum + (parseFloat(w.winRate) / 100 * w.trades), 0);
    const avgWinRate = totalTrades > 0 ? ((totalWins / totalTrades) * 100).toFixed(1) + "%" : "0.0%";
    return { pnl: totalPnL, trades: totalTrades, winRate: avgWinRate };
  }, [displayWeeklyData]);

  const monthlyTotal = useMemo(() => {
    const totalPnL = displayMonthlyData.reduce((sum, m) => sum + m.pnl, 0);
    const totalTrades = displayMonthlyData.reduce((sum, m) => sum + m.trades, 0);
    const totalWins = displayMonthlyData.reduce((sum, m) => sum + (parseFloat(m.winRate) / 100 * m.trades), 0);
    const avgWinRate = totalTrades > 0 ? ((totalWins / totalTrades) * 100).toFixed(1) + "%" : "0.0%";
    return { pnl: totalPnL, trades: totalTrades, winRate: avgWinRate };
  }, [displayMonthlyData]);

  const todayStr = today.toISOString().split("T")[0];

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

        <aside className={`
          md:hidden fixed top-0 left-0 h-screen w-60 bg-white shadow-xl z-50 flex flex-col p-4
          transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
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
              <h1 className="text-xl sm:text-2xl font-bold text-stone-800">Calendar</h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">Track your trading performance by date</p>
            </div>

            <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">

              {/* Calendar */}
              <div className="w-full xl:w-[380px] 2xl:w-[420px] shrink-0">
                <div className="bg-white rounded-xl shadow-md p-3 sm:p-5">

                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <button
                      onClick={prevMonth}
                      className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 font-bold text-sm sm:text-base cursor-pointer active:bg-stone-50 transition-colors"
                    >
                      ←
                    </button>

                    <h2 className="text-sm sm:text-base font-bold text-stone-800">
                      {monthNames[month]} {year}
                    </h2>

                    <button
                      onClick={nextMonth}
                      className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 font-bold text-sm sm:text-base active:bg-stone-50 cursor-pointer transition-colors"
                    >
                      →
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-px sm:gap-1 mb-1">
                    {shortDays.map((day, i) => (
                      <div
                        key={i}
                        className="text-center text-[9px] sm:text-[10px] font-semibold text-stone-500 uppercase tracking-wider py-1"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-px sm:gap-1">
                    {calendarDays.map((day, index) => {
                      const outcome = getDayOutcome(day);
                      let dayClass = "invisible";
                      let textClass = "";

                      if (day !== null) {
                        if (isToday(day)) {
                          dayClass = "bg-stone-800 text-white hover:bg-stone-700";
                        } else if (outcome === "profit") {
                          dayClass = "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 cursor-pointer border border-emerald-300";
                        } else if (outcome === "loss") {
                          dayClass = "bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer border border-red-300";
                        } else if (outcome === "neutral") {
                          dayClass = "bg-stone-200 text-stone-600 hover:bg-stone-300 cursor-pointer border border-stone-300";
                        } else {
                          dayClass = "text-stone-700 hover:bg-stone-100 cursor-pointer";
                        }
                      }

                      return (
                        <div
                          key={index}
                          className={`
                            aspect-square flex items-center justify-center rounded text-[10px] sm:text-xs font-medium transition-colors min-h-[28px] sm:min-h-[36px]
                            ${dayClass}
                          `}
                          title={outcome ? `Outcome: ${outcome}` : ""}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center justify-center gap-3 mt-3 sm:mt-4 text-[10px] sm:text-xs text-stone-500">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300"></div>
                      <span>Profit</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-red-100 border border-red-300"></div>
                      <span>Loss</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-stone-200 border border-stone-300"></div>
                      <span>No Trade</span>
                    </div>
                  </div>

                  <div className="flex justify-center mt-2 sm:mt-3">
                    <button
                      onClick={() => setCurrentDate(new Date())}
                      className="text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                    >
                      Back to Today
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Tables */}
              <div className="flex-1 flex flex-col gap-4 sm:gap-6 min-w-0">

                {/* Weekly Outcomes */}
                <div className="bg-white rounded-xl shadow-md p-3 sm:p-5">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-xs sm:text-sm font-bold text-stone-800 uppercase tracking-wide">
                      Weekly Outcomes
                    </h3>
                    <span className="text-[10px] sm:text-xs text-stone-400 font-medium">{monthNames[month]} {year}</span>
                  </div>

                  {!hasEnoughData && (
                    <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-xs sm:text-sm text-amber-800 font-medium">
                        📊 Demo Mode Active
                      </p>
                      <p className="text-[10px] sm:text-xs text-amber-700 mt-1">
                        This section displays sample data for preview purposes. Once you begin journaling your trades consistently for at least one week, your actual trading performance will automatically populate this dashboard and replace the demo data.
                      </p>
                    </div>
                  )}

                  <div className="overflow-x-auto -mx-3 sm:-mx-5 px-3 sm:px-5">
                    <table className="w-full min-w-[320px]">
                      <thead>
                        <tr className="border-b border-stone-200">
                          <th className="text-left text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide py-2 pr-2 sm:pr-4">Week</th>
                          <th className="text-right text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide py-2 px-2 sm:px-4">P&L</th>
                          <th className="text-right text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide py-2 px-2 sm:px-4">Trades</th>
                          <th className="text-right text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide py-2 pl-2 sm:pl-4">Win Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayWeeklyData.map((week, idx) => (
                          <tr key={idx} className="border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors">
                            <td className="py-2 sm:py-3 pr-2 sm:pr-4 text-xs sm:text-sm font-medium text-stone-800">{week.week}</td>
                            <td className={`py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-bold text-right ${week.pnl >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                              {week.pnl >= 0 ? "+" : ""}${week.pnl.toFixed(2)}
                            </td>
                            <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-stone-600 text-right">{week.trades}</td>
                            <td className="py-2 sm:py-3 pl-2 sm:pl-4 text-xs sm:text-sm text-stone-600 text-right">{week.winRate}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t-2 border-stone-200">
                          <td className="py-2 sm:py-3 pr-2 sm:pr-4 text-xs sm:text-sm font-bold text-stone-800">Total</td>
                          <td className={`py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-bold text-right ${weeklyTotal.pnl >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                            {weeklyTotal.pnl >= 0 ? "+" : ""}${weeklyTotal.pnl.toFixed(2)}
                          </td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-bold text-right text-stone-800">{weeklyTotal.trades}</td>
                          <td className="py-2 sm:py-3 pl-2 sm:pl-4 text-xs sm:text-sm font-bold text-right text-stone-800">{weeklyTotal.winRate}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Monthly Outcomes */}
                <div className="bg-white rounded-xl shadow-md p-3 sm:p-5">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-xs sm:text-sm font-bold text-stone-800 uppercase tracking-wide">
                      Monthly Outcomes
                    </h3>
                    <span className="text-[10px] sm:text-xs text-stone-400 font-medium">Year to Date</span>
                  </div>

                  {!hasEnoughData && (
                    <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-xs sm:text-sm text-amber-800 font-medium">
                        📊 Demo Mode Active
                      </p>
                      <p className="text-[10px] sm:text-xs text-amber-700 mt-1">
                        This section displays sample data for preview purposes. Once you begin journaling your trades consistently for at least one month, your actual trading performance will automatically populate this dashboard and replace the demo data.
                      </p>
                    </div>
                  )}

                  <div className="overflow-x-auto -mx-3 sm:-mx-5 px-3 sm:px-5">
                    <table className="w-full min-w-[320px]">
                      <thead>
                        <tr className="border-b border-stone-200">
                          <th className="text-left text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide py-2 pr-2 sm:pr-4">Month</th>
                          <th className="text-right text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide py-2 px-2 sm:px-4">P&L</th>
                          <th className="text-right text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide py-2 px-2 sm:px-4">Trades</th>
                          <th className="text-right text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wide py-2 pl-2 sm:pl-4">Win Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayMonthlyData.map((m, idx) => (
                          <tr key={idx} className="border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors">
                            <td className="py-2 sm:py-3 pr-2 sm:pr-4 text-xs sm:text-sm font-medium text-stone-800">{m.month}</td>
                            <td className={`py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-bold text-right ${m.pnl >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                              {m.pnl >= 0 ? "+" : ""}${m.pnl.toFixed(2)}
                            </td>
                            <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-stone-600 text-right">{m.trades}</td>
                            <td className="py-2 sm:py-3 pl-2 sm:pl-4 text-xs sm:text-sm text-stone-600 text-right">{m.winRate}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t-2 border-stone-200">
                          <td className="py-2 sm:py-3 pr-2 sm:pr-4 text-xs sm:text-sm font-bold text-stone-800">Total</td>
                          <td className={`py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-bold text-right ${monthlyTotal.pnl >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                            {monthlyTotal.pnl >= 0 ? "+" : ""}${monthlyTotal.pnl.toFixed(2)}
                          </td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-bold text-right text-stone-800">{monthlyTotal.trades}</td>
                          <td className="py-2 sm:py-3 pl-2 sm:pl-4 text-xs sm:text-sm font-bold text-right text-stone-800">{monthlyTotal.winRate}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
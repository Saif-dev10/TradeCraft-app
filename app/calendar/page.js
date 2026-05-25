"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "../../components/Sidebar";
import { RiMenuLine } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";

export default function Calendar() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);

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

  const weeklyData = [
    { week: "Week 1", pnl: 320.50, trades: 6, winRate: "66.7%" },
    { week: "Week 2", pnl: -120.00, trades: 4, winRate: "25.0%" },
    { week: "Week 3", pnl: 450.75, trades: 8, winRate: "75.0%" },
    { week: "Week 4", pnl: 180.25, trades: 5, winRate: "60.0%" },
  ];

  const monthlyData = [
    { month: "January", pnl: 890.00, trades: 22, winRate: "63.6%" },
    { month: "February", pnl: -210.50, trades: 18, winRate: "44.4%" },
    { month: "March", pnl: 560.25, trades: 20, winRate: "60.0%" },
    { month: "April", pnl: 340.75, trades: 16, winRate: "56.3%" },
    { month: "May", pnl: 831.50, trades: 23, winRate: "65.2%" },
  ];

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
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-stone-100 text-stone-600 text-lg"
          >
            <IoCloseSharp className="text-2xl" />
          </button>

          <nav className="flex flex-col gap-1 w-full mt-10">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => goTo(item.path)}
                className={`text-left text-base py-2.5 px-4 rounded-md transition-colors ${
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
            className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors shrink-0"
          >
            <RiMenuLine className="text-2xl text-stone-800" />
          </button>

          <div className="flex-1 min-w-0" />

          <button className="bg-stone-800 hover:bg-stone-700 active:opacity-75 py-1.5 sm:py-2 px-2 sm:px-4 rounded-md text-white text-xs sm:text-sm font-medium cursor-pointer transition-colors shrink-0">
            Filters
          </button>

          <button className="bg-stone-800 hover:bg-stone-700 active:opacity-75 py-1.5 sm:py-2 px-2 sm:px-4 rounded-md text-white text-xs sm:text-sm font-medium cursor-pointer transition-colors shrink-0  sm:block">
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
                    {calendarDays.map((day, index) => (
                      <div
                        key={index}
                        className={`
                          aspect-square flex items-center justify-center rounded text-[10px] sm:text-xs font-medium transition-colors min-h-[28px] sm:min-h-[36px]
                          ${day === null
                            ? "invisible"
                            : isToday(day)
                              ? "bg-stone-800 text-white hover:bg-stone-700"
                              : "text-stone-700 hover:bg-stone-100 cursor-pointer"
                          }
                        `}
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center mt-3 sm:mt-4">
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
                        {weeklyData.map((week, idx) => (
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
                          <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-bold text-right text-emerald-700">+$831.50</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-bold text-right text-stone-800">23</td>
                          <td className="py-2 sm:py-3 pl-2 sm:pl-4 text-xs sm:text-sm font-bold text-right text-stone-800">65.2%</td>
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
                        {monthlyData.map((m, idx) => (
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
                          <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-bold text-right text-emerald-700">+$2,412.00</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-bold text-right text-stone-800">99</td>
                          <td className="py-2 sm:py-3 pl-2 sm:pl-4 text-xs sm:text-sm font-bold text-right text-stone-800">58.6%</td>
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
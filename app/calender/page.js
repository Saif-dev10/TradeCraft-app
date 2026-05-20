"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "../../components/Sidebar";

export default function Calendar() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

  function goTo(path) {
    router.push(path);
    setMenuOpen(false);
  }

  return (
    <div className="flex min-h-screen bg-stone-100">
      {/* Desktop Sidebar - unchanged from your original */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      <>
        {/* Overlay */}
        {menuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/30 z-40"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Slide-out sidebar */}
        <aside className={`
          md:hidden fixed top-0 left-0 h-screen w-60 bg-white shadow-xl z-50 flex flex-col p-4
          transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <h1
            className="text-2xl font-bold text-center pt-4 cursor-pointer hover:text-stone-600 active:opacity-75 transition-colors text-stone-800"
            onClick={() => goTo("/journal")}
          >
            TradeCraft
          </h1>

          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-stone-100 text-stone-600 text-lg"
          >
            ✕
          </button>

          <nav className="flex flex-col gap-1 w-full mt-10">
            <button
              onClick={() => goTo("/journal")}
              className="text-left text-base py-2.5 px-4 rounded-md text-stone-600 hover:bg-stone-100 active:opacity-75 transition-colors"
            >
              Journal
            </button>
            <button
              onClick={() => goTo("/calendar")}
              className="text-left text-base py-2.5 px-4 rounded-md bg-stone-800 text-white font-medium"
            >
              Calendar
            </button>
            <button
              onClick={() => goTo("/trades")}
              className="text-left text-base py-2.5 px-4 rounded-md text-stone-600 hover:bg-stone-100 active:opacity-75 transition-colors"
            >
              Trades
            </button>
          </nav>
        </aside>
      </>

      <main className="flex-1 flex flex-col items-center justify-center p-4 pt-20 md:pt-6 relative">
        
        {/* Mobile Burger Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-stone-200 flex items-center justify-between px-4 z-30 shadow-sm">
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className="block h-0.5 bg-stone-800" />
              <span className="block h-0.5 bg-stone-800" />
              <span className="block h-0.5 bg-stone-800" />
            </div>
          </button>

          <h1 className="text-xl font-bold text-stone-800">TradeCraft</h1>

          <div className="w-9" />
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-xl shadow-md p-5 md:p-6 w-full max-w-2xl">
          
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMonth}
              className="p-2 rounded-lg hover:bg-stone-100 text-stone-600 font-bold text-lg transition-colors"
            >
              ←
            </button>
            
            <h2 className="text-lg md:text-xl font-bold text-stone-800">
              {monthNames[month]} {year}
            </h2>
            
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg hover:bg-stone-100 text-stone-600 font-bold text-lg transition-colors"
            >
              →
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
            {days.map((day) => (
              <div
                key={day}
                className="text-center text-[10px] md:text-xs font-semibold text-stone-500 uppercase tracking-wider py-2"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`
                  aspect-square flex items-center justify-center rounded-lg text-xs md:text-sm font-medium transition-colors
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

          <div className="flex justify-center mt-6">
            <button
              onClick={() => setCurrentDate(new Date())}
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              Back to Today
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
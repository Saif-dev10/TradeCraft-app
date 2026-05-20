"use client";

import { useState } from "react";
import { Sidebar } from "../../components/Sidebar";

export default function Calendar() {
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

  return (
    <div className="flex min-h-screen bg-stone-100">
      <Sidebar />

      <main className="flex-1 flex flex-col items-center justify-center p-4 pt-20 md:pt-6 relative">
        
        {/* Mobile Burger Menu - Only on this page */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-stone-200 flex items-center justify-between px-4 z-40 shadow-sm">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-stone-800 transition-all ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block h-0.5 bg-stone-800 transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-stone-800 transition-all ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </div>
          </button>

          <h1 className="text-xl font-bold text-stone-800">TradeCraft</h1>

          <div className="w-9" />
        </div>

        {/* Mobile Nav Overlay */}
        {menuOpen && (
          <>
            <div 
              className="md:hidden fixed inset-0 bg-black/30 z-40"
              onClick={() => setMenuOpen(false)}
            />
            <div className="md:hidden fixed top-16 left-0 right-0 bg-white border-b border-stone-200 shadow-lg z-40 p-4">
              <button 
                onClick={() => { window.location.href = "/journal"; }}
                className="block w-full text-left py-3 px-4 text-stone-700 hover:bg-stone-100 rounded-md font-medium"
              >
                Journal
              </button>
              <button 
                onClick={() => { window.location.href = "/calendar"; }}
                className="block w-full text-left py-3 px-4 text-stone-800 bg-stone-100 rounded-md font-medium"
              >
                Calendar
              </button>
              <button 
                onClick={() => { window.location.href = "/trades"; }}
                className="block w-full text-left py-3 px-4 text-stone-700 hover:bg-stone-100 rounded-md font-medium"
              >
                Trades
              </button>
            </div>
          </>
        )}

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
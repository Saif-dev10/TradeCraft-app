"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "../../components/Sidebar";
import { RiMenuLine } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";

export default function Trades() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Journal", path: "/journal" },
    { label: "Calendar", path: "/calendar" },
    { label: "Trades", path: "/trades" },
  ];

  function goTo(path) {
    router.push(path);
    setMenuOpen(false);
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

      <main className="flex-1 flex flex-col items-center justify-center p-4 pt-20 md:pt-6 relative">
        
        {/* Mobile Burger Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-stone-200 flex items-center justify-between px-4 z-30 shadow-sm">
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <RiMenuLine className="text-2xl text-stone-800" />
          </button>

          <h1 className="text-xl font-bold text-stone-800">TradeCraft</h1>

          <div className="w-9" />
        </div>

        {/* Trades Content Placeholder */}
        <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-4xl mx-4">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Trades</h2>
          <p className="text-stone-500">Your trades will appear here.</p>
        </div>
      </main>
    </div>
  );
}
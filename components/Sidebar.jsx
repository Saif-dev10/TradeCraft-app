"use client";

import { useRouter, usePathname } from "next/navigation";

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  function handleNavigation(path) {
    router.push(path);
  }

  return (
    <aside className="hidden md:flex md:w-60 md:sticky md:top-0 md:h-screen md:bg-white md:p-4 md:shadow-md md:flex-col">
      <h1 
        className="text-2xl font-bold text-center pt-4 cursor-pointer hover:text-blue-500 active:opacity-75 transition-colors"
        onClick={() => handleNavigation("/journal")}
      >
        TradeCraft
      </h1>

      <ul className="flex flex-col gap-2 w-full mt-10">
        <li 
          className={`cursor-pointer text-lg p-2 pl-14 rounded-md transition-colors ${
            pathname === "/journal"
              ? "bg-stone-800 text-white font-medium"
              : "hover:bg-gray-200 active:opacity-75"
          }`}
          onClick={() => handleNavigation("/journal")}
        >
          Journal
        </li>

        <li 
          className={`cursor-pointer text-lg p-2 pl-14 rounded-md transition-colors ${
            pathname === "/calendar"
              ? "bg-stone-800 text-white font-medium"
              : "hover:bg-gray-200 active:opacity-75"
          }`}
          onClick={() => handleNavigation("/calendar")}
        >
          Calendar
        </li>

        <li 
          className={`cursor-pointer text-lg p-2 pl-14 rounded-md transition-colors ${
            pathname === "/trades"
              ? "bg-stone-800 text-white font-medium"
              : "hover:bg-gray-200 active:opacity-75"
          }`}
          onClick={() => handleNavigation("/trades")}
        >
          Trades
        </li>

        <li 
          className={`cursor-pointer text-lg p-2 pl-14 rounded-md transition-colors ${
            pathname === "/calculator"
              ? "bg-stone-800 text-white font-medium"
              : "hover:bg-gray-200 active:opacity-75"
          }`}
          onClick={() => handleNavigation("/calculator")}
        >
          Calculator
        </li>
      </ul>
    </aside>
  );
}
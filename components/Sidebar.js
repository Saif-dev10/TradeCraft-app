 "use client";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const router = useRouter();

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
          className="cursor-pointer text-lg hover:bg-gray-200 active:opacity-75 p-2 pl-14 rounded-md"
          onClick={() => handleNavigation("/journal")}
        >
          Journal
        </li>

        <li 
          className="cursor-pointer text-lg hover:bg-gray-200 active:opacity-75 p-2 pl-14 rounded-md"
          onClick={() => handleNavigation("/calender")}
        >
          Calendar
        </li>

        <li 
          className="cursor-pointer text-lg hover:bg-gray-200 active:opacity-75 p-2 pl-14 rounded-md"
          onClick={() => handleNavigation("/trades")}
        >
          Trades
        </li>
      </ul>
    </aside>
  );
}
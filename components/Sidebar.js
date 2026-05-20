export function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-60 md:sticky md:top-0 md:h-screen md:bg-white md:p-4 md:shadow-md md:flex-col">
      
      <ul className="flex flex-col gap-2 w-full mt-10">
        <li className="cursor-pointer text-lg hover:bg-gray-200 active:opacity-75 p-2 pl-14 rounded-md">
          Journal
        </li>

        <li className="cursor-pointer text-lg hover:bg-gray-200 active:opacity-75 p-2 pl-14 rounded-md">
          Calendar
        </li>

        <li className="cursor-pointer text-lg hover:bg-gray-200 active:opacity-75 p-2 pl-14 rounded-md">
          Trades
        </li>
      </ul>
    </aside>
  );
}
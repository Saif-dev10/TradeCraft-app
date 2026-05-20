export function Sidebar() {
  return (
    <>
      <main className="bg-white w-60 fixed left-0 top-0 h-[100vh] p-4 flex flex-col justify-start pt-25 decoration-none shadow-md">
        <ul className="flex flex-col gap-2 w-full">
          <li className="cursor-pointer text-lg hover:bg-gray-200 active:opacity-75 p-2 pl-14">Journal</li>
          <li className="cursor-pointer text-lg hover:bg-gray-200 active:opacity-75 p-2 pl-14">Calender</li>
          <li className="cursor-pointer text-lg hover:bg-gray-200 active:opacity-75 p-2 pl-14">Trades</li>
        </ul>
      </main>
    </>
  );
}
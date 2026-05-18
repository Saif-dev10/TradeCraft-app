export function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between py-4 px-8 bg-white shadow-md text-black">
      <div className="text-2xl font-bold cursor-pointer active:opacity-75">TradeCraft</div>
      <ul className="flex space-x-6">
        <li className="active:text-gray-400 cursor-pointer">Home</li>
        <li className="active:text-gray-400 cursor-pointer">About</li>
        <li className="active:text-gray-400 cursor-pointer">Services</li>
        <li className="active:text-gray-400 cursor-pointer">Contact</li>
      </ul>
    </nav>
  );
}
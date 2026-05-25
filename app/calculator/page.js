"use client";

import { useState } from "react";
import { RiMenuLine, RiCalculatorLine, RiPercentLine, RiMoneyDollarCircleLine, RiArrowUpDownLine, RiInformationLine, RiWallet3Line, RiAddLine, RiCloseLine, RiEditLine } from "react-icons/ri";
import { Sidebar } from "@/components/Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { IoCloseSharp } from "react-icons/io5";

export default function CalculatorPage() {
  const router = useRouter();
  const pathname = usePathname();
  const todayStr = new Date().toISOString().split("T")[0];
  const [activeTab, setActiveTab] = useState("position");
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Account Management
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [accounts, setAccounts] = useState([
    { id: 1, name: "Main Account", balance: 10000, currency: "USD", type: "Live" },
  ]);
  const [selectedAccountId, setSelectedAccountId] = useState(1);
  
  // New Account Form
  const [newAccountName, setNewAccountName] = useState("");
  const [newAccountBalance, setNewAccountBalance] = useState("");
  const [newAccountCurrency, setNewAccountCurrency] = useState("USD");
  const [newAccountType, setNewAccountType] = useState("Live");

  const selectedAccount = accounts.find(a => a.id === selectedAccountId) || accounts[0];

  // --- Position Calculator ---
  const [riskPercent, setRiskPercent] = useState(1);
  const [entryPrice, setEntryPrice] = useState(150);
  const [stopLoss, setStopLoss] = useState(148.5);

  // --- Risk/Reward Calculator ---
  const [rrEntry, setRrEntry] = useState(100);
  const [rrStop, setRrStop] = useState(95);
  const [rrTarget, setRrTarget] = useState(115);

  // --- Pip Calculator ---
  const [pipPair, setPipPair] = useState("EUR/USD");
  const [pipLotSize, setPipLotSize] = useState(1.0);
  const [pipPips, setPipPips] = useState(50);

  // --- Compound Calculator ---
  const [compoundMonths, setCompoundMonths] = useState(12);
  const [compoundReturn, setCompoundReturn] = useState(5);

  // Calculated values
  const accountSize = selectedAccount?.balance || 0;
  const riskAmount = (accountSize * riskPercent / 100).toFixed(2);
  const priceRisk = Math.abs(entryPrice - stopLoss).toFixed(2);
  const positionSize = priceRisk !== "0.00" ? (parseFloat(riskAmount) / parseFloat(priceRisk)).toFixed(0) : "0";

  const rrRisk = Math.abs(rrEntry - rrStop).toFixed(2);
  const rrReward = Math.abs(rrTarget - rrEntry).toFixed(2);
  const rrRatio = parseFloat(rrRisk) !== 0 ? (parseFloat(rrReward) / parseFloat(rrRisk)).toFixed(2) : "0";

  const pipValue = (pipLotSize * 10).toFixed(2);
  const pipProfit = (pipPips * parseFloat(pipValue)).toFixed(2);

  const compoundResult = (accountSize * Math.pow(1 + compoundReturn / 100, compoundMonths)).toFixed(2);
  const totalProfit = (parseFloat(compoundResult) - accountSize).toFixed(2);

  const tabs = [
    { id: "position", label: "Position Size", icon: RiCalculatorLine },
    { id: "riskreward", label: "Risk / Reward", icon: RiPercentLine },
    { id: "pip", label: "Pip Value", icon: RiArrowUpDownLine },
    { id: "compound", label: "Compound", icon: RiMoneyDollarCircleLine },
  ];

  const riskPresets = [0.5, 1, 2, 3, 5];
  const lotPresets = [0.01, 0.1, 0.5, 1.0, 2.0];
  const returnPresets = [1, 3, 5, 10, 15];
  const monthPresets = [3, 6, 12, 24, 36];
  const currencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD"];
  const accountTypes = ["Live", "Demo", "Prop Firm", "Challenge"];

  const handleAddAccount = () => {
    if (!newAccountName || !newAccountBalance) return;
    const newId = Math.max(...accounts.map(a => a.id), 0) + 1;
    const newAccount = {
      id: newId,
      name: newAccountName,
      balance: parseFloat(newAccountBalance),
      currency: newAccountCurrency,
      type: newAccountType,
    };
    setAccounts([...accounts, newAccount]);
    setSelectedAccountId(newId);
    resetAccountForm();
  };

  const handleEditAccount = (account) => {
    setEditingAccount(account);
    setNewAccountName(account.name);
    setNewAccountBalance(account.balance.toString());
    setNewAccountCurrency(account.currency);
    setNewAccountType(account.type);
    setShowAccountModal(true);
  };

  const handleUpdateAccount = () => {
    if (!editingAccount || !newAccountName || !newAccountBalance) return;
    setAccounts(accounts.map(a => 
      a.id === editingAccount.id 
        ? { ...a, name: newAccountName, balance: parseFloat(newAccountBalance), currency: newAccountCurrency, type: newAccountType }
        : a
    ));
    resetAccountForm();
  };

  const handleDeleteAccount = (id) => {
    if (accounts.length <= 1) return;
    const newAccounts = accounts.filter(a => a.id !== id);
    setAccounts(newAccounts);
    if (selectedAccountId === id) {
      setSelectedAccountId(newAccounts[0].id);
    }
  };

  const resetAccountForm = () => {
    setNewAccountName("");
    setNewAccountBalance("");
    setNewAccountCurrency("USD");
    setNewAccountType("Live");
    setEditingAccount(null);
    setShowAccountModal(false);
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

  return (
    <main className="min-h-screen bg-stone-50 md:flex">
      {/* Mobile Sidebar Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-60 bg-white shadow-xl transform transition-transform duration-300 md:hidden ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold text-stone-800 pt-4">TradeCraft</h1>

          {menuOpen && (<button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-stone-100 text-stone-600 text-lg"
          >
            <IoCloseSharp className="text-2xl" />
          </button>)}

          <ul className="flex flex-col gap-2 w-full mt-10">
        <li 
          className={`cursor-pointer text-lg p-2 pl-14 rounded-md transition-colors ${
            pathname === "/journal"
              ? "bg-stone-800 text-white font-medium"
              : "text-stone-800 hover:bg-gray-200 active:opacity-75"
          }`}
          onClick={() => goTo("/journal")}
        >
          Journal
        </li>

        <li 
          className={`cursor-pointer text-lg p-2 pl-14 rounded-md transition-colors ${
            pathname === "/calendar"
              ? "bg-stone-800 text-white font-medium"
              : "text-stone-800 hover:bg-gray-200 active:opacity-75"
          }`}
          onClick={() => goTo("/calendar")}
        >
          Calendar
        </li>

        <li 
          className={`cursor-pointer text-lg p-2 pl-14 rounded-md transition-colors ${
            pathname === "/trades"
              ? "bg-stone-800 text-white font-medium"
              : "text-stone-800 hover:bg-gray-200 active:opacity-75"
          }`}
          onClick={() => goTo("/trades")}
        >
          Trades
        </li>

        <li 
          className={`cursor-pointer text-lg p-2 pl-14 rounded-md transition-colors ${
            pathname === "/calculator"
              ? "bg-stone-800 text-white font-medium"
              : "text-stone-800 hover:bg-gray-200 active:opacity-75"
          }`}
          onClick={() => goTo("/calculator")}
        >
          Calculator
        </li>
      </ul>
        </div>
      </div>

      <Sidebar />
      
      <div className="flex-1">
        {/* Top Bar */}
        <header className="bg-white border-b border-stone-200 h-16 flex items-center gap-2 sm:gap-4 px-3 sm:px-6 shadow-sm sticky top-0 z-30">
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors shrink-0"
          >
            <RiMenuLine className="text-2xl text-stone-800" />
          </button>

          <div className="flex items-center gap-2">
            <RiCalculatorLine className="text-xl text-stone-600" />
            <h2 className="text-lg font-semibold text-stone-800 hidden sm:block">Trading Calculator</h2>
          </div>

          <div className="flex-1 min-w-0" />

          {/* Account Selector */}
          <div className="hidden sm:flex items-center gap-2">
            {accounts.map((account) => (
              <button
                key={account.id}
                onClick={() => setSelectedAccountId(account.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedAccountId === account.id
                    ? "bg-stone-800 text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                <RiWallet3Line />
                {account.name}
              </button>
            ))}
            <button
              onClick={() => setShowAccountModal(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-100 text-stone-600 hover:bg-stone-200 transition-all cursor-pointer"
            >
              <RiAddLine />
              Add
            </button>
          </div>

          <div className="border border-stone-300 rounded-md py-1.5 sm:py-2 px-2 sm:px-4 bg-white flex items-center shrink-0">
            <span className="text-xs sm:text-sm text-stone-600 font-medium">
              {todayStr}
            </span>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-2">Trading Calculator</h1>
            <p className="text-stone-500 text-sm sm:text-base">Works with any account size — $5 or $500,000.</p>
          </div>

          {/* Active Account Card */}
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-stone-800 flex items-center justify-center shrink-0">
                  <RiWallet3Line className="text-white text-2xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-stone-800">{selectedAccount?.name}</h3>
                    <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                      selectedAccount?.type === "Live" ? "bg-green-100 text-green-700" :
                      selectedAccount?.type === "Demo" ? "bg-blue-100 text-blue-700" :
                      selectedAccount?.type === "Prop Firm" ? "bg-purple-100 text-purple-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {selectedAccount?.type}
                    </span>
                  </div>
                  <p className="text-sm text-stone-500">
                    Balance: <span className="font-bold text-stone-800">{selectedAccount?.currency} {selectedAccount?.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditAccount(selectedAccount)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-stone-100 text-stone-700 hover:bg-stone-200 transition-all cursor-pointer"
                >
                  <RiEditLine />
                  Edit
                </button>
                <button
                  onClick={() => setShowAccountModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-stone-800 text-white hover:bg-stone-700 transition-all cursor-pointer"
                >
                  <RiAddLine />
                  New Account
                </button>
              </div>
            </div>

            {/* Mobile Account Selector */}
            <div className="sm:hidden mt-4 pt-4 border-t border-stone-100">
              <p className="text-xs font-medium text-stone-500 mb-2">Switch Account:</p>
              <div className="flex flex-wrap gap-2">
                {accounts.map((account) => (
                  <button
                    key={account.id}
                    onClick={() => setSelectedAccountId(account.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      selectedAccountId === account.id
                        ? "bg-stone-800 text-white"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    <RiWallet3Line />
                    {account.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-1.5 mb-6 overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-stone-800 text-white shadow-md"
                        : "text-stone-600 hover:bg-stone-100 hover:text-stone-800"
                    }`}
                  >
                    <Icon className="text-lg" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* POSITION SIZE CALCULATOR */}
          {activeTab === "position" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center">
                    <RiCalculatorLine className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-800">Position Size</h3>
                    <p className="text-xs text-stone-500">Based on {selectedAccount?.name} balance</p>
                  </div>
                </div>

                {/* Account Balance Display */}
                <div className="bg-stone-50 rounded-lg p-4 border border-stone-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-stone-600">Account Balance</span>
                    <span className="text-lg font-bold text-stone-800">{selectedAccount?.currency} {accountSize.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                {/* Risk % - Preset Chips */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">Risk Per Trade</label>
                  <div className="flex flex-wrap gap-2">
                    {riskPresets.map((pct) => (
                      <button
                        key={pct}
                        onClick={() => setRiskPercent(pct)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                          riskPercent === pct
                            ? "bg-stone-800 text-white shadow-md"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-stone-400 mt-2">
                    Risk amount: <span className="font-semibold text-stone-800">{selectedAccount?.currency} {riskAmount}</span>
                  </p>
                </div>

                {/* Entry & Stop - Compact Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Entry Price</label>
                    <input
                      type="number"
                      value={entryPrice}
                      onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none text-stone-800 font-bold text-center text-lg"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Stop Loss</label>
                    <input
                      type="number"
                      value={stopLoss}
                      onChange={(e) => setStopLoss(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none text-stone-800 font-bold text-center text-lg"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-stone-800 rounded-xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-stone-300 text-sm font-medium">Position Size</span>
                    <RiCalculatorLine className="text-stone-400 text-lg" />
                  </div>
                  <div className="text-5xl font-bold mb-2">
                    {positionSize} <span className="text-lg text-stone-400 font-normal">units</span>
                  </div>
                  <div className="text-stone-400 text-sm">
                    {riskPercent}% risk = {selectedAccount?.currency} {riskAmount}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-xs font-medium text-stone-500 uppercase">Price Risk</span>
                    </div>
                    <div className="text-2xl font-bold text-stone-800">{selectedAccount?.currency} {priceRisk}</div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-xs font-medium text-stone-500 uppercase">Risk Amount</span>
                    </div>
                    <div className="text-2xl font-bold text-stone-800">{selectedAccount?.currency} {riskAmount}</div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <RiInformationLine className="text-amber-600 text-xl shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-amber-800 mb-1">Risk Management</h4>
                      <p className="text-xs text-amber-700">
                        With {selectedAccount?.currency} {accountSize.toLocaleString()}, risking {riskPercent}% means you can afford to lose {selectedAccount?.currency} {riskAmount} per trade. 
                        {accountSize < 1000 ? " Consider micro-lots to stay within risk limits." : " Stick to 1-2% for consistency."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RISK / REWARD CALCULATOR */}
          {activeTab === "riskreward" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center">
                    <RiPercentLine className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-800">Risk / Reward</h3>
                    <p className="text-xs text-stone-500">Evaluate any trade setup</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Entry Price", value: rrEntry, setter: setRrEntry, color: "border-stone-300" },
                    { label: "Stop Loss", value: rrStop, setter: setRrStop, color: "border-red-300" },
                    { label: "Take Profit", value: rrTarget, setter: setRrTarget, color: "border-green-300" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-sm font-medium text-stone-700 mb-2">{field.label}</label>
                      <input
                        type="number"
                        value={field.value}
                        onChange={(e) => field.setter(parseFloat(e.target.value) || 0)}
                        className={`w-full px-4 py-3 border-2 ${field.color} rounded-lg focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none text-stone-800 font-bold text-center text-lg`}
                        step="0.01"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-stone-800 rounded-xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-stone-300 text-sm font-medium">R:R Ratio</span>
                    <RiPercentLine className="text-stone-400 text-lg" />
                  </div>
                  <div className="text-5xl font-bold mb-2">1:{rrRatio}</div>
                  <div className={`text-sm font-medium ${parseFloat(rrRatio) >= 2 ? 'text-green-400' : parseFloat(rrRatio) >= 1.5 ? 'text-amber-400' : 'text-red-400'}`}>
                    {parseFloat(rrRatio) >= 2 ? "Excellent Setup" : parseFloat(rrRatio) >= 1.5 ? "Good Setup" : "Poor Setup — Consider Skipping"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-xs font-medium text-stone-500 uppercase">Risk</span>
                    </div>
                    <div className="text-2xl font-bold text-red-600">{selectedAccount?.currency} {rrRisk}</div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs font-medium text-stone-500 uppercase">Reward</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{selectedAccount?.currency} {rrReward}</div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
                  <h4 className="text-sm font-semibold text-stone-700 mb-4">Visual</h4>
                  <div className="relative h-14 bg-stone-100 rounded-xl overflow-hidden flex">
                    <div 
                      className="bg-red-500 h-full flex items-center justify-center text-white text-sm font-bold transition-all duration-500"
                      style={{ width: `${100 / (parseFloat(rrRatio) + 1)}%` }}
                    >
                      Risk
                    </div>
                    <div 
                      className="bg-green-500 h-full flex items-center justify-center text-white text-sm font-bold transition-all duration-500"
                      style={{ width: `${(parseFloat(rrRatio) / (parseFloat(rrRatio) + 1)) * 100}%` }}
                    >
                      Reward
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PIP VALUE CALCULATOR */}
          {activeTab === "pip" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center">
                    <RiArrowUpDownLine className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-800">Pip Value</h3>
                    <p className="text-xs text-stone-500">Forex pip calculations</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">Currency Pair</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF", "AUD/USD", "USD/CAD"].map((pair) => (
                      <button
                        key={pair}
                        onClick={() => setPipPair(pair)}
                        className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                          pipPair === pair
                            ? "bg-stone-800 text-white shadow-md"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        {pair}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">Lot Size</label>
                  <div className="flex flex-wrap gap-2">
                    {lotPresets.map((size) => (
                      <button
                        key={size}
                        onClick={() => setPipLotSize(size)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                          pipLotSize === size
                            ? "bg-stone-800 text-white shadow-md"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium text-stone-700">Pips Gained</label>
                    <span className="text-lg font-bold text-stone-800">{pipPips} pips</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="500"
                    value={pipPips}
                    onChange={(e) => setPipPips(parseInt(e.target.value))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-800"
                  />
                  <div className="flex justify-between text-xs text-stone-400 mt-1">
                    <span>1 pip</span>
                    <span>500 pips</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-stone-800 rounded-xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-stone-300 text-sm font-medium">Profit / Loss</span>
                    <RiArrowUpDownLine className="text-stone-400 text-lg" />
                  </div>
                  <div className={`text-5xl font-bold mb-2 ${parseFloat(pipProfit) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedAccount?.currency} {pipProfit}
                  </div>
                  <div className="text-stone-400 text-sm">
                    {pipPair} @ {pipLotSize} lots
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-xs font-medium text-stone-500 uppercase">Pip Value</span>
                    </div>
                    <div className="text-2xl font-bold text-stone-800">{selectedAccount?.currency} {pipValue}</div>
                    <div className="text-xs text-stone-400 mt-1">per pip</div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span className="text-xs font-medium text-stone-500 uppercase">Pips</span>
                    </div>
                    <div className="text-2xl font-bold text-stone-800">{pipPips}</div>
                    <div className="text-xs text-stone-400 mt-1">movement</div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
                  <h4 className="text-sm font-semibold text-stone-700 mb-4">Pip Value Reference</h4>
                  <div className="space-y-2">
                    {[
                      { pair: "EUR/USD", value: "10.00" },
                      { pair: "GBP/USD", value: "10.00" },
                      { pair: "USD/JPY", value: "6.67" },
                      { pair: "USD/CHF", value: "11.24" },
                    ].map((item) => (
                      <div key={item.pair} className="flex justify-between items-center py-2 border-b border-stone-100 last:border-0">
                        <span className="text-sm text-stone-600 font-medium">{item.pair}</span>
                        <span className="text-sm text-stone-800 font-semibold">{selectedAccount?.currency} {item.value} / pip</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-stone-400 mt-3">* Standard lot (100k units)</p>
                </div>
              </div>
            </div>
          )}

          {/* COMPOUND CALCULATOR */}
          {activeTab === "compound" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center">
                    <RiMoneyDollarCircleLine className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-stone-800">Compound Growth</h3>
                    <p className="text-xs text-stone-500">Project {selectedAccount?.name} over time</p>
                  </div>
                </div>

                <div className="bg-stone-50 rounded-lg p-4 border border-stone-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-stone-600">Starting Capital</span>
                    <span className="text-lg font-bold text-stone-800">{selectedAccount?.currency} {accountSize.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">Monthly Return</label>
                  <div className="flex flex-wrap gap-2">
                    {returnPresets.map((pct) => (
                      <button
                        key={pct}
                        onClick={() => setCompoundReturn(pct)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                          compoundReturn === pct
                            ? "bg-stone-800 text-white shadow-md"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-3">Time Period</label>
                  <div className="flex flex-wrap gap-2">
                    {monthPresets.map((m) => (
                      <button
                        key={m}
                        onClick={() => setCompoundMonths(m)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                          compoundMonths === m
                            ? "bg-stone-800 text-white shadow-md"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        {m} months
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-stone-800 rounded-xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-stone-300 text-sm font-medium">Final Balance</span>
                    <RiMoneyDollarCircleLine className="text-stone-400 text-lg" />
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold mb-2">
                    {selectedAccount?.currency} {parseFloat(compoundResult).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-stone-400 text-sm">
                    After {compoundMonths} months @ {compoundReturn}%/mo
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs font-medium text-stone-500 uppercase">Total Profit</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      +{selectedAccount?.currency} {parseFloat(totalProfit).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-xs font-medium text-stone-500 uppercase">Total Return</span>
                    </div>
                    <div className="text-2xl font-bold text-stone-800">
                      {accountSize > 0 ? ((parseFloat(compoundResult) - accountSize) / accountSize * 100).toFixed(1) : "0"}%
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-stone-100">
                    <h4 className="text-sm font-semibold text-stone-700">Growth Snapshot</h4>
                  </div>
                  <div className="max-h-56 overflow-y-auto">
                    <table className="w-full">
                      <thead className="bg-stone-50 sticky top-0">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase">Month</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-stone-500 uppercase">Balance</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-stone-500 uppercase">Profit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {Array.from({ length: Math.min(compoundMonths, 12) }, (_, i) => {
                          const month = i + 1;
                          const balance = accountSize * Math.pow(1 + compoundReturn / 100, month);
                          const profit = balance - accountSize * Math.pow(1 + compoundReturn / 100, month - 1);
                          return (
                            <tr key={month} className="hover:bg-stone-50">
                              <td className="px-4 py-2.5 text-sm text-stone-600 font-medium">{month}</td>
                              <td className="px-4 py-2.5 text-sm text-stone-800 font-semibold text-right">
                                {selectedAccount?.currency} {balance.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                              </td>
                              <td className="px-4 py-2.5 text-sm text-green-600 font-medium text-right">
                                +{selectedAccount?.currency} {profit.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {compoundMonths > 12 && (
                    <div className="px-4 py-2 bg-stone-50 text-xs text-stone-500 text-center border-t border-stone-100">
                      Showing first 12 of {compoundMonths} months
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Account Modal */}
      {showAccountModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-stone-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-stone-800">
                {editingAccount ? "Edit Account" : "Add New Account"}
              </h3>
              <button
                onClick={resetAccountForm}
                className="p-2 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <RiCloseLine className="text-xl text-stone-600" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Account Name */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Account Name</label>
                <input
                  type="text"
                  value={newAccountName}
                  onChange={(e) => setNewAccountName(e.target.value)}
                  placeholder="My Trading Account"
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none text-stone-800 font-medium"
                />
              </div>

              {/* Balance */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Balance</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-medium">{newAccountCurrency}</span>
                  <input
                    type="number"
                    value={newAccountBalance}
                    onChange={(e) => setNewAccountBalance(e.target.value)}
                    placeholder="10.00"
                    className="w-full pl-14 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-800 focus:border-stone-800 outline-none text-stone-800 font-bold text-lg"
                  />
                </div>
                <p className="text-xs text-stone-400 mt-1">Any amount — $5, $500, or $500,000</p>
              </div>

              {/* Currency */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Currency</label>
                <div className="grid grid-cols-3 gap-2">
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setNewAccountCurrency(curr)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        newAccountCurrency === curr
                          ? "bg-stone-800 text-white shadow-md"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Account Type */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Account Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {accountTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setNewAccountType(type)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        newAccountType === type
                          ? "bg-stone-800 text-white shadow-md"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-stone-200 flex gap-3">
              {editingAccount && (
                <button
                  onClick={() => handleDeleteAccount(editingAccount.id)}
                  className="flex-1 py-3 rounded-lg text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-all cursor-pointer"
                >
                  Delete
                </button>
              )}
              <button
                onClick={resetAccountForm}
                className="flex-1 py-3 rounded-lg text-sm font-medium bg-stone-100 text-stone-600 hover:bg-stone-200 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={editingAccount ? handleUpdateAccount : handleAddAccount}
                disabled={!newAccountName || !newAccountBalance}
                className="flex-1 py-3 rounded-lg text-sm font-medium bg-stone-800 text-white hover:bg-stone-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingAccount ? "Update" : "Add Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
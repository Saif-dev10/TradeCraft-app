"use client";

import { useState } from "react";

export default function Journal() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  // Fixed: proper full date (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  return (
    <main className="min-h-screen bg-stone-100">
      
      {/* Top Bar */}
      <div className="bg-white border-b border-stone-200 h-16 flex justify-end items-center gap-4 px-6 shadow-sm">
        
        <button className="bg-stone-800 hover:bg-stone-700 active:opacity-75 py-2 px-4 rounded-md text-white text-sm font-medium cursor-pointer transition-colors">
          Filters
        </button>

        <button className="bg-stone-800 hover:bg-stone-700 active:opacity-75 py-2 px-4 rounded-md text-white text-sm font-medium cursor-pointer transition-colors">
          Account (1)
        </button>

        <div className="border border-stone-300 rounded-md py-2 px-4 bg-white flex items-center">
          <span className="text-sm text-stone-600 font-medium">{today}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-6 py-8 max-w-6xl md:pl-60">
        
        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition cursor-pointer border-l-4 border-emerald-600">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Profit</p>
            <p className="text-2xl font-bold text-emerald-700">$1,200</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition cursor-pointer border-l-4 border-red-600">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Loss</p>
            <p className="text-2xl font-bold text-red-700">$500</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition cursor-pointer border-l-4 border-blue-600">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Win Rate</p>
            <p className="text-2xl font-bold text-blue-700">60.02%</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition cursor-pointer border-l-4 border-amber-600">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">Target</p>
            <p className="text-2xl font-bold text-amber-700">$5,000</p>
          </div>
        </section>

        {/* Journal Form */}
        <section className="bg-white rounded-lg shadow-sm mt-8 border border-stone-200">
          <div className="p-6">
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-b-2 border-stone-200 py-3 px-1 text-lg font-medium text-stone-800 placeholder-stone-400 outline-none focus:border-stone-800 transition-colors mb-4 bg-transparent" 
              placeholder="Entry title..." 
            />

            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-48 border border-stone-200 rounded-md p-4 text-stone-700 placeholder-stone-400 outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-200 transition-all resize-none leading-relaxed" 
              placeholder="Add trade journal here..." 
            />

            <div className="flex justify-end mt-4">
              <button className="bg-stone-800 hover:bg-stone-700 active:opacity-75 px-6 py-2.5 text-white rounded-md text-sm font-medium cursor-pointer transition-colors">
                Save Entry
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
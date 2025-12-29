import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50
                 h-16 bg-[#0b0b0b]
                 border-b border-white/20
                 flex items-center px-6"
    >
      {/* LEFT — LOGO TEXT ONLY */}
      <Link to="/feed" className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 tracking-tight hover:opacity-80 transition">
        confesso
      </Link>

      {/* CENTER — SEARCH WITH LOGO */}
      <div className="flex-1 flex justify-center px-6">
        <div className="relative w-full max-w-lg flex items-center">
          {/* Logo Icon inside search */}
          <div className="absolute left-3 w-8 h-8 rounded-lg overflow-hidden">
            <div className="absolute inset-0 hover:bg-white/20 transition from-orange-500 via-pink-500 to-purple-500"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
              </svg>
            </div>
          </div>
          
          <input
            type="text"
            placeholder="Find Anything"
            className="w-full pl-14 pr-4 py-2 text-center
                       rounded-full bg-black hover:bg-white/20 transition
                       border border-orange-500
                       text-sm text-white placeholder-slate-400
                       focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* RIGHT — ACTIONS */}
      <div className="flex items-center gap-4 text-white">

        {/* Create */}
        <Link
          to="/create"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full
                     bg-[#0b0b0b] text-sm font-semibold
                     hover:bg-white/20 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Create
        </Link>

        {/* Inbox */}
        <button className="w-8 h-8 rounded-full flex items-center justify-center
                          hover:bg-white/20 transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
        </button>

        {/* User */}
        <button
          className="w-8 h-8 rounded-full
                     bg-[#0b0b0b] flex items-center justify-center
                     hover:bg-white/20 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

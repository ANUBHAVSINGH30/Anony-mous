import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { usePost } from "../context/PostContext";

function Navbar() {
  const { user, signOut } = useAuth();
  const { showSuccess } = useToast();
  const { searchQuery, setSearchQuery } = usePost();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    showSuccess("Logged out successfully!");
    setShowProfileMenu(false);
    setTimeout(() => {
      navigate("/signin");
    }, 500);
  };

  const username = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Anonymous';
  const email = user?.email || '';
  const joinedDate = user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50
                 h-16 bg-[#0b0b0b]
                 border-b border-white/20
                 flex items-center px-3 sm:px-6"
    >
      {/* LEFT — LOGO TEXT ONLY */}
      <Link to="/feed" className="text-xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 tracking-tight hover:opacity-80 transition whitespace-nowrap">
        Anony-mous
      </Link>

      {/* CENTER — SEARCH WITH LOGO */}
      <div className="flex-1 flex justify-center px-2 sm:px-6">
        <div className="relative w-full max-w-lg flex items-center">
          {/* Logo Icon inside search - hide on very small screens */}
          <div className="hidden sm:block absolute left-3 w-8 h-8 rounded-lg overflow-hidden">
            <div className="absolute inset-0 hover:bg-white/20 transition from-orange-500 via-pink-500 to-purple-500"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
              </svg>
            </div>
          </div>
          
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (window.location.pathname !== '/feed') {
                navigate('/feed');
              }
            }}
            className="w-full pl-3 sm:pl-14 pr-3 sm:pr-4 py-2 text-left sm:text-center
                       rounded-full bg-black hover:bg-white/20 transition
                       border border-orange-500
                       text-xs sm:text-sm text-white placeholder-slate-400
                       focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* RIGHT — ACTIONS */}
      <div className="flex items-center gap-2 sm:gap-4 text-white">

        {/* Create - Hide text on mobile */}
        <Link
          to="/create"
          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-full
                     bg-[#0b0b0b] text-xs sm:text-sm font-semibold
                     hover:bg-white/20 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="hidden sm:inline">Create</span>
        </Link>

        {/* Inbox - Hide on small screens */}
        <button className="hidden sm:flex w-8 h-8 rounded-full items-center justify-center
                          hover:bg-white/20 transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
        </button>

        {/* User Profile */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full
                         bg-gradient-to-r from-orange-500/20 to-purple-500/20
                         hover:from-orange-500/30 hover:to-purple-500/30
                         border border-orange-500/30
                         text-sm font-semibold transition"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-purple-500 
                            flex items-center justify-center text-white font-bold text-xs">
                {username.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline">{username}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                stroke="currentColor" 
                className={`w-4 h-4 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <>
                {/* Backdrop to close menu */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowProfileMenu(false)}
                />
                
                <div className="absolute right-0 mt-2 w-72 bg-[#1a1a1a] rounded-xl 
                              border border-white/20 shadow-2xl overflow-hidden z-50">
                  {/* Profile Header */}
                  <div className="p-4 bg-gradient-to-r from-orange-500/10 to-purple-500/10 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-purple-500 
                                    flex items-center justify-center text-white font-bold text-lg">
                        {username.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white truncate">{username}</h3>
                        <p className="text-xs text-slate-400 truncate">{email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Profile Stats */}
                  <div className="p-4 border-b border-white/10">
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="bg-white/5 rounded-lg p-2">
                        <p className="text-xs text-slate-400">Member Since</p>
                        <p className="font-semibold text-white text-sm">{joinedDate}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2">
                        <p className="text-xs text-slate-400">Status</p>
                        <p className="font-semibold text-green-400 text-sm">Active</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate('/feed');
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg
                               text-slate-300 hover:bg-white/10 transition text-left"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                      </svg>
                      <span className="text-sm">My Feed</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate('/create');
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg
                               text-slate-300 hover:bg-white/10 transition text-left"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      <span className="text-sm">Create Post</span>
                    </button>
                  </div>

                  {/* Logout Button */}
                  <div className="p-2 border-t border-white/10">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg
                               text-red-400 hover:bg-red-500/10 transition text-left font-medium"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                      </svg>
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <Link
            to="/signin"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full
                       bg-[#0b0b0b] text-sm font-semibold
                       hover:bg-white/20 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

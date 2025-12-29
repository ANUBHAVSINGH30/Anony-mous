import React from "react";
import { Link } from "react-router-dom";
import { usePost } from "../context/PostContext";
import ConfessionCard from "../components/ConfessionCard";
import LeftSidebar from "../components/LeftSidebar";
import Navbar from "../components/Navbar";

function Feed() {
  const { getSortedPosts, sortBy, setSortBy } = usePost();
  const posts = getSortedPosts();

  return (
    <>
      {/* TOP NAVBAR */}
      <Navbar />

      {/* EVERYTHING BELOW NAVBAR */}
      <div className="pt-16 relative min-h-screen">

        {/* Background image */}
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/background.jpg')" }}
        />

        {/* Dark overlay */}
        <div className="fixed inset-0 -z-10 bg-black/70" />

        {/* Page content */}
        <div className="flex gap-2 min-h-screen text-white">
          
          {/* LEFT SIDEBAR */}
          <LeftSidebar />

          {/* FEED */}
          <main className="flex-1 py-10 pl-79 pr-6">
            {/* Sort Controls */}
            <div className="max-w-2xl mb-6 flex gap-3">
              <button
                onClick={() => setSortBy('new')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition active:scale-95 text-sm ${
                  sortBy === 'new'
                    ? 'bg-orange-500 text-white'
                    : 'border border-white/30 text-white hover:bg-white/10'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                New
              </button>
              <button
                onClick={() => setSortBy('popular')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition active:scale-95 text-sm ${
                  sortBy === 'popular'
                    ? 'bg-orange-500 text-white'
                    : 'border border-white/30 text-white hover:bg-white/10'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                Popular
              </button>
            </div>

            {/* Posts */}
            <div className="max-w-2xl space-y-4">
              {posts.map((post) => (
                <ConfessionCard key={post.id} post={post} />
              ))}
            </div>
          </main>

          {/* RIGHT SIDEBAR - Footer Links */}
          <aside className="hidden xl:flex flex-col w-72 fixed right-20 bottom-6">
            <div className="text-xs text-slate-400 space-y-2">
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                <a href="#" className="hover:text-white transition whitespace-nowrap">
                  Confesso Rules
                </a>
                <a href="#" className="hover:text-white transition whitespace-nowrap">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition whitespace-nowrap">
                  User Agreement
                </a>
                <a href="#" className="hover:text-white transition whitespace-nowrap">
                  Accessibility
                </a>
              </div>
              <p className="text-slate-400">
                Confesso, Inc. © 2025. All rights reserved.
              </p>
            </div>
          </aside>
        </div>

        {/* Floating Create Button */}
        {/* <Link
          to="/create"
          className="fixed bottom-6 right-6 z-50
                     w-14 h-14 rounded-full
                     bg-orange-500 text-white text-3xl
                     flex items-center justify-center
                     shadow-lg hover:bg-orange-600
                     hover:scale-110 active:scale-95
                     transition-all"
        >
          +
        </Link> */}
      </div>
    </>
  );
}

export default Feed;

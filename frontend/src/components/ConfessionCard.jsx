import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePost } from "../context/PostContext";

function ConfessionCard({ post }) {
  const { updateVote } = usePost();
  const [userVote, setUserVote] = useState(() => {
    const saved = localStorage.getItem(`vote_${post.id}`);
    return saved ? parseInt(saved) : 0; // 0: no vote, 1: upvote, -1: downvote
  });
  
  const [currentVotes, setCurrentVotes] = useState(post.votes);
  const [justVoted, setJustVoted] = useState(false);

  useEffect(() => {
    setCurrentVotes(post.votes);
  }, [post.votes]);

  const handleVote = (voteType) => {
    let newVote = 0;
    let voteDelta = 0;

    if (voteType === "up") {
      if (userVote === 1) {
        // Remove upvote
        newVote = 0;
        voteDelta = -1;
      } else if (userVote === -1) {
        // Switch from downvote to upvote
        newVote = 1;
        voteDelta = 2;
      } else {
        // Add upvote
        newVote = 1;
        voteDelta = 1;
      }
    } else if (voteType === "down") {
      if (userVote === -1) {
        // Remove downvote
        newVote = 0;
        voteDelta = 1;
      } else if (userVote === 1) {
        // Switch from upvote to downvote
        newVote = -1;
        voteDelta = -2;
      } else {
        // Add downvote
        newVote = -1;
        voteDelta = -1;
      }
    }

    const newVotes = currentVotes + voteDelta;
    setUserVote(newVote);
    setCurrentVotes(newVotes);
    localStorage.setItem(`vote_${post.id}`, newVote.toString());
    updateVote(post.id, newVotes);
    
    // Trigger animation
    setJustVoted(true);
    setTimeout(() => setJustVoted(false), 300);
  };

  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <Link
      to={`/post/${post.id}`}
      className="block relative bg-gradient-to-br from-gray-400 to-slate-70/70
                 backdrop-blur-md rounded-2xl
                 border border-white/40
                 shadow-lg hover:shadow-2xl hover:-translate-y-1
                 transition-all duration-300 p-6
                 overflow-hidden group cursor-pointer"
    >
      {/* Accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
      
      {/* Alias and Time */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium text-slate-600">
          {post.author}
        </p>
        <span className="text-xs text-slate-400">
          {getTimeAgo(post.timestamp)}
        </span>
      </div>

      {/* Title */}
      {post.title && (
        <h3 className="text-slate-900 text-lg font-semibold mb-2">
          {post.title}
        </h3>
      )}

      {/* Media (if exists) */}
      {post.mediaUrl && post.mediaType === "image" && (
        <div className="mb-4 rounded-xl overflow-hidden">
          <img
            src={post.mediaUrl}
            alt={post.title}
            className="w-full h-auto max-h-[400px] object-cover"
          />
        </div>
      )}

      {/* Confession text */}
      {post.text && (
        <p className="text-slate-800 text-base leading-relaxed mb-5 font-light">
          {post.text}
        </p>
      )}

      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-4" />

      {/* Bottom action bar */}
      <div className="flex items-center justify-between">
        {/* Left actions */}
        <div className="flex items-center gap-3">
          
          {/* Vote box */}
          <div
            onClick={(e) => e.preventDefault()}
            className={`flex items-center gap-2
                       px-4 py-2 rounded-full
                       bg-white border border-slate-200
                       text-slate-700 shadow-sm
                       transition-all duration-300
                       ${justVoted ? 'scale-110 shadow-md' : ''}`}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                handleVote("up");
              }}
              className={`transition-all duration-200 rounded-full p-1
                         active:scale-90 ${
                userVote === 1
                  ? 'text-orange-500 bg-orange-50'
                  : 'hover:text-orange-500 hover:bg-orange-50'
              }`}
            >
              ▲
            </button>

            <span className={`text-sm font-bold min-w-[20px] text-center transition-colors ${
              userVote === 1 ? 'text-orange-500' : userVote === -1 ? 'text-blue-500' : ''
            }`}>
              {currentVotes}
            </span>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleVote("down");
              }}
              className={`transition-all duration-200 rounded-full p-1
                         active:scale-90 ${
                userVote === -1
                  ? 'text-blue-500 bg-blue-50'
                  : 'hover:text-blue-500 hover:bg-blue-50'
              }`}
            >
              ▼
            </button>
          </div>

          {/* Comment box */}
          <div
            className="flex items-center gap-2
                       px-4 py-2 rounded-full
                       bg-white border border-slate-200
                       text-slate-700 text-sm shadow-sm
                       hover:shadow-md hover:border-slate-300
                       transition-all duration-200"
          >
            💬 <span className="font-medium">{post.comments?.length || 0}</span>
          </div>
        </div>

        {/* Share button */}
        <button 
          onClick={(e) => e.preventDefault()}
          className="text-slate-400 hover:text-slate-600 
                          transition-all duration-200
                          hover:scale-110 active:scale-95
                          opacity-0 group-hover:opacity-100">
          🔗
        </button>
      </div>
    </Link>
  );
}

export default ConfessionCard;

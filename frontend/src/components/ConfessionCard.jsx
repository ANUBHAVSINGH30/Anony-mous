import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePost } from "../context/PostContext";
import { getAnonymousUserId } from "../utils/anonymousUser";
import { supabase } from "../supabase";

function ConfessionCard({ post }) {
  const { updateVote } = usePost();
  const [userVote, setUserVote] = useState(0); // 0: no vote, 1: upvote, -1: downvote
  const [upvotes, setUpvotes] = useState(post.upvotes || 0);
  const [downvotes, setDownvotes] = useState(post.downvotes || 0);
  const [justVoted, setJustVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserVote();
  }, [post.id]);

  useEffect(() => {
    setUpvotes(post.upvotes || 0);
    setDownvotes(post.downvotes || 0);
  }, [post.upvotes, post.downvotes]);

  const checkUserVote = async () => {
    try {
      const userId = getAnonymousUserId();
      const { data } = await supabase
        .from('votes')
        .select('value')
        .eq('post_id', post.id)
        .eq('user_id', userId)
        .single();

      if (data) {
        setUserVote(data.value);
      }
    } catch (error) {
      // No vote found, which is fine
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (voteValue) => {
    // Prevent multiple clicks
    if (loading) return;

    const newVote = userVote === voteValue ? 0 : voteValue;
    
    // Optimistic update
    setUserVote(newVote);
    setJustVoted(true);
    setTimeout(() => setJustVoted(false), 300);

    // Update in database
    const result = await updateVote(post.id, newVote === 1 ? 1 : newVote === -1 ? -1 : 0);
    
    if (result) {
      setUpvotes(result.upvotes);
      setDownvotes(result.downvotes);
    }
  };

  const getTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const netVotes = upvotes - downvotes;

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
          {post.username || 'Anonymous'}
        </p>
        <span className="text-xs text-slate-400">
          {getTimeAgo(post.created_at)}
        </span>
      </div>

      {/* Title */}
      {post.title && (
        <h3 className="text-slate-900 text-lg font-semibold mb-2">
          {post.title}
        </h3>
      )}

      {/* Media (if exists) */}
      {post.media_url && post.type === "media" && (
        <div className="mb-4 rounded-xl overflow-hidden">
          <img
            src={post.media_url}
            alt={post.title}
            className="w-full h-auto max-h-[400px] object-cover"
          />
        </div>
      )}

      {/* Confession text */}
      {post.content && (
        <p className="text-slate-800 text-base leading-relaxed mb-5 font-light">
          {post.content}
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
                handleVote(1);
              }}
              disabled={loading}
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
              netVotes > 0 ? 'text-orange-500' : netVotes < 0 ? 'text-blue-500' : ''
            }`}>
              {netVotes}
            </span>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleVote(-1);
              }}
              disabled={loading}
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
            💬 <span className="font-medium">{post.comment_count || 0}</span>
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

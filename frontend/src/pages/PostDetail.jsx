import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { usePost } from "../context/PostContext";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPostById, updateVote, addComment } = usePost();
  const post = getPostById(id);

  const [userVote, setUserVote] = useState(() => {
    const saved = localStorage.getItem(`vote_${id}`);
    return saved ? parseInt(saved) : 0; // 0: no vote, 1: upvote, -1: downvote
  });

  const [currentVotes, setCurrentVotes] = useState(post?.votes || 0);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (post) {
      setCurrentVotes(post.votes);
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0b0b] text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Post not found</h1>
          <Link to="/feed" className="text-orange-500 hover:underline">
            ← Back to Feed
          </Link>
        </div>
      </div>
    );
  }

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
    localStorage.setItem(`vote_${id}`, newVote.toString());
    updateVote(post.id, newVotes);
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      addComment(post.id, commentText.trim());
      setCommentText("");
    }
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
    <>
      <Navbar />
      
      <div className="pt-16 relative min-h-screen">
        {/* Background */}
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/background.jpg')" }}
        />
        <div className="fixed inset-0 -z-10 bg-black/70" />

        <div className="flex min-h-screen text-white">
          <LeftSidebar />

          <main className="flex-1 py-10 pl-72 pr-6">
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Back Button */}
              <Link 
                to="/feed" 
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Back to Feed
              </Link>

              {/* Post Card */}
              <div className="relative bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80
                              backdrop-blur-xl rounded-3xl border border-white/30
                              shadow-[0_25px_60px_rgba(0,0,0,0.4)] overflow-hidden">
                
                {/* Gradient Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500" />

                <div className="flex gap-4 p-6">
                  {/* Vote Section */}
                  <div className="flex flex-col items-center gap-2 pt-2">
                    <button
                      onClick={() => handleVote("up")}
                      disabled={currentVotes >= 999}
                      className={`p-1.5 rounded-lg transition-all duration-200 ${
                        userVote === 1
                          ? "bg-orange-500 text-white"
                          : "hover:bg-white/10 text-slate-400 hover:text-orange-500"
                      } ${currentVotes >= 999 ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z" clipRule="evenodd" />
                      </svg>
                    </button>

                    <span className={`font-bold text-lg transition-colors ${
                      userVote === 1 ? "text-orange-500" : userVote === -1 ? "text-blue-500" : "text-white"
                    }`}>
                      {currentVotes}
                    </span>

                    <button
                      onClick={() => handleVote("down")}
                      className={`p-1.5 rounded-lg transition-all duration-200 ${
                        userVote === -1
                          ? "bg-blue-500 text-white"
                          : "hover:bg-white/10 text-slate-400 hover:text-blue-500"
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 text-sm text-slate-400">
                      <span className="font-medium">{post.author}</span>
                      <span>•</span>
                      <span>{getTimeAgo(post.timestamp)}</span>
                    </div>

                    <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

                    {/* Media (if exists) */}
                    {post.mediaUrl && post.mediaType === "image" && (
                      <div className="mb-4 rounded-xl overflow-hidden border border-white/20">
                        <img
                          src={post.mediaUrl}
                          alt={post.title}
                          className="w-full h-auto max-h-[600px] object-contain bg-black/20"
                        />
                      </div>
                    )}

                    {post.text && (
                      <p className="text-lg leading-relaxed text-slate-200">{post.text}</p>
                    )}

                    {/* Post Actions */}
                    <div className="flex gap-4 mt-6">
                      <button className="flex items-center gap-2 text-slate-400 hover:text-white transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                        </svg>
                        Share
                      </button>
                      <button className="flex items-center gap-2 text-slate-400 hover:text-white transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="relative bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80
                              backdrop-blur-xl rounded-3xl border border-white/30
                              shadow-[0_25px_60px_rgba(0,0,0,0.4)] p-6">
                
                <h2 className="text-xl font-bold mb-4">
                  Comments ({post.comments?.length || 0})
                </h2>

                {/* Add Comment */}
                <div className="mb-6">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="What are your thoughts?"
                    rows="4"
                    className="w-full p-4 rounded-xl border border-white/30
                               bg-white/5 text-white placeholder-slate-400
                               resize-none focus:outline-none
                               focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleAddComment}
                      disabled={!commentText.trim()}
                      className="px-6 py-2 rounded-full bg-orange-500 text-white font-semibold
                                 hover:bg-orange-600 transition active:scale-95
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Comment
                    </button>
                  </div>
                </div>

                {/* Comments List */}
                {!post.comments || post.comments.length === 0 ? (
                  <p className="text-center text-slate-400 py-8">
                    No comments yet. Be the first to comment!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="p-4 rounded-xl bg-white/5 border border-white/20">
                        <div className="flex items-center gap-3 mb-2 text-sm text-slate-400">
                          <span className="font-medium">{comment.author}</span>
                          <span>•</span>
                          <span>{getTimeAgo(comment.createdAt)}</span>
                        </div>
                        <p className="text-slate-200">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default PostDetail;

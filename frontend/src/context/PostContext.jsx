import React, { createContext, useContext, useState, useEffect } from 'react';

const PostContext = createContext();

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePost must be used within PostProvider');
  }
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem('confesso_posts');
    if (saved) {
      return JSON.parse(saved);
    }
    // Default posts
    return [
      {
        id: Date.now() + 1,
        title: "Backend Confession",
        text: "I pretend I understand backend but I don't.",
        type: "text",
        author: "Anonymous",
        timestamp: Date.now() - 7200000, // 2h ago
        votes: 42,
        comments: [],
      },
      {
        id: Date.now() + 2,
        title: "Coding at Night",
        text: "Late-night coding feels safer than daytime.",
        type: "text",
        author: "Anonymous",
        timestamp: Date.now() - 18000000, // 5h ago
        votes: 89,
        comments: [],
      },
    ];
  });

  const [sortBy, setSortBy] = useState('new'); // 'new' or 'popular'

  // Save to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem('confesso_posts', JSON.stringify(posts));
  }, [posts]);

  // Add a new post
  const addPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now(),
      timestamp: Date.now(),
      votes: 0,
      comments: [],
      author: localStorage.getItem('confesso_alias') || 'Anonymous',
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  // Get sorted posts
  const getSortedPosts = () => {
    if (sortBy === 'popular') {
      return [...posts].sort((a, b) => b.votes - a.votes);
    }
    // 'new' - sort by timestamp descending
    return [...posts].sort((a, b) => b.timestamp - a.timestamp);
  };

  // Update post votes
  const updateVote = (postId, newVotes) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, votes: newVotes } : post
      )
    );
  };

  // Get single post by ID
  const getPostById = (id) => {
    return posts.find((post) => post.id === parseInt(id));
  };

  // Add comment to a post
  const addComment = (postId, commentText) => {
    const newComment = {
      id: Date.now(),
      author: localStorage.getItem('confesso_alias') || 'Anonymous',
      text: commentText,
      createdAt: Date.now(),
    };

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        sortBy,
        setSortBy,
        addPost,
        getSortedPosts,
        updateVote,
        getPostById,
        addComment,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

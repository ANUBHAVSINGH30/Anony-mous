import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { getAnonymousUsername, getAnonymousUserId } from '../utils/anonymousUser';
import { useAuth } from './AuthContext';

const PostContext = createContext();

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePost must be used within PostProvider');
  }
  return context;
};

export const PostProvider = ({ children }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('new'); // 'new' or 'popular'
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize anonymous user on mount
  useEffect(() => {
    getAnonymousUsername(); // This will create username if doesn't exist
    getAnonymousUserId(); // This will create user ID if doesn't exist
  }, []);

  // Fetch posts from Supabase with comment counts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*, comments(count)')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        return;
      }

      // Transform data to include comment_count
      const postsWithCounts = (data || []).map(post => ({
        ...post,
        comment_count: post.comments?.[0]?.count || 0
      }));

      setPosts(postsWithCounts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Add a new post
  const addPost = async (post) => {
    try {
      // Use authenticated user's name or email
      const username = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Anonymous';
      
      const newPost = {
        title: post.title,
        content: post.text || '',
        type: post.type,
        media_url: post.mediaUrl || null,
        username: username,
        upvotes: 0,
        downvotes: 0,
      };

      const { data, error } = await supabase
        .from('posts')
        .insert([newPost])
        .select();

      if (error) {
        console.error('Error adding post:', error);
        alert('Failed to create post. Please try again.');
        return false;
      }

      // Add to local state
      if (data && data[0]) {
        setPosts((prev) => [data[0], ...prev]);
      }
      
      return true;
    } catch (error) {
      console.error('Error adding post:', error);
      alert('Failed to create post. Please try again.');
      return false;
    }
  };

  // Get sorted and filtered posts
  const getSortedPosts = () => {
    let filteredPosts = posts;
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredPosts = posts.filter(post => 
        post.title?.toLowerCase().includes(query) ||
        post.content?.toLowerCase().includes(query) ||
        post.username?.toLowerCase().includes(query)
      );
    }
    
    if (sortBy === 'popular') {
      return [...filteredPosts].sort((a, b) => {
        const aScore = (a.upvotes || 0) - (a.downvotes || 0);
        const bScore = (b.upvotes || 0) - (b.downvotes || 0);
        return bScore - aScore;
      });
    }
    // 'new' - sort by created_at descending
    return [...filteredPosts].sort((a, b) => 
      new Date(b.created_at) - new Date(a.created_at)
    );
  };

  // Update post votes
  const updateVote = async (postId, voteValue) => {
    try {
      const userId = getAnonymousUserId();
      
      // Check if user already voted
      const { data: existingVote } = await supabase
        .from('votes')
        .select('*')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .single();

      if (existingVote) {
        // Update existing vote
        if (existingVote.value === voteValue) {
          // Remove vote if clicking same button
          await supabase
            .from('votes')
            .delete()
            .eq('post_id', postId)
            .eq('user_id', userId);
        } else {
          // Change vote
          await supabase
            .from('votes')
            .update({ value: voteValue })
            .eq('post_id', postId)
            .eq('user_id', userId);
        }
      } else {
        // Insert new vote
        await supabase
          .from('votes')
          .insert([{
            post_id: postId,
            user_id: userId,
            value: voteValue
          }]);
      }

      // Recalculate votes
      const { data: allVotes } = await supabase
        .from('votes')
        .select('value')
        .eq('post_id', postId);

      const upvotes = allVotes?.filter(v => v.value === 1).length || 0;
      const downvotes = allVotes?.filter(v => v.value === -1).length || 0;

      // Update post
      await supabase
        .from('posts')
        .update({ upvotes, downvotes })
        .eq('id', postId);

      // Update local state
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, upvotes, downvotes } : post
        )
      );

      return { upvotes, downvotes };
    } catch (error) {
      console.error('Error updating vote:', error);
    }
  };

  // Get single post by ID
  const getPostById = async (id) => {
    // First check local state
    const localPost = posts.find((post) => post.id === id);
    if (localPost) return localPost;

    // If not in local state, fetch from Supabase
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching post:', error);
      return null;
    }
  };

  // Fetch comments for a post
  const fetchComments = async (postId) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching comments:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  };

  // Add comment to a post
  const addComment = async (postId, commentText) => {
    try {
      // Use authenticated user's name or email
      const username = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Anonymous';
      
      const newComment = {
        post_id: postId,
        text: commentText,
        username: username,
      };

      const { data, error } = await supabase
        .from('comments')
        .insert([newComment])
        .select();

      if (error) {
        console.error('Error adding comment:', error);
        return null;
      }

      // Refresh posts to update comment count
      await fetchPosts();

      return data[0];
    } catch (error) {
      console.error('Error adding comment:', error);
      return null;
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        sortBy,
        setSortBy,
        loading,
        addPost,
        getSortedPosts,
        updateVote,
        getPostById,
        addComment,
        fetchComments,
        fetchPosts,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

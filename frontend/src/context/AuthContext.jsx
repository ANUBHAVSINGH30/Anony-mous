import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password, name) => {
    try {
      // Check if user already exists
      const { data: existingUser } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // If login succeeds, user already exists
      if (existingUser?.user) {
        await supabase.auth.signOut(); // Sign out the test login
        return { 
          data: null, 
          error: { message: 'An account with this email already exists. Please sign in instead.' } 
        };
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          }
        }
      });

      if (error) throw error;

      // Check if user already exists (Supabase returns success but user is null for existing emails)
      if (data?.user === null && !error) {
        return { 
          data: null, 
          error: { message: 'An account with this email already exists. Please sign in instead.' } 
        };
      }

      return { data, error: null };
    } catch (error) {
      // If the test login failed, proceed with signup
      if (error.message?.includes('Invalid login credentials')) {
        try {
          const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                name: name,
              }
            }
          });

          if (signUpError) throw signUpError;

          // Check if user already exists
          if (data?.user === null && !signUpError) {
            return { 
              data: null, 
              error: { message: 'An account with this email already exists. Please sign in instead.' } 
            };
          }

          return { data, error: null };
        } catch (signUpError) {
          return { data: null, error: signUpError };
        }
      }
      return { data: null, error };
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

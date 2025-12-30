// Generate and manage anonymous usernames
const STORAGE_KEY = "anon_username";
const USER_ID_KEY = "anon_user_id";

export const getAnonymousUsername = () => {
  // Check if username already exists
  let username = localStorage.getItem(STORAGE_KEY);
  
  if (!username) {
    // Generate new random username
    const randomId = Math.random().toString(36).slice(2, 8);
    username = `anon_${randomId}`;
    localStorage.setItem(STORAGE_KEY, username);
  }
  
  return username;
};

export const getAnonymousUserId = () => {
  // Check if user ID already exists
  let userId = localStorage.getItem(USER_ID_KEY);
  
  if (!userId) {
    // Generate new random user ID
    userId = crypto.randomUUID();
    localStorage.setItem(USER_ID_KEY, userId);
  }
  
  return userId;
};

export const clearAnonymousUser = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(USER_ID_KEY);
};

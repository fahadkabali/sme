// utilities/auth.js
import { auth } from './firebase';

// Register
export const register = async (email, password) => {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    // Handle success
  } catch (error) {
    // Handle error
  }
};

// Login
export const login = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    // Handle success
  } catch (error) {
    // Handle error
  }
};

// Logout
export const logout = async () => {
  try {
    await auth.signOut();
    // Handle success
  } catch (error) {
    // Handle error
  }
};

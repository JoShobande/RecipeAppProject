import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

const AuthContext = createContext(null);

// Helper function to create a Firestore user document if it doesn't exist.
const createUserDocument = async (user, additionalData = {}) => {
  if (!user) return;
  const userRef = doc(db, 'users', user.uid);
  const snapShot = await getDoc(userRef);
  if (!snapShot.exists()) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        email,
        photoURL,
        followers: [],
        ...additionalData,
        createdAt,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return userRef;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  // Updated signUp accepts a displayName parameter.
  const signUp = async (email, password, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }
    // Create a Firestore user document
    await createUserDocument(userCredential.user);
    // Optionally, sign the user out after sign-up if desired.
    await signOut(auth);
    return userCredential;
  };

  const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

// src/context/AuthContext.js
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
    const { email, photoURL } = user;
    const createdAt = new Date();
    const firstName = additionalData.firstName || '';
    const lastName = additionalData.lastName || '';
    const displayName = `${firstName} ${lastName}`.trim();
    try {
      await setDoc(userRef, {
        displayName,
        firstName,
        lastName,
        email,
        bio: '',
        followers: [],
        following: [],
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

  // Updated signUp now accepts firstName and lastName.
  const signUp = async (email, password, firstName, lastName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const fullName = `${firstName} ${lastName}`;
    await updateProfile(userCredential.user, { displayName: fullName });
    // Create a Firestore user document with firstName and lastName.
    await createUserDocument(userCredential.user, { firstName, lastName });
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

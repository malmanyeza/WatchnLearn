import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const UserDataContext = React.createContext();

export const UserDataProvider = ({ children }) => {
 
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    surname: '',
    phone: '',
    email: '',
    school: ''
  });
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setIsLoggedIn(!!authUser);
    });

    return () => unsubscribe();
  }, []);

  const signUpWithEmailAndPassword = async (email, password) => {
    try {
      setLoadingUser(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Assuming userDetails is an object with properties like firstName, Surname, Phone, email, and School
      const { firstName, surname, phone, school } = userDetails;

      // Add user details to Firestore in the "students" collection
      await firestore.collection('students').add({
        firstName,
        surname,
        phone,
        email,
        school,
        userId: userCredential.user.uid, // Optionally, you can store the user's ID for future reference
      });

      setUser(userCredential.user);
      setIsLoggedIn(true);
      setLoadingUser(false);
    } catch (error) {
      console.error('Error signing up:', error.message);
      throw error;
    }
  };


  const signInWithEmailAndPassword = async (email, password) => {
    try {
      setLoadingUser(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setIsLoggedIn(true);
      setLoadingUser(false);
    } catch (error) {
      console.error('Error signing in:', error.message);
      throw error;
    }
  };

  const value = {
    user,
    isLoggedIn,
    signUpWithEmailAndPassword,
    signInWithEmailAndPassword,
    loadingUser,
    userDetails,
    setUserDetails
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserDataContext = () => {
  return React.useContext(UserDataContext);
};

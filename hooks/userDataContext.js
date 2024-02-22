import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { addDoc, collection, getDocs, where, query } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'react-native-reanimated';

const UserDataContext = React.createContext();

export const UserDataProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    school: '',
    password: '',
  });
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);



//Load user information
  useEffect(() => {
    setLoadingUser(true)
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);
      setIsLoggedIn(!!authUser);

      if (authUser) {
        // User is logged in, try to get user data from AsyncStorage
        try {
          const userData = await AsyncStorage.getItem('userData');
          if (userData) {
            setUserDetails(JSON.parse(userData));
            setLoadingUser(false)
          } else {
            // If userData is not in AsyncStorage, fetch it from Firestore and store in AsyncStorage
            try {
              const q = query(collection(db, 'students'), where('userId', '==', authUser.uid));
              const querySnapshot = await getDocs(q);
              if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0].data();
                setUserDetails(userDoc);
                await AsyncStorage.setItem('userData', JSON.stringify(userDoc));
              }
              setLoadingUser(false)
              setIsLoggedIn(true)
            } catch (firestoreError) {
              setLoadingUser(false)
              // Handle Firestore error
              console.error('Error fetching user data from Firestore:', firestoreError.message);
            }
          }
        } catch (asyncStorageError) {
          setLoadingUser(false)
          // Handle AsyncStorage error
          console.error('Error fetching user data from AsyncStorage:', asyncStorageError.message);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const signUpWithEmailAndPassword = async () => {
    try {
      setLoadingUser(true);
      const userCredential = await createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password);

      const { firstName, lastName, phone, school, email } = userDetails;

      try {
        const docRef = await addDoc(collection(db, 'students'), {
          firstName,
          lastName,
          phone,
          email,
          school,
          userId: userCredential.user.uid,
        });

        console.log('User details added with ID:', docRef.id);
        await AsyncStorage.setItem('userData', JSON.stringify(userDetails));
      } catch (firestoreError) {
        throw new Error(`Error adding user details to Firestore: ${firestoreError.message}`);
      }

      setUser(userCredential.user);

      try {
        await signInWithEmailAndPassword(auth, userDetails.email, userDetails.password);
      } catch (signInError) {
        throw new Error(`Error signing in user: ${signInError.message}`);
      }

      setIsLoggedIn(true);
      setLoadingUser(false);
    } catch (error) {
      alert(error.message);
      setLoadingUser(false);
    }
  };

  const signInWithBothEmailAndPassword = async () => {
    try {
      setLoadingUser(true);
      await signInWithEmailAndPassword(auth, userDetails.email, userDetails.password);
      setIsLoggedIn(true);
      setLoadingUser(false);
    } catch (error) {
      alert(error.message);
      setLoadingUser(false);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const value = {
    user,
    isLoggedIn,
    signUpWithEmailAndPassword,
    signInWithBothEmailAndPassword,
    loadingUser,
    userDetails,
    setUserDetails,
    logout,
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

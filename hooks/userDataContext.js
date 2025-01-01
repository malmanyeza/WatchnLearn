import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db, storage } from '../FirebaseConfig';
import { addDoc, collection, getDocs, where, query, doc, updateDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserDataContext = React.createContext();

export const UserDataProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    school: '',
    password: '',
    userId: ''
  });
  const [user, setUser] = useState(null);
  const [notificationBadge, setNotificationBadge] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [levelState, setLevelState] = useState('');
  const [loginInOn, setLoginInOn] = useState(false);
  const [loadingCompletedWorkDone, setLoadingCompletedWorkDone] = useState(false);
  const [InLoggingOutProcess, setInLoggingOutProcess] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      name: 'AI Tutor',
      message: 'Your assisssnment is due tomorrow! This is the message to increase the lenght of the message to see what the notification item would look like if the message text is very logn.',
      time: '2 hrs',
      seen: false,
      unattended: true, // Unseen and unattended
    },
    {
      id: '2',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      name: 'AI Tutor',
      message: 'Don\'t forget to review your notes.',
      time: '1 day',
      seen: true,
      unattended: false, // Seen and attended
    },
    {
      id: '3',
      avatar: 'https://randomuser.me/api/portraits/women/46.jpg',
      name: 'AI Tutor',
      message: 'There is a new update available.',
      time: '3 days',
      seen: false,
      unattended: false, // Unseen and attended
    },
    {
      id: '4',
      avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
      name: 'AI Tutor',
      message: 'Your class starts in 30 minutes.',
      time: '5 mins',
      seen: true,
      unattended: true, // Seen but unattended
    },
    {
      id: '5',
      avatar: 'https://randomuser.me/api/portraits/women/47.jpg',
      name: 'AI Tutor',
      message: 'Your assignment has been graded.',
      time: '2 days',
      seen: true,
      unattended: false, // Seen and attended
    }
  ]);

  // Load user information
  useEffect(() => {
    setLoadingUser(true);
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);
      setIsLoggedIn(!!authUser);
      console.log('Here is the authUser', authUser);

      if (authUser) {
        // User is logged in, try to get user data from AsyncStorage
        try {
          const userData = await AsyncStorage.getItem('userData');
          if (userData) {
            const parsedUserData = JSON.parse(userData);
            setUserDetails(parsedUserData);
            setLevelState(parsedUserData.level);
            setLoadingUser(false);
            setIsLoggedIn(true);
            console.log('User data fetched from AsyncStorage:', parsedUserData);
          } else {
            // If userData is not in AsyncStorage, fetch it from Firestore and store in AsyncStorage
            const q = query(collection(db, 'students'), where('userId', '==', authUser.uid));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
              const userDoc = querySnapshot.docs[0].data();
              setUserDetails(userDoc);
              setLevelState(userDoc.level);
              await AsyncStorage.setItem('userData', JSON.stringify(userDoc));
            }
            setLoadingUser(false);
            setIsLoggedIn(true);
          }
        } catch (error) {
          setLoadingUser(false);
          console.error('Error fetching user data:', error.message);
        }
      } else {
        setLoadingUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signUpWithEmailAndPassword = async () => {
    try {
      setLoadingUser(true);
      const userCredential = await createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password);
      const { firstName, lastName, phone, school, email, level } = userDetails;

      let userDocRef; // Define user document reference

      setUserDetails({...userDetails, userId:userCredential.user.uid})

      
        try {
          // Add user details to Firestore emulator
          userDocRef = await addDoc(collection(db, 'students'), {
            firstName,
            lastName,
            phone,
            email,
            school,
            userId: userCredential.user.uid,
            level
          });
          console.log('User details added with ID:', userDocRef.id);
        } catch (firestoreError) {
          throw new Error(`Error adding user details to Firestore: ${firestoreError.message}`);
        }
      

      setUser(userCredential.user);
      await signInWithBothEmailAndPassword();
      setIsLoggedIn(true);
      setLoadingUser(false);
    } catch (error) {
      alert(error.message);
      setLoadingUser(false);
    }
  };

  const signInWithBothEmailAndPassword = async () => {
    try {
      console.log('Starting sign-in process');
      setLoadingUser(true);
  
      await signInWithEmailAndPassword(auth, userDetails.email, userDetails.password);
      console.log('User signed in successfully');
      
      setIsLoggedIn(true);
      setLoadingUser(false);
  
      // Fetch userDetails from AsyncStorage or Firestore after successful sign-in
      
        console.log('No data in AsyncStorage, fetching from Firestore');
        const q = query(collection(db, 'students'), where('userId', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0].data();
          setUserDetails(userDoc);
          setLevelState(userDoc.level);
          await AsyncStorage.setItem('userData', JSON.stringify(userDoc));
          console.log('User data fetched from Firestore and saved to AsyncStorage:', userDoc);
        
        setLoginInOn(false);
      }
    } catch (error) {
      console.error('Error during sign-in process:', error);
      setLoginInOn(false);
      setLoadingUser(false);
  
      // Display user-friendly error messages
      let errorMessage = 'An unknown error occurred. Please try again later.';
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'The email address you entered is not valid. Please check and try again.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled. Please contact support for help.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address. Please sign up first.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again or reset your password.';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'There was a problem with your credentials. Please try again.';
          break;
        // Add more cases as needed
      }
      
      alert(errorMessage);
    }
  };
  
  

  const logout = async () => {
    try {
      setInLoggingOutProcess(true);
      setIsLoggedIn(false);
      setUser(null);
      setUserDetails({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        school: '',
        password: '',
        level: ''
      });
      await signOut(auth);
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('myAsyncStorageCourses');
      await AsyncStorage.removeItem('myAsyncStorageClasses');
      const asyncStorageKey = userDetails.levelState === 'Tertiary' ? 'completedWorkTertiary' : 'completedWorkNonTertiary';
      await AsyncStorage.removeItem(asyncStorageKey);
      setInLoggingOutProcess(false);
    } catch (error) {
      setInLoggingOutProcess(false);
      console.error('Error logging out:', error.message);
    }
  };


  const resetNotifications = async () => {
  
    try {
      // Get the reference to the student's document
      const studentRef = doc(db, "students", userDetails.userId);
      
      // Update the notifications locally
      setNotifications((prevNotifications) => {
        const updatedNotifications = prevNotifications.map((notification) => ({
          ...notification,
          seen: true,
        }));
  
        // Update the notifications in Firebase
        updateDoc(studentRef, { notifications: updatedNotifications });
  
        return updatedNotifications;
      });
    } catch (error) {
      console.error("Error resetting notifications:", error);
      // You can also show an alert or a toast to the user if needed
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
    levelState,
    loginInOn,
    InLoggingOutProcess,
    setInLoggingOutProcess,
    notifications,
    resetNotifications,
    notificationBadge,
    setNotificationBadge,
    loadingCompletedWorkDone,
    setLoadingCompletedWorkDone
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

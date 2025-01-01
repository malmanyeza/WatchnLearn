import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, query, where, getDocs, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db} from '../FirebaseConfig';
import { useUserDataContext } from './userDataContext';
import { useAllSubjectsContext } from './allSubjectsContext';

const CompletedWorkContext = React.createContext();

export const CompletedWorkProvider = ({ children }) => {
  const [completedWork, setCompletedWork] = useState([]);
  const { userDetails, levelState, InLoggingOutProcess } = useUserDataContext();
  const { myContentState } = useAllSubjectsContext();
  const currentTerm = levelState === 'Tertiary' ? null : myContentState.currentTerm;
  ;
  const [streakInfo, setStreakInfo] = useState({ streakNo: 0, lastActionTime: null });

  const asyncStorageKey = levelState === 'Tertiary' ? 'completedWorkTertiary' : 'completedWorkNonTertiary';

  useEffect(() => {
    const loadCompletedWork = async () => {
      try {
        const completedWorkJson = await AsyncStorage.getItem(asyncStorageKey);
        const completedWorkLocal = completedWorkJson ? JSON.parse(completedWorkJson) : [];
        setCompletedWork(completedWorkLocal);
  
        if (completedWorkLocal.length > 0 && completedWorkLocal[0].items) {
          console.log('Here is the completed work:', completedWorkLocal[0].items);
        } else {
          console.log('No completed work items found in AsyncStorage');
        }
  
        console.log('Completed work loaded from AsyncStorage');
        return completedWorkLocal;  // Return local work for further processing
      } catch (error) {
        console.error('Error loading completed work from AsyncStorage:', error);
        return null;
      }
    };
  
    if (userDetails.userId && levelState) {
      loadCompletedWork()
    }
  }, [userDetails.userId, levelState]);

  useEffect(()=>{
    if(InLoggingOutProcess){
      syncCompletedWork();
    }
  })

  const syncCompletedWork = async () => {

    const userId = userDetails.userId;
    const completedWorkLocal = completedWork;

    if (!completedWorkLocal) return;  // Exit if loading failed

    try {
      console.log('Starting syncCompletedWork function for userId:', userId);

      const q = query(collection(db, 'students'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        console.log('Found student document(s) in Firebase for userId:', userId);

        const studentDoc = querySnapshot.docs[0]; // Assuming userId is unique, take the first matching document
        const studentData = studentDoc.data();
        const completedWorkRemote = studentData.completedWork || [];

        console.log('Fetched completedWork from Firebase:', completedWorkRemote);

        const localWorkMap = new Map();
        completedWorkLocal.forEach(subject => {
          localWorkMap.set(subject.name, subject.items);
        });

        const remoteWorkMap = new Map();
        completedWorkRemote.forEach(subject => {
          remoteWorkMap.set(subject.name, subject.items);
        });

        console.log('Local work map:', Array.from(localWorkMap.entries()));
        console.log('Remote work map:', Array.from(remoteWorkMap.entries()));

        if (localWorkMap.size === 0) {
          console.log('Local work map is empty. Updating AsyncStorage with remote work map.');
          await AsyncStorage.setItem(asyncStorageKey, JSON.stringify(completedWorkRemote));
          setCompletedWork(completedWorkRemote);
          console.log('Completed work updated in AsyncStorage and state set to remote work map.');
        } else {
          let isSynced = true;

          const deepEqual = (obj1, obj2) => {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
          };

          localWorkMap.forEach((localItems, subjectName) => {
            const remoteItems = remoteWorkMap.get(subjectName) || [];
            localItems.forEach(localItem => {
              const found = remoteItems.some(remoteItem => deepEqual(remoteItem.contentUrl, localItem.contentUrl));
              
              if (!found) {
                console.log(`New item found for subject ${subjectName}:`, localItem);
                
                isSynced = false;
                const remoteSubject = completedWorkRemote.find(subject => subject.name === subjectName);
                if (remoteSubject) {
                  remoteSubject.items.push(localItem);
                  console.log(`Added new item to existing subject ${subjectName} in remote data`);
                } else {
                  completedWorkRemote.push({ name: subjectName, items: [localItem] });
                  console.log(`Created new subject ${subjectName} with new item in remote data`);
                }
              }
            });
          });

          if (!isSynced) {
            await updateDoc(studentDoc.ref, { completedWork: completedWorkRemote });
            console.log('Completed work synchronized with Firebase successfully');
          } else {
            console.log('Completed work is already in sync with Firebase');
          }
        }
      } else {
        console.error('Student document not found in Firebase for userId:', userId);
      }
    } catch (error) {
      console.error('Error synchronizing completed work:', error);
    }
  };
  

  const updateCompletedWork = async (currentSubject, contentUrl, contentType, duration, chapterName, percentageMark) => {
    console.log('Here is the duration and contentType', duration, contentType);
  
    const validateData = (data) => {
      Object.entries(data).forEach(([key, value]) => {
        if (value === undefined) {
          console.warn(`Warning: Field "${key}" is undefined in`, data);
        }
      });
    };
  
    const updateCompletedWorkInAsyncStorage = async () => {
      try {
        const completedWorkJson = await AsyncStorage.getItem(asyncStorageKey);
        let completedWorkLocal = completedWorkJson ? JSON.parse(completedWorkJson) : [];
  
        const subjectIndex = completedWorkLocal.findIndex(work => work.name === currentSubject);
        if (subjectIndex !== -1) {
          const contentIndex = completedWorkLocal[subjectIndex].items.findIndex(item => item.contentUrl === contentUrl);
          if (contentIndex === -1) {
            const newItem = { 
              contentUrl, 
              contentType, 
              duration, 
              chapterName, 
              timestamp: new Date().toISOString() // Local timestamp
            };
            if (percentageMark) newItem.percentageMark = percentageMark;
            if (levelState !== 'Tertiary') newItem.termId = currentTerm;
  
            validateData(newItem); // Validate newItem
            console.log('New item for AsyncStorage:', newItem);
  
            completedWorkLocal[subjectIndex].items.push(newItem);
          }
        } else {
          const newItem = { 
            contentUrl, 
            contentType, 
            duration, 
            chapterName, 
            timestamp: new Date().toISOString() // Local timestamp
          };
          if (percentageMark) newItem.percentageMark = percentageMark;
          if (levelState !== 'Tertiary') newItem.termId = currentTerm;
  
          validateData(newItem); // Validate newItem
          console.log('New item for new subject in AsyncStorage:', newItem);
  
          completedWorkLocal.push({
            name: currentSubject,
            items: [newItem],
          });
        }
  
        await AsyncStorage.setItem(asyncStorageKey, JSON.stringify(completedWorkLocal));
        setCompletedWork(completedWorkLocal);
        console.log('Completed work updated and stored in AsyncStorage successfully');
      } catch (error) {
        console.error('Error updating completed work in AsyncStorage:', error);
      }
    };
  
    const updateCompletedWorkInFirebase = async () => {
      try {
        console.log('Here is the userId when trying to updateCompletedWorkInFirebase:', userDetails.userId);
        const q = query(collection(db, 'students'), where('userId', '==', userDetails.userId));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
          const studentDoc = querySnapshot.docs[0]; // Assuming userId is unique, take the first matching document
          const studentData = studentDoc.data();
          const completedWorkRemote = studentData.completedWork || [];
    
          const subjectIndex = completedWorkRemote.findIndex(work => work.name === currentSubject);
    
          // Fetch the server timestamp first
          const serverTimestampValue = new Date().toISOString();
    
          const newItem = {
            contentUrl,
            contentType,
            duration,
            chapterName,
            termId: levelState !== 'Tertiary' ? currentTerm : undefined,
            timestamp: serverTimestampValue, // Use the server timestamp value
            percentageMark: percentageMark || undefined,
          };
    
          if (subjectIndex !== -1) {
            // Find the existing exercise in the subject
            const contentIndex = completedWorkRemote[subjectIndex].items.findIndex(item => item.contentUrl === contentUrl);
            if (contentIndex !== -1) {
              // Update the existing item
              completedWorkRemote[subjectIndex].items[contentIndex] = newItem;
              console.log('Exercise updated in Firebase:', newItem);
            } else {
              // Add a new item
              completedWorkRemote[subjectIndex].items.push(newItem);
              console.log('New exercise added in Firebase:', newItem);
            }
          } else {
            // Create a new subject with the new exercise
            completedWorkRemote.push({
              name: currentSubject,
              items: [newItem],
            });
            console.log('New subject and exercise added in Firebase:', newItem);
          }
    
          console.log('Final completedWorkRemote before upload:', completedWorkRemote);
          await updateDoc(studentDoc.ref, { completedWork: completedWorkRemote });
          console.log('Completed work updated and stored in Firebase successfully');
        } else {
          console.error('Student document not found in Firebase');
        }
      } catch (error) {
        console.error('Error updating completed work in Firebase:', error);
      }
    };
    
    
    await updateCompletedWorkInAsyncStorage();
    await updateStreakInfo();
  
    try {
      await updateCompletedWorkInFirebase();
    } catch (error) {
      console.error('Error updating completed work in Firebase:', error);
    }
  };
  
  
  
  



  useEffect(() => {
    const fetchStreakInfo = async () => {
        try {
            const streakInfoJson = await AsyncStorage.getItem('streakInfo');
            let streakInfo = streakInfoJson ? JSON.parse(streakInfoJson) : { streakNo: 0, lastActionTime: null };

            const currentTime = new Date();

            if (streakInfo.lastActionTime) {
                const lastActionTime = new Date(streakInfo.lastActionTime);
                const timeDifference = currentTime - lastActionTime;
                const differenceInDays = timeDifference / (1000 * 3600 * 24);

                if (differenceInDays >= 2) {
                    // Reset streak if the difference is more than 2 days
                    streakInfo.streakNo = 0;
                    streakInfo.lastActionTime = currentTime.toISOString();
                    console.log('Streak reset due to inactivity for more than 2 days');
                }
            } else {
                // No last action time found, start a new streak
                streakInfo.streakNo = 1;
                streakInfo.lastActionTime = currentTime.toISOString();
            }

            // Update the state and save streak info back to AsyncStorage
            setStreakInfo(streakInfo);
            await AsyncStorage.setItem('streakInfo', JSON.stringify(streakInfo));

        } catch (error) {
            console.error('Error fetching streak info:', error);
            setStreakInfo({ streakNo: 0, lastActionTime: null });
        }
    };

    fetchStreakInfo();
}, []);

  


  const updateStreakInfo = async () => {
      try {
          const streakInfoJson = await AsyncStorage.getItem('streakInfo');
          let streakInfo = streakInfoJson ? JSON.parse(streakInfoJson) : { streakNo: 0, lastActionTime: null };
  
          const currentTime = new Date();
          let resetStreak = false;
  
          if (streakInfo.lastActionTime) {
              const lastActionTime = new Date(streakInfo.lastActionTime);
  
              // Get the calendar days for both current and last action times
              const currentDay = currentTime.toDateString();
              const lastActionDay = lastActionTime.toDateString();
  
              console.log('Current Day:', currentDay);
              console.log('Last Action Day:', lastActionDay);
  
              if (currentDay !== lastActionDay) {
                  // User performed action on a new calendar day, increment streak
                  streakInfo.streakNo += 1;
  
                  // Check if the streak should be reset (missed a day)
                  const differenceInDays = (currentTime - lastActionTime) / (1000 * 3600 * 24);
                  if (differenceInDays >= 2) {
                      streakInfo.streakNo = 1; // Or 0 depending on your logic
                      resetStreak = true;
                  }
              }else if(currentDay === lastActionDay&&streakInfo.streakNo===0){
                streakInfo.streakNo += 1;
              }


          } else {
              // No last action time found, start a new streak
              streakInfo.streakNo = 1;
          }
  
          // Update the last action time to current time
          streakInfo.lastActionTime = currentTime.toISOString();
  
          setStreakInfo(streakInfo);
          await AsyncStorage.setItem('streakInfo', JSON.stringify(streakInfo));
  
          if (resetStreak) {
              console.log('Streak reset due to missing a day');
          } else {
              console.log('Streak updated. Current streak:', streakInfo.streakNo);
          }
      } catch (error) {
          console.error('Error updating streak info:', error);
      }
  };
  

  

  return (
    <CompletedWorkContext.Provider value={{ completedWork, updateCompletedWork, streakInfo }}>
      {children}
    </CompletedWorkContext.Provider>
  );
};

export const useCompletedWorkContext = () => {
  return React.useContext(CompletedWorkContext);
};

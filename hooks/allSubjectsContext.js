import React, { useState, useEffect, useMemo, createContext } from 'react';
import { collection, getDocs, getFirestore, getDoc, setDoc, doc, deleteDoc } from 'firebase/firestore';
import app from '../firebase'; // Make sure to import your firebase configuration
import { auth } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';

// Create a new context
const AllSubjectsContext = createContext();

export const AllSubjectsProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false)
  const [myClasses, setMyClasses] = useState([]);
  const [loadingMyClasses, setLoadingMyClasses] = useState(false);
  const [enrollingInProcess, setEnrollingInProcess] = useState(false);
  const [moveToMyClasses, setMoveToMyClasses] = useState(false);
  const [myCurrentChapters, setMyCurrentChapters] = useState([]);
  const [myContentState, setMyContentState] = useState({
    currentChapter: null,
    currentContent: null,
    currentTerm: null,
    currentSubject: null,
    currentContentUrl:null
  })



  // Fetch subjects from AsyncStorage or Firestore if not found in AsyncStorage then store in state

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoadingSubjects(true)
      const db = getFirestore(app);
      const subjectsCollection = collection(db, 'subjects');

      try {
        const snapshot = await getDocs(subjectsCollection);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSubjects(data);
        setFilteredSubjects(data);
        
        
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    fetchSubjects();
    console.log(filteredSubjects.length)
  }, []);

  useEffect(() => {
    filteredSubjects.length >0?setLoadingSubjects(false):null
  }, [filteredSubjects]);

  useEffect(() => {
    myClasses.length >0?setLoadingMyClasses(false):null 
  }, [myClasses]);




  // Load myClasses from AsyncStorage or Firestore if not found in AsyncStorage

  useEffect(() => {
    const loadMyClasses = async () => {
      try {
        setLoadingMyClasses(true);
        
        // Check if there are classes stored in AsyncStorage
        const existingClassesJson = await AsyncStorage.getItem('myAsyncStorageClasses');
        if (existingClassesJson) {
          const existingClasses = JSON.parse(existingClassesJson);
          console.log('existingClasses', existingClasses)
          setMyClasses(existingClasses);

          console.log('using data from async storage')
          setLoadingMyClasses(false);
          return;
        }
        
        // If AsyncStorage is empty, fetch classes from Firestore
        const db = getFirestore(app);
        const user = auth.currentUser;
        if (!user) {
          setLoadingMyClasses(false);
          return;
        }
  
        const userDocRef = doc(db, 'students', user.uid);
        const myClassesCollectionRef = collection(userDocRef, 'myclasses');
  
        const myClassesSnapshot = await getDocs(myClassesCollectionRef);
        // If the myclasses collection doesn't exist, return without setting myClasses
        if (myClassesSnapshot.empty) {
          console.log('No myclasses found');
          setLoadingMyClasses(false);
          return;
        }
  
        const myClassesData = myClassesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
  
        setMyClasses(myClassesData);
        setLoadingMyClasses(false);
      } catch (error) {
        setLoadingMyClasses(false);
        console.error('Error loading myClasses:', error);
        if (
          error.message.includes('Could not reach Cloud Firestore backend') ||
          error.message.includes('Failed to get documents from a collection')
        ) {
          // Retry loading myClasses after a short delay
          setTimeout(loadMyClasses, 3000); // Retry after 3 seconds
        }
      }
    };
  
    loadMyClasses();
  }, []);


const maClasses = [{
  name: '',
  id:'',
  terms:[
    {
      id:'',
      name:'',
      chapters:[
        {
          id:'',
          name:'',
          data:[
            {
              id:'',
              contentType:'',
              name:'',
              contentUrl:''
            }
          ]
        }
      ]
    }
  ]
}]



  // Update the isEnrolled property of filteredSubjects when myClasses changes

useEffect(() => { 
  setFilteredSubjects(prevFilteredSubjects => {
    return prevFilteredSubjects.map(subject => {
      const isEnrolled = myClasses.some(myClass => myClass.subjectId === subject.subjectId);
      return { ...subject, isEnrolled };
    });
  });
}, [myClasses, subjects]);  
  




  // Enroll in a subject and store the enrolled subject in Firestore and AsyncStorage

  const enroll = async (subjectId, subjectName, subjectImageUrl) => {
    try {
      setEnrollingInProcess(true);
      const db = getFirestore(app);
      const user = auth.currentUser;
      const userDocRef = doc(db, 'students', user.uid);
      const myClassesCollectionRef = collection(userDocRef, 'myclasses');

      // Download and save the subject image to the file system
      const imagePath = await downloadAndSaveImage(subjectImageUrl, subjectName);

  
      // Fetch subject details from the 'subjects' collection
      const subjectDocRef = doc(db, 'subjects', subjectId);
      const subjectDoc = await getDoc(subjectDocRef);
      const subjectData = subjectDoc.data();
  
      // Construct the data structure with subject details and terms
      const myClassData = {
        subjectId,
        subject: subjectName,
        syllabusUrl: subjectData.syllabus.document, // Assuming syllabus is stored in a map named 'syllabus'
        terms: [],
      };
  
      // Fetch terms from the subject document's 'terms' collection
      const termsCollectionRef = collection(subjectDocRef, 'terms');
      const termsSnapshot = await getDocs(termsCollectionRef);
      termsSnapshot.forEach(termDoc => {
        const termData = termDoc.data();
        myClassData.terms.push({
          form: termData.form,
          term: termData.term,
          termNumber: termData.termNumber,
          termId: termData.termId,
        });
      });
  
      // Enroll in the subject
      await setDoc(doc(myClassesCollectionRef, subjectId), myClassData);

      // Update myClasses state
      setMyClasses(prevMyClasses => [...prevMyClasses, myClassData]);
      myClassData.terms = []
      await storeClassInAsyncStorage(subjectId, subjectName, myClassData, imagePath);
  
    } catch (error) {
      setEnrollingInProcess(false);
      console.error('Error enrolling in subject:', error);
      alert('Error enrolling in subject:', error);
    }
  };




// Store the enrolled subject in AsyncStorage

const storeClassInAsyncStorage = async (subjectId, subjectName, myClassData, imagePath) => {
  try {
    const db = getFirestore(app);
    
    // Fetch subject details from Firestore
    const subjectDocRef = doc(db, 'subjects', subjectId);
    
    // Fetch terms from the subject document's 'terms' collection
    const termsCollectionRef = collection(subjectDocRef, 'terms');
    const termsSnapshot = await getDocs(termsCollectionRef);
    
    // Iterate through each term and fetch chapters and contents
    await Promise.all(termsSnapshot.docs.map(async termDoc => {
      const termData = termDoc.data();
      const termId = termDoc.id;
      const term = {
        termId: termId,
        termNumber: termData.termNumber,
        term: termData.term,
        form: termData.form,
        chapters: [],
      };
      
      // Fetch chapters from the term document's 'chapters' collection
      const chaptersCollectionRef = collection(termDoc.ref, 'chapters');
      const chaptersSnapshot = await getDocs(chaptersCollectionRef);
      
      // Iterate through each chapter and fetch contents
      await Promise.all(chaptersSnapshot.docs.map(async chapterDoc => {
        const chapterData = chapterDoc.data();
        const chapterId = chapterDoc.id;
        const chapter = {
          id: chapterId,
          name: chapterData.name,
          week: chapterData.week,
          data: [],
        };
        
        // Fetch contents from the chapter document's 'contents' collection
        const contentsCollectionRef = collection(chapterDoc.ref, 'contents');
        const contentsSnapshot = await getDocs(contentsCollectionRef);
        chapter.data = contentsSnapshot.docs.map(contentDoc => {
          const contentData = contentDoc.data();
          return {
            id: contentDoc.id,
            topicName: contentData.topicName,
            contentType: contentData.contentType,
            contentUrl: contentData.contentUrl,
          };
        });
        
        term.chapters.push(chapter);
      }));
      
      // Add the term to myClassData
      myClassData.terms.push({...term}); // Ensure each term is a separate object
    }));

    // Add imagePath property to myClassData
    myClassData.imagePath = imagePath;
    
    // Retrieve existing classes from AsyncStorage
    const existingClassesJson = await AsyncStorage.getItem('myAsyncStorageClasses');
    const existingClasses = existingClassesJson ? JSON.parse(existingClassesJson) : [];
    
    // Append the enrolled subject to existing classes
    const updatedClasses = [...existingClasses, myClassData];
    
    // Store the updated classes in AsyncStorage
    await AsyncStorage.setItem('myAsyncStorageClasses', JSON.stringify(updatedClasses));
    setEnrollingInProcess(false);
    setMoveToMyClasses(true);
    setMoveToMyClasses(false);
    
    console.log('subject image', myClassData.imagePath)
  } catch (error) {
    setEnrollingInProcess(false);
    console.error('Error enrolling in subject and storing in AsyncStorage:', error);
  }
};


  const downloadAndSaveImage = async (imageUrl, subjectName) => {
    try {
      const imageName = `${subjectName}.jpg`; // Construct image name from subject name
      const imagePath = `${RNFetchBlob.fs.dirs.DocumentDir}/${imageName}`;
      
      const res = await RNFetchBlob.config({
        fileCache: true,
        appendExt: 'jpg',
        path: imagePath
      }).fetch('GET', imageUrl);
      
      console.log('Image downloaded to:', imagePath);
      return imagePath;
    } catch (error) {
      console.error('Error downloading and saving image:', error);
      throw error;
    }
  };



  // Unenroll from a subject and delete the unenrolled subject from Firestore and AsyncStorage

  const unEnroll = async (subjectId) => {
    try {
      const db = getFirestore(app);
      const user = auth.currentUser;
      const userDocRef = doc(db, 'students', user.uid);
      const myClassesCollectionRef = collection(userDocRef, 'myclasses');

      // Delete the class from Firestore
      await deleteDoc(doc(myClassesCollectionRef, subjectId));

      // Update the myClasses state by removing the unenrolled class
      setMyClasses(prevMyClasses =>
        prevMyClasses.filter(subject => subject.subjectId !== subjectId)
      );

      // Delete the class from AsyncStorage
      await deleteSubjectInAsyncStorage(subjectId);
    } catch (error) {
      console.error('Error unenrolling from subject:', error);
      alert('Error unenrolling from subject:', error);
    }
  };





  // Delete the unenrolled subject from AsyncStorage

  const deleteSubjectInAsyncStorage = async (subjectId) => {
    try {
      // Retrieve existing classes from AsyncStorage
      const existingClassesJson = await AsyncStorage.getItem('myAsyncStorageClasses');
      if (!existingClassesJson) {
        console.log('No classes found in AsyncStorage');
        return;
      }
  
      // Parse existing classes from AsyncStorage
      const existingClasses = JSON.parse(existingClassesJson);
  
      // Find the index of the subject to delete
      const index = existingClasses.findIndex((subject) => subject.subjectId === subjectId);
  
      // If the subject is found, remove it from the classes
      if (index !== -1) {
        existingClasses.splice(index, 1);
  
        // Update AsyncStorage with the modified classes
        await AsyncStorage.setItem('myAsyncStorageClasses', JSON.stringify(existingClasses));
  
        // Update the myClasses state with the modified classes
        setMyClasses(existingClasses);
      } else {
        console.log('Subject not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error deleting subject from AsyncStorage:', error);
    }
  };


  // A function to download content and store it in async storage

  const storeDownloadedContentPathInAsyncStorage = async (myClases, myCurrentContentState, firebaseUrl) => {
    const { currentSubject, currentTerm, currentChapter, currentContent } = myCurrentContentState;

    console.log(myCurrentContentState)
  
    const downloadAndSaveVideo = async (videoUrl, videoTitle) => {
      try {
        const videoName = `${videoTitle}.mp4`;
        const videoPath = `${RNFetchBlob.fs.dirs.DocumentDir}/${videoName}`;
    
        const task = RNFetchBlob.config({
          fileCache: true,
          appendExt: 'mp4',
          path: videoPath,
        }).fetch('GET', videoUrl);
    
        task.progress((received, total) => {
          const progress = (received / total) * 100;
          console.log(`Downloaded ${progress.toFixed(2)}%`);
        });
    
        const res = await task;
    
        console.log('Video downloaded to:', videoPath);
        return videoPath;
      } catch (error) {
        console.error('Error downloading and saving video:', error);
        throw error;
      }
    };
  
    try {
      const subjectIndex = myClases.findIndex(subject => subject.subjectId== currentSubject);
      if (subjectIndex === -1) {
        throw new Error('Subject not found in myClasses');
      }
  
      const termIndex = myClases[subjectIndex].terms.findIndex(term => term.termId === currentTerm);
      if (termIndex === -1) {
        throw new Error('Term not found in myClasses');
      }
  
      const chapterIndex = myClases[subjectIndex].terms[termIndex].chapters.findIndex(chapter => chapter.id === currentChapter);
      if (chapterIndex === -1) {
        throw new Error('Chapter not found in myClasses');
      }
  
      const contentIndex = myClases[subjectIndex].terms[termIndex].chapters[chapterIndex].data.findIndex(content => content.topicName === currentContent);
      if (contentIndex === -1) {
        throw new Error('Content not found in myClasses');
      }
  
      const localImagePath = await downloadAndSaveVideo(firebaseUrl, currentContent);
  
      // Update the content object with the downloadFilePath
      myClasses[subjectIndex].terms[termIndex].chapters[chapterIndex].data[contentIndex].downloadFilePath = localImagePath;
  
      // Store the updated myClasses in AsyncStorage
      await AsyncStorage.setItem('myAsyncStorageClasses', JSON.stringify(myClasses));
  
      console.log('Downloaded content path stored in AsyncStorage:', localImagePath);
    } catch (error) {
      console.error('Error storing downloaded content path:', error);
      throw new Error('Failed to store downloaded content path');
    }
  };
  
  

  const memoizedSubjects = useMemo(() => subjects, [subjects]);

  return (
    <AllSubjectsContext.Provider value={{ 
      subjects: memoizedSubjects, filteredSubjects, 
      setFilteredSubjects, loadingSubjects, enroll, unEnroll,
       myClasses, loadingMyClasses,  enrollingInProcess, moveToMyClasses,
       myCurrentChapters, setMyCurrentChapters, myContentState, setMyContentState,
       storeDownloadedContentPathInAsyncStorage
    }}>
      {children}
    </AllSubjectsContext.Provider>
  );
};

export const useAllSubjectsContext = () =>{
  return React.useContext(AllSubjectsContext)
}

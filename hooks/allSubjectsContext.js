import React, { useState, useEffect, useMemo, createContext,startTransition, useCallback } from 'react';
import { collection, getDocs, getDoc, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { auth,db } from '../FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import { useUserDataContext } from './userDataContext';
import { onAuthStateChanged } from 'firebase/auth';


// Create a new context
const AllSubjectsContext = createContext();

export const AllSubjectsProvider = ({ children }) => {

  const { levelState, loginInOn, inLoggingOutProcess ,userDetails } = useUserDataContext();

  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
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
    currentContentUrl:null,
    currentContentType: null,
    currentChapterName:null,
  })
  const [completedWork, setCompletedWork] = useState([]);

  const [downloadTasks, setDownloadTasks] = useState([]);
  const [downloadQueue, setDownloadQueue] = useState([]);
  const [currentDownload, setCurrentDownload] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState({});
  const [deleteInProgress, setDeleteInProgress] = useState(false)
  const [reloading, setReloading] = useState(false)
  const [currentQuestionPaperOrSyllabus, setCurrentQuestionPaperOrSyllabus] = useState(false)
  const [currentQuestionPapers,setCurrentQuestionPapers] = useState([])
 




  // Fetch subjects from AsyncStorage or Firestore if not found in AsyncStorage then store in state
  const fetchSubjectsOrCourses = async () => {
    setLoadingSubjects(true);
    ;
    const collectionName = levelState === 'Tertiary' ? 'courses' : 'subjects';
    const targetCollection = collection(db, collectionName);

    try {
      const snapshot = await getDocs(targetCollection);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubjects(data);
      setFilteredSubjects(data);
      setReloading(false)
    } catch (error) {
      console.error('Error fetching subjects or courses:', error);
      setReloading(false)
    } finally {
      setLoadingSubjects(false);
      setReloading(false)
    }
  };

  useEffect(() => {
    fetchSubjectsOrCourses();
  }, [levelState]);

  useEffect(() => {
    filteredSubjects.length >0?setLoadingSubjects(false):null
  }, [filteredSubjects]);

  useEffect(() => {
    myClasses.length >0?setLoadingMyClasses(false):null 
  }, [myClasses]);




  const loadMyClasses = useCallback(async () => {
    try {
      console.log('Starting to load classes...');
      setLoadingMyClasses(true);
      setMyClasses([]);
  
      const storageKey = levelState === 'Tertiary' ? 'myAsyncStorageCourses' : 'myAsyncStorageClasses';
      
      // Check if there are classes stored in AsyncStorage
      const existingClassesJson = await AsyncStorage.getItem(storageKey);
  
      if (existingClassesJson) {
        const existingClasses = JSON.parse(existingClassesJson);
        console.log('Loaded classes from AsyncStorage:', existingClasses);
        setMyClasses(existingClasses);
        setLoadingMyClasses(false);
        return;
      }
  
      console.log('No classes found in AsyncStorage, fetching from Firestore...');
      
      ;
      const user = auth.currentUser;
  
      if (!user) {
        console.log('No user logged in.');
        setLoadingMyClasses(false);
        return;
      }
  
      const userDocRef = doc(db, 'students', user.uid);
      const myClassesCollectionRef = collection(userDocRef, 'myclasses');
      const myClassesSnapshot = await getDocs(myClassesCollectionRef);
  
      if (myClassesSnapshot.empty) {
        console.log('No myclasses found in Firestore');
        setLoadingMyClasses(false);
        return;
      }
  
      console.log('Classes found in Firestore, processing...');

      
  
      const myClassesData = await Promise.all(myClassesSnapshot.docs.map(async (docRacho) => {
        const classData = docRacho.data();
        const subjectId = docRacho.id;
        const subjectImageUrl = levelState === 'Tertiary' ? null:docRacho.data().subjectImageUrl
        console.log('This is the subject image url', subjectImageUrl)
        const subject = docRacho.data().subject;
        const imagePath =levelState === 'Tertiary' ? '': await downloadAndSaveImage(subjectImageUrl,subject);
        const myClassData = {
          id: subjectId,
          ...classData,
          chapters: [],
          terms: []
        };

        myClassData.imagePath = imagePath
  
        console.log(`Processing class with ID: ${subjectId}`);
  
        const subjectDocRef = levelState === 'Tertiary' ? doc(db, 'courses', subjectId) : doc(db, 'subjects', subjectId);
  
        if (levelState === 'Tertiary') {
          const chaptersCollectionRef = collection(subjectDocRef, 'chapters');
          const chaptersSnapshot = await getDocs(chaptersCollectionRef);
  
          await Promise.all(chaptersSnapshot.docs.map(async (chapterDoc) => {
            const chapterData = chapterDoc.data();
            const chapterId = chapterDoc.id;
            const chapter = {
              id: chapterId,
              name: chapterData.name,
              week: chapterData.week,
              data: [],
              position: chapterData.position
            };
  
            const contentsCollectionRef = collection(chapterDoc.ref, 'contents');
            const contentsSnapshot = await getDocs(contentsCollectionRef);
  
            chapter.data = await Promise.all(contentsSnapshot.docs.map(async (contentDoc) => {
              const contentData = contentDoc.data();
  
              if (contentData.contentType === 'exercise') {
                const questions = contentData.questions ? await Promise.all(contentData.questions.map(async (question) => {
                  const answers = question.answers ? question.answers.map((answer) => ({
                    image: answer.image || '',
                    text: answer.text || '',
                    isCorrect: answer.isCorrect || false
                  })) : [];
  
                  return {
                    questionText: question.questionText || '',
                    image: question.image || '',
                    answers
                  };
                })) : [];
  
                return {
                  id: contentDoc.id,
                  topicName: contentData.topicName,
                  contentType: contentData.contentType,
                  position: contentData.position,
                  duration: contentData.timeframe,
                  questions,
                  contentUrl:contentData.contentUrl
                };
              } else {
                return {
                  id: contentDoc.id,
                  topicName: contentData.topicName,
                  contentType: contentData.contentType,
                  contentUrl: contentData.contentUrl,
                  position: contentData.position,
                  duration: contentData.timeframe
                };
              }
            }));
  
            myClassData.chapters.push(chapter);
            console.log(`Processed chapter with ID: ${chapterId} for class ID: ${subjectId}`);
          }));
  
        } else {
          const termsCollectionRef = collection(subjectDocRef, 'terms');
          const termsSnapshot = await getDocs(termsCollectionRef);
  
          await Promise.all(termsSnapshot.docs.map(async (termDoc) => {
            const termData = termDoc.data();
            const termId = termDoc.id;
            const term = {
              termId: termId,
              termNumber: termData.termNumber,
              term: termData.term,
              form: termData.form,
              chapters: [],
              totalTime:termData.totalTime
            };
  
            const chaptersCollectionRef = collection(termDoc.ref, 'chapters');
            const chaptersSnapshot = await getDocs(chaptersCollectionRef);
  
            await Promise.all(chaptersSnapshot.docs.map(async (chapterDoc) => {
              const chapterData = chapterDoc.data();
              const chapterId = chapterDoc.id;
              const chapter = {
                id: chapterId,
                name: chapterData.name,
                week: chapterData.week,
                data: [],
                position: chapterData.position
              };
  
              const contentsCollectionRef = collection(chapterDoc.ref, 'contents');
              const contentsSnapshot = await getDocs(contentsCollectionRef);
  
              chapter.data = await Promise.all(contentsSnapshot.docs.map(async (contentDoc) => {
                const contentData = contentDoc.data();
  
                if (contentData.contentType === 'exercise') {
                  const questions = contentData.questions ? await Promise.all(contentData.questions.map(async (question) => {
                    const answers = question.answers ? question.answers.map((answer) => ({
                      image: answer.image || '',
                      text: answer.text || '',
                      isCorrect: answer.isCorrect || false
                    })) : [];
  
                    return {
                      questionText: question.questionText || '',
                      image: question.image || '',
                      answers
                    };
                  })) : [];
  
                  return {
                    id: contentDoc.id,
                    topicName: contentData.topicName,
                    contentType: contentData.contentType,
                    position: contentData.position,
                    duration: contentData.timeframe,
                    questions,
                    contentUrl:contentData.contentUrl
                  };
                } else {
                  return {
                    id: contentDoc.id,
                    topicName: contentData.topicName,
                    contentType: contentData.contentType,
                    contentUrl: contentData.contentUrl,
                    position: contentData.position,
                    duration: contentData.timeframe
                  };
                }
              }));
  
              term.chapters.push(chapter);
              console.log(`Processed chapter with ID: ${chapterId} for term ID: ${termId}`);
            }));
  
            myClassData.terms.push(term);
            console.log(`Processed term with ID: ${termId} for class ID: ${subjectId}`);
          }));
        }
  
        console.log(`Finished processing class with ID: ${subjectId}`);
        return myClassData;
      }));
  
      setMyClasses(myClassesData);
  
      // Store the classes in AsyncStorage
      await AsyncStorage.setItem(storageKey, JSON.stringify(myClassesData));
  
      console.log('Classes saved to AsyncStorage');
      setLoadingMyClasses(false);
      console.log('Finished loading classes');
    } catch (error) {
      setLoadingMyClasses(false);
      console.error('Error loading myClasses:', error);
  
      if (
        error.message.includes('Could not reach Cloud Firestore backend') ||
        error.message.includes('Failed to get documents from a collection')
      ) {
        console.log('Retrying to load classes...');
        // Retry loading myClasses after a short delay
        setTimeout(loadMyClasses, 3000); // Retry after 3 seconds
      }
    }
  }, [levelState]);
  
  
  
  useEffect(() => {
    if(userDetails.userId){
      loadMyClasses();
    }else{
      setMyClasses([])
      setLoadingMyClasses(true);
      setFilteredSubjects([])
    }
  }, [levelState, loadMyClasses, userDetails.userId]);


  
  
  




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
      const isEnrolled =  levelState === 'Tertiary' ? myClasses.some(myClass => myClass.courseId === subject.id) : myClasses.some(myClass => myClass.subjectId === subject.id);
      return { ...subject, isEnrolled };
    });
  });
}, [myClasses, subjects]);  
  




  // Enroll in a subject and store the enrolled subject in Firestore and AsyncStorage

  const enroll = async (subjectId, subjectName, subjectImageUrl) => {
    console.log('Enrollment started for:', subjectId, subjectName, subjectImageUrl);
  
    try {
      setEnrollingInProcess(true);
      
      const user = auth.currentUser;
      const userDocRef = doc(db, 'students', user.uid);
      const myClassesCollectionRef = collection(userDocRef, 'myclasses');
  
      // Download and save the subject image to the file system
      const imagePath =levelState === 'Tertiary' ?null: await downloadAndSaveImage(subjectImageUrl, subjectName);
  
      // Determine the collection name based on the level state
      const collectionName = levelState === 'Tertiary' ? 'courses' : 'subjects';
  
      // Fetch subject or course details from the respective collection
      const subjectDocRef = doc(db, collectionName, subjectId);
      const subjectDoc = await getDoc(subjectDocRef);
      const subjectData = subjectDoc.data();
  
      // Log the subject data for debugging
      console.log('Fetched subject data:', subjectData);
  
      // Construct the data structure with subject/course details
      const myClassData = levelState === 'Tertiary' ? {
        courseId: subjectId,
        name: subjectName,
        universityName: subjectData.universityName,
        semester: subjectData.semester,
        totalTime:subjectData.totalTime,

      } : {
        subjectId,
        subject: subjectName,
        syllabusUrl: subjectData.syllabus.document,
        subjectImageUrl

      };
  
      // Check for undefined fields and log an error if any are found
      if (levelState === 'Tertiary') {
        if (!subjectData.universityName || !subjectData.semester) {
          throw new Error('Missing required fields in subject data for Tertiary level');
        }
      } else {
        if (!subjectData.syllabus || !subjectData.syllabus.document) {
          throw new Error('Missing required fields in subject data for non-Tertiary level');
        }
      }
  
      // If the level state is not 'Tertiary', fetch terms from the subject document's 'terms' collection
      if (levelState !== 'Tertiary') {
        myClassData.terms = [];
        const termsCollectionRef = collection(subjectDocRef, 'terms');
        const termsSnapshot = await getDocs(termsCollectionRef);
        termsSnapshot.forEach(termDoc => {
          const termData = termDoc.data();
          myClassData.terms.push({
            form: termData.form,
            term: termData.term,
            termNumber: termData.termNumber,
            termId: termData.termId,
            totalTime: termData.totalTime || ''
          });
        });
      }

      console.log('Here is myClass data:', myClassData)
  
      // Enroll in the subject or course
      const classDocRef = doc(myClassesCollectionRef, subjectId);
      await setDoc(classDocRef, myClassData);
  
      // Update myClasses state
      setMyClasses(prevMyClasses => [...prevMyClasses, myClassData]);
  
      // Store class information in AsyncStorage
      await storeClassInAsyncStorage(subjectId, subjectName, myClassData, imagePath);
  
      setEnrollingInProcess(false);
    } catch (error) {
      setEnrollingInProcess(false);
      console.error('Error enrolling in subject:', error);
      alert('Error enrolling in subject:', error.message);
    }
  };
  




// Store the enrolled subject in AsyncStorage

const storeClassInAsyncStorage = useCallback(async (subjectId, subjectName, myClassData, imagePath) => {
  try {

    // Initialize chapters and terms arrays
    myClassData.chapters = [];
    myClassData.terms = [];

    // Fetch subject details from Firestore
    const subjectDocRef = levelState === 'Tertiary' ? doc(db, 'courses', subjectId) : doc(db, 'subjects', subjectId);

    if (levelState === 'Tertiary') {
      // Fetch chapters from the course document's 'chapters' collection
      const chaptersCollectionRef = collection(subjectDocRef, 'chapters');
      const chaptersSnapshot = await getDocs(chaptersCollectionRef);

      // Iterate through each chapter and fetch contents
      await Promise.all(chaptersSnapshot.docs.map(async (chapterDoc) => {
        const chapterData = chapterDoc.data();
        const chapterId = chapterDoc.id;
        const chapter = {
          id: chapterId,
          name: chapterData.name,
          week: chapterData.week,
          data: [],
          position: chapterData.position,
        };

        // Fetch contents from the chapter document's 'contents' collection
        const contentsCollectionRef = collection(chapterDoc.ref, 'contents');
        const contentsSnapshot = await getDocs(contentsCollectionRef);

        chapter.data = await Promise.all(contentsSnapshot.docs.map(async (contentDoc) => {
          const contentData = contentDoc.data();

          if (contentData.contentType === 'exercise') {
            const questions = contentData.questions ? await Promise.all(contentData.questions.map(async (question) => {
              const answers = question.answers ? question.answers.map((answer) => {
                return {
                  image: answer.image || '',
                  text: answer.text || '',
                  isCorrect: answer.isCorrect || false,
                };
              }) : [];

              return {
                questionText: question.questionText || '',
                image: question.image || '',
                answers,
              };
            })) : [];

            console.log('Here are the questions that we are storing in async storage', questions);

            return {
              id: contentDoc.id,
              topicName: contentData.topicName,
              contentType: contentData.contentType,
              position: contentData.position,
              duration: contentData.timeframe,
              questions,
              contentUrl:contentData.contentUrl
            };
          } else {
            return {
              id: contentDoc.id,
              topicName: contentData.topicName,
              contentType: contentData.contentType,
              contentUrl: contentData.contentUrl,
              position: contentData.position,
              duration: contentData.timeframe,
            };
          }
        }));

        myClassData.chapters.push(chapter);
      }));

      // Add imagePath property to myClassData
      myClassData.imagePath = imagePath;

      // Retrieve existing classes from AsyncStorage
      const existingClassesJson = await AsyncStorage.getItem('myAsyncStorageCourses');
      const existingClasses = existingClassesJson ? JSON.parse(existingClassesJson) : [];

      // Append the enrolled subject to existing classes
      const updatedClasses = [...existingClasses, myClassData];
      console.log('This is the class that I have just updated', updatedClasses);

      // Store the updated classes in AsyncStorage
      await AsyncStorage.setItem('myAsyncStorageCourses', JSON.stringify(updatedClasses));
      setEnrollingInProcess(false);
      setMoveToMyClasses(true);
      setMoveToMyClasses(false);

    } else {
      // Fetch terms from the subject document's 'terms' collection
      const termsCollectionRef = collection(subjectDocRef, 'terms');
      const termsSnapshot = await getDocs(termsCollectionRef);

      // Iterate through each term and fetch chapters and contents
      await Promise.all(termsSnapshot.docs.map(async (termDoc) => {
        const termData = termDoc.data();
        const termId = termDoc.id;
        const term = {
          termId: termId,
          termNumber: termData.termNumber,
          term: termData.term,
          form: termData.form,
          chapters: [],
          totalTime:termData.totalTime
        };

        // Fetch chapters from the term document's 'chapters' collection
        const chaptersCollectionRef = collection(termDoc.ref, 'chapters');
        const chaptersSnapshot = await getDocs(chaptersCollectionRef);

        // Iterate through each chapter and fetch contents
        await Promise.all(chaptersSnapshot.docs.map(async (chapterDoc) => {
          const chapterData = chapterDoc.data();
          const chapterId = chapterDoc.id;
          const chapter = {
            id: chapterId,
            name: chapterData.name,
            week: chapterData.week,
            data: [],
            position: chapterData.position,
          };

          // Fetch contents from the chapter document's 'contents' collection
          const contentsCollectionRef = collection(chapterDoc.ref, 'contents');
          const contentsSnapshot = await getDocs(contentsCollectionRef);

          chapter.data = await Promise.all(contentsSnapshot.docs.map(async (contentDoc) => {
            const contentData = contentDoc.data();

            if (contentData.contentType === 'exercise') {
              const questions = contentData.questions ? await Promise.all(contentData.questions.map(async (question) => {
                const answers = question.answers ? question.answers.map((answer) => {
                  return {
                    image: answer.image || '',
                    text: answer.text || '',
                    isCorrect: answer.isCorrect || false,
                  };
                }) : [];

                return {
                  questionText: question.questionText || '',
                  image: question.image || '',
                  answers,
                };
              })) : [];

              console.log('Here are the questions that we are storing in async storage', questions);

              return {
                id: contentDoc.id,
                topicName: contentData.topicName,
                contentType: contentData.contentType,
                position: contentData.position,
                duration: contentData.timeframe,
                questions,
                contentUrl:contentData.contentUrl
              };
            } else {
              return {
                id: contentDoc.id,
                topicName: contentData.topicName,
                contentType: contentData.contentType,
                contentUrl: contentData.contentUrl,
                position: contentData.position,
                duration: contentData.timeframe,
              };
            }
          }));

          term.chapters.push(chapter);
        }));

        // Add the term to myClassData
        myClassData.terms.push({ ...term }); // Ensure each term is a separate object
      }));

      // Add imagePath property to myClassData
      myClassData.imagePath = imagePath;

      // Retrieve existing classes from AsyncStorage
      const existingClassesJson = await AsyncStorage.getItem('myAsyncStorageClasses');
      const existingClasses = existingClassesJson ? JSON.parse(existingClassesJson) : [];

      // Append the enrolled subject to existing classes
      const updatedClasses = [...existingClasses, myClassData];
      console.log('This is the class that I have just updated', updatedClasses);

      // Store the updated classes in AsyncStorage
      await AsyncStorage.setItem('myAsyncStorageClasses', JSON.stringify(updatedClasses));
      setEnrollingInProcess(false);
      setMoveToMyClasses(true);
      setMoveToMyClasses(false);
    }

  } catch (error) {
    setEnrollingInProcess(false);
    console.error('Error enrolling in subject and storing in AsyncStorage:', error);
  }
}, [levelState]);







const downloadAndSaveImage = async (imageUrl, subjectName) => {
  try {
    // Check if imageUrl and subjectName both exist
    if (!imageUrl || !subjectName) {
      throw new Error('Image URL and Subject Name are required');
    }

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
      setDeleteInProgress(true)
      ;
      const user = auth.currentUser;
      console.log(user.uid)
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
      setDeleteInProgress(false)
    } catch (error) {
      console.error('Error unenrolling from subject:', error);
      alert('Error unenrolling from subject:', error);
    }
  };





  // Delete the unenrolled subject from AsyncStorage

  const deleteSubjectInAsyncStorage = async (subjectId) => {
    try {
      // Retrieve existing classes from AsyncStorage
      const existingClassesJson = levelState ==='Tertiary'?await AsyncStorage.getItem('myAsyncStorageCourses'): await AsyncStorage.getItem('myAsyncStorageClasses');
      if (!existingClassesJson) {
        console.log('No classes found in AsyncStorage');
        return;
      }
  
      // Parse existing classes from AsyncStorage
      const existingClasses = JSON.parse(existingClassesJson);
  
      // Find the index of the subject to delete
      const index = levelState ==='Tertiary'?existingClasses.findIndex((subject) => subject.courseId === subjectId) : existingClasses.findIndex((subject) => subject.subjectId === subjectId);
  
      // If the subject is found, remove it from the classes
      if (index !== -1) {
        existingClasses.splice(index, 1);
  
        // Update AsyncStorage with the modified classes
        levelState ==='Tertiary'? await AsyncStorage.setItem('myAsyncStorageCourses', JSON.stringify(existingClasses)) :await AsyncStorage.setItem('myAsyncStorageClasses', JSON.stringify(existingClasses));
  
        // Update the myClasses state with the modified classes
        setMyClasses(existingClasses);
      } else {
        console.log('Subject not found in AsyncStorage with id',subjectId);
      }
    } catch (error) {
      console.error('Error deleting subject from AsyncStorage:', error);
    }
  };


  // A function to download content and store it in async storage

  const storeDownloadedContentPathInAsyncStorage = async (
    myCurrentContentState,
    firebaseUrl,
    contentType,
  ) => {
    const { currentSubject, currentTerm, currentChapter, currentContent } = myCurrentContentState;
  
    const downloadAndSaveVideo = async (videoUrl, videoTitle) => {
      try {
        const videoName = `${videoTitle}.mp4`;
        const videoPath = `${RNFetchBlob.fs.dirs.DocumentDir}/${videoName}`;
  
        const task = RNFetchBlob.config({
          fileCache: true,
          appendExt: 'mp4',
          path: videoPath,
        }).fetch('GET', videoUrl);
  
        // Add the new task to downloadTasks
        const updatedTasks = [
          ...downloadTasks,
          { title: videoTitle, progress: 0 },
        ];
        setDownloadTasks(updatedTasks);
  
        task.progress((received, total) => {
          const progress = Math.round((received / total) * 100);
          console.log(progress, videoTitle)
          updateDownloadTaskStatus(progress, videoTitle);
        });
  
        const res = await task;
  
        console.log('Video downloaded to:', videoPath);
        updateDownloadTaskStatus(task, 100, videoTitle);
  
        const localFilePath = videoPath;
  
        return localFilePath;
      } catch (error) {
        handleDownloadError(error);
        throw error;
      }
    };
  
    const downloadAndSavePdf = async (pdfUrl, title) => {
      try {
        const pdfName = `${title}.pdf`;
        const pdfPath = `${RNFetchBlob.fs.dirs.DocumentDir}/${pdfName}`;
  
        const task = RNFetchBlob.config({
          fileCache: true,
          appendExt: 'pdf',
          path: pdfPath,
        }).fetch('GET', pdfUrl);
  
        // Add the new task to downloadTasks
        const updatedTasks = [
          ...downloadTasks,
          { title, progress: 0, task },
        ];
        setDownloadTasks(updatedTasks);
  
        task.progress((received, total) => {
          const progress = Math.round((received / total) * 100);
          setTimeout(() => {
            updateDownloadTaskStatus(progress, title);
          }, 3000); // 3000 milliseconds = 3 seconds delay
          console.log('progress', progress);
        });
  
        const res = await task;
  
        console.log('PDF downloaded to:', pdfPath);
        updateDownloadTaskStatus(100, title);
  
        const localFilePath = pdfPath;
  
        return localFilePath;
      } catch (error) {
        handleDownloadError(error);
        throw error;
      }
    };
  
    const handleDownloadError = (error) => {
      setMyContentState((prevState) => ({
        ...prevState,
        currentContent: null,
        currentContentUrl: null,
      }));
      console.error('Error downloading and saving file:', error);
    };
  
    const updateDownloadTaskStatus = (progress, title) => {
      // Check if downloadTasks is empty
      if (downloadTasks.length === 0) {
        // If empty, add new task with provided progress and title
        const newTask = { progress, title };
        setDownloadTasks([newTask]);
        console.log('newTask', newTask)
      } else {
        // If not empty, find task with same title
        const existingTaskIndex = downloadTasks.findIndex(item => item.title === title);
        
        if (existingTaskIndex !== -1) {
          // If task with title exists, update its progress
          const updatedTasks = downloadTasks.map((item, index) => {
            if (index === existingTaskIndex) {
              return { ...item, progress };
            }
            return item;
          });
          setDownloadTasks(updatedTasks);
          console.log('updatedTasks for the second time', updatedTasks)
        } else {
          // If task with title does not exist, add new task
          const newTask = { progress, title };
          const updatedTasks = [...downloadTasks, newTask];
          setDownloadTasks(updatedTasks);
          console.log('updatedTasks when the a second item is being downloaded', updatedTasks)
        }
      }
    };
    
  
   
  
    try {
      const subjectIndex = myClasses.findIndex(
        (subject) => subject.subjectId === currentSubject
      );
      if (subjectIndex === -1) {
        handleDownloadError(new Error('Subject not found in myClasses'));
        return;
      }
  
      const termIndex = myClasses[subjectIndex].terms.findIndex(
        (term) => term.termId === currentTerm
      );
      if (termIndex === -1) {
        handleDownloadError(new Error('Term not found in myClasses'));
        return;
      }
  
      const chapterIndex = myClasses[subjectIndex].terms[termIndex].chapters.findIndex(
        (chapter) => chapter.id === currentChapter
      );
      if (chapterIndex === -1) {
        handleDownloadError(new Error('Chapter not found in myClasses'));
        return;
      }
  
      const contentIndex = myClasses[subjectIndex].terms[termIndex].chapters[
        chapterIndex
      ].data.findIndex((content) => content.topicName === currentContent);
      if (contentIndex === -1) {
        handleDownloadError(new Error('Content not found in myClasses'));
        return;
      }

      let localFilePath;
  
     
        
        if (contentType === 'pdf') {
          localFilePath = await downloadAndSavePdf(firebaseUrl, currentContent);
        } else if (contentType === 'video') {
          localFilePath = await downloadAndSaveVideo(firebaseUrl, currentContent);
        } else {
          handleDownloadError(new Error('Unsupported contentType'));
          return;
        }
      
  
      // Update the content object with the downloadFilePath
      const updatedMyClasses = [...myClasses];
      const updatedSubject = { ...updatedMyClasses[subjectIndex] };
      const updatedTerm = { ...updatedSubject.terms[termIndex] };
      const updatedChapter = { ...updatedTerm.chapters[chapterIndex] };
      const updatedContent = {
        ...updatedChapter.data[contentIndex],
        downloadFilePath: localFilePath,
      };
  
      // Update the content object with the downloadFilePath
      updatedChapter.data[contentIndex] = updatedContent;
      updatedTerm.chapters[chapterIndex] = updatedChapter;
      updatedSubject.terms[termIndex] = updatedTerm;
      updatedMyClasses[subjectIndex] = updatedSubject;
  
      // Set the updated myClasses
      setMyClasses(updatedMyClasses);
  
      // Store the updated myClasses in AsyncStorage (if needed)
      await AsyncStorage.setItem(
        'myAsyncStorageClasses',
        JSON.stringify(updatedMyClasses)
      );
  
      setMyContentState((prevState) => ({
        ...prevState,
        currentContent: null,
        currentContentUrl: null,
      }));
  
      console.log('Downloaded content path stored in AsyncStorage:', localFilePath);
    } catch (error) {
      handleDownloadError(error);
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
       storeDownloadedContentPathInAsyncStorage, downloadTasks, setDownloadTasks,
        downloadQueue, setDownloadQueue, currentDownload, setCurrentDownload,
        downloadProgress, setDownloadProgress,setMyClasses, deleteInProgress,
        setReloading, reloading, fetchSubjectsOrCourses,
        completedWork, setCompletedWork,
        currentQuestionPaperOrSyllabus, setCurrentQuestionPaperOrSyllabus,
        setCurrentQuestionPapers, currentQuestionPapers
    }}>
      {children}
    </AllSubjectsContext.Provider>
  );
};

export const useAllSubjectsContext = () =>{
  return React.useContext(AllSubjectsContext)
}

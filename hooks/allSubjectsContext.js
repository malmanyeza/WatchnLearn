import React, { useState, useEffect, useMemo, createContext } from 'react';
import { collection, getDocs, getFirestore, getDoc, setDoc, doc } from 'firebase/firestore';
import app from '../firebase'; // Make sure to import your firebase configuration
import { auth } from '../firebase';
import { set } from 'react-native-reanimated';
// Create a new context
const AllSubjectsContext = createContext();

export const AllSubjectsProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false)
  const [myClasses, setMyClasses] = useState([]);
  const [loadingMyClasses, setLoadingMyClasses] = useState(false);

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


  useEffect(() => {
    const loadMyClasses = async () => {
      try {
        setLoadingMyClasses(true);
        const db = getFirestore(app);
        const user = auth.currentUser;
        if (!user) {
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
  });
  

  const enroll = async (subjectId, subjectName) => {
    try {
      const db = getFirestore(app);
      const user = auth.currentUser;
      const userDocRef = doc(db, 'students', user.uid);
      const myClassesCollectionRef = collection(userDocRef, 'myclasses');
      
  
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
  
    } catch (error) {
      console.error('Error enrolling in subject:', error);
      alert('Error enrolling in subject:', error);
    }
  };
  

  const memoizedSubjects = useMemo(() => subjects, [subjects]);

  return (
    <AllSubjectsContext.Provider value={{ 
      subjects: memoizedSubjects, filteredSubjects, 
      setFilteredSubjects, loadingSubjects, enroll,
       myClasses, loadingMyClasses,  
    }}>
      {children}
    </AllSubjectsContext.Provider>
  );
};

export const useAllSubjectsContext = () =>{
  return React.useContext(AllSubjectsContext)
}

import React, { useState, useEffect, useMemo, createContext } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import app from '../firebase'; // Make sure to import your firebase configuration

// Create a new context
const AllSubjectsContext = createContext();

export const AllSubjectsProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false)

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

  const memoizedSubjects = useMemo(() => subjects, [subjects]);

  return (
    <AllSubjectsContext.Provider value={{ subjects: memoizedSubjects, filteredSubjects, setFilteredSubjects, loadingSubjects }}>
      {children}
    </AllSubjectsContext.Provider>
  );
};

export const useAllSubjectsContext = () =>{
  return React.useContext(AllSubjectsContext)
}

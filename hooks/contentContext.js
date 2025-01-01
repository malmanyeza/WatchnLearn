import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import { useAllSubjectsContext } from './allSubjectsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserDataContext } from './userDataContext';


const ContentContext = React.createContext();

export const ContentProvider = ({ children }) => {
  const [contentDetails, setContentDetails] = useState(null);
  const [questions, setQuestions] = useState([])
  const [content, setContent] = useState(
    [
      {
        title: 'Atomic Structure',
        week:1,
        chapterId:'walslatelariaoroaroe',
        data: [
          { id: 1, title: 'Introduction to Atoms', contentType: 'pdf', duration:'20m' , content:require('../assets/PDFs/SamplePDF.pdf'), week:1},
          { id: 2, title: 'Protons, Neutrons, and Electrons', contentType: 'video', duration:'30m', content:require('../assets/Videos/SampleVid.mp4'), week:1 },
          { id: 3, title: 'Atomic Models', contentType: 'video', duration:'25m', content:require('../assets/Videos/SampleVid.mp4'), week:1 },
        ],
      },
      {
        title: 'Chemical Bonding',
        week:1,
        chapterId:'walslatelariaoroaroe',
        data: [
          { id: 4, title: 'Ionic Bonding', contentType: 'video', duration:'40m', content:require('../assets/Videos/SampleVid.mp4'), week:1},
          { id: 5, title: 'Covalent Bonding', contentType: 'pdf', duration:'35m', content:require('../assets/PDFs/SamplePDF.pdf'), week:1 },
          { id: 6, title: 'Metallic Bonding', contentType: 'video', duration:'30m', content:require('../assets/Videos/SampleVid.mp4'),week:1 },
          {id:25, title: 'Quize', duration:'15m', questions:questions, noOfQuestions:8, week:1, contentType:'quize', week:1}
        ],
      },
      {
        title: 'Chemical Equilibrium',
        week:1,
        chapterId:'walslatelariaoroaroe',
        data: [
          { id: 7, title: 'Introduction to Chemical Equilibrium', contentType: 'pdf', duration:'15m' , content:require('../assets/PDFs/SamplePDF.pdf'),week:1},
          { id: 8, title: 'Le Chatelier\'s Principle', contentType: 'pdf', duration:'20m', content:require('../assets/PDFs/SamplePDF.pdf'),week:1 },
          { id: 9, title: 'Equilibrium Constants', contentType: 'video', duration:'25m', content:require('../assets/Videos/SampleVid.mp4'),week:1 },
        ],
      },
      {
        title: 'Organic Chemistry',
        week:1,
        chapterId:'walslatelariaoroaroe',
        data: [
          { id: 10, title: 'Introduction to Organic Chemistry', contentType: 'video', duration:'25m', content:require('../assets/Videos/SampleVid.mp4'),week:1 },
          { id: 11, title: 'Alkanes and Alkenes', contentType: 'video', duration:'30m', content:require('../assets/Videos/SampleVid.mp4'),week:1 },
          { id: 12, title: 'Functional Groups', contentType: 'pdf', duration:'35m', content:require('../assets/PDFs/SamplePDF.pdf'),week:1 },
        ],
      },
      {
          title: 'Chemical Reactions',
          week:1,
          chapterId:'walslatelariaoroaroe',
          data: [
            { id: 13, title: 'Introduction to Chemical Reactions', contentType: 'pdf', duration:'20m', content:require('../assets/PDFs/SamplePDF.pdf'),week:1 },
            { id: 14, title: 'Types of Chemical Reactions', contentType: 'video', duration:'30m' , content:require('../assets/Videos/SampleVid.mp4'),week:1},
            { id: 15, title: 'Balancing Chemical Equations', contentType: 'video', duration:'25m', content:require('../assets/Videos/SampleVid.mp4'),week:1 },
          ],
        },
        {
          title: 'States of Matter',
          week:2,
          chapterId:'walslatelariaoroaroe',
          data: [
            { id: 16, title: 'Introduction to States of Matter', contentType: 'pdf', duration:'40m', content:require('../assets/PDFs/SamplePDF.pdf'), week:2 },
            { id: 17, title: 'Gas Laws', contentType: 'pdf', duration:'35m', content:require('../assets/PDFs/SamplePDF.pdf') , week:2},
            { id: 18, title: 'Phase Transitions', contentType: 'video', duration:'30m', content:require('../assets/Videos/SampleVid.mp4') , week:2},
          ],
        },
        {
          title: 'Acids and Bases',
          week:2,
          chapterId:'walslatelariaoroaroe',
          data: [
            { id: 19, title: 'Introduction to Acids and Bases', contentType: 'video', duration:'15m', content:require('../assets/Videos/SampleVid.mp4'), week:2 },
            { id: 20, title: 'pH Scale', contentType: 'pdf', duration:'20m' , content:require('../assets/PDFs/SamplePDF.pdf'), week:2},
            { id: 21, title: 'Neutralization Reactions', contentType: 'video', duration:'25m', content:require('../assets/Videos/SampleVid.mp4'), week:2 },
          ]
        }
    ]
  )
  const [correctQuestions, setCorrectQuestions] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [week, setWeek] = useState(1)
  const [classContent, setClassContent] = useState([])
  const [isGoToClassButtonPressed, setIsGoToClassButtonPressed] = useState(false)

 const {myClasses} = useAllSubjectsContext()

 const {levelState} = useUserDataContext()
  

 const getIntoClass = async (subjectId, termId) => {
  try {
      let myContentData = [];
      
      // Check if myClasses contains the subject and term data
      const subjectTerm = myClasses.find(subject => subject.subjectId === subjectId)?.terms.find(term => term.termId === termId);
     
      if (subjectTerm) {
          // If the subject and term data is available in myClasses, use it
          myContentData = subjectTerm.chapters.sort((a, b) => a.position - b.position);
          setClassContent(myContentData);
          console.log('Here is my term data:', myContentData)
          setIsGoToClassButtonPressed(true)
          return
      } else {
          // If the subject and term data is not available, fetch it from Firebase
          const firestore = db
          const chaptersRef = collection(
              firestore,
              `subjects/${subjectId}/terms/${termId}/chapters`
          );
          const chaptersSnapshot = await getDocs(chaptersRef);

          // Loop through chapters and fetch contents for each chapter
          for (const chapterDoc of chaptersSnapshot.docs) {
              const chapterData = chapterDoc.data();
              const contentsRef = collection(chapterDoc.ref, 'contents');
              const contentsSnapshot = await getDocs(contentsRef);
              const contentsData = contentsSnapshot.docs.map(contentDoc => {
                  const contentData = contentDoc.data();
                  return {
                      id: contentDoc.id,
                      title: contentData.topicName,
                      contentType: contentData.contentType,
                      duration: contentData.timeframe,
                      contentUrl: contentData.contentUrl,
                      week: chapterData.week,
                  };
              });

              myContentData.push({
                  chapterTitle: chapterData.name,
                  week: chapterData.week,
                  data: contentsData,
              });
          }

          // Set myContentData and update myClasses with the fetched data
          setClassContent(myContentData);
          setIsGoToClassButtonPressed(true)
          // Update myClasses with the fetched class content
          const updatedMyClasses = myClasses.map(subject => {
              if (subject.id === subjectId) {
                  const updatedTerms = subject.terms.map(term => {
                      if (term.id === termId) {
                          return { ...term, classContent: myContentData };
                      }
                      return term;
                  });
                  return { ...subject, terms: updatedTerms };
              }
              return subject;
          });
          // Update myClasses in AsyncStorage
          AsyncStorage.setItem('myAsyncStorageClasses', JSON.stringify(updatedMyClasses));
      }
  } catch (error) {
      console.error('Error fetching class content:', error);
      return [];
  }
};


const getIntoCourse = async (courseId) => {
  try {
    let myContentData = [];

    // Check if myClasses contains the course data
    const course = myClasses.find(course => course.courseId === courseId);

    if (course) {
      // If the course data is available in myClasses, use it
      myContentData = course.chapters.sort((a, b) => a.position - b.position);
      
      setClassContent(myContentData);
      console.log('Here is my course data:', myContentData);
      setIsGoToClassButtonPressed(true);
      return;
    } else {
      // If the course data is not available, fetch it from Firebase
      const firestore = db
      const chaptersRef = collection(firestore, `courses/${courseId}/chapters`);
      const chaptersSnapshot = await getDocs(chaptersRef);

      // Loop through chapters and fetch contents for each chapter
      for (const chapterDoc of chaptersSnapshot.docs) {
        const chapterData = chapterDoc.data();
        const contentsRef = collection(chapterDoc.ref, 'contents');
        const contentsSnapshot = await getDocs(contentsRef);
        const contentsData = contentsSnapshot.docs.map(contentDoc => {
          const contentData = contentDoc.data();
          return {
            id: contentDoc.id,
            title: contentData.topicName,
            contentType: contentData.contentType,
            duration: contentData.timeframe,
            contentUrl: contentData.contentUrl,
            week: chapterData.week,
          };
        });

        myContentData.push({
          chapterTitle: chapterData.name,
          week: chapterData.week,
          data: contentsData,
        });
      }

      // Set myContentData and update myClasses with the fetched data
      setClassContent(myContentData);
      setIsGoToClassButtonPressed(true);

      // Update myClasses with the fetched class content
      const updatedMyClasses = myClasses.map(course => {
        if (course.subjectId === courseId) {
          return { ...course, chapters: myContentData };
        }
        return course;
      });

      // Update myClasses in AsyncStorage
      AsyncStorage.setItem('myAsyncStorageCourses', JSON.stringify(updatedMyClasses));
    }
  } catch (error) {
    console.error('Error fetching class content:', error);
    return [];
  }
};





  return (
    <ContentContext.Provider value={{
       contentDetails, setContentDetails, questions, setQuestions,
       totalQuestions, correctQuestions, setCorrectQuestions, setTotalQuestions,
       feedback,setFeedback, content, setContent, week, setWeek, getIntoClass, classContent,
       isGoToClassButtonPressed, setIsGoToClassButtonPressed, getIntoCourse
       }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContentContext = () =>{
    return React.useContext(ContentContext)
}

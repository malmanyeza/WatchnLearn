import React, { useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../firebase'; // Make sure to import your firebase configuration


const ContentContext = React.createContext();

export const ContentProvider = ({ children }) => {
  const [contentDetails, setContentDetails] = useState(null);
  const [questions, setQuestions] = useState(
    [
      {
        questionText: 'What is the chemical symbol for hydrogen?',
        image: require('../assets/images/Maths.jpg'),
        answers: [
          { text: 'H', image: '', isCorrect: true }, // URL_TO_H_IMAGE
          { text: 'He', image: '', isCorrect: false }, // URL_TO_HE_IMAGE
          { text: 'O', image: '', isCorrect: false }, // URL_TO_O_IMAGE
          { text: 'N', image: require('../assets/images/Maths.jpg'), isCorrect: false }, // URL_TO_N_IMAGE
        ],
      },
      {
        questionText: 'Which element is known as the "universal solvent"?',
        image: '', // URL_TO_SOLVENT_IMAGE
        answers: [
          { text: 'Oxygen', image: '', isCorrect: false }, // URL_TO_OXYGEN_IMAGE
          { text: 'Hydrogen', image: '', isCorrect: false }, // URL_TO_HYDROGEN_IMAGE
          { text: 'Carbon', image: '', isCorrect: false }, // URL_TO_CARBON_IMAGE
          { text: 'Water', image: '', isCorrect: true }, // URL_TO_WATER_IMAGE
        ],
      },
      {
        questionText: 'What is the process of a substance changing directly from a solid to a gas called?',
        image: '', // URL_TO_SUBSTANCE_CHANGE_IMAGE
        answers: [
          { text: 'Condensation', image: '', isCorrect: false }, // URL_TO_CONDENSATION_IMAGE
          { text: 'Sublimation', image: require('../assets/images/Maths.jpg'), isCorrect: true }, // URL_TO_SUBLIMATION_IMAGE
          { text: 'Evaporation', image: '', isCorrect: false }, // URL_TO_EVAPORATION_IMAGE
          { text: 'Fusion', image: '', isCorrect: false }, // URL_TO_FUSION_IMAGE
        ],
      },
      {
        questionText: 'What is the chemical formula for water?',
        image: require('../assets/images/Maths.jpg'), // URL_TO_WATER_FORMULA_IMAGE
        answers: [
          { text: 'CO2', image: '', isCorrect: false }, // URL_TO_CO2_IMAGE
          { text: 'H2O', image: '', isCorrect: true }, // URL_TO_H2O_IMAGE
          { text: 'NaCl', image: '', isCorrect: false }, // URL_TO_NACL_IMAGE
          { text: 'C6H12O6', image: '', isCorrect: false }, // URL_TO_C6H12O6_IMAGE
        ],
      },
      {
        questionText: 'What is the smallest unit of an element that retains its chemical properties?',
        image: '', // URL_TO_SMALLEST_UNIT_IMAGE
        answers: [
          { text: 'Atom', image: '', isCorrect: true }, // URL_TO_ATOM_IMAGE
          { text: 'Molecule', image: '', isCorrect: false }, // URL_TO_MOLECULE_IMAGE
          { text: 'Compound', image: '', isCorrect: false }, // URL_TO_COMPOUND_IMAGE
          { text: 'Ion', image: '', isCorrect: false }, // URL_TO_ION_IMAGE
        ],
      },
      {
        questionText: 'Which of the following is a noble gas?',
        image: '', // URL_TO_NOBLE_GAS_IMAGE
        answers: [
          { text: 'Oxygen', image: '', isCorrect: false }, // URL_TO_OXYGEN_IMAGE
          { text: 'Nitrogen', image: '', isCorrect: false }, // URL_TO_NITROGEN_IMAGE
          { text: 'Helium', image: '', isCorrect: true }, // URL_TO_HELIUM_IMAGE
          { text: 'Carbon', image: '', isCorrect: false }, // URL_TO_CARBON_IMAGE
        ],
      },
      {
        questionText: 'What is the pH level of a neutral substance?',
        image: '', // URL_TO_NEUTRAL_SUBSTANCE_IMAGE
        answers: [
          { text: '7', image: '', isCorrect: true }, // URL_TO_7_IMAGE
          { text: '0', image: '', isCorrect: false }, // URL_TO_0_IMAGE
          { text: '14', image: '', isCorrect: false }, // URL_TO_14_IMAGE
          { text: '5', image: '', isCorrect: false }, // URL_TO_5_IMAGE
        ],
      },
      {
        questionText: 'Which type of reaction involves the combination of two or more substances to form a new compound?',
        image: '', // URL_TO_COMBINATION_REACTION_IMAGE
        answers: [
          { text: 'Decomposition', image: '', isCorrect: false }, // URL_TO_DECOMPOSITION_REACTION_IMAGE
          { text: 'Combustion', image: '', isCorrect: false }, // URL_TO_COMBUSTION_REACTION_IMAGE
          { text: 'Synthesis', image: '', isCorrect: true }, // URL_TO_SYNTHESIS_REACTION_IMAGE
          { text: 'Oxidation', image: '', isCorrect: false }, // URL_TO_OXIDATION_REACTION_IMAGE
        ],
      },
      // Add more questions here
    ]
  )
  const [content, setContent] = useState(
    [
      {
        title: 'Atomic Structure',
        week:1,
        data: [
          { id: 1, title: 'Introduction to Atoms', contentType: 'pdf', duration:'20m' , content:require('../assets/PDFs/SamplePDF.pdf'), week:1},
          { id: 2, title: 'Protons, Neutrons, and Electrons', contentType: 'video', duration:'30m', content:require('../assets/Videos/SampleVid.mp4'), week:1 },
          { id: 3, title: 'Atomic Models', contentType: 'video', duration:'25m', content:require('../assets/Videos/SampleVid.mp4'), week:1 },
        ],
      },
      {
        title: 'Chemical Bonding',
        week:1,
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
        data: [
          { id: 7, title: 'Introduction to Chemical Equilibrium', contentType: 'pdf', duration:'15m' , content:require('../assets/PDFs/SamplePDF.pdf'),week:1},
          { id: 8, title: 'Le Chatelier\'s Principle', contentType: 'pdf', duration:'20m', content:require('../assets/PDFs/SamplePDF.pdf'),week:1 },
          { id: 9, title: 'Equilibrium Constants', contentType: 'video', duration:'25m', content:require('../assets/Videos/SampleVid.mp4'),week:1 },
        ],
      },
      {
        title: 'Organic Chemistry',
        week:1,
        data: [
          { id: 10, title: 'Introduction to Organic Chemistry', contentType: 'video', duration:'25m', content:require('../assets/Videos/SampleVid.mp4'),week:1 },
          { id: 11, title: 'Alkanes and Alkenes', contentType: 'video', duration:'30m', content:require('../assets/Videos/SampleVid.mp4'),week:1 },
          { id: 12, title: 'Functional Groups', contentType: 'pdf', duration:'35m', content:require('../assets/PDFs/SamplePDF.pdf'),week:1 },
        ],
      },
      {
          title: 'Chemical Reactions',
          week:1,
          data: [
            { id: 13, title: 'Introduction to Chemical Reactions', contentType: 'pdf', duration:'20m', content:require('../assets/PDFs/SamplePDF.pdf'),week:1 },
            { id: 14, title: 'Types of Chemical Reactions', contentType: 'video', duration:'30m' , content:require('../assets/Videos/SampleVid.mp4'),week:1},
            { id: 15, title: 'Balancing Chemical Equations', contentType: 'video', duration:'25m', content:require('../assets/Videos/SampleVid.mp4'),week:1 },
          ],
        },
        {
          title: 'States of Matter',
          week:2,
          data: [
            { id: 16, title: 'Introduction to States of Matter', contentType: 'pdf', duration:'40m', content:require('../assets/PDFs/SamplePDF.pdf'), week:2 },
            { id: 17, title: 'Gas Laws', contentType: 'pdf', duration:'35m', content:require('../assets/PDFs/SamplePDF.pdf') , week:2},
            { id: 18, title: 'Phase Transitions', contentType: 'video', duration:'30m', content:require('../assets/Videos/SampleVid.mp4') , week:2},
          ],
        },
        {
          title: 'Acids and Bases',
          week:2,
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
  const [classContent, setClassContent] = useState(null)

  const getIntoClass = async (subjectId, termId) => {
   
    try {
      const firestore = getFirestore(app);
  
      // Get chapters and contents for the specified subjectId and termId
      const chaptersRef = collection(
        firestore,
        `subjects/${subjectId}/terms/${termId}/chapters`
      );
      const chaptersSnapshot = await getDocs(chaptersRef);
      
      
      const myContentData = [];
  
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

       console.log('myContentData:', myContentData);
      }
       
      setClassContent(myContentData);
    } catch (error) {
      console.error('Error fetching class content:', error);
      return [];
    }
  };

  return (
    <ContentContext.Provider value={{
       contentDetails, setContentDetails, questions, setQuestions,
       totalQuestions, correctQuestions, setCorrectQuestions, setTotalQuestions,
       feedback,setFeedback, content, setContent, week, setWeek, getIntoClass, classContent
       }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContentContext = () =>{
    return React.useContext(ContentContext)
}

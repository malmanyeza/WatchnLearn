import React, { useState,useMemo } from 'react';

const allSubjectsContext = React.createContext();

export const AllSubjectsProvider = ({ children }) => {

  const DATA = [
      // Mathematics
      {
        id: '8',
        subjectImage: require('../assets/images/Maths.jpg'),
        subjectName: 'Mathematics',
        category: 'Mathematics',
        syllabus: 'Cambridge A Level',
        tutorAvatar: require('../assets/images/MathsTutor.jpg'),
        tutorName: 'John Doe',
        rating: 4.7,
        enrollers: 5000,
        description: `
          Mathematics is the study of numbers, quantity, and space. It plays a crucial role in understanding the natural world, making it an essential subject for various fields. Mathematics enhances problem-solving abilities and critical thinking, making it highly sought after by employers. The subject is divided into pure mathematics, applied mathematics, and statistics, each offering unique insights and applications.
    
          Future Directions: Pursuing Mathematics at the Cambridge A Level opens doors to a myriad of exciting careers. Graduates can venture into fields such as engineering, computer science, actuarial science, finance, data science, cryptography, and research. Additionally, mathematics serves as a solid foundation for postgraduate studies in various specialized areas of science and technology.
        `,
      },
    
      {
        id: '9',
        subjectImage: require('../assets/images/Statistics.jpg'),
        subjectName: 'Statistics',
        category: 'Mathematics',
        syllabus: 'Cambridge A Level',
        tutorAvatar: require('../assets/images/StatisticsTutor.jpg'),
        tutorName: 'Jane Smith',
        rating: 4.8,
        enrollers: 3500,
        description: `
          Statistics is the study of data collection, analysis, interpretation, and presentation. It is an indispensable tool in decision-making and understanding complex phenomena. In the modern world, the demand for statisticians is on the rise, making it a lucrative and impactful career choice.
    
          Future Directions: A Cambridge A Level qualification in Statistics opens pathways to various professions. Statisticians find employment in sectors such as finance, healthcare, market research, environmental science, and government agencies. Additionally, they play a vital role in shaping public policy and addressing societal challenges through data-driven insights.
        `,
      },
    
      {
        id: '10',
        subjectImage: require('../assets/images/Computer Science.jpg'),
        subjectName: 'Computer Science',
        category: 'Mathematics',
        syllabus: 'Cambridge A Level',
        tutorAvatar: require('../assets/images/CompScienceTutor.jpg'),
        tutorName: 'Robert Johnson',
        rating: 4.9,
        enrollers: 4000,
        description: `
          Computer Science explores the principles and practices behind computational systems. In the digital era, computer science drives innovation and technological advancements in various domains. It equips students with problem-solving skills, algorithm design, programming, and an understanding of emerging technologies.
    
          Future Directions: Cambridge A Level in Computer Science opens doors to exciting career opportunities. Graduates can pursue roles in software development, artificial intelligence, cybersecurity, web development, data science, and game design. The subject also provides a strong foundation for entrepreneurial ventures in the tech industry.
        `,
      },
    
      // Language Arts
      {
        id: '11',
        subjectImage: require('../assets/images/English.jpg'),
        subjectName: 'English Literature',
        category: 'Language Arts',
        syllabus: 'Cambridge A Level',
        tutorAvatar: require('../assets/images/EnglishTutor.jpg'),
        tutorName: 'Susan Williams',
        rating: 4.6,
        enrollers: 2800,
        description: `
          English Literature delves into literary works, exploring the human experience through prose, poetry, and drama. It fosters critical thinking, analytical skills, and creativity. Through the study of various authors and genres, students develop a deep appreciation for literature and its impact on culture.
    
          Future Directions: A Cambridge A Level qualification in English Literature offers diverse career paths. Graduates can pursue professions such as writing, journalism, publishing, teaching, public relations, and media production. Moreover, a strong foundation in literature can lead to advanced studies in literary criticism, research, and academia.
        `,
      },
    
      {
        id: '12',
        subjectImage: require('../assets/images/History.png'),
        subjectName: 'World History',
        category: 'Language Arts',
        syllabus: 'Cambridge A Level',
        tutorAvatar: require('../assets/images/HistoryTutor.jpg'),
        tutorName: 'Sophie Leblanc',
        rating: 4.7,
        enrollers: 2400,
        description: `
          World History explores past civilizations, events, and cultural interactions that have shaped the world. It provides insights into how societies have evolved over time, influencing contemporary affairs. By analyzing historical context, students develop critical thinking and gain a broader perspective on global issues.
    
          Future Directions: Cambridge A Level in World History opens doors to diverse career paths. Graduates can pursue careers in archaeology, museum curation, education, law, diplomacy, journalism, and international relations. The subject also serves as an excellent foundation for interdisciplinary studies in political science and anthropology.
        `,
      },
    
      {
        id: '13',
        subjectImage: require('../assets/images/Geography.jpg'),
        subjectName: 'Geography',
        category: 'Language Arts',
        syllabus: 'Cambridge A Level',
        tutorAvatar: require('../assets/images/GeographyTutor.jpg'),
        tutorName: 'Emma Watson',
        rating: 4.8,
        enrollers: 3100,
        description: `
          Geography examines the Earth's landscapes, environments, and human interactions with nature. It helps students understand the complexities of the planet and the impact of human activities. Geographers develop skills in spatial analysis, data interpretation, and environmental sustainability.
    
          Future Directions: A Cambridge A Level qualification in Geography leads to a wide range of career options. Graduates can pursue professions in urban planning, environmental management, cartography, disaster management, and climate science. The subject also provides a strong foundation for pursuing degrees in geology and environmental studies.
        `,
      },
    
      // Science
      {
        id: '14',
        subjectImage: require('../assets/images/Biology.jpg'),
        subjectName: 'Biology',
        category: 'Science',
        syllabus: 'Cambridge A Level',
        tutorAvatar: require('../assets/images/BiologyTutor.jpg'),
        tutorName: 'Emily Johnson',
        rating: 4.9,
        enrollers: 4200,
        description: `
          Biology is the study of living organisms and their interactions with the environment. It provides insights into the mechanisms of life and the diversity of life forms on Earth. The subject emphasizes critical thinking, data analysis, and practical laboratory skills.
    
          Future Directions: A Cambridge A Level qualification in Biology opens doors to various careers. Graduates can pursue professions in medicine, genetics, biotechnology, ecology, pharmacology, and research. Additionally, the study of biology is essential for understanding global challenges like climate change and public health crises.
        `,
      },

      {
        id: '15',
        subjectImage: require('../assets/images/Chemistry.jpg'),
        subjectName: 'Chemistry',
        category: 'Science',
        syllabus: 'Cambridge A Level',
        tutorAvatar: require('../assets/images/Chemistry.jpg'),
        tutorName: 'David Smith',
        rating: 4.7,
        enrollers: 3900,
        description: `
          Chemistry is the study of matter, its properties, composition, and transformations. It explores the fundamental principles governing chemical reactions and the materials that surround us. Chemistry fosters analytical skills, problem-solving abilities, and laboratory techniques.
    
          Future Directions: A Cambridge A Level qualification in Chemistry opens avenues to various exciting careers. Graduates can pursue professions in pharmaceuticals, chemical engineering, environmental science, materials science, and forensic analysis. Additionally, the subject plays a crucial role in advancing sustainable technologies and green chemistry initiatives.
        `,
      },
    
      {
        id: '16',
        subjectImage: require('../assets/images/Physics.jpg'),
        subjectName: 'Physics',
        category: 'Science',
        syllabus: 'Cambridge A Level',
        tutorAvatar: require('../assets/images/Physics.jpg'),
        tutorName: 'Robert Johnson',
        rating: 4.9,
        enrollers: 4000,
        description: `
          Physics is the study of matter, energy, and their interactions. It forms the basis for many scientific disciplines and technological advancements. Physics equips students with critical thinking, mathematical reasoning, and problem-solving skills.
    
          Future Directions: A Cambridge A Level qualification in Physics opens doors to exciting career opportunities. Graduates can pursue professions in engineering, research, astrophysics, medical physics, space exploration, and renewable energy. Additionally, physicists play a vital role in addressing global challenges such as climate change and sustainability.
        `,
      },
    
      {
        id: '17',
        subjectImage: require('../assets/images/Psychology.jpg'),
        subjectName: 'Psychology',
        category: 'Science',
        syllabus: 'Cambridge A Level',
        tutorAvatar: require('../assets/images/PschologyTutor.jpg'),
        tutorName: 'Lisa Brown',
        rating: 4.8,
        enrollers: 3200,
        description: `
          Psychology is the scientific study of the mind, behavior, and mental processes. It explores human cognition, emotions, and social interactions. Psychology enhances critical thinking, research skills, and empathy.
    
          Future Directions: A Cambridge A Level qualification in Psychology offers diverse career paths. Graduates can pursue professions in counseling, clinical psychology, educational psychology, forensic psychology, and human resources. Additionally, psychology provides valuable insights into understanding human behavior in various contexts, such as marketing and public policy.
        `,
      },
    
      // Social Studies/Social Sciences
      {
        id: '18',
        subjectImage: require('../assets/images/History.png'),
        subjectName: 'History',
        category: 'Social Studies/Social Sciences',
        syllabus: 'Cambridge A Level',
        tutorAvatar: require('../assets/images/HistoryTutor.jpg'),
        tutorName: 'Susan Williams',
        rating: 4.6,
        enrollers: 2800,
        description: `
          History studies past events, societies, and civilizations. It develops critical analysis, research, and interpretative skills. By understanding historical contexts, students gain insights into the evolution of human societies.
    
          Future Directions: A Cambridge A Level qualification in History leads to diverse career paths. Graduates can pursue professions in archaeology, museum curation, education, law, journalism, and international relations. Additionally, historical knowledge is valuable in shaping public policy and understanding geopolitical dynamics.
        `,
      },
    
      {
        id: '19',
        subjectImage: require('../assets/images/Economics.jpg'),
        subjectName: 'Economics',
        category: 'Social Studies/Social Sciences',
        syllabus: 'Cambridge A Level',
        tutorAvatar: require('../assets/images/EconomicsTutor.jpg'),
        tutorName: 'Michael Brown',
        rating: 4.7,
        enrollers: 3400,
        description: `
          Economics examines the allocation of resources and decision-making within societies. It analyzes how individuals, businesses, and governments interact in the global economy. Economics enhances analytical skills, critical thinking, and understanding of economic principles.
    
          Future Directions: A Cambridge A Level qualification in Economics opens doors to various careers. Graduates can pursue professions in finance, banking, policy analysis, development economics, and international trade. Additionally, economists play a crucial role in addressing economic inequality and sustainability challenges.
        `,
      },
    
      {
        id: '20',
        subjectImage: require('../assets/images/Sociology.jpg'),
        subjectName: 'Sociology',
        category: 'Social Studies/Social Sciences',
        syllabus: 'Cambridge A Level',
        tutorAvatar: require('../assets/images/SociologyTutor.jpg'),
        tutorName: 'Sophia Lee',
        rating: 4.8,
        enrollers: 3000,
        description: `
          Sociology explores human society, social relationships, and cultural phenomena. It analyzes how societies are structured and how individuals interact within these structures. Sociology enhances critical thinking, research, and understanding of social issues.
    
          Future Directions: A Cambridge A Level qualification in Sociology opens avenues to diverse career paths. Graduates can pursue professions in social work, community development, market research, advocacy, and public policy. Additionally, sociologists play a significant role in addressing social inequalities and promoting social justice.
        `,
      },
    
      {
        id: '21',
        subjectImage: require('../assets/images/Geography.jpg'),
        subjectName: 'Geography',
        category: 'Social Studies/Social Sciences',
        syllabus: 'Cambridge A Level',
        tutorAvatar: require('../assets/images/Geography.jpg'),
        tutorName: 'Emma Watson',
        rating: 4.8,
        enrollers: 3100,
        description: `
          Geography examines the Earth's landscapes, environments, and human interactions with nature. It helps students understand the complexities of the planet and the impact of human activities. Geographers develop skills in spatial analysis, data interpretation, and environmental sustainability.
    
          Future Directions: A Cambridge A Level qualification in Geography leads to a wide range of career options. Graduates can pursue careers in urban planning, environmental management, cartography, disaster management, and climate science. The subject also provides a strong foundation for pursuing degrees in geology and environmental studies.
        `,
      },

      // Foreign Languages
  {
    id: '22',
    subjectImage: require('../assets/images/French.jpg'),
    subjectName: 'French',
    category: 'Foreign Languages',
    syllabus: 'Cambridge A Level',
    tutorAvatar: require('../assets/images/FrenchTutor.jpg'),
    tutorName: 'Emily Wilson',
    rating: 4.7,
    enrollers: 2400,
    description: `
      French is a widely spoken language used in international diplomacy, business, and culture. Learning French opens opportunities for careers in translation, tourism, international business, and diplomatic services.

      Future Directions: A Cambridge A Level qualification in French leads to diverse career paths. Graduates can pursue professions as translators, interpreters, language educators, diplomats, and international business consultants. Additionally, knowledge of French is valuable for working with international partners and organizations, especially in francophone regions. Moreover, fluency in French can be advantageous for individuals aspiring to work in international organizations like the United Nations or in positions involving diplomatic relations.
    `,
  },

  {
    id: '23',
    subjectImage: require('../assets/images/Spanish.jpg'),
    subjectName: 'Spanish',
    category: 'Foreign Languages',
    syllabus: 'Cambridge A Level',
    tutorAvatar: require('../assets/images/SpanishTutor.jpg'),
    tutorName: 'Carlos Martinez',
    rating: 4.6,
    enrollers: 2200,
    description: `
      Spanish is one of the most widely spoken languages globally, with a rich cultural heritage. Learning Spanish can open doors to exciting career opportunities and meaningful cross-cultural experiences.

      Future Directions: A Cambridge A Level qualification in Spanish offers diverse career paths. Graduates can pursue professions as translators, language instructors, tour guides, international relations specialists, and humanitarian workers. Additionally, fluency in Spanish is a valuable skill in fields such as diplomacy, international business, and global health initiatives.
    `,
  },

  {
    id: '24',
    subjectImage: require('../assets/images/Chinese.jpg'),
    subjectName: 'Chinese',
    category: 'Foreign Languages',
    syllabus: 'Cambridge A Level',
    tutorAvatar: require('../assets/images/ChineseTutor.jpg'),
    tutorName: 'Li Wei',
    rating: 4.9,
    enrollers: 1800,
    description: `
      Chinese (Mandarin) is the most spoken language globally, making it highly valuable in the global job market. Learning Chinese offers a unique opportunity to engage with Chinese culture and facilitate international communication.

      Future Directions: A Cambridge A Level qualification in Chinese leads to exciting career opportunities. Graduates can pursue professions as translators, language educators, international trade specialists, diplomats, and cultural exchange coordinators. Additionally, proficiency in Chinese can be advantageous for business ventures and collaborations with Chinese companies.
    `,
  },
    
  ];

  const memoizedSubjects = useMemo(() => DATA, []);
  const [filteredSubjects, setFilteredSubjects] = useState(DATA);

  return (
    <allSubjectsContext.Provider value={{
      subjects: memoizedSubjects, 
       filteredSubjects, setFilteredSubjects
       }}>
      {children}
    </allSubjectsContext.Provider>
  );
};

export const useAllSubjectsContext = () =>{
    return React.useContext(allSubjectsContext)
}

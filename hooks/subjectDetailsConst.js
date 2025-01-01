import React, { useState } from 'react';

const SubjectContext = React.createContext();

export const SubjectProvider = ({ children }) => {
  const [subjectDetails, setSubjectDetails] = useState(null);

  return (
    <SubjectContext.Provider value={{ subjectDetails, setSubjectDetails }}>
      {children}
    </SubjectContext.Provider>
  );
};

export const useSubjectContext = () =>{
    return React.useContext(SubjectContext)
}

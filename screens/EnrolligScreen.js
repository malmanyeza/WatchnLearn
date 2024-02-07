import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import CoverAndHeader from '../components/EnrollingScreen/CoverAndHeader';
import Description from '../components/EnrollingScreen/Descriptions';
import EnrollButton from '../components/EnrollingScreen/EnrollButton';
import { useSubjectContext } from '../hooks/subjectDetailsConst';
import { useThemeContext } from '../hooks/themeContext';
import { useAllSubjectsContext } from '../hooks/allSubjectsContext';

const EnrollingScreen = () => {

  const {enroll} = useAllSubjectsContext()

  const {theme} = useThemeContext()
  const{subjectDetails} = useSubjectContext()
  const item = subjectDetails;

  return (
    <View style={
      [styles.container,
      {backgroundColor: theme.colors.primaryBackground},
      ]
    }>
     <Header
        title={item.name}
     />
     <CoverAndHeader
        subjectImage={item.subjectImageUrl}
        subjectName={item.name}
        tutorAvatar={item.tutor.image}
        tutorName={item.tutor.name}
     />
     <Description
        descriptionText={item.description}
     />
     <EnrollButton
       onPress={() => enroll(item.subjectId,item.name)}
     />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EnrollingScreen;

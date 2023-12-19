import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import CoverAndHeader from '../components/EnrollingScreen/CoverAndHeader';
import Description from '../components/EnrollingScreen/Descriptions';
import EnrollButton from '../components/EnrollingScreen/EnrollButton';
import { useSubjectContext } from '../hooks/subjectDetailsConst';
import { useThemeContext } from '../hooks/themeContext';

const EnrollingScreen = () => {

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
        title={item.subjectName}
     />
     <CoverAndHeader
        subjectImage={item.subjectImage}
        subjectName={item.subjectName}
        tutorAvatar={item.tutorAvatar}
        tutorName={item.tutorName}
        rating={item.rating}
     />
     <Description
        descriptionText={item.description}
     />
     <EnrollButton/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EnrollingScreen;

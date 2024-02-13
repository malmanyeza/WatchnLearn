import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import CoverAndHeader from '../components/EnrollingScreen/CoverAndHeader';
import Description from '../components/EnrollingScreen/Descriptions';
import EnrollButton from '../components/EnrollingScreen/EnrollButton';
import { useSubjectContext } from '../hooks/subjectDetailsConst';
import { useThemeContext } from '../hooks/themeContext';
import { useAllSubjectsContext } from '../hooks/allSubjectsContext';
import { useNavigation } from '@react-navigation/native';

const EnrollingScreen = () => {

  const {enroll} = useAllSubjectsContext()
  const navigation = useNavigation();
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
       onPress={() => item.isEnrolled?navigation.navigate('MyClasses'):enroll(item.subjectId,item.name)}
       isEnrolled={item.isEnrolled}
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

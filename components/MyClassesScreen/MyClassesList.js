import React, {memo} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import MyClassCard from './MyClassCard';
import { useNavigation } from '@react-navigation/native';
import { useThemeContext } from '../../hooks/themeContext';

const MyClassesList = () => {

  const {theme} = useThemeContext()

  const navigation = useNavigation()

  const goToClass =()=>{
    navigation.navigate('MyClass')
  }

  const goToQuestionPapers =()=>{
    navigation.navigate('QuestionPapers')
  }

  const dataset = [
    {
      subject: 'Mathematics',
      forms: [
        { form: 'Form 5', hours:134, progress: 90, term:1 },
        { form: 'Form 6', hours:200, progress: 85, term:2 },
        // Add more forms for Mathematics
      ],
    },
    {
      subject: 'Physics',
      forms: [
        { form: 'Form 5', hours: 145, progress: 75 , term:3},
        { form: 'Form 6', hours:130, progress: 89, term:1 },
        // Add more forms for Physics
      ],
    },
    // Add more subjects as needed
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.subjectContainer}>
        <View style={styles.headerContainer}>
        <Text style={[
          styles.subjectText,
          {color:theme.colors.text}
          ]}>{item.subject}</Text>
          <TouchableOpacity>
            <Text style={[
              styles.syllabus,
              {backgroundColor:theme.colors.secondaryBackground},
              {color:theme.colors.text}
              ]}>Syllabus</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={goToQuestionPapers}
          >
            <Text style={[
              styles.syllabus,
              {backgroundColor:theme.colors.secondaryBackground},
              {color:theme.colors.text}
              ]}>Past papers</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[
              styles.syllabus,
              {backgroundColor:theme.colors.secondaryBackground},
              {color:theme.colors.text}
              ]}>Forum</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={item.forms}
          renderItem={renderForm}
          keyExtractor={(formItem, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  const renderForm = ({ item }) => {
    return (
      <MyClassCard
       form={item.form}
       totalHours={item.hours}
       subjectImage={require('../../assets/images/Chemistry.jpg')}
       progress={item.progress}
       term={item.term}
       goToClass={()=>goToClass()}
      />
    );
  };

  return (
    <FlatList
      data={dataset}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  subjectContainer: {
    padding: 10,
    marginVertical: 20,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  subjectText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  syllabus: {
    backgroundColor: '#f1f1f1',
    color: '#666',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    minWidth: 150,
  },
  formText: {
    fontSize: 16,
  },
});

export default memo(MyClassesList);

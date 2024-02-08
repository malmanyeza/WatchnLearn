import React, {memo} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import MyClassCard from './MyClassCard';
import { useNavigation } from '@react-navigation/native';
import { useThemeContext } from '../../hooks/themeContext';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';
import { useContentContext } from '../../hooks/contentContext';

const MyClassesList = () => {

  const {getIntoClass} = useContentContext()
  const {myClasses, loadingClasses} = useAllSubjectsContext()

  const {theme} = useThemeContext()

  const navigation = useNavigation()

  const goToClass =(subjectId, termId)=>{
    getIntoClass(subjectId, termId)
    navigation.navigate('MyClass')
  }

  const goToQuestionPapers =()=>{
    navigation.navigate('QuestionPapers')
  }

  // const dataset = [
  //   {
  //     subject: 'Mathematics',
  //     forms: [
  //       { form: 'Form 5', hours:134, progress: 90, term:1 },
  //       { form: 'Form 6', hours:200, progress: 85, term:2 },
  //       // Add more forms for Mathematics
  //     ],
  //   },
  

  const renderItem = ({ item }) => {

    const sabaId = item.subjectId
    
    return (
      <View style={styles.subjectContainer}>
        <View style={styles.headerContainer}>
          <Text style={[styles.subjectText, {color: theme.colors.text}]}>{item.subject}</Text>
          <TouchableOpacity>
            <Text style={[styles.syllabus, {backgroundColor: theme.colors.secondaryBackground}, {color: theme.colors.text}]}>Syllabus</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToQuestionPapers}>
            <Text style={[styles.syllabus, {backgroundColor: theme.colors.secondaryBackground}, {color: theme.colors.text}]}>Past papers</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={item.terms.sort((a, b) => a.termNumber - b.termNumber)}
          renderItem={({ item }) => renderForm(item, sabaId)} // Pass subjectId here
          keyExtractor={(formItem, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };
  

  const renderForm = (item, subjectId) => {


    return (
      <MyClassCard
       form={item.form}
       totalHours={'20'}
       subjectImage={require('../../assets/images/Chemistry.jpg')}
       progress={20}
       term={item.term}
       goToClass={()=>goToClass(subjectId, item.termId)}
      />
    );
  };

  return (
    <View>
      {
        myClasses.length>0?
        <FlatList
        data={myClasses}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
      :
        loadingClasses?
        <View style={{alignItems:'center',marginTop:10}}>
          <Text style={{fontSize:20,fontFamily:'ComicNeue-Bold',color:theme.colors.text}}>Loading...</Text>
        </View>
      :
      <View style={{alignItems:'center',marginTop:10}}>
        <Text style={{fontSize:20,fontFamily:'ComicNeue-Bold',color:theme.colors.text}}>No classes yet</Text>
      </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  subjectContainer: {
    marginTop: 30,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  subjectText: {
    fontSize: 25,
    fontFamily:'ComicNeue-Bold',
    marginBottom: 5,
    marginLeft:15
  },
  syllabus: {
    backgroundColor: '#f1f1f1',
    color: '#666',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 20,
    fontFamily:'ComicNeue-Bold',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
    minWidth: 150,
  },
  formText: {
    fontSize: 16,
  },
});

export default memo(MyClassesList);

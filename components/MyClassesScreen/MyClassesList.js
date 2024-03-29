import React, {memo, useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import MyClassCard from './MyClassCard';
import { useNavigation } from '@react-navigation/native';
import { useThemeContext } from '../../hooks/themeContext';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';
import { useContentContext } from '../../hooks/contentContext';
import Icon from 'react-native-vector-icons/Ionicons';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const MyClassesList = () => {

  const {getIntoClass, classContent,isGoToClassButtonPressed, setIsGoToClassButtonPressed} = useContentContext()
  const {myClasses, loadingClasses,unEnroll, setMyCurrentChapters, myCurrentChapters, setMyContentState} = useAllSubjectsContext()

  const {theme} = useThemeContext()

  const navigation = useNavigation()


  const goToClass =(item, subjectId)=>{

    getIntoClass(subjectId,item.termId)
    setMyCurrentChapters(item.chapters)
    console.log('Here are my current chapters',classContent)
    setMyContentState(prevState => ({
      ...prevState,
      currentSubject: subjectId,
      currentTerm: item.termId
    }));
    navigation.navigate('MyClass')
  }


  // useEffect(()=>{
  //   if(classContent.length>0&&isGoToClassButtonPressed){
  //     console.log('Here is my current chapters:',myCurrentChapters)
  //     navigation.navigate('MyClass')
  //     setIsGoToClassButtonPressed(false)
  //   }
  // },[classContent, isGoToClassButtonPressed])

  const goToQuestionPapers =()=>{
    navigation.navigate('QuestionPapers')
  }

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDelete = (subjectId) => {
    unEnroll(subjectId)
    setDeleteModalVisible(false); // Close the modal after deletion
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false); // Close the modal without deleting
  };

  const openDeleteModal = () => {
    setDeleteModalVisible(true);
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
    const subImage = item.imagePath
    
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
          <TouchableOpacity onPress={openDeleteModal} style={styles.trashIcon}>
            <Icon name="trash-outline" size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={item.terms.sort((a, b) => a.termNumber - b.termNumber)}
          renderItem={({ item }) => renderForm(item, sabaId,subImage)} // Pass subjectId here
          keyExtractor={(formItem, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <DeleteConfirmationModal
          isVisible={isDeleteModalVisible}
          onDelete={()=>handleDelete(item.subjectId)}
          onCancel={handleCancelDelete}
        />
      </View>
    );
  };
  

  const renderForm = (item, subjectId, subImage) => {


    return (
      <MyClassCard
       form={item.form}
       totalHours={'20'}
       subjectImage={subImage}
       progress={20}
       term={item.term}
       goToClass={()=>goToClass(item, subjectId)}
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
    alignItems: 'center',
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
  trashIcon: {
    position: 'absolute',
    right: 10,
  },
});

export default memo(MyClassesList);

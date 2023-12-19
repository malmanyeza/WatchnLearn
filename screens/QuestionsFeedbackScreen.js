import React,{useCallback} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from '../components/Header'
import PassMessage from '../components/QuestionsHomeSceen/PassMessage';
import SubmissionComponent from '../components/QuestionsHomeSceen/SubmissionComponent';
import FeedbackComponent from '../components/QuestionsHomeSceen/FeedbackComponent';
import { useContentContext } from '../hooks/contentContext';
import { useNavigation } from '@react-navigation/native';
import { useThemeContext } from '../hooks/themeContext';

const QuestionsFeedbackScreen = () => {
    const {theme} = useThemeContext()
    const navigation = useNavigation()
    const {correctQuestions, totalQuestions} = useContentContext()
    const  grade =(correctQuestions/totalQuestions)*100

    const goToMyClass = useCallback(()=>{
      navigation.navigate('MyClass')
    })
  
  return (
    <View style={[styles.container,{backgroundColor:theme.colors.primaryBackground}]}>
      <Header navigateTo={goToMyClass}title={'Introduction'}/>
      <PassMessage grade={grade}/>
      <Text style={styles.subtitle}>Introduction</Text>
      {grade<=50?<SubmissionComponent/>:null}
      <FeedbackComponent grade={grade}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitle:{
    marginLeft:10,
    marginVertical:20,
    fontWeight:'bold',
    fontSize:18
  }
});

export default QuestionsFeedbackScreen;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Colors from '../constants/Colors';
import { useContentContext } from '../hooks/contentContext';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { useThemeContext } from '../hooks/themeContext';
  

const QuestionScreen = () => {
  const {theme} = useThemeContext()
  const navigation =  useNavigation()
  const {questions, setCorrectQuestions, setTotalQuestions, setFeedback} = useContentContext()
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(questions.length).fill(null));

  const handleAnswerSelect = (answerIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleSubmit = () => {
    // Calculate the correct count and display the result
    const correctCount = questions.reduce((count, question, index) => {
      const selectedAnswerIndex = selectedAnswers[index];
      const isCorrect = question.answers[selectedAnswerIndex]?.isCorrect;
  
      return count + (isCorrect ? 1 : 0);
    }, 0);
  
    const totalCount = questions.length;
    setCorrectQuestions(correctCount);
    setTotalQuestions(totalCount);
  
    const feedbackData = questions.map((question, index) => {
      const selectedAnswerIndex = selectedAnswers[index];
      const answer = question.answers[selectedAnswerIndex];
  
      return {
        isCorrect: answer?.isCorrect,
        answer: answer?.text,
        question: question.questionText,
      };
    });
  
    setFeedback(feedbackData);
    navigation.navigate('QuestionsFeedback');
  };
  

  const question = questions[currentQuestion];

  return (
    <View style={
      [
        styles.container,
        {backgroundColor:theme.colors.primaryBackground}
      ]
    }>
      <Header/>
      <View style={styles.questionContainer}>
        <Text style={[styles.questionText, { color: theme.colors.text }]}>{question.questionText}</Text>

        {/* Display question image if available */}
        {question.image && <Image source={{ uri: question.image }} style={styles.image} />}

        {question.answers.map((answer, answerIndex) => (
          <TouchableOpacity
            key={answerIndex}
            style={[
              styles.answerButton,
              selectedAnswers[currentQuestion] === answerIndex && styles.selectedAnswerButton,
            ]}
            onPress={() => handleAnswerSelect(answerIndex)}
          >
            {selectedAnswers[currentQuestion] === answerIndex ? (
              <FontAwesome name={'check-circle'} color={Colors.primary} size={24} style={styles.icon} />
            ) : (
              <FontAwesome name={'circle-o'} color={'gray'} size={24} style={styles.icon} />
            )}
            <Text style={styles.answerButtonText}>{answer.text}</Text>

            {/* Display answer image if available */}
            {answer.image && <Image source={{ uri: answer.image }} style={styles.image} />}

          </TouchableOpacity>
        ))}
      </View>
      {currentQuestion < questions.length - 1 ? (
        <View style={styles.buttons}>
            {currentQuestion===0?null:
           ( <TouchableOpacity style={styles.nextButton} onPress={handlePrev}>
                <Text style={styles.nextButtonText}>Prev</Text>
            </TouchableOpacity>)
            }
            <Text style={styles.progress}>{currentQuestion+1}/{questions.length}</Text>
            <TouchableOpacity style={
              [
                styles.nextButton,
                {backgroundColor:theme.colors.primaryBackground}
              ]
            } onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttons}>
            {currentQuestion===0?null:
           ( <TouchableOpacity style={styles.nextButton} onPress={handlePrev}>
                <Text style={styles.nextButtonText}>Prev</Text>
            </TouchableOpacity>)
            }
            <TouchableOpacity style={[styles.nextButton,{backgroundColor:Colors.primary}]} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionContainer: {
    paddingHorizontal:10,
    flex: 1,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
  },
  answerButton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  selectedAnswerButton: {
    borderColor: Colors.primary,
  },
  answerButtonText: {
    fontSize: 16,
  },
  nextButton: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    borderColor: Colors.primary,
    borderWidth: 1,
    margin:10
  },
  nextButtonText: {
    color: Colors.primary,
    fontSize: 18,
    marginHorizontal:30
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    marginHorizontal:30
  },
  buttons:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:20,
    alignItems:'baseline'

  },
  icon:{
    marginRight:10
  },
  progress:{
    color:Colors.primary,
    fontSize:20,
    margin:10
  }
});

export default QuestionScreen;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet , Image, ScrollView, Dimensions} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import { useContentContext } from '../hooks/contentContext';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { useThemeContext } from '../hooks/themeContext';
import { useCompletedWorkContext } from '../hooks/completedWorkContext';
import { useAllSubjectsContext } from '../hooks/allSubjectsContext';

const {width, height} = Dimensions.get('screen');

const QuestionScreen = () => {
  const { contentDetails } = useContentContext();
  const { contentUrl } = contentDetails;
  const { updateCompletedWork } = useCompletedWorkContext();
  const { myContentState } = useAllSubjectsContext();
  const { theme } = useThemeContext();
  const navigation = useNavigation();
  const { questions, setCorrectQuestions, setTotalQuestions, setFeedback } = useContentContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(questions.length).fill(null));

  const currentSubject = myContentState.currentSubject; // Replace with the actual subject
  const contentType = myContentState.currentContentType;
  const contentDuration = myContentState.currentContentDuration;
  const chapterName = myContentState.currentChapterName;

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
    // Calculate the correct count and percentage mark
    const correctCount = questions.reduce((count, question, index) => {
      const selectedAnswerIndex = selectedAnswers[index];
      const isCorrect = question.answers[selectedAnswerIndex]?.isCorrect;
  
      return count + (isCorrect ? 1 : 0);
    }, 0);
  
    const totalCount = questions.length;
    const percentageMark = Math.round((correctCount / totalCount) * 100); // Calculate percentage mark
  
    // Save feedback data
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
  
    // Update the completed work with the percentage mark
    updateCompletedWork(currentSubject, contentUrl, contentType, contentDuration,chapterName, percentageMark);
  
    // Navigate to the feedback screen
    navigation.navigate('QuestionsFeedback');
  };
  

  const question = questions[currentQuestion];

  return (
    <View style={[
      styles.container,
      { backgroundColor: theme.colors.primaryBackground }
    ]}>
      <Header />
      <ScrollView>
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
              <View style={styles.answerTextAndCircleButton}>
                {selectedAnswers[currentQuestion] === answerIndex ? (
                  <FontAwesome name={'check-circle'} color={Colors.primary} size={24} style={styles.icon} />
                ) : (
                  <FontAwesome name={'circle-o'} color={'gray'} size={24} style={styles.icon} />
                )}
                <Text style={styles.answerButtonText}>{answer.text}</Text>
              </View>
              {/* Display answer image if available */}
              {answer.image && <Image source={ {uri:answer.image} } style={[styles.image, { marginBottom: 0 }]} />}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {currentQuestion < questions.length - 1 ? (
        <View style={styles.buttons}>
          {currentQuestion === 0 ? null : (
            <TouchableOpacity style={styles.nextButton} onPress={handlePrev}>
              <Text style={styles.nextButtonText}>Prev</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.progress}>{currentQuestion + 1}/{questions.length}</Text>
          <TouchableOpacity style={[
            styles.nextButton,
            { backgroundColor: theme.colors.primaryBackground }
          ]} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttons}>
          {currentQuestion === 0 ? null : (
            <TouchableOpacity style={styles.nextButton} onPress={handlePrev}>
              <Text style={styles.nextButtonText}>Prev</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.progress}>{currentQuestion + 1}/{questions.length}</Text>
          <TouchableOpacity style={[styles.nextButton, { backgroundColor: Colors.primary }]} onPress={handleSubmit}>
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
    paddingHorizontal: 10,
    flex: 1,
  },
  questionText: {
    fontSize: 18,
    marginVertical: 30,
    marginBottom: 50,
  },
  answerButton: {
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
    flex: 1, // Allow flexible width for wrapping
    flexWrap: 'wrap', // Ensures the text wraps within its container
    overflow: 'hidden', // Prevents overflow outside the container
    paddingHorizontal: 5, // Adds padding inside the button
  },
  nextButton: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    borderColor: Colors.primary,
    borderWidth: 1,
    margin: 10,
  },
  nextButtonText: {
    color: Colors.primary,
    fontSize: 18,
    marginHorizontal: 30,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    marginHorizontal: 30,
  },
  buttons: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'baseline'
  },
  icon: {
    marginRight: 10,
  },
  progress: {
    color: Colors.primary,
    fontSize: 20,
    margin: 10,
  },
  image: {
    width: '100%',
    height: height * 0.4,
    resizeMode: 'contain',
    marginBottom: 30,
    borderRadius: 5,
    marginTop: 10,
  },
  answerTextAndCircleButton: {
    flexDirection: 'row',
  }
});

export default QuestionScreen;

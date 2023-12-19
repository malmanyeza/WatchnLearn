import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import { useContentContext } from '../hooks/contentContext';
import Header from '../components/Header';
import { useThemeContext } from '../hooks/themeContext';

const FeedbackScreen = () => {

    const {theme} = useThemeContext()
    const {feedback} = useContentContext()

  return (
    <View style={[styles.container, {backgroundColor:theme.colors.primaryBackground}]}>
      <Header title={'Feedback'} />
      <FlatList
        data={feedback}
        renderItem={({ item, index }) => (
          <View style={styles.feedbackItem}>
            <Text style={styles.feedbackText}>{'Q'+ (index+1)}</Text>
            <View style={[styles.answerContainer, { borderColor: item.isCorrect ? Colors.primary : 'red' }]}>
             { item.isCorrect?<Text style={styles.correct}>Correct</Text>
             :
              <Text style={styles.wrong}>Wrong</Text>}
              <Text style={styles.question}>{item.question}</Text>
              <Text style={{fontWeight:'bold', marginVertical:10}}>{item.isCorrect ? 'Your answer:': 'The correct answer:'}</Text>
              <Text style={styles.answerText}>{item.answer}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feedbackItem: {
    marginBottom: 20,
    marginHorizontal: 10,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft:5
  },
  answerContainer: {
    borderRadius: 10,
    padding: 10,
    borderWidth:1
  },
  answerText: {
    fontSize: 16,
  },
  question:{
  },
  correct:{
    marginBottom:10,
    fontWeight:'bold',
    color:Colors.primary
  },
  wrong:{
    marginBottom:10,
    fontWeight:'bold',
    color:'red'
  }
});

export default FeedbackScreen;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PapersList from '../components/QuestionPapersScreen/PapersList';
import Header from '../components/Header';
import SearchBar from '../components/QuestionPapersScreen/SearchBar';
import { useThemeContext } from '../hooks/themeContext';

const QuestionPapersScreen = () => {

  const {theme} = useThemeContext()

  return (
    <View style={
      [styles.container,
      {backgroundColor: theme.colors.primaryBackground},
      ]
    }>
      <Header title="Question Papers" />
      <SearchBar searchBarTitle ={'Search paper by year'} />
      <PapersList/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default QuestionPapersScreen;

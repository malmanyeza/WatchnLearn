import React,{useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { useThemeContext } from '../../hooks/themeContext';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';
import { useNavigation } from '@react-navigation/native';

const YearPapers = ({ year, papers }) => {
  const { theme } = useThemeContext();
  const {
    currentQuestionPaperOrSyllabus,
    setCurrentQuestionPaperOrSyllabus,
  } = useAllSubjectsContext();
  const navigation = useNavigation();

  // Function to open a selected question paper
  const openQuestionPaper = (paper) => {
    console.log('Here is the question paper URL:', paper.documentUrl);

    // Update the shared state and navigate to the PDF screen
    setCurrentQuestionPaperOrSyllabus(paper.documentUrl);
    navigation.navigate('PDF');
  };

  const renderPaper = (paper) => {
    let backgroundColor = theme.colors.primaryBackground;
    let textColor = theme.colors.text;
    let borderColor = theme.colors.secondaryBackground

    switch (paper.paperStatus) {
      case 'Completed':
        backgroundColor = theme.colors.secondaryBackground;
        textColor = theme.colors.secondaryBackground;
        break;
      case 'In Progress':
        backgroundColor = '#8CABFF';
        textColor = 'white';
        break;
      default:
        backgroundColor = theme.colors.primaryBackground
        textColor = theme.colors.text
        break;
    }

    return (
      <TouchableOpacity
        key={paper.id}
        onPress={() => openQuestionPaper(paper)}
        style={styles.paperContainer}
      >
        <View style={[styles.paper, { backgroundColor , borderColor}]}>
          <Text style={{ color: textColor }}>{paper.title}</Text>
        </View>
        <Text style={{ color: backgroundColor }}>{paper.paperStatus}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.primaryBackground },
      ]}
    >
      <Text style={styles.yearHeader}>{year}</Text>
      <View style={styles.papersContainer}>
        {papers.map((paper) => renderPaper(paper))}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    padding: 10,
    
  },
  yearHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  papersContainer: {
    flexDirection: 'row',
  },
  paper: {
    padding:5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 5,
  },
  paperStatus: {
    textAlign: 'center',
    marginTop: 10,
    color: 'gray',
  },
  paperContainer:{
    marginHorizontal:10
  }
});

export default YearPapers;

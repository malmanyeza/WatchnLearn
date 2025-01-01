import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import YearPapers from './YearPapers';
import { useThemeContext } from '../../hooks/themeContext';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';
import { UIActivityIndicator } from 'react-native-indicators';
import FontSizes from '../../constants/FontSizes';

const PapersList = () => {
  const { currentQuestionPapers } = useAllSubjectsContext();
  const { theme } = useThemeContext();

  // If currentQuestionPapers is empty, show the ActivityIndicator
  if (currentQuestionPapers.length === 0) {
    return (
      <View
        style={[
          styles.activityIndicatorContainer,
          { backgroundColor: theme.colors.primaryBackground },
        ]}
      >
        <UIActivityIndicator style={{marginTop:50, marginBottom:10}} size={30} color={theme.colors.text} />
        <Text style={{color:theme.colors.text, fontSize: FontSizes.subheading2, marginTop:20}} >Loading question papers</Text>
      </View>
    );
  }

  // Group papers by year and transform the structure
  const groupedPapers = currentQuestionPapers.reduce((acc, paper) => {
    const { year, paperNumber, month, documentUrl } = paper;
    const paperTitle = `Paper ${paperNumber} (${month})`; // Constructing a title from the month and paperNumber

    if (!acc[year]) {
      acc[year] = [];
    }

    acc[year].push({
      id: `${year}-${paperNumber}`, // Ensure unique ID by combining year and paperNumber
      title: paperTitle,
      paperStatus: 'Not Done', // Placeholder status, update as needed
      documentUrl,
    });

    return acc;
  }, {});

  // Transform the groupedPapers object into an array for rendering
  const papersData = Object.keys(groupedPapers).map((year) => ({
    year: parseInt(year, 10),
    papers: groupedPapers[year],
  }));

  const renderItem = ({ item }) => (
    <YearPapers
      year={item.year}
      papers={item.papers.map((paper) => ({
        ...paper,
        key: paper.id, // Add a unique key prop for each paper
      }))}
    />
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.primaryBackground },
      ]}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={papersData}
        renderItem={renderItem}
        keyExtractor={(item) => item.year.toString()} // Unique key for each year
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  activityIndicatorContainer: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PapersList;

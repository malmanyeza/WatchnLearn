import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import YearPapers from './YearPapers';
import { useThemeContext } from '../../hooks/themeContext';

const dummyData = [
    {
      year: 2013,
      papers: [
        { id: 1, title: 'Paper 1', paperStatus: 'Completed' },
        { id: 2, title: 'Paper 2', paperStatus: 'In Progress' },
      ],
    },
    {
      year: 2014,
      papers: [
        { id: 3, title: 'Paper 1', paperStatus: 'Not Done' },
      ],
    },
    {
      year: 2015,
      papers: [
        { id: 4, title: 'Paper 1', paperStatus: 'Completed' },
        { id: 5, title: 'Paper 2', paperStatus: 'In Progress' },
        { id: 6, title: 'Paper 3', paperStatus: 'Not Done' },
      ],
    },
    {
      year: 2016,
      papers: [
        { id: 7, title: 'Paper 1', paperStatus: 'Not Done' },
        { id: 8, title: 'Paper 2', paperStatus: 'Completed' },
      ],
    },
    {
      year: 2017,
      papers: [
        { id: 9, title: 'Paper 1', paperStatus: 'Completed' },
        { id: 10, title: 'Paper 2', paperStatus: 'Not Done' },
        { id: 11, title: 'Paper 3', paperStatus: 'In Progress' },
      ],
    },
    {
      year: 2018,
      papers: [
        { id: 12, title: 'Paper 1', paperStatus: 'Not Done' },
      ],
    },
    {
      year: 2019,
      papers: [
        { id: 13, title: 'Paper 1', paperStatus: 'Completed' },
        { id: 14, title: 'Paper 2', paperStatus: 'Completed' },
      ],
    },
    {
      year: 2020,
      papers: [
        { id: 15, title: 'Paper 1', paperStatus: 'In Progress' },
        { id: 16, title: 'Paper 2', paperStatus: 'Completed' },
      ],
    },
    {
      year: 2021,
      papers: [
        { id: 17, title: 'Paper 1', paperStatus: 'Not Done' },
        { id: 18, title: 'Paper 2', paperStatus: 'Not Done' },
      ],
    },
    {
      year: 2022,
      papers: [
        { id: 19, title: 'Paper 1', paperStatus: 'Completed' },
        { id: 20, title: 'Paper 2', paperStatus: 'In Progress' },
      ],
    },
    {
      year: 2023,
      papers: [
        { id: 21, title: 'Paper 1', paperStatus: 'Not Done' },
        { id: 22, title: 'Paper 2', paperStatus: 'In Progress' },
        { id: 23, title: 'Paper 3', paperStatus: 'Completed' },
        { id: 24, title: 'Paper 4', paperStatus: 'Completed' },
      ],
    },
    // Add more years and papers as needed
  ];

const PapersList = () => {

const {theme} = useThemeContext()

  const renderItem = ({ item }) => (
    <YearPapers year={item.year} papers={item.papers} />
  );

  return (
    <View style={
      [styles.container,
      {backgroundColor: theme.colors.primaryBackground},
      ]
    }>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dummyData}
        renderItem={renderItem}
        keyExtractor={(item) => item.year.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});

export default PapersList;

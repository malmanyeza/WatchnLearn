import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { useThemeContext } from '../../hooks/themeContext';

const YearPapers = ({ year, papers }) => {

  const {theme} = useThemeContext()
  // Function to render individual paper items
  const renderPaper = (paper) => {
    let backgroundColor = 'white';
    let textColor = 'gray';

    switch (paper.paperStatus) {
      case 'Completed':
        backgroundColor = '#4477CE';
        textColor = 'white';
        break;
      case 'In Progress':
        backgroundColor = '#8CABFF'; // You can choose an appropriate color
        textColor = 'white';
        break;
      default:
        backgroundColor = 'white';
        textColor = 'gray';
        break;
    }

    return (
        <TouchableOpacity style={styles.paperContainer}>
            <View key={paper.id} style={[styles.paper, { backgroundColor }]}>
                <Text style={{ color: textColor }}>{paper.title}</Text>
            </View>
            <Text style={{color:backgroundColor}}>{paper.paperStatus}</Text>
        </TouchableOpacity>
    );
  };

  return (
    <View style={
        [styles.container,
        {backgroundColor: theme.colors.primaryBackground},
        ]
    }>
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

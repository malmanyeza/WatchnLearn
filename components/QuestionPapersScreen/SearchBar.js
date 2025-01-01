import React, { memo, useState, useCallback } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';
import { useThemeContext } from '../../hooks/themeContext';

const SearchBar = ({ searchBarFlex, searchBarTitle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { currentQuestionPapers, setCurrentQuestionPapers } = useAllSubjectsContext();
  const { theme } = useThemeContext();

  // State to hold the timeout ID for debouncing
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleSearch = useCallback(() => {
    const filteredResults = currentQuestionPapers.filter((paper) =>
      paper.year.toString().includes(searchQuery.trim())
    );
    if (filteredResults.length > 0) {
      setCurrentQuestionPapers(filteredResults);
    } else {
      setCurrentQuestionPapers([]); // Clear the papers if no results are found
    }
  }, [searchQuery, currentQuestionPapers, setCurrentQuestionPapers]);

  const handleInputChange = useCallback((text) => {
    setSearchQuery(text);
    
    // Clear the previous timeout if it exists
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    
    // Set a new timeout to delay the search
    const newTimeout = setTimeout(() => {
      handleSearch();
    }, 500); // 500ms delay (adjust this value as needed)

    setDebounceTimeout(newTimeout); // Update the timeout state
  }, [handleSearch, debounceTimeout]);

  return (
    <View
      style={[
        styles.outerContainer,
        { flex: searchBarFlex },
        { backgroundColor: theme.colors.primaryBackground },
      ]}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.secondaryBackground },
        ]}
      >
        <Ionicons name="search" size={24} color="#9B9B9B" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={searchBarTitle}
          placeholderTextColor="#9B9B9B"
          value={searchQuery}
          onChangeText={handleInputChange}
        />
      </View>
      {searchQuery.length > 0 && currentQuestionPapers.length === 0 && (
        <Text style={styles.message}>No search results found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    marginTop: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    height: 50,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  message: {
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 10,
    color: 'red',
  },
});

export default memo(SearchBar);

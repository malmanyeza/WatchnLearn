import React, { memo, useState, useCallback, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image, Text, FlatList, BackHandler } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';
import { useSubjectContext } from '../../hooks/subjectDetailsConst';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useThemeContext } from '../../hooks/themeContext';

const SearchBar = ({ searchBarFlex, searchBarTitle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { subjects } = useAllSubjectsContext();
  const { setSubjectDetails, subjectDetails } = useSubjectContext();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const { theme } = useThemeContext();

  const handleOnPress = useCallback((item) => {
    setSubjectDetails(item);
    navigation.navigate('Enrolling');
    setSearchQuery('');
  });

  const handleSearch = useCallback(() => {
    const lowercaseQuery = searchQuery.toLowerCase();
    const filteredResults = subjects.filter((item) => item.subjectName.toLowerCase().startsWith(lowercaseQuery));

    setSearchResults(filteredResults);
  });

  const handleInputChange = useCallback((text) => {
    setSearchQuery(text);
    handleSearch();
  });

  const handleHardwareBackPress = useCallback(() => {
    setSearchQuery('');
    return true; // Prevent default behavior (closing the app)
  }, []);

  useEffect(() => {
    if (isFocused) {
      BackHandler.addEventListener('hardwareBackPress', handleHardwareBackPress);
    }

    return () => {
      if (isFocused) {
        BackHandler.removeEventListener('hardwareBackPress', handleHardwareBackPress);
      }
    };
  }, [isFocused, handleHardwareBackPress]);

  const renderItem = useCallback(({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleOnPress(item)} style={styles.itemContainer}>
        <Image source={item.subjectImage} style={styles.subjectImage} />
        <Text style={styles.subjectName}>{item.subjectName}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View style={[styles.outerContainer, { flex: searchBarFlex }, { backgroundColor: theme.colors.primaryBackground }]}>
      <View style={[styles.container, { backgroundColor: theme.colors.tetiaryBackground }]}>
        <Ionicons name="search" size={24} color="#9B9B9B" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={searchBarTitle}
          placeholderTextColor="#9B9B9B"
          value={searchQuery}
          onChangeText={handleInputChange}
        />
      </View>
      {searchQuery.length > 0 && searchResults.length > 0 ? (
        <FlatList data={searchResults} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
      ) : (
        <Text style={[styles.message]}>
          {searchQuery.length > 0 ? 'No search results found' : ''}
        </Text>
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
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 20,
    borderBottomColor: 'white',
    fontFamily: 'ComicNeue-Bold',
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 15,
  },
  subjectImage: {
    width: 30,
    height: 30,
    borderRadius: 8,
    marginBottom: 5,
  },
  subjectName: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 10,
  },
  message: {
    alignSelf: 'center',
    fontSize: 16,
  },
});

export default memo(SearchBar);

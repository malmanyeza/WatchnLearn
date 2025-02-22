import React, { memo, useState, useCallback, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image, Text, FlatList, BackHandler, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';
import { useSubjectContext } from '../../hooks/subjectDetailsConst';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useThemeContext } from '../../hooks/themeContext';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FontSizes from '../../constants/FontSizes';

const { width, height } = Dimensions.get('screen');

const TextbooksSearchBar = ({ searchBarFlex, searchBarTitle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const { subjects, loadingSubjects } = useAllSubjectsContext();
  const { setSubjectDetails, subjectDetails } = useSubjectContext();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { theme } = useThemeContext();

  useEffect(() => {
    console.log('Here the memoizedSubjects in SearchBar.js:', subjects);
  }, [subjects]);

  const handleOnPress = useCallback((item) => {
    setSubjectDetails(item);
    navigation.navigate('Enrolling');
    setSearchQuery('');
  });

  const handleSearch = useCallback(() => {
    const lowercaseQuery = searchQuery.toLowerCase();
    const filteredResults = subjects.filter((item) => item.name.toLowerCase().startsWith(lowercaseQuery));
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
        <Text style={styles.subjectName}>{item.name}</Text>
      </TouchableOpacity>
    );
  });

  const renderSkeleton = () => (
    <SkeletonPlaceholder
      backgroundColor={theme.colors.tetiaryBackground}
      highlightColor={theme.colors.primaryBackground}
      alignSelf="center"
    >
      <SkeletonPlaceholder.Item width={'95%'} height={height * 0.058} borderRadius={10} alignSelf="center" />
    </SkeletonPlaceholder>
  );

  return (
    <View style={styles.wrapper}>
      <View style={[styles.outerContainer, { flex: searchBarFlex }, { backgroundColor: theme.colors.primaryBackground }]}>
        {loadingSubjects ? (
          renderSkeleton()
        ) : (
          <View style={[styles.container, { backgroundColor: theme.colors.tetiaryBackground }]}>
            <Ionicons name="search" size={24} color={'gray'} style={styles.icon} />
            <TextInput
              style={[styles.input, { color: theme.colors.secondaryText }]}
              placeholder={searchBarTitle}
              placeholderTextColor={'gray'}
              value={searchQuery}
              onChangeText={handleInputChange}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </View>
        )}
      </View>
      {searchQuery.length > 0 && searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={[styles.resultsContainer, { backgroundColor: theme.colors.primaryBackground }]}
        />
      )}
      {searchQuery.length > 0 && searchResults.length === 0 && (
        <Text style={[styles.message, { color: theme.colors.secondaryText }]}>
          No search results found
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    zIndex: 2,
  },
  outerContainer: {
    marginTop: 40,
    zIndex: 2, // Ensure the search bar is above the results
  },
  container: {
    height:50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: FontSizes.body1,
    borderBottomColor: 'white',
    fontFamily: 'ComicNeue-Bold',
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
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
  resultsContainer: {

    height:height
  },
});

export default memo(TextbooksSearchBar);

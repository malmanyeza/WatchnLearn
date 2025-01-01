import React, { memo } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Step 1: Import Ionicons
import SearchBar from '../components/HomeScreen/SearchBar';
import SubjectCardList from '../components/HomeScreen/SubjectCardsList';
import Categories from '../components/HomeScreen/Categories';
import { useThemeContext } from '../hooks/themeContext';
import { useUserDataContext } from '../hooks/userDataContext';
import { useAllSubjectsContext } from '../hooks/allSubjectsContext';
import { UIActivityIndicator } from 'react-native-indicators';

const HomeScreen = () => {
  const { levelState } = useUserDataContext();
  const { width, height } = Dimensions.get('screen');
  const { filteredSubjects, loadingSubjects, reloading, setReloading, fetchSubjectsOrCourses } = useAllSubjectsContext();
  const { theme } = useThemeContext();

  const handleRefresh = () => {
    setReloading(true);
    fetchSubjectsOrCourses();
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: theme.colors.primaryBackground }
    ]}>
      <SearchBar searchBarTitle={levelState === 'Tertiary' ? 'Search Courses' : 'Search Subjects'} />
      <View style={{ flex: 1, height: '100%' }}>
        {(reloading && loadingSubjects) ? (
          <View style={styles.activityIndicatorContainer}>
            <UIActivityIndicator color={theme.colors.text} />
          </View>
        ) : (
          <>
            {filteredSubjects.length < 1 && !loadingSubjects ? (
              <View style={styles.refreshContainer}>
                <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
                  <Icon name="refresh" size={30} color={theme.colors.text} />
                  <Text style={[styles.refreshText, { color: theme.colors.text }]}>Refresh</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ flex: 1, height: '100%' }}>
                <Categories />
                <SubjectCardList />
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    flexDirection: 'column',
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  refreshText: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'ComicNeue-Bold',
  }
});

export default memo(HomeScreen);

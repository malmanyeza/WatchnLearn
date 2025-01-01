import React, { useState, memo } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';
import Colors from '../../constants/Colors';
import { useThemeContext } from '../../hooks/themeContext';
import FontSizes from '../../constants/FontSizes';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(0); // Initially selected category is 0
  const { filteredSubjects, setFilteredSubjects, subjects, loadingSubjects } = useAllSubjectsContext();
  const { theme } = useThemeContext();

  const categories = [
    { id: 0, name: "All Courses" },
    { id: 1, name: "Computer Science" },
    { id: 3, name: "Information Technology" },
    { id: 4, name: "Business and Management" },
    { id: 5, name: "Applied Sciences" },
    { id: 6, name: "Design and Creative Technologies" },
    { id: 7, name: "Health Sciences" },
    { id: 8, name: "Environmental Studies" },
  ];

  const handleCategoryPress = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === 0) {
      setFilteredSubjects(subjects);
    } else {
      const selectedCategoryName = categories[categoryId].name;
      const filteredSubjects = subjects.filter((subject) => subject.category === selectedCategoryName);
      setFilteredSubjects(filteredSubjects);
    }
  };

  const renderSkeleton = () => (
    <View>
      <View style={styles.headerContainer}>
      <SkeletonPlaceholder backgroundColor={theme.colors.tetiaryBackground} highlightColor={theme.colors.primaryBackground}>
        <SkeletonPlaceholder.Item width={150} height={30} borderRadius={5} marginTop={20} marginBottom={10} marginLeft={10} />
      </SkeletonPlaceholder>
      <SkeletonPlaceholder backgroundColor={theme.colors.tetiaryBackground} highlightColor={theme.colors.primaryBackground}>
        <SkeletonPlaceholder.Item width={80} height={20} borderRadius={5} marginBottom={10} marginLeft={10} marginTop={20}/>
      </SkeletonPlaceholder>
      </View>
      <SkeletonPlaceholder backgroundColor={theme.colors.tetiaryBackground} highlightColor={theme.colors.primaryBackground}>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginLeft={10} marginRight={15}>
          {Array.from({ length: categories.length }).map((_, index) => (
            <SkeletonPlaceholder.Item
              key={index}
              width={100}
              height={40}
              borderRadius={5}
              marginLeft={index === 0 ? 0 : 10}
              marginTop={20}
            />
          ))}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.button,
        selectedCategory === item.id && styles.selectedButton,
        selectedCategory === item.id?{ backgroundColor: theme.colors.text ,  color:theme.colors.primaryBackground}:
        { borderColor: theme.colors.defaultBorder },
        
      ]}
      onPress={() => handleCategoryPress(item.id)}
    >
      <Text
        style={[
          styles.buttonText,
          selectedCategory === item.id && styles.selectedButtonText,
          { color: selectedCategory === item.id ? theme.colors.primaryBackground : theme.colors.secondaryText },
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loadingSubjects ? (
        renderSkeleton()
      ) : (
        <>
          <View style={styles.headerContainer}>
            <Text style={[styles.header, { color: theme.colors.text }]}>Categories</Text>
          </View>
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    marginTop: '15%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
    marginBottom: 10,

  },
  button: {
    marginVertical: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderRadius: 15,
    marginRight: 16,
  },
  selectedButton: {
    transform: [{ scale: 1.05 }],
    marginHorizontal: 10,
    borderWidth: 1,
  },
  buttonText: {
    color: 'black',
    fontFamily: 'ComicNeue-Bold',
    fontSize: FontSizes.heading5,
  },
  selectedButtonText: {
    color: 'white',
  },
  header: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: FontSizes.heading3,
    marginLeft: 10,
  },
  flatListContent: {
    paddingRight: 15, // Add right padding to match left padding of the container
  },
});

export default memo(Categories);

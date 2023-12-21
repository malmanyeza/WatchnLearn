import React, { useState, memo } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';
import Colors from '../../constants/Colors';
import { useThemeContext } from '../../hooks/themeContext';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(0); // Initially selected category is 0
  const { filteredSubjects, setFilteredSubjects, subjects } = useAllSubjectsContext();

  const {theme} = useThemeContext()

  const categories = [
    { id: 0, name: "All Subjects" },
    { id: 1, name: "Mathematics" },
    { id: 2, name: "Language Arts" },
    { id: 3, name: "Science" },
    { id: 4, name: "Social Studies/Social Sciences" },
    { id: 5, name: "Foreign Languages" }, // Optional, may not be available in all systems
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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.button,  
        selectedCategory === item.id && styles.selectedButton,
        selectedCategory === item.id && {backgroundColor:theme.colors.tetiaryBackground}
      ]}
      onPress={() => handleCategoryPress(item.id)}
    >
      <Text
        style={[
          styles.buttonText,
          selectedCategory === item.id && styles.selectedButtonText,
          {color:selectedCategory === item.id ? theme.colors.text:theme.colors.secondaryText}
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.header,{color:theme.colors.text}]}>Categories</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  button: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  selectedButton: {
    transform: [{ scale: 1.12 }],
    borderColor: Colors.primary,
    marginHorizontal: 10,
    borderWidth: 1,
  },
  buttonText: {
    color: 'black',
    fontFamily:'ComicNeue-Bold',
    fontSize:18
  },
  selectedButtonText: {
    color: 'white',
  },

  header:{
    fontFamily:'ComicNeue-Bold',
    fontSize:28,
    paddingLeft:5,
    marginBottom:10
  }
});

export default memo(Categories);

import React,{memo} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import PopularSubjectsList from '../components/PopularClassesScreen/PopularClassesList';
import { useThemeContext } from '../hooks/themeContext';

const PopularClassesScreen = () => {

  const {theme} = useThemeContext()
  return (
    <View style={[
      styles.container,
      {backgroundColor:theme.colors.primaryBackground}
    ]}>
      <Header
        title="Subjects"
      />
      <PopularSubjectsList/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  // Add more styles as needed
});

export default memo(PopularClassesScreen);

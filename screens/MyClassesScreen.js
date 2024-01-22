import React,{memo} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyClassesAndMyClassHeader from '../components/MyClassesAndMyHeader';
import MyClassesList from '../components/MyClassesScreen/MyClassesList';
import { useThemeContext } from '../hooks/themeContext';

const MyClassesScreen = () => {

  const {theme} = useThemeContext()

  return (
    <View style={[
      styles.container,
      {backgroundColor:theme.colors.primaryBackground}
      ]}>
      <MyClassesAndMyClassHeader
        title={'My Classes'}
      />
      <MyClassesList/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  // Add more styles as needed
});

export default memo(MyClassesScreen);

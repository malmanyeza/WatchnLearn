import React,{memo} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyClassesList from '../components/MyClassesScreen/MyClassesList';
import { useThemeContext } from '../hooks/themeContext';
import MyClassesHeader from '../components/MyClassesScreen/MyClassesHeader';

const MyClassesScreen = () => {

  const {theme} = useThemeContext()

  return (
    <View style={[
      styles.container,
      {backgroundColor:theme.colors.primaryBackground}
      ]}>
      <MyClassesHeader
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

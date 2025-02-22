import React, {memo} from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useThemeContext } from '../hooks/themeContext';
import TextbooksList from '../components/TextbooksScreen/TextbooksList';
import TextbooksSearchBar from '../components/TextbooksScreen/TextbooksSearchBar';

const TextbooksScreen = () => {

const {theme} = useThemeContext()

  return (
    <View style={
      [
        styles.container,
        {backgroundColor:theme.colors.primaryBackground}
      ]
    }>
        <TextbooksSearchBar/>
        <TextbooksList/>
        
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});

export default memo(TextbooksScreen);

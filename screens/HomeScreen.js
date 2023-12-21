import React,{memo} from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/HomeScreen/Header';
import SearchBar from '../components/HomeScreen/SearchBar';
import SubjectCardList from '../components/HomeScreen/SubjectCardsList';
import Categories from '../components/HomeScreen/Categories';
import PopularSubjectsList from '../components/HomeScreen/PopularSubjectsList';
import Colors from '../constants/Colors';
import { useThemeContext } from '../hooks/themeContext';

const HomeScreen = () => {

  const {theme} = useThemeContext();
  console.log(theme)

  return (
    
       <View style={[
        styles.container,
        {backgroundColor:theme.colors.primaryBackground}
        ]}>
        <SearchBar searchBarTitle={'Search Subjects'}/>
      
          <Categories/>
          <SubjectCardList/>
        
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:30,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  }
});

export default memo(HomeScreen);

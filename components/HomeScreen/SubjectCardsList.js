import React, { memo, useCallback, useRef, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { BallIndicator } from 'react-native-indicators'; // Step 1
import { useNavigation } from '@react-navigation/native';
import { useSubjectContext } from '../../hooks/subjectDetailsConst';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';
import Colors from '../../constants/Colors';
import  SubjectCard  from './SubjectCards';
import { useThemeContext } from '../../hooks/themeContext';

const SubjectCardList = () => {
  const {theme} = useThemeContext()
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const { filteredSubjects } = useAllSubjectsContext();
  const { setSubjectDetails, subjectDetails } = useSubjectContext();

  const [loading, setLoading] = useState(false); // Step 2

  const handleOnPress = useCallback(async (item) => {
    setLoading(true); // Step 3

    // Perform any asynchronous tasks here, for example, API calls, etc.

    
    
    navigation.navigate('Enrolling');
    setSubjectDetails(item);
    setLoading(false); // Once the execution is complete, set loading to false
  }, [navigation, setSubjectDetails]);

  const scrollToTop = useCallback(() => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.renderItemContainer}>
      <SubjectCard
        subjectImage={item.subjectImage}
        subjectName={item.subjectName}
        syllabus={item.syllabus}
        handleOnPress={() => handleOnPress(item)}
        rating={item.rating}
        enrollers={item.enrollers}
      />
      {loading? (
        <View style={styles.indicatorContainer}>
          <BallIndicator color={Colors.primary} />
        </View>
      ):null}
    </View>
  );
  

  useEffect(() => {
    scrollToTop();
  }, [filteredSubjects, scrollToTop]);

  return (
    <View>
      <View style={styles.header}>
          <Text style={[
            styles.headerText,
            {color:theme.colors.text}
            ]}>Subjects</Text>
          <TouchableOpacity onPress={()=>{navigation.navigate('PopularClasses')}}>
            <Text style={[
              styles.seeAll,
              {color:theme.colors.text}
              ]}>See All</Text>
          </TouchableOpacity>
        </View>
      <FlatList
        ref={flatListRef}
        horizontal
        data={filteredSubjects}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  renderItemContainer: {
    paddingVertical: 10,
    marginBottom:20
  },
  header:{
    marginHorizontal:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:20
  },
  seeAll:{
    fontSize:18,
    fontFamily:'ComicNeue-Bold',
  },
  headerText:{
    paddingLeft:10,
    fontSize:28,
    fontFamily:'ComicNeue-Bold'
  }
});

export default memo(SubjectCardList);

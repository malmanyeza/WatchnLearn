import React, { memo, useCallback, useRef, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { BallIndicator } from 'react-native-indicators'; // Step 1
import { useNavigation } from '@react-navigation/native';
import { useSubjectContext } from '../../hooks/subjectDetailsConst';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';
import Colors from '../../constants/Colors';
import  SubjectCard  from './SubjectCards';

const SubjectCardList = () => {
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
  // indicatorContainer: {
  //   position: 'absolute',
  //   top: '50%', // Place the indicator at the center vertically
  //   left: '50%', // Place the indicator at the center horizontally
  //   transform: [{ translateX: -12 }, { translateY: -12 }], // Center the indicator perfectly
  // },
});

export default memo(SubjectCardList);

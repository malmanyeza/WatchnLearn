import React, {memo, useCallback} from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import PopularSubject from './PopularSubject';
import { useNavigation } from '@react-navigation/native';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';
import { useSubjectContext } from '../../hooks/subjectDetailsConst';
import { useThemeContext } from '../../hooks/themeContext';
import { useUserDataContext } from '../../hooks/userDataContext';

const PopularSubjectsList = () => {

    const {theme} = useThemeContext()

    const navigation = useNavigation()
    const {subjects} = useAllSubjectsContext()
    const {setSubjectDetails,subjectDetails} = useSubjectContext()
    const {levelState} = useUserDataContext()
    
    const handleOnPress = useCallback((item) => {
        setSubjectDetails(item);
        navigation.navigate('Enrolling')
    })

    const RenderHeader = useCallback(() => (
        <View style={styles.header}>
          <Text style={[
            styles.headerText,
            {color:theme.colors.text}
            ]}>Most enrolled subjects</Text>
          <TouchableOpacity onPress={()=>{navigation.navigate('PopularClasses')}}>
            <Text style={[
              styles.seeAll,
              {color:theme.colors.secondaryText}
              ]}>See All</Text>
          </TouchableOpacity>
        </View>
      ));

    const renderItem = useCallback(({ item }) => (
        <View style={styles.renderItemContainer}>
            <PopularSubject
               subjectImage={levelState === 'Tertiary' ? item.courseImage : item.subjectImage}
               subjectName={item.subjectName}
               rating={item.rating}
               enrollers={item.enrollers}
               syllabus={levelState === 'Tertiary' ? item.semester : item.syllabus.name}
               handleOnPress={()=>handleOnPress(item)}
            />
        </View>
    ));
  
    return (
      <View style={styles.container}>
        <RenderHeader/>
        <FlatList
          data={subjects}
          renderItem={renderItem}
          keyExtractor={item => item.id} 
          nestedScrollEnabled={true}
          scrollEnabled={false}
        />
      </View>
    );
  };

const styles = StyleSheet.create({
  container:{
  },
  renderItemContainer: { 
    width:"95%",
    alignSelf:'center',
    marginHorizontal:10,
    justifyContent:'center',
    paddingVertical:10
  },
  header:{
    marginHorizontal:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:20
  },
  headerText:{
    fontSize:22,
    fontWeight:'bold'
  },
  seeAll:{
    fontSize:14,
    color:'gray'
  }
});

export default memo(PopularSubjectsList);

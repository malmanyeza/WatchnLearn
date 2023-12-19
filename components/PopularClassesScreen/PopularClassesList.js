import React, {memo, useCallback} from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import PopularSubject from '../HomeScreen/PopularSubject';
import { useNavigation } from '@react-navigation/native';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';
import { useSubjectContext } from '../../hooks/subjectDetailsConst';

const PopularSubjectsList = () => {

    const navigation = useNavigation()
    const {subjects} = useAllSubjectsContext()
    const {setSubjectDetails,subjectDetails} = useSubjectContext()
    
    const handleOnPress = useCallback((item) => {
        setSubjectDetails(item);
        navigation.navigate('Enrolling')
    })

    const renderItem = ({ item }) => (
        <View style={styles.renderItemContainer}>
            <PopularSubject
               subjectImage={item.subjectImage}
               subjectName={item.subjectName}
               rating={item.rating}
               enrollers={item.enrollers}
               syllabus={item.syllabus}
               handleOnPress={()=>handleOnPress(item)}
            />
        </View>
    );
  
    return (
      <View style={styles.container}>
        <FlatList
          data={subjects}
          renderItem={renderItem}
          keyExtractor={item => item.id} 
          nestedScrollEnabled={true}
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
    alignItems:'center'
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

import React,{useCallback, memo, useEffect} from 'react';
import { View, SectionList, StyleSheet, Text } from 'react-native';
import VideoOrBookContainer from './VideoOrBookContainer';
import CircularProgressBar from './CircularProgressBar';
import { useNavigation } from '@react-navigation/native';
import { useContentContext } from '../../hooks/contentContext';
import QuizeContainer from './QuizeContainer';
import { useThemeContext } from '../../hooks/themeContext';


const ContentList = () => {

  const {theme} = useThemeContext()

  const {contentDetails,setContentDetails, questions, setQuestions, content, week, classContent} = useContentContext();

  const navigation  = useNavigation()

  const goToQuize = useCallback((item)=>{
    setQuestions(item.questions)
    navigation.navigate('Quize')
  })

  const goToVidOrPDF = useCallback ((item)=>{
    
    setContentDetails(item)
    if(item.contentType==='video'){
      navigation.navigate('Video')
    }else{
      navigation.navigate('PDF')
    } 
  })
    
  
  
  const renderSectionHeader = ({ section: { chapterTitle, data } }) => {
    
    
      return (
        <View style={
          [
            styles.sectionHeader,
            {backgroundColor:theme.colors.primaryBackground}
          ]
        }>
          <Text style={
            [
              styles.sectionHeaderText,
              {color:theme.colors.text}
            ]
          }>{chapterTitle}</Text>
        </View>
      );
    
  
  };
  

  const renderItem = ({ item }) => (
    item.contentType === 'quize' ?
    (item.week === week ?
      (<QuizeContainer title={item.title} duration={item.duration} onPressHandle={() => goToQuize(item)} noOfQuestions={item.noOfQuestions} />)
      : null)
    :
    (
      <VideoOrBookContainer title={item.title} contentType={item.contentType} duration={item.duration} onPressHandle={() => goToVidOrPDF(item)} />
      )
  );


  

  return (
    <View style={styles.container}>
      {
        classContent?
        <SectionList
          sections={classContent}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        :
        <Text>Loading...</Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop:10
  },
  sectionHeaderText: {
    fontSize: 25,
    fontFamily:'ComicNeue-Bold',
    marginVertical:10
  },
  separator: {
    height: 1,
  }
});

export default memo(ContentList);

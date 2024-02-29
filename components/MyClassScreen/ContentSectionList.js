import React,{useCallback, memo, useEffect, useDebugValue} from 'react';
import { View, SectionList, StyleSheet, Text } from 'react-native';
import VideoOrBookContainer from './VideoOrBookContainer';
import CircularProgressBar from './CircularProgressBar';
import { useNavigation } from '@react-navigation/native';
import { useContentContext } from '../../hooks/contentContext';
import QuizeContainer from './QuizeContainer';
import { useThemeContext } from '../../hooks/themeContext';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';

const ContentList = () => {

  const {theme} = useThemeContext()

  const {myCurrentChapters, setMyContentState, myContentState, storeDownloadedContentPathInAsyncStorage, myClasses} = useAllSubjectsContext()

  const {contentDetails,setContentDetails, questions, setQuestions, content, week, classContent} = useContentContext();
  

  const navigation  = useNavigation()

  const goToQuize = useCallback((item)=>{
    setQuestions(item.questions)
    navigation.navigate('Quize')
  })


  useEffect(()=>{
    console.log("Here is the class content",classContent)
  },[classContent])

  const downloadContent = (chapterId, topicName, firebaseUrl)=>{
   

   setMyContentState(prevState => ({
      ...prevState,
      currentChapter: chapterId,
      currentContent: topicName,
      currentContentUrl:firebaseUrl
    }))
    
  }



  useEffect(() => {
    if (!myContentState.currentSubject || !myContentState.currentTerm || !myContentState.currentChapter || !myContentState.currentContent) {
      console.log('ContentState not complete', myContentState)
      return;
    }

    storeDownloadedContentPathInAsyncStorage(myClasses, myContentState, myContentState.currentContentUrl);
  }, [myContentState]);




  const goToVidOrPDF = useCallback ((item)=>{
    
    setContentDetails(item)
    if(item.contentType==='video'){
      navigation.navigate('Video')
    }else{
      navigation.navigate('PDF')
    } 
  })
    
  
  
  const renderSectionHeader = ({ section: { name, data } }) => {
    
    
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
          }>{name}</Text>
        </View>
      );
    
  
  };
  

  const renderItem = ( {item, chapterId }) => (
    item.contentType === 'quize' ?
    (item.week === week ?
      (<QuizeContainer title={item.topicName} duration={item.duration} onPressHandle={() => goToQuize(item)} noOfQuestions={item.noOfQuestions} onPressDownloadButton={()=>downloadContent(chapterId,item.title)}/>)
      : null)
    :
    (
      <VideoOrBookContainer title={item.topicName} contentType={item.contentType} duration={item.duration} onPressHandle={() => goToVidOrPDF(item)} onPressDownloadButton={()=>downloadContent(chapterId,item.topicName,item.contentUrl)} downloadPath={item.downloadFilePath}/>
      )
  );


  

  return (
    <View style={styles.container}>
      {
        classContent?
        <SectionList
          sections={classContent}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, section }) => renderItem({ item, chapterId: section.id  })}
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

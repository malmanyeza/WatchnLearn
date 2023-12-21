import React,{useCallback, memo} from 'react';
import { View, SectionList, StyleSheet, Text } from 'react-native';
import VideoOrBookContainer from './VideoOrBookContainer';
import CircularProgressBar from './CircularProgressBar';
import { useNavigation } from '@react-navigation/native';
import { useContentContext } from '../../hooks/contentContext';
import QuizeContainer from './QuizeContainer';
import { useThemeContext } from '../../hooks/themeContext';


const ContentList = () => {

  const {theme} = useThemeContext()

  const {contentDetails,setContentDetails, questions, setQuestions, content, week} = useContentContext();

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
    
  
  
  const renderSectionHeader = ({ section: { title, data } }) => {
    const sectionItemsToShow = data.filter(item => item.week === week);
    
    if (sectionItemsToShow.length > 0) {
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
          }>{title}</Text>
        </View>
      );
    }
  
    return null;
  };
  

  const renderItem = ({ item }) => (
    item.contentType === 'quize' ?
    (item.week === week ?
      (<QuizeContainer title={item.title} duration={item.duration} onPressHandle={() => goToQuize(item)} noOfQuestions={item.noOfQuestions} />)
      : null)
    :
    (item.week === week ?
      (<VideoOrBookContainer title={item.title} contentType={item.contentType} duration={item.duration} onPressHandle={() => goToVidOrPDF(item)} />)
      : null)
  );
  

  return (
    <View style={styles.container}>
      <SectionList
        sections={content}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={<CircularProgressBar progress={80} />}
      />
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
    fontSize: 22,
    fontFamily:'ComicNeue-Bold'
  },
  separator: {
    height: 1,
  }
});

export default memo(ContentList);

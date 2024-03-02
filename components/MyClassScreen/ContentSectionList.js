import React, { useCallback, memo, useEffect, useState } from 'react';
import { View, SectionList, StyleSheet, Text } from 'react-native';
import VideoOrBookContainer from './VideoOrBookContainer';
import CircularProgressBar from './CircularProgressBar';
import { useNavigation } from '@react-navigation/native';
import { useContentContext } from '../../hooks/contentContext';
import QuizeContainer from './QuizeContainer';
import { useThemeContext } from '../../hooks/themeContext';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';

const ContentList = () => {
  const { theme } = useThemeContext();
  const { myCurrentChapters, setMyContentState, myContentState, storeDownloadedContentPathInAsyncStorage, myClasses } = useAllSubjectsContext();
  const { contentDetails, setContentDetails, questions, setQuestions, content, week, classContent } = useContentContext();
  const navigation = useNavigation();
  const [filteredClassContent, setFilteredClassContent] = useState(null);

  // Sort classContent by position in ascending order
  const sortedClassContent = classContent.map(section => ({
    ...section,
    data: section.data.sort((a, b) => a.position - b.position),
  }));

  // Filter classContent by week
  useEffect(() => {
    const filteredContent = sortedClassContent.filter(section => section.week === String(week));
    console.log('filteredContent', filteredContent);
    if (filteredContent.length > 0) {
      setFilteredClassContent(filteredContent);
    }
  }, [week, classContent]);
  
    

  const goToQuize = useCallback((item) => {
    setQuestions(item.questions);
    navigation.navigate('Quize');
  });

  const downloadContent = (chapterId, topicName, firebaseUrl, contentType) => {
    setMyContentState((prevState) => ({
      ...prevState,
      currentChapter: chapterId,
      currentContent: topicName,
      currentContentUrl: firebaseUrl,
      currentContentType: contentType,
    }));

    console.log('Here is the contentType', contentType);
  };

  useEffect(() => {
    if (!myContentState.currentSubject || !myContentState.currentTerm || !myContentState.currentChapter || !myContentState.currentContent) {
      console.log('ContentState not complete', myContentState);
      return;
    }

    storeDownloadedContentPathInAsyncStorage(myContentState, myContentState.currentContentUrl,myContentState.currentContentType);
  }, [myContentState]);

  const goToVidOrPDF = useCallback((item) => {
    setContentDetails(item);
    if (item.contentType === 'video') {
      navigation.navigate('Video');
    } else {
      navigation.navigate('PDF');
    }
  });

  const renderSectionHeader = ({ section: { name, data } }) => {
    return (
      <View>
        <View style={[styles.sectionHeader, { backgroundColor: theme.colors.primaryBackground }]}>
          <Text style={[styles.sectionHeaderText, { color: theme.colors.text }]}>{name}</Text>
        </View>
      </View>
    );
  };

  const renderItem = ({ item, section, index }) => {
    const chapterId = section.id;
    const isLastItem = index === section.data.length - 1;

    if (item.contentType === 'quize') {
        return (
          <QuizeContainer
            title={item.topicName}
            duration={item.duration}
            onPressHandle={() => goToQuize(item)}
            noOfQuestions={item.noOfQuestions}
            onPressDownloadButton={() => downloadContent(chapterId, item.title)}
          />
        );
      
    } else {
      return (
        <View>
          <VideoOrBookContainer
            title={item.topicName}
            contentType={item.contentType}
            duration={item.duration}
            onPressHandle={() => goToVidOrPDF(item)}
            onPressDownloadButton={() => downloadContent(chapterId, item.topicName, item.contentUrl, item.contentType)}
            downloadPath={item.downloadFilePath}
          />
          {isLastItem && <View style={[styles.horizontalLine, { backgroundColor: theme.colors.tetiaryBackground }]} />}
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {filteredClassContent ? (
        <SectionList
          sections={filteredClassContent}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    marginTop: 40,
    paddingHorizontal: 16,
  },
  sectionHeaderText: {
    fontSize: 25,
    fontFamily: 'ComicNeue-Bold',
    marginBottom: 20,
  },
  horizontalLine: {
    height: 0.25,
    marginHorizontal: 16,
    marginTop: 20,
  },
});

export default memo(ContentList);

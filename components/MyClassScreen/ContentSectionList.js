import React, { useCallback, memo, useEffect, useState } from 'react';
import { View, SectionList, StyleSheet, Text , InteractionManager} from 'react-native';
import VideoOrBookContainer from './VideoOrBookContainer';
import CircularProgressBar from './CircularProgressBar';
import { useNavigation } from '@react-navigation/native';
import { useContentContext } from '../../hooks/contentContext'; 
import QuizeContainer from './QuizeContainer';
import { useThemeContext } from '../../hooks/themeContext';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNFS from 'react-native-fs';
import { useUserDataContext } from '../../hooks/userDataContext';
import FontSizes from '../../constants/FontSizes';
import Colors from '../../constants/Colors';


const ContentList = () => {
  const { theme } = useThemeContext();
  const { 
    myCurrentChapters, setMyContentState, myContentState, storeDownloadedContentPathInAsyncStorage,
    downloadQueue, setDownloadQueue, currentDownload, setCurrentDownload, myClasses, setMyClasses,
    downloadProgress, setDownloadProgress
  } = useAllSubjectsContext();
  const { contentDetails, setContentDetails,questions, setQuestions, content, week, classContent } = useContentContext();
  const navigation = useNavigation();
  const [filteredClassContent, setFilteredClassContent] = useState(null);
  const { levelState } = useUserDataContext();
  const [isdownloadTriggered, setIsdownloadTriggered] = useState(null)
  const [isDeletingInProgress, setIsDeletingInProgress] = useState(false)
  const [isDeletingComplete, setIsDeletingComplete] = useState(true)

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

  //This function is used to start the next download in the downloadQueue
  useEffect(() => {
    if (currentDownload === null && downloadQueue.length > 0) {
      startNextDownload();
    }
  }, [downloadQueue, currentDownload]);

  //This function is used to start the next download in the downloadQueue
  const startNextDownload = async () => {
    if (downloadQueue.length > 0) {
      console.log('Starting next download:', downloadQueue);
      const nextDownload = downloadQueue[0]; // Get the first item but don't remove it yet
      console.log('Next download:', nextDownload);

      setCurrentDownload(nextDownload);

      
  
      // Download the item
      InteractionManager.runAfterInteractions(async () => {
        await downloadItem(nextDownload.currentSubject, nextDownload.currentTerm, nextDownload.currentChapter, nextDownload.currentContent, nextDownload.currentContentUrl, nextDownload.currentContentType);
        setCurrentDownload(null);
      });
      
      // Remove the item from the queue after download
      setDownloadQueue(prevQueue => prevQueue.slice(1));
    }
  
  };

  const downloadItem = async ( currentSubject, currentTerm, currentChapter, currentContent, firebaseUrl, contentType ) => {
    console.log('Downloading:', currentContent, firebaseUrl, contentType);


    const subjectIndex = levelState === 'Tertiary'? myClasses.findIndex(sub => sub.courseId === currentSubject) : myClasses.findIndex(sub => sub.subjectId === currentSubject);
    if (subjectIndex === -1) {
      console.error(`Error: Subject with id ${currentSubject} not found`);
      return;
    }

    let termIndex = 0;

    if(!levelState==='Tertiary'){
       termIndex = myClasses[subjectIndex].terms.findIndex(term => term.termId === currentTerm);
      if (termIndex === -1) {
        console.error(`Error: Term with id ${currentTerm} not found in subject ${currentSubject}`);
        return;
      }
    }


    const chapterIndex = levelState ==='Tertiary'? 
      myClasses[subjectIndex].chapters.findIndex(chap => chap.id === currentChapter) 
      : 
      myClasses[subjectIndex].terms[termIndex].chapters.findIndex(chap => chap.id === currentChapter);
    if (chapterIndex === -1) {
      console.error(`Error: Chapter with id ${currentChapter} not found in term ${currentTerm}`);
      return;
    }

    const itemIndex = levelState ==='Tertiary'? 
      myClasses[subjectIndex].chapters[chapterIndex].data.findIndex(item => item.contentUrl === firebaseUrl)
      : 
      myClasses[subjectIndex].terms[termIndex].chapters[chapterIndex].data.findIndex(item => item.contentUrl === firebaseUrl);
    if (itemIndex === -1) {
      console.error(`Error: Content item with name ${currentContent} not found in chapter ${currentChapter}`);
      return;
    }


    const downloadDest = `${RNFS.DocumentDirectoryPath}/${currentContent}.${contentType}`;
    let lastProgressUpdate = 0;

    const options = {
      fromUrl: firebaseUrl,
      toFile: downloadDest,
      begin: (res) => {
      },
      progress: (res) => {
        const progress = (res.bytesWritten / res.contentLength) * 100;
        const now = Date.now();
    
        if (now - lastProgressUpdate >= 5000) {
          lastProgressUpdate = now;
          setDownloadProgress(prev => ({ ...prev, [firebaseUrl]: progress }));
        }
      }
    };

    try {
      console.log('In the try block for downloadItem')
      const result = await RNFS.downloadFile(options).promise;
      if (result.statusCode === 200) {
        const updatedMyClasses = [...myClasses];
        levelState ==='Tertiary'? 
          updatedMyClasses[subjectIndex].chapters[chapterIndex].data[itemIndex].downloadFilePath = downloadDest 
          : 
          updatedMyClasses[subjectIndex].terms[termIndex].chapters[chapterIndex].data[itemIndex].downloadFilePath = downloadDest;
        setMyClasses(updatedMyClasses);
        console.log('Here is the updatedMyClasses', updatedMyClasses);
        levelState === "Tertiary"? 
          await AsyncStorage.setItem('myAsyncStorageCourses', JSON.stringify(updatedMyClasses)) 
          : 
          await AsyncStorage.setItem('myAsyncStorageClasses', JSON.stringify(updatedMyClasses));
        setDownloadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[firebaseUrl];
          return newProgress;
        });

        setMyContentState((prevState) => ({
          ...prevState,
          currentContent: '',
          currentContentUrl: '',
          currentContentType: '',
        }));

        console.log(myContentState)
      } else {
        console.error('Download failed:', result);
      }
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  
  //This useEffect checks the myContentState and if the myContentState is complete, then run the storeDownloadedContent.... function
  useEffect(() => {
    if(!isdownloadTriggered)return
    setIsdownloadTriggered(false)
    console.log('Here is the myContentState element for testing',myContentState)
    if (levelState==='Tertiary'){
      
      if (myContentState.currentSubject && myContentState.currentChapter && myContentState.currentContent) {
        console.log('ContentState complete', myContentState);
        setDownloadQueue([...downloadQueue, myContentState,
          myContentState.currentContentUrl,
          myContentState.currentContentType]);
        return;
      }

        console.log('ContentState not complete', myContentState);

    }else{
      if (!myContentState.currentSubject || !myContentState.currentTerm || !myContentState.currentChapter || !myContentState.currentContent) {
        console.log('ContentState not complete');
        return;
      }
      console.log('ContentState complete', myContentState);
      setDownloadQueue([...downloadQueue, myContentState,
        myContentState.currentContentUrl,
        myContentState.currentContentType]);
    }  

  }, [myContentState]);

  

  const goToQuize = useCallback((item,chapterName) => {
    setContentDetails(item);
    setMyContentState((prevState) => ({
      ...prevState,
      currentContent: item.topicName,
      currentContentUrl: item.contentUrl,
      currentContentType: item.contentType,
      currentContentDuration: item.duration,
      currentChapterName:chapterName
    }));
    setQuestions(item.questions);
    navigation.navigate('Quize')
  });

  const downloadContent = useCallback((chapterId, topicName, firebaseUrl, contentType, contentDuration) => {
    setMyContentState((prevState) => ({
      ...prevState,
      currentChapter: chapterId,
      currentContent: topicName,
      currentContentUrl: firebaseUrl,
      currentContentType: contentType,
      currentContentDuration:contentDuration
    }));

    setIsdownloadTriggered(true)

    console.log('Here is the contentType', contentType);
  }, []);

  const deleteDownloadedContent = async (downloadFilePath, chapterId, contentUrl) => {
    setIsDeletingInProgress(true)
    setIsDeletingComplete(false)
    try {
      await RNFS.unlink(downloadFilePath);
      console.log('Deleted:', downloadFilePath);
      const updatedMyClasses = [...myClasses];  
      const subjectIndex = levelState === 'Tertiary'? myClasses.findIndex(sub => sub.courseId === myContentState.currentSubject) : myClasses.findIndex(sub => sub.subjectId === myContentState.currentSubject);
      if (subjectIndex === -1) {
        console.error(`Error: Subject with id ${myContentState.currentSubject} not found`);
        return;
      }

      let termIndex = 0;

      if(!levelState==='Tertiary'){
        termIndex = myClasses[subjectIndex].terms.findIndex(term => term.termId === myContentState.currentTerm);
        if (termIndex === -1) {
          console.error(`Error: Term with id ${myContentState.currentTerm} not found in subject ${myContentState.currentSubject}`);
          return;
        }
      }

      const chapterIndex = levelState ==='Tertiary'?
        myClasses[subjectIndex].chapters.findIndex(chap => chap.id === chapterId)
        : 
        myClasses[subjectIndex].terms[termIndex].chapters.findIndex(chap => chap.id === chapterId);
      if (chapterIndex === -1) {
        console.error(`Error: Chapter with id ${chapterId} not found in term ${myContentState.currentTerm}`);
        return;
      }

      const itemIndex = levelState ==='Tertiary'?
        myClasses[subjectIndex].chapters[chapterIndex].data.findIndex(item => item.contentUrl === contentUrl) 
        :
        myClasses[subjectIndex].terms[termIndex].chapters[chapterIndex].data.findIndex(item => item.contentUrl === contentUrl);
      if (itemIndex === -1) {
        console.error(`Error: Content item with name ${contentUrl} not found in chapter ${chapterId}`);
        return;
      }

      levelState ==='Tertiary'?
        updatedMyClasses[subjectIndex].chapters[chapterIndex].data[itemIndex].downloadFilePath = null
        :
        updatedMyClasses[subjectIndex].terms[termIndex].chapters[chapterIndex].data[itemIndex].downloadFilePath = null;
      setMyClasses(updatedMyClasses);


      levelState === "Tertiary"?
        await AsyncStorage.setItem('myAsyncStorageCourses', JSON.stringify(updatedMyClasses))
        :
        await AsyncStorage.setItem('myAsyncStorageClasses', JSON.stringify(updatedMyClasses));
        setIsDeletingInProgress(false)
        setIsDeletingComplete(true)
    } catch (error) {
      console.error('Delete error:', error);
      setIsDeletingInProgress(false)
      setIsDeletingComplete(true)
    }
  };

  

  const goToVidOrPDF = useCallback((item, chapterName) => {
    setContentDetails(item);
    setMyContentState((prevState) => ({
      ...prevState,
      currentContent: item.topicName,
      currentContentUrl: item.contentUrl,
      currentContentType: item.contentType,
      currentContentDuration: item.duration,
      currentChapterName:chapterName
    }));
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
    console.log('Here is the item in the last item found', isLastItem);

    if (item.contentType === 'exercise') {
      console.log("Here is the contentUrl in the renderItem",item.contentUrl)
        return (
          <QuizeContainer
            title={item.topicName}
            duration={item.duration}
            onPressHandle={() => goToQuize(item,section.name)}
            noOfQuestions={item.noOfQuestions}
            onPressDownloadButton={() => downloadContent(chapterId, item.title)}
            contentUrl={item.contentUrl}
          />
        );
      
    } else {
      return (
        <View>
          <VideoOrBookContainer
            title={item.topicName}
            contentType={item.contentType}
            duration={item.duration}
            onPressHandle={() => goToVidOrPDF(item,section.name)}
            onPressDownloadButton={() => downloadContent(chapterId, item.topicName, item.contentUrl, item.contentType, item.duration)}
            downloadPath={item.downloadFilePath}
            contentUrl={item.contentUrl}
            deleteDownloadedContent = {()=>deleteDownloadedContent(item.downloadFilePath, chapterId, item.contentUrl)}
            deletingState={isDeletingInProgress}
            deleteComplete={isDeletingComplete}
          />
          {isLastItem && <View style={[styles.horizontalLine, { backgroundColor: Colors.primary }]} />}
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
    fontSize: FontSizes.heading3,
    fontFamily: 'ComicNeue-Bold',
    marginBottom: 20,
  },
  horizontalLine: {
    height: 1,
    backgroundColor:'white',
    marginHorizontal: 16,
    marginTop: 20,
  },
});

export default memo(ContentList);

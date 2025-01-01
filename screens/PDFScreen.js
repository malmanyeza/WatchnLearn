import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from '../components/Header';
import Pdf from 'react-native-pdf';
import { useThemeContext } from '../hooks/themeContext';
import { useContentContext } from '../hooks/contentContext';
import { useUserDataContext } from '../hooks/userDataContext';
import { useCompletedWorkContext } from '../hooks/completedWorkContext';
import { useAllSubjectsContext } from '../hooks/allSubjectsContext';
import { useNavigation } from '@react-navigation/native';

const PDFScreen = () => {
  const { contentDetails } = useContentContext();
  const { contentUrl, downloadFilePath } = contentDetails || {};
  const { theme } = useThemeContext();
  const { myContentState, currentQuestionPaperOrSyllabus, setCurrentQuestionPaperOrSyllabus } = useAllSubjectsContext();
  const { userDetails } = useUserDataContext();
  const { updateCompletedWork } = useCompletedWorkContext();
  const navigation = useNavigation();

  const studentId = userDetails?.userId; // Safe access with optional chaining
  const currentSubject = myContentState?.currentSubject; // Safe access
  const contentType = myContentState?.currentContentType;
  const contentDuration = myContentState?.currentContentDuration;
  const chapterName = myContentState?.currentChapterName;

  // Check if essential variables are defined
  if (!contentUrl && !downloadFilePath && !currentQuestionPaperOrSyllabus) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.primaryBackground }]}>
        <Header title={'PDF'} />
        <Text style={styles.errorText}>Error: No content available to display.</Text>
      </View>
    );
  }

  const goBack = () => {
    setCurrentQuestionPaperOrSyllabus(null);
    navigation.goBack();
    console.log('currentQuestionPaperOrSyllabus now is')
  };


 

  let pdfSource;
  if (downloadFilePath) {
    pdfSource = `file://${downloadFilePath}`; // Use downloadFilePath with file:// prefix
  } else {
    pdfSource = contentUrl; // Fallback to contentUrl
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primaryBackground }]}>
      <Header title={'PDF'} navigateTo={currentQuestionPaperOrSyllabus?()=>goBack():null} />
      {!currentQuestionPaperOrSyllabus ? (
        <Pdf
          trustAllCerts={false}
          source={{ uri: pdfSource, cache: true }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
            console.log('Here are the details', currentSubject, contentUrl, contentType, contentDuration);
            updateCompletedWork(currentSubject, contentUrl, contentType, contentDuration,chapterName);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={[styles.pdf, { backgroundColor: theme.colors.primaryBackground }]}
        />
      ) : (
        <Pdf
          trustAllCerts={false}
          source={{ uri: currentQuestionPaperOrSyllabus, cache: true }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={[styles.pdf, { backgroundColor: theme.colors.primaryBackground }]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'ComicNeue-Bold',
  },
});

export default memo(PDFScreen);

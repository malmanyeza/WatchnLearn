import React, { memo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useThemeContext } from '../../hooks/themeContext';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';
import CircularProgressBar from './CircularProgressBar';
import { useCompletedWorkContext } from '../../hooks/completedWorkContext';
import FontSizes from '../../constants/FontSizes';
import DeleteConfirmationModal from '../DeleteConfirmationModal';

const VideoOrBookContainer = ({
  title,
  contentType,
  duration,
  onPressHandle,
  onPressDownloadButton,
  downloadPath,
  contentUrl, // Assuming contentUrl is passed as a prop
  deleteDownloadedContent,
  deletingState,
  deleteComplete
}) => {
  console.log(VideoOrBookContainer, 'rendered');
  const { completedWork } = useCompletedWorkContext();
  const { theme } = useThemeContext();
  const { currentDownload, downloadQueue, downloadProgress, myContentState } = useAllSubjectsContext();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };

  useEffect(()=>{
    if(deleteComplete){
      setDeleteModalVisible(false)
    }
  },[deleteComplete])


  const isDownloading = currentDownload && currentDownload.currentContentUrl === contentUrl;
  const isInQueue = downloadQueue.some(d => d.currentContentUrl === contentUrl);
  const progress = downloadProgress[contentUrl];

  // Check if the contentUrl is completed based on myContentState.currentSubject
  const isCompleted = completedWork.some(subject => 
    subject.name === myContentState.currentSubject && 
    subject.items.some(item => item.contentUrl === contentUrl)
  );

  return (
    <TouchableOpacity onPress={onPressHandle} style={[styles.container, { backgroundColor: theme.colors.primaryBackground }]}>
      {isCompleted ? (
        <Ionicons name="checkmark-circle" size={24} color={theme.colors.text} />
      ) : (
        contentType === 'video' ? (
          <Ionicons name="videocam-outline" size={24} color={theme.colors.text} />
        ) : (
          <Ionicons name="book-outline" size={24} color={theme.colors.text} />
        )
      )}
      <View style={styles.infoContainer}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
          {contentType === 'video' ? 'Video' : 'Reading'} . {duration}
        </Text>
      </View>
      {downloadPath ? (
        <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
         <Ionicons name="trash-outline" size={20} color={theme.colors.text} />
        </TouchableOpacity>
      ) : (
        <View>
          {isDownloading ? (
            <Text>{progress ? (
              <CircularProgressBar
                progress={progress}
              />
            ) : 'Starting...'}</Text>
          ) : isInQueue ? (
            <Text>Waiting...</Text>
          ) : (
            <TouchableOpacity onPress={onPressDownloadButton}>
              <Ionicons name="cloud-download-outline" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          )}
        </View>
      )}
      <DeleteConfirmationModal
       isVisible={isDeleteModalVisible}
       onCancel={handleCancelDelete}
       onDelete={deleteDownloadedContent}
       modalText={'Are you sure you want to delete this content?'}
       deletingState={deletingState}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  title: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: FontSizes.heading4,
  },
  subtitle: {
    marginTop: 4,
    fontFamily: 'ComicNeue-Regular',
    fontSize: FontSizes.body2,
    color: '#666',
  },
});

export default memo(VideoOrBookContainer);

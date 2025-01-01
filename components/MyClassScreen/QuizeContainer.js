import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useThemeContext } from '../../hooks/themeContext';
import { useCompletedWorkContext } from '../../hooks/completedWorkContext';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';

const QuizeContainer = ({ title, duration, onPressHandle, noOfQuestions, contentUrl }) => {
  const { theme } = useThemeContext();
  const { completedWork } = useCompletedWorkContext();
  const { myContentState } = useAllSubjectsContext();
  const subjectId = myContentState.currentSubject;

  // Check if the contentUrl is completed based on the completedWork set
  const isCompleted = completedWork.some(subject => {
    console.log(`Checking subject: ${subject.name}`); // Log the subject name
    if (subject.name === subjectId) {
      return subject.items.some(item => {
        console.log(`Checking contentUrl: ${item.contentUrl}`); // Log each contentUrl
        return item.contentUrl === contentUrl;
      });
    }
    return false;
  });
  

  return (
    <TouchableOpacity onPress={onPressHandle} style={[
      styles.container,
      { backgroundColor: theme.colors.primaryBackground }
    ]}>
      {isCompleted ? (
        <Ionicons name="checkmark-circle" size={24} color={theme.colors.text} />
      ) : (
        <Ionicons name='newspaper-outline' size={24} color={theme.colors.text} />
      )}
      <View style={styles.infoContainer}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>{noOfQuestions} questions . {duration}</Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="cloud-download-outline" size={24} color={theme.colors.text} />
      </TouchableOpacity>
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
    fontSize: 20,
  },
  subtitle: {
    fontFamily: 'ComicNeue-Regular',
    fontSize: 16,
  },
});

export default memo(QuizeContainer);

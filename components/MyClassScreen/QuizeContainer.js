import React,{memo} from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { useThemeContext } from '../../hooks/themeContext';

const QuizeContainer = ({ title, duration, onPressHandle, noOfQuestions }) => {

const {theme} = useThemeContext()

  return (
    <TouchableOpacity onPress={onPressHandle} style={
      [
        styles.container,
        {backgroundColor:theme.colors.primaryBackground}
      ]
    }>
      <Ionicons name='newspaper-outline' size={24} color={theme.colors.text} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{noOfQuestions} questions.({duration})</Text>
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
    fontSize: 15,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
  },
});

export default QuizeContainer;

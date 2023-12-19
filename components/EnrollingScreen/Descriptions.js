import React, { useState, memo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const Description = ({descriptionText}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What you will learn</Text>
      <ScrollView style={[styles.descriptionContainer, { height: expanded ? height * 0.25 : undefined }]}>
        <Text numberOfLines={expanded ? undefined : 3} style={styles.description}>
          {descriptionText}
        </Text>
        {!expanded && (
          <TouchableOpacity onPress={toggleExpanded}>
            <Text style={styles.readMore}>Read more</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  description: {
    fontSize: 16,
  },
  readMore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'right',
    marginVertical: 5,
  },
});

export default memo(Description);

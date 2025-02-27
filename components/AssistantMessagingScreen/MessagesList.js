import React, { useRef, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import MessageBox from './MessageBox';
import { useThemeContext } from '../../hooks/themeContext';

const MessagesList = ({ messages }) => {
  const { theme } = useThemeContext();
  const flatListRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
    console.log("here is a list of messages:", messages)
  }, [messages]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primaryBackground }]}>
      <FlatList
        style={{paddingBottom:50}}
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => <MessageBox message={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default MessagesList;

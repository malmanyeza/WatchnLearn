import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView, Alert } from 'react-native';
import MessagesList from '../components/AssistantMessagingScreen/MessagesList';
import Header from '../components/Header';
import MessageInput from '../components/AssistantMessagingScreen/MessagingInput';
import { useThemeContext } from '../hooks/themeContext';
import { functions } from '../FirebaseConfig';

const AssistantMessagingScreen = () => {
  const { theme } = useThemeContext();
  const [messages, setMessages] = useState([]);

  const addMessage = async (text) => {
    const newMessage = { id: (messages.length + 1).toString(), text, role: 'user' };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const mathTutor = functions.httpsCallable('mathTutor');
      const result = await mathTutor({ message: text });
      const response = result.data.response;

      if (response) {
        const assistantMessage = { id: (messages.length + 2).toString(), text: response, role: 'assistant' };
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      } else {
        Alert.alert('Error', 'No response from the assistant.');
      }
    } catch (error) {
      Alert.alert('Error', `An error occurred: ${error.message}`);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={[styles.container, { backgroundColor: theme.colors.primaryBackground }]}
      >
        <Header title="Assistant Messaging" />
        <View style={styles.messageListContainer}>
          <MessagesList messages={messages} />
        </View>
        <MessageInput onSend={addMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageListContainer: {
    flex: 1,
  },
});

export default AssistantMessagingScreen;

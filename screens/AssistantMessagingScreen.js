import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import MessagesList from '../components/AssistantMessagingScreen/MessagesList';
import Header from '../components/Header';
import MessageInput from '../components/AssistantMessagingScreen/MessagingInput';
import { useThemeContext } from '../hooks/themeContext';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../FirebaseConfig';

const AssistantMessagingScreen = () => {
  const { theme } = useThemeContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateUniqueId = () => `${Date.now()}-${Math.random()}`;

  const handleSendMessage = async (text) => {
    const newMessage = {
      id: generateUniqueId(),
      role: 'user',
      content: text,
    };

    console.log("here is the new message send:",text)

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setLoading(true);

    try {
      const mathTutor = httpsCallable(functions, 'mathTutor');
      const result = await mathTutor({ message: text });

      const assistantMessage = {
        id: generateUniqueId(),
        role: 'assistant',
        content: result.data.response,
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      setLoading(false)
    } catch (error) {
      console.log('Error fetching response:', error);
      const errorMessage = {
        id: generateUniqueId(),
        role: 'assistant',
        content: `Error: ${error.message}`,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      setLoading(false)
    } finally {
      setLoading(false);
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
          {loading && (
            <ActivityIndicator
              size="small"
              color={theme.colors.primary}
              style={styles.loading}
            />
          )}
        </View>
        <MessageInput onSend={handleSendMessage} />
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
  loading: {
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default AssistantMessagingScreen;

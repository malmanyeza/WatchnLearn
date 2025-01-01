import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeContext } from '../../hooks/themeContext';

const MessageInput = ({ onSend }) => {
  const { theme } = useThemeContext();
  const [message, setMessage] = useState('');
  const [inputHeight, setInputHeight] = useState(40);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
      setInputHeight(40);
    }
  };

  return (
    <View style={[styles.inputContainer, { backgroundColor: theme.colors.tetiaryBackground }]}>
      <TextInput
        style={[styles.textInput, { height: Math.min(inputHeight, 120), backgroundColor: theme.colors.tetiaryBackground }]}
        placeholder="Message Assistant"
        value={message}
        onChangeText={setMessage}
        multiline
        onContentSizeChange={(event) => setInputHeight(event.nativeEvent.contentSize.height)}
      />
      <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
        <Icon name="send" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 10,
    paddingVertical: 5,
    height:50,
    marginHorizontal:10,
    marginBottom:10
  },
  textInput: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 20,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MessageInput;

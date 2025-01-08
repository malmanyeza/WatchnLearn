import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MathView from 'react-native-math-view';

// Regular expressions to match LaTeX and bold patterns
const latexRegex = /\\\[(.*?)\\\]|\\\((.*?)\\\)/g;
const boldRegex = /\*\*(.*?)\*\*/g;

const MessageBox = ({ message }) => {
  const isUser = message.role === 'user';
  const messageBoxStyle = isUser ? styles.userMessageBox : styles.assistantMessageBox;
  const messageTextStyle = isUser ? styles.userMessageText : styles.assistantMessageText;

  // Safeguard against undefined or null `message.text`
  const messageText = message.content ||''

  // Function to process the text and identify LaTeX or bold parts
  const processText = (text) => {
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = latexRegex.exec(text)) !== null) {
      if (lastIndex < match.index) {
        const subText = text.slice(lastIndex, match.index);
        processBold(subText, parts);
      }

      parts.push({ text: match[0], type: 'latex' });
      lastIndex = latexRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex);
      processBold(remainingText, parts);
    }

    return parts;
  };

  // Function to process bold text
  const processBold = (text, parts) => {
    let lastBoldIndex = 0;
    let boldMatch;

    while ((boldMatch = boldRegex.exec(text)) !== null) {
      if (lastBoldIndex < boldMatch.index) {
        parts.push({ text: text.slice(lastBoldIndex, boldMatch.index), type: 'text' });
      }

      parts.push({ text: boldMatch[1], type: 'bold' });
      lastBoldIndex = boldRegex.lastIndex;
    }

    if (lastBoldIndex < text.length) {
      parts.push({ text: text.slice(lastBoldIndex), type: 'text' });
    }
  };

  const parts = processText(messageText);

  return (
    <View style={[styles.messageBox, messageBoxStyle]}>
      {parts.map((part, index) => {
        if (part.type === 'latex') {
          return (
            <MathView
              key={index}
              math={`\\textstyle ${part.text.replace(/\\\[(.*?)\\\]/g, '$1').replace(/\\\((.*?)\\\)/g, '$1')}`}
              style={[messageTextStyle, { fontSize: 14 }]}
            />
          );
        } else if (part.type === 'bold') {
          return (
            <Text key={index} style={[messageTextStyle, { fontWeight: 'bold' }]}>
              {part.text}
            </Text>
          );
        } else {
          return (
            <Text key={index} style={messageTextStyle}>
              {part.text}
            </Text>
          );
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  messageBox: {
    maxWidth: '80%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  userMessageBox: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 15,
  },
  assistantMessageBox: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F0F0',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 15,
  },
  userMessageText: {
    color: '#000',
  },
  assistantMessageText: {
    color: '#000',
  },
});

export default MessageBox;

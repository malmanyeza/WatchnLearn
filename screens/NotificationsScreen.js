import React, {memo} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header'
import MessagesList from '../components/NotificationScreen/MessagesList';
import { useThemeContext } from '../hooks/themeContext';

const NotificationsScreen = () => {

const {theme} = useThemeContext()

  return (
    <View style={
      [
        styles.container,
        {backgroundColor:theme.colors.primaryBackground}
      ]
    }>
      <Header
       title={'Notifications'}
      />
      <MessagesList/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  }
  // Add more styles as needed
});

export default memo(NotificationsScreen);

import React, {memo} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header'
import { useThemeContext } from '../hooks/themeContext';
import NotificationContainer from '../components/NotificationScreen/NotificationContainer';

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
     <NotificationContainer/>
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

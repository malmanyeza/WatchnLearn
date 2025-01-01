import React, { memo, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Header from '../components/Header';
import NotificationItem from '../components/NotificationScreen/NotificationItem';
import { useThemeContext } from '../hooks/themeContext';
import { useUserDataContext } from '../hooks/userDataContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const NotificationsScreen = () => {
  const { notifications, resetNotifications } = useUserDataContext();
  const { theme } = useThemeContext();
  const navigation = useNavigation();

  // useEffect to call resetNotifications when navigating away from the screen
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        resetNotifications();
      };
    }, [resetNotifications])
  );

  return (
    <View style={[
      styles.container,
      { backgroundColor: theme.colors.primaryBackground }
    ]}>
      <Header title={'Notifications'} />
      <FlatList
        style={styles.list}
        data={notifications}
        renderItem={({ item }) => <NotificationItem notification={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  separator: {
    height: 0.5, // Thickness of the line
    width: '100%', // Light gray color, adjust the opacity as needed
    paddingHorizontal: 10,
  },
  list: {
    padding: 10,
  },
});

export default memo(NotificationsScreen);

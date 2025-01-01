import React,{memo} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useThemeContext } from '../../hooks/themeContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const NotificationItem = ({ notification }) => {
  const { theme } = useThemeContext();
  const { avatar, name, message, time, seen, unattended } = notification;

  return (
    <View>
      <View style={[
        styles.notificationContainer, 
        { backgroundColor: seen ? theme.colors.primaryBackground : theme.colors.secondaryBackground }
      ]}>
        <View style={styles.leftContainer}>
          
          <Image source={{ uri: avatar }} style={styles.avatar} />
        </View>

        <View style={styles.middleContainer}>
          <View style={styles.headerContainer}>
            <Text style={[styles.name, { color: theme.colors.primaryText }]}>{name}</Text>
            <Text style={[styles.time, { color: theme.colors.secondaryText }]}>{time}</Text>
          </View>
          <Text style={[styles.message, { color: theme.colors.primaryText }]}>{message}</Text>
          {unattended && (
            <TouchableOpacity style={[styles.button, styles.unattendedButton]}>
              <Text style={styles.buttonText}>Unattended</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.rightContainer}>
          <TouchableOpacity>
            <FontAwesome name="trash-o" size={20} color={theme.colors.primaryText} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.separator, { backgroundColor: theme.colors.secondaryBackground }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    height: 'auto', // Set a fixed height for all notifications
    paddingVertical:10
  },
  leftContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  unseenIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:10
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  time: {
    fontSize: 12,
    marginLeft: 10,
  },
  message: {
    fontSize: 14,
    marginVertical: 5,
    marginBottom:20
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  unattendedButton: {
    borderColor: 'blue',
    borderWidth: 1,
    width: 'auto',

  },
  buttonText: {
    fontSize: 12,
    color: 'blue',
  },
  rightContainer: {
    justifyContent: 'center',
  },
  separator: {
    height: 0.3,
    width: '100%',
  },
});

export default memo(NotificationItem);

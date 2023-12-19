import React, {memo} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
 
const Header = () => {
    const userName = 'Malvern'
    const userAvatar = require('../../assets/images/Malvern.jpg')
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <Image source={ userAvatar } style={styles.avatar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  welcomeText: {
    fontSize: 14,
    color: 'gray',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default memo(Header);

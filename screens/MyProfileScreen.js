import React, {memo} from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar} from 'react-native';
import ProfileHeader from '../components/MyProfileScreen/ProfileHeader';
import { useThemeContext } from '../hooks/themeContext';
import Statistics from '../components/MyProfileScreen/Statistics';
import Achievements from '../components/MyProfileScreen/Achievements';
import MyProfileHeader from '../components/MyProfileScreen/MyProfileHeader';
import FriendSuggestionList from '../components/MyProfileScreen/FriendSuggestionList';

const MyProfileScreen = () => {

  const {theme} = useThemeContext()
  return (
    <View style={[styles.container,{backgroundColor:theme.colors.primaryBackground}]}>
      <MyProfileHeader
          title ={'Profile'}
      />
      <ScrollView>
        <ProfileHeader/>
        <Statistics/>
        <Achievements/>
        <FriendSuggestionList/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default memo(MyProfileScreen);

import React, {memo} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import SubHeader from '../components/MyProfileScreen/SubHeader';
import MySubscriptions from '../components/MyProfileScreen/MySubscriptions';
import LogOutButton from '../components/MyProfileScreen/LogoutButton';
import { useThemeContext } from '../hooks/themeContext';

const MyProfileScreen = () => {

  const {theme} = useThemeContext()
  return (
    <ScrollView 
     nestedScrollEnabled={true}
     style={[
      styles.container,
      {backgroundColor:theme.colors.primaryBackground}
      ]}>
      <Header
        title={'Profile'}
      />
      <SubHeader
        name={'Malvern'}
        surname={'Manyeza'}
        emailAdress={'malmanyeza@gmail.com'}
      />
      <MySubscriptions/>
      <LogOutButton/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default memo(MyProfileScreen);

import React, {memo} from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import WeeksList from '../components/MyClassScreen/WeeksList';
import ContentList from '../components/MyClassScreen/ContentSectionList';
import Zindex from '../components/MyClassScreen/Z-IndexButton';
import { useThemeContext } from '../hooks/themeContext';
import MyClassHeader from '../components/MyClassScreen/MyClassHeader';
import AssistantMessageButton from '../components/AssistantMessageButton';

const MyClassScreen = () => {

const {theme} = useThemeContext()

  return (
    <View style={
      [
        styles.container,
        {backgroundColor:theme.colors.primaryBackground}
      ]
    }>
        <MyClassHeader
            title={"My Class"}
        />
        <WeeksList/>
        <ContentList/>
        <AssistantMessageButton/>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});

export default memo(MyClassScreen);

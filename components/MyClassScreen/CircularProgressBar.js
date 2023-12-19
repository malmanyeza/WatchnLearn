import React, {memo} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Colors from '../../constants/Colors';
import { useThemeContext } from '../../hooks/themeContext';

const CircularProgressBar = ({progress}) => {

const {theme} = useThemeContext()

  return (
    <View style={
      [
        styles.container,
        {backgroundColor:theme.colors.primaryBackground}
      ]
    }>
       <AnimatedCircularProgress
          size={120}
          width={10}
          fill={progress}
          tintColor={Colors.primary}
          backgroundColor="#daebe8">
            {
            () => (
              <Text style={
                [
                  styles.progressText,
                  {color:theme.colors.text}
                ]
              }>
                {progress}%
              </Text>
            )
          }
        </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    alignItems:'center',
    paddingVertical:10
  },
  progressText:{
    fontSize:30,
  }});

export default memo(CircularProgressBar);

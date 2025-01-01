import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Colors from '../../constants/Colors';
import { useThemeContext } from '../../hooks/themeContext';

const CircularProgressBar = ({ progress }) => {
  const { theme } = useThemeContext();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primaryBackground }]}>
      <AnimatedCircularProgress
        size={30}
        width={2.5}
        fill={progress} // Fill should be the 'progress' value
        tintColor={Colors.primary}
        duration={0}
        tintTransparency={false}
        backgroundColor={theme.colors.secondaryText}
        rotation={0} // Adjust rotation if needed
        lineCap="round" // Use round line cap for smoother edges
      >
        {(fill) => (
          <Text style={[styles.progressText, { color: theme.colors.text }]}>
            {Math.round(progress)}% {/* Display rounded value of 'fill' */}
          </Text>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  progressText: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: 8,
  },
});

export default memo(CircularProgressBar);


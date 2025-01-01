import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

const CustomActivityIndicator = () => {
  const dotSize = 10;
  const dotCount = 3;
  const animationDuration = 1000; // in milliseconds
  const delay = 200; // in milliseconds

  const animatedValue = useRef(new Animated.Value(0)).current;

  const animate = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ]),
      { iterations: -1 }
    ).start();
  };

  useEffect(() => {
    animate();
  }, []);

  const offsetX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2 * Math.PI * dotCount],
  });

  const dotStyle = {
    width: dotSize,
    height: dotSize,
    borderRadius: dotSize / 2,
    backgroundColor: '#000',
    marginHorizontal: 5,
  };

  return (
    <View style={styles.container}>
      {[...Array(dotCount).keys()].map((index) => (
        <Animated.View
          key={index}
          style={[
            dotStyle,
            {
              transform: [
                {
                  translateX: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, Math.cos((2 * Math.PI * index) / dotCount) * dotSize * 2],
                  }),
                },
                {
                  translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, Math.sin((2 * Math.PI * index) / dotCount) * dotSize * 2],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomActivityIndicator;

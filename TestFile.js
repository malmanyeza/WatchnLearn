import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

const CounterScreen = () => {
  const [count, setCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    let timer;

    if (isCounting) {
      timer = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isCounting]);

  const startCounting = () => {
    setIsCounting(true);
  };

  const stopCounting = () => {
    setIsCounting(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Seconds: {count}</Text>
      <View style={{ marginTop: 20 }}>
        {!isCounting ? (
          <Button title="Start Counting" onPress={startCounting} />
        ) : (
          <Button title="Stop Counting" onPress={stopCounting} />
        )}
      </View>
    </View>
  );
};

export default CounterScreen;

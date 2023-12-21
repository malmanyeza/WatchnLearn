import React, { useState, memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Colors from '../../constants/Colors';
import { useContentContext } from '../../hooks/contentContext';
import { useThemeContext } from '../../hooks/themeContext';

const WeeksList = () => {
  const [activeWeek, setActiveWeek] = useState(1);
  const { setWeek } = useContentContext();

  const {theme} = useThemeContext()

  const data = [...Array(12).keys()].map((week) => ({ id: week + 1 }));

  const handleWeekPress = (week) => {
    setActiveWeek(week);
    setWeek(week);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.weekButton,
        { backgroundColor: activeWeek === item.id ? Colors.primary : theme.colors.primaryBackground },
      ]}
      onPress={() => handleWeekPress(item.id)}
    >
      <Text
        style={{
          fontFamily: 'ComicNeue-Bold',
          color: activeWeek === item.id ? 'white' : theme.colors.text,
          fontWeight: activeWeek === item.id ? 'bold' : 'normal',
        }}
      >
        WEEK {item.id}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={
      [
        styles.container,
        {backgroundColor:theme.colors.primaryBackground}
      ]
    }>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingVertical: 5,
  },
  weekButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginLeft: 10,
  },
});

export default WeeksList;

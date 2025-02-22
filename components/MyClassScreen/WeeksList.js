import React, { useState, memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Colors from '../../constants/Colors';
import { useContentContext } from '../../hooks/contentContext';
import { useThemeContext } from '../../hooks/themeContext';

const WeeksList = () => {
  const [activeWeek, setActiveWeek] = useState(1);
  const { setWeek } = useContentContext();
  const { theme } = useThemeContext();

  const data = [...Array(12).keys()].map((week) => ({ id: week + 1 }));

  const handleWeekPress = (week) => {
    setActiveWeek(week);
    setWeek(week);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.weekButton,
        {
          backgroundColor:
            activeWeek === item.id
              ? theme.colors.secondaryBackground
              : theme.colors.primaryBackground,
          borderColor:
            activeWeek === item.id
              ? theme.colors.text
              : theme.colors.secondaryBackground,
          shadowColor: activeWeek === item.id ? theme.colors.text : '#000',
          shadowOpacity: 0.2,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
          elevation: activeWeek === item.id ? 8 : 5, // Android shadow
        },
      ]}
      onPress={() => handleWeekPress(item.id)}
    >
      <Text
        style={{
          fontFamily: activeWeek === item.id ? 'ComicNeue-Bold' : 'ComicNeue-Regular',
          color: theme.colors.text,
          fontSize: 18,
        }}
      >
        WEEK {item.id}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.primaryBackground },
      ]}
    >
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
    marginTop: 10,
  },
  weekButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginLeft: 10,
    marginTop:30,
    marginBottom:20
  },
});

export default memo(WeeksList);

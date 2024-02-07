import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import { useThemeContext } from '../../hooks/themeContext';
import FriendItem from './FriendItem';

const SwipableTopTab = () => {

    const {theme} = useThemeContext()
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'followers', title: 'Followers' },
    { key: 'following', title: 'Following' },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Colors.primary }}
      style={{ backgroundColor: theme.colors.primaryBackground }}
      renderLabel={({ route, focused }) => (
        <TouchableOpacity
          onPress={() => setIndex(routes.findIndex((r) => r.key === route.key))}
          style={[
            styles.tabItem
          ]}
        >
          <Text style={[styles.buttonText,{ color: focused ? Colors.primary : theme.colors.tetiaryBackground }]}>{route.title}</Text>
        </TouchableOpacity>
      )}
    />
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'followers':
        return (
          <ScrollView>
            
              <FriendItem/>
          </ScrollView>
        );
      case 'following':
        return (
          <ScrollView>
            {/* Component for displaying following */}
            <View style={{ height: Dimensions.get('window').height }}>
              <Text>Following</Text>
            </View>
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
    />
  );
};

const styles = StyleSheet.create({
  tabItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
    buttonText: {
        fontSize: 20,
        fontFamily:'ComicNeue-Bold',
    },
});

export default SwipableTopTab;

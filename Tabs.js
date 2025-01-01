import React from 'react';
import { useColorScheme, View, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from './screens/HomeScreen';
import MyClassesScreen from './screens/MyClassesScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import NotificationIcon from './components/NotificationScreen/NotificationIcon';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useAllSubjectsContext } from './hooks/allSubjectsContext';

const Tab = createMaterialBottomTabNavigator();

const renderSkeletonIcon = (colorScheme) => (
  <SkeletonPlaceholder
    backgroundColor={colorScheme === 'dark' ? "#2c2c2c" : '#F6F6F6'}
    highlightColor={colorScheme === 'dark' ? "#111111" : '#F9F9F9'}
  >
    <SkeletonPlaceholder.Item width={70} height={40} borderRadius={10} />
  </SkeletonPlaceholder>
);

export const Tabs = () => {
  const colorScheme = useColorScheme();
  const { myClasses, loadingSubjects } = useAllSubjectsContext();

  const initialRoute = myClasses.length > 0 ? 'MyClasses' : 'Home';

  return (
    <Tab.Navigator
      initialRouteName={initialRoute}
      shifting={loadingSubjects ? false : true}
      sceneAnimationEnabled={true}
      barStyle={{
        paddingHorizontal: 5,
        backgroundColor: colorScheme === 'dark' ? "#111111" : '#FAFAFA',
        
        borderTopColor: colorScheme === 'dark' ? "#616161" : '#E0E0E0',
        justifyContent:'space-between'
      }}
      activeColor={colorScheme === 'dark' ? "white" : '#007BFF'}
      inactiveColor={colorScheme === 'dark' ? "white" : '#010c17'}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: loadingSubjects ? '' : 'Home',
          tabBarIcon: ({ color, focused }) => (
            loadingSubjects
              ? renderSkeletonIcon(colorScheme)
              : (
                <View style={styles.iconWrapper}>
                  {focused && (
                    <View style={styles.shadowContainer}>
                      <FontAwesome name="home" size={20} color={color} />
                    </View>
                  )}
                  {!focused && <FontAwesome name="home" size={20} color={color} />}
                </View>
              )
          ),
        }}
      />
      <Tab.Screen
        name="MyClasses"
        component={MyClassesScreen}
        options={{
          tabBarLabel: loadingSubjects ? '' : 'My Classes',
          tabBarIcon: ({ color, focused }) => (
            loadingSubjects
              ? renderSkeletonIcon(colorScheme)
              : (
                <View style={styles.iconWrapper}>
                  {focused && (
                    <View style={styles.shadowContainer}>
                      <FontAwesome name="book" size={20} color={color} />
                    </View>
                  )}
                  {!focused && <FontAwesome name="book" size={20} color={color} />}
                </View>
              )
          ),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={NotificationsScreen}
        options={{
          tabBarLabel: loadingSubjects ? '' : 'Notifications',
          tabBarIcon: ({ color, focused }) => (
            loadingSubjects
              ? renderSkeletonIcon(colorScheme)
              : (
                <View style={styles.iconWrapper}>
                  {focused && (
                    <View style={styles.shadowContainer}>
                      <NotificationIcon color={color} />
                    </View>
                  )}
                  {!focused && <NotificationIcon color={color} />}
                </View>
              )
          ),
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          tabBarLabel: loadingSubjects ? '' : 'My Profile',
          tabBarIcon: ({ color, focused }) => (
            loadingSubjects
              ? renderSkeletonIcon(colorScheme)
              : (
                <View style={styles.iconWrapper}>
                  {focused && (
                    <View style={styles.shadowContainer}>
                      <FontAwesome name="user" size={20} color={color} />
                    </View>
                  )}
                  {!focused && <FontAwesome name="user" size={20} color={color} />}
                </View>
              )
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadowContainer: {
    backgroundColor: 'rgba(0, 243, 53, 0.1)',
    width: 80, // Adjust width for horizontal ellipse
    height: 35, // Adjust height for vertical ellipse
    borderRadius: 40, // Make it elliptical (width/2)
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 5 }, // Adjust shadow position
    shadowOpacity: 0.8,
    shadowRadius: 10, // Adjust shadow blur
    elevation: 5, // For Android shadow
    marginBottom: 25, // Push the icon up
  },
});

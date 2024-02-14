import React from 'react';
import { useColorScheme } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import MyClassesScreen from './screens/MyClassesScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import { useAllSubjectsContext } from './hooks/allSubjectsContext';


const Tab = createMaterialBottomTabNavigator();

export const Tabs = () => {
  const colorScheme = useColorScheme();

  const { myClasses } = useAllSubjectsContext();
  const initialRoute = !myClasses.length > 0 ? 'Home' : 'MyClasses';

  return (
    <Tab.Navigator
      initialRouteName={initialRoute}
      shifting={true}
      barStyle={{
        marginHorizontal: -5,
        backgroundColor: colorScheme === 'dark' ? "#02070f" : '#FAFAFA',
        height: 70,
        borderWidth: 2,
        borderTopColor: colorScheme === 'dark' ? "#616161" : '#E0E0E0'
      }}
      activeColor={colorScheme === 'dark' ? "white" : 'gray'}
      inactiveColor='gray'
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyClasses"
        component={MyClassesScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'library' : 'library-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'notifications' : 'notifications-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};



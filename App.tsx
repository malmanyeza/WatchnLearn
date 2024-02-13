import React,{useEffect} from 'react';
import { StyleSheet, StatusBar, useColorScheme, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import MyClassesScreen from './screens/MyClassesScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import { Stacks } from './Stacks';
import { SubjectProvider } from './hooks/subjectDetailsConst';
import { AllSubjectsProvider } from './hooks/allSubjectsContext';
import { ContentProvider } from './hooks/contentContext';
import { UserDataProvider } from './hooks/userDataContext';
import { useTheme } from 'react-native-paper';
import { ThemeProvider } from './hooks/themeContext';
import SplashScreen from 'react-native-splash-screen';


const Tab = createMaterialBottomTabNavigator();

export const HomeTabs = () => {

  const colorScheme = useColorScheme();
  

  useEffect(() => {
    // Delay for 2 seconds (2000 milliseconds) before hiding the splash screen
    const timeoutId = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    LogBox.ignoreAllLogs()
    // Clear the timeout if the component unmounts before the delay completes
    return () => clearTimeout(timeoutId);
  }, []);
  
  return(

  <Tab.Navigator
    
          shifting={true}
          barStyle={{
             marginHorizontal:-5,
             backgroundColor: colorScheme=== 'dark'?"#02070f":'#FAFAFA' , 
             height:70, 
             borderWidth:2,
             borderTopColor: colorScheme=== 'dark'?"#616161":'#E0E0E0'
          }}
          activeColor={colorScheme=== 'dark'?"white":'gray'}
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
)};



export const MyClassesTabs = () => { 

  const colorScheme = useColorScheme();
  return(
  <Tab.Navigator
          initialRouteName='MyClasses'
          shifting={true}
          barStyle={{
             marginHorizontal:-5,
             backgroundColor: colorScheme=== 'dark'?"#02070f":'#FAFAFA' , 
             height:70, 
             borderWidth:2,
             borderTopColor: colorScheme=== 'dark'?"#616161":'#E0E0E0'
          }}
          activeColor={colorScheme=== 'dark'?"white":'gray'}
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
)}


export default function App() {

  useEffect(() => {
    // Delay for 2 seconds (2000 milliseconds) before hiding the splash screen
    const timeoutId = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    LogBox.ignoreAllLogs()
    // Clear the timeout if the component unmounts before the delay completes
    return () => clearTimeout(timeoutId);
  }, []);

  const colorScheme = useColorScheme();
  const initialTheme = colorScheme 
  const contentColor = colorScheme === 'dark' ? 'light-content' : 'dark-content';

  const theme = useTheme();
  theme.colors.secondaryContainer= 'transparent'

  return (
    <UserDataProvider>
    <AllSubjectsProvider>
      <SubjectProvider>
        <ContentProvider>
        <ThemeProvider>
          <NavigationContainer>
            <StatusBar backgroundColor={ initialTheme==='dark'?'#02070f':"#FAFAFA"} barStyle={contentColor} />
            <Stacks/>
          </NavigationContainer>
          </ThemeProvider>
        </ContentProvider>
      </SubjectProvider>
    </AllSubjectsProvider>
    </UserDataProvider>
    
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 50, // Adjust the height as needed
  },
});
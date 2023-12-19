import React from 'react';
import { StyleSheet, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import MyClassesScreen from './screens/MyClassesScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import PopularClassesScreen from './screens/PopularClassesScreen';
import EnrollingScreen from './screens/EnrolligScreen';
import MyClassScreen from './screens/MyClassScreen';
import VideoScreen from './screens/VideoScreen';
import PDFScreen from './screens/PDFScreen';
import QuestionsFeedbackScreen from './screens/QuestionsFeedbackScreen';
import QuestionScreen from './screens/QuestionScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import QuestionPapersScreen from './screens/QuestionPapersScreen';
import { SubjectProvider } from './hooks/subjectDetailsConst';
import { AllSubjectsProvider } from './hooks/allSubjectsContext';
import { ContentProvider } from './hooks/contentContext';
import { useTheme } from 'react-native-paper';
import { ThemeProvider } from './hooks/themeContext';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const HomeTabs = () => {

  const colorScheme = useColorScheme();
  
  return(

  <Tab.Navigator
          shifting={true}
          barStyle={{ backgroundColor: colorScheme=== 'dark'?"black":'white' , height:70 }}
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


export default function App() {

  const colorScheme = useColorScheme();
  const initialTheme = colorScheme 
  const contentColor = colorScheme === 'dark' ? 'light-content' : 'dark-content';

  const theme = useTheme();
  theme.colors.secondaryContainer= 'transparent'

  return (
    
    <AllSubjectsProvider>
      <SubjectProvider>
        <ContentProvider>
        <ThemeProvider>
          <NavigationContainer>
            <StatusBar backgroundColor={ initialTheme==='dark'?'black':"white"} barStyle={contentColor} />
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
              <Stack.Screen name="PopularClasses" component={PopularClassesScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Enrolling" component={EnrollingScreen} options={{headerShown:false}}/>
              <Stack.Screen name="MyClass" component={MyClassScreen} options={{headerShown:false}} />
              <Stack.Screen name="Video" component={VideoScreen} options={{headerShown:false}}/>
              <Stack.Screen name="PDF" component={PDFScreen} options={{headerShown:false}}/>
              <Stack.Screen name="Quize" component={QuestionScreen} options={{headerShown:false}}/>
              <Stack.Screen name="QuestionsFeedback" component={QuestionsFeedbackScreen} options={{headerShown:false}}/>
              <Stack.Screen name="Feedback" component={FeedbackScreen} options={{headerShown:false}}/>
              <Stack.Screen name="QuestionPapers" component={QuestionPapersScreen} options={{headerShown: false}} />
            </Stack.Navigator>
          </NavigationContainer>
          </ThemeProvider>
        </ContentProvider>
      </SubjectProvider>
    </AllSubjectsProvider>
    
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 50, // Adjust the height as needed
  },
});
import React,{useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import EmailAndPasswordScreen from './screens/LoginAndSignUpScreens/EmailAndPasswordScreen';
import UserNameScreen from './screens/LoginAndSignUpScreens/UserNameScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import PopularClassesScreen from './screens/PopularClassesScreen';
import EnrollingScreen from './screens/EnrolligScreen';
import MyClassScreen from './screens/MyClassScreen';
import VideoScreen from './screens/VideoScreen';
import PDFScreen from './screens/PDFScreen';
import QuestionsFeedbackScreen from './screens/QuestionsFeedbackScreen';
import QuestionScreen from './screens/QuestionScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import QuestionPapersScreen from './screens/QuestionPapersScreen';
import LeaderBoardScreen from './screens/LeaderBoardScreen';
import SettingsScreen from './screens/SettingsScreen';
import AchievementsScreen from './screens/Achievements';
import FriendsScreen from './screens/FriendsScreen';
import { HomeTabs } from './App';
import { useUserDataContext } from './hooks/userDataContext';
import {BallIndicator} from 'react-native-indicators';
import Colors from './constants/Colors';
import { useThemeContext } from './hooks/themeContext';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="EmailAndPassword" component={EmailAndPasswordScreen} options={{ headerShown: false }} />
    <Stack.Screen name="UserName" component={UserNameScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
    <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="MyProfile" component={MyProfileScreen} options={{ headerShown: false }} />
    <Stack.Screen name="PopularClasses" component={PopularClassesScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Enrolling" component={EnrollingScreen} options={{ headerShown: false }} />
    <Stack.Screen name="MyClass" component={MyClassScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Video" component={VideoScreen} options={{ headerShown: false }} />
    <Stack.Screen name="PDF" component={PDFScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Quize" component={QuestionScreen} options={{ headerShown: false }} />
    <Stack.Screen name="QuestionsFeedback" component={QuestionsFeedbackScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ headerShown: false }} />
    <Stack.Screen name="QuestionPapers" component={QuestionPapersScreen} options={{ headerShown: false }} />
    <Stack.Screen name="LeaderBoard" component={LeaderBoardScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Achievements" component={AchievementsScreen} options={{ headerShown:false }}/>
    <Stack.Screen name="Friends" component={FriendsScreen} options={{ headerShown:false }}/>
  </Stack.Navigator>
);


const LoadingScreen = () => {
    const { theme } = useThemeContext();
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:theme.colors.primaryBackground}}>
            <BallIndicator color={Colors.primary} size={40} />
        </View>
    )
}

export const Stacks = () => {

    const isLoggedIn = true
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate some delay
        const timeoutId = setTimeout(() => {
        setLoading(false);
        }, 4000);

        return () => clearTimeout(timeoutId);
    }, []);

    if (loading) {
        return <LoadingScreen />;
    }

    return isLoggedIn ? <AppStack /> : <AuthStack />;
};

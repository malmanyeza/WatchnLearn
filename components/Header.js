import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors';
import { useThemeContext } from '../hooks/themeContext';

const Header = ({title, navigateTo}) => {

  const {theme} = useThemeContext()

    const navigation = useNavigation();
    const onBackPress = () => {
        if(!navigateTo)
        {navigation.goBack();}
        else{
          navigateTo()
        }
    }
  return (

    <View style={[
      styles.container,
      {backgroundColor:theme.colors.primaryBackground}
      ]}>
      <TouchableOpacity style={[
        styles.backButton
        ]} onPress={onBackPress}>
        <View style={[
          styles.backButtonCircle,
          {backgroundColor:theme.colors.tetiaryBackground}
          ]}>
          <Ionicons name="chevron-back" size={24} color='white' />
        </View>
      </TouchableOpacity>
      <Text style={[
        styles.title,
        {color:theme.colors.text}
        ]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  backButtonCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:Colors.primary,
    borderWidth:1,
  },
  title: {
    fontSize: 28,
    fontFamily:'ComicNeue-Bold',
  },
});

export default Header;

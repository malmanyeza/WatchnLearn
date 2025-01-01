import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
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
      {backgroundColor:theme.colors.primaryBackground},
      {borderBottomColor:theme.colors.tetiaryBackground}
      ]}>
      <TouchableOpacity style={[
        styles.backButton
        ]} onPress={onBackPress}>
        <View style={[
          styles.backButtonCircle,
          {backgroundColor:theme.colors.backButtonBg}
          ]}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.secondaryText} />
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
    height: 70,
    borderBottomWidth:2,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  backButtonCircle: {
    width: 45,
    height: 45,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily:'ComicNeue-Bold',
  },
});

export default Header;

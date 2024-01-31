import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import { useThemeContext } from '../../hooks/themeContext';

const SettingsHeader = ({title, navigateTo}) => {



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
          styles.backButtonCircle
          ]}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.secondaryText} />
        </View>
      </TouchableOpacity>
      <Text style={[
        styles.title,
        {color:theme.colors.text}
        ]}>{title}
      </Text>
      <TouchableOpacity >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    height: 60,
    paddingHorizontal:20,
  },
  backButton: {
    
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
  saveButtonText:{
    color:Colors.primary,
    fontFamily:'ComicNeue-Bold',
    fontSize:20
  }
});

export default SettingsHeader;

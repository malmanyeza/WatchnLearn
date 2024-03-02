import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import { useThemeContext } from '../../hooks/themeContext';

const MyClassesHeader = ({title, navigateTo}) => {

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
    <View style={[styles.outerContainer,{borderColor:theme.colors.tetiaryBackground}]}>
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
          ]}>{title}</Text> 
      </View>
      <View style={styles.lowerContain}>
        <View style={styles.iconContainer}>
          
          <Image
            source={require('../../assets/images/icons8-lightning-94.png')}
            style={styles.icon}
          />
          <Text style={[
            styles.iconText,{
              color:theme.colors.text,
              fontFamily:'ComicNeue-Bold',
              fontSize:20,
              padding:5,
              color:Colors.primary,
            }
          ]}>13</Text>
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer:{
    borderBottomWidth:2,
    marginBottom:20,
    paddingHorizontal:5
  },
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
    width: 35,
    height: 35,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
    justifyContent:'center',
    alignItems:'center',
    fontSize: 28,
    fontFamily:'ComicNeue-Bold',
  },
  lowerContain:{
    flexDirection:'row',
    paddingHorizontal:10,
    marginVertical:10,
  },
  icon:{
    width:30,
    height:25,
    resizeMode:'contain',
    marginRight:3
  },
  iconContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  iconText:{
    fontFamily:'ComicNeue-Bold',
    fontSize:18
  }
});

export default MyClassesHeader;

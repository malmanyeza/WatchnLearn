import React,{memo} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import { useThemeContext } from '../../hooks/themeContext';
import { useRoute } from '@react-navigation/native';

const MyClassHeader = ({title, navigateTo}) => {

  const route = useRoute();

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
        <TouchableOpacity 
          style={[
            styles.backButton
          ]} 
          onPress={onBackPress}
          
        >
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
        <TouchableOpacity disabled={true} onPress={()=>navigation.navigate('LeaderBoard')}>
          <Ionicons name="shield-outline" size={35} color={theme.colors.primaryBackground} />
        </TouchableOpacity> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer:{
    paddingHorizontal:15
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
  },
  backButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
  icon:{
    width:30,
    height:30,
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

export default memo(MyClassHeader);

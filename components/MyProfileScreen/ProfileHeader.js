import React from 'react'
import {View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useThemeContext } from '../../hooks/themeContext'
import Colors from '../../constants/Colors'


const {height, width} = Dimensions.get('screen')

const ProfileHeader =()=>{

const {theme} = useThemeContext()


    return(
        <View style={[styles.container,{backgroundColor:theme.colors.primaryBackground}]}>
            
            <View style={[styles.header]}>
              <View style={styles.headerTexts}>
                <Text style={[styles.headerName,{color:theme.colors.text}]}>Malvern Manyeza</Text>
                <Text style={[styles.headerDate,{color:theme.colors.secondaryText}]}>Joined June 2020</Text>
              </View>
              <View style={[styles.iconBg, {backgroundColor:theme.colors.tetiaryBackground}]}>
                <Icon name={'person'} color={'gray'} size={25}/>
              </View>
            </View>
            <View style={styles.followContainer} >
                <Text style={styles.followText} >5 Folling</Text>
                <Text style={styles.followText} >4 Followers</Text>
            </View>
            <View style={styles.addfriendsAndShareButton}>
                <TouchableOpacity style={[styles.addfriendsButton,{borderColor:theme.colors.tetiaryBackground}]}>
                    <Icon name={'person'} color={Colors.primary} size={30}/>
                    <Text style={styles.addfriendsText}>
                        ADD FRIENDS
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.shareButton,{borderColor:theme.colors.tetiaryBackground}]}>
                    <Icon name={'share-outline'} color={Colors.primary} size={30}/>
                </TouchableOpacity>
            </View>
            <View style={[styles.border,{borderColor:theme.colors.tetiaryBackground}]} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding:10
    },
    header:{
        paddingTop:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10,
        marginHorizontal:10
    },
    iconBg:{
        justifyContent:'center',
        height:80,
        width:80,
        borderRadius:40,
        alignItems:'center'
    },
    headerTexts:{
    },
    headerName:{
        fontFamily:'ComicNeue-Bold',
        fontSize:25,
        marginVertical:5
    },
    headerDate:{
        fontFamily:'ComicNeue-Regular',
        fontSize:18,
        marginVertical:5
    },
    followContainer:{
        flexDirection:'row',
        paddingHorizontal:10
    },
    followText:{
        marginTop:20,
        marginRight:20,
        fontSize:18,
        fontFamily:"ComicNeue-Bold",
        color:Colors.primary
    },
    addfriendsAndShareButton:{
        justifyContent:'space-between',
        marginTop:20,
        flexDirection:'row',
        paddingHorizontal:10
    },
    addfriendsButton:{
        flexDirection:'row',
        paddingVertical:15,
        paddingHorizontal:30,
        borderWidth:2,
        borderRadius:20,
        borderBottomWidth:4,
        width:'70%',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    addfriendsText:{
        color:Colors.primary,
        fontFamily:'ComicNeue-Bold',
        fontSize:18
    },
    shareButton:{
        width:'25%',
        paddingVertical:15,
        borderWidth:2,
        borderRadius:20,
        borderBottomWidth:4,
        justifyContent:'center',
        alignItems:'center'
    },
    border:{
        marginTop:20,
        borderBottomWidth:3,
        marginHorizontal:-10
    }

})

export default ProfileHeader
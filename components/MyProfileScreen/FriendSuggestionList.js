import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import FriendSuggestionItem from "./FriendSuggestionItem";
import Colors from "../../constants/Colors";
import { useThemeContext } from "../../hooks/themeContext";
import { useNavigation } from "@react-navigation/native";


const FriendSuggestionList =()=>{

const navigation = useNavigation()
const {theme} = useThemeContext()

    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={[styles.headerText,{color:theme.colors.text}]}>Friend suggestions</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Friends')}>
                    <Text style={styles.viewAllText}>VIEW ALL</Text>
                </TouchableOpacity>
            </View>
            <FriendSuggestionItem/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:20,
        paddingLeft:20,
        marginBottom:20
    },
    headerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:20,
        marginRight:20
    },
    headerText:{
        fontSize:25,
        fontFamily:'ComicNeue-Bold'
    },
    viewAllText:{
        color: Colors.primary,
        fontFamily:'ComicNeue-Bold'
    },
})


export default FriendSuggestionList
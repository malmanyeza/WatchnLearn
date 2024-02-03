import React,{useState} from "react";
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import { useThemeContext } from "../../hooks/themeContext";
import Colors from "../../constants/Colors";

const SwipableTopTab =()=>{

    const {theme} = useThemeContext()

    const [viewFollowing, setViewFollowing] = useState(true)

    

    return(
        <View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={()=>setViewFollowing(true)} style={[
                    styles.button,
                    {borderBottomColor: viewFollowing? Colors.primary: theme.colors.tetiaryBackground},
                    {borderBottomWidth: viewFollowing?3 :2}
                ]}>
                    <Text style={[
                        styles.buttonText,
                        {color:viewFollowing?Colors.primary:theme.colors.tetiaryBackground},
                        {fontSize:viewFollowing?22:20}
                    ]}>
                        Following
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setViewFollowing(false)} style={[
                    styles.button,
                    {borderBottomColor: !viewFollowing? Colors.primary: theme.colors.tetiaryBackground},
                    {borderBottomWidth: !viewFollowing?3 :2}
                ]}>
                    <Text style={[
                        styles.buttonText,
                        {color: !viewFollowing?Colors.primary:theme.colors.tetiaryBackground},
                        {fontSize: !viewFollowing?22:20}
                    ]}>
                        Followers
                    </Text>
                </TouchableOpacity>
            </View>
            {
                viewFollowing?
                <View>

                </View>
                :
                <View>
                    
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

    },
    button:{
        justifyContent:'center',
        alignItems:'center'
    },
    buttonsContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    buttonText:{
        fontFamily:'ComicNeue-Bold',
    }
})

export default SwipableTopTab

import React from "react";
import { View , TouchableOpacity, Text, Image, StyleSheet, Dimensions} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from "../../constants/Colors";
import { useThemeContext } from "../../hooks/themeContext";

const {width} = Dimensions.get('screen')

const Message = ({message,  time, senderImage, senderName, messageType, answeredUser, timeNotation, isViewed})=>{

    const {theme} = useThemeContext()

    return(
        <TouchableOpacity style={[styles.container, {backgroundColor:!isViewed? theme.colors.secondaryBackground: null}]} >
            <View style={styles.iconAndAvator}>
                <MaterialIcons name={'circle'} size={10} color={!isViewed?Colors.primary: theme.colors.primaryBackground}/>
                <Image source={senderImage} style={styles.image}/>
            </View>
            <View style={styles.message}>
                {messageType==='question'? 
                (
                    <Text>
                        <Text style={styles.boldText}>
                            {senderName}{' '}
                        </Text>
                        <Text>has posted a question on {message}</Text>
                    </Text>
                )
                :
                (
                    <Text>
                        <Text style={styles.boldText}>
                            {senderName}{' '}
                        </Text>
                        <Text>has answered a question on {message} send by</Text>  
                        <Text style={styles.boldText}>
                            {' '}{answeredUser}{' '}
                        </Text>
                    </Text>
                )}
            </View>
            <View style={styles.timeAndIcon}>
                <Text>{time}{timeNotation}</Text>
                <TouchableOpacity>
                    <Ionicons name={'trash'} size={18} color={'gray'} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default Message

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        paddingVertical:20,
        width:width
    },
    iconAndAvator:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:10
    },
    image:{
        width:50,
        height:50,
        resizeMode:'cover',
        borderRadius:25,
        marginHorizontal:10

    },
    timeAndIcon:{
        marginRight:20,
        justifyContent:'space-between',
        alignItems:'center',
        alignContent:'center',
    },
    boldText:{
        fontWeight:'bold',
    },
    message:{
        flexDirection: 'row',
        alignItems: 'center', 
        width:width*0.65,
        paddingRight :20,
    }

})
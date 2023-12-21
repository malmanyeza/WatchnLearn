import React from 'react'
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native'

const {width} = Dimensions.get('window')

const SubHeader = ({emailAdress, name, surname, image})=>{

    const initialLetter = name.charAt(0).toUpperCase()

    return(
        <View style={styles.container}>
            <View>
               <Text style={styles.name}>{name} {surname}</Text>
               <Text>{emailAdress}</Text>
            </View>
           { image? (<Image source={image} style={styles.imageAvator}/>)
           :
            (<View style={styles.letterAvator}>
                <Text style={styles.initialLetter}>
                    {initialLetter}
                </Text>
            </View>)
            }
        </View>
    )
}

export default SubHeader

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:20,
        width:width,
        alignItems:'center'
    },
    name:{
        fontSize:18,
        marginBottom:5,
        fontFamily:'ComicNeue-Bold'
    },
    emailAndName:{
     
    },
    imageAvator:{
        width:70,
        height:70,
        borderRadius:35,
        resizeMode:'cover'
    },
    letterAvator:{
        backgroundColor:'purple',
        width:70,
        height:70,
        borderRadius:35,
        justifyContent:'center',
        alignItems:'center'
    },
    initialLetter:{
        fontFamily:'ComicNeue-Bold',
        color:'white',
        fontSize:28
    }
})
import React from 'react'
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native'

const {width} = Dimensions.get('screen')

const SubHeader = ()=>{

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
   
})
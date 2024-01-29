import React from 'react'
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native'

const {width} = Dimensions.get('screen')

const SubHeader = ()=>{

    const initialLetter = name.charAt(0).toUpperCase()

    return(
        <View style={styles.container}>
           <Text>Malvern</Text>
           <Text></Text>
        </View>
    )
}

export default SubHeader

const styles = StyleSheet.create({
   
})
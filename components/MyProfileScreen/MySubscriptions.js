import React from "react";
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from "react-native";

const {width} = Dimensions.get('screen')

const MySubscriptions = () =>{

    const data = [
        {
            id:1,
            subjectImage:require('../../assets/images/English.jpg'),
            subjectName:'English',
            period:'monthly',
            date:'23/05/23'
        },
        {
            id:2,
            subjectImage:require('../../assets/images/Chemistry.jpg'),
            subjectName:'Chemistry',
            period:'yearly',
            date:'12/05/23'
        },
        {
            id:3,
            subjectImage:require('../../assets/images/Physics.jpg'),
            subjectName:'Physics',
            period:'monthly',
            date:'05/11/23'
        },
        {
            id:4,
            subjectImage:require('../../assets/images/Biology.jpg'),
            subjectName:'Biology',
            period:'yearly',
            date:'15/05/23'
        },
    ]

    const renderItem =({item})=>(
        <View style={styles.renderItemContainer}>
            <Image source={item.subjectImage} style={styles.subjectImage}/>
            <View style={styles.text}>
                <View>
                    <Text style={styles.subjectName}>{item.subjectName}</Text>
                    <Text style={styles.period}>{item.period}</Text>
                </View>
                <Text style={styles.date}>{item.date}</Text>
            </View>
        </View>
    )
    return(
       <View>
        <Text style={styles.header}>My Subscriptions</Text>
        <FlatList
            data ={data}
            renderItem={renderItem}
            keyExtractor={(item)=>item.id}
            nestedScrollEnabled={true}
        />
       </View> 
    )
}

export default MySubscriptions

const styles = StyleSheet.create({
    renderItemContainer:{
        flexDirection:'row',
        padding:20,
        width:width
    },
    subjectImage:{
        width:50,
        height:50,
        resizeMode:'cover',
        marginRight:20
    },
    subjectName:{
        fontWeight:'bold',
        marginBottom:5
    },
    period:{
        color:'gray',
    },
    header:{
        fontWeight:'bold',
        fontSize:20,
        margin:20
    },
    text:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    date:{
        color:'gray',
        fontSize:12
    }
})
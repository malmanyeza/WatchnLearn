import React from "react";
import { View, FlatList,StyleSheet } from "react-native";
import Message from "./Message";

const MessagesList =()=>{
    
    const notifications = [
        {
            id:1,
            time:2,
            isViewed:false,
            senderName:'Malcom Rusike',
            senderImage:require('../../assets/images/BiologyTutor.jpg'),
            message:'functions',
            messageType:'question',
            timeNotation:'m',
            answeredUser:''
        },
        {
            id:2,
            time:1,
            isViewed:false,
            senderName:'Andrew Farahin',
            senderImage:require('../../assets/images/BiologyTutor.jpg'),
            message:'Trig functions',
            messageType:'question',
            timeNotation:'h',
            answeredUser:''
        },
        {
            id:3,
            time:5,
            isViewed:false,
            senderName:'Makanaka Munyawiri',
            senderImage:require('../../assets/images/ChineseTutor.jpg'),
            message:'Sub Atomic Paticles',
            messageType:'answer',
            answeredUser:'Peshel Garikai',
            timeNotation:'h'
        },
        {
            id:4,
            time:21,
            isViewed:true,
            senderName:'James Thembo',
            senderImage:require('../../assets/images/EnglishTutor.jpg'),
            message:'Radio Activity',
            messageType:'answer',
            answeredUser:'Matthew Gwati',
            timeNotation:'h'
        },
        {
            id:5,
            time:15,
            isViewed:true,
            senderName:'Amanda Chimbunde',
            senderImage:require('../../assets/images/PhysicsTutor.jpg'),
            message:"Paticle Acceleration",
            messageType:'question',
            timeNotation:'h',
            answeredUser:''
        },
        {
            id:6,
            time:3,
            isViewed:true,
            senderName:'James Chamboko',
            senderImage:require('../../assets/images/EconomicsTutor.jpg'),
            message:'quadratic functions',
            messageType:'answer',
            answeredUser:'Amanda Mapira',
            timeNotation:'d'
        },
        {
            id:7,
            time:4,
            isViewed:false,
            senderName:'Rufaro Thembo',
            senderImage:require('../../assets/images/HistoryTutor.jpg'),
            message:'Resolving forces',
            messageType:'question',
            timeNotation:'d',
            answeredUser:''
        },
    ]

    const renderItem =({item})=>(
        <Message
            message={item.message}
            time={item.time}
            isViewed={item.isViewed}
            senderImage={item.senderImage}
            senderName={item.senderName}
            messageType={item.messageType}
            answeredUser={item.answeredUser}
            timeNotation={item.timeNotation}
        />
    )

    return(
        <View style={styles.container}>
            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default MessagesList

const styles = StyleSheet.create({
    container:{
       flex:1 
    }
})
import React from "react";
import {View, Flatlist, StyleSheet} from 'react-native'
import FriendItem from "./FriendItem";



const FriendsList =()=>{

    const dummyData = []

    return(
        <View>
            <Flatlist
                data={dummyData}
                renderItem={<FriendItem/>}
                ItemSeparatorComponent={<View style={styles.separator}/>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container
})

export default FriendsList

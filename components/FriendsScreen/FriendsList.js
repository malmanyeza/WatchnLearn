import React from "react";
import {View, Flatlist, StyleSheet} from 'react-native'
import FriendItem from "./FriendItem";
import { useThemeContext } from "../../hooks/themeContext";


const FriendsList =()=>{

    const {theme} = useThemeContext()

    const dummyData = []

    return(
        <View>
            <Flatlist
                data={dummyData}
                renderItem={<FriendItem/>}
                ItemSeparatorComponent={<View style={[styles.separator,{borderBottomColor:theme.colors.tetiaryBackground}]}/>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

    },
    separator:{
        borderBottomWidth:2
    }
})

export default FriendsList

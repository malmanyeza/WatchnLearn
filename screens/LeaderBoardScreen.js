import React from 'react'
import {View, StyleSheet} from 'react-native'
import { useThemeContext } from '../hooks/themeContext'
import LeagueHeader from '../components/LeaderBoardScreen/LeagueHeader'
import LeagueMemberItem from '../components/LeaderBoardScreen/LeagueMemberItem'
import { LowerBound } from '@tensorflow/tfjs'

const LeaderBoardScreen = ()=>{

const {theme} = useThemeContext()

    return(
        <View style={[styles.container,{backgroundColor:theme.colors.primaryBackground}]}>
            <LeagueHeader/>
            <LeagueMemberItem/>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1
    }
})


export default LeaderBoardScreen
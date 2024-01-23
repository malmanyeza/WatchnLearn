import React from 'react'
import { View, StyleSheet,Text, Dimensions, Image } from 'react-native'
import { useThemeContext } from '../../hooks/themeContext'
import Icon from 'react-native-vector-icons/Ionicons'


const {width, height} = Dimensions.get('screen')

const Statistics =()=>{

const {theme} = useThemeContext()

    return(
        <View style={styles.container}>
            <Text style={[styles.header,{color:theme.colors.text}]} >Statistics</Text>
            <View style={styles.statsRow}>
                <View style={[styles.statsItem,{borderColor:theme.colors.tetiaryBackground}]}>
                  <Image
                    style={styles.icon}
                    source={require('../../assets/images/icons8-flame-94.png')}
                  />
                  <View>
                    <Text style={[styles.statsItemHeader,{color:theme.colors.text}]}>10</Text>
                    <Text style={[styles.statsItemSubHeader,,{color:theme.colors.secondaryText}]}>Day streak</Text>
                  </View>
                </View>
                <View style={[styles.statsItem,{borderColor:theme.colors.tetiaryBackground}]}>
                  <Image
                    style={styles.icon}
                    source={require('../../assets/images/icons8-flame-94.png')}
                  />
                  <View>
                    <Text style={[styles.statsItemHeader,{color:theme.colors.text}]}>10</Text>
                    <Text style={[styles.statsItemSubHeader,{color:theme.colors.secondaryText}]}>Total XP</Text>
                  </View>
                </View>
            </View>
            <View style={styles.statsRow}>
                <View style={[styles.statsItem,{borderColor:theme.colors.tetiaryBackground}]}>
                  <Image
                    style={styles.icon}
                    source={require('../../assets/images/icons8-flame-94.png')}
                  />
                  <View>
                    <Text style={[styles.statsItemHeader,{color:theme.colors.text}]}>10</Text>
                    <Text style={[styles.statsItemSubHeader,{color:theme.colors.secondaryText}]}>Current league</Text>
                  </View>
                </View>
                <View style={[styles.statsItem,{borderColor:theme.colors.tetiaryBackground}]}>
                 <Image
                    style={styles.icon}
                    source={require('../../assets/images/icons8-flame-94.png')}
                  />
                  <View>
                    <Text style={[styles.statsItemHeader,{color:theme.colors.text}]}>10</Text>
                    <Text style={[styles.statsItemSubHeader,{color:theme.colors.secondaryText}]}>Top 3 finishes</Text>
                  </View>
                </View>
            </View>
            <View style={[styles.border,{borderColor:theme.colors.tetiaryBackground}]}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      marginVertical:20,
      paddingHorizontal:10
    },
    statsRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:10
    },
    statsItem:{
        flexDirection:'row',
        borderWidth:3,
        borderRadius:20,
        paddingtop:10,
        paddingHorizontal:20,
        width:'48%',
        paddingVertical:15
    },
    header:{
        fontSize:25,
        marginLeft:10,
        fontFamily:'ComicNeue-Bold',
        marginBottom:10
    },
    border:{
        marginTop:20,
        borderBottomWidth:3,
        marginHorizontal:-10
    },
    icon:{
      height:25,
      width:25
    },
    statsItemHeader:{
      fontFamily:'ComicNeue-Bold',
      fontSize:18
    },
    statsItemSubHeader:{
      fontFamily:'ComicNeue-Bold',
      fontSize:16
    }

})

export default Statistics
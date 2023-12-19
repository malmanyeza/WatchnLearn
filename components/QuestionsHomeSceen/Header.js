import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import SearchBar from '../HomeScreen/SearchBar';

const Header = ({ navigateTo }) => {
  const navigation = useNavigation();
  
  const onBackPress = () => {
    if (!navigateTo) {
      navigation.goBack();
    } else {
      navigateTo();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <View style={styles.backButtonCircle}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </View>
      </TouchableOpacity>
      <SearchBar searchBarFlex={1} searchBarTitle={'Search past papers by year'}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical:20,
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically in the center
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingHorizontal: 10, // Add some horizontal padding
  },
  backButton: {
    zIndex: 1,
    marginTop:10
  },
  backButtonCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.primary,
    borderWidth: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
});

export default Header;

import React, { memo, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Pdf from 'react-native-pdf';
import { useThemeContext } from '../hooks/themeContext';

const PDFScreen = () => {
  const pdf = 'https://firebasestorage.googleapis.com/v0/b/watchnlearn-36e32.appspot.com/o/contents%2FFix%20React%20Component%20Error.pdf?alt=media&token=69d6bd62-1060-4a11-82a5-3c94f58d24ba';

  const {theme} = useThemeContext()

  return (
    <View style={
      [styles.container, {backgroundColor:theme.colors.primaryBackground}]
    }>
      <Header title={'PDF'} />
      <Pdf 
        source={{ uri: pdf, cache: true }}
        onLoadComplete={(numberOfPages,filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page,numberOfPages) => {
            console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
            console.log(error);
        }}
        onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
        }}
        style={
          [styles.pdf, {backgroundColor:theme.colors.primaryBackground}]
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default memo(PDFScreen);

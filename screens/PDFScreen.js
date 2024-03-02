import React, { memo, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Pdf from 'react-native-pdf';
import { useThemeContext } from '../hooks/themeContext';
import { useContentContext } from '../hooks/contentContext';

const PDFScreen = ({}) => {

  const {contentDetails} = useContentContext()
  const {contentUrl,downloadFilePath} = contentDetails
  const {theme} = useThemeContext()

  let pdfSource;
  if (downloadFilePath) {
    pdfSource = `file://${downloadFilePath}`; // Use downloadFilePath with file:// prefix
  } else {
    pdfSource = contentUrl; // Fallback to contentUrl
  }




  return (
    <View style={
      [styles.container, {backgroundColor:theme.colors.primaryBackground}]
    }>
      <Header title={'PDF'} />
      <Pdf 
        trustAllCerts={false}
        source={{ uri: pdfSource, cache: true }}
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

import React, {memo, useState, useEffect} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Header from '../components/Header';
import Pdf from 'react-native-pdf';


const PDFScreen = () => {
 
  const pdf = require("../assets/PDFs/SamplePDF.pdf")
  console.log(pdf)

  return (
    <View style={styles.container}>
      <Header
       title={'PDF'}
      />
      <Pdf
        trustAllCerts={false}
        source={pdf}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  
});

export default memo(PDFScreen);

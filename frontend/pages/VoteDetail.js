import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, ActionSheetIOS, Alert, StatusBar } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { IP, TOKEN } from '@env';
import { SimpleLineIcons, Entypo } from '@expo/vector-icons';
 
const VoteDetail = () => {
  const { params } = useRoute();

  console.log(params)

  const handlePress = async (url, dataKey) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": TOKEN
        },
      })
      const data = await response.json();
      let [title, image, id] = [[],[],[]];
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // if(params.expirationDate === '마감'){
    //   handlePress(`http://${IP}:8080/user/poll/:pollId`);
    // }else{
    //   handlePress(`http://${IP}:8080/user/chart/tv`);
    // }
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, backgroundColor:'#F5F5F5' }}>
        <StatusBar barStyle="dark-content" />


      </SafeAreaView>
    </View>
  );
};

// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
})


export default VoteDetail;

import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import {IP} from '@env';

const RegisterVote = () => {

  // const handlePress = async () => {
  //   try {
  //     const response = await fetch(`http://${IP}:8080/register`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ name, email, password, nickname })
  //     });
  //     const json = await response.json();
  //     console.log(json);
  //   } catch (error) { console.error(error); }
  // };

  return (
    <View style={styles.container}>
      {/* iOS 11 이상이 설치된 아이폰에만 적용됨. */}
      <SafeAreaView style={{ flex: 1, backgroundColor:'#F5F5F5' }}>
        <StatusBar barStyle="dark-content" />
        <View style={{backgroundColor:'#FFFFFF'}}>
          
          <ScrollView>

          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
})

export default RegisterVote;

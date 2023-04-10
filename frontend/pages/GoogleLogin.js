import React from 'react';
import { View, SafeAreaView, StatusBar, StyleSheet, ActivityIndicator, Linking, TouchableOpacity, Text } from 'react-native';
import { IP } from '@env';
import { WebView } from 'react-native-webview';

const GoogleLogin = () => {


  const openSafari = async () => {
    const url = 'http://192.168.200.122:8080/auth/google'
    const supported = await Linking.canOpenURL(url);
  
    if (supported) { 
      await Linking.openURL(url);
      console.log(url)
    } else {
      console.log(`Can't open URL: ${url}`);
    }
  };
  
  

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <SafeAreaView style={{ flex: 1, backgroundColor:'#F5F5F5', alignItems: 'center' }}>
        <StatusBar barStyle="dark-content" />
        <TouchableOpacity onPress={() => openSafari()} style={{width:'100%', height:'100%'}}>
          <Text style={{fontSize:20, textAlign: 'center', textAlignVertical: 'center', color:'#FF4545'}}>
            Google 로그인
          </Text>
        </TouchableOpacity>

      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({

})

export default GoogleLogin;

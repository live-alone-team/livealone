import React from 'react';
import { View, SafeAreaView, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
import { IP } from '@env';
import { WebView } from 'react-native-webview';

const GoogleLogin = () => {

  const url = `http://192.168.200.122:8080/auth/google`
  

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <SafeAreaView style={{ flex: 1, backgroundColor:'#F5F5F5', alignItems: 'center' }}>
        <StatusBar barStyle="dark-content" />
        <View style={{width:'100%', height:'100%'}}>
          <WebView
          source={{ uri: url }}
          style={{ flex: 1 }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          allowsInlineMediaPlayback={true}
          scalesPageToFit={true}
          allowsInsecureSslCert={true}
          renderLoading={() => <ActivityIndicator />}
        />
          
        </View>

      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({

})

export default GoogleLogin;

import React, { useState } from 'react';
import { Button, TextInput, View, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {IP} from '@env';
import { storeToken } from './token';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const Login = () => {

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errCode, setErrCode] = useState('');

  const SignIn = async () => {
    try {
      const response = await fetch(`http://${IP}:8080/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email, 
          password : password
        })
      });
      const data = await response.json();
      
      if(data.hasOwnProperty('status')){
        setErrCode(data.status)
      }
      if(data.hasOwnProperty('jwtToken')){
        storeToken(data.jwtToken)
          .then(() => {
            navigation.goBack()
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) { console.error(error); }
  };

 

  const SignUp = () => {
    navigation.navigate('SignUp',{}); 
  }
  const GoogleLogin = () => {
    navigation.navigate('GoogleLogin',{}); 
  }
  
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <SafeAreaView style={{ flex: 1, backgroundColor:'#F5F5F5', alignItems: 'center' }}>
      <StatusBar barStyle="dark-content" />
      <View style={{width: '90%', height: '100%'}}>


        <View style={styles.topTitle}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>로그인</Text>
        </View>
        <View style={{width:'100%', height:'100%', alignItems: 'center'}}>
          <View style={{width:'100%', height:'100%', }}>

            {/* 이메일 */}
            <View style={{marginTop:100,width:'100%', height:'15%'}}>
              <Text style={{fontSize: 16, width:'100%', height:'33%'}}>
                이메일
              </Text>
              <TextInput onChangeText={setEmail} value={email} placeholder="이메일을 입력해주세요" style={{fontSize: 18,width:'100%', height:'33%'}}/>
              <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '100%'}}/>
              <View style={{width:'100%', height:'33%'}}>
                {
                  errCode === 404 ? 
                  <Text style={{color:'red'}}>
                    해당 유저를 찾을 수 없습니다.
                  </Text> : null
                }
              </View>
            </View>

            {/* 비밀번호 */}
            <View style={{marginTop:20 ,width:'100%', height:'15%'}}>
              <Text style={{fontSize: 16, width:'100%', height:'33%'}}>
                비밀번호
              </Text>
              <TextInput onChangeText={setPassword} value={password} placeholder="비밀번호를 입력해주세요" style={{fontSize: 18,width:'100%', height:'33%'}}/>
              <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '100%'}}/>
              <View style={{width:'100%', height:'33%'}}>
                {
                  errCode === 400 ? 
                  <Text style={{color:'red'}}>
                    잘못된 비밀번호 입니다.
                  </Text> : null
                }
              </View>
            </View>

            {/* 로그인 버튼 */}
            <View style={{alignItems: 'center', justifyContent: 'center', height:'8%', marginTop:20}}>
              <View style={{flex: 1, width:'100%', height:'100%'}}>
                <TouchableOpacity onPress={SignIn} style={{width:'100%', height:'100%'}}>
                  <View style={{width:'100%', height:'100%', borderWidth: 1, borderColor: '#D6D6D6', borderRadius: '12', justifyContent: 'center', alignItems: 'center', backgroundColor:'#FF4545'}}>
                    <Text style={{fontSize:20, textAlign: 'center', textAlignVertical: 'center', color:'white'}}>
                      로그인하기
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* 이메일로 회원가입하기 */}
            <View style={{alignItems: 'center', justifyContent: 'center', height:'8%', marginTop:10}}>
              <View style={{flex: 1, width:'100%', height:'100%'}}>
                  <TouchableOpacity onPress={SignUp} style={{width:'100%', height:'100%'}}>
                    <View style={{width:'100%', height:'100%', borderWidth: 1, borderColor: '#D6D6D6', borderRadius: '12', justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{fontSize:20, textAlign: 'center', textAlignVertical: 'center', color:'#FF4545'}}>
                        이메일로 회원가입하기
                      </Text>
                    </View>
                  </TouchableOpacity>
              </View>
            </View>

            <View style={{width:'100%', flexDirection: 'row', height:30, alignItems: 'center', marginTop: 30  }}>
              <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '33%'}}/>
              <View style={{width:'33%', alignItems:'center'}}>
                <Text style={{color:'#6B7583'}}>
                  간편로그인
                </Text>
              </View>
              <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '33%'}}/>
            </View>

            {/* google 로그인 */}
            <View style={{alignItems: 'center', justifyContent: 'center', height:'8%', marginTop:10}}>
              <View style={{flex: 1, width:'100%', height:'100%'}}>
                  <TouchableOpacity onPress={GoogleLogin} style={{width:'100%', height:'100%'}}>
                    <View style={{width:'100%', height:'100%', borderWidth: 1, borderColor: '#D6D6D6', borderRadius: '12', justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{fontSize:20, textAlign: 'center', textAlignVertical: 'center', color:'#FF4545'}}>
                        Google 로그인
                      </Text>
                    </View>
                  </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      </View>
      </SafeAreaView>
    </View>
  );
};

// css
const styles = StyleSheet.create({
  topTitle: {
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    height: 40,
    marginBottom: 20,
    justifyContent: 'center'
  },
})

export default Login;

import React, { useState } from 'react';
import { Button, TextInput, View, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {IP} from '@env';

const Login = () => {
  
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
              <TextInput placeholder="이메일을 입력해주세요" style={{fontSize: 18,width:'100%', height:'33%'}}>
              </TextInput>
              <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '100%'}}/>
              <View style={{width:'100%', height:'33%'}}></View>
            </View>

            {/* 비밀번호 */}
            <View style={{marginTop:20 ,width:'100%', height:'15%'}}>
              <Text style={{fontSize: 16, width:'100%', height:'33%'}}>
                비밀번호
              </Text>
              <TextInput placeholder="비밀번호를 입력해주세요" style={{fontSize: 18,width:'100%', height:'33%'}}>
              </TextInput>
              <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '100%'}}/>
              <View style={{width:'100%', height:'33%'}}></View>
            </View>

            {/* 로그인 버튼 */}
            <View style={{alignItems: 'center', justifyContent: 'center', height:'8%', marginTop:20}}>
              <View style={{flex: 1, width:'100%', height:'100%'}}>
                <TouchableOpacity style={{width:'100%', height:'100%'}}>
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
                  <TouchableOpacity style={{width:'100%', height:'100%'}}>
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

            {/* 간편로그인 */}
            <View style={{alignItems: 'center', justifyContent: 'center', height:'8%', marginTop:10}}>
              <View style={{flex: 1, width:'100%', height:'100%'}}>
                  <TouchableOpacity style={{width:'100%', height:'100%'}}>
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

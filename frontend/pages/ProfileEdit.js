import React, { useState } from 'react';
import { Button, TextInput, View, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { IP } from '@env';
import { useNavigation } from '@react-navigation/native';
import { getToken  } from './token';

const ProfileEdit = () => {

  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const navigation = useNavigation();
  
  const updateProfile = async () => {
    const userToken = await getToken();  
    const requestBody = {};
    if (nickname !== '') {
      requestBody.nickname = nickname;
    }
    if (password !== '') {
      requestBody.password = password;
    }
    try {
      const response = await fetch(`http://${IP}:8080/user/profile`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          "X-AUTH-TOKEN": userToken 
        },
        body: JSON.stringify(requestBody)
      }); 
 
      Alert.alert('수정이 완료되었습니다.','',[
        {text: '확인', onPress: () => navigation.goBack()},
      ]); 
      
    } catch (error) { console.error(error); }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <SafeAreaView style={{ flex: 1, backgroundColor:'#FFFFFF', alignItems: 'center' }}>
        <StatusBar barStyle="dark-content" />
        {/* 프로필 이미지 수정 */}
        <View style={{width:'100%', height:200, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{width:'30%',height:'50%', backgroundColor:'black'}}>
          </View>        
        </View>
        <View style={{width:'100%', height:'100%', alignItems: 'center'}}>
          <View style={{width:'90%', height:'100%', alignItems: 'center'}}>
            {/* 닉네임 */}
            <View style={{marginTop:10 ,width:'100%', height:'15%'}}>
              <Text style={{fontSize: 16, width:'100%', height:'33%'}}>
                닉네임
              </Text>
              <TextInput onChangeText={setNickname} value={nickname} placeholder="비밀번호를 입력해주세요" style={{fontSize: 18,width:'100%', height:'33%'}}/>
              <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '100%'}}/>
              <View style={{width:'100%', height:'33%'}}>
                {
                  nickname.length > 0 ? null : <Text style={{color:'red'}}>닉네임을 입력하여 주세요.</Text>
                }
              </View>
            </View>

            {/* 비밀번호 */}
            <View style={{marginTop:10 ,width:'100%', height:'15%'}}>
              <Text style={{fontSize: 16, width:'100%', height:'33%'}}>
                비밀번호
              </Text>
              <TextInput secureTextEntry={true}  onChangeText={setPassword} value={password} placeholder="비밀번호를 입력해주세요" style={{fontSize: 18,width:'100%', height:'33%'}}/>
              <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '100%'}}/>
              <View style={{width:'100%', height:'33%'}}>
                { 
                  password.length < 8 ?
                  <Text style={{color:'red'}}>8자리 이상 입력하여주세요. </Text> : null
                }
              </View>      
            </View>

            {/* 가입 버튼 */}
            <View style={{alignItems: 'center', justifyContent: 'center', height:'8%', width:'100%', marginTop:170}}>
              <View style={{flex: 1, width:'100%', height:'100%'}}>
                  <TouchableOpacity onPress={updateProfile} style={{width:'100%', height:'100%'}}>
                    <View style={{width:'100%', height:'100%', borderWidth: 1, borderColor: '#D6D6D6', borderRadius: '12', justifyContent: 'center', alignItems: 'center', backgroundColor:'#FF4545'}}>
                      <Text style={{fontSize:20, textAlign: 'center', textAlignVertical: 'center', color:'white'}}>
                        저장하기
                      </Text>
                    </View>
                  </TouchableOpacity>
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
  
})

export default ProfileEdit;

import React, { useState } from 'react';
import { Button, TextInput, View, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { IP } from '@env';
import { useNavigation } from '@react-navigation/native';

const InputPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [errDetail, setErrDetail] = useState('');

  const navigation = useNavigation();

  const postInfo = async () => {
    try {
      const response = await fetch(`http://${IP}:8080/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name : name, 
          email : email,  
          password : password, 
          nickname : nickname 
        })
      });
      const json = await response.json();
      if(json.status === 400){
        setErrDetail(detail)
      }else{
        navigation.navigate('Login',{}); 
      }
    } catch (error) { console.error(error); }
  };
  

  return (
    
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <SafeAreaView style={{ flex: 1, backgroundColor:'#FFFFFF', alignItems: 'center' }}>
        <StatusBar barStyle="dark-content" />
        <View style={{width: '90%', height: '100%', alignItems: 'center'}}>
            <View style={{width:'100%' }}>  

              {/* 이메일 */}
              <View style={{marginTop:30,width:'100%', height:'15%'}}>
                <Text style={{fontSize: 16, width:'100%', height:'33%'}}>
                  이메일
                </Text>
                <TextInput onChangeText={setEmail} value={email} placeholder="이메일을 입력해주세요" style={{fontSize: 18,width:'100%', height:'33%'}}/>
                <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '100%'}}/>
                <View style={{width:'100%', height:'33%'}}>
                  <Text style={{color:'red'}}>{errDetail}</Text>
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

              {/* 비밀번호 재입력 */}
              <View style={{marginTop:10 ,width:'100%', height:'15%'}}>
                <Text style={{fontSize: 16, width:'100%', height:'33%'}}>
                  비밀번호 확인
                </Text>
                <TextInput secureTextEntry={true}  onChangeText={setConfirmPassword} value={confirmPassword} placeholder="비밀번호를 입력해주세요" style={{fontSize: 18,width:'100%', height:'33%'}}/>
                <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '100%'}}/>
                <View style={{width:'100%', height:'33%'}}>
                  {
                    password !== confirmPassword ? 
                    <Text style={{color:'red'}}>잘못된 비밀번호 입니다.</Text> : null
                  }
                </View>
              </View>

              {/* 이름 */}
              <View style={{marginTop:10 ,width:'100%', height:'15%'}}>
                <Text style={{fontSize: 16, width:'100%', height:'33%'}}>
                  이름
                </Text>
                <TextInput onChangeText={setName} value={name} placeholder="비밀번호를 입력해주세요" style={{fontSize: 18,width:'100%', height:'33%'}}/>
                <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '100%'}}/>
                <View style={{width:'100%', height:'33%'}}>
                  {
                    name.length > 0 ? null : <Text style={{color:'red'}}>이름을 입력하여 주세요.</Text>
                  } 
                </View>
              </View>

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

              {/* 가입 버튼 */}
              <View style={{alignItems: 'center', justifyContent: 'center', height:'8%', marginTop:20}}>
                <View style={{flex: 1, width:'100%', height:'100%'}}>
                  <TouchableOpacity onPress={postInfo} style={{width:'100%', height:'100%'}}>
                    <View style={{width:'100%', height:'100%', borderWidth: 1, borderColor: '#D6D6D6', borderRadius: '12', justifyContent: 'center', alignItems: 'center', backgroundColor:'#FF4545'}}>
                      <Text style={{fontSize:20, textAlign: 'center', textAlignVertical: 'center', color:'white'}}>
                        가입하기
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

export default InputPage;

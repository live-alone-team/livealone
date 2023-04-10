import React, { useState } from 'react';
import { Button, TextInput, View, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {IP} from '@env';
import { storeToken } from './token';
import { useNavigation } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';

const SignUp = () => {

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isAgreeChecked, setIsAgreeChecked] = useState(false);
  const [isInfoChecked, setIsInfoChecked] = useState(false);
  const [isAgeChecked, setIsAgeChecked] = useState(false);
 
  const navigation = useNavigation();

  const inputPage = () => {
    navigation.navigate('InputPage',{});
  };

  const handleAllCheck = () => {
    setIsAllChecked(!isAllChecked);
    setIsAgreeChecked(!isAllChecked);
    setIsInfoChecked(!isAllChecked);
    setIsAgeChecked(!isAllChecked);
  };  


  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <SafeAreaView style={{ flex: 1, backgroundColor:'#FFFFFF', alignItems: 'center' }}>
        <StatusBar barStyle="dark-content" />
        <View style={{marginTop:100,width:'90%', height:'15%'}}>
          <Text style={{fontSize: 16, width:'100%', height:'30%', fontSize:20, fontWeight:'900'}}>
            약관 동의
          </Text>
          <View style={{width:'100%', height:'20%'}}>
          </View>
          <View style={{width:'100%', height:'55%'}}>
            <CheckBox
            checked={isAllChecked}
            onPress={handleAllCheck}
            title="전체 동의 합니다."
            containerStyle={{backgroundColor:'#FFFFFF', borderWidth:0}}
            textStyle={{fontSize:'18', fontWeight:'500', color:'black'}}
            />
          </View>
          
        </View>

        <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '80%', marginTop:20}}/>

        <View style={{width:'90%', height:'10%'}}>
          <CheckBox
            checked={isAgreeChecked}
            onPress={() => setIsAgreeChecked(!isAgreeChecked)}
            title="이용약관 동의"
            containerStyle={{backgroundColor:'#FFFFFF', borderWidth:0}}
            textStyle={{fontSize:'15', fontWeight:'700', color:'black'}}
          />
          <CheckBox
            checked={isInfoChecked}
            onPress={() => setIsInfoChecked(!isInfoChecked)}
            title="개인정보 수집 및 이용 동의"
            containerStyle={{backgroundColor:'#FFFFFF', borderWidth:0}}
            textStyle={{fontSize:'15', fontWeight:'700', color:'black'}}
          />
          <CheckBox
            checked={isAgeChecked}
            onPress={() => setIsAgeChecked(!isAgeChecked)}
            title="만 14세 이상 확인"
            containerStyle={{backgroundColor:'#FFFFFF', borderWidth:0}}
            textStyle={{fontSize:'15', fontWeight:'700', color:'black'}}
          />
        </View>

        {/* 가입하기 버튼 */}
        { 
          isAgreeChecked && isInfoChecked && isAgeChecked ?
          <View style={{alignItems: 'center', justifyContent: 'center', height:'10%', width:'90%', marginTop:300}}>
            <View style={{flex: 1, width:'100%', height:'100%'}}>
              <TouchableOpacity onPress={() => inputPage()} style={{width:'100%', height:'100%'}}>
                <View style={{width:'100%', height:'100%', borderWidth: 1, borderColor: '#D6D6D6', borderRadius: '12', justifyContent: 'center', alignItems: 'center', backgroundColor:'#FF4545'}}>
                  <Text style={{fontSize:20, textAlign: 'center', textAlignVertical: 'center', color:'white'}}>
                    가입하기
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View> : null
        }
      
      </SafeAreaView>
    </View>
  );
};

// css
const styles = StyleSheet.create({

})

export default SignUp;

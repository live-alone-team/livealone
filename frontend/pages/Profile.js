import React, { useState, useEffect } from 'react';
import { Button, TextInput, View, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import {IP} from '@env';
import { removeToken  } from './token';
import { getToken  } from './token';
import { useNavigation , CommonActions, useIsFocused} from '@react-navigation/native';

const Profile = () => {

  const navigation = useNavigation();  
  const [token, setToken] = useState('');
  // false => 투표내역, true => 좋아요
  const [chkBtn, setChkBtn] = useState(false);
  const isFocused = useIsFocused();

  const pollList = [
    {
        "title": "과자는?",
        "createdDate": "2023-02-28"
    },
    {
        "title": "가전은?",
        "createdDate": "2023-02-28"
    },
    {
        "title": "다들 뭐가 더 맛있나요?",
        "createdDate": "2023-02-27"
    },
    {
        "title": "옷 좀 골라주세요",
        "createdDate": "2023-02-17"
    },
    {
        "title": "과자는?",
        "createdDate": "2023-02-28"
    },
    {
        "title": "가전은?",
        "createdDate": "2023-02-28"
    },
    {
        "title": "다들 뭐가 더 맛있나요?",
        "createdDate": "2023-02-27"
    },
    {
        "title": "옷 좀 골라주세요",
        "createdDate": "2023-02-17"
    }
  ]

  const LikeList = [
    
  ]
  
  const chkToken = async () => {
    const userToken = await getToken();
    userToken
      ? setToken(userToken)
      : navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }]
          })
        );
  };

  const getMyPoll = async () => {
    const userToken = await getToken();    
    try {
      const response = await fetch(`http://${IP}:8080/user/profile/polls`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": userToken
        },
      })
      const data = await response.json();
      console.log(data)

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      Promise.all([
        chkToken(),
        getMyPoll()
      ]);
    }
  }, [isFocused]);

  const loginMove = () => {
    navigation.navigate('Login',{}); 
  };

  const logOut = async () => {
    removeToken()
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Login' }
        ]
      })
    );
  };

  const contents = ({ title, createdDate, index }) => (
    <View style={{flex:1}}>
      <View key={index} style={{ width: '100%', height: 70, marginLeft: 20 }}>
        <View style={{width: '100%',height: '55%',flex: 1,justifyContent: 'flex-end',marginBottom: 5,}}>
          <Text style={{ fontSize: 18, fontWeight:'500' }}>{title}</Text>
        </View>
        <Text style={{ width: '100%', height: '45%', fontSize: 13, color:'#6B7583' }}>{createdDate}</Text>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '100%', }}/>
    </View>
  );
  

  

  return (
    <View style={styles.container}>
      {/* iOS 11 이상이 설치된 아이폰에만 적용됨. */}
      <SafeAreaView style={{ flex: 1, backgroundColor:'#F5F5F5' }}>
        <StatusBar barStyle="dark-content" />
        <View style={{backgroundColor:'#FFFFFF'}}>

          {/* 마이페이지 */}
          <View style={styles.topTitle}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>마이페이지</Text>
          </View>

          {/* 이미지, 이름, 닉네임 */}
          <View style={{width:'100%', height:105, flexDirection: 'row', alignItems: 'center'}}> 
            {/* 이미지 */}
            <View style={{width:70, height:70, marginLeft:20,backgroundColor:'black'}}></View>
            <View style={{marginLeft:25, marginBottom:20}}>
              {/* 이름 */}
              <Text style={{fontSize:18, fontWeight:'700', marginBottom:10}}>asdf</Text>
              {/* 닉네임 */}
              <Text style={{color:'#FF9867'}}>asdf</Text>
            </View>
          </View>

          <View style={{borderBottomWidth: 10, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '100%'}}/>
          
          <View style={{width:'100%', height:60, flexDirection: 'row', alignItems: 'center'}}>
            {/* 투표내역 */}
            <TouchableOpacity onPress={() => setChkBtn(false)} style={{width:'50%', height:'100%'}}>
              {
                !chkBtn ? 
                <>
                  <View style={{width:'100%', height:'95%', alignItems: 'center', justifyContent: 'center'}}>
                    <Text>투표내역</Text>
                  </View>
                  <View style={{width:'100%', height:'5%', backgroundColor:'#FF4545'}}></View>
                </> : 
                <>
                <View style={{width:'100%', height:'95%', alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color:'#A4A9B0'}}>투표내역</Text>
                </View>
                <View style={{width:'100%', height:'5%', backgroundColor:'#FFFFFF'}}></View>                 
                </>
              }
            </TouchableOpacity>
            {/* 좋아요 */}
            <TouchableOpacity onPress={() => setChkBtn(true)} style={{width:'50%', height:'100%'}}>
              {
                chkBtn ? 
                <>
                  <View style={{width:'100%', height:'95%', alignItems: 'center', justifyContent: 'center'}}>
                    <Text>좋아요</Text>
                  </View>
                  <View style={{width:'100%', height:'5%', backgroundColor:'#FF4545'}}></View>
                </> : 
                <>
                  <View style={{width:'100%', height:'95%', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color:'#A4A9B0'}}>좋아요</Text>
                  </View>
                  <View style={{width:'100%', height:'5%', backgroundColor:'#FFFFFF'}}></View>
                </>
              }
            </TouchableOpacity>

          </View>

          {/* 투표내역, 좋아요 */}
          <ScrollView style={{height:500}}>
            {
              !chkBtn ? 
              pollList.map((item, index) => (contents({ title: item.title, createdDate: item.createdDate, index: index }))) :
              LikeList.map((item, index) => (contents({ title: item.title, createdDate: item.createdDate, index: index })))
            }

            <View style={{borderBottomWidth: 10, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '100%'}}/>

            <View style={{height:250, width:'100%'}}>
              <TouchableOpacity style={{height:50, width:'100%',justifyContent: 'center'}}>
                <Text style={{marginLeft:20, fontSize:'17', fontWeight:'900'}}>알림설정</Text>
              </TouchableOpacity>
              <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '100%'}}/>
              <TouchableOpacity onPress={logOut} style={{height:50, width:'100%',justifyContent: 'center'}}>
                <Text style={{marginLeft:20, fontSize:'17', fontWeight:'500'}}>로그아웃</Text>
              </TouchableOpacity>
              <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '100%'}}/>
              <TouchableOpacity style={{height:50, width:'100%',justifyContent: 'center'}}>
                <Text style={{marginLeft:20, fontSize:'17', fontWeight:'500'}}>프로필 수정</Text>
              </TouchableOpacity>
              <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '100%'}}/>
              <TouchableOpacity style={{height:50, width:'100%',justifyContent: 'center'}}>
                <Text style={{marginLeft:20, fontSize:'17', fontWeight:'500'}}>회원탈퇴</Text>
              </TouchableOpacity>
              <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '100%'}}/>
            </View>


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
  topTitle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    height: 40,
    marginBottom: 20 
  }, 
})

export default Profile;


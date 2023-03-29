import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, StatusBar, Text, TouchableOpacity, TextInput } from 'react-native';
import { IP, TOKEN } from '@env';

const RegisterVote = () => {

  const [title, setTitle] = useState(''); 
  const [content, setContent] = useState(''); 
  const [contentsVal, setContentsVal] = useState('');

  return (
    <View style={styles.container}> 
      {/* iOS 11 이상이 설치된 아이폰에만 적용됨. */}
      <SafeAreaView style={{ flex: 1, backgroundColor:'#FFFFFF' }}>
        <StatusBar barStyle="dark-content" />
        <View style={{width: '100%', height: '100%'}}>

          <View style={styles.topTitle}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>투표 등록하기</Text>
          </View>    

          {/* 제목 */}
          <View style={{alignItems: 'center'}}>
            <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '90%'}}/>
            <TextInput value={title} onChangeText={setTitle} style={{ height:60, width:'87%' }} placeholder = '제목' />
            <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '90%'}}/>
          </View>

          {/* 입력란 */}
          <View style={{height: 200, width: '87%', marginBottom: 10, marginLeft: 20 }}>
            <TextInput value={content} onChangeText={setContent} style={{ height: '100%', width: '100%' }} placeholder='10자 이상 입력해주세요.' />
          </View>
          
          <View style={{alignItems: 'center'}}>
            <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '90%'}}/>
          </View>

          <View style={{alignItems: 'center', height:'30%'}}>
            <View style={{width:'90%', height:'100%', marginTop:15, borderWidth: 1, borderColor: '#D6D6D6', borderRadius: '5'}}>
              {/* 투표추가 */}
              <View style={{width:'100%', height:'35%' }}>
                <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize:'20'}}>투표추가</Text>
                </TouchableOpacity>
              </View>              
              <View style={{alignItems: 'center'}}>
                <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '100%'}}/>
              </View>

              {/* 투표 기간 */}
              <View style={{width:'100%', height:'65%' }}>
                
              </View>
            </View>
          </View>
          
          {/* 등록하기 */}
          <View style={{alignItems: 'center', justifyContent: 'center', height:'20%'}}>
            <View style={{flex: 1, width:'90%', height:'100%'}}>
                <View style={{width:'100%', height:'60%'}}></View>
                <TouchableOpacity style={{width:'100%', height:'40%'}}>
                  <View style={{width:'100%', height:'100%', borderWidth: 1, borderColor: '#D6D6D6', borderRadius: '5', justifyContent: 'center', alignItems: 'center', backgroundColor:'#FF4545'}}>
                    <Text style={{fontSize:20, textAlign: 'center', textAlignVertical: 'center', color:'white'}}>
                      등록하기
                    </Text>
                  </View>
                </TouchableOpacity>
            </View>
          </View>

        </View>
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

export default RegisterVote;

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, StatusBar, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { IP, TOKEN } from '@env';
import SelectDropdown from 'react-native-select-dropdown'
import { useNavigation , CommonActions, useIsFocused, useRoute} from '@react-navigation/native';
import { getToken  } from './token';
import { SimpleLineIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';

const RegisterVote = () => {

  const [title, setTitle] = useState(''); 
  const [content, setContent] = useState(''); 
  const [inputs, setInputs] = useState([{ key: 1, text: '' }]); // 자식 페이지에서 받아올 값
  const day = ["0","1","2","3","4","5","6","7"]
  const hour = [ "0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"]
  const minute = [ "0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59",]
  const [selectedDay, setSelectedDay] = useState("0");
  const [selectedHour, setSelectedHour] = useState("0");
  const [selectedMinute, setSelectedMinute] = useState("0");

  const navigation = useNavigation();
  const { params } = useRoute();

  const [token, setToken] = useState('');
  const isFocused = useIsFocused();
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

  useEffect(() => {
    if (isFocused) {
      chkToken()
    }
  }, [isFocused]);

  useEffect(() => {
    if (params !== undefined && params !== inputs) {
      setInputs(params);
    }
  }, [params, inputs]);

  const addVoteMove = () => {
    navigation.navigate('AddVote',{});
  };

  
  const writeVote = async () => {
    const userToken = await getToken();

    if(!title) {
      Alert.alert('제목을 입력하여주세요.', '', [{text: '확인'},])
      return
    }
    if(!content || content.length < 10) {
      Alert.alert('내용을 10자 이상 입력하여주세요.', '', [{text: '확인'},])
      return
    }
    if(inputs.length == 1){
      Alert.alert('투표를 추가하여주세요.', '', [{text: '확인'},])
      return
    }    
    if(selectedDay == '0' && selectedHour == '0' && selectedMinute == '0'){
      Alert.alert('투표기간을 선택하여주세요.', '', [{text: '확인'},])
      return
    }    
    const choices = inputs.inputs.map((input) => ({ content: input.text }));

    try {
      const response = await fetch(`http://${IP}:8080/user/poll/save`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": userToken
        },
        body: JSON.stringify({ 
          title : title ,
          description : content,
          choices : choices,
          day:selectedDay,
          hour:selectedHour,
          minute:selectedMinute
        })
      })
      Alert.alert('투표가 추가되었습니다.', '', [{text: '확인'},])

      setTitle('');
      setContent('');
      setSelectedDay('0');
      setSelectedHour('0');
      setSelectedMinute('0');
      setInputs([{ key: 1, text: '' }]);
    } catch (error) {
      console.error(error);
    }
  }; 


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
          <View style={{height: 200, width: '87%', marginBottom: 10, marginLeft: 25 }}>
            <TextInput multiline={true}  value={content} onChangeText={setContent} style={{ height: '100%', width: '90%', marginTop:20, marginBottom:20 }} placeholder='10자 이상 입력해주세요.' />
          </View>
          
          <View style={{alignItems: 'center'}}>
            <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '90%'}}/>
          </View>

          <View style={{alignItems: 'center', height:'30%'}}>
            <View style={{width:'90%', height:'100%', marginTop:15, borderWidth: 1, borderColor: '#D6D6D6', borderRadius: '5'}}>
              {/* 투표추가 */}
              <View style={{width:'100%', height:'35%' }}>
                <TouchableOpacity onPress={() => addVoteMove()} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize:18}}>투표추가</Text>
                </TouchableOpacity>
              </View>              
              <View style={{alignItems: 'center'}}>
                <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '100%'}}/>
              </View>

              {/* 투표 기간 */}
              <View style={{width:'100%', height:'65%' }}>
                <View style={{width:'100%', height:'40%', justifyContent:'flex-end', marginLeft:30,justifyContent: 'center'}}>
                  <Text style={{fontSize:18}}>
                    투표기간
                  </Text>
                </View>
                <View style={{width:'100%', height:'60%', marginTop:10, flexDirection: 'row',}}>

                  <View style={{width:'33%',height:'100%',}}>
                    <View style={{alignItems: 'center', marginRight:30}}>
                      <Text>일</Text>
                    </View>
                    <View>
                      <SelectDropdown 
                        rowTextStyle={{fontSize:'17'}}
                        dropdownStyle={{width:100}}
                        buttonStyle={{width:100, backgroundColor:'white'}}
                        defaultButtonText='0'
                        data={day}
                        onSelect={(selectedItem, index) => {
                          setSelectedDay(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                          return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                          return item
                        }}
                        renderDropdownIcon={isOpened => {
                          return <FontAwesome5 name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                        }}
                      />
                    </View>
                  </View>

                  <View style={{width:'33%',height:'100%'}}>
                    <View style={{alignItems: 'center', marginRight:30}}>
                      <Text>시</Text>
                    </View>
                    <View>
                      <SelectDropdown 
                        rowTextStyle={{fontSize:'17'}}
                        dropdownStyle={{width:100}}
                        buttonStyle={{width:100, backgroundColor:'white'}}
                        defaultButtonText='0'
                        data={hour}
                        onSelect={(selectedItem, index) => {
                          setSelectedHour(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                          return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                          return item
                        }}
                        renderDropdownIcon={isOpened => {
                          return <FontAwesome5 name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                        }}
                      />
                    </View>
                  </View>

                  <View style={{width:'33%',height:'100%'}}>
                    <View style={{alignItems: 'center', marginRight:30}}>
                      <Text>분</Text>
                    </View>
                    <View>
                      <SelectDropdown  
                        rowTextStyle={{fontSize:'17'}}
                        dropdownStyle={{width:100}}
                        buttonStyle={{width:100, backgroundColor:'white'}}
                        defaultButtonText='0'
                        data={minute}
                        onSelect={(selectedItem, index) => {
                          setSelectedMinute(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                          return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                          return item
                        }}
                        renderDropdownIcon={isOpened => {
                          return <FontAwesome5 name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                        }}
                      />
                    </View>
                  </View>

                </View>
              </View>
            </View>
          </View>
          
          {/* 등록하기 */}
          <View style={{alignItems: 'center', justifyContent: 'center', height:'20%'}}>
            <View style={{flex: 1, width:'90%', height:'100%'}}>
                <View style={{width:'100%', height:'60%'}}></View>
                <TouchableOpacity onPress={() => writeVote()} style={{width:'100%', height:'40%'}}>
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

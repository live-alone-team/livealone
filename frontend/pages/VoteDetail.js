import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, ActionSheetIOS, Alert, StatusBar } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { IP, TOKEN } from '@env';
import { SimpleLineIcons, Entypo, FontAwesome5, EvilIcons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { getToken  } from './token';
import { useNavigation , CommonActions, useIsFocused} from '@react-navigation/native';

 
const VoteDetail = (id, isContained) => {
  const { params } = useRoute(); 
  const [detailData, setDetailData] = useState('');
  const [detailPreviewData, setDetailPreviewData] = useState('');
  const [items, setItems] = useState('');
  const [vote, setVote] = useState(false);
  const [preview, setPreview] = useState(false);
  const [chkLike, setChkLike] = useState(isContained);
  const [like, setLike] = useState(0); 
  const voteColor = ['#FF4545', '#8EFF52', '#9742FC','#FCFA68', '#FC4EFC']

  const navigation = useNavigation();  
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

  const voteBtn = () =>
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ['취소', '삭제'],
      destructiveButtonIndex: 1,
      cancelButtonIndex: 0,
      userInterfaceStyle: 'dark',
    },
    buttonIndex => {
      // 취소 버튼
      if (buttonIndex === 0) {
        
      // 삭제 버튼
      } else if (buttonIndex === 1) {
        Alert.alert(
          '게시물을 삭제 하시겠습니까?','',
          [
            {text: '취소', style: 'cancel',},
            {text: '확인', onPress: () => deleteDetailVote(),},
          ],
          { cancelable: false }
        );
        
      }
    },
  );  

  // 투표 삭제
  const deleteDetailVote = async () => {
    const userToken = await getToken();
    try {
      const response = await fetch(`http://${IP}:8080/user/poll/${params.id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json", 
          "X-AUTH-TOKEN": userToken
        }, 
      })
    } catch (error) {
      console.error(error);
    }
    navigation.goBack();
  }; 


  // 투표 하기
  const voting = async () => { 
    const selectedItemId = items.find(item => item.checked)?.id;
    if(selectedItemId === undefined) {
      Alert.alert('투표항목을 선택하여주세요.','',[{text: '확인'},]);
    }else{
      try { 
        const userToken = await getToken();
        const response = await fetch(`http://${IP}:8080/user/poll/${params.id}/votes`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": userToken
          },
          body: JSON.stringify({ 
            choiceId: selectedItemId
          })
        });
        const data = await response.json();
        if(data.hasOwnProperty('status')){
          Alert.alert(data.detail,'',[{text: '확인'},]);
          return
        }
        setVote(true)
        setDetailPreviewData(data)
        
      } catch (error) { console.error(error); }      
    }
  };
  
  // 투표 데이터
  const voteInfo = async (url) => { 
    const userToken = await getToken();
    try { 
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": userToken
        },
      })
      const data = await response.json();
      if(!data.hasOwnProperty('error')){
        setDetailData(data)
        const newData = data.choices.map(item => ({
          id: item.id,
          voteCount: item.voteCount,
          title: item.content,
          checked: false,
        }));
        setItems(newData)
        setLike(data.totalLikes)
      }
      
    } catch (error) { 
      console.error(error);
    }
  };

  // 좋아요
  const pushLike = async () => { 
    const userToken = await getToken();
    try { 
      const response = await fetch(`http://${IP}:8080/user/poll/like/${params.id}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": userToken
        },
      })
    } catch (error) { 
      console.error(error);
    }
  };

  const btnLike = async () => {
    await pushLike();
    setChkLike(!chkLike);
    await voteInfo(`http://${IP}:8080/user/poll/${params.id}`);
  };
  

  // 미리보기 데이터
  const voteInfoPreview = async (url) => {
    const userToken = await getToken();
    try {  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": userToken
        },
      })
      const data = await response.json();
      if(!data.hasOwnProperty('error')){
        const newData = data.choices.map((item, index) => {
          const val = isNaN(item.voteCount / data.totalVotes) ? 0 : (item.voteCount / data.totalVotes).toFixed(2);
          const chkWidth = (val * 100) + '%';
          const unChkWidth = (100 - (val * 100)) + '%';
          const title = item.content;
          const id = item.id;
          return { id, chkWidth, unChkWidth, title };
        });

        setDetailPreviewData(newData)
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleCheck = (item) => {
    setItems(items.map(i => i.id === item.id ? { ...i, checked: true } : { ...i, checked: false }));
  }
  
  useEffect(() => {
  }, []);
  
  useEffect(() => {
    if (isFocused) {
      Promise.all([
        chkToken(),
        voteInfo(`http://${IP}:8080/user/poll/${params.id}`),
        voteInfoPreview(`http://${IP}:8080/user/poll/${params.id}/result`),
      ]);
    }
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCheck(item)}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <CheckBox
          value={item.id}
          checked={item.checked}
          onPress={() => handleCheck(item)}
          checkedColor="#FF4545"
        />
        <Text style={{ marginLeft: 10 }}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const preiewItem = ({ item }) => {
    let index = 0;
    for(let i = 0; i < items.length; i++){
      if(items[i].id == item.id) index = i 
    }
    // const index = item.index % voteColor.length;
    return ( 
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, width: '100%', height: 75 }}>
        <View style={{ width: '100%', height: '100%', justifyContent: 'center', borderWidth: 1, borderColor: '#D6D6D6', borderRadius: 5 }}>
          <View style={{ flexDirection: 'row', width: '100%', height: '100%' }}>
            <View style={{ width: item.chkWidth, backgroundColor: voteColor[index], borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} />
            <View style={{ width: item.unChkWidth, backgroundColor: '#D6D6D6', borderTopRightRadius: 5, borderBottomRightRadius: 5 }} />
          </View>
          <Text style={{ marginLeft: 10, position: 'absolute' }}>{item.title}</Text>
          <Text style={{ marginRight: 20, position: 'absolute', right: 0 }}>{item.chkWidth}</Text>
        </View>
      </View>
    ) 
  };
  
  return (
    <View style={styles.container}>
      {
        detailData.hasOwnProperty('error') ? <Text></Text> : 
      <SafeAreaView style={{ flex: 1, backgroundColor:'#FFFFFF' }}>
        <StatusBar barStyle="dark-content" />
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <View style={{ width: '80%', height: '100%', flexDirection: 'row', marginLeft: 25, marginTop: 25, marginBottom: 25, }}>

            {/* 프로필 사진 */}
            <View style={{width: '20%'}}>
            </View> 

            <View style={{width: '80%'}}>
              <View style={{width: '100%', height: 40, flexDirection: 'row', alignItems: 'center'}}>

                {/* 작성자 */}
                <Text style={{fontSize: '16', fontWeight: '500'}}>
                  {detailData.nickname}{' '}
                </Text>

                {/* 날짜 */}
                <Text style={{color:'#6B7583', fontSize: '13'}}>
                  {detailData.createdDate}
                </Text>
              </View>

              {/* 제목 */}
              <Text style={{width: '100%', height: 40, fontSize:20, fontWeight:'500'}}>
                {detailData.title}
              </Text>

              {/* 내용 */}
              <Text style={{width: '100%', height: 60}}>
                {detailData.description}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => voteBtn()} >
            <Entypo name="dots-three-horizontal" size={20} color="black" style={{marginTop: 30, marginLeft: 5}}/>
          </TouchableOpacity>
        </View>

        {/* 투표 리스트 */}
        <View style={{alignItems: 'center'}}>
          <View style={{width:'90%', height:230, borderWidth: 1, borderColor: '#D6D6D6', borderRadius: '5' }}>
            <View style={{width:'100%',height:70, justifyContent:'center'}}>
              <View style={{flexDirection: 'row'}}>
                <FontAwesome5 name="vote-yea" size={20} color="black" style={{marginLeft:25}} />
                <Text style={{marginTop:2}}>  {detailData.totalVotes} 명 참여</Text>
                <Text style={{marginTop:2, marginLeft: 'auto', marginRight: 25, textAlign: 'right'}}> {detailData.expirationDate}</Text>
              </View>
            </View>
            <SafeAreaView style={{ flex: 1 }}>
              {
                // 투표 전
                !vote && !preview ? 
                <FlatList
                  data={items}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                /> 
                // 투표 미리보기
                : !vote && preview ?
                <FlatList
                  data={detailPreviewData}
                  renderItem={preiewItem}
                  keyExtractor={item => item.id.toString()}
                /> 
                // 투표 완료 
                : 
                <FlatList
                  data={detailPreviewData}
                  renderItem={preiewItem}
                  keyExtractor={item => item.id.toString()}
                /> 
              }
            </SafeAreaView>
          </View>
        </View>

        {/* 투표 */}
        { !vote && !preview ?
          <View style={{alignItems: 'center', justifyContent: 'center', height:50, marginTop:20, }}>
            <View style={{flex: 1, width:'90%', height:'100%'}}>
              <TouchableOpacity onPress={voting} style={{width:'100%', height:'100%'}}>
                <View style={{width:'100%', height:'100%', borderWidth: 1, borderColor: '#D6D6D6', borderRadius: '5', justifyContent: 'center', alignItems: 'center', backgroundColor:'#FF4545'}}>
                  <Text style={{fontSize:20, textAlign: 'center', textAlignVertical: 'center', color:'white'}}>
                    투표
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          : null
        }

        {/* 투표 결과 미리보기 & 투표 참여하기 */}
        { !vote ? 
          <View style={{alignItems: 'center', justifyContent: 'center', height:50, marginTop:20}}>
            <View style={{flex: 1, width:'90%', height:'100%'}}>
              <TouchableOpacity style={{width:'100%', height:'100%'}} onPress={() => setPreview(!preview)}>
                <View style={{width:'100%', height:'100%', borderWidth: 1, borderColor: '#D6D6D6', borderRadius: '5', justifyContent: 'center', alignItems: 'center', backgroundColor:'#F9FAF9'}}>
                  <Text style={{fontSize:20, textAlign: 'center', textAlignVertical: 'center', color:'black'}}>
                    {!preview ? '투표 결과 미리보기' : '투표참여하기'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          : null
        }

        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
          <View style={{width:'90%', height:50, }}>
            <TouchableOpacity onPress={() => btnLike()} style={{width:80, height:50, flexDirection: 'row'}}>
              {
                chkLike ? <Entypo name="heart" size={20} color="#FF4545" /> : <EvilIcons name="heart" size={24} color="#C4C4C4" />
              }
              <View> 
                {like === 0 ? <Text style={{marginTop:2}}>좋아요</Text> : <Text style={{marginTop:1}}>{like}</Text>}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      }
    </View>
  );
};

// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})


export default VoteDetail;

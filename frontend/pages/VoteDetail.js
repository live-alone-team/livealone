import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, ActionSheetIOS, Alert, StatusBar } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { IP, TOKEN } from '@env';
import { SimpleLineIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
 
const VoteDetail = () => {
  const { params } = useRoute();
  const [detailData, setDetailData] = useState('');
  const [detailPreviewData, setDetailPreviewData] = useState('');
  const [items, setItems] = useState('');
  const [vote, setVote] = useState(false);
  const [preview, setPreview] = useState(false);
  
  const voteInfo = async (url) => {
    try { 
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": TOKEN
        },
      })
      const data = await response.json();
      setDetailData(data)

      const newData = data.choices.map(item => ({
        id: item.id,
        voteCount: item.voteCount,
        title: item.content,
        checked: false,
      }));
      
      setItems(newData)      
    } catch (error) {
      console.error(error);
    }
  };

  const voteInfoPreview = async (url) => {
    try {  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": TOKEN
        },
      })
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleCheck = (item) => {
    setItems(items.map(i => i.id === item.id ? { ...i, checked: true } : { ...i, checked: false }));
  }
  
  useEffect(() => {
    voteInfo(`http://${IP}:8080/user/poll/${params.id}`);
    voteInfoPreview(`http://${IP}:8080/user/poll/${params.id}/result`);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCheck(item)}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <CheckBox
          checked={item.checked}
          onPress={() => handleCheck(item)}
          checkedColor="#FF4545"
        />
        <Text style={{ marginLeft: 10 }}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
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
          <TouchableOpacity >
            <Entypo name="dots-three-horizontal" size={20} color="black" style={{marginTop: 30, marginLeft: 5}}/>
          </TouchableOpacity>
        </View>

        {/* 투표 */}
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
              <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
              />
            </SafeAreaView>
          </View>
        </View>

        {/* 투표하기 */}
        { !vote && !preview ?
          <View style={{alignItems: 'center', justifyContent: 'center', height:50, marginTop:20, }}>
            <View style={{flex: 1, width:'90%', height:'100%'}}>
              <TouchableOpacity style={{width:'100%', height:'100%'}}>
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
        

      </SafeAreaView>
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

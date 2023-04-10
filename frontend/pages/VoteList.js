import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActionSheetIOS, Alert, Image } from 'react-native';
import { Entypo, FontAwesome5, EvilIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getToken  } from './token';
import { IP, TOKEN } from '@env';

const VoteList = ({ vote }) => {
  const navigation = useNavigation();
  const [isDelete, setIsDelete] = useState(false);

  // 디테일 페이지 이동
  const detailMove = (vote) => {
    navigation.navigate('VoteDetail',{
      vote : vote
    }); 
  }; 

  const voteBtn = (id) => {
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
              {text: '확인', onPress: () => deleteVote(id),},
            ],
            { cancelable: false }
          );
          
        }
      },
    );
  };

  const deleteVote = async (voteId) => {
    const userToken = await getToken();
    try { 
      const response = await fetch(`http://${IP}:8080/user/poll/${voteId}`, {
        method: 'DELETE', 
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": userToken
        },
      })
      if (response.ok) {
        setIsDelete(true)  
      }
      
    } catch (error) {
      console.error(error);
    }
  }; 

  if (isDelete) return null; 

  
  
  return (
    
    <View>
      <View style={{ width: '100%', flexDirection: 'row' }}>
        <View style={{ width: '80%', height: '100%', flexDirection: 'row', marginLeft: 25, marginTop: 25, marginBottom: 25 }}>
 
          {/* 프로필 사진 */} 
          <View style={{width: '20%'}}>
            {
              vote.image == null ? 
              <Image source={require('./../assets/images/profileImg/null.png')} style={{width:50, height:50}} />
              : <Image source={{ uri: `${vote.image}` }} style={{width:50, height:50}} />
            }
          </View> 

          <View style={{width: '80%'}}>
            <View style={{width: '100%', height: 40, flexDirection: 'row', alignItems: 'center'}}>

              {/* 작성자 */}
              <Text style={{fontSize: '16', fontWeight: '500'}}>
                {vote.nickname}{' '}
              </Text>

              {/* 날짜 */}
              <Text style={{color:'#6B7583', fontSize: '13'}}>
                {vote.createdTime}
              </Text>
            </View>

            <TouchableOpacity onPress={() => detailMove(vote)}>
              {/* 제목 */}
              <Text style={{width: '100%', height: 40, fontSize:20, fontWeight:'500'}}>
                {vote.title}
              </Text> 

              {/* 내용 */}
              <Text style={{width: '100%', height: 60}}>
                {vote.description}
              </Text>
            </TouchableOpacity>

          </View>

        </View>
        <TouchableOpacity onPress={() => voteBtn(vote.pollId)}>
          <Entypo name="dots-three-horizontal" size={20} color="black" style={{marginTop: 30, marginLeft: 5}}/>
        </TouchableOpacity>

      </View>

      {/* 참여수 */}
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', fontSize: 14, width: 320, height: 52, alignItems: 'center',  flexDirection: 'row', borderWidth: 1, borderColor: '#D6D6D6', borderRadius: '5' }}>
          <View style={{ width: '40%', flexDirection: 'row'}}>
            <FontAwesome5 name="vote-yea" size={20} color="black" style={{marginLeft:25}} />
            <Text style={{marginLeft:10, marginTop:2}}>{vote.totalVotes} 명 참여</Text>
          </View> 
          <View style={{ width: '60%' }}>
            <Text style={{textAlign:'right', marginRight: 25}}>{vote.expirationDate}</Text>
          </View>
        </View>
      </View>

      {/* 좋아요 수 */}
      <View style={{ flexDirection: 'row', marginLeft: 35, marginTop: 10, marginBottom: 20 }}>
        {
          vote.chkLike? (
              <Entypo name="heart" size={20} color="#FF4545" />
            ) : (
              <EvilIcons name="heart" size={24} color="#C4C4C4" />
          )
        }
        
        <View> 
          <Text style={{marginTop: vote.totalLikes === 0 ? 2 : 1}}>
            {vote.totalLikes || '좋아요'}
          </Text>
        </View>
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '90%'}}/>
      </View>
    </View>
  ); 
};

export default VoteList;

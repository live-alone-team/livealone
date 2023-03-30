import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Entypo, FontAwesome5, EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const VoteList = ({ vote }) => {
  
  const navigation = useNavigation();

  // 디테일 페이지 이동
  const detailMove = async (id) => {
    navigation.navigate('VoteDetail',{
      id : id,
    }); 

  };

  return (
    <View>
      <View style={{ width: '100%', flexDirection: 'row' }}>
        <View style={{ width: '80%', height: '100%', flexDirection: 'row', marginLeft: 25, marginTop: 25, marginBottom: 25 }}>

          {/* 프로필 사진 */}
          <View style={{width: '20%'}}>
 
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

            <TouchableOpacity onPress={() => detailMove(vote.pollId)}>
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
        <TouchableOpacity >
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
        <EvilIcons name="heart" size={24} color="black" />
        <View>
          {vote.totalVotes === 0 ? <Text style={{marginTop:2}}>좋아요</Text> : <Text style={{marginTop:1}}>{vote.totalVotes}</Text>}
        </View>
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '90%'}}/>
      </View>
    </View>
  );
};

export default VoteList;

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, StatusBar, Text } from 'react-native';
import { IP, TOKEN } from '@env';
import VoteSearchBar from './VoteSearchBar';
import VoteList from './VoteList';
import { getToken  } from './token';
import { useNavigation , CommonActions, useIsFocused} from '@react-navigation/native';

const Vote = () => { 
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');
  const [likeList, setLikeList] = useState([]);
  const isFocused = useIsFocused();
  const [scrollY, setScrollY] = useState(0);
  const chkToken = async () => {
    const userToken = await getToken();
    if (userToken) {
      setToken(userToken);
      getLikeList(); // userToken이 true인 경우 getLikeList 호출
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }]
        })
      );
    }
  };

  // 투표 리스트
  const pollList = async (url) => {
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

      // 좋아요 체크 추가
      const result = data.map((vote) => {
        const chkLike = likeList.some((like) => like.id === vote.pollId);
        return { ...vote, chkLike };
      });

      setData(result);
    } catch (error) {
      console.error(error);
    }
  }; 

  // 좋아요 리스트
const getLikeList = async () => {
  const userToken = await getToken();
  try {
    const response = await fetch(`http://${IP}:8080/user/profile/likes`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": userToken
      },
    })
    const data = await response.json();
    setLikeList(data);
    pollList(`http://${IP}:8080/user/poll`)
  } catch (error) {
    console.error(error);
  }
}; 
  
  useEffect(() => {
    if (isFocused) chkToken()
  }, [isFocused]);

  const handleScroll = (event) => {
    const { y } = event.nativeEvent.contentOffset;
    setScrollY(y);
  };

  return (
    <View style={styles.container}>
      {/* iOS 11 이상이 설치된 아이폰에만 적용됨. */}
      <SafeAreaView style={{ flex: 1, backgroundColor:'#F5F5F5' }}>
        <StatusBar barStyle="dark-content" />
          {/* 타이틀 , 검색 */}  
          <View style={{ flex: 1, backgroundColor:'#FFFFFF' }}>
            <VoteSearchBar />  
             
            <ScrollView style={{ height: '100%' }} onScroll={handleScroll} scrollEventThrottle={16}> 
              {!Array.isArray(data) ? ( 
                <Text>No data</Text>
              ) : ( 
                data.map((vote, index) => (
                  <View key={index}>   
                    <VoteList vote={vote}/>
                  </View>
                ))
              )}            
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
})

export default Vote;

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
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    if (isFocused) {
      Promise.all([
        chkToken(),
        pollList(`http://${IP}:8080/user/poll`),
      ]);
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {/* iOS 11 이상이 설치된 아이폰에만 적용됨. */}
      <SafeAreaView style={{ flex: 1, backgroundColor:'#F5F5F5' }}>
        <StatusBar barStyle="dark-content" />
          {/* 타이틀 , 검색 */}
          <View style={{ flex: 1, backgroundColor:'#FFFFFF' }}>
            <VoteSearchBar />
            
            <ScrollView style={{ height: '100%' }}>
              {!Array.isArray(data) ? (
                <Text>No data</Text>
              ) : (
                data.map((vote, index) => (
                  <View key={index}>
                    <VoteList vote={vote} />
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

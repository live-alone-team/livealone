import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, StatusBar, Text } from 'react-native';
import { IP, TOKEN } from '@env';
import VoteSearchBar from './VoteSearchBar';
import VoteList from './VoteList';

const Vote = () => {
  const [data, setData] = useState('');

  const pollList = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": TOKEN
        },
      })
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    pollList(`http://${IP}:8080/user/poll`);
  }, []);

  return (
    <View style={styles.container}>
      {/* iOS 11 이상이 설치된 아이폰에만 적용됨. */}
      <SafeAreaView style={{ flex: 1, backgroundColor:'#F5F5F5' }}>
        <StatusBar barStyle="dark-content" />
          {/* 타이틀 , 검색 */}
          <View style={{ flex: 1, backgroundColor:'#FFFFFF' }}>
            <VoteSearchBar />
            
            <ScrollView style={{ height: '100%' }}>
              {
                data.code === 'NO_SUCH_POLL' ? 
                <Text>
                  {data.detail}
                </Text> : 
                data && data.map((vote, index) => {
                  return (
                    <View key={index}>
                      <VoteList vote={vote} />
                    </View>
                  )
                })
              }
            
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

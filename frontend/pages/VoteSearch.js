import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, StatusBar, Text } from 'react-native';
import { IP, TOKEN } from '@env';
import VoteSearchBar from './VoteSearchBar';
import VoteList from './VoteList';
import { useRoute } from '@react-navigation/native';

const VoteSearch = () => {
  const { params } = useRoute();

  console.log(params)

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
                params.params.code === 'NO_SUCH_POLL' ? 
                <Text>
                  {data.detail}
                </Text> : 
                params.params && params.params.map((vote, index) => {
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

export default VoteSearch;

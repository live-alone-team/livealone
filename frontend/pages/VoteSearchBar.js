import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { IP, TOKEN } from '@env';
import { useNavigation } from '@react-navigation/native';
import { getToken } from './token';

const VoteSearchBar = () => {
  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState(null); 
  const [searchChk, setSearchChk] = useState(false);
  
  const navigation = useNavigation();  
  
  const searchMove = (params) => { 
    navigation.navigate('VoteSearch',{
      params 
    });
  };
  

  const searchPollList = async (url) => {
    const userToken = await getToken();
    try {
      const response = await fetch(`${url}?keyword=${searchValue}`, {
        method: 'GET',
        headers: { 
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": userToken,
        },
      })
      const data = await response.json();
      searchMove(data)
    } catch (error) {
      console.error(error);
    }
  };

  const searchFunc = () => {
    if(!searchValue){
      Alert.alert('검색어를 입력하여주세요.','',[{text: '확인'},]);
      return
    }else{
      searchPollList(`http://${IP}:8080/user/poll/search/${searchValue}`);
      setSearchChk(false);
    }
  }
 
  useEffect(() => {
    if(searchChk) searchFunc();
  }, [searchChk]);

  return (
    <View > 
      <View style={styles.topTitle}>
        {search ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {setSearch(!search)}}>
              <AntDesign name="arrowleft" size={22} color="black" />
            </TouchableOpacity>
            <View style={styles.searchBox}>
              <TextInput onChangeText={setSearchValue} value={searchValue} style={styles.searchBar} placeholder="검색어를 입력하세요"
                onSubmitEditing={() => { setSearchChk(true) }} />
            </View>
          </View>
        ) : (
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>투표</Text>
        )}

        <TouchableOpacity onPress={() => { search ? setSearchChk(true) : setSearch(!search) }}>
          <AntDesign name="search1" size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topTitle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    height: 40,
    marginBottom: 20 
  }, 
  searchBox: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#D0D5DA',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  searchBar: {
    width: 262,
    height: 40,
    marginLeft: 15,
  },
});

export default VoteSearchBar;

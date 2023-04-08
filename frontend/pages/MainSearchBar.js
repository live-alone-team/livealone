import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { getToken  } from './token';
import { IP } from '@env';

const MainSearchBar = () => {  
  const [search, setSearch] = useState(false); 
  const [selectedValue, setSelectedValue] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [detailPage, setDetailPage] = useState(false);
  const navigation = useNavigation();
  const { params } = useRoute(); 
  
  const searchResult = async (url) => {
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
      selectedValue == 'youtube' ? searchMove(data.items) : searchMove(data.results)
    } catch (error) {
      console.error(error)
    }
  };  

  useEffect(() => { 
    if(params != undefined){
      setSearch(params.search)
      setSelectedValue(params.selectedValue)
      setSearchValue(params.searchValue)
    }
  }, [detailPage]);
  
  const searchFunc = () => { 
    if(!selectedValue){
      Alert.alert('검색구분을 선택하여주세요.','',[{text: '확인'},]);
      return
    }else if(!searchValue){
      Alert.alert('검색어를 입력하세요.','',[{text: '확인'},]);
      return
    }else{
      searchResult(`http://${IP}:8080/user/search/${selectedValue}/${searchValue}`);
    }
  }
  
  const searchMove = (params) => {
    navigation.navigate('MainPageSearch',{
      params,
      search,
      selectedValue,
      searchValue 
    });
    setDetailPage(!detailPage)
  };
  
  return (
    <View>
      <View style={styles.topTitle}>
        {search ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {setSearch(!search)}}>
              <AntDesign name="arrowleft" size={22} color="black" />
            </TouchableOpacity>
            <View style={styles.searchBox}>
              <View style={{ marginLeft: 15, marginRight: 15, width: 34 }}>
                <RNPickerSelect
                  disabled={false}
                  placeholder={{
                    label: '선택',
                    value: null
                  }}
                  visible={false}
                  onValueChange={(value) => setSelectedValue(value)}
                  items={[
                    { label: '영화', value: 'movies' },
                    { label: '드라마', value: 'tv' },
                    { label: '유튜브', value: 'youtube' },
                  ]}
                  value={selectedValue}
                />
              </View>
              <View style={{ borderWidth: 0.5, height: 28, borderColor: '#D0D5DA' }} />
              <TextInput onChangeText={setSearchValue} value={searchValue} style={styles.searchBar} placeholder="검색어를 입력하세요"
                onSubmitEditing={() => { searchFunc() }} />
            </View>
          </View>
        ) : (
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>나혼자산다</Text>
        )}

        <TouchableOpacity onPress={() => { search ? searchFunc() : setSearch(!search) }}>
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
    width: 197,
    height: 40,
    marginLeft: 15,
  },
});

export default MainSearchBar;

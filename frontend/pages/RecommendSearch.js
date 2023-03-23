import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { IP, TOKEN } from '@env';
import { useRoute } from '@react-navigation/native';
import SearchBar from './SearchBar';

const RecommendSearch = () => {

  const { params } = useRoute();
  // const [searchInfo, setSearchInfo] = useState();

  // console.log(params)
  // const searchResult = async (url) => {
  //   try {
  //     const response = await fetch(url, {
  //       method: 'GET',
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-AUTH-TOKEN": TOKEN
  //       },
  //     })
  //     const data = await response.json();
  //     setSearchInfo(data.results)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }; 

  // useEffect(() => {
  //   searchResult(`http://${IP}:8080/user/search/${params.selectedValue}/${params.searchValue}`);
  // }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <SearchBar/>
        {/* <ScrollView>
          {searchInfo && searchInfo.map((info, index) => {
            return (
              <View key={index}>
                <View style={{width:'100%', height: 200, alignItems: 'center', justifyContent: 'center'}}>
                  <View style={{width:'80%', height:138, flexDirection: 'row'}}>
                    <Image style={{width:110, height:'100%'}} source={{ url: `https://image.tmdb.org/t/p/w500${info.poster_path}` }}/>
                    <View style={{width:202, height:'80%', alignSelf: 'center'}}>
                      <View style={{marginLeft:31}}>
                        <Text style={{color:'#545454', fontWeight:'900', fontSize: '18'}}>{info.title}</Text>
                        <Text style={{color:'#B9B9B9', fontSize:'16', marginTop:13}}>{info.release_date}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '90%', alignSelf: 'center'}} />
              </View>
            )
          })}
        </ScrollView> */}

      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default RecommendSearch;

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image, StatusBar } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import MainSearchBar from './MainSearchBar';

const MainPageSearch = () => { 

  const [searchInfo, setSearchInfo] = useState([]);
  const [infoLen, setInfoLen] = useState(0);
  const { params } = useRoute();

  useEffect(() => {   
    setSearchInfo(params.params)   
    setInfoLen(params.params.length)
  }, [params]);
  
  const navigation = useNavigation();
  const detailMove = (dataKey, id) => {
    navigation.navigate('MainPageDetail',{
      dataKey : dataKey,
      id : id
    }); 
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, backgroundColor:'#F5F5F5' }}>
        <StatusBar barStyle="dark-content" />
        <MainSearchBar />
        <ScrollView>
          {
            infoLen == 0 ? 
            <View style={{width:"100%", height:500, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize:'25', fontWeight:'600'}}>"{params.searchValue}"</Text> 
              <Text style={{fontSize:'20', marginTop:20}}>검색결과가 없습니다.</Text> 
            </View>
            
            : searchInfo && searchInfo.map((info, index) => {
              let title = '';
              let img = '';
              let date = '';
              let id = '';
              if(params.selectedValue == 'tv'){
                title = info.original_name
                img = `https://image.tmdb.org/t/p/w500${info.poster_path}`
                date = info.first_air_date
                id = info.id
              }else if(params.selectedValue == 'movies'){
                title = info.title;
                img = `https://image.tmdb.org/t/p/w500${info.poster_path}`;
                date = info.release_date;
                id = info.id   
              }else{ 
                title = info.snippet.title
                img = info.snippet.thumbnails.high.url
                date = info.snippet.channelTitle
              }
              return (
                <View key={index}>
                  <View style={{width:'100%', height: 200, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={params.selectedValue != 'youtube' ? () => detailMove(params.selectedValue, id) : null}>
                      <View style={{width:'80%', height:138, flexDirection: 'row'}}>
                        <Image style={{width:110, height:'100%'}} source={{ url: img }}/>
                        <View style={{width:202, height:'80%', alignSelf: 'center'}}>
                          <View style={{marginLeft:31}}>
                            <Text style={{color:'#545454', fontWeight:'900', fontSize: '18'}}>{title}</Text>
                            <Text style={{color:'#B9B9B9', fontSize:'16', marginTop:13}}>{date}</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '90%', alignSelf: 'center'}} />
                </View>
              )
            })
          }
        </ScrollView>

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

export default MainPageSearch;

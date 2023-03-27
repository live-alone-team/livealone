import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import Swiper from 'react-native-swiper';
import { IP , TOKEN } from '@env';
import MainSearchBar from './MainSearchBar';
import Media from './Media';

const MainPage = () => {
  const [state, setState] = useState({ 
    movies: { title: [], image: [], id: []},
    tv: { title: [], image: [], id: []},
    youtube: {title: [], image: [] }
  }); 

  const handlePress = async (url, dataKey) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": TOKEN
        },
      })
      const data = await response.json();
      let [title, image, id] = [[],[],[]];

      // youtube만 구조가 조금 다름
      let results = dataKey === 'youtube' ? data.items : data.results;
      results.map((item,i) => {
        if(dataKey === 'movies'){
          title.push(item["title"])
          image.push(`https://image.tmdb.org/t/p/w500${item.poster_path}`);
          id.push(item["id"]);
        }else if(dataKey === 'tv'){
          title.push(item["name"])
          image.push(`https://image.tmdb.org/t/p/w500${item.poster_path}`);
          id.push(item["id"]);
        }else{
          title.push(item.snippet.title)
          image.push(`${item.snippet.thumbnails.standard.url}`);
        }
      });
      setState(prevState => ({ 
        ...prevState,
        [dataKey]: {title, image, id}
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handlePress(`http://${IP}:8080/user/chart/movies`, 'movies');
    handlePress(`http://${IP}:8080/user/chart/tv`, 'tv');
    handlePress(`http://${IP}:8080/user/chart/youtube`, 'youtube');
  }, []);

  return (
    <View style={styles.container}>
      {/* iOS 11 이상이 설치된 아이폰에만 적용됨. */}
      <SafeAreaView style={{ flex: 1, backgroundColor:'#F5F5F5' }}>
        <StatusBar barStyle="dark-content" />
        <View style={{backgroundColor:'#FFFFFF'}}>
          
          {/* 타이틀 , 검색 */}
          <MainSearchBar/>
          <ScrollView>
            {/* 배너 */}
            <View style={styles.banner}>
              <Swiper
                showsPagination={false}
                showsButtons={true}
                loop={true}
                autoplay={true}
                autoplayTimeout={2.5}
                buttonWrapperStyle={{paddingHorizontal: 15}}
                >
                <Image style={styles.searchGubun} source={require('./../assets/images/banner1.png')}/>
                <Image style={styles.searchGubun} source={require('./../assets/images/banner2.png')}/>
              </Swiper>
            </View>

            {/* movies */}
            <Media title="주간 인기 영화" data={state.movies} dataKey="movies"/>
        
            <View style={{ height: 16, backgroundColor:'#EEEEEE' }} />

            {/* tv */}
            <Media title="주간 인기 드라마" data={state.tv} dataKey="tv"/>

            <View style={{ height: 16, backgroundColor:'#EEEEEE' }} />

            {/* youtube */}
            <Media title="YouTube" data={state.youtube} dataKey="youtube"/>

            <View style={{ height: 110}} />

          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}


// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  content: {
    flex:1,
  },
  searchGubun:{
    marginLeft: 15,
    marginRight: 15
  },
  banner:{
    height: 170,
    resizeMode:"stretch"
  }
})


export default MainPage;
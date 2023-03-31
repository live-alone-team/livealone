import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import Swiper from 'react-native-swiper';
import { IP , TOKEN } from '@env';
import MainSearchBar from './MainSearchBar';
import Media from './Media';
import { getToken  } from './token';
import { useNavigation , CommonActions, useIsFocused} from '@react-navigation/native';

const MainPage = () => { 
  const [state, setState] = useState({ 
    movies: { title: [], image: [], id: []}, 
    tv: { title: [], image: [], id: []},
    youtube: {title: [], image: [] } 
  }); 
  
  const navigation = useNavigation();  

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

  const handlePress = async (url, dataKey) => {
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
      const results = data.results || data.items;
      if (!results) return;
      const items = Array.from(results, item => ({
        title: dataKey === 'movies' ? item.title : dataKey === 'tv' ? item.name : item.snippet.title,
        image: dataKey === 'youtube' ? item.snippet.thumbnails.standard.url : `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        id: item.id
      }));
      setState(prevState => ({
        ...prevState,
        [dataKey]: { title: items.map(item => item.title), image: items.map(item => item.image), id: items.map(item => item.id) }
      }));

    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    if (isFocused) {
      Promise.all([
        chkToken(),
        handlePress(`http://${IP}:8080/user/chart/movies`, 'movies'),
        handlePress(`http://${IP}:8080/user/chart/tv`, 'tv'),
        handlePress(`http://${IP}:8080/user/chart/youtube`, 'youtube')
      ]);
    }
  }, [isFocused]);

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
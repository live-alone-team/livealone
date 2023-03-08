import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { WebView } from 'react-native-webview';
import Swiper from 'react-native-swiper';

const Recommend = () => {
  const [liked, setLiked] = useState(false);
  const [state, setState] = useState({
    movieTitle: [],
    movieImage: [],
    movieNum:[]
  });

  const handlePress = async () => {
    try {
      const response = await fetch('http://192.168.0.33:8080/user/chart/movies', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaXZlQWxvbmVAZ21haWwuY29tIiwicm9sZXMiOiJST0xFX1VTRVIiLCJpYXQiOjE2NzgyNjQ1ODEsImV4cCI6MTY3ODM1MDk4MX0.DX75FlN9VhdxjqJ409eKJxlhA80iE9uzx37LxGp2D0c"
        },
      })
      .then((response) => response.json())
      .then((data) => {
        let [movieTitle, movieImage, movieNum] = [[],[],[]];
        data.results.map((movie,i) => {
          movieTitle.push(movie.title);
          movieImage.push(`https://image.tmdb.org/t/p/w500${movie.poster_path}`);
          movieNum.push(i);
        })
        setState({ 
          movieTitle: state.movieTitle,
          movieImage: state.movieImage,
          movieNum: state.movieNum
        });
      }) 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handlePress(); 
  }, []);

  return (
    
    <View style={styles.container}>
      {/* 추천 , 검색 */}
      <View>
        <View style={styles.header} />
        <View style={styles.topTitle}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>추천</Text>
          <TouchableOpacity onPress={() => setLiked(!liked)}>
            <Image source={require('./../assets/images/search-icon.png')} />
          </TouchableOpacity>
        </View>
      </View>
      {/* 유튜브 추천 리뷰 */}
      <View>
        <Text style={{fontWeight: 'bold', fontSize: 18, paddingLeft: 20, paddingBottom: 13}}>유튜브 추천 리뷰</Text>
        <View style={{backgroundColor: 'black', height: 161}}>
          <Swiper
            showsPagination={false}
            showsButtons={true}
            loop={true}
            autoplay={true}
            autoplayTimeout={2.5}
            buttonWrapperStyle={{paddingHorizontal: 15}}
          >
            {/* 1 ~ 20 => 1 2 3  4 5 6 */}
            {state.movieImage.map((e,i) => (
              (i+1) <= 12  
                ? (i+1) % 3 == 1 
                    ? <View style={styles.slideContainer}> 
                      <Image
                        style={ styles.slide }
                        source={{ uri: state.movieImage[i] }}
                      /> 
                      <View style={{width: '5%'}} />
                    : null
                  (i+1) % 3 == 2 
                    ? <Image
                        style={ styles.slide }
                        source={{ uri: state.movieImage[i] }}
                      /> 
                      <View style={{width: '5%'}} />
                    : null
                  (i+1) % 3 == 0 
                    ? <Image
                        style={ styles.slide }
                        source={{ uri: state.movieImage[i] }}
                      />
                      </View> 
                    : null        
                : null
            ))}
          </Swiper>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height:60,
  },
  content: {
    flex:1,
  },
  topTitle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  slideContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  slide: {
    width: 99,
    height: 138,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
})

export default Recommend;
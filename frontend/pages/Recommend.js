import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { WebView } from 'react-native-webview';
import Swiper from 'react-native-swiper';

const Recommend = () => {
  const [liked, setLiked] = useState(false);
  const [state, setState] = useState({ 
    movie: { title: [], image: [], num: [] },
    tv: { title: [], image: [], num: [] },
  });

  const handlePress = async (url, dataKey) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaXZlQWxvbmVAZ21haWwuY29tIiwicm9sZXMiOiJST0xFX1VTRVIiLCJpYXQiOjE2NzgzMzk1NTIsImV4cCI6MTY3ODQyNTk1Mn0.8MEpJUHTSLVKumdbYdx9P2bRT27asjSrtXSaBuQvqmA"
        },
      })
      const data = await response.json();
      let [title, image, num] = [[],[],[]];
      data.results.map((item,i) => {
        title.push(item[dataKey === "tv" ? "name" : "title"]);
        image.push(`https://image.tmdb.org/t/p/w500${item.poster_path}`);
        num.push(i);
      });
      setState(prevState => ({ 
        ...prevState,
        [dataKey]: {title, image, num}
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handlePress('http://192.168.0.122:8080/user/chart/movies', 'movie');
    handlePress('http://192.168.0.122:8080/user/chart/tv', 'tv');
  }, []);


  const renderMedia = (title, data, dataKey) => {
    return (
      <View>
        <Text style={styles.subTitle}>{title}</Text>
        <View style={{height: 190}}>
          <Swiper
            showsPagination={false}
            showsButtons={true}
            loop={true}
            autoplay={true}
            autoplayTimeout={2.5}
            buttonWrapperStyle={{paddingHorizontal: 15}}
          >

          {/* 임시로 12개만 돌림 */}
          {[0, 3, 6, 9].map((startIndex, swiperIndex) => (
            <View key={swiperIndex} style={{ flexDirection: "row" }}>
              {[startIndex, startIndex + 1, startIndex + 2].map((index) => (
                <React.Fragment key={index}>
                  <View style={styles.slideContainer}>
                    <Image style={styles.slide} source={{ uri: data.image[index] }} />
                    <Text style={styles.contentTitle}>{data.title[index]}</Text>
                    {index % 3 !== 2 && (
                      <View style={{ width: "5%" }} />
                    )}
                  </View>
                </React.Fragment>
              ))}
            </View>
          ))}
          </Swiper>
        </View>
      </View>
      );
    };  

  return (
    
    <View style={styles.container}>
      <View style={styles.header} />

      {/* 추천 , 검색 */}
      <View style={{backgroundColor:'#FFFFFF'}}>
        <View>
          <View style={styles.topTitle}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>추천</Text>
            <TouchableOpacity onPress={() => setLiked(!liked)}>
              <Image source={require('./../assets/images/search-icon.png')} />
            </TouchableOpacity>
          </View>
        </View>
        {/* 영화 */}
        {renderMedia("주간 인기 영화", state.movie, "movie")}
    
        <View style={{ height: 16, backgroundColor:'#EEEEEE' }} />

        {/* 드라마 */}
        {renderMedia("주간 인기 드라마", state.tv, "tv")}
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE'
  },
  header: {
    height:50,
  },
  content: {
    flex:1,
  },
  subTitle: {
    fontWeight: 'bold', 
    fontSize: 18, 
    paddingLeft: 20, 
    paddingBottom: 13, 
    paddingTop:20
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  slide: {
    width: 99,
    height: 138,
    borderRadius: 5,
  },
  contentTitle: {
    marginTop: 7,
    fontSize: 14,
    textAlign: 'center',
  },
})


export default Recommend;
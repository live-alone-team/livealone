import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import Swiper from 'react-native-swiper';
import {IP} from '@env';

const Recommend = () => {
  const [search, setSearch] = useState(false);
  const [visible, setVisible] = useState(false);

  const [state, setState] = useState({ 
    movie: { title: [], image: [], num: [] },
    tv: { title: [], image: [], num: [] },
    youtube: {title: [], image: [], num: []}
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

      // youtube만 구조가 조금 다름
      let results = dataKey === 'youtube' ? data.items : data.results;
      results.map((item,i) => {
        if(dataKey === 'movie'){
          title.push(item["title"])
          image.push(`https://image.tmdb.org/t/p/w500${item.poster_path}`);
        }else if(dataKey === 'tv'){
          title.push(item["name"])
          image.push(`https://image.tmdb.org/t/p/w500${item.poster_path}`);
        }else{
          title.push(item.snippet.title)
          image.push(`${item.snippet.thumbnails.standard.url}`);
        }
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
    handlePress(`http://${IP}:8080/user/chart/movies`, 'movie');
    handlePress(`http://${IP}:8080/user/chart/tv`, 'tv');
    handlePress(`http://${IP}:8080/user/chart/youtube`, 'youtube');
  }, []);


  const renderMedia = (title, data, dataKey) => {
    return (
      <View>
        <Text style={styles.subTitle}>{title}</Text>
        <View style={{height: 190}}>
          <Swiper
            showsPagination={false}
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

      <View style={{backgroundColor:'#FFFFFF'}}>
        
        {/* 타이틀 , 검색 */}
        <View>
          <View style={styles.topTitle}>
            
            {search ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => setSearch(!search)}>
                    <Image source={require('./../assets/images/arrow-right.png')}/>
                  </TouchableOpacity>
                  <View style={styles.searchBox}>
                    <TouchableOpacity onPress={() => setVisible(!visible)}>
                      <Image style={styles.searchGubun} source={require('./../assets/images/arrow-down.png')}/>
                    </TouchableOpacity>


                    <View style={{ borderWidth: 0.5, height: 28, borderColor: '#D0D5DA' }} />
                    <TextInput style={styles.searchBar} placeholder="검색어를 입력하세요" />
                  </View>
                </View>
              ) : (
                <Text style={{fontWeight: 'bold', fontSize: 18}}>나혼자산다</Text>
              )}

            <TouchableOpacity onPress={() => setSearch(!search)}>
              <Image source={require('./../assets/images/search-icon.png')} />
            </TouchableOpacity>
          </View>
        </View>

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

          {/* movie */}
          {renderMedia("주간 인기 영화", state.movie, "movie")}
      
          <View style={{ height: 16, backgroundColor:'#EEEEEE' }} />

          {/* tv */}
          {renderMedia("주간 인기 드라마", state.tv, "tv")}

          <View style={{ height: 16, backgroundColor:'#EEEEEE' }} />

          {/* youtube */}
          {renderMedia("YoutTube", state.youtube, "youtube")}

          <View style={{ height: 110}} />

        </ScrollView>
      </View>
    </View>
  );
}

// css
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
    fontWeight: '500',
    fontSize: 18, 
    paddingLeft: 20, 
    paddingBottom: 13, 
    paddingTop:20,
  },
  topTitle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    height: 40,
    marginBottom:20
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
    fontWeight: '500'
  },
  searchBox:{
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#D0D5DA',
    flexDirection: 'row', 
    alignItems: 'center',
    marginLeft: 20,
  },
  searchBar:{
    width: 206,
    height: 40,
    marginLeft: 15,
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


export default Recommend;
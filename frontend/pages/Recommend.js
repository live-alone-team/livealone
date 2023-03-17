import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Button} from 'react-native';
import Swiper from 'react-native-swiper';
import {IP} from '@env';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const Recommend = () => {
  const [search, setSearch] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [state, setState] = useState({ 
    movies: { title: [], image: [], id: []},
    tv: { title: [], image: [], id: []},
    youtube: {title: [], image: [] }
  });
  
  const navigation = useNavigation();
  const datailMove = (dataKey, id) => {
    navigation.navigate('RecommendDetail',{
      dataKey : dataKey,
      id : id
    });
  };

  const handlePress = async (url, dataKey) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaXZlQWxvbmVAZ21haWwuY29tIiwicm9sZXMiOiJST0xFX1VTRVIiLCJpYXQiOjE2NzkwNTcxMTksImV4cCI6MTY3OTE0MzUxOX0.QUW4BpZMEsEPNXS4hpfX_AcxTBbkh2RBQb7o4wWlosQ"
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
                    <TouchableOpacity onPress={dataKey != 'youtube' ? () => datailMove(dataKey, data.id[index]) : null}>
                      <Image style={styles.slide} source={{ url: data.image[index] }}/>
                      <Text style={styles.contentTitle}>{data.title[index]}</Text>
                    </TouchableOpacity>
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
      {/* iOS 11 이상이 설치된 아이폰에만 적용됨. */}
      <SafeAreaView>
        <View style={{backgroundColor:'#FFFFFF'}}>
          
          {/* 타이틀 , 검색 */}
          <View>
            <View style={styles.topTitle}>              
              {search ? (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => setSearch(!search)}>
                      <AntDesign name="arrowleft" size={22} color="black" />
                    </TouchableOpacity>
                    <View style={styles.searchBox}>
                      <TouchableOpacity onPress={() => setVisible(!visible)}>
                        <View style={{marginLeft: 15, marginRight: 15, width: 34}}>
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
                          />
                        </View>
                      </TouchableOpacity>
                      <View style={{ borderWidth: 0.5, height: 28, borderColor: '#D0D5DA' }} />
                      <TextInput style={styles.searchBar} placeholder="검색어를 입력하세요"/>
                    </View>
                  </View> 
                ) : (
                  <Text style={{fontWeight: 'bold', fontSize: 18}}>나혼자산다</Text>
                )}

              <TouchableOpacity onPress={() => setSearch(!search)}>
                <AntDesign name="search1" size={22}  />
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

            {/* movies */}
            {renderMedia("주간 인기 영화", state.movies, "movies")}
        
            <View style={{ height: 16, backgroundColor:'#EEEEEE' }} />

            {/* tv */}
            {renderMedia("주간 인기 드라마", state.tv, "tv")}

            <View style={{ height: 16, backgroundColor:'#EEEEEE' }} />

            {/* youtube */}
            {renderMedia("YoutTube", state.youtube, "youtube")}

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
    width: 197,
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
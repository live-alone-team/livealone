import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Swiper from 'react-native-swiper';

// const handlePress = async () => {
//   try {
//     const response = await fetch('http://192.168.200.138:8080//user/chart/movies', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({})
//     });
    
//     const json = await response.json();
//     console.log(json);
//   } catch (error) { 
//     console.error(error);
//   }
// };

fetch("http://192.168.200.138:8080//user/chart/movies"),{
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'X-AUTH-TOKEN': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlZGR5QGdtYWlsLmNvbSIsInJvbGVzIjoiUk9MRV9VU0VSIiwiaWF0IjoxNjc3OTA4NTU1LCJleHAiOjE2Nzc5OTQ5NTV9.oIeJoZmSCCy1hphBF9uMfaT_THslFuy22RB3NlEaFWE'
  },
}
  .then((response) => response.json())
  .then((data) => console.log(data));

export default function Recommend() {
  return (
    <View style={styles.container}>
      {/* 추천 , 검색 */}
      <View>
        <View style={styles.header} />
        <View style={styles.topTitle}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>추천</Text>
          <Image source={require('./../assets/images/search-icon.png')} />
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
            <View style={styles.slideContainer}>
              <View style={styles.slide} />
              <View style={{width: '5%'}} />
              <View style={styles.slide} />
              <View style={{width: '5%'}} />
              <View style={styles.slide} />
            </View>
            <View style={styles.slideContainer}>
              <View style={styles.slide} />
              <View style={{width: '5%'}} />
              <View style={styles.slide} />
              <View style={{width: '5%'}} />
              <View style={styles.slide} />
            </View>
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
});
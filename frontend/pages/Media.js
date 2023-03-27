import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

const Media = ({title, data, dataKey}) => {
  const navigation = useNavigation();
  const detailMove = (dataKey, id) => {
    navigation.navigate('MainPageDetail',{
      dataKey : dataKey,
      id : id
    });
  };
  return (
    <View>
      <Text style={styles.subTitle}>{title}</Text>
      <View style={{height: 190}}>
        <Swiper
          showsPagination={false}
          loop={true}
          autoplayTimeout={2.5}
          buttonWrapperStyle={{paddingHorizontal: 15}}
        >
          {/* 임시로 12개만 돌림 */}
          {[0, 3, 6, 9].map((startIndex, swiperIndex) => (
            <View key={swiperIndex} style={{ flexDirection: "row" }}>
              {[startIndex, startIndex + 1, startIndex + 2].map((index) => (
                <React.Fragment key={index}>
                  <View style={styles.slideContainer}>
                    <TouchableOpacity onPress={dataKey != 'youtube' ? () => detailMove(dataKey, data.id[index]) : null}>
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
}

const styles = StyleSheet.create({
  subTitle: {
    fontWeight: '500',
    fontSize: 18, 
    paddingLeft: 20, 
    paddingBottom: 13, 
    paddingTop:20,
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
  }
});

export default Media;

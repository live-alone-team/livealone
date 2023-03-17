import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {IP} from '@env';
import { SimpleLineIcons, Entypo } from '@expo/vector-icons';

const RecommendDetail = () => {
  const { params } = useRoute();
  const { dataKey, id } = params;
  const [item, setItem] = useState({ 
    title : "",
    image : "",
    overview : "",
    date : ""
  });

  const [comments, setComments] = useState();
  const [content, setContent] = useState();

  const findItem = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaXZlQWxvbmVAZ21haWwuY29tIiwicm9sZXMiOiJST0xFX1VTRVIiLCJpYXQiOjE2NzkwNTcxMTksImV4cCI6MTY3OTE0MzUxOX0.QUW4BpZMEsEPNXS4hpfX_AcxTBbkh2RBQb7o4wWlosQ"
        },
      })
      const data = await response.json();
      let getItem = {
        title : "",
        image : "",
        overview : "",
        date : ""
      }
      if(dataKey == 'movies'){
        getItem.title = data.title;
        getItem.image = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
        getItem.overview = data.overview;
        getItem.date = data.release_date;
      }else if('tv'){
        getItem.title = data.name;
        getItem.image = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
        getItem.overview = data.overview;
        getItem.date = data.first_air_date;
      }
      setItem(prevState => ({ 
        ...prevState,
        ...getItem
      }));
      findComment(`http://${IP}:8080/user/chart/${dataKey}/${getItem.title}/comments`);
    } catch (error) {
      console.error(error);
    }
  };

  const findComment = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaXZlQWxvbmVAZ21haWwuY29tIiwicm9sZXMiOiJST0xFX1VTRVIiLCJpYXQiOjE2NzkwNTcxMTksImV4cCI6MTY3OTE0MzUxOX0.QUW4BpZMEsEPNXS4hpfX_AcxTBbkh2RBQb7o4wWlosQ"
        },
      })
      const data = await response.json();
      setComments(data)
    } catch (error) {
      console.error(error);
    }
  };  

  const writeComment = async () => {
    try {
      const response = await fetch(`http://${IP}:8080/user/chart/${dataKey}/${item.title}/comment`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaXZlQWxvbmVAZ21haWwuY29tIiwicm9sZXMiOiJST0xFX1VTRVIiLCJpYXQiOjE2NzkwNTcxMTksImV4cCI6MTY3OTE0MzUxOX0.QUW4BpZMEsEPNXS4hpfX_AcxTBbkh2RBQb7o4wWlosQ"
        },
        body: JSON.stringify({ content : content })
      })
      // 댓글 작성 후, 댓글 리스트를 다시 불러옴
      findComment(`http://${IP}:8080/user/chart/${dataKey}/${item.title}/comments`);
      setContent(''); // 댓글 작성 창 초기화
    } catch (error) {
      console.error(error);
    }
  };  



  useEffect(() => {
    findItem(`http://${IP}:8080/user/${dataKey}/${id}`);
  }, []);

  const commentBox = (comments) => {
    return (
        <View>
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <View style={{ width: '80%', height: '100%', flexDirection: 'row', marginLeft: 25, marginTop: 25, marginBottom: 25 }}>

              {/* 프로필 사진 */}
              <View style={{width: '20%'}}>

              </View> 

              <View style={{width: '80%'}}>
                <View style={{width: '100%', height: 40, flexDirection: 'row', alignItems: 'center'}}>

                  {/* 작성자 */}
                  <Text style={{fontSize: '16', fontWeight: '500'}}>
                    {comments.nickname}{' '}
                  </Text>

                  {/* 날짜 */}
                  <Text style={{color:'#6B7583', fontSize: '13'}}>
                    {comments.createdDate.substring(0,10)}
                  </Text>
                </View>

                {/* 내용 */}
                <Text style={{width: '100%', height: 60}}>
                  {comments.content}
                </Text>
              </View>
            </View>
            <Entypo name="dots-three-horizontal" size={20} color="black" style={{marginTop: 20, marginLeft: 5}}/>
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '90%'}}/>
          </View>
        </View>
    )
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>

        {/* 이미지, 제목, 감독, 개봉일, 설명 */}
        <View style={styles.itemBox}>
          <Image style={styles.itemImg} source={{ url: item.image }}/>
          <View style={styles.itemInfo}>
            {item.title &&
              <View style={{width: '100%', height: 25, justifyContent: 'center'}}>
                <Text style={{ fontWeight: 'bold', flexWrap: 'wrap', fontSize: 20}}>{item.title}</Text>  
              </View>  
            }
            {item.title &&
              <View style={{width: '100%', height: 25, justifyContent: 'center'}}>
                <Text style={{ fontWeight: '500', flexWrap: 'wrap', fontSize: 15}}>감독 : {item.title}</Text>  
              </View>  
            }
            {item.date &&
              <View style={{width: '100%', height: 25, justifyContent: 'center'}}>
                <Text style={{ fontWeight: '500', flexWrap: 'wrap', fontSize: 15}}>개봉일 : {item.date}</Text>  
              </View>  
            }
            {item.overview &&
              <View style={{width: '100%', height: '65%'}}>
                <Text style={{ flexWrap: 'wrap', fontSize: 13}}>{item.overview}</Text>  
              </View>  
            }
          </View> 
        </View>

        {/* 댓글 입력란 */}
        <View style={{width: '100%', height: 50, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{ flexWrap: 'wrap', fontSize: 14, width: '90%', height: '85%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderWidth: 1, borderColor: '#D6D6D6', borderRadius: '5'}}>
            <View style={{ width:'85%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <TextInput value={content} onChangeText={setContent} style={{ width:'100%', height: '90%'}} placeholder = '댓글을 입력해주세요' />
            </View>
            <TouchableOpacity onPress={() => writeComment()}>
              <SimpleLineIcons name="pencil" size={20} color="#6B7583" style={{ marginLeft: 10 }}/>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 20, height: 16, height: 5, backgroundColor:'#EEEEEE' }} />

        {/* 댓글 */}
        <ScrollView>
          {comments && comments.map((comment, index) => {
            return (
              <View key={index}>
                {commentBox(comment)}
              </View>
            )
          })}
        </ScrollView>

      </SafeAreaView>
    </View>
  );
};

// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  itemBox: {
    width: '100%',
    height: 250,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImg: {
    marginLeft: 20,
    backgroundColor: 'gray',
    width: '30%',
    height: 200
  },
  itemInfo: {
    marginLeft: 20,
    marginRight: 20,
    width: '55%',
    height: 200
  },
})


export default RecommendDetail;

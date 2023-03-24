import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, ActionSheetIOS, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { IP, TOKEN } from '@env';
import { SimpleLineIcons, Entypo } from '@expo/vector-icons';

const MainPageDetail = () => {
  const { params } = useRoute();
  const { dataKey, id } = params;
  const [item, setItem] = useState({ 
    title : "",
    image : "",
    overview : "",
    date : "",
    name: ""
  });
  const [comments, setComments] = useState();
  const [content, setContent] = useState();
  const [edit, setEdit] = useState({
    isEditing : false,
    id : ''
  })

  const [line, setLine] = useState(9);
  const [isActivated, setIsActivated] = useState(false);

  const authErr = () =>
  Alert.alert('접근 권한이 없는 유저입니다.', '', [
    {text: '돌아가기'},
  ]);

  const findItem = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": TOKEN
        },
      })
      const data = await response.json();
      let getItem = {
        title : "",
        image : "",
        overview : "",
        date : "",
        name : "",
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
        data.created_by.map((value) => {getItem.name += value.name + ', '})
        getItem.name = getItem.name.slice(0, -2)
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
          "X-AUTH-TOKEN": TOKEN
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
          "X-AUTH-TOKEN": TOKEN
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

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://${IP}:8080/user/comment/${commentId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": TOKEN
        },
        body: JSON.stringify({ commentId : commentId })
      })
      if (response.status === 200) {
        findComment(`http://${IP}:8080/user/chart/${dataKey}/${item.title}/comments`);
      }else if(response.status === 401){
        authErr()
      }

    } catch (error) {
      console.error(error);
    }
  };  

  const updateComment = async (commentId, content) => {
    try {
      const response = await fetch(`http://${IP}:8080/user/comment/${commentId}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": TOKEN
        },
        body: JSON.stringify({ commentId : commentId, content: content })
      })

      if (response.status === 200) {
        findComment(`http://${IP}:8080/user/chart/${dataKey}/${item.title}/comments`);
        setEdit({isEditing: false, id: ''}); // 수정 상태 초기화
        setContent(''); // 댓글 작성 창 초기화
      }else if(response.status === 401){
        authErr()
      }
    } catch (error) {
      console.error(error);
    }
  };  

  useEffect(() => {
    findItem(`http://${IP}:8080/user/${dataKey}/${id}`);
  }, []);
  
  const handleLine = () => {
    isActivated ? setLine(9) : setLine(Number.MAX_SAFE_INTEGER);
    setIsActivated(prev => !prev);
  }

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
            <TouchableOpacity onPress={() => commentDetail(comments.commentId, comments.content)}>
              <Entypo name="dots-three-horizontal" size={20} color="black" style={{marginTop: 20, marginLeft: 5}}/>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{borderBottomWidth: 1, borderBottomColor: '#E0E0E0', borderBottomStyle: 'solid', width: '90%'}}/>
          </View>
        </View>
    )
  }

  const commentDetail = (commentId, content) =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['취소', '수정', '삭제'],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      buttonIndex => {
        // 취소 버튼
        if (buttonIndex === 0) {
          
        // 수정 버튼
        } else if (buttonIndex === 1) {
          setEdit({
            isEditing : true,
            id : commentId
          })
          setContent(content)
        // 삭제 버튼
        } else if (buttonIndex === 2) {
          deleteComment(commentId);
        }
      },
    );  

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>

        {/* 영화 정보*/}
        <View style={styles.itemBox}>

          {/* 이미지 */}
          <Image style={styles.itemImg} source={{ url: item.image }}/>
          <View style={styles.itemInfo}>

            {/* 제목 */}
            {item.title &&
              <View style={{width: '100%', height: 25, justifyContent: 'center'}}>
                <Text style={{ fontWeight: 'bold', flexWrap: 'wrap', fontSize: 20}}>{item.title}</Text>  
              </View>  
            }
            {/* 감독 */}
            {item.name &&
              <View style={{width: '100%', height: 25, justifyContent: 'center'}}>
                <Text style={{ fontWeight: '500', flexWrap: 'wrap', fontSize: 14}}>감독 : {item.name}</Text>  
              </View>  
            }
            {/* 개봉일 */}
            {item.date &&
              <View style={{width: '100%', height: 25, justifyContent: 'center'}}>
                <Text style={{ fontWeight: '500', flexWrap: 'wrap', fontSize: 14}}>개봉일 : {item.date}</Text>  
              </View>  
            }
            {/* 설명 */}
            {item.overview &&
              <View style={{width: '100%', height: '65%'}}>
                <Text numberOfLines={line} ellipsizeMode="tail" onPress={()=>handleLine()} style={{ flexWrap: 'wrap', fontSize: 13}}>{item.overview}</Text>  
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
            <TouchableOpacity onPress={() => {
                if(!content){ null; }
                // 수정
                else if(edit.isEditing){ updateComment(edit.id, content);
                // 등록
                }else if(!edit.isEditing){ writeComment();}
              }}>
              <SimpleLineIcons name="pencil" size={20} color="#6B7583" style={{ marginLeft: 10 }}/>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 20, height: 16, height: 5, backgroundColor:'#EEEEEE' }} />

        {/* 댓글 */}
        <ScrollView style={{ height: '100%' }}>
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


export default MainPageDetail;

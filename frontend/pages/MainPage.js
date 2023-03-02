//우리가 리액트, 리액트 네이티브, 엑스포 라이브러리에서 꺼내 사용할 기능들을
//이렇게 앞으로도 상단에 선언한다음 가져다 사용합니다.
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

//App.js는 결국 App 함수를 내보내기 하고 있는 자바스크립트 파일입니다.
//이 함수는 무언가?를 반환하고 있는데 결국 화면을 반환하고 있습니다.
export default function MainPage() {
  const mysetting = () => {
    Alert.alert("TouchableOpacity에도 onPress 속성이 있습니다");
  };
  //화면을 반환합니다.
  //HTML 태그 같이 생긴 이 문법은 JSX라 불리우며 실제 화면을 그리는 문법입니다,
  //이번 강의에서 자세히 다룹니다

  return (
    <View style={styles.background}>
      <StatusBar style='auto' />
      <Text style={styles.title1}>회원가입</Text>
      <View style={styles.container1}>
        <Text style={styles.text1}>
          나 혼자 산다 통합 회원 정보를 입력해 주세요.
        </Text>
        <TouchableOpacity stype={styles.textcontainer} onPress={mysetting}>
          <Text>로그인해주세요.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// styles 변수 이름 답게 화면을 그려주는,
//더 자세히는 JSX문법을 꾸며주는 내용을 담고 있습니다.
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#FFE5E5",
    alignItems: "center",
    justifyContent: "center",
  },
  title1: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  container1: {
    marginTop: 55,
    width: 390,
    height: 500,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    fontSize: 25,
    textAlign: "center",
    margin: 20,
  },
});

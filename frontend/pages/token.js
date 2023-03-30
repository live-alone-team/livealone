import AsyncStorage from '@react-native-async-storage/async-storage';

// 토큰 저장하기
export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.log(error);
  }
};

// 토큰 불러오기
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.log(error);
  }
};

// 토큰 삭제하기
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.log(error);
  }
};
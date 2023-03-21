import { React, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { IP, TOKEN } from '@env';
import { useRoute } from '@react-navigation/native';
import SearchBar from './SearchBar';

const RecommendSearch = () => {

  const { params } = useRoute();

  const searchResult = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": TOKEN
        },
      })
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  }; 

  useEffect(() => {
    searchResult(`http://${IP}:8080/user/search/${params.dataKey}/${params.title}`);
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <SearchBar />
        <ScrollView>

        </ScrollView>

      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default RecommendSearch;

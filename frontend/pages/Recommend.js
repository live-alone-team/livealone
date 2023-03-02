import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function Recommend() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>추천</Text>
      <TextInput 
        style={styles.searchInput}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 42,
    paddingLeft: 20
    },
  searchInput: {
    width: 126,
    fontSize: 18,
    paddingTop: 21,
    paddingLeft: 20
  }
});
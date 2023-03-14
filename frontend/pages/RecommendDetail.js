import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.itemBox}>
          <View style={styles.itemImg}></View>
          <View style={styles.itemInfo}>

          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE'
  },
  itemBox: {
    width: '100%',
    height: '60%',
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImg: {
    marginLeft: 20,
    backgroundColor: 'gray',
    width: '30%',
    height: '85%'
  },
  itemInfo: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'red',
    width: '55%',
    height: '85%'
  }
})


export default App;
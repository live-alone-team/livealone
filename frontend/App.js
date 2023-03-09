import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
// import Icon from 'react-native-vector-icons/Ionicons'; 
import Vote from './pages/Vote';
import MainPage from './pages/MainPage';
import Recommend from './pages/Recommend';
import Profile from './pages/Profile';
import axios from 'axios';

// axios.get('http://localhost:8080/api/users')
//   .then(response => {
//     console.log(response);
//   })
//   .catch(error => {
//     console.log(error);
//   });

function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({  
  container: {  
      flex: 1,  
      justifyContent: 'center',  
      alignItems: 'center'  
  },  
});

const TabNavigator = createMaterialBottomTabNavigator(  
  { 
      MainPage: { 
        screen: MainPage,  
        navigationOptions:{  
          tabBarLabel:'메인 화면',  
          tabBarIcon: ({  }) => (  
              <View>
                  {/* <Icon style={[{color: tintColor}]} size={25} name={'home-outline'}/>   */}
                  <Image source={require('./assets/images/home-icon.png')} />
              </View>),  
        }  
      },  
      Vote: { 
        screen: Vote,  
        navigationOptions:{  
          tabBarLabel:'투표 추가',  
          tabBarIcon: ({  }) => (  
            <View>  
                  {/* <Icon style={[{color: tintColor}]} size={25} name={'add-circle-outline'}/>   */}
                  <Image source={require('./assets/images/vote-icon.png')} />
              </View>),  
          activeColor:   '#6B7583',  
          inactiveColor: '#6B7583',  
          barStyle: { backgroundColor: 'white', paddingBottom: 30 },  
        }  
      },  
      Recommend: { 
        screen: Recommend,  
        navigationOptions:{  
          tabBarLabel:'투표',  
          tabBarIcon: ({  }) => (  
            <View>  
                  {/* <Icon style={[{color: tintColor}]} size={25} name={'chatbubbles-outline'}/>   */}
                  <Image source={require('./assets/images/recommend-icon.png')} />
              </View>),  
          activeColor:   '#6B7583',  
          inactiveColor: '#6B7583',  
          barStyle: { backgroundColor: 'white', paddingBottom: 30 },  
        }  
      },  
      Profile: {  
        screen: Profile,  
        navigationOptions:{  
          tabBarLabel:'프로필',  
          tabBarIcon: ({  }) => (  
            <View>  
                  {/* <Icon style={[{color: tintColor}]} size={25} name={'person-outline'}/>   */}
                  <Image source={require('./assets/images/profile-icon.png')} />
              </View>),  
        }  
      },  
    },  
  {  
    initialRouteName: "MainPage",  
    activeColor:   '#6B7583',  
    inactiveColor: '#6B7583',  
    barStyle: { backgroundColor: 'white', paddingBottom: 30 },  
  },  
);  

export default createAppContainer(TabNavigator)
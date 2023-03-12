import React from 'react';
import { View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Vote from './pages/Vote';
import MainPage from './pages/MainPage';
import Recommend from './pages/Recommend';
import Profile from './pages/Profile';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MainPage"
        component={MainPage}
        options={{
          tabBarLabel: '메인 화면',
          tabBarIcon: ({ color, size }) => (
            <View>
              <Image source={require('./assets/images/home-icon.png')} />
            </View>
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Vote"
        component={Vote}
        options={{
          tabBarLabel: '투표 추가',
          tabBarIcon: ({ color, size }) => (
            <View>
              <Image source={require('./assets/images/vote-icon.png')} />
            </View>
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Recommend"
        component={Recommend}
        options={{
          tabBarLabel: '투표',
          tabBarIcon: ({ color, size }) => (
            <View>
              <Image source={require('./assets/images/recommend-icon.png')} />
            </View>
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: '프로필',
          tabBarIcon: ({ color, size }) => (
            <View>
              <Image source={require('./assets/images/profile-icon.png')} />
            </View>
          ),
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;

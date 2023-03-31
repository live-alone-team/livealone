import React, { useState, useEffect } from 'react';
import { Text ,TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, navigationRef } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MainPage from './pages/MainPage';
import MainPageDetail from './pages/MainPageDetail';
import MainPageSearch from './pages/MainPageSearch';
import Vote from './pages/Vote';
import VoteDetail from './pages/VoteDetail';
import VoteSearch from './pages/VoteSearch';
import RegisterVote from './pages/RegisterVote';
import Profile from './pages/Profile';
import InputPage from './pages/InputPage';
import GoogleLogin from './pages/GoogleLogin';
import ProfileEdit from './pages/ProfileEdit';

import { getToken, removeToken  } from './pages/token';
 
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainPageStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainPageHome" component={MainPage} options={{ headerShown: false, title: ' ',}}/>
      <Stack.Screen name="MainPageDetail" component={MainPageDetail} options={{ title: '리뷰 보기', }} />
      <Stack.Screen name="MainPageSearch" component={MainPageSearch} options={{ headerShown: false,title: ' ',}}/>

      <Stack.Screen name="Login" component={Login} options={{ headerShown: false, title: ' ' }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ title: '회원가입' }} />
      <Stack.Screen name="InputPage" component={InputPage} options={{ title: '회원가입' }} />
      <Stack.Screen name="GoogleLogin" component={GoogleLogin} options={{ headerShown: false, title: ' ' }} />
    </Stack.Navigator>
  );
};

const RegisterVoteStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RegisterVotePage" component={RegisterVote} options={{ headerShown: false, title: ' ',}}/>

      <Stack.Screen name="Login" component={Login} options={{ headerShown: false, title: ' ' }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ title: '회원가입' }} />
      <Stack.Screen name="InputPage" component={InputPage} options={{ title: '회원가입' }} />
      <Stack.Screen name="GoogleLogin" component={GoogleLogin} options={{ headerShown: false, title: ' ' }} />
    </Stack.Navigator>
  );
};

const VoteStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="VotePage" component={Vote} options={{ headerShown: false, title: ' ',}}/>
      <Stack.Screen name="VoteDetail" component={VoteDetail} options={{ title: ' ', }} />
      <Stack.Screen name="VoteSearch" component={VoteSearch} options={{ headerShown: false, title: ' ', }} />

      <Stack.Screen name="Login" component={Login} options={{ headerShown: false, title: ' ' }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ title: '회원가입' }} />
      <Stack.Screen name="InputPage" component={InputPage} options={{ title: '회원가입' }} />
      <Stack.Screen name="GoogleLogin" component={GoogleLogin} options={{ headerShown: false, title: ' ' }} />
    </Stack.Navigator>
  );
};

const ProfileStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfilePage" component={Profile} options={{ headerShown: false, title: ' ' }} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{ title: '프로필 수정', }} />
      
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false, title: ' ' }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ title: '회원가입' }} />
      <Stack.Screen name="InputPage" component={InputPage} options={{ title: '회원가입' }} />
      <Stack.Screen name="GoogleLogin" component={GoogleLogin} options={{ headerShown: false, title: ' ' }} />
    </Stack.Navigator>
  );
};

const LoginStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false, title: ' ' }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ title: '회원가입' }} />
      <Stack.Screen name="InputPage" component={InputPage} options={{ title: '회원가입' }} />
      <Stack.Screen name="GoogleLogin" component={GoogleLogin} options={{ headerShown: false, title: ' ' }} />

    </Stack.Navigator>
  );
};

const TabNavigator = ({token}) => {

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MainPage"
        component={MainPageStack}        
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ fontSize:10, color: focused ? '#FF4545' : 'gray'  }}>메인 화면</Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign name="home" size={24} color={focused ? '#FF4545' : 'gray'} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="RegisterVote"
        component={RegisterVoteStack}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ fontSize:10, color: focused ? '#FF4545' : 'gray'  }}>투표 추가</Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign name="pluscircleo" size={24} color={focused ? '#FF4545' : 'gray'} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Vote"
        component={VoteStack}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ fontSize:10, color: focused ? '#FF4545' : 'gray'  }}>투표</Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name="chatbubbles-outline" size={24} color={focused ? '#FF4545' : 'gray'} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ fontSize:10, color: focused ? '#FF4545' : 'gray'  }}>프로필</Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign name="user" size={24} color={focused ? '#FF4545' : 'gray'} />
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
      {
        <TabNavigator/>
      }
    </NavigationContainer>
  );
};

export default AppNavigator;

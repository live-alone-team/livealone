import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
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
        name="Vote"
        component={Vote}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ fontSize:10, color: focused ? '#FF4545' : 'gray'  }}>투표 추가</Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign name="pluscircleo" size={24} color={focused ? '#FF4545' : 'gray'} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Recommend"
        component={Recommend}
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
        component={Profile}
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
      <TabNavigator/>
    </NavigationContainer>
  );
};

export default AppNavigator;

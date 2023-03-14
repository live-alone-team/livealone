import React from 'react';
import { Text ,TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Vote from './pages/Vote';
import MainPage from './pages/MainPage';
import Recommend from './pages/Recommend';
import Profile from './pages/Profile';
import RecommendDetail from './pages/RecommendDetail';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const RecommendStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Recommend"
        component={Recommend}
        options={{ 
          headerShown: false,
          title: ' ',
        }}
      />
      <Stack.Screen
        name="RecommendDetail"
        component={RecommendDetail}
        options={{ 
          title: '리뷰 보기',
        }}
      />
    </Stack.Navigator>
  );
};

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
        component={RecommendStack}
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

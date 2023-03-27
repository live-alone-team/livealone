import React from 'react';
import { Text ,TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import MainPage from './pages/MainPage';
import MainPageDetail from './pages/MainPageDetail';
import MainPageSearch from './pages/MainPageSearch';
import Vote from './pages/Vote';
import VoteDetail from './pages/VoteDetail';
import VoteSearch from './pages/VoteSearch';
import RegisterVote from './pages/RegisterVote';
import Profile from './pages/Profile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainPageStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainPageHome"
        component={MainPage}
        options={{ 
          headerShown: false,
          title: ' ',
        }}
      />
      <Stack.Screen
        name="MainPageDetail"
        component={MainPageDetail}
        options={{ 
          title: '리뷰 보기',
        }}
      />
      <Stack.Screen
        name="MainPageSearch"
        component={MainPageSearch}
        options={{ 
          headerShown: false,
          title: ' ',
        }}
      />
    </Stack.Navigator>
  );
};

const VoteStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VotePage"
        component={Vote}
        options={{ 
          headerShown: false,
          title: ' ',
        }}
      />
      <Stack.Screen
        name="VoteDetail"
        component={VoteDetail}
        options={{ 
          headerShown: false,
          title: ' ',
        }}
      />
      <Stack.Screen
        name="VoteSearch"
        component={VoteSearch}
        options={{ 
          headerShown: false,
          title: ' ',
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
        component={RegisterVote}
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

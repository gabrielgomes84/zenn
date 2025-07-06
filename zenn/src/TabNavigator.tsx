import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TaskScreen from './screens/TaskScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import ProfileScreen from './screens/ProfileScreen';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function TabNavigator({ route }) {
  const initialRouteName = route?.params?.screen ?? 'Tasks';

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'circle';

          if (route.name === 'Tasks') iconName = 'check-circle';
          else if (route.name === 'Statistics') iconName = 'insert-chart';
          else if (route.name === 'Profile') iconName = 'person';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'gray',
        tabBarInactiveTintColor: '#FFF8DC',
        tabBarStyle: { backgroundColor: '#4C804C' },
      })}
    >
      <Tab.Screen name="Tasks" component={TaskScreen} />
      <Tab.Screen name="Statistics" component={StatisticsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

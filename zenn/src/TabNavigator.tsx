import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TaskScreen from './screens/TaskScreen';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

function PlaceholderScreen({ label }: { label: string }) {
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>{label} Screen (No navigation yet)</Text>
    </View>
  );
}

function StatisticsScreen() {
  return <PlaceholderScreen label="Statistics" />;
}

function ProfileScreen() {
  return <PlaceholderScreen label="Profile" />;
}

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

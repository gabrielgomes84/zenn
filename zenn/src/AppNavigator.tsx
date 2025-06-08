import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import TabNavigator from './TabNavigator'; // importe o TabNavigator
import { Image } from 'react-native';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainTabs"          // troque o nome da tela para algo genérico
        component={TabNavigator} // aqui você usa o TabNavigator importado
        options={{
          headerStyle: { backgroundColor: '#4C804C' },
          headerTitle: () => (
            <Image
              source={require('./assets/zennicon.png')}
              style={{ width: 70, height: 80, resizeMode: 'contain' }}
            />
          ),
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import TaskScreen from './screens/TaskScreen';
import { Image } from 'react-native';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}}/>
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false}} />
      <Stack.Screen name="Task" component={TaskScreen} 
      options={{
        headerStyle: { backgroundColor : '#4C804C' },
        headerTitle: () => (
          <Image
            source={require('./assets/zennicon.png')}
            style={{ width: 70, height: 80, resizeMode: 'contain' }}
          />
        ),
        headerBackVisible: false, // Remove o botão de voltar
      }}
     />
    </Stack.Navigator>
  );
}
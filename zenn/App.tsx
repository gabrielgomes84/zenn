//app.tsx
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/AppNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>

  );
} // This is the main entry point of the app, where we set up the navigation container and the main navigator.
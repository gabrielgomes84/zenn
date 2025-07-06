import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/AppNavigator';
import { criarTabelaUsuarios } from './src/database/usuarios';

export default function App() {
  useEffect(() => {
    criarTabelaUsuarios();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
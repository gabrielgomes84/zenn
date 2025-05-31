// src/screens/LoginScreen.tsx
import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import ZennIcon from '../assets/zennicon.png'; // Caminho correto para a imagem

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Image source={ZennIcon} style={styles.logo} />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#EEE9D1"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#EEE9D1"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4C804C',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#BBB',
    borderRadius: 8,
    marginBottom: 16,
    color: '#FFF8DC',
  },
  button: {
    backgroundColor: '#FFF8DC',
    padding: 12,
    borderRadius: 8,
    width: '100%',
  },
  buttonText: {
    color: '#5C3A00',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logo: {
    width: 280,
    height: 280,
    marginBottom: -30,
    resizeMode: 'contain',
  },
});

//screen/LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet, Alert } from 'react-native';
import ZennIcon from '../assets/zennicon.png';
import { buscarUsuarioPorEmailSenha } from '../database/usuarios';

type Props = {
  navigation: any;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const user = await buscarUsuarioPorEmailSenha(email.trim().toLowerCase(), senha.trim());
      if (user) {
        navigation.navigate('MainTabs', { screen: 'Tasks', params: { usuarioId: user.id } });
      } else {
        Alert.alert('Erro', 'Email ou senha incorretos');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao tentar fazer login');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={ZennIcon} style={styles.logo} />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#EEE9D1"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#EEE9D1"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{ marginTop: 16, color: '#5C3A00' }}>
          Ainda não possuo uma conta
        </Text>
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

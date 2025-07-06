//screens/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { inserirUsuario } from '../database/usuarios';
import { User } from '../models/user';
import { Alert } from 'react-native';
import ZennIcon from "../assets/zennicon.png";

export default function RegisterScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = async () => {
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    const novoUsuario: User = {
      id: Date.now().toString(),
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      senha: senha.trim(),
      data_criacao: new Date().toISOString(),
    };

    try {
      await inserirUsuario(novoUsuario);
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      setNome('');
      setEmail('');
      setSenha('');
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cadastrar o usuário. Tente novamente.");
      console.error(error);
    }
  };


  return (
    <View style={styles.container}>
      <Image source={ZennIcon} style={styles.logo} />
      <Text style={styles.title}>Tela de Cadastro</Text>
      <TextInput 
        style={styles.input}
        placeholder="Nome Completo"
        placeholderTextColor={"#EEE9D1"}
        keyboardType="default"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={"#EEE9D1"}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={"#EEE9D1"}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#4C804C' },

  title: { 
    width: '90%',
    height: 100,
    textAlign: 'center',
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#FFF8DC',
  },

  logo: {
    width: 280,
    height: 180,
    marginBottom: -30,
    resizeMode: 'contain',
  },

  input: {
    width: '90%',
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
    width: '90%',
    alignItems: 'center',
},

  buttonText: {
    color: '#5C3A00',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});
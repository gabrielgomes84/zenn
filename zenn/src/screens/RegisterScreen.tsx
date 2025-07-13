//src/screens/RegisterScreen.tsx
import React, { useState } from "react";
import { registrarUsuario } from "../services/auth";
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet, Alert } from "react-native";
import ZennIcon from "../assets/zennicon.png";

export default function RegisterScreen({ navigation }: any) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  const handleRegister = async () => {
    try {
      await registrarUsuario(nome, email, senha);
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      Alert.alert("Erro", "Não foi possível cadastrar. Verifique os dados.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={ZennIcon} style={styles.logo} />
      <Text style={styles.title}>Tela de Cadastro</Text>
      <TextInput 
        style={styles.input}
        placeholder="Nome Completo"
        value={nome}
        onChangeText={setNome}
        placeholderTextColor={"#EEE9D1"}
        keyboardType="default"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={"#EEE9D1"}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        placeholderTextColor={"#EEE9D1"}
        secureTextEntry />

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
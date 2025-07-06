import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function ProfileScreen() {
  const [nome, setNome] = useState('João Silva');
  const [email, setEmail] = useState('joao@email.com');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      {/* (futura) Foto de perfil */}
      <View style={styles.photoPlaceholder}>
        <Text style={styles.photoText}>Foto</Text>
      </View>

      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        value={novaSenha}
        onChangeText={setNovaSenha}
        placeholder="Nova senha"
        placeholderTextColor="#888"
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        value={confirmacaoSenha}
        onChangeText={setConfirmacaoSenha}
        placeholder="Confirme a nova senha"
        placeholderTextColor="#888"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Salvar alterações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#A0522D', marginTop: 10 }]}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF8DC',
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4C804C',
    marginBottom: 20,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  photoText: {
    color: '#888',
    fontSize: 14,
  },
  input: {
    width: '100%',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    color: '#4C804C',
  },
  button: {
    width: '100%',
    backgroundColor: '#4C804C',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF8DC',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

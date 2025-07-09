import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditarPerfilModal from '../components/EditProfileModal';

export default function ProfileScreen() {
  const [nome, setNome] = useState('João Silva');
  const [email, setEmail] = useState('joao@email.com');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Ionicons name="person-circle-outline" size={100} color="#4C804C" style={styles.icon} />

      <Text style={styles.title}>Meu Perfil</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.infoText}>{nome}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.infoText}>{email}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Alterar dados</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>Sair da conta</Text>
      </TouchableOpacity>

      <EditarPerfilModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        nome={nome}
        email={email}
        novaSenha={novaSenha}
        confirmacaoSenha={confirmacaoSenha}
        setNome={setNome}
        setEmail={setEmail}
        setNovaSenha={setNovaSenha}
        setConfirmacaoSenha={setConfirmacaoSenha}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF8DC',
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4C804C',
    marginBottom: 20,
  },
  infoBox: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  label: {
    fontWeight: 'bold',
    color: '#4C804C',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  button: {
    backgroundColor: '#4C804C',
    padding: 14,
    borderRadius: 8,
    width: '100%',
  },
  buttonText: {
    color: '#FFF8DC',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  secondaryButton: {
    marginTop: 14,
    padding: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#4C804C',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

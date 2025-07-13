import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditarPerfilModal from '../components/EditProfileModal';
import ChangeEmailModal from '../components/ChangeEmailModal'; // novo modal
import { auth } from '../services/firebase';
import { useNavigation } from '@react-navigation/native';
import {
  atualizarPerfilUsuario,
  atualizarSenhaComReautenticacao,
  buscarDadosUsuario,
} from '../services/auth';

export default function ProfileScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalChangeEmailVisible, setModalChangeEmailVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const carregarDados = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      const dados = await buscarDadosUsuario(uid);
      if (dados) {
        setNome(dados.nome);
        setEmail(dados.email);
      }
    };
    carregarDados();
  }, []);

  const salvarAlteracoes = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    if (novaSenha && novaSenha !== confirmacaoSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      if (novaSenha) {
        if (!senhaAtual) {
          Alert.alert('Erro', 'Digite sua senha atual.');
          return;
        }

        await atualizarSenhaComReautenticacao(novaSenha, senhaAtual);
      }

      await atualizarPerfilUsuario(uid, nome);
      Alert.alert('Sucesso', 'Dados atualizados com sucesso.');
      setModalVisible(false);
      setSenhaAtual('');
      setNovaSenha('');
      setConfirmacaoSenha('');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Erro', error.message || 'Falha ao atualizar dados.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Ionicons name="person-circle-outline" size={100} color="#4C804C" style={styles.icon} />
      <Text style={styles.title}>Meu Perfil</Text>

      <View style={[styles.infoBox, { backgroundColor: '#d0f0c0' }]}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.infoText}>{nome}</Text>

        <Text style={styles.label}>Email:</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={[styles.infoText, { flex: 1 }]}>{email}</Text>
          <TouchableOpacity onPress={() => setModalChangeEmailVisible(true)}>
            <Ionicons name="create-outline" size={20} color="#4C804C" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Alterar dados</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={async () => {
          try {
            await auth.signOut();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          } catch (error) {
            console.error('Erro ao sair da conta:', error);
            Alert.alert('Erro', 'Falha ao sair da conta.');
          }
        }}
      >
        <Text style={styles.secondaryButtonText}>Sair da conta</Text>
      </TouchableOpacity>

      <EditarPerfilModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSalvar={salvarAlteracoes}
        nome={nome}
        senhaAtual={senhaAtual}
        novaSenha={novaSenha}
        confirmacaoSenha={confirmacaoSenha}
        setNome={setNome}
        setSenhaAtual={setSenhaAtual}
        setNovaSenha={setNovaSenha}
        setConfirmacaoSenha={setConfirmacaoSenha}
      />

      <ChangeEmailModal visible={modalChangeEmailVisible} onClose={() => setModalChangeEmailVisible(false)} />
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
  icon: { marginBottom: 10 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#4C804C', marginBottom: 20 },
  infoBox: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 8,
    padding: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  label: { fontWeight: 'bold', color: '#4C804C', marginBottom: 4 },
  infoText: { fontSize: 16, marginBottom: 12, color: '#333' },
  button: { backgroundColor: '#4C804C', padding: 14, borderRadius: 8, width: '100%' },
  buttonText: { color: '#FFF8DC', textAlign: 'center', fontWeight: 'bold' },
  secondaryButton: { marginTop: 14, padding: 12, alignItems: 'center' },
  secondaryButtonText: { color: '#4C804C', fontWeight: 'bold', fontSize: 16 },
});

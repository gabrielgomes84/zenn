//src/components/EditProfileModal.tsx
import React from 'react';
import {
  Modal, View, Text, TextInput, TouchableOpacity, StyleSheet,
} from 'react-native';

interface EditarPerfilModalProps {
  visible: boolean;
  onClose: () => void;
  onSalvar: () => void;
  nome: string;
  senhaAtual: string;
  novaSenha: string;
  confirmacaoSenha: string;
  setNome: (text: string) => void;
  setSenhaAtual: (text: string) => void;
  setNovaSenha: (text: string) => void;
  setConfirmacaoSenha: (text: string) => void;
}

export default function EditarPerfilModal({
  visible,
  onClose,
  onSalvar,
  nome,
  senhaAtual,
  novaSenha,
  confirmacaoSenha,
  setNome,
  setSenhaAtual,
  setNovaSenha,
  setConfirmacaoSenha,
}: EditarPerfilModalProps) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Editar Perfil</Text>

          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Nome completo"
            placeholderTextColor="#888"
          />

          <TextInput
            style={styles.input}
            value={senhaAtual}
            onChangeText={setSenhaAtual}
            placeholder="Senha atual"
            placeholderTextColor="#888"
            secureTextEntry
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
            placeholder="Confirmar nova senha"
            placeholderTextColor="#888"
            secureTextEntry
          />

          <View style={styles.buttons}>
            <TouchableOpacity onPress={onClose} style={styles.cancel}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSalvar} style={styles.save}>
              <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  container: { backgroundColor: '#fff', width: '90%', borderRadius: 10, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#4C804C', marginBottom: 20 },
  input: { width: '100%', padding: 12, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#ccc', marginBottom: 12, color: '#4C804C' },
  buttons: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 },
  cancel: { padding: 10, marginRight: 10 },
  cancelText: { color: '#4C804C', fontWeight: 'bold' },
  save: { backgroundColor: '#4C804C', padding: 10, borderRadius: 8 },
  saveText: { color: '#FFF8DC', fontWeight: 'bold' },
});
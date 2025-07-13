import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function ChangeEmailModal({ visible, onClose }: Props) {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novoEmail, setNovoEmail] = useState('');
  const [codigo, setCodigo] = useState('');

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Alterar Email</Text>

          <TextInput
            placeholder="Senha atual"
            secureTextEntry
            value={senhaAtual}
            onChangeText={setSenhaAtual}
            style={styles.input}
            placeholderTextColor="#4C804C"
          />

          <TextInput
            placeholder="Novo email"
            keyboardType="email-address"
            value={novoEmail}
            onChangeText={setNovoEmail}
            style={styles.input}
            placeholderTextColor="#4C804C"
          />

          <TextInput
            placeholder="Código de verificação"
            value={codigo}
            onChangeText={setCodigo}
            style={styles.input}
            placeholderTextColor="#4C804C"
          />

          <TouchableOpacity onPress={() => { /* lógica de enviar código */ }} >
            <Text style={styles.sendVerificationText}>Send verification</Text>
          </TouchableOpacity>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancel} onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.save} onPress={() => { /* lógica confirmar */ }}>
              <Text style={styles.saveText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFF8DC',
    width: '90%',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4C804C',
    marginBottom: 16,
    textAlign: 'center',
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
    fontSize: 16,
  },
  sendVerificationText: {
    color: '#4C804C',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancel: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  cancelText: {
    color: '#4C804C',
    fontWeight: 'bold',
    fontSize: 16,
  },
  save: {
    backgroundColor: '#4C804C',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveText: {
    color: '#FFF8DC',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

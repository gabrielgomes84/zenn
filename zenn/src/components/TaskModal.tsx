import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

type Props = {
  visible: boolean;
  onClose: () => void;
  selectedDate: string;
};

export default function TaskModal({ visible, onClose, selectedDate }: Props) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [hora, setHora] = useState('');
  const [prioridade, setPrioridade] = useState('baixa');
  const [status, setStatus] = useState('pendente');
  const [lembrete, setLembrete] = useState(false);

  const handleSalvar = () => {
    const novaTarefa = {
      id: Date.now().toString(),
      usuario_id: 'exemplo-usuario-id',
      titulo,
      descricao,
      data: selectedDate,
      hora,
      prioridade,
      status,
      lembrete,
      data_criacao: new Date().toISOString(),
    };
    console.log(novaTarefa); // aqui você pode enviar para o backend
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Nova Tarefa</Text>
          <Text style={styles.date}>Data: {selectedDate}</Text>

          <TextInput
            placeholder="Título"
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
          />

          <TextInput
            placeholder="Descrição"
            style={styles.input}
            value={descricao}
            onChangeText={setDescricao}
          />

          <TextInput
            placeholder="Hora (ex: 14:30)"
            style={styles.input}
            value={hora}
            onChangeText={setHora}
          />

          <Text style={styles.label}>Prioridade</Text>
          <Picker
            selectedValue={prioridade}
            onValueChange={setPrioridade}
            style={styles.picker}>
            <Picker.Item label="Baixa" value="baixa" />
            <Picker.Item label="Média" value="média" />
            <Picker.Item label="Alta" value="alta" />
          </Picker>

          <Text style={styles.label}>Status</Text>
          <Picker
            selectedValue={status}
            onValueChange={setStatus}
            style={styles.picker}>
            <Picker.Item label="Pendente" value="pendente" />
            <Picker.Item label="Concluída" value="concluída" />
          </Picker>

          <View style={styles.switchRow}>
            <Text style={styles.label}>Lembrete</Text>
            <Switch value={lembrete} onValueChange={setLembrete} />
          </View>

          <TouchableOpacity onPress={handleSalvar} style={styles.saveButton}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF8DC',
    padding: 20,
    borderRadius: 12,
    width: '90%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4C804C',
    marginBottom: 10,
    textAlign: 'center',
  },
  date: {
    fontSize: 14,
    color: '#4C804C',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
  },
  label: {
    color: '#4C804C',
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: '#4C804C',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#888',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF8DC',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
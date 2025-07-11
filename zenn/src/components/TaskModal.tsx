// src/components/TaskModal.tsx
import React, { useState, useEffect } from 'react';
import {
  Modal, View, Text, StyleSheet, TouchableOpacity,
  TextInput, Switch, Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addDoc, collection, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

type Task = {
  id?: string;
  usuario_id: string;
  titulo: string;
  descricao: string;
  data: string;
  hora: string;
  prioridade: string;
  status: string;
  lembrete: boolean;
  data_criacao: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  selectedDate: string;
  usuarioId: string;
  taskToEdit?: Task | null;
};

export default function TaskModal({ visible, onClose, selectedDate, usuarioId, taskToEdit }: Props) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [horaSelecionada, setHoraSelecionada] = useState(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [prioridade, setPrioridade] = useState('baixa');
  const [status, setStatus] = useState('pendente');
  const [lembrete, setLembrete] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setTitulo(taskToEdit.titulo);
      setDescricao(taskToEdit.descricao);
      setHoraSelecionada(new Date(`${taskToEdit.data}T${taskToEdit.hora}`));
      setPrioridade(taskToEdit.prioridade);
      setStatus(taskToEdit.status);
      setLembrete(taskToEdit.lembrete);
    } else {
      setTitulo('');
      setDescricao('');
      setHoraSelecionada(new Date());
      setPrioridade('baixa');
      setStatus('pendente');
      setLembrete(false);
    }
  }, [taskToEdit]);

  const formatarData = (dataBr: string): string => {
    const partes = dataBr.split('/');
    return `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
  };

  const handleSalvar = async () => {
    const horaFormatada = horaSelecionada.toLocaleTimeString([], {
      hour: '2-digit', minute: '2-digit',
    });

    const tarefa: Task = {
      usuario_id: usuarioId,
      titulo,
      descricao,
      data: formatarData(selectedDate), // <- aqui usamos a data corrigida
      hora: horaFormatada,
      prioridade,
      status,
      lembrete,
      data_criacao: new Date().toISOString(),
    };

    try {
      if (taskToEdit && taskToEdit.id) {
        const ref = doc(db, 'tarefas', taskToEdit.id);
        await updateDoc(ref, tarefa);
      } else {
        await addDoc(collection(db, 'tarefas'), tarefa);
      }
      onClose();
    } catch (err) {
      console.error('Erro ao salvar tarefa:', err);
    }
  };

  const handleExcluir = async () => {
    if (taskToEdit?.id) {
      try {
        await deleteDoc(doc(db, 'tarefas', taskToEdit.id));
        onClose();
      } catch (err) {
        console.error('Erro ao excluir tarefa:', err);
      }
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{taskToEdit ? 'Editar Tarefa' : 'Nova Tarefa'}</Text>
          <Text style={styles.date}>Data: {selectedDate}</Text>

          <TextInput
            placeholder="Título"
            placeholderTextColor="#888"
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
          />
          <TextInput
            placeholder="Descrição"
            placeholderTextColor="#888"
            style={styles.input}
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />

          <TouchableOpacity onPress={() => setMostrarPicker(true)} style={styles.timeButton}>
            <Text style={styles.timeButtonText}>
              {horaSelecionada.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </TouchableOpacity>

          {mostrarPicker && (
            <DateTimePicker
              value={horaSelecionada}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour
              onChange={(_, selectedTime) => {
                setMostrarPicker(false);
                if (selectedTime) setHoraSelecionada(selectedTime);
              }}
            />
          )}

          <Text style={styles.label}>Prioridade</Text>
          <Picker selectedValue={prioridade} onValueChange={setPrioridade} style={styles.picker}>
            <Picker.Item label="Baixa" value="baixa" />
            <Picker.Item label="Média" value="média" />
            <Picker.Item label="Alta" value="alta" />
          </Picker>

          <Text style={styles.label}>Status</Text>
          <Picker selectedValue={status} onValueChange={setStatus} style={styles.picker}>
            <Picker.Item label="Pendente" value="pendente" />
            <Picker.Item label="Concluída" value="concluída" />
          </Picker>

          <View style={styles.switchRow}>
            <Text style={styles.label}>Lembrete</Text>
            <Switch value={lembrete} onValueChange={setLembrete} />
          </View>

          <View style={styles.buttons}>
            {taskToEdit && (
              <TouchableOpacity onPress={handleExcluir} style={styles.cancel}>
                <Text style={{ color: '#a00', fontWeight: 'bold' }}>Excluir</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={onClose} style={styles.cancel}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSalvar} style={styles.save}>
              <Text style={styles.saveText}>Salvar</Text>
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
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4C804C',
    marginBottom: 6,
    textAlign: 'center',
  },
  date: {
    fontSize: 14,
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
  label: {
    color: '#4C804C',
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 16,
  },
  picker: {
    backgroundColor: '#fff',
    height: 44,
    marginBottom: 12,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  timeButtonText: {
    color: '#4C804C',
    fontSize: 16,
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

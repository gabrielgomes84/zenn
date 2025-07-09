// src/components/TaskModal.tsx
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  visible: boolean;
  onClose: () => void;
  selectedDate: string;
};

export default function TaskModal({ visible, onClose, selectedDate }: Props) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [hora, setHora] = useState('');
  const [horaSelecionada, setHoraSelecionada] = useState(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [prioridade, setPrioridade] = useState('baixa');
  const [status, setStatus] = useState('pendente');
  const [lembrete, setLembrete] = useState(false);

  const handleSalvar = () => {
    const horaFormatada = horaSelecionada.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const novaTarefa = {
      id: Date.now().toString(),
      usuario_id: 'exemplo-usuario-id',
      titulo,
      descricao,
      data: selectedDate,
      hora: horaFormatada,
      prioridade,
      status,
      lembrete,
      data_criacao: new Date().toISOString(),
    };

    console.log(novaTarefa);
    onClose();
  };

  const aoSelecionarHora = (event: any, selectedTime?: Date) => {
    setMostrarPicker(false);
    if (selectedTime) {
      setHoraSelecionada(selectedTime);
      setHora(
        selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Nova Tarefa</Text>
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
              {hora ? `Hora: ${hora}` : 'Selecionar Hora'}
            </Text>
          </TouchableOpacity>

          {mostrarPicker && (
            <DateTimePicker
              value={horaSelecionada}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour
              onChange={aoSelecionarHora}
            />
          )}

          <Text style={styles.label}>Prioridade</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={prioridade}
              onValueChange={setPrioridade}
              style={styles.picker}
              dropdownIconColor="#4C804C"
            >
              <Picker.Item label="Baixa" value="baixa" />
              <Picker.Item label="Média" value="média" />
              <Picker.Item label="Alta" value="alta" />
            </Picker>
          </View>

          <Text style={styles.label}>Status</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={status}
              onValueChange={setStatus}
              style={styles.picker}
              dropdownIconColor="#4C804C"
            >
              <Picker.Item label="Pendente" value="pendente" />
              <Picker.Item label="Concluída" value="concluída" />
            </Picker>
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.label}>Lembrete</Text>
            <Switch value={lembrete} onValueChange={setLembrete} />
          </View>

          <View style={styles.buttons}>
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  picker: {
    backgroundColor: '#fff',
    height: 44,
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

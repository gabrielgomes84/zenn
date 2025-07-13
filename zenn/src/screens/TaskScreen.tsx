import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Platform, ActionSheetIOS, Modal, Pressable
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { collection, query, where, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

import CalendarSelector from '../components/CalendarSelector';
import TaskModal from '../components/TaskModal';
import { salvarCorLocal, buscarCores } from '../services/colorsStorage';

type Task = {
  id: string;
  usuario_id: string;
  titulo: string;
  descricao: string;
  data: string;
  hora: string;
  prioridade: string;
  status: string;
  lembrete: boolean;
  data_criacao: string;
  cor?: string;
};

type Props = {
  route: { params: { usuarioId: string } };
};

export default function TaskScreen({ route }: Props) {
  const { usuarioId } = route.params;

  const [selectedDate, setSelectedDate] = useState('');
  const [tarefas, setTarefas] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [taskColorPicker, setTaskColorPicker] = useState<Task | null>(null);

  useEffect(() => {
    if (!selectedDate) return;

    const partes = selectedDate.split('/');
    const dataFormatada = `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;

    const q = query(
      collection(db, 'tarefas'),
      where('usuario_id', '==', usuarioId),
      where('data', '==', dataFormatada)
    );

    const unsubscribe = onSnapshot(q, async snapshot => {
      const dadosFirestore = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];

      const coresMap = await buscarCores();

      const dadosComCor = dadosFirestore.map(t => ({
        ...t,
        cor: coresMap[t.id] || '#808080',
      }));

      const dadosOrdenados = dadosComCor.sort((a, b) => {
        if (a.status === 'concluída' && b.status !== 'concluída') return 1;
        if (a.status !== 'concluída' && b.status === 'concluída') return -1;
        return 0;
      });

      setTarefas(dadosOrdenados);
    });

    return () => unsubscribe();
  }, [selectedDate, usuarioId]);

  const confirmarExclusao = (taskId: string) => {
    Alert.alert(
      'Excluir tarefa',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'tarefas', taskId));
            } catch (err) {
              console.error('Erro ao excluir:', err);
            }
          },
        },
      ]
    );
  };

  const marcarConcluida = async (task: Task) => {
    try {
      const ref = doc(db, 'tarefas', task.id);
      await updateDoc(ref, { status: 'concluída' });
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
    }
  };

  const cores = ['#808080', '#FF8C00', '#FF6347', '#1E90FF', '#FFD700', '#800080'];

  const mostrarSeletorCor = (task: Task) => {
    if (task.status === 'concluída') return;

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [...cores, 'Cancelar'],
          cancelButtonIndex: cores.length,
          title: 'Escolha a cor',
        },
        async (buttonIndex) => {
          if (buttonIndex === cores.length) return;
          const corEscolhida = cores[buttonIndex];
          await salvarCorLocal(task.id, corEscolhida);
          setTarefas(prev =>
            prev.map(t => (t.id === task.id ? { ...t, cor: corEscolhida } : t))
          );
        }
      );
    } else {
      setTaskColorPicker(task);
      setColorPickerVisible(true);
    }
  };

  const selecionarCorAndroid = async (cor: string) => {
    if (!taskColorPicker) return;
    await salvarCorLocal(taskColorPicker.id, cor);
    setTarefas(prev =>
      prev.map(t => (t.id === taskColorPicker.id ? { ...t, cor } : t))
    );
    setColorPickerVisible(false);
    setTaskColorPicker(null);
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View style={[
      styles.taskCard,
      {
        backgroundColor: item.status === 'concluída' ? '#4C804C' : (item.cor || '#808080'),
      }
    ]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={[styles.taskTitle, { color: '#FFF8DC' }]}>{item.titulo}</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {item.status === 'pendente' && (
            <TouchableOpacity onPress={() => marcarConcluida(item)} style={{ marginRight: 10 }}>
              <Ionicons name="checkmark-circle-outline" size={22} color="#FFF8DC" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => {
            setTaskToEdit(item);
            setModalVisible(true);
          }}>
            <Ionicons name="pencil" size={20} color="#FFF8DC" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => confirmarExclusao(item.id)}>
            <Ionicons name="close" size={20} color="#FFF8DC" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={[styles.taskDesc, { color: '#FFF8DC' }]}>{item.descricao}</Text>
      <Text style={[styles.taskInfo, { color: '#FFF8DC' }]}>Hora: {item.hora} - Prioridade: {item.prioridade}</Text>
      <Text style={[styles.taskStatus, { color: '#FFF8DC' }]}>Status: {item.status}</Text>

      {item.status !== 'concluída' && (
        <TouchableOpacity
          style={styles.iconeCor}
          onPress={() => mostrarSeletorCor(item)}
        >
          <Ionicons name="color-palette-outline" size={24} color="#FFF8DC" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>

      <CalendarSelector onDaySelected={(day, month, year) => {
        const formatted = `${day}/${month + 1}/${year}`;
        setSelectedDate(formatted);
      }} />

      <Text style={styles.dateText}>
        {selectedDate ? `Tarefas para: ${selectedDate}` : 'Selecione uma data'}
      </Text>

      <FlatList
        data={tarefas}
        keyExtractor={item => item.id}
        renderItem={renderTask}
        ListEmptyComponent={<Text style={styles.noTasks}>Nenhuma tarefa para essa data.</Text>}
      />

      <TouchableOpacity
        style={[styles.button, { marginTop: 20 }]}
        onPress={() => {
          setTaskToEdit(null);
          setModalVisible(true);
        }}
      >
        <Text style={styles.buttonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>

      <TaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedDate={selectedDate}
        usuarioId={usuarioId}
        taskToEdit={taskToEdit}
      />

      <Modal
        transparent
        visible={colorPickerVisible}
        animationType="fade"
        onRequestClose={() => setColorPickerVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setColorPickerVisible(false)}>
          <View style={styles.colorPickerContainer}>
            {cores.map(cor => (
              <TouchableOpacity
                key={cor}
                style={[styles.colorCircle, { backgroundColor: cor }]}
                onPress={() => selecionarCorAndroid(cor)}
              />
            ))}
            <TouchableOpacity
              style={[styles.cancelButton]}
              onPress={() => setColorPickerVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4C804C',
    marginBottom: 20,
    textAlign: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4C804C',
    marginVertical: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4C804C',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF8DC',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  taskCard: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    position: 'relative',
  },
  taskTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  taskDesc: {
    fontSize: 14,
    marginVertical: 4,
  },
  taskInfo: {
    fontSize: 12,
  },
  taskStatus: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  noTasks: {
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
  iconeCor: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorPickerContainer: {
    backgroundColor: '#FFF8DC',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  cancelButton: {
    position: 'absolute',
    bottom: -50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#4C804C',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

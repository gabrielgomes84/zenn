//src/screens/TaskScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList, Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';

import CalendarSelector from '../components/CalendarSelector';
import TaskModal from '../components/TaskModal';

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

  useEffect(() => {
    if (!selectedDate) return;

    const partes = selectedDate.split('/');
    const dataFormatada = `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;

    const q = query(
      collection(db, 'tarefas'),
      where('usuario_id', '==', usuarioId),
      where('data', '==', dataFormatada)
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      const dados = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      setTarefas(dados);
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

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskCard}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.taskTitle}>{item.titulo}</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity onPress={() => {
            setTaskToEdit(item);
            setModalVisible(true);
          }}>
            <Ionicons name="pencil" size={20} color="#2d6a2d" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => confirmarExclusao(item.id)}>
            <Ionicons name="close" size={20} color="#a00" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.taskDesc}>{item.descricao}</Text>
      <Text style={styles.taskInfo}>Hora: {item.hora} - Prioridade: {item.prioridade}</Text>
      <Text style={styles.taskStatus}>Status: {item.status}</Text>
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
    backgroundColor: '#e0f2e0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  taskTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2d6a2d',
  },
  taskDesc: {
    fontSize: 14,
    color: '#4c804c',
    marginVertical: 4,
  },
  taskInfo: {
    fontSize: 12,
    color: '#4c804c',
  },
  taskStatus: {
    fontSize: 12,
    color: '#a0522d',
    marginTop: 4,
    fontWeight: '600',
  },
  noTasks: {
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

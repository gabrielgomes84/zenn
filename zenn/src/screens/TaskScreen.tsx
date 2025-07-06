import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import CalendarSelector from '../components/CalendarSelector';
import TaskModal from '../components/TaskModal';
import { buscarUsuarioPorId } from '../database/usuarios';
import { User } from '../models/user';
import { Task } from '../models/task';
import Ionicons from 'react-native-vector-icons/Ionicons';


type Props = {
  route: { params: { usuarioId: string } };
};

export default function TaskScreen({ route }: Props) {
  const { usuarioId } = route.params;
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [tarefasFiltradas, setTarefasFiltradas] = useState<Task[]>([]);
  const [usuario, setUsuario] = useState<User | null>(null); 

  useEffect(() => {
    async function fetchUsuario() {
      const user = await buscarUsuarioPorId(usuarioId);
      setUsuario(user);
    }
    fetchUsuario();
  }, [usuarioId]);
 
  useEffect(() => {
    if (selectedDate) {
      // Formata para padrão ISO yyyy-mm-dd pra comparar com mock
      const partes = selectedDate.split('/');
      const dataFormatada = `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
      const filtradas = tarefas.filter(t => t.usuario_id === usuarioId && t.data === dataFormatada);
      setTarefasFiltradas(filtradas);
    } else {
      setTarefasFiltradas([]);
    }
  }, [selectedDate, usuarioId]);

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskCard}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.taskTitle}>{item.titulo}</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity onPress={() => {
            setModalVisible(true); // editar (a lógica virá depois)
          }}>
            <Ionicons name="pencil" size={20} color="#2d6a2d" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            // excluir (sem ação por enquanto)
          }}>
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
      {usuario && <Text style={styles.userName}>Olá, {usuario.nome}!</Text>}

      <CalendarSelector onDaySelected={(day: number, month: number, year: number) => {
        const formatted = `${day}/${month + 1}/${year}`;
        setSelectedDate(formatted);
      }} />

      <Text style={styles.dateText}>
        {selectedDate ? `Tarefas para: ${selectedDate}` : 'Selecione uma data'}
      </Text>

      <FlatList
        data={tarefasFiltradas}
        keyExtractor={item => item.id}
        renderItem={renderTask}
        ListEmptyComponent={<Text style={styles.noTasks}>Nenhuma tarefa para essa data.</Text>}
      />

      <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>

      <TaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedDate={selectedDate}
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
  userName: {               
    fontSize: 20,           
    fontWeight: '600',      
    color: '#2d6a2d',       
    textAlign: 'center',    
    marginBottom: 12,       
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
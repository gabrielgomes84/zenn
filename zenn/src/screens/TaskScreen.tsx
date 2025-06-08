import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CalendarSelector from '../components/CalendarSelector';
import TaskModal from '../components/TaskModal';

export default function TaskScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>

      <CalendarSelector onDaySelected={(day: number, month: number, year: number) => {
        const formatted = `${day}/${month + 1}/${year}`;
        setSelectedDate(formatted);
      }} />

      <Text style={styles.dateText}>
        {selectedDate ? `Tarefas para: ${selectedDate}` : 'Selecione uma data'}
      </Text>

      <TouchableOpacity style={[styles.button, { marginTop: 390 }]} onPress={() => setModalVisible(true)}>
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
});

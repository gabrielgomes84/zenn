import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CalendarSelector from '../components/CalendarSelector';

export default function TaskScreen() {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>

      <CalendarSelector onDaySelected={(day: number, month: number, year: number) => {
        const formatted = `${day}/${month+1}/${year}`;
        setSelectedDate(formatted);
      }} />

      <Text style={styles.dateText}>
        {selectedDate ? `Tarefas para: ${selectedDate}` : 'Selecione uma data'}
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>
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
  taskList: {
    flex: 1,
    marginBottom: 20,
  },
  taskItem: {
    backgroundColor: '#4C804C',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  taskText: {
    color: '#FFF8DC',
    fontWeight: '500',
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

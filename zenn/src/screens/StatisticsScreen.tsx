import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CalendarSelector from '../components/CalendarSelector';
import { tarefas } from '../data/mockData';

export default function StatisticsScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [total, setTotal] = useState(0);
  const [concluidas, setConcluidas] = useState(0);
  const [pendentes, setPendentes] = useState(0);

  useEffect(() => {
    if (selectedDate) {
      const [dia, mes, ano] = selectedDate.split('/');
      const dataFormatada = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
      const tarefasDoDia = tarefas.filter(t => t.data === dataFormatada);

      setTotal(tarefasDoDia.length);
      setConcluidas(tarefasDoDia.filter(t => t.status === 'concluída').length);
      setPendentes(tarefasDoDia.filter(t => t.status === 'pendente').length);
    } else {
      setTotal(0);
      setConcluidas(0);
      setPendentes(0);
    }
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estatísticas</Text>

      <CalendarSelector onDaySelected={(day, month, year) => {
        const formatted = `${day}/${month + 1}/${year}`;
        setSelectedDate(formatted);
      }} />

      <Text style={styles.dateText}>
        {selectedDate ? `Estatísticas para: ${selectedDate}` : 'Selecione uma data'}
      </Text>

      <ScrollView contentContainerStyle={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{total}</Text>
          <Text style={styles.statLabel}>Total de Tarefas</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{concluidas}</Text>
          <Text style={styles.statLabel}>Concluídas</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{pendentes}</Text>
          <Text style={styles.statLabel}>Pendentes</Text>
        </View>
      </ScrollView>
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
  statsContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  statBox: {
    backgroundColor: '#4C804C',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF8DC',
  },
  statLabel: {
    fontSize: 16,
    color: '#FFF8DC',
    marginTop: 5,
  },
});

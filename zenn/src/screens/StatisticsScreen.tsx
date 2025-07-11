// src/screens/StatisticsScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import CalendarSelector from '../components/CalendarSelector';
import DonutChart from '../components/DonutChart';

const screenWidth = Dimensions.get('window').width;

export default function StatisticsScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [total, setTotal] = useState(0);
  const [concluidas, setConcluidas] = useState(0);
  const [pendentes, setPendentes] = useState(0);

  useEffect(() => {
    const buscarTarefas = async () => {
      if (!selectedDate) return;

      const [dia, mes, ano] = selectedDate.split('/');
      const dataFormatada = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;

      try {
        const q = query(
          collection(db, 'tarefas'),
          where('data', '==', dataFormatada)
        );
        const snapshot = await getDocs(q);
        const tarefas = snapshot.docs.map(doc => doc.data());

        const concluidasCount = tarefas.filter(t => t.status === 'concluída').length;
        const pendentesCount = tarefas.filter(t => t.status === 'pendente').length;

        setTotal(tarefas.length);
        setConcluidas(concluidasCount);
        setPendentes(pendentesCount);
      } catch (err) {
        console.error('Erro ao buscar tarefas:', err);
        setTotal(0);
        setConcluidas(0);
        setPendentes(0);
      }
    };

    buscarTarefas();
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estatísticas</Text>

      <CalendarSelector
        onDaySelected={(day, month, year) => {
          const formatted = `${day}/${month + 1}/${year}`;
          setSelectedDate(formatted);
        }}
      />

      <Text style={styles.dateText}>
        {selectedDate ? `Estatísticas para: ${selectedDate}` : 'Selecione uma data'}
      </Text>

      <ScrollView contentContainerStyle={styles.chartContainer}>
        {total > 0 ? (
          <DonutChart percentage={(concluidas / total) * 100} />
        ) : (
          <Text style={styles.noData}>Nenhum dado disponível para o gráfico.</Text>
        )}
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
  chartContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  noData: {
    marginTop: 20,
    fontStyle: 'italic',
    color: '#888',
    fontSize: 16,
  },
  statBox: {
    backgroundColor: '#4C804C',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
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
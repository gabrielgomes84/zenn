import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import CalendarSelector from '../components/CalendarSelector';
import { tarefas } from '../data/mockData';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function StatisticsScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [total, setTotal] = useState(0);
  const [concluidas, setConcluidas] = useState(0);
  const [pendentes, setPendentes] = useState(0);
  type PieChartData = {
    name: string;
    population: number;
    color: string;
    legendFontColor: string;
    legendFontSize: number;
  };
  const [dadosGrafico, setDadosGrafico] = useState<PieChartData[]>([]);

  useEffect(() => {
    if (selectedDate) {
      const [dia, mes, ano] = selectedDate.split('/');
      const dataFormatada = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
      const tarefasDoDia = tarefas.filter(t => t.data === dataFormatada);
      const concluidasCount = tarefasDoDia.filter(t => t.status === 'concluída').length;
      const pendentesCount = tarefasDoDia.filter(t => t.status === 'pendente').length;

      setTotal(tarefasDoDia.length);
      setConcluidas(concluidasCount);
      setPendentes(pendentesCount);

      //preparar os dados para o grafico de pizza
      const dados = [];
      if (concluidasCount > 0) {
        dados.push({
            name: 'Concluídas',
            population: concluidasCount,
            color: '#4CAF50',
            legendFontColor: '#4CAF50',
            legendFontSize: 15,
        });
      }
      if (pendentesCount > 0) {
        dados.push({
            name: 'Pendentes',
            population: pendentesCount,
            color: '#A0522D',
            legendFontColor: '#A0522D',
            legendFontSize: 15,
        });
      }
      setDadosGrafico(dados);
      
    } else {
      setTotal(0);
      setConcluidas(0);
      setPendentes(0);
      setDadosGrafico([]);
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

      <ScrollView contentContainerStyle={styles.chartContainer}>
        {dadosGrafico.length > 0 ? (
            <PieChart
                data={dadosGrafico}
                width={screenWidth - 40}
                height={220}
                chartConfig={{
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />
        ) : (
            <Text style={styles.noData}>Nenhum dado disponível para o gráfico.</Text>
        )}
        {/* PASSO 4: adicionamos os números abaixo do gráfico */}
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
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const years = [2023, 2024, 2025];

interface Props {
  onDaySelected: (day: number | 'todos', month: number, year: number) => void;
  mostrarTodos?: boolean;
}

export default function CalendarSelector({ onDaySelected, mostrarTodos = false }: Props) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | 'todos' | null>(null);
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const listaDias = mostrarTodos ? ['todos', ...days] : days;

  return (
    <View>
      <View style={styles.selectorRow}>
        <TouchableOpacity onPress={() => setShowMonthModal(true)}>
          <Text style={styles.selectorText}>{months[selectedMonth]} ▼</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowYearModal(true)}>
          <Text style={styles.selectorText}>{selectedYear} ▼</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={listaDias}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dayItem,
              item === selectedDay && styles.selectedDay
            ]}
            onPress={() => {
              setSelectedDay(item);
              onDaySelected(item as number | 'todos', selectedMonth, selectedYear);
            }}
          >
            <Text style={styles.dayText}>
              {item === 'todos' ? 'Todos' : item}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={showMonthModal} transparent animationType="slide">
        <View style={styles.modal}>
          {months.map((month, index) => (
            <TouchableOpacity key={index} onPress={() => {
              setSelectedMonth(index);
              setShowMonthModal(false);
            }}>
              <Text style={styles.modalText}>{month}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      <Modal visible={showYearModal} transparent animationType="slide">
        <View style={styles.modal}>
          {years.map((year) => (
            <TouchableOpacity key={year} onPress={() => {
              setSelectedYear(year);
              setShowYearModal(false);
            }}>
              <Text style={styles.modalText}>{year}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  selectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  selectorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4C804C',
  },
  dayItem: {
    backgroundColor: '#4C804C',
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
    height: 40,
  },
  selectedDay: {
    backgroundColor: '#4C804C',
    opacity: 0.7,
  },
  dayText: {
    color: '#FFF8DC',
    fontWeight: 'bold',
  },
  modal: {
    backgroundColor: 'white',
    margin: 40,
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginVertical: 6,
    textAlign: 'center',
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const years = [2023, 2024, 2025];

interface Props {
  onDaySelected: (day: number, month: number, year: number) => void;
}

export default function CalendarSelector({ onDaySelected }: Props) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <View>
      {/* Seletor de Mês e Ano */}
      <View style={styles.selectorRow}>
        <TouchableOpacity onPress={() => setShowMonthModal(true)}>
          <Text style={styles.selectorText}>
            {months[selectedMonth]} ▼
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowYearModal(true)}>
          <Text style={styles.selectorText}>
            {selectedYear} ▼
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista horizontal de dias */}
      <FlatList
        data={days}
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
              onDaySelected(item, selectedMonth, selectedYear);
            }}
          >
            <Text style={styles.dayText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal de mês */}
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

      {/* Modal de ano */}
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
    paddingVertical: 6,       // antes era 10
    paddingHorizontal: 12,
    margin: 4,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center', // adicione isso
    minWidth: 40,
    height: 40,                // adicione isso para evitar esticar
  },
  selectedDay: {
    backgroundColor: '#4C804C',
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

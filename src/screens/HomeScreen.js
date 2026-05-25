import React, { useState, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { getGastos } from '../database/database';
import ExpenseItem from '../components/ExpenseItem';
import { styles } from '../styles/styles';

const HomeScreen = ({ navigation }) => {
  const [gastos, setGastos] = useState([]);

  const loadGastos = () => {
    const data = getGastos();
    setGastos(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadGastos();
    }, [])
  );

  // Lógica de negócio: Reduz o array somando a propriedade 'valor' de cada objeto 
  const totalGasto = gastos.reduce((acumulador, item) => acumulador + item.valor, 0);

  return (
    <View style={styles.container}>
      
      {/* Dashboard de Resumo */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total de Gastos</Text>
        <Text style={styles.summaryValue}>
          {totalGasto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Text>
      </View>

      <TouchableOpacity 
        style={[styles.button, { marginBottom: 24, flexDirection: 'row', justifyContent: 'center' }]} 
        onPress={() => navigation.navigate('AddExpense')}
      >
        <Feather name="plus-circle" size={20} color="#FFF" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Adicionar Novo Gasto</Text>
      </TouchableOpacity>

      <FlatList
        data={gastos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ExpenseItem data={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Feather name="inbox" size={48} color="#CBD5E1" />
            <Text style={styles.emptyText}>Nenhum gasto registrado ainda.</Text>
          </View>
        }
      />
    </View>
  );
};

export default HomeScreen;
import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Biblioteca de ícones
import { styles } from '../styles/styles';

const ExpenseItem = ({ data }) => {
  // Converte o valor numérico de volta para a string formatada em Reais
  const valorFormatado = data.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        
        {/* Bloco 1: Ícone */}
        <View style={styles.cardIcon}>
          <Feather name="shopping-bag" size={24} color="#4F46E5" />
        </View>

        {/* Bloco 2: Detalhes textuais expansíveis */}
        <View style={styles.cardDetails}>
          <Text style={styles.title} numberOfLines={1}>{data.descricao}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <Text style={styles.badge}>{data.categoria}</Text>
            <Text style={[styles.date, { marginLeft: 8 }]}>{data.data}</Text>
          </View>
        </View>

        {/* Bloco 3: Valor alinhado à direita */}
        <View style={styles.cardValueContainer}>
          <Text style={styles.value}>{valorFormatado}</Text>
        </View>
        
      </View>
    </View>
  );
};

export default ExpenseItem;
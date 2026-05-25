import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Platform, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { insertGasto } from '../database/database';

const AddExpenseScreen = ({ navigation }) => {
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [valor, setValor] = useState('');
  const [dataGasto, setDataGasto] = useState('');
  
  const [dateObject, setDateObject] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // --------------------------------------------------
  // REGRAS DE NEGÓCIO E MÁSCARAS
  // --------------------------------------------------
  const handleValorChange = (texto) => {
    let apenasNumeros = texto.replace(/\D/g, '');
    if (!apenasNumeros) {
      setValor('');
      return;
    }
    let valorDecimal = (parseInt(apenasNumeros, 10) / 100).toFixed(2);
    let valorFormatado = valorDecimal
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    setValor(valorFormatado);
  };

  const handleDataWebChange = (texto) => {
    let num = texto.replace(/[^0-9]/g, '');
    if (num.length > 2) num = num.substring(0, 2) + '/' + num.substring(2);
    if (num.length > 5) num = num.substring(0, 5) + '/' + num.substring(5, 9);
    setDataGasto(num);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateObject(selectedDate);
      const dia = String(selectedDate.getDate()).padStart(2, '0');
      const mes = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const ano = selectedDate.getFullYear();
      setDataGasto(`${dia}/${mes}/${ano}`);
    }
  };

  const isFormValid = descricao.trim() !== '' && 
                      categoria.trim() !== '' && 
                      valor.trim() !== '' && 
                      parseFloat(valor.replace(/\./g, '').replace(',', '.')) > 0 && 
                      dataGasto !== '';

  const handleSave = () => {
    const numericValue = parseFloat(valor.replace(/\./g, '').replace(',', '.'));
    insertGasto(descricao, categoria, numericValue, dataGasto);
    navigation.goBack();
  };

  // --------------------------------------------------
  // INTERFACE GRÁFICA (JSX)
  // --------------------------------------------------
  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: '#F8FAFC' }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        
        {/* Cabeçalho da Tela */}
        <View style={formStyles.header}>
          <View style={formStyles.iconWrapper}>
            <Feather name="dollar-sign" size={28} color="#4F46E5" />
          </View>
          <Text style={formStyles.pageTitle}>Registrar Despesa</Text>
          <Text style={formStyles.pageSubtitle}>Preencha os dados abaixo para manter seu controle financeiro atualizado.</Text>
        </View>

        {/* Campo: Descrição */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Descrição do Gasto</Text>
          <View style={formStyles.inputContainer}>
            <Feather name="edit-3" size={20} color="#94A3B8" style={formStyles.icon} />
            <TextInput 
              style={formStyles.input} 
              placeholder="Ex: Almoço no Shopping" 
              placeholderTextColor="#94A3B8"
              value={descricao} 
              onChangeText={setDescricao} 
            />
          </View>
        </View>

        {/* Campo: Categoria */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Categoria</Text>
          <View style={formStyles.inputContainer}>
            <Feather name="tag" size={20} color="#94A3B8" style={formStyles.icon} />
            <TextInput 
              style={formStyles.input} 
              placeholder="Ex: Alimentação, Transporte" 
              placeholderTextColor="#94A3B8"
              value={categoria} 
              onChangeText={setCategoria} 
            />
          </View>
        </View>

        {/* Campo: Valor */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Valor (R$)</Text>
          <View style={formStyles.inputContainer}>
            <Text style={{ fontSize: 16, color: '#94A3B8', fontWeight: '600', marginLeft: 16, marginRight: 8 }}>R$</Text>
            <TextInput 
              style={[formStyles.input, { paddingLeft: 0, fontWeight: '700', color: '#10B981' }]} 
              placeholder="0,00" 
              placeholderTextColor="#94A3B8"
              value={valor} 
              onChangeText={handleValorChange} 
              keyboardType="numeric" 
            />
          </View>
        </View>

        {/* Campo: Data (Híbrido) */}
        <View style={formStyles.inputGroup}>
          <Text style={formStyles.label}>Data da Despesa</Text>
          {Platform.OS === 'web' ? (
            <View style={formStyles.inputContainer}>
              <Feather name="calendar" size={20} color="#94A3B8" style={formStyles.icon} />
              <TextInput 
                style={formStyles.input} 
                placeholder="DD/MM/AAAA" 
                placeholderTextColor="#94A3B8"
                value={dataGasto} 
                onChangeText={handleDataWebChange} 
                maxLength={10}
              />
            </View>
          ) : (
            <>
              <TouchableOpacity style={formStyles.inputContainer} onPress={() => setShowDatePicker(true)}>
                <Feather name="calendar" size={20} color="#4F46E5" style={formStyles.icon} />
                <Text style={[formStyles.input, { marginTop: 14, color: dataGasto ? '#1E293B' : '#94A3B8' }]}>
                  {dataGasto || "Selecione a Data no Calendário"}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker value={dateObject} mode="date" display="default" onChange={handleDateChange} />
              )}
            </>
          )}
        </View>

        {/* Botão de Salvar */}
        <TouchableOpacity 
          style={[formStyles.button, !isFormValid && formStyles.buttonDisabled]} 
          disabled={!isFormValid} 
          onPress={handleSave}
        >
          <Feather name="check-circle" size={20} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={formStyles.buttonText}>Salvar Registro</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// --------------------------------------------------
// ESTILIZAÇÃO LOCAL ESPECÍFICA PARA O FORMULÁRIO
// --------------------------------------------------
const formStyles = StyleSheet.create({
  header: { marginBottom: 32, alignItems: 'center' },
  iconWrapper: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  pageTitle: { fontSize: 24, fontWeight: '800', color: '#1E293B', marginBottom: 8 },
  pageSubtitle: { fontSize: 14, color: '#64748B', textAlign: 'center', lineHeight: 20, paddingHorizontal: 20 },
  
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '700', color: '#334155', marginBottom: 8, marginLeft: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  
  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF', 
    borderWidth: 1.5, 
    borderColor: '#E2E8F0', 
    borderRadius: 12,
    height: 56,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 4 },
      android: { elevation: 1 },
      web: { boxShadow: '0px 2px 4px rgba(0,0,0,0.03)' }
    })
  },
  icon: { marginLeft: 16, marginRight: 12 },
  input: { flex: 1, height: '100%', fontSize: 16, color: '#1E293B' },
  
  button: { 
    flexDirection: 'row',
    backgroundColor: '#4F46E5', 
    height: 56, 
    borderRadius: 12, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 12,
    ...Platform.select({
      ios: { shadowColor: '#4F46E5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
      android: { elevation: 4 },
      web: { boxShadow: '0px 4px 8px rgba(79, 70, 229, 0.3)' }
    })
  },
  buttonDisabled: { backgroundColor: '#94A3B8', shadowOpacity: 0, elevation: 0 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
});

export default AddExpenseScreen;
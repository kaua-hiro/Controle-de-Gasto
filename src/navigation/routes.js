import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';

const Stack = createNativeStackNavigator(); // Stack Navigator [cite: 109]

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Meus Gastos' }} // Título na toolbar [cite: 112]
        />
        <Stack.Screen 
          name="AddExpense" 
          component={AddExpenseScreen} 
          options={{ title: 'Novo Gasto' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
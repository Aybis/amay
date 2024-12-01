import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import ExpenseChart from '@/components/ExpenseChart';

const dummyData = [
  {
    id: uuidv4(),
    title: 'Groceries',
    amount: 50,
    category: 'Food',
  },
  {
    id: uuidv4(),
    title: 'Electricity Bill',
    amount: 100,
    category: 'Utilities',
  },
];

export default function ExpensesScreen() {
  const [expenses, setExpenses] = useState(dummyData);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const colorScheme = useColorScheme();

  const addExpense = () => {
    setExpenses([
      ...expenses,
      {
        id: uuidv4(),
        title,
        amount: parseFloat(amount),
        category,
      },
    ]);
    setTitle('');
    setAmount('');
    setCategory('');
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: Colors[colorScheme].background }}>
      <Text style={{ color: Colors[colorScheme].text, fontSize: 24, marginBottom: 20 }}>
        Expense Tracker
      </Text>
      <TextInput
        placeholder="Expense Title"
        value={title}
        onChangeText={setTitle}
        style={{
          borderColor: Colors[colorScheme].text,
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
          color: Colors[colorScheme].text,
        }}
      />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={{
          borderColor: Colors[colorScheme].text,
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
          color: Colors[colorScheme].text,
        }}
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={{
          borderColor: Colors[colorScheme].text,
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
          color: Colors[colorScheme].text,
        }}
      />
      <Button title="Add Expense" onPress={addExpense} />
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              marginVertical: 5,
              backgroundColor: '#f0f0f0',
              borderRadius: 5,
            }}>
            <Text style={{ color: Colors[colorScheme].text }}>{item.title}</Text>
            <Text style={{ color: Colors[colorScheme].text }}>${item.amount}</Text>
            <Text style={{ color: Colors[colorScheme].text }}>{item.category}</Text>
            <Button title="Delete" onPress={() => deleteExpense(item.id)} />
          </View>
        )}
      />
      <ExpenseChart expenses={expenses} />
    </View>
  );
}

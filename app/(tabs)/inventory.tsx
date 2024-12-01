import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const dummyData = [
  {
    id: uuidv4(),
    name: 'Milk',
    quantity: 2,
    category: 'Groceries',
    expirationDate: new Date(),
    lowStockThreshold: 1,
  },
  {
    id: uuidv4(),
    name: 'Kazayn’s Toy',
    quantity: 5,
    category: 'Toys',
    expirationDate: new Date(),
    lowStockThreshold: 2,
  },
];

export default function InventoryScreen() {
  const [items, setItems] = useState(dummyData);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState('');
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [lowStockThreshold, setLowStockThreshold] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const colorScheme = useColorScheme();

  const addItem = () => {
    setItems([
      ...items,
      {
        id: uuidv4(),
        name,
        quantity,
        category,
        expirationDate,
        lowStockThreshold,
      },
    ]);
    setName('');
    setQuantity(0);
    setCategory('');
    setExpirationDate(new Date());
    setLowStockThreshold(0);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const checkLowStock = (item) => {
    return item.quantity <= item.lowStockThreshold;
  };

  const checkExpiration = (item) => {
    const today = new Date();
    return item.expirationDate <= today;
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: Colors[colorScheme].background }}>
      <Text style={{ color: Colors[colorScheme].text, fontSize: 24, marginBottom: 20 }}>
        Inventory Management
      </Text>
      <TextInput
        placeholder="Item Name"
        value={name}
        onChangeText={setName}
        style={{
          borderColor: Colors[colorScheme].text,
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
          color: Colors[colorScheme].text,
        }}
      />
      <TextInput
        placeholder="Quantity"
        value={quantity.toString()}
        onChangeText={(text) => setQuantity(parseInt(text))}
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
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={{ color: Colors[colorScheme].text, marginBottom: 10 }}>
          {expirationDate.toDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={expirationDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || expirationDate;
            setShowDatePicker(false);
            setExpirationDate(currentDate);
          }}
        />
      )}
      <TextInput
        placeholder="Low Stock Threshold"
        value={lowStockThreshold.toString()}
        onChangeText={(text) => setLowStockThreshold(parseInt(text))}
        keyboardType="numeric"
        style={{
          borderColor: Colors[colorScheme].text,
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
          color: Colors[colorScheme].text,
        }}
      />
      <Button title="Add Item" onPress={addItem} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              marginVertical: 5,
              backgroundColor: checkLowStock(item) ? '#ffd3d3' : '#d3ffd3',
              borderRadius: 5,
            }}>
            <Text style={{ color: Colors[colorScheme].text }}>{item.name}</Text>
            <Text style={{ color: Colors[colorScheme].text }}>Quantity: {item.quantity}</Text>
            <Text style={{ color: Colors[colorScheme].text }}>Category: {item.category}</Text>
            <Text style={{ color: Colors[colorScheme].text }}>
              Expiration Date: {item.expirationDate.toDateString()}
            </Text>
            <Text style={{ color: Colors[colorScheme].text }}>
              Low Stock Threshold: {item.lowStockThreshold}
            </Text>
            <Button title="Delete" onPress={() => deleteItem(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

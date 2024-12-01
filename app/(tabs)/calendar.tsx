import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const dummyData = [
  {
    id: new Date().toISOString(),
    title: 'Kazayn’s Birthday',
    date: new Date(),
    color: '#FF5733',
    recurring: 'yearly',
  },
  {
    id: new Date().toISOString(),
    title: 'Family Trip',
    date: new Date(),
    color: '#33FF57',
    recurring: 'none',
  },
];

export default function CalendarScreen() {
  const [events, setEvents] = useState(dummyData);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [color, setColor] = useState('#000000');
  const [recurring, setRecurring] = useState('none');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const colorScheme = useColorScheme();

  const addEvent = () => {
    setEvents([
      ...events,
      {
        id: new Date().toISOString(),
        title,
        date,
        color,
        recurring,
      },
    ]);
    setTitle('');
    setDate(new Date());
    setColor('#000000');
    setRecurring('none');
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: Colors[colorScheme].background }}>
      <Text style={{ color: Colors[colorScheme].text, fontSize: 24, marginBottom: 20 }}>
        Shared Calendar
      </Text>
      <TextInput
        placeholder="Event Title"
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
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={{ color: Colors[colorScheme].text, marginBottom: 10 }}>
          {date.toDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowDatePicker(false);
            setDate(currentDate);
          }}
        />
      )}
      <TextInput
        placeholder="Color"
        value={color}
        onChangeText={setColor}
        style={{
          borderColor: Colors[colorScheme].text,
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
          color: Colors[colorScheme].text,
        }}
      />
      <TextInput
        placeholder="Recurring (none, daily, weekly, monthly, yearly)"
        value={recurring}
        onChangeText={setRecurring}
        style={{
          borderColor: Colors[colorScheme].text,
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
          color: Colors[colorScheme].text,
        }}
      />
      <Button title="Add Event" onPress={addEvent} />
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              marginVertical: 5,
              backgroundColor: item.color,
              borderRadius: 5,
            }}>
            <Text style={{ color: '#fff' }}>{item.title}</Text>
            <Text style={{ color: '#fff' }}>{item.date.toDateString()}</Text>
            <Text style={{ color: '#fff' }}>{item.recurring}</Text>
            <Button title="Delete" onPress={() => deleteEvent(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

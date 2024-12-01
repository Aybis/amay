import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const dummyData = [
  {
    id: new Date().toISOString(),
    title: 'Clean the room',
    priority: 'high',
    completed: false,
    points: 10,
  },
  {
    id: new Date().toISOString(),
    title: 'Do the dishes',
    priority: 'medium',
    completed: true,
    points: 5,
  },
];

export default function TasksScreen() {
  const [tasks, setTasks] = useState(dummyData);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('low');
  const [points, setPoints] = useState(0);
  const colorScheme = useColorScheme();

  const addTask = () => {
    setTasks([
      ...tasks,
      {
        id: new Date().toISOString(),
        title,
        priority,
        completed: false,
        points,
      },
    ]);
    setTitle('');
    setPriority('low');
    setPoints(0);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: Colors[colorScheme].background }}>
      <Text style={{ color: Colors[colorScheme].text, fontSize: 24, marginBottom: 20 }}>
        Task and Chore Manager
      </Text>
      <TextInput
        placeholder="Task Title"
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
        placeholder="Priority (low, medium, high)"
        value={priority}
        onChangeText={setPriority}
        style={{
          borderColor: Colors[colorScheme].text,
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
          color: Colors[colorScheme].text,
        }}
      />
      <TextInput
        placeholder="Points"
        value={points.toString()}
        onChangeText={(text) => setPoints(parseInt(text))}
        keyboardType="numeric"
        style={{
          borderColor: Colors[colorScheme].text,
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
          color: Colors[colorScheme].text,
        }}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              marginVertical: 5,
              backgroundColor: item.completed ? '#d3ffd3' : '#ffd3d3',
              borderRadius: 5,
            }}>
            <Text style={{ color: Colors[colorScheme].text }}>{item.title}</Text>
            <Text style={{ color: Colors[colorScheme].text }}>Priority: {item.priority}</Text>
            <Text style={{ color: Colors[colorScheme].text }}>Points: {item.points}</Text>
            <Button title="Toggle Completion" onPress={() => toggleTaskCompletion(item.id)} />
            <Button title="Delete" onPress={() => deleteTask(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

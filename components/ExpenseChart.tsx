import React from 'react';
import { VictoryPie } from 'victory-native';
import { View, Text } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const ExpenseChart = ({ expenses }) => {
  const colorScheme = useColorScheme();
  const chartData = expenses.map((expense) => ({
    x: expense.title,
    y: expense.amount,
  }));

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ color: Colors[colorScheme].text, fontSize: 18, marginBottom: 10 }}>
        Expense Distribution
      </Text>
      <VictoryPie
        data={chartData}
        colorScale={['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF']}
        labelRadius={50}
        style={{
          labels: { fill: Colors[colorScheme].text, fontSize: 12, fontWeight: 'bold' },
        }}
      />
    </View>
  );
};

export default ExpenseChart;

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ExpensesScreen from '../ExpensesScreen';

describe('ExpensesScreen', () => {
  it('renders correctly with different expenses', () => {
    const { getByText } = render(<ExpensesScreen />);
    expect(getByText('Groceries')).toBeTruthy();
    expect(getByText('Electricity Bill')).toBeTruthy();
  });

  it('adds a new expense', () => {
    const { getByPlaceholderText, getByText } = render(<ExpensesScreen />);
    fireEvent.changeText(getByPlaceholderText('Expense Title'), 'New Expense');
    fireEvent.changeText(getByPlaceholderText('Amount'), '20');
    fireEvent.changeText(getByPlaceholderText('Category'), 'Miscellaneous');
    fireEvent.press(getByText('Add Expense'));
    expect(getByText('New Expense')).toBeTruthy();
    expect(getByText('$20')).toBeTruthy();
    expect(getByText('Miscellaneous')).toBeTruthy();
  });

  it('deletes an expense', () => {
    const { getByText } = render(<ExpensesScreen />);
    fireEvent.press(getByText('Delete'));
    expect(getByText('Groceries')).toBeFalsy();
  });

  it('conditionally renders based on state', () => {
    const { getByText, queryByText } = render(<ExpensesScreen />);
    fireEvent.press(getByText('Add Expense'));
    expect(queryByText('No expenses found')).toBeFalsy();
  });
});

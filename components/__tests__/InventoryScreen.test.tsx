import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import InventoryScreen from '../InventoryScreen';

describe('InventoryScreen', () => {
  it('renders correctly with different items', () => {
    const { getByText } = render(<InventoryScreen />);
    expect(getByText('Milk')).toBeTruthy();
    expect(getByText('Kazayn’s Toy')).toBeTruthy();
  });

  it('adds a new item', () => {
    const { getByPlaceholderText, getByText } = render(<InventoryScreen />);
    fireEvent.changeText(getByPlaceholderText('Item Name'), 'New Item');
    fireEvent.changeText(getByPlaceholderText('Quantity'), '10');
    fireEvent.changeText(getByPlaceholderText('Category'), 'Miscellaneous');
    fireEvent.press(getByText('Add Item'));
    expect(getByText('New Item')).toBeTruthy();
    expect(getByText('Quantity: 10')).toBeTruthy();
    expect(getByText('Category: Miscellaneous')).toBeTruthy();
  });

  it('deletes an item', () => {
    const { getByText } = render(<InventoryScreen />);
    fireEvent.press(getByText('Delete'));
    expect(getByText('Milk')).toBeFalsy();
  });

  it('conditionally renders based on stock and expiration', () => {
    const { getByText, queryByText } = render(<InventoryScreen />);
    fireEvent.press(getByText('Add Item'));
    expect(queryByText('Low Stock')).toBeFalsy();
    expect(queryByText('Expired')).toBeFalsy();
  });
});

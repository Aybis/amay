import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CalendarScreen from '../CalendarScreen';

describe('CalendarScreen', () => {
  it('renders correctly with different events', () => {
    const { getByText } = render(<CalendarScreen />);
    expect(getByText('Kazayn’s Birthday')).toBeTruthy();
    expect(getByText('Family Trip')).toBeTruthy();
  });

  it('adds a new event', () => {
    const { getByPlaceholderText, getByText } = render(<CalendarScreen />);
    fireEvent.changeText(getByPlaceholderText('Event Title'), 'New Event');
    fireEvent.press(getByText('Add Event'));
    expect(getByText('New Event')).toBeTruthy();
  });

  it('deletes an event', () => {
    const { getByText } = render(<CalendarScreen />);
    fireEvent.press(getByText('Delete'));
    expect(getByText('Kazayn’s Birthday')).toBeFalsy();
  });

  it('shows and hides the date picker', () => {
    const { getByText, queryByTestId } = render(<CalendarScreen />);
    fireEvent.press(getByText('Select Date'));
    expect(queryByTestId('datePicker')).toBeTruthy();
    fireEvent.press(getByText('Cancel'));
    expect(queryByTestId('datePicker')).toBeFalsy();
  });
});

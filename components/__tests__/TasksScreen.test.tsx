import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TasksScreen from '../TasksScreen';

describe('TasksScreen', () => {
  it('renders correctly with different tasks', () => {
    const { getByText } = render(<TasksScreen />);
    expect(getByText('Clean the room')).toBeTruthy();
    expect(getByText('Do the dishes')).toBeTruthy();
  });

  it('adds a new task', () => {
    const { getByPlaceholderText, getByText } = render(<TasksScreen />);
    fireEvent.changeText(getByPlaceholderText('Task Title'), 'New Task');
    fireEvent.changeText(getByPlaceholderText('Priority (low, medium, high)'), 'medium');
    fireEvent.changeText(getByPlaceholderText('Points'), '15');
    fireEvent.press(getByText('Add Task'));
    expect(getByText('New Task')).toBeTruthy();
    expect(getByText('Priority: medium')).toBeTruthy();
    expect(getByText('Points: 15')).toBeTruthy();
  });

  it('deletes a task', () => {
    const { getByText } = render(<TasksScreen />);
    fireEvent.press(getByText('Delete'));
    expect(getByText('Clean the room')).toBeFalsy();
  });

  it('toggles task completion', () => {
    const { getByText } = render(<TasksScreen />);
    fireEvent.press(getByText('Toggle Completion'));
    expect(getByText('Do the dishes')).toHaveStyle({ backgroundColor: '#d3ffd3' });
  });

  it('conditionally renders based on task completion', () => {
    const { getByText, queryByText } = render(<TasksScreen />);
    fireEvent.press(getByText('Add Task'));
    expect(queryByText('Completed')).toBeFalsy();
  });
});

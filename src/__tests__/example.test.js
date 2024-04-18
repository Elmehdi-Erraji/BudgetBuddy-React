import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Create from '../Components/Create';

jest.mock('axios');

describe('Create component', () => {
  it('submits form successfully', async () => {
    const navigateMock = jest.fn();
    const localStorageMock = {
      getItem: jest.fn(() => 'fakeToken')
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    axios.post.mockResolvedValueOnce({ data: 'fakeResponse' });
    const { getByLabelText, getByText } = render(<Create />);
    
    const titleInput = getByLabelText('Title');
    const descriptionInput = getByLabelText('Description');
    const expenseInput = getByLabelText('Expense');
    const addButton = getByText('Add');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.change(expenseInput, { target: { value: '100' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://127.0.0.1:8000/api/depenses',
        {
          title: 'Test Title',
          description: 'Test Description',
          expense: '100'
        },
        {
          headers: {
            Authorization: 'Bearer fakeToken'
          }
        }
      );
      expect(alert).toHaveBeenCalledWith('Expense added successfully!');
    });
  });

  it('displays error message on failed form submission', async () => {
    axios.post.mockRejectedValueOnce({ response: { data: { message: 'Error message' } } });
    const { getByLabelText, getByText } = render(<Create />);
    
    const titleInput = getByLabelText('Title');
    const descriptionInput = getByLabelText('Description');
    const expenseInput = getByLabelText('Expense');
    const addButton = getByText('Add'); // Corrected button text

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.change(expenseInput, { target: { value: '100' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(alert).toHaveBeenCalledWith('Error message');
    });
  });
});

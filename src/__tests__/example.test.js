import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Register from '/src/components/Register'; 
import { BrowserRouter } from 'react-router-dom';

// Mocking useNavigate and alert
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: () => jest.fn()
}));

global.alert = jest.fn(); 

describe('Register component', () => {
  it('renders the component and allows form submission with matched passwords', () => {
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const nameInput = getByLabelText(/name/i);
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const confirmPasswordInput = getByLabelText(/confirm password/i);
    const submitButton = getByText(/register/i);

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'securepassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'securepassword' } });

    fireEvent.click(submitButton);

    expect(global.alert).toHaveBeenCalledWith('Registration successful, please log in.');
  });

  it('shows alert for mismatched passwords', () => {
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const passwordInput = getByLabelText(/password/i);
    const confirmPasswordInput = getByLabelText(/confirm password/i);
    const submitButton = getByText(/register/i);

    fireEvent.change(passwordInput, { target: { value: 'securepassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'differentpassword' } });

    fireEvent.click(submitButton);

    expect(global.alert).toHaveBeenCalledWith('Passwords do not match!');
  });
});
